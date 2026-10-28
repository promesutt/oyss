# -*- coding: utf-8 -*-
import json

def distribute_points(count):
    base = 100 // count
    rem = 100 % count
    return [base + (1 if i < rem else 0) for i in range(count)]

# Bank of distinct questions for Grade 5 Matematik
# Outcomes: MAT.5.3.1, MAT.5.3.2, MAT.5.3.3, MAT.5.3.4, MAT.5.3.5, MAT.5.3.6, MAT.5.3.7
G5_MAT_QUESTIONS = {
    'MAT.5.3.1': [
        {
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Doğru, doğru parçası ve ışın çizimi.",
            "stimulus": "Aşağıdaki geometrik şekiller birer nesne ile modellenmiştir:\n1. İki ucu da sonsuza uzayan düz tren rayı\n2. İki ucu da düğümlenmiş 50 cm uzunluğundaki paket lastiği\n3. Bir ucu sabit el fenerinden çıkan ışık huzmesi",
            "questionText": "Numaralandırılmış modellerin hangi temel geometrik kavramları (doğru, doğru parçası, ışın) temsil ettiğini karşılarına sırasıyla yazınız.",
            "solutionExplanation": "1 doğru, 2 doğru parçası, 3 ışındır.",
            "modelAnswer": "1: Doğru (iki yönden de sonsuza uzanır)\n2: Doğru parçası (iki ucu da sınırlıdır, boyu ölçülebilir)\n3: Işın (başlangıç noktası sabit, diğer ucu sonsuza uzanır)",
            "rubric_criteria": ["Üç geometrik modelin doğru kavramla eşleştirilmesi", "Her bir kavramın gerekçesinin belirtilmesi"]
        },
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Sembolle gösterme: [AB], AB, [AB.",
            "stimulus": "Düzlemde A ve B noktaları işaretlenmiştir.",
            "questionText": "a) A noktasından başlayıp B noktasından sonsuza uzanan ışını sembolle gösteriniz.\nb) A ve B noktaları arasında kalan doğru parçasını sembolle gösteriniz.",
            "solutionExplanation": "Işın [AB, doğru parçası [AB] şeklinde gösterilir.",
            "modelAnswer": "a) Işın sembolü: [AB\nb) Doğru parçası sembolü: [AB] (veya |AB| uzunluk için)",
            "rubric_criteria": ["a şıkkında [AB sembolünün doğru yazılması", "b şıkkında [AB] sembolünün doğru yazılması"]
        },
        {
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Uzunluğu ölçülebilen geometrik kavram.",
            "stimulus": "Zeynep cetveliyle defterine çizdiği geometrik şeklin boyunu 12 cm olarak ölçmüştür.",
            "questionText": "Zeynep'in çizdiği ve cetvelle boyunu ölçebildiği bu geometrik şekil 'doğru' mudur yoksa 'doğru parçası' mıdır? Nedenini açıklayınız.",
            "solutionExplanation": "Doğru parçasının başlangıç ve bitiş noktası bellidir, boyu ölçülebilir.",
            "modelAnswer": "Zeynep'in çizdiği şekil bir 'doğru parçası'dır. Çünkü doğrular her iki yönden sonsuza uzandığı için boyları ölçülemez; sadece iki ucu sınırlandırılmış doğru parçalarının belirli bir uzunluğu ölçülebilir.",
            "rubric_criteria": ["Doğru parçası tespiti", "Sonsuza uzamama / sınırlı olma gerekçesinin açıklanması"]
        },
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Güneş ışınları ve lazer metresi.",
            "stimulus": "İnşaat ustası Ali Bey, duvara lazer metresi tuttuğunda aletten çıkan lazer çizgisini incelemektedir.",
            "questionText": "Lazer metresinden çıkan bu kırmızı çizgi başlangıç noktası cihazda sabit olup duvara kadar uzandığına göre hangi geometrik şekle en güzel örnektir? Yazınız.",
            "solutionExplanation": "Işındır.",
            "modelAnswer": "Lazer metresinden çıkan çizgi bir 'Işın' modelidir. Çünkü başlangıç noktası cihazın merceğinde sabittir, diğer yönü ise duvara ve sonsuza doğru uzanır.",
            "rubric_criteria": ["Işın modelinin doğru belirlenmesi", "Başlangıç noktası sabitliği özelliğinin vurgulanması"]
        },
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Sayı doğrusu üzerindeki noktalar.",
            "stimulus": "Bir sayı doğrusu üzerinde 0 noktası ile 8 noktası arasındaki bölge taranmıştır.",
            "questionText": "Sayı doğrusunun kendisi bir 'doğru' iken, 0 ile 8 sayıları arasında kalan taranmış bu parça hangi geometrik kavrama karşılık gelir? Sembolik gösterimini yapınız.",
            "solutionExplanation": "Doğru parçasıdır, [0, 8] aralığı.",
            "modelAnswer": "Kavram: Doğru parçasıdır.\nSembolik gösterim: [AB] (0 noktası A, 8 noktası B olarak adlandırılırsa [AB] doğru parçasıdır).",
            "rubric_criteria": ["Doğru parçası kavramının yazılması", "Sembolik gösterim kuralının uygulanması"]
        }
    ],

    'MAT.5.3.2': [
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Cetvel ve gönye ile dikme çizimi.",
            "stimulus": "Mimar Sinan Köprüsü projesinde su yüzeyine paralel olan yatay taban tahtasına tam 90 derecelik taşıyıcı dikey ayaklar monte edilecektir.",
            "questionText": "Bir doğruya üzerindeki veya dışındaki bir noktadan dik doğru (dikme) çizebilmek için hangi iki matematiksel araç kullanılır? Yazınız.",
            "solutionExplanation": "Gönye ve cetvel (veya iletki/pergel).",
            "modelAnswer": "Dikme çiziminde cetvel ile birlikte özellikle 90 derecelik dik açısı bulunan 'gönye' (veya pergel / açıölçer) kullanılır.",
            "rubric_criteria": ["Gönye ve cetvel araçlarının doğru yazılması", "90 derecelik diklik ilişkisinin açıklanması"]
        },
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Kareli kâğıtta eşit uzunlukta doğru parçaları.",
            "stimulus": "Kareli kâğıtta çizilen [AB] doğru parçası yatayda 3 birim, dikeyde 4 birim ötelenerek oluşturulmuştur.",
            "questionText": "[AB] doğru parçasına eşit uzunlukta yeni bir [CD] doğru parçası çizmek isteyen öğrencinin kareli kâğıtta izlemesi gereken birim adım kuralını açıklayınız.",
            "solutionExplanation": "Yatay ve dikey birim mesafeleri 3 ve 4 birim olmalıdır.",
            "modelAnswer": "Öğrenci, C noktasından başlayarak D noktasına ulaşmak için yatayda 3 birim ve dikeyde 4 birim (veya dikeyde 3, yatayda 4 birim) sayarak D noktasını belirlemeli ve birleştirmelidir. Yatay ve düşey uzaklıkları aynı olan doğru parçalarının uzunlukları birbirine eşittir.",
            "rubric_criteria": ["Yatayda ve dikeyde 3'e 4 birim kuralının belirtilmesi", "Eşit uzunluk şartının gerekçelendirilmesi"]
        },
        {
            "difficulty": "Zor",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Paralel doğru parçası inşa etme.",
            "stimulus": "Kareli zeminde verilen bir k doğrusuna paralel bir m doğrusu çizilecektir.",
            "questionText": "İki doğrunun birbirine paralel olabilmesi için doğrular üzerindeki karşılıklı noktalar arasındaki dik mesafelerin nasıl olması gerekir? Açıklayınız.",
            "solutionExplanation": "Noktalar arasındaki dik mesafe her yerde eşit ve sabit olmalıdır.",
            "modelAnswer": "Paralel iki doğru arasındaki dik uzaklık her noktada birbirine eşit ve sabit olmalıdır. Bu doğrular ne kadar uzatılırsa uzatılsın hiçbir noktada birbirini kesmez.",
            "rubric_criteria": ["Dik mesafenin her noktada eşit olması şartı", "Hiçbir zaman kesişmeme özelliğinin yazılması"]
        },
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Pergel yardımıyla eşit doğru parçası kopyalama.",
            "stimulus": "Ali pergelinin kollarını [KL] doğru parçasının uç noktaları kadar açmış, açıklığı hiç bozmadan pergelin sivri ucunu M noktasına koyup bir yay çizmiştir.",
            "questionText": "Ali'nin pergel açıklığını bozmadan yaptığı bu çizim geometride hangi amaçla kullanılır? Yazınız.",
            "solutionExplanation": "Bir doğru parçasının uzunluğunu cetvel kullanmadan başka bir yere birebir eşit kopyalamak için.",
            "modelAnswer": "Bu çizim, verilen bir doğru parçasına [KL] eşit uzunlukta başka bir doğru parçası inşa etmek (uzunluk kopyalamak) amacıyla kullanılır.",
            "rubric_criteria": ["Eşit uzunlukta doğru parçası inşa etme amacının yazılması", "Pergelin sabit açıklık fonksiyonunun açıklanması"]
        }
    ],

    'MAT.5.3.3': [
        {
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Açı çeşitleri sınıflandırması.",
            "stimulus": "Açıölçer (iletki) ile ölçülen dört açının ölçüleri şöyledir:\nA = 42°, B = 90°, C = 135°, D = 180°",
            "questionText": "Bu açıların çeşitlerini (dar açı, dik açı, geniş açı, doğru açı) karşılarına sırasıyla yazınız.",
            "solutionExplanation": "A dar açı, B dik açı, C geniş açı, D doğru açıdır.",
            "modelAnswer": "A = 42° : Dar açı (0° ile 90° arası)\nB = 90° : Dik açı (tam 90°)\nC = 135° : Geniş açı (90° ile 180° arası)\nD = 180° : Doğru açı (tam 180°)",
            "rubric_criteria": ["Dört açının türünün doğru yazılması", "Açı ölçü aralıkları tanımının belirtilmesi"]
        },
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Duvar saatinde akrep ve yelkovan açıları.",
            "stimulus": "Bir analog duvar saatinde:\nDurum 1: Saat tam 03.00'ü gösterirken\nDurum 2: Saat tam 02.00'yi gösterirken",
            "questionText": "Durum 1 ve Durum 2'de akrep ile yelkovan arasında oluşan açıların çeşitlerini ve derece cinsinden ölçülerini yazınız.",
            "solutionExplanation": "Saat kadranında her saat arası 360/12 = 30 derecedir. Saat 3.00 dik açı (90°), saat 2.00 dar açı (60°).",
            "modelAnswer": "• Durum 1 (Saat 03.00): Akrep ile yelkovan arasında 3 saat aralığı vardır. 3 x 30° = 90° olup 'Dik Açı'dır.\n• Durum 2 (Saat 02.00): Akrep ile yelkovan arasında 2 saat aralığı vardır. 2 x 30° = 60° olup 'Dar Açı'dır.",
            "rubric_criteria": ["Saat 03.00 için 90° ve dik açı tespiti", "Saat 02.00 için 60° ve dar açı tespiti"]
        },
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Makas kollarındaki açı değişimi.",
            "stimulus": "Bir terzi kumaş keserken makasın kollarını önce 35° açmış, kalın kumaşa gelince kolları 115°'ye kadar genişletmiştir.",
            "questionText": "Makasın kolları arasındaki açının çeşidi 35° iken neydi, 115° olunca hangi açı türüne dönüştü? Yazınız.",
            "solutionExplanation": "35 derece dar açıdır, 115 derece geniş açıdır.",
            "modelAnswer": "35° iken: Dar açıdır.\n115° olduğunda: Geniş açıya dönüşmüştür.",
            "rubric_criteria": ["İlk durumun dar açı olarak tespiti", "İkinci durumun geniş açı olarak tespiti"]
        },
        {
            "difficulty": "Zor",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Tümler ve komşu açılar mantığı.",
            "stimulus": "Bir dik açının (90°) içinden çizilen bir ışın dik açıyı iki parçaya bölmüştür. Parçalardan birinin ölçüsü 38°'dir.",
            "questionText": "Diğer parçanın ölçüsünü işlem basamaklarını göstererek bulunuz ve bu açının çeşidini yazınız.",
            "solutionExplanation": "90 - 38 = 52 derecedir. 52 derece de dar açıdır.",
            "modelAnswer": "İşlem: 90° - 38° = 52°\nAçının Çeşidi: 52° ölçüsü 90 dereceden küçük olduğu için 'Dar Açı'dır.",
            "rubric_criteria": ["Çıkarma işleminin ve 52° sonucunun doğruluğu", "Dar açı sınıflandırmasının doğru yazılması"]
        }
    ],

    'MAT.5.3.4': [
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "İki doğrunun birbirine göre durumları.",
            "stimulus": "Bir şehir haritasında Cumhuriyet Caddesi ile İstiklal Caddesi hiçbir noktada kesişmemekte ve aralarındaki mesafe hep 20 metredir. Atatürk Bulvarı ise bu iki caddeyi 90 derecelik açıyla kesmektedir.",
            "questionText": "a) Cumhuriyet Caddesi ile İstiklal Caddesi birbirine göre nasıl doğrulardır?\nb) Atatürk Bulvarı ile Cumhuriyet Caddesi birbirine göre nasıl doğrulardır?",
            "solutionExplanation": "a paralel doğrular, b dik kesişen doğrulardır.",
            "modelAnswer": "a) Cumhuriyet ve İstiklal Caddeleri birbirine 'Paralel Doğrular'dır (kesişmezler).\nb) Atatürk Bulvarı ile Cumhuriyet Caddesi birbirine 'Dik Kesişen Doğrular'dır (aralarındaki açı 90°'dir).",
            "rubric_criteria": ["a şıkkında paralel doğrular tespiti", "b şıkkında dik kesişen doğrular tespiti"]
        },
        {
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Düzlemde kesişen doğrular.",
            "stimulus": "Aynı düzlemde bulunan d1 ve d2 doğruları tek bir K noktasında kesişmektedir.",
            "questionText": "İki doğrunun ortak nokta sayısı 1 olduğuna göre bu doğruların durumu nedir? Aralarındaki açı 90 derece değilse nasıl adlandırılır?",
            "solutionExplanation": "Kesişen doğrulardır.",
            "modelAnswer": "Bu doğrular 'Kesişen Doğrular'dır. Aralarındaki açı 90 dereceden farklı ise dik kesişen değil, 'eğik (dar/geniş açılı) kesişen doğrular' olarak adlandırılır.",
            "rubric_criteria": ["Kesişen doğrular kavramının yazılması", "Tek bir ortak nokta özelliğinin vurgulanması"]
        },
        {
            "difficulty": "Zor",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Üç doğrunun birbirine göre durumları.",
            "stimulus": "Düzlemde bulunan üç doğru d1, d2 ve d3 birbirini farklı şekillerde kesebilir.",
            "questionText": "Üç doğrunun düzlemde birbirine göre oluşturabileceği 2 farklı durumu yazınız (Örn: Üçünün de paralel olması vb.).",
            "solutionExplanation": "1. Üçü birbirine paralel olabilir. 2. Tek bir noktada kesişebilirler (noktadaş). 3. İkisi paralel bir üçüncüsü kesen olabilir. 4. Üçgen oluşturacak şekilde ikişer ikişer kesişebilirler.",
            "modelAnswer": "1. Durum: Üç doğru da birbirine paralel olabilir (Hiçbir ortak noktaları yoktur).\n2. Durum: Üç doğru ikişer ikişer kesişerek bir üçgen ve 3 kesişim noktası oluşturabilir (veya tek bir noktada kesişen noktadaş doğrular olabilir).",
            "rubric_criteria": ["Birinci durumun (üç paralel doğru) doğru açıklanması", "İkinci durumun (üçgen oluşturma veya noktadaşlık) açıklanması"]
        }
    ],

    'MAT.5.3.5': [
        {
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Çokgen tanımı ve şartları.",
            "stimulus": "Aşağıdaki şekillerden hangilerinin 'çokgen' olduğu incelenmektedir:\nŞekil 1: Üç doğru parçasının uç uca eklenmesiyle oluşan kapalı üçgen\nŞekil 2: Bir ucu açık bırakılmış dört doğru parçası\nŞekil 3: Bir kenarı yay (eğri) olan kapalı daire dilimi",
            "questionText": "Bu şekillerden hangisi çokgendir? Çokgen olabilmesi için gereken 2 temel kuralı yazarak açıklayınız.",
            "solutionExplanation": "Yalnızca Şekil 1 çokgendir. Çokgen kapalı olmalı ve sadece doğru parçalarından oluşmalıdır.",
            "modelAnswer": "Yalnızca Şekil 1 çokgendir.\nÇokgen Olma Şartları:\n1. Şekil tamamen kapalı olmalıdır (Şekil 2 açık olduğu için elenir).\n2. Şeklin kenarları mutlaka doğru parçalarından oluşmalı, eğri veya yay içermemelidir (Şekil 3 eğri kenarlı olduğu için elenir).",
            "rubric_criteria": ["Yalnızca Şekil 1'in çokgen olduğunun tespiti", "Kapalı olma ve sadece doğru parçalarından oluşma şartlarının yazılması"]
        },
        {
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Çokgenlerin adlandırılması.",
            "stimulus": "Trafik levhalarında:\n• Tehlike uyarı levhası 3 kenarlıdır.\n• Dur levhası 8 kenarlıdır.",
            "questionText": "Çokgenler neye göre adlandırılır? Yukarıdaki iki levhanın çokgen adlarını yazınız.",
            "solutionExplanation": "Kenar sayılarına göre adlandırılır. 3 kenarlı üçgen, 8 kenarlı sekizgendir.",
            "modelAnswer": "Çokgenler 'kenar (veya köşe) sayılarına göre' adlandırılır.\n• 3 kenarlı levha: Üçgen\n• 8 kenarlı dur levhası: Sekizgen",
            "rubric_criteria": ["Kenar/köşe sayısına göre adlandırma kuralının yazılması", "Üçgen ve Sekizgen isimlerinin doğru verilmesi"]
        },
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Beşgen ve altıgen özellikleri.",
            "stimulus": "Bir düzgün beşgen ile bir altıgen tahtaya çizilmiştir.",
            "questionText": "Beşgen ve altıgenin köşe sayılarını ve kenar sayılarını karşılaştırınız.",
            "solutionExplanation": "Beşgenin 5 kenarı 5 köşesi, altıgenin 6 kenarı 6 köşesi vardır.",
            "modelAnswer": "• Beşgen: 5 kenarı ve 5 köşesi vardır.\n• Altıgen: 6 kenarı ve 6 köşesi vardır.\nHer çokgende kenar sayısı köşe sayısına daima eşittir.",
            "rubric_criteria": ["Beşgenin 5 kenar 5 köşe bilgisinin yazılması", "Altıgenin 6 kenar 6 köşe bilgisinin yazılması"]
        }
    ],

    'MAT.5.3.6': [
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Köşegen kavramı ve üçgen.",
            "stimulus": "Dörtgenin komşu olmayan iki köşesini birleştiren doğru parçasına 'köşegen' denir.",
            "questionText": "a) Bir dörtgenin (örneğin karenin) toplam kaç tane köşegeni vardır?\nb) Bir üçgenin neden hiç köşegeni yoktur? Gerekçesini açıklayınız.",
            "solutionExplanation": "Dörtgenin 2 köşegeni vardır. Üçgende bütün köşeler birbirine komşudur, komşu olmayan köşe yoktur.",
            "modelAnswer": "a) Bir dörtgenin toplam 2 adet köşegeni vardır.\nb) Üçgenin köşegeni yoktur. Çünkü köşegen komşu olmayan köşeleri birleştirir; oysa bir üçgende her köşe diğer iki köşenin ikisine de komşudur (komşu olmayan köşe bulunmaz).",
            "rubric_criteria": ["Dörtgenin 2 köşegeni olduğunun yazılması", "Üçgende komşu olmayan köşe bulunmadığı gerekçesinin açıklanması"]
        },
        {
            "difficulty": "Zor",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Üçgenin iç açıları toplamı.",
            "stimulus": "Bir üçgenin iç açı ölçüleri A, B ve C'dir. A açısı = 65° ve B açısı = 45° olarak ölçülmüştür.",
            "questionText": "Üçgenin iç açıları toplamı kuralını yazarak C açısının ölçüsünü işlem basamaklarıyla hesaplayınız.",
            "solutionExplanation": "Üçgenin iç açıları toplamı 180 derecedir. 65 + 45 = 110, 180 - 110 = 70 derecedir.",
            "modelAnswer": "Kural: Bir üçgenin iç açıları toplamı daima 180°'dir.\nİşlem:\n65° + 45° = 110°\nC açısı = 180° - 110° = 70°",
            "rubric_criteria": ["180° kuralının doğru belirtilmesi", "Toplama ve çıkarma işlemiyle 70° sonucunun bulunması"]
        },
        {
            "difficulty": "Zor",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Dörtgenin iç açıları toplamı.",
            "stimulus": "Bir dörtgenin üç iç açısının ölçüleri sırasıyla 80°, 100° ve 110°'dir.",
            "questionText": "Dörtgenin iç açıları toplamı kuralını belirterek verilmeyen dördüncü açının ölçüsünü bulunuz.",
            "solutionExplanation": "Dörtgenin iç açıları toplamı 360 derecedir. 80 + 100 + 110 = 290, 360 - 290 = 70 derece.",
            "modelAnswer": "Kural: Bütün dörtgenlerin iç açıları toplamı 360°'dir.\nİşlem:\n80° + 100° + 110° = 290°\nDördüncü Açı = 360° - 290° = 70°",
            "rubric_criteria": ["360° kuralının yazılması", "İşlem basamaklarıyla 70° sonucunun bulunması"]
        }
    ],

    'MAT.5.3.7': [
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Görsel / Deney / Günlük Hayat Durumu",
            "contextText": "Kareli zeminde iki noktanın konumu.",
            "stimulus": "Kareli kâğıtta okul binası A noktasında, park ise B noktasında bulunmaktadır.",
            "questionText": "B noktasına gitmek isteyen bir öğrenci A noktasından başlayarak '4 birim sağa ve 3 birim yukarı' yürüdüğüne göre, B noktasının A noktasına göre konumunu tek bir cümleyle yazınız.",
            "solutionExplanation": "B noktası, A noktasının 4 birim sağında ve 3 birim yukarısındadır.",
            "modelAnswer": "B noktası, A noktasının 4 birim sağında ve 3 birim yukarısındadır (veya 3 birim yukarısında ve 4 birim sağındadır).",
            "rubric_criteria": ["Birimlerin ve yönlerin (sağ ve yukarı) doğru ifade edilmesi", "A noktasına göre konum ifadesinin eksiksiz kurulması"]
        },
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Görsel / Deney / Günlük Hayat Durumu",
            "contextText": "Ters yön konumu bulma.",
            "stimulus": "K noktasının L noktasına göre konumu '5 birim batı ve 2 birim kuzey' olarak verilmiştir.",
            "questionText": "Buna göre L noktasının K noktasına göre konumu nedir? Yön ve birim değiştirme kuralına göre yazınız.",
            "solutionExplanation": "Tersine döner: 5 birim doğu ve 2 birim güney.",
            "modelAnswer": "L noktası, K noktasının '5 birim doğusunda ve 2 birim güneyindedir'.",
            "rubric_criteria": ["Batının tersi doğu ve kuzeyin tersi güney kuralının uygulanması", "5 birim doğu, 2 birim güney sonucunun yazılması"]
        }
    ]
}

