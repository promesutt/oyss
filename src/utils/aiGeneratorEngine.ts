import { SubjectId, GradeLevel, ExamScenario } from '../types';
import { getOfficialOutcomeTitle } from '../data/curriculumData';
import { SAMPLE_EXAMS } from '../data/sampleExams';
import { formatDifficultyPlanText, calibrateQuestionDifficulties } from './difficultyCalibrator';
import { distributeExamPoints, reconcileRubricPoints } from './examScoring';
import { 
  detectSourceRequirement, 
  checkStimulusQuality, 
  validateAndEnrichExamQuestions 
} from './sourceMaterialValidator';

const POOL_NAMES_A = [
  'Selin', 'Kerem', 'Zehra', 'Burak', 'Aslı', 'Emre', 'Derya', 'Tarık', 
  'Gamze', 'Umut', 'Defne', 'Mete', 'Bilge', 'Kuzey', 'Aylin', 'Koray'
];

const POOL_NAMES_B = [
  'Kaan', 'İrem', 'Tolga', 'Buse', 'Alper', 'Nilay', 'Ece', 'Oğuz', 
  'Sude', 'Onur', 'Caner', 'Pınar', 'Doruk', 'Damla', 'Barış', 'Seda'
];

export interface GeneratedQuestionItem {
  number: number;
  outcome: string;
  outcomeTitle: string;
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  level: string;
  templateType: string;
  points: number;
  stimulus: string;
  question: string;
  answer: string;
  alternativeAnswers?: string[];
  solutionExplanation?: string;
  rubric: { item: string; pts: number }[];
  sharedSourceId?: string;
  commonStimulus?: string;
  hasMissingSourceError?: boolean;
  sourceValidationError?: string;
}

export interface GenerationResult {
  title: string;
  variationNumber: number;
  generationTime: string;
  model: string;
  isFallback?: boolean;
  fallbackReason?: string;
  questionsCount: number;
  generatedQuestions: GeneratedQuestionItem[];
  sourceValidationSummary?: {
    isFullyValid: boolean;
    missingSourceCount: number;
    recoveredCount: number;
  };
}

export interface GeneratorOptions {
  avoidQuestionTexts?: string[];
  avoidStimuli?: string[];
  preferredDifficulty?: 'standard' | 'more_complex' | 'foundational';
  outputType?: 'exam' | 'study_sheet' | 'practice_question';
}

/**
 * Kelime düzeyinde Jaccard ve alt dize benzerliği hesaplayarak mükerrer veya
 * yalnızca birkaç kelimesi değiştirilmiş soruları tespit eder.
 */
export function calculateQuestionSimilarity(textA: string, textB: string): number {
  if (!textA || !textB) return 0;
  const cleanA = textA.toLowerCase().replace(/[^a-z0-9ğüşıöç\s]/gi, ' ').trim();
  const cleanB = textB.toLowerCase().replace(/[^a-z0-9ğüşıöç\s]/gi, ' ').trim();
  if (cleanA === cleanB) return 1.0;
  if (cleanA.includes(cleanB) || cleanB.includes(cleanA)) {
    const minLen = Math.min(cleanA.length, cleanB.length);
    const maxLen = Math.max(cleanA.length, cleanB.length);
    if (minLen / maxLen > 0.6) return 0.85;
  }

  const wordsA = new Set(cleanA.split(/\s+/).filter(w => w.length > 2));
  const wordsB = new Set(cleanB.split(/\s+/).filter(w => w.length > 2));
  if (wordsA.size === 0 || wordsB.size === 0) return 0;

  let intersection = 0;
  for (const w of wordsA) {
    if (wordsB.has(w)) intersection++;
  }
  const union = wordsA.size + wordsB.size - intersection;
  return union > 0 ? intersection / union : 0;
}

export function isDuplicateOrTooSimilar(
  candidateQuestionText: string,
  candidateStimulus: string | undefined,
  avoidQuestionTexts: string[],
  avoidStimuli: string[] = [],
  threshold = 0.38
): boolean {
  for (const avoidQ of avoidQuestionTexts) {
    if (calculateQuestionSimilarity(candidateQuestionText, avoidQ) >= threshold) {
      return true;
    }
  }
  if (candidateStimulus && candidateStimulus.length > 25) {
    for (const avoidS of avoidStimuli) {
      if (avoidS && avoidS.length > 25 && calculateQuestionSimilarity(candidateStimulus, avoidS) >= threshold) {
        return true;
      }
    }
  }
  return false;
}

export async function generateMEBIQuestions(
  subjectId: SubjectId,
  grade: GradeLevel,
  scenario: ExamScenario,
  variationIndex: number,
  _ignoredApiKey?: string,
  requestedQuestionCount?: number,
  options?: GeneratorOptions
): Promise<GenerationResult> {
  const startTime = Date.now();
  const expandedDistributions: typeof scenario.distributions = [];
  for (const d of scenario.distributions) {
    const count = d.questionCount || 1;
    for (let c = 0; c < count; c++) {
      expandedDistributions.push(d);
    }
  }

  const effectiveTotal = expandedDistributions.length || scenario.totalQuestions || 6;
  const targetCount = requestedQuestionCount || effectiveTotal;
  const pointAllocations = distributeExamPoints(targetCount);

  // Rotate names for procedural fallback
  const nameIdx1 = (variationIndex * 3 + 1) % POOL_NAMES_A.length;
  const nameIdx2 = (variationIndex * 5 + 4) % POOL_NAMES_B.length;
  const name1 = POOL_NAMES_A[nameIdx1];
  const name2 = POOL_NAMES_B[nameIdx2];

  const questionDistributions = Array.from({ length: targetCount }, (_, i) => {
    return expandedDistributions[i % (expandedDistributions.length || 1)] || scenario.distributions[0];
  });

  const distributionsText = questionDistributions.map((d, i) => {
    const officialTitle = getOfficialOutcomeTitle(d.outcomeCode);
    return `Soru ${i + 1}: [Kazanım Kodu: ${d.outcomeCode}] [Resmi Öğrenme Çıktısı: ${officialTitle || d.notes || 'Kavramsal Uygulama'}] [Bilişsel Düzey: ${d.cognitiveLevel}]`;
  }).join('\n');

  const difficultyPlanText = formatDifficultyPlanText(targetCount);
  const isGrade7Turkish = grade === 7 && subjectId === 'turkce';
  const isGrade7Math = grade === 7 && subjectId === 'matematik';

  // Mevcut senaryoya ait hazır sınav sorularını tespit et ve kaçınılacaklar listesine ekle
  const baseExam = SAMPLE_EXAMS.find(e =>
    e.grade === grade &&
    e.subjectId === subjectId &&
    (e.scenarioId === scenario.id || e.id.endsWith(scenario.id) || e.id.includes(scenario.id))
  );

  const baseQuestionTexts = baseExam ? baseExam.questions.map(q => q.questionText) : [];
  const baseStimuli = baseExam ? baseExam.questions.map(q => q.stimulus || '') : [];

  const allAvoidTexts = Array.from(new Set([
    ...baseQuestionTexts,
    ...(options?.avoidQuestionTexts || [])
  ])).filter(t => typeof t === 'string' && t.trim().length > 0);

  const allAvoidStimuli = Array.from(new Set([
    ...baseStimuli,
    ...(options?.avoidStimuli || [])
  ])).filter(s => typeof s === 'string' && s.trim().length > 0);

  const variationToken = `${variationIndex + 1}_${Date.now().toString(36)}`;

  const avoidDirectives = allAvoidTexts.length > 0 ? `
ÖZGÜNLÜK VE MEVCUT SORULARI TEKRARLAMAMA KURALI (EN KATI VE ZORUNLU KURAL):
- Bu sınav ${variationIndex + 1}. FARKLI varyasyon setidir (Varyasyon Belirteci: ${variationToken}).
- Mevcut sınav kâğıdında bulunan aşağıdaki soru konularını, olay örgülerini, metinleri, karakterleri ve durumları KESİNLİKLE TEKRARLAMA:
${allAvoidTexts.slice(0, 7).map((t, i) => `  * Yasaklı/Mevcut Soru ${i + 1}: "${t.slice(0, 95)}..."`).join('\n')}
- Yukarıdaki metin ve olaylardan TAMAMEN FARKLI, YEPYENİ bir kurgu, yeni karakterler ve taze bir hayat durumu inşa et!
` : `
VARYASYON PLANI: Bu ${variationIndex + 1}. sınav varyasyonudur (Varyasyon Belirteci: ${variationToken}). Standart ve klişe kurguların dışında özgün senaryo oluşturunuz.
`;

  const turkishMebiDirectives = isGrade7Turkish ? `
MEBİ 7. SINIF TÜRKÇE SORU YAZIM VE ÖLÇME YÖNERGESİ (PİLOT STANDART):
1. Soru kökleri duru, net ve açık emir kipleriyle bitmelidir ("...yazınız", "...açıklayınız", "...tahmin ediniz").
2. Çıkarım ve örtük anlam (T.O.7.8, T.O.7.7) sorularında öğrenciden çıkarımını metindeki somut ipucu ve kanıtla desteklemesi istenmelidir ("en az iki ipucu ile delillendirerek açıklayınız" veya "metindeki ifadelerden hareketle gerekçelendiriniz").
3. Yüzey anlam (T.O.7.5) sorularında gereksiz yere metin içi delil aranmamalı; konunun veya doğrudan açık bilginin tek bir cümleyle tespiti istenmelidir.
4. Her soruyu alt maddeli (a, b) yapma! Yalnızca söz varlığı (T.O.7.4, T.O.7.21) ve yazım-noktalama (T.Y.7.21) gibi doğal olarak iki işlemli sorularda a) ve b) alt maddeleri kullan; okuma-anlama ve metin yapısı sorularında tekil ve odaklanmış soru kökü kullan.
5. KABUL EDİLEBİLİR ALTERNATİF CEVAPLAR (alternativeAnswers):
   - Her soru için JSON çıktısında "alternativeAnswers" dizisi üretilmelidir (2-3 adet kabul edilebilir alternatif ifade).
   - Bu alternatifler tek resmi cevap değil, aynı kavrama veya ana fikre ulaşan öğrencinin farklı sözcüklerle ifade edebileceği örneklerdir.
6. ANALİTİK VE PARÇALI RUBRİK:
   - Çıkarım (T.O.7.8) ve söz varlığı tahmini (T.O.7.4) sorularında rubrik ölçütleri "Doğru tespit/tahmin" ve "Metin içi delil/gerekçe" olarak iki bağımsız kritere bölünmelidir (örn: 8 p tespit + 7 p delillendirme). Böylece kısmi başarı öz değerlendirmede doğru yansıtılır.
   - Yüzey anlam (T.O.7.5) gibi tek odaklı sorularda rubrik tek ölçüt olarak kalmalıdır.
7. Asla hayali ders kitabı sayfa numarası veya MEBİ soru kopyası üretme; metinler özgün, kültürel ve edebi nitelikte Türkçe paragraflar olmalıdır.
` : '';

  const math7thDirectives = isGrade7Math ? `
MEBİ 7. SINIF MATEMATİK DERS KİTABI VE ÖLÇME YÖNERGESİ (1. KİTAP 1. TEMA UYUMLU):
1. KAZANIM EŞLEŞTİRMESİ VE DERS KİTABI BAĞLAMLARI:
   - MAT.7.1.1: Gerçek yaşam ya da matematiksel durumlarda doğal sayı, tam sayı ve rasyonel sayıları yorumlayabilme (Ders Kitabı 1. Kitap, Sayfa 14-40: ASELSAN Deringöz su altı aracı, Ocak ayı illerin sıcaklık değerleri, Mert'in dijital bütçesi, 0 referans noktası ve mutlak değer).
   - MAT.7.1.2: Gerçek yaşam durumlarında rasyonel sayıların ondalık gösterimlerini yansıtabilme (Ders Kitabı 1. Kitap, Sayfa 41-49: Günlük hayat nesnelerinin hacim/kütle rasyonel temsilleri, payı paydaya bölme, sonlu vs devirli ondalık, paydada 2 ve 5 dışı asal çarpan kuralı, devirliyi rasyonel yapma formülü).
   - MAT.7.1.3: Rasyonel sayıların karşılaştırma ve sıralama ilişkilerini yorumlayabilme (Ders Kitabı 1. Kitap, Sayfa 50-61: Gezegenlerin yüzey sıcaklıkları, negatif rasyonel sayılarda sayı doğrusunda sıfıra yakınlık/uzaklık, futbol ligi averaj tablosu, yarıma/bütüne yakınlık).
   - MAT.7.1.4: Rasyonel sayılar ve işlemler içeren gerçek yaşam problemlerini çözebilme (Ders Kitabı 1. Kitap, Sayfa 62-113: Denizaltının mikroplastik araştırmasında dikey hareketi, Gençtürk ailesi enerji giderleri aylık değişimi, çok adımlı işlemlerde işlem önceliği).
2. MATEMATİKSEL GÖSTERİM VE KaTeX DESTEĞİ:
   - Kesirler, denklemler ve matematiksel semboller için standart KaTeX $...$ formatını kullanınız (Örn: $\\frac{3}{4}$, $\\left(-\\frac{3}{4}\\right) + \\left(+\\frac{1}{8}\\right) = -\\frac{5}{8}$, $|+10| = 10$, $-38\\text{ °C}$).
3. KABUL EDİLEBİLİR DENK ALTERNATİF CEVAPLAR (alternativeAnswers):
   - Matematiksel olarak birbirine denk olan doğru ifade biçimlerini (Örn: $-\\frac{5}{8}\\text{ km}$ ile $-0,625\\text{ km}$; $\\frac{26}{11}$ ile $2\\frac{4}{11}$; $+15\\text{ °C}$ ile $15$) "alternativeAnswers" dizisine ekleyiniz.
4. ANALİTİK VE ADIMLI RUBRİK:
   - Puanlama rubriğinde işlem/modelleme basamakları ve nihai doğru sonuç için ayrı puan kriterleri tanımlayınız.
` : '';

  const livePrompt = `SEN MEB TEMEL EĞİTİM GENEL MÜDÜRLÜĞÜ VE ÖDSGM ORTAK SINAVLAR BAŞUZMANISIN.
Aşağıdaki resmi senaryo kurallarına uygun olarak eksiksiz bir ${grade}. Sınıf ${subjectId} Ortak Yazılı Sınav Kağıdı üret.
TOPLAM SORU SAYISI: KESİNLİKLE VE TAM OLARAK ${targetCount} ADET AÇIK UÇLU SORU (1'den ${targetCount}'e kadar her soru eksiksiz üretilmelidir).

SENARYO RESMİ KAZANIM DAĞILIM PLANI (${targetCount} SORU):
${distributionsText}
${avoidDirectives}

ZORUNLU KAZANIM EŞLEŞMESİ (EN KATI VE DEĞİŞTİRİLEMEZ 1. KURAL):
- Sınavdaki Soru 1'den Soru ${targetCount}'e kadar HER BİR SORU, yukarıdaki dağılım tablosunda kendisine atanan [Kazanım Kodu] ve [Resmi Öğrenme Çıktısı] ile %100 BİRE BİR EŞLEŞMEK ZORUNDADIR!
- Sırayı ASLA bozma! Örneğin Dağılım planında Soru 4 için [Kazanım Kodu: FB.7.1.5] yazıyorsa, Soru 4 KESİNLİKLE FB.7.1.5 kazanımından sorulmalıdır. Asla FB.7.1.4, FB.7.2.2 veya başka bir kazanımdan soru üretilemez!
- Senaryoda yer almayan hiçbir kazanımdan soru üretilemez! Dağılım planındaki sıra ve kazanım kodları ASLA değiştirilemez!
- JSON çıktısında her sorunun 'outcome' alanına mutlaka dağılım planındaki ilgili sorunun resmi kazanım kodu (Örn: 'FB.7.1.5') yazılmalıdır.

ÖĞRENCİ YAŞ DÜZEYİNE UYGUN SADE VE AKICI TÜRKÇE (7. SINIF SEVİYESİ - EN KRİTİK PEDAGOJİK KURAL):
- Sorularda kullanılan dil, 12-13 yaşındaki bir ortaokul 7. sınıf öğrencisinin rahatlıkla, takılmadan anlayabileceği duru, yalın, açık ve anlaşılır bir Türkçe olmalıdır.
- Ağır akademik terminoloji, üniversite düzeyinde fizik/astronomi/biyoloji teorileri (örneğin pulsar, kuantum fiziği, ileri optik kırınım teorileri) KESİNLİKLE YASAKTIR.
- Soru kökleri, öncüller ve diyaloglar günlük hayatın içinden, öğrencinin yabancılık çekmeyeceği durumlar (ev yaşamı, spor, bisiklet sürmek, okul bahçesi, dağ gözlemevi, alışveriş sepeti, bahçe sulama vb.) üzerinden kurgulanmalıdır.
- Metinler gereksiz laf kalabalığından arındırılmalı, öğrencinin neyi çözeceği net ve samimi olmalıdır.

MEB ÖDSGM PEDAGOJİK ZORLUK DAĞILIMI (ÇAN EĞRİSİ - EN KRİTİK KURAL):
- Sınavdaki ${targetCount} sorunun zorluk derecesi MEB Ölçme ve Değerlendirme standartlarına TAM UYGUN olmalıdır:
  * Zorunlu Zorluk Dağılımı: ${difficultyPlanText}
  * ASLA eşit sayıda (örneğin 2 kolay, 2 orta, 2 zor gibi) dağıtım yapma! Sınavın omurgasını daima "Orta" düzey oluşturmalıdır.
  * "Basit Bilişsel Süreçler" etiketli kazanımlar "Kolay" veya "Orta" olmalıdır.
  * "Karmaşık Bilişsel Süreçler" etiketli kazanımlar "Orta" veya "Zor" olmalıdır.
  * Sınavın 1. sorusu öğrenciyi cesaretlendirmek için "Kolay" veya "Orta" olmalı; "Zor" soru sınavın sonuna doğru yerleştirilmelidir.

HER SORU İÇİN ZORUNLU BAĞLAM ÇEŞİTLİLİĞİ KURALI (EN KRİTİK KURAL):
- AYNI SINAV İÇİNDEKİ SORULARDA ASLA AYNI MEKÂN, AYNI ETKİNLİK VEYA AYNI BAĞLAMI TEKRARLAMA!
- Birden fazla sorunun "TÜBİTAK Bilim Fuarı / Şenliği", "Robotik Atölyesi" veya "Bilim Kulübü" gibi tek bir mekânda toplanması KESİNLİKLE YASAKTIR.
- Her sorunun kurgusu, mekânı, karakterleri ve gerçek yaşam olayı birbirinden TAMAMEN FARKLI alanlardan seçilmelidir:
  * Bir soru: Ev ekonomisi, mutfak, yemek tarifi, manav/market alışverişi veya aile bütçesi
  * Bir soru: Marangozluk atölyesi, mimari çizim, park peyzajı, ahşap zanaatı veya mobilya tasarımı
  * Bir soru: Spor sahası, atletizm koşu parkuru, bisiklet turu, dağcılık veya yüzme yarışı
  * Bir soru: Doğa ve çevre, baraj gölü su seviyesi, tarımsal damla sulama veya meteoroloji hava raporu
  * Bir soru: Okul kütüphanesi, arkeoloji müzesi, geleneksel el sanatları (ebru, çini, dokuma)
  * Bir soru: Şehir içi ulaşım ve trafik ışığı zamanlaması, güneş enerjisi santrali veya geri dönüşüm tesisi
- Karakter isimleri de her soruda değişmelidir (Örn: 1. soruda Elif ve Kerem, 2. soruda Marangoz Ahmet Usta, 3. soruda Zeynep ile Can, 4. soruda Çiftçi Hasan Bey...).

ÖNEMLİ MEBİ PEDAGOJİK KURALLARI:
1. DÜZ BİLGİ/TANIM KESİNLİKLE YASAKTIR. ("... nedir?", "... kim bulmuştur?" gibi ezber sorular sorulamaz).
2. Her soru mutlaka MEBİ'nin şu 7 şablonundan birine dayanmalıdır:
   - Durum & Özellik Matrisi (VAR/YOK tablosu)
   - Kurgusal Senaryo & Vaka İncelemesi
   - Öğrenci Tartışması & Yanılgı Tespiti
   - Hata Tespiti & Adım Analizi (İlk hata hangi adımda yapılmıştır?)
   - Dilemma (İkilem) ve Çözüm Değerlendirmesi
   - Empati & Cümle Dönüştürme
   - Metin İçi Delillendirme & Örtük Anlam
3. Toplam ${targetCount} sorunun puanları toplamı 100 olacak şekilde paylaştırılmalıdır.
4. ZORUNLU KAYNAK MATERYAL KURALI (EN KRİTİK KURAL - ASLA İHMAL EDİLEMEZ):
   - Eğer bir soru "metne göre", "metinden hareketle", "parçaya göre", "şiire göre", "tabloya göre", "grafiğe göre", "diyaloğa göre" veya "verilen duruma göre" kurgulanmışsa; O METNİN, TABLONUN VEYA DİYALOĞUN TAMAMI MUTLAKA "stimulus" ALANINA EKSİKSİZ VE DETAYLI YAZILMALIDIR!
   - ASLA "Metinde bir olay anlatılmaktadır", "Metinde zeytinyağı aşamaları anlatılmıştır" gibi 1 cümlelik soyut özetler YAZILAMAZ! Metin, öğrencinin soruda sorulan aşamaları, ana fikri, neden-sonuç ilişkisini bizzat metni okuyarak bulabileceği zenginlikte ve somutlukta (en az 2-4 cümlelik somut hikâye/olay örgüsü) yazılmalıdır.
   - Tablo sorularında veriler (satır ve sütunlar) mutlaka "stimulus" içinde verilmelidir.
   - Diyalog sorularında konuşan karakterlerin replikleri (Örn: Elif: "...", Kerem: "...") mutlaka "stimulus" içinde yer almalıdır.
   - Öğrenci kaynak metni/veriyi görmeden ASLA soruyu cevaplayamaz!
${turkishMebiDirectives}
${math7thDirectives}
ÇIKTI FORMATI:
SADECE geçerli bir JSON çıktısı ver. JSON şeması:
{
  "questions": [
    {
      "number": 1,
      "outcome": "Kazanım Kodu (Örn: MAT.7.1.1)",
      "outcomeTitle": "Resmi Öğrenme Çıktısı (Örn: Gerçek yaşam ya da matematiksel durumlarda doğal sayı, tam sayı ve rasyonel sayıları yorumlayabilme)",
      "difficulty": "Orta",
      "level": "Karmaşık Bilişsel Süreçler",
      "templateType": "Öğrenci Diyaloğu & Kavram Yanılgısı",
      "points": 15,
      "stimulus": "Diyalog veya vaka metni...",
      "question": "Açık uçlu soru...",
      "answer": "MEBİ model cevabı...",
      ${isGrade7Turkish ? `"alternativeAnswers": [
        "Kabul edilebilir alternatif örnek ifade 1",
        "Kabul edilebilir alternatif örnek ifade 2"
      ],` : ''}
      "rubric": [
        {"item": "Kriter 1", "pts": 8},
        {"item": "Kriter 2", "pts": 7}
      ]
    }
  ]
}`;

  const normalizeAndCalibrateQuestions = (questions: any[]): GeneratedQuestionItem[] => {
    const safeQuestions = Array.isArray(questions) ? [...questions] : [];

    // Eksik soru gelirse senaryo dağılımına göre eksik soruları tamamla
    if (safeQuestions.length < targetCount) {
      const missingCount = targetCount - safeQuestions.length;
      for (let m = 0; m < missingCount; m++) {
        const missingIdx = safeQuestions.length;
        const distItem = questionDistributions[missingIdx] || scenario.distributions[0];
        const reqOutcome = distItem.outcomeCode;
        const reqTitle = getOfficialOutcomeTitle(reqOutcome) || distItem.notes || 'MEBİ Öğrenme Çıktısı';
        const targetPts = pointAllocations[missingIdx] || 15;
        safeQuestions.push({
          number: missingIdx + 1,
          outcome: reqOutcome,
          outcomeTitle: reqTitle,
          difficulty: 'Orta',
          level: distItem.cognitiveLevel || 'Karmaşık Bilişsel Süreçler',
          templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
          points: targetPts,
          stimulus: `${reqTitle} ile ilgili günlük hayat durumu ve uygulama basamakları incelenmektedir.`,
          question: `${reqOutcome} [${reqTitle}] öğrenme çıktısına uygun olarak verilen durumu analitik olarak açıklayınız.`,
          answer: `Öğrencinin kavramsal ilkeleri doğru tespit etmesi ve mantıksal çözüm basamaklarını gerekçelendirmesi beklenir.`,
          solutionExplanation: `MEBİ analitik çözüm kuralına göre ${reqOutcome} çıktısı gerekçelendirilmelidir.`,
          rubric: [
            { item: 'Kavramsal teşhis ve bilimsel tespit', pts: Math.ceil(targetPts / 2) },
            { item: 'Analitik gerekçelendirme ve çözüm adımı', pts: Math.floor(targetPts / 2) }
          ]
        });
      }
    }

    const withTitles = safeQuestions.slice(0, targetCount).map((q, idx) => {
      const distItem = questionDistributions[idx] || scenario.distributions[0];
      const requiredOutcome = distItem.outcomeCode;
      const officialTitle = getOfficialOutcomeTitle(requiredOutcome) || distItem.notes || q.outcomeTitle || 'MEBİ Öğrenme Çıktısı';
      const targetPts = pointAllocations[idx] || q.points || 15;

      const rawRubric = (q.rubric || []).map((r: any) => ({
        criterion: r.item || r.criterion || 'Değerlendirme Ölçütü',
        points: r.pts ?? r.points
      }));

      const reconciled = reconcileRubricPoints(rawRubric, targetPts);

      const altAnswers = Array.isArray(q.alternativeAnswers)
        ? q.alternativeAnswers
            .filter((a: any) => typeof a === 'string' && a.trim().length > 0)
            .map((a: string) => a.trim())
        : undefined;

      return {
        ...q,
        number: idx + 1,
        outcome: requiredOutcome,
        outcomeTitle: officialTitle,
        cognitiveLevel: distItem.cognitiveLevel || q.level || 'Karmaşık Bilişsel Süreçler',
        points: targetPts,
        alternativeAnswers: altAnswers && altAnswers.length > 0 ? altAnswers : undefined,
        solutionExplanation: q.solutionExplanation || q.explanation || (q.answer ? `Analitik çözüm adımları ve gerekçe: ${q.answer}` : undefined),
        rubric: reconciled.map(r => ({ item: r.criterion, pts: r.points }))
      };
    });
    const calibrated = calibrateQuestionDifficulties(withTitles);
    const { enrichedQuestions } = validateAndEnrichExamQuestions(calibrated);
    return enrichedQuestions as GeneratedQuestionItem[];
  };

  let fallbackReason: string | undefined;

  // 1. TIER 1: Güvenli Sunucu Fonksiyonu Proxy (/api/generate)
  // Tüm yapay zekâ istekleri istemciden gizlenmiş sunucu tarafı Netlify Function üzerinden yürütülür.
  try {
    const proxyRes = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-App-Client': 'oyss-portal-v1'
      },
      body: JSON.stringify({
        prompt: livePrompt,
        variationIndex,
        variationToken
      })
    });

    if (proxyRes.ok) {
      const data = await proxyRes.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const cleanJson = rawText.replace(/```(?:json)?/gi, '').trim();
      let questionsList = data?.questions;

      if (!questionsList && cleanJson) {
        try {
          const parsed = JSON.parse(cleanJson);
          questionsList = parsed?.questions;
        } catch {
          // ignore
        }
      }

      if (questionsList && Array.isArray(questionsList) && questionsList.length > 0) {
        const normalized = normalizeAndCalibrateQuestions(questionsList);

        // Anti-duplication sanity check: Canlı Gemini çıktısının mevcut sınav sorularını birebir tekrarlamadığından emin ol
        const hasDirectDuplicate = normalized.some(nq =>
          isDuplicateOrTooSimilar(nq.question, nq.stimulus, allAvoidTexts, allAvoidStimuli, 0.45)
        );

        if (!hasDirectDuplicate) {
          const activeModelName = data?.activeModel || 'Gemini Akıllı Soru Motoru';
          const elapsedSec = Math.max(0.7, (Date.now() - startTime) / 1000).toFixed(1) + ' saniye';
          return {
            title: `${grade}. Sınıf ${scenario.name} (Özgün Sınav Seti - ${normalized.length} Soru)`,
            variationNumber: variationIndex + 1,
            generationTime: elapsedSec,
            model: `${activeModelName}`,
            isFallback: false,
            questionsCount: normalized.length,
            generatedQuestions: normalized,
            sourceValidationSummary: {
              isFullyValid: !normalized.some(q => q.hasMissingSourceError),
              missingSourceCount: normalized.filter(q => q.hasMissingSourceError).length,
              recoveredCount: normalized.filter(q => q.commonStimulus || q.sharedSourceId).length
            }
          };
        } else {
          console.warn('Canlı model çıktısında mevcut sınavla çakışan soru tespit edildi; yerel MEBİ özgünleştirme motoruna aktarılıyor.');
          fallbackReason = 'Canlı yapay zekâ çıktısı mevcut sınavla benzerlik gösterdiğinden yerel MEBİ özgünleştirme motoru devreye alındı.';
        }
      }
    } else {
      let errJson: any = null;
      try {
        errJson = await proxyRes.json();
      } catch {}

      if (proxyRes.status === 429) {
        fallbackReason = 'Yapay zekâ servisi kota sınırında (429 - Çok sık istek). Lütfen bir dakika sonra tekrar deneyiniz.';
      } else if (proxyRes.status === 502 || proxyRes.status === 503) {
        fallbackReason = 'Yapay zekâ servisi şu anda meşgul veya geçici olarak yanıt veremiyor (503).';
      } else {
        fallbackReason = errJson?.error || `Yapay zekâ servisi yanıt veremedi (HTTP ${proxyRes.status}).`;
      }
    }
  } catch (proxyErr: any) {
    console.warn('Sunucu proxy çağrısı başarısız, yerel yedek motora geçiliyor:', proxyErr?.message || proxyErr);
    fallbackReason = 'Canlı yapay zekâ servisiyle bağlantı kurulamadı (Ağ/Çevrimdışı).';
  }

  // 2. TIER 2: Prosedürel MEBİ Müfredat Motoru (Çevrimdışı / Güvenli Yedek)
  // Sunucu API yanıt veremediğinde veya bağlantı olmadığında devreye giren deterministik üretim motoru.
  const _cycle = variationIndex % 2;
  void _cycle;

  // ---------------------------------------------------------------------------
  // A. FEN BİLİMLERİ (Set A & Set B)
  // ---------------------------------------------------------------------------
  const fenQuestions_SetA: GeneratedQuestionItem[] = [
    {
      number: 1,
      outcome: 'FB.7.1.1',
      outcomeTitle: 'Gözlemevi yer seçimini etkileyen coğrafi ve atmosferik şartları analiz edebilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      templateType: 'Durum & Özellik Matrisi (VAR/YOK Tablosu)',
      points: pointAllocations[0] || 15,
      stimulus: `Doğu Anadolu Gözlemevi (DAG) projesinde üç farklı bölge araştırılmıştır:
Bölge 1: Erzurum Palandöken Zirvesi (3.170 m yükseklik)
Bölge 2: İstanbul Çamlıca Tepesi (268 m yükseklik)
Bölge 3: Antalya Bakırlıtepe (2.500 m TÜBİTAK Gözlemevi)`,
      question: `Aşağıdaki özelliklerin hangi bölgelerde sağlandığını "VAR" veya "YOK" yazarak doldurunuz:
a) Işık kirliliğinden ve şehir aydınlatmalarından tamamen uzak olma:
   • Bölge 1: ............ | Bölge 2: ............ | Bölge 3: ............
b) Neden büyük rasathaneler deniz seviyesindeki ovalara değil de yüksek dağ zirvelerine kurulur? Atmosfer kalınlığı ve hava kirliliği bakımından açıklayınız.`,
      answer: `a) Işık Kirliliğinden Uzak Olma:
