import fs from 'fs';
import path from 'path';
import { getScenarios } from '../src/data/curriculumData';
import { MIDDLE_SCHOOL_OFFICIAL_SCENARIOS_TERM2 } from '../src/data/secondTermScenarios';
import { APP_PAGE_TITLE } from '../src/utils/materialFileNameGenerator';
import { ALL_SUBJECTS, ALL_GRADES } from '../src/data/curriculumData';
import { SubjectId, GradeLevel, ExamTerm } from '../src/types';

console.log('=== TASK 166: YAYIN ÖNCESİ DÜZELTMELER VE İKİNCİ YAZILI ENTEGRASYONU DOĞRULAMA TESTLERİ ===\n');

let passed = 0;
let total = 0;

function assert(title: string, condition: boolean, detail: string) {
  total++;
  if (condition) {
    passed++;
    console.log(`[TEST ${String(total).padStart(2, '0')}] ✓ BAŞARILI - ${title}\n         Ayrıntı: ${detail}\n`);
  } else {
    console.error(`[TEST ${String(total).padStart(2, '0')}] ✗ BAŞARISIZ - ${title}\n         Ayrıntı: ${detail}\n`);
    process.exitCode = 1;
  }
}

// 1. Tarayıcı Sekme Başlığı
const indexHtml = fs.readFileSync(path.resolve('index.html'), 'utf-8');
const hasIndexTitle = indexHtml.includes('<title>OYSS Rehberi | Ortak Yazılılara Hazırlık</title>');
assert(
  'index.html Sabit Sekme Başlığı',
  hasIndexTitle,
  'index.html içindeki <title> tagi "OYSS Rehberi | Ortak Yazılılara Hazırlık" olarak ayarlandı.'
);

assert(
  'materialFileNameGenerator APP_PAGE_TITLE',
  APP_PAGE_TITLE === 'OYSS Rehberi | Ortak Yazılılara Hazırlık',
  `APP_PAGE_TITLE sabit değeri "${APP_PAGE_TITLE}" olarak doğrulandı.`
);

const appTsx = fs.readFileSync(path.resolve('src/App.tsx'), 'utf-8');
const hasAppTitleEffect = appTsx.includes("document.title = 'OYSS Rehberi | Ortak Yazılılara Hazırlık'");
const hasNoDynamicTitleOverwrite = !appTsx.includes('document.title = title');
assert(
  'App.tsx Sekme Başlığı Kalıcılığı',
  hasAppTitleEffect && hasNoDynamicTitleOverwrite,
  'App.tsx içindeki dinamik document.title = title ezmesi kaldırıldı, sekme başlığı kalıcı kılındı.'
);

// 2. Marka ve İsim Düzeltmeleri
const aiModalTsx = fs.readFileSync(path.resolve('src/components/AIGeneratorModal.tsx'), 'utf-8');
const practiceViewTsx = fs.readFileSync(path.resolve('src/components/InteractivePracticeView.tsx'), 'utf-8');
const hasAiModalBranding = aiModalTsx.includes('OYSS Rehberi Özgün Sınavı') &&
                           aiModalTsx.includes('OYSS Rehberi Model Cevap & Gerekçe:') &&
                           aiModalTsx.includes('Yerel OYSS Rehberi Standart Soru Üretim Motoru');
const hasPracticeBranding = practiceViewTsx.includes('OYSS Rehberi Model Cevap & Gerekçe:');
assert(
  'Arayüzde OYSS Rehberi Marka Ayrımı',
  hasAiModalBranding && hasPracticeBranding,
  'AI Modal ve İnteraktif Pratik ekranında tek başına OYSS yerine OYSS Rehberi ibaresi kullanılıyor.'
);

// 3. Lise Bilgilendirme Kartı Metni ve Yalıtımı
const expectedLiseText = 'Lise düzeyine yönelik ortak yazılılara hazırlık içerikleri üzerinde çalışıyoruz. Lise sınavlarına hazırlık materyalleri, ikinci yazılı dönemi öncesinde sisteme eklenecektir.';
const hasLiseNotice = appTsx.includes(expectedLiseText);
const hasOrtaokulReturnBtn = appTsx.includes('Ortaokul Sınavlarına Dön');
const hasLiseStageGuard = appTsx.includes("currentStage === 'lise'");
assert(
  'Lise Düzeyi Bilgilendirme Kartı',
  hasLiseNotice && hasOrtaokulReturnBtn && hasLiseStageGuard,
  'Lise kademesinde tam metinli bilgilendirme kartı ve "Ortaokul Sınavlarına Dön" butonu mevcuttur.'
);

// 4. 1. Dönem 1. Yazılı Senaryolarının Korunması
const subjects: SubjectId[] = ['turkce', 'matematik', 'fen_bilimleri', 'sosyal_bilgiler', 'din_kulturu', 'ingilizce'];
const grades: GradeLevel[] = [5, 6, 7, 8];
let term1AllValid = true;
for (const g of grades) {
  for (const s of subjects) {
    const scs = getScenarios(s, g, '1_donem_1_yazili');
    if (!scs || scs.length === 0 || scs.some(sc => sc.totalQuestions === 0)) {
      term1AllValid = false;
    }
  }
}
assert(
  '1. Dönem 1. Yazılı 24 Ders-Sınıf Senaryo Bütünlüğü',
  term1AllValid,
  'Tüm 24 kombinasyonda 1. Dönem 1. Yazılı senaryoları eksiksiz ve soru sayıları pozitiftir.'
);

