import assert from 'node:assert';
import { auditQuestionQuality } from '../src/utils/qualityAssurance';
import { sanitizeExamQuestion } from '../src/utils/qualityAssurance/presentationContentFilter';
import type { ExamQuestion } from '../src/types';

let passedCount = 0;
let totalCount = 0;

function check(condition: boolean, msg: string) {
  totalCount++;
  if (condition) {
    passedCount++;
    console.log(`  ✓ ${msg}`);
  } else {
    console.error(`  ✗ FAIL: ${msg}`);
    throw new Error(`Assertion failed: ${msg}`);
  }
}

console.log('--- TASK210: 7. Sınıf Fen Bilimleri 4. Soru Kalite Güvence ve Sindirim Testleri ---\n');

const contextFen7 = { subjectId: 'fen_bilimleri', grade: 7 };

// 7. Sınıf FB.7.3.1 - Soru 4: Ağız, mide ve ince bağırsakta mekanik ve kimyasal sindirim
const validQuestion4: any = {
  questionNumber: 4,
  outcomeCode: 'FB.7.3.1',
  topic: 'Sindirim Sistemi',
  archetype: 'Kurgusal Senaryo',
  difficulty: 'Orta',
  cognitiveLevel: 'Kavrama',
  questionText: 'Bir öğrenci sindirim sisteminde besinlerin uğradığı değişimleri araştırmak için ağız, mide ve ince bağırsakta gerçekleşen mekanik ve kimyasal sindirim olaylarını özetleyen bir tablo hazırlamıştır.',
  stimulus: 'Öğrencinin hazırladığı tabloda ağızda dişler yardımıyla mekanik sindirim ve tükürük sıvısıyla kimyasal sindirim; midede kas hareketleriyle mekanik sindirim ve mide öz suyu ile kimyasal sindirim; ince bağırsakta ise safra sıvısı ile mekanik sindirim ve pankreas öz suyu ile kimyasal sindirim gerçekleştiği belirtilmektedir.',
  modelAnswer: 'Ağızda karbonhidratların kimyasal sindirimi tükürük ile başlar, dişler mekanik sindirim yapar. Midede proteinlerin kimyasal sindirimi mide öz suyu ile başlar, mide kasları mekanik sindirim sağlar. İnce bağırsakta safra sıvısı yağların mekanik sindirimini sağlarken, pankreastan salgılanan pankreas öz suyu yağ, protein ve karbonhidratların kimyasal sindirimini tamamlar.',
  acceptableAlternatives: [
    'Safra sıvısı karaciğerde üretilir ve ince bağırsakta yağları küçük damlacıklara ayırarak mekanik sindirim yapar; kimyasal sindirimi ise pankreas öz suyu gerçekleştirir.'
  ],
  solutionSteps: [
    '1. Ağızdaki mekanik ve kimyasal sindirim incelenir.',
    '2. Midedeki mekanik ve kimyasal sindirim değerlendirilir.',
    '3. İnce bağırsakta safranın mekanik sindirim, pankreas öz suyunun kimyasal sindirim görevi ayırt edilir.'
  ],
  rubric: [
    { criterion: 'Ağız, mide ve ince bağırsaktaki sindirim türlerini eksiksiz açıklama', points: 4 },
    { criterion: 'Safra sıvısının mekanik, pankreas öz suyunun kimyasal sindirim yaptığını doğru belirtme', points: 4 },
    { criterion: 'Bilimsel kavramları yerinde kullanma', points: 2 }
  ]
};

// 1. Soru 4 Kalite Kontrolü
const reportQ4 = auditQuestionQuality(validQuestion4, contextFen7);
check(reportQ4.status === 'passed', `1. Soru 4 kalite raporu durumu 'passed' olmalı (aldı: ${reportQ4.status})`);
check(reportQ4.isCertified === true, '2. Soru 4 isCertified true olmalı');
check(reportQ4.findings.length === 0, `3. Soru 4'te hiçbir QA bulgusu olmamalı (bulunan: ${reportQ4.findings.length})`);

// 2. Sunum Filtresi Kontrolü
const certifiedQ4 = {
  ...validQuestion4,
  isCertified: reportQ4.isCertified,
  _qaStatus: reportQ4.status
} as ExamQuestion;
const sanitizedQ4 = sanitizeExamQuestion(certifiedQ4);
check(
  sanitizedQ4.questionText !== 'Bu soru kalite güvence standartları kapsamında güncellenmektedir.',
  '4. Soru 4 sunum filtresi tarafından maskelenmemeli'
);
check(
  sanitizedQ4.questionText === validQuestion4.questionText,
  '5. Soru 4 orijinal soru metni aynen korunmalı'
);

