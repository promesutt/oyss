import { 
  generateMaterialPdfFileName, 
  getMaterialPdfFileNameWithExtension,
  formatGradeSegment,
  formatSubjectSegment,
  formatTermSegment,
  formatScenarioSegment,
  formatMaterialSuffix
} from '../src/utils/materialFileNameGenerator';

console.log('=== OYSS MATERYAL PDF ADLANDIRMA STANDARDI TESTLERİ BAŞLIYOR ===\n');

let passedTests = 0;
let failedTests = 0;

function assertEqual(actual: string, expected: string, testName: string) {
  if (actual === expected) {
    passedTests++;
    console.log(`[TEST ${passedTests < 10 ? '0' + passedTests : passedTests}] ✓ BAŞARILI - ${testName}`);
    console.log(`         Üretilen: "${actual}"`);
  } else {
    failedTests++;
    console.error(`[TEST HATA] ✗ BAŞARISIZ - ${testName}`);
    console.error(`         Beklenen: "${expected}"`);
    console.error(`         Alınan  : "${actual}"`);
  }
}

// 1. Hap Bilgi Çalışma Kâğıdı Testi (Kullanıcı Örneği 1)
const hapBilgiName = getMaterialPdfFileNameWithExtension({
  grade: 5,
  subjectId: 'matematik',
  examTerm: '1_donem_1_yazili',
  scenarioId: 'senaryo_4',
  materialKind: 'study_sheet'
});
assertEqual(
  hapBilgiName,
  '5_Sinif_Matematik_1_Donem_1_Yazili_Senaryo_4_Hap_Bilgi.pdf',
  'Hap Bilgi Çalışma Kâğıdı Standart Dosya Adı (Kullanıcı Örneği 1)'
);

// 2. İnfografik / Püf Noktalar Testi (Kullanıcı Örneği 2)
const infografikName = getMaterialPdfFileNameWithExtension({
  grade: 5,
  subjectId: 'matematik',
  examTerm: '1_donem_1_yazili',
  scenarioId: 'senaryo_4',
  materialKind: 'infographic'
});
assertEqual(
  infografikName,
  '5_Sinif_Matematik_1_Donem_1_Yazili_Senaryo_4_Infografik.pdf',
  'İnfografik / Püf Noktalar Standart Dosya Adı (Kullanıcı Örneği 2)'
);

// 3. MEB ÖDSGM Örnek Sınav Soru Kâğıdı Testi
const mebiSinavName = getMaterialPdfFileNameWithExtension({
  grade: 5,
  subjectId: 'matematik',
  examTerm: '1_donem_1_yazili',
  scenarioId: 'senaryo_4',
  materialKind: 'exam_paper',
  isCustomExam: false,
  isAnswerKey: false
});
assertEqual(
  mebiSinavName,
  '5_Sinif_Matematik_1_Donem_1_Yazili_Senaryo_4_MEB_ODSGM_Ornek_Sinav.pdf',
  'MEB ÖDSGM Örnek Sınav Soru Kâğıdı Standart Dosya Adı'
);

// 4. MEB ÖDSGM Örnek Sınav Cevap Anahtarı Testi
const mebiCevapName = getMaterialPdfFileNameWithExtension({
  grade: 5,
  subjectId: 'matematik',
  examTerm: '1_donem_1_yazili',
  scenarioId: 'senaryo_4',
  materialKind: 'exam_paper',
  isCustomExam: false,
  isAnswerKey: true
});
assertEqual(
  mebiCevapName,
  '5_Sinif_Matematik_1_Donem_1_Yazili_Senaryo_4_MEB_ODSGM_Ornek_Sinav_Cevap_Anahtari.pdf',
  'MEB ÖDSGM Örnek Sınav Cevap Anahtarı Standart Dosya Adı'
);

// 5. OYSS Özgün Sınav Soru Kâğıdı Testi
const ozgunSinavName = getMaterialPdfFileNameWithExtension({
  grade: 6,
  subjectId: 'fen_bilimleri',
  examTerm: '1_donem_1_yazili',
  scenarioId: 'senaryo_2',
  materialKind: 'exam_paper',
  isCustomExam: true,
  isAnswerKey: false
});
assertEqual(
  ozgunSinavName,
  '6_Sinif_Fen_Bilimleri_1_Donem_1_Yazili_Senaryo_2_OYSS_Ozgun_Sinav.pdf',
  'OYSS Özgün Sınav Soru Kâğıdı Standart Dosya Adı'
);

// 6. OYSS Özgün Sınav Cevap Anahtarı Testi
const ozgunCevapName = getMaterialPdfFileNameWithExtension({
  grade: 6,
  subjectId: 'fen_bilimleri',
  examTerm: '1_donem_1_yazili',
  scenarioId: 'senaryo_2',
  materialKind: 'exam_paper',
  isCustomExam: true,
  isAnswerKey: true
});
assertEqual(
  ozgunCevapName,
  '6_Sinif_Fen_Bilimleri_1_Donem_1_Yazili_Senaryo_2_OYSS_Ozgun_Sinav_Cevap_Anahtari.pdf',
  'OYSS Özgün Sınav Cevap Anahtarı Standart Dosya Adı'
);