print("Grade 5 Matematik question pool ready!")

# -----------------------------------------------------------------
# FEN BİLİMLERİ GRADE 5 QUESTION POOL
# Outcomes: FB.5.1.2, FB.5.1.3, FB.5.1.4, FB.5.2.1
# -----------------------------------------------------------------
G5_FEN_QUESTIONS = {
    'FB.5.1.2': [
        {
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Ay'ın dönme ve dolanma süreleri.",
            "stimulus": "Dünya'dan gökyüzüne bakan insanlar Ay'ın hep aynı yüzünü görürler; Ay'ın arka yüzü Dünya'dan hiçbir zaman görünmez.",
            "questionText": "Dünya'dan bakıldığında Ay'ın hep aynı yüzünün görülmesinin bilimsel nedenini Ay'ın hareket süreleri açısından açıklayınız.",
            "solutionExplanation": "Ay'ın kendi etrafında dönme süresi ile Dünya etrafında dolanma süresi birbirine eşittir (yaklaşık 27.3 gün).",
            "modelAnswer": "Ay'ın kendi ekseni etrafında dönme süresi ile Dünya etrafındaki dolanma süresi birbirine eşittir (yaklaşık 27,3 gün). Bu eşzamanlı hareket nedeniyle Dünya'dan bakan bir gözlemci Ay'ın daima aynı yüzünü görür.",
            "rubric_criteria": ["Kendi etrafında dönme süresi ile Dünya etrafında dolanma süresinin eşitliğinin yazılması", "Eşitliğin hep aynı yüzün görünmesine yol açtığının gerekçelendirilmesi"]
        },
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Görsel / Deney / Günlük Hayat Durumu",
            "contextText": "Ay'da atmosfer olmamasının sonuçları.",
            "stimulus": "1969 yılında Ay yüzeyine ilk ayak basan astronot Neil Armstrong'un bıraktığı ayak izleri aradan onlarca yıl geçmesine rağmen hiç bozulmadan durmaktadır.",
            "questionText": "Astronotların ayak izlerinin Ay yüzeyinde bozulmadan kalabilmesinin 2 temel bilimsel nedenini (atmosfer, hava olayları) yazınız.",
            "solutionExplanation": "Ay'da yok denecek kadar ince bir atmosfer vardır, rüzgâr ve yağmur gibi hava olayları gerçekleşmez.",
            "modelAnswer": "1. Ay'da belirgin bir atmosfer tabakasının bulunmaması.\n2. Rüzgâr, fırtına, yağmur ve kar gibi aşındırıcı ve silici hava olaylarının Ay'da kesinlikle gerçekleşmemesi.",
            "rubric_criteria": ["Atmosferin yok denecek kadar ince olması şartının yazılması", "Rüzgar ve yağış gibi hava olaylarının görülmemesi gerekçesi"]
        },
        {
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Ay'ın yüzey şekilleri: Kraterler.",
            "stimulus": "Teleskopla Ay'a bakıldığında yüzeyinde irili ufaklı binlerce derin çukur (krater) görülür.",
            "questionText": "Ay yüzeyindeki bu devasa çukurlara (kraterlere) neyin çarpması sebep olmuştur? Dünya'da neden Ay kadar çok krater kalmamıştır?",
            "solutionExplanation": "Gök taşları (meteorlar) çarpmıştır. Dünya'nın kalın atmosferi meteorları sürtünmeyle yakarak yok eder.",
            "modelAnswer": "• Sebep: Uzay boşluğundaki meteorların (gök taşlarının) Ay yüzeyine doğrudan çarpmasıyla kraterler oluşmuştur.\n• Dünya'da Az Olma Nedeni: Dünya'mızı saran kalın atmosfer tabakası, gelen meteorları sürtünmeyle yakarak yeryüzüne ulaşmadan parçalar; ayrıca rüzgar ve su kraterleri zamanla aşındırır.",
            "rubric_criteria": ["Meteor/göktaşı çarpması sebebinin yazılması", "Dünya'nın atmosfer koruması ve aşınma farkının açıklanması"]
        },
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Ay'da gece ve gündüz sıcaklık farkı.",
            "stimulus": "Ay'da gündüz sıcaklığı +120°C'ye kadar çıkarken, gece sıcaklığı -170°C'ye kadar düşmektedir.",
            "questionText": "Ay'da gece ile gündüz arasındaki bu devasa sıcaklık farkının temel sebebini Dünya ile karşılaştırarak açıklayınız.",
            "solutionExplanation": "Atmosferin olmaması ısının tutulmasını ve dengelenmesini engeller.",
            "modelAnswer": "Temel sebep Ay'da ısıyı tutacak ve dağıtacak koruyucu bir atmosferin bulunmamasıdır. Dünya'daki atmosfer battaniye gibi gezegeni sararak aşırı ısınma ve donmayı engellerken, Ay'da hava tabakası olmadığı için Güneş alan yerler kavrulur, gölgede kalan yerler hızla donar.",
            "rubric_criteria": ["Atmosfer eksikliğinin ısı dengesini bozduğunun belirtilmesi", "Dünya atmosferinin koruyucu battaniye etkisinin karşılaştırılması"]
        }
    ],

    'FB.5.1.3': [
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Görsel / Deney / Günlük Hayat Durumu",
            "contextText": "Ay'ın ana evreleri ve sıralaması.",
            "stimulus": "Ay'ın Dünya etrafında dolanması sırasında Güneş'ten aldığı ışığı yansıtmasıyla gökyüzünde farklı şekillerde görünmesine 'Ay'ın Evreleri' denir.",
            "questionText": "Ay'ın 4 ana evresinin adını sırasıyla yazınız ve her bir ana evre arasında yaklaşık kaç günlük süre geçtiğini belirtiniz.",
            "solutionExplanation": "Yeni Ay, İlk Dördün, Dolunay, Son Dördün. İki ana evre arası yaklaşık 1 hafta (7 gün) sürer.",
            "modelAnswer": "• Ay'ın 4 Ana Evresi Sırasıyla: 1. Yeni Ay, 2. İlk Dördün, 3. Dolunay, 4. Son Dördün.\n• Süre: Birbiri ardına gelen iki ana evre arasında yaklaşık 1 hafta (7 gün) süre geçer.",
            "rubric_criteria": ["Dört ana evrenin doğru kronolojik sırayla yazılması", "Ana evreler arasındaki sürenin (1 hafta / 7 gün) doğru belirtilmesi"]
        },
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Görsel / Deney / Günlük Hayat Durumu",
            "contextText": "İlk Dördün ve Son Dördün farkı.",
            "stimulus": "Ay'ın İlk Dördün ve Son Dördün evrelerinde Dünya'dan bakıldığında yarım daire şeklinde ışıklı yüzeyi görülür.",
            "questionText": "İlk Dördün ile Son Dördün evrelerini gökyüzünde görünen aydınlık kısımlarının şekli (D harfi kuralı) bakımından karşılaştırınız.",
            "solutionExplanation": "İlk dördünde sağ yarısı aydınlıktır ve düz 'D' harfine benzer; son dördünde sol yarısı aydınlıktır ve ters 'D' harfine benzer.",
            "modelAnswer": "• İlk Dördün: Ay'ın Dünya'ya bakan yüzünün sağ yarısı aydınlanır; gökyüzünde düz 'D' harfi gibi görünür.\n• Son Dördün: Ay'ın Dünya'ya bakan yüzünün sol yarısı aydınlanır; gökyüzünde ters 'D' harfi gibi görünür.",
            "rubric_criteria": ["İlk Dördünün sağ taraf aydınlık ve düz D harfi olduğunun yazılması", "Son Dördünün sol taraf aydınlık ve ters D harfi olduğunun yazılması"]
        },
        {
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Yeni Ay evresi özellikleri.",
            "stimulus": "Geceleri gökyüzü açık olduğu halde bazen Ay gökyüzünde hiç görünmez.",
            "questionText": "Ay'ın gökyüzünde hiç görünmediği bu evrenin adı nedir? Ay bu sırada Güneş ve Dünya'ya göre hangi konumdadır?",
            "solutionExplanation": "Yeni Ay evresidir. Ay, Güneş ile Dünya arasında yer alır.",
            "modelAnswer": "• Evrenin Adı: Yeni Ay evresi.\n• Konumu: Ay, Dünya ile Güneş'in arasında yer alır; Güneş alan aydınlık yüzü uzaya, karanlıkta kalan yüzü ise Dünya'ya dönüktür.",
            "rubric_criteria": ["Yeni Ay evresi adının doğru verilmesi", "Ay'ın Güneş ile Dünya arasında bulunma konumunun açıklanması"]
        },
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Görsel / Deney / Günlük Hayat Durumu",
            "contextText": "Dolunay evresinden sonra gelen ara evre: Şişkin Ay.",
            "stimulus": "Gökyüzünde Ay'ın tamamının parlak bir daire olarak göründüğü Dolunay evresinden sonra ışıklı alan yavaş yavaş küçülmeye başlar.",
            "questionText": "Dolunay evresi ile Son Dördün evresi arasında gözlemlenen ve yarıdan fazlası aydınlık olan ara evrenin adı nedir? Yazınız.",
            "solutionExplanation": "Şişkin Ay evresidir.",
            "modelAnswer": "Bu ara evrenin adı 'Şişkin Ay'dır (Dolunay ile Son Dördün arasındaki azalan şişkin ay).",
            "rubric_criteria": ["Şişkin Ay ara evresi adının doğru yazılması", "Yarıdan fazlasının aydınlık olması özelliğinin doğrulanması"]
        }
    ],

    'FB.5.1.4': [
        {
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Görsel / Deney / Günlük Hayat Durumu",
            "contextText": "Güneş, Dünya ve Ay'ın büyüklük modeli.",
            "stimulus": "Fen dersinde öğretmen masaya bir basketbol topu, bir nohut tanesi ve bir mercimek tanesi koymuştur.",
            "questionText": "Bu üç nesneyi Güneş, Dünya ve Ay'ın hacimsel büyüklüklerine göre doğru şekilde eşleştiriniz.",
            "solutionExplanation": "Güneş = basketbol topu, Dünya = nohut tanesi, Ay = mercimek tanesi.",
            "modelAnswer": "• Güneş: Basketbol topu (en büyük gök cismi)\n• Dünya: Nohut tanesi (orta büyüklükte)\n• Ay: Mercimek tanesi (en küçük gök cismi)",
            "rubric_criteria": ["Basketbol topu - Güneş eşleştirmesi", "Nohut - Dünya ve Mercimek - Ay eşleştirmeleri"]
        },
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Dönme ve dolanma yönleri.",
            "stimulus": "Güneş, Dünya ve Ay kendi eksenleri etrafında ve birbirleri etrafında dönerken belirli bir yön izlerler.",
            "questionText": "Kuzey Kutbu'ndan bakıldığında Güneş, Dünya ve Ay'ın kendi eksenleri etrafındaki dönme yönü nedir? (Saat yönü mü, saat yönünün tersi mi?)",
            "solutionExplanation": "Hepsi saat yönünün tersine (batıdan doğuya doğru) döner.",
            "modelAnswer": "Kuzey Kutbu'ndan bakıldığında Güneş, Dünya ve Ay'ın kendi ekseni etrafında dönme yönü 'saat yönünün tersine' (yani batıdan doğuya doğru) gerçekleşir.",
            "rubric_criteria": ["Saat yönünün tersine (batıdan doğuya) ifadesinin doğru yazılması", "Her üç gök cismi için ortak yönün vurgulanması"]
        },
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Dünya'nın Güneş etrafında dolanması ve 1 yıl.",
            "stimulus": "Dünya kendi etrafında dönerken aynı zamanda Güneş'in etrafında elips şeklinde bir yörüngede dolanır.",
            "questionText": "Dünya'nın Güneş etrafındaki 1 tam dolanım süresi ne kadardır ve bu hareket hangi temel doğa olayını oluşturur?",
            "solutionExplanation": "365 gün 6 saat (1 yıl). Mevsimlerin oluşumunu sağlar.",
            "modelAnswer": "• Süre: 365 gün 6 saat (1 yıl)\n• Doğa Olayı: Mevsimlerin oluşmasını sağlar (ve yıl kavramını meydana getirir).",
            "rubric_criteria": ["365 gün 6 saat (1 yıl) süresinin doğru belirtilmesi", "Mevsimlerin oluşması sonucunun yazılması"]
        }
    ],

    'FB.5.2.1': [
        {
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Görsel / Deney / Günlük Hayat Durumu",
            "contextText": "Dinamometre ve yay esnekliği.",
            "stimulus": "Kuvvetin büyüklüğünü ölçmek için kullanılan alete 'dinamometre' denir. Dinamometrenin içinde esnek sarmal bir çelik yay bulunur.",
            "questionText": "a) Dinamometrenin çalışma prensibi yayın hangi özelliğine dayanır?\nb) Kuvvetin birimi nedir ve hangi harfle gösterilir?",
            "solutionExplanation": "Yayın esneklik ve uzama özelliğine dayanır. Birimi Newton'dur (N).",
            "modelAnswer": "a) Dinamometre, esnek yayların üzerlerine uygulanan kuvvetle doğru orantılı olarak uzaması prensibine dayanır.\nb) Kuvvetin birimi 'Newton'dur ve büyük 'N' harfi ile gösterilir.",
            "rubric_criteria": ["Yayların esneklik ve kuvvetle uzama prensibinin yazılması", "Newton birimi ve 'N' harfinin doğru yazılması"]
        },
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Görsel / Deney / Günlük Hayat Durumu",
            "contextText": "Dinamometrede orantılı uzama hesabı.",
            "stimulus": "Bir dinamometreye 15 N'luk bir cisim asıldığında dinamometrenin yayı 3 cm uzamaktadır.",
            "questionText": "Bu dinamometreye 45 N'luk bir cisim asılırsa yaydaki uzama miktarı kaç cm olur? İşlem basamaklarını gösteriniz.",
            "solutionExplanation": "15 N 3 cm uzatıyorsa, 1 cm için 5 N gerekir. 45 / 5 = 9 cm uzar (veya 45/15 = 3 kat, 3 x 3 = 9 cm).",
            "modelAnswer": "İşlem:\n15 N kuvvet yayı 3 cm uzatıyorsa:\n1 cm uzama için gereken kuvvet = 15 N / 3 = 5 N'dur.\n45 N'luk cisim asıldığında uzama = 45 N / 5 N = 9 cm olur.\n(veya kuvvet 3 katına çıktığı için uzama da 3 x 3 = 9 cm olur).",
            "rubric_criteria": ["Orantı bağıntısının doğru kurulması", "9 cm uzama sonucunun işlem basamaklarıyla bulunması"]
        },
        {
            "difficulty": "Zor",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Görsel / Deney / Günlük Hayat Durumu",
            "contextText": "Hassas dinamometre ve yay kalınlığı.",
            "stimulus": "K ve L dinamometrelerinden K'de ince sarmal yay, L'de ise kalın sarmal yay kullanılmıştır.",
            "questionText": "Hafif ve küçük kuvvetleri daha hassas ve duyarlı ölçmek isteyen bir araştırmacı K dinamometresini mi yoksa L dinamometresini mi seçmelidir? Gerekçesini açıklayınız.",
            "solutionExplanation": "K dinamometresini seçmelidir. İnce yaylar küçük kuvvetlerde bile kolayca uzayarak hassas ölçüm yapar.",
            "modelAnswer": "Araştırmacı ince yaylı 'K dinamometresini' seçmelidir. Çünkü ince yaylar küçük kuvvetlerde bile hemen esneyip uzayarak hassas ölçüm yapmaya imkân tanır; kalın yaylar ise küçük kuvvetlerde gözle görülür bir uzama göstermez.",
            "rubric_criteria": ["K dinamometresinin doğru seçilmesi", "İnce yayın küçük kuvvetlerde kolayca uzama hassasiyeti gerekçesinin yazılması"]
        }
    ]
}

