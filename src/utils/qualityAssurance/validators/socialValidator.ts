import { QualityFinding, QuestionValidationContext } from '../types';
import { isTargetedIntentionalError } from '../commonValidators';

/**
 * Bağlam içerisindeki bir ifadenin olumsuzluk / hata atfetme bağlamı
 * (değil, yanlıştır, hatadır, iddiadır vb.) taşıyıp taşımadığını denetler.
 */
function isStatementNegated(fullText: string, matchIndex: number, matchLength: number): boolean {
  const matchSnippet = fullText.slice(matchIndex, matchIndex + matchLength).toLowerCase();
  const postSnippet = fullText.slice(matchIndex + matchLength, matchIndex + matchLength + 55).toLowerCase();
  const preSnippet = fullText.slice(Math.max(0, matchIndex - 50), matchIndex).toLowerCase();

  const negationWords = [
    'değildir', 'değil', 'yanlıştır', 'yanlış', 'olamaz', 'yoktur', 'hariç',
    'hatadır', 'hatalıdır', 'yanılgıdır', 'yanılgı', 'iddiası', 'iddiasıdır', 'yerine', 'aksine'
  ];

  return negationWords.some(neg => matchSnippet.includes(neg) || postSnippet.includes(neg) || preSnippet.includes(neg));
}

/**
 * Sosyal Bilgiler ve T.C. İnkılap Tarihi Uzman Kalite Kontrolü
 */
