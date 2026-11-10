import React, { useState, useMemo, useEffect } from 'react';
import {
  GradeLevel,
  SubjectId,
  ExamTerm,
  MaterialType,
  ExamPaper,
  StudySheet,
  StudySheetSection,
  InfographicItem,
  SpeakingGuide,
  SchoolStage
} from './types';
import {
  ALL_SUBJECTS,
  ALL_GRADES,
  getScenarios,
  resolveOutcomeMetadata
} from './data/curriculumData';
import { SAMPLE_EXAMS } from './data/sampleExams';
import { SAMPLE_STUDY_SHEETS } from './data/studySheets';
import { OUTCOME_STUDY_BANK } from './data/outcomeStudyBank';
import { SAMPLE_INFOGRAPHICS } from './data/infographics';
import { SAMPLE_SPEAKING_GUIDES } from './data/speakingGuides';

import { Navbar } from './components/Navbar';
import { FilterBar } from './components/FilterBar';
import { ExamPaperView } from './components/ExamPaperView';
import { ScenarioOverviewView } from './components/ScenarioOverviewView';
import { StudySheetView } from './components/StudySheetView';
import { InfographicView } from './components/InfographicView';
import { SpeakingGuideView } from './components/SpeakingGuideView';
import { AIGeneratorModal } from './components/AIGeneratorModal';
import { OfficialSourcesModal } from './components/OfficialSourcesModal';
import { FeedbackModal } from './components/FeedbackModal';
import { InteractivePracticeView } from './components/InteractivePracticeView';
import { QuickStartGuide } from './components/QuickStartGuide';
import { loadCustomExamPaper, clearCustomExamPaper } from './utils/practiceStorage';
import { ensureExamQuality, ensureStudySheetQuality, sanitizeExamPaper } from './utils/qualityAssurance';
import { triggerPdfPrint } from './utils/materialFileNameGenerator';
import {
  Mic,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Calendar
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
    return scenarios[0] || {
      id: 'senaryo_1',
      name: 'Senaryo',
      description: '',
      totalQuestions: 0,
      distributions: []
    };
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
      const ensuredExam = ensureExamQuality(customExamPaper);
      return sanitizeExamPaper(ensuredExam);
    }

    // 2. Direct match in verified teacher-curated repository
    const match = SAMPLE_EXAMS.find(
      e => e.grade === selectedGrade &&
        e.subjectId === selectedSubject &&
        e.examTerm === selectedTerm &&
        e.scenarioId === currentScenario.id
    );

    if (match) {
      const ensuredExam = ensureExamQuality(match);
      return sanitizeExamPaper(ensuredExam);
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

      const meta = resolveOutcomeMetadata(d.outcomeCode, d.notes);
      const topicDesc = meta.topicNote || meta.officialTitle || subjectName;

      return {
        outcomeCode: d.outcomeCode,
        topicTitle: `${d.outcomeCode}: ${topicDesc}`,
        quickNotes: [
          `${topicDesc} konusunda MEB konu ve soru dağılımında belirtilen temel kavramları ve ilkeleri gözden geçiriniz.`,
          `Bu öğrenme çıktısında kavramsal kavrama, akıl yürütme ve analitik gerekçelendirme becerisi ölçülmektedir.`
        ],
        examTraps: [
          'Soruda verilen deney, grafik, metin veya vaka verilerini doğrudan incelemeden ezber bilgiyle genelleme yapmayınız.'
        ],
        solvedExample: {
          question: `${topicDesc} konusuna ait açık uçlu sorularda sonuca nasıl ulaşılır?`,
          analysis: 'Verilen verileri, kuralları ve kavramsal bağıntıları sırasıyla inceleyiniz.',
          solution: `İlgili kavrama (${topicDesc}) ait temel kural uygulanır ve ulaşılan sonuç mantıksal gerekçeleriyle adım adım ifade edilir.`
        },
        practiceQuestion: {
          question: `${topicDesc} kazanımı kapsamında günlük yaşamdan bir örnek veya durum vererek çıkarımınızı açıklayınız.`,
          hint: 'Kavramsal tanımların yanı sıra neden-sonuç ilişkisini ve kuralları açıkça belirtiniz.'
        }
      };
    });

    const rawSheet: StudySheet = {
      id: `study_${selectedSubject}_${selectedGrade}_${currentScenario.id}`,
      grade: selectedGrade,
      subjectId: selectedSubject,
      examTerm: selectedTerm,
      scenarioId: currentScenario.id,
      title: selectedGrade === 8
        ? `8. Sınıf ${subjectName} (${currentScenario.name}) Okul Yazılılarına Hazırlık Çalışma Kağıdı`
        : `${selectedGrade}. Sınıf ${subjectName} (${currentScenario.name}) TYMM Kapsamlı Sınav Çalışma Kağıdı`,
      sections
    };

    return ensureStudySheetQuality(rawSheet);
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

  // Kalıcı sekme başlığı (document.title asla filtre veya soru üretimiyle değişmez)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = 'OYSS Rehberi | Ortak Yazılılara Hazırlık';
    }
  }, []);

  const handleGlobalPrint = () => {
    const isCustomExam = Boolean(customExamPaper && activeExamPaper?.id === customExamPaper.id);
    triggerPdfPrint({
      grade: selectedGrade,
      subjectId: selectedSubject,
      examTerm: selectedTerm,
      scenarioId: (selectedMaterial === 'speaking_guide') ? undefined : currentScenario.id,
      materialKind: selectedMaterial,
      isCustomExam
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Navigation */}
      <Navbar
        onOpenAIModal={() => setIsAIModalOpen(true)}
        onOpenSourcesModal={() => setIsSourcesModalOpen(true)}
        onOpenFeedbackModal={() => setIsFeedbackModalOpen(true)}
        onPrint={handleGlobalPrint}
      />

      {/* İlk Kullanım ve Yönlendirme Rehberi */}
      <QuickStartGuide onOpenAIModal={() => setIsAIModalOpen(true)} />

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
        {currentStage === 'lise' ? (
          <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl border-2 border-dashed border-indigo-200 p-8 sm:p-12 text-center shadow-xs">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl border border-indigo-200 flex items-center justify-center mx-auto mb-4 text-indigo-600">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold mb-3">
                Lise Hazırlık Materyalleri Hazırlanıyor
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                Lise Kademesi Çok Yakında Yayında
              </h3>
              <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mb-6 leading-relaxed">
                Lise düzeyine yönelik ortak yazılılara hazırlık içerikleri üzerinde çalışıyoruz. Lise sınavlarına hazırlık materyalleri, ikinci yazılı dönemi öncesinde sisteme eklenecektir.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => handleSelectStage('ortaokul')}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold inline-flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  Ortaokul Sınavlarına Dön <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (selectedTerm === '2_donem_1_yazili' || selectedTerm === '2_donem_2_yazili') ? (
          <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl border-2 border-dashed border-amber-200 p-8 sm:p-12 text-center shadow-xs">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-center mx-auto mb-4 text-amber-600">
                <Calendar className="w-8 h-8" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold mb-3">
                2. Dönem MEB Tabloları Bekleniyor
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                MEB 2. Dönem Konu-Soru Dağılım Tabloları Henüz Yayımlanmadı
              </h3>
              <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mb-6 leading-relaxed">
                MEB, 2026-2027 eğitim öğretim yılı 2. dönem konu-soru dağılım tablolarını henüz yayımlamamıştır. Bu döneme ait ortak yazılı sınavları ve çalışma materyalleri, MEB tabloları yayımlandıktan sonra OYSS Rehberi'ne eklenecektir.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => handleSelectTerm('1_donem_1_yazili')}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  1. Dönem 1. Yazılıya Geç <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleSelectTerm('1_donem_2_yazili')}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  1. Dönem 2. Yazılıya Geç <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {selectedMaterial === 'exam_paper' && (
              activeExamPaper ? (
                <ExamPaperView
                  examPaper={activeExamPaper}
                  scenario={currentScenario}
                  isCustomAIExam={Boolean(customExamPaper && activeExamPaper.id === customExamPaper.id)}
                  onResetToDefaultExam={() => {
                    clearCustomExamPaper(selectedGrade, selectedSubject);
                    setCustomExamPaper(null);
                  }}
                  onOpenAIGenerator={() => setIsAIModalOpen(true)}
                  onOpenInteractivePractice={() => setSelectedMaterial('interactive_exam')}
                />
              ) : (
                <ScenarioOverviewView
                  scenario={currentScenario}
                  grade={selectedGrade}
                  subjectMeta={currentSubjectMeta}
                  examTerm={selectedTerm}
                  onOpenAIGenerator={() => setIsAIModalOpen(true)}
                  onOpenStudySheet={() => setSelectedMaterial('study_sheet')}
                  onOpenInteractivePractice={() => setIsAIModalOpen(true)}
                  onSwitchToTerm1={() => {
                    setSelectedTerm('1_donem_1_yazili');
                    setSelectedScenarioId('senaryo_1');
                  }}
                />
              )
            )}

            {selectedMaterial === 'interactive_exam' && (
              activeExamPaper ? (
                <InteractivePracticeView
                  key={activeExamPaper.id}
                  examPaper={activeExamPaper}
                  isCustomAIExam={Boolean(customExamPaper && activeExamPaper.id === customExamPaper.id)}
                  onBackToPaperView={() => setSelectedMaterial('exam_paper')}
                  onOpenStudySheet={() => setSelectedMaterial('study_sheet')}
                />
              ) : (
                <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 animate-in fade-in duration-200">
                  <div className="bg-white rounded-2xl border-2 border-dashed border-indigo-200 p-8 sm:p-10 text-center shadow-xs">
                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl border border-indigo-200 flex items-center justify-center mx-auto mb-4 text-indigo-600">
                      <Sparkles className="w-7 h-7" />
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold mb-3 border border-indigo-200">
                      {currentScenario.name} • {currentScenario.totalQuestions} Soru Dağılımı
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                      Etkileşimli Çözüm İçin Senaryoya Özel Sınav Hazırlayın
                    </h3>
                    <p className="text-sm text-slate-600 max-w-xl mx-auto mb-6">
                      Bu senaryonun resmî MEB ÖDSGM konu-soru dağılımına uygun özgün bir sınav oluşturarak soruları adım adım puanlayabilir ve model çözümlerle pekiştirebilirsiniz.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={() => setIsAIModalOpen(true)}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer inline-flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        Yapay Zekâ ile Sınav Hazırla ve Hemen Çöz
                      </button>
                      <button
                        onClick={() => setSelectedMaterial('exam_paper')}
                        className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                      >
                        Senaryo Kazanım Dağılımını İncele
                      </button>
                    </div>
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
                selectedGrade={selectedGrade}
                selectedSubject={selectedSubject}
                selectedTerm={selectedTerm}
                selectedScenarioId={currentScenario.id}
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
          </>
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
        onApplyAndStartInteractive={(customExam) => {
          setCustomExamPaper(customExam);
          setSelectedMaterial('interactive_exam');
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
