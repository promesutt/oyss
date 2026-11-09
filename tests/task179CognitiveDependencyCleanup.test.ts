import { calibrateQuestionDifficulties, getTargetDifficultyDistribution } from '../src/utils/difficultyCalibrator';
import { getJsonOutputSchema } from '../src/generators/prompts/outputSchema';
import { repairJsonKaTeX } from '../src/utils/jsonParser';
import * as fs from 'fs';
import * as path from 'path';

console.log('=== TASK179: ESKİ BİLİŞSEL DÜZEY BAĞIMLILIKLARININ TEMİZLİĞİ VE REGRESYON TESTLERİ BAŞLIYOR ===\n');

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

// -------------------------------------------------------------
// 1. AYNI SORU LİSTESİNDE COGNITIVELEVEL DEĞİŞİKLİĞİNİN ETKİSİZLİĞİ TESTİ
// -------------------------------------------------------------
const baseQuestions = [
  { id: 1, outcomeCode: 'FB.7.1.1', questionText: 'Soru 1', difficulty: undefined as any },
  { id: 2, outcomeCode: 'FB.7.1.2', questionText: 'Soru 2', difficulty: undefined as any },
  { id: 3, outcomeCode: 'FB.7.2.1', questionText: 'Soru 3', difficulty: undefined as any },
  { id: 4, outcomeCode: 'FB.7.2.2', questionText: 'Soru 4', difficulty: undefined as any },
  { id: 5, outcomeCode: 'FB.7.3.1', questionText: 'Soru 5', difficulty: undefined as any },
  { id: 6, outcomeCode: 'FB.7.3.2', questionText: 'Soru 6', difficulty: undefined as any },
  { id: 7, outcomeCode: 'FB.7.3.3', questionText: 'Soru 7', difficulty: undefined as any },
];

// Senaryo A: Tüm sorular "Basit Bilişsel Süreçler"
const listA = baseQuestions.map(q => ({ ...q, cognitiveLevel: 'Basit Bilişsel Süreçler' }));
// Senaryo B: Tüm sorular "Karmaşık Bilişsel Süreçler"
const listB = baseQuestions.map(q => ({ ...q, cognitiveLevel: 'Karmaşık Bilişsel Süreçler' }));
// Senaryo C: Karışık ve ters dağıtılmış bilişsel düzeyler (örn: ilk soru Karmaşık, son soru Basit)
const listC = baseQuestions.map((q, idx) => ({
  ...q,
  cognitiveLevel: idx % 2 === 0 ? 'Karmaşık Bilişsel Süreçler' : 'Basit Bilişsel Süreçler'
}));
// Senaryo D: cognitiveLevel tamamen tanımsız (undefined)
const listD = baseQuestions.map(q => ({ ...q, cognitiveLevel: undefined }));

const resA = calibrateQuestionDifficulties(listA);
const resB = calibrateQuestionDifficulties(listB);
const resC = calibrateQuestionDifficulties(listC);
const resD = calibrateQuestionDifficulties(listD);

const diffsA = resA.map(q => q.difficulty);
const diffsB = resB.map(q => q.difficulty);
const diffsC = resC.map(q => q.difficulty);
const diffsD = resD.map(q => q.difficulty);

const isIdentical = 
  JSON.stringify(diffsA) === JSON.stringify(diffsB) &&
  JSON.stringify(diffsA) === JSON.stringify(diffsC) &&
  JSON.stringify(diffsA) === JSON.stringify(diffsD);

assert(
  isIdentical,
  'Kriter 1: cognitiveLevel Bağımsızlığı Doğrulaması',
  `Yalnızca cognitiveLevel değiştirilen (tümü Basit, tümü Karmaşık, zıt karışık, undefined) listelerin tamamı birebir aynı zorluk sıralamasını üretmiştir: [${diffsA.join(', ')}]`
);

// -------------------------------------------------------------
// 2. ÇAN EĞRİSİ HEDEF YÜZDELERİNİN KORUNMASI TESTİ
// -------------------------------------------------------------
const n = 7;
const target = getTargetDifficultyDistribution(n); // Kolay: 2, Orta: 4, Zor: 1
const kolayCount = resA.filter(q => q.difficulty === 'Kolay').length;
const ortaCount = resA.filter(q => q.difficulty === 'Orta').length;
const zorCount = resA.filter(q => q.difficulty === 'Zor').length;

assert(
  kolayCount === target.Kolay && ortaCount === target.Orta && zorCount === target.Zor,
  'Kriter 2: Çan Eğrisi Hedef Zorluk Yüzdelerinin Korunması',
  `7 soruluk sınavda beklenen (${target.Kolay} Kolay, ${target.Orta} Orta, ${target.Zor} Zor), elde edilen: (${kolayCount} Kolay, ${ortaCount} Orta, ${zorCount} Zor)`
);

// -------------------------------------------------------------
// 3. SINAV BAŞI VE SONU PEDAGOJİK YERLEŞİM TESTİ
// -------------------------------------------------------------
const firstQuestionEasy = resA[0].difficulty === 'Kolay';
const lastQuestionHard = resA[resA.length - 1].difficulty === 'Zor';

assert(
  firstQuestionEasy && lastQuestionHard,
  'Kriter 3: Kolay Soruların Başta, Zor Soruların Sonda Konumlanması',
  `1. Soru zorluğu: "${resA[0].difficulty}" (Kolay), Son Soru (${resA.length}. Soru) zorluğu: "${resA[resA.length - 1].difficulty}" (Zor). Pedagojik akış tam sağlanmaktadır.`
);

