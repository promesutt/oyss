/**
 * OYSS Rehberi | Modüler Kesir Görselleştirme Motoru (FAZ 3.1)
 * fractionMathEngine.ts
 * 
 * 5. Sınıf Matematik Kesir Modelleri için:
 * - Saf BigInt tabanlı kanonik rasyonel indirgeme ve koordinat yuvarlama (round-half-up)
 * - Çakışmasız enjektif SVG ID normalizasyonu (hex-escape)
 * - Genel matematiksel doğrulama (0/d geçerlidir, d <= 30 okunabilirlik sınırı)
 * - Pedagojik MEB 5. sınıf pilot doğrulama katmanı (n >= 1, denklik zorunluluğu)
 * - Siyah-beyaz baskı tarama desenleri ve W3C uyumlu deterministik vektörel SVG üretimi
 */

import {
  FractionModelVisual,
  FractionModelVisualParams,
  FractionBarItem,
  MathematicalValidationResult
} from '../types';
import { resolveSvgColor, escapeXml, generateFallbackSvg } from './svgMathEngine';

export interface FractionRenderOptions {
  instanceId?: string;
}

// Standart Görselleştirme Geometrisi (640 SVG birimi standart kapsayıcı)
export const FRACTION_GEOMETRY = {
  VIEWBOX_WIDTH: 640,
  PAD_LEFT: 20,
  LABEL_WIDTH: 70,
  PAD_X: 90, // 20 + 70 = 90
  WHOLE_WIDTH: 500, // Referans bütün genişliği
  PAD_RIGHT: 50, // 640 - (90 + 500) = 50
  DEFAULT_BAR_HEIGHT: 44,
  DEFAULT_GAP: 20,
  TOP_PADDING: 24,
  BOTTOM_PADDING: 24
} as const;

// =============================================================================
// 1. SAF BIGINT MATEMATİKSEL YARDIMCILAR VE KANONİK KOORDİNAT ALGORİTMASI
// =============================================================================

/**
 * Kesir pay ve paydasının bağımsız çağrılarda geçerli, güvenli tam sayılar olduğunu doğrular.
 * - Değerlerin tipi number olmalı.
 * - Number.isSafeInteger() koşulunu sağlamalı (NaN, Infinity, float ve güvensiz tamsayılar elenir).
 * - Pay negatif olmamalı (numerator >= 0).
 * - Payda sıfırdan büyük pozitif tam sayı olmalı (denominator > 0).
 * - Bileşik kesirler (numerator > denominator) engellenmez; pedagojik sınırlar üst katmana aittir.
 * - Sıfır pay (numerator === 0) geçerlidir.
 */
export function validateFractionNumbers(numerator: unknown, denominator: unknown): void {
  if (typeof numerator !== 'number' || !Number.isSafeInteger(numerator)) {
    throw new TypeError(`Geçersiz pay: Güvenli bir tam sayı olmalıdır (gelen: ${String(numerator)}).`);
  }
  if (numerator < 0) {
    throw new RangeError(`Geçersiz pay: Negatif olamaz (gelen: ${numerator}).`);
  }
  if (typeof denominator !== 'number' || !Number.isSafeInteger(denominator)) {
    throw new TypeError(`Geçersiz payda: Güvenli bir tam sayı olmalıdır (gelen: ${String(denominator)}).`);
  }
  if (denominator <= 0) {
    throw new RangeError(`Geçersiz payda: Sıfırdan büyük pozitif bir tam sayı olmalıdır (gelen: ${denominator}).`);
  }
}

/**
 * Geometrik parametrelerin (wholeWidth, padX) güvenli tam sayı olduğunu doğrular.
 * Pozitif wholeWidth ve negatif olmayan padX zorunludur.
 */
export function validateGeometryParameters(wholeWidth: unknown, padX: unknown): void {
  if (typeof wholeWidth !== 'number' || !Number.isSafeInteger(wholeWidth) || wholeWidth <= 0) {
    throw new TypeError(`Geçersiz wholeWidth: Pozitif bir güvenli tam sayı olmalıdır (gelen: ${String(wholeWidth)}).`);
  }
  if (typeof padX !== 'number' || !Number.isSafeInteger(padX) || padX < 0) {
    throw new TypeError(`Geçersiz padX: Negatif olmayan bir güvenli tam sayı olmalıdır (gelen: ${String(padX)}).`);
  }
}

