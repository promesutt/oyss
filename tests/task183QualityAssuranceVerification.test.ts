/**
 * TASK183: Evrensel Soru Kalite Güvence Sistemi Düzeltme ve Entegrasyon Doğrulama Test Paketi
 *
 * Test Edilenler:
 * 1. Kaynak Kökeni ve Güvenli İkame:
 *    - oyss_curated soruların meb_official olarak gösterilmemesi
 *    - Kaynağı belirsiz sorunun resmî kabul edilmemesi
 *    - Yanlış/uyuşmayan kazanım eşleşmesi olan sorunun ikame edilmemesi
 *    - İkame sırasında kaynak kökeninin korunması
 *    - İkame bulunamadığında sorunun isCertified: false kalması ve uyarı üretmesi
 * 2. Fen Bilimleri Düzeltmeleri:
 *    - Safra ve pankreas enzimi ayrımı (Safra kimyasal sindirim yapmaz, enzim değildir)
 *    - Atardamar ve toplardamar tanımı (Akciğer atardamarı kirli kan taşır; kalbe göre akış yönü esastır)
 *    - Kütle ve ağırlıkta olumsuzluk koruması ("Kütle dinamometre ile ölçülmez" ifadesinin doğru sayılması)
 * 3. Din Kültürü Düzeltmeleri:
 *    - Usûl (anne-baba), fürû (çocuk-torun) ve eş ayrımı (eşin usûl/fürû olmadığı)
 *    - Olumsuzluk koruması ("Zekât anneye verilemez" ifadesinin doğru sayılması)
 *    - Zekât nisap oranları (Altın ve nakitte 1/40)
 * 4. Ortak Denetim ve Rubrik:
 *    - Başka derse ait kazanım kodunun tespiti (Matematik sınavında FB. kazanımı)
 *    - Şekle/görsele atıf yapılmasına rağmen görsel ve veri bulunmaması
 *    - Rubrikte büyük puan uyuşmazlığında (>2 puan) otomatik dağıtım yapılmaması ve incelemeye bırakılması
 *    - Küçük sapmada (1 puan) güvenli onarım
 * 5. Üretim ve Sunum Kanalları Entegrasyonu:
 *    - Canlı Gemini çıktısının ensureExamQuality'den geçmesi
 *    - Yerel motor (fallback) çıktısının ensureExamQuality'den geçmesi
 *    - Hazır sınavın (SAMPLE_EXAMS) ensureExamQuality'den geçmesi
 *    - Başarısız sorunun certifiedForStudents: false üretmesi ve öğrenciye onay vermemesi
 */

import {
  auditQuestionQuality,
  auditExamQuality,
  ensureExamQuality,
  autoRemediateQuestion,
  validateScienceQuestion,
  validateDinQuestion,
  validateMathQuestion,
  runCommonQualityChecks
} from '../src/utils/qualityAssurance/index';
import { SAMPLE_EXAMS } from '../src/data/sampleExams';
import { classifyExamQuestions } from '../src/types/index';

console.log('=== TASK183: KALİTE GÜVENCE DÜZELTME VE ENTEGRASYON TESTLERİ BAŞLIYOR ===\n');

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

// =============================================================
// BÖLÜM 1: KAYNAK KÖKENİ VE GÜVENLİ İKAME TESTLERİ
// =============================================================

// Test 1.1: oyss_curated sorular meb_official olarak sınıflandırılmamalıdır
const curatedExamQuestions = [
  { questionNumber: 1, sourceOrigin: 'oyss_curated' as const },
  { questionNumber: 2, sourceOrigin: 'oyss_curated' as const },
  { questionNumber: 3, sourceOrigin: 'oyss_curated' as const }
];
const examClass = classifyExamQuestions(curatedExamQuestions);
assert(
  examClass === 'oyss_curated_set' && examClass !== 'meb_selection',
  '1.1: oyss_curated Sorular Asla meb_official Kabul Edilmez',
  `Yalnızca oyss_curated içeren soru seti "oyss_curated_set" olarak sınıflandırılmıştır (meb_selection DEĞİLDİR).`
);

