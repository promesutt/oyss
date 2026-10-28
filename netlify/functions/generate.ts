export default async (req: Request) => {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Retrieve API key strictly from server environment variables
  const apiKey = (process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '').trim();
  const configuredModel = (process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite').trim();

  if (!apiKey) {
    return new Response(
      JSON.stringify({ 
        error: 'Sunucu tarafında GEMINI_API_KEY ortam değişkeni bulunamadı. Lütfen Netlify veya barındırma panelinizde "add variable" ile GEMINI_API_KEY ekleyiniz.' 
      }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    const body = await req.json();
    const prompt = body.prompt;

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt parametresi zorunludur.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // En güncel ve en az token harcayan tasarruflu Gemini modelleri (Öncelik: 3.5 Flash-Lite)
    const targetModels = Array.from(new Set([
      configuredModel,
      'gemini-3.5-flash-lite',
      'gemini-3.5-flash',
      'gemini-2.5-flash-lite',
      'gemini-2.5-flash'
    ]));

    let geminiResponse: Response | null = null;
    let usedModel = configuredModel;
    let lastErrorText = '';

    for (const modelName of targetModels) {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
      
      const res = await fetch(geminiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            responseMimeType: 'application/json'
          }
        })
      });

      if (res.ok) {
        geminiResponse = res;
        usedModel = modelName;
        break;
      } else {
        lastErrorText = await res.text();
      }
    }

    if (!geminiResponse) {
      return new Response(
        JSON.stringify({ error: 'Gemini API çağrısı başarısız oldu.', details: lastErrorText }), 
        {
          status: 502,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const data = await geminiResponse.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const cleanJson = rawText.replace(/```(?:json)?/gi, '').trim();
    
    let parsedData;
    try {
      parsedData = JSON.parse(cleanJson);
    } catch {
      parsedData = data;
    }

    return new Response(JSON.stringify({ ...parsedData, activeModel: usedModel }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: 'Sunucu hatası', details: err?.message || String(err) }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
