import { GeneratedQuestionItem, FallbackPoolContext } from '../index';

export function getSocialQuestionsSetA(context: FallbackPoolContext = {}): GeneratedQuestionItem[] {
  const name1 = context.name1 || 'Kerem';
  const name2 = context.name2 || 'Alper';
  const pointAllocations = context.pointAllocations || [];
  return [
    {
      number: 1,
      outcome: 'SB.7.1.1',
      outcomeTitle: 'Dâhil olduğu gruplarda ve sosyal hayatta etkili iletişimin önemini sorgulayabilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[0] || 15,
      templateType: 'Empati & Cümle Dönüştürme',
      stimulus: `Okul tiyatrosu projesinde ${name1}, provaya sürekli geç kalan arkadaşı ${name2}'ye öfkeyle:
"Her zaman provayı aksatıyorsun, sorumsuz bir insansın ve kimsenin emeğine saygın yok!" demiştir.`,
      question: `a) ${name1}'in kurduğu cümleyi 'sen dili' ve iletişim engelleri (yargılama/etiketleme) açısından analiz ediniz.
b) Bu çatışmayı önleyecek suçlayıcı olmayan örnek bir 'ben dili' cümlesi kurgulayınız.`,
      answer: `a) Analiz: Cümle doğrudan kişiliği hedef alan suçlayıcı, genelleştirici ("her zaman") ve etiketleyici ("sorumsuz") bir 'sen dili'dir. Savunma refleksini tetikler ve iletişimi koparır.
b) Ben Dili Cümlesi: "Provalara geç kalındığında rollerimizi planlanan sürede çalışamadığımız için endişeleniyorum ve projemizin aksamasından üzüntü duyuyorum."`,
      alternativeAnswers: [
        `a) Karşı tarafı doğrudan suçlayıp kişiliğine saldırdığı için sen dilidir; kişide direnç ve haksızlığa uğramışlık hissi yaratır. b) "Hazırlıklara vaktinde başlanmadığında sahne provasını yetiştiremeyeceğimizi düşünüp kaygılanıyorum."`,
        `a) Davranış yerine kişiyi peşinen yargıladığı için sen dilidir; ${name2}'nin kendini savunmaya kapatmasına sebep olur. b) "Provalar geciktiğinde planlanan zamanda bitiremeyeceğim için huzursuz oluyorum."`
      ],
      rubric: [
        { item: 'Sen dilinin savunma doğurucu etkisinin analizi', pts: Math.round((pointAllocations[0] || 15) * 0.5) },
        { item: 'Duygu belirten kuralına uygun Ben Dili cümlesinin kurulması', pts: Math.round((pointAllocations[0] || 15) * 0.5) }
      ]
    },
    {
      number: 2,
      outcome: 'SB.7.1.2',
      outcomeTitle: 'Özel gereksinimli bireyler için fırsat eşitliğini sürdürmeye yönelik fikir üretebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[1] || 15,
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      stimulus: `Tekerlekli sandalye kullanan ve resim atölyesine devam etmek isteyen 7. sınıf öğrencisi ${name1}, gideceği halk eğitim merkezinin girişinde sadece yüksek merdivenler olduğunu ve binada asansör bulunmadığını görmüştür.`,
      question: `${name1}'in eğitim ve kültürel faaliyetlere diğer bireylerle eşit şekilde katılabilmesi için kamu binalarında yapılması gereken 2 mimari/fiziki düzenlemeyi yazınız.`,
      answer: `1. Bina girişine standartlara uygun eğimli tekerlekli sandalye rampası veya engelli kaldırma platformu inşa edilmelidir.
2. Katlar arasında bağımsız erişimi sağlayacak geniş kabinli ve sesli yönlendirmeli engelli asansörü yapılmalıdır.`,
      alternativeAnswers: [
        '1) Giriş basamaklarının yanına uygun eğimli engelli rampası yapılması. 2) Atölye ve tuvalet kapılarının tekerlekli sandalyenin rahatça dönebileceği genişlikte düzenlenmesi.',
        '1) Bina girişine engelli asansörü kurulması. 2) Koridor ve geçiş alanlarındaki eşiklerin kaldırılarak düz zemin oluşturulması.'
      ],
      rubric: [
        { item: 'Eğimli rampa veya engelli asansörü/platformu çözümünün belirtilmesi', pts: Math.round((pointAllocations[1] || 15) * 0.5) },
        { item: 'İç mekan kapı, koridor ve erişilebilirlik standardının açıklanması', pts: Math.round((pointAllocations[1] || 15) * 0.5) }
      ]
    },
    {
      number: 3,
      outcome: 'SB.7.1.3',
      outcomeTitle: 'Türk toplumunun millî meseleler karşısında gösterdiği tutum ve davranışlara ilişkin çıkarım yapabilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[2] || 15,
      templateType: 'Metin İçi Delillendirme & Örtük Anlam',
      stimulus: `Mustafa Kemal Paşa Sakarya Meydan Muharebesi öncesinde ordunun lojistik ve giyim ihtiyacını karşılamak için Tekâlif-i Milliye Emirleri'ni yayımlamıştır. Türk milleti çarık, çorap, bez ve yiyeceğini tereddütsüz ordusuna teslim etmiştir.`,
      question: `Türk milletinin bu tutumu, onun hangi millî karakter özelliklerini yansıtır? İki kavram belirterek gerekçelendiriniz.`,
      answer: `1. Vatanseverlik ve Bağımsızlık Tutkusu: Bağımsız yaşayabilmek için milletimiz malını ve canını ordusunun emrine sunmuştur.
2. Topyekûn Dayanışma (İmece Ruhu): Kadın, yaşlı ve çocuk demeden tüm milletin ordusuyla tek vücut olarak kenetlenmesidir.`,
      alternativeAnswers: [
        'Fedakârlık ve Millî Birlik: Türk halkı bağımsızlığı her şeyin üstünde tutmuş, ordusuyla ekmeğini ve giysisini paylaşarak tek yürek olmuştur.',
        'Vatan Sevgisi ve İmece Geleneği: Milletin varını yoğunu vatan savunmasına adayarak topyekûn seferberlik ruhu sergilemesidir.'
      ],
      rubric: [
        { item: 'İki millî karakter özelliğinin (vatanseverlik, dayanışma, fedakârlık) doğru belirlenmesi', pts: Math.round((pointAllocations[2] || 15) * 0.5) },
        { item: 'Tekâlif-i Milliye ruhunun gerekçeli açıklanması', pts: Math.round((pointAllocations[2] || 15) * 0.5) }
      ]
    },
    {
      number: 4,
      outcome: 'SB.7.2.1',
      outcomeTitle: 'Küreselleşmenin insan ve toplum hayatı üzerindeki etkilerini analiz edebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[3] || 15,
      templateType: 'Kurgusal Tarihi Vaka & Karar',
      stimulus: `Etiyopya'da keşfedilen kahve, Yemen üzerinden 16. yüzyılda Osmanlı'ya gelmiş; Türkler tarafından pişirme yöntemi geliştirilerek 'Türk kahvesi' adıyla Avrupa'ya ve tüm dünyaya yayılmıştır. Bugün dünyanın her ülkesinde kahve kültürü yaşamaktadır.`,
      question: `Kahvenin bu tarihsel yolculuğundan hareketle, küreselleşmenin toplumlar arası kültürel etkileşime ve kültürümüzün dünyaya tanıtılmasına 2 katkısını yazınız.`,
      answer: `1. Kültürel Etkileşim ve Zenginleşme: Bir coğrafyada ortaya çıkan bir değerin farklı medeniyetlerin katkısıyla harmanlanıp evrensel bir kültüre dönüşmesini sağlar.
2. Millî Değerlerimizin Evrensel Tanıtımı: Türk kahvesi pişirme ve sunum geleneği sayesinde kültürümüzün dünyaya tanıtılmasını ve UNESCO kültürel mirası olarak tescillenmesini sağlamıştır.`,
      alternativeAnswers: [
        '1) Farklı toplumların geleneklerini birleştirerek ortak bir küresel yaşam kültürü oluşturur. 2) Millî kültürümüzün özgün lezzetlerinin dünyaca benimsenip Türkiye\'nin tanıtımına güç katmasını sağlar.',
        '1) Ticaret ve iletişim yoluyla kültürler arası diyaloğu ve hoşgörüyü pekiştirir. 2) Somut olmayan kültürel mirasımızın küresel ölçekte saygınlık kazanmasına zemin hazırlar.'
      ],
      rubric: [
        { item: 'Kültürel etkileşim ve küresel harmanlanma boyutunun açıklanması', pts: Math.round((pointAllocations[3] || 15) * 0.5) },
        { item: 'Millî kültürün dünyaca tanınması ve saygınlık boyutunun belirtilmesi', pts: Math.round((pointAllocations[3] || 15) * 0.5) }
      ]
    },
    {
      number: 5,
      outcome: 'SB.7.3.2',
      outcomeTitle: 'Göç hareketlerinin nedenlerini (itici ve çekici faktörler) sınıflandırabilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[4] || 14,
      templateType: 'Durum & Özellik Matrisi',
      stimulus: `Maddeler: 1. Tarım topraklarının mirasla bölünmesi ve kuraklık | 2. Büyükşehirlerdeki kaliteli üniversite ve eğitim | 3. Deprem ve heyelan afetleri | 4. Sanayi bölgelerindeki geniş iş imkânları.`,
      question: `Yukarıdaki 4 maddeyi "İTİCİ FAKTÖR" ve "ÇEKİCİ FAKTÖR" olarak sınıflandırarak yazınız.`,
      answer: `• İtici Faktörler: 1 (Kuraklık ve toprak bölünmesi) ve 3 (Doğal afetler).
• Çekici Faktörler: 2 (Eğitim imkânları) ve 4 (Sanayi iş imkânları).`,
      rubric: [
        { item: '1 ve 3 maddelerinin İtici Faktör olarak yazılması', pts: Math.round((pointAllocations[4] || 14) * 0.5) },
        { item: '2 ve 4 maddelerinin Çekici Faktör olarak yazılması', pts: Math.round((pointAllocations[4] || 14) * 0.5) }
      ]
    },
    {
      number: 6,
      outcome: 'SB.7.4.1',
      outcomeTitle: 'Bilginin depolanmasında kil tabletten kâğıda geçişin önemini değerlendirebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[5] || 14,
      templateType: 'Hata Tespiti & Adım Analizi',
      stimulus: `${name1}, sunumunda şu sırayı vermiştir: 1. Sümer çivi yazısı ve kil tabletler -> 2. Gutenberg'in hareketli matbaası -> 3. Mısır papirüs kâğıdı -> 4. Bergama parşömeni.`,
      question: `Bu sıralamadaki kronolojik hatayı düzeltiniz. Kil tabletten hafif kâğıda geçişin bilginin yayılma hızına etkisini açıklayınız.`,
      answer: `Düzeltme: Matbaa (2. adım) papirüs ve parşömenden sonra gelmelidir. Doğru sıra: Kil tablet -> Papirüs -> Parşömen -> Matbaa.
Etki: Kil tabletler ağır ve kırılgandı; hafif papirüs ve kâğıt bilginin uzak ülkelere kolayca taşınmasını sağlamıştır.`,
      rubric: [
        { item: 'Gutenberg matbaasının son sıraya alınması düzeltmesi', pts: Math.round((pointAllocations[5] || 14) * 0.5) },
        { item: 'Kâğıdın taşınabilirlik ve bilgi yayma avantajının açıklanması', pts: Math.round((pointAllocations[5] || 14) * 0.5) }
      ]
    }
  ];
}