print("Grade 5 Fen Bilimleri question pool ready!")

# -----------------------------------------------------------------
# SOSYAL BİLGİLER GRADE 5 QUESTION POOL
# Outcomes: SB.5.1.1, SB.5.1.2, SB.5.1.3, EVİMİZ
# -----------------------------------------------------------------
G5_SOSYAL_QUESTIONS = {
    'SB.5.1.1': [
        {
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Sosyal roller ve sorumluluklar.",
            "stimulus": "5. sınıf öğrencisi Can, evde anne ve babasının evladı, okulda 5-B sınıfının öğrencisi, mahalle futbol takımında ise takım kaptanıdır.",
            "questionText": "Can'ın bulunduğu bu farklı gruplardaki rollerini yazarak, roller değiştikçe hak ve sorumlulukların nasıl değiştiğini açıklayınız.",
            "solutionExplanation": "Roller değiştikçe üstlenilen görev ve sorumluluklar da değişir.",
            "modelAnswer": "• Rolleri: Ailede çocuk/evlat, okulda öğrenci, futbol takımında kaptandır.\n• Değişim: İnsan aynı anda birden fazla gruba dahil olabilir. Her grubun gerektirdiği rol farklıdır; evde odasını toplamak sorumluyken, okulda dersi dinlemek, takımda ise arkadaşlarını motive edip yönlendirmek sorumluluğuna sahiptir.",
            "rubric_criteria": ["Üç rolün doğru tespit edilmesi", "Rol değiştikçe sorumlulukların farklılaşmasının açıklanması"]
        },
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Öğrenci Diyaloğu & Kavram Yanılgısı",
            "contextText": "Hak ve sorumluluk dengesi.",
            "stimulus": "Emre: 'Ben öğrenciyim, ders çalışma hakkım var ama ödev yapmak zorunda değilim' demiştir.",
            "questionText": "Emre'nin ifadesindeki kavram yanılgısını düzeltiniz. Hak ile sorumluluk arasındaki ilişkiyi birer örnekle açıklayınız.",
            "solutionExplanation": "Eğitim almak bir haktır; verilen ödevleri zamanında yapmak ise sorumluluktur.",
            "modelAnswer": "Emre hakkı ile sorumluluğunu karıştırmıştır. Eğitim almak her çocuğun en temel 'hakkı'dır; ancak derse zamanında gelmek, kurallara uymak ve ödevlerini eksiksiz yapmak öğrencinin yerine getirmesi gereken 'sorumluluk'tur. Haklarımız bize tanınan yetkiler, sorumluluklar ise yerine getirmemiz gereken vazifelerdir.",
            "rubric_criteria": ["Hak ve sorumluluk ayrımının doğru yapılması", "Öğrenci rolü üzerinden somut örneklerle dengenin kurulması"]
        },
        {
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Grup çalışmasında iş bölümü.",
            "stimulus": "Sosyal bilgiler projesi için 4 kişilik bir grup oluşturan öğrenciler aralarında görev dağılımı yapmıştır: Biri afiş hazırlamış, diğeri bilgi toplamış, üçüncüsü sunumu üstlenmiştir.",
            "questionText": "Grup çalışmalarında iş bölümü yapmanın ve herkesin sorumluluğunu yerine getirmesinin gruba sağladığı 2 faydayı yazınız.",
            "solutionExplanation": "Zaman tasarrufu sağlar, iş kalitesini artırır, çatışmayı önler.",
            "modelAnswer": "1. İşlerin daha hızlı, planlı ve zamanında tamamlanmasını sağlar.\n2. Görev dağılımı sayesinde adaletsizlik ve kargaşa önlenir, takım ruhu ve projenin başarısı artar.",
            "rubric_criteria": ["Zaman tasarrufu ve verimlilik faydasının yazılması", "Takım ruhu ve adil iş bölümü faydasının belirtilmesi"]
        }
    ],

    'SB.5.1.2': [
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Kültürel zenginliğimiz: Halk oyunları ve yemekler.",
            "stimulus": "Türkiye'nin farklı bölgelerinde Karadeniz'de horon, Ege'de zeybek, Güneydoğu'da halay oynanır; Antep'te baklava, Trabzon'da hamsili pilav pişirilir.",
            "questionText": "Ülkemizdeki bu kültürel çeşitliliğin bir ayrışma sebebi değil, zenginlik ve birlik unsuru olduğunu gösteren 2 gerekçe yazınız.",
            "solutionExplanation": "Kültürel çeşitlilik ülkemizin renkli mozaiğini oluşturur, hoşgörüyü ve birlikteliği pekiştirir.",
            "modelAnswer": "1. Farklı yöresel danslar ve lezzetler ortak vatan toprağında asırlarca kardeşçe yaşayan milletimizin eşsiz bir kültürel mozaiğidir.\n2. Millî bayramlarda ve düğünlerde bütün bu oyunların yan yana icra edilmesi ve sevilmesi aramızdaki gönül bağlarını ve toplumsal kaynaşmayı güçlendirir.",
            "rubric_criteria": ["Kültürel mozaik ve kardeşlik bağının vurgulanması", "Bayram ve düğünlerde birleştirici rolünün örneklenmesi"]
        },
        {
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Geleneksel bayramlaşma kültürü.",
            "stimulus": "Ramazan ve Kurban bayramlarında sabah erken kalkılır, en güzel bayramlık elbiseler giyilir, büyüklerin elleri öpülür, küsler barışır ve komşulara ikramlar yapılır.",
            "questionText": "Bayramlaşma geleneğinin akrabalık ve komşuluk bağlarına sağladığı 2 önemli katkıyı yazınız.",
            "solutionExplanation": "Küsleri barıştırır, sevgi ve saygıyı artırır, birlik ve beraberliği pekiştirir.",
            "modelAnswer": "1. İnsanlar arasındaki dargınlık ve kırgınlıkların son bulmasını sağlayarak barış ve hoşgörü ortamını tesis eder.\n2. Akraba ve komşuluk ziyaretleri sayesinde büyükler sevindirilir, nesiller arası sevgi, saygı ve vefa bağı güçlenir.",
            "rubric_criteria": ["Barış ve dargınlıkları bitirme etkisinin yazılması", "Saygı, sevgi ve komşuluk bağlarını güçlendirme boyutunun belirtilmesi"]
        },
        {
            "difficulty": "Zor",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Dilemma (İkilem) & Çözüm Değerlendirme",
            "contextText": "Farklı kültürden insanlara saygı ve hoşgörü.",
            "stimulus": "Okula yeni başlayan yabancı uyruklu bir öğrencinin geleneksel kıyafetleri ve şivesi bazı öğrenciler tarafından garipsenmiştir.",
            "questionText": "Farklılıklara saygı duyan bilinçli bir 5. sınıf öğrencisi bu yeni arkadaşına karşı nasıl davranmalıdır? 2 somut davranış yazınız.",
            "solutionExplanation": "Önyargısız yaklaşmalı, şivesiyle alay etmemeli, oyuna davet edip uyum sağlamasına destek olmalıdır.",
            "modelAnswer": "1. Arkadaşının şivesi veya giyimiyle kesinlikle alay etmemeli, onu olduğu gibi kabul edip teneffüslerde oyunlarına dahil etmelidir.\n2. Ona Türkçe öğrenmesinde ve okul kurallarına alışmasında sabırla yardımcı olarak sıcak bir arkadaşlık eli uzatmalıdır.",
            "rubric_criteria": ["Alay etmeme ve oyuna dahil etme davranışının yazılması", "Uyum sürecine ve dile yardımcı olma davranışının belirtilmesi"]
        }
    ],

    'SB.5.1.3': [
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Geleneksel yardımlaşma: İmece usulü.",
            "stimulus": "Anadolu köylerinde köylüler kış gelmeden önce kışlık odun kesimini, salça ve tarhana yapımını her gün bir ailenin işini hep birlikte bitirerek 'imece' usulüyle yaparlar.",
            "questionText": "İmece geleneğinin toplumsal dayanışma ve işlerin kolaylaşması açısından önemini 2 maddeyle açıklayınız.",
            "solutionExplanation": "Tek başına haftalar sürecek zor işler el birliğiyle bir günde biter, dostluk ve dayanışma pekişir.",
            "modelAnswer": "1. Tek bir ailenin tek başına günlerce bitiremeyeceği ağır ve zahmetli işlerin birlikten kuvvet doğarak kısa sürede ve kolayca bitirilmesini sağlar.\n2. Köy halkı arasında yardımlaşma, karşılıksız destek ve kardeşlik bağlarını canlandırarak kimseyi çaresiz bırakmaz.",
            "rubric_criteria": ["İşlerin kolaylaşması ve hızlanması boyutunun yazılması", "Toplumsal dayanışma ve birlik bilincinin gerekçelendirilmesi"]
        },
        {
            "difficulty": "Zor",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Metin İçi Delillendirme & Örtük Anlam",
            "contextText": "Tarihî yardımlaşma kurumu: Sadaka taşları.",
            "stimulus": "Osmanlı döneminde cami ve meydanlara konulan oyuk 'sadaka taşları'na varlıklı insanlar gece kimse görmeden para bırakır; ihtiyaç sahipleri de sadece ihtiyacı kadar olan parayı oradan alırdı.",
            "questionText": "Sadaka taşları uygulamasının fakir insanları incitmeden yardım etme (insan onurunu koruma) inceliğini açıklayınız.",
            "solutionExplanation": "Veren el alan eli görmez, alan kişi utanmaz ve mahcup olmaz, veren kişi de gururlanmaz.",
            "modelAnswer": "Bu zarif gelenekte veren el ile alan el birbirini asla görmez. Yardım eden kişi kibre ve gösterişe kapılmaz; ihtiyacı olan yoksul kimse de kimseye el açıp mahcup olmadan, onuru kırılmadan sadece zaruri ihtiyacı kadarını alır. Böylece insan haysiyeti en üst düzeyde korunur.",
            "rubric_criteria": ["Veren ve alan elin birbirini görmeme gizliliğinin açıklanması", "İnsan onurunu ve haysiyetini koruma inceliğinin vurgulanması"]
        },
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Kızılay ve AFAD gibi sivil toplum kuruluşları.",
            "stimulus": "Deprem, sel veya yangın gibi afetlerde Türk Kızılayı ve AFAD ekipleri anında çadır, sıcak çorba ve battaniye yardımı ulaştırmaktadır.",
            "questionText": "Vatandaşların bu yardım kuruluşlarına kan bağışı ve maddi yardımda bulunması hangi millî ve insani sorumluluğumuzun gereğidir? Yazınız.",
            "solutionExplanation": "Toplumsal dayanışma, zor durumdaki vatandaşlara el uzatma ve vatana vefa borcudur.",
            "modelAnswer": "Bu durum, zor zamanlarda milletçe birbirimize kenetlenme, yardımlaşma ve yaraları birlikte sarma sorumluluğumuzun bir gereğidir. 'Birlikten kuvvet doğar' anlayışıyla afetzedelerin acılarını paylaşmak her yurttaşın vicdani ve millî görevidir.",
            "rubric_criteria": ["Milletçe kenetlenme ve yaraları sarma bilincinin yazılması", "Vicdani ve millî sorumluluk boyutunun açıklanması"]
        }
    ],

    'EVİMİZ': [
        {
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Doğal varlıklar ile tarihî mekanlar ayrımı.",
            "stimulus": "Verilen yerler: Peri Bacaları, Pamukkale Travertenleri, Topkapı Sarayı, Selimiye Camii.",
            "questionText": "Yukarıda verilen yerleri 'Doğal Varlıklar' ve 'Tarihî Mekanlar' olarak sınıflandırınız:\n• Doğal Varlıklar (2): .................................\n• Tarihî Mekanlar (2): .................................",
            "solutionExplanation": "Peri Bacaları ve Pamukkale doğal varlıktır; saray ve cami insan yapımı tarihî mekândır.",
            "modelAnswer": "• Doğal Varlıklar: Peri Bacaları, Pamukkale Travertenleri (doğanın kendi kendine oluşturduğu güzellikler).\n• Tarihî Mekanlar: Topkapı Sarayı, Selimiye Camii (geçmiş uygarlıklar ve insanlar tarafından inşa edilen yapılar).",
            "rubric_criteria": ["İki doğal varlığın doğru seçilmesi", "İki tarihî mekânın doğru seçilmesi"]
        },
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Tarihî ve doğal mirası koruma sorumluluğu.",
            "stimulus": "Tarihî bir kaleyi gezen bazı ziyaretçilerin sur duvarlarına isimlerini kazıdığı ve etrafa çöp bıraktığı görülmüştür.",
            "questionText": "Tarihî mirasımıza verilen bu zararı önlemek ve bu değerleri gelecek nesillere aktarmak için ziyaretçilerin uyması gereken 2 temel kuralı yazınız.",
            "solutionExplanation": "Duvarlara yazı yazmamak, çöpleri çöp kutusuna atmak, eserlere dokunmamak.",
            "modelAnswer": "1. Tarihî yapılara, surlara veya kalıntılara kesinlikle yazı yazılmamalı, kazınmamalı ve fiziki zarar verilmemelidir.\n2. Tarihî ve doğal alanlara çöp atılmamalı; bu mekanların geçmişten bize kalan ortak bir emanet olduğu bilinciyle hareket edilmelidir.",
            "rubric_criteria": ["Fiziki tahribat yapmama / yazı yazmama kuralının yazılması", "Çevre temizliği ve emanet bilinci kuralının belirtilmesi"]
        }
    ]
}

