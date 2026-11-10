import test from 'node:test';
import assert from 'node:assert/strict';
import {
  auditQuestionQuality,
  auditExamQuality,
  ensureExamQuality
} from '../src/utils/qualityAssurance';
import {
  hasStructuredTableOrDataSet
} from '../src/utils/qualityAssurance/commonValidators';
import { SAMPLE_EXAMS } from '../src/data/sampleExams';

test('TASK228-FIX: Yeniden Sertifikasyon Kilidi, Tablo Algılama ve Sınav Sertifikasyonu', async (t) => {

  await t.test('1. B-01: Yeniden Sertifikasyon Kilidi - Aynı Nesne Üzerinde Doğrulama', () => {
    // 1.1 İlk denetimde başarısız olan bir soru nesnesi oluştur
    const mutableQuestion: any = {
      questionNumber: 1,
      outcomeCode: 'MAT.7.1.2',
      question: 'Kısa', // stem_presence_check (<10 karakter) -> CRITICAL
      stimulus: 'Bağlam metni.',
      answer: 'Cevap metni.',
      points: 10,
      rubric: [{ item: 'Kriter', pts: 10 }]
    };

    // İlk denetim: Başarısız olmalı
    const audit1 = auditQuestionQuality(mutableQuestion, { grade: 7, subjectId: 'matematik' });
    assert.equal(audit1.status, 'failed', 'İlk denetimde soru failed olmalı');
    assert.equal(audit1.isCertified, false, 'İlk denetimde isCertified false olmalı');

    // Soru nesnesine eski denetim durumları yazılıyor (gerçek sistem simülasyonu)
    mutableQuestion._qaStatus = 'failed';
    mutableQuestion.isCertified = false;

    // 1.2 Aynı nesne üzerinde içerik düzeltiliyor (yeni nesne oluşturulmuyor!)
    mutableQuestion.question = 'Gerçek yaşam durumunda 4 tam 1/2 metre uzunluğundaki bir kumaş, 3/4 metrelik parçalara ayrılacaktır. Kaç parça elde edileceğini rasyonel sayılarda işlem basamaklarıyla bulunuz.';
    mutableQuestion.stimulus = 'Terzi atölyesinde kumaş kesim işlemi planlanmaktadır.';
    mutableQuestion.answer = '4 1/2 = 9/2 metre. (9/2) / (3/4) = (9/2) * (4/3) = 6 parça elde edilir.';
    mutableQuestion.rubric = [{ item: 'Bileşik kesre çevirme', pts: 5 }, { item: 'Bölme işlemi', pts: 5 }];

    // Düzeltme sonrası aynı nesne tekrar denetleniyor
    const audit2 = auditQuestionQuality(mutableQuestion, { grade: 7, subjectId: 'matematik' });
    assert.equal(audit2.status, 'passed', 'Düzeltilen soru aynı nesne üzerinde passed olmalıdır');
    assert.equal(audit2.isCertified, true, 'Düzeltilen soru aynı nesne üzerinde isCertified: true almalıdır');
    assert.equal(audit2.previousQaStatus, 'failed', 'Önceki başarısızlık durumu previousQaStatus metadata alanında korunmalıdır');

    // 1.3 Aynı test _qaStatus: "needs_review" için
    mutableQuestion._qaStatus = 'needs_review';
    mutableQuestion.needsReview = true;
    mutableQuestion.isCertified = false;
    const audit3 = auditQuestionQuality(mutableQuestion, { grade: 7, subjectId: 'matematik' });
    assert.equal(audit3.status, 'passed', '_qaStatus: needs_review varken içerik hatasız ise status passed olmalıdır');
    assert.equal(audit3.isCertified, true, '_qaStatus: needs_review varken içerik hatasız ise isCertified true olmalıdır');
    assert.equal(audit3.previousQaStatus, 'needs_review', 'Önceki needs_review durumu previousQaStatus alanında korunmalıdır');

    // 1.4 Gerçek kritik bulgusu devam eden soru yeniden sertifikalandırılmamalıdır
    mutableQuestion.question = 'Kısa'; // Tekrar kritik hata ekle
    const audit4 = auditQuestionQuality(mutableQuestion, { grade: 7, subjectId: 'matematik' });
    assert.equal(audit4.status, 'failed', 'Kritik hata taşıyan soru failed olmalıdır');
    assert.equal(audit4.isCertified, false, 'Kritik hata taşıyan soru asla sertifikalandırılmamalıdır');

    // 1.5 Uyarı içeren fakat kritik hatası olmayan sorunun sertifikasyonu korunmalıdır
    mutableQuestion.question = 'Gerçek yaşam durumunda 4 tam 1/2 metre uzunluğundaki bir kumaş, 3/4 metrelik parçalara ayrılacaktır. Kaç parça elde edileceğini rasyonel sayılarda işlem basamaklarıyla bulunuz.';
    mutableQuestion.outcomeCode = 'MAT.99.99.99'; // Tanımsız kazanım kodu -> warning
    const audit5 = auditQuestionQuality(mutableQuestion, { grade: 7, subjectId: 'matematik' });
    assert.equal(audit5.status, 'warning', 'Sadece uyarı içeren soru status: warning almalıdır');
    assert.equal(audit5.isCertified, true, 'Sadece uyarı içeren soru isCertified: true olmalıdır');
  });

  await t.test('2. B-02: Metin Tabanlı Veri Çizelgesi Algılama ve Yanlış Pozitif Koruması', () => {
    // Zorunlu 6 Pozitif Örnek
    const pos1 = 'Zaman (s): 1, 2, 3, 4';
    const pos2 = 'Yol (m): 6, 12, 18, 24';
    const pos3 = 'Sürat (m/s): 5, 10, 15';
    const pos4 = 'Kuvvet (N): 2, 4, 6';
    const pos5 = 'Kütle (g): 10, 20, 30';
    const pos6 = 'Hacim (cm³): 5, 10, 15';

    assert.equal(hasStructuredTableOrDataSet(pos1), true, 'pos1 (Zaman) veri tablosu/çizelgesi olarak tanınmalı');
    assert.equal(hasStructuredTableOrDataSet(pos2), true, 'pos2 (Yol) veri tablosu/çizelgesi olarak tanınmalı');
    assert.equal(hasStructuredTableOrDataSet(pos3), true, 'pos3 (Sürat) veri tablosu/çizelgesi olarak tanınmalı');
    assert.equal(hasStructuredTableOrDataSet(pos4), true, 'pos4 (Kuvvet) veri tablosu/çizelgesi olarak tanınmalı');
    assert.equal(hasStructuredTableOrDataSet(pos5), true, 'pos5 (Kütle) veri tablosu/çizelgesi olarak tanınmalı');
    assert.equal(hasStructuredTableOrDataSet(pos6), true, 'pos6 (Hacim) veri tablosu/çizelgesi olarak tanınmalı');

    // Ek pozitif örnek: Markdown tablo formatı
    const mdTable = '| Deney No | Sıcaklık (°C) |\n|---|---|\n| 1 | 20 |\n| 2 | 40 |';
    assert.equal(hasStructuredTableOrDataSet(mdTable), true, 'Markdown tablo tanınmalı');

    // Zorunlu 5 Negatif Örnek (Yanlış Pozitif Koruması)
    const neg1 = 'Sıradan bir açıklama paragrafında deneyin aşamaları sırasıyla anlatılmaktadır.';
    const neg2 = 'Bu deneyde sıcaklık 25 derece olarak ölçüldü ve işlem 2 saat sürdü.';
    const neg3 = 'Grafikte verilen değerleri karşılaştırınız: grafik y ekseninde 5 birim artıyor.';
    const neg4 = 'Aşağıdaki tabloda verilen bilgilere göre cevabı açıklayınız. Tabloda 10 öğrenci vardır.';
    const neg5 = 'Sayfa 45: Madde 3 uyarınca işlem yapılmıştır.';

    assert.equal(hasStructuredTableOrDataSet(neg1), false, 'neg1 (açıklama paragrafı) tablo sayılmamalı');
    assert.equal(hasStructuredTableOrDataSet(neg2), false, 'neg2 (tek sayılı cümleler) tablo sayılmamalı');
    assert.equal(hasStructuredTableOrDataSet(neg3), false, 'neg3 (metin içi grafik anlatımı) tablo sayılmamalı');
    assert.equal(hasStructuredTableOrDataSet(neg4), false, 'neg4 (tablo atfı yapan ama veri içermeyen metin) tablo sayılmamalı');
    assert.equal(hasStructuredTableOrDataSet(neg5), false, 'neg5 (sayfa/madde alıntısı) tablo sayılmamalı');

    // 6. Sınıf Fen Bilimleri Senaryo 3 Soru 6 Gerçek Testi
    const fen6Exam = SAMPLE_EXAMS.find(e => e.grade === 6 && e.subjectId === 'fen_bilimleri' && e.scenarioId === 'senaryo_3');
    assert.ok(fen6Exam, '6. Sınıf Fen Bilimleri Senaryo 3 bulunmalı');
    const q6 = fen6Exam.questions[5];
    assert.ok(q6, 'Soru 6 bulunmalı');

    const auditFen6Q6 = auditQuestionQuality(q6, { grade: 6, subjectId: 'fen_bilimleri' });
    const visualError = auditFen6Q6.findings.find(f => f.validationMethod === 'visual_stimulus_reference_check');
    assert.equal(visualError, undefined, '6. Sınıf Fen S3 Q6 veri tablosu tanıdığı için görsel eksikliği hatası almamalıdır');
    assert.equal(auditFen6Q6.isCertified, true, '6. Sınıf Fen S3 Q6 başarıyla sertifikalandırılmalıdır');
    assert.equal(auditFen6Q6.status, 'passed', '6. Sınıf Fen S3 Q6 status passed olmalıdır');
  });

  await t.test('3. B-03: Sınav Geneli Sertifikasyonu (auditExamQuality)', () => {
    // 3.1 Hatasız sorulardan oluşan sınav: certifiedForStudents === true
    const validQuestions = [
      {
        questionNumber: 1,
        outcomeCode: 'MAT.7.1.2',
        question: 'Gerçek yaşam durumunda 4 tam 1/2 metre uzunluğundaki bir kumaş, 3/4 metrelik parçalara ayrılacaktır. Kaç parça elde edileceğini rasyonel sayılarda işlem basamaklarıyla bulunuz.',
        stimulus: 'Terzi atölyesinde kumaş kesim işlemi planlanmaktadır.',
        answer: '4 1/2 = 9/2 metre. (9/2) / (3/4) = (9/2) * (4/3) = 6 parça elde edilir.',
        points: 50,
        rubric: [{ item: 'Bileşik kesre çevirme', pts: 25 }, { item: 'Bölme işlemi', pts: 25 }]
      },
      {
        questionNumber: 2,
        outcomeCode: 'MAT.7.1.2',
        question: 'Bir depodaki 12 tam 1/4 litre zeytinyağı 1/2 litrelik şişelere doldurulacaktır. Kaç tam şişe elde edileceğini rasyonel sayılarda işlem basamaklarıyla hesaplayınız.',
        stimulus: 'Zeytinyağı paketleme tesisinde dolum yapılmaktadır.',
        answer: '12 1/4 = 49/4. (49/4) / (1/2) = (49/4) * 2 = 49/2 = 24 tam şişe elde edilir.',
        points: 50,
        rubric: [{ item: 'Bileşik kesre çevirme', pts: 25 }, { item: 'Bölme işlemi', pts: 25 }]
      }
    ];

    const examAudit1 = auditExamQuality(validQuestions, { grade: 7, subjectId: 'matematik' });
    assert.equal(examAudit1.certifiedForStudents, true, 'Tüm soruları hatasız sınav öğrenciler için onaylanmalıdır');
    assert.equal(examAudit1.overallStatus, 'passed');

    // 3.2 İçinde geçmiş isCertified: false veya _qaStatus: "failed" bayrakları olan ama içeriği düzeltilmiş sorular
    const remediatedQuestions = validQuestions.map(q => ({
      ...q,
      isCertified: false,
      _qaStatus: 'failed'
    }));

    const examAudit2 = auditExamQuality(remediatedQuestions, { grade: 7, subjectId: 'matematik' });
    assert.equal(examAudit2.certifiedForStudents, true, 'İçeriği düzeltilmiş sorular eski nesne bayraklarına rağmen sınav genelinde sertifikalanmalıdır');

    // 3.3 İçinde bir soru kritik hata içeren sınav: certifiedForStudents === false
    const examWithCritical = [
      validQuestions[0],
      {
        questionNumber: 2,
        outcomeCode: 'MAT.7.1.2',
        question: 'Kısa', // Critical
        stimulus: 'Stimulus',
        answer: 'Cevap',
        points: 50,
        rubric: [{ item: 'Kriter', pts: 50 }]
      }
    ];

    const examAudit3 = auditExamQuality(examWithCritical, { grade: 7, subjectId: 'matematik' });
    assert.equal(examAudit3.certifiedForStudents, false, 'Kritik hata içeren sınav öğrenciler için asla onaylanamaz');
    assert.equal(examAudit3.failedCount, 1);
    assert.equal(examAudit3.overallStatus, 'failed');

    // 3.4 Boş sınav: certifiedForStudents === false
    const examAuditEmpty = auditExamQuality([], { grade: 7, subjectId: 'matematik' });
    assert.equal(examAuditEmpty.certifiedForStudents, false, 'Boş sınav sertifikalanamaz');
  });

  await t.test('4. ensureExamQuality ile İkame ve Sertifikasyon Sürekliliği', () => {
    // Soru düzeltilebiliyorsa veya temizse sınav certifiedForStudents almalıdır
    const validExam = {
      title: '7. Sınıf Matematik Sınavı',
      grade: 7,
      subjectId: 'matematik',
      questions: [
        {
          questionNumber: 1,
          outcomeCode: 'MAT.7.1.2',
          question: 'Gerçek yaşam durumunda 4 tam 1/2 metre uzunluğundaki bir kumaş, 3/4 metrelik parçalara ayrılacaktır. Kaç parça elde edileceğini rasyonel sayılarda işlem basamaklarıyla bulunuz.',
          stimulus: 'Terzi atölyesinde kumaş kesim işlemi planlanmaktadır.',
          answer: '4 1/2 = 9/2 metre. (9/2) / (3/4) = (9/2) * (4/3) = 6 parça elde edilir.',
          points: 10,
          rubric: [{ item: 'Bileşik kesre çevirme', pts: 5 }, { item: 'Bölme işlemi', pts: 5 }]
        }
      ]
    };

    const result = ensureExamQuality(validExam, { grade: 7, subjectId: 'matematik' });
    assert.equal(result.qualityAudit.certifiedForStudents, true, 'Temiz sınav ensureExamQuality ile onaylanmalıdır');
    assert.equal(result.questions[0].isCertified, true, 'Soru isCertified: true olmalıdır');
    assert.equal(result.questions[0]._qaStatus, 'passed', 'Soru _qaStatus: passed olmalıdır');
  });

});

