# -*- coding: utf-8 -*-
import json
import sys
from build_all_g6_distinct_perfect import G6_DEDICATED
import append_grade6_all_subjects

# =====================================================================
# 1. FEN BİLİMLERİ MISSING: ('fen_bilimleri', 'FB.6.2.3', 5, 0)
# =====================================================================
G6_DEDICATED[('fen_bilimleri', 'FB.6.2.3', 5, 0)] = {
    "contextText": "Dairesel pistte koşan sporcunun sürati ve yer değiştirmesi.",
    "stimulus": "400 metrelik dairesel bir koşu pistinde koşan Selim, başlangıç çizgisinden koşmaya başlayıp tam 1 turu 80 saniyede tamamlayarak tekrar başladığı noktaya gelmiştir. Arkadaşı Mert ise aynı 80 saniyelik sürede doğrusal bir yolda 240 metre ileriye koşmuştur.",
    "questionText": "a) Selim'in ortalama süratini (m/s cinsinden) işlem basamaklarıyla hesaplayınız.\nb) Selim'in koşu sonundaki yer değiştirmesi ile Mert'in yer değiştirmesini karşılaştırarak, Selim'in ortalama hızının neden 0 m/s olduğunu açıklayınız.",
    "solutionExplanation": "Sürat = Alınan Yol / Zaman = 400 / 80 = 5 m/s. Yer değiştirme ilk ve son konum arasındaki farktır; Selim başladığı yere döndüğü için yer değiştirmesi 0'dır, dolayısıyla hızı 0 m/s'dir.",
    "modelAnswer": "a) Selim'in Ortalama Sürati:\nSürat = Alınan Yol / Zaman = 400 m / 80 s = 5 m/s.\n\nb) Yer Değiştirme ve Ortalama Hız Karşılaştırması:\n• Yer değiştirme, hareketlinin ilk konumu ile son konumu arasındaki en kısa yönlü mesafedir.\n• Mert doğrusal yolda ilerlediği için yer değiştirmesi 240 metredir.\n• Selim ise dairesel pistte tam bir tur atıp başladığı başlangıç çizgisine geri döndüğü için ilk ve son konumu aynıdır; bu nedenle yer değiştirmesi 0 metredir.\n• Ortalama Hız = Yer Değiştirme / Zaman formülüne göre (0 m / 80 s) Selim'in ortalama hızı 0 m/s olur.",
    "rubric": [
        ("Selim'in süratinin 5 m/s olarak işlem basamaklarıyla doğru hesaplanması", 0.5),
        ("Selim'in başladığı noktaya döndüğü için yer değiştirmesinin 0 olması ve hızın 0 çıkması gerekçesi", 0.5)
    ]
}

# =====================================================================
# 2. DİN KÜLTÜRÜ VE AHLAK BİLGİSİ DEDICATED (5 Scenarios - 30 Questions)
# Outcomes: DKAB.6.1.2, DKAB.6.1.3, DKAB.6.1.4, DKAB.6.2.1
# =====================================================================

# --- Senaryo 1 (7 Qs) ---
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.2', 0, 0)] = {
    "contextText": "Vahyin gönderiliş amacı ve aklın rehberliği.",
    "stimulus": "Ayet Meali: 'İnsanlar tek bir ümmetti. Allah, müjdeciler ve uyarıcılar olarak peygamberler gönderdi ve anlaşmazlığa düştükleri konularda insanlar arasında hak ile hükmetsin diye onlarla birlikte hak kitabı indirdi.' (Bakara suresi, 213. ayet)",
    "questionText": "Verilen ayetten hareketle, Allah'ın insanlara peygamberler ve vahiy göndermesinin iki temel amacını yazınız.",
    "solutionExplanation": "İnsanları müjdelemek/uyarmak ve aralarındaki anlaşmazlıkları adaletle çözmek.",
    "modelAnswer": "1. İnsanları doğru davranışlara yönlendirip müjdelemek, yanlış inanç ve kötülüklere karşı uyarmak.\n2. İnsanların kendi başlarına çözemeyecekleri inanç ve adalet konularındaki anlaşmazlıkları vahyin rehberliğinde hak ve adaletle çözmek.",
    "rubric": [("Müjdeleme ve uyarma amacının açıklanması", 0.5), ("Anlaşmazlıkları adaletle giderme amacının açıklanması", 0.5)]
}
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.2', 0, 1)] = {
    "contextText": "Vahyin karanlıktan aydınlığa çıkarma misyonu.",
    "stimulus": "Ayet Meali: 'Elif. Lâm. Râ. Bu, insanları Rablerinin izniyle karanlıklardan aydınlığa, mutlak güç sahibi ve övgüye lâyık olan Allah'ın yoluna çıkarasın diye sana indirdiğimiz bir kitaptır.' (İbrahim suresi, 1. ayet)",
    "questionText": "Ayet-i kerimede geçen 'karanlıklar' ve 'aydınlık' benzetmelerinin neleri temsil ettiğini açıklayınız.",
    "solutionExplanation": "Karanlık: Cehalet, şirk, zulüm ve ahlaksızlık; Aydınlık: Tevhid, ilim, adalet ve güzel ahlak.",
    "modelAnswer": "• Karanlıklar: İnsanı mutsuzluğa sürükleyen bilgisizlik (cehalet), haksızlık, adaletsizlik, putperestlik ve ahlaki çöküntüyü temsil eder.\n• Aydınlık: Vahyin getirdiği Allah'ın birliği inancı (Tevhid), adalet, merhamet, ilim ve insan onurunu koruyan ahlakı temsil eder.",
    "rubric": [("Karanlıklar ifadesinin cehalet/haksızlık anlamıyla açıklanması", 0.5), ("Aydınlık ifadesinin Tevhid/adalet anlamıyla açıklanması", 0.5)]
}
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.2', 0, 2)] = {
    "contextText": "Vahyin ahiret ve ibadetler konusundaki bilgiyi tamamlama rolü.",
    "stimulus": "İnsan aklı çevresindeki düzeni inceleyerek bir Yaratıcının var olduğunu anlayabilir.",
    "questionText": "İnsan aklı bir Yaratıcıyı kavrayabildiği halde, ibadetlerin nasıl yapılacağı ve ölümden sonraki hayat (ahiret) hakkında neden mutlaka vahye ihtiyaç duyar?",
    "solutionExplanation": "Çünkü gayb âlemi ve ibadet şekilleri akılla bilinemez, ancak vahiy yoluyla öğrenilir.",
    "modelAnswer": "İbadetlerin hangi vakitlerde, kaç rekat veya ne şekilde yapılacağı ve ahiret hayatındaki cennet, cehennem, hesap gibi duyu organlarıyla algılanamayan gaybî hakikatler insanın akıl yürütmesiyle bilinemez. Allah bu detayları insanlara sadece vahiy ve peygamberler aracılığıyla bildirmiştir.",
    "rubric": [("İbadet şekillerinin akılla belirlenemeyeceği tespiti", 0.5), ("Ahiret gibi gayb alanlarının yalnızca vahiyle bilinebileceğinin açıklanması", 0.5)]
}
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.3', 0, 0)] = {
    "contextText": "Dört büyük ilahi kitap ve gönderildikleri peygamberler.",
    "stimulus": "İlahi kitaplar, peygamberler aracılığıyla insanlara ulaştırılan kutsal metinlerdir.",
    "questionText": "Dört büyük ilahi kitabı ve bu kitapların gönderildiği peygamberleri eksiksiz eşleştirerek yazınız.",
    "solutionExplanation": "Tevrat - Hz. Musa, Zebur - Hz. Davud, İncil - Hz. İsa, Kur'an-ı Kerim - Hz. Muhammed.",
    "modelAnswer": "1. Tevrat: Hz. Musa (a.s.)\n2. Zebur: Hz. Davud (a.s.)\n3. İncil: Hz. İsa (a.s.)\n4. Kur'an-ı Kerim: Hz. Muhammed (s.a.v.)",
    "rubric": [("Dört ilahi kitabın ve peygamberlerinin hatasız eşleştirilmesi", 1.0)]
}
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.3', 0, 1)] = {
    "contextText": "Kur'an-ı Kerim'in korunmuşluk özelliği.",
    "stimulus": "Ayet Meali: 'Şüphesiz o zikri (Kur'an'ı) biz indirdik; onu koruyacak olan da elbette biziz.' (Hicr suresi, 9. ayet)",
    "questionText": "Verilen ayete göre, Kur'an-ı Kerim'in diğer ilahi kitaplardan ayrılan en temel muhafaza özelliğini ve bunun nasıl sağlandığını açıklayınız.",
    "solutionExplanation": "Kur'an Allah'ın koruması altındadır, tek harfi dahi değişmeden günümüze ulaşmıştır.",
    "modelAnswer": "Kur'an-ı Kerim ilahi koruma altındadır ve vahyedildiği günden bugüne tek bir harfi dahi tahrif edilmeden (değiştirilmeden) aslı gibi korunmuş son ilahi kitaptır. Bu korunma hem vahiy katiplerinin anında yazması hem de yüz binlerce hafız tarafından ezberlenerek nesilden nesile aktarılmasıyla sağlanmıştır.",
    "rubric": [("Tahrif olmadan korunma özelliğinin belirtilmesi", 0.5), ("Yazı ve hafızlık geleneğiyle korunma boyutunun açıklanması", 0.5)]
}
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.4', 0, 0)] = {
    "contextText": "Felak suresinin 1-2. ayetlerinin tefsiri.",
    "stimulus": "Ayet Meali: 'De ki: Yarattığı şeylerin şerrinden sabahın Rabbine sığınırım.' (Felak suresi, 1-2. ayetler)",
    "questionText": "Felak suresinin ilk iki ayetinden hareketle, bir Müslümanın kötülük ve tehlikeler karşısında nasıl bir inanç tutumu sergilemesi gerektiğini açıklayınız.",
    "solutionExplanation": "Her türlü yaratılmışın şerrinden yalnızca her şeyi yaratan ve aydınlığı getiren Allah'a sığınmak gerekir.",
    "modelAnswer": "Müslüman, evrende var olan tüm görünen ve görünmeyen varlıkların kötülüğünden, şerrinden yalnızca sabahın aydınlığını var eden ve her şeye gücü yeten Yüce Allah'a sığınmalıdır. Kötülüklerden korunmanın tek sığınağının Allah olduğuna inanmalı ve O'na tevekkül etmelidir.",
    "rubric": [("Yalnızca Allah'a sığınma inancının belirtilmesi", 0.5), ("Korku ve kötülükler karşısında tevekkül bilincinin açıklanması", 0.5)]
}
G6_DEDICATED[('din_kulturu', 'DKAB.6.2.1', 0, 0)] = {
    "contextText": "Ramazan ayı ve Kur'an'ın indirilişi.",
    "stimulus": "Ayet Meali: 'Ramazan ayı, insanlara yol gösterici, doğrunun ve doğruyu eğriden ayırmanın açık delilleri olarak Kur'an'ın indirildiği aydır...' (Bakara suresi, 185. ayet)",
    "questionText": "Ramazan ayının İslam kültüründe 'Kur'an Ayı' olarak adlandırılmasının nedenini ve bu ayda uygulanan 'mukabele' geleneğinin ne olduğunu açıklayınız.",
    "solutionExplanation": "Kur'an bu ayda indirilmeye başlanmıştır. Mukabele: Bir kişinin okuyup diğerlerinin takip etmesidir.",
    "modelAnswer": "• Neden Kur'an Ayı: Çünkü insanlığa hidayet rehberi olan Kur'an-ı Kerim, Ramazan ayının Kadir Gecesi'nde indirilmeye başlanmıştır.\n• Mukabele Geleneği: Ramazan ayında bir hafızın Kur'an'ı yüksek sesle okuması, dinleyenlerin de Mushaf'tan takip etmesi geleneğidir; temeli Hz. Peygamber ile Cebrail'in karşılıklı Kur'an okumasına dayanır.",
    "rubric": [("Ramazan'da indirilmeye başlanma gerekçesi", 0.5), ("Mukabele geleneğinin tanımı ve anlamı", 0.5)]
}

