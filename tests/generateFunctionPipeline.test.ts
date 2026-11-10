import generateHandler from '../netlify/functions/generate';

console.log('=== NETLIFY GENERATE FUNCTION PIPELINE & TELEMETRY TEST SUITE ===\n');

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
    // Test 2: Origin check rejects unauthorized external domain (403)
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
    // Test 3: Gemini 3.5 Flash-Lite parametresiz çağrılmalı (thinkingConfig yok) ve 200 dönmeli
    // -------------------------------------------------------------
    delete process.env.GEMINI_MODEL; // Default model: gemini-3.5-flash-lite
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
      interceptedBody?.generationConfig?.thinkingConfig === undefined &&
      json3.activeModel === 'gemini-3.5-flash-lite',
      'Test 3: Gemini 3.5 Flash-Lite parametresiz (thinkingConfig olmadan) başarıyla çalışmalı',
      `Model: ${json3.activeModel}, thinkingConfig: ${interceptedBody?.generationConfig?.thinkingConfig}`
    );

    // -------------------------------------------------------------
    // Test 4: Model Fallback: gemini-3.5 404 verdiğinde gemini-3.8-flash modeline geçmeli
    // -------------------------------------------------------------
    const attemptedUrls: string[] = [];
    let bodySentTo38: any = null;
    globalThis.fetch = (async (url: string, init: any) => {
      attemptedUrls.push(url);
      const parsed = JSON.parse(init.body);
      if (url.includes('gemini-3.5-flash-lite:')) {
        return new Response(JSON.stringify({
          error: { code: 404, status: 'NOT_FOUND', message: 'models/gemini-3.5-flash-lite not found' }
        }), { status: 404, headers: { 'Content-Type': 'application/json' } });
      }
      if (url.includes('gemini-3.8-flash:')) {
        bodySentTo38 = parsed;
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
      json4.activeModel === 'gemini-3.8-flash' &&
      attemptedUrls.length === 2 &&
      attemptedUrls[0].includes('gemini-3.5-flash-lite:') &&
      attemptedUrls[1].includes('gemini-3.8-flash:'),
      'Test 4: Birincil model 404 verdiğinde ikincil gemini-3.8-flash modeline geçmeli',
      `Used Model: ${json4.activeModel}, Attempts: ${attemptedUrls.length}`
    );

    // -------------------------------------------------------------
    // Test 5: HTTP 429 Quota Exceeded (RESOURCE_EXHAUSTED):
    // Döngüyü derhal durdurmalı, Retry-After korumalı ve kota hatası dönmeli
    // -------------------------------------------------------------
    let fetchCount429 = 0;
    globalThis.fetch = (async () => {
      fetchCount429++;
      return new Response(JSON.stringify({
        error: {
          code: 429,
          status: 'RESOURCE_EXHAUSTED',
          message: 'Quota exceeded for quota metric Generate Content API requests per minute'
        }
      }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60'
        }
      });
    }) as any;

    const req5 = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: '5. Sınıf MEB Fen Bilimleri yazılı sınav sorusu kazanım denemesi.' })
    });
    const res5 = await generateHandler(req5);
    const json5 = await res5.json();

    assert(
      res5.status === 429 &&
      json5.code === 'RATE_LIMIT_EXCEEDED' &&
      fetchCount429 === 1 &&
      res5.headers.get('retry-after') === '60' &&
      Array.isArray(json5.details) &&
      json5.details[0]?.errorCode === 'RESOURCE_EXHAUSTED',
      'Test 5: HTTP 429 durumunda diğer modeller denenmeden hemen 429 dönmeli ve Retry-After korunmalı',
      `Status: ${res5.status}, Code: ${json5.code}, FetchCount: ${fetchCount429}, Retry-After: ${res5.headers.get('retry-after')}`
    );

    // -------------------------------------------------------------
    // Test 6: HTTP 403 Forbidden: API key yetkisi eksikse 403 dönmeli
    // -------------------------------------------------------------
    globalThis.fetch = (async () => {
      return new Response(JSON.stringify({
        error: { code: 403, status: 'PERMISSION_DENIED', message: 'Method doesn\'t allow unregistered callers' }
      }), { status: 403, headers: { 'Content-Type': 'application/json' } });
    }) as any;

    const req6 = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: '5. Sınıf MEB Fen Bilimleri yazılı sınav sorusu kazanım denemesi.' })
    });
    const res6 = await generateHandler(req6);
    const json6 = await res6.json();

    assert(
      res6.status === 403 && json6.code === 'API_KEY_FORBIDDEN',
      'Test 6: HTTP 403 Permission Denied durumunda API_KEY_FORBIDDEN ile 403 dönmeli',
      `Status: ${res6.status}, Code: ${json6.code}`
    );

    // -------------------------------------------------------------
    // Test 7: HTTP 400 Bad Request Payload: Geçersiz istekte 400 dönmeli
    // -------------------------------------------------------------
    globalThis.fetch = (async () => {
      return new Response(JSON.stringify({
        error: { code: 400, status: 'INVALID_ARGUMENT', message: 'contents[0].parts[0].text is too long' }
      }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }) as any;

    const req7 = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: '5. Sınıf MEB Fen Bilimleri yazılı sınav sorusu kazanım denemesi.' })
    });
    const res7 = await generateHandler(req7);
    const json7 = await res7.json();

    assert(
      res7.status === 400 && json7.code === 'BAD_REQUEST_PAYLOAD',
      'Test 7: HTTP 400 Invalid Argument durumunda BAD_REQUEST_PAYLOAD ile 400 dönmeli',
      `Status: ${res7.status}, Code: ${json7.code}`
    );

    // -------------------------------------------------------------
    // Test 8: Zaman Aşımı (Timeout): Telemetri errorType: TIMEOUT ve status: 504 kaydetmeli
    // -------------------------------------------------------------
    globalThis.fetch = (async () => {
      const err = new Error('The operation was aborted');
      err.name = 'AbortError';
      throw err;
    }) as any;

    const req8 = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: '5. Sınıf MEB Fen Bilimleri yazılı sınav sorusu kazanım denemesi.' })
    });
    const res8 = await generateHandler(req8);
    const json8 = await res8.json();

    assert(
      res8.status === 504 &&
      json8.code === 'GATEWAY_TIMEOUT' &&
      json8.details?.[0]?.errorType === 'TIMEOUT' &&
      json8.details?.[0]?.status === 504 &&
      !JSON.stringify(json8).includes('test-dummy-api-key'),
      'Test 8: Zaman aşımı durumunda HTTP 504 GATEWAY_TIMEOUT dönmeli, telemetri TIMEOUT ve status: 504 kaydetmeli, anahtar sızdırmamalı',
      `Status: ${res8.status}, Code: ${json8.code}, Telemetry: ${JSON.stringify(json8.details?.[0])}`
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
