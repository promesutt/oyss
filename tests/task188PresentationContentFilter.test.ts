/**
 * TASK188: ONAYLI İÇERİK VE SUNUM FİLTRELEME TEST PAKETİ
 *
 * Test Edilen Senaryolar (Rol Bağımsız Standartlar):
 * 1. passed soru onaylı haliyle sunum modeline eksiksiz aktarılır.
 * 2. warning soru mevcut pedagojik politika doğrultusunda sunumda korunur.
 * 3. failed sorunun ham metni ve hatalı çözümü sunum modelinden filtrelenir.
 * 4. needs_review sorunun ham metni onaylanmadan sunum modeline giremez.
 * 5. İç teknik QA bulguları ve hata gerekçeleri sunum modeline aktarılmaz.
 * 6. Ham soru veri modelinde geliştirici ve denetim kayıtları korunur.
 * 7. Çözüm esnasında model cevap ve rubrik kullanıcıya erken açılmaz (allowModelAnswer kuralları).
 * 8. Kusurlu soru verileri yerel depolamada (localStorage) birikmez (Depolama Sanitizasyonu).
 * 9. Çalışma kâğıtlarında kusurlu bölümler sunum öncesi temizlenir (Çalışma Kâğıdı Sanitizasyonu).
 * 10. Kullanıcı arayüzünde (DOM) sertifikasız soru metni veya uyaranı render edilmez (React SSR Testi).
 * 11. Kalite denetim nesnesinde (qualityAudit) teknik ayrıntılar denetim/geliştirici için erişilebilir kalır.
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {
  sanitizeExamQuestion,
  sanitizeExamPaper,
  sanitizeStudySheet,
  ensureExamQuality
} from '../src/utils/qualityAssurance/index';
import { savePracticeSession, loadPracticeSession } from '../src/utils/practiceStorage';
import { ExamPaper, ExamQuestion, StudySheet } from '../src/types/index';
import { ExamPaperView } from '../src/components/ExamPaperView';
import { InteractivePracticeView } from '../src/components/InteractivePracticeView';

console.log('=== TASK188: ONAYLI İÇERİK VE SUNUM FİLTRELEME TESTLERİ BAŞLIYOR ===\n');

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
// TEST VERİLERİ (Kaynak ve Ham Soru Modelleri)
// =============================================================

const passedRawQuestion: ExamQuestion = {
  questionNumber: 1,
  outcomeCode: 'MAT.7.1.4',
  outcomeTitle: 'Rasyonel sayılarla işlemler',
  difficulty: 'Orta',
  cognitiveLevel: 'Basit Bilişsel Süreçler',
  points: 10,
  questionText: '2/5 + 1/10 işleminin sonucunu en sade biçimde bulunuz.',
  stimulus: 'İşlem adımlarını gösteriniz.',
  contextText: 'Rasyonel sayılarda toplama',
  modelAnswer: '2/5 = 4/10; 4/10 + 1/10 = 5/10 = 1/2 bulunur.',
  solutionExplanation: 'Paydalar 10 da eşitlenir.',
  rubric: [
    { criterion: 'Payda eşitleme', points: 5 },
    { criterion: 'Sadeleştirme', points: 5 }
  ],
  isCertified: true,
  _qaStatus: 'passed',
  _qaWarning: undefined,
  _qaFindings: []
};

const warningRawQuestion: ExamQuestion = {
  questionNumber: 2,
  outcomeCode: 'MAT.7.1.4',
  outcomeTitle: 'Rasyonel sayılarla işlemler',
  difficulty: 'Zor',
  cognitiveLevel: 'Karmaşık Bilişsel Süreçler',
  points: 10,
  questionText: 'Bir depodaki suyun 1/3 ü sonra kalanın 1/4 ü kullanılıyor. Geriye kalan oranı bulunuz?',
  modelAnswer: '1/3 kullanıldı, geriye 2/3 kaldı. 2/3 * 1/4 = 2/12 = 1/6. Geriye 2/3 - 1/6 = 3/6 = 1/2 kalır.',
  solutionExplanation: 'Adım adım kalan hesaplanır.',
  rubric: [
    { criterion: 'İlk kalanı bulma', points: 5 },
    { criterion: 'Sonucu bulma', points: 5 }
  ],
  isCertified: true,
  _qaStatus: 'warning',
  _qaWarning: 'Soru metninde soru işareti biçimi pedagojik uyarı aldı.',
  _qaFindings: [
    {
      category: 'language_clarity',
      severity: 'warning',
      field: 'stem',
      message: 'Soru cümlesi soru işareti yerine açık emir kipiyle bitebilir.',
      validationMethod: 'language_style_check'
    }
  ]
};

const failedRawQuestion: ExamQuestion = {
  questionNumber: 3,
  outcomeCode: 'MAT.7.1.1',
  outcomeTitle: 'Doğal Sayılar ve Toplama',
  difficulty: 'Orta',
  cognitiveLevel: 'Basit Bilişsel Süreçler',
  points: 10,
  questionText: 'FATAL_ARITHMETIC_QUESTION_STEM: 12 + 15 toplamı kaçtır?',
  stimulus: 'FATAL_STIMULUS_DATA: Şekil 1 deki kutular',
  contextText: 'FATAL_CONTEXT_DATA: Aritmetik işlem',
  modelAnswer: 'FATAL_MODEL_ANSWER: 12 + 15 = 40 bulunur.', // Bariz aritmetik hatası
  solutionExplanation: 'FATAL_EXPLANATION: Toplama işlemi sonucu',
  rubric: [{ criterion: 'İşlem', points: 10 }],
  isCertified: false,
  _qaStatus: 'failed',
  _qaWarning: 'FATAL_QA_WARNING: 12 + 15 işlemi 40 olamaz, kritik matematiksel hata.',
  _qaFindings: [
    {
      category: 'scientific_correctness',
      severity: 'critical',
      field: 'answer',
      message: 'Model cevapta kritik aritmetik hatası tespit edildi.',
      validationMethod: 'math_arithmetic_verifier'
    }
  ]
};

const needsReviewRawQuestion: ExamQuestion = {
  questionNumber: 4,
  outcomeCode: 'MAT.7.2.1',
  outcomeTitle: 'Cebirsel İfadeler',
  difficulty: 'Zor',
  cognitiveLevel: 'Karmaşık Bilişsel Süreçler',
  points: 10,
  questionText: 'NEEDS_REVIEW_STEM: 3x + 5 = 20 denklemini sağlayan x değerini bulunuz.',
  modelAnswer: 'NEEDS_REVIEW_ANSWER: x = 5 tir.',
  solutionExplanation: 'Taslak çözüm',
  rubric: [{ criterion: 'Çözüm', points: 10 }],
  isCertified: false,
  _qaStatus: 'needs_review',
  _qaWarning: 'NEEDS_REVIEW_WARNING: Pedagojik doğrulama bekleniyor.',
  _qaFindings: [
    {
      category: 'pedagogical_depth',
      severity: 'warning',
      field: 'general',
      message: 'Yeni eklenen sorunun alan zümresi tarafından onaylanması gerekmektedir.',
      validationMethod: 'peer_review_check'
    }
  ]
};

const rawExam: ExamPaper = {
  id: 'exam_presentation_test_188',
  grade: 7,
  subjectId: 'matematik',
  examTerm: '1_donem_1_yazili',
  scenarioId: 'senaryo_1',
  title: '7. Sınıf Matematik Sunum Denetim Sınavı',
  instructions: ['Sınav süresi 40 dakikadır.'],
  durationMinutes: 40,
  totalPoints: 40,
  questions: [passedRawQuestion, warningRawQuestion, failedRawQuestion, needsReviewRawQuestion],
  qualityAudit: {
    overallStatus: 'failed',
    certifiedForStudents: false,
    totalQuestions: 4,
    passedCount: 1,
    warningCount: 1,
    failedCount: 1,
    needsReviewCount: 1,
    criticalIssues: [
      {
        category: 'scientific_correctness',
        severity: 'critical',
        field: 'answer',
        message: '12 + 15 işlemi 40 olamaz.',
        validationMethod: 'math_arithmetic_verifier'
      }
    ],
    questionResults: {}
  }
};

// =============================================================
// TEST 1: passed Soru Onaylı Haliyle Sunum Modeline Aktarılır
// =============================================================
const sanitizedPassedQ = sanitizeExamQuestion(passedRawQuestion);

assert(
  sanitizedPassedQ.isCertified === true &&
  sanitizedPassedQ._qaStatus === 'passed' &&
  sanitizedPassedQ.questionText === passedRawQuestion.questionText &&
  sanitizedPassedQ.stimulus === passedRawQuestion.stimulus &&
  sanitizedPassedQ.points === 10 &&
  sanitizedPassedQ.outcomeCode === 'MAT.7.1.4',
  '1. passed Soru Onaylı Haliyle Sunum Modeline Aktarılır',
  'Onaylı soru kökü, kazanımı, puanı ve uyaranı sunum modeline eksiksiz aktarılmıştır.'
);

// =============================================================
// TEST 2: warning Soru Mevcut Politika Doğrultusunda Sunumda Korunur
// =============================================================
const sanitizedWarningQ = sanitizeExamQuestion(warningRawQuestion);

assert(
  sanitizedWarningQ.isCertified === true &&
  sanitizedWarningQ._qaStatus === 'warning' &&
  sanitizedWarningQ.questionText === warningRawQuestion.questionText &&
  sanitizedWarningQ.points === 10,
  '2. warning Soru Mevcut Politika Doğrultusunda Sunumda Korunur',
  'Kritik olmayan pedagojik uyarıya sahip soru, mevcut politika gereği sunum modelinde korunmuştur.'
);

// =============================================================
// TEST 3: failed Sorunun Ham Metni ve Hatalı Çözümü Sunum Modelinden Filtrelenir
// =============================================================
const sanitizedFailedQ = sanitizeExamQuestion(failedRawQuestion);

assert(
  sanitizedFailedQ.isCertified === false &&
  sanitizedFailedQ._qaStatus === 'failed' &&
  !sanitizedFailedQ.questionText.includes('FATAL_ARITHMETIC_QUESTION_STEM') &&
  sanitizedFailedQ.stimulus === undefined &&
  sanitizedFailedQ.contextText === undefined &&
  sanitizedFailedQ.visual === undefined &&
  sanitizedFailedQ.modelAnswer === '',
  '3. failed Sorunun Ham Metni ve Hatalı Çözümü Sunum Modelinden Filtrelenir',
  `Kusurlu sorunun ham metni ("${failedRawQuestion.questionText}") sunum modelinden temizlenmiş, yerine nötr açıklama atanmıştır.`
);

// =============================================================
// TEST 4: needs_review Sorunun Ham Metni Onaylanmadan Sunum Modeline Giremez
// =============================================================
const sanitizedNeedsReviewQ = sanitizeExamQuestion(needsReviewRawQuestion);

assert(
  sanitizedNeedsReviewQ.isCertified === false &&
  sanitizedNeedsReviewQ._qaStatus === 'needs_review' &&
  !sanitizedNeedsReviewQ.questionText.includes('NEEDS_REVIEW_STEM') &&
  sanitizedNeedsReviewQ.stimulus === undefined &&
  sanitizedNeedsReviewQ.modelAnswer === '',
  '4. needs_review Sorunun Ham Metni Onaylanmadan Sunum Modeline Giremez',
  'İnceleme bekleyen sorunun ham soru kökü ve cevabı sunum nesnesinden arındırılmıştır.'
);

// =============================================================
// TEST 5: İç Teknik QA Bulguları ve Hata Gerekçeleri Sunum Modeline Aktarılmaz
// =============================================================
assert(
  (sanitizedWarningQ as any)._qaWarning === undefined &&
  (sanitizedWarningQ as any)._qaFindings === undefined &&
  (sanitizedFailedQ as any)._qaWarning === undefined &&
  (sanitizedFailedQ as any)._qaFindings === undefined,
  '5. İç Teknik QA Bulguları ve Hata Gerekçeleri Sunum Modeline Aktarılmaz',
  '_qaWarning ve _qaFindings alanları sunum modellerinde kesin olarak undefined yapılmıştır.'
);

// =============================================================
// TEST 6: Ham Soru Veri Modelinde Geliştirici ve Denetim Kayıtları Korunur
// =============================================================
assert(
  failedRawQuestion.questionText.includes('FATAL_ARITHMETIC_QUESTION_STEM') &&
  failedRawQuestion._qaWarning?.includes('FATAL_QA_WARNING') &&
  Boolean(failedRawQuestion._qaFindings && failedRawQuestion._qaFindings.length > 0),
  '6. Ham Soru Veri Modelinde Geliştirici ve Denetim Kayıtları Korunur',
  'Geliştirici ve denetim kayıtları ham veri nesnesinde tam olarak korunmaktadır.'
);

// =============================================================
// TEST 7: Soru Çözümü Esnasında Model Cevap ve Rubrik Kullanıcıya Erken Açılmaz
// =============================================================
const solvingQ = sanitizeExamQuestion(passedRawQuestion, { allowModelAnswer: false });

assert(
  solvingQ.modelAnswer === '' &&
  solvingQ.rubric?.length === 0 &&
  sanitizedFailedQ.modelAnswer === '' &&
  sanitizedFailedQ.rubric?.length === 0,
  '7. Soru Çözümü Esnasında Model Cevap ve Rubrik Kullanıcıya Erken Açılmaz',
  'Çözüm aşamasındaki sunum nesnesinde model cevap ve rubrik boşaltılmış; failed soruda her koşulda kapatılmıştır.'
);

// =============================================================
// TEST 8: Kusurlu Soru Verileri Yerel Depolamada (localStorage) Birikmez (Depolama Sanitizasyonu)
// =============================================================
const mockLocalStorage: Record<string, string> = {};
(global as any).window = {
  localStorage: {
    getItem: (key: string) => mockLocalStorage[key] || null,
    setItem: (key: string, val: string) => { mockLocalStorage[key] = val; },
    removeItem: (key: string) => { delete mockLocalStorage[key]; }
  }
};

const sessionWithUncertifiedExam: any = {
  examId: rawExam.id,
  examSource: 'ai_generated',
  examTitle: rawExam.title,
  grade: 7,
  subjectId: 'matematik',
  scenarioId: 'senaryo_1',
  feedbackMode: 'end_of_exam',
  currentQuestionIndex: 0,
  isCompleted: false,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  answers: {},
  customExamSnapshot: rawExam // Ham uncertified sınav nesnesi verildi
};

// Kaydet
savePracticeSession(sessionWithUncertifiedExam);

// Doğrudan depolanan JSON metnini oku ve incele
const rawStoredJson = mockLocalStorage[`oyss_session_v1_${rawExam.id}`];
const isStemLeakedInStorage = rawStoredJson.includes('FATAL_ARITHMETIC_QUESTION_STEM');
const isQaWarningLeakedInStorage = rawStoredJson.includes('FATAL_QA_WARNING');
const isNeedsReviewLeakedInStorage = rawStoredJson.includes('NEEDS_REVIEW_STEM');

assert(
  !isStemLeakedInStorage && !isQaWarningLeakedInStorage && !isNeedsReviewLeakedInStorage,
  '8. Kusurlu Soru Verileri Yerel Depolamada (localStorage) Birikmez (Depolama Sanitizasyonu)',
  'Oturum localStorage a yazılırken customExamSnapshot temizlenmiş; ham kusurlu soru metni depolamada birikmemiştir.'
);

// =============================================================
// TEST 9: Çalışma Kâğıtlarında Kusurlu Bölümler Sunum Öncesi Temizlenir (Çalışma Kâğıdı Sanitizasyonu)
// =============================================================
const rawStudySheetWithFatal: StudySheet = {
  id: 'study_fatal_test_188',
  grade: 7,
  subjectId: 'fen_bilimleri',
  examTerm: '1_donem_1_yazili',
  scenarioId: 'senaryo_1',
  title: 'Kusurlu Fen Bilimleri Çalışma Kâğıdı',
  sections: [
    {
      outcomeCode: 'FB.7.3.1',
      topicTitle: 'Sindirim Sistemi',
      quickNotes: ['Mide mekanik sindirim yapar.'],
      examTraps: ['Tuzaklar'],
      solvedExample: {
        question: 'FATAL_STUDY_SOLVED_Q: Safra enzimi ne yapar?',
        analysis: 'Kavram yanılgısı',
        solution: 'FATAL_STUDY_SOLVED_A: Safra bir enzimdir ve yağları kimyasal olarak sindirir.'
      },
      practiceQuestion: {
        question: 'FATAL_STUDY_PRACTICE_Q: Safranın kimyasal sindirimdeki rolü nedir?',
        hint: 'İpucu'
      },
      isCertified: false,
      qaStatus: 'failed',
      qaFindings: [
        {
          category: 'scientific_correctness',
          severity: 'critical',
          field: 'answer',
          message: 'Safra enzim değildir.',
          validationMethod: 'science_digestive_role'
        }
      ]
    }
  ]
};

const sanitizedSheet = sanitizeStudySheet(rawStudySheetWithFatal);
const filteredSec = sanitizedSheet.sections[0];

assert(
  filteredSec.isCertified === false &&
  filteredSec.qaStatus === 'failed' &&
  !filteredSec.solvedExample?.question.includes('FATAL_STUDY_SOLVED_Q') &&
  !filteredSec.solvedExample?.solution.includes('FATAL_STUDY_SOLVED_A') &&
  !filteredSec.practiceQuestion?.question.includes('FATAL_STUDY_PRACTICE_Q') &&
  filteredSec.qaFindings === undefined,
  '9. Çalışma Kâğıtlarında Kusurlu Bölümler Sunum Öncesi Temizlenir (Çalışma Kâğıdı Sanitizasyonu)',
  'Kusurlu çalışma kâğıdı bölümünün çözümlü örneği, alıştırması ve QA bulguları sunum modelinden arındırılmıştır.'
);

// =============================================================
// TEST 10: Kullanıcı Arayüzünde (DOM) Sertifikasız Soru Metni veya Uyaranı Render Edilmez (React SSR Testi)
// =============================================================
const dummyScenario = {
  id: 'senaryo_1',
  name: 'Senaryo 1',
  description: 'Test',
  totalQuestions: 4,
  distributions: []
};

// 1. ExamPaperView SSR render çıktısı
const paperHtml = ReactDOMServer.renderToString(
  React.createElement(ExamPaperView, {
    examPaper: rawExam,
    scenario: dummyScenario as any,
    onOpenAIGenerator: () => {}
  })
);

// 2. InteractivePracticeView SSR render çıktısı
const interactiveHtml = ReactDOMServer.renderToString(
  React.createElement(InteractivePracticeView, {
    examPaper: rawExam,
    isCustomAIExam: false,
    onBackToPaperView: () => {}
  })
);

const isPaperDomLeaked = paperHtml.includes('FATAL_ARITHMETIC_QUESTION_STEM') || paperHtml.includes('NEEDS_REVIEW_STEM');
const isInteractiveDomLeaked = interactiveHtml.includes('FATAL_ARITHMETIC_QUESTION_STEM') || interactiveHtml.includes('NEEDS_REVIEW_STEM');
const isTeacherRoleLeaked = paperHtml.includes('Öğretmen İnceleme Alanı') || interactiveHtml.includes('Öğretmen İnceleme Alanı');

assert(
  !isPaperDomLeaked && !isInteractiveDomLeaked && !isTeacherRoleLeaked,
  '10. Kullanıcı Arayüzünde (DOM) Sertifikasız Soru Metni veya Rol İfadesi Yer Almaz (React SSR)',
  'ExamPaperView ve InteractivePracticeView arayüzünde ne kusurlu soru metinleri ne de yapay Öğretmen İnceleme butonları render edilmemiştir.'
);

// =============================================================
// TEST 11: Kalite Denetim Nesnesinde (qualityAudit) Teknik Ayrıntılar Denetim/Geliştirici İçin Erişilebilir Kalır
// =============================================================
const teacherInspectionAvailable = Boolean(
  rawExam.questions.find(q => q.questionNumber === 3 && q.questionText.includes('FATAL_ARITHMETIC_QUESTION_STEM')) &&
  rawExam.questions.find(q => q.questionNumber === 4 && q.questionText.includes('NEEDS_REVIEW_STEM')) &&
  rawExam.qualityAudit?.criticalIssues?.length > 0
);

assert(
  teacherInspectionAvailable === true,
  '11. Kalite Denetim Nesnesinde (qualityAudit) Teknik Ayrıntılar Geliştirici/Denetim İçin Erişilebilir Kalır',
  'Geliştirici/denetim modelinde ham soru metinleri, gerekçelendirme ve kritik hata listesi tam olarak korunmaktadır.'
);

// =============================================================
// GENEL SONUÇ BİLDİRİMİ
// =============================================================
console.log('--- TEST SONUCU ---');
console.log(`Toplam Test: ${passCount + failCount} | Başarılı: ${passCount} | Başarısız: ${failCount}\n`);

if (failCount > 0) {
  console.error('BAZI İÇERİK FİLTRELEME TESTLERİ BAŞARISIZ OLDU!');
  process.exit(1);
} else {
  console.log('TÜM TASK188 ONAYLI İÇERİK VE SUNUM FİLTRELEME TESTLERİ EKSİKSİZ BAŞARILI!');
  process.exit(0);
}

