/**
 * OYSS Rehberi Evrensel Soru Kalite Güvence Sistemi (Universal Quality Assurance Engine)
 *
 * Amaç: 5, 6, 7 ve 8. sınıflar, 6 resmî dersin tümü için;
 * - Bilimsel / matematiksel doğruluk,
 * - Kazanım uyumu ve kapsam sınırları,
 * - Cevaplanabilirlik ve veri bütünlüğü,
 * - Soru ve model cevap tutarlılığı,
 * - Rubrik ve puanlama dengesi,
 * - Dil, anlatım ve seviye uygunluğu
 * denetimlerini deterministik olarak gerçekleştirmek; hatalı soruların öğrenciye ulaşmasını önlemektir.
 */

import {
  QualityStatus,
  QualityFinding,
  QuestionQualityResult,
  ExamQualityAuditReport,
  QuestionValidationContext
} from './types';
import { runCommonQualityChecks } from './commonValidators';
import { validateTurkishQuestion } from './validators/turkishValidator';
import { validateMathQuestion } from './validators/mathValidator';
import { validateScienceQuestion } from './validators/scienceValidator';
import { validateSocialQuestion } from './validators/socialValidator';
import { validateDinQuestion } from './validators/dinValidator';
import { validateEnglishQuestion } from './validators/englishValidator';
import { autoRemediateQuestion } from './remediationEngine';

export * from './types';
export * from './commonValidators';
export * from './remediationEngine';
export {
  validateTurkishQuestion,
  validateMathQuestion,
  validateScienceQuestion,
  validateSocialQuestion,
  validateDinQuestion,
  validateEnglishQuestion
};

function resolveSubjectId(context: QuestionValidationContext, question: any): string {
  const raw = (context.subjectId || context.subject || question?.subjectId || question?.subject || '').toLowerCase().trim();
  if (raw.includes('turk') || raw === 'tr') return 'turkce';
  if (raw.includes('mat')) return 'matematik';
  if (raw.includes('fen')) return 'fen_bilimleri';
  if (raw.includes('sos') || raw.includes('ink') || raw.includes('tarih')) return 'sosyal_bilgiler';
  if (raw.includes('din')) return 'din_kulturu';
  if (raw.includes('ing') || raw.includes('eng')) return 'ingilizce';
  return raw;
}

/**
 * Tek Bir Sorunun Kalite Denetimini Gerçekleştirir (Ortak + Ders Uzmanı Katmanı)
 */
export function auditQuestionQuality(
  question: any,
  context: QuestionValidationContext = {}
): QuestionQualityResult {
  const qNum = question?.questionNumber || question?.number || 1;
  const subjectId = resolveSubjectId(context, question);

  // 1. Ortak Kalite Denetimi
  const findings: QualityFinding[] = runCommonQualityChecks(question, context);

  // 2. Branş Uzmanı Denetimi
  if (subjectId === 'turkce') {
    findings.push(...validateTurkishQuestion(question, context));
  } else if (subjectId === 'matematik') {
    findings.push(...validateMathQuestion(question, context));
  } else if (subjectId === 'fen_bilimleri') {
    findings.push(...validateScienceQuestion(question, context));
  } else if (subjectId === 'sosyal_bilgiler') {
    findings.push(...validateSocialQuestion(question, context));
  } else if (subjectId === 'din_kulturu') {
    findings.push(...validateDinQuestion(question, context));
  } else if (subjectId === 'ingilizce') {
    findings.push(...validateEnglishQuestion(question, context));
  }

  // 3. Durum ve Puanlama Analizi
  const criticalCount = findings.filter(f => f.severity === 'critical').length;
  const warningCount = findings.filter(f => f.severity === 'warning').length;
  const infoCount = findings.filter(f => f.severity === 'info').length;

  let status: QualityStatus = 'passed';
  if (criticalCount > 0) {
    status = 'failed';
  } else if (question?._qaStatus === 'needs_review' || question?.needsReview) {
    status = 'needs_review';
  } else if (warningCount > 0) {
    status = 'warning';
  }

  // Kalite Skoru Hesaplama (100 üzerinden)
  let score = 100 - (criticalCount * 35 + warningCount * 10 + infoCount * 2);
  score = Math.max(0, Math.min(100, score));

  // Yalnızca kritik hatası veya bekleyen incelemesi olmayan sorular öğrenciye sunulabilir
  const isCertified = status !== 'failed' && status !== 'needs_review' && criticalCount === 0;

  return {
    questionNumber: qNum,
    status,
    score,
    isCertified,
    findings
  };
}

/**
 * Tüm Bir Sınav Setinin (Exam Paper veya Soru Dizisi) Kalite Denetimini Gerçekleştirir
 */
