import React, { useState, useMemo } from 'react';
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
  SchoolStage,
  QuestionArchetype
} from './types';
import { 
  ALL_SUBJECTS,
  ALL_GRADES,
  getScenarios,
  getOfficialOutcomeTitle
} from './data/curriculumData';
import { calibrateQuestionDifficulties } from './utils/difficultyCalibrator';
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

export const App: React.FC = () => {
  // Navigation / Filter State (Default: 5. Sınıf Türkçe Senaryo 1 Sınav Kağıdı)
  const [currentStage, setCurrentStage] = useState<SchoolStage>('ortaokul');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(5);
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('turkce');
  const [selectedTerm, setSelectedTerm] = useState<ExamTerm>('1_donem_1_yazili');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('senaryo_1');
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType>('exam_paper');
  const [customExamPaper, setCustomExamPaper] = useState<ExamPaper | null>(null);

  // Modal States
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);
  const [isSourcesModalOpen, setIsSourcesModalOpen] = useState<boolean>(false);

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
  const activeExamPaper: ExamPaper = useMemo(() => {
    // If a custom AI generated exam paper is active for this grade and subject, show it directly!
    if (customExamPaper && 
        customExamPaper.grade === selectedGrade && 
        customExamPaper.subjectId === selectedSubject) {
      return customExamPaper;
    }

    const match = SAMPLE_EXAMS.find(
      e => e.grade === selectedGrade && 
           e.subjectId === selectedSubject && 
           e.examTerm === selectedTerm && 
           e.scenarioId === currentScenario.id
    );

    if (match) return match;

    // 2. Check for sibling scenario match in the same subject and grade
    const siblingMatch = SAMPLE_EXAMS.find(
      e => e.grade === selectedGrade && 
           e.subjectId === selectedSubject && 
           e.examTerm === selectedTerm
    );

    if (siblingMatch) {
      const targetCount = currentScenario.totalQuestions || 6;
      const baseQuestions = siblingMatch.questions;
      const pointPerQ = Math.floor(100 / targetCount);
      const remainder = 100 - (pointPerQ * targetCount);

      const adaptedQuestions = Array.from({ length: targetCount }).map((_, idx) => {
        const sourceQ = baseQuestions[idx % baseQuestions.length];
        const pts = pointPerQ + (idx === 0 ? remainder : 0);
        return {
          ...sourceQ,
          questionNumber: idx + 1,
          points: pts,
          rubric: sourceQ.rubric.map(r => ({
            ...r,
            points: Math.max(1, Math.round((r.points / (sourceQ.points || 15)) * pts))
          }))
        };
      });

      return {
        ...siblingMatch,
        id: `adapted_${selectedSubject}_${selectedGrade}_${currentScenario.id}`,
        scenarioId: currentScenario.id,
        title: `${selectedGrade}. Sınıf ${siblingMatch.title.split('(')[0].trim()} (${currentScenario.name})`,
        questions: adaptedQuestions
      };
    }

    const subMeta = ALL_SUBJECTS.find(s => s.id === selectedSubject);
    const subjectName = (selectedSubject === 'sosyal_bilgiler' && selectedGrade === 8)
      ? 'T.C. İnkılap Tarihi ve Atatürkçülük'
      : (subMeta ? subMeta.name : 'Ders');

    // Archetype templates cycling across MEBİ pedagogy
    const archetypes: QuestionArchetype[] = [
      'Durum & Özellik Matrisi (VAR/YOK/Tik)',
      'Kurgusal Senaryo & Vaka İncelemesi',
      'Öğrenci Diyaloğu & Kavram Yanılgısı',
      'Hata Tespiti & Adım Analizi',
      'Dilemma (İkilem) & Çözüm Değerlendirme',
      'Görsel / Deney / Günlük Hayat Durumu',
      'Birinci Ağızdan Konuşturma / Rol'
    ];

    return {
      id: `generated_${selectedSubject}_${selectedGrade}_${currentScenario.id}`,
      grade: selectedGrade,
      subjectId: selectedSubject,
      examTerm: selectedTerm,
      scenarioId: currentScenario.id,
      title: `${selectedGrade}. Sınıf ${subjectName} Ortak Yazılı Sınavı (${currentScenario.name})`,
      durationMinutes: 40,
      totalPoints: 100,
      instructions: [
        `Bu sınav Temel Eğitim / Ortaöğretim Genel Müdürlüğü MEBİ soru standartları ve ÖDSGM ${currentScenario.name} dağılımına göre yapılandırılmıştır.`,
        'Düz bilgi/ezber yerine verilen vaka, diyalog ve veri tablolarını analiz ederek gerekçenizi yazınız.',
        'Puanlamada MEB Analitik Dereceli Puanlama Anahtarı (Rubrik) basamakları esas alınacaktır.'
      ],
      questions: calibrateQuestionDifficulties(currentScenario.distributions.map((dist, idx) => {
        const archetype = archetypes[idx % archetypes.length];
        
        let stimulusText = '';
        let questionText = '';
        let modelAns = '';
        let rubricItems = [];

        if (archetype === 'Öğrenci Diyaloğu & Kavram Yanılgısı') {
          stimulusText = `Öğretmen tahtaya ${subjectName} dersiyle ilgili temel bir durum yazmıştır. İki öğrenci arasında şu tartışma geçmektedir:
Öğrenci A: "Bu durumda uygulanması gereken temel kural X'tir çünkü önceki deneyimler bunu göstermiştir."
Öğrenci B: "Hayır, veriler incelendiğinde Y kuralının geçerli olduğu ve A'nın değişkeni göz ardı ettiği görülür."`;
          questionText = `Öğrenci A ve Öğrenci B'nin iddialarını ${dist.outcomeCode} öğrenme çıktısı bakımından değerlendiriniz. Hangi öğrencinin haklı olduğunu bilimsel/mantıksal gerekçeleriyle açıklayınız.`;
          modelAns = `Öğrenci B haklıdır. Çünkü Öğrenci A temel değişkeni göz ardı etmiştir. Bilimsel/kavramsal kural gereği Y durumu geçerlidir.`;
          rubricItems = [
            { criterion: 'Haklı olan öğrencinin doğru tespiti', points: 8 },
            { criterion: 'Kavram yanılgısının bilimsel/mantıksal gerekçeyle kanıtlanması', points: 7 }
          ];
        } else if (archetype === 'Kurgusal Senaryo & Vaka İncelemesi') {
          stimulusText = `Bir araştırma ekibi ${subjectName} kapsamında bir proje geliştirmektedir. Projede 3 farklı durum (Durum 1, Durum 2, Durum 3) test edilmiş ve sonuçlar kayıt altına alınmıştır.`;
          questionText = `a) Verilen kurgusal durumlardan hangisi hedeflenen temel kavrama uygun bir model oluşturur? Nedenini bir cümleyle açıklayınız.
b) Durum 1 ile Durum 2 arasındaki en temel farklılığı gerekçelendiriniz.`;
          modelAns = `a) Hedeflenen kavrama uygun olan model Durum 2'dir çünkü şartları eksiksiz karşılamaktadır.
b) Durum 1 ile Durum 2 arasındaki fark, uygulanan yöntemin sürekliliği ve doğrudan etki mekanizmasıdır.`;
          rubricItems = [
            { criterion: 'a şıkkında doğru model tespiti ve gerekçesi', points: 8 },
            { criterion: 'b şıkkında iki durum arasındaki ayırt edici farkın yazılması', points: 7 }
          ];
        } else if (archetype === 'Dilemma (İkilem) & Çözüm Değerlendirme') {
          stimulusText = `Ortaya çıkan bir sorunu çözmek için uzmanlar iki farklı çözüm yaklaşımı önermiştir:
1. Yaklaşım: Mevcut sistemi tamamen durdurup yeni bir altyapı inşa etmek.
2. Yaklaşım: Mevcut sistem çalışırken kademeli iyileştirme adımları uygulamak.`;
          questionText = `Sizce yukarıdaki çözüm yollarından hangisi daha uygulanabilir ve sürdürülebilirdir? Seçtiğiniz yaklaşımın güçlü yönlerini ve diğer yaklaşımın taşıdığı riskleri değerlendirerek gerekçelendiriniz.`;
          modelAns = `(Öğrenci 1. veya 2. yaklaşımı seçip tutarlı bilimsel/mantıksal argüman sunduğunda tam puan verilir).`;
          rubricItems = [
            { criterion: 'Seçilen yaklaşımın güçlü yönünün gerekçelendirilmesi', points: 8 },
            { criterion: 'Alternatif yaklaşımın risk/sınırlarının analizi', points: 7 }
          ];
        } else {
          stimulusText = `Aşağıdaki tabloda ${subjectName} dersi ${dist.outcomeCode} çıktısına yönelik 3 farklı durum ve bu durumlara ait özellikler verilmiştir.`;
          questionText = `Tablodaki boşlukları ilgili durumun özelliğine göre "VAR" veya "YOK" yazarak doldurunuz ve bu özelliklerin pratik hayattaki önemini bir cümleyle açıklayınız.`;
          modelAns = `Tablo eksiksiz doldurulur ve ilgili kavramın işlevi açıklanır.`;
          rubricItems = [
            { criterion: 'Tablo özelliklerinin doğru analiz edilmesi', points: 8 },
            { criterion: 'Kavramsal gerekçelendirme cümlesi', points: 7 }
          ];
        }

        const officialOutcome = getOfficialOutcomeTitle(dist.outcomeCode);
        const resolvedOutcomeTitle = (officialOutcome && officialOutcome !== dist.outcomeCode)
          ? officialOutcome
          : (dist.notes || `${subjectName} Temel Öğrenme Çıktısı Analizi`);

        return {
          questionNumber: idx + 1,
          outcomeCode: dist.outcomeCode,
          outcomeTitle: resolvedOutcomeTitle,
          difficulty: 'Orta' as const,
          cognitiveLevel: dist.cognitiveLevel,
          archetype: archetype,
          points: Math.round(100 / currentScenario.distributions.length),
          contextText: dist.notes ? `Odak Alanı: ${dist.notes}` : undefined,
          stimulus: stimulusText,
          questionText: questionText,
          modelAnswer: modelAns,
          solutionExplanation: `MEBİ ${archetype} kalıbına uygun analitik değerlendirme.`,
          rubric: rubricItems
        };
      }))
    };
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

      return {
        outcomeCode: d.outcomeCode,
        topicTitle: `${subjectName} - ${d.notes || d.outcomeCode}`,
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

  // Active Infographics
  const activeInfographics: InfographicItem[] = useMemo(() => {
    const match = SAMPLE_INFOGRAPHICS.filter(
      i => i.grade === selectedGrade && i.subjectId === selectedSubject
    );
    if (match.length > 0) return match;

    const subMeta = ALL_SUBJECTS.find(s => s.id === selectedSubject);
    const effectiveSubjectName = (selectedSubject === 'sosyal_bilgiler' && selectedGrade === 8)
      ? 'T.C. İnkılap Tarihi ve Atatürkçülük'
      : (subMeta?.name || 'Ders');
    return [
      {
        id: `info_${selectedSubject}_${selectedGrade}`,
        grade: selectedGrade,
        subjectId: selectedSubject,
        examTerm: selectedTerm,
        title: `${selectedGrade}. Sınıf ${effectiveSubjectName} MEBİ Soru Şifreleri`,
        subtitle: 'Sınavda Karşılaşabileceğiniz Temel Şablonlar ve Ayırt Edici Noktalar',
        category: 'MEBİ Kavram Haritası',
        memoryHook: 'Hatırla: MEB sınavlarında ezber bilgi değil; "neden" ve "nasıl" gerekçesi puan getirir!',
        summaryCards: [
          {
            title: 'Soru Tipi: Öğrenci Diyaloğu',
            badge: 'Hata Yakalama',
            points: [
              'İki öğrencinin tartışmasında işlem sırasını kontrol et',
              'Kavram yanılgısını bilimsel terimlerle açıkla',
              'Sonuca değil gerekçeye odaklan'
            ]
          },
          {
            title: 'Soru Tipi: Karşılaştırma Matrisi',
            badge: 'VAR / YOK',
            points: [
              'Tablodaki ortak özellikleri belirle',
              'Ayırt edici tek bir farkı yakala',
              'Kural istisnalarına dikkat et'
            ]
          }
        ]
      }
    ];
  }, [selectedGrade, selectedSubject, selectedTerm]);

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
          <ExamPaperView 
            examPaper={activeExamPaper}
            isCustomAIExam={Boolean(customExamPaper && activeExamPaper.id === customExamPaper.id)}
            onResetToDefaultExam={() => setCustomExamPaper(null)}
            onOpenAIGenerator={() => setIsAIModalOpen(true)}
          />
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

        {selectedMaterial === 'speaking_guide' && activeSpeakingGuide && (
          <SpeakingGuideView 
            guide={activeSpeakingGuide}
          />
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
    </div>
  );
};
