import assert from 'node:assert';
import { generateMEBIQuestions } from '../src/utils/aiGeneratorEngine';
import { MIDDLE_SCHOOL_OFFICIAL_SCENARIOS } from '../src/data/curriculumData';
import { validateAndEnrichExamQuestions } from '../src/utils/sourceMaterialValidator';
import { SAMPLE_EXAMS } from '../src/data/sampleExams';

console.log('=== GÖREV 125 KAPSAMLI PİPELİNE DOĞRULAMA TESTİ ===\n');

let passCount = 0;
let failCount = 0;

async function test(name: string, fn: () => void | Promise<void>) {
  try {
    await fn();
    console.log(`✓ [PASS] ${name}`);
    passCount++;
  } catch (err: any) {
    console.error(`✗ [FAIL] ${name}: ${err.message}`);
    failCount++;
  }
}

async function runTests() {
  let capturedPrompt = '';
  let lastBody: any = null;

  const mockSuccessFetch = async (url: string, init: any) => {
    if (url === '/api/generate') {
      lastBody = JSON.parse(init.body);
      capturedPrompt = lastBody.prompt;

      const dummyQuestions = Array.from({ length: 6 }, (_, i) => ({
        number: i + 1,
        outcome: 'TEST.OUTCOME',
        outcomeTitle: 'Test Kazanımı',
        difficulty: 'Orta',
        level: 'Kavramsal',
        templateType: 'Açık Uçlu',
        points: 15,
        stimulus: 'Test stimulus metni...',
        question: `Geçerli soru ${i + 1} nedir?`,
        answer: 'Test model cevabı',
        rubric: [{ item: 'Doğru cevap', pts: 15 }]
      }));

      return {
        ok: true,
        status: 200,
        json: async () => ({ questions: dummyQuestions })
      };
    }
    return { ok: false, status: 404, json: async () => ({}) };
  };

  const originalFetch = (globalThis as any).fetch;

  try {
    (globalThis as any).fetch = mockSuccessFetch;

    // 1. 5. Sınıf Türkçe Senaryoları (Set 1 ve Set #10 ardışık)
    await test('5. Sınıf Türkçe tüm senaryolar Set 1 ve Set #10 prompt uzunluğu <= 16.500 karakter bütçe tavanı', async () => {
      const scenarios = (MIDDLE_SCHOOL_OFFICIAL_SCENARIOS as any)[5]?.['turkce'] || [];
      assert(scenarios.length > 0, '5. Sınıf Türkçe senaryoları bulunamadı');

      for (let sIdx = 0; sIdx < scenarios.length; sIdx++) {
        const scenario = scenarios[sIdx];
        // Set 1 (ilk üretim)
        await generateMEBIQuestions('turkce', 5, scenario, 0);
        assert(
          capturedPrompt.length <= 16500,
          `5. Sınıf Türkçe Senaryo ${sIdx + 1} Set 1 promptu (${capturedPrompt.length}) 16.500 karakteri aşıyor!`
        );
        assert(
          capturedPrompt.includes('KAZANIM VE DERS KİTABI BAĞLAMI') || capturedPrompt.includes('DERS KİTABI KAYNAK KANITLARI'),
          `5. Sınıf Türkçe Senaryo ${sIdx + 1} Set 1 ders kitabı yönergelerini içermiyor`
        );

        // Set #10 (ardışık üretim kaçınma verileriyle)
        const mockAvoidQuestions = scenario.distributions.map((d: any, i: number) => `Önceki Soru ${i + 1} metni detayı`);
        const mockAvoidStimuli = scenario.distributions.map((d: any, i: number) => `Önceki Metin ${i + 1} detayı`);
        await generateMEBIQuestions('turkce', 5, scenario, 9, undefined, undefined, {
          avoidQuestionTexts: mockAvoidQuestions,
          avoidStimuli: mockAvoidStimuli
        });
        assert(
          capturedPrompt.length <= 16500,
          `5. Sınıf Türkçe Senaryo ${sIdx + 1} Set #10 promptu (${capturedPrompt.length}) 16.500 karakteri aşıyor!`
        );
        assert(
          capturedPrompt.includes('ÖZGÜNLÜK VE MEVCUT SORULARI TEKRARLAMAMA KURALI') || capturedPrompt.includes('ÖNCEKİ SETLERLE BENZERLİK'),
          `5. Sınıf Türkçe Senaryo ${sIdx + 1} Set #10 kaçınma direktiflerini içermiyor`
        );
      }
    });

    // 2. 6. Sınıf Türkçe Senaryoları (Set 1 ve Set #10 ardışık)
    await test('6. Sınıf Türkçe tüm senaryolar Set 1 ve Set #10 prompt uzunluğu <= 16.500 karakter bütçe tavanı', async () => {
      const scenarios = (MIDDLE_SCHOOL_OFFICIAL_SCENARIOS as any)[6]?.['turkce'] || [];
      assert(scenarios.length > 0, '6. Sınıf Türkçe senaryoları bulunamadı');

      for (let sIdx = 0; sIdx < scenarios.length; sIdx++) {
        const scenario = scenarios[sIdx];
        await generateMEBIQuestions('turkce', 6, scenario, 0);
        assert(
          capturedPrompt.length <= 16500,
          `6. Sınıf Türkçe Senaryo ${sIdx + 1} Set 1 promptu (${capturedPrompt.length}) 16.500 karakteri aşıyor!`
        );

        const mockAvoidQuestions = scenario.distributions.map((d: any, i: number) => `Önceki Soru ${i + 1} metni detayı`);
        await generateMEBIQuestions('turkce', 6, scenario, 9, undefined, undefined, {
          avoidQuestionTexts: mockAvoidQuestions
        });
        assert(
          capturedPrompt.length <= 16500,
          `6. Sınıf Türkçe Senaryo ${sIdx + 1} Set #10 promptu (${capturedPrompt.length}) 16.500 karakteri aşıyor!`
        );
      }
    });

    // 3. 7. ve 8. Sınıf Parite Kontrolü
    await test('7. ve 8. Sınıf Türkçe promptları regrese olmadan bütçe sınırında kalır', async () => {
      for (const grade of [7, 8] as const) {
        const scenario = (MIDDLE_SCHOOL_OFFICIAL_SCENARIOS as any)[grade]?.['turkce']?.[0];
        assert(scenario, `${grade}. Sınıf Türkçe senaryosu bulunamadı`);

        await generateMEBIQuestions('turkce', grade, scenario, 0);
        assert(capturedPrompt.length <= 16500, `${grade}. Sınıf Set 1 çok uzun: ${capturedPrompt.length}`);

        await generateMEBIQuestions('turkce', grade, scenario, 9, undefined, undefined, {
          avoidQuestionTexts: ['Önceki soru 1 metni']
        });
        assert(capturedPrompt.length <= 16500, `${grade}. Sınıf Set #10 çok uzun: ${capturedPrompt.length}`);
      }
    });

    // 4. Soru Kökü Doğrulaması (Empty Stem Validation)
    await test('sourceMaterialValidator: Boş veya yalnızca boşluk içeren soru kökünü tespit eder ve bayraklar', () => {
      const invalidQuestions: any[] = [
        {
          id: 'q1',
          questionNumber: 1,
          outcomeCode: 'T.5.1.1',
          outcomeDescription: 'Dinlediklerinde/izlediklerinde geçen bilmediği kelimelerin anlamını tahmin eder.',
          question: '   ', // Boş kök
          modelAnswer: 'Bu bir cevaptır.',
          rubric: 'Tam: 10, Kısmi: 5, Boş: 0',
          maxScore: 10,
          score: 10
        },
        {
          id: 'q2',
          questionNumber: 2,
          outcomeCode: 'T.5.1.2',
          outcomeDescription: 'Dinlediklerinin/izlediklerinin konusunu belirler.',
          question: 'Geçerli bir soru kökü nedir?', // Geçerli kök
          modelAnswer: 'Bu da geçerli bir cevaptır.',
          rubric: 'Tam: 10, Kısmi: 5, Boş: 0',
          maxScore: 10,
          score: 10
        }
      ];

      const { enrichedQuestions } = validateAndEnrichExamQuestions(invalidQuestions, 'Türkçe', 5);
      assert.strictEqual(enrichedQuestions[0].hasMissingStemError, true, 'Boş köklü soru bayraklanmadı');
      assert(enrichedQuestions[0].stemValidationError?.includes('soru kökü'), 'Hata mesajı eksik');
      assert.strictEqual(enrichedQuestions[1].hasMissingStemError, false, 'Geçerli soru kökü hatalı bayraklandı');
    });

    // 5. Kısa ve Öz Geçerli Soru ile Cevapların Korunması
    await test('Kısa geçerli soru ("x kaçtır?") ve kısa cevap ("42", "Fotosentez") korunur', () => {
      const validQuestions: any[] = [
        {
          id: 'q_short_stem',
          questionNumber: 1,
          outcomeCode: 'MAT.5.1.1',
          outcomeDescription: 'Doğal sayılarla işlemler yapar.',
          question: 'x kaçtır?', // 9 karakter, >= 3
          modelAnswer: '42', // Kısa geçerli model cevap
          rubric: 'Tam: 10, Boş: 0',
          maxScore: 10,
          score: 10
        },
        {
          id: 'q_short_answer',
          questionNumber: 2,
          outcomeCode: 'F.5.1.1',
          outcomeDescription: 'Güneş ve Ayın yapısını açıklar.',
          question: 'Bitkilerin besin üretmesini sağlayan kimyasal süreç nedir?',
          modelAnswer: 'Fotosentez', // Kısa tek kelimelik geçerli cevap
          rubric: 'Tam: 10, Boş: 0',
          maxScore: 10,
          score: 10
        }
      ];

      const { enrichedQuestions } = validateAndEnrichExamQuestions(validQuestions, 'Fen Bilimleri', 5);
      assert.strictEqual(enrichedQuestions[0].hasMissingStemError, false, 'Kısa geçerli soru kökü reddedilmemeli');
      assert.strictEqual(enrichedQuestions[0].modelAnswer, '42', 'Kısa sayısal cevap korunmalı');
      assert.strictEqual(enrichedQuestions[1].hasMissingStemError, false, 'Geçerli fen sorusu kabul edilmeli');
      assert.strictEqual(enrichedQuestions[1].modelAnswer, 'Fotosentez', 'Kısa biyolojik terim cevabı korunmalı');
    });

    // 6. generateMEBIQuestions: Canlı AI çağrısında boş köklü tekil sorunun curated fallback ile ikamesi
    await test('generateMEBIQuestions: AI yanıtındaki boş köklü soruyu tekil ikame eder, geçerli soruları korur', async () => {
      const scenario = (MIDDLE_SCHOOL_OFFICIAL_SCENARIOS as any)[5]?.['turkce']?.[0];
      assert(scenario, '5. Sınıf Türkçe senaryosu bulunamadı');

      const expandedDistributions: any[] = [];
      for (const d of scenario.distributions) {
        const count = d.questionCount || 1;
        for (let c = 0; c < count; c++) expandedDistributions.push(d);
      }
      const targetCount = expandedDistributions.length;

      (globalThis as any).fetch = async (url: string) => {
        if (url === '/api/generate') {
          return {
            ok: true,
            status: 200,
            json: async () => ({
              activeModel: 'Gemini 2.5 Flash (Test)',
              questions: Array.from({ length: targetCount }, (_, i) => ({
                number: i + 1,
                outcome: expandedDistributions[i].outcomeCode,
                outcomeTitle: expandedDistributions[i].notes,
                difficulty: 'Orta',
                level: 'Kavrama',
                templateType: 'Açık Uçlu Soru',
                points: 100 / targetCount,
                stimulus: 'Test uyaran metni...',
                // Soru 1'in kökü boş, soru 2 ve sonrakiler geçerli!
                question: i === 0 ? '   ' : `Özgün soru kökü ${i + 1} nedir?`,
                answer: `Model cevap ${i + 1}`,
                solutionExplanation: `Açıklama ${i + 1}`,
                rubric: [{ item: 'Doğru cevap', pts: 100 / targetCount }]
              }))
            })
          };
        }
        return { ok: false, status: 404 };
      };

      const result = await generateMEBIQuestions('turkce', 5, scenario, 0);
      assert.strictEqual(result.isFallback, false, 'Kısmi ikame ile canlı AI sınavı başarıyla tamamlanmalı');
      assert.strictEqual(result.generatedQuestions.length, targetCount);

      // 1. soru boş olduğu için curated fallback ile değiştirilmiş olmalı
      assert.strictEqual(
        result.generatedQuestions[0].sourceOrigin,
        'oyss_curated',
        'Boş köklü soru curated fallback ile ikame edilmeli'
      );
      assert(
        result.generatedQuestions[0].question.trim().length >= 5,
        'İkame edilen sorunun geçerli bir kökü olmalı'
      );

      // 2. soru ve diğerleri özgün AI üretimi kalmalı
      assert.strictEqual(
        result.generatedQuestions[1].sourceOrigin,
        'gemini_ai',
        'Geçerli soru gemini_ai olarak kalmalı'
      );
      assert.strictEqual(result.generatedQuestions[1].question, 'Özgün soru kökü 2 nedir?');
      assert.strictEqual(
        result.sourceValidationSummary?.isFullyValid,
        true,
        'İkame sonrası tüm sorular doğrulamadan geçmeli'
      );
    });

    // 7. generateMEBIQuestions: HTTP 422 EMPTY_QUESTION_STEM Kısmi Kurtarma
    await test('generateMEBIQuestions: HTTP 422 EMPTY_QUESTION_STEM durumunda kısmi kurtarma çalışır', async () => {
      const scenario = (MIDDLE_SCHOOL_OFFICIAL_SCENARIOS as any)[5]?.['turkce']?.[0];
      assert(scenario, '5. Sınıf Türkçe senaryosu bulunamadı');

      const expandedDistributions: any[] = [];
      for (const d of scenario.distributions) {
        const count = d.questionCount || 1;
        for (let c = 0; c < count; c++) expandedDistributions.push(d);
      }
      const targetCount = expandedDistributions.length;

      (globalThis as any).fetch = async (url: string) => {
        if (url === '/api/generate') {
          return {
            ok: false,
            status: 422,
            json: async () => ({
              code: 'EMPTY_QUESTION_STEM',
              error: 'Soru 1 için soru kökü boş veya geçersiz bulundu.',
              activeModel: 'Gemini 2.5 Flash',
              questions: Array.from({ length: targetCount }, (_, i) => ({
                number: i + 1,
                outcome: expandedDistributions[i].outcomeCode,
                outcomeTitle: expandedDistributions[i].notes,
                difficulty: 'Orta',
                level: 'Kavrama',
                templateType: 'Açık Uçlu Soru',
                points: 100 / targetCount,
                stimulus: 'Test uyaran metni...',
                question: i === 0 ? '' : `Kurtarılacak soru kökü ${i + 1}?`,
                answer: `Model cevap ${i + 1}`,
                solutionExplanation: `Açıklama ${i + 1}`,
                rubric: [{ item: 'Doğru cevap', pts: 100 / targetCount }]
              }))
            })
          };
        }
        return { ok: false, status: 404 };
      };

      const result = await generateMEBIQuestions('turkce', 5, scenario, 0);
      assert.strictEqual(result.isFallback, false, 'HTTP 422 EMPTY_QUESTION_STEM kurtarma başarılı olmalı');
      assert.strictEqual(result.generatedQuestions[0].sourceOrigin, 'oyss_curated');
      assert.strictEqual(result.generatedQuestions[1].sourceOrigin, 'gemini_ai');
    });

    // 8. İstemci Bütçe Tavanı ve Kademeli Sıkıştırma (Gradual Compaction)
    await test('aiGeneratorEngine: Bütçe aşımında kademeli sıkıştırma devreye girer', async () => {
      const scenario = (MIDDLE_SCHOOL_OFFICIAL_SCENARIOS as any)[5]?.['turkce']?.[0];
      assert(scenario, '5. Sınıf Türkçe senaryosu bulunamadı');

      (globalThis as any).fetch = async (url: string, init: any) => {
        if (url === '/api/generate') {
          const body = JSON.parse(init.body);
          capturedPrompt = body.prompt;
          return {
            ok: true,
            status: 200,
            json: async () => ({
              activeModel: 'Gemini 2.5 Flash',
              questions: scenario.distributions.map((d: any, i: number) => ({
                number: i + 1,
                outcome: d.outcomeCode,
                outcomeTitle: d.notes,
                difficulty: 'Orta',
                level: 'Kavrama',
                templateType: 'Açık Uçlu Soru',
                points: 100 / scenario.distributions.length,
                question: `Soru ${i + 1}?`,
                answer: 'Cevap',
                rubric: [{ item: 'Ölçüt', pts: 100 / scenario.distributions.length }]
              }))
            })
          };
        }
        return { ok: false, status: 404 };
      };

      // Simüle devasa avoid listesi verelim (bütçeyi zorlamak için)
      const hugeAvoidQuestions = Array.from({ length: 50 }, (_, i) => `Devasa önceki soru metni ${i}: ` + 'A'.repeat(120));
      const hugeAvoidStimuli = Array.from({ length: 50 }, (_, i) => `Devasa önceki metin ${i}: ` + 'B'.repeat(120));

      const result = await generateMEBIQuestions('turkce', 5, scenario, 9, undefined, undefined, {
        avoidQuestionTexts: hugeAvoidQuestions,
        avoidStimuli: hugeAvoidStimuli
      });

      assert(capturedPrompt.length <= 16500, `Gönderilen prompt bütçe tavanını (${capturedPrompt.length} > 16.500) aştı!`);
      assert(result.promptMetrics, 'promptMetrics dönmeli');
      assert(
        result.promptMetrics.compressionApplied === 'light' || result.promptMetrics.compressionApplied === 'compact',
        `Sıkıştırma uygulanmalıydı, mevcut durum: ${result.promptMetrics.compressionApplied}`
      );
    });

    // 9. Provenance ve Visual Metadata Bütünlüğü
    await test('Kaynak kökenleri (provenance) ve görsel meta verileri doğru korunur', () => {
      const exam = SAMPLE_EXAMS.find(e => e.questions.some(q => q.visual))!;
      const visualQuestion = exam.questions.find(q => q.visual)!;
      assert(visualQuestion.visual, 'Görsel içeren soru bulunamadı');
      assert.strictEqual(
        visualQuestion.visual.sourceOrigin,
        'oyss_svg',
        'QuestionVisual sourceOrigin oyss_svg olmalı'
      );
    });

  } finally {
    (globalThis as any).fetch = originalFetch;
  }

  console.log('\n======================================================');
  console.log(`TOPLAM TEST: ${passCount + failCount} | BAŞARILI: ${passCount} | BAŞARISIZ: ${failCount}`);
  console.log('======================================================');

  if (failCount > 0) {
    process.exit(1);
  }
}

runTests();
