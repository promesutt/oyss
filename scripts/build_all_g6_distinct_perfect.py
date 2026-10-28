# -*- coding: utf-8 -*-
import json
from collections import defaultdict

with open('meb_data/clean_middle_school_matrix.json', 'r', encoding='utf-8') as f:
    matrix = json.load(f)

def distribute_points(count):
    base = 100 // count
    rem = 100 % count
    return [base + (1 if i < rem else 0) for i in range(count)]

G6_DEDICATED = {}

# =====================================================================
# GRADE 6 TÜRKÇE DEDICATED (6 Scenarios)
# Themes:
# Sc1: Göbeklitepe ve Arkeoloji
# Sc2: Nasreddin Hoca ve Kazan Doğurdu
# Sc3: Mavi Balinaların Şarkıları
# Sc4: Kuş Evleri ve Osmanlı Merhameti
# Sc5: Kaşgarlı Mahmud ve Divânu Lugâti't-Türk
# Sc6: Kutup Işıkları (Aurora Borealis)
# =====================================================================

# Senaryo 1: Göbeklitepe
G6_DEDICATED[('turkce', 'T.O.6.5', 0, 0)] = {
    "contextText": "Göbeklitepe metninde geçen sözcükler.",
    "stimulus": "Şanlıurfa yakınlarındaki Göbeklitepe, insanlık tarihinin bilinen en kadim tapınak merkezidir. T biçimindeki devasa kireçtaşı sütunların üzerine tilki, yaban domuzu ve turna kabartmaları büyük bir ustalıkla nakşedilmiştir. Arkeologlar bu kazıların yerleşik hayata geçiş teorilerini kökünden değiştirdiğini belirtmektedir.",
    "questionText": "Metinde geçen 'kadim' ve 'nakşetmek' sözcüklerinin anlamlarını metnin bağlamından tahmin ederek karşılarına yazınız.",
    "solutionExplanation": "Kadim: Çok eski, başlangıcı bilinmeyen. Nakşetmek: Taş veya tahta üzerine işlemek, oymak.",
    "modelAnswer": "• Kadim: Çok eski zamanlardan beri var olan, köklü, antik.\n• Nakşetmek: Bir motifi, resmi veya yazıyı taş, tahta gibi sert yüzeylere oyarak veya çizerek işlemek.",
    "rubric": [("Kadim sözcüğünün doğru tahmini", 0.5), ("Nakşetmek sözcüğünün doğru tahmini", 0.5)]
}
G6_DEDICATED[('turkce', 'T.O.6.6', 0, 0)] = {
    "contextText": "Göbeklitepe metninin konusu.",
    "stimulus": "Metinde Şanlıurfa Göbeklitepe'deki kazılar, T sütunlarındaki kabartmalar ve yerleşik hayata geçiş teorilerine etkisi anlatılmaktadır.",
    "questionText": "Göbeklitepe'yi ve üzerindeki kabartmaları anlatan yukarıdaki metnin konusunu tek bir cümleyle yazınız.",
    "solutionExplanation": "Göbeklitepe'nin tarihî önemi ve insanlık tarihine katkısı.",
    "modelAnswer": "Metnin konusu, Şanlıurfa'daki Göbeklitepe tapınak alanının mimari özellikleri ve insanlık tarihinin başlangıcına dair bilinenleri kökten değiştirmesidir.",
    "rubric": [("Göbeklitepe ve tarihî önemini kapsayan konu cümlesi", 1.0)]
}
G6_DEDICATED[('turkce', 'T.O.6.6', 0, 1)] = {
    "contextText": "Göbeklitepe'nin arkeoloji tarihindeki önemi.",
    "stimulus": "Arkeologlar Göbeklitepe keşfedilmeden önce avcı-toplayıcı insanların tapınak yapamayacağını düşünüyordu.",
    "questionText": "Göbeklitepe keşfinin insanlık tarihi hakkındaki yerleşik düşünceleri nasıl değiştirdiğini metne dayanarak açıklayınız.",
    "solutionExplanation": "İnsanların tarımdan önce de inanç merkezleri ve tapınaklar inşa edebildiğini kanıtlamıştır.",
    "modelAnswer": "Göbeklitepe, avcı-toplayıcı insanların henüz tarıma ve yerleşik hayata geçmeden önce bile büyük bir organizasyon kurarak görkemli inanç merkezleri (tapınaklar) inşa edebildiğini kanıtlamış ve medeniyet tarihinin başlangıcını binlerce yıl geriye çekmiştir.",
    "rubric": [("Tarımdan önce tapınak inşa edilebildiği tespiti", 0.5), ("Tarih tezlerini kökünden değiştirme gerekçesi", 0.5)]
}
G6_DEDICATED[('turkce', 'T.O.6.21', 0, 0)] = {
    "contextText": "Eş ve zıt anlamlı kelimeler.",
    "stimulus": "Metindeki sözcükler: 'asır', 'ilkel'.",
    "questionText": "a) 'asır' sözcüğünün eş anlamlısını yazınız.\nb) 'ilkel' sözcüğünün zıt anlamlısını yazınız.",
    "solutionExplanation": "asır -> yüzyıl, ilkel -> çağdaş / modern / gelişmiş.",
    "modelAnswer": "a) asır: yüzyıl\nb) ilkel: çağdaş (veya modern / gelişmiş)",
    "rubric": [("a şıkkında yüzyıl yazımı", 0.5), ("b şıkkında çağdaş/modern yazımı", 0.5)]
}
G6_DEDICATED[('turkce', 'T.Y.6.18', 0, 0)] = {
    "contextText": "Deyim kullanımı: 'çığır açmak'.",
    "stimulus": "'Çığır açmak' deyimi yeni bir yol açmak, bir alanda köklü bir yenilik ve başlangıç yapmak anlamına gelir.",
    "questionText": "'Çığır açmak' deyimini Göbeklitepe'nin bilim dünyasındaki etkisini anlatacak şekilde anlamlı ve kurallı bir cümlede kullanınız.",
    "solutionExplanation": "Deyimin anlamına uygun cümlede kullanımı.",
    "modelAnswer": "Örnek Cümle: 'Göbeklitepe'de bulunan taş kabartmalar ve tapınaklar, arkeoloji ve medeniyet tarihinde yepyeni bir çığır açtı.'",
    "rubric": [("Deyimin anlamına tam uygun kullanımı", 0.6), ("Cümlenin dil bilgisi ve bağlam uyumu", 0.4)]
}
G6_DEDICATED[('turkce', 'T.Y.6.21', 0, 0)] = {
    "contextText": "Büyük harflerin yazımı ve kesme işareti.",
    "stimulus": "Cümle: 'arkeologlar 2026 yılının eylül ayında şanlıurfa'daki göbeklitepe ören yerinde yeni bulgulara ulaştı.'",
    "questionText": "Yukarıdaki cümlede yer alan büyük harflerin yazımı hatalarını düzelterek cümlenin doğru halini yeniden yazınız.",
    "solutionExplanation": "Cümle başı büyük, Şanlıurfa, Göbeklitepe Ören Yeri özel isim olduğu için büyük yazılır.",
    "modelAnswer": "Doğru Hali: 'Arkeologlar 2026 yılının eylül ayında Şanlıurfa'daki Göbeklitepe Ören Yeri'nde yeni bulgulara ulaştı.'\n(Düzeltmeler: Cümle başı Arkeologlar, Şanlıurfa, Göbeklitepe Ören Yeri).",
    "rubric": [("Cümle başı ve Şanlıurfa düzeltmesi", 0.5), ("Göbeklitepe Ören Yeri büyük harf ve kesme işareti düzeltmesi", 0.5)]
}

