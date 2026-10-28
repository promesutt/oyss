import json

# -------------------------------------------------------------
# FEN BİLİMLERİ GRADE 7 (4 Distinct Scenarios)
# -------------------------------------------------------------
G7_FEN_SCENARIOS = [
    # SENARYO 1 (4 Qs: FB.7.1.1, FB.7.1.3, FB.7.1.4, FB.7.2.1)
    {
        "id": "exam_7_fen_bilimleri_1_1_senaryo_1",
        "grade": 7,
        "subjectId": "fen_bilimleri",
        "examTerm": "1_donem_1_yazili",
        "scenarioId": "senaryo_1",
        "title": "7. Sınıf Fen Bilimleri 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 1) (4 Soru)",
        "description": "MEB ÖDSGM 7. Sınıf Fen Bilimleri 1. Senaryo resmi konu soru dağılımına uygun 100 puanlık sınav kağıdı.",
        "totalPoints": 100,
        "durationMinutes": 40,
        "instructions": ["Sınav süresi 40 dakikadır.", "Her soru 25 puandır.", "Cevaplarınızı bilimsel gerekçeleriyle açıklayınız."],
        "questions": [
            {
                "questionNumber": 1,
                "outcomeCode": "FB.7.1.1",
                "outcomeTitle": "FB.7.1.1. Uzay araştırmaları için geliştirilen teknolojileri karşılaştırabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 25,
                "contextText": "Yeryüzü teleskopları ile uzay teleskoplarının gözlem kalitesi farkı.",
                "stimulus": "Gökbilimciler uzayı incelemek için hem Dünya yüzeyindeki yüksek dağların zirvelerine dev gözlemevleri (rasathaneler) kurmakta hem de James Webb gibi teleskopları uzay boşluğuna yerleştirmektedir.",
                "questionText": "a) Uzay teleskoplarının, yeryüzündeki en gelişmiş gözlemevlerinden bile daha net ve kaliteli görüntü elde etmesinin 2 temel bilimsel nedenini açıklayınız.\nb) Rasathanelerin (gözlemevlerinin) kurulacağı yer seçiminde dikkat edilen 2 coğrafi/çevresel kriteri yazınız.",
                "solutionExplanation": "Atmosfer ışığı saçar, soğurur ve hava olayları gözlemi engeller. Uzayda atmosfer yoktur. Rasathaneler ışık kirliliğinden uzak ve yüksek yerlere kurulur.",
                "modelAnswer": "a) 1. Neden: Dünya atmosferindeki gaz tabakası, tozlar ve bulutlar ışığı kırarak dağıtır ve görüntüyü bozar. Uzay boşluğunda atmosfer olmadığı için ışık bozulmadan teleskoba ulaşır.\n2. Neden: Yeryüzündeki yapay ışık kirliliği ve hava olayları (sis, yağmur, bulut) uzay teleskoplarını etkilemez.\nb) Rasathane yer seçim kriterleri: 1) Şehir ışıklarından uzak, ışık kirliliğinin en az olduğu yerler olmalıdır. 2) Havadaki nem ve bulutluluk oranının düşük, açık gece sayısının fazla olduğu yüksek rakımlı dağ zirveleri seçilmelidir.",
                "rubric": [
                    {"criterion": "Uzay teleskoplarının atmosferik avantajının doğru açıklanması", "points": 13},
                    {"criterion": "Rasathane yeri için 2 bilimsel kriterin doğru yazılması", "points": 12}
                ]
            },
            {
                "questionNumber": 2,
                "outcomeCode": "FB.7.1.3",
                "outcomeTitle": "FB.7.1.3. Uzay araştırmalarının yol açabileceği problemleri çözebilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Dilemma (İkilem) & Çözüm Değerlendirme",
                "points": 25,
                "contextText": "Uzay kirliliği ve Kessler sendromu tehlikesi.",
                "stimulus": "Dünya yörüngesinde işlevini yitirmiş yaklaşık 30.000'den fazla roket parçası, patlama artığı ve ömrü tükenmiş uydu başıboş halde saatte on binlerce kilometre hızla dönmektedir (Uzay Kirliliği).",
                "questionText": "a) Uzay kirliliğinin günümüzde aktif olarak görev yapan uzay istasyonları ve haberleşme uyduları için oluşturduğu en büyük tehlikeyi açıklayınız.\nb) Uzay kirliliğini azaltmak veya önlemek amacıyla bilim insanlarının geliştirebileceği 2 somut çözüm önerisi yazınız.",
                "solutionExplanation": "Yüksek hızda çarpışma zincirleme reaksiyon (Kessler sendromu) yaratır. Çözümler: Kendi kendini imha/atmosfere sokma, lazer veya manyetik ağ ile toplama.",
                "modelAnswer": "a) Yörüngedeki çöpler saatte 28.000 km gibi çok yüksek hızlarla hareket eder. Bu hızdaki küçücük bir cıvata bile aktif bir uyduya veya Uluslararası Uzay İstasyonu'na çarptığında zırhı delebilir, uyduları parçalayabilir ve 'Kessler Sendromu' denilen zincirleme çarpışmalarla yörüngeyi tamamen kullanılamaz hale getirebilir.\nb) Çözüm önerileri:\n1) Görev süresi biten uyduların motorlarını son bir kez ateşleyerek Dünya atmosferine yönlendirilmesi ve sürtünmeyle yanarak yok olmasının sağlanması.\n2) Uzay çöpü toplayıcı robot kollar, dev lazerler veya manyetik çekicilerle enkazların toplanıp kontrollü şekilde düşürülmesi.",
                "rubric": [
                    {"criterion": "Yüksek hız ve çarpışma riskinin bilimsel olarak açıklanması", "points": 13},
                    {"criterion": "İki gerçekçi ve bilimsel çözüm önerisinin sunulması", "points": 12}
                ]
            },
            {
                "questionNumber": 3,
                "outcomeCode": "FB.7.1.4",
                "outcomeTitle": "FB.7.1.4. Yıldızların yaşamını açıklayarak yapılandırabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Görsel / Deney / Günlük Hayat Durumu",
                "points": 25,
                "contextText": "Yıldızların başlangıç kütlesine göre yaşam döngüsü.",
                "stimulus": "Yıldızlar uzaydaki gaz ve toz bulutlarının (Bulutsu / Nebula) sıkışmasıyla doğar. Ancak bir yıldızın ömrünü nasıl tamamlayacağını onun başlangıç kütlesi belirler.\n• Küçük Kütleli Yıldızlar: Güneş gibi yıldızlar.\n• Büyük Kütleli Yıldızlar: Güneş'ten katbekat büyük dev yıldızlar.",
                "questionText": "a) Güneş büyüklüğündeki küçük kütleli bir yıldızın yaşam döngüsü basamaklarını (Bulutsu'dan son aşamaya kadar) sırasıyla yazınız.\nb) Güneş bir gün süpernova patlaması geçirerek kara deliğe dönüşebilir mi? Nedenini açıklayınız.",
                "solutionExplanation": "Küçük kütle: Bulutsu -> Küçük kütleli yıldız -> Kırmızı Dev -> Gezegenimsi Bulutsu -> Beyaz Cüce. Güneş kara delik olamaz çünkü kütlesi yetersizdir.",
                "modelAnswer": "a) Küçük kütleli yıldızın yaşam evreleri:\nBulutsu (Nebula) → Küçük Kütleli Yıldız (Güneş) → Kırmızı Dev → Gezegenimsi Bulutsu → Beyaz Cüce (ve en son Siyah Cüce).\nb) Hayır, Güneş kara deliğe DÖNÜŞEMEZ. Çünkü bir yıldızın süpernova patlaması geçirip kara delik veya nötron yıldızı olabilmesi için başlangıç kütlesinin Güneş kütlesinden çok daha büyük (büyük kütleli yıldız) olması gerekir. Güneş küçük kütleli olduğu için ömrünü Beyaz Cüce olarak tamamlayacaktır.",
                "rubric": [
                    {"criterion": "Yaşam evrelerinin (Bulutsu -> Kırmızı Dev -> Gezegenimsi Bulutsu -> Beyaz Cüce) doğru sıralanması", "points": 13},
                    {"criterion": "Güneş'in kütle yetersizliğinden dolayı kara delik olamayacağının gerekçelendirilmesi", "points": 12}
                ]
            },
            {
                "questionNumber": 4,
                "outcomeCode": "FB.7.2.1",
                "outcomeTitle": "FB.7.2.1. Fiziksel anlamda yapılan işin bağlı olduğu faktörlere ilişkin bilimsel çıkarım yapabilme",
                "difficulty": "Zor",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Hata Tespiti & Adım Analizi",
                "points": 25,
                "contextText": "Fiziksel anlamda iş yapılabilme şartları (Kuvvet ve yer değiştirme doğrultusu).",
                "stimulus": "Bir fen deneyinde üç farklı öğrencinin eylemleri gözlenmiştir:\n1. Durum: Can, sırtındaki 5 kg'lık okul çantasıyla düz bir koridorda sabit hızla 20 metre yürümüştür.\n2. Durum: Elif, yerde duran 10 kg'lık koliyi 50 N'luk yatay kuvvet uygulayarak yatay zeminde 4 metre ileri itmiştir.\n3. Durum: Burak, duvara 100 N'luk kuvvetle 10 dakika boyunca bastırmış ancak duvar hareket etmemiştir.",
                "questionText": "a) Bu durumlardan hangisinde/hangilerinde fiziksel anlamda İŞ YAPILMIŞTIR? Nedenini işin fiziksel formülü ve doğrultu kuralına göre açıklayınız.\nb) Fiziksel anlamda iş yapılan durumdaki iş miktarını Joule (J) cinsinden hesaplayınız.",
                "solutionExplanation": "İş = Kuvvet * Yol. Kuvvet ile hareket doğrultusu aynı olmalıdır. 1. durumda kuvvet yukarı yol yatay (iş yok). 3. durumda yol sıfır (iş yok). 2. durumda iş = 50 N * 4 m = 200 J.",
                "modelAnswer": "a) Yalnızca 2. DURUMDA (Elif'in durumunda) fiziksel anlamda iş yapılmıştır.\nGerekçeler:\n• 1. Durumda: Çantaya uygulanan kaldırma kuvveti DİKEY doğrultuda iken, hareket YATAY doğrultudadır. Kuvvet ile hareket doğrultusu dik olduğu için fiziksel iş yapılmaz.\n• 2. Durumda: Uygulanan kuvvet de hareket de YATAY doğrultudadır ve cisim yol almıştır. Bu nedenle iş yapılmıştır.\n• 3. Durumda: Duvar hareket etmediği için (alınan yol = 0), kuvvet ne kadar büyük olursa olsun iş yapılmamıştır.\nb) Yapılan İş Hesabı: İş = Kuvvet × Alınan Yol = 50 N × 4 m = 200 Joule (J) bulunur.",
                "rubric": [
                    {"criterion": "Durumların fiziksel iş kuralına (doğrultu ve yol şartı) göre doğru tahlil edilmesi", "points": 15},
                    {"criterion": "İş hesabının (50 × 4 = 200 Joule) doğru yapılması", "points": 10}
                ]
            }
        ]
    },

    # SENARYO 2 (5 Qs: FB.7.1.1: 2, FB.7.1.4: 1, FB.7.1.5: 1, FB.7.2.1: 1)
    {
        "id": "exam_7_fen_bilimleri_1_1_senaryo_2",
        "grade": 7,
        "subjectId": "fen_bilimleri",
        "examTerm": "1_donem_1_yazili",
        "scenarioId": "senaryo_2",
        "title": "7. Sınıf Fen Bilimleri 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 2) (5 Soru)",
        "description": "MEB ÖDSGM 7. Sınıf Fen Bilimleri 2. Senaryo resmi konu soru dağılımına uygun 100 puanlık sınav kağıdı.",
        "totalPoints": 100,
        "durationMinutes": 40,
        "instructions": ["Sınav süresi 40 dakikadır.", "Her soru 20 puandır."],
        "questions": [
            {
                "questionNumber": 1,
                "outcomeCode": "FB.7.1.1",
                "outcomeTitle": "FB.7.1.1. Uzay araştırmaları için geliştirilen teknolojileri karşılaştırabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 20,
                "contextText": "Teleskop türlerinin çalışma prensibi (Mercekli vs Aynalı).",
                "stimulus": "Tarihte gökyüzünü incelemek için ilk teleskobu Galileo geliştirirken (mercekli teleskop), daha sonra Isaac Newton ışığı aynalarla yansıtan 'aynalı teleskobu' icat etmiştir.",
                "questionText": "Mercekli teleskop ile aynalı (yansıtmalı) teleskop arasındaki temel optik farkı açıklayınız. Günümüzdeki dev teleskoplarda neden aynalı sistemler tercih edilmektedir?",
                "solutionExplanation": "Mercekli teleskopta ışık mercekten kırılarak odaklanır; aynalıda çukur ayna ile yansıtılır. Dev merceklerin ağırlıktan bükülmesi ve renk sapması nedeniyle aynalar tercih edilir.",
                "modelAnswer": "• Optik Fark: Mercekli teleskoplar ışığı kırma prensibiyle çalışır ve ışık bir cam mercekten geçer. Aynalı teleskoplar ise ışığı çukur bir ayna ile yansıtarak odaklar.\n• Neden Aynalı Tercih Edilir: Çok büyük cam mercekler kendi ağırlıkları altında esner, şekli bozulur ve ışığın renklerini ayırarak (renk sapması) bulanık görüntü verir. Aynalar ise arkadan kolayca desteklenebilir, daha hafif ve devasa boyutlarda üretilerek çok daha uzaktaki sönük yıldızları net gösterebilir.",
                "rubric": [
                    {"criterion": "Mercekli (kırılma) ve aynalı (yansıma) prensibinin doğru karşılaştırılması", "points": 10},
                    {"criterion": "Aynalı sistemlerin dev boyut avantajının gerekçelendirilmesi", "points": 10}
                ]
            },
            {
                "questionNumber": 2,
                "outcomeCode": "FB.7.1.1",
                "outcomeTitle": "FB.7.1.1. Uzay araştırmaları için geliştirilen teknolojileri karşılaştırabilme",
                "difficulty": "Kolay",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 20,
                "contextText": "Türkiye'nin aktif uzay uyduları ve görevleri.",
                "stimulus": "Türkiye'nin uzayda hem haberleşme hem de yer gözlem alanında görev yapan aktif uyduları bulunmaktadır:\n• Türksat 5A, Türksat 5B, Türksat 6A\n• Göktürk-1, Göktürk-2, İMECE",
                "questionText": "a) Bu uydulardan hangileri 'Haberleşme', hangileri 'Gözlem/Keşif' uydusudur? Gruplayınız.\nb) Türkiye'nin ilk yerli ve millî haberleşme uydusunun adını yazınız.",
                "solutionExplanation": "Türksat serisi haberleşme, Göktürk ve İMECE gözlem. İlk yerli haberleşme: Türksat 6A.",
                "modelAnswer": "a) Gruplandırma:\n• Aktif Haberleşme Uyduları: Türksat 5A, Türksat 5B, Türksat 6A (TV, internet ve veri aktarımı sağlar).\n• Aktif Yer Gözlem Uyduları: Göktürk-1, Göktürk-2, İMECE (Yüksek çözünürlüklü harita, tarım, afet ve savunma fotoğraflaması yapar).\nb) Türkiye'nin ilk yerli ve millî haberleşme uydusu: TÜRKSAT 6A'dır.",
                "rubric": [
                    {"criterion": "Haberleşme ve gözlem uydularının doğru sınıflandırılması", "points": 12},
                    {"criterion": "Türksat 6A'nın ilk yerli haberleşme uydusu olarak belirtilmesi", "points": 8}
                ]
            },
            {
                "questionNumber": 3,
                "outcomeCode": "FB.7.1.4",
                "outcomeTitle": "FB.7.1.4. Yıldızların yaşamını açıklayarak yapılandırabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 20,
                "contextText": "Büyük kütleli yıldızların son durakları.",
                "stimulus": "Başlangıç kütlesi Güneş'in kütlesinden çok büyük olan dev yıldızlar, yakıtlarını çok hızlı tüketir ve ömürlerinin sonunda evrenin en şiddetli patlamaları olan 'Süpernova' patlaması geçirirler.",
                "questionText": "Süpernova patlamasından sonra yıldızın çekirdeğinin kütlesine bağlı olarak dönüşebileceği 2 gök cismini yazınız ve bu cisimlerin temel özelliklerini açıklayınız.",
                "solutionExplanation": "Nötron yıldızı (Pulsar) ve Kara Delik.",
                "modelAnswer": "1. Nötron Yıldızı (Pulsar): Süpernova sonrası çekirdek aşırı derecede sıkışır, elektron ve protonlar birleşerek nötronlara dönüşür. Çok küçük hacimli (yaklaşık 20 km çapında) fakat inanılmaz derecede yoğun ve kendi etrafında saniyede yüzlerce kez dönen cisimlerdir.\n2. Kara Delik: Eğer geriye kalan çekirdeğin kütlesi çok daha devasa ise yer çekimi sonsuza yaklaşır. Işığın bile kaçamayacağı kadar güçlü bir çekim alanına sahip olan uzay-zaman bölgelerine 'Kara Delik' denir.",
                "rubric": [
                    {"criterion": "Nötron yıldızı ve özelliklerinin doğru yazılması", "points": 10},
                    {"criterion": "Kara delik ve özelliklerinin doğru açıklanması", "points": 10}
                ]
            },
            {
                "questionNumber": 4,
                "outcomeCode": "FB.7.1.5",
                "outcomeTitle": "FB.7.1.5. Yıldız, galaksi ve evren kavramlarını açıklayarak yapılandırabilme",
                "difficulty": "Kolay",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Görsel / Deney / Günlük Hayat Durumu",
                "points": 20,
                "contextText": "Galaksi çeşitleri ve Samanyolu.",
                "stimulus": "Galaksiler (Gök adalar) şekillerine göre üçe ayrılır:\n1) Sarmal Galaksiler, 2) Eliptik Galaksiler, 3) Düzensiz Galaksiler.",
                "questionText": "a) Güneş sistemimizin içinde yer aldığı 'Samanyolu Galaksisi' bu türlerden hangisine girmektedir?\nb) Evren ile Uzay kavramları arasındaki temel farkı açıklayınız.",
                "solutionExplanation": "Samanyolu sarmal galaksidir (Avcı kolu). Evren: Dünya dahil tüm uzaydır; Uzay: Dünya dışındaki evren kısmıdır.",
                "modelAnswer": "a) Samanyolu Galaksisi 'SARMAL GALAKSİ' türündedir (Güneş sistemi bu sarmal kollardan Avcı/Orion kolu üzerinde bulunur).\nb) Evren ve Uzay Farkı: 'Evren', aradaki boşluklar ve tüm gök cisimleriyle birlikte var olan her şeyin tamamıdır (Dünya + Uzay). 'Uzay' ise evrenin Dünya atmosferi dışında kalan sonsuz kabul edilen kısmıdır. Yani Evren = Dünya + Uzay şeklindedir.",
                "rubric": [
                    {"criterion": "Samanyolu'nun sarmal galaksi olduğunun belirtilmesi", "points": 8},
                    {"criterion": "Evren (Dünya dahil) ve Uzay (Dünya hariç) farkının doğru tanımlanması", "points": 12}
                ]
            },
            {
                "questionNumber": 5,
                "outcomeCode": "FB.7.2.1",
                "outcomeTitle": "FB.7.2.1. Fiziksel anlamda yapılan işin bağlı olduğu faktörlere ilişkin bilimsel çıkarım yapabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Hata Tespiti & Adım Analizi",
                "points": 20,
                "contextText": "İş formülü ve değişkenlerin karşılaştırılması.",
                "stimulus": "Sürtünmesiz yatay düzlemde:\n• K kolisi: 20 N'luk kuvvetle 6 metre çekilmiştir.\n• L kolisi: 30 N'luk kuvvetle 5 metre çekilmiştir.",
                "questionText": "K ve L kolileri üzerinde yapılan fiziksel iş miktarlarını hesaplayarak karşılaştırınız. Hangi koli üzerinde daha fazla iş yapılmıştır?",
                "solutionExplanation": "K işi = 20 * 6 = 120 J. L işi = 30 * 5 = 150 J. L > K.",
                "modelAnswer": "• K kolisi üzerinde yapılan iş: İş(K) = Kuvvet × Yol = 20 N × 6 m = 120 Joule (J).\n• L kolisi üzerinde yapılan iş: İş(L) = Kuvvet × Yol = 30 N × 5 m = 150 Joule (J).\nKarşılaştırma: 150 J > 120 J olduğundan L kolisi üzerinde K kolisine göre daha fazla fiziksel iş yapılmıştır.",
                "rubric": [
                    {"criterion": "K kolisi işinin (120 J) ve L kolisi işinin (150 J) doğru hesaplanması", "points": 12},
                    {"criterion": "L kolisinde daha fazla iş yapıldığının doğru gerekçelendirilmesi", "points": 8}
                ]
            }
        ]
    },

    # SENARYO 3 (4 Qs: FB.7.1.1, FB.7.1.3, FB.7.1.4, FB.7.2.2)
    {
        "id": "exam_7_fen_bilimleri_1_1_senaryo_3",
        "grade": 7,
        "subjectId": "fen_bilimleri",
        "examTerm": "1_donem_1_yazili",
        "scenarioId": "senaryo_3",
        "title": "7. Sınıf Fen Bilimleri 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 3) (4 Soru)",
        "description": "MEB ÖDSGM 7. Sınıf Fen Bilimleri 3. Senaryo resmi konu soru dağılımına uygun 100 puanlık sınav kağıdı.",
        "totalPoints": 100,
        "durationMinutes": 40,
        "instructions": ["Sınav süresi 40 dakikadır.", "Her soru 25 puandır."],
        "questions": [
            {
                "questionNumber": 1,
                "outcomeCode": "FB.7.1.1",
                "outcomeTitle": "FB.7.1.1. Uzay araştırmaları için geliştirilen teknolojileri karşılaştırabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 25,
                "contextText": "Uzay araştırmaları teknolojilerinin günlük hayata transferi.",
                "stimulus": "Uzay araştırmaları için geliştirilen birçok teknoloji ve malzeme, zamanla günlük yaşantımızda kullandığımız sivil ürünlere dönüşmüştür.",
                "questionText": "Aslında uzay yolculukları ve astronotların ihtiyaçları için icat edilmiş olup günümüzde evlerimizde veya hastanelerde yaygın kullanılan 3 farklı teknolojik ürünü yazınız.",
                "solutionExplanation": "Hafızalı sünger (visco), teflon kaplama, kulaktan ateş ölçer, duman dedektörü, çizilmez gözlük camı vb.",
                "modelAnswer": "1. Hafızalı Sünger (Visco Yatak/Yastık): Astronotların fırlatma anında omurgalarına binen aşırı yer çekimi (G kuvveti) etkisini azaltmak için geliştirilmiştir.\n2. Dijital Kulaktan Ateş Ölçer: Yıldızların ve gezegenlerin sıcaklığını uzaktan ölçen kızılötesi (infrared) sensör teknolojisinden uyarlanmıştır.\n3. Çizilmez Gözlük Camı ve Güneş Filtreleri: Astronot kasklarındaki vizörleri uzay tozlarından ve zararlı kozmik ışınlardan korumak için geliştirilen kaplamadır.",
                "rubric": [
                    {"criterion": "Uzay araştırması kökenli 3 geçerli günlük hayat ürününün yazılması", "points": 15},
                    {"criterion": "Ürünlerin uzaydaki çıkış amacının doğru açıklanması", "points": 10}
                ]
            },
            {
                "questionNumber": 2,
                "outcomeCode": "FB.7.1.3",
                "outcomeTitle": "FB.7.1.3. Uzay araştırmalarının yol açabileceği problemleri çözebilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Görsel / Deney / Günlük Hayat Durumu",
                "points": 25,
                "contextText": "Doğal gök cisimleri ile uzay kirliliğinin ayırt edilmesi.",
                "stimulus": "Öğrenci tartışması:\n• Selin: 'Uzayda başıboş gezen meteorlar, asteroitler ve kuyruklu yıldız parçaları uzay kirliliğinin temel sebebidir.'\n• Burak: 'Hayır, gök taşları doğal cisimdir, uzay kirliliği sayılmaz. Uzay kirliliği sadece insan yapımı araç artıklarından oluşur.'",
                "questionText": "Hangi öğrencinin tanımı bilimsel olarak doğrudur? Uzay kirliliğinin tanımını yaparak gerekçelendiriniz.",
                "solutionExplanation": "Burak haklıdır. Uzay kirliliği sadece yapay/insan kaynaklı atıklardır.",
                "modelAnswer": "Burak haklıdır. Çünkü çevre ve uzay biliminde kirlilik, 'insan faaliyetleri sonucu doğal dengeyi bozan atıklar' olarak tanımlanır. Meteorlar, asteroitler veya kuyruklu yıldızlar evrenin doğal gök cisimleridir ve kirlilik sayılmazlar. Uzay kirliliği; insanın uzaya fırlattığı işlevsiz uydular, yakıt tankları, patlama parçaları ve cıvatalar gibi yapay nesnelerden oluşur.",
                "rubric": [
                    {"criterion": "Burak'ın haklı olduğunun doğru tespiti", "points": 10},
                    {"criterion": "Doğal gök cismi ile insan kaynaklı yapay enkaz ayrımının bilimsel olarak açıklanması", "points": 15}
                ]
            },
            {
                "questionNumber": 3,
                "outcomeCode": "FB.7.1.4",
                "outcomeTitle": "FB.7.1.4. Yıldızların yaşamını açıklayarak yapılandırabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 25,
                "contextText": "Bulutsu (Nebula) türleri ve yıldız oluşumu.",
                "stimulus": "Uzaydaki devasa gaz ve toz bulutlarına Bulutsu (Nebula) denir. Bulutsular yıldızların doğum yerleridir. Örneğin Orion Bulutsusu, Atbaşı Bulutsusu, Kelebek Bulutsusu ve Halka Bulutsusu.",
                "questionText": "a) Bulutsuların içerisinde bir yıldızın doğuş sürecini (kütle çekimi etkisiyle sıkışma ve nükleer enerji üretimi) özetleyiniz.\nb) Parlak bulutsu ile karanlık bulutsu arasındaki farkı birer örnek vererek açıklayınız.",
                "solutionExplanation": "Gaz ve toz kütle çekimiyle büzülür, sıcaklık milyonlarca dereceye çıkarak hidrojen helyuma dönüşür. Parlak ışığı yansıtır/yayar, karanlık arkadaki ışığı perdeler.",
                "modelAnswer": "a) Yıldızın Doğuşu: Bulutsu içindeki hidrojen gazı ve toz tanecikleri kütle çekim kuvvetinin etkisiyle bir araya gelerek büzüşmeye başlar. Büzüşen maddenin yoğunluğu ve sıcaklığı milyonlarca dereceye ulaştığında hidrojen atomları birleşerek helyuma dönüşür (çekirdek füzyonu) ve yıldız ışık saçarak parlamaya başlar.\nb) Fark: Parlak bulutsular (örneğin Orion Bulutsusu) içlerindeki yeni doğan yıldızların ışığıyla parıldarlar. Karanlık bulutsular ise (örneğin Atbaşı Bulutsusu) arkalarındaki yıldızların ışığını soğurarak karanlık bir silüet şeklinde görünürler.",
                "rubric": [
                    {"criterion": "Kütle çekim büzüşmesi ve nükleer tepkimeyle yıldız oluşumunun anlatılması", "points": 13},
                    {"criterion": "Parlak ve karanlık bulutsu farkının örnekle açıklanması", "points": 12}
                ]
            },
            {
                "questionNumber": 4,
                "outcomeCode": "FB.7.2.2",
                "outcomeTitle": "FB.7.2.2. Enerji çeşitlerinden kinetik ve potansiyel enerjiyi karşılaştırabilme",
                "difficulty": "Zor",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Görsel / Deney / Günlük Hayat Durumu",
                "points": 25,
                "contextText": "Kaykay pistinde kinetik ve potansiyel enerji dönüşümü.",
                "stimulus": "U şeklindeki sürtünmesiz bir kaykay pistinin en üst tepe noktasından (K noktası) harekete başlayan bir kaykaycı, en dipteki taban noktasından (L noktası) geçerek karşı tepeye (M noktası) doğru tırmanmaktadır.",
                "questionText": "a) K noktasında, L noktasında ve M noktasında kaykaycının sahip olduğu enerji türlerini (Çekim Potansiyel Enerjisi / Kinetik Enerji) yazınız.\nb) L noktasında kaykaycının hızının en yüksek olmasının bilimsel nedenini enerji dönüşümü ilkesine göre açıklayınız.",
                "solutionExplanation": "K ve M tepede potansiyel maksimum, kinetik sıfır. L tabanda potansiyel minimum, kinetik maksimum (hız maksimum). Sürtünmesiz ortamda toplam mekanik enerji korunur.",
                "modelAnswer": "a) Enerji Türleri:\n• K Noktasında (En Üst Tepe): Yükseklik maksimum olduğu için Çekim Potansiyel Enerjisi maksimumdur; hız sıfır olduğu için Kinetik Enerji sıfırdır.\n• L Noktasında (En Dip Taban): Yükseklik sıfıra indiği için Potansiyel Enerji kinetik enerjiye dönüşmüştür; Kinetik Enerji maksimumdur.\n• M Noktasında (Karşı Tepe): Kinetik enerji tekrar Çekim Potansiyel Enerjisine dönüşmüştür.\nb) L noktasında hızın en yüksek olma nedeni: K noktasındaki potansiyel enerjinin tamamının sürtünmesiz ortamda kinetik enerjiye (hareket enerjisine) dönüşmüş olmasıdır. Kinetik enerji hıza bağlı olduğundan, kinetik enerjinin maksimum olduğu taban noktasında hız da en yüksek değerine ulaşır.",
                "rubric": [
                    {"criterion": "K, L, M noktalarındaki potansiyel ve kinetik enerjilerin doğru belirlenmesi", "points": 13},
                    {"criterion": "L noktasındaki hız maksimumluğunun enerji dönüşümü ile açıklanması", "points": 12}
                ]
            }
        ]
    },

    # SENARYO 4 (4 Qs: FB.7.1.1, FB.7.1.3, FB.7.1.5, FB.7.2.2)
    {
        "id": "exam_7_fen_bilimleri_1_1_senaryo_4",
        "grade": 7,
        "subjectId": "fen_bilimleri",
        "examTerm": "1_donem_1_yazili",
        "scenarioId": "senaryo_4",
        "title": "7. Sınıf Fen Bilimleri 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 4) (4 Soru)",
        "description": "MEB ÖDSGM 7. Sınıf Fen Bilimleri 4. Senaryo resmi konu soru dağılımına uygun 100 puanlık sınav kağıdı.",
        "totalPoints": 100,
        "durationMinutes": 40,
        "instructions": ["Sınav süresi 40 dakikadır.", "Her soru 25 puandır."],
        "questions": [
            {
                "questionNumber": 1,
                "outcomeCode": "FB.7.1.1",
                "outcomeTitle": "FB.7.1.1. Uzay araştırmaları için geliştirilen teknolojileri karşılaştırabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 25,
                "contextText": "Türk-İslam gökbilimcileri ve uzay bilimine katkıları.",
                "stimulus": "Ali Kuşçu, Fatih Sultan Mehmet döneminde İstanbul'a gelerek Semerkant rasathanesindeki bilgi birikimini Osmanlı'ya taşımış ve Ay'ın ilk haritasını çıkaran öncü gökbilimci olmuştur.",
                "questionText": "a) Ali Kuşçu ve Uluğ Bey'in teleskop henüz icat edilmeden önceki dönemde gök cisimlerinin hareketlerini nasıl yüksek doğrulukla hesapladıklarını açıklayınız.\nb) Günümüzde NASA'nın Ay üzerindeki bir kratere 'Ali Kuşçu' adını vermesinin bilim tarihi açısından önemini yazınız.",
                "solutionExplanation": "Gözlem aletleri (rubu tahtası, usturlap, dev sekstantlar) ve ileri matematik/trigonometri kullanmışlardır.",
                "modelAnswer": "a) Teleskobun olmadığı dönemde Ali Kuşçu ve Uluğ Bey; 'usturlap', 'sekstant' gibi dev açıölçer aletler, güneş saatleri ve çok ileri düzey küresel geometri/trigonometri hesaplamaları kullanarak yıldızların ve gezegenlerin yörüngelerini günümüz değerlerine çok yakın bir hassasiyetle hesaplamışlardır.\nb) NASA'nın Ay'daki bir kratere Ali Kuşçu adını vermesi; Türk-İslam medeniyetinin astronomi ve bilimin evrensel gelişimine yaptığı katkıların dünya çapında kabul edildiğini ve tescillendiğini göstermektedir.",
                "rubric": [
                    {"criterion": "Teleskop öncesi gözlem aletleri ve matematiksel dehanın açıklanması", "points": 13},
                    {"criterion": "Bilim tarihi ve evrensel miras açısından krater isimlendirmesinin yorumlanması", "points": 12}
                ]
            },
            {
                "questionNumber": 2,
                "outcomeCode": "FB.7.1.3",
                "outcomeTitle": "FB.7.1.3. Uzay araştırmalarının yol açabileceği problemleri çözebilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Dilemma (İkilem) & Çözüm Değerlendirme",
                "points": 25,
                "contextText": "Işık kirliliği ve astronomi araştırmalarına etkisi.",
                "stimulus": "Şehirlerin kontrolsüz büyümesi, aşırı ve yanlış yönlendirilmiş sokak aydınlatmaları gece gökyüzünü yapay bir ışık sisiyle kaplamaktadır (Işık Kirliliği).",
                "questionText": "a) Işık kirliliğinin gökbilimcilerin teleskopla yaptığı gözlemlere ve doğal hayata (göçmen kuşlar, deniz kaplumbağaları) verdiği 2 zararı açıklayınız.\nb) Işık kirliliğini önlemek için sokak lambalarında nasıl bir armatür/tasarım kullanılmalıdır?",
                "solutionExplanation": "Işık kirliliği yıldızların sönük ışığını boğar, göçmen kuşların yön bulmasını engeller, yavru kaplumbağaları şaşırtır. Çözüm: Işığı sadece yere yönlendiren siperlikli armatür.",
                "modelAnswer": "a) Zararları:\n1. Gökbilime zararı: Gökyüzüne yayılan yapay ışıklar sönük yıldızların ve galaksilerin ışığını görünmez hale getirir, teleskopların gözlem yapmasını engeller.\n2. Doğal hayata zararı: Göçmen kuşlar yıldızların konumuna göre yön bulurken şehir ışıkları yüzünden yönlerini şaşırıp binalara çarpar; Caretta caretta yavruları deniz yakamozunu sokak lambalarıyla karıştırıp karaya yönelerek hayatını kaybeder.\nb) Tasarım Çözümü: Sokak lambaları gökyüzüne doğru ışık saçmayacak şekilde 'tam siperlikli (kalkanlı)' olmalı ve ışığı yalnızca aydınlatılması gereken yere (aşağıya) yönlendirmelidir.",
                "rubric": [
                    {"criterion": "Gökbilim ve ekolojik sisteme verilen 2 zararın doğru açıklanması", "points": 13},
                    {"criterion": "Aşağı yönlü siperlikli aydınlatma tasarımının doğru belirtilmesi", "points": 12}
                ]
            },
            {
                "questionNumber": 3,
                "outcomeCode": "FB.7.1.5",
                "outcomeTitle": "FB.7.1.5. Yıldız, galaksi ve evren kavramlarını açıklayarak yapılandırabilme",
                "difficulty": "Kolay",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 25,
                "contextText": "Kuyruklu yıldız ve meteor kavram yanılgıları.",
                "stimulus": "Halk arasında gökyüzünde hızla kayan bir ışık çizgisi görüldüğünde 'Yıldız kaydı, bir dilek tut' denir. Ayrıca 'Halley Kuyruklu Yıldızı' gibi cisimler de gökyüzünde parlak kuyruklarıyla görülür.",
                "questionText": "a) 'Yıldız kayması' olayı gerçekte bir yıldızın kayması mıdır? Bilimsel açıklamasını yapınız.\nb) Kuyruklu yıldızlar gerçekte birer yıldız mıdır? Neden kuyruklu yıldız olarak adlandırıldıklarını ve yapılarındaki maddeleri (Kirli kartopu modeli) açıklayınız.",
                "solutionExplanation": "Yıldız kayması meteorun atmosferde sürtünmeyle yanmasıdır. Kuyruklu yıldız donmuş gaz, toz ve buz kütlesidir (kirli kartopu); Güneş'e yaklaşınca buharlaşan gaz kuyruk oluşturur.",
                "modelAnswer": "a) Hayır, yıldız kaymasının yıldızlarla hiçbir ilgisi yoktur. Uzaydan Dünya atmosferine giren küçük meteor (gök taşı) parçacıklarının atmosferdeki gazlara sürtünerek aşırı ısınıp akkor hale gelmesi ve yanarak ışık saçması olayıdır.\nb) Hayır, kuyruklu yıldızlar da yıldız değildir; kendi ısı ve ışığını üretemezler. Yapıları donmuş gazlar, buz ve kozmik tozlardan oluştuğu için gökbilimciler onlara 'kirli kartopu' derler. Güneş'e yaklaştıklarında içlerindeki buzlar buharlaşır ve Güneş rüzgârlarının etkisiyle arkalarında milyonlarca kilometre uzunluğunda parıldayan bir gaz ve toz 'kuyruğu' oluşur.",
                "rubric": [
                    {"criterion": "Yıldız kaymasının meteor yanması olduğunun doğru açıklanması", "points": 13},
                    {"criterion": "Kuyruklu yıldızın yapısı (kirli kartopu) ve kuyruğun oluşumunun açıklanması", "points": 12}
                ]
            },
            {
                "questionNumber": 4,
                "outcomeCode": "FB.7.2.2",
                "outcomeTitle": "FB.7.2.2. Enerji çeşitlerinden kinetik ve potansiyel enerjiyi karşılaştırabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Görsel / Deney / Günlük Hayat Durumu",
                "points": 25,
                "contextText": "Esneklik potansiyel enerjisi ve kinetik enerji.",
                "stimulus": "Bir okçu yayı gerdiğinde oku fırlatmaya hazır hale gelir. Yayı ne kadar çok gererse serbest bıraktığında ok o kadar uzağa ve hızlı fırlar.",
                "questionText": "a) Gerilmiş bir yayda hangi enerji türü depolanır? Bu enerjinin büyüklüğü yayın hangi özelliklerine bağlıdır?\nb) Yay serbest bırakıldığında depolanan bu enerji hangi enerji türüne dönüşür? Açıklayınız.",
                "solutionExplanation": "Esneklik potansiyel enerjisi depolanır (gerilme miktarı ve yayın cinsine bağlı). Serbest kalınca oka kinetik enerji olarak aktarılır.",
                "modelAnswer": "a) Depolanan Enerji: 'ESNEKLİK POTANSİYEL ENERJİSİ' depolanır.\nBağlı olduğu faktörler: 1) Yayın gerilme / sıkışma miktarına (ne kadar çok gerilirse enerji o kadar artar), 2) Yayın cinsine ve kalınlığına (yay sabitine).\nb) Yay serbest bırakıldığında yaydaki esneklik potansiyel enerjisi oka aktarılır ve 'KİNETİK ENERJİYE' (hareket enerjisine) dönüşür. Ok bu kinetik enerji sayesinde yüksek hızla ileriye doğru uçar.",
                "rubric": [
                    {"criterion": "Esneklik potansiyel enerjisi ve bağlı olduğu 2 faktörün yazılması", "points": 13},
                    {"criterion": "Kinetik enerjiye dönüşümün doğru açıklanması", "points": 12}
                ]
            }
        ]
    }
]

with open('meb_data/grade7_fen_distinct.json', 'w', encoding='utf-8') as f:
    json.dump(G7_FEN_SCENARIOS, f, ensure_ascii=False, indent=2)

print("Grade 7 Fen Bilimleri distinct exams generated successfully!")
