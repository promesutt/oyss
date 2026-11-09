/**
 * TASK199: Soru Senaryolarında Anlatım ve Zamansal Tutarlılık Test Paketi
 *
 * Test Edilenler:
 * 1. 5. sorudaki zamansal/anlatımsal çelişkinin (sırttaki çantanın yerden alınıp takılması) tespiti.
 * 2. Düzeltilmiş anlatımın (3 eylemli Selim senaryosu) kalite güvence denetiminden hatasız geçmesi.
 * 3. Tutarlı senaryoların, bağımsız durumların (1. Durum / 2. Durum) ve ara eylemlerin yanlışlıkla hatalı sayılmaması (False Positive Guard).
 * 4. Kontrolün ortak kalite güvence mimarisinde tüm branşlar için evrensel çalışması (Türkçe/Fen/Sosyal).
 * 5. Deterministik onarım motorunun (autoRemediateQuestion) soruyu, model cevabı ve 11 puanlık rubriği tam eşitlemesi.
 * 6. Güvenilir olmayan/bilinmeyen çelişkilerde sorunun sessizce değiştirilmemesi ve kalite uyarısının korunması.
 * 7. ensureExamQuality ve sunum katmanı entegrasyonu (öğrenci sunum kapısı güvenliği).
 */

import {
  auditQuestionQuality,
  ensureExamQuality,
  autoRemediateQuestion
} from '../src/utils/qualityAssurance/index';
import { sanitizeExamQuestion } from '../src/utils/qualityAssurance/presentationContentFilter';

console.log('=== TASK199: ANLATIM VE ZAMANSAL TUTARLILIK TESTLERİ BAŞLIYOR ===\n');

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

// -------------------------------------------------------------
// TEST 1: 5. Sorudaki Zamansal/Anlatımsal Çelişkinin Tespiti
// -------------------------------------------------------------
const flawedQuestion5 = {
  number: 5,
  outcome: 'FB.7.2.1',
  outcomeTitle: 'Fiziksel anlamda yapılan işin bağlı olduğu faktörlere ilişkin bilimsel çıkarım yapabilme',
  difficulty: 'Orta',
  level: 'Karmaşık Bilişsel Süreçler',
  points: 11,
  stimulus: 'Selim, okul çıkışında sırtındaki ağır çantayla bahçede beklemektedir. Daha sonra çantasını yerden alarak sırtına takmış, düz bir yolda sabit süratle yürümüş ve son olarak çantasını kütüphane masasının üzerine koymak için dikey doğrultuda yukarı kaldırmıştır.',
  question: "Selim'in gerçekleştirdiği eylemlerde fiziksel anlamda iş yapılıp yapılmadığını gerekçeleriyle açıklayınız.",
  answer: 'Yerden kaldırırken ve masaya koyarken iş yapılır; düz yolda taşırken kuvvet harekete dik olduğu için iş yapılmaz.',
  rubric: [
    { item: 'Yerden kaldırmada iş yapıldığının gerekçesi', pts: 4 },
    { item: 'Düz yolda taşımada iş yapılmadığının gerekçesi', pts: 3 },
    { item: 'Masaya koymada iş yapıldığının gerekçesi', pts: 4 }
  ]
};

const auditFlawed = auditQuestionQuality(flawedQuestion5, {
  grade: 7,
  subjectId: 'fen_bilimleri',
  targetPoints: 11
});

const narrativeFinding = auditFlawed.findings.find(
  f => f.validationMethod === 'narrative_temporal_consistency_check'
);

assert(
  Boolean(narrativeFinding) && narrativeFinding?.severity === 'critical' && auditFlawed.status === 'failed' && !auditFlawed.isCertified,
  '1: Çelişkili Senaryo (Sırttaki Çantanın Yerden Alınması) Kritik Hata Olarak Tespit Edilir',
  `Hata türü: "${narrativeFinding?.validationMethod}", Açıklama: "${narrativeFinding?.message || ''}"`
);