export function auditExamQuality(
  questionsInput: any,
  contextInput: QuestionValidationContext = {}
): ExamQualityAuditReport {
  const startTime = Date.now();
  let safeList: any[] = [];
  let context: QuestionValidationContext = { ...contextInput };

  if (Array.isArray(questionsInput)) {
    safeList = questionsInput;
  } else if (questionsInput && typeof questionsInput === 'object') {
    if (Array.isArray(questionsInput.questions)) {
      safeList = questionsInput.questions;
    }
    context = {
      grade: questionsInput.grade ?? contextInput.grade,
      subject: questionsInput.subject ?? contextInput.subject,
      subjectId: questionsInput.subjectId ?? contextInput.subjectId,
      ...contextInput
    };
  }

  const questionResults: Record<number, QuestionQualityResult> = {};
  const allCritical: QualityFinding[] = [];
  const examLevelFindings: QualityFinding[] = [];

  let passedCount = 0;
  let warningCount = 0;
  let needsReviewCount = 0;
  let failedCount = 0;
  let totalScore = 0;

  // Sınav içi kardeş sorular bağlamını hazırla
  const siblingSummary = safeList.map((q, idx) => ({
    questionNumber: q.questionNumber || q.number || idx + 1,
    questionText: q.questionText || q.question || '',
    stimulus: q.stimulus || '',
    answer: q.modelAnswer || q.answer || ''
  }));

  safeList.forEach((q, idx) => {
    const qNum = q.questionNumber || q.number || idx + 1;
    const qContext: QuestionValidationContext = {
      ...context,
      targetPoints: q.points || 10,
      siblingQuestions: siblingSummary.filter((_, sIdx) => sIdx !== idx)
    };

    const res = auditQuestionQuality(q, qContext);
    questionResults[qNum] = res;
    totalScore += res.score;

    if (res.status === 'passed') passedCount++;
    else if (res.status === 'warning') warningCount++;
    else if (res.status === 'needs_review') needsReviewCount++;
    else if (res.status === 'failed') {
      failedCount++;
      allCritical.push(...res.findings.filter(f => f.severity === 'critical'));
    }
  });

  const totalQuestions = safeList.length;
  const overallScore = totalQuestions > 0 ? Math.round(totalScore / totalQuestions) : 0;
  // Öğrenciye sunum için failed veya needs_review bulunmamalıdır
  const certifiedForStudents = failedCount === 0 && needsReviewCount === 0;

  let overallStatus: QualityStatus = 'passed';
  if (failedCount > 0) overallStatus = 'failed';
  else if (needsReviewCount > 0) overallStatus = 'needs_review';
  else if (warningCount > 0) overallStatus = 'warning';

  return {
    overallStatus,
    overallScore,
    certifiedForStudents,
    totalQuestions,
    passedCount,
    warningCount,
    failedCount,
    needsReviewCount,
    criticalIssues: allCritical,
    questionResults,
    examLevelFindings,
    executionTimeMs: Date.now() - startTime
  };
}

/**
 * Sınav Sorularını Denetler, Deterministik Düzeltir ve Gerekirse Güvenli İkame Eder
 * (Uçtan Uca Kalite Güvence ve Sertifikasyon)
 */
