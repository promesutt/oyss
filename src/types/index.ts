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

export type MaterialType = 'exam_paper' | 'study_sheet' | 'infographic' | 'speaking_guide' | 'ai_generator' | 'interactive_exam';

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

export type QuestionSourceOrigin = 
  | 'meb_official'    // Bakanlık/ÖDSGM resmî senaryolarından doğrudan seçilen soru
  | 'oyss_curated'     // OYSS kural tabanlı standart soru havuzundan soru (fallbackPools)
  | 'oyss_synthetic'   // OYSS kural motorunun sıfırdan anlık ürettiği kurgusal soru
  | 'gemini_ai';       // Canlı Gemini yapay zekâ servisi tarafından üretilen özgün soru

export type ExamSourceClassification =
  | 'oyss_pure_custom'     // Tüm sorular gemini_ai veya oyss_synthetic -> "OYSS Özgün Sınavı"
  | 'oyss_curated_set'      // Tüm sorular oyss_curated -> "OYSS Standart Soru Seti"
  | 'oyss_mixed_meb'        // Bakanlık ve OYSS soruları karışık -> "OYSS Karma Sınavı (MEB ÖDSGM Kaynaklı)"
  | 'meb_selection'         // Tüm sorular meb_official -> "MEB ÖDSGM Soru Seçkisi"
  | 'official_base';        // Standart arşiv sınavı (SAMPLE_EXAMS) -> "MEB ÖDSGM Örnek Sınavı"

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
  sharedSourceId?: string; // Birden fazla soru için ortak kullanılan kaynak kimliği
  commonStimulus?: string; // Ortak kaynak metin, yönerge veya uyarıcı başlığı
  hasMissingSourceError?: boolean; // Kaynak materyali eksik ve kurtarılamamış soru işareti
  sourceValidationError?: string; // Kaynak materyal doğrulama hatası açıklaması
  questionText: string;
  solutionExplanation: string;
  modelAnswer: string;
  alternativeAnswers?: string[]; // MEBİ yaklaşımı: Anlam bakımından kabul edilebilir diğer örnek yanıtlar
  rubric: QuestionRubricItem[];
  sourceOrigin?: QuestionSourceOrigin; // Soru kaynağı kökeni
  originExamTitle?: string; // Alındığı resmî sınavın adı
  originQuestionNumber?: number; // Alındığı resmî sınavdaki soru numarası
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
  examClassification?: ExamSourceClassification; // Sınavın kaynak sınıflandırması
}

/**
 * Bir soru listesindeki kaynak kökenlerini analiz ederek sınavın genel sınıfını belirler.
 */
export function classifyExamQuestions(
  questions?: { sourceOrigin?: QuestionSourceOrigin }[]
): ExamSourceClassification {
  if (!questions || questions.length === 0) {
    return 'official_base';
  }

  let mebCount = 0;
  let curatedCount = 0;
  let pureCustomCount = 0;

  for (const q of questions) {
    if (q.sourceOrigin === 'meb_official') {
      mebCount++;
    } else if (q.sourceOrigin === 'oyss_curated') {
      curatedCount++;
    } else if (q.sourceOrigin === 'gemini_ai' || q.sourceOrigin === 'oyss_synthetic') {
      pureCustomCount++;
    } else {
      // Geriye dönük uyumluluk: Kaynak etiketi bulunmayan eski özel sınavlar özgün sayılır
      pureCustomCount++;
    }
  }

  const total = questions.length;

  if (mebCount === total) {
    return 'meb_selection';
  }
  if (curatedCount === total) {
    return 'oyss_curated_set';
  }
  if (pureCustomCount === total) {
    return 'oyss_pure_custom';
  }
  if (mebCount > 0 && (curatedCount > 0 || pureCustomCount > 0)) {
    return 'oyss_mixed_meb';
  }
  if (curatedCount > 0 && pureCustomCount > 0 && mebCount === 0) {
    return 'oyss_curated_set';
  }

  return 'oyss_pure_custom';
}

/**
 * Sınav kaynak sınıfına ait başlık eki, rozet ve yasal bilgilendirme metnini döner.
 */
