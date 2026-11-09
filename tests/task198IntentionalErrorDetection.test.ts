import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  auditQuestionQuality,
  isIntentionalErrorDetectionQuestion,
  sanitizeExamQuestion
} from '../src/utils/qualityAssurance';

describe('TASK198 | Hata Tespiti Sorularında Kasıtlı Yanlış Bilgiyi Ayırt Etme', () => {
  // =========================================================================
  // TEST 1: 7. Sınıf Fen Bilimleri FB.7.3.1 5. Soru (Safra & Sindirim Yanılgısı)
  // Senaryodaki kasıtlı yanlış tolere edilmeli; soru onaylanmalı ve geçmelidir.
  // =========================================================================
  it('1. FB.7.3.1 5. Soru: Senaryodaki kasıtlı hata engellenmeden başarıyla geçer (status: passed, isCertified: true)', () => {
    const q5 = {
      questionNumber: 5,
      outcomeCode: 'FB.7.3.1',
      outcomeTitle: 'Sindirim sistemini oluşturan yapı ve organların görevlerini model üzerinde gözlemleyebilme',
      difficulty: 'Orta',
      cognitiveLevel: 'Karmaşık Bilişsel Süreçler',
      archetype: 'Hata Tespiti & Adım Analizi',
      points: 10,
      stimulus: "7. sınıf öğrencisi Burak sindirim sistemiyle ilgili hazırladığı posterde şu nota yer vermiştir: 'Besinler ağızdan sonra yutak ve yemek borusuna geçer. Yutak ve yemek borusu safra sıvısı salgılayarak yağların kimyasal sindirimini gerçekleştirir.'",
      questionText: "Burak'ın posterinde yer alan bilimsel hatayı tespit ediniz. Safra sıvısının gerçekte hangi organda üretildiğini ve sindirimdeki doğru işlevini gerekçesiyle açıklayınız.",
      solutionExplanation: "Safra sıvısı karaciğer tarafından üretilir, safra kesesinde depolanır. Yutak ve yemek borusu safra üretmez. Safra enzim değildir, yağların mekanik sindirimini sağlar.",
      modelAnswer: "Burak'ın posterindeki hata, safra sıvısının yutak ve yemek borusundan salgılandığı ve yağların kimyasal sindirimini yaptığı iddiasıdır. Doğrusu: Safra karaciğer tarafından üretilir ve safra kesesinde depolanır; yemek borusu ve yutakta safra salgılanmaz. Ayrıca safra bir enzim değildir, yağların fiziksel (mekanik) sindirimini sağlar.",
      rubric: [
        { criterion: 'Safranın yutak veya yemek borusunda değil, karaciğerde üretildiğinin tespiti', points: 5 },
        { criterion: 'Safranın kimyasal değil fiziksel (mekanik) sindirim yaptığının açıklanması', points: 5 }
      ],
      alternativeAnswers: [
        'Hata: Safra yutak ve yemek borusunda üretilmez, karaciğerde üretilir ve kimyasal değil fiziksel sindirim yapar.'
      ]
    };

    // 1. Soru tipi hata tespiti olarak algılanmalı
    assert.strictEqual(isIntentionalErrorDetectionQuestion(q5), true, 'Soru hata tespiti türünde tanınmalıdır');

    // 2. Kalite denetimi çalıştırılmalı
    const result = auditQuestionQuality(q5, { subjectId: 'fen_bilimleri', grade: 7 });

    // Kritik hata bulunmamalı
    const criticalFindings = result.findings.filter(f => f.severity === 'critical');
    assert.strictEqual(criticalFindings.length, 0, `Kritik hata bulunmamalıdır! Bulunanlar: ${JSON.stringify(criticalFindings)}`);
    assert.strictEqual(result.status, 'passed', 'Kalite denetim durumu "passed" olmalıdır');
    assert.strictEqual(result.isCertified, true, 'Soru onaylanmış (isCertified: true) olmalıdır');

    // 3. Öğrenci sunum filtrelemesinden eksiksiz geçmeli
    const presentationQ = sanitizeExamQuestion({ ...q5, _qaStatus: result.status, isCertified: result.isCertified } as any);
    assert.strictEqual(presentationQ.isCertified, true, 'Sunum modeli onaylı olmalıdır');
    assert.strictEqual(presentationQ.questionText, q5.questionText, 'Soru metni maskelenmemelidir');
    assert.strictEqual(presentationQ.stimulus, q5.stimulus, 'Senaryo metni korunmalıdır');
  });

  // =========================================================================
  // TEST 2: Model Cevapta Bilimsel Hata Varsa KESİNLİKLE ENGELLENMELİ (Requirement 3)
  // Model cevap kasıtlı hatayı düzeltmek yerine doğru kabul ederse
  // =========================================================================
  it('2. Model cevapta bilimsel hata onaylanırsa KESİNLİKLE ENGELLENİR (status: failed, isCertified: false)', () => {
    const qWithFlawedAnswer = {
      questionNumber: 5,
      outcomeCode: 'FB.7.3.1',
      archetype: 'Hata Tespiti & Adım Analizi',
      points: 10,
      stimulus: "Öğrenci Ali sindirim sistemi posterinde: 'Yemek borusu safra salgısı salgılar.' demiştir.",
      questionText: "Ali'nin ifadesindeki hatayı bulunuz ve doğrusunu yazınız.",
      // Hatalı model cevap: Safranın yemek borusundan salgılandığını ve kimyasal sindirim yaptığını tasdik ediyor!
      modelAnswer: "Safra sıvısı yemek borusundan salgılanır ve yağların kimyasal sindirimini sağlar.",
      rubric: [
        { criterion: 'Cevabın verilmesi', points: 10 }
      ]
    };

    const result = auditQuestionQuality(qWithFlawedAnswer, { subjectId: 'fen_bilimleri', grade: 7 });
    assert.strictEqual(result.status, 'failed', 'Model cevapta bilimsel hata olduğunda soru "failed" olmalıdır');
    assert.strictEqual(result.isCertified, false, 'Onaylanmamalıdır (isCertified: false)');

    const answerCriticalFindings = result.findings.filter(f => f.severity === 'critical' && f.field === 'answer');
    assert.ok(answerCriticalFindings.length >= 1, 'Model cevaptaki bilimsel hata için kritik finding üretilmelidir');

    // Öğrenci sunumunda maskelenmeli
    const presentationQ = sanitizeExamQuestion({ ...qWithFlawedAnswer, _qaStatus: result.status, isCertified: result.isCertified } as any);
    assert.strictEqual(presentationQ.isCertified, false);
    assert.ok(presentationQ.questionText.includes('güncellenmektedir'));
  });

  // =========================================================================
  // TEST 3: Rubrik Ölçütünde Bilimsel Hata Varsa KESİNLİKLE ENGELLENMELİ
  // =========================================================================
  it('3. Rubrik ölçütünde bilimsel hata yer alırsa KESİNLİKLE ENGELLENİR', () => {
    const qWithFlawedRubric = {
      questionNumber: 5,
      outcomeCode: 'FB.7.3.1',
      archetype: 'Hata Tespiti & Adım Analizi',
      points: 10,
      stimulus: "Öğrenci Ayşe bir poster hazırlamıştır.",
      questionText: "Posterdeki hatayı tespit edip doğrusunu açıklayınız.",
      modelAnswer: "Safra sıvısı ile ilgili hata açıklanmıştır.",
      rubric: [
        // Rubrik bilimsel hatayı puan ölçütü yapmış (safranın kimyasal sindirim yapması)
        { criterion: 'Safranın kimyasal sindirim yaptığının belirtilmesi', points: 10 }
      ]
    };

    const result = auditQuestionQuality(qWithFlawedRubric, { subjectId: 'fen_bilimleri', grade: 7 });
    assert.strictEqual(result.status, 'failed');
    assert.strictEqual(result.isCertified, false);
    assert.ok(result.findings.some(f => f.severity === 'critical' && f.field === 'answer'));
  });

  // =========================================================================
  // TEST 4: Normal Soru Türlerinde Senaryodaki Bilimsel Hata Gevşetilmez (Requirement 5)
  // =========================================================================
  it('4. Normal soru türlerinde senaryodaki bilimsel hata GEVŞETİLMEZ, yakalanır ve engellenir', () => {
    const normalQuestionWithFlaw = {
      questionNumber: 3,
      outcomeCode: 'FB.7.3.1',
      archetype: 'Kurgusal Senaryo & Vaka İncelemesi', // Hata tespiti DEĞİL, normal soru!
      points: 10,
      stimulus: "İnsan vücudunda yutak ve yemek borusu safra salgısı salgılayarak besinleri iletir.",
      questionText: "Yutak ve yemek borusunun besin iletimindeki görevini açıklayınız.", // Hata arama yok!
      modelAnswer: "Besinler yutaktan yemek borusuna, oradan mideye peristaltik hareketle iletilir.",
      rubric: [
        { criterion: 'Peristaltik hareketin açıklanması', points: 10 }
      ]
    };

    assert.strictEqual(isIntentionalErrorDetectionQuestion(normalQuestionWithFlaw), false, 'Normal soru hata tespiti sayılmamalı');

    const result = auditQuestionQuality(normalQuestionWithFlaw, { subjectId: 'fen_bilimleri', grade: 7 });
    assert.strictEqual(result.status, 'failed', 'Normal soruda senaryodaki bilimsel hata engellenmelidir');
    assert.strictEqual(result.isCertified, false);

    const stimFindings = result.findings.filter(f => f.severity === 'critical' && f.field === 'stimulus');
    assert.ok(stimFindings.length >= 1, 'Senaryodaki bilimsel hata için kritik finding üretilmelidir');
  });

  // =========================================================================
  // TEST 5: Soru Kökü ile Senaryo Tutarsızlığı (Requirement 4)
  // Soru kökü hata aratıyor ama senaryoda incelenecek bağlam / adımlar yoksa
  // =========================================================================
  it('5. Soru kökü hata aratmasına rağmen senaryoda öğrenci ifadesi veya veri yoksa tutarsızlık engellenir', () => {
    const qMissingStimulus = {
      questionNumber: 4,
      outcomeCode: 'FB.7.3.1',
      archetype: 'Hata Tespiti & Adım Analizi',
      points: 10,
      stimulus: "", // Senaryo yok!
      questionText: "Yukarıdaki öğrencinin ifadesindeki bilimsel hatayı tespit edip doğrusunu açıklayınız.",
      modelAnswer: "Doğrusu karaciğerde üretilmesidir.",
      rubric: [{ criterion: 'Doğru açıklama', points: 10 }]
    };

    const result = auditQuestionQuality(qMissingStimulus, { subjectId: 'fen_bilimleri', grade: 7 });
    assert.strictEqual(result.status, 'failed');
    assert.ok(result.findings.some(f => f.validationMethod === 'intentional_error_scenario_presence_check'));

    const qMissingSteps = {
      questionNumber: 4,
      outcomeCode: 'MAT.7.1.2',
      archetype: 'Hata Tespiti & Adım Analizi',
      points: 10,
      stimulus: "Ahmet bir rasyonel sayı problemi çözmüştür.", // Adımlar yok!
      questionText: "Ahmet ilk hatayı hangi adımda yapmıştır? Açıklayınız.",
      modelAnswer: "2. adımda hata yapılmıştır.",
      rubric: [{ criterion: 'Adım tespiti', points: 10 }]
    };

    const resultSteps = auditQuestionQuality(qMissingSteps, { subjectId: 'matematik', grade: 7 });
    assert.strictEqual(resultSteps.status, 'failed');
    assert.ok(resultSteps.findings.some(f => f.validationMethod === 'intentional_error_step_consistency_check'));
  });

  // =========================================================================
  // TEST 6: Matematik, Sosyal Bilgiler ve Din Kültürü Derslerinde Kasıtlı Yanlış Ayrımı
  // =========================================================================
  it('6. Matematik, Sosyal ve Din derslerinde kasıtlı hata tespiti soruları senaryo hatasından muaf tutulur; cevap güvenliği korunur', () => {
    // Matematik: Öğrenci senaryoda 15 + 25 = 50 hesaplamış
    const mathErrorQ = {
      questionNumber: 2,
      outcomeCode: 'MAT.5.1.2',
      outcomeTitle: 'Doğal sayılar ve işlemler içeren gerçek yaşam problemlerini çözebilme',
      archetype: 'Hata Tespiti & Adım Analizi',
      points: 10,
      stimulus: "Deniz tahtaya yazdığı problemde 15 + 25 = 50 olarak hesaplamıştır.",
      questionText: "Deniz'in işleminde yaptığı hatayı belirleyerek doğru sonucu bulunuz.",
      modelAnswer: "Deniz toplama hatası yapmıştır. 15 + 25 = 40 olmalıdır.",
      rubric: [{ criterion: 'Doğru sonucun (40) bulunması', points: 10 }]
    };

    const mathResult = auditQuestionQuality(mathErrorQ, { subjectId: 'matematik', grade: 5 });
    assert.strictEqual(mathResult.isCertified, true, 'Matematik hata tespiti onaylanmalıdır');
    assert.strictEqual(mathResult.findings.filter(f => f.severity === 'critical').length, 0);

    // Sosyal Bilgiler: Öğrenci notunda TBMM 1919'da açıldı yazmış
    const socialErrorQ = {
      questionNumber: 3,
      outcomeCode: 'İTA.8.2.1',
      archetype: 'Hata Tespiti & Adım Analizi',
      points: 10,
      stimulus: "Öğrenci Selim hazırladığı kronoloji tablosunda: 'TBMM 1919 yılında açılmış ve çalışmalara başlamıştır.' yazmıştır.",
      questionText: "Selim'in tablosundaki kronolojik hatayı tespit edip doğrusunu yazınız.",
      modelAnswer: "Hata: TBMM 1919'da değil, 23 Nisan 1920'de açılmıştır.",
      rubric: [{ criterion: '23 Nisan 1920 tarihinin belirtilmesi', points: 10 }]
    };

    const socialResult = auditQuestionQuality(socialErrorQ, { subjectId: 'sosyal_bilgiler', grade: 8 });
    assert.strictEqual(socialResult.isCertified, true, 'Sosyal bilgiler hata tespiti onaylanmalıdır');
    assert.strictEqual(socialResult.findings.filter(f => f.severity === 'critical').length, 0);

    // Din Kültürü: Öğrenci dedesine zekât verileceğini iddia etmiş
    const dinErrorQ = {
      questionNumber: 4,
      outcomeCode: 'DK.8.2.2',
      archetype: 'Hata Tespiti & Adım Analizi',
      points: 10,
      stimulus: "Mert, 'Zekât verirken öncelikle muhtaç olan dedeme zekât vermeliyim.' demiştir.",
      questionText: "Mert'in ifadesindeki fıkhi hatayı tespit ediniz ve kimlere zekât verilemeyeceğini açıklayınız.",
      modelAnswer: "Mert'in ifadesi yanlıştır. Kişi bakmakla yükümlü olduğu usûlüne (anne, baba, dede, nine) zekât veremez.",
      rubric: [{ criterion: 'Usûle (dedeye) zekât verilemeyeceğinin belirtilmesi', points: 10 }]
    };

    const dinResult = auditQuestionQuality(dinErrorQ, { subjectId: 'din_kulturu', grade: 8 });
    assert.strictEqual(dinResult.isCertified, true, 'Din kültürü hata tespiti onaylanmalıdır');
    assert.strictEqual(dinResult.findings.filter(f => f.severity === 'critical').length, 0);
  });
});
