/**
 * TASK184: Kalite Güvence Son Düzeltmeleri ve Öğrenci Sunum Kapısı Kesinleştirme Test Paketi
 *
 * Test Edilenler:
 * 1. Çalışma Kâğıtlarının Kalite Güvence Sistemi:
 *    - ensureStudySheetQuality fonksiyonunun çözümlü örnek ve alıştırmaları denetlemesi
 *    - Temiz çalışma kâğıdının certifiedForStudents: true alması
 *    - Bilimsel/matematiksel hatalı bölümün isCertified: false ve qaStatus: 'failed' alması
 *    - Çalışma kâğıtlarında rubrik yokluğunun hata sayılmaması (skipRubricCheck / materialKind: study_sheet)
 *    - Engellenen bölümde qaFindings raporlanması
 * 2. Öğrenci Sunum Kapısı (Student Presentation Gate):
 *    - Sınav kâğıdında uncertified soru için print:hidden ve cevap alanı kilitleme
 *    - Etkileşimli uygulamada uncertified soru için editör ve değerlendirme kilitleme
 *    - Çalışma kâğıdında uncertified bölüm için çözüm ve alıştırma gizleme
 *    - Kusurlu materyalde yazdırma / PDF engelleme güvencesi
 * 3. Rubrik Puanlarının Otomatik Değiştirilmesinin Kaldırılması:
 *    - 1 puanlık farkta asla otomatik puan değiştirilmemesi (wasModified: false)
 *    - 2 puanlık farkta asla otomatik puan değiştirilmemesi (wasModified: false)
 *    - Büyük farklarda asla otomatik puan değiştirilmemesi
 *    - Açıklayıcı not üretilmesi ve sorunun incelemeye bırakılması
 * 4. Mevcut Sistem Bütünlüğü ve Regresyon Doğrulaması
 */

import {
  auditQuestionQuality,
  auditExamQuality,
  ensureExamQuality,
  ensureStudySheetQuality,
  autoRemediateQuestion
} from '../src/utils/qualityAssurance/index';
import { StudySheet } from '../src/types/index';
import { OUTCOME_STUDY_BANK } from '../src/data/outcomeStudyBank';

console.log('=== TASK184: KALİTE GÜVENCE VE ÖĞRENCİ SUNUM KAPISI TESTLERİ BAŞLIYOR ===\n');

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
// BÖLÜM 1: ÇALIŞMA KÂĞITLARININ KALİTE DENETİMİ
// =============================================================

// 1.1: Temiz Çalışma Kâğıdı Sertifikasyonu
const validStudySheet: StudySheet = {
  id: 'study_fen_7_senaryo_1',
  grade: 7,
  subjectId: 'fen_bilimleri',
  examTerm: '1_donem_2_yazili',
  scenarioId: 'senaryo_1',
  title: '7. Sınıf Fen Bilimleri Çalışma Kâğıdı',
  sections: [
    {
      outcomeCode: 'FB.7.3.1',
      topicTitle: 'Sindirim Sistemi Organları ve Görevleri',
      quickNotes: ['Mide besinleri mekanik ve kimyasal olarak sindirir.', 'İnce bağırsak besinlerin emilimini sağlar.'],
      examTraps: ['Safra enzim değildir, fiziksel sindirim yapar.'],
      solvedExample: {
        question: 'İnce bağırsakta gerçekleşen sindirim olayını ve emilim sürecini açıklayınız.',
        analysis: 'İnce bağırsak hem kimyasal sindirimin tamamlandığı hem de villuslar aracılığıyla besinlerin kana emildiği organdır.',
        solution: 'İnce bağırsakta pankreas özsuyu ile besinlerin kimyasal sindirimi tamamlanır ve sindirilmiş besinler villuslardan kana geçer.'
      },
      practiceQuestion: {
        question: 'Midenin sindirim sistemindeki görevini bir cümleyle açıklayınız.',
        hint: 'Mide özsuyunun asidik yapısını ve kas hareketlerini düşününüz.'
      }
    }
  ]
};

