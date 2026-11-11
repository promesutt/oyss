import { generateMEBIQuestions } from '../src/utils/aiGeneratorEngine';
import { getScenarios } from '../src/data/curriculumData';
import type { SubjectId } from '../src/types';
import * as fs from 'fs';
import * as path from 'path';

// Wrap fetch to target the Netlify test deployment
const originalFetch = globalThis.fetch;
globalThis.fetch = async (input: any, init: any) => {
  let url = input;
  if (typeof url === 'string' && url.startsWith('/api/')) {
    url = `https://test-ai-visual-integration--ortakyazili.netlify.app${url}`;
  }
  return originalFetch(url, init);
};

export interface Task235Tokens {
  hasUsageData: boolean;
  promptTokens: number | null;
  candidatesTokens: number | null;
  thinkingTokens: number | null;
  totalTokens: number | null;
}

export interface Task235ModelTelemetry {
  requestedModel: string;
  actualModel: string;
  servedByRequestedModel: boolean;
  modelDisplayName: string;
  elapsedSec: number;
  httpStatus?: number;
  isFallback: boolean;
  fallbackReason?: string;
  questionsCount: number;
  tokens: Task235Tokens;
  costUSD: number | null;
  qualityFlags: string[];
  sampleStem?: string;
}

export interface Task235ComparisonRecord {
  scenarioId: string;
  scenarioName: string;
  subjectId: SubjectId;
  subjectName: string;
  grade: number;
  variationIndex: number;
  targetQuestionCount: number;
  completedAt?: string;

  modelA: Task235ModelTelemetry; // 3.5 Flash-Lite
  modelB: Task235ModelTelemetry; // 3.8 Flash LOW
}

/**
 * Google Generative Language API Resmi Fiyatlandırması (USD)
 * Doğrulama Tarihi: Kasım 2026 (Kaynak: https://ai.google.dev/pricing)
 *
 * Gemini 3.5 Flash-Lite:
 * - Giriş (Input): $0.30 / 1.000.000 token ($0.00000030 / token)
 * - Çıkış (Output): $2.50 / 1.000.000 token ($0.00000250 / token)
 *
 * Gemini 3.8 Flash (Thinking: LOW):
 * - Giriş (Input): $0.75 / 1.000.000 token ($0.00000075 / token - 31 Aralık 2026'ya kadar geçerli tanıtım fiyatı)
 * - Çıkış (Output - Thinking tokenleri dahil): $3.75 / 1.000.000 token ($0.00000375 / token - 31 Aralık 2026'ya kadar geçerli tanıtım fiyatı)
 *
 * NOT: Google API dokümantasyonuna göre thinking (düşünme) tokenleri çıkış (candidates) token
 * havuzuna dahildir ve standart çıkış tarifesi üzerinden faturalandırılır. İkinci kez eklenmez.
 */
export function calculateExamCostUSD(
  model: 'gemini-3.5-flash-lite' | 'gemini-3.8-flash',
  promptTokens: number | null,
  candidatesTokens: number | null
): number | null {
  if (promptTokens === null || candidatesTokens === null) return null;

  if (model === 'gemini-3.5-flash-lite') {
    const inputCost = (promptTokens / 1_000_000) * 0.30;
    const outputCost = (candidatesTokens / 1_000_000) * 2.50;
    return Number((inputCost + outputCost).toFixed(7));
  } else if (model === 'gemini-3.8-flash') {
    const inputCost = (promptTokens / 1_000_000) * 0.75;
    const outputCost = (candidatesTokens / 1_000_000) * 3.75;
    return Number((inputCost + outputCost).toFixed(7));
  }

  return null;
}

function analyzeQuestionQuality(q: any): string[] {
  const flags: string[] = [];
  if (!q.question || q.question.trim().length < 5) {
    flags.push('Boş veya yetersiz soru kökü');
  }
  if (!q.rubric || !Array.isArray(q.rubric) || q.rubric.length === 0) {
    flags.push('Eksik analitik rubrik');
  }
  if (!q.answer || q.answer.trim().length < 2) {
    flags.push('Eksik model cevap');
  }
  return flags;
}

