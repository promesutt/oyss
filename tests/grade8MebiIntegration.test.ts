import {
  getRegisteredPrompt,
  isSubjectPromptRegistered,
  isCustomSubjectPromptRegistered,
  buildLiveExamPrompt,
  PromptRegistryError
} from '../src/generators/prompts';
import { SubjectId } from '../src/types';
import {
  getScenarios,
  getOfficialOutcomeTitle,
  ALL_GRADES
} from '../src/data/curriculumData';

console.log('=== OYSS TASK 156 - 8. SINIF MEBİ PROMPT ENTEGRASYONU DOĞRULAMA TESTLERİ BAŞLIYOR ===\n');

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

async function runGrade8IntegrationTests() {
  const grade8Subjects: SubjectId[] = [
    'turkce',
    'matematik',
    'fen_bilimleri',
    'sosyal_bilgiler',
    'din_kulturu',
    'ingilizce'
  ];

  // 1. Altı branşın doğru registry kaydına yönlenmesi
  console.log('--- BÖLÜM 1: 8. SINIF BRANŞLARININ REGISTRY KAYITLARI (6 BRANŞ) ---');
  for (const sub of grade8Subjects) {
    const isRegistered = isSubjectPromptRegistered(8, sub);
    assert(
      isRegistered,
      `Registry Varlık: 8. Sınıf ${sub}`,
      `8_${sub} anahtarı promptRegistry içinde mevcuttur.`
    );

    const isCustom = isCustomSubjectPromptRegistered(8, sub);
    assert(
      isCustom,
      `Özel Kütük Bayrağı: 8. Sınıf ${sub}`,
      `isCustomSubjectPromptRegistered(8, '${sub}') true döndürmektedir (generic'e düşmez).`
    );

    const entry = getRegisteredPrompt(8, sub);
    assert(
      typeof entry.directives === 'string' && entry.directives.trim().length > 300,
      `MEBİ Direktif Bütünlüğü: 8. Sınıf ${sub}`,
      `Direktif uzunluğu: ${entry.directives.length} karakter. MEBİ ölçme ilkelerini eksiksiz içerir.`
    );

    assert(
      entry.supportsAlternativeAnswers === true,
      `Alternatif Cevap Bayrağı: 8. Sınıf ${sub}`,
      `supportsAlternativeAnswers=true olarak kayıtlıdır.`
    );
  }

  // 2. 8. sınıf direktiflerinin buildLiveExamPrompt çıktısında yer alması
  console.log('\n--- BÖLÜM 2: buildLiveExamPrompt DİREKTİF ENJEKSİYONU ---');
  for (const sub of grade8Subjects) {
    const scenarios = getScenarios(sub, 8);
    const sc = scenarios[0];
    const targetCount = sc.distributions.reduce((sum, d) => sum + d.questionCount, 0);
    const outcomeCodes = sc.distributions.map(d => d.outcomeCode);
    const distributionsText = sc.distributions.map((d, i) => {
      const officialTitle = getOfficialOutcomeTitle(d.outcomeCode);
      return `Soru ${i + 1}: [Kazanım Kodu: ${d.outcomeCode}] [Resmi Öğrenme Çıktısı: ${officialTitle || d.notes}] [Bilişsel Düzey: ${d.cognitiveLevel}]`;
    }).join('\n');

    const prompt = buildLiveExamPrompt({
      grade: 8,
      subjectId: sub,
      targetCount,
      distributionsText,
      avoidDirectives: '',
      difficultyPlanText: 'Dengeli Zorluk',
      outcomeCodes
    });

    const regEntry = getRegisteredPrompt(8, sub);
    // Direktifin ilk 50 karakterlik imzasını kontrol et
    const signature = regEntry.directives.trim().slice(0, 40);
    const hasDirectives = prompt.includes(signature);

    assert(
      hasDirectives,
      `Prompt Enjeksiyonu: 8. Sınıf ${sub}`,
      `buildLiveExamPrompt çıktısı branşa ait MEBİ direktiflerini içeriyor (${prompt.length} karakter, imza: "${signature.slice(0, 30)}...")`
    );

    // Bütçe kontrolü (16.500 karakter sınırı)
    assert(
      prompt.length <= 16500,
      `Prompt Bütçe Tavanı: 8. Sınıf ${sub}`,
      `Prompt uzunluğu (${prompt.length} karakter) 16.500 karakterlik bütçe tavanının altındadır.`
    );
  }

  // 3. Türkçe ve İngilizce alternatif cevap desteği doğrulaması
  console.log('\n--- BÖLÜM 3: ALTERNATİF CEVAP DESTEĞİ DOĞRULAMASI ---');
  const turkishPrompt = buildLiveExamPrompt({
    grade: 8,
    subjectId: 'turkce',
    targetCount: 6,
    distributionsText: 'Soru 1: [Kazanım Kodu: T.8.3.14]',
    avoidDirectives: '',
    difficultyPlanText: 'Orta',
    outcomeCodes: ['T.8.3.14']
  });

  assert(
    turkishPrompt.includes('"alternativeAnswers"'),
    'Türkçe 8. Sınıf Alternatif Cevap JSON Şeması',
    'JSON çıktı şemasında alternativeAnswers dizisi tanımlıdır.'
  );

  const englishPrompt = buildLiveExamPrompt({
    grade: 8,
    subjectId: 'ingilizce',
    targetCount: 4,
    distributionsText: 'Soru 1: [Kazanım Kodu: E8.1.R1]',
    avoidDirectives: '',
    difficultyPlanText: 'Basit',
    outcomeCodes: ['E8.1.R1']
  });

  assert(
    englishPrompt.includes('"alternativeAnswers"'),
    'İngilizce 8. Sınıf Alternatif Cevap JSON Şeması',
    'JSON çıktı şemasında alternativeAnswers dizisi tanımlıdır.'
  );

  // 4. İngilizce senaryo kazanımlarının üretim promptuna aktarılması
  console.log('\n--- BÖLÜM 4: İNGİLİZCE KAZANIMLARININ PROMPTA AKTARILMASI ---');
  const engScenarios = getScenarios('ingilizce', 8);
  const engSc1 = engScenarios[0];
  const engDistText = engSc1.distributions.map((d, i) => {
    const title = getOfficialOutcomeTitle(d.outcomeCode);
    return `Soru ${i + 1}: [Kazanım Kodu: ${d.outcomeCode}] [Resmi Öğrenme Çıktısı: ${title || d.notes}]`;
  }).join('\n');

  const engPromptOutput = buildLiveExamPrompt({
    grade: 8,
    subjectId: 'ingilizce',
    targetCount: engSc1.distributions.reduce((sum, d) => sum + d.questionCount, 0),
    distributionsText: engDistText,
    avoidDirectives: '',
    difficultyPlanText: '3 Kolay, 1 Orta',
    outcomeCodes: engSc1.distributions.map(d => d.outcomeCode)
  });

  assert(
    engPromptOutput.includes('E8.1.R1') && engPromptOutput.includes('E8.1.W1') && engPromptOutput.includes('E8.2.R1'),
    'İngilizce Senaryo 1 Kazanımları Prompt İçi Varlığı',
    'E8.1.R1 (Friendship), E8.1.W1 (Letter of Apology) ve E8.2.R1 (Teen Life) prompt metnine eksiksiz aktarıldı.'
  );

  // 5. 5, 6 ve 7. sınıfların mevcut prompt yönlendirmelerinin bozulmaması (Regresyon Denetimi)
  console.log('\n--- BÖLÜM 5: 5, 6 VE 7. SINIF REGRESYON DENETİMİ ---');
  // 7. Sınıf Türkçe MEBİ direktifi korundu mu?
  const g7Prompt = buildLiveExamPrompt({
    grade: 7,
    subjectId: 'turkce',
    targetCount: 6,
    distributionsText: 'Soru 1: [Kazanım Kodu: T.O.7.4]',
    avoidDirectives: '',
    difficultyPlanText: 'Orta',
    outcomeCodes: ['T.O.7.4']
  });

  assert(
    g7Prompt.includes('MEBİ 7. SINIF TÜRKÇE DERS KİTABI'),
    '7. Sınıf Türkçe MEBİ Direktif Koruması',
    '7. sınıf prompt direktifleri kesinlikle etkilenmedi ve yerinde korunuyor.'
  );

  // 5. Sınıf Türkçe Ders Kitabı entegrasyonu korundu mu?
  const g5Prompt = buildLiveExamPrompt({
    grade: 5,
    subjectId: 'turkce',
    targetCount: 6,
    distributionsText: 'Soru 1: [Kazanım Kodu: T.O.5.1]',
    avoidDirectives: '',
    difficultyPlanText: 'Kolay',
    outcomeCodes: ['T.O.5.1']
  });

  assert(
    g5Prompt.includes('5. SINIF') && !g5Prompt.includes('MEBİ 8. SINIF'),
    '5. Sınıf İzolasyon Koruması',
    '5. sınıf promptuna 8. sınıf direktifleri kesinlikle sızmıyor.'
  );

  // 6. Sınıf Matematik izolasyonu korundu mu?
  const g6Prompt = buildLiveExamPrompt({
    grade: 6,
    subjectId: 'matematik',
    targetCount: 6,
    distributionsText: 'Soru 1: [Kazanım Kodu: MAT.6.1.1]',
    avoidDirectives: '',
    difficultyPlanText: 'Orta',
    outcomeCodes: ['MAT.6.1.1']
  });

  assert(
    g6Prompt.includes('6. SINIF') && !g6Prompt.includes('MEBİ 8. SINIF'),
    '6. Sınıf İzolasyon Koruması',
    '6. sınıf promptuna 8. sınıf direktifleri kesinlikle sızmıyor.'
  );

  // 6. 8. Sınıf Arayüz Etiket Koruması
  console.log('\n--- BÖLÜM 6: 8. SINIF ARAYÜZ VE ETİKET KONTROLÜ ---');
  const grade8Meta = ALL_GRADES.find(g => g.level === 8);
  assert(
    grade8Meta?.tymmRollout === 'Okul Yazılılarına Hazırlık',
    '8. Sınıf tymmRollout Etiketi',
    `ALL_GRADES içindeki tymmRollout değeri: "${grade8Meta?.tymmRollout}" (LGS ibaresinden arındırıldı).`
  );

  console.log('====================================================');
  console.log(`TOPLAM TEST: ${passCount + failCount}`);
  console.log(`BAŞARILI   : ${passCount}`);
  console.log(`BAŞARISIZ  : ${failCount}`);
  console.log('====================================================\n');

  if (failCount > 0) {
    console.error('8. Sınıf MEBİ entegrasyon testleri başarısız oldu!');
    process.exit(1);
  }
}

runGrade8IntegrationTests().catch(err => {
  console.error('Test çalıştırma hatası:', err);
  process.exit(1);
});

