/**
 * TASK182: Evrensel Soru Kalite Güvence Sistemi - Kapsamlı Test Paketi
 *
 * Test edilen modüller:
 * - src/utils/qualityAssurance/index.ts
 * - src/utils/qualityAssurance/types.ts
 * - src/utils/qualityAssurance/commonValidators.ts
 * - src/utils/qualityAssurance/remediationEngine.ts
 * - src/utils/qualityAssurance/validators/*.ts
 * - src/utils/aiGeneratorEngine.ts (QA pipeline entegrasyonu)
 */

import {
  auditQuestionQuality,
  auditExamQuality,
  ensureExamQuality,
  autoRemediateQuestion,
  remediateExamQuality,
  validateMathQuestion,
  validateScienceQuestion,
  validateTurkishQuestion,
  validateSocialQuestion,
  validateDinQuestion,
  validateEnglishQuestion
} from '../src/utils/qualityAssurance/index';

console.log('=== TASK182: EVRENSEL SORU KALİTE GÜVENCE SİSTEMİ TESTLERİ BAŞLIYOR ===\n');

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string, detail: string) {
  if (condition) {
    console.log(`[TEST] ✓ BAŞARILI - ${testName}`);
    console.log(`       Ayrıntı: ${detail}\n`);
    passCount++;
  } else {
    console.error(`[TEST] ✗ BAŞARISIZ - ${testName}`);
    console.error(`       Hata: ${detail}\n`);
    failCount++;
  }
}

// -------------------------------------------------------------
// TEST SENARYOSU 1: Matematik Hatalı İşlem / Mantık Tespiti
// -------------------------------------------------------------
const faultyMathQuestion = {
  id: 1,
  outcomeCode: 'MAT.7.1.1',
  questionText: 'Bir manavdaki elma ve armutların toplamı soruluyor. 12 kg elma ve 15 kg armut alan müşteri toplam kaç kg meyve almıştır?',
  modelAnswer: '12 + 15 = 30 kg meyve almıştır.',
  points: 10,
  rubric: [
    { item: 'Toplama işlemini doğru kurma', pts: 5 },
    { item: 'Sonucu 30 kg bulma', pts: 5 }
  ]
};

const mathFindings = validateMathQuestion(faultyMathQuestion, {
  grade: 7,
  subject: 'Matematik',
  questionIndex: 0,
  totalQuestions: 1
});

const mathArithmeticError = mathFindings.find(f => f.category === 'scientific_correctness' && f.severity === 'critical');
assert(
  Boolean(mathArithmeticError),
  'Senaryo 1: Matematik Yanlış Aritmetik Hesap Tespiti',
  `"12 + 15 = 30" kritik hata olarak yakalandı: "${mathArithmeticError?.message || ''}"`
);

// -------------------------------------------------------------
// TEST SENARYOSU 2: Fen Bilimleri Bilimsel Yanılgı Tespiti
// -------------------------------------------------------------
const faultyScienceQuestion1 = {
  id: 2,
  outcomeCode: 'FB.7.3.1',
  questionText: 'Dünya ve Ay üzerindeki kütle ve ağırlık ilişkisini açıklayınız.',
  modelAnswer: 'Cismin kütlesi dinamometre ile ölçülür ve Ay yüzeyinde kütle azalır.',
  points: 10,
  rubric: [
    { item: 'Kütlenin dinamometre ile ölçüldüğünü belirtme', pts: 5 },
    { item: 'Ayda kütlenin azaldığını yazma', pts: 5 }
  ]
};

const scienceFindings1 = validateScienceQuestion(faultyScienceQuestion1, {
  grade: 7,
  subject: 'Fen Bilimleri',
  questionIndex: 0,
  totalQuestions: 1
});

const massError = scienceFindings1.find(f => f.category === 'scientific_correctness' && f.severity === 'critical');
assert(
  Boolean(massError),
  'Senaryo 2A: Fen Bilimleri Kütle-Dinamometre Kavram Yanılgısı',
  `Kütlenin dinamometre ile ölçüldüğü iddiası kritik hata olarak tespit edildi: "${massError?.message || ''}"`
);

