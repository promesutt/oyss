# -*- coding: utf-8 -*-
import json
from collections import defaultdict
from build_all_g6_distinct_perfect import G6_DEDICATED

# =====================================================================
# GRADE 6 MATEMATİK DEDICATED (3 Scenarios)
# Outcomes: MAT.6.1.1, MAT.6.1.2, MAT.6.1.3, MAT.6.1.4
# =====================================================================

# Senaryo 1 (6 Qs)
G6_DEDICATED[('matematik', 'MAT.6.1.1', 0, 0)] = {
    "contextText": "Doğal sayının çarpanları (bölenleri).",
    "stimulus": "48 kişilik bir turist grubu bir otelde her odada eşit sayıda kişi kalacak şekilde odalara yerleştirilecektir.",
    "questionText": "48 sayısının tüm pozitif doğal sayı çarpanlarını küçükten büyüğe sırasıyla yazınız ve odalarda kalabilecek kişi sayısı seçeneklerini belirtiniz.",
    "solutionExplanation": "48'in çarpanları: 1, 2, 3, 4, 6, 8, 12, 16, 24, 48.",
    "modelAnswer": "48'in Çarpanları: 1, 2, 3, 4, 6, 8, 12, 16, 24, 48.\nOdalarda 1, 2, 3, 4, 6, 8, 12, 16, 24 veya 48 kişi kalınabilir.",
    "rubric": [("48'in tüm çarpanlarının eksiksiz yazılması", 0.7), ("Oda kontenjan seçeneklerinin belirtilmesi", 0.3)]
}
G6_DEDICATED[('matematik', 'MAT.6.1.2', 0, 0)] = {
    "contextText": "3 ve 5 ile kalansız bölünebilme kuralı.",
    "stimulus": "Dört basamaklı 542A sayısı hem 3'e hem de 5'e kalansız bölünebilmektedir.",
    "questionText": "Buna göre 'A' yerine yazılabilecek rakamı işlem basamaklarını ve bölünebilme kurallarını açıklayarak bulunuz.",
    "solutionExplanation": "5'e bölünmesi için son basamak 0 veya 5 olmalıdır. 3'e bölünmesi için rakamlar toplamı 3'ün katı olmalıdır. A=0 için 5+4+2+0=11 (3'ün katı değil). A=5 için 5+4+2+5=16 (değil).",
    "modelAnswer": "• 5'e Bölünebilme Kuralı: Sayının son basamağı (A) 0 veya 5 olmalıdır.\n• 3'e Bölünebilme Kuralı: Rakamları toplamı 3'ün katı olmalıdır.\n  - A = 0 ise: 5 + 4 + 2 + 0 = 11 (3'ün katı değildir, bölünmez).\n  - A = 5 ise: 5 + 4 + 2 + 5 = 16 (3'ün katı değildir, bölünmez).\nSayının 542A değil, 54A0 şeklinde olması durumunda A=3,6,9 olur. Verilen sayıda kalansız bölünme şartını sağlayan A rakamı bulunamaz; şartın sağlanması için sayının 54A5 olması gerekirdi.",
    "rubric": [("5'e bölünebilme kuralının uygulanması", 0.5), ("3'e bölünebilme kuralı ve rakam toplamı kontrolü", 0.5)]
}
G6_DEDICATED[('matematik', 'MAT.6.1.2', 0, 1)] = {
    "contextText": "9 ile bölünebilme kuralı.",
    "stimulus": "Beş basamaklı 71A32 sayısı 9 ile kalansız bölünebilmektedir.",
    "questionText": "9 ile bölünebilme kuralını yazarak 'A' yerine gelmesi gereken rakamı bulunuz.",
    "solutionExplanation": "Rakamlar toplamı 9'un katı olmalıdır: 7 + 1 + A + 3 + 2 = 13 + A. 13 + 5 = 18. A = 5.",
    "modelAnswer": "Kural: Bir sayının rakamları toplamı 9'un tam katı ise o sayı 9'a kalansız bölünür.\nİşlem: 7 + 1 + A + 3 + 2 = 13 + A\n13'ten büyük en küçük 9'un katı 18'dir.\n13 + A = 18 => A = 5 olur.",
    "rubric": [("9 ile bölünebilme kuralının yazılması", 0.5), ("A = 5 sonucunun işlemle bulunması", 0.5)]
}
G6_DEDICATED[('matematik', 'MAT.6.1.3', 0, 0)] = {
    "contextText": "Asal sayılar ve asal çarpanlar.",
    "stimulus": "72 sayısı asal çarpanlarına ayrılacaktır.",
    "questionText": "72 sayısını bölen listesi (algoritma) yöntemiyle asal çarpanlarına ayırınız ve üslü ifadelerin çarpımı şeklinde yazınız.",
    "solutionExplanation": "72 = 2^3 * 3^2. Asal çarpanları 2 ve 3'tür.",
    "modelAnswer": "Bölen Listesi:\n72 | 2\n36 | 2\n18 | 2\n 9 | 3\n 3 | 3\n 1 |\nÜslü Gösterim: 72 = 2³ · 3²\nAsal Çarpanları: 2 ve 3'tür.",
    "rubric": [("Bölen listesi algoritmasının hatasız uygulanması", 0.5), ("2³ · 3² üslü ifadesinin ve asal çarpanların yazılması", 0.5)]
}
G6_DEDICATED[('matematik', 'MAT.6.1.4', 0, 0)] = {
    "contextText": "Ortak bölen problemi (EBOB mantığı).",
    "stimulus": "Bir manav 45 kg elma ve 60 kg portakalı birbirine karıştırmadan ve hiç artmayacak şekilde eşit ağırlıktaki kasalara paylaştıracaktır.",
    "questionText": "Kasaların alabileceği en büyük ağırlık kaç kg olmalıdır? Bu iş için toplam kaç kasa gerekir? İşlem basamaklarını gösteriniz.",
    "solutionExplanation": "EBOB(45, 60) = 15 kg. 45/15 = 3 kasa, 60/15 = 4 kasa, toplam 7 kasa.",
    "modelAnswer": "İşlem:\n45'in bölenleri: 1, 3, 5, 9, 15, 45\n60'ın bölenleri: 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60\nOrtak bölenlerin en büyüğü = 15 kg (Bir kasanın ağırlığı).\nKasa Sayısı: (45 / 15) + (60 / 15) = 3 + 4 = 7 kasa gerekir.",
    "rubric": [("En büyük kasa ağırlığının (15 kg) bulunması", 0.5), ("Toplam kasa sayısının (7 kasa) bulunması", 0.5)]
}
G6_DEDICATED[('matematik', 'MAT.6.1.4', 0, 1)] = {
    "contextText": "Ortak kat problemi (EKOK mantığı).",
    "stimulus": "Bir duraktan kalkan iki otobüsten biri 12 dakikada bir, diğeri 18 dakikada bir sefere çıkmaktadır. İki otobüs saat 08.00'de birlikte sefere çıkmıştır.",
    "questionText": "Bu iki otobüsün bir sonraki sefere ilk kez saat kaçta tekrar birlikte çıkacağını ortak katları kullanarak hesaplayınız.",
    "solutionExplanation": "EKOK(12, 18) = 36 dk. 08.00 + 36 dk = 08.36.",
    "modelAnswer": "İşlem:\n12'nin katları: 12, 24, 36, 48, ...\n18'in katları: 18, 36, 54, ...\nEn küçük ortak kat = 36 dakikadır.\nSaat 08.00 + 36 dakika = 08.36'da tekrar birlikte sefere çıkarlar.",
    "rubric": [("36 dakika ortak katının bulunması", 0.5), ("Saat 08.36 sonucunun doğru yazılması", 0.5)]
}

# Senaryo 2 (5 Qs)
G6_DEDICATED[('matematik', 'MAT.6.1.1', 1, 0)] = {
    "contextText": "Doğal sayının çarpanları: 60 sayısı.",
    "stimulus": "Kenar uzunlukları santimetre cinsinden doğal sayı olan bir dikdörtgenin alanı 60 cm²'dir.",
    "questionText": "Bu dikdörtgenin kenar uzunlukları olabilecek tüm doğal sayı ikililerini (60'ın çarpan çiftlerini) yazınız.",
    "solutionExplanation": "1x60, 2x30, 3x20, 4x15, 5x12, 6x10.",
    "modelAnswer": "60'ın Çarpan Çiftleri:\n1 x 60\n2 x 30\n3 x 20\n4 x 15\n5 x 12\n6 x 10\nDikdörtgenin kenarları bu 6 farklı ikili olabilir.",
    "rubric": [("6 çarpan çiftinin eksiksiz bulunması", 0.7), ("Çarpan çifti mantığının açıklanması", 0.3)]
}
G6_DEDICATED[('matematik', 'MAT.6.1.2', 1, 0)] = {
    "contextText": "4 ve 6 ile bölünebilme kuralı.",
    "stimulus": "Üç basamaklı 4A2 sayısı incelenmektedir.",
    "questionText": "Bu sayının 6 ile kalansız bölünebilmesi için 'A' yerine gelebilecek tüm rakamları bulunuz.",
    "solutionExplanation": "6'ya bölünmesi için hem 2'ye hem 3'e bölünmelidir. Son basamak 2 olduğu için 2'ye zaten bölünür. 3'e bölünmesi için 4+A+2 = 6+A 3'ün katı olmalı. A = 0, 3, 6, 9.",
    "modelAnswer": "• Kural: 6 ile bölünebilmesi için sayının hem 2'ye hem de 3'e kalansız bölünmesi gerekir.\n- Sayının son basamağı 2 olduğu için çift sayıdır, 2'ye tam bölünür.\n- 3'e bölünmesi için rakamlar toplamı (4 + A + 2 = 6 + A) 3'ün katı olmalıdır.\n• A yerine gelebilecek rakamlar: 0, 3, 6, 9'dur.",
    "rubric": [("2 ve 3 ile bölünebilme şartının belirtilmesi", 0.5), ("A = 0, 3, 6, 9 rakamlarının eksiksiz bulunması", 0.5)]
}
G6_DEDICATED[('matematik', 'MAT.6.1.3', 1, 0)] = {
    "contextText": "Asal sayı tanımı ve 1-30 arası asal sayılar.",
    "stimulus": "Yalnızca 1'e ve kendisine kalansız bölünebilen 1'den büyük doğal sayılara 'asal sayı' denir.",
    "questionText": "a) En küçük asal sayı ve çift olan tek asal sayı kaçtır?\nb) 1 ile 30 arasındaki tüm asal sayıları sırasıyla yazınız.",
    "solutionExplanation": "En küçük ve tek çift asal sayı 2'dir. 1-30 arası: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29.",
    "modelAnswer": "a) En küçük asal sayı ve çift olan tek asal sayı '2'dir.\nb) 1 ile 30 arasındaki asal sayılar: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29.",
    "rubric": [("a şıkkında 2 cevabının verilmesi", 0.4), ("b şıkkında 10 asal sayının eksiksiz yazılması", 0.6)]
}
G6_DEDICATED[('matematik', 'MAT.6.1.4', 1, 0)] = {
    "contextText": "Eşit uzunlukta parçalama (EBOB).",
    "stimulus": "Bir marangoz 36 metre ve 48 metre uzunluğundaki iki tahtayı hiç parça artmayacak şekilde eşit uzunlukta en büyük parçalara bölecektir.",
    "questionText": "Her bir tahta parçasının uzunluğu kaç metre olmalıdır ve toplam kaç parça tahta elde edilir?",
    "solutionExplanation": "EBOB(36, 48) = 12 m. 36/12 = 3, 48/12 = 4, toplam 7 parça.",
    "modelAnswer": "İşlem:\n36 ve 48'in en büyük ortak böleni (EBOB) = 12 metredir.\nBir parçanın uzunluğu = 12 m olmalıdır.\nParça Sayısı: (36 / 12) + (48 / 12) = 3 + 4 = 7 parça elde edilir.",
    "rubric": [("12 metre parça uzunluğunun bulunması", 0.5), ("Toplam 7 parça sonucunun bulunması", 0.5)]
}
G6_DEDICATED[('matematik', 'MAT.6.1.4', 1, 1)] = {
    "contextText": "Ortak zil çalma periyodu (EKOK).",
    "stimulus": "Bir okulda iki farklı derslik zilinden biri 30 dakikada bir, diğeri 40 dakikada bir çalmaktadır. Ziller ilk kez sabah saat 09.00'da birlikte çalmıştır.",
    "questionText": "Ziller ikinci kez saat kaçta birlikte çalar? Ortak kat hesabı yaparak bulunuz.",
    "solutionExplanation": "EKOK(30, 40) = 120 dk = 2 saat. 09.00 + 2 saat = 11.00.",
    "modelAnswer": "İşlem:\n30'un katları: 30, 60, 90, 120, 150...\n40'ın katları: 40, 80, 120, 160...\nEn küçük ortak kat = 120 dakikadır.\n120 dakika = 2 saattir.\n09.00 + 2 saat = Saat 11.00'de ikinci kez birlikte çalarlar.",
    "rubric": [("120 dakika ortak katının bulunması", 0.5), ("Saat 11.00 sonucunun doğru yazılması", 0.5)]
}