export function ensureExamQuality<T extends any>(
  questionsInput: T[] | any,
  contextInput: QuestionValidationContext = {},
  substitutionPool?: T[]
): any {
  const isExamObject = questionsInput && !Array.isArray(questionsInput) && Array.isArray(questionsInput.questions);
  const safeList: any[] = isExamObject ? [...questionsInput.questions] : (Array.isArray(questionsInput) ? [...questionsInput] : []);
  const context: QuestionValidationContext = isExamObject
    ? {
        grade: questionsInput.grade ?? contextInput.grade,
        subject: questionsInput.subject ?? contextInput.subject,
        subjectId: questionsInput.subjectId ?? contextInput.subjectId,
        ...contextInput
      }
    : contextInput;

  let remediationCount = 0;

  // 1. ADIM: İlk Denetim ve Deterministik Düzeltme
  const remediatedList = safeList.map((q) => {
    const initialAudit = auditQuestionQuality(q, context);

    if (initialAudit.status === 'failed' || initialAudit.status === 'warning') {
      const { remediatedQuestion, wasModified, notes } = autoRemediateQuestion(q, initialAudit);
      if (wasModified) {
        remediationCount++;
        // Düzeltme sonrası tekrar denetle
        const reAudit = auditQuestionQuality(remediatedQuestion, context);
        return {
          ...remediatedQuestion,
          _qaNotes: notes,
          _qaStatus: reAudit.status
        };
      }
    }
    return q;
  });

  // 2. ADIM: Deterministik Olarak Düzeltilemeyen Kritik Hatalı Soruları İkame Et
  const finalList = remediatedList.map((q, idx) => {
    const postAudit = auditQuestionQuality(q, context);

    if (postAudit.status === 'failed') {
      if (substitutionPool && substitutionPool.length > 0) {
        const reqOutcome = (q as any).outcomeCode || (q as any).outcome;
        // İkame havuzundan aynı kazanıma sahip temiz ve kaynak kökeni doğrulanmış soru ara
        const candidate = substitutionPool.find(sub => {
          const subOutcome = (sub as any).outcomeCode || (sub as any).outcome;
          if (!subOutcome || !reqOutcome) return false;
          if (subOutcome.trim() !== reqOutcome.trim()) return false;
          const subAudit = auditQuestionQuality(sub, context);
          return subAudit.status !== 'failed';
        });

        if (candidate) {
          remediationCount++;
          // Kaynak kökeni korunur; oyss_curated asla meb_official yapılmaz
          const preservedOrigin = (candidate as any).sourceOrigin || 'oyss_curated';
          console.warn(`[QualityAssurance] ${idx + 1}. soruda kritik kalite kusuru tespit edildi; doğrulanmış yedek soru (${preservedOrigin}) ile ikame edildi.`);
          return {
            ...candidate,
            questionNumber: idx + 1,
            number: idx + 1,
            sourceOrigin: preservedOrigin,
            points: (q as any).points || (candidate as any).points || 10,
            _qaSubstitution: {
              originalQuestionId: (q as any).id || (q as any).questionNumber,
              originalOutcome: reqOutcome,
              substitutedWithOutcome: reqOutcome,
              sourceOrigin: preservedOrigin
            }
          };
        }
      }

      // Uygun ikame bulunamadığında soruyu sertifikasız olarak işaretle ve açık uyarı ekle
      console.warn(`[QualityAssurance] ${idx + 1}. soruda kritik kalite kusuru tespit edildi ancak uygun ikame soru bulunamadı.`);
      return {
        ...q,
        isCertified: false,
        _qaWarning: 'Bu soru kalite güvence denetimini geçemedi ve uygun ikame soru bulunamadı. Lütfen soruyu inceleyiniz veya yeniden üretiniz.',
        _qaStatus: 'failed'
      };
    }
    return q;
  });

  // 3. ADIM: Her Soru İçin Sertifikasyon ve Durum Alanlarını Kesinleştir (TASK185)
  const certifiedList = finalList.map((q) => {
    const audit = auditQuestionQuality(q, context);
    const isNeedsReview = (q as any)._qaStatus === 'needs_review' || (q as any).needsReview === true || audit.status === 'needs_review';
    const isFailed = (q as any)._qaStatus === 'failed' || audit.status === 'failed';
    const isCert = audit.isCertified && !isFailed && !isNeedsReview;

    let qStatus = 'passed';
    if (isFailed) qStatus = 'failed';
    else if (isNeedsReview) qStatus = 'needs_review';
    else if (audit.status === 'warning') qStatus = 'warning';

    return {
      ...q,
      isCertified: isCert,
      _qaStatus: qStatus,
      _qaFindings: audit.findings
    };
  });

  // 4. ADIM: Nihai Sınav Kalite Raporu
  const finalReport = auditExamQuality(certifiedList, context);

  if (isExamObject) {
    return {
      ...questionsInput,
      questions: certifiedList,
      qualityAudit: {
        summary: finalReport,
        certifiedForStudents: finalReport.certifiedForStudents,
        remediationCount
      }
    };
  }

  return {
    certifiedQuestions: certifiedList,
    report: finalReport,
    remediationCount
  };
}

/**
 * Çalışma Kâğıtlarının Kalite Güvence ve Sertifikasyon Denetimi (TASK184)
 * Çözümlü örnekler ve sıra sende alıştırmalarını denetler, kusurlu içeriklerin öğrenciye sunulmasını engeller.
 */
