/**
 * OYSS Rehberi Onaylı İçerik ve Sunum Filtreleme Katmanı (TASK188)
 * 
 * Bu modül, kalite güvence denetiminden geçememiş (failed), inceleme aşamasında olan (needs_review)
 * veya henüz onaylanmamış (isCertified === false) soruların ham metinlerinin, uyaranlarının,
 * hatalı çözümlerinin ve iç teknik denetim notlarının kullanıcıya sunulan materyallere
 * ve yerel depolamaya girmesini önler.
 * 
 * OYSS Rehberi açık erişimli bir eğitim portalıdır; rol/yetkilendirme sistemi barındırmaz.
 * Bu filtreleme, kullanıcı rolünden bağımsız olarak yalnızca kalite standartlarını karşılayan
 * doğrulanmış içeriklerin sunulmasını güvenceye alır.
 */

import { ExamPaper, ExamQuestion, StudySheet, StudySheetSection } from '../../types';
import { QualityStatus } from './types';

export interface PresentationContentFilterOptions {
  /**
   * Model cevap ve analitik rubriğin kullanıcı görünümüne dahil edilip edilmeyeceği.
   * Öz değerlendirme aşamasında kullanıcıya açılabilir; sınav çözme esnasında gizlenebilir.
   * Varsayılan: true (öz değerlendirme için modelAnswer korunur, ancak failed sorularda kesinlikle temizlenir).
   */
  allowModelAnswer?: boolean;
}

/**
 * Tek bir sınav sorusunu sunum standartlarına göre temizler ve filtreler.
 * Onaylanmamış soruların ham soru metni, uyaranı, görseli, seçenekleri ve iç QA notları arındırılır.
 */
export function sanitizeExamQuestion(
  q: ExamQuestion,
  options?: PresentationContentFilterOptions
): ExamQuestion {
  const isBlocked = 
    q.isCertified === false || 
    (q as any)._qaStatus === 'failed' || 
    (q as any)._qaStatus === 'needs_review' || 
    (q as any).needsReview === true;

  if (isBlocked) {
    const status: QualityStatus = ((q as any)._qaStatus === 'needs_review' || (q as any).needsReview) 
      ? 'needs_review' 
      : 'failed';

    return {
      questionNumber: q.questionNumber,
      outcomeCode: q.outcomeCode,
      outcomeTitle: q.outcomeTitle,
      difficulty: q.difficulty,
      cognitiveLevel: q.cognitiveLevel,
      archetype: q.archetype,
      points: q.points,
      // Kusurlu veya inceleme bekleyen içerik yerine standart nötr bilgilendirme:
      questionText: 'Bu soru kalite güvence standartları kapsamında güncellenmektedir.',
      contextText: undefined,
      stimulus: undefined,
      commonStimulus: undefined,
      visual: undefined,
      solutionExplanation: '',
      modelAnswer: '',
      alternativeAnswers: [],
      rubric: [],
      isCertified: false,
      _qaStatus: status,
      // İç teknik QA notları sunum modeline eklenmez:
      _qaWarning: undefined,
      _qaFindings: undefined
    };
  }

  // Geçerli (passed) veya pedagojik uyarıya sahip (warning) onaylı soru:
  return {
    questionNumber: q.questionNumber,
    outcomeCode: q.outcomeCode,
    outcomeTitle: q.outcomeTitle,
    difficulty: q.difficulty,
    cognitiveLevel: q.cognitiveLevel,
    archetype: q.archetype,
    points: q.points,
    contextText: q.contextText,
    stimulus: q.stimulus,
    commonStimulus: q.commonStimulus,
    questionText: q.questionText,
    visual: q.visual,
    solutionExplanation: options?.allowModelAnswer === false ? '' : q.solutionExplanation,
    modelAnswer: options?.allowModelAnswer === false ? '' : q.modelAnswer,
    alternativeAnswers: options?.allowModelAnswer === false ? [] : (q.alternativeAnswers || []),
    rubric: options?.allowModelAnswer === false ? [] : (q.rubric || []),
    sourceOrigin: q.sourceOrigin,
    originExamTitle: q.originExamTitle,
    originQuestionNumber: q.originQuestionNumber,
    isCertified: true,
    _qaStatus: ((q as any)._qaStatus as QualityStatus) || 'passed',
    // İç teknik QA denetim notları sunum modelinden arındırılır:
    _qaWarning: undefined,
    _qaFindings: undefined,
    sourceValidationError: undefined,
    hasMissingSourceError: undefined
  };
}

/**
 * Bir sınav kâğıdının tamamını sunum standartlarına göre temizler ve filtreler.
 */
