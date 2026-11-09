import {
  buildLiveExamPrompt,
  buildGrade7ScienceDirectives,
  buildGrade7MathDirectives,
  getDirectiveClarityRule,
  QUESTION_DIRECTIVE_CLARITY_RULE,
  GRADE_7_SCIENCE_OUTCOME_DICTIONARY,
  GRADE_7_MATH_OUTCOME_DICTIONARY
} from '../src/generators/prompts';
import { MIDDLE_SCHOOL_OFFICIAL_SCENARIOS_TERM2 } from '../src/data/secondTermScenarios';
import { resolveOutcomeMetadata } from '../src/data/curriculumData';

console.log('=== TASK174: DİNAMİK KAZANIM FİLTRELEME VE PROMPT OPTİMİZASYON TESTLERİ BAŞLIYOR ===\n');

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string, detail: string) {
  if (condition) {
    console.log(`[TEST ${String(passCount + failCount + 1).padStart(2, '0')}] ✓ BAŞARILI - ${testName}`);
    console.log(`         Ayrıntı: ${detail}\n`);
    passCount++;
  } else {
    console.error(`[TEST ${String(passCount + failCount + 1).padStart(2, '0')}] ✗ BAŞARISIZ - ${testName}`);
    console.error(`         Ayrıntı: ${detail}\n`);
    failCount++;
  }
}

// TEST 1: 7. Sınıf Fen Bilimleri Senaryo 1 Dinamik Kazanım Filtreleme
console.log('--- BÖLÜM 1: 7. SINIF FEN BİLİMLERİ DİNAMİK KAZANIM FİLTRELEME ---');
{
  const sc1Codes = ['FB.7.2.2', 'FB.7.2.3', 'FB.7.2.3', 'FB.7.3.1', 'FB.7.3.1', 'FB.7.3.3', 'FB.7.3.6'];
  const directives = buildGrade7ScienceDirectives(sc1Codes);

  // Aktif kazanımlar bulunmalı
  const hasFB722 = directives.includes('FB.7.2.2');
  const hasFB723 = directives.includes('FB.7.2.3');
  const hasFB731 = directives.includes('FB.7.3.1');
  const hasFB733 = directives.includes('FB.7.3.3');
  const hasFB736 = directives.includes('FB.7.3.6');

  assert(
    hasFB722 && hasFB723 && hasFB731 && hasFB733 && hasFB736,
    'Aktif Kazanımların Eklenmesi (Fen Bilimleri Senaryo 1)',
    'Senaryo 1 kapsamındaki 5 aktif kazanım (FB.7.2.2, FB.7.2.3, FB.7.3.1, FB.7.3.3, FB.7.3.6) direktif metninde eksiksiz yer almaktadır.'
  );

  // Senaryo dışı üniteler (Uzay teknolojileri, iş vb.) filtrelenmeli
  const hasFB711 = directives.includes('FB.7.1.1');
  const hasFB714 = directives.includes('FB.7.1.4');
  const hasFB715 = directives.includes('FB.7.1.5');
  const hasFB721 = directives.includes('FB.7.2.1');

  assert(
    !hasFB711 && !hasFB714 && !hasFB715 && !hasFB721,
    'Senaryo Dışı Kazanımların Dışlanması (Fen Bilimleri Senaryo 1)',
    'Senaryoda bulunmayan 1. ve 2. ünite kazanımları (FB.7.1.1, FB.7.1.4, FB.7.1.5, FB.7.2.1) başarıyla filtrelenmiştir.'
  );

  // KaTeX ve Deney Analizi gibi ortak pedagojik kurallar korunmalı
  assert(
    directives.includes('DENEY DÜZENEKLERİ VE DEĞİŞKEN ANALİZİ') && directives.includes('KaTeX'),
    'Fen Deney ve KaTeX İlkelerinin Korunması',
    'Deney düzenekleri, bağımsız/bağımlı değişken analizi ve KaTeX formül kuralları eksiksiz korunmaktadır.'
  );
}