• Bölge 1 (Palandöken): VAR | Bölge 2 (Çamlıca): YOK | Bölge 3 (Bakırlıtepe): VAR
b) Bilimsel Gerekçe: Yüksek dağ zirvelerinde atmosfer tabakası daha incedir, hava yoğunluğu ve nem düşüktür; ayrıca şehirlerin ışık, toz ve hava kirliliğinden uzaktır. Böylece uzaydan gelen ışık atmosferde daha az kırılır ve teleskoplar çok daha berrak görüntü çeker.`,
      rubric: [
        { item: 'Bölgelerin ışık kirliliği eşleştirmesinin doğru yapılması (VAR - YOK - VAR)', pts: Math.round((pointAllocations[0] || 15) * 0.4) },
        { item: 'Yüksek irtifada atmosferin inceliği ve nemin azlığının açıklanması', pts: Math.round((pointAllocations[0] || 15) * 0.3) },
        { item: 'Şehir ışık ve toz kirliliğinin engellenmesi gerekçesi', pts: Math.round((pointAllocations[0] || 15) * 0.3) }
      ]
    },
    {
      number: 2,
      outcome: 'FB.7.1.1',
      outcomeTitle: 'Optik ve uzay teleskoplarının gözlem avantajlarını karşılaştırabilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Öğrenci Diyaloğu & Kavram Yanılgısı',
      points: pointAllocations[1] || 15,
      stimulus: `Astronomi panosu hazırlayan ${name1} ve ${name2} uzay teleskopları hakkında tartışmaktadır:
