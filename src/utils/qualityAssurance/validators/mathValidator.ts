import { QualityFinding, QuestionValidationContext } from '../types';

/**
 * Matematik Dersi Uzman Kalite Kontrolü
 */
export function validateMathQuestion(
  q: any,
  _context: QuestionValidationContext
): QualityFinding[] {
  const findings: QualityFinding[] = [];
  const stem = (q.questionText || q.question || '').trim();
  const stimulus = (q.stimulus || q.contextText || '').trim();
  const answer = (q.modelAnswer || q.answer || '').trim();

  // 1. Sayısal sonuç gerektiren sorularda cevabın sayısal/cebirsel varlığı
  const asksForNumericValue = /(?:kaçtır\??|kaç\s+(?:adet|tane|derece|metre|santimetre|kg|lira|katıdır|katı|br|birim)|değerini\s+bulunuz|sonucu\s+bulunuz|alanı\s+kaç|çevresi\s+kaç)/i.test(stem);
  if (asksForNumericValue) {
    const containsNumberOrMath = /[-+]?\d+(?:[.,]\d+)?|\\frac|\d+\/\d+|[a-zA-Z]\s*=\s*[-+]?\d+/i.test(answer);
    if (!containsNumberOrMath) {
      findings.push({
        category: 'scientific_correctness',
        severity: 'critical',
        field: 'answer',
        message: 'Soru kökü kesin sayısal bir değer/sonuç sormasına rağmen model cevapta sayısal veya matematiksel bir sonuç bulunmuyor.',
        suggestedFix: 'Model cevaba problemin nihai sayısal veya cebirsel sonucunu ekleyiniz.',
        validationMethod: 'math_numeric_result_presence'
      });
    }
  }

  // 2. Basit deterministik aritmetik tutarlılık kontrolü
  // Soru kökü, model cevap veya metin içindeki herhangi bir aritmetik eşitliği (A + B = C vb.) denetle
  const allText = `${stem} ${stimulus} ${answer}`;

  // Tamsayı veya ondalıklı eşitlikler: A + B = C, A - B = C, A * B = C vb.
  // Kesirlerle (örneğin 1/2 + 1/4 = 3/4) çakışmaması için bölme işareti olarak / değil, ÷, :, bölü kontrol edilir;
  // ve sayının hemen ardında / bulunamaz.
  const eqRegex = /(?<!\/\s*)(\b\d+(?:\.\d+)?)\s*([\+\-\*x•·÷:])\s*(\d+(?:\.\d+)?)\s*=\s*(\d+(?:\.\d+)?)(?!\s*\/)/gi;
  let eqMatch;
  while ((eqMatch = eqRegex.exec(allText)) !== null) {
    const a = parseFloat(eqMatch[1]);
    const op = eqMatch[2];
    const b = parseFloat(eqMatch[3]);
    const c = parseFloat(eqMatch[4]);
    let expected: number | null = null;
    if (op === '+') expected = a + b;
    else if (op === '-') expected = a - b;
    else if (['*', 'x', '•', '·'].includes(op)) expected = a * b;
    else if (['÷', ':'].includes(op) && b !== 0) expected = a / b;

    if (expected !== null && Math.abs(expected - c) > 0.001) {
      findings.push({
        category: 'scientific_correctness',
        severity: 'critical',
        field: 'answer',
        message: `Matematiksel aritmetik işlem hatası: ${a} ${op} ${b} = ${expected} olmalıdır; metinde ${c} olarak hesaplanmıştır.`,
        suggestedFix: `İşlemin doğru sonucu olan ${expected} değerini kullanınız.`,
        validationMethod: 'math_arithmetic_verifier'
      });
    }
  }

  // Kesirli toplama / çıkarma eşitliği kontrolü: A/B + C/D = E/F
  const fracEqRegex = /(\d+)\/(\d+)\s*([\+\-])\s*(\d+)\/(\d+)\s*=\s*(\d+)\/(\d+)/g;
  let fracMatch;
  while ((fracMatch = fracEqRegex.exec(allText)) !== null) {
    const aNum = parseInt(fracMatch[1], 10);
    const aDen = parseInt(fracMatch[2], 10);
    const op = fracMatch[3];
    const bNum = parseInt(fracMatch[4], 10);
    const bDen = parseInt(fracMatch[5], 10);
    const cNum = parseInt(fracMatch[6], 10);
    const cDen = parseInt(fracMatch[7], 10);

    if (aDen > 0 && bDen > 0 && cDen > 0) {
      const valA = aNum / aDen;
      const valB = bNum / bDen;
      const valC = cNum / cDen;
      const expectedVal = op === '+' ? valA + valB : valA - valB;

      if (Math.abs(expectedVal - valC) > 0.001) {
        findings.push({
          category: 'scientific_correctness',
          severity: 'critical',
          field: 'answer',
          message: `Rasyonel sayı işlem hatası: ${aNum}/${aDen} ${op} ${bNum}/${bDen} işleminin sonucu ${cNum}/${cDen} olamaz.`,
          suggestedFix: 'Paydaları eşitleyerek işlemi doğru rasyonel sayı sonucuyla güncelleyiniz.',
          validationMethod: 'math_fraction_arithmetic_verifier'
        });
      }
    }
  }

  const simpleMultMatch = stem.match(/(\d+)\s*[x*•·]\s*(\d+)\s*(?:işleminin\s+sonucu|kaçtır)/i);
  if (simpleMultMatch) {
    const a = parseInt(simpleMultMatch[1], 10);
    const b = parseInt(simpleMultMatch[2], 10);
    const expected = a * b;
    const answerHasExpected = new RegExp(`\\b${expected}\\b`).test(answer);
    if (!answerHasExpected) {
      findings.push({
        category: 'scientific_correctness',
        severity: 'critical',
        field: 'answer',
        message: `Matematiksel işlem hatası: ${a} × ${b} işleminin sonucu ${expected} olmalıdır; model cevapta bulunamadı.`,
        suggestedFix: `Model cevabı doğru sonuç olan ${expected} ile güncelleyiniz.`,
        validationMethod: 'deterministic_arithmetic_verifier'
      });
    }
  }

  // 3. Sıfıra bölme ve tanımsız rasyonel sayı kontrolü
  if (/\b(?:bölü\s+0|\/\s*0|\\frac\{[^}]*\}\{0\})\b/i.test(stem + ' ' + answer)) {
    findings.push({
      category: 'scientific_correctness',
      severity: 'critical',
      field: 'stem',
      message: 'Matematiksel tanımsızlık: Soru veya cevapta sıfıra bölme ifadesi tespit edildi.',
      suggestedFix: 'Paydası sıfır olan rasyonel sayı veya sıfıra bölme ifadesini düzeltiniz.',
      validationMethod: 'division_by_zero_check'
    });
  }

  // 4. Alan ve çevre birimi tutarlılığı
  if (/alanı\s+kaç/i.test(stem)) {
    if (/\bcm\b/i.test(stem) && /\b(?:m²|km²)\b/i.test(answer) && !/çeviriniz|dönüştürünüz/i.test(stem)) {
      findings.push({
        category: 'scientific_correctness',
        severity: 'warning',
        field: 'answer',
        message: 'Birim uyumsuzluğu: Soru cm cinsinden sorulmuş ancak cevapta dönüştürme yönergesi olmaksızın m² kullanılmış.',
        suggestedFix: 'Cevaptaki alan birimini cm² veya soru kökünde istenen birimle uyumlu hale getiriniz.',
        validationMethod: 'math_unit_consistency_check'
      });
    }
  }

  // 5. Geometrik ve görsel parametre matematiksel doğrulaması
  if (q.visual && typeof q.visual === 'object') {
    // Soru kökü görseldeki şekilden bahsediyor mu?
    const hasVisualRef = /(?:şekilde|görselde|grafikte|doğru\s+parçası|sayı\s+doğrusu|prizma|dikdörtgen)/i.test(stem + ' ' + stimulus);
    if (!hasVisualRef) {
      findings.push({
        category: 'pedagogical_depth',
        severity: 'info',
        field: 'visual',
        message: 'Görsel eklenmiş ancak soru kökünde görsele açık bir atıf bulunmuyor.',
        suggestedFix: 'Soru kökünde "Verilen şekilde..." gibi öğrenciyi görsele yönlendiren ifade kullanınız.',
        validationMethod: 'visual_stem_reference_check'
      });
    }
  }

  return findings;
}