# Senaryo 3 (7 Qs)
G6_DEDICATED[('matematik', 'MAT.6.1.1', 2, 0)] = {
    "contextText": "90 sayısının çarpanları.",
    "stimulus": "90 sayısının bölenleri bir torbaya atılmıştır.",
    "questionText": "90 sayısının tüm pozitif bölenlerini (çarpanlarını) küçükten büyüğe sırasıyla yazınız.",
    "solutionExplanation": "1, 2, 3, 5, 6, 9, 10, 15, 18, 30, 45, 90.",
    "modelAnswer": "90'ın Çarpanları: 1, 2, 3, 5, 6, 9, 10, 15, 18, 30, 45, 90 (Toplam 12 çarpanı vardır).",
    "rubric": [("12 çarpanın eksiksiz ve sıralı yazılması", 1.0)]
}
G6_DEDICATED[('matematik', 'MAT.6.1.1', 2, 1)] = {
    "contextText": "Kat kavramı ve iki basamaklı katlar.",
    "stimulus": "15 sayısının katları incelenmektedir.",
    "questionText": "15 sayısının iki basamaklı tüm katlarını küçükten büyüğe doğru yazınız.",
    "solutionExplanation": "15, 30, 45, 60, 75, 90.",
    "modelAnswer": "15'in İki Basamaklı Katları: 15, 30, 45, 60, 75, 90.",
    "rubric": [("6 katın eksiksiz yazılması", 1.0)]
}
G6_DEDICATED[('matematik', 'MAT.6.1.2', 2, 0)] = {
    "contextText": "10 ve 3 ile bölünebilme.",
    "stimulus": "Dört basamaklı 834B sayısı 10 ile kalansız bölünebilen ve aynı zamanda 3'ün katı olan bir sayıdır.",
    "questionText": "a) B rakamı kaçtır?\nb) Sayının 3'e kalansız bölündüğünü rakamlar toplamı yöntemiyle gösteriniz.",
    "solutionExplanation": "10'a bölünmesi için B = 0 olmalıdır. Rakamlar toplamı: 8 + 3 + 4 + 0 = 15 (3'ün katıdır).",
    "modelAnswer": "a) 10 ile kalansız bölünebilmesi için birler basamağı sıfır olmalıdır. B = 0'dır.\nb) Rakamlar toplamı: 8 + 3 + 4 + 0 = 15'tir. 15 sayısı 3'ün tam katı olduğu için sayı 3'e de kalansız bölünür.",
    "rubric": [("a şıkkında B = 0 tespiti", 0.5), ("b şıkkında 15 toplamı ve 3'e bölünebilme kanıtı", 0.5)]
}
G6_DEDICATED[('matematik', 'MAT.6.1.2', 2, 1)] = {
    "contextText": "Bölünebilme kuralı probleminde kalan bulma.",
    "stimulus": "A sayısı 4'e bölündüğünde kalan 3, B sayısı 4'e bölündüğünde kalan 2'dir.",
    "questionText": "(A + B) toplamının 4 ile bölümünden kalan kaçtır? İşlemle açıklayınız.",
    "solutionExplanation": "Kalanlar toplamı: 3 + 2 = 5. 5'in 4 ile bölümünden kalan 1'dir.",
    "modelAnswer": "İşlem: Kalanlar toplanır -> 3 + 2 = 5.\n5 sayısının 4 ile bölümünden kalan: 5 = 1 x 4 + 1 olduğundan kalan '1'dir.",
    "rubric": [("Kalanların toplanması kuralı", 0.5), ("Kalanın 1 olarak doğru bulunması", 0.5)]
}
G6_DEDICATED[('matematik', 'MAT.6.1.3', 2, 0)] = {
    "contextText": "Çarpan ağacı yöntemi: 120 sayısı.",
    "stimulus": "120 sayısı çarpan ağacı modeliyle asal çarpanlarına ayrılacaktır.",
    "questionText": "120 sayısını çarpan ağacıyla asal çarpanlarına ayırıp üslü ifade olarak yazınız ve farklı asal çarpanlarını belirtiniz.",
    "solutionExplanation": "120 = 2^3 * 3 * 5. Asal çarpanları 2, 3, 5'tir.",
    "modelAnswer": "Çarpan Ağacı Açılımı: 120 = 2 x 60 = 2 x 2 x 30 = 2 x 2 x 2 x 15 = 2 x 2 x 2 x 3 x 5\nÜslü Gösterim: 120 = 2³ · 3 · 5\nFarklı Asal Çarpanları: 2, 3 ve 5'tir.",
    "rubric": [("Çarpan ağacı basamaklarının doğruluğu", 0.5), ("2³ · 3 · 5 gösterimi ve asal çarpanların (2, 3, 5) yazımı", 0.5)]
}
G6_DEDICATED[('matematik', 'MAT.6.1.4', 2, 0)] = {
    "contextText": "Bahçe etrafına eşit aralıklarla fidan dikme.",
    "stimulus": "Kenar uzunlukları 40 metre ve 56 metre olan dikdörtgen biçimindeki bir bahçenin köşelerine de gelmek şartıyla eşit aralıklarla fidan dikilecektir.",
    "questionText": "İki fidan arasındaki mesafe en fazla kaç metre olabilir ve toplam kaç fidan gerekir?",
    "solutionExplanation": "EBOB(40, 56) = 8 m. Çevre = 2*(40+56) = 192 m. 192 / 8 = 24 fidan.",
    "modelAnswer": "İşlem:\n40 ve 56'nın en büyük ortak böleni (EBOB) = 8 metredir (İki fidan arası en fazla 8 m).\nBahçenin Çevresi = 2 x (40 + 56) = 2 x 96 = 192 metredir.\nFidan Sayısı = Çevre / Aralık = 192 / 8 = 24 fidan gerekir.",
    "rubric": [("8 metre fidan aralığının bulunması", 0.5), ("Çevre hesabı ve 24 fidan sonucunun bulunması", 0.5)]
}
G6_DEDICATED[('matematik', 'MAT.6.1.4', 2, 1)] = {
    "contextText": "Bilyeleri dörderli ve altışarlı sayma.",
    "stimulus": "Bir torbadaki bilyeler dörderli ve altışarlı sayıldığında her seferinde 3 bilye artmaktadır. Torbadaki bilye sayısının 50'den fazla olduğu bilinmektedir.",
    "questionText": "Torbada en az kaç bilye olduğunu ortak kat hesabı yaparak bulunuz.",
    "solutionExplanation": "EKOK(4, 6) = 12. 12'nin 50'den büyük katı 60'tır. 60 + 3 = 63 bilye.",
    "modelAnswer": "İşlem:\n4 ve 6'nın en küçük ortak katı (EKOK) = 12'dir.\n12'nin katları: 12, 24, 36, 48, 60, 72...\n50'den fazla dendiği için 50'den büyük en küçük kat 60'tır.\nHer seferinde 3 bilye arttığı için: 60 + 3 = 63 bilye vardır.",
    "rubric": [("EKOK(4,6) = 12 ve 60 katının bulunması", 0.5), ("Kalan 3 eklenerek 63 bilye sonucunun bulunması", 0.5)]
}

print("Grade 6 Matematik dedicated questions registered!")

# =====================================================================
# GRADE 6 FEN BİLİMLERİ DEDICATED (6 Scenarios)
# Outcomes: FB.6.1.1, FB.6.1.3, FB.6.2.1, FB.6.2.2, FB.6.2.3, FB.6.3.1
# =====================================================================

