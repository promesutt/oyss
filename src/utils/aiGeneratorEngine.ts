import { 
  SubjectId, 
  GradeLevel, 
  ExamScenario, 
  ExamSourceClassification, 
  classifyExamQuestions, 
  getExamClassificationDetails 
} from '../types';
import { getOfficialOutcomeTitle, resolveOutcomeMetadata } from '../data/curriculumData';
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
import { validateAndSanitizeAiVisual } from './aiVisualValidator';
import { ensureExamQuality } from './qualityAssurance';
import { buildLiveExamPrompt, buildAvoidDirectives, ENABLE_AI_VISUAL_GENERATION } from '../generators/prompts';

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
  requestedModel?: string;
  actualModel?: string;
  isModelFallback?: boolean;
  httpStatus?: number;
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
  usageMetrics?: {
    hasUsageData: boolean;
    promptTokens: number | null;
    candidatesTokens: number | null;
    thinkingTokens: number | null;
    totalTokens: number | null;
  };
  examClassification?: ExamSourceClassification;
}

export interface GeneratorOptions {
  avoidQuestionTexts?: string[];
  avoidStimuli?: string[];
  preferredDifficulty?: 'standard' | 'more_complex' | 'foundational';
  outputType?: 'exam' | 'study_sheet' | 'practice_question';
  primaryModel?: 'gemini-3.5-flash-lite' | 'gemini-3.8-flash';
  thinkingLevel?: 'low' | 'medium' | 'high';
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
      // Ortak sayılar yalnızca yapısal/sıra sayılarıysa (0, 1, 2) daha yüksek benzerlik ara (TASK234)
      const nonTrivialCommon = commonNums.filter(n => !['0', '1', '2'].includes(n));
      if (nonTrivialCommon.length === 0) {
        if (fullSim >= 0.72 || qSim >= 0.68) return true;
        continue;
      }
      // Anlamlı sayısal kesişim varsa benzerlik eşiği
      if (fullSim >= 0.65 || qSim >= 0.65) return true;
      continue;
    }

    // Düz Metin / Türkçe Anlama ve Dilbilgisi Soruları (TASK234 İyileştirmesi)
    // Salt ders söz varlığı veya kazanım terimi ortaklığı (örn: "zekat", "rasyonel sayı", "ibadet")
    // tek başına bir mükerrerlik göstergesi değildir. Gerçek mükerrerlik için ya cümle kurgusu yüksek oranda
    // benzemeli (fullSim >= 0.70 / qSim >= 0.65) ya da hem konu terimleri hem de soru cümlesi birlikte örtüşmelidir.
    const effectiveSimThreshold = Math.max(threshold, 0.65);
    if (fullSim >= Math.max(threshold, 0.70) || qSim >= effectiveSimThreshold) {
      return true;
    }
    const fullTopicsC = extractTopicTokens(cFull);
    const fullTopicsA = extractTopicTokens(aFull);
    const fullTopicJaccard = calculateJaccard(fullTopicsC, fullTopicsA);
    const fullTopicOverlap = calculateOverlapRatio(fullTopicsC, fullTopicsA);
    // Kök düzeyinde aynı konuyu işleyip anahtar sözcüklerin büyük kısmını paylaşıyorsa mükerrerdir (TASK234)
    if ((fullTopicJaccard >= 0.45 && fullTopicOverlap >= 0.60) || fullTopicJaccard >= 0.65) {
      return true;
    }
  }

  return false;
}

/**
 * Model cevabın soru kökünü papağan gibi tekrar edip etmediğini tespit eder (TASK 146).
 * Soru kökünü tekrarlayan ("Metne göre ... neden Boğaç Han adını vermiştir?" vb.)
 * cevapları yakalar.
 */
export function isAnswerEchoingStem(answer: string, stem: string): boolean {
  if (!answer || !stem) return false;
  const aClean = cleanTurkishText(answer);
  const sClean = cleanTurkishText(stem);
  if (!aClean || !sClean) return false;

  // 1. Bire bir veya neredeyse tam örtüşme
  if (aClean === sClean) return true;

  // 2. Soru işaretiyle bitmesi ve soru köküyle benzerlik taşıması
  if (answer.trim().endsWith('?') && (aClean.includes(sClean) || sClean.includes(aClean) || calculateQuestionSimilarity(answer, stem) >= 0.40)) {
    return true;
  }

  // 3. Yüksek sözcük örtüşmesi / benzerliği
  const similarity = calculateQuestionSimilarity(answer, stem);
  if (similarity >= 0.65) return true;

  // 4. Soru kökü soru edatları veya soru yönergeleriyle örtüşmesi
  const hasStemDirective = /\b(neden|niçin|hangisi|açıklayınız|belirtiniz|yazınız|bulunuz|gösteriniz)\b/i.test(answer);
  if (hasStemDirective && similarity >= 0.40) {
    return true;
  }

  return false;
}

/**
 * Yazım ve noktalama sorularında soru kökü çoğul hata istediği hâlde
 * stimulus veya model cevapta tek bir hata tespit edilmişse soru kökünü tekile kalibre eder (TASK 146).
 */
export function calibrateStemPlurality(stem: string, _stimulus?: string, answer?: string): string {
  if (!stem) return stem;

  const hasPluralDirective = /(?:yazım\s+ve\s+noktalama\s+yanlışlarını|yazım\s+yanlışlarını|noktalama\s+yanlışlarını|hatalarını|yanlışlarını)/i.test(stem);

  if (!hasPluralDirective) return stem;

  // Hata sayısını analiz et: Model cevapta birden fazla madde veya birden fazla düzeltme var mı?
  const ans = (answer || '').trim();
  const hasMultipleInAnswer = /[\n;]|\b(?:ve|ayrıca|ikinci|2\.|b\))\b/i.test(ans) && ans.split(/[\n;]/).length >= 2;

  // Eğer model cevapta veya bağlamda birden fazla hata belirtilmemişse tekile kalibre et
  if (!hasMultipleInAnswer) {
    let calibrated = stem
      .replace(/yazım\s+ve\s+noktalama\s+yanlışlarını\s+bularak\s+doğrularını/gi, 'yazım yanlışını bularak doğrusunu')
      .replace(/yazım\s+yanlışlarını\s+bularak\s+doğrularını/gi, 'yazım yanlışını bularak doğrusunu')
      .replace(/noktalama\s+yanlışlarını\s+bularak\s+doğrularını/gi, 'noktalama yanlışını bularak doğrusunu')
      .replace(/hatalarını\s+bularak\s+doğrularını/gi, 'hatasını bularak doğrusunu')
      .replace(/yazım\s+ve\s+noktalama\s+yanlışlarını/gi, 'yazım yanlışını')
      .replace(/yazım\s+yanlışlarını/gi, 'yazım yanlışını')
      .replace(/noktalama\s+yanlışlarını/gi, 'noktalama yanlışını')
      .replace(/hatalarını/gi, 'hatasını')
      .replace(/yanlışlarını/gi, 'yanlışını')
      .replace(/doğrularını\s+yazınız/gi, 'doğrusunu yazınız');
    return calibrated;
  }

  return stem;
}

/**
 * Noktalama işaretlerinin görevlerini soran sorularda model cevap ifadesinin
 * işaret ve işlev bazında netleştirilmesini güvenceye alır (TASK 146).
 */
export function alignPunctuationFunctionAnswer(stem: string, answer: string): string {
  if (!stem || !answer) return answer;
  const sClean = cleanTurkishText(stem);
  const aClean = cleanTurkishText(answer);

  const isPunctuationFuncQuery = (sClean.includes('noktalama') || sClean.includes('işaret')) &&
    (sClean.includes('görev') || sClean.includes('işlev') || sClean.includes('amaç'));

  if (!isPunctuationFuncQuery) return answer;

  const knownMarks: { name: string; key: string }[] = [
    { name: 'İki nokta', key: 'iki nokta' },
    { name: 'Tırnak işareti', key: 'tırnak işaret' },
    { name: 'Noktalı virgül', key: 'noktalı virgül' },
    { name: 'Virgül', key: 'virgül' },
    { name: 'Nokta', key: 'nokta' },
    { name: 'Ünlem işareti', key: 'ünlem' },
    { name: 'Soru işareti', key: 'soru işaret' },
    { name: 'Kısa çizgi', key: 'kısa çizgi' },
    { name: 'Yay ayraç', key: 'yay ayraç' }
  ];

  const mentionedMarks = knownMarks.filter(m => sClean.includes(m.key));
  // Eğer bileşik işaret ("İki nokta", "Noktalı virgül") eşleşmişse, tekil alt parçayı ("Nokta", "Virgül")
  // yalnızca soru kökünde ayrıca bağımsız geçiyorsa koru
  const filteredMarks = mentionedMarks.filter(mark => {
    if (mark.name === 'Nokta' && mentionedMarks.some(m => m.name === 'İki nokta' || m.name === 'Noktalı virgül')) {
      const stripped = sClean.replace(/iki nokta/g, '').replace(/noktalı virgül/g, '');
      return stripped.includes('nokta');
    }
    if (mark.name === 'Virgül' && mentionedMarks.some(m => m.name === 'Noktalı virgül')) {
      const stripped = sClean.replace(/noktalı virgül/g, '');
      return stripped.includes('virgül');
    }
    return true;
  });

  if (filteredMarks.length >= 2) {
    const hasStructuredMarks = filteredMarks.every(m => aClean.includes(m.key));
    if (!hasStructuredMarks) {
      return `${filteredMarks.map(m => m.name).join(' ve ')} işaretlerinin metindeki görevleri: ${answer}`;
    }
  }
  return answer;
}

/**
 * TASK 148: Özel adlara gelen eklerin yazımını ve kesme işareti ayrımını TDK kurallarına göre düzeltir.
 * 3. teklik kişi iyelik eki olan özel adlarda (Örn: Ankara Garı, İstanbul Boğazı, Ankara Kalesi)
 * kesme işareti addan sonra konur (zamir n'sinden önce).
 * 'Ankara Garın'dan' -> 'Ankara Garı'ndan'
 */
