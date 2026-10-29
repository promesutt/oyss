import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  GradeLevel, 
  SubjectId, 
  ExamTerm, 
  MaterialType, 
  ExamScenario,
  SchoolStage
} from '../types';
import { 
  ALL_GRADES, 
  ALL_SUBJECTS, 
  EXAM_TERMS 
} from '../data/curriculumData';
import { 
  Atom, 
  Calculator, 
  BookOpen, 
  Compass, 
  Moon, 
  Globe, 
  FileText, 
  Lightbulb, 
  Sparkles, 
  Mic2, 
  Layers,
  Zap,
  FlaskConical,
  Dna,
  Landmark,
  PenTool,
  Map,
  Brain,
  School,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface FilterBarProps {
  currentStage: SchoolStage;
  onSelectStage: (stage: SchoolStage) => void;
  selectedGrade: GradeLevel;
  onSelectGrade: (grade: GradeLevel) => void;
  selectedSubject: SubjectId;
  onSelectSubject: (subject: SubjectId) => void;
  selectedTerm: ExamTerm;
  onSelectTerm: (term: ExamTerm) => void;
  scenarios: ExamScenario[];
  selectedScenarioId: string;
  onSelectScenario: (scenarioId: string) => void;
  selectedMaterial: MaterialType;
  onSelectMaterial: (material: MaterialType) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  currentStage,
  onSelectStage,
  selectedGrade,
  onSelectGrade,
  selectedSubject,
  onSelectSubject,
  selectedTerm,
  onSelectTerm,
  scenarios,
  selectedScenarioId,
  onSelectScenario,
  selectedMaterial,
  onSelectMaterial,
}) => {
  const currentSubjectMeta = ALL_SUBJECTS.find(s => s.id === selectedSubject);

  // Filter grades and subjects by current stage
  const availableGrades = ALL_GRADES.filter(g => g.stage === currentStage);
  const availableSubjects = ALL_SUBJECTS.filter(s => s.stage.includes(currentStage));

  const subjectScrollRef = useRef<HTMLDivElement>(null);
  const scenarioScrollRef = useRef<HTMLDivElement>(null);

  const [subjectCanScrollLeft, setSubjectCanScrollLeft] = useState(false);
  const [subjectCanScrollRight, setSubjectCanScrollRight] = useState(false);
  const [scenarioCanScrollLeft, setScenarioCanScrollLeft] = useState(false);
  const [scenarioCanScrollRight, setScenarioCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    if (subjectScrollRef.current) {
      const el = subjectScrollRef.current;
      setSubjectCanScrollLeft(el.scrollLeft > 6);
      setSubjectCanScrollRight(el.scrollWidth > el.clientWidth + el.scrollLeft + 6);
    }
    if (scenarioScrollRef.current) {
      const el = scenarioScrollRef.current;
      setScenarioCanScrollLeft(el.scrollLeft > 6);
      setScenarioCanScrollRight(el.scrollWidth > el.clientWidth + el.scrollLeft + 6);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(updateScrollState, 80);
    window.addEventListener('resize', updateScrollState);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState, availableSubjects, scenarios]);

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, offset: number) => {
    if (ref.current) {
      ref.current.scrollBy({ left: offset, behavior: 'smooth' });
      setTimeout(updateScrollState, 250);
    }
  };

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Atom': return <Atom className="w-4 h-4 mr-1.5 text-emerald-600" />;
      case 'Calculator': return <Calculator className="w-4 h-4 mr-1.5 text-blue-600" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4 mr-1.5 text-amber-600" />;
      case 'Compass': return <Compass className="w-4 h-4 mr-1.5 text-rose-600" />;
      case 'Moon': return <Moon className="w-4 h-4 mr-1.5 text-teal-600" />;
      case 'Globe': return <Globe className="w-4 h-4 mr-1.5 text-indigo-600" />;
      case 'Zap': return <Zap className="w-4 h-4 mr-1.5 text-purple-600" />;
      case 'FlaskConical': return <FlaskConical className="w-4 h-4 mr-1.5 text-emerald-600" />;
      case 'Dna': return <Dna className="w-4 h-4 mr-1.5 text-green-600" />;
      case 'Landmark': return <Landmark className="w-4 h-4 mr-1.5 text-red-600" />;
      case 'Map': return <Map className="w-4 h-4 mr-1.5 text-cyan-600" />;
      case 'Brain': return <Brain className="w-4 h-4 mr-1.5 text-violet-600" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white border-b border-slate-200 py-4 shadow-sm print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Row 1: Kademe (Ortaokul / Lise) & Sınıf Seviyesi */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          
          {/* Stage Toggle (Ortaokul vs Lise) & Grade Pills */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Stage Selector */}
            <div className="flex items-center space-x-1.5 bg-slate-900 text-white p-1 rounded-xl">
              <button
                onClick={() => onSelectStage('ortaokul')}
                className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentStage === 'ortaokul'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <School className="w-3.5 h-3.5 mr-1.5" />
                Ortaokul (5-8)
              </button>
              <button
                onClick={() => onSelectStage('lise')}
                className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentStage === 'lise'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <School className="w-3.5 h-3.5 mr-1.5" />
                Lise (9-12)
              </button>
            </div>

            {/* Grade Pills for current stage */}
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
              {availableGrades.map((g) => (
                <button
                  key={g.level}
                  onClick={() => onSelectGrade(g.level)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    selectedGrade === g.level
                      ? 'bg-white text-slate-900 font-bold shadow-sm ring-1 ring-slate-300'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {g.name}
                  <span className="hidden sm:inline-block ml-1 text-[10px] text-slate-400 font-normal">
                    ({g.tymmRollout.includes('TYMM') ? 'TYMM' : 'Ortak'})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Exam Term Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
              Dönem:
            </span>
            <div className="grid grid-cols-2 sm:flex bg-slate-100 p-1 rounded-xl gap-1">
              {EXAM_TERMS.map((term) => (
                <button
                  key={term.id}
                  onClick={() => onSelectTerm(term.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedTerm === term.id
                      ? 'bg-white text-slate-900 font-bold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {term.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Subject Selector Bar */}
        <div className="relative flex items-center pt-1 group">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2 shrink-0">
            Dersler ({availableSubjects.length}):
          </span>

          {/* Left Arrow Button */}
          {subjectCanScrollLeft && (
            <>
              <div className="absolute left-20 sm:left-24 top-0 bottom-0 w-8 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
              <button
                type="button"
                onClick={() => scrollContainer(subjectScrollRef, -180)}
                className="absolute left-20 sm:left-24 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white border border-slate-300 shadow-md flex items-center justify-center text-slate-700 hover:text-indigo-600 hover:bg-slate-50 cursor-pointer"
                title="Sola kaydır"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Scrollable Subjects */}
          <div 
            ref={subjectScrollRef}
            onScroll={updateScrollState}
            className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none w-full scroll-smooth"
          >
            {availableSubjects.map((sub) => {
              const isSelected = selectedSubject === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => onSelectSubject(sub.id)}
                  className={`inline-flex items-center px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm ring-2 ring-slate-900/10'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  {getSubjectIcon(sub.iconName)}
                  <span>
                    {sub.id === 'sosyal_bilgiler' && selectedGrade === 8
                      ? 'T.C. İnkılap Tarihi ve Atatürkçülük'
                      : sub.name}
                  </span>
                  {sub.hasListeningSpeaking && (
                    <span className="ml-1.5 text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-normal">
                      Okuma/Yazma + Konuşma
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Arrow Button & Indicator */}
          {subjectCanScrollRight && (
            <>
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
              <button
                type="button"
                onClick={() => scrollContainer(subjectScrollRef, 180)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center space-x-1 pl-2 pr-2.5 py-1 rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition-all cursor-pointer text-xs font-semibold animate-pulse"
                title="Sağdaki diğer dersleri gör"
              >
                <span className="text-[11px] hidden sm:inline">Daha fazla</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Row 3: Scenario Selector (Senaryolar) */}
        {scenarios.length > 0 && (
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-2 pt-2 border-t border-slate-100 group">
            <div className="flex items-center space-x-1.5 shrink-0">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-slate-700">
                MEBİ & ÖDSGM Senaryo Tipi:
              </span>
            </div>

            <div className="relative flex-1 min-w-0">
              {/* Left Arrow Button */}
              {scenarioCanScrollLeft && (
                <>
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
                  <button
                    type="button"
                    onClick={() => scrollContainer(scenarioScrollRef, -160)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-white border border-slate-300 shadow-md flex items-center justify-center text-slate-700 hover:text-indigo-600 hover:bg-slate-50 cursor-pointer"
                    title="Sola kaydır"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </>
              )}

              {/* Scrollable Scenarios */}
              <div 
                ref={scenarioScrollRef}
                onScroll={updateScrollState}
                className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none scroll-smooth w-full"
              >
                {scenarios.map((sc) => {
                  const isSelected = selectedScenarioId === sc.id;
                  return (
                    <button
                      key={sc.id}
                      onClick={() => onSelectScenario(sc.id)}
                      className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium border transition-all shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold ring-1 ring-indigo-400'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{sc.name}</span>
                      <span className="ml-1.5 px-1.5 py-0.2 bg-slate-200/80 rounded-full text-[10px] text-slate-700">
                        {sc.totalQuestions} Soru
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right Arrow Button & Indicator */}
              {scenarioCanScrollRight && (
                <>
                  <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
                  <button
                    type="button"
                    onClick={() => scrollContainer(scenarioScrollRef, 160)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center space-x-1 pl-1.5 pr-2 py-0.5 rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition-all cursor-pointer text-[10px] font-semibold animate-pulse"
                    title="Sağdaki diğer senaryoları gör"
                  >
                    <span className="hidden sm:inline">Diğerleri</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Row 4: Material Type Tabs */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex space-x-1 sm:space-x-2 border-b border-slate-200 w-full overflow-x-auto">
            <button
              onClick={() => onSelectMaterial('exam_paper')}
              className={`pb-3 px-3 inline-flex items-center text-xs sm:text-sm font-semibold border-b-2 transition-colors shrink-0 ${
                selectedMaterial === 'exam_paper'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-4 h-4 mr-1.5" />
              Örnek Sınav Kağıdı (MEBİ Şablonlu)
            </button>

            <button
              onClick={() => onSelectMaterial('interactive_exam')}
              className={`pb-3 px-3 inline-flex items-center text-xs sm:text-sm font-semibold border-b-2 transition-colors shrink-0 ${
                selectedMaterial === 'interactive_exam'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <PenTool className="w-4 h-4 mr-1.5" />
              Etkileşimli Sınav Çöz & Öz Değerlendir
              <span className="ml-1.5 text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-bold">
                Yeni
              </span>
            </button>

            <button
              onClick={() => onSelectMaterial('study_sheet')}
              className={`pb-3 px-3 inline-flex items-center text-xs sm:text-sm font-semibold border-b-2 transition-colors shrink-0 ${
                selectedMaterial === 'study_sheet'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Lightbulb className="w-4 h-4 mr-1.5" />
              Hap Bilgili Çalışma Kağıdı
            </button>

            <button
              onClick={() => onSelectMaterial('infographic')}
              className={`pb-3 px-3 inline-flex items-center text-xs sm:text-sm font-semibold border-b-2 transition-colors shrink-0 ${
                selectedMaterial === 'infographic'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4 mr-1.5" />
              İnfografik & Püf Noktalar
            </button>

            {currentSubjectMeta?.hasListeningSpeaking && (
              <button
                onClick={() => onSelectMaterial('speaking_guide')}
                className={`pb-3 px-3 inline-flex items-center text-xs sm:text-sm font-semibold border-b-2 transition-colors shrink-0 ${
                  selectedMaterial === 'speaking_guide'
                    ? 'border-amber-600 text-amber-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Mic2 className="w-4 h-4 mr-1.5" />
                Dinleme & Konuşma Rehberi
                <span className="ml-1 text-[10px] bg-amber-100 text-amber-800 px-1 rounded">
                  Zümre Uygulama
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
