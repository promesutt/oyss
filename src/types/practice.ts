import { ExamPaper } from './index';

export type PracticeFeedbackMode = 'immediate' | 'end_of_exam';

/**
 * Öğrencinin açık uçlu soruya verdiği cevabın öz değerlendirme için
 * asgari anlamlı içerik eşiğini belirler.
 * 
 * Pedagojik İlke:
 * Bu kontrol bir "otomatik doğruluk değerlendirmesi" DEĞİLDİR; öğrencinin cevabının
 * doğru veya yanlış olduğunu söylemez. Tek amacı, tek bir harf ('a') veya
 * anlamsız noktalama işaretleri ('.', '...') girilerek model cevabın ve rubriğin
 * kötüye kullanımını engellemektir.
 * 
 * 'Ay', 'Su', '12', '-5', 'x=3' gibi meşru kısa cevaplar engellenmez.
 */
export const MIN_STUDENT_ANSWER_LENGTH = 2;

export function isValidStudentAnswer(text: string | undefined | null): boolean {
  if (!text) return false;
  const trimmed = text.trim();
  if (trimmed.length < MIN_STUDENT_ANSWER_LENGTH) {
    return false;
  }
  // En az bir harf (Türkçe dahil), rakam veya geçerli matematiksel sembol içermelidir
  const hasMeaningfulContent = /[\p{L}\p{N}\$\\√\+\-\*\/=><]/u.test(trimmed);
  if (!hasMeaningfulContent) {
    return false;
  }
  // Yalnızca anlamsız noktalama/boşluk dizilerinden oluşmamalıdır (örn: "..", "--", "?!")
  const strippedNonContent = trimmed.replace(/[\s.,;:!?_\-~^`'"()\[\]{}|\\\/]/g, '');
  const hasContentOrMath = strippedNonContent.length > 0 || /[0-9\p{L}√=><]/u.test(trimmed);
  return hasContentOrMath;
}

export type GeneralSelfEvaluationOption = 
  | 'dogru' 
  | 'kismen_dogru' 
  | 'yanlis' 
  | 'emin_degilim';

export interface QuestionSessionData {
  questionNumber: number;
  studentAnswer: string;
  isAnswered: boolean;
  isEvaluated: boolean; // Öğrenci rubrik üzerinden öz değerlendirmesini tamamladı mı?
  generalSelfEvaluation?: GeneralSelfEvaluationOption; // Öğrencinin genel kanaati ("Cevabım doğru", "kısmen doğru", "yanlış", "emin değilim")
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
