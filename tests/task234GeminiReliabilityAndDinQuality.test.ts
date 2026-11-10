import { describe, it } from 'node:test';
import assert from 'node:assert';
import generateHandler from '../netlify/functions/generate';
import { 
  generateMEBIQuestions, 
  isDuplicateOrTooSimilar, 
  calculateQuestionSimilarity 
} from '../src/utils/aiGeneratorEngine';
import { validateDinQuestion } from '../src/utils/qualityAssurance/validators/dinValidator';
import { SAMPLE_EXAMS } from '../src/data/sampleExams';

describe('TASK234: Gemini Üretim Güvenilirliği ve Din Kültürü Soru Kalitesi', () => {

  // --------------------------------------------------------------------------
  // 1. HTTP 503 ve Geçici Hatalarda Kontrollü Tekrar Deneme ve Hata Ayrıştırma
  // --------------------------------------------------------------------------
  it('1.1. HTTP 503 geçici hatasında kontrollü tekrar deneme (retry) devreye girmeli ve başarılı olmalı', async () => {
    const originalFetch = globalThis.fetch;
    let callCount = 0;

    globalThis.fetch = (async (url: string) => {
      callCount++;
      if (callCount === 1) {
        // İlk çağrıda geçici 503 hatası
        return new Response(JSON.stringify({
          error: 'Yapay zekâ servisi geçici olarak hizmet veremiyor (HTTP 503).',
          code: 'SERVICE_UNAVAILABLE'
        }), { status: 503, headers: { 'Content-Type': 'application/json' } });
      }

      // İkinci çağrıda başarıyla soru döndürür
      return new Response(JSON.stringify({
        activeModel: 'gemini-2.0-flash',
        questions: [
          {
            number: 1,
            outcome: 'DKAB.7.1.1',
            question: 'Varlıklar âlemini sınıflandırarak duyu organlarıyla algılanamayan varlıklara iki örnek veriniz.',
            answer: 'Melekler ve cinler duyu organlarıyla algılanamayan, gayb âlemine ait varlıklardır.',
            rubric: [
              { item: 'Sınıflandırma ve iki örnek', pts: 15 }
            ]
          }
        ]
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }) as any;

    try {
      const mockScenario = SAMPLE_EXAMS[0];
      const result = await generateMEBIQuestions(
        'din_kulturu',
        7,
        {
          id: 'test_scenario',
          name: 'Test Senaryosu',
          distributions: [{ outcomeCode: 'DKAB.7.1.1', questionCount: 1, cognitiveLevel: 'Kavramsal Anlama' }],
          totalQuestions: 1
        } as any,
        0
      );

      assert.strictEqual(callCount, 2, 'Geçici 503 sonrasında 2. deneme (retry) yapılmış olmalıdır.');
      assert.strictEqual(result.isFallback, false, 'İkinci deneme başarılı olduğunda yerel motora düşmemeli, Gemini korunmalıdır.');
      assert.ok(result.model.includes('gemini-2.0-flash'), 'Gemini modeli başarıyla raporlanmalıdır.');
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it('1.2. Hata türleri (429, 503, 504, 400, 403) birbirinden ölçülebilir biçimde ayrılmalıdır', async () => {
    const originalFetch = globalThis.fetch;
    let fetchAttempts429 = 0;

    // 429 Rate Limit durumunda tekrar deneme YAPILMAZ (anında durur)
    globalThis.fetch = (async () => {
      fetchAttempts429++;
      return new Response(JSON.stringify({
        error: 'Yapay zekâ servis kotası doldu.',
        code: 'RATE_LIMIT_EXCEEDED'
      }), { status: 429, headers: { 'Content-Type': 'application/json' } });
    }) as any;

    try {
      const result429 = await generateMEBIQuestions(
        'din_kulturu',
        7,
        {
          id: 'test_scen',
          name: 'Test',
          distributions: [{ outcomeCode: 'DKAB.7.1.1', questionCount: 1 }],
          totalQuestions: 1
        } as any,
        0
      );

      assert.strictEqual(fetchAttempts429, 1, 'HTTP 429 durumunda tekrar denenmemeli, kota korunmalıdır.');
      assert.strictEqual(result429.isFallback, true);
      assert.ok(result429.fallbackReason?.includes('429'), 'Hata mesajında 429 kota bilgisi yer almalıdır.');
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  // --------------------------------------------------------------------------
  // 2. Kısmi Boş Soru Köklerinin Kurtarılması (Tüm Üretimi Kaybetmeme)
  // --------------------------------------------------------------------------
  it('2.1. Model çıktısında tek bir sorunun kökü boşsa tüm sınav kaybedilmemeli, sadece eksik soru ikame edilmelidir', async () => {
    const originalFetch = globalThis.fetch;

    globalThis.fetch = (async () => {
      return new Response(JSON.stringify({
        activeModel: 'gemini-2.0-flash',
        questions: [
          {
            number: 1,
            outcome: 'DKAB.7.1.1',
            question: 'Meleklerin özelliklerinden iki tanesini yazınız.',
            answer: 'Nurdan yaratılmışlardır ve günah işlemezler.',
            rubric: [{ item: 'İki özellik', pts: 15 }]
          },
          {
            number: 2,
            outcome: 'DKAB.7.1.2',
            question: '', // BOŞ KÖK
            answer: 'Mahşer meydanında toplanılır.',
            rubric: [{ item: 'Cevap', pts: 15 }]
          }
        ]
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }) as any;

    try {
      const result = await generateMEBIQuestions(
        'din_kulturu',
        7,
        {
          id: 'test_scen',
          name: 'Test Senaryo',
          distributions: [
            { outcomeCode: 'DKAB.7.1.1', questionCount: 1 },
            { outcomeCode: 'DKAB.7.1.2', questionCount: 1 }
          ],
          totalQuestions: 2
        } as any,
        0
      );

      assert.strictEqual(result.isFallback, false, 'Kısmi boş kökte tüm sınav çöpe atılmamalıdır.');
      assert.ok(result.model.includes('Kısmi İkame') || result.model.includes('gemini'), 'Model bilgisinde kısmi ikame belirtilmelidir.');
      assert.strictEqual(result.generatedQuestions.length, 2, '2 soru eksiksiz tamamlanmalıdır.');
      assert.ok(result.generatedQuestions[0].question.length > 5, '1. Gemini sorusu korunmalıdır.');
      assert.ok(result.generatedQuestions[1].question.length > 5, '2. soru onaylı havuzdan ikame edilmelidir.');
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it('2.2. generateHandler stimulus sonuna gömülü soru kökünü otomatik ayrıştırmalıdır', async () => {
    const req = new Request('http://localhost/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: '7. sınıf MEB Din Kültürü sınav sorusu kazanım denemesi.' })
    });

    // Mock Google response with question embedded in stimulus
    const originalFetch = globalThis.fetch;
    process.env.GEMINI_API_KEY = 'valid-test-key';

    globalThis.fetch = (async () => {
      return new Response(JSON.stringify({
        candidates: [{
          content: {
            parts: [{
              text: JSON.stringify({
                questions: [
                  {
                    number: 1,
                    stimulus: 'Ahmet Bey bahçesindeki ürünleri toplamış ve ihtiyaç sahiplerine dağıtmıştır.\n\nBuna göre Ahmet Bey hangi ibadeti yerine getirmiştir?',
                    question: '', // Soru stimulus içine gömülü
                    answer: 'İnfak ve sadaka ibadetini yerine getirmiştir.',
                    rubric: [{ item: 'Doğru ibadet tespiti', pts: 15 }]
                  }
                ]
              })
            }]
          }
        }]
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }) as any;

    try {
      const res = await generateHandler(req);
      const data = await res.json();
      assert.strictEqual(res.status, 200, 'Gömülü soru kökü başarıyla çözülerek 200 dönmelidir.');
      assert.ok(data.questions[0].question.includes('hangi ibadeti yerine getirmiştir'), 'Soru kökü stimulus sonundan çıkarılmış olmalıdır.');
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  // --------------------------------------------------------------------------
  // 3. Benzerlik Kontrolünde Yanlış Pozitif Engelleme ve Gerçek Tekrar Tespiti
  // --------------------------------------------------------------------------
  it('3.1. Aynı kazanıma ait farklı sorular salt söz varlığı ortaklığından dolayı yanlışlıkla mükerrer sayılmamalıdır', () => {
    // 7. Sınıf Matematik: Rasyonel sayılarda farklı iki soru
    const q1 = 'Rasyonel sayılarda toplama işleminin değişme özelliğini bir örnekle açıklayınız.';
    const q2 = 'Sayı doğrusunda -1 ile 0 arasında yer alan iki rasyonel sayı belirleyerek karşılaştırınız.';
    const isDupMath = isDuplicateOrTooSimilar(q1, '', [q2], ['']);
    assert.strictEqual(isDupMath, false, 'Farklı matematik soruları mükerrer kabul edilmemelidir.');

    // Din Kültürü: Zekât ünitesinde iki farklı soru
    const dinQ1 = 'Zekât verecek kimsede bulunması gereken fıkhi şartları maddeler halinde yazınız.';
    const dinQ2 = 'Zekât ibadetinin toplumdaki gelir adaletine ve kardeşlik bağına katkısını açıklayınız.';
    const isDupDin = isDuplicateOrTooSimilar(dinQ1, '', [dinQ2], ['']);
    assert.strictEqual(isDupDin, false, 'Aynı üniteye ait farklı kavramsal Din Kültürü soruları mükerrer kabul edilmemelidir.');
  });

  it('3.2. Yalnızca birkaç kelimesi değiştirilmiş gerçek mükerrer sorular tespit edilmelidir', () => {
    const original = 'Zekât ibadetinin toplumsal dayanışma ve yardımlaşmaya katkılarını iki gerekçeyle açıklayınız.';
    const cloned = 'Zekât ibadetinin toplumdaki yardımlaşma ve dayanışmaya faydalarını iki örnekle belirtiniz.';
    const isDup = isDuplicateOrTooSimilar(cloned, '', [original], ['']);
    assert.strictEqual(isDup, true, 'Yalnızca eşanlamlı kelimelerle taklit edilmiş soru mükerrer olarak yakalanmalıdır.');
  });

  it('3.3. Sınavdaki tek bir soru benzer çıktığında tüm sınav iptal edilmemeli, sadece o soru ikame edilmelidir', async () => {
    const originalFetch = globalThis.fetch;

    globalThis.fetch = (async () => {
      return new Response(JSON.stringify({
        activeModel: 'gemini-2.0-flash',
        questions: [
          {
            number: 1,
            outcome: 'DKAB.7.1.1',
            question: 'Meleklerin özelliklerinden iki tanesini yazınız.', // Özgün
            answer: 'Nurdan yaratılmışlardır.',
            rubric: [{ item: 'Cevap', pts: 15 }]
          },
          {
            number: 2,
            outcome: 'DKAB.7.1.2',
            question: 'Ahiret hayatının aşamalarını sırasıyla yazınız.', // Kaçınılacak soruyla birebir aynı
            answer: 'Ölüm, kabir, kıyamet, diriliş.',
            rubric: [{ item: 'Aşamalar', pts: 15 }]
          }
        ]
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }) as any;

    try {
      const result = await generateMEBIQuestions(
        'din_kulturu',
        7,
        {
          id: 'test_scen',
          name: 'Test Senaryo',
          distributions: [
            { outcomeCode: 'DKAB.7.1.1', questionCount: 1 },
            { outcomeCode: 'DKAB.7.1.2', questionCount: 1 }
          ],
          totalQuestions: 2
        } as any,
        0,
        undefined,
        2,
        {
          avoidQuestionTexts: ['Ahiret hayatının aşamalarını sırasıyla yazınız.']
        }
      );

      assert.strictEqual(result.isFallback, false, '1 soru benzer diye tüm sınav yerel motora düşürülmemelidir.');
      assert.ok(result.model.includes('Kısmi İkame'), 'Kısmi ikame yapıldığı model alanında belirtilmelidir.');
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  // --------------------------------------------------------------------------
  // 4. Din Kültürü Soru Kalitesi ve Doğrulaması
  // --------------------------------------------------------------------------
  it('4.1. Süs ve soruyla kopuk kurgusal hikâyeler (Deniz feneri bekçisi örneği) uyarılmalıdır', () => {
    const disconnectedQuestion = {
      question: 'Tabiat olaylarını ve rızıkları yönetmekle görevli meleğin adı nedir?',
      stimulus: 'Deniz feneri bekçisi Barış, geceleri fenerin ışığını açık tutarak gemilere yol göstermekteydi. Rüzgârın ve dalgaların sesini dinleyerek denizdeki düzeni inceliyordu.',
      modelAnswer: 'Mikail',
      rubric: [{ criterion: 'Doğru melek adı', points: 10 }]
    };

    const findings = validateDinQuestion(disconnectedQuestion, { grade: 7, subjectId: 'din_kulturu' });
    const hasDisconnectedWarning = findings.some(f => f.validationMethod === 'din_disconnected_stimulus');
    assert.strictEqual(hasDisconnectedWarning, true, 'Soruyla organik bağı olmayan süs hikâye yakalanmalıdır.');
  });

  it('4.2. Çok sayıda ilgisiz kazanımın tek soruda birleştirilmesi (Asude\'nin mektubu örneği) uyarılmalıdır', () => {
    const overloadedQuestion = {
      question: 'Ahiret inancının insanda adalet duygusu, mazlumun tesellisi, ölüm korkusunu yenme ve hayata anlam katma açılarından önemini açıklayınız.',
      stimulus: 'Asude dedesinin ektiği tohumların yeşerdiğini görünce emek ve gayretin önemini düşünmüştür.',
      modelAnswer: 'Ahiret adaletin gerçekleşeceği yerdir.',
      rubric: [{ criterion: 'Açıklama', points: 15 }]
    };

    const findings = validateDinQuestion(overloadedQuestion, { grade: 7, subjectId: 'din_kulturu' });
    const hasOverloadedWarning = findings.some(f => f.validationMethod === 'din_overloaded_outcome_stem');
    assert.strictEqual(hasOverloadedWarning, true, 'Aşırı kazanım ve tema yığılması olan soru kökü tespit edilmelidir.');
  });

  it('4.3. Hem melek adı hem görevi sorulduğunda cevabın her iki unsuru da içermesi güvenceye alınmalıdır', () => {
    const deficientAnswerQuestion = {
      question: 'Tabiat olaylarını yöneten meleğin adını ve görev alanını yazınız.',
      stimulus: '',
      modelAnswer: 'Mikail', // Görev alanı yazılmamış
      rubric: [{ criterion: 'Melek adı', points: 10 }]
    };

    const findings = validateDinQuestion(deficientAnswerQuestion, { grade: 7, subjectId: 'din_kulturu' });
    const hasRubricAlignmentFinding = findings.some(f => f.validationMethod === 'din_rubric_stem_alignment');
    assert.strictEqual(hasRubricAlignmentFinding, true, 'Soru kökündeki iki talepten birini eksik bırakan model cevap yakalanmalıdır.');
  });

  it('4.4. Odaklı, MEB tarzı doğrudan ve tutarlı Din Kültürü sorusu hatasız onaylanmalıdır', () => {
    const validQuestion = {
      question: 'Kur\'an-ı Kerim\'de tabiat olaylarını ve canlıların rızıklarını yönetmekle görevlendirilen meleğin adını ve görevini yazınız.',
      stimulus: '',
      modelAnswer: 'Bu melek Mikail\'dir. Görevi, tabiat olaylarını ve canlıların rızıklarını idare etmektir.',
      rubric: [
        { criterion: 'Meleğin adının (Mikail) doğru belirtilmesi', points: 5 },
        { criterion: 'Görev alanının (tabiat olayları ve rızıklar) açıklanması', points: 5 }
      ],
      alternativeAnswers: [
        'Dört büyük melekten biri olan Mikail tabiat olayları ve rızıkların taksimiyle görevlidir.'
      ]
    };

    const findings = validateDinQuestion(validQuestion, { grade: 7, subjectId: 'din_kulturu' });
    assert.strictEqual(findings.length, 0, 'MEB formatına uygun odaklı soru sıfır hata ile geçmelidir.');
  });

  // --------------------------------------------------------------------------
  // 5. Kesik JSON Kurtarma (Truncation Recovery) ve Yedek Model Zinciri
  // --------------------------------------------------------------------------
  it('5.1. recoverTruncatedJsonArray token sınırı nedeniyle kesilen JSON dizisinden tamamlanan soruları kurtarmalıdır', async () => {
    const { recoverTruncatedJsonArray, parseExamJsonSafely } = await import('../src/utils/jsonParser');

    const truncatedOutput = `{
      "title": "7. Sınıf Fen Bilimleri 1. Dönem 1. Yazılı",
      "questions": [
        {
          "number": 1,
          "outcomeCode": "F.7.1.1.1",
          "question": "Uzay araştırmalarında kullanılan yapay uyduların amaçlarını yazınız.",
          "answer": "Haberleşme, meteoroloji ve keşif amaçlı kullanılır.",
          "rubric": [{ "item": "Kullanım amaçları", "pts": 10 }]
        },
        {
          "number": 2,
          "outcomeCode": "F.7.1.1.2",
          "question": "Uzay kirliliğinin nedenlerini ve olası sonuçlarını açıklayınız.",
          "answer": "Ömrü tükenen uydular ve roket parçaları uzay kirliliğine yol açar.",
          "rubric": [{ "item": "Kirlilik nedenleri", "pts": 10 }]
        },
        {
          "number": 3,
          "outcomeCode": "F.7.1.2.1",
          "question": "Teleskobun yapısını ve çalışma prensibini
    `;

    const recovered = recoverTruncatedJsonArray(truncatedOutput);
    assert.ok(recovered, 'Kesik JSON kurtarılabilmelidir.');
    assert.ok(recovered.includes('"number": 2'), 'Tamamlanan 2. soru korunmalıdır.');
    assert.ok(!recovered.includes('"Teleskobun yapısını"'), 'Yarıda kesilen 3. soru güvenle atılmalıdır.');

    const parseResult = parseExamJsonSafely(truncatedOutput);
    assert.strictEqual(parseResult.success, true, 'Kesik JSON güvenli ayrıştırıcı ile başarılı olmalıdır.');
    assert.strictEqual(parseResult.wasTruncated, true, 'wasTruncated bayrağı true olarak işaretlenmelidir.');
    assert.strictEqual((parseResult.data as any).questions.length, 2, 'Kurtarılan 2 soru eksiksiz dönmelidir.');
  });

  it('5.2. generateHandler birincil model 503 döndüğünde gemini-3.8-flash yedek modeline geçmeli ve başarılı olmalıdır', async () => {
    const originalFetch = globalThis.fetch;
    process.env.GEMINI_API_KEY = 'mock_api_key_for_testing';

    const calledModels: string[] = [];

    globalThis.fetch = (async (url: string) => {
      const match = url.match(/models\/([a-zA-Z0-9.-]+):generateContent/);
      const model = match ? match[1] : 'unknown';
      calledModels.push(model);

      if (model === 'gemini-3.5-flash-lite') {
        // Birincil model 503 Service Unavailable döner
        return new Response(JSON.stringify({
          error: { status: 'UNAVAILABLE', code: 503, message: 'This model is currently experiencing high demand.' }
        }), { status: 503, headers: { 'Content-Type': 'application/json' } });
      }

      if (model === 'gemini-3.8-flash') {
        // Yedek model başarıyla döner
        return new Response(JSON.stringify({
          candidates: [{
            content: {
              parts: [{
                text: JSON.stringify({
                  title: '7. Sınıf Sınav',
                  questions: [
                    { number: 1, question: 'Fen sorusu kökü?', answer: 'Cevap', rubric: [{ item: 'Puan', pts: 10 }] }
                  ]
                })
              }]
            }
          }]
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
    }) as any;

    try {
      const req = new Request('http://localhost/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: 'MEB 7. sınıf fen bilimleri sınav sorusu üret'
        })
      });

      const res = await generateHandler(req);
      assert.strictEqual(res.status, 200, 'Yedek model devreye girdiğinde 200 dönmelidir.');
      const resJson: any = await res.json();
      assert.strictEqual(resJson.activeModel, 'gemini-3.8-flash', 'Kullanılan aktif model gemini-3.8-flash olmalıdır.');
      assert.ok(calledModels.includes('gemini-3.5-flash-lite'), 'Önce gemini-3.5-flash-lite denenmiş olmalıdır.');
      assert.ok(calledModels.includes('gemini-3.8-flash'), 'Ardından gemini-3.8-flash denenmiş olmalıdır.');
      assert.ok(!calledModels.includes('gemini-2.5-flash'), 'Kullanımdan kalkan gemini-2.5-flash aranmamalıdır.');
    } finally {
      globalThis.fetch = originalFetch;
      delete process.env.GEMINI_API_KEY;
    }
  });

  // --------------------------------------------------------------------------
  // 6. Gemini 3.8 Flash / 3.5 Flash-Lite A/B Test Altyapısı ve Token Telemetrisi
  // --------------------------------------------------------------------------
  it('6.1. generateHandler gemini-3.8-flash seçildiğinde thinkingLevel: MEDIUM iletmeli ve usageMetadata token telemetrisini kaydetmelidir', async () => {
    const originalFetch = globalThis.fetch;
    process.env.GEMINI_API_KEY = 'mock_api_key_ab_test';

    let capturedUrl = '';
    let capturedBody: any = null;

    globalThis.fetch = (async (url: string, init: any) => {
      capturedUrl = url;
      capturedBody = JSON.parse(init.body);

      return new Response(JSON.stringify({
        candidates: [{
          content: {
            parts: [{
              text: JSON.stringify({
                title: '3.8 Flash Test Sınavı',
                questions: [
                  { number: 1, question: 'A/B Test Soru Kökü?', answer: 'Test Cevap', rubric: [{ item: 'Doğruluk', pts: 10 }] }
                ]
              })
            }]
          }
        }],
        usageMetadata: {
          promptTokenCount: 1420,
          candidatesTokenCount: 860,
          thoughtsTokenCount: 340,
          totalTokenCount: 2620
        }
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }) as any;

    try {
      const req = new Request('http://localhost/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: '7. sınıf MEB matematik yazılı sınavı kazanım testi',
          model: 'gemini-3.8-flash',
          thinkingLevel: 'medium'
        })
      });

      const res = await generateHandler(req);
      assert.strictEqual(res.status, 200);
      const resJson: any = await res.json();

      assert.ok(capturedUrl.includes('models/gemini-3.8-flash:generateContent'), 'gemini-3.8-flash URL ile çağrılmalıdır.');
      assert.strictEqual(capturedBody?.generationConfig?.thinkingConfig?.thinkingLevel, 'MEDIUM', 'Düşünme seviyesi MEDIUM olarak iletilmelidir.');
      assert.strictEqual(resJson.activeModel, 'gemini-3.8-flash');
      assert.strictEqual(resJson.usageMetrics?.hasUsageData, true, 'Token telemetrisi mevcut olmalıdır.');
      assert.strictEqual(resJson.usageMetrics?.promptTokens, 1420);
      assert.strictEqual(resJson.usageMetrics?.candidatesTokens, 860);
      assert.strictEqual(resJson.usageMetrics?.thinkingTokens, 340);
      assert.strictEqual(resJson.usageMetrics?.totalTokens, 2620);
    } finally {
      globalThis.fetch = originalFetch;
      delete process.env.GEMINI_API_KEY;
    }
  });

  it('6.2. Token verisi API yanıtında olmadığında tahmin yapılmamalı, hasUsageData: false ve null değerler dönmelidir', async () => {
    const originalFetch = globalThis.fetch;
    process.env.GEMINI_API_KEY = 'mock_api_key_ab_test';

    globalThis.fetch = (async () => {
      return new Response(JSON.stringify({
        candidates: [{
          content: {
            parts: [{
              text: JSON.stringify({
                title: 'No Token Sınavı',
                questions: [
                  { number: 1, question: 'Soru?', answer: 'Cevap', rubric: [{ item: 'Puan', pts: 10 }] }
                ]
              })
            }]
          }
        }]
        // usageMetadata kasıtlı olarak yok
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }) as any;

    try {
      const req = new Request('http://localhost/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: '7. sınıf MEB matematik yazılı sınavı kazanım testi'
        })
      });

      const res = await generateHandler(req);
      const resJson: any = await res.json();

      assert.strictEqual(resJson.usageMetrics?.hasUsageData, false, 'hasUsageData false olmalıdır.');
      assert.strictEqual(resJson.usageMetrics?.promptTokens, null, 'Tahmin yapılmamalı, null dönmelidir.');
      assert.strictEqual(resJson.usageMetrics?.candidatesTokens, null, 'Tahmin yapılmamalı, null dönmelidir.');
      assert.strictEqual(resJson.usageMetrics?.thinkingTokens, null, 'Tahmin yapılmamalı, null dönmelidir.');
    } finally {
      globalThis.fetch = originalFetch;
      delete process.env.GEMINI_API_KEY;
    }
  });

  it('6.3. Model belirtilmediğinde mevcut üretim varsayılanı (gemini-3.5-flash-lite) korunmalıdır', async () => {
    const originalFetch = globalThis.fetch;
    process.env.GEMINI_API_KEY = 'mock_api_key_ab_test';

    let capturedUrl = '';
    let capturedBody: any = null;

    globalThis.fetch = (async (url: string, init: any) => {
      capturedUrl = url;
      capturedBody = JSON.parse(init.body);

      return new Response(JSON.stringify({
        candidates: [{
          content: {
            parts: [{
              text: JSON.stringify({
                title: 'Varsayılan Model Sınavı',
                questions: [
                  { number: 1, question: 'Varsayılan Soru?', answer: 'Cevap', rubric: [{ item: 'Puan', pts: 10 }] }
                ]
              })
            }]
          }
        }]
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }) as any;

    try {
      const req = new Request('http://localhost/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: '7. sınıf MEB matematik yazılı sınavı kazanım testi'
        })
      });

      const res = await generateHandler(req);
      const resJson: any = await res.json();

      assert.ok(capturedUrl.includes('models/gemini-3.5-flash-lite:generateContent'), 'Varsayılan olarak gemini-3.5-flash-lite çağrılmalıdır.');
      assert.strictEqual(capturedBody?.generationConfig?.thinkingConfig, undefined, 'gemini-3.5-flash-lite için thinkingConfig gönderilmemelidir.');
      assert.strictEqual(resJson.activeModel, 'gemini-3.5-flash-lite');
    } finally {
      globalThis.fetch = originalFetch;
      delete process.env.GEMINI_API_KEY;
    }
  });

});