/**
 * İki BigInt tam sayının en büyük ortak bölenini (OBEB / GCD) hesaplar (Öklid Algoritması).
 */
export function gcdBigInt(a: bigint, b: bigint): bigint {
  let x = a < 0n ? -a : a;
  let y = b < 0n ? -b : b;
  while (y !== 0n) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x === 0n ? 1n : x;
}

/**
 * Verilen kesri BigInt OBEB ile en sade kanonik forma indirger.
 * Üst katmandan bağımsız doğrudan çağrılarda pay ve payda tam sayı/aralık güvenliği doğrulanır.
 */
export function reduceFractionToCanonical(
  numerator: number,
  denominator: number
): { nPrime: bigint; dPrime: bigint } {
  validateFractionNumbers(numerator, denominator);

  const nBig = BigInt(numerator);
  const dBig = BigInt(denominator);
  const g = gcdBigInt(nBig, dBig);
  return {
    nPrime: nBig / g,
    dPrime: dBig / g
  };
}

/**
 * Denk kesirler için en sade kanonik formdan mutlak sağ sınır koordinatını hesaplar.
 * Sıfır pay dahil olmak üzere tüm hesaplama SAF BIGINT ile yürütülür; Number toFixed(2) kullanılmaz.
 * 1/3, 2/6 ve 4/12 için "256.67", sıfır pay için "90.00" dizesi üretilir.
 * Üst katmandan bağımsız doğrudan çağrılarda pay, payda ve geometri bağımsız olarak doğrulanır.
 */
export function computeCanonicalRightBoundary(
  numerator: number,
  denominator: number,
  wholeWidth: number = FRACTION_GEOMETRY.WHOLE_WIDTH,
  padX: number = FRACTION_GEOMETRY.PAD_X
): string {
  validateFractionNumbers(numerator, denominator);
  validateGeometryParameters(wholeWidth, padX);

  // 1. Kanonik rasyonel forma indirgeme
  const { nPrime, dPrime } = reduceFractionToCanonical(numerator, denominator);

  // 2. 100 ölçekli BigInt tamsayı aritmetiği
  const numeratorScaled = nPrime * BigInt(wholeWidth) * 100n;
  const quotient = numeratorScaled / dPrime;
  const remainder = numeratorScaled % dPrime;

  // 3. Round-Half-Up yuvarlama: 2 * kalan >= payda ise yukarı yuvarla
  const roundBump = remainder * 2n >= dPrime ? 1n : 0n;
  const offsetHundredths = quotient + roundBump;
  const totalHundredths = BigInt(padX) * 100n + offsetHundredths;

  // 4. Deterministik iki basamaklı string biçimlendirme (Saf BigInt)
  const wholePart = totalHundredths / 100n;
  const fracPart = totalHundredths % 100n;
  const fracStr = fracPart < 10n ? `0${fracPart}` : `${fracPart}`;

  return `${wholePart}.${fracStr}`;
}

/**
 * Şerit üzerindeki k. bölme sınırının koordinatını bağımsız kapalı BigInt formülüyle üretir.
 * Kümülatif toplama kullanılmaz. k = d durumunda tam olarak padX + wholeWidth döner.
 */
