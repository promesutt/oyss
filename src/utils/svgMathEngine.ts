/**
 * OYSS Rehberi | Akıllı Görselleştirme Altyapısı
 * SVG Matematik Motoru (svgMathEngine.ts)
 * 
 * Sorumluluk: Sayı doğrusu ve matematiksel vektörel çizimleri
 * BigInt tam kesir analitiği ile, float yuvarlama hatası olmaksızın,
 * deterministik ve çalışma zamanı güvenliğiyle üretmek.
 */

import {
  RationalFraction,
  SemanticAnchor,
  SemanticAnchorPoint,
  SemanticValidationResult,
  MathematicalValidationResult,
  NumberLineVisualParams,
  NumberLinePoint,
  QuestionVisual
} from '../types';
import { renderFractionModel, FractionRenderOptions } from './fractionMathEngine';
import { renderGeometryShape } from './svgGeometryEngine';

export type { NumberLinePoint };

// =============================================================================
// 1. RENK DÖNÜŞÜM SÖZLÜĞÜ VE W3C HEX ÇÖZÜMLEME
// =============================================================================

/**
 * Tailwind CSS token'larını W3C geçerli HEX renk kodlarına dönüştüren eşleme tablosu.
 * SVG fill ve stroke nitelikleri Tailwind sınıf adlarını doğrudan tanımaz.
 */
export const SVG_COLOR_MAP: Record<string, string> = {
  // Slate Nötr Renkleri (Eksen çizgisi, çentikler ve metinler)
  'slate-900': '#0f172a',
  'slate-800': '#1e293b',
  'slate-700': '#334155',
  'slate-600': '#475569',
  'slate-500': '#64748b',
  'slate-400': '#94a3b8',
  'slate-300': '#cbd5e1',
  'slate-200': '#e2e8f0',
  'slate-100': '#f1f5f9',
  // Vurgu ve Karşılaştırma Renkleri (Noktalar, diyaloglar)
  'indigo-600': '#4f46e5',
  'indigo-700': '#4338ca',
  'emerald-600': '#059669',
  'rose-600': '#e11d48',
  'rose-700': '#be123c',
  'amber-500': '#f59e0b',
  'blue-600': '#2563eb',
  'violet-600': '#7c3aed',
  // Standart SVG Anahtar Kelimeleri
  'currentColor': 'currentColor',
  'transparent': 'transparent',
  'none': 'none'
};

const HEX_COLOR_REGEX = /^#(?:[0-9a-fA-F]{3}){1,2}$/;

/**
 * Giriş rengini güvenli bir şekilde W3C uyumlu SVG renk değerine dönüştürür.
 * Tailwind sınıfı gelirse HEX karşılığını, geçerli HEX gelirse kendisini,
 * geçersiz veya enjeksiyon riski taşıyan durumlarda fallback (#334155) döndürür.
 */
export function resolveSvgColor(inputColor?: string, fallback = '#334155'): string {
  if (!inputColor || typeof inputColor !== 'string') return fallback;
  const trimmed = inputColor.trim();

  // 1. Eşleme sözlüğünde var mı?
  if (SVG_COLOR_MAP[trimmed]) {
    return SVG_COLOR_MAP[trimmed];
  }

  // 2. Doğrudan geçerli HEX kodu mu? (#RGB veya #RRGGBB)
  if (HEX_COLOR_REGEX.test(trimmed)) {
    return trimmed;
  }

  return fallback;
}

// =============================================================================
// 2. XML VE METİN GÜVENLİĞİ (XSS VE AYRIŞTIRMA KORUMASI)
// =============================================================================

/**
 * SVG metin etiketlerinde XML ayrıştırma hatasını ve enjeksiyon risklerini
 * önlemek amacıyla özel karakterleri kaçış dizilerine dönüştürür.
 */
