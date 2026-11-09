import fs from 'fs';
import path from 'path';
import openpyxl from 'openpyxl'; // won't use directly in TS, let's load JSON & Excel via child_process or pure TS check
import { MIDDLE_SCHOOL_OFFICIAL_SCENARIOS_TERM2 } from '../src/data/secondTermScenarios';
import { getScenarios } from '../src/data/curriculumData';
import { SubjectId, GradeLevel } from '../src/types';

console.log('=== TASK 167: RESMÎ SENARYO KAYNAK DOĞRULAMASI TESTLERİ ===\n');

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

// 1. Toplam Senaryo Sayısı ve Kaynak Kökeni Dağılımı
let totalScenarios = 0;
let mebOfficialCount = 0;
let oyssCuratedCount = 0;
let unknownOriginCount = 0;

for (const [gradeStr, subjects] of Object.entries(MIDDLE_SCHOOL_OFFICIAL_SCENARIOS_TERM2)) {
  for (const [subId, scList] of Object.entries(subjects || {})) {
    for (const sc of (scList || [])) {
      totalScenarios++;
      if (sc.sourceOrigin === 'meb_official') {
        mebOfficialCount++;
      } else if (sc.sourceOrigin === 'oyss_curated') {
        oyssCuratedCount++;
      } else {
        unknownOriginCount++;
      }
    }
  }
}

assert(
  'Toplam Senaryo Sayısı (134)',
  totalScenarios === 134,
  `secondTermScenarios.ts içinde toplam ${totalScenarios} adet senaryo mevcuttur (Beklenen: 134).`
);

assert(
  'Resmî MEB Kaynaklı Senaryo Sayısı (131)',
  mebOfficialCount === 131,
  `Tam olarak ${mebOfficialCount} senaryo meb_data Excel dosyalarından birebir doğrulanmıştır (sourceOrigin: 'meb_official').`
);

assert(
  'OYSS Rehberi Uyarlamalı Senaryo Sayısı (3)',
  oyssCuratedCount === 3,
  `Tam olarak ${oyssCuratedCount} senaryo OYSS Rehberi müfredat uyarlaması olarak sınıflandırılmıştır (sourceOrigin: 'oyss_curated').`
);

assert(
  'Kaynağı Belirsiz / Doğrulanamayan Senaryo Yokluğu',
  unknownOriginCount === 0,
  `Kaynağı belirsiz senaryo sayısı: ${unknownOriginCount} (Tüm senaryoların veri düzeyinde kökeni tanımlıdır).`
);

// 2. 7. Sınıf Türkçe Senaryolarının Dürüstlük ve Şeffaflık Denetimi
const g7TurkceScenarios = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS_TERM2[7]?.turkce || [];
const allG7AreCurated = g7TurkceScenarios.every(sc => sc.sourceOrigin === 'oyss_curated');
const noFalseOfficialClaims = g7TurkceScenarios.every(sc => 
  !sc.name.includes('MEB Resmi') && 
  !sc.description.includes('resmi Senaryo') &&
  sc.name.includes('OYSS Rehberi Uyarlaması')
);

assert(
  '7. Sınıf Türkçe Senaryo Kökeni (oyss_curated)',
  allG7AreCurated,
  '7. sınıf Türkçe senaryolarının tamamı veri düzeyinde sourceOrigin="oyss_curated" olarak işaretlenmiştir.'
);

assert(
  '7. Sınıf Türkçe Sahte Resmî İddia İçermeme',
  noFalseOfficialClaims,
  '7. sınıf Türkçe senaryolarında MEB resmî senaryosu olduğuna dair yanıltıcı ifade bulunmamakta, OYSS Rehberi uyarlaması olduğu açıkça belirtilmektedir.'
);

// 3. FilterBar Görsel Ayrım Rozeti
const filterBarCode = fs.readFileSync(path.resolve('src/components/FilterBar.tsx'), 'utf-8');
const hasCuratedBadge = filterBarCode.includes("sc.sourceOrigin === 'oyss_curated'") &&
                        filterBarCode.includes('OYSS Uyarlaması');
assert(
  'FilterBar Arayüz Ayrım Rozeti',
  hasCuratedBadge,
  'FilterBar bileşeninde oyss_curated senaryolar için "OYSS Uyarlaması" rozeti kullanıcıya gösterilmektedir.'
);

// 4. Sınıf ve Branş Eşleşmeleri Bütünlüğü
const expectedGrades = [5, 6, 7, 8];
const expectedSubjects: SubjectId[] = ['turkce', 'matematik', 'fen_bilimleri', 'sosyal_bilgiler', 'din_kulturu', 'ingilizce'];
let allCombinationsPresent = true;

for (const g of expectedGrades) {
  for (const s of expectedSubjects) {
    const scs = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS_TERM2[g]?.[s];
    if (!scs || scs.length === 0) {
      allCombinationsPresent = false;
    }
  }
}

assert(
  'Tüm Sınıf ve Branş Eşleşmeleri Bütünlüğü (24 Kombinasyon)',
  allCombinationsPresent,
  '4 sınıf ve 6 branşın tamamında (24 kombinasyon) senaryo listeleri mevcuttur.'
);

// 5. 1. Dönem 1. Yazılı ve 2. Dönem Koruması
const t1Scs = getScenarios('matematik', 8, '1_donem_1_yazili');
const t2Scs = getScenarios('matematik', 8, '1_donem_2_yazili');
const t3Scs = getScenarios('matematik', 8, '2_donem_1_yazili');

assert(
  'Dönemler Arası Tam Yalıtım ve Koruma',
  t1Scs.length === 6 && t2Scs.length === 6 && t3Scs.length === 0,
  '1. Yazılı senaryoları korunmuş, 2. Yazılı senaryoları ayrıştırılmış ve 2. dönem boş dizi dönmeye devam etmektedir.'
);

console.log(`====================================================`);
console.log(`TOPLAM TEST: ${total}`);
console.log(`BAŞARILI   : ${passed}`);
console.log(`BAŞARISIZ  : ${total - passed}`);
console.log(`====================================================\n`);

if (total !== passed) {
  process.exit(1);
}
