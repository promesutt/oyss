# -*- coding: utf-8 -*-
import json
from collections import defaultdict

def distribute_points(count):
    base = 100 // count
    rem = 100 % count
    return [base + (1 if i < rem else 0) for i in range(count)]

# Load clean matrix
with open('meb_data/clean_middle_school_matrix.json', 'r', encoding='utf-8') as f:
    matrix = json.load(f)

# Load Grade 5 Türkçe distinct
with open('meb_data/grade5_turkce_distinct.json', 'r', encoding='utf-8') as f:
    g5_turkce = json.load(f)

# We will create dedicated questions for Grade 5 Matematik, Fen, Sosyal, Din, İngilizce
# Key: (subj, code, sc_idx, inst) -> question dict
G5_DEDICATED = {}

# =====================================================================
# GRADE 5 MATEMATİK DEDICATED (5 Scenarios)
# =====================================================================
# MAT.5.3.1 (Doğru, doğru parçası, ışın)
G5_DEDICATED[('matematik', 'MAT.5.3.1', 0, 0)] = {
    "contextText": "Tren rayları, paket lastiği ve fener ışığı modelleri.",
    "stimulus": "Aşağıdaki modeller verilmiştir:\n1. İki yönden sonsuza uzanan tren rayı\n2. İki ucu da kesilmiş 40 cm'lik tahta cetvel\n3. Deniz fenerinden karanlık denize yayılan ışık huzmesi",
    "questionText": "Numaralandırılmış modellerin hangi temel geometrik kavramları (doğru, doğru parçası, ışın) temsil ettiğini gerekçeleriyle sırasıyla yazınız.",
    "solutionExplanation": "1 doğru, 2 doğru parçası, 3 ışındır.",
    "modelAnswer": "1: Doğru (her iki ucu sonsuza uzanır).\n2: Doğru parçası (iki ucu da sınırlıdır, uzunluğu ölçülebilir).\n3: Işın (başlangıç noktası fenerde sabit, diğer ucu sonsuza uzanır).",
    "rubric": [("Modellerin doğru kavramlarla eşleştirilmesi", 0.55), ("Her kavramın gerekçesinin yazılması", 0.45)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.1', 1, 0)] = {
    "contextText": "Sembolik gösterim: [KL], KL, [KL.",
    "stimulus": "Düzlemde K ve L noktaları birleştirilmiştir.",
    "questionText": "a) K noktasından başlayıp L noktasından sonsuza uzanan ışını sembolle gösteriniz.\nb) K ve L noktalarıyla sınırlı doğru parçasını sembolle gösteriniz.",
    "solutionExplanation": "Işın [KL, doğru parçası [KL] ile gösterilir.",
    "modelAnswer": "a) Işın: [KL\nb) Doğru parçası: [KL] (veya [LK])",
    "rubric": [("a şıkkında [KL ışın sembolünün doğru yazımı", 0.5), ("b şıkkında [KL] doğru parçası sembolünün doğru yazımı", 0.5)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.1', 2, 0)] = {
    "contextText": "Ölçülebilirlik özelliği.",
    "stimulus": "Mert defterine cetvelle 15 cm uzunluğunda bir çizgi çizmiştir. Kaan ise tahtaya iki ucunda ok işareti olan bir çizgi çizmiştir.",
    "questionText": "Mert'in ve Kaan'ın çizdiği geometrik şekillerden hangisinin boyu kesin bir sayıyla ölçülebilir? Nedenini geometrik tanımlarla açıklayınız.",
    "solutionExplanation": "Mert'in çizdiği doğru parçasının boyu ölçülebilir, Kaan'ın doğrusu sonsuza uzar.",
    "modelAnswer": "Mert'in çizdiği 'doğru parçası' ölçülebilir. Çünkü doğru parçasının başlangıç ve bitiş noktaları bellidir. Kaan'ın çizdiği 'doğru' ise iki uçtaki ok işaretlerinden anlaşılacağı üzere sonsuza uzandığı için boyu ölçülemez.",
    "rubric": [("Mert'in doğru parçası çiziminin belirlenmesi", 0.5), ("Doğrunun sonsuza uzaması sebebiyle boyunun ölçülemeyeceği gerekçesi", 0.5)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.1', 3, 0)] = {
    "contextText": "Lazer metresi ve gergin ip modeli.",
    "stimulus": "İki ucu duvardaki çivilere gerilmiş bir çamaşır ipi ile duvara tutulan lazer cihazından çıkan ışık incelenmektedir.",
    "questionText": "Çamaşır ipinin ve lazer ışığının sırasıyla hangi geometrik kavramlara (doğru, doğru parçası, ışın) örnek olduğunu yazınız.",
    "solutionExplanation": "Gergin ip doğru parçası, lazer ışını ise ışındır.",
    "modelAnswer": "• Gergin çamaşır ipi: İki ucu çivilerle sınırlandırıldığı için 'Doğru Parçası'dır.\n• Lazer ışığı: Başlangıç noktası cihazda sabit olup duvara uzandığı için 'Işın'dır.",
    "rubric": [("İpin doğru parçası olarak tespiti", 0.5), ("Lazerin ışın olarak tespiti", 0.5)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.1', 4, 0)] = {
    "contextText": "Sayı doğrusu ve parça analizi.",
    "stimulus": "Sayı doğrusu üzerinde 2 ile 9 sayıları arasındaki bölge kırmızı renkle boyanmıştır.",
    "questionText": "Sayı doğrusunun kendisi bir 'doğru' olduğuna göre, 2 ile 9 arasındaki bu kırmızı boyalı parçanın geometrik adı ve sembolik gösterimi nedir?",
    "solutionExplanation": "Doğru parçasıdır, [2, 9] veya [AB].",
    "modelAnswer": "Geometrik Adı: Doğru parçasıdır.\nSembolik Gösterimi: [AB] (2 noktası A, 9 noktası B alınırsa [AB] doğru parçasıdır).",
    "rubric": [("Doğru parçası adının yazılması", 0.5), ("Sembolik köşeli parantez gösteriminin yazılması", 0.5)]
}

# MAT.5.3.2 (Temel geometrik çizimler: dikme ve eşit uzunluk)
G5_DEDICATED[('matematik', 'MAT.5.3.2', 0, 0)] = {
    "contextText": "Gönye ile 90 derecelik dikme çizimi.",
    "stimulus": "Yatay bir tahta çıtaya tam 90 derecelik dikey bir destek tahtası monte edilecektir.",
    "questionText": "Bir doğruya üzerindeki bir noktadan dik doğru (dikme) çizebilmek için hangi matematiksel çizim aracı kullanılır? Kısaca açıklayınız.",
    "solutionExplanation": "Gönye (veya iletki) kullanılır.",
    "modelAnswer": "Dikme çizmek için üzerinde 90 derecelik dik açı bulunan 'gönye' (veya açıölçer/iletki) kullanılır. Gönyenin bir dik kenarı verilen doğruya çakıştırılır, köşesinden yukarıya doğru dik çizgi çizilir.",
    "rubric": [("Gönye veya açıölçer aracının belirtilmesi", 0.5), ("90 derecelik diklik uygulamasının açıklanması", 0.5)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.2', 1, 0)] = {
    "contextText": "Kareli zeminde eşit uzunlukta doğru parçası.",
    "stimulus": "Kareli zeminde [AB] doğru parçası yatayda 4 birim, dikeyde 3 birim ötelenerek çizilmiştir.",
    "questionText": "C noktasından başlayarak [AB]'ye eşit uzunlukta yeni bir [CD] doğru parçası çizmek isteyen Ayşe, D noktasını kareli zeminde nasıl belirlemelidir?",
    "solutionExplanation": "C noktasından yatayda 4 birim, dikeyde 3 birim sayarak D noktasını belirler.",
    "modelAnswer": "Ayşe, C noktasından başlayarak yatayda 4 birim ve dikeyde 3 birim (ya da dikeyde 4, yatayda 3 birim) sayıp D noktasını işaretlemeli ve bu iki noktayı cetvelle birleştirmelidir. Yatay ve dikey adımları eşit olan doğru parçalarının uzunlukları birbirine eşittir.",
    "rubric": [("Yatayda 4, dikeyde 3 birim kuralının yazılması", 0.5), ("Eşit uzunluk şartının açıklanması", 0.5)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.2', 3, 0)] = {
    "contextText": "Pergel ile eşit doğru parçası kopyalama.",
    "stimulus": "Burak, pergelinin kollarını [MN] doğru parçasının boyu kadar açmış, açıklığı değiştirmeden pergelin sivri ucunu P noktasına batırıp bir yay çizmiştir.",
    "questionText": "Burak'ın cetvel kullanmadan yaptığı bu pergel çiziminin geometrik amacı nedir? Açıklayınız.",
    "solutionExplanation": "Bir doğru parçasının uzunluğunu başka bir yere birebir eşit kopyalamak.",
    "modelAnswer": "Bu çizim, verilen [MN] doğru parçasına eşit uzunlukta yeni bir doğru parçası inşa etmek (uzunluk kopyalamak) amacıyla yapılır.",
    "rubric": [("Eşit uzunlukta doğru parçası inşa etme amacının yazılması", 0.5), ("Pergelin açıklığı koruma işlevinin açıklanması", 0.5)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.2', 4, 0)] = {
    "contextText": "Paralel doğru çizme yöntemi.",
    "stimulus": "Kareli deftere çizilen bir d doğrusuna paralel bir k doğrusu çizilecektir.",
    "questionText": "İki doğrunun birbirine paralel olması için doğrular üzerindeki karşılıklı noktalar arasındaki dik uzaklıkların nasıl olması gerekir? Açıklayınız.",
    "solutionExplanation": "Aralarındaki dik mesafe her noktada eşit ve sabit olmalıdır.",
    "modelAnswer": "Paralel doğrular arasındaki dik uzaklık her noktada birbirine eşit ve sabit olmalıdır. Bu sayede doğrular sonsuza kadar uzatılsalar bile hiçbir zaman kesişmezler.",
    "rubric": [("Dik mesafenin her noktada eşit olması kuralı", 0.5), ("Hiçbir noktada kesişmeme özelliğinin yazılması", 0.5)]
}

# MAT.5.3.3 (Açı ölçümü ve çeşitleri)
G5_DEDICATED[('matematik', 'MAT.5.3.3', 0, 0)] = {
    "contextText": "Açı çeşitleri sınıflandırması.",
    "stimulus": "Ölçüleri verilen açılar:\nK = 35°, L = 90°, M = 140°, N = 180°",
    "questionText": "K, L, M ve N açılarının çeşitlerini (dar açı, dik açı, geniş açı, doğru açı) karşılarına sırasıyla yazınız.",
    "solutionExplanation": "K dar açı, L dik açı, M geniş açı, N doğru açıdır.",
    "modelAnswer": "K (35°): Dar Açı\nL (90°): Dik Açı\nM (140°): Geniş Açı\nN (180°): Doğru Açı",
    "rubric": [("Dört açının sınıflandırılmasının doğruluğu", 0.6), ("Açı aralıklarının doğrulanması", 0.4)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.3', 1, 0)] = {
    "contextText": "Saat kadranında akrep ve yelkovan açıları.",
    "stimulus": "Bir analog saatte:\n1. Durum: Saat tam 03.00\n2. Durum: Saat tam 04.00",
    "questionText": "1. Durum ve 2. Durum'da akrep ile yelkovan arasında oluşan açıların derece cinsinden ölçülerini ve açı çeşitlerini yazınız.",
    "solutionExplanation": "Her saat aralığı 30 derecedir. Saat 3.00 -> 90 derece dik açı, saat 4.00 -> 120 derece geniş açı.",
    "modelAnswer": "• 1. Durum (Saat 03.00): 3 x 30° = 90° olup 'Dik Açı'dır.\n• 2. Durum (Saat 04.00): 4 x 30° = 120° olup 'Geniş Açı'dır.",
    "rubric": [("03.00 için 90° ve dik açı tespiti", 0.5), ("04.00 için 120° ve geniş açı tespiti", 0.5)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.3', 2, 0)] = {
    "contextText": "Makas kollarındaki açı değişimi.",
    "stimulus": "Bir terzi makasının kolları arasındaki açı önce 40° iken daha sonra açılarak 130° olmuştur.",
    "questionText": "Makasın kolları arasındaki açı 40° iken ve 130° olduğunda hangi açı çeşitlerine karşılık gelir? Yazınız.",
    "solutionExplanation": "40 derece dar açı, 130 derece geniş açıdır.",
    "modelAnswer": "• 40° iken: Dar Açı'dır (0° ile 90° arası).\n• 130° olduğunda: Geniş Açı'dır (90° ile 180° arası).",
    "rubric": [("40° için dar açı tespiti", 0.5), ("130° için geniş açı tespiti", 0.5)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.3', 2, 1)] = {
    "contextText": "Dik açıyı bölen ışın problemi.",
    "stimulus": "Ölçüsü 90° olan bir dik açının köşesinden bir ışın geçirilerek iki komşu açı oluşturulmuştur. Bu açılardan biri 55°'dir.",
    "questionText": "Diğer komşu açının ölçüsünü işlem yaparak bulunuz ve bu açının türünü yazınız.",
    "solutionExplanation": "90 - 55 = 35 derece. 35 derece dar açıdır.",
    "modelAnswer": "İşlem: 90° - 55° = 35°\nAçının Türü: 35° ölçüsü 90 dereceden küçük olduğu için 'Dar Açı'dır.",
    "rubric": [("90 - 55 = 35° işleminin doğruluğu", 0.5), ("Dar açı türünün doğru yazılması", 0.5)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.3', 3, 0)] = {
    "contextText": "İletki (açıölçer) ile açı ölçme adımları.",
    "stimulus": "Deftere çizilmiş bir ABC açısının ölçüsü iletki yardımıyla ölçülecektir.",
    "questionText": "İletkinin merkez noktasının açının hangi bölgesine konulması gerektiğini ve kenarlardan birinin nasıl hizalanacağını 2 adımda açıklayınız.",
    "solutionExplanation": "Merkez açının tepe noktasına (B) konur, sıfır çizgisi kenarlardan birine çakıştırılır.",
    "modelAnswer": "1. İletkinin orta merkez noktası açının köşe (tepe) noktası olan B noktasına tam olarak yerleştirilir.\n2. İletkinin tabanındaki 0° çizgisi açının bir kolu (ışını) üzerine tam çakıştırılır ve diğer kolun gösterdiği derece okunur.",
    "rubric": [("İletki merkezinin köşe noktasına konması kuralı", 0.5), ("Sıfır çizgisinin açının koluna hizalanması adımı", 0.5)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.3', 3, 1)] = {
    "contextText": "Doğru açıdan açı çıkarma.",
    "stimulus": "Ölçüsü 180° olan bir doğru açının üzerinden çizilen bir ışın ile komşu iki açı oluşmuştur. Açılardan biri 115°'dir.",
    "questionText": "Diğer açının ölçüsünü hesaplayınız ve açının çeşidini belirtiniz.",
    "solutionExplanation": "180 - 115 = 65 derecedir. 65 derece dar açıdır.",
    "modelAnswer": "İşlem: 180° - 115° = 65°\nAçının Çeşidi: 'Dar Açı'dır.",
    "rubric": [("180 - 115 = 65° işleminin doğruluğu", 0.5), ("Dar açı sınıflandırması", 0.5)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.3', 4, 0)] = {
    "contextText": "Kitap kapağı açılma açıları.",
    "stimulus": "Masa üzerinde kapalı duran bir kitabın kapağı önce 45° dikleştirilmiş, ardından tamamen arkaya yatırılarak masayla düz bir doğru oluşturacak şekilde 180° açılmıştır.",
    "questionText": "Kapağın 45° ve 180° açıldığında oluşturduğu açı çeşitlerini yazınız.",
    "solutionExplanation": "45 derece dar açı, 180 derece doğru açıdır.",
    "modelAnswer": "• 45° açıldığında: Dar Açı\n• 180° açıldığında: Doğru Açı",
    "rubric": [("45° için dar açı tespiti", 0.5), ("180° için doğru açı tespiti", 0.5)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.3', 4, 1)] = {
    "contextText": "En küçük geniş açı ve en büyük dar açı.",
    "stimulus": "Doğal sayı olan açılar incelenmektedir.",
    "questionText": "a) Derece cinsinden en büyük dar açının ölçüsü kaç derecedir?\nb) Derece cinsinden en küçük geniş açının ölçüsü kaç derecedir?",
    "solutionExplanation": "En büyük dar açı 89°, en küçük geniş açı 91°'dir.",
    "modelAnswer": "a) En büyük dar açı: 89°'dir (90 dereceden küçük en büyük tam sayı).\nb) En küçük geniş açı: 91°'dir (90 dereceden büyük en küçük tam sayı).",
    "rubric": [("a şıkkında 89° cevabının yazılması", 0.5), ("b şıkkında 91° cevabının yazılması", 0.5)]
}

# MAT.5.3.4 (İki veya üç doğrunun durumları)
G5_DEDICATED[('matematik', 'MAT.5.3.4', 0, 0)] = {
    "contextText": "Sokak krokisinde paralel ve dik kesişen yollar.",
    "stimulus": "Şehir krokisinde Gül Sokak ile Karanfil Sokak birbirini hiç kesmemektedir. Lale Caddesi ise hem Gül Sokak'ı hem de Karanfil Sokak'ı 90 derecelik açıyla kesmektedir.",
    "questionText": "a) Gül Sokak ile Karanfil Sokak birbirine göre nasıl doğrulardır?\nb) Lale Caddesi ile Gül Sokak birbirine göre nasıl doğrulardır?",
    "solutionExplanation": "a paralel doğrular, b dik kesişen doğrulardır.",
    "modelAnswer": "a) Gül Sokak ve Karanfil Sokak: 'Paralel Doğrular'dır (kesişmezler).\nb) Lale Caddesi ve Gül Sokak: 'Dik Kesişen Doğrular'dır (aralarındaki açı 90°'dir).",
    "rubric": [("Paralel doğrular ilişkisinin yazılması", 0.5), ("Dik kesişen doğrular ilişkisinin yazılması", 0.5)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.4', 1, 0)] = {
    "contextText": "Düzlemde kesişen iki doğru.",
    "stimulus": "Aynı düzlemde yer alan m ve n doğruları yalnızca tek bir P noktasında birbirini kesmektedir.",
    "questionText": "Bu iki doğrunun ortak nokta sayısı kaçtır? Aralarındaki açı 90 derece olmadığına göre bu doğruların geometrik durumunu yazınız.",
    "solutionExplanation": "Ortak nokta sayısı 1'dir, kesişen doğrulardır.",
    "modelAnswer": "• Ortak Nokta Sayısı: 1'dir (P noktası).\n• Geometrik Durum: 'Kesişen Doğrular'dır (eğik kesişen doğrular).",
    "rubric": [("Ortak nokta sayısının 1 olduğunun belirtilmesi", 0.5), ("Kesişen doğrular durumunun yazılması", 0.5)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.4', 2, 0)] = {
    "contextText": "Çakışık doğrular tanımı.",
    "stimulus": "Düzlemde d1 ve d2 doğrularının bütün noktaları birbiriyle üst üste gelmektedir.",
    "questionText": "Bütün noktaları ortak olan ve üst üste gelen bu tür doğrulara ne ad verilir? Yazınız.",
    "solutionExplanation": "Çakışık doğrulardır.",
    "modelAnswer": "Bütün noktaları ortak olan bu doğrulara 'Çakışık Doğrular' adı verilir.",
    "rubric": [("Çakışık doğrular kavramının doğru yazılması", 1.0)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.4', 2, 1)] = {
    "contextText": "Üç doğrunun düzlemdeki durumları: Üçgen oluşturma.",
    "stimulus": "Düzlemde bulunan a, b ve c doğruları ikişer ikişer kesişerek 3 farklı kesişim noktası oluşturmuştur.",
    "questionText": "Bu üç doğrunun kesişmesiyle doğruların arasında hangi geometrik çokgen şekli meydana gelir? Yazınız.",
    "solutionExplanation": "Üçgen meydana gelir.",
    "modelAnswer": "Bu üç doğrunun ikişerli kesişmesi sonucunda doğruların arasında bir 'Üçgen' meydana gelir.",
    "rubric": [("Üçgen cevabının doğru verilmesi", 1.0)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.4', 3, 0)] = {
    "contextText": "Pencere çerçevesindeki demirler.",
    "stimulus": "Bir pencere demirliğinde yatay iki demir çubuk birbirine paraleldir. Düşey üç demir çubuk ise bu yatay çubukları dik kesmektedir.",
    "questionText": "Düşey çubukların birbirine göre durumunu ve yatay çubuklarla oluşturduğu açıyı yazınız.",
    "solutionExplanation": "Düşey çubuklar birbirine paraleldir, yataylarla 90 derecelik dik açı oluştururlar.",
    "modelAnswer": "• Düşey demir çubuklar birbirine 'Paralel'dir.\n• Yatay demirlerle aralarındaki açı tam 90° olup birbirlerini 'Dik Kesişirler'.",
    "rubric": [("Düşey çubukların paralellik durumunun yazılması", 0.5), ("Yataylarla 90 derecelik dik kesişme durumunun yazılması", 0.5)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.4', 4, 0)] = {
    "contextText": "Noktadaş doğrular.",
    "stimulus": "Düzlemde yer alan k, l ve m doğrularının üçü de aynı O noktasından geçmektedir.",
    "questionText": "Tek bir ortak noktadan geçen bu tür doğrular geometride nasıl adlandırılır? Yazınız.",
    "solutionExplanation": "Noktadaş (tek noktada kesişen) doğrulardır.",
    "modelAnswer": "Aynı ortak noktadan geçen bu doğrulara 'Noktadaş Doğrular' (veya tek noktada kesişen doğrular) denir.",
    "rubric": [("Noktadaş doğrular tanımının doğru yazılması", 1.0)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.4', 4, 1)] = {
    "contextText": "Paralel iki doğruyu kesen üçüncü doğru.",
    "stimulus": "Birbirine paralel d1 ve d2 doğruları bir k doğrusu tarafından kesilmektedir.",
    "questionText": "Bu durumda toplam kaç farklı kesişim noktası oluşur? Açıklayınız.",
    "solutionExplanation": "2 farklı kesişim noktası oluşur.",
    "modelAnswer": "Toplam 2 farklı kesişim noktası oluşur. Çünkü k doğrusu birinci paralel doğruyu 1 noktada, ikinci paralel doğruyu da 1 ayrı noktada keser.",
    "rubric": [("2 kesişim noktası sonucunun yazılması", 0.5), ("Her paralel doğru için birer kesişim gerekçesi", 0.5)]
}

# MAT.5.3.5 (Çokgen tanımı ve adlandırma)
G5_DEDICATED[('matematik', 'MAT.5.3.5', 0, 0)] = {
    "contextText": "Çokgen olma şartları.",
    "stimulus": "Şekil 1: Üç doğru parçasının uç uca eklenmesiyle oluşan kapalı şekil\nŞekil 2: Dört doğru parçasıyla çizilmiş fakat bir köşesi açık bırakılmış şekil\nŞekil 3: Bir kenarı çember yayı olan kapalı şekil",
    "questionText": "Verilen şekillerden hangisi çokgendir? Çokgen olabilmesi için gereken 2 temel kuralı yazınız.",
    "solutionExplanation": "Yalnızca Şekil 1 çokgendir. Kapalı olmalı ve sadece doğru parçalarından oluşmalıdır.",
    "modelAnswer": "Yalnızca Şekil 1 çokgendir.\nÇokgen Olma Kuralları:\n1. Şekil tamamen kapalı olmalıdır (açıklık kalmamalıdır).\n2. Kenarları mutlaka doğru parçalarından oluşmalı, eğri veya yay içermemelidir.",
    "rubric": [("Yalnızca Şekil 1 tespiti", 0.5), ("Kapalı olma ve doğru parçalarından oluşma şartları", 0.5)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.5', 1, 0)] = {
    "contextText": "Kenar ve köşe sayılarına göre adlandırma.",
    "stimulus": "Trafik tabelalarından 'Yol Ver' levhası 3 kenarlı, 'Dur' levhası ise 8 kenarlıdır.",
    "questionText": "Çokgenler neye göre isimlendirilir? Yukarıdaki iki levhanın geometrik çokgen isimlerini yazınız.",
    "solutionExplanation": "Kenar (veya köşe) sayılarına göre isimlendirilir. Üçgen ve sekizgen.",
    "modelAnswer": "Çokgenler 'kenar veya köşe sayılarına göre' isimlendirilir.\n• 3 kenarlı levha: Üçgen\n• 8 kenarlı levha: Sekizgen",
    "rubric": [("Kenar/köşe sayısına göre adlandırma kuralı", 0.5), ("Üçgen ve sekizgen isimlerinin doğru yazılması", 0.5)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.5', 2, 0)] = {
    "contextText": "Beşgen ve altıgen kenar/köşe özellikleri.",
    "stimulus": "Tahtada bir beşgen ve bir altıgen çizilidir.",
    "questionText": "Beşgenin ve altıgenin kenar sayıları ile köşe sayılarını karşılaştırınız. Çokgenlerde kenar sayısı ile köşe sayısı arasında nasıl bir ilişki vardır?",
    "solutionExplanation": "Beşgen: 5 kenar 5 köşe, Altıgen: 6 kenar 6 köşe. Çokgenlerde kenar sayısı köşe sayısına daima eşittir.",
    "modelAnswer": "• Beşgen: 5 kenarı ve 5 köşesi vardır.\n• Altıgen: 6 kenarı ve 6 köşesi vardır.\nİlişki: Bütün çokgenlerde kenar sayısı köşe sayısına daima eşittir.",
    "rubric": [("Beşgen ve altıgen sayısal değerlerinin yazılması", 0.5), ("Kenar sayısı = köşe sayısı kuralının belirtilmesi", 0.5)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.5', 3, 0)] = {
    "contextText": "En az kenarlı çokgen.",
    "stimulus": "İki doğru parçası uç uca eklendiğinde düzlemde kapalı bir alan oluşturamaz.",
    "questionText": "En az kenara sahip olan çokgenin adı nedir ve kaç kenardan oluşur? Açıklayınız.",
    "solutionExplanation": "Üçgendir, 3 kenardan oluşur.",
    "modelAnswer": "En az kenara sahip çokgen 'Üçgen'dir ve 3 kenardan oluşur. Düzlemde kapalı bir bölge oluşturabilmek için en az 3 doğru parçasına ihtiyaç vardır.",
    "rubric": [("Üçgen adının ve 3 kenar bilgisinin yazılması", 0.5), ("Kapalı alan oluşturma gerekçesinin açıklanması", 0.5)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.5', 4, 0)] = {
    "contextText": "Futbol topu üzerindeki çokgenler.",
    "stimulus": "Klasik bir futbol topunun yüzeyinde siyah beşgenler ve beyaz altıgenler birbirine dikilmiştir.",
    "questionText": "Bir beşgenin ve bir altıgenin toplam kaç kenarı vardır? İşlemle gösteriniz.",
    "solutionExplanation": "5 + 6 = 11 kenardır.",
    "modelAnswer": "Beşgenin 5 kenarı, altıgenin 6 kenarı vardır.\nToplam Kenar = 5 + 6 = 11 kenardır.",
    "rubric": [("Beşgenin 5, altıgenin 6 kenar olduğunun tespiti", 0.5), ("Toplama işlemiyle 11 sonucunun yazılması", 0.5)]
}

# MAT.5.3.6 (Köşegenler ve iç açılar)
G5_DEDICATED[('matematik', 'MAT.5.3.6', 0, 0)] = {
    "contextText": "Dörtgen köşegenleri ve üçgen istisnası.",
    "stimulus": "Çokgenlerde komşu olmayan iki köşeyi birleştiren doğru parçasına 'köşegen' denir.",
    "questionText": "a) Bir dörtgenin (örneğin dikdörtgenin) kaç köşegeni vardır?\nb) Bir üçgenin neden köşegeni yoktur? Gerekçesini yazınız.",
    "solutionExplanation": "Dörtgenin 2 köşegeni vardır. Üçgende bütün köşeler birbirine komşudur.",
    "modelAnswer": "a) Bir dörtgenin toplam 2 adet köşegeni vardır.\nb) Üçgenin köşegeni yoktur; çünkü üçgende her köşe diğer iki köşenin ikisine de komşudur, birleşecek komşu olmayan köşe bulunmaz.",
    "rubric": [("a şıkkında 2 köşegen cevabı", 0.5), ("b şıkkında komşu olmayan köşe bulunmaması gerekçesi", 0.5)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.6', 1, 0)] = {
    "contextText": "Üçgenin iç açıları toplamı.",
    "stimulus": "Bir KLM üçgeninin iki iç açısının ölçüsü verilmiştir: m(K) = 55° ve m(L) = 65°.",
    "questionText": "Üçgenin iç açıları toplamı kuralını yazarak M açısının ölçüsünü işlem basamaklarıyla hesaplayınız.",
    "solutionExplanation": "180 - (55 + 65) = 180 - 120 = 60 derece.",
    "modelAnswer": "Kural: Bir üçgenin iç açıları toplamı 180°'dir.\nİşlem:\n55° + 65° = 120°\nm(M) = 180° - 120° = 60°",
    "rubric": [("180° kuralının yazılması", 0.5), ("İşlemle 60° sonucunun bulunması", 0.5)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.6', 1, 1)] = {
    "contextText": "Dörtgenin iç açıları toplamı.",
    "stimulus": "Bir dörtgenin üç açısı 85°, 95° ve 105° olarak ölçülmüştür.",
    "questionText": "Dörtgenlerin iç açıları toplamı kuralını belirterek verilmeyen dördüncü açıyı bulunuz.",
    "solutionExplanation": "360 - (85 + 95 + 105) = 360 - 285 = 75 derece.",
    "modelAnswer": "Kural: Bütün dörtgenlerin iç açıları toplamı 360°'dir.\nİşlem:\n85° + 95° + 105° = 285°\nDördüncü Açı = 360° - 285° = 75°",
    "rubric": [("360° kuralının yazılması", 0.5), ("İşlemle 75° sonucunun bulunması", 0.5)]
}
G5_DEDICATED[('matematik', 'MAT.5.3.6', 2, 0)] = {
    "contextText": "Dik açılı üçgende bilinmeyen açı.",
    "stimulus": "Bir dik üçgende dik açının ölçüsü 90° olup dar açılardan birinin ölçüsü 32°'dir.",
    "questionText": "Bu dik üçgendeki diğer dar açının ölçüsünü işlem yaparak bulunuz.",
    "solutionExplanation": "90 - 32 = 58 derece.",
    "modelAnswer": "İşlem:\n90° - 32° = 58° (veya 180 - (90+32) = 58°)\nDiğer dar açı 58°'dir.",
    "rubric": [("İşlem basamaklarının gösterilmesi", 0.5), ("58° sonucunun doğru bulunması", 0.5)]
}

# MAT.5.3.7 (Düzlemde iki noktanın birbirine göre konumu)
G5_DEDICATED[('matematik', 'MAT.5.3.7', 0, 0)] = {
    "contextText": "Kareli kâğıtta okul ve kütüphane konumu.",
    "stimulus": "Kareli zeminde okul A noktasında, kütüphane B noktasındadır. B noktası A noktasından 5 birim sağda ve 2 birim yukarıdadır.",
    "questionText": "B noktasının A noktasına göre konumunu tek bir cümleyle ifade ediniz.",
    "solutionExplanation": "B noktası, A noktasının 5 birim sağında ve 2 birim yukarısındadır.",
    "modelAnswer": "B noktası, A noktasının '5 birim sağında ve 2 birim yukarısındadır'.",
    "rubric": [("Birim sayılarının (5 ve 2) doğruluğu", 0.5), ("Yönlerin (sağ ve yukarı) doğru ifade edilmesi", 0.5)]
}

print("Grade 5 Matematik dedicated questions registered!")
