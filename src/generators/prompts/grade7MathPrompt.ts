import { resolveOutcomeMetadata } from '../../data/curriculumData';

/**
 * 7. Sınıf Matematik MEB Ders Kitabı ve Ölçme Yönergesi Kazanım Sözlüğü
 * Her kazanım için ders kitabı sayfası, temel kavramlar, modelleme ve KaTeX gösterimleri tanımlıdır.
 */
export const GRADE_7_MATH_OUTCOME_DICTIONARY: Record<string, string> = {
  'MAT.7.1.1': `MAT.7.1.1: Doğal sayı, tam sayı ve rasyonel sayıları yorumlayabilme (Ders Kitabı 1. Kitap, s. 14-40: Deringöz su altı aracı dikey konumu, illerin sıcaklık değerleri, bütçe gelir-gideri, 0 referans noktası ve mutlak değer).`,
  'MAT.7.1.2': `MAT.7.1.2: Rasyonel sayıların ondalık gösterimlerini yansıtabilme (Ders Kitabı 1. Kitap, s. 41-49: Hacim/kütle rasyonel temsilleri, payı paydaya bölme, sonlu ve devirli ondalık, devirliyi rasyonel sayıya çevirme adımları).`,
  'MAT.7.1.3': `MAT.7.1.3: Rasyonel sayıların karşılaştırma ve sıralama ilişkileri (Ders Kitabı 1. Kitap, s. 50-61: Gezegen yüzey sıcaklıkları, negatif rasyonel sayılarda sayı doğrusunda sıfıra yakınlık/uzaklık, futbol averaj tablosu, yarıma/bütüne yakınlık).`,
  'MAT.7.1.4': `MAT.7.1.4: Rasyonel sayılarla gerçek yaşam problemleri çözebilme (Ders Kitabı 1. Kitap, s. 62-113: Dikey denizaltı hareketi, enerji giderleri değişimi, çok adımlı işlemlerde öncelik, kumaş/kalas bölme ve bütçe hesabı).`,
  'MAT.7.4.1': `MAT.7.4.1: Eş küplerle oluşturulan yapılar ile görünümleri arasındaki ilişki (Eş birim küplerle inşa edilen 3B yapıların önden, arkadan, sağdan, soldan ve üstten 2B görünümleri ve kareli zeminde birim kare sayılarıyla eşleştirilmesi).`,
  'MAT.7.4.2': `MAT.7.4.2: Dikdörtgenler prizmasının yüzey alanını yorumlayabilme (Ayrıtları $a, b, c$ olan prizmanın 6 yüzünün alan toplamı $A = 2(ab + bc + ac)$; prizma açınımı eş yüz çiftleri, kutu kaplama ve ambalaj hesabı).`,
  'MAT.7.4.3': `MAT.7.4.3: Dikdörtgenler prizmasının hacmini eş nesnelerle yorumlayabilme (Prizmanın tabanına ve katlarına yerleştirilen birim küp sayıları; tabandaki küp sayısı $\\times$ kat sayısı mantığı).`,
  'MAT.7.4.4': `MAT.7.4.4: Dikdörtgenler prizmasının hacim bağıntısını değerlendirebilme (Taban alanı ile yükseklik çarpımı $V = a \\cdot b \\cdot c$; akvaryum, depo ve havuz su kapasitesi hesaplamaları).`,
  'MAT.7.4.5': `MAT.7.4.5: Hacim ölçme birimleri arasındaki ilişkiler ($1\\text{ m}^3 = 1000\\text{ dm}^3 = 1.000.000\\text{ cm}^3$; her basamakta 1000 ile çarpma/bölme; sıvı birimleriyle köprü: $1\\text{ dm}^3 = 1\\text{ L}$, $1\\text{ cm}^3 = 1\\text{ mL}$, $1\\text{ m}^3 = 1000\\text{ L}$).`,
  'MAT.7.4.6': `MAT.7.4.6: Prizmalarla modellenen cisimlerin yüzey alanı ve hacim problemleri (İçine atılan katı cismin taşırdığı su hacmi, açık su deposunun boyama maliyeti, taşma kapları ve kompozit prizma modelleri).`,
  'MAT.7.6.1': `MAT.7.6.1: Veri ile çalışabilme ve karar verebilme (İki grubun boy/kilo, sıcaklık veya üretim miktarının çizgi/sütun grafiği ile gösterilmesi; açıklık ve aritmetik ortalama ile istikrar karşılaştırması).`,
  'MAT.7.6.2': `MAT.7.6.2: İstatistiksel sonuç veya yorumları tartışabilme (Yanıltıcı grafikler: Dikey ekseni sıfırdan başlatılmayan sütun grafiklerinde oluşan orantısız görsel algının analizi ve bilimsel çürütülmesi).`
};

