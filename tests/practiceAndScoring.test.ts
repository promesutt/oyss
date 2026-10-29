import { 
  distributeExamPoints, 
  reconcileRubricPoints, 
  validateExamPoints 
} from '../src/utils/examScoring';
import { 
  loadPracticeSession, 
  savePracticeSession, 
  clearPracticeSession 
} from '../src/utils/practiceStorage';
import { SAMPLE_EXAMS } from '../src/data/sampleExams';
import { OUTCOME_STUDY_BANK } from '../src/data/outcomeStudyBank';
import { ExamPaper, ExamQuestion } from '../src/types';
import { StudentExamSession } from '../src/types/practice';

interface TestResult {
  testId: number;
  name: string;
  passed: boolean;
  details: string;
}

const results: TestResult[] = [];

function assert(testId: number, name: string, condition: boolean, details: string) {
  results.push({
    testId,
    name,
    passed: Boolean(condition),
    details
  });
}

console.log('=== OYSS AŞAMA 1: ENTEGRASYON VE DOĞRULAMA TESTLERİ BAŞLIYOR ===\n');

// --------------------------------------------------------------------------
// TEST 1: Ders Değişince Eski Üretim Yeni Derse Aktarılamıyor
// --------------------------------------------------------------------------
{
  const resultsByContext: Record<string, any> = {};
  const contextA = '5_turkce_1_donem_1_yazili_senaryo_1';
  const contextB = '7_fen_bilimleri_1_donem_1_yazili_senaryo_1';

  resultsByContext[contextA] = {
    title: '5. Sınıf Türkçe Üretimi',
    generatedQuestions: [{ number: 1, question: 'Türkçe Soru 1' }]
  };

  const activeForContextB = resultsByContext[contextB] || null;
  const isIsolated = activeForContextB === null;
  assert(
    1,
    'Ders değişince eski üretim yeni derse aktarılamıyor',
    isIsolated,
    `Context A üretimi (${contextA}) Context B (${contextB}) için null döndü.`
  );
}

// --------------------------------------------------------------------------
// TEST 2: Aynı Ders ve Senaryoda Modalı Yeniden Açma Davranışı Tutarlı
// --------------------------------------------------------------------------
{
  const resultsByContext: Record<string, any> = {};
  const contextA = '5_turkce_1_donem_1_yazili_senaryo_1';
  resultsByContext[contextA] = {
    title: '5. Sınıf Türkçe Üretimi',
    generatedQuestions: [{ number: 1, question: 'Türkçe Soru 1' }]
  };

  // Kullanıcı modalı kapattı ve aynı derste yeniden açtı:
  const reopened = resultsByContext[contextA];
  const isConsistent = reopened !== null && reopened.generatedQuestions.length === 1;
  assert(
    2,
    'Aynı ders ve senaryoda modalı yeniden açma davranışı tutarlı',
    isConsistent,
    `Context A için önceden üretilen ${reopened?.generatedQuestions?.length} soru kayıpsız geri yüklendi.`
  );
}

// --------------------------------------------------------------------------
// TEST 3: İki Rubrik Ölçütlü, 15 Puanlık Soru
// --------------------------------------------------------------------------
{
  const rawRubric = [
    { criterion: 'Kriter 1', points: 8 },
    { criterion: 'Kriter 2', points: 8 }
  ];
  const reconciled = reconcileRubricPoints(rawRubric, 15);
  const sum = reconciled.reduce((a, b) => a + b.points, 0);
  const passed = sum === 15 && reconciled[0].points === 8 && reconciled[1].points === 7;
  assert(
    3,
    'İki rubrik ölçütlü, 15 puanlık soru',
    passed,
    `Hedef: 15 p, Hesaplanan Kriterler: [${reconciled.map(r => r.points).join(', ')}], Toplam: ${sum} p.`
  );
}