// 7. Etkileşimli Sınav Sonuç ve Öz Değerlendirme Raporu Testi (MEB ÖDSGM)
const etkilesimliSonucName = getMaterialPdfFileNameWithExtension({
  grade: 7,
  subjectId: 'turkce',
  examTerm: '1_donem_1_yazili',
  scenarioId: 'senaryo_1',
  materialKind: 'interactive_exam',
  isCustomExam: false,
  isCompletedPractice: true
});
assertEqual(
  etkilesimliSonucName,
  '7_Sinif_Turkce_1_Donem_1_Yazili_Senaryo_1_MEB_ODSGM_Etkilesimli_Sonuc_Raporu.pdf',
  'Etkileşimli Sınav Sonuç ve Öz Değerlendirme Raporu Standart Dosya Adı'
);

// 8. Etkileşimli OYSS Özgün Sınav Çıktısı Testi
const etkilesimliOzgunName = getMaterialPdfFileNameWithExtension({
  grade: 8,
  subjectId: 'sosyal_bilgiler',
  examTerm: '1_donem_2_yazili',
  scenarioId: 'senaryo_3',
  materialKind: 'interactive_exam',
  isCustomExam: true,
  isCompletedPractice: false
});
assertEqual(
  etkilesimliOzgunName,
  '8_Sinif_Sosyal_Bilgiler_1_Donem_2_Yazili_Senaryo_3_OYSS_Ozgun_Sinav_Etkilesimli_Sinav.pdf',
  'Etkileşimli OYSS Özgün Sınav Çıktısı Standart Dosya Adı'
);

// 8b. OYSS Yapay Zekâ / Soru Üretim Modalı Özgün Sınav Testi (Kullanıcı Örneği)
const oyssOzgunMatName = getMaterialPdfFileNameWithExtension({
  grade: 5,
  subjectId: 'matematik',
  examTerm: '1_donem_1_yazili',
  scenarioId: 'senaryo_4',
  materialKind: 'exam_paper',
  isCustomExam: true,
  isAnswerKey: false
});
assertEqual(
  oyssOzgunMatName,
  '5_Sinif_Matematik_1_Donem_1_Yazili_Senaryo_4_OYSS_Ozgun_Sinav.pdf',
  'OYSS Matematik 5. Sınıf Özgün Sınavı Standart Dosya Adı'
);

// 9. Dinleme ve Konuşma Uygulama Kılavuzu (Senaryo uydurulmaması kuralı)
const speakingGuideName = getMaterialPdfFileNameWithExtension({
  grade: 5,
  subjectId: 'turkce',
  examTerm: '1_donem_1_yazili',
  scenarioId: 'senaryo_4', // Kılavuz senaryo içermediği için parametre verilse dahi senaryo uydurulmaz!
  materialKind: 'speaking_guide'
});
assertEqual(
  speakingGuideName,
  '5_Sinif_Turkce_1_Donem_1_Yazili_Konusma_ve_Dinleme_Kilavuzu.pdf',
  'Dinleme ve Konuşma Kılavuzu: Senaryo Uydurulmaması ve Doğru Bağlam Koruması'
);

// 10. İngilizce Dinleme ve Konuşma Kılavuzu Testi
const ingilizceGuideName = getMaterialPdfFileNameWithExtension({
  grade: 6,
  subjectId: 'ingilizce',
  examTerm: '1_donem_1_yazili',
  materialKind: 'speaking_guide'
});
assertEqual(
  ingilizceGuideName,
  '6_Sinif_Ingilizce_1_Donem_1_Yazili_Konusma_ve_Dinleme_Kilavuzu.pdf',
  'İngilizce Dinleme ve Konuşma Kılavuzu Standart Dosya Adı'
);

// 11. Din Kültürü ve Ahlak Bilgisi 8. Sınıf Hap Bilgi Testi
const dkabName = getMaterialPdfFileNameWithExtension({
  grade: 8,
  subjectId: 'din_kulturu',
  examTerm: '1_donem_1_yazili',
  scenarioId: 'senaryo_2',
  materialKind: 'study_sheet'
});
assertEqual(
  dkabName,
  '8_Sinif_Din_Kulturu_1_Donem_1_Yazili_Senaryo_2_Hap_Bilgi.pdf',
  'Din Kültürü 8. Sınıf Hap Bilgi Dosya Adı'
);

console.log('\n====================================================');
console.log(`TOPLAM TEST: ${passedTests + failedTests}`);
console.log(`BAŞARILI   : ${passedTests}`);
console.log(`BAŞARISIZ  : ${failedTests}`);
console.log('====================================================\n');

if (failedTests > 0) {
  process.exit(1);
}

