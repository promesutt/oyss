/**
 * RFC 8259 Uyumlu JSON Çıktı Şablonu
 * - isQualityActive === false: Legacy parity eşitliğini korur.
 * - isQualityActive === true: Koşullu/esnek alternativeAnswers, analitik rubrik ve opsiyonel visual şablonu sunar.
 */
export function getJsonOutputSchema(hasAlternativeAnswers: boolean, isQualityActive: boolean = false): string {
  if (!isQualityActive) {
    return `ÇIKTI FORMATI:
SADECE geçerli bir JSON çıktısı ver. JSON şeması:
{
  "questions": [
    {
      "number": 1,
      "outcome": "Kazanım Kodu (Örn: MAT.7.1.1)",
      "outcomeTitle": "Resmi Öğrenme Çıktısı (Örn: Gerçek yaşam ya da matematiksel durumlarda doğal sayı, tam sayı ve rasyonel sayıları yorumlayabilme)",
      "difficulty": "Orta",
      "level": "Karmaşık Bilişsel Süreçler",
      "templateType": "Öğrenci Diyaloğu & Kavram Yanılgısı",
      "points": 15,
      "stimulus": "Diyalog veya vaka metni...",
      "question": "Açık uçlu soru...",
      "answer": "MEBİ model cevabı...",
      ${hasAlternativeAnswers ? `"alternativeAnswers": [
        "Kabul edilebilir alternatif örnek ifade 1",
        "Kabul edilebilir alternatif örnek ifade 2"
      ],` : ''}
      "rubric": [
        {"item": "Kriter 1", "pts": 8},
        {"item": "Kriter 2", "pts": 7}
      ]
    }
  ]
}`;
  }

  return `ÇIKTI FORMATI:
SADECE geçerli bir JSON çıktısı ver. JSON şeması:
{
  "questions": [
    {
      "number": 1,
      "outcome": "Kazanım Kodu (Örn: MAT.5.3.1)",
      "outcomeTitle": "Resmi Öğrenme Çıktısı",
      "difficulty": "Orta",
      "level": "Karmaşık Bilişsel Süreçler",
      "templateType": "Kurgusal Senaryo & Vaka İncelemesi",
      "points": 15,
      "stimulus": "Diyalog, deney, tablo veya vaka metni...",
      "question": "Açık uçlu soru...",
      "answer": "Resmî model cevap (Öğrencinin vermesi beklenen çözüm ve yanıt. KESİNLİKLE soru kökünü veya yönergeyi tekrar etmeyiniz)...",
      ${hasAlternativeAnswers ? `"alternativeAnswers": [
        "Kabul edilebilir alternatif doğru yanıt (soru kökünü asla tekrar etmeyiniz; model cevapla aynı temel gerçeği desteklemelidir; özellikle sözel çıkarım, eşanlamlı ifadeler veya denk matematiksel gösterim olan sorularda 1-3 alternatif yazınız; tek kesin cevabı olan sorularda boş [] bırakınız)"
      ],` : ''}
      "rubric": [
        {"item": "Kriter 1 (Kavramsal / olgusal teşhis)", "pts": 8},
        {"item": "Kriter 2 (Analitik gerekçelendirme / işlem basamağı)", "pts": 7}
      ],
      "visual": {
        "type": "geometry_shape | number_line | fraction_model",
        "caption": "Görsel açıklaması",
        "params": {
          "subType": "area_perimeter | polygon_2d | angle_model | line_system | grid_coordinate",
          "totalWidth": 120,
          "totalHeight": 80,
          "tileWidth": 40,
          "tileHeight": 40,
          "widthLabel": "120 m",
          "heightLabel": "80 m"
        }
      }
    }
  ]
}
NOT 1: >=12 puanlı sorularda tek ölçütlü rubrik YASAKTIR; en az 2 analitik ölçüte bölünmelidir.
NOT 2: "visual" İSTEĞE BAĞLIDIR. Parselleme, alan-çevre, köklü sayı yeri gibi görsel sorularda ekleyiniz; salt işlemde ÇIKARINIZ. Cevapta "?" kullanınız.`;
}