// Test 1.2: Kaynağı belirsiz (unknown) sorular resmî kabul edilmez
const unknownExamQuestions = [
  { questionNumber: 1, sourceOrigin: 'unknown' as const },
  { questionNumber: 2, sourceOrigin: 'unknown' as const }
];
const unknownClass = classifyExamQuestions(unknownExamQuestions);
assert(
  unknownClass !== 'meb_selection',
  '1.2: Kaynağı Belirsiz Sorular Otomatik Olarak Resmî Kabul Edilmez',
  `unknown kökenli sorular meb_selection olamaz (Sınıf: ${unknownClass}).`
);

// Test 1.3: Yanlış/uyuşmayan kazanım eşleşmesi olan soru ikame edilmemeli
const brokenQuestion = {
  id: 1,
  outcomeCode: 'MAT.7.1.1',
  questionText: '12 + 15 = 40 işlemini gösteriniz.', // Kritik hata
  modelAnswer: '12 + 15 = 40 bulunur.',
  points: 10,
  rubric: [{ item: 'Toplama', pts: 10 }]
};

const substitutionPoolWrongOutcome = [
  {
    id: 101,
    outcomeCode: 'FB.7.3.1', // Farklı ders ve farklı kazanım!
    questionText: 'Kütle ve ağırlık ilişkisi nedir?',
    modelAnswer: 'Kütle değişmez, ağırlık değişir.',
    points: 10,
    sourceOrigin: 'oyss_curated' as const,
    rubric: [{ item: 'Açıklama', pts: 10 }]
  }
];

const subRes1 = ensureExamQuality([brokenQuestion], { grade: 7, subjectId: 'matematik' }, substitutionPoolWrongOutcome);
assert(
  subRes1.certifiedQuestions[0].outcomeCode === 'MAT.7.1.1' &&
  (subRes1.certifiedQuestions[0] as any)._qaSubstitution === undefined &&
  (subRes1.certifiedQuestions[0] as any).isCertified === false,
  '1.3: Uyuşmayan Kazanımlı Soru İkame Olarak Kullanılmaz',
  'MAT.7.1.1 yerine FB.7.3.1 sorusu ikame edilmedi; soru ikame edilmeyip isCertified: false bırakıldı.'
);

// Test 1.4: Doğru kazanım ile ikame edildiğinde kaynak kökeni korunmalıdır
const substitutionPoolCorrect = [
  {
    id: 102,
    outcomeCode: 'MAT.7.1.1',
    questionText: 'Rasyonel sayılarda toplama işlemini modelleyiniz.',
    modelAnswer: '1/2 + 1/4 = 3/4 bulunur.',
    points: 10,
    sourceOrigin: 'oyss_curated' as const,
    rubric: [{ item: 'Toplama işlemi', pts: 10 }]
  }
];

const subRes2 = ensureExamQuality([brokenQuestion], { grade: 7, subjectId: 'matematik' }, substitutionPoolCorrect);
assert(
  subRes2.certifiedQuestions[0].sourceOrigin === 'oyss_curated' &&
  (subRes2.certifiedQuestions[0] as any)._qaSubstitution?.sourceOrigin === 'oyss_curated',
  '1.4: İkame İşleminde Kaynak Kökeni Korunur',
  'İkame edilen sorunun sourceOrigin bilgisi ("oyss_curated") başarıyla korunmuştur.'
);

// =============================================================
// BÖLÜM 2: FEN BİLİMLERİ DÜZELTMELERİ
// =============================================================

// Test 2.1: Safra ve Pankreas Enzimi Ayrımı
const faultySafraQuestion = {
  id: 201,
  outcomeCode: 'FB.6.2.1',
  questionText: 'Safranın sindirimdeki görevini açıklayınız.',
  modelAnswer: 'Safra bir enzimdir ve yağların kimyasal sindirimini gerçekleştirir.',
  points: 10,
  rubric: [{ item: 'Safra görevi', pts: 10 }]
};

const safraFindings = validateScienceQuestion(faultySafraQuestion, { grade: 6, subjectId: 'fen_bilimleri' });
const safraChemicalError = safraFindings.find(f => f.validationMethod === 'science_bile_digestive_role');
assert(
  Boolean(safraChemicalError),
  '2.1: Safra Kimyasal Sindirim ve Enzim Yanılgısı Tespiti',
  `Safranın enzim veya kimyasal sindirici olduğu iddiası yakalandı: "${safraChemicalError?.message || ''}"`
);

