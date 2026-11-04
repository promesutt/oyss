import { 
  SubjectId, 
  GradeLevel, 
  ExamScenario, 
  ExamSourceClassification, 
  classifyExamQuestions, 
  getExamClassificationDetails 
} from '../types';
import { getOfficialOutcomeTitle } from '../data/curriculumData';
import { SAMPLE_EXAMS } from '../data/sampleExams';
import { formatDifficultyPlanText, calibrateQuestionDifficulties } from './difficultyCalibrator';
import { distributeExamPoints, reconcileRubricPoints } from './examScoring';
import { 
  detectSourceRequirement, 
  checkStimulusQuality, 
  validateAndEnrichExamQuestions,
  sanitizeTextReferencesIfNoStimulus,
  isSemanticallySelfContainedQuestion
} from './sourceMaterialValidator';
import { parseExamJsonSafely } from './jsonParser';
import { buildLiveExamPrompt, buildAvoidDirectives } from '../generators/prompts';

const POOL_NAMES_A = [
  'Selin', 'Kerem', 'Zehra', 'Burak', 'Aslı', 'Emre', 'Derya', 'Tarık', 
  'Gamze', 'Umut', 'Defne', 'Mete', 'Bilge', 'Kuzey', 'Aylin', 'Koray'
];

const POOL_NAMES_B = [
  'Kaan', 'İrem', 'Tolga', 'Buse', 'Alper', 'Nilay', 'Ece', 'Oğuz', 
  'Sude', 'Onur', 'Caner', 'Pınar', 'Doruk', 'Damla', 'Barış', 'Seda'
];

import { getAllFallbackQuestions, GeneratedQuestionItem } from '../data/fallbackPools';
export type { GeneratedQuestionItem };

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
    missingStemCount?: number;
    recoveredCount: number;
  };
  promptMetrics?: {
    promptLength: number;
    budgetCeiling: number;
    compressionApplied: 'none' | 'light' | 'compact';
  };
  examClassification?: ExamSourceClassification;
}

export interface GeneratorOptions {
  avoidQuestionTexts?: string[];
  avoidStimuli?: string[];
  preferredDifficulty?: 'standard' | 'more_complex' | 'foundational';
  outputType?: 'exam' | 'study_sheet' | 'practice_question';
}

/**
 * Türkçe metni küçük harfe dönüştürür, inceltme/şapkalı harfleri normalize eder ve
 * noktalama işaretlerini temizler.
 */
