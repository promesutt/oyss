import { SAMPLE_EXAMS } from '../src/data/sampleExams';
import { 
  detectSourceRequirement, 
  checkStimulusQuality, 
  sanitizeTextReferencesIfNoStimulus,
  isSemanticallySelfContainedQuestion 
} from '../src/utils/sourceMaterialValidator';
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

console.log('=== TASK 144: METİN GEREKTİREN SORULARDA ANLAMSAL CEVAPLANABİLİRLİK GÜVENCESİ TESTLERİ BAŞLIYOR ===\n');

// --------------------------------------------------------------------------
// TEST 1: Metinsiz kalmış soru kökünden "Metne göre" silinse dahi anlamsal olarak cevaplanamazlık denetimi
// --------------------------------------------------------------------------
{
  // Durum 1: "Metne göre: Dede Korkut bu gence neden 'Boğaç Han' adını vermiştir?"
  // sanitizeTextReferencesIfNoStimulus sonrası: "Dede Korkut bu gence neden 'Boğaç Han' adını vermiştir?"
  const sanitizedStem1 = sanitizeTextReferencesIfNoStimulus(
    "Metne göre: Dede Korkut bu gence neden 'Boğaç Han' adını vermiştir?",
    ""
  );
  const selfContained1 = isSemanticallySelfContainedQuestion(sanitizedStem1, "", "T.O.5.6");

  // Durum 2: "Gence bu ismin verilme gerekçesini açıklayınız." (Deictic 'gence' ve 'bu ismin' zamirleri metin olmadan bilinemez)
  const sanitizedStem2 = sanitizeTextReferencesIfNoStimulus(
    "Gence bu ismin verilme gerekçesini metindeki olay örgüsünden hareketle açıklayınız.",
    ""
  );
  const selfContained2 = isSemanticallySelfContainedQuestion(sanitizedStem2, "", "T.O.5.6");

  // Durum 3: "Elif Öğretmen köydeki çocuklara neden yardım etmek istemiştir?" (Olay örgüsü/karakter motivasyonu metin olmadan bilinemez)
  const selfContained3 = isSemanticallySelfContainedQuestion(
    "Elif Öğretmen köydeki çocuklara neden yardım etmek istemiştir?",
    "",
    "T.O.5.6"
  );

  // Durum 4: Okuma anlama kazanımı (T.O.*) altında metinsiz genel soru
  const selfContained4 = isSemanticallySelfContainedQuestion(
    "Yazarın savunduğu ana düşünceyi ve gerekçesini açıklayınız.",
    "",
    "T.O.6.4"
  );

  const allRejectedWithoutText = !selfContained1 && !selfContained2 && !selfContained3 && !selfContained4;

  assert(
    'T1_SEMANTIC_SELF_CONTAINED_REJECTS_DEFECTIVE',
    'Metin atfı silinse dahi metin olmadan cevaplanamayan sorular bağımsız kabul edilmemeli (isSemanticallySelfContained === false)',
    allRejectedWithoutText,
    `Boğaç Han: ${selfContained1}, Gence gerekçe: ${selfContained2}, Elif Öğretmen: ${selfContained3}, Ana düşünce: ${selfContained4}`
  );
}

// --------------------------------------------------------------------------
// TEST 2: Kendi başına bağımsız cevaplanabilen soruların ve tam metinli soruların onaylanması
// --------------------------------------------------------------------------
{
  // A: Dilbilgisi / Kavram sorusu (Metne dayanmaz, tek başına cevaplanabilir)
  const grammarStem = "Kişileştirme (teşhis) sanatının ne olduğunu açıklayarak bu sanata uygun bir örnek cümle yazınız.";
  const grammarValid = isSemanticallySelfContainedQuestion(grammarStem, "", "T.Y.5.13");

  // B: Matematik sorusu
  const mathStem = "Bir kenar uzunluğu 12 cm olan karenin çevresini ve alanını hesaplayınız.";
  const mathValid = isSemanticallySelfContainedQuestion(mathStem, "", "M.5.2.1");

  // C: Tam metni bulunan okuma anlama sorusu
  const fullStory = "Toros Dağları'nın eteklerindeki küçük bir köy okulunda öğretmenlik yapan Elif Öğretmen, boş bir sınıfı kütüphaneye dönüştürmek için kolları sıvadı. Kasabadaki marangozdan tahta raflar rica etti, öğrencileriyle birlikte rafları gökkuşağı renklerine boyadı.";
  const readingStem = "Elif Öğretmen'in kütüphane kurarken sergilediği azim ve dayanışmayı metne göre açıklayınız.";
  const readingWithStoryValid = isSemanticallySelfContainedQuestion(readingStem, fullStory, "T.O.5.6");

  const passed = grammarValid && mathValid && readingWithStoryValid;
  assert(
    'T2_GENUINE_SELF_CONTAINED_ACCEPTED',
    'Kendi başına cevaplanabilen kavramsal sorular ve geçerli metni olan sorular onaylanmalı (isSemanticallySelfContained === true)',
    passed,
    `Dilbilgisi: ${grammarValid}, Matematik: ${mathValid}, Metinli Okuma: ${readingWithStoryValid}`
  );
}