# --- Senaryo 2 (6 Qs) ---
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.2', 1, 0)] = {
    "contextText": "Vahyin yaratılış gayesini ve dünya-ahiret dengesini bildirmesi.",
    "stimulus": "İnsan 'Ben kimim? Nereden geldim? Niçin yaratıldım ve nereye gideceğim?' gibi varoluşsal soruları sürekli zihninde taşır.",
    "questionText": "Vahyin insanın bu temel varoluş sorularına verdiği cevabı ve hayatına kattığı anlamı açıklayınız.",
    "solutionExplanation": "Vahiy insanın yaratılış amacının Allah'a kulluk ve yeryüzünde adaletle yaşamak olduğunu bildirir.",
    "modelAnswer": "Vahiy, insanın başıboş ve anlamsız yaratılmadığını; Yüce Allah'ın kulu olarak O'nu tanımak, emir ve yasaklarına uyarak yeryüzünü imar ve ıslah etmek üzere imtihan dünyasında bulunduğunu öğretir. Böylece insana hayatın gayesini bildirip ölümün bir yok oluş değil ebedî ahiret hayatının başlangıcı olduğunu gösterir.",
    "rubric": [("İnsanın kulluk ve imtihan gayesinin belirtilmesi", 0.5), ("Ölüm ve ahiret inancıyla hayata katılan anlamın açıklanması", 0.5)]
}
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.2', 1, 1)] = {
    "contextText": "Peygamberlerin tebliğ ve tebyin görevi.",
    "stimulus": "Ayet Meali: 'İnsanlara, kendilerine indirileni açıklayasın ve onlar da düşünüp öğüt alsınlar diye sana da bu Kur'an'ı indirdik.' (Nahl suresi, 44. ayet)",
    "questionText": "Ayetten hareketle, peygamberlerin vahyi sadece insanlara ulaştırmakla (tebliğ) kalmayıp aynı zamanda 'açıklama ve uygulama' (tebyin) görevlerinin olmasının önemini yazınız.",
    "solutionExplanation": "Peygamberler vahyi bizzat yaşayarak somut örnek olmuşlar ve kapalı hükümleri açıklamışlardır.",
    "modelAnswer": "Vahiy genel emirler verir; peygamberler ise bu emirlerin günlük hayatta nasıl uygulanacağını bizzat yaşayarak göstermişlerdir (Örneğin namazın nasıl kılınacağı, orucun nasıl tutulacağı). Eğer peygamberlerin açıklayıcı ve örnek rolü olmasaydı insanlar vahyi kendi anlayışlarına göre farklı uygulayabilir ve birlik bozulurdu.",
    "rubric": [("Peygamberlerin somut model ve örnek olma rolü", 0.5), ("Dini hükümleri açıklama ve ortak anlayış sağlama gerekçesi", 0.5)]
}
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.2', 1, 2)] = {
    "contextText": "Vahyin temel ahlaki ilkeleri yerleştirmesi.",
    "stimulus": "Hz. Peygamber (s.a.v.) bir hadisinde: 'Ben ancak güzel ahlakı tamamlamak için gönderildim.' buyurmuştur.",
    "questionText": "Vahyin ve peygamberlerin bireysel ve toplumsal ahlakı inşa etmede getirdiği 2 temel evrensel ahlak ilkesini yazınız.",
    "solutionExplanation": "Doğruluk/dürüstlük, adalet, emanete riayet, yetim ve yoksulu koruma.",
    "modelAnswer": "1. Doğruluk ve Emanete Riayet: İnsanın sözünde ve işinde doğru olması, emanetlere hıyanet etmemesi.\n2. Adalet ve Merhamet: Güçlünün zayıfı ezmesini engellemek, anne-babaya, yetimlere, yoksullara ve tüm canlılara merhametle muamele etmek.",
    "rubric": [("Birinci ahlaki ilke ve toplumsal boyutunun açıklanması", 0.5), ("İkinci ahlaki ilke ve toplumsal boyutunun açıklanması", 0.5)]
}
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.3', 1, 0)] = {
    "contextText": "Tüm ilahi kitapların ortak tevhid mesajı.",
    "stimulus": "Tarih boyunca farklı toplumlara farklı dillerde ilahi kitaplar gönderilmiştir.",
    "questionText": "Tüm ilahi kitapların inanç esasları açısından vurguladığı en temel ortak mesaj nedir? Açıklayınız.",
    "solutionExplanation": "Tevhid inancı: Allah'ın varlığı, birliği, eşi ve benzeri olmadığı inancı.",
    "modelAnswer": "Tüm ilahi kitapların özündeki değişmeyen ortak mesaj 'Tevhid İnancı'dır; yani evrenin tek bir Yaratıcısı olduğu, Allah'a hiçbir şeyin ortak koşulmaması gerektiği ve yalnız O'na ibadet edilip O'ndan yardım dilenmesidir. Yanı sıra ahiret günü ve hesap verme inancı da hepsinde ortaktır.",
    "rubric": [("Tevhid inancı (Allah'ın birliği) kavramının vurgulanması", 0.6), ("Ahiret veya adalet ortak paydasının açıklanması", 0.4)]
}
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.3', 1, 1)] = {
    "contextText": "Suhuflar (Sayfalar) kavramı ve verildiği peygamberler.",
    "stimulus": "Dört büyük ilahi kitap dışında bazı peygamberlere küçük risaleler şeklinde 'sayfalar' (suhuf) indirilmiştir.",
    "questionText": "Kendilerine suhuf verilen 4 peygamberi ve onlara kaçar sayfa verildiğini yazınız.",
    "solutionExplanation": "Hz. Adem 10, Hz. Şit 50, Hz. İdris 30, Hz. İbrahim 10 sayfa.",
    "modelAnswer": "1. Hz. Âdem (a.s.): 10 sayfa\n2. Hz. Şît (a.s.): 50 sayfa\n3. Hz. İdris (a.s.): 30 sayfa\n4. Hz. İbrahim (a.s.): 10 sayfa (Toplam 100 sayfa)",
    "rubric": [("Dört peygamberin isimlerinin eksiksiz yazılması", 0.5), ("Sayfa sayılarının doğru belirtilmesi", 0.5)]
}
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.4', 1, 0)] = {
    "contextText": "Felak suresindeki gece ve düğümlere üfleyenlerin şerri.",
    "stimulus": "Ayet Meali: 'Karanlığı çöktüğü zaman gecenin şerrinden, düğümlere üfleyen büyücülerin şerrinden...' (Felak suresi, 3-4. ayetler)",
    "questionText": "Felak suresindeki bu ayetlerde Müslümanlara hangi tehlikeler karşısında dikkatli ve uyanık olmaları tavsiye edilmektedir? Açıklayınız.",
    "solutionExplanation": "Karanlıkta gizlenen tehlikeler, kötü niyetli insanların tuzakları ve hileleri.",
    "modelAnswer": "Ayetlerde insanın göremediği ve karanlıkta gizlenen her türlü tehlikeye, yanı sıra insan ilişkilerini bozmaya, yuvaları yıkmaya, hile ve aldatmacayla toplumu zehirlemeye çalışan kötü niyetli kimselerin desiselerine karşı uyanık olunması ve bunlardan yalnızca Allah'a sığınılması gerektiği bildirilir.",
    "rubric": [("Gecenin karanlığındaki tehlikelerin yorumlanması", 0.5), ("İnsan ilişkilerini bozan fitne ve hilelerden Allah'a sığınma vurgusu", 0.5)]
}

