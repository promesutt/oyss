export const GRADE_7_MATH_DIRECTIVES = `
MEBİ 7. SINIF MATEMATİK DERS KİTABI VE ÖLÇME YÖNERGESİ (1. KİTAP 1. TEMA UYUMLU):
1. KAZANIM EŞLEŞTİRMESİ VE DERS KİTABI BAĞLAMLARI:
   - MAT.7.1.1: Gerçek yaşam ya da matematiksel durumlarda doğal sayı, tam sayı ve rasyonel sayıları yorumlayabilme (Ders Kitabı 1. Kitap, Sayfa 14-40: ASELSAN Deringöz su altı aracı, Ocak ayı illerin sıcaklık değerleri, Mert'in dijital bütçesi, 0 referans noktası ve mutlak değer).
   - MAT.7.1.2: Gerçek yaşam durumlarında rasyonel sayıların ondalık gösterimlerini yansıtabilme (Ders Kitabı 1. Kitap, Sayfa 41-49: Günlük hayat nesnelerinin hacim/kütle rasyonel temsilleri, payı paydaya bölme, sonlu vs devirli ondalık, paydada 2 ve 5 dışı asal çarpan kuralı, devirliyi rasyonel yapma formülü).
   - MAT.7.1.3: Rasyonel sayıların karşılaştırma ve sıralama ilişkilerini yorumlayabilme (Ders Kitabı 1. Kitap, Sayfa 50-61: Gezegenlerin yüzey sıcaklıkları, negatif rasyonel sayılarda sayı doğrusunda sıfıra yakınlık/uzaklık, futbol ligi averaj tablosu, yarıma/bütüne yakınlık).
   - MAT.7.1.4: Rasyonel sayılar ve işlemler içeren gerçek yaşam problemlerini çözebilme (Ders Kitabı 1. Kitap, Sayfa 62-113: Denizaltının mikroplastik araştırmasında dikey hareketi, Gençtürk ailesi enerji giderleri aylık değişimi, çok adımlı işlemlerde işlem önceliği).
2. MATEMATİKSEL GÖSTERİM VE KaTeX DESTEĞİ:
   - Kesirler, denklemler ve matematiksel semboller için standart KaTeX $...$ formatını kullanınız (Örn: $\\frac{3}{4}$, $\\left(-\\frac{3}{4}\\right) + \\left(+\\frac{1}{8}\\right) = -\\frac{5}{8}$, $|+10| = 10$, $-38\\text{ °C}$).
   - JSON UYUMLULUK KURALI (RFC 8259): JSON dizgileri içinde KaTeX formüllerindeki ters eğik çizgileri (\\frac, \\left, \\right, \\cdot, \\Delta, \\sqrt, \\text vb.) standart JSON kaçışıyla çift ters eğik çizgi (\\\\) olarak yazınız (örneğin: "\\\\frac{3}{4}", "\\\\left(-\\\\frac{3}{4}\\\\right)").
3. KABUL EDİLEBİLİR DENK ALTERNATİF CEVAPLAR (alternativeAnswers):
   - Matematiksel olarak birbirine denk olan doğru ifade biçimlerini (Örn: $-\\frac{5}{8}\\text{ km}$ ile $-0,625\\text{ km}$; $\\frac{26}{11}$ ile $2\\frac{4}{11}$; $+15\\text{ °C}$ ile $15$) "alternativeAnswers" dizisine ekleyiniz.
4. ANALİTİK VE ADIMLI RUBRİK:
   - Puanlama rubriğinde işlem/modelleme basamakları ve nihai doğru sonuç için ayrı puan kriterleri tanımlayınız.
`;