export function sanitizeExamPaper(
  exam: ExamPaper,
  options?: PresentationContentFilterOptions
): ExamPaper {
  if (!exam) return exam;

  // Kusurlu veya inceleme bekleyen sorular öğrenciye sunulmaz; elenir (TASK233)
  const validQuestions = (exam.questions || []).filter(q => 
    q.isCertified !== false && 
    (q as any)._qaStatus !== 'failed' && 
    (q as any)._qaStatus !== 'needs_review' && 
    (q as any).needsReview !== true
  );

  const targetList = validQuestions.length > 0 ? validQuestions : exam.questions || [];

  // Soru numaralarını 1, 2, 3... olarak yeniden indeksle ve sunum modelini temizle
  let sanitizedQuestions = targetList.map((q, idx) => ({
    ...sanitizeExamQuestion(q, options),
    questionNumber: idx + 1,
    number: idx + 1,
    sourceValidationError: undefined,
    hasMissingSourceError: undefined
  }));

  // Eğer kusurlu sorular elendiyse puanları sınav toplam puanına göre dengeli dağıt
  if (validQuestions.length > 0 && validQuestions.length < (exam.questions || []).length) {
    const targetTotal = exam.totalPoints || 100;
    const basePts = Math.floor(targetTotal / sanitizedQuestions.length);
    const rem = targetTotal - (basePts * sanitizedQuestions.length);
    sanitizedQuestions = sanitizedQuestions.map((q, i) => {
      const pts = basePts + (i < rem ? 1 : 0);
      return {
        ...q,
        points: pts,
        rubric: (q.rubric && q.rubric.length > 0)
          ? q.rubric.map((r, ri) => ri === 0 ? { ...r, points: pts - (q.rubric!.slice(1).reduce((s, cr) => s + (cr.points || 0), 0)) } : r)
          : [{ criterion: 'Doğru ve eksiksiz cevap', points: pts }]
      };
    });
  }

  const certifiedForStudents = sanitizedQuestions.every(q => q.isCertified === true);

  return {
    ...exam,
    questions: sanitizedQuestions,
    // Özet kalite durumu korunur, iç denetim ayrıntıları sunumdan arındırılır:
    qualityAudit: exam.qualityAudit ? {
      overallStatus: exam.qualityAudit.overallStatus,
      certifiedForStudents: exam.qualityAudit.certifiedForStudents ?? certifiedForStudents,
      totalQuestions: sanitizedQuestions.length,
      passedCount: exam.qualityAudit.passedCount ?? 0,
      warningCount: exam.qualityAudit.warningCount ?? 0,
      failedCount: exam.qualityAudit.failedCount ?? 0,
      needsReviewCount: exam.qualityAudit.needsReviewCount ?? 0
    } : undefined
  };
}

/**
 * Bir çalışma kâğıdının bölümünü sunum standartlarına göre temizler ve filtreler.
 */
export function sanitizeStudySheetSection(
  sec: StudySheetSection
): StudySheetSection {
  const isBlocked = 
    sec.isCertified === false || 
    sec.qaStatus === 'failed' || 
    sec.qaStatus === 'needs_review' || 
    (sec as any)._qaStatus === 'failed' ||
    (sec as any)._qaStatus === 'needs_review' ||
    (sec as any).needsReview === true;

  if (isBlocked) {
    return {
      outcomeCode: sec.outcomeCode,
      topicTitle: sec.topicTitle,
      quickNotes: sec.quickNotes || [],
      examTraps: sec.examTraps || [],
      solvedExample: {
        question: 'Bu bölüm kalite güvence standartları kapsamında güncellenmektedir.',
        analysis: '',
        solution: 'Çözümlü örnek güncellenmektedir.'
      },
      practiceQuestion: {
        question: 'Bu alıştırma kalite güvence standartları kapsamında güncellenmektedir.',
        hint: ''
      },
      isCertified: false,
      qaStatus: (sec.qaStatus === 'needs_review' || (sec as any).needsReview) ? 'needs_review' : 'failed',
      qaFindings: undefined
    };
  }

  return {
    ...sec,
    isCertified: true,
    qaStatus: sec.qaStatus || 'passed',
    qaFindings: undefined
  };
}

/**
 * Bir çalışma kâğıdının tamamını sunum standartlarına göre temizler ve filtreler.
 */
export function sanitizeStudySheet(sheet: StudySheet): StudySheet {
  if (!sheet) return sheet;

  const sanitizedSections = (sheet.sections || []).map(sec => 
    sanitizeStudySheetSection(sec)
  );

  return {
    ...sheet,
    sections: sanitizedSections,
    qualityAudit: sheet.qualityAudit ? {
      summary: {
        overallStatus: sheet.qualityAudit.summary?.overallStatus || 'passed',
        overallScore: sheet.qualityAudit.summary?.overallScore || 0,
        certifiedForStudents: sheet.qualityAudit.certifiedForStudents ?? true,
        totalQuestions: sanitizedSections.length,
        passedCount: sheet.qualityAudit.summary?.passedCount ?? 0,
        warningCount: sheet.qualityAudit.summary?.warningCount ?? 0,
        failedCount: sheet.qualityAudit.summary?.failedCount ?? 0,
        needsReviewCount: sheet.qualityAudit.summary?.needsReviewCount ?? 0,
        criticalIssues: [],
        questionResults: {},
        examLevelFindings: [],
        executionTimeMs: 0
      },
      certifiedForStudents: sheet.qualityAudit.certifiedForStudents ?? true
    } : undefined
  };
}