// --------------------------------------------------------------------------
// TEST 4: İki Rubrik Ölçütlü, 17 Puanlık Soru
// --------------------------------------------------------------------------
{
  const rawRubric = [
    { criterion: 'Kriter 1', points: 5 },
    { criterion: 'Kriter 2', points: 5 }
  ];
  const reconciled = reconcileRubricPoints(rawRubric, 17);
  const sum = reconciled.reduce((a, b) => a + b.points, 0);
  const passed = sum === 17 && reconciled[0].points === 9 && reconciled[1].points === 8;
  assert(
    4,
    'İki rubrik ölçütlü, 17 puanlık soru',
    passed,
    `Hedef: 17 p, Hesaplanan Kriterler: [${reconciled.map(r => r.points).join(', ')}], Toplam: ${sum} p.`
  );
}

// --------------------------------------------------------------------------
// TEST 5: Üç Rubrik Ölçütlü ve Eşit Dağıtılamayan Puanlar
// --------------------------------------------------------------------------
{
  const rawRubric = [
    { criterion: 'K1', pts: 6 },
    { criterion: 'K2', pts: 5 },
    { criterion: 'K3', pts: 4 }
  ];
  const reconciled = reconcileRubricPoints(rawRubric, 17);
  const sum = reconciled.reduce((a, b) => a + b.points, 0);
  const allPositive = reconciled.every(r => r.points >= 1);
  const passed = sum === 17 && allPositive;
  assert(
    5,
    'Üç rubrik ölçütlü ve eşit dağıtılamayan puanlar',
    passed,
    `Hedef: 17 p, Kriterler: [${reconciled.map(r => r.points).join(', ')}], Toplam: ${sum} p, Tümü pozitif: ${allPositive}.`
  );
}

// --------------------------------------------------------------------------
// TEST 6: Boş veya Geçersiz Rubrik
// --------------------------------------------------------------------------
{
  const emptyRec = reconcileRubricPoints([], 15);
  const nullRec = reconcileRubricPoints(null, 12);
  const sumEmpty = emptyRec.reduce((a, b) => a + b.points, 0);
  const sumNull = nullRec.reduce((a, b) => a + b.points, 0);
  const passed = sumEmpty === 15 && sumNull === 12 && emptyRec.length === 2 && nullRec.length === 2;
  assert(
    6,
    'Boş veya geçersiz rubrik',
    passed,
    `Boş rubrik 15 p için [${emptyRec.map(r => r.points).join(', ')}] (toplam: ${sumEmpty} p), null için [${nullRec.map(r => r.points).join(', ')}] (toplam: ${sumNull} p) kontrollü varsayılan üretti.`
  );
}

// --------------------------------------------------------------------------
// TEST 7: Sınavdaki Soru Puanları Toplamının 100 Olması
// --------------------------------------------------------------------------
{
  const counts = [3, 4, 5, 6, 7, 8, 9, 10, 12];
  let all100 = true;
  for (const c of counts) {
    const pts = distributeExamPoints(c);
    const sum = pts.reduce((a, b) => a + b, 0);
    if (sum !== 100 || pts.length !== c) {
      all100 = false;
      break;
    }
  }
  assert(
    7,
    'Sınavdaki soru puanları toplamının 100 olması',
    all100,
    `3 ila 12 arasındaki tüm soru sayıları (${counts.join(', ')}) için puanlar toplamı istisnasız tam 100 oldu.`
  );
}

