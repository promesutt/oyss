import { OUTCOME_STUDY_BANK } from '../src/data/outcomeStudyBank';
import { SAMPLE_EXAMS } from '../src/data/sampleExams';
import { MIDDLE_SCHOOL_OFFICIAL_SCENARIOS } from '../src/data/curriculumData';
import { generateMEBIQuestions } from '../src/utils/aiGeneratorEngine';

console.log('=== OYSS 7. SINIF TÜRKÇE DERS KİTABI ENTEGRASYON TESTLERİ BAŞLIYOR ===\n');

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
  // TEST 01: OUTCOME_STUDY_BANK'ta 7. Sınıf Türkçe Öğrenme Çıktılarının Eksiksiz Kitap Eşleştirmesi
  const expectedOutcomes = [
    'T.O.7.4',
    'T.O.7.5',
    'T.O.7.7',
    'T.O.7.8',
    'T.O.7.14',
    'T.O.7.15',
    'T.O.7.21',
    'T.Y.7.3',
    'T.Y.7.18',
    'T.Y.7.21'
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
    '7. sınıf Türkçe öğrenme çıktılarının (10 adet) tamamı ders kitabı ünite, sayfa ve örnekleriyle eşleştirilmiştir',
    `İncelenen kazanımlar: ${expectedOutcomes.join(', ')}. Her birinde textbookUnit, textbookPageRange, textbookExamples (en az 2) ve examTraps mevcuttur.`
  );

  // TEST 02: 1. Kitap ve 2. Kitap Temalarının Gerçek PDF Verileriyle Doğrulanması
  const book1Covered = expectedOutcomes.every(code => {
    const entry = OUTCOME_STUDY_BANK[code];
    return entry?.textbookUnit?.includes('1. Kitap');
  });

  const book2Covered = expectedOutcomes.every(code => {
    const entry = OUTCOME_STUDY_BANK[code];
    return entry?.textbookUnit?.includes('2. Kitap');
  });

  const verifiedThemes = [
    'Hayat Boyu Gelişim',
    'Bir Hilal Uğruna',
    'Türk Sanatı',
    'Okuma Kültürü',
    'Hak ve Sorumluluklar'
  ];

  const allThemesPresent = verifiedThemes.every(theme => {
    return expectedOutcomes.some(code => OUTCOME_STUDY_BANK[code]?.textbookUnit?.includes(theme));
  });

  assert(
    book1Covered && book2Covered && allThemesPresent,
    '1. Kitap (Temalar 1-3) ve 2. Kitap (Temalar 4-6) temaları ve metin bağlamları eksiksiz kapsanmıştır',
    `1. Kitap Eşleşmeleri: ${book1Covered}, 2. Kitap Eşleşmeleri: ${book2Covered}. Doğrulanan temalar: ${verifiedThemes.join(', ')}.`
  );

  // TEST 03: Hazır Sınavlarda (SAMPLE_EXAMS) 7. Sınıf Türkçe Sorularında Alternatif Cevaplar (39 Soru)
  const turkce7Exams = SAMPLE_EXAMS.filter(e => e.grade === 7 && e.subjectId === 'turkce');
  let totalTurkceQuestions = 0;
  let questionsWithAtLeastTwoAlts = 0;

  for (const exam of turkce7Exams) {
    for (const q of exam.questions) {
      totalTurkceQuestions++;
      if (Array.isArray(q.alternativeAnswers) && q.alternativeAnswers.length >= 2) {
        questionsWithAtLeastTwoAlts++;
      }
    }
  }

  assert(
    turkce7Exams.length === 6 && totalTurkceQuestions === 39 && questionsWithAtLeastTwoAlts === 39,
    '7. Sınıf Türkçe Senaryo 1-6 arasındaki 39 sorunun tamamında en az 2 kabul edilebilir alternatif cevap tanımlanmıştır',
    `Sınav Sayısı: ${turkce7Exams.length}, Toplam Soru: ${totalTurkceQuestions}, En Az 2 Alternatif Cevap İçeren Soru: ${questionsWithAtLeastTwoAlts}/39.`
  );

  // TEST 04: Toplam Puan (100 Puan) ve Analitik Rubriklerin Puan Dengesi
  let all100Points = true;
  let allRubricsBalanced = true;

  for (const exam of turkce7Exams) {
    const examSum = exam.questions.reduce((acc, q) => acc + q.points, 0);
    if (examSum !== 100) {
      all100Points = false;
    }
    for (const q of exam.questions) {
      const rubricSum = (q.rubric || []).reduce((acc: number, r: any) => acc + (r.points ?? r.pts ?? 0), 0);
      if (rubricSum !== q.points) {
        allRubricsBalanced = false;
      }
    }
  }

  assert(
    all100Points && allRubricsBalanced,
    'Tüm 7. sınıf Türkçe hazır sınavlarında toplam puan 100 ve analitik rubrikler soru puanlarıyla dengelidir',
    `6 senaryonun tamamında toplam puan: 100. 39 sorunun tamamında parçalı rubrik toplamı soru puanına tam eşittir.`
  );

  // TEST 05: MEBİ Pilot Özgün Sorularının (Senaryo 1 Soru 1-4) Eksiksiz Korunması
  const senaryo1 = turkce7Exams.find(e => e.scenarioId === 'senaryo_1');
  const q1 = senaryo1?.questions.find(q => q.questionNumber === 1);
  const q2 = senaryo1?.questions.find(q => q.questionNumber === 2);
  const q3 = senaryo1?.questions.find(q => q.questionNumber === 3);
  const q4 = senaryo1?.questions.find(q => q.questionNumber === 4);

  const mebiPilotIntact =
    (q1?.stimulus?.includes('Kastamonu') || q1?.stimulus?.includes('kağnı')) &&
    q1?.outcomeCode === 'T.O.7.4' &&
    q2?.stimulus?.includes('Şerife Bacı') &&
    q2?.outcomeCode === 'T.O.7.5' &&
    q3?.stimulus?.includes('Şerife Bacı') &&
    q3?.outcomeCode === 'T.O.7.8' &&
    q4?.outcomeCode === 'T.O.7.21';

  assert(
    Boolean(mebiPilotIntact),
    'Önceki aşamada doğrulanmış MEBİ pilot özgün soruları (Senaryo 1 Soru 1-4) eksiksiz korunmuştur',
    `Q1 (Şerife Bacı Kağnı/T.O.7.4): Korundu, Q2 (Konu Tespiti/T.O.7.5): Korundu, Q3 (Örtük Anlam/T.O.7.8): Korundu, Q4 (Söz Varlığı/T.O.7.21): Korundu.`
  );

  // TEST 06: Yapay Zekâ Motoru İle 7. Sınıf Türkçe Sınavı Üretimi ve Alternatif Cevap Desteği
  const turkceScenario = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[7]?.turkce?.[0];
  if (!turkceScenario) {
    throw new Error('7. Sınıf Türkçe Senaryo 1 bulunamadı');
  }

  const genResult = await generateMEBIQuestions('turkce', 7, turkceScenario, 0);
  const generatedQuestions = genResult.generatedQuestions;
  const genCountMatches = generatedQuestions.length === 7;
  const genTotalPoints = generatedQuestions.reduce((acc, q) => acc + q.points, 0);
  const genRubricBalanced = generatedQuestions.every(q => {
    const sum = (q.rubric || []).reduce((acc: number, r: any) => acc + (r.pts ?? r.points ?? 0), 0);
    return sum === q.points;
  });
  const genHasAlternativeAnswers = generatedQuestions.every(
    q => Array.isArray(q.alternativeAnswers) && q.alternativeAnswers.length >= 2
  );

  assert(
    genCountMatches && genTotalPoints === 100 && genRubricBalanced && genHasAlternativeAnswers,
    'Yapay zekâ motoru 7. sınıf Türkçe için 100 puanlık, dengeli analitik rubrikli ve alternatif cevaplı sınav üretir',
    `Üretilen Soru Sayısı: ${generatedQuestions.length}, Toplam Puan: ${genTotalPoints}, Rubrik Dengesi: ${genRubricBalanced}, Her Soruda >= 2 Alternatif Cevap: ${genHasAlternativeAnswers}`
  );

  // TEST 07: Yapay Zekâ Motoru 7. Sınıf Türkçe İkinci Varyasyon (Set B) Tutarlılığı
  const genResultVar2 = await generateMEBIQuestions('turkce', 7, turkceScenario, 1);
  const gen2Questions = genResultVar2.generatedQuestions;
  const gen2CountMatches = gen2Questions.length === 7;
  const gen2TotalPoints = gen2Questions.reduce((acc, q) => acc + q.points, 0);
  const gen2RubricBalanced = gen2Questions.every(q => {
    const sum = (q.rubric || []).reduce((acc: number, r: any) => acc + (r.pts ?? r.points ?? 0), 0);
    return sum === q.points;
  });
  const gen2HasAlternativeAnswers = gen2Questions.every(
    q => Array.isArray(q.alternativeAnswers) && q.alternativeAnswers.length >= 2
  );

  assert(
    gen2CountMatches && gen2TotalPoints === 100 && gen2RubricBalanced && gen2HasAlternativeAnswers,
    'Yapay zekâ motoru 7. sınıf Türkçe 2. varyasyonda da eksiksiz ve alternatif cevaplı sınav üretir',
    `Varyasyon 2 Soru Sayısı: ${gen2Questions.length}, Toplam Puan: ${gen2TotalPoints}, Rubrik Dengesi: ${gen2RubricBalanced}, Alternatif Cevaplar: ${gen2HasAlternativeAnswers}`
  );

  // TEST 08: Metin Türü Çeşitliliği ve Bağlamsal Edebi Standart
  const allContexts = turkce7Exams.flatMap(e => e.questions.map(q => q.stimulus || ''));
  const hasNarrative = allContexts.some(s => s.includes('fırıncı') || s.includes('Eskici') || s.includes('çınar'));
  const hasExpository = allContexts.some(s => s.includes('Mimar Sinan') || s.includes('matbaa') || s.includes('Gutenberg'));
  const hasCulturalBiography = allContexts.some(s => s.includes('Neşet Ertaş') || s.includes('türkü'));

  assert(
    hasNarrative && hasExpository && hasCulturalBiography,
    '7. Sınıf Türkçe sınav metinleri öyküleyici, bilgilendirici ve kültürel biyografik metin türlerini dengeli içerir',
    `Öyküleyici (Hikâye/Anlatı): ${hasNarrative}, Bilgilendirici (Tarih/Yayıncılık): ${hasExpository}, Kültürel Biyografi (Halk Müziği/Sanat): ${hasCulturalBiography}.`
  );

  console.log('====================================================');
  console.log(`TOPLAM TEST: ${passCount + failCount}`);
  console.log(`BAŞARILI   : ${passCount}`);
  console.log(`BAŞARISIZ  : ${failCount}`);
  console.log('====================================================\n');

  if (failCount > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test çalışma hatası:', err);
  process.exit(1);
});
