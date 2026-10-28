# -*- coding: utf-8 -*-
import json
from collections import defaultdict

with open('meb_data/clean_middle_school_matrix.json', 'r', encoding='utf-8') as f:
    matrix = json.load(f)

with open('meb_data/grade5_turkce_distinct.json', 'r', encoding='utf-8') as f:
    g5_turkce_exams = json.load(f)

# Helper for distributing points exactly to 100
def distribute_points(count):
    base = 100 // count
    rem = 100 % count
    return [base + (1 if i < rem else 0) for i in range(count)]

# Load the dedicated dictionary we already started
from build_grade5_perfect_distinct import G5_DEDICATED

# Now let's populate all remaining tuples for Fen, Sosyal, Din, İngilizce

# =====================================================================
# GRADE 5 FEN BİLİMLERİ DEDICATED (4 Scenarios)
# =====================================================================
# Senaryo 1 (7 Qs)
G5_DEDICATED[('fen_bilimleri', 'FB.5.1.2', 0, 0)] = {
    "contextText": "Ay'ın dönme ve dolanma sürelerinin eşitliği.",
    "stimulus": "Dünya'dan gökyüzüne bakan bir insan hangi tarihte bakarsa baksın Ay'ın hep aynı yüzey şekillerini (aynı yüzünü) görür.",
    "questionText": "Dünya'dan bakıldığında Ay'ın hep aynı yüzünün görülmesinin bilimsel gerekçesini Ay'ın dönme ve dolanma süreleri bakımından açıklayınız.",
    "solutionExplanation": "Ay'ın kendi etrafında dönme süresi ile Dünya etrafında dolanma süresi yaklaşık 27.3 gün olup birbirine eşittir.",
    "modelAnswer": "Ay'ın kendi ekseni etrafında dönme süresi ile Dünya etrafındaki dolanma süresi birbirine eşittir (yaklaşık 27,3 gün). Bu hareketlerin eşzamanlı olması sebebiyle Dünya'ya bakan yüzü hiçbir zaman değişmez.",
    "rubric": [("Dönme ve dolanma sürelerinin (~27.3 gün) eşitliğinin yazılması", 0.55), ("Eşzamanlılık sebebiyle hep aynı yüzün görüldüğünün gerekçelendirilmesi", 0.45)]
}
G5_DEDICATED[('fen_bilimleri', 'FB.5.1.2', 0, 1)] = {
    "contextText": "Ay'ın atmosferi ve krater oluşumu.",
    "stimulus": "Teleskopla incelendiğinde Ay yüzeyinde gök taşlarının çarpmasıyla oluşmuş binlerce derin çukur (krater) görülür.",
    "questionText": "Ay'da kraterlerin çok fazla olmasının ve milyarlarca yıldır silinmeden kalmasının temel nedenini atmosfer ve hava olayları açısından açıklayınız.",
    "solutionExplanation": "Atmosfer yok denecek kadar incedir, meteorlar yanmadan çarpar ve hava olayları olmadığı için aşınmaz.",
    "modelAnswer": "Ay'da yok denecek kadar ince bir atmosfer vardır. Bu nedenle uzaydan gelen gök taşları sürtünmeyle yanmadan doğrudan yüzeye çarparak krater oluşturur; ayrıca rüzgar ve yağmur gibi hava olayları olmadığı için bu kraterler silinmeden korunur.",
    "rubric": [("İnce atmosfer sebebiyle meteorların yanmadan çarpması", 0.5), ("Hava olayları olmaması sebebiyle kraterlerin silinmemesi", 0.5)]
}
G5_DEDICATED[('fen_bilimleri', 'FB.5.1.3', 0, 0)] = {
    "contextText": "Ay'ın ana evreleri sıralaması.",
    "stimulus": "Ay'ın Dünya etrafındaki dolanımı sırasında gökyüzündeki görünümü periyodik olarak değişir.",
    "questionText": "Ay'ın 4 ana evresinin isimlerini sırasıyla yazınız ve art arda gelen iki ana evre arasında geçen süreyi belirtiniz.",
    "solutionExplanation": "Yeni Ay, İlk Dördün, Dolunay, Son Dördün. İki ana evre arası yaklaşık 1 haftadır.",
    "modelAnswer": "• Sırasıyla Ana Evreler: 1. Yeni Ay, 2. İlk Dördün, 3. Dolunay, 4. Son Dördün.\n• Geçen Süre: İki ana evre arasında yaklaşık 1 hafta (7 gün) geçer.",
    "rubric": [("Dört ana evrenin doğru sırayla yazımı", 0.6), ("Ana evreler arası sürenin (1 hafta / 7 gün) belirtilmesi", 0.4)]
}
G5_DEDICATED[('fen_bilimleri', 'FB.5.1.3', 0, 1)] = {
    "contextText": "İlk Dördün evresinin özellikleri.",
    "stimulus": "Yeni Ay evresinden yaklaşık bir hafta sonra Ay gökyüzünde yarım daire biçiminde belirir.",
    "questionText": "Bu evrenin adını yazarak, Ay'ın hangi yarısının (sağ mı sol mu) aydınlandığını ve hangi harfe benzediğini açıklayınız.",
    "solutionExplanation": "İlk dördün evresidir, sağ tarafı aydınlıktır ve düz D harfine benzer.",
    "modelAnswer": "• Evrenin Adı: İlk Dördün evresi.\n• Özellikleri: Ay'ın Dünya'ya bakan yüzünün sağ yarısı aydınlıktır ve gökyüzünde düz 'D' harfi şeklinde görünür.",
    "rubric": [("İlk Dördün adının doğru tespiti", 0.5), ("Sağ taraf aydınlık ve düz D harfi açıklamasının yapılması", 0.5)]
}
G5_DEDICATED[('fen_bilimleri', 'FB.5.1.4', 0, 0)] = {
    "contextText": "Güneş, Dünya ve Ay büyüklük modeli.",
    "stimulus": "Öğretmen masaya bir karpuz, bir ceviz ve bir karabiber tanesi koymuştur.",
    "questionText": "Bu üç nesneyi hacimsel büyüklüklerine göre Güneş, Dünya ve Ay ile doğru şekilde eşleştiriniz.",
    "solutionExplanation": "Güneş karpuz, Dünya ceviz, Ay karabiber tanesidir.",
    "modelAnswer": "• Güneş: Karpuz (en büyük gök cismi)\n• Dünya: Ceviz (orta büyüklükte)\n• Ay: Karabiber tanesi (en küçük gök cismi)",
    "rubric": [("Güneş - karpuz eşleştirmesi", 0.4), ("Dünya - ceviz ve Ay - karabiber eşleştirmeleri", 0.6)]
}
G5_DEDICATED[('fen_bilimleri', 'FB.5.1.4', 0, 1)] = {
    "contextText": "Gök cisimlerinin dönme yönleri.",
    "stimulus": "Güneş, Dünya ve Ay uzayda sürekli dönme ve dolanma hareketi yapmaktadır.",
    "questionText": "Kuzey Kutup noktasından bakıldığında Güneş, Dünya ve Ay'ın kendi eksenleri etrafındaki dönme yönü nedir? Saat yönü kavramını kullanarak açıklayınız.",
    "solutionExplanation": "Saat yönünün tersine (batıdan doğuya doğru).",
    "modelAnswer": "Güneş, Dünya ve Ay'ın kendi eksenleri etrafındaki dönme yönü 'saat yönünün tersine' (batıdan doğuya doğru) gerçekleşir.",
    "rubric": [("Saat yönünün tersine ifadesinin doğru yazılması", 0.5), ("Batıdan doğuya dönme yönü gerekçesi", 0.5)]
}
G5_DEDICATED[('fen_bilimleri', 'FB.5.2.1', 0, 0)] = {
    "contextText": "Dinamometre çalışma ilkesi.",
    "stimulus": "Kuvvet ölçümünde kullanılan dinamometrenin içerisinde sarmal bir çelik yay bulunmaktadır.",
    "questionText": "a) Dinamometrenin çalışma prensibi yayın hangi özelliğine dayanır?\nb) Kuvvetin birimi ve sembolü nedir?",
    "solutionExplanation": "Yayın esneklik ve kuvvetle uzama özelliğine dayanır. Birimi Newton (N).",
    "modelAnswer": "a) Dinamometre esnek yayların üzerlerine uygulanan kuvvet miktarıyla doğru orantılı olarak uzaması prensibiyle çalışır.\nb) Kuvvetin birimi 'Newton'dur ve 'N' harfi ile gösterilir.",
    "rubric": [("a şıkkında yay esnekliği ve uzama prensibinin yazılması", 0.5), ("b şıkkında Newton birimi ve 'N' sembolünün yazılması", 0.5)]
}

# Senaryo 2 (7 Qs)
G5_DEDICATED[('fen_bilimleri', 'FB.5.1.2', 1, 0)] = {
    "contextText": "Ay'ın yüzeyinde gece-gündüz sıcaklık farkı.",
    "stimulus": "Ay'da Güneş alan bölgelerde sıcaklık +120°C'ye ulaşırken, Güneş almayan gölge yerlerde -170°C'ye kadar düşmektedir.",
    "questionText": "Ay'daki bu aşırı gece-gündüz sıcaklık farkının nedenini Dünya'nın atmosferi ile karşılaştırarak açıklayınız.",
    "solutionExplanation": "Ay'da ısıyı tutacak ve dağıtacak bir atmosfer yoktur.",
    "modelAnswer": "Ay'da koruyucu bir atmosfer tabakası bulunmadığı için gelen güneş ışınları yüzeyi aşırı ısıtır, gölgede ise ısı hızla uzaya kaçar. Dünya'daki atmosfer ise koruyucu bir sera etkisi yaparak gece ile gündüz sıcaklığını dengeler.",
    "rubric": [("Atmosfer yokluğunun sıcaklık farkına etkisinin açıklanması", 0.5), ("Dünya atmosferinin dengeleyici battaniye rolünün yazılması", 0.5)]
}
G5_DEDICATED[('fen_bilimleri', 'FB.5.1.2', 1, 1)] = {
    "contextText": "Ay'da rüzgar ve hava olaylarının olmaması.",
    "stimulus": "Ay yüzeyine inen uzay araçlarının ve astronotların bıraktığı tekerlek izleri aradan onlarca yıl geçmesine rağmen hiç bozulmamıştır.",
    "questionText": "Bu tekerlek izlerinin ilk günkü gibi kalmasını sağlayan temel doğa şartı nedir? Yazınız.",
    "solutionExplanation": "Hava tabakası olmaması ve rüzgâr/yağmur gibi hava olaylarının görülmemesidir.",
    "modelAnswer": "Ay'da atmosfer bulunmadığı için rüzgâr, fırtına ve yağış gibi aşındırıcı ve süpürücü hava olayları kesinlikle meydana gelmez; bu sayede yüzeydeki izler bozulmadan kalır.",
    "rubric": [("Atmosferin olmamasının belirtilmesi", 0.5), ("Rüzgar ve yağış gibi silici hava olaylarının yaşanmaması gerekçesi", 0.5)]
}
G5_DEDICATED[('fen_bilimleri', 'FB.5.1.3', 1, 0)] = {
    "contextText": "Yeni Ay evresi ve gökyüzü görünümü.",
    "stimulus": "Gökyüzünün bulutsuz ve açık olduğu bazı gecelerde Ay gökyüzünde hiç görünmez.",
    "questionText": "Ay'ın gökyüzünde görülemediği bu ana evrenin adı nedir ve bu sırada Ay'ın Dünya'ya göre konumu nasıldır?",
    "solutionExplanation": "Yeni Ay evresidir. Ay, Güneş ile Dünya arasında yer alır.",
    "modelAnswer": "• Evrenin Adı: Yeni Ay evresidir.\n• Konumu: Ay, Güneş ile Dünya'nın arasında bulunur; aydınlık yüzü Güneş'e, karanlık yüzü ise Dünya'ya dönüktür.",
    "rubric": [("Yeni Ay evresinin doğru teşhisi", 0.5), ("Güneş ile Dünya arasında bulunma konumunun yazılması", 0.5)]
}
G5_DEDICATED[('fen_bilimleri', 'FB.5.1.3', 1, 1)] = {
    "contextText": "Dolunay evresinin özellikleri.",
    "stimulus": "İlk Dördün evresinden yaklaşık bir hafta sonra Ay'ın Dünya'ya bakan yüzü tamamen aydınlık ve parlak bir daire şeklinde görülür.",
    "questionText": "Bu evrenin adını yazınız ve bu evrede Dünya'nın Güneş ile Ay'a göre nerede bulunduğunu belirtiniz.",
    "solutionExplanation": "Dolunay evresidir. Dünya, Güneş ile Ay arasında yer alır.",
    "modelAnswer": "• Evrenin Adı: Dolunay evresidir.\n• Konumu: Dünya, Güneş ile Ay'ın arasında bulunur; bu sayede Güneş ışınları Ay'ın Dünya'ya bakan yüzünün tamamını aydınlatır.",
    "rubric": [("Dolunay evresi adının yazılması", 0.5), ("Dünya'nın Güneş ile Ay arasında bulunma konumunun açıklanması", 0.5)]
}
G5_DEDICATED[('fen_bilimleri', 'FB.5.1.3', 1, 2)] = {
    "contextText": "Son Dördün evresi ve ters D harfi.",
    "stimulus": "Dolunay evresinden bir hafta sonra Ay'ın aydınlık yüzü küçülerek tekrar yarım daire haline gelir.",
    "questionText": "Son Dördün evresinde Ay'ın hangi tarafı (sağ mı sol mu) aydınlıktır ve gökyüzünde hangi harfe benzer?",
    "solutionExplanation": "Sol tarafı aydınlıktır ve ters D harfine benzer.",
    "modelAnswer": "Son Dördün evresinde Ay'ın Dünya'ya bakan yüzünün 'sol yarısı' aydınlıktır ve gökyüzünde ters 'D' harfi şeklinde görünür.",
    "rubric": [("Sol yarının aydınlık olduğunun yazılması", 0.5), ("Ters D harfi benzerliğinin belirtilmesi", 0.5)]
}
G5_DEDICATED[('fen_bilimleri', 'FB.5.1.4', 1, 0)] = {
    "contextText": "Dünya'nın dolanma hareketi ve 1 yıl.",
    "stimulus": "Dünya kendi ekseni etrafında dönerken aynı zamanda Güneş'in etrafındaki yörüngesinde dolanmaktadır.",
    "questionText": "Dünya'nın Güneş etrafında bir tam dolanımını tamamladığı süre ne kadardır ve bu dolanım hangi temel takvim birimini oluşturur?",
    "solutionExplanation": "365 gün 6 saat (1 yıl).",
    "modelAnswer": "Dünya'nın Güneş etrafındaki bir tam dolanım süresi '365 gün 6 saat'tir ve bu süre takvimdeki '1 yıl'ı oluşturur.",
    "rubric": [("365 gün 6 saat süresinin doğru yazılması", 0.5), ("1 yıl takvim biriminin belirtilmesi", 0.5)]
}
G5_DEDICATED[('fen_bilimleri', 'FB.5.1.4', 1, 1)] = {
    "contextText": "Güneş'in Dünya'dan küçük görünmesinin nedeni.",
    "stimulus": "Güneş, Dünya'dan yaklaşık 1 milyon 300 bin kat daha büyük olmasına rağmen gökyüzünde neredeyse Ay ile aynı boyutta görünür.",
    "questionText": "Güneş'in gerçekte devasa olmasına rağmen gökyüzünde küçük bir daire gibi görünmesinin bilimsel nedenini optik/uzaklık ilişkisiyle açıklayınız.",
    "solutionExplanation": "Cisimler gözlemciden uzaklaştıkça görünür büyüklükleri küçülür. Güneş Dünya'ya Ay'dan çok daha uzaktır (~150 milyon km).",
    "modelAnswer": "Cisimler gözlemciden uzaklaştıkça olduklarından daha küçük görünürler. Güneş Dünya'ya yaklaşık 150 milyon kilometre uzaktayken, Ay sadece 384 bin kilometre uzaktadır. Güneş çok uzakta olduğu için gökyüzünde Ay ile benzer büyüklükte küçük bir daire gibi algılanır.",
    "rubric": [("Uzaklaşan cisimlerin küçük görünmesi kuralının yazılması", 0.5), ("Güneş'in Ay'a göre Dünya'ya çok daha uzak olduğunun belirtilmesi", 0.5)]
}

