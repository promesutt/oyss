import { GeneratedQuestionItem, FallbackPoolContext } from '../index';

export function getDinQuestionsSetA(context: FallbackPoolContext = {}): GeneratedQuestionItem[] {
  const name1 = context.name1 || 'Kerem';
  const name2 = context.name2 || 'Alper';
  const pointAllocations = context.pointAllocations || [];
  return [
    {
      number: 1,
      outcome: 'DKAB.7.1.1',
      outcomeTitle: 'Melekleri sınıflandırabilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[0] || 13,
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      stimulus: `İslam inancında varlıklar duyu organlarıyla algılanabilen ve gayb âlemine ait görülemeyen varlıklar olmak üzere sınıflandırılır. Dört büyük meleğe ise evrenin düzeni ve vahiy ile ilgili yüce vazifeler verilmiştir. (Ders Kitabı 1. Kitap, Sayfa 14-20)`,
      question: `a) Duyu organlarıyla algılanamadığı halde varlığı kabul edilen soyut kavramlara 2 örnek yazınız.\nb) Cebrail (a.s.) ve Azrail (a.s.)'ın yüce Allah tarafından görevlendirildikleri temel vazifeleri birer cümleyle belirtiniz.`,
      answer: `a) Soyut Kavramlar: Akıl, sevgi, merhamet (veya adalet).
b) Cebrail (a.s.): Yüce Allah'ın emir ve vahiylerini peygamberlere ulaştırmakla görevli vahiy meleğidir.
Azrail (a.s.): Eceli gelen canlıların ruhunu teslim almakla görevli ölüm meleğidir.`,
      alternativeAnswers: [
        'a) Sevgi, adalet veya akıl gibi duygular. b) Cebrail peygamberlere vahiy ulaştırır, Azrail canlıların canını almakla vazifelidir.',
        'a) Merhamet, akıl veya yer çekimi gibi gözle görülmeyen gerçekler. b) Cebrail ilahi emirleri iletir, Azrail ölüm anında ruhları kabzeder.'
      ],
      rubric: [
        { item: 'Duyu organlarıyla algılanamayan soyut kavramlara 2 doğru örnek verilmesi', pts: Math.round((pointAllocations[0] || 13) * 0.5) },
        { item: 'Cebrail ve Azrail meleklerinin görevlerinin doğru açıklanması', pts: Math.round((pointAllocations[0] || 13) * 0.5) }
      ]
    },
    {
      number: 2,
      outcome: 'DKAB.7.1.1',
      outcomeTitle: 'Melekleri sınıflandırabilme',
      difficulty: 'Orta',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[1] || 13,
      templateType: 'Durum & Özellik Matrisi',
      stimulus: `Melekler nurdan yaratılmış, günah işlemeyen ve sürekli Allah'a itaat eden varlıklardır. İnsan hayatıyla doğrudan ilgili olan melek grupları Kur'an ve hadislerde açıkça bildirilmiştir. (Ders Kitabı 1. Kitap, Sayfa 19-21)`,
      question: `a) İnsanın sağında ve solunda bulunarak iyi ve kötü davranışlarını amel defterine kaydeden meleklerin adı nedir?\nb) Kabirde insanı ilk sorguya çeken meleklerin adı nedir?`,
      answer: `a) Amelleri Kaydeden Melekler: Kirâmen Kâtibîn (yazıcı melekler).
b) Kabir Sorgu Melekleri: Münker ve Nekir melekleri.`,
      alternativeAnswers: [
        'a) Kirâmen Kâtibîn (yazıcılar), b) Münker ve Nekir (kabir sorgu melekleri).',
        'a) Yazıcı melekler (Kiramen Katibin), b) Kabirde sual soran Münker ve Nekir.'
      ],
      rubric: [
        { item: 'Kirâmen Kâtibîn meleklerinin doğru yazılması', pts: Math.round((pointAllocations[1] || 13) * 0.5) },
        { item: 'Münker ve Nekir sorgu meleklerinin doğru yazılması', pts: Math.round((pointAllocations[1] || 13) * 0.5) }
      ]
    },
    {
      number: 3,
      outcome: 'DKAB.7.1.2',
      outcomeTitle: 'Ahiret hayatının aşamalarını çözümleyebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[2] || 13,
      templateType: 'Metin İçi Delillendirme & Örtük Anlam',
      stimulus: `'Sûr'a üflenir; göklerde ve yerde olanlar, Allah'ın diledikleri müstesna, baygın düşer (ölür). Sonra ona bir daha üflenir; bir de bakarsın ki onlar ayağa kalkmış bakıyorlar.' (Zümer Suresi, 68. ayet - Ders Kitabı 1. Kitap, Sayfa 26)`,
      question: `Ayet metninde Sûr'a birinci ve ikinci üflenişle gerçekleşeceği bildirilen iki ahiret aşamasının adını (kavramları) sırasıyla yazınız.`,
      answer: `1. Birinci Üfleniş: Kıyamet (Dünya hayatının son bulması, evrendeki kozmik düzenin yıkılması ve canlıların vefatı).
2. İkinci Üfleniş: Ba's (Ölen bütün insanların hesaba çekilmek üzere kabirlerinden yeniden diriltilmesi).`,
      alternativeAnswers: [
        '1) Birinci üflenişte kıyamet koparak canlılar ölür, 2) İkinci üflenişte ba\'s (öldükten sonra yeniden dirilme) gerçekleşir.',
        '1) İlk üfleme ile kıyamet ve kâinatın yok oluşu, 2) İkinci üfleme ile kabirlerden yeniden diriliş (ba\'s) aşaması başlar.'
      ],
      rubric: [
        { item: 'Kıyamet kavramının doğru tespiti ve açıklaması', pts: Math.round((pointAllocations[2] || 13) * 0.5) },
        { item: 'Ba\'s (yeniden diriliş) kavramının doğru tespiti', pts: Math.round((pointAllocations[2] || 13) * 0.5) }
      ]
    },
    {
      number: 4,
      outcome: 'DKAB.7.1.2',
      outcomeTitle: 'Ahiret hayatının aşamalarını çözümleyebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[3] || 13,
      templateType: 'Öğrenci Diyaloğu & Kavram Yanılgısı',
      stimulus: `${name1}: 'İnsanlar öldükten sonra doğrudan cennet ya da cehenneme gider, aradaki toplanma ve amel tartımı aşamaları semboliktir.' demiştir. ${name2} ise ahirette ilahi adaletin tecelli edeceği iki temel durağı hatırlatmıştır. (Ders Kitabı 1. Kitap, Sayfa 27-29)`,
      question: `${name2}'nin hatırlattığı; dirilen insanların toplanacağı alana verilen adı (1) ve amellerin tartıldığı ilahi adalet terazisine verilen adı (2) yazınız.`,
      answer: `1. Toplanma Alanı: Mahşer (Haşir meydanı).
2. Amellerin Tartıldığı İlahi Adalet Terazisi: Mizan.`,
      alternativeAnswers: [
        '1) Dirilenlerin toplanma yeri: Mahşer (haşr meydanı). 2) İyilik ve kötülüklerin tartıldığı terazi: Mizan.',
        '1) Mahşer meydanı, 2) Mizan (ilahi adalet terazisi).'
      ],
      rubric: [
        { item: 'Mahşer kavramının doğru yazılması', pts: Math.round((pointAllocations[3] || 13) * 0.5) },
        { item: 'Mizan adalet terazisi kavramının doğru yazılması', pts: Math.round((pointAllocations[3] || 13) * 0.5) }
      ]
    },
    {
      number: 5,
      outcome: 'DKAB.7.1.2',
      outcomeTitle: 'Ahiret hayatının aşamalarını çözümleyebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[4] || 12,
      templateType: 'Metin İçi Delillendirme & Örtük Anlam',
      stimulus: `'O gün onların ağızlarını mühürleriz; yaptıklarını bize elleri anlatır, ayakları da şahitlik eder.' (Yâsîn Suresi, 65. ayet - Ders Kitabı 1. Kitap, Sayfa 28)`,
      question: `Yâsîn suresindeki bu ayet, ahiretteki hesabın hangi tartışmasız adalet özelliğini kanıtlar? Açıklayınız.`,
      answer: `Ahirette hiçbir yalan, inkâr, sahte şahit veya mazerete yer bırakmayacak mutlak ve kusursuz bir ilahi adaletin tecelli edeceğini kanıtlar. İnsanın kendi organları işledikleri fiillere şahitlik ederek gerçeği apaçık ortaya çıkaracaktır.`,
      alternativeAnswers: [
        'Hesap günü suçların üzerinin örtülemeyeceğini, insanın kendi uzuvlarının şahitliğiyle tam ve eksiksiz bir adaletin gerçekleşeceğini gösterir.',
        'Yalan söylemenin imkânsız olduğunu, organların diliyle gerçeklerin apaçık ortaya çıkacağını ve kusursuz adaletin tecelli edeceğini belirtir.'
      ],
      rubric: [
        { item: 'Yalan ve inkarın imkansızlığı ve mutlak adalet vurgusu', pts: Math.round((pointAllocations[4] || 12) * 0.5) },
        { item: 'Organların şahitliğiyle hakikatin ortaya çıkışının açıklanması', pts: Math.round((pointAllocations[4] || 12) * 0.5) }
      ]
    },
    {
      number: 6,
      outcome: 'DKAB.7.1.3',
      outcomeTitle: 'Melek ve ahiret inancının insana kazandırdıkları konusunda analitik düşünebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[5] || 12,
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      stimulus: `${name1}, odasında tek başınayken ve hiç kimse kendisini görmüyorken bile internette ahlaka aykırı sitelere girmemekte, haksız bir kazanç teklifini tereddütsüz reddetmektedir. (Ders Kitabı 1. Kitap, Sayfa 32-33)`,
      question: `${name1}'in hiç kimsenin görmediği yerlerde dahi dürüst davranması, Kirâmen Kâtibîn meleklerine inanmanın insana kazandırdığı hangi ahlaki bilinçle açıklanır? Yazınız.`,
      answer: `Bu durum, insanın sağında ve solunda bulunan Kirâmen Kâtibîn meleklerinin yapılan her ameli kaydettiği bilincinden kaynaklanan 'öz denetim (otokontrol)' duygusudur. Kişi yalnız kalsa bile asla sahipsiz olmadığını ve Allah'ın huzurunda hesap vereceğini bilir.`,
      alternativeAnswers: [
        'Kirâmen Kâtibîn meleklerinin iyi ve kötü her işi amel defterine yazdığı bilincinden doğan otokontrol (öz denetim) ahlakıdır.',
        'İnsanın kimse görmese de melekler ve Allah tarafından görüldüğü şuuruyla hareket etmesini sağlayan vicdani iç denetim duygusudur.'
      ],
      rubric: [
        { item: 'Kirâmen Kâtibîn ve amel defteri şuurunun belirtilmesi', pts: Math.round((pointAllocations[5] || 12) * 0.5) },
        { item: 'Otokontrol/özdenetim ahlakının gerekçeli açıklanması', pts: Math.round((pointAllocations[5] || 12) * 0.5) }
      ]
    },
    {
      number: 7,
      outcome: 'DKAB.7.1.3',
      outcomeTitle: 'Melek ve ahiret inancının insana kazandırdıkları konusunda analitik düşünebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[6] || 12,
      templateType: 'Dilemma (İkilem) & Çözüm Değerlendirme',
      stimulus: `Dünya hayatında haksızlığa uğrayan, hakkı yenen ve zalimlerin cezasız kaldığını gören bir insan bazen ümitsizliğe ve intikam duygusuna kapılabilir. (Ders Kitabı 1. Kitap, Sayfa 34)`,
      question: `Ahiretteki 'Mizan ve Mahkeme-i Kübra' inancı, adaletsizliğe uğrayan bir müminin adalet inancını ve iç huzurunu nasıl korur? Açıklayınız.`,
      answer: `Mümin bilir ki dünya bir imtihandır ve hakiki mutlak adalet ahiretteki Mahkeme-i Kübra'da tecelli edecektir. 'Zerre ağırlığınca hayır yapan da şer yapan da karşılığını görecektir.' Zalimin yaptığı yanına kalmayacak, mazlum hakkını kuruşu kuruşuna alacaktır; bu inanç mümine derin bir adalet huzuru ve sabır sağlar.`,
      alternativeAnswers: [
        'Ahirette mutlak adaletin kurulacağına, mazlumun hakkını zalimden eksiksiz alacağına ve hiçbir kötülüğün cezasız kalmayacağına inanmak insana iç huzuru sağlar.',
        'Dünyadaki haksızlıkların Mahkeme-i Kübra\'da ilahi mizan terazisinde görüleceği bilinci, mümine sabır ve adalet inancı verir.'
      ],
      rubric: [
        { item: 'Mahkeme-i Kübra ve mutlak ilahi adalet inancının vurgulanması', pts: Math.round((pointAllocations[6] || 12) * 0.5) },
        { item: 'Mazlumun hakkını alacağı ve ümitsizliği önleme etkisinin yazılması', pts: Math.round((pointAllocations[6] || 12) * 0.5) }
      ]
    },
    {
      number: 8,
      outcome: 'DKAB.7.1.4',
      outcomeTitle: 'Bir Sure Öğreniyorum: Nâs Suresi',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[7] || 12,
      templateType: 'Metin İçi Delillendirme & Örtük Anlam',
      stimulus: `'De ki: İnsanların kalplerine vesvese sokan sinsi vesvesecinin şerrinden insanların Rabbine, insanların Melikine (hükümranına), insanların İlahına sığınırım! O vesvese cinlerden de olur insanlardan da.' (Nâs Suresi - Ders Kitabı 1. Kitap, Sayfa 37-38)`,
      question: `Nâs suresinde insanın ne tür tehlikelerden ve kime sığınması emredilmektedir? İki unsur halinde açıklayınız.`,
      answer: `1. Kime Sığınılır: İnsanların tek Rabbi, mutlak hükümdarı (Melik) ve gerçek mabudu olan Yüce Allah'a sığınılır.
2. Neyin Şerrinden Sığınılır: İnsanın kalbine kötü düşünceler, şüphe ve günah fısıldayan (vesvese veren) cin ve insan şeytanlarının sinsi tuzaklarından sığınılır.`,
      alternativeAnswers: [
        'İnsanların Rabbi, Meliki ve İlahı olan Allah\'a sığınılır; insanların ve cinlerin kalbe kötü düşünce ve şüphe sokan sinsi vesveselerinden sakınılır.',
        'Yalnızca her şeyin sahibi Yüce Allah\'a sığınmak emredilir; sinsi vesvesecilerin (hannâs) ve insan ile cin şeytanlarının kötülüklerinden sığınılır.'
      ],
      rubric: [
        { item: 'Yalnızca Allah\'a (Rab, Melik, İlah) sığınılacağının belirtilmesi', pts: Math.round((pointAllocations[7] || 12) * 0.5) },
        { item: 'Sinsi vesvese ve kötülük fısıldayan odakların şerrinden sakınmanın açıklanması', pts: Math.round((pointAllocations[7] || 12) * 0.5) }
      ]
    },
    {
      number: 9,
      outcome: 'DKAB.7.2.1',
      outcomeTitle: 'Hac ve umre ibadetlerini çözümleyebilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[8] || 12,
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      stimulus: `Hac veya umre ibadeti için Mekke'ye giden bir Müslüman, Kâbe'nin etrafında Hacerülesved hizasından başlayarak 7 şavttan oluşan 'tavaf'ı gerçekleştirir. Ardından Safa ile Merve tepeleri arasında 7 kez gidip gelerek 'sa'y' ibadetini tamamlar. (Ders Kitabı 1. Kitap, Sayfa 54-55)`,
      question: `a) Kâbe etrafındaki her bir dönüşe ve bu dönüşlerin 7 tanesinden oluşan ibadete verilen dini terimleri yazınız.
b) Safa ve Merve tepeleri arasındaki sa'y ibadeti hangi peygamberin ailesinin teslimiyet ve su arayışı hatırasını yaşatmaktadır?`,
      answer: `a) Kâbe etrafındaki her bir dönüşe 'şavt', 7 şavttan oluşan ibadetin tamamına 'tavaf' denir.
b) Hz. İbrahim'in eşi Hz. Hacer validemizin henüz bebek olan oğlu Hz. İsmail için su ararken bu iki tepe arasında koşmasının ve Allah'a teslimiyetinin hatırasıdır.`,
      alternativeAnswers: [
        'a) Bir dönüşe şavt, yedi dönüşe tavaf denir. b) Hz. Hacer\'in oğlu Hz. İsmail\'e su bulmak için verdiği mücadelenin ve Allah\'a teslimiyetinin hatırasıdır.',
        'a) Şavt ve tavaf. b) Hz. Hacer validemiz ve oğlu Hz. İsmail\'in hatırasını sembolize eder.'
      ],
      rubric: [
        { item: 'Şavt ve tavaf kavramlarının doğru açıklanması', pts: Math.round((pointAllocations[8] || 12) * 0.5) },
        { item: 'Hz. Hacer ve Hz. İsmail hatırasının / su arayışının yazılması', pts: Math.round((pointAllocations[8] || 12) * 0.5) }
      ]
    }
  ];
}