# -----------------------------------------------------------------
# DİN KÜLTÜRÜ GRADE 5 QUESTION POOL
# Outcomes: Evrendeki, DKAB.5.1.2, DKAB.5.1.3, DKAB.5.1.4, DKAB.5.2.1
# -----------------------------------------------------------------
G5_DIN_QUESTIONS = {
    'Evrendeki': [
        {
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Evrendeki mükemmel düzen ve ölçü.",
            "stimulus": "'O, yedi göğü tabaka tabaka yaratandır. Rahmân'ın yaratışında hiçbir uyumsuzluk göremezsin. Bir kere daha bak! Hiçbir çatlak (veya düzensizlik) görüyor musun?' (Mülk Suresi, 3. ayet)",
            "questionText": "Ayetten hareketle evrendeki düzen ve uyuma günlük hayattan (örneğin mevsimler, gece-gündüz, su döngüsü) 2 somut örnek veriniz.",
            "solutionExplanation": "Gece-gündüzün ardı ardına gelmesi, mevsimlerin şaşmaması, yerçekimi, su döngüsü.",
            "modelAnswer": "1. Örnek: Gece ile gündüzün ve dört mevsimin (ilkbahar, yaz, sonbahar, kış) milyonlarca yıldır şaşmadan birbirini takip etmesi.\n2. Örnek: Yağmurun belirli bir su döngüsü ve ölçüyle yağması, atmosferdeki oksijen ve karbondioksit oranlarının dengede tutulması.",
            "rubric_criteria": ["Evrendeki düzene uygun birinci somut örneğin yazılması", "Evrendeki düzene uygun ikinci somut örneğin yazılması"]
        },
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Kendi kendine olamama: Saat ve evren analojisi.",
            "stimulus": "Çölde yürürken kumların üzerinde pillerle tıkır tıkır çalışan altın bir saat bulan biri, 'Bu saat kum ve rüzgarın tesadüfen birleşmesiyle kendiliğinden oluştu' dese kimse inanmaz.",
            "questionText": "Bu saat örneğinden hareketle, saatten milyarlarca kat daha karmaşık ve kusursuz olan evrenin varlığı hakkında hangi mantıksal sonuca ulaşılır?",
            "solutionExplanation": "Nasıl ki bir saatin ustası varsa, bu muazzam evrenin de sonsuz ilim ve kudret sahibi tek bir yaratıcısı (Allah) vardır.",
            "modelAnswer": "Küçük bir saatin bile kendi kendine tesadüfen oluşması imkansız olup mutlaka akıllı bir saat ustasına ihtiyaç duyuyorsa; Güneş sistemi, gezegenler, canlılar ve galaksilerden oluşan bu kusursuz kainatın da mutlaka sonsuz ilim, irade ve kudret sahibi yüce bir Yaratıcısı (Allah) vardır; tesadüfle açıklanamaz.",
            "rubric_criteria": ["Saat ustası ile evrenin Yaratıcısı arasındaki mantıksal bağın kurulması", "Tesadüfün imkansızlığı ve Allah'ın sonsuz ilim/kudretinin vurgulanması"]
        }
    ],

    'DKAB.5.1.2': [
        {
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Tevhid inancı (Allah'ın birliği).",
            "stimulus": "İslam inancının temeli 'Tevhid' ilkesine dayanır. Kelime-i Tevhid 'Lâ ilâhe illallâh, Muhammedün Resûlullâh' cümlesidir.",
            "questionText": "Tevhid inancını tanımlayarak, evrende birden fazla ilah (yaratıcı) olsaydı ne gibi kargaşalar çıkacağını Kur'an ayeti mantığıyla açıklayınız.",
            "solutionExplanation": "Tevhid Allah'ın tek ve eşsiz olmasıdır. Birden fazla tanrı olsaydı her biri kendi iradesini dayatır ve düzen bozulurdu.",
            "modelAnswer": "• Tevhid: Yüce Allah'ın varlığına, birliğine, eşi, benzeri ve ortağının bulunmadığına inanmaktır.\n• Açıklama: Kur'an'da bildirildiği gibi eğer yerde ve gökte birden fazla ilah olsaydı, her biri kendi yarattığını yönetmek ister, çatışma çıkar ve evrenin mükemmel düzeni altüst olup yok olurdu.",
            "rubric_criteria": ["Tevhid inancının doğru tanımlanması", "Birden fazla ilah olsaydı düzenin bozulacağı gerekçesinin yazılması"]
        },
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Metin İçi Delillendirme & Örtük Anlam",
            "contextText": "İnsanın yaratılışındaki mükemmellik.",
            "stimulus": "İnsan vücudunda kalbin her saniye durmaksızın kan pompalaması, gözün renkleri ayırt edebilmesi ve beynin düşünme kabiliyeti eşsiz bir tasarım örneğidir.",
            "questionText": "İnsanın bu kusursuz biyolojik donanımı, Allah'ın hangi yüce sıfatlarını ve varlığını nasıl kanıtlar? Açıklayınız.",
            "solutionExplanation": "Sonsuz ilim, hikmet ve yaratma (Hâlık) kudretini kanıtlar.",
            "modelAnswer": "İnsan bedenindeki bu hayranlık uyandırıcı uyum, Yüce Allah'ın sonsuz ilim, sanat ve yaratma (Tekvin/Hâlık) kudretinin tecellisidir. En gelişmiş robotların dahi taklit edemediği bu sistem, insanı yoktan var eden Yaratıcının varlığının açık bir delilidir.",
            "rubric_criteria": ["İlim ve yaratma gücü sıfatlarıyla bağ kurulması", "İnsan bedeninin ilahi bir sanat delili olduğunun açıklanması"]
        },
        {
            "difficulty": "Zor",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Öğrenci Diyaloğu & Kavram Yanılgısı",
            "contextText": "Gözle görmediğimize inanmak.",
            "stimulus": "Can: 'Ben aklımı, sevgiyi veya rüzgârı gözümle görmüyorum ama var olduklarını biliyorum.' demiştir.",
            "questionText": "Can'ın bu sözünden hareketle, 'Allah'ı gözümüzle göremiyoruz öyleyse varlığını nasıl bilebiliriz?' sorusuna verilecek mantıksal cevabı yazınız.",
            "solutionExplanation": "Varlıkların hepsini gözle göremeyiz. Akıl, elektrik, yerçekimi gibi şeyleri eserleri ve etkileriyle biliriz; Allah'ı da yarattığı kainatla biliriz.",
            "modelAnswer": "İnsan gözü sınırlı bir algıya sahiptir; aklı, sevgiyi, elektriği ve rüzgârı gözümüzle göremeyiz fakat onların eserlerini ve etkilerini görerek varlıklarından kesin olarak emin oluruz. Tıpkı bunun gibi Yüce Allah'ı da dünyada gözlerimizle göremeyiz ancak yarattığı muazzam kâinata, canlara ve düzene bakarak O'nun varlığını ve birliğini aklımızla kesin olarak anlarız.",
            "rubric_criteria": ["Gözle görülmeyen ancak etkileriyle bilinen varlıklar analojisi", "Kâinattaki eserlerden hareketle Allah'ın varlığının idrak edilmesi"]
        }
    ],

    'DKAB.5.1.3': [
        {
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Allah'ın isimleri: Rahman ve Rahim.",
            "stimulus": "Besmele çekerken söylediğimiz 'Bismillahirrahmanirrahim' ifadesinde Allah'ın Rahman ve Rahim isimleri geçer.",
            "questionText": "Rahman ile Rahim isimleri arasındaki anlam farkını (dünya ve ahiret merhameti bakımından) yazınız.",
            "solutionExplanation": "Rahman dünyada inanan-inanmayan herkese merhamet eden; Rahim ise ahirette sadece müminlere merhamet edendir.",
            "modelAnswer": "• Rahman: Dünyada inanan, inanmayan, iyi veya kötü ayrımı yapmaksızın bütün canlılara rızık veren ve sonsuz merhamet gösterendir.\n• Rahim: Ahirette ise yalnızca Yüce Allah'a iman edip salih amel işleyen mümin kullarına merhamet ve lütuf gösterecek olandır.",
            "rubric_criteria": ["Rahman isminin dünyadaki kuşatıcı merhametinin açıklanması", "Rahim isminin ahirette müminlere yönelik merhametinin yazılması"]
        },
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Allah'ın sıfatları: Semi, Basar, Alim.",
            "stimulus": "İslam inancında Allah'ın zati ve subuti sıfatları vardır: Semi (her şeyi işitmesi), Basar (her şeyi görmesi) ve Alim (her şeyi bilmesi).",
            "questionText": "Allah'ın her şeyi işittiğine (Semi), gördüğüne (Basar) ve bildiğine (Alim) inanan bir öğrencinin davranışlarında hangi ahlaki güzellikler görülür? Açıklayınız.",
            "solutionExplanation": "Yalnızken bile kötülük yapmaz, dürüst olur, yalan söylemez ve kalbini temiz tutar.",
            "modelAnswer": "Bu inanca sahip bir öğrenci, hiç kimsenin görmediği ve duymadığı en gizli ortamlarda bile Allah'ın kendisini gördüğünü, aklından geçenleri bildiğini ve fısıltılarını işittiğini bilir. Bu şuur kişiyi hırsızlıktan, yalandan ve kötülükten alıkoyar; daima dürüst, adil ve güvenilir bir insan olmasını sağlar.",
            "rubric_criteria": ["Gizli ve açıkta Allah'ın her şeyi bildiği/gördüğü şuurunun yazılması", "Dürüstlük ve kötülüklerden sakınma ahlakıyla bağ kurulması"]
        }
    ],

    'DKAB.5.1.4': [
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Metin İçi Delillendirme & Örtük Anlam",
            "contextText": "İhlas Suresi ve anlamı.",
            "stimulus": "İhlas Suresi Meali:\n'1. De ki: O, Allah'tır, bir tektir.\n2. Allah Samed'dir.\n3. O, doğurmamış ve doğmamıştır.\n4. O'nun hiçbir dengi yoktur.'",
            "questionText": "a) Surenin 2. ayetinde geçen 'Samed' kavramı ne anlama gelir?\nb) 3. ayetteki 'O, doğurmamış ve doğmamıştır' ifadesi hangi yanlış inançları reddetmektedir?",
            "solutionExplanation": "Samed: Her şey O'na muhtaç, O hiçbir şeye muhtaç değil. Doğurmamış doğmamıştır: Allah'a çocuk veya anne-baba isnat eden şirk inançlarını reddeder.",
            "modelAnswer": "a) Samed: Herkesin ve her şeyin varlığını sürdürmek için O'na muhtaç olduğu, ancak Kendisinin hiçbir şeye, hiç kimseye muhtaç olmadığı mutlak varlık demektir.\nb) Bu ayet, Allah'a çocuk isnat eden (örneğin melekleri Allah'ın kızları sayan veya Hz. İsa'yı Allah'ın oğlu kabul eden) bütün batıl ve şirk inançlarını kesin bir dille reddeder.",
            "rubric_criteria": ["Samed kavramının doğru ve eksiksiz tanımı", "Doğurmamış ve doğmamıştır ifadesinin şirk ve çocuk isnatlarını reddetme boyutunun açıklanması"]
        }
    ],

    'DKAB.5.2.1': [
        {
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Namazın farzları: Şartları ve rükünleri.",
            "stimulus": "Namaz ibadetinin geçerli olabilmesi için namaza başlamadan önce yerine getirilmesi gereken şartlar (dışındaki farzlar) ve namazın içinde yapılması gereken rükünler (içindeki farzlar) vardır.",
            "questionText": "a) Namazın dışındaki şartlardan 2 tanesini yazınız (Örn: Hadesten taharet vb.).\nb) Namazın içindeki rükünlerden 2 tanesini yazınız (Örn: Rüku, Secde vb.).",
            "solutionExplanation": "Dışındakiler: Hadesten taharet, necasetten taharet, setr-i avret, istikbal-i kıble, vakit, niyet. İçindekiler: İftitah tekbiri, kıyam, kıraat, rüku, secde, ka'de-i ahire.",
            "modelAnswer": "a) Namazın Dışındaki Şartlar (2 tane): 1. Hadesten Taharet (Abdest almak), 2. İstikbal-i Kıble (Kâbe'ye yönelmek).\nb) Namazın İçindeki Rükünler (2 tane): 1. Rükû (Eğilmek), 2. Secde (Alnı yere koymak).",
            "rubric_criteria": ["Dışındaki şartlardan 2 doğrunun yazılması", "İçindeki rükünlerden 2 doğrunun yazılması"]
        }
    ]
}

