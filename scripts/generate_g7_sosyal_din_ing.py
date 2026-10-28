# -*- coding: utf-8 -*-
import json

# -------------------------------------------------------------
# SOSYAL BİLGİLER GRADE 7 (5 Distinct Scenarios)
# Outcomes: SB.7.1.1, SB.7.1.2, SB.7.1.3, SB.7.2.1
# -------------------------------------------------------------
G7_SOSYAL_SCENARIOS = [
    # SENARYO 1 (7 Qs: SB.7.1.1: 2, SB.7.1.2: 1, SB.7.1.3: 2, SB.7.2.1: 2) -> Points: 15, 15, 14, 14, 14, 14, 14 = 100
    {
        "id": "exam_7_sosyal_bilgiler_1_1_senaryo_1",
        "grade": 7,
        "subjectId": "sosyal_bilgiler",
        "examTerm": "1_donem_1_yazili",
        "scenarioId": "senaryo_1",
        "title": "7. Sınıf Sosyal Bilgiler 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 1) (7 Soru)",
        "description": "MEB ÖDSGM 7. Sınıf Sosyal Bilgiler 1. Senaryo resmi konu soru dağılımına uygun 100 puanlık sınav kağıdı.",
        "totalPoints": 100,
        "durationMinutes": 40,
        "questions": [
            {
                "questionNumber": 1,
                "outcomeCode": "SB.7.1.1",
                "outcomeTitle": "SB.7.1.1. Dâhil olduğu gruplarda ve sosyal hayatta etkili iletişimin önemini sorgulayabilme",
                "difficulty": "Kolay",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 15,
                "contextText": "Sen dili ve ben dili dönüştürme.",
                "stimulus": "Bir anne çocuğuna şu şekilde seslenmektedir: 'Her zaman odanı darmadağın bırakıyorsun, çok sorumsuz bir çocuksun!'",
                "questionText": "a) Annenin bu cümlesi neden 'Sen Dili'ne örnektir ve çocuk üzerinde nasıl bir psikolojik tepki doğurur?\nb) Bu iletişimi, çatışmaya yol açmayacak şekilde 'Ben Dili'ne dönüştürerek yeniden yazınız.",
                "solutionExplanation": "Sen dili suçlayıcıdır, savunmaya ve öfkeye iter. Ben dili ise davranışın kişide bıraktığı duyguyu anlatır.",
                "modelAnswer": "a) Cümle doğrudan kişiliği hedef aldığı, suçlayıcı, yargılayıcı ve genelleme ('her zaman') içerdiği için Sen Dili'dir. Çocukta savunmaya geçme, öfke ve kendini kapatma tepkisi doğurur.\nb) Ben Dili Dönüşümü: 'Odanı dağınık gördüğümde eşyalarını bulamayacağından endişeleniyorum ve yorulup üzülüyorum.'",
                "rubric": [
                    {"criterion": "Sen dilinin özellikleri ve olumsuz etkisinin doğru açıklanması", "points": 8},
                    {"criterion": "Ben diline duygu belirten doğru dönüşümün yapılması", "points": 7}
                ]
            },
            {
                "questionNumber": 2,
                "outcomeCode": "SB.7.1.1",
                "outcomeTitle": "SB.7.1.1. Dâhil olduğu gruplarda ve sosyal hayatta etkili iletişimin önemini sorgulayabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Öğrenci Diyaloğu & Kavram Yanılgısı",
                "points": 15,
                "contextText": "Empatik dinleme ve beden dili.",
                "stimulus": "Selin sınavdan düşük aldığı için çok üzgündür ve ağlamaklı bir sesle durumu arkadaşı Mert'e anlatmaktadır. Mert ise gözünü telefonundan ayırmadan: 'Aman boş ver, bir sonraki sınava çalışırsın.' demiştir.",
                "questionText": "Mert'in bu davranışındaki 2 temel iletişim hatasını belirtiniz. Mert empati kuran ve etkin dinleyen bir arkadaş olsaydı nasıl davranmalı ve ne söylemeliydi?",
                "solutionExplanation": "Göz teması kurmamış, duyguyu küçümsemiştir. Empatik dinlemede göz teması kurulur ve duygu paylaşılır.",
                "modelAnswer": "• İletişim Hataları: 1) Göz teması kurmamış, telefonuyla ilgilenerek arkadaşını önemsiz hissettirmiştir. 2) Arkadaşının yaşadığı üzüntüyü 'Aman boş ver' diyerek küçümsemiş ve geçiştirmiştir.\n• Olması Gereken Tavır: Telefonu bir kenara bırakıp Selin'in yüzüne bakmalı, dikkatle dinlemeli ve 'Çok emek verdiğini biliyorum, üzülmekte çok haklısın. İstersen eksiklerini birlikte gözden geçirelim, yanındayım.' şeklinde destekleyici olmalıydı.",
                "rubric": [
                    {"criterion": "İki somut iletişim hatasının doğru tespit edilmesi", "points": 8},
                    {"criterion": "Empatik yaklaşımın ve örnek konuşmanın doğru kurgulanması", "points": 7}
                ]
            },
            {
                "questionNumber": 3,
                "outcomeCode": "SB.7.1.2",
                "outcomeTitle": "SB.7.1.2. Özel gereksinimli bireyler için fırsat eşitliğini sürdürmeye yönelik fikir üretebilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Basit Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 14,
                "contextText": "Tekerlekli sandalye kullanan bireyler için erişilebilirlik.",
                "stimulus": "Bedensel engelli (tekerlekli sandalye kullanan) 7. sınıf öğrencisi Umut, okuluna ve mahallesindeki kütüphaneye giderken çeşitli engellerle karşılaşmaktadır.",
                "questionText": "Umut'un eğitim ve sosyal hayata tam katılımını sağlamak için okulda ve kütüphanede yapılması gereken 2 fiziki/mimari düzenlemeyi yazınız.",
                "solutionExplanation": "Erişilebilir rampa, engelli asansörü, genişletilmiş kapılar vb.",
                "modelAnswer": "1. Okul ve kütüphane girişlerine standartlara uygun eğimli tekerlekli sandalye rampaları ve katlar arası erişim için engelli asansörü yapılmalıdır.\n2. Kütüphanedeki çalışma masaları ve kitap reyonları arasındaki koridorlar tekerlekli sandalyenin rahatça dönebileceği genişlikte ve yükseklikte tasarlanmalıdır.",
                "rubric": [
                    {"criterion": "İki gerçekçi ve standartlara uygun mimari/fiziki çözümün yazılması", "points": 14}
                ]
            },
            {
                "questionNumber": 4,
                "outcomeCode": "SB.7.1.3",
                "outcomeTitle": "SB.7.1.3. Türk toplumunun millî meseleler karşısında gösterdiği tutum ve davranışlara ilişkin çıkarım yapabilme",
                "difficulty": "Zor",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Metin İçi Delillendirme & Örtük Anlam",
                "points": 14,
                "contextText": "Kurtuluş Savaşı'nda Tekâlif-i Milliye ve halkın fedakârlığı.",
                "stimulus": "Mustafa Kemal Paşa Sakarya Meydan Muharebesi öncesinde ordunun çorap, çarık, bez, silah ve yiyecek ihtiyacını karşılamak için Tekâlif-i Milliye Emirleri'ni yayımlamıştır. Türk milleti elindeki son çorabına ve buğday çuvalına kadar ordusuna teslim etmiştir.",
                "questionText": "Türk milletinin bu tutumu, onun hangi millî ve manevi karakter özelliklerini yansıtır? İki kavram belirterek açıklayınız.",
                "solutionExplanation": "Vatanseverlik, dayanışma, bağımsızlık tutkusu ve fedakârlık.",
                "modelAnswer": "1. Vatanseverlik ve Bağımsızlık Aşkı: Türk halkı bağımsız yaşayabilmek için malını, mülkünü ve canını feda etmekten bir an bile çekinmemiştir.\n2. Topyekûn Dayanışma (İmece Ruhu): Kadını, erkeği, yaşlısıyla tüm halkın tek bir vücut halinde ordusunun arkasında kenetlenmesi eşsiz bir millî birlik şuurunu gösterir.",
                "rubric": [
                    {"criterion": "İki millî/manevi değerin doğru belirlenmesi", "points": 7},
                    {"criterion": "Tekâlif-i Milliye ruhunun gerekçeli açıklanması", "points": 7}
                ]
            },
            {
                "questionNumber": 5,
                "outcomeCode": "SB.7.1.3",
                "outcomeTitle": "SB.7.1.3. Türk toplumunun millî meseleler karşısında gösterdiği tutum ve davranışlara ilişkin çıkarım yapabilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Görsel / Deney / Günlük Hayat Durumu",
                "points": 14,
                "contextText": "Doğal afetlerde ve depremlerde milletimizin kenetlenmesi.",
                "stimulus": "Ülkemizde yaşanan büyük depremlerde ve afetlerde, Türkiye'nin dört bir yanından milyonlarca vatandaş kan merkezlerine koşmuş, yardım tırları hazırlamış ve binlerce genç gönüllü olarak afet bölgesine gitmiştir.",
                "questionText": "Bu durum, Türk milletinin geçmişten gelen hangi tarihî değerinin günümüzde de canlı bir şekilde yaşadığını kanıtlar? Açıklayınız.",
                "solutionExplanation": "Milli birlik, beraberlik ve yardımlaşma şuuru.",
                "modelAnswer": "Bu durum, Türk milletinin bin yıllık tarihinden süzülüp gelen 'millî birlik, beraberlik ve diğerkâmlık (başkalarını düşünme)' hasletinin canlılığını koruduğunu gösterir. Milletimiz felaket ve zor günlerde her türlü ayrılığı bir kenara bırakarak tek yürek olmayı başaran yüce bir dayanışma refleksine sahiptir.",
                "rubric": [
                    {"criterion": "Dayanışma ve millî birlik bilincinin doğru ifade edilmesi", "points": 14}
                ]
            },
            {
                "questionNumber": 6,
                "outcomeCode": "SB.7.2.1",
                "outcomeTitle": "SB.7.2.1. Küreselleşmenin insan ve toplum hayatı üzerindeki etkilerini analiz edebilme",
                "difficulty": "Orta",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Dilemma (İkilem) & Çözüm Değerlendirme",
                "points": 14,
                "contextText": "Küreselleşme ve kültürel etkileşim.",
                "stimulus": "İnternet, sosyal medya ve uluslararası ticaret sayesinde dünyanın bir ucunda üretilen müzik, film, giyim tarzı veya yemek alışkanlığı birkaç gün içinde tüm dünyaya yayılmaktadır.",
                "questionText": "a) Küreselleşmenin toplumlar arasındaki kültürel zenginliğe sağladığı 1 OLUMLU katkıyı yazınız.\nb) Küreselleşmenin yerel kültürler üzerindeki 1 OLUMSUZ (riskli) etkisini yazınız.",
                "solutionExplanation": "Olumlu: Farklı kültürleri tanıma, hoşgörü. Olumsuz: Kültürel tek tipleşme, yerel geleneklerin unutulması.",
                "modelAnswer": "a) Olumlu Katkı: Farklı kültürleri, dilleri ve yaşam tarzlarını tanıma imkânı sunarak toplumlar arasında ön yargıların kırılmasını ve dünya barışına katkı sağlayacak hoşgörüyü geliştirir.\nb) Olumsuz Etki: Popüler kültürün baskısıyla yerel geleneklerin, özgün halk oyunlarının, el sanatlarının ve ana dilin yozlaşmasına (kültürel tek tipleşmeye / yozlaşmaya) yol açabilir.",
                "rubric": [
                    {"criterion": "a şıkkında olumlu katkının doğru açıklanması", "points": 7},
                    {"criterion": "b şıkkında tek tipleşme/kültürel kayıp riskinin açıklanması", "points": 7}
                ]
            },
            {
                "questionNumber": 7,
                "outcomeCode": "SB.7.2.1",
                "outcomeTitle": "SB.7.2.1. Küreselleşmenin insan ve toplum hayatı üzerindeki etkilerini analiz edebilme",
                "difficulty": "Zor",
                "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
                "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
                "points": 14,
                "contextText": "Kültürümüzün dünyaya tanıtılması.",
                "stimulus": "Geleneksel Türk kahvesi, ebru sanatı ve Karagöz-Hacivat oyunu UNESCO İnsanlığın Somut Olmayan Kültürel Mirası Temsilî Listesi'ne alınmıştır.",
                "questionText": "Millî kültür ögelerimizin küresel ölçekte tescillenip tanıtılmasının ülkemizin uluslararası saygınlığı ve turizmi açısından önemini 2 maddeyle açıklayınız.",
                "solutionExplanation": "Kültürel diplomasi gücümüzü artırır, turizm gelirlerini ve saygınlığı yükseltir.",
                "modelAnswer": "1. Kültürel Diplomasi ve Tanıtım: Ülkemizin köklü ve zengin bir medeniyet mirasına sahip olduğunu tüm dünyaya kanıtlayarak Türkiye'nin uluslararası arenadaki saygınlığını ve kültürel marka değerini artırır.\n2. Turizm ve Ekonomik Katkı: Bu geleneksel zenginlikleri yerinde görmek ve deneyimlemek isteyen yabancı turistlerin ülkemizi ziyaret etmesini teşvik ederek kültür turizmini canlandırır.",
                "rubric": [
                    {"criterion": "Kültürel diplomasi ve saygınlık etkisinin açıklanması", "points": 7},
                    {"criterion": "Kültür turizmi ve ekonomik boyuta etkisinin yazılması", "points": 7}
                ]
            }
        ]
    }
]

with open('meb_data/grade7_sosyal_distinct.json', 'w', encoding='utf-8') as f:
    json.dump(G7_SOSYAL_SCENARIOS, f, ensure_ascii=False, indent=2)

print("Grade 7 Sosyal distinct generated successfully!")
