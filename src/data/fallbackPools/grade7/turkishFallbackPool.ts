import { GeneratedQuestionItem, FallbackPoolContext } from '../index';

export function getTurkishQuestionsSetA(context: FallbackPoolContext = {}): GeneratedQuestionItem[] {
  const name1 = context.name1 || 'Kerem';
  const name2 = context.name2 || 'Alper';
  const pointAllocations = context.pointAllocations || [];
  return [
    {
      number: 1,
      outcome: 'T.7.3.18',
      outcomeTitle: 'Metindeki düşünceyi geliştirme yollarını ve örtük anlamları tespit edebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[0] || 15,
      templateType: 'Metin İçi Delillendirme & Örtük Anlam',
      stimulus: `"Eski mahalle fırıncısı, tezgâhın kenarına 'Göz hakkı olan alsın, parası yetmeyen yarın versin' kutusu koymuştu. Yıllar sonra süpermarketler açıldığında o küçük fırın kapandı ama mahallenin yaşlıları o fırının önünden geçerken hâlâ adımlarını yavaşlatır, tezgâhın tahta kokusunu içlerine çekerdi."`,
      question: `a) Mahalle sakinlerinin kapalı fırının önünden geçerken adımlarını yavaşlatmasındaki örtük anlamı açıklayınız.
b) Fırıncının yalnızca ticari kazanç gütmediğini kanıtlayan iki davranışı metinden yazınız.`,
      answer: `a) Örtük Anlam: İnsanlar sadece ekmek almamış, orada güveni, komşuluk sıcaklığını ve dayanışmayı yaşamışlardır. Bu hareket nostaljik bir saygı ve vefa göstergesidir.
b) Kanıtlar: 1. 'Göz hakkı olan alsın' kutusu koyması, 2. 'Parası yetmeyen yarın versin' diyerek borca ve insana güvenmesi.`,
      alternativeAnswers: [
        'Mahalle sakinlerinin geçmişteki samimi komşuluk ilişkilerine, fırıncının cömertliğine ve güvene duyduğu vefa duygusudur.',
        'Kanıtlar: Fırıncının ihtiyacı olanların ücretsiz ekmek alabilmesi için kutu koyması ve parası çıkışmayanlara güvenmesidir.'
      ],
      rubric: [
        { item: 'Örtük anlamın (vefa ve komşuluk sıcaklığı) doğru açıklanması', pts: Math.round((pointAllocations[0] || 15) * 0.5) },
        { item: 'Metinden iki somut cömertlik kanıtının yazılması', pts: Math.round((pointAllocations[0] || 15) * 0.5) }
      ]
    },
    {
      number: 2,
      outcome: 'T.7.3.24',
      outcomeTitle: 'Metin içi geçiş ve bağlantı ifadelerinin işlevini belirleyebilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[1] || 15,
      templateType: 'Öğrenci Diyaloğu & Kavram Yanılgısı',
      stimulus: `Deneme yazısı yazan ${name1} ve ${name2} şu cümleyi tartışmaktadır:
"Mimar Sinan eserlerinde taşın ağırlığını zarafetle hafifletmiştir; ............ kubbenin heybeti insanı ezmek yerine göğe yükseltir."
${name1}: "Boşluğa 'çünkü' bağlacı gelmelidir zira kubbenin etkisi gerekçe bildirmektedir."
${name2}: "Hayır, ilk cümle ile ikinci cümle birbirini tamamlayan destekleyici düşüncelerdir; 'üstelik' veya 'dahası' getirilmelidir."`,
      question: `${name1} ve ${name2}'nin görüşlerini değerlendiriniz. Hangi öğrenci haklıdır? Bağlantı ifadesinin düşünceyi destekleme işlevini açıklayarak boşluğa uygun ifadeyi yazınız.`,
      answer: `${name2} haklıdır. İkinci cümle ilk cümlenin sebebi değil, zarafet fikrine eklenen daha güçlü bir pekiştirme ve tamamlamadır. Bu nedenle 'üstelik', 'dahası' veya 'ayrıca' ifadeleri kullanılmalıdır.`,
      rubric: [
        { item: `${name2}'nin haklılığının tespiti`, pts: Math.round((pointAllocations[1] || 15) * 0.4) },
        { item: 'Düşünceyi pekiştirme/destekleme işlevinin açıklanması', pts: Math.round((pointAllocations[1] || 15) * 0.3) },
        { item: 'Uygun ifadenin (üstelik / dahası) yazılması', pts: Math.round((pointAllocations[1] || 15) * 0.3) }
      ]
    },
    {
      number: 3,
      outcome: 'T.7.3.20',
      outcomeTitle: 'Metindeki deyim ve atasözlerinin anlama katkısını analiz edebilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[2] || 15,
      templateType: 'Kurgusal Vaka & Edebi Analiz',
      stimulus: `"Usta çırağına baktı: 'Evlat, bu meslekte acele eden çamura saplanır. İğneyle kuyu kazar gibi sabredeceksin ki ortaya çıkan iş göz nuru olsun.' dedi."`,
      question: `Metinde geçen "iğneyle kuyu kazmak" ve "göz nuru" deyimlerinin bağlamsal anlamlarını yazınız.`,
      answer: `• "İğneyle kuyu kazmak": Çok yetersiz araçlarla, büyük bir sabır, emek ve titizlikle güç bir işi başarmaya çalışmak.
• "Göz nuru": Büyük bir dikkat, özen ve el emeğiyle ortaya çıkarılmış çok değerli eser.`,
      rubric: [
        { item: '"İğneyle kuyu kazmak" deyiminin doğru açıklanması', pts: Math.round((pointAllocations[2] || 15) * 0.5) },
        { item: '"Göz nuru" deyiminin doğru açıklanması', pts: Math.round((pointAllocations[2] || 15) * 0.5) }
      ]
    },
    {
      number: 4,
      outcome: 'T.7.4.3',
      outcomeTitle: 'Noktalama işaretlerinin işlevlerini metin üzerinde uygulayabilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[3] || 15,
      templateType: 'Hata Tespiti & Adım Analizi',
      stimulus: `${name1}, metninde şu cümleyi yazmıştır:
"Pazardan şunları aldım; taze fasulye, domates ve biber: manavdan ise elma ve armut aldım."`,
      question: `Cümledeki iki nokta (:) ve noktalı virgülün (;) yerlerinin neden yanlış olduğunu açıklayarak cümlenin doğru noktalama halini yazınız.`,
      answer: `Hata: Kendisinden sonra örnekler sıralanan yerin sonuna noktalı virgül değil İKİ NOKTA (:) konur. Cümleler arasında tür ayrımı için ise NOKTALI VİRGÜL (;) kullanılır.
Doğrusu: "Pazardan şunları aldım: taze fasulye, domates ve biber; manavdan ise elma ve armut aldım."`,
      rubric: [
        { item: 'İki nokta ve noktalı virgül kural hatasının açıklanması', pts: Math.round((pointAllocations[3] || 15) * 0.5) },
        { item: 'Cümlenin hatasız yeniden yazılması', pts: Math.round((pointAllocations[3] || 15) * 0.5) }
      ]
    },
    {
      number: 5,
      outcome: 'T.7.4.12',
      outcomeTitle: 'Anlatımı zenginleştirmek için kişileştirme ve benzetme sanatlarını kullanabilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[4] || 14,
      templateType: 'Empati & Cümle Dönüştürme',
      stimulus: `Düz Cümle: "Rüzgâr esti ve sarı yapraklar ağaçlardan yere döküldü."`,
      question: `Bu düz cümleyi içinde hem "kişileştirme (teşhis)" hem de "benzetme (teşbih)" olacak şekilde tek bir edebi cümle halinde yeniden kurgulayınız. Hangi ögelerin söz sanatı olduğunu belirtiniz.`,
      answer: `Örnek Cümle: "Öfkeli sonbahar rüzgârı ağaçların kulağına bir ayrılık şarkısı fısıldarken, dalından kopan sarı yapraklar altın pullar gibi toprağa serildi."
• Kişileştirme: Rüzgârın öfkeli olması ve şarkı fısıldaması.
• Benzetme: Sarı yaprakların altın pullara benzetilmesi.`,
      rubric: [
        { item: 'Kişileştirme unsurunun kuralına uygun kurulması', pts: Math.round((pointAllocations[4] || 14) * 0.5) },
        { item: 'Benzetme unsurunun benzetilen/benzeyen ilişkisiyle kurulması', pts: Math.round((pointAllocations[4] || 14) * 0.5) }
      ]
    },
    {
      number: 6,
      outcome: 'T.7.3.26',
      outcomeTitle: 'Metindeki anlatıcı türünü 1. ve 3. şahıs bakış açısıyla dönüştürebilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[5] || 14,
      templateType: 'Birinci Ağızdan Konuşturma / Rol',
      stimulus: `"Eski ahşap konağın gıcırdayan merdivenlerinden yavaşça çıktım. Odamın penceresini açıp bahçedeki ıhlamur kokusunu içime çektim."`,
      question: `Bu 1. tekil kişi ağzından yazılmış metni 3. tekil şahıs (O) anlatıcı ağzına dönüştürerek yeniden yazınız. Değişen iki fiil ekini belirtiniz.`,
      answer: `Dönüştürülmüş Metin: "Eski ahşap konağın gıcırdayan merdivenlerinden yavaşça çıktı. Odasının penceresini açıp bahçedeki ıhlamur kokusunu içine çekti."
Değişen Fiiller: "çıktım" -> "çıktı" (1. şahıs eki -m kalktı) ve "çektim" -> "çekti".`,
      rubric: [
        { item: 'Metnin 3. tekil şahıs ağzına hatasız dönüştürülmesi', pts: Math.round((pointAllocations[5] || 14) * 0.5) },
        { item: 'Değişen fiil eklerinin doğru gösterilmesi', pts: Math.round((pointAllocations[5] || 14) * 0.5) }
      ]
    }
  ];
}

