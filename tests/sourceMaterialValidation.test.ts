import { 
  detectSourceRequirement, 
  checkStimulusQuality, 
  validateAndEnrichExamQuestions 
} from '../src/utils/sourceMaterialValidator';
import { SAMPLE_EXAMS } from '../src/data/sampleExams';
import { ExamQuestion } from '../src/types';
import { distributeExamPoints, reconcileRubricPoints } from '../src/utils/examScoring';
import { isValidStudentAnswer } from '../src/types/practice';

interface TestResult {
  testId: number;
  name: string;
  passed: boolean;
  details: string;
}

const results: TestResult[] = [];

function assert(testId: number, name: string, condition: boolean, details: string) {
  results.push({
    testId,
    name,
    passed: Boolean(condition),
    details
  });
}

console.log('=== OYSS KAYNAK MATERYAL DOĞRULAMA VE ORTAK UYARICI TESTLERİ BAŞLIYOR ===\n');

// --------------------------------------------------------------------------
// TEST 1: Kaynak metni olan sorunun doğru görüntülenmesi ve doğrulamayı geçmesi
// --------------------------------------------------------------------------
{
  const fullPassage = `Ekim ayının son günlerinde Ayvalık'taki zeytinliklerde hummalı bir çalışma başlar. Sabahın erken saatlerinde köylüler ellerinde sırıklar ve yaygılarla zeytin ağaçlarının yolunu tutar. Toplanan zeytinler çuvallara doldurularak bekletilmeden fabrikaya götürülür.`;
  
  const questionWithValidText: ExamQuestion = {
    questionNumber: 1,
    outcomeCode: 'T.O.5.6',
    archetype: 'okuma_anlama',
    questionText: 'Metinden hareketle zeytinyağı elde edilişinin ilk 3 aşamasını sırasıyla yazınız.',
    stimulus: fullPassage,
    modelAnswer: '1. Zeytinlerin sırık ve yaygılarla toplanması\n2. Çuvallara doldurulması\n3. Fabrikaya taşınması',
    solutionExplanation: 'Metindeki kronolojik sıralama takip edilmelidir.',
    points: 15,
    rubric: [
      { criterion: '3 aşamayı sırasıyla yazma', points: 10 },
      { criterion: 'İmla ve noktalama', points: 5 }
    ]
  };

  const req = detectSourceRequirement(
    questionWithValidText.questionText,
    questionWithValidText.archetype,
    questionWithValidText.contextText,
    questionWithValidText.stimulus
  );
  const quality = checkStimulusQuality(questionWithValidText.stimulus, req);
  const { enrichedQuestions: [enriched] } = validateAndEnrichExamQuestions([questionWithValidText]);

  const passed = req.requiresSource && 
                 req.type === 'reading_text' && 
                 quality.isValid && 
                 !enriched.hasMissingSourceError && 
                 enriched.stimulus === fullPassage;

  assert(
    1,
    'Kaynak metni olan sorunun doğru görüntülenmesi ve doğrulamayı geçmesi',
    passed,
    `Gerekli tür: ${req.type}, Kalite geçerli: ${quality.isValid}, Hata durumu: ${Boolean(enriched.hasMissingSourceError)}`
  );
}

// --------------------------------------------------------------------------
// TEST 2: Kaynak metni olmayan veya meta-özet olan sorunun doğrulama hatası vermesi
// --------------------------------------------------------------------------
{
  // Canlı sitede tespit edilen kritik hata durumu:
  // Soru "Metinde zeytinin..." diyor fakat stimulus yalnızca soru kökünü tekrarlayan bir meta-özet.
  const questionWithMetaSummaryOnly: ExamQuestion = {
    questionNumber: 1,
    outcomeCode: 'T.O.5.6',
    archetype: 'okuma_anlama',
    questionText: 'Metinden hareketle zeytinyağı elde edilişinin ilk 3 aşamasını sırasıyla yazınız.',
    stimulus: 'Metinde zeytinin toplanıp yağa dönüştürülmesine kadar belirli bir sıra anlatılmıştır.',
    modelAnswer: 'Aşamalar yazılmalıdır.',
    points: 15,
    rubric: [{ criterion: 'Tam cevap', points: 15 }]
  };

  const quality = checkStimulusQuality(questionWithMetaSummaryOnly.stimulus);
  const { enrichedQuestions: [enriched] } = validateAndEnrichExamQuestions([questionWithMetaSummaryOnly]);

  const passed = quality.isMetaSummary && 
                 enriched.hasMissingSourceError === true && 
                 typeof enriched.sourceValidationError === 'string' &&
                 enriched.sourceValidationError.includes('kaynak');

  assert(
    2,
    'Kaynak metni olmayan/meta-özet olan sorunun doğrulama hatası vermesi',
    passed,
    `isMetaSummary: ${quality.isMetaSummary}, hasMissingSourceError: ${enriched.hasMissingSourceError}, Hata: "${enriched.sourceValidationError}"`
  );
}

