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
 * AI tarafından üretilen ham visual nesnesini sıkı doğrulama boru hattından geçirir.
 */
export function validateAndSanitizeAiVisual(
  rawVisual: unknown,
  candidateAnswer?: string
): AiVisualValidationResult {
  if (!rawVisual || typeof rawVisual !== 'object') {
    return { isValid: false, reason: 'Görsel nesnesi boş veya nesne tipinde değil.' };
  }

  const v = rawVisual as Partial<QuestionVisual>;

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