const faultyScienceQuestion2 = {
  id: 3,
  outcomeCode: 'FB.7.2.2',
  questionText: 'Mitoz bölünmenin özelliklerini açıklayınız.',
  modelAnswer: 'Mitoz bölünme sonucunda 4 yeni hücre oluşur ve kromozom sayısı yarıya iner.',
  points: 10,
  rubric: [{ item: 'Mitoz özelliklerini yazma', pts: 10 }]
};

const scienceFindings2 = validateScienceQuestion(faultyScienceQuestion2, {
  grade: 7,
  subject: 'Fen Bilimleri',
  questionIndex: 1,
  totalQuestions: 2
});

const mitosisError = scienceFindings2.find(f => f.category === 'scientific_correctness' && f.severity === 'critical');
assert(
  Boolean(mitosisError),
  'Senaryo 2B: Fen Bilimleri Mitoz-Mayoz Karışıklığı Tespiti',
  `Mitozda 4 hücre oluştuğu iddiası kritik hata olarak tespit edildi: "${mitosisError?.message || ''}"`
);

// -------------------------------------------------------------
// TEST SENARYOSU 3: Türkçe Metin Bağımsızlığı / Eksik Metin Tespiti
// -------------------------------------------------------------
const faultyTurkishQuestion = {
  id: 4,
  outcomeCode: 'T.7.3.1',
  questionText: 'Metnin ana fikrini ve yazarın metindeki anlatım tutumunu açıklayınız.',
  modelAnswer: 'Yazar insanın doğayla barışık yaşaması gerektiğini savunmaktadır.',
  points: 10,
  rubric: [{ item: 'Ana fikri yazma', pts: 10 }]
};

const turkishFindings = validateTurkishQuestion(faultyTurkishQuestion, {
  grade: 7,
  subject: 'Türkçe',
  questionIndex: 0,
  totalQuestions: 1
});

const readingTextError = turkishFindings.find(f => f.category === 'answerability' && f.severity === 'critical');
assert(
  Boolean(readingTextError),
  'Senaryo 3: Türkçe Metne Dayalı Soruda Metin Yokluğu Tespiti',
  `Metin bağımlı soruda metin/pasaj bulunmaması kritik hata olarak yakalandı: "${readingTextError?.message || ''}"`
);

// -------------------------------------------------------------
// TEST SENARYOSU 4: Sosyal Bilgiler Kronoloji ve Anakronizm Tespiti
// -------------------------------------------------------------
const faultySocialQuestion = {
  id: 5,
  outcomeCode: 'SB.8.2.1',
  questionText: 'Milli Mücadele Dönemi meclis faaliyetlerini açıklayınız.',
  modelAnswer: 'TBMM 1918 yılında açılarak Milli Mücadele’nin yönetim merkezi olmuştur.',
  points: 10,
  rubric: [{ item: 'TBMM açılışını açıklama', pts: 10 }]
};

const socialFindings = validateSocialQuestion(faultySocialQuestion, {
  grade: 8,
  subject: 'Sosyal Bilgiler',
  questionIndex: 0,
  totalQuestions: 1
});

const tbmmError = socialFindings.find(f => f.category === 'scientific_correctness' && f.severity === 'critical');
assert(
  Boolean(tbmmError),
  'Senaryo 4: Sosyal Bilgiler Anakronizm (TBMM 1918) Tespiti',
  `TBMM'nin 1918'de açıldığı yanılgısı kritik kronoloji hatası olarak yakalandı: "${tbmmError?.message || ''}"`
);

// -------------------------------------------------------------
// TEST SENARYOSU 5: Din Kültürü Fıkhi / İtikadi Hata Tespiti
// -------------------------------------------------------------
const faultyDinQuestion = {
  id: 6,
  outcomeCode: 'DK.8.2.1',
  questionText: 'Zekât ibadeti kimlere verilebilir? Açıklayınız.',
  modelAnswer: 'Kişi zekâtını anne, baba, eş ve çocuklarına öncelikle vermelidir. Altın için zekat oranı 1/10 olarak uygulanır.',
  points: 10,
  rubric: [{ item: 'Zekat verilecek kişileri yazma', pts: 10 }]
};

const dinFindings = validateDinQuestion(faultyDinQuestion, {
  grade: 8,
  subject: 'Din Kültürü ve Ahlak Bilgisi',
  questionIndex: 0,
  totalQuestions: 1
});