export function getExamClassificationDetails(classification: ExamSourceClassification) {
  switch (classification) {
    case 'oyss_pure_custom':
      return {
        titleSuffix: 'OYSS Özgün Sınavı',
        badgeLabel: 'OYSS Özgün Sınavı',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-200',
        disclaimer: 'Bu özgün soru seti, Millî Eğitim Bakanlığının yayımladığı örnek sınavlar ve ilgili öğretim programı incelenerek oluşturulan ölçme yaklaşımı doğrultusunda OYSS tarafından hazırlanmıştır. Sorular Bakanlığın veya MEBİ platformunun yayımladığı özgün sorular değildir.'
      };
    case 'oyss_curated_set':
      return {
        titleSuffix: 'OYSS Standart Soru Seti',
        badgeLabel: 'OYSS Standart Soru Seti',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-200',
        disclaimer: 'Bu soru seti, Millî Eğitim Bakanlığı müfredatı referans alınarak OYSS standart kural tabanlı soru havuzundan derlenmiştir. Bakanlık veya MEBİ platformunun yayımladığı doğrudan sınav değildir.'
      };
    case 'oyss_mixed_meb':
      return {
        titleSuffix: 'OYSS Karma Sınavı (MEB ÖDSGM Kaynaklı)',
        badgeLabel: 'OYSS Karma Sınavı (MEB Kaynaklı)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
        disclaimer: 'Bu karma sınav, hem Millî Eğitim Bakanlığının yayımladığı resmî örnek soruları hem de OYSS tarafından hazırlanan özgün soruları içermektedir. Bakanlık kaynaklı sorular soru kartlarında özel rozetle belirtilmiştir.'
      };
    case 'meb_selection':
      return {
        titleSuffix: 'MEB ÖDSGM Soru Seçkisi',
        badgeLabel: 'MEB ÖDSGM Soru Seçkisi',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-200',
        disclaimer: 'Bu sınav kâğıdında yer alan sorular, Millî Eğitim Bakanlığı ÖDSGM tarafından farklı senaryolarda yayımlanan resmî örnek sorulardan derlenmiştir.'
      };
    case 'official_base':
    default:
      return {
        titleSuffix: 'MEB ÖDSGM Örnek Sınavı',
        badgeLabel: 'MEB ÖDSGM Örnek Sınavı',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-200',
        disclaimer: 'Bu sınav, Millî Eğitim Bakanlığı ÖDSGM tarafından yayımlanan resmî örnek sınavdır.'
      };
  }
}

/**
 * Soru kartlarında gösterilecek küçük kaynak rozetini döner.
 */
export function getQuestionSourceBadge(
  sourceOrigin?: QuestionSourceOrigin,
  originExamTitle?: string,
  originQuestionNumber?: number
): {
  label: string;
  tooltip?: string;
  badgeClass: string;
} {
  switch (sourceOrigin) {
    case 'meb_official':
      return {
        label: originQuestionNumber ? `MEB ÖDSGM Kaynaklı (Soru ${originQuestionNumber})` : 'MEB ÖDSGM Kaynaklı',
        tooltip: originExamTitle ? `Kaynak: ${originExamTitle}${originQuestionNumber ? ` • Soru ${originQuestionNumber}` : ''}` : 'Bakanlık ÖDSGM resmî örnek sınavından aktarılmıştır.',
        badgeClass: 'bg-blue-50 text-blue-900 border-blue-200'
      };
    case 'oyss_curated':
      return {
        label: 'OYSS Uyarlamalı',
        tooltip: 'OYSS kural tabanlı standart soru havuzundan uyarlanmıştır.',
        badgeClass: 'bg-indigo-50 text-indigo-900 border-indigo-200'
      };
    case 'oyss_synthetic':
    case 'gemini_ai':
      return {
        label: 'OYSS Özgün',
        tooltip: sourceOrigin === 'gemini_ai' ? 'Yapay zekâ (Gemini) tarafından özgün olarak üretilmiştir.' : 'OYSS kural motoru tarafından anlık kurgulanmıştır.',
        badgeClass: 'bg-purple-50 text-purple-900 border-purple-200'
      };
    default:
      return {
        label: 'OYSS Özgün',
        tooltip: 'Özgün çalışma sorusu',
        badgeClass: 'bg-purple-50 text-purple-900 border-purple-200'
      };
  }
}

export type EvidenceLevel = 'A' | 'B' | 'C' | 'D';

export interface TextbookReference {
  bookType: 'Student Book' | 'Workbook' | 'Teacher Guide' | 'Ders Kitabı' | 'Ders Kitabı (1. Kitap)' | 'Ders Kitabı (2. Kitap)' | string;
  bookFileName: string;
  unitTitle: string;
  printedPageRange: string;
  pdfPageRange: string;
  evidenceLevel?: EvidenceLevel;
  notes?: string;
}

export interface StudySheetSection {
  outcomeCode: string;
  topicTitle: string;
  textbookUnit?: string;
  textbookPageRange?: string;
  textbookExamples?: string[];
  textbookReferences?: TextbookReference[];
  evidenceLevel?: EvidenceLevel;
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
