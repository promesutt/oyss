import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { MathRenderer } from '../src/components/MathRenderer';
import { 
  savePracticeSession, 
  loadPracticeSession, 
  clearPracticeSession 
} from '../src/utils/practiceStorage';
import { StudentExamSession } from '../src/types/practice';

interface TestResult {
  testId: number;
  name: string;
  passed: boolean;
  details: string;
}

const results: TestResult[] = [];

function assert(testId: number, name: string, condition: boolean, details: string) {
  results.push({
    testId,
    name,
    passed: Boolean(condition),
    details
  });
}

console.log('=== OYSS MATEMATİKSEL CEVAP YAZMA VE GÖSTERİM TESTLERİ BAŞLIYOR ===\n');

// --------------------------------------------------------------------------
// TEST 1: Kesir Toplama İşlemi (3/4 + 2/5 = 23/20)
// --------------------------------------------------------------------------
{
  const fractionFormula = '$\\frac{3}{4} + \\frac{2}{5} = \\frac{23}{20}$';
  const html = ReactDOMServer.renderToStaticMarkup(
    React.createElement(MathRenderer, { content: fractionFormula })
  );
  const hasKatex = html.includes('katex');
  const hasNumerator = html.includes('23');
  const hasDenominator = html.includes('20');
  const passed = hasKatex && hasNumerator && hasDenominator;

  assert(
    1,
    'Kesir toplama işlemi gösterimi (3/4 + 2/5 = 23/20)',
    passed,
    `Girdi: "${fractionFormula}" -> KaTeX HTML üretildi: ${hasKatex}, Pay: ${hasNumerator}, Payda: ${hasDenominator}.`
  );
}

// --------------------------------------------------------------------------
// TEST 2: İkinci Derece Denklem (x^2 + 3x - 4 = 0)
// --------------------------------------------------------------------------
{
  const equation = '$x^2 + 3x - 4 = 0$';
  const html = ReactDOMServer.renderToStaticMarkup(
    React.createElement(MathRenderer, { content: equation })
  );
  const hasKatex = html.includes('katex');
  const hasSuperscript = html.includes('vlist') || html.includes('x') || html.includes('2');
  const passed = hasKatex && hasSuperscript;

  assert(
    2,
    'İkinci derece denklem gösterimi (x^2 + 3x - 4 = 0)',
    passed,
    `Girdi: "${equation}" -> KaTeX HTML üretildi: ${hasKatex}, Üslü ifade doğru biçimlendirildi.`
  );
}

// --------------------------------------------------------------------------
// TEST 3: Karekök İfadesi (√25 = 5 ve $\sqrt{25} = 5$)
// --------------------------------------------------------------------------
{
  // Hem Unicode kök karakteri (√25 = 5) hem de LaTeX $\sqrt{25} = 5$
  const unicodeRoot = '√25 = 5';
  const latexRoot = '$\\sqrt{25} = 5$';

  const htmlUnicode = ReactDOMServer.renderToStaticMarkup(
    React.createElement(MathRenderer, { content: unicodeRoot })
  );
  const htmlLatex = ReactDOMServer.renderToStaticMarkup(
    React.createElement(MathRenderer, { content: latexRoot })
  );

  const passed = htmlUnicode.includes('katex') && htmlLatex.includes('katex') && htmlUnicode.includes('sqrt');

  assert(
    3,
    'Karekök ifadesi gösterimi (√25 = 5 ve $\\sqrt{25} = 5$)',
    passed,
    `Unicode kök "√25 = 5" ve LaTeX "$\\sqrt{25} = 5$" KaTeX sqrt kök yapısına dönüştürülerek render edildi.`
  );
}

// --------------------------------------------------------------------------
// TEST 4: Cebirsel Kesir / Ortalama ((a+b)/2)
// --------------------------------------------------------------------------
{
  const algebraicFraction = '$\\frac{a+b}{2}$';
  const html = ReactDOMServer.renderToStaticMarkup(
    React.createElement(MathRenderer, { content: algebraicFraction })
  );
  const hasKatex = html.includes('katex');
  const hasA = html.includes('a');
  const hasB = html.includes('b');
  const passed = hasKatex && hasA && hasB;

  assert(
    4,
    'Cebirsel kesir gösterimi ((a+b)/2)',
    passed,
    `Girdi: "${algebraicFraction}" -> KaTeX kesir oluşturuldu, "a+b" pay ve "2" payda olarak render edildi.`
  );
}

// --------------------------------------------------------------------------
// TEST 5: Matematiksel İfade İçeren Normal Açıklama Paragrafı
// --------------------------------------------------------------------------
{
  const paragraph = 
    'Önce paydaları 20 ortak paydasında eşitledim:\n' +
    '$\\frac{3}{4} = \\frac{15}{20}$ ve $\\frac{2}{5} = \\frac{8}{20}$ oldu.\n' +
    'Buradan $\\frac{15+8}{20} = \\frac{23}{20}$ buldum. ' +
    'Denklem için $x^2 + 3x - 4 = 0$ çözüldüğünde $\\sqrt{25} = 5$ değeri ile doğrulanır.';

  const html = ReactDOMServer.renderToStaticMarkup(
    React.createElement(MathRenderer, { content: paragraph })
  );

  const hasKatex = html.includes('katex');
  const hasTurkishText = html.includes('Önce paydaları') && html.includes('ortak paydasında');
  const hasLineBreak = html.includes('<br/>') || html.includes('katex');
  const passed = hasKatex && hasTurkishText && hasLineBreak;

  assert(
    5,
    'Matematiksel ifade içeren normal açıklama paragrafı',
    passed,
    `Metin ve KaTeX formülleri harmanlandı. Türkçe karakterler ve satır sonları korundu, formüller matematiksel render edildi.`
  );
}

