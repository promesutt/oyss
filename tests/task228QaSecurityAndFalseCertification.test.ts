import test from 'node:test';
import assert from 'node:assert/strict';
import { auditQuestionQuality, auditExamQuality, ensureExamQuality } from '../src/utils/qualityAssurance/index';
import { isValidVisualPayload, hasStructuredTableOrDataSet, isMetaInstructionAnswer } from '../src/utils/qualityAssurance/commonValidators';
import { SAMPLE_EXAMS } from '../src/data/sampleExams';

test('TASK228: QA Güvenlik Açıklarının Kapatılması ve Yanlış Sertifikasyonun Önlenmesi', async (t) => {

  await t.test('1. Görsel ve Veri Kontrolü: 25 Karakter Stimulus Bypassının Kaldırılması', () => {
    // Senaryo 1: Görsel gerektiren soru + görsel yok + uzun stimulus (25+ karakter) -> CRITICAL
    const q1 = {
      questionNumber: 1,
      outcomeCode: 'MAT.8.3.1',
      question: 'Şekildeki üçgene göre AD açıortayının uzunluğunu bulunuz.',
      stimulus: 'Geometri dersinde öğretmen tahtaya bir üçgen çizmiş ve kenar uzunluklarını detaylı olarak açıklamıştır.',
      answer: 'AD uzunluğu 6 cm bulunur.',
      points: 10,
      rubric: [{ item: 'Açıortay formülü', pts: 5 }, { item: 'Doğru sonuç', pts: 5 }]
    };
    const audit1 = auditQuestionQuality(q1, { grade: 8, subjectId: 'matematik' });
    const visualFinding1 = audit1.findings.find(f => f.validationMethod === 'visual_stimulus_reference_check');
    assert.ok(visualFinding1, 'Görsel gerektiren ama görseli olmayan soru için visual_stimulus_reference_check bulgusu üretilmeli');
    assert.equal(visualFinding1?.severity, 'critical', 'Uzun stimulus metnine rağmen bulgu CRITICAL olmalı');
    assert.equal(audit1.isCertified, false, 'Görseli eksik soru sertifikalandırılmamalı');

    // Senaryo 2: Görsel gerektiren soru + geçerli görsel -> Hata yok
    const q2 = {
      ...q1,
      visual: {
        type: 'geometry_shape',
        sourceOrigin: 'oyss_svg',
        params: {
          subType: 'triangle',
          points: [{ x: 0, y: 0 }, { x: 50, y: 100 }, { x: 100, y: 0 }]
        }
      }
    };
    const audit2 = auditQuestionQuality(q2, { grade: 8, subjectId: 'matematik' });
    const visualFinding2 = audit2.findings.find(f => f.validationMethod === 'visual_stimulus_reference_check' && f.severity === 'critical');
    assert.equal(visualFinding2, undefined, 'Geçerli görseli olan soruda görsel eksikliği hatası olmamalı');

    // Senaryo 3: Metne gönderme yapan soru + görsel yok -> Gereksiz görsel hatası yok
    const q3 = {
      questionNumber: 3,
      outcomeCode: 'T.O.5.6',
      question: 'Yukarıdaki metne göre yazarın çocukluk anılarında en çok özlem duyduğu duyguyu açıklayınız.',
      stimulus: 'Çocukluğumun geçtiği o ahşap konağın bahçesinde her bahar erguvanlar açardı. Dedemle birlikte saatlerce gölgede oturup kuşların cıvıltısını dinlerdik. O günlerdeki huzuru ve içtenliği bugün hiçbir şehirde bulamıyorum.',
      answer: 'Yazar çocukluk günlerinde dedesiyle yaşadığı huzuru ve içtenliği özlemle anmaktadır.',
      points: 10,
      rubric: [{ item: 'Duygunun tespiti', pts: 5 }, { item: 'Metinle gerekçelendirme', pts: 5 }]
    };
    const audit3 = auditQuestionQuality(q3, { grade: 5, subjectId: 'turkce' });
    const visualFinding3 = audit3.findings.find(f => f.validationMethod === 'visual_stimulus_reference_check');
    assert.equal(visualFinding3, undefined, 'Yalnızca okuma metnine atıf yapan soruda görsel hatası çıkmamalı');

    // Senaryo 4: Tabloya gönderme yapan soru + geçerli yapılandırılmış tablo verisi -> Hata yok
    const q4 = {
      questionNumber: 4,
      outcomeCode: 'MAT.7.4.1',
      question: 'Tablodaki verileri kullanarak haftalık ortalama sıcaklık değerini hesaplayınız.',
      stimulus: '| Gün | Sıcaklık (°C) |\n|---|---|\n| Pazartesi | 12 |\n| Salı | 16 |\n| Çarşamba | 14 |',
      answer: 'Ortalama sıcaklık: (12 + 16 + 14) / 3 = 14 °C.',
      points: 10,
      rubric: [{ item: 'Toplama işlemi', pts: 5 }, { item: 'Ortalama hesabı', pts: 5 }]
    };
    const audit4 = auditQuestionQuality(q4, { grade: 7, subjectId: 'matematik' });
    const visualFinding4 = audit4.findings.find(f => f.validationMethod === 'visual_stimulus_reference_check');
    assert.equal(visualFinding4, undefined, 'Yapılandırılmış Markdown veri tablosu içeren soruda görsel hatası çıkmamalı');

    // Senaryo 5: Deney düzeneğine gönderme yapan soru + yalnızca genel açıklama metni -> Eksik düzenek tespit edilmeli
    const q5 = {
      questionNumber: 5,
      outcomeCode: 'FB.7.3.1',
      question: 'Yukarıda verilen deney düzeneğinde gerçekleşen enerji dönüşümünü gerekçelendiriniz.',
      stimulus: 'Laboratuvar ortamında enerji konusu kapsamında kontrollü değişkenlerle ölçümler yapılmıştır.',
      answer: 'Potansiyel enerji kinetik enerjiye dönüşmüştür.',
      points: 10,
      rubric: [{ item: 'Potansiyel enerji', pts: 5 }, { item: 'Kinetik dönüşüm', pts: 5 }]
    };
    const audit5 = auditQuestionQuality(q5, { grade: 7, subjectId: 'fen_bilimleri' });
    const visualFinding5 = audit5.findings.find(f => f.validationMethod === 'visual_stimulus_reference_check');
    assert.ok(visualFinding5, 'Deney düzeneğine atıf yapan ama düzenek görseli bulunmayan soru yakalanmalı');
    assert.equal(visualFinding5?.severity, 'critical', 'Eksik deney düzeneği atfı critical olmalı');
  });

  await t.test('2. Meta-Cevap Kontrolü: Öğretmen Yönergelerinin ve Şablon Meta-Cevapların Engellenmesi', () => {
    // Senaryo 6: "Öğrencinin açıklaması beklenir" -> CRITICAL
    const q6 = {
      questionNumber: 6,
      outcomeCode: 'FB.6.2.1',
      question: 'Safra sıvısının sindirimdeki rolünü açıklayınız.',
      stimulus: 'İnce bağırsağa dökülen salgılar incelenmektedir.',
      answer: 'Öğrencinin safra sıvısının yağları küçük damlacıklara ayırdığını açıklaması beklenir.',
      points: 10,
      rubric: [{ item: 'Kavramsal teşhis', pts: 5 }, { item: 'Açıklama', pts: 5 }]
    };
    const audit6 = auditQuestionQuality(q6, { grade: 6, subjectId: 'fen_bilimleri' });
    const metaFinding6 = audit6.findings.find(f => f.validationMethod === 'meta_instruction_answer_check');
    assert.ok(metaFinding6, '"Öğrencinin ... beklenir" içeren meta-cevap tespit edilmeli');
    assert.equal(metaFinding6?.severity, 'critical', 'Meta-cevap bulgusu CRITICAL olmalı');
    assert.equal(audit6.isCertified, false, 'Meta-cevap içeren soru sertifikalandırılmamalı');

    // Senaryo 7: "Doğru uygulaması gerekir" / "beklenmektedir" -> CRITICAL
    const q7 = {
      questionNumber: 7,
      outcomeCode: 'MAT.5.1.1',
      question: 'Basamak değerlerini çözümleyiniz.',
      stimulus: 'Bir matematiksel modelde veriler toplanmıştır.',
      answer: 'Öğrencinin basamak değerlerini çözümleme kurallarını doğru uygulaması beklenmektedir.',
      points: 10,
      rubric: [{ item: 'İşlem adımı', pts: 5 }, { item: 'Sonuç', pts: 5 }]
    };
    const audit7 = auditQuestionQuality(q7, { grade: 5, subjectId: 'matematik' });
    const metaFinding7 = audit7.findings.find(f => f.validationMethod === 'meta_instruction_answer_check');
    assert.ok(metaFinding7, '"...doğru uygulaması beklenmektedir" meta-cevabı tespit edilmeli');
    assert.equal(metaFinding7?.severity, 'critical');

    // Senaryo 8: Bilimsel olarak doğru ve açıklayıcı cevap -> Hata yok
    const q8 = {
      questionNumber: 8,
      outcomeCode: 'FB.6.2.1',
      question: 'Safra sıvısının sindirimdeki rolünü açıklayınız.',
      stimulus: 'İnce bağırsağa dökülen salgılar incelenmektedir.',
      answer: 'Safra sıvısı yağları fiziksel (mekanik) olarak küçük damlacıklara ayırır ve enzimlerin etki edeceği yüzey alanını artırır.',
      points: 10,
      rubric: [{ item: 'Mekanik sindirim', pts: 5 }, { item: 'Yüzey alanı etkisi', pts: 5 }]
    };
    const audit8 = auditQuestionQuality(q8, { grade: 6, subjectId: 'fen_bilimleri' });
    const metaFinding8 = audit8.findings.find(f => f.validationMethod === 'meta_instruction_answer_check');
    assert.equal(metaFinding8, undefined, 'Gerçek bilimsel yanıtta meta-cevap hatası çıkmamalı');

    // Senaryo 9: Gerçek cevabında "beklenir" geçen fakat yanıt niteliği taşıyan içerik -> Gereksiz ret yok
    const q9 = {
      questionNumber: 9,
      outcomeCode: 'FB.7.4.2',
      question: 'Deneyde suyun ısıtılması sonucunda gerçekleşecek durumları yazınız.',
      stimulus: 'Isıtıcı üzerine konulan saf su termometre ile izlenmektedir.',
      answer: 'Sıcaklık 100 °C değerine ulaştığında suyun kaynaması ve yoğun buharlaşma beklenir.',
      points: 10,
      rubric: [{ item: '100 derece', pts: 5 }, { item: 'Kaynama tespiti', pts: 5 }]
    };
    const audit9 = auditQuestionQuality(q9, { grade: 7, subjectId: 'fen_bilimleri' });
    const metaFinding9 = audit9.findings.find(f => f.validationMethod === 'meta_instruction_answer_check');
    assert.equal(metaFinding9, undefined, '"Suyun kaynaması beklenir" gibi olgusal cümleler yanlışlıkla meta-cevap sayılmamalı');
  });

  await t.test('3. Sertifikasyon Güvenliği: Çoklu Koşul ve Tutarlılık Denetimi', () => {
    // Senaryo 10: Kritik hata içeren soru -> isCertified: false
    const q10 = {
      questionNumber: 10,
      outcomeCode: 'MAT.7.1.2',
      question: 'Kısa soru', // stem_presence_check (<10 karakter)
      stimulus: '',
      answer: 'Cevap',
      points: 10,
      rubric: [{ item: 'Kriter', pts: 10 }]
    };
    const audit10 = auditQuestionQuality(q10, { grade: 7, subjectId: 'matematik' });
    assert.equal(audit10.status, 'failed');
    assert.equal(audit10.isCertified, false, 'Kritik hata içeren soru asla sertifikalı olamaz');

    // Senaryo 11 (TASK228-FIX): Geçmişte needs_review alan fakat kritik hatası bulunmayan soru yeniden sertifikalandırılabilmeli
    const q11 = {
      questionNumber: 11,
      outcomeCode: 'MAT.7.1.2',
      question: 'Gerçek yaşam durumunda 4 tam 1/2 metre uzunluğundaki bir kumaş, 3/4 metrelik parçalara ayrılacaktır. Kaç parça elde edileceğini rasyonel sayılarda işlem basamaklarıyla bulunuz.',
      stimulus: 'Terzi atölyesinde kumaş kesim işlemi planlanmaktadır.',
      answer: '4 1/2 = 9/2 metre. (9/2) / (3/4) = (9/2) * (4/3) = 6 parça elde edilir.',
      points: 10,
      rubric: [{ item: 'Bileşik kesre çevirme', pts: 5 }, { item: 'Bölme işlemi', pts: 5 }],
      _qaStatus: 'needs_review'
    };
    const audit11 = auditQuestionQuality(q11, { grade: 7, subjectId: 'matematik' });
    assert.equal(audit11.status, 'passed');
    assert.equal(audit11.isCertified, true, 'Kritik hatası olmayan soru geçmiş _qaStatus: needs_review değerine rağmen sertifikalandırılmalıdır');
    assert.equal(audit11.previousQaStatus, 'needs_review', 'Geçmiş _qaStatus metadata olarak korunmalıdır');

    // Senaryo 12: Uygun, hatasız soru -> isCertified: true, status: passed
    const q12 = {
      questionNumber: 12,
      outcomeCode: 'MAT.7.1.2',
      question: 'Gerçek yaşam durumunda 4 tam 1/2 metre uzunluğundaki bir kumaş, 3/4 metrelik parçalara ayrılacaktır. Kaç parça elde edileceğini rasyonel sayılarda işlem basamaklarıyla bulunuz.',
      stimulus: 'Terzi atölyesinde kumaş kesim işlemi planlanmaktadır.',
      answer: '4 1/2 = 9/2 metre. (9/2) / (3/4) = (9/2) * (4/3) = 6 parça elde edilir.',
      points: 10,
      rubric: [{ item: 'Bileşik kesre çevirme', pts: 5 }, { item: 'Bölme işlemi', pts: 5 }]
    };
    const audit12 = auditQuestionQuality(q12, { grade: 7, subjectId: 'matematik' });
    assert.equal(audit12.status, 'passed');
    assert.equal(audit12.isCertified, true, 'Hatasız soru sertifikalandırılmalıdır');

    // Senaryo 13: Yalnızca warning içeren soru -> status: warning, isCertified: true
    const q13 = {
      ...q12,
      outcomeCode: 'MAT.99.99.99' // Registry check warning
    };
    const audit13 = auditQuestionQuality(q13, { grade: 7, subjectId: 'matematik' });
    assert.equal(audit13.status, 'warning');
    assert.equal(audit13.isCertified, true, 'Yalnızca warning içeren soru pedagojik olarak sunulabilir (isCertified: true kalmalı)');
  });

  await t.test('4. ensureExamQuality Bütünlüğü ve Sertifikasyon Koruması', () => {
    // Sınav içinde bir soru meta-cevap veya eksik görsel içerdiğinde ensureExamQuality
    // o soruyu tespit etmeli ve sertifikasız öğrenciye sunmamalıdır
    const testExam = {
      title: 'Test Sınavı',
      grade: 7,
      subjectId: 'fen_bilimleri',
      questions: [
        {
          questionNumber: 1,
          outcomeCode: 'FB.7.3.1',
          question: 'Yukarıda verilen deney düzeneğinde gerçekleşen enerji dönüşümünü gerekçelendiriniz.',
          stimulus: 'Özdeş bilyelerle sürtünmesiz ortamda deney yapılmıştır.',
          answer: 'Öğrencinin kinetik enerjinin potansiyele dönüştüğünü açıklaması beklenir.', // Meta-cevap + eksik görsel
          points: 10,
          rubric: [{ item: 'Kavram', pts: 5 }, { item: 'Gerekçe', pts: 5 }]
        }
      ]
    };

    const result = ensureExamQuality(testExam, { grade: 7, subjectId: 'fen_bilimleri' });
    const certifiedQ = result.questions[0];
    assert.equal(certifiedQ.isCertified, false, 'İkamesi bulunamayan kusurlu soru sertifikasız (false) kalmalıdır');
    assert.equal(result.qualityAudit.certifiedForStudents, false, 'Sınav bütünü öğrenciler için onaylanmamalıdır (certifiedForStudents: false)');
  });

});
