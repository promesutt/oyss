import assert from 'node:assert';
import { parseExamJsonSafely, repairJsonKaTeX, removeTrailingCommas } from '../src/utils/jsonParser';

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
// TEST 09: Standart geçerli JSON değişmeden doğrudan ayrıştırılır
// -----------------------------------------------------------------------------
try {
  const raw = '{"questions": [{"number": 1, "question": "Standart soru", "points": 15}]}';
  const res = parseExamJsonSafely<{ questions: Array<{ question: string; points: number }> }>(raw);

  const passed = res.success === true &&
    res.data?.questions?.[0]?.question === 'Standart soru' &&
    res.data?.questions?.[0]?.points === 15;

  reportTest(
    '09',
    'Standart geçerli JSON değişmeden doğrudan ve başarıyla ayrıştırılır',
    passed,
    `success: ${res.success}, Soru: ${res.data?.questions?.[0]?.question}`
  );
} catch (err: any) {
  reportTest('09', 'Standart geçerli JSON testi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 10: Nesne sonundaki trailing comma onarılır (Örn: {"rubric": [{"pts": 8,},],})
// -----------------------------------------------------------------------------
try {
  const raw = `{
    "questions": [
      {
        "number": 1,
        "question": "Nesne sonundaki trailing comma testi",
        "points": 10,
        "rubric": [
          {"item": "Ölçüt 1", "pts": 10,},
        ],
      },
    ]
  }`;
  const res = parseExamJsonSafely<{ questions: Array<{ rubric: Array<{ item: string; pts: number }> }> }>(raw);

  const passed = res.success === true &&
    res.data?.questions?.length === 1 &&
    res.data?.questions?.[0]?.rubric?.[0]?.pts === 10;

  reportTest(
    '10',
    'Nesne sonundaki trailing comma (,} ve ,\\n}) başarıyla onarılır',
    passed,
    `success: ${res.success}, Soru sayısı: ${res.data?.questions?.length}, Rubrik pts: ${res.data?.questions?.[0]?.rubric?.[0]?.pts}`
  );
} catch (err: any) {
  reportTest('10', 'Nesne sonundaki trailing comma testi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 11: Dizi sonundaki trailing comma onarılır (Örn: [1, 2, 3, ])
// -----------------------------------------------------------------------------
try {
  const raw = `{
    "questions": [
      {
        "number": 1,
        "alternativeAnswers": [
          "Cevap 1",
          "Cevap 2",
        ],
      }
    ]
  }`;
  const res = parseExamJsonSafely<{ questions: Array<{ alternativeAnswers: string[] }> }>(raw);

  const passed = res.success === true &&
    res.data?.questions?.[0]?.alternativeAnswers?.length === 2 &&
    res.data?.questions?.[0]?.alternativeAnswers?.[1] === 'Cevap 2';

  reportTest(
    '11',
    'Dizi sonundaki trailing comma (,]) başarıyla onarılır ve dizi elemanları korunur',
    passed,
    `success: ${res.success}, Alternatif sayısı: ${res.data?.questions?.[0]?.alternativeAnswers?.length}`
  );
} catch (err: any) {
  reportTest('11', 'Dizi sonundaki trailing comma testi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 12: String değerinin içindeki ',}' veya ',]' ifadeleri kesinlikle değiştirilmez
// -----------------------------------------------------------------------------
try {
  const exactString = 'Bu bir yönergedir: {seçenek A, } durum B ve liste [1, 2,] geçerlidir.';
  const raw = `{
    "questions": [
      {
        "number": 1,
        "question": "${exactString}",
        "points": 15,
      }
    ]
  }`;
  const res = parseExamJsonSafely<{ questions: Array<{ question: string }> }>(raw);

  const extracted = res.data?.questions?.[0]?.question || '';
  const passed = res.success === true && extracted === exactString;

  reportTest(
    '12',
    'String değerinin içindeki ",}" veya ",]" ifadeleri kesinlikle değiştirilmez ve bozulmaz',
    passed,
    `success: ${res.success}, Bire bir eşit: ${extracted === exactString}`
  );
} catch (err: any) {
  reportTest('12', 'String içi virgül-parantez testi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 13: Kaçış karakteri içeren string değerleri korunur (\\", \\\\ ve string içi ,})
// -----------------------------------------------------------------------------
try {
  const raw = `{
    "questions": [
      {
        "number": 1,
        "stimulus": "Ali Bey: \\"Lütfen dikkat, } bu çok önemli!\\", dedi.",
        "path": "C:\\\\klasor\\\\dosya",
      },
    ]
  }`;
  const res = parseExamJsonSafely<{ questions: Array<{ stimulus: string; path: string }> }>(raw);

  const stim = res.data?.questions?.[0]?.stimulus || '';
  const expectedStim = 'Ali Bey: "Lütfen dikkat, } bu çok önemli!", dedi.';
  const pathVal = res.data?.questions?.[0]?.path || '';

  const passed = res.success === true &&
    stim === expectedStim &&
    pathVal === 'C:\\klasor\\dosya';

  reportTest(
    '13',
    'Kaçış karakteri (\\", \\\\) içeren string değerleri ve string içi ,} bozulmadan korunur',
    passed,
    `success: ${res.success}, Stimulus: "${stim}", Path: "${pathVal}"`
  );
} catch (err: any) {
  reportTest('13', 'Kaçış karakterleri ve trailing comma testi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 14: Tırnaksız anahtar gibi farklı JSON hataları mevcut hata davranışını sürdürür
// -----------------------------------------------------------------------------
try {
  const invalidJson = `{
    questions: [
      {
        number: 1,
        question: "Tırnaksız anahtar"
      }
    ]
  }`;
  const res = parseExamJsonSafely(invalidJson);

  const passed = res.success === false &&
    res.data === null &&
    typeof res.error === 'string' &&
    res.error.includes('Model çıktısı geçerli bir JSON formatına dönüştürülemedi');

  reportTest(
    '14',
    'Tırnaksız anahtar gibi yapısal bozukluklar agresif düzeltilmez, mevcut hata davranışını sürdürür',
    passed,
    `success: ${res.success} (beklenen false), Hata mesajı: ${res.error?.slice(0, 80)}...`
  );
} catch (err: any) {
  reportTest('14', 'Tırnaksız anahtar hata koruma testi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 15: KaTeX içeren örnekler bozulmaz, hem KaTeX hem trailing comma birlikte çalışır
// -----------------------------------------------------------------------------
try {
  const rawWithKaTeXAndTrailing = `{
    "questions": [
      {
        "number": 1,
        "question": "İşlemin sonucu $\\left(-\\frac{3}{4}\\right) \\cdot \\sqrt{16}$ kaçtır?",
        "points": 15,
        "rubric": [
          {"item": "Kesir hesabı $\\frac{3}{4}$", "pts": 8},
          {"item": "Kök hesabı $\\sqrt{16}$", "pts": 7,},
        ],
      },
    ]
  }`;
  const res = parseExamJsonSafely<{ questions: Array<{ question: string; rubric: any[] }> }>(rawWithKaTeXAndTrailing);

  const qText = res.data?.questions?.[0]?.question || '';
  const rub = res.data?.questions?.[0]?.rubric || [];
  const hasLeft = qText.includes('\\left(');
  const hasFrac = qText.includes('\\frac{3}{4}');
  const hasSqrt = qText.includes('\\sqrt{16}');
  const hasCdot = qText.includes('\\cdot');

  const passed = res.success === true &&
    hasLeft && hasFrac && hasSqrt && hasCdot &&
    rub.length === 2 &&
    rub[1].pts === 7;

  reportTest(
    '15',
    'KaTeX formülleri (\\left, \\frac, \\sqrt, \\cdot) ve trailing comma bir arada eksiksiz çalışır',
    passed,
    `success: ${res.success}, \\left: ${hasLeft}, \\frac: ${hasFrac}, \\sqrt: ${hasSqrt}, \\cdot: ${hasCdot}, Rubrik pts: ${rub[1]?.pts}`
  );
} catch (err: any) {
  reportTest('15', 'KaTeX + Trailing comma birleşik testi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 16: {"puan": 8,} tek trailing comma başarıyla onarılır
// -----------------------------------------------------------------------------
try {
  const raw = '{"puan": 8,}';
  const res = parseExamJsonSafely<{ puan: number }>(raw);
  const passed = res.success === true && res.data?.puan === 8;

  reportTest(
    '16',
    '{"puan": 8,} tek nesne sonu trailing comma başarıyla onarılır',
    passed,
    `success: ${res.success}, puan: ${res.data?.puan}`
  );
} catch (err: any) {
  reportTest('16', '{"puan": 8,} testi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 17: [1, 2,] tek trailing comma başarıyla onarılır
// -----------------------------------------------------------------------------
try {
  const raw = '[1, 2,]';
  const res = parseExamJsonSafely<number[]>(raw);
  const passed = res.success === true && Array.isArray(res.data) && res.data.length === 2 && res.data[1] === 2;

  reportTest(
    '17',
    '[1, 2,] tek dizi sonu trailing comma başarıyla onarılır',
    passed,
    `success: ${res.success}, dizi: ${JSON.stringify(res.data)}`
  );
} catch (err: any) {
  reportTest('17', '[1, 2,] testi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 18: {"puan": 8,,} çift virgül KESİNLİKLE onarılmaz (hata korunur)
// -----------------------------------------------------------------------------
try {
  const raw = '{"puan": 8,,}';
  const cleaned = removeTrailingCommas(raw);
  const res = parseExamJsonSafely(raw);
  const passed = res.success === false && res.data === null && cleaned === raw;

  reportTest(
    '18',
    '{"puan": 8,,} çift virgül kesinlikle onarılmaz ve hata korunur',
    passed,
    `success: ${res.success} (beklenen false), cleaned: "${cleaned}", error: ${res.error?.slice(0, 50)}...`
  );
} catch (err: any) {
  reportTest('18', '{"puan": 8,,} testi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 19: [1,,] çift virgül KESİNLİKLE onarılmaz (hata korunur)
// -----------------------------------------------------------------------------
try {
  const raw = '[1,,]';
  const cleaned = removeTrailingCommas(raw);
  const res = parseExamJsonSafely(raw);
  const passed = res.success === false && res.data === null && cleaned === raw;

  reportTest(
    '19',
    '[1,,] çift virgül kesinlikle onarılmaz ve hata korunur',
    passed,
    `success: ${res.success} (beklenen false), cleaned: "${cleaned}", error: ${res.error?.slice(0, 50)}...`
  );
} catch (err: any) {
  reportTest('19', '[1,,] testi', false, err.message);
}

// -----------------------------------------------------------------------------
// TEST 20: [,] ve {,} gibi elemansız virgüller onarılmaz (hata korunur)
// -----------------------------------------------------------------------------
try {
  const rawArray = '[,]';
  const rawObject = '{,}';
  const resArray = parseExamJsonSafely(rawArray);
  const resObject = parseExamJsonSafely(rawObject);
  const passed = resArray.success === false && resObject.success === false &&
    removeTrailingCommas(rawArray) === rawArray &&
    removeTrailingCommas(rawObject) === rawObject;

  reportTest(
    '20',
    '[,] ve {,} elemansız boş virgüller onarılmaz ve hata korunur',
    passed,
    `resArray.success: ${resArray.success}, resObject.success: ${resObject.success}`
  );
} catch (err: any) {
  reportTest('20', '[,] ve {,} testi', false, err.message);
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
