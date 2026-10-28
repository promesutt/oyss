# -*- coding: utf-8 -*-
import json
from build_grade8_inkilap_distinct import G8_DEDICATED

# =====================================================================
# GRADE 8 DİN KÜLTÜRÜ VE AHLAK BİLGİSİ DEDICATED (5 Scenarios - 38 Questions)
# =====================================================================

# --- Senaryo 1 (9 Qs) ---
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.1', 0, 0)] = {
    "contextText": "Kader ve kaza kavramları ve evrendeki ölçü.",
    "stimulus": "Ayet Meali: 'Şüphesiz biz her şeyi bir ölçüye (kadere) göre yarattık.' (Kamer suresi, 49. ayet)",
    "questionText": "Kader ve kaza kavramlarını tanımlayarak, verilen ayetten hareketle evrendeki düzen ve kader inancı arasındaki ilişkiyi açıklayınız.",
    "solutionExplanation": "Kader: Allah'ın her şeyi önceden takdir etmesi ve planlaması. Kaza: Zamanı gelince yaratılması.",
    "modelAnswer": "• Kader: Yüce Allah'ın ezelden ebede kadar olacak her şeyi, tüm kanun ve ölçüleriyle önceden bilip planlaması ve takdir etmesidir.\n• Kaza: Allah tarafından takdir edilen bu olayların vakti ve şartları gelince gerçekleşmesi ve yaratılmasıdır.\n• Ayetle İlişkisi: Kamer suresindeki ayet, kâinatta hiçbir şeyin rastlantı ve başıboş olmadığını; gezegenlerin yörüngelerinden atomun yapısına kadar her şeyin kusursuz bir matematiksel denge ve ölçü (kader) ile var edildiğini gösterir.",
    "rubric": [("Kader ve kaza kavramlarının doğru tanımlanması", 0.5), ("Ayetle evrendeki nizam ve denge ilişkisinin kurulması", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.2', 0, 0)] = {
    "contextText": "Külli irade ve cüzi irade kavramları.",
    "stimulus": "İslam inancına göre insanın iradesi ile Allah'ın mutlak iradesi arasında temel bir sınır vardır.",
    "questionText": "'Külli irade' ile 'Cüzi irade' kavramlarını açıklayınız ve insanın cüzi iradesiyle seçtiği fiillerden neden sorumlu olduğunu belirtiniz.",
    "solutionExplanation": "Külli irade: Allah'ın sınırsız iradesi. Cüzi irade: İnsana verilen sınırlı seçme özgürlüğü. İnsan tercih hakkı olduğu için sorumludur.",
    "modelAnswer": "• Külli İrade: Yüce Allah'ın her şeyi kuşatan, sonsuz, sınırsız ve mutlak iradesidir. İnsanın anne-babası, ırkı, doğum yeri ve ölüm vakti gibi alanlar külli iradeye girer.\n• Cüzi İrade: Allah tarafından insana verilen, iki ya da daha fazla seçenek arasında serbestçe karar verebilen sınırlı iradedir.\n• Sorumluluk: İnsan iyiyi ve kötüyü akıl ve cüzi iradesiyle bizzat kendisi seçtiği için yaptıklarından dünyada ve ahirette sorumludur.",
    "rubric": [("Külli ve cüzi irade ayrımının yapılması", 0.5), ("Cüzi irade ve ahlaki sorumluluk ilişkisinin açıklanması", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.3', 0, 0)] = {
    "contextText": "Kaderle ilgili kavramlar: Tevekkül.",
    "stimulus": "Bir adam Hz. Peygamber'e gelerek: 'Ey Allah'ın Resulü! Devemi bağlayıp da mı tevekkül edeyim, yoksa bağlamadan mı?' diye sormuştur.",
    "questionText": "Hz. Peygamber'in bu adama verdiği cevabı yazınız ve İslam'da doğru tevekkül anlayışının aşamalarını açıklayınız.",
    "solutionExplanation": "Hz. Peygamber: 'Önce deveni bağla, sonra Allah'a tevekkül et!' buyurmuştur.",
    "modelAnswer": "• Hz. Peygamber'in Cevabı: 'Önce deveni sağlamca bağla, sonra Allah'a tevekkül et!'\n• Doğru Tevekkül Anlayışı: Tevekkül, hiçbir iş yapmadan tembelce oturup sonucu Allah'tan beklemek değildir. Bir hedefe ulaşmak için insan aklının ve fennin gerektirdiği bütün tedbirleri eksiksiz almalı, elinden gelen tüm gayreti gösterdikten sonra gönül huzuruyla sonucu Allah'a bırakıp O'na güvenmelidir.",
    "rubric": [("Hz. Peygamber'in hadisinin doğru aktarılması", 0.5), ("Gerekli tedbirleri aldıktan sonra Allah'a güvenme tanımı", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.3', 0, 1)] = {
    "contextText": "Kaderle ilgili kavramlar: Rızık ve Emek.",
    "stimulus": "Ayet Meali: 'Gerçekten insan için kendi emeğinden (çalışmasından) başkası yoktur.' (Necm suresi, 39. ayet)",
    "questionText": "İslam dininin rızık kazanmada 'emek ve helal kazanç' konusundaki ilkelerini verilen ayet ışığında açıklayınız.",
    "solutionExplanation": "Rızkı veren Allah'tır ancak rızkı aramak ve kazanmak için insanın meşru yollardan alın teri dökmesi şarttır.",
    "modelAnswer": "İslam'da rızık gökten zahmetsizce inmez. Yüce Allah rızkı yaratıcıdır (Rezzâk); ancak insanın bu rızkı elde etmesi için meşru, helal ve dürüst yollarla alın teri dökmesi, çalışıp çabalaması şart koşulmuştur. Başkalarının sırtından geçinmek, dilencilik yapmak veya kumar gibi haksız kazanç yolları reddedilmiş, en hayırlı rızkın kişinin kendi el emeğiyle kazandığı rızık olduğu bildirilmiştir.",
    "rubric": [("Rızkın emek ve alın teriyle kazanılması zorunluluğu", 0.5), ("Helal kazanç ve haksız yolların reddi vurgusu", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.4', 0, 0)] = {
    "contextText": "Toplumdaki yanlış kader anlayışları: 'Kader mahkumu'.",
    "stimulus": "Kendi isteğiyle suç işleyip cezaevine düşen birinin 'Ben ne yapayım, kader mahkumuyum!' diyerek suçu kadere yüklemesi.",
    "questionText": "Bu tutumun İslam'ın irade ve sorumluluk inancıyla neden çeliştiğini gerekçeleriyle sorgulayınız.",
    "solutionExplanation": "İnsan iradesiyle suçu seçmiştir; kötülüğü kadere fatura etmek sorumluluktan kaçmaktır.",
    "modelAnswer": "Bu yaklaşım bütünüyle yanlıştır ve İslam'ın kader inancına terstir. Çünkü Yüce Allah insana akıl, vicdan ve cüzi irade vermiştir; kanunlara uymayı ya da suç işlemeyi tercih eden bireyin bizzat kendisidir. Kendi hür iradesiyle yaptığı bir yanlışı ve suçu kadere yükleyerek 'kader mahkumuyum' demek, işlediği günahın ve suçun sorumluluğundan haksızca kaçma çabasıdır.",
    "rubric": [("Kişinin hür iradesiyle suçu seçtiğinin belirtilmesi", 0.5), ("Kadere suç atmanın sorumluluktan kaçma olduğunun açıklanması", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.4', 0, 1)] = {
    "contextText": "Toplumdaki yanlış tevekkül anlayışı: Tedbirsizlik.",
    "stimulus": "Deprem bölgesinde çürük ve denetimsiz bina yapıp bina yıkılınca 'Ne yapalım, kaderimiz böyleymiş, ecel gelmiş' diyen müteahhidin tutumu.",
    "questionText": "Bu yanlış anlayışı 'fiziksel yasalar' ve 'insan sorumluluğu' açısından eleştiriniz.",
    "solutionExplanation": "Deprem fiziksel bir yasadır; çürük bina yapmak kul hakkı ve ihmaldir, bu ihmal kadere bağlanamaz.",
    "modelAnswer": "Yer kabuğunun kırılması ve deprem, Allah'ın evrene koyduğu değişmez 'fiziksel yasa'dır. İnsanın görevi bu fiziksel yasalara uygun, sağlam zeminlerde demiri ve betonu eksiksiz binalar inşa etmektir. Malzemeden çalarak çürük bina yapan kimse, kendi ihmalkârlığı ve hırsı yüzünden insanların canına kıymıştır. Bu cinayet ve ihmali kadere fatura etmek dini tahrif etmektir ve ağır bir vebaldir.",
    "rubric": [("Fiziksel yasalara uygun hareket etme zorunluluğu", 0.5), ("İhmalkarlık ve kul hakkının kadere yüklenemeyeceğinin vurgulanması", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.5', 0, 0)] = {
    "contextText": "Hz. Musa'nın (a.s.) hayatı ve Firavun ile mücadelesi.",
    "stimulus": "Hz. Musa, Mısır'da İsrailoğullarını köleleştiren ve ilahlık taslayan Firavun'a karşı hak dini tebliğ etmekle görevlendirilmiştir.",
    "questionText": "Yüce Allah'ın Hz. Musa ve kardeşi Hz. Harun'u Firavun'a gönderirken 'Ona yumuşak söz (kavl-i leyyin) söyleyin, belki öğüt alır' buyurmasının tebliğ ahlakı açısından önemini açıklayınız.",
    "solutionExplanation": "Hakkı anlatırken en zalim yöneticiye karşı bile nezaket, sabır ve ikna edici tatlı dil kullanılmalıdır.",
    "modelAnswer": "Bu ilahi emir, İslam tebliğinde muhatap ne kadar kibirli, zalim veya inkârcı olursa olsun hakkı tebliğ eden kimsenin kaba, kırıcı ve öfkeli olmaması gerektiğini öğretir. İnsanları doğru yola davet ederken 'kavl-i leyyin' yani yumuşak, ikna edici, nezaketli ve hikmetli bir dil kullanmak, kalplerin hakikate ısınmasını sağlayan en temel ahlak kuralıdır.",
    "rubric": [("Kavl-i leyyin (yumuşak söz) ilkesinin açıklanması", 0.5), ("Tebliğde nezaket ve sabır ahlakının vurgulanması", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.6', 0, 0)] = {
    "contextText": "Ayet el-Kürsi'nin mesajı ve Allah'ın sıfatları.",
    "stimulus": "Ayet el-Kürsi (Bakara suresi 255. ayet), tevhid inancının ve Allah'ın yüce kudretinin en kapsamlı anlatıldığı ayettir.",
    "questionText": "Ayet el-Kürsi'de geçen 'el-Hayy' ve 'el-Kayyûm' esmalarının anlamlarını yazarak bu ayetin ana mesajını açıklayınız.",
    "solutionExplanation": "el-Hayy: Diri olan, hayatın kaynağı. el-Kayyûm: Bütün varlığı yöneten ve ayakta tutan. Ana mesaj: Allah'ın mutlak hakimiyeti ve tevhid.",
    "modelAnswer": "• el-Hayy: Daima diri olan, ezeli ve ebedi hayat sahibi, tüm canlılara hayat veren demektir.\n• el-Kayyûm: Gökleri, yeri ve tüm mahlukatı her an kudretiyle ayakta tutan, varlığını sürdüren ve idare eden demektir.\n• Ana Mesaj: Kâinatın mutlak hâkimi ve sahibi yalnızca Yüce Allah'tır; O'nun ilmi ve kürsüsü bütün gökleri ve yeri kuşatmıştır, O uyumaz ve yorulmaz.",
    "rubric": [("Hayy ve Kayyûm esmalarının doğru anlamları", 0.5), ("Ayet el-Kürsi'nin tevhid ve mutlak kudret ana mesajı", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.2.1', 0, 0)] = {
    "contextText": "İslam'da paylaşma ve zekât ibadeti.",
    "stimulus": "Zekât, dinen zengin sayılan Müslümanların yılda bir kez mallarının belirli bir oranını ihtiyaç sahiplerine vermesidir.",
    "questionText": "Zekât ibadetinin zengin ile fakir arasındaki kıskançlık ve kin duygularını nasıl giderdiğini ve toplumsal barışa katkısını açıklayınız.",
    "solutionExplanation": "Fakirin zengine olan kin ve hasedini sevgiye dönüştürür; zenginin kalbindeki cimriliği temizler, sosyal adalet kurar.",
    "modelAnswer": "Zekât, toplumdaki ekonomik uçurumları kapatan manevi bir köprüdür. Fakirin varlıklı insanlara karşı duyabileceği haset, kıskançlık ve öfkeyi; sevgi, hürmet ve minnettarlığa dönüştürür. Zengine ise malın gerçek sahibinin Allah olduğunu hatırlatarak kalbini cimrilikten arındırır. Böylece toplumda sınıfsal çatışmalar engellenir, kardeşlik ve toplumsal adalet tesis edilir.",
    "rubric": [("Fakirin hasedini sevgiye dönüştürme boyutu", 0.5), ("Zenginin cimriliğini arındırma ve toplumsal barış katkısı", 0.5)]
}

# --- Senaryo 2 (8 Qs) ---
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.2', 1, 0)] = {
    "contextText": "İnsanın sorumluluğu ve irade hürriyeti.",
    "stimulus": "Ayet Meali: 'Kim doğru yolu seçerse bunu ancak kendi iyiliği için seçmiş olur; kim de saparsa ancak kendi aleyhine sapmış olur...' (İsrâ suresi, 15. ayet)",
    "questionText": "Ayetten hareketle, insanın dünyadaki tercihleri ile ahiretteki hesabı arasındaki doğrudan bağı açıklayınız.",
    "solutionExplanation": "İnsan seçimlerinde özgür bırakılmıştır; bu yüzden cennet veya cehennem kendi amellerinin karşılığıdır.",
    "modelAnswer": "İslam'da ceza ya da mükafat ancak özgür iradeyle yapılan seçimlerin sonucudur. Ayet-i kerime, insanın iyi ya da kötü tercihlerinde tamamen hür olduğunu, hiç kimsenin zorla günaha sürüklenmediğini belirtir. Dolayısıyla ahirette görülecek hesabın ve karşılığın tamamen insanın kendi cüzi iradesiyle yaptığı eylemlerin adil bir sonucu olduğunu ortaya koyar.",
    "rubric": [("Özgür seçim hakkının vurgulanması", 0.5), ("Ahiret karşılığının kendi amellerinin sonucu olduğu gerekçesi", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.2', 1, 1)] = {
    "contextText": "Akıl ve dini sorumluluk ilişkisi.",
    "stimulus": "Hz. Peygamber (s.a.v.) bir hadisinde: 'Üç kişiden sorumluluk kaldırılmıştır: Akli dengesi yerinde olmayandan, uyanıncaya kadar uyuyandan ve ergenlik çağına gelinceye kadar çocuktan.' buyurmuştur.",
    "questionText": "Bu hadisten hareketle İslam'da bir insanın dinî emir ve yasaklardan sorumlu (mükellef) olmasının 2 temel ön şartını yazınız.",
    "solutionExplanation": "1. Akıl sağlığının yerinde olması, 2. Ergenlik (bülûğ) çağına girmiş olması.",
    "modelAnswer": "1. Akıl Sağlığı: Doğruyu yanlıştan ayırt edebilecek zihinsel muhakeme yeteneğine (akil) sahip olmak.\n2. Ergenlik ve İrade (Bülûğ Çağı): Bireyin kendi kararlarını alabilecek bilinç ve ergenlik olgunluğuna ulaşmış olması.",
    "rubric": [("Akıl sağlığı şartının belirtilmesi", 0.5), ("Ergenlik ve irade çağı şartının belirtilmesi", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.3', 1, 0)] = {
    "contextText": "Kaderle ilgili kavramlar: Ömür ve Ecel.",
    "stimulus": "Ayet Meali: 'Her can ölümü tadacaktır... Her milletin bir eceli vardır. Ecelleri geldiğinde ne bir an erteleyebilirler ne de öne alabilirler.' (Âl-i İmrân ve A'râf sureleri)",
    "questionText": "'Ömür' ve 'Ecel' kavramlarını tanımlayarak, ecelin değişmezliği karşısında insanın hayatını nasıl değerlendirmesi gerektiğini açıklayınız.",
    "solutionExplanation": "Ömür: Doğumdan ölüme kadar geçen süre. Ecel: Hayatın bittiği takdir edilmiş an.",
    "modelAnswer": "• Ömür: İnsanın doğumundan ölüm anına kadar geçen sınırlı yaşam süresidir.\n• Ecel: Allah'ın belirlediği bu yaşam süresinin sona erdiği ve ölümün gerçekleştiği andır.\n• Hayatın Değerlendirilmesi: Ecelin vakti gizlidir ve vakti geldiğinde asla ertelenemez; bu nedenle Müslüman, her an ölebileceğini bilerek zamanını faydalı ilim, ibadet, ahlak ve insanlığa hizmetle değerlendirmelidir.",
    "rubric": [("Ömür ve ecel tanımlarının doğru yapılması", 0.5), ("Zamanı ve hayatı bilinçli değerlendirme gerekliliği", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.3', 1, 1)] = {
    "contextText": "Kaderle ilgili kavramlar: Sağlık ve Hastalık.",
    "stimulus": "Hz. Peygamber: 'Ey Allah'ın kulları! Tedavi olunuz; çünkü Allah yarattığı her hastalığın şifasını da yaratmıştır.' buyurmuştur.",
    "questionText": "Hastalanan bir kimsenin doktora gitmeyip 'Kaderimde iyileşmek varsa iyileşirim' demesi hadise göre neden yanlıştır? Açıklayınız.",
    "solutionExplanation": "Tedavi olmak fiili bir duadır ve sünnettir; şifa aramak kaderin bir parçasıdır.",
    "modelAnswer": "Bu davranış İslam'ın tevekkül ve kader anlayışına aykırıdır. Hastalık da şifa da Allah'ın takdiriyle evrene koyduğu biyolojik yasalar çerçevesindedir. Yüce Allah şifayı tıbbın, ilaçların ve tedavinin içine yerleştirmiştir. Tedavi olmayı reddetmek kendi canını tehlikeye atmaktır ve Peygamber Efendimizin 'Tedavi olunuz' emrine karşı gelmektir.",
    "rubric": [("Biyolojik yasalara uygun tedavi olma zorunluluğu", 0.5), ("Hadise dayalı şifa arama bilincinin açıklanması", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.4', 1, 0)] = {
    "contextText": "Yanlış kader anlayışı: Tembellik ve Rızık.",
    "stimulus": "Hz. Ömer, camide ibadet bahanesiyle oturup çalışmayan ve 'Biz Allah'a tevekkül edenleriz' diyen bir gruba 'Siz tevekkül edenler değil, başkasının sırtından geçinen tembellersiniz! Gökyüzü altın veya gümüş yağdırmaz!' diyerek onları azarlamıştır.",
    "questionText": "Hz. Ömer'in bu tarihi uyarısından hareketle İslam'ın çalışma ve tevekkül felsefesini açıklayınız.",
    "solutionExplanation": "Çalışmadan rızık beklemek tembelliktir; gerçek tevekkül toprağa tohumu ekip yağmuru Allah'tan beklemektir.",
    "modelAnswer": "Hz. Ömer'in uyarısı; ibadet kisvesi altında tembelliği ve miskinliği meşrulaştıran zihniyeti mahkûm etmiştir. İslam'da gerçek tevekkül; tıpkı bir çiftçinin önce tarlayı sürüp tohumu ekmesi, sulaması ve ardından bereketi Allah'tan istemesi gibidir. Sebeplere sarılmadan, çalışıp üretmeden 'Ben kadere teslim oldum' demek dini istismar etmektir.",
    "rubric": [("Hz. Ömer'in olayının analiz edilmesi", 0.5), ("Çalışma ve sebeplere sarılma zorunluluğunun açıklanması", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.4', 1, 1)] = {
    "contextText": "Yanlış kader anlayışı: 'Alın yazım böyleymiş'.",
    "stimulus": "Sınava hiç çalışmayıp başarısız olan bir öğrencinin 'Ne yapayım, kaderimde kazanmak yokmuş' diyerek başarısızlığını kadere yüklemesi.",
    "questionText": "Bu öğrencinin kader anlayışındaki hatayı 'Emek - Başarı' ilişkisi çerçevesinde düzeltiniz.",
    "solutionExplanation": "Başarı çalışmanın sonucudur; emek vermeden başarısızlığı kadere yüklemek hatadır.",
    "modelAnswer": "Öğrenci büyük bir yanılgı içindedir. Necm suresinde 'İnsan için ancak çalıştığının karşılığı vardır' buyrulur. Allah'ın kader yasasına göre başarı, düzenli çalışmanın, gayretin ve emeğin bir sonucudur. Çalışma sorumluluğunu yerine getirmeyen birinin tembelliğini 'kaderim böyleymiş' diyerek kadere fatura etmesi kabul edilemez bir mazerettir.",
    "rubric": [("Emek vermeden kaderi suçlamanın eleştirisi", 0.5), ("Necm suresi ve çalışma-başarı yasası ilişkisi", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.5', 1, 0)] = {
    "contextText": "Hz. Musa'nın (a.s.) Kızıldeniz mucizesi ve Firavun'un helakı.",
    "stimulus": "Firavun ordusuyla İsrailoğullarını Kızıldeniz kıyısında sıkıştırdığında Hz. Musa asasını denize vurmuş ve deniz ikiye yarılmıştır.",
    "questionText": "Bu olayda Hz. Musa'nın halkına 'Korkmayın, Rabbim muhakkak benimle beraberdir, bana yol gösterecektir' diyerek sergilediği sarsılmaz tevekkül ve teslimiyeti açıklayınız.",
    "solutionExplanation": "En çaresiz anda bile ümitsizliğe kapılmayıp Allah'a güvenmek.",
    "modelAnswer": "Önlerinde deniz, arkalarında zalim Firavun'un zırhlı ordusu varken İsrailoğulları 'Yakaladık, mahvolduk!' diye feryat etmiştir. Ancak Hz. Musa hiçbir panik veya tereddüt göstermeden Yüce Allah'a mutlak bir güven (tevekkül) duymuş ve Allah'ın kendilerini asla yalnız bırakmayacağına inanmıştır. Bu olay, inanan bir insanın en zor ve imkânsız şartlarda dahi ümidini yitirmeden Allah'a teslim olmasının zirve örneğidir.",
    "rubric": [("Hz. Musa'nın sarsılmaz teslimiyet ve tevekkülünün açıklanması", 0.5), ("Zor anlarda ümitsizliğe kapılmama dersinin vurgulanması", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.2.1', 1, 0)] = {
    "contextText": "Sadaka-i Cariye kavramı.",
    "stimulus": "Hadis-i Şerif: 'İnsan ölünce üç şey dışında ameli kesilir: Sadaka-i cariye, faydalanılan ilim ve kendisine dua eden hayırlı bir evlat.'",
    "questionText": "'Sadaka-i Cariye' kavramını tanımlayarak günümüzden 2 somut sadaka-i cariye örneği yazınız.",
    "solutionExplanation": "Kişi öldükten sonra da sevabı devam eden kalıcı hayırlar: Okul, köprü, çeşme, hastane, ağaç dikmek.",
    "modelAnswer": "• Tanım: Sadaka-i Cariye, kişinin vefatından sonra da insanların faydalanmaya devam ettiği ve sevabı kıyamete kadar amel defterine yazılan kesintisiz, kalıcı hayır ve iyiliklerdir.\n• Örnek 1: İnsanların ve canlıların su ihtiyacını karşılayan bir çeşme, kuyu veya su şebekesi yaptırmak.\n• Örnek 2: Gelecek nesillerin eğitim göreceği bir okul, kütüphane veya hastane inşa etmek (ya da meyve veren ağaçlar dikmek).",
    "rubric": [("Sadaka-i cariyenin tanımının eksiksiz yapılması", 0.5), ("İki somut ve kalıcı hayır örneğinin verilmesi", 0.5)]
}

# --- Senaryo 3 (6 Qs) ---
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.2', 2, 0)] = {
    "contextText": "İnsanın ilmi ve sorumluluğu.",
    "stimulus": "Ayet Meali: 'Hakkında bilgin olmayan şeyin ardına düşme; çünkü kulak, göz ve kalp, bunların hepsi ondan sorumludur.' (İsrâ suresi, 36. ayet)",
    "questionText": "Verilen ayetin insanın duyu organlarını ve bilgisini kullanma ahlakı konusundaki uyarısını açıklayınız.",
    "solutionExplanation": "İnsan duyduğu ve gördüğü her şeyden sorumludur; dedikodu, iftira ve asılsız bilgilerin peşine düşmemelidir.",
    "modelAnswer": "Ayet-i kerime, insanın zihinsel ve duyusal yeteneklerini sorumsuzca kullanamayacağını hatırlatır. Kulak, göz ve akıl gibi nimetler insana hakikati aramak ve iyilik üretmek için verilmiştir. Doğruluğu kesin olmayan dedikoduların, iftiraların ve suizanların peşinden gitmek büyük bir günahtır; insan bilmediği bir iddiayı yaymaktan ve araştırmadan hüküm vermekten ahirette sorguya çekilecektir.",
    "rubric": [("Duyu organlarının ahlaki sorumluluğunun belirtilmesi", 0.5), ("Asılsız bilgilerin peşine düşmeme uyarısının açıklanması", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.2', 2, 1)] = {
    "contextText": "İyilik ve kötülüğü seçme özgürlüğü.",
    "stimulus": "Ayet Meali: 'Şüphesiz biz ona doğru yolu gösterdik; ister şükredici olsun ister nankör.' (İnsân suresi, 3. ayet)",
    "questionText": "Ayetten hareketle insanın imtihan dünyasındaki konumunu ve irade hürriyetini açıklayınız.",
    "solutionExplanation": "Allah yolu göstermiştir; şükretmek ya da nankörlük etmek insanın kendi seçimidir.",
    "modelAnswer": "Yüce Allah vahiy ve peygamberler göndererek doğru yolu apaçık göstermiştir. Ancak insanı bu yola girmeye zorlamamış, seçim hakkını kendi hür iradesine bırakmıştır. Kişi dilerse şükredip itaat eder, dilerse nankörlük edip isyanı seçer. İmtihan dünyasının varlık sebebi işte bu özgür iradeyle yapılan bilinçli tercihtir.",
    "rubric": [("Hür irade ve seçme serbestliğinin vurgulanması", 0.5), ("İmtihan dünyasının mantığıyla bağ kurulması", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.3', 2, 0)] = {
    "contextText": "Kaderle ilgili kavramlar: Başarı ve Başarısızlık.",
    "stimulus": "Bir esnaf iş yerini zamanında açar, müşterilerine dürüst davranır, kaliteli mal satar ve büyük kâr elde eder.",
    "questionText": "Bu esnafın başarısını 'kendi üstün zekâsına' bağlayıp kibirlenmesinin ve Allah'ın lütfunu unutmasının kader inancı açısından sakıncasını Karun kıssasıyla açıklayınız.",
    "solutionExplanation": "Karun servetini 'kendi bilgimle kazandım' diyerek helak olmuştur; başarıda emek kadar Allah'ın lütfu ve rızkı da unutulmamalıdır.",
    "modelAnswer": "İslam'da başarı çalışmanın meyvesidir ancak elde edilen nimetler karşısında kibirlenmek büyük bir günahtır. Tıpkı Kur'an'da anlatılan Karun'un 'Bu servet bana bendeki bilgi sayesinde verildi' diyerek şımarması ve yerin dibine batırılması gibi; insan ne kadar başarılı olursa olsun kendisine o aklı, sağlığı ve imkânı verenin Yüce Allah olduğunu bilip şükretmeli ve tevazu göstermelidir.",
    "rubric": [("Kibir ve kendi nefsine pay çıkarma eleştirisi", 0.5), ("Karun kıssası ve şükür/tevazu bilinciyle açıklanması", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.3', 2, 1)] = {
    "contextText": "Kaderle ilgili kavramlar: Ecel ve Hayatın Kıymeti.",
    "stimulus": "Hz. Peygamber: 'İki nimet vardır ki insanların çoğu bunların kıymetini bilmekte aldanmıştır: Sağlık ve boş vakit.' buyurmuştur.",
    "questionText": "Hadisten hareketle insanın ömür sermayesini değerlendirirken sağlık ve zaman bilincine nasıl yaklaşması gerektiğini yazınız.",
    "solutionExplanation": "Sağlık ve gençlik geçicidir; ecel gelmeden önce bu iki nimet hayırlı işlerde kullanılmalıdır.",
    "modelAnswer": "İnsana bahşedilen en büyük iki ilahi lütuf sağlık ve zamandır (boş vakit). İnsanlar genelde gençlik ve sağlık ellerindeyken ömrün hiç bitmeyeceğini sanırlar. Oysa ecel ansızın gelir ve kaybedilen bir saniyeyi dahi geri getirmek imkânsızdır. Hadis, insanın sağlığını zararlı maddelerden korumasını ve zamanını tembellikle tüketmeyip ibadet, ahlak ve faydalı işlerle doldurmasını emreder.",
    "rubric": [("Sağlık ve boş vaktin kıymetinin açıklanması", 0.5), ("Ömrü faydalı amellerle değerlendirme gerekliliği", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.4', 2, 0)] = {
    "contextText": "Yanlış kader anlayışı: 'Nasibimde ne varsa o gelir'.",
    "stimulus": "'Rızkımı veren Hüda'dır, kula minnet eylemem' deyip tarlasını sürmeyen ve tohum atmayan bir çiftçinin tutumu.",
    "questionText": "Bu hatalı anlayışı sünnetullah (Allah'ın evrendeki kanunları) çerçevesinde çürütünüz.",
    "solutionExplanation": "Allah'ın sünnetine göre sebeplere yapışmadan sonuç alınamaz; tohum ekmeden hasat beklemek cehalettir.",
    "modelAnswer": "Yüce Allah'ın evrene koyduğu değişmez kanunlara 'Sünnetullah' denir. Sünnetullaha göre sonuçlar sebeplere bağlanmıştır. Çiftçinin mahsul alabilmesi için toprağı işlemesi, gübrelemesi ve tohum ekmesi gerekir. Sebepleri yerine getirmeden 'nasibimde varsa çıkar' demek Allah'ın tabiata koyduğu kanunlara meydan okumaktır ve kaderi yanlış anlamaktır.",
    "rubric": [("Sünnetullah ve sebep-sonuç ilişkisinin açıklanması", 0.5), ("Tohum ekmeden mahsul bekleme cehaletinin çürütülmesi", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.6', 2, 0)] = {
    "contextText": "Ayet el-Kürsi'nin fazileti ve tevhidi boyutu.",
    "stimulus": "'Allah, O'ndan başka ilah yoktur; O diridir, her şeyin varlığı O'na bağlıdır ve O'na dayanır... O'nun kürsüsü bütün gökleri ve yeri kucaklamıştır.' (Ayet el-Kürsi)",
    "questionText": "Ayet el-Kürsi'nin Müslümanlara kazandırdığı 'korkulardan emin olma ve yalnız Allah'a sığınma' bilincini açıklayınız.",
    "solutionExplanation": "Bütün evrenin ve güçlerin üzerinde mutlak hâkim Allah'tır; O'na sığınan hiçbir güçten korkmaz.",
    "modelAnswer": "Ayet el-Kürsi, yerdeki ve gökteki tüm kudretin, mülkün ve idarenin yalnızca Allah'a ait olduğunu ilan eder. O'nun izni olmadan hiç kimse bir başkasına zarar veremez ve şefaat edemez. Bu hakikati kavrayan bir Müslüman, sahte güçlerden, batıl inançlardan ve korkulardan kurtularak ruhsal bir özgürlüğe kavuşur ve her an kendisini koruyan Yüce Yaratıcıya sığınarak derin bir iç huzuru yaşar.",
    "rubric": [("Mutlak kudretin yalnızca Allah'a ait olduğunun kavranması", 0.5), ("Korkulardan arınma ve ruhsal huzur kazanma boyutu", 0.5)]
}

# --- Senaryo 4 (8 Qs) ---
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.1', 3, 0)] = {
    "contextText": "Evrensel yasalar: Fiziksel, Biyolojik ve Toplumsal yasalar.",
    "stimulus": "Yüce Allah'ın evrendeki düzeni sağlamak için koyduğu kanunlar (Sünnetullah) üçe ayrılır: Fiziksel yasalar, Biyolojik yasalar ve Toplumsal yasalar.",
    "questionText": "Bu üç yasa türüne Kur'an-ı Kerim'den veya tabiattan birer somut örnek veriniz.",
    "solutionExplanation": "Fiziksel: Suyun kaldırma kuvveti / yerçekimi. Biyolojik: Fotosentez / canlının döllenmesi. Toplumsal: Adaletin toplumu ayakta tutması / zulmün çöküş getirmesi.",
    "modelAnswer": "1. Fiziksel Yasa Örneği: Suyun 100°C'de kaynaması, yerçekimi kuvveti ve gemilerin suda batmadan yüzmesi (suyun kaldırma kuvveti).\n2. Biyolojik Yasa Örneği: İnsanın anne karnındaki embriyo evrelerinden gelişmesi, bitkilerin fotosentez yapması ve kuşların uçmasını sağlayan kanat anatomisi.\n3. Toplumsal Yasa Örneği: Adaletin ve dürüstlüğün olduğu toplumların yükselmesi, haksızlık ve zulmün yaygınlaştığı toplumların ise çöküp yok olması.",
    "rubric": [("Fiziksel yasa örneğinin doğruluğu", 0.34), ("Biyolojik yasa örneğinin doğruluğu", 0.33), ("Toplumsal yasa örneğinin doğruluğu", 0.33)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.2', 3, 0)] = {
    "contextText": "Toplumsal yasa ve ahlak ilişkisi.",
    "stimulus": "Ayet Meali: 'Bir toplum kendi durumunu değiştirmedikçe Allah onların durumunu değiştirmez.' (Ra'd suresi, 11. ayet)",
    "questionText": "Verilen ayetin toplumsal yasalar ve bireylerin ahlaki sorumluluğu açısından verdiği mesajı açıklayınız.",
    "solutionExplanation": "Toplumların huzur ve refahı bireylerin ahlak ve adalet gayretine bağlıdır; toplum düzelmeden durum düzelmez.",
    "modelAnswer": "Bu ayet evrensel bir toplumsal yasayı formüle eder. Bir millet tembellik, ahlaksızlık, rüşvet ve adaletsizliğe saparsa Allah onların huzur ve refahını geri alır. Bir toplumun kalkınması, huzura ve başarıya ulaşması dışarıdan bir mucizeyle değil; o toplumu oluşturan bireylerin kendi ahlaklarını, adalet ve çalışma disiplinlerini iyileştirmesiyle mümkündür.",
    "rubric": [("Toplumsal yasa formülasyonunun açıklanması", 0.5), ("Bireylerin ahlaki ıslahı ile toplumsal refah bağıntısı", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.2', 3, 1)] = {
    "contextText": "İnsanın fiillerinde mazeret üretme hatası.",
    "stimulus": "Kur'an'da müşriklerin 'Eğer Allah dileseydi biz de atalarımız da O'na ortak koşmazdık...' diyerek şirki kadere yükledikleri anlatılır.",
    "questionText": "Müşriklerin bu sözünün neden geçersiz ve samimiyetsiz olduğunu Kur'an'ın irade vurgusuyla açıklayınız.",
    "solutionExplanation": "Allah insanlara peygamberler göndererek doğruyu bildirmiş ve seçme iradesi vermiştir; suçu kadere atmak sahtekarlıktır.",
    "modelAnswer": "Müşriklerin bu iddiası tamamen bir kaçış ve sorumluluktan sıyrılma oyunudur. Yüce Allah hiçbir insanı zorla inkâra ya da puta tapmaya mecbur etmemiştir. İnsanlara akıl vermiş, peygamberler ve kitaplar göndererek doğru yolu bildirmiştir. Puta tapmayı kendi dünyevi menfaatleri için seçen müşriklerin bunu 'Allah böyle diledi' diyerek kadere fatura etmesi vicdansızlıktır.",
    "rubric": [("Müşriklerin iddialarının arkasındaki mazeretçilik eleştirisi", 0.5), ("Peygamberlerin tebliği ve cüzi irade vurgusu", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.3', 3, 0)] = {
    "contextText": "Tevekkül ve tedbir dengesi.",
    "stimulus": "Hicret yolculuğunda Hz. Peygamber'in Sevr Mağarası'na gizlenmesi, izleri kaybettirmek için çoban tutması ve Medine'ye bilinen yoldan değil farklı bir güzergâhtan gitmesi.",
    "questionText": "Hz. Peygamber Allah'ın koruması altında olduğu halde neden bu kadar kapsamlı tedbirler almıştır? Tevekkül açısından açıklayınız.",
    "solutionExplanation": "Peygamberimiz ümmetine örnek olmak ve fiili tedbir almanın tevekkülün ilk şartı olduğunu göstermek istemiştir.",
    "modelAnswer": "Hz. Peygamber Yüce Allah'ın peygamberi olduğu halde 'Nasılsa Allah beni korur' diyerek tedbirsiz yola çıkmamıştır. Çünkü O, tüm insanlığa örnektir (üsve-i hasene). İnsanın aklını ve imkânlarını sonuna kadar kullanarak her türlü askeri ve stratejik tedbiri almasının, ardından Allah'a güvenip tevekkül etmesinin doğru olduğunu bizzat yaşayarak göstermiştir.",
    "rubric": [("Peygamberin ümmete somut örnek olma misyonu", 0.5), ("Önce tüm tedbirleri alıp sonra Allah'a tevekkül etme dersi", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.3', 3, 1)] = {
    "contextText": "Rızıkta helal ve haram sınırları.",
    "stimulus": "Ayet Meali: 'Ey insanlar! Yeryüzündeki helal ve temiz olan şeylerden yiyin; şeytanın adımlarını takip etmeyin...' (Bakara suresi, 168. ayet)",
    "questionText": "Kader inancında rızık miktarı takdir edilmişken, bu rızkı helal veya haram yoldan kazanmanın insanın iradesine bırakılmasını açıklayınız.",
    "solutionExplanation": "Rızık miktarı belirlidir; ancak kul o rızkı helal yoldan mı (çalışarak) yoksa haram yoldan mı (hırsızlık/faiz) alacağını kendisi seçer.",
    "modelAnswer": "Yüce Allah insanın rızkını takdir etmiştir. Ancak o rızka hangi yolla ulaşacağını insanın cüzi iradesine bırakmıştır. İnsan dilerse sabredip alın teriyle, helal yoldan ticaret yaparak rızkını kazanır; dilerse hırsızlık, rüşvet veya faiz gibi haram yollara tevessül eder. Haramı seçen kimse 'kaderimde bu varmış' diyemez; haram yoldan kazanmayı seçtiği için günaha girer ve sorumlu olur.",
    "rubric": [("Rızkın helal ya da haram yoldan temininin insana ait olduğu", 0.5), ("Haramı seçmenin sorumluluğu ve günahı boyutu", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.3', 3, 2)] = {
    "contextText": "Ömür ve zaman bilinci.",
    "stimulus": "Hz. Peygamber: 'Kıyamet gününde insan ömrünü nerede tükettiğinden ve gençliğini nerede yıprattığından sorguya çekilmedikçe bir adım dahi atamaz.' buyurmuştur.",
    "questionText": "Bu hadisin gençlerin günlük yaşam alışkanlıklarına ve hayat planlamalarına vermesi gereken yönü açıklayınız.",
    "solutionExplanation": "Zaman geri döndürülemez bir emanettir; boş ve zararlı işlerle tüketilmeyip faydalı ilim ve ahlakla değerlendirilmelidir.",
    "modelAnswer": "Hadis, insan hayatının ve özellikle enerjinin zirvede olduğu gençlik döneminin Yüce Allah tarafından verilmiş en değerli emanet olduğunu hatırlatır. Gençler ömrün sınırlı ve hesabının kesin olduğunu unutmamalıdır. Zamanı boş oyunlar, faydasız bağımlılıklar ve tembellikle ziyan etmek yerine; ilim öğrenmek, ahlakı güzelleştirmek, ailesine ve milletine faydalı bir fert olmak üzere bilinçle planlamalıdır.",
    "rubric": [("Ömrün ve gençliğin ilahi bir emanet olduğu bilinci", 0.5), ("Zamanı faydalı ilim ve insanlığa hizmetle geçirme gerekliliği", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.4', 3, 0)] = {
    "contextText": "Yanlış kader anlayışı: 'Rüzgârın önündeki yaprak'.",
    "stimulus": "Bazı felsefi yaklaşımlar ve fatalist (kaderci) çevreler insanı 'Rüzgârın önünde savrulan kuru bir yaprak' gibi iradesiz ve çaresiz kabul ederler.",
    "questionText": "İslam dininin insanı rüzgâr önündeki yaprağa benzeten bu anlayışı neden kesinlikle reddettiğini açıklayınız.",
    "solutionExplanation": "Çünkü yaprağın aklı ve iradesi yoktur, nereye gideceğini seçemez. İnsanın ise aklı, vicdanı ve iradesi vardır.",
    "modelAnswer": "Kuru bir yaprağın ne aklı ne bilinci ne de rüzgâra yön verme iradesi vardır; nereye savrulursa oraya gider ve sorumlu tutulamaz. Oysa İslam inancında insan, yaprak gibi şuursuz bir varlık değildir. Yüce Allah insana akıl, fikir, vicdan ve cüzi irade bahşetmiştir; doğru ile yanlışı ayırt edebilecek güce sahiptir. Bu nedenle insanı rüzgârın önündeki iradesiz bir yaprak gibi görmek İslam'ın adalet ve sorumluluk ilkeleriyle taban tabana zıttır.",
    "rubric": [("Yaprak ile insan arasındaki irade/akıl farkının ortaya konması", 0.5), ("İslam'ın sorumluluk ve adalet ilkelerine aykırılık gerekçesi", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.4', 3, 1)] = {
    "contextText": "Trafik kazaları ve tedbirsizliği kadere yükleme.",
    "stimulus": "Aşırı hız yapan, kırmızı ışıkta geçen ve alkollü araç kullanarak kazaya sebep olan bir sürücünün 'Kader işte, canı veren Allah alır' diyerek kendini savunması.",
    "questionText": "Bu sürücünün savunmasını İslam'ın can güvenliği ve kader anlayışı açısından çürütünüz.",
    "solutionExplanation": "Trafik kurallarını ihlal etmek kendi iradesidir; sebep olduğu ölümler cinayet ve kul hakkıdır, kadere fatura edilemez.",
    "modelAnswer": "Bu sürücünün savunması tamamen batıldır ve dini kendi suçuna alet etmektir. Kırmızı ışıkta geçmek, hız limitini aşmak ve alkollü araç kullanmak tamamen sürücünün kendi hür iradesiyle işlediği bir cinayet ve suçtur. İslam can güvenliğini korumayı en temel farzlardan sayar. Kendi tedbirsizliği ve kural tanımazlığı yüzünden masum insanların ölümüne yol açan kimse hem hukuken katildir hem de ahirette ağır bir kul hakkı vebali altındadır; bu cürmü kadere yükleyemez.",
    "rubric": [("Kural ihlalinin hür iradeyle yapıldığının tespiti", 0.5), ("Can güvenliğini tehlikeye atmanın ve kul hakkının kadere yüklenemeyeceği", 0.5)]
}

# --- Senaryo 5 (7 Qs) ---
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.1', 4, 0)] = {
    "contextText": "Evrendeki mükemmel düzen ve biyolojik yasalar.",
    "stimulus": "Ayet Meali: 'Gökten su indiren O'dur. Sonra onunla her şeyin bitkisini bitirdik; ondan yeşillikler çıkardık; o yeşilliklerden üst üste binmiş taneler çıkarıyoruz...' (En'âm suresi, 99. ayet)",
    "questionText": "Verilen ayetin biyolojik yasalar ve ekosistem dengesi açısından ortaya koyduğu hakikati açıklayınız.",
    "solutionExplanation": "Bitkilerin tohumlanması, büyümesi ve besin üretimi Allah'ın koyduğu biyolojik yasalara göre işler.",
    "modelAnswer": "Ayet-i kerime, canlıların yaşaması, büyümesi, beslenmesi ve üremesiyle ilgili olarak Yüce Allah'ın yarattığı 'biyolojik yasaları' anlatmaktadır. Yağan yağmurun topraktaki tohumları harekete geçirmesi, fotosentez ile yeşil yaprakların ve başakların oluşması canlılar arasındaki besin zincirini kuran mükemmel bir ekolojik düzenin ve kaderin kanıtıdır.",
    "rubric": [("Biyolojik yasalar ile ilişkilendirilmesi", 0.5), ("Besin zinciri ve ekolojik düzen vurgusu", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.2', 4, 0)] = {
    "contextText": "Külli irade alanında insanın sorumluluğunun bulunmaması.",
    "stimulus": "İnsan ne zaman doğacağını, hangi cinsiyette veya hangi anne-babadan dünyaya geleceğini kendisi seçemez.",
    "questionText": "İnsanın kendi iradesi dışında gerçekleşen bu durumlardan (külli irade) dolayı ahirette hesaba çekilip çekilmeyeceğini gerekçesiyle açıklayınız.",
    "solutionExplanation": "Hesaba çekilmez. Çünkü İslam'da sorumluluk sadece cüzi iradeyle seçilen eylemler içindir.",
    "modelAnswer": "İnsan kendi iradesi ve seçimi dışında gelişen olaylardan kesinlikle hesaba çekilmeyecektir. Çünkü Yüce Allah adildir; insana seçme hakkı tanımadığı bir alandan onu sorumlu tutmaz. İnsanın Türk, Arap, zenci ya da beyaz olması, engelli doğması veya ailesinin zengin-fakir olması kendi tercihi değildir. Ahiretteki hesap sadece insanın kendi cüzi iradesiyle yaptığı ahlaki tercihlerden, ibadetlerinden ve davranışlarından sorulacaktır.",
    "rubric": [("Külli irade alanında sorumluluk olmadığının belirtilmesi", 0.5), ("Allah'ın adaleti ve cüzi irade hesabı gerekçesi", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.3', 4, 0)] = {
    "contextText": "Kaderle ilgili kavramlar: Tevekkülün psikolojik faydaları.",
    "stimulus": "İnsan elinden gelen tüm gayreti gösterdikten sonra sonucun Allah'ın takdirinde olduğunu bildiğinde kalbinde derin bir huzur bulur.",
    "questionText": "Doğru tevekkül bilincinin insanı aşırı kaygıdan, stresten ve yenilgi anında ümitsizliğe düşmekten nasıl koruduğunu açıklayınız.",
    "solutionExplanation": "Sonucu Allah'a havale eden insan kriz anlarında paniğe kapılmaz; 'Hakkımda hayırlısı budur' diyerek iç huzurunu korur.",
    "modelAnswer": "Doğru tevekkül, insanın ruh sağlığını koruyan muazzam bir sığınaktır. Görevini ve tedbirini eksiksiz yerine getiren birey, kontrolü dışındaki sonuçlar için yıpratıcı bir kaygı ve endişeye kapılmaz. Karşılaştığı zorluklarda ve başarısızlıklarda ise 'Ben elimden geleni yaptım, takdir Allah'ındır; bunda da bir hayır vardır' diyerek ümitsizlik ve depresyona düşmekten korunur, psikolojik direncini daima yüksek tutar.",
    "rubric": [("Gereksiz kaygı ve stresten koruma boyutu", 0.5), ("Başarısızlık anında ümitsizliği önleme ve iç huzur katkısı", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.3', 4, 1)] = {
    "contextText": "Kaderle ilgili kavramlar: Rızıkta infak ve cömertlik.",
    "stimulus": "Ayet Meali: 'Allah'ın sana verdiğinden (O'nun yolunda harcayarak) ahiret yurdunu iste; ama dünyadan da nasibini unutma...' (Kasas suresi, 77. ayet)",
    "questionText": "İslam'ın dünya ve ahiret dengesi ile rızkın paylaşılması (infak) konusundaki bakış açısını verilen ayet ışığında açıklayınız.",
    "solutionExplanation": "Dünya terk edilmemeli, helalinden kazanılmalı; ancak kazanılan mal Allah yolunda paylaşılarak ahiret sermayesine dönüştürülmelidir.",
    "modelAnswer": "İslam dini dünyadan tamamen el etek çekip fakir yaşamayı değil, meşru yollardan dünya nimetlerinden dengeli bir şekilde faydalanmayı öğütler. Ancak kazanılan rızık ve servetin bir amaç değil, ebedi ahiret mutluluğunu kazanmak için bir araç olduğunu hatırlatır. Zenginlik bencilce biriktirilmemeli; yetimlerle, yoksullarla ve toplumun hayrına infak edilerek ahiret azığına dönüştürülmelidir.",
    "rubric": [("Dünya ve ahiret dengesinin açıklanması", 0.5), ("Rızkın infak ve yardımlaşmayla değerlendirilmesi vurgusu", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.4', 4, 0)] = {
    "contextText": "Yanlış kader anlayışı: Hastalıkta kadercilik.",
    "stimulus": "Bulaşıcı ve tehlikeli bir salgın hastalık çıktığında karantinaya uymayıp maske ve mesafe tedbirlerini hiçe sayarak 'Kaderimde ölmek varsa nerede olsam ölürüm' diyen kişinin tutumu.",
    "questionText": "Hz. Ömer'in veba salgını çıkan Şam şehrine girmekten vazgeçmesi üzerine sorulan 'Allah'ın kaderinden mi kaçıyorsun?' sorusuna verdiği cevabı hatırlayarak bu tutumu eleştiriniz.",
    "solutionExplanation": "Hz. Ömer: 'Evet, Allah'ın bir kaderinden yine Allah'ın başka bir kaderine kaçıyorum' demiştir. Tedbir almak da kaderin parçasıdır.",
    "modelAnswer": "Şam'da veba salgını çıktığında orduyu geri çeken Hz. Ömer'e Ebû Ubeyde 'Allah'ın kaderinden mi kaçıyorsun?' diye sorunca Hz. Ömer: 'Evet, Allah'ın bir kaderinden Allah'ın başka bir kaderine kaçıyorum!' cevabını vermiştir. Yani tedbirsiz davranıp hastalığa yakalanmak da bir kaderdir, tedbir alıp sağlıklı kalmak da bir kaderdir. İnsan aklıyla tedbiri ve sağlığı seçmek zorundadır; salgın tedbirlerini çiğnemek cehalettir ve kul hakkıdır.",
    "rubric": [("Hz. Ömer'in tarihi cevabının aktarılması", 0.5), ("Tedbir almanın da kaderin bir parçası olduğu bilincinin vurgulanması", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.4', 4, 1)] = {
    "contextText": "Yanlış kader anlayışı: 'Kör talih ve şanssızlık'.",
    "stimulus": "Hayatında karşılaştığı her aksilikte 'Ben zaten doğuştan şanssızım, kör talihim var' diyerek batıl inanışlara (fal, burç, nazar boncuğu) yönelen kimsenin inanç durumu.",
    "questionText": "Bu tür batıl inançların İslam'ın tevhid ve kader inancına verdiği zararları açıklayınız.",
    "solutionExplanation": "Şans, talih, fal gibi kavramlar İslam'da yoktur; her şey Allah'ın takdiri ve kulun amelleriyle şekillenir, fala inanmak şirktir.",
    "modelAnswer": "İslam dininde 'kör talih', 'şans' veya 'uğursuzluk' gibi kavramlara yer yoktur. Kâinatta meydana gelen her olay Yüce Allah'ın ilmi ve hikmeti doğrultusunda gerçekleşir. Karşılaşılan güçlükleri kadere ya da şansa bağlayıp fala, yıldız fallarına veya muskacılara sarılmak, Allah'tan başka varlıklardan medet ummak demektir ve tevhid inancını zedeler. Müslüman başına bir sıkıntı geldiğinde sabreder, tedbir alır ve yalnız Allah'a dua eder.",
    "rubric": [("Şans ve batıl inançların İslam'da yerinin olmadığının belirtilmesi", 0.5), ("Tevhid inancını zedelemesi ve yalnız Allah'a tevekkül gerekçesi", 0.5)]
}
G8_DEDICATED[('din_kulturu', 'DKAB.8.1.6', 4, 0)] = {
    "contextText": "Ayet el-Kürsi'de Allah'ın ilmi ve mülkiyeti.",
    "stimulus": "'O, kullarının önlerindekini ve arkalarındakini (yaptıklarını ve yapacaklarını) bilir. Onlar O'nun ilminden, kendisinin dilediği kadarından başka bir şey kavrayamazlar.' (Ayet el-Kürsi)",
    "questionText": "Ayet el-Kürsi'nin bu kısmından hareketle, insanın sahip olduğu sınırlı bilgi ile Allah'ın sonsuz ilmini karşılaştırınız.",
    "solutionExplanation": "Allah geçmişi ve geleceği her an bilir. İnsanın ilmi ise Allah'ın bildirdiği kadarıyla sınırlı ve eksiktir.",
    "modelAnswer": "Yüce Allah'ın ilmi zamandan ve mekândan münezzehtir; geçmişi, geleceği, insanın kalbinden geçen gizli duyguları ve kâinattaki tüm atomların hareketini aynı anda eksiksiz bilir. İnsanın bilgisi ise duyuları, tecrübesi ve aklıyla sınırlıdır; geçmişi unutabilir, geleceği ise asla bilemez. İnsanoğlu ancak Yüce Allah'ın vahiy ve bilim yoluyla kendisine lütfettiği kadarcık bir bilgi kırıntısına sahip olabilir.",
    "rubric": [("Allah'ın sonsuz ve geçmişi-geleceği kuşatan ilminin açıklanması", 0.5), ("İnsanın bilgisinin sınırlılığı ve bağımlılığı vurgusu", 0.5)]
}


# =====================================================================
# GRADE 8 İNGİLİZCE DEDICATED (5 Scenarios - 28 Questions)
# =====================================================================

# --- Senaryo 1 (4 Qs) ---
G8_DEDICATED[('ingilizce', 'E8.1.R1', 0, 0)] = {
    "contextText": "Personal characteristics of true friends.",
    "stimulus": "Text: 'True friends are like stars; you do not always see them, but you know they are always there. A true friend always backs you up when you have a problem. They are honest, loyal, and they never share your secrets with others.'",
    "questionText": "According to the text, what are two main qualities of a true friend? Mention their attitude towards secrets.",
    "solutionExplanation": "They back you up, they are honest/loyal, and they never share your secrets.",
    "modelAnswer": "1. Qualities: A true friend backs you up (supports you) and is honest and loyal.\n2. Attitude towards Secrets: A true friend keeps your secrets safe and never shares them with other people.",
    "rubric": [("Two personal qualities stated accurately", 0.5), ("Secret keeping attitude explained correctly", 0.5)]
}
G8_DEDICATED[('ingilizce', 'E8.1.W1', 0, 0)] = {
    "contextText": "Writing a letter of refusal with an excuse.",
    "stimulus": "Your close friend Sally invites you to her birthday barbecue party this Saturday afternoon, but you have a tennis tournament.",
    "questionText": "Write a short reply email (3 sentences) to Sally. Thank her for the invitation, refuse it politely, and state your excuse.",
    "solutionExplanation": "Short polite email refusing invitation with clear excuse.",
    "modelAnswer": "Sample Reply:\nDear Sally,\nThank you very much for inviting me to your birthday barbecue party! I would love to join, but I can't make it because I have a tennis tournament on Saturday afternoon. I hope you have a wonderful time, happy birthday!\nLove, [Your Name]",
    "rubric": [("Thanking for the invitation", 0.3), ("Polite refusal", 0.3), ("Clear excuse given", 0.4)]
}
G8_DEDICATED[('ingilizce', 'E8.2.R1', 0, 0)] = {
    "contextText": "Teenager daily routine and music preferences.",
    "stimulus": "Interview: 'Mark: I am crazy about rock music because the energetic rhythm keeps me motivated. However, I can't stand classical music; to be honest, I find it quite boring. In my free time, I usually go camping with my scouting group.'",
    "questionText": "Read the interview snippet and answer:\na) Why does Mark love rock music?\nb) What type of music does he dislike, and what is his opinion of it?",
    "solutionExplanation": "a) Because the energetic rhythm keeps him motivated. b) He dislikes classical music because he finds it boring.",
    "modelAnswer": "a) He loves rock music because its energetic rhythm keeps him motivated.\nb) He dislikes classical music and finds it quite boring (unbearable).",
    "rubric": [("Reason for liking rock music explained", 0.5), ("Dislike of classical music and opinion stated", 0.5)]
}
G8_DEDICATED[('ingilizce', 'E8.2.R1', 0, 1)] = {
    "contextText": "Teen preferences and outdoor activities.",
    "stimulus": "Survey results: 65% of 8th graders prefer outdoor sports like trekking and cycling, while 35% prefer playing computer games at home.",
    "questionText": "Based on the survey results, compare the popularity of outdoor activities with online computer games among 8th-grade teenagers.",
    "solutionExplanation": "Outdoor activities are more popular (65%) than playing computer games (35%).",
    "modelAnswer": "Outdoor activities (such as trekking and cycling) are much more popular than playing computer games; the majority of teenagers (65%) prefer being in nature rather than staying at home in front of a screen.",
    "rubric": [("Accurate comparison based on percentage data", 1.0)]
}

# --- Senaryo 2 (5 Qs) ---
G8_DEDICATED[('ingilizce', 'E8.1.R1', 1, 0)] = {
    "contextText": "Friendship vocabulary and traits.",
    "stimulus": "Dialogue:\n• Sam: 'Can I count on Jason?'\n• Leo: 'Definitely! He is the most reliable boy in our class. He never tells lies and he always keeps his promises.'",
    "questionText": "What does 'count on' mean in this context? Which two character traits of Jason make him a good friend?",
    "solutionExplanation": "'Count on' means to trust / rely on. Jason is reliable (honest) and keeps promises.",
    "modelAnswer": "• Meaning: 'To count on' means to rely on, depend on, or trust someone.\n• Character Traits: Jason is completely reliable and honest (he never tells lies and always keeps his promises).",
    "rubric": [("Accurate definition of 'count on'", 0.5), ("Two positive character traits identified", 0.5)]
}
G8_DEDICATED[('ingilizce', 'E8.1.R2', 1, 0)] = {
    "contextText": "Invitation card comprehension.",
    "stimulus": "INVITATION CARD:\n'Join Us for a Movie Night!\nDate: Friday, 14th November\nTime: 19:30\nPlace: Kevin's Home (Green Street No: 12)\nPS: Please bring your favorite popcorn or snacks!'",
    "questionText": "Read the invitation card and answer:\na) What kind of event is Kevin organizing?\nb) What are guests asked to bring with them?",
    "solutionExplanation": "a) A movie night, b) Popcorn or snacks.",
    "modelAnswer": "a) Kevin is organizing a movie night at his home on Friday.\nb) Guests are asked to bring their favorite popcorn or snacks.",
    "rubric": [("Movie night event identified", 0.5), ("Snacks/popcorn request identified", 0.5)]
}
G8_DEDICATED[('ingilizce', 'E8.1.W1', 1, 0)] = {
    "contextText": "Writing an acceptance message.",
    "stimulus": "Your friend Kevin invited you to a movie night this Friday at 19:30.",
    "questionText": "Write a short reply note (2-3 sentences) accepting the invitation enthusiastically and asking what movie you will watch.",
    "solutionExplanation": "Short acceptance note with enthusiasm and a question about the film.",
    "modelAnswer": "Sample Note:\nHi Kevin,\nThanks for the awesome invitation! I would love to come to the movie night. What kind of movie are we going to watch? See you on Friday!\nBest, Alex",
    "rubric": [("Accepting the invitation with enthusiasm", 0.5), ("Asking about the movie title/genre", 0.5)]
}
G8_DEDICATED[('ingilizce', 'E8.2.R1', 1, 0)] = {
    "contextText": "Teen music preferences and instruments.",
    "stimulus": "Text: 'Defne is a 14-year-old student who plays the cello in the youth orchestra. She enjoys classical music and jazz because she thinks acoustic instruments have a soul. Her brother Can, however, prefers rap and hip-hop because of the fast lyrics.'",
    "questionText": "Read the text and compare Defne's and Can's music tastes. Why does Defne like jazz and classical music?",
    "solutionExplanation": "Defne likes classical/jazz because acoustic instruments have a soul; Can prefers rap/hip-hop for the fast lyrics.",
    "modelAnswer": "• Comparison: Defne loves classical music and jazz, while her brother Can prefers energetic rap and hip-hop music.\n• Reason: Defne enjoys jazz and classical music because she believes acoustic musical instruments have a soul and deep emotion.",
    "rubric": [("Comparison of tastes clearly explained", 0.5), ("Defne's reason (acoustic instruments have a soul) stated", 0.5)]
}
G8_DEDICATED[('ingilizce', 'E8.2.W1', 1, 0)] = {
    "contextText": "Writing about teen daily routine and hobbies.",
    "stimulus": "Prompt: Describe your typical Saturday routine and your favorite hobbies as an 8th-grade teen.",
    "questionText": "Write a 3-4 sentence paragraph describing your favorite weekend routine, including what time you wake up, your hobby, and your music preference.",
    "solutionExplanation": "3-4 coherent sentences covering weekend wake up, hobby, and music.",
    "modelAnswer": "Sample Paragraph:\nOn Saturdays, I usually wake up at 08:30 and have a big family breakfast. In the afternoon, I ride my mountain bike in the forest and listen to indie rock music with my headphones. In the evening, I play online chess with my classmates and read an adventure novel before sleeping.",
    "rubric": [("Three required details (routine, hobby, music) included", 0.6), ("Grammatical and lexical accuracy", 0.4)]
}

# --- Senaryo 3 (6 Qs) ---
G8_DEDICATED[('ingilizce', 'E8.1.R1', 2, 0)] = {
    "contextText": "Friendship qualities: Backing up and honesty.",
    "stimulus": "Text: 'Good friends have a lot of things in common. They share similar hobbies, support each other in hard times, and never tell lies. An arrogant and self-centered person cannot be a good friend because true friendship requires empathy.'",
    "questionText": "According to the text, why can an arrogant and self-centered person NOT be a true friend?",
    "solutionExplanation": "Because they lack empathy and true friendship requires understanding and supporting others.",
    "modelAnswer": "An arrogant and self-centered person cannot be a true friend because true friendship requires empathy, mutual understanding, and supporting each other, whereas selfish people only care about themselves.",
    "rubric": [("Lack of empathy and selfishness explained as the barrier to true friendship", 1.0)]
}
G8_DEDICATED[('ingilizce', 'E8.1.R1', 2, 1)] = {
    "contextText": "Vocabulary matching: Friendship traits.",
    "stimulus": "Words: [generous, supportive, jealous, honest]",
    "questionText": "Match the personality adjectives with their descriptions:\n1. Always tells the truth and never lies: ....................\n2. Helps you whenever you need assistance: ....................\n3. Likes sharing things and giving presents: ....................\n4. Cannot stand seeing other people's success: ....................",
    "solutionExplanation": "1. honest, 2. supportive, 3. generous, 4. jealous.",
    "modelAnswer": "1. honest\n2. supportive\n3. generous\n4. jealous",
    "rubric": [("All four personality adjectives matched accurately", 1.0)]
}
G8_DEDICATED[('ingilizce', 'E8.1.R2', 2, 0)] = {
    "contextText": "Invitation dialogue and excuse.",
    "stimulus": "Dialogue:\n• Brian: 'Are you doing anything on Sunday afternoon? How about going skating at the ice rink?'\n• Clara: 'I'd love to, but I can't. My grandparents are visiting us and we are having a family dinner.'",
    "questionText": "Does Clara accept or refuse the invitation? What is her excuse?",
    "solutionExplanation": "She refuses. Her excuse is that her grandparents are visiting and they have a family dinner.",
    "modelAnswer": "• Response: Clara refuses the invitation politely.\n• Excuse: Her grandparents are visiting her family on Sunday afternoon and they are having a family dinner together.",
    "rubric": [("Refusal stated accurately", 0.5), ("Family dinner/grandparents excuse stated clearly", 0.5)]
}
G8_DEDICATED[('ingilizce', 'E8.1.W1', 2, 0)] = {
    "contextText": "Writing an invitation note.",
    "stimulus": "You want to invite your best friend Emma to a book fair in the city center next Sunday at 14:00.",
    "questionText": "Write a short invitation message (2-3 sentences) to Emma. State the event, date, time, and ask if she would like to join you.",
    "solutionExplanation": "Short invitation message with all details.",
    "modelAnswer": "Sample Invitation:\nHi Emma,\nThere is a huge international book fair at the city cultural center next Sunday at 14:00. Would you like to come with me? Let me know by Friday so we can buy the tickets together!\nCheers, Lisa",
    "rubric": [("Event, date and time clearly mentioned", 0.6), ("Polite invitation phrase used", 0.4)]
}
G8_DEDICATED[('ingilizce', 'E8.2.R1', 2, 0)] = {
    "contextText": "Teenagers and camping life.",
    "stimulus": "Blog post: 'Camping is an awesome teen activity. Sleeping in a tent, sitting around the campfire, and trekking in the mountains teach us self-reliance. However, you must take a pocket knife, a sleeping bag, and a torch with you.'",
    "questionText": "Read the blog post and answer:\na) What does camping teach teenagers according to the author?\nb) Name 3 essential items you must bring for camping.",
    "solutionExplanation": "a) It teaches self-reliance. b) Pocket knife, sleeping bag, and torch.",
    "modelAnswer": "a) Camping teaches teenagers self-reliance (independence and confidence).\nb) Three essential items: A pocket knife, a sleeping bag, and a torch (flashlight).",
    "rubric": [("Self-reliance identified", 0.5), ("Three equipment items listed", 0.5)]
}
G8_DEDICATED[('ingilizce', 'E8.2.R1', 2, 1)] = {
    "contextText": "Reading comprehension: Teen clothing preferences.",
    "stimulus": "Text: 'Most modern teenagers prefer casual clothes such as hoodies, jeans, and sneakers because they are comfortable. They find formal clothes like suits and ties ridiculous and impractical for daily school life.'",
    "questionText": "Why do teenagers prefer casual clothes over formal clothes? What is their opinion about suits and ties?",
    "solutionExplanation": "They prefer casual clothes because they are comfortable. They find suits and ties ridiculous and impractical.",
    "modelAnswer": "• Reason: Teenagers prefer casual clothes (hoodies, jeans, sneakers) because they are practical and comfortable for daily activities.\n• Opinion: They find formal clothes like suits and ties ridiculous and impractical for school and daily life.",
    "rubric": [("Comfort and practicality reason explained", 0.5), ("Opinion on formal wear stated accurately", 0.5)]
}

# --- Senaryo 4 (6 Qs) ---
G8_DEDICATED[('ingilizce', 'E8.1.R1', 3, 0)] = {
    "contextText": "Best friends having common interests.",
    "stimulus": "Text: 'Tim and Eric have been buddies for six years. They always get on well with each other because they share the same hobbies. Both of them love playing basketball, solving math puzzles, and listening to rock music.'",
    "questionText": "What does the phrase 'get on well with each other' mean? Name 2 hobbies that Tim and Eric share.",
    "solutionExplanation": "It means having a friendly, good relationship without arguing. Hobbies: basketball, math puzzles, rock music.",
    "modelAnswer": "• Meaning: 'To get on well with each other' means to have a good, friendly, and harmonious relationship with someone.\n• Shared Hobbies: Playing basketball and solving math puzzles (or listening to rock music).",
    "rubric": [("Meaning of idiom explained correctly", 0.5), ("Two shared hobbies listed", 0.5)]
}
G8_DEDICATED[('ingilizce', 'E8.1.R2', 3, 0)] = {
    "contextText": "Accepting invitations.",
    "stimulus": "Dialogue:\n• David: 'We are organizing a picnic by the lake this Saturday. Do you fancy coming with us?'\n• Arthur: 'Awesome! That sounds great. What can I bring with me?'",
    "questionText": "Does Arthur accept the picnic invitation? How do you know?",
    "solutionExplanation": "Yes, he accepts. He says 'Awesome! That sounds great' and asks what he can bring.",
    "modelAnswer": "Yes, Arthur accepts the invitation enthusiastically. We know this because he replies with positive phrases like 'Awesome! That sounds great' and immediately offers to help by asking what food or drinks he can bring.",
    "rubric": [("Accurate confirmation of acceptance", 0.5), ("Evidence from dialogue quoted and explained", 0.5)]
}
G8_DEDICATED[('ingilizce', 'E8.1.R2', 3, 1)] = {
    "contextText": "Refusing invitations with reasons.",
    "stimulus": "Email:\n'Dear David, thanks for inviting me to the bowling tournament tomorrow. I am sorry, but I can't attend because I must look after my little sister while my parents are at work. Have fun! - Paul'",
    "questionText": "Identify Paul's excuse for not attending the bowling tournament.",
    "solutionExplanation": "He must look after his little sister while his parents are at work.",
    "modelAnswer": "Paul cannot attend the bowling tournament because he has to take care of (look after) his little sister while his parents are at work.",
    "rubric": [("Excuse stated accurately and completely", 1.0)]
}
G8_DEDICATED[('ingilizce', 'E8.2.R1', 3, 0)] = {
    "contextText": "Teenager morning and school routines.",
    "stimulus": "Text: 'Selim is an organized 8th-grade student. He always wakes up at 06:45, washes his face, and has a healthy breakfast. He leaves home at 07:45 and walks to school. His lessons start at 08:30 and finish at 15:30. After school, he attends the science club twice a week.'",
    "questionText": "Read the text and answer:\na) How does Selim go to school in the morning?\nb) How often does he attend the science club?",
    "solutionExplanation": "a) He walks to school. b) Twice a week.",
    "modelAnswer": "a) Selim walks to school on foot.\nb) He attends the science club twice a week after school.",
    "rubric": [("Walking to school identified", 0.5), ("Twice a week frequency stated", 0.5)]
}
G8_DEDICATED[('ingilizce', 'E8.2.R1', 3, 1)] = {
    "contextText": "Music genre definitions.",
    "stimulus": "Definitions:\n1. Heavy beats, electric guitars, and high energy: R _ _ K music\n2. Traditional, harmonious, played by orchestras: C _ _ _ _ _ C _ L music\n3. Improvised wind instruments, saxophones, originated in New Orleans: J _ _ Z music",
    "questionText": "Complete the missing letters of the music genres:\n1. R _ _ K\n2. C _ _ _ _ _ C _ L\n3. J _ _ Z",
    "solutionExplanation": "1. ROCK, 2. CLASSICAL, 3. JAZZ.",
    "modelAnswer": "1. ROCK\n2. CLASSICAL\n3. JAZZ",
    "rubric": [("Three music genres correctly completed", 1.0)]
}
G8_DEDICATED[('ingilizce', 'E8.2.W1', 3, 0)] = {
    "contextText": "Writing a paragraph about teen sports and leisure.",
    "stimulus": "Writing prompt: Explain why regular physical activity and sports are important for teenagers preparing for high school entrance exams (LGS).",
    "questionText": "Write 3 complete sentences explaining the benefits of sports for teenagers during stressful exam periods (mention stress reduction, health, and energy).",
    "solutionExplanation": "3 complete sentences addressing stress, health, and energy.",
    "modelAnswer": "Sample Sentences:\n1. Doing sports regularly reduces exam stress and helps students clear their minds after studying long hours.\n2. Physical exercise like swimming or jogging keeps the body healthy and improves focus during classes.\n3. Playing team sports also boosts positive energy and strengthens friendships among teenagers.",
    "rubric": [("Three coherent sentences covering benefits", 0.6), ("Grammar and vocabulary accuracy", 0.4)]
}

# --- Senaryo 5 (7 Qs) ---
G8_DEDICATED[('ingilizce', 'E8.1.R1', 4, 0)] = {
    "contextText": "Friendship traits: Loyal and caring.",
    "stimulus": "Text: 'A loyal buddy stands by you through thick and thin. When you fail an exam or feel depressed, they do not criticize you; instead, they cheer you up and offer constructive solutions.'",
    "questionText": "What does a loyal buddy do when you feel depressed or face a failure according to the text?",
    "solutionExplanation": "They stand by you, cheer you up, and offer constructive solutions instead of criticizing.",
    "modelAnswer": "Instead of criticizing you, a loyal buddy stands by your side, cheers you up, and helps you find constructive solutions to overcome your problems.",
    "rubric": [("Cheering up and constructive support accurately described", 1.0)]
}
G8_DEDICATED[('ingilizce', 'E8.1.R1', 4, 1)] = {
    "contextText": "Opposite traits in friendship.",
    "stimulus": "Pairs of opposites: generous vs stingy, honest vs sneaky, reliable vs untrustworthy.",
    "questionText": "Write the opposite of each negative personality trait:\na) sneaky (dishonest) <-> ....................\nb) stingy (mean) <-> ....................\nc) untrustworthy (unreliable) <-> ....................",
    "solutionExplanation": "a) honest, b) generous, c) reliable / trustworthy.",
    "modelAnswer": "a) sneaky <-> honest (truthful)\nb) stingy <-> generous (kind)\nc) untrustworthy <-> reliable (trustworthy)",
    "rubric": [("Three positive opposite traits correctly written", 1.0)]
}
G8_DEDICATED[('ingilizce', 'E8.1.R2', 4, 0)] = {
    "contextText": "Informal invitation email.",
    "stimulus": "EMAIL:\n'Hey guys! We are throwing a surprise welcome-back party for Fiona at my garden this Sunday at 16:00. Please don't tell her because it's a secret! Let me know if you can make it by Friday evening. Cheers, Max'",
    "questionText": "Read the email and answer:\na) For whom is the surprise party being organized?\nb) When must the guests confirm their attendance?",
    "solutionExplanation": "a) For Fiona, b) By Friday evening.",
    "modelAnswer": "a) The surprise welcome-back party is being organized for Fiona.\nb) Guests must confirm their attendance by Friday evening.",
    "rubric": [("Fiona identified accurately", 0.5), ("Friday evening deadline stated", 0.5)]
}
G8_DEDICATED[('ingilizce', 'E8.1.W1', 4, 0)] = {
    "contextText": "Writing an apology and alternative date proposal.",
    "stimulus": "Your friend Max invited you to a surprise party on Sunday, but you have a family gathering.",
    "questionText": "Write a short reply email to Max. Apologize for not being able to come, explain your excuse, and suggest meeting on Monday after school.",
    "solutionExplanation": "Apology, excuse, and alternative proposal for Monday.",
    "modelAnswer": "Sample Reply:\nDear Max,\nThanks a lot for the invitation to Fiona's party! I am really sorry, but I can't come because we have an important family reunion on Sunday. How about meeting up on Monday after school to celebrate together?\nBest, Tom",
    "rubric": [("Apology and reason stated", 0.5), ("Monday alternative suggestion included", 0.5)]
}
G8_DEDICATED[('ingilizce', 'E8.2.R1', 4, 0)] = {
    "contextText": "Teenagers and digital life vs real life.",
    "stimulus": "Text: 'Many parents complain that teenagers spend too much time on smartphones and social media. However, studies show that teens who balance screen time with sports and reading books are more successful in school.'",
    "questionText": "What do parents complain about regarding teenagers, and what is the scientific finding about balancing screen time?",
    "solutionExplanation": "Parents complain about excessive smartphone/social media time. Balancing screen time with sports and reading leads to greater school success.",
    "modelAnswer": "• Parents' Complaint: Parents complain that teenagers spend too much time staring at smartphones and scrolling through social media.\n• Scientific Finding: Teenagers who balance their digital screen time with outdoor sports and reading books achieve higher academic success in school.",
    "rubric": [("Parents' complaint accurately described", 0.5), ("Scientific balance finding accurately explained", 0.5)]
}
G8_DEDICATED[('ingilizce', 'E8.2.R1', 4, 1)] = {
    "contextText": "Teen musical preferences: Concert tickets.",
    "stimulus": "Notice: 'Rock Band Live at City Arena! Doors open at 18:00, concert starts at 19:30. Ticket price: 150 TL for students, 250 TL for adults. Under 12 not admitted.'",
    "questionText": "Scan the notice and answer:\na) What time does the concert start?\nb) How much is a ticket for a middle school student?",
    "solutionExplanation": "a) At 19:30, b) 150 TL.",
    "modelAnswer": "a) The rock concert starts at 19:30.\nb) A ticket for a student costs 150 TL.",
    "rubric": [("Start time identified", 0.5), ("Student price stated", 0.5)]
}
G8_DEDICATED[('ingilizce', 'E8.2.W1', 4, 0)] = {
    "contextText": "Independent writing: Teenager profile.",
    "stimulus": "Writing task: Create a personal teen profile for a school magazine.",
    "questionText": "Write a 4-sentence personal profile including:\n- Your favorite school subject and why\n- Your music preference\n- One after-school activity you do\n- The quality you value most in a friend.",
    "solutionExplanation": "4 sentences answering all 4 required points.",
    "modelAnswer": "Sample Profile:\nMy favorite subject is Science because I love discovering how natural laws work. I am fond of energetic rock music and listen to my favorite bands while studying. Twice a week, I attend the school basketball club with my classmates. In a friendship, the quality I value most is honesty because trust is everything to me.",
    "rubric": [("All 4 required profile points covered", 0.6), ("Grammar, structure and natural phrasing", 0.4)]
}

print("All Grade 8 Din Kültürü and İngilizce dedicated questions registered successfully!")