export function getSocialQuestionsSetB(context: FallbackPoolContext = {}): GeneratedQuestionItem[] {
  const name1 = context.name1 || 'Aslı';
  const name2 = context.name2 || 'Onur';
  const pointAllocations = context.pointAllocations || [];
  return [
    {
      number: 1,
      outcome: 'SB.7.1.1',
      outcomeTitle: 'Dâhil olduğu gruplarda ve sosyal hayatta etkili iletişimin önemini sorgulayabilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[0] || 15,
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      stimulus: `7/E sınıfı mesajlaşma grubunda ${name1}, arkadaşı ${name2}'ın sorduğu soruya sadece "Tamam." yazıp soğuk bir ifade bırakmıştır. ${name2} ise ${name1}'in kendisine kızdığını düşünerek kırılmıştır. Ertesi gün yüz yüze geldiklerinde ${name1}'in aslında aceleyle yazdığı ve hiçbir kızgınlığı olmadığı ortaya çıkmıştır. (Ders Kitabı 1. Kitap, Sayfa 13)`,
      question: `a) Dijital yazışmalarda yüz yüze iletişime göre hangi 2 temel iletişim unsurunun eksik olması bu yanlış anlaşılmaya yol açmıştır?
b) Dijital iletişimde bu tür yanlış anlamaları önlemek için ne yapılmalıdır?`,
      answer: `a) Eksik Unsurlar: 1) Ses tonu ve vurgu, 2) Beden dili (yüz ifadesi, mimikler ve göz teması).
b) Çözüm: Mesaj yazarken duygu belirten nazik ifadeler seçilmeli, duygu tonunu yansıtan emojiler veya kısa açıklamalar eklenmeli; önemli konular ise yüz yüze konuşulmalıdır.`,
      alternativeAnswers: [
        'a) Ses tonlaması ve jest-mimik gibi beden dili ögelerinin olmamasıdır. b) Nezaket belirten cümleler kurulmalı veya yanlış anlama riskine karşı doğrudan sesli/yüz yüze iletişim tercih edilmelidir.',
        'a) Sözsüz iletişim unsurları (bakış, tebessüm ve ses vurgusu) bulunmadığı için yanlış anlaşılmıştır. b) Kısa ve sert ifadeler yerine açık, samimi ve empatik bir dil kullanılmalıdır.'
      ],
      rubric: [
        { item: 'Ses tonu ve mimik/beden dili eksikliğinin doğru tespiti', pts: Math.round((pointAllocations[0] || 15) * 0.5) },
        { item: 'Dijital nezaket ve yüz yüze teyit çözümünün açıklanması', pts: Math.round((pointAllocations[0] || 15) * 0.5) }
      ]
    },
    {
      number: 2,
      outcome: 'SB.7.1.2',
      outcomeTitle: 'Özel gereksinimli bireyler için fırsat eşitliğini sürdürmeye yönelik fikir üretebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[1] || 15,
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      stimulus: `Doğuştan iki kolu olmayan veya omurilik felci geçiren millî paralimpik sporcularımız, yüzme ve okçuluk branşlarında dünya ve olimpiyat şampiyonlukları kazanarak İstiklal Marşımızı dünyaya dinletmişlerdir. (Ders Kitabı 1. Kitap, Sayfa 32)`,
      question: `Paralimpik şampiyonlarımızın bu başarısı, özel gereksinimli bireylere fırsat eşitliği sağlandığında toplumda nelerin değişebileceğini nasıl kanıtlar? İki gerekçeyle açıklayınız.`,
      answer: `1. Azim ve Fırsat Eşitliği: Özel gereksinimli bireylerin acınmaya değil, sadece eşit imkân, donanımlı tesis ve desteğe ihtiyaç duyduklarını; fırsat verildiğinde her türlü engeli aşabileceklerini kanıtlar.
2. Toplumsal Ön Yargıların Kırılması: 'Engelliler üretemez veya başaramaz' şeklindeki yanlış kalıp yargıları yıkarak toplumda saygı ve eşit yurttaşlık bilincini güçlendirir.`,
      alternativeAnswers: [
        '1) Engelin bedende değil imkânsızlıklarda olduğunu, eşit fırsat sunulduğunda uluslararası zirveye ulaşılabileceğini gösterir. 2) Toplumdaki acıma duygusunu hayranlık ve eşitlik anlayışına dönüştürür.',
        '1) Uygun spor ve eğitim olanakları tanındığında özel gereksinimli bireylerin ülkenin en büyük gurur kaynağı olabileceğini ispatlar. 2) Diğer engelli gençlere ilham kaynağı olarak sosyal yaşama cesaretle katılmalarını sağlar.'
      ],
      rubric: [
        { item: 'Eşit imkân sunulduğunda engellerin aşılacağı vurgusunun yapılması', pts: Math.round((pointAllocations[1] || 15) * 0.5) },
        { item: 'Toplumsal ön yargıların kırılması ve ilham kaynağı olma etkisinin açıklanması', pts: Math.round((pointAllocations[1] || 15) * 0.5) }
      ]
    },
    {
      number: 3,
      outcome: 'SB.7.1.3',
      outcomeTitle: 'Türk toplumunun millî meseleler karşısında gösterdiği tutum ve davranışlara ilişkin çıkarım yapabilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[2] || 15,
      templateType: 'Metin İçi Delillendirme & Örtük Anlam',
      stimulus: `Ressam Arif Bedii'nin 'Atatürk ve Millî Mücadele' tablosunda kağnısıyla cephane taşıyan köylü kadınlar, cephede süngü takmış Mehmetçikler ve arkalarında dualar eden aksakallı dedeler bir arada tasvir edilmiştir. (Ders Kitabı 1. Kitap, Sayfa 42)`,
      question: `Arif Bedii'nin bu tablosunda vurgulanan ana düşünceyi Türk milletinin millî birlik ve 'topyekûn seferberlik' anlayışıyla ilişkilendirerek açıklayınız.`,
      answer: `Tablonun ana düşüncesi, Türk milletinin vatan tehlikeye düştüğünde kadını, erkeği, yaşlısı ve genciyle bütün fertlerinin tek vücut olarak cepheye ve cephe gerisine koştuğudur. Millî Mücadele'nin sadece bir ordu savaşı değil, tüm bir milletin ortak iman, vatan sevgisi ve fedakârlıkla kazandığı topyekûn bir bağımsızlık destanı olduğunu simgeler.`,
      alternativeAnswers: [
        'Vatan savunmasının kadın-erkek, genç-yaşlı tüm millet fertlerinin el ele vermesiyle başarıldığını ve milletimizin kenetlenme gücünü anlatmaktadır.',
        'Kurtuluş Savaşı\'nın cephedeki asker ile cephe gerisindeki halkın ortak dayanışması ve fedakârlığı sayesinde kazanılan bir halk seferberliği olduğunu gösterir.'
      ],
      rubric: [
        { item: 'Kadın, erkek, yaşlı ve askerin tek vücut olduğu topyekûn seferberliğin açıklanması', pts: Math.round((pointAllocations[2] || 15) * 0.5) },
        { item: 'Millî birlik ve bağımsızlık ruhunun gerekçelendirilmesi', pts: Math.round((pointAllocations[2] || 15) * 0.5) }
      ]
    },
    {
      number: 4,
      outcome: 'SB.7.2.1',
      outcomeTitle: 'Küreselleşmenin insan ve toplum hayatı üzerindeki etkilerini analiz edebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[3] || 15,
      templateType: 'Dilemma (İkilem) & Çözüm Değerlendirme',
      stimulus: `Küreselleşmeyle birlikte tüm dünyada tek tip giyim markaları, aynı yabancı şarkılar ve aynı fast-food restoran zincirleri yaygınlaşmaktadır. Bu durum karşısında bazı ülkeler geleneksel mutfaklarını, yerel zanaatlarını ve ana dillerini korumak için özel festivaller düzenlemektedir. (Ders Kitabı 1. Kitap, Sayfa 65)`,
      question: `a) Küreselleşmenin yerel kültürler üzerinde yarattığı 'kültürel tek tipleşme' tehlikesini açıklayınız.
b) Kendi öz kültürümüzü korumak için günlük hayatımızda alabileceğimiz 1 somut önlem yazınız.`,
      answer: `a) Kültürel Tek Tipleşme: Popüler kültürün küresel pazarlama yoluyla tüm dünyayı etkisi altına alarak yerel gelenekleri, halk oyunlarını, yöresel tatları ve dilleri unutturması ve herkesi tek bir tüketim kalıbına sokması riskidir.
b) Somut Önlem: Fast-food yerine geleneksel Türk mutfağını ve yöresel ev yemeklerini tercih etmek; ana dilimizde yabancı sözcükler yerine Türkçe kelimeleri kullanmaya özen göstermek.`,
      alternativeAnswers: [
        'a) Güçlü küresel kültürlerin yerel kimlikleri yok ederek dünya genelinde tekdüze bir yaşam ve tüketim tarzı oluşturmasıdır. b) Geleneksel el sanatlarımızı öğrenmek, yerli üreticileri desteklemek ve millî bayramlarımızı coşkuyla kutlamaktır.',
        'a) Özgün millî kültürlerin popüler kültür baskısı altında asimile olması ve çeşitliliğin kaybolmasıdır. b) Türkçemizi yabancı kelimelerden korumak ve halk müziği gibi öz kültür miraslarımıza sahip çıkmaktır.'
      ],
      rubric: [
        { item: 'Kültürel tek tipleşme ve yerel zenginliğin kaybolması tehlikesinin açıklanması', pts: Math.round((pointAllocations[3] || 15) * 0.5) },
        { item: 'Öz kültürü korumaya yönelik gerçekçi ve somut bir bireysel önlemin yazılması', pts: Math.round((pointAllocations[3] || 15) * 0.5) }
      ]
    }
  ];
}

export const sosyalQuestions: GeneratedQuestionItem[] = getSocialQuestionsSetA();
export const sosyalQuestions_7th_SetB: GeneratedQuestionItem[] = getSocialQuestionsSetB();
