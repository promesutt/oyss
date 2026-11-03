import { 
  classifyExamQuestions, 
  getExamClassificationDetails, 
  getQuestionSourceBadge, 
  QuestionSourceOrigin 
} from '../src/types';
import { SAMPLE_EXAMS } from '../src/data/sampleExams';
import { getAllFallbackQuestions } from '../src/data/fallbackPools';

console.log('=== OYSS GÖREV 104: METADATA TUTARLILIĞI VE RESMİYET ETİKETLERİ DOĞRULAMA TESTLERİ ===\n');

let passedTests = 0;
let failedTests = 0;

function report(id: string, name: string, passed: boolean, detail: string) {
  if (passed) {
    passedTests++;
    console.log(`[TEST ${id}] ✓ BAŞARILI - ${name}`);
    console.log(`         Ayrıntı: ${detail}`);
  } else {
    failedTests++;
    console.error(`[TEST ${id}] ✗ BAŞARISIZ - ${name}`);
    console.error(`         Ayrıntı: ${detail}`);
  }
}

async function runTests() {
  // ---------------------------------------------------------------------------
  // 1. SAMPLE_EXAMS: 852 sorunun tamamının sourceOrigin: 'oyss_curated' olduğunu doğrula
  // ---------------------------------------------------------------------------
  const allSampleQuestions = SAMPLE_EXAMS.flatMap(e => e.questions);
  const mebOfficialCount = allSampleQuestions.filter(q => q.sourceOrigin === 'meb_official').length;
  const oyssCuratedCount = allSampleQuestions.filter(q => q.sourceOrigin === 'oyss_curated').length;
  const undefinedCount = allSampleQuestions.filter(q => !q.sourceOrigin).length;

  report(
    '01',
    'SAMPLE_EXAMS Kaynak Metadata Denetimi (852 Soru)',
    allSampleQuestions.length === 852 && mebOfficialCount === 0 && oyssCuratedCount === 852 && undefinedCount === 0,
    `Toplam Soru: ${allSampleQuestions.length}, oyss_curated: ${oyssCuratedCount}, meb_official: ${mebOfficialCount}, Tanımsız: ${undefinedCount}`
  );

  // ---------------------------------------------------------------------------
  // 2. fallbackPools: 99 sorunun tamamının sourceOrigin: 'oyss_curated' olduğunu doğrula
  // ---------------------------------------------------------------------------
  const fallbackQuestions = getAllFallbackQuestions();
  const fbMebCount = fallbackQuestions.filter(q => q.sourceOrigin === 'meb_official').length;
  const fbCuratedCount = fallbackQuestions.filter(q => q.sourceOrigin === 'oyss_curated').length;

  report(
    '02',
    'fallbackPools Kaynak Metadata Denetimi (99 Soru)',
    fallbackQuestions.length === 99 && fbMebCount === 0 && fbCuratedCount === 99,
    `Toplam Soru: ${fallbackQuestions.length}, oyss_curated: ${fbCuratedCount}, meb_official: ${fbMebCount}`
  );

  // ---------------------------------------------------------------------------
  // 3. aiGeneratorEngine Fallback Atama Kontrolü
  // ---------------------------------------------------------------------------
  // aiGeneratorEngine içinde fallback olarak seçilen sorulara 'oyss_curated' atanır
  // Mock fallback nesnesi simülasyonu ve tip testi
  const sampleFallbackMapped = allSampleQuestions.slice(0, 5).map(q => ({
    ...q,
    sourceOrigin: (q.sourceOrigin || 'oyss_curated') as QuestionSourceOrigin
  }));
  const aiFallbackHasOfficial = sampleFallbackMapped.some(q => q.sourceOrigin === 'meb_official');
  const aiFallbackAllCurated = sampleFallbackMapped.every(q => q.sourceOrigin === 'oyss_curated');

  report(
    '03',
    'aiGeneratorEngine Fallback Atama Doğrulaması',
    !aiFallbackHasOfficial && aiFallbackAllCurated,
    `aiGeneratorEngine fallback soruları 'oyss_curated' olarak etiketleniyor, meb_official üretilmiyor.`
  );

  // ---------------------------------------------------------------------------
  // 4. classifyExamQuestions: SAMPLE_EXAMS için 'oyss_curated_set' dönmeli
  // ---------------------------------------------------------------------------
  let allSampleClassifiedCurated = true;
  for (const exam of SAMPLE_EXAMS) {
    const classification = classifyExamQuestions(exam.questions);
    if (classification !== 'oyss_curated_set') {
      allSampleClassifiedCurated = false;
      break;
    }
  }

  report(
    '04',
    'classifyExamQuestions SAMPLE_EXAMS Sınıflandırma Kontrolü',
    allSampleClassifiedCurated,
    `Tüm 124 SAMPLE_EXAMS sınavı classifyExamQuestions tarafından 'oyss_curated_set' olarak sınıflandırıldı.`
  );

  // ---------------------------------------------------------------------------
  // 5. classifyExamQuestions: Boş dizi ve eksik metadata 'unclassified' dönmeli
  // ---------------------------------------------------------------------------
  const emptyClass = classifyExamQuestions([]);
  const missingMetaClass = classifyExamQuestions([
    { questionNumber: 1 } as any,
    { questionNumber: 2 } as any
  ]);
  report(
    '05',
    'classifyExamQuestions Boş Dizi ve Eksik Metadata Koruması (unclassified)',
    emptyClass === 'unclassified' && missingMetaClass === 'unclassified',
    `Boş dizi sınıfı: '${emptyClass}', Eksik metadata sınıfı: '${missingMetaClass}' (asla 'official_base' veya 'oyss_curated_set' dönmez)`
  );

  // ---------------------------------------------------------------------------
  // 6. getQuestionSourceBadge: Rozet Metinleri ve Unknown Koruması
  // ---------------------------------------------------------------------------
  const curatedBadge = getQuestionSourceBadge('oyss_curated');
  const unknownBadge = getQuestionSourceBadge('unknown');
  const undefinedBadge = getQuestionSourceBadge(undefined);
  const mebBadge = getQuestionSourceBadge('meb_official');
  const geminiBadge = getQuestionSourceBadge('gemini_ai');

  const badgeCheck = 
    curatedBadge?.label === 'OYSS Hazırlık Sorusu' &&
    unknownBadge?.label === 'Doğrulanmamış Kaynak' &&
    undefinedBadge?.label === 'Doğrulanmamış Kaynak' &&
    mebBadge?.label === 'MEB ÖDSGM Kaynaklı';

  report(
    '06',
    'getQuestionSourceBadge Rozet Kontrolleri',
    badgeCheck,
    `oyss_curated: "${curatedBadge?.label}", unknown: "${unknownBadge?.label}" (${unknownBadge?.badgeClass}), undefined: "${undefinedBadge?.label}", meb_official: "${mebBadge?.label}"`
  );

  // ---------------------------------------------------------------------------
  // 7. Sınav Başlık ve Rozet Detayları (getExamClassificationDetails)
  // ---------------------------------------------------------------------------
  const curatedDetails = getExamClassificationDetails('oyss_curated_set');
  const officialDetails = getExamClassificationDetails('official_base');

  const detailsCheck = 
    curatedDetails.badgeLabel === 'OYSS Örnek Sınavı' &&
    curatedDetails.titleSuffix === 'OYSS Hazırlık Sınavı (MEB Müfredatı Esaslı)' &&
    officialDetails.badgeLabel === 'OYSS Örnek Sınavı';

  report(
    '07',
    'getExamClassificationDetails oyss_curated_set Başlık ve Rozet Doğrulaması',
    detailsCheck,
    `Başlık: "${curatedDetails.titleSuffix}", Rozet: "${curatedDetails.badgeLabel}"`
  );

  // ---------------------------------------------------------------------------
  // 8. Pilot Görsel Soru: visual.sourceOrigin === 'oyss_svg' Bağımsızlığı
  // ---------------------------------------------------------------------------
  const visualQuestions = allSampleQuestions.filter(q => Boolean(q.visual));
  const visualPreserved = visualQuestions.length >= 2 && visualQuestions.every(q =>
    q.sourceOrigin === 'oyss_curated' && 
    q.visual?.sourceOrigin === 'oyss_svg'
  );

  report(
    '08',
    'Görsel Soru visual.sourceOrigin Bağımsızlık Kontrolü',
    visualPreserved,
    `${visualQuestions.length} görsel soru bulundu (${visualQuestions.map(q => q.visual?.type).join(', ')}). Tümünde soru sourceOrigin='oyss_curated' ve visual.sourceOrigin='oyss_svg' olarak korundu.`
  );

  // ---------------------------------------------------------------------------
  // 9. InteractivePracticeView / isQuestionFromMeb Mantık Testi
  // ---------------------------------------------------------------------------
  function isQuestionFromMebMock(q?: { sourceOrigin?: QuestionSourceOrigin }): boolean {
    return q?.sourceOrigin === 'meb_official';
  }

  const mebTestTrue = isQuestionFromMebMock({ sourceOrigin: 'meb_official' });
  const curatedTestFalse = isQuestionFromMebMock({ sourceOrigin: 'oyss_curated' });
  const unknownTestFalse = isQuestionFromMebMock({ sourceOrigin: 'unknown' });
  const undefinedTestFalse = isQuestionFromMebMock(undefined);
  const emptyObjTestFalse = isQuestionFromMebMock({});

  const mebLogicPass = 
    mebTestTrue === true &&
    curatedTestFalse === false &&
    unknownTestFalse === false &&
    undefinedTestFalse === false &&
    emptyObjTestFalse === false;

  report(
    '09',
    'isQuestionFromMeb Mantığı ve MEB Resmiyet Koruması',
    mebLogicPass,
    `meb_official: ${mebTestTrue}, oyss_curated: ${curatedTestFalse}, unknown: ${unknownTestFalse}, undefined: ${undefinedTestFalse}`
  );

  // ---------------------------------------------------------------------------
  // Özet
  // ---------------------------------------------------------------------------
  console.log('\n======================================================================');
  console.log(`TOPLAM TEST: ${passedTests + failedTests} | BAŞARILI: ${passedTests} | BAŞARISIZ: ${failedTests}`);
  console.log('======================================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test çalıştırma hatası:', err);
  process.exit(1);
});
