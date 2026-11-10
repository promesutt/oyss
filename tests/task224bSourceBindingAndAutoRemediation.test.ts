import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  verifyQuestionSourceBinding,
  validateAndEnrichExamQuestions,
  findMatchingCandidateSource
} from '../src/utils/sourceMaterialValidator';
import { ensureExamQuality, auditQuestionQuality } from '../src/utils/qualityAssurance';
import { ExamQuestion } from '../src/types';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

test('TASK224-B: Güvenilir Ortak Kaynak İlişkilendirme, QA ve Otomatik Soru Onarımı', async (t) => {
  await t.test('1. verifyQuestionSourceBinding Durumları ve Sınıflandırma', () => {
    // 1.1 self_contained (kaynak gerektirmeyen bağımsız soru)
    const independentMath = {
      questionText: '2x + 5 = 15 denklemini çözerek x değerini bulunuz.',
      points: 10
    };
    const b1 = verifyQuestionSourceBinding(independentMath, []);
    assert.equal(b1.isValid, true);
    assert.equal(b1.bindingType, 'self_contained');

    // 1.2 self_contained (kendi zengin metnine sahip okuma sorusu)
    const passage = 'Ekim ayının son günlerinde Ayvalık zeytinliklerinde tatlı bir telaş başlar. Köylüler sabah erkenden yola çıkar ve zeytinleri sırıklarla toplar. Toplanan zeytinler bekletilmeden fabrikaya götürülür.';
    const selfContainedReading = {
      questionText: 'Metne göre zeytinlerin toplanma aşamalarını yazınız.',
      stimulus: passage,
      outcomeCode: 'T.O.5.6'
    };
    const b2 = verifyQuestionSourceBinding(selfContainedReading, []);
    assert.equal(b2.isValid, true);
    assert.equal(b2.bindingType, 'self_contained');
    assert.equal(b2.resolvedStimulus, passage);

    // 1.3 valid_cross_reference (kardeş soruya açık atıf)
    const crossRefQuestion = {
      questionNumber: 2,
      questionText: '1. sorudaki metne göre köylülerin neden acele ettiğini açıklayınız.',
      stimulus: '1. soruya göre cevaplayınız.'
    };
    const siblings = [
      {
        questionNumber: 1,
        questionText: 'Zeytin hasadı nerede yapılmaktadır?',
        stimulus: passage
      }
    ];
    const b3 = verifyQuestionSourceBinding(crossRefQuestion, siblings);
    assert.equal(b3.isValid, true);
    assert.equal(b3.bindingType, 'valid_cross_reference');
    assert.equal(b3.sourceOwnerQuestionNumber, 1);
    assert.equal(b3.resolvedStimulus, passage);

    // 1.4 orphan_reference (var olmayan soruya atıf)
    const orphanRefQuestion = {
      questionNumber: 2,
      questionText: '8. sorudaki metne göre ana fikri yazınız.',
      stimulus: '8. soruya göre cevaplayınız.'
    };
    const b4 = verifyQuestionSourceBinding(orphanRefQuestion, siblings);
    assert.equal(b4.isValid, false);
    assert.equal(b4.bindingType, 'orphan_reference');
    assert.equal(b4.sourceOwnerQuestionNumber, 8);

    // 1.5 orphan_reference (kendi metni veya referansı olmayan yetim metin atfı)
    const orphanDeicticQuestion = {
      questionText: 'Bu metinde yazarın vermek istediği temel mesaj nedir?',
      stimulus: ''
    };
    const b5 = verifyQuestionSourceBinding(orphanDeicticQuestion, []);
    assert.equal(b5.isValid, false);
    assert.equal(b5.bindingType, 'orphan_reference');

    // 1.6 missing_source (tablo gerektiren ancak verisi olmayan soru)
    const missingTableQuestion = {
      questionText: 'Tablodaki verileri inceleyerek sıcaklık farkını bulunuz.',
      stimulus: ''
    };
    const b6 = verifyQuestionSourceBinding(missingTableQuestion, []);
    assert.equal(b6.isValid, false);
    assert.equal(b6.bindingType, 'missing_source');

    // 1.7 explicit_shared_group (ortak grup kimliği ile bağlanma)
    const groupedQ1 = {
      questionNumber: 1,
      sharedSourceId: 'group_test_100',
      stimulus: passage
    };
    const groupedQ2 = {
      questionNumber: 2,
      sharedSourceId: 'group_test_100',
      stimulus: ''
    };
    const b7 = verifyQuestionSourceBinding(groupedQ2, [groupedQ1]);
    assert.equal(b7.isValid, true);
    assert.equal(b7.bindingType, 'explicit_shared_group');
    assert.equal(b7.resolvedStimulus, passage);
    assert.equal(b7.sharedGroupId, 'group_test_100');
  });

  await t.test('2. Soru İkamesinde Mükerrerlik Koruması ve Çok Kriterli Eşleştirme', () => {
    // Sınavda zaten var olan temiz bir soru (dil bilgisi)
    const existingQ1: ExamQuestion = {
      id: 'existing_cand_1',
      questionNumber: 1,
      outcomeCode: 'T.D.5.1',
      difficulty: 'Orta',
      questionText: 'Aşağıdaki cümlede geçen isim tamlamasını bulunuz: "Okul kapısı erkenden açıldı."',
      modelAnswer: '"Okul kapısı" belirtisiz isim tamlamasıdır.',
      points: 20,
      rubric: [{ criterion: 'Tamlamayı doğru bulma', points: 20 }]
    };

    // Kusurlu (metinsiz okuma atıflı) soru
    const defectiveQ2: ExamQuestion = {
      id: 'defective_q2',
      questionNumber: 2,
      outcomeCode: 'T.Y.5.3',
      difficulty: 'Zor',
      questionText: 'Metne göre yazarın savunduğu düşünceyi yazınız.',
      stimulus: '', // Boş metin -> QA failed
      modelAnswer: 'Cevap metindedir.',
      points: 20
    };

    // İkame havuzu: Biri sınavda zaten olan (existing_cand_1), diğeri zorluk ve görseli eşleşen yeni temiz soru
    const poolCandidateDuplicate: ExamQuestion = {
      id: 'existing_cand_1',
      questionNumber: 10,
      outcomeCode: 'T.Y.5.3',
      difficulty: 'Kolay',
      questionText: 'Aşağıdaki cümlede geçen isim tamlamasını bulunuz: "Okul kapısı erkenden açıldı."',
      modelAnswer: 'Sonbaharda yapılır.',
      points: 20
    };

    const poolCandidateIdeal: ExamQuestion = {
      id: 'unique_cand_2',
      questionNumber: 11,
      outcomeCode: 'T.Y.5.3',
      difficulty: 'Zor',
      questionText: 'Kültürel mirasımızın korunmasında zanaatkârların rolünü iki maddeyle açıklayınız.',
      modelAnswer: '1. Geleneksel bilgiyi aktarırlar. 2. Kültürel kimliği yaşatırlar.',
      points: 20,
      rubric: [
        { criterion: 'Geleneksel bilgi aktarımı', points: 10 },
        { criterion: 'Kültürel kimlik', points: 10 }
      ]
    };

    const exam = {
      grade: 5,
      subjectId: 'turkce',
      questions: [existingQ1, defectiveQ2]
    };

    const fixed = ensureExamQuality(exam, {}, [poolCandidateDuplicate, poolCandidateIdeal]);
    const q2After = fixed.questions[1];

    // İkame soru mükerrer olanı DEĞİL, sınavda olmayan ideal adayı seçmeli
    assert.equal(q2After.id, 'unique_cand_2');
    assert.equal(q2After.questionNumber, 2);
    assert.equal(q2After.isCertified, true);
    assert.ok(q2After._qaStatus === 'passed' || q2After._qaStatus === 'warning');
    // Mükerrer soru sayısı 0 olmalı
    const stemSet = new Set(fixed.questions.map((q: any) => q.questionText));
    assert.equal(stemSet.size, 2);
  });

  await t.test('3. Rubrik Ölçeklemesinde reconcileRubricPoints ile Negatif Puan Koruması', () => {
    // 3 kriterli 10 puanlık bir rubrik
    const candidateWithRubric: ExamQuestion = {
      id: 'rubric_test_cand',
      questionNumber: 1,
      outcomeCode: 'MAT.5.1.1',
      difficulty: 'Orta',
      questionText: '450 sayısının çarpanlarını bulunuz.',
      modelAnswer: '1, 2, 3, 5, 9...',
      points: 10,
      rubric: [
        { criterion: '1. adım', points: 3 },
        { criterion: '2. adım', points: 4 },
        { criterion: '3. adım', points: 3 }
      ]
    };

    // Kusurlu sorunun hedef puanı 7 puan olsun (tek sayılı ve orantısız hedef)
    const defectiveTarget7: ExamQuestion = {
      id: 'defective_target_7',
      questionNumber: 1,
      outcomeCode: 'MAT.5.1.1',
      questionText: 'Kusurlu soru metni',
      points: 7,
      stimulus: ''
    };

    const fixed = ensureExamQuality(
      { grade: 5, subjectId: 'matematik', questions: [defectiveTarget7] },
      {},
      [candidateWithRubric]
    );

    const qFixed = fixed.questions[0];
    assert.equal(qFixed.points, 7);
    assert.ok(Array.isArray(qFixed.rubric));
    const rubricSum = qFixed.rubric.reduce((acc: number, r: any) => acc + (r.points ?? r.pts), 0);
    assert.equal(rubricSum, 7, 'Rubrik puan toplamı tam olarak hedef puana (7) eşit olmalı');
    // Hiçbir kriter 0 veya negatif olmamalı
    for (const r of qFixed.rubric) {
      assert.ok(r.points > 0, `Kriter puanı (${r.points}) sıfırdan büyük olmalı`);
    }
  });

  await t.test('4. ExamPaperView.tsx Dosyasında Dahili QA Uyarı Kutularının Bulunmaması', () => {
    const examPaperViewPath = resolve(process.cwd(), 'src/components/ExamPaperView.tsx');
    const content = readFileSync(examPaperViewPath, 'utf-8');
    
    // Öğrenciye sunulan soru alanında "isBlockedByQA" ve "Kalite Güvence İncelemesi Önerilir" kutusu kaldırılmış olmalı
    assert.ok(!content.includes('isBlockedByQA'), 'ExamPaperView içinde isBlockedByQA bulunmamalı');
    assert.ok(!content.includes('Kalite Güvence İncelemesi Önerilir'), 'ExamPaperView içinde "Kalite Güvence İncelemesi Önerilir" alert kutusu bulunmamalı');
  });

  await t.test('5. Ayrıştırılabilir Ortak Kaynak Grup Kimlikleri (shared_src_q*)', () => {
    const passageA = 'Ayvalık zeytin hasadı metni... ' + 'A'.repeat(100);
    const passageB = 'İnebolu Şerife Bacı kurtuluş mücadelesi... ' + 'B'.repeat(100);

    const q1: ExamQuestion = {
      questionNumber: 1,
      outcomeCode: 'T.O.5.1',
      questionText: 'Ayvalık zeytin hasadı nerede yapılır?',
      stimulus: passageA,
      points: 10
    };
    const q2: ExamQuestion = {
      questionNumber: 2,
      outcomeCode: 'T.O.5.2',
      questionText: '1. sorudaki metne göre zeytinin önemini yazınız.',
      stimulus: '1. soruya bakınız.',
      points: 10
    };
    const q3: ExamQuestion = {
      questionNumber: 3,
      outcomeCode: 'T.O.5.3',
      questionText: 'Şerife Bacı hangi zorluklara katlanmıştır?',
      stimulus: passageB,
      points: 10
    };
    const q4: ExamQuestion = {
      questionNumber: 4,
      outcomeCode: 'T.O.5.4',
      questionText: '3. sorudaki metinden hareketle fedakârlığı açıklayınız.',
      stimulus: '3. soruya göre cevaplayınız.',
      points: 10
    };

    const { enrichedQuestions: enriched, report } = validateAndEnrichExamQuestions([q1, q2, q3, q4]);

    // Sabit 'ortak_metin_1' yerine her grup kendi hedef soru numarasına göre ayrışmalı
    assert.equal(enriched[0].sharedSourceId, 'shared_src_q1');
    assert.equal(enriched[1].sharedSourceId, 'shared_src_q1');
    assert.equal(enriched[2].sharedSourceId, 'shared_src_q3');
    assert.equal(enriched[3].sharedSourceId, 'shared_src_q3');
    assert.notEqual(enriched[0].sharedSourceId, enriched[2].sharedSourceId, 'Farklı metinler farklı grup ID almalı');
    assert.equal(report.isExamFullyValid, true);
  });
});