# Senaryo 2: Nasreddin Hoca ve Kazan Doğurdu
G6_DEDICATED[('turkce', 'T.O.6.6', 1, 0)] = {
    "contextText": "Nasreddin Hoca fıkrasının ana fikri.",
    "stimulus": "Nasreddin Hoca komşusundan ödünç aldığı kazanı geri verirken içine küçük bir tencere koyar. Komşusu şaşırınca 'Müjde komşu, kazanın doğurdu!' der ve komşusu sevinçle kabul eder. Bir süre sonra Hoca kazanı tekrar ister. Ancak haftalar geçer kazan gelmez. Komşu kazanı isteyince Hoca: 'Başın sağ olsun komşu, senin kazan öldü!' der. Komşu öfkeyle 'Hocam hiç kazan ölür mü?' diye bağırınca Hoca taşı gediğine koyar: 'Doğurduğuna inandın da öldüğüne niye inanmıyorsun?'",
    "questionText": "Nasreddin Hoca'nın bu fıkrada komşusuna ve okuyucuya vermek istediği temel ahlaki mesajı (ana fikri) yazınız.",
    "solutionExplanation": "İşine gelince mantıksız bir kârı kabul eden, zarara da katlanmalıdır; dürüstlükten şaşılmamalıdır.",
    "modelAnswer": "Fıkranın ana fikri: Kendi çıkarına ve menfaatine uygun düştüğünde akıl ve mantık dışı durumları kabullenen insanlar, işlerine gelmeyen olumsuz sonuçlarla karşılaştıklarında itiraz etme hakkına sahip olamazlar; insan menfaatinde de dürüst ve tutarlı olmalıdır.",
    "rubric": [("Çıkar ve dürüstlük çelişkisi ana fikrinin doğru ifadesi", 1.0)]
}
G6_DEDICATED[('turkce', 'T.O.6.6', 1, 1)] = {
    "contextText": "Fıkradaki komşunun karakter tahlili.",
    "stimulus": "Komşu kazanın doğurduğunu duyunca hiç sorgulamadan küçük tencereyi sahiplenmiş, fakat ölüm haberine şiddetle karşı çıkmıştır.",
    "questionText": "Komşunun bu iki farklı tepkisinden hareketle onun hangi kişilik özelliğine (zaafına) sahip olduğunu tek bir kavramla yazıp açıklayınız.",
    "solutionExplanation": "Açgözlülük, menfaatçilik veya tutarsızlık.",
    "modelAnswer": "Kişilik Zaafı: Açgözlülük (veya Menfaatçilik / Fırsatçılık).\nAçıklama: Kazan gibi cansız bir varlığın doğuramayacağını bildiği halde sırf bedava tencere kazanmak için bu yalana sevinmiş, işine gelince mantığı bir kenara bırakmıştır.",
    "rubric": [("Açgözlülük/fırsatçılık kavramının tespiti", 0.5), ("Komşunun çıkar ilişkisi tutarsızlığının açıklanması", 0.5)]
}
G6_DEDICATED[('turkce', 'T.O.6.16', 1, 0)] = {
    "contextText": "Fıkranın anahtar kelimeleri.",
    "stimulus": "Fıkra kazan, doğum, ölüm, menfaat ve adalet kavramları etrafında gelişmektedir.",
    "questionText": "Nasreddin Hoca'nın kazan fıkrasını en iyi özetleyen 3 anahtar kelimeyi yazınız.",
    "solutionExplanation": "Kazan, menfaat, adalet (veya doğurmak, dürüstlük).",
    "modelAnswer": "1. Kazan\n2. Menfaat (Çıkar)\n3. Dürüstlük (veya Adalet / Nükte)",
    "rubric": [("Üç anahtar kelimenin doğru yazılması", 1.0)]
}
G6_DEDICATED[('turkce', 'T.O.6.21', 1, 0)] = {
    "contextText": "Deyim tahlili: 'taşı gediğine koymak'.",
    "stimulus": "Fıkrada Nasreddin Hoca komşusuna cevap verirken 'taşı gediğine koymuştur'.",
    "questionText": "'Taşı gediğine koymak' deyiminin anlamını açıklayarak metindeki olayla nasıl örtüştüğünü belirtiniz.",
    "solutionExplanation": "Sözü tam zamanında, yerinde ve susturucu şekilde söylemek.",
    "modelAnswer": "• Anlamı: Gereken sözü tam yerinde, zamanında ve muhatabını itiraz edemeyecek şekilde susturacak ustalıkla söylemek demektir.\n• Metinle Örtüşmesi: Hoca, komşusunun açgözlülüğünü 'Doğurduğuna inandın da öldüğüne niye inanmıyorsun?' diyerek en can alıcı noktadan vurmuş ve komşusunu cevapsız bırakmıştır.",
    "rubric": [("Deyimin doğru tanımı", 0.5), ("Hoca'nın komşuyu susturmasıyla bağ kurulması", 0.5)]
}
G6_DEDICATED[('turkce', 'T.Y.6.3', 1, 0)] = {
    "contextText": "Metne uygun başlık belirleme.",
    "stimulus": "Okuduğunuz fıkra mizah yoluyla insanlardaki açgözlülük zaafını yermektedir.",
    "questionText": "Bu fıkraya içeriğin nükteli yönünü yansıtan 2 farklı özgün başlık önerisi yazınız.",
    "solutionExplanation": "Başlık içerikle ve nükteyle uyumlu olmalıdır.",
    "modelAnswer": "1. Başlık: Kazan Doğurur da Ölmez mi?\n2. Başlık: Açgözlü Komşunun Dersi (veya Menfaatin Sonu)",
    "rubric": [("İki özgün ve içerikle tam uyumlu başlık önerisi", 1.0)]
}
G6_DEDICATED[('turkce', 'T.Y.6.21', 1, 0)] = {
    "contextText": "Noktalama işaretleri: konuşma çizgisi, ünlem ve soru işareti.",
    "stimulus": "Diyalog: '— Hocam hiç kazan ölür mü ( ) — Doğurduğuna inandın da öldüğüne niye inanmıyorsun ( )'",
    "questionText": "Yukarıdaki konuşmada parantez ile gösterilen yerlere sırasıyla hangi noktalama işaretleri getirilmelidir?",
    "solutionExplanation": "İlk parantez soru işareti (?), ikinci parantez soru işareti veya soru vurgulu ünlem (? / !).",
    "modelAnswer": "1. Parantez: Soru işareti (?)\n2. Parantez: Soru işareti (?) (veya şaşkınlık/vurgu için soru ve ünlem ?!)\nSırasıyla: (?, ?)",
    "rubric": [("Birinci paranteze soru işareti konulması", 0.5), ("İkinci paranteze soru işareti konulması", 0.5)]
}

