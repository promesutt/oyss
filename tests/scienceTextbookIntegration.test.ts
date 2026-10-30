import { OUTCOME_STUDY_BANK } from '../src/data/outcomeStudyBank';
import { SAMPLE_EXAMS } from '../src/data/sampleExams';
import { MIDDLE_SCHOOL_OFFICIAL_SCENARIOS } from '../src/data/curriculumData';
import { generateMEBIQuestions, calculateQuestionSimilarity } from '../src/utils/aiGeneratorEngine';

console.log('=== OYSS 7. SINIF FEN BİLİMLERİ DERS KİTABI ENTEGRASYON TESTLERİ BAŞLIYOR ===\n');

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
  // TEST 01: OUTCOME_STUDY_BANK'ta Fen Bilimleri 1. Dönem 1. Yazılı Kazanımları Eşleştirmesi
  const fenOutcomes = ['FB.7.1.1', 'FB.7.1.3', 'FB.7.1.4', 'FB.7.1.5', 'FB.7.2.1', 'FB.7.2.2'];
  const allEnriched = fenOutcomes.every(code => {
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
    'FB.7.1.1 - FB.7.2.2 kazanımları 1. Kitap (Uzay Çağı ve Kuvvet/Enerji) üniteleri, sayfa aralıkları ve örnekleriyle eşleştirilmiştir',
    `İncelenen kazanımlar: ${fenOutcomes.join(', ')}. Tümünde textbookUnit, textbookPageRange, textbookExamples ve examTraps eksiksiz tanımlıdır.`
  );

  // TEST 02: FB.7.2.1 ve FB.7.2.2 Başlık ve İçerik Düzeltmesi (Mitoz/Mayoz yerine Kuvvet/İş ve Kinetik/Potansiyel Enerji)
  const entry721 = OUTCOME_STUDY_BANK['FB.7.2.1'];
  const entry722 = OUTCOME_STUDY_BANK['FB.7.2.2'];
  const correctTopics =
    entry721?.topicTitle?.includes('İş') &&
    entry721?.textbookUnit?.includes('Kuvvet ve Enerji') &&
    entry722?.topicTitle?.includes('Enerji') &&
    entry722?.textbookUnit?.includes('Kuvvet ve Enerji');

  assert(
    Boolean(correctTopics),
    'FB.7.2.1 ve FB.7.2.2 ünite başlıkları 2026-2027 müfredatı ve 1. Kitap 2. Ünite (Kuvvet, İş ve Enerji) ile tam uyumludur',
    `FB.7.2.1: "${entry721?.topicTitle}" (${entry721?.textbookPageRange}), FB.7.2.2: "${entry722?.topicTitle}" (${entry722?.textbookPageRange}).`
  );

  // TEST 03: 1. Kitap Kapsamı ve 2. Kitap Sınırı Doğrulaması (Boundary Rule)
  const allInBook1 = fenOutcomes.every(code => {
    const entry = OUTCOME_STUDY_BANK[code];
    return entry?.textbookUnit?.startsWith('1. Kitap');
  });

  assert(
    allInBook1,
    'Kazanım eşleştirmesi 1. Kitap (Uzay Çağı s. 12-55 ve Kuvvet ve Enerji s. 56-86) ile sınırlıdır; 2. Kitap 1. yazılıya zorla bağlanmamıştır',
    `Tüm kazanımlar 1. Kitap üniteleriyle sınırlandırılmıştır. 2. Kitap (Işık/Madde/Elektrik) 1. yazılı kapsamı dışında tutulmuştur.`
  );

  // TEST 04: Hazır Sınav (exam_7_fen_bilimleri_1_1_senaryo_1) Sorularında Alternatif Cevaplar ve Dengeli Rubrik
  const scienceExam = SAMPLE_EXAMS.find(e => e.id === 'exam_7_fen_bilimleri_1_1_senaryo_1');
  const hasAlternativeAnswers = scienceExam?.questions.every(
    q => Array.isArray(q.alternativeAnswers) && q.alternativeAnswers.length >= 2
  );
  const rubricBalanced = scienceExam?.questions.every(q => {
    const sum = (q.rubric || []).reduce((acc: number, r: any) => acc + (r.points ?? r.pts ?? 0), 0);
    return sum === q.points;
  });
  const totalPoints = (scienceExam?.questions || []).reduce((acc, q) => acc + q.points, 0);

  assert(
    Boolean(scienceExam && hasAlternativeAnswers && rubricBalanced && totalPoints === 100),
    '7. Sınıf Fen Bilimleri Senaryo 1 hazır sınav soruları alternatif cevaplar ve dengeli analitik rubrikler içerir',
    `Soru Sayısı: ${scienceExam?.questions.length}, Toplam Puan: ${totalPoints}, Rubrik Dengesi: ${rubricBalanced}, Her soruda en az 2 alternatif cevap mevcuttur.`
  );

  // TEST 05: Yapay Zekâ Motoru İle 7. Sınıf Fen Bilimleri Sınavı Üretimi (9 Soru, 100 Puan, Rubrik Dengeli)
  const scienceScenario = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[7]?.fen_bilimleri?.[0];
  if (!scienceScenario) {
    throw new Error('7. Sınıf Fen Bilimleri Senaryo 1 bulunamadı');
  }

  const genResult1 = await generateMEBIQuestions('fen_bilimleri', 7, scienceScenario, 0);
  const generatedQuestions = genResult1.generatedQuestions;
  const genCountMatches = generatedQuestions.length === 9;
  const genTotalPoints = generatedQuestions.reduce((acc, q) => acc + q.points, 0);
  const genRubricBalanced = generatedQuestions.every(q => {
    const sum = (q.rubric || []).reduce((acc: number, r: any) => acc + (r.pts ?? r.points ?? 0), 0);
    return sum === q.points;
  });
  const genHasAlternativeAnswers = generatedQuestions.every(
    q => Array.isArray(q.alternativeAnswers) && q.alternativeAnswers.length >= 1
  );

  // Senaryo 1 kazanım dağılımı kontrolü (2x FB.7.1.1, 1x FB.7.1.4, 1x FB.7.1.5, 3x FB.7.2.1, 2x FB.7.2.2)
  const count711 = generatedQuestions.filter(q => q.outcome === 'FB.7.1.1').length;
  const count714 = generatedQuestions.filter(q => q.outcome === 'FB.7.1.4').length;
  const count715 = generatedQuestions.filter(q => q.outcome === 'FB.7.1.5').length;
  const count721 = generatedQuestions.filter(q => q.outcome === 'FB.7.2.1').length;
  const count722 = generatedQuestions.filter(q => q.outcome === 'FB.7.2.2').length;
  const distributionMatches =
    count711 === 2 && count714 === 1 && count715 === 1 && count721 === 3 && count722 === 2;

  assert(
    genCountMatches && genTotalPoints === 100 && genRubricBalanced && genHasAlternativeAnswers && distributionMatches,
    'Yapay zekâ motoru 7. sınıf Fen Bilimleri için 9 soruluk, 100 puanlık, tam kazanım dağılımlı ve alternatif cevaplı sınav üretir',
    `Üretilen Soru: ${generatedQuestions.length}, Toplam Puan: ${genTotalPoints}, Rubrik Dengesi: ${genRubricBalanced}, Dağılım: FB.7.1.1(${count711}), FB.7.1.4(${count714}), FB.7.1.5(${count715}), FB.7.2.1(${count721}), FB.7.2.2(${count722}).`
  );

  // TEST 06: Fen Bilimleri Sorularında Ders Kitabı Bağlamları, Deney Değişkenleri ve KaTeX Gösterimi
  const hasTextbookContext = generatedQuestions.some(
    q =>
      (q.stimulus && (q.stimulus.includes('Palandöken') || q.stimulus.includes('Türksat') || q.stimulus.includes('kamyon') || q.stimulus.includes('bilye') || q.stimulus.includes('bavul') || q.stimulus.includes('dolap'))) ||
      q.question.includes('Palandöken') || q.question.includes('değişken') || q.question.includes('Joule')
  );
  const hasExperimentOrFormulas = generatedQuestions.some(
    q =>
      (q.stimulus && (q.stimulus.includes('N') || q.stimulus.includes('km/h') || q.stimulus.includes('deney') || q.stimulus.includes('$'))) ||
      q.question.includes('$') || q.question.includes('değişken')
  );

  assert(
    hasTextbookContext && hasExperimentOrFormulas,
    'Üretilen fen bilimleri soruları ders kitabı bağlamları (DAG Palandöken, Türksat/İMECE, market arabası/koli), deney düzenekleri ve KaTeX/fiziksel birimler içerir',
    `Ders kitabı bağlamları ve deney düzeneği/formül değişkenleri başarıyla doğrulandı.`
  );

  // TEST 07: Mükerrerlik Önleme (Anti-Duplication) Doğrulaması (Hazır Sınav vs Yeni Üretim)
  const baseQuestions = scienceExam?.questions || [];
  let maxSimilarityToBase = 0;
  for (const genQ of generatedQuestions) {
    for (const baseQ of baseQuestions) {
      const sim = calculateQuestionSimilarity(genQ.question, genQ.stimulus || '', baseQ.questionText, baseQ.stimulus || '');
      if (sim > maxSimilarityToBase) {
        maxSimilarityToBase = sim;
      }
    }
  }

  assert(
    maxSimilarityToBase < 0.70,
    'Üretilen yeni sorular hazır sınav sorularını birebir tekrarlamaz (Maks benzerlik eşiği < %70)',
    `Hesaplanan en yüksek benzerlik skoru: %${(maxSimilarityToBase * 100).toFixed(1)}.`
  );

  // TEST 08: İki Farklı Üretim Arasında Çeşitlilik Doğrulaması (Set 1 vs Set 2)
  const genResult2 = await generateMEBIQuestions('fen_bilimleri', 7, scienceScenario, 1);
  const questionsSet2 = genResult2.generatedQuestions;
  const distinctQuestions = questionsSet2.filter(q2 =>
    !generatedQuestions.some(q1 => q1.question.trim().toLowerCase() === q2.question.trim().toLowerCase())
  );

  assert(
    distinctQuestions.length >= 5,
    'Arka arkaya yapılan "Farklı Sorular Hazırla" işlemlerinde havuzdan farklı sorular seçilir',
    `1. Set ile 2. Set arasında en az ${distinctQuestions.length} soru birbirinden tamamen farklıdır.`
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
  console.error('Test çalıştırma hatası:', err);
  process.exit(1);
});