# Senaryo 3 (6 Qs)
G5_DEDICATED[('fen_bilimleri', 'FB.5.1.2', 2, 0)] = {
    "contextText": "Ay'ın geometrik şekli ve yapısı.",
    "stimulus": "Geceleri gökyüzünde parlayan Ay, Dünya'mızın tek doğal uydusudur.",
    "questionText": "Ay'ın geometrik şekli neye benzer? Ay kendi ışığını mı üretir yoksa ışığını nereden alır? Açıklayınız.",
    "solutionExplanation": "Küreye benzer. Işık kaynağı değildir, Güneş'ten aldığı ışığı yansıtır.",
    "modelAnswer": "• Geometrik Şekli: Küreye (yuvarlak bir topa) benzer.\n• Işık Kaynağı: Ay bir ışık kaynağı değildir; Güneş'ten üzerine düşen ışınları ayna gibi Dünya'ya yansıtır.",
    "rubric": [("Küre şeklinin doğru yazılması", 0.5), ("Işık kaynağı olmadığı ve Güneş ışığını yansıttığı bilgisinin açıklanması", 0.5)]
}
G5_DEDICATED[('fen_bilimleri', 'FB.5.1.2', 2, 1)] = {
    "contextText": "Ay'da su ve yaşam şartları.",
    "stimulus": "Bilim insanları Ay'da kalıcı üsler kurmak ve yaşamak için araştırmalar yapmaktadır.",
    "questionText": "Ay yüzeyinde astronotların özel uzay kıyafetleri ve oksijen tüpleri olmadan yaşayamamasının 2 temel nedenini yazınız.",
    "solutionExplanation": "Oksijen/atmosfer yoktur, zararlı uzay radyasyonu ve aşırı sıcaklık farkları vardır.",
    "modelAnswer": "1. Ay'da nefes alacak oksijen gazı ve koruyucu atmosfer tabakasının bulunmaması.\n2. Gece ile gündüz arasındaki ölümcül sıcaklık farkları ve uzaydan gelen zararlı güneş radyasyonundan koruyacak kalkanın olmaması.",
    "rubric": [("Oksijen ve solunabilir atmosfer eksikliğinin yazılması", 0.5), ("Aşırı sıcaklık farkları ve radyasyon tehlikesinin belirtilmesi", 0.5)]
}
G5_DEDICATED[('fen_bilimleri', 'FB.5.1.3', 2, 0)] = {
    "contextText": "Hilal ara evresi.",
    "stimulus": "Yeni Ay evresinden birkaç gün sonra ve Son Dördün evresinden hemen önce gökyüzünde parlak ince bir yay görünür.",
    "questionText": "Türk bayrağımızda da sembolü bulunan bu ara evrenin adı nedir ve gökyüzünde ne şekilde görünür?",
    "solutionExplanation": "Hilal ara evresidir.",
    "modelAnswer": "Bu ara evrenin adı 'Hilal'dir. Gökyüzünde ince bir yay veya 'C' harfi şeklinde ışıldayan zarif bir görünüm sergiler.",
    "rubric": [("Hilal ara evresi adının doğru yazılması", 0.5), ("İnce yay / C harfi şeklindeki görünümün açıklanması", 0.5)]
}
G5_DEDICATED[('fen_bilimleri', 'FB.5.1.4', 2, 0)] = {
    "contextText": "Dünya'nın kendi etrafında dönmesi ve gece-gündüz.",
    "stimulus": "Sabah doğudan doğan Güneş gün içinde gökyüzünde yükselir ve akşam batıdan batar.",
    "questionText": "Güneş'in gökyüzünde hareket ediyormuş gibi görünmesinin gerçek nedeni nedir ve bu hareket kaç saatte tamamlanır?",
    "solutionExplanation": "Dünya'nın kendi ekseni etrafında batıdan doğuya dönmesidir. 24 saatte tamamlanır.",
    "modelAnswer": "Gerçek neden Güneş'in değil, Dünya'nın kendi ekseni etrafında batıdan doğuya doğru dönmesidir. Bu hareket tam '24 saatte' (1 günde) tamamlanır ve gece-gündüzün oluşmasını sağlar.",
    "rubric": [("Dünya'nın kendi ekseni etrafında dönmesi gerekçesi", 0.5), ("24 saat süresinin ve gece-gündüz sonucunun belirtilmesi", 0.5)]
}
G5_DEDICATED[('fen_bilimleri', 'FB.5.2.1', 2, 0)] = {
    "contextText": "Dinamometrede orantılı yay uzaması hesabı.",
    "stimulus": "Bir dinamometreye 10 N ağırlığında cisim asıldığında yay 2 cm uzamaktadır.",
    "questionText": "Aynı dinamometreye 30 N ağırlığında bir cisim asılırsa yaydaki uzama kaç cm olur? İşlem basamaklarını gösteriniz.",
    "solutionExplanation": "10 N 2 cm uzatıyorsa, 30 N kuvvet 3 katıdır -> 2 x 3 = 6 cm uzar.",
    "modelAnswer": "İşlem:\n10 N kuvvet yayı 2 cm uzatıyorsa:\n1 cm uzama için = 10 N / 2 = 5 N gerekir.\n30 N kuvvet asıldığında uzama = 30 N / 5 N = 6 cm olur (veya 3 kat kuvvet -> 2 x 3 = 6 cm).",
    "rubric": [("Orantının doğru kurulması", 0.5), ("6 cm sonucunun işlem basamaklarıyla bulunması", 0.5)]
}
G5_DEDICATED[('fen_bilimleri', 'FB.5.2.1', 2, 1)] = {
    "contextText": "Dinamometrenin esneklik sınırı.",
    "stimulus": "En fazla 50 N ölçebilen bir dinamometreye 80 N ağırlığında ağır bir demir kütle asılmıştır.",
    "questionText": "Bu durumda dinamometrenin yayında ne gibi kalıcı bir hasar oluşur ve neden artık doğru ölçüm yapamaz? Açıklayınız.",
    "solutionExplanation": "Yayın esneklik sınırı aşılır, yay bozulur ve eski haline dönemez.",
    "modelAnswer": "Dinamometreye kapasitesinden fazla kuvvet uygulandığında yayın 'esneklik sınırı' aşılır. Sarmal yay aşırı gerilerek kalıcı deformasyona uğrar ve eski orijinal haline dönemez; bu nedenle alet bozulur ve bir daha doğru ölçüm yapamaz.",
    "rubric": [("Esneklik sınırının aşılması tespiti", 0.5), ("Kalıcı deformasyon sebebiyle doğru ölçüm yapamayacağı gerekçesi", 0.5)]
}

# Senaryo 4 (6 Qs)
G5_DEDICATED[('fen_bilimleri', 'FB.5.1.2', 3, 0)] = {
    "contextText": "Ay'ın yerçekimi kuvveti ve Dünya ile kıyaslanması.",
    "stimulus": "Ay'ın kütlesi Dünya'nın kütlesinden çok daha küçük olduğu için kütle çekim kuvveti de Dünya'dakinden zayıftır.",
    "questionText": "Dünya'da 60 kg gelen bir astronotun ağırlığı Ay'da yaklaşık kaçta kaçına iner ve Ay'da yürüyen astronotların hareketleri nasıl etkilenir?",
    "solutionExplanation": "Ay'daki yerçekimi Dünya'nın yaklaşık 1/6'sı kadardır. Astronotlar zıplayarak ve hafifçe adımlar atarlar.",
    "modelAnswer": "Ay'ın yerçekimi kuvveti Dünya'dakinin yaklaşık '6'da 1'i' (1/6) kadardır. Bu nedenle astronotlar Ay yüzeyinde adeta kuş gibi hafifler; yürümek yerine yükseğe zıplayarak ve süzülerek adımlar atarlar.",
    "rubric": [("1/6 oranının doğru yazılması", 0.5), ("Zıplayarak/hafifleyerek hareket etme sonucunun açıklanması", 0.5)]
}
G5_DEDICATED[('fen_bilimleri', 'FB.5.1.2', 3, 1)] = {
    "contextText": "Ay'da ses iletimi.",
    "stimulus": "Ay yüzeyine inen iki astronot aralarındaki mesafe 1 metre olsa bile kasklarını çıkarıp bağırsalar birbirlerinin sesini duyamazlar.",
    "questionText": "Ay'da sesin havada yayılamamasının fiziksel sebebini açıklayınız. Astronotlar kendi aralarında nasıl iletişim kurarlar?",
    "solutionExplanation": "Ses maddesel ortamda yayılır; Ay'da hava/atmosfer olmadığı için ses yayılmaz. Radyo dalgalarıyla (telsizle) iletişim kurarlar.",
    "modelAnswer": "• Sesin Duyulmama Sebebi: Ses mekanik bir dalgadır ve yayılabilmesi için hava, su gibi tanecikli maddesel bir ortama ihtiyaç duyar. Ay'da atmosfer (hava boşluğu) olmadığı için ses dalgaları yayılamaz.\n• İletişim Yöntemi: Astronotlar boşlukta da yayılabilen radyo dalgaları kullanan telsiz sistemleriyle haberleşirler.",
    "rubric": [("Sesin yayılması için maddesel ortam gerektiği ve Ay'da hava olmadığı gerekçesi", 0.5), ("Telsiz / radyo dalgalarıyla iletişim çözümünün belirtilmesi", 0.5)]
}
G5_DEDICATED[('fen_bilimleri', 'FB.5.1.4', 3, 0)] = {
    "contextText": "Güneş'in özellikleri ve dönme hareketi.",
    "stimulus": "Güneş, Güneş sistemimizin merkezinde yer alan orta büyüklükte sarı bir yıldızdır.",
    "questionText": "Güneş'in yapısını oluşturan iki ana gazı yazınız ve Güneş'in kendi etrafında dönme hareketi yapıp yapmadığını belirtiniz.",
    "solutionExplanation": "Hidrojen ve Helyum gazları. Güneş kendi etrafında döner.",
    "modelAnswer": "• Yapısındaki Ana Gazlar: Hidrojen (%73 civarı) ve Helyum (%25 civarı) gazlarıdır.\n• Dönme Hareketi: Güneş de tıpkı gezegenler gibi kendi ekseni etrafında batıdan doğuya doğru dönme hareketi yapar.",
    "rubric": [("Hidrojen ve Helyum gazlarının yazılması", 0.5), ("Güneş'in kendi ekseni etrafında döndüğü bilgisinin doğrulanması", 0.5)]
}
G5_DEDICATED[('fen_bilimleri', 'FB.5.1.4', 3, 1)] = {
    "contextText": "Güneş lekeleri ve Galileo'nun keşfi.",
    "stimulus": "Ünlü İtalyan bilim insanı Galileo Galilei, teleskopla Güneş üzerine düşürdüğü görüntüde koyu renkli lekelerin yer değiştirdiğini fark etmiştir.",
    "questionText": "Güneş üzerindeki bu koyu lekelerin yer değiştirmesi Galileo'ya Güneş hakkında hangi temel bilimsel gerçeği ispatlamıştır?",
    "solutionExplanation": "Güneş'in kendi ekseni etrafında döndüğünü ispatlamıştır.",
    "modelAnswer": "Güneş lekelerinin hep aynı yöne doğru düzenli olarak kayması, Güneş'in sabit durmadığını ve kendi ekseni etrafında batıdan doğuya doğru döndüğünü kesin olarak ispatlamıştır.",
    "rubric": [("Güneş'in kendi ekseni etrafında döndüğü kanıtının yazılması", 0.5), ("Lekelerin düzenli kaymasının bu dönüşü gösterdiğinin açıklanması", 0.5)]
}
G5_DEDICATED[('fen_bilimleri', 'FB.5.2.1', 3, 0)] = {
    "contextText": "Farklı yay kalınlıklarına sahip dinamometreler.",
    "stimulus": "Laboratuvarda X dinamometresinde ince telden yapılmış yay, Y dinamometresinde ise kalın telden yapılmış yay kullanılmıştır.",
    "questionText": "Hangi dinamometre daha ağır cisimleri ölçmek için uygundur? Hangisi küçük kuvvetleri daha hassas ölçer? Gerekçelendiriniz.",
    "solutionExplanation": "Kalın yaylı Y daha ağır cisimleri tartar; ince yaylı X küçük kuvvetleri hassas ölçer.",
    "modelAnswer": "• Ağır Cisimler İçin: Kalın yaylı 'Y dinamometresi' uygundur; çünkü kalın yaylar büyük kuvvetlere dayanıklıdır ve kolayca esneklik sınırını aşmaz.\n• Hassas Ölçüm İçin: İnce yaylı 'X dinamometresi' uygundur; çünkü küçük kuvvetlerde bile hemen esneyip uzayarak net değer gösterir.",
    "rubric": [("Y dinamometresinin ağır cisimler için uygunluğunun gerekçelendirilmesi", 0.5), ("X dinamometresinin küçük kuvvet hassasiyetinin açıklanması", 0.5)]
}
G5_DEDICATED[('fen_bilimleri', 'FB.5.2.1', 3, 1)] = {
    "contextText": "Dinamometre bölme değeri hesabı.",
    "stimulus": "10 eşit bölmeden oluşan bir dinamometre en fazla 100 N büyüklüğündeki kuvvetleri ölçebilmektedir.",
    "questionText": "a) Bu dinamometrede her 1 bölmenin gösterdiği kuvvet kaç Newton'dur?\nb) Dinamometreye bir cisim asıldığında yay 4 bölme dışarı çıktığına göre cismin ağırlığı kaç N'dur?",
    "solutionExplanation": "100 / 10 = 10 N her bölme. 4 x 10 = 40 N ağırlık.",
    "modelAnswer": "a) 1 Bölmenin Değeri: 100 N / 10 bölme = 10 N'dur.\nb) Cismin Ağırlığı: 4 bölme x 10 N = 40 N'dur.",
    "rubric": [("a şıkkında 10 N bölme değerinin bulunması", 0.5), ("b şıkkında 40 N cisim ağırlığının bulunması", 0.5)]
}

print("Grade 5 Fen Bilimleri dedicated questions registered!")

