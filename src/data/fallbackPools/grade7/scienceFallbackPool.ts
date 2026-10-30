import { GeneratedQuestionItem, FallbackPoolContext } from '../index';

export function getScienceQuestionsSetA(context: FallbackPoolContext = {}): GeneratedQuestionItem[] {
  const name1 = context.name1 || 'Kerem';
  const name2 = context.name2 || 'Alper';
  const pointAllocations = context.pointAllocations || [];
  return [
    {
      number: 1,
      outcome: 'FB.7.1.1',
      outcomeTitle: 'Gözlemevi yer seçimini etkileyen coğrafi ve atmosferik şartları analiz edebilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      templateType: 'Durum & Özellik Matrisi (VAR/YOK Tablosu)',
      points: pointAllocations[0] || 12,
      stimulus: `Doğu Anadolu Gözlemevi (DAG) projesinde üç farklı bölge araştırılmıştır:
Bölge 1: Erzurum Palandöken Zirvesi (3.170 m yükseklik)
Bölge 2: İstanbul Çamlıca Tepesi (268 m yükseklik)
Bölge 3: Antalya Bakırlıtepe (2.500 m TÜBİTAK Gözlemevi)`,
      question: `a) Aşağıdaki özelliklerin hangi bölgelerde sağlandığını "VAR" veya "YOK" yazarak doldurunuz:
• Işık kirliliğinden ve şehir aydınlatmalarından tamamen uzak olma:
  - Bölge 1 (Palandöken): ............ | Bölge 2 (Çamlıca): ............ | Bölge 3 (Bakırlıtepe): ............
b) Neden büyük gözlemevleri deniz seviyesindeki ovalara değil de yüksek dağ zirvelerine kurulur? Atmosfer kalınlığı ve nem oranı bakımından açıklayınız.`,
      answer: `a) Işık Kirliliğinden Uzak Olma:
• Bölge 1 (Palandöken): VAR | Bölge 2 (Çamlıca): YOK | Bölge 3 (Bakırlıtepe): VAR
b) Bilimsel Gerekçe: Yüksek dağ zirvelerinde atmosfer tabakası daha incedir, hava yoğunluğu ve nem oranı düşüktür; ayrıca şehirlerin yapay ışık ve hava kirliliğinden uzaktır. Böylece uzaydan gelen ışık atmosferde daha az kırılır ve teleskoplar çok daha berrak ve net görüntü elde eder.`,
      alternativeAnswers: [
        'a) Palandöken: VAR, Çamlıca: YOK, Bakırlıtepe: VAR. b) Yüksek rakımlarda atmosfer tabakasının incelmesi, nemin ve hava kirliliğinin az olması sayesinde ışık kırılması en aza iner ve berrak görüntü sağlanır.',
        'a) Bölge 1 VAR, Bölge 2 YOK, Bölge 3 VAR. b) Şehir ışıklarından uzak olması, havanın nemsiz ve açık olması, atmosferin ince olması sebebiyle teleskoplar daha net çeker.'
      ],
      rubric: [
        { item: 'Bölgelerin ışık kirliliği eşleştirmesinin doğru yapılması (VAR - YOK - VAR)', pts: 6 },
        { item: 'Yüksek irtifada atmosferin inceliği ve nemin azlığının bilimsel olarak açıklanması', pts: 6 }
      ]
    },
    {
      number: 2,
      outcome: 'FB.7.1.1',
      outcomeTitle: 'Optik ve uzay teleskoplarının gözlem avantajlarını karşılaştırabilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Öğrenci Diyaloğu & Kavram Yanılgısı',
      points: pointAllocations[1] || 11,
      stimulus: `Astronomi panosu hazırlayan ${name1} ve ${name2} uzay teleskopları hakkında tartışmaktadır:
${name1}: "James Webb gibi uzay teleskopları, yeryüzündeki dev gözlemevi teleskoplarından bile çok daha net ve kaliteli fotoğraflar çeker."
${name2}: "Bence uzayda olmasının bir farkı yoktur; yeryüzündeki teleskopların aynasını biraz daha büyük yaparsak uzaydakilerden her zaman daha net çeker."`,
      question: `${name1} ve ${name2}'nin açıklamalarını değerlendiriniz. Hangi öğrenci haklıdır? Uzay teleskoplarının Dünya atmosferinin olumsuz etkilerinden (ışık kırılması, hava kirliliği, bulutlar) neden etkilenmediğini açıklayınız.`,
      answer: `${name1} haklıdır. Çünkü Dünya atmosferindeki gaz hareketleri, tozlar ve bulutlar uzaydan gelen ışığı kırıp dalgalandırarak görüntünün bulanıklaşmasına yol açar. Uzay teleskopları ise atmosferin dışında, uzay boşluğunda görev yaptığı için ışık hiçbir engelle karşılaşmadan doğrudan ve net olarak teleskoba ulaşır.`,
      alternativeAnswers: [
        `${name1} haklıdır. Uzay teleskopları Dünya atmosferinin dışında yer aldığı için gaz tabakası, ışık kırılması, bulut ve şehir ışık kirliliği gibi engelleyici etkenlerden etkilenmez.`,
        `${name1}'in açıklaması doğrudur. Atmosfer olmadığı için uzay boşluğunda ışık saçılmaz ve bozulmaz; aynayı büyütmek atmosferik bulanıklığı yok edemez.`
      ],
      rubric: [
        { item: `${name1}'in haklı olduğunun ve ${name2}'nin yanılgısının doğru açıklanması`, pts: 5 },
        { item: 'Dünya atmosferinin ışığı kırma ve görüntüyü bozma etkisinin açıklanması', pts: 6 }
      ]
    },
    {
      number: 3,
      outcome: 'FB.7.1.3',
      outcomeTitle: 'Türkiye\'nin aktif haberleşme ve gözlem uydularının görevlerini karşılaştırabilme',
      difficulty: 'Orta',
      level: 'Basit Bilişsel Süreçler',
      templateType: 'Durum & Özellik Matrisi (Tik Tablosu)',
      points: pointAllocations[2] || 11,
      stimulus: `Türkiye'nin uzay filosunda görev yapan uydulardan:
• Türksat 6A: 2024 yılında fırlatılan ilk yerli ve millî haberleşme uydumuzdur (36.000 km yer sabit yörüngede bulunur).
• İMECE: Metre altı yüksek çözünürlüklü ilk yerli gözlem ve istihbarat uydumuzdur (yaklaşık 700 km alçak Dünya yörüngesinde bulunur).`,
      question: `a) Türksat 6A ve İMECE uydularının temel görev alanlarını (haberleşme / yer gözlem) belirtiniz.
b) İMECE gözlem uydusunun neden 36.000 km yerine 700 km gibi alçak bir yörüngeye yerleştirildiğini fotoğraf çözünürlüğü ve detay yakalama bakımından açıklayınız.`,
      answer: `a) Görev Dağılımı: Türksat 6A haberleşme, televizyon yayını ve internet iletişimi sağlar; İMECE ise tarım, haritacılık, çevre takibi ve savunma amaçlı yer gözlem uydusudur.
b) Yörünge Gerekçesi: Yeryüzüne ne kadar yakın olunursa kameraların yeryüzünü yüksek çözünürlükle detaylı görüntülemesi o kadar kolaylaşır. 36.000 km gibi uzak bir mesafeden metre altı netlikte arazi detayı çekmek optik olarak çok zordur.`,
      alternativeAnswers: [
        'a) Türksat 6A haberleşme ve TV yayını, İMECE harita ve yer gözlem uydusudur. b) Yeryüzüne yakın (700 km) olduğunda yüksek çözünürlüklü ve detaylı fotoğraf çekmek mümkündür.',
        'a) Türksat 6A: İletişim / haberleşme; İMECE: Gözlem / haritacılık. b) Alçak yörüngede kameralar yeryüzünü daha yakından ve net çekerek yüksek çözünürlük sağlar.'
      ],
      rubric: [
        { item: 'Uyduların görev alanlarının (haberleşme vs gözlem) doğru yazılması', pts: 5 },
        { item: 'Alçak yörüngenin yüksek fotoğraf çözünürlüğü ve detay yakalama gerekçesinin sunulması', pts: 6 }
      ]
    },
    {
      number: 4,
      outcome: 'FB.7.1.4',
      outcomeTitle: 'Küçük kütleli yıldızların yaşam döngüsünü açıklayabilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Bilimsel Çıkarım',
      points: pointAllocations[3] || 11,
      stimulus: `Yıldızlar uzaydaki gaz ve toz bulutlarının (Bulutsu / Nebula) kütleçekim etkisiyle sıkışmasıyla doğar. Yıldızların ömürlerini nasıl tamamlayacağını ise başlangıç kütleleri belirler.
• Küçük kütleli yıldızlar: Güneş gibi yıldızlardır.
• Büyük kütleli yıldızlar: Güneş'ten katbekat büyük dev yıldızlardır.`,
      question: `a) Güneş büyüklüğündeki küçük kütleli bir yıldızın yaşam döngüsü basamaklarını (Bulutsudan son aşamaya kadar) sırasıyla yazınız.
b) Güneş bir gün süpernova patlaması geçirerek kara deliğe dönüşebilir mi? Nedenini açıklayınız.`,
      answer: `a) Küçük Kütleli Yıldızın Yaşam Evreleri: Bulutsu (Nebula) → Küçük Kütleli Yıldız (Güneş) → Kırmızı Dev → Gezegenimsi Bulutsu → Beyaz Cüce (ve Siyah Cüce).
b) Hayır, Güneş kara deliğe dönüşemez. Çünkü süpernova patlaması geçirip kara delik veya nötron yıldızı oluşturabilmek için başlangıç kütlesinin devasa (büyük kütleli yıldız) olması gerekir. Güneş küçük kütleli olduğu için ömrünü Beyaz Cüce olarak tamamlayacaktır.`,
      alternativeAnswers: [
        'a) Bulutsu → Küçük Yıldız → Kırmızı Dev → Gezegenimsi Bulutsu → Beyaz Cüce. b) Güneş kara delik olamaz; çünkü başlangıç kütlesi yetersizdir, süpernova patlamasını sadece büyük kütleli dev yıldızlar geçirir.',
        'a) Nebula → Güneş → Kırmızı Dev → Gezegenimsi Bulutsu → Beyaz Cüce. b) Kara delik olamaz, kütlesi küçük olduğu için beyaz cüce olarak ömrünü tamamlar.'
      ],
      rubric: [
        { item: 'Küçük kütleli yıldız yaşam evrelerinin doğru sıralanması', pts: 6 },
        { item: 'Güneş\'in kütle yetersizliği nedeniyle kara delik olamayacağının açıklanması', pts: 5 }
      ]
    },
    {
      number: 5,
      outcome: 'FB.7.1.5',
      outcomeTitle: 'Galaksi türlerini ve Samanyolu Galaksisi\'nin yapısını açıklayabilme',
      difficulty: 'Orta',
      level: 'Basit Bilişsel Süreçler',
      templateType: 'Hata Tespiti & Adım Analizi',
      points: pointAllocations[4] || 11,
      stimulus: `Gök adalar (galaksiler) şekillerine ve yapılarına göre sarmal (spiral), eliptik ve düzensiz olmak üzere üçe ayrılır. Güneş Sistemi'mizin içinde bulunduğu Samanyolu Galaksisi ile komşumuz Andromeda Galaksisi bu türlerden birine örnektir.`,
      question: `a) Samanyolu Galaksisi ve komşusu Andromeda Galaksisi şekillerine göre hangi galaksi türüne girer?
b) Güneş Sistemi'miz Samanyolu Galaksisi'nin merkezden dışa uzanan sarmal kollarından hangisinde yer almaktadır? Belirtiniz.`,
      answer: `a) Samanyolu ve Andromeda galaksileri şekillerine göre 'Sarmal (Spiral) Galaksi' türündedir.
b) Güneş Sistemi'miz, Samanyolu Galaksisi'nin 'Avcı (Orion)' sarmal kolu üzerinde yer almaktadır.`,
      alternativeAnswers: [
        'a) Sarmal (Spiral) galaksidir. b) Samanyolu\'nun Avcı (Orion) kolundadır.',
        'a) Her ikisi de sarmal tiptedir. b) Avcı (Orion) kolu üzerinde bulunur.'
      ],
      rubric: [
        { item: 'Sarmal (spiral) galaksi türünün doğru belirtilmesi', pts: 6 },
        { item: 'Güneş Sistemi\'nin Avcı (Orion) kolunda yer aldığının yazılması', pts: 5 }
      ]
    },
    {
      number: 6,
      outcome: 'FB.7.2.1',
      outcomeTitle: 'Fiziksel anlamda iş yapma şartlarını doğrultu ve kuvvet ilişkisiyle analiz edebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      points: pointAllocations[5] || 11,
      stimulus: `Fen bilimleri dersinde fiziksel anlamda iş yapılmış sayılması için cisme net bir kuvvet uygulanmalı ve cisim uygulanan kuvvet doğrultusunda yer değiştirmelidir ($W = F \\cdot \\Delta x$).
1. Durum: ${name1}, 8 kg'lık okul çantasını sırtında taşıyarak düz yatay koridorda sabit süratle 20 metre yürüyor.
2. Durum: ${name1}, aynı çantayı kucağına alıp merdivenlerden 2. kata (düşey yukarı) çıkarıyor.`,
      question: `a) 1. ve 2. durumdan hangisinde YER ÇEKİMİ KUVVETİNE KARŞI fiziksel anlamda iş yapılmıştır? Nedenini açıklayınız.
b) 1. durumda yatay yolda yürürken neden yer çekimine karşı iş yapılmadığını kuvvet doğrultusu ile hareket yönü ilişkisiyle yazınız.`,
      answer: `a) Yalnızca 2. durumda yer çekimine karşı iş yapılmıştır. Çünkü çanta yukarı kaldırılırken yer çekimine zıt yönde yukarı doğru kuvvet uygulanmış ve çanta kuvvet doğrultusunda düşey yukarı hareket etmiştir.
b) 1. durumda ise çanta taşınırken uygulanan kaldırma kuvveti düşey yukarı, hareket ise yataydır. Kuvvet ile hareket doğrultusu birbirine dik ($90^\\circ$) olduğu için kuvvet doğrultusunda yol alınmamıştır ve yer çekimine karşı iş yapılmaz.`,
      alternativeAnswers: [
        'a) 2. durumda yer çekimine karşı iş yapılmıştır çünkü kuvvet yukarı, hareket de yukarı yöndedir. b) 1. durumda kaldırma kuvveti düşey, hareket yataydır; kuvvet ile hareket birbirine dik olduğu için iş yapılmaz ($W = 0$).',
        'a) 2. durum (kuvvet doğrultusunda yukarı hareket vardır). b) 1. durumda kuvvet ve hareket doğrultuları birbirine diktir, bu nedenle iş sıfırdır.'
      ],
      rubric: [
        { item: '2. durumda yer çekimine karşı iş yapıldığının doğru teşhisi ve gerekçesi', pts: 6 },
        { item: '1. durumda kuvvet ile hareketin birbirine dik olması sebebiyle iş yapılmadığının açıklanması', pts: 5 }
      ]
    },
    {
      number: 7,
      outcome: 'FB.7.2.1',
      outcomeTitle: 'Kuvvet uygulanmasına rağmen hareket etmeyen cisimlerde iş kavramını analiz edebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Hata Tespiti & Adım Analizi',
      points: pointAllocations[6] || 11,
      stimulus: `${name2}, odasındaki ağır kütüphane dolabını yerinden oynatmak için $120\\text{ N}$ kuvvet uygulayarak 5 dakika boyunca itmiş, terlemiş ve çok yorulmuştur. Ancak dolap duvara sabitlendiği için milimetre bile hareket etmemiştir.`,
      question: `${name2} çok yorulmasına ve $120\\text{ N}$ kuvvet uygulamasına rağmen fen bilimleri kurallarına göre neden fiziksel anlamda iş yapmamış sayılır? İş formülü ($W = F \\cdot \\Delta x$) ve yer değiştirme şartı bakımından açıklayınız.`,
      answer: `Fiziksel anlamda iş yapılabilmesi için cismin uygulanan kuvvet doğrultusunda mutlaka yol alması (yer değiştirmesi) gerekir. Dolap hareket etmediği için alınan yol sıfırdır ($\\Delta x = 0$). İş formülüne göre $W = F \\cdot \\Delta x = 120\\text{ N} \\cdot 0\\text{ m} = 0\\text{ J}$ olur. Bu nedenle ne kadar yorulursa yorulsun fiziksel anlamda yapılan iş sıfırdır.`,
      alternativeAnswers: [
        'Fiziksel anlamda iş yapılabilmesi için cismin kuvvet doğrultusunda yer değiştirmesi gerekir ($W = F \\cdot \\Delta x$). Dolap hareket etmediği (alınan yol $\\Delta x = 0$) için yapılan fiziksel iş sıfırdır.',
        'Dolap yer değiştirmediği için (alınan yol = 0) uygulanan kuvvet ne kadar büyük olursa olsun fiziksel anlamda iş yapılmamıştır ($W = 0$).'
      ],
      rubric: [
        { item: 'Fiziksel iş için cisme kuvvet doğrultusunda yer değiştirme kazandırılması şartının belirtilmesi', pts: 6 },
        { item: 'Dolabın hareket etmemesi (yol = 0) sebebiyle işin sıfır (0 J) olduğunun formülle gerekçelendirilmesi', pts: 5 }
      ]
    },
    {
      number: 8,
      outcome: 'FB.7.2.1',
      outcomeTitle: 'Kuvvetin büyüklüğü ile yapılan iş miktarı arasındaki doğru orantıyı deney düzeneğiyle açıklayabilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Dilemma (İkilem) & Çözüm Değerlendirme',
      points: pointAllocations[7] || 11,
      stimulus: `Sürtünmesiz yatay bir deney zemininde özdeş iki oyuncak arabadan:
• 1. Arabayı ${name1}, F_1 = 15\\text{ N}$ kuvvet uygulayarak $\\Delta x = 10\\text{ m}$ itmiştir.
• 2. Arabayı ${name2}, F_2 = 30\\text{ N}$ kuvvet uygulayarak $\\Delta x = 10\\text{ m}$ itmiştir.`,
      question: `a) ${name1} ve ${name2}'nin yaptıkları işleri Joule (J) cinsinden hesaplayarak karşılaştırınız. Hangi öğrenci daha fazla iş yapmıştır?
b) Bu deneyde kontrol edilen (sabit tutulan), bağımsız ve bağımlı değişkenleri yazınız.`,
      answer: `a) İş Hesapları: $W_1 = 15\\text{ N} \\cdot 10\\text{ m} = 150\\text{ J}$, $W_2 = 30\\text{ N} \\cdot 10\\text{ m} = 300\\text{ J}$. ${name2}'nin yaptığı iş daha fazladır (2 katıdır).
b) Değişkenler: Kontrol Edilen Değişken: Alınan yol (10 m) ve araba kütlesi. Bağımsız Değişken: Uygulanan kuvvet (15 N vs 30 N). Bağımlı Değişken: Yapılan fiziksel iş miktarı (Joule).`,
      alternativeAnswers: [
        'a) ${name2} daha fazla iş yapmıştır ($W_2 = 300\\text{ J}$, $W_1 = 150\\text{ J}$). b) Bağımsız değişken: Uygulanan kuvvet, Bağımlı değişken: Yapılan iş, Sabit tutulan: Alınan yol.',
        'a) ${name2}\'nin yaptığı iş (300 J), ${name1}\'in yaptığı işten (150 J) büyüktür. b) Kontrol edilen: Yol (10 m), Bağımsız: Kuvvet, Bağımlı: Yapılan iş.'
      ],
      rubric: [
        { item: 'İşlerin formülle hesaplanması (150 J ve 300 J) ve 2. durumun büyük olduğunun tespiti', pts: 6 },
        { item: 'Bağımsız (kuvvet), bağımlı (yapılan iş) ve sabit değişkenlerin doğru adlandırılması', pts: 5 }
      ]
    },
    {
      number: 9,
      outcome: 'FB.7.2.2',
      outcomeTitle: 'Kinetik enerjinin kütle ve sürat değişkenlerine bağlılığını karşılaştırabilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      points: pointAllocations[8] || 11,
      stimulus: `Düz bir karayolunda aynı $60\\text{ km/h}$ sabit süratle ilerleyen boş bir yük kamyonu ($m_1 = 8000\\text{ kg}$) ile küçük bir binek otomobil ($m_2 = 1200\\text{ kg}$) fren yaparak kaçış rampasına girmektedir.`,
      question: `a) Kamyon ve otomobilin kinetik (hareket) enerjilerini gerekçesiyle karşılaştırınız. Hangisinin kinetik enerjisi daha büyüktür?
b) Otomobilin kamyonla aynı kinetik enerjiye ulaşabilmesi için sürati nasıl değiştirilmelidir? Açıklayınız.`,
      answer: `a) Kamyonun kinetik enerjisi daha büyüktür. Çünkü hareket halindeki cisimlerin süratleri eşit olduğunda kütlesi daha büyük olan cismin kinetik enerjisi daha fazla olur.
b) Kütlesi küçük olan otomobilin kamyonla aynı kinetik enerjiye ulaşabilmesi için süratinin artırılması gerekir.`,
      alternativeAnswers: [
        'a) Kamyonun kinetik enerjisi büyüktür; süratler eşitken kütlesi büyük olanın kinetik enerjisi daha fazladır. b) Otomobilin sürati artırılmalıdır.',
        'a) Kamyonunki fazladır (kütlesi büyük olduğu için). b) Kütlesi az olan otomobil daha hızlı gitmelidir.'
      ],
      rubric: [
        { item: 'Kamyonun kinetik enerjisinin büyük olduğunun ve kütle gerekçesinin yazılması', pts: 6 },
        { item: 'Otomobilin kinetik enerjisinin eşitlenmesi için süratinin artırılması gerektiğinin belirtilmesi', pts: 5 }
      ]
    },
    {
      number: 10,
      outcome: 'FB.7.2.2',
      outcomeTitle: 'Çekim potansiyel enerjisinde yükseklik değişkeninin etkisini kum havuzu deneyiyle modelleyebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Öğrenci Diyaloğu & Kavram Yanılgısı',
      points: pointAllocations[8] || 11,
      stimulus: `Fen laboratuvarında özdeş iki demir bilyeden biri $h_1 = 1\\text{ m}$ yüksekliğindeki masadan, diğeri $h_2 = 2\\text{ m}$ yüksekliğindeki dolabın üzerinden serbest bırakılarak kum havuzuna düşürülmüştür.
Öğrencilerden ${name1}: "2 metre yükseklikten bırakılan bilye kum havuzunda daha derin bir iz bırakır."
${name2}: "Bilyeler özdeş olduğu için kumda bıraktıkları çukurların derinliği aynı olur."`,
      question: `Hangi öğrencinin açıklaması doğrudur? Yerden yükseklik ile çekim potansiyel enerjisi ($E_p = m \\cdot g \\cdot h$) arasındaki ilişkiyi ve kuma aktarılan enerjiyi açıklayınız.`,
      answer: `${name1} haklıdır. Çünkü kütleleri eşit cisimlerden yerden yüksekliği daha fazla olan cismin çekim potansiyel enerjisi ($E_p = m \\cdot g \\cdot h$) daha büyüktür. 2 metredeki bilye daha fazla potansiyel enerjiye sahip olduğu için kum zemine çarptığında kuma daha fazla enerji aktarır ve kumda daha derin bir çukur izi oluşturur.`,
      alternativeAnswers: [
        `${name1} haklıdır. Kütleleri eşit cisimlerden yüksekliği fazla olanın çekim potansiyel enerjisi daha büyüktür ($E_p = m \\cdot g \\cdot h$); bu nedenle 2 m'deki bilye kumda daha derin çukur oluşturur.`,
        `${name1}'in tespiti doğrudur. Yükseklik arttıkça çekim potansiyel enerjisi artar ve kum havuzunda daha derin iz bırakır.`
      ],
      rubric: [
        { item: `${name1}'in haklı olduğunun doğru tespiti`, pts: 5 },
        { item: 'Yükseklik arttıkça çekim potansiyel enerjisinin artacağının ve kuma aktarılan derinlik ilişkisinin açıklanması', pts: 6 }
      ]
    }
  ];
}

