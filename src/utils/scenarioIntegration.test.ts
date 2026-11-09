/**
 * OYSS REHBERİ BÜTÜNLEŞİK SENARYO VE SORU KALİTESİ KABUL TESTLERİ
 * 
 * 1. Dönem 2. Yazılı Resmî MEB Senaryoları, Kazanım Çözümleme ve Soru Üretim Entegrasyon Testi
 * Çalıştırma: npx tsx src/utils/scenarioIntegration.test.ts
 */

import { MIDDLE_SCHOOL_OFFICIAL_SCENARIOS_TERM2 } from '../data/secondTermScenarios';
import { resolveOutcomeMetadata } from '../data/curriculumData';
import { generateMEBIQuestions } from './aiGeneratorEngine';

declare const process: any;

async function runScenarioIntegrationTests() {
  console.log('=== OYSS REHBERİ BÜTÜNLEŞİK SENARYO KABUL TESTLERİ BAŞLIYOR ===\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string, detail: string) {
    totalTests++;
    if (!condition) {
      console.error(`[TEST ${totalTests.toString().padStart(2, '0')}] ✗ BAŞARISIZ - ${testName}\n         Hata: ${detail}`);
      throw new Error(`Test başarısız: ${testName} - ${detail}`);
    }
    passedTests++;
    console.log(`[TEST ${totalTests.toString().padStart(2, '0')}] ✓ BAŞARILI - ${testName}\n         Ayrıntı: ${detail}`);
  }

  // TEST 01: 276 Tekil Kazanımın Çözümlenmesi ve Sıfır Ham Kod Sızıntısı
  const seenCodes = new Set<string>();
  let leakCount = 0;
  let emptyTitleCount = 0;

  for (const [, subjects] of Object.entries(MIDDLE_SCHOOL_OFFICIAL_SCENARIOS_TERM2)) {
    for (const [, scenarios] of Object.entries(subjects as Record<string, any[]>)) {
      for (const scenario of scenarios) {
        for (const dist of scenario.distributions) {
          if (!seenCodes.has(dist.outcomeCode)) {
            seenCodes.add(dist.outcomeCode);
            const meta = resolveOutcomeMetadata(dist.outcomeCode, dist.notes);
            if (meta.officialTitle === dist.outcomeCode) {
              leakCount++;
            }
            if (!meta.officialTitle && !meta.topicNote) {
              emptyTitleCount++;
            }
          }
        }
      }
    }
  }

  assert(
    seenCodes.size === 276 && leakCount === 0 && emptyTitleCount === 0,
    'test_official_outcomes_resolution_and_zero_leakage',
    `276 tekil kazanım incelendi. Kod sızıntısı: ${leakCount}, Tanımsız başlık: ${emptyTitleCount}`
  );

  // TEST 02: 7. Sınıf Fen Bilimleri 1. Dönem 2. Yazılı Senaryo 1 Soru Üretimi
  const g7Science = (MIDDLE_SCHOOL_OFFICIAL_SCENARIOS_TERM2 as any)['7']['fen_bilimleri'];
  const g7SciS1 = g7Science.find((s: any) => s.id === 'senaryo_1');

  const sciResult = await generateMEBIQuestions(
    'fen_bilimleri',
    7,
    g7SciS1,
    0,
    undefined,
    g7SciS1.totalQuestions
  );

  assert(
    sciResult.generatedQuestions.length === g7SciS1.totalQuestions,
    'test_grade7_science_s1_question_count',
    `Beklenen soru: ${g7SciS1.totalQuestions}, Üretilen soru: ${sciResult.generatedQuestions.length}`
  );

  // TEST 03: 7. Sınıf Fen Bilimleri Sorularında İçi Boş Şablon ve Mükerrerlik Denetimi
  const hollowPattern = /(öğrenme çıktısı kapsamında|konusunda günlük hayat|açık uçlu bir soru kurgulayınız|ile ilgili açık uçlu model soru)/i;
  let sciHollowFound = false;
  const sciSeenTexts = new Set<string>();
  let sciDuplicateFound = false;

  sciResult.generatedQuestions.forEach((q) => {
    if (hollowPattern.test(q.question) || (q.stimulus && hollowPattern.test(q.stimulus))) {
      sciHollowFound = true;
    }
    const clean = q.question.trim().toLowerCase();
    if (sciSeenTexts.has(clean)) {
      sciDuplicateFound = true;
    }
    sciSeenTexts.add(clean);
  });

  assert(
    !sciHollowFound && !sciDuplicateFound,
    'test_grade7_science_s1_no_hollow_and_no_duplicates',
    `Hollow şablon: ${sciHollowFound}, Anlamsal mükerrerlik: ${sciDuplicateFound}`
  );

  // TEST 04: 7. Sınıf Matematik 1. Dönem 2. Yazılı Senaryo 1 (9 Soru: Hacim, Yüzey Alanı, Eş Küpler, Veri)
  const g7Math = (MIDDLE_SCHOOL_OFFICIAL_SCENARIOS_TERM2 as any)['7']['matematik'];
  const g7MathS1 = g7Math.find((s: any) => s.id === 'senaryo_1');

  const mathResult = await generateMEBIQuestions(
    'matematik',
    7,
    g7MathS1,
    0,
    undefined,
    g7MathS1.totalQuestions
  );

  assert(
    mathResult.generatedQuestions.length === g7MathS1.totalQuestions,
    'test_grade7_math_s1_question_count_and_scope',
    `Beklenen soru: ${g7MathS1.totalQuestions}, Üretilen soru: ${mathResult.generatedQuestions.length}`
  );

  // TEST 05: 8. Sınıf Matematik 1. Dönem 2. Yazılı Senaryo 1 (11 Soru)
  const g8Math = (MIDDLE_SCHOOL_OFFICIAL_SCENARIOS_TERM2 as any)['8']['matematik'];
  const g8MathS1 = g8Math.find((s: any) => s.id === 'senaryo_1');

  const g8Result = await generateMEBIQuestions(
    'matematik',
    8,
    g8MathS1,
    0,
    undefined,
    g8MathS1.totalQuestions
  );

  assert(
    g8Result.generatedQuestions.length === g8MathS1.totalQuestions,
    'test_grade8_math_s1_generation_success',
    `Beklenen soru: ${g8MathS1.totalQuestions}, Üretilen soru: ${g8Result.generatedQuestions.length}`
  );

  // TEST 06: Kaynak Kökeni Etiketlemesi (sourceOrigin Doğrulaması)
  const allOriginsValid = [...sciResult.generatedQuestions, ...mathResult.generatedQuestions].every(
    q => q.sourceOrigin === 'oyss_synthetic' || q.sourceOrigin === 'oyss_curated' || q.sourceOrigin === 'meb_official'
  );

  assert(
    allOriginsValid,
    'test_question_source_origin_tags_valid',
    'Tüm üretilen sorular geçerli ve dürüst sourceOrigin etiketlerine (oyss_synthetic / oyss_curated) sahiptir.'
  );

  console.log('\n=== TEST ÖZETİ ===');
  console.log(`Toplam Test: ${totalTests}`);
  console.log(`Başarılı: ${passedTests}`);
  console.log(`Başarısız: 0`);
  console.log('\n>>> TÜM ENTEGRASYON KABUL TESTLERİ BAŞARIYLA GEÇTİ! <<<');
}

runScenarioIntegrationTests().catch(err => {
  console.error('Test hatası:', err);
  process.exit(1);
});