# =====================================================================
# GRADE 5 SOSYAL BİLGİLER DEDICATED (5 Scenarios)
# =====================================================================
# Senaryo 1 (6 Qs)
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.1', 0, 0)] = {
    "contextText": "Sosyal roller ve sorumluluklar.",
    "stimulus": "5. sınıf öğrencisi Selim, evde anne ve babasının evladı, okulda 5-A sınıfının başkanı, basketbol kulübünde ise oyun kurucudur.",
    "questionText": "Selim'in dahil olduğu bu üç gruptaki rollerini yazarak, roller değiştikçe sorumlulukların nasıl değiştiğini açıklayınız.",
    "solutionExplanation": "Roller değiştikçe görev ve sorumluluklar değişir.",
    "modelAnswer": "• Rolleri: Ailede çocuk/evlat, okulda sınıf başkanı, basketbol kulübünde sporcu/oyun kurucudur.\n• Sorumluluk Değişimi: İnsan birden fazla grupta farklı roller üstlenebilir. Evde odasını toplamak sorumluluğuyken, sınıfta düzeni sağlamak ve takımda arkadaşlarına pas vermek sorumluluğuna sahiptir.",
    "rubric": [("Üç farklı sosyal rolün doğru yazımı", 0.5), ("Roller değiştikçe sorumlulukların farklılaşmasının açıklanması", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.2', 0, 0)] = {
    "contextText": "Yöresel halk oyunlarımız.",
    "stimulus": "Ege'de efelerin zeybeği, Karadeniz'de coşkulu horon ve Erzurum'da yiğitçe oynanan bar oyunu sergilenmektedir.",
    "questionText": "Farklı yörelerimize ait bu halk oyunlarının milletimizin ortak kültürüne sağladığı zenginliği 2 cümleyle açıklayınız.",
    "solutionExplanation": "Kültürel zenginliğimizi ve ortak duygularda buluşmayı sağlar.",
    "modelAnswer": "Farklı yörelerimizdeki halk oyunları, Anadolu insanının neşesini, kahramanlığını ve doğayla mücadelesini yansıtan zengin bir kültür mozaiğidir. Bu oyunların bayram ve törenlerde birlikte oynanması milletimizin kaynaşmasını ve kültürel bağlarımızın güçlenmesini sağlar.",
    "rubric": [("Kültürel mozaik ve duygu yansıması tespiti", 0.5), ("Kaynaşma ve millî birlik katkısının açıklanması", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.2', 0, 1)] = {
    "contextText": "Geleneksel mutfak kültürümüz.",
    "stimulus": "Gaziantep'in baklavası ve kebabı, Trabzon'un kuymak ve hamsili ekmeği, Kayseri'nin mantısı tüm Türkiye'de sevilerek tüketilmektedir.",
    "questionText": "Yöresel yemeklerimizin ülkemizin her köşesinde bilinmesi ve sevilmesi kültürel birlikteliğimize nasıl katkı sağlar? Açıklayınız.",
    "solutionExplanation": "Ortak damak tadı ve kültürel kaynaşma sağlar.",
    "modelAnswer": "Farklı şehirlerin lezzetlerinin tüm ülkede sahiplenilmesi, sofralarımızda ortak bir tat ve muhabbet oluşturarak bölgesel ayrılıkları eritir; vatandaşlarımız arasında sempati, paylaşma ve kültürel yakınlaşmayı artırır.",
    "rubric": [("Ortak damak tadı ve lezzet birliği vurgusu", 0.5), ("Kültürel yakınlaşma ve kaynaşma gerekçesi", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.3', 0, 0)] = {
    "contextText": "İmece usulü yardımlaşma.",
    "stimulus": "Anadolu köylerinde kış hazırlığı yapan komşular, her gün bir ailenin odun kırma ve un öğütme işini toplanıp hep birlikte bitirmektedir.",
    "questionText": "Köylerde uygulanan bu 'imece' geleneğinin toplumsal dayanışmaya ve zorlukların aşılmasına sağladığı 2 faydayı yazınız.",
    "solutionExplanation": "Ağır işler el birliğiyle kolayca biter, dostluk ve dayanışma pekişir.",
    "modelAnswer": "1. Tek bir ailenin günlerce yapamayacağı zahmetli işlerin birlik ve beraberlik ruhuyla kısa sürede, yorulmadan tamamlanmasını sağlar.\n2. Köy halkı arasında dayanışma, karşılıksız destek ve komşuluk bağlarını güçlendirerek kimsenin yalnız hissetmemesini temin eder.",
    "rubric": [("İşlerin kolay ve hızlı bitirilmesi faydası", 0.5), ("Komşuluk ve birlik bağlarının güçlenmesi faydası", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.3', 0, 1)] = {
    "contextText": "Tarihî sadaka taşları inceliği.",
    "stimulus": "Osmanlı döneminde cami avlularındaki sadaka taşlarına durumu iyi olanlar gizlice para koyar; fakirler ise sadece o günkü ihtiyacı kadar olan parayı alırdı.",
    "questionText": "Sadaka taşları uygulamasının yoksul insanların onurunu incitmeden yardım etme ahlakını nasıl yansıttığını açıklayınız.",
    "solutionExplanation": "Veren el alan eli görmez, alan kişi mahcup olmaz, veren kişi kibirlenmez.",
    "modelAnswer": "Bu gelenekte veren el ile alan el birbirini hiç görmez. Yardım eden kişi gösteriş ve riyadan uzak durur; ihtiyaç sahibi kimse de kimseye el açıp boyun bükmeden, haysiyeti zedelenmeden ihtiyacını giderir. İnsan onurunu koruyan eşsiz bir yardımlaşma ahlakıdır.",
    "rubric": [("Gizlilik ve birbirini görmeme ilkesinin açıklanması", 0.5), ("İnsan onurunu koruma ve mahcubiyeti önleme gerekçesi", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'EVİMİZ', 0, 0)] = {
    "contextText": "Doğal varlıklar ve tarihî mekanlar sınıflandırması.",
    "stimulus": "Verilen yerler: Peri Bacaları, Pamukkale Travertenleri, Topkapı Sarayı, Selimiye Camii.",
    "questionText": "Bu yerleri 'Doğal Varlıklar' ve 'Tarihî Mekanlar' olarak doğru sütunlara ayırınız:\n• Doğal Varlıklar (2): .................................\n• Tarihî Mekanlar (2): .................................",
    "solutionExplanation": "Peri Bacaları ve Pamukkale doğal varlıktır; Topkapı Sarayı ve Selimiye Camii tarihî mekândır.",
    "modelAnswer": "• Doğal Varlıklar: Peri Bacaları, Pamukkale Travertenleri (doğanın insan eli değmeden oluşturduğu güzellikler).\n• Tarihî Mekanlar: Topkapı Sarayı, Selimiye Camii (geçmiş uygarlıklar tarafından inşa edilmiş eserler).",
    "rubric": [("İki doğal varlığın doğru tespiti", 0.5), ("İki tarihî mekânın doğru tespiti", 0.5)]
}

# Senaryo 2 (7 Qs)
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.1', 1, 0)] = {
    "contextText": "Hak ve sorumluluk kavramları.",
    "stimulus": "Bir çocuğun düşüncesi: 'Parkta temiz ve güvenli bir alanda oyun oynamak benim hakkımdır.'",
    "questionText": "Parkta oyun oynama hakkına sahip olan bir çocuğun, parktaki oyuncaklara ve çevreye karşı yerine getirmesi gereken 2 sorumluluğu yazınız.",
    "solutionExplanation": "Oyuncaklara zarar vermemek, çöpleri çöp kutusuna atmak, sırayla oynamak.",
    "modelAnswer": "1. Salıncak, kaydırak gibi park oyuncaklarını kırıp dökmeden özenle kullanmak ve diğer çocukların sırasına saygı göstermek.\n2. Yediği bisküvi, meyve suyu gibi atıkları yere atmayıp çöp kutusuna atarak parkı temiz bırakmak.",
    "rubric": [("Oyuncakları koruma ve saygılı kullanma sorumluluğu", 0.5), ("Çevreyi temiz tutma ve çöp atmama sorumluluğu", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.1', 1, 1)] = {
    "contextText": "Grup çalışmalarında adil görev paylaşımı.",
    "stimulus": "Dört arkadaş fen deney projesi için bir araya gelmiş ve aralarında iş bölümü yapmıştır.",
    "questionText": "Grup çalışmasında görev dağılımı yapılmasının ve herkesin payına düşen işi yapmasının gruba kazandırdığı 2 faydayı yazınız.",
    "solutionExplanation": "İşlerin zamanında bitmesini sağlar, adil iş yükü oluşturur, başarıyı artırır.",
    "modelAnswer": "1. İşlerin bir kişinin üzerine yıkılmasını önleyerek adaletli bir çalışma ortamı oluşturur.\n2. Farklı yeteneklerin birleşmesiyle projenin kalitesini yükseltir ve takım ruhunu pekiştirir.",
    "rubric": [("Adil iş yükü dağılımı faydası", 0.5), ("Proje kalitesi ve takım ruhu faydası", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.2', 1, 0)] = {
    "contextText": "Geleneksel bayramlaşma ritüelleri.",
    "stimulus": "Bayram sabahı erkenden uyanan çocuklar en temiz kıyafetlerini giyer, dede ve ninelerinin elini öpüp hayır duasını alır, komşulara şeker ikram edilir.",
    "questionText": "Geleneksel bayram kutlamalarının toplumda sevgi, saygı ve akrabalık bağlarına yaptığı 2 olumlu etkiyi yazınız.",
    "solutionExplanation": "Küsleri barıştırır, büyükleri sevindirir, nesiller arası bağı korur.",
    "modelAnswer": "1. Dargınlıkların unutulmasını sağlayarak aile ve komşular arasında barış ve sevgi iklimini yeşertir.\n2. Büyüklerin ziyaret edilip ellerinin öpülmesi gençlere vefa ve hürmet duygusunu aşılayarak kuşaklar arası bağı güçlendirir.",
    "rubric": [("Dargınlıkları giderme ve sevgi ortamı etkisi", 0.5), ("Büyüklere hürmet ve nesiller arası vefa etkisi", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.2', 1, 1)] = {
    "contextText": "Geleneksel el sanatlarımız.",
    "stimulus": "Ebru sanatı, çinicilik, bakırcılık ve halı dokumacılığı Türk milletinin yüzyıllardır yaşattığı el emeği göz nuru sanatlarıdır.",
    "questionText": "Geleneksel el sanatlarımızın yaşatılmasının millî kimliğimiz ve kültürel sürekliliğimiz açısından önemini açıklayınız.",
    "solutionExplanation": "Geçmişten gelen zevk ve zarafetimizi geleceğe taşır, millet olma bilincini korur.",
    "modelAnswer": "Geleneksel el sanatlarımız, ecdadımızın estetik zevkini, sabrını ve dünya görüşünü günümüze taşıyan canlı tarih belgeleridir. Bu sanatların yaşatılması kültürel mirasımızın kaybolmasını önler ve millî benliğimizi korumamızı sağlar.",
    "rubric": [("Tarihî ve estetik miras boyutu", 0.5), ("Millî kimlik ve kültürel süreklilik koruması gerekçesi", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.3', 1, 0)] = {
    "contextText": "Afetlerde milletin kenetlenmesi.",
    "stimulus": "Deprem veya sel felaketlerinde Türkiye'nin her ilinden vatandaşlar kan vermek için kuyruğa girmekte, tırlar dolusu kışlık giysi ve gıda paketini afet bölgesine göndermektedir.",
    "questionText": "Milletimizin felaket anlarında sergilediği bu hızlı refleks, hangi ortak millî duygu ve hasletimizin bir göstergesidir? Açıklayınız.",
    "solutionExplanation": "Millî birlik, beraberlik, diğerkâmlık ve kardeşlik bilinci.",
    "modelAnswer": "Bu durum, Türk milletinin bin yıllık tarihinden gelen 'millî birlik, beraberlik ve kardeşlik' hasletinin en somut kanıtıdır. Milletimiz zor zamanlarda bütün farklılıkları unutarak tek yürek olmayı başaran eşsiz bir dayanışma ruhuna sahiptir.",
    "rubric": [("Millî birlik ve beraberlik kavramının yazılması", 0.5), ("Tek yürek olma ve kardeşlik dayanışması gerekçesi", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.3', 1, 1)] = {
    "contextText": "Sosyal yardımlaşma kurumları: Kızılay ve Yeşilay.",
    "stimulus": "Okulda kurulan Kızılay ve Sosyal Yardımlaşma kulüpleri ihtiyaç sahibi öğrenciler için kermes ve kitap toplama kampanyaları düzenlemektedir.",
    "questionText": "Öğrencilerin bu tür okul kulüplerinde gönüllü görev almasının onların karakter gelişimine kazandırdığı 2 insani değeri yazınız.",
    "solutionExplanation": "Yardımseverlik, empati, sorumluluk, paylaşma bilinci.",
    "modelAnswer": "1. Başkalarının sıkıntılarına duyarlı olma (empati kurma) ve karşılıksız yardım etme (diğerkâmlık) erdemini kazandırır.\n2. Birlikte iş üretme, sorumluluk alma ve topluma faydalı bir birey olma özgüvenini pekiştirir.",
    "rubric": [("Empati ve yardımseverlik değerinin belirtilmesi", 0.5), ("Sorumluluk ve toplumsal fayda özgüveninin açıklanması", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.3', 1, 2)] = {
    "contextText": "Askıda ekmek geleneği.",
    "stimulus": "Fırınlarda müşterilerin iki ekmek alıp bir ekmeğin parasını 'askıya' bırakması ve ihtiyacı olanların bu ekmekleri ücretsiz alması geleneği yaşatılmaktadır.",
    "questionText": "'Askıda Ekmek' uygulamasının toplumsal barışa ve dayanışmaya sağladığı katkıyı açıklayınız.",
    "solutionExplanation": "Aç kalan insan kalmamasını sağlar, yoksulu rencide etmeden doyurur.",
    "modelAnswer": "Askıda ekmek uygulaması, mahalledeki yoksul ve aç insanların kimseye el açmadan en temel besin olan ekmeğe ücretsiz ulaşmasını sağlar. Varlıklı ile muhtaç arasında gizli bir şefkat köprüsü kurarak toplumsal adalete ve huzura katkı verir.",
    "rubric": [("Yoksulu rencide etmeden doyurma boyutu", 0.5), ("Toplumsal huzur ve şefkat köprüsü kurma gerekçesi", 0.5)]
}

# Senaryo 3 (7 Qs)
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.1', 2, 0)] = {
    "contextText": "Çocuk hakları sözleşmesi.",
    "stimulus": "Birleşmiş Milletler Çocuk Hakları Sözleşmesi'ne göre her çocuğun yaşama, sağlıklı beslenme, eğitim alma ve oyun oynama hakkı vardır.",
    "questionText": "Çocuk haklarının uluslararası belgelerle koruma altına alınmasının en temel amacını açıklayınız.",
    "solutionExplanation": "Çocukların bedensel, zihinsel ve ahlaki gelişimini güvenceye almak, şiddet ve istismardan korumak.",
    "modelAnswer": "Temel amaç; savunmasız olan çocukların her türlü ihmal, istismar ve şiddetten korunmasını sağlamak; onların eşit şartlarda eğitim alıp sağlıklı, güvenli ve mutlu bireyler olarak yetişmelerini devletlerin güvencesi altına almaktır.",
    "rubric": [("İhmal ve istismardan korunma güvencesi", 0.5), ("Eşit eğitim ve sağlıklı gelişim hakkının vurgulanması", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.1', 2, 1)] = {
    "contextText": "Evdeki sorumluluklarımız.",
    "stimulus": "10 yaşındaki bir çocuk 'Ben sadece ders çalışırım, odamı toplamak ve masayı kurmaya yardım etmek benim görevim değildir' demektedir.",
    "questionText": "Aile içi dayanışma açısından bu çocuğun yaklaşımındaki hatayı açıklayarak, evde üstlenmesi gereken 2 sorumluluk yazınız.",
    "solutionExplanation": "Aile bir bütündür, ortak yaşama katkı sunulmalıdır.",
    "modelAnswer": "• Hata: Aile bir bütündür ve evdeki huzur ancak ortak iş bölümüyle korunur; bütün yükü anne ve babaya bırakmak bencilce bir tutumdur.\n• Sorumluluklar: 1) Sabah kalktığında yatağını ve dağıttığı oyuncaklarını toplamak. 2) Yemekten önce veya sonra sofranın kurulup toplanmasına yardım etmek.",
    "rubric": [("Bencil tutumun ve aile iş bölümü hatasının açıklanması", 0.5), ("Evde üstlenilebilecek 2 somut sorumluluğun yazılması", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.2', 2, 0)] = {
    "contextText": "Kültürümüzde misafirperverlik.",
    "stimulus": "Türk kültüründe kapıya gelen misafir 'Tanrı misafiri' olarak kabul edilir; evdeki en güzel oda ona açılır ve en lezzetli ikramlar sunulur.",
    "questionText": "Misafirperverlik geleneğimizin insan ilişkilerine kazandırdığı 2 erdemi yazınız.",
    "solutionExplanation": "Cömertlik, güler yüz, samimiyet ve kaynaşma.",
    "modelAnswer": "1. İnsanlar arasında samimiyet, cömertlik ve sıcak dostluk bağlarının kurulmasını sağlar.\n2. Ev kapılarını ve gönülleri yabancılara dahi açarak hoşgörü ve diğerkâmlık ahlakını geliştirir.",
    "rubric": [("Cömertlik ve samimiyet boyutunun yazılması", 0.5), ("Hoşgörü ve gönül zenginliği erdeminin açıklanması", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.2', 2, 1)] = {
    "contextText": "Türkülerimizin ortak duyguları.",
    "stimulus": "Bozkırın ortasındaki bir ağıt da Karadeniz kıyısındaki bir kemençe türküsü de milletimizin sevincini, kederini ve hasretini dile getirir.",
    "questionText": "Farklı yöre türkülerimizin ortak duygu ve acılarda birleşebilmemiz açısından üstlendiği rolü açıklayınız.",
    "solutionExplanation": "Türküler ortak tarihimizin ve gönül dilimizin tercümanıdır.",
    "modelAnswer": "Türkülerimiz milletimizin ortak vicdanının ve duygularının tercümanıdır. Farklı şivelerle söylenseler bile aynı hüznü ve sevinci paylaştırarak yürekler arasında görünmez bir gönül köprüsü kurar ve millî duygudaşlığı pekiştirir.",
    "rubric": [("Türkülerin ortak vicdan ve duygu tercümanı olması tespiti", 0.5), ("Gönül köprüsü kurarak millî duygudaşlığı artırma gerekçesi", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.3', 2, 0)] = {
    "contextText": "Zimem defteri (Veresiye defteri kapatma) geleneği.",
    "stimulus": "Ramazan ayında varlıklı kişiler hiç tanımadıkları bir mahallenin bakkalına giderek veresiye defterindeki fakir borçluların hesaplarını toptan ödeyip borçlarını silerdi.",
    "questionText": "Bu 'Zimem Defteri' geleneğinin toplumsal huzura sağladığı katkıyı açıklayınız.",
    "solutionExplanation": "Borçlu insanı ferahlatır, zengin ile fakir arasındaki hasedi ve sınıf çatışmasını engeller.",
    "modelAnswer": "Borcunu ödeyemediği için ezilen, uykuları kaçan yoksul aileleri büyük bir yükten kurtararak bayram sevinci yaşatır. Zengin ile fakir arasındaki kin ve kıskançlığı bitirerek karşılıklı sevgi ve toplumsal barış tesis eder.",
    "rubric": [("Yoksul aileleri borç baskısından kurtarma boyutu", 0.5), ("Toplumsal barış ve kin/kıskançlığı bitirme gerekçesi", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.3', 2, 1)] = {
    "contextText": "Engelli rampaları ve empati.",
    "stimulus": "Okul bahçesine ve kamu binalarına yapılan tekerlekli sandalye rampalarının önüne dikkatsizce araba park eden sürücüler görülmektedir.",
    "questionText": "Bu tür hatalı davranışların özel gereksinimli bireylerin haklarına zararını açıklayarak çözüm önerinizi yazınız.",
    "solutionExplanation": "Hareket özgürlüğünü engeller, hak ihlalidir. Farkındalık ve denetim artırılmalıdır.",
    "modelAnswer": "• Zararı: Engelli bireylerin en temel hakkı olan bağımsız hareket etme ve kamu hizmetlerine erişim özgürlüğünü gasp eder.\n• Çözüm: Rampaların önüne park yapılmasını engelleyen fiziksel dubalar konulmalı, sürücülere empati bilinci aşılanmalı ve caydırıcı cezalar uygulanmalıdır.",
    "rubric": [("Erişim hakkı ihlalinin doğru tespiti", 0.5), ("Fiziksel engelleyici duba ve empati çözümlerinin yazılması", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'EVİMİZ', 2, 0)] = {
    "contextText": "Tarihî eser kaçakçılığı ve mirası koruma.",
    "stimulus": "Ülkemiz toprakları binlerce yıllık Hitit, Frig, Roma, Selçuklu ve Osmanlı medeniyetlerinin zengin eserlerini barındırmaktadır.",
    "questionText": "Toprağımızın altındaki tarihî eserlerin kaçak kazılarla yurt dışına kaçırılmasını önlemek için bir vatandaş olarak üzerimize düşen 1 görevi yazınız.",
    "solutionExplanation": "Şüpheli kazıları güvenlik güçlerine ve müzeye bildirmek, tarihî mirasa sahip çıkmak.",
    "modelAnswer": "Şüpheli kaçak kazıları veya tarihî eser ticaretini derhal jandarma, polis ya da en yakın müze müdürlüğüne ihbar etmeli; bu eserlerin milletimizin ortak tapu senedi olduğu bilinciyle hareket etmeliyiz.",
    "rubric": [("Güvenlik güçlerine/müzeye ihbar etme görevinin yazılması", 0.5), ("Tarihî miras bilinci ve vatandaşlık sorumluluğu vurgusu", 0.5)]
}

# Senaryo 4 (6 Qs)
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.1', 3, 0)] = {
    "contextText": "Zaman içinde rollerin değişmesi.",
    "stimulus": "Bugün ilkokul ve ortaokulda öğrenci olan çocuklar, yarının doktorları, öğretmenleri, mühendisleri ve ebeveynleri olacaklardır.",
    "questionText": "Gelecekteki rollerimizi başarıyla yerine getirebilmek için bugünkü öğrenci rolümüzde hangi sorumluluklarımızı en iyi şekilde yerine getirmeliyiz? Yazınız.",
    "solutionExplanation": "Çok çalışmalı, dürüst ve ahlaklı olmalı, bilgi ve beceri kazanmalıyız.",
    "modelAnswer": "Bugünkü öğrenci rolümüzde derslerimize düzenli çalışmalı, çok kitap okuyarak kendimizi geliştirmeli, okul kurallarına ve öğretmenlerimize saygılı olmalıyız. Bugün edindiğimiz bilgi, ahlak ve disiplin yarınki meslek hayatımızın temeli olacaktır.",
    "rubric": [("Düzenli ders çalışma ve kendini geliştirme sorumluluğu", 0.5), ("Gelecekteki mesleki başarıyla bugünkü disiplinin bağının kurulması", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.2', 3, 0)] = {
    "contextText": "Farklılıklara saygı ve birlikte yaşama kültürü.",
    "stimulus": "Bir ormanda tek bir ağaç türü değil; çam, meşe, gürgen ve çınar bir arada yaşadığında orman gerçek bir ekosistem olur.",
    "questionText": "Ormandaki bu ağaç çeşitliliği analojisinden hareketle, toplumda farklı düşünce, kültür ve kökenden gelen insanların bir arada huzurla yaşamasının şartını açıklayınız.",
    "solutionExplanation": "Karşılıklı saygı, sevgi, hoşgörü ve farklılıkları zenginlik olarak kabul etmek.",
    "modelAnswer": "Tıpkı ormanın güzelliğinin ağaç çeşitliliğinden gelmesi gibi; toplumun zenginliği de farklı fikir, inanç ve geleneklerin bir arada bulunmasından kaynaklanır. Bunun şartı ise herkesin birbirine karşılıklı saygı, empati ve hoşgörüyle yaklaşmasıdır.",
    "rubric": [("Ağaç analojisiyle toplumsal çeşitlilik bağının kurulması", 0.5), ("Karşılıklı saygı ve hoşgörü şartının açıklanması", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.2', 3, 1)] = {
    "contextText": "Millî bayramlarımız ve bağımsızlık bilinci.",
    "stimulus": "23 Nisan Ulusal Egemenlik ve Çocuk Bayramı, 29 Ekim Cumhuriyet Bayramı gibi özel günlerde okullar süslenir, şiirler okunur ve coşkuyla törenler yapılır.",
    "questionText": "Millî bayramlarımızın milletimizin ortak tarih şuuruna ve birlikteliğine sağladığı katkıyı 2 maddeyle açıklayınız.",
    "solutionExplanation": "Geçmiş mücadeleleri hatırlatır, vatan sevgisi ve bayrak aşkını canlı tutar.",
    "modelAnswer": "1. Şehitlerimizin ve gazilerimizin vatan uğruna verdiği fedakârlıkları hatırlatarak bağımsızlığımızın kıymetini kavratır.\n2. Ortak bayrak ve cumhuriyet paydasında milletçe tek yürek olmayı sağlayarak millî aidiyet duygumuzu güçlendirir.",
    "rubric": [("Tarihî fedakârlıkları ve bağımsızlığı hatırlama katkısı", 0.5), ("Millî aidiyet ve tek yürek olma katkısı", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.3', 3, 0)] = {
    "contextText": "Yardımlaşmada niyet ve tevazu.",
    "stimulus": "Yaptığı yardımı sosyal medyada canlı yayınlayıp yoksul insanların yüzünü göstererek övünen biri eleştirilmiştir.",
    "questionText": "Yardımlaşma ve dayanışmada 'gösterişten kaçınma ve muhatabın haysiyetini gözetme' kuralının önemini açıklayınız.",
    "solutionExplanation": "Yardım şov için değil Allah rızası ve vicdan için yapılır; insanın yüzünü afişe etmek haysiyetini kırar.",
    "modelAnswer": "Gerçek yardımlaşma çıkar ve gösteriş için değil; samimiyet ve merhametle yapılır. Yardım yapılan kişinin yoksulluğunu teşhir etmek onun onurunu kırar ve kalbini yaralar. Bu nedenle kültürümüz 'Sağ elin verdiğini sol el görmemelidir' ilkesini benimsemiştir.",
    "rubric": [("Gösterişten uzak durma ve samimiyet ilkesi", 0.5), ("Sağ elin verdiğini sol el görmez inceliğinin vurgulanması", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.3', 3, 1)] = {
    "contextText": "Aşevleri geleneği.",
    "stimulus": "Tarihten günümüze vakıflar ve belediyeler tarafından işletilen aşevleri her gün binlerce kimsesiz ve yoksula sıcak çorba ve yemek dağıtmaktadır.",
    "questionText": "Aşevi geleneğinin kimsesizleri sokakta aç bırakmama ve sosyal adaleti sağlama yönünü açıklayınız.",
    "solutionExplanation": "Aç insan kalmamasını sağlar, kimsesizlere devletin ve milletin şefkat elini hissettirir.",
    "modelAnswer": "Aşevleri toplumda hiçbir ferdin aç ve çaresiz kalmamasını güvenceye alan şefkat kapılarıdır. Kimsesizlere devletin ve hayırseverlerin koruyucu elini uzatarak onları hayata bağlar ve toplumsal vicdanı rahatlatır.",
    "rubric": [("Aç ve çaresiz insan bırakmama güvencesi", 0.5), ("Toplumsal şefkat ve vicdani koruma gerekçesi", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.3', 3, 2)] = {
    "contextText": "Köy odaları ve yolcu konaklama kültürü.",
    "stimulus": "Eski Türk köylerinde köy odaları bulunur; yolu köyden geçen yolcular burada ücretsiz konaklar, köylüler sırayla onlara sıcak yemek getirirdi.",
    "questionText": "Köy odası geleneğinin yolculara güven ve insan sevgisi aşılama boyutunu açıklayınız.",
    "solutionExplanation": "Yabancıya kucak açma, karşılıksız misafirperverlik ve insan sevgisi.",
    "modelAnswer": "Bu gelenek, tanımadığı yolculara dahi karşılıksız kucak açan, onları soğukta ve aç bırakmayan yüce bir insan sevgisini gösterir. Yolculara güvenli bir sığınak sunarak toplumdaki güven duygusunu pekiştirir.",
    "rubric": [("Yabancıya kucak açma ve misafirperverlik erdemi", 0.5), ("Toplumdaki karşılıklı güven duygusunu pekiştirme gerekçesi", 0.5)]
}

# Senaryo 5 (6 Qs)
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.1', 4, 0)] = {
    "contextText": "Okul meclisi ve temsilcilik rolü.",
    "stimulus": "Okul meclis başkanlığına seçilen bir öğrenci, teneffüslerde arkadaşlarının kantin ve bahçe ile ilgili taleplerini dinleyip okul yönetimine iletmektedir.",
    "questionText": "Bu öğrencinin temsilcilik rolünü yerine getirirken gösterdiği demokratik sorumluluğu açıklayınız.",
    "solutionExplanation": "Arkadaşlarının sesini duyurmak, tarafsız ve adil olmak, meclis kültürünü işletmek.",
    "modelAnswer": "Öğrenci, kendisine oy veren arkadaşlarının hakkını savunmak ve taleplerini idareye medeni bir şekilde iletmek sorumluluğunu taşır. Bu tutum okulda katılımcı demokrasi kültürünü ve öğrenci temsilciliği bilincini somutlaştırır.",
    "rubric": [("Arkadaşlarının hak ve taleplerini savunma görevi", 0.5), ("Katılımcı demokrasi ve temsil bilincinin açıklanması", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.1', 4, 1)] = {
    "contextText": "Sınıf kurallarına uyma bilinci.",
    "stimulus": "Bir sınıfta ders işlenirken bazı öğrencilerin parmak kaldırmadan konuşması ve yerinden kalkması dersin akışını bozmaktadır.",
    "questionText": "Sınıf içi kurallara uymanın arkadaşlarımızın eğitim alma hakkına saygı açısından önemini açıklayınız.",
    "solutionExplanation": "Gürültü yapmak başkalarının öğrenme hakkını engellemektir, hak ihlalidir.",
    "modelAnswer": "Kurallara uymamak ve gürültü yapmak, sınıftaki diğer arkadaşlarımızın dersi dinleme ve eğitim alma hakkını doğrudan engellemektir. Parmak kaldırıp sırasını beklemek diğer bireylerin öğrenme hakkına duyulan saygının bir ifadesidir.",
    "rubric": [("Başkalarının öğrenme hakkını engelleme tespiti", 0.5), ("Parmak kaldırma kuralının hakka saygı niteliğinin açıklanması", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.2', 4, 0)] = {
    "contextText": "Geleneksel çocuk oyunlarımız.",
    "stimulus": "Mendil kapmaca, saklambaç, yakan top ve körebe gibi sokak oyunları çocuklar arasında dostluğu ve paylaşmayı pekiştirir.",
    "questionText": "Geleneksel çocuk oyunlarının günümüzdeki dijital bilgisayar oyunlarına kıyasla arkadaşlık ve paylaşma kültürüne sağladığı 2 üstünlüğü yazınız.",
    "solutionExplanation": "Yüz yüze iletişim, fiziksel hareket, takım olma ve empati kurma becerisi kazandırır.",
    "modelAnswer": "1. Ekran başındaki yalnızlıktan kurtararak yüz yüze iletişim, konuşma ve gerçek arkadaşlık bağları kurmayı sağlar.\n2. Oyun esnasında kurallara uyma, kazanmayı da kaybetmeyi de paylaşma ve empati kurma yeteneğini geliştirir.",
    "rubric": [("Yüz yüze iletişim ve gerçek arkadaşlık üstünlüğü", 0.5), ("Paylaşma, kurallara uyma ve empati üstünlüğü", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.3', 4, 0)] = {
    "contextText": "TEMA Vakfı ve ağaçlandırma dayanışması.",
    "stimulus": "TEMA Vakfı gönüllüleri her yıl binlerce öğrenciyle birlikte fidan dikme şenlikleri düzenleyerek erozyonla mücadele etmektedir.",
    "questionText": "Fidan dikme kampanyalarına katılmanın gelecek nesillere karşı hangi vatandaşlık ve çevre sorumluluğumuzu gösterdiğini açıklayınız.",
    "solutionExplanation": "Gelecek kuşaklara yaşanabilir temiz bir çevre bırakmak, toprağı ve suyu korumak.",
    "modelAnswer": "Ağaç dikmek yalnızca bugünü değil; gelecekte yaşayacak çocuklarımıza temiz hava, verimli toprak ve yeşil bir vatan bırakma borcumuzdur. Gelecek nesillere karşı en onurlu çevre ve vatandaşlık sorumluluğumuzdur.",
    "rubric": [("Gelecek nesillere yaşanabilir çevre bırakma borcu", 0.5), ("Erozyonla mücadele ve yeşil vatan bilinci gerekçesi", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'SB.5.1.3', 4, 1)] = {
    "contextText": "Kütüphanesiz köy okullarına kitap desteği.",
    "stimulus": "Bir ortaokulun öğrencileri 'Kardeş Okul Kütüphanesi' projesiyle harçlıklarından artırdıkları paralarla kitaplar alıp bir köy okuluna göndermiştir.",
    "questionText": "Öğrencilerin bu dayanışmasının köydeki akranlarıyla aralarında oluşturduğu gönül bağını açıklayınız.",
    "solutionExplanation": "Fırsat eşitliği sağlar, sevgi ve kardeşlik köprüsü kurar.",
    "modelAnswer": "Bu proje, şehirdeki öğrenciler ile köydeki öğrenciler arasında eğitimde fırsat eşitliği sağlayan sıcacık bir kardeşlik köprüsü kurar. Köydeki çocukların kitap sevinci yaşamasını sağlayarak millet olma ve paylaşma ruhunu diri tutar.",
    "rubric": [("Eğitimde fırsat eşitliği desteği", 0.5), ("Kardeşlik ve paylaşma köprüsü kurulması gerekçesi", 0.5)]
}
G5_DEDICATED[('sosyal_bilgiler', 'EVİMİZ', 4, 0)] = {
    "contextText": "Milli parklar ve doğal anıtlar.",
    "stimulus": "Ülkemizdeki Karagöl-Sahara Millî Parkı, Kazdağları ve Abant Gölü eşsiz doğal anıtlar barındırmaktadır.",
    "questionText": "Bu alanların 'Millî Park' ilan edilerek koruma altına alınmasının temel gayesini açıklayınız.",
    "solutionExplanation": "Doğal türleri, yaban hayatını ve bitki örtüsünü tahribattan koruyarak geleceğe aktarmak.",
    "modelAnswer": "Temel gaye; benzersiz bitki ve hayvan türlerinin, doğal göl ve orman ekosistemlerinin insan tahribatından korunmasını sağlamak ve bu tabiat mirasını bozulmadan gelecek nesillere ulaştırmaktır.",
    "rubric": [("Doğal türleri ve ekosistemi koruma gayesi", 0.5), ("Gelecek nesillere bozulmadan aktarma gerekçesi", 0.5)]
}

print("Grade 5 Sosyal Bilgiler dedicated questions registered!")

# =====================================================================
# GRADE 5 DİN KÜLTÜRÜ DEDICATED (4 Scenarios)
# =====================================================================
# Senaryo 1 (8 Qs)
G5_DEDICATED[('din_kulturu', 'Evrendeki', 0, 0)] = {
    "contextText": "Evrendeki ölçü ve ilahi ahenk.",
    "stimulus": "'Gökleri ve yeri yaratan, gece ile gündüzü birbiri ardınca getiren Allah'tır...' (Âl-i İmrân Suresi, 190. ayet)",
    "questionText": "Ayetten hareketle evrendeki kusursuz düzene ve ölçüye günlük hayattan 2 somut tabiat olayı örneği veriniz.",
    "solutionExplanation": "Mevsimlerin şaşmadan dönmesi, Dünya'nın Güneş'e olan yaşam mesafesi, su döngüsü.",
    "modelAnswer": "1. Örnek: Gece ile gündüzün ve dört mevsimin (ilkbahar, yaz, sonbahar, kış) milyonlarca yıldır milimetrik bir düzenle birbirini izlemesi.\n2. Örnek: Dünya'nın Güneş'e olan ideal mesafesi (ne donacak kadar uzak ne de kavrulacak kadar yakın olması).",
    "rubric": [("Birinci doğru tabiat olayı örneği", 0.5), ("İkinci doğru tabiat olayı örneği", 0.5)]
}
G5_DEDICATED[('din_kulturu', 'DKAB.5.1.2', 0, 0)] = {
    "contextText": "Tevhid inancı tanımı.",
    "stimulus": "Kelime-i Şehadet ve Kelime-i Tevhid İslam inancının omurgasını oluşturan Tevhid ilkesini ifade eder.",
    "questionText": "Tevhid inancını tanımlayarak, evrende birden fazla yaratıcı olsaydı bu düzenin nasıl bozulacağını açıklayınız.",
    "solutionExplanation": "Tevhid Allah'ın tek ve eşsiz olmasıdır. Birden fazla tanrı olsaydı iradeler çatışır ve evren yıkılırdı.",
    "modelAnswer": "• Tevhid: Yüce Allah'ın var olduğuna, bir olduğuna, eşi, benzeri ve ortağının bulunmadığına inanmaktır.\n• Açıklama: Kur'an'da bildirildiği gibi eğer birden fazla ilah olsaydı her biri kendi yarattığını yönetmek ister, çatışma çıkar ve evrendeki kusursuz kozmik düzen altüst olurdu.",
    "rubric": [("Tevhid inancının doğru tanımı", 0.5), ("Birden fazla ilah olması durumundaki çatışma gerekçesi", 0.5)]
}
G5_DEDICATED[('din_kulturu', 'DKAB.5.1.2', 0, 1)] = {
    "contextText": "Kusursuz sanat eseri ve Sanatkâr ilişkisi.",
    "stimulus": "Bir müzede sergilenen muhteşem bir tablonun fırça darbelerine bakan biri, 'Bu resim boyaların tuvale dökülmesiyle tesadüfen oldu' diyemez.",
    "questionText": "Tablo ve ressam örneğinden hareketle, kainattaki canlılar ve galaksiler ile Yüce Yaratıcı arasındaki mantıksal bağı açıklayınız.",
    "solutionExplanation": "Her sanat eseri bir ustaya muhtaçtır; kainat da sonsuz ilim sahibi Allah'a muhtaçtır.",
    "modelAnswer": "Küçük bir yağlı boya tablosu bile mutlaka yetenekli ve bilgili bir ressamın varlığını zorunlu kılıyorsa; koca kainattaki trilyonlarca hücre, yıldız ve galaksi de asla tesadüfle açıklanamaz. Mutlaka sonsuz ilim, irade ve sanat sahibi Yüce Allah tarafından yaratılmıştır.",
    "rubric": [("Tablo-ressam ilişkisinin kainata uyarlanması", 0.5), ("Tesadüfün reddi ve ilahi sanatkâr tespiti", 0.5)]
}
G5_DEDICATED[('din_kulturu', 'DKAB.5.1.2', 0, 2)] = {
    "contextText": "Gözle görülmeyen gerçekler.",
    "stimulus": "Aklımızı, elektriği veya içimizdeki sevgiyi gözlerimizle göremeyiz fakat yaptıkları işlerle varlıklarından şüphe etmeyiz.",
    "questionText": "Bu durumdan hareketle, Allah'ı gözlerimizle göremediğimiz halde O'nun varlığına nasıl kesin olarak inandığımızı açıklayınız.",
    "solutionExplanation": "Eserlerinden, kâinattaki düzen ve canlardan hareketle varlığını aklımızla anlarız.",
    "modelAnswer": "Gözlerimiz sınırlı bir görme kapasitesine sahiptir; akıl, elektrik ve yerçekimi gibi birçok somut gücü gözle göremeyiz ama eserlerinden kesin olarak biliriz. Allah'ı da dünyada gözümüzle göremeyiz ancak yarattığı muazzam kâinata ve canlara bakarak aklımız ve kalbimizle O'nun varlığına kesin olarak iman ederiz.",
    "rubric": [("Gözle görülmeyen güçler analojisinin kurulması", 0.5), ("Kâinattaki eserlerden hareketle akılla inanma gerekçesi", 0.5)]
}
G5_DEDICATED[('din_kulturu', 'DKAB.5.1.3', 0, 0)] = {
    "contextText": "Rahman ve Rahim isimleri arasındaki fark.",
    "stimulus": "Her işe başlarken söylediğimiz Besmele'de Allah'ın Rahman ve Rahim isimleri zikredilir.",
    "questionText": "Rahman ile Rahim isimlerinin anlamlarını dünya ve ahiret merhameti bakımından karşılaştırınız.",
    "solutionExplanation": "Rahman dünyada tüm yaratılmışlara merhamet eden; Rahim ahirette sadece müminlere merhamet edendir.",
    "modelAnswer": "• Rahman: Dünyada inanan-inanmayan, iyi-kötü ayrımı yapmadan bütün canlılara rızık veren, merhametiyle kuşatandır.\n• Rahim: Ahirette ise yalnızca Yüce Allah'a iman edip salih amel işleyen mümin kullarına sonsuz cennet nimetlerini lütfedecek olandır.",
    "rubric": [("Rahman isminin dünyadaki kuşatıcı merhamet anlamı", 0.5), ("Rahim isminin ahiretteki müminlere özel merhamet anlamı", 0.5)]
}
G5_DEDICATED[('din_kulturu', 'DKAB.5.1.3', 0, 1)] = {
    "contextText": "Allah'ın Semi ve Basar sıfatları.",
    "stimulus": "Allah'ın subuti sıfatlarından Semi 'her sesi işitmesi', Basar ise 'her şeyi görmesi' demektir.",
    "questionText": "Allah'ın her an kendisini gördüğünü ve işittiğini bilen bir insanın ahlakında ne gibi güzellikler ortaya çıkar? Açıklayınız.",
    "solutionExplanation": "Yalnızken bile kötülük yapmaz, dürüst ve adil olur, yalandan kaçınır.",
    "modelAnswer": "Bu inanca sahip bir kimse, hiç kimsenin olmadığı karanlık ve ıssız bir yerde dahi Allah'ın kendisini gördüğünü ve kalbinden geçenleri işittiğini bilir. Bu içsel kontrol kişiyi yalandan, hırsızlıktan ve dedikodudan korur; gizli-açık her yerde dürüst ve erdemli yaşamasını sağlar.",
    "rubric": [("İç denetim ve otokontrol şuurunun vurgulanması", 0.5), ("Kötülükten sakınma ve dürüst yaşama ahlakının açıklanması", 0.5)]
}
G5_DEDICATED[('din_kulturu', 'DKAB.5.1.4', 0, 0)] = {
    "contextText": "İhlas Suresi ve Samed kavramı.",
    "stimulus": "İhlas Suresi'nin 2. ayetinde 'Allâhü's-Samed' buyrulmaktadır.",
    "questionText": "'Samed' kelimesinin anlamını açıklayarak, bu ismin Allah'ın hiçbir şeye muhtaç olmaması yönünü belirtiniz.",
    "solutionExplanation": "Samed: Her şey O'na muhtaç, O hiçbir şeye muhtaç değildir.",
    "modelAnswer": "Samed: Bütün varlıkların var olmak, beslenmek ve yaşamak için her an O'na muhtaç olduğu; ancak Kendisinin hiçbir varlığa, zamana veya mekâna asla muhtaç olmadığı mutlak zenginlik ve kudret sahibi demektir.",
    "rubric": [("Tüm varlıkların O'na muhtaç olduğu tespiti", 0.5), ("Kendisinin hiçbir şeye muhtaç olmadığı tanımı", 0.5)]
}
G5_DEDICATED[('din_kulturu', 'DKAB.5.2.1', 0, 0)] = {
    "contextText": "Namazın farzları: Şartlar ve rükünler.",
    "stimulus": "Namaz kılacak bir kimse namaza başlamadan önce ve namazın içinde belirli farzları yerine getirir.",
    "questionText": "a) Namazın dışındaki şartlardan 2 tanesini yazınız (Örn: Abdest almak vb.).\nb) Namazın içindeki rükünlerden 2 tanesini yazınız (Örn: Secde vb.).",
    "solutionExplanation": "Dışındakiler: Hadesten taharet, setr-i avret vb. İçindekiler: Rükû, secde vb.",
    "modelAnswer": "a) Namazın Dışındaki Şartlar (2 tane): 1. Hadesten Taharet (Abdest almak), 2. İstikbal-i Kıble (Kâbe'ye yönelmek).\nb) Namazın İçindeki Rükünler (2 tane): 1. Rükû (Eğilmek), 2. Secde (Alnı yere koymak).",
    "rubric": [("Dışındaki şartlardan 2 doğru kavram", 0.5), ("İçindeki rükünlerden 2 doğru kavram", 0.5)]
}

# Senaryo 2 (7 Qs)
G5_DEDICATED[('din_kulturu', 'Evrendeki', 1, 0)] = {
    "contextText": "Su döngüsü ve hayatın devamı.",
    "stimulus": "Denizlerdeki sular buharlaşarak gökyüzünde bulutları oluşturur, rüzgarlarla taşınan bulutlar kurak topraklara tatlı su olarak yağar.",
    "questionText": "Kainattaki bu su döngüsünün tesadüfle değil, ölçülü bir ilahi planla gerçekleştiğini gösteren 2 delil yazınız.",
    "solutionExplanation": "Tuzlu deniz suyunun buharlaşırken arınması, yağmurun can vermesi.",
    "modelAnswer": "1. Buharlaşan deniz suyunun tuzundan arınarak yeryüzüne canlıların içebileceği tatlı su olarak yağması.\n2. Yağmur tanelerinin fırtınayla yeryüzünü yok etmeden, havada belirli bir hız sınırında süzülerek toprağı canlandırması.",
    "rubric": [("Tuzlu sudan tatlı su ayrışması delili", 0.5), ("Yağmurun ölçülü ve hayat verici şekilde inmesi delili", 0.5)]
}
G5_DEDICATED[('din_kulturu', 'DKAB.5.1.2', 1, 0)] = {
    "contextText": "Canlıların çeşitliliği ve rızıklandırılması.",
    "stimulus": "Okyanusun en derin karanlıklarında yaşayan balıklardan gökyüzündeki kuşlara kadar trilyonlarca canlının rızkı her gün eksiksiz ulaştırılmaktadır.",
    "questionText": "Bu durum Allah'ın hangi güzel isminin (Rezzak) ve sonsuz cömertliğinin bir tecellisidir? Açıklayınız.",
    "solutionExplanation": "Rezzak ismi. Bütün canlıların rızkını veren O'dur.",
    "modelAnswer": "Bu durum, bütün yaratılmışların rızkını veren ve onları aç bırakmayan Yüce Allah'ın 'Rezzâk' isminin tecellisidir. Canlıların kendi rızkını üretemediği ortamlarda bile hayatlarını sürdürmeleri sonsuz bir ilahi şefkatin kanıtıdır.",
    "rubric": [("Rezzâk isminin doğru yazılması", 0.5), ("Canlıların rızıklandırılmasındaki ilahi şefkatin açıklanması", 0.5)]
}
G5_DEDICATED[('din_kulturu', 'DKAB.5.1.2', 1, 1)] = {
    "contextText": "Göz bebeği ve insan tasarımı.",
    "stimulus": "İnsan gözü ışık fazla olduğunda küçülen, karanlıkta ise büyüyen akıllı bir göz bebeği mekanizmasına sahiptir.",
    "questionText": "Göz bebeğinin ışığa göre otomatik ayarlanması, insanın yaratılışındaki ilahi tasarımı nasıl ispatlar?",
    "solutionExplanation": "Kör tesadüf ışığın zararlarını bilemez; sonsuz ilim sahibi Allah gözü koruyacak şekilde tasarlamıştır.",
    "modelAnswer": "Kör ve şuursuz tesadüfler ışığın fazlasının retinayı yakacağını hesaplayamaz. Gözün ışık miktarına göre otomatik odaklanması, insanı yoktan var eden Yaratıcının sonsuz ilim, hikmet ve tasarım kudretini apaçık ispatlar.",
    "rubric": [("Tesadüfün hesaplayamayacağı vurgusu", 0.5), ("İlahi hikmet ve tasarım kudretinin gerekçelendirilmesi", 0.5)]
}
G5_DEDICATED[('din_kulturu', 'DKAB.5.1.2', 1, 2)] = {
    "contextText": "Güneş'in doğuşu ve batışı.",
    "stimulus": "'Güneş de kendi yörüngesinde akıp gitmektedir. İşte bu, Aziz ve Alim olan Allah'ın takdiridir.' (Yâsîn Suresi, 38. ayet)",
    "questionText": "Güneş'in trilyonlarca yıldır şaşmadan kendi yörüngesinde akıp gitmesi ilahi kudret açısından ne anlam taşır? Yazınız.",
    "solutionExplanation": "Evrenin başıboş olmadığını, ilahi bir kanun ve takdirle yönetildiğini gösterir.",
    "modelAnswer": "Bu durum, devasa gök cisimlerinin bile başıboş ve rastgele hareket etmediğini; her saniye sonsuz güç (Aziz) ve her şeyi bilen (Alim) tek bir Yaratıcının emrine boyun eğdiğini ve O'nun koyduğu nizamla yürüdüğünü gösterir.",
    "rubric": [("Başıboş olmama ve ilahi nizam tespiti", 0.5), ("Aziz ve Alim sıfatlarıyla bağ kurulması", 0.5)]
}
G5_DEDICATED[('din_kulturu', 'DKAB.5.1.3', 1, 0)] = {
    "contextText": "Allah'ın Alim ve Kadir sıfatları.",
    "stimulus": "Allah her şeyi bilir (Alim) ve her şeye gücü yeter (Kadir).",
    "questionText": "Alim ve Kadir sıfatlarını tanımlayarak, bu iki sıfatın evreni yaratmadaki rolünü birer cümleyle açıklayınız.",
    "solutionExplanation": "Alim: Sonsuz bilgi sahibi. Kadir: Sonsuz güç sahibi. Bilgiyle tasarlar, güçle yaratır.",
    "modelAnswer": "• Alim: Geçmişi, geleceği, gizliyi ve açığı her şeyi eksiksiz bilen demektir; evrendeki kusursuz kanunları sonsuz ilmiyle tasarlamıştır.\n• Kadir: Her şeye gücü yeten demektir; tasarladığı kainatı 'Ol' (Kün) emriyle kolayca var etmiştir.",
    "rubric": [("Alim ve Kadir tanımlarının doğruluğu", 0.5), ("Tasarım (ilim) ve yaratma (kudret) rolünün açıklanması", 0.5)]
}
G5_DEDICATED[('din_kulturu', 'DKAB.5.1.3', 1, 1)] = {
    "contextText": "Allah'ın Muhyi ve Mümit sıfatları.",
    "stimulus": "Kışın ölen tabiatı baharda dirilten Allah'tır; canı veren de alan da O'dur.",
    "questionText": "Hayat veren (Muhyi) ve ölümü yaratan (Mümit) sıfatlarından hareketle hayatın ve ölümün tesadüf olmadığını açıklayınız.",
    "solutionExplanation": "Canı veren de alan da Allah'tır; hayat bir imtihandır.",
    "modelAnswer": "Hayat kör bir tesadüfle başlamadığı gibi ölüm de anlamsız bir yok oluş değildir. Muhyi olan Allah insanı bu dünyaya imtihan için göndermiş; Mümit sıfatıyla da eceli geldiğinde ruhunu teslim alarak ebedi ahiret yurduna göçürmektedir.",
    "rubric": [("Muhyi (hayat veren) anlamının yazılması", 0.5), ("Mümit (ölümü yaratan) ve imtihan gerekçesinin açıklanması", 0.5)]
}
G5_DEDICATED[('din_kulturu', 'DKAB.5.1.4', 1, 0)] = {
    "contextText": "İhlas Suresinde 'Doğurmamış ve doğmamıştır' ayeti.",
    "stimulus": "İhlas Suresi 3. ayet: 'Lem yelid ve lem yûled' (O, doğurmamış ve doğmamıştır).",
    "questionText": "Bu ayetin Allah'ın ezeli (başlangıçsız) ve ebedi (sonsuz) oluşuyla ilişkisini açıklayınız.",
    "solutionExplanation": "Doğmamıştır çünkü başlangıcı yoktur; doğurmamıştır çünkü sonradan gelen bir soy veya mirasçıya ihtiyacı yoktur.",
    "modelAnswer": "Doğmamış olması Yüce Allah'ın bir anne veya babaya muhtaç olmadığını, varlığının bir başlangıcı bulunmadığını (ezeli olduğunu); doğurmamış olması ise eşi, çocuğu veya mirasçısı olmadığını, tek ve benzersiz (ebedi) olduğunu ispatlar.",
    "rubric": [("Doğmamış olmanın ezeli/başlangıçsızlık boyutu", 0.5), ("Doğurmamış olmanın eşsizlik ve çocuk isnadını reddetme boyutu", 0.5)]
}

# Senaryo 3 (6 Qs)
G5_DEDICATED[('din_kulturu', 'DKAB.5.1.2', 2, 0)] = {
    "contextText": "Atomun yapısı ve ilahi ahenk.",
    "stimulus": "Maddenin en küçük yapı taşı olan atomun çekirdeği etrafında elektronlar saniyede yüzlerce kilometre hızla hiç çarpmadan dönmektedir.",
    "questionText": "Mikro alemdeki bu muazzam atom hareketinin Yüce Allah'ın kudretiyle ilişkisini açıklayınız.",
    "solutionExplanation": "Gözle görülmeyen atomda bile Güneş sistemi gibi bir düzen kurulmuştur, ilahi kudretin eseridir.",
    "modelAnswer": "Gözle dahi görülemeyen mikroskobik atomun içinde adeta küçük bir Güneş sistemi kurulmuştur. Elektronların milyarlarca yıldır şaşmadan yörüngelerinde dönmesi, sonsuz ilim ve kudret sahibi Allah'ın her zerreyi bir nizamla idare ettiğini gösterir.",
    "rubric": [("Atomdaki yörünge hareketinin düzen tespiti", 0.5), ("İlahi ilim ve nizamla bağ kurulması", 0.5)]
}
G5_DEDICATED[('din_kulturu', 'DKAB.5.1.2', 2, 1)] = {
    "contextText": "Arıların petek yapma ilhamı.",
    "stimulus": "Bal arıları peteklerini en az balmumuyla en çok balı alacak şekilde kusursuz düzgün altıgenler halinde inşa ederler.",
    "questionText": "Küçük bir böceğin geometri ve mimarlık dehası sergilemesi, canlılara bu yeteneği ilham eden Allah'ın varlığını nasıl kanıtlar?",
    "solutionExplanation": "Arıya bu hesabı yaptıran ve vahyeden (öğreten) Yüce Allah'tır.",
    "modelAnswer": "Arı bir geometri veya mühendislik eğitimi almamıştır. Petekleri tam altıgen açılarla kusursuz örmesi, Kur'an'da bildirildiği gibi Yüce Allah'ın arıya bu ilhamı ve yeteneği bahşetmesidir; canlıların ardındaki ilahi aklı kanıtlar.",
    "rubric": [("Arının eğitime dayanmayan yeteneği tespiti", 0.5), ("İlahi ilham (vahiy) ve yaratıcı kanıtının açıklanması", 0.5)]
}
G5_DEDICATED[('din_kulturu', 'DKAB.5.1.2', 2, 2)] = {
    "contextText": "Atmosferin koruyucu kalkan özelliği.",
    "stimulus": "'Gökyüzünü korunmuş bir tavan yaptık...' (Enbiyâ Suresi, 32. ayet)",
    "questionText": "Dünya'yı saran atmosfer tabakasının zararlı güneş ışınlarını ve gök taşlarını engelleyen koruyucu kalkan rolünü açıklayınız.",
    "solutionExplanation": "Atmosfer ozon tabakasıyla zararlı UV ışınlarını süzer, meteorları sürtünmeyle yakarak Dünya'yı korur.",
    "modelAnswer": "Atmosfer, ozon tabakası sayesinde Güneş'ten gelen öldürücü morötesi (UV) ışınları süzer; ayrıca uzaydan yağan meteorları sürtünmeyle yakarak adeta Dünya'nın üzerine serilmiş koruyucu bir tavan görevi yapar. Canlılığın sürmesini sağlayan ilahi bir kalkandır.",
    "rubric": [("Ozon tabakası ve zararlı ışın filtresi tespiti", 0.5), ("Meteorları yakarak koruyucu tavan olma gerekçesi", 0.5)]
}
G5_DEDICATED[('din_kulturu', 'DKAB.5.1.3', 2, 0)] = {
    "contextText": "Allah'ın Şafi ve Kerim isimleri.",
    "stimulus": "Hastalara şifa veren Allah Şâfi'dir; ikramı bol olan ise Kerîm'dir.",
    "questionText": "Hastalık anında bir müminin ilaçlarını içerken Şâfi ismine nasıl tevekkül edeceğini açıklayınız.",
    "solutionExplanation": "İlaç bir vesiledir, hakiki şifayı yaratan Allah'tır.",
    "modelAnswer": "Mümin doktora gider ve ilacını içer; ancak bilir ki ilaç sadece bir sebeptir, ilaca iyileştirme özelliğini veren ve hakiki şifayı yaratan yalnızca 'eş-Şâfi' olan Allah'tır. Sebeplere yapışıp şifayı Allah'tan dileyerek tevekkül eder.",
    "rubric": [("İlacın sebep olduğu tespiti", 0.5), ("Şâfi olan Allah'tan şifa dileme ve tevekkül bilinci", 0.5)]
}
G5_DEDICATED[('din_kulturu', 'DKAB.5.1.4', 2, 0)] = {
    "contextText": "İhlas Suresinde 'O'nun hiçbir dengi yoktur' ayeti.",
    "stimulus": "İhlas Suresi son ayet: 'Ve lem yekün lehû küfüven ehad' (O'nun hiçbir dengi / benzeri yoktur).",
    "questionText": "Bu ayetin Allah'ı hiçbir yaratılmış varlığa benzetemeyeceğimiz ilkesiyle (Muhalefetün li'l-havadis) bağını açıklayınız.",
    "solutionExplanation": "Allah sonradan yaratılan hiçbir şeye benzemez, eşsiz ve benzersizdir.",
    "modelAnswer": "Bu ayet, Yüce Allah'ın insan zihninde tasavvur edilebilecek hiçbir cisme, varlığa veya maddeye benzemediğini ortaya koyar. O; mekândan, zamandan ve yaratılmışların eksikliklerinden münezzeh, dengi ve eşi olmayan mutlak Yaratıcıdır.",
    "rubric": [("Yaratılmış hiçbir varlığa benzememe ilkesi", 0.5), ("Eşi, benzeri ve dengi olmama boyutu", 0.5)]
}
G5_DEDICATED[('din_kulturu', 'DKAB.5.2.1', 2, 0)] = {
    "contextText": "Abdestin farzları.",
    "stimulus": "Namazın en temel şartlarından biri abdest almaktır. Kur'an-ı Kerim'de abdestin 4 temel farzı bildirilmiştir.",
    "questionText": "Abdestin 4 farzını sırasıyla yazınız.",
    "solutionExplanation": "Yüzü yıkamak, kolları dirseklerle beraber yıkamak, başın dörtte birini meshetmek, ayakları topuklarla beraber yıkamak.",
    "modelAnswer": "Abdestin 4 Farzı:\n1. Yüzü bir defa yıkamak.\n2. Elleri ve kolları dirseklerle beraber yıkamak.\n3. Başın en az dörtte birini ıslak elle meshetmek.\n4. Ayakları topuklarla beraber yıkamak.",
    "rubric": [("Yüz ve kolları yıkama farzlarının yazılması", 0.5), ("Başı meshetme ve ayakları yıkama farzlarının yazılması", 0.5)]
}

# Senaryo 4 (6 Qs)
G5_DEDICATED[('din_kulturu', 'Evrendeki', 3, 0)] = {
    "contextText": "Yerçekimi kanunu ve ilahi ölçü.",
    "stimulus": "Dünya'nın merkezindeki kütle çekim kuvveti sayesinde insanlar, denizler ve atmosfer boşluğa savrulmadan yeryüzünde sabit durmaktadır.",
    "questionText": "Yerçekimi kanununun tam canlıların yaşamasına elverişli ölçüde ayarlanmış olmasının arkasındaki ilahi hikmeti açıklayınız.",
    "solutionExplanation": "Yerçekimi biraz az olsa atmosfer uçar, biraz çok olsa canlılar ezilirdi; tam yaşam ölçüsündedir.",
    "modelAnswer": "Eğer yerçekimi biraz daha zayıf olsaydı atmosfer uzaya kaçar, sular uzaya savrulurdu; biraz daha güçlü olsaydı canlılar hareket edemez ve ezilirdi. Tam olması gereken hassas dengede tutulması, her şeyi bir ölçü ve hikmetle yaratan Allah'ın takdiridir.",
    "rubric": [("Zayıf veya güçlü olma durumundaki yıkıcı sonuçlar", 0.5), ("Hassas yaşam dengesinin ilahi takdir olduğu gerekçesi", 0.5)]
}
G5_DEDICATED[('din_kulturu', 'DKAB.5.1.2', 3, 0)] = {
    "contextText": "Parmak izi benzersizliği ve Yaratıcı.",
    "stimulus": "Dünya üzerinde yaşamış ve yaşayacak milyarlarca insanın parmak izleri, göz irisi ve ses tonu birbirinden tamamen farklıdır.",
    "questionText": "Milyarlarca insanın parmak izinin birbirine benzememesi, Yüce Allah'ın hangi yaratma sanatını ve kudretini gösterir?",
    "solutionExplanation": "Sonsuz ilim ve benzersiz yaratma (Musavvir, Hâlık) kudretini gösterir.",
    "modelAnswer": "Küçücük bir parmak ucunda milyarlarca farklı deseni birbirine karıştırmadan yaratmak, Yüce Allah'ın sonsuz ilmini, benzersiz şekil verme (el-Musavvir) sanatını ve sınırsız yaratma kudretini en açık şekilde kanıtlar.",
    "rubric": [("Benzersiz desen yaratma tespiti", 0.5), ("Musavvir ve Hâlık sıfatlarıyla bağ kurulması", 0.5)]
}
G5_DEDICATED[('din_kulturu', 'DKAB.5.1.2', 3, 1)] = {
    "contextText": "Fotosentez ve oksijen dengesi.",
    "stimulus": "İnsanlar ve hayvanlar sürekli oksijen tüketip karbondioksit verirken; bitkiler gündüzleri fotosentez yaparak havaya temiz oksijen salmaktadır.",
    "questionText": "Bu döngü sayesinde havadaki oksijen oranının (%21) milyonlarca yıldır sabit kalması kainattaki düzen hakkında neyi ispatlar?",
    "solutionExplanation": "Bitkiler ve hayvanlar arasındaki bu mükemmel dengenin tesadüf olamayacağını, tek bir Yaratıcı tarafından planlandığını ispatlar.",
    "modelAnswer": "Tüketilen oksijen ile bitkilerin ürettiği oksijenin kusursuz bir dengeyle birbirini tamamlaması, bitkiler ile hayvanları aynı ortak ekosistemde var eden tek bir Yaratıcının (Allah'ın) hikmetli planını ve evrendeki kusursuz dengeyi ispatlar.",
    "rubric": [("Oksijen ve karbondioksit dengesinin tespiti", 0.5), ("Tek bir planlayıcı ve ilahi denge kanıtının yazılması", 0.5)]
}
G5_DEDICATED[('din_kulturu', 'DKAB.5.1.3', 3, 0)] = {
    "contextText": "Allah'ın El-Kuddûs ismi (Tertemiz olan).",
    "stimulus": "Allah her türlü eksiklikten uzaktır ve kainatı tertemiz yaratmıştır.",
    "questionText": "Allah'ın El-Kuddûs ismine inanan bir Müslümanın çevre ve beden temizliğine neden büyük özen göstermesi gerektiğini açıklayınız.",
    "solutionExplanation": "'Temizlik imandandır' kuralı. Kuddus isminin tecellisi olarak insan bedenini ve çevresini temiz tutmalıdır.",
    "modelAnswer": "El-Kuddûs; her türlü kirden, kusurdan ve noksanlıktan pak ve tertemiz olan demektir. Peygamberimizin 'Temizlik imandandır' hadisi gereğince bu isme inanan mümin, hem kalbini kötü duygulardan hem de bedenini, elbisesini ve çevresini çöplerden arındırarak temiz tutar.",
    "rubric": [("El-Kuddûs isminin temizlik anlamının yazılması", 0.5), ("Beden ve çevre temizliği sorumluluğuyla bağ kurulması", 0.5)]
}
G5_DEDICATED[('din_kulturu', 'DKAB.5.1.3', 3, 1)] = {
    "contextText": "Allah'ın El-Adl ismi (Mutlak adalet sahibi).",
    "stimulus": "Allah hiç kimseye haksızlık yapmaz ve zerre kadar iyiliğin veya kötülüğün karşılığını verir.",
    "questionText": "Allah'ın El-Adl ismini rehber edinen bir öğrencinin okulda arkadaşlarına ve oyun kurallarına karşı sergileyeceği dürüst tutumu açıklayınız.",
    "solutionExplanation": "Oyunlarda hile yapmaz, arkadaşlarına hakkaniyetle davranır.",
    "modelAnswer": "Allah'ın mutlak adalet sahibi olduğuna inanan öğrenci, oyunlarda asla hile yapmaz, kimsenin hakkını yemez, taraftarlık gütmez; haklı olan arkadaşının yanında durarak adaleti ve dürüstlüğü savunur.",
    "rubric": [("Hile yapmama ve hak yememe tutumu", 0.5), ("Arkadaşlıkta adalet ve dürüstlük bilinci gerekçesi", 0.5)]
}
G5_DEDICATED[('din_kulturu', 'DKAB.5.1.4', 3, 0)] = {
    "contextText": "İhlas Suresinin fazileti ve Tevhid özeti.",
    "stimulus": "Peygamber Efendimiz (s.a.v.) bir hadisinde İhlas Suresi'nin fazileti hakkında 'İhlas Suresi Kur'an'ın üçte birine denktir' buyurmuştur.",
    "questionText": "Kısa bir sure olmasına rağmen İhlas Suresi'nin Kur'an'ın üçte birine denk sayılmasının sebebini (Tevhid inancını en özlü anlatan sure olması bakımından) açıklayınız.",
    "solutionExplanation": "Kur'an'ın ana konusu Tevhiddir ve İhlas Suresi Tevhid inancını eksiksiz özetler.",
    "modelAnswer": "Kur'an-ı Kerim'in temel mesajı üç ana konuya ayrılır: Tevhid (inanç), Ahiret ve Ahlak/Ahkâm. İhlas Suresi Allah'ın birliğini, eşsizliğini ve şirkten uzak olduğunu en saf ve özlü biçimde anlattığı için imanın ve Tevhidin kalbi sayılmış, Kur'an'ın üçte birine denk tutulmuştur.",
    "rubric": [("Tevhid inancını en özlü ve saf şekilde anlatması gerekçesi", 0.5), ("Kur'an'ın inanç ve tevhid mesajının özeti olması boyutu", 0.5)]
}

# =====================================================================
# GRADE 5 İNGİLİZCE DEDICATED (5 Scenarios)
# =====================================================================
# Senaryo 1 (5 Qs)
G5_DEDICATED[('ingilizce', 'ENG.5.1.R2', 0, 0)] = {
    "contextText": "Reading comprehension: Country and nationality.",
    "stimulus": "Read the text:\n\n'Hello! My name is Pierre. I am 11 years old. I am from France, so I am French. I speak French and English.'",
    "questionText": "Answer the questions in full English sentences:\na) Where is Pierre from and what is his nationality?\nb) Which languages can Pierre speak?",
    "solutionExplanation": "Country: France, Nationality: French, Languages: French and English.",
    "modelAnswer": "a) Pierre is from France and he is French.\nb) He can speak French and English.",
    "rubric": [("a şıkkında ülke ve milliyetin doğru yazılması", 0.5), ("b şıkkında dillerin doğru yazılması", 0.5)]
}
G5_DEDICATED[('ingilizce', 'ENG.5.1.R3', 0, 0)] = {
    "contextText": "Reading about school subjects: Kerem.",
    "stimulus": "Read Kerem's notes:\n\n'On Mondays, I have double Math and Science. I really love Science because we do fun experiments in the lab. However, I dislike History because memorizing dates is boring for me.'",
    "questionText": "Answer the questions:\na) Which class does Kerem dislike and why?\nb) Why does Kerem love Science?",
    "solutionExplanation": "Dislikes History (boring), loves Science (fun experiments).",
    "modelAnswer": "a) Kerem dislikes History because memorizing dates is boring for him.\nb) He loves Science because they do fun experiments in the lab.",
    "rubric": [("a şıkkında sevilmeyen ders ve gerekçesi", 0.5), ("b şıkkında sevilen ders ve deney gerekçesi", 0.5)]
}
G5_DEDICATED[('ingilizce', 'ENG.5.1.V1', 0, 0)] = {
    "contextText": "Places in a town: Library, pharmacy, bakery.",
    "stimulus": "Definitions of city places:\n1. A place where you can borrow and read books.\n2. A place where you can buy medicine and aspirin.\n3. A place where bakers make fresh bread and bagels.",
    "questionText": "Write the English names of these places (choose from: pharmacy, bakery, library):\n1: .................................\n2: .................................\n3: .................................",
    "solutionExplanation": "1 Library, 2 Pharmacy, 3 Bakery.",
    "modelAnswer": "1: Library\n2: Pharmacy (or Chemist's)\n3: Bakery",
    "rubric": [("Üç yer adının doğru yazılması", 1.0)]
}
G5_DEDICATED[('ingilizce', 'ENG.5.1.G1', 0, 0)] = {
    "contextText": "Prepositions of place: between and opposite.",
    "stimulus": "On Green Street:\n• The bank is located with the pharmacy on its left and the bookshop on its right.\n• The hospital is facing the school on the other side of the road.",
    "questionText": "Complete the sentences using 'between' or 'opposite':\na) The bank is ................................. the pharmacy and the bookshop.\nb) The hospital is ................................. the school.",
    "solutionExplanation": "a between, b opposite.",
    "modelAnswer": "a) The bank is between the pharmacy and the bookshop.\nb) The hospital is opposite the school.",
    "rubric": [("a şıkkında 'between' edatının doğru yazımı", 0.5), ("b şıkkında 'opposite' edatının doğru yazımı", 0.5)]
}
G5_DEDICATED[('ingilizce', 'ENG.5.1.W3', 0, 0)] = {
    "contextText": "Writing likes and dislikes.",
    "stimulus": "Information about Selin:\n• Loves: Art (drawing nature)\n• Dislikes: P.E. (hates running)",
    "questionText": "Write two full English sentences about Selin's preferences using 'loves' and 'dislikes':\n1) Sentence about Art:\n2) Sentence about P.E.:",
    "solutionExplanation": "Selin loves Art... Selin dislikes P.E...",
    "modelAnswer": "1) Selin loves Art because she likes drawing nature.\n2) Selin dislikes P.E. because she hates running.",
    "rubric": [("1. cümlenin dil bilgisine uygun doğru yazımı", 0.5), ("2. cümlenin olumsuz tercihle doğru yazımı", 0.5)]
}

# Senaryo 2 (5 Qs)
G5_DEDICATED[('ingilizce', 'ENG.5.1.R2', 1, 0)] = {
    "contextText": "Reading: Maria from Spain.",
    "stimulus": "Read about Maria:\n\n'Hi everyone! I am Maria from Spain. I am Spanish. I live in Madrid with my family. I speak Spanish and English.'",
    "questionText": "Fill in Maria's profile card:\n• Country: .................................\n• Nationality: .................................\n• Capital city she lives in: .................................",
    "solutionExplanation": "Country: Spain, Nationality: Spanish, City: Madrid.",
    "modelAnswer": "• Country: Spain\n• Nationality: Spanish\n• Capital city she lives in: Madrid",
    "rubric": [("Ülke ve milliyetin doğru yazımı", 0.6), ("Şehir adının doğru yazımı", 0.4)]
}
G5_DEDICATED[('ingilizce', 'ENG.5.1.R3', 1, 0)] = {
    "contextText": "Matching school subjects with activities.",
    "stimulus": "Three students describe what they do in class:\n1. 'We run, jump, and play volleyball in the gym.'\n2. 'We sing songs and play instruments like the flute.'",
    "questionText": "Write the name of the school subject for each description:\n1 is: .................................\n2 is: .................................",
    "solutionExplanation": "1 is P.E., 2 is Music.",
    "modelAnswer": "1 is: Physical Education (P.E.)\n2 is: Music",
    "rubric": [("1 için P.E. yazımı", 0.5), ("2 için Music yazımı", 0.5)]
}
G5_DEDICATED[('ingilizce', 'ENG.5.1.V1', 1, 0)] = {
    "contextText": "Town places: cinema and post office.",
    "stimulus": "Town map places: Cinema, post office, supermarket, hospital.",
    "questionText": "Where do you go when:\na) You want to watch an exciting film on a big screen? -> .................................\nb) You want to send a parcel and letters? -> .................................",
    "solutionExplanation": "a Cinema, b Post office.",
    "modelAnswer": "a) Cinema (or Movie theater)\nb) Post office",
    "rubric": [("a için Cinema yazımı", 0.5), ("b için Post office yazımı", 0.5)]
}
G5_DEDICATED[('ingilizce', 'ENG.5.1.G1', 1, 0)] = {
    "contextText": "Giving directions: turn right, go straight.",
    "stimulus": "A tourist asks: 'Excuse me, where is the museum?'\nAnswer: Go straight ahead on Flower Street, then turn right. It is next to the cafe.",
    "questionText": "Translate the following directions into Turkish:\n1. 'Go straight ahead': .................................\n2. 'Turn right': .................................",
    "solutionExplanation": "1 Düz git, 2 Sağa dön.",
    "modelAnswer": "1. 'Go straight ahead': Düz git (dosdoğru ilerle).\n2. 'Turn right': Sağa dön.",
    "rubric": [("1 için doğru Türkçe çeviri", 0.5), ("2 için doğru Türkçe çeviri", 0.5)]
}
G5_DEDICATED[('ingilizce', 'ENG.5.1.W4', 1, 0)] = {
    "contextText": "Writing a self-introduction paragraph.",
    "stimulus": "Imagine you are writing a letter to an international penfriend.",
    "questionText": "Write a short self-introduction paragraph (3 full sentences) in English. Include:\n1. Your name and age\n2. Your country and nationality\n3. Your favorite school subject",
    "solutionExplanation": "Full English sentences introducing oneself.",
    "modelAnswer": "Example Student Answer:\n'Hello! My name is Defne and I am eleven years old. I am from Turkey and I am Turkish. My favorite school subject is Science because I love doing experiments.'",
    "rubric": [("İsim ve yaş cümlesinin doğruluğu", 0.35), ("Ülke ve milliyet cümlesi", 0.35), ("Favori ders cümlesi", 0.3)]
}

# Senaryo 3 (6 Qs)
G5_DEDICATED[('ingilizce', 'ENG.5.1.R2', 2, 0)] = {
    "contextText": "Reading: Hans from Germany.",
    "stimulus": "Read the text:\n\n'My name is Hans. I live in Berlin, Germany. I am German. I can speak German and English fluently.'",
    "questionText": "Answer the questions:\na) What nationality is Hans?\nb) Which languages does he speak?",
    "solutionExplanation": "Nationality: German, Languages: German and English.",
    "modelAnswer": "a) Hans is German.\nb) He speaks German and English.",
    "rubric": [("a şıkkında German yazımı", 0.5), ("b şıkkında German and English yazımı", 0.5)]
}
G5_DEDICATED[('ingilizce', 'ENG.5.1.R2', 2, 1)] = {
    "contextText": "Country and language matching.",
    "stimulus": "Match countries with languages: Japan, Italy.",
    "questionText": "Write the languages spoken in these countries:\n• Japan -> .................................\n• Italy -> .................................",
    "solutionExplanation": "Japan -> Japanese, Italy -> Italian.",
    "modelAnswer": "• Japan -> Japanese\n• Italy -> Italian",
    "rubric": [("Japanese yazımı", 0.5), ("Italian yazımı", 0.5)]
}
G5_DEDICATED[('ingilizce', 'ENG.5.1.R3', 2, 0)] = {
    "contextText": "School subjects table analysis.",
    "stimulus": "Table:\n• Monday: Math, Art\n• Wednesday: Science, P.E.\n• Friday: English, Music",
    "questionText": "According to the table:\na) On which day do students have Art?\nb) Which classes do they have on Wednesday?",
    "solutionExplanation": "a Monday, b Science and P.E.",
    "modelAnswer": "a) They have Art on Monday.\nb) They have Science and P.E. on Wednesday.",
    "rubric": [("a için Monday tespiti", 0.5), ("b için Science and P.E. tespiti", 0.5)]
}
G5_DEDICATED[('ingilizce', 'ENG.5.1.V1', 2, 0)] = {
    "contextText": "Town places: butcher and stationer.",
    "stimulus": "Definitions:\n1. A shop where you buy fresh meat and sausages.\n2. A shop where you buy notebooks, pens, and pencils.",
    "questionText": "Write the English names for these shops:\n1: .................................\n2: .................................",
    "solutionExplanation": "1 Butcher's, 2 Stationery (or Bookshop).",
    "modelAnswer": "1: Butcher's\n2: Stationery (or Bookshop / Stationer's)",
    "rubric": [("Butcher's yazımı", 0.5), ("Stationery yazımı", 0.5)]
}
G5_DEDICATED[('ingilizce', 'ENG.5.1.G1', 2, 0)] = {
    "contextText": "Prepositions: behind and in front of.",
    "stimulus": "In the classroom:\n• The teacher's desk is directly facing the students, before the blackboard.\n• The wastebasket is at the back of the teacher's desk.",
    "questionText": "Complete the sentences using 'in front of' or 'behind':\na) The teacher's desk is ................................. the blackboard.\nb) The wastebasket is ................................. the teacher's desk.",
    "solutionExplanation": "a in front of, b behind.",
    "modelAnswer": "a) The teacher's desk is in front of the blackboard.\nb) The wastebasket is behind the teacher's desk.",
    "rubric": [("a için 'in front of' yazımı", 0.5), ("b için 'behind' yazımı", 0.5)]
}
G5_DEDICATED[('ingilizce', 'ENG.5.1.W3', 2, 0)] = {
    "contextText": "Writing sentences about daily school subjects.",
    "stimulus": "Write about two school subjects you have on Tuesday.",
    "questionText": "Write two full sentences about your Tuesday schedule using 'I have ... on Tuesday' and mention whether you like them.",
    "solutionExplanation": "Forming proper simple present sentences.",
    "modelAnswer": "Example Student Answer:\n'I have English and Maths on Tuesday. I really like English because it is very fun.'",
    "rubric": [("Ders ve gün ifadesinin doğru yazımı", 0.5), ("Beğeni/like cümlesinin doğru yazımı", 0.5)]
}

# Senaryo 4 (7 Qs)
G5_DEDICATED[('ingilizce', 'ENG.5.1.R2', 3, 0)] = {
    "contextText": "Reading: Kenji from Tokyo.",
    "stimulus": "Read about Kenji:\n\n'Konichiwa! My name is Kenji. I am from Tokyo, Japan. I am Japanese. I can speak Japanese and a little bit of English. My favorite subject is Drama.'",
    "questionText": "Answer the questions:\na) Where is Kenji from and what is his nationality?\nb) What is Kenji's favorite subject?",
    "solutionExplanation": "Japan, Japanese, Drama.",
    "modelAnswer": "a) Kenji is from Japan and he is Japanese.\nb) His favorite subject is Drama.",
    "rubric": [("a şıkkında Japan ve Japanese yazımı", 0.5), ("b şıkkında Drama yazımı", 0.5)]
}
G5_DEDICATED[('ingilizce', 'ENG.5.1.R3', 3, 0)] = {
    "contextText": "Reading: Emily's school bag.",
    "stimulus": "Emily says: 'Today I have Geography, so I packed my world map and atlas. After that I have Math, so I packed my ruler and calculator.'",
    "questionText": "Which materials does Emily pack for:\na) Geography class: .................................\nb) Math class: .................................",
    "solutionExplanation": "a world map and atlas, b ruler and calculator.",
    "modelAnswer": "a) World map and atlas\nb) Ruler and calculator",
    "rubric": [("Coğrafya malzemelerinin yazımı", 0.5), ("Matematik malzemelerinin yazımı", 0.5)]
}
G5_DEDICATED[('ingilizce', 'ENG.5.1.R3', 3, 1)] = {
    "contextText": "Good at / Bad at expressions.",
    "stimulus": "Mark says: 'I am good at solving numerical problems, but I am bad at drawing and painting pictures.'",
    "questionText": "According to Mark's statement:\na) Which class is he good at? (Math or Art?)\nb) Which class is he bad at? (Math or Art?)",
    "solutionExplanation": "a Math, b Art.",
    "modelAnswer": "a) Mark is good at Math.\nb) Mark is bad at Art.",
    "rubric": [("a için Math tespiti", 0.5), ("b için Art tespiti", 0.5)]
}
G5_DEDICATED[('ingilizce', 'ENG.5.1.V1', 3, 0)] = {
    "contextText": "Town places: pharmacy and hospital.",
    "stimulus": "Definitions of medical places:\n1. A big building where doctors and nurses treat sick people.\n2. A small shop where you buy pills, cough syrup, and band-aids.",
    "questionText": "Write the English names of these medical places (hospital or pharmacy):\n1: .................................\n2: .................................",
    "solutionExplanation": "1 Hospital, 2 Pharmacy.",
    "modelAnswer": "1: Hospital\n2: Pharmacy (or Chemist's)",
    "rubric": [("Hospital yazımı", 0.5), ("Pharmacy yazımı", 0.5)]
}
G5_DEDICATED[('ingilizce', 'ENG.5.1.V1', 3, 1)] = {
    "contextText": "Town places: cafe and toy shop.",
    "stimulus": "Where do you go to:\na) Buy a teddy bear or lego for your little brother? -> .................................\nb) Drink hot chocolate and eat cake with friends? -> .................................",
    "questionText": "Write the English words for places a and b (choose from: cafe, toy shop):\na: .................................\nb: .................................",
    "solutionExplanation": "a Toy shop, b Cafe.",
    "modelAnswer": "a) Toy shop\nb) Cafe",
    "rubric": [("Toy shop yazımı", 0.5), ("Cafe yazımı", 0.5)]
}
G5_DEDICATED[('ingilizce', 'ENG.5.1.G1', 3, 0)] = {
    "contextText": "Directions: Turn left and cross the street.",
    "stimulus": "Directions on a city tourist map: 'Walk along Rose Street, turn left at the corner, and cross the street. The park is right there.'",
    "questionText": "Translate the phrases into Turkish:\n1. 'Turn left': .................................\n2. 'Cross the street': .................................",
    "solutionExplanation": "1 Sola dön, 2 Karşıdan karşıya geç / caddeden karşıya geç.",
    "modelAnswer": "1. 'Turn left': Sola dön.\n2. 'Cross the street': Caddeden (sokaktan) karşıya geç.",
    "rubric": [("Sola dön çevirisi", 0.5), ("Karşıya geç çevirisi", 0.5)]
}
G5_DEDICATED[('ingilizce', 'ENG.5.1.W4', 3, 0)] = {
    "contextText": "Writing personal profile for student ID.",
    "stimulus": "Fill out a student profile form in complete English sentences.",
    "questionText": "Write 3 complete sentences providing:\n1. Your name\n2. Where you live\n3. The languages you can speak",
    "solutionExplanation": "My name is... I live in... I can speak...",
    "modelAnswer": "Example Student Answer:\n'My name is Can. I live in Ankara, Turkey. I can speak Turkish and English.'",
    "rubric": [("İsim cümlesi", 0.35), ("Yaşanılan yer cümlesi", 0.35), ("Diller cümlesi", 0.3)]
}

# Senaryo 5 (8 Qs)
G5_DEDICATED[('ingilizce', 'ENG.5.1.R2', 4, 0)] = {
    "contextText": "Reading: Ali from Turkey.",
    "stimulus": "Read about Ali:\n\n'Hi! I am Ali. I live in Istanbul. Turkey is my country and I am Turkish. I am in the 5th grade.'",
    "questionText": "Answer the questions according to Ali's sentences:\na) What is Ali's country and nationality?\nb) Which grade is Ali in?",
    "solutionExplanation": "Country: Turkey, Nationality: Turkish, Grade: 5th grade.",
    "modelAnswer": "a) Ali's country is Turkey and he is Turkish.\nb) Ali is in the 5th grade.",
    "rubric": [("Ülke ve milliyet yazımı", 0.5), ("5. sınıf ifadesinin yazımı", 0.5)]
}
G5_DEDICATED[('ingilizce', 'ENG.5.1.R2', 4, 1)] = {
    "contextText": "Country flags and nationalities: UK and USA.",
    "stimulus": "Information:\n• David is from the United Kingdom (UK).\n• Sarah is from the United States of America (USA).",
    "questionText": "Write down their nationalities in English:\n• David is: .................................\n• Sarah is: .................................",
    "solutionExplanation": "British and American.",
    "modelAnswer": "• David is: British (or English)\n• Sarah is: American",
    "rubric": [("British yazımı", 0.5), ("American yazımı", 0.5)]
}
G5_DEDICATED[('ingilizce', 'ENG.5.1.R3', 4, 0)] = {
    "contextText": "Reading: Why I love Social Studies.",
    "stimulus": "Zeynep writes: 'Social Studies is my favorite class because we learn about ancient civilizations, geography, and how to be good citizens.'",
    "questionText": "Write two reasons why Zeynep loves Social Studies according to the text.",
    "solutionExplanation": "Learns about ancient civilizations, geography, and good citizenship.",
    "modelAnswer": "1. She learns about ancient civilizations and geography.\n2. She learns how to be a good citizen.",
    "rubric": [("Birinci gerekçenin yazımı", 0.5), ("İkinci gerekçenin yazımı", 0.5)]
}
G5_DEDICATED[('ingilizce', 'ENG.5.1.V1', 4, 0)] = {
    "contextText": "Town places: bus stop and museum.",
    "stimulus": "Definitions:\n1. A place on the street where passengers wait for public buses.\n2. A place where ancient statues and historical relics are exhibited.",
    "questionText": "Write the English names of these places:\n1: .................................\n2: .................................",
    "solutionExplanation": "1 Bus stop, 2 Museum.",
    "modelAnswer": "1: Bus stop\n2: Museum",
    "rubric": [("Bus stop yazımı", 0.5), ("Museum yazımı", 0.5)]
}
G5_DEDICATED[('ingilizce', 'ENG.5.1.V1', 4, 1)] = {
    "contextText": "Town places: playground and mosque.",
    "stimulus": "Definitions:\n1. An outdoor area where children play on slides and swings.\n2. A religious place where Muslims pray and worship.",
    "questionText": "Write the English names of these community places (playground or mosque):\n1: .................................\n2: .................................",
    "solutionExplanation": "1 Playground, 2 Mosque.",
    "modelAnswer": "1: Playground (or Play area)\n2: Mosque",
    "rubric": [("Playground yazımı", 0.5), ("Mosque yazımı", 0.5)]
}
G5_DEDICATED[('ingilizce', 'ENG.5.1.G1', 4, 0)] = {
    "contextText": "Prepositions: next to and near.",
    "stimulus": "Look at the map clue: 'The bakery is right beside the pharmacy, sharing the same wall.'",
    "questionText": "Complete the sentence using 'next to':\n'The bakery is ................................. the pharmacy.'",
    "solutionExplanation": "The bakery is next to the pharmacy.",
    "modelAnswer": "The bakery is next to the pharmacy.",
    "rubric": [("'next to' edatının doğru kullanımı", 1.0)]
}
G5_DEDICATED[('ingilizce', 'ENG.5.1.G1', 4, 1)] = {
    "contextText": "Giving directions: between two landmarks.",
    "stimulus": "A person asks for the cafe. The cafe is situated in the middle, having the bank on the right and the cinema on the left.",
    "questionText": "Complete the sentence: 'The cafe is ................................. the bank and the cinema.'",
    "solutionExplanation": "The cafe is between the bank and the cinema.",
    "modelAnswer": "The cafe is between the bank and the cinema.",
    "rubric": [("'between' edatının doğru kullanımı", 1.0)]
}
G5_DEDICATED[('ingilizce', 'ENG.5.1.W4', 4, 0)] = {
    "contextText": "Writing favorite hobbies and town places.",
    "stimulus": "Write about your weekend hobbies in town.",
    "questionText": "Write 2 complete English sentences describing where you go on Saturdays and what you do there (e.g. library, park, cinema).",
    "solutionExplanation": "On Saturdays I go to the... and I...",
    "modelAnswer": "Example Student Answer:\n'On Saturdays, I go to the town library with my brother. We read adventure books and borrow comics.'",
    "rubric": [("1. cümlenin doğru kurulması", 0.5), ("2. cümlenin doğru kurulması", 0.5)]
}

print("All dedicated questions for Grade 5 populated!")

# =====================================================================
# BUILD ALL 29 GRADE 5 EXAMS (Türkçe + 5 other subjects)
# =====================================================================
all_g5_final_exams = list(g5_turkce_exams)

SUBJ_TITLES = {
    'matematik': 'Matematik',
    'fen_bilimleri': 'Fen Bilimleri',
    'sosyal_bilgiler': 'Sosyal Bilgiler',
    'din_kulturu': 'Din Kültürü ve Ahlak Bilgisi',
    'ingilizce': 'İngilizce'
}

for subj_id in ['matematik', 'fen_bilimleri', 'sosyal_bilgiler', 'din_kulturu', 'ingilizce']:
    gdata = matrix[subj_id]['5']
    scenarios = gdata['scenarios']
    subj_disp = SUBJ_TITLES[subj_id]
    
    for sc_idx, sc_name in enumerate(scenarios):
        sc_num = sc_idx + 1
        sc_id = f"senaryo_{sc_num}"
        exam_id = f"exam_5_{subj_id}_1_1_{sc_id}"
        
        # Collect questions for this scenario
        scenario_questions = []
        for o in gdata['outcomes']:
            cnt = o['counts'][sc_idx]
            code = o['code'].strip().replace('SB ', 'SB.')
            if cnt > 0:
                for i in range(cnt):
                    scenario_questions.append({
                        'code': code,
                        'title': o['title'],
                        'instance_idx': i
                    })
                    
        tot_q = len(scenario_questions)
        point_allocs = distribute_points(tot_q)
        
        exam_q_items = []
        for q_num, item in enumerate(scenario_questions, 1):
            code = item['code']
            inst = item['instance_idx']
            pts = point_allocs[q_num - 1]
            
            # Retrieve dedicated question
            key = (subj_id, code, sc_idx, inst)
            q_data = G5_DEDICATED.get(key)
            if not q_data:
                raise ValueError(f"Missing dedicated question for {key}")
                
            # Calibrate rubric to exact points
            rubric_specs = q_data['rubric']
            rubric_items = []
            curr_sum = 0
            for idx, (crit, ratio) in enumerate(rubric_specs):
                if idx == len(rubric_specs) - 1:
                    crit_pts = pts - curr_sum
                else:
                    crit_pts = max(1, round(pts * ratio))
                    curr_sum += crit_pts
                rubric_items.append({'criterion': crit, 'points': crit_pts})
                
            exam_q_items.append({
                'questionNumber': q_num,
                'outcomeCode': code,
                'outcomeTitle': f"{code}. {item['title']}",
                'difficulty': q_data.get('difficulty', 'Orta'),
                'cognitiveLevel': q_data.get('cognitiveLevel', 'Karmaşık Bilişsel Süreçler'),
                'archetype': q_data.get('archetype', 'Kurgusal Senaryo & Vaka İncelemesi'),
                'points': pts,
                'contextText': q_data['contextText'],
                'stimulus': q_data['stimulus'],
                'questionText': q_data['questionText'],
                'solutionExplanation': q_data['solutionExplanation'],
                'modelAnswer': q_data['modelAnswer'],
                'rubric': rubric_items
            })
            
        all_g5_final_exams.append({
            'id': exam_id,
            'grade': 5,
            'subjectId': subj_id,
            'examTerm': '1_donem_1_yazili',
            'scenarioId': sc_id,
            'title': f"5. Sınıf {subj_disp} 1. Dönem 1. Ortak Yazılı Sınavı ({sc_name}) ({tot_q} Soru)",
            'durationMinutes': 40,
            'totalPoints': 100,
            'questions': exam_q_items
        })

print(f"Total Grade 5 exams built: {len(all_g5_final_exams)}")

# Check duplicates across ALL Grade 5 subjects
by_subj = defaultdict(list)
for e in all_g5_final_exams:
    by_subj[e['subjectId']].append(e)

total_dups = 0
for subj, ex_list in sorted(by_subj.items()):
    seen = defaultdict(list)
    for ex in ex_list:
        for q in ex['questions']:
            seen[q['questionText'].strip()].append((ex['scenarioId'], q['questionNumber']))
    dups = {k: v for k, v in seen.items() if len(v) > 1}
    print(f"Grade 5 {subj} ({len(ex_list)} scenarios): {len(dups)} duplicates")
    total_dups += len(dups)

assert total_dups == 0, f"Found {total_dups} duplicates in Grade 5!"
print("GRADE 5: 100% PERFECT 0 DUPLICATES ACROSS ALL 6 SUBJECTS!")

with open('meb_data/all_grade5_exams.json', 'w', encoding='utf-8') as f:
    json.dump(all_g5_final_exams, f, ensure_ascii=False, indent=2)

print("Saved meb_data/all_grade5_exams.json successfully!")