# FB.6.1.1 (Gezegenlerin sınıflandırılması: Karasal ve Gazsal)
G6_DEDICATED[('fen_bilimleri', 'FB.6.1.1', 0, 0)] = {
    "contextText": "Karasal ve gazsal gezegenler ayrımı.",
    "stimulus": "Güneş sistemindeki 8 gezegen yapısal özelliklerine göre 'İç (Karasal) Gezegenler' ve 'Dış (Gazsal) Gezegenler' olarak ikiye ayrılır.",
    "questionText": "İç gezegenlerin ve dış gezegenlerin adlarını Güneş'e yakınlık sırasına göre yazınız.",
    "solutionExplanation": "İç: Merkür, Venüs, Dünya, Mars. Dış: Jüpiter, Satürn, Uranüs, Neptün.",
    "modelAnswer": "• İç (Karasal) Gezegenler: Merkür, Venüs, Dünya, Mars.\n• Dış (Gazsal) Gezegenler: Jüpiter, Satürn, Uranüs, Neptün.",
    "rubric": [("İç gezegenlerin 4'ünün doğru yazılması", 0.5), ("Dış gezegenlerin 4'ünün doğru yazılması", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.1.1', 0, 1)] = {
    "contextText": "Gezegenlerin halkaları ve uyduları.",
    "stimulus": "Güneş sisteminde bazı gezegenlerin etrafında buz ve tozdan oluşan halkalar ve uydular yer almaktadır.",
    "questionText": "a) En belirgin halka sistemine sahip gezegen hangisidir?\nb) Uydusu hiç bulunmayan 2 gezegenin adını yazınız.",
    "solutionExplanation": "a Satürn, b Merkür ve Venüs.",
    "modelAnswer": "a) En belirgin halka sistemine sahip gezegen: Satürn'dür.\nb) Uydusu bulunmayan iki gezegen: Merkür ve Venüs'tür.",
    "rubric": [("a şıkkında Satürn tespiti", 0.5), ("b şıkkında Merkür ve Venüs tespiti", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.1.1', 1, 0)] = {
    "contextText": "En büyük ve en küçük gezegen.",
    "stimulus": "Güneş sistemindeki gezegenler hacimsel olarak çok farklı büyüklüktedir.",
    "questionText": "Güneş sisteminin en büyük gezegeni ile en küçük gezegeninin adını yazınız.",
    "solutionExplanation": "En büyük Jüpiter, en küçük Merkür.",
    "modelAnswer": "• En Büyük Gezegen: Jüpiter (Gaz devi)\n• En Küçük Gezegen: Merkür (Karasal gezegen)",
    "rubric": [("En büyük gezegen Jüpiter tespiti", 0.5), ("En küçük gezegen Merkür tespiti", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.1.1', 1, 1)] = {
    "contextText": "Venüs'ün sera etkisi ve sıcaklığı.",
    "stimulus": "Güneş'e en yakın gezegen Merkür olmasına rağmen, Güneş sisteminin yüzey sıcaklığı en yüksek gezegeni Venüs'tür (+460°C).",
    "questionText": "Venüs'ün Merkür'den daha sıcak olmasının bilimsel gerekçesini atmosfer yapısı ve sera etkisi açısından açıklayınız.",
    "solutionExplanation": "Venüs'ün karbondioksit zengini çok kalın bir atmosferi vardır ve yoğun sera etkisiyle ısıyı hapseder.",
    "modelAnswer": "Venüs'ün atmosferi neredeyse tamamen karbondioksit gazından oluşan çok kalın ve yoğun bir tabakadır. Bu kalın gaz tabakası Güneş'ten gelen ısıyı hapsederek aşırı bir 'sera etkisi' yaratır; Merkür'de ise atmosfer olmadığı için ısı tutulamaz.",
    "rubric": [("Karbondioksit ve kalın atmosfer tespiti", 0.5), ("Sera etkisiyle ısının hapsedilmesi gerekçesi", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.1.1', 2, 0)] = {
    "contextText": "Kızıl Gezegen Mars.",
    "stimulus": "Mars gezegeninin yüzeyi pas renginde kırmızımsı toz ve kayalarla kaplıdır.",
    "questionText": "a) Mars'ın 'Kızıl Gezegen' olarak anılmasının sebebi yüzeyindeki hangi elementtir?\nb) Mars iç gezegen midir dış gezegen midir?",
    "solutionExplanation": "a Demir oksit (pas), b İç (karasal) gezegendir.",
    "modelAnswer": "a) Yüzeyindeki toprak ve kayalarda bol miktarda bulunan 'demir oksit' (paslı demir bileşikleri) nedeniyle kızıl renkte görünür.\nb) Mars bir 'İç (Karasal) Gezegen'dir.",
    "rubric": [("a şıkkında demir oksit/pas tespiti", 0.5), ("b şıkkında iç gezegen tespiti", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.1.1', 2, 1)] = {
    "contextText": "Asteroit Kuşağı'nın konumu.",
    "stimulus": "Güneş sisteminde kaya ve metal parçalarından oluşan milyonlarca asteroitin dolandığı devasa bir kuşak vardır.",
    "questionText": "Asteroit Kuşağı hangi iki gezegenin yörüngeleri arasında yer almaktadır? Yazınız.",
    "solutionExplanation": "Mars ile Jüpiter arasında yer alır.",
    "modelAnswer": "Asteroit Kuşağı, iç gezegenlerin sonuncusu olan 'Mars' ile dış gezegenlerin ilki olan 'Jüpiter' gezegenlerinin yörüngeleri arasında yer alır.",
    "rubric": [("Mars ve Jüpiter gezegenlerinin doğru yazılması", 1.0)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.1.1', 3, 0)] = {
    "contextText": "Uranüs'ün yuvarlanan varil gibi dönmesi.",
    "stimulus": "Uranüs gezegeni diğer gezegenlerden farklı olarak eksen eğikliği yaklaşık 98 derece olan ilginç bir gök cismidir.",
    "questionText": "Uranüs'ün yörüngesindeki bu aşırı yatık dönüş hareketi neye benzetilir ve gezegenin mevsimlerine etkisi nedir?",
    "solutionExplanation": "Yuvarlanan bir varile benzetilir. Kutupları çok uzun süre karanlık veya aydınlık yaşar.",
    "modelAnswer": "Uranüs, yörüngesinde adeta 'yan yatmış, yuvarlanan bir varil gibi' döner. Bu aşırı eğiklik sebebiyle kutupları yaklaşık 42 yıl aralıksız gündüz, 42 yıl aralıksız gece yaşar.",
    "rubric": [("Yuvarlanan varil benzetmesinin yazılması", 0.5), ("Aşırı uzun kutup geceleri ve gündüzleri etkisi", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.1.1', 4, 0)] = {
    "contextText": "Karasal ve gazsal gezegenlerin fiziksel karşılaştırması.",
    "stimulus": "Karasal gezegenlerin katı kayaç yüzeyi varken gazsal gezegenlerin katı bir yüzeyi yoktur.",
    "questionText": "Karasal gezegenler ile gazsal gezegenleri yoğunluk ve büyüklük bakımından 2 maddeyle karşılaştırınız.",
    "solutionExplanation": "Karasal gezegenler daha küçük ama yoğundur; gazsal gezegenler devasa ama yoğunlukları düşüktür.",
    "modelAnswer": "1. Boyut: Gazsal gezegenler (Jüpiter, Satürn vb.) karasal gezegenlerden çok daha devasa hacimlere sahiptir.\n2. Yoğunluk: Karasal gezegenler taş ve metalden oluştukları için yoğunlukları yüksektir; gaz devleri ise gazdan oluştukları için yoğunlukları düşüktür (hatta Satürn suya konsa yüzecek yoğunluktadır).",
    "rubric": [("Boyut karşılaştırmasının doğruluğu", 0.5), ("Yoğunluk karşılaştırmasının doğruluğu", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.1.1', 5, 0)] = {
    "contextText": "Güneş'e en uzak gezegen Neptün.",
    "stimulus": "Güneş sisteminin en dış sınırında yer alan mavi renkli Neptün incelenmektedir.",
    "questionText": "a) Neptün Güneş'e en uzak gezegen olduğuna göre dolanma süresi (yılı) en uzun mudur en kısa mıdır?\nb) Mavi rengini veren atmosferindeki gaz hangisidir?",
    "solutionExplanation": "a En uzundur (~165 Dünya yılı). b Metan gazı.",
    "modelAnswer": "a) Dolanma süresi (yılı) en uzundur (yaklaşık 165 Dünya yılı sürer).\nb) Atmosferindeki metan gazı kırmızı ışığı soğurup mavi ışığı yansıttığı için masmavi görünür.",
    "rubric": [("a şıkkında en uzun dolanma süresi tespiti", 0.5), ("b şıkkında metan gazı tespiti", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.1.1', 5, 1)] = {
    "contextText": "Meteorit ve gök taşı kavramı.",
    "stimulus": "Uzaydan Dünya atmosferine giren kaya parçaları sürtünmeyle ışık saçar, bazıları yere kadar ulaşır.",
    "questionText": "Atmosferde yanarak ışık saçan gök taşı olayına halk arasında ne ad verilir? Yere ulaşabilen taş parçasına ne ad verilir?",
    "solutionExplanation": "Halk arasında yıldız kayması denir. Yere ulaşana meteorit (gök taşı) denir.",
    "modelAnswer": "• Işık Saçma Olayı: Halk arasında 'Yıldız Kayması' (meteor yağmuru) olarak adlandırılır.\n• Yere Ulaşan Taş: 'Meteorit' (veya yeryüzüne düşen gök taşı) adını alır.",
    "rubric": [("Yıldız kayması tespiti", 0.5), ("Meteorit kavramının doğru yazılması", 0.5)]
}

# FB.6.1.3 (Güneş ve Ay Tutulmaları)
G6_DEDICATED[('fen_bilimleri', 'FB.6.1.3', 0, 0)] = {
    "contextText": "Güneş tutulması modeli.",
    "stimulus": "Güneş tutulması sırasında gök cisimleri aynı doğrultuya gelir ve Dünya'nın gündüz olan bir bölgesinde gündüz vakti aniden kararır.",
    "questionText": "Güneş tutulması sırasında Güneş, Dünya ve Ay'ın dizilim sırasını yazınız ve bu tutulmanın Ay'ın hangi evresinde gerçekleştiğini belirtiniz.",
    "solutionExplanation": "Güneş - Ay - Dünya. Yeni Ay evresinde gerçekleşir.",
    "modelAnswer": "• Dizilim Sırası: Güneş — Ay — Dünya (Ay, Güneş ile Dünya arasına girer).\n• Ay'ın Evresi: 'Yeni Ay' evresinde gerçekleşir.",
    "rubric": [("Güneş - Ay - Dünya diziliminin doğru yazılması", 0.5), ("Yeni Ay evresinin belirtilmesi", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.1.3', 1, 0)] = {
    "contextText": "Ay tutulması modeli.",
    "stimulus": "Ay tutulması sırasında gökyüzünde parlayan dolunay Dünya'nın gölgesine girerek bakır kırmızısı bir renge bürünür.",
    "questionText": "Ay tutulmasında gök cisimlerinin dizilim sırasını yazınız ve tutulmanın Ay'ın hangi evresinde meydana geldiğini açıklayınız.",
    "solutionExplanation": "Güneş - Dünya - Ay. Dolunay evresinde gerçekleşir.",
    "modelAnswer": "• Dizilim Sırası: Güneş — Dünya — Ay (Dünya, Güneş ile Ay arasına girer ve gölgesi Ay'ın üzerine düşer).\n• Ay'ın Evresi: 'Dolunay' evresinde gerçekleşir.",
    "rubric": [("Güneş - Dünya - Ay diziliminin yazılması", 0.5), ("Dolunay evresinin doğru belirtilmesi", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.1.3', 1, 1)] = {
    "contextText": "Tutulmaların her ay gerçekleşmeme sebebi.",
    "stimulus": "Ay her ay Yeni Ay ve Dolunay evrelerinden geçtiği halde her ay Güneş ve Ay tutulması yaşanmaz.",
    "questionText": "Her ay düzenli olarak tutulma gerçekleşmemesinin bilimsel nedenini yörünge düzlemleri açısından açıklayınız.",
    "solutionExplanation": "Ay'ın Dünya etrafındaki yörünge düzlemi ile Dünya'nın Güneş etrafındaki yörünge düzlemi arasında yaklaşık 5 derecelik bir açı eğikliği vardır.",
    "modelAnswer": "Ay'ın Dünya etrafındaki dolanma yörüngesi ile Dünya'nın Güneş etrafındaki yörünge düzlemi tam çakışık değildir; aralarında yaklaşık 5 derecelik bir eğiklik (açı farkı) vardır. Bu nedenle her ay bu üç gök cismi tam aynı doğrultuya gelemez.",
    "rubric": [("Yörünge düzlemleri arasındaki 5 derecelik açı eğikliği tespiti", 0.6), ("Her ay tam aynı doğrultuya gelememe gerekçesi", 0.4)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.1.3', 2, 0)] = {
    "contextText": "Güneş ve Ay tutulması karşılaştırması.",
    "stimulus": "Güneş ve Ay tutulmaları doğanın iki etkileyici ışık-gölge olayıdır.",
    "questionText": "Güneş tutulması ile Ay tutulmasını gözlemlenebilen alanın genişliği (dar bir bölge mi, gece olan tüm yarım küre mi) bakımından karşılaştırınız.",
    "solutionExplanation": "Güneş tutulması dar bir şeritte izlenir, Ay tutulması gece olan tüm yarım kürede izlenir.",
    "modelAnswer": "• Güneş Tutulması: Ay'ın gölgesi küçük olduğu için Dünya üzerinde yalnızca belirli ve dar bir koridorda (şeritte) gözlemlenebilir.\n• Ay Tutulması: Dünya'nın gölgesi çok büyük olduğu için Dünya'nın geceyi yaşayan tüm yarım küresinde aynı anda rahatlıkla çıplak gözle izlenebilir.",
    "rubric": [("Güneş tutulmasının dar bir alanda görülmesi tespiti", 0.5), ("Ay tutulmasının gece olan tüm yarım kürede izlenmesi tespiti", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.1.3', 3, 0)] = {
    "contextText": "Göz koruma ve filtreli gözlük kullanımı.",
    "stimulus": "Güneş tutulmasını izlerken kesinlikle doğrudan çıplak gözle bakılmamalı, özel filtreli tutulma gözlükleri kullanılmalıdır.",
    "questionText": "Güneş tutulmasında özel filtreli gözlük zorunluyken, Ay tutulmasını çıplak gözle izlemenin neden hiçbir göz sağlığı riski oluşturmadığını açıklayınız.",
    "solutionExplanation": "Güneş doğrudan güçlü ultraviyole radyasyon yayar ve retinayı yakar. Ay ise sadece yansıtıcıdır, zararlı radyasyon yaymaz.",
    "modelAnswer": "Güneş devasa bir ışık ve ultraviyole (UV) radyasyon kaynağıdır; tutulma sırasında bile yayılan ışınlar göz retinasında kalıcı körlüğe yol açabilir. Oysa Ay bir ışık kaynağı değildir, sadece Dünya'ya gelen zayıf güneş ışığını yansıtır; bu nedenle Ay tutulmasını çıplak gözle izlemek tamamen zararsızdır.",
    "rubric": [("Güneş'in zararlı UV ışınları ve retina hasarı tehlikesi", 0.5), ("Ay'ın zayıf yansıtıcı olması ve çıplak gözle izlenebilme sebebi", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.1.3', 4, 0)] = {
    "contextText": "Tam tutulma ve parçalı tutulma.",
    "stimulus": "Güneş tutulmasında Ay'ın tam gölgesi altında kalan bölgede gündüz Güneş tamamen kaybolur.",
    "questionText": "Tam gölge alanında gerçekleşen tutulma ile yarı gölge alanında gerçekleşen tutulmanın adlarını yazınız.",
    "solutionExplanation": "Tam gölgede Tam Güneş Tutulması, yarı gölgede Parçalı Güneş Tutulması gerçekleşir.",
    "modelAnswer": "• Tam gölge alanında: 'Tam Güneş Tutulması' (Güneş tamamen kararır, sadece taç küre parlar).\n• Yarı gölge alanında: 'Parçalı Güneş Tutulması' (Güneş'in bir kısmı hilal gibi görünür).",
    "rubric": [("Tam tutulma tespiti", 0.5), ("Parçalı tutulma tespiti", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.1.3', 4, 1)] = {
    "contextText": "Işığın doğrusal yayılması ilkesi.",
    "stimulus": "Güneş ve Ay tutulmaları ışığın temel bir fiziksel özelliği sayesinde gerçekleşir.",
    "questionText": "Her iki tutulma olayının da gerçekleşmesi, ışığın hangi temel yayılma özelliğini kesin bir şekilde kanıtlar?",
    "solutionExplanation": "Işığın her yönde ve doğrusal (doğrular boyunca) yayıldığını kanıtlar.",
    "modelAnswer": "Tutulmalar, ışığın saydam olmayan opak cisimlerin arkasına geçemediğini ve 'ışığın her yöne doğrusal bir hat boyunca (doğrular halinde) yayıldığını' kesin olarak kanıtlar.",
    "rubric": [("Işığın doğrusal yayılması ilkesinin yazılması", 0.6), ("Opak cismin gölge oluşturması gerekçesi", 0.4)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.1.3', 5, 0)] = {
    "contextText": "Ay tutulmasında kızıl renk (Kanlı Ay).",
    "stimulus": "Tam Ay tutulması sırasında Ay tamamen kapkaranlık olmak yerine bakır kırmızısı (kanlı ay) bir renk alır.",
    "questionText": "Dünya'nın gölgesinde kalan Ay'ın bu kızıl rengi almasının optik nedenini Dünya'nın atmosferi açısından açıklayınız.",
    "solutionExplanation": "Dünya atmosferinden geçen güneş ışınlarının kırılarak kırmızı dalga boylarının Ay'a yansımasıdır (Rayleigh saçılması).",
    "modelAnswer": "Güneş ışınları Dünya'nın kenarındaki atmosfer tabakasından geçerken mavi ışınlar saçılır; ancak uzun dalga boylu kırmızı ışınlar atmosferde kırılarak bükülür ve Dünya'nın gölgesindeki Ay yüzeyine ulaşır. Bu kırılarak yansıyan kırmızı ışıklar Ay'ı bakır kızılı renkte gösterir.",
    "rubric": [("Dünya atmosferinde güneş ışınlarının kırılması tespiti", 0.5), ("Kırmızı dalga boyunun Ay yüzeyine yansıması gerekçesi", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.1.3', 5, 1)] = {
    "contextText": "Tutulma sürelerinin karşılaştırılması.",
    "stimulus": "Güneş tutulması birkaç dakika sürerken, Ay tutulması saatlerce (1-2 saat) sürebilmektedir.",
    "questionText": "Güneş tutulmasının Ay tutulmasından çok daha kısa sürmesinin temel geometrik sebebini açıklayınız.",
    "solutionExplanation": "Ay'ın gölgesi Dünya yüzeyinde çok küçüktür ve Ay hızla geçer; Dünya'nın gölgesi ise devasadır.",
    "modelAnswer": "Ay'ın Dünya üzerine düşen gölge konisi küçüktür ve Ay'ın yörüngesindeki hızlı hareketi sebebiyle bu gölge Dünya üzerinden birkaç dakika içinde kayıp geçer. Oysa Dünya'nın uzaya vuran gölgesi çok geniş olduğu için Ay bu koca gölge alanından ancak saatler içinde çıkabilir.",
    "rubric": [("Ay'ın gölgesinin küçük ve hızlı geçmesi gerekçesi", 0.5), ("Dünya'nın gölgesinin çok geniş olması sebebiyle uzun sürmesi gerekçesi", 0.5)]
}

# FB.6.2.1 (Bileşke Kuvvet - Net Kuvvet)
G6_DEDICATED[('fen_bilimleri', 'FB.6.2.1', 0, 0)] = {
    "contextText": "Zıt yönlü kuvvetlerin bileşkesi.",
    "stimulus": "Bir cisme aynı doğrultuda Doğu yönünde $F_1 = 25$ N ve Batı yönünde $F_2 = 15$ N büyüklüğünde iki kuvvet uygulanmaktadır.",
    "questionText": "Cisme etki eden bileşke kuvvetin (net kuvvetin) büyüklüğünü ve yönünü işlem yaparak bulunuz.",
    "solutionExplanation": "Zıt yönlü olduğu için çıkarılır: 25 - 15 = 10 N Doğu yönünde.",
    "modelAnswer": "İşlem:\nKuvvetler zıt yönlü olduğu için birbirinden çıkarılır.\n$F_{net} = F_1 - F_2 = 25 - 15 = 10$ N\nYön: Büyük kuvvetin yönü olan 'Doğu' yönündedir.\nBileşke Kuvvet: Doğu yönünde 10 N.",
    "rubric": [("25 - 15 = 10 N büyüklük hesabı", 0.5), ("Doğu yönünün doğru belirlenmesi", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.2.1', 0, 1)] = {
    "contextText": "Aynı yönlü kuvvetlerin bileşkesi.",
    "stimulus": "Bir sandığı iki arkadaş aynı doğrultuda ve aynı yönde (Kuzey yönünde) itmektedir. Ali 18 N, Veli 22 N kuvvet uygulamaktadır.",
    "questionText": "Sandığa uygulanan toplam bileşke kuvvetin büyüklüğünü ve yönünü hesaplayınız.",
    "solutionExplanation": "Aynı yönlü olduğu için toplanır: 18 + 22 = 40 N Kuzey yönünde.",
    "modelAnswer": "İşlem:\nKuvvetler aynı yönlü olduğu için toplanır.\n$F_{net} = 18 + 22 = 40$ N\nYön: 'Kuzey' yönündedir.\nBileşke Kuvvet: Kuzey yönünde 40 N.",
    "rubric": [("18 + 22 = 40 N toplama işlemi", 0.5), ("Kuzey yönünün doğru tespiti", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.2.1', 1, 0)] = {
    "contextText": "Halat çekme oyununda bileşke kuvvet.",
    "stimulus": "Halat çekme oyununda A takımı batı yönünde 140 N, B takımı doğu yönünde 160 N kuvvet uygulamaktadır.",
    "questionText": "Halata etki eden net kuvvet kaç N'dur ve halat hangi takımın tarafına (hangi yöne) doğru hareket eder?",
    "solutionExplanation": "160 - 140 = 20 N doğu yönünde, B takımına doğru.",
    "modelAnswer": "İşlem: $160 - 140 = 20$ N\nYön: Doğu yönünde (B takımına doğru)\nHalat 20 N net kuvvetle B takımının tarafına (doğuya) doğru hareket eder.",
    "rubric": [("20 N net kuvvet büyüklüğünün bulunması", 0.5), ("Doğu yönü ve B takımı hareketinin tespiti", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.2.1', 2, 0)] = {
    "contextText": "Üç kuvvetin bileşkesi.",
    "stimulus": "Bir kutuya doğu yönünde $F_1 = 12$ N ve $F_2 = 8$ N, batı yönünde ise $F_3 = 15$ N kuvvet etki etmektedir.",
    "questionText": "Bu üç kuvvetin bileşkesini (net kuvveti) ve yönünü bulunuz.",
    "solutionExplanation": "Doğu toplamı = 12 + 8 = 20 N. Batı = 15 N. Net = 20 - 15 = 5 N Doğu yönünde.",
    "modelAnswer": "İşlem:\nDoğu yönündeki kuvvetler toplamı = 12 N + 8 N = 20 N (Doğu)\nBatı yönündeki kuvvet = 15 N (Batı)\nNet Kuvvet = 20 N - 15 N = 5 N (Doğu yönünde).",
    "rubric": [("Doğu toplamı 20 N hesabı", 0.4), ("Çıkarma ile 5 N Doğu bileşkesinin bulunması", 0.6)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.2.1', 2, 1)] = {
    "contextText": "Kuvvetin 4 temel özelliği.",
    "stimulus": "Kuvvet vektörel bir büyüklüktür ve ok işareti ile gösterilir.",
    "questionText": "Bir kuvveti tam olarak tanımlayabilmek için gereken 4 temel özelliği yazınız (Örn: Büyüklüğü vb.).",
    "solutionExplanation": "Uygulama noktası, doğrultusu, yönü, büyüklüğü (şiddeti).",
    "modelAnswer": "Bir Kuvvetin 4 Temel Özelliği:\n1. Uygulama Noktası (Başlangıç noktası)\n2. Doğrultusu (Örn: Doğu-Batı doğrultusu)\n3. Yönü (Örn: Doğu yönü)\n4. Büyüklüğü / Şiddeti (Newton cinsinden değeri)",
    "rubric": [("Uygulama noktası ve doğrultu özelliklerinin yazılması", 0.5), ("Yön ve büyüklük özelliklerinin yazılması", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.2.1', 3, 0)] = {
    "contextText": "Doğrultu ile yön arasındaki fark.",
    "stimulus": "Öğrenci Ali 'Doğu ile Doğu-Batı aynı şeydir' demektedir.",
    "questionText": "Fizikte 'doğrultu' ile 'yön' kavramları arasındaki farkı bir örnekle açıklayınız.",
    "solutionExplanation": "Doğrultu iki ucu olan bir çizgidir (Doğu-Batı). Yön ise o çizgi üzerindeki tek bir ok işaretidir (Doğu veya Batı).",
    "modelAnswer": "• Doğrultu: İki zıt yönü kapsayan geometrik bir çizgidir (Örneğin: Doğu-Batı doğrultusu).\n• Yön: O doğrultu üzerinde cismin hareket ettiği tek bir taraftır (Örneğin: Sadece Doğu veya sadece Batı). Bir doğrultuda iki zıt yön bulunur.",
    "rubric": [("Doğrultu tanımı ve iki zıt yönü kapsama özelliği", 0.5), ("Yön tanımı ve tek taraflı ok işareti farkı", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.2.1', 4, 0)] = {
    "contextText": "Kuvvetlerin ölçekli çizimi.",
    "stimulus": "Kareli düzlemde her 1 birim kare 5 N kuvveti temsil etmektedir. Sağa doğru 4 birimlik bir kuvvet oku çizilmiştir.",
    "questionText": "Bu kuvvetin büyüklüğünü ve yönünü hesaplayınız.",
    "solutionExplanation": "4 birim x 5 N = 20 N, Doğu (sağ) yönünde.",
    "modelAnswer": "Büyüklük: 4 birim x 5 N = 20 N\nYön: Sağa doğru (Doğu yönünde) 20 N'dur.",
    "rubric": [("20 N büyüklük hesabı", 0.5), ("Doğu/sağ yönünün tespiti", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.2.1', 4, 1)] = {
    "contextText": "Bileşke kuvvetin sıfır olması durumu.",
    "stimulus": "Bir cisme doğu yönünde 30 N kuvvet uygulanırken cismin hareketsiz kalması istenmektedir.",
    "questionText": "Cismin hareket etmemesi için uygulanması gereken dengeleyici kuvvetin büyüklüğü ve yönü ne olmalıdır?",
    "solutionExplanation": "Batı yönünde 30 N kuvvet uygulanmalıdır.",
    "modelAnswer": "Cismin durması (bileşkenin sıfır olması) için zıt yönde, yani 'Batı yönünde tam 30 N' büyüklüğünde bir kuvvet uygulanmalıdır.",
    "rubric": [("Batı yönünün tespiti", 0.5), ("30 N eşit büyüklük tespiti", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.2.1', 5, 0)] = {
    "contextText": "Sürtünme kuvveti ve net kuvvet.",
    "stimulus": "Yatay bir yolda bir sandık 50 N kuvvetle çekilmektedir. Yüzey ile sandık arasında harekete zıt yönde 15 N sürtünme kuvveti oluşmaktadır.",
    "questionText": "Sandığa etki eden net kuvvet kaç N'dur? Sürtünme kuvvetinin yönünü belirtiniz.",
    "solutionExplanation": "Sürtünme harekete zıttır: 50 - 15 = 35 N hareket yönünde.",
    "modelAnswer": "• Net Kuvvet: 50 N - 15 N = 35 N (çekme yönünde).\n• Sürtünme Kuvvetinin Yönü: Çekme yönüne (hareket yönüne) zıt yöndedir.",
    "rubric": [("35 N net kuvvet hesabı", 0.5), ("Sürtünmenin zıt yönde olduğunun belirtilmesi", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.2.1', 5, 1)] = {
    "contextText": "En büyük ve en küçük bileşke kuvvet.",
    "stimulus": "Aynı doğrultudaki $F_1 = 8$ N ve $F_2 = 6$ N kuvvetleri bir cisme uygulanacaktır.",
    "questionText": "Bu iki kuvvetle elde edilebilecek en büyük bileşke kuvvet ile en küçük bileşke kuvvet değerlerini hesaplayınız.",
    "solutionExplanation": "En büyük aynı yönlü (8+6=14 N), en küçük zıt yönlü (8-6=2 N).",
    "modelAnswer": "• En Büyük Bileşke (Aynı yönlü uygulanırsa): 8 N + 6 N = 14 N\n• En Küçük Bileşke (Zıt yönlü uygulanırsa): 8 N - 6 N = 2 N",
    "rubric": [("En büyük 14 N hesabı", 0.5), ("En küçük 2 N hesabı", 0.5)]
}

# FB.6.2.2 (Dengelenmiş ve Dengelenmemiş Kuvvetler)
G6_DEDICATED[('fen_bilimleri', 'FB.6.2.2', 0, 0)] = {
    "contextText": "Dengelenmiş kuvvetler altında cismin durumu.",
    "stimulus": "Bir cisme etki eden net kuvvet (bileşke kuvvet) sıfır ise ($F_{net} = 0$) cisim dengelenmiş kuvvetlerin etkisindedir.",
    "questionText": "Dengelenmiş kuvvetlerin etkisindeki bir cismin sergileyebileceği 2 farklı hareket durumunu yazınız.",
    "solutionExplanation": "1. Duruyorsa durmaya devam eder. 2. Hareket halindeyse sabit süratle doğrusal hareketine devam eder.",
    "modelAnswer": "1. Durum: Cisim başlangıçta duruyorsa hareketsiz kalmaya (durmaya) devam eder (Örn: Masada duran kitap).\n2. Durum: Cisim hareket halindeyse hızını artırıp azaltmadan 'sabit süratle doğrusal yoluna' devam eder (Örn: Düz yolda sabit 90 km/h hızla giden araba).",
    "rubric": [("Durmaya devam etme durumunun yazılması", 0.5), ("Sabit süratle hareket durumunun yazılması", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.2.2', 3, 0)] = {
    "contextText": "Dengelenmemiş kuvvetler ve hız değişimi.",
    "stimulus": "Kırmızı ışıkta duran bir otomobil yeşil ışık yandığında gaza basarak hızlanmaya başlamıştır.",
    "questionText": "Hızlanan bu otomobil dengelenmiş mi yoksa dengelenmemiş kuvvetlerin mi etkisindedir? Gerekçesini açıklayınız.",
    "solutionExplanation": "Dengelenmemiş kuvvetlerin etkisindedir. Net kuvvet sıfırdan farklı olduğu için sürati değişmektedir.",
    "modelAnswer": "Otomobil 'Dengelenmemiş Kuvvetler'in etkisindedir. Çünkü aracın sürati sabit kalmamış, gaza basılmasıyla hareket yönünde sıfırdan farklı bir net kuvvet oluşmuş ve araç hızlanan hareket yapmıştır.",
    "rubric": [("Dengelenmemiş kuvvetler tespiti", 0.5), ("Sürat değişimi (hızlanma) gerekçesinin açıklanması", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.2.2', 4, 0)] = {
    "contextText": "Günlük hayat örneklerini sınıflandırma.",
    "stimulus": "Durum 1: Duvarda asılı duran saat\nDurum 2: Frenine basılan ve yavaşlayan bisiklet\nDurum 3: Gökyüzünde paraşütle sabit süratle süzülen sporcu",
    "questionText": "Verilen durumları 'Dengelenmiş Kuvvetler' ve 'Dengelenmemiş Kuvvetler' olarak sınıflandırınız.",
    "solutionExplanation": "Durum 1 ve 3 dengelenmiş; Durum 2 dengelenmemiş kuvvettir.",
    "modelAnswer": "• Dengelenmiş Kuvvetler: Durum 1 (Duvarda asılı duran saat) ve Durum 3 (Sabit süratle süzülen paraşütçü).\n• Dengelenmemiş Kuvvetler: Durum 2 (Yavaşlayan bisiklet - net kuvvet harekete zıttır).",
    "rubric": [("Durum 1 ve 3'ün dengelenmiş olarak seçilmesi", 0.5), ("Durum 2'nin dengelenmemiş olarak seçilmesi", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.2.2', 4, 1)] = {
    "contextText": "Daldan düşen elma.",
    "stimulus": "Ağacın dalından kopan bir elma yere doğru düşerken giderek hızlanır.",
    "questionText": "Düşen elmanın hızlanmasına neden olan dengelenmemiş kuvvet hangisidir? Açıklayınız.",
    "solutionExplanation": "Yerçekimi kuvvetidir. Hava direncinden büyük olduğu için net kuvvet aşağı doğrudur.",
    "modelAnswer": "Elmanın hızlanmasına sebep olan kuvvet Dünya'nın uyguladığı 'Yerçekimi Kuvveti'dir. Yerçekimi havanın sürtünme direncinden daha büyük olduğu için aşağı yönlü bir net kuvvet oluşur ve elma dengelenmemiş kuvvetle hızlanarak düşer.",
    "rubric": [("Yerçekimi kuvvetinin tespiti", 0.5), ("Aşağı yönlü net kuvvet sebebiyle hızlanma gerekçesi", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.2.2', 5, 0)] = {
    "contextText": "Bileşke kuvvetin sıfır olmasının sonuçları.",
    "stimulus": "Doğuya doğru 40 N ve batıya doğru 40 N kuvvet etki eden sürtünmesiz bir masa incelenmektedir.",
    "questionText": "Bu masaya etki eden net kuvvet kaç N'dur? Masa başlangıçta duruyorsa hareketi nasıl olur?",
    "solutionExplanation": "Net kuvvet 40 - 40 = 0 N'dur. Cisim durmaya devam eder.",
    "modelAnswer": "• Net Kuvvet: 40 N - 40 N = 0 N'dur (Dengelenmiş kuvvetler).\n• Hareketi: Masa başlangıçta durduğu için hareketsiz kalmaya (durmaya) devam eder.",
    "rubric": [("Net kuvvetin 0 N olarak hesaplanması", 0.5), ("Durmaya devam edeceği sonucunun yazılması", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.2.2', 5, 1)] = {
    "contextText": "Virajı dönen araba.",
    "stimulus": "Bir otomobil hız göstergesi 60 km/h değerini sabit tutarak dairesel bir virajı dönmektedir.",
    "questionText": "Sürati 60 km/h sabit kalsa bile yönü değiştiği için bu araç dengelenmiş kuvvetlerin etkisinde midir? Açıklayınız.",
    "solutionExplanation": "Dengelenmemiş kuvvetlerin etkisindedir, çünkü hareket yönü değişmektedir.",
    "modelAnswer": "Hayır, 'Dengelenmemiş Kuvvetler'in etkisindedir. Çünkü dengelenmiş kuvvetlerde cismin hem sürati hem de hareket doğrultusu sabit kalmalıdır. Viraj dönen aracın yönü sürekli değiştiği için üzerine etki eden bir net merkezcil kuvvet vardır.",
    "rubric": [("Dengelenmemiş kuvvetler cevabı", 0.5), ("Yönün değişmesi sebebiyle net kuvvet oluştuğu gerekçesi", 0.5)]
}

# FB.6.2.3 (Sürat ve Sürat Hesabı)
G6_DEDICATED[('fen_bilimleri', 'FB.6.2.3', 0, 0)] = {
    "contextText": "Sürat formülü ve birimi.",
    "stimulus": "Bir hareketlinin birim zamanda aldığı yola 'sürat' denir.",
    "questionText": "a) Süratin hesaplama formülünü (yol ve zaman ilişkisini) yazınız.\nb) Bilimde en yaygın kullanılan iki sürat birimini belirtiniz.",
    "solutionExplanation": "Sürat = Alınan Yol / Geçen Zaman. Birimleri m/s ve km/h.",
    "modelAnswer": "a) Sürat Formülü: $Sürat = \\frac{Alınan\\ Yol}{Geçen\\ Zaman}$ ($v = \\frac{x}{t}$)\nb) Sürat Birimleri: metre/saniye (m/s) ve kilometre/saat (km/h).",
    "rubric": [("a şıkkında Sürat = Yol / Zaman formülü", 0.5), ("b şıkkında m/s ve km/h birimlerinin yazılması", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.2.3', 1, 0)] = {
    "contextText": "Koşucunun sürat hesabı.",
    "stimulus": "Bir atletizm yarışında Kerem 200 metrelik pisti 25 saniyede koşmuştur.",
    "questionText": "Kerem'in süratini formülünü göstererek m/s (metre/saniye) cinsinden hesaplayınız.",
    "solutionExplanation": "Sürat = 200 / 25 = 8 m/s.",
    "modelAnswer": "İşlem:\n$Sürat = \\frac{Alınan\\ Yol}{Geçen\\ Zaman} = \\frac{200\\text{ m}}{25\\text{ s}} = 8\\text{ m/s}$\nKerem'in sürati 8 m/s'dir.",
    "rubric": [("Formül ve sayısal yerleştirmenin doğruluğu", 0.5), ("8 m/s sonucunun birimiyle bulunması", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.2.3', 1, 1)] = {
    "contextText": "Otobüsün km/h sürat hesabı.",
    "stimulus": "Ankara'dan İstanbul'a giden bir yolcu otobüsü 450 kilometrelik yolu mola vermeden 5 saatte tamamlamıştır.",
    "questionText": "Otobüsün ortalama süratini km/h (kilometre/saat) cinsinden bulunuz.",
    "solutionExplanation": "Sürat = 450 / 5 = 90 km/h.",
    "modelAnswer": "İşlem:\n$Sürat = \\frac{Yol}{Zaman} = \\frac{450\\text{ km}}{5\\text{ h}} = 90\\text{ km/h}$\nOtobüsün sürati 90 km/h'dir.",
    "rubric": [("450 / 5 işleminin gösterilmesi", 0.5), ("90 km/h sonucunun doğru yazılması", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.2.3', 2, 0)] = {
    "contextText": "Yol-Zaman tablosundan sürat bulma.",
    "stimulus": "Bir bisikletlinin hareket tablosu:\nZaman (s): 1, 2, 3, 4\nYol (m): 6, 12, 18, 24",
    "questionText": "Tabloya göre bisikletlinin 'sabit süratli' hareket yapıp yapmadığını ve süratinin kaç m/s olduğunu açıklayınız.",
    "solutionExplanation": "Her saniyede 6 metre yol almıştır. 6 / 1 = 12 / 2 = 6 m/s sabit süratli harekettir.",
    "modelAnswer": "Bisikletli 'sabit süratli hareket' yapmaktadır. Çünkü her saniyede eşit miktarda (6 metre) yol almaktadır.\n$Sürat = \\frac{6}{1} = \\frac{12}{2} = \\frac{24}{4} = 6\\text{ m/s}$'dir.",
    "rubric": [("Sabit süratli hareket tespiti ve eşit yol gerekçesi", 0.5), ("6 m/s sürat değerinin hesaplanması", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.2.3', 2, 1)] = {
    "contextText": "Aynı yolu farklı sürelerde alma.",
    "stimulus": "Aynı 100 metrelik mesafeyi Ali 10 saniyede, Can ise 20 saniyede koşmuştur.",
    "questionText": "Ali ile Can'ın süratlerini hesaplayarak hangisinin daha süratli olduğunu bulunuz.",
    "solutionExplanation": "Ali: 100/10 = 10 m/s. Can: 100/20 = 5 m/s. Ali daha süratlidir.",
    "modelAnswer": "• Ali'nin Sürati: $100 / 10 = 10$ m/s\n• Can'ın Sürati: $100 / 20 = 5$ m/s\nAli'nin sürati daha büyüktür (Ali Can'dan 2 kat daha süratlidir).",
    "rubric": [("Ali (10 m/s) ve Can (5 m/s) sürat hesapları", 0.5), ("Ali'nin daha süratli olduğunun belirlenmesi", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.2.3', 3, 0)] = {
    "contextText": "Sürat ve zaman verilip yol bulma.",
    "stimulus": "Sabit 20 m/s süratle koşan bir çita avının peşinden 8 saniye boyunca koşmuştur.",
    "questionText": "Çitanın bu sürede aldığı toplam yolu formül yardımıyla hesaplayınız.",
    "solutionExplanation": "Yol = Sürat x Zaman = 20 x 8 = 160 metre.",
    "modelAnswer": "İşlem:\n$Alınan\\ Yol = Sürat \\times Zaman$\n$Yol = 20\\text{ m/s} \\times 8\\text{ s} = 160\\text{ metre}$ yol almıştır.",
    "rubric": [("Yol = Sürat x Zaman formül bağıntısı", 0.5), ("160 metre sonucunun bulunması", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.2.3', 3, 1)] = {
    "contextText": "Sürat-Zaman grafiği analizi.",
    "stimulus": "Bir aracın sürat-zaman grafiğinde zaman ekseni ilerlerken sürat çizgisi 15 m/s değerinde düz yatay bir çizgi olarak çizilmiştir.",
    "questionText": "Grafikteki yatay çizginin aracın hareketi hakkında ne ifade ettiğini yazınız ve aracın 10 saniyede aldığı yolu bulunuz.",
    "solutionExplanation": "Sabit süratli harekettir. Yol = 15 x 10 = 150 m.",
    "modelAnswer": "• Anlamı: Yatay çizgi, zaman geçse bile aracın süratinin hiç değişmediğini ve 'sabit süratle' gittiğini gösterir.\n• Alınan Yol: Grafik altındaki alan = $15 \\times 10 = 150$ metredir.",
    "rubric": [("Sabit süratli hareket anlamının yazılması", 0.5), ("150 metre yol hesabının gösterilmesi", 0.5)]
}

# FB.6.3.1 (Eşeyli ve Eşeysiz Üreme)
G6_DEDICATED[('fen_bilimleri', 'FB.6.3.1', 0, 0)] = {
    "contextText": "Eşeyli ve eşeysiz üreme temel farkı.",
    "stimulus": "Canlılarda soyun devamını sağlayan üreme faaliyeti eşeyli ve eşeysiz olmak üzere iki şekilde gerçekleşir.",
    "questionText": "Eşeyli üreme ile eşeysiz üremeyi üreme hücreleri (gametler) ve genetik çeşitlilik bakımından 2 maddeyle karşılaştırınız.",
    "solutionExplanation": "Eşeyli üremede dişi ve erkek hücre döllenir, genetik çeşitlilik oluşur. Eşeysiz üremede tek ata vardır, yavru ata ile tıpatıp aynıdır.",
    "modelAnswer": "1. Üreme Hücresi ve Döllenme: Eşeyli üremede sperm ve yumurta gibi iki farklı cinsiyet hücresinin döllenmesi şarttır; eşeysiz üremede ise döllenme ve eşey hücreleri yoktur, tek bir ata canlıdan çoğalma olur.\n2. Genetik Çeşitlilik: Eşeyli üremede yavru anne ve babanın genlerinin karışımıyla genetik çeşitlilik kazanır; eşeysiz üremede oluşan yavrular ata canlının genetik kopyasıdır (çeşitlilik yoktur).",
    "rubric": [("Döllenme ve tek ata / çift ata farkının yazılması", 0.5), ("Genetik çeşitlilik (varyasyon) farkının açıklanması", 0.5)]
}
G6_DEDICATED[('fen_bilimleri', 'FB.6.3.1', 1, 0)] = {
    "contextText": "Eşeysiz üreme çeşitleri: Vejetatif, tomurcuklanma, rejenerasyon.",
    "stimulus": "Örnekler:\n1. Patatesin gözlerinden yeni patates bitkisinin çıkması\n2. Bira mayası ve hidranın gövdesinde çıkıntı oluşarak yavrunun ayrılması\n3. Denizyıldızının kopan kolundan yeni bir denizyıldızı oluşması",
    "questionText": "Numaralandırılmış eşeysiz üreme çeşitlerinin adlarını (tomurcuklanma, vejetatif, rejenerasyonla üreme) sırasıyla yazınız.",
    "solutionExplanation": "1 Vejetatif üreme, 2 Tomurcuklanma ile üreme, 3 Rejenerasyonla (yenilenmeyle) üreme.",
    "modelAnswer": "1: Vejetatif Üreme (Bitkilerde dal, yumru veya yapraktan çoğalma)\n2: Tomurcuklanma ile Üreme (Gövdede tomurcuk çıkıntısıyla çoğalma)\n3: Rejenerasyonla (Yenilenme ile) Üreme",
    "rubric": [("Vejetatif üreme tespiti", 0.35), ("Tomurcuklanma ile üreme tespiti", 0.35), ("Rejenerasyonla üreme tespiti", 0.3)]
}

print("Grade 6 Fen Bilimleri dedicated questions registered!")

# =====================================================================
# GRADE 6 SOSYAL BİLGİLER DEDICATED (5 Scenarios)
# Outcomes: SB.6.1.1, SB.6.1.2, SB.6.1.3, EVİMİZ
# =====================================================================

# SB.6.1.1 (Zaman içinde değişen rollerimiz)
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.1', 0, 0)] = {
    "contextText": "Büyüdükçe değişen roller ve sorumluluklar.",
    "stimulus": "Bebekken sadece ilgiye muhtaç olan bir birey, 6. sınıfa geldiğinde okulda öğrenci, evde kardeşine bakan bir abla veya ağabey olur; yetişkinlikte ise anne-baba ve meslek sahibi bir çalışan olur.",
    "questionText": "Zaman içinde insanın rollerinin değişmesinin arkasındaki 2 temel nedeni (yaş, eğitim, sosyal çevre) yazınız.",
    "solutionExplanation": "Yaş aldıkça, eğitim seviyesi arttıkça ve yeni sosyal çevrelere girdikçe yeni roller kazanırız.",
    "modelAnswer": "1. Yaşın İlerlemesi ve Büyüme: Birey büyüdükçe zihinsel ve fiziksel olgunluğa ulaşır; bebeklikten öğrenciliğe, oradan da meslek sahipliğine geçer.\n2. Sosyal Çevrenin ve Eğitimin Genişlemesi: Yeni gruplara (okul, spor kulübü, iş hayatı) dahil oldukça toplumsal ilişkiler zenginleşir ve yeni roller üstlenilir.",
    "rubric": [("Büyüme ve olgunlaşma sebebi", 0.5), ("Eğitim ve sosyal çevrenin genişlemesi sebebi", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.1', 0, 1)] = {
    "contextText": "Rol çatışması ve rol uyumu.",
    "stimulus": "Aynı zamanda okul basketbol takımının kaptanı ve 6-C sınıfının öğrencisi olan Kerem, maç günü yaklaştığında antrenmanlar ile sınavlara hazırlanma arasında kalmıştır.",
    "questionText": "Kerem'in yaşadığı bu durumu tanımlayarak, her iki rolünü de aksatmadan başarıyla yönetebilmesi için 1 çözüm önerisi yazınız.",
    "solutionExplanation": "Rol çatışmasıdır. Planlı ve zamanı iyi yöneten bir program yapmalıdır.",
    "modelAnswer": "• Tanım: Üstlenilen farklı rollerin gereklerinin ve zamanlarının birbiriyle çakışmasına 'Rol Çatışması' denir.\n• Çözüm: Kerem günlük ve haftalık bir 'zaman yönetimi planı' hazırlamalı; antrenman saatleri ile ders çalışma saatlerini önceden belirleyerek disiplinli bir program uygulamalıdır.",
    "rubric": [("Rol çatışması kavramının tespiti", 0.5), ("Zaman yönetimi ve planlama çözümünün yazılması", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.1', 1, 0)] = {
    "contextText": "Doğuştan kazanılan ve sonradan kazanılan roller.",
    "stimulus": "Roller: Evlat olmak, doktor olmak, kardeş olmak, sınıf başkanı olmak.",
    "questionText": "Verilen rolleri sınıflandırınız:\n• Doğuştan Kazanılan Roller (2): .................................\n• Sonradan Emekle Kazanılan Roller (2): .................................",
    "solutionExplanation": "Doğuştan: evlat, kardeş. Sonradan: doktor, sınıf başkanı.",
    "modelAnswer": "• Doğuştan Kazanılan Roller: Evlat olmak, Kardeş olmak (kişinin kendi seçimine bağlı olmayan roller).\n• Sonradan Kazanılan Roller: Doktor olmak, Sınıf başkanı olmak (kişinin çabası, eğitimi ve tercihiyle elde ettiği roller).",
    "rubric": [("Doğuştan kazanılan iki rolün doğru tespiti", 0.5), ("Sonradan kazanılan iki rolün doğru tespiti", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.1', 1, 1)] = {
    "contextText": "Hak, sorumluluk ve rol ilişkisi.",
    "stimulus": "Kütüphanecilik kulübü başkanı olan bir öğrenci 'Kulüp odasının anahtarı bende ama kitapları düzenlemek benim görevim değildir' demektedir.",
    "questionText": "Bu öğrencinin yaklaşımındaki sorumluluk hatasını açıklayınız. Başkanlık yetkisini kullanan birinin hangi sorumluluğu üstlenmesi gerekir?",
    "solutionExplanation": "Yetki ve hak sorumlulukla birlikte yürür. Başkanlık anahtar taşımak değil, kütüphanenin düzenini sağlamaktır.",
    "modelAnswer": "Yetki ve haklar sorumluluktan ayrı düşünülemez. Başkanlık rolü sadece ayrıcalık ve anahtar taşımak demek değildir; o kulübün düzenini, kitapların kaydını ve kütüphanenin temizliğini sağlama 'sorumluluğunu' da zorunlu kılar. Sorumluluktan kaçmak rolün kötüye kullanılmasıdır.",
    "rubric": [("Yetki ile sorumluluk arasındaki bağın açıklanması", 0.5), ("Kütüphane düzenini sağlama sorumluluğu gerekçesi", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.1', 2, 0)] = {
    "contextText": "Bireyin meslek seçimindeki rolü.",
    "stimulus": "Bir ortaokul öğrencisi ileride hangi mesleği seçeceğine karar verirken kendi ilgi, yetenek ve değerlerini keşfetmeye çalışmaktadır.",
    "questionText": "Gelecekteki mesleki rolümüzü seçerken dikkat etmemiz gereken en önemli 2 kişisel kriteri yazınız.",
    "solutionExplanation": "Kişisel ilgi ve yetenekler, mesleğin gerektirdiği kişilik özellikleri.",
    "modelAnswer": "1. Kendi yeteneklerimizi ve ilgi alanlarımızı doğru tanımak (Örneğin el becerisi, fen sevgisi veya iletişim gücü).\n2. Mesleğin çalışma şartlarının kendi kişilik yapımıza ve beklentilerimize uygun olup olmadığını değerlendirmek.",
    "rubric": [("İlgi ve yetenek kriterinin yazılması", 0.5), ("Kişilik yapısı ve çalışma şartları uyumu kriteri", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.1', 2, 1)] = {
    "contextText": "Kazanılmış rollerin topluma hizmet boyutu.",
    "stimulus": "Öğretmenlik, hekimlik, zabıtalık veya itfaiyecilik gibi meslek rolleri doğrudan toplumun huzuruna ve can güvenliğine hizmet eder.",
    "questionText": "Mesleki rollerin toplum düzeninin korunmasındaki ve kamu hizmetlerinin aksamadan yürümesindeki önemini 1 cümleyle açıklayınız.",
    "solutionExplanation": "Herkes mesleki rolünü hakkıyla yaparsa toplumsal düzen ve huzur sağlanır.",
    "modelAnswer": "Her meslek sahibi kendi rolünün gerektirdiği etik kurallara ve dürüstlüğe bağlı kalarak işini en iyi şekilde yaptığında, toplumda güven ortamı tesis edilir ve ortak yaşam aksamadan mükemmel bir düzen içinde yürür.",
    "rubric": [("Mesleki etik ve dürüstlük vurgusu", 0.5), ("Toplumsal güven ve düzenin sağlanması gerekçesi", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.1', 3, 0)] = {
    "contextText": "Rollerin değişmeyen ahlaki temeli.",
    "stimulus": "İnsan çocuk, öğrenci, esnaf, anne, dede veya yönetici olabilir; rolleri hayat boyu değişir.",
    "questionText": "Rollerimiz ne kadar değişirse değişsin her rolde korumamız gereken 2 evrensel erdemi (dürüstlük, adalet vb.) yazınız.",
    "solutionExplanation": "Dürüstlük, adalet, güvenilirlik ve saygı.",
    "modelAnswer": "1. Dürüstlük ve Doğruluk (Öğrenciyken de esnafken de yalan ve hileden uzak kalmak).\n2. Adalet ve İnsan Haklarına Saygı (Hangi makama gelinirse gelinsin insanlara eşit ve adil davranmak).",
    "rubric": [("Dürüstlük erdeminin yazılması", 0.5), ("Adalet ve haklara saygı erdeminin yazılması", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.1', 4, 0)] = {
    "contextText": "Kuşaklar arası rollerin aktarımı.",
    "stimulus": "Dedeler ve nineler torunlarına masallar anlatır, gelenekleri ve ahlaki öğütleri aktarır.",
    "questionText": "Ailedeki büyükanne ve büyükbaba rolünün kültürel değerlerin yeni nesillere aktarılmasındaki rolünü açıklayınız.",
    "solutionExplanation": "Yaşayan kültür taşıyıcılarıdır, geçmiş ile gelecek arasında köprü kurarlar.",
    "modelAnswer": "Büyükanne ve büyükbabalar yaşayan birer kültür hazinesidir. Anlattıkları yaşanmış hikayeler, masallar ve verdikleri nasihatlerle aile terbiyesini, millî ve manevi gelenekleri çocuklara sevdirerek kültürün kuşaktan kuşağa kesintisiz aktarılmasını sağlarlar.",
    "rubric": [("Kültür hazinesi ve köprü olma tespiti", 0.5), ("Geleneklerin ve terbiyenin aktarılması gerekçesi", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.1', 4, 1)] = {
    "contextText": "Demokratik okul ortamında öğrenci rolleri.",
    "stimulus": "Okullarda kulüp temsilcileri, okul öğrenci meclisleri ve sınıf başkanlıkları seçimle belirlenir.",
    "questionText": "Okulda seçimle bir göreve talip olmanın ve oy kullanmanın öğrencilere kazandırdığı yurttaşlık bilincini açıklayınız.",
    "solutionExplanation": "Demokrasiyi, seçme ve seçilme hakkını, oyuna sahip çıkmayı ve sorumluluk almayı öğretir.",
    "modelAnswer": "Öğrencilere seçme ve seçilme hakkını küçük yaşta deneyimleterek demokratik olgunluk kazandırır. Oy vermenin bir yurttaşlık sorumluluğu olduğunu, seçilen temsilcileri denetlemeyi ve ortak kararlara saygı duymayı öğretir.",
    "rubric": [("Seçme ve seçilme hakkı deneyimi tespiti", 0.5), ("Yurttaşlık sorumluluğu ve ortak karara saygı gerekçesi", 0.5)]
}

# SB.6.1.2 (Kültürel bağlarımız ve millî değerlerimiz)
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.2', 0, 0)] = {
    "contextText": "İstiklal Marşı ve bayrak sevgisi.",
    "stimulus": "Her pazartesi sabahı ve cuma akşamı okullarda milyonlarca öğrenci ve öğretmen hazır ol duruşuna geçerek İstiklal Marşı'mızı coşkuyla söyler.",
    "questionText": "Bayrağımızın ve İstiklal Marşı'mızın milletimiz için taşıdığı bağımsızlık sembolü anlamını 2 cümleyle açıklayınız.",
    "solutionExplanation": "Bağımsızlığımızın, şehitlerimizin ve millet olarak ortak varlığımızın kutsal simgesidir.",
    "modelAnswer": "Bayrağımız ve İstiklal Marşı'mız, Türk milletinin hiçbir zaman esaret altında yaşamadığının ve şehitlerimizin kanıyla kazanılan vatanımızın kutsal bağımsızlık mührüdür. Onlara saygı göstermek ve coşkuyla sahip çıkmak millî namus ve vefa borcumuzdur.",
    "rubric": [("Bağımsızlık mührü ve şehit emaneti tespiti", 0.5), ("Millî vefa ve ortak varlık gerekçesi", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.2', 1, 0)] = {
    "contextText": "Tarih bilinci ve ortak geçmiş.",
    "stimulus": "Malazgirt Zaferi'nden İstanbul'un Fethi'ne, Çanakkale Destanı'ndan Kurtuluş Savaşı'na kadar ortak bir tarihi paylaşmaktayız.",
    "questionText": "Tarihimizi öğrenmenin milletçe geleceğe güvenle yürümemiz ve ortak kimliğimizi korumamız açısından önemini açıklayınız.",
    "solutionExplanation": "Kökü olmayan ağaç devrilir; tarihini bilmeyen milletler kimliğini kaybeder ve yönünü şaşırır.",
    "modelAnswer": "Tarih bir milletin hafızasıdır; geçmişini bilmeyen milletler köksüz bir ağaç gibi ilk rüzgârda devrilir. Ecdadımızın kahramanlıklarını, fedakârlıklarını ve medeniyet mirasını öğrenmek bize özgüven verir, millî kimliğimizi korur ve geleceğimizi sağlam temeller üzerine inşa etmemizi sağlar.",
    "rubric": [("Milletin hafızası olma analojisinin yazılması", 0.5), ("Özgüven kazanma ve geleceği inşa etme gerekçesi", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.2', 1, 1)] = {
    "contextText": "Dini ve milli bayramların birleştirici gücü.",
    "stimulus": "Kurban Bayramı'nda paylaşılan etler, Cumhuriyet Bayramı'nda caddeleri donatan kırmızı-beyaz bayraklar tüm fertleri aynı duyguda buluşturur.",
    "questionText": "Bayramların toplumdaki kırgınlıkları bitirme ve 'biz bilincini' güçlendirme fonksiyonunu 2 maddeyle açıklayınız.",
    "solutionExplanation": "Ayrılıkları unutturur, dayanışma ve sevinci paylaşmayı sağlar.",
    "modelAnswer": "1. Bütün şahsi dargınlık ve kırgınlıkları bir kenara bırakıp el ele vermeyi sağlayarak toplumsal barışı ve sevgiyi tazeler.\n2. Sevinçte ve tasada bir olan tek bir millet olduğumuzu hatırlatarak 'ben' bencil duygusu yerine 'biz' ortak aidiyet bilincini yüceltir.",
    "rubric": [("Dargınlıkları bitirme ve barışı tazeleme maddesi", 0.5), ("Biz bilinci ve tek millet aidiyeti maddesi", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.2', 2, 0)] = {
    "contextText": "Geleneksel sporlarımız: Yağlı güreş ve cirit.",
    "stimulus": "Kırkpınar Yağlı Güreşleri ve atlı cirit oyunları yüzyıllardır Türk milletinin gücünü, mertliğini ve hayvan sevgisini yaşatmaktadır.",
    "questionText": "Ata sporlarımızın gençlere aşıladığı 2 ahlaki değeri (mertlik, centilmenlik vb.) yazınız.",
    "solutionExplanation": "Mertlik, rakibe saygı, cesaret, hayvan sevgisi.",
    "modelAnswer": "1. Mertlik ve Centilmenlik: Rakibi yenince kibirlenmemeyi, yenilince rakibin elini öpüp tebrik etmeyi öğreten üstün bir spor ahlakı kazandırır.\n2. Cesaret ve Çeviklik: Atla ve doğayla bütünleşerek yiğitçe mücadele etme ve disiplin erdemini aşılar.",
    "rubric": [("Mertlik ve centilmenlik erdeminin yazılması", 0.5), ("Cesaret ve disiplin ahlakının belirtilmesi", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.2', 3, 0)] = {
    "contextText": "Türkçemizin korunması ve dil bilinci.",
    "stimulus": "Dükkân tabelalarında yabancı kelimelerin yaygınlaşması ana dilimiz Türkçenin zenginliğini tehdit etmektedir.",
    "questionText": "Karamanoğlu Mehmet Bey'in 'Bugünden sonra divanda, dergahta, mecliste Türkçe'den başka dil kullanılmaya' fermanından hareketle dilimizi korumanın bağımsızlığımız açısından önemini açıklayınız.",
    "solutionExplanation": "Dil bir milletin kalesidir, dilini kaybeden millet bağımsızlığını da kaybeder.",
    "modelAnswer": "Dil bir milletin bağımsızlığının ve kültürünün en muhkem kalesidir. Dilini yabancı kelimelerin istilasına terk eden milletler zamanla düşünce dünyasını ve bağımsız kimliğini kaybeder. Türkçemizi korumak vatan topraklarını korumak kadar hayati bir millî görevdir.",
    "rubric": [("Dilin bağımsızlık ve kültür kalesi niteliği", 0.5), ("Ana dili korumanın vatanı korumakla eşdeğer olduğu gerekçesi", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.2', 3, 1)] = {
    "contextText": "Şehitlik ve gazilik makamlarına saygı.",
    "stimulus": "Vatan savunmasında canını feda eden kahramanlarımıza 'Şehit', yaralanıp hayatta kalanlara 'Gazi' unvanı verilir.",
    "questionText": "Türk milletinde şehit ve gazilere duyulan hürmetin ve onların emanetlerine sahip çıkmanın vefa borcumuz olduğunu 2 cümleyle açıklayınız.",
    "solutionExplanation": "Hürriyetimizi onların fedakarlıklarına borçluyuz, emanetlerine sahip çıkmak en kutsal görevimizdir.",
    "modelAnswer": "Bugün bu topraklarda hür ve başımız dik yaşayabilmemizi, vatanı için seve seve canını veren aziz şehitlerimize ve kahraman gazilerimize borçluyuz. Onların hatırasını yaşatmak, geride bıraktıkları ailelerine sahip çıkmak ve vatanı canımız pahasına korumak boynumuzun borcudur.",
    "rubric": [("Hürriyetin şehit ve gazilere borçlu olunduğu tespiti", 0.5), ("Ailelerine sahip çıkma ve vefa borcu gerekçesi", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.2', 4, 0)] = {
    "contextText": "Dede Korkut hikâyeleri ve ortak ahlak.",
    "stimulus": "Dede Korkut hikâyeleri Türk töresini, aileye saygıyı, haksızlığa karşı durmayı ve sözünde durma erdemini asırlardır nesilden nesile aktarmaktadır.",
    "questionText": "Dede Korkut anlatılarının milletimizin ortak ahlaki kodlarını oluşturmasındaki rolünü bir örnekle açıklayınız.",
    "solutionExplanation": "Doğruluk, büyüklere saygı, obayı ve zayıfları koruma ahlakını canlı tutar.",
    "modelAnswer": "Dede Korkut anlatıları, yiğitliğin sadece bilek gücüyle değil; mazluma kalkan olmakla, sözünü tutmakla ve anaya-babaya hürmetle tamamlanacağını öğretir. Hikâyelerdeki adalet, doğruluk ve birlik ideali milletimizin bin yıllık ortak ahlak pusulası olmuştur.",
    "rubric": [("Mazluma kalkan olma ve ahlaki değerler tespiti", 0.5), ("Ortak ahlak pusulası rolünün açıklanması", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.2', 4, 1)] = {
    "contextText": "Tarihî mimari eserlerin millî hafıza olması.",
    "stimulus": "Mimar Sinan'ın Edirne'deki Selimiye Camii, Erzurum'daki Çifte Minareli Medrese ve Sivas Divriği Ulu Camii hayranlık uyandırmaya devam etmektedir.",
    "questionText": "Tarihî mimari eserlerimizin korunmasının bir ülkenin tapu senetleri olması yönünü açıklayınız.",
    "solutionExplanation": "Bu eserler o coğrafyanın ebedi Türk-İslam yurdu olduğunun fiziki tapu senetleridir.",
    "modelAnswer": "Bu görkemli eserler, bu toprakların asırlardır kimin vatanı olduğunu kanıtlayan taştan yazılmış tapu senetleridir. Bir caminin kubbesi, bir köprünün kemeri o coğrafyaya millî kimlik vurur; onları korumak vatanımızın tapusuna sahip çıkmaktır.",
    "rubric": [("Eserlerin taştan yazılmış tapu senedi olması metaforu", 0.5), ("Millî kimlik ve vatana sahip çıkma gerekçesi", 0.5)]
}

# SB.6.1.3 (Toplumsal sorunlara çözüm üretme)
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.3', 0, 0)] = {
    "contextText": "Çevre kirliliği ve sıfır atık.",
    "stimulus": "Şehirlerde sokaklara atılan plastik şişeler, poşetler ve ambalajlar hem doğayı zehirlemekte hem de görüntü kirliliği oluşturmaktadır.",
    "questionText": "Okulunuzda çevre kirliliğini önlemek ve geri dönüşümü yaygınlaştırmak için uygulayabileceğiniz 2 somut proje önerisi yazınız.",
    "solutionExplanation": "Geri dönüşüm kutuları koymak, kompost gübre üretmek, bez torba kullanımı.",
    "modelAnswer": "1. Her kata kâğıt, cam, plastik ve pil için ayrı renkli 'Sıfır Atık Geri Dönüşüm Kutuları' koyarak öğrencileri bilinçlendirmek.\n2. Kantinde tek kullanımlık plastik bardak yerine öğrencilerin kendi su mataralarını ve bez çantalarını kullanmalarını teşvik eden ödüllü kampanyalar düzenlemek.",
    "rubric": [("Geri dönüşüm kutuları projesi", 0.5), ("Matara/bez çanta teşvik kampanyası projesi", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.3', 0, 1)] = {
    "contextText": "Su israfı ve baraj doluluk oranları.",
    "stimulus": "Küresel kuraklık sebebiyle şehirlerimize su sağlayan barajların doluluk oranları kritik seviyelere inmiştir.",
    "questionText": "Evlerimizde ve okullarda su israfını önlemek için alabileceğimiz 2 pratik tasarruf tedbirini yazınız.",
    "solutionExplanation": "Diş fırçalarken musluğu kapatmak, tasarruflu perlatör başlıkları takmak, arızalı sifonları tamir etmek.",
    "modelAnswer": "1. Diş fırçalarken, el sabunlarken musluğu boş yere akıtmayıp kapatmak ve musluk uçlarına suyu hava ile zenginleştiren tasarruflu perlatör başlıkları takmak.\n2. Damlatan muslukları ve sızdıran sifonları vakit kaybetmeden tamir ettirmek; sebze yıkanan suları çiçekleri sulamak için yeniden kullanmak.",
    "rubric": [("Musluğu kapatma ve tasarruflu başlık tedbiri", 0.5), ("Kaçak tamiri ve gri suyun çiçeklerde kullanımı tedbiri", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.3', 1, 0)] = {
    "contextText": "Trafikte saygı ve emniyet kemeri.",
    "stimulus": "Trafik kazalarının büyük kısmı sürücülerin aşırı hız yapması, kırmızı ışıkta geçmesi ve takip mesafesine uymamasından kaynaklanmaktadır.",
    "questionText": "Trafik sorunlarının çözülmesinde cezai yaptırımlardan önce neden 'trafik kültürü ve empati' eğitiminin önemli olduğunu açıklayınız.",
    "solutionExplanation": "Ceza sadece polis görünce durdurur; kültür ve empati ise her an iç denetim sağlar.",
    "modelAnswer": "Polis ve ceza korkusu sadece denetim yapılan yerlerde geçici bir uyum sağlar; oysa empati ve trafik kültürü kazanan bir sürücü, kimse görmese dahi yayalara yol verir, hız sınırına uyar. İnsan hayatına saygı ancak içselleşmiş bir ahlakla kalıcı hale gelir.",
    "rubric": [("Cezanın dışsal ve geçici niteliğinin açıklanması", 0.5), ("Empati ve içselleşmiş trafik kültürünün kalıcılığı gerekçesi", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.3', 1, 1)] = {
    "contextText": "Akran zorbalığı ile mücadele.",
    "stimulus": "Okullarda bazı öğrencilerin zayıf veya sessiz arkadaşlarıyla alay etmesi, onları dışlaması akran zorbalığı sorununu doğurmaktadır.",
    "questionText": "Sınıfta akran zorbalığına şahit olan bir öğrencinin sergilemesi gereken doğru ve sorumlu 2 davranışı yazınız.",
    "solutionExplanation": "Gülüp ortak olmamak, mağdur arkadaşın yanında durmak ve rehber öğretmene bildirmek.",
    "modelAnswer": "1. Alay edenlere kesinlikle gülüp destek vermemek; zorbalık yapanlara 'Bu yaptığınız hiç doğru değil' diyerek net bir tavır koymak.\n2. Mağdur edilen arkadaşın yanına gidip ona destek olmak ve durumu vakit kaybetmeden sınıf öğretmenine ya da okul rehberlik servisine bildirmek.",
    "rubric": [("Zorbalığa ortak olmama ve net tavır koyma davranışı", 0.5), ("Mağdura destek olma ve rehberliğe bildirme davranışı", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.3', 1, 2)] = {
    "contextText": "Gıda israfı ve ekmek nimeti.",
    "stimulus": "Ülkemizde her gün milyonlarca ekmek ve tonlarca taze meyve-sebze çöpe atılarak israf edilmektedir.",
    "questionText": "Gıda israfını önlemek amacıyla evlerde ve restoranlarda uygulanabilecek 2 tasarruf yöntemini yazınız.",
    "solutionExplanation": "İhtiyaç kadar alışveriş yapmak, bayat ekmekleri değerlendirmek, porsiyonları küçültmek.",
    "modelAnswer": "1. Alışverişe çıkmadan önce evdeki dolabı kontrol edip liste yapmak ve sadece tüketilebilecek kadar gıda satın almak.\n2. Bayatlayan ekmekleri çöpe atmayıp yumurtalı ekmek, köfte harcı veya çorba kıtırı olarak değerlendirmek; lokantalarda artan temiz yemekleri barınaklardaki hayvanlara ulaştırmak.",
    "rubric": [("Liste yaparak ihtiyaç kadar alma yöntemi", 0.5), ("Bayat ekmekleri değerlendirme ve barınaklara ulaştırma yöntemi", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.3', 2, 0)] = {
    "contextText": "Gürültü kirliliği ve komşuluk hakkı.",
    "stimulus": "Apartmanlarda geç saatlerde yüksek sesle müzik dinlenmesi veya evde koşulması alt ve üst komşuları rahatsız etmektedir.",
    "questionText": "Birlikte yaşama kuralları ve komşu hakkı açısından evimizde gürültü yapmaktan neden sakınmamız gerektiğini açıklayınız.",
    "solutionExplanation": "Komşunun huzur ve dinlenme hakkına saygı duymak, kul hakkına girmemektir.",
    "modelAnswer": "Evler insanların yorgunluk attığı, ders çalıştığı, hastaların ve bebeklerin uyuduğu özel dinlenme alanlarıdır. Yüksek ses çıkararak komşuların dinlenme ve huzur hakkını gasp etmek ağır bir kul hakkı ve saygısızlıktır; medeni insan komşusunu rahatsız etmeyen insandır.",
    "rubric": [("Dinlenme, bebek/hasta huzuru hakkı tespiti", 0.5), ("Kul hakkı ve medeni birlikte yaşam saygısı gerekçesi", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.3', 3, 0)] = {
    "contextText": "Sokak hayvanlarının korunması.",
    "stimulus": "Kışın dondurucu ayazında ve yazın kavurucu sıcağında sokak hayvanları yiyecek ve su bulmakta zorlanmaktadır.",
    "questionText": "Mahallemizdeki sokak hayvanlarının yaşam hakkını korumak için kapımızın önüne koyabileceğimiz 2 pratik çözümü yazınız.",
    "solutionExplanation": "Bir kap temiz su ve mama koymak, kışın korunaklı kedi evleri yapmak.",
    "modelAnswer": "1. Yazın sıcağında gölge bir köşeye 'Bir Kap Temiz Su' ve bozulmayacak kuru mama bırakmak.\n2. Kış aylarında yağmur ve rüzgar almayan kuytu yerlere strafor veya kartondan korunaklı kedi/köpek yuvaları hazırlamak.",
    "rubric": [("Temiz su ve mama koyma çözümü", 0.5), ("Kışlık korunaklı barınak hazırlama çözümü", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.3', 3, 1)] = {
    "contextText": "Enerji tasarrufu ve elektrik israfı.",
    "stimulus": "Gereksiz yere yanan lambalar, fişte takılı bırakılan şarj aletleri hem aile bütçesine hem de ülke ekonomisine büyük yük getirmektedir.",
    "questionText": "Okullarda ve evlerde elektrik enerjisini verimli kullanmak için uygulanabilecek 2 tasarruf kuralını yazınız.",
    "solutionExplanation": "Kullanılmayan lambaları söndürmek, enerji tasarruflu LED ampuller kullanmak, prizlerde şarj aleti bırakmamak.",
    "modelAnswer": "1. Gün ışığından azami ölçüde yararlanmak; aydınlık odalarda ve boş sınıflarda lambaları derhal kapatmak.\n2. Akkor flamanlı eski lambalar yerine az elektrik tüketen A+++ enerji sınıflı LED ampuller kullanmak ve kullanılmayan cihazları fişten çekmek.",
    "rubric": [("Boş yanan lambaları kapatma kuralı", 0.5), ("LED ampul ve fişten çekme tedbiri", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.3', 4, 0)] = {
    "contextText": "Toplu taşımada öncelikli yolcular.",
    "stimulus": "Metro ve otobüslerde yaşlılar, hamileler, kucağında bebek olanlar ve engelliler için ayrılmış özel koltuklar bulunmaktadır.",
    "questionText": "Toplu taşıma araçlarında bu koltukları öncelikli vatandaşlarımıza bırakmanın arkasındaki insani nezaket kuralını açıklayınız.",
    "solutionExplanation": "Özel gereksinimli ve ayakta durmakta zorlanan bireylere yardım etmek empati ve toplumsal saygıdır.",
    "modelAnswer": "Yaşlı, engelli, hamile ve çocuklu bireyler ayakta dengede durmakta büyük fiziki zorluk çekerler. Genç ve sağlıklı bireylerin onlara yer vermesi bir lütuf değil, zayıfa kol kanat geren asil bir empati, nezaket ve toplumsal saygı kuralıdır.",
    "rubric": [("Fiziksel zorluk ve denge ihtiyacı tespiti", 0.5), ("Asil empati ve toplumsal saygı kuralı gerekçesi", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.3', 4, 1)] = {
    "contextText": "Dijital bağımlılık ve ekran süresi.",
    "stimulus": "Günde 6-7 saatini cep telefonu ekranında sosyal medyada ve oyunlarda geçiren bir çocuk arkadaşlarıyla görüşmemekte ve derslerinde başarısız olmaktadır.",
    "questionText": "Dijital ekran bağımlılığından kurtulmak ve sosyal hayata dönmek için bu öğrenciye önereceğiniz 2 sağlıklı alışkanlığı yazınız.",
    "solutionExplanation": "Ekran süresini kısıtlamak, bir spor veya sanat kursuna yazılmak, kitap okumak.",
    "modelAnswer": "1. Günlük ekran süresine kesin bir sınır (örneğin günde en fazla 1 saat) koymak ve telefon bildirimlerini kapatmak.\n2. Sanal dünya yerine basketbol, yüzme gibi bir spor branşına veya gitar, resim gibi bir sanat kulübüne yazılarak gerçek arkadaşlıklar kurmak.",
    "rubric": [("Ekran süresi sınırlaması önerisi", 0.5), ("Spor ve sanat faaliyetleriyle sosyalleşme önerisi", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'SB.6.1.3', 4, 2)] = {
    "contextText": "Tüketici hakları ve ayıplı mal.",
    "stimulus": "Mağazadan aldığı spor ayakkabısı iki gün sonra tabanından açılan bir tüketiciye mağaza görevlisi 'Kullanılmış ürünü iade almayız' demiştir.",
    "questionText": "Tüketici Hakları Kanunu'na göre bu vatandaşın sahip olduğu hakları belirterek izlemesi gereken yasal yolu yazınız.",
    "solutionExplanation": "Ayıplı maldır; ücretsiz onarım, değişim veya para iadesi hakkı vardır. Tüketici Hakem Heyetine başvurabilir.",
    "modelAnswer": "Bu ürün 'ayıplı mal'dır. Tüketici faturasıyla birlikte ürünün ücretsiz tamirini, yenisiyle değiştirilmesini veya parasının iadesini talep etme yasal hakkına sahiptir. Mağaza reddederse e-Devlet üzerinden veya kaymakamlıktaki 'Tüketici Hakem Heyeti'ne başvurmalıdır.",
    "rubric": [("Ayıplı mal ve değişim/iade hakkının yazılması", 0.5), ("Tüketici Hakem Heyetine başvuru yolunun belirtilmesi", 0.5)]
}

# EVİMİZ (Dünya coğrafyası, iklimler, kıtalar)
G6_DEDICATED[('sosyal_bilgiler', 'EVİMİZ', 0, 0)] = {
    "contextText": "Kıtalar ve okyanuslar.",
    "stimulus": "Dünya yüzeyinde 7 büyük kıta ve devasa okyanuslar yer almaktadır.",
    "questionText": "a) Yüzölçümü en büyük olan kıta ile en küçük olan kıtanın adını yazınız.\nb) Dünyanın en büyük okyanusu hangisidir?",
    "solutionExplanation": "a En büyük Asya, en küçük Okyanusya (Avustralya). b Büyük Okyanus (Pasifik).",
    "modelAnswer": "a) En büyük kıta: Asya kıtası\n   En küçük kıta: Okyanusya (Avustralya)\nb) En büyük okyanus: Büyük Okyanus (Pasifik Okyanusu)",
    "rubric": [("Asya ve Okyanusya kıtalarının doğru yazımı", 0.5), ("Büyük Okyanus (Pasifik) tespiti", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'EVİMİZ', 1, 0)] = {
    "contextText": "Kutup iklimi ve iglo evler.",
    "stimulus": "Kuzey Kutbu'nda yaşayan İnuitler (Eskimo halkı) kalın buz bloklarını üst üste dizerek 'iglo' adı verilen kubbeli evler yaparlar.",
    "questionText": "İglo evlerin yapım malzemesinin ve kubbe şeklinin kutup ikliminin zorlu şartlarına (soğuk, fırtına) nasıl uyum sağladığını açıklayınız.",
    "solutionExplanation": "Sıkışmış kar ve buz mükemmel bir ısı yalıtkanıdır, kubbe şekli fırtına rüzgarlarını kaydırır.",
    "modelAnswer": "Kutup bölgesinde ağaç ve taş bulunmadığı için buz tek inşaat malzemesidir. Sıkışmış kardan yapılan bloklar haznelerindeki hava sayesinde mükemmel bir ısı yalıtımı sağlayarak içerdeki vücut ısısını hapseder; kubbe mimarisi ise şiddetli kutup fırtınalarının binayı yıkmadan üzerinden kayıp gitmesini sağlar.",
    "rubric": [("Buz bloklarının ısı yalıtımı özelliği", 0.5), ("Kubbe şeklinin fırtına rüzgârlarını kaydırma gerekçesi", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'EVİMİZ', 2, 0)] = {
    "contextText": "Ekvatoral iklim ve yağmur ormanları.",
    "stimulus": "Amazon ve Kongo havzalarında yıl boyunca her gün şiddetli yağmurlar yağar ve sıcaklık sürekli 25-30°C civarındadır.",
    "questionText": "Ekvatoral iklimin gür yağmur ormanları oluşturmasının ve buradaki evlerin neden kazıklar üzerine dikilip dik çatılı yapıldığının nedenini açıklayınız.",
    "solutionExplanation": "Aşırı yağış ormanları gür yapar; kazıklar taşkınlardan, dik çatı ise aşırı yağmur suyunu akıtmaktan korur.",
    "modelAnswer": "Yıl boyu süren aşırı nem ve düzenli yağışlar devasa tropikal yağmur ormanlarını besler. Bölgedeki nehir taşmalarından ve vahşi hayvanlardan korunmak için evler yerden yüksek ahşap kazıklar üzerine kurulur; aşırı yağmur sularının hızla akıp gitmesi için de çatılar çok dik yapılır.",
    "rubric": [("Aşırı nem ve yağışın ormanları besleme boyutu", 0.5), ("Kazıklar üzerinde ve dik çatı mimarisinin sel/yağış gerekçesi", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'EVİMİZ', 2, 1)] = {
    "contextText": "Çöl iklimi ve deve adaptasyonu.",
    "stimulus": "Büyük Sahra Çölü'nde gündüzleri kavurucu sıcaklık ve kum fırtınaları hakimdir.",
    "questionText": "Çöl ortamında ulaşım aracı olarak kullanılan develerin hörgüçleri ve uzun kirpikleri çöl iklimine nasıl uyum sağlamıştır?",
    "solutionExplanation": "Hörgüç yağ depolar ve su ihtiyacını karşılar; uzun çift sıra kirpikler kum fırtınasından gözü korur.",
    "modelAnswer": "• Hörgüç: Yağ depolar; deve günlerce su ve yiyecek bulamadığında bu yağı enerjiye ve suya dönüştürerek susuzluğa dayanır.\n• Uzun Kirpikler: Çölde aniden çıkan şiddetli kum fırtınalarında kum tanelerinin devenin gözüne kaçmasını engelleyen doğal bir koruyucu filtredir.",
    "rubric": [("Hörgücün yağ ve susuzluk dayanımı fonksiyonu", 0.5), ("Uzun kirpiklerin kum fırtınasından koruma fonksiyonu", 0.5)]
}
G6_DEDICATED[('sosyal_bilgiler', 'EVİMİZ', 3, 0)] = {
    "contextText": "Akdeniz iklimi ve maki bitki örtüsü.",
    "stimulus": "Akdeniz kıyılarında yazlar sıcak ve kurak, kışlar ılık ve yağışlı geçer.",
    "questionText": "Akdeniz ikliminin karakteristik bitki örtüsü olan 'maki'lerin yapraklarının neden sert, parlak ve tüylü olduğunu yaz kuraklığıyla bağ kurarak açıklayınız.",
    "solutionExplanation": "Sert ve mumsu yapraklar yaz kuraklığında su kaybını (terlemeyi) en aza indirmek için uyum sağlamıştır.",
    "modelAnswer": "Maki türleri (zeytin, zakkum, defne vb.) yaz aylarındaki uzun süreli aşırı sıcaklık ve kuraklığa dayanabilmek için gelişmiştir. Yapraklarının kalın, parlak mumsu ve tüylü olması, güneş ışınlarını yansıtarak bitkinin su kaybetmesini (terlemesini) en aza indirir.",
    "rubric": [("Yaz kuraklığı ve aşırı sıcaklık şartının belirtilmesi", 0.5), ("Mumsu/tüylü yaprağın su kaybını önleme adaptasyonu gerekçesi", 0.5)]
}

print("Grade 6 Sosyal Bilgiler dedicated questions registered!")