const zakatRecipientError = dinFindings.find(f => f.message.includes('anne, baba'));
const zakatRatioError = dinFindings.find(f => f.message.includes('1/40') || f.message.includes('%2,5'));
assert(
  Boolean(zakatRecipientError) && Boolean(zakatRatioError),
  'Senaryo 5: Din Kültürü Zekat Kimlere Verilmez ve Zekat Oranı Hataları',
  `Zekatın anne/babaya verilemeyeceği ve altın için 1/40 yerine 1/10 yazılamayacağı doğrulandı.`
);

// -------------------------------------------------------------
// TEST SENARYOSU 6: İngilizce Hedef Dil ve Wh- Soru Uyumu
// -------------------------------------------------------------
const faultyEnglishQuestion = {
  id: 7,
  outcomeCode: 'E.7.1.1',
  questionText: 'Where does Jack spend his summer holidays?',
  modelAnswer: 'Jack yaz tatilini Antalya\'da ailesiyle birlikte geçirir.',
  points: 10,
  rubric: [{ item: 'Cevabı yazma', pts: 10 }]
};

const englishFindings = validateEnglishQuestion(faultyEnglishQuestion, {
  grade: 7,
  subject: 'İngilizce',
  questionIndex: 0,
  totalQuestions: 1
});

const targetLangError = englishFindings.find(f => f.category === 'scientific_correctness' && f.severity === 'critical');
assert(
  Boolean(targetLangError),
  'Senaryo 6: İngilizce Soruda Türkçe Cevap Tespiti',
  `İngilizce sınavında model cevabın Türkçe verilmesi kritik dil hatası olarak yakalandı: "${targetLangError?.message || ''}"`
);

// -------------------------------------------------------------
// TEST SENARYOSU 7: Rubrik Puan Toplamı Uyuşmazlığı ve Otomatik Onarım
// -------------------------------------------------------------
const mismatchedRubricQuestion = {
  id: 8,
  outcomeCode: 'MAT.7.2.1',
  questionText: 'Bir denklem çözümü sorusu.',
  modelAnswer: 'x = 5 bulunur.',
  points: 15,
  rubric: [
    { item: 'Denklemi kurma', pts: 5 },
    { item: 'Bilinmeyeni yalnız bırakma', pts: 4 },
    { item: 'Doğru sonuca ulaşma', pts: 4 } // Toplam 13 pts != 15 pts
  ]
};

const auditRes = auditQuestionQuality(mismatchedRubricQuestion, {
  grade: 7,
  subject: 'Matematik',
  questionIndex: 0,
  totalQuestions: 1
});

const rubricMismatchFinding = auditRes.findings.find(f => f.category === 'rubric_consistency');
assert(
  Boolean(rubricMismatchFinding),
  'Senaryo 7A: Rubrik Puan Toplamı Tutarsızlığı Tespiti',
  `Rubrik toplamı (13) ile soru puanı (15) farkı tespit edildi: "${rubricMismatchFinding?.message || ''}"`
);

// Otomatik onarımı test et: TASK184 gereği puanlar ASLA otomatik değiştirilmez
const remediated = autoRemediateQuestion(mismatchedRubricQuestion, auditRes);
const repairedSum = (remediated.remediatedQuestion.rubric || []).reduce((s: number, r: any) => s + (r.pts || 0), 0);
assert(
  repairedSum === 13 && remediated.wasModified === false,
  'Senaryo 7B: Ölçme Güvenirliği Korunur (Puanlar Otomatik Değiştirilmez)',
  `Fark 2 puan olmasına rağmen ölçme güvenirliği gereği rubrik puanları değiştirilmedi (${repairedSum} puan korundu).`
);

// -------------------------------------------------------------
// TEST SENARYOSU 8: Öğrenci Sertifikasyon Kapısı (Gatekeeping)
// -------------------------------------------------------------
const examWithFatalQuestion = {
  id: 'test-exam-1',
  title: '7. Sınıf Fen Bilimleri 1. Dönem 2. Yazılı',
  subject: 'Fen Bilimleri',
  grade: 7,
  questions: [
    {
      id: 1,
      outcomeCode: 'FB.7.3.1',
      questionText: 'Kütle ve ağırlığı karşılaştırınız.',
      modelAnswer: 'Kütle dinamometre ile ölçülür ve Ayda azalır.', // Kritik bilimsel yanılgı
      points: 100,
      rubric: [{ item: 'Kütleyi dinamometreyle ölçme', pts: 100 }]
    }
  ]
};

