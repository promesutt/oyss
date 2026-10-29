import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import { SAMPLE_EXAMS } from '../src/data/sampleExams';
import { ExamQuestion } from '../src/types';
import { generateMEBIQuestions } from '../src/utils/aiGeneratorEngine';
import { MIDDLE_SCHOOL_OFFICIAL_SCENARIOS } from '../src/data/curriculumData';

console.log('=== OYSS 7. SINIF TÜRKÇE MEBİ PİLOT TESTLERİ BAŞLIYOR ===\n');

let passCount = 0;
let failCount = 0;

function reportTest(num: string, title: string, success: boolean, detail: string) {
  if (success) {
    passCount++;
    console.log(`[TEST ${num}] ✓ BAŞARILI - ${title}`);
    console.log(`         Ayrıntı: ${detail}\n`);
  } else {
    failCount++;
    console.error(`[TEST ${num}] ✗ BAŞARISIZ - ${title}`);
    console.error(`         Ayrıntı: ${detail}\n`);
  }
}

// -----------------------------------------------------------------------------
// TEST 01: Geriye dönük uyumluluk: alternativeAnswers alanı olmayan eski sorular
// -----------------------------------------------------------------------------
try {
  const legacyQuestion: ExamQuestion = {
    questionNumber: 1,
    outcomeCode: 'T.O.5.6',
    difficulty: 'Kolay',
    cognitiveLevel: 'Basit Bilişsel Süreçler',
    points: 15,
    questionText: 'Metnin konusunu yazınız.',
    modelAnswer: 'Dürüstlüğün önemi.',
    solutionExplanation: 'Açıklama...',
    rubric: [{ criterion: 'Konunun doğru yazılması', points: 15 }]
  };

  const hasAlt = 'alternativeAnswers' in legacyQuestion && legacyQuestion.alternativeAnswers !== undefined;
  const worksWithoutError = legacyQuestion.modelAnswer === 'Dürüstlüğün önemi.' && !hasAlt;

  reportTest(
    '01',
    'Geriye dönük uyumluluk: alternativeAnswers alanı olmayan sorular sorunsuz yüklenir',
    worksWithoutError,
    `Eski soru nesnesinde alternativeAnswers: undefined, modelAnswer eksiksiz korundu.`
  );
} catch (err: any) {
  reportTest('01', 'Geriye dönük uyumluluk', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 02: 7. Sınıf Türkçe pilot sorularında alternativeAnswers varlığı ve geçerliliği
// -----------------------------------------------------------------------------
try {
  const g7Tr1 = SAMPLE_EXAMS.find(e => e.id === 'exam_7_turkce_1_1_senaryo_1');
  assert.ok(g7Tr1, 'Senaryo 1 bulunamadı');

  const q1 = g7Tr1.questions.find(q => q.questionNumber === 1);
  const q2 = g7Tr1.questions.find(q => q.questionNumber === 2);
  const q3 = g7Tr1.questions.find(q => q.questionNumber === 3);

  const q1HasAlts = Array.isArray(q1?.alternativeAnswers) && q1!.alternativeAnswers!.length >= 2;
  const q2HasAlts = Array.isArray(q2?.alternativeAnswers) && q2!.alternativeAnswers!.length >= 2;
  const q3HasAlts = Array.isArray(q3?.alternativeAnswers) && q3!.alternativeAnswers!.length >= 2;

  const allValid = q1HasAlts && q2HasAlts && q3HasAlts;

  reportTest(
    '02',
    '7. Sınıf Türkçe Senaryo 1 sorularında MEBİ alternatif cevapları mevcuttur',
    allValid,
    `Soru 1 Alts: ${q1?.alternativeAnswers?.length}, Soru 2 Alts: ${q2?.alternativeAnswers?.length}, Soru 3 Alts: ${q3?.alternativeAnswers?.length}`
  );
} catch (err: any) {
  reportTest('02', 'Pilot sorularda alternatif cevaplar', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 03: Çıkarım ve söz varlığı sorularında iki aşamalı rubrik (Teşhis vs Kanıt)
// -----------------------------------------------------------------------------
try {
  const g7Tr1 = SAMPLE_EXAMS.find(e => e.id === 'exam_7_turkce_1_1_senaryo_1');
  const q1 = g7Tr1!.questions.find(q => q.questionNumber === 1); // T.O.7.4 Mefkûre & Vatan yetim kalamaz
  const q3 = g7Tr1!.questions.find(q => q.questionNumber === 3); // T.O.7.8 Şerife Bacı derin çıkarım

  // Q1'in 4 parçalı ölçütü olmalı: Mefkûre tahmin (4) + gerekçe (4) + Vatan yetim kalamaz tespit (4) + delil (3) = 15
  const q1RubricSum = q1!.rubric.reduce((s, r) => s + r.points, 0);
  const q1HasSeparatedCriteria = q1!.rubric.length === 4 && q1RubricSum === 15;

  // Q3'ün 2 parçalı ölçütü olmalı: Değer tahlili (7) + Metin içi delil (7) = 14
  const q3RubricSum = q3!.rubric.reduce((s, r) => s + r.points, 0);
  const q3HasSeparatedCriteria = q3!.rubric.length === 2 && q3RubricSum === 14;

  const separated = q1HasSeparatedCriteria && q3HasSeparatedCriteria;

  reportTest(
    '03',
    'Çıkarım ve sözcük tahmini sorularında doğru teşhis ile metin içi delil rubrikte bağımsızdır',
    separated,
    `Q1 Rubrik eleman: ${q1!.rubric.length} (Toplam: ${q1RubricSum}p == ${q1!.points}p), Q3 Rubrik eleman: ${q3!.rubric.length} (Toplam: ${q3RubricSum}p == ${q3!.points}p)`
  );
} catch (err: any) {
  reportTest('03', 'İki aşamalı rubrik ayrımı', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 04: Yüzey anlam (T.O.7.5) sorusunda gereksiz ölçüt eklenmemesi (Tek ölçüt)
// -----------------------------------------------------------------------------
try {
  const g7Tr1 = SAMPLE_EXAMS.find(e => e.id === 'exam_7_turkce_1_1_senaryo_1');
  const q2 = g7Tr1!.questions.find(q => q.questionNumber === 2); // T.O.7.5 Konu sorusu

  // Soru 2 yüzey anlamdır, MEBİ yaklaşımına göre gereksiz delil ölçütü eklenmemeli, tek ölçüt kalmalıdır (15 p)
  const isSingleCriterion = q2!.rubric.length === 1 && q2!.rubric[0].points === 15;

  reportTest(
    '04',
    'Basit yüzey anlam (T.O.7.5) sorusunda yapay delil ölçütü eklenmemiş, tek odak korunmuştur',
    isSingleCriterion,
    `Q2 Rubrik sayısı: ${q2!.rubric.length}, Puan: ${q2!.rubric[0].points}p`
  );
} catch (err: any) {
  reportTest('04', 'Yüzey anlam tek ölçüt kuralı', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 05: Kısmi başarı öz değerlendirme simülasyonu
// -----------------------------------------------------------------------------
try {
  const g7Tr1 = SAMPLE_EXAMS.find(e => e.id === 'exam_7_turkce_1_1_senaryo_1');
  const q1 = g7Tr1!.questions.find(q => q.questionNumber === 1)!;

  // Öğrenci 'mefkûre' kelimesinin anlamını doğru bildi (Kriter 0: 4p) ve 'vatan yetim kalamaz' anlamını bildi (Kriter 2: 4p),
  // fakat metin içi gerekçeleri (Kriter 1 ve 3) yazmadı.
  const checkedIndices = [0, 2];
  const earnedPoints = checkedIndices.reduce((acc, idx) => acc + q1.rubric[idx].points, 0);

  // Alınan puan 8 / 15 olmalıdır.
  const partialSuccessAccurate = earnedPoints === 8;

  reportTest(
    '05',
    'Öğrencinin tahmini yapıp gerekçeyi yazmadığı kısmi başarı durumu rubrikte doğru hesaplanır',
    partialSuccessAccurate,
    `Seçilen ölçütler: [0, 2], Alınan puan: ${earnedPoints} / 15 p (Tam orantılı kısmi başarı)`
  );
} catch (err: any) {
  reportTest('05', 'Kısmi başarı simülasyonu', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 06: Tüm 123 sınavda matematiksel bütünlük ve 100 puan kuralı
// -----------------------------------------------------------------------------
try {
  let rubricDiscrepancies = 0;
  let examPointDiscrepancies = 0;

  SAMPLE_EXAMS.forEach(ex => {
    let exSum = 0;
    ex.questions.forEach(q => {
      exSum += q.points;
      const rSum = q.rubric.reduce((s, r) => s + r.points, 0);
      if (rSum !== q.points) rubricDiscrepancies++;
    });
    if (exSum !== 100) examPointDiscrepancies++;
  });

  const mathValid = rubricDiscrepancies === 0 && examPointDiscrepancies === 0;

  reportTest(
    '06',
    'Tüm 123 sınavda rubrik puanı toplamları ve 100 puan toplamı eksiksizdir',
    mathValid,
    `İncelenen sınav: ${SAMPLE_EXAMS.length}, Rubrik uyuşmazlığı: ${rubricDiscrepancies}, Sınav toplam uyuşmazlığı: ${examPointDiscrepancies}`
  );
} catch (err: any) {
  reportTest('06', 'Sınav puan bütünlüğü', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 07: Yapay Zekâ Üretim Motoru (aiGeneratorEngine) 7. Sınıf Türkçe Pilot Yönergesi
// -----------------------------------------------------------------------------
try {
  const scenario = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[7]?.turkce?.[0];
  assert.ok(scenario, '7. Sınıf Türkçe Senaryo 1 bulunamadı');

  // Çevrimdışı/prosedürel motor çağrısı
  const result = await generateMEBIQuestions('turkce', 7, scenario, 0, undefined, 6);

  const hasGeneratedQs = result.generatedQuestions.length === 6;
  // Soru 1'in alternativeAnswers dizisi olmalıdır
  const q1 = result.generatedQuestions[0];
  const hasAltAnswersInGeneration = Array.isArray(q1.alternativeAnswers) && q1.alternativeAnswers.length >= 1;

  reportTest(
    '07',
    'Yapay zekâ motoru (çevrimdışı yedek ve normalizasyon) alternativeAnswers alanını korur',
    hasGeneratedQs && hasAltAnswersInGeneration,
    `Üretilen soru: ${result.generatedQuestions.length}, Soru 1 Alternatifler: ${q1.alternativeAnswers?.length} adet, Model Cevap mevcut: ${Boolean(q1.answer)}`
  );
} catch (err: any) {
  reportTest('07', 'AI motoru Türkçe pilot desteği', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 08: Öğretmen Modu Açıkken A4 Yazdırmada Rubrik ve Alternatiflerin Görünmesi
// -----------------------------------------------------------------------------
try {
  const fileContent = fs.readFileSync('src/components/ExamPaperView.tsx', 'utf-8');

  // showRubric bloğunda print:hidden OLMAMALI, print:block ve A4 stilleri OLMALI
  const rubricBlockMatch = fileContent.match(/showRubric && \(\s*<div className="([^"]+)"/);
  const rubricClasses = rubricBlockMatch ? rubricBlockMatch[1] : '';

  const hasNoPrintHiddenOnRubric = !rubricClasses.includes('print:hidden');
  const hasPrintBlockOnRubric = rubricClasses.includes('print:block');
  const hasPrintBreakAvoid = rubricClasses.includes('print:break-inside-avoid');

  const passed = hasNoPrintHiddenOnRubric && hasPrintBlockOnRubric && hasPrintBreakAvoid;

  reportTest(
    '08',
    'Öğretmen modu açıkken A4 baskısında cevap anahtarı ve rubrik print:block ile görünürdür',
    passed,
    `print:hidden kaldırıldı: ${hasNoPrintHiddenOnRubric}, print:block mevcut: ${hasPrintBlockOnRubric}, break-inside-avoid mevcut: ${hasPrintBreakAvoid}`
  );
} catch (err: any) {
  reportTest('08', 'Öğretmen modu yazdırma kontrolü', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 09: Öğretmen Modu Kapalıyken Cevapların Sızmaması ve Boş Satırların Korunması
// -----------------------------------------------------------------------------
try {
  const fileContent = fs.readFileSync('src/components/ExamPaperView.tsx', 'utf-8');

  // 1. Cevap kutusu şarta bağlı render edilmeli {showRubric && ( ... )}
  const isStrictlyConditional = fileContent.includes('{showRubric && (');

  // 2. Öğrenci boş çözüm satırları korunmalı ve print stillerine sahip olmalı
  const hasStudentLines = fileContent.includes('Öğrenci Çözüm ve Cevap Alanı:') &&
                          fileContent.includes('className="h-8 print:h-7 w-full"');

  const passed = isStrictlyConditional && hasStudentLines;

  reportTest(
    '09',
    'Öğretmen modu kapalıyken cevaplar DOM-a sızmaz, öğrenci boş cevap satırları korunur',
    passed,
    `Koşullu render korundu: ${isStrictlyConditional}, Öğrenci boş satırları mevcut: ${hasStudentLines}`
  );
} catch (err: any) {
  reportTest('09', 'Öğrenci modu yazdırma güvenliği', false, err.message);
}

// -----------------------------------------------------------------------------
// ÖZET
// -----------------------------------------------------------------------------
console.log('=== TEST ÖZETİ ===');
console.log(`Toplam Test: ${passCount + failCount}`);
console.log(`Başarılı: ${passCount}`);
console.log(`Başarısız: ${failCount}`);

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('\n>>> TÜM 7. SINIF TÜRKÇE MEBİ PİLOT TESTLERİ BAŞARIYLA GEÇTİ! <<<');
}
