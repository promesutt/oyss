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

export interface ABModelResultTelemetry {
  requestedModel: string;
  actualModel: string;
  servedByRequestedModel: boolean;
  modelDisplayName: string;
  elapsedSec: number;
  httpStatus?: number;
  isFallback: boolean;
  fallbackReason?: string;
  questionsCount: number;
  tokens: {
    hasUsageData: boolean;
    promptTokens: number | null;
    candidatesTokens: number | null;
    thinkingTokens: number | null;
    totalTokens: number | null;
  };
  qualityFlags: string[];
  sampleStem?: string;
}

export interface ABComparisonRecord {
  scenarioId: string;
  scenarioName: string;
  subjectId: SubjectId;
  subjectName: string;
  grade: number;
  variationIndex: number;
  targetQuestionCount: number;
  completedAt?: string;

  modelA: ABModelResultTelemetry;
  modelB: ABModelResultTelemetry;
}

const subjectsConfig: Array<{ id: SubjectId; name: string }> = [
  { id: 'matematik', name: '7. Sınıf Matematik' },
  { id: 'fen_bilimleri', name: '7. Sınıf Fen Bilimleri' },
  { id: 'din_kulturu', name: '7. Sınıf Din Kültürü ve Ahlak Bilgisi' },
  { id: 'sosyal_bilgiler', name: '7. Sınıf Sosyal Bilgiler' }
];

function analyzeQuestionQuality(q: any, subjectId: SubjectId): string[] {
  const flags: string[] = [];
  if (!q.question || q.question.trim().length < 5) {
    flags.push('Boş/Yetersiz soru kökü');
  }

  if (subjectId === 'din_kulturu') {
    const text = `${q.stimulus || ''} ${q.question || ''}`.toLowerCase();
    const narrativeIndicators = [
      'deniz feneri', 'bekçi barış', 'hafta sonu köyüne', 'günlüğüne şöyle yazdı',
      'pencereden dışarı bakarken', 'tatilde dedesinin çiftliğine'
    ];
    for (const ind of narrativeIndicators) {
      if (text.includes(ind)) {
        flags.push(`Yapay/Süs Hikâye: "${ind}"`);
      }
    }
  }

  return flags;
}

