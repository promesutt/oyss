import React, { useState, useEffect, useMemo } from 'react';
import { 
  ExamPaper, 
  classifyExamQuestions, 
  getExamClassificationDetails, 
  getQuestionSourceBadge 
} from '../types';
import { 
  PracticeFeedbackMode, 
  StudentExamSession, 
  QuestionSessionData,
  GeneralSelfEvaluationOption,
  OutcomeDiagnosticItem,
  ExamSessionSummary,
  isValidStudentAnswer
} from '../types/practice';
import { OUTCOME_STUDY_BANK } from '../data/outcomeStudyBank';
import { formatOutcomeBadgeTitle } from '../data/curriculumData';
import { MathRenderer } from './MathRenderer';
import { MathAnswerEditor } from './MathAnswerEditor';
import { 
  loadPracticeSession, 
  savePracticeSession, 
  clearPracticeSession 
} from '../utils/practiceStorage';
import { TextbookSourceCard } from './TextbookSourceCard';
import { QuestionVisualView } from './QuestionVisualView';
import { triggerPdfPrint } from '../utils/materialFileNameGenerator';
import { 
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  Award,
  Layers,
  Eye,
  Save,
  CheckSquare,
  Square,
  BarChart3,
  AlertTriangle,
  FileText,
  Printer,
  X,
  Info
} from 'lucide-react';

const GENERAL_SELF_EVAL_OPTIONS: {
  key: GeneralSelfEvaluationOption;
  label: string;
  activeClasses: string;
}[] = [
  {
    key: 'dogru',
    label: 'Cevabım doğru.',
    activeClasses: 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold ring-2 ring-emerald-500/20 shadow-2xs'
  },
  {
    key: 'kismen_dogru',
    label: 'Cevabım kısmen doğru.',
    activeClasses: 'bg-amber-100 border-amber-400 text-amber-950 font-bold ring-2 ring-amber-500/20 shadow-2xs'
  },
  {
    key: 'yanlis',
    label: 'Cevabım yanlış.',
    activeClasses: 'bg-rose-100 border-rose-400 text-rose-950 font-bold ring-2 ring-rose-500/20 shadow-2xs'
  },
  {
    key: 'emin_degilim',
    label: 'Emin değilim.',
    activeClasses: 'bg-indigo-100 border-indigo-400 text-indigo-950 font-bold ring-2 ring-indigo-500/20 shadow-2xs'
  }
];

interface InteractivePracticeViewProps {
  examPaper: ExamPaper;
  isCustomAIExam?: boolean;
  onBackToPaperView: () => void;
  onOpenStudySheet?: () => void;
}

