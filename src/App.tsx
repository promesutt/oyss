import React, { useState, useMemo, useEffect } from 'react';
import { 
  GradeLevel, 
  SubjectId, 
  ExamTerm, 
  MaterialType, 
  ExamPaper,
  ExamQuestion,
  StudySheet,
  StudySheetSection,
  InfographicItem,
  SpeakingGuide,
  SchoolStage
} from './types';
import { 
  ALL_SUBJECTS,
  ALL_GRADES,
  getScenarios
} from './data/curriculumData';
import { SAMPLE_EXAMS } from './data/sampleExams';
import { SAMPLE_STUDY_SHEETS } from './data/studySheets';
import { OUTCOME_STUDY_BANK } from './data/outcomeStudyBank';
import { SAMPLE_INFOGRAPHICS } from './data/infographics';
import { SAMPLE_SPEAKING_GUIDES } from './data/speakingGuides';

import { Navbar } from './components/Navbar';
import { FilterBar } from './components/FilterBar';
import { ExamPaperView } from './components/ExamPaperView';
import { StudySheetView } from './components/StudySheetView';
import { InfographicView } from './components/InfographicView';
import { SpeakingGuideView } from './components/SpeakingGuideView';
import { AIGeneratorModal } from './components/AIGeneratorModal';
import { OfficialSourcesModal } from './components/OfficialSourcesModal';
import { FeedbackModal } from './components/FeedbackModal';
import { InteractivePracticeView } from './components/InteractivePracticeView';
import { loadCustomExamPaper, clearCustomExamPaper } from './utils/practiceStorage';
import { validateAndEnrichExamQuestions } from './utils/sourceMaterialValidator';
import { 
  BookOpen, 
  Mic, 
  Sparkles, 
  AlertCircle, 
  ArrowRight, 
  RotateCcw, 
  FileText 
} from 'lucide-react';