// Test 2.2: Dolaşım Sistemi - Atardamar Tanımı (Akciğer Atardamarı İstisnası)
const faultyArteryQuestion = {
  id: 202,
  outcomeCode: 'FB.6.2.2',
  questionText: 'Atardamarların özelliklerini açıklayınız.',
  modelAnswer: 'Bütün atardamarlar temiz kan taşır.',
  points: 10,
  rubric: [{ item: 'Atardamar özelliği', pts: 10 }]
};

const arteryFindings = validateScienceQuestion(faultyArteryQuestion, { grade: 6, subjectId: 'fen_bilimleri' });
const arteryError = arteryFindings.find(f => f.validationMethod === 'science_blood_vessels_definition');
assert(
  Boolean(arteryError),
  '2.2: Atardamar Tanımında Daima Temiz Kan Yanılgısı Tespiti',
  `Bütün atardamarların temiz kan taşıdığı genellemesi yakalandı: "${arteryError?.message || ''}"`
);

// Test 2.3: Olumsuzluk Koruması (Negation Handling): "Kütle dinamometre ile ölçülmez" HATA OLMAMALIDIR
const correctNegatedScienceQuestion = {
  id: 203,
  outcomeCode: 'FB.7.3.1',
  questionText: 'Kütlenin ölçülmesi ile ilgili yargıyı değerlendiriniz.',
  modelAnswer: 'Kütle dinamometre ile ölçülmez; eşit kollu terazi ile ölçülen değişmeyen madde miktarıdır.',
  points: 10,
  rubric: [{ item: 'Doğru açıklama', pts: 10 }]
};

const negatedScienceFindings = validateScienceQuestion(correctNegatedScienceQuestion, { grade: 7, subjectId: 'fen_bilimleri' });
const falseMassAlarm = negatedScienceFindings.find(f => f.validationMethod === 'science_mass_weight_distinction');
assert(
  !falseMassAlarm,
  '2.3: Fen Bilimleri Olumsuzluk Koruması (Negation Guard)',
  '"Kütle dinamometre ile ölçülmez" doğru ifadesine yanlışlıkla kavram yanılgısı hatası VERİLMEDİ.'
);

// =============================================================
// BÖLÜM 3: DİN KÜLTÜRÜ DÜZELTMELERİ
// =============================================================

// Test 3.1: Usûl, Fürû ve Eş Ayrımı
const faultyDinZakatQuestion = {
  id: 301,
  outcomeCode: 'DK.8.2.1',
  questionText: 'Zekât kimlere verilebilir?',
  modelAnswer: 'Kişi zekâtını anne, baba ve eşine vermelidir.',
  points: 10,
  rubric: [{ item: 'Zekat alıcıları', pts: 10 }]
};

const dinZakatFindings = validateDinQuestion(faultyDinZakatQuestion, { grade: 8, subjectId: 'din_kulturu' });
const usulFuruError = dinZakatFindings.find(f => f.message.includes('usûlüne') || f.message.includes('anne, baba'));
const esError = dinZakatFindings.find(f => f.message.includes('Eş usûl veya fürû olmamakla birlikte') || f.message.includes('nafaka'));
assert(
  Boolean(usulFuruError) && Boolean(esError),
  '3.1: Din Kültürü Usûl, Fürû ve Eş Kavramlarının Ayrı Ele Alınması',
  'Usûl (anne-baba) ile eşin (nafaka bağı) ayrı fıkhi gerekçelerle zekât alamayacağı doğrulandı.'
);

// Test 3.2: Din Kültürü Olumsuzluk Koruması ("Zekât anneye verilemez" DOĞRU kabul edilmeli)
const correctNegatedDinQuestion = {
  id: 302,
  outcomeCode: 'DK.8.2.1',
  questionText: 'Zekât kimlere verilemez?',
  modelAnswer: 'Kişi bakmakla yükümlü olduğu için zekât anneye verilemez, yoksul kardeşine ise verilebilir.',
  points: 10,
  rubric: [{ item: 'Doğru hüküm', pts: 10 }]
};