export function escapeXml(unsafe: string): string {
  if (typeof unsafe !== 'string') return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// =============================================================================
// 3. BIGINT TAM HASSASİYETTE KESİR KARŞILAŞTIRMASI
// =============================================================================

/**
 * İki rasyonel sayıyı BigInt çapraz çarpımı ile mutlak matematiksel hassasiyette karşılaştırır.
 * Float bölme (n/d) asla kullanılmaz.
 * 
 * @returns -1 (f1 < f2), +1 (f1 > f2), 0 (f1 === f2 - denk kesirler)
 * @throws Hatalı tam sayı veya sıfır/negatif payda durumunda Error fırlatır.
 */
export function compareFractionsExact(f1: RationalFraction, f2: RationalFraction): number {
  if (!f1 || !f2 || typeof f1 !== 'object' || typeof f2 !== 'object') {
    throw new Error('Geçersiz kesir nesnesi');
  }
  if (!Number.isSafeInteger(f1.numerator) || !Number.isSafeInteger(f1.denominator) ||
      !Number.isSafeInteger(f2.numerator) || !Number.isSafeInteger(f2.denominator)) {
    throw new Error('Pay ve payda güvenli tam sayı (safe integer) olmalıdır');
  }
  if (f1.denominator <= 0 || f2.denominator <= 0) {
    throw new Error('Payda pozitif bir tam sayı olmalıdır (d > 0)');
  }

  const left = BigInt(f1.numerator) * BigInt(f2.denominator);
  const right = BigInt(f2.numerator) * BigInt(f1.denominator);

  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
}

// =============================================================================
// 4. ADIM 1: SAF MATEMATİKSEL DOĞRULAMA (validateMathematicalParams)
// =============================================================================

/**
 * Sayı doğrusu çizim parametrelerinin sayısal ve geometrik sınır geçerliliğini denetler.
 * Float karşılaştırması kullanmaz; kesirlerin [min, max] aralığında olup olmadığını
 * BigInt analitik çapraz çarpımı ile kesin olarak doğrular.
 */
export function validateMathematicalParams(params: unknown): MathematicalValidationResult {
  if (!params || typeof params !== 'object' || params === null) {
    return { isValid: false, reason: 'Parametre nesnesi tanımsız veya geçersiz.' };
  }

  const p = params as Record<string, unknown>;

  // 1. min ve max güvenli tam sayı kontrolü
  if (!Number.isSafeInteger(p.min) || !Number.isSafeInteger(p.max)) {
    return { isValid: false, reason: 'min ve max değerleri güvenli tam sayı (safe integer) olmalıdır.' };
  }

  const min = p.min as number;
  const max = p.max as number;

  if (min >= max) {
    return { isValid: false, reason: `min (${min}) değeri max (${max}) değerinden küçük olmalıdır.` };
  }

  // 2. step ve subdivisions kontrolü
  if (p.step !== undefined) {
    if (!Number.isSafeInteger(p.step) || (p.step as number) <= 0) {
      return { isValid: false, reason: 'step değeri pozitif bir güvenli tam sayı olmalıdır.' };
    }
  }

  if (p.subdivisions !== undefined) {
    if (!Number.isSafeInteger(p.subdivisions) || (p.subdivisions as number) <= 0) {
      return { isValid: false, reason: 'subdivisions değeri pozitif bir güvenli tam sayı olmalıdır.' };
    }
  }

  // 3. points dizisi kontrolü
  if (!Array.isArray(p.points)) {
    return { isValid: false, reason: 'points bir dizi olmalıdır.' };
  }

  const minBig = BigInt(min);
  const maxBig = BigInt(max);

  for (let i = 0; i < p.points.length; i++) {
    const pt = p.points[i];
    if (!pt || typeof pt !== 'object' || pt === null) {
      return { isValid: false, reason: `${i}. nokta geçersiz bir nesnedir.` };
    }

    const { id, numerator, denominator } = pt as Record<string, unknown>;

    // ID denetimi
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return { isValid: false, reason: `${i}. noktada boş veya geçersiz ID bulundu.` };
    }

    // Pay ve payda güvenli tam sayı kontrolü
    if (!Number.isSafeInteger(numerator) || !Number.isSafeInteger(denominator)) {
      return { isValid: false, reason: `"${id}" noktasının pay ve paydası güvenli tam sayı olmalıdır.` };
    }

    const n = numerator as number;
    const d = denominator as number;

    // Pozitif payda kontrolü (d > 0)
    if (d <= 0) {
      return { isValid: false, reason: `"${id}" noktasının paydası sıfırdan büyük pozitif bir tam sayı olmalıdır (d > 0).` };
    }

    // 4. Kesir değerinin [min, max] aralığında olduğunun BigInt çapraz çarpımı ile KESİN kontrolü:
    // d > 0 olduğundan:
    // v >= min <=> n / d >= min <=> n >= min * d <=> BigInt(n) >= BigInt(min) * BigInt(d)
    // v <= max <=> n / d <= max <=> n <= max * d <=> BigInt(n) <= BigInt(max) * BigInt(d)
    const nBig = BigInt(n);
    const dBig = BigInt(d);

    const minBoundBig = minBig * dBig;
    const maxBoundBig = maxBig * dBig;

    if (nBig < minBoundBig) {
      return {
        isValid: false,
        reason: `"${id}" noktasının değeri (${n}/${d}), eksen başlangıcı olan min (${min}) sınırının altındadır.`
      };
    }

    if (nBig > maxBoundBig) {
      return {
        isValid: false,
        reason: `"${id}" noktasının değeri (${n}/${d}), eksen bitişi olan max (${max}) sınırının üzerindedir.`
      };
    }
  }

  return { isValid: true };
}

