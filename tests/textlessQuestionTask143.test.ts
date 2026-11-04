import { SAMPLE_EXAMS } from '../src/data/sampleExams';
import { detectSourceRequirement, checkStimulusQuality, validateAndEnrichExamQuestions, sanitizeTextReferencesIfNoStimulus } from '../src/utils/sourceMaterialValidator';
import { generateMEBIQuestions } from '../src/utils/aiGeneratorEngine';
import { MIDDLE_SCHOOL_OFFICIAL_SCENARIOS } from '../src/data/curriculumData';

interface TestResult {
  id: string;
  name: string;
  passed: boolean;
  details: string;
}

const testResults: TestResult[] = [];

function assert(id: string, name: string, condition: boolean, details: string) {
  testResults.push({
    id,
    name,
    passed: Boolean(condition),
    details
  });
}

console.log('=== TASK 143: METİNSİZ SORU DÜZELTME VE GÜVENCE TESTLERİ BAŞLIYOR ===\n');

// --------------------------------------------------------------------------
// TEST 1: Kaynak havuzundaki Boğaç Han sorusunun (ve benzerlerinin) gerçek metne kavuşması
// --------------------------------------------------------------------------
{
  const exam5Senaryo5 = SAMPLE_EXAMS.find(e => e.id === 'exam_5_turkce_1_1_senaryo_5');
  const q3 = exam5Senaryo5?.questions.find(q => q.questionNumber === 3);
  const q2 = exam5Senaryo5?.questions.find(q => q.questionNumber === 2);

  const q3HasStory = q3 && q3.stimulus && q3.stimulus.includes('Bayındır Han') && q3.stimulus.length > 200;
  const q3StemClean = q3 && !q3.stimulus.endsWith('?');
  const q2HasStory = q2 && q2.stimulus && q2.stimulus.includes('Bayındır Han') && q2.stimulus.length > 200;

  const passed = Boolean(q3HasStory && q3StemClean && q2HasStory);
  assert(
    'T1_SOURCE_DATA_BOGAC_HAN',
    'Boğaç Han sorusu (5. Sınıf Senaryo 5 Q3 ve Q2) eksiksiz okuma metnine sahip olmalı',
    passed,
    `Q3 Stimulus Boyutu: ${q3?.stimulus?.length || 0} karakter, 'Bayındır Han' içeriyor: ${Boolean(q3HasStory)}`
  );
}

// --------------------------------------------------------------------------
// TEST 2: Diğer düzeltilen kaynak sorularının (Elif Öğretmen, Kuş Köşkleri, Kutup Işıkları) metin kontrolü
// --------------------------------------------------------------------------
{
  const exam5Senaryo4 = SAMPLE_EXAMS.find(e => e.id === 'exam_5_turkce_1_1_senaryo_4');
  const elifQ2 = exam5Senaryo4?.questions.find(q => q.questionNumber === 2);
  const elifValid = elifQ2 && elifQ2.stimulus && elifQ2.stimulus.includes('Elif Öğretmen') && elifQ2.stimulus.length > 200;

  const exam6Senaryo4 = SAMPLE_EXAMS.find(e => e.id === 'exam_6_turkce_1_1_senaryo_4');
  const kusQ2 = exam6Senaryo4?.questions.find(q => q.questionNumber === 2);
  const kusValid = kusQ2 && kusQ2.stimulus && kusQ2.stimulus.includes('kuş köşkleri') && kusQ2.stimulus.length > 200;

  const exam6Senaryo6 = SAMPLE_EXAMS.find(e => e.id === 'exam_6_turkce_1_1_senaryo_6');
  const kutupQ2 = exam6Senaryo6?.questions.find(q => q.questionNumber === 2);
  const kutupQ3 = exam6Senaryo6?.questions.find(q => q.questionNumber === 3);
  const kutupValid = kutupQ2 && kutupQ3 && 
                     kutupQ2.stimulus.includes('Kutup Işıkları') && 
                     kutupQ3.stimulus.includes('Kutup Işıkları') &&
                     kutupQ3.stimulus.length > 150;

  const passed = Boolean(elifValid && kusValid && kutupValid);
  assert(
    'T2_SOURCE_DATA_OTHER_SCENARIOS',
    'Senaryo 4 ve 6 Türkçe sorularının okuma metinleri eksiksiz olmalı',
    passed,
    `Elif: ${Boolean(elifValid)}, Kuş Köşkleri: ${Boolean(kusValid)}, Kutup: ${Boolean(kutupValid)}`
  );
}