# --- Senaryo 3 (5 Qs) ---
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.2', 2, 0)] = {
    "contextText": "Vahyin hidayet ve rahmet kaynağı olması.",
    "stimulus": "Ayet Meali: 'Andolsun biz onlara, inanan bir toplum için bir hidayet ve bir rahmet olarak, bilgiye dayalı şekilde açıkladığımız bir kitap getirdik.' (A'râf suresi, 52. ayet)",
    "questionText": "Verilen ayette geçen 'hidayet' ve 'rahmet' kavramlarının anlamını vahyin insan hayatına etkisi üzerinden açıklayınız.",
    "solutionExplanation": "Hidayet doğru yolu bulmak, rahmet ise Allah'ın şefkat, mağfiret ve esirgeyiciliğidir.",
    "modelAnswer": "• Hidayet: Vahiy insanı batıldan, sapıklıktan ve yanlıştan koruyup hak ve adalet olan doğru yola (Sırat-ı Müstakim) ulaştırır.\n• Rahmet: Allah'ın kullarına olan sonsuz şefkati ve sevgisi gereği vahiy indirerek onları dünya ve ahiret sıkıntılarından koruyup ebedî mutluluğa kavuşturmasıdır.",
    "rubric": [("Hidayet kavramının doğru yol rehberliği olarak açıklanması", 0.5), ("Rahmet kavramının ilahi lütuf ve esirgeme boyutuyla açıklanması", 0.5)]
}
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.2', 2, 1)] = {
    "contextText": "Cahiliye dönemine vahyin getirdiği adalet ve insan hakları.",
    "stimulus": "İslam öncesi Arap yarımadasında güçlüler haklı sayılır, köleler ezilir ve kız çocukları bir utanç kaynağı görülerek diri diri toprağa gömülürdü.",
    "questionText": "Vahyin bu adaletsiz toplum yapısını dönüştürürken getirdiği 2 temel devrim niteliğindeki hükmü açıklayınız.",
    "solutionExplanation": "Kız çocuklarının yaşam hakkı ve insan onuru; soy üstünlüğü yerine takva ve hukuk önünde eşitlik.",
    "modelAnswer": "1. Yaşama Hakkı ve Kadın Onuru: Kız çocuklarının öldürülmesini kesin şekilde yasaklamış; kadınlara ve kız çocuklarına ailede ve toplumda onurlu bir miras ve mülkiyet hakkı tanımıştır.\n2. İnsanların Eşitliği: Kabilecilik ve soy üstünlüğünü kaldırarak üstünlüğün ancak Allah'a saygı ve ahlakta (takva) olduğunu ilan etmiş, kölelere eşit haklar tanımıştır.",
    "rubric": [("Kız çocukları ve yaşama hakkı ilkesi", 0.5), ("Kabilecilik yerine eşitlik ve takva ilkesi", 0.5)]
}
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.3', 2, 0)] = {
    "contextText": "Kur'an-ı Kerim'in parça parça (tedricen) indirilmesinin hikmeti.",
    "stimulus": "Kur'an-ı Kerim diğer bazı kitaplar gibi tek seferde değil, yaklaşık 23 yıllık bir zaman diliminde ayet ayet indirilmiştir.",
    "questionText": "Kur'an-ı Kerim'in 23 yılda parça parça indirilmesinin (tedricîliğin) sağladığı 2 pedagojik ve toplumsal faydayı yazınız.",
    "solutionExplanation": "Kolayca ezberlenmesi, anlaşılması, hükümleri hazmedilerek uygulanması ve ortaya çıkan olaylara çözüm üretmesi.",
    "modelAnswer": "1. Kolayca Ezberlenme ve Anlaşılma: İnsanların ayetleri yavaş yavaş okuyup zihinlerine ve kalplerine sindirmesini, kolayca ezberlemesini sağlamıştır.\n2. Yaşantıya Geçirme Kolaylığı: Eski kökleşmiş kötü alışkanlıkların birdenbire değil, aşama aşama terk edilmesini ve yeni ahlaki hükümlerin hayatla bütünleşmesini sağlamıştır.",
    "rubric": [("Ezberleme ve anlama kolaylığı faydası", 0.5), ("Aşama aşama uygulama ve hayata geçirme faydası", 0.5)]
}
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.3', 2, 1)] = {
    "contextText": "Kur'an-ı Kerim'in Mushaf haline getirilmesi ve çoğaltılması.",
    "stimulus": "Hz. Peygamber'in vefatından sonra Yemâme Savaşı'nda birçok hafız sahabi şehit olmuştur.",
    "questionText": "a) Kur'an-ı Kerim hangi halife döneminde bir araya getirilerek kitap (Mushaf) haline getirilmiştir?\nb) Hangi halife döneminde çoğaltılarak önemli İslam merkezlerine gönderilmiştir?",
    "solutionExplanation": "a) Hz. Ebubekir, b) Hz. Osman.",
    "modelAnswer": "a) Kitap (Mushaf) haline getiren Halife: Hz. Ebubekir (Zeyd b. Sabit başkanlığındaki heyet tarafından).\nb) Çoğaltarak merkezlere gönderen Halife: Hz. Osman (Kıraat farklılıklarını önlemek amacıyla).",
    "rubric": [("Hz. Ebubekir döneminin doğru yazılması", 0.5), ("Hz. Osman döneminin doğru yazılması", 0.5)]
}
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.4', 2, 0)] = {
    "contextText": "Felak suresinin 5. ayetinde 'haset' uyarısı.",
    "stimulus": "Ayet Meali: 'Ve haset ettiği zaman hasetçinin şerrinden sabahın Rabbine sığınırım.' (Felak suresi, 5. ayet)",
    "questionText": "Haset (kıskançlık) kavramını tanımlayınız ve hasedin insanın manevi hayatına ve toplumsal kardeşliğe verdiği zararları açıklayınız.",
    "solutionExplanation": "Haset bir başkasındaki nimeti çekememek ve onun elinden gitmesini istemektir.",
    "modelAnswer": "• Tanım: Haset, başkasında bulunan güzellik, başarı veya nimeti çekemeyip o nimetin onun elinden yok olmasını istemektir.\n• Zararları: Hadiste 'Ateşin odunu yakıp kül ettiği gibi haset de iyilikleri yok eder' buyrulur. Haset, kişinin iç huzurunu bozar, Allah'ın taksimatına itiraza yol açar ve toplumda sevgi, kardeşlik ve güven bağlarını koparır.",
    "rubric": [("Haset kavramının doğru tanımlanması", 0.5), ("Bireysel ve toplumsal zararlarının açıklanması", 0.5)]
}

