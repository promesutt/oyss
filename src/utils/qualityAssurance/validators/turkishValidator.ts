import { QualityFinding, QuestionValidationContext } from '../types';

/**
 * Türkçe Dersi Uzman Kalite Kontrolü
 */
export function validateTurkishQuestion(
  q: any,
  _context: QuestionValidationContext
): QualityFinding[] {
  const findings: QualityFinding[] = [];
  const stem = (q.questionText || q.question || '').trim();
  const stimulus = (q.stimulus || q.contextText || '').trim();
  const answer = (q.modelAnswer || q.answer || '').trim();

  // 1. Okuma anlama ve metin içi çıkarım sorularında metin varlığı
  // "Metne göre", "parçaya göre", "metnin ana fikri", "metinde geçen", "çıkarım" vb.
  const isReadingComprehension = /(?:metn(?:e|in|den|de)?|parça(?:ya|dan|da|nın)?|paragraf(?:tan|ta|ın)?|ana\s+fik(?:ir|r)|yazarın\s+vurguladığı|çıkarım)/i.test(stem);
  if (isReadingComprehension) {
    if (!stimulus || stimulus.length < 80) {
      findings.push({
        category: 'answerability',
        severity: 'critical',
        field: 'stimulus',
        message: 'Türkçe okuma anlama/çıkarım sorusunda yeterli uzunlukta (en az 80 karakter) okuma metni bulunmamaktadır.',
        suggestedFix: 'Sorunun çıkarım yapacağı edebi veya bilgilendirici okuma metnini stimulus alanına ekleyiniz.',
        validationMethod: 'turkish_reading_text_grounding'
      });
    }
  }

  // 2. Metinle desteklenmeyen / metin dışı keyfi cevap uyarısı
  if (isReadingComprehension && stimulus.length >= 80 && answer.length > 5) {
    // Model cevapta metinde hiç geçmeyen veya metinle zıtlaşan bariz bir durum var mı?
    const isDirectQuoteQuery = /(hangi\s+sözcük|altı\s+çizili|hangi\s+cümle)/i.test(stem);
    if (isDirectQuoteQuery) {
      const quotedAnswerWords = answer.split(/[\s,.;:!?]+/).filter((w: string) => w.length > 3);
      const someWordsInText = quotedAnswerWords.some((w: string) => stimulus.toLowerCase().includes(w.toLowerCase()));
      if (!someWordsInText && quotedAnswerWords.length > 0) {
        findings.push({
          category: 'stem_answer_consistency',
          severity: 'warning',
          field: 'answer',
          message: 'Model cevaptaki anahtar ifadeler metin içeriğinde tespit edilemedi; metinle desteklenmeyen çıkarım riski.',
          suggestedFix: 'Model cevabın metindeki somut ifadelere dayandığından emin olunuz.',
          validationMethod: 'turkish_textual_evidence_check'
        });
      }
    }
  }

  // 3. Yazım kuralları ve noktalama sorularında hedef netliği
  const isSpellingQuery = /(yazım\s+yanlışı|yazımı\s+yanlış|noktalama\s+işareti)/i.test(stem);
  if (isSpellingQuery) {
    if (!stimulus && !/(aşağıdaki|verilen)/i.test(stem)) {
      findings.push({
        category: 'answerability',
        severity: 'warning',
        field: 'stem',
        message: 'Yazım/noktalama sorusunda incelenecek örnek cümle veya metin bulunmuyor.',
        suggestedFix: 'İncelenecek cümleyi soru kökünde tırnak içinde veya metin alanında veriniz.',
        validationMethod: 'turkish_spelling_context_check'
      });
    }
  }

  // 4. Özel adlarda kesme işareti kuralı (TDK uyumu)
  const brokenApostrophe = /([A-ZÇĞİÖŞÜ][a-zçğıöşü]+)\s+([’'](?:nin|nın|nun|nün|ye|ya|de|da|den|dan|e|a))/g;
  if (brokenApostrophe.test(stem) || brokenApostrophe.test(answer)) {
    findings.push({
      category: 'language_clarity',
      severity: 'info',
      field: 'stem',
      message: 'Özel ada gelen ek ile kesme işareti arasında gereksiz boşluk tespit edildi.',
      suggestedFix: 'Özel ada gelen çekim ekini bitişik kesme işaretiyle yazınız.',
      validationMethod: 'turkish_tdk_apostrophe_check'
    });
  }

  return findings;
}