// -------------------------------------------------------------
// 4. EKSİK VEYA TANIMSIZ BİLİŞSEL DÜZEYLE ÜRETİM BÜTÜNLÜĞÜ
// -------------------------------------------------------------
const emptyCognitiveItems = [
  { id: 101, outcomeCode: 'MAT.7.1.1' },
  { id: 102, outcomeCode: 'MAT.7.1.2' },
  { id: 103, outcomeCode: 'MAT.7.2.1' },
  { id: 104, outcomeCode: 'MAT.7.2.2' },
  { id: 105, outcomeCode: 'MAT.7.3.1' },
];
const resEmpty = calibrateQuestionDifficulties(emptyCognitiveItems as any);
assert(
  resEmpty.length === 5 && resEmpty.every(q => Boolean(q.difficulty)),
  'Kriter 4: Eksik Bilişsel Düzey Alanıyla Sorunsuz Çalışma',
  `cognitiveLevel alanı hiç bulunmayan 5 soru nesnesi hatasız kalibre edilmiştir: [${resEmpty.map(q => q.difficulty).join(', ')}]`
);

// -------------------------------------------------------------
// 5. OUTPUTSCHEMA'DA BASİT/KARMAŞIK BİLİŞSEL SÜREÇLER TEMİZLİĞİ
// -------------------------------------------------------------
const schemaQualityFalse = getJsonOutputSchema(true, false);
const schemaQualityTrue = getJsonOutputSchema(true, true);

const hasKarmaşık = schemaQualityFalse.includes('Karmaşık Bilişsel Süreçler') || schemaQualityTrue.includes('Karmaşık Bilişsel Süreçler');
const hasBasit = schemaQualityFalse.includes('Basit Bilişsel Süreçler') || schemaQualityTrue.includes('Basit Bilişsel Süreçler');

assert(
  !hasKarmaşık && !hasBasit,
  'Kriter 5: outputSchema Bilişsel Düzey Örnek Değer Temizliği',
  'getJsonOutputSchema çıktısında ne "Karmaşık Bilişsel Süreçler" ne de "Basit Bilişsel Süreçler" yer almaktadır. Tarafsız "Kavramsal Uygulama ve Problem Çözme" kullanılmaktadır.'
);

// -------------------------------------------------------------
// 6. JSON AYRIŞTIRMA VE LEVEL ALANININ GERİYE DÖNÜK UYUMLULUĞU
// -------------------------------------------------------------
const mockGeminiResponse = JSON.stringify({
  questions: [
    {
      number: 1,
      outcome: 'MAT.7.1.1',
      outcomeTitle: 'Tam Sayılarla Çarpma',
      difficulty: 'Kolay',
      level: 'Kavramsal Uygulama ve Problem Çözme',
      templateType: 'Kurgusal Senaryo',
      points: 15,
      stimulus: 'Bir dalgıç denize dalmaktadır...',
      question: 'Dalgıcın derinliği kaç metredir?',
      answer: 'Model cevap: -12 metredir.',
      rubric: [{ item: 'İşlem', pts: 15 }]
    }
  ]
});

const repaired = repairJsonKaTeX(mockGeminiResponse);
const parsed = JSON.parse(repaired);
assert(
  parsed.questions && parsed.questions[0].level === 'Kavramsal Uygulama ve Problem Çözme',
  'Kriter 6: JSON Parser ve Geriye Dönük Uyumluluk Doğrulaması',
  'Gemini modelinden dönen tarafsız level alanı JSON ayrıştırıcı tarafından eksiksiz okunmakta ve korunmaktadır.'
);

// -------------------------------------------------------------
// 7. ÖĞRETMENİN ÜST DÜZEY BECERİ TERCİHİNİN KORUNMASI
// -------------------------------------------------------------
const modalFileContent = fs.readFileSync(path.join(__dirname, '../src/components/AIGeneratorModal.tsx'), 'utf-8');
const hasTeacherPreferenceOption = modalFileContent.includes('value="more_complex"');

assert(
  hasTeacherPreferenceOption,
  'Kriter 7: Öğretmenin Üst Düzey Beceri Seçeneğinin Korunumu',
  'AIGeneratorModal arayüzünde öğretmenin sınavı "Karmaşık Bilişsel / Üst Düzey Beceri" odaklı üretme tercihi meşru ve bağımsız bir seçenek olarak korunmaktadır.'
);

// -------------------------------------------------------------
// 8. DIFFICULTYCALIBRATOR KAYNAK KODUNDA COGNITIVELEVEL HESABI KALMADIĞININ STATİK KANITI
// -------------------------------------------------------------
const calibratorCode = fs.readFileSync(path.join(__dirname, '../src/utils/difficultyCalibrator.ts'), 'utf-8');
assert(
  !calibratorCode.includes('isSimple') &&
  !calibratorCode.includes('karmasikCandidates') &&
  !calibratorCode.includes('basitCandidates'),
  'Kriter 8: difficultyCalibrator İçinde Bilişsel Sınıflandırma Mantığı Temizliği',
  'calibrateQuestionDifficulties fonksiyon gövdesinde isSimple, karmasikCandidates veya basitCandidates hesaplamaları tamamen kaldırılmıştır.'
);

console.log('--- TEST SONUCU ---');
console.log(`Toplam Test: ${passCount + failCount} | Başarılı: ${passCount} | Başarısız: ${failCount}`);

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('\nTÜM TASK179 ESKİ BİLİŞSEL DÜZEY BAĞIMLILIK TEMİZLİĞİ TESTLERİ EKSİKSİZ BAŞARILI!\n');
}