export function computeCellBoundary(
  k: number,
  denominator: number,
  wholeWidth: number = FRACTION_GEOMETRY.WHOLE_WIDTH,
  padX: number = FRACTION_GEOMETRY.PAD_X
): string {
  validateGeometryParameters(wholeWidth, padX);

  if (k <= 0) {
    const totalHundredths = BigInt(padX) * 100n;
    const wholePart = totalHundredths / 100n;
    const fracPart = totalHundredths % 100n;
    const fracStr = fracPart < 10n ? `0${fracPart}` : `${fracPart}`;
    return `${wholePart}.${fracStr}`;
  }
  if (k >= denominator) {
    const totalHundredths = (BigInt(padX) + BigInt(wholeWidth)) * 100n;
    const wholePart = totalHundredths / 100n;
    const fracPart = totalHundredths % 100n;
    const fracStr = fracPart < 10n ? `0${fracPart}` : `${fracPart}`;
    return `${wholePart}.${fracStr}`;
  }

  const kBig = BigInt(k);
  const dBig = BigInt(denominator);
  const numeratorScaled = kBig * BigInt(wholeWidth) * 100n;
  const quotient = numeratorScaled / dBig;
  const remainder = numeratorScaled % dBig;

  const roundBump = remainder * 2n >= dBig ? 1n : 0n;
  const offsetHundredths = quotient + roundBump;
  const totalHundredths = BigInt(padX) * 100n + offsetHundredths;

  const wholePart = totalHundredths / 100n;
  const fracPart = totalHundredths % 100n;
  const fracStr = fracPart < 10n ? `0${fracPart}` : `${fracPart}`;

  return `${wholePart}.${fracStr}`;
}

// =============================================================================
// 2. ÇAKIŞMASIZ SVG ID NORMALİZASYONU (ENJEKTİF HEX-ESCAPE)
// =============================================================================

/**
 * Gelen ham instanceId değerini SVG ve XML standartlarına uygun, çakışmasız
 * enjektif hex-escape algoritmasıyla temizler.
 * - trim() YAPILMAZ; boşluklar da _20_ olarak hex-kodlanır ("r1" != " r1 ").
 * - '_' karakteri _5f_ olarak kaçırılır; bu sayede hex kaçışları ham '_' ile çakışmaz.
 * - Unicode ve surrogate pair karakterleri (emoji vb.) code point bazında işlenir.
 * - Boş string, tanımsız veya geçersiz girdilerde sabit varsayılan ID üretilmez; kontrollü hata fırlatılır.
 */
export function sanitizeSvgInstanceId(rawId?: unknown): string {
  if (typeof rawId !== 'string' || rawId.length === 0) {
    throw new Error('Geçersiz veya eksik instanceId: Boş olamaz ve metin tipinde olmalıdır.');
  }

  let result = '';
  for (const ch of rawId) {
    const cp = ch.codePointAt(0);
    if (cp === undefined) continue;

    // Yalnızca [a-zA-Z0-9-] karakterleri doğrudan korunur
    if (
      (cp >= 48 && cp <= 57) || // 0-9
      (cp >= 65 && cp <= 90) || // A-Z
      (cp >= 97 && cp <= 122) || // a-z
      cp === 45 // -
    ) {
      result += ch;
    } else {
      result += `_${cp.toString(16)}_`;
    }
  }

  return result;
}

// =============================================================================
// 3. GENEL MATEMATİKSEL DOĞRULAMA (validateFractionModelParams)
// =============================================================================

/**
 * Genel kesir modelinin saf matematiksel ve teknik parametrelerini doğrular.
 * - 0/d matematiksel olarak geçerlidir (taranmamış boş bütün).
 * - d > 30 sınırı matematiksel değil, tipografi ve ekran okunabilirlik tavanıdır.
 */
