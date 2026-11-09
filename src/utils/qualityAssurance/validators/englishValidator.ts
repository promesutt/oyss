import { QualityFinding, QuestionValidationContext } from '../types';

/**
 * İngilizce Dersi Uzman Kalite Kontrolü
 */
export function validateEnglishQuestion(
  q: any,
  _context: QuestionValidationContext
): QualityFinding[] {
  const findings: QualityFinding[] = [];
  const stem = (q.questionText || q.question || '').trim();
  const stimulus = (q.stimulus || q.contextText || '').trim();
  const answer = (q.modelAnswer || q.answer || '').trim();

  // 1. Dil Tutarlılığı: İngilizce Soru ve Model Cevap Dili
  // Cevap tamamen Türkçe yazılmışsa (örneğin "Ali okula gitti" veya "Çünkü yorgundu")
  const turkishSpecificChars = /[çğıöşüÇĞİÖŞÜ]/;
  const isPureTurkishAnswer = turkishSpecificChars.test(answer) && !/(?:because|he|she|they|it|is|are|was|were|in|at|on|to)\b/i.test(answer);
  if (isPureTurkishAnswer && answer.length > 10) {
    findings.push({
      category: 'scientific_correctness',
      severity: 'critical',
      field: 'answer',
      message: 'İngilizce sınavında model cevap Türkçe yazılmıştır; hedef dilde (İngilizce) model cevap verilmelidir.',
      suggestedFix: 'Model cevabı İngilizce cümle veya ifade olarak yazınız.',
      validationMethod: 'english_language_target_consistency'
    });
  }

  // 2. Soru Kelimesi ve Cevap Uyumsuzluğu (Wh- Questions)
  // "Where" sorusuna yer bildirmeyen bir cevap verilmesi
  if (/^where\b/i.test(stem)) {
    const hasLocationClue = /(?:in|at|on|to|near|behind|under|next\s+to|between|hospital|school|park|library|museum|city|room|home|house|supermarket)\b/i.test(answer);
    if (!hasLocationClue && answer.length > 5) {
      findings.push({
        category: 'stem_answer_consistency',
        severity: 'warning',
        field: 'answer',
        message: '"Where" ile sorulan yer sorusuna yer/konum bildirmeyen bir yanıt verilmiş olabilir.',
        suggestedFix: 'Model cevabın açıkça bir yer (in/at/on vb.) içerdiğini kontrol ediniz.',
        validationMethod: 'english_wh_question_alignment'
      });
    }
  }

  // "When" sorusuna zaman bildirmeyen bir cevap verilmesi
  if (/^when\b/i.test(stem)) {
    const hasTimeClue = /(?:at\s+\d+|on\s+(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)|in\s+(?:january|february|march|april|may|june|july|august|september|october|november|december|summer|winter|spring|autumn)|o'clock|yesterday|tomorrow|today|morning|afternoon|evening|night|\d{4})\b/i.test(answer);
    if (!hasTimeClue && answer.length > 5) {
      findings.push({
        category: 'stem_answer_consistency',
        severity: 'warning',
        field: 'answer',
        message: '"When" ile sorulan zaman sorusuna zaman bildirmeyen bir yanıt verilmiş olabilir.',
        suggestedFix: 'Model cevabın gün, saat veya tarih gibi zaman ifadesi içerdiğini doğrulayınız.',
        validationMethod: 'english_wh_question_alignment'
      });
    }
  }

  // "Why" sorusuna neden bildirmeyen bir cevap verilmesi
  if (/^why\b/i.test(stem)) {
    const hasReasonClue = /(?:because|to\s+[a-z]+|in\s+order\s+to|so\s+that|due\s+to|for)\b/i.test(answer);
    if (!hasReasonClue && answer.length > 10) {
      findings.push({
        category: 'stem_answer_consistency',
        severity: 'warning',
        field: 'answer',
        message: '"Why" sorusuna neden/gerekçe bağlacı (Because, to ...) içermeyen bir yanıt verilmiş olabilir.',
        suggestedFix: 'Model cevabı gerekçe bildiren "Because..." yapısıyla başlatınız veya gerekçe ekleyiniz.',
        validationMethod: 'english_wh_question_alignment'
      });
    }
  }

  // 3. Okuma Parçası Varlığı (Reading Comprehension)
  const isReadingComp = /(?:according\s+to\s+the\s+(?:text|passage|dialogue|table|invitation)|based\s+on\s+the\s+text)/i.test(stem);
  if (isReadingComp && (!stimulus || stimulus.length < 50)) {
    findings.push({
      category: 'answerability',
      severity: 'critical',
      field: 'stimulus',
      message: 'Metne dayalı İngilizce okuma sorusunda (According to the text...) gerekli metin veya diyalog stimulus alanında bulunmamaktadır.',
      suggestedFix: 'İncelenecek İngilizce okuma parçasını veya diyaloğu stimulus alanına ekleyiniz.',
      validationMethod: 'english_reading_passage_presence'
    });
  }

  // 4. Temel Özne-Yüklem Uyumu Uyarısı
  if (/\b(?:he|she|it)\s+(?:like|go|want|play|study|watch)\b/i.test(answer)) {
    findings.push({
      category: 'language_clarity',
      severity: 'warning',
      field: 'answer',
      message: 'Geniş zamanda (Simple Present) 3. tekil şahıs için "-s/-es" takısı eksikliği tespit edildi (Örn: "He like" yerine "He likes").',
      suggestedFix: 'Özne-yüklem uyumunu düzelterek fiile uygun "-s" takısını ekleyiniz.',
      validationMethod: 'english_subject_verb_agreement_check'
    });
  }

  return findings;
}