# --- Senaryo 4 (6 Qs) ---
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.2', 3, 0)] = {
    "contextText": "Vahyin ibadetlerin usul ve esaslarını belirlemesi.",
    "stimulus": "Kur'an-ı Kerim insanlara namaz kılmayı, zekat vermeyi ve adil davranmayı emreder.",
    "questionText": "İnsan sadece 'Ben iyi bir insanım' diyerek neden ibadetlerden muaf olamaz? Vahyin ibadetler aracılığıyla kişiye kazandırdığı ruhsal olgunluğu açıklayınız.",
    "solutionExplanation": "İbadetler inancı canlı tutar, sorumluluk bilincini pekiştirir ve insanı kötülükten alıkoyar.",
    "modelAnswer": "İnanç sadece kalpte kalan soyut bir duygu değildir; ibadetler inancın davranışa dönüşmesini ve her an taze kalmasını sağlar. Kur'an'da bildirilen namaz, oruç gibi ibadetler insanı kibirden arındırır, gün boyu Allah'ın huzurunda olduğu bilincini (ihsan) diri tutarak kötülük yapmaktan alıkoyar.",
    "rubric": [("İnanç ile ibadet arasındaki tamamlayıcı bağın kurulması", 0.5), ("İbadetlerin ahlaki ve manevi olgunlaşma fonksiyonunun açıklanması", 0.5)]
}
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.2', 3, 1)] = {
    "contextText": "Evrensel ahlaki ilkeler: En'âm suresi 151-152. ayetler.",
    "stimulus": "Ayet Meali: '...Anne babaya iyilik edin. Yoksulluk endişesiyle çocuklarınızı öldürmeyin... Kötülüklerin açığına da gizlisine de yaklaşmayın... Ölçü ve tartıyı adaletle tam yapın...' (En'âm suresi, 151-152. ayetler)",
    "questionText": "Verilen ayetlerden hareketle, vahyin ekonomik ve ailevi hayatta emrettiği 2 temel ahlak kuralını çıkarınız.",
    "solutionExplanation": "Ailede anne babaya saygı/çocuk hakları, ekonomide dürüstlük ve ölçüde adalet.",
    "modelAnswer": "1. Ailevi İlke: Anne-babaya sevgi, saygı ve hürmetle davranmak; evlatların yaşam hakkını güvenceye almak.\n2. Ekonomik İlke: Ticarette hile ve tartı sahtekarlığından kaçınmak, ölçü ve tartıda tam bir adalet ve dürüstlük sergilemek.",
    "rubric": [("Aile hayatına yönelik ahlaki ilkenin çıkarılması", 0.5), ("Ekonomik/ticari hayata yönelik dürüstlük ilkesinin çıkarılması", 0.5)]
}
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.2', 3, 2)] = {
    "contextText": "Vahyin aklı ve düşünmeyi teşvik etmesi.",
    "stimulus": "Kur'an-ı Kerim'de birçok ayet 'Akletmez misiniz?', 'Düşünmez misiniz?', 'İbret almaz mısınız?' sorularıyla biter.",
    "questionText": "Kur'an-ı Kerim'in sürekli insan aklına ve düşünmeye hitap etmesinin dini sorumluluk açısından önemini açıklayınız.",
    "solutionExplanation": "İslam'da dinî sorumluluğun ön şartı akıl ve iradedir; körü körüne taklit yasaklanmıştır.",
    "modelAnswer": "İslam dininde insanın vahiyle muhatap ve sorumlu olmasının temel şartı akıl ve irade sahibi olmasıdır. Kur'an, insanların atalarından gördükleri yanlış inançları körü körüne taklit etmesini reddeder; hakikati araştırarak, kainatı gözlemleyerek ve aklını kullanarak bilinçli bir imana ulaşmasını ister.",
    "rubric": [("Akıl ve iradenin sorumluluğun temeli olduğunun belirtilmesi", 0.5), ("Körü körüne taklidin reddedilip bilinçli imanın vurgulanması", 0.5)]
}
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.3', 3, 0)] = {
    "contextText": "İlahi kitapların dili ve hitap alanları.",
    "stimulus": "Geçmiş ilahi kitaplar belirli bir kavme ve zamana gönderilmişken, Kur'an-ı Kerim tüm insanlığa gönderilmiştir.",
    "questionText": "Kur'an-ı Kerim'in 'evrensel bir kitap' olması ne anlama gelir? Geçmiş ilahi kitaplarla karşılaştırarak açıklayınız.",
    "solutionExplanation": "Kur'an sadece bir millete değil kıyamete kadar bütün insanlığa hitap eden son rehberdir.",
    "modelAnswer": "Tevrat veya İncil gibi önceki kutsal kitaplar belirli bir topluluğa (İsrailoğulları) ve belli bir çağa hitap ediyordu. Kur'an-ı Kerim ise hiçbir ırk, bölge veya millet ayrımı gözetmeksizin kıyamete kadar gelecek tüm insanlığa gönderilmiş evrensel ve son ilahi kitaptır; hükümleri çağlar üstüdür.",
    "rubric": [("Geçmiş kitapların yerel/bölgesel vasfının belirtilmesi", 0.5), ("Kur'an'ın tüm insanlığı kapsayan evrensel niteliğinin açıklanması", 0.5)]
}
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.3', 3, 1)] = {
    "contextText": "Vahiy katipleri ve Kur'an'ın yazılı kaydedilmesi.",
    "stimulus": "Hz. Muhammed (s.a.v.) kendisine inen ayetleri anında ezberler ve vahiy katiplerine yazdırırdı.",
    "questionText": "Vahiy katipliği kurumunun Kur'an ayetlerinin günümüze sıhhatle ve güvenle ulaşmasındaki rolünü açıklayınız.",
    "solutionExplanation": "Ayetlerin iner inmez deri, kemik, taş ve hurma yapraklarına anında yazıya geçirilmesini sağlamıştır.",
    "modelAnswer": "Hz. Peygamber vahiy geldiğinde Hz. Ali, Zeyd b. Sabit gibi vahiy katiplerini çağırarak ayetleri anında deri, taş ve parşömenlere yazdırmış; ayrıca yazılan metni katibe tekrar okutarak kontrol etmiştir. Bu titiz kayıt sistemi, Kur'an'ın sözlü unutulmalara karşı ilk andan itibaren belgelenmesini ve korunmasını sağlamıştır.",
    "rubric": [("Vahiy katiplerinin anında kayıt altına alma işlevi", 0.5), ("Yazılanların kontrol edilerek güvenliğin sağlanması", 0.5)]
}
G6_DEDICATED[('din_kulturu', 'DKAB.6.2.1', 3, 0)] = {
    "contextText": "Ramazan orucunun bireysel ve toplumsal kazanımları.",
    "stimulus": "Ramazan ayında imsak vaktinden akşam ezanına kadar yeme içmeden uzak durularak oruç ibadeti yerine getirilir.",
    "questionText": "Oruç ibadetinin insanda geliştirdiği sabır, nefis terbiyesi ve yoksullara karşı empati duygularını açıklayınız.",
    "solutionExplanation": "Açlık ve susuzluk nimetlerin kıymetini öğretir, sabır kazandırır, ihtiyaç sahiplerini hissettirir.",
    "modelAnswer": "• Bireysel Fayda (Sabır ve İrade): İnsan gün boyu helal olan nimetlerden bile iradesiyle uzak durarak nefsini terbiye eder, zorluklara karşı direnç ve sabır kazanır.\n• Toplumsal Fayda (Empati ve Yardımlaşma): Açlık ve susuzluğu bizzat tadan varlıklı bireyler, yoksul ve kimsesizlerin çektiği sıkıntıları yürekten hisseder; bu da zekat, fitre ve iftar ikramlarıyla toplumsal dayanışmayı zirveye taşır.",
    "rubric": [("Sabır ve irade eğitimi boyutunun açıklanması", 0.5), ("Empati ve toplumsal dayanışma boyutunun açıklanması", 0.5)]
}

