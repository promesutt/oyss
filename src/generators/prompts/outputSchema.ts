/**
 * RFC 8259 Uyumlu JSON Çıktı Şablonu
 * - isQualityActive === false: Legacy parity eşitliğini korur.
 * - isQualityActive === true: Koşullu/esnek alternativeAnswers ve analitik rubrik şablonu sunar (FAZ 3.3.2).
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
      "answer": "Resmî model cevap...",
      ${hasAlternativeAnswers ? `"alternativeAnswers": [
        "Kabul edilebilir alternatif doğru yanıt (özellikle sözel çıkarım, eşanlamlı ifadeler veya denk matematiksel gösterim olan sorularda 1-3 alternatif yazınız; tek kesin cevabı olan sorularda boş [] bırakınız)"
      ],` : ''}
      "rubric": [
        {"item": "Kriter 1 (Kavramsal / olgusal teşhis)", "pts": 8},
        {"item": "Kriter 2 (Analitik gerekçelendirme / işlem basamağı)", "pts": 7}
      ]
    }
  ]
}`;
}