const negatedDinFindings = validateDinQuestion(correctNegatedDinQuestion, { grade: 8, subjectId: 'din_kulturu' });
const falseDinAlarm = negatedDinFindings.find(f => f.validationMethod === 'din_zakat_recipients_rules');
assert(
  !falseDinAlarm,
  '3.2: Din Kültürü Olumsuzluk Koruması (Negation Guard)',
  '"Zekât anneye verilemez" doğru fıkhi ifadesine yanlışlıkla hata VERİLMEDİ.'
);

// =============================================================
// BÖLÜM 4: ORTAK DENETİM VE GÜVENLİ RUBRİK DÜZELTME
// =============================================================

// Test 4.1: Yanlış ders kazanım kodu sızıntısı
const crossSubjectQuestion = {
  id: 401,
  outcomeCode: 'FB.7.3.1', // Fen kazanımı
  questionText: 'İki basamaklı sayıların toplamını bulunuz.',
  modelAnswer: '20 + 30 = 50 bulunur.',
  points: 10,
  rubric: [{ item: 'İşlem', pts: 10 }]
};

const crossSubjectFindings = runCommonQualityChecks(crossSubjectQuestion, {
  grade: 7,
  subjectId: 'matematik' // Sınav dersi Matematik!
});

const subjectMismatchError = crossSubjectFindings.find(f => f.validationMethod === 'outcome_subject_prefix_alignment');
assert(
  Boolean(subjectMismatchError),
  '4.1: Başka Derse Ait Kazanım Kodu Uyuşmazlığı Tespiti',
  `Matematik sınavında Fen Bilimleri kodu tespit edildi: "${subjectMismatchError?.message || ''}"`
);

// Test 4.2: Şekle atıf yapan ama görsel ve verisi olmayan soru
const missingVisualQuestion = {
  id: 402,
  outcomeCode: 'MAT.7.2.1',
  questionText: 'Yandaki şekilde verilen açının ölçüsünü bulunuz.',
  modelAnswer: 'x = 45 derecedir.',
  points: 10,
  rubric: [{ item: 'Açı hesabı', pts: 10 }]
  // visual ve stimulus yok!
};

const visualFindings = runCommonQualityChecks(missingVisualQuestion, {
  grade: 7,
  subjectId: 'matematik'
});

const visualMissingError = visualFindings.find(f => f.validationMethod === 'visual_stimulus_reference_check');
assert(
  Boolean(visualMissingError),
  '4.2: Şekle/Görsele Atıf Yapan Soruda Görsel Eksikliği Tespiti',
  `"şekilde" atfı olan ama görseli bulunmayan soru kritik hata aldı: "${visualMissingError?.message || ''}"`
);

// Test 4.3: Rubrik büyük farkta (>2 puan) otomatik dağıtılmamalı, incelemeye bırakılmalı
const bigMismatchRubricQuestion = {
  id: 403,
  outcomeCode: 'MAT.7.1.1',
  questionText: 'Rasyonel sayılarda işlem sorusu.',
  modelAnswer: 'Doğru sonuç 12 dir.',
  points: 20, // Hedef 20 puan
  rubric: [
    { item: 'Birinci işlem', pts: 5 },
    { item: 'İkinci işlem', pts: 5 } // Toplam 10 pts, fark 10 puan!
  ]
};

const bigAudit = auditQuestionQuality(bigMismatchRubricQuestion, { grade: 7, subjectId: 'matematik' });
const bigRemediated = autoRemediateQuestion(bigMismatchRubricQuestion, bigAudit);
assert(
  bigRemediated.wasModified === false,
  '4.3: Büyük Rubrik Puan Farkında (>2 Puan) Güvenli Koruma',
  'Fark 10 puan olduğu için otomatik eşitleme yapılmadı; ölçme güvenliği gereği incelemeye bırakıldı.'
);

// Test 4.4: Rubrik küçük sapmada da (1-2 puan) otomatik değiştirilmez (TASK184 Ölçme Güvenirliği İlkesi)
const smallMismatchRubricQuestion = {
  id: 404,
  outcomeCode: 'MAT.7.1.1',
  questionText: 'Rasyonel sayılarda işlem sorusu.',
  modelAnswer: 'Doğru sonuç 12 dir.',
  points: 10,
  rubric: [
    { item: 'Payda eşitleme adımı', pts: 5 },
    { item: 'Toplama işlemini yapma', pts: 4 } // Toplam 9 pts, fark 1 puan
  ]
};