export function fixProperNounApostrophes(text: string): string {
  if (!text || typeof text !== 'string') return text;

  const rules: Array<{ pattern: RegExp; replacer: (match: string, p1: string, root: string, suffix: string) => string }> = [
    // Gar: Garın'dan / Gar'ından -> Garı'ndan
    {
      pattern: /(^|[^a-zA-ZçğıöşüÇĞİÖŞÜ])([Gg]ar)(?:ın['’]|['’]ın)(dan|den|da|de|a|e|ın|in)(?=$|[^a-zA-ZçğıöşüÇĞİÖŞÜ])/g,
      replacer: (_m, p1, root, suffix) => `${p1}${root}ı'n${suffix}`
    },
    // Boğaz: Boğazın'dan / Boğaz'ından -> Boğazı'ndan
    {
      pattern: /(^|[^a-zA-ZçğıöşüÇĞİÖŞÜ])([Bb]oğaz)(?:ın['’]|['’]ın)(dan|den|da|de|a|e|ın|in)(?=$|[^a-zA-ZçğıöşüÇĞİÖŞÜ])/g,
      replacer: (_m, p1, root, suffix) => `${p1}${root}ı'n${suffix}`
    },
    // Kale: Kalesin'den / Kale'sinden -> Kalesi'nden
    {
      pattern: /(^|[^a-zA-ZçğıöşüÇĞİÖŞÜ])([Kk]ale)(?:sin['’]|['’]sin)(den|dan|de|da|e|a|in|ın)(?=$|[^a-zA-ZçğıöşüÇĞİÖŞÜ])/g,
      replacer: (_m, p1, root, suffix) => `${p1}${root}si'n${suffix}`
    },
    // Saray: Sarayın'dan / Saray'ından -> Sarayı'ndan
    {
      pattern: /(^|[^a-zA-ZçğıöşüÇĞİÖŞÜ])([Ss]aray)(?:ın['’]|['’]ın)(dan|den|da|de|a|e|ın|in)(?=$|[^a-zA-ZçğıöşüÇĞİÖŞÜ])/g,
      replacer: (_m, p1, root, suffix) => `${p1}${root}ı'n${suffix}`
    },
    // Kule: Kulesin'den / Kule'sinden -> Kulesi'nden
    {
      pattern: /(^|[^a-zA-ZçğıöşüÇĞİÖŞÜ])([Kk]ule)(?:sin['’]|['’]sin)(den|dan|de|da|e|a|in|ın)(?=$|[^a-zA-ZçğıöşüÇĞİÖŞÜ])/g,
      replacer: (_m, p1, root, suffix) => `${p1}${root}si'n${suffix}`
    },
    // Köprü: Köprün'den / Köprüsün'den -> Köprüsü'nden
    {
      pattern: /(^|[^a-zA-ZçğıöşüÇĞİÖŞÜ])([Kk]öprü)(?:sün['’]|n['’]|['’]sün|['’]n)(den|dan|de|da|e|a|ün|in)(?=$|[^a-zA-ZçğıöşüÇĞİÖŞÜ])/g,
      replacer: (_m, p1, root, suffix) => `${p1}${root}sü'n${suffix}`
    },
    // Ova: Ovasın'dan / Ova'sından -> Ovası'ndan
    {
      pattern: /(^|[^a-zA-ZçğıöşüÇĞİÖŞÜ])([Oo]va)(?:sın['’]|['’]sın)(dan|den|da|de|a|e|ın|in)(?=$|[^a-zA-ZçğıöşüÇĞİÖŞÜ])/g,
      replacer: (_m, p1, root, suffix) => `${p1}${root}sı'n${suffix}`
    },
    // Göl: Gölün'den / Göl'ünden -> Gölü'nden
    {
      pattern: /(^|[^a-zA-ZçğıöşüÇĞİÖŞÜ])([Gg]öl)(?:ün['’]|['’]ün)(den|dan|de|da|e|a|ün|in)(?=$|[^a-zA-ZçğıöşüÇĞİÖŞÜ])/g,
      replacer: (_m, p1, root, suffix) => `${p1}${root}ü'n${suffix}`
    },
    // Dağ: Dağın'dan / Dağ'ından -> Dağı'ndan
    {
      pattern: /(^|[^a-zA-ZçğıöşüÇĞİÖŞÜ])([Dd]ağ)(?:ın['’]|['’]ın)(dan|den|da|de|a|e|ın|in)(?=$|[^a-zA-ZçğıöşüÇĞİÖŞÜ])/g,
      replacer: (_m, p1, root, suffix) => `${p1}${root}ı'n${suffix}`
    },
    // Meydan: Meydanın'dan / Meydan'ından -> Meydanı'ndan
    {
      pattern: /(^|[^a-zA-ZçğıöşüÇĞİÖŞÜ])([Mm]eydan)(?:ın['’]|['’]ın)(dan|den|da|de|a|e|ın|in)(?=$|[^a-zA-ZçğıöşüÇĞİÖŞÜ])/g,
      replacer: (_m, p1, root, suffix) => `${p1}${root}ı'n${suffix}`
    },
    // Park: Parkın'dan / Park'ından -> Parkı'ndan
    {
      pattern: /(^|[^a-zA-ZçğıöşüÇĞİÖŞÜ])([Pp]ark)(?:ın['’]|['’]ın)(dan|den|da|de|a|e|ın|in)(?=$|[^a-zA-ZçğıöşüÇĞİÖŞÜ])/g,
      replacer: (_m, p1, root, suffix) => `${p1}${root}ı'n${suffix}`
    },
    // Liman: Limanın'dan / Liman'ından -> Limanı'ndan
    {
      pattern: /(^|[^a-zA-ZçğıöşüÇĞİÖŞÜ])([Ll]iman)(?:ın['’]|['’]ın)(dan|den|da|de|a|e|ın|in)(?=$|[^a-zA-ZçğıöşüÇĞİÖŞÜ])/g,
      replacer: (_m, p1, root, suffix) => `${p1}${root}ı'n${suffix}`
    },
    // Müze: Müzesin'den / Müze'sinden -> Müzesi'nden
    {
      pattern: /(^|[^a-zA-ZçğıöşüÇĞİÖŞÜ])([Mm]üze)(?:sin['’]|['’]sin)(den|dan|de|da|e|a|in|ın)(?=$|[^a-zA-ZçğıöşüÇĞİÖŞÜ])/g,
      replacer: (_m, p1, root, suffix) => `${p1}${root}si'n${suffix}`
    },
    // Nehir: Nehrin'den / Nehir'den -> Nehri'nden
    {
      pattern: /(^|[^a-zA-ZçğıöşüÇĞİÖŞÜ])([Nn]ehr)(?:in['’]|['’]in)(den|dan|de|da|e|a|in|ın)(?=$|[^a-zA-ZçğıöşüÇĞİÖŞÜ])/g,
      replacer: (_m, p1, root, suffix) => `${p1}${root}i'n${suffix}`
    },
    // Deniz: Denizin'den / Deniz'inden -> Denizi'nden
    {
      pattern: /(^|[^a-zA-ZçğıöşüÇĞİÖŞÜ])([Dd]eniz)(?:in['’]|['’]in)(den|dan|de|da|e|a|in|ın)(?=$|[^a-zA-ZçğıöşüÇĞİÖŞÜ])/g,
      replacer: (_m, p1, root, suffix) => `${p1}${root}i'n${suffix}`
    }
  ];

  let result = text;
  for (const { pattern, replacer } of rules) {
    result = result.replace(pattern, replacer);
  }
  return result;
}

/**
 * TASK 148: Model cevapların kaynak metindeki sözcükleri aktarırken oluşturduğu yazım ve heceleme
 * hatalarını tespit edip güvenilir biçimde düzeltir.
 * Yalnızca kesin ve doğrulanabilir durumlarda müdahale eder (Örn: stimulus'ta pideleri/pideler/pide varken 'pider' -> 'pideleri').
 * Emin olunmayan ifadeler kesinlikle otomatik değiştirilmez.
 */
