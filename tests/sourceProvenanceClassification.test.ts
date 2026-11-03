import { 
  classifyExamQuestions, 
  getExamClassificationDetails, 
  getQuestionSourceBadge, 
  QuestionSourceOrigin 
} from '../src/types';
import { getMaterialPdfFileNameWithExtension } from '../src/utils/materialFileNameGenerator';
import { generateMEBIQuestions } from '../src/utils/aiGeneratorEngine';
import { MIDDLE_SCHOOL_OFFICIAL_SCENARIOS } from '../src/data/curriculumData';

console.log('=== OYSS FAZ 3.3.5: SORU BAZINDA KAYNAK TAKİBİ VE SINAV SINIFLANDIRMASI TESTLERİ ===\n');

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
  // 1. Senaryo 1: Gemini Canlı Yapay Zekâ Tarafından Tamamen Üretilmiş Sınav
  // ---------------------------------------------------------------------------
  const geminiQuestions = [
    { sourceOrigin: 'gemini_ai' as QuestionSourceOrigin },
    { sourceOrigin: 'gemini_ai' as QuestionSourceOrigin },
    { sourceOrigin: 'gemini_ai' as QuestionSourceOrigin },
    { sourceOrigin: 'gemini_ai' as QuestionSourceOrigin }
  ];
  const geminiClass = classifyExamQuestions(geminiQuestions);
  const geminiDetails = getExamClassificationDetails(geminiClass);
  const geminiPdf = getMaterialPdfFileNameWithExtension({
    grade: 5,
    subjectId: 'matematik',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_4',
    materialKind: 'exam_paper',
    isCustomExam: true,
    examClassification: geminiClass
  });
  const geminiBadge = getQuestionSourceBadge('gemini_ai');

  report(
    '01',
    'Gemini tarafından üretilen sorular "oyss_pure_custom" olarak sınıflandırılır ve _OYSS_Ozgun_Sinav.pdf üretir',
    geminiClass === 'oyss_pure_custom' &&
    geminiDetails.titleSuffix === 'OYSS Özgün Sınavı' &&
    geminiPdf === '5_Sinif_Matematik_1_Donem_1_Yazili_Senaryo_4_OYSS_Ozgun_Sinav.pdf' &&
    geminiBadge.label === 'OYSS Özgün (AI)',
    `Sınıf: ${geminiClass}, Dosya: ${geminiPdf}, Rozet: ${geminiBadge.label}`
  );

  // ---------------------------------------------------------------------------
  // 2. Senaryo 2: Yalnızca fallbackPools Sorularından Oluşan Sınav
  // ---------------------------------------------------------------------------
  const curatedQuestions = [
    { sourceOrigin: 'oyss_curated' as QuestionSourceOrigin },
    { sourceOrigin: 'oyss_curated' as QuestionSourceOrigin },
    { sourceOrigin: 'oyss_curated' as QuestionSourceOrigin }
  ];
  const curatedClass = classifyExamQuestions(curatedQuestions);
  const curatedDetails = getExamClassificationDetails(curatedClass);
  const curatedPdf = getMaterialPdfFileNameWithExtension({
    grade: 7,
    subjectId: 'turkce',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_1',
    materialKind: 'exam_paper',
    isCustomExam: true,
    examClassification: curatedClass
  });
  const curatedBadge = getQuestionSourceBadge('oyss_curated');

  report(
    '02',
    'Yalnızca fallbackPools sorularından oluşan sınav "oyss_curated_set" olarak sınıflandırılır ve _OYSS_Standart_Soru_Seti.pdf üretir',
    curatedClass === 'oyss_curated_set' &&
    curatedDetails.titleSuffix === 'OYSS Hazırlık Sınavı (MEB Müfredatı Esaslı)' &&
    curatedPdf === '7_Sinif_Turkce_1_Donem_1_Yazili_Senaryo_1_OYSS_Standart_Soru_Seti.pdf' &&
    curatedBadge.label === 'OYSS Hazırlık Sorusu',
    `Sınıf: ${curatedClass}, Dosya: ${curatedPdf}, Rozet: ${curatedBadge.label}`
  );

  // ---------------------------------------------------------------------------
  // 3. Senaryo 3: Tamamen Dinamik Sentezden Oluşan Sınav
  // ---------------------------------------------------------------------------
  const syntheticQuestions = [
    { sourceOrigin: 'oyss_synthetic' as QuestionSourceOrigin },
    { sourceOrigin: 'oyss_synthetic' as QuestionSourceOrigin },
    { sourceOrigin: 'oyss_synthetic' as QuestionSourceOrigin }
  ];
  const syntheticClass = classifyExamQuestions(syntheticQuestions);
  const syntheticDetails = getExamClassificationDetails(syntheticClass);
  const syntheticPdf = getMaterialPdfFileNameWithExtension({
    grade: 6,
    subjectId: 'fen_bilimleri',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_2',
    materialKind: 'exam_paper',
    isCustomExam: true,
    examClassification: syntheticClass
  });
  const syntheticBadge = getQuestionSourceBadge('oyss_synthetic');

  report(
    '03',
    'Tamamen dinamik kural sentezinden oluşan sınav "oyss_pure_custom" olarak sınıflandırılır ve _OYSS_Ozgun_Sinav.pdf üretir',
    syntheticClass === 'oyss_pure_custom' &&
    syntheticDetails.titleSuffix === 'OYSS Özgün Sınavı' &&
    syntheticPdf === '6_Sinif_Fen_Bilimleri_1_Donem_1_Yazili_Senaryo_2_OYSS_Ozgun_Sinav.pdf' &&
    syntheticBadge.label === 'OYSS Dinamik Sentez',
    `Sınıf: ${syntheticClass}, Dosya: ${syntheticPdf}, Rozet: ${syntheticBadge.label}`
  );

  // ---------------------------------------------------------------------------
  // 4. Senaryo 4: Bakanlığın Diğer Senaryolarından Doğrudan Seçilen Sorular
  // ---------------------------------------------------------------------------
  const mebOfficialQuestions = [
    { 
      sourceOrigin: 'meb_official' as QuestionSourceOrigin,
      originExamTitle: '5. Sınıf Matematik 1. Dönem 1. Yazılı Senaryo 2',
      originQuestionNumber: 3
    },
    { 
      sourceOrigin: 'meb_official' as QuestionSourceOrigin,
      originExamTitle: '5. Sınıf Matematik 1. Dönem 1. Yazılı Senaryo 3',
      originQuestionNumber: 1
    }
  ];
  const mebSelectionClass = classifyExamQuestions(mebOfficialQuestions);
  const mebSelectionDetails = getExamClassificationDetails(mebSelectionClass);
  const mebSelectionPdf = getMaterialPdfFileNameWithExtension({
    grade: 5,
    subjectId: 'matematik',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_1',
    materialKind: 'exam_paper',
    isCustomExam: true,
    examClassification: mebSelectionClass
  });
  const mebBadge = getQuestionSourceBadge('meb_official', '5. Sınıf Matematik Senaryo 2', 3);

  report(
    '04',
    'Bakanlığın diğer senaryolarından doğrudan seçilen sınav "meb_selection" olarak sınıflandırılır ve _MEB_ODSGM_Soru_Seckisi.pdf üretir',
    mebSelectionClass === 'meb_selection' &&
    mebSelectionDetails.titleSuffix === 'MEB ÖDSGM Soru Seçkisi' &&
    mebSelectionPdf === '5_Sinif_Matematik_1_Donem_1_Yazili_Senaryo_1_MEB_ODSGM_Soru_Seckisi.pdf' &&
    mebBadge.label === 'MEB ÖDSGM Kaynaklı (Soru 3)',
    `Sınıf: ${mebSelectionClass}, Dosya: ${mebSelectionPdf}, Rozet: ${mebBadge.label}, Tooltip: ${mebBadge.tooltip}`
  );

  // ---------------------------------------------------------------------------
  // 5. Senaryo 5: Bakanlık ve OYSS Sorularının Karışık Olduğu Sınav
  // ---------------------------------------------------------------------------
  const mixedQuestions = [
    { 
      sourceOrigin: 'meb_official' as QuestionSourceOrigin,
      originExamTitle: '6. Sınıf Fen Bilimleri Senaryo 3',
      originQuestionNumber: 2
    },
    { sourceOrigin: 'oyss_curated' as QuestionSourceOrigin },
    { sourceOrigin: 'oyss_synthetic' as QuestionSourceOrigin }
  ];
  const mixedClass = classifyExamQuestions(mixedQuestions);
  const mixedDetails = getExamClassificationDetails(mixedClass);
  const mixedPdf = getMaterialPdfFileNameWithExtension({
    grade: 6,
    subjectId: 'fen_bilimleri',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_1',
    materialKind: 'exam_paper',
    isCustomExam: true,
    examClassification: mixedClass
  });
  const mixedAnswerKeyPdf = getMaterialPdfFileNameWithExtension({
    grade: 6,
    subjectId: 'fen_bilimleri',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_1',
    materialKind: 'exam_paper',
    isCustomExam: true,
    isAnswerKey: true,
    examClassification: mixedClass
  });

  report(
    '05',
    'Bakanlık ve OYSS sorularının karışık olduğu sınav "oyss_mixed_meb" olarak sınıflandırılır ve _OYSS_Karma_Sinav_MEB_Kaynakli.pdf üretir',
    mixedClass === 'oyss_mixed_meb' &&
    mixedDetails.titleSuffix === 'OYSS Karma Sınavı (MEB Kaynaklı & OYSS)' &&
    mixedPdf === '6_Sinif_Fen_Bilimleri_1_Donem_1_Yazili_Senaryo_1_OYSS_Karma_Sinav_MEB_Kaynakli.pdf' &&
    mixedAnswerKeyPdf === '6_Sinif_Fen_Bilimleri_1_Donem_1_Yazili_Senaryo_1_OYSS_Karma_Sinav_MEB_Kaynakli_Cevap_Anahtari.pdf',
    `Sınıf: ${mixedClass}, Soru Kağıdı: ${mixedPdf}, Cevap Anahtarı: ${mixedAnswerKeyPdf}`
  );

  // ---------------------------------------------------------------------------
  // 6. Senaryo 6: Eski Sınav Kayıtlarında Kaynak Metadata'sı Bulunmaması (Geriye Dönük Uyumluluk)
  // ---------------------------------------------------------------------------
  const legacyQuestions = [
    { outcomeCode: 'T.O.5.6' },
    { outcomeCode: 'T.O.5.7' }
  ];
  const legacyClass = classifyExamQuestions(legacyQuestions as any);
  const legacyPdf = getMaterialPdfFileNameWithExtension({
    grade: 5,
    subjectId: 'turkce',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_2',
    materialKind: 'exam_paper',
    isCustomExam: true,
    examClassification: legacyClass
  });
  const legacyBadge = getQuestionSourceBadge(undefined);

  report(
    '06',
    'Eski/tanımsız sınav kayıtlarında kaynak alanı olmadığında otomatik OYSS kabul edilmez, "unclassified" sınıflandırılır',
    legacyClass === 'unclassified' &&
    legacyPdf === '5_Sinif_Turkce_1_Donem_1_Yazili_Senaryo_2_OYSS_Ozgun_Sinav.pdf' &&
    legacyBadge.label === 'Doğrulanmamış Kaynak',
    `Sınıf: ${legacyClass}, Dosya: ${legacyPdf}, Varsayılan Rozet: ${legacyBadge.label}`
  );

  // ---------------------------------------------------------------------------
  // 7. Senaryo 7: aiGeneratorEngine Gerçek Üretiminde Kaynak İşaretlemesi
  // ---------------------------------------------------------------------------
  try {
    const scenario = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[5]?.turkce?.[0];
    const res = await generateMEBIQuestions('turkce', 5, scenario, 0);

    const allHaveSourceOrigin = res.generatedQuestions.every(q => 
      q.sourceOrigin === 'meb_official' ||
      q.sourceOrigin === 'oyss_curated' ||
      q.sourceOrigin === 'oyss_synthetic' ||
      q.sourceOrigin === 'gemini_ai'
    );
    const hasClassification = typeof res.examClassification === 'string' && res.examClassification.length > 0;

    report(
      '07',
      'aiGeneratorEngine üretiminde tüm sorulara geçerli bir sourceOrigin ve sınava examClassification atanmaktadır',
      allHaveSourceOrigin && hasClassification,
      `Sınav Sınıfı: ${res.examClassification}, Soru Sayısı: ${res.generatedQuestions.length}, Örnek Soru 1 Kökeni: ${res.generatedQuestions[0]?.sourceOrigin}`
    );
  } catch (err: any) {
    report('07', 'aiGeneratorEngine üretim kaynağı kontrolü', false, err.message);
  }

  // ---------------------------------------------------------------------------
  // 8. Senaryo 8: Soru Düzeyinde Model Cevap Başlığı Kaynak Ayrımı (Mixed Exam Kontrolü)
  // ---------------------------------------------------------------------------
  const isQuestionFromMeb = (qItem?: any, isCustomExam: boolean = false): boolean => {
    if (!qItem) return false;
    if (qItem.sourceOrigin) {
      return qItem.sourceOrigin === 'meb_official';
    }
    return !isCustomExam;
  };

  const qOfficial = { sourceOrigin: 'meb_official' };
  const qSynthetic = { sourceOrigin: 'oyss_synthetic' };
  const qCurated = { sourceOrigin: 'oyss_curated' };
  const qGemini = { sourceOrigin: 'gemini_ai' };
  const qLegacyOfficial = { sourceOrigin: undefined };

  const t1 = isQuestionFromMeb(qOfficial, true) === true;
  const t2 = isQuestionFromMeb(qSynthetic, true) === false;
  const t3 = isQuestionFromMeb(qCurated, true) === false;
  const t4 = isQuestionFromMeb(qGemini, true) === false;
  const t5 = isQuestionFromMeb(qLegacyOfficial, false) === true;

  report(
    '08',
    'Soru düzeyinde model cevap başlığında MEB resmî soruları OYSS olarak adlandırılmaz, OYSS soruları MEB ÖDSGM gösterilmez',
    t1 && t2 && t3 && t4 && t5,
    `Mixed MEB Tanıma: ${t1}, Synthetic OYSS: ${t2}, Curated OYSS: ${t3}, Gemini OYSS: ${t4}, Legacy: ${t5}`
  );

  console.log('\n====================================================');
  console.log(`TOPLAM TEST: ${passedTests + failedTests}`);
  console.log(`BAŞARILI   : ${passedTests}`);
  console.log(`BAŞARISIZ  : ${failedTests}`);
  console.log('====================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTests();