export function validateFractionModelParams(params: unknown): MathematicalValidationResult {
  if (!params || typeof params !== 'object') {
    return { isValid: false, reason: 'Kesir modeli parametreleri tanımsız veya geçersiz nesne.' };
  }

  const p = params as Partial<FractionModelVisualParams>;

  if (p.modelKind !== 'fraction_bar') {
    return { isValid: false, reason: `Desteklenmeyen kesir modeli türü: "${p.modelKind}". Yalnızca "fraction_bar" desteklenir.` };
  }

  if (!Array.isArray(p.bars) || p.bars.length === 0) {
    return { isValid: false, reason: 'Kesir modeli en az bir şerit (bars) içermelidir.' };
  }

  if (p.bars.length > 4) {
    return { isValid: false, reason: `Maksimum şerit sayısı aşıldı (en fazla 4 şerit desteklenir, gelen: ${p.bars.length}).` };
  }

  const seenIds = new Set<string>();

  for (let i = 0; i < p.bars.length; i++) {
    const bar = p.bars[i];
    if (!bar || typeof bar !== 'object') {
      return { isValid: false, reason: `bars[${i}] geçerli bir şerit nesnesi değildir.` };
    }

    if (!bar.id || typeof bar.id !== 'string' || !bar.id.trim()) {
      return { isValid: false, reason: `bars[${i}] için geçerli bir kimlik (id) belirtilmelidir.` };
    }

    if (seenIds.has(bar.id)) {
      return { isValid: false, reason: `Tekrarlanan şerit kimliği bulundu: "${bar.id}".` };
    }
    seenIds.add(bar.id);

    if (!bar.fraction || typeof bar.fraction !== 'object') {
      return { isValid: false, reason: `bars[${i}] ("${bar.id}") kesir değeri tanımsız.` };
    }

    const { numerator, denominator } = bar.fraction;

    if (!Number.isSafeInteger(denominator) || denominator <= 0) {
      return { isValid: false, reason: `bars[${i}] ("${bar.id}") paydası pozitif bir güvenli tam sayı olmalıdır (gelen: ${denominator}).` };
    }

    if (!Number.isSafeInteger(numerator) || numerator < 0) {
      return { isValid: false, reason: `bars[${i}] ("${bar.id}") payı negatif olamaz ve güvenli tam sayı olmalıdır (gelen: ${numerator}).` };
    }

    if (numerator > denominator) {
      return { isValid: false, reason: `bars[${i}] ("${bar.id}") bileşik kesir içeremez (${numerator}/${denominator} > 1). Yalnızca basit kesirler desteklenir.` };
    }

    if (denominator > 30) {
      return { isValid: false, reason: `bars[${i}] ("${bar.id}") görsel okunabilirlik sınırını aştı (maksimum payda: 30, gelen: ${denominator}).` };
    }
  }

  // Bütün genişliği kontrolü (pozitif güvenli tam sayı)
  if (p.wholeWidth !== undefined) {
    if (typeof p.wholeWidth !== 'number' || !Number.isSafeInteger(p.wholeWidth) || p.wholeWidth <= 0 || p.wholeWidth > 2000) {
      return { isValid: false, reason: `wholeWidth pozitif bir güvenli tam sayı olmalıdır (gelen: ${String(p.wholeWidth)}).` };
    }
  }

  // Şerit yüksekliği kontrolü
  if (p.barHeight !== undefined) {
    if (typeof p.barHeight !== 'number' || !Number.isSafeInteger(p.barHeight) || p.barHeight < 20 || p.barHeight > 100) {
      return { isValid: false, reason: `barHeight 20 ile 100 arasında güvenli tam sayı olmalıdır (gelen: ${String(p.barHeight)}).` };
    }
  }

  // padX kontrolü (negatif olmayan güvenli tam sayı)
  const anyP = p as { padX?: unknown };
  if (anyP.padX !== undefined) {
    if (typeof anyP.padX !== 'number' || !Number.isSafeInteger(anyP.padX) || anyP.padX < 0 || anyP.padX > 1000) {
      return { isValid: false, reason: `padX negatif olmayan bir güvenli tam sayı olmalıdır (gelen: ${String(anyP.padX)}).` };
    }
  }

  // Eşdeğerlik kılavuz çizgisi istenmişse denklik zorunlu denetlenir
  if (p.showEquivalenceGuide === true) {
    if (p.bars.length < 2) {
      return { isValid: false, reason: 'Eşdeğerlik kılavuz çizgisi için en az 2 şerit bulunmalıdır.' };
    }

    const refN = BigInt(p.bars[0].fraction.numerator);
    const refD = BigInt(p.bars[0].fraction.denominator);

    for (let i = 1; i < p.bars.length; i++) {
      const curN = BigInt(p.bars[i].fraction.numerator);
      const curD = BigInt(p.bars[i].fraction.denominator);
      if (refN * curD !== curN * refD) {
        return { isValid: false, reason: 'Denk olmayan kesirler için eşdeğerlik kılavuz çizgisi üretilemez.' };
      }
    }
  }

  return { isValid: true };
}

// =============================================================================
// 4. PEDAGOJİK PİLOT DOĞRULAMA KATMANI (validateFractionPilotConstraints)
// =============================================================================

