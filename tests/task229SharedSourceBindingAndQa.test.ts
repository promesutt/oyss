import { describe, it } from 'node:test';
import assert from 'node:assert';
import { 
  verifyQuestionSourceBinding, 
  isReadingOutcomeCode, 
  checkSemanticConnectionToSource 
} from '../src/utils/sourceMaterialValidator';
import { 
  auditQuestionQuality, 
  ensureExamQuality, 
  auditExamQuality 
} from '../src/utils/qualityAssurance';
import { SAMPLE_EXAMS } from '../src/data/sampleExams';
import { SharedSourceGroup } from '../src/utils/qualityAssurance/types';

describe('TASK229: Türkçe Ortak Okuma Metni Bağlama, Soru Gruplama ve QA İyileştirmesi', () => {

  it('1. isReadingOutcomeCode: MEB okuma anlama kazanım kodlarını doğru tespit eder', () => {
    // 5-7. sınıf T.O.* standartları
    assert.strictEqual(isReadingOutcomeCode('T.O.5.1'), true);
    assert.strictEqual(isReadingOutcomeCode('T.O.7.5'), true);
    assert.strictEqual(isReadingOutcomeCode('T.O.7.14'), true);

    // 8. sınıf T.8.3.* (3 = Okuma öğrenme alanı) standartları
    assert.strictEqual(isReadingOutcomeCode('T.8.3.5'), true);
    assert.strictEqual(isReadingOutcomeCode('T.8.3.16'), true);
    assert.strictEqual(isReadingOutcomeCode('T.8.3.17'), true);
    assert.strictEqual(isReadingOutcomeCode('T.8.3.19'), true);

    // Yazma (T.Y.*, T.8.4.*) ve diğer dersler okuma metni zorunluluğu taşımaz
    assert.strictEqual(isReadingOutcomeCode('T.Y.7.3'), false);
    assert.strictEqual(isReadingOutcomeCode('T.8.4.1'), false);
    assert.strictEqual(isReadingOutcomeCode('MAT.5.1.1'), false);
    assert.strictEqual(isReadingOutcomeCode('FB.6.2.3'), false);
    assert.strictEqual(isReadingOutcomeCode(''), false);
    assert.strictEqual(isReadingOutcomeCode(undefined), false);
  });

  it('2. checkSemanticConnectionToSource: Soru kökü ile kaynak metin arasındaki anlamsal bağı doğrular', () => {
    const readingPassage = '“Selçuklu ve Osmanlı döneminde esnafın piri sayılan Ahi Evran, çarşıdaki dürüstlük ve meslek ahlakını çok sıkı kurallara bağlamıştı. Kusurlu mal üreten esnafın pabucu dama atılırdı.”';

    // A. Genel okuma anlama kavramları (ana fikir, konu, başlık) metne otomatik bağlıdır
    assert.strictEqual(checkSemanticConnectionToSource('Bu metnin ana fikrini yazınız.', readingPassage), true);
    assert.strictEqual(checkSemanticConnectionToSource('Metnin konusunu tek bir cümleyle özetleyiniz.', readingPassage), true);
    assert.strictEqual(checkSemanticConnectionToSource('Metne göre hangisi söylenemez?', readingPassage), true);

    // B. Metin içi kavram eşleşmesi (Ahilik, esnaf, ayakkabı, dam vb.)
    assert.strictEqual(checkSemanticConnectionToSource('Ahilik teşkilatının esnaf ahlakı üzerindeki rolünü açıklayınız.', readingPassage), true);
    assert.strictEqual(checkSemanticConnectionToSource('Pabucun dama atılması nasıl bir yaptırımdır?', readingPassage), true);

    // C. Tamamen alakasız ve yabancı soru kökü (farklı ders/senaryo karışıklığı)
    const unrelatedStem = 'Güneş sistemindeki gezegenlerin güneşe olan uzaklıklarını sıralayınız.';
    assert.strictEqual(checkSemanticConnectionToSource(unrelatedStem, readingPassage), false);
  });

  it('3. verifyQuestionSourceBinding: SharedSourceGroup üzerinden kaynak çözümler', () => {
    const mockGroups: SharedSourceGroup[] = [
      {
        id: 'src_g7_turkce_s2_ahi',
        title: 'Ahilik Teşkilatı',
        sourceText: '“Selçuklu ve Osmanlı döneminde esnafın piri sayılan Ahi Evran, çarşıdaki dürüstlük ve meslek ahlakını çok sıkı kurallara bağlamıştı. Kusurlu mal üreten esnafın pabucu dama atılırdı.” (Genişletilmiş 150 karakterlik metin).',
        questionNumbers: [1, 2, 3, 4]
      }
    ];

    // Soru 2: Sadece referans cümlesi taşıyor ama grupta tanımlı
    const q2 = {
      questionNumber: 2,
      questionText: 'Ahilik teşkilatında hileli üretim yapan esnafa uygulanan yaptırımı yazınız.',
      stimulus: 'Yukarıda verilen 1. sorudaki Ahilik metnini dikkate alınız.',
      sharedSourceId: 'src_g7_turkce_s2_ahi',
      outcomeCode: 'T.O.7.7'
    };

    const res = verifyQuestionSourceBinding(q2, [], mockGroups);
    assert.strictEqual(res.isValid, true);
    assert.strictEqual(res.bindingType, 'explicit_shared_group');
    assert.strictEqual(res.sharedGroupId, 'src_g7_turkce_s2_ahi');
    assert.ok(res.resolvedStimulus && res.resolvedStimulus.length >= 80);
  });

  it('4. verifyQuestionSourceBinding: commonStimulus üzerinden doğrudan geçerli kaynak çözümler', () => {
    const commonText = '18 Mart 1915 günü Çanakkale Boğazı\x27nı geçmeye çalışan düşman zırhlıları Mecidiye Tabyası\x27nı yoğun ateş altına almıştı. Seyit Onbaşı ve arkadaşı bataryada ayakta kalan kahramanlardı.';
    const q = {
      questionNumber: 5,
      questionText: 'Çanakkale Savaşı ve Seyit Onbaşı\x27nın kahramanlığını anlatan metnin konusunu yazınız.',
      stimulus: 'Çanakkale ve Seyit Onbaşı.', // Kısa özet
      commonStimulus: commonText,
      outcomeCode: 'T.8.3.16'
    };

    const res = verifyQuestionSourceBinding(q);
    assert.strictEqual(res.isValid, true);
    assert.strictEqual(res.resolvedStimulus, commonText);
  });

  it('5. Cross-Reference: effectiveStimulus kısa referans cümlesi yerine çözümlenmiş kaynak metni seçer', () => {
    const fullSourceText = '“Selçuklu ve Osmanlı döneminde esnafın piri sayılan Ahi Evran, çarşıdaki dürüstlük ve meslek ahlakını çok sıkı kurallara bağlamıştı. Bir ayakkabıcı hatalı mal ürettiğinde o ayakkabı dama fırlatılırdı.” (Yeterli uzunlukta kaynak metin)';
    
    const siblingQ1 = {
      questionNumber: 1,
      number: 1,
      questionText: 'Metnin konusunu yazınız.',
      stimulus: fullSourceText
    };

    const q3 = {
      questionNumber: 3,
      number: 3,
      outcomeCode: 'T.O.7.14',
      questionText: 'Bu metnin giriş, gelişme ve sonuç bölümlerinde aktarılan temel bilgileri tespit ediniz.',
      stimulus: 'Yukarıda verilen 1. sorudaki Ahilik metnini dikkate alınız.',
      referencedQuestionNumber: 1,
      points: 10,
      modelAnswer: 'Giriş bölümünde Ahilik tanıtılmış, gelişmede ceza yöntemi, sonuçta ilkeler verilmiştir.',
      rubric: [{ criterion: 'Bölümlerin çözümlenmesi', points: 10 }]
    };

    const audit = auditQuestionQuality(q3, {
      siblingQuestions: [siblingQ1]
    });

    assert.strictEqual(audit.status === 'failed', false, 'Soru QA denetiminde failed durumuna düşmemelidir');
    assert.strictEqual(audit.isCertified, true, 'Soru sertifikalandırılmalıdır');
    
    // semantic_self_contained_check hatası bulunmamalıdır
    const hasSelfContainedError = audit.findings.some(f => f.validationMethod === 'semantic_self_contained_check');
    assert.strictEqual(hasSelfContainedError, false);
  });

  it('6. ensureExamQuality: Sınav düzeyinde sharedSourceGroups ve siblingQuestions aktarımı yapar', () => {
    const ahiText = '“Selçuklu ve Osmanlı döneminde esnafın piri sayılan Ahi Evran, çarşıdaki dürüstlük ve meslek ahlakını çok sıkı kurallara bağlamıştı. Bir ayakkabıcı veya saraç hatalı, çürük bir mal ürettiğinde o esnafın lonca heyeti toplanır, hatalı ayakkabıyı dükkânın çatısına (damına) fırlatırdı. Bu durum, o esnafın kusurlu mal sattığının çarşıdaki herkese ilanıydı. Pabucu dama atılmak deyimi işte bu köklü ahlak geleneğinden doğmuştur.”';
    
    const testExam = {
      id: 'test_exam_turkce_shared',
      grade: 7,
      subjectId: 'turkce',
      sharedSourceGroups: [
        {
          id: 'src_test_ahi',
          title: 'Ahilik Kültürü',
          sourceText: ahiText,
          questionNumbers: [1, 2]
        }
      ],
      questions: [
        {
          questionNumber: 1,
          outcomeCode: 'T.O.7.5',
          points: 10,
          questionText: 'Yukarıdaki Ahilik teşkilatı ve esnaf ahlakını anlatan metnin konusunu tek bir cümleyle özetleyiniz.',
          stimulus: ahiText,
          sharedSourceId: 'src_test_ahi',
          modelAnswer: 'Metnin konusu Ahilik teşkilatındaki dürüst esnaf ahlakıdır.',
          rubric: [{ criterion: 'Konu tespiti', points: 10 }]
        },
        {
          questionNumber: 2,
          outcomeCode: 'T.O.7.7',
          points: 10,
          questionText: 'Metne göre kusurlu mal üreten esnafın pabucunun dama atılması nasıl bir sonuç doğurmuştur?',
          stimulus: 'Yukarıda verilen 1. sorudaki Ahilik metnini dikkate alınız.',
          sharedSourceId: 'src_test_ahi',
          commonStimulus: ahiText,
          modelAnswer: 'Esnaflar hileli üretimden kaçınmış ve çarşıda güven ortamı sağlanmıştır.',
          rubric: [{ criterion: 'Sonucun açıklanması', points: 10 }]
        }
      ]
    };

    const res = ensureExamQuality(testExam);
    assert.strictEqual(res.qualityAudit.certifiedForStudents, true);
    assert.strictEqual(res.questions[0].isCertified, true);
    assert.strictEqual(res.questions[1].isCertified, true);
    assert.strictEqual(res.questions[1]._qaStatus !== 'failed', true);
  });

  it('7. Hedef 11 Türkçe Sınavında sharedSourceGroups tanımları eksiksizdir', () => {
    const targetExamIds = [
      'exam_7_turkce_1_1_senaryo_2',
      'exam_7_turkce_1_1_senaryo_3',
      'exam_7_turkce_1_1_senaryo_4',
      'exam_7_turkce_1_1_senaryo_5',
      'exam_7_turkce_1_1_senaryo_6',
      'exam_8_turkce_1_1_senaryo_1',
      'exam_8_turkce_1_1_senaryo_2',
      'exam_8_turkce_1_1_senaryo_3',
      'exam_8_turkce_1_1_senaryo_4',
      'exam_8_turkce_1_1_senaryo_6',
      'exam_8_turkce_1_1_senaryo_7'
    ];

    targetExamIds.forEach(id => {
      const exam = SAMPLE_EXAMS.find(e => e.id === id);
      assert.ok(exam, `Sınav bulunamadı: ${id}`);
      assert.ok(Array.isArray((exam as any).sharedSourceGroups), `${id} sharedSourceGroups dizisi içermelidir`);
      assert.ok((exam as any).sharedSourceGroups.length > 0, `${id} en az 1 sharedSourceGroup içermelidir`);
      
      const group = (exam as any).sharedSourceGroups[0];
      assert.ok(group.id, `${id} grup kimliği tanımlı olmalıdır`);
      assert.ok(group.sourceText && group.sourceText.length >= 80, `${id} kaynak metni en az 80 karakter olmalıdır`);
      assert.ok(Array.isArray(group.questionNumbers) && group.questionNumbers.length >= 2, `${id} en az 2 bağlı soru içermelidir`);
    });
  });

  it('8. Nihai 852 Soruluk Havuz Taraması: 124 sınavın tamamı ve 852 sorunun tamamı %100 onaylıdır', () => {
    let totalQuestions = 0;
    let uncertifiedQuestions = 0;
    let uncertifiedExams = 0;
    const statusCounts: Record<string, number> = { passed: 0, warning: 0, failed: 0, needs_review: 0 };

    SAMPLE_EXAMS.forEach((exam) => {
      const result = ensureExamQuality(exam);
      if (!result.qualityAudit.certifiedForStudents) {
        uncertifiedExams++;
      }
      result.questions.forEach((q: any) => {
        totalQuestions++;
        const st = q._qaStatus || 'passed';
        statusCounts[st] = (statusCounts[st] || 0) + 1;
        if (!q.isCertified || st === 'failed' || st === 'needs_review') {
          uncertifiedQuestions++;
        }
      });
    });

    assert.strictEqual(SAMPLE_EXAMS.length, 124, 'Toplam 124 sınav taranmalıdır');
    assert.strictEqual(totalQuestions, 852, 'Toplam 852 soru taranmalıdır');
    assert.strictEqual(uncertifiedExams, 0, 'Sertifikasız sınav kalmamalıdır (0)');
    assert.strictEqual(uncertifiedQuestions, 0, 'Sertifikasız soru kalmamalıdır (0)');
    assert.strictEqual(statusCounts.failed, 0, 'Failed durumunda soru kalmamalıdır (0)');
    assert.strictEqual(statusCounts.needs_review, 0, 'Needs review durumunda soru kalmamalıdır (0)');
  });

});

