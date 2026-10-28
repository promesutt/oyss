export type SchoolStage = 'ortaokul' | 'lise';

export type GradeLevel = 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type QuestionArchetype = 
  | 'Kurgusal Senaryo & Vaka İncelemesi'
  | 'Öğrenci Diyaloğu & Kavram Yanılgısı'
  | 'Hata Tespiti & Adım Analizi'
  | 'Durum & Özellik Matrisi (VAR/YOK/Tik)'
  | 'Dilemma (İkilem) & Çözüm Değerlendirme'
  | 'Görsel / Deney / Günlük Hayat Durumu'
  | 'Birinci Ağızdan Konuşturma / Rol'
  | 'Metin İçi Delillendirme & Örtük Anlam';

export type SubjectId = 
  | 'fen_bilimleri' 
  | 'matematik' 
  | 'turkce' 
  | 'sosyal_bilgiler' 
  | 'din_kulturu' 
  | 'ingilizce'
  | 'turk_dili_edebiyati'
  | 'fizik'
  | 'kimya'
  | 'biyoloji'
  | 'tarih'
  | 'cografya'
  | 'felsefe';

export type ExamTerm = '1_donem_1_yazili' | '1_donem_2_yazili' | '2_donem_1_yazili' | '2_donem_2_yazili';

export type MaterialType = 'exam_paper' | 'study_sheet' | 'infographic' | 'speaking_guide' | 'ai_generator';

export type CognitiveLevel = 'Basit Bilişsel Süreçler' | 'Karmaşık Bilişsel Süreçler';

export interface LearningOutcome {
  code: string;
  theme: string;
  description: string;
  keyConcepts: string[];
}

export interface ScenarioDistribution {
  outcomeCode: string;
  questionCount: number;
  cognitiveLevel: CognitiveLevel;
  notes?: string;
}

export interface ExamScenario {
  id: string; // e.g., 'senaryo_1', 'senaryo_4'
  name: string; // '1. Senaryo', '4. Senaryo'
  description: string;
  totalQuestions: number;
  distributions: ScenarioDistribution[];
}

export interface QuestionRubricItem {
  criterion: string;
  points: number;
}

export type QuestionDifficulty = 'Kolay' | 'Orta' | 'Zor';

export interface ExamQuestion {
  questionNumber: number;
  outcomeCode: string;
  outcomeTitle?: string; // Öğrenme Çıktısı Açıklaması
  difficulty: QuestionDifficulty; // Kolay, Orta, Zor dengesi
  cognitiveLevel: CognitiveLevel; // Pedagojik düzey (yalnızca öğretmen rubriğinde)
  archetype?: QuestionArchetype; // MEBİ Soru Şablonu
  points: number;
  contextText?: string;
  stimulus?: string; // Tablo, deney düzeneği, veri, diyalog
  questionText: string;
  solutionExplanation: string;
  modelAnswer: string;
  rubric: QuestionRubricItem[];
}

export interface ExamPaper {
  id: string;
  grade: GradeLevel;
  subjectId: SubjectId;
  examTerm: ExamTerm;
  scenarioId: string;
  title: string;
  instructions: string[];
  durationMinutes: number;
  totalPoints: number;
  questions: ExamQuestion[];
}

export interface StudySheetSection {
  outcomeCode: string;
  topicTitle: string;
  quickNotes: string[]; // Hap Bilgiler
  examTraps: string[];  // Sınav Tuzakları & Püf Noktalar
  solvedExample: {
    question: string;
    analysis: string;
    solution: string;
  };
  practiceQuestion: {
    question: string;
    hint: string;
  };
}

export interface StudySheet {
  id: string;
  grade: GradeLevel;
  subjectId: SubjectId;
  examTerm: ExamTerm;
  scenarioId: string;
  title: string;
  sections: StudySheetSection[];
}

export interface InfographicItem {
  id: string;
  grade: GradeLevel;
  subjectId: SubjectId;
  examTerm: ExamTerm;
  title: string;
  subtitle: string;
  category: string;
  summaryCards: {
    title: string;
    badge: string;
    points: string[];
    highlight?: string;
  }[];
  comparisonTable?: {
    headers: string[];
    rows: string[][];
  };
  memoryHook?: string; // Akılda kalıcı tekerleme veya ipucu
}

export interface SpeakingGuide {
  id: string;
  grade: GradeLevel;
  subjectId: 'turkce' | 'ingilizce' | 'turk_dili_edebiyati';
  examTerm: ExamTerm;
  title: string;
  purpose: string;
  regulationNote: string;
  speakingPrompts: {
    topic: string;
    prepTimeMinutes: number;
    speakTimeMinutes: number;
    guidingQuestions: string[];
  }[];
  listeningTasks: {
    scenario: string;
    taskDescription: string;
    targetSkills: string[];
  }[];
  evaluationRubric: {
    category: string;
    maxPoints: number;
    criteria: string[];
  }[];
}
