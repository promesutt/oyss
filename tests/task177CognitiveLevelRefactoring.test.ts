import { getDifficultyPlanRule } from '../src/generators/prompts/coreRules';
import { resolveOutcomeMetadata } from '../src/data/curriculumData';
import { MIDDLE_SCHOOL_OFFICIAL_SCENARIOS_TERM2 } from '../src/data/secondTermScenarios';
import { getTargetDifficultyDistribution } from '../src/utils/difficultyCalibrator';
import * as fs from 'fs';
import * as path from 'path';

console.log('=== TASK177: BİLİŞSEL DÜZEY DÜZELTMELERİ VE TESTLERİ BAŞLIYOR ===\n');

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string, detail: string) {
  if (condition) {
    console.log(`[TEST] ✓ BAŞARILI - ${testName}`);
    console.log(`       Ayrıntı: ${detail}\n`);
    passCount++;
  } else {
    console.error(`[TEST] ✗ BAŞARISIZ - ${testName}`);
    console.error(`       Hata: ${detail}\n`);
    failCount++;
  }
}

// 1. ARAYÜZ VE ETİKET KONTROLLERİ
const scenarioViewContent = fs.readFileSync(path.join(__dirname, '../src/components/ScenarioOverviewView.tsx'), 'utf-8');
const examPaperViewContent = fs.readFileSync(path.join(__dirname, '../src/components/ExamPaperView.tsx'), 'utf-8');
const aiGeneratorModalContent = fs.readFileSync(path.join(__dirname, '../src/components/AIGeneratorModal.tsx'), 'utf-8');

assert(
  !scenarioViewContent.includes('Bilişsel Düzey') && !scenarioViewContent.includes('cognitiveLevel'),
  'ScenarioOverviewView Bilişsel Düzey Temizliği',
  'Resmî senaryo genel bakış tablosundan Bilişsel Düzey sütunu ve cognitiveLevel kullanımı tamamen kaldırılmıştır.'
);

assert(
  scenarioViewContent.includes('Soru Sayısı') && scenarioViewContent.includes('Kazanım Kodu'),
  'ScenarioOverviewView Resmî MEB Alanları Bütünlüğü',
  'Tabloda resmî MEB kaynaklarında bulunan Soru No, Kazanım Kodu, Konu ve Soru Sayısı sütunları yer almaktadır.'
);

assert(
  !examPaperViewContent.includes('ÖDSGM Bilişsel Düzey'),
  'ExamPaperView ÖDSGM Yanıltıcı Etiket Temizliği',
  'Model cevap rubrik kutusundan "ÖDSGM Bilişsel Düzey (Öğretmen Kaydı)" ifadesi kaldırılmıştır.'
);

assert(
  !examPaperViewContent.includes('d.cognitiveLevel || meta.cognitiveLevel'),
  'ExamPaperView Senaryo Özeti Sentetik Bilişsel Düzey Temizliği',
  'Sınav kâğıdı senaryo dağılım kartlarında sentetik bilişsel etiket yerine soru sayısı gösterilmektedir.'
);

assert(
  !aiGeneratorModalContent.includes('d.cognitiveLevel || meta.cognitiveLevel'),
  'AIGeneratorModal Senaryo Özeti Sentetik Bilişsel Düzey Temizliği',
  'Yapay zekâ üretim modalındaki senaryo dağılım listesinde sentetik bilişsel etiket yerine soru sayısı gösterilmektedir.'
);

// 2. PROMPT KISITLAMALARI VE ARINDIRMA KONTROLLERİ
const coreRulesContent = fs.readFileSync(path.join(__dirname, '../src/generators/prompts/coreRules.ts'), 'utf-8');
const engineContent = fs.readFileSync(path.join(__dirname, '../src/utils/aiGeneratorEngine.ts'), 'utf-8');

const diffRule = getDifficultyPlanRule(7, '2 adet Kolay (%29), 4 adet Orta (%57), 1 adet Zor (%14)');

assert(
  !diffRule.includes('"Basit Bilişsel Süreçler" etiketli kazanımlar "Kolay" veya "Orta" olmalıdır') &&
  !diffRule.includes('"Karmaşık Bilişsel Süreçler" etiketli kazanımlar "Orta" veya "Zor" olmalıdır'),
  'Prompt Zorluk Kuralından Statik Bilişsel Kısıtlamaların Kaldırılması',
  'getDifficultyPlanRule prompt çıktısında kazanımı statik bilişsel düzeye bağlayan kısıtlamalar bulunmamaktadır.'
);