# Senaryo 3: Mavi Balinaların Şarkıları
G6_DEDICATED[('turkce', 'T.O.6.5', 2, 0)] = {
    "contextText": "Bilimsel metinde kelime anlamı tahmini.",
    "stimulus": "Dünyanın en cüsseli canlıları olan mavi balinalar, okyanusun karanlık derinliklerinde kilometrelerce uzağa ulaşabilen düşük frekanslı melodik sesler çıkarırlar. Bilim insanları bu gizemli şarkıların sürünün diğer üyeleriyle rezonans kurarak iletişim sağladığını ve göç rotalarını tayin ettiğini keşfetmiştir.",
    "questionText": "Metinde geçen 'cüsseli' ve 'frekans' kelimelerinin metnin bağlamından hareketle anlamlarını tahmin ediniz.",
    "solutionExplanation": "Cüsseli: Çok iri, devasa gövdeli. Frekans: Titreşim sıklığı, ses dalgası hızı.",
    "modelAnswer": "• Cüsseli: İri yapılı, devasa gövdeye sahip, heybetli.\n• Frekans: Ses veya dalgaların bir saniyedeki titreşim sayısı/sıklığı.",
    "rubric": [("Cüsseli sözcüğünün doğru tahmini", 0.5), ("Frekans sözcüğünün doğru tahmini", 0.5)]
}
G6_DEDICATED[('turkce', 'T.O.6.6', 2, 0)] = {
    "contextText": "Mavi balina metninin konusu.",
    "stimulus": "Metinde mavi balinaların okyanus derinliklerinde çıkardıkları sesler, frekansları ve iletişim amaçları anlatılmaktadır.",
    "questionText": "Mavi balinaların okyanus derinliklerindeki iletişimini anlatan yukarıdaki metnin konusunu tek bir cümleyle yazınız.",
    "solutionExplanation": "Mavi balinaların su altındaki melodik sesleri ve ses dalgalarıyla iletişim kurması.",
    "modelAnswer": "Metnin konusu, mavi balinaların okyanusun derinliklerinde çıkardıkları düşük frekanslı melodik seslerin özellikleri ve bu seslerin iletişimdeki rolüdür.",
    "rubric": [("Mavi balinaların sesleri ve iletişimini kapsayan konu cümlesi", 1.0)]
}
G6_DEDICATED[('turkce', 'T.O.6.16', 2, 0)] = {
    "contextText": "Bilgilendirici metinde anahtar kelimeler.",
    "stimulus": "Metin mavi balina, okyanus, ses dalgası ve göç rotası etrafında şekillenmektedir.",
    "questionText": "Mavi balinaların anlatıldığı metnin içeriğini en iyi yansıtan 3 anahtar kelimeyi yazınız.",
    "solutionExplanation": "Mavi balina, frekans, okyanus (veya ses, iletişim).",
    "modelAnswer": "1. Mavi balina\n2. Ses dalgası (Frekans)\n3. Okyanus (İletişim)",
    "rubric": [("Üç anahtar kelimenin doğru yazılması", 1.0)]
}
G6_DEDICATED[('turkce', 'T.O.6.21', 2, 0)] = {
    "contextText": "Eş anlamlı sözcükler: 'rota' ve 'rota tayini'.",
    "stimulus": "Metinde balinaların göç ederken rotalarını belirlediği ifade edilmektedir.",
    "questionText": "'Rota' sözcüğünün Türkçe eş anlamlısını yazarak bir cümlede kullanınız.",
    "solutionExplanation": "Rota = güzergâh, yol.",
    "modelAnswer": "• Eş Anlamlısı: Güzergâh (veya izlenen yol).\n• Cümle: 'Kaptan fırtına sebebiyle geminin rotasını güvenli bir koya doğru çevirdi.'",
    "rubric": [("Eş anlamlı sözcüğün (güzergâh/yol) doğru yazılması", 0.5), ("Cümle içinde kurallı ve anlamına uygun kullanımı", 0.5)]
}
G6_DEDICATED[('turkce', 'T.Y.6.18', 2, 0)] = {
    "contextText": "Atasözü kullanımı: 'Denize düşen yılana sarılır'.",
    "stimulus": "Zor duruma düşen bir canlının çaresizlik anındaki tutumunu anlatan atasözleri vardır.",
    "questionText": "'Denize düşen yılana sarılır' atasözünün anlamını bir cümleyle açıklayınız.",
    "solutionExplanation": "Güç bir durumda kalan kimse, kendini kurtarmak için her türlü tehlikeli veya sevilmeyen çareye başvurur.",
    "modelAnswer": "Çok büyük bir tehlike ve çaresizlik içinde kalan insan, o zor durumdan kurtulabilmek için normalde asla başvurmayacağı tehlikeli, sakıncalı veya hoşlanmadığı yollara dahi çaresizce tutunur.",
    "rubric": [("Çaresizlik ve tehlikeli çareye başvurma anlamının açıklanması", 1.0)]
}
G6_DEDICATED[('turkce', 'T.Y.6.21', 2, 0)] = {
    "contextText": "Sayıların yazımı ve eklerin ayrılması.",
    "stimulus": "Cümle: 'Mavi balinaların kalbi dakikada sadece 4 ile 8 kez çarpar ve ağırlığı 180'kg'a kadar ulaşır.'",
    "questionText": "Cümledeki '180'kg'a' ifadesinde yapılan yazım ve noktalama hatasını düzelterek doğrusunu yazınız.",
    "solutionExplanation": "Kısaltmalardan sonra nokta konulmazsa kesme işareti gelir, ancak kg küçük harflidir ve 180 kg'a şeklinde yazılır.",
    "modelAnswer": "• Hata: Sayı ile kısaltma arasına kesme işareti konulup ardından tekrar kesme işareti getirilmesi hatalıdır.\n• Doğrusu: '180 kg'a' (veya açık yazılışıyla '180 kilograma') şeklinde yazılmalıdır.",
    "rubric": [("Hatalı yazımın tespiti", 0.5), ("Doğru yazımın ('180 kg'a') kuralıyla gösterilmesi", 0.5)]
}