// --------------------------------------------------------------------------
// TEST 3: checkStimulusQuality: Soru kökü, soru işareti veya meta-direktif içeren stimuluslar reddedilmeli
// --------------------------------------------------------------------------
{
  const req = { requiresSource: true, type: 'reading_text' as const, reason: 'Okuma metni testi' };

  // A: Soru kökünün kendisi stimulus olarak gelmiş (TASK 143'ün temel hatası)
  const defectiveStemAsStim = "Metne göre: Dede Korkut bu gence neden 'Boğaç Han' adını vermiştir?";
  const qDefective = checkStimulusQuality(defectiveStemAsStim, req);

  // B: Soru işaretiyle biten başka bir soru cümlesi
  const defectiveEndingQuestion = "Yukarıdaki metne göre Elif Öğretmen kütüphaneyi nasıl kurmuştur?";
  const qEndingQuestion = checkStimulusQuality(defectiveEndingQuestion, req);

  // C: Tek cümlelik meta-direktif
  const metaDirective = "Metne göre mimarlar kuş evlerini yapıların rastgele bir yerine değil yüksek duvarlarına yapmışlardır.";
  const qMetaDirective = checkStimulusQuality(metaDirective, req);

  // D: Çok kısa (< 40 karakter) yetersiz metin
  const shortText = "Köy okulunda kütüphane açıldı.";
  const qShort = checkStimulusQuality(shortText, req);

  // E: Geçerli zengin hikaye metni
  const validPassage = "Toros Dağları'nın eteklerindeki küçük bir köy okulunda öğretmenlik yapan Elif Öğretmen, boş bir sınıfı kütüphaneye dönüştürmek için kolları sıvadı. Kasabadaki marangozdan tahta raflar rica etti, öğrencileriyle birlikte rafları gökkuşağı renklerine boyadı.";
  const qValid = checkStimulusQuality(validPassage, req);

  const passed = !qDefective.isValid && (qDefective.isMetaSummary || qDefective.isCrossReference) &&
                 !qEndingQuestion.isValid && (qEndingQuestion.isMetaSummary || qEndingQuestion.isCrossReference) &&
                 !qMetaDirective.isValid && qMetaDirective.isMetaSummary &&
                 !qShort.isValid &&
                 qValid.isValid && !qValid.isMetaSummary;

  assert(
    'T3_VALIDATOR_STIMULUS_QUALITY',
    'checkStimulusQuality soru cümlesi, meta-özet ve < 80 karakter metinleri geçersiz saymalı',
    passed,
    `defectiveStem: isValid=${qDefective.isValid}, endingQuestion: isValid=${qEndingQuestion.isValid}, metaDirective: isValid=${qMetaDirective.isValid}, short: isValid=${qShort.isValid}, validPassage: isValid=${qValid.isValid}`
  );
}

// --------------------------------------------------------------------------
// TEST 4: Metin gerektirmeyen bağımsız soruların (Matematik, Yazım Kuralları vb.) dokunulmazlığı
// --------------------------------------------------------------------------
{
  // Matematik kesir sorusu
  const mathReq = detectSourceRequirement('Verilen 3/5 ve 7/10 kesirlerini küçükten büyüğe sıralayınız.', 'Hesaplama & Sayı Doğrusu');
  const mathQuality = checkStimulusQuality('Verilen kesir: 3/5', mathReq);

  // Yazım kuralları sorusu
  const grammarReq = detectSourceRequirement('Aşağıdaki cümlede yer alan yazım yanlışlarını bulunuz: "ali ile dedesi..."', 'Kural Uygulama');
  const grammarQuality = checkStimulusQuality('Hatalı cümle örneği.', grammarReq);

  const passed = !mathReq.requiresSource && mathQuality.isValid &&
                 !grammarReq.requiresSource && grammarQuality.isValid;

  assert(
    'T4_NON_READING_QUESTIONS_UNTOUCHED',
    'Metin gerektirmeyen matematik ve dilbilgisi soruları kaynak zorunluluğundan muaf tutulmalı',
    passed,
    `Matematik requiresSource: ${mathReq.requiresSource}, Dilbilgisi requiresSource: ${grammarReq.requiresSource}`
  );
}

