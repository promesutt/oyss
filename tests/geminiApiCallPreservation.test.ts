import { generateMEBIQuestions } from '../src/utils/aiGeneratorEngine';
import { MIDDLE_SCHOOL_OFFICIAL_SCENARIOS } from '../src/data/curriculumData';
import { PromptRegistryError, buildLiveExamPrompt } from '../src/generators/prompts';
import { GradeLevel, SubjectId } from '../src/types';

console.log('=== OYSS FAZ 2.2.2.1 - GEMINI API ÇAĞRISI KORUMA TESTLERİ BAŞLIYOR ===\n');

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string, detail: string) {
  if (condition) {
    console.log(`[TEST ${String(passCount + failCount + 1).padStart(2, '0')}] ✓ BAŞARILI - ${testName}`);
    console.log(`         Ayrıntı: ${detail}\n`);
    passCount++;
  } else {
    console.error(`[TEST ${String(passCount + failCount + 1).padStart(2, '0')}] ✗ BAŞARISIZ - ${testName}`);
    console.error(`         Ayrıntı: ${detail}\n`);
    failCount++;
  }
}

async function runApiPreservationTests() {
  const grades: GradeLevel[] = [5, 6, 7, 8];
  const subjects: SubjectId[] = [
    'turkce',
    'matematik',
    'fen_bilimleri',
    'sosyal_bilgiler',
    'din_kulturu',
    'ingilizce'
  ];

  let interceptedFetchCalls = 0;
  let lastCapturedPrompt = '';
  let lastCapturedBody: any = null;

  // Kontrollü Mock Fetch: Gerçek Gemini API çağrısı yapmaz, promptu yakalar ve geçerli yanıt döner
  (globalThis as any).fetch = async (url: string, init: any) => {
    if (url === '/api/generate') {
      interceptedFetchCalls++;
      lastCapturedBody = JSON.parse(init.body);
      lastCapturedPrompt = lastCapturedBody.prompt;

      const dummyQuestions = Array.from({ length: 6 }, (_, i) => ({
        number: i + 1,
        outcome: 'TEST.OUTCOME',
        outcomeTitle: 'Test Kazanımı',
        difficulty: 'Orta',
        level: 'Kavramsal',
        templateType: 'Test',
        points: 15,
        stimulus: 'Test stimulus metni...',
        question: `Test soru ${i + 1}?`,
        answer: 'Test model cevabı',
        rubric: [{ item: 'Doğru cevap', pts: 15 }]
      }));

      return {
        ok: true,
        json: async () => ({ questions: dummyQuestions })
      };
    }
    return { ok: false, status: 404, json: async () => ({}) };
  };

  console.log('--- BÖLÜM 1: 24 RESMİ ORTAOKUL KOMBİNASYONU GEMINI API KORUMA TESTLERİ ---');

  for (const grade of grades) {
    for (const sub of subjects) {
      const scenario = (MIDDLE_SCHOOL_OFFICIAL_SCENARIOS as any)[grade]?.[sub]?.[0];
      if (!scenario) {
        assert(false, `Senaryo Eksik: ${grade}. Sınıf ${sub}`, 'Senaryo 1 bulunamadı!');
        continue;
      }

      interceptedFetchCalls = 0;
      lastCapturedPrompt = '';
      lastCapturedBody = null;

      const result = await generateMEBIQuestions(sub, grade, scenario, 0);

      const fetchHappened = interceptedFetchCalls === 1;
      const promptNotEmpty = typeof lastCapturedPrompt === 'string' && lastCapturedPrompt.length > 7000;
      const noRegistryError = !(result.fallbackReason || '').includes('PromptRegistryError') &&
                              !(result.fallbackReason || '').includes('kütük hatası');

      assert(
        fetchHappened && promptNotEmpty && noRegistryError,
        `Gemini API Çağrısı Korundu: ${grade}. Sınıf ${sub}`,
        `fetch('/api/generate') tetiklendi (Çağrı: ${interceptedFetchCalls}), prompt uzunluğu: ${lastCapturedPrompt.length} krk, fallbackReason: ${result.fallbackReason || 'YOK (API Başarılı)'}`
      );
    }
  }

  console.log('\n--- BÖLÜM 2: GEÇERSİZ KOMBİNASYONLAR İÇİN FAİL-FAST HATA VE API BLOKAJ DENETİMİ ---');

  // Test: 9. Sınıf Türkçe (Geçersiz kademe)
  interceptedFetchCalls = 0;
  let error9th: any = null;
  try {
    buildLiveExamPrompt({
      grade: 9 as any,
      subjectId: 'turkce',
      targetCount: 6,
      distributionsText: '',
      avoidDirectives: '',
      difficultyPlanText: ''
    });
  } catch (err: any) {
    error9th = err;
  }

  assert(
    error9th instanceof PromptRegistryError,
    'Fail-Fast: 9. Sınıf Türkçe buildLiveExamPrompt Doğrulaması',
    `9. Sınıf Türkçe için PromptRegistryError fırlatıldı: "${error9th?.message}"`
  );

  // Test: 7. Sınıf Felsefe (Geçersiz branş)
  interceptedFetchCalls = 0;
  let errorPhilosophy: any = null;
  try {
    buildLiveExamPrompt({
      grade: 7,
      subjectId: 'felsefe' as any,
      targetCount: 6,
      distributionsText: '',
      avoidDirectives: '',
      difficultyPlanText: ''
    });
  } catch (err: any) {
    errorPhilosophy = err;
  }

  assert(
    errorPhilosophy instanceof PromptRegistryError,
    'Fail-Fast: 7. Sınıf Felsefe buildLiveExamPrompt Doğrulaması',
    `7. Sınıf Felsefe için PromptRegistryError fırlatıldı: "${errorPhilosophy?.message}"`
  );

  // Test: Geçersiz kombinasyon motor üzerinden çağrıldığında fetch ASLA yapılmamalı
  interceptedFetchCalls = 0;
  const dummyScenario = {
    id: 'senaryo_test',
    name: 'Test Senaryo',
    description: 'Test',
    totalQuestions: 6,
    distributions: [{ outcomeCode: 'TEST', questionCount: 6, cognitiveLevel: 'Basit', notes: 'Test' }]
  };

  const resInvalid = await generateMEBIQuestions('felsefe' as any, 7, dummyScenario as any, 0);
  const fetchBlocked = interceptedFetchCalls === 0;
  const fellBackDueToRegistry = (resInvalid.fallbackReason || '').includes('kütük hatası') ||
                                (resInvalid.fallbackReason || '').includes('PromptRegistryError');

  assert(
    fetchBlocked && fellBackDueToRegistry,
    'API Blokajı: Geçersiz Kombinasyonda Gemini Çağrısı Yapılmadı',
    `Geçersiz felsefe branşında fetch engellendi (Çağrı: ${interceptedFetchCalls}), fallbackReason: "${resInvalid.fallbackReason}"`
  );

  console.log('\n--- GEMINI API ÇAĞRISI KORUMA TEST SONUCU ---');
  console.log(`Toplam Test: ${passCount + failCount} | Başarılı: ${passCount} | Başarısız: ${failCount}\n`);

  if (failCount > 0) {
    console.error('API çağrısı koruma testleri başarısız oldu!');
    process.exit(1);
  }
}

runApiPreservationTests().catch(err => {
  console.error('Hata oluştu:', err);
  process.exit(1);
});