# Senaryo 4: Kuş Evleri ve Osmanlı Merhameti
G6_DEDICATED[('turkce', 'T.O.6.6', 3, 0)] = {
    "contextText": "Kuş evleri metninin ana fikri.",
    "stimulus": "Osmanlı mimarisinde camilerin, medreselerin ve köprülerin rüzgâr almayan güneşli cephelerine taştan ve ahşaptan zarif kuş köşkleri inşa edilmiştir. Bu minik saraylar sayesinde serçeler, güvercinler ve kırlangıçlar kışın dondurucu soğuğundan ve yırtıcı hayvanlardan korunmuştur. Ecdadımız bu eserlerle canlılara merhamet etmeyi mimari bir zarafete dönüştürmüştür.",
    "questionText": "Kuş evlerini ve ecdadımızın merhametini anlatan yukarıdaki metnin ana fikrini yazınız.",
    "solutionExplanation": "Gerçek medeniyet ve gelişmişlik, dilsiz hayvanlara ve tüm canlılara gösterilen şefkat ve koruma zarafetiyle ölçülür.",
    "modelAnswer": "Metnin ana fikri: Gerçek insanlık ve medeniyet, yalnızca insanları değil doğadaki en savunmasız dilsiz canlıları da şefkatle korumak, onlara merhamet göstermeyi mimari ve kültürel bir sorumluluk bilmektir.",
    "rubric": [("Canlılara merhamet ve mimari zarafet ana fikrinin doğru ifadesi", 1.0)]
}
G6_DEDICATED[('turkce', 'T.O.6.6', 3, 1)] = {
    "contextText": "Kuş evlerinin mimari konumu.",
    "stimulus": "Metne göre mimarlar kuş evlerini yapıların rastgele bir yerine değil, rüzgâr almayan ve güneş gören yüksek duvarlarına yerleştirmişlerdir.",
    "questionText": "Kuş evlerinin özellikle 'rüzgâr almayan ve yüksek' yerlere yapılmasının 2 mantıksal gerekçesini açıklayınız.",
    "solutionExplanation": "Kışın soğuk fırtınalardan korumak ve kediler gibi yırtıcıların ulaşmasını engellemek.",
    "modelAnswer": "1. Rüzgâr almayan cephe: Kuşları kış aylarının dondurucu poyrazından ve fırtınasından koruyarak yuvalarının sıcak kalmasını sağlamak.\n2. Yüksek duvarlar: Sokaktaki kedi, köpek gibi avcı hayvanların ve kötü niyetli insanların kuşlara ulaşmasını engellemek.",
    "rubric": [("Rüzgar ve soğuktan koruma gerekçesi", 0.5), ("Yırtıcı hayvanlardan koruma yüksekliği gerekçesi", 0.5)]
}
G6_DEDICATED[('turkce', 'T.O.6.21', 3, 0)] = {
    "contextText": "Eş anlamlı sözcükler: 'merhamet' ve 'zarif'.",
    "stimulus": "Metindeki kavramlar: 'merhamet' ve 'zarif'.",
    "questionText": "Aşağıdaki kelimelerin eş anlamlılarını yazınız:\n• merhamet: ............................\n• zarif: ............................",
    "solutionExplanation": "merhamet = acıma, şefkat. zarif = ince, narin.",
    "modelAnswer": "• merhamet: şefkat (veya acıma duygusu)\n• zarif: narin (veya ince / estetik)",
    "rubric": [("Merhamet eş anlamlısı", 0.5), ("Zarif eş anlamlısı", 0.5)]
}
G6_DEDICATED[('turkce', 'T.O.6.21', 3, 1)] = {
    "contextText": "Zıt anlamlı sözcükler: 'savunmasız' ve 'yüksek'.",
    "stimulus": "Metindeki kelimelerin karşıtları.",
    "questionText": "Aşağıdaki kelimelerin zıt anlamlılarını yazınız:\n• savunmasız: ............................\n• yüksek: ............................",
    "solutionExplanation": "savunmasız -> korunaklı/güçlü, yüksek -> alçak.",
    "modelAnswer": "• savunmasız: korunaklı (veya güçlü / dayanıklı)\n• yüksek: alçak",
    "rubric": [("Savunmasız zıt anlamlısı", 0.5), ("Yüksek zıt anlamlısı", 0.5)]
}
G6_DEDICATED[('turkce', 'T.Y.6.3', 3, 0)] = {
    "contextText": "Metin taslağı ve düşünceyi geliştirme yolları.",
    "stimulus": "Kuş evleri metninde yazar düşüncesini inandırıcı kılmak için serçelerden, camilerden ve mimari ayrıntılardan somut kanıtlar vermiştir.",
    "questionText": "Yazarın düşüncesini somutlaştırmak için başvurduğu 'örnekleme' yöntemini metinden 1 cümle göstererek açıklayınız.",
    "solutionExplanation": "Camiler, medreseler, köprüler ve serçeler, güvercinler örnek verilmiştir.",
    "modelAnswer": "Yazar, Osmanlı yapılarındaki kuş evlerini açıklarken 'camilerin, medreselerin ve köprülerin duvarları' ile 'serçeler, güvercinler ve kırlangıçlar' gibi somut türleri sıralayarak 'örnekleme' düşünceyi geliştirme yolunu kullanmıştır.",
    "rubric": [("Örnekleme yönteminin doğru tespiti", 0.5), ("Metinden somut örneklerle desteklenmesi", 0.5)]
}
G6_DEDICATED[('turkce', 'T.Y.6.21', 3, 0)] = {
    "contextText": "Noktalı virgül (;) ve virgül (,) kullanımı.",
    "stimulus": "Cümle: 'İstanbul'da Üsküdar Ayazma Camii, Yeni Cami kuş evleriyle ünlüdür; Bursa'da ise Ulu Cami, Yeşil Türbe bu geleneği yaşatır.'",
    "questionText": "Yukarıdaki cümlede iki farklı şehri ve yapıları birbirine bağlayan 'noktalı virgülün (;)' kullanılma sebebini açıklayınız.",
    "solutionExplanation": "Ögeleri arasında virgül bulunan sıralı cümleleri birbirinden ayırmak için kullanılır.",
    "modelAnswer": "Cümlede İstanbul yapıları kendi arasında virgülle, Bursa yapıları da kendi arasında virgülle ayrılmıştır. Ögeleri arasında virgül bulunan iki bağımsız cümleyi birbirinden ayırmak için araya 'noktalı virgül' konulmuştur.",
    "rubric": [("Ögeleri arasında virgül bulunan sıralı cümleleri ayırma kuralının yazılması", 1.0)]
}