// =============================================================================
// 5. ADIM 2: ANLAMSAL DOĞRULAMA (validateSemanticConsistency)
// =============================================================================

/**
 * Çizimdeki noktaların soru gereksinimleriyle birebir ID ve BigInt değer eşleşmesini
 * çalışma zamanı nesne/alan kontrollerini içeren 7 aşamalı katı doğrulama sırasına göre denetler.
 *
 * Güvenlik Kapsamı: JSON benzeri standart veri yapıları, null/undefined, beklenmeyen ilkel tipler,
 * eksik alanlar ve geçersiz dizi elemanları karşısında istisna fırlatmaz; kontrollü hata döner.
 */
export function validateSemanticConsistency(
  visualPoints: unknown,
  anchors: unknown
): SemanticValidationResult {
  // AŞAMA 1: Kök nesne, dizi varlığı, allowExtraPoints tip denetimi ve eleman nesne kontrolleri
  if (!Array.isArray(visualPoints) || !anchors || typeof anchors !== 'object' || anchors === null) {
    return { isValid: false, reason: 'Geçersiz parametre veya çapa veri yapısı.' };
  }

  const anchorObj = anchors as Record<string, unknown>;
  if (!Array.isArray(anchorObj.expectedPoints)) {
    return { isValid: false, reason: 'anchors.expectedPoints geçerli bir dizi olmalıdır.' };
  }

  // 1a. Boş beklenen nokta listesi reddi
  if (anchorObj.expectedPoints.length === 0) {
    return { isValid: false, reason: 'Beklenen nokta listesi (anchors.expectedPoints) boş olamaz.' };
  }

  // 1b. allowExtraPoints kesin boolean doğrulaması (yalnızca anchorObj üzerinden)
  if (
    anchorObj.allowExtraPoints !== undefined &&
    typeof anchorObj.allowExtraPoints !== 'boolean'
  ) {
    return {
      isValid: false,
      reason: 'allowExtraPoints alanı yalnızca boolean (true/false) veya tanımsız olabilir.'
    };
  }

  const allowExtra = anchorObj.allowExtraPoints === true;

  // 1c. anchors.expectedPoints elemanlarının null/undefined/nesne kontrolü ve boş ID denetimi
  for (let i = 0; i < anchorObj.expectedPoints.length; i++) {
    const exp = anchorObj.expectedPoints[i];
    if (!exp || typeof exp !== 'object' || exp === null) {
      return { isValid: false, reason: `anchors.expectedPoints[${i}] geçerli bir nesne değildir.` };
    }
    const expObj = exp as Record<string, unknown>;
    if (!expObj.id || typeof expObj.id !== 'string' || expObj.id.trim() === '') {
      return { isValid: false, reason: `anchors.expectedPoints[${i}] elemanında boş veya geçersiz ID bulundu.` };
    }
  }

  // 1d. visualPoints elemanlarının null/undefined/nesne kontrolü ve boş ID denetimi
  for (let i = 0; i < visualPoints.length; i++) {
    const pt = visualPoints[i];
    if (!pt || typeof pt !== 'object' || pt === null) {
      return { isValid: false, reason: `visualPoints[${i}] geçerli bir nesne değildir.` };
    }
    const ptObj = pt as Record<string, unknown>;
    if (!ptObj.id || typeof ptObj.id !== 'string' || ptObj.id.trim() === '') {
      return { isValid: false, reason: `visualPoints[${i}] elemanında boş veya geçersiz ID bulundu.` };
    }
  }

  // AŞAMA 2: Beklenen ID tekrar kontrolü
  const expectedIds = new Set<string>();
  for (const exp of anchorObj.expectedPoints as Record<string, unknown>[]) {
    const cleanId = (exp.id as string).trim();
    if (expectedIds.has(cleanId)) {
      return { isValid: false, reason: `Beklenen noktalar arasında tekrarlanan (duplicate) ID bulundu: "${cleanId}".` };
    }
    expectedIds.add(cleanId);
  }

  // AŞAMA 3: Görsel ID tekrar kontrolü (Ekstra noktalar dahil TÜM görsel noktalarında ID benzersiz olmalıdır)
  const visualIds = new Set<string>();
  for (const pt of visualPoints as Record<string, unknown>[]) {
    const cleanId = (pt.id as string).trim();
    if (visualIds.has(cleanId)) {
      return { isValid: false, reason: `Görsel noktalar arasında tekrarlanan (duplicate) ID bulundu: "${cleanId}".` };
    }
    visualIds.add(cleanId);
  }

  // AŞAMA 4: Pay ve payda güvenliği (Number.isSafeInteger - TÜM noktalar için)
  for (const exp of anchorObj.expectedPoints as Record<string, unknown>[]) {
    if (!Number.isSafeInteger(exp.numerator) || !Number.isSafeInteger(exp.denominator)) {
      return { isValid: false, reason: `Beklenen "${exp.id}" noktasında güvenli tam sayı sınırını aşan veya tanımsız pay/payda tespit edildi.` };
    }
  }

  for (const pt of visualPoints as Record<string, unknown>[]) {
    if (!Number.isSafeInteger(pt.numerator) || !Number.isSafeInteger(pt.denominator)) {
      return { isValid: false, reason: `Görseldeki "${pt.id}" noktasında güvenli tam sayı sınırını aşan veya tanımsız pay/payda tespit edildi.` };
    }
  }

  // AŞAMA 5: Pozitif payda kontrolü (d > 0 - TÜM noktalar için)
  for (const exp of anchorObj.expectedPoints as Record<string, unknown>[]) {
    if ((exp.denominator as number) <= 0) {
      return { isValid: false, reason: `Beklenen "${exp.id}" noktasında sıfır veya negatif payda tespit edildi (d <= 0).` };
    }
  }

  for (const pt of visualPoints as Record<string, unknown>[]) {
    if ((pt.denominator as number) <= 0) {
      return { isValid: false, reason: `Görseldeki "${pt.id}" noktasında sıfır veya negatif payda tespit edildi (d <= 0).` };
    }
  }

  // AŞAMA 6: ID bazlı birebir kesir eşleştirmesi (BigInt denk kesir denetimi)
  const typedVisualPoints = visualPoints as { id: string; numerator: number; denominator: number }[];
  for (const exp of anchorObj.expectedPoints as SemanticAnchorPoint[]) {
    const cleanExpId = exp.id.trim();
    const matchedPoint = typedVisualPoints.find(pt => pt.id.trim() === cleanExpId);

    if (!matchedPoint) {
      return { isValid: false, reason: `Soru için zorunlu olan "${cleanExpId}" kimlikli nokta görselde bulunamadı (eksik nokta).` };
    }

    // BigInt çapraz çarpımı ile denk kesir denetimi (ör. 3/4 ile 6/8 denktir)
    const left = BigInt(matchedPoint.numerator) * BigInt(exp.denominator);
    const right = BigInt(exp.numerator) * BigInt(matchedPoint.denominator);

    if (left !== right) {
      return {
        isValid: false,
        reason: `"${cleanExpId}" kimlikli noktanın kesir değeri uyuşmuyor: Beklenen ${exp.numerator}/${exp.denominator}, gelen ${matchedPoint.numerator}/${matchedPoint.denominator}.`
      };
    }
  }

  // AŞAMA 7: Beklenmeyen ekstra nokta kontrolü
  if (!allowExtra && typedVisualPoints.length !== (anchorObj.expectedPoints as unknown[]).length) {
    const extraPoints = typedVisualPoints.filter(pt => !expectedIds.has(pt.id.trim()));
    if (extraPoints.length > 0) {
      return {
        isValid: false,
        reason: `Görselde soru kapsamında tanımlanmamış fazladan noktalar bulundu: ${extraPoints.map(p => p.id).join(', ')}.`
      };
    }
  }

  return { isValid: true };
}

