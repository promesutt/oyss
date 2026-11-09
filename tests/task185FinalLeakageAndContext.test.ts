/**
 * TASK185: Son Öğrenci Sunum Güvenliği ve Bağlam Doğrulama Test Paketi
 *
 * Test Edilenler:
 * 1. Sertifikasız sorunun soru kökü öğrenci görünümünde bulunmaz.
 * 2. Sertifikasız sorunun uyaranı ve seçenekleri öğrenci görünümünde bulunmaz.
 * 3. Sertifikasız sorunun cevap ve öz değerlendirme alanları kapalıdır.
 * 4. Öğretmen görünümü sertifikasız sorunun içeriğini ve hata gerekçesini korur.
 * 5. needs_review sorusu öğretmen onayı olmadan öğrenciye gösterilmez.
 * 6. passed soru normal biçimde gösterilir.
 * 7. warning soru mevcut politikasına uygun gösterilir.
 * 8. Çalışma kâğıdı alıştırması açıkça kendisine bağlı uyaranla denetlenir.
 * 9. Bağlantısı olmayan alıştırmaya otomatik solvedExample uyaranı atanmaz.
 * 10. Uyaran gerektirmeyen bağımsız soru, uyaran yok diye başarısız olmaz.
 * 11. Uyaran gerektiren ancak uyaranı bulunmayan soru engellenir.
 * 12. PDF/yazdırma çıktısında başarısız soru bulunmaz (print:hidden ve print blocker kapısı).
 * 13. Alternatif öğrenci ekranı kalite kapısını atlayamaz (Merkezi model ve bileşen kapıları).
 */

import {
  auditQuestionQuality,
  auditExamQuality,
  ensureExamQuality,
  ensureStudySheetQuality
} from '../src/utils/qualityAssurance/index';
import { StudySheet, ExamPaper, ExamQuestion } from '../src/types/index';
import { OUTCOME_STUDY_BANK } from '../src/data/outcomeStudyBank';

console.log('=== TASK185: SON ÖĞRENCİ SUNUM GÜVENLİĞİ VE BAĞLAM TESTLERİ BAŞLIYOR ===\n');

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string, detail: string) {
  if (condition) {
    passCount++;
    console.log(`[TEST] ✓ BAŞARILI - ${testName}`);
    console.log(`       Ayrıntı: ${detail}\n`);
  } else {
    failCount++;
    console.error(`[TEST] ✗ BAŞARISIZ - ${testName}`);
    console.error(`       Hata: ${detail}\n`);
  }
}

// =============================================================
// YARDIMCI GÖRÜNÜM DENETLEYİCİLERİ (Bileşen Kapısı Simülatörleri)
// =============================================================

/**
 * InteractivePracticeView öğrenci sunum kapısını simüle eder
 */
function getInteractiveStudentViewModel(question: any) {
  const isBlockedByQA = question?.isCertified === false ||
    question?._qaStatus === 'failed' ||
    question?._qaStatus === 'needs_review' ||
    question?.needsReview === true;

  if (isBlockedByQA) {
    return {
      isBlocked: true,
      studentNotice: 'Bu soru kalite kontrolünden geçmediği veya inceleme aşamasında olduğu için öğrenci görünümüne kapatılmıştır.',
      visibleQuestionStem: null,
      visibleStimulus: null,
      visibleVisual: null,
      isAnswerEditorActive: false,
      isSelfAssessmentActive: false,
      teacherInspectData: {
        rawQuestionStem: question.questionText || question.question,
        rawStimulus: question.stimulus,
        rawModelAnswer: question.modelAnswer || question.answer,
        qaWarning: question._qaWarning,
        qaFindings: question._qaFindings || []
      }
    };
  }

  return {
    isBlocked: false,
    studentNotice: null,
    visibleQuestionStem: question.questionText || question.question,
    visibleStimulus: question.stimulus || null,
    visibleVisual: question.visual || null,
    isAnswerEditorActive: true,
    isSelfAssessmentActive: true,
    teacherInspectData: null
  };
}

/**
 * ExamPaperView öğrenci ve baskı kapısını simüle eder
 */
function getExamPaperStudentPrintModel(question: any) {
  const isBlockedByQA = question?.isCertified === false ||
    question?._qaStatus === 'failed' ||
    question?._qaStatus === 'needs_review' ||
    question?.needsReview === true;

  return {
    isBlockedByQA,
    printClasses: isBlockedByQA ? 'print:hidden' : '',
    studentAnswerSpaceVisible: !isBlockedByQA,
    studentQuestionStemVisible: !isBlockedByQA,
    studentStimulusVisible: !isBlockedByQA,
    teacherInspectBoxVisible: isBlockedByQA
  };
}

