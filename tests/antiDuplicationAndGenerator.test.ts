import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  generateMEBIQuestions,
  calculateQuestionSimilarity,
  isDuplicateOrTooSimilar
} from '../src/utils/aiGeneratorEngine';
import { MIDDLE_SCHOOL_OFFICIAL_SCENARIOS } from '../src/data/curriculumData';
import { SAMPLE_EXAMS } from '../src/data/sampleExams';

console.log('=== OYSS ANTİ-DUPLİKASYON VE AI MOTORU DOĞRULAMA TESTLERİ BAŞLIYOR ===\n');

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
// TEST 01: Benzerlik Metriği (Jaccard & Altdize Örtüşmesi)
// -----------------------------------------------------------------------------
try {
  const text1 = "Yukarıda dedenin torununa ahşap oyuncakları gösterdiği metnin konusunu bir cümleyle yazınız.";
  const text2 = "Yukarıda dedenin torununa ahşap oyuncakları gösterdiği metnin konusunu tek bir cümleyle açıklayınız.";
  const textDifferent = "Karadeniz kıyısındaki sarp kayalıkların üzerinde yükselen fenerin bekçisi Hasan Dede'nin fedakârlığını açıklayınız.";

  const simHigh = calculateQuestionSimilarity(text1, text2);
  const simLow = calculateQuestionSimilarity(text1, textDifferent);

  const isDup1 = isDuplicateOrTooSimilar(text2, undefined, [text1]);
  const isDup2 = isDuplicateOrTooSimilar(textDifferent, undefined, [text1]);

  const passed = simHigh >= 0.70 && simLow < 0.20 && isDup1 === true && isDup2 === false;

  reportTest(
    '01',
    'Benzerlik metriği: Sadece birkaç kelimesi değiştirilmiş soruları mükerrer (duplicate) olarak yakalar',
    passed,
    `Yüksek benzerlik: ${simHigh.toFixed(2)} (>= 0.70), Farklı metin: ${simLow.toFixed(2)} (< 0.20), isDup1: ${isDup1}, isDup2: ${isDup2}`
  );
} catch (err: any) {
  reportTest('01', 'Benzerlik metriği testi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 02: 5. Sınıf Türkçe Senaryo 1: Üretim, Mevcut Sınav Kâğıdını Asla Tekrarlamaz
// -----------------------------------------------------------------------------
try {
  const scenario = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[5]?.turkce?.[0];
  assert.ok(scenario, '5. Sınıf Türkçe Senaryo 1 bulunamadı');

  const baseExam = SAMPLE_EXAMS.find(e => e.id === 'exam_5_turkce_1_1_senaryo_1');
  assert.ok(baseExam, 'Hazır sınav bulunamadı');

  const res = await generateMEBIQuestions('turkce', 5, scenario, 0);

  let duplicateCountWithBase = 0;
  baseExam.questions.forEach((bq, i) => {
    res.generatedQuestions.forEach(gq => {
      if (calculateQuestionSimilarity(bq.questionText, gq.question) >= 0.38) {
        duplicateCountWithBase++;
      }
    });
  });

  const passed = duplicateCountWithBase === 0 && res.generatedQuestions.length === 6;

  reportTest(
    '02',
    '5. Sınıf Türkçe Senaryo 1: Üretilen sorular hazır sınavdaki mevcut soruları birebir veya benzer içermez',
    passed,
    `Üretilen Soru: ${res.generatedQuestions.length}, Mevcut Sınavla Çakışma Sayısı: ${duplicateCountWithBase} (Beklenen: 0)`
  );
} catch (err: any) {
  reportTest('02', 'Hazır sınav ile çakışmama testi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 03: Art Arda İki Üretimde ("Farklı Sorular Hazırla") Soru Metinleri Farklıdır
// -----------------------------------------------------------------------------
try {
  const scenario = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[5]?.turkce?.[0];

  const set1 = await generateMEBIQuestions('turkce', 5, scenario, 0);
  const set2 = await generateMEBIQuestions('turkce', 5, scenario, 1, undefined, undefined, {
    avoidQuestionTexts: set1.generatedQuestions.map(q => q.question),
    avoidStimuli: set1.generatedQuestions.map(q => q.stimulus)
  });

  let duplicateCrossCount = 0;
  set1.generatedQuestions.forEach((q1) => {
    set2.generatedQuestions.forEach((q2) => {
      if (calculateQuestionSimilarity(q1.question, q2.question) >= 0.38) {
        duplicateCrossCount++;
      }
    });
  });

  const passed = duplicateCrossCount === 0 && set1.generatedQuestions.length === set2.generatedQuestions.length;

  reportTest(
    '03',
    'Aynı senaryo için art arda iki üretimde ("Farklı Sorular Hazırla") sorular birebir aynı değildir',
    passed,
    `Set 1 Soru Sayısı: ${set1.generatedQuestions.length}, Set 2 Soru Sayısı: ${set2.generatedQuestions.length}, Kesişen Soru: ${duplicateCrossCount} (Beklenen: 0)`
  );
} catch (err: any) {
  reportTest('03', 'Farklı sorular üretimi testi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 04: API Başarısız Olduğunda Yedek Motorun Durumu Doğru Bildirilir (isFallback)
// -----------------------------------------------------------------------------
try {
  const scenario = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[5]?.turkce?.[0];
  const res = await generateMEBIQuestions('turkce', 5, scenario, 0);

  // Node ortamında /api/generate erişilemez olduğundan yedek motor devreye girer
  const isFallbackTrue = res.isFallback === true;
  const hasFallbackReason = typeof res.fallbackReason === 'string' && res.fallbackReason.length > 5;
  const hasValidModel = res.model.includes('MEBİ') || res.model.includes('Gemini');
  const hasTime = typeof res.generationTime === 'string' && res.generationTime.includes('saniye');

  const passed = isFallbackTrue && hasFallbackReason && hasValidModel && hasTime;

  reportTest(
    '04',
    'API çağrısı başarısız/çevrimdışı olduğunda yedek motor durumu (isFallback, fallbackReason) doğru bildirilir',
    passed,
    `isFallback: ${res.isFallback}, fallbackReason: "${res.fallbackReason}", model: "${res.model}", time: "${res.generationTime}"`
  );
} catch (err: any) {
  reportTest('04', 'Yedek motor durumu bildirimi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 05: Üretilen Soruların Puanları, Rubrikleri ve 100 Puan Toplamı Korunur
// -----------------------------------------------------------------------------
try {
  const scenario = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[5]?.turkce?.[0];
  const res = await generateMEBIQuestions('turkce', 5, scenario, 1);

  const totalPoints = res.generatedQuestions.reduce((s, q) => s + q.points, 0);
  let rubricMismatches = 0;

  res.generatedQuestions.forEach((q) => {
    const rSum = (q.rubric || []).reduce((s, r) => s + r.pts, 0);
    if (rSum !== q.points) {
      rubricMismatches++;
    }
  });

  const passed = totalPoints === 100 && rubricMismatches === 0;

  reportTest(
    '05',
    'Üretilen soruların puanları, rubrikleri ve toplam sınav puanı (100) tam dengededir',
    passed,
    `Toplam Puan: ${totalPoints} / 100, Rubrik Uyuşmazlığı: ${rubricMismatches}`
  );
} catch (err: any) {
  reportTest('05', 'Puan ve rubrik bütünlüğü testi', false, err.message);
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
  console.log('\n>>> TÜM ANTİ-DUPLİKASYON VE AI MOTORU TESTLERİ BAŞARIYLA GEÇTİ! <<<');
}
