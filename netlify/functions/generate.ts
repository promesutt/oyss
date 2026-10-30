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

  if (prompt.length > 15000) {
    return new Response(JSON.stringify({ error: 'Prompt metni izin verilen karakter sınırını (15.000) aşıyor.' }), {
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

  // 4. Model Selection and Execution with Timeout
  const targetModels = Array.from(new Set([
    configuredModel,
    'gemini-3.5-flash-lite',
    'gemini-3.5-flash',
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash'
  ]));

  let geminiResponse: Response | null = null;
  let usedModel = configuredModel;

  for (const modelName of targetModels) {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
    
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 22000); // 22 second timeout

    try {
      const res = await fetch(geminiUrl, {
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

      clearTimeout(timeoutId);

      if (res.ok) {
        geminiResponse = res;
        usedModel = modelName;
        break;
      } else {
        const errorText = await res.text();
        console.error(`Gemini model ${modelName} returned status ${res.status}:`, errorText.slice(0, 300));
      }
    } catch (fetchErr: any) {
      clearTimeout(timeoutId);
      console.error(`Request to model ${modelName} failed or timed out:`, fetchErr?.name || fetchErr);
    }
  }

  if (!geminiResponse) {
    return new Response(
      JSON.stringify({ error: 'Soru üretim servisi şu anda meşgul veya geçici olarak yanıt veremiyor. Lütfen az sonra tekrar deneyiniz.' }), 
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
