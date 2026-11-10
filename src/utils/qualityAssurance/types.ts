/**
 * OYSS Rehberi Evrensel Soru Kalite Güvence Sistemi - Tip Tanımları
 */

export type QualityStatus = 'passed' | 'warning' | 'failed' | 'needs_review';

export type QualitySeverity = 'critical' | 'warning' | 'info';

export type QualityCategory =
  | 'outcome_alignment'         // A. Kazanım Uyumu ve Kapsamı
  | 'answerability'               // B. Cevaplanabilirlik ve Veri Bütünlüğü
  | 'stem_answer_consistency'    // C. Soru Kökü ve Model Cevap Tutarlılığı
  | 'rubric_consistency'         // D. Rubrik ve Puanlama Kalitesi
  | 'language_clarity'           // E. Dil, Anlatım ve Seviye Uygunluğu
  | 'pedagogical_depth'          // F. Ölçme Niteliği ve Çeşitlilik
  | 'scientific_correctness';    // Ders Bazlı Bilimsel / Matematiksel / Olgusal Doğruluk

export type QualityTargetField =
  | 'stem'
  | 'stimulus'
  | 'answer'
  | 'alternativeAnswers'
  | 'rubric'
  | 'visual'
  | 'outcome'
  | 'general';

export interface QualityFinding {
  category: QualityCategory;
  severity: QualitySeverity;
  field: QualityTargetField;
  message: string;
  suggestedFix?: string;
  validationMethod: string;
}

export interface QuestionQualityResult {
  questionNumber: number;
  status: QualityStatus;
  score: number; // 0 - 100
  isCertified: boolean; // critical hata içermeyen, öğrenciye sunulabilir soru
  findings: QualityFinding[];
  autoRemediated?: boolean;
  remediationNotes?: string[];
  previousQaStatus?: QualityStatus;
}

export interface ExamQualityAuditReport {
  overallStatus: QualityStatus;
  overallScore: number; // 0 - 100
  certifiedForStudents: boolean;
  totalQuestions: number;
  passedCount: number;
  warningCount: number;
  failedCount: number;
  needsReviewCount: number;
  criticalIssues: QualityFinding[];
  questionResults: Record<number, QuestionQualityResult>;
  examLevelFindings: QualityFinding[];
  executionTimeMs: number;
}

export interface SharedSourceGroup {
  id: string;
  examId?: string;
  scenarioId?: string;
  title?: string;
  text?: string;
  sourceText?: string;
  questionNumbers: number[];
  sourceType?: 'reading_passage' | 'case_study' | 'poem' | 'data_table';
}

export interface QuestionValidationContext {
  grade?: number;
  subjectId?: string;
  subject?: string;
  course?: string;
  questionIndex?: number;
  totalQuestions?: number;
  targetPoints?: number;
  materialKind?: 'exam_paper' | 'study_sheet' | 'practice';
  skipRubricCheck?: boolean;
  sharedSourceGroups?: SharedSourceGroup[];
  assignedSubstitutionIds?: Set<string>;
  siblingQuestions?: Array<{
    questionNumber?: number;
    number?: number;
    questionText?: string;
    question?: string;
    stimulus?: string;
    commonStimulus?: string;
    sharedSourceId?: string;
    visual?: any;
    answer?: string;
  }>;
}

export type CandidateEligibilityStatus = 'eligible' | 'ineligible' | 'requires_review';

export interface CandidateEvaluationResult {
  status: CandidateEligibilityStatus;
  score: number;
  reason?: string;
}