/**
 * MEB 5. Sınıf pilot uygulamasına özel içerik ve pedagoji kısıtlarını doğrular.
 * - Modellenen somut karşılaştırmada boş bütün (n = 0) yasaktır (n >= 1).
 * - En az 2 şerit bulunmalıdır.
 * - Tüm şeritler birbirine denk olmalıdır.
 */
export function validateFractionPilotConstraints(
  params: FractionModelVisualParams
): MathematicalValidationResult {
  const generalRes = validateFractionModelParams(params);
  if (!generalRes.isValid) {
    return generalRes;
  }

  if (params.bars.length < 2) {
    return { isValid: false, reason: 'İlk pilot uygulamada karşılaştırma için en az 2 şerit bulunmalıdır.' };
  }

  for (let i = 0; i < params.bars.length; i++) {
    const bar = params.bars[i];
    if (bar.fraction.numerator < 1) {
      return { isValid: false, reason: `İlk pilot uygulamada modellenen kesirlerin payı en az 1 olmalıdır (şerit: "${bar.id}", gelen: ${bar.fraction.numerator}).` };
    }
  }

  // Pilot gereği tüm şeritlerin denkliği zorunludur
  const refN = BigInt(params.bars[0].fraction.numerator);
  const refD = BigInt(params.bars[0].fraction.denominator);

  for (let i = 1; i < params.bars.length; i++) {
    const curN = BigInt(params.bars[i].fraction.numerator);
    const curD = BigInt(params.bars[i].fraction.denominator);
    if (refN * curD !== curN * refD) {
      return { isValid: false, reason: 'İlk pilot uygulamada karşılaştırılan tüm kesir şeritleri birbirine denk olmalıdır.' };
    }
  }

  return { isValid: true };
}

// =============================================================================
// 5. ÇAKIŞMASIZ SVG DESEN TANIMLAYICISI (generateFractionPatternDefs)
// =============================================================================

/**
 * Baskı ve siyah-beyaz modlar için benzersiz ID'ye sahip SVG desen tanımlarını üretir.
 */
export function generateFractionPatternDefs(
  instanceId: string,
  bars: FractionBarItem[]
): string {
  const defs: string[] = [];

  bars.forEach((bar, index) => {
    const patternType = bar.pattern || 'solid';
    if (patternType === 'solid') {
      return;
    }

    const strokeColor = resolveSvgColor(bar.fillColor || 'slate-800', '#1e293b');
    const patId = `oyss-pat-${instanceId}-${index}-${patternType}`;

    switch (patternType) {
      case 'hatch_diagonal_right':
        defs.push(
          `<pattern id="${patId}" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">` +
          `<line x1="0" y1="0" x2="0" y2="8" stroke="${strokeColor}" stroke-width="2" />` +
          `</pattern>`
        );
        break;
      case 'hatch_diagonal_left':
        defs.push(
          `<pattern id="${patId}" width="8" height="8" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse">` +
          `<line x1="0" y1="0" x2="0" y2="8" stroke="${strokeColor}" stroke-width="2" />` +
          `</pattern>`
        );
        break;
      case 'crosshatch':
        defs.push(
          `<pattern id="${patId}" width="8" height="8" patternUnits="userSpaceOnUse">` +
          `<path d="M 0 0 L 8 0 M 0 0 L 0 8" fill="none" stroke="${strokeColor}" stroke-width="1.5" />` +
          `</pattern>`
        );
        break;
      case 'dots':
        defs.push(
          `<pattern id="${patId}" width="8" height="8" patternUnits="userSpaceOnUse">` +
          `<circle cx="4" cy="4" r="1.5" fill="${strokeColor}" />` +
          `</pattern>`
        );
        break;
    }
  });

  if (defs.length === 0) {
    return '';
  }

  return `<defs>\n${defs.join('\n')}\n</defs>`;
}

// =============================================================================
// 6. VEKTÖREL SVG KESİR ŞERİDİ ÜRETİCİSİ (generateFractionBarSvg)
// =============================================================================

/**
 * W3C standartlarında, deterministik ve baskıya uyumlu vektörel SVG üretir.
 */