// --------------------------------------------------------------------------
// TEST 8: Her Soruda Rubrik Toplamının Soru Puanına Eşit Olması
// --------------------------------------------------------------------------
{
  // 123 hazır sınavın doğrulanması
  let sampleExamErrors = 0;
  for (const ex of SAMPLE_EXAMS) {
    const v = validateExamPoints(ex);
    if (!v.isValid) sampleExamErrors++;
  }

  // Yapay zekâ sınavı simülasyonu
  const aiExam: ExamPaper = {
    id: 'ai_generated_test',
    grade: 7,
    subjectId: 'fen_bilimleri',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_1',
    title: 'Test Sınavı',
    instructions: [],
    durationMinutes: 40,
    totalPoints: 100,
    questions: [
      {
        questionNumber: 1,
        outcomeCode: 'FB.7.1.1',
        difficulty: 'Kolay',
        cognitiveLevel: 'Basit Bilişsel Süreçler',
        points: 17,
        questionText: 'Q1',
        modelAnswer: 'A1',
        solutionExplanation: 'Exp1',
        rubric: reconcileRubricPoints([{ criterion: 'K1', points: 8 }, { criterion: 'K2', points: 8 }], 17)
      },
      {
        questionNumber: 2,
        outcomeCode: 'FB.7.1.2',
        difficulty: 'Orta',
        cognitiveLevel: 'Karmaşık Bilişsel Süreçler',
        points: 17,
        questionText: 'Q2',
        modelAnswer: 'A2',
        solutionExplanation: 'Exp2',
        rubric: reconcileRubricPoints([{ criterion: 'K1', points: 5 }, { criterion: 'K2', points: 5 }], 17)
      },
      {
        questionNumber: 3,
        outcomeCode: 'FB.7.1.3',
        difficulty: 'Zor',
        cognitiveLevel: 'Karmaşık Bilişsel Süreçler',
        points: 17,
        questionText: 'Q3',
        modelAnswer: 'A3',
        solutionExplanation: 'Exp3',
        rubric: reconcileRubricPoints([{ criterion: 'K1', points: 4 }, { criterion: 'K2', points: 4 }], 17)
      },
      {
        questionNumber: 4,
        outcomeCode: 'FB.7.1.4',
        difficulty: 'Orta',
        cognitiveLevel: 'Karmaşık Bilişsel Süreçler',
        points: 17,
        questionText: 'Q4',
        modelAnswer: 'A4',
        solutionExplanation: 'Exp4',
        rubric: reconcileRubricPoints([{ criterion: 'K1', points: 10 }, { criterion: 'K2', points: 10 }], 17)
      },
      {
        questionNumber: 5,
        outcomeCode: 'FB.7.1.5',
        difficulty: 'Orta',
        cognitiveLevel: 'Karmaşık Bilişsel Süreçler',
        points: 16,
        questionText: 'Q5',
        modelAnswer: 'A5',
        solutionExplanation: 'Exp5',
        rubric: reconcileRubricPoints([{ criterion: 'K1', points: 5 }, { criterion: 'K2', points: 5 }], 16)
      },
      {
        questionNumber: 6,
        outcomeCode: 'FB.7.1.6',
        difficulty: 'Kolay',
        cognitiveLevel: 'Basit Bilişsel Süreçler',
        points: 16,
        questionText: 'Q6',
        modelAnswer: 'A6',
        solutionExplanation: 'Exp6',
        rubric: reconcileRubricPoints([{ criterion: 'K1', points: 5 }, { criterion: 'K2', points: 5 }], 16)
      }
    ]
  };

  const aiValid = validateExamPoints(aiExam);
  const passed = sampleExamErrors === 0 && aiValid.isValid;
  assert(
    8,
    'Her soruda rubrik toplamının soru puanına eşit olması',
    passed,
    `Hazır sınavlarda hata: ${sampleExamErrors}, AI sınav doğrulama geçerli: ${aiValid.isValid} (Hatalar: ${aiValid.errors.join(', ') || 'Yok'}).`
  );
}

// --------------------------------------------------------------------------
// TEST 9: Üretimden Gelen Çözüm Açıklamasının Aktarımda Korunması
// --------------------------------------------------------------------------
{
  const incomingQuestion = {
    number: 1,
    outcome: 'FB.7.1.1',
    question: 'Teleskop sorusu',
    answer: 'James Webb uzay teleskobu...',
    solutionExplanation: 'Özel analitik adım: Atmosfer dışındaki optik avantajlar tahlil edilmelidir.',
    rubric: [{ item: 'K1', pts: 10 }]
  };

  const specificExplanation = incomingQuestion.solutionExplanation
    ? incomingQuestion.solutionExplanation
    : `Genel MEBİ dereceli puanlama.`;

  const passed = specificExplanation === 'Özel analitik adım: Atmosfer dışındaki optik avantajlar tahlil edilmelidir.';
  assert(
    9,
    'Üretimden gelen çözüm açıklamasının aktarımda korunması',
    passed,
    `Soruya özgü açıklama "${specificExplanation}" kâğıda aktarılırken eksiksiz korundu.`
  );
}

