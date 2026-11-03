import { parseExamJsonSafely } from '../../src/utils/jsonParser';

// In-memory rate limiting map for basic per-instance sliding window protection
const ipRateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30; // Max 30 generation requests per minute per IP

function cleanupRateLimitMap() {
  const now = Date.now();
  for (const [ip, entry] of ipRateLimitMap.entries()) {
    if (now > entry.resetAt) {
      ipRateLimitMap.delete(ip);
    }
  }
}

function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return true; // Direct/same-origin or server-to-server request
  const allowedPatterns = [
    /^https:\/\/ortakyazili\.netlify\.app$/i,
    /^https:\/\/[a-z0-9-]+--ortakyazili\.netlify\.app$/i, // Netlify deploy previews
    /^http:\/\/localhost(?::\d+)?$/i,
    /^http:\/\/127\.0\.0\.1(?::\d+)?$/i
  ];
  return allowedPatterns.some(pattern => pattern.test(origin));
}

export default async (req: Request) => {
  const origin = req.headers.get('origin');
  const allowedOrigin = isOriginAllowed(origin) ? (origin || '*') : 'null';

  const corsHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-App-Client',
    'Cache-Control': 'no-store'
  };

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Yalnızca POST istekleri kabul edilir.' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  // Validate Origin
  if (!isOriginAllowed(origin)) {
    return new Response(JSON.stringify({ error: 'Erişim reddedildi: Yetkisiz kaynak (Origin).' }), {
      status: 403,
      headers: corsHeaders
    });
  }

  // 1. IP Rate Limiting Check
  const clientIp = 
    req.headers.get('x-nf-client-connection-ip') || 
    req.headers.get('client-ip') || 
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
    'unknown-client';

  cleanupRateLimitMap();

  const now = Date.now();
  const clientLimit = ipRateLimitMap.get(clientIp);

  if (clientLimit) {
    if (now < clientLimit.resetAt) {
      if (clientLimit.count >= MAX_REQUESTS_PER_WINDOW) {
        return new Response(
          JSON.stringify({
            error: 'Çok sık istek gönderildi. Lütfen bir dakika bekledikten sonra tekrar deneyiniz.',
            code: 'RATE_LIMIT_EXCEEDED'
          }),
          {
            status: 429,
            headers: corsHeaders
          }
        );
      }
      clientLimit.count += 1;
    } else {
      ipRateLimitMap.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    }
  } else {
    ipRateLimitMap.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  }

  // 2. Server API Key Resolution (Strictly server-side environment variable)
  const apiKey = (process.env.GEMINI_API_KEY || '').trim();
  const configuredModel = (process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite').trim();

  if (!apiKey) {
    return new Response(
      JSON.stringify({ 
        error: 'Soru üretim servisi yapılandırılmamış (GEMINI_API_KEY eksik). Lütfen Netlify yönetim panelinden ortam değişkenini tanımlayınız.' 
      }),
      {
        status: 503,
        headers: corsHeaders
      }
    );
  }

  // 3. Request Body & Payload Validation
  let body: any;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Geçersiz JSON veri gövdesi.' }), {
      status: 400,
      headers: corsHeaders
    });
  }

  const prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : '';

  if (!prompt || prompt.length < 15) {
    return new Response(JSON.stringify({ error: 'Soru üretimi için geçerli bir prompt parametresi zorunludur.' }), {
      status: 400,
      headers: corsHeaders
    });
  }

  if (prompt.length > 20000) {
    return new Response(JSON.stringify({ error: 'Prompt metni izin verilen karakter sınırını (20.000) aşıyor.' }), {
      status: 400,
      headers: corsHeaders
    });
  }

  // Educational scope validation: protect against arbitrary general-purpose chatbot abuse
  const promptLower = prompt.toLowerCase();
  const containsEducationalScope = 
    promptLower.includes('meb') || 
    promptLower.includes('öğrenme çıktısı') || 
    promptLower.includes('kazanım') || 
    promptLower.includes('yazılı sınav') || 
    promptLower.includes('soru');

  if (!containsEducationalScope) {
    return new Response(JSON.stringify({ error: 'Yalnızca müfredat ve sınav hazırlık kapsamındaki sorular üretilebilir.' }), {
      status: 400,
      headers: corsHeaders
    });
  }

  // 4. Model Selection and Execution with Bounded Timeout Budget
  const verifiedModels = [
    'gemini-3.5-flash-lite',
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-2.0-flash',
    'gemini-1.5-flash'
  ];

  // If user configured a specific model, place it first in line, followed by verified fallbacks
  const targetModels = Array.from(new Set([
    configuredModel,
    ...verifiedModels
  ])).filter(Boolean);

  let geminiResponse: Response | null = null;
  let usedModel = configuredModel;
  const modelErrors: Array<{ model: string; status?: number; error: string }> = [];

  const FUNCTION_TOTAL_BUDGET_MS = 22000; // Hard 22s limit to strictly prevent Netlify 26s gateway abort
  const functionStartTime = Date.now();

  for (let i = 0; i < targetModels.length; i++) {
    const modelName = targetModels[i];
    const elapsedSoFar = Date.now() - functionStartTime;
    const remainingBudget = FUNCTION_TOTAL_BUDGET_MS - elapsedSoFar;

    // Abort loop gracefully before hitting Netlify container kill if budget is depleted (<3s)
    if (remainingBudget < 3000) {
      console.warn(`[Generate] Insufficient time budget (${remainingBudget}ms) for model ${modelName}. Aborting fallback chain.`);
      break;
    }

    // Allocate timeout for current attempt:
    // First attempt gets up to 11s; subsequent fallbacks get up to 8s (or remaining budget - 1.5s margin)
    const attemptTimeoutMs = i === 0
      ? Math.min(11000, remainingBudget - 1500)
      : Math.min(8000, remainingBudget - 1500);

    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), attemptTimeoutMs);

    try {
      const isGemini25 = modelName.includes('2.5');
      const isGemini3 = modelName.includes('3.') || modelName.includes('3-') || modelName.includes('3_');

      const generationConfig: Record<string, any> = {
        temperature: 0.75,
        maxOutputTokens: 6000,
        responseMimeType: 'application/json'
      };

      // Model ailesine göre düşünme parametresi ayrımı:
      // - Gemini 2.5 modelleri thinkingBudget destekler
      // - Gemini 3.x modelleri thinkingLevel destekler
      // - Gemini 1.5/2.0 modellerine thinkingConfig eklenmez
      if (isGemini25) {
        generationConfig.thinkingConfig = { thinkingBudget: 0 };
      } else if (isGemini3) {
        generationConfig.thinkingConfig = { thinkingLevel: 'minimal' };
      }

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

      let res = await fetch(geminiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig
        }),
        signal: abortController.signal
      });

      // Eğer thinkingConfig nedeniyle 400 (Invalid argument/Unknown field) döndüyse, aynı modele parametresiz hemen yeniden dene
      if (!res.ok && res.status === 400 && generationConfig.thinkingConfig) {
        res = await fetch(geminiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.75,
              maxOutputTokens: 6000,
              responseMimeType: 'application/json'
            }
          }),
          signal: abortController.signal
        });
      }

      clearTimeout(timeoutId);

      if (res.ok) {
        geminiResponse = res;
        usedModel = modelName;
        break;
      } else {
        const errorText = await res.text();
        const shortError = errorText.slice(0, 300);
        console.error(`Gemini model ${modelName} returned status ${res.status}:`, shortError);
        modelErrors.push({
          model: modelName,
          status: res.status,
          error: shortError || `HTTP ${res.status}`
        });
      }
    } catch (fetchErr: any) {
      clearTimeout(timeoutId);
      const isTimeout = fetchErr?.name === 'AbortError' || abortController.signal.aborted;
      const errorMsg = isTimeout
        ? `Model isteği zaman aşımına uğradı (${attemptTimeoutMs}ms)`
        : (fetchErr?.message || String(fetchErr));
      console.error(`Request to model ${modelName} failed or timed out:`, errorMsg);
      modelErrors.push({
        model: modelName,
        status: isTimeout ? 504 : 0,
        error: errorMsg
      });
    }
  }

  if (!geminiResponse) {
    const totalElapsed = Date.now() - functionStartTime;
    return new Response(
      JSON.stringify({
        error: 'Soru üretim servisi şu anda meşgul veya geçici olarak yanıt veremiyor. Lütfen az sonra tekrar deneyiniz.',
        code: 'AI_GATEWAY_UNAVAILABLE',
        attemptedModels: targetModels.slice(0, modelErrors.length),
        details: modelErrors,
        elapsedMs: totalElapsed
      }),
      {
        status: 502,
        headers: corsHeaders
      }
    );
  }

  try {
    const data = await geminiResponse.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    if (!rawText || !rawText.trim()) {
      return new Response(
        JSON.stringify({
          error: 'Model boş yanıt döndürdü veya içerik üretilmedi.',
          code: 'EMPTY_MODEL_OUTPUT'
        }),
        {
          status: 502,
          headers: corsHeaders
        }
      );
    }

    const parseResult = parseExamJsonSafely(rawText);
    if (!parseResult.success || !parseResult.data) {
      console.error('Model JSON parse error in generate function:', parseResult.error);
      return new Response(
        JSON.stringify({
          error: parseResult.error || 'Model çıktısı geçerli JSON formatına dönüştürülemedi.',
          code: 'INVALID_JSON_OUTPUT',
          rawText: rawText.slice(0, 500)
        }),
        {
          status: 422,
          headers: corsHeaders
        }
      );
    }

    const parsedData: any = parseResult.data;
    if (!parsedData.questions || !Array.isArray(parsedData.questions) || parsedData.questions.length === 0) {
      console.error('Model output missing questions array:', Object.keys(parsedData));
      return new Response(
        JSON.stringify({
          error: 'Üretilen yanıt geçerli bir soru şeması (questions dizisi) içermiyor.',
          code: 'INVALID_EXAM_SCHEMA',
          parsedKeys: Object.keys(parsedData)
        }),
        {
          status: 422,
          headers: corsHeaders
        }
      );
    }

    // Her sorunun soru kökünün varlığını ve asgari anlamlılığını kontrol et (boş veya whitespace kökleri engelle)
    const invalidStemIndices: number[] = [];
    for (let i = 0; i < parsedData.questions.length; i++) {
      const q = parsedData.questions[i];
      const stem = typeof q?.question === 'string' ? q.question.trim() : '';
      // Geçerli kısa soru köklerini ("x kaçtır?", "Ana fikir nedir?") reddetme; boşluk ve anlamsız boşlukları yakala
      if (!stem || stem.length < 3) {
        invalidStemIndices.push(q?.number || (i + 1));
      }
    }

    if (invalidStemIndices.length > 0) {
      console.warn('Model output contained questions with missing stems:', invalidStemIndices);
      return new Response(
        JSON.stringify({
          error: `Üretilen sorulardan ${invalidStemIndices.join(', ')}. sorunun kökü eksik veya boş.`,
          code: 'EMPTY_QUESTION_STEM',
          invalidQuestions: invalidStemIndices,
          questions: parsedData.questions,
          activeModel: usedModel
        }),
        {
          status: 422,
          headers: corsHeaders
        }
      );
    }

    return new Response(
      JSON.stringify({
        ...parsedData,
        activeModel: usedModel
      }),
      {
        status: 200,
        headers: corsHeaders
      }
    );
  } catch (err: any) {
    console.error('Response processing error in generate function:', err);
    return new Response(
      JSON.stringify({ error: 'Üretilen sınav yanıtı işlenirken bir sorun oluştu.' }), 
      {
        status: 500,
        headers: corsHeaders
      }
    );
  }
};