# Senaryo 5: Kaşgarlı Mahmud ve Divânu Lugâti't-Türk
G6_DEDICATED[('turkce', 'T.O.6.6', 4, 0)] = {
    "contextText": "Divânu Lugâti't-Türk metninin konusu.",
    "stimulus": "11. yüzyılda Kaşgarlı Mahmud, Türk boylarını adım adım gezerek Türkçe kelimeleri, atasözlerini ve şiirleri derlemiş; Türkçenin Arapça kadar zengin ve üstün bir dil olduğunu göstermek için ilk Türkçe sözlük olan 'Divânu Lugâti't-Türk'ü yazmıştır. Kitabın sonuna ilk Türk dünyası haritasını da eklemiştir.",
    "questionText": "Kaşgarlı Mahmud'un bu devasa eserini anlatan metnin konusunu tek bir cümleyle özetleyiniz.",
    "solutionExplanation": "Kaşgarlı Mahmud'un Divânu Lugâti't-Türk'ü yazma amacı ve eserin dilimiz açısından önemi.",
    "modelAnswer": "Metnin konusu, Kaşgarlı Mahmud'un Türkçenin zenginliğini kanıtlamak amacıyla Türk boylarını gezerek hazırladığı ilk Türkçe sözlük olan Divânu Lugâti't-Türk'ün yazılış serüveni ve kültürel değeridir.",
    "rubric": [("Kaşgarlı Mahmud ve Divânu Lugâti't-Türk'ü kapsayan doğru konu cümlesi", 1.0)]
}
G6_DEDICATED[('turkce', 'T.O.6.6', 4, 1)] = {
    "contextText": "Eserin yazılış amacı.",
    "stimulus": "Kaşgarlı Mahmud eserinin önsözünde Türkçenin gücünü ve Araplara Türkçeyi öğretme niyetini vurgular.",
    "questionText": "Kaşgarlı Mahmud'un bu eseri kaleme almasındaki 2 temel hedefi metinden hareketle yazınız.",
    "solutionExplanation": "1. Türkçenin Arapça kadar zengin olduğunu kanıtlamak. 2. Araplara Türkçeyi öğretmek ve Türk kültürünü tanıtmak.",
    "modelAnswer": "1. Türkçenin en az Arapça kadar zengin, kurallı ve üstün bir edebiyat dili olduğunu ispatlamak.\n2. Araplara Türk dilini öğretmek ve Türk boylarının atasözlerini, geleneklerini ve coğrafyasını tanıtmak.",
    "rubric": [("Türkçenin zenginliğini ispatlama hedefi", 0.5), ("Türkçeyi öğretme ve kültürü tanıtma hedefi", 0.5)]
}
G6_DEDICATED[('turkce', 'T.O.6.16', 4, 0)] = {
    "contextText": "Divânu Lugâti't-Türk anahtar kelimeleri.",
    "stimulus": "Metin sözlük, Kaşgarlı Mahmud, Türk dili ve ilk harita etrafında şekillenmektedir.",
    "questionText": "Bu metnin içeriğini en iyi özetleyen 3 anahtar kelimeyi yazınız.",
    "solutionExplanation": "Kaşgarlı Mahmud, sözlük, Türk dili.",
    "modelAnswer": "1. Kaşgarlı Mahmud\n2. Divânu Lugâti't-Türk (Sözlük)\n3. Türk dili (Kültür)",
    "rubric": [("Üç anahtar kelimenin doğru yazılması", 1.0)]
}
G6_DEDICATED[('turkce', 'T.O.6.21', 4, 0)] = {
    "contextText": "Deyim tahlili: 'gönül vermek'.",
    "stimulus": "Kaşgarlı Mahmud ömrünü Türk diline ve kültürüne gönül vermiş bir bilgindir.",
    "questionText": "'Gönül vermek' deyiminin anlamını açıklayarak Kaşgarlı Mahmud'un çalışmalarına nasıl uyduğunu belirtiniz.",
    "solutionExplanation": "Bir şeye içten sevgi ve tutkuyla bağlanmak.",
    "modelAnswer": "• Anlamı: Bir işe, davaya veya kişiye büyük bir sevgi, tutku ve içtenlikle bağlanmak demektir.\n• Uyumu: Kaşgarlı Mahmud yıllarca at sırtında diyar diyar gezerek zorluklara katlanmış, dilini derin bir sevgi ve fedakârlıkla derlemiştir.",
    "rubric": [("Deyimin doğru tanımı", 0.5), ("Kaşgarlı Mahmud'un dil sevgisiyle örtüşmesinin açıklanması", 0.5)]
}
G6_DEDICATED[('turkce', 'T.O.6.21', 4, 1)] = {
    "contextText": "Eş anlamlı kelimeler: 'eser' ve 'amaç'.",
    "stimulus": "Metindeki kavramlar: 'eser' ve 'amaç'.",
    "questionText": "Aşağıdaki kelimelerin metindeki anlamına uygun eş anlamlılarını yazınız:\n• eser: ............................\n• amaç: ............................",
    "solutionExplanation": "eser = yapıt, amaç = gaye / hedef.",
    "modelAnswer": "• eser: yapıt\n• amaç: gaye (veya hedef / maksat)",
    "rubric": [("Eser eş anlamlısı", 0.5), ("Amaç eş anlamlısı", 0.5)]
}
G6_DEDICATED[('turkce', 'T.Y.6.3', 4, 0)] = {
    "contextText": "Metne uygun başlık önerisi.",
    "stimulus": "Metin Türkçenin ilk sözlüğünü ve yazarının fedakârlığını anlatmaktadır.",
    "questionText": "Bu metne içerikle tam uyumlu 2 farklı özgün başlık önerisi yazınız.",
    "solutionExplanation": "Başlık içerikle uyumlu olmalıdır.",
    "modelAnswer": "1. Başlık: Türkçenin İlk Anıtı: Divânu Lugâti't-Türk\n2. Başlık: Dilimizin Büyük Bilgesi Kaşgarlı Mahmud",
    "rubric": [("İki özgün ve içerikle uyumlu başlık önerisi", 1.0)]
}
G6_DEDICATED[('turkce', 'T.Y.6.21', 4, 0)] = {
    "contextText": "Kitap ve eser adlarının yazımı.",
    "stimulus": "Cümle: 'Öğretmenimiz derste kaşgarlı mahmud'un divânu lugâti't-türk adlı eserini tanıttı.'",
    "questionText": "Cümledeki kişi ve eser adlarının yazımındaki hataları düzelterek cümlenin doğrusunu yazınız.",
    "solutionExplanation": "Kaşgarlı Mahmud'un ve Divânu Lugâti't-Türk tırnak içinde veya eğik yazıyla büyük harflerle yazılır.",
    "modelAnswer": "Doğru Hali: 'Öğretmenimiz derste Kaşgarlı Mahmud'un \"Divânu Lugâti't-Türk\" adlı eserini tanıttı.'\n(Kişi adı Kaşgarlı Mahmud büyük harfle, eser adı tırnak içinde ve her kelimesi büyük harfle yazılır).",
    "rubric": [("Kişi adının büyük harfle yazımı", 0.5), ("Eser adının büyük harf ve tırnak içinde yazımı", 0.5)]
}