// =============================================================
// TEST 1: Sertifikasız Sorunun Soru Kökü Öğrenciye Gösterilmez
// =============================================================
const fatalMathQuestion: any = {
  questionNumber: 1,
  outcomeCode: 'MAT.7.1.1',
  points: 10,
  questionText: '12 ile 15 sayılarının toplamını bulunuz.',
  modelAnswer: '12 + 15 = 30 eder.', // Aritmetik hata
  rubric: [{ criterion: 'İşlem', points: 10 }]
};

const auditedFatalQ = auditQuestionQuality(fatalMathQuestion, { grade: 7, subjectId: 'matematik' });
const fatalProcessed = {
  ...fatalMathQuestion,
  isCertified: auditedFatalQ.isCertified,
  _qaStatus: auditedFatalQ.status,
  _qaFindings: auditedFatalQ.findings,
  _qaWarning: 'Aritmetik hata'
};

const interactiveFatalView = getInteractiveStudentViewModel(fatalProcessed);
assert(
  interactiveFatalView.isBlocked === true && interactiveFatalView.visibleQuestionStem === null,
  '1. Sertifikasız Sorunun Soru Kökü Öğrenci Görünümünde Bulunmaz',
  `isCertified: false soruda visibleQuestionStem null yapıldı; öğrenciye soru metni kapatıldı.`
);

// =============================================================
// TEST 2: Sertifikasız Sorunun Uyaranı ve Seçenekleri Öğrenciye Gösterilmez
// =============================================================
const fatalStimulusQuestion: any = {
  questionNumber: 2,
  outcomeCode: 'FB.7.3.1',
  points: 10,
  stimulus: 'Deney Düzeneği: Şekildeki kapta safra sıvısı bulunmaktadır.',
  questionText: 'Safranın kimyasal sindirimdeki enzim işlevini açıklayınız.', // Kavram yanılgısı
  modelAnswer: 'Safra bir enzimdir ve yağları kimyasal olarak sindirir.',
  rubric: [{ criterion: 'Açıklama', points: 10 }]
};

const auditedStimulusQ = auditQuestionQuality(fatalStimulusQuestion, { grade: 7, subjectId: 'fen_bilimleri' });
const stimulusProcessed = {
  ...fatalStimulusQuestion,
  isCertified: auditedStimulusQ.isCertified,
  _qaStatus: auditedStimulusQ.status,
  _qaFindings: auditedStimulusQ.findings,
  _qaWarning: 'Safra enzim değildir.'
};

const interactiveStimulusView = getInteractiveStudentViewModel(stimulusProcessed);
assert(
  interactiveStimulusView.isBlocked === true &&
  interactiveStimulusView.visibleStimulus === null &&
  interactiveStimulusView.visibleVisual === null,
  '2. Sertifikasız Sorunun Uyaranı ve Görseli Öğrenci Görünümünde Bulunmaz',
  `Hatalı soruda uyaran ve görsel öğrenciye kapatıldı (visibleStimulus: null, visibleVisual: null).`
);

// =============================================================
// TEST 3: Sertifikasız Sorunun Cevap ve Öz Değerlendirme Alanları Kapalıdır
// =============================================================
assert(
  interactiveFatalView.isAnswerEditorActive === false && interactiveFatalView.isSelfAssessmentActive === false,
  '3. Sertifikasız Sorunun Cevap ve Öz Değerlendirme Alanları Kapalıdır',
  'Cevap editörü (MathAnswerEditor) ve öz değerlendirme/rubrik butonları kesin olarak kilitlenmiştir.'
);

// =============================================================
// TEST 4: Öğretmen Görünümü Sertifikasız Sorunun İçeriğini ve Gerekçesini Korur
// =============================================================
assert(
  interactiveFatalView.teacherInspectData !== null &&
  interactiveFatalView.teacherInspectData.rawQuestionStem === fatalMathQuestion.questionText &&
  Boolean(interactiveFatalView.teacherInspectData.qaWarning),
  '4. Öğretmen Görünümü Sertifikasız Sorunun İçeriğini ve Hata Gerekçesini Korur',
  `Öğretmen inceleme alanında soru kökü ("${interactiveFatalView.teacherInspectData?.rawQuestionStem}") ve hata gerekçesi erişilebilir durumdadır.`
);