// -------------------------------------------------------------
// TEST 2: Düzeltilmiş Anlatımın Kalite Denetiminden Hatasız Geçmesi
// -------------------------------------------------------------
const correctedQuestion5 = {
  number: 5,
  outcome: 'FB.7.2.1',
  outcomeTitle: 'Fiziksel anlamda yapılan işin bağlı olduğu faktörlere ilişkin bilimsel çıkarım yapabilme',
  difficulty: 'Orta',
  level: 'Karmaşık Bilişsel Süreçler',
  points: 11,
  stimulus: 'Selim, okul çıkışında ağır çantasını yerden alarak sırtına takmıştır. Daha sonra düz bir yolda sabit süratle yürümüş ve son olarak çantasını kütüphane masasının üzerine koymak için dikey doğrultuda yukarı kaldırmıştır.',
  question: "Selim'in gerçekleştirdiği bu üç farklı eylemden (çantayı yerden kaldırma, düz yolda taşıma, masaya koymak için kaldırma) hangilerinde fiziksel anlamda iş yapılmıştır? Gerekçeleriyle birlikte açıklayınız.",
  answer: '• Fiziksel Anlamda İş Yapılan Eylemler: 1. Eylem (çantayı yerden kaldırma) ve 3. Eylem (masaya koymak için kaldırma).\n• Gerekçelendirme:\n- 1. Eylem: Çantayı kaldırırken kuvvet düşey yukarı, hareket düşey yukarıdır; iş yapılmıştır.\n- 2. Eylem: Düz yolda taşırken kaldırma kuvveti düşey yukarı, hareket yataydır (birbirine diktir); iş yapılmamıştır.\n- 3. Eylem: Masaya koyarken kuvvet düşey yukarı, hareket düşey yukarıdır; iş yapılmıştır.',
  rubric: [
    { item: '1. Eylemde (çantayı yerden kaldırma) yer çekimine karşı iş yapıldığının açıklanması', pts: 4 },
    { item: '2. Eylemde (düz yolda taşıma) kuvvet ile hareketin dikliği sebebiyle iş yapılmadığının açıklanması', pts: 3 },
    { item: '3. Eylemde (masaya koymak için kaldırma) yer çekimine karşı iş yapıldığının açıklanması', pts: 4 }
  ]
};

const auditCorrected = auditQuestionQuality(correctedQuestion5, {
  grade: 7,
  subjectId: 'fen_bilimleri',
  targetPoints: 11
});

const correctedNarrativeFinding = auditCorrected.findings.find(
  f => f.validationMethod === 'narrative_temporal_consistency_check'
);

assert(
  correctedNarrativeFinding === undefined && auditCorrected.status === 'passed' && auditCorrected.isCertified,
  '2: Düzeltilmiş 3 Eylemli Selim Senaryosu Kalite Denetimini Hatasız Geçer',
  `auditCorrected.status: "${auditCorrected.status}", isCertified: ${auditCorrected.isCertified}, Skor: ${auditCorrected.score}`
);

// -------------------------------------------------------------
// TEST 3: Tutarlı Senaryoların Yanlışlıkla Hatalı Sayılmaması (False Positive Guard)
// -------------------------------------------------------------
// 3A: İki Ayrı Bağımsız Durum (1. Durum / 2. Durum)
const comparativeQuestion = {
  number: 6,
  outcome: 'FB.7.2.1',
  points: 11,
  stimulus: '1. Durum: Ahmet, 10 kg\'lık okul çantasını sırtında taşıyarak düz yatay koridorda 20 metre yürüyor.\n2. Durum: Ahmet, aynı çantayı yerden kaldırıp merdivenlerden 2. kata çıkarıyor.',
  question: '1. ve 2. durumlarda fiziksel iş yapılıp yapılmadığını açıklayınız.',
  answer: '1. durumda iş yapılmaz, 2. durumda yer çekimine karşı iş yapılır.',
  rubric: [{ item: 'Durumların analizi', pts: 11 }]
};
const auditComparative = auditQuestionQuality(comparativeQuestion, { grade: 7, subjectId: 'fen_bilimleri' });
const compFinding = auditComparative.findings.find(f => f.validationMethod === 'narrative_temporal_consistency_check');