// --------------------------------------------------------------------------
// TEST 3: Tablo veya görsel gerektiren sorunun materyali eksikse doğrulama hatası vermesi
// --------------------------------------------------------------------------
{
  const questionRequiringTableWithoutTable: ExamQuestion = {
    questionNumber: 1,
    outcomeCode: 'MAT.6.4.1',
    archetype: 'veri_analizi',
    questionText: 'Tablodaki verileri inceleyerek pazartesi ve salı günleri arasındaki sıcaklık farkını hesaplayınız.',
    stimulus: '', // Boş tablo!
    modelAnswer: 'Fark 5 derecedir.',
    points: 10,
    rubric: [{ criterion: 'Doğru işlem', points: 10 }]
  };

  const reqTable = detectSourceRequirement(
    questionRequiringTableWithoutTable.questionText, 
    questionRequiringTableWithoutTable.archetype
  );
  const { enrichedQuestions: [enrichedTable] } = validateAndEnrichExamQuestions([questionRequiringTableWithoutTable]);

  const questionRequiringGraphicWithoutGraphic: ExamQuestion = {
    questionNumber: 2,
    outcomeCode: 'FEN.7.2.3',
    archetype: 'grafik_yorumlama',
    questionText: 'Grafikteki verilere göre bitkinin fotosentez hızının maksimum olduğu ışık şiddetini belirtiniz.',
    stimulus: '   ', // Boşluk
    modelAnswer: 'Işık şiddeti 400 lüks.',
    points: 15,
    rubric: [{ criterion: 'Grafik okuma', points: 15 }]
  };

  const reqGraphic = detectSourceRequirement(
    questionRequiringGraphicWithoutGraphic.questionText, 
    questionRequiringGraphicWithoutGraphic.archetype
  );
  const { enrichedQuestions: [enrichedGraphic] } = validateAndEnrichExamQuestions([questionRequiringGraphicWithoutGraphic]);

  const passed = reqTable.type === 'data_table' &&
                 enrichedTable.hasMissingSourceError === true &&
                 reqGraphic.type === 'chart_or_visual' &&
                 enrichedGraphic.hasMissingSourceError === true;

  assert(
    3,
    'Tablo veya grafik gerektiren sorunun materyali eksikse doğrulama hatası vermesi',
    passed,
    `Tablo tipi: ${reqTable.type} (Hata: ${enrichedTable.hasMissingSourceError}), Grafik tipi: ${reqGraphic.type} (Hata: ${enrichedGraphic.hasMissingSourceError})`
  );
}

// --------------------------------------------------------------------------
// TEST 4: Ortak kaynak metnin birden fazla soruya doğru bağlanması (Common Stimulus)
// --------------------------------------------------------------------------
{
  const sharedStory = `Güneşli bir mayıs sabahında Zeynep ve dedesi bahçedeki yaşlı çınar ağacının altına oturdular. Dedesi ahşap kutusunu açtı ve içinden dedesinden kalma bir saat çıkardı. Bu saat yalnızca zamanı değil, hatıraları da saklıyordu.`;

  const q1: ExamQuestion = {
    questionNumber: 1,
    outcomeCode: 'T.O.5.1',
    archetype: 'okuma_anlama',
    questionText: 'Zeynep ve dedesinin nereye oturduklarını metne göre yazınız.',
    stimulus: sharedStory,
    modelAnswer: 'Bahçedeki yaşlı çınar ağacının altına oturmuşlardır.',
    points: 10,
    rubric: [{ criterion: 'Mekânı belirtme', points: 10 }]
  };

  // Soru 2: 1. sorudaki metne atıf yapıyor
  const q2: ExamQuestion = {
    questionNumber: 2,
    outcomeCode: 'T.O.5.2',
    archetype: 'okuma_anlama',
    questionText: '1. sorudaki metinde geçen saatin Zeynep ve dedesi için neden değerli olduğunu açıklayınız.',
    stimulus: '1. sorudaki çınar ağacı metnini dikkate alınız.',
    modelAnswer: 'Çünkü saat dedesinden kalmıştır ve aile hatıralarını taşımaktadır.',
    points: 10,
    rubric: [{ criterion: 'Manevi değeri açıklama', points: 10 }]
  };

  // Soru 3: Metinden bir yargı soruyor, stimulus boş
  const q3: ExamQuestion = {
    questionNumber: 3,
    outcomeCode: 'T.O.5.3',
    archetype: 'okuma_anlama',
    questionText: 'Metnin ana fikrini tek bir cümleyle yazınız.',
    stimulus: '',
    modelAnswer: 'Maddi nesneler aile hatıralarını kuşaktan kuşağa aktarır.',
    points: 10,
    rubric: [{ criterion: 'Ana fikir', points: 10 }]
  };

  const { enrichedQuestions: enriched } = validateAndEnrichExamQuestions([q1, q2, q3]);

  const passed = enriched[0].stimulus === sharedStory &&
                 enriched[1].stimulus === sharedStory && // Soru 2 uyarısını 1. sorudan otomatik devraldı!
                 enriched[2].stimulus === sharedStory && // Soru 3 uyarısını 1. sorudan otomatik devraldı!
                 enriched[0].sharedSourceId !== undefined &&
                 enriched[0].sharedSourceId === enriched[1].sharedSourceId &&
                 enriched[1].sharedSourceId === enriched[2].sharedSourceId &&
                 !enriched[0].hasMissingSourceError &&
                 !enriched[1].hasMissingSourceError &&
                 !enriched[2].hasMissingSourceError;

  assert(
    4,
    'Ortak kaynak metnin birden fazla soruya doğru bağlanması (commonStimulus / sharedSourceId)',
    passed,
    `Soru 1 stimulus boyu: ${enriched[0].stimulus?.length}, Soru 2 kurtarıldı: ${enriched[1].stimulus === sharedStory}, Soru 3 kurtarıldı: ${enriched[2].stimulus === sharedStory}, Ortak ID: ${enriched[0].sharedSourceId}`
  );
}

