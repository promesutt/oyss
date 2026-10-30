/**
 * OYSS Güvenli JSON ve KaTeX Ayrıştırıcı (Centralized JSON & KaTeX Parser)
 *
 * Amaç: Gemini veya harici yapay zekâ modellerinden dönen JSON yanıtlarında
 * KaTeX matematiksel komutlarının (\frac, \left, \right, \cdot, \Delta, \sqrt, \times, \text vb.)
 * ve standart JSON kaçışlarının (\" \n \\) bozulmadan, RFC 8259 uyumlu biçimde
 * ayrıştırılmasını sağlamak.
 */

export interface SafeJsonParseResult<T = any> {
  success: boolean;
  data: T | null;
  error?: string;
  rawText?: string;
}

/**
 * JSON string literals içindeki KaTeX komutlarını ve kaçış karakterlerini onarır.
 * - Zaten çift kaçırılmış (\\frac, \\left) ifadeleri bozmaz.
 * - Geçerli JSON kaçışlarını (\", \n, \t, \\, \/) korur.
 * - KaTeX komutlarının (\frac, \right, \text, \times) JSON kontrol karakterlerine
 *   (form-feed, carriage-return, tab) dönüşmesini engeller.
 * - Geçersiz JSON kaçışlarının (\left, \cdot, \Delta, \sqrt vb.) JSON.parse hatası
 *   üretmesini engeller.
 */
export function repairJsonKaTeX(jsonStr: string): string {
  if (!jsonStr || typeof jsonStr !== 'string') return '';

  const cleaned = jsonStr.replace(/```(?:json)?/gi, '').trim();
  let result = '';
  let inString = false;
  let i = 0;
  const n = cleaned.length;

  const latexControlPrefixes = [
    'frac', 'flat', 'forall', 'frown',
    'right', 'rangle', 'rceil', 'rfloor', 'Re', 'rho', 'rightarrow', 'Rightarrow',
    'text', 'times', 'theta', 'tau', 'tan', 'top', 'to', 'tilde', 'triangle', 'tanh',
    'begin', 'bf', 'bar', 'binom', 'bullet', 'bot', 'beta', 'bmod', 'bigcap', 'bigcup',
    'neq', 'nabla', 'neg', 'natural', 'nearrow', 'nwarrow', 'nu', 'notin',
    'underline', 'underbrace', 'uparrow', 'Uparrow', 'updownarrow', 'Upsilon', 'upsilon'
  ];

  while (i < n) {
    const ch = cleaned[i];

    if (!inString) {
      if (ch === '"') {
        inString = true;
      }
      result += ch;
      i++;
      continue;
    }

    // Inside a JSON string literal
    if (ch === '"') {
      inString = false;
      result += ch;
      i++;
      continue;
    }

    if (ch === '\\') {
      if (i + 1 >= n) {
        result += '\\\\';
        i++;
        continue;
      }

      const nextChar = cleaned[i + 1];

      // If already double backslash "\\"
      if (nextChar === '\\') {
        result += '\\\\';
        i += 2;
        continue;
      }

      // If escaped quote '\"' or slash '\/'
      if (nextChar === '"' || nextChar === '/') {
        result += '\\' + nextChar;
        i += 2;
        continue;
      }

      // If valid JSON unicode escape: \uXXXX (where XXXX are 4 hex digits)
      if (nextChar === 'u') {
        const hex = cleaned.slice(i + 2, i + 6);
        if (/^[0-9a-fA-F]{4}$/.test(hex)) {
          result += '\\u' + hex;
          i += 6;
          continue;
        }
      }

      // Check if this is a LaTeX command starting with f, r, t, b, n, u (e.g. \frac, \right, \text, \times)
      const remaining = cleaned.slice(i + 1);
      const isLatexControlCmd = latexControlPrefixes.some(cmd => {
        if (!remaining.startsWith(cmd)) return false;
        const charAfter = remaining[cmd.length];
        return !charAfter || !/[a-zA-Z]/.test(charAfter);
      });

      if (isLatexControlCmd) {
        result += '\\\\';
        i++;
        continue;
      }

      // Standard JSON control escapes: \n, \r, \t, \b, \f
      if (/^[bfnrt]$/.test(nextChar)) {
        result += '\\' + nextChar;
        i += 2;
        continue;
      }

      // Any other character after backslash is invalid in standard JSON (e.g. \left, \cdot, \Delta, \sqrt)
      result += '\\\\';
      i++;
      continue;
    }

    result += ch;
    i++;
  }

  return result;
}

/**
 * Model çıktısını güvenli ve deterministik olarak ayrıştırır.
 */
export function parseExamJsonSafely<T = any>(rawText: string | undefined): SafeJsonParseResult<T> {
  if (!rawText || typeof rawText !== 'string' || !rawText.trim()) {
    return { success: false, data: null, error: 'Model çıktısı boş veya tanımsız.' };
  }

  const cleaned = rawText.replace(/```(?:json)?/gi, '').trim();
  if (!cleaned) {
    return { success: false, data: null, error: 'Model çıktısı boş.' };
  }

  // 1. Önce KaTeX ve kaçış karakterlerini onararak parse et (en güvenli yöntem)
  const repaired = repairJsonKaTeX(cleaned);
  try {
    const parsed = JSON.parse(repaired);
    return { success: true, data: parsed, rawText: repaired };
  } catch (repairErr: any) {
    // 2. Eğer onarım bir sebeple parse edilemezse, doğrudan ham temizlenmiş metni dene
    try {
      const direct = JSON.parse(cleaned);
      return { success: true, data: direct, rawText: cleaned };
    } catch {
      return {
        success: false,
        data: null,
        error: `Model çıktısı geçerli bir JSON formatına dönüştürülemedi: ${repairErr?.message || String(repairErr)}`,
        rawText: cleaned
      };
    }
  }
}
