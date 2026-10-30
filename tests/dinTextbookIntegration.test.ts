import { OUTCOME_STUDY_BANK } from '../src/data/outcomeStudyBank';
import { SAMPLE_EXAMS } from '../src/data/sampleExams';
import { MIDDLE_SCHOOL_OFFICIAL_SCENARIOS } from '../src/data/curriculumData';
import { generateMEBIQuestions } from '../src/utils/aiGeneratorEngine';

console.log('=== OYSS 7. SINIF DİN KÜLTÜRÜ VE AHLAK BİLGİSİ DERS KİTABI ENTEGRASYON TESTLERİ BAŞLIYOR ===\n');

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
  // TEST 01: OUTCOME_STUDY_BANK'ta 7. Sınıf Din Kültürü Öğrenme Çıktılarının Eksiksiz Kitap Eşleştirmesi
  const expectedOutcomes = [
    'DKAB.7.1.1',
    'DKAB.7.1.2',
    'DKAB.7.1.3',
    'DKAB.7.1.4',
    'DKAB.7.2.1'
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
    '7. sınıf Din Kültürü öğrenme çıktılarının (5 adet) tamamı ders kitabı ünite, sayfa ve örnekleriyle eşleştirilmiştir',
    `İncelenen kazanımlar: ${expectedOutcomes.join(', ')}. Her birinde textbookUnit, textbookPageRange, textbookExamples (en az 2) ve examTraps mevcuttur.`
  );

  // TEST 02: 1. Ünite (Melek ve Ahiret İnancı), 2. Ünite (Hac ve Umre) ve Nâs Suresi Başlık Düzeltmesi
  const unit1Covered = OUTCOME_STUDY_BANK['DKAB.7.1.1']?.textbookUnit?.includes('Melek ve Ahiret') &&
                       OUTCOME_STUDY_BANK['DKAB.7.1.2']?.textbookUnit?.includes('Melek ve Ahiret') &&
                       OUTCOME_STUDY_BANK['DKAB.7.1.3']?.textbookUnit?.includes('Melek ve Ahiret') &&
                       OUTCOME_STUDY_BANK['DKAB.7.1.4']?.textbookUnit?.includes('Melek ve Ahiret');

  const unit2Covered = OUTCOME_STUDY_BANK['DKAB.7.2.1']?.textbookUnit?.includes('Hac');

  const nasSureTitleFixed = Boolean(OUTCOME_STUDY_BANK['DKAB.7.1.4']?.topicTitle?.includes('Bir Sure Öğreniyorum: Nâs Suresi'));

  const verifiedConcepts = [
    'Cebrail',
    'Mikail',
    'İsrafil',
    'Azrail',
    'Kirâmen Kâtibîn',
    'Münker ve Nekir',
    'Hafaza',
    "Ba's",
    'Mizan',
    'Nâs Suresi',
    'İhram'
  ];

  const allConceptsPresent = verifiedConcepts.every(term => {
    return expectedOutcomes.some(code => {
      const entry = OUTCOME_STUDY_BANK[code];
      const str = JSON.stringify(entry).toLowerCase();
      return str.includes(term.toLowerCase());
    });
  });

  assert(
    Boolean(unit1Covered && unit2Covered && nasSureTitleFixed && allConceptsPresent),
    '1. ve 2. Ünite otantik kavramları doğrulanmış, DKAB.7.1.4 başlığı "Bir Sure Öğreniyorum: Nâs Suresi" olarak tescillenmiştir',
    `Melek ve Ahiret: ${unit1Covered}, Hac: ${unit2Covered}, Nâs Suresi Başlığı Doğru: ${nasSureTitleFixed}. Otantik kavramlar: ${verifiedConcepts.join(', ')}.`
  );

  // TEST 03: Hazır Sınavlarda (SAMPLE_EXAMS) 7. Sınıf Din Kültürü Sorularında Alternatif Cevaplar (33 Soru)
  const din7Exams = SAMPLE_EXAMS.filter(e => e.grade === 7 && e.subjectId === 'din_kulturu');
  let totalDinQuestions = 0;
  let questionsWithAtLeastTwoAlts = 0;

  for (const exam of din7Exams) {
    for (const q of exam.questions) {
      totalDinQuestions++;
      if (Array.isArray(q.alternativeAnswers) && q.alternativeAnswers.length >= 2) {
        questionsWithAtLeastTwoAlts++;
      }
    }
  }

  assert(
    totalDinQuestions === 33 && questionsWithAtLeastTwoAlts === 33,
    '7. sınıf Din Kültürü 5 senaryosundaki tüm 33 soruda en az 2 adet kabul edilebilir alternatif cevap tanımlanmıştır',
    `Toplam Soru Sayısı: ${totalDinQuestions}/33, En Az 2 Alternatif Cevabı Olan Soru Sayısı: ${questionsWithAtLeastTwoAlts}/33 (%100 kapsama).`
  );

  // TEST 04: Puanlama ve Rubrik Doğrulaması (Her Senaryo 100 Puan ve Parçalı Analitik Rubrik)
  let allExamsAre100 = true;
  let allRubricsMatchQuestionPoints = true;
  let multiCriteriaRubricCount = 0;

  for (const exam of din7Exams) {
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
    allExamsAre100 && allRubricsMatchQuestionPoints && multiCriteriaRubricCount === 33,
    '5 senaryonun tamamı 100 tam puandır ve 33 sorunun tümü parçalı analitik rubriğe sahiptir',
    `Senaryo 100 Puan Kontrolü: ${allExamsAre100}, Rubrik Kriter Toplamı = Soru Puanı: ${allRubricsMatchQuestionPoints}, Çok Ölçütlü Rubrik Sayısı: ${multiCriteriaRubricCount}/33.`
  );

  // TEST 05: Ayet ve Hadis Güvenliği ve Ders Kitabı Metin Uyumu
  const verifiedCitations = [
    'Zümer',
    'Yâsîn',
    'Zilzâl',
    'Nâs',
    'Hafaza',
    'Mizan',
    'İhram',
    'Safa',
    'Merve'
  ];

  let citationHits = 0;
  for (const cit of verifiedCitations) {
    const foundInSample = din7Exams.some(e =>
      e.questions.some(q => (q.stimulus || '').toLowerCase().includes(cit.toLowerCase()) ||
                            (q.questionText || '').toLowerCase().includes(cit.toLowerCase()))
    );
    const foundInStudyBank = expectedOutcomes.some(code => {
      const entry = OUTCOME_STUDY_BANK[code];
      const text = JSON.stringify(entry).toLowerCase();
      return text.includes(cit.toLowerCase());
    });

    if (foundInSample || foundInStudyBank) {
      citationHits++;
    }
  }

  assert(
    citationHits >= 7,
    'Sorular ve çalışma bankası MEB ders kitabındaki doğrulanmış ayet mealleri ve otantik kavramları içermektedir',
    `Eşleşen doğrulanmış kaynak ve kavramlar: ${citationHits}/${verifiedCitations.length} (${verifiedCitations.join(', ')}).`
  );

  // TEST 06: Soru Üretim Motoru (generateMEBIQuestions) Set A Doğrulaması
  const scenario1 = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[7]?.din_kulturu?.[0];

  if (!scenario1) {
    throw new Error('7. Sınıf Din Kültürü Senaryo 1 bulunamadı!');
  }

  const genResultA = await generateMEBIQuestions('din_kulturu', 7, scenario1, 0);
  const generatedSetA = genResultA.generatedQuestions;

  const setASum = generatedSetA.reduce((sum, q) => sum + (q.points || 0), 0);
  const setAHasAlts = generatedSetA.every(q => Array.isArray(q.alternativeAnswers) && q.alternativeAnswers.length >= 2);
  const setAValidOutcomes = generatedSetA.every(q => expectedOutcomes.includes(q.outcome));
  const setARubricsBalanced = generatedSetA.every(q => {
    const rSum = (q.rubric || []).reduce((s: number, r: any) => s + (r.pts ?? r.points ?? 0), 0);
    return rSum === q.points;
  });

  assert(
    generatedSetA.length === 8 && setASum === 100 && setAHasAlts && setAValidOutcomes && setARubricsBalanced,
    'Soru üretim motoru 7. sınıf Din Kültürü Senaryo 1 için 100 puanlık, dengeli ve alternatif cevaplı Set A üretmektedir',
    `Üretilen Soru: ${generatedSetA.length}/8, Toplam Puan: ${setASum}, Alternatif Cevap Kapsamı: ${setAHasAlts}, Rubrik Dengesi: ${setARubricsBalanced}.`
  );

  // TEST 07: Soru Üretim Motoru Varyasyon 2 / Set B Doğrulaması ve Sıfır Mükerrerlik
  const genResultB = await generateMEBIQuestions('din_kulturu', 7, scenario1, 1, undefined, undefined, {
    avoidQuestionTexts: generatedSetA.map(q => q.question),
    avoidStimuli: generatedSetA.map(q => q.stimulus)
  });
  const generatedSetB = genResultB.generatedQuestions;

  const setBSum = generatedSetB.reduce((sum, q) => sum + (q.points || 0), 0);
  const setBHasAlts = generatedSetB.every(q => Array.isArray(q.alternativeAnswers) && q.alternativeAnswers.length >= 2);
  const setBValidOutcomes = generatedSetB.every(q => expectedOutcomes.includes(q.outcome));
  const setBRubricsBalanced = generatedSetB.every(q => {
    const rSum = (q.rubric || []).reduce((s: number, r: any) => s + (r.pts ?? r.points ?? 0), 0);
    return rSum === q.points;
  });

  // Sıfır mükerrerlik kontrolü: Set A ve Set B arasında birebir aynı soru kökü olmamalıdır
  const duplicateCount = generatedSetB.filter(qb =>
    generatedSetA.some(qa => qa.question.trim().toLowerCase() === qb.question.trim().toLowerCase())
  ).length;

  assert(
    generatedSetB.length === 8 && setBSum === 100 && setBHasAlts && setBValidOutcomes && setBRubricsBalanced && duplicateCount === 0,
    'Soru üretim motoru Set B üretiminde sıfır mükerrerlik ile 100 puanlık, alternatif cevaplı ve dengeli sınav seti üretmektedir',
    `Üretilen Soru: ${generatedSetB.length}/8, Toplam Puan: ${setBSum}, Alternatif Cevaplar: ${setBHasAlts}, Çakışan Mükerrer Soru Sayısı: ${duplicateCount}.`
  );

  // TEST 08: Sıfır Regresyon Doğrulaması (Türkçe, Matematik, Fen Bilimleri ve Sosyal Bilgiler)
  const turkce7Exams = SAMPLE_EXAMS.filter(e => e.grade === 7 && e.subjectId === 'turkce');
  const mat7Exam = SAMPLE_EXAMS.find(e => e.grade === 7 && e.subjectId === 'matematik');
  const fen7Exam = SAMPLE_EXAMS.find(e => e.grade === 7 && e.subjectId === 'fen_bilimleri');
  const sosyal7Exams = SAMPLE_EXAMS.filter(e => e.grade === 7 && e.subjectId === 'sosyal_bilgiler');

  const turkceOk = turkce7Exams.length >= 5 && turkce7Exams.every(e =>
    e.questions.every(q => Array.isArray(q.alternativeAnswers) && q.alternativeAnswers.length >= 2)
  );
  const sosyalOk = sosyal7Exams.length === 5 && sosyal7Exams.every(e =>
    e.questions.every(q => Array.isArray(q.alternativeAnswers) && q.alternativeAnswers.length >= 2)
  );
  const matOk = mat7Exam && mat7Exam.questions.every(q => Array.isArray(q.alternativeAnswers) && q.alternativeAnswers.length >= 2);
  const fenOk = fen7Exam && fen7Exam.questions.every(q => Array.isArray(q.alternativeAnswers) && q.alternativeAnswers.length >= 2);

  assert(
    Boolean(turkceOk && matOk && fenOk && sosyalOk),
    '7. sınıf Türkçe, Matematik, Fen Bilimleri ve Sosyal Bilgiler hazır sınavlarında sıfır regresyon korunmaktadır',
    `Türkçe (${turkce7Exams.length} senaryo): ${turkceOk}, Sosyal Bilgiler (${sosyal7Exams.length} senaryo): ${sosyalOk}, Matematik Senaryo 1: ${Boolean(matOk)}, Fen Bilimleri Senaryo 1: ${Boolean(fenOk)}.`
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