// TEST 2: 7. Sınıf Matematik Senaryo 1 Dinamik Kazanım Filtreleme
console.log('\n--- BÖLÜM 2: 7. SINIF MATEMATİK DİNAMİK KAZANIM FİLTRELEME ---');
{
  const sc1Codes = ['MAT.7.4.1', 'MAT.7.4.2', 'MAT.7.4.4', 'MAT.7.4.5', 'MAT.7.4.6', 'MAT.7.6.1', 'MAT.7.6.2'];
  const directives = buildGrade7MathDirectives(sc1Codes);

  // Aktif prizma ve istatistik kazanımları bulunmalı
  const hasMAT741 = directives.includes('MAT.7.4.1');
  const hasMAT742 = directives.includes('MAT.7.4.2');
  const hasMAT744 = directives.includes('MAT.7.4.4');
  const hasMAT761 = directives.includes('MAT.7.6.1');
  const hasMAT762 = directives.includes('MAT.7.6.2');

  assert(
    hasMAT741 && hasMAT742 && hasMAT744 && hasMAT761 && hasMAT762,
    'Aktif Kazanımların Eklenmesi (Matematik Senaryo 1)',
    'Senaryo 1 kapsamındaki prizma ve veri kazanımları (MAT.7.4.*, MAT.7.6.*) direktif metninde eksiksiz yer almaktadır.'
  );

  // 1. Yazılı rasyonel sayı kazanımları filtrelenmeli
  const hasMAT711 = directives.includes('MAT.7.1.1');
  const hasMAT712 = directives.includes('MAT.7.1.2');
  const hasMAT713 = directives.includes('MAT.7.1.3');

  assert(
    !hasMAT711 && !hasMAT712 && !hasMAT713,
    'Senaryo Dışı Kazanımların Dışlanması (Matematik Senaryo 1)',
    'Senaryo 1 kapsamında yer almayan rasyonel sayı kazanımları (MAT.7.1.1-3) başarıyla filtrelenmiştir.'
  );

  // KaTeX ve JSON kaçış kuralları korunmalı
  assert(
    directives.includes('KaTeX') && directives.includes('RFC 8259'),
    'Matematik KaTeX ve JSON Kaçış Kuralı Bütünlüğü',
    'KaTeX matematiksel gösterim ve çift ters eğik çizgi (\\\\) RFC 8259 JSON kaçış kuralları korunmaktadır.'
  );
}

// TEST 3: Bilinmeyen / Sözlükte Olmayan Kazanım İçin Zarif Fallback
console.log('\n--- BÖLÜM 3: ZARİF KAZANIM FALLBACK DESTEĞİ ---');
{
  const fakeCode = 'FB.7.9.9';
  const directives = buildGrade7ScienceDirectives([fakeCode]);

  assert(
    directives.includes(fakeCode) && directives.includes('genel MEB müfredat'),
    'Kayıtsız Kazanım Kayıp Önleme Mekanizması',
    'Sözlükte yer almayan kazanım kodu sessizce yutulmamış, fallback metni ile prompta aktarılmıştır.'
  );
}

// TEST 4: Branşa Duyarlı Yönerge Açıklığı (Türkçe vs Fen/Matematik İzolasyonu)
console.log('\n--- BÖLÜM 4: BRANŞA DUYARLI YÖNERGE AÇIKLIĞI KONTROLÜ ---');
{
  const turkishClarity = getDirectiveClarityRule('turkce');
  const scienceClarity = getDirectiveClarityRule('fen_bilimleri');
  const mathClarity = getDirectiveClarityRule('matematik');

  // Türkçe kuralında TDK kesme işareti ve yazım kuralları bulunmalı
  assert(
    turkishClarity.includes('TDK') && turkishClarity.includes('Yazım-noktalama') && turkishClarity.includes('T.O.5.6'),
    'Türkçe Özel Kurallarının Varlığı',
    'Türkçe dersi için TDK kesme işareti, yazım-noktalama ve anlama yönergeleri mevcuttur.'
  );

  // Fen Bilimleri ve Matematik kuralında bu Türkçe kuralları bulunmamalı
  assert(
    !scienceClarity.includes('TDK') && !scienceClarity.includes('Yazım-noktalama') && !scienceClarity.includes('T.O.5.6'),
    'Türkçe Kurallarının Fen Bilimlerine Sızmaması',
    'Fen Bilimleri dersinde gereksiz TDK ve yazım-noktalama yönergeleri temizlenmiştir.'
  );

  assert(
    !mathClarity.includes('TDK') && !mathClarity.includes('Yazım-noktalama') && !mathClarity.includes('T.O.5.6'),
    'Türkçe Kurallarının Matematiğe Sızmaması',
    'Matematik dersinde gereksiz TDK ve yazım-noktalama yönergeleri temizlenmiştir.'
  );

  // Ancak evrensel pedagojik yönerge açıklığı kuralları tüm branşlarda korunmalı
  assert(
    scienceClarity.includes('MODEL CEVAPTA SORU KÖKÜNÜ TEKRAR ETME YASAĞI') &&
    scienceClarity.includes('Yüzeysellik Yasağı') &&
    mathClarity.includes('MODEL CEVAPTA SORU KÖKÜNÜ TEKRAR ETME YASAĞI'),
    'Evrensel Pedagojik Netlik Kurallarının Korunması',
    'Soru kökünü tekrarlamama, tekil/çoğul netliği ve yüzeysellik yasağı tüm branşlarda aktiftir.'
  );
}