export const App: React.FC = () => {
  // Navigation / Filter State (Default: 5. Sınıf Türkçe Senaryo 1 Sınav Kağıdı)
  const [currentStage, setCurrentStage] = useState<SchoolStage>('ortaokul');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(5);
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('turkce');
  const [selectedTerm, setSelectedTerm] = useState<ExamTerm>('1_donem_1_yazili');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('senaryo_1');
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>('exam_paper');
  const [customExamPaper, setCustomExamPaper] = useState<ExamPaper | null>(() => {
    return loadCustomExamPaper(5, 'turkce');
  });

  // Sync saved custom AI exam for the active grade, subject & scenario
  useEffect(() => {
    const saved = loadCustomExamPaper(selectedGrade, selectedSubject);
    if (saved && saved.scenarioId === selectedScenarioId) {
      setCustomExamPaper(saved);
    }
  }, [selectedGrade, selectedSubject, selectedScenarioId]);

  // Modal States
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);
  const [isSourcesModalOpen, setIsSourcesModalOpen] = useState<boolean>(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState<boolean>(false);

  // Stage Switch Handler (Ortaokul <-> Lise)
  const handleSelectStage = (stage: SchoolStage) => {
    setCurrentStage(stage);
    if (stage === 'ortaokul') {
      setSelectedGrade(5);
      setSelectedSubject('turkce');
      setSelectedScenarioId('senaryo_1');
    } else {
      setSelectedGrade(9);
      setSelectedSubject('turk_dili_edebiyati');
      setSelectedScenarioId('senaryo_1');
    }
  };

  // Dynamic scenarios for the selected subject and grade
  const scenarios = useMemo(() => {
    return getScenarios(selectedSubject, selectedGrade, selectedTerm);
  }, [selectedSubject, selectedGrade, selectedTerm]);

  // Ensure valid scenario selection when switching subject or grade
  const currentScenario = useMemo(() => {
    const found = scenarios.find(s => s.id === selectedScenarioId);
    if (found) return found;
    return scenarios[0];
  }, [scenarios, selectedScenarioId]);

  const currentSubjectMeta = useMemo(() => {
    return ALL_SUBJECTS.find(s => s.id === selectedSubject);
  }, [selectedSubject]);

  // Subject change handler
  const handleSelectSubject = (subjectId: SubjectId) => {
    setSelectedSubject(subjectId);
    setCustomExamPaper(null);
    const newScenarios = getScenarios(subjectId, selectedGrade, selectedTerm);
    setSelectedScenarioId(newScenarios[0]?.id || 'senaryo_1');

    // If currently on speaking guide but subject has no listening/speaking, switch to exam
    const subMeta = ALL_SUBJECTS.find(s => s.id === subjectId);
    if (!subMeta?.hasListeningSpeaking && selectedMaterial === 'speaking_guide') {
      setSelectedMaterial('exam_paper');
    }
  };

  // Grade change handler
  const handleSelectGrade = (grade: GradeLevel) => {
    setSelectedGrade(grade);
    setCustomExamPaper(null);
    const gradeObj = ALL_GRADES.find(g => g.level === grade);
    if (gradeObj && gradeObj.stage !== currentStage) {
      setCurrentStage(gradeObj.stage);
    }
    const newScenarios = getScenarios(selectedSubject, grade, selectedTerm);
    setSelectedScenarioId(newScenarios[0]?.id || 'senaryo_1');
  };

  // Term change handler
  const handleSelectTerm = (term: ExamTerm) => {
    setSelectedTerm(term);
    setCustomExamPaper(null);
    const newScenarios = getScenarios(selectedSubject, selectedGrade, term);
    setSelectedScenarioId(newScenarios[0]?.id || 'senaryo_1');
  };

  // Scenario change handler
  const handleSelectScenario = (scenarioId: string) => {
    setSelectedScenarioId(scenarioId);
    setCustomExamPaper(null);
  };

  // Universal MEBİ Question Synthesis for ANY grade, subject, and scenario
  // Active Exam Paper: Prioritize verified teacher-curated sample exam
  const activeExamPaper: ExamPaper | null = useMemo(() => {
    // 1. If a custom AI generated exam paper is active for this grade and subject, show it directly!
    if (customExamPaper && 
        customExamPaper.grade === selectedGrade && 
        customExamPaper.subjectId === selectedSubject) {
      const { enrichedQuestions } = validateAndEnrichExamQuestions(customExamPaper.questions);
      return {
        ...customExamPaper,
        questions: enrichedQuestions as ExamQuestion[]
      };
    }

    // 2. Direct match in verified teacher-curated repository
    const match = SAMPLE_EXAMS.find(
      e => e.grade === selectedGrade && 
           e.subjectId === selectedSubject && 
           e.examTerm === selectedTerm && 
           e.scenarioId === currentScenario.id
    );

    if (match) {
      const { enrichedQuestions } = validateAndEnrichExamQuestions(match.questions);
      return {
        ...match,
        questions: enrichedQuestions as ExamQuestion[]
      };
    }

    // Do NOT silently borrow questions from another scenario
    // Do NOT generate fake robotic placeholder templates disguised as official exams
    return null;
  }, [customExamPaper, selectedGrade, selectedSubject, selectedTerm, currentScenario]);

  // Active Study Sheet - Powered by 100% Curriculum-Aligned Pedagogical OUTCOME_STUDY_BANK
  const activeStudySheet: StudySheet = useMemo(() => {
    const subMeta = ALL_SUBJECTS.find(s => s.id === selectedSubject);
    const subjectName = (selectedSubject === 'sosyal_bilgiler' && selectedGrade === 8)
      ? 'T.C. İnkılap Tarihi ve Atatürkçülük'
      : (subMeta ? subMeta.name : 'Ders');

    // Filter unique outcomes in this scenario to provide clean, comprehensive study sections
    const seenCodes = new Set<string>();
    const uniqueDistributions = currentScenario.distributions.filter((d) => {
      if (seenCodes.has(d.outcomeCode)) return false;
      seenCodes.add(d.outcomeCode);
      return true;
    });

    const sections: StudySheetSection[] = uniqueDistributions.map((d) => {
      // 1. Direct match in OUTCOME_STUDY_BANK
      if (OUTCOME_STUDY_BANK[d.outcomeCode]) {
        return OUTCOME_STUDY_BANK[d.outcomeCode];
      }

      // 2. Trimmed / alias match
      const cleaned = d.outcomeCode.trim();
      if (OUTCOME_STUDY_BANK[cleaned]) {
        return OUTCOME_STUDY_BANK[cleaned];
      }

      // 3. Normalized dot prefix match if any
      const matchKey = Object.keys(OUTCOME_STUDY_BANK).find(k => k.toLowerCase() === cleaned.toLowerCase());
      if (matchKey) {
        return OUTCOME_STUDY_BANK[matchKey];
      }

      // 4. Fallback from SAMPLE_STUDY_SHEETS
      const sampleMatch = SAMPLE_STUDY_SHEETS.find(
        s => s.grade === selectedGrade && s.subjectId === selectedSubject
      );
      const sectionMatch = sampleMatch?.sections.find(sec => sec.outcomeCode === d.outcomeCode);
      if (sectionMatch) {
        return sectionMatch;
      }

      const cleanTitle = d.notes 
        ? (d.notes.toLowerCase().includes(subjectName.toLowerCase()) ? d.notes : `${subjectName} - ${d.notes}`)
        : `${subjectName} - ${d.outcomeCode}`;

      return {
        outcomeCode: d.outcomeCode,
        topicTitle: cleanTitle,
        quickNotes: [
          `${subjectName} dersi ${d.outcomeCode} öğrenme çıktısında kavramlar arası neden-sonuç bağını kurunuz.`,
          'Açık uçlu sorularda doğrudan ezber tanım yerine verilen öncülü ve vaka durumunu gerekçelendiriniz.'
        ],
        examTraps: [
          'Sorudaki anahtar kavramları ve soru kökündeki olumsuz/koşullu yönergeleri dikkatle okuyunuz.'
        ],
        solvedExample: {
          question: `${d.notes || d.outcomeCode} ile ilgili açık uçlu model soru ve analizi.`,
          analysis: 'Kavramsal analizi adım adım kurma.',
          solution: 'Model çözüm basamakları eksiksiz gerekçelendirilir.'
        },
        practiceQuestion: {
          question: 'Bu öğrenme çıktısıyla ilgili açık uçlu pekiştirme sorusu.',
          hint: 'Verilen ipuçlarını ve ders içi temel kavramları göz önünde bulundurunuz.'
        }
      };
    });

    return {
      id: `study_${selectedSubject}_${selectedGrade}_${currentScenario.id}`,
      grade: selectedGrade,
      subjectId: selectedSubject,
      examTerm: selectedTerm,
      scenarioId: currentScenario.id,
      title: `${selectedGrade}. Sınıf ${subjectName} (${currentScenario.name}) TYMM Kapsamlı Sınav Çalışma Kağıdı`,
      sections
    };
  }, [selectedGrade, selectedSubject, selectedTerm, currentScenario]);

  // Active Infographics: Return verified items only (empty state handles missing items)
  const activeInfographics: InfographicItem[] = useMemo(() => {
    return SAMPLE_INFOGRAPHICS.filter(
      i => i.grade === selectedGrade && i.subjectId === selectedSubject
    );
  }, [selectedGrade, selectedSubject]);

  // Active Speaking Guide (for Language subjects)
  const activeSpeakingGuide: SpeakingGuide | undefined = useMemo(() => {
    return SAMPLE_SPEAKING_GUIDES.find(
      g => g.grade === selectedGrade && g.subjectId === selectedSubject
    );
  }, [selectedGrade, selectedSubject]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Navigation */}
      <Navbar
        onOpenAIModal={() => setIsAIModalOpen(true)}
        onOpenSourcesModal={() => setIsSourcesModalOpen(true)}
        onOpenFeedbackModal={() => setIsFeedbackModalOpen(true)}
        onPrint={() => window.print()}
      />

      {/* Main Filter Bar */}
      <FilterBar
        currentStage={currentStage}
        onSelectStage={handleSelectStage}
        selectedGrade={selectedGrade}
        onSelectGrade={handleSelectGrade}
        selectedSubject={selectedSubject}
        onSelectSubject={handleSelectSubject}
        selectedTerm={selectedTerm}
        onSelectTerm={handleSelectTerm}
        scenarios={scenarios}
        selectedScenarioId={currentScenario.id}
        onSelectScenario={handleSelectScenario}
        selectedMaterial={selectedMaterial}
        onSelectMaterial={setSelectedMaterial}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {selectedMaterial === 'exam_paper' && (
          activeExamPaper ? (
            <ExamPaperView 
              examPaper={activeExamPaper}
              isCustomAIExam={Boolean(customExamPaper && activeExamPaper.id === customExamPaper.id)}
              onResetToDefaultExam={() => {
                clearCustomExamPaper(selectedGrade, selectedSubject);
                setCustomExamPaper(null);
              }}
              onOpenAIGenerator={() => setIsAIModalOpen(true)}
              onOpenInteractivePractice={() => setSelectedMaterial('interactive_exam')}
            />
          ) : (
            <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 animate-in fade-in duration-200">
              <div className="bg-white rounded-2xl border-2 border-dashed border-amber-200 p-8 sm:p-10 text-center shadow-xs">
                <div className="w-14 h-14 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-center mx-auto mb-4 text-amber-600">
                  <AlertCircle className="w-7 h-7" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold mb-3">
                  ÖDSGM Senaryo Uyumlu Örnek Sınav Hazırlanıyor
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                  {selectedGrade}. Sınıf {currentSubjectMeta?.name || 'Ders'} ({currentScenario?.name || 'Senaryo'}) İçin Hazır Örnek Sınav Bulunamadı
                </h3>
                <p className="text-sm text-slate-600 max-w-xl mx-auto mb-6 leading-relaxed">
                  Bu dönem ve senaryoya ait ÖDSGM senaryo uyumlu örnek sınav kâğıdı henüz sisteme eklenmemiştir. Öğrencileri yanıltmamak adına 
                  başka senaryolardan izinsiz soru ödünç alma veya genel şablonları senaryoya ait gibi gösterme uygulaması kaldırılmıştır.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 max-w-lg mx-auto text-left mb-6">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      1. Dönem 1. Yazılı Arşivi
                    </p>
                    <p className="text-xs text-slate-500 mb-3">
                      Sistemimizde 1. Dönem 1. Yazılı için ÖDSGM konu-soru dağılım tabloları esas alınarak hazırlanmış 123 örnek sınav mevcuttur.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedTerm('1_donem_1_yazili');
                        setSelectedScenarioId('senaryo_1');
                      }}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 cursor-pointer"
                    >
                      1. Dönem 1. Yazılıya Geç <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      Özgün Alıştırma Seti
                    </p>
                    <p className="text-xs text-slate-500 mb-3">
                      Bu senaryonun öğrenme çıktılarına uygun taslak bir çalışma ve alıştırma seti oluşturun.
                    </p>
                    <button
                      onClick={() => setIsAIModalOpen(true)}
                      className="text-xs font-bold text-purple-600 hover:text-purple-700 inline-flex items-center gap-1 cursor-pointer"
                    >
                      Alıştırma Seti Oluştur <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setSelectedMaterial('study_sheet')}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <FileText className="w-4 h-4" />
                    Senaryonun Çalışma Föyünü İncele
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTerm('1_donem_1_yazili');
                      setSelectedScenarioId('senaryo_1');
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Varsayılan Senaryo 1'e Dön
                  </button>
                </div>
              </div>
            </div>
          )
        )}

        {selectedMaterial === 'interactive_exam' && (
          activeExamPaper ? (
            <InteractivePracticeView 
              examPaper={activeExamPaper}
              isCustomAIExam={Boolean(customExamPaper && activeExamPaper.id === customExamPaper.id)}
              onBackToPaperView={() => setSelectedMaterial('exam_paper')}
              onOpenStudySheet={() => setSelectedMaterial('study_sheet')}
            />
          ) : (
            <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 animate-in fade-in duration-200">
              <div className="bg-white rounded-2xl border-2 border-dashed border-amber-200 p-8 sm:p-10 text-center shadow-xs">
                <div className="w-14 h-14 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-center mx-auto mb-4 text-amber-600">
                  <AlertCircle className="w-7 h-7" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                  Etkileşimli Çözüm İçin Sınav Bulunamadı
                </h3>
                <p className="text-sm text-slate-600 max-w-xl mx-auto mb-6">
                  Bu sınıf ve senaryo için hazır sınav bulunmamaktadır. Aşağıdaki butona tıklayarak yapay zekâ ile özgün bir sınav üretebilir ve hemen etkileşimli olarak çözebilirsiniz.
                </p>
                <button
                  onClick={() => setIsAIModalOpen(true)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  Yapay Zekâ ile Özgün Sınav Üret
                </button>
              </div>
            </div>
          )
        )}

        {selectedMaterial === 'study_sheet' && (
          <StudySheetView 
            studySheet={activeStudySheet}
            onOpenAIGenerator={() => setIsAIModalOpen(true)}
          />
        )}

        {selectedMaterial === 'infographic' && (
          <InfographicView 
            infographics={activeInfographics}
          />
        )}

        {selectedMaterial === 'speaking_guide' && (
          activeSpeakingGuide ? (
            <SpeakingGuideView 
              guide={activeSpeakingGuide}
            />
          ) : (
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 animate-in fade-in duration-200">
              <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 text-center shadow-xs">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl border border-indigo-200 flex items-center justify-center mx-auto mb-4 text-indigo-600">
                  <Mic className="w-7 h-7" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                  Konuşma ve Dinleme Kılavuzu Bulunmuyor
                </h3>
                <p className="text-sm text-slate-600 max-w-lg mx-auto mb-6 leading-relaxed">
                  MEB mevzuatına göre 4 temel dil becerisini (dinleme, konuşma, okuma, yazma) içeren uygulama kılavuzları 
                  yalnızca <strong>Türkçe</strong> ve <strong>İngilizce</strong> dersleri için hazırlanmaktadır. 
                  Seçili ders ({currentSubjectMeta?.name || 'Ders'}) için konuşma kılavuzu geçerli değildir.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedSubject('turkce');
                      setSelectedMaterial('speaking_guide');
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    Türkçe Konuşma Kılavuzunu Aç
                  </button>
                  <button
                    onClick={() => setSelectedMaterial('exam_paper')}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Yazılı Sınav Kâğıdına Dön
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </main>

      {/* Modals */}
      <AIGeneratorModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        grade={selectedGrade}
        subjectId={selectedSubject}
        examTerm={selectedTerm}
        scenario={currentScenario}
        onApplyGeneratedExam={(customExam) => {
          setCustomExamPaper(customExam);
          setSelectedMaterial('exam_paper');
          setTimeout(() => {
            window.scrollTo({ top: 120, behavior: 'smooth' });
          }, 80);
        }}
      />

      <OfficialSourcesModal
        isOpen={isSourcesModalOpen}
        onClose={() => setIsSourcesModalOpen(false)}
      />

      {/* User Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        currentContext={`${selectedGrade}. Sınıf ${ALL_SUBJECTS.find(s => s.id === selectedSubject)?.name || ''} (${currentScenario?.name || 'Senaryo'})`}
      />
    </div>
  );
};