# --- Senaryo 5 (6 Qs) ---
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.2', 4, 0)] = {
    "contextText": "Vahyin nefis terbiyesi ve manevi arınma hedefi.",
    "stimulus": "Ayet Meali: 'Nefsini kötülüklerden arındıran kurtuluşa ermiştir. Onu kötülüklere gömen ise ziyan etmiştir.' (Şems suresi, 9-10. ayetler)",
    "questionText": "Verilen ayete göre, vahyin temel gayelerinden biri olan 'nefis tezkiyesi' (manevi arınma) kavramını ve kurtuluşla ilişkisini açıklayınız.",
    "solutionExplanation": "İnsanın kalbini kibir, yalan, kin gibi manevi hastalıklardan temizlemesi kurtuluşun şartıdır.",
    "modelAnswer": "Vahiy, insanın sadece bedensel ihtiyaçlarını değil ruhsal ve kalbî arınmasını da hedefler. Nefis tezkiyesi; kişinin iç dünyasını kibir, cimrilik, kıskançlık ve öfkeden temizleyip tevazu, cömertlik, doğruluk ve merhametle süslemesidir. Gerçek kurtuluş ve huzur ancak bu ahlaki arınmayla mümkündür.",
    "rubric": [("Nefis tezkiyesi ve kötü huylardan arınma tanımı", 0.5), ("Ahlaki arınmanın dünya ve ahiret kurtuluşuna etkisi", 0.5)]
}
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.2', 4, 1)] = {
    "contextText": "Peygamberlerin en güzel model (üsve-i hasene) olması.",
    "stimulus": "Ayet Meali: 'Andolsun ki, Allah'ın Elçisinde sizin için; Allah'a ve ahiret gününe kavuşmayı uman ve Allah'ı çok anan kimseler için güzel bir örnek vardır.' (Ahzâb suresi, 21. ayet)",
    "questionText": "Ayetten hareketle, İslam inancında 'üsve-i hasene' kavramının anlamını ve Hz. Peygamber'in hayatından bir örnekle açıklayınız.",
    "solutionExplanation": "Üsve-i hasene en güzel örnek demektir; peygamberin adaleti, affediciliği ve mütevazılığı.",
    "modelAnswer": "• Anlamı: 'Üsve-i Hasene', her alanda örnek alınabilecek en mükemmel, kusursuz ve güzel ahlak timsali rehber demektir.\n• Örnek: Hz. Peygamber'in Medine'de adaletle hükmetmesi, kendisine zulmeden Mekkelileri af buyurması veya ev işlerinde ailesine yardım eden mütevazı tavrı bu model şahsiyetin canlı örneğidir.",
    "rubric": [("Üsve-i hasene kavramının tanımı", 0.5), ("Hz. Peygamber'in hayatından somut bir model davranış örneği", 0.5)]
}
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.2', 4, 2)] = {
    "contextText": "Vahyin toplumsal kardeşlik ve barış prensibi.",
    "stimulus": "Ayet Meali: 'Müminler ancak kardeştirler. Öyleyse kardeşlerinizin arasını düzeltin ve Allah'a itaatsizlikten sakının ki merhamet göresiniz.' (Hucurât suresi, 10. ayet)",
    "questionText": "Vahyin getirdiği 'kardeşlik' anlayışının kan bağına dayalı kabilecilikten farkını ve toplumsal barışa katkısını yazınız.",
    "solutionExplanation": "İslam kardeşliği soy ve ırka değil ortak inanç ve adalete dayanır; toplumda kin ve düşmanlığı bitirir.",
    "modelAnswer": "İslam'dan önce kardeşlik sadece aynı kabileye ve kan bağına mensubiyetle sınırlıydı. Vahiy ise tüm inananları hiçbir ırk, renk ve soy ayrımı gözetmeksizin manevi kardeş ilan etmiştir. Aralarında bir anlaşmazlık çıktığında adaletle barışı sağlamayı emrederek toplumsal fitne ve ayrımcılığı kökten engellemiştir.",
    "rubric": [("Kabilecilik ve kan bağı yerine inanç kardeşliği farkı", 0.5), ("Toplumsal barış ve adalet katkısı", 0.5)]
}
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.3', 4, 0)] = {
    "contextText": "Kur'an-ı Kerim'in dili ve hitap ettiği muhatap kitlesi.",
    "stimulus": "Ayet Meali: 'Biz her peygamberi ancak kendi kavminin diliyle gönderdik ki onlara (emirleri) iyice açıklasın...' (İbrahim suresi, 4. ayet)",
    "questionText": "Kur'an-ı Kerim'in Arapça olarak indirilmesinin hikmetini ve ilk muhatapların vahyi anlamasındaki rolünü açıklayınız.",
    "solutionExplanation": "İlk tebliğ edilen toplumun Arapça konuşması nedeniyle mesajın net ve apaçık anlaşılması içindir.",
    "modelAnswer": "Yüce Allah, mesajının ilk muhataplar tarafından doğru, eksiksiz ve derinlemesine anlaşılması için Kur'an'ı Hz. Peygamber'in ve kavminin konuştuğu Arapça diliyle indirmiştir. Eğer yabancı bir dilde inseydi toplum 'Biz bunu anlamıyoruz' diyerek itiraz edebilir ve tebliğ zorlaşırdı.",
    "rubric": [("Mesajın muhataplarca net anlaşılması gerekçesi", 0.5), ("Tebliğin ilk aşamasında dil birliğinin önemi", 0.5)]
}
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.3', 4, 1)] = {
    "contextText": "Kur'an-ı Kerim'in iç düzeni: Ayet, Sure ve Cüz.",
    "stimulus": "Kur'an-ı Kerim belirli yapısal bölümlerden oluşan ilahi bir kitaptır.",
    "questionText": "Kur'an-ı Kerim'in yapısal birimleri olan Ayet, Sure ve Cüz kavramlarını tanımlayarak sayısal bilgilerini yazınız.",
    "solutionExplanation": "Ayet (tümceler, 6236 civarı), Sure (bölümler, 114 adet), Cüz (20 sayfalık 30 parça).",
    "modelAnswer": "1. Âyet: Kur'an'ın durak işaretleriyle birbirinden ayrılan her bir cümlesi veya ifadesidir (Yaklaşık 6236 ayet vardır).\n2. Sûre: Ayetlerin oluşturduğu, başında besmele bulunan bağımsız bölümlerdir (114 sure vardır; en uzunu Bakara, en kısası Kevser'dir).\n3. Cüz: Kur'an'ın kolay okunması ve ezberlenmesi için ayrılmış her 20 sayfalık bölümüdür (Toplam 30 cüz vardır).",
    "rubric": [("Ayet, Sure ve Cüz tanımlarının eksiksiz yapılması", 0.6), ("Sayısal verilerin (6236 ayet, 114 sure, 30 cüz) doğru belirtilmesi", 0.4)]
}
G6_DEDICATED[('din_kulturu', 'DKAB.6.1.3', 4, 2)] = {
    "contextText": "İlahi kitaplara imanın önemi (Âmene'r-Rasûlü).",
    "stimulus": "Ayet Meali: '...Peygamber, Rabbinden kendisine indirilene iman etti, müminler de. Her biri; Allah'a, meleklerine, kitaplarına ve peygamberlerine iman ettiler. Peygamberleri arasında hiçbir ayrım yapmayız...' (Bakara suresi, 285. ayet)",
    "questionText": "İslam inanç esaslarında kitaplara imanın yerini ve Müslümanların önceki ilahi kitaplara ve peygamberlere bakış açısını açıklayınız.",
    "solutionExplanation": "Kitaplara iman imanın şartlarındandır; Müslümanlar peygamberler ve asılları ilahi olan kitaplar arasında ayrım yapmaz.",
    "modelAnswer": "Kitaplara iman, İslam'ın 6 inanç esasından biridir. Bir Müslüman sadece Kur'an'a değil, Yüce Allah'ın geçmişte Hz. Musa'ya, Hz. İsa'ya ve diğer peygamberlere gönderdiği ilahi kitapların asıllarına ve tüm peygamberlere ayrım yapmaksızın inanır. Bu inanç, dinler tarihindeki peygamberlik zincirini bir bütün olarak kabul etmektir.",
    "rubric": [("Kitaplara imanın inanç esaslarındaki yerinin belirtilmesi", 0.5), ("Geçmiş kitapların ve peygamberlerin bütününe inanma ilkesi", 0.5)]
}


# =====================================================================
# 3. İNGİLİZCE DEDICATED (5 Scenarios - 31 Questions)
# Outcomes: ENG.6.1.R2, ENG.6.1.R3, ENG.6.1.V1, ENG.6.1.G1, ENG.6.1.W3, ENG.6.1.W4
# =====================================================================