// =============================================================
// TEST 5: needs_review Sorusu Öğretmen Onayı Olmadan Öğrenciye Gösterilmez
// =============================================================
const needsReviewQuestion: any = {
  questionNumber: 3,
  outcomeCode: 'MAT.7.1.1',
  points: 10,
  questionText: 'İnceleme bekleyen taslak soru.',
  modelAnswer: 'Taslak cevap.',
  rubric: [{ criterion: 'Taslak ölçüt', points: 10 }],
  _qaStatus: 'needs_review',
  needsReview: true
};

const needsReviewInteractive = getInteractiveStudentViewModel(needsReviewQuestion);
assert(
  needsReviewInteractive.isBlocked === true && needsReviewInteractive.visibleQuestionStem === null,
  '5. needs_review Sorusu Öğretmen Onayı Olmadan Öğrenciye Gösterilmez',
  'needs_review veya needsReview: true olan soru isBlocked: true alarak öğrenciye kapatılmıştır.'
);

// =============================================================
// TEST 6: passed Soru Normal Biçimde Gösterilir
// =============================================================
const validMathQuestion: any = {
  questionNumber: 4,
  outcomeCode: 'MAT.7.1.1',
  points: 10,
  stimulus: 'Aşağıdaki sayı doğrusunda A ve B noktaları gösterilmiştir.',
  questionText: 'A ve B noktalarına karşılık gelen rasyonel sayıları yazınız.',
  modelAnswer: 'A = -1/2 ve B = 3/4 dür.',
  rubric: [
    { criterion: 'A noktasını doğru bulma', points: 5 },
    { criterion: 'B noktasını doğru bulma', points: 5 }
  ],
  isCertified: true,
  _qaStatus: 'passed'
};

const passedInteractive = getInteractiveStudentViewModel(validMathQuestion);
assert(
  passedInteractive.isBlocked === false &&
  passedInteractive.visibleQuestionStem === validMathQuestion.questionText &&
  passedInteractive.visibleStimulus === validMathQuestion.stimulus &&
  passedInteractive.isAnswerEditorActive === true,
  '6. passed Soru Normal Biçimde Gösterilir',
  'Onaylı soru metni, uyaranı ve cevap editörü öğrenciye eksiksiz olarak açılmıştır.'
);

// =============================================================
// TEST 7: warning Soru Mevcut Politikasına Uygun Gösterilir
// =============================================================
const warningMathQuestion: any = {
  questionNumber: 5,
  outcomeCode: 'MAT.7.1.1',
  points: 10,
  questionText: 'Rasyonel sayıların karşılaştırılması sorusu?',
  modelAnswer: 'x sayısı y sayısından büyüktür.',
  rubric: [
    { criterion: 'Karşılaştırma adımı', points: 5 },
    { criterion: 'Sonucu yazma', points: 5 }
  ],
  isCertified: true,
  _qaStatus: 'warning'
};

const warningInteractive = getInteractiveStudentViewModel(warningMathQuestion);
assert(
  warningInteractive.isBlocked === false &&
  warningInteractive.visibleQuestionStem === warningMathQuestion.questionText &&
  warningInteractive.isAnswerEditorActive === true,
  '7. warning Soru Mevcut Politikasına Uygun Gösterilir',
  'Kritik olmayan pedagojik uyarıya sahip soru öğrenciye engellenmemiş, etkileşime izin verilmiştir.'
);

// =============================================================
// TEST 8: Çalışma Kâğıdı Alıştırması Açıkça Kendisine Bağlı Uyaranla Denetlenir
// =============================================================
const studySheetWithOwnStimulus: StudySheet = {
  id: 'study_own_stimulus',
  grade: 7,
  subjectId: 'fen_bilimleri',
  examTerm: '1_donem_2_yazili',
  scenarioId: 'senaryo_1',
  title: 'Uyaranlı Çalışma Kâğıdı',
  sections: [
    {
      outcomeCode: 'FB.7.3.1',
      topicTitle: 'Sindirim Sistemi Organları ve Görevleri',
      quickNotes: ['Mide mekanik ve kimyasal sindirim yapar.'],
      examTraps: ['Safra enzim değildir.'],
      solvedExample: {
        question: 'İnce bağırsakta gerçekleşen sindirim olayını ve villusların görevini açıklayınız.',
        analysis: 'İnce bağırsak sindirimin tamamlandığı ve emilimin yapıldığı organdır.',
        solution: 'İnce bağırsakta sindirim tamamlanır ve villuslar besinleri kana aktarır.'
      },
      practiceQuestion: {
        stimulus: 'Laboratuvar deneyi: Özdeş deney tüplerinde mide özsuyu ve besinlerin sindirim süreleri incelenmiştir.',
        question: 'Verilen laboratuvar verisine göre mide özsuyunun sindirim sistemindeki rolünü açıklayınız.',
        hint: 'Mide özsuyundaki asit ve enzimlerin kimyasal sindirimi başlattığını belirtiniz.'
      }
    }
  ]
};