export function cleanTurkishText(text: string): string {
  if (!text) return '';
  return text
    .replace(/â/g, 'a').replace(/î/g, 'i').replace(/û/g, 'u')
    .replace(/Â/g, 'a').replace(/Î/g, 'i').replace(/Û/g, 'u')
    .toLocaleLowerCase('tr-TR')
    .replace(/[^a-z0-9çğıöşü\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Türkçe çekim eklerini (hâl, iyelik, çoğul, zaman ve kişi ekleri) budayarak
 * kök veya yalın gövdeyi elde eder.
 */
export function normalizeTurkishStem(word: string): string {
  if (!word || word.length <= 2) return word;
  let w = cleanTurkishText(word);
  if (w.length <= 2) return w;

  const multiSuffixes: [RegExp, number][] = [
    [/(?:mışlardır|mişlerdir|muşlardır|müşlerdir|dılar|diler|tılar|tiler)$/, 2],
    [/(?:yordular|yordiler|yormuş|yormiş|yordu|yordu|yorsa|yorse|yacak|yecek|acaklar|ecekler|malıdır|melidir)$/, 2],
    [/(?:lardan|lerden|larda|lerde|ların|lerin|lara|lere|ları|leri|ndan|nden|nda|nde|nın|nin|nun|nün)$/, 3],
    [/(?:dan|den|tan|ten|mız|miz|muz|müz|nız|niz|nuz|nüz|da|de|ta|te|ya|ye|na|ne)$/, 3],
    [/(?:mış|miş|muş|müş|uyor|üyor|ıyor|iyor|acak|ecek|malı|meli)$/, 2],
    [/(?:mıştır|miştir|muştur|müştür|dular|düler|tular|tüler|dınız|diniz)$/, 2],
    [/(?:dı|di|du|dü|tı|ti|tu|tü)$/, 2],
    [/(?:lar|ler|sı|si|su|sü|ım|im|um|üm|ın|in|un|ün|la|le|yla|yle)$/, 3],
    [/(?:yı|yi|yu|yü|nı|ni|nu|nü)$/, 3]
  ];

  for (let pass = 0; pass < 2; pass++) {
    const prev = w;
    for (const [rx, minLen] of multiSuffixes) {
      if (rx.test(w)) {
        const cand = w.replace(rx, '');
        if (cand.length >= minLen) {
          w = cand;
          break;
        }
      }
    }
    if (w === prev) break;
  }

  // Tek harfli hal ekleri (-a, -e, -ı, -i, -u, -ü) sadece kelime en az 5 harfliyse
  if (w.length >= 5 && /[aeıiuü]$/.test(w)) {
    const cand = w.slice(0, -1);
    if (cand.length >= 3) {
      w = cand;
    }
  }

  // Yumuşama (softening)
  if (w.endsWith('ğ')) w = w.slice(0, -1) + 'k';
  else if (w.endsWith('c')) w = w.slice(0, -1) + 'ç';
  else if (w.endsWith('d')) w = w.slice(0, -1) + 't';
  else if (w.endsWith('b')) w = w.slice(0, -1) + 'p';

  return w;
}

const GENERIC_DIRECTIVE_WORDS = new Set([
  've', 'ile', 'veya', 'ama', 'fakat', 'ancak', 'bu', 'şu', 'o', 'bir', 'tek',
  'da', 'de', 'ta', 'te', 'için', 'göre', 'kadar', 'sonra', 'önce', 'gibi',
  'yukarıdaki', 'aşağıdaki', 'metne', 'parçaya', 'yazınız', 'açıklayınız',
  'belirtiniz', 'ifade', 'ediniz', 'bulunuz', 'hesaplayınız', 'nedir',
  'hangi', 'hangisi', 'hangisidir', 'kaçtır', 'nelerdir', 'nasıl', 'neden',
  'gerekçesiyle', 'cümleyle', 'soruyu', 'cevaplayınız', 'verilen', 'ilgili',
  'doğru', 'yanlış'
]);

/**
 * Metinden genel yönergeleri ve bağlaçları ayıklayarak semantik konu köklerini döndürür.
 */
export function extractTopicTokens(text: string): string[] {
  if (!text) return [];
  const words = cleanTurkishText(text).split(/\s+/).filter(w => w.length > 2);
  const tokens: string[] = [];
  for (const w of words) {
    const stem = normalizeTurkishStem(w);
    if (stem.length > 2 && !GENERIC_DIRECTIVE_WORDS.has(stem) && !GENERIC_DIRECTIVE_WORDS.has(w)) {
      tokens.push(stem);
    }
  }
  return Array.from(new Set(tokens));
}

function calculateJaccard(tokensA: string[], tokensB: string[]): number {
  if (tokensA.length === 0 || tokensB.length === 0) return 0;
  const setA = new Set(tokensA);
  const setB = new Set(tokensB);
  let inter = 0;
  for (const t of setA) {
    if (setB.has(t)) inter++;
  }
  const union = setA.size + setB.size - inter;
  return union > 0 ? inter / union : 0;
}

function calculateOverlapRatio(tokensA: string[], tokensB: string[]): number {
  if (tokensA.length === 0 || tokensB.length === 0) return 0;
  const setA = new Set(tokensA);
  const setB = new Set(tokensB);
  let inter = 0;
  for (const t of setA) {
    if (setB.has(t)) inter++;
  }
  return inter / Math.min(setA.size, setB.size);
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

export interface AvoidItem {
  questionText: string;
  stimulus?: string;
}

export function extractNumbersFromText(text: string): string[] {
  if (!text) return [];
  const matches = text.match(/\b\d+(?:[.,]\d+)?\b/g);
  return matches ? Array.from(new Set(matches)) : [];
}

export function isDuplicateOrTooSimilar(
  candidateQuestionText: string,
  candidateStimulus: string | undefined,
  avoidQuestionTextsOrItems: (string | AvoidItem)[],
  avoidStimuli: string[] = [],
  threshold = 0.38
): boolean {
  const cQ = (candidateQuestionText || '').trim();
  const cS = (candidateStimulus || '').trim();
  const cFull = (cS ? cS + ' ' : '') + cQ;
  const cNums = extractNumbersFromText(cFull);

  for (let i = 0; i < avoidQuestionTextsOrItems.length; i++) {
    const raw = avoidQuestionTextsOrItems[i];
    let aQ = '';
    let aS = '';

    if (typeof raw === 'object' && raw !== null && 'questionText' in raw) {
      aQ = (raw.questionText || '').trim();
      aS = (raw.stimulus || '').trim();
    } else if (typeof raw === 'string') {
      aQ = raw.trim();
      aS = (avoidStimuli[i] || '').trim();
    }

    if (!aQ && !aS) continue;

    const aFull = (aS ? aS + ' ' : '') + aQ;
    if (cFull === aFull) return true;

    // Her iki soruda da uyarıcı yokken soru kökleri tam eşleşiyorsa mükerrer
    if (!cS && !aS && cQ && cQ === aQ) return true;

    const fullSim = calculateQuestionSimilarity(cFull, aFull);
    const qSim = calculateQuestionSimilarity(cQ, aQ);
    const aNums = extractNumbersFromText(aFull);

    // Senaryolu / Zengin Uyarıcılı Sorular
    if (cS.length > 25 && aS.length > 25) {
      const stimSim = calculateQuestionSimilarity(cS, aS);
      const stimTopicsC = extractTopicTokens(cS);
      const stimTopicsA = extractTopicTokens(aS);
      const stimTopicOverlap = calculateOverlapRatio(stimTopicsC, stimTopicsA);

      // Kurgular ve olay örgüleri tamamen farklıysa salt ortak yönerge (örn. "ana fikri yazınız") nedeniyle eleme
      if (stimTopicOverlap < 0.25 && stimSim < 0.35) {
        if (fullSim >= 0.70) return true;
        continue;
      }

      if (stimSim >= 0.50) {
        if (qSim >= 0.40 || fullSim >= 0.55) return true;
      }

      // Sayısal parametre içermeyen sözel/metin anlama sorularında semantik olay örgüsü ve konu analizi
      if (cNums.length === 0 || aNums.length === 0) {
        const fullTopicsC = extractTopicTokens(cFull);
        const fullTopicsA = extractTopicTokens(aFull);
        const fullTopicJaccard = calculateJaccard(fullTopicsC, fullTopicsA);
        const fullTopicOverlap = calculateOverlapRatio(fullTopicsC, fullTopicsA);
        const stimTopicJaccard = calculateJaccard(stimTopicsC, stimTopicsA);

        if (fullTopicJaccard >= 0.45 && fullTopicOverlap >= 0.70) return true;
        if (stimTopicJaccard >= 0.36 && stimTopicOverlap >= 0.60 && fullTopicJaccard >= 0.42) return true;
      }

      if (stimSim < 0.35) {
        if (fullSim >= 0.65) return true;
        continue;
      }

      if (fullSim >= 0.58) return true;
      continue;
    }

    // Matematik / Fen Sorularında Sayısal / Parametrik Kontrol
    if (cNums.length > 0 && aNums.length > 0) {
      const commonNums = cNums.filter(n => aNums.includes(n));
      // Tamamen farklı sayılar/parametreler içeriyorsa (örn. 542A & 4 ile 7832B & 9, ya da 72 ile 90)
      if (commonNums.length === 0) {
        if (fullSim >= 0.85) return true;
        continue;
      }
      // Sayısal kesişim varsa benzerlik eşiği
      if (fullSim >= 0.60 || qSim >= 0.60) return true;
      continue;
    }

    // Düz Metin / Türkçe Anlama ve Dilbilgisi Soruları
    if (fullSim >= threshold || qSim >= threshold) {
      return true;
    }
    const fullTopicsC = extractTopicTokens(cFull);
    const fullTopicsA = extractTopicTokens(aFull);
    const fullTopicJaccard = calculateJaccard(fullTopicsC, fullTopicsA);
    if (fullTopicJaccard >= threshold) {
      return true;
    }
  }

  return false;
}

export interface ProceduralContext {
  theme: string;
  stim: string;
  meaningQ: string;
  meaningAns: string;
  vocabWords: string[];
  idioms: string[];
  errSentence: string;
}

export const TURKISH_PROCEDURAL_CONTEXTS: ProceduralContext[] = [
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

export function buildProceduralSyntheticQuestion(
  outcomeCode: string,
  officialTitle: string,
  idx: number,
  targetPts: number,
  subjectId: string,
  variationIndex: number = 0,
  cognitiveLevel: string = 'Karmaşık Bilişsel Süreçler'
): GeneratedQuestionItem {
  if (subjectId === 'turkce') {
    const ctx = TURKISH_PROCEDURAL_CONTEXTS[(variationIndex + idx) % TURKISH_PROCEDURAL_CONTEXTS.length];
    if (outcomeCode.includes('T.O.5.20') || outcomeCode.includes('T.O.7.4')) {
      return {
        number: idx + 1,
        outcome: outcomeCode,
        outcomeTitle: officialTitle,
        difficulty: 'Orta',
        level: cognitiveLevel || 'Basit Bilişsel Süreçler',
        templateType: 'Kelime Anlamı & Bağlamsal Çözümleme',
        points: targetPts,
        stimulus: ctx.stim,
        question: `Metinde geçen '${ctx.vocabWords[0]}' ve '${ctx.vocabWords[1]}' kelimelerinin bağlamsal anlamlarını yazınız ve birer cümlede kullanınız.`,
        answer: `'${ctx.vocabWords[0]}' ve '${ctx.vocabWords[1]}' kelimelerinin metindeki bağlama uygun anlamı yazılmış ve kurallı cümleler kurulmuştur.`,
        alternativeAnswers: [
          `Kelimeler metindeki bağlama uygun olarak doğru anlamlandırılmıştır.`,
          `Her iki sözcüğün de metnin ana temasına ve cümle yapısına uygun anlam karşılıkları yazılmıştır.`
        ],
        solutionExplanation: `Analitik çözüm: '${ctx.vocabWords[0]}' ve '${ctx.vocabWords[1]}' kelimeleri metnin ana temasına uygun olarak tanımlanmıştır.`,
        rubric: [
          { item: 'Kelimelerin bağlama uygun doğru anlamlandırılması', pts: Math.round(targetPts * 0.5) },
          { item: 'Örnek cümlelerin anlam bütünlüğü ve dilbilgisi kurallarına uygunluğu', pts: Math.round(targetPts * 0.5) }
        ],
        sourceOrigin: 'oyss_synthetic',
        originExamTitle: 'OYSS Dinamik Sentez Havuzu'
      };
    } else if (outcomeCode.includes('T.Y.5.13') || outcomeCode.includes('T.Y.7.13')) {
      return {
        number: idx + 1,
        outcome: outcomeCode,
        outcomeTitle: officialTitle,
        difficulty: 'Zor',
        level: cognitiveLevel || 'Karmaşık Bilişsel Süreçler',
        templateType: 'Deyim ve Zengin Söz Varlığıyla Yazma',
        points: targetPts,
        stimulus: ctx.stim,
        question: `İçinde '${ctx.idioms[0]}' ve '${ctx.idioms[1]}' deyimlerinin geçtiği, ${ctx.theme} konusuna uygun akıcı ve kurallı bir paragraf yazınız.`,
        answer: `Her iki deyim anlamına uygun biçimde kullanılarak kurallı ve anlamlı bir paragraf oluşturulmuştur.`,
        alternativeAnswers: [
          `Deyimler yerinde ve doğru anlamda kullanılarak tutarlı bir metin kurgulanmıştır.`,
          `Belirtilen deyimler bağlama ve tema akışına uygun seçilerek dil kurallarına uygun şekilde metne işlenmiştir.`
        ],
        solutionExplanation: `Analitik çözüm: Deyimler doğru anlamlarında ve ${ctx.theme} konusuyla uyumlu bir paragrafta kullanılmıştır.`,
        rubric: [
          { item: 'Deyimlerin yerinde ve doğru anlamda kullanılması', pts: Math.round(targetPts * 0.5) },
          { item: 'Paragrafın kurgusal bütünlüğü ve akıcılığı', pts: Math.round(targetPts * 0.5) }
        ],
        sourceOrigin: 'oyss_synthetic',
        originExamTitle: 'OYSS Dinamik Sentez Havuzu'
      };
    } else {
      // Varsayılan okuma-anlama (T.O.* veya genel Türkçe)
      return {
        number: idx + 1,
        outcome: outcomeCode,
        outcomeTitle: officialTitle,
        difficulty: 'Orta',
        level: cognitiveLevel || 'Karmaşık Bilişsel Süreçler',
        templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
        points: targetPts,
        stimulus: ctx.stim,
        question: ctx.meaningQ,
        answer: ctx.meaningAns,
        alternativeAnswers: [
          `Metinde anlatılan ${ctx.theme} olayında adalet, emek ve paylaşım bilinci vurgulanmaktadır.`,
          `Olay örgüsünde ${ctx.theme} çerçevesinde toplumsal dayanışma, dürüstlük ve ortak sorumluluk değerleri öne çıkarılmıştır.`
        ],
        solutionExplanation: `Metindeki olay örgüsü ve karakterlerin sergilediği tutumlar doğrultusunda ${ctx.theme} teması gerekçelendirilmiştir.`,
        rubric: [
          { item: 'Metnin ana konusunun ve olay örgüsünün doğru tespiti', pts: Math.round(targetPts * 0.5) },
          { item: 'Gerekçenin metindeki somut eylemlerle delillendirilmesi', pts: Math.round(targetPts * 0.5) }
        ],
        sourceOrigin: 'oyss_synthetic',
        originExamTitle: 'OYSS Dinamik Sentez Havuzu'
      };
    }
  }

  // Diğer dersler için genel analitik sentetik soru
  const genericStimulus = `${officialTitle} konusunda günlük hayat uygulamaları ve bilimsel süreç basamakları ayrıntılı olarak ele alınmaktadır. Bu süreçte temel kavramlar ile neden-sonuç ilişkileri birlikte incelenir.`;
  return {
    number: idx + 1,
    outcome: outcomeCode,
    outcomeTitle: officialTitle,
    difficulty: 'Orta',
    level: cognitiveLevel || 'Karmaşık Bilişsel Süreçler',
    templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
    points: targetPts,
    stimulus: genericStimulus,
    question: `${outcomeCode} [${officialTitle}] öğrenme çıktısı kapsamında, verilen durumdaki kavramsal ilkeleri ve neden-sonuç ilişkilerini gerekçelendirerek açıklayınız.`,
    answer: 'Öğrencinin kavramsal ilkeleri doğru teşhis etmesi ve bilimsel ilkeler doğrultusunda mantıksal çözüm basamaklarını gerekçelendirmesi beklenir.',
    solutionExplanation: `Analitik çözüm kuralına göre ${outcomeCode} çıktısı gerekçelendirilmelidir.`,
    rubric: [
      { item: 'Kavramsal teşhis ve bilimsel tespit', pts: Math.ceil(targetPts / 2) },
      { item: 'Analitik gerekçelendirme ve çözüm adımı', pts: Math.floor(targetPts / 2) }
    ],
    sourceOrigin: 'oyss_synthetic',
    originExamTitle: 'OYSS Dinamik Sentez Havuzu'
  };
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

  // Mevcut senaryoya ait hazır sınav sorularını tespit et ve kaçınılacaklar listesine ekle
  const baseExam = SAMPLE_EXAMS.find(e =>
    e.grade === grade &&
    e.subjectId === subjectId &&
    (e.scenarioId === scenario.id || e.id.endsWith(scenario.id) || e.id.includes(scenario.id))
  );

  const baseAvoidItems: AvoidItem[] = baseExam
    ? baseExam.questions.map(q => ({ questionText: q.questionText, stimulus: q.stimulus || '' }))
    : [];

  const optQuestions = options?.avoidQuestionTexts || [];
  const optStimuli = options?.avoidStimuli || [];
  const optionAvoidItems: AvoidItem[] = optQuestions.map((q, idx) => ({
    questionText: q,
    stimulus: optStimuli[idx] || ''
  }));

  // Tam birleştirilmiş liste: Post-processing filtresi için eksiksiz korunur
  const allAvoidItems: AvoidItem[] = [...baseAvoidItems, ...optionAvoidItems];

  // B+ Mimarisi: Kaçınma verilerini kaynak bazında ayrı diziler olarak yönet
  const baseAvoidTexts = Array.from(new Set(baseAvoidItems.map(item => item.questionText))).filter(
    t => typeof t === 'string' && t.trim().length > 0
  );
  const baseAvoidStimuli = Array.from(new Set(baseAvoidItems.map(item => item.stimulus || ''))).filter(
    s => typeof s === 'string' && s.trim().length > 0
  );

  const setAAvoidTexts = Array.from(new Set(optionAvoidItems.map(item => item.questionText))).filter(
    t => typeof t === 'string' && t.trim().length > 0
  );
  const setAAvoidStimuli = Array.from(new Set(optionAvoidItems.map(item => item.stimulus || ''))).filter(
    s => typeof s === 'string' && s.trim().length > 0
  );

  const internalAllQuestions: GeneratedQuestionItem[] = getAllFallbackQuestions({
    name1,
    name2,
    pointAllocations
  });

  // Deterministik varyasyon belirteci (zaman damgası yerine indeks tabanlı determinizm)
  const variationToken = `v${variationIndex + 1}_tok`;
  let avoidDirectives = buildAvoidDirectives({
    baseAvoidTexts,
    baseAvoidStimuli,
    setAAvoidTexts,
    setAAvoidStimuli,
    variationIndex,
    variationToken
  });

  const BUDGET_CEILING = 16500;
  const HARD_LIMIT = 19500;
  let compressionLevel: 'none' | 'light' | 'compact' = 'none';

  let fallbackReason: string | undefined;
  let livePrompt: string | undefined;
  const outcomeCodes = questionDistributions.map(d => d.outcomeCode);

  try {
    livePrompt = buildLiveExamPrompt({
      grade,
      subjectId,
      targetCount,
      distributionsText,
      avoidDirectives,
      difficultyPlanText,
      variationIndex,
      variationToken,
      outcomeCodes
    });

    // 16.500 karakter tavan bütçe denetimi ve kademeli sıkıştırma (Prompt Budgeting)
    if (livePrompt && livePrompt.length > BUDGET_CEILING) {
      compressionLevel = 'light';
      avoidDirectives = buildAvoidDirectives({
        baseAvoidTexts: baseAvoidTexts.slice(0, 2),
        baseAvoidStimuli: baseAvoidStimuli.slice(0, 1),
        setAAvoidTexts: setAAvoidTexts.slice(0, 6),
        setAAvoidStimuli: setAAvoidStimuli.slice(0, 1),
        variationIndex,
        variationToken
      });

      let rePrompt = buildLiveExamPrompt({
        grade,
        subjectId,
        targetCount,
        distributionsText,
        avoidDirectives,
        difficultyPlanText,
        variationIndex,
        variationToken,
        outcomeCodes
      });

      if (rePrompt.length <= BUDGET_CEILING) {
        livePrompt = rePrompt;
      } else {
        compressionLevel = 'compact';
        avoidDirectives = buildAvoidDirectives({
          baseAvoidTexts: baseAvoidTexts.slice(0, 1),
          baseAvoidStimuli: [],
          setAAvoidTexts: setAAvoidTexts.slice(0, 3),
          setAAvoidStimuli: [],
          variationIndex,
          variationToken
        });

        rePrompt = buildLiveExamPrompt({
          grade,
          subjectId,
          targetCount,
          distributionsText,
          avoidDirectives,
          difficultyPlanText,
          variationIndex,
          variationToken,
          outcomeCodes
        });

        if (rePrompt.length <= BUDGET_CEILING) {
          livePrompt = rePrompt;
        } else {
          avoidDirectives = `ÖZGÜNLÜK VE MEVCUT SORULARI TEKRARLAMAMA KURALI:\n- Bu sınav ${variationIndex + 1}. varyasyon setidir (${variationToken}). Önceki set kurgularını ve metinlerini tekrarlamayınız.`;
          livePrompt = buildLiveExamPrompt({
            grade,
            subjectId,
            targetCount,
            distributionsText,
            avoidDirectives,
            difficultyPlanText,
            variationIndex,
            variationToken,
            outcomeCodes
          });
        }
      }
    }
  } catch (err: any) {
    fallbackReason = err?.message || "Prompt oluşturulamadığı için yerel OYSS kural tabanlı standart motoruna aktarılıyor.";
  }

  const normalizeAndCalibrateQuestions = (questions: any[]): GeneratedQuestionItem[] => {
    const safeQuestions = Array.isArray(questions) ? [...questions] : [];

    // Eksik soru gelirse senaryo dağılımına göre eksik soruları tamamla
    if (safeQuestions.length < targetCount) {
      const missingCount = targetCount - safeQuestions.length;
      for (let m = 0; m < missingCount; m++) {
        const missingIdx = safeQuestions.length;
        const distItem = questionDistributions[missingIdx] || scenario.distributions[0];
        const reqOutcome = distItem.outcomeCode;
        const reqTitle = getOfficialOutcomeTitle(reqOutcome) || distItem.notes || 'Öğrenme Çıktısı';
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
          solutionExplanation: `Analitik çözüm kuralına göre ${reqOutcome} çıktısı gerekçelendirilmelidir.`,
          rubric: [
            { item: 'Kavramsal teşhis ve bilimsel tespit', pts: Math.ceil(targetPts / 2) },
            { item: 'Analitik gerekçelendirme ve çözüm adımı', pts: Math.floor(targetPts / 2) }
          ],
          sourceOrigin: 'oyss_synthetic'
        });
      }
    }

    const withTitles = safeQuestions.slice(0, targetCount).map((q, idx) => {
      const distItem = questionDistributions[idx] || scenario.distributions[0];
      const requiredOutcome = distItem.outcomeCode;
      const officialTitle = getOfficialOutcomeTitle(requiredOutcome) || distItem.notes || q.outcomeTitle || 'Öğrenme Çıktısı';
      const targetPts = pointAllocations[idx] || q.points || 15;

      const rawStem = typeof q.question === 'string' ? q.question.trim() : '';
      const isStemValid = rawStem.length >= 3;
      const rawAns = typeof q.answer === 'string' ? q.answer.trim() : '';
      const rawStim = typeof q.stimulus === 'string' ? q.stimulus.trim() : '';

      // Pedagojik Kalite Denetimi (Yüzeysel Tek Kelime Avcılığı & Sahte Görsel Kontrolü)
      let isPedagogicallyDeficient = false;
      let deficiencyReason = '';

      const cleanAns = rawAns.replace(/[.,!?;:"'«»()]+$/g, '').trim().toLowerCase();
      const cleanStim = rawStim.toLowerCase();

      if (!isStemValid) {
        isPedagogicallyDeficient = true;
        deficiencyReason = 'Soru kökü eksik veya boş (< 3 karakter)';
      } else if (
        (subjectId === 'turkce' || subjectId === 'sosyal_bilgiler' || subjectId === 'din_kulturu') &&
        targetPts >= 14
      ) {
        // Sözel derslerde yüksek puanlı mekanik kelime avcılığı kontrolü:
        // Model cevap 2 veya daha az kelime, stimulus içinde doğrudan yer alıyor ve soru kökü açıkça tek nesne/renk/meyve/kişi soruyor
        const ansWordCount = cleanAns.split(/\s+/).filter(Boolean).length;
        const isSubstring = cleanAns.length > 0 && cleanStim.includes(cleanAns);
        const isTrivialQuery = /(hangi\s+(meyve|sebze|renk|şehir|araç|hayvan|nesne|eşya)|kimdir|kaç\s+(liradır|kestane|elma))/i.test(rawStem);

        if (ansWordCount > 0 && ansWordCount <= 2 && isSubstring && isTrivialQuery) {
          isPedagogicallyDeficient = true;
          deficiencyReason = `Yüksek puanlı (${targetPts} puan) tek kelimelik mekanik bilgi avcılığı ("${rawAns}")`;
        }
      }

      // Sahte görsel sorusu denetimi: Kazanım görsel okuma gerektiriyor fakat görsel yok ve stimulus metinsel tasvir
      if (!isPedagogicallyDeficient && (requiredOutcome.includes('.7') || officialTitle.toLowerCase().includes('görsel'))) {
        const hasFakeVisualText = /(bu\s+görselde|afişte\s+görüldüğü\s+gibi|resimde\s+bir|yandaki\s+afişte|afişte\s+verilmek)/i.test(rawStem + ' ' + rawStim);
        if (!q.visual && hasFakeVisualText && rawStim.length < 150) {
          isPedagogicallyDeficient = true;
          deficiencyReason = 'Gerçek görsel olmadan metinsel afiş tasvirine dayalı sahte görsel sorusu';
        }
      }

      // Metin/Kaynak gerektiren sorular için Stimulus Kalitesi Denetimi (Metinsiz soru önleme)
      const sourceReq = detectSourceRequirement(rawStem, q.templateType, undefined, rawStim);
      if (!isPedagogicallyDeficient && sourceReq.requiresSource && sourceReq.type === 'reading_text') {
        const stimQuality = checkStimulusQuality(rawStim, sourceReq);
        if (!stimQuality.isValid) {
          isPedagogicallyDeficient = true;
          deficiencyReason = `Metne dayalı soru kökü bulunmasına rağmen geçerli okuma metni eksik veya yetersiz ("${(rawStim || '').slice(0, 40)}...")`;
        }
      }

      // Anlamsal Cevaplanabilirlik Güvencesi:
      // Uyarıcı metin (stimulus) bulunmayan veya geçersiz olan bir soru, metin atfı silinse dahi tek başına cevaplanabilir değilse kusurlu kabul edilir.
      if (!isPedagogicallyDeficient) {
        const isSelfContained = isSemanticallySelfContainedQuestion(rawStem, rawStim, requiredOutcome);
        if (!isSelfContained) {
          isPedagogicallyDeficient = true;
          deficiencyReason = `Gerekli okuma metni veya bağlam olmaksızın soru anlamsal olarak tek başına cevaplanamaz ("${rawStem.slice(0, 45)}...")`;
        }
      }

      // Soru pedagojik olarak kusurlu veya eksikse: Yalnızca bu soruyu OYSS referans havuzundan cerrahi olarak ikame et
      if (isPedagogicallyDeficient) {
        console.warn(`[PedagogicalQuality] ${idx + 1}. soruda pedagojik kusur (${deficiencyReason}) tespit edildi; OYSS referans havuzundan güvenle ikame ediliyor.`);
        let fallbackMatch = internalAllQuestions.find(fq => {
          if (fq.outcome !== requiredOutcome) return false;
          if (sourceReq.requiresSource && sourceReq.type === 'reading_text') {
            const fqReq = detectSourceRequirement(fq.question, fq.templateType, undefined, fq.stimulus);
            const fqQual = checkStimulusQuality(fq.stimulus, fqReq);
            if (!fqQual.isValid || (fq.stimulus || '').length < 80) return false;
          } else if (!isSemanticallySelfContainedQuestion(fq.question, fq.stimulus, fq.outcome)) {
            return false;
          }
          return !isDuplicateOrTooSimilar(fq.question, fq.stimulus, allAvoidItems, undefined, 0.38);
        }) || internalAllQuestions.find(fq => {
          if (fq.outcome !== requiredOutcome) return false;
          if (sourceReq.requiresSource && sourceReq.type === 'reading_text') {
            const fqReq = detectSourceRequirement(fq.question, fq.templateType, undefined, fq.stimulus);
            const fqQual = checkStimulusQuality(fq.stimulus, fqReq);
            return fqQual.isValid && (fq.stimulus || '').length >= 80;
          }
          return isSemanticallySelfContainedQuestion(fq.question, fq.stimulus, fq.outcome);
        });

        if (!fallbackMatch) {
          const sampleMatch = SAMPLE_EXAMS.flatMap(e => e.questions.map(sq => ({ sq, exam: e }))).find(({ sq }) => {
            if (sq.outcomeCode !== requiredOutcome) return false;
            if (sourceReq.requiresSource && sourceReq.type === 'reading_text') {
              const fqReq = detectSourceRequirement(sq.questionText, sq.archetype, sq.contextText, sq.stimulus);
              const fqQual = checkStimulusQuality(sq.stimulus, fqReq);
              if (!fqQual.isValid || (sq.stimulus || '').length < 80) return false;
            } else if (!isSemanticallySelfContainedQuestion(sq.questionText, sq.stimulus, sq.outcomeCode)) {
              return false;
            }
            return !isDuplicateOrTooSimilar(sq.questionText, sq.stimulus, allAvoidItems, undefined, 0.38);
          }) || SAMPLE_EXAMS.flatMap(e => e.questions.map(sq => ({ sq, exam: e }))).find(({ sq }) => {
            if (sq.outcomeCode !== requiredOutcome) return false;
            if (sourceReq.requiresSource && sourceReq.type === 'reading_text') {
              const fqReq = detectSourceRequirement(sq.questionText, sq.archetype, sq.contextText, sq.stimulus);
              const fqQual = checkStimulusQuality(sq.stimulus, fqReq);
              return fqQual.isValid && (sq.stimulus || '').length >= 80;
            }
            return isSemanticallySelfContainedQuestion(sq.questionText, sq.stimulus, sq.outcomeCode);
          });

          if (sampleMatch) {
            const { sq, exam } = sampleMatch;
            fallbackMatch = {
              number: sq.questionNumber,
              outcome: sq.outcomeCode,
              outcomeTitle: sq.outcomeTitle || officialTitle || 'Öğrenme Çıktısı',
              difficulty: sq.difficulty || 'Orta',
              level: sq.cognitiveLevel || 'Karmaşık Bilişsel Süreçler',
              templateType: sq.archetype || 'Kurgusal Senaryo & Vaka İncelemesi',
              points: targetPts,
              stimulus: sq.stimulus || '',
              question: sq.questionText,
              answer: sq.modelAnswer || '',
              alternativeAnswers: sq.alternativeAnswers,
              rubric: (sq.rubric || []).map((r: any) => ({ item: r.criterion, pts: r.points })),
              sourceOrigin: 'oyss_curated' as const,
              originExamTitle: exam.title,
              originQuestionNumber: sq.questionNumber,
              visual: sq.visual
            };
          }
        }

        if (fallbackMatch) {
          const rawRubric = (fallbackMatch.rubric || []).map((r: any) => ({
            criterion: r.item || r.criterion || 'Değerlendirme Ölçütü',
            points: r.pts ?? r.points
          }));
          const reconciled = reconcileRubricPoints(rawRubric, targetPts);

          const finalFallbackStem = sanitizeTextReferencesIfNoStimulus(
            fallbackMatch.question || `${officialTitle} ile ilgili durumu açıklayınız.`,
            fallbackMatch.stimulus || q.stimulus
          );

          return {
            number: idx + 1,
            outcome: requiredOutcome,
            outcomeTitle: officialTitle,
            cognitiveLevel: distItem.cognitiveLevel || fallbackMatch.level || 'Karmaşık Bilişsel Süreçler',
            difficulty: fallbackMatch.difficulty || 'Orta',
            templateType: fallbackMatch.templateType || 'Kurgusal Senaryo & Vaka İncelemesi',
            points: targetPts,
            stimulus: fallbackMatch.stimulus || q.stimulus || '',
            question: finalFallbackStem,
            answer: fallbackMatch.answer || 'Kavramsal ilkelerin doğru gerekçelendirilmesi beklenir.',
            alternativeAnswers: fallbackMatch.alternativeAnswers,
            solutionExplanation: fallbackMatch.solutionExplanation || (fallbackMatch.answer ? `Analitik çözüm adımları ve gerekçe: ${fallbackMatch.answer}` : undefined),
            rubric: reconciled.map(r => ({ item: r.criterion, pts: r.points })),
            sourceOrigin: 'oyss_curated' as const,
            originExamTitle: fallbackMatch.originExamTitle || 'OYSS Referans Havuzu',
            originQuestionNumber: fallbackMatch.originQuestionNumber,
            visual: fallbackMatch.visual
          };
        } else {
          // Uygun ikame bulunamadı: Yalnızca metin atıflarını silerek soruyu geçerli kabul ETME.
          // Kusurlu soruyu üretim sonucundan çıkar ve dinamik OYSS sentez havuzundan tam metinli soru üret!
          console.warn(`[SemanticAnswerability] ${idx + 1}. soru (${requiredOutcome}) için referans havuzunda geçerli ikame bulunamadı; dinamik OYSS sentez havuzundan tam metinli soru üretiliyor.`);
          return buildProceduralSyntheticQuestion(
            requiredOutcome,
            officialTitle,
            idx,
            targetPts,
            subjectId,
            variationIndex,
            distItem.cognitiveLevel
          );
        }
      }

      let calibratedDifficulty = q.difficulty || 'Orta';
      // Doğrudan kural uygulaması (yazım-noktalama) sorularında "Zor" etiketini pedagojik olarak "Orta" düzeyine kalibre et
      if (
        (requiredOutcome.includes('16') || officialTitle.toLowerCase().includes('yazım')) &&
        calibratedDifficulty === 'Zor'
      ) {
        calibratedDifficulty = 'Orta';
      }

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

      // Model cevap kontrolü: Geçerli kısa cevapları ("42", "Fotosentez" vb.) koru
      const validAnswer = typeof q.answer === 'string' && q.answer.trim().length > 0
        ? q.answer.trim()
        : 'Öğrencinin kavramsal ilkeleri doğru tespit etmesi ve gerekçelendirmesi beklenir.';

      const finalStem = sanitizeTextReferencesIfNoStimulus(rawStem, q.stimulus);

      // Anlamsal cevaplanabilirlik son güvencesi:
      // Eğer soru kökünden metin atfı silinse dahi soru tek başına anlamsal olarak cevaplanamaz durumdaysa
      // kusurlu soruyu üretim sonucundan çıkar ve güvenli dinamik sentez mekanizmasını kullan!
      if (!isSemanticallySelfContainedQuestion(finalStem, q.stimulus, requiredOutcome)) {
        console.warn(`[SemanticAnswerability] ${idx + 1}. soru ("${finalStem.slice(0, 40)}...") metinsiz cevaplanamaz; dinamik OYSS sentez havuzundan tam metinli soru üretiliyor.`);
        return buildProceduralSyntheticQuestion(
          requiredOutcome,
          officialTitle,
          idx,
          targetPts,
          subjectId,
          variationIndex,
          distItem.cognitiveLevel
        );
      }

      return {
        ...q,
        number: idx + 1,
        outcome: requiredOutcome,
        outcomeTitle: officialTitle,
        cognitiveLevel: distItem.cognitiveLevel || q.level || 'Karmaşık Bilişsel Süreçler',
        difficulty: calibratedDifficulty,
        points: targetPts,
        question: finalStem,
        answer: validAnswer,
        alternativeAnswers: altAnswers && altAnswers.length > 0 ? altAnswers : undefined,
        solutionExplanation: q.solutionExplanation || q.explanation || `Analitik çözüm adımları ve gerekçe: ${validAnswer}`,
        rubric: reconciled.map(r => ({ item: r.criterion, pts: r.points })),
        sourceOrigin: q.sourceOrigin || 'gemini_ai',
        visual: q.visual
      };
    });
    const calibrated = calibrateQuestionDifficulties(withTitles);
    const { enrichedQuestions } = validateAndEnrichExamQuestions(calibrated);
    return enrichedQuestions as GeneratedQuestionItem[];
  };

  // 1. TIER 1: Güvenli Sunucu Fonksiyonu Proxy (/api/generate)
  // Tüm yapay zekâ istekleri istemciden gizlenmiş sunucu tarafı Netlify Function üzerinden yürütülür.
  if (livePrompt && livePrompt.length <= HARD_LIMIT) {
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
      let questionsList = data?.questions;

      // İstemci tarafı KaTeX güvenli ayrıştırma (sunucu rawText döndürdüyse veya questions doğrudan parse edilemediyse)
      if (!questionsList || !Array.isArray(questionsList) || questionsList.length === 0) {
        const rawCandidateText = data?.rawText || data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        if (rawCandidateText) {
          const parsedFallback = parseExamJsonSafely(rawCandidateText);
          if (parsedFallback.success && parsedFallback.data?.questions) {
            questionsList = parsedFallback.data.questions;
          }
        }
      }

      if (questionsList && Array.isArray(questionsList) && questionsList.length > 0) {
        // Canlı yapay zekâ çıktısındaki her soruyu gemini_ai olarak etiketle
        const geminiTagged = questionsList.map((gq: any) => ({
          ...gq,
          sourceOrigin: gq.sourceOrigin || 'gemini_ai'
        }));
        const normalized = normalizeAndCalibrateQuestions(geminiTagged);

        // Anti-duplication sanity check: Canlı Gemini çıktısının mevcut sınav sorularını birebir tekrarlamadığından emin ol
        const hasDirectDuplicate = normalized.some(nq =>
          isDuplicateOrTooSimilar(nq.question, nq.stimulus, allAvoidItems, undefined, 0.45)
        );

        if (!hasDirectDuplicate) {
          const activeModelName = data?.activeModel || 'Gemini Akıllı Soru Motoru';
          const elapsedSec = Math.max(0.7, (Date.now() - startTime) / 1000).toFixed(1) + ' saniye';
          const examClassification = classifyExamQuestions(normalized);
          const classDetails = getExamClassificationDetails(examClassification);

          return {
            title: `${grade}. Sınıf ${scenario.name} (${classDetails.titleSuffix} - ${normalized.length} Soru)`,
            variationNumber: variationIndex + 1,
            generationTime: elapsedSec,
            model: `${activeModelName}`,
            isFallback: false,
            questionsCount: normalized.length,
            generatedQuestions: normalized,
            sourceValidationSummary: {
              isFullyValid: !normalized.some(q => q.hasMissingSourceError || q.hasMissingStemError),
              missingSourceCount: normalized.filter(q => q.hasMissingSourceError).length,
              missingStemCount: normalized.filter(q => q.hasMissingStemError).length,
              recoveredCount: normalized.filter(q => q.commonStimulus || q.sharedSourceId).length
            },
            promptMetrics: {
              promptLength: livePrompt.length,
              budgetCeiling: BUDGET_CEILING,
              compressionApplied: compressionLevel
            },
            examClassification
          };
        } else {
          console.warn('Canlı model çıktısında mevcut sınavla çakışan soru tespit edildi; yerel OYSS kural tabanlı motoruna aktarılıyor.');
          fallbackReason = 'Canlı yapay zekâ çıktısı mevcut sınavla benzerlik gösterdiğinden yerel OYSS standart motoru devreye alındı.';
        }
      } else {
        console.warn('Canlı model geçerli soru listesi sağlamadı:', data);
        fallbackReason = data?.error || 'Model çıktısı geçerli bir sınav formatına (questions dizisi) uymadığı için yerel motor devreye alındı.';
      }
    } else {
      let errJson: any = null;
      try {
        errJson = await proxyRes.json();
      } catch {}

      if (proxyRes.status === 429) {
        fallbackReason = 'Yapay zekâ servisi kota sınırında (429 - Çok sık istek). Lütfen bir dakika sonra tekrar deneyiniz.';
      } else if (proxyRes.status === 422) {
        // Kontrollü Kurtarma: Eğer HTTP 422 soru kökü eksikliği nedeniyle döndüyse ve eldeki sorular varsa,
        // yalnızca eksik soru kökünü yerel onaylı soruyla ikame ederek geçerli soruları kurtar
        if (errJson?.code === 'EMPTY_QUESTION_STEM' && Array.isArray(errJson?.questions) && errJson.questions.length > 0) {
          const geminiTagged = errJson.questions.map((gq: any) => ({
            ...gq,
            sourceOrigin: gq.sourceOrigin || 'gemini_ai'
          }));
          const normalized = normalizeAndCalibrateQuestions(geminiTagged);
          const hasDirectDuplicate = normalized.some(nq =>
            isDuplicateOrTooSimilar(nq.question, nq.stimulus, allAvoidItems, undefined, 0.45)
          );

          if (!hasDirectDuplicate) {
            const activeModelName = errJson?.activeModel || 'Gemini Akıllı Soru Motoru (Kısmi İkame)';
            const elapsedSec = Math.max(0.7, (Date.now() - startTime) / 1000).toFixed(1) + ' saniye';
            const examClassification = classifyExamQuestions(normalized);
            const classDetails = getExamClassificationDetails(examClassification);

            return {
              title: `${grade}. Sınıf ${scenario.name} (${classDetails.titleSuffix} - ${normalized.length} Soru)`,
              variationNumber: variationIndex + 1,
              generationTime: elapsedSec,
              model: `${activeModelName}`,
              isFallback: false,
              questionsCount: normalized.length,
              generatedQuestions: normalized,
              sourceValidationSummary: {
                isFullyValid: !normalized.some(q => q.hasMissingSourceError || q.hasMissingStemError),
                missingSourceCount: normalized.filter(q => q.hasMissingSourceError).length,
                missingStemCount: normalized.filter(q => q.hasMissingStemError).length,
                recoveredCount: normalized.filter(q => q.commonStimulus || q.sharedSourceId).length
              },
              promptMetrics: {
                promptLength: livePrompt.length,
                budgetCeiling: BUDGET_CEILING,
                compressionApplied: compressionLevel
              },
              examClassification
            };
          }
        }
        fallbackReason = errJson?.error || 'Üretilen sınav yanıtı biçimsel şemaya uymadığı için yerel motor devreye alındı.';
      } else if (proxyRes.status === 502 || proxyRes.status === 503) {
        fallbackReason = errJson?.error || 'Yapay zekâ servisi şu anda meşgul veya geçici olarak yanıt veremiyor (HTTP 502/503).';
      } else {
        fallbackReason = errJson?.error || `Yapay zekâ servisi yanıt veremedi (HTTP ${proxyRes.status}).`;
      }
    }
  } catch (proxyErr: any) {
    console.warn('Sunucu proxy çağrısı başarısız, yerel yedek motora geçiliyor:', proxyErr?.message || proxyErr);
    fallbackReason = 'Canlı yapay zekâ servisiyle bağlantı kurulamadı (Ağ/Çevrimdışı); sorular OYSS kural tabanlı standart motoruyla hazırlandı.';
  }
  } else if (livePrompt && livePrompt.length > HARD_LIMIT) {
    console.warn(`Prompt boyutu güvenlik sınırını aştı (${livePrompt.length} > ${HARD_LIMIT}); güvenli yerel motora aktarılıyor.`);
    fallbackReason = `Prompt metni izin verilen karakter sınırını (${HARD_LIMIT}) aştığı için sorular yerel OYSS standart motoruyla güvenle hazırlandı.`;
  }

  // 2. TIER 2: Prosedürel OYSS Kural Tabanlı Motor (MEBİ Ölçme Referanslı Yedek)
  // Sunucu API yanıt veremediğinde veya bağlantı olmadığında devreye giren deterministik üretim motoru.
  const _cycle = variationIndex % 2;
  void _cycle;

  // ---------------------------------------------------------------------------
  // KAZANIM ODAKLI VE RESMİ ÖDSGM/MEB SENARYO DAĞILIMINA %100 UYUMLU PROSEDÜREL SEÇİCİ
  // ---------------------------------------------------------------------------
  // Her ders ve her senaryo için soru seçimi; soru numarasına veya sıralı döngüye göre DEĞİL,
  // Soru i için belirlenen resmi "d.outcomeCode" kazanımına göre TAM EŞLEŞME ile yapılır.
  const occurrenceCount: Record<string, number> = {};

  const isCurrentExam = (e: any) => e.scenarioId === scenario.id || e.id.endsWith(scenario.id) || e.id.includes(scenario.id);

  const dynamicQuestions: GeneratedQuestionItem[] = questionDistributions.map((d, idx) => {
    const outcomeCode = d.outcomeCode;
    const occ = occurrenceCount[outcomeCode] || 0;
    occurrenceCount[outcomeCode] = occ + 1;

    const officialOutcome = getOfficialOutcomeTitle(outcomeCode);
    const resolvedTitle = (officialOutcome && officialOutcome !== outcomeCode)
      ? officialOutcome
      : (d.notes || 'Öğrenme Çıktısı');

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

    // 2. Ardından içeride tanımlı zengin referans havuzundaki ilgili kazanım sorularını filtrele
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
        rubric: q.rubric,
        sourceOrigin: 'oyss_curated' as const,
        visual: q.visual
      })),
      ...matchingSampleQuestionsWithExam.map(({ q, parentExam }) => {
        let stim = q.stimulus || '';
        const req = detectSourceRequirement(q.questionText, q.archetype, q.contextText, stim);
        const quality = checkStimulusQuality(stim, req);
        // Eğer bu soru bir meta-özet veya önceki soruya referans ise, ana sınavdaki tam okuma metnini devral
        if (!quality.isValid && (quality.isCrossReference || quality.isMetaSummary)) {
          const parentSourceQ = parentExam.questions.find((pq: any) => {
            const pqStim = pq.stimulus?.trim() || '';
            const pqReq = detectSourceRequirement(pq.questionText, pq.archetype, pq.contextText, pqStim);
            const pqQuality = checkStimulusQuality(pqStim, pqReq);
            return pqQuality.isValid && pqStim.length >= 80;
          }) || parentExam.questions[0];

          if (parentSourceQ?.stimulus && parentSourceQ.stimulus.length >= 80) {
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
          rubric: (q.rubric || []).map((r: any) => ({ item: r.criterion, pts: r.points })),
          sourceOrigin: 'oyss_curated' as const,
          originExamTitle: parentExam.title || `${parentExam.grade}. Sınıf ${parentExam.scenarioId || 'Örnek Sınav'}`,
          originQuestionNumber: q.questionNumber,
          visual: q.visual
        };
      }),
      ...crossGradeSampleQuestionsWithExam.map(({ q, parentExam }) => {
        let stim = q.stimulus || '';
        const req = detectSourceRequirement(q.questionText, q.archetype, q.contextText, stim);
        const quality = checkStimulusQuality(stim, req);
        if (!quality.isValid && (quality.isCrossReference || quality.isMetaSummary)) {
          const parentSourceQ = parentExam.questions.find((pq: any) => {
            const pqStim = pq.stimulus?.trim() || '';
            const pqReq = detectSourceRequirement(pq.questionText, pq.archetype, pq.contextText, pqStim);
            const pqQuality = checkStimulusQuality(pqStim, pqReq);
            return pqQuality.isValid && pqStim.length >= 80;
          }) || parentExam.questions[0];

          if (parentSourceQ?.stimulus && parentSourceQ.stimulus.length >= 80) {
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
          rubric: (q.rubric || []).map((r: any) => ({ item: r.criterion, pts: r.points })),
          sourceOrigin: 'oyss_curated' as const,
          originExamTitle: parentExam.title || `${parentExam.grade}. Sınıf ${parentExam.scenarioId || 'Örnek Sınav'}`,
          originQuestionNumber: q.questionNumber,
          visual: q.visual
        };
      })
    ];

    // Anti-duplication filtreleme: Mevcut sınav soruları veya daha önce üretilen sorularla eşleşenleri ayıkla
    const filteredPool = availablePool.filter((cand) => {
      return !isDuplicateOrTooSimilar(cand.question, cand.stimulus, allAvoidItems, undefined, 0.38);
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
        ],
        sourceOrigin: (q as any).sourceOrigin || 'oyss_curated',
        originExamTitle: (q as any).originExamTitle,
        originQuestionNumber: (q as any).originQuestionNumber,
        visual: q.visual
      };
    }

    // 4. Havuzda henüz bulunmayan veya mükerrerlik filtresi sonrası boş kalan kazanımlar için pedagojik dinamik OYSS sentezi
    const dynSubjectName = subjectId.replace(/_/g, ' ').toUpperCase();

    // Türkçe dersi için özel bağlamsal edebî kurgular
    if (subjectId === 'turkce') {
      const turkishContexts = TURKISH_PROCEDURAL_CONTEXTS;

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
            `Metinde anlatılan ${ctx.theme} olayında adalet, emek ve paylaşım bilinci vurgulanmaktadır.`,
            `Olay örgüsünde ${ctx.theme} çerçevesinde toplumsal dayanışma, dürüstlük ve ortak sorumluluk değerleri öne çıkarılmıştır.`
          ],
          rubric: [
            { item: 'Metnin ana konusunun ve olay örgüsünün doğru tespiti', pts: Math.round((pointAllocations[idx] || 15) * 0.5) },
            { item: 'Gerekçenin metindeki somut eylemlerle delillendirilmesi', pts: Math.round((pointAllocations[idx] || 15) * 0.5) }
          ],
          sourceOrigin: 'oyss_synthetic'
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
            `Kelimeler metindeki bağlama uygun olarak doğru anlamlandırılmıştır.`,
            `Her iki sözcüğün de metnin ana temasına ve cümle yapısına uygun anlam karşılıkları yazılmıştır.`
          ],
          rubric: [
            { item: 'Kelimelerin bağlama uygun doğru anlamlandırılması', pts: Math.round((pointAllocations[idx] || 15) * 0.5) },
            { item: 'Örnek cümlelerin anlam bütünlüğü ve dilbilgisi kurallarına uygunluğu', pts: Math.round((pointAllocations[idx] || 15) * 0.5) }
          ],
          sourceOrigin: 'oyss_synthetic'
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
            `Deyimler yerinde ve doğru anlamda kullanılarak tutarlı bir metin kurgulanmıştır.`,
            `Belirtilen deyimler bağlama ve tema akışına uygun seçilerek dil kurallarına uygun şekilde metne işlenmiştir.`
          ],
          rubric: [
            { item: 'Deyimlerin yerinde ve doğru anlamda kullanılması', pts: Math.round((pointAllocations[idx] || 15) * 0.5) },
            { item: 'Paragrafın kurgusal bütünlüğü ve akıcılığı', pts: Math.round((pointAllocations[idx] || 15) * 0.5) }
          ],
          sourceOrigin: 'oyss_synthetic'
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
            `Büyük harf ve noktalama işaretleri eksiksiz düzeltilmiştir.`,
            `Cümledeki özel isim yazımı, iki nokta ve büyük harf kuralları doğru biçimde uygulanarak cümle yeniden yazılmıştır.`
          ],
          rubric: [
            { item: 'Büyük harf ve noktalama hatalarının tespiti', pts: Math.round((pointAllocations[idx] || 15) * 0.5) },
            { item: 'Cümlenin hatasız yeniden yazımı', pts: Math.round((pointAllocations[idx] || 15) * 0.5) }
          ],
          sourceOrigin: 'oyss_synthetic'
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
      ],
      sourceOrigin: 'oyss_synthetic'
    };
  });

  const finalDynamicQuestions = normalizeAndCalibrateQuestions(dynamicQuestions);
  const examClassification = classifyExamQuestions(finalDynamicQuestions);
  const classDetails = getExamClassificationDetails(examClassification);

  const elapsedFormatted = Math.max(0.6, (Date.now() - startTime) / 1000).toFixed(1) + ' saniye';

  return {
    title: `${grade}. Sınıf ${scenario.name} (${classDetails.titleSuffix} - ${finalDynamicQuestions.length} Soru)`,
    variationNumber: variationIndex + 1,
    generationTime: elapsedFormatted,
    model: 'OYSS Standart Soru Üretim Motoru (MEBİ Ölçme Referanslı)',
    isFallback: true,
    fallbackReason: fallbackReason || 'Canlı yapay zekâ servisi şu anda meşgul veya çevrimdışı olduğundan sorular yerel OYSS kural tabanlı standart motoruyla hazırlandı.',
    questionsCount: finalDynamicQuestions.length,
    generatedQuestions: finalDynamicQuestions,
    sourceValidationSummary: {
      isFullyValid: !finalDynamicQuestions.some(q => q.hasMissingSourceError),
      missingSourceCount: finalDynamicQuestions.filter(q => q.hasMissingSourceError).length,
      recoveredCount: finalDynamicQuestions.filter(q => q.commonStimulus || q.sharedSourceId).length
    },
    examClassification
  };
}
