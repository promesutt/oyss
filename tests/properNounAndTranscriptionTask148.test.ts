import assert from 'node:assert';
import { 
  fixProperNounApostrophes, 
  fixStimulusTranscriptionTypos,
  cleanTurkishText
} from '../src/utils/aiGeneratorEngine';

console.log('=== OYSS TASK 148: MODEL CEVAPLARINDA YAZIM VE ÖZEL AD DOĞRULUĞU TESTLERİ BAŞLIYOR ===\n');

let passCount = 0;
let failCount = 0;

async function runTest(name: string, fn: () => Promise<void> | void) {
  try {
    await fn();
    passCount++;
    console.log(`[PASS] ${name}`);
  } catch (err: any) {
    failCount++;
    console.error(`[FAIL] ${name}\n       Hata: ${err.message}`);
  }
}

async function runAll() {
  // --------------------------------------------------------------------------
  // TEST 1: Özel Ad ve Ek Kontrolü (TDK 3. Teklik Kişi İyelik Eki ve Kesme İşareti)
  // --------------------------------------------------------------------------
  await runTest("T1_PROPER_NOUN_APOSTROPHE_CORRECTION: 'Ankara Garın\\'dan' -> 'Ankara Garı\\'ndan'", () => {
    // 1. Temel kullanıcı test örneği
    const input1 = "Tren dün akşam Ankara Garın'dan hareket etti.";
    const expected1 = "Tren dün akşam Ankara Garı'ndan hareket etti.";
    assert.strictEqual(fixProperNounApostrophes(input1), expected1, "Ankara Garın'dan -> Ankara Garı'ndan düzeltilmeli");

    // 2. Kıvrık kesme işareti (’ - U+2019) desteği
    const inputCurly = "Yolcular Ankara Garın’dan uğurlandı.";
    const expectedCurly = "Yolcular Ankara Garı'ndan uğurlandı.";
    assert.strictEqual(fixProperNounApostrophes(inputCurly), expectedCurly, "Kıvrık kesme işareti de doğru düzeltilmeli");

    // 3. 'Gar'ından' biçimi düzeltmesi
    const inputMisplaced = "Ankara Gar'ından kalkan tren.";
    const expectedMisplaced = "Ankara Garı'ndan kalkan tren.";
    assert.strictEqual(fixProperNounApostrophes(inputMisplaced), expectedMisplaced, "Gar'ından -> Garı'ndan düzeltilmeli");

    // 4. Diğer tarihi/coğrafi özel ad tamlamaları
    const cases: Array<[string, string]> = [
      ["İstanbul Boğazın'dan geçen gemiler", "İstanbul Boğazı'ndan geçen gemiler"],
      ["Çanakkale Boğazın'a doğru ilerledi", "Çanakkale Boğazı'na doğru ilerledi"],
      ["Ankara Kalesin'den şehri izledik", "Ankara Kalesi'nden şehri izledik"],
      ["Topkapı Sarayın'dan kalan el yazmaları", "Topkapı Sarayı'ndan kalan el yazmaları"],
      ["Galata Kulesin'den Haliç görünür", "Galata Kulesi'nden Haliç görünür"],
      ["Boğaziçi Köprün'den geçtik", "Boğaziçi Köprüsü'nden geçtik"],
      ["Boğaziçi Köprüsün'den geçtik", "Boğaziçi Köprüsü'nden geçtik"],
      ["Konya Ovasın'dan bereketli buğday", "Konya Ovası'ndan bereketli buğday"],
      ["Van Gölün'den su örneği alındı", "Van Gölü'nden su örneği alındı"],
      ["Ağrı Dağın'dan esen soğuk rüzgâr", "Ağrı Dağı'ndan esen soğuk rüzgâr"],
      ["Taksim Meydanın'da toplandılar", "Taksim Meydanı'nda toplandılar"],
      ["Haydarpaşa Limanın'dan yük gemisi kalktı", "Haydarpaşa Limanı'ndan yük gemisi kalktı"],
      ["Fırat Nehrin'den sulanan tarım arazileri", "Fırat Nehri'nden sulanan tarım arazileri"]
    ];

    for (const [raw, expected] of cases) {
      assert.strictEqual(fixProperNounApostrophes(raw), expected, `${raw} -> ${expected} olmalı`);
    }

    // 5. Zaten doğru yazılmış ifadelerin yapısını BOZMAMA (Idempotence)
    const correctSample = "Ankara Garı'ndan kalkan tren İstanbul Boğazı'na ulaştı.";
    assert.strictEqual(fixProperNounApostrophes(correctSample), correctSample, "Zaten doğru yazılmış ifadeler korunmalı");

    // 6. Cins isim ve genel sözcükleri koruma (Yan etki yasağı)
    const commonNounSample = "Tren garın kapısından içeri girdi ve makinist gara yöneldi.";
    assert.strictEqual(fixProperNounApostrophes(commonNounSample), commonNounSample, "Kesmesiz cins isimler değiştirilmemeli");
  });

  // --------------------------------------------------------------------------
  // TEST 2: Model Cevap Metni Doğruluğu (Stimulus Aktarım Hatası Düzeltmesi)
  // --------------------------------------------------------------------------
  await runTest("T2_STIMULUS_TRANSCRIPTION_TYPO_CORRECTION: 'pider' -> 'pideleri'", () => {
    const stimulus = "Fırıncı Hasan Usta, sabahın erken saatlerinde fırını meşe odunlarıyla yaktı. Hazırladığı susamlı pideleri kürekle fırına sürdü.";

    // 1. Cümle içinde 'pider'
    const answer1 = "Hasan Usta fırına taze susamlı pider sürmüştür.";
    const fixed1 = fixStimulusTranscriptionTypos(answer1, stimulus);
    assert.strictEqual(fixed1, "Hasan Usta fırına taze susamlı pideleri sürmüştür.", "pider -> pideleri olarak düzeltilmeli");

    // 2. Cümle başında büyük harfli 'Pider'
    const answer2 = "Pider fırında çıtır çıtır pişmektedir.";
    const fixed2 = fixStimulusTranscriptionTypos(answer2, stimulus);
    assert.strictEqual(fixed2, "Pideleri fırında çıtır çıtır pişmektedir.", "Pider -> Pideleri olarak büyük harf korunarak düzeltilmeli");

    // 3. Yalnızca tek sözcük cevap 'pider'
    const answer3 = "pider";
    const fixed3 = fixStimulusTranscriptionTypos(answer3, stimulus);
    assert.strictEqual(fixed3, "pideleri", "Tek kelimelik 'pider' -> 'pideleri' olmalı");

    // 4. Noktalama ve parantez içindeki 'pider'
    const answer4 = "Fırından çıkan (pider) sıcak servis edilir.";
    const fixed4 = fixStimulusTranscriptionTypos(answer4, stimulus);
    assert.strictEqual(fixed4, "Fırından çıkan (pideleri) sıcak servis edilir.", "Parantez içi 'pider' -> 'pideleri' olmalı");
  });

  // --------------------------------------------------------------------------
  // TEST 3: Türkçe Yazım Güvenilirliği (Emin Olunmayan İfadeleri Değiştirmeme)
  // --------------------------------------------------------------------------
  await runTest("T3_SAFETY_AND_NO_FALSE_POSITIVES: Geçerli Türkçe sözcükler (lider, gider, kader vb.) kesinlikle bozulmamalı", () => {
    const stimulus = "Grup lideri, gider bütçesini hesaplayarak kader birliği yapan ekibe rehberlik etti.";
    const answer = "Lider ekipteki her bir üyenin gider tablosunu düzenlemiş ve kader ortaklığını pekiştirmiştir.";

    const fixed = fixStimulusTranscriptionTypos(answer, stimulus);
    assert.strictEqual(fixed, answer, "Geçerli Türkçe sözcükler ('lider', 'gider', 'kader') asla bozulmamalıdır");

    const properFixed = fixProperNounApostrophes(answer);
    assert.strictEqual(properFixed, answer, "Özel ad kuralı da geçerli Türkçe sözcüklere müdahale etmemelidir");
  });

  // --------------------------------------------------------------------------
  // TEST 4: Birleşik ve Uçtan Uca Metin Kalibrasyonu (Soru Kökü, Cevap ve Açıklama)
  // --------------------------------------------------------------------------
  await runTest("T4_END_TO_END_INTEGRATED_TEXT_CORRECTION: Soru, cevap ve alternatiflerde iki kural birlikte çalışmalı", () => {
    const stimulus = "Köy fırınında pişirilen susamlı pideleri alan yolcular, Ankara Garın'dan trene binerek yolculuğa başladılar.";
    const rawStem = "Yolcuların Ankara Garın'dan binerken yanlarına aldıkları pider hakkında ne söylenebilir?";
    const rawAnswer = "Yolcular Ankara Garın'dan trene binerken taze susamlı pider almışlardır.";
    const rawAlt = "Ankara Garın'dan binen yolcular fırından yeni çıkan pider ile karınlarını doyurmuştur.";

    // Soru kökü düzeltmesi
    const fixedStem = fixStimulusTranscriptionTypos(fixProperNounApostrophes(rawStem), stimulus);
    assert.strictEqual(
      fixedStem,
      "Yolcuların Ankara Garı'ndan binerken yanlarına aldıkları pideleri hakkında ne söylenebilir?",
      "Soru kökünde hem özel ad hem pider düzeltilmeli"
    );

    // Model cevap düzeltmesi
    const fixedAnswer = fixStimulusTranscriptionTypos(fixProperNounApostrophes(rawAnswer), stimulus);
    assert.strictEqual(
      fixedAnswer,
      "Yolcular Ankara Garı'ndan trene binerken taze susamlı pideleri almışlardır.",
      "Model cevapta hem özel ad hem pider düzeltilmeli"
    );

    // Alternatif cevap düzeltmesi
    const fixedAlt = fixStimulusTranscriptionTypos(fixProperNounApostrophes(rawAlt), stimulus);
    assert.strictEqual(
      fixedAlt,
      "Ankara Garı'ndan binen yolcular fırından yeni çıkan pideleri ile karınlarını doyurmuştur.",
      "Alternatif cevapta hem özel ad hem pider düzeltilmeli"
    );
  });

  console.log('\n====================================================');
  console.log(`TOPLAM TEST: ${passCount + failCount}`);
  console.log(`BAŞARILI   : ${passCount}`);
  console.log(`BAŞARISIZ  : ${failCount}`);
  console.log('====================================================\n');

  if (failCount > 0) {
    process.exit(1);
  } else {
    console.log('>>> TÜM TASK 148 YAZIM VE ÖZEL AD DOĞRULAMA TESTLERİ BAŞARIYLA GEÇTİ! <<<');
  }
}

runAll().catch(err => {
  console.error("Test sırasında beklenmeyen hata:", err);
  process.exit(1);
});

