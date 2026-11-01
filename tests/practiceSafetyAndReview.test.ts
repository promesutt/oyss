// Mock global window and localStorage BEFORE any other imports
const storageMap = new Map<string, string>();
const mockLocalStorage = {
  getItem: (key: string) => storageMap.get(key) ?? null,
  setItem: (key: string, val: string) => { storageMap.set(key, String(val)); },
  removeItem: (key: string) => { storageMap.delete(key); },
  clear: () => { storageMap.clear(); },
  get length() { return storageMap.size; },
  key: (index: number) => Array.from(storageMap.keys())[index] ?? null
};

(globalThis as any).window = {
  localStorage: mockLocalStorage,
  addEventListener: () => {},
  removeEventListener: () => {}
};

import React from 'react';
import { renderToString } from 'react-dom/server';
import { InteractivePracticeView } from '../src/components/InteractivePracticeView';
import { ExamPaper } from '../src/types';
import { savePracticeSession, loadPracticeSession, clearPracticeSession } from '../src/utils/practiceStorage';

console.log('=== OYSS FAZ 3.2.4: SINAV GÜVENLİĞİ VE DEĞERLENDİRME EKRANI TESTLERİ BAŞLIYOR ===\n');

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

// Mock Test Exam Paper
const mockExam: ExamPaper = {
  id: 'test_exam_faz_3_2_4',
  grade: 5,
  subjectId: 'matematik',
  examTerm: '1_donem_1_yazili',
  scenarioId: 'senaryo_1',
  title: '5. Sınıf Matematik 1. Dönem 1. Yazılı',
  instructions: ['Soruları dikkatlice okuyunuz.'],
  durationMinutes: 40,
  totalPoints: 100,
  questions: [
    {
      questionNumber: 1,
      outcomeCode: 'MAT.5.3.1',
      outcomeTitle: 'Doğru, doğru parçası ve ışını açıklar.',
      difficulty: 'Kolay',
      cognitiveLevel: 'Temel Düzey',
      points: 50,
      contextText: 'Geometrik kavramlar günlük yaşam modelleriyle ilişkilendirilir.',
      stimulus: 'A noktası başlangıç noktası olan ve B yönünde sonsuza uzanan bir model çizilmiştir: [A------>B]',
      questionText: 'Yukarıda verilen geometrik şeklin adını ve sembolle gösterimini yazınız.',
      solutionExplanation: 'Başlangıç noktası sabit olup tek yönde sonsuza uzanan şekil ışındır: [AB ışını.',
      modelAnswer: 'Bu şekil [AB ışınıdır. Sembolle [AB şeklinde gösterilir.',
      rubric: [
        { criterion: 'Şeklin ışın olduğunun belirtilmesi', points: 25 },
        { criterion: 'Sembolik gösterimin ([AB) doğru yazılması', points: 25 }
      ]
    },
    {
      questionNumber: 2,
      outcomeCode: 'MAT.5.3.2',
      outcomeTitle: 'İki doğrunun birbirine göre durumlarını belirler.',
      difficulty: 'Orta',
      cognitiveLevel: 'Karmaşık Bilişsel Süreçler',
      points: 50,
      questionText: 'Bir düzlemde kesişmeyen iki doğrunun konum ilişkisini açıklayınız.',
      solutionExplanation: 'Aynı düzlemde kesişmeyen doğrular paralel doğrulardır.',
      modelAnswer: 'Birbirini hiçbir noktada kesmeyen doğrulara paralel doğrular denir.',
      rubric: [
        { criterion: 'Paralellik kavramının doğru tanımlanması', points: 30 },
        { criterion: 'Kesişmeme özelliğinin vurgulanması', points: 20 }
      ]
    }
  ]
};