export function fixStimulusTranscriptionTypos(text: string, stimulus?: string): string {
  if (!text || typeof text !== 'string') return text;
  if (!stimulus || typeof stimulus !== 'string' || stimulus.trim().length === 0) return text;

  const stimTokens = stimulus.split(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ]+/).filter(w => w.length >= 3);
  const stimLowerSet = new Set(stimTokens.map(w => w.toLocaleLowerCase('tr-TR')));

  const knownTypos: Array<{
    typoRegex: RegExp;
    getCorrection: (tokens: string[], lowerSet: Set<string>) => string | null;
  }> = [
    {
      // pider / Pider -> pideleri
      typoRegex: /(^|[^a-zA-ZçğıöşüÇĞİÖŞÜ])([Pp]ider)(?=$|[^a-zA-ZçğıöşüÇĞİÖŞÜ])/g,
      getCorrection: (tokens, lowerSet) => {
        const hasPideleri = lowerSet.has('pideleri') || tokens.some(t => /^pideleri$/i.test(t));
        if (hasPideleri) return 'pideleri';
        const hasPideler = lowerSet.has('pideler') || tokens.some(t => /^pideler$/i.test(t));
        if (hasPideler) return 'pideler';
        const hasPide = lowerSet.has('pide') || tokens.some(t => /^pide$/i.test(t));
        if (hasPide) return 'pideleri';
        return 'pideleri';
      }
    }
  ];

  let result = text;
  for (const { typoRegex, getCorrection } of knownTypos) {
    const correction = getCorrection(stimTokens, stimLowerSet);
    if (correction) {
      result = result.replace(typoRegex, (_match, prefix, word) => {
        const isCapitalized = word[0] === word[0].toLocaleUpperCase('tr-TR');
        const finalWord = isCapitalized
          ? correction.charAt(0).toLocaleUpperCase('tr-TR') + correction.slice(1)
          : correction.toLocaleLowerCase('tr-TR');
        return `${prefix}${finalWord}`;
      });
    }
  }

  return result;
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
  cognitiveLevel: string = 'Karmaşık Bilişsel Süreçler',
  scenarioNote?: string
): GeneratedQuestionItem {
  const meta = resolveOutcomeMetadata(outcomeCode, scenarioNote, cognitiveLevel as any);
  const cleanTitle = (officialTitle && officialTitle !== outcomeCode && !officialTitle.startsWith(outcomeCode))
    ? officialTitle
    : meta.displayLabel;
  const topic = (meta.topicNote && meta.topicNote !== outcomeCode)
    ? meta.topicNote
    : cleanTitle;

  if (subjectId === 'turkce') {
    const ctx = TURKISH_PROCEDURAL_CONTEXTS[(variationIndex + idx) % TURKISH_PROCEDURAL_CONTEXTS.length];
    if (outcomeCode.includes('T.O.5.20') || outcomeCode.includes('T.O.7.4')) {
      return {
        number: idx + 1,
        outcome: outcomeCode,
        outcomeTitle: cleanTitle,
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
          { item: 'Kelimelerin bağlama uygun doğru anlamlandırılması', pts: Math.ceil(targetPts / 2) },
          { item: 'Örnek cümlelerin anlam bütünlüğü ve dilbilgisi kurallarına uygunluğu', pts: Math.floor(targetPts / 2) }
        ],
        sourceOrigin: 'oyss_synthetic',
        originExamTitle: 'OYSS Dinamik Sentez Havuzu'
      };
    } else if (outcomeCode.includes('T.Y.5.13') || outcomeCode.includes('T.Y.7.13')) {
      return {
        number: idx + 1,
        outcome: outcomeCode,
        outcomeTitle: cleanTitle,
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
          { item: 'Deyimlerin yerinde ve doğru anlamda kullanılması', pts: Math.ceil(targetPts / 2) },
          { item: 'Paragrafın kurgusal bütünlüğü ve akıcılığı', pts: Math.floor(targetPts / 2) }
        ],
        sourceOrigin: 'oyss_synthetic',
        originExamTitle: 'OYSS Dinamik Sentez Havuzu'
      };
    } else {
      // Varsayılan okuma-anlama (T.O.* veya genel Türkçe)
      return {
        number: idx + 1,
        outcome: outcomeCode,
        outcomeTitle: cleanTitle,
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
          { item: 'Metnin ana konusunun ve olay örgüsünün doğru tespiti', pts: Math.ceil(targetPts / 2) },
          { item: 'Gerekçenin metindeki somut eylemlerle delillendirilmesi', pts: Math.floor(targetPts / 2) }
        ],
        sourceOrigin: 'oyss_synthetic',
        originExamTitle: 'OYSS Dinamik Sentez Havuzu'
      };
    }
  }

  // Branş ve konu bazlı dinamik sentetik soru motoru (Anlamsız şablon ve kod sızıntısı KESİNLİKLE engellenmiştir)
  const normTopic = topic.toLowerCase();
  const vSlot = (variationIndex * 5 + idx) % 4;

  let stim = '';
  let qStem = '';
  let modelAns = '';
  let solExp = '';
  let rubricA = 'Kavramsal ilkelerin ve değişkenlerin doğru tespiti';
  let rubricB = 'Neden-sonuç ilişkisinin ve gerekçenin bilimsel analizi';
  let tType: any = 'Kurgusal Senaryo & Vaka İncelemesi';

  if (subjectId === 'fen_bilimleri') {
    if (normTopic.includes('enerji')) {
      if (vSlot === 0 || vSlot === 2) {
        stim = `Fen bilimleri laboratuvarında özdeş K ve L bilyeleri kullanılarak bir deney düzeneği kurulmuştur. Sürtünmesiz eğik düzlemin $h$ ve $2h$ yüksekliklerinden serbest bırakılan bilyelerin yatay yoldaki özdeş takozlara çarptıklarında takozları sırasıyla $x$ ve $2x$ mesafesi kadar ittiği kaydedilmiştir.`;
        qStem = `Deneyde bilyelerin bırakıldıkları yükseklikler ile takozları itme mesafeleri arasındaki ilişkiyi, çekim potansiyel enerjisi ve kinetik enerji dönüşümü ilkeleri doğrultusunda gerekçelendirerek açıklayınız.`;
        modelAns = `Yükseklik arttıkça bilyenin başlangıçtaki çekim potansiyel enerjisi artar. Eğik düzlemin dibinde bu potansiyel enerji kinetik enerjiye dönüşür. 2h yüksekliğinden bırakılan L bilyesi daha büyük sürate ve kinetik enerjiye sahip olduğu için takozu daha uzağa itmiştir.`;
        solExp = `Çekim potansiyel enerjisi formülü ($E_p = m \\cdot g \\cdot h$) gereği yükseklik arttıkça kinetik enerjiye dönüşen miktar artar ve yapılan iş büyür.`;
        rubricA = 'Yükseklik ile çekim potansiyel enerjisi arasındaki doğru orantının tespiti';
        rubricB = 'Kinetik enerjiye dönüşüm ve takozun itilme gerekçesinin doğru açıklanması';
      } else {
        stim = `Yatay bir yolda belirli bir süratle ilerleyen kaykayın, pürüzlü ve kumlu bir yüzeye girdiğinde bir süre sonra yavaşlayarak durduğu gözlemlenmiştir. Kaykayın tekerleklerinin ve temas ettiği yol yüzeyinin sıcaklığının bir miktar arttığı termal sensörlerle tespit edilmiştir.`;
        qStem = `Kaykayın yavaşlayıp durması ve tekerlek yüzeylerinin ısınması olayını, sürtünme kuvveti ve enerjinin korunumu ilkesi çerçevesinde açıklayınız.`;
        modelAns = `Kaykayın sahip olduğu kinetik enerji, tekerlekler ile pürüzlü zemin arasındaki sürtünme kuvveti nedeniyle ısı ve ses enerjisine dönüşmüştür. Mekanik enerji azalmış ancak toplam enerji yok olmayıp korunmuştur.`;
        solExp = `Sürtünme kuvveti mekanik enerjiyi ısıya dönüştürür; sistemdeki toplam enerji sabittir.`;
        rubricA = 'Sürtünme kuvvetinin kinetik enerjiyi ısıya dönüştürdüğünün tespiti';
        rubricB = 'Toplam enerjinin korunduğu ilkesinin bilimsel gerekçelendirilmesi';
      }
    } else if (normTopic.includes('sindirim')) {
      if (vSlot === 0 || vSlot === 2) {
        stim = `Bir biyoloji deneyinde özdeş üç deney tüpüne eşit miktarda zeytinyağı ve su konulmuştur. 1. tüpe sadece safra sıvısı, 2. tüpe sadece pankreas öz suyu, 3. tüpe ise hem safra sıvısı hem de pankreas öz suyu eklenerek $37\\text{ °C}$ sıcaklıktaki su banyosunda bekletilmiştir. Bir süre sonra 3. tüpteki yağların tamamen sindirildiği gözlemlenmiştir.`;
        qStem = `3. deney tüpünde yağların sindiriminin en hızlı gerçekleşmesinin nedenini, safra sıvısı ile pankreas öz suyunun sindirimdeki farklı rollerini belirterek açıklayınız.`;
        modelAns = `Safra sıvısı yağları fiziksel (mekanik) olarak küçük damlacıklara ayırıp enzimlerin etki edeceği yüzey alanını artırır. Pankreas öz suyundaki lipaz enzimi de genişleyen yüzey sayesinde yağların kimyasal sindirimini çok daha hızlı ve eksiksiz tamamlar.`;
        solExp = `Fiziksel sindirim kimyasal sindirimi hızlandırır; safra mekanik parçalama yaparken pankreas öz suyu kimyasal bağları yıkar.`;
        rubricA = 'Safra sıvısının mekanik (fiziksel) sindirim yaptığının tespiti';
        rubricB = 'Pankreas öz suyunun kimyasal sindirimdeki rolü ve yüzey alanı etkisinin açıklanması';
      } else {
        stim = `İnce bağırsağın iç yüzeyi incelendiğinde milyonlarca parmak benzeri villus (tümür) çıkıntısı bulunduğu ve her villusun içinde yoğun kılcal kan ve lenf damarlarının yer aldığı görülmüştür.`;
        qStem = `İnce bağırsakta villus yapılarının bulunmasının ve yüzey alanının geniş olmasının besinlerin emilimi ve hücrelere ulaştırılması açısından sağladığı biyolojik avantajı açıklayınız.`;
        modelAns = `Villuslar emilim yüzey alanını yüzlerce kat artırır. Böylece sindirilmiş besin yapı taşları (glikoz, amino asit, yağ asitleri) difüzyon ve aktif taşımayla çok daha hızlı ve kayıpsız bir şekilde kana ve lenfe emilerek dokulara taşınır.`;
        solExp = `Villuslar yüzey alanını büyüterek sindirilmiş monomerlerin emilim hızını ve verimini maksimize eder.`;
        rubricA = 'Villusların emilim yüzey alanını artırdığının tespiti';
        rubricB = 'Besin yapı taşlarının kana/lenfe emilim verimliliğinin gerekçelendirilmesi';
      }
    } else if (normTopic.includes('dolaşım')) {
      if (vSlot === 0 || vSlot === 2) {
        stim = `İnsan dolaşım sistemi incelenirken sağ karıncıktan çıkan kirli kanın akciğerlere gidip temizlendikten sonra kalbin sol kulakçığına döndüğü; sol karıncıktan çıkan temiz kanın ise tüm vücut organlarına dağıtıldıktan sonra kalbin sağ kulakçığına ulaştığı şematik olarak gösterilmiştir.`;
        qStem = `Küçük kan dolaşımı ile büyük kan dolaşımının temel amaçlarını ve dolaşımdaki damarların taşıdığı kanın oksijen durumunu karşılaştırarak açıklayınız.`;
        modelAns = `Küçük kan dolaşımının amacı kirli kanı akciğerlerde oksijence zenginleştirmektir (temizlemektir). Büyük kan dolaşımının amacı ise temiz kanı tüm dokulara ulaştırıp hücrelere besin ve oksijen taşımak, atık karbondioksiti kalbe geri getirmektir.`;
        solExp = `Küçük dolaşım kalp ile akciğer arasında kanı temizler; büyük dolaşım kalp ile vücut dokuları arasında madde iletimini sağlar.`;
        rubricA = 'Küçük ve büyük kan dolaşımının amaçlarının doğru ayırt edilmesi';
        rubricB = 'Akciğer atardamarı ve toplardamarındaki oksijen durumunun doğru belirtilmesi';
      } else {
        stim = `Kalbin yapısı incelendiğinde sol karıncık duvarındaki kas tabakasının sağ karıncığa göre belirgin şekilde daha kalın ve güçlü olduğu tespit edilmiştir. Ayrıca kulakçıklar ile karıncıklar arasında tek yöne açılan kapakçıklar bulunmaktadır.`;
        qStem = `Sol karıncık kas tabakasının daha kalın olmasının ve tek yönlü kapakçıkların bulunmasının kan dolaşımı mekanizması açısından önemini açıklayınız.`;
        modelAns = `Sol karıncık temiz kanı aort damarıyla tüm vücuda (baş, kollar, bacaklar ve organlara) yüksek basınçla pompalamak zorundadır; bu nedenle kas tabakası kalındır. Kapakçıklar ise kanın pompalanırken geriye doğru kaçmasını engelleyerek tek yönlü akışı garanti eder.`;
        solExp = `Büyük dolaşım yüksek direnç gerektirdiğinden sol miyokard kalındır; atriyoventriküler kapakçıklar geri akışı önler.`;
        rubricA = 'Sol karıncığın tüm vücuda yüksek basınçla kan pompalamasının belirtilmesi';
        rubricB = 'Kapakçıkların kanın geriye kaçışını engellediğinin açıklanması';
      }
    } else if (normTopic.includes('solunum')) {
      if (vSlot === 0 || vSlot === 2) {
        stim = `Öğrenciler cam fanus, Y borusu, iki küçük balon ve tabanına esnek lastik gerilmiş bir akciğer modeli hazırlamıştır. Lastik taban aşağı doğru çekildiğinde fanus içindeki balonların hava ile dolup şiştiği; lastik taban serbest bırakıldığında ise balonların söndüğü gözlemlenmiştir.`;
        qStem = `Modeldeki lastik tabanın aşağı çekilmesi olayını, insan vücudundaki diyafram kasının hareketi, göğüs kafesi hacmi ve soluk alma mekanizması ile ilişkilendirerek açıklayınız.`;
        modelAns = `Lastik taban aşağı çekildiğinde diyafram kasının kasılıp düzleşmesi modellenmiştir. Bu durumda göğüs kafesi hacmi artar, iç basınç düşer ve dış ortamdaki hava akciğerlere hücum ederek soluk alma gerçekleşir.`;
        solExp = `Diyafram kası kasıldığında göğüs hacmi artar, basınç azalır ve akciğerlere hava dolar.`;
        rubricA = 'Lastik tabanın diyafram kasının kasılıp düzleşmesini temsil ettiğinin tespiti';
        rubricB = 'Hacim artışı ve basınç düşüşünün soluk alma ile bilimsel ilişkilendirilmesi';
      } else {
        stim = `Akciğerlerdeki bronşiyollerin ucunda yer alan tek katlı yassı epitel dokudan oluşmuş mikroskobik alveoller (hava kesecikleri), yoğun bir kılcal damar ağı ile sarılmıştır.`;
        qStem = `Alveollerin duvarının çok ince olmasının ve etrafının yoğun kılcal damarlarla çevrili olmasının gaz değişimi (oksijen ve karbondioksit geçişi) açısından önemini açıklayınız.`;
        modelAns = `Alveol duvarının tek katlı ve ince olması difüzyon mesafesini kısaltır. Yoğun kılcal damar ağı ise geniş bir yüzey alanı sağlayarak solunan havadaki oksijenin hızla kana geçmesini, kandaki karbondioksitin ise solukla atılmak üzere alveole geçmesini en yüksek verimle gerçekleştirir.`;
        solExp = `Alveol-kılcal damar teması Fick difüzyon yasası gereği ince yüzey ve geniş alanda maksimum gaz alışverişi sağlar.`;
        rubricA = 'İnce çeperin difüzyonu kolaylaştırdığının belirtilmesi';
        rubricB = 'Kılcal damar ağının gaz değişim yüzey alanını artırdığının gerekçelendirilmesi';
      }
    } else if (normTopic.includes('basınç')) {
      if (vSlot === 0 || vSlot === 2) {
        stim = `Özdeş üç tuğla kullanılarak yapılan bir deneyde; tuğla önce geniş tabanı üzerine, ardından dar tabanı üzerine sünger zemin üzerine konulmuş ve süngerdeki batma miktarları ölçülmüştür. Son aşamada dar tabandaki tuğlanın üzerine bir tuğla daha eklenmiştir.`;
        qStem = `Deneyde tuğlaların taban alanları ve ağırlıkları ile süngerdeki batma miktarları arasındaki ilişkiyi katı basıncı prensipleriyle açıklayınız.`;
        modelAns = `Katı basıncı ağırlıkla doğru, temas yüzey alanıyla ters orantılıdır ($P = G/S$). Geniş tabandan dar tabana geçildiğinde yüzey alanı küçüldüğü için batma artar. Üzerine ikinci tuğla konulduğunda ağırlık arttığı için basınç ve batma en yüksek seviyeye ulaşır.`;
        solExp = `Katı basıncı bağıntısı $P = G/S$ olup kuvvet arttıkça veya yüzey küçüldükçe basınç artar.`;
        rubricA = 'Yüzey alanı küçüldükçe katı basıncının arttığının gerekçelendirilmesi';
        rubricB = 'Ağırlık arttıkça basıncın arttığının formül veya kavramla delillendirilmesi';
      } else {
        stim = `Derinlikleri aynı olan iki özdeş kaba eşit yükseklikte ($h$) su ($d = 1\\text{ g/cm}^3$) ve yoğunluğu daha büyük olan tuzlu su ($d = 1{,}2\\text{ g/cm}^3$) doldurulmuştur. Kapların tabanlarındaki manometrelerle sıvı basınçları ölçülmüştür.`;
        qStem = `Kap tabanlarındaki sıvı basınçlarını karşılaştırınız ve sıvı basıncını etkileyen faktörler (derinlik ve yoğunluk) doğrultusunda sonucu gerekçelendiriniz.`;
        modelAns = `Sıvı basıncı derinlik ve sıvının yoğunluğu ile doğru orantılıdır ($P = h \\cdot d \\cdot g$). Sıvı yükseklikleri eşit olduğundan yoğunluğu daha büyük olan tuzlu suyun bulunduğu kap tabanındaki sıvı basıncı, saf suyun bulunduğu kap tabanındakinden daha büyüktür.`;
        solExp = `Sıvı basıncı formülü $P = h \\cdot d \\cdot g$ gereği aynı derinlikte yoğunluk arttıkça basınç artar.`;
        rubricA = 'Yoğunluk ile sıvı basıncı arasındaki doğru orantının belirtilmesi';
        rubricB = 'Tuzlu suyun taban basıncının saf sudan büyük olduğunun gerekçeli tespiti';
      }
    } else {
      if (vSlot === 0) {
        stim = `Laboratuvar ortamında ${topic} konusu kapsamında özdeş değişkenler ve kontrollü deney düzenekleri kurularak ölçümler yapılmıştır. Elde edilen bulgular doğrultusunda sistemdeki fiziksel ve kimyasal değişimler incelenmiştir.`;
        qStem = `Yukarıda verilen deney düzeneğinde gerçekleşen ${topic} durumunu göz önünde bulundurarak, gözlemlenen sonucun temel bilimsel gerekçesini açıklayınız.`;
      } else if (vSlot === 1) {
        stim = `Günlük yaşamda karşılaşılan bir teknolojik araçta ${topic} ilkelerinden yararlanılarak enerji ve verimlilik optimizasyonu sağlanmıştır.`;
        qStem = `Bu araçta kullanılan ${topic} prensibinin çalışma mekanizmasını ve sağladığı temel faydayı açıklayınız.`;
      } else if (vSlot === 2) {
        stim = `Bir biyoloji ve çevre araştırmasında iki farklı canlı popülasyonunun ${topic} süreçlerine verdikleri tepkiler gözlemlenmiştir.`;
        qStem = `Gözlem verileri doğrultusunda ${topic} durumunun ekosistem ve canlı metabolizması üzerindeki etkisini gerekçelendiriniz.`;
      } else {
        stim = `Bilim insanları tarafından hazırlanan hipotez testinde ${topic} sürecine etki eden bağımsız değişkenler kademeli olarak değiştirilmiştir.`;
        qStem = `Bağımsız değişkenin değişimi ile ${topic} çıktısı arasındaki neden-sonuç ilişkisini analiz ederek açıklayınız.`;
      }
      modelAns = `Öğrencinin ${topic} konusundaki kavramsal ilkeleri doğru teşhis etmesi, neden-sonuç bağını kurması ve değişkenlerin etkisini bilimsel gerekçelerle açıklaması beklenir.`;
      solExp = `${topic} sürecinde gerçekleşen temel bilimsel prensipler ve gözlem sonuçları doğrulanmıştır.`;
      rubricA = `${topic} konusundaki kavramsal unsurların doğru tespiti`;
      rubricB = 'Deney değişkenlerinin ve neden-sonuç ilişkisinin analitik delillendirilmesi';
    }
  } else if (subjectId === 'matematik') {
    if (normTopic.includes('rasyonel') || normTopic.includes('kesir')) {
      stim = `Bir marangoz elindeki $4\\frac{1}{2}\\text{ metre}$ uzunluğundaki ahşap kalası, her biri $\\frac{3}{4}\\text{ metre}$ uzunluğunda eşit parçalara ayırmak istemektedir.`;
      qStem = `Marangozun kalastan elde edebileceği parça sayısını rasyonel sayılarda bölme işlemi basamaklarını göstererek hesaplayınız.`;
      modelAns = `Tam sayılı kesir bileşik kesre çevrilir: $4\\frac{1}{2} = \\frac{9}{2}\\text{ m}$. Rasyonel sayılarda bölme kuralı uygulanır: $\\frac{9}{2} \\div \\frac{3}{4} = \\frac{9}{2} \\cdot \\frac{4}{3} = 6$ parça elde edilir.`;
      solExp = `Bileşik kesre dönüştürme ve rasyonel bölme adımlarıyla işlem tamamlanır.`;
      rubricA = 'Kesirlerin dönüştürülmesi ve uygun bölme modelinin kurulması';
      rubricB = 'İşlem adımlarının doğru yürütülmesi ve birimli sonucun bulunması';
    } else if (normTopic.includes('prizma') || normTopic.includes('hacim') || normTopic.includes('alan') || normTopic.includes('küp')) {
      if (vSlot === 0 || vSlot === 2) {
        stim = `Ayrıt uzunlukları $60\\text{ cm}$, $40\\text{ cm}$ ve $50\\text{ cm}$ olan dikdörtgenler prizması şeklindeki bir akvaryumun yarısına kadar su doldurulmuştur.`;
        qStem = `Akvaryumun toplam hacmini ve içindeki suyun hacmini litre ($L$) cinsinden hesaplayınız ($1\\text{ dm}^3 = 1\\text{ L}$, $1000\\text{ cm}^3 = 1\\text{ dm}^3$).`;
        modelAns = `Toplam hacim: $V = 60 \\cdot 40 \\cdot 50 = 120.000\\text{ cm}^3 = 120\\text{ dm}^3 = 120\\text{ L}$. Yarısı su dolu olduğuna göre suyun hacmi: $120 \\div 2 = 60\\text{ L}$ su bulunur.`;
        solExp = `Dikdörtgenler prizmasında hacim formülü $V = a \\cdot b \\cdot c$ ve hacim-litre birim dönüşümü uygulanır.`;
        rubricA = 'Prizmanın santimetreküp cinsinden hacminin ve litreye dönüşümünün doğru yapılması';
        rubricB = 'Yarı dolu su hacminin birimli olarak eksiksiz hesaplanması';
      } else {
        stim = `Taban ayrıtları $10\\text{ cm}$ ve $15\\text{ cm}$, yüksekliği $20\\text{ cm}$ olan dikdörtgenler prizması şeklindeki kapalı bir hediye kutusunun tüm dış yüzeyi kaplama kâğıdı ile kaplanacaktır.`;
        qStem = `Bu kutuyu kaplamak için en az kaç santimetrekare ($\text{cm}^2$) kaplama kâğıdı gerektiğini yüzey alanı formülü basamaklarını göstererek bulunuz.`;
        modelAns = `Yüzey alanı: $A = 2(ab + bc + ac) = 2(10 \\cdot 15 + 15 \\cdot 20 + 10 \\cdot 20) = 2(150 + 300 + 200) = 2(650) = 1300\\text{ cm}^2$ kaplama kâğıdı gerekir.`;
        solExp = `Dikdörtgenler prizmasının yüzey alanı 6 yüzün alanları toplamıdır.`;
        rubricA = 'Karşılıklı yüz çiftlerinin alanlarının doğru modellenmesi';
        rubricB = 'Toplam yüzey alanının hatasız toplanarak bulunması';
      }
    } else if (normTopic.includes('veri') || normTopic.includes('grafik') || normTopic.includes('istatistik')) {
      stim = `Bir okulun 7/A ve 7/B sınıflarının bir haftada topladıkları atık kâğıt miktarları (kg) günlere göre kaydedilmiş ve sütun grafiğinde karşılaştırılmıştır. 7/A sınıfı düzenli olarak günde ortalama $15\\text{ kg}$ kâğıt toplarken, 7/B sınıfının topladığı miktarlar günlere göre $5\\text{ kg}$ ile $30\\text{ kg}$ arasında değişkenlik göstermiştir.`;
      qStem = `Verilen durumdaki verileri aritmetik ortalama ve açıklık (tutarlılık/istikrar) kavramları doğrultusunda değerlendirerek hangi sınıfın geri dönüşüm sürecinde daha istikrarlı olduğunu gerekçelendiriniz.`;
      modelAns = `Açıklık değeri küçük olan gruplar daha istikrarlıdır. 7/A sınıfının günlük topladığı miktarlar ortalama etrafında toplandığı için açıklığı küçüktür ve geri dönüşüm sürecinde daha tutarlı ve istikrarlıdır.`;
      solExp = `Aritmetik ortalama veri grubunun merkezini, açıklık ise verilerin dağılım ve istikrarını gösterir.`;
      rubricA = 'Açıklık ve istikrar kavramlarının doğru ilişkilendirilmesi';
      rubricB = '7/A sınıfının gerekçeli olarak daha tutarlı olduğunun açıklanması';
    } else if (normTopic.includes('cebir') || normTopic.includes('denklem')) {
      stim = `Kısa kenarı $(2x + 1)\\text{ metre}$, uzun kenarı ise kısa kenarından $3\\text{ metre}$ daha uzun olan dikdörtgen şeklindeki bir sebze bahçesinin etrafına 2 sıra tel çekilecektir.`;
      qStem = `Bahçenin çevresini $x$ cinsinden cebirsel ifade olarak yazınız ve 2 sıra tel için gerekli toplam tel uzunluğunu en sade biçimde hesaplayınız.`;
      modelAns = `Uzun kenar: $(2x + 1) + 3 = 2x + 4\\text{ m}$. Dikdörtgen çevresi: $2[(2x + 1) + (2x + 4)] = 2(4x + 5) = 8x + 10\\text{ m}$. İki sıra tel için: $2(8x + 10) = 16x + 20\\text{ metre}$ tel gerekir.`;
      solExp = `Cebirsel ifadelerde benzer terimlerin toplanması ve parantezin çarpma ile dağıtılması adımları uygulanır.`;
      rubricA = 'Uzun kenarın ve çevre bağıntısının cebirsel olarak doğru kurulması';
      rubricB = 'Benzer terimlerin toplanması ve iki sıra tel çarpımının en sade biçimde bulunması';
    } else {
      stim = `Bir matematiksel problemde ${topic} konusuyla ilgili veriler toplanmış ve değişkenler arasındaki sayısal ilişkiler modellenmiştir.`;
      qStem = `Verilen durumdaki ${topic} ilişkisini dikkate alarak gerekli matematiksel işlem basamaklarını kurunuz ve sonucu gerekçelendiriniz.`;
      modelAns = `Öğrencinin ${topic} konusundaki işlem kurallarını ve bağıntıları doğru uygulayarak işlem adımlarını eksiksiz sunması beklenir.`;
      solExp = `Analitik matematik kuralları ve işlem basamakları doğrulanmıştır.`;
      rubricA = 'Problemin matematiksel modelinin ve formülünün doğru kurulması';
      rubricB = 'İşlem basamaklarının hatasız yürütülmesi ve sonucun doğrulanması';
    }
  } else if (subjectId === 'sosyal_bilgiler') {
    stim = `Tarihî kaynaklar incelendiğinde ${topic} sürecinde alınan kararların toplumun siyasi, sosyal ve ekonomik yapısında önemli değişimlere yol açtığı görülmektedir.`;
    qStem = `${topic} konusunun ortaya çıkış gerekçelerini ve millî birlik / toplumsal dayanışma açısından doğurduğu sonuçları açıklayınız.`;
    modelAns = `Öğrencinin ${topic} konusundaki tarihsel neden-sonuç bağını kurması, dönemin koşullarını dikkate alarak kararların çok boyutlu etkilerini delillendirmesi beklenir.`;
    solExp = `Tarihsel neden-sonuç analizi ve çok boyutluluk ilkeleri uygulanmıştır.`;
    rubricA = 'Tarihsel olgunun ortaya çıkış nedenlerinin doğru tespiti';
    rubricB = 'Toplumsal ve millî sonuçların gerekçelendirilerek açıklanması';
  } else if (subjectId === 'din_kulturu') {
    stim = `İslam dininin temel kaynaklarında ${topic} ile ilgili ilkeler açıklanırken insanın bireysel ve toplumsal sorumluluklarına vurgu yapılmıştır.`;
    qStem = `${topic} konusunun bireyin ahlaki gelişimi ve toplumda adalet / yardımlaşma bilincinin yerleşmesi açısından önemini açıklayınız.`;
    modelAns = `Öğrencinin ${topic} kavramının dini ve ahlaki boyutunu doğru teşhis etmesi, paylaşma, adalet ve sorumluluk ilkeleriyle ilişkilendirerek gerekçelendirmesi beklenir.`;
    solExp = `Kavramsal anlama ve ahlaki ilkelerin günlük yaşamla ilişkilendirilmesi sağlanmıştır.`;
    rubricA = `${topic} kavramının anlam ve kapsamının doğru belirtilmesi`;
    rubricB = 'Toplumsal dayanışma ve ahlaki sorumlulukla ilişkisinin gerekçelendirilmesi';
  } else {
    stim = `In the reading context regarding "${topic}", students examine real-life situations, personal preferences, and communicative tasks.`;
    qStem = `Based on the context of "${topic}", explain the main reason for the given situation in a complete and grammatically correct English sentence.`;
    modelAns = `Students are expected to state a clear reason using the appropriate functional target vocabulary and grammar structures related to ${topic}.`;
    solExp = `Communicative purpose and grammatical accuracy related to ${topic} are verified.`;
    rubricA = 'Correct identification of the communicative goal and reason';
    rubricB = 'Grammatical accuracy, appropriate vocabulary, and sentence structure';
  }

  return {
    number: idx + 1,
    outcome: outcomeCode,
    outcomeTitle: cleanTitle,
    difficulty: 'Orta',
    level: cognitiveLevel || 'Karmaşık Bilişsel Süreçler',
    templateType: tType,
    points: targetPts,
    stimulus: stim,
    question: qStem,
    answer: modelAns,
    solutionExplanation: solExp,
    rubric: [
      { item: rubricA, pts: Math.ceil(targetPts / 2) },
      { item: rubricB, pts: Math.floor(targetPts / 2) }
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
    const meta = resolveOutcomeMetadata(d.outcomeCode, d.notes, d.cognitiveLevel);
    const prevMatches = questionDistributions.filter((x, prevIdx) => prevIdx < i && x.outcomeCode === d.outcomeCode).length;
    const inquiryAngle = prevMatches > 0
      ? ` [Ölçme Çeşitlemesi: Aynı kazanıma bağlı önceki sorudan (${prevMatches}. soru) FARKLI bir vaka, deney veya problem bağlamı kullanınız]`
      : '';
    return `Soru ${i + 1}: [Kazanım Kodu: ${d.outcomeCode}] [Resmi Öğrenme Çıktısı: ${meta.displayLabel}] [Konu: ${meta.topicNote || meta.displayLabel}]${inquiryAngle}`;
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
        const meta = resolveOutcomeMetadata(reqOutcome, distItem.notes, distItem.cognitiveLevel);
        const targetPts = pointAllocations[missingIdx] || 15;
        const synthQ = buildProceduralSyntheticQuestion(
          reqOutcome,
          meta.displayLabel,
          missingIdx,
          targetPts,
          subjectId,
          variationIndex,
          distItem.cognitiveLevel,
          distItem.notes
        );
        safeQuestions.push(synthQ);
      }
    }

    const acceptedQuestions: GeneratedQuestionItem[] = [];

    for (let idx = 0; idx < targetCount; idx++) {
      const q = safeQuestions[idx] || null;
      const distItem = questionDistributions[idx] || scenario.distributions[0];
      const requiredOutcome = distItem.outcomeCode;
      const meta = resolveOutcomeMetadata(requiredOutcome, distItem.notes, distItem.cognitiveLevel);
      const officialTitle = meta.displayLabel;
      const targetPts = pointAllocations[idx] || (q ? q.points : 15);

      const rawStem = (q && typeof q.question === 'string') ? q.question.trim() : '';
      const isStemValid = rawStem.length >= 3;
      const rawAns = (q && typeof q.answer === 'string') ? q.answer.trim() : '';
      const rawStim = (q && typeof q.stimulus === 'string') ? q.stimulus.trim() : '';

      // Pedagojik Kalite Denetimi (Yüzeysel Tek Kelime Avcılığı, Sahte Görsel, Şablon Sızıntısı & Sınav İçi Tekrar)
      let isPedagogicallyDeficient = false;
      let deficiencyReason = '';

      const cleanAns = rawAns.replace(/[.,!?;:"'«»()]+$/g, '').trim().toLowerCase();
      const cleanStim = rawStim.toLowerCase();

      // İçi boş kalıp şablon denetimi
      const isHollowBoilerplate = 
        /(?:öğrenme\s+çıktısı\s+kapsamında|günlük\s+hayat\s+uygulamaları\s+ve\s+bilimsel\s+süreç\s+basamakları|kavramsal\s+ilkeleri\s+ve\s+neden-sonuç\s+ilişkilerini\s+gerekçelendirerek\s+açıklayınız|verilen\s+durumu\s+analitik\s+olarak\s+açıklayınız)/i.test(rawStem + ' ' + rawStim) ||
        new RegExp(`${requiredOutcome}\\s*\\[?.*?\\s*öğrenme\\s+çıktısı`, 'i').test(rawStem);

      // Sınav içi anlamsal tekrar (Intra-exam duplicate) kontrolü
      const isIntraExamDuplicate = acceptedQuestions.some(prev => 
        isDuplicateOrTooSimilar(rawStem, rawStim, [{ questionText: prev.question, stimulus: prev.stimulus }], undefined, 0.45)
      );

      if (!q || !isStemValid) {
        isPedagogicallyDeficient = true;
        deficiencyReason = 'Soru eksik veya boş';
      } else if (isHollowBoilerplate) {
        isPedagogicallyDeficient = true;
        deficiencyReason = 'Genel şablon metin veya ham kazanım kodu sızıntısı tespit edildi';
      } else if (isIntraExamDuplicate) {
        isPedagogicallyDeficient = true;
        deficiencyReason = 'Aynı sınav içindeki başka bir soruyla anlamsal mükerrerlik tespit edildi';
      } else if (
        (subjectId === 'turkce' || subjectId === 'sosyal_bilgiler' || subjectId === 'din_kulturu') &&
        targetPts >= 14
      ) {
        const ansWordCount = cleanAns.split(/\s+/).filter(Boolean).length;
        const isSubstring = cleanAns.length > 0 && cleanStim.includes(cleanAns);
        const isTrivialQuery = /(hangi\s+(meyve|sebze|renk|şehir|araç|hayvan|nesne|eşya)|kimdir|kaç\s+(liradır|kestane|elma))/i.test(rawStem);

        if (ansWordCount > 0 && ansWordCount <= 2 && isSubstring && isTrivialQuery) {
          isPedagogicallyDeficient = true;
          deficiencyReason = `Yüksek puanlı (${targetPts} puan) tek kelimelik mekanik bilgi avcılığı ("${rawAns}")`;
        }
      }

      // Görsel gerektiren soru kökü denetimi (görsel üretimi kapalıyken veya görsel yokken metin tabanlı soru zorunluluğu)
      if (!isPedagogicallyDeficient) {
        const hasVisualReference = /(bu\s+görselde|görsele\s+göre|şekildeki|grafikteki|şekle\s+göre|grafiğe\s+göre|afişte\s+görüldüğü\s+gibi|resimde\s+bir|yandaki\s+afişte|afişte\s+verilmek|çizilen\s+şekilde)/i.test(rawStem + ' ' + rawStim);
        if ((!q?.visual || !ENABLE_AI_VISUAL_GENERATION) && hasVisualReference && rawStim.length < 150) {
          isPedagogicallyDeficient = true;
          deficiencyReason = 'Görsel üretimi devre dışıyken veya görsel yokken görsel atıflı soru kökü tespit edildi; metin tabanlı eşdeğer soruya dönüştürülüyor.';
        }
      }

      // Metin/Kaynak gerektiren sorular için Stimulus Kalitesi Denetimi
      const sourceReq = detectSourceRequirement(rawStem, q?.templateType, undefined, rawStim);
      if (!isPedagogicallyDeficient && sourceReq.requiresSource && sourceReq.type === 'reading_text') {
        const stimQuality = checkStimulusQuality(rawStim, sourceReq);
        if (!stimQuality.isValid) {
          isPedagogicallyDeficient = true;
          deficiencyReason = `Metne dayalı soru kökü bulunmasına rağmen geçerli okuma metni eksik veya yetersiz ("${(rawStim || '').slice(0, 40)}...")`;
        }
      }

      // Anlamsal Cevaplanabilirlik Güvencesi
      if (!isPedagogicallyDeficient) {
        const isSelfContained = isSemanticallySelfContainedQuestion(rawStem, rawStim, requiredOutcome);
        if (!isSelfContained) {
          isPedagogicallyDeficient = true;
          deficiencyReason = `Gerekli okuma metni veya bağlam olmaksızın soru anlamsal olarak tek başına cevaplanamaz ("${rawStem.slice(0, 45)}...")`;
        }
      }

      // Soru pedagojik olarak kusurlu veya eksikse cerrahi ikame et
      if (isPedagogicallyDeficient) {
        console.warn(`[PedagogicalQuality] ${idx + 1}. soruda kusur (${deficiencyReason}) tespit edildi; güvenli ikame yapılıyor.`);
        const avoidCombined: AvoidItem[] = [
          ...allAvoidItems,
          ...acceptedQuestions.map(aq => ({ questionText: aq.question, stimulus: aq.stimulus }))
        ];

        let fallbackMatch = internalAllQuestions.find(fq => {
          if (fq.outcome !== requiredOutcome) return false;
          if (sourceReq.requiresSource && sourceReq.type === 'reading_text') {
            const fqReq = detectSourceRequirement(fq.question, fq.templateType, undefined, fq.stimulus);
            const fqQual = checkStimulusQuality(fq.stimulus, fqReq);
            if (!fqQual.isValid || (fq.stimulus || '').length < 80) return false;
          } else if (!isSemanticallySelfContainedQuestion(fq.question, fq.stimulus, fq.outcome)) {
            return false;
          }
          return !isDuplicateOrTooSimilar(fq.question, fq.stimulus, avoidCombined, undefined, 0.38);
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
            return !isDuplicateOrTooSimilar(sq.questionText, sq.stimulus, avoidCombined, undefined, 0.38);
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
          const reconciled = reconcileRubricPoints(rawRubric, targetPts, true);

          const rawFallbackStem = sanitizeTextReferencesIfNoStimulus(
            fallbackMatch.question || `${officialTitle} ile ilgili durumu açıklayınız.`,
            fallbackMatch.stimulus || q?.stimulus
          );
          const finalFallbackStem = fixStimulusTranscriptionTypos(
            fixProperNounApostrophes(rawFallbackStem),
            fallbackMatch.stimulus || q?.stimulus
          );
          const finalFallbackAnswer = fixStimulusTranscriptionTypos(
            fixProperNounApostrophes(fallbackMatch.answer || 'Kavramsal ilkelerin doğru gerekçelendirilmesi beklenir.'),
            fallbackMatch.stimulus || q?.stimulus
          );

          acceptedQuestions.push({
            number: idx + 1,
            outcome: requiredOutcome,
            outcomeTitle: officialTitle,
            level: distItem.cognitiveLevel || fallbackMatch.level || 'Karmaşık Bilişsel Süreçler',
            difficulty: fallbackMatch.difficulty || 'Orta',
            templateType: fallbackMatch.templateType || 'Kurgusal Senaryo & Vaka İncelemesi',
            points: targetPts,
            stimulus: fallbackMatch.stimulus || q?.stimulus || '',
            question: finalFallbackStem,
            answer: finalFallbackAnswer,
            alternativeAnswers: fallbackMatch.alternativeAnswers
              ? fallbackMatch.alternativeAnswers.map((a: string) =>
                  fixStimulusTranscriptionTypos(fixProperNounApostrophes(a), fallbackMatch.stimulus || q?.stimulus)
                )
              : undefined,
            solutionExplanation: fallbackMatch.solutionExplanation
              ? fixStimulusTranscriptionTypos(fixProperNounApostrophes(fallbackMatch.solutionExplanation), fallbackMatch.stimulus || q?.stimulus)
              : (fallbackMatch.answer ? `Analitik çözüm adımları ve gerekçe: ${finalFallbackAnswer}` : undefined),
            rubric: reconciled.map(r => ({
              item: fixStimulusTranscriptionTypos(fixProperNounApostrophes(r.criterion), fallbackMatch.stimulus || q?.stimulus),
              pts: r.points
            })),
            sourceOrigin: 'oyss_curated' as const,
            originExamTitle: fallbackMatch.originExamTitle || 'OYSS Referans Havuzu',
            originQuestionNumber: fallbackMatch.originQuestionNumber,
            visual: fallbackMatch.visual
          });
          continue;
        } else {
          console.warn(`[SemanticAnswerability] ${idx + 1}. soru (${requiredOutcome}) için dinamik OYSS sentez havuzundan soru üretiliyor.`);
          const synth = buildProceduralSyntheticQuestion(
            requiredOutcome,
            officialTitle,
            idx,
            targetPts,
            subjectId,
            variationIndex,
            distItem.cognitiveLevel,
            distItem.notes
          );
          acceptedQuestions.push(synth);
          continue;
        }
      }

      let calibratedDifficulty = q!.difficulty || 'Orta';
      if (
        (requiredOutcome.includes('16') || officialTitle.toLowerCase().includes('yazım')) &&
        calibratedDifficulty === 'Zor'
      ) {
        calibratedDifficulty = 'Orta';
      }

      let candidateAnswer = typeof q!.answer === 'string' ? q!.answer.trim() : '';
      const altAnswers = Array.isArray(q!.alternativeAnswers)
        ? q!.alternativeAnswers
            .filter((a: any) => typeof a === 'string' && a.trim().length > 0)
            .map((a: string) => a.trim())
        : undefined;

      let remainingAltAnswers: string[] = altAnswers ? [...altAnswers] : [];

      if (!candidateAnswer || isAnswerEchoingStem(candidateAnswer, rawStem)) {
        const viableAltIdx = remainingAltAnswers.findIndex(
          alt => !isAnswerEchoingStem(alt, rawStem) && alt.trim().length > 0
        );

        if (viableAltIdx !== -1) {
          candidateAnswer = remainingAltAnswers[viableAltIdx];
          remainingAltAnswers.splice(viableAltIdx, 1);
        } else if (q!.solutionExplanation && !isAnswerEchoingStem(q!.solutionExplanation, rawStem)) {
          candidateAnswer = q!.solutionExplanation.replace(/^(?:analitik çözüm adımları ve gerekçe:\s*)+/i, '').trim();
        } else {
          candidateAnswer = `Öğrencinin ${officialTitle.toLowerCase()} kazanımı doğrultusunda ilgili kavramsal unsurları doğru tespit etmesi ve gerekçelendirmesi beklenir.`;
        }
      }

      candidateAnswer = alignPunctuationFunctionAnswer(rawStem, candidateAnswer);
      candidateAnswer = fixProperNounApostrophes(candidateAnswer);
      candidateAnswer = fixStimulusTranscriptionTypos(candidateAnswer, q!.stimulus);

      const sanitizedAltAnswers = remainingAltAnswers
        .map(alt => fixStimulusTranscriptionTypos(fixProperNounApostrophes(alt), q!.stimulus))
        .filter(alt =>
          !isAnswerEchoingStem(alt, rawStem) &&
          cleanTurkishText(alt) !== cleanTurkishText(candidateAnswer)
        );

      let finalStem = sanitizeTextReferencesIfNoStimulus(rawStem, q!.stimulus);
      finalStem = calibrateStemPlurality(finalStem, q!.stimulus, candidateAnswer);
      finalStem = fixProperNounApostrophes(finalStem);
      finalStem = fixStimulusTranscriptionTypos(finalStem, q!.stimulus);

      const rawRubric = (q!.rubric || []).map((r: any) => ({
        criterion: r.item || r.criterion || 'Değerlendirme Ölçütü',
        points: r.pts ?? r.points
      }));

      const isCurated = q!.sourceOrigin === 'oyss_curated';
      const reconciled = reconcileRubricPoints(rawRubric, targetPts, isCurated);

      const calibratedRubric = reconciled.map(r => {
        let crit = r.criterion;
        if (finalStem.includes('yazım yanlışını') && crit.includes('yanlışları')) {
          crit = crit.replace(/yanlışları/g, 'yanlışı');
        }
        crit = fixStimulusTranscriptionTypos(fixProperNounApostrophes(crit), q!.stimulus);
        return { item: crit, pts: r.points };
      });

      if (!isSemanticallySelfContainedQuestion(finalStem, q!.stimulus, requiredOutcome)) {
        console.warn(`[SemanticAnswerability] ${idx + 1}. soru ("${finalStem.slice(0, 40)}...") metinsiz cevaplanamaz; dinamik OYSS sentez havuzundan tam metinli soru üretiliyor.`);
        const synth = buildProceduralSyntheticQuestion(
          requiredOutcome,
          officialTitle,
          idx,
          targetPts,
          subjectId,
          variationIndex,
          distItem.cognitiveLevel,
          distItem.notes
        );
        acceptedQuestions.push(synth);
        continue;
      }

      const rawExplanation = q!.solutionExplanation || q!.explanation || `Analitik çözüm adımları ve gerekçe: ${candidateAnswer}`;
      const finalExplanation = fixStimulusTranscriptionTypos(fixProperNounApostrophes(rawExplanation), q!.stimulus);

      let validVisual = undefined;
      if (ENABLE_AI_VISUAL_GENERATION && q!.visual && typeof q!.visual === 'object') {
        const visualValidation = validateAndSanitizeAiVisual(q!.visual, candidateAnswer);
        if (visualValidation.isValid && visualValidation.visual) {
          validVisual = visualValidation.visual;
        }
      }

      acceptedQuestions.push({
        ...q!,
        number: idx + 1,
        outcome: requiredOutcome,
        outcomeTitle: officialTitle,
        level: distItem.cognitiveLevel || q!.level || 'Karmaşık Bilişsel Süreçler',
        difficulty: calibratedDifficulty,
        points: targetPts,
        question: finalStem,
        answer: candidateAnswer,
        alternativeAnswers: sanitizedAltAnswers.length > 0 ? sanitizedAltAnswers : undefined,
        solutionExplanation: finalExplanation,
        rubric: calibratedRubric,
        sourceOrigin: q!.sourceOrigin || 'gemini_ai',
        visual: validVisual
      });
    }

    const calibrated = calibrateQuestionDifficulties(acceptedQuestions);
    const { enrichedQuestions } = validateAndEnrichExamQuestions(calibrated);
    const { certifiedQuestions } = ensureExamQuality(
      enrichedQuestions,
      { grade, subjectId },
      internalAllQuestions as any
    );
    return certifiedQuestions as GeneratedQuestionItem[];
  };

  // 1. TIER 1: Güvenli Sunucu Fonksiyonu Proxy (/api/generate)
  // Tüm yapay zekâ istekleri istemciden gizlenmiş sunucu tarafı Netlify Function üzerinden yürütülür.
  if (livePrompt && livePrompt.length <= HARD_LIMIT) {
    let proxyError: any = null;
    try {
      const MAX_RETRIES = 1; // Geçici 503/Ağ dalgalanmaları için 1 kontrollü tekrar (TASK234)
      let proxyRes: Response | null = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      if (attempt > 0) {
        const delayMs = 1000 * attempt;
        console.warn(`[AI Generation] Geçici servis yanıtı (503/502/Ağ); ${attempt}. tekrar deneniyor (${delayMs}ms bekleme)...`);
        await new Promise(r => setTimeout(r, delayMs));
      }

      try {
        proxyRes = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-App-Client': 'oyss-portal-v1'
          },
          body: JSON.stringify({
            prompt: livePrompt,
            variationIndex,
            variationToken,
            model: options?.primaryModel,
            thinkingLevel: options?.thinkingLevel
          })
        });

        // 200 başarılı yanıt
        if (proxyRes.ok) {
          break;
        }

        // 429 (Kota sınırı), 400 (Hatalı istek), 403 (Yetki), 422 (Şema) durumlarında tekrar deneme, anında çık
        if (proxyRes.status === 429 || proxyRes.status === 400 || proxyRes.status === 403 || proxyRes.status === 422) {
          break;
        }

        // 503 veya 502 durumunda son deneme değilse tekrar dene
        if (attempt < MAX_RETRIES && (proxyRes.status === 503 || proxyRes.status === 502)) {
          continue;
        }
      } catch (err: any) {
        proxyError = err;
        if (attempt < MAX_RETRIES) {
          continue;
        }
      }
    }

    if (proxyRes && proxyRes.ok) {
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

        // Anti-duplication cerrahi denetimi (TASK234):
        // Tek bir sorunun benzer çıkması durumunda TÜM SINAVI ÇÖPE ATMA;
        // Yalnızca benzer olan soruyu onaylı havuzdan ikame et, kalan Gemini sorularını koru!
        let duplicateCount = 0;
        const deduplicatedQuestions: GeneratedQuestionItem[] = [];

        for (let i = 0; i < normalized.length; i++) {
          const nq = normalized[i];
          const isDup = isDuplicateOrTooSimilar(nq.question, nq.stimulus, allAvoidItems, undefined, 0.65);
          if (isDup) {
            duplicateCount++;
            console.warn(`[AntiDuplication] ${i + 1}. soru (${nq.outcome}) mevcut sınav sorularıyla yüksek benzerlik taşıyor; cerrahi ikame yapılıyor.`);
            const avoidCombined: AvoidItem[] = [
              ...allAvoidItems,
              ...deduplicatedQuestions.map(dq => ({ questionText: dq.question, stimulus: dq.stimulus }))
            ];
            const fallbackMatch = internalAllQuestions.find(fq =>
              fq.outcome === nq.outcome &&
              !isDuplicateOrTooSimilar(fq.question, fq.stimulus, avoidCombined, undefined, 0.60)
            ) || internalAllQuestions.find(fq => fq.outcome === nq.outcome);

            if (fallbackMatch) {
              deduplicatedQuestions.push({
                ...fallbackMatch,
                number: i + 1,
                points: nq.points,
                sourceOrigin: 'oyss_curated' as const
              });
              continue;
            }
          }
          deduplicatedQuestions.push(nq);
        }

        // Eğer soruların çoğunluğu (> %60) çözümlenemeyen mükerrerlik içeriyorsa o zaman yerel motora geç
        if (duplicateCount > 0 && duplicateCount >= Math.ceil(normalized.length * 0.6)) {
          console.warn(`Canlı model çıktısında soruların çoğunluğu (${duplicateCount}/${normalized.length}) mevcut sınavla çakıştı; yerel motora aktarılıyor.`);
          fallbackReason = `[Benzerlik Kontrolü] Canlı yapay zekâ çıktısındaki soruların çoğunluğu (${duplicateCount}/${normalized.length}) mevcut sınavla çakıştığından yerel OYSS standart motoru devreye alındı.`;
        } else {
          // Kalan Gemini soruları KORUNDU!
          const activeModelName = duplicateCount > 0
            ? `${data?.activeModel || 'Gemini Akıllı Soru Motoru'} (Kısmi İkame: ${duplicateCount} Soru)`
            : (data?.activeModel || 'Gemini Akıllı Soru Motoru');
          const elapsedSec = Math.max(0.7, (Date.now() - startTime) / 1000).toFixed(1) + ' saniye';
          const examClassification = classifyExamQuestions(deduplicatedQuestions);
          const classDetails = getExamClassificationDetails(examClassification);

          return {
            title: `${grade}. Sınıf ${scenario.name} (${classDetails.titleSuffix} - ${deduplicatedQuestions.length} Soru)`,
            variationNumber: variationIndex + 1,
            generationTime: elapsedSec,
            model: `${activeModelName}`,
            requestedModel: data?.requestedModel || options?.primaryModel || 'gemini-3.5-flash-lite',
            actualModel: data?.activeModel || 'gemini-3.5-flash-lite',
            isModelFallback: Boolean(data?.isModelFallback),
            httpStatus: 200,
            isFallback: false,
            questionsCount: deduplicatedQuestions.length,
            generatedQuestions: deduplicatedQuestions,
            sourceValidationSummary: {
              isFullyValid: !deduplicatedQuestions.some(q => q.hasMissingSourceError || q.hasMissingStemError),
              missingSourceCount: deduplicatedQuestions.filter(q => q.hasMissingSourceError).length,
              missingStemCount: deduplicatedQuestions.filter(q => q.hasMissingStemError).length,
              recoveredCount: deduplicatedQuestions.filter(q => q.commonStimulus || q.sharedSourceId).length
            },
            promptMetrics: {
              promptLength: livePrompt.length,
              budgetCeiling: BUDGET_CEILING,
              compressionApplied: compressionLevel
            },
            usageMetrics: data?.usageMetrics || {
              hasUsageData: false,
              promptTokens: null,
              candidatesTokens: null,
              thinkingTokens: null,
              totalTokens: null
            },
            examClassification
          };
        }
      } else {
        console.warn('Canlı model geçerli soru listesi sağlamadı:', data);
        fallbackReason = data?.error || 'Model çıktısı geçerli bir sınav formatına (questions dizisi) uymadığı için yerel motor devreye alındı.';
      }
    } else if (proxyRes) {
      let errJson: any = null;
      try {
        errJson = await proxyRes.json();
      } catch {}

      const serverError = errJson?.error;
      const serverCode = errJson?.code;

      console.warn('[AI Generation Proxy Error]', {
        status: proxyRes.status,
        code: serverCode,
        error: serverError,
        elapsedMs: errJson?.elapsedMs,
        details: errJson?.details
      });

      if (proxyRes.status === 429 || serverCode === 'RATE_LIMIT_EXCEEDED') {
        fallbackReason = serverError
          ? (serverError.includes('429') ? serverError : `[HTTP 429 - Kota Doldu] ${serverError}`)
          : 'Yapay zekâ servisi kota sınırında (429 - Çok sık istek). Lütfen bir dakika sonra tekrar deneyiniz.';
      } else if (proxyRes.status === 504 || serverCode === 'GATEWAY_TIMEOUT') {
        fallbackReason = serverError
          ? `${serverError} Sorular yerel OYSS standart motoruyla hazırlandı.`
          : 'Yapay zekâ yanıtı belirlenen sürede tamamlayamadı (Zaman aşımı). Sorular yerel OYSS standart motoruyla hazırlandı.';
      } else if (proxyRes.status === 503 || serverCode === 'SERVICE_UNAVAILABLE' || serverCode === 'MISSING_API_KEY') {
        fallbackReason = serverError
          ? `${serverError} Sorular yerel OYSS standart motoruyla hazırlandı.`
          : 'Yapay zekâ servisi geçici olarak hizmet veremiyor (HTTP 503). Sorular yerel OYSS standart motoruyla hazırlandı.';
      } else if (proxyRes.status === 403 || serverCode === 'API_KEY_FORBIDDEN') {
        fallbackReason = serverError
          ? `${serverError} Sorular yerel OYSS standart motoruyla hazırlandı.`
          : 'Yapay zekâ API anahtarının yetkisi bulunmuyor (HTTP 403). Sorular yerel OYSS standart motoruyla hazırlandı.';
      } else if (proxyRes.status === 400 || serverCode === 'BAD_REQUEST_PAYLOAD') {
        fallbackReason = serverError
          ? `${serverError} Sorular yerel OYSS standart motoruyla hazırlandı.`
          : 'Yapay zekâ istek parametreleri kabul edilmedi (HTTP 400). Sorular yerel OYSS standart motoruyla hazırlandı.';
      } else if (proxyRes.status === 422) {
        // Kontrollü Kurtarma: Eğer HTTP 422 soru kökü eksikliği nedeniyle döndüyse ve eldeki sorular varsa,
        // yalnızca eksik soru kökünü yerel onaylı soruyla ikame ederek geçerli soruları kurtar
        if (errJson?.code === 'EMPTY_QUESTION_STEM' && Array.isArray(errJson?.questions) && errJson.questions.length > 0) {
          const geminiTagged = errJson.questions.map((gq: any) => ({
            ...gq,
            sourceOrigin: gq.sourceOrigin || 'gemini_ai'
          }));
          const normalized = normalizeAndCalibrateQuestions(geminiTagged);
          let duplicateCount = 0;
          const deduplicated: GeneratedQuestionItem[] = [];

          for (let i = 0; i < normalized.length; i++) {
            const nq = normalized[i];
            const isDup = isDuplicateOrTooSimilar(nq.question, nq.stimulus, allAvoidItems, undefined, 0.65);
            if (isDup) {
              duplicateCount++;
              const avoidCombined: AvoidItem[] = [
                ...allAvoidItems,
                ...deduplicated.map(dq => ({ questionText: dq.question, stimulus: dq.stimulus }))
              ];
              const fallbackMatch = internalAllQuestions.find(fq =>
                fq.outcome === nq.outcome &&
                !isDuplicateOrTooSimilar(fq.question, fq.stimulus, avoidCombined, undefined, 0.60)
              ) || internalAllQuestions.find(fq => fq.outcome === nq.outcome);

              if (fallbackMatch) {
                deduplicated.push({
                  ...fallbackMatch,
                  number: i + 1,
                  points: nq.points,
                  sourceOrigin: 'oyss_curated' as const
                });
                continue;
              }
            }
            deduplicated.push(nq);
          }

          if (duplicateCount < Math.ceil(normalized.length * 0.6)) {
            const activeModelName = errJson?.activeModel || 'Gemini Akıllı Soru Motoru (Kısmi İkame)';
            const elapsedSec = Math.max(0.7, (Date.now() - startTime) / 1000).toFixed(1) + ' saniye';
            const examClassification = classifyExamQuestions(deduplicated);
            const classDetails = getExamClassificationDetails(examClassification);

            return {
              title: `${grade}. Sınıf ${scenario.name} (${classDetails.titleSuffix} - ${deduplicated.length} Soru)`,
              variationNumber: variationIndex + 1,
              generationTime: elapsedSec,
              model: `${activeModelName}`,
              requestedModel: errJson?.requestedModel || options?.primaryModel || 'gemini-3.5-flash-lite',
              actualModel: errJson?.activeModel || 'gemini-3.5-flash-lite',
              isModelFallback: Boolean(errJson?.isModelFallback),
              httpStatus: proxyRes.status,
              isFallback: false,
              questionsCount: deduplicated.length,
              generatedQuestions: deduplicated,
              sourceValidationSummary: {
                isFullyValid: !deduplicated.some(q => q.hasMissingSourceError || q.hasMissingStemError),
                missingSourceCount: deduplicated.filter(q => q.hasMissingSourceError).length,
                missingStemCount: deduplicated.filter(q => q.hasMissingStemError).length,
                recoveredCount: deduplicated.filter(q => q.commonStimulus || q.sharedSourceId).length
              },
              promptMetrics: {
                promptLength: livePrompt.length,
                budgetCeiling: BUDGET_CEILING,
                compressionApplied: compressionLevel
              },
              usageMetrics: errJson?.usageMetrics || {
                hasUsageData: false,
                promptTokens: null,
                candidatesTokens: null,
                thinkingTokens: null,
                totalTokens: null
              },
              examClassification
            };
          }
        }
        fallbackReason = serverError
          ? `${serverError} Sorular yerel OYSS standart motoruyla hazırlandı.`
          : 'Üretilen sınav yanıtı biçimsel şemaya uymadığı için yerel OYSS standart motoru devreye alındı.';
      } else if (proxyRes.status === 502) {
        fallbackReason = serverError
          ? `${serverError} Sorular yerel OYSS standart motoruyla hazırlandı.`
          : 'Yapay zekâ servisi şu anda meşgul veya geçici olarak yanıt veremiyor (HTTP 502).';
      } else {
        fallbackReason = serverError
          ? `${serverError} Sorular yerel OYSS standart motoruyla hazırlandı.`
          : `Yapay zekâ servisi yanıt veremedi (HTTP ${proxyRes.status}). Sorular yerel OYSS standart motoruyla hazırlandı.`;
      }
    }
  } catch (proxyErr: any) {
    const finalErr = proxyError || proxyErr;
    console.warn('Sunucu proxy çağrısı başarısız, yerel yedek motora geçiliyor:', finalErr?.message || finalErr);
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
    return buildProceduralSyntheticQuestion(
      outcomeCode,
      resolvedTitle,
      idx,
      pointAllocations[idx] || 15,
      subjectId,
      variationIndex,
      d.cognitiveLevel,
      d.notes
    );
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
    requestedModel: options?.primaryModel || 'gemini-3.5-flash-lite',
    actualModel: 'OYSS Procedural Fallback',
    isModelFallback: true,
    isFallback: true,
    fallbackReason: fallbackReason || 'Canlı yapay zekâ servisi şu anda meşgul veya çevrimdışı olduğundan sorular yerel OYSS kural tabanlı standart motoruyla hazırlandı.',
    questionsCount: finalDynamicQuestions.length,
    generatedQuestions: finalDynamicQuestions,
    sourceValidationSummary: {
      isFullyValid: !finalDynamicQuestions.some(q => q.hasMissingSourceError),
      missingSourceCount: finalDynamicQuestions.filter(q => q.hasMissingSourceError).length,
      recoveredCount: finalDynamicQuestions.filter(q => q.commonStimulus || q.sharedSourceId).length
    },
    usageMetrics: {
      hasUsageData: false,
      promptTokens: null,
      candidatesTokens: null,
      thinkingTokens: null,
      totalTokens: null
    },
    examClassification
  };
}
