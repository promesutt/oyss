# -*- coding: utf-8 -*-
import json
from build_grade8_matematik_distinct import G8_DEDICATED

# =====================================================================
# GRADE 8 FEN BİLİMLERİ DEDICATED (5 Scenarios - 39 Questions)
# =====================================================================

# ---------------------------------------------------------------------
# SENARYO 1 (7 Questions)
# ---------------------------------------------------------------------
G8_DEDICATED[('fen_bilimleri', 'F.8.1.1.1', 0, 0)] = {
    "contextText": "Mevsimlerin oluşumu ve eksen eğikliği.",
    "stimulus": "Dünya'nın dönme ekseni, Güneş etrafındaki dolanma düzlemine (ekliptik) 23° 27' (yaklaşık 23,5 derece) eğiktir.",
    "questionText": "Dünya'da aynı anda Kuzey Yarım Küre'de yaz mevsimi yaşanırken Güney Yarım Küre'de kış mevsimi yaşanmasının 2 temel astronomik nedenini yazınız.",
    "solutionExplanation": "1. Eksen eğikliği, 2. Dünya'nın Güneş etrafında dolanması.",
    "modelAnswer": "1. Eksen Eğikliği: Dünya'nın dönme ekseninin 23° 27' eğik olması sebebiyle yıl içinde Güneş ışınları farklı yarım kürelere farklı açılarla düşer.\n2. Güneş Etrafında Dolanma Hareketi: Dünya dolanırken Kuzey Yarım Küre Güneş'e dönük olduğunda ışınları dik ve dike yakın açıyla alıp ısınırken, aynı tarihte Güney Yarım Küre ışınları eğik açıyla alarak daha az ısınır ve kış yaşar.",
    "rubric": [("Eksen eğikliğinin ve açısının belirtilmesi", 0.5), ("Güneş ışınlarının geliş açısı ve dolanma hareketi ilişkisi", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.1.1', 0, 0)] = {
    "contextText": "Kromozom, DNA, gen ve nükleotid ilişkisi.",
    "stimulus": "Kalıtsal yapılar karmaşıktan basite (büyükten küçüğe) doğru sıralanabilir.",
    "questionText": "Kromozom, nükleotid, gen ve DNA kavramlarını karmaşıktan basite (büyükten küçüğe) doğru sıralayınız ve 'gen' kavramının görevini açıklayınız.",
    "solutionExplanation": "Kromozom > DNA > Gen > Nükleotid. Gen: Belirli bir kalıtsal özelliği (göz rengi, kan grubu) şifreleyen DNA parçasıdır.",
    "modelAnswer": "• Karmaşıktan Basite Sıralama (KediGen Kuralı):\nKromozom > DNA > Gen > Nükleotid\n• Genin Görevi: DNA üzerindeki anlamlı görev birimleridir; saç şekli, göz rengi, kan grubu gibi canlıya ait kalıtsal özelliklerin şifrelendiği ve nesillere aktarıldığı DNA bölümleridir.",
    "rubric": [("Büyükten küçüğe doğru sıralama", 0.5), ("Genin görev birimi olduğunun açıklanması", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.1.1', 0, 1)] = {
    "contextText": "Nükleotidin yapısı ve bileşenleri.",
    "stimulus": "Bir nükleotid üç temel yapı biriminin birleşmesiyle oluşur: Fosfat (P), Deoksiriboz şekeri (D) ve Organik baz.",
    "questionText": "a) Bir nükleotidin yapısını oluşturan üç temel molekülü yazınız.\nb) Bir nükleotidin hangi ada sahip olacağını bu moleküllerden hangisi belirler?",
    "solutionExplanation": "a) Fosfat, Deoksiriboz şekeri, Organik baz. b) Taşıdığı organik baz (Adenin, Timin, Guanin, Sitozin).",
    "modelAnswer": "a) Nükleotidin Üç Molekülü: Fosfat grubu + Deoksiriboz (5 karbonlu şeker) + Organik baz.\nb) Nükleotidin İsmi: Taşıdığı organik baza göre adlandırılır (Örneğin Adenin bazı taşıyorsa 'Adenin nükleotidi', Guanin taşıyorsa 'Guanin nükleotidi' adını alır).",
    "rubric": [("Üç bileşenin eksiksiz yazılması", 0.5), ("İsmini organik baza göre aldığının belirtilmesi", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.1.2', 0, 0)] = {
    "contextText": "DNA çift sarmal modeli ve baz eşleşmesi.",
    "stimulus": "DNA çift zincirli ve sarmal bir yapıya sahiptir. Karşılıklı zincirlerdeki nükleotidler hidrojen bağlarıyla birbirine bağlanır.",
    "questionText": "DNA molekülünde organik bazların karşılıklı eşleşme kuralını ve aralarındaki hidrojen bağı sayılarını yazınız.",
    "solutionExplanation": "Adenin (A) ile Timin (T) arasında ikili zayıf hidrojen bağı; Guanin (G) ile Sitozin (C) arasında üçlü zayıf hidrojen bağı kurulur.",
    "modelAnswer": "• Eşleşme Kuralı: Adenin bazı daima Timin bazı ile eşleşir (A = T). Guanin bazı daima Sitozin bazı ile eşleşir (G ≡ C).\n• Hidrojen Bağları: Adenin ile Timin arasında 2'li zayıf hidrojen bağı; Guanin ile Sitozin arasında 3'lü zayıf hidrojen bağı kurulur.",
    "rubric": [("A-T ve G-C eşleşmesinin doğru yazılması", 0.5), ("İkili ve üçlü hidrojen bağı sayılarının belirtilmesi", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.1.2', 0, 1)] = {
    "contextText": "DNA molekülünde sayısal eşitlikler.",
    "stimulus": "Sağlıklı bir DNA molekülünde 600 Guanin nükleotidi ve 400 Adenin nükleotidi bulunmaktadır.",
    "questionText": "Bu DNA molekülündeki:\na) Sitozin ve Timin nükleotidi sayılarını,\nb) Toplam nükleotid sayısını,\nc) Toplam Deoksiriboz şekeri ve Fosfat sayısını hesaplayınız.",
    "solutionExplanation": "G = C = 600; A = T = 400. Toplam nükleotid = 600+600+400+400 = 2000. Şeker = Fosfat = Nükleotid sayısı = 2000.",
    "modelAnswer": "a) Eşleşme Kuralına Göre:\n• Sitozin sayısı = Guanin sayısı = 600 adet\n• Timin sayısı = Adenin sayısı = 400 adet\nb) Toplam Nükleotid Sayısı: 600 (G) + 600 (C) + 400 (A) + 400 (T) = 2000 adet nükleotid.\nc) Şeker ve Fosfat Sayısı: Bir DNA'da Toplam Nükleotid = Toplam Şeker = Toplam Fosfat olduğundan; 2000 adet Deoksiriboz şekeri ve 2000 adet Fosfat molekülü bulunur.",
    "rubric": [("Sitozin ve Timin sayılarının doğru bulunması", 0.4), ("Toplam nükleotidin 2000 olarak bulunması", 0.3), ("Şeker ve fosfat sayılarının 2000 bulunması", 0.3)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.1.3', 0, 0)] = {
    "contextText": "DNA'nın kendini eşleme aşamaları.",
    "stimulus": "Hücre bölünmesi öncesinde DNA miktarını iki katına çıkarmak için kendini eşler (replikasyon).",
    "questionText": "DNA'nın kendini eşlemesi sürecinde gerçekleşen temel basamakları sırasıyla yazınız.",
    "solutionExplanation": "1. Hidrojen bağları kopar, zincirler fermuar gibi açılır. 2. Sitoplazmadaki serbest nükleotidler çekirdeğe girer. 3. Uygun bazlar eşleşir. 4. İki özdeş yeni DNA oluşur.",
    "modelAnswer": "1. Basamak: DNA'nın iki zinciri arasındaki zayıf hidrojen bağları enzimler yardımıyla kopar ve DNA bir fermuar gibi açılır.\n2. Basamak: Sitoplazmada serbest halde bulunan nükleotidler çekirdeğin içine girer.\n3. Basamak: Açılan zincirlerdeki nükleotidlerin karşısına uygun serbest nükleotidler yerleşir (A karşısına T, G karşısına C).\n4. Basamak: Eşleşme tamamlandığında başlangıçtaki DNA ile nükleotid dizilimi tamamen aynı olan iki yeni DNA molekülü oluşur.",
    "rubric": [("Fermuar gibi açılma ve nükleotid girişinin belirtilmesi", 0.5), ("Eşleşme ve iki özdeş DNA oluşumunun sırasıyla yazılması", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.1.3', 0, 1)] = {
    "contextText": "DNA onarımı ve mutasyon.",
    "stimulus": "DNA eşlenmesi sırasında meydana gelen bazı hatalar enzimler tarafından onarılabilirken bazı hatalar onarılamaz.",
    "questionText": "a) Karşılıklı iki zincirde de nükleotidin bulunmadığı boş bir hata onarılabilir mi?\nb) Tek bir zincirde yanlış nükleotid eşleştiği bir hata onarılabilir mi? Açıklayınız.",
    "solutionExplanation": "a) Karşılıklı iki zincir boşsa onarılamaz. b) Tek zincirdeki yanlış eşleşme karşıdaki orijinal baza bakılarak onarılabilir.",
    "modelAnswer": "a) Onarılamaz: Eğer karşılıklı iki zincirde de aynı hizada nükleotid yoksa (çift taraflı boşluk), enzimler hangi nükleotidin geleceğini belirleyemez ve bu hasar onarılamaz, mutasyona yol açar.\nb) Onarılabilir: Tek zincirdeki yanlış eşleşmede karşı zincirdeki orijinal baz sağlam olduğu için enzimler sağlam zinciri referans alarak yanlış nükleotidi kesip yerine doğrusunu yerleştirir.",
    "rubric": [("Çift taraflı boşluğun onarılamama gerekçesi", 0.5), ("Tek taraflı hatanın referans bazla onarılma gerekçesi", 0.5)]
}

# ---------------------------------------------------------------------
# SENARYO 2 (8 Questions)
# ---------------------------------------------------------------------
G8_DEDICATED[('fen_bilimleri', 'F.8.1.1.1', 1, 0)] = {
    "contextText": "21 Haziran ve 21 Aralık gün dönümleri.",
    "stimulus": "21 Haziran tarihinde Güneş ışınları öğle vakti Yengeç Dönencesi'ne dik açıyla (90°) düşer.",
    "questionText": "21 Haziran tarihinde Kuzey Yarım Küre ve Güney Yarım Küre'de yaşanan mevsimleri ve gece-gündüz süreleri arasındaki ilişkiyi yazınız.",
    "solutionExplanation": "Kuzey: Yaz başlar, en uzun gündüz/en kısa gece. Güney: Kış başlar, en uzun gece/en kısa gündüz.",
    "modelAnswer": "• Kuzey Yarım Küre:\n- Yaz mevsimi başlar.\n- Yılın en uzun gündüzü ve en kısa gecesi yaşanır. Bu tarihten sonra gündüzler kısalmaya başlar.\n• Güney Yarım Küre:\n- Kış mevsimi başlar.\n- Yılın en uzun gecesi ve en kısa gündüzü yaşanır.",
    "rubric": [("Kuzey Yarım Küre mevsim ve gündüz süresi", 0.5), ("Güney Yarım Küre mevsim ve gece süresi", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.1.1.1', 1, 1)] = {
    "contextText": "Işığın geliş açısı ve birim alana düşen enerji.",
    "stimulus": "Bir el feneri düz bir masaya önce dik (90°), ardından eğik (30°) açıyla tutularak aydınlanan alanlar ve termometre sıcaklıkları inceleniyor.",
    "questionText": "Güneş ışınlarının dik açıyla düştüğü bölge ile eğik açıyla düştüğü bölgedeki aydınlanan alan genişliğini ve birim alana aktarılan ısı enerjisi miktarını karşılaştırınız.",
    "solutionExplanation": "Dik açı: Aydınlanan alan dar, birim alana düşen enerji fazla (sıcaklık yüksek). Eğik açı: Aydınlanan alan geniş, birim alana düşen enerji az (sıcaklık düşük).",
    "modelAnswer": "• Dik Açıyla Düştüğünde: Işınlar dar bir alana toplanır. Birim yüzeye düşen ışık ve ısı enerjisi miktarı çok fazla olur; bu nedenle ortam daha fazla ısınır (Yaz mevsimi).\n• Eğik Açıyla Düştüğünde: Işınlar daha geniş bir alana yayılır. Birim yüzeye düşen ısı enerjisi miktarı azalır; bu nedenle ortam daha az ısınır (Kış mevsimi).",
    "rubric": [("Dik açıda dar alan ve yüksek enerji açıklanması", 0.5), ("Eğik açıda geniş alan ve düşük enerji açıklanması", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.1.1', 1, 0)] = {
    "contextText": "Farklı canlı türlerinde kromozom sayısı.",
    "stimulus": "İnsanda 46 kromozom, moli balığında 46 kromozom, eğrelti otunda 500 kromozom bulunur.",
    "questionText": "Bu verilerden hareketle canlıların kromozom sayıları ile gelişmişlik düzeyleri ve vücut büyüklükleri arasında bir ilişki olup olmadığını açıklayınız.",
    "solutionExplanation": "Kromozom sayısının canlının gelişmişliği veya büyüklüğü ile hiçbir ilişkisi yoktur.",
    "modelAnswer": "Canlıların kromozom sayısı ile gelişmişlik düzeyleri ya da vücut büyüklükleri arasında hiçbir doğru orantı veya ilişki yoktur. Örneğin 500 kromozoma sahip eğrelti otu ilkel bir bitkiyken, 46 kromozomlu insan çok daha gelişmiş bir canlıdır. Ayrıca farklı tür canlıların (insan ve moli balığı) kromozom sayıları tesadüfen aynı olabilir.",
    "rubric": [("Gelişmişlik düzeyi ile ilişki olmadığının belirtilmesi", 0.5), ("Örneklerle gerekçelendirilmesi", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.1.2', 1, 0)] = {
    "contextText": "DNA modeli yapımı.",
    "stimulus": "Bir öğrenci evdeki malzemelerle DNA modeli tasarlayacaktır: 50 adet mavi ataş (Fosfat), 50 adet sarı düğme (Şeker), 15 kırmızı boncuk (Adenin), 15 yeşil boncuk (Timin), 10 beyaz boncuk (Guanin) ve 10 turuncu boncuk (Sitozin).",
    "questionText": "Öğrencinin bu malzemelerin tamamını kullanarak eksiksiz bir DNA modeli oluşturup oluşturamayacağını işlem basamaklarıyla açıklayınız.",
    "solutionExplanation": "A=15, T=15 -> 15 çift (30 nükleotid). G=10, C=10 -> 10 çift (20 nükleotid). Toplam baz = 50. Şeker = 50, Fosfat = 50. Tamamı kullanılır.",
    "modelAnswer": "• Baz Eşleşmeleri:\n- 15 Adenin ile 15 Timin eşleşir: 15 + 15 = 30 nükleotid.\n- 10 Guanin ile 10 Sitozin eşleşir: 10 + 10 = 20 nükleotid.\n- Toplam Organik Baz = 30 + 20 = 50 adet.\n• Şeker ve Fosfat Kontrolü:\n- 50 nükleotid için 50 adet şeker ve 50 adet fosfat gereklidir.\n- Elimizde 50 sarı düğme (şeker) ve 50 mavi ataş (fosfat) tam bulunmaktadır.\nSonuç: Malzemelerin hiçbiri artmadan eksiksiz ve hatasız bir DNA modeli oluşturulabilir.",
    "rubric": [("Baz eşleşme sayılarının doğru kontrolü", 0.5), ("Şeker ve fosfat dengesinin tam uyumunun ispatı", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.1.2', 1, 1)] = {
    "contextText": "DNA'da nükleotid dizilimi ve canlı çeşitliliği.",
    "stimulus": "Tüm canlıların DNA'sında sadece 4 çeşit organik baz (A, T, G, C) bulunmasına rağmen canlılar birbirlerinden tamamen farklı özelliklere sahiptir.",
    "questionText": "Canlılar arasındaki bu genetik çeşitliliğin (biyoçeşitliliğin) temel nedenini DNA yapısıyla ilişkilendirerek açıklayınız.",
    "solutionExplanation": "Nükleotidlerin DNA üzerindeki dizilim sırası, sayısı ve tekrarlanma oranının farklı olmasıdır.",
    "modelAnswer": "Bütün canlılarda aynı 4 çeşit nükleotid bulunmasına rağmen türlerin ve bireylerin birbirinden farklı olmasının nedeni; nükleotidlerin DNA üzerindeki 'sayısının', 'sıralanış diziliminin' ve gen bölgelerindeki 'kombinasyonlarının' canlıdan canlıya benzersiz olmasıdır. Tıpkı alfabedeki 29 harfle milyonlarca farklı kitap yazılabilmesi gibidir.",
    "rubric": [("Sıra, sayı ve dizilim farklılığının vurgulanması", 0.6), ("Kalıtsal çeşitlilik bağlantısının kurulması", 0.4)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.1.3', 1, 0)] = {
    "contextText": "DNA eşlenmesinde sitoplazma ve çekirdek madde değişimi.",
    "stimulus": "Bölünmekte olan bir hücrede DNA eşlenmesi esnasında çekirdekteki ve sitoplazmadaki madde miktarları değişir.",
    "questionText": "DNA eşlenmesi sırasında:\na) Çekirdekteki DNA miktarının,\nb) Sitoplazmadaki serbest Deoksiriboz şekeri ve serbest Adenin bazı miktarının nasıl değiştiğini (artar/azalır) yazınız.",
    "solutionExplanation": "a) Çekirdekteki DNA miktarı artar (2 katına çıkar). b) Sitoplazmadaki serbest şeker ve baz miktarı azalır (çekirdeğe geçer).",
    "modelAnswer": "a) Çekirdekteki DNA Miktarı: Artar (Eşlenme tamamlandığında başlangıçtakinin 2 katına çıkar).\nb) Sitoplazmadaki Serbest Şeker ve Adenin Miktarı: Azalır (Çünkü sitoplazmadaki serbest nükleotid yapı birimleri çekirdek zarı gözeneklerinden çekirdeğe girerek yeni DNA zincirlerinin yapısına katılır).",
    "rubric": [("Çekirdekteki DNA artışının belirtilmesi", 0.5), ("Sitoplazmadaki serbest moleküllerin azalma gerekçesi", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.2.2', 1, 0)] = {
    "contextText": "Mendel genetiği: Tohum rengi çaprazlaması.",
    "stimulus": "Bezelyelerde sarı tohum geni (S), yeşil tohum genine (s) baskındır. Homozigot (saf) sarı tohumlu bir bezelye ile yeşil tohumlu bir bezelye çaprazlanıyor.",
    "questionText": "Bu çaprazlama sonucunda oluşacak 1. kuşağın (F1):\na) Genotip oranlarını,\nb) Fenotip oranlarını Punnett karesi veya çaprazlama basamaklarıyla bulunuz.",
    "solutionExplanation": "Genotipler: SS x ss -> F1: %100 Ss (Heterozigot sarı). Fenotip: %100 Sarı tohumlu.",
    "modelAnswer": "• Ebeveynlerin Genotipleri: SS (Saf Sarı) × ss (Yeşil tohum)\n• Çaprazlama Basamakları: S ile s -> Ss, S ile s -> Ss, S ile s -> Ss, S ile s -> Ss\na) Genotip Oranı: %100 Melez (Heterozigot) baskın döl (Ss)\nb) Fenotip Oranı: %100 Sarı tohumlu bezelye elde edilir.",
    "rubric": [("Çaprazlama adımlarının gösterilmesi", 0.4), ("Genotipin %100 Ss bulunması", 0.3), ("Fenotipin %100 sarı bulunması", 0.3)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.2.2', 1, 1)] = {
    "contextText": "Melez iki bezelyenin çaprazlanması (F2 kuşağı).",
    "stimulus": "Heterozigot (melez) mor çiçekli iki bezelye (Mm × Mm) çaprazlanıyor. (Mor çiçek geni 'M', beyaz çiçek geni 'm'ye baskındır).",
    "questionText": "Oluşacak bezelyelerin beyaz çiçekli olma olasılığı yüzde kaçtır? Çaprazlama tablosunu göstererek açıklayınız.",
    "solutionExplanation": "Mm x Mm -> MM (%25), Mm (%50), mm (%25). Beyaz çiçekli olma olasılığı %25'tir.",
    "modelAnswer": "• Çaprazlama: Mm × Mm\n• Genotip Dağılımı:\n- M × M -> MM (%25 Saf mor)\n- M × m -> Mm (%25 Melez mor)\n- m × M -> Mm (%25 Melez mor)\n- m × m -> mm (%25 Saf beyaz)\n• Toplam Fenotip: %75 Mor çiçekli, %25 Beyaz çiçekli.\nSonuç: Beyaz çiçekli bezelye oluşma olasılığı %25 (veya 1/4)'tür.",
    "rubric": [("Dört genotip ihtimalinin doğru yazılması", 0.5), ("Beyaz çiçek ihtimalinin %25 olarak bulunması", 0.5)]
}

# ---------------------------------------------------------------------
# SENARYO 3 (9 Questions)
# ---------------------------------------------------------------------
G8_DEDICATED[('fen_bilimleri', 'F.8.1.1.1', 2, 0)] = {
    "contextText": "21 Mart ve 23 Eylül Ekinoks tarihleri.",
    "stimulus": "Ekinoks tarihlerinde Güneş ışınları öğle vakti Ekvator çizgisine dik açıyla (90°) düşer.",
    "questionText": "21 Mart Ekinoksu'nda Dünya genelinde yaşanan gece ve gündüz süreleri ile aydınlanma çemberinin konumunu açıklayınız.",
    "solutionExplanation": "Aydınlanma çemberi kutup noktalarından teğet geçer. Tüm dünyada gece ve gündüz süreleri eşit (12 saat gece, 12 saat gündüz) olur.",
    "modelAnswer": "• Gece-Gündüz Eşitliği: 21 Mart tarihinde Dünya'nın her yerinde gece ve gündüz süreleri birbirine eşit olur (12 saat gündüz, 12 saat gece yaşanır).\n• Aydınlanma Çemberi: Eksen eğikliğinin etkisi ortadan kalkmış gibi görünür ve aydınlanma çemberi kutup noktalarından teğet geçer; her iki kutup da aynı anda Güneş ışığını teğet olarak görür.",
    "rubric": [("Tüm dünyada 12 saat gece 12 saat gündüz eşitliği", 0.5), ("Aydınlanma çemberinin kutup noktalarından geçişi", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.1.1.1', 2, 1)] = {
    "contextText": "Gölge boyu ve Güneş ışınlarının geliş açısı.",
    "stimulus": "Ankara'da açık bir alana dikilen 1 metrelik bir çubuğun öğle saat 12:00'deki gölge boyu 21 Haziran ve 21 Aralık tarihlerinde ölçülüyor.",
    "questionText": "Hangi tarihte gölge boyunun en kısa, hangi tarihte en uzun olduğunu Güneş ışınlarının geliş açısıyla ilişkilendirerek açıklayınız.",
    "solutionExplanation": "21 Haziran: Işınlar dik açıyla gelir, gölge en kısa. 21 Aralık: Işınlar en eğik açıyla gelir, gölge en uzun.",
    "modelAnswer": "• 21 Haziran (En Kısa Gölge): Ankara Kuzey Yarım Küre'dedir. 21 Haziran'da Güneş ışınları yıl içindeki en büyük (en dik) açıyla gelir. Işınlar ne kadar dik gelirse gölge boyu o kadar kısa olur; bu tarihte gölge boyu en kısadır.\n• 21 Aralık (En Uzun Gölge): Güneş ışınları yıl içindeki en küçük (en eğik) açıyla düşer. Işınlar eğikleştikçe gölge uzar; bu tarihte öğle vakti gölge boyu en uzundur.",
    "rubric": [("21 Haziran'da en kısa gölge ve büyük açı gerekçesi", 0.5), ("21 Aralık'ta en uzun gölge ve eğik açı gerekçesi", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.1.1', 2, 0)] = {
    "contextText": "Genetik yapıların hiyerarşisi.",
    "stimulus": "Hücre çekirdeğindeki yapılar: Gen, Nükleotid, Kromatin İplik (Kromozom), DNA.",
    "questionText": "Bu yapıların basitten karmaşığa (küçükten büyüğe) doğru sıralamasını yazınız ve 'Kromozom' yapısının neyden oluştuğunu açıklayınız.",
    "solutionExplanation": "Nükleotid < Gen < DNA < Kromozom. Kromozom = DNA + Özel koruyucu protein kılıf.",
    "modelAnswer": "• Basitten Karmaşığa Sıralama: Nükleotid < Gen < DNA < Kromozom\n• Kromozomun Yapısı: Hücre bölünmesi sırasında DNA zincirlerinin kısalıp kalınlaşarak özel koruyucu histon proteinleriyle sarılması sonucu oluşan en karmaşık kalıtsal yapıdır (DNA + Protein).",
    "rubric": [("Basitten karmaşığa doğru sıralama", 0.5), ("Kromozomun DNA + protein yapısı olduğunu açıklama", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.1.2', 2, 0)] = {
    "contextText": "DNA sarmalında baz oranları.",
    "stimulus": "Bir DNA zincirinde Adenin / Timin oranı daima 1'dir: (A / T = 1).",
    "questionText": "Bir DNA molekülünde (A + G) / (T + C) oranının neden daima 1'e eşit olduğunu matematiksel eşitliklerle ispatlayınız.",
    "solutionExplanation": "A = T ve G = C olduğundan A + G = T + C olur, dolayısıyla oran 1'dir.",
    "modelAnswer": "DNA çift sarmalında karşılıklı baz eşleşmesi kuralına göre:\n• Adenin sayısı Timin sayısına eşittir: A = T\n• Guanin sayısı Sitozin sayısına eşittir: G = C\nBuradan pay kısmındaki (A + G) toplamı, payda kısmındaki (T + C) toplamına tam olarak eşit olur.\nSonuç: (A + G) / (T + C) = (A + G) / (A + G) = 1'dir.",
    "rubric": [("A=T ve G=C eşitliklerinin yazılması", 0.5), ("Oranın 1 olduğunun matematiksel ispatı", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.1.2', 2, 1)] = {
    "contextText": "Eksik DNA zincirini tamamlama.",
    "stimulus": "Bir DNA parçasının 1. zincirindeki nükleotid dizilimi şöyledir: 1. Zincir: A - T - G - C - C - A - T",
    "questionText": "Bu DNA parçasının:\na) Karşı zincirindeki (2. Zincir) nükleotid dizilimini yazınız.\nb) Bu DNA parçasında toplam kaç adet hidrojen bağı bulunduğunu hesaplayınız.",
    "solutionExplanation": "a) T - A - C - G - G - T - A. b) A-T çiftleri (3 adet): 3*2=6; G-C çiftleri (4 adet): 4*3=12. Toplam = 18 hidrojen bağı.",
    "modelAnswer": "a) Karşı Zincir (2. Zincir):\n1. Zincir: A - T - G - C - C - A - T\n2. Zincir: T - A - C - G - G - T - A\nb) Toplam Hidrojen Bağı:\n• A - T çiftleri (2'li bağ): 3 adet A-T çifti var -> 3 × 2 = 6 hidrojen bağı.\n• G - C çiftleri (3'lü bağ): 4 adet G-C çifti var -> 4 × 3 = 12 hidrojen bağı.\n• Toplam = 6 + 12 = 18 adet zayıf hidrojen bağı bulunur.",
    "rubric": [("Karşı zincir diziliminin hatasız yazılması", 0.5), ("Hidrojen bağı sayısının 18 olarak hesaplanması", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.2.1', 2, 0)] = {
    "contextText": "Genetik kavramlar: Genotip ve Fenotip.",
    "stimulus": "Kalıtımda bir canlının sahip olduğu genlerin tamamına genotip, genotip ve çevrenin etkisiyle dışarıya yansıyan özelliklerine fenotip denir.",
    "questionText": "'Homozigot baskın', 'Heterozigot baskın' ve 'Homozigot çekinik' genotip terimlerini 'A' ve 'a' harflerini kullanarak yazınız.",
    "solutionExplanation": "Homozigot baskın: AA. Heterozigot baskın: Aa. Homozigot çekinik: aa.",
    "modelAnswer": "• Homozigot Baskın (Saf Baskın): AA\n• Heterozigot Baskın (Melez Baskın): Aa\n• Homozigot Çekinik (Saf Çekinik): aa",
    "rubric": [("Üç terimin harflerle eksiksiz gösterilmesi", 1.0)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.2.2', 2, 0)] = {
    "contextText": "Bezelyelerde boy uzunluğu çaprazlaması.",
    "stimulus": "Bezelyelerde uzun boy geni (U), kısa boy genine (u) baskındır. Melez uzun boylu (Uu) bir bezelye ile kısa boylu (uu) bir bezelye çaprazlanıyor.",
    "questionText": "Oluşacak yeni kuşakta kısa boylu bezelye elde edilme olasılığı yüzde kaçtır? Çaprazlama yaparak gösteriniz.",
    "solutionExplanation": "Uu x uu -> Uu (%50), uu (%50). Kısa boylu olma olasılığı %50'dir.",
    "modelAnswer": "• Çaprazlama: Uu × uu\n• Genotip Dağılımı:\n- U × u -> Uu (Melez Uzun)\n- U × u -> Uu (Melez Uzun)\n- u × u -> uu (Saf Kısa)\n- u × u -> uu (Saf Kısa)\n• Genotip Oranı: %50 Uu, %50 uu\n• Fenotip Oranı: %50 Uzun boylu, %50 Kısa boylu.\nSonuç: Kısa boylu bezelye olma ihtimali %50 (1/2)'dir.",
    "rubric": [("Çaprazlama adımlarının gösterilmesi", 0.5), ("%50 olasılığının doğru bulunması", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.2.2', 2, 1)] = {
    "contextText": "İnsanda cinsiyet kalıtımı.",
    "stimulus": "İnsanlarda cinsiyet X ve Y kromozomları ile belirlenir. Dişiler 44 + XX, erkekler 44 + XY genotipine sahiptir.",
    "questionText": "Bir ailenin doğacak çocuklarının kız veya erkek olma olasılığını çaprazlama yaparak gösteriniz ve cinsiyeti anneden gelen eşey kromozomunun mu yoksa babadan gelenin mi belirlediğini açıklayınız.",
    "solutionExplanation": "XX x XY -> XX (%50 kız), XY (%50 erkek). Cinsiyeti babadan gelen spermdeki X veya Y belirler.",
    "modelAnswer": "• Çaprazlama: Anne (XX) × Baba (XY)\n- X (anne) + X (baba) -> XX (Kız çocuğu: %50)\n- X (anne) + Y (baba) -> XY (Erkek çocuğu: %50)\n• Olasılık: Her doğumda doğacak çocuğun kız ya da erkek olma olasılığı %50'dir.\n• Cinsiyeti Belirleyen Ebeveyn: Babadır. Çünkü anne daima 'X' kromozomu aktarır. Babadan 'X' gelirse çocuk kız (XX), 'Y' gelirse erkek (XY) olur.",
    "rubric": [("Çaprazlama ve %50 olasılığının gösterilmesi", 0.5), ("Babadan gelen Y kromozomunun belirleyici olduğunun açıklanması", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.2.2', 2, 2)] = {
    "contextText": "Düz tohum ve buruşuk tohum çaprazlaması.",
    "stimulus": "Düzgün tohumlu iki bezelyenin çaprazlanması sonucu buruşuk tohumlu bezelyeler de meydana gelmiştir. (Düzgün tohum geni 'D', buruşuk tohum geni 'd'ye baskındır).",
    "questionText": "Çaprazlanan ebeveyn bezelyelerin genotiplerini bulunuz ve gerekçenizi yazınız.",
    "solutionExplanation": "Buruşuk bezelye 'dd'dir. Bir 'd' anneden biri babadan gelir. İkisi de düzgün olduğuna göre ikisi de 'Dd' (heterozigot) olmalıdır.",
    "modelAnswer": "• Ebeveynlerin Genotipi: Her ikisi de melez döl (Dd) genotipine sahiptir.\n• Gerekçe: Buruşuk tohum çekinik bir özelliktir ve fenotipte ortaya çıkabilmesi için 'dd' genotipinde olması gerekir. Yavru bu 'd' alellerinden birini anneden, diğerini babadan almalıdır. Ebeveyn bezelyeler düzgün tohumlu olduklarına göre içlerinde çekinik aleli gizleyen melez (Dd) bireyler olmak zorundadır.",
    "rubric": [("Ebeveyn genotiplerinin Dd olarak tespiti", 0.5), ("Çekinik genin aktarımı mantığıyla gerekçelendirilmesi", 0.5)]
}

# ---------------------------------------------------------------------
# SENARYO 4 (7 Questions)
# ---------------------------------------------------------------------
G8_DEDICATED[('fen_bilimleri', 'F.8.1.1.1', 3, 0)] = {
    "contextText": "Güneş'e olan uzaklık ve mevsimler yanılgısı.",
    "stimulus": "Dünya'nın Güneş'e en yakın olduğu tarih 3 Ocak (147 milyon km), en uzak olduğu tarih ise 4 Temmuz'dur (152 milyon km).",
    "questionText": "Dünya Güneş'e en yakın olduğu tarihte (3 Ocak) Kuzey Yarım Küre'de neden yaz mevsimi değil de kış mevsimi yaşandığını açıklayınız.",
    "solutionExplanation": "Mevsimlerin oluşumunda Güneş'e olan uzaklığın etkisi yoktur; belirleyici olan eksen eğikliği ve ışınların geliş açısıdır.",
    "modelAnswer": "Mevsimlerin oluşumunda Dünya'nın Güneş'e olan mesafesinin hiçbir belirleyici etkisi yoktur. Belirleyici olan tek faktör eksen eğikliği ve ışınların yeryüzüne düşme açısıdır. 3 Ocak tarihinde Dünya Güneş'e en yakın konumda olsa bile eksen eğikliği nedeniyle Kuzey Yarım Küre Güneş ışınlarını eğik açıyla alır; birim alana düşen ısı enerjisi azaldığı için kış mevsimi yaşanır.",
    "rubric": [("Mesafe ile mevsim arasında ilişki olmadığının belirtilmesi", 0.5), ("Eksen eğikliği ve eğik geliş açısı gerekçesi", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.1.1.1', 3, 1)] = {
    "contextText": "Gece-gündüz süre farkının kutuplara doğru değişimi.",
    "stimulus": "21 Haziran tarihinde Ekvator'dan Kuzey Kutbu'na doğru gidildikçe gündüz süresi uzar.",
    "questionText": "21 Haziran'da Türkiye'de Sinop'ta mı yoksa Hatay'da mı gündüz süresi daha uzundur? Nedenini açıklayınız.",
    "solutionExplanation": "Sinop'ta daha uzundur. Çünkü 21 Haziran'da kuzeye gidildikçe gündüz süresi artar.",
    "modelAnswer": "• Sinop'ta gündüz süresi daha uzundur.\n• Neden: 21 Haziran yaz gün dönümünde Kuzey Yarım Küre'de Ekvator'dan kuzeye (Kuzey Kutup Noktası'na) doğru gidildikçe gündüz süreleri uzar. Sinop, Hatay'a göre daha kuzeyde yer aldığı için 21 Haziran günü Sinop'ta yaşanan gündüz süresi Hatay'dan daha uzundur.",
    "rubric": [("Sinop'un doğru seçilmesi", 0.5), ("Kuzeye gidildikçe gündüzün uzaması gerekçesi", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.1.1', 3, 0)] = {
    "contextText": "Genetik kavramların tanımlanması.",
    "stimulus": "DNA üzerinde yer alan kalıtsal birimler.",
    "questionText": "Bir nükleotidin yapısındaki organik baz çeşitlerini (4 çeşit) yazınız ve DNA'daki nükleotid diziliminin canlının hangi özelliklerini belirlediğini açıklayınız.",
    "solutionExplanation": "Organik bazlar: Adenin, Timin, Guanin, Sitozin. Dizilim: Protein sentezini ve canlıya ait tüm fiziksel/biyokimyasal özellikleri şifreler.",
    "modelAnswer": "• 4 Çeşit Organik Baz: Adenin (A), Timin (T), Guanin (G) ve Sitozin (C/S).\n• Nükleotid Diziliminin Belirlediği Özellikler: Bu 4 bazın diziliş sırası hücredeki proteinlerin şifresini oluşturur; canlının göz renginden enzim üretimine, boy uzunluğundan kan grubuna kadar bütün kalıtsal ve biyolojik özelliklerini belirler.",
    "rubric": [("Dört organik bazın yazılması", 0.5), ("Kalıtsal özellikleri şifreleme fonksiyonunun açıklanması", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.1.1', 3, 1)] = {
    "contextText": "Gen ve alel kavramları.",
    "stimulus": "Biri anneden diğeri babadan gelen ve aynı karakter üzerinde etkili olan gen çiftlerine 'alel gen' denir.",
    "questionText": "Alel genlerin homolog kromozomlar üzerindeki konumunu ve çekinik bir genin etkisini fenotipte gösterebilmesi için hangi genotipte bulunması gerektiğini yazınız.",
    "solutionExplanation": "Alel genler karşılıklı lokuslarda yer alır. Çekinik gen ancak homozigot (saf) durumda etkisini fenotipte gösterir (aa).",
    "modelAnswer": "• Konumu: Alel genler, biri anneden biri babadan gelen eş (homolog) kromozomların karşılıklı aynı bölgelerinde (lokuslarında) yer alır.\n• Çekinik Genin Ortaya Çıkma Şartı: Çekinik bir alelin özelliğini dış görünüşte (fenotipte) gösterebilmesi için canlının 'homozigot çekinik' (saf döl, örneğin aa) genotipine sahip olması gerekir; yanında baskın alel bulunursa etkisi gizlenir.",
    "rubric": [("Homolog kromozomların karşılıklı bölgelerinde yer alma tespiti", 0.5), ("Saf döl (homozigot çekinik) şartının yazılması", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.1.3', 3, 0)] = {
    "contextText": "DNA replikasyonunun amacı.",
    "stimulus": "Hücreler mitoz veya mayoz bölünme geçirmeden önce hazırlık evresinde DNA'larını kopyalarlar.",
    "questionText": "DNA'nın kendini eşlemesinin temel biyolojik amacını ve oluşan yeni DNA ipliklerinin eski ipliklerle olan benzerliğini açıklayınız.",
    "solutionExplanation": "Amaç: Kalıtsal bilginin yeni hücrelere eksiksiz ve eşit aktarılması. Yeni DNA'lar ana DNA'nın birebir kopyasıdır.",
    "modelAnswer": "• Temel Amaç: Canlıya ait genetik şifrenin bölünmeyle oluşacak yeni hücrelere eksiksiz, hatasız ve eşit miktarda aktarılmasını sağlamaktır.\n• Benzerlik: Eşlenme yarı korunumlu (biri eski, biri yeni zincir) gerçekleşir; oluşan iki yeni DNA molekülünün nükleotid dizilimi ve genetik şifresi başlangıçtaki ana DNA molekülü ile tamamen aynı (birebir kopya) olur.",
    "rubric": [("Genetik bilginin yeni hücrelere aktarılma amacının belirtilmesi", 0.5), ("Yarı korunumlu eşlenme ve birebir kopya oluşumu vurgusu", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.1.3', 3, 1)] = {
    "contextText": "DNA eşlenmesinde nükleotid hesabı.",
    "stimulus": "1200 nükleotidden oluşan bir DNA molekülü kendini 1 kez eşleyecektir.",
    "questionText": "Bu eşlenme için sitoplazmadan çekirdeğe toplam kaç adet nükleotid, kaç adet Deoksiriboz şekeri ve kaç adet Fosfat molekülü girmesi gerektiğini bulunuz.",
    "solutionExplanation": "Yeni 2 DNA oluşurken başlangıçtaki kadar (1200 nükleotid) yeni zincir sentezlenir. 1200 nükleotid, 1200 şeker, 1200 fosfat gerekir.",
    "modelAnswer": "• Bir DNA kendini eşlediğinde 2 yeni DNA oluşur ve toplam nükleotid sayısı 1200'den 2400'e çıkar.\n• Dolayısıyla sitoplazmadan çekirdeğe yeni sentezlenecek zincirler için 1200 adet nükleotid girmelidir.\n• Her nükleotid 1 şeker ve 1 fosfat içerdiğinden:\n- 1200 adet Deoksiriboz şekeri\n- 1200 adet Fosfat molekülü sitoplazmadan çekirdeğe aktarılmalıdır.",
    "rubric": [("1200 nükleotid ihtiyacının tespiti", 0.5), ("1200 şeker ve 1200 fosfat sayısının açıklanması", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.2.1', 3, 0)] = {
    "contextText": "Baskın ve çekinik karakterler.",
    "stimulus": "Kahverengi göz aleli (K), mavi göz aleline (k) baskındır.",
    "questionText": "Kahverengi gözlü bir anne ile kahverengi gözlü bir babanın mavi gözlü bir çocuklarının dünyaya gelmesi bu anne ve babanın genotipleri hakkında neyi kanıtlar? Açıklayınız.",
    "solutionExplanation": "Mavi gözlü çocuk 'kk' olduğundan hem anne hem baba 'Kk' (heterozigot) genotipindedir.",
    "modelAnswer": "Mavi göz rengi çekinik bir özellik olduğu için mavi gözlü çocuğun genotipi 'kk' olmak zorundadır. Çocuk bu çekinik alellerin birini anneden, diğerini babadan almıştır. Anne ve baba kahverengi gözlü oldukları halde çocuklarına mavi göz genini aktarabildiklerine göre her ikisinin de 'Kk' (heterozigot/melez) genotipine sahip olduğu kanıtlanır.",
    "rubric": [("Çocuğun kk genotipinde olduğunun tespiti", 0.5), ("Anne ve babanın melez (Kk) olduğunun kanıtlanması", 0.5)]
}

# ---------------------------------------------------------------------
# SENARYO 5 (8 Questions)
# ---------------------------------------------------------------------
G8_DEDICATED[('fen_bilimleri', 'F.8.1.1.1', 4, 0)] = {
    "contextText": "Güneş ışınlarının atmosferde aldığı yol ve enerji kaybı.",
    "stimulus": "Kışın Güneş ışınları atmosferde daha uzun bir yol kat ederken yazın daha kısa bir yoldan yeryüzüne ulaşır.",
    "questionText": "Işınların atmosferde aldığı yolun uzunluğu ile atmosfer tarafından tutulan (soğurulan) enerji miktarı arasındaki ilişkiyi mevsim sıcaklıklarıyla açıklayınız.",
    "solutionExplanation": "Eğik açıyla gelen ışınlar atmosferde daha uzun yol alır, daha fazla tutulur/yansır, yere daha az enerji ulaşır (soğuk olur). Dik açıda yol kısa, kayıp az, enerji fazladır (sıcak olur).",
    "modelAnswer": "• Kış Mevsiminde (Eğik Açı): Güneş ışınları atmosfere eğik girdiğinde atmosfer katmanları boyunca çok daha uzun bir yol kateder. Bu uzun yolculuk sırasında ışınların büyük kısmı bulutlar ve gazlar tarafından soğurulur ve yansıtılır; yeryüzüne ulaşan enerji azaldığı için hava soğuk olur.\n• Yaz Mevsiminde (Dik Açı): Işınlar dik girdiğinden atmosferde en kısa yolu alır; enerji kaybı minimum olur ve yeryüzü kuvvetli şekilde ısınır.",
    "rubric": [("Eğik açıda uzun yol ve yüksek enerji kaybı ilişkisi", 0.5), ("Dik açıda kısa yol ve yüksek sıcaklık ilişkisi", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.1.1.1', 4, 1)] = {
    "contextText": "Eksen eğikliği olmasaydı ne olurdu?",
    "stimulus": "Dünya'nın dönme ekseni yörünge düzlemine dik olsaydı (yani 23° 27'lik eğiklik bulunmasaydı).",
    "questionText": "Dünya'nın eksen eğikliği olmasaydı gezegenimizde meydana gelebilecek 2 temel değişikliği yazınız.",
    "solutionExplanation": "1. Mevsimler oluşmazdı, sıcaklık yıl boyu sabit kalırdı. 2. Gece-gündüz süreleri her yerde ve her gün 12 saat eşit olurdu.",
    "modelAnswer": "1. Mevsimler Oluşmazdı: Yıl boyunca bir bölgeye Güneş ışınlarının geliş açısı hiç değişmezdi; bir yer daima yazı, bir yer daima kışı yaşardı, mevsim döngüsü ortadan kalkardı.\n2. Gece ve Gündüz Süreleri Daima Eşit Olurdu: Yılın 365 günü Dünya'nın her yerinde 12 saat gündüz, 12 saat gece yaşanırdı.",
    "rubric": [("Mevsimlerin ortadan kalkacağının belirtilmesi", 0.5), ("Gece-gündüz eşitliğinin yıl boyu süreceğinin belirtilmesi", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.1.2', 4, 0)] = {
    "contextText": "DNA sarmalında hata analizi.",
    "stimulus": "Bir DNA molekülünün birinci zincirindeki nükleotid dizilimi verilmiştir: A - G - T - [Boşluk] - C",
    "questionText": "İkinci zincirde boşluğun karşısına 'A' nükleotidi geldiğine göre:\na) Birinci zincirdeki boşluğa hangi nükleotidin gelmesi gerektiğini,\nb) Bu nükleotidler arasında kaçlı hidrojen bağı kurulacağını yazınız.",
    "solutionExplanation": "a) Karşısında A varsa Timin (T) gelmelidir. b) A ile T arasında ikili hidrojen bağı kurulur.",
    "modelAnswer": "a) Birinci Zincirdeki Boşluk: Karşı zincirde 'A' (Adenin) bulunduğuna göre DNA eşleşme kuralı (A ile T eşleşir) gereği boşluğa 'T' (Timin nükleotidi) gelmelidir.\nb) Hidrojen Bağı: Adenin ile Timin nükleotidleri arasında 2'li zayıf hidrojen bağı kurulur.",
    "rubric": [("Timin nükleotidinin doğru tespiti", 0.5), ("İkili hidrojen bağının belirtilmesi", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.1.3', 4, 0)] = {
    "contextText": "Radyasyonun DNA eşlenmesine etkisi.",
    "stimulus": "Güneş'in zararlı ultraviyole (UV) ışınları veya X ışınları DNA eşlenmesi sırasında nükleotid yapısının bozulmasına yol açabilir.",
    "questionText": "Radyasyon etkisiyle DNA zincirinde meydana gelen kalıcı bozulmalara ne ad verilir? Bu durumun vücut ve üreme hücrelerinde ortaya çıkmasının farkını açıklayınız.",
    "solutionExplanation": "Mutasyon denir. Vücut hücresindeki mutasyon sadece bireyi ilgilendirir (kalıtsal değildir); üreme hücresindeki mutasyon ise nesillere aktarılır (kalıtsaldır).",
    "modelAnswer": "• Tanım: DNA diziliminde meydana gelen bu kalıcı değişimlere 'Mutasyon' adı verilir.\n• Hücre Türü Farkı:\n- Vücut Hücrelerinde Oluşursa: Sadece o bireyi etkiler (kanser vb.), sonraki nesillere aktarılmaz (kalıtsal değildir).\n- Üreme Hücrelerinde Oluşursa: Gametler aracılığıyla döle aktarılır, yani kalıtsaldır ve sonraki nesillerde de görülür.",
    "rubric": [("Mutasyon kavramının doğru yazılması", 0.4), ("Vücut hücresi (kalıtsal değil) ve üreme hücresi (kalıtsal) ayrımı", 0.6)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.2.1', 4, 0)] = {
    "contextText": "Fenotip ve genotip kavramlarının çevresel modifikasyonla ilişkisi.",
    "stimulus": "Karahindiba bitkisinin ovada yetişeninin uzun boylu, dağda yetişeninin ise kısa boylu olması çevre etkisiyle gen işleyişinin değişmesidir.",
    "questionText": "Genin yapısının değişmesi (mutasyon) ile genin işleyişinin değişmesi (modifikasyon) arasındaki temel farkı kalıtsallık açısından açıklayınız.",
    "solutionExplanation": "Mutasyonda gen yapısı değişir ve üreme hücresindeyse kalıtsaldır. Modifikasyonda gen yapısı değişmez sadece işleyişi değişir, kalıtsal değildir.",
    "modelAnswer": "• Mutasyon: DNA ve genlerin nükleotid diziliminde (yapısında) meydana gelen bozulmadır; üreme hücrelerindeyse sonraki nesillere aktarılır (kalıtsaldır).\n• Modifikasyon: Çevre şartlarının (ısı, ışık, besin) etkisiyle sadece genlerin çalışma şeklinde (işleyişinde) meydana gelen geçici değişimlerdir; gen yapısı değişmediği için asla yavrulara aktarılmaz (kalıtsal değildir).",
    "rubric": [("Mutasyonda gen yapısının değiştiğinin belirtilmesi", 0.5), ("Modifikasyonda sadece işleyişin değiştiği ve kalıtsal olmadığının açıklanması", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.2.2', 4, 0)] = {
    "contextText": "Çaprazlama: Tohum şekli.",
    "stimulus": "Homozigot düzgün tohumlu bir bezelye ile buruşuk tohumlu bir bezelye çaprazlanarak F1 kuşağı elde ediliyor. Daha sonra F1 kuşağından alınan iki bezelye kendi arasında çaprazlanıyor (F2 kuşağı).",
    "questionText": "F2 kuşağında oluşacak bezelyelerin genotip oranlarını (saf baskın, melez baskın, saf çekinik) yüzde olarak yazınız.",
    "solutionExplanation": "F1: Dd. F2: Dd x Dd -> DD (%25 saf baskın), Dd (%50 melez baskın), dd (%25 saf çekinik).",
    "modelAnswer": "• F1 Kuşağı: DD × dd -> %100 Dd (Melez)\n• F2 Kuşağı Çaprazlaması: Dd × Dd\n- D × D -> DD (%25 Homozigot / Saf Baskın)\n- D × d -> Dd (%25 Heterozigot / Melez Baskın)\n- d × D -> Dd (%25 Heterozigot / Melez Baskın)\n- d × d -> dd (%25 Homozigot / Saf Çekinik)\n• Sonuç Genotip Dağılımı: %25 Saf Baskın (DD), %50 Melez Baskın (Dd), %25 Saf Çekinik (dd).",
    "rubric": [("F1 ve F2 çaprazlama adımlarının doğru yapılması", 0.5), ("%25 DD, %50 Dd, %25 dd oranlarının hatasız bulunması", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.2.2', 4, 1)] = {
    "contextText": "Meyve rengi çaprazlaması.",
    "stimulus": "Bezelyelerde yeşil meyve rengi (Y), sarı meyve rengine (y) baskındır. Melez yeşil meyveli bezelye ile sarı meyveli bezelye çaprazlanıyor.",
    "questionText": "Bu çaprazlama sonucunda yeşil meyveli ve sarı meyveli bezelye oluşma olasılıklarını Punnett karesi veya çaprazlama şemasıyla hesaplayınız.",
    "solutionExplanation": "Yy x yy -> Yy (%50 yeşil), yy (%50 sarı).",
    "modelAnswer": "• Ebeveynler: Yy (Melez Yeşil) × yy (Sarı Meyve)\n• Çaprazlama:\n- Y ile y -> Yy (Yeşil meyve)\n- Y ile y -> Yy (Yeşil meyve)\n- y ile y -> yy (Sarı meyve)\n- y ile y -> yy (Sarı meyve)\n• Sonuçlar: %50 Yeşil meyveli bezelye, %50 Sarı meyveli bezelye oluşur.",
    "rubric": [("Çaprazlama şemasının kurulması", 0.5), ("%50 yeşil ve %50 sarı oranının doğru bulunması", 0.5)]
}
G8_DEDICATED[('fen_bilimleri', 'F.8.2.2.2', 4, 2)] = {
    "contextText": "İnsan genetiğinde akraba evliliği riski.",
    "stimulus": "Kistik fibrozis, fenilketonüri gibi birçok kalıtsal genetik hastalık çekinik alellerle taşınır.",
    "questionText": "Akraba evliliği yapmış bireylerin çocuklarında genetik hastalıkların görülme olasılığının neden akraba olmayanlara göre çok daha yüksek olduğunu açıklayınız.",
    "solutionExplanation": "Akrabaların ortak atadan gelen genetik yapıları benzerdir. Hastalık taşıyıcı olma ihtimalleri yüksektir ve iki çekinik genin yan yana gelme olasılığı artar.",
    "modelAnswer": "Kalıtsal hastalıkların çoğu çekinik genlerle (küçük harfle) taşınır ve hastalığın ortaya çıkması için hem anneden hem babadan aynı kusurlu çekinik genin gelmesi gerekir. Akraba olan bireyler aynı soy ağacından geldikleri için ortak gen havuzuna sahiptirler; bu nedenle her ikisinin de aynı hastalık genini taşıyor olma ihtimali çok yüksektir. Evlendiklerinde bu kusurlu çekinik genlerin yan yana gelme (homozigot olma) olasılığı toplum ortalamasına göre katbekat artar.",
    "rubric": [("Ortak atadan gelen genetik benzerliğin açıklanması", 0.5), ("Çekinik hastalık genlerinin yan yana gelme riskinin artışı vurgusu", 0.5)]
}

print("Grade 8 Fen Bilimleri dedicated questions registered successfully!")