# --- Senaryo 1 (5 Qs) ---
G6_DEDICATED[('ingilizce', 'ENG.6.1.R2', 0, 0)] = {
    "contextText": "School club notice board schedule.",
    "stimulus": "NOTICE BOARD - ATATÜRK MIDDLE SCHOOL:\n• Chess Club: Monday at 15:30 (Room 102)\n• Music Club: Wednesday at 16:00 (Hall B)\n• Drama Club: Friday at 15:45 (Main Theatre)",
    "questionText": "Quickly scan the notice board and answer the questions:\na) Which club meets on Wednesday?\nb) What time does the Chess Club start?",
    "solutionExplanation": "a) Music Club, b) At 15:30.",
    "modelAnswer": "a) The Music Club meets on Wednesday.\nb) The Chess Club starts at 15:30.",
    "rubric": [("Music Club identified correctly", 0.5), ("15:30 time identified correctly", 0.5)]
}
G6_DEDICATED[('ingilizce', 'ENG.6.1.R3', 0, 0)] = {
    "contextText": "Zeynep's daily school routine and library responsibility.",
    "stimulus": "Text: 'Hello! I am Zeynep. I am an active 6th-grade student. I wake up at 07:00 every morning. My school starts at 08:30 and finishes at 15:10. On Tuesdays and Thursdays, I work as the school library monitor. I help our teacher put the books on the shelves and keep the library quiet.'",
    "questionText": "Read the text carefully and answer:\na) What is Zeynep's special duty at school on Tuesdays?\nb) How does she help the teacher in the library?",
    "solutionExplanation": "a) Library monitor, b) She puts books on shelves and keeps the room quiet.",
    "modelAnswer": "a) She is the school library monitor (she works in the library).\nb) She helps the teacher put books on the shelves and keep the library quiet.",
    "rubric": [("Zeynep's duty identified correctly", 0.5), ("Two actions in the library described correctly", 0.5)]
}
G6_DEDICATED[('ingilizce', 'ENG.6.1.V1', 0, 0)] = {
    "contextText": "School responsibility and places vocabulary.",
    "stimulus": "Vocabulary bank: [canteen, timetable, class president, library, whiteboard]",
    "questionText": "Choose the correct words from the box to complete the sentences:\n1. Ahmet is our ....................; he helps our teacher and takes attendance.\n2. We buy sandwiches and water from the school .................... during the lunch break.\n3. Students borrow story books from the ....................",
    "solutionExplanation": "1. class president, 2. canteen, 3. library.",
    "modelAnswer": "1. class president\n2. canteen\n3. library",
    "rubric": [("Three vocabulary blanks filled accurately", 1.0)]
}
G6_DEDICATED[('ingilizce', 'ENG.6.1.G1', 0, 0)] = {
    "contextText": "Simple Present Tense third-person affirmative and negative forms.",
    "stimulus": "Grammar task on school habits.",
    "questionText": "Complete the sentences with the correct Simple Present forms of the verbs in brackets:\na) Selim .................... (walk) to school every morning, but he .................... (not / take) the bus.\nb) Our teacher always .................... (arrive) at school at 08:15.",
    "solutionExplanation": "a) walks, does not take / doesn't take; b) arrives.",
    "modelAnswer": "a) Selim walks to school every morning, but he does not take (doesn't take) the bus.\nb) Our teacher always arrives at school at 08:15.",
    "rubric": [("Third-person verb endings (-s) correct", 0.5), ("Negative form (does not take) correct", 0.5)]
}
G6_DEDICATED[('ingilizce', 'ENG.6.1.W3', 0, 0)] = {
    "contextText": "Guided writing based on a model: Morning school routine.",
    "stimulus": "Model text: 'I wake up at 07:15. I brush my teeth and have breakfast. Then, I leave home at 08:00 for school.'",
    "questionText": "Write 3 sentences about your own morning routine before school, following the example model.",
    "solutionExplanation": "3 personalized sentences with correct present tense verbs and times.",
    "modelAnswer": "Sample Answer:\n1. I get up at 07:00 every weekday.\n2. I wash my hands and eat eggs and cheese for breakfast.\n3. I pack my school bag and leave home at 08:10.",
    "rubric": [("Three grammatically correct sentences produced", 0.6), ("Relevance to morning school routine", 0.4)]
}

# --- Senaryo 2 (5 Qs) ---
G6_DEDICATED[('ingilizce', 'ENG.6.1.R2', 1, 0)] = {
    "contextText": "Republic Day celebration programme poster.",
    "stimulus": "POSTER: 29TH OCTOBER REPUBLIC DAY CEREMONY\n• Place: School Garden\n• 09:30: National Anthem & Moment of Silence\n• 10:00: Principal's Speech\n• 10:20: Student Poetry Recitation (Defne)\n• 10:45: Folk Dance Show (6th Grade Team)",
    "questionText": "Skim the ceremony poster and write:\na) What time does the Folk Dance show start?\nb) Who recites a poem at 10:20?",
    "solutionExplanation": "a) At 10:45, b) Defne.",
    "modelAnswer": "a) The Folk Dance show starts at 10:45.\nb) Defne recites a poem at 10:20.",
    "rubric": [("Start time identified accurately", 0.5), ("Defne identified accurately", 0.5)]
}
G6_DEDICATED[('ingilizce', 'ENG.6.1.R3', 1, 0)] = {
    "contextText": "Celebrating national festivals at school.",
    "stimulus": "Text: 'Every year, our school celebrates Republic Day with great enthusiasm. Before the festival, students decorate the corridors and windows with Turkish flags, balloons, and red-and-white ribbons. On October 29th, the school choir sings patriotic anthems. Our parents also come to watch our performances.'",
    "questionText": "Read the text carefully and answer:\na) How do the students decorate their school before Republic Day?\nb) Who joins the school to watch the student performances?",
    "solutionExplanation": "a) With Turkish flags, balloons and ribbons, b) Their parents.",
    "modelAnswer": "a) They decorate corridors and windows with Turkish flags, balloons, and red-and-white ribbons.\nb) Their parents come to watch the performances.",
    "rubric": [("Decoration details answered completely", 0.5), ("Parents attending identified correctly", 0.5)]
}
G6_DEDICATED[('ingilizce', 'ENG.6.1.V1', 1, 0)] = {
    "contextText": "Celebration and ceremony vocabulary.",
    "stimulus": "Definitions:\n1. A formal public event with performances: C _ _ _ _ _ _ Y\n2. To say a poem aloud from memory: R _ _ _ _ E\n3. Red, white and patterned cloth representing a country: F _ _ G",
    "questionText": "Complete the missing letters of the celebration words:\n1. C _ _ _ _ _ _ Y\n2. R _ _ _ _ E (a poem)\n3. F _ _ G",
    "solutionExplanation": "1. CEREMONY, 2. RECITE, 3. FLAG.",
    "modelAnswer": "1. CEREMONY\n2. RECITE\n3. FLAG",
    "rubric": [("All three words correctly completed", 1.0)]
}
G6_DEDICATED[('ingilizce', 'ENG.6.1.G1', 1, 0)] = {
    "contextText": "Adverbs of frequency in school routines.",
    "stimulus": "Adverbs: always (100%), usually (80%), sometimes (50%), never (0%).",
    "questionText": "Rewrite the sentences putting the adverb of frequency in the correct position:\na) We celebrate national days at school. (always)\nb) Can is late for the morning assembly. (never)",
    "solutionExplanation": "a) We always celebrate..., b) Can is never late...",
    "modelAnswer": "a) We always celebrate national days at school.\nb) Can is never late for the morning assembly.",
    "rubric": [("Adverb placed between subject and main verb in (a)", 0.5), ("Adverb placed after the verb 'to be' in (b)", 0.5)]
}
G6_DEDICATED[('ingilizce', 'ENG.6.1.W4', 1, 0)] = {
    "contextText": "Independent writing: Celebrating a national day.",
    "stimulus": "National celebrations at Turkish schools (e.g., 29th October Republic Day or 23rd April Children's Day).",
    "questionText": "Write 3 full sentences describing how you and your classmates celebrate a national day at school (mention decorations, singing, or activities).",
    "solutionExplanation": "3 descriptive sentences about national day celebration.",
    "modelAnswer": "Sample Sentences:\n1. We decorate our classroom with Turkish flags and paper flowers.\n2. We sing the national anthem proudly in the school garden.\n3. Our folk dance group wears traditional costumes and performs on stage.",
    "rubric": [("Three grammatically correct sentences", 0.6), ("Accurate national celebration context", 0.4)]
}

