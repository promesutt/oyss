# -*- coding: utf-8 -*-
import json

G5_TURKCE_EXAMS = [
    # SENARYO 1 (6 Soru: T.O.5.6: 2, T.O.5.7: 1, T.O.5.20: 1, T.Y.5.13: 1, T.Y.5.16: 1) -> 17, 17, 17, 17, 16, 16 = 100
    {
        "id": "exam_5_turkce_1_1_senaryo_1",
        "grade": 5,
        "subjectId": "turkce",
        "examTerm": "1_donem_1_yazili",
        "scenarioId": "senaryo_1",
        "title": "5. Sınıf Türkçe 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 1) (6 Soru)",
        "description": "MEB ÖDSGM 5. Sınıf Türkçe 1. Senaryo resmi konu soru dağılımına uygun 100 puanlık sınav kağıdı.",
        "totalPoints": 100,
        "durationMinutes": 40,
        "questions": [
            {
                "questionNumber": 1,
                "outcomeCode": "T.O.5.6",
                "outcomeTitle": "T.O.5.6. Metnin yüzey anlamını belirleyebilme",
                "difficulty": "Kolay",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 17,
                "contextText": "Metnin konusunu belirleme.",
                "stimulus": "“Ali o gün dedesinin tavan arasındaki eski ahşap sandığını açtı. Sandığın içinde dedesinin çocukken kendi elleriyle gürgen ağacından yonttuğu rengârenk bir fırıldak (topaç) ve tahta bir araba duruyordu. Dedesi yanına gelip başını okşadı: 'Evlat, biz küçükken oyuncaklarımızı çarşıdan hazır almazdık; doğadan bulduğumuz bir dalla, bir kozalakla günlerce emek verip kendi oyuncağımızı üretirdik. Çünkü insanın kendi emeğiyle yaptığı şey paha biçilemezdir.' dedi.”",
                "questionText": "Yukarıda dedenin torununa ahşap oyuncakları gösterdiği metnin konusunu tek bir cümleyle yazınız.",
                "solutionExplanation": "Metin geleneksel el yapımı oyuncakları ve emek verilerek üretilen şeylerin manevi değerini anlatır.",
                "modelAnswer": "Metnin konusu: Dedenin torununa çocukluk yıllarında emek vererek yaptığı ahşap oyuncakları göstermesi ve kendi emeğiyle üretmenin değerini anlatmasıdır.",
                "rubric": [{"criterion": "Metnin konusunun eksiksiz ve tek cümleyle yazılması", "points": 17}]
            },
            {
                "questionNumber": 2,
                "outcomeCode": "T.O.5.6",
                "outcomeTitle": "T.O.5.6. Metnin yüzey anlamını belirleyebilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Metin İçi Delillendirme & Örtük Anlam",
                "points": 17,
                "contextText": "Metne dayalı açık uçlu kavrama sorusu.",
                "stimulus": "Yukarıda verilen 1. sorudaki ahşap sandık metnini dikkate alınız.",
                "questionText": "Dedesi torununa 'İnsanın kendi emeğiyle yaptığı şey paha biçilemezdir' sözüyle neyi anlatmak istemiştir? Metindeki düşüncelerden hareketle açıklayınız.",
                "solutionExplanation": "Kişinin alın teriyle ve sabırla ürettiği eşyaların maddiyatla ölçülemeyecek bir manevi değere sahip olmasıdır.",
                "modelAnswer": "Dedesi, parayla satın alınan hazır oyuncakların kolayca tüketilebileceğini; ancak insanın kendi alın teri, sabrı ve hayal gücüyle ürettiği bir oyuncağın çok daha kıymetli ve unutulmaz olduğunu anlatmak istemiştir.",
                "rubric": [{"criterion": "Emek ve manevi değer ilişkisinin doğru açıklanması", "points": 17}]
            },
            {
                "questionNumber": 3,
                "outcomeCode": "T.O.5.7",
                "outcomeTitle": "T.O.5.7. Görselle iletilen anlamı belirleyebilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Görsel / Deney / Günlük Hayat Durumu",
                "points": 17,
                "contextText": "Geleneksel ahşap oyuncak ile hazır plastik oyuncak karşılaştırma tablosu.",
                "stimulus": "Aşağıdaki tabloda geleneksel ahşap oyuncaklar ile günümüz plastik oyuncaklarının özellikleri verilmiştir:\n• Ahşap Oyuncak: Doğal ağaçtan yapılır, dayanıklıdır, çocuğun el becerisini ve üreticiliğini geliştirir, çevreye zarar vermez.\n• Plastik Seri Üretim Oyuncak: Fabrikada üretilir, çabuk kırılabilir, çocukta hazır tüketim alışkanlığı yaratır, doğada yüzyıllarca kaybolmaz.",
                "questionText": "Tablodaki verileri çocuk gelişimi ve çevre sağlığı açısından yorumlayınız. Neden ahşap oyuncaklar daha sağlıklı ve yararlıdır? İki gerekçe yazınız.",
                "solutionExplanation": "Doğal malzemedir, kimyasal içermez, üreticiliği destekler ve doğayı kirletmez.",
                "modelAnswer": "1. Çocuk Gelişimi Açısından: Ahşap oyuncaklar çocuğu tüketen değil üreten konumuna getirir, el becerisini ve hayal gücünü geliştirir.\n2. Çevre ve Sağlık Açısından: Tamamen doğal ağaçtan yapıldığı için kimyasal madde içermez ve kırıldığında doğada kolayca çözünerek çevre kirliliği oluşturmaz.",
                "rubric": [
                    {"criterion": "Çocuk gelişimi gerekçesinin doğru açıklanması", "points": 9},
                    {"criterion": "Çevre ve sağlık gerekçesinin doğru açıklanması", "points": 8}
                ]
            },
            {
                "questionNumber": 4,
                "outcomeCode": "T.O.5.20",
                "outcomeTitle": "T.O.5.20. Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 17,
                "contextText": "Kelime tahlili ve cümle kurma.",
                "stimulus": "Metinde geçen 'yadigâr' ve 'paha biçilemez' sözcük öbekleri.",
                "questionText": "a) 'Yadigâr' kelimesinin anlamını yazıp bir cümlede kullanınız.\nb) 'Paha biçilemez' deyiminin ne anlama geldiğini açıklayınız.",
                "solutionExplanation": "Yadigâr: Bir kimseden veya geçmişten hatıra kalan şey. Paha biçilemez: Değerine fiyat konulamayacak kadar kıymetli olan.",
                "modelAnswer": "a) Yadigâr: Geçmişten veya sevilen bir kimseden hatıra olarak kalan değerli eşya demektir. Örnek Cümle: 'Dedemden kalan bu gümüş köstekli saat bizim en kıymetli yadigârımızdır.'\nb) Paha biçilemez: Maddi bir parayla ölçülemeyecek kadar yüksek manevi değere ve öneme sahip olan şeydir.",
                "rubric": [
                    {"criterion": "Yadigâr kelimesinin anlamı ve doğru örnek cümle", "points": 9},
                    {"criterion": "Paha biçilemez deyiminin anlamının doğru açıklanması", "points": 8}
                ]
            },
            {
                "questionNumber": 5,
                "outcomeCode": "T.Y.5.13",
                "outcomeTitle": "T.Y.5.13. Yazısını zenginleştirecek biçimde söz varlığını kullanabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 16,
                "contextText": "Deyimler içeren yaratıcı paragraf tamamlama.",
                "stimulus": "Kullanılacak Deyimler: 'gözü gibi bakmak' ve 'can kulağıyla dinlemek'.",
                "questionText": "Ali'nin dedesinin anlattıklarını dinlerken hissettiklerini ve o topaca sahip çıkışını; içinde 'gözü gibi bakmak' ve 'can kulağıyla dinlemek' deyimlerinin geçtiği 2-3 cümlelik bir anlatımla yazınız.",
                "solutionExplanation": "Öğrenci verilen iki deyimi yerli yerinde kullanarak akıcı bir anlatım kurar.",
                "modelAnswer": "Ali, dedesinin çocukluk anılarını can kulağıyla dinledi ve geçmişin güzelliklerine hayran kaldı. Dedesinin armağan ettiği o ahşap topacı avucuna aldığında, ömrü boyunca bu kıymetli hatıraya gözü gibi bakacağına kendi kendine söz verdi.",
                "rubric": [
                    {"criterion": "İki deyimin yerinde ve anlamına uygun kullanılması", "points": 8},
                    {"criterion": "Cümlelerin anlam bütünlüğü ve akıcılığı", "points": 8}
                ]
            },
            {
                "questionNumber": 6,
                "outcomeCode": "T.Y.5.16",
                "outcomeTitle": "T.Y.5.16. Yazım ve noktalama işaretleriyle ilgili kuralları uygulayabilme",
                "difficulty": "Kolay",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Hata Tespiti & Adım Analizi",
                "points": 16,
                "contextText": "Büyük harflerin yazımı ve nokta/virgül hataları.",
                "stimulus": "Hatalı Cümle: 'ali ile dedesi kastamonu'nun inebolu ilçesinde ahşap oyuncaklar yapardı.'",
                "questionText": "Yukarıdaki cümlede büyük harflerin kullanımıyla ilgili yapılan 3 hatayı bularak cümlenin doğru halini yazınız.",
                "solutionExplanation": "Ali özel isim büyük, Kastamonu büyük, İnebolu büyük.",
                "modelAnswer": "Doğru Cümle: 'Ali ile dedesi, Kastamonu'nun İnebolu ilçesinde ahşap oyuncaklar yapardı.'\n(Hatalar: Ali ismi büyük harfle başlamalı, Kastamonu özel isim olduğu için büyük yazılmalı, İnebolu ilçe adı olduğu için büyük harfle başlamalıdır).",
                "rubric": [
                    {"criterion": "Ali, Kastamonu ve İnebolu büyük harf hatalarının düzeltilmesi", "points": 16}
                ]
            }
        ]
    },

    # SENARYO 2 (6 Soru: T.O.5.5: 1, T.O.5.6: 1, T.O.5.7: 2, T.O.5.15: 1, T.Y.5.16: 1) -> 17, 17, 17, 17, 16, 16 = 100
    {
        "id": "exam_5_turkce_1_1_senaryo_2",
        "grade": 5,
        "subjectId": "turkce",
        "examTerm": "1_donem_1_yazili",
        "scenarioId": "senaryo_2",
        "title": "5. Sınıf Türkçe 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 2) (6 Soru)",
        "description": "MEB ÖDSGM 5. Sınıf Türkçe 2. Senaryo resmi konu soru dağılımına uygun 100 puanlık sınav kağıdı.",
        "totalPoints": 100,
        "durationMinutes": 40,
        "questions": [
            {
                "questionNumber": 1,
                "outcomeCode": "T.O.5.5",
                "outcomeTitle": "T.O.5.5. Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Metin İçi Delillendirme & Örtük Anlam",
                "points": 17,
                "contextText": "Küçük bir karıncanın azim ve çalışkanlığı.",
                "stimulus": "“Güneşli bir yaz sabahı minik karınca Çıtı, yuvasına buğday tanesi taşımaya çalışıyordu. Buğday tanesi kendi cüssesinden ağırdı, yolda defalarca tepeciğin yamacından aşağı yuvarlandı. Fakat Çıtı asla yılmadı; her düşüşte taneyi yeniden sırtlayıp yola koyuldu. Diğer karıncalar da yardıma koşunca buğday yuvanın kapısına ulaştı.”",
                "questionText": "Metindeki altı çizili 'cüsse' ve 'yılmamak' kelimelerinin anlamlarını metin bağlamından hareketle tahmin edip yazınız.",
                "solutionExplanation": "Cüsse beden/vücut iriliği; yılmamak ise zorluklar karşısında pes etmemek, vazgeçmemektir.",
                "modelAnswer": "• Cüsse: Bir canlının vücut büyüklüğü, gövdesi ve ağırlığı demektir.\n• Yılmamak: Karşılaşılan engeller, güçlükler ve başarısızlıklar karşısında vazgeçmemek, pes etmeyip azimle devam etmektir.",
                "rubric": [
                    {"criterion": "Cüsse kelimesinin doğru açıklanması", "points": 9},
                    {"criterion": "Yılmamak fiilinin azim/pes etmeme anlamıyla açıklanması", "points": 8}
                ]
            },
            {
                "questionNumber": 2,
                "outcomeCode": "T.O.5.6",
                "outcomeTitle": "T.O.5.6. Metnin yüzey anlamını belirleyebilme",
                "difficulty": "Kolay",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 17,
                "contextText": "Metnin ana fikrini belirleme.",
                "stimulus": "Yukarıda verilen 1. sorudaki karınca metnini dikkate alınız.",
                "questionText": "Yazarın bu masal/öykü aracılığıyla çocuklara vermek istediği temel ders (ana fikir) nedir?",
                "solutionExplanation": "Zorluklar karşısında pes etmeyenler ve dayanışma gösterenler başarıya ulaşır.",
                "modelAnswer": "Metnin Ana Fikri: Karşılaştığımız engeller ne kadar büyük olursa olsun sabırla gayret gösterir ve pes etmezsek, arkadaşlarımızla iş birliği yaparak her zorluğu aşabiliriz.",
                "rubric": [{"criterion": "Ana fikrin öğüt bildiren tutarlı bir yargı olarak yazılması", "points": 17}]
            },
            {
                "questionNumber": 3,
                "outcomeCode": "T.O.5.7",
                "outcomeTitle": "T.O.5.7. Görselle iletilen anlamı belirleyebilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Görsel / Deney / Günlük Hayat Durumu",
                "points": 17,
                "contextText": "Karınca kolonisi dayanışma çizimi.",
                "stimulus": "Bir fen dergisindeki görselde; onlarca karıncanın birbirine kenetlenerek bir su birikintisi üzerinde canlı bir 'köprü' oluşturduğu ve diğer karıncaların bu köprüden güvenle karşıya geçtiği resmedilmiştir.",
                "questionText": "Bu görselden hareketle karıncaların davranışının insan toplumlarındaki hangi değer ve erdemlerle benzerlik gösterdiğini 2 madde halinde açıklayınız.",
                "solutionExplanation": "Fedakârlık, iş birliği, ortak amaç ve yardımlaşma.",
                "modelAnswer": "1. Yardımlaşma ve İmece Kültürü: Tıpkı zor şartlarda birbirine destek olan insanlar gibi karıncalar da tek başlarına aşamayacakları engeli güçlerini birleştirerek aşmaktadırlar.\n2. Fedakârlık: Köprü olan karıncalar kendi rahatlarını feda ederek toplumun ve koloninin selameti için kendini riske atmaktadır.",
                "rubric": [
                    {"criterion": "İmece ve iş birliği benzerliğinin açıklanması", "points": 9},
                    {"criterion": "Fedakârlık ve ortak amaç bilincinin açıklanması", "points": 8}
                ]
            },
            {
                "questionNumber": 4,
                "outcomeCode": "T.O.5.7",
                "outcomeTitle": "T.O.5.7. Görselle iletilen anlamı belirleyebilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Görsel / Deney / Günlük Hayat Durumu",
                "points": 17,
                "contextText": "Çalışkanlık ve tembellik karşılaştırma afişi.",
                "stimulus": "Bir okul panosunda 'Emek Veren Kazanır' başlıklı afişte bir yanda kışa hazırlık yapan çalışkan karınca, diğer yanda yaz boyu saz çalan ağustos böceği resmedilmiştir.",
                "questionText": "Afişteki zıtlıktan hareketle öğrencilere verilmek istenen mesajı ve bu mesajı destekleyen bir Türk atasözünü yazınız.",
                "solutionExplanation": "Zamanında çalışıp emek veren rahat eder. Atasözü: Yazın başı pişenin kışın aşı pişer (veya Ne doğrarsan aşına o çıkar kaşığına).",
                "modelAnswer": "• Verilen Mesaj: Zamanında çalışıp geleceği için hazırlık yapanlar zor günlerde sıkıntı çekmez; vaktini tembellikle boşa harcayanlar ise sonradan çok pişman olurlar.\n• Destekleyen Atasözü: 'Yazın başı pişenin kışın aşı pişer.' (veya 'Emek olmadan yemek olmaz.')",
                "rubric": [
                    {"criterion": "Afiş mesajının doğru çıkarılması", "points": 9},
                    {"criterion": "Mesajı destekleyen geçerli bir atasözünün yazılması", "points": 8}
                ]
            },
            {
                "questionNumber": 5,
                "outcomeCode": "T.O.5.15",
                "outcomeTitle": "T.O.5.15. Metnin anahtar kelimelerini belirlemeye yönelik çözümleme yapabilme",
                "difficulty": "Kolay",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 16,
                "contextText": "Anahtar kelime tespiti.",
                "stimulus": "Yukarıda verilen 1. sorudaki karınca Çıtı metnini dikkate alınız.",
                "questionText": "Bu metnin içeriğini en iyi özetleyen 3 anahtar kelimeyi yazınız.",
                "solutionExplanation": "Karınca, azim/gayret, yardımlaşma.",
                "modelAnswer": "1. Karınca\n2. Azim (Çalışkanlık)\n3. Yardımlaşma (Dayanışma)",
                "rubric": [{"criterion": "Metni temsil eden 3 anahtar kelimenin doğru yazılması", "points": 16}]
            },
            {
                "questionNumber": 6,
                "outcomeCode": "T.Y.5.16",
                "outcomeTitle": "T.Y.5.16. Yazım ve noktalama işaretleriyle ilgili kuralları uygulayabilme",
                "difficulty": "Kolay",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Hata Tespiti & Adım Analizi",
                "points": 16,
                "contextText": "Noktalama işaretleri (soru işareti ve ünlem).",
                "stimulus": "Cümleler:\n1. 'Sen de bizimle buğday taşımaya gelecek misin ( )'\n2. 'Yaşasın, kışlık erzakımızı tamamladık ( )'",
                "questionText": "Yukarıdaki cümlelerin sonundaki yay ayraçlara ( ) sırasıyla hangi noktalama işaretleri getirilmelidir? Nedenini açıklayınız.",
                "solutionExplanation": "1. cümle soru bildirdiği için soru işareti (?), 2. cümle sevinç/coşku bildirdiği için ünlem işareti (!).",
                "modelAnswer": "1. cümlenin sonuna SORU İŞARETİ (?) getirilmelidir; çünkü cevap alma amacıyla bir soru sorulmuştur.\n2. cümlenin sonuna ÜNLEM İŞARETİ (!) getirilmelidir; çünkü 'Yaşasın' sözcüğüyle sevinç ve coşku duygusu belirtilmiştir.",
                "rubric": [
                    {"criterion": "1. cümleye soru işaretinin getirilmesi ve gerekçesi", "points": 8},
                    {"criterion": "2. cümleye ünlem işaretinin getirilmesi ve gerekçesi", "points": 8}
                ]
            }
        ]
    },

    # SENARYO 3 (7 Soru: T.O.5.5: 1, T.O.5.6: 2, T.O.5.7: 1, T.O.5.15: 1, T.Y.5.13: 1, T.Y.5.16: 1) -> 15, 15, 14, 14, 14, 14, 14 = 100
    {
        "id": "exam_5_turkce_1_1_senaryo_3",
        "grade": 5,
        "subjectId": "turkce",
        "examTerm": "1_donem_1_yazili",
        "scenarioId": "senaryo_3",
        "title": "5. Sınıf Türkçe 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 3) (7 Soru)",
        "description": "MEB ÖDSGM 5. Sınıf Türkçe 3. Senaryo resmi konu soru dağılımına uygun 100 puanlık sınav kağıdı.",
        "totalPoints": 100,
        "durationMinutes": 40,
        "questions": [
            {
                "questionNumber": 1,
                "outcomeCode": "T.O.5.5",
                "outcomeTitle": "T.O.5.5. Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Metin İçi Delillendirme & Örtük Anlam",
                "points": 15,
                "contextText": "Sokak hayvanları için kedi evi yapan çocuklar.",
                "stimulus": "“Kış kapıya dayanmış, ayaz rüzgârlar sokakları sarmıştı. 5-A sınıfı öğrencileri bir araya gelip 'Merhamet Isıtır' adını verdikleri bir kulüp kurdular. Boş koli kutularını su geçirmez naylonlarla kaplayıp içlerine eski kazakları sererek sokaktaki minik dostlarına korunaklı barınaklar hazırladılar. Mahalleli çocukların bu samimi gayretini takdirle karşıladı.”",
                "questionText": "Metindeki altı çizili 'ayaz' ve 'korunaklı' kelimelerinin anlamlarını metnin bağlamına göre tahmin ederek yazınız.",
                "solutionExplanation": "Ayaz: Duru ve çok soğuk kış havası. Korunaklı: Soğuktan, tehlikeden ve dış etkilerden koruyan, güvenli yer.",
                "modelAnswer": "• Ayaz: Kış aylarında bulutsuz gecelerde veya sabahlarda hissedilen çok kuru, keskin ve dondurucu soğuk demektir.\n• Korunaklı: Yağmur, rüzgâr ve soğuk gibi dış etkilerden koruyan, sığınılabilecek güvenli ve korumalı yer demektir.",
                "rubric": [
                    {"criterion": "Ayaz kelimesinin doğru açıklanması", "points": 8},
                    {"criterion": "Korunaklı kelimesinin doğru açıklanması", "points": 7}
                ]
            },
            {
                "questionNumber": 2,
                "outcomeCode": "T.O.5.6",
                "outcomeTitle": "T.O.5.6. Metnin yüzey anlamını belirleyebilme",
                "difficulty": "Kolay",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 15,
                "contextText": "Metnin konusunu belirleme.",
                "stimulus": "Yukarıda verilen 1. sorudaki 'Merhamet Isıtır' metnini dikkate alınız.",
                "questionText": "Yukarıdaki metnin konusunu tek bir cümleyle yazınız.",
                "solutionExplanation": "Metin çocukların sokak hayvanlarını soğuktan korumak için el birliğiyle kedi evleri yapmasını anlatır.",
                "modelAnswer": "Metnin konusu: Bir grup 5. sınıf öğrencisinin kış aylarında sokak hayvanlarını soğuktan korumak amacıyla kendi elleriyle barınaklar yapması ve çevreye örnek olmasıdır.",
                "rubric": [{"criterion": "Metnin konusunun eksiksiz ve tek cümleyle yazılması", "points": 15}]
            },
            {
                "questionNumber": 3,
                "outcomeCode": "T.O.5.6",
                "outcomeTitle": "T.O.5.6. Metnin yüzey anlamını belirleyebilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 14,
                "contextText": "Metne dayalı neden-sonuç çıkarımı.",
                "stimulus": "Yukarıda verilen 1. sorudaki 'Merhamet Isıtır' metnini dikkate alınız.",
                "questionText": "Çocukların koli kutularını su geçirmez naylonla kaplamalarının ve içlerine eski kazakları sermelerinin AMACI nedir? Açıklayınız.",
                "solutionExplanation": "Kutuları yağmurdan/kardan korumak ve içerisini sıcak tutarak hayvanların üşümesini engellemek.",
                "modelAnswer": "Naylonla kaplamalarının amacı yağmur ve kar suyunun kutuyu ıslatıp çürütmesini engellemektir. İçine eski kazak sermelerinin amacı ise barınağın zeminini yumuşak ve sıcak tutarak hayvanların donmaktan korunmasını sağlamaktır.",
                "rubric": [{"criterion": "Naylon kaplama ve kazak serme amacının mantıksal açıklaması", "points": 14}]
            },
            {
                "questionNumber": 4,
                "outcomeCode": "T.O.5.7",
                "outcomeTitle": "T.O.5.7. Görselle iletilen anlamı belirleyebilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Görsel / Deney / Günlük Hayat Durumu",
                "points": 14,
                "contextText": "Sosyal sorumluluk afişi analizi.",
                "stimulus": "Bir sokak panosundaki afişte; bir kap su ve bir kap mamanın yanında 'Bir Kap Su, Bir Kap Sevgi: Onlar Bize Emanet' sloganı ve yaralı bir sokak köpeğini besleyen çocuk görseli yer almaktadır.",
                "questionText": "Bu afişteki 'Onlar Bize Emanet' ifadesiyle topluma hangi sorumluluk yüklenmektedir? Açıklayınız.",
                "solutionExplanation": "Sokak hayvanlarının konuşamadığı, kendilerini ifade edemediği ve yaşam alanlarının insanlar tarafından daraltıldığı için insan merhametine muhtaç olduğu bilinci.",
                "modelAnswer": "Bu ifadeyle, sokak hayvanlarının kendi dertlerini anlatamayacak dilsiz varlıklar olduğu; şehirlerde doğal yaşam alanları daraldığı için su ve yiyecek bulma imkânlarının insanların vicdanına ve merhametine bağlı olduğu vurgulanmakta; tüm vatandaşlara onları koruma ve gözetme görevi yüklenmektedir.",
                "rubric": [{"criterion": "Emanet bilinci ve vicdani sorumluluk analizinin doğru yapılması", "points": 14}]
            },
            {
                "questionNumber": 5,
                "outcomeCode": "T.O.5.15",
                "outcomeTitle": "T.O.5.15. Metnin anahtar kelimelerini belirlemeye yönelik çözümleme yapabilme",
                "difficulty": "Kolay",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 14,
                "contextText": "Anahtar kelimeler.",
                "stimulus": "Yukarıda verilen 1. sorudaki sokak hayvanları metnini dikkate alınız.",
                "questionText": "Metnin anahtar kelimelerinden 3 tanesini yazınız.",
                "solutionExplanation": "Sokak hayvanları, merhamet/yardımlaşma, barınak/kedi evi.",
                "modelAnswer": "1. Sokak hayvanları\n2. Merhamet\n3. Barınak (Kedi evi)",
                "rubric": [{"criterion": "3 anahtar kelimenin doğru yazılması", "points": 14}]
            },
            {
                "questionNumber": 6,
                "outcomeCode": "T.Y.5.13",
                "outcomeTitle": "T.Y.5.13. Yazısını zenginleştirecek biçimde söz varlığını kullanabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 14,
                "contextText": "Deyim içeren duygu dolu paragraf yazımı.",
                "stimulus": "Kullanılacak Deyim: 'kol kanat germek' ve 'içi ısınmak'.",
                "questionText": "Soğuk kış gününde bir yavru köpeğe yuva bulan bir çocuğun mutluluğunu; içinde 'kol kanat germek' ve 'içi ısınmak' deyimlerinin geçtiği 2-3 cümleyle yazınız.",
                "solutionExplanation": "Öğrenci iki deyimi yerinde kullanır.",
                "modelAnswer": "Çetin kış gününde tir tir titreyen yavru köpeğe kol kanat geren Emre, onu kendi elleriyle yaptığı sıcak barınağa yerleştirdi. Minik köpeğin karnını doyurup mutlulukla kuyruk salladığını görünce Emre'nin de içi ısındı ve yüzünde tatlı bir tebessüm belirdi.",
                "rubric": [
                    {"criterion": "İki deyimin anlamına uygun ve doğru kullanılması", "points": 7},
                    {"criterion": "Anlatımın duygusal yoğunluğu ve dil kurallarına uygunluğu", "points": 7}
                ]
            },
            {
                "questionNumber": 7,
                "outcomeCode": "T.Y.5.16",
                "outcomeTitle": "T.Y.5.16. Yazım ve noktalama işaretleriyle ilgili kuralları uygulayabilme",
                "difficulty": "Kolay",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Hata Tespiti & Adım Analizi",
                "points": 14,
                "contextText": "Sayıların ve gün/ay isimlerinin yazımı.",
                "stimulus": "Hatalı Cümle: 'Bizim kulüp 15 ocak salı günü saat 14:30'da 3'er kişilik gruplarla kedi evlerini boyayacak.'",
                "questionText": "Yukarıdaki cümlede yer alan büyük harf, saatler arası noktalama ve üleştirme sayısının yazımı hatalarını düzelterek cümlenin doğrusunu yazınız.",
                "solutionExplanation": "Belirli tarih olduğu için Ocak Salı büyük, saat ve dakika arasına tek nokta konur (14.30), üleştirme sayıları yazıyla yazılır (üçer).",
                "modelAnswer": "Doğru Cümle: 'Bizim kulüp 15 Ocak Salı günü saat 14.30'da üçer kişilik gruplarla kedi evlerini boyayacak.'\n(Düzeltmeler: 15 Ocak Salı büyük harfle, 14.30 tek nokta ile, 3'er değil 'üçer' yazıyla).",
                "rubric": [
                    {"criterion": "Belirli tarihteki ay ve gün adının büyük harfle yazımı", "points": 5},
                    {"criterion": "Saat arasına tek nokta konulması kuralı", "points": 4},
                    {"criterion": "Üleştirme sayısının yazıyla (üçer) yazılması kuralı", "points": 5}
                ]
            }
        ]
    }
]

with open('meb_data/grade5_turkce_distinct.json', 'w', encoding='utf-8') as f:
    json.dump(G5_TURKCE_EXAMS, f, ensure_ascii=False, indent=2)

print("Grade 5 Türkçe distinct generated successfully!")
