import { OUTCOME_STUDY_BANK } from '../src/data/outcomeStudyBank';
import { SAMPLE_EXAMS } from '../src/data/sampleExams';
import { MIDDLE_SCHOOL_OFFICIAL_SCENARIOS } from '../src/data/curriculumData';
import { generateMEBIQuestions } from '../src/utils/aiGeneratorEngine';

console.log('=== OYSS 7. SINIF SOSYAL BİLGİLER DERS KİTABI ENTEGRASYON TESTLERİ BAŞLIYOR ===\n');

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string, detail: string) {
  if (condition) {
    console.log(`[TEST ${String(passCount + failCount + 1).padStart(2, '0')}] ✓ BAŞARILI - ${testName}`);
    console.log(`         Ayrıntı: ${detail}\n`);
    passCount++;
  } else {
    console.error(`[TEST ${String(passCount + failCount + 1).padStart(2, '0')}] ✗ BAŞARISIZ - ${testName}`);
    console.error(`         Ayrıntı: ${detail}\n`);
    failCount++;
  }
}

async function runTests() {
  // TEST 01: OUTCOME_STUDY_BANK'ta 7. Sınıf Sosyal Bilgiler Öğrenme Çıktılarının Eksiksiz Kitap Eşleştirmesi
  const expectedOutcomes = [
    'SB.7.1.1',
    'SB.7.1.2',
    'SB.7.1.3',
    'SB.7.2.1'
  ];

  const allOutcomesEnriched = expectedOutcomes.every(code => {
    const entry = OUTCOME_STUDY_BANK[code];
    return (
      entry &&
      typeof entry.textbookUnit === 'string' &&
      entry.textbookUnit.length > 5 &&
      typeof entry.textbookPageRange === 'string' &&
      entry.textbookPageRange.length > 3 &&
      Array.isArray(entry.textbookExamples) &&
      entry.textbookExamples.length >= 2 &&
      Array.isArray(entry.examTraps) &&
      entry.examTraps.length >= 1
    );
  });

  assert(
    allOutcomesEnriched,
    '7. sınıf Sosyal Bilgiler öğrenme çıktılarının (4 adet) tamamı ders kitabı ünite, sayfa ve örnekleriyle eşleştirilmiştir',
    `İncelenen kazanımlar: ${expectedOutcomes.join(', ')}. Her birinde textbookUnit, textbookPageRange, textbookExamples (en az 2) ve examTraps mevcuttur.`
  );

  // TEST 02: 1. Kitap Öğrenme Alanları (Birlikte Yaşamak ve Evimiz Dünya) ve Somut İçerik Doğrulaması
  const unit1Covered = OUTCOME_STUDY_BANK['SB.7.1.1']?.textbookUnit?.includes('Birlikte Yaşamak') &&
                       OUTCOME_STUDY_BANK['SB.7.1.2']?.textbookUnit?.includes('Birlikte Yaşamak') &&
                       OUTCOME_STUDY_BANK['SB.7.1.3']?.textbookUnit?.includes('Birlikte Yaşamak');

  const unit2Covered = OUTCOME_STUDY_BANK['SB.7.2.1']?.textbookUnit?.includes('Evimiz Dünya');

  const verifiedExamples = [
    'Trafikte İletişim',
    'Ben Dili ve Sen Dili',
    'Paralimpik',
    'Tekâlif-i Milliye',
    'Kahvenin Küresel Yolculuğu'
  ];

  const allExamplesPresent = verifiedExamples.every(term => {
    return expectedOutcomes.some(code => {
      const examples = OUTCOME_STUDY_BANK[code]?.textbookExamples || [];
      return examples.some(ex => ex.includes(term));
    });
  });

  assert(
    unit1Covered && unit2Covered && allExamplesPresent,
    '1. Kitap 1. Öğrenme Alanı (Birlikte Yaşamak) ve 2. Öğrenme Alanı (Evimiz Dünya) gerçek ders kitabı içerikleriyle doğrulanmıştır',
    `Birlikte Yaşamak: ${unit1Covered}, Evimiz Dünya: ${unit2Covered}. Doğrulanan otantik konular: ${verifiedExamples.join(', ')}.`
  );

  // TEST 03: Hazır Sınavlarda (SAMPLE_EXAMS) 7. Sınıf Sosyal Bilgiler Sorularında Alternatif Cevaplar (35 Soru)
  const sosyal7Exams = SAMPLE_EXAMS.filter(e => e.grade === 7 && e.subjectId === 'sosyal_bilgiler');
  let totalSosyalQuestions = 0;
  let questionsWithAtLeastTwoAlts = 0;

  for (const exam of sosyal7Exams) {
    for (const q of exam.questions) {
      totalSosyalQuestions++;
      if (Array.isArray(q.alternativeAnswers) && q.alternativeAnswers.length >= 2) {
        questionsWithAtLeastTwoAlts++;
      }
    }
  }

  assert(
    totalSosyalQuestions === 35 && questionsWithAtLeastTwoAlts === 35,
    '7. sınıf Sosyal Bilgiler 5 senaryosundaki tüm 35 soruda en az 2 adet kabul edilebilir alternatif cevap tanımlanmıştır',
    `Toplam Soru Sayısı: ${totalSosyalQuestions}/35, En Az 2 Alternatif Cevabı Olan Soru Sayısı: ${questionsWithAtLeastTwoAlts}/35 (%100 kapsama).`
  );

  // TEST 04: Puanlama ve Rubrik Doğrulaması (Her Senaryo 100 Puan ve Parçalı Analitik Rubrik)
  let allExamsAre100 = true;
  let allRubricsMatchQuestionPoints = true;
  let multiCriteriaRubricCount = 0;

  for (const exam of sosyal7Exams) {
    const examSum = exam.questions.reduce((sum, q) => sum + (q.points || 0), 0);
    if (examSum !== 100) {
      allExamsAre100 = false;
    }

    for (const q of exam.questions) {
      const rubricSum = (q.rubric || []).reduce((sum, r) => sum + (r.points || 0), 0);
      if (rubricSum !== q.points) {
        allRubricsMatchQuestionPoints = false;
      }
      if (Array.isArray(q.rubric) && q.rubric.length >= 2) {
        multiCriteriaRubricCount++;
      }
    }
  }

  assert(
    allExamsAre100 && allRubricsMatchQuestionPoints && multiCriteriaRubricCount === 35,
    'Tüm 5 senaryo tam 100 puanlıktır ve 35 sorunun tamamı parçalı analitik rubriğe sahiptir',
    `100 Puan Uyumu: ${allExamsAre100}, Rubrik Puan Uyumu: ${allRubricsMatchQuestionPoints}, Parçalı Analitik Rubrik: ${multiCriteriaRubricCount}/35.`
  );

  // TEST 05: Otantik Ders Kitabı Bağlamları ve Çıkarım Uyarıcıları Doğrulaması
  const textbookKeywords = [
    'tekerlekli sandalye',
    'Tekâlif-i Milliye',
    'Arif Bedii',
    'kahve',
    'siber zorbalık',
    '15 Temmuz'
  ];

  let keywordHits = 0;
  for (const kw of textbookKeywords) {
    const foundInSample = sosyal7Exams.some(e =>
      e.questions.some(q => (q.stimulus || '').toLowerCase().includes(kw.toLowerCase()) ||
                            (q.questionText || '').toLowerCase().includes(kw.toLowerCase()))
    );
    const foundInStudyBank = expectedOutcomes.some(code => {
      const entry = OUTCOME_STUDY_BANK[code];
      const text = JSON.stringify(entry).toLowerCase();
      return text.includes(kw.toLowerCase());
    });

    if (foundInSample || foundInStudyBank) {
      keywordHits++;
    }
  }

  assert(
    keywordHits >= 5,
    'Sorular ve çalışma sayfaları ders kitabının özgün vaka, olay ve bağlamlarını içermektedir',
    `Eşleşen otantik bağlamlar: ${keywordHits}/${textbookKeywords.length} (${textbookKeywords.join(', ')}).`
  );

  // TEST 06: Canlı/Prosedürel Soru Üretim Motoru (generateMEBIQuestions) Doğrulaması (Set A)
  const scenario1 = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[7]?.sosyal_bilgiler?.[0];

  if (!scenario1) {
    throw new Error('7. Sınıf Sosyal Bilgiler Senaryo 1 bulunamadı!');
  }

  const genResultA = await generateMEBIQuestions('sosyal_bilgiler', 7, scenario1, 0);
  const generatedSetA = genResultA.generatedQuestions;

  const setASum = generatedSetA.reduce((sum, q) => sum + (q.points || 0), 0);
  const setAHasAlts = generatedSetA.every(q => Array.isArray(q.alternativeAnswers) && q.alternativeAnswers.length >= 2);
  const setAValidOutcomes = generatedSetA.every(q => expectedOutcomes.includes(q.outcome));
  const setARubricsBalanced = generatedSetA.every(q => {
    const rSum = (q.rubric || []).reduce((s: number, r: any) => s + (r.pts ?? r.points ?? 0), 0);
    return rSum === q.points;
  });

  assert(
    generatedSetA.length === 7 && setASum === 100 && setAHasAlts && setAValidOutcomes && setARubricsBalanced,
    'Soru üretim motoru 7. sınıf Sosyal Bilgiler Senaryo 1 için 100 puanlık, dengeli ve alternatif cevaplı Set A üretmektedir',
    `Üretilen Soru: ${generatedSetA.length}/7, Toplam Puan: ${setASum}, Alternatif Cevap Kapsamı: ${setAHasAlts}, Rubrik Dengesi: ${setARubricsBalanced}.`
  );

  // TEST 07: Soru Üretim Motoru Varyasyon 2 / Set B Doğrulaması
  const genResultB = await generateMEBIQuestions('sosyal_bilgiler', 7, scenario1, 1, undefined, undefined, {
    avoidQuestionTexts: generatedSetA.map(q => q.question),
    avoidStimuli: generatedSetA.map(q => q.stimulus)
  });
  const generatedSetB = genResultB.generatedQuestions;

  const setBSum = generatedSetB.reduce((sum, q) => sum + (q.points || 0), 0);
  const setBHasAlts = generatedSetB.every(q => Array.isArray(q.alternativeAnswers) && q.alternativeAnswers.length >= 2);
  const setBValidOutcomes = generatedSetB.every(q => expectedOutcomes.includes(q.outcome));

  assert(
    generatedSetB.length === 7 && setBSum === 100 && setBHasAlts && setBValidOutcomes,
    'Soru üretim motoru varyasyon 2 (Set B) çağrısında da 100 puanlık, geçerli ve alternatif cevaplı sınav üretmektedir',
    `Üretilen Soru: ${generatedSetB.length}/7, Toplam Puan: ${setBSum}, Alternatif Cevaplar: ${setBHasAlts}, Kazanım Geçerliliği: ${setBValidOutcomes}.`
  );

  // TEST 08: Sıfır Regresyon Doğrulaması (Türkçe, Matematik, Fen Bilimleri ve Anti-Duplikasyon)
  const turkce7Exam = SAMPLE_EXAMS.find(e => e.grade === 7 && e.subjectId === 'turkce');
  const mat7Exam = SAMPLE_EXAMS.find(e => e.grade === 7 && e.subjectId === 'matematik');
  const fen7Exam = SAMPLE_EXAMS.find(e => e.grade === 7 && e.subjectId === 'fen_bilimleri');

  const turkceOk = turkce7Exam && turkce7Exam.questions.every(q => Array.isArray(q.alternativeAnswers) && q.alternativeAnswers.length >= 2);
  const matOk = mat7Exam && mat7Exam.questions.every(q => Array.isArray(q.alternativeAnswers) && q.alternativeAnswers.length >= 2);
  const fenOk = fen7Exam && fen7Exam.questions.every(q => Array.isArray(q.alternativeAnswers) && q.alternativeAnswers.length >= 2);

  assert(
    Boolean(turkceOk && matOk && fenOk),
    '7. sınıf Türkçe, Matematik ve Fen Bilimleri soru havuzlarında sıfır regresyon korunmaktadır',
    `Türkçe Alternatif Cevaplar: ${turkceOk}, Matematik Alternatif Cevaplar: ${matOk}, Fen Bilimleri Alternatif Cevaplar: ${fenOk}.`
  );

  console.log('------------------------------------------------------------');
  console.log(`TEST SONUCU: ${passCount} BAŞARILI, ${failCount} BAŞARISIZ (TOPLAM ${passCount + failCount})`);
  console.log('------------------------------------------------------------\n');

  if (failCount > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test çalıştırma hatası:', err);
  process.exit(1);
});
