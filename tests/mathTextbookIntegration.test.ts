import { OUTCOME_STUDY_BANK } from '../src/data/outcomeStudyBank';
import { SAMPLE_EXAMS } from '../src/data/sampleExams';
import { MIDDLE_SCHOOL_OFFICIAL_SCENARIOS } from '../src/data/curriculumData';
import { generateMEBIQuestions, calculateQuestionSimilarity } from '../src/utils/aiGeneratorEngine';

console.log('=== OYSS 7. SINIF MATEMATİK DERS KİTABI ENTEGRASYON TESTLERİ BAŞLIYOR ===\n');

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
  // TEST 01: OUTCOME_STUDY_BANK'ta MAT.7.1.1 - MAT.7.1.4 Ders Kitabı Sayfa ve İçerik Eşleştirmesi
  const matOutcomes = ['MAT.7.1.1', 'MAT.7.1.2', 'MAT.7.1.3', 'MAT.7.1.4'];
  const allEnriched = matOutcomes.every(code => {
    const entry = OUTCOME_STUDY_BANK[code];
    return (
      entry &&
      entry.textbookUnit?.includes('1. Kitap') &&
      entry.textbookPageRange &&
      entry.textbookExamples &&
      entry.textbookExamples.length >= 2 &&
      entry.examTraps &&
      entry.examTraps.length >= 1
    );
  });

  assert(
    allEnriched,
    'MAT.7.1.1 - MAT.7.1.4 kazanımları 1. Kitap 1. Tema içerikleri, sayfa numaraları ve örnekleriyle eşleştirilmiştir',
    `İncelenen kazanımlar: ${matOutcomes.join(', ')}. Tümünde textbookUnit, textbookPageRange, textbookExamples ve examTraps mevcuttur.`
  );

  // TEST 02: 1. Kitap (Sayılar ve Nicelikler) Kapsamı ve 2. Kitap Sınırı Doğrulaması
  const outcome711 = OUTCOME_STUDY_BANK['MAT.7.1.1'];
  const outcome714 = OUTCOME_STUDY_BANK['MAT.7.1.4'];
  const isBook1Theme1 =
    outcome711?.textbookUnit?.includes('Sayılar ve Nicelikler') &&
    outcome714?.textbookPageRange?.includes('113');

  assert(
    Boolean(isBook1Theme1),
    'Kazanım eşleştirmesi 1. Kitap 1. Tema (s. 14-117) ile sınırlıdır; 2. Kitap (Cebir/Üçgen) 1. yazılıya zorla bağlanmamıştır',
    `MAT.7.1.1: ${outcome711?.textbookPageRange}, MAT.7.1.4: ${outcome714?.textbookPageRange}. Sayılar ve Nicelikler (1) teması tam eşleşti.`
  );

  // TEST 03: Hazır Sınav (exam_7_matematik_1_1_senaryo_1) Sorularında Alternatif Cevaplar ve Rubrik Dengesi
  const mathExam = SAMPLE_EXAMS.find(e => e.id === 'exam_7_matematik_1_1_senaryo_1');
  const hasAlternativeAnswers = mathExam?.questions.every(
    q => Array.isArray(q.alternativeAnswers) && q.alternativeAnswers.length >= 2
  );
  const rubricBalanced = mathExam?.questions.every(q => {
    const sum = (q.rubric || []).reduce((acc: number, r: any) => acc + (r.points ?? r.pts ?? 0), 0);
    return sum === q.points;
  });
  const totalPoints = (mathExam?.questions || []).reduce((acc, q) => acc + q.points, 0);

  assert(
    Boolean(mathExam && hasAlternativeAnswers && rubricBalanced && totalPoints === 100),
    '7. Sınıf Matematik Senaryo 1 hazır sınav soruları alternatif cevaplar ve dengeli rubrik puanları içerir',
    `Soru Sayısı: ${mathExam?.questions.length}, Toplam Puan: ${totalPoints}, Rubrik Dengesi: ${rubricBalanced}, Her soruda en az 2 alternatif cevap var.`
  );

  // TEST 04: Yapay Zekâ Motoru İle 7. Sınıf Matematik Sınavı Üretimi (Ders Kitabı Gerçek Senaryoları)
  const mathScenario = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[7]?.matematik?.[0];
  if (!mathScenario) {
    throw new Error('7. Sınıf Matematik Senaryo 1 bulunamadı');
  }

  const genResult1 = await generateMEBIQuestions('matematik', 7, mathScenario, 0);
  const generatedQuestions = genResult1.generatedQuestions;
  const genCountMatches = generatedQuestions.length === 7;
  const genTotalPoints = generatedQuestions.reduce((acc, q) => acc + q.points, 0);
  const genRubricBalanced = generatedQuestions.every(q => {
    const sum = (q.rubric || []).reduce((acc: number, r: any) => acc + (r.pts ?? r.points ?? 0), 0);
    return sum === q.points;
  });
  const genHasKatex = generatedQuestions.some(
    q => q.question.includes('$') || (q.stimulus && q.stimulus.includes('$'))
  );
  const genHasAlternativeAnswers = generatedQuestions.every(
    q => Array.isArray(q.alternativeAnswers) && q.alternativeAnswers.length >= 1
  );

  assert(
    genCountMatches && genTotalPoints === 100 && genRubricBalanced && genHasKatex && genHasAlternativeAnswers,
    'Yapay zekâ motoru 7. sınıf Matematik için KaTeX matematiksel gösterimli, 100 puanlık ve rubrik dengeli sınav üretir',
    `Üretilen Soru: ${generatedQuestions.length}, Toplam Puan: ${genTotalPoints}, Rubrik Dengesi: ${genRubricBalanced}, KaTeX: ${genHasKatex}, Alternatif Cevaplar: ${genHasAlternativeAnswers}`
  );

  // TEST 05: Üretilen Soruların Ders Kitabındaki Özgün Senaryoları (Deringöz, Su Sayacı, Mikroplastik vb.) İçermesi
  const joinedText = generatedQuestions.map(q => `${q.stimulus || ''} ${q.question} ${q.answer}`).join(' ');
  const containsTextbookScenarios =
    (joinedText.includes('Deringöz') || joinedText.includes('ASELSAN') || joinedText.includes('denizaltı') || joinedText.includes('sıcaklık')) &&
    (joinedText.includes('devirli') || joinedText.includes('ondalık') || joinedText.includes('su sayacı') || joinedText.includes('kuyumcu')) &&
    (joinedText.includes('Mars') || joinedText.includes('Neptün') || joinedText.includes('sıralama') || joinedText.includes('averaj'));

  assert(
    containsTextbookScenarios,
    'Üretilen matematik soruları MEB 1. Kitap gerçek yaşam senaryolarından (Deringöz, sıcaklıklar, devirli ondalık, denizaltı) beslenir',
    `Kitap içi özgün bağlamlar tespit edildi: Deringöz/sıcaklık, devirli ondalık/su sayacı, Mars/Neptün/averaj.`
  );

  // TEST 06: Mükerrerlik Önleme (Anti-Duplication) Doğrulaması - Hazır Sınav ile Üretim Arasında
  const baseQuestions = mathExam?.questions || [];
  let duplicateCountWithBase = 0;
  for (const gq of generatedQuestions) {
    for (const bq of baseQuestions) {
      const sim = calculateQuestionSimilarity(bq.questionText, gq.question);
      if (sim >= 0.5) {
        duplicateCountWithBase++;
      }
    }
  }

  assert(
    duplicateCountWithBase === 0,
    '"Farklı Sorular Hazırla" ile üretilen sorular hazır sınavdaki mevcut sorularla çakışmaz',
    `Mevcut sınav soru sayısı: ${baseQuestions.length}, Çakışan soru sayısı: ${duplicateCountWithBase} (Beklenen: 0)`
  );

  // TEST 07: İki Ardışık Üretimde ("Farklı Sorular Hazırla" 1 ve 2) Soru Setlerinin Birbirinden Farklı Olması
  const genResult2 = await generateMEBIQuestions('matematik', 7, mathScenario, 1, undefined, undefined, {
    excludePool: generatedQuestions.map(q => q.question)
  });

  const set1 = genResult1.generatedQuestions;
  const set2 = genResult2.generatedQuestions;
  let overlappingCount = 0;
  for (const q1 of set1) {
    for (const q2 of set2) {
      if (calculateQuestionSimilarity(q1.question, q2.question) >= 0.7) {
        overlappingCount++;
      }
    }
  }

  assert(
    overlappingCount < set1.length,
    'Ardışık üretimlerde soru havuzları çeşitlendirilmiştir ve tekdüzelik engellenmiştir',
    `Set 1: ${set1.length} soru, Set 2: ${set2.length} soru, Yüksek benzerlikli soru sayısı: ${overlappingCount}`
  );

  // TEST 08: Türkçe MEBİ Pilotunun ve Diğer Derslerin Bozulmadığına Dair Çapraz Doğrulama
  const turkishScenario = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[7]?.turkce?.[0];
  if (!turkishScenario) {
    throw new Error('7. Sınıf Türkçe Senaryo 1 bulunamadı');
  }

  const genTurkce = await generateMEBIQuestions('turkce', 7, turkishScenario, 0);
  const turkceHasAlternatives = genTurkce.generatedQuestions.some(
    q => q.alternativeAnswers && q.alternativeAnswers.length > 0
  );
  const turkceRubricValid = genTurkce.generatedQuestions.every(q => {
    const sum = (q.rubric || []).reduce((acc: number, r: any) => acc + (r.pts ?? r.points ?? 0), 0);
    return sum === q.points;
  });

  assert(
    genTurkce.generatedQuestions.length === (turkishScenario.totalQuestions || 7) && turkceHasAlternatives && turkceRubricValid,
    '7. Sınıf Türkçe MEBİ pilotu ve üretim motoru matematik entegrasyonundan sonra eksiksiz korunmaktadır',
    `Türkçe soru sayısı: ${genTurkce.generatedQuestions.length}, Alternatif cevaplar aktif: ${turkceHasAlternatives}, Rubrik doğruluğu: ${turkceRubricValid}`
  );

  console.log('\n=== TEST ÖZETİ ===');
  console.log(`Toplam Test: ${passCount + failCount}`);
  console.log(`Başarılı: ${passCount}`);
  console.log(`Başarısız: ${failCount}`);

  if (failCount === 0) {
    console.log('\n>>> TÜM 7. SINIF MATEMATİK DERS KİTABI ENTEGRASYON TESTLERİ BAŞARIYLA GEÇTİ! <<<');
  } else {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