export const InteractivePracticeView: React.FC<InteractivePracticeViewProps> = ({
  examPaper,
  isCustomAIExam = false,
  onBackToPaperView,
  onOpenStudySheet
}) => {
  const questions = examPaper.questions || [];
  const totalQuestions = questions.length;

  const classification = useMemo(() => {
    return examPaper.examClassification || classifyExamQuestions(examPaper.questions);
  }, [examPaper.examClassification, examPaper.questions]);

  const classDetails = useMemo(() => {
    return getExamClassificationDetails(classification);
  }, [classification]);

  // Soru bazında MEB ÖDSGM vs. OYSS kaynak tespiti (yalnızca gerçek meb_official soruları MEB sayılır)
  const isQuestionFromMeb = (qItem?: any): boolean => {
    if (!qItem) return false;
    return qItem.sourceOrigin === 'meb_official';
  };

  // Initialize or load session from localStorage
  const [session, setSession] = useState<StudentExamSession>(() => {
    const existing = loadPracticeSession(examPaper.id);
    if (existing && existing.answers) {
      return existing;
    }
    return {
      examId: examPaper.id,
      examSource: isCustomAIExam ? 'ai_generated' : 'curated_archive',
      examTitle: examPaper.title,
      grade: examPaper.grade,
      subjectId: examPaper.subjectId,
      scenarioId: examPaper.scenarioId,
      feedbackMode: 'end_of_exam', // Varsayılan geri bildirim modu: Sınav Sonunda Toplu
      currentQuestionIndex: 0,
      isCompleted: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      answers: {},
      customExamSnapshot: isCustomAIExam ? examPaper : undefined
    };
  });

  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(() => {
    return Math.min(Math.max(0, session.currentQuestionIndex || 0), Math.max(0, totalQuestions - 1));
  });

  const [isSavedIndicator, setIsSavedIndicator] = useState<boolean>(false);
  // Her soru için model cevap ve rubrik alanının açılıp açılmadığı (varsayılan: tüm sorular için kapalı)
  const [revealedQuestions, setRevealedQuestions] = useState<Record<number, boolean>>({});
  // Çalışma föyüne geçiş onay penceresi durumu (FAZ 3.2.4)
  const [isStudySheetConfirmModalOpen, setIsStudySheetConfirmModalOpen] = useState<boolean>(false);

  // Çalışma föyüne geçiş talebi işleyicisi
  const handleRequestOpenStudySheet = () => {
    if (!onOpenStudySheet) return;
    setIsStudySheetConfirmModalOpen(true);
  };

  // Çalışma föyüne geçiş onayı verildiğinde
  const handleConfirmOpenStudySheet = () => {
    // Sınav ekranından ayrılmadan önce son oturum durumunu garantiye al (yalnızca mevcut sınava aitse)
    if (session.examId === examPaper.id) {
      savePracticeSession({
        ...session,
        currentQuestionIndex: activeQuestionIndex,
        updatedAt: Date.now()
      });
    }
    setIsStudySheetConfirmModalOpen(false);
    if (onOpenStudySheet) {
      onOpenStudySheet();
    }
  };

  // Çalışma föyüne geçiş iptal edildiğinde (sınavda kal)
  const handleCancelOpenStudySheet = () => {
    setIsStudySheetConfirmModalOpen(false);
  };

  // Modal açıkken ESC tuşu ile kapatma desteği
  useEffect(() => {
    if (!isStudySheetConfirmModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsStudySheetConfirmModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStudySheetConfirmModalOpen]);

  // Sınav değiştiğinde (examPaper.id değiştiğinde) oturumu ve state'i senkronize et
  useEffect(() => {
    // Mevcut oturum zaten bu sınava aitse yeniden yükleme yapma
    if (session.examId === examPaper.id) {
      return;
    }

    const loaded = loadPracticeSession(examPaper.id);
    if (loaded && loaded.answers && loaded.examId === examPaper.id) {
      setSession(loaded);
      setActiveQuestionIndex(
        Math.min(Math.max(0, loaded.currentQuestionIndex || 0), Math.max(0, questions.length - 1))
      );
    } else {
      setSession({
        examId: examPaper.id,
        examSource: isCustomAIExam ? 'ai_generated' : 'curated_archive',
        examTitle: examPaper.title,
        grade: examPaper.grade,
        subjectId: examPaper.subjectId,
        scenarioId: examPaper.scenarioId,
        feedbackMode: 'end_of_exam',
        currentQuestionIndex: 0,
        isCompleted: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        answers: {},
        customExamSnapshot: isCustomAIExam ? examPaper : undefined
      });
      setActiveQuestionIndex(0);
    }
    setRevealedQuestions({});
    setIsStudySheetConfirmModalOpen(false);
  }, [examPaper.id, isCustomAIExam, examPaper.title, examPaper.grade, examPaper.subjectId, examPaper.scenarioId, questions.length]);

  // Auto-save session on change (yalnızca mevcut examPaper.id ile eşleştiğinde kaydet)
  useEffect(() => {
    if (!session || session.examId !== examPaper.id) {
      return;
    }
    const success = savePracticeSession({
      ...session,
      currentQuestionIndex: activeQuestionIndex,
      updatedAt: Date.now()
    });
    if (success) {
      setIsSavedIndicator(true);
      const timer = setTimeout(() => setIsSavedIndicator(false), 1400);
      return () => clearTimeout(timer);
    }
  }, [session, activeQuestionIndex, examPaper.id]);

  const currentQ = questions[activeQuestionIndex];
  const qNum = currentQ?.questionNumber || (activeQuestionIndex + 1);
  const currentAnswerData: QuestionSessionData = (session.examId === examPaper.id ? session.answers[qNum] : undefined) || {
    questionNumber: qNum,
    studentAnswer: '',
    isAnswered: false,
    isEvaluated: false,
    checkedCriteriaIndices: [],
    earnedPoints: 0
  };

  const hasStudentAnswer = isValidStudentAnswer(currentAnswerData.studentAnswer);
  const isEvaluationRevealed = Boolean(revealedQuestions[qNum]);

  // Öğrenci metin yanıtını güncelle
  const handleAnswerTextChange = (text: string) => {
    setSession(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [qNum]: {
          ...currentAnswerData,
          studentAnswer: text,
          isAnswered: isValidStudentAnswer(text)
        }
      }
    }));
  };

  // Öğrencinin genel öz değerlendirme kanaatini kaydet ("Cevabım doğru", "kısmen doğru", "yanlış", "emin değilim")
  const handleSetGeneralSelfEvaluation = (
    option: GeneralSelfEvaluationOption,
    targetQNum: number = qNum
  ) => {
    const targetQ = questions.find(q => (q.questionNumber || 0) === targetQNum) || currentQ;
    if (targetQ?.hasMissingSourceError) {
      return;
    }

    const ansData: QuestionSessionData = session.answers[targetQNum] || {
      questionNumber: targetQNum,
      studentAnswer: '',
      isAnswered: false,
      isEvaluated: false,
      checkedCriteriaIndices: [],
      earnedPoints: 0
    };

    // Boş veya tek harf/sembol gibi yetersiz cevaplarda genel değerlendirme yapılamaz
    if (!isValidStudentAnswer(ansData.studentAnswer)) {
      return;
    }

    setSession(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [targetQNum]: {
          ...ansData,
          generalSelfEvaluation: option
          // ÖNEMLİ: Genel kanaat rubrik puanını değiştirmez, tek başına puan üretmez.
        }
      }
    }));
  };

  // Rubrik kriteri işaretle / kaldır
  const handleToggleRubricCriterion = (criterionIdx: number, targetQNum: number = qNum) => {
    const targetQ = questions.find(q => (q.questionNumber || 0) === targetQNum) || currentQ;
    if (targetQ?.hasMissingSourceError) {
      return;
    }

    const ansData: QuestionSessionData = session.answers[targetQNum] || {
      questionNumber: targetQNum,
      studentAnswer: '',
      isAnswered: false,
      isEvaluated: false,
      checkedCriteriaIndices: [],
      earnedPoints: 0
    };

    // Boş veya tek harf/sembol gibi yetersiz cevaplarda rubrik üzerinden puan kazanılamaz
    if (!isValidStudentAnswer(ansData.studentAnswer)) {
      return;
    }

    const currentChecked = ansData.checkedCriteriaIndices || [];
    let updatedChecked: number[];
    if (currentChecked.includes(criterionIdx)) {
      updatedChecked = currentChecked.filter(i => i !== criterionIdx);
    } else {
      updatedChecked = [...currentChecked, criterionIdx].sort((a, b) => a - b);
    }

    // Seçilen ölçütlerin puanlarını topla
    const earned = updatedChecked.reduce((sum, idx) => {
      const crit = targetQ?.rubric?.[idx];
      return sum + (crit?.points || 0);
    }, 0);

    const safeEarned = Math.min(earned, targetQ?.points || 10);

    setSession(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [targetQNum]: {
          ...ansData,
          isEvaluated: true,
          checkedCriteriaIndices: updatedChecked,
          earnedPoints: safeEarned,
          evaluatedAt: Date.now()
        }
      }
    }));
  };

  // Tüm kriterleri karşılandı veya sıfırla
  const handleSetAllCriteria = (checkAll: boolean, targetQNum: number = qNum) => {
    const targetQ = questions.find(q => (q.questionNumber || 0) === targetQNum) || currentQ;
    if (targetQ?.hasMissingSourceError) {
      return;
    }

    const ansData: QuestionSessionData = session.answers[targetQNum] || {
      questionNumber: targetQNum,
      studentAnswer: '',
      isAnswered: false,
      isEvaluated: false,
      checkedCriteriaIndices: [],
      earnedPoints: 0
    };

    // Boş veya tek harf/sembol gibi yetersiz cevaplarda rubrik üzerinden puan kazanılamaz
    if (!isValidStudentAnswer(ansData.studentAnswer)) {
      return;
    }

    const rubric = targetQ?.rubric || [];
    const updatedChecked = checkAll ? rubric.map((_, i) => i) : [];
    const earned = checkAll ? targetQ.points : 0;

    setSession(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [targetQNum]: {
          ...ansData,
          isEvaluated: true,
          checkedCriteriaIndices: updatedChecked,
          earnedPoints: earned,
          evaluatedAt: Date.now()
        }
      }
    }));
  };

  // Geri bildirim modunu değiştir
  const handleFeedbackModeChange = (mode: PracticeFeedbackMode) => {
    setSession(prev => ({
      ...prev,
      feedbackMode: mode
    }));
  };

  // Sınavı tamamla ve özet ekrana geç
  const handleCompleteExam = () => {
    setSession(prev => ({
      ...prev,
      isCompleted: true
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sınavı yeniden başlat
  const handleResetSession = () => {
    if (window.confirm('Bu sınavdaki tüm cevaplarınız ve öz değerlendirme puanlarınız sıfırlanacaktır. Emin misiniz?')) {
      clearPracticeSession(examPaper.id);
      setSession({
        examId: examPaper.id,
        examSource: isCustomAIExam ? 'ai_generated' : 'curated_archive',
        examTitle: examPaper.title,
        grade: examPaper.grade,
        subjectId: examPaper.subjectId,
        scenarioId: examPaper.scenarioId,
        feedbackMode: session.feedbackMode || 'end_of_exam',
        currentQuestionIndex: 0,
        isCompleted: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        answers: {},
        customExamSnapshot: isCustomAIExam ? examPaper : undefined
      });
      setRevealedQuestions({});
      setActiveQuestionIndex(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Özet ve Kazanım Analizi Hesaplamaları
  const summary: ExamSessionSummary = useMemo(() => {
    let answeredCount = 0;
    let emptyCount = 0;
    let evaluatedCount = 0;
    let totalExamPoints = 0;
    let totalEarnedPoints = 0;

    const outcomeMap: Record<string, {
      title: string;
      questions: number[];
      totalPts: number;
      earnedPts: number;
      evaluatedQuestions: number;
    }> = {};

    questions.forEach((q, idx) => {
      const num = q.questionNumber || (idx + 1);
      totalExamPoints += q.points;
      const ans = session.answers[num];

      if (ans && isValidStudentAnswer(ans.studentAnswer)) {
        answeredCount++;
      } else {
        emptyCount++;
      }

      if (ans && ans.isEvaluated) {
        evaluatedCount++;
        totalEarnedPoints += ans.earnedPoints;
      }

      const oCode = q.outcomeCode || 'KOD_BELIRTILMEMIS';
      if (!outcomeMap[oCode]) {
        outcomeMap[oCode] = {
          title: q.outcomeTitle || 'Öğrenme Çıktısı',
          questions: [],
          totalPts: 0,
          earnedPts: 0,
          evaluatedQuestions: 0
        };
      }
      outcomeMap[oCode].questions.push(num);
      outcomeMap[oCode].totalPts += q.points;
      if (ans && ans.isEvaluated) {
        outcomeMap[oCode].earnedPts += ans.earnedPoints;
        outcomeMap[oCode].evaluatedQuestions++;
      }
    });

    const outcomeDiagnostics: OutcomeDiagnosticItem[] = Object.entries(outcomeMap).map(([code, data]) => {
      let status: OutcomeDiagnosticItem['status'] = 'degerlendirilmedi';
      if (data.evaluatedQuestions > 0) {
        if (data.earnedPts >= data.totalPts) {
          status = 'tam_basari';
        } else if (data.earnedPts > 0) {
          status = 'kismi_basari';
        } else {
          status = 'pekistirilmeli';
        }
      }

      const studyItem = OUTCOME_STUDY_BANK[code];
      return {
        outcomeCode: code,
        outcomeTitle: data.title,
        questionNumbers: data.questions,
        totalPoints: data.totalPts,
        earnedPoints: data.earnedPts,
        status,
        hasStudyMaterial: Boolean(studyItem),
        recommendedTopicTitle: studyItem?.topicTitle,
        isGeneralUnitReview: !studyItem
      };
    });

    const percentageScore = totalExamPoints > 0 
      ? Math.round((totalEarnedPoints / totalExamPoints) * 100) 
      : 0;

    return {
      totalQuestions,
      answeredCount,
      emptyCount,
      evaluatedCount,
      totalExamPoints,
      totalEarnedPoints,
      percentageScore,
      outcomeDiagnostics
    };
  }, [questions, session.answers, totalQuestions]);

  // Soru durumu rozeti
  const getQuestionStatusBadge = (questionNum: number) => {
    const q = questions.find(item => item.questionNumber === questionNum);
    if (q?.hasMissingSourceError) {
      return { label: 'Kaynak Eksik', bg: 'bg-amber-100 text-amber-900 border-amber-300 font-bold' };
    }
    const a = session.answers[questionNum];
    if (!a || (!isValidStudentAnswer(a.studentAnswer) && !a.isEvaluated)) {
      return { label: 'Boş', bg: 'bg-slate-100 text-slate-500 border-slate-200' };
    }
    if (a.isEvaluated) {
      const maxPts = q?.points || 15;
      if (a.earnedPoints >= maxPts) {
        return { label: `${a.earnedPoints} p (Tam)`, bg: 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold' };
      }
      if (a.earnedPoints > 0) {
        return { label: `${a.earnedPoints} p (Kısmi)`, bg: 'bg-amber-100 text-amber-900 border-amber-300 font-bold' };
      }
      return { label: '0 p', bg: 'bg-rose-100 text-rose-800 border-rose-300 font-bold' };
    }
    return { label: 'Cevaplandı (Taslak)', bg: 'bg-indigo-100 text-indigo-900 border-indigo-200' };
  };

  const handlePrint = () => {
    triggerPdfPrint({
      grade: examPaper.grade,
      subjectId: examPaper.subjectId,
      examTerm: examPaper.examTerm,
      scenarioId: examPaper.scenarioId,
      materialKind: 'interactive_exam',
      isCustomExam: isCustomAIExam,
      isCompletedPractice: session.isCompleted,
      examClassification: classification
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
      
      {/* Top Header / Mode Switcher Bar */}
      <div className="mb-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-150 pb-3.5 mb-3.5">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToPaperView}
              className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              Sınav Kâğıdına (A4) Dön
            </button>
            <div className="flex items-center space-x-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${classDetails.badgeColor}`}>
                {isCustomAIExam ? `★ ${classDetails.badgeLabel}` : classDetails.badgeLabel}
              </span>
              <span className="text-xs text-slate-500 hidden sm:inline">•</span>
              <span className="text-xs font-semibold text-slate-700 truncate max-w-xs sm:max-w-md">
                {examPaper.title}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            {isSavedIndicator && (
              <span className="text-emerald-700 font-medium text-[11px] flex items-center animate-pulse">
                <Save className="w-3.5 h-3.5 mr-1" />
                Cevaplar tarayıcıya kaydedildi
              </span>
            )}
            <button
              onClick={handleResetSession}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              title="Cevapları Sıfırla"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white transition-colors cursor-pointer print:hidden shadow-xs"
              title="Sınavı / Sonuç Raporunu Yazdır veya PDF İndir"
            >
              <Printer className="w-3.5 h-3.5 mr-1 text-amber-300" />
              <span>Yazdır / PDF</span>
            </button>
          </div>
        </div>

        {/* Feedback Mode Selector & Progress Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 px-2">Geri Bildirim Modu:</span>
            <button
              onClick={() => handleFeedbackModeChange('immediate')}
              className={`px-3 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                session.feedbackMode === 'immediate'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Her Sorudan Sonra
            </button>
            <button
              onClick={() => handleFeedbackModeChange('end_of_exam')}
              className={`px-3 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                session.feedbackMode === 'end_of_exam'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sınav Sonunda Toplu
            </button>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center space-x-2">
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-[11px] text-slate-700 font-medium">
              Cevaplanan: <strong>{summary.answeredCount} / {totalQuestions}</strong>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1 text-[11px] text-emerald-900 font-bold">
              Tahmini Puan: <strong>{summary.totalEarnedPoints} / {summary.totalExamPoints} p</strong>
            </div>
            {session.isCompleted ? (
              <button
                onClick={() => setSession(prev => ({ ...prev, isCompleted: false }))}
                className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Sorulara Dön
              </button>
            ) : (
              <button
                onClick={handleCompleteExam}
                className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer inline-flex items-center"
              >
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                Uygulamayı Tamamla & Öz Değerlendirmeyi Gör
              </button>
            )}
          </div>
        </div>

        {/* Question Pills Navigation */}
        <div className="mt-4 pt-3 border-t border-slate-150 flex items-center space-x-1.5 overflow-x-auto pb-1">
          {questions.map((q, idx) => {
            const num = q.questionNumber || (idx + 1);
            const isCurrent = idx === activeQuestionIndex && !session.isCompleted;
            const badge = getQuestionStatusBadge(num);
            return (
              <button
                key={num}
                onClick={() => {
                  setActiveQuestionIndex(idx);
                  if (session.isCompleted) {
                    setSession(prev => ({ ...prev, isCompleted: false }));
                  }
                }}
                className={`flex-shrink-0 flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  isCurrent
                    ? 'ring-2 ring-indigo-500 border-indigo-500 bg-indigo-50 text-indigo-900 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <span>S{num}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${badge.bg}`}>
                  {badge.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      {session.isCompleted ? (
        /* ======================== SUMMARY & DIAGNOSTIC VIEW ======================== */
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Executive Summary Banner */}
          <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-800/60 pb-6 mb-6">
              <div>
                <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full mb-2">
                  <Award className="w-3.5 h-3.5 mr-1" />
                  Öz Değerlendirme Tamamlandı
                </span>
                <h2 className="text-xl sm:text-2xl font-black">
                  Etkileşimli Sınav & Öz Değerlendirme Raporu
                </h2>
                <p className="text-xs sm:text-sm text-indigo-200 mt-1">
                  {examPaper.title}
                </p>
              </div>

              {/* Big Score Box & Print Button */}
              <div className="flex flex-col items-center gap-2">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center min-w-[160px]">
                  <span className="text-[11px] uppercase tracking-wider text-indigo-200 font-semibold block">
                    Tahmini Öz Değerlendirme
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-amber-300 mt-0.5">
                    {summary.totalEarnedPoints} <span className="text-lg text-white font-normal">/ {summary.totalExamPoints}</span>
                  </div>
                  <div className="text-xs text-indigo-200 font-bold mt-1">
                    Öğrenme & Değerlendirme Puanı: %{summary.percentageScore}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full inline-flex items-center justify-center px-3 py-1.5 rounded-xl text-xs font-bold bg-white/20 hover:bg-white/30 text-white border border-white/30 transition-all cursor-pointer print:hidden shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5 mr-1.5 text-amber-300" />
                  Raporu Yazdır / PDF
                </button>
              </div>
            </div>

            {/* Disclaimer Alert */}
            <div className="bg-indigo-950/70 border border-indigo-700/50 rounded-xl p-3.5 text-xs text-indigo-100 flex items-start space-x-2.5">
              <HelpCircle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
              <div>
                <strong>Önemli Pedagojik Hatırlatma:</strong> Bu puan, öğrencinin MEB Analitik Dereceli Puanlama Anahtarı (Rubrik) ölçütlerine göre kendi yanıtını değerlendirerek verdiği <em>tahmini öz değerlendirme puanıdır</em>. Resmî okul notu veya öğretmen değerlendirmesi yerine geçmez.
              </div>
            </div>

            {/* Sınav Kaynak Ayrımı Bilgilendirme Notu */}
            {isCustomAIExam && (
              <div className="bg-blue-950/70 border border-blue-700/50 rounded-xl p-3 text-xs text-blue-100 flex items-start space-x-2.5">
                <Info className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  <strong>Kaynak Bilgilendirmesi:</strong> {classDetails.disclaimer}
                </p>
              </div>
            )}

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 text-center text-xs">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-indigo-300 block mb-0.5">Toplam Soru</span>
                <strong className="text-lg text-white">{summary.totalQuestions}</strong>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-indigo-300 block mb-0.5">Cevaplanan</span>
                <strong className="text-lg text-emerald-400">{summary.answeredCount}</strong>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-indigo-300 block mb-0.5">Boş Bırakılan</span>
                <strong className="text-lg text-amber-400">{summary.emptyCount}</strong>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-indigo-300 block mb-0.5">Öz Değerlendirilen</span>
                <strong className="text-lg text-indigo-200">{summary.evaluatedCount}</strong>
              </div>
            </div>
          </div>

          {/* Outcome Diagnostics & Study Sheet Suggestions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Öğrenme Çıktısı (Kazanım) Düzeyinde Analiz ve Tekrar Önerileri
                </h3>
              </div>
              <span className="text-xs text-slate-500">
                ÖDSGM Konu-Soru Dağılımına Göre
              </span>
            </div>

            <div className="space-y-3">
              {summary.outcomeDiagnostics.map((diag) => {
                const isSuccess = diag.status === 'tam_basari';
                const isPartial = diag.status === 'kismi_basari';
                const isWeak = diag.status === 'pekistirilmeli';

                return (
                  <div 
                    key={diag.outcomeCode}
                    className={`border rounded-xl p-4 transition-all ${
                      isSuccess
                        ? 'bg-emerald-50/60 border-emerald-200'
                        : isPartial
                        ? 'bg-amber-50/60 border-amber-200'
                        : isWeak
                        ? 'bg-rose-50/60 border-rose-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold bg-white px-2 py-0.5 rounded border border-slate-300 text-slate-900">
                          {diag.outcomeCode}
                        </span>
                        <span className="text-xs font-bold text-slate-800">
                          {formatOutcomeBadgeTitle(diag.outcomeTitle, diag.outcomeCode) || diag.outcomeTitle}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 text-xs">
                        <span className="text-slate-600">
                          İlgili Sorular: <strong>S{diag.questionNumbers.join(', S')}</strong>
                        </span>
                        <span className="font-bold">
                          {diag.earnedPoints} / {diag.totalPoints} p
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          isSuccess
                            ? 'bg-emerald-200 text-emerald-900'
                            : isPartial
                            ? 'bg-amber-200 text-amber-900'
                            : isWeak
                            ? 'bg-rose-200 text-rose-900'
                            : 'bg-slate-200 text-slate-700'
                        }`}>
                          {isSuccess && 'Kazanım Sağlandı'}
                          {isPartial && 'Kısmen Sağlandı'}
                          {isWeak && 'Pekiştirilmeli'}
                          {diag.status === 'degerlendirilmedi' && 'Değerlendirilmedi'}
                        </span>
                      </div>
                    </div>

                    {/* Actionable recommendation based on OUTCOME_STUDY_BANK */}
                    <div className="pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="text-slate-600">
                        {diag.hasStudyMaterial ? (
                          <>
                            Önerilen Konu: <strong>{diag.recommendedTopicTitle}</strong> • Föydeki sınav tuzaklarını ve çözümlü örneği inceleyebilirsiniz.
                          </>
                        ) : (
                          <>
                            Bu öğrenme çıktısı için genel ünite föyünü ve ders notlarını gözden geçirmeniz önerilir.
                          </>
                        )}
                      </span>

                      {onOpenStudySheet && (
                        <button
                          onClick={handleRequestOpenStudySheet}
                          className="inline-flex items-center px-3 py-1 rounded-lg bg-white border border-slate-300 hover:border-indigo-400 text-indigo-700 font-bold shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5 mr-1" />
                          Çalışma Föyünü Aç
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Soru Bazında Ayrıntılı Cevap ve Rubrik İnceleme Tablosu */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center">
                <CheckSquare className="w-5 h-5 text-indigo-600 mr-2" />
                Soru Bazında Cevaplar ve Rubrik Ölçütleri Dökümü
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                Öz Değerlendirme & Geri Bildirim
              </span>
            </div>

            {/* Öğrenci Yaşına Uygun Öz Değerlendirme Açıklama Kartı */}
            <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-indigo-50 border border-indigo-200 rounded-xl p-4 sm:p-5 text-xs text-indigo-950 flex items-start space-x-3 shadow-2xs">
              <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <strong className="block text-indigo-900 font-bold text-xs uppercase tracking-wide">
                  Öğrenci Öz Değerlendirme Rehberi:
                </strong>
                <p className="leading-relaxed text-indigo-900 text-xs sm:text-[13px] font-medium">
                  Önce cevabını model cevapla karşılaştır. Sonra cevabının ne kadar doğru olduğunu düşündüğünü seç. Ardından aşağıdaki ölçütleri tek tek inceleyerek karşıladıklarını işaretle. Bir sorunun bazı bölümlerini doğru yapmış olabilirsin. Kendini dürüstçe değerlendirmen öğrenmene yardımcı olur.
                </p>
                <div className="pt-1 text-[11px] text-indigo-700/90 font-semibold border-t border-indigo-200/60 flex items-center space-x-1.5">
                  <span>ℹ️</span>
                  <span>
                    Bu puan senin kendi öğrenme sürecin için yaptığın <strong>öz değerlendirmedir</strong>; okul idaresi veya öğretmen tarafından verilmiş resmî bir sınav notu değildir.
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {questions.map((q, idx) => {
                const num = q.questionNumber || (idx + 1);
                const ans = session.examId === examPaper.id ? session.answers[num] : undefined;
                const checked = ans?.checkedCriteriaIndices || [];
                const rawAnswer = ans?.studentAnswer || '';
                const trimmedAnswer = rawAnswer.trim();
                const isCompletelyEmpty = trimmedAnswer.length === 0;
                const hasValidAnswer = isValidStudentAnswer(rawAnswer);

                return (
                  <div key={num} className="border border-slate-200 rounded-2xl p-4 sm:p-5 bg-slate-50/50 space-y-4 shadow-2xs">
                    {/* 1. Soru Numarası, Kazanım ve Puan Başlığı */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
                          {num}
                        </span>
                        <span className="text-xs font-bold text-indigo-900 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
                          [{q.outcomeCode}]
                        </span>
                        {q.outcomeTitle && (
                          <span className="text-xs text-slate-600 font-medium hidden sm:inline max-w-md truncate">
                            {formatOutcomeBadgeTitle(q.outcomeTitle, q.outcomeCode) || q.outcomeTitle}
                          </span>
                        )}
                        {q.sourceOrigin && (
                          (() => {
                            const sBadge = getQuestionSourceBadge(q.sourceOrigin, q.originExamTitle, q.originQuestionNumber);
                            return (
                              <span 
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${sBadge.badgeClass}`}
                                title={sBadge.tooltip}
                              >
                                {sBadge.label}
                              </span>
                            );
                          })()
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {q.hasMissingSourceError ? (
                          <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            Kaynak Eksik
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                            {ans?.isEvaluated ? `Öz Değerlendirme: ${ans.earnedPoints} / ${q.points} p` : `Değerlendirilmedi (${q.points} p)`}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setActiveQuestionIndex(idx);
                            setSession(prev => ({ ...prev, isCompleted: false }));
                          }}
                          className="text-xs text-indigo-600 hover:text-indigo-800 font-bold underline cursor-pointer ml-1"
                        >
                          Soruyu Düzenle / İncele
                        </button>
                      </div>
                    </div>

                    {q.hasMissingSourceError ? (
                      <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 space-y-2">
                        <div className="flex items-center space-x-2 font-bold text-xs text-amber-800">
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>Kaynak Materyal Bulunamadı - Değerlendirme Dışı</span>
                        </div>
                        <p className="text-xs text-amber-800 leading-relaxed">
                          {q.sourceValidationError || 'Bu soru metin, tablo veya görsel gibi bir kaynak materyale dayanmaktadır ancak kaynak materyal sınavda bulunamadığından soru öğrenci öz değerlendirmesine ve puanlamaya dahil edilmemiştir.'}
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* 2 & 3 & 4. SORU: Sınav Sırasında Öğrenciye Gösterilen Orijinal Soru Metni ve Materyalleri */}
                        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 shadow-2xs">
                          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100 pb-1.5">
                            <span className="flex items-center gap-1.5 text-slate-800">
                              <FileText className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                              <span>Sınav Sorusu:</span>
                            </span>
                            <span className="text-[11px] font-semibold text-slate-400">
                              Soru Değeri: {q.points} Puan
                            </span>
                          </div>

                          {/* Özel Durum Senaryosu / Diyalog / Tablo / Deney düzeneği (Stimulus) */}
                          {q.stimulus && (
                            <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3 text-xs sm:text-[13px] text-slate-800 whitespace-pre-line leading-relaxed">
                              <div className="text-[10px] font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                                <Layers className="w-3 h-3 text-amber-700 shrink-0" />
                                <span>{q.commonStimulus ? 'Ortak Kaynak Metin / Durum Senaryosu:' : 'Durum Senaryosu / Metin:'}</span>
                              </div>
                              <div className="font-medium pl-1 border-l-2 border-amber-300">
                                <MathRenderer content={q.stimulus} />
                              </div>
                            </div>
                          )}

                          {/* Context Metni varsa */}
                          {q.contextText && (
                            <div className="text-xs sm:text-[12.5px] text-slate-600 italic bg-slate-50 p-2.5 rounded-lg border-l-3 border-slate-300">
                              <MathRenderer content={q.contextText} />
                            </div>
                          )}

                          {/* Ana Soru Metni */}
                          <div className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed pt-0.5 pl-0.5">
                            <MathRenderer content={q.questionText} />
                          </div>
                        </div>

                        {/* 5. BENİM CEVABIM: Öğrencinin Verdiği Yanıt */}
                        <div className="text-xs text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200 space-y-1.5 shadow-2xs">
                          <div className="flex items-center justify-between">
                            <strong className="block text-slate-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                              <span className="text-indigo-600">✍️</span> Benim Cevabım:
                            </strong>
                            {hasValidAnswer && (
                              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                Yanıtlandı
                              </span>
                            )}
                          </div>
                          {hasValidAnswer ? (
                            <div className="whitespace-pre-line font-medium text-slate-800 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                              <MathRenderer content={rawAnswer} />
                            </div>
                          ) : isCompletelyEmpty ? (
                            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 italic text-slate-400">
                              Bu soru için yanıt yazılmadı (Boş bırakıldı).
                            </div>
                          ) : (
                            <div className="space-y-1.5">
                              <div className="whitespace-pre-line font-medium text-slate-600 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200">
                                <MathRenderer content={rawAnswer} />
                              </div>
                              <p className="text-[11px] text-amber-800 font-medium flex items-center">
                                <span>⚠️ Yanıtınız öz değerlendirme için çok kısa veya anlamsız (tek harf/sembol yerine en az 2 karakter, anlamlı açıklama veya işlem basamağı beklenmektedir).</span>
                              </p>
                            </div>
                          )}
                        </div>

                        {/* 6. MODEL CEVAP: Model Çözüm & Gerekçe */}
                        <div className="text-xs text-emerald-950 bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200 space-y-2">
                          <strong className="block text-emerald-900 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <span className="text-emerald-700">🎯</span> {isQuestionFromMeb(q) ? 'MEB ÖDSGM Model Cevap & Gerekçe:' : 'OYSS Model Cevap & Gerekçe:'}
                          </strong>
                          <div className="whitespace-pre-line font-medium text-slate-800 bg-white p-3 rounded-lg border border-emerald-100 leading-relaxed">
                            <MathRenderer content={q.modelAnswer} />
                          </div>

                          {/* Alternatif Cevaplar */}
                          {q.alternativeAnswers && q.alternativeAnswers.length > 0 && (
                            <div className="text-xs text-slate-700 bg-emerald-50/40 p-2.5 rounded-lg border border-emerald-200/80 space-y-1">
                              <strong className="block text-emerald-900 text-[11px] font-bold">
                                Kabul Edilebilir Diğer Örnek Yanıtlar:
                              </strong>
                              <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1 text-[11.5px]">
                                {q.alternativeAnswers.map((alt, aIdx) => (
                                  <li key={aIdx} className="leading-relaxed">
                                    <MathRenderer content={alt} />
                                  </li>
                                ))}
                              </ul>
                              <p className="text-[10px] text-slate-500 italic pt-0.5">
                                * Kendi cevabınız yukarıdaki örneklerle aynı anlama veya kavrama ulaşıyorsa doğru kabul edebilirsiniz.
                              </p>
                            </div>
                          )}

                          {/* Çözüm Adımları Açıklaması */}
                          {q.solutionExplanation && (
                            <div className="bg-white/90 p-2.5 rounded-lg border border-emerald-100 text-slate-700 text-xs">
                              <strong className="block text-indigo-900 mb-0.5 font-bold">Çözüm Adımları Açıklaması:</strong>
                              <p className="whitespace-pre-line leading-relaxed">{q.solutionExplanation}</p>
                            </div>
                          )}
                        </div>

                        {/* 7. ÖZ DEĞERLENDİRME: Genel Kanaat & Analitik Rubrik Ölçütleri */}
                        {hasValidAnswer ? (
                          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                            <div className="flex flex-wrap items-center justify-between gap-1.5">
                              <strong className="text-slate-800 text-xs font-bold flex items-center">
                                <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold inline-flex items-center justify-center mr-1.5">1</span>
                                Genel Kanaatin: Cevabının ne kadar doğru olduğunu düşünüyorsun?
                              </strong>
                              {ans?.generalSelfEvaluation && (
                                <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
                                  Seçim: {GENERAL_SELF_EVAL_OPTIONS.find(o => o.key === ans.generalSelfEvaluation)?.label}
                                </span>
                              )}
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-0.5">
                              {GENERAL_SELF_EVAL_OPTIONS.map(opt => {
                                const isSelected = ans?.generalSelfEvaluation === opt.key;
                                return (
                                  <button
                                    key={opt.key}
                                    type="button"
                                    onClick={() => handleSetGeneralSelfEvaluation(opt.key, num)}
                                    className={`px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                                      isSelected
                                        ? opt.activeClasses
                                        : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                                    }`}
                                  >
                                    {opt.label}
                                  </button>
                                );
                              })}
                            </div>
                            <p className="text-[10px] text-slate-500 italic">
                              * Bu seçim senin kişisel kanaatindir; doğrudan puan üretmez ve aşağıdaki rubrik puanını değiştirmez.
                            </p>
                          </div>
                        ) : (
                          <div className="p-3 bg-slate-100/80 border border-slate-200 rounded-xl text-xs text-slate-500 flex items-center justify-between">
                            <span>
                              {isCompletelyEmpty 
                                ? 'Bu soru için yanıt yazılmadığından genel öz değerlendirme yapılamaz.' 
                                : 'Yeterli bir yanıt girilmediğinden (tek harf veya sembol) genel öz değerlendirme yapılamaz.'}
                            </span>
                          </div>
                        )}

                        {/* Rubrik Bazlı Ayrıntılı Öz Değerlendirme */}
                        <div className="text-xs space-y-2 pt-1">
                          <div className="flex flex-wrap items-center justify-between gap-1.5">
                            <strong className="text-slate-800 text-xs font-bold flex items-center">
                              <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold inline-flex items-center justify-center mr-1.5">2</span>
                              Analitik Rubrik Ölçütleri:
                            </strong>
                            {hasValidAnswer && (
                              <div className="flex items-center space-x-1.5 text-[11px]">
                                <button
                                  type="button"
                                  onClick={() => handleSetAllCriteria(true, num)}
                                  className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-semibold cursor-pointer"
                                >
                                  Tümünü Karşıladım
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleSetAllCriteria(false, num)}
                                  className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 font-semibold cursor-pointer"
                                >
                                  Temizle
                                </button>
                              </div>
                            )}
                          </div>

                          {hasValidAnswer ? (
                            <div className="space-y-1">
                              {q.rubric.map((r, rIdx) => {
                                const isMet = checked.includes(rIdx);
                                return (
                                  <button 
                                    key={rIdx} 
                                    type="button"
                                    onClick={() => handleToggleRubricCriterion(rIdx, num)}
                                    className={`w-full text-left flex items-center justify-between p-2 rounded-lg border text-[11px] transition-colors cursor-pointer ${
                                      isMet
                                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-semibold shadow-2xs'
                                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                    }`}
                                  >
                                    <span className="flex items-center">
                                      {isMet ? (
                                        <CheckSquare className="w-3.5 h-3.5 text-emerald-600 mr-1.5 shrink-0" />
                                      ) : (
                                        <Square className="w-3.5 h-3.5 text-slate-300 mr-1.5 shrink-0" />
                                      )}
                                      {r.criterion}
                                    </span>
                                    <span className={isMet ? 'text-emerald-700 font-bold' : 'text-slate-400 font-medium'}>
                                      {isMet ? `+${r.points} p` : `0 / ${r.points} p`}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="p-2.5 rounded-lg bg-slate-100/70 border border-slate-200 text-[11px] text-slate-500 italic flex items-center justify-between">
                              <span>
                                {isCompletelyEmpty 
                                  ? 'Bu soruya henüz yanıt yazılmadığı için rubrik öz değerlendirmesi yapılamaz (0 puan).'
                                  : 'Cevabınız çok kısa veya eksik olduğu için rubrik öz değerlendirmesi yapılamaz (0 puan).'}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveQuestionIndex(idx);
                                  setSession(prev => ({ ...prev, isCompleted: false }));
                                }}
                                className="ml-2 font-bold text-indigo-600 hover:underline not-italic cursor-pointer shrink-0"
                              >
                                {isCompletelyEmpty ? 'Cevap Yaz →' : 'Cevabı Tamamla →'}
                              </button>
                            </div>
                          )}
                        </div>

                        {/* 8. NEREDEN ÇALIŞMALIYIM? (Ders Kitabı Kaynak Kartı) */}
                        <TextbookSourceCard
                          outcomeCode={q.outcomeCode}
                          grade={examPaper.grade}
                          onOpenStudySheet={onOpenStudySheet ? handleRequestOpenStudySheet : undefined}
                        />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={() => {
                setActiveQuestionIndex(0);
                setSession(prev => ({ ...prev, isCompleted: false }));
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              ← Soruları Tekrar Çöz / Düzenle
            </button>
            <button
              onClick={onBackToPaperView}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              Sınav Kâğıdına (A4) Dön
            </button>
          </div>
        </div>
      ) : (
        /* ======================== ACTIVE QUESTION SOLVING VIEW ======================== */
        currentQ && (
          <div className="space-y-5 animate-in fade-in duration-150">
            
            {/* Question Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
              
              {/* Question Header: Number, Outcome, Difficulty, Points */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-150 pb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-slate-900 text-white font-black text-sm flex items-center justify-center shrink-0">
                    {qNum}
                  </span>
                  
                  {/* Outcome Badge */}
                  <span className="text-xs font-semibold text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                    <strong className="font-mono text-indigo-700 mr-1">[{currentQ.outcomeCode}]</strong>
                    <span>{formatOutcomeBadgeTitle(currentQ.outcomeTitle, currentQ.outcomeCode) || currentQ.outcomeTitle}</span>
                  </span>

                  {/* Difficulty */}
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                    currentQ.difficulty === 'Zor'
                      ? 'bg-purple-100 text-purple-900 border border-purple-200'
                      : currentQ.difficulty === 'Kolay'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                      : 'bg-blue-100 text-blue-900 border border-blue-200'
                  }`}>
                    {currentQ.difficulty || 'Orta'}
                  </span>

                  {currentQ.archetype && (
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full">
                      ★ {currentQ.archetype}
                    </span>
                  )}

                  {/* Soru Kaynak Kökeni Rozeti */}
                  {currentQ.sourceOrigin && (
                    (() => {
                      const sBadge = getQuestionSourceBadge(currentQ.sourceOrigin, currentQ.originExamTitle, currentQ.originQuestionNumber);
                      return (
                        <span 
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${sBadge.badgeClass}`}
                          title={sBadge.tooltip}
                        >
                          {sBadge.label}
                        </span>
                      );
                    })()
                  )}
                </div>

                <div className="text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg">
                  {currentQ.points} Puan
                </div>
              </div>

              {/* Special Stimulus (Table, Dialogue, Scenario, Experiment) */}
              {currentQ.stimulus && (
                <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed shadow-2xs">
                  <div className="text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span className="flex items-center">
                      <Layers className="w-3.5 h-3.5 mr-1 text-amber-700" />
                      {currentQ.commonStimulus ? 'Ortak Kaynak Metin / Durum Senaryosu:' : 'Durum Senaryosu / Öğrenci Diyaloğu:'}
                    </span>
                    {currentQ.commonStimulus && (
                      <span className="text-[10px] bg-amber-200/80 text-amber-900 font-bold px-2 py-0.5 rounded">
                        ★ Ortak Materyal
                      </span>
                    )}
                  </div>
                  <div className="font-medium text-slate-800 pl-1 border-l-2 border-amber-300">
                    <MathRenderer content={currentQ.stimulus} />
                  </div>
                </div>
              )}

              {/* Missing Source Material Warning Banner */}
              {currentQ.hasMissingSourceError && (
                <div className="bg-rose-50 border border-rose-300 rounded-xl p-4 text-xs sm:text-sm text-rose-950 flex items-start space-x-3 shadow-2xs">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="block text-rose-900 font-bold text-xs uppercase tracking-wide">
                      Kaynak Materyal Eksikliği Bildirimi:
                    </strong>
                    <p className="leading-relaxed font-medium">
                      {currentQ.sourceValidationError || 'Bu soru bir kaynak metne/tabloya dayanmaktadır ancak sınavda kaynak materyal bulunamamıştır. Öğrencinin mağduriyet yaşamaması için bu soru için cevaplama ve öz değerlendirme kilitlenmiştir.'}
                    </p>
                    <span className="text-[11px] text-rose-700 block font-semibold pt-0.5">
                      * Sınavın diğer geçerli sorularını çözmeye devam edebilirsiniz.
                    </span>
                  </div>
                </div>
              )}

              {/* Context Text if any */}
              {currentQ.contextText && (
                <div className="text-xs sm:text-sm text-slate-600 italic bg-slate-50 p-3 rounded-lg border-l-4 border-slate-400">
                  <MathRenderer content={currentQ.contextText} />
                </div>
              )}

              {/* Main Question Text */}
              <div className="text-sm sm:text-base font-bold text-slate-900 pl-1">
                <span className="text-indigo-600 mr-2">Soru {qNum}:</span>
                <MathRenderer content={currentQ.questionText} />
              </div>

              {/* Soru Matematiksel Görsel Modeli (FAZ 2B) */}
              {currentQ.visual && (
                <div className="my-3">
                  <QuestionVisualView visual={currentQ.visual} />
                </div>
              )}

              {/* Student Response Editor with Math and Live Preview Support */}
              <div className="pt-2">
                {currentQ.hasMissingSourceError ? (
                  <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-500 italic text-center">
                    Bu sorunun dayandığı kaynak materyal eksik olduğu için cevap alanı ve öz değerlendirme devre dışı bırakılmıştır.
                  </div>
                ) : (
                  <MathAnswerEditor
                    value={currentAnswerData.studentAnswer}
                    onChange={handleAnswerTextChange}
                    questionNumber={qNum}
                    subjectId={examPaper.subjectId}
                    placeholder="Cevabınızı, analitik gerekçelerinizi ve işlem basamaklarınızı buraya yazınız..."
                    rows={5}
                  />
                )}
              </div>

              {/* Immediate Feedback & Self-Assessment Box */}
              {session.feedbackMode === 'immediate' && !currentQ.hasMissingSourceError && (
                !hasStudentAnswer ? (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 flex items-center justify-between">
                      <span className="flex items-center">
                        <HelpCircle className="w-4 h-4 mr-2 text-slate-400 shrink-0" />
                        {currentAnswerData.studentAnswer.trim().length > 0 ? (
                          <span>
                            Model cevabı ve rubrik öz değerlendirmesini açmak için lütfen yanıtınızı tamamlayınız (tek harf veya sembol yerine çözümünüzü veya işlem basamaklarınızı yazınız, en az 2 karakter).
                          </span>
                        ) : (
                          <span>
                            Model cevabı, çözüm adımlarını ve rubrik öz değerlendirmesini açmak için lütfen önce cevabınızı yazınız.
                          </span>
                        )}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0 ml-2">
                        Anında Geri Bildirim Modu
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setRevealedQuestions(prev => ({ ...prev, [qNum]: !isEvaluationRevealed }))}
                      className="inline-flex items-center px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 transition-colors cursor-pointer shadow-2xs"
                    >
                      <Eye className="w-4 h-4 mr-1.5 text-indigo-600" />
                      {isEvaluationRevealed ? 'Model Cevap ve Rubriği Gizle' : 'Model Cevap ve Rubriği İncele (Öz Değerlendirme)'}
                    </button>

                    {isEvaluationRevealed && (
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="text-slate-500 text-[11px]">Hızlı İşaretle:</span>
                        <button
                          type="button"
                          onClick={() => handleSetAllCriteria(true)}
                          className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-semibold text-[11px] cursor-pointer"
                        >
                          Tümünü Karşıladım
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSetAllCriteria(false)}
                          className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 font-semibold text-[11px] cursor-pointer"
                        >
                          Temizle
                        </button>
                      </div>
                    )}
                  </div>

                  {isEvaluationRevealed && (
                    <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 sm:p-5 space-y-4 text-xs">
                      
                      {/* Notice Badge with Age-Appropriate Guidance */}
                      <div className="bg-white/90 border border-emerald-200 p-3 rounded-xl text-emerald-950 text-xs flex items-start space-x-2.5 shadow-2xs">
                        <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <strong className="block text-emerald-900 font-bold">Öz Değerlendirme Rehberi:</strong>
                          <p className="leading-relaxed text-emerald-900/90 font-medium text-[11px] sm:text-xs">
                            Önce cevabını model cevapla karşılaştır. Sonra cevabının ne kadar doğru olduğunu düşündüğünü seç. Ardından aşağıdaki ölçütleri tek tek inceleyerek karşıladıklarını işaretle. Bir sorunun bazı bölümlerini doğru yapmış olabilirsin. Kendini dürüstçe değerlendirmen öğrenmene yardımcı olur.
                          </p>
                          <span className="text-[10px] text-emerald-700 block font-semibold pt-0.5">
                            * Bu puan senin kendi öz değerlendirmendir; öğretmen tarafından verilmiş resmî bir not değildir.
                          </span>
                        </div>
                      </div>

                      {/* Official / Generated Model Answer */}
                      <div className="bg-white p-3.5 rounded-xl border border-emerald-100 space-y-1">
                        <span className="font-bold text-emerald-900 block text-xs">
                          {isQuestionFromMeb(currentQ) ? 'MEB ÖDSGM Model Cevap & Gerekçe:' : 'OYSS Model Cevap & Gerekçe:'}
                        </span>
                        <div className="whitespace-pre-line font-medium text-slate-800 leading-relaxed">
                          <MathRenderer content={currentQ.modelAnswer} />
                        </div>
                      </div>

                      {/* Alternative Acceptable Answers */}
                      {currentQ.alternativeAnswers && currentQ.alternativeAnswers.length > 0 && (
                        <div className="bg-emerald-50/40 p-3 rounded-xl border border-emerald-200/80 space-y-1 text-xs">
                          <strong className="block text-emerald-900 text-[11px] font-bold">
                            Kabul Edilebilir Diğer Örnek Yanıtlar:
                          </strong>
                          <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1 text-[11.5px]">
                            {currentQ.alternativeAnswers.map((alt, aIdx) => (
                              <li key={aIdx} className="leading-relaxed">
                                <MathRenderer content={alt} />
                              </li>
                            ))}
                          </ul>
                          <p className="text-[10px] text-slate-500 italic pt-0.5">
                            * Kendi cevabınız yukarıdaki örneklerle aynı anlama veya kavrama ulaşıyorsa doğru kabul edebilirsiniz.
                          </p>
                        </div>
                      )}

                      {/* Solution Explanation if present */}
                      {currentQ.solutionExplanation && (
                        <div className="bg-white/80 p-3 rounded-lg border border-emerald-100 text-slate-700">
                          <strong className="block text-emerald-800 mb-0.5 font-bold">Çözüm Adımları Açıklaması:</strong>
                          <p className="whitespace-pre-line">{currentQ.solutionExplanation}</p>
                        </div>
                      )}

                      {/* 1. Genel Öz Değerlendirme Kanaati */}
                      <div className="bg-white p-3.5 rounded-xl border border-emerald-100 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-1.5">
                          <strong className="text-slate-800 text-xs font-bold flex items-center">
                            <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold inline-flex items-center justify-center mr-1.5">1</span>
                            Genel Kanaatin: Cevabının ne kadar doğru olduğunu düşünüyorsun?
                          </strong>
                          {currentAnswerData.generalSelfEvaluation && (
                            <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
                              Seçim: {GENERAL_SELF_EVAL_OPTIONS.find(o => o.key === currentAnswerData.generalSelfEvaluation)?.label}
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-0.5">
                          {GENERAL_SELF_EVAL_OPTIONS.map(opt => {
                            const isSelected = currentAnswerData.generalSelfEvaluation === opt.key;
                            return (
                              <button
                                key={opt.key}
                                type="button"
                                onClick={() => handleSetGeneralSelfEvaluation(opt.key, qNum)}
                                className={`px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                                  isSelected
                                    ? opt.activeClasses
                                    : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                                }`}
                              >
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                        <p className="text-[10px] text-slate-500 italic">
                          * Bu seçim senin kişisel kanaatindir; doğrudan puan üretmez ve aşağıdaki rubrik puanını değiştirmez.
                        </p>
                      </div>

                      {/* 2. Interactive Rubric Checklist */}
                      <div className="space-y-2 pt-1">
                        <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs">
                          <span className="font-bold text-slate-800 flex items-center">
                            <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold inline-flex items-center justify-center mr-1.5">2</span>
                            Analitik Rubrik Ölçütlerini İşaretleyiniz:
                          </span>
                          <span className="text-emerald-900 font-black">
                            Öz Değerlendirme Puanı: {currentAnswerData.earnedPoints} / {currentQ.points} p
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          {currentQ.rubric.map((r, rIdx) => {
                            const isChecked = currentAnswerData.checkedCriteriaIndices?.includes(rIdx);
                            return (
                              <button
                                key={rIdx}
                                type="button"
                                onClick={() => handleToggleRubricCriterion(rIdx)}
                                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                                  isChecked
                                    ? 'bg-emerald-100/90 border-emerald-300 text-emerald-950 font-bold shadow-2xs'
                                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                                }`}
                              >
                                <span className="flex items-center space-x-2.5">
                                  {isChecked ? (
                                    <CheckSquare className="w-4 h-4 text-emerald-700 shrink-0" />
                                  ) : (
                                    <Square className="w-4 h-4 text-slate-300 shrink-0" />
                                  )}
                                  <span className="text-xs leading-snug">{r.criterion}</span>
                                </span>
                                <span className={`text-xs ml-2 shrink-0 ${
                                  isChecked ? 'text-emerald-800 font-black' : 'text-slate-400 font-semibold'
                                }`}>
                                  +{r.points} p
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Ders Kitabı Kaynak Kartı (FAZ 3.2.3) */}
                      <TextbookSourceCard
                        outcomeCode={currentQ.outcomeCode}
                        grade={examPaper.grade}
                        onOpenStudySheet={onOpenStudySheet ? handleRequestOpenStudySheet : undefined}
                      />
                    </div>
                  )}
                </div>
                )
              )}

              {/* Sınav Sonu Modu: Soru çözerken model cevap ve rubrik tamamen gizlidir */}
              {session.feedbackMode === 'end_of_exam' && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 flex items-center justify-between">
                    <span className="flex items-center">
                      <HelpCircle className="w-4 h-4 mr-2 text-slate-400 shrink-0" />
                      Sınav sonu geri bildirim modundasınız. Model cevaplar ve rubrik öz değerlendirmesi sınavı bitirdiğinizde açılacaktır.
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline bg-white px-2 py-0.5 rounded border border-slate-200">
                      Sınav Sonu Modu
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Question Navigation Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button
                onClick={() => setActiveQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={activeQuestionIndex === 0}
                className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all disabled:opacity-40 cursor-pointer inline-flex items-center"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                Önceki Soru
              </button>

              <div className="text-xs text-slate-500 font-medium">
                Soru <strong>{activeQuestionIndex + 1}</strong> / {totalQuestions}
              </div>

              {activeQuestionIndex < totalQuestions - 1 ? (
                <button
                  onClick={() => setActiveQuestionIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer inline-flex items-center"
                >
                  Sonraki Soru
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </button>
              ) : (
                <button
                  onClick={handleCompleteExam}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer inline-flex items-center"
                >
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  Sınavı Bitir ve Öz Değerlendir
                </button>
              )}
            </div>
          </div>
        )
      )}

      {/* Çalışma Föyüne Geçiş Onay Penceresi (FAZ 3.2.4) */}
      {isStudySheetConfirmModalOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="study-sheet-confirm-title"
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
          onClick={handleCancelOpenStudySheet}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <button
                type="button"
                onClick={handleCancelOpenStudySheet}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 id="study-sheet-confirm-title" className="text-base font-bold text-slate-900">
                Çalışma Föyüne Geçiş Onayı
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Çalışma föyünü açmak üzeresiniz. Bu işlemden sonra sınav ekranından ayrılacaksınız. Devam etmek istiyor musunuz?
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Veri Güvenliği:</span>
              </div>
              <p className="text-[11.5px] leading-relaxed">
                {session.isCompleted 
                  ? 'Sınav ve öz değerlendirme sonuçlarınız tarayıcınıza kaydedilmiştir. Dilediğiniz zaman bu ekrana geri dönebilirsiniz.'
                  : 'Sınav cevaplarınız tarayıcınıza otomatik kaydedilmektedir. Sınav kâğıdına veya etkileşimli çözüme döndüğünüzde kaldığınız yerden devam edebilirsiniz.'}
              </p>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleCancelOpenStudySheet}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors cursor-pointer text-center"
              >
                Sınavda Kal
              </button>
              <button
                type="button"
                onClick={handleConfirmOpenStudySheet}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Sınavdan Ayrıl ve Çalışma Föyünü Aç</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