export function generateFractionBarSvg(
  params: FractionModelVisualParams,
  options?: FractionRenderOptions
): string {
  const instanceId = sanitizeSvgInstanceId(options?.instanceId);
  const wholeWidth = params.wholeWidth || FRACTION_GEOMETRY.WHOLE_WIDTH;
  const barHeight = params.barHeight || FRACTION_GEOMETRY.DEFAULT_BAR_HEIGHT;
  const gap = params.gap !== undefined ? params.gap : FRACTION_GEOMETRY.DEFAULT_GAP;
  const padX = FRACTION_GEOMETRY.PAD_X;
  const width = FRACTION_GEOMETRY.VIEWBOX_WIDTH;

  const barCount = params.bars.length;
  const contentHeight = barCount * barHeight + (barCount - 1) * gap;
  const totalHeight = FRACTION_GEOMETRY.TOP_PADDING + contentHeight + FRACTION_GEOMETRY.BOTTOM_PADDING;

  const svgParts: string[] = [];

  // SVG Kökü
  svgParts.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${totalHeight}" ` +
    `style="width: 100%; height: auto; max-width: ${width}px; display: block; margin: 0 auto;" ` +
    `role="img" aria-label="Kesir Modeli Karşılaştırma Şeritleri">`
  );

  // Arka plan (saydam)
  svgParts.push(`<rect width="${width}" height="${totalHeight}" fill="transparent" />`);

  // Desen tanımları
  const patternDefs = generateFractionPatternDefs(instanceId, params.bars);
  if (patternDefs) {
    svgParts.push(patternDefs);
  }

  let guideYStart = FRACTION_GEOMETRY.TOP_PADDING - 6;
  let guideYEnd = FRACTION_GEOMETRY.TOP_PADDING + contentHeight + 6;
  let guideX = '0.00';

  // Şeritlerin çizimi
  params.bars.forEach((bar, index) => {
    const yTop = FRACTION_GEOMETRY.TOP_PADDING + index * (barHeight + gap);
    const { numerator, denominator } = bar.fraction;

    // 1. Sol Etiket / Başlık
    if (bar.label) {
      const labelText = escapeXml(bar.label);
      const labelY = yTop + barHeight / 2 + 5;
      svgParts.push(
        `<text x="80" y="${labelY}" font-family="system-ui, -apple-system, sans-serif" ` +
        `font-size="14" font-weight="700" fill="#334155" text-anchor="end">${labelText}</text>`
      );
    }

    // 2. Referans Bütün Arka Plan Dikdörtgeni (Baskıda açık arka plan)
    svgParts.push(
      `<rect x="${padX}.00" y="${yTop}" width="${wholeWidth}.00" height="${barHeight}" ` +
      `fill="#f8fafc" stroke="#334155" stroke-width="1.5" rx="4" ry="4" />`
    );

    // 3. Boyalı Alan Çizimi (numerator > 0 ise)
    if (numerator > 0) {
      const shadedEndX = computeCanonicalRightBoundary(numerator, denominator, wholeWidth, padX);
      const shadedWidth = (Number(shadedEndX) - padX).toFixed(2);
      guideX = shadedEndX; // Kılavuz çizgisi için kanonik koordinat

      const patType = bar.pattern || 'solid';
      let fillAttr = 'fill="#3b82f6"'; // Varsayılan mavi

      if (patType !== 'solid') {
        const patId = `oyss-pat-${instanceId}-${index}-${patType}`;
        fillAttr = `fill="url(#${patId})"`;
      } else if (bar.fillColor) {
        fillAttr = `fill="${resolveSvgColor(bar.fillColor, '#3b82f6')}"`;
      }

      // Boyalı dikdörtgen (sol kenar yuvarlatılmış)
      const isFull = numerator === denominator;
      const rx = isFull ? '4' : '4';
      svgParts.push(
        `<rect x="${padX}.00" y="${yTop}" width="${shadedWidth}" height="${barHeight}" ` +
        `${fillAttr} rx="${rx}" ry="${rx}" stroke="none" />`
      );
    }

    // 4. Eş Parça Bölme Çizgileri (k = 1 ... d-1)
    for (let k = 1; k < denominator; k++) {
      const splitX = computeCellBoundary(k, denominator, wholeWidth, padX);
      svgParts.push(
        `<line x1="${splitX}" y1="${yTop}" x2="${splitX}" y2="${yTop + barHeight}" ` +
        `stroke="#475569" stroke-width="1.5" stroke-dasharray="none" />`
      );
    }

    // 5. Parça İçi Birim Kesir Etiketleri (showUnitFractionLabels: true ise)
    if (bar.showUnitFractionLabels) {
      const cellWidth = wholeWidth / denominator;
      // Yalnızca hücre genişliği 20 SVG biriminden büyükse etiket basılır
      if (cellWidth >= 20) {
        const unitText = `1/${denominator}`;
        const fontSize = cellWidth < 35 ? '10' : '11';
        for (let k = 0; k < denominator; k++) {
          const cellCenterX = (padX + k * cellWidth + cellWidth / 2).toFixed(2);
          const cellCenterY = yTop + barHeight / 2 + 4;
          const textColor = (k < numerator && (!bar.pattern || bar.pattern === 'solid')) ? '#ffffff' : '#334155';
          svgParts.push(
            `<text x="${cellCenterX}" y="${cellCenterY}" font-family="system-ui, sans-serif" ` +
            `font-size="${fontSize}" font-weight="600" fill="${textColor}" text-anchor="middle">${unitText}</text>`
          );
        }
      }
    }

    // 6. Dış Çerçeve Çizgisi (Net kenarlık için tekrar çizilir)
    svgParts.push(
      `<rect x="${padX}.00" y="${yTop}" width="${wholeWidth}.00" height="${barHeight}" ` +
      `fill="none" stroke="#334155" stroke-width="1.5" rx="4" ry="4" />`
    );
  });

  // 7. Eşdeğerlik Kılavuz Çizgisi (showEquivalenceGuide === true ise)
  if (params.showEquivalenceGuide === true) {
    svgParts.push(
      `<line x1="${guideX}" y1="${guideYStart}" x2="${guideX}" y2="${guideYEnd}" ` +
      `stroke="#dc2626" stroke-width="2" stroke-dasharray="5,4" />`
    );
  }

  svgParts.push('</svg>');
  return svgParts.join('\n');
}

