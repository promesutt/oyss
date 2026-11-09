import generateHandler from '../netlify/functions/generate';
import { generateMEBIQuestions } from '../src/utils/aiGeneratorEngine';
import { SAMPLE_EXAMS } from '../src/data/sampleExams';

console.log('=== TASK193: GEMINI TIME MANAGEMENT & ERROR HANDLING VERIFICATION ===\n');

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

async function runAllTests() {
  const originalFetch = globalThis.fetch;
  const originalEnvKey = process.env.GEMINI_API_KEY;
  const originalEnvModel = process.env.GEMINI_MODEL;

  try {
    process.env.GEMINI_API_KEY = 'test-task193-valid-key';

    // -------------------------------------------------------------
    // Test 1: İlk Gemini denemesi başarılı olduğunda ikinci model çağrılmamalı
    // -------------------------------------------------------------
    delete process.env.GEMINI_MODEL;
    let attemptedModelsTest1: string[] = [];
    globalThis.fetch = (async (url: string) => {
      attemptedModelsTest1.push(url);
      return new Response(JSON.stringify({
        candidates: [{
          content: {
            parts: [{
              text: JSON.stringify({
                questions: [
                  {
                    number: 1,
                    question: 'Hücre zarının seçici geçirgenliğini açıklayınız.',
                    answer: 'Zar sadece küçük ve nötr moleküllerin kolay geçişine izin verir.',
                    rubric: [{ item: 'Doğru açıklama', pts: 10 }]
                  }
                ]
              })
            }]
          }
        }]
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }) as any;

    const req1 = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: '7. Sınıf MEB Fen Bilimleri yazılı sınav sorusu kazanım denemesi.' })
    });
    const res1 = await generateHandler(req1);
    const json1 = await res1.json();

    assert(
      res1.status === 200 &&
      attemptedModelsTest1.length === 1 &&
      json1.activeModel === 'gemini-3.5-flash-lite',
      'Test 1: İlk Gemini denemesi başarılı olduğunda 200 dönmeli ve ikinci model çağrılmamalı',
      `Status: ${res1.status}, Model: ${json1.activeModel}, Çağrı Sayısı: ${attemptedModelsTest1.length}`
    );

    // -------------------------------------------------------------
    // Test 2: İlk deneme timeout, ikinci deneme başarılı
    // -------------------------------------------------------------
    let attemptCountTest2 = 0;
    globalThis.fetch = (async (url: string) => {
      attemptCountTest2++;
      if (url.includes('gemini-3.5-flash-lite')) {
        const timeoutErr = new Error('The operation was aborted');
        timeoutErr.name = 'AbortError';
        throw timeoutErr;
      }
      // İkinci model (gemini-2.5-flash) başarılı döner
      return new Response(JSON.stringify({
        candidates: [{
          content: {
            parts: [{
              text: JSON.stringify({
                questions: [
                  {
                    number: 1,
                    question: 'Makaraların kuvvet kazancını açıklayınız.',
                    answer: 'Hareketli makaralarda kuvvet kazancı 2 katıdır.',
                    rubric: [{ item: 'Doğru formül', pts: 10 }]
                  }
                ]
              })
            }]
          }
        }]
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }) as any;

    const req2 = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: '7. Sınıf MEB Fen Bilimleri yazılı sınav sorusu kazanım denemesi.' })
    });
    const res2 = await generateHandler(req2);
    const json2 = await res2.json();

    assert(
      res2.status === 200 &&
      attemptCountTest2 === 2 &&
      json2.activeModel === 'gemini-2.5-flash',
      'Test 2: İlk deneme timeout olduğunda ikinci deneme devreye girmeli ve başarılı olmalı',
      `Status: ${res2.status}, Model: ${json2.activeModel}, Toplam Deneme: ${attemptCountTest2}`
    );

    // -------------------------------------------------------------
    // Test 3: İlk deneme 429 (Kota aşımı), anında 429 dönmeli ve diğer modeller denenmemeli
    // -------------------------------------------------------------
    let attemptCountTest3 = 0;
    globalThis.fetch = (async () => {
      attemptCountTest3++;
      return new Response(JSON.stringify({
        error: { code: 429, status: 'RESOURCE_EXHAUSTED', message: 'Quota exceeded for quota metric Generate Content' }
      }), { status: 429, headers: { 'Content-Type': 'application/json', 'Retry-After': '45' } });
    }) as any;

    const req3 = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: '7. Sınıf MEB Fen Bilimleri yazılı sınav sorusu kazanım denemesi.' })
    });
    const res3 = await generateHandler(req3);
    const json3 = await res3.json();

    assert(
      res3.status === 429 &&
      json3.code === 'RATE_LIMIT_EXCEEDED' &&
      json3.retryAfter === '45' &&
      attemptCountTest3 === 1,
      'Test 3: İlk deneme 429 aldığında anında 429 dönmeli ve başka model denenmemeli',
      `Status: ${res3.status}, Code: ${json3.code}, Retry-After: ${json3.retryAfter}, Deneme: ${attemptCountTest3}`
    );

    // -------------------------------------------------------------
    // Test 4: İlk deneme 503 (Servis Kullanılamıyor), uygun hata kodu
    // -------------------------------------------------------------
    globalThis.fetch = (async () => {
      return new Response(JSON.stringify({
        error: { code: 503, status: 'UNAVAILABLE', message: 'The service is currently overloaded.' }
      }), { status: 503, headers: { 'Content-Type': 'application/json' } });
    }) as any;

    const req4 = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: '7. Sınıf MEB Fen Bilimleri yazılı sınav sorusu kazanım denemesi.' })
    });
    const res4 = await generateHandler(req4);
    const json4 = await res4.json();

    assert(
      res4.status === 503 && json4.code === 'SERVICE_UNAVAILABLE',
      'Test 4: Servis 503 verdiğinde sunucu 503 SERVICE_UNAVAILABLE dönmeli',
      `Status: ${res4.status}, Code: ${json4.code}, Error: ${json4.error}`
    );

    // -------------------------------------------------------------
    // Test 5: İki deneme de başarısız (Timeout), HTTP 504 dönmeli
    // -------------------------------------------------------------
    globalThis.fetch = (async () => {
      const timeoutErr = new Error('The operation was aborted');
      timeoutErr.name = 'AbortError';
      throw timeoutErr;
    }) as any;

    const req5 = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: '7. Sınıf MEB Fen Bilimleri yazılı sınav sorusu kazanım denemesi.' })
    });
    const res5 = await generateHandler(req5);
    const json5 = await res5.json();

    assert(
      res5.status === 504 && json5.code === 'GATEWAY_TIMEOUT',
      'Test 5: İki deneme de zaman aşımına uğradığında HTTP 504 GATEWAY_TIMEOUT dönmeli',
      `Status: ${res5.status}, Code: ${json5.code}, Error: ${json5.error}`
    );

    // -------------------------------------------------------------
    // Test 6: İkinci deneme için yeterli süre kalmamışsa (< 6000ms), yeni model başlatılmamalı
    // -------------------------------------------------------------
    let attemptCountTest6 = 0;
    const realDateNow = Date.now;
    let virtualNow = 100000;
    Date.now = () => virtualNow;

    globalThis.fetch = (async () => {
      attemptCountTest6++;
      // İlk deneme 16.5 sn sürüyor ve timeout oluyor
      virtualNow += 16600;
      const timeoutErr = new Error('The operation was aborted');
      timeoutErr.name = 'AbortError';
      throw timeoutErr;
    }) as any;

    const req6 = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: '7. Sınıf MEB Fen Bilimleri yazılı sınav sorusu kazanım denemesi.' })
    });
    const res6 = await generateHandler(req6);
    const json6 = await res6.json();
    Date.now = realDateNow;

    assert(
      res6.status === 504 &&
      attemptCountTest6 === 1 &&
      json6.details.length === 1,
      'Test 6: Kalan bütçe 6 saniyenin altındaysa ikinci model başlatılmadan anında çıkılmalı',
      `Status: ${res6.status}, Yapılan Deneme: ${attemptCountTest6}, Telemetri Kaydı: ${json6.details.length}`
    );

    // -------------------------------------------------------------
    // Test 7: Geçersiz JSON veya şema yanıtı, HTTP 422 dönmeli
    // -------------------------------------------------------------
    globalThis.fetch = (async () => {
      return new Response(JSON.stringify({
        candidates: [{
          content: {
            parts: [{
              text: 'Bu bir JSON metni değil, salt metin yanıtıdır.'
            }]
          }
        }]
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }) as any;

    const req7 = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: '7. Sınıf MEB Fen Bilimleri yazılı sınav sorusu kazanım denemesi.' })
    });
    const res7 = await generateHandler(req7);
    const json7 = await res7.json();

    assert(
      res7.status === 422 && json7.code === 'INVALID_JSON_OUTPUT',
      'Test 7: Model geçersiz JSON döndürdüğünde HTTP 422 INVALID_JSON_OUTPUT üretilmeli',
      `Status: ${res7.status}, Code: ${json7.code}`
    );

    // -------------------------------------------------------------
    // Test 8: İstemcinin sunucudan gelen gerçek hata türünü koruması
    // -------------------------------------------------------------
    const mockExam = SAMPLE_EXAMS.find(e => e.grade === 7 && e.subjectId === 'fen_bilimleri' && e.scenarioId === 'senaryo_1')!;
    const mockScenario = {
      id: 'senaryo_1',
      name: '1. Senaryo',
      description: '7. Sınıf Fen Bilimleri 1. Dönem 1. Yazılı',
      totalQuestions: mockExam.questions.length,
      distributions: mockExam.questions.map(q => ({
        outcomeCode: q.outcomeCode,
        outcomeTitle: q.outcomeTitle,
        count: 1
      }))
    };

    globalThis.fetch = (async (url: string) => {
      if (typeof url === 'string' && url.includes('/api/generate')) {
        return new Response(JSON.stringify({
          error: 'Yapay zekâ yanıtı belirlenen sürede tamamlayamadı (Zaman aşımı).',
          code: 'GATEWAY_TIMEOUT',
          elapsedMs: 16500
        }), { status: 504, headers: { 'Content-Type': 'application/json' } });
      }
      return new Response('Not found', { status: 404 });
    }) as any;

    const result8 = await generateMEBIQuestions(
      'fen_bilimleri',
      7,
      mockScenario,
      0
    );

    assert(
      result8.isFallback === true &&
      result8.fallbackReason !== undefined &&
      result8.fallbackReason.includes('Zaman aşımı') &&
      result8.fallbackReason.includes('yerel OYSS standart motoruyla'),
      'Test 8: İstemci HTTP 504 Zaman Aşımı hatasını koruyarak kullanıcıya doğru bildirmeli',
      `isFallback: ${result8.isFallback}, fallbackReason: "${result8.fallbackReason}"`
    );

    // -------------------------------------------------------------
    // Test 9: HTTP 429 Kota aşımında istemcinin doğru mesajı göstermesi
    // -------------------------------------------------------------
    globalThis.fetch = (async (url: string) => {
      if (typeof url === 'string' && url.includes('/api/generate')) {
        return new Response(JSON.stringify({
          error: 'Yapay zekâ servis kotası geçici olarak doldu (429 - Çok sık istek). Lütfen bir dakika bekledikten sonra tekrar deneyiniz.',
          code: 'RATE_LIMIT_EXCEEDED'
        }), { status: 429, headers: { 'Content-Type': 'application/json' } });
      }
      return new Response('Not found', { status: 404 });
    }) as any;

    const result9 = await generateMEBIQuestions(
      'fen_bilimleri',
      7,
      mockScenario,
      0
    );

    assert(
      result9.isFallback === true &&
      result9.fallbackReason !== undefined &&
      result9.fallbackReason.includes('429'),
      'Test 9: İstemci HTTP 429 Kota hatasını koruyarak kullanıcıya doğru bildirmeli',
      `isFallback: ${result9.isFallback}, fallbackReason: "${result9.fallbackReason}"`
    );

    // -------------------------------------------------------------
    // Test 10: HTTP 503 Servis Kullanılamıyor istemci testi
    // -------------------------------------------------------------
    globalThis.fetch = (async (url: string) => {
      if (typeof url === 'string' && url.includes('/api/generate')) {
        return new Response(JSON.stringify({
          error: 'Yapay zekâ servisi geçici olarak hizmet veremiyor (HTTP 503).',
          code: 'SERVICE_UNAVAILABLE'
        }), { status: 503, headers: { 'Content-Type': 'application/json' } });
      }
      return new Response('Not found', { status: 404 });
    }) as any;

    const result10 = await generateMEBIQuestions('fen_bilimleri', 7, mockScenario, 0);

    assert(
      result10.isFallback === true &&
      result10.fallbackReason !== undefined &&
      result10.fallbackReason.includes('503') &&
      result10.fallbackReason.includes('yerel OYSS standart motoruyla'),
      'Test 10: İstemci HTTP 503 Servis Kullanılamıyor hatasını koruyarak kullanıcıya doğru bildirmeli',
      `isFallback: ${result10.isFallback}, fallbackReason: "${result10.fallbackReason}"`
    );

    // -------------------------------------------------------------
    // Test 11: HTTP 403 Yetki / API Anahtarı Reddi istemci testi
    // -------------------------------------------------------------
    globalThis.fetch = (async (url: string) => {
      if (typeof url === 'string' && url.includes('/api/generate')) {
        return new Response(JSON.stringify({
          error: 'Yapay zekâ API anahtarının bu işlem için yetkisi bulunmuyor (403 Erişim Reddedildi).',
          code: 'API_KEY_FORBIDDEN'
        }), { status: 403, headers: { 'Content-Type': 'application/json' } });
      }
      return new Response('Not found', { status: 404 });
    }) as any;

    const result11 = await generateMEBIQuestions('fen_bilimleri', 7, mockScenario, 0);

    assert(
      result11.isFallback === true &&
      result11.fallbackReason !== undefined &&
      (result11.fallbackReason.includes('403') || result11.fallbackReason.includes('yetki')) &&
      result11.fallbackReason.includes('yerel OYSS standart motoruyla'),
      'Test 11: İstemci HTTP 403 Yetki Hatasını koruyarak kullanıcıya doğru bildirmeli',
      `isFallback: ${result11.isFallback}, fallbackReason: "${result11.fallbackReason}"`
    );

    // -------------------------------------------------------------
    // Test 12: HTTP 400 Geçersiz İstek Parametresi istemci testi
    // -------------------------------------------------------------
    globalThis.fetch = (async (url: string) => {
      if (typeof url === 'string' && url.includes('/api/generate')) {
        return new Response(JSON.stringify({
          error: 'Yapay zekâ servisine iletilen istek parametreleri geçersiz (400 Hatalı İstek).',
          code: 'BAD_REQUEST_PAYLOAD'
        }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }
      return new Response('Not found', { status: 404 });
    }) as any;

    const result12 = await generateMEBIQuestions('fen_bilimleri', 7, mockScenario, 0);

    assert(
      result12.isFallback === true &&
      result12.fallbackReason !== undefined &&
      (result12.fallbackReason.includes('400') || result12.fallbackReason.includes('parametre')) &&
      result12.fallbackReason.includes('yerel OYSS standart motoruyla'),
      'Test 12: İstemci HTTP 400 Geçersiz İstek Parametresi hatasını koruyarak kullanıcıya doğru bildirmeli',
      `isFallback: ${result12.isFallback}, fallbackReason: "${result12.fallbackReason}"`
    );

    // -------------------------------------------------------------
    // Test 13: HTTP 422 Şema / Biçimsel JSON Hatası istemci testi
    // -------------------------------------------------------------
    globalThis.fetch = (async (url: string) => {
      if (typeof url === 'string' && url.includes('/api/generate')) {
        return new Response(JSON.stringify({
          error: 'Model çıktısı geçerli JSON formatına dönüştürülemedi.',
          code: 'INVALID_JSON_OUTPUT'
        }), { status: 422, headers: { 'Content-Type': 'application/json' } });
      }
      return new Response('Not found', { status: 404 });
    }) as any;

    const result13 = await generateMEBIQuestions('fen_bilimleri', 7, mockScenario, 0);

    assert(
      result13.isFallback === true &&
      result13.fallbackReason !== undefined &&
      result13.fallbackReason.includes('yerel OYSS standart motoruyla'),
      'Test 13: İstemci HTTP 422 Şema Hatasında yerel motora geçiş nedenini doğru bildirmeli',
      `isFallback: ${result13.isFallback}, fallbackReason: "${result13.fallbackReason}"`
    );

    // -------------------------------------------------------------
    // Test 14: Eksik API Anahtarı (503 MISSING_API_KEY) istemci testi
    // -------------------------------------------------------------
    globalThis.fetch = (async (url: string) => {
      if (typeof url === 'string' && url.includes('/api/generate')) {
        return new Response(JSON.stringify({
          error: 'Soru üretim servisi yapılandırılmamış (GEMINI_API_KEY eksik). Lütfen Netlify yönetim panelinden ortam değişkenini tanımlayınız.',
          code: 'MISSING_API_KEY'
        }), { status: 503, headers: { 'Content-Type': 'application/json' } });
      }
      return new Response('Not found', { status: 404 });
    }) as any;

    const result14 = await generateMEBIQuestions('fen_bilimleri', 7, mockScenario, 0);

    assert(
      result14.isFallback === true &&
      result14.fallbackReason !== undefined &&
      result14.fallbackReason.includes('GEMINI_API_KEY eksik') &&
      result14.fallbackReason.includes('yerel OYSS standart motoruyla'),
      'Test 14: İstemci Eksik API Anahtarı (503 MISSING_API_KEY) durumunu güvenli ve doğru bildirmeli',
      `isFallback: ${result14.isFallback}, fallbackReason: "${result14.fallbackReason}"`
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
  console.log(`TASK193 TESTLERİ: ${passCount + failCount} | BAŞARILI: ${passCount} | BAŞARISIZ: ${failCount}`);
  console.log(`======================================================\n`);

  if (failCount > 0) {
    process.exit(1);
  }
}

runAllTests();
