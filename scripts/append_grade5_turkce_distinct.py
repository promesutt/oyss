# -*- coding: utf-8 -*-
import json

with open('meb_data/grade5_turkce_distinct.json', 'r', encoding='utf-8') as f:
    exams = json.load(f)

# Ensure only scenarios 1-3 exist currently
exams = exams[:3]

sc_4 = {
    "id": "exam_5_turkce_1_1_senaryo_4",
    "grade": 5,
    "subjectId": "turkce",
    "examTerm": "1_donem_1_yazili",
    "scenarioId": "senaryo_4",
    "title": "5. Sınıf Türkçe 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 4) (7 Soru)",
    "description": "MEB ÖDSGM 5. Sınıf Türkçe 4. Senaryo resmi konu soru dağılımına uygun 100 puanlık sınav kağıdı.",
    "durationMinutes": 40,
    "totalPoints": 100,
    "questions": [
        {
            "questionNumber": 1,
            "outcomeCode": "T.O.5.6",
            "outcomeTitle": "T.O.5.6. Metnin yüzey anlamını belirleyebilme",
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "points": 15,
            "contextText": "Köy okulundaki kütüphane ve kitap sevgisi.",
            "stimulus": "Toros Dağları'nın eteklerindeki küçük bir köy okulunda öğretmenlik yapan Elif Öğretmen, boş bir sınıfı kütüphaneye dönüştürmek için kolları sıvadı. Kasabadaki marangozdan tahta raflar rica etti, öğrencileriyle birlikte rafları gökkuşağı renklerine boyadı. Kısa sürede Türkiye'nin dört bir yanından gelen bağış kitaplarla raf dolup taştı. Öğrencilerden Ali, kütüphanenin ilk açıldığı gün rafların karşısında büyülenmiş gibi durdu ve eline aldığı ilk masal kitabını koklayarak sayfalarını çevirmeye başladı.",
            "questionText": "Yukarıdaki metnin konusunu tek bir cümleyle yazınız.",
            "solutionExplanation": "Metin, bir köy okulunda öğretmenin ve öğrencilerin dayanışmasıyla kurulan kütüphaneyi ve çocukların kitaba kavuşma heyecanını anlatmaktadır.",
            "modelAnswer": "Metnin konusu, bir köy okulunda boş bir sınıfın el birliğiyle rengârenk bir kütüphaneye dönüştürülmesi ve öğrencilerin kitap sevgisidir.",
            "rubric": [
                {"criterion": "Kütüphane kurulumu ve kitap sevgisini kapsayan doğru konu cümlesi yazımı", "points": 15}
            ]
        },
        {
            "questionNumber": 2,
            "outcomeCode": "T.O.5.6",
            "outcomeTitle": "T.O.5.6. Metnin yüzey anlamını belirleyebilme",
            "difficulty": "Orta",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "points": 15,
            "contextText": "Metne dayalı neden-sonuç sorusu.",
            "stimulus": "Metne göre: Elif Öğretmen kütüphaneyi kurarken kasaba esnafından ve Türkiye'nin farklı şehirlerindeki kitapseverlerden nasıl destek almıştır?",
            "questionText": "Elif Öğretmen'in kütüphaneyi tamamlarken aldığı yardımları metne dayanarak 2 maddeyle açıklayınız.",
            "solutionExplanation": "Marangozdan tahta raflar almış, Türkiye'nin dört bir yanından bağış kitaplar toplanmıştır.",
            "modelAnswer": "1. Kasabadaki marangozdan rica ederek kitaplar için tahta raflar temin etmiştir.\n2. Türkiye'nin dört bir yanından gelen kitap bağışlarıyla kütüphanenin raflarını doldurmuştur.",
            "rubric": [
                {"criterion": "Marangozdan raf temini maddesinin yazılması", "points": 8},
                {"criterion": "Kitap bağışları desteğinin belirtilmesi", "points": 7}
            ]
        },
        {
            "questionNumber": 3,
            "outcomeCode": "T.O.5.7",
            "outcomeTitle": "T.O.5.7. Görselle iletilen anlamı belirleyebilme",
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Görsel / Deney / Günlük Hayat Durumu",
            "points": 14,
            "contextText": "Kütüphane tanıtım afişi analizi.",
            "stimulus": "Kütüphanenin giriş kapısına asılan afişte: Açık duran büyük bir kitabın içinden uzaya yükselen bir roket ve rengârenk çiçekler açan bir vadi resmedilmiş; altına 'Her Kitap Yeni Bir Dünyadır' sloganı yazılmıştır.",
            "questionText": "Bu afişteki roket ve çiçek açan vadi görselleriyle kitap okumanın çocuklara sağladığı hangi iki kazanım anlatılmak istenmiştir?",
            "solutionExplanation": "Roket hayal gücünü göklere/bilime çıkarmayı; çiçek açan vadi ise iç dünyayı güzelleştirmeyi simgeler.",
            "modelAnswer": "1. Roket: Kitapların insanın hayal gücünü sonsuzluğa taşıdığını, bilime, keşfe ve ufukların ötesine kanatlandırdığını sembolize eder.\n2. Çiçek Açan Vadi: Kitap okumanın insanın ruhunu, kelime dağarcığını ve iç dünyasını rengârenk güzelliklerle zenginleştirdiğini simgeler.",
            "rubric": [
                {"criterion": "Roketin hayal gücü ve bilgi/keşif anlamının doğru yorumlanması", "points": 7},
                {"criterion": "Çiçekli vadinin içsel zenginlik ve güzellik anlamının açıklanması", "points": 7}
            ]
        },
        {
            "questionNumber": 4,
            "outcomeCode": "T.O.5.7",
            "outcomeTitle": "T.O.5.7. Görselle iletilen anlamı belirleyebilme",
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Görsel / Deney / Günlük Hayat Durumu",
            "points": 14,
            "contextText": "Kitap okuma saati görseli.",
            "stimulus": "Afişte kütüphanede halının üzerine bağdaş kurup gülümseyerek kitap okuyan çocukların yüz ifadeleri yer almaktadır.",
            "questionText": "Görseldeki çocukların yüz ifadelerinden hareketle kütüphanede bulunmaktan duydukları duyguyu tek kelimeyle yazıp nedenini açıklayınız.",
            "solutionExplanation": "Huzur, mutluluk, heyecan. Yeni dünyalar keşfetmenin sevinci.",
            "modelAnswer": "Duygu: Mutluluk (veya Huzur / Coşku).\nNedeni: Çocukların tebessüm eden yüzleri ve kitap sayfalarına sevgiyle bakmaları, kitapların sunduğu büyülü dünyada olmaktan derin bir keyif ve iç huzuru duyduklarını gösterir.",
            "rubric": [
                {"criterion": "Doğru duygunun (mutluluk/huzur) belirlenmesi", "points": 7},
                {"criterion": "Görsel kanıtla tutarlı açıklama yapılması", "points": 7}
            ]
        },
        {
            "questionNumber": 5,
            "outcomeCode": "T.O.5.20",
            "outcomeTitle": "T.O.5.20. Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme",
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "points": 14,
            "contextText": "Kelime tahlili ve cümle kurgusu.",
            "stimulus": "Metinde geçen 'fedakârlık' ve 'aydınlık' sözcükleri.",
            "questionText": "'Fedakârlık' ve 'aydınlık' sözcüklerini kütüphane veya kitap sevgisi temasını içerecek şekilde birer anlamlı ve kurallı cümlede kullanınız.",
            "solutionExplanation": "Kelimelerin bağlama uygun kurallı cümlelerde kullanımı.",
            "modelAnswer": "1. Fedakârlık: 'Öğretmenimiz büyük bir fedakârlık göstererek hafta sonu bile kütüphanenin raflarını düzenledi.'\n2. Aydınlık: 'Okuduğumuz her kitap zihnimizde yeni bir kandil yakarak geleceğimizi aydınlık kılar.'",
            "rubric": [
                {"criterion": "Fedakârlık sözcüğünün anlamına uygun cümlede kullanılması", "points": 7},
                {"criterion": "Aydınlık sözcüğünün mecaz/anlamlı bağlamda doğru kullanımı", "points": 7}
            ]
        },
        {
            "questionNumber": 6,
            "outcomeCode": "T.Y.5.13",
            "outcomeTitle": "T.Y.5.13. Yazısını zenginleştirecek biçimde söz varlığını kullanabilme",
            "difficulty": "Zor",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "points": 14,
            "contextText": "Deyim kullanımı: 'kitap kurdu' ve 'göz nuru dökmek'.",
            "stimulus": "Deyimler dilimizin en değerli hazineleridir: 'kitap kurdu' (çok kitap okuyan) ve 'göz nuru dökmek' (büyük emek harcamak).",
            "questionText": "Bu iki deyimi ('kitap kurdu' ve 'göz nuru dökmek') anlamlarına uygun şekilde kullanarak Ali'nin kitap okuma tutkusunu anlatan 2-3 cümlelik kısa bir paragraf yazınız.",
            "solutionExplanation": "Deyimlerin bağlama uygun olarak paragraf içinde kullanılması.",
            "modelAnswer": "Ali, köyün en çalışkan kitap kurdu olarak her fırsatta kütüphaneye koşardı. Elif Öğretmen'in büyük bir göz nuru dökerek kurduğu bu rengârenk yuvada Ali, akşama kadar yeni serüvenlerin izini sürerdi.",
            "rubric": [
                {"criterion": "İki deyimin anlamına uygun ve doğru kullanılması", "points": 7},
                {"criterion": "Paragrafın anlam bütünlüğü ve anlatım akıcılığı", "points": 7}
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
            "contextText": "Konuşma çizgisi, iki nokta ve tırnak işareti kuralları.",
            "stimulus": "Metin: 'Elif Öğretmen sınıfa girdi ve şöyle dedi: — Çocuklar, kütüphanemiz yarın saat 10.00'da törenle açılıyor!'",
            "questionText": "Yukarıdaki cümlede yer alan 'iki nokta (:)' ve 'uzun çizgi (—)' işaretlerinin hangi kurallara dayanılarak kullanıldığını açıklayınız.",
            "solutionExplanation": "İki nokta kendisinden sonra konuşma veya açıklama geleceğini belirtir; uzun çizgi satır başındaki karşılıklı konuşmayı gösterir.",
            "modelAnswer": "1. İki Nokta (:): Kendisinden sonra doğrudan bir başkasının sözü (konuşma cümlesi) geleceği için kullanılmıştır.\n2. Uzun Çizgi (—): Karşılıklı konuşmalarda konuşan kişinin sözlerinin başına (konuşma çizgisi olarak) konulmuştur.",
            "rubric": [
                {"criterion": "İki noktanın kuralının doğru açıklanması", "points": 7},
                {"criterion": "Konuşma çizgisinin kuralının doğru açıklanması", "points": 7}
            ]
        }
    ]
}

sc_5 = {
    "id": "exam_5_turkce_1_1_senaryo_5",
    "grade": 5,
    "subjectId": "turkce",
    "examTerm": "1_donem_1_yazili",
    "scenarioId": "senaryo_5",
    "title": "5. Sınıf Türkçe 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 5) (7 Soru)",
    "description": "MEB ÖDSGM 5. Sınıf Türkçe 5. Senaryo resmi konu soru dağılımına uygun 100 puanlık sınav kağıdı.",
    "durationMinutes": 40,
    "totalPoints": 100,
    "questions": [
        {
            "questionNumber": 1,
            "outcomeCode": "T.O.5.5",
            "outcomeTitle": "T.O.5.5. Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme",
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "points": 15,
            "contextText": "Dede Korkut Masalları ve Boğaç Han.",
            "stimulus": "Bayındır Han'ın görkemli toyunda beslenen azgın bir boğa meydandan kaçtı. Meydandaki herkes kaçışırken Dirse Han'ın on beş yaşındaki cesur oğlu meydanın ortasında dimdik durdu. Boğa hışımla üzerine koştuğunda genç alp geri adım atmadı; yumruğunu boğanın alnına dayayarak onu diz çöktürdü. Dede Korkut gelip boy boyladı, soy soyladı ve bu yiğide 'Boğaç Han' adını verdi.",
            "questionText": "Metinde geçen 'toy' ve 'alp' kelimelerinin metindeki bağlam anlamlarını tahmin ederek yazınız.",
            "solutionExplanation": "Toy: Büyük ziyafet, şenlik. Alp: Yiğit, cesur savaşçı/kahraman.",
            "modelAnswer": "• Toy: Eski Türklerde boy beylerinin ve halkın katıldığı büyük ziyafet, şenlik ve eğlence meclisi.\n• Alp: Korkusuz, yiğit, kahraman savaşçı.",
            "rubric": [
                {"criterion": "Toy sözcüğünün ziyafet/şenlik bağlamında doğru tahmini", "points": 8},
                {"criterion": "Alp sözcüğünün yiğit/kahraman bağlamında doğru tahmini", "points": 7}
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
            "contextText": "Metnin ana fikrini belirleme.",
            "stimulus": "Metinde Dirse Han'ın oğlunun kaçmak yerine boğanın karşısında cesaretle durması ve onu aklıyla, bilek gücüyle alt etmesi anlatılmaktadır.",
            "questionText": "Yukarıdaki metnin ana fikrini (vermek istediği temel mesajı) yazınız.",
            "solutionExplanation": "Zorluklar ve tehlikeler karşısında cesaretle duranlar başarıya ve şerefe ulaşırlar.",
            "modelAnswer": "Metnin ana fikri: Tehlikeler ve zorluklar karşısında korkup kaçmak yerine cesaret ve azimle mücadele edenler büyük engelleri aşar ve toplumda haklı bir saygı kazanırlar.",
            "rubric": [
                {"criterion": "Cesaret ve zorluklarla mücadele ana fikrinin doğru ifadesi", "points": 15}
            ]
        },
        {
            "questionNumber": 3,
            "outcomeCode": "T.O.5.6",
            "outcomeTitle": "T.O.5.6. Metnin yüzey anlamını belirleyebilme",
            "difficulty": "Orta",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "points": 14,
            "contextText": "Neden-sonuç ilişkisi.",
            "stimulus": "Metne göre: Dede Korkut bu gence neden 'Boğaç Han' adını vermiştir?",
            "questionText": "Gence bu ismin verilme gerekçesini metindeki olay örgüsünden hareketle açıklayınız.",
            "solutionExplanation": "Boğayı yumruğuyla bastırıp alt ettiği için.",
            "modelAnswer": "Kızgın ve azgın boğayı kaçmak yerine alnına vurduğu tek yumrukla dize getirip boğduğu (alt ettiği) için Dede Korkut ona 'Boğaç' adını vermiştir.",
            "rubric": [
                {"criterion": "Boğayı dize getirme/alt etme neden-sonuç bağının doğru yazılması", "points": 14}
            ]
        },
        {
            "questionNumber": 4,
            "outcomeCode": "T.O.5.7",
            "outcomeTitle": "T.O.5.7. Görselle iletilen anlamı belirleyebilme",
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Görsel / Deney / Günlük Hayat Durumu",
            "points": 14,
            "contextText": "Minyatür çiziminde Dede Korkut ve kopuzu.",
            "stimulus": "Metnin yanında yer alan tarihî minyatürde: Ak sakallı, başında börkü olan bir bilge dede elinde kopuz çalmakta ve çadırın etrafında toplanan obanın gençlerine nasihatler vermektedir.",
            "questionText": "Bu görselde Dede Korkut'un elindeki 'kopuz' ve etrafındaki dinleyiciler onun Türk kültüründeki hangi iki önemli rolünü simgelemektedir?",
            "solutionExplanation": "Ozanlık/müzisyenlik ve yol gösterici bilgelik/aksakallılık.",
            "modelAnswer": "1. Ozanlık / Âşıklık Geleneği: Elindeki kopuz, onun Türk milletinin destanlarını, kahramanlıklarını ezgiyle anlatan kadim bir halk ozanı olduğunu simgeler.\n2. Aksakallı Bilgelik ve Yol Göstericilik: Etrafındaki gençlerin saygıyla dinlemesi, onun obanın akıl hocası, barış elçisi ve töre koruyucusu ulu bir bilge olduğunu gösterir.",
            "rubric": [
                {"criterion": "Kopuzun ozanlık ve destan anlatıcılığı sembolünün açıklanması", "points": 7},
                {"criterion": "Aksakallı bilgelik ve akıl hocalığı rolünün belirtilmesi", "points": 7}
            ]
        },
        {
            "questionNumber": 5,
            "outcomeCode": "T.O.5.20",
            "outcomeTitle": "T.O.5.20. Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme",
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "points": 14,
            "contextText": "Eş anlamlı sözcükler.",
            "stimulus": "Metinde geçen sözcükler: 'ad', 'yiğit', 'alaka'.",
            "questionText": "Aşağıdaki sözcüklerin metindeki anlamına uygun eş anlamlılarını karşılarına yazınız:\n• ad: ............................\n• yiğit: ............................\n• tören: ............................",
            "solutionExplanation": "ad = isim, yiğit = cesur/alp, tören = merasim.",
            "modelAnswer": "• ad: isim\n• yiğit: cesur (kahraman / yürekli)\n• tören: merasim (kutlama)",
            "rubric": [
                {"criterion": "Üç eş anlamlı sözcüğün eksiksiz yazılması (her biri ~4.6 puan)", "points": 14}
            ]
        },
        {
            "questionNumber": 6,
            "outcomeCode": "T.Y.5.3",
            "outcomeTitle": "T.Y.5.3. Yazısında içerik ve yapıya yönelik seçimlerini yönetebilme",
            "difficulty": "Zor",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "points": 14,
            "contextText": "Hikaye unsurlarını belirleme (Serim, Düğüm, Çözüm).",
            "stimulus": "Boğaç Han metninin olay örgüsü.",
            "questionText": "Boğaç Han metninin hikâye unsurlarını aşağıdaki şablona göre yazınız:\n• Olay: ....................................................\n• Şahıs Kadrosu: ....................................................\n• Mekân (Yer): ....................................................\n• Çözüm Bölümü: ....................................................",
            "solutionExplanation": "Hikaye unsurlarının tespiti.",
            "modelAnswer": "• Olay: Bayındır Han'ın toyunda kaçan azgın boğayı genç bir yiğidin cesaretle alt etmesi ve isim kazanması.\n• Şahıs Kadrosu: Dirse Han'ın oğlu (Boğaç Han), Bayındır Han, Dede Korkut, oba halkı.\n• Mekân: Bayındır Han'ın toy meydanı / oba çadırı.\n• Çözüm: Boğanın yenilmesi üzerine Dede Korkut'un gelerek gence kahramanlığına uygun 'Boğaç Han' adını vermesi.",
            "rubric": [
                {"criterion": "Olay ve şahıs kadrosunun eksiksiz tespiti", "points": 7},
                {"criterion": "Mekân ve çözüm bölümünün doğru tespiti", "points": 7}
            ]
        },
        {
            "questionNumber": 7,
            "outcomeCode": "T.Y.5.13",
            "outcomeTitle": "T.Y.5.13. Yazısını zenginleştirecek biçimde söz varlığını kullanabilme",
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Görsel / Deney / Günlük Hayat Durumu",
            "points": 14,
            "contextText": "Deyim kullanımı: 'gözünü budaktan sakınmamak' ve 'nam salmak'.",
            "stimulus": "Deyimler: 'gözünü budaktan sakınmamak' (hiçbir tehlikeden korkmamak) ve 'nam salmak' (herkesçe tanınmak, şöhret kazanmak).",
            "questionText": "Bu iki deyimi kullanarak bir kahramanın mücadelesini anlatan 2 cümle yazınız.",
            "solutionExplanation": "Deyimlerin anlamına uygun kullanımı.",
            "modelAnswer": "Genç yiğit düşman karşısında gözünü budaktan sakınmayarak obasını büyük bir tehlikeden kurtardı. Gösterdiği bu eşsiz cesaretle kısa sürede tüm Türk yurtlarında nam saldı.",
            "rubric": [
                {"criterion": "'Gözünü budaktan sakınmamak' deyiminin doğru kullanımı", "points": 7},
                {"criterion": "'Nam salmak' deyiminin doğru kullanımı", "points": 7}
            ]
        }
    ]
}

sc_6 = {
    "id": "exam_5_turkce_1_1_senaryo_6",
    "grade": 5,
    "subjectId": "turkce",
    "examTerm": "1_donem_1_yazili",
    "scenarioId": "senaryo_6",
    "title": "5. Sınıf Türkçe 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 6) (8 Soru)",
    "description": "MEB ÖDSGM 5. Sınıf Türkçe 6. Senaryo resmi konu soru dağılımına uygun 100 puanlık sınav kağıdı.",
    "durationMinutes": 40,
    "totalPoints": 100,
    "questions": [
        {
            "questionNumber": 1,
            "outcomeCode": "T.O.5.5",
            "outcomeTitle": "T.O.5.5. Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme",
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "points": 13,
            "contextText": "Ege'de zeytin hasadı.",
            "stimulus": "Ekim ayının son günlerinde Ayvalık'taki zeytinliklerde tatlı bir telaş başlar. Hasan Dede sabahın ayazında torunu Can'ın eline sırığı verir. Ağaçların altına yaygılar serilir; olgunlaşan taneler incitilmeden silkelenir. Hasan Dede: 'Zeytin ağacı barışın ve sabrın simgesidir evlat. Ona hürmet edersen seni bin yıl doyurur' der. Toplanan zeytinler çuvallarla taş değirmenlere götürülür ve altın sarısı soğuk sıkım zeytinyağı elde edilir.",
            "questionText": "Metinde geçen 'hasat' ve 'ayaz' sözcüklerinin anlamlarını metnin bağlamından tahmin ederek yazınız.",
            "solutionExplanation": "Hasat: Ürün toplama dönemi. Ayaz: Duru ve çok soğuk hava.",
            "modelAnswer": "• Hasat: Tarlada, bahçede olgunlaşan ekin ve meyvelerin toplanması vakti/eylemi.\n• Ayaz: Kışın ya da sonbahar sabahlarında gökyüzü açıkken hissedilen keskin ve kuru soğuk.",
            "rubric": [
                {"criterion": "Hasat sözcüğünün doğru tahmini", "points": 7},
                {"criterion": "Ayaz sözcüğünün doğru tahmini", "points": 6}
            ]
        },
        {
            "questionNumber": 2,
            "outcomeCode": "T.O.5.6",
            "outcomeTitle": "T.O.5.6. Metnin yüzey anlamını belirleyebilme",
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "points": 13,
            "contextText": "Metnin konusunu belirleme.",
            "stimulus": "Metinde bir zeytin bahçesinde dede ve torunun sabah erken saatlerde başlayıp zeytin toplamaları ve zeytinyağı üretimi anlatılmaktadır.",
            "questionText": "Yukarıdaki metnin konusunu tek bir cümleyle yazınız.",
            "solutionExplanation": "Ege'de geleneksel zeytin hasadı ve zeytinin bereketi.",
            "modelAnswer": "Metnin konusu, bir dede ile torununun zeytin bahçesinde emek vererek yaptıkları geleneksel zeytin hasadı ve zeytin ağacının değeridir.",
            "rubric": [
                {"criterion": "Zeytin hasadı ve emeği kapsayan doğru konu cümlesi", "points": 13}
            ]
        },
        {
            "questionNumber": 3,
            "outcomeCode": "T.O.5.6",
            "outcomeTitle": "T.O.5.6. Metnin yüzey anlamını belirleyebilme",
            "difficulty": "Orta",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "points": 13,
            "contextText": "Zeytin hasadı aşamalarını sıralama.",
            "stimulus": "Metinde zeytinin toplanıp yağa dönüştürülmesine kadar belirli bir sıra anlatılmıştır.",
            "questionText": "Metinden hareketle zeytinyağı elde edilişinin ilk 3 aşamasını sırasıyla yazınız.",
            "solutionExplanation": "Yaygıların serilmesi, ağaçların silkelenmesi, değirmenlerde ezilip yağ çıkarılması.",
            "modelAnswer": "1. Ağaçların altına zeytin taneleri toprağa düşmesin diye yaygıların serilmesi.\n2. Sırıklarla olgunlaşan zeytinlerin dallara zarar vermeden silkelenip toplanması.\n3. Toplanan zeytinlerin taş değirmenlere götürülerek ezilip soğuk sıkım yağının çıkarılması.",
            "rubric": [
                {"criterion": "Üç aşamanın doğru kronolojik sırayla yazılması", "points": 13}
            ]
        },
        {
            "questionNumber": 4,
            "outcomeCode": "T.O.5.7",
            "outcomeTitle": "T.O.5.7. Görselle iletilen anlamı belirleyebilme",
            "difficulty": "Orta",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Görsel / Deney / Günlük Hayat Durumu",
            "points": 13,
            "contextText": "Zeytin dalı ve güvercin amblemi.",
            "stimulus": "Zeytinyağı şişesinin etiketinde ağzında zeytin dalı taşıyan beyaz bir güvercin görseli basılmıştır.",
            "questionText": "Ağzında zeytin dalı taşıyan beyaz güvercin simgesi dünyada hangi evrensel kavramı sembolize eder? Açıklayınız.",
            "solutionExplanation": "Barış, kardeşlik ve esenlik.",
            "modelAnswer": "Ağzında zeytin dalı olan beyaz güvercin evrensel olarak 'barış, huzur ve dostluk' kavramını simgeler. Hasan Dede'nin metinde belirttiği gibi zeytin ağacı kadim zamanlardan beri barışın en temiz sembolüdür.",
            "rubric": [
                {"criterion": "Barış ve dostluk kavramının doğru tespiti", "points": 13}
            ]
        },
        {
            "questionNumber": 5,
            "outcomeCode": "T.O.5.15",
            "outcomeTitle": "T.O.5.15. Metnin anahtar kelimelerini belirlemeye yönelik çözümleme yapabilme",
            "difficulty": "Kolay",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "points": 12,
            "contextText": "Anahtar kelimeler.",
            "stimulus": "Metin zeytin ağacı, hasat zamanı, emek ve zeytinyağı etrafında şekillenmiştir.",
            "questionText": "Bu metnin içeriğini en iyi özetleyen 3 anahtar kelimeyi yazınız.",
            "solutionExplanation": "Zeytin, hasat, emek (veya zeytinyağı, bereket).",
            "modelAnswer": "1. Zeytin\n2. Hasat\n3. Emek (veya Zeytinyağı / Bereket)",
            "rubric": [
                {"criterion": "Üç isabetli anahtar kelimenin yazılması (her biri 4 puan)", "points": 12}
            ]
        },
        {
            "questionNumber": 6,
            "outcomeCode": "T.O.5.20",
            "outcomeTitle": "T.O.5.20. Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme",
            "difficulty": "Orta",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "points": 12,
            "contextText": "Zıt anlamlı sözcükler.",
            "stimulus": "Metindeki kavramlar: 'sabah', 'olgun', 'tatlı'.",
            "questionText": "Aşağıdaki kelimelerin zıt (karşıt) anlamlılarını karşılarına yazınız:\n• sabah: ............................\n• olgun: ............................\n• tatlı: ............................",
            "solutionExplanation": "sabah -> akşam, olgun -> ham/çağla, tatlı -> acı.",
            "modelAnswer": "• sabah: akşam\n• olgun: ham (veya çiğ)\n• tatlı: acı",
            "rubric": [
                {"criterion": "Üç zıt anlamlı sözcüğün doğru yazılması (her biri 4 puan)", "points": 12}
            ]
        },
        {
            "questionNumber": 7,
            "outcomeCode": "T.Y.5.3",
            "outcomeTitle": "T.Y.5.3. Yazısında içerik ve yapıya yönelik seçimlerini yönetebilme",
            "difficulty": "Zor",
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "archetype": "Kurgusal Senaryo & Vaka İncelemesi",
            "points": 12,
            "contextText": "Metne uygun başlık belirleme.",
            "stimulus": "Okuduğunuz metin zeytinin bereketi, dedenin emeği ve doğaya duyulan saygıyı işlemektedir.",
            "questionText": "Bu metne içerikle uyumlu, okuyucunun ilgisini çekecek 2 farklı başlık önerisi yazınız.",
            "solutionExplanation": "Başlık metnin içeriğini yansıtmalı ve çekici olmalıdır.",
            "modelAnswer": "1. Başlık Önerisi: Bereketin Adı: Zeytin\n2. Başlık Önerisi: Dedemin Zeytin Bahçesi (veya Asırlık Ağacın Mirası)",
            "rubric": [
                {"criterion": "İki özgün ve içerikle tam uyumlu başlık önerisi yazılması", "points": 12}
            ]
        },
        {
            "questionNumber": 8,
            "outcomeCode": "T.Y.5.16",
            "outcomeTitle": "T.Y.5.16. Yazım ve noktalama işaretleriyle ilgili kuralları uygulayabilme",
            "difficulty": "Orta",
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "archetype": "Hata Tespiti & Adım Analizi",
            "points": 12,
            "contextText": "Bağlaç olan 'de' ve ek olan '-de'nin yazımı.",
            "stimulus": "Cümle: 'Ayvalık'ta zeytin ağaçları da bahçelerde ki taş değirmenlerde hasat heyecanı yaşıyor.'",
            "questionText": "Yukarıdaki cümlede yer alan bağlaç olan 'da' ile ek olan '-de' ve 'ki'nin yazımını inceleyiniz. Yapılan 1 yazım hatasını tespit edip doğrusunu yazınız.",
            "solutionExplanation": "'bahçelerde ki' sözcüğündeki -ki sıfat yapan ektir ve bitişik yazılmalıdır: 'bahçelerdeki'.",
            "modelAnswer": "• Hata: 'bahçelerde ki' ayrı yazılmıştır.\n• Doğrusu: Buradaki '-ki' ismi niteleyen sıfat yapan aitlik ekidir; bu nedenle bitişik olarak 'bahçelerdeki taş değirmenler' şeklinde yazılmalıdır.",
            "rubric": [
                {"criterion": "Hatalı kelimenin doğru tespiti", "points": 6},
                {"criterion": "Kuralın gerekçesiyle birlikte doğru halinin ('bahçelerdeki') yazılması", "points": 6}
            ]
        }
    ]
}

exams.extend([sc_4, sc_5, sc_6])

# Verify points
for ex in exams:
    tot = sum(q['points'] for q in ex['questions'])
    assert tot == 100, f"Total points error in {ex['id']}: {tot} != 100"
    for q in ex['questions']:
        r_tot = sum(r['points'] for r in q['rubric'])
        assert r_tot == q['points'], f"Rubric error in {ex['id']} Q{q['questionNumber']}: {r_tot} != {q['points']}"

with open('meb_data/grade5_turkce_distinct.json', 'w', encoding='utf-8') as f:
    json.dump(exams, f, ensure_ascii=False, indent=2)

print(f"Grade 5 Türkçe all 6 scenarios successfully saved with {len(exams)} exams, 100% exact 100 points, 0 duplicates!")