// =============================================================================
// 6. ADIM 3: VEKTÖREL SVG SAYI DOĞRUSU ÜRETİCİSİ (generateNumberLineSvg)
// =============================================================================

/**
 * Sayı doğrusu için W3C standartlarında, responsive ve baskıya uyumlu vektörel SVG üretir.
 * Matematiksel veya parametrik hata durumunda güvenli fallback SVG'si döndürür.
 */
export function generateNumberLineSvg(params: NumberLineVisualParams): string {
  // Önce saf matematiksel doğrulama
  const mathValidation = validateMathematicalParams(params);
  if (!mathValidation.isValid) {
    return generateFallbackSvg(mathValidation.reason);
  }

  const min = params.min;
  const max = params.max;
  const step = params.step || 1;
  const subdivisions = params.subdivisions || 1;
  const points = params.points || [];
  const showArrows = params.showArrows !== false; // varsayılan true
  const showOrigin = params.showOrigin !== false; // varsayılan true

  // Geometrik boyutlandırma
  const width = 640;
  const height = 140;
  const paddingX = 45;
  const paddingY = 70; // Eksenin dikey konumu
  const usableWidth = width - 2 * paddingX; // 550px
  const extensionMargin = 25; // Çentiklerin ötesine taşan eksen uzantısı (E_ext)

  const axisStartX = paddingX - extensionMargin; // 20px
  const axisEndX = paddingX + usableWidth + extensionMargin; // 620px

  const strokeColor = resolveSvgColor('slate-700', '#334155');
  const tickColor = resolveSvgColor('slate-800', '#1e293b');
  const subTickColor = resolveSvgColor('slate-400', '#94a3b8');

  const svgParts: string[] = [];

  // SVG Kök Etiketi
  svgParts.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" ` +
    `style="width: 100%; height: auto; max-width: ${width}px; display: block; margin: 0 auto;" ` +
    `role="img" aria-label="Sayı doğrusu: [${min}, ${max}] aralığı">`
  );

  // Arka plan (baskıda temiz kalması için saydam)
  svgParts.push(`<rect width="${width}" height="${height}" fill="transparent" />`);

  // Ana Eksen Çizgisi (Uzantıları kapsar)
  svgParts.push(
    `<line x1="${axisStartX}" y1="${paddingY}" x2="${axisEndX}" y2="${paddingY}" ` +
    `stroke="${strokeColor}" stroke-width="2.5" stroke-linecap="round" />`
  );

  // Sonsuzluk Okları (Eksen uzantılarının ucunda)
  if (showArrows) {
    const arrowSize = 7;
    // Sol Ok (<)
    svgParts.push(
      `<polygon points="${axisStartX},${paddingY} ${axisStartX + arrowSize},${paddingY - arrowSize} ${axisStartX + arrowSize},${paddingY + arrowSize}" ` +
      `fill="${strokeColor}" />`
    );
    // Sağ Ok (>)
    svgParts.push(
      `<polygon points="${axisEndX},${paddingY} ${axisEndX - arrowSize},${paddingY - arrowSize} ${axisEndX - arrowSize},${paddingY + arrowSize}" ` +
      `fill="${strokeColor}" />`
    );
  }

  // Eksen ve Aralığın BigInt Temsili (Hassasiyet kaybı olmaksızın)
  const minBig = BigInt(min);
  const maxBig = BigInt(max);
  const totalRangeBig = maxBig - minBig;

  // Alt Çentikler (Subdivisions)
  if (subdivisions > 1) {
    const totalSubdivisionsBig = totalRangeBig * BigInt(subdivisions);
    // Yalnızca makul alt çentik sayısında (ör. <= 200) alt çentikleri çiz (DOM/SVG kilitlenmesini önler)
    if (totalSubdivisionsBig <= 200n) {
      const totalSubsNum = Number(totalSubdivisionsBig);
      for (let s = 1; s < totalSubsNum; s++) {
        if (s % subdivisions !== 0) {
          // Tam sayı çentiklerine denk gelmeyen ara parçalar
          const subX = paddingX + (s / totalSubsNum) * usableWidth;
          svgParts.push(
            `<line x1="${subX.toFixed(2)}" y1="${paddingY - 4}" x2="${subX.toFixed(2)}" y2="${paddingY + 4}" ` +
            `stroke="${subTickColor}" stroke-width="1.2" />`
          );
        }
      }
    }
  }

  // Ana Tam Sayı Çentikleri ve Etiketleri
  const stepBig = BigInt(step);
  const tickCountBig = totalRangeBig / stepBig;

  const renderTick = (val: number | bigint) => {
    const valBig = BigInt(val);
    const valDiffBig = valBig - minBig;
    const x = paddingX + (Number(valDiffBig * BigInt(1000000) / totalRangeBig) / 1000000) * usableWidth;
    const isZero = valBig === 0n && showOrigin;
    const tickH = isZero ? 10 : 8;
    const tickW = isZero ? 2.5 : 2;
    const tickCol = isZero ? resolveSvgColor('indigo-700', '#4338ca') : tickColor;

    // Çentik çizgisi
    svgParts.push(
      `<line x1="${x.toFixed(2)}" y1="${paddingY - tickH}" x2="${x.toFixed(2)}" y2="${paddingY + tickH}" ` +
      `stroke="${tickCol}" stroke-width="${tickW}" />`
    );

    // Tam sayı etiketi (altında)
    const labelWeight = isZero ? 'font-weight="bold"' : 'font-weight="600"';
    svgParts.push(
      `<text x="${x.toFixed(2)}" y="${paddingY + 24}" text-anchor="middle" ` +
      `fill="${tickCol}" font-size="13" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" ` +
      `${labelWeight}>${val.toString()}</text>`
    );
  };

  if (tickCountBig <= 100n) {
    for (let val = min; val <= max; val += step) {
      renderTick(val);
    }
  } else {
    // Çentik adımı aşırı fazlaysa (ör. çok geniş aralıklar) SVG patlamasını önlemek için min, max ve varsa 0 çizilir
    renderTick(min);
    if (min < 0 && max > 0 && showOrigin) {
      renderTick(0);
    }
    renderTick(max);
  }

  // Noktalar (Points)
  // Çift kademeli etiketleme için yerleşim yönetimi
  points.forEach((pt, index) => {
    const n = pt.numerator;
    const d = pt.denominator;

    // Analitik X koordinatı hesabı:
    // X = paddingX + ( (n - min * d) / (d * totalRange) ) * usableWidth
    // Tüm ara matematiksel işlemler BigInt ile yürütülür; Number dönüşümü yalnızca son piksel ölçeklemesinde yapılır.
    const ratioNumerator = BigInt(n) - minBig * BigInt(d);
    const ratioDenominator = BigInt(d) * totalRangeBig;
    const x = paddingX + (Number(ratioNumerator * BigInt(1000000) / ratioDenominator) / 1000000) * usableWidth;

    const ptColor = resolveSvgColor(pt.color || 'indigo-600', '#4f46e5');

    // Nokta Dairesi
    svgParts.push(
      `<circle cx="${x.toFixed(2)}" cy="${paddingY}" r="5.5" ` +
      `fill="${ptColor}" stroke="#ffffff" stroke-width="2" />`
    );

    // Üst Etiket (Örn: Mert: -3/4)
    if (pt.label) {
      const isAlternate = index % 2 === 1;
      const labelY = isAlternate ? paddingY - 32 : paddingY - 16;
      svgParts.push(
        `<text x="${x.toFixed(2)}" y="${labelY}" text-anchor="middle" ` +
        `fill="${ptColor}" font-size="12.5" font-weight="700" ` +
        `font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif">` +
        `${escapeXml(pt.label)}</text>`
      );

      // Etiket ile nokta arasına küçük gösterge çizgisi
      svgParts.push(
        `<line x1="${x.toFixed(2)}" y1="${labelY + 4}" x2="${x.toFixed(2)}" y2="${paddingY - 7}" ` +
        `stroke="${ptColor}" stroke-width="1" stroke-dasharray="2 2" />`
      );
    }
  });

  svgParts.push(`</svg>`);
  return svgParts.join('\n');
}