# Senaryo 6: Kutup Işıkları (Aurora Borealis)
G6_DEDICATED[('turkce', 'T.O.6.5', 5, 0)] = {
    "contextText": "Kutup Işıkları metninde kelime anlamı tahmini.",
    "stimulus": "Kuzey Kutup bölgesinde geceleri gökyüzünü yeşil, mor ve pembe ışık dalgalarıyla dans ettiren doğa olayına 'Kutup Işıkları' (Aurora Borealis) denir. Güneş'ten fırlatılan yüklü parçacıklar Dünya'nın manyetik kalkanıyla etkileşime girdiğinde ortaya çıkan bu büyüleyici şölen, gökyüzünde adeta ışıklı bir perde gibi dalgalanır.",
    "questionText": "Metinde geçen 'büyüleyici' ve 'etkileşim' sözcüklerinin anlamlarını metnin bağlamından tahmin ederek yazınız.",
    "solutionExplanation": "Büyüleyici: İnsanı hayran bırakan, çok etkileyici. Etkileşim: İki maddenin veya olayın birbirini etkilemesi.",
    "modelAnswer": "• Büyüleyici: İnsanı derinden etkileyen, hayranlık ve hayret uyandıran, çok güzel.\n• Etkileşim: Birbirini karşılıklı olarak etkileyen iki nesne veya kuvvet arasındaki temas ve bağ.",
    "rubric": [("Büyüleyici sözcüğünün doğru tahmini", 0.5), ("Etkileşim sözcüğünün doğru tahmini", 0.5)]
}
G6_DEDICATED[('turkce', 'T.O.6.6', 5, 0)] = {
    "contextText": "Kutup Işıkları metninin konusu.",
    "stimulus": "Metinde Kutup Işıklarının oluşumu, Güneş parçacıklarının Dünya'nın manyetik alanıyla teması ve gökyüzündeki renkli görüntüsü anlatılmaktadır.",
    "questionText": "Gökyüzündeki bu renk cümbüşünü anlatan yukarıdaki metnin konusunu tek bir cümleyle yazınız.",
    "solutionExplanation": "Kutup Işıklarının (Aurora) oluşumu ve gökyüzündeki büyüleyici görsel şöleni.",
    "modelAnswer": "Metnin konusu, Güneş parçacıklarının Dünya'nın manyetik kalkanıyla etkileşimi sonucu kutup bölgelerinde oluşan Kutup Işıklarının (Aurora) meydana gelişi ve görsel özellikleridir.",
    "rubric": [("Kutup Işıkları oluşumu ve görsel özelliklerini kapsayan konu cümlesi", 1.0)]
}
G6_DEDICATED[('turkce', 'T.O.6.6', 5, 1)] = {
    "contextText": "Işıkların oluşma mekanizması (Neden-sonuç).",
    "stimulus": "Metne göre Kutup Işıkları Güneş'ten gelen parçacıklar ile Dünya'nın manyetik alanı arasındaki temas sonucu oluşur.",
    "questionText": "Kutup Işıklarının oluşumundaki neden-sonuç ilişkisini metne dayanarak 1 cümleyle açıklayınız.",
    "solutionExplanation": "Güneş'ten fırlatılan yüklü parçacıkların Dünya'nın manyetik alanına çarpması sonucunda gökyüzünde renkli ışımalar oluşur.",
    "modelAnswer": "Güneş'ten uzaya fırlatılan yüklü parçacıkların Dünya'nın kutup bölgelerindeki manyetik kalkanına çarpıp atmosferdeki gazlarla etkileşime girmesi (neden), gökyüzünde rengarenk dans eden ışıkların parlamasına (sonuç) yol açar.",
    "rubric": [("Neden unsurunun (Güneş parçacıkları ve manyetik alan) doğru tespiti", 0.5), ("Sonuç unsurunun (gökyüzünde renkli ışık oluşumu) açıklanması", 0.5)]
}
G6_DEDICATED[('turkce', 'T.O.6.16', 5, 0)] = {
    "contextText": "Metnin anahtar kelimeleri.",
    "stimulus": "Metin Kutup Işıkları, manyetik alan ve Güneş parçacıkları etrafında şekillenmektedir.",
    "questionText": "Kutup Işıklarını anlatan bu metnin içeriğini en iyi özetleyen 3 anahtar kelimeyi yazınız.",
    "solutionExplanation": "Kutup Işıkları (Aurora), manyetik alan, Güneş parçacıkları.",
    "modelAnswer": "1. Kutup Işıkları (Aurora Borealis)\n2. Manyetik alan (Kalkan)\n3. Güneş parçacıkları",
    "rubric": [("Üç anahtar kelimenin doğru yazılması", 1.0)]
}
G6_DEDICATED[('turkce', 'T.O.6.21', 5, 0)] = {
    "contextText": "Benzetme sanatı (Teşbih).",
    "stimulus": "Metinde Kutup Işıkları için 'gökyüzünde adeta ışıklı bir perde gibi dalgalanır' ifadesi kullanılmıştır.",
    "questionText": "Bu cümledeki benzetme sanatının benzeyen ve benzetilen unsurlarını yazınız:\n• Benzeyen: .................................\n• Benzetilen: .................................",
    "solutionExplanation": "Benzeyen: Kutup Işıkları, Benzetilen: Işıklı perde.",
    "modelAnswer": "• Benzeyen: Kutup Işıkları (ışık dalgaları)\n• Benzetilen: Işıklı perde (kumaş perde)",
    "rubric": [("Benzeyenin doğru tespiti", 0.5), ("Benzetilenin doğru tespiti", 0.5)]
}
G6_DEDICATED[('turkce', 'T.Y.6.18', 5, 0)] = {
    "contextText": "Deyim kullanımı: 'gözlerini alamamak'.",
    "stimulus": "'Gözlerini alamamak' deyimi hayranlıkla ve büyülenerek uzun süre bir şeye bakakalmak demektir.",
    "questionText": "'Gözlerini alamamak' deyimini Kutup Işıklarını izleyen bir turistin heyecanını anlatacak şekilde anlamlı bir cümlede kullanınız.",
    "solutionExplanation": "Deyimin anlamına uygun cümlede kullanımı.",
    "modelAnswer": "Örnek Cümle: 'Norveç'te gece yarısı gökyüzünde yeşil ve mor renklerle dans eden kutup ışıklarını gören turistler, saatlerce büyülenmiş gibi gökyüzünden gözlerini alamadılar.'",
    "rubric": [("Deyimin anlamına uygun kullanımı", 0.6), ("Cümlenin akıcılığı ve dil bilgisi uyumu", 0.4)]
}
G6_DEDICATED[('turkce', 'T.Y.6.21', 5, 0)] = {
    "contextText": "Kısaltmaların ve eklerin yazımı.",
    "stimulus": "Cümle: 'TÜBİTAK'ın kutup araştırmaları ekibi norveç'in tromso şehrinde inceleme yaptı.'",
    "questionText": "Cümledeki büyük harf ve kısaltmalara getirilen eklerin yazımı kurallarını kontrol ederek yapılan 2 hatayı düzeltip yazınız.",
    "solutionExplanation": "TÜBİTAK'ın değil TÜBİTAK'ın (okunuşa göre TÜBİTAK'ın doğru), Norveç ve Tromsø büyük harfle yazılır.",
    "modelAnswer": "1. Hata ve Düzeltme: 'norveç'in' değil, özel ülke adı olduğu için 'Norveç'in' şeklinde büyük harfle yazılmalıdır.\n2. Hata ve Düzeltme: 'tromso' değil, yabancı şehir adı olduğu için 'Tromso' şeklinde büyük harfle başlamalıdır.",
    "rubric": [("Norveç'in büyük harfle düzeltilmesi", 0.5), ("Tromso şehir adının büyük harfle düzeltilmesi", 0.5)]
}

print("Grade 6 Türkçe dedicated questions registered!")
