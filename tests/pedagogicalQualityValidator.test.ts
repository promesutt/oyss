import { generateMEBIQuestions } from '../src/utils/aiGeneratorEngine';
import { MIDDLE_SCHOOL_OFFICIAL_SCENARIOS } from '../src/data/curriculumData';

/**
 * Task 130: Pedagojik Kalite Denetimi ve Cerrahi İkame Doğrulama Testi
 */
async function runPedagogicalQualityTests() {
  console.log('=== OYSS GÖREV 130: PEDAGOJİK KALİTE DENETİMİ BİRİM VE ENTEGRASYON TESTLERİ ===\n');

  let passed = 0;
  let failed = 0;

  function assert(desc: string, condition: boolean, extraInfo?: string) {
    if (condition) {
      console.log(`✓ BAŞARILI: ${desc}`);
      passed++;
    } else {
      console.error(`✗ BAŞARISIZ: ${desc}`);
      if (extraInfo) console.error(`  Ayrıntı: ${extraInfo}`);
      failed++;
    }
  }

  const scenario = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[5].turkce![0];

  // Test 1: Soru 1'deki "Çilek avcılığı" (17 puan, 1 kelimelik kopyalama) sorusunun yakalanıp MEB sorusuyla cerrahi ikamesi
  // Not: Anti-duplication filtresine takılmamak için sorular özgün metinlerle simüle edilir
  const defectiveSample = [
    {
      number: 1,
      outcome: 'T.O.5.6',
      points: 17,
      difficulty: 'Kolay',
      stimulus: 'Kerem ve annesi cumartesi sabahı pazara gittiler. Annesi manav tezgahından taze çilek satın aldı.',
      question: 'Yukarıdaki metne göre Kerem ve annesi pazardan hangi meyveyi satın almışlardır? Tek bir cümleyle yazınız.',
      answer: 'Çilek.',
      rubric: [{ item: 'Meyveyi doğru bilmek', pts: 17 }],
      sourceOrigin: 'gemini_ai'
    },
    {
      number: 2,
      outcome: 'T.O.5.6',
      points: 17,
      difficulty: 'Orta',
      stimulus: 'Köy okulunun bahçesindeki asırlık çınar ağacına yeni ahşap kuş yuvaları asılmıştır. Yuvalar rüzgâr almayan alt dallara yerleştirilmiş ve kuşların kışın korunması amaçlanmıştır.',
      question: 'Kuş yuvaları ağacın hangi kısmına asılmıştır ve bunun temel amacı nedir? Özgün biçimde açıklayınız.',
      answer: 'Yuvalar rüzgâr almayan alt dallara asılmıştır; temel amacı kuşları kışın soğuk rüzgârdan korumaktır.',
      rubric: [
        { item: 'Yuvanın yerini doğru açıklama', pts: 9 },
        { item: 'Asılma amacını açıklama', pts: 8 }
      ],
      sourceOrigin: 'gemini_ai'
    },
    {
      number: 3,
      outcome: 'T.O.5.7',
      points: 17,
      difficulty: 'Orta',
      stimulus: 'Tasarruf haftası kapsamında hazırlanan su bülteninde suyun önemi kapsamlıca işlenmektedir.',
      question: 'Bültende verilmek istenen ana düşünceyi gerekçesiyle açıklayınız.',
      answer: 'Suyun geleceğimiz olduğu ve israf edilmemesi gerektiği vurgulanmaktadır.',
      rubric: [{ item: 'Ana düşünceyi belirleme', pts: 17 }],
      sourceOrigin: 'gemini_ai'
    },
    {
      number: 4,
      outcome: 'T.O.5.20',
      points: 16,
      difficulty: 'Orta',
      stimulus: 'Zamanın su gibi akıp gittiğini fark eden dede, torununa eski günlerin hatırasını anlattı.',
      question: 'Metinde geçen "zamanın su gibi akıp gitmesi" ifadesinin metne kattığı anlamsal derinliği açıklayınız.',
      answer: 'Zamanın çok hızlı ve durdurulamaz biçimde akıp geçmesi anlamındadır.',
      rubric: [{ item: 'Deyimin anlamını açıklama', pts: 16 }],
      sourceOrigin: 'gemini_ai'
    },
    {
      number: 5,
      outcome: 'T.Y.5.13',
      points: 17,
      difficulty: 'Zor',
      stimulus: 'Rüzgâr yaşlı çınar ağacının dallarıyla tatlı tatlı fısıldaşıyordu.',
      question: 'Metindeki söz sanatından hareketle doğayla ilgili kişileştirme içeren özgün bir cümle kurunuz.',
      answer: 'Güneş bulutların arkasından bize sıcacık gülümsüyordu.',
      rubric: [{ item: 'Özgün kişileştirme cümlesi kurma', pts: 17 }],
      sourceOrigin: 'gemini_ai'
    },
    {
      number: 6,
      outcome: 'T.Y.5.16',
      points: 16,
      difficulty: 'Zor',
      stimulus: 'Ahmet te kütüphaneye buraya geldimi henüz öğrenemedim.',
      question: 'Metindeki yazım kurallarına aykırı kullanımları bularak cümlenin hatasız halini yazınız.',
      answer: 'Ahmet de kütüphaneye buraya geldi mi, henüz öğrenemedim.',
      rubric: [{ item: 'Hataları doğru düzeltme', pts: 16 }],
      sourceOrigin: 'gemini_ai'
    }
  ];

  // Global fetch mock to simulate Gemini returning defectiveSample
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    return {
      ok: true,
      status: 200,
      json: async () => ({ questions: defectiveSample, activeModel: 'Gemini 3.5 Flash Lite Mock' })
    } as any;
  };

  try {
    const result = await generateMEBIQuestions('turkce', 5, scenario, 0);
    const questions = result.generatedQuestions;

    assert('Sınav 6 soru üretmelidir', questions.length === 6, `Alınan soru sayısı: ${questions.length}`);

    // Soru 1 kontrolü: "Çilek avcılığı" kusurlu sorusu yakalanıp oyss_curated referans soruyla ikame edilmeli
    const q1 = questions[0];
    assert(
      'Soru 1 yüzeysellik nedeniyle cerrahi olarak MEB onaylı referans soruyla ikame edilmelidir (sourceOrigin: oyss_curated)',
      q1.sourceOrigin === 'oyss_curated' && !q1.question.includes('hangi meyveyi'),
      `q1.sourceOrigin: ${q1.sourceOrigin}, question: ${q1.question.slice(0, 80)}`
    );

    // Soru 2 kontrolü: Kuş yuvaları meşru bir anlama sorusu olduğu için korunmalıdır (sourceOrigin: gemini_ai)
    const q2 = questions[1];
    assert(
      'Soru 2 meşru yüzey anlama sorusu olduğu için korunmalıdır (sourceOrigin: gemini_ai)',
      q2.sourceOrigin === 'gemini_ai' && q2.question.includes('Kuş yuvaları'),
      `q2.sourceOrigin: ${q2.sourceOrigin}`
    );

    // Soru 4 ve 5 kontrolü: Nitelikli sorular korunmalıdır
    const q4 = questions[3];
    const q5 = questions[4];
    assert(
      'Soru 4 ve 5 gemini_ai olarak korunmalıdır',
      q4.sourceOrigin === 'gemini_ai' && q5.sourceOrigin === 'gemini_ai',
      `q4: ${q4.sourceOrigin}, q5: ${q5.sourceOrigin}`
    );

    // Soru 6 kontrolü: "Zor" etiketli basit yazım kuralı sorusu "Orta" düzeyine kalibre edilmelidir
    const q6 = questions[5];
    assert(
      'Soru 6 yazım-noktalama zorluk etiketi Zor yerine Orta olarak kalibre edilmelidir',
      q6.difficulty === 'Orta',
      `q6.difficulty: ${q6.difficulty}`
    );

  } finally {
    globalThis.fetch = originalFetch;
  }

  // Test 2: Matematik dersinde kısa geçerli cevap ("45 TL") yanlışlıkla elenmemelidir
  const mathScenario = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[5].matematik![0];
  const mathSample = [
    {
      number: 1,
      outcome: 'M.5.1.1.1',
      points: 15,
      difficulty: 'Kolay',
      stimulus: 'Ahmet Bey kırtasiyede 120 TL harcama yapmıştır. Cüzdanında 165 TL nakit bulunuyordu.',
      question: 'Ahmet Bey\'in alışveriş sonrasında cebinde kalan parasını işlem yaparak bulunuz.',
      answer: '45 TL',
      rubric: [{ item: 'Kalan parayı doğru bulma', pts: 15 }],
      sourceOrigin: 'gemini_ai'
    },
    {
      number: 2,
      outcome: 'M.5.1.1.2',
      points: 15,
      difficulty: 'Orta',
      stimulus: 'Bir okul kütüphanesine her biri 24 kitaptan oluşan 15 koli kitap bağışlanmıştır.',
      question: 'Kütüphaneye toplam kaç adet kitap bağışlandığını çarpma işlemiyle hesaplayınız.',
      answer: '360 kitap',
      rubric: [{ item: 'Toplam kitap sayısını bulma', pts: 15 }],
      sourceOrigin: 'gemini_ai'
    },
    {
      number: 3,
      outcome: 'M.5.1.1.3',
      points: 14,
      difficulty: 'Orta',
      stimulus: 'Bir çiftçi 480 kg elmayı 12 kg çuvallara paylaştıracaktır.',
      question: 'Çiftçinin bu işlem için kaç çuvala ihtiyacı olduğunu bulunuz.',
      answer: '40 çuval',
      rubric: [{ item: 'Çuval sayısını bulma', pts: 14 }],
      sourceOrigin: 'gemini_ai'
    },
    {
      number: 4,
      outcome: 'M.5.1.2.1',
      points: 14,
      difficulty: 'Orta',
      stimulus: 'Bir koşucu 3/5 kilometrelik parkuru koşmuştur.',
      question: 'Koşucunun koştuğu mesafeyi birim kesir cinsinden ifade ediniz.',
      answer: '3 adet 1/5',
      rubric: [{ item: 'Birim kesir ifadesi', pts: 14 }],
      sourceOrigin: 'gemini_ai'
    },
    {
      number: 5,
      outcome: 'M.5.1.2.2',
      points: 14,
      difficulty: 'Orta',
      stimulus: 'Ayşe pastanın 2/7\'sini, Can ise 3/7\'sini yemiştir.',
      question: 'Yenen toplam pasta miktarını bulunuz.',
      answer: '5/7',
      rubric: [{ item: 'Kesir toplamı', pts: 14 }],
      sourceOrigin: 'gemini_ai'
    },
    {
      number: 6,
      outcome: 'M.5.1.2.3',
      points: 14,
      difficulty: 'Orta',
      stimulus: 'Bir sürahideki 4/9 litre suya 2/9 litre su eklenmiştir.',
      question: 'Sürahideki son su miktarını hesaplayınız.',
      answer: '6/9 litre',
      rubric: [{ item: 'Son su miktarı', pts: 14 }],
      sourceOrigin: 'gemini_ai'
    },
    {
      number: 7,
      outcome: 'M.5.1.2.4',
      points: 14,
      difficulty: 'Zor',
      stimulus: 'Bir havuzun 7/10\'u doludur. Havuzdan 3/10\'luk su boşaltılmıştır.',
      question: 'Havuzda kalan su oranını bulunuz.',
      answer: '4/10',
      rubric: [{ item: 'Kalan su oranı', pts: 14 }],
      sourceOrigin: 'gemini_ai'
    }
  ];

  globalThis.fetch = async () => {
    return {
      ok: true,
      status: 200,
      json: async () => ({ questions: mathSample, activeModel: 'Gemini Mock' })
    } as any;
  };

  try {
    const mathResult = await generateMEBIQuestions('matematik', 5, mathScenario, 0);
    const mathQ1 = mathResult.generatedQuestions[0];
    assert(
      'Matematik dersindeki kısa geçerli cevap (45 TL) yanlış pozitif olarak elenmemeli ve gemini_ai olarak korunmalıdır',
      mathQ1.sourceOrigin === 'gemini_ai' && mathQ1.answer === '45 TL',
      `mathQ1.sourceOrigin: ${mathQ1.sourceOrigin}, answer: ${mathQ1.answer}`
    );
  } finally {
    globalThis.fetch = originalFetch;
  }

  // Test 3: Sahte görsel tasviri içeren soru cerrahi olarak ikame edilmelidir
  const fakeVisualSample = [
    {
      number: 1,
      outcome: 'T.O.5.6',
      points: 17,
      difficulty: 'Orta',
      stimulus: 'Kerem fener bekçisi Hasan Dedeyi dinlemiştir.',
      question: 'Karakterin yaşadığı fedakarlığı açıklayınız.',
      answer: 'Hasan Dede teknelerin emniyetini sağlamıştır.',
      rubric: [{ item: 'Açıklama', pts: 17 }],
      sourceOrigin: 'gemini_ai'
    },
    {
      number: 2,
      outcome: 'T.O.5.6',
      points: 17,
      difficulty: 'Orta',
      stimulus: 'Özgün okuma metni bağlamı.',
      question: 'Karakterin karşılaştığı sorunu açıklayınız.',
      answer: 'Sorun açıklaması.',
      rubric: [{ item: 'Sorun tespiti', pts: 17 }],
      sourceOrigin: 'gemini_ai'
    },
    {
      number: 3,
      outcome: 'T.O.5.7',
      points: 17,
      difficulty: 'Orta',
      stimulus: 'Afişte görüldüğü gibi bir çocuk musluğu kapatmaktadır.',
      question: 'Bu görselde verilmek istenen ana düşünceyi açıklayınız.',
      answer: 'Su tasarrufunun önemi.',
      rubric: [{ item: 'Ana fikri bulma', pts: 17 }],
      sourceOrigin: 'gemini_ai'
    },
    {
      number: 4,
      outcome: 'T.O.5.20',
      points: 16,
      difficulty: 'Orta',
      stimulus: 'Üçüncü metin bağlamı.',
      question: 'Deyimin kattığı anlamı yazınız.',
      answer: 'Deyim anlamı.',
      rubric: [{ item: 'Anlam tespiti', pts: 16 }],
      sourceOrigin: 'gemini_ai'
    },
    {
      number: 5,
      outcome: 'T.Y.5.13',
      points: 17,
      difficulty: 'Zor',
      stimulus: 'Dördüncü metin bağlamı.',
      question: 'Kişileştirme cümlesi yazınız.',
      answer: 'Cümle örneği.',
      rubric: [{ item: 'Cümle kurma', pts: 17 }],
      sourceOrigin: 'gemini_ai'
    },
    {
      number: 6,
      outcome: 'T.Y.5.16',
      points: 16,
      difficulty: 'Orta',
      stimulus: 'Beşinci metin bağlamı.',
      question: 'Yazım hatasını düzeltiniz.',
      answer: 'Doğru yazım.',
      rubric: [{ item: 'Düzeltme', pts: 16 }],
      sourceOrigin: 'gemini_ai'
    }
  ];

  globalThis.fetch = async () => {
    return {
      ok: true,
      status: 200,
      json: async () => ({ questions: fakeVisualSample, activeModel: 'Gemini Mock' })
    } as any;
  };

  try {
    const visualResult = await generateMEBIQuestions('turkce', 5, scenario, 0);
    const visualQ3 = visualResult.generatedQuestions[2];
    assert(
      'Sahte görsel tasviri içeren soru (Soru 3) tespit edilmeli ve oyss_curated referans soruyla ikame edilmelidir',
      visualQ3.sourceOrigin === 'oyss_curated',
      `visualQ3.sourceOrigin: ${visualQ3.sourceOrigin}`
    );
  } finally {
    globalThis.fetch = originalFetch;
  }

  console.log('\n======================================================================');
  console.log(`GÖREV 130 TEST SONUÇLARI: ${passed} Başarılı, ${failed} Başarısız`);
  console.log('======================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runPedagogicalQualityTests();
