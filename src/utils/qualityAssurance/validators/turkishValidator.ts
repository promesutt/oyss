import { QualityFinding, QuestionValidationContext } from '../types';
import { verifyQuestionSourceBinding } from '../../sourceMaterialValidator';

/**
 * Türkçe Dersi Uzman Kalite Kontrolü
 */
export function validateTurkishQuestion(
  q: any,
  _context: QuestionValidationContext
): QualityFinding[] {
  const findings: QualityFinding[] = [];
  const stem = (q.questionText || q.question || '').trim();
  const rawStimulus = (q.stimulus || q.commonStimulus || q.contextText || '').trim();
  const answer = (q.modelAnswer || q.answer || '').trim();

  // 1. Okuma anlama ve metin içi çıkarım sorularında metin varlığı
  // Öğrencinin kendisinin metin/paragraf yazması istenen yazma görevleri (T.Y. veya T.8.4) hariç tutulur.
  const outcomeCode = (q.outcomeCode || q.outcome || '').trim();
  const isExplicitWriting = /(?:yazacağınız|bir\s+metin\s+yazınız|bir\s+paragraf\s+yazınız|mektup\s+yazınız|hikâye\s+yazınız|kompozisyon|taslak\s+halinde\s+yazınız|tamamlayınız)/i.test(stem) ||
    outcomeCode.startsWith('T.Y.') ||
    outcomeCode.startsWith('T.8.4.') ||
    outcomeCode.startsWith('T.7.4.') ||
    outcomeCode.startsWith('T.6.4.') ||
    outcomeCode.startsWith('T.5.4.');

  const isReadingComprehension = !isExplicitWriting && /(?:metn(?:e|in|den|de)?|parça(?:ya|dan|da|nın)?|paragraf(?:tan|ta|ın)?|ana\s+fik(?:ir|r)|yazarın\s+vurguladığı|çıkarım)/i.test(stem);
  let effectiveStimulus = rawStimulus;

  if (isReadingComprehension) {
    const binding = verifyQuestionSourceBinding(
      {
        questionText: stem,
        stimulus: q.stimulus,
        commonStimulus: q.commonStimulus,
        sharedSourceId: q.sharedSourceId,
        questionNumber: q.questionNumber || q.number,
        number: q.questionNumber || q.number,
        outcomeCode: q.outcomeCode || q.outcome
      },
      _context?.siblingQuestions || [],
      _context?.sharedSourceGroups
    );

    if (binding.isValid && binding.resolvedStimulus) {
      effectiveStimulus = binding.resolvedStimulus;
    }

    if (!effectiveStimulus || effectiveStimulus.length < 80) {
      if (binding.isValid && (binding.bindingType === 'valid_cross_reference' || binding.bindingType === 'explicit_shared_group')) {
        findings.push({
          category: 'answerability',
          severity: 'info',
          field: 'stimulus',
          message: binding.bindingType === 'valid_cross_reference'
            ? `Soru ${binding.sourceOwnerQuestionNumber}. sorudaki kaynak metne çapraz referansla başarıyla bağlanmıştır.`
            : 'Soru sınav içi ortak/kardeş okuma metnine dayanmaktadır.',
          suggestedFix: 'Bağımsız kullanım için tam metni soru bünyesine de ekleyebilirsiniz.',
          validationMethod: 'turkish_reading_text_grounding'
        });
      } else {
        findings.push({
          category: 'answerability',
          severity: 'critical',
          field: 'stimulus',
          message: binding.reason || 'Türkçe okuma anlama/çıkarım sorusunda yeterli uzunlukta (en az 80 karakter) okuma metni bulunmamaktadır.',
          suggestedFix: 'Sorunun çıkarım yapacağı edebi veya bilgilendirici okuma metnini stimulus alanına ekleyiniz.',
          validationMethod: 'turkish_reading_text_grounding'
        });
      }
    }
  }

  // 2. Metinle desteklenmeyen / metin dışı keyfi cevap uyarısı
  if (isReadingComprehension && effectiveStimulus.length >= 80 && answer.length > 5) {
    // Model cevapta metinde hiç geçmeyen veya metinle zıtlaşan bariz bir durum var mı?
    const isDirectQuoteQuery = /(hangi\s+sözcük|altı\s+çizili|hangi\s+cümle)/i.test(stem);
    if (isDirectQuoteQuery) {
      const quotedAnswerWords = answer.split(/[\s,.;:!?]+/).filter((w: string) => w.length > 3);
      const someWordsInText = quotedAnswerWords.some((w: string) => effectiveStimulus.toLowerCase().includes(w.toLowerCase()));
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
    if (!effectiveStimulus && !/(aşağıdaki|verilen)/i.test(stem)) {
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
