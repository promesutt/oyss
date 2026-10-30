import fs from 'fs';
import path from 'path';
import { generateMEBIQuestions } from '../src/utils/aiGeneratorEngine';
import { MIDDLE_SCHOOL_OFFICIAL_SCENARIOS } from '../src/data/curriculumData';

console.log('=== OYSS FAZ 2.1 - YEREL SORU HAVUZLARI EŞİTLİK DOĞRULAMA TESTLERİ BAŞLIYOR ===\n');

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
  const refPath = path.join(process.cwd(), 'tests/fixtures/reference_outputs.json');
  if (!fs.existsSync(refPath)) {
    console.error('Referans çıktı dosyası bulunamadı:', refPath);
    process.exit(1);
  }

  const referenceData = JSON.parse(fs.readFileSync(refPath, 'utf-8'));
  const subjects = ['matematik', 'fen_bilimleri', 'turkce', 'sosyal_bilgiler', 'din_kulturu'] as const;

  for (const sub of subjects) {
    const sc = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[7][sub]![0];

    // Yeni motorla Set A üret
    const newSetA = await generateMEBIQuestions(sub, 7, sc, 0);

    // Yeni motorla Set B üret
    const newSetB = await generateMEBIQuestions(sub, 7, sc, 1, undefined, undefined, {
      avoidQuestionTexts: newSetA.generatedQuestions.map(q => q.question),
      avoidStimuli: newSetA.generatedQuestions.map(q => q.stimulus || '')
    });

    const sanitize = (res: any) => ({
      title: res.title,
      model: res.model,
      isFallback: res.isFallback,
      questionsCount: res.questionsCount,
      questions: res.generatedQuestions.map((q: any) => ({
        number: q.number,
        outcome: q.outcome,
        outcomeTitle: q.outcomeTitle,
        difficulty: q.difficulty,
        level: q.level || q.cognitiveLevel,
        templateType: q.templateType,
        points: q.points,
        stimulus: q.stimulus,
        question: q.question,
        answer: q.answer,
        alternativeAnswers: q.alternativeAnswers,
        rubric: q.rubric
      }))
    });

    const currentA = sanitize(newSetA);
    const currentB = sanitize(newSetB);

    const refA = referenceData[`${sub}_setA`];
    const refB = referenceData[`${sub}_setB`];

    // Test Set A
    const setAMatch = JSON.stringify(currentA.questions) === JSON.stringify(refA.questions);
    assert(
      setAMatch,
      `7. Sınıf ${sub.toUpperCase()} Set A Birebir Eşitlik Testi`,
      `Toplam ${currentA.questionsCount} soru incelendi. Soru metni, kaynak metin, puan, kazanım kodu, alternatif cevaplar ve rubrik referansla %100 eşleşti.`
    );

    // Test Set B
    const setBMatch = JSON.stringify(currentB.questions) === JSON.stringify(refB.questions);
    assert(
      setBMatch,
      `7. Sınıf ${sub.toUpperCase()} Set B Birebir Eşitlik Testi`,
      `Toplam ${currentB.questionsCount} soru incelendi. Soru metni, kaynak metin, puan, kazanım kodu, alternatif cevaplar ve rubrik referansla %100 eşleşti.`
    );
  }

  console.log('------------------------------------------------------------');
  console.log(`Eşitlik Test Özeti: ${passCount} Başarılı, ${failCount} Başarısız`);
  console.log('------------------------------------------------------------');

  if (failCount > 0) {
    process.exit(1);
  }
}

runParityTests().catch(err => {
  console.error('Eşitlik testi sırasında hata:', err);
  process.exit(1);
});