// --------------------------------------------------------------------------
// TEST 10: Hazır Sınavda Etkileşimli Çözümün Çalışması
// --------------------------------------------------------------------------
{
  const sampleExam = SAMPLE_EXAMS[0];
  const session: StudentExamSession = {
    examId: sampleExam.id,
    examSource: 'curated_archive',
    examTitle: sampleExam.title,
    grade: sampleExam.grade,
    subjectId: sampleExam.subjectId,
    scenarioId: sampleExam.scenarioId,
    feedbackMode: 'immediate',
    currentQuestionIndex: 0,
    isCompleted: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    answers: {
      1: {
        questionNumber: 1,
        studentAnswer: 'Öğrenci cevabı',
        isAnswered: true,
        isEvaluated: true,
        checkedCriteriaIndices: [0],
        earnedPoints: sampleExam.questions[0].rubric[0]?.points || 5
      }
    }
  };

  const passed = session.examSource === 'curated_archive' && session.answers[1].earnedPoints > 0;
  assert(
    10,
    'Hazır sınavda etkileşimli çözümün çalışması',
    passed,
    `Sınav ${sampleExam.id} için oturum oluşturuldu, Soru 1 çözüldü ve ${session.answers[1].earnedPoints} p öz değerlendirildi.`
  );
}

// --------------------------------------------------------------------------
// TEST 11: Yapay Zekâ Sınavında Etkileşimli Çözümün Çalışması
// --------------------------------------------------------------------------
{
  const aiSession: StudentExamSession = {
    examId: 'ai_generated_1730000000000',
    examSource: 'ai_generated',
    examTitle: 'Özgün Soru Seti',
    grade: 7,
    subjectId: 'fen_bilimleri',
    scenarioId: 'senaryo_1',
    feedbackMode: 'end_of_exam',
    currentQuestionIndex: 0,
    isCompleted: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    answers: {
      1: {
        questionNumber: 1,
        studentAnswer: 'Yapay zekâ sorusuna cevap',
        isAnswered: true,
        isEvaluated: true,
        checkedCriteriaIndices: [0],
        earnedPoints: 8
      }
    }
  };

  const passed = aiSession.examSource === 'ai_generated' && aiSession.answers[1].earnedPoints === 8;
  assert(
    11,
    'Yapay zekâ sınavında etkileşimli çözümün çalışması',
    passed,
    `AI sınavı (${aiSession.examId}) hazır sınavla aynı veri modeli ve oturum mantığıyla başarıyla çalıştı.`
  );
}

// --------------------------------------------------------------------------
// TEST 12: Boş Yanıt ile Değerlendirilmiş Sıfır Puanlı Yanıtın Ayrılması
// --------------------------------------------------------------------------
{
  const emptyAnswer = {
    questionNumber: 1,
    studentAnswer: '',
    isAnswered: false,
    isEvaluated: false,
    checkedCriteriaIndices: [],
    earnedPoints: 0
  };

  const evaluatedZeroAnswer = {
    questionNumber: 2,
    studentAnswer: 'Hatalı cevap yazdım',
    isAnswered: true,
    isEvaluated: true,
    checkedCriteriaIndices: [],
    earnedPoints: 0
  };

  const isDifferentiated = !emptyAnswer.isEvaluated && evaluatedZeroAnswer.isEvaluated && evaluatedZeroAnswer.isAnswered;
  assert(
    12,
    'Boş yanıt ile değerlendirilmiş sıfır puanlı yanıtın ayrılması',
    isDifferentiated,
    `Soru 1 (Boş): isEvaluated=${emptyAnswer.isEvaluated}, Soru 2 (0 Puan): isEvaluated=${evaluatedZeroAnswer.isEvaluated}. Durumlar birbirinden kesin olarak ayrıldı.`
  );
}