# --- Senaryo 3 (6 Qs) ---
G6_DEDICATED[('ingilizce', 'ENG.6.1.R2', 2, 0)] = {
    "contextText": "Eco-School club weekly duties timetable.",
    "stimulus": "ECO-SCHOOL TIMETABLE:\n• Monday: Collect waste paper & cardboard (Mert & Ali)\n• Wednesday: Water indoor plants in classrooms (Seda)\n• Friday: Recycle plastic bottles and glass (Burak & Elif)",
    "questionText": "Skim the timetable quickly and answer:\na) Which day do students recycle plastic bottles?\nb) Who is responsible for watering the indoor plants?",
    "solutionExplanation": "a) Friday, b) Seda.",
    "modelAnswer": "a) On Friday (students recycle plastic bottles).\nb) Seda is responsible for watering the indoor plants.",
    "rubric": [("Friday identified correctly", 0.5), ("Seda identified correctly", 0.5)]
}
G6_DEDICATED[('ingilizce', 'ENG.6.1.R2', 2, 1)] = {
    "contextText": "Classroom rules infographic.",
    "stimulus": "CLASSROOM RULES POSTER:\n1. Raise your hand before speaking.\n2. Keep your desk tidy and clean.\n3. Do not run in the corridors.\n4. Listen to your teacher carefully.",
    "questionText": "Quickly scan the poster and identify:\na) What must you do before speaking?\nb) Where should you NOT run?",
    "solutionExplanation": "a) Raise your hand, b) In the corridors.",
    "modelAnswer": "a) Raise your hand before speaking.\nb) You should not run in the corridors.",
    "rubric": [("Raise hand rule found correctly", 0.5), ("Corridors location identified correctly", 0.5)]
}
G6_DEDICATED[('ingilizce', 'ENG.6.1.R3', 2, 0)] = {
    "contextText": "Detailed reading: Green School recycling project.",
    "stimulus": "Text: 'Our school has an Environmental Protection Club. Twenty students are members. Every month, we collect over 60 kilograms of waste paper and 200 plastic bottles. We sell the paper to recycling factories and buy seedlings for our school garden with that money. It makes our school greener and teaches us eco-responsibility.'",
    "questionText": "Read the text carefully and answer:\na) How much waste paper do the club members collect each month?\nb) What does the club buy with the recycling money?",
    "solutionExplanation": "a) Over 60 kg, b) Seedlings for the school garden.",
    "modelAnswer": "a) They collect over 60 kilograms of waste paper each month.\nb) They buy seedlings (young plants/trees) for their school garden.",
    "rubric": [("60 kg figure stated correctly", 0.5), ("Buying seedlings for school garden explained", 0.5)]
}
G6_DEDICATED[('ingilizce', 'ENG.6.1.V1', 2, 0)] = {
    "contextText": "School routines and environmental vocabulary.",
    "stimulus": "Match verbs with nouns: [attend, recycle, raise, follow]\nNouns: [hand, rules, rubbish, clubs]",
    "questionText": "Match the verbs with the correct nouns to make meaningful school collocations:\n1. attend -> ....................\n2. recycle -> ....................\n3. raise your -> ....................\n4. follow -> ....................",
    "solutionExplanation": "1. clubs, 2. rubbish (or plastic/paper), 3. hand, 4. rules.",
    "modelAnswer": "1. attend -> clubs\n2. recycle -> rubbish (plastic/bottles)\n3. raise your -> hand\n4. follow -> rules",
    "rubric": [("All four collocations correctly matched", 1.0)]
}
G6_DEDICATED[('ingilizce', 'ENG.6.1.G1', 2, 0)] = {
    "contextText": "Simple Present question forms (Wh- questions and Do/Does).",
    "stimulus": "Forming questions in the Simple Present Tense.",
    "questionText": "Make questions using the given words:\na) (what time / your first lesson / start?)\nb) (your best friend / walk / to school?)",
    "solutionExplanation": "a) What time does your first lesson start? b) Does your best friend walk to school?",
    "modelAnswer": "a) What time does your first lesson start?\nb) Does your best friend walk to school?",
    "rubric": [("Question (a) with does and correct word order", 0.5), ("Question (b) with does and base verb", 0.5)]
}
G6_DEDICATED[('ingilizce', 'ENG.6.1.W3', 2, 0)] = {
    "contextText": "Guided writing based on model: Classroom duties.",
    "stimulus": "Model text: 'At our school, I am the board cleaner on Fridays. I erase the board after every lesson and keep the markers organized.'",
    "questionText": "Write 3 sentences about a school duty or responsibility you have (or would like to have), following the given model.",
    "solutionExplanation": "3 sentences detailing a student duty at school.",
    "modelAnswer": "Sample Sentences:\n1. I am responsible for watering the flowers in our classroom on Mondays.\n2. I check if the windows are closed before we leave the school.\n3. Doing my duty makes me feel proud and responsible.",
    "rubric": [("Three coherent sentences aligned with model", 0.6), ("Grammar and vocabulary accuracy", 0.4)]
}

# --- Senaryo 4 (7 Qs) ---
G6_DEDICATED[('ingilizce', 'ENG.6.1.R2', 3, 0)] = {
    "contextText": "Sports hall after-school training timetable.",
    "stimulus": "SPORTS SCHEDULE - GYM A:\n• Basketball: Tuesday & Thursday (15:30 - 17:00)\n• Volleyball: Wednesday (15:30 - 16:45)\n• Table Tennis: Friday (15:00 - 16:30)",
    "questionText": "Skim the sports timetable and answer:\na) Which sport has training on Wednesday?\nb) On which days does the Basketball team practice?",
    "solutionExplanation": "a) Volleyball, b) Tuesday and Thursday.",
    "modelAnswer": "a) Volleyball has training on Wednesday.\nb) The Basketball team practices on Tuesday and Thursday.",
    "rubric": [("Volleyball identified accurately", 0.5), ("Tuesday and Thursday identified accurately", 0.5)]
}
G6_DEDICATED[('ingilizce', 'ENG.6.1.R3', 3, 0)] = {
    "contextText": "Emir's after-school routine and hobbies.",
    "stimulus": "Text: 'Hi, my name is Emir. When the bell rings at 15:20, my classes finish. I walk home with my buddy Kerem because my house is only 10 minutes away from school. After arriving home, I drink a glass of milk and rest for 30 minutes. Then, I do my homework from 16:30 to 18:00. I never watch TV before finishing my assignments.'",
    "questionText": "Read the text carefully and answer:\na) Why does Emir walk home instead of taking a bus?\nb) What does Emir do between 16:30 and 18:00?",
    "solutionExplanation": "a) Because his house is only 10 minutes away, b) He does his homework.",
    "modelAnswer": "a) Because his house is very close to school (only 10 minutes away).\nb) He does his homework from 16:30 to 18:00.",
    "rubric": [("House proximity reason stated correctly", 0.5), ("Homework activity stated correctly", 0.5)]
}
G6_DEDICATED[('ingilizce', 'ENG.6.1.R3', 3, 1)] = {
    "contextText": "Emir's evening habit vs weekend routine.",
    "stimulus": "Text: 'In the evenings, Emir reads a book with his father. On Saturdays, he wakes up later, at 09:00, and attends the swimming club in the city sports complex.'",
    "questionText": "According to the text, what does Emir do on Saturday mornings that is different from weekdays?",
    "solutionExplanation": "He wakes up later at 09:00 and attends the swimming club.",
    "modelAnswer": "On Saturday mornings, Emir wakes up later (at 09:00) and attends the swimming club at the city sports complex.",
    "rubric": [("Later wake up time mentioned", 0.5), ("Swimming club activity mentioned", 0.5)]
}
G6_DEDICATED[('ingilizce', 'ENG.6.1.V1', 3, 0)] = {
    "contextText": "Daily after-school activities collocations.",
    "stimulus": "Collocations bank: [take a nap, do homework, surf the net, ride a bicycle]",
    "questionText": "Match the phrases with their meanings:\n1. Resting and sleeping for a short time during the day: ....................\n2. Completing school tasks given by teachers: ....................\n3. Browsing websites on a tablet or computer: ....................",
    "solutionExplanation": "1. take a nap, 2. do homework, 3. surf the net.",
    "modelAnswer": "1. take a nap\n2. do homework\n3. surf the net",
    "rubric": [("Three daily activity phrases matched correctly", 1.0)]
}
G6_DEDICATED[('ingilizce', 'ENG.6.1.V1', 3, 1)] = {
    "contextText": "School subjects and learning materials.",
    "stimulus": "Subjects: [Physical Education, Art, Science, Geography]",
    "questionText": "Write the correct school subject for each description:\na) In this class, we learn about countries, mountains and maps: ....................\nb) In this class, we wear sneakers and play sports in the gym: ....................\nc) In this class, we do interesting experiments in the lab: ....................",
    "solutionExplanation": "a) Geography, b) Physical Education (P.E.), c) Science.",
    "modelAnswer": "a) Geography\nb) Physical Education (P.E.)\nc) Science",
    "rubric": [("Three school subjects named correctly", 1.0)]
}
G6_DEDICATED[('ingilizce', 'ENG.6.1.G1', 3, 0)] = {
    "contextText": "Negative forms and short answers in Simple Present.",
    "stimulus": "Grammar transformation task.",
    "questionText": "a) Change the sentence into a negative sentence:\n'Murat plays computer games after school.' -> ........................................................\nb) Complete the short answer:\n'Does your sister like Maths?' -> 'No, she ....................'",
    "solutionExplanation": "a) Murat does not play computer games after school. b) doesn't / does not.",
    "modelAnswer": "a) Murat does not play (doesn't play) computer games after school.\nb) No, she doesn't (does not).",
    "rubric": [("Negative sentence accurately formed with does not play", 0.5), ("Short negative answer correct", 0.5)]
}
G6_DEDICATED[('ingilizce', 'ENG.6.1.W4', 3, 0)] = {
    "contextText": "Independent writing: Your after-school routine.",
    "stimulus": "Writing prompt: Describe your afternoon and evening routine after leaving school.",
    "questionText": "Write 3 complete sentences about your after-school routine between 15:30 and 20:00 (mention your arrival home, snack/meal, and study time).",
    "solutionExplanation": "3 complete sentences with time markers and personal activities.",
    "modelAnswer": "Sample Sentences:\n1. I arrive home at 16:00 and have fruit and milk.\n2. I do my English and Science homework from 16:45 to 18:00.\n3. After dinner, I read a book for thirty minutes and play chess with my brother.",
    "rubric": [("Three grammatically correct sentences", 0.6), ("Accurate use of time and routine vocabulary", 0.4)]
}

