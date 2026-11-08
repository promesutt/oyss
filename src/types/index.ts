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
  sourceOrigin?: 'meb_official' | 'oyss_curated';
}

export interface QuestionRubricItem {
  criterion: string;
  points: number;
}

export type QuestionDifficulty = 'Kolay' | 'Orta' | 'Zor';

export type QuestionSourceOrigin = 
  | 'meb_official'    // Bakanlık/ÖDSGM resmî senaryolarından doğrudan seçilen soru
  | 'oyss_curated'     // OYSS zümresince MEB müfredatı esas alınarak hazırlanan/uyarlanan soru
  | 'oyss_synthetic'   // OYSS kural motorunun sıfırdan anlık ürettiği kurgusal soru
  | 'gemini_ai'        // Canlı Gemini yapay zekâ servisi tarafından üretilen özgün soru
  | 'unknown';         // Gelecekte eklenebilecek kaynağı henüz doğrulanmamış soru

export type ExamSourceClassification =
  | 'oyss_pure_custom'     // Tüm sorular gemini_ai veya oyss_synthetic -> "OYSS Özgün Sınavı"
  | 'oyss_curated_set'      // Tüm sorular oyss_curated -> "OYSS Hazırlık Sınavı (MEB Müfredatı Esaslı)"
  | 'oyss_mixed_meb'        // Bakanlık ve OYSS soruları karışık -> "OYSS Karma Sınavı (MEB Kaynaklı & OYSS)"
  | 'meb_selection'         // Tüm sorular meb_official -> "MEB ÖDSGM Soru Seçkisi"
  | 'official_base'        // Geriye dönük uyumluluk takma adı (Artık oyss_curated_set ile aynı çalışır)
  | 'unclassified';        // Boş veya henüz sınıflandırılmamış sınav

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
  visual?: QuestionVisual; // Sorunun matematiksel veya pedagojik görsel çizimi
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
    return 'unclassified';
  }

  let mebCount = 0;
  let curatedCount = 0;
  let pureCustomCount = 0;
  let unknownCount = 0;

  for (const q of questions) {
    if (q.sourceOrigin === 'meb_official') {
      mebCount++;
    } else if (q.sourceOrigin === 'oyss_curated') {
      curatedCount++;
    } else if (q.sourceOrigin === 'gemini_ai' || q.sourceOrigin === 'oyss_synthetic') {
      pureCustomCount++;
    } else if (q.sourceOrigin === 'unknown') {
      unknownCount++;
    } else {
      // Metadata'sı eksik / tanımsız sorular otomatik OYSS kabul edilmez, unknownCount sayılır!
      unknownCount++;
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
  if (unknownCount === total) {
    return 'unclassified';
  }
  if (mebCount > 0 && (curatedCount > 0 || pureCustomCount > 0 || unknownCount > 0)) {
    return 'oyss_mixed_meb';
  }
  if (curatedCount > 0 && pureCustomCount > 0 && mebCount === 0 && unknownCount === 0) {
    return 'oyss_curated_set';
  }

  return 'unclassified';
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
        disclaimer: 'Bu özgün soru seti, Millî Eğitim Bakanlığının yayımladığı örnek sınavlar ve ilgili öğretim programı incelenerek oluşturulan ölçme yaklaşımı doğrultusunda OYSS tarafından hazırlanmıştır. Sorular Bakanlığın veya MEBİ platformunun yayımladığı doğrudan sınav soruları değildir.'
      };
    case 'oyss_curated_set':
      return {
        titleSuffix: 'OYSS Hazırlık Sınavı (MEB Müfredatı Esaslı)',
        badgeLabel: 'OYSS Örnek Sınavı',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-200',
        disclaimer: 'Bu sınav kâğıdı, Millî Eğitim Bakanlığı konu-soru dağılım tabloları ve öğrenme çıktıları esas alınarak OYSS tarafından hazırlanmış özgün çalışma sınavıdır. Sorular doğrudan Bakanlık tarafından yayımlanan resmî sınav değildir.'
      };
    case 'oyss_mixed_meb':
      return {
        titleSuffix: 'OYSS Karma Sınavı (MEB Kaynaklı & OYSS)',
        badgeLabel: 'OYSS Karma Sınavı',
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
    case 'unclassified':
      return {
        titleSuffix: 'OYSS Çalışma Sınavı (Sınıflandırılmamış)',
        badgeLabel: 'Sınıflandırılmamış',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
        disclaimer: 'Bu sınav kâğıdında yer alan soruların kaynak sınıflandırması henüz tamamlanmamıştır.'
      };
    case 'official_base':
    default:
      return {
        titleSuffix: 'OYSS Hazırlık Sınavı (MEB Müfredatı Esaslı)',
        badgeLabel: 'OYSS Örnek Sınavı',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-200',
        disclaimer: 'Bu sınav kâğıdı, Millî Eğitim Bakanlığı konu-soru dağılım tabloları ve öğrenme çıktıları esas alınarak OYSS tarafından hazırlanmış özgün çalışma sınavıdır. Sorular doğrudan Bakanlık tarafından yayımlanan resmî sınav değildir.'
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
        label: 'OYSS Hazırlık Sorusu',
        tooltip: originExamTitle ? `OYSS Hazırlık Sınavı (${originExamTitle})` : 'MEB müfredatı esas alınarak OYSS tarafından hazırlanmıştır.',
        badgeClass: 'bg-indigo-50 text-indigo-900 border-indigo-200'
      };
    case 'oyss_synthetic':
      return {
        label: 'OYSS Dinamik Sentez',
        tooltip: 'OYSS kural motoru tarafından anlık kurgulanmıştır.',
        badgeClass: 'bg-purple-50 text-purple-900 border-purple-200'
      };
    case 'gemini_ai':
      return {
        label: 'OYSS Özgün (AI)',
        tooltip: 'Yapay zekâ (Gemini) tarafından özgün olarak üretilmiştir.',
        badgeClass: 'bg-purple-50 text-purple-900 border-purple-200'
      };
    case 'unknown':
    default:
      return {
        label: 'Doğrulanmamış Kaynak',
        tooltip: 'Soru kaynağı henüz doğrulanmamıştır.',
        badgeClass: 'bg-slate-100 text-slate-800 border-slate-300'
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

// =============================================================================
// GÖRSELLEŞTİRME VE MATEMATİKSEL SVG MOTORU TİPLERİ (FAZ 1)
// =============================================================================

export type VisualOrigin = 'meb_odsgm' | 'oyss_svg' | 'ai_generated' | 'open_license';

export interface RationalFraction {
  numerator: number;
  denominator: number;
}

export interface SemanticAnchorPoint {
  id: string;          // Beklenen tekil kimlik (boş olamaz, ör. 'mert_val', 'ece_val')
  numerator: number;   // Beklenen pay (Number.isSafeInteger)
  denominator: number; // Beklenen payda (Number.isSafeInteger ve d > 0)
}

export interface SemanticAnchor {
  expectedPoints: SemanticAnchorPoint[];
  allowExtraPoints?: boolean; // Yalnızca true, false veya undefined kabul edilir (varsayılan: false)
}

export interface SemanticValidationResult {
  isValid: boolean;
  reason?: string;
}

export interface MathematicalValidationResult {
  isValid: boolean;
  reason?: string;
}

export interface NumberLinePoint {
  id: string;
  numerator: number;
  denominator: number;
  label?: string;
  color?: string;
  showValue?: boolean;
}

export interface NumberLineVisualParams {
  min: number;
  max: number;
  step?: number;
  subdivisions?: number;
  points: NumberLinePoint[];
  showArrows?: boolean;
  showOrigin?: boolean;
}

export interface BaseVisual {
  id?: string;
  sourceOrigin: VisualOrigin;
  caption?: string;
  anchor?: SemanticAnchor; // Anlamsal doğrulama çapası (beklenen noktalar ve kurallar)
  svgString?: string;
}

export interface NumberLineVisual extends BaseVisual {
  type: 'number_line';
  params: NumberLineVisualParams;
}

export type FractionPatternType =
  | 'solid'
  | 'hatch_diagonal_right'
  | 'hatch_diagonal_left'
  | 'dots'
  | 'crosshatch';

export interface FractionBarItem {
  id: string;                         // Şerit benzersiz kimliği (örn: 'bar-1')
  label?: string;                      // Sol başlık etiketi (örn: 'A', '1/2', 'Mert')
  fraction: RationalFraction;          // { numerator: number; denominator: number }
  fillColor?: string;                  // Renkli ekran dolgusu (örn: '#3b82f6')
  pattern?: FractionPatternType;       // Siyah-beyaz baskı tarama deseni
  showUnitFractionLabels?: boolean;   // Parça içi birim kesir etiketi ("1/4")
}

export interface FractionModelVisualParams {
  modelKind: 'fraction_bar';          // İlk aşamada yalnızca fraction_bar
  bars: FractionBarItem[];             // Şeritler dizisi
  wholeWidth?: number;                 // Referans bütün genişliği (varsayılan: 500)
  barHeight?: number;                  // Şerit yüksekliği (varsayılan: 44)
  gap?: number;                        // Şeritler arası dikey boşluk (varsayılan: 20)
  showEquivalenceGuide?: boolean;      // Denk kesir hizalama dikey kesikli çizgisi
}

export interface FractionModelVisual extends BaseVisual {
  type: 'fraction_model';
  params: FractionModelVisualParams;
}

export type GeometrySubType =
  | 'line_system'       // Doğru, doğru parçası, ışın, paralel/dik/kesişen doğrular
  | 'angle_model'       // Açı çeşitleri, saat kadranı, tümler/bütünler açılar, iletki
  | 'polygon_2d'        // Üçgenler, dörtgenler, çokgenler, köşegenler, iç açılar
  | 'grid_coordinate'   // Kareli zemin (grid), öteleme, noktanın konumu, pergel
  | 'area_perimeter';   // Dikdörtgen çevre/alan, fidan dikimi (EBOB), fayans ızgara

export interface Point2D {
  id?: string;
  x?: number;
  y?: number;
  col?: number;
  row?: number;
  label?: string;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right' | 'top_left' | 'top_right' | 'bottom_left' | 'bottom_right';
  isClosed?: boolean;   // Dolu nokta (doğru parçası sınırı için)
  color?: string;
}

export interface LineItem {
  id?: string;
  type?: 'line' | 'segment' | 'ray';
  kind?: 'line' | 'segment' | 'ray';
  from?: Point2D;
  to?: Point2D;
  start?: Point2D;
  end?: Point2D;
  label?: string;
  labelPos?: Point2D;
  isDashed?: boolean;
  dashed?: boolean;
  hasArrowStart?: boolean;
  hasArrowEnd?: boolean;
  strokeWidth?: number;
  color?: string;
  lengthLabel?: string; // Örn: '20 cm'
}

export interface AngleItem {
  id?: string;
  vertex: Point2D;      // Köşe noktası
  startAngleDeg?: number;// Başlangıç açısı (derece)
  endAngleDeg?: number;  // Bitiş açısı (derece)
  degrees?: number;
  arm1?: Point2D;
  arm2?: Point2D;
  radius?: number;      // Açı yayının yarıçapı
  isRightAngle?: boolean; // 90° diklik karesi ve nokta sembolü
  degreeLabel?: string; // Örn: '35°', '90°' veya soru işareti '?' (cevabı ele vermemek için)
  label?: string;
  color?: string;
}

export interface PolygonItem {
  id?: string;
  vertices?: Point2D[];
  points?: Point2D[];
  isClosed?: boolean;   // Çokgen olma şartı (kapalı/açık kontrolü)
  closed?: boolean;
  hasCurveEdge?: boolean; // Çokgen olmama testi (eğri kenar kontrolü)
  hasCurve?: boolean;
  label?: string;
  fill?: string;
  strokeColor?: string;
  color?: string;
  edgeLabels?: string[];// Kenar uzunlukları (a, b veya 40m, 56m)
  interiorAngles?: AngleItem[]; // İç açı yayları
  diagonals?: { fromIdx: number; toIdx: number; isDashed?: boolean }[]; // Köşegenler
}

export interface ClockItem {
  hour: number;         // 1 - 12
  minute: number;       // 0 - 59
  angleLabel?: string;  // Örn: '90° (Dik Açı)'
  showDialNumbers?: boolean;
}

export interface GridParams {
  cols: number;
  rows: number;
  cellSize: number;
  showAxes?: boolean;
  origin?: { x?: number; y?: number; col?: number; row?: number };
}

export interface TessellationParams {
  totalWidth: number;
  totalHeight: number;
  tileWidth: number;
  tileHeight: number;
  widthLabel: string;
  heightLabel: string;
  tileLabel?: string;
}

export interface GeometryShapeVisualParams {
  subType: GeometrySubType;
  title?: string;
  viewBoxWidth?: number;  // Varsayılan: 600
  viewBoxHeight?: number; // Varsayılan: 360
  isProportional?: boolean; // true: Matematiksel ölçekli, false: Temsili çizim ("Şekil temsilidir")
  
  // Alt türlere özel parametre blokları
  lines?: LineItem[];
  angles?: AngleItem[];
  polygons?: PolygonItem[];
  clocks?: ClockItem[];
  grid?: GridParams;
  points?: Point2D[];
  vectors?: Array<{
    fromCol: number;
    fromRow: number;
    toCol: number;
    toRow: number;
    label?: string;
    dashed?: boolean;
    color?: string;
  }>;
  tessellation?: TessellationParams;
  
  note?: string; // Dipnot, örn: 'Şekil temsilidir ve ölçeksizdir.'
}

export interface GeometryShapeVisual extends BaseVisual {
  type: 'geometry_shape';
  params: GeometryShapeVisualParams;
}

export interface CoordinateVisual extends BaseVisual {
  type: 'coordinate';
  params: Record<string, unknown>;
}

export interface DataChartVisual extends BaseVisual {
  type: 'data_chart';
  params: Record<string, unknown>;
}

export type QuestionVisual =
  | NumberLineVisual
  | FractionModelVisual
  | GeometryShapeVisual
  | CoordinateVisual
  | DataChartVisual;