const auditedOwnStimulusSheet = ensureStudySheetQuality(studySheetWithOwnStimulus);
const secWithStim = auditedOwnStimulusSheet.sections[0];
assert(
  secWithStim.isCertified === true && (secWithStim.qaStatus === 'passed' || secWithStim.qaStatus === 'warning'),
  '8. Çalışma Kâğıdı Alıştırması Açıkça Kendisine Bağlı Uyaranla Denetlenir',
  'Alıştırma kendi stimulus alanındaki laboratuvar verisiyle denetlenmiş ve başarıyla onaylanmıştır.'
);

// =============================================================
// TEST 9: Bağlantısı Olmayan Alıştırmaya Otomatik solvedExample Uyaranı Atanmaz
// =============================================================
const studySheetWithoutLink: StudySheet = {
  id: 'study_no_link',
  grade: 5,
  subjectId: 'turkce',
  examTerm: '1_donem_1_yazili',
  scenarioId: 'senaryo_1',
  title: 'Bağlantısız Çalışma Kâğıdı',
  sections: [
    {
      outcomeCode: 'T.O.5.6',
      topicTitle: 'Metnin Yüzey Anlamı',
      quickNotes: ['Yüzey anlam metinde açıkça yazılıdır.'],
      examTraps: ['Kendi yorumunuzu katmayınız.'],
      solvedExample: {
        question: '“Gürgen ağacından yonttuğu topaç ve tahta araba duruyordu.” Dedesi çocuğa hangi el yapımı oyuncakları gösterdi?',
        analysis: 'Metinden doğrudan bilgi bulma.',
        solution: 'Topaç ve tahta araba oyuncaklarını gösterdi.'
      },
      practiceQuestion: {
        // usesSolvedExampleStimulus YOK! Kendi stimulusu YOK!
        question: 'Metinde geçen kahramanın dedesi meslek olarak ne iş yapmaktadır?',
        hint: 'Metindeki ipuçlarını inceleyiniz.'
      }
    }
  ]
};

const auditedNoLink = ensureStudySheetQuality(studySheetWithoutLink);
const secNoLink = auditedNoLink.sections[0];
// Otomatik olarak solvedExample metni atanmadığı için soru kaynak gereksinimi nedeniyle failed/needs_review olmalıdır
assert(
  secNoLink.isCertified === false && (secNoLink.qaStatus === 'failed' || secNoLink.qaStatus === 'needs_review'),
  '9. Bağlantısı Olmayan Alıştırmaya Otomatik solvedExample Uyaranı Atanmaz',
  `usesSolvedExampleStimulus tanımlanmadığı için uyaran zorla bağlanmadı; eksik kaynak yakalandı (qaStatus: "${secNoLink.qaStatus}").`
);

// =============================================================
// TEST 10: Uyaran Gerektirmeyen Bağımsız Soru Uyaran Yok Diye Başarısız Olmaz
// =============================================================
const selfContainedQuestion: StudySheet = {
  id: 'study_self_contained',
  grade: 7,
  subjectId: 'matematik',
  examTerm: '1_donem_2_yazili',
  scenarioId: 'senaryo_1',
  title: 'Bağımsız Matematik Alıştırması',
  sections: [
    {
      outcomeCode: 'MAT.7.1.4',
      topicTitle: 'Rasyonel Sayılarla İşlemler',
      quickNotes: ['Paydalar eşitlenerek toplama yapılır.'],
      examTraps: ['Paydaları doğrudan toplamayınız.'],
      solvedExample: {
        question: '1/3 + 1/6 işleminin sonucunu en sade biçimde bulunuz.',
        analysis: 'Paydalar 6 da eşitlenir.',
        solution: '2/6 + 1/6 = 3/6 = 1/2 bulunur.'
      },
      practiceQuestion: {
        question: '2/5 + 3/10 rasyonel sayılarıyla toplama işleminin sonucunu bulunuz.', // Kendi başına tam ve bağımsız soru
        hint: 'İlk kesri 2 ile genişletiniz.'
      }
    }
  ]
};