// --------------------------------------------------------------------------
// TEST 5: Kaynak gerektirmeyen bağımsız sorunun hatalı reddedilmemesi
// --------------------------------------------------------------------------
{
  const independentMathQuestion: ExamQuestion = {
    questionNumber: 1,
    outcomeCode: 'MAT.7.1.1',
    archetype: 'islem_algoritma',
    questionText: '(-12) : (+3) - (-4) . (+2) işleminin sonucunu basamaklarını göstererek bulunuz.',
    stimulus: '',
    modelAnswer: '(-12) : (+3) = -4\n(-4) . (+2) = -8\n(-4) - (-8) = -4 + 8 = +4',
    points: 10,
    rubric: [
      { criterion: 'Bölme ve çarpma önceliği', points: 5 },
      { criterion: 'İşaret kuralı ve çıkarma', points: 5 }
    ]
  };

  const independentGrammarQuestion: ExamQuestion = {
    questionNumber: 2,
    outcomeCode: 'T.D.6.1',
    archetype: 'dil_bilgisi',
    questionText: 'Aşağıdaki cümlede geçen isim tamlamalarını bularak türlerini belirtiniz: "Okul bahçesinin kapısı sabah erkenden açıldı."',
    stimulus: '',
    modelAnswer: '"Okul bahçesinin kapısı" zincirleme isim tamlamasıdır.',
    points: 10,
    rubric: [{ criterion: 'Tamlamayı ve türünü bulma', points: 10 }]
  };

  const { enrichedQuestions: [enrichedMath, enrichedGrammar] } = validateAndEnrichExamQuestions([
    independentMathQuestion,
    independentGrammarQuestion
  ]);

  const passed = detectSourceRequirement(
                   independentMathQuestion.questionText, 
                   independentMathQuestion.archetype
                 ).requiresSource === false &&
                 enrichedMath.hasMissingSourceError !== true &&
                 detectSourceRequirement(
                   independentGrammarQuestion.questionText, 
                   independentGrammarQuestion.archetype
                 ).requiresSource === false &&
                 enrichedGrammar.hasMissingSourceError !== true;

  assert(
    5,
    'Kaynak gerektirmeyen bağımsız sorunun hatalı reddedilmemesi',
    passed,
    `Matematik hata yok: ${!enrichedMath.hasMissingSourceError}, Dilbilgisi hata yok: ${!enrichedGrammar.hasMissingSourceError}`
  );
}

