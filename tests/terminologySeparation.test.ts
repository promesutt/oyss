import { generateMEBIQuestions } from '../src/utils/aiGeneratorEngine';
import { MIDDLE_SCHOOL_OFFICIAL_SCENARIOS } from '../src/data/curriculumData';
import { getMaterialPdfFileNameWithExtension } from '../src/utils/materialFileNameGenerator';

console.log('=== OYSS FAZ 3.3.4: MEBİ VE OYSS ÖZGÜN SORU KAYNAĞI AYRIMI TESTLERİ ===\n');

let passedTests = 0;
let failedTests = 0;

function report(id: string, name: string, passed: boolean, detail: string) {
  if (passed) {
    passedTests++;
    console.log(`[TEST ${id}] ✓ BAŞARILI - ${name}`);
    console.log(`         Ayrıntı: ${detail}`);
  } else {
    failedTests++;
    console.error(`[TEST ${id}] ✗ BAŞARISIZ - ${name}`);
    console.error(`         Ayrıntı: ${detail}`);
  }
}

async function runTests() {
  // Test 1: aiGeneratorEngine fallback motor adlandırması OYSS merkezli ve MEBİ ölçme referanslıdır
  try {
    const scenario = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[5]?.turkce?.[0];
    const res = await generateMEBIQuestions('turkce', 5, scenario, 0);

    const hasOyssInModel = res.model.includes('OYSS Standart Soru Üretim Motoru');
    const hasMebiReference = res.model.includes('MEBİ Ölçme Referanslı');
    const isNotJustMebi = res.model !== 'MEBİ Kural Tabanlı Standart Motor';

    report(
      '01',
      'Yedek motor model adı "OYSS Standart Soru Üretim Motoru (MEBİ Ölçme Referanslı)" olarak yapılandırılmıştır',
      hasOyssInModel && hasMebiReference && isNotJustMebi,
      `model: "${res.model}"`
    );
  } catch (err: any) {
    report('01', 'Yedek motor model adı kontrolü', false, err.message);
  }

  // Test 2: aiGeneratorEngine fallbackReason MEBİ yerine OYSS kural motorunu belirtir
  try {
    const scenario = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[5]?.matematik?.[0];
    const res = await generateMEBIQuestions('matematik', 5, scenario, 0);

    const reason = res.fallbackReason || '';
    const hasOyss = reason.includes('OYSS') || reason.includes('kural tabanlı');
    const noMebiOzgunlestirme = !reason.includes('MEBİ özgünleştirme');

    report(
      '02',
      'Yedek motor açıklamasında "MEBİ özgünleştirme motoru" yerine "OYSS" ifadesi yer alır',
      hasOyss && noMebiOzgunlestirme,
      `fallbackReason: "${reason}"`
    );
  } catch (err: any) {
    report('02', 'Yedek motor açıklama kontrolü', false, err.message);
  }

  // Test 3: Soru çıktılarında learning outcome unvanı nötr 'Öğrenme Çıktısı' olarak çözümlenir (MEBİ Öğrenme Çıktısı uydurulmaz)
  try {
    const scenario = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[6]?.fen_bilimleri?.[0];
    const res = await generateMEBIQuestions('fen_bilimleri', 6, scenario, 0);

    const hasMebiPrefixInTitle = res.generatedQuestions.some(q => q.outcomeTitle === 'MEBİ Öğrenme Çıktısı');

    report(
      '03',
      'Soru öğrenme çıktısı başlıklarında "MEBİ Öğrenme Çıktısı" sahte etiketlemesi yer almaz',
      !hasMebiPrefixInTitle,
      `Örnek Çıktı Başlığı: "${res.generatedQuestions[0]?.outcomeTitle}"`
    );
  } catch (err: any) {
    report('03', 'Soru öğrenme çıktısı kontrolü', false, err.message);
  }

  // Test 4: PDF İsimlendirmesinde Bakanlık Sınavı "MEB_ODSGM_Ornek_Sinav" olarak adlandırılır
  const mebPdf = getMaterialPdfFileNameWithExtension({
    grade: 5,
    subjectId: 'matematik',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_4',
    materialKind: 'exam_paper',
    isCustomExam: false
  });
  report(
    '04',
    'Bakanlık/ÖDSGM örnek sınav PDF dosya adı "MEB_ODSGM_Ornek_Sinav" standardını kullanır',
    mebPdf.includes('MEB_ODSGM_Ornek_Sinav') && !mebPdf.includes('MEBI_Ornek_Sinav'),
    `Dosya: "${mebPdf}"`
  );

  // Test 5: PDF İsimlendirmesinde OYSS Yapay Zekâ / Özgün Sınavı "OYSS_Ozgun_Sinav" olarak adlandırılır
  const oyssPdf = getMaterialPdfFileNameWithExtension({
    grade: 5,
    subjectId: 'matematik',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_4',
    materialKind: 'exam_paper',
    isCustomExam: true
  });
  report(
    '05',
    'OYSS özgün sınav PDF dosya adı "OYSS_Ozgun_Sinav" standardını kullanır (Kullanıcı Talebi 5_Sinif_Matematik_1_Donem_1_Yazili_Senaryo_4_OYSS_Ozgun_Sinav.pdf)',
    oyssPdf === '5_Sinif_Matematik_1_Donem_1_Yazili_Senaryo_4_OYSS_Ozgun_Sinav.pdf',
    `Dosya: "${oyssPdf}"`
  );

  // Test 6: Cevap anahtarlarında da OYSS özgün ayrımı korunur
  const oyssCevapPdf = getMaterialPdfFileNameWithExtension({
    grade: 5,
    subjectId: 'matematik',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_4',
    materialKind: 'exam_paper',
    isCustomExam: true,
    isAnswerKey: true
  });
  report(
    '06',
    'OYSS özgün sınav cevap anahtarı PDF dosya adı "OYSS_Ozgun_Sinav_Cevap_Anahtari" standardını taşır',
    oyssCevapPdf === '5_Sinif_Matematik_1_Donem_1_Yazili_Senaryo_4_OYSS_Ozgun_Sinav_Cevap_Anahtari.pdf',
    `Dosya: "${oyssCevapPdf}"`
  );

  // Test 7: Etkileşimli sınav raporu dosya adında özgün sınav için OYSS, bakanlık sınavı için MEB_ODSGM ayrımı geçerlidir
  const mebInteractive = getMaterialPdfFileNameWithExtension({
    grade: 7,
    subjectId: 'turkce',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_1',
    materialKind: 'interactive_exam',
    isCustomExam: false,
    isCompletedPractice: true
  });
  const oyssInteractive = getMaterialPdfFileNameWithExtension({
    grade: 7,
    subjectId: 'turkce',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_1',
    materialKind: 'interactive_exam',
    isCustomExam: true,
    isCompletedPractice: true
  });
  report(
    '07',
    'Etkileşimli sınav sonuç raporlarında kaynak sahipliğine göre MEB_ODSGM veya OYSS_Ozgun_Sinav ayrımı yapılır',
    mebInteractive.includes('MEB_ODSGM_Etkilesimli_Sonuc_Raporu') && oyssInteractive.includes('OYSS_Ozgun_Sinav_Etkilesimli_Sonuc_Raporu'),
    `MEB: "${mebInteractive}", OYSS: "${oyssInteractive}"`
  );

  console.log('\n====================================================');
  console.log(`TOPLAM TEST: ${passedTests + failedTests}`);
  console.log(`BAŞARILI   : ${passedTests}`);
  console.log(`BAŞARISIZ  : ${failedTests}`);
  console.log('====================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTests();