// 3B: Meşru Ara Eylem İçeren Akış (Yere bırakıp dinlendikten sonra tekrar alma)
const legitSequenceQuestion = {
  number: 7,
  outcome: 'FB.7.2.1',
  points: 10,
  stimulus: 'Kerem okul çantasını sırtından çıkarıp yere bırakmıştır. Dinlendikten sonra çantasını yerden alarak sırtına takmış ve yürümüştür.',
  question: 'Kerem çantasını yerden kaldırırken iş yapmış mıdır?',
  answer: 'Evet, kuvvet ve hareket aynı düşey doğrultuda olduğu için iş yapmıştır.',
  rubric: [{ item: 'İşin gerekçelendirilmesi', pts: 10 }]
};
const auditLegit = auditQuestionQuality(legitSequenceQuestion, { grade: 7, subjectId: 'fen_bilimleri' });
const legitFinding = auditLegit.findings.find(f => f.validationMethod === 'narrative_temporal_consistency_check');

// 3C: Olumsuzluk Koruması (Negation Guard)
const negationQuestion = {
  number: 8,
  outcome: 'FB.7.2.1',
  points: 10,
  stimulus: 'Elif okul çantasını yerden kaldırmadan ve sırtından çıkarmadan düz yolda yürümeye devam etmiştir.',
  question: 'Elif çantayı taşırken yer çekimine karşı iş yapmış mıdır?',
  answer: 'Kuvvet düşey, hareket yatay olduğu için iş yapmamıştır.',
  rubric: [{ item: 'İş yapılmadığının gerekçelendirilmesi', pts: 10 }]
};
const auditNegation = auditQuestionQuality(negationQuestion, { grade: 7, subjectId: 'fen_bilimleri' });
const negationFinding = auditNegation.findings.find(f => f.validationMethod === 'narrative_temporal_consistency_check');

assert(
  compFinding === undefined && legitFinding === undefined && negationFinding === undefined,
  '3: Bağımsız Durumlar, Ara Eylemler ve Olumsuzluk İfadeleri Yanlış Pozitif Üretmez',
  '1. ve 2. durum karşılaştırması, yere bırakma ara adımı ve olumsuzluk koruması başarıyla korundu.'
);

// -------------------------------------------------------------
// TEST 4: Ortak Kalite Güvence Mimarisi - Branşlar Arası Evrensellik
// -------------------------------------------------------------
const flawedTurkishQuestion = {
  number: 1,
  outcome: 'T.7.1.1',
  points: 10,
  stimulus: 'Ahmet Bey, elindeki ağır bavulla istasyon bekleme salonuna girdi. Ardından bavulunu yerden alarak eline aldı ve perona yürüdü.',
  question: "Metinde Ahmet Bey'in hareketlerini ve duygusal durumunu açıklayınız.",
  answer: 'Ahmet Bey telaşlı bir şekilde trene yetişmeye çalışmaktadır.',
  rubric: [{ item: 'Metin analizi', pts: 10 }]
};

const auditTurkish = auditQuestionQuality(flawedTurkishQuestion, {
  grade: 7,
  subjectId: 'turkce'
});

const turkishFinding = auditTurkish.findings.find(
  f => f.validationMethod === 'narrative_temporal_consistency_check'
);

assert(
  Boolean(turkishFinding) && turkishFinding?.category === 'language_clarity',
  '4: Anlatım ve Durum Çelişkisi Kontrolü Türkçe Branşında da Evrensel Olarak Çalışır',
  `Türkçe sorusunda elde olan bavulun yerden alınması çelişkisi başarıyla yakalandı: "${turkishFinding?.message || ''}"`
);

// -------------------------------------------------------------
// TEST 5: Deterministik Otomatik Onarım (autoRemediateQuestion)
// -------------------------------------------------------------
const remediationResult = autoRemediateQuestion(flawedQuestion5, auditFlawed);
const remediated = remediationResult.remediatedQuestion;

const reAudit = auditQuestionQuality(remediated, {
  grade: 7,
  subjectId: 'fen_bilimleri',
  targetPoints: 11
});

const rubricSum = (remediated.rubric || []).reduce((acc: number, r: any) => acc + (r.pts || 0), 0);

assert(
  remediationResult.wasModified === true &&
  remediated.stimulus === 'Selim, okul çıkışında ağır çantasını yerden alarak sırtına takmıştır. Daha sonra düz bir yolda sabit süratle yürümüş ve son olarak çantasını kütüphane masasının üzerine koymak için dikey doğrultuda yukarı kaldırmıştır.' &&
  rubricSum === 11 &&
  reAudit.status === 'passed' &&
  reAudit.isCertified === true,
  '5: autoRemediateQuestion Çelişkili Selim Sorusunu Deterministik Olarak Kusursuz Onarır',
  `wasModified: ${remediationResult.wasModified}, Rubrik Toplamı: ${rubricSum} pts, reAudit: "${reAudit.status}" (certified: ${reAudit.isCertified})`
);