# -----------------------------------------------------------------
# İNGİLİZCE GRADE 5 QUESTION POOL
# Outcomes: ENG.5.1.R2, ENG.5.1.R3, ENG.5.1.V1, ENG.5.1.G1, ENG.5.1.W3, ENG.5.1.W4
# -----------------------------------------------------------------
G5_ING_QUESTIONS = {
    'ENG.5.1.R2': [
        {
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Reading comprehension: Country and nationality.",
            "stimulus": "Read the speech bubble:\n\n'Hello! My name is Pierre. I am 11 years old. I am from France, so I am French. I speak French and English. My favorite classes at school are Art and Physical Education.'",
            "questionText": "Answer the questions according to Pierre's speech:\na) Where is Pierre from and what is his nationality?\nb) Which languages can Pierre speak?",
            "solutionExplanation": "Extracting country, nationality, and languages spoken.",
            "modelAnswer": "a) Pierre is from France and he is French.\nb) He can speak French and English.",
            "rubric_criteria": ["a şıkkında ülke ve milliyetin doğru yazılması", "b şıkkında konuşulan dillerin doğru yazılması"]
        },
        {
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Reading: International summer camp.",
            "stimulus": "Read about Maria:\n\n'Hi everyone! I am Maria from Spain. I am Spanish. I live in Madrid with my family. I have got a twin sister named Lucia. We love playing basketball and learning new languages.'",
            "questionText": "Fill in the blanks based on the text:\n• Maria's country: .................................\n• Maria's nationality: .................................",
            "solutionExplanation": "Country: Spain, Nationality: Spanish.",
            "modelAnswer": "• Maria's country: Spain\n• Maria's nationality: Spanish",
            "rubric_criteria": ["Country: Spain yazımı", "Nationality: Spanish yazımı"]
        }
    ],

    'ENG.5.1.R3': [
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Reading about school subjects and likes/dislikes.",
            "stimulus": "Read Kerem's timetable notes:\n\n'On Mondays, I have double Math and Science. I really love Science because we do fun experiments in the lab. However, I dislike History because memorizing dates is boring for me. On Fridays, I enjoy Music class because I can play the guitar.'",
            "questionText": "Answer the questions:\na) Which class does Kerem dislike and why?\nb) Which class does he enjoy on Fridays?",
            "solutionExplanation": "Extracting likes, dislikes, and justifications.",
            "modelAnswer": "a) Kerem dislikes History because memorizing dates is boring for him.\nb) He enjoys Music class on Fridays (because he can play the guitar).",
            "rubric_criteria": ["a şıkkında sevilmeyen ders ve gerekçenin doğru yazılması", "b şıkkında cuma günkü sevilen dersin (Music) yazılması"]
        },
        {
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "School subjects icons matching.",
            "stimulus": "Three students describe what they do in class:\n1. 'We draw pictures and mix colors.'\n2. 'We run, jump, and play football in the gym.'\n3. 'We solve numbers and equations with our teacher.'",
            "questionText": "Write the name of the school subject for each description:\n1 is: .................................\n2 is: .................................\n3 is: .................................",
            "solutionExplanation": "1 is Art, 2 is PE, 3 is Math.",
            "modelAnswer": "1 is: Art\n2 is: Physical Education (P.E.)\n3 is: Maths (Mathematics)",
            "rubric_criteria": ["Üç ders adının (Art, P.E., Maths) eksiksiz yazılması"]
        }
    ],

    'ENG.5.1.V1': [
        {
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Places in a town vocabulary.",
            "stimulus": "Definitions of places in a city:\n1. A place where you can borrow and read books.\n2. A place where you can buy medicine and aspirin.\n3. A place where bakers make fresh bread and cakes.",
            "questionText": "Write the English names of these places (choose from: bakery, hospital, pharmacy, library):\n1: .................................\n2: .................................\n3: .................................",
            "solutionExplanation": "1 library, 2 pharmacy, 3 bakery.",
            "modelAnswer": "1: Library\n2: Pharmacy (or Chemist's)\n3: Bakery",
            "rubric_criteria": ["Üç yer adının doğru İngilizceyle yazılması (Library, Pharmacy, Bakery)"]
        },
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Town map vocabulary.",
            "stimulus": "Look at the town map: Post office, cinema, toy shop, supermarket.",
            "questionText": "Write where you go when:\na) You want to watch a new movie with popcorn: .................................\nb) You want to send a letter and postcards: .................................",
            "solutionExplanation": "a cinema, b post office.",
            "modelAnswer": "a) Cinema (or Movie theater)\nb) Post office",
            "rubric_criteria": ["a şıkkında Cinema yazımı", "b şıkkında Post office yazımı"]
        }
    ],

    'ENG.5.1.G1': [
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Görsel / Deney / Günlük Hayat Durumu",
            "contextText": "Prepositions of place: opposite, between, next to.",
            "stimulus": "On Green Street:\n• The bank is between the pharmacy and the bookshop.\n• The hospital is on the other side of the road, facing the school.",
            "questionText": "Complete the sentences using 'between', 'opposite', or 'next to':\na) The bank is ................................. the pharmacy and the bookshop.\nb) The hospital is ................................. the school.",
            "solutionExplanation": "a between, b opposite.",
            "modelAnswer": "a) The bank is between the pharmacy and the bookshop.\nb) The hospital is opposite the school.",
            "rubric_criteria": ["a şıkkında 'between' edatının doğru yazılması", "b şıkkında 'opposite' edatının doğru yazılması"]
        },
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Görsel / Deney / Günlük Hayat Durumu",
            "contextText": "Giving directions: Turn left, turn right, go straight.",
            "stimulus": "A tourist asks: 'Excuse me, how can I get to the museum?'\nDirections: Go straight ahead on Atatürk Street. Turn right into Rose Road. It is on your left, next to the cafe.",
            "questionText": "Translate the following direction phrases into Turkish:\n1. 'Go straight ahead': .................................\n2. 'Turn right': .................................",
            "solutionExplanation": "1 Düz git / dosdoğru ilerle, 2 Sağa dön.",
            "modelAnswer": "1. 'Go straight ahead': Düz git (dosdoğru ilerle).\n2. 'Turn right': Sağa dön.",
            "rubric_criteria": ["1. ifadenin 'düz git' çevirisi", "2. ifadenin 'sağa dön' çevirisi"]
        }
    ],

    'ENG.5.1.W3': [
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Writing simple sentences about favorite subjects.",
            "stimulus": "Information about Ali:\n• Favorite class: Art (loves painting)\n• Disliked class: Math (finds it difficult)",
            "questionText": "Write two full English sentences about Ali's school preferences:\n1) Use 'likes' or 'loves':\n2) Use 'dislikes' or 'doesn't like':",
            "solutionExplanation": "Forming 3rd person singular present tense sentences.",
            "modelAnswer": "1) Ali loves (likes) Art because he loves painting.\n2) Ali dislikes (doesn't like) Math because he finds it difficult.",
            "rubric_criteria": ["1. cümlenin dil bilgisine uygun doğru kurulması", "2. cümlenin olumsuz/hoşlanmama yapısıyla doğru kurulması"]
        }
    ],

    'ENG.5.1.W4': [
        {
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "contextText": "Writing a self-introduction paragraph.",
            "stimulus": "Imagine you are meeting an international penfriend online for the first time.",
            "questionText": "Write a short self-introduction paragraph (3 full sentences) in English. Mention:\n1. Your name and age\n2. Your country and nationality\n3. Your favorite school subject",
            "solutionExplanation": "Full English sentences introducing oneself.",
            "modelAnswer": "Example Student Answer:\n'Hello! My name is Defne and I am eleven years old. I am from Turkey and I am Turkish. My favorite school subject is Science because I love doing experiments.'",
            "rubric_criteria": ["İsim ve yaş cümlesinin doğru kurulması", "Ülke ve milliyet cümlesinin doğru yazılması", "En sevilen ders cümlesinin kurallı yazılması"]
        }
    ]
}