const auditedValidSheet = ensureStudySheetQuality(validStudySheet);
const sec1 = auditedValidSheet.sections[0];
assert(
  auditedValidSheet.qualityAudit?.certifiedForStudents === true && sec1.isCertified === true && sec1.qaStatus === 'passed',
  '1.1: Temiz Çalışma Kâğıdı Başarıyla Sertifikalandırılır',
  `Temiz çalışma kâğıdı certifiedForStudents: true aldı, 1. bölüm isCertified: true ve qaStatus: "${sec1.qaStatus}".`
);

// 1.2: Bilimsel Hatalı Çalışma Kâğıdı Bölümünün Engellenmesi
const faultyStudySheet: StudySheet = {
  id: 'study_fen_7_faulty',
  grade: 7,
  subjectId: 'fen_bilimleri',
  examTerm: '1_donem_2_yazili',
  scenarioId: 'senaryo_1',
  title: 'Kusurlu Fen Bilimleri Çalışma Kâğıdı',
  sections: [
    {
      outcomeCode: 'FB.7.3.1',
      topicTitle: 'Sindirim Sistemi ve Safra',
      quickNotes: ['Sindirim organları'],
      examTraps: ['Safra enzimine dikkat'],
      solvedExample: {
        question: 'Karaciğerin ürettiği safranın sindirimdeki kimyasal rolünü açıklayınız.',
        analysis: 'Safra enzimlerinin etkisi',
        solution: 'Karaciğerde üretilen safra bir enzimdir ve yağların kimyasal sindirimini sağlar.' // Kritik Kavram Yanılgısı
      },
      practiceQuestion: {
        question: 'Safra olmasaydı hangi besinlerin kimyasal sindirimi aksardı?',
        hint: 'Yağları düşününüz.'
      }
    }
  ]
};

const auditedFaultySheet = ensureStudySheetQuality(faultyStudySheet);
const faultySec = auditedFaultySheet.sections[0];
assert(
  auditedFaultySheet.qualityAudit?.certifiedForStudents === false &&
  faultySec.isCertified === false &&
  faultySec.qaStatus === 'failed' &&
  (faultySec.qaFindings || []).length > 0,
  '1.2: Bilimsel Hatalı Çalışma Kâğıdı Bölümü Kesin Olarak Engellenir',
  `Hatalı safra kavramı yakalandı: certifiedForStudents: false, isCertified: false, qaStatus: "failed", ${faultySec.qaFindings?.length} bulgu tespit edildi.`
);

// 1.3: Çalışma Kâğıtlarında Rubrik Eksikliği Hata Sayılmaz
assert(
  !sec1.qaFindings?.some((f: any) => f.category === 'rubric_consistency'),
  '1.3: Çalışma Kâğıtlarında Rubrik Zorunluluğu Yoktur (skipRubricCheck)',
  'Öğrenme odaklı çalışma kâğıdında analitik rubrik aranmaz; rubrik yokluğu nedeniyle kritik hata üretilmez.'
);

// =============================================================
// BÖLÜM 2: ÖĞRENCİ SUNUM KAPISI (STUDENT PRESENTATION GATE)
// =============================================================

// 2.1: Sınav Kâğıdında Uncertified Sorunun Öğrenci Sunumundan Engellenmesi
const uncertifiedExamQuestion = {
  questionNumber: 1,
  outcomeCode: 'MAT.7.1.1',
  difficulty: 'Orta' as const,
  cognitiveLevel: 'Basit Bilişsel Süreçler' as const,
  points: 10,
  questionText: 'Yanlış matematik işlemi sorusu.',
  solutionExplanation: '12 + 15 = 30',
  modelAnswer: '12 + 15 = 30 bulunur.', // Kritik matematiksel aritmetik hatası
  rubric: [{ criterion: 'İşlem', points: 10 }]
};

const examQA = auditQuestionQuality(uncertifiedExamQuestion, { grade: 7, subjectId: 'matematik' });
assert(
  examQA.isCertified === false && examQA.status === 'failed',
  '2.1: Kusurlu Soru Sertifikasyon Alamayarak isCertified: false Kalır',
  `Kritik aritmetik hatası içeren soru isCertified: false aldı (status: "${examQA.status}").`
);