export function ensureStudySheetQuality(
  studySheet: any,
  contextInput: QuestionValidationContext = {}
): any {
  if (!studySheet || !Array.isArray(studySheet.sections)) {
    return studySheet;
  }

  const context: QuestionValidationContext = {
    grade: studySheet.grade,
    subjectId: studySheet.subjectId,
    materialKind: 'study_sheet',
    skipRubricCheck: true,
    ...contextInput
  };

  let failedSectionsCount = 0;
  let needsReviewSectionsCount = 0;
  let warningSectionsCount = 0;
  let passedSectionsCount = 0;
  let totalScore = 0;
  const sectionResults: Record<number, QuestionQualityResult> = {};
  const allCritical: QualityFinding[] = [];

  const certifiedSections = studySheet.sections.map((sec: any, idx: number) => {
    // 1. Çözümlü Model Soru Denetimi
    const solvedQ = {
      questionNumber: idx + 1,
      outcomeCode: sec.outcomeCode,
      questionText: sec.solvedExample?.question || '',
      question: sec.solvedExample?.question || '',
      modelAnswer: sec.solvedExample?.solution || '',
      answer: sec.solvedExample?.solution || '',
      solutionExplanation: sec.solvedExample?.analysis || '',
      subjectId: studySheet.subjectId,
      grade: studySheet.grade,
      points: 10
    };
    const solvedAudit = auditQuestionQuality(solvedQ, context);

    // 2. Sıra Sende Soru Denetimi (TASK185 Uyaran ve Bağlam Doğrulaması)
    // Practice question yalnızca açıkça kendisine ait uyaranı (sec.practiceQuestion.stimulus)
    // veya açıkça tanımlanmış bağıntıyı (usesSolvedExampleStimulus === true) kullanır.
    // Otomatik olarak solvedExample metni ortak uyaran kabul EDİLMEZ.
    let practiceStimulus: string | undefined = sec.practiceQuestion?.stimulus;
    if (!practiceStimulus && sec.practiceQuestion?.usesSolvedExampleStimulus === true) {
      practiceStimulus = (sec.solvedExample as any)?.stimulus || sec.solvedExample?.question;
    }

    const practiceQ = {
      questionNumber: idx + 1,
      outcomeCode: sec.outcomeCode,
      questionText: sec.practiceQuestion?.question || '',
      question: sec.practiceQuestion?.question || '',
      stimulus: practiceStimulus,
      contextText: practiceStimulus,
      modelAnswer: sec.practiceQuestion?.hint || '',
      answer: sec.practiceQuestion?.hint || '',
      subjectId: studySheet.subjectId,
      grade: studySheet.grade,
      points: 10
    };
    const practiceAudit = auditQuestionQuality(practiceQ, context);

    const findings: QualityFinding[] = [...solvedAudit.findings, ...practiceAudit.findings];
    const isSolvedFailed = solvedAudit.status === 'failed' || sec._qaStatus === 'failed';
    const isPracticeFailed = practiceAudit.status === 'failed';
    const isNeedsReview = solvedAudit.status === 'needs_review' || practiceAudit.status === 'needs_review' || sec._qaStatus === 'needs_review' || sec.needsReview === true;

    const isCertified = !isSolvedFailed && !isPracticeFailed && !isNeedsReview;
    let qaStatus: QualityStatus = 'passed';
    if (isSolvedFailed || isPracticeFailed) {
      qaStatus = 'failed';
      failedSectionsCount++;
      allCritical.push(...findings.filter(f => f.severity === 'critical'));
    } else if (isNeedsReview) {
      qaStatus = 'needs_review';
      needsReviewSectionsCount++;
    } else if (solvedAudit.status === 'warning' || practiceAudit.status === 'warning') {
      qaStatus = 'warning';
      warningSectionsCount++;
    } else {
      passedSectionsCount++;
    }

    const avgScore = Math.round((solvedAudit.score + practiceAudit.score) / 2);
    totalScore += avgScore;

    sectionResults[idx + 1] = {
      questionNumber: idx + 1,
      status: qaStatus,
      score: avgScore,
      isCertified,
      findings
    };

    return {
      ...sec,
      isCertified,
      qaStatus,
      qaFindings: findings
    };
  });

  const totalSections = certifiedSections.length;
  const overallScore = totalSections > 0 ? Math.round(totalScore / totalSections) : 0;
  const certifiedForStudents = failedSectionsCount === 0 && needsReviewSectionsCount === 0;

  let overallStatus: QualityStatus = 'passed';
  if (failedSectionsCount > 0) overallStatus = 'failed';
  else if (needsReviewSectionsCount > 0) overallStatus = 'needs_review';
  else if (warningSectionsCount > 0) overallStatus = 'warning';

  const summaryReport: ExamQualityAuditReport = {
    overallStatus,
    overallScore,
    certifiedForStudents,
    totalQuestions: totalSections,
    passedCount: passedSectionsCount,
    warningCount: warningSectionsCount,
    failedCount: failedSectionsCount,
    needsReviewCount: needsReviewSectionsCount,
    criticalIssues: allCritical,
    questionResults: sectionResults,
    examLevelFindings: [],
    executionTimeMs: 0
  };

  return {
    ...studySheet,
    sections: certifiedSections,
    qualityAudit: {
      summary: summaryReport,
      certifiedForStudents
    }
  };
}

// TASK188 Onaylı İçerik ve Sunum Filtreleme Dışa Aktarımları
export * from './presentationContentFilter';