export async function runABTestRunner(options?: { dryRun?: boolean }) {
  console.log('========================================================================');
  console.log('OYSS GEMINI 3.8 FLASH / 3.5 FLASH-LITE KONTROLLÜ A/B TEST MOTORU');
  console.log('Model A: gemini-3.5-flash-lite (Üretim Varsayılanı)');
  console.log('Model B: gemini-3.8-flash (thinkingLevel: MEDIUM)');
  console.log('Hedef URL: https://test-ai-visual-integration--ortakyazili.netlify.app');
  console.log('========================================================================\n');

  if (options?.dryRun) {
    console.log('[DRY-RUN] Test hazırlığı başarıyla doğrulandı. Gerçek API çağrıları kullanıcı onayından sonra yürütülecektir.');
    return [];
  }

  const outDir = path.join(process.cwd(), 'scratch');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'ab_test_comparison_results.json');

  // Kaldığı Yerden Devam Etme (Resumability) Kontrolü:
  let comparisonRecords: ABComparisonRecord[] = [];
  if (fs.existsSync(outPath)) {
    try {
      const raw = fs.readFileSync(outPath, 'utf8');
      const loaded = JSON.parse(raw);
      if (Array.isArray(loaded)) {
        comparisonRecords = loaded;
        console.log(`[RESUME] Önceden tamamlanmış ${comparisonRecords.length} senaryo kaydı yüklendi. Kaldığı yerden devam edilecek.`);
      }
    } catch (readErr) {
      console.warn('[RESUME] Mevcut kayıt okunamadı, sıfırdan başlanacak:', readErr);
    }
  }

  for (const sub of subjectsConfig) {
    console.log(`\n>>> [${sub.name}] A/B Testleri Başlatılıyor (5 Senaryo)...`);
    const scenarios = getScenarios(sub.id, 7, '1_donem_1_yazili');

    // Select 5 scenarios
    const testPlans: Array<{ scenario: any; variationIndex: number }> = [];
    if (scenarios.length >= 5) {
      for (let i = 0; i < 5; i++) testPlans.push({ scenario: scenarios[i], variationIndex: 0 });
    } else {
      for (let i = 0; i < scenarios.length; i++) testPlans.push({ scenario: scenarios[i], variationIndex: 0 });
      testPlans.push({ scenario: scenarios[0], variationIndex: 1 });
    }

    let planIdx = 1;
    for (const plan of testPlans) {
      const sc = plan.scenario;
      const vIndex = plan.variationIndex;

      // Zaten tamamlanmış mı kontrol et
      const existingIdx = comparisonRecords.findIndex(
        r => r.subjectId === sub.id && r.scenarioId === sc.id && r.variationIndex === vIndex
      );

      if (existingIdx !== -1) {
        console.log(`  [ATLANDI - ZATEN TAMAMLANMIŞ] ${sub.name} - Senaryo ${planIdx}/5: ${sc.name} (ID: ${sc.id}, Var: ${vIndex})`);
        planIdx++;
        continue;
      }

      console.log(`\n  --- [${sub.name}] Senaryo ${planIdx}/5: ${sc.name} (ID: ${sc.id}, Varyasyon: ${vIndex}) ---`);

      // 1. Model A Testi (gemini-3.5-flash-lite)
      console.log(`    -> [Model A] gemini-3.5-flash-lite çağrılıyor...`);
      const t0A = Date.now();
      const resA = await generateMEBIQuestions(sub.id, 7, sc, vIndex, undefined, undefined, {
        primaryModel: 'gemini-3.5-flash-lite'
      });
      const elapsedA = Number(((Date.now() - t0A) / 1000).toFixed(1));
      const flagsA = (resA.generatedQuestions || []).flatMap(q => analyzeQuestionQuality(q, sub.id));
      const actualModelA = resA.actualModel || resA.model;
      const servedA = actualModelA.includes('3.5');

      console.log(`       Model A Bitti: Model=${actualModelA} (İstenen Model Başarısı=${servedA}) | Süre: ${elapsedA}s | Soru: ${resA.questionsCount} | Fallback: ${resA.isFallback}`);

      // Bekleme (Rate limit önlemi)
      await new Promise(r => setTimeout(r, 2500));

      // 2. Model B Testi (gemini-3.8-flash, thinking: MEDIUM)
      console.log(`    -> [Model B] gemini-3.8-flash (thinkingLevel: MEDIUM) çağrılıyor...`);
      const t0B = Date.now();
      const resB = await generateMEBIQuestions(sub.id, 7, sc, vIndex, undefined, undefined, {
        primaryModel: 'gemini-3.8-flash',
        thinkingLevel: 'medium'
      });
      const elapsedB = Number(((Date.now() - t0B) / 1000).toFixed(1));
      const flagsB = (resB.generatedQuestions || []).flatMap(q => analyzeQuestionQuality(q, sub.id));
      const actualModelB = resB.actualModel || resB.model;
      const servedB = actualModelB.includes('3.8');

      console.log(`       Model B Bitti: Model=${actualModelB} (İstenen Model Başarısı=${servedB}) | Süre: ${elapsedB}s | Soru: ${resB.questionsCount} | Fallback: ${resB.isFallback}`);

      const record: ABComparisonRecord = {
        scenarioId: sc.id,
        scenarioName: sc.name,
        subjectId: sub.id,
        subjectName: sub.name,
        grade: 7,
        variationIndex: vIndex,
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
          tokens: resA.usageMetrics || {
            hasUsageData: false,
            promptTokens: null,
            candidatesTokens: null,
            thinkingTokens: null,
            totalTokens: null
          },
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
          tokens: resB.usageMetrics || {
            hasUsageData: false,
            promptTokens: null,
            candidatesTokens: null,
            thinkingTokens: null,
            totalTokens: null
          },
          qualityFlags: flagsB,
          sampleStem: resB.generatedQuestions?.[0]?.question
        }
      };

      comparisonRecords.push(record);
      planIdx++;

      // Her senaryodan sonra anında diske kaydet (Incremental Persistence):
      fs.writeFileSync(outPath, JSON.stringify(comparisonRecords, null, 2), 'utf8');
      console.log(`       [KAYDEDİLDİ] Senaryo sonuçları diske yazıldı (${comparisonRecords.length}/20).`);

      await new Promise(r => setTimeout(r, 2500));
    }
  }

  console.log(`\n========================================================================`);
  console.log(`A/B TESTİ TAMAMLANDI. Sonuçlar kaydedildi: ${outPath}`);
  console.log(`Toplam Kayıt: ${comparisonRecords.length} / 20 Senaryo`);
  console.log(`========================================================================\n`);

  return comparisonRecords;
}

// CLI direct run check
if (process.argv[1]?.endsWith('run_ab_model_comparison.ts')) {
  runABTestRunner({ dryRun: false }).catch(err => {
    console.error('A/B Test Hatası:', err);
    process.exit(1);
  });
}

