# -*- coding: utf-8 -*-
import json
from build_grade8_turkce_distinct import G8_DEDICATED

# =====================================================================
# GRADE 8 MATEMATİK DEDICATED (6 Scenarios - 57 Questions)
# =====================================================================

# ---------------------------------------------------------------------
# SENARYO 1 (11 Questions)
# ---------------------------------------------------------------------
G8_DEDICATED[('matematik', 'M.8.1.1.1', 0, 0)] = {
    "contextText": "Pozitif tam sayının çarpanları ve asal çarpanlar.",
    "stimulus": "Bir manavdaki kasada 72 kg elma bulunmaktadır. Manav bu elmaları her poşette eşit miktarda ve tam sayı olacak şekilde paylaştırmak istiyor.",
    "questionText": "72 sayısının tüm pozitif tam sayı çarpanlarını küçükten büyüğe yazınız ve asal çarpan algoritması kullanarak 72'yi üslü ifadelerin çarpımı şeklinde gösteriniz.",
    "solutionExplanation": "72'nin çarpanları: 1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72. 72 = 2^3 * 3^2.",
    "modelAnswer": "• 72'nin Pozitif Çarpanları: 1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72 (12 adet)\n• Asal Çarpanlarına Ayrılışı:\n72 / 2 = 36\n36 / 2 = 18\n18 / 2 = 9\n9 / 3 = 3\n3 / 3 = 1\nSonuç: 72 = 2³ × 3²",
    "rubric": [("Çarpanların eksiksiz listelenmesi", 0.5), ("Üslü biçimde (2^3 x 3^2) doğru yazılması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.1.2', 0, 0)] = {
    "contextText": "EBOB problemi: Dikdörtgen bahçe etrafına ağaç dikme.",
    "stimulus": "Eni 48 metre, boyu 60 metre olan dikdörtgen şeklindeki bir bahçenin etrafına, köşelere de gelmek şartıyla eşit aralıklarla fidan dikilecektir.",
    "questionText": "a) İki fidan arasındaki mesafe en fazla kaç metre olabilir?\nb) Bu iş için en az kaç fidan gereklidir?",
    "solutionExplanation": "EBOB(48, 60) = 12 metre. Çevre = 2*(48+60) = 216 m. Fidan sayısı = 216 / 12 = 18.",
    "modelAnswer": "a) İki fidan arası mesafe EBOB(48, 60) olmalıdır:\n48 = 2⁴ × 3, 60 = 2² × 3 × 5 -> EBOB(48, 60) = 2² × 3 = 12 metre.\nb) En az fidan sayısı:\nBahçenin Çevresi = 2 × (48 + 60) = 2 × 108 = 216 metre.\nFidan Sayısı = Çevre / Aralık = 216 / 12 = 18 fidan gereklidir.",
    "rubric": [("EBOB'un 12 m olarak doğru bulunması", 0.5), ("Fidan sayısının 18 olarak işlem basamaklarıyla bulunması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.1.3', 0, 0)] = {
    "contextText": "Aralarında asal sayılar.",
    "stimulus": "İki doğal sayının 1'den başka ortak pozitif böleni yoksa bu sayılar aralarında asaldır.",
    "questionText": "14 ile 25 sayılarının pozitif bölenlerini yazarak bu iki sayının aralarında asal olup olmadığını gerekçesiyle açıklayınız.",
    "solutionExplanation": "14'ün bölenleri: 1, 2, 7, 14. 25'in bölenleri: 1, 5, 25. Ortak bölen sadece 1'dir, aralarında asaldır.",
    "modelAnswer": "• 14'ün Bölenleri: 1, 2, 7, 14\n• 25'in Bölenleri: 1, 5, 25\n• Ortak Bölenler: Yalnızca 1'dir.\nSonuç: 14 ve 25 sayılarının 1'den başka hiçbir ortak pozitif böleni olmadığı için bu iki sayı aralarında asaldır.",
    "rubric": [("Bölenlerin ayrı ayrı doğru listelenmesi", 0.5), ("Ortak bölenin sadece 1 olması gerekçesiyle aralarında asal denmesi", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.1', 0, 0)] = {
    "contextText": "Negatif üs ve tam sayı kuvvetleri.",
    "stimulus": "Bir tam sayının negatif kuvveti o sayının çarpma işlemine göre tersinin pozitif kuvvetine eşittir: a^(-n) = 1 / a^n.",
    "questionText": "Aşağıdaki üslü ifadelerin sayısal değerlerini rasyonel sayı veya tam sayı olarak hesaplayınız:\na) 2^(-4) = ?\nb) (-3)^(-2) = ?\nc) (-5)^3 = ?",
    "solutionExplanation": "a) 1/16, b) 1/9, c) -125.",
    "modelAnswer": "a) 2^(-4) = 1 / (2⁴) = 1 / 16\nb) (-3)^(-2) = 1 / [(-3)²] = 1 / 9\nc) (-5)³ = (-5) × (-5) × (-5) = -125",
    "rubric": [("2^(-4) = 1/16 doğru", 0.34), ("(-3)^(-2) = 1/9 doğru", 0.33), ("(-5)^3 = -125 doğru", 0.33)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.2', 0, 0)] = {
    "contextText": "Üslü ifadelerde çarpma ve bölme kuralları.",
    "stimulus": "İşlem: (8⁴ × 4⁵) / 16³",
    "questionText": "Verilen işlemin sonucunu 2'nin bir kuvveti şeklinde işlem adımlarını göstererek hesaplayınız.",
    "solutionExplanation": "8^4 = 2^12, 4^5 = 2^10, Pay = 2^22. 16^3 = 2^12. Sonuç = 2^(22-12) = 2^10.",
    "modelAnswer": "Bütün tabanlar 2'nin kuvveti olarak yazılır:\n• 8⁴ = (2³)⁴ = 2¹²\n• 4⁵ = (2²)⁵ = 2¹⁰\nPay = 2¹² × 2¹⁰ = 2^(12+10) = 2²²\n• 16³ = (2⁴)³ = 2¹²\nPayda = 2¹²\nSonuç = Pay / Payda = 2²² / 2¹² = 2^(22 - 12) = 2¹⁰ (veya 1024)",
    "rubric": [("Tabanların 2'nin kuvvetine dönüştürülmesi", 0.5), ("Pay ve payda işlemlerinin yapılıp 2^10 sonucunun bulunması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.3', 0, 0)] = {
    "contextText": "Ondalık gösterimlerin 10'un kuvvetleriyle çözümlenmesi.",
    "stimulus": "Sayı: 345,608",
    "questionText": "345,608 sayısını 10'un tam sayı kuvvetlerini kullanarak çözümleyiniz.",
    "solutionExplanation": "3*10^2 + 4*10^1 + 5*10^0 + 6*10^(-1) + 8*10^(-3).",
    "modelAnswer": "345,608 = (3 × 10²) + (4 × 10¹) + (5 × 10⁰) + (6 × 10⁻¹) + (0 × 10⁻²) + (8 × 10⁻³)\n= (3 × 10²) + (4 × 10¹) + (5 × 10⁰) + (6 × 10⁻¹) + (8 × 10⁻³)",
    "rubric": [("Tam kısmın çözümlemesinin doğruluğu", 0.5), ("Ondalık kısmın (10^-1 ve 10^-3) doğru yazılması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.4', 0, 0)] = {
    "contextText": "10'un farklı tam sayı kuvvetleriyle ifade etme.",
    "stimulus": "Eşitlik: 0,00045 = 45 × 10^x = 4,5 × 10^y",
    "questionText": "Yukarıda verilen eşitliklerdeki x ve y tam sayılarının değerlerini bularak (x + y) toplamını hesaplayınız.",
    "solutionExplanation": "0,00045 = 45 * 10^(-5) -> x = -5. 0,00045 = 4,5 * 10^(-4) -> y = -4. x + y = -9.",
    "modelAnswer": "• Virgülü 5 basamak sağa kaydırırsak: 0,00045 = 45 × 10⁻⁵ -> x = -5\n• Virgülü 4 basamak sağa kaydırırsak: 0,00045 = 4,5 × 10⁻⁴ -> y = -4\n• Toplam: x + y = (-5) + (-4) = -9",
    "rubric": [("x = -5 ve y = -4 değerlerinin doğru bulunması", 0.6), ("Toplamın -9 olarak bulunması", 0.4)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.5', 0, 0)] = {
    "contextText": "Bilimsel gösterim.",
    "stimulus": "Işık boşlukta 1 saniyede yaklaşık 300 000 km yol almaktadır. 1 km = 1000 m olduğuna göre ışık 1 saniyede 300 000 000 metre yol alır.",
    "questionText": "Işığın 1 saniyede aldığı bu yolun metre cinsinden bilimsel gösterimini yazınız.",
    "solutionExplanation": "300 000 000 m = 3 * 10^8 m. 1 <= 3 < 10 şartı sağlanır.",
    "modelAnswer": "• 300 000 000 metre sayısı üslü biçimde yazılır:\n300 000 000 = 3 × 10⁸ metre.\n• Katsayı olan 3 sayısı 1 ≤ |a| < 10 şartını sağladığı için bilimsel gösterimdir:\nSonuç: 3 × 10⁸ m",
    "rubric": [("Sayının 3 x 10^8 olarak yazılması", 0.6), ("Bilimsel gösterim şartının (1 <= a < 10) sağlandığının belirtilmesi", 0.4)]
}
G8_DEDICATED[('matematik', 'M.8.1.3.1', 0, 0)] = {
    "contextText": "Tam kare sayılar ve karekök ilişkisi.",
    "stimulus": "Alanı 196 cm² olan kare şeklindeki bir kartonun bir kenar uzunluğu cetvelle ölçülecektir.",
    "questionText": "Bu karenin bir kenar uzunluğunun kaç cm olduğunu karekök alma işlemiyle gösteriniz ve çevresini hesaplayınız.",
    "solutionExplanation": "Kenar = sqrt(196) = 14 cm. Çevre = 4 * 14 = 56 cm.",
    "modelAnswer": "• Karenin Alanı = a² = 196 cm²\n• Kenar Uzunluğu: a = √196 = √(14²) = 14 cm\n• Karenin Çevresi = 4 × a = 4 × 14 = 56 cm",
    "rubric": [("Karekök alma ile bir kenarın 14 cm bulunması", 0.5), ("Çevrenin 56 cm olarak hesaplanması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.3.2', 0, 0)] = {
    "contextText": "Tam kare olmayan sayının ardışık iki doğal sayı arasında belirlenmesi.",
    "stimulus": "Karekök değeri: √75",
    "questionText": "√75 sayısının hangi iki ardışık tam sayı arasında olduğunu bulunuz ve bu sayılardan hangisine daha yakın olduğunu işlemle gösteriniz.",
    "solutionExplanation": "64 < 75 < 81 olduğundan 8 ile 9 arasındadır. 75-64 = 11, 81-75 = 6 olduğundan 9'a daha yakındır.",
    "modelAnswer": "• 75 sayısına en yakın tam kare sayılar 64 ve 81'dir:\n64 < 75 < 81\n√64 < √75 < √81\n8 < √75 < 9 (8 ile 9 arasındadır)\n• Yakınlık Kontrolü:\n|75 - 64| = 11 birim fark\n|81 - 75| = 6 birim fark\nFark 81'e daha az olduğu için √75 sayısı 9'a daha yakındır.",
    "rubric": [("8 ile 9 arasında olduğunun belirlenmesi", 0.5), ("Farklar kıyaslanarak 9'a daha yakın olduğunun gösterilmesi", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.3.3', 0, 0)] = {
    "contextText": "Kareköklü ifadeyi a√b şeklinde yazma ve katsayıyı içeri alma.",
    "stimulus": "İki kareköklü ifade: A = √108 ve B = 5√3",
    "questionText": "a) A = √108 sayısını a√b şeklinde en sade biçimde yazınız.\nb) B = 5√3 sayısında kök dışındaki katsayıyı kök içine alarak tek bir karekök olarak yazınız.",
    "solutionExplanation": "a) sqrt(108) = sqrt(36*3) = 6sqrt(3). b) 5sqrt(3) = sqrt(25*3) = sqrt(75).",
    "modelAnswer": "a) √108 = √(36 × 3) = √36 × √3 = 6√3\nb) 5√3 = √(5² × 3) = √(25 × 3) = √75",
    "rubric": [("√108 ifadesinin 6√3 olarak yazılması", 0.5), ("5√3 ifadesinin √75 olarak yazılması", 0.5)]
}

# ---------------------------------------------------------------------
# SENARYO 2 (8 Questions)
# ---------------------------------------------------------------------
G8_DEDICATED[('matematik', 'M.8.1.1.1', 1, 0)] = {
    "contextText": "Asal çarpanlar algoritması ve bölen sayısı.",
    "stimulus": "Bir kütüphanedeki 120 kitabın numaralandırılması yapılacaktır.",
    "questionText": "120 sayısını asal çarpan algoritması ile asal çarpanlarına ayırınız, üslü ifadelerin çarpımı olarak yazınız ve farklı asal çarpanlarının toplamını bulunuz.",
    "solutionExplanation": "120 = 2^3 * 3 * 5. Farklı asallar: 2, 3, 5. Toplam = 10.",
    "modelAnswer": "• 120 / 2 = 60; 60 / 2 = 30; 30 / 2 = 15; 15 / 3 = 5; 5 / 5 = 1\n• Üslü Gösterim: 120 = 2³ × 3¹ × 5¹\n• Farklı Asal Çarpanları: 2, 3 ve 5'tir.\n• Asal Çarpanlar Toplamı: 2 + 3 + 5 = 10",
    "rubric": [("Asal çarpan algoritmasının ve 2^3 x 3 x 5 yazımının doğruluğu", 0.6), ("Farklı asalların toplamının 10 olarak bulunması", 0.4)]
}
G8_DEDICATED[('matematik', 'M.8.1.1.2', 1, 0)] = {
    "contextText": "EKOK problemi: İki zilin ortak çalma zamanı.",
    "stimulus": "İki farklı okul zilinden biri 30 dakikada bir, diğeri ise 45 dakikada bir çalmaktadır. Bu iki zil ilk kez sabah saat 08:00'de birlikte çalmıştır.",
    "questionText": "Bu iki zilin ikinci kez saat kaçta birlikte çalacağını EKOK işlemiyle hesaplayınız.",
    "solutionExplanation": "EKOK(30, 45) = 90 dakika = 1 saat 30 dakika. 08:00 + 01:30 = 09:30.",
    "modelAnswer": "• 30 ve 45'in EKOK'u bulunur:\n30 = 2 × 3 × 5\n45 = 3² × 5\nEKOK(30, 45) = 2 × 3² × 5 = 90 dakika.\n• 90 dakika = 1 saat 30 dakikadır.\n• Birlikte ikinci çalış saati: 08:00 + 01:30 = 09:30'dur.",
    "rubric": [("EKOK(30, 45) = 90 dakikanın doğru bulunması", 0.5), ("Saat 09:30'un doğru tespit edilmesi", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.1.2', 1, 1)] = {
    "contextText": "EBOB problemi: İki farklı kalitedeki zeytinyağını şişeleme.",
    "stimulus": "Bir zeytin üreticisinin elinde 84 litre Gemlik zeytinyağı ve 96 litre Ayvalık zeytinyağı vardır. Üretici bu yağları birbirine karıştırmadan, hiç artmayacak şekilde eşit hacimli en büyük şişelere dolduracaktır.",
    "questionText": "a) Bir şişenin hacmi en fazla kaç litre olabilir?\nb) Bu işlem için toplam kaç adet şişe gerekir?",
    "solutionExplanation": "EBOB(84, 96) = 12 litre. Şişe sayısı = 84/12 + 96/12 = 7 + 8 = 15 şişe.",
    "modelAnswer": "a) Şişe hacmi EBOB(84, 96) olmalıdır:\n84 = 2² × 3 × 7\n96 = 2⁵ × 3\nEBOB(84, 96) = 2² × 3 = 12 litre.\nb) Toplam Şişe Sayısı:\n84 / 12 = 7 şişe (Gemlik)\n96 / 12 = 8 şişe (Ayvalık)\nToplam = 7 + 8 = 15 şişe gereklidir.",
    "rubric": [("EBOB'un 12 litre bulunması", 0.5), ("Toplam şişe sayısının 15 olarak bulunması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.2', 1, 0)] = {
    "contextText": "Üslü sayılarda çarpma kuralı: Tabanlar aynı veya üsler aynı.",
    "stimulus": "İşlem: 5⁷ × 2⁷ işleminin sonucu.",
    "questionText": "5⁷ × 2⁷ işleminin sonucunu üslü ifadelerin kurallarını kullanarak bulunuz ve sonucun kaç basamaklı bir doğal sayı olduğunu belirtiniz.",
    "solutionExplanation": "Üsler aynıysa tabanlar çarpılır: (5*2)^7 = 10^7. 1'in yanında 7 sıfır vardır, 8 basamaklıdır.",
    "modelAnswer": "• Üsler aynı olduğu için tabanlar çarpılır: a^n × b^n = (a × b)^n\n5⁷ × 2⁷ = (5 × 2)⁷ = 10⁷\n• 10⁷ sayısı: 1'in yanına 7 adet sıfır yazılmasıyla oluşur (10 000 000).\n• Basamak Sayısı: 1 basamak (1 sayısı) + 7 basamak (sıfırlar) = 8 basamaklıdır.",
    "rubric": [("10^7 ifadesinin kural uygulanarak bulunması", 0.5), ("8 basamaklı olduğunun doğru açıklanması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.2', 1, 1)] = {
    "contextText": "Üslü sayılarda bölme ve üssün üssü.",
    "stimulus": "İşlem: (27⁴) / (9⁵)",
    "questionText": "Verilen bölme işleminin sonucunu 3'ün kuvveti şeklinde hesaplayınız.",
    "solutionExplanation": "27^4 = (3^3)^4 = 3^12. 9^5 = (3^2)^5 = 3^10. 3^12 / 3^10 = 3^(12-10) = 3^2 = 9.",
    "modelAnswer": "Tabanlar 3'ün kuvvetine dönüştürülür:\n• Pay: 27⁴ = (3³)⁴ = 3^(3×4) = 3¹²\n• Payda: 9⁵ = (3²)⁵ = 3^(2×5) = 3¹⁰\n• Bölme Kuralı: 3¹² / 3¹⁰ = 3^(12 - 10) = 3² = 9",
    "rubric": [("Pay ve paydanın 3 tabanına çevrilmesi", 0.5), ("Bölme işlemiyle 3^2 (9) sonucunun bulunması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.3.2', 1, 0)] = {
    "contextText": "Kareköklü sayının sayı doğrusundaki konumu.",
    "stimulus": "Sayı doğrusunda √115 noktasının yeri işaretlenecektir.",
    "questionText": "√115 sayısının sayı doğrusunda hangi iki ardışık tam sayı arasında olduğunu bulunuz ve hangi tam sayıya daha yakın olduğunu nedenleriyle gösteriniz.",
    "solutionExplanation": "100 < 115 < 121 -> 10 ile 11 arasındadır. 121-115 = 6, 115-100 = 15 olduğundan 11'e daha yakındır.",
    "modelAnswer": "• Tam kare sayılar: 100 < 115 < 121\n• √100 < √115 < √121 -> 10 < √115 < 11 (10 ile 11 arasındadır)\n• Fark hesabı: |115 - 100| = 15 birim, |121 - 115| = 6 birim\n• 121'e daha yakın olduğu için √115 sayısı 11'e daha yakındır.",
    "rubric": [("10 ile 11 arasında olduğunun belirlenmesi", 0.5), ("11'e daha yakın olduğunun ispatlanması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.3.3', 1, 0)] = {
    "contextText": "Kareköklü ifadeyi a√b şeklinde yazma.",
    "stimulus": "Sayı: √180",
    "questionText": "√180 kareköklü ifadesini a√b şeklinde, a sayısı 1'den büyük olacak biçimde 2 farklı şekilde yazınız ve en sade halini daire içine alınız.",
    "solutionExplanation": "√180 = √(4*45) = 2√45; √180 = √(9*20) = 3√20; √180 = √(36*5) = 6√5 (en sade).",
    "modelAnswer": "• 1. Yazım: √180 = √(4 × 45) = 2√45\n• 2. Yazım: √180 = √(9 × 20) = 3√20\n• En Sade Hali: √180 = √(36 × 5) = 6√5 (Daire içine alınan en sade gösterim)",
    "rubric": [("Farklı a√b gösterimlerinin yazılması", 0.5), ("En sade halinin 6√5 olarak belirlenmesi", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.3.3', 1, 1)] = {
    "contextText": "Katsayıyı karekök içine alma ve sıralama.",
    "stimulus": "Üç sayı: x = 3√5, y = 4√3, z = 2√11",
    "questionText": "Verilen x, y ve z sayılarının katsayılarını kök içine alarak bu sayıları küçükten büyüğe doğru sıralayınız.",
    "solutionExplanation": "x = sqrt(9*5)=sqrt(45); y = sqrt(16*3)=sqrt(48); z = sqrt(4*11)=sqrt(44). Sıralama: z < x < y.",
    "modelAnswer": "Katsayılar kök içine karesi alınarak alınır:\n• x = 3√5 = √(3² × 5) = √(9 × 5) = √45\n• y = 4√3 = √(4² × 3) = √(16 × 3) = √48\n• z = 2√11 = √(2² × 11) = √(4 × 11) = √44\nSıralama: √44 < √45 < √48 olduğundan: z < x < y",
    "rubric": [("Her üç sayının kök içine doğru alınması", 0.6), ("z < x < y sıralamasının doğru yapılması", 0.4)]
}

# ---------------------------------------------------------------------
# SENARYO 3 (11 Questions)
# ---------------------------------------------------------------------
G8_DEDICATED[('matematik', 'M.8.1.1.1', 2, 0)] = {
    "contextText": "Pozitif tam sayı çarpanları ve çift çarpanlar.",
    "stimulus": "Sayı: 90",
    "questionText": "90 sayısının tüm pozitif çarpanlarını listeleyiniz ve bu çarpanlardan kaç tanesinin çift sayı olduğunu belirleyiniz.",
    "solutionExplanation": "Çarpanlar: 1, 2, 3, 5, 6, 9, 10, 15, 18, 30, 45, 90 (12 adet). Çiftler: 2, 6, 10, 18, 30, 90 (6 adet).",
    "modelAnswer": "• 90'ın Çarpanları: 1, 2, 3, 5, 6, 9, 10, 15, 18, 30, 45, 90 (Toplam 12 adet)\n• Çift Olan Çarpanlar: 2, 6, 10, 18, 30, 90\nSonuç: 6 tanesi çift sayıdır.",
    "rubric": [("90'ın çarpanlarının eksiksiz listelenmesi", 0.6), ("Çift olan 6 çarpanın doğru belirlenmesi", 0.4)]
}
G8_DEDICATED[('matematik', 'M.8.1.1.2', 2, 0)] = {
    "contextText": "EBOB problemi: İki kumaş topunu eşit parçalara ayırma.",
    "stimulus": "Bir terzinin elinde 75 metre mavi kumaş ve 105 metre kırmızı kumaş vardır. Terzi kumaşları hiç parça artmayacak şekilde eşit uzunlukta en büyük parçalara bölecektir.",
    "questionText": "a) Bir kumaş parçasının uzunluğu en fazla kaç metre olabilir?\nb) Toplam kaç parça kumaş elde edilir ve toplam kaç kesim yapılır?",
    "solutionExplanation": "EBOB(75, 105) = 15 m. Parça sayısı: 75/15 + 105/15 = 5 + 7 = 12 parça. Kesim sayısı = (5-1) + (7-1) = 4 + 6 = 10 kesim.",
    "modelAnswer": "a) EBOB(75, 105) hesaplanır:\n75 = 3 × 5², 105 = 3 × 5 × 7 -> EBOB(75, 105) = 3 × 5 = 15 metre.\nb) Parça ve Kesim Sayısı:\nMavi kumaş: 75 / 15 = 5 parça (4 kesim)\nKırmızı kumaş: 105 / 15 = 7 parça (6 kesim)\nToplam 12 parça elde edilir ve toplam 10 kesim işlemi yapılır.",
    "rubric": [("EBOB'un 15 m bulunması", 0.5), ("12 parça ve 10 kesim sayısının bulunması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.1.2', 2, 1)] = {
    "contextText": "EKOK problemi: Otobüs sefer saatleri.",
    "stimulus": "A şehrinden kalkan iki otobüsten biri her 40 dakikada bir, diğeri ise her 50 dakikada bir sefere çıkmaktadır. İki otobüs saat 07:00'de aynı anda sefere çıkmıştır.",
    "questionText": "Bu iki otobüsün ikinci kez saat kaçta birlikte sefere çıkacağını hesaplayınız.",
    "solutionExplanation": "EKOK(40, 50) = 200 dakika = 3 saat 20 dakika. 07:00 + 03:20 = 10:20.",
    "modelAnswer": "• 40 ve 50'nin EKOK'u:\n40 = 2³ × 5, 50 = 2 × 5² -> EKOK(40, 50) = 2³ × 5² = 8 × 25 = 200 dakika.\n• 200 dakika = 3 saat 20 dakikadır.\n• İkinci birlikte sefer saati: 07:00 + 03:20 = 10:20'dir.",
    "rubric": [("EKOK = 200 dakikanın doğru bulunması", 0.5), ("Saat 10:20'nin bulunması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.1.3', 2, 0)] = {
    "contextText": "Aralarında asal sayılar ve EKOK ilişkisi.",
    "stimulus": "Aralarında asal iki doğal sayının EBOB'u 1'e, EKOK'u ise bu iki sayının çarpımına eşittir.",
    "questionText": "Aralarında asal iki sayının EKOK'u 72'dir. Bu sayılardan biri 9 olduğuna göre diğer sayıyı bulunuz ve neden aralarında asal olduklarını açıklayınız.",
    "solutionExplanation": "A * B = EKOK = 72. 9 * B = 72 -> B = 8. 8 ile 9 ardışık sayılardır ve aralarında asaldır.",
    "modelAnswer": "• Aralarında asal sayıların çarpımı EKOK'a eşittir: Sayı 1 × Sayı 2 = 72\n• 9 × B = 72 -> B = 72 / 9 = 8\n• Açıklama: 8 ve 9 ardışık doğal sayılardır. 8'in bölenleri (1, 2, 4, 8) ile 9'un bölenleri (1, 3, 9) arasında 1 dışında ortak bölen yoktur.",
    "rubric": [("Diğer sayının 8 olarak bulunması", 0.5), ("Ortak bölenin 1 olması ve aralarında asallık kuralı gerekçesi", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.2', 2, 0)] = {
    "contextText": "Üslü sayılarda ortak paranteze alma ve toplama.",
    "stimulus": "İşlem: 3⁸ + 3⁸ + 3⁸",
    "questionText": "Yukarıda verilen toplama işleminin sonucunu üslü biçimde en sade haliyle yazınız.",
    "solutionExplanation": "3^8 + 3^8 + 3^8 = 3 * (3^8) = 3^(1+8) = 3^9.",
    "modelAnswer": "• Aynı sayının 3 kez toplanması çarpma işlemine dönüşür:\n3⁸ + 3⁸ + 3⁸ = 3 × 3⁸\n• Tabanlar aynı olduğundan üsler toplanır: 3¹ × 3⁸ = 3^(1 + 8) = 3⁹",
    "rubric": [("Toplama işleminin 3 x 3^8 şeklinde yazılması", 0.5), ("Üslerin toplanıp 3^9 olarak bulunması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.2', 2, 1)] = {
    "contextText": "Üslü sayılarda alan hesabı.",
    "stimulus": "Bir kenar uzunluğu 4⁴ cm ve diğer kenar uzunluğu 8³ cm olan dikdörtgen şeklindeki bir panonun alanı hesaplanacaktır.",
    "questionText": "Bu panonun alanını cm² cinsinden 2'nin kuvveti olarak hesaplayınız.",
    "solutionExplanation": "Alan = 4^4 * 8^3 = (2^2)^4 * (2^3)^3 = 2^8 * 2^9 = 2^17 cm².",
    "modelAnswer": "• Dikdörtgenin Alanı = Kenar 1 × Kenar 2\n• 4⁴ = (2²)⁴ = 2⁸ cm\n• 8³ = (2³)³ = 2⁹ cm\n• Alan = 2⁸ × 2⁹ = 2^(8 + 9) = 2¹⁷ cm²",
    "rubric": [("Kenarların 2 tabanına dönüştürülmesi", 0.5), ("Alan = 2^17 cm² sonucunun bulunması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.3', 2, 0)] = {
    "contextText": "10'un negatif kuvvetleriyle çözümleme.",
    "stimulus": "Verilen çözümleme: (5 × 10²) + (7 × 10⁰) + (4 × 10⁻¹) + (9 × 10⁻³)",
    "questionText": "Yukarıda 10'un kuvvetleri şeklinde çözümlenmiş olarak verilen sayının ondalık gösterimini yazınız.",
    "solutionExplanation": "507,409.",
    "modelAnswer": "• 5 × 10² = 500 (Yüzler basamağı: 5)\n• Onlar basamağı (10¹) olmadığı için: 0\n• 7 × 10⁰ = 7 (Birler basamağı: 7)\n• 4 × 10⁻¹ = 0,4 (Onda birler basamağı: 4)\n• Yüzde birler basamağı (10⁻²) olmadığı için: 0\n• 9 × 10⁻³ = 0,009 (Binde birler basamağı: 9)\nSonuç: 507,409",
    "rubric": [("Tam kısmın 507 olarak yazılması", 0.5), ("Ondalık kısmın 409 olarak yazılması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.4', 2, 0)] = {
    "contextText": "Kuvvet dengeleme.",
    "stimulus": "Eşitlik: 0,000072 = 7,2 × 10^a = 720 × 10^b",
    "questionText": "Yukarıdaki eşitliklerde a ve b tam sayılarının değerlerini bulunuz ve a - b farkını hesaplayınız.",
    "solutionExplanation": "0,000072 = 7,2 * 10^(-5) -> a = -5. 0,000072 = 720 * 10^(-7) -> b = -7. a - b = -5 - (-7) = 2.",
    "modelAnswer": "• Virgül 5 basamak sağa kayarsa: 0,000072 = 7,2 × 10⁻⁵ -> a = -5\n• Virgül 7 basamak sağa kayarsa: 0,000072 = 720 × 10⁻⁷ -> b = -7\n• Fark: a - b = (-5) - (-7) = -5 + 7 = 2",
    "rubric": [("a = -5 ve b = -7 değerlerinin bulunması", 0.6), ("a - b = 2 sonucunun bulunması", 0.4)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.5', 2, 0)] = {
    "contextText": "Çok küçük sayıların bilimsel gösterimi.",
    "stimulus": "Bir koronavirüs partikülünün ortalama çapı yaklaşık 0,00000012 metredir.",
    "questionText": "Bu virüsün çapının metre cinsinden bilimsel gösterimini yazınız.",
    "solutionExplanation": "0,00000012 m = 1,2 * 10^(-7) m. 1 <= 1,2 < 10.",
    "modelAnswer": "• Sayı üslü olarak yazılır: 0,00000012 = 12 × 10⁻⁸\n• Bilimsel gösterim olması için katsayı 1 ile 10 arasında olmalıdır:\n1,2 × 10⁻⁷ metre.\n(1 ≤ 1,2 < 10 şartı sağlandığından bilimsel gösterimdir)",
    "rubric": [("1,2 x 10^-7 ifadesinin doğru yazılması", 0.6), ("Bilimsel gösterim kuralının belirtilmesi", 0.4)]
}
G8_DEDICATED[('matematik', 'M.8.1.3.1', 2, 0)] = {
    "contextText": "Kare alanından çevre bulma.",
    "stimulus": "Alanı 256 metrekare olan kare biçimindeki bir bahçenin etrafına 3 sıra dikenli tel çekilecektir.",
    "questionText": "Bu bahçenin bir kenar uzunluğunu bulunuz ve gereken toplam tel uzunluğunu metre cinsinden hesaplayınız.",
    "solutionExplanation": "Kenar = sqrt(256) = 16 m. Çevre = 4 * 16 = 64 m. Toplam tel = 3 * 64 = 192 metre.",
    "modelAnswer": "• Bir kenar uzunluğu: a = √256 = 16 metre\n• Bahçenin Çevresi = 4 × a = 4 × 16 = 64 metre\n• 3 sıra tel çekileceği için: Toplam Tel = 3 × 64 = 192 metre tel gerekir.",
    "rubric": [("Kenar uzunluğunun 16 m bulunması", 0.5), ("Toplam telin 192 m olarak hesaplanması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.3.2', 2, 0)] = {
    "contextText": "Kareköklü sayı aralığı.",
    "stimulus": "√40 metre uzunluğundaki bir ip.",
    "questionText": "√40 metre uzunluğundaki bir ipin boyu hangi iki tam metre arasındadır ve hangi tam metreye daha yakındır?",
    "solutionExplanation": "36 < 40 < 49 -> 6 ile 7 arasındadır. 40-36 = 4, 49-40 = 9 -> 6'ya daha yakındır.",
    "modelAnswer": "• 36 < 40 < 49 -> √36 < √40 < √49 -> 6 < √40 < 7 (6 metre ile 7 metre arasındadır)\n• Fark hesabı: 40 - 36 = 4 birim, 49 - 40 = 9 birim\n• 36'ya daha yakın olduğu için ipin boyu 6 metreye daha yakındır.",
    "rubric": [("6 ile 7 arasında olduğunun belirlenmesi", 0.5), ("6 metreye daha yakın olduğunun gösterilmesi", 0.5)]
}

# ---------------------------------------------------------------------
# SENARYO 4 (8 Questions)
# ---------------------------------------------------------------------
G8_DEDICATED[('matematik', 'M.8.1.1.2', 3, 0)] = {
    "contextText": "EBOB problemi: Şeker ve un çuvallarını poşetleme.",
    "stimulus": "Bir bakkalın elinde 60 kg toz şeker ve 72 kg un bulunmaktadır. Bakkal bunları birbirine karıştırmadan eşit ağırlıktaki poşetlere paylaştıracaktır.",
    "questionText": "a) Bir poşet en fazla kaç kg şeker veya un alabilir?\nb) Bu iş için toplam kaç adet poşet gereklidir?",
    "solutionExplanation": "EBOB(60, 72) = 12 kg. Poşet sayısı: 60/12 + 72/12 = 5 + 6 = 11 poşet.",
    "modelAnswer": "a) Poşet ağırlığı EBOB(60, 72) olmalıdır:\n60 = 2² × 3 × 5, 72 = 2³ × 3² -> EBOB(60, 72) = 2² × 3 = 12 kg.\nb) Toplam Poşet Sayısı:\nŞeker için: 60 / 12 = 5 poşet\nUn için: 72 / 12 = 6 poşet\nToplam = 5 + 6 = 11 poşet gereklidir.",
    "rubric": [("EBOB'un 12 kg bulunması", 0.5), ("Toplam poşet sayısının 11 olarak bulunması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.1.2', 3, 1)] = {
    "contextText": "EKOK problemi: Merdiven basamakları.",
    "stimulus": "Ahmet bir merdivenin basamaklarını ikişer ikişer veya üçer üçer çıktığında her seferinde 1 basamak artmaktadır. Merdivendeki basamak sayısı 40'tan fazladır.",
    "questionText": "Bu merdivende en az kaç basamak olduğunu EKOK yardımıyla bulunuz.",
    "solutionExplanation": "EKOK(2, 3) = 6. 6'nın 40'tan büyük en küçük katı = 42. 1 basamak arttığı için: 42 + 1 = 43 basamak.",
    "modelAnswer": "• 2 ve 3'ün EKOK'u: EKOK(2, 3) = 6'dır.\n• Basamak sayısı 6'nın katından 1 fazladır: 6k + 1\n• Basamak sayısı 40'tan fazla olduğuna göre 6'nın 40'tan büyük en küçük katı 42'dir (6 × 7 = 42).\n• Toplam basamak sayısı = 42 + 1 = 43 basamaktır.",
    "rubric": [("EKOK(2, 3) = 6 ve katının bulunması", 0.5), ("1 fazlası alınarak 43 sonucunun bulunması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.1', 3, 0)] = {
    "contextText": "Üslü sayıların değerini hesaplama.",
    "stimulus": "İşlem: (-2)⁴ - 2⁴ + (-1)⁵⁰",
    "questionText": "Verilen işlemin sonucunu işlem önceliğine ve parantez kurallarına dikkat ederek hesaplayınız.",
    "solutionExplanation": "(-2)^4 = 16. 2^4 = 16. (-1)^50 = 1. Sonuç = 16 - 16 + 1 = 1.",
    "modelAnswer": "• (-2)⁴ = +16 (Negatif sayının çift kuvveti pozitiftir)\n• 2⁴ = 16 (Önünde eksi işareti olduğundan -16)\n• (-1)⁵⁰ = +1 (Negatif sayının çift kuvveti +1'dir)\nİşlem: 16 - 16 + 1 = 0 + 1 = 1",
    "rubric": [("Her bir üslü terimin işaret ve değerinin doğru tespiti", 0.6), ("Sonucun 1 olarak bulunması", 0.4)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.2', 3, 0)] = {
    "contextText": "Üslü sayılarda bölme ve basamak analizi.",
    "stimulus": "İşlem: (10¹²) / (2¹²)",
    "questionText": "Bu işlemin sonucunu üslü ifadeler kuralını uygulayarak bulunuz ve sonucun değerini yazınız.",
    "solutionExplanation": "Üsler aynı olduğundan tabanlar bölünür: (10/2)^12 = 5^12.",
    "modelAnswer": "• Üsler aynı olduğunda kural: (a^n) / (b^n) = (a / b)^n\n• (10¹²) / (2¹²) = (10 / 2)¹² = 5¹²",
    "rubric": [("Bölme kuralının doğru ifade edilmesi", 0.5), ("5^12 sonucunun bulunması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.2', 3, 1)] = {
    "contextText": "Üslü ifadelerde çarpım ve kuvvet alma.",
    "stimulus": "İşlem: (25³) × (125²)",
    "questionText": "Verilen işlemin sonucunu 5'in bir kuvveti olarak gösteriniz.",
    "solutionExplanation": "25^3 = (5^2)^3 = 5^6. 125^2 = (5^3)^2 = 5^6. 5^6 * 5^6 = 5^12.",
    "modelAnswer": "Tabanlar 5'in kuvveti olarak yazılır:\n• 25³ = (5²)³ = 5^(2×3) = 5⁶\n• 125² = (5³)² = 5^(3×2) = 5⁶\n• Çarpma Kuralı: 5⁶ × 5⁶ = 5^(6 + 6) = 5¹²",
    "rubric": [("Her iki sayının 5 tabanına çevrilmesi", 0.5), ("Sonucun 5^12 olarak bulunması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.4', 3, 0)] = {
    "contextText": "Kuvvet denkliği.",
    "stimulus": "Eşitlik: 480 000 = 4,8 × 10^a = 0,048 × 10^b",
    "questionText": "Yukarıdaki eşitlikte a ve b tam sayılarını bularak (a + b) toplamını hesaplayınız.",
    "solutionExplanation": "480 000 = 4,8 * 10^5 -> a = 5. 480 000 = 0,048 * 10^7 -> b = 7. a + b = 12.",
    "modelAnswer": "• Virgülü 5 basamak sola kaydırırsak: 480 000 = 4,8 × 10⁵ -> a = 5\n• Virgülü 7 basamak sola kaydırırsak: 480 000 = 0,048 × 10⁷ -> b = 7\n• Toplam: a + b = 5 + 7 = 12",
    "rubric": [("a = 5 ve b = 7 değerlerinin bulunması", 0.6), ("Toplamın 12 olarak bulunması", 0.4)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.4', 3, 1)] = {
    "contextText": "Kuvvet dönüşümü.",
    "stimulus": "Sayı: 0,0032 × 10⁸",
    "questionText": "Verilen sayıyı 32 × 10^n biçiminde yazarak n tam sayısının değerini bulunuz.",
    "solutionExplanation": "0,0032 * 10^8 = (32 * 10^(-4)) * 10^8 = 32 * 10^4 -> n = 4.",
    "modelAnswer": "• 0,0032 sayısı 32 × 10⁻⁴ olarak yazılır.\n• (32 × 10⁻⁴) × 10⁸ = 32 × 10^(-4 + 8) = 32 × 10⁴\n• Buradan n = 4 bulunur.",
    "rubric": [("Virgül kaydırma işleminin basamak basamak gösterilmesi", 0.5), ("n = 4 değerinin doğru bulunması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.3.2', 3, 0)] = {
    "contextText": "Kareköklü sayı tahmini.",
    "stimulus": "Bir marangoz √150 cm boyunda bir tahta parçası kesecektir.",
    "questionText": "√150 sayısının hangi iki tam sayı arasında olduğunu bulunuz ve cetvel üzerinde 12'ye mi yoksa 13'e mi daha yakın olduğunu işlemle kanıtlayınız.",
    "solutionExplanation": "144 < 150 < 169 -> 12 ile 13 arasındadır. 150-144 = 6, 169-150 = 19 -> 12'ye daha yakındır.",
    "modelAnswer": "• Tam kareler: 144 < 150 < 169 -> √144 < √150 < √169 -> 12 < √150 < 13\n• 12 ile 13 tam sayıları arasındadır.\n• Yakınlık: |150 - 144| = 6 birim fark, |169 - 150| = 19 birim fark\n• 144'e olan fark çok daha az olduğundan √150 sayısı 12'ye daha yakındır.",
    "rubric": [("12 ile 13 arasında olduğunun tespiti", 0.5), ("Farklar kıyaslanarak 12'ye daha yakın olduğunun gösterilmesi", 0.5)]
}

# ---------------------------------------------------------------------
# SENARYO 5 (10 Questions)
# ---------------------------------------------------------------------
G8_DEDICATED[('matematik', 'M.8.1.1.1', 4, 0)] = {
    "contextText": "Pozitif tam sayı çarpanları: Dikdörtgen alanından çevre.",
    "stimulus": "Alanı 36 cm² olan ve kenar uzunlukları tam sayı olan dikdörtgenler çizilecektir.",
    "questionText": "Bu dikdörtgenin kenar uzunlukları olabilecek tüm (a, b) tam sayı ikililerini yazınız ve çevresi en büyük olan dikdörtgenin çevresini hesaplayınız.",
    "solutionExplanation": "İkililer: (1, 36), (2, 18), (3, 12), (4, 9), (6, 6). En büyük çevre kenarlar (1, 36) iken Ç = 2*(1+36) = 74 cm.",
    "modelAnswer": "• 36'nın Çarpan İkilileri (Kenar Uzunlukları):\n(1, 36), (2, 18), (3, 12), (4, 9), (6, 6)\n• Çevre Formülü = 2 × (a + b)\n• Çevrelerin Hesabı:\n2 × (1 + 36) = 74 cm (En Büyük Çevre)\n2 × (2 + 18) = 40 cm\n2 × (3 + 12) = 30 cm\n2 × (4 + 9) = 26 cm\n2 × (6 + 6) = 24 cm\nEn büyük çevre 74 cm'dir.",
    "rubric": [("Tüm çarpan ikililerinin eksiksiz yazılması", 0.5), ("En büyük çevrenin 74 cm olarak bulunması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.1.2', 4, 0)] = {
    "contextText": "EBOB problemi: Dikdörtgen zemine kare fayans döşeme.",
    "stimulus": "Boyutları 120 cm ve 180 cm olan dikdörtgen şeklindeki bir banyonun zemini hiç boşluk kalmayacak şekilde eşit büyüklükte en büyük kare fayanslarla kaplanacaktır.",
    "questionText": "a) Bir kare fayansın bir kenar uzunluğu en fazla kaç cm olabilir?\nb) Bu iş için en az kaç fayans gereklidir?",
    "solutionExplanation": "EBOB(120, 180) = 60 cm. Fayans sayısı = (120*180) / (60*60) = 2 * 3 = 6 fayans.",
    "modelAnswer": "a) Fayansın kenarı EBOB(120, 180) olmalıdır:\n120 = 2³ × 3 × 5, 180 = 2² × 3² × 5 -> EBOB(120, 180) = 2² × 3 × 5 = 60 cm.\nb) En az fayans sayısı:\nFayans Sayısı = Zemin Alanı / Bir Fayansın Alanı\n= (120 × 180) / (60 × 60) = 2 × 3 = 6 adet fayans gereklidir.",
    "rubric": [("EBOB'un 60 cm bulunması", 0.5), ("Fayans sayısının 6 olarak bulunması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.1.2', 4, 1)] = {
    "contextText": "EKOK problemi: İki nöbetçi doktor.",
    "stimulus": "Bir hastanedeki iki doktordan Dr. Ayşe 6 günde bir, Dr. Mehmet ise 8 günde bir nöbet tutmaktadır. İki doktor ilk nöbetlerini Pazartesi günü birlikte tutmuşlardır.",
    "questionText": "Bu iki doktorun tekrar birlikte nöbet tutmaları için en az kaç gün geçmelidir?",
    "solutionExplanation": "EKOK(6, 8) = 24 gün.",
    "modelAnswer": "• İki doktorun tekrar birlikte nöbet tutma süresi EKOK(6, 8) gün sonradır.\n• 6 = 2 × 3\n• 8 = 2³\n• EKOK(6, 8) = 2³ × 3 = 8 × 3 = 24 gün.\nEn az 24 gün sonra tekrar birlikte nöbet tutarlar.",
    "rubric": [("EKOK asal çarpan algoritması", 0.5), ("24 gün cevabının bulunması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.1.2', 4, 2)] = {
    "contextText": "EBOB ve EKOK bağıntısı.",
    "stimulus": "A ve B gibi iki doğal sayının EBOB'u 6, EKOK'u 180'dir. Bu sayılardan biri 30'dur.",
    "questionText": "İki sayının çarpımı ile EBOB ve EKOK'ları arasındaki ilişkiyi kullanarak diğer sayıyı bulunuz.",
    "solutionExplanation": "A * B = EBOB * EKOK. 30 * B = 6 * 180 = 1080 -> B = 36.",
    "modelAnswer": "• Kural: İki doğal sayının çarpımı, bu sayıların EBOB'u ile EKOK'unun çarpımına eşittir.\nSayı 1 × Sayı 2 = EBOB × EKOK\n• 30 × B = 6 × 180\n• 30 × B = 1080\n• B = 1080 / 30 = 36\nDiğer sayı 36'dır.",
    "rubric": [("Kuralın (A x B = EBOB x EKOK) doğru yazılması", 0.5), ("Diğer sayının 36 olarak bulunması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.2', 4, 0)] = {
    "contextText": "Üslü sayılarda yarısını ve çeyreğini bulma.",
    "stimulus": "Sayılar: A = 2²⁰ ve B = 4¹⁵",
    "questionText": "a) A = 2²⁰ sayısının yarısını üslü biçimde bulunuz.\nb) B = 4¹⁵ sayısının çeyreğini 2'nin kuvveti biçiminde bulunuz.",
    "solutionExplanation": "a) 2^20 / 2 = 2^19. b) 4^15 = 2^30. Çeyreği = 2^30 / 4 = 2^30 / 2^2 = 2^28.",
    "modelAnswer": "a) Bir sayının yarısı 2'ye bölünerek bulunur:\nA / 2 = 2²⁰ / 2¹ = 2^(20 - 1) = 2¹⁹\nb) Bir sayının çeyreği 4'e bölünerek bulunur:\nB = 4¹⁵ = (2²)¹⁵ = 2³⁰\nÇeyreği = 2³⁰ / 4 = 2³⁰ / 2² = 2^(30 - 2) = 2²⁸",
    "rubric": [("Yarısının 2^19 olarak bulunması", 0.5), ("Çeyreğinin 2^28 olarak bulunması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.2', 4, 1)] = {
    "contextText": "Üslü denklemler.",
    "stimulus": "Denklem: 3^(2x - 4) = 81",
    "questionText": "Verilen üslü denklemdeki x bilinmeyeninin değerini bulunuz.",
    "solutionExplanation": "81 = 3^4. Tabanlar eşit olduğundan üsler eşittir: 2x - 4 = 4 -> 2x = 8 -> x = 4.",
    "modelAnswer": "• 81 sayısı 3'ün kuvveti olarak yazılır: 81 = 3⁴\n• 3^(2x - 4) = 3⁴\n• Tabanlar eşit (3) olduğundan üsler de eşit olmalıdır:\n2x - 4 = 4\n2x = 4 + 4\n2x = 8\nx = 4",
    "rubric": [("81'in 3^4 olarak eşitlenmesi", 0.5), ("x = 4 sonucunun işlemle bulunması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.2', 4, 2)] = {
    "contextText": "Üslü sayılarda çarpım basamak sayısı.",
    "stimulus": "İşlem: 4⁶ × 5¹⁰",
    "questionText": "4⁶ × 5¹⁰ işleminin sonucunu 10'un kuvveti şeklinde düzenleyerek sonucun kaç basamaklı bir sayı olduğunu bulunuz.",
    "solutionExplanation": "4^6 = (2^2)^6 = 2^12. 2^12 * 5^10 = 2^2 * (2^10 * 5^10) = 4 * 10^10. 11 basamaklıdır.",
    "modelAnswer": "• 4⁶ = (2²)⁶ = 2¹²\n• 2¹² × 5¹⁰ ifadesinde üsler eşitlenir:\n2¹² = 2² × 2¹⁰ = 4 × 2¹⁰\n• 4 × (2¹⁰ × 5¹⁰) = 4 × 10¹⁰\n• 4 × 10¹⁰ sayısı 4'ün yanına 10 tane sıfır yazılarak elde edilir.\n• Basamak Sayısı = 1 basamak (4 rakamı) + 10 basamak (sıfırlar) = 11 basamaklıdır.",
    "rubric": [("4 x 10^10 haline getirilmesi", 0.6), ("11 basamaklı olduğunun belirtilmesi", 0.4)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.3', 4, 0)] = {
    "contextText": "10'un tam sayı kuvvetleriyle çözümleme.",
    "stimulus": "Sayı: 204,075",
    "questionText": "204,075 sayısının 10'un tam sayı kuvvetlerini kullanarak çözümlemesini yazınız.",
    "solutionExplanation": "2*10^2 + 4*10^0 + 7*10^(-2) + 5*10^(-3).",
    "modelAnswer": "204,075 = (2 × 10²) + (4 × 10⁰) + (7 × 10⁻²) + (5 × 10⁻³)\n(Değeri 0 olan onlar ve onda birler basamağı yazılmaz)",
    "rubric": [("Tam kısmın çözümlemesinin doğruluğu", 0.5), ("Ondalık kısmın (10^-2 ve 10^-3) doğru yazılması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.4', 4, 0)] = {
    "contextText": "Virgül kaydırma ve üs dengesi.",
    "stimulus": "Eşitlik: 0,00056 × 10^(-3) = 5,6 × 10^k",
    "questionText": "Verilen eşitlikteki k tam sayısını bulunuz.",
    "solutionExplanation": "0,00056 = 5,6 * 10^(-4). (5,6 * 10^(-4)) * 10^(-3) = 5,6 * 10^(-7) -> k = -7.",
    "modelAnswer": "• 0,00056 sayısı: 5,6 × 10⁻⁴ olarak yazılır.\n• (5,6 × 10⁻⁴) × 10⁻³ = 5,6 × 10^(-4 + -3) = 5,6 × 10⁻⁷\n• Buradan k = -7 bulunur.",
    "rubric": [("Virgülün 4 basamak kaydırılması adımı", 0.5), ("k = -7 sonucunun bulunması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.5', 4, 0)] = {
    "contextText": "Bilimsel gösterim uygulaması: Hücre sayısı.",
    "stimulus": "Yetişkin bir insanın vücudunda yaklaşık 37 trilyon (37 000 000 000 000) hücre bulunmaktadır.",
    "questionText": "İnsan vücudundaki hücre sayısının bilimsel gösterimini yazınız.",
    "solutionExplanation": "37 000 000 000 000 = 3,7 * 10^13. 1 <= 3,7 < 10.",
    "modelAnswer": "• 37 trilyon = 37 × 10¹²\n• Bilimsel gösterim katsayısı 1 ≤ |a| < 10 aralığında olmalıdır:\nVirgülü 1 basamak sola kaydırıp üssü 1 artırırız:\n3,7 × 10¹³ adet hücre.",
    "rubric": [("3,7 x 10^13 bilimsel gösteriminin doğru yazılması", 1.0)]
}

# ---------------------------------------------------------------------
# SENARYO 6 (9 Questions)
# ---------------------------------------------------------------------
G8_DEDICATED[('matematik', 'M.8.1.1.1', 5, 0)] = {
    "contextText": "Asal çarpanların kuvvetleri biçiminde yazılan sayıyı bulma.",
    "stimulus": "Bir A doğal sayısı A = 2³ × 3² × 7¹ şeklinde asal çarpanlarına ayrılmıştır.",
    "questionText": "a) A doğal sayısının değerini hesaplayınız.\nb) A sayısının toplam kaç adet pozitif tam sayı çarpanı (böleni) olduğunu bulunuz.",
    "solutionExplanation": "a) A = 8 * 9 * 7 = 504. b) Pozitif bölen sayısı = (3+1)*(2+1)*(1+1) = 4*3*2 = 24.",
    "modelAnswer": "a) A Sayısının Değeri:\nA = 2³ × 3² × 7¹ = 8 × 9 × 7 = 72 × 7 = 504\nb) Pozitif Bölen Sayısı:\nÜsler birer artırılarak çarpılır: (3 + 1) × (2 + 1) × (1 + 1) = 4 × 3 × 2 = 24 adet pozitif çarpanı vardır.",
    "rubric": [("A = 504 değerinin doğru hesaplanması", 0.5), ("Pozitif bölen sayısının 24 olarak bulunması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.1.2', 5, 0)] = {
    "contextText": "EBOB problemi: İki tarlanın parsellenmesi.",
    "stimulus": "Alanı 96 m² ve 144 m² olan iki arsa, hiç alan artmayacak şekilde eşit büyüklükte en büyük parsellere ayrılacaktır.",
    "questionText": "a) Bir parselin alanı en fazla kaç m² olabilir?\nb) Bu iki arsadan toplam kaç parsel elde edilir?",
    "solutionExplanation": "EBOB(96, 144) = 48 m². Parsel sayısı: 96/48 + 144/48 = 2 + 3 = 5 parsel.",
    "modelAnswer": "a) Bir parselin alanı EBOB(96, 144) olmalıdır:\n96 = 2⁵ × 3, 144 = 2⁴ × 3² -> EBOB(96, 144) = 2⁴ × 3 = 16 × 3 = 48 m².\nb) Toplam Parsel Sayısı:\n1. arsa: 96 / 48 = 2 parsel\n2. arsa: 144 / 48 = 3 parsel\nToplam = 2 + 3 = 5 parsel elde edilir.",
    "rubric": [("EBOB'un 48 m² bulunması", 0.5), ("Toplam 5 parsel sayısının bulunması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.1.2', 5, 1)] = {
    "contextText": "EKOK problemi: Kitapları gruplama.",
    "stimulus": "Bir okuldaki kitaplar dörder dörder ve altışar altışar sayıldığında hiç kitap artmamaktadır. Kitap sayısı 100'den fazladır.",
    "questionText": "Bu okulda en az kaç kitap olduğunu EKOK yardımıyla hesaplayınız.",
    "solutionExplanation": "EKOK(4, 6) = 12. 12'nin 100'den büyük en küçük katı: 12 * 9 = 108.",
    "modelAnswer": "• 4 ve 6'nın EKOK'u bulunur:\n4 = 2², 6 = 2 × 3 -> EKOK(4, 6) = 2² × 3 = 12\n• Kitap sayısı 12'nin katı olmalıdır (12k).\n• 100'den büyük en küçük 12'nin katı:\n12 × 8 = 96 (100'den küçük)\n12 × 9 = 108 (100'den büyük en küçük kat)\nSonuç: En az 108 kitap vardır.",
    "rubric": [("EKOK(4, 6) = 12 bulunması", 0.5), ("100'den büyük en küçük kat olan 108'in bulunması", 0.5)]
}
G8_DEDICATED[('matematik', 'M.8.1.1.3', 5, 0)] = {
    "contextText": "Aralarında asal sayılarla kesir sadeleştirme.",
    "stimulus": "(x - 2) ile (y + 3) aralarında asal iki doğal sayıdır. Eşitlik: (x - 2) / (y + 3) = 28 / 35",
    "questionText": "Yukarıda verilen eşitliği sadeleştirerek x ve y değerlerini bulunuz ve (x × y) çarpımını hesaplayınız.",
    "solutionExplanation": "28/35 = 4/5. x-2 = 4 -> x = 6. y+3 = 5 -> y = 2. x*y = 12.",
    "modelAnswer": "• (x - 2) ve (y + 3) aralarında asal olduğu için kesir en sade haline getirilir:\n28 / 35 = (28 / 7) / (35 / 7) = 4 / 5\n• 4 ile 5 aralarında asal olduğundan pay paya, payda paydaya eşitlenir:\nx - 2 = 4 -> x = 4 + 2 = 6\ny + 3 = 5 -> y = 5 - 3 = 2\n• Çarpım: x × y = 6 × 2 = 12",
    "rubric": [("Kesrin 4/5 olarak sadeleştirilmesi", 0.4), ("x = 6 ve y = 2 değerlerinin bulunması", 0.4), ("Çarpımın 12 bulunması", 0.2)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.1', 5, 0)] = {
    "contextText": "Rasyonel sayıların negatif kuvvetleri.",
    "stimulus": "İşlem: (2/3)^(-3) + (1/2)^(-4)",
    "questionText": "Verilen işlemin sonucunu rasyonel sayı olarak hesaplayınız.",
    "solutionExplanation": "(2/3)^(-3) = (3/2)^3 = 27/8. (1/2)^(-4) = 2^4 = 16 = 128/8. Toplam = (27 + 128)/8 = 155/8.",
    "modelAnswer": "• (2/3)⁻³ = (3/2)³ = 3³ / 2³ = 27 / 8\n• (1/2)⁻⁴ = (2/1)⁴ = 2⁴ = 16 = 128 / 8\n• Toplama: 27 / 8 + 128 / 8 = (27 + 128) / 8 = 155 / 8 (veya 19 tam 3/8)",
    "rubric": [("Her iki terimin ters çevrilip pozitif üs alınması", 0.6), ("Sonucun 155/8 olarak doğru hesaplanması", 0.4)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.2', 5, 0)] = {
    "contextText": "Üslü sayılarda sıralama.",
    "stimulus": "Üç üslü sayı: a = 2⁶⁰, b = 3⁴⁰, c = 5²⁰",
    "questionText": "Verilen a, b ve c sayılarını üslerini eşitleyerek küçükten büyüğe doğru sıralayınız.",
    "solutionExplanation": "EBOB(60, 40, 20) = 20. a = (2^3)^20 = 8^20; b = (3^2)^20 = 9^20; c = 5^20. Sıralama: c < a < b.",
    "modelAnswer": "Üsler 20'de eşitlenir:\n• a = 2⁶⁰ = (2³)²⁰ = 8²⁰\n• b = 3⁴⁰ = (3²)²⁰ = 9²⁰\n• c = 5²⁰ = 5²⁰\nÜsler eşit (20) olduğunda tabanı küçük olan sayı daha küçüktür:\n5 < 8 < 9 olduğundan:\n5²⁰ < 8²⁰ < 9²⁰ -> c < a < b",
    "rubric": [("Üslerin 20 ortak çarpanına göre dönüştürülmesi", 0.6), ("c < a < b sıralamasının doğru yapılması", 0.4)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.2', 5, 1)] = {
    "contextText": "Üslü sayılarda problem çözme: Bakteri çoğalması.",
    "stimulus": "Bir laboratuvar tüpünde başlangıçta 16 adet bakteri vardır. Bu bakteri türü her 20 dakikada bir 2 katına çıkmaktadır.",
    "questionText": "Buna göre 2 saatin sonunda tüpte toplam kaç adet bakteri bulunacağını 2'nin kuvveti olarak hesaplayınız.",
    "solutionExplanation": "2 saat = 120 dakika = 6 periyot (120/20). Başlangıç = 16 = 2^4. Son durum = 2^4 * 2^6 = 2^10 = 1024.",
    "modelAnswer": "• Başlangıçtaki bakteri sayısı = 16 = 2⁴\n• 2 saat = 120 dakikadır.\n• Bölünme sayısı: 120 / 20 = 6 kez bölünür.\n• Her bölünmede 2 katına çıktığı için 2⁶ katına çıkar.\n• Sonuç = 2⁴ × 2⁶ = 2^(4 + 6) = 2¹⁰ adet (veya 1024 adet) bakteri olur.",
    "rubric": [("Bölünme periyodunun 6 olarak tespiti", 0.4), ("Sonucun 2^10 olarak doğru hesaplanması", 0.6)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.4', 5, 0)] = {
    "contextText": "10'un farklı kuvvetleri ve sıralama.",
    "stimulus": "İki sayı: K = 340 × 10^(-6) ve L = 0,0034 × 10^(-2)",
    "questionText": "K ve L sayılarını 10'un aynı kuvveti cinsinden yazarak karşılaştırınız ve aralarındaki ilişkiyi belirtiniz.",
    "solutionExplanation": "K = 3,4 * 10^(-4). L = 3,4 * 10^(-5). K > L (K, L'nin 10 katıdır).",
    "modelAnswer": "Her iki sayı 10⁻⁴ kuvvetinde eşitlenir:\n• K = 340 × 10⁻⁶ = 3,4 × 10⁻⁴\n• L = 0,0034 × 10⁻² = 34 × 10⁻⁴ (veya 3,4 × 10⁻⁵)\nKarşılaştırma:\n3,4 × 10⁻⁴ sayısı 3,4 × 10⁻⁵ sayısından büyüktür (10 katıdır).\nSonuç: K > L",
    "rubric": [("Sayıların ortak kuvvete dönüştürülmesi", 0.6), ("K > L sonucunun bulunması", 0.4)]
}
G8_DEDICATED[('matematik', 'M.8.1.2.5', 5, 0)] = {
    "contextText": "Bilimsel gösterim: Okyanuslardaki su kütlesi.",
    "stimulus": "Dünya'daki okyanuslarda yaklaşık 1 350 000 000 km³ su bulunmaktadır.",
    "questionText": "Okyanuslardaki su miktarının km³ cinsinden bilimsel gösterimini yazınız.",
    "solutionExplanation": "1 350 000 000 = 1,35 * 10^9 km³. 1 <= 1,35 < 10.",
    "modelAnswer": "• 1 350 000 000 km³ sayısı üslü yazılır:\n135 × 10⁷ = 1,35 × 10⁹ km³\n• 1 ≤ 1,35 < 10 şartı sağlandığı için bilimsel gösterimdir:\nSonuç: 1,35 × 10⁹ km³",
    "rubric": [("1,35 x 10^9 bilimsel gösteriminin doğru yazılması", 1.0)]
}

print("Grade 8 Matematik dedicated questions registered successfully!")