export function getDinQuestionsSetB(context: FallbackPoolContext = {}): GeneratedQuestionItem[] {
  const name1 = context.name1 || 'Aslı';
  const name2 = context.name2 || 'Onur';
  const pointAllocations = context.pointAllocations || [];
  return [
    {
      number: 1,
      outcome: 'DKAB.7.1.1',
      outcomeTitle: 'Melekleri sınıflandırabilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[0] || 13,
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      stimulus: `Dört büyük melekten ikisi evrendeki doğa olaylarını ve ahiretin başlangıç vaktini idare etmekle vazifelendirilmiştir. (Ders Kitabı 1. Kitap, Sayfa 19-20)`,
      question: `Mikail (a.s.) ve İsrafil (a.s.)'ın yüce Allah tarafından verilen görevlerini birer cümleyle açıklayınız.`,
      answer: `• Mikail (a.s.): Yağmur, rüzgâr, bitkilerin yeşermesi gibi tabiat olaylarını ve canlıların rızıklarını Allah'ın izniyle düzenlemekle görevli melektir.
• İsrafil (a.s.): Kıyametin kopması (1. üfleniş) ve insanların yeniden diriltilmesi (2. üfleniş) için Sûr borusuna üflemekle görevlendirilmiş melektir.`,
      alternativeAnswers: [
        'Mikail doğa olaylarını ve rızıkları yönetir; İsrafil ise kıyametin kopması ve yeniden diriliş için Sûr\'a üfler.',
        'Mikail tabiat dengesini ve canlıların rızıklarını idare eder; İsrafil kıyamet ve ba\'s vaktinde Sûr borusuna üflemekle görevlidir.'
      ],
      rubric: [
        { item: 'Mikail\'in tabiat olayları ve rızık görevinin doğru yazılması', pts: Math.round((pointAllocations[0] || 13) * 0.5) },
        { item: 'İsrafil\'in Sûr\'a üfleme görevinin doğru yazılması', pts: Math.round((pointAllocations[0] || 13) * 0.5) }
      ]
    },
    {
      number: 2,
      outcome: 'DKAB.7.1.1',
      outcomeTitle: 'Melekleri sınıflandırabilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[1] || 13,
      templateType: 'Durum & Özellik Matrisi',
      stimulus: `İslam inancında duyu organlarıyla algılanamayan gayb alemine ait varlıklar vardır: Melekler, cinler ve şeytan. (Ders Kitabı 1. Kitap, Sayfa 15-19)`,
      question: `Melekler ile şeytanı yaratılış maddesi ve Allah'ın emirlerine itaat bakımından 2 maddeyle karşılaştırınız.`,
      answer: `1. Yaratılış Maddesi: Melekler saf nurdan yaratılmıştır; şeytan ise dumansız yalın bir ateşten yaratılmıştır.
2. İtaat Durumu: Melekler asla günah işlemez, kibirlenmez ve Allah'a tam itaat ederler; şeytan ise kibri yüzünden Allah'ın emrine isyan etmiş ve kötülüğe yönelmiştir.`,
      alternativeAnswers: [
        '1) Melekler nurdan, şeytan ise ateşten yaratılmıştır. 2) Melekler Allah\'a daima itaat eder, şeytan ise kibri yüzünden isyan etmiştir.',
        '1) Yaratılış: Melek nur, şeytan ateş. 2) İtaat: Melekler günahsız ve itaatkardır, şeytan ise isyankardır ve kötülüğe çağırır.'
      ],
      rubric: [
        { item: 'Nur ve ateş yaratılış farkının doğru yazılması', pts: Math.round((pointAllocations[1] || 13) * 0.5) },
        { item: 'İtaat ve isyan/kibir ahlaki farkının doğru yazılması', pts: Math.round((pointAllocations[1] || 13) * 0.5) }
      ]
    },
    {
      number: 3,
      outcome: 'DKAB.7.1.2',
      outcomeTitle: 'Ahiret hayatının aşamalarını çözümleyebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[2] || 13,
      templateType: 'Metin İçi Delillendirme & Örtük Anlam',
      stimulus: `'Ölü toprağa can veren Allah, işte ölüleri de böyle diriltecektir...' Kur'an-ı Kerim'de kışın kuruyan ve ölen tabiatın ilkbaharda yemyeşil canlanması yeniden dirilişe delil gösterilir. (Ders Kitabı 1. Kitap, Sayfa 24)`,
      question: `Tabiatın ilkbaharda yeniden dirilmesi ile ahiretteki 'Ba's' inancı arasındaki mantıksal bağı açıklayınız.`,
      answer: `Kış mevsiminde kurumuş, ölmüş gibi duran ağaçlara ve toprağa baharda yeniden can veren sonsuz kudret sahibi Allah için, ölüp toprağa karışan insanları ikinci bir sûr üflenişiyle yeniden diriltmek (Ba's) son derece kolaydır. Tabiat her bahar gözlerimizin önünde Ba's gerçeğini sergilemektedir.`,
      alternativeAnswers: [
        'Kışın kurumuş toprağa ve ağaçlara baharda hayat veren Allah\'ın, ölen insanları da kolaylıkla kabirlerinden diriltebileceğini gösterir.',
        'Tabiatın her ilkbaharda canlanması Allah\'ın yaratma kudretinin bir delilidir; insanları da aynı güçle yeniden diriltecektir.'
      ],
      rubric: [
        { item: 'Baharın dirilişi ile Ba\'s arasındaki analojinin açıklanması', pts: Math.round((pointAllocations[2] || 13) * 0.5) },
        { item: 'Allah\'ın sonsuz yaratma kudretiyle bağ kurulması', pts: Math.round((pointAllocations[2] || 13) * 0.5) }
      ]
    },
    {
      number: 4,
      outcome: 'DKAB.7.1.2',
      outcomeTitle: 'Ahiret hayatının aşamalarını çözümleyebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[3] || 13,
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      stimulus: `Mahşer meydanında toplanan insanlara dünyada yaptıkları bütün iyilik ve kötülüklerin yazılı olduğu amel defterleri verilecektir. (Ders Kitabı 1. Kitap, Sayfa 28)`,
      question: `Amel defterinin sağından verilmesi ile solundan verilmesinin ahiretteki akıbet (sonuç) açısından anlamını açıklayınız.`,
      answer: `• Defteri Sağdan Verilenler: Dünyada iman edip salih amel işleyen bahtiyar kullardır; hesapları kolay geçecek ve mükâfat olarak Cennet'e gideceklerdir.
• Defteri Soldan Verilenler: Dünyada inkâr ve kötülük içinde yaşayanlardır; büyük bir pişmanlık ve hüsrana uğrayarak Cehennem azabına gideceklerdir.`,
      alternativeAnswers: [
        'Defteri sağdan verilenler imtihanı kazanıp cennete girecektir; soldan verilenler ise hüsrana uğrayıp cehennem azabıyla karşılaşacaktır.',
        'Defterin sağdan verilmesi hesabı kolay geçip cennet mükâfatına kavuşmayı, soldan verilmesi ise mahcubiyet ve cehennem cezasını ifade eder.'
      ],
      rubric: [
        { item: 'Defteri sağdan verilenlerin durumu ve cennet akıbetinin yazılması', pts: Math.round((pointAllocations[3] || 13) * 0.5) },
        { item: 'Defteri soldan verilenlerin hüsranı ve cehennem sonucunun açıklanması', pts: Math.round((pointAllocations[3] || 13) * 0.5) }
      ]
    },
    {
      number: 5,
      outcome: 'DKAB.7.1.3',
      outcomeTitle: 'Melek ve ahiret inancının insana kazandırdıkları konusunda analitik düşünebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[4] || 12,
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      stimulus: `'Kim zerre miktarı hayır işlemişse onu görür. Kim de zerre miktarı şer işlemişse onu görür.' (Zilzâl Suresi, 7-8. ayetler - Ders Kitabı 1. Kitap, Sayfa 30 (Dipnot 60))`,
      question: `Bu ayetleri ilke edinen bir esnafın tartı ve ölçü yaparken hile yapmaktan neden şiddetle kaçınacağını ahiret sorumluluğu açısından açıklayınız.`,
      answer: `Bu ayetleri kalbine yerleştiren bir esnaf bilir ki kimsenin görmediği bir gramlık eksik tartı dahi zayi olmayacak, Mizan terazisinde önüne çıkacaktır. Kul hakkının hesabını verememe korkusu ve ilahi adalete olan sarsılmaz inancı onu her türlü hile ve haksızlıktan kesin olarak alıkoyar.`,
      alternativeAnswers: [
        'Zerre kadar haksızlığın bile Mizan terazisinde hesaba çekileceğini bilen esnaf, kul hakkından korktuğu için hile yapamaz.',
        'En küçük bir eksik tartının dahi amel defterine yazılacağını ve hesabının verileceğini bildiği için ölçüde adalete tam riayet eder.'
      ],
      rubric: [
        { item: 'Zerre kadar hakkın hesabının verileceği bilincinin açıklanması', pts: Math.round((pointAllocations[4] || 12) * 0.5) },
        { item: 'Kul hakkı ve Mizan terazisi korkusunun dürüstlüğe etkisinin yazılması', pts: Math.round((pointAllocations[4] || 12) * 0.5) }
      ]
    },
    {
      number: 6,
      outcome: 'DKAB.7.1.3',
      outcomeTitle: 'Melek ve ahiret inancının insana kazandırdıkları konusunda analitik düşünebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[5] || 12,
      templateType: 'Dilemma (İkilem) & Çözüm Değerlendirme',
      stimulus: `Geceleri karanlıktan korkan veya yalnız kaldığında endişelenen bir çocuğa annesi koruyucu meleklerin (Hafaza melekleri) varlığından bahsetmiştir. (Ders Kitabı 1. Kitap, Sayfa 21 ve 34)`,
      question: `Hafaza meleklerine inanmanın insan psikolojisine kazandırdığı manevi huzur ve güven hissini açıklayınız.`,
      answer: `Hafaza meleklerine inanan insan, kâinatta yapayalnız, kimsesiz ve sahipsiz olmadığını idrak eder. Yüce Yaratıcının kendisini görünmeyen koruyucu güçlerle muhafaza ettiğini bilmek insana derin bir iç huzuru, güven ve manevi cesaret verir; kaygı ve yalnızlık hissini yok eder.`,
      alternativeAnswers: [
        'Kişinin dünyada sahipsiz ve savunmasız olmadığını, Yüce Allah\'ın koruyucu meleklerle kendisini gözettiğini bilmesi manevi güven ve cesaret verir.',
        'Hafaza melekleri inancı insanı yalnızlık ve sahipsizlik korkusundan kurtararak kalbine iç huzuru, güven ve ferahlık aşılar.'
      ],
      rubric: [
        { item: 'Yalnız ve sahipsiz olunmadığı bilincinin vurgulanması', pts: Math.round((pointAllocations[5] || 12) * 0.5) },
        { item: 'Manevi güven, cesaret ve kaygıların giderilmesinin açıklanması', pts: Math.round((pointAllocations[5] || 12) * 0.5) }
      ]
    },
    {
      number: 7,
      outcome: 'DKAB.7.1.3',
      outcomeTitle: 'Melek ve ahiret inancının insana kazandırdıkları konusunda analitik düşünebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[6] || 12,
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      stimulus: `Ecdadımız Osmanlı'da kışın dağlardaki kurtlar ve kuşlar aç kalmasın diye vakıflar kurulmuş, cami ve medrese duvarlarına zarif kuş sarayları inşa edilmiştir. (Ders Kitabı 1. Kitap, Sayfa 35)`,
      question: `Canlılara gösterilen bu derin merhametin arkasındaki melek ve ahiret hesabı bilincini açıklayınız.`,
      answer: `İslam inancına göre kıyamet gününde dilsiz hayvanların hakkı dahi mahşerde sorulacaktır. Hayvanlara yapılan bir yudum su iyiliğinin amel defterine sevap yazılacağı inancı, ecdadımızı kuşlara dahi saray yapan eşsiz bir merhamet medeniyeti inşa etmeye sevk etmiştir.`,
      alternativeAnswers: [
        'Hayvanlara yapılan merhametin amel defterine yazılacağını ve hayvan haklarının dahi ahirette sorulacağını bilmenin doğurduğu şuurudur.',
        'Dilsiz canlıların hakkının dahi mahşerde aranacağı ve her iyiliğin mükâfatlandırılacağı inancının oluşturduğu merhamet ahlakıdır.'
      ],
      rubric: [
        { item: 'Hayvan haklarının ahirette sorulacağı inancının yazılması', pts: Math.round((pointAllocations[6] || 12) * 0.5) },
        { item: 'Merhamet ve amel defteri bilinciyle bağ kurulması', pts: Math.round((pointAllocations[6] || 12) * 0.5) }
      ]
    },
    {
      number: 8,
      outcome: 'DKAB.7.1.4',
      outcomeTitle: 'Bir Sure Öğreniyorum: Nâs Suresi',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[7] || 12,
      templateType: 'Öğrenci Diyaloğu & Kavram Yanılgısı',
      stimulus: `${name1}: 'Nâs suresinde sadece dışımızdaki düşmanlardan bahsedilir' demiştir. ${name2} ise surenin asıl insanın iç dünyasına fitne sokan sinsi vesveselere dikkat çektiğini belirtmiştir. (Ders Kitabı 1. Kitap, Sayfa 38-39)`,
      question: `Nâs suresindeki 'vesvese' kavramını açıklayınız. İnsan aklına gelen vesveselere karşı surenin önerdiği temel koruma yöntemi nedir?`,
      answer: `• Vesvese: İnsanın kalbine ve zihnine gizlice fısıldanan, onu hayırdan alıkoyup kötülüğe, şüpheye ve ümitsizliğe sevk eden sinsi telkinlerdir.
• Korunma Yöntemi: Bu fısıltılara kapılmayıp doğrudan insanların yegane Rabbi, Meliki ve İlahı olan Yüce Allah'a sığınmak ve O'ndan yardım dilemektir.`,
      alternativeAnswers: [
        'Vesvese, kalbe gizlice fısıldanan kötü ve şüpheci düşüncelerdir; korunma yolu insanların Rabbi olan Allah\'a sığınmak ve dua etmektir.',
        'Vesvese insanın aklını çelmeye çalışan sinsi şüphelerdir; çaresi ise doğrudan Yüce Allah\'a (Rab, Melik, İlah) sığınmaktır.'
      ],
      rubric: [
        { item: 'Vesvese kavramının doğru tanımlanması', pts: Math.round((pointAllocations[7] || 12) * 0.5) },
        { item: 'Doğrudan Allah\'a sığınma çözümünün açıklanması', pts: Math.round((pointAllocations[7] || 12) * 0.5) }
      ]
    },
    {
      number: 9,
      outcome: 'DKAB.7.2.1',
      outcomeTitle: 'Hac ve umre ibadetlerini çözümleyebilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[8] || 12,
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      stimulus: `Hac ibadetinin geçerli olabilmesi için yerine getirilmesi zorunlu olan 3 temel farz (rükn) bulunmaktadır. Bu farzlardan biri eksik olduğunda hac geçerli olmaz. Hacı adayları ayrıca ihrama girmeden geçemeyecekleri belirlenmiş sınır noktalarına riayet ederler. (Ders Kitabı 1. Kitap, Sayfa 52-56)`,
      question: `a) Haccın yerine getirilmesi zorunlu olan 3 temel farzını (rüknünü) yazınız.
b) Hacı adaylarının ihrama girmeden geçmelerinin yasak olduğu coğrafi sınırlara verilen isim nedir?`,
      answer: `a) Haccın 3 Temel Farzı: 1. İhrama girmek, 2. Arafat'ta vakfe yapmak, 3. Kâbe'yi tavaf etmek (Ziyaret tavafı).
b) İhrama girme sınırı olan bu noktalara 'Mîkât' denir.`,
      alternativeAnswers: [
        'a) 1. İhram, 2. Arafat vakfesi, 3. Kâbe\'yi tavaf etmek (ziyaret tavafı). b) Mîkât sınırları.',
        'a) İhrama girmek, Arafat vakfesi ve farz olan ziyaret tavafı. b) Mîkât mahalleri/noktaları.'
      ],
      rubric: [
        { item: 'Haccın 3 temel farzının (ihram, Arafat vakfesi, tavaf) eksiksiz yazılması', pts: Math.round((pointAllocations[8] || 12) * 0.6) },
        { item: 'Mîkât sınır kavramının doğru tanımlanması', pts: Math.round((pointAllocations[8] || 12) * 0.4) }
      ]
    }
  ];
}

export const dinQuestions: GeneratedQuestionItem[] = getDinQuestionsSetA();
export const dinQuestions_7th_SetB: GeneratedQuestionItem[] = getDinQuestionsSetB();