const COMMON_MATH_DIRECTIVES = `2. MATEMATİKSEL GÖSTERİM VE KaTeX DESTEĞİ:
   - Kesirler, denklemler ve matematiksel semboller için standart KaTeX $...$ formatını kullanınız (Örn: $\\frac{3}{4}$, $\\left(-\\frac{3}{4}\\right) + \\left(+\\frac{1}{8}\\right) = -\\frac{5}{8}$, $|+10| = 10$, $-38\\text{ °C}$, $150\\text{ cm}^3$, $2{,}4\\text{ L}$).
   - JSON UYUMLULUK KURALI (RFC 8259): JSON dizgileri içinde KaTeX formüllerindeki ters eğik çizgileri (\\frac, \\left, \\right, \\cdot, \\Delta, \\sqrt, \\text vb.) standart JSON kaçışıyla çift ters eğik çizgi (\\\\) olarak yazınız (örneğin: "\\\\frac{3}{4}", "\\\\left(-\\\\frac{3}{4}\\\\right)").`;

/**
 * TASK174 - Dinamik 7. Sınıf Matematik Direktif Üreticisi
 * Yalnızca aktif sınav senaryosunda sorulan kazanımların ayrıntılı ders kitabı bağlamlarını ekler.
 * Senaryo dışı üniteleri prompta taşımayarak ~2.200 karakter tasarruf sağlar.
 */
export function buildGrade7MathDirectives(outcomeCodes?: string[]): string {
  if (!outcomeCodes || outcomeCodes.length === 0) {
    return GRADE_7_MATH_DIRECTIVES;
  }

  const uniqueCodes = Array.from(new Set(outcomeCodes));
  const matchedLines: string[] = [];
  const missingCodes: string[] = [];

  for (const code of uniqueCodes) {
    if (GRADE_7_MATH_OUTCOME_DICTIONARY[code]) {
      matchedLines.push(`   - ${GRADE_7_MATH_OUTCOME_DICTIONARY[code]}`);
    } else {
      missingCodes.push(code);
      const meta = resolveOutcomeMetadata(code);
      matchedLines.push(`   - ${code}: ${meta.displayLabel} (Ders Kitabı Ölçme İlkesi: İlgili resmi kazanım sınırında kavramsal anlama ve matematiksel modelleme sorgulanmalıdır).`);
    }
  }

  const missingNote = missingCodes.length > 0
    ? `\n   * Not: [${missingCodes.join(', ')}] kazanımları için genel MEB müfredat sınırlarında kalınmalıdır.\n`
    : '';

  return `MEBİ 7. SINIF MATEMATİK DERS KİTABI VE ÖLÇME YÖNERGESİ (SEÇİLİ SENARYO UYUMLU):
1. SEÇİLİ SENARYO KAZANIM EŞLEŞTİRMESİ VE DERS KİTABI BAĞLAMLARI:
${matchedLines.join('\n')}${missingNote}
${COMMON_MATH_DIRECTIVES}`;
}

/**
 * Geriye dönük kütük kaydı ve statik tam yönerge
 */
export const GRADE_7_MATH_DIRECTIVES = `
MEBİ 7. SINIF MATEMATİK DERS KİTABI VE ÖLÇME YÖNERGESİ (1. DÖNEM MEB ÖDSGM UYUMLU):
1. KAZANIM EŞLEŞTİRMESİ VE DERS KİTABI BAĞLAMLARI:
${Object.values(GRADE_7_MATH_OUTCOME_DICTIONARY).map(v => `   - ${v}`).join('\n')}
${COMMON_MATH_DIRECTIVES}
`;
