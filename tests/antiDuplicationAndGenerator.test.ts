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
// TEST 06: 6. Sınıf Matematik MEBİ Yönerge ve Sayısal Parametre Ayrımı
// -----------------------------------------------------------------------------
try {
  const baseItems = [
    {
      questionText: '72 sayısını bölen listesi (algoritma) yöntemiyle asal çarpanlarına ayırınız ve üslü ifadelerin çarpımı şeklinde yazınız.',
      stimulus: '72 kişilik bir turist kafilesi bir otele yerleştirilecektir.'
    },
    {
      questionText: 'Dört basamaklı 542A sayısı 4 ile kalansız bölünebilmektedir. Buna göre A yerine yazılabilecek rakamları bulunuz.',
      stimulus: ''
    }
  ];

  // Özgün yeni sorular (Farklı kurgu, farklı sayılar, farklı kurallar)
  const candMath1 = {
    questionText: '90 sayısını bölen listesi (algoritma) yöntemiyle asal çarpanlarına ayırınız ve üslü ifadelerin çarpımı şeklinde yazınız.',
    stimulus: 'Hasan Bey bahçesinden topladığı 90 kg balı kavanozlara paylaştıracaktır.'
  };
  const candMath2 = {
    questionText: 'Beş basamaklı 7832B sayısı 9 ile kalansız bölünebilmektedir. Buna göre B yerine yazılabilecek rakamları bulunuz.',
    stimulus: ''
  };

  // Gerçek kopyalar (Aynı sayılar, aynı kurgunun yalnızca 1-2 sözcüğü değiştirilmiş hali)
  const realDup1 = {
    questionText: '72 sayısını bölen listesi (algoritma) yöntemiyle asal çarpanlarına ayırınız ve üslü ifadelerin çarpımı şeklinde yazınız.',
    stimulus: '72 kişilik bir öğrenci kafilesi bir otele yerleştirilecektir.'
  };
  const realDup2 = {
    questionText: 'Dört basamaklı 542A sayısı 4 ile kalansız bölünebildiğine göre A yerine yazılabilecek tüm rakamları bulunuz.',
    stimulus: ''
  };

  const isDupCand1 = isDuplicateOrTooSimilar(candMath1.questionText, candMath1.stimulus, baseItems, undefined, 0.45);
  const isDupCand2 = isDuplicateOrTooSimilar(candMath2.questionText, candMath2.stimulus, baseItems, undefined, 0.45);
  const isDupReal1 = isDuplicateOrTooSimilar(realDup1.questionText, realDup1.stimulus, baseItems, undefined, 0.45);
  const isDupReal2 = isDuplicateOrTooSimilar(realDup2.questionText, realDup2.stimulus, baseItems, undefined, 0.45);

  const passed = isDupCand1 === false && isDupCand2 === false && isDupReal1 === true && isDupReal2 === true;

  reportTest(
    '06',
    '6. Sınıf Matematik: Standart MEBİ yönergesi içeren farklı sorular reddedilmez, gerçek kopyalar yakalanır',
    passed,
    `Hasan Bey 90 kg bal (reddedilmedi): ${!isDupCand1}, 7832B/9 bölünebilme (reddedilmedi): ${!isDupCand2}, Öğrenci oteli kopyası (yakalandı): ${isDupReal1}, 542A/4 kopyası (yakalandı): ${isDupReal2}`
  );
} catch (err: any) {
  reportTest('06', '6. sınıf matematik anti-duplikasyon testi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 07: 7. Sınıf Matematik: Hazır Sınavla Çakışmama ve KaTeX Bütünlüğü
// -----------------------------------------------------------------------------
try {
  const scenario = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[7]?.matematik?.[0];
  assert.ok(scenario, '7. Sınıf Matematik Senaryo 1 bulunamadı');

  const baseExam = SAMPLE_EXAMS.find(e => e.id === 'exam_7_matematik_1_1_senaryo_1');
  assert.ok(baseExam, 'Hazır sınav bulunamadı');

  const res = await generateMEBIQuestions('matematik', 7, scenario, 0);

  let duplicateCount = 0;
  baseExam.questions.forEach((bq) => {
    res.generatedQuestions.forEach((gq) => {
      if (isDuplicateOrTooSimilar(gq.question, gq.stimulus, [{ questionText: bq.questionText, stimulus: bq.stimulus }], undefined, 0.45)) {
        duplicateCount++;
      }
    });
  });

  const hasKaTeX = res.generatedQuestions.some(q => q.question.includes('$') || (q.stimulus && q.stimulus.includes('$')));
  const hasAltAnswers = res.generatedQuestions.every(q => Array.isArray(q.alternativeAnswers) && q.alternativeAnswers.length >= 2);

  const passed = duplicateCount === 0 && res.generatedQuestions.length === 7 && hasKaTeX && hasAltAnswers;

  reportTest(
    '07',
    '7. Sınıf Matematik: Üretim hazır sınavı tekrarlamaz, KaTeX ve alternatif cevapları eksiksiz sunar',
    passed,
    `Soru Sayısı: ${res.generatedQuestions.length}, Çakışma: ${duplicateCount}, KaTeX Desteği: ${hasKaTeX}, Alternatif Cevaplar: ${hasAltAnswers}`
  );
} catch (err: any) {
  reportTest('07', '7. sınıf matematik entegrasyon testi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 08: 7. Sınıf Fen Bilimleri: Hazır Sınavla Çakışmama ve Ders Kitabı Entegrasyonu
// -----------------------------------------------------------------------------
try {
  const scenario = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[7]?.fen_bilimleri?.[0];
  assert.ok(scenario, '7. Sınıf Fen Bilimleri Senaryo 1 bulunamadı');

  const baseExam = SAMPLE_EXAMS.find(e => e.id === 'exam_7_fen_bilimleri_1_1_senaryo_1');
  assert.ok(baseExam, 'Hazır sınav bulunamadı');

  const res = await generateMEBIQuestions('fen_bilimleri', 7, scenario, 0);

  let duplicateCount = 0;
  baseExam.questions.forEach((bq) => {
    res.generatedQuestions.forEach((gq) => {
      if (isDuplicateOrTooSimilar(gq.question, gq.stimulus, [{ questionText: bq.questionText, stimulus: bq.stimulus }], undefined, 0.45)) {
        duplicateCount++;
      }
    });
  });

  const hasAltAnswers = res.generatedQuestions.every(q => Array.isArray(q.alternativeAnswers) && q.alternativeAnswers.length >= 2);
  const totalPoints = res.generatedQuestions.reduce((s, q) => s + q.points, 0);

  const passed = duplicateCount === 0 && res.generatedQuestions.length === 9 && hasAltAnswers && totalPoints === 100;

  reportTest(
    '08',
    '7. Sınıf Fen Bilimleri: Üretim hazır sınavı tekrarlamaz, 9 soru, 100 puan ve alternatif cevapları korur',
    passed,
    `Soru Sayısı: ${res.generatedQuestions.length}, Toplam Puan: ${totalPoints}, Çakışma: ${duplicateCount}, Alternatif Cevaplar: ${hasAltAnswers}`
  );
} catch (err: any) {
  reportTest('08', '7. sınıf fen bilimleri entegrasyon testi', false, err.message);
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
