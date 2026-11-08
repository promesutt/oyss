/**
 * OYSS Rehberi | AI Görsel Doğrulama ve Güvenlik Filtresi (TASK158)
 * aiVisualValidator.ts
 * 
 * Sorumluluk:
 * - Yapay zekâ (Gemini) tarafından üretilen isteğe bağlı `visual` nesnelerini denetlemek.
 * - Mevcut SVG motoru doğrulayıcılarından (`validateGeometryParams`, `validateMathematicalParams`, `validateFractionModelParams`) geçirmek.
 * - Anti-leak (cevap sızdırmama) kontrolü: Görsel etiketlerinde cevabın doğrudan yazılmasını engellemek ('?' veya nötr sembol ile ikame etmek).
 * - Kusurlu veya geçersiz görsel verilerinde soru üretiminin çökmesini önlemek; güvenli bir biçimde `visual: undefined` dönmek.
 */

import { QuestionVisual, GeometryShapeVisualParams } from '../types';
import { validateGeometryParams } from './svgGeometryEngine';
import { validateMathematicalParams } from './svgMathEngine';
import { validateFractionModelParams } from './fractionMathEngine';

export interface AiVisualValidationResult {
  isValid: boolean;
  visual?: QuestionVisual;
  reason?: string;
}

/**
 * AI tarafından üretilen görsel verisindeki etiketlerin sorunun cevabını
 * doğrudan ele verip vermediğini denetler ve gerekirse nötrleştirir.
 */
function sanitizeAntiLeak(visual: QuestionVisual, candidateAnswer?: string): QuestionVisual {
  const answerStr = (candidateAnswer || '').trim().toLowerCase();
  if (!answerStr) return visual;

  const clone: QuestionVisual = JSON.parse(JSON.stringify(visual));

  if (clone.type === 'geometry_shape') {
    const p = clone.params as GeometryShapeVisualParams;

    // A. Açı Modelleri (Bilinmeyen açının cevabı etikette ifşa edilmişse '?' ile değiştir)
    if (p.angles && Array.isArray(p.angles)) {
      p.angles.forEach(a => {
        const lbl = (a.degreeLabel || (a as any).label || '').toString().trim();
        // Eğer etiket doğrudan cevapta geçen dereceyi veya sayıyı içeriyorsa
        if (lbl && answerStr.includes(lbl.toLowerCase()) && !lbl.includes('?')) {
          // Açının kendisi soru konusu ise '?' yap
          a.degreeLabel = '?';
          (a as any).label = '?';
        }
      });
    }

    // B. Saat Modelleri
    if (p.clocks && Array.isArray(p.clocks)) {
      p.clocks.forEach(c => {
        if (c.angleLabel && answerStr.includes(c.angleLabel.toLowerCase()) && answerStr.length < 30) {
          // Çok kısa cevapta direkt açı çeşidi soruluyorsa etiketi sadeleştir
          c.angleLabel = undefined;
        }
      });
    }

    // C. Çokgen Kenar Etiketleri (Örn: soru x kenarını soruyorsa ve x değeri cevapta varsa)
    if (p.polygons && Array.isArray(p.polygons)) {
      p.polygons.forEach(poly => {
        if (poly.edgeLabels && Array.isArray(poly.edgeLabels)) {
          poly.edgeLabels = poly.edgeLabels.map(el => {
            if (el && answerStr === el.trim().toLowerCase()) {
              return '?';
            }
            return el;
          });
        }
      });
    }
  }

  return clone;
}

/**
 * AI (Gemini) tarafından üretilen ham görsel nesnesini,
 * motorun beklediği parametre yapısına ve standart koordinatlarına dönüştürür.
 */