# --- Senaryo 5 (8 Qs) ---
G6_DEDICATED[('ingilizce', 'ENG.6.1.R2', 4, 0)] = {
    "contextText": "Penpal email: Dennis from London writes to Kerem.",
    "stimulus": "EMAIL SNIPPET:\n'From: Dennis (London)\nTo: Kerem (Ankara)\nDear Kerem, in England our school starts at 09:00 and ends at 15:30. We wear a navy blue blazer and tie. My favorite lesson is History because I love learning about ancient castles. What is your school like?'",
    "questionText": "Skim the email quickly and answer:\na) What time does Dennis's school start in London?\nb) What is Dennis's favorite school subject?",
    "solutionExplanation": "a) At 09:00, b) History.",
    "modelAnswer": "a) His school starts at 09:00.\nb) His favorite subject is History.",
    "rubric": [("09:00 starting time identified", 0.5), ("History identified as favourite subject", 0.5)]
}
G6_DEDICATED[('ingilizce', 'ENG.6.1.R2', 4, 1)] = {
    "contextText": "School club frequency brochure.",
    "stimulus": "CLUBS FREQUENCY:\n• Coding Club: Twice a week (Tuesday & Thursday)\n• Art Club: Once a week (Wednesday)\n• Chess Club: Every day during lunch break",
    "questionText": "Scan the brochure and answer:\na) How often does the Coding Club meet?\nb) When does the Chess Club meet?",
    "solutionExplanation": "a) Twice a week, b) Every day during lunch break.",
    "modelAnswer": "a) The Coding Club meets twice a week.\nb) The Chess Club meets every day during lunch break.",
    "rubric": [("Twice a week frequency noted", 0.5), ("Daily lunch break timing noted", 0.5)]
}
G6_DEDICATED[('ingilizce', 'ENG.6.1.R3', 4, 0)] = {
    "contextText": "Dennis compares school lunches and rules.",
    "stimulus": "Text: 'At our school in London, we have a 45-minute lunch break. Most students bring packed lunches from home, including sandwiches, fruit, and juice boxes. However, chewing gum and using mobile phones during lesson hours are strictly forbidden. Teachers give stickers to students who behave politely.'",
    "questionText": "Read the text carefully and answer:\na) What do students usually have in their packed lunches?\nb) Name 2 things that are strictly forbidden at Dennis's school.",
    "solutionExplanation": "a) Sandwiches, fruit and juice boxes; b) Chewing gum and using mobile phones.",
    "modelAnswer": "a) They usually bring sandwiches, fruit, and juice boxes.\nb) Chewing gum and using mobile phones during lesson hours are strictly forbidden.",
    "rubric": [("Packed lunch items mentioned accurately", 0.5), ("Two forbidden actions identified", 0.5)]
}
G6_DEDICATED[('ingilizce', 'ENG.6.1.V1', 4, 0)] = {
    "contextText": "General school facilities and daily items.",
    "stimulus": "Definitions:\n1. A room equipped with computers for programming lessons: I _ _ L _ B\n2. A ring sound that marks the beginning or end of a lesson: B _ _ L\n3. A locker or shelf where students store their textbooks: L _ _ K _ R",
    "questionText": "Find the school words:\n1. I.T. LAB\n2. B _ _ L\n3. L _ _ K _ R",
    "solutionExplanation": "1. IT LAB, 2. BELL, 3. LOCKER.",
    "modelAnswer": "1. IT LAB\n2. BELL\n3. LOCKER",
    "rubric": [("All school words identified accurately", 1.0)]
}
G6_DEDICATED[('ingilizce', 'ENG.6.1.V1', 4, 1)] = {
    "contextText": "Time expressions and frequency phrases.",
    "stimulus": "Expressions: [on weekdays, at the weekend, twice a month, every morning]",
    "questionText": "Fill in the blanks with the correct time expression:\na) I get up early at 07:00 .................... because I have school from Monday to Friday.\nb) We sleep longer and rest .................... because there are no classes on Saturday and Sunday.",
    "solutionExplanation": "a) on weekdays, b) at the weekend.",
    "modelAnswer": "a) on weekdays (every morning)\nb) at the weekend",
    "rubric": [("Two time expressions filled appropriately", 1.0)]
}
G6_DEDICATED[('ingilizce', 'ENG.6.1.G1', 4, 0)] = {
    "contextText": "Simple Present sentences with frequency adverbs and 3rd person singular.",
    "stimulus": "Sentence building with prompts.",
    "questionText": "Write correct full sentences using the given cues:\na) (Gizem / usually / do / her English homework / before dinner)\nb) (We / often / visit / the city library / on Saturdays)",
    "solutionExplanation": "a) Gizem usually does her English homework before dinner. b) We often visit the city library on Saturdays.",
    "modelAnswer": "a) Gizem usually does her English homework before dinner.\nb) We often visit the city library on Saturdays.",
    "rubric": [("Third person 'does' and adverb position correct in (a)", 0.5), ("Plural verb and adverb position correct in (b)", 0.5)]
}
G6_DEDICATED[('ingilizce', 'ENG.6.1.G1', 4, 1)] = {
    "contextText": "Wh- question words: Where, When, Who, What time.",
    "stimulus": "Match question words with answers.",
    "questionText": "Complete the questions with 'Where', 'When', or 'What time':\n1. '.................... do you eat lunch?' -> 'At 12:30.'\n2. '.................... do you play basketball?' -> 'In the school gym.'\n3. '.................... do you celebrate your school festival?' -> 'In May.'",
    "solutionExplanation": "1. What time, 2. Where, 3. When.",
    "modelAnswer": "1. What time\n2. Where\n3. When",
    "rubric": [("Three question words chosen correctly", 1.0)]
}
G6_DEDICATED[('ingilizce', 'ENG.6.1.W4', 4, 0)] = {
    "contextText": "Penpal letter writing: Introducing your school life.",
    "stimulus": "Writing prompt: Write a short email reply to Dennis in London introducing yourself and your school in Turkey.",
    "questionText": "Write a 4-sentence introductory email to your penpal Dennis. Include:\n- Your name and grade\n- School start and finish times\n- Your favourite school subject\n- One after-school activity you do.",
    "solutionExplanation": "4 coherent sentences covering all required details.",
    "modelAnswer": "Sample Email:\nDear Dennis,\nMy name is Kerem and I am a 6th-grade student in Ankara. My school starts at 08:30 and finishes at 15:15 every day. My favorite school subject is Science because we do fun experiments. After school, I attend the basketball club on Tuesdays and Thursdays. Write back soon!\nKerem",
    "rubric": [("All 4 required details covered", 0.6), ("Grammatical accuracy and friendly tone", 0.4)]
}

print("All Grade 6 Din, İngilizce, and Fen missing questions successfully registered!")
