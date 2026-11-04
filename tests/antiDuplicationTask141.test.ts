import assert from 'node:assert';
import {
  isDuplicateOrTooSimilar,
  calculateQuestionSimilarity,
  normalizeTurkishStem,
  cleanTurkishText,
  extractTopicTokens
} from '../src/utils/aiGeneratorEngine';
import {
  loadAvoidSession,
  saveAvoidSession,
  getAvoidSessionKey
} from '../src/components/AIGeneratorModal';
import { buildLiveExamPrompt } from '../src/generators/prompts';
import { MIDDLE_SCHOOL_OFFICIAL_SCENARIOS } from '../src/data/curriculumData';

console.log('=== OYSS TASK 141 - GEMINI SORU ÇEŞİTLİLİĞİ VE TEKRAR ÖNLEME DOĞRULAMA TESTLERİ BAŞLIYOR ===\n');

let passCount = 0;
let failCount = 0;

function report(num: string, title: string, success: boolean, detail: string) {
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
// TEST 01: Aynı Metnin Karakter İsimleri Değiştirilerek Tekrar Üretilmesi
// -----------------------------------------------------------------------------
try {
  const baseItem = {
    stimulus: 'Kerem ve annesi cumartesi sabahı pazara gittiler. Annesi manav tezgahından taze çilek satın aldı.',
    questionText: 'Yukarıdaki metne göre Kerem ve annesi pazardan hangi meyveyi satın almışlardır? Tek bir cümleyle yazınız.'
  };

  // İsim Kerem yerine Deniz, Ali veya Can yapılarak aynı soru kurgulanıyor
  const candidate = {
    stimulus: 'Deniz ve annesi cumartesi sabahı pazara gittiler. Annesi manav tezgahından taze çilek satın aldı.',
    questionText: 'Yukarıdaki metne göre Deniz ve annesi pazardan hangi meyveyi satın almışlardır? Tek bir cümleyle yazınız.'
  };

  const isDup = isDuplicateOrTooSimilar(candidate.questionText, candidate.stimulus, [baseItem]);
  report(
    '01',
    'Aynı metnin karakter isimleri değiştirilerek tekrar üretilmesi (Kerem -> Deniz) mükerrer kabul edilir',
    isDup === true,
    `Mükerrerlik tespiti: ${isDup} (Beklenen: true)`
  );
} catch (err: any) {
  report('01', 'Test 01 hatası', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 02: Aynı Olay Örgüsünün Farklı Kelimelerle Anlatılması
// -----------------------------------------------------------------------------
try {
  const baseItem = {
    stimulus: 'Kerem ve annesi cumartesi sabahı pazara gittiler. Annesi manav tezgahından taze çilek satın aldı.',
    questionText: 'Yukarıdaki metne göre Kerem ve annesi pazardan hangi meyveyi satın almışlardır? Tek bir cümleyle yazınız.'
  };

  // Eş anlamlı veya çekim eki değişmiş sözcüklerle pazar alışverişi ve çilek kurgusu
  const candidate = {
    stimulus: 'Deniz ve annesi pazar günü manava gittiler. Tezgâhtan mis kokulu taze çilekleri seçip poşete doldurdular.',
    questionText: 'Metne göre Deniz manavdan hangi meyveyi satın almıştır? Açıklayınız.'
  };

  const isDup = isDuplicateOrTooSimilar(candidate.questionText, candidate.stimulus, [baseItem]);
  report(
    '02',
    'Aynı olay örgüsünün farklı sözcüklerle anlatılması (manavdan çilek alma olayı) mükerrer kabul edilir',
    isDup === true,
    `Mükerrerlik tespiti: ${isDup} (Beklenen: true)`
  );
} catch (err: any) {
  report('02', 'Test 02 hatası', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 03: Aynı Konu ve Soru Kökünün Küçük Değişikliklerle Tekrarlanması
// -----------------------------------------------------------------------------
try {
  const baseItem = {
    stimulus: 'Ali o gün dedesinin tavan arasındaki eski ahşap sandığını açtı. Sandığın içinde el yapımı fırıldak ve tahta araba vardı.',
    questionText: 'Yukarıda dedenin torununa ahşap oyuncakları gösterdiği metnin konusunu tek bir cümleyle yazınız.'
  };

  const candidate = {
    stimulus: 'Can dedesinin tavan arasındaki sandığından eski tahta oyuncakları ve fırıldağı çıkardı.',
    questionText: 'Dedenin torununa ahşap oyuncakları anlattığı parçanın konusunu bir cümleyle açıklayınız.'
  };

  const isDup = isDuplicateOrTooSimilar(candidate.questionText, candidate.stimulus, [baseItem]);
  report(
    '03',
    'Aynı konu ve soru kökünün küçük sözcük değişiklikleriyle tekrarlanması mükerrer kabul edilir',
    isDup === true,
    `Mükerrerlik tespiti: ${isDup} (Beklenen: true)`
  );
} catch (err: any) {
  report('03', 'Test 03 hatası', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 04: Farklı Metinlerde Ortak Genel Yönerge Bulunması
// -----------------------------------------------------------------------------
try {
  const baseItem = {
    stimulus: 'Ali o gün dedesinin tavan arasındaki ahşap sandığından eski topacı ve tahta arabayı çıkardı. Emekle yapılan şeyin değerini konuştu.',
    questionText: 'Yukarıdaki metnin konusunu tek bir cümleyle yazınız.'
  };

  // Tamamen farklı metin (Köy okulunda kuş yuvası asılması), fakat standart MEBİ yönergesi aynı
  const candidate = {
    stimulus: 'Köy okulunun bahçesindeki asırlık çınar ağacına yeni ahşap kuş yuvaları asılmıştır. Kuşların kış soğuğundan korunması hedeflenmiştir.',
    questionText: 'Yukarıdaki metnin konusunu tek bir cümleyle yazınız.'
  };

  const isDup = isDuplicateOrTooSimilar(candidate.questionText, candidate.stimulus, [baseItem]);
  report(
    '04',
    'Farklı metinlerde ortak genel MEBİ yönergesinin bulunması tek başına mükerrerlik sayılmaz',
    isDup === false,
    `Mükerrerlik tespiti: ${isDup} (Beklenen: false)`
  );
} catch (err: any) {
  report('04', 'Test 04 hatası', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 05: Sayfa Yenilendikten Sonra Önceki Üretimlerin Korunması (sessionStorage)
// -----------------------------------------------------------------------------
try {
  // Mock sessionStorage for Node test environment
  const store: Record<string, string> = {};
  const mockSessionStorage = {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, val: string) => { store[key] = val; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { Object.keys(store).forEach(k => delete store[k]); }
  };
  (global as any).window = { sessionStorage: mockSessionStorage };

  const contextKey = '5_turkce_1_donem_1_yazili_senaryo_1';
  saveAvoidSession(contextKey, {
    variationCount: 1,
    avoidQuestionTexts: ['Soru 1 metni: Çilek sorusu', 'Soru 2 metni: Çınar ağacı'],
    avoidStimuli: ['Pazardan çilek alındı', 'Kuş yuvaları asıldı']
  });

  // Simulating page refresh: memory state is gone, only sessionStorage remains
  const loaded = loadAvoidSession(contextKey);

  const passed = loaded.variationCount === 1 &&
    loaded.avoidQuestionTexts.length === 2 &&
    loaded.avoidStimuli.length === 2 &&
    loaded.avoidQuestionTexts[0].includes('Çilek');

  report(
    '05',
    'Sayfa yenilendikten sonra (sessionStorage) önceki üretimler ve varyasyon sayısı eksiksiz korunur',
    passed,
    `Yüklenen soru sayısı: ${loaded.avoidQuestionTexts.length}, Varyasyon: ${loaded.variationCount}`
  );
} catch (err: any) {
  report('05', 'Test 05 hatası', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 06: Farklı Ders ve Senaryoların Geçmişlerinin Birbirinden Ayrılması
// -----------------------------------------------------------------------------
try {
  const turkceKey = '5_turkce_1_donem_1_yazili_senaryo_1';
  const matKey = '5_matematik_1_donem_1_yazili_senaryo_1';

  saveAvoidSession(turkceKey, {
    variationCount: 2,
    avoidQuestionTexts: ['Türkçe okuma metni sorusu'],
    avoidStimuli: ['Türkçe hikâyesi']
  });

  saveAvoidSession(matKey, {
    variationCount: 1,
    avoidQuestionTexts: ['Matematik asal çarpan sorusu'],
    avoidStimuli: ['Bal kavanozları']
  });

  const loadedTurkce = loadAvoidSession(turkceKey);
  const loadedMat = loadAvoidSession(matKey);

  const isolated = loadedTurkce.avoidQuestionTexts[0] === 'Türkçe okuma metni sorusu' &&
    loadedMat.avoidQuestionTexts[0] === 'Matematik asal çarpan sorusu' &&
    loadedTurkce.variationCount === 2 &&
    loadedMat.variationCount === 1;

  report(
    '06',
    'Farklı ders ve senaryoların kaçınma geçmişleri birbirine karışmaz, izole saklanır',
    isolated,
    `Türkçe: "${loadedTurkce.avoidQuestionTexts[0]}", Matematik: "${loadedMat.avoidQuestionTexts[0]}"`
  );
} catch (err: any) {
  report('06', 'Test 06 hatası', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 07: Kısa Soru Köklerinin Yanlışlıkla Reddedilmemesi
// -----------------------------------------------------------------------------
try {
  const baseItem = {
    stimulus: 'Ali o gün dedesinin tavan arasındaki ahşap sandığını açtı. Sandığın içindeki oyuncakları inceledi.',
    questionText: 'Ana fikir nedir?'
  };

  const candidate = {
    stimulus: 'Göl ekosistemindeki su kirliliği su altı canlılarını tehdit etmektedir. Çevre kulübü su analizleri yaptı.',
    questionText: 'Ana fikir nedir?'
  };

  const isDup = isDuplicateOrTooSimilar(candidate.questionText, candidate.stimulus, [baseItem]);
  report(
    '07',
    'Kısa soru kökleri ("Ana fikir nedir?", "x kaçtır?") farklı bağlamlarda yanlışlıkla reddedilmez',
    isDup === false,
    `Kısa kök mükerrerlik sonucu: ${isDup} (Beklenen: false)`
  );
} catch (err: any) {
  report('07', 'Test 07 hatası', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 08: 5. ve 6. Sınıflarda Prompt Bütçesinin 16.500 Karakter Sınırını Aşmaması
// -----------------------------------------------------------------------------
try {
  const scenario5Turkce = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[5]?.turkce?.[0];
  assert.ok(scenario5Turkce, '5. Sınıf Türkçe Senaryo 1 bulunamadı');

  const outcomeCodes5 = scenario5Turkce.distributions.map(d => d.outcomeCode);
  const distributionsText5 = scenario5Turkce.distributions.map((d, i) =>
    `Soru ${i + 1}: [Kazanım Kodu: ${d.outcomeCode}] [Resmi Öğrenme Çıktısı: ${d.notes || 'Kavramsal'}]`
  ).join('\n');

  const prompt5 = buildLiveExamPrompt({
    grade: 5,
    subjectId: 'turkce',
    targetCount: 6,
    distributionsText: distributionsText5,
    avoidDirectives: 'Önceki soru metni: pazardan çilek aldı',
    difficultyPlanText: '1 Kolay, 4 Orta, 1 Zor',
    variationIndex: 1,
    outcomeCodes: outcomeCodes5
  });

  const scenario6Mat = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[6]?.matematik?.[0];
  const outcomeCodes6 = scenario6Mat.distributions.map(d => d.outcomeCode);
  const distributionsText6 = scenario6Mat.distributions.map((d, i) =>
    `Soru ${i + 1}: [Kazanım Kodu: ${d.outcomeCode}] [Resmi Öğrenme Çıktısı: ${d.notes || 'Kavramsal'}]`
  ).join('\n');

  const prompt6 = buildLiveExamPrompt({
    grade: 6,
    subjectId: 'matematik',
    targetCount: 6,
    distributionsText: distributionsText6,
    avoidDirectives: 'Önceki soru metni: 72 kişilik kafile',
    difficultyPlanText: '1 Kolay, 4 Orta, 1 Zor',
    variationIndex: 1,
    outcomeCodes: outcomeCodes6
  });

  const withinBudget = prompt5.length <= 16500 && prompt6.length <= 16500;
  report(
    '08',
    '5. ve 6. sınıflarda prompt bütçesi (16.500 karakter tavanı) kesinlikle aşılmaz',
    withinBudget,
    `5. Sınıf Türkçe: ${prompt5.length} kr (<= 16500), 6. Sınıf Matematik: ${prompt6.length} kr (<= 16500)`
  );
} catch (err: any) {
  report('08', 'Test 08 hatası', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 09: 7. ve 8. Sınıfların Mevcut Üretim Davranışının Bozulmaması
// -----------------------------------------------------------------------------
try {
  const scenario7Mat = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[7]?.matematik?.[0];
  assert.ok(scenario7Mat, '7. Sınıf Matematik Senaryo 1 bulunamadı');

  const outcomeCodes7 = scenario7Mat.distributions.map(d => d.outcomeCode);
  const distributionsText7 = scenario7Mat.distributions.map((d, i) =>
    `Soru ${i + 1}: [Kazanım Kodu: ${d.outcomeCode}] [Resmi Öğrenme Çıktısı: ${d.notes || 'Kavramsal'}]`
  ).join('\n');

  const prompt7 = buildLiveExamPrompt({
    grade: 7,
    subjectId: 'matematik',
    targetCount: 7,
    distributionsText: distributionsText7,
    avoidDirectives: 'Yasaklı soru yok',
    difficultyPlanText: '2 Kolay, 4 Orta, 1 Zor',
    variationIndex: 0,
    outcomeCodes: outcomeCodes7
  });

  const hasMat7Directives = prompt7.includes('MAT.7.1.4') || prompt7.includes('Rasyonel sayılar');
  const hasRubricRule = prompt7.includes('ANALİTİK DERECELİ PUANLAMA ANAHTARI');
  const hasDynamicDiversity = prompt7.includes('DİNAMİK BAĞLAM ÇEŞİTLİLİĞİ');

  const passed = hasMat7Directives && hasRubricRule && hasDynamicDiversity && prompt7.length <= 16500;

  report(
    '09',
    '7. ve 8. sınıfların modüler prompt, branş yönergeleri ve analitik rubrik yapısı korunur',
    passed,
    `7. Sınıf Matematik Direktifleri: ${hasMat7Directives}, Rubrik Kuralı: ${hasRubricRule}, Dinamik Bağlam: ${hasDynamicDiversity}, Boyut: ${prompt7.length} kr`
  );
} catch (err: any) {
  report('09', 'Test 09 hatası', false, err.message);
}

console.log('====================================================');
console.log(`TOPLAM TEST: ${passCount + failCount}`);
console.log(`BAŞARILI   : ${passCount}`);
console.log(`BAŞARISIZ  : ${failCount}`);
console.log('====================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('>>> TÜM TASK 141 ÇEŞİTLİLİK VE TEKRAR ÖNLEME TESTLERİ BAŞARIYLA GEÇTİ! <<<');
}