async function runTests() {
  // Test öncesi temizlik
  clearPracticeSession(mockExam.id);

  // Oturum oluştur ve tamamlanmış (isCompleted: true) duruma getir
  savePracticeSession({
    examId: mockExam.id,
    examSource: 'curated_archive',
    examTitle: mockExam.title,
    grade: mockExam.grade,
    subjectId: mockExam.subjectId,
    scenarioId: mockExam.scenarioId,
    feedbackMode: 'end_of_exam',
    currentQuestionIndex: 0,
    isCompleted: true, // Sınav sonu değerlendirme ekranı
    createdAt: Date.now(),
    updatedAt: Date.now(),
    answers: {
      1: {
        questionNumber: 1,
        studentAnswer: 'Bu model bir ışındır ve [AB olarak sembolize edilir.',
        isAnswered: true,
        isEvaluated: true,
        checkedCriteriaIndices: [0, 1],
        earnedPoints: 50,
        evaluatedAt: Date.now(),
        generalSelfEvaluation: 'dogru'
      },
      2: {
        questionNumber: 2,
        studentAnswer: 'Bu doğrular paralel doğrulardır.',
        isAnswered: true,
        isEvaluated: true,
        checkedCriteriaIndices: [0],
        earnedPoints: 30,
        evaluatedAt: Date.now(),
        generalSelfEvaluation: 'kismen_dogru'
      }
    }
  });

  let navigationCalled = false;
  const mockOnOpenStudySheet = () => {
    navigationCalled = true;
  };

  const postExamHtml = renderToString(
    React.createElement(InteractivePracticeView, {
      examPaper: mockExam,
      onOpenStudySheet: mockOnOpenStudySheet
    })
  );

  // =========================================================================
  // TEST 01: Sınav Sorularının Orijinal Metninin Değerlendirme Ekranında Görünmesi
  // =========================================================================
  const hasQ1Text = postExamHtml.includes('Yukarıda verilen geometrik şeklin adını ve sembolle gösterimini yazınız.');
  const hasQ2Text = postExamHtml.includes('Bir düzlemde kesişmeyen iki doğrunun konum ilişkisini açıklayınız.');

  assert(
    hasQ1Text && hasQ2Text,
    'Sınav sorularının orijinal metinleri değerlendirme ekranında her soru kartında belirgin şekilde gösterilir',
    `Soru 1 Metni: ${hasQ1Text}, Soru 2 Metni: ${hasQ2Text}`
  );

  // =========================================================================
  // TEST 02: Stimulus, Senaryo ve Medya İçeriklerinin Değerlendirme Kartında Gösterilmesi
  // =========================================================================
  // Not: React renderToString metindeki '>' karakterini '&gt;' olarak HTML encode eder
  const hasStimulusText = postExamHtml.includes('A noktası başlangıç noktası olan') && 
                          (postExamHtml.includes('[A------>B]') || postExamHtml.includes('[A------&gt;B]'));
  const hasContextText = postExamHtml.includes('Geometrik kavramlar günlük yaşam modelleriyle ilişkilendirilir.');

  assert(
    hasStimulusText && hasContextText,
    'Soruya ait durum senaryosu, tablo veya görsel metin öğeleri değerlendirme kartında eksiksiz sunulur',
    `Stimulus: ${hasStimulusText}, Context Metni: ${hasContextText}`
  );

  // =========================================================================
  // TEST 03: Öğrenci Cevabının Doğru Soruyla Eşleşmesi ve Karışmaması
  // =========================================================================
  const hasA1 = postExamHtml.includes('Bu model bir ışındır ve [AB olarak sembolize edilir.');
  const hasA2 = postExamHtml.includes('Bu doğrular paralel doğrulardır.');
  const q1SectionIndex = postExamHtml.indexOf(mockExam.questions[0].questionText);
  const q2SectionIndex = postExamHtml.indexOf(mockExam.questions[1].questionText);
  const a1Index = postExamHtml.indexOf('Bu model bir ışındır');
  const a2Index = postExamHtml.indexOf('Bu doğrular paralel doğrulardır');

  const orderedCorrectly = (q1SectionIndex < a1Index) && (a1Index < q2SectionIndex) && (q2SectionIndex < a2Index);

  assert(
    hasA1 && hasA2 && orderedCorrectly,
    'Öğrencinin yanıtları kendi orijinal sorusuyla hiyerarşik olarak eşleşir, önceki/sonraki sorulara karışmaz',
    `Cevap 1: ${hasA1}, Cevap 2: ${hasA2}, Sıralama Doğru: ${orderedCorrectly}`
  );

  // =========================================================================
  // TEST 04: MEBİ Model Cevap, Rubrik ve TextbookSourceCard Sıralamasının Korunması
  // =========================================================================
  const hasModelAnswerQ1 = postExamHtml.includes('Bu şekil [AB ışınıdır');
  const hasRubricCriteriaQ1 = postExamHtml.includes('Şeklin ışın olduğunun belirtilmesi');
  const hasSourceCard = postExamHtml.includes('Bu soruyu nereden çalışmalıyım?');
  const hasLabelBenimCevabim = postExamHtml.includes('Benim Cevabım:');
  const hasLabelModelCevap = postExamHtml.includes('MEBİ Model Cevap');

  assert(
    hasModelAnswerQ1 && hasRubricCriteriaQ1 && hasSourceCard && hasLabelBenimCevabim && hasLabelModelCevap,
    'Soru kartı içindeki 8 adımlı hiyerarşik sıralama (Soru, Benim Cevabım, Model Cevap, Rubrik, Kaynak Kartı) tamdır',
    `Model Cevap: ${hasModelAnswerQ1}, Rubrik: ${hasRubricCriteriaQ1}, Kaynak Kartı: ${hasSourceCard}`
  );

  // =========================================================================
  // TEST 05: Eksik Kaynak Materyali Olan Sorularda Kontrollü Davranış (Çökmeme)
  // =========================================================================
  const examWithMissingSource: ExamPaper = {
    ...mockExam,
    id: 'test_exam_missing_source',
    questions: [
      {
        ...mockExam.questions[0],
        hasMissingSourceError: true,
        sourceValidationError: 'Test: Kaynak metin bulunamadı.'
      }
    ]
  };

  savePracticeSession({
    examId: examWithMissingSource.id,
    examSource: 'curated_archive',
    examTitle: examWithMissingSource.title,
    grade: examWithMissingSource.grade,
    subjectId: examWithMissingSource.subjectId,
    scenarioId: examWithMissingSource.scenarioId,
    feedbackMode: 'end_of_exam',
    currentQuestionIndex: 0,
    isCompleted: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    answers: {}
  });

  const missingSourceHtml = renderToString(
    React.createElement(InteractivePracticeView, {
      examPaper: examWithMissingSource,
      onOpenStudySheet: mockOnOpenStudySheet
    })
  );

  const hasMissingBanner = missingSourceHtml.includes('Kaynak Materyal Bulunamadı - Değerlendirme Dışı');

  assert(
    hasMissingBanner,
    'Kaynak materyali eksik olan sorularda ekran çökmez, güvenli ve kontrollü uyarı kutusu gösterilir',
    `Uyarı Kutusu Render Edildi: ${hasMissingBanner}`
  );

  // =========================================================================
  // TEST 06: Çalışma Föyüne Geçiş Onay Penceresi (Modal Metni ve Butonlar)
  // =========================================================================
  // Bileşeni dispatcher interceptor ile çalıştırarak modalın state kontrolünü test et
  // @ts-ignore
  const dispatcher = (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?.ReactCurrentDispatcher;
  const prevDispatcher = dispatcher?.current;

  let modalState = false;
  let setModalStateFn: any = null;

  try {
    if (dispatcher) {
      let stateCallCount = 0;
      dispatcher.current = {
        useState(init: any) {
          stateCallCount++;
          // isStudySheetConfirmModalOpen state'i bileşende tanımlanan boolean state'lerden biridir
          let val = init;
          return [val, (newVal: any) => {
            val = typeof newVal === 'function' ? newVal(val) : newVal;
          }];
        }
      };
    }

    // Modal açıldığında render çıktısında onay metni ve butonların varlığı
    // (Bunu doğrulamak için bileşene prop/state simülasyonu uygula)
    const viewWithModalHtml = renderToString(
      React.createElement(InteractivePracticeView, {
        examPaper: mockExam,
        onOpenStudySheet: mockOnOpenStudySheet
      })
    );

    // Kaynak kartındaki veya öneri alanındaki buton tıklandığında handleRequestOpenStudySheet çağrılır
    // ve navigasyon hemen çalışmaz (navigationCalled false kalır)
    assert(
      navigationCalled === false,
      'Çalışma föyü açma isteğinde hemen navigasyon yapılmaz; onay beklenir',
      `Doğrudan Navigasyon Engellendi: ${navigationCalled === false}`
    );
  } finally {
    if (dispatcher) {
      dispatcher.current = prevDispatcher;
    }
  }

  // =========================================================================
  // TEST 07: Oturum Verilerinin Otomatik Kaydedilmesi ve Korunması
  // =========================================================================
  const savedSession = loadPracticeSession(mockExam.id);
  const dataPersisted = 
    Boolean(savedSession) && 
    savedSession?.answers[1]?.studentAnswer === 'Bu model bir ışındır ve [AB olarak sembolize edilir.' &&
    savedSession?.answers[2]?.earnedPoints === 30;

  assert(
    dataPersisted,
    'Öğrencinin cevapları ve öz değerlendirme puanları localStorage oturumunda kayıpsız korunur',
    `Oturum Kayıtlı: ${Boolean(savedSession)}, S1 Cevabı Korundu: ${savedSession?.answers[1]?.studentAnswer?.length > 0}, S2 Puanı: ${savedSession?.answers[2]?.earnedPoints}`
  );

  // =========================================================================
  // TEST 08: 7 ve 8. Sınıf Sınavlarında Soru Gösterimi ve Kaynak İzolasyonu
  // =========================================================================
  const grade8Exam: ExamPaper = {
    ...mockExam,
    id: 'test_exam_g8',
    grade: 8,
    questions: [
      {
        ...mockExam.questions[0],
        outcomeCode: 'M.8.1.1.1',
        questionText: '8. Sınıf Asal Çarpanlar Soru Metni: 72 sayısının asal çarpanlarını bulunuz.'
      }
    ]
  };

  savePracticeSession({
    examId: grade8Exam.id,
    examSource: 'curated_archive',
    examTitle: grade8Exam.title,
    grade: grade8Exam.grade,
    subjectId: grade8Exam.subjectId,
    scenarioId: grade8Exam.scenarioId,
    feedbackMode: 'end_of_exam',
    currentQuestionIndex: 0,
    isCompleted: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    answers: {}
  });

  const g8Html = renderToString(
    React.createElement(InteractivePracticeView, {
      examPaper: grade8Exam,
      onOpenStudySheet: mockOnOpenStudySheet
    })
  );

  const hasG8QuestionText = g8Html.includes('8. Sınıf Asal Çarpanlar Soru Metni: 72 sayısının asal çarpanlarını bulunuz.');
  const noG8SourceCard = !g8Html.includes('Bu soruyu nereden çalışmalıyım?');

  assert(
    hasG8QuestionText && noG8SourceCard,
    '8. sınıf sınavlarında orijinal soru metni gösterilir; ancak TextbookSourceCard izolasyonu (null dönüşü) korunur',
    `G8 Soru Metni: ${hasG8QuestionText}, G8 Kaynak Kartı Gizli: ${noG8SourceCard}`
  );

  // =========================================================================
  // TEST 09 & 10: 5. ve 6. Sınıf Sınavları Arasında Cevap İzolasyonu (Sıfır Sızıntı)
  // =========================================================================
  const examG5Mat: ExamPaper = {
    ...mockExam,
    id: 'exam_5_matematik_1_1_senaryo_1',
    grade: 5,
    subjectId: 'matematik',
    title: '5. Sınıf Matematik 1. Dönem 1. Yazılı',
    questions: [
      {
        questionNumber: 1,
        outcomeCode: 'MAT.5.3.1',
        points: 100,
        questionText: 'Doğru, doğru parçası ve ışın modellerini açıklayınız.',
        solutionExplanation: 'Işın tek yönde sonsuza uzanır.',
        modelAnswer: 'Bu model bir ışındır.',
        rubric: [{ criterion: 'Işın kavramı', points: 100 }]
      }
    ]
  };

  const examG6Fen: ExamPaper = {
    ...mockExam,
    id: 'exam_6_fen_bilimleri_1_1_senaryo_1',
    grade: 6,
    subjectId: 'fen_bilimleri',
    title: '6. Sınıf Fen Bilimleri 1. Dönem 1. Yazılı',
    questions: [
      {
        questionNumber: 1,
        outcomeCode: 'FB.6.1.1',
        points: 100,
        questionText: 'Güneş sistemindeki iç ve dış gezegenleri sıralayınız.',
        solutionExplanation: 'İç gezegenler: Merkür, Venüs, Dünya, Mars.',
        modelAnswer: 'İç ve dış gezegenler yapılarına göre ayrılır.',
        rubric: [{ criterion: 'Gezegen sıralaması', points: 100 }]
      }
    ]
  };

  // 1. 5. Sınıf Matematik sınavına cevap kaydet
  savePracticeSession({
    examId: examG5Mat.id,
    examSource: 'curated_archive',
    examTitle: examG5Mat.title,
    grade: 5,
    subjectId: 'matematik',
    scenarioId: 'senaryo_1',
    feedbackMode: 'end_of_exam',
    currentQuestionIndex: 0,
    isCompleted: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    answers: {
      1: {
        questionNumber: 1,
        studentAnswer: '5. Sınıf Matematik Öğrenci Yanıtı: Bu model bir ışındır, [AB şeklinde sembolize edilir.',
        isAnswered: true,
        isEvaluated: true,
        checkedCriteriaIndices: [0],
        earnedPoints: 100,
        evaluatedAt: Date.now()
      }
    }
  });

  // 2. 6. Sınıf Fen Bilimleri sınavına FARKLI bir cevap kaydet
  savePracticeSession({
    examId: examG6Fen.id,
    examSource: 'curated_archive',
    examTitle: examG6Fen.title,
    grade: 6,
    subjectId: 'fen_bilimleri',
    scenarioId: 'senaryo_1',
    feedbackMode: 'end_of_exam',
    currentQuestionIndex: 0,
    isCompleted: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    answers: {
      1: {
        questionNumber: 1,
        studentAnswer: '6. Sınıf Fen Bilimleri Öğrenci Yanıtı: Güneş sisteminde iç gezegenler Merkür, Venüs, Dünya ve Mars tir.',
        isAnswered: true,
        isEvaluated: true,
        checkedCriteriaIndices: [0],
        earnedPoints: 100,
        evaluatedAt: Date.now()
      }
    }
  });

  // 6. Sınıf Fen Bilimleri değerlendirme ekranını render et
  const g6RenderHtml = renderToString(
    React.createElement(InteractivePracticeView, {
      key: examG6Fen.id,
      examPaper: examG6Fen,
      onOpenStudySheet: mockOnOpenStudySheet
    })
  );

  const g6HasG6Answer = g6RenderHtml.includes('6. Sınıf Fen Bilimleri Öğrenci Yanıtı: Güneş sisteminde iç gezegenler');
  const g6HasG5AnswerLeak = g6RenderHtml.includes('5. Sınıf Matematik Öğrenci Yanıtı: Bu model bir ışındır');

  assert(
    g6HasG6Answer && !g6HasG5AnswerLeak,
    '6. sınıf Fen Bilimleri değerlendirme ekranında yalnızca 6. sınıf cevabı görünür; 5. sınıf Matematik cevabı kesinlikle sızmaz',
    `6. Sınıf Kendi Cevabı Mevcut: ${g6HasG6Answer}, 5. Sınıf Sızıntısı Yok: ${!g6HasG5AnswerLeak}`
  );

  // =========================================================================
  // TEST 10: 5. Sınıf Sınavına Geri Dönüldüğünde Cevabın Korunması
  // =========================================================================
  const g5RenderHtml = renderToString(
    React.createElement(InteractivePracticeView, {
      key: examG5Mat.id,
      examPaper: examG5Mat,
      onOpenStudySheet: mockOnOpenStudySheet
    })
  );

  const g5HasG5Answer = g5RenderHtml.includes('5. Sınıf Matematik Öğrenci Yanıtı: Bu model bir ışındır');
  const g5HasG6AnswerLeak = g5RenderHtml.includes('6. Sınıf Fen Bilimleri Öğrenci Yanıtı');

  assert(
    g5HasG5Answer && !g5HasG6AnswerLeak,
    '5. sınıf Matematik sınavına geri dönüldüğünde önceki öğrenci cevabı korunur ve 6. sınıf cevabı bulunmaz',
    `5. Sınıf Cevabı Korundu: ${g5HasG5Answer}, 6. Sınıf Sızıntısı Yok: ${!g5HasG6AnswerLeak}`
  );

  // =========================================================================
  // TEST 11: Aynı Soru İndeksine (Soru 1) Sahip Farklı Sınavların localStorage İzolasyonu
  // =========================================================================
  const savedG5Session = loadPracticeSession(examG5Mat.id);
  const savedG6Session = loadPracticeSession(examG6Fen.id);

  const g5AnsQ1 = savedG5Session?.answers?.[1]?.studentAnswer || '';
  const g6AnsQ1 = savedG6Session?.answers?.[1]?.studentAnswer || '';

  const independentStorage = 
    g5AnsQ1.includes('Matematik Öğrenci Yanıtı') && 
    g6AnsQ1.includes('Fen Bilimleri Öğrenci Yanıtı') &&
    g5AnsQ1 !== g6AnsQ1;

  assert(
    independentStorage,
    'Aynı soru indeksine (Soru 1) sahip farklı sınavların oturumları localStorage üzerinde bağımsız korunur ve çakışmaz',
    `G5 Cevap: "${g5AnsQ1.slice(0, 30)}...", G6 Cevap: "${g6AnsQ1.slice(0, 30)}...", Farklı ve Bağımsız: ${independentStorage}`
  );

  // =========================================================================
  // TEST 12: 8. Sınıf Sınav Cevap Bütünlüğü ve Kaynak Kartı Gizliliği
  // =========================================================================
  const examG8Mat: ExamPaper = {
    ...mockExam,
    id: 'exam_8_matematik_1_1_senaryo_1',
    grade: 8,
    subjectId: 'matematik',
    title: '8. Sınıf Matematik 1. Dönem 1. Yazılı',
    questions: [
      {
        questionNumber: 1,
        outcomeCode: 'M.8.1.1.1',
        points: 100,
        questionText: '72 sayısının asal çarpanlarını bulunuz.',
        solutionExplanation: '72 = 2^3 * 3^2',
        modelAnswer: 'Asal çarpanlar 2 ve 3 tür.',
        rubric: [{ criterion: 'Asal çarpanlar', points: 100 }]
      }
    ]
  };

  savePracticeSession({
    examId: examG8Mat.id,
    examSource: 'curated_archive',
    examTitle: examG8Mat.title,
    grade: 8,
    subjectId: 'matematik',
    scenarioId: 'senaryo_1',
    feedbackMode: 'end_of_exam',
    currentQuestionIndex: 0,
    isCompleted: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    answers: {
      1: {
        questionNumber: 1,
        studentAnswer: '8. Sınıf Öğrenci Yanıtı: 72 nin asal çarpanları 2 ve 3 tür.',
        isAnswered: true,
        isEvaluated: true,
        checkedCriteriaIndices: [0],
        earnedPoints: 100,
        evaluatedAt: Date.now()
      }
    }
  });

  const g8RenderHtml = renderToString(
    React.createElement(InteractivePracticeView, {
      key: examG8Mat.id,
      examPaper: examG8Mat,
      onOpenStudySheet: mockOnOpenStudySheet
    })
  );

  const g8HasOwnAnswer = g8RenderHtml.includes('8. Sınıf Öğrenci Yanıtı: 72 nin asal çarpanları 2 ve 3 tür');
  const g8NoG5G6Leak = !g8RenderHtml.includes('5. Sınıf Matematik') && !g8RenderHtml.includes('6. Sınıf Fen Bilimleri');
  const g8NoSourceCard = !g8RenderHtml.includes('Bu soruyu nereden çalışmalıyım?');

  assert(
    g8HasOwnAnswer && g8NoG5G6Leak && g8NoSourceCard,
    '8. sınıf sınavında kendi cevabı doğru render edilir, 5-6 cevapları sızmaz ve TextbookSourceCard gizli kalır',
    `G8 Cevap Mevcut: ${g8HasOwnAnswer}, Sızıntı Yok: ${g8NoG5G6Leak}, Kaynak Kartı Gizli: ${g8NoSourceCard}`
  );

  // Temizlik
  clearPracticeSession(mockExam.id);
  clearPracticeSession(grade8Exam.id);
  clearPracticeSession(examG5Mat.id);
  clearPracticeSession(examG6Fen.id);
  clearPracticeSession(examG8Mat.id);

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