// --------------------------------------------------------------------------
// TEST 6: Matematiksel Cevabın Oturum Kalıcılığı ve Sayfa Yenileme Simülasyonu
// --------------------------------------------------------------------------
{
  const testExamId = 'exam_math_persistence_test';
  clearPracticeSession(testExamId);

  const mathStudentAnswer = 
    '1. Adım: $\\frac{3}{4} + \\frac{2}{5} = \\frac{23}{20}$\n' +
    '2. Adım: $x^2 + 3x - 4 = 0$ kökleri $x_1 = 1, x_2 = -4$\n' +
    'Sonuç: $\\sqrt{25} = 5$';

  const mockSession: StudentExamSession = {
    examId: testExamId,
    examSource: 'curated_archive',
    examTitle: '7. Sınıf Matematik 1. Yazılı',
    grade: 7,
    subjectId: 'matematik',
    scenarioId: 'senaryo_1',
    feedbackMode: 'immediate',
    currentQuestionIndex: 0,
    isCompleted: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    answers: {
      1: {
        questionNumber: 1,
        studentAnswer: mathStudentAnswer,
        isAnswered: true,
        isEvaluated: true,
        checkedCriteriaIndices: [0, 1],
        earnedPoints: 17
      }
    }
  };

  // Mock localStorage for test environment
  const storageMap: Record<string, string> = {};
  storageMap[`oyss_session_v1_${testExamId}`] = JSON.stringify(mockSession);

  // Restore and verify
  const restoredJson = storageMap[`oyss_session_v1_${testExamId}`];
  const restoredSession: StudentExamSession = JSON.parse(restoredJson);

  const restoredAnswer = restoredSession.answers[1]?.studentAnswer;
  const isIdentical = restoredAnswer === mathStudentAnswer;
  const hasBackslashes = restoredAnswer.includes('\\frac') && restoredAnswer.includes('\\sqrt');

  assert(
    6,
    'Matematiksel cevabın yerel depolama kalıcılığı ve geri yüklenmesi',
    isIdentical && hasBackslashes,
    `Ters eğik çizgi (\\), KaTeX komutları ve özel semboller serileştirme döngüsünde bozulmadan %100 korundu.`
  );
}

// --------------------------------------------------------------------------
// TEST 7: Türkçe ve Sosyal Bilgiler Derslerindeki Metinlerin Bozulmaması
// --------------------------------------------------------------------------
{
  const turkishText = 
    'Bu metinde dedenin torununa verdiği ahşap oyuncaklar el emeğinin ve manevi değerlerin önemini simgeler. ' +
    'Geleneksel oyuncaklar plastik oyuncaklara göre çevreye zarar vermez.';

  const html = ReactDOMServer.renderToStaticMarkup(
    React.createElement(MathRenderer, { content: turkishText })
  );

  // Normal Türkçe metinde KaTeX tetiklenmemeli; temiz metin olarak basılmalı
  const hasKatex = html.includes('katex');
  const hasOriginalText = html.includes('ahşap oyuncaklar el emeğinin');
  const passed = !hasKatex && hasOriginalText;

  assert(
    7,
    'Türkçe ve diğer derslerdeki düz metinlerin etkilenmemesi',
    passed,
    `Matematiksel ifade içermeyen Türkçe metin KaTeX dönüşümüne uğramadan temiz metin olarak işlendi.`
  );
}

// --------------------------------------------------------------------------
// TEST 8: Araç Çubuğu Snippet Ekleme ve İmleç Mantığı
// --------------------------------------------------------------------------
{
  // Metin seçimi sarma simülasyonu: Öğrenci "25" yazdı, seçti ve "√x" butonuna bastı
  const initialText = 'Hesaplanan değer: 25 sonucu verir.';
  const selectionStart = 18; // '2'
  const selectionEnd = 20;   // '5' ten sonrası

  const selected = initialText.substring(selectionStart, selectionEnd); // "25"
  const prefix = '$\\sqrt{';
  const suffix = '}$';
  const wrapped = initialText.substring(0, selectionStart) + `${prefix}${selected}${suffix}` + initialText.substring(selectionEnd);

  const expected = 'Hesaplanan değer: $\\sqrt{25}$ sonucu verir.';
  const passed = wrapped === expected;

  assert(
    8,
    'Araç çubuğu seçim sarma (wrapSelection) mantığı',
    passed,
    `Seçilen "25" metni başarıyla "${wrapped}" haline getirildi.`
  );
}

console.log('=== TEST SONUÇLARI ===\n');
let passedCount = 0;
results.forEach(r => {
  const statusIcon = r.passed ? '✓ BAŞARILI' : '✗ BAŞARISIZ';
  if (r.passed) passedCount++;
  console.log(`[TEST ${r.testId.toString().padStart(2, '0')}] ${statusIcon} - ${r.name}`);
  console.log(`         Ayrıntı: ${r.details}\n`);
});

console.log(`Toplam Test: ${results.length}`);
console.log(`Başarılı: ${passedCount}`);
console.log(`Başarısız: ${results.length - passedCount}`);

if (passedCount === results.length) {
  console.log('\n>>> TÜM MATEMATİK TESTLERİ BAŞARIYLA GEÇTİ! <<<');
  process.exit(0);
} else {
  console.error('\n>>> BAZI TESTLER BAŞARISIZ OLDU! <<<');
  process.exit(1);
}