// 3. Gerçek Hata: Safraya kimyasal sindirim atfedildiğinde engellenmeli
const flawedQ1: any = {
  ...validQuestion4,
  questionNumber: 4,
  modelAnswer: 'İnce bağırsakta safra sıvısı yağların kimyasal sindirimini sağlar ve yağları yapı taşlarına ayırır.'
};
const reportFlaw1 = auditQuestionQuality(flawedQ1, contextFen7);
check(reportFlaw1.status === 'failed', "6. Safraya kimyasal sindirim atfeden soru 'failed' olmalı");
check(reportFlaw1.isCertified === false, '7. Safraya kimyasal sindirim atfeden soru sertifikalanmamalı');
check(
  reportFlaw1.findings.some(f => f.validationMethod === 'science_bile_digestive_role'),
  '8. Safraya kimyasal sindirim atfedildiğinde science_bile_digestive_role bulgusu üretilmeli'
);
const maskedFlawedQ1 = sanitizeExamQuestion({
  ...flawedQ1,
  isCertified: reportFlaw1.isCertified,
  _qaStatus: reportFlaw1.status
} as ExamQuestion);
check(
  maskedFlawedQ1.questionText === 'Bu soru kalite güvence standartları kapsamında güncellenmektedir.',
  '9. Hatalı soru sunum filtresinde maskelenmeli'
);

// 4. Gerçek Hata: Safraya enzim denildiğinde engellenmeli
const flawedQ2: any = {
  ...validQuestion4,
  modelAnswer: 'Karaciğerde üretilen safra enzimi ince bağırsakta yağları sindirir.'
};
const reportFlaw2 = auditQuestionQuality(flawedQ2, contextFen7);
check(reportFlaw2.status === 'failed', "10. Safraya enzim diyen soru 'failed' olmalı");
check(reportFlaw2.isCertified === false, '11. Safraya enzim diyen soru sertifikalanmamalı');
check(
  reportFlaw2.findings.some(f => f.validationMethod === 'science_bile_digestive_role'),
  '12. Safraya enzim denildiğinde science_bile_digestive_role bulgusu üretilmeli'
);

// 5. Gerçek Hata: Safranın mideden veya pankreastan salgılandığı iddia edildiğinde engellenmeli
const flawedQ3: any = {
  ...validQuestion4,
  modelAnswer: 'Mide tarafından salgılanan safra sıvısı besinlerin sindirimine yardımcı olur.'
};
const reportFlaw3 = auditQuestionQuality(flawedQ3, contextFen7);
check(reportFlaw3.status === 'failed', "13. Safranın mideden salgılandığını iddia eden soru 'failed' olmalı");
check(reportFlaw3.isCertified === false, '14. Safranın mideden salgılandığını iddia eden soru sertifikalanmamalı');
check(
  reportFlaw3.findings.some(f => f.validationMethod === 'science_bile_digestive_role'),
  '15. Safranın mideden salgılandığı iddia edildiğinde science_bile_digestive_role bulgusu üretilmeli'
);

// 6. Soru 5 (Burak posteri kasıtlı hata tespiti) muafiyet koruma kontrolü
const intentionalErrorQuestion5: any = {
  questionNumber: 5,
  outcomeCode: 'FB.7.3.1',
  topic: 'Sindirim Sistemi',
  archetype: 'Hata Tespiti & Adım Analizi',
  difficulty: 'Zor',
  cognitiveLevel: 'Analiz',
  questionText: 'Burak, sindirim sisteminde görevli yapı ve organları tanıtan bir poster hazırlamıştır. Posterdeki bilgileri inceleyerek safra salgısı ile ilgili yapılan bilimsel hatayı gerekçesiyle açıklayınız.',
  stimulus: 'Burak posterinde: "Yemek borusu ve yutak safra salgısı üreterek sindirime doğrudan katılır." ifadesine yer vermiştir.',
  modelAnswer: 'Burak’ın ifadesi yanlıştır. Yemek borusu ve yutak safra üretmez; safra karaciğer tarafından üretilir ve safra kesesinde depolanıp ince bağırsağa dökülür.',
  solutionSteps: [
    '1. Burak’ın posterindeki safra ifadesi incelenir.',
    '2. Safranın karaciğerde üretildiği ve yutak/yemek borusunun safra üretmediği belirtilir.'
  ],
  rubric: [
    { criterion: 'Yutak ve yemek borusunun safra üretmediğini belirtme', points: 5 },
    { criterion: 'Safranın karaciğerde üretildiğini doğru açıklama', points: 5 }
  ]
};
const reportQ5 = auditQuestionQuality(intentionalErrorQuestion5, contextFen7);
check(reportQ5.status === 'passed', "16. Soru 5 (kasıtlı hata tespiti) 'passed' olmalı");
check(reportQ5.isCertified === true, '17. Soru 5 isCertified true olmalı');
check(reportQ5.findings.length === 0, `18. Soru 5 hedeflenen muafiyet sayesinde bulgu üretmemeli (bulunan: ${reportQ5.findings.length})`);

console.log(`\n========================================`);
console.log(`TOPLAM TEST: ${totalCount}`);
console.log(`BAŞARILI:    ${passedCount}`);
console.log(`BAŞARISIZ:   ${totalCount - passedCount}`);
console.log(`========================================`);

assert.strictEqual(passedCount, totalCount, 'Tüm TASK210 testleri başarılı olmalıdır!');