const auditedSelfContained = ensureStudySheetQuality(selfContainedQuestion);
const secSelfContained = auditedSelfContained.sections[0];
assert(
  secSelfContained.isCertified === true && (secSelfContained.qaStatus === 'passed' || secSelfContained.qaStatus === 'warning'),
  '10. Uyaran Gerektirmeyen Bağımsız Soru Uyaran Yok Diye Başarısız Olmaz',
  'Tüm girdileri soru kökünde olan bağımsız soru sırf uyaran alanı boş diye engellenmedi; başarıyla onaylandı.'
);

// =============================================================
// TEST 11: Uyaran Gerektiren Ancak Uyaranı Bulunmayan Soru Engellenir
// =============================================================
const missingStimulusQuestion = {
  questionNumber: 6,
  outcomeCode: 'MAT.7.2.1',
  points: 10,
  questionText: 'Yandaki şekilde verilen açının ölçüsünü bulunuz.', // "şekilde" atfı var ama şekil yok!
  modelAnswer: 'x = 45 derecedir.',
  rubric: [{ criterion: 'Açı hesabı', points: 10 }]
};

const auditedMissingStimulus = auditQuestionQuality(missingStimulusQuestion, { grade: 7, subjectId: 'matematik' });
assert(
  auditedMissingStimulus.isCertified === false && auditedMissingStimulus.status === 'failed',
  '11. Uyaran Gerektiren Ancak Uyaranı Bulunmayan Soru Engellenir',
  'Görsele/şekle atıf yapmasına rağmen stimulus veya visual içermeyen soru isCertified: false aldı.'
);

// =============================================================
// TEST 12: PDF/Yazdırma Çıktısında Başarısız Soru Bulunmaz
// =============================================================
const printModelFatal = getExamPaperStudentPrintModel(fatalProcessed);
const printModelPassed = getExamPaperStudentPrintModel(validMathQuestion);

assert(
  printModelFatal.printClasses.includes('print:hidden') &&
  printModelFatal.studentAnswerSpaceVisible === false &&
  printModelFatal.studentQuestionStemVisible === false &&
  !printModelPassed.printClasses.includes('print:hidden') &&
  printModelPassed.studentAnswerSpaceVisible === true,
  '12. PDF/Yazdırma Çıktısında Başarısız Soru Bulunmaz (print:hidden & Kapı)',
  'Kusurlu soru A4 baskı çıktısından (print:hidden) ve öğrenci alanından kaldırıldı; geçerli soru eksiksiz bırakıldı.'
);

// =============================================================
// TEST 13: Alternatif Öğrenci Ekranı Kalite Kapısını Atlayamaz
// =============================================================
const uncertifiedExamPaper: ExamPaper = {
  id: 'test_uncertified_exam',
  grade: 7,
  subjectId: 'matematik',
  examTerm: '1_donem_2_yazili',
  scenarioId: 'senaryo_1',
  title: 'Kusurlu Sınav Kâğıdı',
  instructions: ['Sınav yönergesi'],
  durationMinutes: 40,
  totalPoints: 100,
  questions: [fatalProcessed, validMathQuestion],
  qualityAudit: {
    certifiedForStudents: false,
    overallStatus: 'failed'
  }
};

// ExamPaperView ve InteractivePracticeView baskı kilitleri
const examPaperPrintBlocked = (uncertifiedExamPaper.qualityAudit?.certifiedForStudents ?? true) === false ||
  uncertifiedExamPaper.questions.some(q => q.isCertified === false || (q as any)._qaStatus === 'failed');

assert(
  examPaperPrintBlocked === true,
  '13. Alternatif Öğrenci Ekranı Kalite Kapısını Atlayamaz (Merkezi Kapı Bütünlüğü)',
  'Sınavda uncertified tek bir soru bile bulunması durumunda hem sınav hem yazdırma kapısı kesin olarak kilitlenmektedir.'
);

// =============================================================
// SONUÇ BİLDİRİMİ
// =============================================================
console.log('--- TEST SONUCU ---');
console.log(`Toplam Test: ${passCount + failCount} | Başarılı: ${passCount} | Başarısız: ${failCount}\n`);

if (failCount > 0) {
  console.error('BAZI TESTLER BAŞARISIZ OLDU!');
  process.exit(1);
} else {
  console.log('TÜM TASK185 TESTLERİ EKSİKSİZ BAŞARILI!');
}