// =============================================================================
// 7. GÜVENLİ FALLBACK GÖRÜNÜMÜ (generateFallbackSvg)
// =============================================================================

/**
 * Hatalı veya geçersiz parametre durumunda bileşen ağacının çökmesini
 * engelleyen, erişilebilir ve açıklayıcı fallback SVG konteyneri üretir.
 */
export function generateFallbackSvg(reason?: string): string {
  const safeReason = escapeXml(reason || 'Matematiksel çizim parametreleri doğrulanamadı.');
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 100" `,
    `style="width: 100%; height: auto; max-width: 640px; display: block; margin: 0 auto;" `,
    `role="img" aria-label="Görsel yüklenemedi uyarısı">`,
    `  <rect width="640" height="100" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="6 4" />`,
    `  <text x="320" y="42" text-anchor="middle" fill="#dc2626" font-size="13" font-weight="bold" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">⚠️ Matematiksel Çizim Yüklenemedi</text>`,
    `  <text x="320" y="66" text-anchor="middle" fill="#64748b" font-size="11" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">${safeReason}</text>`,
    `</svg>`
  ].join('\n');
}

// =============================================================================
// 8. İKİ KADEMELİ BORU HATTI KOORDİNATÖRÜ (renderQuestionVisual)
// =============================================================================

