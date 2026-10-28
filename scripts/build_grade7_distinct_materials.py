# -*- coding: utf-8 -*-
import json

# ==============================================================================
# GRADE 7 DISTINCT REPLACEMENT EXAMS
# ==============================================================================

# 1. MATEMATİK GRADE 7 (4 Distinct Scenarios)
G7_MAT_SCENARIOS = [
    {
        "id": "exam_7_matematik_1_1_senaryo_1",
        "grade": 7,
        "subjectId": "matematik",
        "examTerm": "1_donem_1_yazili",
        "scenarioId": "senaryo_1",
        "title": "7. Sınıf Matematik 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 1) (7 Soru)",
        "description": "MEB ÖDSGM 7. Sınıf Matematik 1. Senaryo resmi konu soru dağılımına uygun 100 puanlık sınav kağıdı.",
        "totalPoints": 100,
        "durationMinutes": 40,
        "instructions": [
            "Sınav süresi 40 dakikadır.",
            "Tüm sorular açık uçludur; işlem basamaklarını eksiksiz gösteriniz.",
            "Puanlama analitik rubriğe göre yapılacaktır."
        ],
        "questions": [
            {
                "questionNumber": 1,
                "outcomeCode": "MAT.7.1.1",
                "outcomeTitle": "MAT.7.1.1. Gerçek yaşam ya da matematiksel durumlarda doğal sayı, tam sayı ve rasyonel sayıları yorumlayabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Görsel / Deney / Günlük Hayat Durumu",
                "points": 15,
                "contextText": "Kutup hayvanlarının yaşam sıcaklık aralıkları ve tam sayılar.",
                "stimulus": "Kutup biyomunda yaşayan üç canlının dayanabildiği en düşük hava sıcaklıkları şöyledir:\n• Kutup Ayısı: -42 °C\n• İmparator Penguen: -35 °C\n• Kutup Tilkisi: -50 °C\nBir kış günü bölgede ölçülen hava sıcaklığı -38 °C olarak kaydedilmiştir.",
                "questionText": "a) -38 °C sıcaklıkta bu üç canlıdan hangileri hayatta kalma sınırları içerisindedir? Gerekçesini tam sayıların büyüklük-küçüklük ilişkisine göre yazınız.\nb) En soğuğa dayanıklı canlı ile en az dayanıklı canlı arasındaki sıcaklık farkı kaç °C'dir? İşlemini gösteriniz.",
                "solutionExplanation": "-38 °C, -42 °C ve -50 °C'den büyüktür, -35 °C'den küçüktür. Fark: (-35) - (-50) = +15 °C.",
                "modelAnswer": "a) -50 < -42 < -38 < -35 olduğu için; -38 °C sıcaklık Kutup Ayısı (-42 °C'ye kadar dayanır) ve Kutup Tilkisi (-50 °C'ye kadar dayanır) için yaşam sınırları içindedir. Penguen ise -35 °C'ye kadar dayanabildiğinden (-38 < -35) sınırın dışındadır.\nb) Sıcaklık farkı: (-35) - (-50) = -35 + 50 = 15 °C'dir.",
                "rubric": [
                    {"criterion": "a şıkkında tam sayı sıralaması ve canlıların doğru belirlenmesi", "points": 8},
                    {"criterion": "b şıkkında tam sayılarda çıkarma işleminin ve farkın (15 °C) doğru bulunması", "points": 7}
                ]
            },
            {
                "questionNumber": 2,
                "outcomeCode": "MAT.7.1.2",
                "outcomeTitle": "MAT.7.1.2. Gerçek yaşam durumlarında rasyonel sayıların ondalık gösterimlerini yansıtabilme",
                "difficulty": "Kolay",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 15,
                "contextText": "Devirli ondalık gösterimi rasyonel sayıya çevirme formülü.",
                "stimulus": "Bir laboratuvarda yapılan hassas kütle ölçümünde cihaz ekranında 2,363636... (2,36; 36 devrediyor) değeri okunmuştur.",
                "questionText": "a) Bu devirli ondalık gösterimi rasyonel sayıya çevirme formülünü (Tüm Sayı - Devretmeyen Kısım) / (Devreden kadar 9, Devretmeyen kadar 0) kullanarak kesir olarak yazınız.\nb) Bulduğunuz rasyonel sayıyı en sade (en küçük tam sayılarla) haline getiriniz.",
                "solutionExplanation": "(236 - 2) / 99 = 234 / 99 = 26 / 11.",
                "modelAnswer": "a) Formül: (236 - 2) / 99 = 234 / 99\nb) Sadeleştirme: 234 ve 99 sayıları 9'a bölünür: 234 ÷ 9 = 26, 99 ÷ 9 = 11. En sade hali: 26 / 11 (veya 2 tam 4/11).",
                "rubric": [
                    {"criterion": "Formülün doğru uygulanarak 234 / 99 kesrinin bulunması", "points": 8},
                    {"criterion": "9 ile sadeleştirilerek 26 / 11 en sade kesrinin elde edilmesi", "points": 7}
                ]
            },
            {
                "questionNumber": 3,
                "outcomeCode": "MAT.7.1.2",
                "outcomeTitle": "MAT.7.1.2. Gerçek yaşam durumlarında rasyonel sayıların ondalık gösterimlerini yansıtabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Hata Tespiti & Adım Analizi",
                "points": 15,
                "contextText": "Bölme işlemiyle ondalık gösterim bulma.",
                "stimulus": "Eren, 7 / 8 rasyonel sayısını ondalık gösterime dönüştürmek için payı paydaya bölme yöntemini uygulamıştır.",
                "questionText": "7 / 8 rasyonel sayısını uzun bölme işlemi adımlarını göstererek ondalık gösterim biçiminde yazınız ve devirli olup olmadığını belirtiniz.",
                "solutionExplanation": "7 / 8 = 0,875 (devirsiz, sonlu ondalık gösterim).",
                "modelAnswer": "7'nin içinde 8 yoktur, bölüme '0,' yazılır. 70'te 8 sekiz defa (8×8=64), kalan 6. 60'ta 8 yedi defa (7×8=56), kalan 4. 40'ta 8 beş defa (5×8=40), kalan 0.\nSonuç: 0,875'tir. Kalan sıfır olduğu için devirsiz (sonlu) bir ondalık gösterimdir.",
                "rubric": [
                    {"criterion": "Uzun bölme adımlarının doğru gösterilmesi", "points": 8},
                    {"criterion": "0,875 sonucunun ve sonlu olduğunun doğru yazılması", "points": 7}
                ]
            },
            {
                "questionNumber": 4,
                "outcomeCode": "MAT.7.1.3",
                "outcomeTitle": "MAT.7.1.3. Rasyonel sayıların karşılaştırma ve sıralama ilişkilerini yorumlayabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Öğrenci Diyaloğu & Kavram Yanılgısı",
                "points": 15,
                "contextText": "Negatif rasyonel sayılarda sıralama hatası analizi.",
                "stimulus": "Mert ile Ece, -3/4 ve -5/6 rasyonel sayılarını karşılaştırmaktadır:\n• Mert: \"Paydaları eşitlediğimizde -9/12 ve -10/12 olur. -10 sayısı -9'dan küçük olduğu için -5/6 < -3/4'tür.\"\n• Ece: \"Hayır, pozitif sayılarda 10, 9'dan büyük olduğu için negatifte de -10/12 daha büyüktür.\"",
                "questionText": "Mert ve Ece'den hangisinin argümanı doğrudur? Sayı doğrusu üzerindeki konumlarını ve sıfıra olan mesafelerini gerekçe göstererek açıklayınız.",
                "solutionExplanation": "Mert haklıdır. Sayı doğrusunda sola gidildikçe sayılar küçülür, -10/12 daha soldadır.",
                "modelAnswer": "Mert haklıdır. Paydalar 12'de eşitlendiğinde -3/4 = -9/12 ve -5/6 = -10/12 olur. Sayı doğrusunda sıfırın solundaki negatif sayılarda sıfırdan uzaklaştıkça sayı küçülür. -10/12 sayısı sayı doğrusunda -9/12'nin daha solundadır. Bu nedenle -5/6 < -3/4 sıralaması doğrudur.",
                "rubric": [
                    {"criterion": "Mert'in haklı olduğunun doğru tespiti", "points": 5},
                    {"criterion": "Sayı doğrusundaki sol-sağ kuralı ve payda eşitleme ile bilimsel gerekçelendirme", "points": 10}
                ]
            },
            {
                "questionNumber": 5,
                "outcomeCode": "MAT.7.1.3",
                "outcomeTitle": "MAT.7.1.3. Rasyonel sayıların karşılaştırma ve sıralama ilişkilerini yorumlayabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Hata Tespiti & Adım Analizi",
                "points": 15,
                "contextText": "Kesirleri yarıma ve bütüne yakınlığa göre sıralama.",
                "stimulus": "Verilen rasyonel sayılar: A = 7/15, B = 9/10, C = 4/7.",
                "questionText": "A, B ve C rasyonel sayılarını payda eşitlemeden, 'yarıma ve bütüne yakınlık' stratejisini kullanarak küçükten büyüğe sıralayınız. Sıralamadaki mantığınızı açıklayınız.",
                "solutionExplanation": "A yarımdan küçük (7/15 < 7.5/15), C yarımdan büyük (4/7 > 3.5/7), B bütüne çok yakın (9/10). Sıralama: A < C < B.",
                "modelAnswer": "• A = 7/15: Yarım 7,5/15 olduğu için A sayısı yarımdan küçüktür (A < 1/2).\n• C = 4/7: Yarım 3,5/7 olduğu için C sayısı yarımdan büyüktür (C > 1/2).\n• B = 9/10: Bütüne (1 tam) sadece 1/10 kalmıştır, 1'e çok yakındır.\nBu durumda sıralama: A < C < B (7/15 < 4/7 < 9/10) şeklindedir.",
                "rubric": [
                    {"criterion": "A, B ve C'nin yarıma/bütüne durumlarının doğru analiz edilmesi", "points": 8},
                    {"criterion": "A < C < B sıralamasının hatasız yapılması", "points": 7}
                ]
            },
            {
                "questionNumber": 6,
                "outcomeCode": "MAT.7.1.4",
                "outcomeTitle": "MAT.7.1.4. Rasyonel sayılar ve işlemler içeren gerçek yaşam problemlerini çözebilme",
                "difficulty": "Zor",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 15,
                "contextText": "Rasyonel sayılarla marangoz tahta kesim problemi.",
                "stimulus": "Bir marangoz 180 cm uzunluğundaki ahşap çıtayı, her birinin uzunluğu 7 tam 1/2 cm olan eşit parçalara ayırmak istemektedir. Her bir kesim işlemi 15 saniye sürmektedir.",
                "questionText": "a) Bu çıtadan kaç adet parça elde edilir? İşlemini gösteriniz.\nb) Tüm kesim işlemlerinin toplamda kaç saniye süreceğini hesaplayınız. (Püf noktaya dikkat ediniz!).",
                "solutionExplanation": "Parça sayısı: 180 / (15/2) = 180 * 2 / 15 = 24 parça. Kesim sayısı = parça sayısı - 1 = 23 kesim! 23 * 15 = 345 saniye.",
                "modelAnswer": "a) 7 tam 1/2 = 15/2 cm.\nParça Sayısı = 180 ÷ (15/2) = 180 × (2/15) = 12 × 2 = 24 adet parça elde edilir.\nb) TUZAK / PÜF NOKTA: 24 parça elde etmek için (24 - 1) = 23 kesim yapılır!\nToplam Süre = 23 kesim × 15 saniye = 345 saniye sürer (5 dakika 45 saniye).",
                "rubric": [
                    {"criterion": "a şıkkında rasyonel bölme ile 24 parça sonucunun bulunması", "points": 8},
                    {"criterion": "b şıkkında kesim sayısının 23 olarak alınıp 345 saniyenin hesaplanması", "points": 7}
                ]
            },
            {
                "questionNumber": 7,
                "outcomeCode": "MAT.7.1.4",
                "outcomeTitle": "MAT.7.1.4. Rasyonel sayılar ve işlemler içeren gerçek yaşam problemlerini çözebilme",
                "difficulty": "Zor",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 10,
                "contextText": "Kalanın kesri türünden problem.",
                "stimulus": "Ali Bey maaşının 1/4'ünü ev kirasına, kalan parasının 2/5'ini mutfak masraflarına harcamıştır. Geriye 18.000 TL parası kalmıştır.",
                "questionText": "Ali Bey'in toplam aylık maaşı kaç TL'dir? Adım adım modelleyerek veya işlem basamaklarıyla çözünüz.",
                "solutionExplanation": "Kira: 1/4, Kalan: 3/4. Mutfak: 3/4 * 2/5 = 6/20 = 3/10. Toplam harcanan: 1/4 + 3/10 = 5/20 + 6/20 = 11/20. Kalan: 9/20 = 18.000 TL ise Tamamı = 40.000 TL.",
                "modelAnswer": "• Kira sonrası kalan kısım: 1 - 1/4 = 3/4.\n• Mutfak masrafı: 3/4 × 2/5 = 6/20 = 3/10.\n• Toplam harcanan: 1/4 + 3/10 = 5/20 + 6/20 = 11/20.\n• Geriye kalan kesir: 1 - 11/20 = 9/20.\n• 9 birim = 18.000 TL ise 1 birim = 18.000 ÷ 9 = 2.000 TL.\n• Ali Bey'in toplam maaşı: 20 × 2.000 = 40.000 TL'dir.",
                "rubric": [
                    {"criterion": "Kalan kesrin (9/20) doğru modellenmesi/hesaplanması", "points": 5},
                    {"criterion": "Toplam maaşın (40.000 TL) doğru bulunması", "points": 5}
                ]
            }
        ]
    },

    # SENARYO 2 (5 Questions, 100 Puan)
    # Dağılım: MAT.7.1.1 (1), MAT.7.1.2 (1), MAT.7.1.3 (1), MAT.7.1.4 (2)
    {
        "id": "exam_7_matematik_1_1_senaryo_2",
        "grade": 7,
        "subjectId": "matematik",
        "examTerm": "1_donem_1_yazili",
        "scenarioId": "senaryo_2",
        "title": "7. Sınıf Matematik 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 2) (5 Soru)",
        "description": "MEB ÖDSGM 7. Sınıf Matematik 2. Senaryo resmi konu soru dağılımına uygun 100 puanlık sınav kağıdı.",
        "totalPoints": 100,
        "durationMinutes": 40,
        "instructions": [
            "Sınav süresi 40 dakikadır.",
            "Tüm sorular açık uçludur; işlemlerinizi gösteriniz.",
            "Her soru 20 puandır."
        ],
        "questions": [
            {
                "questionNumber": 1,
                "outcomeCode": "MAT.7.1.1",
                "outcomeTitle": "MAT.7.1.1. Gerçek yaşam ya da matematiksel durumlarda doğal sayı, tam sayı ve rasyonel sayıları yorumlayabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Görsel / Deney / Günlük Hayat Durumu",
                "points": 20,
                "contextText": "Deniz seviyesine göre konumlar ve tam sayılar.",
                "stimulus": "Bir deniz araştırmasında üç farklı gözlem noktasının deniz seviyesine göre konumları belirlenmiştir:\n• Araştırma Dalgıcı: Deniz seviyesinin 45 m altında (-45 m)\n• Keşif Denizaltısı: Deniz seviyesinin 120 m altında (-120 m)\n• Gözlem Helikopteri: Deniz seviyesinin 80 m üstünde (+80 m)",
                "questionText": "a) Gözlem helikopteri ile keşif denizaltısı arasındaki dikey mesafe kaç metredir? İşlemini yazınız.\nb) Bir balık sürüsü dalgıç ile denizaltının tam orta noktasında bulunduğuna göre, balık sürüsünün konumunu gösteren tam sayı kaçtır?",
                "solutionExplanation": "a) (+80) - (-120) = 200 m. b) Orta nokta: [(-45) + (-120)] / 2 = -165 / 2 = -82,5 m.",
                "modelAnswer": "a) Helikopter (+80) ve denizaltı (-120) arasındaki dikey mesafe: (+80) - (-120) = 80 + 120 = 200 metredir.\nb) Dalgıç (-45) ve denizaltı (-120) orta noktası: [(-45) + (-120)] ÷ 2 = -165 ÷ 2 = -82,5 m (veya -82 tam 1/2 m).",
                "rubric": [
                    {"criterion": "a şıkkında 200 metre dikey mesafenin işlemle bulunması", "points": 10},
                    {"criterion": "b şıkkında orta noktanın (-82,5 m) doğru hesaplanması", "points": 10}
                ]
            },
            {
                "questionNumber": 2,
                "outcomeCode": "MAT.7.1.2",
                "outcomeTitle": "MAT.7.1.2. Gerçek yaşam durumlarında rasyonel sayıların ondalık gösterimlerini yansıtabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 20,
                "contextText": "Devirli ondalık sayıyı en sade rasyonel kesre çevirme.",
                "stimulus": "Verilen devirli ondalık sayı: 1,454545... (1,45; 45 devrediyor).",
                "questionText": "1,45 devirli ondalık sayısını rasyonel sayıya çeviriniz ve en sade haline getirerek pay ile paydasının toplamını bulunuz.",
                "solutionExplanation": "(145 - 1) / 99 = 144 / 99. 9'a böl: 16 / 11. Toplam: 16 + 11 = 27.",
                "modelAnswer": "• Kesir formülü: (145 - 1) / 99 = 144 / 99\n• Sadeleştirme (9 ile): 144 ÷ 9 = 16, 99 ÷ 9 = 11. En sade kesir: 16 / 11.\n• Pay ve payda toplamı: 16 + 11 = 27 bulunur.",
                "rubric": [
                    {"criterion": "144 / 99 kesrinin doğru oluşturulması", "points": 10},
                    {"criterion": "16 / 11 en sade kesrinin ve 27 toplamının bulunması", "points": 10}
                ]
            },
            {
                "questionNumber": 3,
                "outcomeCode": "MAT.7.1.3",
                "outcomeTitle": "MAT.7.1.3. Rasyonel sayıların karşılaştırma ve sıralama ilişkilerini yorumlayabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Görsel / Deney / Günlük Hayat Durumu",
                "points": 20,
                "contextText": "Koşucuların sürelerini sıralama.",
                "stimulus": "Bir atletizm yarışında 1000 metrelik parkuru üç sporcunun tamamlama süreleri dakika cinsinden şöyledir:\n• Kerem: 7/4 dakika\n• Selim: 11/6 dakika\n• Burak: 9/5 dakika",
                "questionText": "a) Bu üç sporcunun parkuru bitirme sürelerini paydalarını eşitleyerek küçükten büyüğe doğru sıralayınız.\nb) Yarışı birinci (en hızlı) bitiren sporcu kimdir? Nedenini açıklayınız.",
                "solutionExplanation": "Paydalar 60'ta eşitlenir: Kerem 105/60, Selim 110/60, Burak 108/60. 105/60 < 108/60 < 110/60. En az süre Kerem'dir, birinci Kerem'dir.",
                "modelAnswer": "a) Paydalar EKOK(4, 6, 5) = 60'ta eşitlenir:\n• Kerem: 7/4 = (7×15)/(4×15) = 105/60 dakika\n• Selim: 11/6 = (11×10)/(6×10) = 110/60 dakika\n• Burak: 9/5 = (9×12)/(5×12) = 108/60 dakika\nSüre sıralaması: 105/60 < 108/60 < 110/60 yani Kerem < Burak < Selim (7/4 < 9/5 < 11/6).\nb) Yarışı en az sürede tamamlayan en hızlıdır. Süresi en küçük olan KEREM (7/4 dk) yarışı 1. bitirmiştir.",
                "rubric": [
                    {"criterion": "Paydaların 60'ta eşitlenerek kesirlerin doğru sıralanması", "points": 12},
                    {"criterion": "En az sürenin birinci olacağı mantığıyla Kerem'in kazandığının açıklanması", "points": 8}
                ]
            },
            {
                "questionNumber": 4,
                "outcomeCode": "MAT.7.1.4",
                "outcomeTitle": "MAT.7.1.4. Rasyonel sayılar ve işlemler içeren gerçek yaşam problemlerini çözebilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 20,
                "contextText": "Zeytinyağı şişeleme problemi.",
                "stimulus": "Bir üretici 45 litre zeytinyağını her biri 3/4 litre yağ alan cam şişelere tamamen dolduracaktır. Şişelerin tanesi 12 TL'den satılacaktır.",
                "questionText": "a) Bu işlem için toplam kaç adet şişe gereklidir? İşlemini gösteriniz.\nb) Tüm şişeler satıldığında üreticinin elde edeceği toplam gelir kaç TL olur?",
                "solutionExplanation": "Şişe sayısı = 45 / (3/4) = 45 * 4 / 3 = 60 şişe. Gelir = 60 * 12 = 720 TL.",
                "modelAnswer": "a) Şişe Sayısı = 45 ÷ (3/4) = 45 × (4/3) = (45 ÷ 3) × 4 = 15 × 4 = 60 adet şişe gereklidir.\nb) Toplam Gelir = 60 şişe × 12 TL = 720 TL elde edilir.",
                "rubric": [
                    {"criterion": "Rasyonel bölme ile 60 şişe sayısının doğru bulunması", "points": 12},
                    {"criterion": "Toplam gelirin (720 TL) doğru hesaplanması", "points": 8}
                ]
            },
            {
                "questionNumber": 5,
                "outcomeCode": "MAT.7.1.4",
                "outcomeTitle": "MAT.7.1.4. Rasyonel sayılar ve işlemler içeren gerçek yaşam problemlerini çözebilme",
                "difficulty": "Zor",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 20,
                "contextText": "Su deposu boşaltma ve kesir hesaplama.",
                "stimulus": "Tamamı 600 litre su alan bir deponun başlangıçta 3/5'i doludur. Depodaki suyun 1/4'ü bahçe sulamasında kullanılmıştır.",
                "questionText": "a) Bahçe sulandıktan sonra depoda kaç litre su kalmıştır?\nb) Kalan suyun depoyu tamamen doldurabilmesi için depoya kaç litre daha su eklenmelidir?",
                "solutionExplanation": "Başlangıç: 600 * 3/5 = 360 L. Kullanılan: 360 * 1/4 = 90 L. Kalan: 360 - 90 = 270 L. Eksik: 600 - 270 = 330 L.",
                "modelAnswer": "a) Başlangıçtaki su: 600 × 3/5 = 360 litre.\nKullanılan su: 360 × 1/4 = 90 litre.\nKalan su: 360 - 90 = 270 litre su kalmıştır.\nb) Deponun tam dolması için gereken su: 600 - 270 = 330 litre daha su eklenmelidir.",
                "rubric": [
                    {"criterion": "Kalan su miktarının (270 L) adım adım doğru bulunması", "points": 12},
                    {"criterion": "Eklenmesi gereken suyun (330 L) doğru hesaplanması", "points": 8}
                ]
            }
        ]
    },

    # SENARYO 3 (7 Questions, 100 Puan)
    # Dağılım: MAT.7.1.1 (2), MAT.7.1.2 (2), MAT.7.1.3 (2), MAT.7.1.4 (1)
    {
        "id": "exam_7_matematik_1_1_senaryo_3",
        "grade": 7,
        "subjectId": "matematik",
        "examTerm": "1_donem_1_yazili",
        "scenarioId": "senaryo_3",
        "title": "7. Sınıf Matematik 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 3) (7 Soru)",
        "description": "MEB ÖDSGM 7. Sınıf Matematik 3. Senaryo resmi konu soru dağılımına uygun 100 puanlık sınav kağıdı.",
        "totalPoints": 100,
        "durationMinutes": 40,
        "instructions": [
            "Sınav süresi 40 dakikadır.",
            "Tüm sorular açık uçludur; çözümlerinizi gerekçelendiriniz."
        ],
        "questions": [
            {
                "questionNumber": 1,
                "outcomeCode": "MAT.7.1.1",
                "outcomeTitle": "MAT.7.1.1. Gerçek yaşam ya da matematiksel durumlarda doğal sayı, tam sayı ve rasyonel sayıları yorumlayabilme",
                "difficulty": "Kolay",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 15,
                "contextText": "Şirket kâr-zarar tablosu ve yönlü sayılar.",
                "stimulus": "Bir teknoloji mağazasının yılın ilk 4 ayındaki net kâr/zarar durumu şöyledir:\n• Ocak: +45.000 TL\n• Şubat: -18.000 TL\n• Mart: +32.000 TL\n• Nisan: -25.000 TL",
                "questionText": "a) Bu 4 ayın sonunda mağazanın net kâr-zarar durumu kaç TL'dir? İşlem basamaklarını gösteriniz.\nb) En çok kâr edilen ay ile en çok zarar edilen ay arasındaki mali fark kaç TL'dir?",
                "solutionExplanation": "a) (+45000 - 18000 + 32000 - 25000) = +34.000 TL kâr. b) (+45.000) - (-25.000) = 70.000 TL.",
                "modelAnswer": "a) Net durum: (+45.000) + (-18.000) + (+32.000) + (-25.000) = 77.000 - 43.000 = +34.000 TL (34.000 TL kârdadır).\nb) En çok kâr: +45.000 TL, En çok zarar: -25.000 TL. Fark: (+45.000) - (-25.000) = 45.000 + 25.000 = 70.000 TL'dir.",
                "rubric": [
                    {"criterion": "a şıkkında 4 aylık toplam net durumun (+34.000 TL) doğru bulunması", "points": 8},
                    {"criterion": "b şıkkında tam sayılarda çıkarma ile 70.000 TL farkın bulunması", "points": 7}
                ]
            },
            {
                "questionNumber": 2,
                "outcomeCode": "MAT.7.1.1",
                "outcomeTitle": "MAT.7.1.1. Gerçek yaşam ya da matematiksel durumlarda doğal sayı, tam sayı ve rasyonel sayıları yorumlayabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Görsel / Deney / Günlük Hayat Durumu",
                "points": 15,
                "contextText": "Sayı doğrusu üzerinde tam sayı ve rasyonel sayı eşleme.",
                "stimulus": "Sayı doğrusunda -3 ile -2 arası 4 eşit parçaya; +1 ile +2 arası ise 3 eşit parçaya bölünmüştür.\n• K noktası: -3 ile -2 arasında, -3'ten sağa doğru 3. bölme işaretidir.\n• L noktası: +1 ile +2 arasında, +1'den sağa doğru 2. bölme işaretidir.",
                "questionText": "K ve L noktalarına karşılık gelen rasyonel sayıları tam sayılı ve bileşik kesir biçiminde yazınız.",
                "solutionExplanation": "K = -3 + 3/4 = -2 tam 1/4 = -9/4. L = 1 tam 2/3 = 5/3.",
                "modelAnswer": "• K noktası: -2 ile -3 arasında, -2'den sola doğru 1 birim veya -3'ten sağa doğru 3 birimdir: -2 tam 1/4 = -9/4 rasyonel sayısıdır.\n• L noktası: 1 ile 2 arasında 2. bölmedir: 1 tam 2/3 = +5/3 rasyonel sayısıdır.",
                "rubric": [
                    {"criterion": "K noktasının (-2 tam 1/4 veya -9/4) doğru bulunması", "points": 8},
                    {"criterion": "L noktasının (1 tam 2/3 veya 5/3) doğru bulunması", "points": 7}
                ]
            },
            {
                "questionNumber": 3,
                "outcomeCode": "MAT.7.1.2",
                "outcomeTitle": "MAT.7.1.2. Gerçek yaşam durumlarında rasyonel sayıların ondalık gösterimlerini yansıtabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 15,
                "contextText": "Farklı devirli sayıyı kesre dönüştürme.",
                "stimulus": "Verilen devirli ondalık sayı: 0,727272... (0,72; 72 devrediyor).",
                "questionText": "Bu sayıyı kesir çizgisi kullanarak rasyonel sayıya çeviriniz ve en sade biçimde yazınız.",
                "solutionExplanation": "72 / 99 = 8 / 11.",
                "modelAnswer": "Formül: (72 - 0) / 99 = 72 / 99.\nSadeleştirme (9 ile): 72 ÷ 9 = 8, 99 ÷ 9 = 11. En sade hali: 8 / 11'dir.",
                "rubric": [
                    {"criterion": "72 / 99 kesrinin doğru oluşturulması", "points": 8},
                    {"criterion": "8 / 11 en sade kesrinin bulunması", "points": 7}
                ]
            },
            {
                "questionNumber": 4,
                "outcomeCode": "MAT.7.1.2",
                "outcomeTitle": "MAT.7.1.2. Gerçek yaşam durumlarında rasyonel sayıların ondalık gösterimlerini yansıtabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Hata Tespiti & Adım Analizi",
                "points": 15,
                "contextText": "Sadece bir basamağı devreden devirli ondalık sayı.",
                "stimulus": "Verilen sayı: 3,1666... (3,16; sadece 6 devrediyor).",
                "questionText": "Bu sayıyı rasyonel sayıya dönüştürünüz. Paydasında neden bir tane 9 ve bir tane 0 olduğunu kuralıyla açıklayınız.",
                "solutionExplanation": "(316 - 31) / 90 = 285 / 90 = 19 / 6. Virgülden sonra bir devreden (9), bir devretmeyen (0).",
                "modelAnswer": "Formül: (316 - 31) / 90 = 285 / 90.\nPayda kuralı: Virgülden sonraki kısımda devreden basamak sayısı kadar 9 (bir tane 6 var -> 9), devretmeyen basamak sayısı kadar 0 (bir tane 1 var -> 0) yazılır, payda 90 olur.\nEn sade kesir: 285 ÷ 15 = 19, 90 ÷ 15 = 6 yani 19 / 6 (veya 3 tam 1/6).",
                "rubric": [
                    {"criterion": "(316 - 31)/90 işleminin doğru kurulması ve sonucun bulunması", "points": 8},
                    {"criterion": "Payda kuralının (bir 9, bir 0) doğru açıklanması", "points": 7}
                ]
            },
            {
                "questionNumber": 5,
                "outcomeCode": "MAT.7.1.3",
                "outcomeTitle": "MAT.7.1.3. Rasyonel sayıların karşılaştırma ve sıralama ilişkilerini yorumlayabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 15,
                "contextText": "Negatif kesirlerin sıralanması.",
                "stimulus": "Verilen sayılar: x = -3/5, y = -7/10, z = -1/2.",
                "questionText": "x, y ve z rasyonel sayılarını paydalarını eşitleyerek küçükten büyüğe sıralayınız.",
                "solutionExplanation": "Payda 10: x = -6/10, y = -7/10, z = -5/10. -7/10 < -6/10 < -5/10 -> y < x < z.",
                "modelAnswer": "Paydalar 10'da eşitlenir:\n• x = -3/5 = -6/10\n• y = -7/10\n• z = -1/2 = -5/10\nNegatif sayılarda sıfırdan en uzak olan en küçüktür: -7/10 < -6/10 < -5/10 olduğundan;\nSıralama: y < x < z (-7/10 < -3/5 < -1/2) şeklindedir.",
                "rubric": [
                    {"criterion": "Paydaların 10'da doğru eşitlenmesi", "points": 8},
                    {"criterion": "y < x < z negatif sıralamasının doğru yapılması", "points": 7}
                ]
            },
            {
                "questionNumber": 6,
                "outcomeCode": "MAT.7.1.3",
                "outcomeTitle": "MAT.7.1.3. Rasyonel sayıların karşılaştırma ve sıralama ilişkilerini yorumlayabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Öğrenci Diyaloğu & Kavram Yanılgısı",
                "points": 15,
                "contextText": "Rasyonel sayılarda işlem önceliği.",
                "stimulus": "İşlem: [(-2/3) + (1/2)] ÷ (-5/6).\n• Can: 'Önce parantez içindeki toplama için payda eşitlenir, ardından bölme çarpma kuralına dönüştürülür.'\n• Alp: 'Bölme işlemi toplamadan önceliklidir, önce 1/2'yi -5/6'ya bölmeliyiz.'",
                "questionText": "Hangi öğrencinin işlem sırası kuralı doğrudur? Doğru işlem adımlarını uygulayarak işlemin sonucunu bulunuz.",
                "solutionExplanation": "Parantez içi önceliklidir, Can haklıdır. (-4/6 + 3/6) = -1/6. (-1/6) / (-5/6) = (-1/6) * (-6/5) = +1/5.",
                "modelAnswer": "Can haklıdır. Çünkü matematiksel işlem önceliğinde parantez içi daima ilk sırada yapılır.\n1. Adım (Parantez içi): (-2/3) + (1/2) = (-4/6) + (3/6) = -1/6.\n2. Adım (Bölme): (-1/6) ÷ (-5/6) = (-1/6) × (-6/5) = +6/30 = +1/5 bulunur.",
                "rubric": [
                    {"criterion": "Can'ın haklı olduğunun doğru gerekçeyle açıklanması", "points": 6},
                    {"criterion": "Parantez içi toplama ve bölme işlemleriyle +1/5 sonucunun bulunması", "points": 9}
                ]
            },
            {
                "questionNumber": 7,
                "outcomeCode": "MAT.7.1.4",
                "outcomeTitle": "MAT.7.1.4. Rasyonel sayılar ve işlemler içeren gerçek yaşam problemlerini çözebilme",
                "difficulty": "Zor",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 10,
                "contextText": "Adım uzunluğu ile mesafe ölçme.",
                "stimulus": "Kaan'ın bir adımının uzunluğu 3/5 metredir. Kaan evinden okula giderken 450 adım atmıştır.",
                "questionText": "a) Ev ile okul arasındaki mesafe kaç metredir?\nb) Kaan'ın kardeşi Efe'nin bir adımı 1/2 metre olduğuna göre Efe bu yolu kaç adımda gider?",
                "solutionExplanation": "a) 450 * 3/5 = 270 m. b) 270 / (1/2) = 540 adım.",
                "modelAnswer": "a) Yol = 450 × (3/5) = (450 ÷ 5) × 3 = 90 × 3 = 270 metredir.\nb) Efe'nin adım sayısı = 270 ÷ (1/2) = 270 × 2 = 540 adım atar.",
                "rubric": [
                    {"criterion": "a şıkkında 270 metrenin bulunması", "points": 5},
                    {"criterion": "b şıkkında 540 adım sayısının bulunması", "points": 5}
                ]
            }
        ]
    },

    # SENARYO 4 (6 Questions, 100 Puan)
    # Dağılım: MAT.7.1.1 (2), MAT.7.1.2 (2), MAT.7.1.3 (2)
    {
        "id": "exam_7_matematik_1_1_senaryo_4",
        "grade": 7,
        "subjectId": "matematik",
        "examTerm": "1_donem_1_yazili",
        "scenarioId": "senaryo_4",
        "title": "7. Sınıf Matematik 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 4) (6 Soru)",
        "description": "MEB ÖDSGM 7. Sınıf Matematik 4. Senaryo resmi konu soru dağılımına uygun 100 puanlık sınav kağıdı.",
        "totalPoints": 100,
        "durationMinutes": 40,
        "instructions": [
            "Sınav süresi 40 dakikadır.",
            "Tüm sorular açık uçludur; işlemlerinizi gösteriniz."
        ],
        "questions": [
            {
                "questionNumber": 1,
                "outcomeCode": "MAT.7.1.1",
                "outcomeTitle": "MAT.7.1.1. Gerçek yaşam ya da matematiksel durumlarda doğal sayı, tam sayı ve rasyonel sayıları yorumlayabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Görsel / Deney / Günlük Hayat Durumu",
                "points": 17,
                "contextText": "Dağ zirvesi ile vadi arasındaki sıcaklık farkı.",
                "stimulus": "Ağrı Dağı'nın zirvesinde hava sıcaklığı -16 °C iken, aynı anda eteklerindeki Iğdır Ovası'nda hava sıcaklığı +8 °C olarak ölçülmüştür.",
                "questionText": "a) Ova ile zirve arasındaki sıcaklık farkını tam sayılarda çıkarma işlemi olarak ifade edip sonucunu bulunuz.\nb) Dağa tırmanan bir dağcı her 200 metre yükselişte sıcaklığın 1 °C düştüğünü bilmektedir. Buna göre ova ile zirve arasındaki yükseklik farkı yaklaşık kaç metredir?",
                "solutionExplanation": "a) (+8) - (-16) = 24 °C. b) 24 * 200 = 4800 metre.",
                "modelAnswer": "a) Sıcaklık farkı: (+8) - (-16) = 8 + 16 = 24 °C'dir.\nb) 1 °C düşüş için 200 m tırmanılıyorsa; 24 °C fark için: 24 × 200 = 4.800 metre yükseklik farkı vardır.",
                "rubric": [
                    {"criterion": "a şıkkında 24 °C sıcaklık farkının bulunması", "points": 9},
                    {"criterion": "b şıkkında 4.800 metre yükseklik farkının hesaplanması", "points": 8}
                ]
            },
            {
                "questionNumber": 2,
                "outcomeCode": "MAT.7.1.1",
                "outcomeTitle": "MAT.7.1.1. Gerçek yaşam ya da matematiksel durumlarda doğal sayı, tam sayı ve rasyonel sayıları yorumlayabilme",
                "difficulty": "Kolay",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 17,
                "contextText": "Akıllı bina asansörü kat hareketleri.",
                "stimulus": "Bir alışveriş merkezinde zemin kat 0, otopark katları -1, -2, -3; mağaza ve ofis katları ise +1'den +15'e kadar numaralandırılmıştır.\nAsansöre -2. kattan binen Leyla Hanım, önce 9 kat yukarı çıkmış; ardından 4 kat aşağı inmiştir.",
                "questionText": "Leyla Hanım'ın son durumda bulunduğu katı tam sayı işlemi yazarak hesaplayınız.",
                "solutionExplanation": "(-2) + (+9) + (-4) = +3. kat.",
                "modelAnswer": "İşlem: (-2) + (+9) + (-4) = +7 + (-4) = +3. kat.\nLeyla Hanım son durumda 3. mağaza katındadır.",
                "rubric": [
                    {"criterion": "Tam sayı toplama/çıkarma işleminin doğru yazılması", "points": 9},
                    {"criterion": "+3. kat sonucunun doğru bulunması", "points": 8}
                ]
            },
            {
                "questionNumber": 3,
                "outcomeCode": "MAT.7.1.2",
                "outcomeTitle": "MAT.7.1.2. Gerçek yaşam durumlarında rasyonel sayıların ondalık gösterimlerini yansıtabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 17,
                "contextText": "Devirli ondalık sayıyı kesre çevirme.",
                "stimulus": "Verilen sayı: 0,8333... (0,83; sadece 3 devrediyor).",
                "questionText": "0,83 devirli ondalık sayısını rasyonel sayıya çeviriniz ve en sade haline getiriniz.",
                "solutionExplanation": "(83 - 8) / 90 = 75 / 90 = 5 / 6.",
                "modelAnswer": "Formül: (83 - 8) / 90 = 75 / 90.\nSadeleştirme (15 ile): 75 ÷ 15 = 5, 90 ÷ 15 = 6.\nEn sade kesir: 5 / 6'dır.",
                "rubric": [
                    {"criterion": "Formül ile 75 / 90 kesrinin bulunması", "points": 9},
                    {"criterion": "15 ile sadeleştirilerek 5 / 6 kesrinin elde edilmesi", "points": 8}
                ]
            },
            {
                "questionNumber": 4,
                "outcomeCode": "MAT.7.1.2",
                "outcomeTitle": "MAT.7.1.2. Gerçek yaşam durumlarında rasyonel sayıların ondalık gösterimlerini yansıtabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 17,
                "contextText": "Ondalık basamak çözümlemesi ve kesir karşılığı.",
                "stimulus": "Bir yakıt sayacında depoya aktarılan benzin miktarı 4,375 litre olarak görünmektedir.",
                "questionText": "4,375 ondalık gösterimini tam sayılı kesir ve en sade bileşik kesir olarak yazınız.",
                "solutionExplanation": "4 tam 375/1000 = 4 tam 3/8 = 35/8.",
                "modelAnswer": "4,375 = 4 tam 375/1000.\n375 ve 1000 sayıları 125'e bölünür: 375 ÷ 125 = 3, 1000 ÷ 125 = 8.\n• Tam sayılı kesir: 4 tam 3/8\n• Bileşik kesir: (4×8 + 3)/8 = 35/8'dir.",
                "rubric": [
                    {"criterion": "4 tam 3/8 tam sayılı kesrinin bulunması", "points": 9},
                    {"criterion": "35/8 en sade bileşik kesrinin yazılması", "points": 8}
                ]
            },
            {
                "questionNumber": 5,
                "outcomeCode": "MAT.7.1.3",
                "outcomeTitle": "MAT.7.1.3. Rasyonel sayıların karşılaştırma ve sıralama ilişkilerini yorumlayabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 16,
                "contextText": "Payları eşit kesirlerin sıralanması.",
                "stimulus": "Verilen rasyonel sayılar: K = 12/17, L = 12/19, M = 12/13.",
                "questionText": "Payları eşit olan pozitif rasyonel sayıların sıralama kuralını yazarak K, L ve M sayılarını büyükten küçüğe sıralayınız.",
                "solutionExplanation": "Paylar eşitse paydası küçük olan daha büyüktür. M > K > L.",
                "modelAnswer": "Kural: Payları eşit olan pozitif rasyonel sayılarda; paydası KÜÇÜK olan kesir daha BÜYÜKTÜR (çünkü bütünü daha az parçaya bölmüştür).\nPaydalar: 13 < 17 < 19 olduğu için;\nSıralama: M > K > L (12/13 > 12/17 > 12/19) şeklindedir.",
                "rubric": [
                    {"criterion": "Payı eşit kesirlerin kuralının doğru ifade edilmesi", "points": 8},
                    {"criterion": "M > K > L sıralamasının doğru yapılması", "points": 8}
                ]
            },
            {
                "questionNumber": 6,
                "outcomeCode": "MAT.7.1.3",
                "outcomeTitle": "MAT.7.1.3. Rasyonel sayıların karşılaştırma ve sıralama ilişkilerini yorumlayabilme",
                "difficulty": "Zor",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Hata Tespiti & Adım Analizi",
                "points": 16,
                "contextText": "Çok adımlı rasyonel işlemde hata analizi.",
                "stimulus": "Efe tahtadaki (1 - 1/3) × (1 + 1/2) işlemini şu adımlarla çözmüştür:\n1. Adım: (1 - 1/3) = 2/3\n2. Adım: (1 + 1/2) = 3/2\n3. Adım: (2/3) × (3/2) = 6/6 = 1",
                "questionText": "a) Efe'nin çözüm adımlarında hata var mıdır? İnceleyiniz.\nb) Eğer işlem [(1 - 1/3) ÷ (1 + 1/2)] şeklinde olsaydı doğru sonuç kaç olurdu? İşlemini yapınız.",
                "solutionExplanation": "a) Çözüm doğrudur, hata yoktur. b) (2/3) / (3/2) = 2/3 * 2/3 = 4/9.",
                "modelAnswer": "a) Efe'nin adımları tamamen doğrudur, hiçbir işlem hatası yapmamıştır (2/3 × 3/2 = 1).\nb) Bölme işlemi olsaydı: (2/3) ÷ (3/2) = (2/3) × (2/3) = 4/9 sonucu elde edilirdi.",
                "rubric": [
                    {"criterion": "a şıkkında adımların doğruluğunun teyit edilmesi", "points": 8},
                    {"criterion": "b şıkkında rasyonel bölme ile 4/9 sonucunun bulunması", "points": 8}
                ]
            }
        ]
    }
]

with open('meb_data/grade7_matematik_distinct.json', 'w', encoding='utf-8') as f:
    json.dump(G7_MAT_SCENARIOS, f, ensure_ascii=False, indent=2)

print("Grade 7 Matematik distinct exams generated successfully!")