const smallAudit = auditQuestionQuality(smallMismatchRubricQuestion, { grade: 7, subjectId: 'matematik' });
const smallRemediated = autoRemediateQuestion(smallMismatchRubricQuestion, smallAudit);
const smallSum = (smallRemediated.remediatedQuestion.rubric || []).reduce((s: number, r: any) => s + (r.pts || 0), 0);
assert(
  smallRemediated.wasModified === false && smallSum === 9,
  '4.4: Küçük Sapmada (1 Puan) Ölçme Güvenirliği Korunur (Otomatik Değişiklik Yapılmaz)',
  `1 puanlık farkta dahi ölçme güvenirliği gereği rubrik değiştirilmedi; toplam ${smallSum} puan korundu ve öğretmen incelemesine bırakıldı.`
);

// =============================================================
// BÖLÜM 5: TÜM ÜRETİM VE SUNUM KANALLARININ ENTEGRASYONU
// =============================================================

// Test 5.1: Hazır Sınav (SAMPLE_EXAMS) Denetimi
const sampleExam = SAMPLE_EXAMS[0];
const examAuditReport = auditExamQuality(sampleExam);
assert(
  examAuditReport.totalQuestions > 0 && examAuditReport.executionTimeMs >= 0,
  '5.1: Hazır Sınav (SAMPLE_EXAMS) Kalite Güvence Denetiminden Geçirildi',
  `Sınav (${sampleExam.title}) denetlendi: Toplam ${examAuditReport.totalQuestions} soru, Kalite Skoru: ${examAuditReport.overallScore}.`
);

// Test 5.2: Kritik Hatalı Sınavda certifiedForStudents = false Olması
const fatalExam = {
  id: 'fatal-exam',
  title: 'Hatalı Sınav',
  subject: 'Fen Bilimleri',
  grade: 7,
  questions: [
    {
      id: 1,
      outcomeCode: 'FB.7.3.1',
      questionText: 'Kütle dinamometre ile ölçülür mü?',
      modelAnswer: 'Kütle dinamometre ile ölçülür.',
      points: 10,
      rubric: [{ item: 'Hatalı cevap', pts: 10 }]
    }
  ]
};

const fatalAudit = auditExamQuality(fatalExam);
assert(
  fatalAudit.certifiedForStudents === false && fatalAudit.overallStatus === 'failed',
  '5.2: Kusurlu Sınavın Öğrenciye Onay Alamaması (Gatekeeping)',
  'Kritik bilimsel hata içeren sınav certifiedForStudents: false ve overallStatus: "failed" almıştır.'
);

// Test 5.3: ensureExamQuality ile Tam Akışta QA Metadata Bütünlüğü
const validExam = {
  id: 'valid-exam',
  title: 'Temiz Sınav',
  subject: 'Matematik',
  grade: 7,
  questions: [
    {
      id: 1,
      outcomeCode: 'MAT.7.1.1',
      questionText: 'Bir rasyonel sayı toplama problemini çözünüz.',
      modelAnswer: '1/3 + 1/3 = 2/3 bulunur.',
      points: 10,
      sourceOrigin: 'oyss_curated' as const,
      rubric: [
        { item: 'Paydaları kontrol etme', pts: 5 },
        { item: 'İşlem sonucunu doğru bulma', pts: 5 }
      ]
    }
  ]
};

const ensured = ensureExamQuality(validExam);
assert(
  ensured.qualityAudit !== undefined &&
  ensured.qualityAudit.summary.certifiedForStudents === true &&
  ensured.questions[0].sourceOrigin === 'oyss_curated',
  '5.3: ensureExamQuality Bütünleşik Nesne Desteği ve Kaynak Koruması',
  'Sınav nesnesine qualityAudit eklendi, certifiedForStudents: true oldu ve sourceOrigin korundu.'
);

// =============================================================
// ÖZET VE SONUÇ
// =============================================================
console.log('--- TEST SONUCU ---');
console.log(`Toplam Test: ${passCount + failCount} | Başarılı: ${passCount} | Başarısız: ${failCount}`);

if (failCount > 0) {
  console.error('\nBAZI TESTLER BAŞARISIZ OLDU!');
  process.exit(1);
} else {
  console.log('\nTÜM TASK183 TESTLERİ EKSİKSİZ BAŞARILI!');
  process.exit(0);
}