export interface RenderVisualOptions extends FractionRenderOptions {
  instanceId?: string;
}

/**
 * Soru görselini iki kademeli katı doğrulama boru hattından geçirerek render eden ana dağıtıcı (dispatcher):
 * - type === 'number_line': Sayı doğrusu boru hattı (Faz 1)
 * - type === 'fraction_model': Modüler kesir motoru boru hattı (Faz 3.1)
 * - diğer türler: Güvenli fallback SVG
 */
export function renderQuestionVisual(
  visual: QuestionVisual,
  anchorOrOptions?: SemanticAnchor | RenderVisualOptions,
  maybeOptions?: RenderVisualOptions
): { svg: string; isValid: boolean; errorReason?: string } {
  if (!visual || typeof visual !== 'object') {
    return {
      svg: generateFallbackSvg('Görsel nesnesi tanımsız.'),
      isValid: false,
      errorReason: 'Görsel nesnesi tanımsız.'
    };
  }

  // İkinci parametrenin SemanticAnchor mu yoksa RenderVisualOptions mu olduğunu ayırt et
  let anchor: SemanticAnchor | undefined;
  let options: RenderVisualOptions | undefined;

  if (anchorOrOptions && 'expectedPoints' in anchorOrOptions) {
    anchor = anchorOrOptions;
    options = maybeOptions;
  } else if (anchorOrOptions && typeof anchorOrOptions === 'object') {
    options = anchorOrOptions as RenderVisualOptions;
  }

  switch (visual.type) {
    case 'number_line': {
      // ADIM 1: Saf Matematiksel Doğrulama
      const mathRes = validateMathematicalParams(visual.params);
      if (!mathRes.isValid) {
        return {
          svg: generateFallbackSvg(mathRes.reason),
          isValid: false,
          errorReason: mathRes.reason
        };
      }

      const nlParams = visual.params;

      // ADIM 2: Anlamsal Doğrulama (Açıkça aktarılan veya görsel içinde tanımlı çapa ile)
      const effectiveAnchor = anchor || visual.anchor;
      if (effectiveAnchor) {
        const semanticRes = validateSemanticConsistency(nlParams.points, effectiveAnchor);
        if (!semanticRes.isValid) {
          return {
            svg: generateFallbackSvg(semanticRes.reason),
            isValid: false,
            errorReason: semanticRes.reason
          };
        }
      }

      // ADIM 3: Vektörel SVG Üretimi
      const svg = generateNumberLineSvg(nlParams);
      return { svg, isValid: true };
    }

    case 'fraction_model': {
      return renderFractionModel(visual, options);
    }

    case 'geometry_shape': {
      return renderGeometryShape(visual, options);
    }

    default: {
      const unsupportedType = (visual as { type: string }).type || 'Bilinmeyen';
      return {
        svg: generateFallbackSvg(`Desteklenmeyen görsel türü: ${unsupportedType}`),
        isValid: false,
        errorReason: `Desteklenmeyen görsel türü: ${unsupportedType}`
      };
    }
  }
}