// -------------------------------------------------------------
// TEST 6: Bilinmeyen/Güvenilir Olmayan Çelişkide Sessiz Değişiklik Yapılmaması
// -------------------------------------------------------------
const unrepairableQuestion = {
  number: 3,
  outcome: 'SB.7.1.1',
  points: 10,
  stimulus: 'Gezgin Mehmet Efendi, sırtındaki ağır çantayla handa dinlendi. Daha sonra çantasını yerden alarak sırtına taktı ve kervana katıldı.',
  question: "Gezginin seyahat hazırlıklarını açıklayınız.",
  answer: 'Gezgin yolculuk için gerekli erzak ve eşyalarını hazırlamıştır.',
  rubric: [{ item: 'Hazırlık analizi', pts: 10 }]
};

const auditUnrepairable = auditQuestionQuality(unrepairableQuestion, { grade: 7, subjectId: 'sosyal_bilgiler' });
const unrepairableResult = autoRemediateQuestion(unrepairableQuestion, auditUnrepairable);

assert(
  unrepairableResult.wasModified === false &&
  auditUnrepairable.status === 'failed' &&
  unrepairableResult.notes.some(n => n.includes('soru metni değiştirilmemiş')),
  '6: Güvenli Deterministik Şablon Olmayan Çelişkilerde Soru Sessizce Değiştirilmez, Uyarı Korunur',
  `wasModified: ${unrepairableResult.wasModified}, QA Uyarısı ve failed statüsü korundu.`
);

// -------------------------------------------------------------
// TEST 7: ensureExamQuality ve Sunum Modeli Entegrasyonu
// -------------------------------------------------------------
const rawExamWithFlawed = {
  grade: 7,
  subjectId: 'fen_bilimleri',
  questions: [flawedQuestion5]
};

const ensuredExam = ensureExamQuality(rawExamWithFlawed, { grade: 7, subjectId: 'fen_bilimleri' });
const processedQ = ensuredExam.questions[0];

// Onarılan soru sertifikalandırılmış olmalıdır
assert(
  processedQ.isCertified === true &&
  processedQ._qaStatus === 'passed' &&
  processedQ.stimulus.startsWith('Selim, okul çıkışında ağır çantasını yerden alarak'),
  '7A: ensureExamQuality Sınav Akışında Çelişkili Soruyu Başarıyla Onarıp Sertifikalandırır',
  `isCertified: ${processedQ.isCertified}, _qaStatus: "${processedQ._qaStatus}"`
);

// Eğer onarılamayan bir soru failed kalırsa sunum katmanı (sanitizeExamQuestion) öğrenciyi korur
const blockedQuestion = {
  questionNumber: 1,
  outcomeCode: 'FB.7.2.1',
  outcomeTitle: 'İş kavramı',
  difficulty: 'Orta' as const,
  points: 10,
  questionText: 'Kusurlu çelişkili soru metni',
  stimulus: 'Çelişkili uyaran metni',
  isCertified: false,
  _qaStatus: 'failed'
};

const sanitized = sanitizeExamQuestion(blockedQuestion as any);

assert(
  sanitized.isCertified === false &&
  sanitized.questionText === 'Bu soru kalite güvence standartları kapsamında güncellenmektedir.' &&
  sanitized.stimulus === undefined,
  '7B: Sertifikasız / Başarısız Soru Sunum Katmanında Öğrenci Görünümünden Tam Olarak Arındırılır',
  `Öğrenciye sunulan metin nötr bilgilendirmeye çevrildi, ham çelişkili uyaran temizlendi.`
);

// -------------------------------------------------------------
// ÖZET RAPOR
// -------------------------------------------------------------
console.log('--- TEST SONUCU ---');
console.log(`Toplam Test: ${passCount + failCount} | Başarılı: ${passCount} | Başarısız: ${failCount}`);

if (failCount === 0) {
  console.log('\nTÜM TASK199 ANLATIM VE ZAMANSAL TUTARLILIK TESTLERİ EKSİKSİZ BAŞARILI!');
} else {
  console.error(`\n${failCount} TEST BAŞARISIZ OLDU!`);
  process.exit(1);
}

