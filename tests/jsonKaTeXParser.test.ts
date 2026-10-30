import assert from 'node:assert';
import { parseExamJsonSafely, repairJsonKaTeX } from '../src/utils/jsonParser';

console.log('=== OYSS GÜVENLİ JSON & KaTeX AYRIŞTIRICI DOĞRULAMA TESTLERİ BAŞLIYOR ===\n');

let passCount = 0;
let failCount = 0;

function reportTest(num: string, title: string, success: boolean, detail: string) {
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
// TEST 01: \frac{3}{4} içeren JSON çıktısı: form-feed (\f) bozulması engellenir
// -----------------------------------------------------------------------------
try {
  // Raw string containing single unescaped \frac
  const raw = '{"questions": [{"number": 1, "question": "Kesir $\\frac{3}{4}$ değerini ondalık olarak yazınız."}]}';
  const res = parseExamJsonSafely<{ questions: Array<{ question: string }> }>(raw);

  const qText = res.data?.questions?.[0]?.question || '';
  const hasFrac = qText.includes('\\frac{3}{4}');
  // Check it does NOT contain form feed (ASCII 12)
  const hasFormFeed = qText.includes(String.fromCharCode(12));

  const passed = res.success === true && hasFrac && !hasFormFeed;
  reportTest(
    '01',
    '\\frac{3}{4} içeren JSON: form-feed (\\f) bozulması engellenir, KaTeX \\frac korunur',
    passed,
    `Parse: ${res.success}, '\\frac{3}{4}' mevcut: ${hasFrac}, form-feed içeriyor mu: ${hasFormFeed}`
  );
} catch (err: any) {
  reportTest('01', '\\frac testi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 02: \left(-\frac{3}{4}\right) içeren JSON çıktısı
// -----------------------------------------------------------------------------
try {
  const raw = '{"questions": [{"number": 1, "question": "İşlemin sonucu $\\left(-\\frac{3}{4}\\right)$ kaçtır?"}]}';
  const res = parseExamJsonSafely<{ questions: Array<{ question: string }> }>(raw);

  const qText = res.data?.questions?.[0]?.question || '';
  const hasLeft = qText.includes('\\left(');
  const hasRight = qText.includes('\\right)');
  const hasFrac = qText.includes('\\frac{3}{4}');

  const passed = res.success === true && hasLeft && hasRight && hasFrac;
  reportTest(
    '02',
    '\\left(-\\frac{3}{4}\\right) içeren JSON çıktısı SyntaxError vermeden başarıyla ayrıştırılır',
    passed,
    `Parse: ${res.success}, \\left: ${hasLeft}, \\right: ${hasRight}, \\frac: ${hasFrac}`
  );
} catch (err: any) {
  reportTest('02', '\\left ve \\right testi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 03: \cdot, \Delta, \sqrt, \times içeren matematik ve fizik formülleri
// -----------------------------------------------------------------------------
try {
  const raw = '{"questions": [{"number": 1, "question": "İş formülü: $W = F \\cdot \\Delta x$ ve köklü ifade: $\\sqrt{49} = 7 \\times 1$ hesaplayınız."}]}';
  const res = parseExamJsonSafely<{ questions: Array<{ question: string }> }>(raw);

  const qText = res.data?.questions?.[0]?.question || '';
  const hasCdot = qText.includes('\\cdot');
  const hasDelta = qText.includes('\\Delta');
  const hasSqrt = qText.includes('\\sqrt');
  const hasTimes = qText.includes('\\times');

  const passed = res.success === true && hasCdot && hasDelta && hasSqrt && hasTimes;
  reportTest(
    '03',
    '\\cdot, \\Delta, \\sqrt, \\times komutları JSON içinde bozulmadan ve hata vermeden korunur',
    passed,
    `Parse: ${res.success}, \\cdot: ${hasCdot}, \\Delta: ${hasDelta}, \\sqrt: ${hasSqrt}, \\times: ${hasTimes}`
  );
} catch (err: any) {
  reportTest('03', '\\cdot, \\Delta, \\sqrt, \\times testi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 04: Birden fazla KaTeX komutunun aynı soru metninde harmanlanması
// -----------------------------------------------------------------------------
try {
  const raw = '{"questions": [{"number": 1, "question": "Bir denizaltı $\\left(-\\frac{5}{8}\\text{ km}\\right)$ derinliktedir. Motor gücü $\\Delta h = \\sqrt{16} \\cdot \\frac{1}{4}$ m/s olduğuna göre derinliği hesaplayınız."}]}';
  const res = parseExamJsonSafely<{ questions: Array<{ question: string }> }>(raw);

  const qText = res.data?.questions?.[0]?.question || '';
  const passed = res.success === true &&
    qText.includes('\\left(') &&
    qText.includes('\\frac{5}{8}') &&
    qText.includes('\\text{ km}') &&
    qText.includes('\\Delta') &&
    qText.includes('\\sqrt{16}') &&
    qText.includes('\\cdot');

  reportTest(
    '04',
    'Birden fazla karmaşık KaTeX komutu (parantez, kesir, birim metni, delta, kök) aynı soruda korunur',
    passed,
    `Parse: ${res.success}, Soru metni: "${qText.slice(0, 85)}..."`
  );
} catch (err: any) {
  reportTest('04', 'Çoklu KaTeX harmanlama testi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 05: Geçerli JSON kaçışlarının (\" \n \t \\) bozulmaması
// -----------------------------------------------------------------------------
try {
  const raw = '{"notes": "Satır 1\\nSatır 2\\tSekme \\"Alıntı Kelime\\" ve ters eğik çizgi \\\\ sembolü."}';
  const res = parseExamJsonSafely<{ notes: string }>(raw);

  const note = res.data?.notes || '';
  const hasNewline = note.includes('\n');
  const hasTab = note.includes('\t');
  const hasQuotes = note.includes('"Alıntı Kelime"');
  const hasBackslash = note.includes('\\');

  const passed = res.success === true && hasNewline && hasTab && hasQuotes && hasBackslash;
  reportTest(
    '05',
    'Standart geçerli JSON kaçışları (satır sonu, sekme, tırnak, çift çizgi) bozulmadan korunur',
    passed,
    `Parse: ${res.success}, newline: ${hasNewline}, tab: ${hasTab}, quotes: ${hasQuotes}, backslash: ${hasBackslash}`
  );
} catch (err: any) {
  reportTest('05', 'Standart JSON kaçışları testi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 06: Zaten çift ters eğik çizgiyle kaçırılmış KaTeX ifadeleri bozulmaz
// -----------------------------------------------------------------------------
try {
  // Input already has \\\\frac and \\\\left
  const raw = '{"questions": [{"number": 1, "question": "Çift kaçışlı: $\\\\frac{3}{4}$ ve $\\\\left(-\\\\frac{1}{2}\\\\right)$"}]}';
  const res = parseExamJsonSafely<{ questions: Array<{ question: string }> }>(raw);

  const qText = res.data?.questions?.[0]?.question || '';
  const hasExactSingleInParsed = qText.includes('\\frac{3}{4}') && !qText.includes('\\\\frac');
  const hasExactLeftInParsed = qText.includes('\\left(') && !qText.includes('\\\\left');

  const passed = res.success === true && hasExactSingleInParsed && hasExactLeftInParsed;
  reportTest(
    '06',
    'Zaten çift kaçırılmış (\\\\frac, \\\\left) ifadeler dörtlü kaçışa dönüşmez, bellekte tek KaTeX komutu olur',
    passed,
    `Parse: ${res.success}, Doğru \\frac: ${hasExactSingleInParsed}, Doğru \\left: ${hasExactLeftInParsed}`
  );
} catch (err: any) {
  reportTest('06', 'Çift kaçış koruma testi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 07: Kapanmamış ve gerçekten bozuk JSON reddedilir (success: false)
// -----------------------------------------------------------------------------
try {
  const broken1 = '{"questions": [{"number": 1, "outcome": ';
  const broken2 = 'Bu bir JSON metni değildir.';
  const res1 = parseExamJsonSafely(broken1);
  const res2 = parseExamJsonSafely(broken2);

  const passed = res1.success === false && res2.success === false && typeof res1.error === 'string';
  reportTest(
    '07',
    'Gerçekten bozuk veya eksik JSON çıktıları sahte başarı üretmez, açıklayıcı hata döner',
    passed,
    `Bozuk JSON 1: success=${res1.success} (Hata: "${res1.error}"), Bozuk JSON 2: success=${res2.success}`
  );
} catch (err: any) {
  reportTest('07', 'Bozuk JSON reddi testi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 08: 7. Sınıf Matematik Gerçekçi Gemini KaTeX Yanıt Simülasyonu
// -----------------------------------------------------------------------------
try {
  const realisticGeminiMathResponse = `\`\`\`json
{
  "questions": [
    {
      "number": 1,
      "outcome": "MAT.7.1.1",
      "outcomeTitle": "Doğal sayı, tam sayı ve rasyonel sayıları yorumlayabilme",
      "difficulty": "Kolay",
      "level": "Basit Bilişsel Süreçler",
      "templateType": "Kurgusal Senaryo & Vaka İncelemesi",
      "points": 15,
      "stimulus": "ASELSAN Deringöz su altı araştırma robotu Karadeniz tabanında $-45\\text{ m}$ derinlikte numune toplamaktadır.",
      "question": "Deringöz robotu dikey doğrultuda $+18\\text{ m}$ yukarı hareket ettiğinde yeni konumunu gösteren tam sayıyı bulunuz.",
      "answer": "$-45 + (+18) = -27\\text{ m}$",
      "alternativeAnswers": [
        "-27",
        "-27 metre derinlik",
        "$-27\\text{ m}$"
      ],
      "rubric": [
        { "item": "İşlem modelinin doğru kurulması", "pts": 8 },
        { "item": "Sonucun -27 olarak doğru bulunması", "pts": 7 }
      ]
    },
    {
      "number": 2,
      "outcome": "MAT.7.1.2",
      "outcomeTitle": "Rasyonel sayıların ondalık gösterimlerini yansıtabilme",
      "difficulty": "Orta",
      "level": "Karmaşık Bilişsel Süreçler",
      "templateType": "Hata Tespiti & Adım Analizi",
      "points": 14,
      "stimulus": "Can, $0,\\overline{36}$ devirli ondalık sayısını rasyonel sayıya çevirirken şu işlemi yapmıştır: $\\frac{36 - 0}{90} = \\frac{36}{90}$",
      "question": "Can'ın ilk hatayı hangi adımda yaptığını ve sayının en sade rasyonel karşılığı olan $\\frac{a}{b}$ halini bulunuz.",
      "answer": "Payda 90 değil 99 olmalıdır. Doğrusu: $\\frac{36}{99} = \\frac{4}{11}$",
      "alternativeAnswers": [
        "Paydaya 99 yazılmalı, en sade hali $\\frac{4}{11}$'dir.",
        "4/11"
      ],
      "rubric": [
        { "item": "Paydanın 99 olması gerektiğinin tespiti", "pts": 7 },
        { "item": "Sadeleştirilmiş 4/11 sonucunun bulunması", "pts": 7 }
      ]
    },
    {
      "number": 3,
      "outcome": "MAT.7.1.3",
      "outcomeTitle": "Rasyonel sayıların karşılaştırma ve sıralama ilişkileri",
      "difficulty": "Orta",
      "level": "Karmaşık Bilişsel Süreçler",
      "templateType": "Durum & Özellik Matrisi",
      "points": 14,
      "stimulus": "Dört gezegenin yüzey sıcaklık katsayıları $A = -\\frac{3}{4}$, $B = -\\frac{5}{8}$, $C = -\\frac{1}{2}$ olarak verilmiştir.",
      "question": "Bu katsayıları sayı doğrusunda göstererek küçükten büyüğe sıralayınız.",
      "answer": "$-\\frac{3}{4} < -\\frac{5}{8} < -\\frac{1}{2}$",
      "alternativeAnswers": [
        "A < B < C",
        "$-0,75 < -0,625 < -0,5$"
      ],
      "rubric": [
        { "item": "Paydaların eşitlenmesi veya ondalık karşılıklar", "pts": 7 },
        { "item": "Doğru sıralama ilişkisi", "pts": 7 }
      ]
    },
    {
      "number": 4,
      "outcome": "MAT.7.1.4",
      "outcomeTitle": "Rasyonel sayılarla çok adımlı işlemler",
      "difficulty": "Zor",
      "level": "Karmaşık Bilişsel Süreçler",
      "templateType": "Kurgusal Senaryo & Vaka İncelemesi",
      "points": 15,
      "stimulus": "Marangoz Hasan Usta $\\frac{15}{2}\\text{ m}$ uzunluğundaki bir kalası $\\frac{3}{4}\\text{ m}$ boyundaki parçalara bölecektir.",
      "question": "Hasan Usta toplam kaç parça elde eder ve kaç kesim işlemi yapar?",
      "answer": "$\\frac{15}{2} : \\frac{3}{4} = 10$ parça elde edilir. Kesim sayısı: $10 - 1 = 9$ kesim.",
      "alternativeAnswers": [
        "10 parça, 9 kesim",
        "10 adet parça ve 9 defa kesim işlemi"
      ],
      "rubric": [
        { "item": "Bölme işleminin adımlı çözümü", "pts": 8 },
        { "item": "Kesim sayısının 9 olarak bulunması", "pts": 7 }
      ]
    }
  ]
}
\`\`\``;

  const res = parseExamJsonSafely<{ questions: any[] }>(realisticGeminiMathResponse);
  const qList = res.data?.questions || [];

  const passed = res.success === true &&
    qList.length === 4 &&
    qList[0].question.includes('+18\\text{ m}') &&
    qList[1].answer.includes('\\frac{36}{99}') &&
    qList[2].answer.includes('-\\frac{3}{4}') &&
    qList[3].stimulus.includes('\\frac{15}{2}\\text{ m}');

  reportTest(
    '08',
    '7. Sınıf Matematik gerçekçi Gemini yanıtı (4 soru, KaTeX formülleri, rubrikler) uçtan uca eksiksiz ayrıştırılır',
    passed,
    `Ayrıştırılan Soru: ${qList.length}, S1: ${qList[0].outcome}, S2 KaTeX: ${qList[1].answer}, S3 KaTeX: ${qList[2].answer}`
  );
} catch (err: any) {
  reportTest('08', '7. sınıf matematik simülasyonu testi', false, err.message);
}

// -----------------------------------------------------------------------------
// ÖZET
// -----------------------------------------------------------------------------
console.log('=== TEST ÖZETİ ===');
console.log(`Toplam Test: ${passCount + failCount}`);
console.log(`Başarılı: ${passCount}`);
console.log(`Başarısız: ${failCount}`);

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('\n>>> TÜM GÜVENLİ JSON & KaTeX AYRIŞTIRICI TESTLERİ BAŞARIYLA GEÇTİ! <<<');
}
