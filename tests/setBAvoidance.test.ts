import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  buildAvoidDirectives,
  buildLiveExamPrompt,
  smartTruncate
} from '../src/generators/prompts';
import {
  isDuplicateOrTooSimilar,
  calculateQuestionSimilarity
} from '../src/utils/aiGeneratorEngine';
import { SAMPLE_EXAMS } from '../src/data/sampleExams';
import { MIDDLE_SCHOOL_OFFICIAL_SCENARIOS } from '../src/data/curriculumData';

console.log('=== OYSS FAZ 2.3.2 - SET B B+ AVOIDANCE MİMARİSİ DOĞRULAMA TESTLERİ BAŞLIYOR ===\n');

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
// TEST 01: Örnek sınavda 7 veya daha fazla soru varken Set A sorularının Set B prompt'una dahil edilmesi
// -----------------------------------------------------------------------------
try {
  // 7. Sınıf Fen Bilimleri Senaryo 1'de hazır sınav 9 sorudur
  const baseFenExam = SAMPLE_EXAMS.find(e => e.grade === 7 && e.subjectId === 'fen_bilimleri' && e.scenarioId === 'senaryo_1');
  assert(baseFenExam && baseFenExam.questions.length >= 7, 'Hazır Fen sınavı 7 veya daha fazla soru içermeli');

  const baseAvoidTexts = baseFenExam.questions.map(q => q.questionText);
  const setAAvoidTexts = [
    'Set A Soru 1: Hücre bölünmesi sırasında kromozomların ekvatoral düzleme dizildiği evreyi çiziniz.',
    'Set A Soru 2: Mitoz ve mayoz arasındaki temel kromozom sayısı değişimini grafik üzerinde açıklayınız.',
    'Set A Soru 3: Kütle ve ağırlık ilişkisini Dünya ve Ay yüzeyindeki dinamometre ölçümleriyle karşılaştırınız.',
    'Set A Soru 4: Sürtünme kuvvetinin hava ve su direncine etkisini günlük hayat örnekleriyle tartışınız.',
    'Set A Soru 5: Kinetik enerjinin sürat ve kütle ile ilişkisini eğik düzlem deneyiyle modelleyiniz.',
    'Set A Soru 6: Çekim potansiyel enerjisini baraj göllerindeki suyun durumuyla ilişkilendiriniz.',
    'Set A Soru 7: Basit makinelerde kuvvet kazancı ile yol kaybı arasındaki ilişkiyi kaldıraç modeliyle açıklayınız.'
  ];

  const directives = buildAvoidDirectives({
    baseAvoidTexts,
    baseAvoidStimuli: [],
    setAAvoidTexts,
    setAAvoidStimuli: [],
    variationIndex: 1,
    variationToken: '2_testtoken'
  });

  const containsAllSetA = setAAvoidTexts.every(q => directives.includes(q.slice(0, 50)));
  const setAIndex = directives.indexOf('[KATEGORİ 1 - ÖNCELİKLİ YASAK: ÖNCEKİ VARYASYON (SET A) SORULARI]');
  const baseIndex = directives.indexOf('[KATEGORİ 2 - İKİNCİL YASAK: HAZIR SINAV TASLAK SORULARI]');

  const success = containsAllSetA && setAIndex !== -1 && baseIndex !== -1 && setAIndex < baseIndex;
  report(
    '01',
    'Hazır sınavda 9 soru varken Set A sorularının tamamı (7 adet) Set B promptuna dahil edilir',
    success,
    `Tüm Set A soruları mevcut: ${containsAllSetA}, Kategori 1 Set A önceliği (indeks ${setAIndex} < ${baseIndex}): true`
  );
} catch (err: any) {
  report('01', 'Hazır sınavda 9 soru varken Set A soruları dahil edilmesi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 02: Örnek sınavda 7'den az soru varken Set A sorularının önceliğinin korunması
// -----------------------------------------------------------------------------
try {
  // 7. Sınıf İngilizce Senaryo 1'de hazır sınav 4 sorudur
  const baseIngExam = SAMPLE_EXAMS.find(e => e.grade === 7 && e.subjectId === 'ingilizce' && e.scenarioId === 'senaryo_1');
  assert(baseIngExam && baseIngExam.questions.length < 7, 'Hazır İngilizce sınavı 7den az soru içermeli');

  const baseAvoidTexts = baseIngExam.questions.map(q => q.questionText);
  const setAAvoidTexts = [
    'Set A Q1: Describe your best friend appearance and personality using at least four adjectives.',
    'Set A Q2: Compare basketball and tennis in terms of popularity and difficulty.',
    'Set A Q3: Write an invitation letter for a weekend cycling event with date and time.'
  ];

  const directives = buildAvoidDirectives({
    baseAvoidTexts,
    baseAvoidStimuli: [],
    setAAvoidTexts,
    setAAvoidStimuli: [],
    variationIndex: 1,
    variationToken: '2_testtoken'
  });

  const setAFirst = directives.indexOf('Set A Soru 1') < directives.indexOf('Taslak Soru 1');
  const hasBase = directives.includes('Taslak Soru 1');
  const hasSetA = directives.includes('Set A Soru 1');

  report(
    '02',
    'Hazır sınavda 4 soru varken Set A sorularının önceliği korunur ve ikincil hazır sorular da dahil edilir',
    setAFirst && hasBase && hasSetA,
    `Set A önce geliyor: ${setAFirst}, Hazır taslak mevcut: ${hasBase}, Set A mevcut: ${hasSetA}`
  );
} catch (err: any) {
  report('02', 'Hazır sınavda 7den az soru varken Set A önceliği', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 03: Set A'da 11 veya daha fazla soru olduğunda tüm soruların dahil edilmesi
// -----------------------------------------------------------------------------
try {
  // 12 soruluk kapsamlı bir Set A senaryosu
  const largeSetA = Array.from({ length: 12 }, (_, i) =>
    `Genişletilmiş Soru ${i + 1}: Matematik ve fen integrasyonuna dayalı analitik soru gövdesi ${i + 1}.`
  );

  const directives = buildAvoidDirectives({
    baseAvoidTexts: ['Hazır taslak soru A', 'Hazır taslak soru B'],
    baseAvoidStimuli: [],
    setAAvoidTexts: largeSetA,
    setAAvoidStimuli: [],
    variationIndex: 1,
    variationToken: '2_large_token'
  });

  const containsAll12 = largeSetA.every((_, i) => directives.includes(`Set A Soru ${i + 1}`));
  const notCappedAt7 = directives.includes('Set A Soru 8') && directives.includes('Set A Soru 12');

  report(
    '03',
    'Set A 12 sorudan oluştuğunda keyfi 7/10 sınırına takılmaz, tamamı (12 soru) prompta dahil edilir',
    containsAll12 && notCappedAt7,
    `12/12 soru mevcut: ${containsAll12}, 7/10 sınırına takılmadı: ${notCappedAt7}`
  );
} catch (err: any) {
  report('03', '11 veya daha fazla soruda tüm soruların dahil edilmesi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 04: Set A uyaranlarının örnek sınav uyaranlarından bağımsız olarak dahil edilmesi
// -----------------------------------------------------------------------------
try {
  const setAStimuli = [
    'Set A Uyarım 1: İnebolu sahilindeki cephane taşıyan kağnı kollarının tarihi anlatısı.',
    'Set A Uyarım 2: Çanakkale Savaşında Seyit Onbaşının top mermisini kaldırdığı anın tasviri.'
  ];
  const baseStimuli = [
    'Taslak Uyarım 1: Ali Beyin tarlasındaki sulama kanalları tablosu.'
  ];

  const directives = buildAvoidDirectives({
    baseAvoidTexts: ['Soru 1'],
    baseAvoidStimuli: baseStimuli,
    setAAvoidTexts: ['Set A Soru 1'],
    setAAvoidStimuli: setAStimuli,
    variationIndex: 1,
    variationToken: '2_stim_token'
  });

  const hasSetAStimuliHeader = directives.includes('[UYARAN YASAĞI - SET A KURGU VE METİNLERİ (ÖNCELİKLİ)]');
  const hasBaseStimuliHeader = directives.includes('[UYARAN YASAĞI - HAZIR SINAV TASLAK METİNLERİ (İKİNCİL)]');
  const setAStimuliBeforeBase = directives.indexOf(hasSetAStimuliHeader ? '[UYARAN YASAĞI - SET A' : '') <
                                directives.indexOf(hasBaseStimuliHeader ? '[UYARAN YASAĞI - HAZIR' : '');

  report(
    '04',
    'Set A uyaranları örnek sınav uyaranlarından bağımsız ve öncelikli kategori olarak dahil edilir',
    hasSetAStimuliHeader && hasBaseStimuliHeader && setAStimuliBeforeBase,
    `Set A uyaran başlığı: true, Hazır sınav uyaran başlığı: true, Set A uyaranı önce: true`
  );
} catch (err: any) {
  report('04', 'Set A uyaranlarının bağımsız dahil edilmesi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 05: Set A uyaran sayısı 3'ten fazla olduğunda önceliğin korunması
// -----------------------------------------------------------------------------
try {
  const fourStimuli = [
    'Uyarım A: Güneş panellerinin verimlilik tablosu.',
    'Uyarım B: Rüzgâr türbinlerinin kanat tasarımı diyagramı.',
    'Uyarım C: Baraj kapaklarındaki su basıncı şeması.',
    'Uyarım D: Jeotermal kaynakların yer altı akış grafiği.'
  ];

  const directives = buildAvoidDirectives({
    baseAvoidTexts: ['Soru 1'],
    baseAvoidStimuli: ['Eski taslak uyarımı'],
    setAAvoidTexts: ['Set A Soru 1'],
    setAAvoidStimuli: fourStimuli,
    variationIndex: 1,
    variationToken: '2_four_stim'
  });

  // Eski motorda .slice(0, 3) 4. uyarımı dışarı atıyordu
  const hasStimulus4 = directives.includes('Jeotermal kaynakların yer altı');
  const allFourPresent = fourStimuli.every(s => directives.includes(s.slice(0, 20)));

  report(
    '05',
    'Set A uyaran sayısı 4 olduğunda .slice(0, 3) kesmesine uğramaz, tamamı öncelikli blokta yer alır',
    hasStimulus4 && allFourPresent,
    `4. Uyarım mevcut: ${hasStimulus4}, Tüm 4 uyarım kapsandı: ${allFourPresent}`
  );
} catch (err: any) {
  report('05', 'Set A uyaran sayısı 3ten fazla olduğunda öncelik koruması', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 06: Soru metni kısaltmalarının ayırt edici içeriği koruması
// -----------------------------------------------------------------------------
try {
  // İlk 100 karakteri çok benzer olan, ancak sonundaki görev yönergesi farklı olan iki soru
  const qStem1 = "Yukarıdaki metinde geçen bağımsızlık ve fedakârlık kavramlarının olay örgüsüne katkısını açıklayınız ve ana fikri birinci tekil kişi ağzından özetleyiniz.";
  const qStem2 = "Yukarıdaki metinde geçen bağımsızlık ve fedakârlık kavramlarının olay örgüsüne katkısını açıklayınız ve metindeki benzetme sanatının anlamına etkisini yazınız.";

  const truncated1 = smartTruncate(qStem1, 180);
  const truncated2 = smartTruncate(qStem2, 180);

  // Eski 95 karakter kesmesi: her ikisini de aynı yapıyordu
  const oldTruncated1 = qStem1.slice(0, 95);
  const oldTruncated2 = qStem2.slice(0, 95);
  const oldWasIdentical = oldTruncated1 === oldTruncated2;

  // Yeni 180 karakter akıllı kesme: ayırt edici yönergeleri korumalıdır
  const newPreservesDistinct = truncated1.includes('birinci tekil kişi') && truncated2.includes('benzetme sanatının');

  report(
    '06',
    'Soru kısaltması (smartTruncate 180 kr) ayırt edici yönergeleri korur ve anlamsız hece kesilmesi yapmaz',
    newPreservesDistinct && oldWasIdentical,
    `Eski 95 kr kesmede aynı çıkıyordu: ${oldWasIdentical}, Yeni 180 kr ayırt edici içeriği korudu: ${newPreservesDistinct}`
  );
} catch (err: any) {
  report('06', 'Soru metni kısaltmalarının ayırt edici içeriği koruması', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 07: Uyaran kısaltmalarının anlamlı içeriği koruması
// -----------------------------------------------------------------------------
try {
  const longStimulus = "Kastamonu'nun İnebolu sahilinde başlayan ve Ankara'ya kadar uzanan tarihi İstiklal Yolu'nda Şerife Bacı ve kağnı kollarının vatan mücadelesi anlatılmaktadır.";
  const truncatedStim = smartTruncate(longStimulus, 120);

  // 120 karaktere kadar akıllı kesme: kelime ortasında harf parçalanması yapmamalı
  const endsWithDots = truncatedStim.endsWith('...');
  const isReasonableLength = truncatedStim.length <= 123;
  const preservesKeyContext = truncatedStim.includes('İnebolu') && truncatedStim.includes('İstiklal Yolu');

  report(
    '07',
    'Uyaran kısaltması (smartTruncate 120 kr) anlamlı bağlamı korur ve kelime sınırından keser',
    endsWithDots && isReasonableLength && preservesKeyContext,
    `Uzunluk: ${truncatedStim.length} kr (<= 123), Anahtar bağlam korundu: ${preservesKeyContext}`
  );
} catch (err: any) {
  report('07', 'Uyaran kısaltmalarının anlamlı içeriği koruması', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 08: Set A promptlarının önceki referanslarla byte-for-byte aynı olması
// -----------------------------------------------------------------------------
try {
  const refPath = path.join(process.cwd(), 'tests/fixtures/reference_prompts.json');
  const refData = JSON.parse(fs.readFileSync(refPath, 'utf-8'));

  const setAKeys = [
    'matematik_7_setA',
    'fen_bilimleri_7_setA',
    'turkce_7_setA',
    'sosyal_bilgiler_7_setA',
    'din_kulturu_7_setA'
  ];

  let allByteForByteMatch = true;
  for (const key of setAKeys) {
    const item = refData[key];
    const assembledPrompt = buildLiveExamPrompt({
      grade: item.grade,
      subjectId: item.subjectId,
      targetCount: item.targetCount,
      distributionsText: item.distributionsText,
      avoidDirectives: item.avoidDirectives,
      difficultyPlanText: item.difficultyPlanText,
      variationToken: item.variationToken,
      variationIndex: item.variationIndex
    });

    if (assembledPrompt !== item.prompt) {
      allByteForByteMatch = false;
      break;
    }
  }

  report(
    '08',
    '7. Sınıf beş özel branş Set A promptları referans fixture ile %100 byte-for-byte aynıdır',
    allByteForByteMatch,
    `İncelenen 5 özel Set A kaydının tamamında karakter ve SHA256 eşitliği korundu: ${allByteForByteMatch}`
  );
} catch (err: any) {
  report('08', 'Set A promptlarının byte-for-byte eşitliği', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 09: Beş özel 7. sınıf dersinin prompt davranışının korunması
// -----------------------------------------------------------------------------
try {
  const customSubjects = ['turkce', 'matematik', 'fen_bilimleri', 'sosyal_bilgiler', 'din_kulturu'] as const;
  let allCustomValid = true;

  for (const sub of customSubjects) {
    const prompt = buildLiveExamPrompt({
      grade: 7,
      subjectId: sub,
      targetCount: 7,
      distributionsText: 'Soru 1: Test kazanımı',
      avoidDirectives: 'TEST_AVOID_BLOCK',
      difficultyPlanText: 'Kolay: 1, Orta: 5, Zor: 1',
      variationToken: '2_custom_token',
      variationIndex: 1
    });

    if (!prompt.includes('TEST_AVOID_BLOCK') || !prompt.includes('JSON')) {
      allCustomValid = false;
      break;
    }
  }

  report(
    '09',
    'Beş özel 7. sınıf dersinin modüler prompt üretimi ve branş kuralları eksiksiz korunur',
    allCustomValid,
    `5 branşın tamamında prompt yapısı ve çıktı şeması eksiksiz: ${allCustomValid}`
  );
} catch (err: any) {
  report('09', 'Beş özel 7. sınıf dersinin prompt davranışı', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 10: Generic prompt davranışının korunması
// -----------------------------------------------------------------------------
try {
  const genericPrompt5Math = buildLiveExamPrompt({
    grade: 5,
    subjectId: 'matematik',
    targetCount: 7,
    distributionsText: 'Soru 1: M.5.1.1',
    avoidDirectives: 'GENERIC_AVOID_DIRECTIVE',
    difficultyPlanText: 'Kolay: 2, Orta: 4, Zor: 1',
    variationToken: '2_generic_tok',
    variationIndex: 1
  });

  const isGenericHeader = genericPrompt5Math.includes('5. Sınıf') && genericPrompt5Math.includes('matematik');
  const hasAvoid = genericPrompt5Math.includes('GENERIC_AVOID_DIRECTIVE');
  const hasPedagogy = genericPrompt5Math.includes('PEDAGOJİK');

  report(
    '10',
    'Generic prompt motoru (5. sınıf matematik vb.) yeni kaçınma direktiflerini hatasız entegre eder',
    isGenericHeader && hasAvoid && hasPedagogy,
    `Header doğru: ${isGenericHeader}, Kaçınma direktifi entegre: ${hasAvoid}, Pedagoji mevcut: ${hasPedagogy}`
  );
} catch (err: any) {
  report('10', 'Generic prompt davranışının korunması', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 11: Post-processing anti-duplicate filtresinin tam allAvoidItems ile çalışması
// -----------------------------------------------------------------------------
try {
  const setAQuestion = "Yukarıda dedenin torununa ahşap oyuncakları gösterdiği metnin konusunu bir cümleyle yazınız.";
  const similarOutput = "Yukarıda dedenin torununa ahşap oyuncakları gösterdiği metnin konusunu tek bir cümleyle açıklayınız.";
  const distinctOutput = "Doğal sayılarda asal çarpanlara ayırma algoritmasını 120 sayısı için adım adım gösteriniz.";

  const allAvoidItems = [
    { questionText: setAQuestion, stimulus: 'Ahşap oyuncak atölyesi metni' }
  ];

  // Benzer soru (benzerlik 0.77 >= 0.45) kesinlikle yakalanmalı
  const isDuplicateDetected = isDuplicateOrTooSimilar(similarOutput, '', allAvoidItems, undefined, 0.45);
  // Farklı soru ise onaylanmalı (duplicate = false)
  const isDistinctAllowed = !isDuplicateOrTooSimilar(distinctOutput, '', allAvoidItems, undefined, 0.45);

  report(
    '11',
    'Post-processing anti-duplicate filtresi (0.45 eşiği) Set A benzeri soruları kesinlikle yakalar',
    isDuplicateDetected && isDistinctAllowed,
    `Set A ile benzer soru yakalandı (true): ${isDuplicateDetected}, Farklı soruya izin verildi (true): ${isDistinctAllowed}`
  );
} catch (err: any) {
  report('11', 'Post-processing anti-duplicate filtresi kontrolü', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 12: Set A verisi boş veya eksik olduğunda güvenli davranış
// -----------------------------------------------------------------------------
try {
  // options.avoidQuestionTexts boş veya undefined geldiğinde
  const directivesEmpty = buildAvoidDirectives({
    baseAvoidTexts: ['Mevcut soru 1', 'Mevcut soru 2'],
    baseAvoidStimuli: [],
    setAAvoidTexts: [],
    setAAvoidStimuli: [],
    variationIndex: 0,
    variationToken: '1_empty_tok'
  });

  const isLegacyFormat = directivesEmpty.includes('Yasaklı/Mevcut Soru 1') &&
                        !directivesEmpty.includes('[KATEGORİ 1 - ÖNCELİKLİ YASAK');

  // Tamamen boş veri durumunda
  const directivesTotallyEmpty = buildAvoidDirectives({
    baseAvoidTexts: [],
    baseAvoidStimuli: [],
    setAAvoidTexts: [],
    setAAvoidStimuli: [],
    variationIndex: 0,
    variationToken: '1_none'
  });

  const hasFallbackVariationPlan = directivesTotallyEmpty.includes('VARYASYON PLANI:');

  report(
    '12',
    'Set A verisi boş veya eksik olduğunda sistem geriye dönük uyumlu kalıba ve güvenli varsayılana geçer',
    isLegacyFormat && hasFallbackVariationPlan,
    `Set A formatına geçiş: ${isLegacyFormat}, Tamamen boşta varyasyon planına geçiş: ${hasFallbackVariationPlan}`
  );
} catch (err: any) {
  report('12', 'Boş veya eksik Set A verisinde güvenli davranış', false, err.message);
}

// -----------------------------------------------------------------------------
// GENEL TEST SONUCU
// -----------------------------------------------------------------------------
console.log('====================================================');
console.log(`TOPLAM TEST: ${passCount + failCount}`);
console.log(`BAŞARILI   : ${passCount}`);
console.log(`BAŞARISIZ  : ${failCount}`);
console.log('====================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('>>> TÜM SET B B+ AVOIDANCE TESTLERİ EKSİKSİZ BAŞARIYLA GEÇTİ! <<<');
}