const examAudit = auditExamQuality(examWithFatalQuestion);
assert(
  examAudit.certifiedForStudents === false && examAudit.overallStatus === 'failed',
  'Senaryo 8: Kritik Hatalı Sınavın Öğrenci Sertifikasyonunu Engellemesi',
  `Kritik bilimsel yanılgı içeren sınavın certifiedForStudents değeri false ve overallStatus değeri "failed" oldu.`
);

// -------------------------------------------------------------
// TEST SENARYOSU 9: ensureExamQuality İle Uçtan Uca Kalite Güvencesi
// -------------------------------------------------------------
const rawExam = {
  id: 'test-exam-2',
  title: '7. Sınıf Matematik Sınavı',
  subject: 'Matematik',
  grade: 7,
  questions: [
    {
      id: 1,
      outcomeCode: 'MAT.7.1.1',
      questionText: 'Rasyonel sayılarda toplama işlemini gösteriniz.',
      modelAnswer: '1/2 + 1/4 = 3/4 bulunur.',
      points: 10,
      rubric: [
        { item: 'Paydaları eşitleme', pts: 5 },
        { item: 'Toplama sonucunu yazma', pts: 4 } // Toplam 9 pts, soru 10 pts
      ]
    }
  ]
};

const certifiedExam = ensureExamQuality(rawExam);
const certifiedQ1 = certifiedExam.questions[0];
const certifiedQ1Sum = (certifiedQ1.rubric || []).reduce((s: number, r: any) => s + (r.pts || 0), 0);

assert(
  certifiedExam.qualityAudit !== undefined && certifiedQ1Sum === 9 && certifiedQ1.isCertified === false,
  'Senaryo 9: ensureExamQuality Uçtan Uca Sertifikasyon ve Ölçme Korunumu',
  `ensureExamQuality sınavı denetledi, kalite raporu ekledi, rubrik puanını (9 pts) bozmadı ve soruyu sertifikasız (isCertified: false) olarak işaretledi.`
);

// -------------------------------------------------------------
// TEST SENARYOSU 10: 6 Dersin Tamamında Özel Doğrulayıcıların Aktifliği
// -------------------------------------------------------------
const subjects = [
  'Türkçe',
  'Matematik',
  'Fen Bilimleri',
  'Sosyal Bilgiler',
  'Din Kültürü ve Ahlak Bilgisi',
  'İngilizce'
];

let allSubjectsPass = true;
for (const sub of subjects) {
  const sampleQ = {
    id: 1,
    outcomeCode: 'GEN.1.1',
    questionText: `${sub} dersi örnek test sorusu detaylı açıklamasıyla birlikte verilmiştir.`,
    modelAnswer: `${sub} sorusunun kavramsal gerekçeli model cevabı.`,
    points: 10,
    rubric: [{ item: 'Model cevabı eksiksiz ve gerekçeli yazma', pts: 10 }]
  };
  const res = auditQuestionQuality(sampleQ, {
    grade: 7,
    subject: sub,
    questionIndex: 0,
    totalQuestions: 1
  });
  if (res.findings.some(f => f.severity === 'critical')) {
    allSubjectsPass = false;
  }
}

assert(
  allSubjectsPass,
  'Senaryo 10: 6 Temel Dersin Tamamında Güvence Motorunun Doğru Çalışması',
  `Türkçe, Matematik, Fen, Sosyal, Din ve İngilizce branşlarının tamamında doğrulayıcılar hatasız yürütüldü.`
);

// -------------------------------------------------------------
// ÖZET VE SONUÇ
// -------------------------------------------------------------
console.log('--- TEST SONUCU ---');
console.log(`Toplam Test: ${passCount + failCount} | Başarılı: ${passCount} | Başarısız: ${failCount}`);

if (failCount > 0) {
  console.error('\nBAZI TESTLER BAŞARISIZ OLDU!');
  process.exit(1);
} else {
  console.log('\nTÜM TASK182 TESTLERİ EKSİKSİZ BAŞARILI!');
  process.exit(0);
}
