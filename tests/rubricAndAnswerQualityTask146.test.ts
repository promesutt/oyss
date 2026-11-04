import assert from 'node:assert';
import { 
  isAnswerEchoingStem, 
  calibrateStemPlurality, 
  alignPunctuationFunctionAnswer,
  generateMEBIQuestions
} from '../src/utils/aiGeneratorEngine';
import { 
  distributeExamPoints, 
  reconcileRubricPoints 
} from '../src/utils/examScoring';
import { MIDDLE_SCHOOL_OFFICIAL_SCENARIOS } from '../src/data/curriculumData';
import { cleanTurkishText } from '../src/utils/aiGeneratorEngine';

console.log('=== OYSS TASK 146: CEVAP ANAHTARI VE RUBRİK KALİTE GÜVENCESİ TESTLERİ BAŞLIYOR ===\n');

let passCount = 0;
let failCount = 0;

async function runTest(name: string, fn: () => Promise<void> | void) {
  try {
    await fn();
    passCount++;
    console.log(`[PASS] ${name}`);
  } catch (err: any) {
    failCount++;
    console.error(`[FAIL] ${name}\n       Hata: ${err.message}`);
  }
}

async function runAll() {
  // --------------------------------------------------------------------------
  // TEST 1: Soru Kökünü Tekrar Eden Model Cevabın Tespiti ve Alternatiften Kurtarılması (Soru 4)
  // --------------------------------------------------------------------------
  await runTest('T1_ANSWER_ECHOING_STEM_DETECTION_AND_RECOVERY: Soru kökünü tekrar eden answer alternatif cevaptan kurtarılmalı', () => {
    const stem = "Dede Korkut bu gence neden 'Boğaç Han' adını vermiştir? Açıklayınız.";
    const echoingAnswer = "Metne göre: Dede Korkut bu gence neden 'Boğaç Han' adını vermiştir?";
    const validAlternative = "Boğayı yendiği ve olağanüstü bir cesaret sergilediği için bu adı vermiştir.";
    const badAlternative = "Dede Korkut bu gence neden bu adı vermiştir?";

    // 1. Tespit kontrolü
    assert.strictEqual(isAnswerEchoingStem(echoingAnswer, stem), true, 'Soru kökünü tekrarlayan cevap tespit edilmeli');
    assert.strictEqual(isAnswerEchoingStem(badAlternative, stem), true, 'Soru kökünü tekrarlayan alternatif cevap da tespit edilmeli');
    assert.strictEqual(isAnswerEchoingStem(validAlternative, stem), false, 'Gerçek model cevap tekrar olarak işaretlenmemeli');

    // 2. aiGeneratorEngine içindeki normalizasyon mantığının kurtarma davranışı
    let candidateAnswer = echoingAnswer;
    let altAnswers = [validAlternative, badAlternative];

    if (isAnswerEchoingStem(candidateAnswer, stem)) {
      const viableIdx = altAnswers.findIndex(alt => !isAnswerEchoingStem(alt, stem) && alt.trim().length > 0);
      assert.strictEqual(viableIdx, 0, 'Geçerli alternatif cevap index 0 olmalı');
      candidateAnswer = altAnswers[viableIdx];
      altAnswers.splice(viableIdx, 1);
    }

    // Temizleme: Kalan alternatiflerden soru kökünü tekrar edenler elenmeli
    const sanitizedAlt = altAnswers.filter(alt => !isAnswerEchoingStem(alt, stem));

    assert.strictEqual(candidateAnswer, validAlternative, 'Model cevap başarıyla alternatif cevaptan kurtarılmalı');
    assert.strictEqual(sanitizedAlt.length, 0, 'Kusurlu alternatif cevap filtrelenmeli');
  });

  // --------------------------------------------------------------------------
  // TEST 2: Tekil/Çoğul Hata Uyumu - Tek Hatalı Stimulus İçin Soru Kökü Kalibrasyonu (Soru 6)
  // --------------------------------------------------------------------------
  await runTest('T2_SINGULAR_PLURAL_CALIBRATION: Tek hata içeren stimulus ve cevap için soru kökü tekile kalibre edilmeli', () => {
    const pluralStem1 = "Metindeki yazım ve noktalama yanlışlarını bularak doğrularını yazınız.";
    const pluralStem2 = "Metindeki yazım yanlışlarını bularak doğrularını yazınız.";
    const pluralStem3 = "Metindeki yazım yanlışlarını bulunuz.";
    
    const singleErrorStimulus = "Dün sabah erkenden Ankaraya doğru yola çıktık.";
    const singleErrorAnswer = "Ankaraya sözcüğü özel isim olduğu için kesme işaretiyle 'Ankara'ya' şeklinde yazılmalıdır.";

    const calibrated1 = calibrateStemPlurality(pluralStem1, singleErrorStimulus, singleErrorAnswer);
    const calibrated2 = calibrateStemPlurality(pluralStem2, singleErrorStimulus, singleErrorAnswer);
    const calibrated3 = calibrateStemPlurality(pluralStem3, singleErrorStimulus, singleErrorAnswer);

    assert.strictEqual(calibrated1, "Metindeki yazım yanlışını bularak doğrusunu yazınız.", 'Yazım ve noktalama yanlışlarını tekile çevrilmeli');
    assert.strictEqual(calibrated2, "Metindeki yazım yanlışını bularak doğrusunu yazınız.", 'Yazım yanlışlarını tekile çevrilmeli');
    assert.strictEqual(calibrated3, "Metindeki yazım yanlışını bulunuz.", 'Yazım yanlışlarını bulunuz tekil yapılmalı');

    // Gerçekten birden fazla hata içeren durumda çoğul korunmalı:
    const multiErrorAnswer = "1. 'Ankaraya' sözcüğü 'Ankara'ya' olmalı;\n2. Cümle sonundaki virgül yerine nokta konmalıdır.";
    const preserved = calibrateStemPlurality(pluralStem1, singleErrorStimulus, multiErrorAnswer);
    assert.strictEqual(preserved, pluralStem1, 'Birden fazla hata açıklayan cevapta çoğul kök korunmalı');
  });

  // --------------------------------------------------------------------------
  // TEST 3: Noktalama Görevleri Soru Kökü ve Model Cevap Uyumlandırması (Soru 5)
  // --------------------------------------------------------------------------
  await runTest('T3_PUNCTUATION_FUNCTION_ALIGNMENT: Noktalama işaretlerinin görevleri sorulduğunda model cevap işaret bazında yapılandırılmalı', () => {
    const stem = "Metinde kullanılan iki nokta ve tırnak işaretinin görevlerini metinden hareketle açıklayınız.";
    const looseAnswer = "Kendisinden sonra konuşma geleceğini belirtmek ve başkasından aktarılan sözü göstermek için kullanılmıştır.";

    const aligned = alignPunctuationFunctionAnswer(stem, looseAnswer);
    assert.ok(aligned.includes('İki nokta'), 'İki nokta başlığı eklenmeli');
    assert.ok(aligned.includes('Tırnak işareti'), 'Tırnak işareti başlığı eklenmeli');
    assert.ok(aligned.includes(looseAnswer), 'Orijinal cevap korunmalı');

    // Zaten işaretleri içeren yapılandırılmış cevap değiştirilmemeli:
    const structuredAnswer = "İki nokta: Konuşma cümlesinden önce kullanılmıştır. Tırnak işareti: Aktarma sözünü belirtmiştir.";
    const unchanged = alignPunctuationFunctionAnswer(stem, structuredAnswer);
    assert.strictEqual(unchanged, structuredAnswer, 'Zaten yapılandırılmış cevap bozulmamalı');
  });

  // --------------------------------------------------------------------------
  // TEST 4: Yüksek Puanlı (>= 12 Puan) Sorularda Tek Ölçütlü Rubriğin Analitik Bölünmesi (Soru 1)
  // --------------------------------------------------------------------------
  await runTest('T4_MONOLITHIC_HIGH_POINTS_RUBRIC_SPLIT: >= 12 puanlık tek ölçütlü rubrik 2 basamağa ayrılmalı ve toplam puanı korumalı', () => {
    // 17 puanlık tek ölçüt (Soru 1 örneği)
    const single17 = [{ criterion: 'Metnin ana fikrinin ve yardımcı fikirlerinin tespiti', points: 17 }];
    const rec17 = reconcileRubricPoints(single17, 17);
    assert.strictEqual(rec17.length, 2, '17 puanlık tek ölçüt 2 analitik basamağa ayrılmalı');
    assert.strictEqual(rec17[0].points, 9, 'İlk basamak tavan yuvarlama (9 p) almalı');
    assert.strictEqual(rec17[1].points, 8, 'İkinci basamak kalan (8 p) almalı');
    assert.strictEqual(rec17[0].points + rec17[1].points, 17, 'Puan toplamı tam 17 olmalı');
    assert.ok(rec17[0].criterion.toLowerCase().includes('temel'), '1. basamak kavramsal/temel tespit kriteri içermeli');
    assert.ok(rec17[1].criterion.toLowerCase().includes('gerekçelendirme') || rec17[1].criterion.toLowerCase().includes('analitik'), '2. basamak gerekçelendirme kriteri içermeli');

    // 15 puanlık tek ölçüt
    const single15 = [{ criterion: 'Diyalogdaki kavram yanılgısının belirlenmesi', points: 15 }];
    const rec15 = reconcileRubricPoints(single15, 15);
    assert.strictEqual(rec15.length, 2, '15 puanlık tek ölçüt 2 analitik basamağa ayrılmalı');
    assert.strictEqual(rec15[0].points + rec15[1].points, 15, '15 puan toplamı korunmalı');
    assert.strictEqual(rec15[0].points, 8);
    assert.strictEqual(rec15[1].points, 7);

    // 16 puanlık tek ölçüt
    const single16 = [{ criterion: 'Deney sonuçlarının yorumlanması', points: 16 }];
    const rec16 = reconcileRubricPoints(single16, 16);
    assert.strictEqual(rec16.length, 2, '16 puanlık tek ölçüt 2 analitik basamağa ayrılmalı');
    assert.strictEqual(rec16[0].points + rec16[1].points, 16, '16 puan toplamı korunmalı');
    assert.strictEqual(rec16[0].points, 8);
    assert.strictEqual(rec16[1].points, 8);

    // 20 puanlık tek ölçüt
    const single20 = [{ criterion: 'Metin analizi', points: 20 }];
    const rec20 = reconcileRubricPoints(single20, 20);
    assert.strictEqual(rec20.length, 2, '20 puanlık tek ölçüt 2 analitik basamağa ayrılmalı');
    assert.strictEqual(rec20[0].points + rec20[1].points, 20, '20 puan toplamı korunmalı');
    assert.strictEqual(rec20[0].points, 10);
    assert.strictEqual(rec20[1].points, 10);

    // < 12 puanlık tek ölçüt (örnek: 8 veya 10 puan) yapay olarak BÖLÜNMEMELİ
    const single10 = [{ criterion: 'Kısa tanım', points: 10 }];
    const rec10 = reconcileRubricPoints(single10, 10);
    assert.strictEqual(rec10.length, 1, '10 puanlık tek ölçüt bölünmemeli, tek ölçüt kalmalı');
    assert.strictEqual(rec10[0].points, 10, '10 puan tek ölçüte atanmalı');
  });

  // --------------------------------------------------------------------------
  // TEST 5: Sınav Üretim Hattında Uçtan Uca Kalibrasyon ve Rubrik Puan Toplam Tutarlılığı
  // --------------------------------------------------------------------------
  await runTest('T5_END_TO_END_EXAM_CALIBRATION_PIPELINE: 5. Sınıf Türkçe 6 soruluk sınavda 4 sorunun tamamı düzeltilmiş olarak üretilmeli', async () => {
    // 5. Sınıf Türkçe Senaryo 1 (6 Soru) simülasyonu
    const pointsDistribution = distributeExamPoints(6); // [17, 17, 17, 17, 16, 16] = 100
    assert.strictEqual(pointsDistribution.reduce((a, b) => a + b, 0), 100, 'Toplam puan 100 olmalı');

    // Mock Gemini yanıtı (Kullanıcının karşılaştığı 4 kusurlu soruyu içeren sınav)
    const mockGeminiExam = {
      questions: [
        {
          number: 1,
          outcome: "T.O.5.6",
          outcomeTitle: "Metindeki yüzey anlamı belirler",
          difficulty: "Orta",
          level: "Karmaşık Bilişsel Süreçler",
          templateType: "Kurgusal Senaryo & Vaka İncelemesi",
          points: 17,
          stimulus: "Geleneksel ahşap oymacılığı ustası Salih Bey, atölyesinde çırağı Umut ile birlikte ıhlamur ağacından geometrik motifli sandık kapakları yapmaktadır. Salih Usta, 'Ağacın damarını hissetmeyen, desenin ruhunu göremez.' diyerek çırağına sabırlı olmayı öğütler.",
          question: "Metne göre Salih Usta'nın çırağına 'Ağacın damarını hissetmeyen, desenin ruhunu göremez.' sözüyle vermek istediği temel öğüdü açıklayınız.",
          answer: "Salih Usta bu sözüyle zanaatta sabrın, malzemeyi tanımanın ve yapılan işe sevgiyle bağlanmanın önemini öğütlemektedir.",
          rubric: [
            // KUSUR 4: Tek kriter 17 puan verilmiş
            { item: "Salih Usta'nın sözündeki sabır ve işini tanıma öğüdünün doğru tespiti", pts: 17 }
          ]
        },
        {
          number: 2,
          outcome: "T.O.5.7",
          outcomeTitle: "Metinle ilgili soruları cevaplar",
          difficulty: "Kolay",
          level: "Basit Bilişsel Süreçler",
          templateType: "Kurgusal Senaryo & Vaka İncelemesi",
          points: 17,
          stimulus: "Ege kıyılarındaki eski bir zeytinlikte dedesinden kalma asırlık zeytin ağaçlarını koruyan Selim Bey, geleneksel taş baskı yöntemiyle zeytinyağı çıkarmaktadır.",
          question: "Selim Bey'in zeytin ağaçlarını korumak için uyguladığı yöntemi açıklayınız.",
          answer: "Taş baskı yöntemi uygulayarak geleneksel zeytinyağı üretimini sürdürmektedir.",
          rubric: [
            { item: "Yöntemin doğru açıklanması", pts: 9 },
            { item: "Geleneksel üretimle ilişkilendirilmesi", pts: 8 }
          ]
        },
        {
          number: 3,
          outcome: "T.O.5.8",
          outcomeTitle: "Metnin ana fikrini belirler",
          difficulty: "Orta",
          level: "Karmaşık Bilişsel Süreçler",
          templateType: "Kurgusal Senaryo & Vaka İncelemesi",
          points: 17,
          stimulus: "Köy çeşmesinin oluğunu temizleyen gençler, suyun boşa akmasını engellemek için el birliğiyle bir havuz inşa ettiler.",
          question: "Metinde anlatılan olaydan çıkarılacak ana düşünceyi yazınız.",
          answer: "Birlik ve beraberlik içinde çalışmak toplumsal sorunları çözer.",
          rubric: [
            { item: "Ana düşüncenin tespiti", pts: 9 },
            { item: "Açıklama basamağı", pts: 8 }
          ]
        },
        {
          number: 4,
          outcome: "T.O.5.6",
          outcomeTitle: "Metindeki olay örgüsünü kavrar",
          difficulty: "Orta",
          level: "Karmaşık Bilişsel Süreçler",
          templateType: "Kurgusal Senaryo & Vaka İncelemesi",
          points: 17,
          stimulus: "Dede Korkut hikâyelerinde Dirse Han'ın oğlu boğayı alt ettikten sonra beyler toplanır. Dede Korkut gelir ve boy boylar, soy soylar.",
          // KUSUR 1: Soru kökü
          question: "Dede Korkut bu gence neden 'Boğaç Han' adını vermiştir? Açıklayınız.",
          // KUSUR 1: Answer soru kökünü papağan gibi tekrar etmiş!
          answer: "Metne göre: Dede Korkut bu gence neden 'Boğaç Han' adını vermiştir?",
          // Ama doğru cevap alternatifte var:
          alternativeAnswers: [
            "Gence boğayı güreşerek mağlup ettiği ve olağanüstü bir cesaret gösterdiği için Boğaç Han adı verilmiştir."
          ],
          rubric: [
            { item: "Boğaç Han adının verilme gerekçesini açıklama", pts: 9 },
            { item: "Metindeki cesaret olgusuyla ilişkilendirme", pts: 8 }
          ]
        },
        {
          number: 5,
          outcome: "T.Y.5.16",
          outcomeTitle: "Noktalama işaretlerini işlevlerine uygun kullanır",
          difficulty: "Orta",
          level: "Basit Bilişsel Süreçler",
          templateType: "Hata Tespiti & Adım Analizi",
          points: 16,
          stimulus: "Usta çırağına dönerek şöyle dedi: 'Ağacın damarını hissetmeyen, desenin ruhunu göremez.'",
          // KUSUR 3: Noktalama işaretlerinin görevlerini açıklatıyor:
          question: "Metinde kullanılan iki nokta ve tırnak işaretinin görevlerini metinden hareketle açıklayınız.",
          // Gevşek cevap:
          answer: "Konuşma cümlesini ve başkasından aktarılan sözü belirtmek amacıyla kullanılmıştır.",
          rubric: [
            { item: "İki noktanın görevini açıklama", pts: 8 },
            { item: "Tırnak işaretinin görevini açıklama", pts: 8 }
          ]
        },
        {
          number: 6,
          outcome: "T.Y.5.16",
          outcomeTitle: "Yazım kurallarını uygular",
          difficulty: "Orta",
          level: "Basit Bilişsel Süreçler",
          templateType: "Hata Tespiti & Adım Analizi",
          points: 16,
          stimulus: "Dün sabah erkenden Ankaraya doğru trenle hareket ettik.",
          // KUSUR 2: Çoğul hata istiyor ama metinde sadece 'Ankaraya' tek hata var!
          question: "Metindeki yazım ve noktalama yanlışlarını bularak doğrularını yazınız.",
          answer: "Metindeki 'Ankaraya' sözcüğü özel isim olduğu için kesme işaretiyle 'Ankara'ya' şeklinde yazılmalıdır.",
          rubric: [
            { item: "Metindeki yazım ve noktalama yanlışlarını bulma", pts: 8 },
            { item: "Doğrusunu yazma", pts: 8 }
          ]
        }
      ]
    };

    // generateMEBIQuestions mock ortamında çalıştığında normalizeAndCalibrateQuestions çalışır
    const globalFetchBackup = globalThis.fetch;
    globalThis.fetch = async () => {
      return {
        ok: true,
        json: async () => ({
          success: true,
          questions: mockGeminiExam.questions
        })
      } as any;
    };

    try {
      const scenario = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[5]?.turkce?.[0];
      assert.ok(scenario, '5. Sınıf Türkçe Senaryo 1 bulunamadı');

      const result = await generateMEBIQuestions(
        'turkce',
        5,
        scenario,
        0
      );

      const questions = result.generatedQuestions;
      assert.strictEqual(questions.length, 6, '6 soru eksiksiz üretilmeli');

      // KUSUR 1 Kontrolü (Soru 4): Model cevap soru kökünü tekrar etmemeli, alternatiften kurtarılmış olmalı
      const q4 = questions[3];
      assert.strictEqual(
        isAnswerEchoingStem(q4.answer, q4.question),
        false,
        'Soru 4 model cevabı soru kökünü tekrar etmemeli'
      );
      assert.ok(
        q4.answer.includes('boğayı') || q4.answer.includes('Boğaç') || q4.answer.includes('cesaret'),
        'Soru 4 model cevabı alternatif cevap içeriğiyle kurtarılmış olmalı'
      );

      // KUSUR 2 Kontrolü (Soru 6): Çoğul kök tekile kalibre edilmeli
      const q6 = questions[5];
      assert.strictEqual(
        q6.question.includes('yanlışını bularak doğrusunu'),
        true,
        `Soru 6 soru kökü tekil olmalı. Mevcut: ${q6.question}`
      );
      assert.strictEqual(
        q6.question.includes('yanlışlarını'),
        false,
        'Soru 6 soru kökünde çoğul yanlışlarını kalmamalı'
      );

      // KUSUR 3 Kontrolü (Soru 5): Noktalama görevi soru-cevap uyumu
      const q5 = questions[4];
      assert.ok(
        q5.answer.includes('İki nokta') && q5.answer.includes('Tırnak işareti'),
        `Soru 5 cevabı işaret adlarıyla uyumlandırılmış olmalı. Mevcut: ${q5.answer}`
      );

      // KUSUR 4 Kontrolü (Soru 1): 17 puanlık tek ölçütlü rubrik 2 basamağa ayrılmış olmalı
      const q1 = questions[0];
      assert.strictEqual(q1.rubric.length, 2, 'Soru 1 rubriği 2 basamağa bölünmeli');
      const q1RubricSum = q1.rubric.reduce((sum, r) => sum + r.pts, 0);
      assert.strictEqual(q1RubricSum, 17, 'Soru 1 rubrik puan toplamı tam 17 olmalı');

      // Genel Puan Tutarlılığı Kontrolü:
      let totalExamRubricSum = 0;
      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const rSum = q.rubric.reduce((sum, r) => sum + r.pts, 0);
        assert.strictEqual(rSum, q.points, `Soru ${i + 1} rubrik toplamı (${rSum}) soru puanına (${q.points}) eşit olmalı`);
        totalExamRubricSum += rSum;
      }
      assert.strictEqual(totalExamRubricSum, 100, 'Tüm sınav rubrik puan toplamı tam 100 olmalı');

    } finally {
      globalThis.fetch = globalFetchBackup;
    }
  });

  console.log('\n====================================================');
  console.log(`TOPLAM TEST: ${passCount + failCount}`);
  console.log(`BAŞARILI   : ${passCount}`);
  console.log(`BAŞARISIZ  : ${failCount}`);
  console.log('====================================================\n');

  if (failCount > 0) {
    process.exit(1);
  } else {
    console.log('>>> TÜM TASK 146 CEVAP VE RUBRİK KALİTE TESTLERİ BAŞARIYLA GEÇTİ! <<<');
  }
}

runAll();