// =============================================================================
// 7. KESİR MODELİ BORU HATTI KOORDİNATÖRÜ (renderFractionModel)
// =============================================================================

/**
 * Kesir modelini genel doğrulama boru hattından geçirerek render eder:
 * 1) Parametre doğrulaması (validateFractionModelParams)
 * 2) Deterministik SVG üretimi
 * Pilot pedagojik kısıtları (validateFractionPilotConstraints) bu fonksiyonun dışındadır.
 */
export function renderFractionModel(
  visual: FractionModelVisual,
  options?: FractionRenderOptions
): { svg: string; isValid: boolean; errorReason?: string } {
  if (!visual || typeof visual !== 'object') {
    return {
      svg: generateFallbackSvg('Görsel nesnesi tanımsız.'),
      isValid: false,
      errorReason: 'Görsel nesnesi tanımsız.'
    };
  }

  if (visual.type !== 'fraction_model') {
    return {
      svg: generateFallbackSvg(`Desteklenmeyen görsel türü: ${visual.type}`),
      isValid: false,
      errorReason: `Desteklenmeyen görsel türü: ${visual.type}`
    };
  }

  if (!options?.instanceId || typeof options.instanceId !== 'string' || options.instanceId.length === 0) {
    return {
      svg: generateFallbackSvg('Görsel SVG üretimi için geçerli bir instanceId zorunludur.'),
      isValid: false,
      errorReason: 'Görsel SVG üretimi için geçerli bir instanceId zorunludur.'
    };
  }

  // Genel matematiksel ve teknik parametre doğrulaması (0/d desteklenir)
  const validationRes = validateFractionModelParams(visual.params);
  if (!validationRes.isValid) {
    return {
      svg: generateFallbackSvg(validationRes.reason),
      isValid: false,
      errorReason: validationRes.reason
    };
  }

  // SVG Üretimi
  try {
    const svg = generateFractionBarSvg(visual.params, options);
    return {
      svg,
      isValid: true
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      svg: generateFallbackSvg(msg),
      isValid: false,
      errorReason: msg
    };
  }
}