# -----------------------------------------------------------------
# ASSEMBLY GENERATOR FOR GRADE 5 (Matematik, Fen, Sosyal, Din, İngilizce)
# -----------------------------------------------------------------
SUBJECT_POOLS = {
    'matematik': G5_MAT_QUESTIONS,
    'fen_bilimleri': G5_FEN_QUESTIONS,
    'sosyal_bilgiler': G5_SOSYAL_QUESTIONS,
    'din_kulturu': G5_DIN_QUESTIONS,
    'ingilizce': G5_ING_QUESTIONS
}

SUBJ_DISPLAY_NAMES = {
    'matematik': 'Matematik',
    'fen_bilimleri': 'Fen Bilimleri',
    'sosyal_bilgiler': 'Sosyal Bilgiler',
    'din_kulturu': 'Din Kültürü ve Ahlak Bilgisi',
    'ingilizce': 'İngilizce'
}

all_g5_generated = []

with open('meb_data/clean_middle_school_matrix.json', 'r', encoding='utf-8') as f:
    matrix = json.load(f)

for subj_id in ['matematik', 'fen_bilimleri', 'sosyal_bilgiler', 'din_kulturu', 'ingilizce']:
    gdata = matrix[subj_id]['5']
    scenarios = gdata['scenarios']
    pool = SUBJECT_POOLS[subj_id]
    subj_disp = SUBJ_DISPLAY_NAMES[subj_id]
    
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
            
            # Select unique variant from pool
            variants = pool.get(code, [])
            if not variants:
                # Fallback to key containing code
                for k in pool:
                    if code in k or k in code:
                        variants = pool[k]
                        break
            
            # Use deterministic variant index based on scenario index and instance index
            var_idx = (sc_idx * 2 + inst) % len(variants) if variants else 0
            v = variants[var_idx] if variants else {
                'difficulty': 'Orta',
                'cognitiveLevel': 'Basit Bilişsel Süreçler',
                'archetype': 'Kurgusal Senaryo & Vaka İncelemesi',
                'contextText': f"{subj_disp} dersi {code} konusu.",
                'stimulus': f"{code} kazanımı kapsamında verilen durum.",
                'questionText': f"{code} konusundaki temel kavramı ve gerekçesini açıklayınız.",
                'solutionExplanation': f"{code} kuralı uygulanır.",
                'modelAnswer': f"{code} gereğince doğru açıklama yapılmıştır.",
                'rubric_criteria': ['Doğru kavram tespiti', 'Gerekçelendirme']
            }
            
            # Build rubric summing to exact pts
            crit_list = v.get('rubric_criteria', ['Doğru açıklama', 'Gerekçelendirme'])
            if len(crit_list) == 1:
                rubric = [{'criterion': crit_list[0], 'points': pts}]
            else:
                p1 = max(1, round(pts * 0.55))
                p2 = pts - p1
                rubric = [
                    {'criterion': crit_list[0], 'points': p1},
                    {'criterion': crit_list[1], 'points': p2}
                ]
                
            exam_q_items.append({
                'questionNumber': q_num,
                'outcomeCode': code,
                'outcomeTitle': f"{code}. {item['title']}",
                'difficulty': v.get('difficulty', 'Orta'),
                'cognitiveLevel': v.get('cognitiveLevel', 'Karmaşık Bilişsel Süreçler'),
                'archetype': v.get('archetype', 'Kurgusal Senaryo & Vaka İncelemesi'),
                'points': pts,
                'contextText': v.get('contextText', ''),
                'stimulus': v.get('stimulus', ''),
                'questionText': v.get('questionText', ''),
                'solutionExplanation': v.get('solutionExplanation', ''),
                'modelAnswer': v.get('modelAnswer', ''),
                'rubric': rubric
            })
            
        all_g5_generated.append({
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

print(f"Generated {len(all_g5_generated)} exams for Grade 5 other subjects!")

# Verify exact points and rubrics
for e in all_g5_generated:
    tot_p = sum(q['points'] for q in e['questions'])
    assert tot_p == 100, f"Error in {e['id']}: total points {tot_p} != 100"
    for q in e['questions']:
        r_sum = sum(r['points'] for r in q['rubric'])
        assert r_sum == q['points'], f"Rubric error in {e['id']} Q{q['questionNumber']}: {r_sum} != {q['points']}"

with open('meb_data/grade5_other_distinct.json', 'w', encoding='utf-8') as f:
    json.dump(all_g5_generated, f, ensure_ascii=False, indent=2)

print("Saved grade5_other_distinct.json successfully!")