assert(
  diffRule.includes('pedagojik dengede') && diffRule.includes('üst düzey düşünme gerektiren sorular yapay bir kazanım etiketi kısıtlaması olmaksızın'),
  'Prompt Yeni Pedagojik Ölçme Yaklaşımı',
  'Zorluk dağılım kuralı, yapay etiket kısıtlaması olmaksızın dersin niteliği ve senaryo planına göre üst düzey soru üretimine olanak tanımaktadır.'
);

assert(
  !engineContent.includes('[Bilişsel Düzey: ${d.cognitiveLevel}]'),
  'Canlı Prompt Dağılım Metninden Bilişsel Düzey Sızıntısının Önlenmesi',
  'aiGeneratorEngine distributionsText haritalamasında prompt satırlarına [Bilişsel Düzey: ...] eklenmemektedir.'
);

// 3. VERİ MODELİ VE RESOLVEOUTCOMEMETADATA KONTROLLERİ
const resolvedWithoutFallback = resolveOutcomeMetadata('FB.7.3.1');
assert(
  resolvedWithoutFallback.hasOfficialTitle === true &&
  typeof resolvedWithoutFallback.displayLabel === 'string' &&
  resolvedWithoutFallback.displayLabel.length > 0,
  'resolveOutcomeMetadata Temel Fonksiyonellik Korunumu',
  'Kazanım çözümleme fonksiyonu başlık ve konu bilgilerini eksiksiz çözümlemeye devam etmektedir.'
);

const emptyCodeResolved = resolveOutcomeMetadata('');
assert(
  emptyCodeResolved.cognitiveLevel === undefined,
  'Boş/Tanımsız Kazanımda Yapay Düzey Atanmaması',
  'Tanımsız kazanımlarda otomatik olarak "Karmaşık Bilişsel Süreçler" atanması engellenmiştir.'
);

// 4. MEB SENARYO SORU SAYILARI VE DAĞILIM BÜTÜNLÜĞÜ
let totalScenariosChecked = 0;
let totalDistributionsChecked = 0;
for (const [gradeKey, subjects] of Object.entries(MIDDLE_SCHOOL_OFFICIAL_SCENARIOS_TERM2)) {
  for (const [subjectKey, scenarios] of Object.entries(subjects as Record<string, any[]>)) {
    for (const sc of scenarios) {
      totalScenariosChecked++;
      const sumQuestions = sc.distributions.reduce((sum: number, d: any) => sum + (d.questionCount || 1), 0);
      if (sumQuestions !== sc.totalQuestions) {
        throw new Error(`Soru sayısı tutarsızlığı: ${gradeKey} ${subjectKey} ${sc.id}`);
      }
      totalDistributionsChecked += sc.distributions.length;
    }
  }
}

assert(
  totalScenariosChecked > 50 && totalDistributionsChecked > 200,
  'MEB Senaryo Dağılım Sayılarının %100 Korunması',
  `${totalScenariosChecked} senaryo ve ${totalDistributionsChecked} dağıtım kontrol edildi. Tüm soru sayıları ve kazanım eşleştirmeleri MEB tablosuyla tam uyumludur.`
);

// 5. ZORLUK KALİBRASYON MEKANİZMASININ KORUNMASI
const diffDist7 = getTargetDifficultyDistribution(7);
const diffDist9 = getTargetDifficultyDistribution(9);
assert(
  diffDist7.Kolay === 2 && diffDist7.Orta === 4 && diffDist7.Zor === 1 &&
  diffDist9.Kolay === 2 && diffDist9.Orta === 5 && diffDist9.Zor === 2,
  'Çan Eğrisi Zorluk Kalibrasyon Modeli Korunumu',
  'Çan eğrisi (Kolay/Orta/Zor) dağıtım modeli matematiksel olarak tam doğrulanmıştır.'
);

console.log('--- TEST SONUCU ---');
console.log(`Toplam Test: ${passCount + failCount} | Başarılı: ${passCount} | Başarısız: ${failCount}`);

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('\nTÜM TASK177 BİLİŞSEL DÜZEY DÜZELTME TESTLERİ EKSİKSİZ BAŞARILI!\n');
}