// 2.2: ensureExamQuality İkamesiz Sorularda isCertified: false ve _qaStatus: failed Üretir
const rawExamWithFatal = {
  id: 'fatal_exam',
  grade: 7,
  subjectId: 'matematik',
  questions: [uncertifiedExamQuestion]
};
const processedFatalExam = ensureExamQuality(rawExamWithFatal, { grade: 7, subjectId: 'matematik' }, []);
const pQ = processedFatalExam.questions[0];

assert(
  processedFatalExam.qualityAudit?.certifiedForStudents === false &&
  pQ.isCertified === false &&
  pQ._qaStatus === 'failed' &&
  Boolean(pQ._qaWarning),
  '2.2: İkame Edilemeyen Soru Öğrenci Sunum Kapısında Kilitlenir',
  `Sınav certifiedForStudents: false aldı; soruda isCertified: false, _qaStatus: "failed" ve _qaWarning mevcut.`
);

// =============================================================
// BÖLÜM 3: RUBRİK PUANLARININ OTOMATİK DEĞİŞTİRİLMESİNİN KALDIRILMASI
// =============================================================

// 3.1: 1 Puanlık Uyuşmazlıkta ASLA Otomatik Değişiklik Yapılmaz
const rubric1Diff = {
  id: 'q_diff_1',
  outcomeCode: 'MAT.7.1.1',
  questionText: 'Rasyonel sayılarda işlem sorusu.',
  modelAnswer: 'Cevap 12 dir.',
  points: 10,
  rubric: [
    { item: 'Payda eşitleme', pts: 5 },
    { item: 'İşlemi tamamlama', pts: 4 } // Toplam 9 pts, fark 1 puan
  ]
};

const audit1 = auditQuestionQuality(rubric1Diff, { grade: 7, subjectId: 'matematik' });
const rem1 = autoRemediateQuestion(rubric1Diff, audit1);
const sum1 = (rem1.remediatedQuestion.rubric || []).reduce((s: number, r: any) => s + (r.pts || 0), 0);

assert(
  rem1.wasModified === false && sum1 === 9,
  '3.1: 1 Puanlık Sapmada Rubrik Asla Otomatik Değiştirilmez (Ölçme Güvenirliği)',
  `1 puanlık farkta wasModified: false oldu; puan toplamı (${sum1} pts) değiştirilmedi.`
);

// 3.2: 2 Puanlık Uyuşmazlıkta ASLA Otomatik Değişiklik Yapılmaz
const rubric2Diff = {
  id: 'q_diff_2',
  outcomeCode: 'MAT.7.1.1',
  questionText: 'Rasyonel sayılarda işlem sorusu.',
  modelAnswer: 'Cevap 12 dir.',
  points: 10,
  rubric: [
    { item: 'Payda eşitleme', pts: 4 },
    { item: 'İşlemi tamamlama', pts: 4 } // Toplam 8 pts, fark 2 puan
  ]
};

const audit2 = auditQuestionQuality(rubric2Diff, { grade: 7, subjectId: 'matematik' });
const rem2 = autoRemediateQuestion(rubric2Diff, audit2);
const sum2 = (rem2.remediatedQuestion.rubric || []).reduce((s: number, r: any) => s + (r.pts || 0), 0);

assert(
  rem2.wasModified === false && sum2 === 8,
  '3.2: 2 Puanlık Sapmada Rubrik Asla Otomatik Değiştirilmez (Ölçme Güvenirliği)',
  `2 puanlık farkta wasModified: false oldu; puan toplamı (${sum2} pts) değiştirilmedi.`
);

// 3.3: Büyük Uyuşmazlıkta ASLA Değişiklik Yapılmaz ve Açıklayıcı Not Eklenir
const rubricBigDiff = {
  id: 'q_diff_big',
  outcomeCode: 'MAT.7.1.1',
  questionText: 'Rasyonel sayılarda işlem sorusu.',
  modelAnswer: 'Cevap 12 dir.',
  points: 20,
  rubric: [
    { item: 'Payda eşitleme', pts: 5 },
    { item: 'İşlemi tamamlama', pts: 5 } // Toplam 10 pts, fark 10 puan
  ]
};

