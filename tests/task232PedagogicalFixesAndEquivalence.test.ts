import { describe, it } from 'node:test';
import assert from 'node:assert';
import { 
  auditQuestionQuality, 
  ensureExamQuality, 
  auditExamQuality,
  evaluateCandidateEligibility
} from '../src/utils/qualityAssurance';
import { SAMPLE_EXAMS } from '../src/data/sampleExams';

describe('TASK232: Hedefli Pedagojik Düzeltme ve İkame Soru Güvenilirliği Testleri', () => {

  // Test 1: Tam sayı istenen soruda ondalıklı sonuç üreten soru adayı reddedilmeli
  it('1. Tam sayı istenen soruda ondalıklı sonuç üreten aday reddedilmeli (ineligible)', () => {
    const targetQ: any = {
      id: 'target_int_q',
      questionText: 'Derinlik ortalamasını tam sayı olarak bulunuz.',
      points: 10,
      outcomeCode: 'MAT.7.1.1'
    };

    const decimalCand: any = {
      id: 'cand_decimal_q',
      questionText: 'Bulunduğu derinlik tam sayı değeri kaçtır?',
      modelAnswer: 'Hesaplama sonucu: -82.5 m derinliktedir.',
      points: 10,
      outcomeCode: 'MAT.7.1.1'
    };

    const evalRes = evaluateCandidateEligibility(targetQ, decimalCand, { grade: '7', subject: 'Matematik' });
    assert.strictEqual(evalRes.status, 'ineligible');
    assert.match(evalRes.reason || '', /ondalıklı|tam sayı/i);
  });

  // Test 2: Hatalı cevap içeren soru adayı reddedilmeli
  it('2. Hatalı aritmetik veya QA kusuru içeren aday reddedilmeli (ineligible)', () => {
    const targetQ: any = {
      id: 'target_q2',
      questionText: 'Aritmetik işlemi adım adım çözünüz.',
      points: 10,
      outcomeCode: 'MAT.7.1.1'
    };

    const faultyCand: any = {
      id: 'cand_faulty_arithmetic',
      questionText: 'İşlemin sonucunu bulunuz.',
      stimulus: 'İşlem adımları:',
      modelAnswer: '30 + 40 = 90 bulunur.', // 30 + 40 = 70 olmalı, 90 bariz aritmetik hata
      rubric: [{ criterion: 'İşlem sonucu', points: 10 }],
      points: 10,
      outcomeCode: 'MAT.7.1.1'
    };

    const evalRes = evaluateCandidateEligibility(targetQ, faultyCand, { grade: '7', subject: 'Matematik' });
    assert.strictEqual(evalRes.status, 'ineligible');
    assert.match(evalRes.reason || '', /kalite denetiminden geçemedi|kusur|hata/i);
  });

  // Test 3: EKOK sorusunun yerine EBOB sorusu ikame edilmemeli
  it('3. EKOK sorusu EBOB sorusuyla ikame edilmemeli (kavramsal odak uyuşmazlığı)', () => {
    const targetEkok: any = {
      id: 'target_ekok_q',
      questionText: 'İki vapur aynı limandan birlikte sefere çıkmaktadır. Birlikte tekrar ne zaman hareket ederler? EKOK ile bulunuz.',
      points: 10,
      outcomeCode: 'M.8.1.1.2'
    };

    const candEbob: any = {
      id: 'cand_ebob_q',
      questionText: '60 litre zeytinyağı ve 72 litre ayçiçek yağı birbirine karıştırılmadan eşit hacimli şişelere doldurulacaktır. Şişe kapasitesini EBOB ile bulunuz.',
      modelAnswer: 'EBOB(60, 72) = 12 litre bulunur.',
      rubric: [{ criterion: 'EBOB hesabı', points: 10 }],
      points: 10,
      outcomeCode: 'M.8.1.1.2'
    };

    const evalRes = evaluateCandidateEligibility(targetEkok, candEbob, { grade: '8', subject: 'Matematik' });
    assert.strictEqual(evalRes.status, 'ineligible');
    assert.match(evalRes.reason || '', /EKOK.*EBOB/i);
  });

  // Test 4: Farklı görev tipleri (Tablo vs Tablosuz Afiş/Metin) tam denk sayılmamalı
  it('4. Tablo verisi yorumlama sorusu tablosuz soruyla tam denk sayılmamalı (requires_review)', () => {
    const targetTableQ: any = {
      id: 'target_table_q',
      questionText: 'Tablodaki verileri çocuk gelişimi açısından yorumlayınız.',
      points: 14,
      outcomeCode: 'T.O.5.7'
    };

    const candNonTableQ: any = {
      id: 'cand_poster_q',
      questionText: 'Afişteki zıtlıktan hareketle öğrencilere verilmek istenen mesajı açıklayınız.',
      stimulus: 'Çevre bilinci afiş metninde yer alan detaylı açıklamalar ve ilkeler bütünü doğrultusunda temiz bir doğa için el ele verelim.',
      modelAnswer: 'Afişte doğanın korunması ve temiz çevre bilinci mesajı verilmektedir.',
      rubric: [{ criterion: 'Mesaj tespiti', points: 14 }],
      points: 14,
      outcomeCode: 'T.O.5.7'
    };

    const evalRes = evaluateCandidateEligibility(targetTableQ, candNonTableQ, { grade: '5', subject: 'Türkçe' });
    assert.strictEqual(evalRes.status, 'requires_review');
    assert.match(evalRes.reason || '', /tablo/i);
  });

  // Test 5: Görsel referansı eksik soru reddedilmeli
  it('5. Görsel referansı olan ancak görsel nesnesi bulunmayan soru QA denetiminde başarısız olmalı', () => {
    const missingVisualQ: any = {
      questionNumber: 1,
      outcomeCode: 'MAT.5.3.6',
      questionText: 'Yukarıdaki şekilde verilen üçgenin açısını bulunuz.',
      stimulus: 'Şekil 1 incelendiğinde açı değeri görülmektedir.',
      visual: undefined, // Görsel nesnesi eksik
      modelAnswer: 'Açı 60 derecedir.',
      rubric: [{ criterion: 'Açı hesabı', points: 10 }]
    };

    const audit = auditQuestionQuality(missingVisualQ, { grade: '5', subject: 'Matematik' });
    assert.strictEqual(audit.status, 'failed');
    assert.strictEqual(audit.isCertified, false);
    const visualFinding = audit.findings.find(f => f.category === 'visual_quality' || f.message.includes('görsel'));
    assert.ok(visualFinding, 'Görsel eksikliği tespit edilmeli');
  });

  // Test 6: Kaynak metin bağlamı eksik soru reddedilmeli
  it('6. Kaynak metin bağlamı eksik okuma anlama sorusu reddedilmeli', () => {
    const orphanReadingQ: any = {
      questionNumber: 2,
      outcomeCode: 'T.O.7.5',
      questionText: 'Metnin ana fikrini tek cümleyle yazınız.',
      stimulus: 'Yukarıdaki 99. sorudaki metne göre cevaplayınız.', // 99 nolu soru yok
      modelAnswer: 'Vatan sevgisidir.',
      rubric: [{ criterion: 'Ana fikir', points: 10 }]
    };

    const audit = auditQuestionQuality(orphanReadingQ, { 
      grade: '7', 
      subject: 'Türkçe',
      siblingQuestions: [] // Kardeş soru yok
    });
    assert.strictEqual(audit.status, 'failed');
    assert.strictEqual(audit.isCertified, false);
  });

  // Test 7: Aynı ikame sorusunun birden fazla senaryoda tekrarlanması cezalandırılmalı/kontrol altına alınmalı
  it('7. Çapraz senaryoda daha önce atanmış ikame adayı puan cezası almalı', () => {
    const targetQ: any = {
      id: 'target_scen_q',
      questionText: 'Üslü sayılarda çarpma işlemini yapınız.',
      difficulty: 'Orta',
      points: 10,
      outcomeCode: 'M.8.1.2.2'
    };

    const candQ: any = {
      id: 'cand_already_used_id',
      questionText: 'Üslü ifade kurallarını uygulayınız.',
      difficulty: 'Orta',
      modelAnswer: 'Cevap: 2¹⁰ bulunur.',
      rubric: [{ criterion: 'İşlem', points: 10 }],
      points: 10,
      outcomeCode: 'M.8.1.2.2'
    };

    const freshEval = evaluateCandidateEligibility(targetQ, candQ, {
      grade: '8',
      subject: 'Matematik',
      assignedSubstitutionIds: new Set()
    });

    const usedEval = evaluateCandidateEligibility(targetQ, candQ, {
      grade: '8',
      subject: 'Matematik',
      assignedSubstitutionIds: new Set(['cand_already_used_id'])
    });

    assert.ok(freshEval.score > usedEval.score, 'Önceden kullanılmış adayın uygunluk skoru daha düşük olmalı');
  });

  // Test 8: Başarısız ikame durumunda sistemin geçersiz soruyu certified işaretlemesi önlenmeli
  it('8. Uygun ikame bulunamazsa sınav otomatik olarak certified edilmemeli', () => {
    const unfixableExam: any = {
      id: 'unfixable_exam_test',
      grade: '5',
      subject: 'Matematik',
      course: 'Matematik',
      title: 'Kurgusal Geçersiz Sınav',
      questions: [
        {
          questionNumber: 1,
          outcomeCode: 'MAT.INVALID.CODE.999',
          questionText: 'Tamamen hatalı ve ikamesi olmayan bir soru kökü.',
          modelAnswer: '10 + 20 = 9999', // Bariz aritmetik kusur
          rubric: [{ criterion: 'İşlem', points: 10 }],
          points: 10
        }
      ]
    };

    const processedExam = ensureExamQuality(unfixableExam);
    const examAudit = auditExamQuality(processedExam);
    assert.strictEqual(examAudit.certifiedForStudents, false, 'İkame edilemeyen kusurlu sınav sertifikalandırılmamalıdır');
  });

  // Test 9: Rubrik toplam puanı soru puanıyla eşleşmeyen durumlar yakalanmalı
  it('9. Rubrik toplam puanı ile soru puanı uyuşmazlığı critical kusur olarak yakalanmalı', () => {
    const mismatchedRubricQ: any = {
      questionNumber: 1,
      outcomeCode: 'MAT.7.1.1',
      questionText: 'İşlemi yapınız.',
      points: 20, // Soru 20 puan
      rubric: [
        { criterion: 'Kural uygulaması', points: 5 },
        { criterion: 'Sonuç', points: 5 }
      ], // Rubrik toplamı 10 puan!
      modelAnswer: 'Sonuç: 15.',
      sourceOrigin: 'oyss_curated'
    };

    const audit = auditQuestionQuality(mismatchedRubricQ, { grade: '7', subject: 'Matematik' });
    const rubErr = audit.findings.find(f => f.validationMethod === 'rubric_sum_verification');
    assert.ok(rubErr, 'Rubrik puan uyuşmazlığı tespit edilmeli');
    assert.strictEqual(rubErr.severity, 'critical');
  });

  // Test 10: Düzeltilmiş 7. sınıf matematik sorusu QA'dan doğrudan geçmeli ve ikame edilmemeli
  it('10. TASK232 kapsamında düzeltilen 7. sınıf matematik dalgıç sorusu QA denetiminden doğrudan geçmeli', () => {
    const diverExam = SAMPLE_EXAMS.find(e => e.id === 'exam_7_matematik_1_1_senaryo_2');
    assert.ok(diverExam, 'exam_7_matematik_1_1_senaryo_2 bulunmalı');

    const q1 = diverExam.questions[0];
    const audit = auditQuestionQuality(q1, {
      examGrade: diverExam.grade,
      examCourse: diverExam.course,
      examType: diverExam.type,
      examTitle: diverExam.title
    });

    assert.strictEqual(audit.status, 'passed', 'Dalgıç sorusu passed olmalı');
    assert.strictEqual(audit.isCertified, true, 'Dalgıç sorusu sertifikalanmalı');
    assert.strictEqual(audit.findings.length, 0, 'Hiçbir kusur veya uyarı bulunmamalı');

    // ensureExamQuality çalıştırıldığında bu soru ikame edilmemeli
    const ensuredExam = ensureExamQuality(diverExam);
    const ensuredQ1 = ensuredExam.questions[0];
    assert.strictEqual(ensuredQ1._qaSubstitution, undefined, 'Soru ikame edilmeden orijinal haliyle korunmalı');
    assert.strictEqual(ensuredQ1.id, q1.id);
  });

});