// --------------------------------------------------------------------------
// TEST 5: Yerel Soru Üretim Motoru: 5. Sınıf Türkçe Senaryo 5 üretiminde hiçbir metinsiz soru oluşmamalı
// --------------------------------------------------------------------------
async function runGeneratorTests() {
  const turkceScenarios = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[5]?.turkce || [];
  const senaryo5 = turkceScenarios.find(s => s.id === 'senaryo_5');
  if (!senaryo5) {
    throw new Error('5. sınıf Türkçe Senaryo 5 bulunamadı');
  }

  // Yerel motor ile üretim (API anahtarsız)
  const result = await generateMEBIQuestions('turkce', 5, senaryo5, 0);

  let allReadingQuestionsValid = true;
  let textlessQuestionCount = 0;
  const readingQuestionDetails: string[] = [];

  for (const q of result.generatedQuestions) {
    const req = detectSourceRequirement(q.question, q.templateType, undefined, q.stimulus);
    if (req.requiresSource && req.type === 'reading_text') {
      const quality = checkStimulusQuality(q.stimulus, req);
      const isTextless = !quality.isValid || (q.stimulus || '').length < 80;
      if (isTextless) {
        allReadingQuestionsValid = false;
        textlessQuestionCount++;
        readingQuestionDetails.push(`[KUSURLU] Soru ${q.number} (${q.outcome}): "${(q.stimulus || '').slice(0, 40)}..."`);
      } else {
        readingQuestionDetails.push(`[GEÇERLİ] Soru ${q.number} (${q.outcome}): boyu=${(q.stimulus || '').length}`);
      }
    }
  }

  assert(
    'T5_LOCAL_ENGINE_NO_TEXTLESS_QUESTIONS',
    'Yerel üretim motoru 5. Sınıf Türkçe Senaryo 5 için hiçbir metinsiz soru üretmemeli',
    allReadingQuestionsValid && textlessQuestionCount === 0,
    `Kusurlu sayısı: ${textlessQuestionCount}, Soru dökümü: ${readingQuestionDetails.join(' | ')}`
  );

  // --------------------------------------------------------------------------
  // TEST 6: validateAndEnrichExamQuestions: Ortak sınavlarda ve zenginleştirme raporunda tam doğruluk
  // --------------------------------------------------------------------------
  const exam = SAMPLE_EXAMS.find(e => e.id === 'exam_5_turkce_1_1_senaryo_5')!;
  const { enrichedQuestions, report } = validateAndEnrichExamQuestions(exam.questions);

  const q3Enriched = enrichedQuestions.find(q => (q as any).questionNumber === 3);
  const q3HasText = q3Enriched && q3Enriched.stimulus && q3Enriched.stimulus.length > 200;
  const noMissingSource = report.missingSourceCount === 0;

  assert(
    'T6_VALIDATE_AND_ENRICH_EXAM',
    'validateAndEnrichExamQuestions Sınav 5 Senaryo 5 için 0 eksik kaynak raporlamalı',
    Boolean(q3HasText && noMissingSource),
    `missingSourceCount: ${report.missingSourceCount}, Q3 metin boyutu: ${q3Enriched?.stimulus?.length || 0}`
  );

  // --------------------------------------------------------------------------
  // TEST 7: Gemini AI Simülasyonu: Modelden metinsiz okuma sorusu geldiğinde cerrahi ikame devreye girmeli
  // --------------------------------------------------------------------------
  const originalFetch = globalThis.fetch;
  const defectiveGeminiResponse = [
    {
      number: 1,
      outcome: 'T.O.5.6',
      points: 15,
      difficulty: 'Kolay',
      stimulus: '', // Metin tamamen eksik!
      question: 'Metne göre balıkçı İlyas Reis fırtınalı denizde teknesini nasıl korumuştur? Açıklayınız.',
      answer: 'Limanın mendireğine sığınarak korumuştur.',
      rubric: [{ item: 'Doğru gerekçe', pts: 15 }],
      sourceOrigin: 'gemini_ai'
    },
    {
      number: 2,
      outcome: 'T.O.5.6',
      points: 15,
      difficulty: 'Orta',
      stimulus: 'Selin ve dedesi köyün tepesindeki tarihi gözlemevine çıktılar. Dedesinin dev pirinç teleskobuyla gece gökyüzündeki parlayan yıldızları ve kraterleri heyecanla incelediler.',
      question: 'Selin ve dedesinin gökyüzünü incelerken duydukları merak ve keşif sevincini metne dayanarak açıklayınız.',
      answer: 'Gözlemevinde teleskopla gök cisimlerini gözlemlemenin verdiği heyecan ve ilim sevgisi açıklanmıştır.',
      rubric: [{ item: 'Duygu ve durum tespiti', pts: 15 }],
      sourceOrigin: 'gemini_ai'
    }
  ];

  globalThis.fetch = async () => ({
    ok: true,
    status: 200,
    json: async () => ({
      questions: defectiveGeminiResponse,
      activeModel: 'Gemini 3.5 Flash Lite Mock'
    })
  }) as any;

  try {
    const aiResult = await generateMEBIQuestions('turkce', 5, senaryo5, 0);
    const q1 = aiResult.generatedQuestions[0];
    const q2 = aiResult.generatedQuestions[1];

    // Q1 metinsiz olduğu için yakalanıp geçerli metinli soruyla ikame edilmeli
    const q1Replaced = q1.sourceOrigin === 'oyss_curated' && q1.stimulus && q1.stimulus.length >= 80;
    // Q2 geçerli zengin metne sahip olduğu için gemini_ai olarak korunmalı
    const q2Preserved = q2.sourceOrigin === 'gemini_ai' && q2.stimulus && q2.stimulus.length >= 80;

    assert(
      'T7_GEMINI_PIPELINE_SURGICAL_REPLACEMENT',
      'Gemini AI yanıtındaki metinsiz soru yakalanıp tam metinli soruyla ikame edilmeli, geçerli soru korunmalı',
      Boolean(q1Replaced && q2Preserved),
      `Q1 origin: ${q1.sourceOrigin} (metin: ${q1.stimulus?.length} kr), Q2 origin: ${q2.sourceOrigin} (metin: ${q2.stimulus?.length} kr)`
    );
  } finally {
    globalThis.fetch = originalFetch;
  }

  // --------------------------------------------------------------------------
  // TEST 8: Metin yoksa soru kökünün metne atıf yapmayan, bağımsız forma dönüştürülmesi
  // --------------------------------------------------------------------------
  {
    const rawStem1 = "Metne göre: Dede Korkut bu gence neden 'Boğaç Han' adını vermiştir?";
    const sanitized1 = sanitizeTextReferencesIfNoStimulus(rawStem1, "");
    const clean1 = !sanitized1.includes("Metne göre") && sanitized1.includes("Dede Korkut bu gence neden");

    const rawStem2 = "Gence bu ismin verilme gerekçesini metindeki olay örgüsünden hareketle açıklayınız.";
    const sanitized2 = sanitizeTextReferencesIfNoStimulus(rawStem2, undefined);
    const clean2 = !sanitized2.includes("metindeki olay örgüsünden hareketle") && sanitized2.includes("Gence bu ismin verilme gerekçesini");

    // Metin varsa soru kökü değiştirilmemeli
    const fullPassage = "Bayındır Han'ın görkemli toyunda beslenen azgın bir boğa meydandan kaçtı. Meydandaki herkes kaçışırken Dirse Han'ın on beş yaşındaki cesur oğlu meydanın ortasında dimdik durdu.";
    const preservedStem = sanitizeTextReferencesIfNoStimulus(rawStem1, fullPassage);
    const unchanged = preservedStem === rawStem1;

    assert(
      'T8_SANITIZE_STEM_WHEN_NO_SOURCE',
      'Metin yoksa soru kökü metin atfından temizlenmeli; metin varsa korunmalı',
      Boolean(clean1 && clean2 && unchanged),
      `sanitized1: "${sanitized1}", sanitized2: "${sanitized2}", unchanged: ${unchanged}`
    );
  }

  // --------------------------------------------------------------------------
  // TEST RAPORU VE ÖZET
  // --------------------------------------------------------------------------
  console.log('\n=== TEST SONUÇLARI ===');
  let passedCount = 0;
  for (const r of testResults) {
    if (r.passed) {
      passedCount++;
      console.log(`[PASS] ${r.id}: ${r.name}`);
      console.log(`       Detay: ${r.details}`);
    } else {
      console.log(`[FAIL] ${r.id}: ${r.name}`);
      console.log(`       Detay: ${r.details}`);
    }
  }

  console.log(`\nToplam Test: ${testResults.length} | Başarılı: ${passedCount} | Başarısız: ${testResults.length - passedCount}`);
  if (passedCount === testResults.length) {
    console.log('\n>>> TÜM TASK 143 METİNSİZ SORU TESTLERİ BAŞARIYLA GEÇTİ! <<<');
  } else {
    process.exit(1);
  }
}

runGeneratorTests().catch(err => {
  console.error('Test hatası:', err);
  process.exit(1);
});
