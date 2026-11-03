import generateHandler from '../netlify/functions/generate';

console.log('=== NETLIFY GENERATE FUNCTION PIPELINE & TIMEOUT TEST SUITE ===\n');

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string, detail: string) {
  if (condition) {
    console.log(`[PASS] ✓ ${testName}`);
    console.log(`       Detay: ${detail}\n`);
    passCount++;
  } else {
    console.error(`[FAIL] ✗ ${testName}`);
    console.error(`       Detay: ${detail}\n`);
    failCount++;
  }
}

async function runTests() {
  const originalFetch = globalThis.fetch;
  const originalEnvKey = process.env.GEMINI_API_KEY;
  const originalEnvModel = process.env.GEMINI_MODEL;

  try {
    // -------------------------------------------------------------
    // Test 1: GEMINI_API_KEY missing returns 503
    // -------------------------------------------------------------
    delete process.env.GEMINI_API_KEY;
    const req1 = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'Bu bir MEB kazanım sınav sorusu denemesidir.' })
    });
    const res1 = await generateHandler(req1);
    const json1 = await res1.json();
    assert(
      res1.status === 503 && json1.error.includes('GEMINI_API_KEY'),
      'Test 1: API anahtarı yokken HTTP 503 dönmeli',
      `Status: ${res1.status}, error: ${json1.error}`
    );

    // Setup valid dummy key for subsequent tests
    process.env.GEMINI_API_KEY = 'test-dummy-api-key';

    // -------------------------------------------------------------
    // Test 2: Origin check rejects unauthorized external domain
    // -------------------------------------------------------------
    const req2 = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        origin: 'https://malicious-site.example.com'
      },
      body: JSON.stringify({ prompt: 'Bu bir MEB kazanım sınav sorusu denemesidir.' })
    });
    const res2 = await generateHandler(req2);
    assert(
      res2.status === 403,
      'Test 2: Yetkisiz Origin HTTP 403 ile engellenmeli',
      `Status: ${res2.status}`
    );

    // -------------------------------------------------------------
    // Test 3: Default primary model is gemini-3.5-flash-lite with thinkingLevel
    // -------------------------------------------------------------
    delete process.env.GEMINI_MODEL; // Test default
    let interceptedUrl = '';
    let interceptedBody: any = null;

    globalThis.fetch = (async (url: string, init: any) => {
      interceptedUrl = url;
      interceptedBody = JSON.parse(init.body);
      return new Response(JSON.stringify({
        candidates: [{
          content: {
            parts: [{
              text: JSON.stringify({
                questions: [
                  {
                    number: 1,
                    question: 'Hücre zarının temel görevleri nelerdir?',
                    answer: 'Seçici geçirgenlik sağlar.',
                    rubric: [{ item: 'Doğru cevap', pts: 10 }]
                  }
                ]
              })
            }]
          }
        }]
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }) as any;

    const req3 = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: '5. Sınıf MEB Fen Bilimleri yazılı sınav sorusu kazanım denemesi.' })
    });
    const res3 = await generateHandler(req3);
    const json3 = await res3.json();

    assert(
      res3.status === 200 &&
      interceptedUrl.includes('models/gemini-3.5-flash-lite:generateContent') &&
      interceptedBody?.generationConfig?.thinkingConfig?.thinkingLevel === 'minimal' &&
      json3.activeModel === 'gemini-3.5-flash-lite',
      'Test 3: Varsayılan birincil gemini-3.5-flash-lite modeli çağrılmalı ve thinkingLevel: minimal olmalı',
      `Model: ${json3.activeModel}, URL: ${interceptedUrl}, thinkingLevel: ${interceptedBody?.generationConfig?.thinkingConfig?.thinkingLevel}`
    );

    // -------------------------------------------------------------
    // Test 4: Model Fallback to gemini-2.5-flash using thinkingBudget: 0
    // -------------------------------------------------------------
    const attemptedUrls: string[] = [];
    let bodySentTo25: any = null;
    globalThis.fetch = (async (url: string, init: any) => {
      attemptedUrls.push(url);
      const parsed = JSON.parse(init.body);
      if (url.includes('gemini-3.5-flash-lite:')) {
        return new Response('Model not found or deprecated', { status: 404 });
      }
      if (url.includes('gemini-2.5-flash:')) {
        bodySentTo25 = parsed;
        return new Response(JSON.stringify({
          candidates: [{
            content: {
              parts: [{
                text: JSON.stringify({
                  questions: [
                    {
                      number: 1,
                      question: 'Kuvvetin birimi nedir?',
                      answer: 'Newton',
                      rubric: [{ item: 'Doğru cevap', pts: 10 }]
                    }
                  ]
                })
              }]
            }
          }]
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }
      return new Response('Not found', { status: 404 });
    }) as any;

    const req4 = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: '5. Sınıf MEB Fen Bilimleri yazılı sınav sorusu kazanım denemesi.' })
    });
    const res4 = await generateHandler(req4);
    const json4 = await res4.json();

    assert(
      res4.status === 200 &&
      json4.activeModel === 'gemini-2.5-flash' &&
      bodySentTo25?.generationConfig?.thinkingConfig?.thinkingBudget === 0 &&
      attemptedUrls.length === 2 &&
      attemptedUrls[0].includes('gemini-3.5-flash-lite:') &&
      attemptedUrls[1].includes('gemini-2.5-flash:'),
      'Test 4: Birincil model 404 verdiğinde gemini-2.5-flash modeline geçmeli ve thinkingBudget: 0 kullanmalı',
      `Used Model: ${json4.activeModel}, Attempts: ${attemptedUrls.length}`
    );

    // -------------------------------------------------------------
    // Test 5: Fallback to gemini-1.5-flash has NO thinkingConfig (prevent 400 error)
    // -------------------------------------------------------------
    let bodySentTo15: any = null;
    globalThis.fetch = (async (url: string, init: any) => {
      const parsed = JSON.parse(init.body);
      if (url.includes('gemini-1.5-flash:')) {
        bodySentTo15 = parsed;
        return new Response(JSON.stringify({
          candidates: [{
            content: {
              parts: [{
                text: JSON.stringify({
                  questions: [
                    {
                      number: 1,
                      question: 'Işığın yayılması nasıl gerçekleşir?',
                      answer: 'Doğrusal yayılır.',
                      rubric: [{ item: 'Doğru cevap', pts: 10 }]
                    }
                  ]
                })
              }]
            }
          }]
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }
      return new Response('Service Unavailable', { status: 503 });
    }) as any;

    const req5 = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: '5. Sınıf MEB Fen Bilimleri yazılı sınav sorusu kazanım denemesi.' })
    });
    const res5 = await generateHandler(req5);
    const json5 = await res5.json();

    assert(
      res5.status === 200 &&
      json5.activeModel === 'gemini-1.5-flash' &&
      bodySentTo15?.generationConfig?.thinkingConfig === undefined,
      'Test 5: gemini-1.5-flash modeline thinkingConfig gönderilmemeli (400 hatası önleme)',
      `Used Model: ${json5.activeModel}, thinkingConfig: ${JSON.stringify(bodySentTo15?.generationConfig?.thinkingConfig)}`
    );

    // -------------------------------------------------------------
    // Test 6: ThinkingConfig 400 error auto-recovery without thinkingConfig
    // -------------------------------------------------------------
    let retryAttemptHappened = false;
    globalThis.fetch = (async (url: string, init: any) => {
      const parsed = JSON.parse(init.body);
      if (parsed.generationConfig?.thinkingConfig) {
        return new Response('Unknown name "thinkingConfig" at generationConfig', { status: 400 });
      }
      retryAttemptHappened = true;
      return new Response(JSON.stringify({
        candidates: [{
          content: {
            parts: [{
              text: JSON.stringify({
                questions: [
                  {
                    number: 1,
                    question: 'Hücre çekirdeğinin görevi nedir?',
                    answer: 'Yönetim merkezidir.',
                    rubric: [{ item: 'Doğru cevap', pts: 10 }]
                  }
                ]
              })
            }]
          }
        }]
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }) as any;

    const req6 = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: '5. Sınıf MEB Fen Bilimleri yazılı sınav sorusu kazanım denemesi.' })
    });
    const res6 = await generateHandler(req6);
    const json6 = await res6.json();

    assert(
      res6.status === 200 && retryAttemptHappened === true && json6.activeModel === 'gemini-3.5-flash-lite',
      'Test 6: Model thinkingConfig parametresini 400 ile reddettiğinde aynı model parametresiz kurtarılmalı',
      `Status: ${res6.status}, Retry Happened: ${retryAttemptHappened}`
    );

    // -------------------------------------------------------------
    // Test 7: All models failing returns informative 502 with diagnostics (no key leaked)
    // -------------------------------------------------------------
    globalThis.fetch = (async () => {
      return new Response('Rate limit or quota exceeded', { status: 429 });
    }) as any;

    const req7 = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: '5. Sınıf MEB Fen Bilimleri yazılı sınav sorusu kazanım denemesi.' })
    });
    const res7 = await generateHandler(req7);
    const json7 = await res7.json();

    assert(
      res7.status === 502 &&
      json7.code === 'AI_GATEWAY_UNAVAILABLE' &&
      Array.isArray(json7.details) &&
      json7.details.length > 0 &&
      !JSON.stringify(json7).includes('test-dummy-api-key'),
      'Test 7: Tüm modeller başarısız olduğunda anahtar sızdırmayan ayrıntılı 502 JSON dönmeli',
      `Status: ${res7.status}, Code: ${json7.code}, Details count: ${json7.details?.length}`
    );

  } finally {
    globalThis.fetch = originalFetch;
    if (originalEnvKey !== undefined) {
      process.env.GEMINI_API_KEY = originalEnvKey;
    } else {
      delete process.env.GEMINI_API_KEY;
    }
    if (originalEnvModel !== undefined) {
      process.env.GEMINI_MODEL = originalEnvModel;
    } else {
      delete process.env.GEMINI_MODEL;
    }
  }

  console.log(`\n======================================================`);
  console.log(`TOPLAM: ${passCount + failCount} | BAŞARILI: ${passCount} | BAŞARISIZ: ${failCount}`);
  console.log(`======================================================\n`);

  if (failCount > 0) {
    process.exit(1);
  }
}

runTests();
