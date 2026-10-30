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
    if (cFull === aFull || (cQ && cQ === aQ)) return true;

    const fullSim = calculateQuestionSimilarity(cFull, aFull);
    const qSim = calculateQuestionSimilarity(cQ, aQ);

    // Senaryolu / Zengin Uyarıcılı Sorular (Her ikisinin de uyarıcısı zenginse)
    if (cS.length > 25 && aS.length > 25) {
      const stimSim = calculateQuestionSimilarity(cS, aS);
      if (stimSim >= 0.50) {
        if (qSim >= 0.40 || fullSim >= 0.55) return true;
      }
      if (stimSim < 0.35) {
        // Kurgular ve bağlamlar tamamen farklı; salt yönerge/komut benzerliğinden ötürü mükerrer sayma
        if (fullSim >= 0.65) return true;
        continue;
      }
      if (fullSim >= 0.58) return true;
      continue;
    }

    // Matematik / Fen Sorularında Sayısal / Parametrik Kontrol
    const aNums = extractNumbersFromText(aFull);
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

  const variationToken = `${variationIndex + 1}_${Date.now().toString(36)}`;
  const avoidDirectives = buildAvoidDirectives({
    baseAvoidTexts,
    baseAvoidStimuli,
    setAAvoidTexts,
    setAAvoidStimuli,
    variationIndex,
    variationToken
  });

  let fallbackReason: string | undefined;
  let livePrompt: string | undefined;
  try {
    livePrompt = buildLiveExamPrompt({
      grade,
      subjectId,
      targetCount,
      distributionsText,
      avoidDirectives,
      difficultyPlanText,
      variationIndex,
      variationToken
    });
  } catch (err: any) {
    fallbackReason = err?.message || "Prompt oluşturulamadığı için yerel MEBİ özgünleştirme motoruna aktarılıyor.";
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

  // 1. TIER 1: Güvenli Sunucu Fonksiyonu Proxy (/api/generate)
  // Tüm yapay zekâ istekleri istemciden gizlenmiş sunucu tarafı Netlify Function üzerinden yürütülür.
  if (livePrompt) {
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
        const normalized = normalizeAndCalibrateQuestions(questionsList);

        // Anti-duplication sanity check: Canlı Gemini çıktısının mevcut sınav sorularını birebir tekrarlamadığından emin ol
        const hasDirectDuplicate = normalized.some(nq =>
          isDuplicateOrTooSimilar(nq.question, nq.stimulus, allAvoidItems, undefined, 0.45)
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
        fallbackReason = errJson?.error || 'Üretilen sınav yanıtı biçimsel şemaya uymadığı için yerel motor devreye alındı.';
      } else if (proxyRes.status === 502 || proxyRes.status === 503) {
        fallbackReason = errJson?.error || 'Yapay zekâ servisi şu anda meşgul veya geçici olarak yanıt veremiyor (HTTP 502/503).';
      } else {
        fallbackReason = errJson?.error || `Yapay zekâ servisi yanıt veremedi (HTTP ${proxyRes.status}).`;
      }
    }
  } catch (proxyErr: any) {
    console.warn('Sunucu proxy çağrısı başarısız, yerel yedek motora geçiliyor:', proxyErr?.message || proxyErr);
    fallbackReason = 'Canlı yapay zekâ servisiyle bağlantı kurulamadı (Ağ/Çevrimdışı).';
  }
  }

  // 2. TIER 2: Prosedürel MEBİ Müfredat Motoru (Çevrimdışı / Güvenli Yedek)
  // Sunucu API yanıt veremediğinde veya bağlantı olmadığında devreye giren deterministik üretim motoru.
  const _cycle = variationIndex % 2;
  void _cycle;

  // ---------------------------------------------------------------------------
  // KAZANIM ODAKLI VE RESMİ MEBİ DAĞILIMINA %100 UYUMLU PROSEDÜREL SEÇİCİ
  // ---------------------------------------------------------------------------
  // Her ders ve her senaryo için soru seçimi; soru numarasına veya sıralı döngüye göre DEĞİL,
  // Soru i için belirlenen resmi "d.outcomeCode" kazanımına göre TAM EŞLEŞME ile yapılır.
  const occurrenceCount: Record<string, number> = {};

  const internalAllQuestions: GeneratedQuestionItem[] = getAllFallbackQuestions({
    name1,
    name2,
    pointAllocations
  });

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
            `Metinde anlatılan ${ctx.theme} olayında adalet, emek ve paylaşım bilinci vurgulanmaktadır.`,
            `Olay örgüsünde ${ctx.theme} çerçevesinde toplumsal dayanışma, dürüstlük ve ortak sorumluluk değerleri öne çıkarılmıştır.`
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
            `Kelimeler metindeki bağlama uygun olarak doğru anlamlandırılmıştır.`,
            `Her iki sözcüğün de metnin ana temasına ve cümle yapısına uygun anlam karşılıkları yazılmıştır.`
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
            `Deyimler yerinde ve doğru anlamda kullanılarak tutarlı bir metin kurgulanmıştır.`,
            `Belirtilen deyimler bağlama ve tema akışına uygun seçilerek dil kurallarına uygun şekilde metne işlenmiştir.`
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
            `Büyük harf ve noktalama işaretleri eksiksiz düzeltilmiştir.`,
            `Cümledeki özel isim yazımı, iki nokta ve büyük harf kuralları doğru biçimde uygulanarak cümle yeniden yazılmıştır.`
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