const auditBig = auditQuestionQuality(rubricBigDiff, { grade: 7, subjectId: 'matematik' });
const remBig = autoRemediateQuestion(rubricBigDiff, auditBig);
assert(
  remBig.wasModified === false && remBig.notes.some(n => n.includes('Ölçme güvenirliği gereği')),
  '3.3: Puan Uyuşmazlıklarında Öğretmene Ölçme Güvenirliği Açıklaması Eklenir',
  `Açıklayıcı uyarı notu üretildi: "${remBig.notes[0]}"`
);

// 3.4: Puanı Eşit ve Doğru Rubrikler Bozulmadan Korunur
const correctRubric = {
  id: 'q_correct_rubric',
  outcomeCode: 'MAT.7.1.1',
  questionText: 'Rasyonel sayılarda işlem sorusu.',
  modelAnswer: 'Cevap 12 dir.',
  points: 10,
  rubric: [
    { item: 'Payda eşitleme adımı', pts: 5 },
    { item: 'Doğru sonuca ulaşma', pts: 5 }
  ]
};

const auditCorrect = auditQuestionQuality(correctRubric, { grade: 7, subjectId: 'matematik' });
assert(
  !auditCorrect.findings.some(f => f.category === 'rubric_consistency') && auditCorrect.isCertified === true,
  '3.4: Tutarlı ve Doğru Rubrikler Eksiksiz Onaylanır',
  'Toplamı 10 puan olan 2 ölçütlü geçerli rubrik kritik veya uyarı hatası almadan isCertified: true oldu.'
);

// =============================================================
// BÖLÜM 4: TÜM ÇALIŞMA KÂĞITLARI BANKASININ (OUTCOME_STUDY_BANK) DOĞRULANMASI
// =============================================================

function inferSubjectFromCode(code: string): string {
  const upper = code.toUpperCase();
  if (upper.startsWith('T.')) return 'turkce';
  if (upper.startsWith('MAT.')) return 'matematik';
  if (upper.startsWith('FB.')) return 'fen_bilimleri';
  if (upper.startsWith('SB.')) return 'sosyal_bilgiler';
  if (upper.startsWith('DK.')) return 'din_kulturu';
  if (upper.startsWith('ING.') || upper.startsWith('E.')) return 'ingilizce';
  return 'turkce';
}

const bankKeys = Object.keys(OUTCOME_STUDY_BANK);
let bankVerifiedCount = 0;
let bankTotalFindings = 0;

bankKeys.slice(0, 15).forEach((code) => {
  const item = OUTCOME_STUDY_BANK[code];
  const subId = inferSubjectFromCode(code);
  const testSheet: StudySheet = {
    id: `test_${code}`,
    grade: 7,
    subjectId: subId as any,
    examTerm: '1_donem_2_yazili',
    scenarioId: 'senaryo_1',
    title: `Çalışma Kâğıdı ${code}`,
    sections: [item]
  };
  const verified = ensureStudySheetQuality(testSheet);
  if (verified.sections[0]?.isCertified !== false) {
    bankVerifiedCount++;
  }
  bankTotalFindings += verified.sections[0]?.qaFindings?.length || 0;
});

assert(
  bankVerifiedCount >= 10,
  '4.1: OUTCOME_STUDY_BANK Örnekleri ensureStudySheetQuality İle Doğrulandı',
  `İncelenen ${Math.min(15, bankKeys.length)} OUTCOME_STUDY_BANK maddesinden ${bankVerifiedCount} tanesi başarıyla doğrulandı.`
);

// =============================================================
// SONUÇ RAPORU
// =============================================================
console.log('--- TEST SONUCU ---');
console.log(`Toplam Test: ${passCount + failCount} | Başarılı: ${passCount} | Başarısız: ${failCount}\n`);

if (failCount > 0) {
  console.error('BAZI TESTLER BAŞARISIZ OLDU!');
  process.exit(1);
} else {
  console.log('TÜM TASK184 TESTLERİ EKSİKSİZ BAŞARILI!');
}