export function getTurkishQuestionsSetB(context: FallbackPoolContext = {}): GeneratedQuestionItem[] {
  const pointAllocations = context.pointAllocations || [];
  return [
    {
      number: 1,
      outcome: 'T.O.7.8',
      outcomeTitle: 'Metindeki çıkarımları ve örtük anlamı belirleyebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[0] || 15,
      templateType: 'Metin İçi Delillendirme & Örtük Anlam',
      stimulus: `Bursa'nın altı asırlık ulu çınarı, gövdesindeki derin kovuklarda sincapları ve göçmen kuşları konuk ederdi. Köyün çocukları her bahar çınarın heybetli dalları altına toplanır, yaşlıların anlattığı eski sefer hikâyelerini dinlerdi. Çınar, yüzyıllardır değişen insanlara rağmen kökleriyle toprağa, dallarıyla zamana meydan okurdu.`,
      question: `a) Asırlık çınarın kovuklarında kuşları barındırmasındaki ve çocukların onun gölgesinde toplanmasındaki örtük anlamı açıklayınız.
b) Çınarın zamana meydan okuduğunu kanıtlayan iki ifadeyi metinden yazınız.`,
      answer: `a) Örtük Anlam: Çınar sadece bir ağaç değil, geçmişle geleceği birbirine bağlayan şefkatli bir koruyucu, ortak hafıza ve millî birlik sembolüdür.
b) Kanıtlar: 1. Altı asırdır derin kovuklarında canlıları konuk etmesi, 2. Yüzyıllardır değişen nesillere rağmen kökleriyle toprağa sımsıkı tutunması.`,
      alternativeAnswers: [
        'Çınarın nesiller boyu insanları bir araya getiren köklü bir tarihî miras ve koruyucu manevi sığınak olduğunu göstermektedir.',
        'Kanıtlar: Canlıları koynunda yaşatması ve asırlar boyunca ayakta kalarak kökleriyle toprağa bağlanmasıdır.'
      ],
      rubric: [
        { item: 'Çınarın ortak hafıza ve koruyucu sembol olduğunun açıklanması', pts: Math.round((pointAllocations[0] || 15) * 0.5) },
        { item: 'Metinden iki somut zaman ve kök kanıtının gösterilmesi', pts: Math.round((pointAllocations[0] || 15) * 0.5) }
      ]
    },
    {
      number: 2,
      outcome: 'T.O.7.4',
      outcomeTitle: 'Bağlamdan yararlanarak bilmediği kelime ve kelime gruplarının anlamını tahmin edebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[1] || 15,
      templateType: 'Kelime Anlamı Tahmini & Delillendirme',
      stimulus: `Ulu çınar, 'metanetle' rüzgârlara göğüs geriyor; çevresindeki beton binaların soğukluğuna inat toprağın 'özünden' kopmuyordu.`,
      question: `Metindeki altı çizili 'metanetle' sözcüğünün anlamını tahmin ediniz. Tahmininizi metindeki hangi ipucuna dayandırdığınızı açıklayınız.`,
      answer: `Tahmin: Metanetle: Dayanıklılıkla, güçlü bir sabır ve sarsılmaz bir dirençle demektir. İpucu: Şiddetli rüzgârlara göğüs germesi ve asırlardır devrilmeden ayakta kalmasıdır.`,
      alternativeAnswers: [
        'Metanetle: Sabırla ve sarsılmadan zorluklara karşı durarak anlamındadır. İpucu: Çınarın rüzgârlara karşı direnmesi ve devrilmemesidir.',
        'Metanet sözcüğü dayanıklılık ve sarsılmaz direnç demektir; metinde fırtına ve rüzgârlara göğüs gerilmesi buna açık kanıttır.'
      ],
      rubric: [
        { item: "'Metanetle' sözcüğünün doğru tahmin edilmesi (sabır, dayanıklılık)", pts: Math.round((pointAllocations[1] || 15) * 0.5) },
        { item: 'Metindeki rüzgâra göğüs germe ipucuyla gerekçelendirilmesi', pts: Math.round((pointAllocations[1] || 15) * 0.5) }
      ]
    },
    {
      number: 3,
      outcome: 'T.O.7.5',
      outcomeTitle: 'Metnin yüzey anlamını belirleyebilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[2] || 15,
      templateType: 'Ana Fikir / Konu Tespiti',
      stimulus: `Bursa'daki altı asırlık İnkaya çınarı, geniş gövdesi ve metrelerce uzanan kollarıyla köy meydanının simgesidir.`,
      question: `Metnin konusunu eksiksiz tek bir cümleyle yazınız.`,
      answer: `Metnin konusu: Bursa'daki asırlık İnkaya çınarının köklü varlığı ve köy meydanındaki tarihî önemidir.`,
      alternativeAnswers: [
        'Metnin konusu: Altı yüz yıllık ulu çınarın heybeti ve tarihî simgeselliğidir.',
        'Metnin konusu: Asırlık İnkaya çınarının doğadaki görkemli duruşudur.'
      ],
      rubric: [
        { item: 'Metnin konusunun tek cümleyle eksiksiz ifade edilmesi', pts: pointAllocations[2] || 15 }
      ]
    },
    {
      number: 4,
      outcome: 'T.Y.7.21',
      outcomeTitle: 'Yazım kurallarını ve noktalama işaretlerini uygulayabilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[3] || 15,
      templateType: 'Hata Tespiti & Düzeltme',
      stimulus: `Dedem çınarın gölgesinde oturdu; cebinden ahşap tarağını çıkarıp 19 mayıs 1919'da samsun'a çıkan atatürk'ü anlattı.`,
      question: `Cümledeki noktalama ve büyük harf hatalarını belirleyip cümlenin doğru şeklini yazınız.`,
      answer: `Hatalar:
1. 'oturdu'dan sonra noktalı virgül değil İKİ NOKTA (:) gelmelidir.
2. '19 mayıs' belirli bir tarihi bildirdiği için '19 Mayıs' şeklinde büyük yazılmalıdır.
3. 'samsun'a' ve 'atatürk'ü' özel isimler olduğu için büyük harfle 'Samsun'a' ve 'Atatürk'ü' yazılmalıdır.
Doğrusu: Dedem çınarın gölgesinde oturdu: cebinden ahşap tarağını çıkarıp 19 Mayıs 1919'da Samsun'a çıkan Atatürk'ü anlattı.`,
      alternativeAnswers: [
        'Mayıs, Samsun ve Atatürk sözcükleri büyük harfle yazılmalı, noktalı virgül yerine iki nokta kullanılmalıdır.',
        'Özel isimler ve belirli tarihler büyük harfle başlatılmalı (Mayıs, Samsun, Atatürk); konuşma öncesinde noktalı virgül değil iki nokta konmalıdır.'
      ],
      rubric: [
        { item: 'İki nokta ve büyük harf hatalarının tespiti', pts: Math.round((pointAllocations[3] || 15) * 0.5) },
        { item: 'Cümlenin kurallara uygun hatasız yazımı', pts: Math.round((pointAllocations[3] || 15) * 0.5) }
      ]
    }
  ];
}

export const turkceQuestions: GeneratedQuestionItem[] = getTurkishQuestionsSetA();
export const turkceQuestions_7th_SetB: GeneratedQuestionItem[] = getTurkishQuestionsSetB();
