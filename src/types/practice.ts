import { ExamPaper } from './index';

export type PracticeFeedbackMode = 'immediate' | 'end_of_exam';

export interface QuestionSessionData {
  questionNumber: number;
  studentAnswer: string;
  isAnswered: boolean;
  isEvaluated: boolean; // Öğrenci rubrik üzerinden öz değerlendirmesini tamamladı mı?
  checkedCriteriaIndices: number[]; // Seçilen rubrik ölçütlerinin indeksleri (0-based)
  earnedPoints: number; // Hesaplanan öz değerlendirme puanı (max: question.points)
  evaluatedAt?: number;
}

export interface StudentExamSession {
  examId: string;
  examSource: 'curated_archive' | 'ai_generated';
  examTitle: string;
  grade: number;
  subjectId: string;
  scenarioId: string;
  feedbackMode: PracticeFeedbackMode;
  currentQuestionIndex: number; // 0-based
  isCompleted: boolean;
  createdAt: number;
  updatedAt: number;
  answers: Record<number, QuestionSessionData>; // key: questionNumber (1-based)
  customExamSnapshot?: ExamPaper; // AI ile üretilen sınavın F5 yenilemelerinde korunması için anlık kopyası
}

export interface OutcomeDiagnosticItem {
  outcomeCode: string;
  outcomeTitle: string;
  questionNumbers: number[];
  totalPoints: number;
  earnedPoints: number;
  status: 'tam_basari' | 'kismi_basari' | 'pekistirilmeli' | 'degerlendirilmedi';
  hasStudyMaterial: boolean;
  recommendedTopicTitle?: string;
  isGeneralUnitReview?: boolean;
}

export interface ExamSessionSummary {
  totalQuestions: number;
  answeredCount: number;
  emptyCount: number;
  evaluatedCount: number;
  totalExamPoints: number;
  totalEarnedPoints: number;
  percentageScore: number;
  outcomeDiagnostics: OutcomeDiagnosticItem[];
}