async function runTests() {
  // --------------------------------------------------------------------------
  // TEST 3: Cerrahi İkame: Referans havuzundan ikame edilen sorunun metin kalitesi ve Provenance etiketi
  // --------------------------------------------------------------------------
  {
    // Referans havuzundaki ikameler "oyss_curated" olmalı, ASLA "resmî MEB sorusu" veya "MEB onaylı" olarak etiketlenmemelidir.
    const turkceScenarios = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[5]?.turkce || [];
    const exam5Senaryo5 = turkceScenarios.find(s => s.id === 'senaryo_5');
    if (!exam5Senaryo5) throw new Error('5. sınıf Türkçe Senaryo 5 bulunamadı');

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
      const aiResult = await generateMEBIQuestions('turkce', 5, exam5Senaryo5, 0);
      const q1 = aiResult.generatedQuestions[0];

      const isCurated = q1.sourceOrigin === 'oyss_curated';
      const hasValidStory = Boolean(q1.stimulus && q1.stimulus.length >= 80);
      const originTitleNotMebApproved = !q1.originExamTitle?.toLowerCase().includes('meb onaylı') && 
                                       !q1.originExamTitle?.toLowerCase().includes('resmî meb');
      const isSelfContained = isSemanticallySelfContainedQuestion(q1.question, q1.stimulus, q1.outcome);

      const passed = isCurated && hasValidStory && originTitleNotMebApproved && isSelfContained;
      assert(
        'T3_CURATED_SUBSTITUTION_PROVENANCE_AND_QUALITY',
        'Kusurlu soru oyss_curated olarak ikame edilmeli, tam metin içermeli ve MEB onaylı/resmî MEB etiketi taşımamalıdır',
        passed,
        `sourceOrigin: ${q1.sourceOrigin}, originExamTitle: ${q1.originExamTitle}, Metin Boyutu: ${q1.stimulus?.length || 0}, SelfContained: ${isSelfContained}`
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  }

  // --------------------------------------------------------------------------
  // TEST 4: İkame bulunamazsa metin atfını silip yetersiz soruyu KABUL ETMEME (Ejection & Procedural Fallback)
  // --------------------------------------------------------------------------
  {
    // Senaryo: Model, referans havuzunda karşılığı bulunmayan sentetik/nadir bir kazanıma metinsiz soru üretti
    // Sistem bunu yalnızca "Metne göre" ifadesini silerek kabul ETMEMELİ,
    // kusurlu soruyu çıkarıp dinamik OYSS sentez havuzundan tam hikaye metinli soru ile değiştirmelidir.
    const customScenario = {
      id: 'senaryo_custom_nadir',
      title: 'Özel Nadir Senaryo',
      scenarioNumber: 99,
      grade: 5 as const,
      subjectId: 'turkce' as const,
      totalQuestions: 1,
      distributions: [
        {
          outcomeCode: 'T.O.5.99_OZEL_NADIR',
          notes: 'Nadir Öğrenme Çıktısı',
          cognitiveLevel: 'Karmaşık Bilişsel Süreçler',
          questionCount: 1
        }
      ]
    };

    const originalFetch = globalThis.fetch;
    // Havuzda bulunmayan özel bir kazanım kodu ve metinsiz kurgusal soru
    const unrecoverableDefectiveResponse = [
      {
        number: 1,
        outcome: 'T.O.5.99_OZEL_NADIR',
        points: 20,
        difficulty: 'Zor',
        stimulus: '', // Metin yok!
        question: 'Metne göre Dede Korkut bu gence neden Boğaç Han adını vermiştir? Açıklayınız.',
        answer: 'Boğayı yendiği için vermiştir.',
        rubric: [{ item: 'Doğru cevap', pts: 20 }],
        sourceOrigin: 'gemini_ai'
      }
    ];

    globalThis.fetch = async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        questions: unrecoverableDefectiveResponse,
        activeModel: 'Gemini 3.5 Flash Lite Mock'
      })
    }) as any;

    try {
      const aiResult = await generateMEBIQuestions('turkce', 5, customScenario as any, 0);
      const q1 = aiResult.generatedQuestions[0];

      // Kusurlu metinsiz Boğaç Han sorusu kesinlikle kabul edilmemeli!
      const stemNotDefective = !q1.question.includes('Boğaç Han');
      // Tam metinli dinamik sentez devreye girmeli
      const isSynthetic = q1.sourceOrigin === 'oyss_synthetic';
      const hasRichStory = Boolean(q1.stimulus && q1.stimulus.length >= 150);
      const originIsSynthetic = q1.originExamTitle === 'OYSS Dinamik Sentez Havuzu';
      const isAnswerable = isSemanticallySelfContainedQuestion(q1.question, q1.stimulus, q1.outcome);

      const passed = stemNotDefective && isSynthetic && hasRichStory && originIsSynthetic && isAnswerable;
      assert(
        'T4_UNRECOVERABLE_DEFECTIVE_QUESTION_EJECTED_AND_SYNTHESIZED',
        'Uygun ikame bulunamayan metinsiz soru atıflar silinerek kabul EDİLMEMELİ; çıkarılıp tam hikaye metinli dinamik sentez üretilmelidir',
        passed,
        `Kusurlu soru çıkarıldı: ${stemNotDefective}, sourceOrigin: ${q1.sourceOrigin}, originExamTitle: ${q1.originExamTitle}, Metin Boyutu: ${q1.stimulus?.length || 0}`
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  }

  // --------------------------------------------------------------------------
  // TEST 5: Yerel Kural Tabanlı Motorda Tam Metin ve Anlamsal Cevaplanabilirlik Güvencesi
  // --------------------------------------------------------------------------
  {
    const turkceScenarios = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[5]?.turkce || [];
    const exam5Senaryo5 = turkceScenarios.find(s => s.id === 'senaryo_5');
    if (!exam5Senaryo5) throw new Error('5. sınıf Türkçe Senaryo 5 bulunamadı');

    // Local engine çağrısı (API fetch başarısız simülasyonu)
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => { throw new Error('API erişilemez'); };

    try {
      const localResult = await generateMEBIQuestions('turkce', 5, exam5Senaryo5, 0);
      let allLocalAnswerable = true;
      let detailsArr: string[] = [];

      for (const q of localResult.generatedQuestions) {
        const isAnswerable = isSemanticallySelfContainedQuestion(q.question, q.stimulus, q.outcome);
        if (!isAnswerable) {
          allLocalAnswerable = false;
        }
        const req = detectSourceRequirement(q.question, q.templateType, undefined, q.stimulus);
        if (req.requiresSource && req.type === 'reading_text') {
          const quality = checkStimulusQuality(q.stimulus, req);
          if (!quality.isValid || (q.stimulus || '').length < 80) {
            allLocalAnswerable = false;
          }
        }
        detailsArr.push(`Soru ${q.number}: Metin=${q.stimulus?.length || 0} kr, AnlamsalCevaplanabilir=${isAnswerable}`);
      }

      assert(
        'T5_LOCAL_ENGINE_SEMANTIC_ANSWERABILITY',
        'Yerel motorun ürettiği tüm Türkçe soruları anlamsal olarak cevaplanabilir ve metinli olmalıdır',
        allLocalAnswerable,
        detailsArr.join(' | ')
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  }

  // --------------------------------------------------------------------------
  // TEST 6: TASK 143 Kaynak Veri Düzeltmelerinin Korunması (Boğaç Han, Elif Öğretmen, Kuş Köşkleri, Kutup Işıkları)
  // --------------------------------------------------------------------------
  {
    const exam5Senaryo5 = SAMPLE_EXAMS.find(e => e.id === 'exam_5_turkce_1_1_senaryo_5');
    const bogacQ3 = exam5Senaryo5?.questions.find(q => q.questionNumber === 3);
    const bogacValid = bogacQ3 && bogacQ3.stimulus && bogacQ3.stimulus.includes('Bayındır Han') && bogacQ3.stimulus.length > 200;

    const exam5Senaryo4 = SAMPLE_EXAMS.find(e => e.id === 'exam_5_turkce_1_1_senaryo_4');
    const elifQ2 = exam5Senaryo4?.questions.find(q => q.questionNumber === 2);
    const elifValid = elifQ2 && elifQ2.stimulus && elifQ2.stimulus.includes('Elif Öğretmen') && elifQ2.stimulus.length > 200;

    const exam6Senaryo4 = SAMPLE_EXAMS.find(e => e.id === 'exam_6_turkce_1_1_senaryo_4');
    const kusQ2 = exam6Senaryo4?.questions.find(q => q.questionNumber === 2);
    const kusValid = kusQ2 && kusQ2.stimulus && kusQ2.stimulus.includes('kuş köşkleri') && kusQ2.stimulus.length > 200;

    const exam6Senaryo6 = SAMPLE_EXAMS.find(e => e.id === 'exam_6_turkce_1_1_senaryo_6');
    const kutupQ3 = exam6Senaryo6?.questions.find(q => q.questionNumber === 3);
    const kutupValid = kutupQ3 && kutupQ3.stimulus && kutupQ3.stimulus.includes('Kutup Işıkları') && kutupQ3.stimulus.length > 150;

    const allPreserved = Boolean(bogacValid && elifValid && kusValid && kutupValid);
    assert(
      'T6_TASK143_SOURCE_DATA_REGRESSION_PRESERVED',
      'TASK 143 kaynak veri düzeltmeleri (Boğaç Han, Elif Öğretmen, Kuş Köşkleri, Kutup Işıkları) eksiksiz korunmalı',
      allPreserved,
      `Boğaç Han: ${Boolean(bogacValid)}, Elif: ${Boolean(elifValid)}, Kuş Köşkleri: ${Boolean(kusValid)}, Kutup: ${Boolean(kutupValid)}`
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
    console.log('\n>>> TÜM TASK 144 ANLAMSAL CEVAPLANABİLİRLİK TESTLERİ BAŞARIYLA GEÇTİ! <<<');
  } else {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test hatası:', err);
  process.exit(1);
});
