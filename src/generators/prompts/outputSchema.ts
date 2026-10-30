/**
 * RFC 8259 Uyumlu JSON Çıktı Şablonu
 */
export function getJsonOutputSchema(hasAlternativeAnswers: boolean): string {
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