export function getScienceQuestionsSetB(context: FallbackPoolContext = {}): GeneratedQuestionItem[] {
  const name1 = context.name1 || 'Aslı';
  const pointAllocations = context.pointAllocations || [];
  return [
    {
      number: 1,
      outcome: 'FB.7.1.1',
      outcomeTitle: 'Gözlem uyduları ile haberleşme uydularının yörünge irtifalarını ve işlevlerini karşılaştırabilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      templateType: 'Durum & Özellik Matrisi (Tik Tablosu)',
      points: pointAllocations[0] || 12,
      stimulus: `Türkiye'nin uzay filosunda görev yapan uyduların yörünge özellikleri incelenmiştir:
• Haberleşme Uyduları (Türksat 5B, Türksat 6A): Dünya'dan yaklaşık $36.000\\text{ km}$ uzakta yer-sabit yörüngede bulunur.
• Gözlem ve İstihbarat Uyduları (Göktürk-2, İMECE): Dünya'dan yaklaşık $700\\text{ km}$ uzakta alçak Dünya yörüngesinde bulunur.`,
      question: `a) Türksat haberleşme uydularının neden tek bir bölgeyi kesintisiz kapsayacak şekilde $36.000\\text{ km}$ yer-sabit yörüngeye yerleştirildiğini açıklayınız.
b) İMECE gibi yüksek çözünürlüklü gözlem uydularının neden $36.000\\text{ km}$ yerine $700\\text{ km}$ alçak yörüngede döndüğünü optik netlik ve fotoğraf kalitesi bakımından gerekçelendiriniz.`,
      answer: `a) Yer-sabit yörüngede uydunun dönüş hızı Dünya'nın kendi etrafındaki dönüş hızına eşittir. Böylece uydu Dünya'dan bakan birine göre hep aynı noktada sabit durur; çanak antenlerin yön değiştirmeden kesintisiz TV ve internet sinyali alması sağlanır.
b) Yeryüzüne yakın olmak kameraların metre altı çözünürlükle detaylı fotoğraf çekmesini sağlar. 36.000 km mesafeden santimetre hassasiyetinde yeryüzü detayı yakalamak optik olarak çok zordur.`,
      alternativeAnswers: [
        'a) Yer-sabit yörüngede uydu Dünya ile aynı hızda döner ve çanak antenler yön değiştirmeden kesintisiz haberleşme sağlar. b) Alçak yörüngede yeryüzüne yakın olduğu için yüksek çözünürlüklü ve detaylı fotoğraflar çekebilir.',
        'a) Çanak antenlerin sabit kalıp sürekli yayın alabilmesi için yer-sabit yörüngededir. b) 700 km gibi yakın mesafeden çok daha net ve yüksek çözünürlüklü harita/gözlem fotoğrafları elde edilir.'
      ],
      rubric: [
        { item: 'Yer-sabit yörüngenin kesintisiz iletişim ve çanak anten sabitliği işlevinin açıklanması', pts: 6 },
        { item: 'Alçak yörüngenin metre altı netlik ve optik fotoğraf kalitesi gerekçesinin sunulması', pts: 6 }
      ]
    },
    {
      number: 2,
      outcome: 'FB.7.1.1',
      outcomeTitle: 'Astronotların uzay araştırmalarındaki rolü ve mikroyerçekimi deneylerinin önemini açıklayabilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Bilimsel Çıkarım',
      points: pointAllocations[1] || 11,
      stimulus: `Türkiye'nin ilk astronotu Alper Gezeravcı, Uluslararası Uzay İstasyonu'nda (ISS) geçirdiği süre boyunca Türk bilim insanları tarafından hazırlanan 13 farklı bilimsel deneyi başarıyla gerçekleştirmiştir. Bu deneyler tıp, genetik, malzeme bilimi ve uzayda bitki yetiştirme alanlarını kapsamaktadır.`,
      question: `a) Alper Gezeravcı'nın bu deneyleri Dünya yüzeyindeki laboratuvarlar yerine Uluslararası Uzay İstasyonu'nda gerçekleştirmesinin en temel bilimsel sebebi nedir?
b) Uzayda gerçekleştirilen araştırmaların günlük yaşantımızda kullanılan teknolojilere sağladığı faydalara bir örnek veriniz.`,
      answer: `a) Temel Sebep: Uzay istasyonunda yer çekiminin neredeyse hissedilmediği 'mikroyerçekimi (ağırlıksızlık)' ortamının bulunmasıdır. Dünya'da yer çekimi sebebiyle maskelenen veya gözlenemeyen biyolojik süreçler, hücre davranışları ve alaşım kristalleri uzayda saf halde incelenebilir.
b) Örnek: Uzay araştırmaları için geliştirilen çizilmez gözlük camları, duman detektörleri, hafızalı köpük yataklar, kablosuz şarj aletleri veya su arıtma filtreleri günümüzde günlük hayatta yaygın olarak kullanılmaktadır.`,
      alternativeAnswers: [
        'a) Uzay istasyonundaki mikroyerçekimi (ağırlıksızlık) ortamında deney yapabilmek için. b) Çizilmez camlar, duman detektörleri, su arıtma sistemleri veya hafızalı süngerler uzay teknolojisinin günlük hayata yansımasıdır.',
        'a) Dünya\'daki yer çekiminin olmadığı ortamda hücre ve malzeme davranışlarını incelemek. b) Su filtreleri, duman alarmları ve termal battaniyeler uzay araştırmaları sayesinde üretilmiştir.'
      ],
      rubric: [
        { item: 'Mikroyerçekimi (ağırlıksızlık) ortamının bilimsel deneylerdeki avantajının açıklanması', pts: 6 },
        { item: 'Uzay araştırmalarından günlük hayata aktarılan geçerli bir teknolojik örneğin sunulması', pts: 5 }
      ]
    },
    {
      number: 3,
      outcome: 'FB.7.1.3',
      outcomeTitle: 'Uzay kirliliğinin tehlikelerini ve Kessler sendromunu çözüm teknolojileriyle modelleyebilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Çözüm Üretme',
      points: pointAllocations[2] || 11,
      stimulus: `Dünya yörüngesinde işlevini tamamlamış roket kademeleri, ömrü bitmiş uydular ve patlama artıklarından oluşan 30.000'den fazla metal enkaz saatte yaklaşık $28.000\\text{ km}$ hızla dönmektedir (Uzay Kirliliği).`,
      question: `a) Saatte $28.000\\text{ km}$ hızla dönen bir santimetrelik küçük bir metal vidanın bile aktif uydular ve uzay istasyonu için neden ölümcül bir tehlike oluşturduğunu açıklayınız.
b) Bilim insanlarının uzay kirliliğini azaltmak veya önlemek için önerdiği 2 somut teknolojik çözümü yazınız.`,
      answer: `a) Tehlike: Saatte 28.000 km gibi aşırı yüksek süratlerde cisimlerin kinetik enerjisi muazzam boyutlara ulaşır. Bu süratteki küçücük bir metal vida mermiden katbekat daha yıkıcı bir etkiyle uydunun zırhını delebilir ve 'Kessler Sendromu' denilen zincirleme çarpışmalarla yörüngeyi tamamen kilitlenebilir hale getirebilir.
b) Çözümler: 1) Görev süresi biten uyduların son yakıtlarıyla Dünya atmosferine yönlendirilerek sürtünmeyle yanıp yok edilmesini sağlamak. 2) Robotik kollar, lazer sistemleri veya dev temizleme ağları kullanan uzay temizlik araçlarıyla enkazları toplamak.`,
      alternativeAnswers: [
        'a) Saatte 28.000 km hızdaki atıkların kinetik enerjisi çok yüksektir; aktif uyduları delip parçalayabilir ve zincirleme kazalara yol açabilir. b) Ömrü biten uyduları atmosfere sokup yakmak ve temizlik robotlarıyla enkazları toplamak.',
        'a) Çok yüksek hızla hareket ettikleri için aktif uydulara çarparak onları yok edebilir. b) Uyduların atmosferde kontrollü yakılması ve uzay çöpü toplama ağları/robotları.'
      ],
      rubric: [
        { item: 'Yüksek çarpışma hızı ve kinetik enerji tehlikesinin bilimsel açıklanması', pts: 6 },
        { item: 'İki gerçekçi uzay çöpü temizleme / önleme çözümünün belirtilmesi', pts: 5 }
      ]
    },
    {
      number: 4,
      outcome: 'FB.7.1.4',
      outcomeTitle: 'Büyük kütleli yıldızların yaşam döngüsünü ve kara delik oluşumunu açıklayabilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Kurgusal Tarihi Vaka & Bilimsel Çıkarım',
      points: pointAllocations[3] || 11,
      stimulus: `Başlangıç kütlesi Güneş'ten katbekat büyük olan dev yıldızlar, yakıtlarını tükettiklerinde yaşamlarını küçük kütleli yıldızlardan çok farklı bir şekilde sonlandırırlar.`,
      question: `a) Büyük kütleli bir yıldızın yaşam döngüsü basamaklarını Bulutsudan başlayarak sırasıyla yazınız.
b) Büyük kütleli yıldızların ömrünün sonunda geçirdiği şiddetli patlamaya ne ad verilir? Bu patlama sonrasında hangi gök cisimleri oluşabilir?`,
      answer: `a) Büyük Kütleli Yıldız Yaşam Döngüsü: Bulutsu (Nebula) → Büyük Kütleli Yıldız → Kırmızı Süperdev → Süpernova Patlaması → Nötron Yıldızı (Pulsar) veya Kara Delik.
b) Bu şiddetli patlamaya 'Süpernova Patlaması' adı verilir. Patlama sonrasında yıldızın kütlesine göre geride Nötron Yıldızı (Pulsar) veya ışığın dahi kaçamayacağı güçte bir Kara Delik oluşur.`,
      alternativeAnswers: [
        'a) Bulutsu → Büyük Yıldız → Kırmızı Süperdev → Süpernova → Nötron Yıldızı veya Kara Delik. b) Süpernova patlaması denir; geride nötron yıldızı veya kara delik kalır.',
        'a) Nebula → Büyük Kütleli Yıldız → Kırmızı Süperdev → Süpernova Patlaması → Kara Delik / Nötron Yıldızı. b) Süpernova patlamasıdır; nötron yıldızı veya kara delik oluşur.'
      ],
      rubric: [
        { item: 'Büyük kütleli yıldız evrelerinin doğru sıralanması', pts: 6 },
        { item: 'Süpernova patlamasının ve nötron yıldızı/kara delik çıktılarının doğru belirtilmesi', pts: 5 }
      ]
    },
    {
      number: 5,
      outcome: 'FB.7.1.5',
      outcomeTitle: 'Işık yılı kavramını ve astronomik mesafe ölçümünü açıklayabilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      points: pointAllocations[4] || 11,
      stimulus: `${name1}, bir astronomi dergisinde "Güneş Sistemimize en yakın yıldız olan Proxima Centauri bize $4,24$ ışık yılı uzaklıktadır." cümlesini okumuştur.
${name1}: "Demek ki Proxima Centauri yıldızı 4,24 yıl sonra ömrünü tamamlayacak, ışık yılı bir zaman birimidir." yorumunu yapmıştır.`,
      question: `a) ${name1}'in kavram yanılgısını düzeltiniz. "Işık yılı" ne birimidir? Tanımını yapınız.
b) Proxima Centauri yıldızına bugün dev bir teleskopla bakan bir gökbilimci, yıldızın hangi andaki görüntüsünü görmektedir? Zaman-ışık hızı ilişkisiyle açıklayınız.`,
      answer: `a) Işık yılı zaman birimi değil, astronomik bir UZAKLIK (MESAFE) birimidir. Tanımı: Işığın boşlukta 1 Dünya yılında aldığı devasa mesafedir (yaklaşık 9,46 trilyon kilometre).
b) Yıldızdan çıkan ışığın Dünya'ya ulaşması tam 4,24 yıl sürer. Dolayısıyla bugün teleskopla bakan gökbilimci yıldızın bugünkü durumunu değil, tam 4,24 yıl önceki geçmiş halini görmektedir.`,
      alternativeAnswers: [
        'a) Işık yılı zaman değil, mesafe (uzaklık) birimidir. Işığın 1 yılda aldığı yoldur. b) Yıldızın 4,24 yıl önceki geçmiş halini görür çünkü ışık Dünya\'ya 4,24 yılda ulaşır.',
        'a) Mesafe/uzaklık birimidir (ışığın boşlukta bir yılda katettiği mesafe). b) 4,24 yıl önceki durumunu görür; ışığın bize ulaşması 4,24 yıl sürer.'
      ],
      rubric: [
        { item: 'Işık yılının mesafe/uzaklık birimi olduğunun ve tanımının doğru yapılması', pts: 6 },
        { item: 'Işığın yol alma süresi sebebiyle yıldızın 4,24 yıl önceki geçmiş halinin görüldüğünün açıklanması', pts: 5 }
      ]
    },
    {
      number: 6,
      outcome: 'FB.7.2.1',
      outcomeTitle: 'Alınan yolun yapılan fiziksel iş miktarına etkisini deney düzeneğiyle modelleyebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      points: pointAllocations[5] || 11,
      stimulus: `Sürtünmesiz yatay düzlemde duran özdeş iki koliye eşit büyüklükte $F = 20\\text{ N}$ yatay kuvvet uygulanmıştır:
• 1. Koli: Kuvvet doğrultusunda $\\Delta x_1 = 5\\text{ m}$ çekilmiştir.
• 2. Koli: Kuvvet doğrultusunda $\\Delta x_2 = 15\\text{ m}$ çekilmiştir.`,
      question: `a) Her iki durumda yapılan fiziksel işleri ($W_1$ ve $W_2$) Joule (J) cinsinden hesaplayınız.
b) Cisme uygulanan kuvvet sabit tutulduğunda alınan yol ile yapılan fiziksel iş arasındaki ilişkiyi açıklayınız.`,
      answer: `a) İş Hesapları: $W_1 = F \\cdot \\Delta x_1 = 20\\text{ N} \\cdot 5\\text{ m} = 100\\text{ J}$, $W_2 = F \\cdot \\Delta x_2 = 20\\text{ N} \\cdot 15\\text{ m} = 300\\text{ J}$.
b) Bilimsel İlişki: Cisme uygulanan kuvvet sabit kaldığında cismin aldığı yol arttıkça yapılan fiziksel iş miktarı da doğru orantılı olarak artar (Yol 3 katına çıktığında yapılan iş de 3 katına çıkmıştır).`,
      alternativeAnswers: [
        'a) $W_1 = 100\\text{ J}$, $W_2 = 300\\text{ J}$. b) Kuvvet sabitken cismin aldığı yol arttıkça yapılan fiziksel iş de doğru orantılı olarak artar.',
        'a) 1. koli: 100 J, 2. koli: 300 J. b) Uygulanan kuvvet eşitken alınan yol ile yapılan iş doğru orantılıdır.'
      ],
      rubric: [
        { item: 'Her iki durumdaki işin (100 J ve 300 J) formülle doğru hesaplanması', pts: 6 },
        { item: 'Kuvvet sabitken yol ile yapılan işin doğru orantılı olduğunun açıklanması', pts: 5 }
      ]
    },
    {
      number: 7,
      outcome: 'FB.7.2.1',
      outcomeTitle: 'Günlük hayat etkinliklerinde fiziksel anlamda iş yapılıp yapılmadığını ayırt edebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Öğrenci Diyaloğu & Kavram Yanılgısı',
      points: pointAllocations[6] || 11,
      stimulus: `Günlük hayatta gözlenen iki farklı durum şöyledir:
1. Durum: Sibel Hanım, süpermarkette alışveriş arabasını yatay zeminde $40\\text{ N}$ yatay kuvvet uygulayarak $5\\text{ m}$ ileri itmiştir.
2. Durum: ${name1}, elinde tuttuğu $50\\text{ N}$ ağırlığındaki bavulu yerden kaldırmadan sabit yükseklikte tutarak yatay kaldırımda $10\\text{ m}$ düz yürümüştür.`,
      question: `a) 1. ve 2. durumdan hangisinde fiziksel anlamda İŞ YAPILMIŞTIR? Yapılan iş miktarını Joule (J) olarak hesaplayınız.
b) Diğer durumda neden fiziksel anlamda iş yapılmadığını kuvvet doğrultusu ile hareket yönü ilişkisiyle gerekçelendiriniz.`,
      answer: `a) Yalnızca 1. durumda fiziksel anlamda iş yapılmıştır. Yapılan İş: $W = F \\cdot \\Delta x = 40\\text{ N} \\cdot 5\\text{ m} = 200\\text{ J}$.
b) 2. durumda bavulu taşımak için uygulanan kaldırma kuvveti düşey yukarı doğrultudadır; bavulun hareketi ise yatay doğrultudadır. Kuvvet ile hareket birbirine dik ($90^\\circ$) olduğu için yer çekimine karşı fiziksel iş yapılmamıştır ($W = 0$).`,
      alternativeAnswers: [
        'a) 1. durumda iş yapılmıştır: $W = 40\\text{ N} \\times 5\\text{ m} = 200\\text{ J}$. b) 2. durumda kaldırma kuvveti düşey iken hareket yataydır; kuvvet ve hareket birbirine dik olduğu için iş yapılmaz.',
        'a) 1. durum, yapılan iş 200 Joule\'dür. b) 2. durumda kuvvet yukarı doğru, hareket ise yataydır (birbirine diktir, $W = 0$).'
      ],
      rubric: [
        { item: '1. durumda iş yapıldığının tespiti ve 200 J değerinin doğru hesaplanması', pts: 6 },
        { item: '2. durumda kaldırma kuvveti ile yatay hareketin birbirine dik olması sebebiyle iş yapılmadığının açıklanması', pts: 5 }
      ]
    },
    {
      number: 8,
      outcome: 'FB.7.2.1',
      outcomeTitle: 'Yer çekimine karşı yapılan işi vinç ve taşıma durumlarında modelleyebilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      points: pointAllocations[7] || 11,
      stimulus: `Bir inşaatta $200\\text{ N}$ ağırlığındaki çimento torbası için iki farklı eylem planlanmıştır:
• Eylem 1: Elektrikli vinç torbayı doğrudan düşey yukarı doğru $6\\text{ m}$ çekmiştir.
• Eylem 2: Bir işçi torbayı kucağında tutarak zemin katta düz yatay yolda $6\\text{ m}$ yürümüştür.`,
      question: `a) Eylem 1'de vincin yer çekimine karşı yaptığı fiziksel işi Joule (J) cinsinden hesaplayınız.
b) Eylem 2'de işçinin yer çekimine karşı fiziksel iş yapıp yapmadığını kuvvet doğrultusu bakımından açıklayınız.`,
      answer: `a) Vincin Yaptığı İş: $W = F \\cdot \\Delta x = 200\\text{ N} \\cdot 6\\text{ m} = 1200\\text{ J}$ iş yapılmıştır.
b) Eylem 2'de işçi yer çekimine karşı fiziksel iş yapmamıştır. Çünkü işçinin torbayı tutmak için uyguladığı kuvvet düşey yukarı yönlüdür; hareket ise yataydır. Kuvvet ile hareket doğrultusu birbirine dik olduğu için yer çekimine karşı iş sıfırdır.`,
      alternativeAnswers: [
        'a) $W = 200\\text{ N} \\times 6\\text{ m} = 1200\\text{ J}$. b) Yer çekimine karşı iş yapılmamıştır çünkü kaldırma kuvveti düşey iken hareket yataydır (birbirine diktir).',
        'a) 1200 Joule iş yapılmıştır. b) İş yapılmamıştır; kuvvet yukarı doğru, hareket yatay yönde olduğundan yer çekimine karşı iş sıfırdır.'
      ],
      rubric: [
        { item: 'Vincin yaptığı işin (1200 J) formülle hatasız hesaplanması', pts: 6 },
        { item: 'Yatay yürüme durumunda kuvvet ile hareketin dikliği sebebiyle yer çekimi işinin sıfır olduğunun açıklanması', pts: 5 }
      ]
    },
    {
      number: 9,
      outcome: 'FB.7.2.2',
      outcomeTitle: 'Sürtünmesiz kaykay pistinde mekanik enerji korunumunu ve potansiyel-kinetik enerji dönüşümünü açıklayabilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Öğrenci Diyaloğu & Kavram Yanılgısı',
      points: pointAllocations[8] || 11,
      stimulus: `U şeklindeki sürtünmesiz bir kaykay pistinin en üst tepe noktasından (K noktası, $3\\text{ m}$ yükseklik) serbest bırakılan kaykaycı Anıl, pistin en dip çukur noktasından (L noktası, zemin seviyesi) geçerek karşıdaki tepeye (M noktası) doğru tırmanmaktadır.`,
      question: `a) Anıl'ın K noktasında ve L noktasında sahip olduğu enerji türlerini (çekim potansiyel / kinetik enerji) belirtiniz.
b) L noktasında Anıl'ın süratinin en büyük olmasının sebebini enerjinin korunumu ve dönüşümü ilkesine göre açıklayınız.`,
      answer: `a) Enerji Türleri: K noktasında (en tepe) yükseklik maksimum olduğu için Çekim Potansiyel Enerjisi maksimum, sürat sıfır olduğu için Kinetik Enerji sıfırdır. L noktasında (en dip zemin) yükseklik sıfıra indiği için potansiyel enerjinin tamamı Kinetik Enerjiye dönüşmüştür (Kinetik Enerji maksimumdur).
b) Sürtünmesiz ortamlarda toplam mekanik enerji korunur ($E_p + E_k = \\text{sabit}$). K noktasındaki potansiyel enerjinin tamamı L noktasında kinetik enerjiye (hareket enerjisine) dönüşmüştür. Kinetik enerji sürate bağlı olduğu için kinetik enerjinin en yüksek olduğu taban noktasında sürat de en büyük değerine ulaşır.`,
      alternativeAnswers: [
        'a) K noktasında çekim potansiyel enerjisi en fazladır (kinetik sıfırdır). L noktasında kinetik enerji en fazladır (potansiyel sıfırdır). b) Potansiyel enerjinin tamamı sürtünmesiz ortamda kinetik enerjiye dönüştüğü için tabanda sürat maksimum olur.',
        'a) K\'de potansiyel enerji, L\'de kinetik enerji maksimumdur. b) Enerji dönüşümü gereği tepedeki potansiyel enerji dipte kinetik enerjiye dönüştüğünden sürat en büyüktür.'
      ],
      rubric: [
        { item: 'K ve L noktalarındaki potansiyel ve kinetik enerjilerin doğru teşhisi', pts: 6 },
        { item: 'Sürtünmesiz ortamda potansiyelin kinetiğe dönüşmesi ve süratin maksimum olmasının açıklanması', pts: 5 }
      ]
    },
    {
      number: 10,
      outcome: 'FB.7.2.2',
      outcomeTitle: 'Çekim potansiyel enerjisinde kütle değişkeninin etkisini kum havuzu deneyiyle modelleyebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      points: pointAllocations[8] || 11,
      stimulus: `Laboratuvarda aynı $h = 1,5\\text{ m}$ yüksekliğindeki masanın kenarından iki farklı çelik bilye aynı anda kum havuzuna serbest bırakılmıştır:
• 1. Bilye: Kütlesi $m = 100\\text{ g}$
• 2. Bilye: Kütlesi $2m = 200\\text{ g}$`,
      question: `a) 1. ve 2. bilyenin masadayken sahip oldukları çekim potansiyel enerjilerini karşılaştırınız. Hangisinin potansiyel enerjisi daha büyüktür?
b) Kum havuzunda hangi bilyenin daha derin bir çukur izi oluşturacağını çekim potansiyel enerjisinin kütleye bağlılığı ilkesiyle açıklayınız.`,
      answer: `a) 2. bilyenin ($2m$) çekim potansiyel enerjisi daha büyüktür (1. bilyenin 2 katıdır). Çünkü yerden yükseklikleri eşit olan cisimlerden kütlesi daha büyük olanın çekim potansiyel enerjisi daha fazladır ($E_p = m \\cdot g \\cdot h$).
b) 2. bilye kumda daha derin bir çukur oluşturur. Çünkü sahip olduğu çekim potansiyel enerjisi daha fazladır ve kum zemine çarptığında kuma daha fazla enerji aktararak kumu daha derine iter.`,
      alternativeAnswers: [
        'a) 2. bilyenin ($2m$) potansiyel enerjisi daha büyüktür çünkü yükseklikler eşitken kütlesi büyük olanın enerjisi fazladır. b) 2. bilye kuma daha fazla enerji aktardığı için kumda daha derin çukur oluşturur.',
        'a) Kütlesi 200 g olan 2. bilyenin potansiyel enerjisi büyüktür. b) Kütlesi büyük olan bilyenin çekim potansiyel enerjisi fazla olduğundan kumda daha derin iz bırakır.'
      ],
      rubric: [
        { item: '2. bilyenin potansiyel enerjisinin büyük olduğunun kütle gerekçesiyle açıklanması', pts: 6 },
        { item: 'Kuma aktarılan enerjinin fazlalığı sebebiyle 2. bilyenin daha derin çukur oluşturacağının belirtilmesi', pts: 5 }
      ]
    }
  ];
}

export const fenQuestions_SetA: GeneratedQuestionItem[] = getScienceQuestionsSetA();
export const fenQuestions_SetB: GeneratedQuestionItem[] = getScienceQuestionsSetB();
