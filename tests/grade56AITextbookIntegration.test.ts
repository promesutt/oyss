import { buildGrade56TextbookDirectives } from '../src/generators/prompts/grade56TextbookPrompt';
import { buildLiveExamPrompt } from '../src/generators/prompts';
import { OUTCOME_STUDY_BANK } from '../src/data/outcomeStudyBank';
import { MIDDLE_SCHOOL_OFFICIAL_SCENARIOS } from '../src/data/curriculumData';
import { generateMEBIQuestions } from '../src/utils/aiGeneratorEngine';
import { GradeLevel, SubjectId } from '../src/types';

console.log('=== OYSS FAZ 3.2.2: 5. VE 6. SINIF YAPAY ZEKÂ DERS KİTABI ENTEGRASYON TESTLERİ BAŞLIYOR ===\n');

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

async function runTests() {
  // =========================================================================
  // TEST 01: buildGrade56TextbookDirectives Kapsam ve İzolasyon Denetimi (G7-G8 Etkilenmeme)
  // =========================================================================
  const g7Directives = buildGrade56TextbookDirectives(7, 'matematik', ['MAT.7.1.1']);
  const g8Directives = buildGrade56TextbookDirectives(8, 'turkce', ['T.8.3.5']);
  const emptyCodesDirectives = buildGrade56TextbookDirectives(5, 'matematik', []);

  assert(
    g7Directives === '' && g8Directives === '' && emptyCodesDirectives === '',
    'buildGrade56TextbookDirectives fonksiyonu yalnızca 5 ve 6. sınıflara uygulanır; 7 ve 8. sınıflara kesinlikle müdahale etmez',
    `G7 Sonuç: "${g7Directives}", G8 Sonuç: "${g8Directives}", Boş Kod Sonuç: "${emptyCodesDirectives}"`
  );

  // =========================================================================
  // TEST 02: 5. ve 6. Sınıf Kazanımlarında Ders Kitabı Alanlarının Eksiksiz Aktarımı
  // =========================================================================
  // 5. Sınıf Matematik: MAT.5.3.1 (Geometrik Şekiller)
  const mat531Directives = buildGrade56TextbookDirectives(5, 'matematik', ['MAT.5.3.1']);
  const hasMatBook = mat531Directives.includes('DERS_KITABI_MATEMATIK_1.pdf');
  const hasMatPages = mat531Directives.includes('14-25');
  const hasMatEvidence = mat531Directives.includes('Seviye D');
  const hasMatExamples = mat531Directives.includes('Cetvel, lazer ışını ve tren rayları');
  const hasMatNotes = mat531Directives.includes('Doğru') && mat531Directives.includes('Işın');
  const hasMatTrap = mat531Directives.includes('PÜF NOKTA: Doğru ve ışının boyu cetvelle ölçülemez');

  // 6. Sınıf Fen: FB.6.1.1 (Güneş Sistemi)
  const fb611Directives = buildGrade56TextbookDirectives(6, 'fen_bilimleri', ['FB.6.1.1']);
  const hasFbBook = fb611Directives.includes('DERS_KITABI_FEN_BILIMLERI_1.pdf');
  const hasFbPages = fb611Directives.includes('18-29');
  const hasFbEvidence = fb611Directives.includes('Seviye D');
  const hasFbExamples = fb611Directives.includes("Güneş Sistemi'ndeki Gezegenlerin Sıralanışı") || fb611Directives.includes('Gezegen');

  assert(
    hasMatBook && hasMatPages && hasMatEvidence && hasMatExamples && hasMatNotes && hasMatTrap && hasFbBook && hasFbPages && hasFbEvidence && hasFbExamples,
    '5 ve 6. sınıf kazanımlarının ders kitabı referansları, sayfa aralıkları, kanıt seviyesi, örnekleri ve kavram notları prompt direktifine eksiksiz aktarılır',
    `MAT.5.3.1: Kitap=${hasMatBook}, Sayfa=${hasMatPages}, Kanıt=${hasMatEvidence}, Örnek=${hasMatExamples}, Not=${hasMatNotes}, Tuzak=${hasMatTrap} | FB.6.1.1: Kitap=${hasFbBook}, Sayfa=${hasFbPages}, Kanıt=${hasFbEvidence}`
  );

  // =========================================================================
  // TEST 03: Halüsinasyon Önleme ve Zorunlu Ders Kitabı İlkelerinin Varlığı
  // =========================================================================
  const hasHallucinationBan = mat531Directives.includes('KESİN HALÜSİNASYON VE UYDURMA YASAĞI') &&
    mat531Directives.includes('KESİNLİKLE YAZILAMAZ');
  const hasPrimarySourceRule = mat531Directives.includes('DERS KİTABI İÇERİĞİ TEMEL KAYNAKTIR');
  const hasAlignmentRule = mat531Directives.includes('SEÇİLEN KAZANIMLA %100 UYUM');
  const hasMissingSourceRule = mat531Directives.includes('KAYNAK YETERSİZLİĞİ BİLDİRİMİ');
  const hasFormatPreservation = mat531Directives.includes('MEB SENARYO, PUANLAMA VE FORMAT BÜTÜNLÜĞÜ');

  assert(
    hasHallucinationBan && hasPrimarySourceRule && hasAlignmentRule && hasMissingSourceRule && hasFormatPreservation,
    'Yapay zekâya yönelik 5 temel ilke (Kazanım Uyumu, Temel Kaynak İlkesi, Halüsinasyon Yasağı, Kaynak Yetersizliği Bildirimi, Format/Puan Bütünlüğü) direktifte yer alır',
    `Halüsinasyon Yasağı: ${hasHallucinationBan}, Temel Kaynak: ${hasPrimarySourceRule}, Kazanım Uyumu: ${hasAlignmentRule}, Yetersizlik Bildirimi: ${hasMissingSourceRule}, Format/Puan: ${hasFormatPreservation}`
  );

  // =========================================================================
  // TEST 04: Tekrarlı Kazanımlarda Deduplication ve Token Tasarrufu Doğrulaması
  // =========================================================================
  // Senaryoda T.O.5.6 kazanımı 3 kez tekrarlandığında direktif bloğunda yalnızca 1 kez listelenmelidir.
  const repeatedOutcomeCodes = ['T.O.5.6', 'T.O.5.6', 'T.O.5.6', 'T.O.5.7'];
  const deduplicatedDirectives = buildGrade56TextbookDirectives(5, 'turkce', repeatedOutcomeCodes);
  const to56Occurrences = (deduplicatedDirectives.match(/Kazanım: \[T\.O\.5\.6\]/g) || []).length;
  const to57Occurrences = (deduplicatedDirectives.match(/Kazanım: \[T\.O\.5\.7\]/g) || []).length;

  assert(
    to56Occurrences === 1 && to57Occurrences === 1,
    'Aynı sınav senaryosunda birden fazla soruda yer alan mükerrer kazanımlar tekilleştirilir (deduplication) ve gereksiz token tüketimi engellenir',
    `Tekrarlı giriş: 3 adet T.O.5.6, Direktifteki varlık: ${to56Occurrences} adet; T.O.5.7: ${to57Occurrences} adet.`
  );

  // =========================================================================
  // TEST 05: buildLiveExamPrompt Entegrasyonu ve Geriye Dönük Uyumluluk
  // =========================================================================
  // 1. outcomeCodes verildiğinde 5. sınıf promptuna direktifler eklenir
  const promptWithOutcomes = buildLiveExamPrompt({
    grade: 5,
    subjectId: 'matematik',
    targetCount: 6,
    distributionsText: 'Soru 1: [Kazanım Kodu: MAT.5.3.1]',
    avoidDirectives: '',
    difficultyPlanText: 'Orta',
    outcomeCodes: ['MAT.5.3.1']
  });

  const includesTextbookHeader = promptWithOutcomes.includes('FAZ 3.2.2') &&
    promptWithOutcomes.includes('DERS_KITABI_MATEMATIK_1.pdf');

  // 2. outcomeCodes verilmediğinde (legacy çağrı) eski generic davranış korunur
  const promptLegacy = buildLiveExamPrompt({
    grade: 5,
    subjectId: 'matematik',
    targetCount: 6,
    distributionsText: 'Soru 1: [Kazanım Kodu: MAT.5.3.1]',
    avoidDirectives: '',
    difficultyPlanText: 'Orta'
  });

  const legacyDoesNotInclude = !promptLegacy.includes('FAZ 3.2.2') &&
    !promptLegacy.includes('DERS_KITABI_MATEMATIK_1.pdf');

  assert(
    includesTextbookHeader && legacyDoesNotInclude,
    'buildLiveExamPrompt outcomeCodes verildiğinde ders kitabı direktiflerini ekler; legacy çağrıda %100 generic uyumluluğu korur',
    `Entegre promptta ders kitabı mevcut: ${includesTextbookHeader}, Legacy promptta generic temiz: ${legacyDoesNotInclude}`
  );

  // =========================================================================
  // TEST 06: generateMEBIQuestions Uçtan Uca Prompt Akışı ve Gerçek Senaryo Teyidi
  // =========================================================================
  let capturedPrompt = '';
  const originalFetch = (globalThis as any).fetch;
  (globalThis as any).fetch = async (url: string, init: any) => {
    if (url === '/api/generate') {
      const body = JSON.parse(init.body);
      capturedPrompt = body.prompt;
      return {
        ok: true,
        json: async () => ({
          questions: [
            {
              number: 1,
              outcome: 'T.O.5.6',
              outcomeTitle: 'Metnin yüzey anlamını belirleyebilme',
              difficulty: 'Orta',
              level: 'Basit Bilişsel Süreçler',
              templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
              points: 20,
              stimulus: 'Ders kitabında geçen Hasan Dede fener öyküsü...',
              question: 'Metnin konusunu açıklayınız.',
              answer: 'Metnin konusu deniz feneri bekçisinin fedakarlığıdır.',
              rubric: [{ item: 'Konu tespiti', pts: 20 }]
            }
          ]
        })
      };
    }
    return { ok: false, status: 404, json: async () => ({}) };
  };

  try {
    const scenario5Turkce = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[5]?.turkce?.[0];
    if (!scenario5Turkce) throw new Error('5. Sınıf Türkçe Senaryo 1 bulunamadı');

    capturedPrompt = '';
    const genResult = await generateMEBIQuestions('turkce', 5, scenario5Turkce, 0);

    const promptHasMebiDirectives = capturedPrompt.includes('FAZ 3.2.2') &&
      capturedPrompt.includes('DERS_KITABI_TURKCE_1.pdf') &&
      capturedPrompt.includes('OYUN DÜNYASI');

    const promptHasHalusinationBan = capturedPrompt.includes('KESİN HALÜSİNASYON VE UYDURMA YASAĞI');

    assert(
      promptHasMebiDirectives && promptHasHalusinationBan && genResult.generatedQuestions.length > 0,
      'generateMEBIQuestions motoru 5. Sınıf Türkçe resmi senaryosu için Gemini API promptuna ders kitabı referanslarını ve halüsinasyon yasağını başarıyla enjekte eder',
      `Prompt uzunluğu: ${capturedPrompt.length} karakter, Ders kitabı dosyası mevcut: true, Halüsinasyon yasağı mevcut: true, Üretilen soru sayısı: ${genResult.generatedQuestions.length}`
    );
  } finally {
    (globalThis as any).fetch = originalFetch;
  }

  // =========================================================================
  // TEST 07: 5. ve 6. Sınıf Tüm 65 Kazanımın Prompt Direktif Üretim Stres Testi
  // =========================================================================
  const GRADE_5_OUTCOMES = [
    'T.O.5.6', 'T.O.5.7', 'T.O.5.20', 'T.Y.5.13', 'T.Y.5.16', 'T.O.5.5', 'T.O.5.15', 'T.Y.5.3',
    'MAT.5.3.1', 'MAT.5.3.2', 'MAT.5.3.3', 'MAT.5.3.4', 'MAT.5.3.5', 'MAT.5.3.6', 'MAT.5.3.7',
    'FB.5.1.2', 'FB.5.1.3', 'FB.5.1.4', 'FB.5.2.1',
    'SB.5.1.1', 'SB.5.1.2', 'SB.5.1.3', 'SB.5.2.1',
    'DKAB.5.1.1', 'DKAB.5.1.2', 'DKAB.5.1.3', 'DKAB.5.1.4', 'DKAB.5.2.1',
    'ENG.5.1.R2', 'ENG.5.1.R3', 'ENG.5.1.V1', 'ENG.5.1.G1', 'ENG.5.1.W3', 'ENG.5.1.W4'
  ];

  const GRADE_6_OUTCOMES = [
    'T.O.6.5', 'T.O.6.6', 'T.O.6.21', 'T.Y.6.18', 'T.Y.6.21', 'T.O.6.16', 'T.Y.6.3',
    'MAT.6.1.1', 'MAT.6.1.2', 'MAT.6.1.3', 'MAT.6.1.4',
    'FB.6.1.1', 'FB.6.1.3', 'FB.6.2.1', 'FB.6.2.2', 'FB.6.2.3', 'FB.6.3.1',
    'SB.6.1.1', 'SB.6.1.2', 'SB.6.1.3', 'SB.6.2.1',
    'DKAB.6.1.2', 'DKAB.6.1.3', 'DKAB.6.1.4', 'DKAB.6.2.1',
    'ENG.6.1.R2', 'ENG.6.1.R3', 'ENG.6.1.V1', 'ENG.6.1.G1', 'ENG.6.1.W3', 'ENG.6.1.W4'
  ];

  let stressPassCount = 0;
  for (const code of GRADE_5_OUTCOMES) {
    const dir = buildGrade56TextbookDirectives(5, 'matematik', [code]);
    if (dir.includes(code) && dir.includes('Ders Kitabı Kaynağı')) {
      stressPassCount++;
    }
  }

  for (const code of GRADE_6_OUTCOMES) {
    const dir = buildGrade56TextbookDirectives(6, 'matematik', [code]);
    if (dir.includes(code) && dir.includes('Ders Kitabı Kaynağı')) {
      stressPassCount++;
    }
  }

  assert(
    stressPassCount === 65,
    '5. ve 6. sınıfa ait tüm 65 kazanım kartının her biri için buildGrade56TextbookDirectives eksiksiz ve hatasız direktif üretir',
    `Doğrulanan Kazanım: ${stressPassCount} / 65`
  );

  // =========================================================================
  // SONUÇ BİLDİRİMİ
  // =========================================================================
  console.log('====================================================');
  console.log(`TOPLAM TEST: ${passCount + failCount}`);
  console.log(`BAŞARILI   : ${passCount}`);
  console.log(`BAŞARISIZ  : ${failCount}`);
  console.log('====================================================\n');

  if (failCount > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test yürütme hatası:', err);
  process.exit(1);
});
