import { QualityFinding, QuestionValidationContext } from '../types';

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
  const allText = `${stem} ${stimulus} ${answer}`.toLowerCase();

  // 1. Tarihsel Kronoloji ve Anakronizm Denetimi
  // TBMM açılış yılı kontrolü (23 Nisan 1920)
  if (/tbmm.*(?:1918|1919).*açıl/i.test(allText)) {
    findings.push({
      category: 'scientific_correctness',
      severity: 'critical',
      field: 'answer',
      message: 'Kronolojik anakronizm: TBMM 23 Nisan 1920 tarihinde açılmıştır; 1918 veya 1919 yılında TBMM bulunmamaktadır.',
      suggestedFix: 'Tarihi 23 Nisan 1920 olarak düzeltiniz.',
      validationMethod: 'social_chronology_check'
    });
  }

  // Lozan ve Mondros kronolojik sırası
  if (/(?:lozan.*sonra.*mondros|mondros.*lozan.*sonra)/i.test(allText)) {
    findings.push({
      category: 'scientific_correctness',
      severity: 'critical',
      field: 'answer',
      message: 'Kronolojik çelişki: Mondros Ateşkesi (1918) I. Dünya Savaşı sonunda, Lozan Antlaşması (1923) ise Kurtuluş Savaşı zaferinden sonra imzalanmıştır.',
      suggestedFix: 'Olayların kronolojik sırasını Mondros (1918) -> Kurtuluş Savaşı -> Lozan (1923) olarak düzenleyiniz.',
      validationMethod: 'social_chronology_check'
    });
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