export function validateSocialQuestion(
  q: any,
  _context: QuestionValidationContext
): QualityFinding[] {
  const findings: QualityFinding[] = [];
  const stem = (q.questionText || q.question || '').trim();
  const stimulus = (q.stimulus || q.contextText || '').trim();
  const answer = (q.modelAnswer || q.answer || '').trim();
  const solution = (q.solutionExplanation || q.solution || '').trim();
  const rubric = Array.isArray(q.rubric) ? q.rubric : [];
  const altAnswers = Array.isArray(q.alternativeAnswers) ? q.alternativeAnswers : [];

  const rubricText = rubric.map((r: any) => `${r.criterion || ''} ${r.item || ''} ${r.description || ''}`).join(' ');
  const altText = altAnswers.join(' ');
  const answerOnlyText = `${answer} ${solution} ${rubricText} ${altText}`.toLowerCase();
  const stimulusOnlyText = stimulus.toLowerCase();
  const allText = `${stem} ${stimulus} ${answer}`.toLowerCase();

  // 1. Tarihsel Kronoloji ve Anakronizm Denetimi
  // TBMM açılış yılı kontrolü (23 Nisan 1920)
  const tbmmErrorRegex = /tbmm.*(?:1918|1919).*açıl/i;
  const tbmmAnsMatch = answerOnlyText.match(tbmmErrorRegex);
  if (tbmmAnsMatch && tbmmAnsMatch.index !== undefined && !isStatementNegated(answerOnlyText, tbmmAnsMatch.index, tbmmAnsMatch[0].length)) {
    findings.push({
      category: 'scientific_correctness',
      severity: 'critical',
      field: 'answer',
      message: 'Kronolojik anakronizm: TBMM 23 Nisan 1920 tarihinde açılmıştır; 1918 veya 1919 yılında TBMM bulunmamaktadır.',
      suggestedFix: 'Tarihi 23 Nisan 1920 olarak düzeltiniz.',
      validationMethod: 'social_chronology_check'
    });
  } else {
    const isTargetedTbmm = isTargetedIntentionalError(q, ['tbmm'], {
      customAnswerCheck: (ans) => /tbmm/i.test(ans) && /(?:1920|23\s+nisan)/i.test(ans)
    });
    if (!isTargetedTbmm) {
      const tbmmStimMatch = stimulusOnlyText.match(tbmmErrorRegex);
      if (tbmmStimMatch && tbmmStimMatch.index !== undefined && !isStatementNegated(stimulusOnlyText, tbmmStimMatch.index, tbmmStimMatch[0].length)) {
        findings.push({
          category: 'scientific_correctness',
          severity: 'critical',
          field: 'stimulus',
          message: 'Senaryoda kronolojik anakronizm: TBMM 23 Nisan 1920 tarihinde açılmıştır.',
          suggestedFix: 'Senaryodaki TBMM açılış yılını 1920 olarak düzeltiniz.',
          validationMethod: 'social_chronology_check'
        });
      }
    }
  }

  // Lozan ve Mondros kronolojik sırası
  const lozanMondrosRegex = /(?:lozan.*sonra.*mondros|mondros.*lozan.*sonra)/i;
  const lozanAnsMatch = answerOnlyText.match(lozanMondrosRegex);
  if (lozanAnsMatch && lozanAnsMatch.index !== undefined && !isStatementNegated(answerOnlyText, lozanAnsMatch.index, lozanAnsMatch[0].length)) {
    findings.push({
      category: 'scientific_correctness',
      severity: 'critical',
      field: 'answer',
      message: 'Kronolojik çelişki: Mondros Ateşkesi (1918) I. Dünya Savaşı sonunda, Lozan Antlaşması (1923) ise Kurtuluş Savaşı zaferinden sonra imzalanmıştır.',
      suggestedFix: 'Olayların kronolojik sırasını Mondros (1918) -> Kurtuluş Savaşı -> Lozan (1923) olarak düzenleyiniz.',
      validationMethod: 'social_chronology_check'
    });
  } else {
    const isTargetedLozan = isTargetedIntentionalError(q, ['lozan', 'mondros'], {
      customAnswerCheck: (ans) => /lozan/i.test(ans) && /mondros/i.test(ans)
    });
    if (!isTargetedLozan) {
      const lozanStimMatch = stimulusOnlyText.match(lozanMondrosRegex);
      if (lozanStimMatch && lozanStimMatch.index !== undefined && !isStatementNegated(stimulusOnlyText, lozanStimMatch.index, lozanStimMatch[0].length)) {
        findings.push({
          category: 'scientific_correctness',
          severity: 'critical',
          field: 'stimulus',
          message: 'Senaryoda kronolojik çelişki: Mondros 1918, Lozan 1923 tarihlidir.',
          suggestedFix: 'Kronolojik sırayı düzeltiniz.',
          validationMethod: 'social_chronology_check'
        });
      }
    }
  }

  // 2. Kurtuluş Savaşı Cepheleri ve Antlaşmaların Eşleşmesi
  // Doğu Cephesi Gümrü Antlaşması ile kapandı
  if (/doğu\s+cephesi/i.test(allText)) {
    if (/(?:doğu\s+cephesi.*ankara\s+antlaşması|doğu\s+cephesi.*mudanya)/i.test(answer)) {
      findings.push({
        category: 'scientific_correctness',
        severity: 'critical',
        field: 'answer',
        message: 'Tarihsel bilgi hatası: Doğu Cephesi Ermenistan ile imzalanan Gümrü Antlaşması (1920) ile kapanmıştır (Güney Cephesi Ankara, Batı Cephesi Mudanya ile).',
        suggestedFix: 'Doğu Cephesini kapatan antlaşmayı Gümrü Antlaşması olarak düzeltiniz.',
        validationMethod: 'social_fronts_treaties_match'
      });
    }
  }

  // Güney Cephesi Ankara Antlaşması ile kapandı
  if (/güney\s+cephesi/i.test(allText)) {
    if (/(?:güney\s+cephesi.*gümrü|güney\s+cephesi.*mudanya)/i.test(answer)) {
      findings.push({
        category: 'scientific_correctness',
        severity: 'critical',
        field: 'answer',
        message: 'Tarihsel bilgi hatası: Güney Cephesi Fransa ile imzalanan 1921 Ankara Antlaşması ile kapanmıştır.',
        suggestedFix: 'Güney Cephesini kapatan antlaşmayı Ankara Antlaşması olarak düzeltiniz.',
        validationMethod: 'social_fronts_treaties_match'
      });
    }
  }

  // 3. Atatürk İlkeleri Kavram Eşleşmesi
  if (/aşar\s+vergisi/i.test(allText) && /devletçilik/i.test(answer) && !/halkçılık/i.test(answer)) {
    findings.push({
      category: 'scientific_correctness',
      severity: 'warning',
      field: 'answer',
      message: 'Kavramsal uyarı: Aşar vergisinin kaldırılması doğrudan köylü üzerindeki ağır vergi yükünü kaldırarak eşitliği sağladığı için öncelikle "Halkçılık" ilkesiyle ilişkilendirilir.',
      suggestedFix: 'Model cevaba Halkçılık ilkesini ve sosyal adalet/eşitlik gerekçesini ekleyiniz.',
      validationMethod: 'social_ataturk_principles_match'
    });
  }

  // 4. Belge, Harita veya Kaynak Yorumlama Sorularında Dayanak Kontrolü
  const isDocumentAnalysis = /(?:verilen\s+(?:haritaya|metne|belgeye|tabloya)\s+göre|alıntıdan\s+hareketle|sözünden\s+çıkarılabilecek)/i.test(stem);
  if (isDocumentAnalysis && (!stimulus || stimulus.length < 50)) {
    findings.push({
      category: 'answerability',
      severity: 'critical',
      field: 'stimulus',
      message: 'Belge/metin/harita analiz sorusu olmasına rağmen incelenecek tarihi belge, metin veya veri stimulus alanında bulunmamaktadır.',
      suggestedFix: 'İncelenecek tarihi kaynağı, meclis tutanağını veya alıntıyı stimulus alanına ekleyiniz.',
      validationMethod: 'social_historical_source_presence'
    });
  }

  return findings;
}