// TEST 5: Canlı Prompt Karakter Boyutları ve Bütçe Uyumu
console.log('\n--- BÖLÜM 5: CANLI PROMPT KARAKTER BOYUTLARI VE BÜTÇE UYUMU ---');
{
  const scenarios7Science = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS_TERM2[7]?.fen_bilimleri || [];
  const sc1 = scenarios7Science[0];
  const sc1OutcomeCodes = sc1.distributions.flatMap(d => Array(d.questionCount || 1).fill(d.outcomeCode));

  const promptSc1 = buildLiveExamPrompt({
    grade: 7,
    subjectId: 'fen_bilimleri',
    targetCount: sc1OutcomeCodes.length,
    distributionsText: sc1OutcomeCodes.map((c, i) => `Soru ${i + 1}: [Kazanım Kodu: ${c}] [Bilişsel Düzey: Basit]`).join('\n'),
    avoidDirectives: 'ÖZGÜNLÜK: Bu 1. settir.',
    difficultyPlanText: 'Kolay: %30, Orta: %50, Zor: %20',
    variationIndex: 0,
    variationToken: 'v1_tok',
    outcomeCodes: sc1OutcomeCodes
  });

  console.log(`7. Sınıf Fen Bilimleri Senaryo 1 (7 Soru) Prompt Uzunluğu: ${promptSc1.length} karakter`);
  assert(
    promptSc1.length <= 16500,
    '7. Sınıf Fen Bilimleri Senaryo 1 Bütçe Uyumu (<= 16.500)',
    `Eski 21.917 karakterden ${promptSc1.length} karaktere inmiş; 16.500 bütçesine tam olarak sığmıştır.`
  );

  assert(
    promptSc1.length < 19500,
    '7. Sınıf Fen Bilimleri Senaryo 1 Güvenlik Tavanı Uyumu (< 19.500)',
    `19.500 HARD_LIMIT sınırından ${19500 - promptSc1.length} karakter daha kısadır.`
  );

  // 7. Sınıf Matematik Senaryo 1
  const scenarios7Math = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS_TERM2[7]?.matematik || [];
  const mathSc1 = scenarios7Math[0];
  const mathSc1Codes = mathSc1.distributions.flatMap(d => Array(d.questionCount || 1).fill(d.outcomeCode));

  const promptMathSc1 = buildLiveExamPrompt({
    grade: 7,
    subjectId: 'matematik',
    targetCount: mathSc1Codes.length,
    distributionsText: mathSc1Codes.map((c, i) => `Soru ${i + 1}: [Kazanım Kodu: ${c}] [Bilişsel Düzey: Basit]`).join('\n'),
    avoidDirectives: 'ÖZGÜNLÜK: Bu 1. settir.',
    difficultyPlanText: 'Kolay: %30, Orta: %50, Zor: %20',
    variationIndex: 0,
    variationToken: 'v1_tok',
    outcomeCodes: mathSc1Codes
  });

  console.log(`7. Sınıf Matematik Senaryo 1 (9 Soru) Prompt Uzunluğu: ${promptMathSc1.length} karakter`);
  assert(
    promptMathSc1.length < 19500,
    '7. Sınıf Matematik Senaryo 1 Güvenlik Tavanı Uyumu (< 19.500)',
    `Eski 20.968 karakterden ${promptMathSc1.length} karaktere inmiş; 19.500 HARD_LIMIT tavanının çok altındadır.`
  );
}

// TEST 6: 5, 6 ve 8. Sınıf Geriye Dönük Uyumluluk
console.log('\n--- BÖLÜM 6: 5, 6 VE 8. SINIF GERİYE DÖNÜK UYUMLULUK ---');
{
  // 5. Sınıf Türkçe
  const prompt5 = buildLiveExamPrompt({
    grade: 5,
    subjectId: 'turkce',
    targetCount: 6,
    distributionsText: 'Soru 1: [Kazanım Kodu: T.O.5.6]',
    avoidDirectives: 'Önceki soruları tekrarlama',
    difficultyPlanText: 'Orta',
    variationIndex: 0,
    variationToken: 'v1_tok',
    outcomeCodes: ['T.O.5.6']
  });

  assert(
    prompt5.length > 5000 && prompt5.includes('5. SINIF SEVİYESİ'),
    '5. Sınıf Prompt Üretim Bütünlüğü',
    '5. Sınıf yaş düzeyine uygun dil kuralları ve ders kitabı yapısı sorunsuz çalışmaktadır.'
  );

  // 8. Sınıf Matematik
  const prompt8 = buildLiveExamPrompt({
    grade: 8,
    subjectId: 'matematik',
    targetCount: 10,
    distributionsText: 'Soru 1: [Kazanım Kodu: M.8.1.1.1]',
    avoidDirectives: 'Önceki soruları tekrarlama',
    difficultyPlanText: 'Orta',
    variationIndex: 0,
    variationToken: 'v1_tok',
    outcomeCodes: ['M.8.1.1.1']
  });

  assert(
    prompt8.length > 5000 && prompt8.includes('8. SINIF SEVİYESİ') && prompt8.includes('MATEMATİK GÖRSEL KURALLARI'),
    '8. Sınıf Prompt ve Görsel Kuralları Bütünlüğü',
    '8. sınıf seviyesi ve yapay zekâ matematik görsel yönergeleri eksiksiz korunmaktadır.'
  );
}

console.log('--- TEST SONUCU ---');
console.log(`Toplam Test: ${passCount + failCount} | Başarılı: ${passCount} | Başarısız: ${failCount}\n`);

if (failCount > 0) {
  console.error('TASK174 testleri başarısız oldu!');
  process.exit(1);
} else {
  console.log('TÜM TASK174 TESTLERİ EKSİKSİZ BAŞARILI!');
}