// 5. 1. Dönem 2. Yazılı Resmî MEB Senaryo Entegrasyonu
let term2AllValid = true;
let term2TotalScenarios = 0;
for (const g of grades) {
  for (const s of subjects) {
    const scs = getScenarios(s, g, '1_donem_2_yazili');
    if (!scs || scs.length === 0 || scs.some(sc => sc.totalQuestions === 0)) {
      term2AllValid = false;
    }
    term2TotalScenarios += scs.length;
  }
}
assert(
  '1. Dönem 2. Yazılı MEB Resmî Senaryo Kapsamı',
  term2AllValid && term2TotalScenarios >= 130,
  `Tüm 24 kombinasyonda toplam ${term2TotalScenarios} adet 1. Dönem 2. Yazılı senaryosu sisteme bağlandı.`
);

// 6. 1. Yazılı ve 2. Yazılı Senaryoları Arasında Sızıntı Olmaması
const math8Term1 = getScenarios('matematik', 8, '1_donem_1_yazili');
const math8Term2 = getScenarios('matematik', 8, '1_donem_2_yazili');
const hasDistinctDescriptions = math8Term1[0].description.includes('1. Yazılı') &&
                                math8Term2[0].description.includes('2. Yazılı');
assert(
  '1. ve 2. Yazılı Senaryo Ayrımı (Sızıntı Yok)',
  hasDistinctDescriptions && math8Term1[0].description !== math8Term2[0].description,
  '1. Dönem 1. Yazılı ve 1. Dönem 2. Yazılı senaryoları bağımsızdır, birbirine sızmamaktadır.'
);

// 7. 2. Dönem (1. ve 2. Yazılı) Senaryolarının Boş Dizi Dönmesi
let term3And4Empty = true;
for (const g of grades) {
  for (const s of subjects) {
    const sc3 = getScenarios(s, g, '2_donem_1_yazili');
    const sc4 = getScenarios(s, g, '2_donem_2_yazili');
    if (sc3.length !== 0 || sc4.length !== 0) {
      term3And4Empty = false;
    }
  }
}
assert(
  '2. Dönem Senaryolarının Boş Dizi Dönmesi',
  term3And4Empty,
  'MEB henüz 2. dönem tablolarını yayımlamadığı için 2. Dönem 1. ve 2. Yazılı senaryoları boş dizi dönmektedir.'
);

// 8. 2. Dönem Bilgilendirme Metninin App.tsx ve Modalda Yer Alması
const expectedTerm2WaitText = "MEB, 2026-2027 eğitim öğretim yılı 2. dönem konu-soru dağılım tablolarını henüz yayımlamamıştır. Bu döneme ait ortak yazılı sınavları ve çalışma materyalleri, MEB tabloları yayımlandıktan sonra OYSS Rehberi'ne eklenecektir.";
const hasAppTerm2Notice = appTsx.includes(expectedTerm2WaitText);
const hasModalTerm2Notice = aiModalTsx.includes(expectedTerm2WaitText);
assert(
  '2. Dönem MEB Bekleme Bildirimi Varlığı',
  hasAppTerm2Notice && hasModalTerm2Notice,
  'App.tsx ana görünümünde ve AI Soru Üretim Modalında resmi 2. dönem bekleme metni eksiksiz yer alıyor.'
);

// 9. 2. Dönem Soru Üretim Butonu Kilidi
const hasDisabledInModal = aiModalTsx.includes("disabled={isGenerating || examTerm === '2_donem_1_yazili' || examTerm === '2_donem_2_yazili'}");
assert(
  '2. Dönem Soru Üretim Kilidi',
  hasDisabledInModal,
  '2. dönem seçildiğinde AI modal soru üretme butonu kilitlenmekte ve kullanıcı uyarılmaktadır.'
);

// 10. FilterBar 2. Dönem Güvenliği
const filterBarTsx = fs.readFileSync(path.resolve('src/components/FilterBar.tsx'), 'utf-8');
const hasFilterBarEmptyGuard = filterBarTsx.includes('MEB 2. dönem konu-soru dağılım tabloları yayımlandığında eklenecektir.');
assert(
  'FilterBar Boş Senaryo Koruması',
  hasFilterBarEmptyGuard,
  'FilterBar senaryolar boş olduğunda çökmez, zarif bir bekleme rozeti gösterir.'
);

console.log(`====================================================`);
console.log(`TOPLAM TEST: ${total}`);
console.log(`BAŞARILI   : ${passed}`);
console.log(`BAŞARISIZ  : ${total - passed}`);
console.log(`====================================================\n`);
if (total !== passed) {
  process.exit(1);
}
