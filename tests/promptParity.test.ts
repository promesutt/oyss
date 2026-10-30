import fs from 'fs';
import path from 'path';
import { buildLiveExamPrompt } from '../src/generators/prompts';

console.log('=== OYSS FAZ 2.2.2 - PROMPT PARITY (EŞİTLİK) DOĞRULAMA TESTLERİ BAŞLIYOR ===\n');

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

async function runParityTests() {
  const refPath = path.join(process.cwd(), 'tests/fixtures/reference_prompts.json');
  if (!fs.existsSync(refPath)) {
    console.error('Referans prompt fixture dosyası bulunamadı:', refPath);
    process.exit(1);
  }

  const referenceData = JSON.parse(fs.readFileSync(refPath, 'utf-8'));
  const customGrade7Keys = [
    'matematik_7_setA',
    'matematik_7_setB',
    'fen_bilimleri_7_setA',
    'fen_bilimleri_7_setB',
    'turkce_7_setA',
    'turkce_7_setB',
    'sosyal_bilgiler_7_setA',
    'sosyal_bilgiler_7_setB',
    'din_kulturu_7_setA',
    'din_kulturu_7_setB'
  ];

  const allKeys = Object.keys(referenceData);
  const genericKeys = allKeys.filter(k => !customGrade7Keys.includes(k));

  console.log(`\n--- BÖLÜM 1: 7. SINIF ÖZEL PROMPT PARITY TESTLERİ (10 TEST) ---`);
  for (const key of customGrade7Keys) {
    const item = referenceData[key];
    if (!item) {
      assert(false, `${key} Fixture Kaydı`, 'Kayıt reference_prompts.json içinde bulunamadı!');
      continue;
    }

    const assembledPrompt = buildLiveExamPrompt({
      grade: item.grade,
      subjectId: item.subjectId,
      targetCount: item.targetCount,
      distributionsText: item.distributionsText,
      avoidDirectives: item.avoidDirectives,
      difficultyPlanText: item.difficultyPlanText,
      variationToken: item.variationToken,
      variationIndex: item.variationIndex
    });

    const isMatch = assembledPrompt === item.prompt;
    if (isMatch) {
      assert(
        true,
        `${key} Karakter Eşitliği`,
        `Yeni modüler prompt metni (${assembledPrompt.length} karakter) referans metinle %100 bire bir aynıdır.`
      );
    } else {
      let diffIdx = -1;
      for (let i = 0; i < Math.min(assembledPrompt.length, item.prompt.length); i++) {
        if (assembledPrompt[i] !== item.prompt[i]) {
          diffIdx = i;
          break;
        }
      }
      assert(
        false,
        `${key} Karakter Eşitliği`,
        `Karakter uyuşmazlığı tespit edildi! Üretilen: ${assembledPrompt.length}, Beklenen: ${item.prompt.length}, İlk Fark İndeksi: ${diffIdx}`
      );
    }
  }

  console.log(`\n--- BÖLÜM 2: GENERIC ORTAOKUL PROMPT PARITY TESTLERİ (38 TEST) ---`);
  for (const key of genericKeys) {
    const item = referenceData[key];
    if (!item) {
      assert(false, `${key} Fixture Kaydı`, 'Kayıt reference_prompts.json içinde bulunamadı!');
      continue;
    }

    const assembledPrompt = buildLiveExamPrompt({
      grade: item.grade,
      subjectId: item.subjectId,
      targetCount: item.targetCount,
      distributionsText: item.distributionsText,
      avoidDirectives: item.avoidDirectives,
      difficultyPlanText: item.difficultyPlanText,
      variationToken: item.variationToken,
      variationIndex: item.variationIndex
    });

    const isMatch = assembledPrompt === item.prompt;
    if (isMatch) {
      assert(
        true,
        `${key} Karakter Eşitliği (Generic)`,
        `Generic prompt metni (${assembledPrompt.length} karakter) eski motor referans metniyle %100 bire bir aynıdır.`
      );
    } else {
      let diffIdx = -1;
      for (let i = 0; i < Math.min(assembledPrompt.length, item.prompt.length); i++) {
        if (assembledPrompt[i] !== item.prompt[i]) {
          diffIdx = i;
          break;
        }
      }
      assert(
        false,
        `${key} Karakter Eşitliği (Generic)`,
        `Karakter uyuşmazlığı tespit edildi! Üretilen: ${assembledPrompt.length}, Beklenen: ${item.prompt.length}, İlk Fark İndeksi: ${diffIdx}`
      );
    }
  }

  console.log('--- PROMPT PARITY TEST SONUCU ---');
  console.log(`Toplam Test: ${passCount + failCount} | Başarılı: ${passCount} | Başarısız: ${failCount}\n`);

  if (failCount > 0) {
    console.error('Prompt eşitlik testleri başarısız oldu!');
    process.exit(1);
  }
}

runParityTests().catch(err => {
  console.error('Test çalıştırma hatası:', err);
  process.exit(1);
});