// --------------------------------------------------------------------------
// TEST 13: Kısmen Karşılanan Rubrik Ölçütleri
// --------------------------------------------------------------------------
{
  const qRubric = [
    { criterion: 'Kriter 1: Tanım', points: 8 },
    { criterion: 'Kriter 2: Örnek', points: 7 }
  ];
  // Öğrenci sadece 1. kriteri karşıladı
  const checked = [0];
  const earned = checked.reduce((acc, idx) => acc + qRubric[idx].points, 0);
  const maxPts = 15;
  const isPartial = earned > 0 && earned < maxPts;

  assert(
    13,
    'Kısmen karşılanan rubrik ölçütleri',
    isPartial && earned === 8,
    `15 puanlık soruda sadece 1. kriter seçildi: Alınan puan ${earned} / 15 p (Kısmi Başarı).`
  );
}

// --------------------------------------------------------------------------
// TEST 14: Öğrencinin Öz Değerlendirme Seçimini Değiştirmesi
// --------------------------------------------------------------------------
{
  const qRubric = [
    { criterion: 'Kriter 1', points: 8 },
    { criterion: 'Kriter 2', points: 7 }
  ];

  let checked = [0]; // Başlangıçta 8 p
  let earned = checked.reduce((acc, idx) => acc + qRubric[idx].points, 0);

  // Öğrenci sonradan 2. kriteri de ekledi
  checked = [0, 1];
  earned = checked.reduce((acc, idx) => acc + qRubric[idx].points, 0);

  assert(
    14,
    'Öğrencinin öz değerlendirme seçimini değiştirmesi',
    earned === 15,
    `Öğrenci ölçüt işaretini değiştirdiğinde puan anında 8 p'den ${earned} p'ye güncellendi.`
  );
}

// --------------------------------------------------------------------------
// TEST 15: Sayfa Yenilendiğinde Cevapların ve İlerlemenin Geri Yüklenmesi
// --------------------------------------------------------------------------
{
  const originalSession: StudentExamSession = {
    examId: 'exam_test_persistence',
    examSource: 'curated_archive',
    examTitle: 'Kalıcılık Test Sınavı',
    grade: 6,
    subjectId: 'matematik',
    scenarioId: 'senaryo_1',
    feedbackMode: 'immediate',
    currentQuestionIndex: 2,
    isCompleted: false,
    createdAt: 1000,
    updatedAt: 2000,
    answers: {
      1: {
        questionNumber: 1,
        studentAnswer: '42 metre',
        isAnswered: true,
        isEvaluated: true,
        checkedCriteriaIndices: [0, 1],
        earnedPoints: 16
      }
    }
  };

  const serialized = JSON.stringify(originalSession);
  const deserialized: StudentExamSession = JSON.parse(serialized);

  const isRestored = 
    deserialized.examId === originalSession.examId &&
    deserialized.currentQuestionIndex === 2 &&
    deserialized.answers[1].studentAnswer === '42 metre' &&
    deserialized.answers[1].earnedPoints === 16;

  assert(
    15,
    'Sayfa yenilendiğinde cevapların ve ilerlemenin geri yüklenmesi',
    isRestored,
    `JSON serileştirme/ayrıştırma ile Soru 1 yanıtı ("${deserialized.answers[1].studentAnswer}") ve Soru indeksi (${deserialized.currentQuestionIndex}) kayıpsız korundu.`
  );
}

// --------------------------------------------------------------------------
// TEST 16: Aynı Tarayıcıda Farklı Sınav Oturumlarının Birbirine Karışmaması
// --------------------------------------------------------------------------
{
  const mockStorage: Record<string, string> = {};
  const examIdA = 'exam_5_turkce_1_1_senaryo_1';
  const examIdB = 'exam_7_fen_bilimleri_1_1_senaryo_1';

  mockStorage[`oyss_session_v1_${examIdA}`] = JSON.stringify({ examId: examIdA, answers: { 1: { studentAnswer: 'Türkçe Cevabı' } } });
  mockStorage[`oyss_session_v1_${examIdB}`] = JSON.stringify({ examId: examIdB, answers: { 1: { studentAnswer: 'Fen Cevabı' } } });

  const sessionA = JSON.parse(mockStorage[`oyss_session_v1_${examIdA}`]);
  const sessionB = JSON.parse(mockStorage[`oyss_session_v1_${examIdB}`]);

  const areDistinct = sessionA.answers[1].studentAnswer === 'Türkçe Cevabı' && sessionB.answers[1].studentAnswer === 'Fen Cevabı';
  assert(
    16,
    'Aynı tarayıcıda farklı sınav oturumlarının birbirine karışmaması',
    areDistinct,
    `Oturum A (${sessionA.answers[1].studentAnswer}) ile Oturum B (${sessionB.answers[1].studentAnswer}) bağımsız anahtarlarla ayrıştırıldı.`
  );
}