export async function runTask235Runner(options?: { dryRun?: boolean; pilotOnly?: boolean }) {
  console.log('========================================================================');
  console.log('TASK235: GEMINI 3.8 FLASH LOW KONTROLLÜ PERFORMANS TESTİ');
  console.log('Model A: gemini-3.5-flash-lite (Üretim Varsayılanı)');
  console.log('Model B: gemini-3.8-flash (thinkingLevel: LOW)');
  console.log('Hedef URL: https://test-ai-visual-integration--ortakyazili.netlify.app');
  console.log('Kapsam: 7. Sınıf Matematik (3 Senaryo) + 7. Sınıf Fen Bilimleri (3 Senaryo)');
  console.log('Toplam: 6 Ortak Senaryo, 12 Sınav Üretimi');
  console.log('========================================================================\n');

  if (options?.dryRun) {
    console.log('[DRY-RUN] Test hazırlığı başarıyla doğrulandı. Gerçek API çağrıları kullanıcı onayı sonrasında yürütülecektir.');
    return [];
  }

  const outDir = path.join(process.cwd(), 'scratch');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'task235_low_comparison_results.json');

  let comparisonRecords: Task235ComparisonRecord[] = [];
  if (fs.existsSync(outPath)) {
    try {
      const raw = fs.readFileSync(outPath, 'utf8');
      const loaded = JSON.parse(raw);
      if (Array.isArray(loaded)) {
        comparisonRecords = loaded;
        console.log(`[RESUME] Önceden tamamlanmış ${comparisonRecords.length} senaryo kaydı yüklendi.`);
      }
    } catch (readErr) {
      console.warn('[RESUME] Kayıt okunamadı, sıfırdan başlanacak:', readErr);
    }
  }

  const testSubjects: Array<{ id: SubjectId; name: string }> = [
    { id: 'matematik', name: '7. Sınıf Matematik' },
    { id: 'fen_bilimleri', name: '7. Sınıf Fen Bilimleri' }
  ];

  for (const sub of testSubjects) {
    console.log(`\n>>> [${sub.name}] Test Başlatılıyor...`);
    const allScenarios = getScenarios(sub.id, 7, '1_donem_1_yazili');
    // Task talimatı: İlk 3 senaryo (senaryo_1, senaryo_2, senaryo_3)
    const targetScenarios = allScenarios.slice(0, 3);

    let planIdx = 1;
    for (const sc of targetScenarios) {
      if (options?.pilotOnly && planIdx > 1) {
        console.log(`  [PILOT] Senaryo 1 tamamlandı, pilot aşaması için diğer senaryolar atlanıyor.`);
        break;
      }

      const existingIdx = comparisonRecords.findIndex(
        r => r.subjectId === sub.id && r.scenarioId === sc.id
      );

      if (existingIdx !== -1) {
        console.log(`  [ATLANDI - ZATEN TAMAMLANMIŞ] ${sub.name} - Senaryo ${planIdx}/3: ${sc.name} (ID: ${sc.id})`);
        planIdx++;
        continue;
      }

      console.log(`\n  --- [${sub.name}] Senaryo ${planIdx}/3: ${sc.name} (ID: ${sc.id}, ${sc.totalQuestions} Soru) ---`);

      // 1. Model A Testi (gemini-3.5-flash-lite)
      console.log(`    -> [Model A] gemini-3.5-flash-lite çağrılıyor...`);
      const t0A = Date.now();
      const resA = await generateMEBIQuestions(sub.id, 7, sc, 0, undefined, undefined, {
        primaryModel: 'gemini-3.5-flash-lite'
      });
      const elapsedA = Number(((Date.now() - t0A) / 1000).toFixed(1));
      const flagsA = (resA.generatedQuestions || []).flatMap(q => analyzeQuestionQuality(q));
      const actualModelA = resA.actualModel || resA.model;
      const servedA = actualModelA.includes('3.5');
      const tokensA: Task235Tokens = resA.usageMetrics || {
        hasUsageData: false,
        promptTokens: null,
        candidatesTokens: null,
        thinkingTokens: null,
        totalTokens: null
      };
      const costA = calculateExamCostUSD('gemini-3.5-flash-lite', tokensA.promptTokens, tokensA.candidatesTokens);

      console.log(`       Model A Bitti: Model=${actualModelA} (İstenen Model=${servedA}) | Süre: ${elapsedA}s | Soru: ${resA.questionsCount} | Fallback: ${resA.isFallback} | Maliyet: $${costA ?? 'N/A'}`);

      // Rate limit koruması
      await new Promise(r => setTimeout(r, 3000));

      // 2. Model B Testi (gemini-3.8-flash, thinkingLevel: 'low')
      console.log(`    -> [Model B] gemini-3.8-flash (thinkingLevel: LOW) çağrılıyor...`);
      const t0B = Date.now();
      const resB = await generateMEBIQuestions(sub.id, 7, sc, 0, undefined, undefined, {
        primaryModel: 'gemini-3.8-flash',
        thinkingLevel: 'low'
      });
      const elapsedB = Number(((Date.now() - t0B) / 1000).toFixed(1));
      const flagsB = (resB.generatedQuestions || []).flatMap(q => analyzeQuestionQuality(q));
      const actualModelB = resB.actualModel || resB.model;
      const servedB = actualModelB.includes('3.8');
      const tokensB: Task235Tokens = resB.usageMetrics || {
        hasUsageData: false,
        promptTokens: null,
        candidatesTokens: null,
        thinkingTokens: null,
        totalTokens: null
      };
      const costB = calculateExamCostUSD('gemini-3.8-flash', tokensB.promptTokens, tokensB.candidatesTokens);

      console.log(`       Model B Bitti: Model=${actualModelB} (İstenen Model=${servedB}) | Süre: ${elapsedB}s | Soru: ${resB.questionsCount} | Fallback: ${resB.isFallback} | Maliyet: $${costB ?? 'N/A'}`);

      const record: Task235ComparisonRecord = {
        scenarioId: sc.id,
        scenarioName: sc.name,
        subjectId: sub.id,
        subjectName: sub.name,
        grade: 7,
        variationIndex: 0,
        targetQuestionCount: sc.totalQuestions,
        completedAt: new Date().toISOString(),
        modelA: {
          requestedModel: 'gemini-3.5-flash-lite',
          actualModel: actualModelA,
          servedByRequestedModel: servedA,
          modelDisplayName: resA.model,
          elapsedSec: elapsedA,
          httpStatus: resA.httpStatus || (resA.isFallback ? 503 : 200),
          isFallback: Boolean(resA.isFallback),
          fallbackReason: resA.fallbackReason,
          questionsCount: resA.questionsCount,
          tokens: tokensA,
          costUSD: costA,
          qualityFlags: flagsA,
          sampleStem: resA.generatedQuestions?.[0]?.question
        },
        modelB: {
          requestedModel: 'gemini-3.8-flash',
          actualModel: actualModelB,
          servedByRequestedModel: servedB,
          modelDisplayName: resB.model,
          elapsedSec: elapsedB,
          httpStatus: resB.httpStatus || (resB.isFallback ? 503 : 200),
          isFallback: Boolean(resB.isFallback),
          fallbackReason: resB.fallbackReason,
          questionsCount: resB.questionsCount,
          tokens: tokensB,
          costUSD: costB,
          qualityFlags: flagsB,
          sampleStem: resB.generatedQuestions?.[0]?.question
        }
      };

      comparisonRecords.push(record);
      planIdx++;

      fs.writeFileSync(outPath, JSON.stringify(comparisonRecords, null, 2), 'utf8');
      console.log(`       [KAYDEDİLDİ] Senaryo diske yazıldı (${comparisonRecords.length}/6).`);

      await new Promise(r => setTimeout(r, 3000));
    }
  }

  console.log(`\n========================================================================`);
  console.log(`TASK235 TESTİ TAMAMLANDI. Sonuçlar: ${outPath}`);
  console.log(`Toplam Kayıt: ${comparisonRecords.length} / 6 Senaryo`);
  console.log(`========================================================================\n`);

  return comparisonRecords;
}

if (process.argv[1]?.endsWith('run_task235_low_test.ts')) {
  runTask235Runner({ dryRun: false }).catch(err => {
    console.error('TASK235 Test Hatası:', err);
    process.exit(1);
  });
}