${name1}: "Hubble ve James Webb gibi uzay teleskopları, yeryüzündeki dev gözlemevi teleskoplarından bile çok daha net ve kaliteli fotoğraflar çeker."
${name2}: "Bence uzayda olmasının bir farkı yoktur; yeryüzündeki teleskopların aynası biraz daha büyük yapılırsa uzaydakilerden her zaman daha net çeker."`,
      question: `${name1} ve ${name2}'nin açıklamalarını değerlendiriniz. Hangi öğrenci haklıdır? Uzay teleskoplarının Dünya atmosferinin olumsuz etkilerinden (ışık kırılması, hava kirliliği, bulutlar) neden etkilenmediğini açıklayınız.`,
      answer: `${name1} haklıdır. Çünkü Dünya atmosferindeki hava hareketleri, tozlar ve bulutlar uzaydan gelen ışığı kırıp dalgalandırarak görüntünün bulanıklaşmasına yol açar. Uzay teleskopları ise atmosferin dışında, uzay boşluğunda görev yaptığı için ışık hiçbir engelle karşılaşmadan doğrudan ve net olarak teleskoba ulaşır.`,
      rubric: [
        { item: `${name1}'in haklı olduğunun ve ${name2}'nin yanılgısının açıklanması`, pts: Math.round((pointAllocations[1] || 15) * 0.4) },
        { item: 'Dünya atmosferinin ışığı kırma ve görüntüyü bozma etkisinin belirtilmesi', pts: Math.round((pointAllocations[1] || 15) * 0.35) },
        { item: 'Uzay teleskoplarının atmosfer dışındaki avantajının açıklanması', pts: Math.round((pointAllocations[1] || 15) * 0.25) }
      ]
    },
    {
      number: 3,
      outcome: 'FB.7.1.3',
      outcomeTitle: 'Uzay araştırmalarının yol açabileceği problemleri çözebilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Çözüm Üretme',
      points: pointAllocations[2] || 15,
      stimulus: `Dünya'nın yörüngesinde görevini tamamlamış eski uydular, roket parçaları ve fırlatmalardan kalan binlerce metal atık saatte 28.000 kilometre gibi büyük bir hızla başıboş dolanmaktadır. Bu duruma 'Uzay Kirliliği' adı verilir.`,
      question: `a) Yörüngedeki bu uzay atıklarının halen görev yapmakta olan aktif uydular ve Uluslararası Uzay İstasyonu için oluşturduğu en büyük tehlikeyi açıklayınız.
b) Uzay kirliliğini azaltmak veya önlemek için bilim insanlarının uygulayabileceği bir çözüm önerisi yazınız.`,
      answer: `a) Tehlike: Uzay atıkları mermiden katbekat daha hızlı hareket ettiği için küçücük bir metal cıvata bile aktif bir uyduya çarptığında onu parçalayabilir ve kullanılmaz hale getirebilir.
b) Çözüm Önerisi: Görev süresi tükenen uydular kontrollü şekilde Dünya atmosferine yönlendirilerek sürtünmeyle yakılıp yok edilmeli veya robotik uzay araçlarıyla toplanarak temizlenmelidir.`,
      rubric: [
        { item: 'Yüksek hızdaki uzay atıklarının aktif uyduları parçalama tehlikesinin açıklanması', pts: Math.round((pointAllocations[2] || 15) * 0.5) },
        { item: 'Ömrü biten uyduları atmosferde kontrollü yakma veya temizleme çözüm önerisi', pts: Math.round((pointAllocations[2] || 15) * 0.5) }
      ]
    },
    {
      number: 4,
      outcome: 'FB.7.1.4',
      outcomeTitle: 'Yıldızların yaşam döngüsünü açıklayarak yapılandırabilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Bilimsel Çıkarım',
      points: pointAllocations[3] || 15,
      stimulus: `Yıldızlar uzaydaki gaz ve toz bulutlarının (bulutsu/nebula) bir araya gelip sıkışmasıyla doğar. Yıldızların ömrünün nasıl sonlanacağı ise başlangıç kütlelerinin büyüklüğüne bağlıdır.`,
      question: `a) Güneş'imiz küçük kütleli bir yıldız olduğuna göre, yakıtını tükettiğinde hangi aşamalardan geçerek neye dönüşecektir?
b) Başlangıç kütlesi Güneş'ten çok daha büyük olan dev yıldızların ömrünün sonunda geçirdiği şiddetli patlamaya ve geride bırakabileceği yapılara ne ad verilir?`,
      answer: `a) Güneş gibi küçük kütleli yıldızlar önce genişleyerek kırmızı dev aşamasına geçer, ardından dış katmanlarını uzaya salarak merkezinde beyaz cüce kalır.
b) Büyük kütleli yıldızlar ise süpernova patlaması geçirir ve geride nötron yıldızı veya kara delik bırakır.`,
      rubric: [
        { item: 'Küçük kütleli yıldızların kırmızı dev ve beyaz cüceye dönüşümünün doğru yazılması', pts: Math.round((pointAllocations[3] || 15) * 0.5) },
        { item: 'Büyük kütleli yıldızların süpernova patlaması ve nötron yıldızı/kara delik oluşturmasının belirtilmesi', pts: Math.round((pointAllocations[3] || 15) * 0.5) }
      ]
    },
    {
      number: 5,
      outcome: 'FB.7.1.5',
      outcomeTitle: 'Yıldız, galaksi ve evren kavramlarını açıklayarak yapılandırabilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      templateType: 'Kurgusal Vaka & Senaryo İncelemesi',
      points: pointAllocations[4] || 14,
      stimulus: `Galaksiler (gök adalar) milyarlarca yıldız, gaz ve toz bulutunun kütleçekimiyle bir arada tutulduğu devasa sistemlerdir. Şekillerine göre sarmal, eliptik ve düzensiz galaksi olmak üzere sınıflandırılırlar.`,
      question: `a) İçinde Dünya'mızın ve Güneş Sistemi'mizin de bulunduğu galaksinin adı ve şekil türü nedir?
b) Galaksimize en yakın olan büyük komşu sarmal galaksinin adı nedir?`,
      answer: `a) Galaksimizin adı 'Samanyolu Galaksisi'dir ve şekil olarak 'Sarmal Galaksi' türündedir.
b) Samanyolu'na en yakın büyük komşu galaksinin adı 'Andromeda Galaksisi'dir.`,
      rubric: [
        { item: 'Samanyolu Galaksisi ve Sarmal Galaksi türünün doğru yazılması', pts: Math.round((pointAllocations[4] || 14) * 0.5) },
        { item: 'Andromeda Galaksisi adının doğru belirtilmesi', pts: Math.round((pointAllocations[4] || 14) * 0.5) }
      ]
    },
    {
      number: 6,
      outcome: 'FB.7.2.1',
      outcomeTitle: 'Fiziksel anlamda yapılan işin bağlı olduğu faktörlere ilişkin bilimsel çıkarım yapabilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      points: pointAllocations[5] || 14,
      stimulus: `${name1}, okul binasında iki farklı durum gerçekleştirmiştir:
1. Durum: 10 kg ağırlığındaki okul çantasını sırtında taşıyarak düz yatay koridorda 20 metre yürümüştür.
2. Durum: Aynı çantayı kucağına alarak okul merdivenlerinden 2. kata (yukarıya) çıkarmıştır.`,
      question: `a) 1. ve 2. durumdan hangisinde YER ÇEKİMİ KUVVETİNE KARŞI fiziksel anlamda iş yapılmıştır? Nedenini yazınız.
b) 1. durumda yatay yolda yürürken neden yer çekimine karşı iş yapılmadığını kuvvet doğrultusu ile hareket yönü ilişkisiyle açıklayınız.`,
      answer: `a) Yalnızca 2. durumda yer çekimine karşı iş yapılmıştır. Çünkü çanta yukarı kaldırılırken yer çekimine zıt yönde yukarı doğru kuvvet uygulanmış ve çanta kuvvet doğrultusunda yukarı taşınmıştır.
b) 1. durumda ise çanta taşınırken uygulanan kuvvet yukarı yönlü, hareket ise yataydır. Kuvvet ile hareket doğrultusu birbirine dik olduğu için yer çekimi kuvveti doğrultusunda yol alınmamıştır ve iş yapılmaz.`,
      rubric: [
        { item: '2. durumda yer çekimine karşı iş yapıldığının doğru teşhisi', pts: Math.round((pointAllocations[5] || 14) * 0.4) },
        { item: '1. durumda kuvvet ile hareket doğrultusunun birbirine dik olması kuralının açıklanması', pts: Math.round((pointAllocations[5] || 14) * 0.6) }
      ]
    },
    {
      number: 7,
      outcome: 'FB.7.2.2',
      outcomeTitle: 'Kinetik ve potansiyel enerjiyi karşılaştırarak enerji dönüşümünü açıklayabilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Öğrenci Diyaloğu & Kavram Yanılgısı',
      points: pointAllocations[6] || 13,
      stimulus: `Parkta kaykay pistinde kayan ${name1}, pistin en üst noktasından (3 metre yükseklikten) harekete başlamış, en alt çukurdan hızla geçerek karşıdaki tepeye doğru çıkmıştır.`,
      question: `a) ${name1}'in çekim potansiyel enerjisinin en fazla olduğu ve kinetik enerjisinin en fazla olduğu noktaları belirleyiniz.
b) Pistin en üst noktasından en alt çukuruna doğru inerken enerjisinde gerçekleşen dönüşümü (hangi enerjinin hangi enerjiye dönüştüğünü) açıklayınız.`,
      answer: `a) Çekim Potansiyel Enerjisi: En üst tepe noktada en fazladır (çünkü yükseklik maksimumdur).
Kinetik Enerji: En alt çukurdan geçerken en fazladır (çünkü sürat maksimumdur).
b) Enerji Dönüşümü: Yukarıdan aşağıya inerken yükseklik azaldığı için çekim potansiyel enerjisi kinetik (hareket) enerjisine dönüşür.`,
      rubric: [
        { item: 'Potansiyel enerjinin tepede, kinetik enerjinin çukurda en fazla olduğunun tespiti', pts: Math.round((pointAllocations[6] || 13) * 0.5) },
        { item: 'Aşağı inişte çekim potansiyel enerjisinin kinetik enerjiye dönüştüğünün açıklanması', pts: Math.round((pointAllocations[6] || 13) * 0.5) }
      ]
    }
  ];

  const fenQuestions_SetB: GeneratedQuestionItem[] = [
    {
      number: 1,
      outcome: 'FB.7.1.1',
      outcomeTitle: 'Yapay uyduların görevlerini ve uzay araştırmalarındaki önemini açıklayabilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      templateType: 'Durum & Özellik Matrisi (Tik Tablosu)',
      points: pointAllocations[0] || 15,
      stimulus: `Türkiye'nin uzay filosunda yer alan uydular iki ana sınıfa ayrılır:
1. Haberleşme Uyduları (Türksat 5A, Türksat 5B) -> Yer sabit yörüngede (36.000 km) bulunur.
2. Gözlem ve Keşif Uyduları (Göktürk-1, İMECE) -> Alçak Dünya yörüngesinde (yaklaşık 700 km) bulunur.`,
      question: `a) İMECE gözlem uydusunun neden 36.000 km'ye değil de 700 km gibi alçak bir yörüngeye yerleştirildiğini fotoğraf çözünürlüğü ve detay yakalama bakımından açıklayınız.
b) Görevini tamamlayan ve uzayda kontrolsüz sürüklenen uyduların gelecekteki görevler için oluşturduğu tehlikeye ne ad verilir? Bir önlem öneriniz.`,
      answer: `a) Alçak İrtifa Gerekçesi: Yeryüzüne ne kadar yakın olunursa kameraların yeryüzünü santimetre hassasiyetinde yüksek çözünürlükle görüntülemesi o kadar kolaylaşır. 36.000 km'den detaylı arazi/tarım haritası çekmek optik olarak çok zordur.
b) Uzay Kirliliği: Bu cisimler uzay kirliliğine yol açar ve saatte binlerce km hızla dönerek aktif uydulara ya da uzay istasyonuna çarpabilir. Önlem: Ömrü biten uyduları kontrollü olarak Dünya atmosferine çekip yakmak veya mezarlık yörüngesine itmek.`,
      rubric: [
        { item: 'İMECE\'nin alçak yörünge seçimi ve çözünürlük ilişkisinin açıklanması', pts: Math.round((pointAllocations[0] || 15) * 0.5) },
        { item: 'Uzay kirliliği kavramı ve atmosferde yakma/itme çözüm önerisi', pts: Math.round((pointAllocations[0] || 15) * 0.5) }
      ]
    },
    {
      number: 2,
      outcome: 'FB.7.1.2',
      outcomeTitle: 'Çok kademeli roket teknolojisinin çalışma prensibini kütle ve itme kuvvetiyle modelleyebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Öğrenci Diyaloğu & Kavram Yanılgısı',
      points: pointAllocations[1] || 15,
      stimulus: `Uzay roketlerinin fırlatma anını izleyen ${name1} ve ${name2} roket kademelerini tartışmaktadır:
${name1}: "Roketlerin yükseldikçe parçalanıp yakıt depolarını denize bırakması büyük bir israftır. Tek parça devasa bir yakıt tankı yapılsaydı roket uzaya kadar hiç bölünmeden tek parça gidebilirdi."
${name2}: "Yanılıyorsun; boşalan dev metal depoları yukarı taşımak gereksiz ağırlık demektir. Boşalan kademeleri bırakmak roketin hafiflemesini ve kalan yakıtla çok daha yüksek ivmeye ulaşmasını sağlar."`,
      question: `${name1} ve ${name2}'nin açıklamalarını Newton'un hareket kanunları ve kütle-ivme ilişkisi bakımından değerlendiriniz. Hangi öğrenci haklıdır?`,
      answer: `${name2} haklıdır.
Fiziksel İlke: İvme = Kuvvet / Kütle (F = m · a). Roket yakıtını tükettiğinde boş metal tankların kütlesi rokete yük olur. Kademeler ayrılarak gereksiz kütle atıldığında geriye kalan roket çok hafifler; böylece roket motorlarının uyguladığı aynı itki kuvveti, hafifleyen kütleye çok daha büyük ivme kazandırarak yerçekiminden kaçış hızına ulaşılmasını sağlar.`,
      rubric: [
        { item: `${name2}'nin haklılığının gerekçesiyle tespiti`, pts: Math.round((pointAllocations[1] || 15) * 0.4) },
        { item: 'Kütlenin azalmasının ivmeyi artırdığı (F=m·a) ilkesinin açıklanması', pts: Math.round((pointAllocations[1] || 15) * 0.6) }
      ]
    },
    {
      number: 3,
      outcome: 'FB.7.1.3',
      outcomeTitle: 'Gelecekteki Ay üssü yerleşim planını uzay tehlikeleri bakımından analiz edebilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Dilemma (İkilem) & Çözüm Değerlendirme',
      points: pointAllocations[2] || 15,
      stimulus: `Ay yüzeyinde kurulacak ilk kalıcı insan kolonisi için iki yerleşke modeli tartışılmaktadır:
Model 1 (Açık Krater Tabanı): Ay yüzeyindeki düz bir kraterin ortasına cam kubbeli modüller kurmak (Güneş panelleriyle kesintisiz elektrik üretimi avantajı).
Model 2 (Lav Tüpü Mağarası): Ay'ın yüzeyinin metrelerce altındaki antik volkanik lav tüpü yeraltı mağaralarının içine yerleşmek.`,
      question: `Model 1 ve Model 2'yi Ay'da atmosfer bulunmaması nedeniyle oluşan "zararlı kozmik radyasyon", "aşırı sıcaklık farkı (-170°C ile +120°C)" ve "mikrogöktaşı çarpmaları" açısından karşılaştırınız. İnsan yaşamı için hangi model daha güvenlidir?`,
      answer: `Model 2 (Lav Tüpü Mağarası) insan biyolojisi için açık ara daha güvenlidir.
Bilimsel Gerekçeler:
1. Ay'da kalın bir atmosfer ve koruyucu manyetik alan olmadığından yüzey kesintisiz ölümcül kozmik radyasyona ve Güneş fırtınalarına maruz kalır. Metrelerce kalınlıktaki bazalt kaya tavanı doğal bir radyasyon zırhı sağlar.
2. Gece-gündüz arasındaki 300 derecelik ölümcül sıcaklık dalgalanması yeraltında sabit (-20°C civarında) dengeli bir iklim oluşturur.
3. Atmosferde yanmadan Ay'a çarpan mikrogöktaşlarına karşı lav tüpleri sığınak görevi görür.`,
      rubric: [
        { item: 'Model 2\'nin radyasyon zırhı gerekçesinin doğru açıklanması', pts: Math.round((pointAllocations[2] || 15) * 0.4) },
        { item: 'Sıcaklık dengesi ve mikrometeorit korumasının belirtilmesi', pts: Math.round((pointAllocations[2] || 15) * 0.35) },
        { item: 'Model 1\'in risklerinin (atmosfersizlik tehlikeleri) temellendirilmesi', pts: Math.round((pointAllocations[2] || 15) * 0.25) }
      ]
    },
    {
      number: 4,
      outcome: 'FB.7.1.4',
      outcomeTitle: 'Kara deliklerin yapısını kütleçekim kuvveti ve ışığın yakalanmasıyla açıklayabilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Kurgusal Tarihi Vaka & Bilimsel Çıkarım',
      points: pointAllocations[3] || 15,
      stimulus: `2019 yılında Olay Ufku Teleskobu (EHT), Dünya'dan 55 milyon ışık yılı uzaklıktaki M87 galaksisinin merkezindeki dev kara deliğin ilk fotoğrafını çekmiştir. Fotoğrafta merkezde kapkaranlık bir dairesel gölge ve etrafında parıldayan dönen bir gaz halkası görülmektedir.`,
      question: `a) Kara deliklerin merkezinin neden tamamen simsiyah göründüğünü ve hiçbir ışığın oradan kaçamadığını kütleçekim kuvvetiyle açıklayınız.
b) Etrafındaki halkanın neden çok parlak olduğunu maddenin çekim alanına kapılıp dönmesi (sürtünme ve enerji) ilkesiyle açıklayınız.`,
      answer: `a) Merkezdeki Karanlık: Kara delikler devasa bir kütlenin sonsuz yoğunlukta küçücük bir noktaya sıkışmasıyla oluşur. Kütleçekimi o kadar akılalmaz güçtedir ki saniyede 300.000 km hızla giden ışık dahi bu çekimden kurtulamaz. Geri yansıyan veya kaçan foton olmadığı için merkez simsiyah bir gölge olarak kalır.
b) Parlak Halka: Kara deliğin içine çekilmekte olan gaz ve toz bulutları olay ufku etrafında ışık hızına yakın süratle dönerken birbirine şiddetle sürtünür. Bu aşırı sürtünme milyonlarca derecelik ısı ve devasa X-ışını/görünür ışık enerjisi yayarak parlak bir akresyon diski oluşturur.`,
      rubric: [
        { item: 'Işığın kaçamaması ve kaçış hızının ışık hızını aşması açıklaması', pts: Math.round((pointAllocations[3] || 15) * 0.5) },
        { item: 'Dönen gazların sürtünmesi ve enerji yayımının modellenmesi', pts: Math.round((pointAllocations[3] || 15) * 0.5) }
      ]
    },
    {
      number: 5,
      outcome: 'FB.7.1.5',
      outcomeTitle: 'Işık yılı kavramını mesafe ölçümü ve evrenin geçmişine bakma ilkesiyle çözümleyebilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      points: pointAllocations[4] || 14,
      stimulus: `${name1}, bilim dergisinde "Güneş Sistemimize en yakın yıldız olan Proxima Centauri bize 4,2 ışık yılı uzaklıktadır." cümlesini okumuştur.
${name1}: "Demek ki Proxima Centauri yıldızı 4,2 yıl sonra sönecek, ışık yılı bir zaman birimidir." çıkarımını yapmıştır.`,
      question: `a) ${name1}'in kavram yanılgısını düzeltiniz. "Işık yılı" ne birimidir? Tanımını yazınız.
b) Bu yıldıza bugün teleskopla bakan bir astronomun aslında yıldızın hangi andaki durumunu gördüğünü zaman-mesafe ilişkisiyle açıklayınız.`,
      answer: `a) Işık yılı zaman birimi değil, astronomik bir UZAKLIK (MESAFE) birimidir. Tanımı: Işığın boşlukta 1 Dünya yılında (yaklaşık 9,46 trilyon kilometre) katettiği mesafedir.
b) Kozmik Zaman İlişkisi: Yıldızdan çıkan ışık ışınlarının Dünya'ya ulaşması tam 4,2 yıl sürer. Dolayısıyla teleskopla baktığımızda yıldızın bugünkü halini değil, tam 4,2 yıl önceki geçmiş durumunu görürüz.`,
      rubric: [
        { item: 'Işık yılının mesafe birimi olduğunun ve tanımının doğru yapılması', pts: Math.round((pointAllocations[4] || 14) * 0.5) },
        { item: 'Yıldızın 4,2 yıl önceki geçmiş halinin görüldüğü ilkesinin sunulması', pts: Math.round((pointAllocations[4] || 14) * 0.5) }
      ]
    },
    {
      number: 6,
      outcome: 'FB.7.2.1',
      outcomeTitle: 'Kuvvet, yol ve yerçekimine karşı yapılan işi hesaplayıp karşılaştırabilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      points: pointAllocations[5] || 14,
      stimulus: `Bir inşaat şantiyesinde 200 N ağırlığındaki harç torbası zemin kattan 3. kata (dikey 12 metre yukarı) iki farklı yöntemle taşınmıştır:
Yöntem 1: Elektrikli vinç torbayı sabit süratle doğrudan 12 metre yukarı çekmiştir.
Yöntem 2: Bir işçi torbayı sırtına alıp 20 metre uzunluğundaki eğik rampadan yürüyerek aynı 3. kata çıkarmıştır.`,
      question: `a) Yöntem 1'de vincin yerçekimine karşı yaptığı fiziksel iş kaç Joule'dür? Formülü yazıp hesaplayınız.
b) Sürtünmeler önemsenmediğinde işçinin rampa boyunca yerçekimine karşı yaptığı iş miktarı vincin yaptığı işten farklı mıdır? Nedenini potansiyel enerji değişimiyle açıklayınız.`,
      answer: `a) İş Formülü: İş (W) = Kuvvet (F) × Yol (Δx)
W = 200 N × 12 m = 2.400 Joule iş yapılmıştır.
b) İşler Eşittir (2.400 Joule).
Gerekçe: Yerçekimine karşı yapılan iş yalnızca cismin kazandığı düşey yükseklik farkına ve kütlesine (çekim potansiyel enerjisine: Ep = m·g·h) bağlıdır. Rampa yolu uzatsa ve gereken kuvveti azaltsa bile dikey kazanılan irtifa aynı (12 m) kaldığından yapılan toplam iş değişmez.`,
      rubric: [
        { item: 'Vincin yaptığı işin (2.400 J) formülle hatasız hesaplanması', pts: Math.round((pointAllocations[5] || 14) * 0.5) },
        { item: 'Rampa ile vincin yaptığı net yerçekimi işinin eşit olduğunun gerekçelendirilmesi', pts: Math.round((pointAllocations[5] || 14) * 0.5) }
      ]
    },
    {
      number: 7,
      outcome: 'FB.7.2.2',
      outcomeTitle: 'Hidroelektrik santrallerinde mekanik enerjinin elektrik enerjisine dönüşüm zincirini modelleyebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Öğrenci Diyaloğu & Kavram Yanılgısı',
      points: pointAllocations[6] || 13,
      stimulus: `Baraj gölünde tutulan suyun elektrik enerjisine dönüşüm aşamalarını şematize eden ${name1} ve ${name2} şu adımları yazmıştır:
Adım 1: Baraj gölünde yüksekte duran durgun su.
Adım 2: Kapaklar açıldığında borulardan aşağı büyük hızla çağlayan su.
Adım 3: Hızla akan suyun çarparak döndürdüğü dev türbin çarkları.
Adım 4: Türbine bağlı jeneratörün ürettiği elektrik akımı.`,
      question: `Her bir adımda (Adım 1 -> Adım 2 -> Adım 3 -> Adım 4) gerçekleşen enerji türlerini ve dönüşüm zincirini sırasıyla yazınız.`,
      answer: `Enerji Dönüşüm Zinciri:
• Adım 1: Çekim Potansiyel Enerjisi (Yüksekte depolanan suyun enerjisi)
• Adım 2: Kinetik Enerji (Aşağı akarken potansiyel enerji kinetik/hareket enerjisine dönüşür)
• Adım 3: Mekanik / Kinetik Enerji (Su kinetik enerjisini türbin çarklarının dönme hareketine aktarır)
• Adım 4: Elektrik Enerjisi (Jeneratör mıknatısları dönme mekanik enerjisini elektrik enerjisine çevirir).`,
      rubric: [
        { item: 'Adım 1 ve 2\'deki potansiyel -> kinetik dönüşümünün doğru yazılması', pts: Math.round((pointAllocations[6] || 13) * 0.5) },
        { item: 'Adım 3 ve 4\'teki kinetik/mekanik -> elektrik dönüşümünün hatasız belirtilmesi', pts: Math.round((pointAllocations[6] || 13) * 0.5) }
      ]
    }
  ];

  // ---------------------------------------------------------------------------
  // B. MATEMATİK (Set A & Set B) - MEB 7. SINIF MATEMATİK DERS KİTABI (1. KİTAP 1. TEMA)
  // ---------------------------------------------------------------------------
  const matQuestions_SetA: GeneratedQuestionItem[] = [
    {
      number: 1,
      outcome: 'MAT.7.1.1',
      outcomeTitle: 'Gerçek yaşam ya da matematiksel durumlarda doğal sayı, tam sayı ve rasyonel sayıları yorumlayabilme (Ders Kitabı 1. Kitap, Sayfa 17)',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      templateType: 'Görsel / Deney / Günlük Hayat Durumu',
      points: pointAllocations[0] || 15,
      stimulus: `ASELSAN'ın geliştirdiği Türkiye'nin ilk otonom su altı aracı olan Deringöz ile deniz altındaki keşif çalışmalarında deniz seviyesi $0\\text{ metre}$ referans kabul edilmiştir.
Deniz seviyesinin $8\\text{ metre}$ altındaki ($-8\\text{ m}$) Deringöz'ü kullanan bir araştırma ekibi, deniz yüzeyinin $10\\text{ metre}$ üstündeki ($+10\\text{ m}$) keşif gemisinin güvertesinden çalışmayı takip etmektedir.`,
      question: `a) Araştırma ekibinin bulunduğu nokta ile Deringöz arasındaki dikey mesafe farkını tam sayılarda çıkarma işlemi modelleyerek hesaplayınız.
b) Başlangıç noktasına (deniz seviyesine) olan mutlak uzaklıklarını mutlak değer sembolüyle ($|a|$) karşılaştırınız.`,
      answer: `a) Dikey Mesafe Farkı = $(+10) - (-8) = (+10) + (+8) = 18\\text{ metre}$'dir.
b) Mutlak Uzaklıklar: $|+10| = 10\\text{ m}$, $|-8| = 8\\text{ m}$. Araştırma ekibinin deniz seviyesine olan mutlak uzaklığı ($10\\text{ m}$), Deringöz'ün deniz seviyesine olan mutlak uzaklığından ($8\\text{ m}$) daha büyüktür ($10 > 8$).`,
      alternativeAnswers: [
        'a) 18 metre fark vardır [(+10) - (-8) = 18 m]. b) Araştırma ekibi 10 m, Deringöz 8 m uzaktadır; ekibin uzaklığı daha büyüktür.',
        'a) 18 m b) |+10| > |-8| (10 m > 8 m)'
      ],
      rubric: [
        { item: 'a şıkkında dikey fark işleminin [(+10) - (-8) = 18 m] doğru modellenmesi', pts: Math.round((pointAllocations[0] || 15) * 0.5) },
        { item: 'b şıkkında mutlak değer modellerinin (|10|=10, |-8|=8) ve karşılaştırmanın doğru yapılması', pts: (pointAllocations[0] || 15) - Math.round((pointAllocations[0] || 15) * 0.5) }
      ]
    },
    {
      number: 2,
      outcome: 'MAT.7.1.1',
      outcomeTitle: 'Doğal sayı ve tam sayı kavramlarını hava sıcaklığı verileriyle sayı doğrusunda yorumlayabilme (Ders Kitabı 1. Kitap, Sayfa 19)',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Durum & Özellik Matrisi (Tik Tablosu)',
      points: pointAllocations[1] || 15,
      stimulus: `Ocak ayının son gününde Türkiye'nin bazı illerinde beklenen en yüksek hava sıcaklıkları şöyledir:
• Antalya: $+12\\text{ °C}$
• Samsun: $+7\\text{ °C}$
• İstanbul: $+4\\text{ °C}$
• Afyon: $0\\text{ °C}$
• Ankara: $-1\\text{ °C}$
• Kars: $-4\\text{ °C}$
• Hakkâri: $-9\\text{ °C}$`,
      question: `a) Verilen sıcaklık değerlerinden doğal sayı olanları ve yalnızca tam sayı olup doğal sayı olmayanları ayrı ayrı belirleyiniz.
b) Ölçülen en yüksek sıcaklık ile en düşük sıcaklık arasındaki fark kaç $\\text{°C}$'dir? İşlemini yazınız.`,
      answer: `a) Doğal Sayı Olanlar: $+12, +7, +4, 0$ (Doğal sayılar kümesi $0$'dan başlayarak pozitif yöndedir).
Yalnızca Tam Sayı Olanlar (Negatifler): $-1, -4, -9$ (Doğal sayı değildir).
b) En yüksek: $+12\\text{ °C}$, En düşük: $-9\\text{ °C}$.
Sıcaklık Farkı = $(+12) - (-9) = (+12) + (+9) = 21\\text{ °C}$'dir.`,
      alternativeAnswers: [
        'a) Doğal sayılar: 0, 4, 7, 12; Yalnızca tam sayılar: -1, -4, -9. b) (+12) - (-9) = 21 °C fark vardır.',
        'a) Doğal: {0, 4, 7, 12}, Negatif tam sayı: {-1, -4, -9}. b) 21 °C'
      ],
      rubric: [
        { item: 'Doğal sayı olan ve olmayan sıcaklıkların eksiksiz sınıflandırılması', pts: Math.round((pointAllocations[1] || 15) * 0.5) },
        { item: 'Sıcaklık farkının [(+12) - (-9) = 21 °C] hatasız hesaplanması', pts: (pointAllocations[1] || 15) - Math.round((pointAllocations[1] || 15) * 0.5) }
      ]
    },
    {
      number: 3,
      outcome: 'MAT.7.1.2',
      outcomeTitle: 'Rasyonel sayıların ondalık ve devirli ondalık gösterimlerini belirleyebilme (Ders Kitabı 1. Kitap, Sayfa 41)',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      points: pointAllocations[2] || 15,
      stimulus: `Bir markette satılan bazı ürünlerin ölçüleri rasyonel sayı biçiminde etiketlenmiştir:
• Kutu sütün hacmi: $\\frac{1}{5}\\text{ L}$
• Küçük boy su şişesinin hacmi: $\\frac{1}{3}\\text{ L}$
• Madenî paranın kalınlığı: $\\frac{1}{4}\\text{ cm}$`,
      question: `a) Kutu süt ($\\frac{1}{5}$) ve küçük boy su şişesinin ($\\frac{1}{3}$) hacimlerini payı paydaya bölme yöntemiyle ondalık gösterim biçiminde yazınız.
b) Bu iki rasyonel sayıdan hangisinin 'sonlu ondalık', hangisinin 'devirli ondalık' olduğunu paydalarındaki asal çarpan kuralını açıklayarak belirtiniz.`,
      answer: `a) Bölme İşlemleri:
• Kutu Süt: $1 \\div 5 = 0,2\\text{ L}$
• Su Şişesi: $1 \\div 3 = 0,333... = 0,\\overline{3}\\text{ L}$
b) Asal Çarpan Kuralı ve Tür Belirleme:
Bir rasyonel sayı en sade halinde yazıldığında paydasında 2 ve 5 dışında başka bir asal çarpan yoksa 'sonlu ondalık', 2 ve 5 dışında en az bir asal çarpan (3, 7 vb.) varsa 'devirli ondalık' açılıma sahiptir.
• $\\frac{1}{5}$ kesrinin paydasında yalnızca 5 olduğu için SONLU ondalıktır ($0,2$).
• $\\frac{1}{3}$ kesrinin paydasında 3 asal çarpanı olduğu için DEVİRLİ ondalıktır ($0,\\overline{3}$).`,
      alternativeAnswers: [
        'a) 1/5 = 0,2 ve 1/3 = 0,333... = 0,\\bar{3}. b) 1/5 sonlu ondalık (paydada 5 var), 1/3 devirli ondalıktır (paydasında 3 asal çarpanı bulunduğu için).',
        'a) 0,2 ve 0,\\bar{3} b) Kutu süt sonlu, su şişesi devirli ondalıktır.'
      ],
      rubric: [
        { item: 'Ondalık gösterimlerin (0,2 ve 0,333... = 0,\\bar{3}) doğru bulunması', pts: Math.round((pointAllocations[2] || 15) * 0.5) },
        { item: 'Paydadaki asal çarpan kuralıyla sonlu ve devirli ondalık türlerinin gerekçelendirilmesi', pts: (pointAllocations[2] || 15) - Math.round((pointAllocations[2] || 15) * 0.5) }
      ]
    },
    {
      number: 4,
      outcome: 'MAT.7.1.2',
      outcomeTitle: 'Devirli ondalık gösterimleri rasyonel sayı biçiminde temsil edebilme (Ders Kitabı 1. Kitap, Sayfa 43)',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Hata Tespiti & Adım Analizi',
      points: pointAllocations[3] || 14,
      stimulus: `Bir hassas kuyumcu terazisinde bir gram altının saf kütlesi ekranda $2,\\overline{36}\\text{ g}$ ($2,363636...\\text{ g}$) olarak okunmuştur.`,
      question: `a) Bu devirli ondalık sayıyı rasyonel sayıya çevirme formülünü kullanarak kesir biçiminde yazınız.
b) Elde ettiğiniz rasyonel sayıyı en sade (pay ve paydası aralarında asal) kesir haline getiriniz.`,
      answer: `a) Devirli Ondalık Formülü:
$\\text{Rasyonel Kesir} = \\frac{\\text{Sayının Tamamı} - \\text{Devretmeyen Kısım}}{\\text{Devreden Kadar 9}} = \\frac{236 - 2}{99} = \\frac{234}{99}$
b) Sadeleştirme Basamakları:
234 ve 99 sayıları 9 ile sadeleştirilir:
$234 \\div 9 = 26$
$99 \\div 9 = 11$
En Sade Hali: $\\frac{26}{11}$ (veya $2\\frac{4}{11}$ tam sayılı kesir).`,
      alternativeAnswers: [
        'a) (236 - 2) / 99 = 234 / 99 b) 9 ile sadeleştirilerek 26 / 11 veya 2 tam 4/11.',
        'a) 234/99 b) 26/11'
      ],
      rubric: [
        { item: 'Devirli ondalık çevrim formülünün doğru uygulanarak 234/99 bulunması', pts: Math.round((pointAllocations[3] || 14) * 0.5) },
        { item: 'Kesrin 9 ile sadeleştirilerek en sade hali olan 26/11 (veya 2 tam 4/11) kesrinin elde edilmesi', pts: (pointAllocations[3] || 14) - Math.round((pointAllocations[3] || 14) * 0.5) }
      ]
    },
    {
      number: 5,
      outcome: 'MAT.7.1.3',
      outcomeTitle: 'Rasyonel sayıların karşılaştırma ve sıralama ilişkilerini yorumlayabilme (Ders Kitabı 1. Kitap, Sayfa 50)',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Öğrenci Diyaloğu & Kavram Yanılgısı',
      points: pointAllocations[4] || 14,
      stimulus: `Güneş sistemindeki iki gezegenin ortalama yüzey sıcaklıkları rasyonel sayılarla modellenmiştir:
• Mars: $-\\frac{125}{2}\\text{ °C}$
• Neptün: $-\\frac{401}{2}\\text{ °C}$`,
      question: `a) Mars ve Neptün'ün yüzey sıcaklıklarını rasyonel sayılarda karşılaştırma kurallarını kullanarak karşılaştırınız. Hangi gezegen daha sıcaktır?
b) Negatif rasyonel sayılarda sayı doğrusundaki konum ve sıfıra yakınlık ilkesini açıklayarak cevabınızı gerekçelendiriniz.`,
      answer: `a) Karşılaştırma: Paydaları eşit (2) olan negatif rasyonel sayılarda, payı daha büyük olan (sıfıra daha yakın olan) sayı daha büyüktür.
$-125 > -401$ olduğu için $-\\frac{125}{2} > -\\frac{401}{2}$'dir.
Bu nedenle Mars ($-\\frac{125}{2}\\text{ °C}$), Neptün'den daha sıcaktır.
b) Matematiksel Gerekçe: Negatif rasyonel sayılarda sayı doğrusunda sıfıra daha yakın olan sayı daha büyüktür. $-\\frac{125}{2} = -62,5$ sayısı sayı doğrusunda $-\\frac{401}{2} = -200,5$ sayısının daha sağında (sıfıra daha yakın) yer aldığı için daha büyük bir sıcaklık değerini temsil eder.`,
      alternativeAnswers: [
        'a) Mars daha sıcaktır (-125/2 > -401/2). b) Sayı doğrusunda -62,5 °C sıfıra daha yakın olduğu için -200,5 °C\'den daha büyüktür.',
        'a) Mars (-125/2 > -401/2) b) Negatif sayılarda sıfıra yakın olan sayı daha büyüktür.'
      ],
      rubric: [
        { item: 'Mars ve Neptün sıcaklıklarının doğru karşılaştırılarak Marsın daha sıcak olduğunun belirlenmesi', pts: Math.round((pointAllocations[4] || 14) * 0.5) },
        { item: 'Negatif rasyonel sayılarda sıfıra yakınlık kuralının sayı doğrusuyla gerekçelendirilmesi', pts: (pointAllocations[4] || 14) - Math.round((pointAllocations[4] || 14) * 0.5) }
      ]
    },
    {
      number: 6,
      outcome: 'MAT.7.1.3',
      outcomeTitle: 'Yarıma ve bütüne yakınlık stratejisi ile rasyonel sayıları sıralayabilme (Ders Kitabı 1. Kitap, Sayfa 52)',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Hata Tespiti & Adım Analizi',
      points: pointAllocations[4] || 14,
      stimulus: `Verilen rasyonel sayılar: $A = \\frac{7}{15}$, $B = \\frac{9}{10}$, $C = \\frac{4}{7}$.`,
      question: `A, B ve C rasyonel sayılarını payda eşitlemeden, 'yarıma ve bütüne yakınlık' stratejisini kullanarak küçükten büyüğe sıralayınız. Sıralamadaki mantığınızı açıklayınız.`,
      answer: `• $A = \\frac{7}{15}$: Yarım $7,5/15$ olduğu için A sayısı yarımdan küçüktür ($A < 1/2$).
• $C = \\frac{4}{7}$: Yarım $3,5/7$ olduğu için C sayısı yarımdan büyüktür ($C > 1/2$).
• $B = \\frac{9}{10}$: Bütüne ($1$ tam) sadece $1/10$ kalmıştır, 1'e çok yakındır.
Bu durumda sıralama: $A < C < B$ ($\\frac{7}{15} < \\frac{4}{7} < \\frac{9}{10}$) şeklindedir.`,
      alternativeAnswers: [
        'A yarımdan küçük (A < 0,5), C yarımdan büyük (C > 0,5), B bütüne yakındır. Sıralama: A < C < B veya 7/15 < 4/7 < 9/10.',
        '7/15 < 4/7 < 9/10 (Yarıma ve bütüne kıyasla: A < 1/2 < C < 1 < B).'
      ],
      rubric: [
        { item: 'A, B ve C kesirlerinin yarıma ve bütüne durumlarının doğru analiz edilmesi', pts: Math.round((pointAllocations[4] || 14) * 0.5) },
        { item: 'A < C < B sıralamasının hatasız yapılması', pts: (pointAllocations[4] || 14) - Math.round((pointAllocations[4] || 14) * 0.5) }
      ]
    },
    {
      number: 7,
      outcome: 'MAT.7.1.4',
      outcomeTitle: 'Rasyonel sayılar ve dikey hareket içeren gerçek yaşam problemlerini çözebilme (Ders Kitabı 1. Kitap, Sayfa 82)',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      points: pointAllocations[5] || 14,
      stimulus: `Bir araştırma denizaltısı, denizlerdeki mikroplastik kirliliğini incelemek için deniz seviyesinin $\\frac{3}{4}\\text{ km}$ altına inmiştir. Denizaltı daha sonra bulunduğu bu derinlikten $\\frac{1}{8}\\text{ km}$ yukarı çıkarak su numuneleri toplamıştır.`,
      question: `a) Deniz seviyesi $0$ referans kabul edildiğinde, denizaltının ilk inişini ve ardından yukarı çıkışını yönlü rasyonel sayılarla toplama işlemi olarak modelleyiniz.
b) Denizaltının son durumda deniz seviyesine göre konumunu rasyonel sayı ve ondalık gösterim biçiminde bulunuz.`,
      answer: `a) Matematiksel Modelleme:
• Deniz seviyesinin altına iniş: $-\\frac{3}{4}\\text{ km}$
• Yukarı çıkış: $+\\frac{1}{8}\\text{ km}$
Toplama İşlemi Modeli: $\\left(-\\frac{3}{4}\\right) + \\left(+\\frac{1}{8}\\right)$
b) İşlem Basamakları ve Çözüm:
Paydalar 8'de eşitlenir:
$-\\frac{3 \\times 2}{4 \\times 2} = -\\frac{6}{8}$
$\\left(-\\frac{6}{8}\\right) + \\left(+\\frac{1}{8}\\right) = \\frac{-6 + 1}{8} = -\\frac{5}{8}\\text{ km}$
Ondalık Gösterim: $-\\frac{5}{8} = -\\frac{5 \\times 125}{8 \\times 125} = -\\frac{625}{1000} = -0,625\\text{ km}$ (Deniz seviyesinin $0,625\\text{ km}$ altında).`,
      alternativeAnswers: [
        'a) (-3/4) + (+1/8) b) -5/8 km veya -0,625 km (Deniz seviyesinin 5/8 km altında).',
        'a) -3/4 + 1/8 b) -5/8 km (-0,625 km)'
      ],
      rubric: [
        { item: 'Dikey hareketin yönlü rasyonel sayılarla [(-3/4) + (+1/8)] doğru modellenmesi', pts: Math.round((pointAllocations[5] || 14) * 0.5) },
        { item: 'Payda eşitleme yapılarak sonucun -5/8 km (veya -0,625 km) olarak bulunması', pts: (pointAllocations[5] || 14) - Math.round((pointAllocations[5] || 14) * 0.5) }
      ]
    },
    {
      number: 8,
      outcome: 'MAT.7.1.4',
      outcomeTitle: 'Çok adımlı rasyonel işlemlerde işlem önceliği ve parantez kurallarını uygulayabilme (Ders Kitabı 1. Kitap, Sayfa 108)',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Hata Tespiti & Adım Analizi',
      points: pointAllocations[6] || 14,
      stimulus: `Matematik dersinde tahtaya yazılan $3 - \\left(\\frac{2}{5}\\right) \\div \\left(\\frac{4}{15}\\right)$ işlemini defterine çözen öğrenci şu adımları uygulamıştır:
1. Adım: Önce çıkarma işlemini yaparak: $3 - \\frac{2}{5} = \\frac{15}{5} - \\frac{2}{5} = \\frac{13}{5}$ bulmuştur.
2. Adım: Çıkan sonucu $\\frac{4}{15}$ kesrine bölmek için ters çevirip çarpmıştır: $\\left(\\frac{13}{5}\\right) \\times \\left(\\frac{15}{4}\\right)$.
3. Adım: Sadeleştirme yaparak: $\\frac{13 \\times 3}{4} = \\frac{39}{4}$ sonucuna ulaşmıştır.`,
      question: `a) Öğrencinin çözümü doğru mudur? Yanlış ise ilk hatayı hangi adımda yapmıştır? Nedenini işlem önceliği kuralıyla açıklayınız.
b) İşlemin doğru sonucunu işlem basamaklarını eksiksiz göstererek hesaplayınız.`,
      answer: `a) Öğrencinin çözümü YANLIŞTIR. İlk hatasını 1. Adımda yapmıştır.
Gerekçe: Matematikte işlem önceliği kuralına göre bölme işlemi, çıkarma işleminden önce yapılmalıdır. Öğrenci bölme işlemini beklemeden önce çıkarma yapmıştır.
b) Doğru Çözüm Basamakları:
1. Adım (Bölme): $\\left(\\frac{2}{5}\\right) \\div \\left(\\frac{4}{15}\\right) = \\left(\\frac{2}{5}\\right) \\times \\left(\\frac{15}{4}\\right) = \\frac{2 \\times 15}{5 \\times 4} = \\frac{30}{20} = \\frac{3}{2}$
2. Adım (Çıkarma): $3 - \\frac{3}{2} = \\frac{6}{2} - \\frac{3}{2} = \\frac{3}{2}$ (veya $1\\frac{1}{2}$, $1,5$).`,
      alternativeAnswers: [
        'a) Yanlıştır, 1. adımda hata yapılmıştır (işlem önceliği kuralına göre bölme çıkarmadan önce yapılmalıdır). b) Doğru sonuç: 3/2 veya 1 tam 1/2 (1,5).',
        'a) 1. adımda işlem önceliği hatası b) 3/2 (1,5)'
      ],
      rubric: [
        { item: 'İlk hatanın 1. adımda işlem önceliği kuralı ihlalinden kaynaklandığının gerekçelendirilmesi', pts: Math.round((pointAllocations[6] || 14) * 0.5) },
        { item: 'Doğru işlem sırası (önce bölme sonra çıkarma) izlenerek 3/2 (veya 1,5) sonucunun bulunması', pts: (pointAllocations[6] || 14) - Math.round((pointAllocations[6] || 14) * 0.5) }
      ]
    }
  ];

  const matQuestions_SetB: GeneratedQuestionItem[] = [
    {
      number: 1,
      outcome: 'MAT.7.1.1',
      outcomeTitle: 'Tam sayılarda borç ve harçlık yönetimini yönlü sayılarla modelleyebilme (Ders Kitabı 1. Kitap, Sayfa 18)',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      points: pointAllocations[0] || 15,
      stimulus: `Bir okulda 7. sınıf öğrencisi olan Mert'e ailesi bütçe yönetimini öğrenmesi için dijital bir harçlık kartı vermiştir.
Kartına her hafta başında ailesi tarafından $300\\text{ TL}$ yüklenen Mert, hafta boyunca okul kırtasiyesinden ve kantinden toplam $360\\text{ TL}$ harcama yapmıştır.`,
      question: `a) Mert'in kartındaki bakiye değişimini yönlü tam sayılarla çıkarma veya toplama işlemi olarak modelleyiniz.
b) Hafta sonunda kartın son bakiyesini tam sayıyla ifade edip borç/alacak durumunu açıklayınız.`,
      answer: `a) Matematiksel Modelleme: $(+300) - (+360) = (+300) + (-360) = -60\\text{ TL}$.
b) Hafta sonu kart bakiyesi $-60\\text{ TL}$'dir. Bu durum Mert'in kartının $60\\text{ TL}$ eksi bakiyede (borçta) olduğunu gösterir.`,
      alternativeAnswers: [
        'a) (+300) - 360 = -60 TL b) Bakiye -60 TL\'dir (60 TL borç bulunmaktadır).',
        'a) 300 - 360 = -60 b) -60 TL bakiye'
      ],
      rubric: [
        { item: 'Harcama ve bakiye değişiminin [(+300) - (+360) = -60 TL] doğru modellenmesi', pts: Math.round((pointAllocations[0] || 15) * 0.5) },
        { item: 'Sonucun -60 TL borç olarak gerekçelendirilmesi', pts: (pointAllocations[0] || 15) - Math.round((pointAllocations[0] || 15) * 0.5) }
      ]
    },
    {
      number: 2,
      outcome: 'MAT.7.1.1',
      outcomeTitle: 'Mutlak değer ile hedef sapma miktarı analizi (Ders Kitabı 1. Kitap, Sayfa 114)',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      points: pointAllocations[1] || 15,
      stimulus: `Bir doğa fotoğrafçısı, makro lensiyle bir laleyi fotoğraflamak için kamerasını $90\\text{ cm}$ uzaklığa odaklamıştır. Rüzgâr nedeniyle lale sallanmış ve kaydedilen 3 fotoğrafta mesafe şöyle olmuştur:
• 1. Kare: $84\\text{ cm}$
• 2. Kare: $96\\text{ cm}$
• 3. Kare: $92\\text{ cm}$`,
      question: `a) Her üç karenin $90\\text{ cm}$ odak uzaklığına göre sapma miktarlarını mutlak değer matematiksel modeliyle ($|x - 90|$) gösteriniz.
b) Hangi karenin en net fotoğraf olduğunu mutlak sapma değerine göre gerekçelendiriniz.`,
      answer: `a) Mutlak Sapma Modelleri:
• 1. Kare: $|84 - 90| = |-6| = 6\\text{ cm}$ sapma
• 2. Kare: $|96 - 90| = |+6| = 6\\text{ cm}$ sapma
• 3. Kare: $|92 - 90| = |+2| = 2\\text{ cm}$ sapma
b) En Net Fotoğraf: 3. karedir ($92\\text{ cm}$). Çünkü mutlak sapma değeri ($2\\text{ cm}$) diğer karelerin sapmasından ($6\\text{ cm}$) daha küçüktür ($2 < 6$); yani hedeflenen $90\\text{ cm}$ odak uzaklığına en yakındır.`,
      alternativeAnswers: [
        'a) 1. kare: 6 cm, 2. kare: 6 cm, 3. kare: 2 cm. b) 3. kare en nettir çünkü odak noktasına sapması en azdır (2 cm < 6 cm).',
        'a) |-6|=6, |+6|=6, |+2|=2 b) 3. kare (sapma 2 cm)'
      ],
      rubric: [
        { item: 'Üç karenin mutlak değer sapma modellerinin (|84-90|=6, |96-90|=6, |92-90|=2) doğru yazılması', pts: Math.round((pointAllocations[1] || 15) * 0.5) },
        { item: 'En küçük mutlak sapmaya sahip 3. karenin en net fotoğraf olduğunun açıklanması', pts: (pointAllocations[1] || 15) - Math.round((pointAllocations[1] || 15) * 0.5) }
      ]
    },
    {
      number: 3,
      outcome: 'MAT.7.1.2',
      outcomeTitle: 'Su sayacı bölmelerini denk kesir ve ondalık gösterimle ilişkilendirebilme (Ders Kitabı 1. Kitap, Sayfa 26)',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      templateType: 'Görsel / Deney / Günlük Hayat Durumu',
      points: pointAllocations[2] || 15,
      stimulus: `Bir okulda düzenlenen 'Su Tasarrufu Etkinliği'nde öğrencilere dijital su sayaçları verilmiştir:
• Beyza'nın su sayacında yer alan 6 eşit bölmeden 3'ü doludur.
• Yağmur'un su sayacında yer alan 8 eşit bölmeden 4'ü doludur.`,
      question: `a) Beyza ve Yağmur'un sayaçlarındaki doluluk oranlarını rasyonel sayı olarak yazıp en sade hallerine getiriniz.
b) Bu iki doluluk oranının ondalık gösterimlerini bulunuz ve denk kesir olup olmadıklarını açıklayınız.`,
      answer: `a) Doluluk Rasyonel Kesirleri:
• Beyza: $\\frac{3}{6} = \\frac{3 \\div 3}{6 \\div 3} = \\frac{1}{2}$
• Yağmur: $\\frac{4}{8} = \\frac{4 \\div 4}{8 \\div 4} = \\frac{1}{2}$
b) Ondalık Gösterim: $\\frac{1}{2} = \\frac{1 \\times 5}{2 \\times 5} = \\frac{5}{10} = 0,5$.
Açıklama: Her iki kesrin de en sade hali $\\frac{1}{2}$ ve ondalık değeri $0,5$ çıktığı için bu iki doluluk oranı birbirine DENK kesirlerdir.`,
      alternativeAnswers: [
        'a) Beyza: 3/6 = 1/2, Yağmur: 4/8 = 1/2. b) 0,5\'tir; en sade halleri eşit olduğu için denk kesirlerdir.',
        'a) 1/2 ve 1/2 b) 0,5 (denk kesirlerdir)'
      ],
      rubric: [
        { item: '3/6 ve 4/8 kesirlerinin sadeleştirilerek 1/2 olarak bulunması', pts: Math.round((pointAllocations[2] || 15) * 0.5) },
        { item: '0,5 ondalık değerinin ve denk kesir olduklarının doğru açıklanması', pts: (pointAllocations[2] || 15) - Math.round((pointAllocations[2] || 15) * 0.5) }
      ]
    },
    {
      number: 4,
      outcome: 'MAT.7.1.2',
      outcomeTitle: 'Devirli ondalık gösterimleri uzun bölme yöntemiyle belirleyebilme (Ders Kitabı 1. Kitap, Sayfa 43)',
      difficulty: 'Orta',
      level: 'Basit Bilişsel Süreçler',
      templateType: 'Hata Tespiti & Adım Analizi',
      points: pointAllocations[3] || 14,
      stimulus: `$\\frac{5}{6}$ rasyonel sayısı ondalık gösterime dönüştürülmek istenmektedir.`,
      question: `$\\frac{5}{6}$ rasyonel sayısını payı paydaya bölme yöntemiyle ondalık açılım biçiminde yazınız. Hangi basamağın devrettiğini devir çizgisiyle gösteriniz.`,
      answer: `Uzun Bölme İşlemi:
$5$'in içinde $6$ yoktur, bölüme $0,$ yazılır.
$50$'de $6$ sekiz defa ($8 \\times 6 = 48$), kalan $2$.
$20$'de $6$ üç defa ($3 \\times 6 = 18$), kalan $2$.
$20$'de $6$ üç defa ($3 \\times 6 = 18$), kalan $2$...
Kalan sürekli $2$ olarak tekrar ettiği için 3 basamağı devreder.
Sonuç: $0,8333... = 0,8\\overline{3}$'tür (Sadece 3'ün üzerinde devir çizgisi bulunur).`,
      alternativeAnswers: [
        '5/6 = 0,8333... = 0,8\\bar{3} (Yalnızca 3 devreder).',
        '0,8\\bar{3}'
      ],
      rubric: [
        { item: 'Uzun bölme işlem basamaklarının doğru kurulması', pts: Math.round((pointAllocations[3] || 14) * 0.5) },
        { item: '0,8\\bar{3} gösteriminin ve devreden basamağın (3) hatasız belirlenmesi', pts: (pointAllocations[3] || 14) - Math.round((pointAllocations[3] || 14) * 0.5) }
      ]
    },
    {
      number: 5,
      outcome: 'MAT.7.1.3',
      outcomeTitle: 'Futbol ligi averaj tablosunda negatif rasyonel sayıları sıralayabilme (Ders Kitabı 1. Kitap, Sayfa 51)',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Durum & Özellik Matrisi (Tik Tablosu)',
      points: pointAllocations[4] || 14,
      stimulus: `Bir okul futbol turnuvasında dört takımın averaj değerleri şöyledir:
• A Takımı: $-3$
• B Takımı: $+2$
• C Takımı: $-7$
• D Takımı: $0$`,
      question: `a) Dört takımın averajlarını sayı doğrusundaki yerlerini dikkate alarak küçükten büyüğe sıralayınız.
b) Negatif averajlarda mutlak değerce büyük olan sayının neden daha küçük kabul edildiğini açıklayınız.`,
      answer: `a) Sıralama: $-7 < -3 < 0 < +2$ (Takımlar: C Takımı < A Takımı < D Takımı < B Takımı).
b) Gerekçe: Sayı doğrusunda sıfırın solunda kalan negatif sayılarda sıfırdan uzaklaştıkça sayı küçülür. $-7$ sayısı sayı doğrusunda $-3$'ün daha solunda kaldığı için daha küçük bir averajı ifade eder.`,
      alternativeAnswers: [
        'a) -7 < -3 < 0 < +2 (C < A < D < B) b) Sayı doğrusunda daha solda olan sayı daha küçüktür.',
        'a) C Takımı < A Takımı < D Takımı < B Takımı b) -7 sıfırdan daha uzakta ve soldadır.'
      ],
      rubric: [
        { item: 'Averaj sıralamasının (-7 < -3 < 0 < +2) doğru yapılması', pts: Math.round((pointAllocations[4] || 14) * 0.5) },
        { item: 'Sayı doğrusunda sola gidildikçe negatif sayıların küçüleceğinin açıklanması', pts: (pointAllocations[4] || 14) - Math.round((pointAllocations[4] || 14) * 0.5) }
      ]
    },
    {
      number: 6,
      outcome: 'MAT.7.1.3',
      outcomeTitle: 'Negatif rasyonel sayıların sayı doğrusunda karşılaştırılması (Ders Kitabı 1. Kitap, Sayfa 52)',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Öğrenci Diyaloğu & Kavram Yanılgısı',
      points: pointAllocations[4] || 14,
      stimulus: `Tahtadaki $-\\frac{2}{3}$, $-\\frac{5}{6}$ ve $-\\frac{7}{12}$ rasyonel sayılarını küçükten büyüğe sıralamak isteyen iki öğrenci tartışmaktadır:
Öğrenci 1: "Paydaları 12'de eşitlersek $-\\frac{8}{12}$, $-\\frac{10}{12}$ ve $-\\frac{7}{12}$ olur. Payı büyük olan daha büyük olduğu için sıralama $-\\frac{7}{12} < -\\frac{8}{12} < -\\frac{10}{12}$ olmalıdır."
Öğrenci 2: "Negatif sayılarda sayı doğrusunda sıfırdan en uzakta ve en solda olan sayı en küçüktür. $-10$ sayısı $-7$'den küçük olduğu için en küçük kesir $-\\frac{10}{12}$'dir."`,
      question: `Hangi öğrencinin açıklaması doğrudur? Rasyonel sayıların doğru küçükten büyüğe sıralamasını yazınız.`,
      answer: `Öğrenci 2 haklıdır.
Gerekçe: Negatif sayılarda mutlak değeri büyük olan sayı, sayı doğrusunda sıfırın daha solunda kaldığı için daha küçüktür ($-10 < -8 < -7$).
Doğru Sıralama:
$-\\frac{10}{12} < -\\frac{8}{12} < -\\frac{7}{12}$
Orijinal halleriyle: $-\\frac{5}{6} < -\\frac{2}{3} < -\\frac{7}{12}$.`,
      alternativeAnswers: [
        'Öğrenci 2 haklıdır. Doğru sıralama: -5/6 < -2/3 < -7/12 (-10/12 < -8/12 < -7/12).',
        '2. öğrenci haklıdır (-5/6 < -2/3 < -7/12).'
      ],
      rubric: [
        { item: "Öğrenci 2'nin haklı olduğunun tespiti ve gerekçelendirilmesi", pts: Math.round((pointAllocations[4] || 14) * 0.5) },
        { item: 'Doğru sıralamanın (-5/6 < -2/3 < -7/12) eksiksiz yazılması', pts: (pointAllocations[4] || 14) - Math.round((pointAllocations[4] || 14) * 0.5) }
      ]
    },
    {
      number: 7,
      outcome: 'MAT.7.1.4',
      outcomeTitle: 'Enerji giderlerindeki aylık değişimi tam sayı ve rasyonel işlemlerle çözebilme (Ders Kitabı 1. Kitap, Sayfa 62)',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      points: pointAllocations[5] || 14,
      stimulus: `Gençtürk ailesi bir ay boyunca enerji tasarrufu tedbirleri uygulamıştır:
• Elektrik tüketiminde tasarruf sağlayarak faturada $+140\\text{ TL}$ tasarruf elde etmişlerdir.
• Ancak aynı ay sert kış koşulları sebebiyle doğalgazda $-260\\text{ TL}$ ek tüketim gideri oluşmuştur.`,
      question: `a) Gençtürk ailesinin aylık toplam enerji bütçesindeki değişimi yönlü tam sayılarla işlem kurarak hesaplayınız.
b) Elde ettiğiniz sonucun ailenin toplam giderini nasıl etkilediğini açıklayınız.`,
      answer: `a) Bütçe Değişim İşlemi:
$(+140) + (-260) = -120\\text{ TL}$
b) Değerlendirme: Sonuç $-120\\text{ TL}$ çıktığı için Gençtürk ailesinin enerji giderlerinde net $120\\text{ TL}$'lik bir artış (ek masraf) meydana gelmiştir.`,
      alternativeAnswers: [
        'a) (+140) + (-260) = -120 TL b) Ailenin gideri net 120 TL artmıştır (120 TL ek masraf).',
        'a) 140 - 260 = -120 TL b) 120 TL ek gider'
      ],
      rubric: [
        { item: 'Toplama işleminin [(+140) + (-260) = -120 TL] doğru kurulması ve hesaplanması', pts: Math.round((pointAllocations[5] || 14) * 0.5) },
        { item: 'Negatif sonucun 120 TL ek masraf olarak doğru yorumlanması', pts: (pointAllocations[5] || 14) - Math.round((pointAllocations[5] || 14) * 0.5) }
      ]
    },
    {
      number: 8,
      outcome: 'MAT.7.1.4',
      outcomeTitle: 'Rasyonel sayılarda bölme ve kesim problemi (Ders Kitabı 1. Kitap, Sayfa 84)',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      points: pointAllocations[6] || 14,
      stimulus: `Bir marangoz $180\\text{ cm}$ uzunluğundaki bir ahşap çıtayı, her birinin uzunluğu $7\\frac{1}{2}\\text{ cm}$ olan eşit parçalara ayırmak istemektedir. Her bir kesim işlemi $15\\text{ saniye}$ sürmektedir.`,
      question: `a) Bu çıtadan kaç adet parça elde edilir? İşlemini gösteriniz.
b) Tüm kesim işlemlerinin toplamda kaç saniye süreceğini hesaplayınız. (Parça sayısı ile kesim sayısı arasındaki ilişkiye dikkat ediniz).`,
      answer: `a) Parça Sayısı:
$7\\frac{1}{2} = \\frac{15}{2}\\text{ cm}$
$\\text{Parça Sayısı} = 180 \\div \\frac{15}{2} = 180 \\times \\frac{2}{15} = 12 \\times 2 = 24\\text{ adet parça}$.
b) Toplam Süre:
24 parça elde etmek için $24 - 1 = 23\\text{ kesim}$ yapılır.
$\\text{Toplam Süre} = 23 \\times 15 = 345\\text{ saniye}$ sürer ($5\\text{ dakika } 45\\text{ saniye}$).`,
      alternativeAnswers: [
        'a) 180 / (15/2) = 24 parça. b) 24 parça için 23 kesim yapılır; 23 x 15 = 345 saniye (5 dk 45 sn).',
        'a) 24 parça b) 345 saniye (23 kesim)'
      ],
      rubric: [
        { item: 'a şıkkında rasyonel bölme ile 24 parça sonucunun bulunması', pts: Math.round((pointAllocations[6] || 14) * 0.5) },
        { item: 'b şıkkında kesim sayısının (24 - 1 = 23) alınıp 345 saniyenin hatasız hesaplanması', pts: (pointAllocations[6] || 14) - Math.round((pointAllocations[6] || 14) * 0.5) }
      ]
    }
  ];

  const matQuestions_SetAlgebra: GeneratedQuestionItem[] = [
    {
      number: 1,
      outcome: 'MAT.7.2.1',
      outcomeTitle: 'Cebirsel ifadeleri modelleyerek toplama/çıkarma işlemlerini geometrik çevreyle ilişkilendirebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      points: 15,
      stimulus: `Bir okul bahçesine yapılacak dikdörtgen şeklindeki basketbol sahasının kenar uzunlukları:
Uzun Kenar: $(5x + 3)\\text{ metre}$
Kısa Kenar: $(2x - 1)\\text{ metre}$ olarak projelendirilmiştir.
Sahanın çevresine güvenlik amacıyla 2 sıra koruyucu şerit çekilecektir.`,
      question: `a) Basketbol sahasının 1 turluk çevresini x cinsinden en sade cebirsel ifade olarak bulunuz.
b) $x = 6\\text{ metre}$ için çekilecek 2 sıra koruyucu şeridin toplam uzunluğunun kaç metre olduğunu hesaplayınız.`,
      answer: `a) Çevre = $2 \\times [(5x + 3) + (2x - 1)] = 2 \\times (7x + 2) = 14x + 4\\text{ metre}$.
b) $x = 6$ için 1 tur = $14(6) + 4 = 88\\text{ m}$. 2 sıra şerit: $88 \\times 2 = 176\\text{ metre}$.`,
      alternativeAnswers: ['a) 14x + 4 b) 176 metre'],
      rubric: [
        { item: '1 turluk çevre cebirsel ifadesinin (14x + 4) doğru bulunması', pts: 8 },
        { item: 'x = 6 konularak 2 sıra için 176 m sonucunun elde edilmesi', pts: 7 }
      ]
    },
    {
      number: 2,
      outcome: 'MAT.7.2.2',
      outcomeTitle: 'Birinci dereceden bir bilinmeyenli denklem kurarak para ve adet problemlerini çözebilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Dilemma (İkilem) & Denklem Çözümü',
      points: 15,
      stimulus: `Kumbarasında sadece $5\\text{ TL}$ ve $10\\text{ TL}$'lik madenî paralar biriktiren öğrencinin kumbarasında toplam 30 adet madenî para bulunmaktadır.
Kumbaradaki paraların toplam parasal değeri $220\\text{ TL}$'dir.`,
      question: `a) $10\\text{ TL}$'lik madenî paraların sayısına "x" diyerek toplam parasal değeri veren birinci dereceden bir bilinmeyenli denklemi kurunuz.
b) Denklemi çözerek kumbarada kaç adet $5\\text{ TL}$ ve kaç adet $10\\text{ TL}$ olduğunu bulunuz.`,
      answer: `a) $10x + 5(30 - x) = 220$
b) $10x + 150 - 5x = 220 \\Rightarrow 5x = 70 \\Rightarrow x = 14$ adet ($10\\text{ TL}$).
$5\\text{ TL}$ sayısı = $30 - 14 = 16\\text{ adet}$.`,
      alternativeAnswers: ['a) 10x + 5(30-x) = 220 b) 14 adet 10 TL, 16 adet 5 TL'],
      rubric: [
        { item: 'Denklemin [10x + 5(30 - x) = 220] hatasız kurulması', pts: 8 },
        { item: 'x = 14 (10 TL) ve 16 adet 5 TL olduğunun doğru hesaplanması', pts: 7 }
      ]
    }
  ];
  // ---------------------------------------------------------------------------
  // C-1. 5. SINIF TÜRKÇE (Set A: Deniz Feneri Bekçisi & Yardımlaşma)
  // ---------------------------------------------------------------------------
  const turkceQuestions_5th_SetA: GeneratedQuestionItem[] = [
    {
      number: 1,
      outcome: 'T.O.5.6',
      outcomeTitle: 'Metnin yüzey anlamını belirleyebilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[0] || 15,
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      stimulus: `Karadeniz kıyısındaki sarp kayalıkların üzerinde yükselen fenerin bekçisi Hasan Dede, elli yıldır her akşam gün batarken fenerin dev lambasını yakardı. Fırtınalı gecelerde gözünü bile kırpmaz, dalgaların arasında yolunu bulmaya çalışan balıkçı takalarını emniyetle limana ulaştırmak için ışığı yönlendirirdi. Köyün gençleri ona 'denizin gözü' derdi.`,
      question: `Metne göre fener bekçisi Hasan Dede'nin balıkçıları emniyetle limana ulaştırmak için fırtınalı gecelerde yaptığı fedakârlığı açıklayınız.`,
      answer: `Hasan Dede elli yıl boyunca her akşam gün batımında feneri yakmış; fırtınalı gecelerde gözünü dahi kırpmadan fenerin ışığını yönlendirerek balıkçı teknelerinin kayalıklara çarpmadan emniyetle limana sığınmasını sağlamıştır.`,
      alternativeAnswers: [
        'Fırtınalı havalarda hiç uyumadan fenerin ışığını dalgaların arasındaki balıkçı takalarına doğrultarak onların güvenle karaya varmasını sağlamasıdır.',
        'Denizin ortasındaki teknelerin kayalıklara çarpmaması için uykusuz kalarak fener ışığıyla onlara yol göstermesidir.'
      ],
      rubric: [
        { item: "Hasan Dede'nin uykusuz kalarak feneri yönlendirdiğinin belirtilmesi", pts: Math.round((pointAllocations[0] || 15) * 0.5) },
        { item: 'Balıkçıların güvenle limana ulaşmasını sağlama amacının yazılması', pts: Math.round((pointAllocations[0] || 15) * 0.5) }
      ]
    },
    {
      number: 2,
      outcome: 'T.O.5.7',
      outcomeTitle: 'Görselle iletilen anlamı belirleyebilme',
      difficulty: 'Orta',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[1] || 15,
      templateType: 'Görsel Yorumlama & İleti Çıkarımı',
      stimulus: `[Görsel Açıklaması: Afişin üst tarafında karanlık ve hırçın dalgalar arasında yol alan küçük bir balıkçı teknesi, arka planda ise sarp kayalıklardan gökyüzüne uzanan parlak beyaz bir fener ışığı demeti yer almaktadır. Afişin altında büyük harflerle 'Karanlığa Değil, Umuda Bak!' sloganı yazılıdır.]`,
      question: `Yukarıda betimlenen afişteki 'hırçın dalgalar' ve 'fener ışığı' arasındaki tezatlıktan (karşıtlıktan) hareketle verilmek istenen ana iletiyi açıklayınız.`,
      answer: `Afişteki hırçın dalgalar hayatta karşılaşılan zorlukları, fırtınaları ve tehlikeleri simgelerken fener ışığı ise rehberliği, umudu ve dayanışmayı temsil etmektedir. Verilmek istenen mesaj; en zor anlarda bile karamsarlığa kapılmamak ve doğru yol göstericilere güvenmektir.`,
      alternativeAnswers: [
        'Zorluklar ve engeller karşısında umutsuzluğa kapılmayıp rehberliğin ve umudun aydınlığına tutunmak gerektiği anlatılmaktadır.',
        'Fırtınalı dalgalar hayatın zorluklarını, fener ışığı ise güveni ve kurtuluşu ifade eder.'
      ],
      rubric: [
        { item: 'Dalga ve fener ışığı sembollerinin karşıtlığının doğru yorumlanması', pts: Math.round((pointAllocations[1] || 15) * 0.5) },
        { item: 'Afişin ana iletisinin (umudu kaybetmeme / yol göstericiye güvenme) yazılması', pts: Math.round((pointAllocations[1] || 15) * 0.5) }
      ]
    },
    {
      number: 3,
      outcome: 'T.O.5.20',
      outcomeTitle: 'Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme',
      difficulty: 'Orta',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[2] || 15,
      templateType: 'Kelime Anlamı & Bağlamsal Çözümleme',
      stimulus: `Hasan Dede, yeni yetişen genç kaptanlara denizin şakaya gelmeyeceğini, her zaman 'ihtiyatlı' davranmaları gerektiğini öğütlerdi. Yılların tecrübesiyle 'engin' suların huyunu bir kitap gibi okurdu.`,
      question: `a) Metindeki altı çizili 'ihtiyatlı' ve 'engin' sözcüklerinin anlamlarını bağlamdan hareketle yazınız.
b) Bu iki sözcüğü anlamına uygun birer cümlede kullanınız.`,
      answer: `a) İhtiyatlı: Tedbirli, dikkatli, ileriyi düşünerek hareket eden. Engin: Ucu bucağı görünmeyecek kadar geniş, açık deniz.
b) Örnek cümleler: 'Buzlu yollarda ihtiyatlı adım atmak gerekir.' / 'Gemi engin maviliklere doğru yol aldı.'`,
      alternativeAnswers: [
        'İhtiyatlı: Sakıngan ve tedbirli davranan. Engin: Uçsuz bucaksız deniz veya derinlik.',
        'İhtiyatlı: Her türlü tehlikeye karşı önceden önlem alan kimse.'
      ],
      rubric: [
        { item: "'İhtiyatlı' ve 'engin' kelimelerinin bağlama uygun anlamının tespiti", pts: Math.round((pointAllocations[2] || 15) * 0.5) },
        { item: 'Her iki kelimenin doğru birer cümlede kullanılması', pts: Math.round((pointAllocations[2] || 15) * 0.5) }
      ]
    },
    {
      number: 4,
      outcome: 'T.Y.5.13',
      outcomeTitle: 'Yazısını zenginleştirecek biçimde söz varlığını kullanabilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[3] || 15,
      templateType: 'Deyim ve Zengin Söz Varlığıyla Yazma',
      stimulus: `Köy halkı, fener bekçisi Hasan Dede'nin yarım asırlık emeğine teşekkür etmek için bir anma etkinliği düzenlemiştir.`,
      question: `Hasan Dede'nin fedakârlığını ve fenerin önemini anlatan; içinde 'kol kanat germek' ve 'göz nuru dökmek' deyimlerinin geçtiği anlamlı ve kurallı bir paragraf yazınız.`,
      answer: `Hasan Dede, elli yıl boyunca bu fenerde gecesini gündüzüne katarak göz nuru dökmüştür. Her fırtınada limana sığınan balıkçılara kol kanat germiş, onları karanlık sulardan esirgeyerek yuvalarına sağ salim kavuşturmuştur.`,
      alternativeAnswers: [
        'Fenerin ışığı altında yıllarca göz nuru döken Hasan Dede, zor durumda kalan herkese kol kanat gererek köyün en büyük güvencesi olmuştur.'
      ],
      rubric: [
        { item: "'Göz nuru dökmek' ve 'kol kanat germek' deyimlerinin anlamına uygun kullanılması", pts: Math.round((pointAllocations[3] || 15) * 0.5) },
        { item: 'Metin bağlamına uygun kurallı ve akıcı paragraf yazımı', pts: Math.round((pointAllocations[3] || 15) * 0.5) }
      ]
    },
    {
      number: 5,
      outcome: 'T.Y.5.16',
      outcomeTitle: 'Yazım ve noktalama işaretleriyle ilgili kuralları uygulayabilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[4] || 14,
      templateType: 'Hata Tespiti & Düzeltme',
      stimulus: `Hasan dede, 15 temmuz akşamı karadeniz'in serin sularına bakarak torununa şöyle dedi; Deniz insanı terbiye eder oğlum.`,
      question: `Yukarıdaki cümlede yer alan büyük harflerin yazımı ve noktalama işaretleriyle ilgili yapılan 3 hatayı belirleyip cümlenin doğru halini yeniden yazınız.`,
      answer: `Hatalar:
1. 'Hasan dede' ifadesindeki 'Dede' lakap/saygı sözü olduğu için 'Dede' şeklinde büyük harfle yazılmalıdır.
2. '15 temmuz' belirli bir tarih bildirdiği için ay adı 'Temmuz' şeklinde büyük harfle yazılmalıdır.
3. Konuşma bildiren 'dedi' sözcüğünden sonra noktalı virgül (;) değil İKİ NOKTA (:) kullanılmalıdır.
Doğrusu: 'Hasan Dede, 15 Temmuz akşamı Karadeniz'in serin sularına bakarak torununa şöyle dedi: Deniz insanı terbiye eder oğlum.'`,
      alternativeAnswers: [
        'Dede kelimesinin büyük yazılması, Temmuz ay adının büyük harfle başlaması ve noktalı virgül yerine iki nokta konulması.'
      ],
      rubric: [
        { item: 'Büyük harf ve noktalama hatalarının doğru tespit edilmesi', pts: Math.round((pointAllocations[4] || 14) * 0.5) },
        { item: 'Cümlenin kurallara uygun hatasız biçimde yeniden yazılması', pts: Math.round((pointAllocations[4] || 14) * 0.5) }
      ]
    },
    {
      number: 6,
      outcome: 'T.O.5.8',
      outcomeTitle: 'Metindeki çıkarımları ve örtük anlamı belirleyebilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[5] || 13,
      templateType: 'Metin İçi Delillendirme & Örtük Anlam',
      stimulus: `Fırtına dindiğinde köylüler limana koştu. Hasan Dede'nin fener lambasını söndürüp kulübesinin önündeki eski tahta sandalyeye oturarak derin bir nefes aldığını ve hafifçe gülümsediğini gördüler.`,
      question: `Hasan Dede'nin fırtına dindikten sonra derin bir nefes alıp gülümsemesindeki duyguyu ve örtük anlamı metinden hareketle açıklayınız.`,
      answer: `Hasan Dede, bütün gece gösterdiği çabanın ve uykusuz nöbetin ardından balıkçıların hiçbir zarar görmeden kıyıya ulaştığını bilmenin getirdiği büyük bir vicdani huzur, rahatlama ve görevini yapmış olmanın mutluluğunu yaşamaktadır.`,
      alternativeAnswers: [
        'Bütün teknelerin sağ salim limana dönmesiyle içindeki endişenin yerini derin bir huzur ve görevini tamamlamış olmanın kıvancına bıraktığı anlaşılmaktadır.'
      ],
      rubric: [
        { item: 'Vicdani huzur ve rahatlama duygusunun doğru tespiti', pts: Math.round((pointAllocations[5] || 13) * 0.5) },
        { item: 'Teknelerin kurtulmuş olmasının gerekçe olarak sunulması', pts: Math.round((pointAllocations[5] || 13) * 0.5) }
      ]
    },
    {
      number: 7,
      outcome: 'T.O.5.21',
      outcomeTitle: 'Deyim ve atasözlerinin metnin anlamına katkısını belirleyebilme',
      difficulty: 'Orta',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[6] || 13,
      templateType: 'Deyim ve Atasözü Analizi',
      stimulus: `Köyün ihtiyar balıkçısı Hasan Dede'ye sarılarak: "Sen bizim fırtınada limanımız, zor günümüzde sığınağımız oldun. 'Dost kara günde belli olur' atasözünü bize her fırtınada yeniden yaşattın." demiştir.`,
      question: `Metinde geçen "Dost kara günde belli olur" atasözünün metne kattığı anlamı Hasan Dede'nin eylemleriyle ilişkilendirerek açıklayınız.`,
      answer: `Gerçek dostluğun ve insan sevgisinin sadece sakin ve güzel günlerde değil; tehlikeli, fırtınalı ve zor zamanlarda yapılan fedakârlıklarla kanıtlandığını ifade eder. Hasan Dede de balıkçılar için bu zor günün gerçek ve sarsılmaz dostu olmuştur.`,
      alternativeAnswers: [
        'Zor ve tehlikeli zamanlarda insanların birbirine sahip çıkması gerektiği, Hasan Dede\'nin de fırtınalı gecelerde köylülere can yoldaşı olduğu vurgulanmaktadır.'
      ],
      rubric: [
        { item: 'Atasözünün anlamının doğru açıklanması', pts: Math.round((pointAllocations[6] || 13) * 0.5) },
        { item: "Hasan Dede'nin fırtınadaki yardımlarıyla bağ kurulması", pts: Math.round((pointAllocations[6] || 13) * 0.5) }
      ]
    }
  ];

  // ---------------------------------------------------------------------------
  // C-2. 5. SINIF TÜRKÇE (Set B: Avanoslu Çömlek Ustası & Emek)
  // ---------------------------------------------------------------------------
  const turkceQuestions_5th_SetB: GeneratedQuestionItem[] = [
    {
      number: 1,
      outcome: 'T.O.5.6',
      outcomeTitle: 'Metnin yüzey anlamını belirleyebilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[0] || 15,
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      stimulus: `Kızılırmak'ın kırmızı killi toprağını atölyesinde yoğuran Salih Usta, ayakla dönen çarkın başına geçti. Küçük bir kil parçasını ellerinin arasında nazikçe yükseltirken çırağına döndü: 'Toprak sabırsızlığı sevmez evlat, parmaklarının ucuyla dinleyeceksin onu. Acele edersen çatlar, emek verirsen vazo olur.' dedi.`,
      question: `Metne göre Salih Usta'nın toprağı şekillendirirken çırağına sabırlı olmayı öğütlemesinin nedenini metinden hareketle açıklayınız.`,
      answer: `Salih Usta'ya göre killi toprak sabırsızlığı kabul etmez; aceleyle şekillendirilmeye çalışılırsa çatlar ve bozulur. Yalnızca sevgi, dikkat ve sabırla emek verildiğinde sağlam bir vazoya dönüşebilir.`,
      alternativeAnswers: [
        'Acele davranıldığında toprağın çatlayıp bozulacağı, ancak sabır ve emekle parmak uçlarıyla dinlenerek şekil alabileceği için çırağına sabırlı olmasını öğütlemiştir.'
      ],
      rubric: [
        { item: 'Acele edildiğinde toprağın çatlayıp bozulacağı gerekçesinin yazılması', pts: Math.round((pointAllocations[0] || 15) * 0.5) },
        { item: 'Sabır ve emekle sanat eserine dönüşeceği fikrinin açıklanması', pts: Math.round((pointAllocations[0] || 15) * 0.5) }
      ]
    },
    {
      number: 2,
      outcome: 'T.O.5.7',
      outcomeTitle: 'Görselle iletilen anlamı belirleyebilme',
      difficulty: 'Orta',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[1] || 15,
      templateType: 'Görsel Yorumlama & İleti Çıkarımı',
      stimulus: `[Görsel Açıklaması: Bir el sanatları afişinde, sol tarafta çatlamış ve dağılmış kuru bir çamur yığını, sağ tarafta ise üzerinde geleneksel lale motifleri parıldayan zarif bir porselen vazo resmedilmiştir. Ortada bir kum saati ve altında 'Emek ve Zaman, Çamuru Sanata Dönüştürür' sloganı bulunmaktadır.]`,
      question: `Afişteki 'dağılmış çamur' ile 'işlenmiş vazo' arasındaki dönüşümü kum saati sembolüyle ilişkilendirerek afişin vermek istediği mesajı açıklayınız.`,
      answer: `Ham çamurun paha biçilmez bir sanat eserine dönüşmesi için zamana ve sabırla gösterilen emeğe ihtiyaç vardır. Kum saati sabırlı bekleyişi ve zamanı, işlenmiş vazo ise bu sürecin sonunda elde edilen başarıyı simgeler.`,
      alternativeAnswers: [
        'Ham maddelerin değerli bir esere dönüşmesi için sabırla çalışmak ve zamana ihtiyaç duymak gerektiği anlatılmaktadır.'
      ],
      rubric: [
        { item: 'Kum saati ve dönüşüm ilişkisinin doğru açıklanması', pts: Math.round((pointAllocations[1] || 15) * 0.5) },
        { item: 'Emek ve sabrın değeri mesajının eksiksiz yazılması', pts: Math.round((pointAllocations[1] || 15) * 0.5) }
      ]
    },
    {
      number: 3,
      outcome: 'T.O.5.20',
      outcomeTitle: 'Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme',
      difficulty: 'Orta',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[2] || 15,
      templateType: 'Kelime Anlamı & Bağlamsal Çözümleme',
      stimulus: `Salih Usta, atölyesinde toprağı 'maharetli' elleriyle yoğurur, fırında pişen kapların 'ahenkli' renklerini hayranlıkla incelerdi.`,
      question: `a) Altı çizili 'maharetli' ve 'ahenkli' kelimelerinin metindeki anlamlarını yazınız.
b) Bu kelimelerin yerine kullanılabilecek birer eş anlamlı sözcük yazınız.`,
      answer: `a) Maharetli: Becerikli, usta, elinden iş gelen. Ahenkli: Uyumlu, birbiriyle dengeli ve güzel görünen.
b) Eş anlamlıları: Maharetli -> Becerikli / Usta; Ahenkli -> Uyumlu.`,
      alternativeAnswers: [
        'Maharetli: İşi ustalıkla yapan, hünerli. Ahenkli: Renkleri ve çizgileri birbiriyle uyum içinde olan.'
      ],
      rubric: [
        { item: "'Maharetli' ve 'ahenkli' sözcüklerinin anlamlarının doğru tespiti", pts: Math.round((pointAllocations[2] || 15) * 0.5) },
        { item: 'Her iki kelime için uygun eş anlamlıların yazılması', pts: Math.round((pointAllocations[2] || 15) * 0.5) }
      ]
    },
    {
      number: 4,
      outcome: 'T.Y.5.13',
      outcomeTitle: 'Yazısını zenginleştirecek biçimde söz varlığını kullanabilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[3] || 15,
      templateType: 'Deyim ve Zengin Söz Varlığıyla Yazma',
      stimulus: `Salih Usta'nın çırağı Kerem, ilk vazosunu tamamladığında ustasının yanına heyecanla gelmiştir.`,
      question: `Kerem'in çömlek yaparken harcadığı çabayı ve başarısını anlatan; içinde 'alın teri dökmek' ve 'canla başla çalışmak' deyimlerinin yer aldığı kısa bir metin yazınız.`,
      answer: `Kerem, günlerdir çarkın başında canla başla çalışarak kili şekillendirmeye gayret etti. Döktüğü her damla alın teri, fırından çıkan pürüzsüz vazonun üzerinde bir gurur madalyası gibi parıldıyordu.`,
      alternativeAnswers: [
        'İlk eserini ortaya koymak için günlerce alın teri döken Kerem, ustasının dediklerini uygulayarak canla başla çalıştı ve vazosunu başarıyla tamamladı.'
      ],
      rubric: [
        { item: "'Alın teri dökmek' ve 'canla başla çalışmak' deyimlerinin bağlama uygun kullanımı", pts: Math.round((pointAllocations[3] || 15) * 0.5) },
        { item: 'Anlamlı ve tutarlı kurgusal metin oluşturma', pts: Math.round((pointAllocations[3] || 15) * 0.5) }
      ]
    },
    {
      number: 5,
      outcome: 'T.Y.5.16',
      outcomeTitle: 'Yazım ve noktalama işaretleriyle ilgili kuralları uygulayabilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[4] || 14,
      templateType: 'Hata Tespiti & Düzeltme',
      stimulus: `Salih Usta çırağına sordu; Nevşehir'deki atölyemizde üretilen kaplar, ankara ve istanbul'a da gönderilecek mi.`,
      question: `Yukarıdaki cümlede büyük harflerin yazımı ve noktalama işaretleriyle ilgili yapılan 3 hatayı düzeltiniz ve cümlenin doğru şeklini yazınız.`,
      answer: `Hatalar:
1. Konuşma bildiren 'sordu' sözcüğünden sonra noktalı virgül (;) değil İKİ NOKTA (:) konmalıdır.
2. 'ankara ve istanbul' özel isim oldukları için büyük harfle 'Ankara ve İstanbul' şeklinde başlamalı ve gelen ekler kesme işaretiyle ayrılmalıdır (İstanbul'a).
3. Soru anlamı taşıyan cümlenin sonuna nokta (.) değil SORU İŞARETİ (?) konmalıdır.
Doğrusu: Salih Usta çırağına sordu: Nevşehir'deki atölyemizde üretilen kaplar, Ankara ve İstanbul'a da gönderilecek mi?`,
      alternativeAnswers: [
        'Noktalı virgül yerine iki nokta konulmalı, Ankara ve İstanbul büyük harfle yazılmalı, cümlenin sonuna soru işareti getirilmelidir.'
      ],
      rubric: [
        { item: 'İki nokta, büyük harf ve soru işareti hatalarının doğru tespiti', pts: Math.round((pointAllocations[4] || 14) * 0.5) },
        { item: 'Cümlenin imla kurallarına uygun hatasız yazılması', pts: Math.round((pointAllocations[4] || 14) * 0.5) }
      ]
    }
  ];

  // ---------------------------------------------------------------------------
  // C-3. 5. SINIF TÜRKÇE (Set C: Okul Botanik Bahçesi & Doğa)
  // ---------------------------------------------------------------------------
  const turkceQuestions_5th_SetC: GeneratedQuestionItem[] = [
    {
      number: 1,
      outcome: 'T.O.5.6',
      outcomeTitle: 'Metnin yüzey anlamını belirleyebilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[0] || 15,
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      stimulus: `Okul bahçesinin atıl köşesini yeşertmek isteyen 5. sınıf öğrencileri, fen öğretmenleriyle birlikte bir botanik serası kurdular. Her öğrenci evinden getirdiği tohumları saksılara ekti, nöbetleşe sulama takvimi hazırladılar. Kurak geçen günlerde damla sulama borularını elleriyle döşeyerek tek bir damla suyun bile boşa gitmesini engellediler.`,
      question: `Metne göre öğrencilerin kurak günlerde fidanları yaşatmak ve suyu korumak için aldıkları somut önlemi yazınız.`,
      answer: `Öğrenciler kurak günlerde tek bir damla suyun bile israf olmasını önlemek için elleriyle damla sulama boruları döşemiş ve nöbetleşe sulama takvimi uygulayarak fidanları korumuşlardır.`,
      alternativeAnswers: [
        'Damla sulama sistemi borularını kendileri döşeyerek su israfını engellemişler ve nöbetleşe sulama yapmışlardır.'
      ],
      rubric: [
        { item: 'Damla sulama sisteminin döşenmesi önleminin yazılması', pts: Math.round((pointAllocations[0] || 15) * 0.5) },
        { item: 'Suyun israfını engelleme ve nöbetleşe bakım bilincinin açıklanması', pts: Math.round((pointAllocations[0] || 15) * 0.5) }
      ]
    },
    {
      number: 2,
      outcome: 'T.O.5.7',
      outcomeTitle: 'Görselle iletilen anlamı belirleyebilme',
      difficulty: 'Orta',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[1] || 15,
      templateType: 'Görsel Yorumlama & İleti Çıkarımı',
      stimulus: `[Görsel Açıklaması: Bir çevre koruma afişinde, bir musluktan damlayan tek bir su damlasının içinde yeşeren küçük bir meşe fidanı resmi bulunmaktadır. Afişin sağ tarafında 'Bir Damla Su, Bir Orman Hayat' sloganı yer almaktadır.]`,
      question: `Afişteki su damlasının içinde filizlenen fidan görselinden hareketle afişin vermek istediği temel düşünceyi açıklayınız.`,
      answer: `Küçük görünen tek bir su damlasının bile bir fidanın büyümesi ve gelecekte büyük bir ormana dönüşmesi için hayati değer taşıdığı, bu yüzden her damla suyun korunması gerektiği vurgulanmaktadır.`,
      alternativeAnswers: [
        'En küçük su tasarrufunun bile canlıların yaşamı ve doğanın yeşermesi için çok kıymetli olduğu anlatılmaktadır.'
      ],
      rubric: [
        { item: 'Su damlası ve fidan ilişkisinin doğru çözümlenmesi', pts: Math.round((pointAllocations[1] || 15) * 0.5) },
        { item: 'Su tasarrufu ve doğayı koruma ana fikrinin yazılması', pts: Math.round((pointAllocations[1] || 15) * 0.5) }
      ]
    },
    {
      number: 3,
      outcome: 'T.O.5.20',
      outcomeTitle: 'Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme',
      difficulty: 'Orta',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[2] || 15,
      templateType: 'Kelime Anlamı & Bağlamsal Çözümleme',
      stimulus: `Fidanların toprağa tutunabilmesi için gereken 'can suyu' verildiğinde bahçe adeta 'şenlik' havasına büründü.`,
      question: `a) Metinde geçen 'can suyu' teriminin anlamını açıklayınız.
b) 'Şenlik' kelimesinin metindeki bağlamsal anlamını yazıp bir cümlede kullanınız.`,
      answer: `a) Can suyu: Yeni dikilen fidanın köklerinin toprakla kaynaşması için dikilir dikilmez verilen ilk su.
b) Şenlik: Neşeli, coşkulu ve sevinç dolu ortam. Örnek cümle: 'Bahçedeki kuş cıvıltıları mahalleye şenlik getirdi.'`,
      alternativeAnswers: [
        'Can suyu: Fidan dikildikten hemen sonra verilen ilk hayat suyu. Şenlik: Büyük neşe ve sevinç kaynağı.'
      ],
      rubric: [
        { item: "'Can suyu' kavramının doğru açıklanması", pts: Math.round((pointAllocations[2] || 15) * 0.5) },
        { item: "'Şenlik' kelimesinin bağlamsal anlamı ve örnek cümlesi", pts: Math.round((pointAllocations[2] || 15) * 0.5) }
      ]
    },
    {
      number: 4,
      outcome: 'T.Y.5.13',
      outcomeTitle: 'Yazısını zenginleştirecek biçimde söz varlığını kullanabilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[3] || 15,
      templateType: 'Deyim ve Zengin Söz Varlığıyla Yazma',
      stimulus: `Öğrenciler seranın ilk hasadında yetiştirdikleri taze çilekleri okulun diğer sınıflarıyla paylaşmıştır.`,
      question: `Öğrencilerin bahçedeki dayanışmasını ve emeğini anlatan; içinde 'el birliği yapmak' ve 'yüreğini koymak' deyimlerinin geçtiği bir paragraf yazınız.`,
      answer: `Öğrenciler atıl bahçeyi bir cennete dönüştürmek için el birliği yaptılar. Her biri bu projeye yüreğini koyarak tohumları sevgiyle suladı ve sonunda bereketli bir hasada ulaştılar.`,
      alternativeAnswers: [
        'Tüm sınıf el birliği yaparak serayı kurdu; herkes yüreğini koyarak çalıştığı için ortaya harika bir bahçe çıktı.'
      ],
      rubric: [
        { item: "'El birliği yapmak' ve 'yüreğini koymak' deyimlerinin yerinde kullanımı", pts: Math.round((pointAllocations[3] || 15) * 0.5) },
        { item: 'Dayanışmayı anlatan anlamlı paragraf oluşturma', pts: Math.round((pointAllocations[3] || 15) * 0.5) }
      ]
    },
    {
      number: 5,
      outcome: 'T.Y.5.16',
      outcomeTitle: 'Yazım ve noktalama işaretleriyle ilgili kuralları uygulayabilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[4] || 14,
      templateType: 'Hata Tespiti & Düzeltme',
      stimulus: `Öğretmenimiz şöyle dedi; 23 nisan günü seramızdaki çiçekleri van'dan gelen misafirlerimize hediye edeceğiz.`,
      question: `Yukarıdaki cümlede büyük harf ve noktalama kurallarına aykırı 3 hatayı düzeltip cümlenin doğrusunu yazınız.`,
      answer: `Hatalar:
1. 'dedi' kelimesinden sonra noktalı virgül (;) değil İKİ NOKTA (:) konmalıdır.
2. '23 nisan' belirli bir tarihi belirttiği için ay adı büyük harfle '23 Nisan' yazılmalıdır.
3. 'van'dan' özel isim olduğu için büyük harfle 'Van'dan' şeklinde yazılmalıdır.
Doğrusu: Öğretmenimiz şöyle dedi: 23 Nisan günü seramızdaki çiçekleri Van'dan gelen misafirlerimize hediye edeceğiz.`,
      alternativeAnswers: [
        'Noktalı virgül yerine iki nokta gelmeli, Nisan ve Van kelimeleri büyük harfle başlamalıdır.'
      ],
      rubric: [
        { item: 'İki nokta, Nisan ve Van yazım hatalarının tespiti', pts: Math.round((pointAllocations[4] || 14) * 0.5) },
        { item: 'Cümlenin hatasız yazılması', pts: Math.round((pointAllocations[4] || 14) * 0.5) }
      ]
    }
  ];

  // ---------------------------------------------------------------------------
  // C-4. 7. SINIF TÜRKÇE (Set B: Asırlık Ulu Çınar & Tarihsel Vefa)
  // ---------------------------------------------------------------------------
  const turkceQuestions_7th_SetB: GeneratedQuestionItem[] = [
    {
      number: 1,
      outcome: 'T.O.7.8',
      outcomeTitle: 'Metindeki çıkarımları ve örtük anlamı belirleyebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[0] || 15,
      templateType: 'Metin İçi Delillendirme & Örtük Anlam',
      stimulus: `Bursa'nın altı asırlık ulu çınarı, gövdesindeki derin kovuklarda sincapları ve göçmen kuşları konuk ederdi. Köyün çocukları her bahar çınarın heybetli dalları altına toplanır, yaşlıların anlattığı eski sefer hikâyelerini dinlerdi. Çınar, yüzyıllardır değişen insanlara rağmen kökleriyle toprağa, dallarıyla zamana meydan okurdu.`,
      question: `a) Asırlık çınarın kovuklarında kuşları barındırmasındaki ve çocukların onun gölgesinde toplanmasındaki örtük anlamı açıklayınız.
b) Çınarın zamana meydan okuduğunu kanıtlayan iki ifadeyi metinden yazınız.`,
      answer: `a) Örtük Anlam: Çınar sadece bir ağaç değil, geçmişle geleceği birbirine bağlayan şefkatli bir koruyucu, ortak hafıza ve millî birlik sembolüdür.
b) Kanıtlar: 1. Altı asırdır derin kovuklarında canlıları konuk etmesi, 2. Yüzyıllardır değişen nesillere rağmen kökleriyle toprağa sımsıkı tutunması.`,
      alternativeAnswers: [
        'Çınarın nesiller boyu insanları bir araya getiren köklü bir tarihî miras ve koruyucu manevi sığınak olduğunu göstermektedir.',
        'Kanıtlar: Canlıları koynunda yaşatması ve asırlar boyunca ayakta kalarak kökleriyle toprağa bağlanmasıdır.'
      ],
      rubric: [
        { item: 'Çınarın ortak hafıza ve koruyucu sembol olduğunun açıklanması', pts: Math.round((pointAllocations[0] || 15) * 0.5) },
        { item: 'Metinden iki somut zaman ve kök kanıtının gösterilmesi', pts: Math.round((pointAllocations[0] || 15) * 0.5) }
      ]
    },
    {
      number: 2,
      outcome: 'T.O.7.4',
      outcomeTitle: 'Bağlamdan yararlanarak bilmediği kelime ve kelime gruplarının anlamını tahmin edebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[1] || 15,
      templateType: 'Kelime Anlamı Tahmini & Delillendirme',
      stimulus: `Ulu çınar, 'metanetle' rüzgârlara göğüs geriyor; çevresindeki beton binaların soğukluğuna inat toprağın 'özünden' kopmuyordu.`,
      question: `Metindeki altı çizili 'metanetle' sözcüğünün anlamını tahmin ediniz. Tahmininizi metindeki hangi ipucuna dayandırdığınızı açıklayınız.`,
      answer: `Tahmin: Metanetle: Dayanıklılıkla, güçlü bir sabır ve sarsılmaz bir dirençle demektir. İpucu: Şiddetli rüzgârlara göğüs germesi ve asırlardır devrilmeden ayakta kalmasıdır.`,
      alternativeAnswers: [
        'Metanetle: Sabırla ve sarsılmadan zorluklara karşı durarak anlamındadır. İpucu: Çınarın rüzgârlara karşı direnmesi ve devrilmemesidir.'
      ],
      rubric: [
        { item: "'Metanetle' sözcüğünün doğru tahmin edilmesi (sabır, dayanıklılık)", pts: Math.round((pointAllocations[1] || 15) * 0.5) },
        { item: 'Metindeki rüzgâra göğüs germe ipucuyla gerekçelendirilmesi', pts: Math.round((pointAllocations[1] || 15) * 0.5) }
      ]
    },
    {
      number: 3,
      outcome: 'T.O.7.5',
      outcomeTitle: 'Metnin yüzey anlamını belirleyebilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[2] || 15,
      templateType: 'Ana Fikir / Konu Tespiti',
      stimulus: `Bursa'daki altı asırlık İnkaya çınarı, geniş gövdesi ve metrelerce uzanan kollarıyla köy meydanının simgesidir.`,
      question: `Metnin konusunu eksiksiz tek bir cümleyle yazınız.`,
      answer: `Metnin konusu: Bursa'daki asırlık İnkaya çınarının köklü varlığı ve köy meydanındaki tarihî önemidir.`,
      alternativeAnswers: [
        'Metnin konusu: Altı yüz yıllık ulu çınarın heybeti ve tarihî simgeselliğidir.',
        'Metnin konusu: Asırlık İnkaya çınarının doğadaki görkemli duruşudur.'
      ],
      rubric: [
        { item: 'Metnin konusunun tek cümleyle eksiksiz ifade edilmesi', pts: pointAllocations[2] || 15 }
      ]
    },
    {
      number: 4,
      outcome: 'T.Y.7.21',
      outcomeTitle: 'Yazım kurallarını ve noktalama işaretlerini uygulayabilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[3] || 15,
      templateType: 'Hata Tespiti & Düzeltme',
      stimulus: `Dedem çınarın gölgesinde oturdu; cebinden ahşap tarağını çıkarıp 19 mayıs 1919'da samsun'a çıkan atatürk'ü anlattı.`,
      question: `Cümledeki noktalama ve büyük harf hatalarını belirleyip cümlenin doğru şeklini yazınız.`,
      answer: `Hatalar:
1. 'oturdu'dan sonra noktalı virgül değil İKİ NOKTA (:) gelmelidir.
2. '19 mayıs' belirli bir tarihi bildirdiği için '19 Mayıs' şeklinde büyük yazılmalıdır.
3. 'samsun'a' ve 'atatürk'ü' özel isimler olduğu için büyük harfle 'Samsun'a' ve 'Atatürk'ü' yazılmalıdır.
Doğrusu: Dedem çınarın gölgesinde oturdu: cebinden ahşap tarağını çıkarıp 19 Mayıs 1919'da Samsun'a çıkan Atatürk'ü anlattı.`,
      alternativeAnswers: [
        'Mayıs, Samsun ve Atatürk sözcükleri büyük harfle yazılmalı, noktalı virgül yerine iki nokta kullanılmalıdır.'
      ],
      rubric: [
        { item: 'İki nokta ve büyük harf hatalarının tespiti', pts: Math.round((pointAllocations[3] || 15) * 0.5) },
        { item: 'Cümlenin kurallara uygun hatasız yazımı', pts: Math.round((pointAllocations[3] || 15) * 0.5) }
      ]
    }
  ];

  // ---------------------------------------------------------------------------
  // C-5. 7. SINIF TÜRKÇE (Set A)
  // ---------------------------------------------------------------------------
  const turkceQuestions: GeneratedQuestionItem[] = [
    {
      number: 1,
      outcome: 'T.7.3.18',
      outcomeTitle: 'Metindeki düşünceyi geliştirme yollarını ve örtük anlamları tespit edebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[0] || 15,
      templateType: 'Metin İçi Delillendirme & Örtük Anlam',
      stimulus: `"Eski mahalle fırıncısı, tezgâhın kenarına 'Göz hakkı olan alsın, parası yetmeyen yarın versin' kutusu koymuştu. Yıllar sonra süpermarketler açıldığında o küçük fırın kapandı ama mahallenin yaşlıları o fırının önünden geçerken hâlâ adımlarını yavaşlatır, tezgâhın tahta kokusunu içlerine çekerdi."`,
      question: `a) Mahalle sakinlerinin kapalı fırının önünden geçerken adımlarını yavaşlatmasındaki örtük anlamı açıklayınız.
b) Fırıncının yalnızca ticari kazanç gütmediğini kanıtlayan iki davranışı metinden yazınız.`,
      answer: `a) Örtük Anlam: İnsanlar sadece ekmek almamış, orada güveni, komşuluk sıcaklığını ve dayanışmayı yaşamışlardır. Bu hareket nostaljik bir saygı ve vefa göstergesidir.
b) Kanıtlar: 1. 'Göz hakkı olan alsın' kutusu koyması, 2. 'Parası yetmeyen yarın versin' diyerek borca ve insana güvenmesi.`,
      alternativeAnswers: [
        'Mahalle sakinlerinin geçmişteki samimi komşuluk ilişkilerine, fırıncının cömertliğine ve güvene duyduğu vefa duygusudur.',
        'Kanıtlar: Fırıncının ihtiyacı olanların ücretsiz ekmek alabilmesi için kutu koyması ve parası çıkışmayanlara güvenmesidir.'
      ],
      rubric: [
        { item: 'Örtük anlamın (vefa ve komşuluk sıcaklığı) doğru açıklanması', pts: Math.round((pointAllocations[0] || 15) * 0.5) },
        { item: 'Metinden iki somut cömertlik kanıtının yazılması', pts: Math.round((pointAllocations[0] || 15) * 0.5) }
      ]
    },
    {
      number: 2,
      outcome: 'T.7.3.24',
      outcomeTitle: 'Metin içi geçiş ve bağlantı ifadelerinin işlevini belirleyebilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[1] || 15,
      templateType: 'Öğrenci Diyaloğu & Kavram Yanılgısı',
      stimulus: `Deneme yazısı yazan ${name1} ve ${name2} şu cümleyi tartışmaktadır:
"Mimar Sinan eserlerinde taşın ağırlığını zarafetle hafifletmiştir; ............ kubbenin heybeti insanı ezmek yerine göğe yükseltir."
${name1}: "Boşluğa 'çünkü' bağlacı gelmelidir zira kubbenin etkisi gerekçe bildirmektedir."
${name2}: "Hayır, ilk cümle ile ikinci cümle birbirini tamamlayan destekleyici düşüncelerdir; 'üstelik' veya 'dahası' getirilmelidir."`,
      question: `${name1} ve ${name2}'nin görüşlerini değerlendiriniz. Hangi öğrenci haklıdır? Bağlantı ifadesinin düşünceyi destekleme işlevini açıklayarak boşluğa uygun ifadeyi yazınız.`,
      answer: `${name2} haklıdır. İkinci cümle ilk cümlenin sebebi değil, zarafet fikrine eklenen daha güçlü bir pekiştirme ve tamamlamadır. Bu nedenle 'üstelik', 'dahası' veya 'ayrıca' ifadeleri kullanılmalıdır.`,
      rubric: [
        { item: `${name2}'nin haklılığının tespiti`, pts: Math.round((pointAllocations[1] || 15) * 0.4) },
        { item: 'Düşünceyi pekiştirme/destekleme işlevinin açıklanması', pts: Math.round((pointAllocations[1] || 15) * 0.3) },
        { item: 'Uygun ifadenin (üstelik / dahası) yazılması', pts: Math.round((pointAllocations[1] || 15) * 0.3) }
      ]
    },
    {
      number: 3,
      outcome: 'T.7.3.20',
      outcomeTitle: 'Metindeki deyim ve atasözlerinin anlama katkısını analiz edebilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[2] || 15,
      templateType: 'Kurgusal Vaka & Edebi Analiz',
      stimulus: `"Usta çırağına baktı: 'Evlat, bu meslekte acele eden çamura saplanır. İğneyle kuyu kazar gibi sabredeceksin ki ortaya çıkan iş göz nuru olsun.' dedi."`,
      question: `Metinde geçen "iğneyle kuyu kazmak" ve "göz nuru" deyimlerinin bağlamsal anlamlarını yazınız.`,
      answer: `• "İğneyle kuyu kazmak": Çok yetersiz araçlarla, büyük bir sabır, emek ve titizlikle güç bir işi başarmaya çalışmak.
• "Göz nuru": Büyük bir dikkat, özen ve el emeğiyle ortaya çıkarılmış çok değerli eser.`,
      rubric: [
        { item: '"İğneyle kuyu kazmak" deyiminin doğru açıklanması', pts: Math.round((pointAllocations[2] || 15) * 0.5) },
        { item: '"Göz nuru" deyiminin doğru açıklanması', pts: Math.round((pointAllocations[2] || 15) * 0.5) }
      ]
    },
    {
      number: 4,
      outcome: 'T.7.4.3',
      outcomeTitle: 'Noktalama işaretlerinin işlevlerini metin üzerinde uygulayabilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[3] || 15,
      templateType: 'Hata Tespiti & Adım Analizi',
      stimulus: `${name1}, metninde şu cümleyi yazmıştır:
"Pazardan şunları aldım; taze fasulye, domates ve biber: manavdan ise elma ve armut aldım."`,
      question: `Cümledeki iki nokta (:) ve noktalı virgülün (;) yerlerinin neden yanlış olduğunu açıklayarak cümlenin doğru noktalama halini yazınız.`,
      answer: `Hata: Kendisinden sonra örnekler sıralanan yerin sonuna noktalı virgül değil İKİ NOKTA (:) konur. Cümleler arasında tür ayrımı için ise NOKTALI VİRGÜL (;) kullanılır.
Doğrusu: "Pazardan şunları aldım: taze fasulye, domates ve biber; manavdan ise elma ve armut aldım."`,
      rubric: [
        { item: 'İki nokta ve noktalı virgül kural hatasının açıklanması', pts: Math.round((pointAllocations[3] || 15) * 0.5) },
        { item: 'Cümlenin hatasız yeniden yazılması', pts: Math.round((pointAllocations[3] || 15) * 0.5) }
      ]
    },
    {
      number: 5,
      outcome: 'T.7.4.12',
      outcomeTitle: 'Anlatımı zenginleştirmek için kişileştirme ve benzetme sanatlarını kullanabilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[4] || 14,
      templateType: 'Empati & Cümle Dönüştürme',
      stimulus: `Düz Cümle: "Rüzgâr esti ve sarı yapraklar ağaçlardan yere döküldü."`,
      question: `Bu düz cümleyi içinde hem "kişileştirme (teşhis)" hem de "benzetme (teşbih)" olacak şekilde tek bir edebi cümle halinde yeniden kurgulayınız. Hangi ögelerin söz sanatı olduğunu belirtiniz.`,
      answer: `Örnek Cümle: "Öfkeli sonbahar rüzgârı ağaçların kulağına bir ayrılık şarkısı fısıldarken, dalından kopan sarı yapraklar altın pullar gibi toprağa serildi."
• Kişileştirme: Rüzgârın öfkeli olması ve şarkı fısıldaması.
• Benzetme: Sarı yaprakların altın pullara benzetilmesi.`,
      rubric: [
        { item: 'Kişileştirme unsurunun kuralına uygun kurulması', pts: Math.round((pointAllocations[4] || 14) * 0.5) },
        { item: 'Benzetme unsurunun benzetilen/benzeyen ilişkisiyle kurulması', pts: Math.round((pointAllocations[4] || 14) * 0.5) }
      ]
    },
    {
      number: 6,
      outcome: 'T.7.3.26',
      outcomeTitle: 'Metindeki anlatıcı türünü 1. ve 3. şahıs bakış açısıyla dönüştürebilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[5] || 14,
      templateType: 'Birinci Ağızdan Konuşturma / Rol',
      stimulus: `"Eski ahşap konağın gıcırdayan merdivenlerinden yavaşça çıktım. Odamın penceresini açıp bahçedeki ıhlamur kokusunu içime çektim."`,
      question: `Bu 1. tekil kişi ağzından yazılmış metni 3. tekil şahıs (O) anlatıcı ağzına dönüştürerek yeniden yazınız. Değişen iki fiil ekini belirtiniz.`,
      answer: `Dönüştürülmüş Metin: "Eski ahşap konağın gıcırdayan merdivenlerinden yavaşça çıktı. Odasının penceresini açıp bahçedeki ıhlamur kokusunu içine çekti."
Değişen Fiiller: "çıktım" -> "çıktı" (1. şahıs eki -m kalktı) ve "çektim" -> "çekti".`,
      rubric: [
        { item: 'Metnin 3. tekil şahıs ağzına hatasız dönüştürülmesi', pts: Math.round((pointAllocations[5] || 14) * 0.5) },
        { item: 'Değişen fiil eklerinin doğru gösterilmesi', pts: Math.round((pointAllocations[5] || 14) * 0.5) }
      ]
    }
  ];

  // ---------------------------------------------------------------------------
  // D. SOSYAL BİLGİLER (Set A)
  // ---------------------------------------------------------------------------
  const sosyalQuestions: GeneratedQuestionItem[] = [
    {
      number: 1,
      outcome: 'SB.7.1.1',
      outcomeTitle: 'İletişimde ben dili ve sen dili kullanımının kişiler arası ilişkilere etkisini çözümleyebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[0] || 15,
      templateType: 'Empati & Cümle Dönüştürme',
      stimulus: `Okul tiyatrosu projesinde ${name1}, provaya sürekli geç kalan arkadaşı ${name2}'ye öfkeyle:
"Her zaman provayı aksatıyorsun, sorumsuz bir insansın ve kimsenin emeğine saygın yok!" demiştir.`,
      question: `a) ${name1}'in kurduğu cümleyi 'sen dili' ve iletişim engelleri (yargılama/etiketleme) açısından analiz ediniz.
b) Bu çatışmayı önleyecek suçlayıcı olmayan örnek bir 'ben dili' cümlesi kurgulayınız.`,
      answer: `a) Analiz: Cümle doğrudan kişiliği hedef alan suçlayıcı, genelleştirici ("her zaman") ve etiketleyici ("sorumsuz") bir 'sen dili'dir. Savunma refleksini tetikler ve iletişimi koparır.
b) Ben Dili Cümlesi: "Provalara geç kalındığında rollerimizi planlanan sürede çalışamadığımız için endişeleniyorum ve projemizin aksamasından üzüntü duyuyorum."`,
      rubric: [
        { item: 'Sen dilinin savunma doğurucu etkisinin analizi', pts: Math.round((pointAllocations[0] || 15) * 0.5) },
        { item: 'Duygu belirten kuralına uygun Ben Dili cümlesinin kurulması', pts: Math.round((pointAllocations[0] || 15) * 0.5) }
      ]
    },
    {
      number: 2,
      outcome: 'SB.7.1.2',
      outcomeTitle: 'Medya araçlarını kullanırken doğru bilgi alma ve özel hayatın gizliliği haklarını savunabilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[1] || 15,
      templateType: 'Dilemma (İkilem) & Hukuki Çıkarım',
      stimulus: `Bir internet sitesi, ünlü bir bilim insanının evinde ailesiyle otururken gizli kamerayla çekilmiş fotoğraflarını izinsiz yayımlamıştır.
${name1}: "Halkın bilgi alma hakkı vardır, yayınlanabilir." demiştir.
${name2}: "Konut dokunulmazlığı ve özel hayatın gizliliği Anayasa ile güvence altındadır; kamusal olmayan alanda izinsiz çekim yapılamaz." demiştir.`,
      question: `${name1} ve ${name2}'nin görüşlerini değerlendiriniz. Hangi öğrenci haklıdır? Doğru bilgi alma özgürlüğü ile özel hayatın gizliliği arasındaki sınır nerede başlar?`,
      answer: `${name2} haklıdır. Basın özgürlüğü kamu yararı bulunan durumlarda geçerlidir. Kişilerin evlerinde, rızaları olmadan gizlice çekilen görüntüler haber niteliği taşımaz; özel hayatın gizliliğinin ve konut dokunulmazlığının açık ihlalidir.`,
      rubric: [
        { item: `${name2}'nin haklılığının tespiti`, pts: Math.round((pointAllocations[1] || 15) * 0.4) },
        { item: 'Özel hayatın gizliliği ve kamu yararı sınırının açıklanması', pts: Math.round((pointAllocations[1] || 15) * 0.6) }
      ]
    },
    {
      number: 3,
      outcome: 'SB.7.2.3',
      outcomeTitle: 'Türkiye\'de nüfusun dağılışını etkileyen doğal ve beşerî faktörleri analiz edebilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[2] || 15,
      templateType: 'Kurgusal Vaka & Coğrafi Matris',
      stimulus: `Teke Platosu ile Çatalca-Kocaeli Platosu'nun ikisi de deniz kıyısında olmasına rağmen nüfus yoğunlukları çok farklıdır.`,
      question: `Bu iki bölgeyi DOĞAL FAKTÖR (arazi yapısı/toprak) ve BEŞERÎ FAKTÖR (sanayi/ulaşım/iş imkânı) bakımından karşılaştırarak nüfus yoğunluğu farkının nedenini açıklayınız.`,
      answer: `• Teke Platosu: Doğal faktör olarak karstik/kalkerli kireçtaşı arazisi suyu tutamaz, engebeli ve dağlıktır; tarım ve ulaşım kısıtlı olduğundan seyrek nüfusludur.
• Çatalca-Kocaeli: Beşerî faktör olarak sanayi tesisleri, limanlar, ticaret ve ulaşım ağları gelişmiş, iş imkânları yüksek olduğundan yoğun nüfusludur.`,
      rubric: [
        { item: 'Teke Platosu karstik engelinin doğal faktör olarak açıklanması', pts: Math.round((pointAllocations[2] || 15) * 0.5) },
        { item: 'Çatalca-Kocaeli sanayi ve ulaşımının beşeri faktör olarak açıklanması', pts: Math.round((pointAllocations[2] || 15) * 0.5) }
      ]
    },
    {
      number: 4,
      outcome: 'SB.7.2.1',
      outcomeTitle: 'Osmanlı Devleti\'nin kuruluş sürecinde iskân ve istimâlet (hoşgörü) politikasının rolünü değerlendirebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[3] || 15,
      templateType: 'Kurgusal Tarihi Vaka & Karar',
      stimulus: `Osmanlı Devleti, Rumeli'de fethettiği topraklara Anadolu'dan konargöçer Türkmen aileleri yerleştirmiş (İskân), aynı zamanda yerel gayrimüslim halkın inancına, ibadetine ve geleneklerine dokunmayarak can ve mal güvenliğini teminat altına almıştır (İstimâlet).`,
      question: `a) İskân politikasının fetihlerin kalıcı olmasına katkısını açıklayınız.
b) İstimâlet (hoşgörü) politikasının bölge halkının devlete bağlılığını nasıl artırdığını belirtiniz.`,
      answer: `a) İskân: Fethedilen topraklara Türk nüfus yerleştirilerek bölge Türkleşmiş, isyanlar önlenmiş ve kalıcı bir idari yapı kurulmuştur.
b) İstimâlet: Halka dini baskı yapılmaması ve adil vergi alınması yerel halkın devlete sadakatini sağlamıştır.`,
      rubric: [
        { item: 'İskânın kalıcılık sağlama etkisinin açıklanması', pts: Math.round((pointAllocations[3] || 15) * 0.5) },
        { item: 'İstimâletin sadakat ve hoşgörü katkısının açıklanması', pts: Math.round((pointAllocations[3] || 15) * 0.5) }
      ]
    },
    {
      number: 5,
      outcome: 'SB.7.3.2',
      outcomeTitle: 'Göç hareketlerinin nedenlerini (itici ve çekici faktörler) sınıflandırabilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[4] || 14,
      templateType: 'Durum & Özellik Matrisi',
      stimulus: `Maddeler: 1. Tarım topraklarının mirasla bölünmesi ve kuraklık | 2. Büyükşehirlerdeki kaliteli üniversite ve eğitim | 3. Deprem ve heyelan afetleri | 4. Sanayi bölgelerindeki geniş iş imkânları.`,
      question: `Yukarıdaki 4 maddeyi "İTİCİ FAKTÖR" ve "ÇEKİCİ FAKTÖR" olarak sınıflandırarak yazınız.`,
      answer: `• İtici Faktörler: 1 (Kuraklık ve toprak bölünmesi) ve 3 (Doğal afetler).
• Çekici Faktörler: 2 (Eğitim imkânları) ve 4 (Sanayi iş imkânları).`,
      rubric: [
        { item: '1 ve 3 maddelerinin İtici Faktör olarak yazılması', pts: Math.round((pointAllocations[4] || 14) * 0.5) },
        { item: '2 ve 4 maddelerinin Çekici Faktör olarak yazılması', pts: Math.round((pointAllocations[4] || 14) * 0.5) }
      ]
    },
    {
      number: 6,
      outcome: 'SB.7.4.1',
      outcomeTitle: 'Bilginin depolanmasında kil tabletten kâğıda geçişin önemini değerlendirebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[5] || 14,
      templateType: 'Hata Tespiti & Adım Analizi',
      stimulus: `${name1}, sunumunda şu sırayı vermiştir: 1. Sümer çivi yazısı ve kil tabletler -> 2. Gutenberg'in hareketli matbaası -> 3. Mısır papirüs kâğıdı -> 4. Bergama parşömeni.`,
      question: `Bu sıralamadaki kronolojik hatayı düzeltiniz. Kil tabletten hafif kâğıda geçişin bilginin yayılma hızına etkisini açıklayınız.`,
      answer: `Düzeltme: Matbaa (2. adım) papirüs ve parşömenden sonra gelmelidir. Doğru sıra: Kil tablet -> Papirüs -> Parşömen -> Matbaa.
Etki: Kil tabletler ağır ve kırılgandı; hafif papirüs ve kâğıt bilginin uzak ülkelere kolayca taşınmasını sağlamıştır.`,
      rubric: [
        { item: 'Gutenberg matbaasının son sıraya alınması düzeltmesi', pts: Math.round((pointAllocations[5] || 14) * 0.5) },
        { item: 'Kâğıdın taşınabilirlik ve bilgi yayma avantajının açıklanması', pts: Math.round((pointAllocations[5] || 14) * 0.5) }
      ]
    }
  ];

  // ---------------------------------------------------------------------------
  // E. DİN KÜLTÜRÜ (Set A)
  // ---------------------------------------------------------------------------
  const dinQuestions: GeneratedQuestionItem[] = [
    {
      number: 1,
      outcome: 'DK.7.1.2',
      outcomeTitle: 'Ahiret hayatının aşamalarını anlam ve mantık akışına göre sıralayabilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[0] || 15,
      templateType: 'Öğrenci Diyaloğu & Kavram Yanılgısı',
      stimulus: `${name1} ve ${name2} ahiret aşamalarını çalışmaktadır:
${name1}: "Mizan kurulup sevaplar tartıldıktan sonra insanlar kabirlerinden kalkarak mahşerde toplanır."
${name2}: "Sıralama yanlıştır; amellerin tartılması (mizan) diriliş ve toplanmadan sonra gerçekleşir."`,
      question: `${name1} ve ${name2}'nin açıklamalarını değerlendiriniz. Doğru kronolojik sırayı (Kıyamet, Ba's, Haşr, Mizan) yazınız.`,
      answer: `${name2} haklıdır. Doğru Sıra: 1. Kıyamet ve Ba's (Yeniden diriliş) -> 2. Haşr ve Mahşer (Toplanma) -> 3. Hesap ve Amel Defteri -> 4. Mizan (Adalet terazisi).`,
      rubric: [
        { item: `${name2}'nin haklılığının tespiti`, pts: Math.round((pointAllocations[0] || 15) * 0.4) },
        { item: 'Doğru kronolojik sıranın yazılması', pts: Math.round((pointAllocations[0] || 15) * 0.6) }
      ]
    },
    {
      number: 2,
      outcome: 'DK.7.1.3',
      outcomeTitle: 'Ahiret inancının insan davranışları ve adalet duygusu üzerindeki etkisini yorumlayabilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[1] || 15,
      templateType: 'Kurgusal Vaka & Dilemma Değerlendirme',
      stimulus: `Pazarda kimsenin görmediği bir anda tartının hileli olduğunu fark eden manav, teraziyi hemen durdurup düzeltmiştir. Çırağına: "Kullar görmese de her şeyi gören Allah vardır ve bu terazinin bir de mizanı vardır." demiştir.`,
      question: `Manavın bu davranışını ahiret bilinci, kul hakkı ve vicdani iç denetim kavramlarıyla açıklayınız.`,
      answer: `Ahiret inancı insana her eylemin bir hesabı olduğunu öğretir. Bu bilinç dışarıdan bir polis denetimi olmasa bile insanı dürüst davranmaya ve kul hakkından sakınmaya yönlendirir.`,
      rubric: [
        { item: 'Mizan ve iç denetim ilişkisinin açıklanması', pts: Math.round((pointAllocations[1] || 15) * 0.5) },
        { item: 'Kul hakkı hassasiyetinin temellendirilmesi', pts: Math.round((pointAllocations[1] || 15) * 0.5) }
      ]
    },
    {
      number: 3,
      outcome: 'DK.7.2.1',
      outcomeTitle: 'İslam\'da yardımlaşma ve dayanışmanın toplumsal sevgi ve güveni tesis etmedeki rolünü değerlendirebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[2] || 15,
      templateType: 'Dilemma (İkilem) & Çözüm Değerlendirme',
      stimulus: `Sosyal sorumluluk kulübünde ${name1}, yardım kolilerini verirken ailelerin yüzlerini fotoğraflayıp paylaşmayı teklif etmiştir. ${name2} ise insan onurunu incitmemek gerektiğini savunmuştur.`,
      question: `İki tutumu İslam ahlakındaki infak adabı ve insan onuru açısından değerlendiriniz. İyiliği teşvik etmek ile gösterişten kaçınmak arasındaki denge nasıl kurulmalıdır?`,
      answer: `${name2} haklıdır. İslam'da temel kural 'Sağ elin verdiğini sol el bilmemelidir'. İhtiyaç sahiplerinin kimlikleri gizlenmeli, yardım rencide etmeden sessizce ulaştırılmalıdır.`,
      rubric: [
        { item: 'İnsan onurunu koruma ilkesinin açıklanması', pts: Math.round((pointAllocations[2] || 15) * 0.5) },
        { item: 'Teşvik ve gizlilik dengesinin sunulması', pts: Math.round((pointAllocations[2] || 15) * 0.5) }
      ]
    },
    {
      number: 4,
      outcome: 'DK.7.1.1',
      outcomeTitle: 'Meleklerin görev ve özelliklerini ayet ve hadisler ışığında sınıflandırabilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[3] || 15,
      templateType: 'Durum & Özellik Matrisi',
      stimulus: `Melekler: Cebrail, Mikail, İsrafil, Azrail.`,
      question: `a) Vahiy getirmekle görevli melek hangisidir?
b) Kıyamet ve diriliş için Sûr'a üflemekle görevli melek hangisidir?`,
      answer: `a) Vahiy Meleği: Cebrail
b) Sûr'a Üfleyen Melek: İsrafil.`,
      rubric: [
        { item: 'Cebrail görevinin doğru yazılması', pts: Math.round((pointAllocations[3] || 15) * 0.5) },
        { item: 'İsrafil görevinin doğru yazılması', pts: Math.round((pointAllocations[3] || 15) * 0.5) }
      ]
    },
    {
      number: 5,
      outcome: 'DK.7.3.1',
      outcomeTitle: 'Hz. Muhammed\'in insani ve peygamberlik yönlerini dengeli bir biçimde açıklayabilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[4] || 14,
      templateType: 'Kurgusal Vaka & Edebi Analiz',
      stimulus: `"Peygamberimiz çarşıda alışveriş yapar, torunlarıyla oynar, hastalandığında şifa arardı. Fakat dinî hükümleri tebliğ ederken Allah'tan aldığı vahye harfiyen uyardı."`,
      question: `Peygamberimizin 'İnsani Yönü' ile 'Peygamberlik (Risalet) Yönü' arasındaki farkı açıklayınız.`,
      answer: `• İnsani Yönü: Bizler gibi ölümlü bir insandır; yer, içer, sevinir, üzülür.
• Risalet Yönü: Allah'tan vahiy alması, günahlardan korunmuş (ismet) olması ve dini eksiksiz tebliğ eden elçi olmasıdır.`,
      rubric: [
        { item: 'İnsani yönünün beşeri örneklerle açıklanması', pts: Math.round((pointAllocations[4] || 14) * 0.5) },
        { item: 'Peygamberlik yönünün vahiy ile açıklanması', pts: Math.round((pointAllocations[4] || 14) * 0.5) }
      ]
    },
    {
      number: 6,
      outcome: 'DK.7.4.2',
      outcomeTitle: 'Nâs suresini okuyarak anlamını ve verdiği temel mesajları çıkarabilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[5] || 14,
      templateType: 'Metin İçi Delillendirme & Örtük Anlam',
      stimulus: `"De ki: Sığınırım insanların Rabbine, insanların hükümdarına, insanların ilahına; o sinsi vesvesecinin şerrinden!" (Nâs Suresi)`,
      question: `Nâs suresinin ana mesajı nedir? İnsan kime, neye karşı sığınmalıdır?`,
      answer: `Ana Mesaj: İnsanın içindeki sinsi vesveselerden, kötü düşüncelerden ve şer odaklarından korunmak için insanların Rabbi ve koruyucusu olan Allah'a sığınması gerektiğidir.`,
      rubric: [
        { item: 'Sığınmanın Allah\'a yapılması gerektiğinin tespiti', pts: Math.round((pointAllocations[5] || 14) * 0.5) },
        { item: 'Vesvese ve sinsi şerlerden korunma mesajının açıklanması', pts: Math.round((pointAllocations[5] || 14) * 0.5) }
      ]
    }
  ];

  // ---------------------------------------------------------------------------
  // F. İNGİLİZCE (Set A)
  // ---------------------------------------------------------------------------
  const ingilizceQuestions: GeneratedQuestionItem[] = [
    {
      number: 1,
      outcome: 'E7.1.R1',
      outcomeTitle: 'Students will be able to understand short and simple texts about biographies',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[0] || 15,
      templateType: 'Hata Tespiti & Adım Analizi',
      stimulus: `"Marie Curie was borned in 1867 in Poland. She was more hardworking that other students. She discover radium and won two Nobel Prizes."`,
      question: `Find two grammatical errors in the text and rewrite the corrected phrases.`,
      answer: `Corrections:
1. "was borned" -> Correct: "was born" (Irregular verb).
2. "more hardworking that" -> Correct: "more hardworking THAN" (Comparative rule).`,
      rubric: [
        { item: '"was born" düzeltmesi', pts: Math.round((pointAllocations[0] || 15) * 0.5) },
        { item: '"more hardworking than" düzeltmesi', pts: Math.round((pointAllocations[0] || 15) * 0.5) }
      ]
    },
    {
      number: 2,
      outcome: 'E7.2.W1',
      outcomeTitle: 'Students will be able to write pieces comparing sports and extreme activities',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[1] || 15,
      templateType: 'Durum / Özellik Matrisi',
      stimulus: `Comparison: Hiking vs Bungee Jumping
• Hiking: Danger: Low | Equipment: Boots | Adrenaline: Moderate
• Bungee Jumping: Danger: High | Equipment: Elastic rope | Adrenaline: Extreme`,
      question: `Write two comparative sentences using "dangerous" and "exciting".`,
      answer: `1. "Bungee jumping is more dangerous than hiking."
2. "Bungee jumping is more exciting than hiking."`,
      rubric: [
        { item: '"more dangerous than" cümlesinin doğru yazımı', pts: Math.round((pointAllocations[1] || 15) * 0.5) },
        { item: '"more exciting than" cümlesinin doğru yazımı', pts: Math.round((pointAllocations[1] || 15) * 0.5) }
      ]
    },
    {
      number: 3,
      outcome: 'E7.3.R1',
      outcomeTitle: 'Students will be able to recognize specific information in texts about wild animals',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[2] || 15,
      templateType: 'Metin İçi Delillendirme',
      stimulus: `"Pandas live in bamboo forests of China. They are herbivores because they eat only bamboo. They are in danger of extinction due to deforestation."`,
      question: `a) Why are pandas categorized as herbivores?
b) Why are pandas in danger of extinction?`,
      answer: `a) Because they eat only bamboo (plants).
b) Because of deforestation (loss of natural habitats).`,
      rubric: [
        { item: 'a şıkkında bamboo yeme tespiti', pts: Math.round((pointAllocations[2] || 15) * 0.5) },
        { item: 'b şıkkında habitat kaybı/deforestation tespiti', pts: Math.round((pointAllocations[2] || 15) * 0.5) }
      ]
    },
    {
      number: 4,
      outcome: 'E7.4.W1',
      outcomeTitle: 'Students will be able to write simple suggestions for protecting the environment',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[3] || 15,
      templateType: 'Dilemma (İkilem) & Çözüm',
      stimulus: `Our city faces heavy air pollution and waste problems.`,
      question: `Write two suggestion sentences using "should" or "must":
1. About transport/cars.
2. About recycling/plastic.`,
      answer: `1. "People should walk or ride bicycles instead of driving cars."
2. "We must recycle plastic bottles and paper."`,
      rubric: [
        { item: 'Ulaşım hakkında kuralına uygun should cümlesi', pts: Math.round((pointAllocations[3] || 15) * 0.5) },
        { item: 'Geri dönüşüm hakkında must cümlesi', pts: Math.round((pointAllocations[3] || 15) * 0.5) }
      ]
    },
    {
      number: 5,
      outcome: 'E7.2.R1',
      outcomeTitle: 'Students will be able to understand frequency adverbs in daily routines',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[4] || 14,
      templateType: 'Durum & Özellik Matrisi',
      stimulus: `Mark's routine: Swimming (everyday: 7 days), Basketball (Monday, Friday: 2 days), Tennis (never: 0 days).`,
      question: `Complete with always, sometimes, never:
a) Mark ................... goes swimming.
b) Mark ................... plays tennis.`,
      answer: `a) Mark ALWAYS goes swimming.
b) Mark NEVER plays tennis.`,
      rubric: [
        { item: 'a şıkkında "always" doğru yazımı', pts: Math.round((pointAllocations[4] || 14) * 0.5) },
        { item: 'b şıkkında "never" doğru yazımı', pts: Math.round((pointAllocations[4] || 14) * 0.5) }
      ]
    },
    {
      number: 6,
      outcome: 'E7.5.R1',
      outcomeTitle: 'Students will be able to make simple predictions about future life',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[5] || 14,
      templateType: 'Öğrenci Diyaloğu & Fikir Savunma',
      stimulus: `Discussion about year 2050.`,
      question: `Write two future prediction sentences using "will" or "won't" about schools and technology.`,
      answer: `1. "In 2050, students won't carry heavy books because lessons will be digital."
2. "Artificial intelligence tutors will help students learn faster."`,
      rubric: [
        { item: '"will / won\'t" yapısının hatasız kullanımı', pts: Math.round((pointAllocations[5] || 14) * 0.5) },
        { item: 'Anlamlı ve tutarlı gelecek tahmini', pts: Math.round((pointAllocations[5] || 14) * 0.5) }
      ]
    }
  ];

  // ---------------------------------------------------------------------------
  // KAZANIM ODAKLI VE RESMİ MEBİ DAĞILIMINA %100 UYUMLU PROSEDÜREL SEÇİCİ
  // ---------------------------------------------------------------------------
  // Her ders ve her senaryo için soru seçimi; soru numarasına veya sıralı döngüye göre DEĞİL,
  // Soru i için belirlenen resmi "d.outcomeCode" kazanımına göre TAM EŞLEŞME ile yapılır.
  const occurrenceCount: Record<string, number> = {};

  const internalAllQuestions: GeneratedQuestionItem[] = [
    ...fenQuestions_SetA,
    ...fenQuestions_SetB,
    ...matQuestions_SetA,
    ...matQuestions_SetB,
    ...matQuestions_SetAlgebra,
    ...turkceQuestions_5th_SetA,
    ...turkceQuestions_5th_SetB,
    ...turkceQuestions_5th_SetC,
    ...turkceQuestions_7th_SetB,
    ...turkceQuestions,
    ...sosyalQuestions,
    ...dinQuestions,
    ...ingilizceQuestions
  ];

  const isCurrentExam = (e: any) => e.scenarioId === scenario.id || e.id.endsWith(scenario.id) || e.id.includes(scenario.id);

  const dynamicQuestions: GeneratedQuestionItem[] = questionDistributions.map((d, idx) => {
    const outcomeCode = d.outcomeCode;
    const occ = occurrenceCount[outcomeCode] || 0;
    occurrenceCount[outcomeCode] = occ + 1;

    const officialOutcome = getOfficialOutcomeTitle(outcomeCode);
    const resolvedTitle = (officialOutcome && officialOutcome !== outcomeCode)
      ? officialOutcome
      : (d.notes || 'MEBİ Öğrenme Çıktısı');

    // 1. Önce SAMPLE_EXAMS içerisinden aynı kademe ve aynı derse ait ilgili kazanımdaki soruları filtrele
    // DİKKAT: Mevcut senaryo (e.scenarioId === scenario.id) KESİNLİKLE HARİÇ TUTULUR!
    const matchingSampleQuestionsWithExam: { q: any; parentExam: any }[] = [];
    SAMPLE_EXAMS
      .filter((e) => e.grade === grade && e.subjectId === subjectId && !isCurrentExam(e))
      .forEach((e) => {
        e.questions.forEach((q) => {
          if (q.outcomeCode === outcomeCode) {
            matchingSampleQuestionsWithExam.push({ q, parentExam: e });
          }
        });
      });

    // 2. Ardından içeride tanımlı zengin MEBİ havuzundaki ilgili kazanım sorularını filtrele
    const internalPool = internalAllQuestions.filter((q) => q.outcome === outcomeCode);

    // 3. Genel SAMPLE_EXAMS havuzunda bu kazanım var mı (farklı sınıf/şube olsa dahi, mevcut senaryo hariç)
    const crossGradeSampleQuestionsWithExam: { q: any; parentExam: any }[] = [];
    if (matchingSampleQuestionsWithExam.length === 0) {
      SAMPLE_EXAMS
        .filter((e) => !isCurrentExam(e))
        .forEach((e) => {
          e.questions.forEach((q) => {
            if (q.outcomeCode === outcomeCode) {
              crossGradeSampleQuestionsWithExam.push({ q, parentExam: e });
            }
          });
        });
    }

    const availablePool = [
      ...internalPool.map((q) => ({
        outcome: q.outcome,
        outcomeTitle: q.outcomeTitle,
        difficulty: q.difficulty,
        level: q.level,
        templateType: q.templateType,
        stimulus: q.stimulus || '',
        question: q.question,
        answer: q.answer,
        alternativeAnswers: q.alternativeAnswers,
        rubric: q.rubric
      })),
      ...matchingSampleQuestionsWithExam.map(({ q, parentExam }) => {
        let stim = q.stimulus || '';
        const req = detectSourceRequirement(q.questionText, q.archetype, q.contextText, stim);
        const quality = checkStimulusQuality(stim, req);
        // Eğer bu soru bir meta-özet veya önceki soruya referans ise, ana sınavdaki tam okuma metnini devral
        if (!quality.isValid && (quality.isCrossReference || quality.isMetaSummary)) {
          const parentSourceQ = parentExam.questions.find((pq: any) => {
            const pqStim = pq.stimulus?.trim() || '';
            return pqStim.length >= 100 && !pqStim.startsWith('Metinde') && !pqStim.startsWith('Yukarıda');
          }) || parentExam.questions[0];

          if (parentSourceQ?.stimulus && parentSourceQ.stimulus.length > 80) {
            stim = parentSourceQ.stimulus;
          }
        }
        return {
          outcome: q.outcomeCode,
          outcomeTitle: q.outcomeTitle,
          difficulty: q.difficulty,
          level: q.cognitiveLevel,
          templateType: q.archetype,
          stimulus: stim,
          question: q.questionText,
          answer: q.modelAnswer,
          alternativeAnswers: q.alternativeAnswers,
          rubric: (q.rubric || []).map((r: any) => ({ item: r.criterion, pts: r.points }))
        };
      }),
      ...crossGradeSampleQuestionsWithExam.map(({ q, parentExam }) => {
        let stim = q.stimulus || '';
        const req = detectSourceRequirement(q.questionText, q.archetype, q.contextText, stim);
        const quality = checkStimulusQuality(stim, req);
        if (!quality.isValid && (quality.isCrossReference || quality.isMetaSummary)) {
          const parentSourceQ = parentExam.questions.find((pq: any) => {
            const pqStim = pq.stimulus?.trim() || '';
            return pqStim.length >= 100 && !pqStim.startsWith('Metinde') && !pqStim.startsWith('Yukarıda');
          }) || parentExam.questions[0];

          if (parentSourceQ?.stimulus && parentSourceQ.stimulus.length > 80) {
            stim = parentSourceQ.stimulus;
          }
        }
        return {
          outcome: q.outcomeCode,
          outcomeTitle: q.outcomeTitle,
          difficulty: q.difficulty,
          level: q.cognitiveLevel,
          templateType: q.archetype,
          stimulus: stim,
          question: q.questionText,
          answer: q.modelAnswer,
          alternativeAnswers: q.alternativeAnswers,
          rubric: (q.rubric || []).map((r: any) => ({ item: r.criterion, pts: r.points }))
        };
      })
    ];

    // Anti-duplication filtreleme: Mevcut sınav soruları veya daha önce üretilen sorularla eşleşenleri ayıkla
    const filteredPool = availablePool.filter((cand) => {
      return !isDuplicateOrTooSimilar(cand.question, cand.stimulus, allAvoidTexts, allAvoidStimuli, 0.38);
    });

    if (filteredPool.length > 0) {
      const pickIdx = (variationIndex * 3 + occ) % filteredPool.length;
      const q = filteredPool[pickIdx];
      return {
        number: idx + 1,
        outcome: outcomeCode,
        outcomeTitle: resolvedTitle,
        difficulty: q.difficulty || 'Orta',
        level: d.cognitiveLevel || q.level || 'Karmaşık Bilişsel Süreçler',
        templateType: q.templateType || 'Kurgusal Senaryo & Vaka İncelemesi',
        points: pointAllocations[idx] || 15,
        stimulus: q.stimulus || '',
        question: q.question,
        answer: q.answer,
        alternativeAnswers: q.alternativeAnswers,
        rubric: (q.rubric && q.rubric.length > 0) ? q.rubric : [
          { item: 'Kavramsal teşhis ve bilimsel tespit', pts: Math.round((pointAllocations[idx] || 15) * 0.5) },
          { item: 'Analitik gerekçelendirme ve modelleme basamağı', pts: (pointAllocations[idx] || 15) - Math.round((pointAllocations[idx] || 15) * 0.5) }
        ]
      };
    }

    // 4. Havuzda henüz bulunmayan veya mükerrerlik filtresi sonrası boş kalan kazanımlar için pedagojik dinamik MEBİ sentezi
    const dynSubjectName = subjectId.replace(/_/g, ' ').toUpperCase();

    // Türkçe dersi için özel bağlamsal edebî kurgular
    if (subjectId === 'turkce') {
      const turkishContexts = [
        {
          theme: 'Köy Çeşmesi ve İmece',
          stim: `Köyün asırlık taş çeşmesinin oluğundan akan kaynak suyu, tarladan dönen köylülerin ve yolcuların nefeslendiği ortak duraktı. Muhtar Salih Bey, kuraklık tehlikesine karşı çeşmenin arkasındaki su deposunu imece usulüyle temizletmiş; israfı önlemek için de gençlerle birlikte bir su saati düzeneği kurmuştu.`,
          meaningQ: `Metne göre köylülerin kuraklık tehlikesine karşı suyu korumak ve paylaşmak için aldığı tedbiri açıklayınız.`,
          meaningAns: `Muhtar Salih Bey ve köy halkı imece usulüyle su deposunu temizletmiş ve israfı önlemek amacıyla gençlerle su saati düzeneği kurarak suyu koruma altına almıştır.`,
          vocabWords: ['imece', 'oluk'],
          idioms: ['gönül birliği etmek', 'alın teri dökmek'],
          errSentence: `Muhtar salih bey, 29 ekim günü çeşmenin başında toplanan köylülere şöyle dedi; Suyumuz bizim geleceğimizdir.`
        },
        {
          theme: 'Tarihî Kütüphane ve Antika Saat',
          stim: `Tarihî okul kütüphanesinin başköşesinde duran sarkaçlı pirinç saat, tam doksan yıldır her saat başında tok bir sesle çalardı. Kütüphaneci Emine Hanım, 'Bu saat sadece dakikaları değil, bu salonda sabırla okuyan binlerce gencin hayallerini de saydı.' diyerek saatin tozunu ipek bir mendille özenle alırdı.`,
          meaningQ: `Kütüphaneci Emine Hanım'ın saatin tozunu alırken söylediği sözdeki örtük anlamı ve saate duyduğu vefa duygusunu açıklayınız.`,
          meaningAns: `Pirinç saatin sadece zamanı gösteren bir aygıt olmadığını, o kütüphanede emek veren nesillerin ortak hatırasını ve ilim yolculuğunu simgelediğini ifade etmektedir.`,
          vocabWords: ['sarkaç', 'başköşe'],
          idioms: ['can kulağıyla dinlemek', 'el üstünde tutmak'],
          errSentence: `Emine hanım, kütüphanedeki eski kitapları istanbul ve ankara'dan gelen araştırmacılara gösterdi.`
        },
        {
          theme: 'Tarihî Rüzgâr Değirmeni',
          stim: `Ege kıyılarındaki tepeye kurulu yel değirmeni, sonbahar rüzgârları başladığında dev kanatlarını döndürmeye başlardı. Değirmenci İbrahim Usta, köylülerin getirdiği buğday çuvallarını sırayla tartar, hiçbir çuvalı ayırt etmeden taşların arasında una dönüştürürdü. Değirmenin kapısında 'Hak geçmesin, un tükenmesin' levhası asılıydı.`,
          meaningQ: `Değirmenin kapısında asılı olan 'Hak geçmesin, un tükenmesin' levhasındaki ilkeyi İbrahim Usta'nın dürüstlüğüyle ilişkilendirerek açıklayınız.`,
          meaningAns: `İbrahim Usta köylülerin buğdaylarını ayrım yapmadan sırayla tartıp adaletle öğüterek hiç kimsenin hakkını yememiş, emeğe ve berekete duyduğu saygıyı dürüstlüğüyle somutlaştırmıştır.`,
          vocabWords: ['öğütmek', 'ayrım'],
          idioms: ['hak gözetmek', 'eli açık olmak'],
          errSentence: `İbrahim usta, her sabah gün doğarken izmir'in dağlarına bakar ve fırıncı ahmet'e selam verirdi.`
        }
      ];

      const ctx = turkishContexts[(variationIndex + idx) % turkishContexts.length];

      if (outcomeCode.includes('T.O.5.6') || outcomeCode.includes('T.O.7.5')) {
        return {
          number: idx + 1,
          outcome: outcomeCode,
          outcomeTitle: resolvedTitle,
          difficulty: 'Kolay',
          level: d.cognitiveLevel || 'Basit Bilişsel Süreçler',
          templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
          points: pointAllocations[idx] || 15,
          stimulus: ctx.stim,
          question: ctx.meaningQ,
          answer: ctx.meaningAns,
          alternativeAnswers: [
            `Metinde anlatılan ${ctx.theme} olayında adalet, emek ve paylaşım bilinci vurgulanmaktadır.`
          ],
          rubric: [
            { item: 'Metnin ana konusunun ve olay örgüsünün doğru tespiti', pts: Math.round((pointAllocations[idx] || 15) * 0.5) },
            { item: 'Gerekçenin metindeki somut eylemlerle delillendirilmesi', pts: Math.round((pointAllocations[idx] || 15) * 0.5) }
          ]
        };
      } else if (outcomeCode.includes('T.O.5.20') || outcomeCode.includes('T.O.7.4')) {
        return {
          number: idx + 1,
          outcome: outcomeCode,
          outcomeTitle: resolvedTitle,
          difficulty: 'Orta',
          level: d.cognitiveLevel || 'Basit Bilişsel Süreçler',
          templateType: 'Kelime Anlamı & Bağlamsal Çözümleme',
          points: pointAllocations[idx] || 15,
          stimulus: ctx.stim,
          question: `Metinde geçen '${ctx.vocabWords[0]}' ve '${ctx.vocabWords[1]}' kelimelerinin bağlamsal anlamlarını yazınız ve birer cümlede kullanınız.`,
          answer: `'${ctx.vocabWords[0]}' ve '${ctx.vocabWords[1]}' kelimelerinin metindeki bağlama uygun anlamı yazılmış ve kurallı cümleler kurulmuştur.`,
          alternativeAnswers: [
            `Kelimeler metindeki bağlama uygun olarak doğru anlamlandırılmıştır.`
          ],
          rubric: [
            { item: 'Kelimelerin bağlama uygun doğru anlamlandırılması', pts: Math.round((pointAllocations[idx] || 15) * 0.5) },
            { item: 'Örnek cümlelerin anlam bütünlüğü ve dilbilgisi kurallarına uygunluğu', pts: Math.round((pointAllocations[idx] || 15) * 0.5) }
          ]
        };
      } else if (outcomeCode.includes('T.Y.5.13') || outcomeCode.includes('T.Y.7.13')) {
        return {
          number: idx + 1,
          outcome: outcomeCode,
          outcomeTitle: resolvedTitle,
          difficulty: 'Zor',
          level: d.cognitiveLevel || 'Karmaşık Bilişsel Süreçler',
          templateType: 'Deyim ve Zengin Söz Varlığıyla Yazma',
          points: pointAllocations[idx] || 15,
          stimulus: ctx.stim,
          question: `İçinde '${ctx.idioms[0]}' ve '${ctx.idioms[1]}' deyimlerinin geçtiği, ${ctx.theme} konusuna uygun akıcı ve kurallı bir paragraf yazınız.`,
          answer: `Her iki deyim anlamına uygun biçimde kullanılarak kurallı ve anlamlı bir paragraf oluşturulmuştur.`,
          alternativeAnswers: [
            `Deyimler yerinde ve doğru anlamda kullanılarak tutarlı bir metin kurgulanmıştır.`
          ],
          rubric: [
            { item: 'Deyimlerin yerinde ve doğru anlamda kullanılması', pts: Math.round((pointAllocations[idx] || 15) * 0.5) },
            { item: 'Paragrafın kurgusal bütünlüğü ve akıcılığı', pts: Math.round((pointAllocations[idx] || 15) * 0.5) }
          ]
        };
      } else if (outcomeCode.includes('T.Y.5.16') || outcomeCode.includes('T.Y.7.21')) {
        return {
          number: idx + 1,
          outcome: outcomeCode,
          outcomeTitle: resolvedTitle,
          difficulty: 'Kolay',
          level: d.cognitiveLevel || 'Basit Bilişsel Süreçler',
          templateType: 'Hata Tespiti & Düzeltme',
          points: pointAllocations[idx] || 14,
          stimulus: ctx.errSentence,
          question: `Yukarıdaki cümlede büyük harf ve noktalama kurallarına aykırı yapılan 3 hatayı belirleyip cümlenin doğrusunu yazınız.`,
          answer: `Hatalar tespit edilerek büyük harfler ve noktalama işaretleri kurallara uygun biçimde düzeltilmiştir.`,
          alternativeAnswers: [
            `Büyük harf ve noktalama işaretleri eksiksiz düzeltilmiştir.`
          ],
          rubric: [
            { item: 'Büyük harf ve noktalama hatalarının tespiti', pts: Math.round((pointAllocations[idx] || 15) * 0.5) },
            { item: 'Cümlenin hatasız yeniden yazımı', pts: Math.round((pointAllocations[idx] || 15) * 0.5) }
          ]
        };
      }
    }
    const archetypesList = [
      'Durum & Özellik Matrisi (VAR/YOK Tablosu)',
      'Kurgusal Senaryo & Vaka İncelemesi',
      'Öğrenci Diyaloğu & Kavram Yanılgısı',
      'Hata Tespiti & Adım Analizi',
      'Dilemma (İkilem) & Çözüm Değerlendirme',
      'Metin İçi Delillendirme & Örtük Anlam',
      'Birinci Ağızdan Konuşturma / Rol'
    ];
    const arch = archetypesList[idx % archetypesList.length];
    const sName1 = POOL_NAMES_A[(variationIndex + idx) % POOL_NAMES_A.length];
    const sName2 = POOL_NAMES_B[(variationIndex + idx + 3) % POOL_NAMES_B.length];

    let stim = '';
    let qText = '';
    let ans = '';

    if (arch.includes('Matris')) {
      stim = `Tablo: ${dynSubjectName} Temel Kavramları ve Özellikleri
----------------------------------------------------------------------
| Kavram / Durum | Temel İlke Şartı | Gerçek Yaşam Uygulaması |
| Durum A        | ................ | ....................... |
| Durum B        | ................ | ....................... |`;
      qText = `Tabloda boş bırakılan yerleri ${outcomeCode} [${resolvedTitle}] öğrenme çıktısına göre uygun bilimsel/kavramsal ifadelerle doldurunuz.`;
      ans = `Durum A ve Durum B özellikleri ders ilkeleri doğrultusunda eksiksiz eşleştirilmiştir.`;
    } else if (arch.includes('Diyalog')) {
      stim = `${sName1} ve ${sName2} ders çalışırken ${resolvedTitle} konusunda farklı görüşler belirtmiştir:
${sName1}: "Bu olayda sadece ilk değişken belirleyicidir ve sonuç buna göre şekillenir."
${sName2}: "Hayır, şartlar değiştiğinde doğrudan diğer etkenlerin devreye girdiği ve sonuca etki ettiği görülür."`;
      qText = `${sName1} ve ${sName2}'nin açıklamalarını ${outcomeCode} ilkeleri doğrultusunda değerlendiriniz. Hangisi haklıdır? Gerekçelendiriniz.`;
      ans = `${sName2} haklıdır. Çünkü süreç tek bir değişkene indirgenemez, bağlamsal şartlar belirleyicidir.`;
    } else if (arch.includes('Hata')) {
      stim = `${sName1}, problem çözümünde 3 adım uygulamıştır:
1. Adım: Temel tanımı ve değişkenleri belirlemiştir.
2. Adım: Verilen kuralları işleme koymuştur.
3. Adım: Çıkan sonucu ilk durumla karşılaştırıp sonuca varmıştır.`;
      qText = `${sName1}'in çözüm adımlarını ${outcomeCode} doğrultusunda analiz ediniz. İlk hata hangi adımda yapılmıştır? Doğru adımı yazınız.`;
      ans = `Hata tespiti ve kavramsal gerekçelendirme adım basamaklarıyla sunulmuştur.`;
    } else {
      stim = `Bir araştırma ve uygulama ortamında ${dynSubjectName} kapsamında iki farklı yöntem (Yöntem 1 ve Yöntem 2) karşılaştırılmaktadır.`;
      qText = `Yöntem 1 ve Yöntem 2'yi ${resolvedTitle} bakımından karşılaştırınız. Hangi yöntemin daha verimli olduğunu gerekçelendiriniz.`;
      ans = `Seçilen yöntemin gerekçesi ve diğer yöntemin sınırları bilimsel kanıtlarla açıklanmıştır.`;
    }

    return {
      number: idx + 1,
      outcome: outcomeCode,
      outcomeTitle: resolvedTitle,
      difficulty: 'Orta',
      level: d.cognitiveLevel,
      templateType: arch,
      points: pointAllocations[idx] || 15,
      stimulus: stim,
      question: qText,
      answer: ans,
      rubric: [
        { item: 'Kavramsal teşhis ve doğru tespit', pts: Math.round((pointAllocations[idx] || 15) * 0.5) },
        { item: 'Bilimsel/mantıksal gerekçelendirme basamağı', pts: Math.round((pointAllocations[idx] || 15) * 0.5) }
      ]
    };
  });

  const finalDynamicQuestions = normalizeAndCalibrateQuestions(dynamicQuestions);

  const elapsedFormatted = Math.max(0.6, (Date.now() - startTime) / 1000).toFixed(1) + ' saniye';

  return {
    title: `${grade}. Sınıf ${scenario.name} (Özgün Sınav Seti - ${finalDynamicQuestions.length} Soru)`,
    variationNumber: variationIndex + 1,
    generationTime: elapsedFormatted,
    model: 'MEBİ Kural Tabanlı Standart Motor',
    isFallback: true,
    fallbackReason: fallbackReason || 'Canlı yapay zekâ servisi şu anda meşgul veya çevrimdışı olduğundan sorular yerel MEBİ kural motoruyla hazırlandı.',
    questionsCount: finalDynamicQuestions.length,
    generatedQuestions: finalDynamicQuestions,
    sourceValidationSummary: {
      isFullyValid: !finalDynamicQuestions.some(q => q.hasMissingSourceError),
      missingSourceCount: finalDynamicQuestions.filter(q => q.hasMissingSourceError).length,
      recoveredCount: finalDynamicQuestions.filter(q => q.commonStimulus || q.sharedSourceId).length
    }
  };
}