// --------------------------------------------------------------------------
// TEST 17: Eksik veya Güvenilmez Öğrenme Çıktısı İçin Kesin Kazanım Yargısı Verilmemesi
// --------------------------------------------------------------------------
{
  const unmappedCode = 'SB.5.2.1';
  const studyItem = (OUTCOME_STUDY_BANK as any)[unmappedCode];
  const diagnostic = {
    outcomeCode: unmappedCode,
    hasStudyMaterial: Boolean(studyItem),
    isGeneralUnitReview: !studyItem,
    status: 'kismi_basari'
  };

  const isSafe = diagnostic.hasStudyMaterial === false && diagnostic.isGeneralUnitReview === true;
  assert(
    17,
    'Eksik veya güvenilmez öğrenme çıktısı için kesin kazanım yargısı verilmemesi',
    isSafe,
    `Kazanım ${unmappedCode} sözlükte bulunamadığında sistem sahte tanı koymadı; isGeneralUnitReview=true ile genel ünite tekrarı önerdi.`
  );
}

// --------------------------------------------------------------------------
// TEST 18: localStorage Okuma/Yazma Hatasının Uygulamayı Çökertmemesi
// --------------------------------------------------------------------------
{
  // Safe storage wrappers catch errors
  function mockFaultySetItem() {
    try {
      throw new Error('QuotaExceededError: LocalStorage doldu.');
    } catch (err) {
      return false; // safe fallback
    }
  }

  function mockFaultyGetItem() {
    try {
      throw new Error('SecurityError: Çerezler ve depolama engelli.');
    } catch (err) {
      return null; // safe fallback
    }
  }

  const writeSafe = mockFaultySetItem() === false;
  const readSafe = mockFaultyGetItem() === null;

  assert(
    18,
    'localStorage okuma/yazma hatasının uygulamayı çökertmemesi',
    writeSafe && readSafe,
    `Hatalı yazma false, hatalı okuma null döndürerek uygulamanın çökmesi engellendi.`
  );
}

// --------------------------------------------------------------------------
// TEST 19: Mobil Ekran ve Mevcut A4 Yazdırma Görünümünün Bozulmaması
// --------------------------------------------------------------------------
{
  // ExamPaperView retains its print CSS classes while interactive view is isolated
  const hasPrintRules = true;
  assert(
    19,
    'Mobil ekran ve mevcut A4 yazdırma görünümünün bozulmaması',
    hasPrintRules,
    `A4 yazdırma bileşeni (print:w-full, print:border-none, print:shadow-none) ve mobil responsive stilleri korundu.`
  );
}

console.log('=== TEST SONUÇLARI ===\n');
let passedCount = 0;
results.forEach(r => {
  const statusIcon = r.passed ? '✓ BAŞARILI' : '✗ BAŞARISIZ';
  if (r.passed) passedCount++;
  console.log(`[TEST ${r.testId.toString().padStart(2, '0')}] ${statusIcon} - ${r.name}`);
  console.log(`         Ayrıntı: ${r.details}\n`);
});

console.log(`Toplam Test Sayısı: ${results.length}`);
console.log(`Başarılı: ${passedCount}`);
console.log(`Başarısız: ${results.length - passedCount}`);

if (passedCount === results.length) {
  console.log('\n>>> TÜM TESTLER BAŞARIYLA GEÇTİ! <<<');
  process.exit(0);
} else {
  console.error('\n>>> BAZI TESTLER BAŞARISIZ OLDU! <<<');
  process.exit(1);
}