function normalizeAiVisual(rawVisual: any): any {
  if (!rawVisual || typeof rawVisual !== 'object') return rawVisual;
  const v = { ...rawVisual };
  const p = { ...(v.params || {}) };

  // 1. NUMBER LINE (Sayı Doğrusu) Normalizasyonu
  if (v.type === 'number_line') {
    if (p.min === undefined && p.start !== undefined) p.min = p.start;
    if (p.max === undefined && p.end !== undefined) p.max = p.end;
    if (typeof p.min === 'number') p.min = Math.floor(p.min);
    if (typeof p.max === 'number') p.max = Math.ceil(p.max);
    if (p.step !== undefined && typeof p.step === 'number') {
      p.step = Number.isSafeInteger(p.step) && p.step > 0 ? p.step : 1;
    }

    let pts = Array.isArray(p.points) ? p.points : (p.points ? [p.points] : []);
    p.points = pts.map((pt: any, idx: number) => {
      const id = String(pt.id || pt.label || `pt_${idx + 1}`);
      let num = pt.numerator;
      let den = pt.denominator;
      const rawVal = pt.val ?? pt.value ?? pt.pos ?? pt.position;
      if ((num === undefined || den === undefined) && typeof rawVal === 'number') {
        if (Number.isInteger(rawVal)) {
          num = rawVal;
          den = 1;
        } else {
          num = Math.round(rawVal * 100);
          den = 100;
        }
      }
      num = Number.isSafeInteger(num) ? num : p.min;
      den = Number.isSafeInteger(den) && den > 0 ? den : 1;
      return {
        id,
        numerator: num,
        denominator: den,
        label: pt.label !== undefined ? String(pt.label) : '?'
      };
    });
    v.params = p;
  }
  // 2. GEOMETRY SHAPE Normalizasyonu
  else if (v.type === 'geometry_shape') {
    if (!p.subType) {
      if (p.tessellation || p.tileWidth || p.tileHeight) p.subType = 'area_perimeter';
      else if (p.lines) p.subType = 'line_system';
      else if (p.angles || p.clocks) p.subType = 'angle_model';
      else if (p.grid || (p.cols && p.rows)) p.subType = 'grid_coordinate';
      else p.subType = 'polygon_2d';
    }

    if (p.subType === 'area_perimeter') {
      if (!p.tessellation && (p.totalWidth || p.width)) {
        const tw = Number(p.totalWidth || p.width || 180);
        const th = Number(p.totalHeight || p.height || 120);
        const tileW = Number(p.tileWidth || tw / 3);
        const tileH = Number(p.tileHeight || th / 2);
        p.tessellation = {
          totalWidth: tw,
          totalHeight: th,
          tileWidth: tileW > 0 ? tileW : 60,
          tileHeight: tileH > 0 ? tileH : 60,
          widthLabel: String(p.widthLabel || `${tw} m`),
          heightLabel: String(p.heightLabel || `${th} m`)
        };
      }
    } else if (p.subType === 'polygon_2d') {
      if (!p.polygons || !Array.isArray(p.polygons) || p.polygons.length === 0) {
        if (p.shape === 'triangle') {
          p.polygons = [{
            points: [{ x: 300, y: 70 }, { x: 480, y: 270 }, { x: 120, y: 270 }],
            closed: true,
            edgeLabels: Array.isArray(p.edgeLabels) ? p.edgeLabels : undefined
          }];
        } else {
          // Varsayılan dikdörtgen/kare
          const wLabel = p.widthLabel || (p.width ? `${p.width} cm` : '');
          const hLabel = p.heightLabel || (p.height ? `${p.height} cm` : '');
          const labels = Array.isArray(p.edgeLabels) && p.edgeLabels.length > 0
            ? p.edgeLabels
            : [wLabel, hLabel, wLabel, hLabel].filter(Boolean);

          p.polygons = [{
            points: [{ x: 120, y: 80 }, { x: 480, y: 80 }, { x: 480, y: 260 }, { x: 120, y: 260 }],
            closed: true,
            edgeLabels: labels.length > 0 ? labels : undefined
          }];
        }
      }
    } else if (p.subType === 'grid_coordinate') {
      if (!p.grid && (p.cols || p.rows)) {
        p.grid = { cols: Number(p.cols) || 8, rows: Number(p.rows) || 6 };
      }
    }
    v.params = p;
  }

  return v;
}

/**
 * AI tarafından üretilen ham visual nesnesini sıkı doğrulama boru hattından geçirir.
 */
export function validateAndSanitizeAiVisual(
  rawVisual: unknown,
  candidateAnswer?: string
): AiVisualValidationResult {
  if (!rawVisual || typeof rawVisual !== 'object') {
    return { isValid: false, reason: 'Görsel nesnesi boş veya nesne tipinde değil.' };
  }

  // Akıllı LLM parametre normalizasyonu
  const normalizedRaw = normalizeAiVisual(rawVisual);
  const v = normalizedRaw as Partial<QuestionVisual>;

  // 1. Tür (type) Doğrulaması
  const supportedTypes = ['geometry_shape', 'number_line', 'fraction_model'];
  if (!v.type || !supportedTypes.includes(v.type)) {
    return {
      isValid: false,
      reason: `Desteklenmeyen veya eksik görsel türü: "${String(v.type)}". Desteklenenler: ${supportedTypes.join(', ')}.`
    };
  }

  if (!v.params || typeof v.params !== 'object') {
    return { isValid: false, reason: 'Görsel parametreleri (params) eksik veya geçersiz nesne.' };
  }

  // 2. Alt Tür ve Matematiksel Doğrulama
  switch (v.type) {
    case 'geometry_shape': {
      const geoRes = validateGeometryParams(v.params);
      if (!geoRes.isValid) {
        return { isValid: false, reason: `Geometri modeli parametre hatası: ${geoRes.reason}` };
      }
      break;
    }

    case 'number_line': {
      const nlRes = validateMathematicalParams(v.params as any);
      if (!nlRes.isValid) {
        return { isValid: false, reason: `Sayı doğrusu parametre hatası: ${nlRes.reason}` };
      }
      break;
    }

    case 'fraction_model': {
      const fracRes = validateFractionModelParams(v.params);
      if (!fracRes.isValid) {
        return { isValid: false, reason: `Kesir modeli parametre hatası: ${fracRes.reason}` };
      }
      break;
    }
  }

  // 3. Normalizasyon: Kaynak kökenini güvenli 'oyss_svg' yap
  const normalizedVisual: QuestionVisual = {
    type: v.type as any,
    sourceOrigin: 'oyss_svg',
    caption: typeof v.caption === 'string' && v.caption.trim().length > 0 ? v.caption.trim() : undefined,
    params: v.params as any
  };

  // 4. Anti-Leak (Cevap Ele Vermeme) Sanitizasyonu
  const sanitizedVisual = sanitizeAntiLeak(normalizedVisual, candidateAnswer);

  return {
    isValid: true,
    visual: sanitizedVisual
  };
}