// --------------------------------------------------------------------------
// TEST 6: Yapay zekâ sınav üretiminin tüm görünüm alanlarında kaynak materyalleri koruması
// --------------------------------------------------------------------------
{
  // Senaryo 6'daki Ayvalık zeytin hasadı sorusunun Tier 2 havuzundan seçildiğini simüle ediyoruz:
  const examSenaryo6 = SAMPLE_EXAMS.find(e => e.id === 'exam_5_turkce_1_1_senaryo_6');
  if (!examSenaryo6) {
    throw new Error('exam_5_turkce_1_1_senaryo_6 bulunamadı');
  }

  // Havuzdan gelen 3. soru (Zeytinyağı aşamaları)
  const zeytinQuestion = examSenaryo6.questions.find(q => q.questionText.includes('zeytinyağı'));
  if (!zeytinQuestion) {
    throw new Error('Zeytinyağı sorusu bulunamadı');
  }

  // Soru tek başına yeni bir AI sınavının 1. sorusu olarak yerleştirildiğinde:
  const aiGeneratedExamQuestions: ExamQuestion[] = [
    {
      ...zeytinQuestion,
      questionNumber: 1,
      points: 20
    }
  ];

  const { enrichedQuestions: enriched } = validateAndEnrichExamQuestions(aiGeneratedExamQuestions);
  const q1 = enriched[0];

  const hasFullStimulus = q1.stimulus && q1.stimulus.includes('Ayvalık') && q1.stimulus.length > 150;
  const noMissingSourceError = !q1.hasMissingSourceError;

  assert(
    6,
    'Yapay zekâ sınav üretiminin tüm görünüm alanlarında kaynak materyalleri koruması',
    Boolean(hasFullStimulus && noMissingSourceError),
    `Stimulus uzunluğu: ${q1.stimulus?.length} karakter, "Ayvalık" içeriyor: ${q1.stimulus?.includes('Ayvalık')}, Hata yok: ${noMissingSourceError}`
  );
}

// --------------------------------------------------------------------------
// TEST 7: Mevcut hazır sınavların, puanlama sisteminin, matematik düzenleyicisinin ve kuralların korunması
// --------------------------------------------------------------------------
{
  let allCuratedValid = true;
  let totalCuratedQuestions = 0;
  let missingSourceInCurated = 0;

  // Tüm SAMPLE_EXAMS sınavlarını doğrula
  for (const exam of SAMPLE_EXAMS) {
    const { enrichedQuestions: validated } = validateAndEnrichExamQuestions(exam.questions);
    totalCuratedQuestions += validated.length;
    for (const q of validated) {
      if (q.hasMissingSourceError) {
        missingSourceInCurated++;
        allCuratedValid = false;
        console.warn(`[UYARI] Sınav ${exam.id} Soru ${q.questionNumber}: ${q.sourceValidationError}`);
      }
    }
  }

  // Puanlama sistemi kontrolü:
  const targetPoints = distributeExamPoints(5); // 5 soru -> [20, 20, 20, 20, 20] = 100
  const pointsSum100 = targetPoints.reduce((a, b) => a + b, 0) === 100;

  // Rubrik dengeleme kontrolü:
  const balancedRubric = reconcileRubricPoints(
    [{ criterion: 'Kriter 1', points: 1 }, { criterion: 'Kriter 2', points: 1 }],
    17
  );
  const rubricSum17 = balancedRubric.reduce((sum, r) => sum + r.points, 0) === 17;

  // Öğrenci cevap doğrulama kontrolü:
  const shortAnswerValid = isValidStudentAnswer('x=3');
  const emptyAnswerInvalid = !isValidStudentAnswer('   a   ');

  const passed = allCuratedValid && 
                 missingSourceInCurated === 0 && 
                 pointsSum100 && 
                 rubricSum17 && 
                 shortAnswerValid && 
                 emptyAnswerInvalid;

  assert(
    7,
    'Mevcut hazır sınavların, puanlama sisteminin ve matematik/cevap kurallarının korunması',
    passed,
    `Toplam hazır soru: ${totalCuratedQuestions}, Hatalı soru: ${missingSourceInCurated}, Puan toplamı: ${pointsSum100}, Rubrik toplamı: ${rubricSum17}, Cevap filtresi: ${shortAnswerValid && emptyAnswerInvalid}`
  );
}

// ==========================================================================
// ÖZET RAPOR
// ==========================================================================
console.log('=== TEST SONUÇLARI ===\n');
let passedCount = 0;
let failedCount = 0;

results.forEach(res => {
  const icon = res.passed ? '✓ BAŞARILI' : '✗ BAŞARISIZ';
  console.log(`[TEST ${res.testId.toString().padStart(2, '0')}] ${icon} - ${res.name}`);
  console.log(`         Ayrıntı: ${res.details}\n`);
  if (res.passed) {
    passedCount++;
  } else {
    failedCount++;
  }
});

console.log(`Toplam Test: ${results.length}`);
console.log(`Başarılı: ${passedCount}`);
console.log(`Başarısız: ${failedCount}`);

if (failedCount > 0) {
  console.error('\n>>> BAZI TESTLER BAŞARISIZ OLDU! <<<');
  process.exit(1);
} else {
  console.log('\n>>> TÜM KAYNAK MATERYAL DOĞRULAMA TESTLERİ BAŞARIYLA GEÇTİ! <<<');
}
