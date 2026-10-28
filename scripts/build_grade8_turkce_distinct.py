# -*- coding: utf-8 -*-
import json

# G8_DEDICATED: Dictionary keyed by (subject, outcome_code, sc_idx, inst)
G8_DEDICATED = {}

# =====================================================================
# GRADE 8 TÜRKÇE DEDICATED (7 Scenarios - 57 Questions)
# =====================================================================

# ---------------------------------------------------------------------
# SENARYO 1: Seyit Onbaşı ve Çanakkale Zaferi (8 Questions)
# ---------------------------------------------------------------------
G8_DEDICATED[('turkce', 'T.8.3.5', 0, 0)] = {
    "contextText": "Çanakkale metninde geçen sözcükler.",
    "stimulus": "Metin Parçası: '18 Mart 1915 günü Çanakkale Boğazı'nda top sesleri yeri göğü inletiyordu. Rumeli Mecidiye Tabyası ağır bir bombardıman altında kalmış, topun vinci parçalanmıştı. Havranlı Seyit Onbaşı, vatan aşkıyla devasa 215 okkalık mermiyi sırtlayarak namluya sürdü ve İngiliz zırhlısı Ocean'ı dümeninden vurarak saf dışı bıraktı.'",
    "questionText": "Metinde altı çizili 'saf dışı bırakmak' deyiminin metne kattığı anlamı bağlamdan hareketle açıklayınız.",
    "solutionExplanation": "Mücadele edemez, iş göremez, etkisiz duruma getirmek.",
    "modelAnswer": "'Saf dışı bırakmak' deyimi, metinde İngiliz Ocean zırhlısının dümeninden vurularak savaşamaz ve hareket edemez, etkisiz hâle getirilmesi anlamında kullanılmıştır.",
    "rubric": [("Deyimin 'etkisiz hale getirmek/iş göremez kılmak' anlamının yazılması", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.3.7', 0, 0)] = {
    "contextText": "Metindeki söz sanatları.",
    "stimulus": "Cümle: 'Top sesleri adeta yeri göğü inletiyor, koca tabyadaki toplar birer dev gibi denize meydan okuyordu.'",
    "questionText": "Verilen cümlede yer alan benzetme (teşbih) ve abartma (mübalağa) sanatlarını unsurlarıyla birlikte gösteriniz.",
    "solutionExplanation": "Benzetme: Toplar deve benzetilmiştir. Abartma: Top seslerinin yeri göğü inletmesi.",
    "modelAnswer": "• Abartma (Mübalağa): 'Top seslerinin yeri göğü inletmesi' ifadesinde sesin şiddeti olağanüstü büyütülerek anlatılmıştır.\n• Benzetme (Teşbih): 'Toplar birer dev gibi...' ifadesinde toplar (benzeyen) büyüklük ve güç bakımından deve (benzetilen) benzetilmiştir.",
    "rubric": [("Abartma sanatının gerekçesiyle gösterilmesi", 0.5), ("Benzetme sanatının unsurlarıyla gösterilmesi", 0.5)]
}
G8_DEDICATED[('turkce', 'T.8.3.9', 0, 0)] = {
    "contextText": "Fiilimsilerin türleri ve cümledeki işlevi.",
    "stimulus": "Cümle: 'Vincin kırılması üzerine devasa mermiyi sırtlayan Seyit, basamakları inleyerek tırmandı.'",
    "questionText": "Cümledeki üç farklı fiilimsiyi bularak türlerini (isim-fiil, sıfat-fiil, zarf-fiil) karşılarına yazınız:\n1. ................................. -> .................................\n2. ................................. -> .................................\n3. ................................. -> .................................",
    "solutionExplanation": "kırılması (isim-fiil), sırtlayan (sıfat-fiil), inleyerek (zarf-fiil).",
    "modelAnswer": "1. kırılması -> İsim-fiil (-ma eki)\n2. sırtlayan -> Sıfat-fiil (-an eki)\n3. inleyerek -> Zarf-fiil (-erek eki)",
    "rubric": [("Üç fiilimsinin ve türlerinin hatasız eşleştirilmesi", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.3.14', 0, 0)] = {
    "contextText": "Metin anlama ve çıkarım.",
    "stimulus": "Metin Parçası: 'Rumeli Mecidiye Tabyası'nda vinç mekanizması bozulduğunda hiçbir askerin umutsuzluğa kapılmaması, Seyit Onbaşı'nın insanüstü bir gayretle tek başına mermiyi kaldırmasını sağlamıştır.'",
    "questionText": "Seyit Onbaşı'yı devasa top mermisini tek başına taşımaya sevk eden temel duygu ve inanç nedir? Metinden hareketle açıklayınız.",
    "solutionExplanation": "Vatan sevgisi, bağımsızlık inancı ve teslim olmama kararlılığı.",
    "modelAnswer": "Seyit Onbaşı'yı devasa mermiyi tek başına kaldırmaya sevk eden temel unsur; derin vatan sevgisi, mukaddesatı ve milleti koruma sorumluluğu ile Çanakkale Boğazı'nın düşman donanmasına geçit vermeyeceğine olan sarsılmaz inancıdır.",
    "rubric": [("Vatan sevgisi ve millet bilincinin belirtilmesi", 0.5), ("Sorumluluk ve kararlılık vurgusu", 0.5)]
}
G8_DEDICATED[('turkce', 'T.8.3.16', 0, 0)] = {
    "contextText": "Metnin konusunu belirleme.",
    "stimulus": "Çanakkale Deniz Zaferi ve Seyit Onbaşı anlatımı.",
    "questionText": "Çanakkale Savaşı ve Seyit Onbaşı'nın kahramanlığını anlatan metnin konusunu tek bir cümleyle yazınız.",
    "solutionExplanation": "Çanakkale Deniz Zaferi'nde Seyit Onbaşı'nın fedakarlığı ve kahramanlığı.",
    "modelAnswer": "Metnin Konusu: Çanakkale Savaşları sırasında Rumeli Mecidiye Tabyası'nda Seyit Onbaşı'nın gösterdiği olağanüstü kahramanlık ve vatan savunmasıdır.",
    "rubric": [("Metnin konusunun eksiksiz ve tek cümleyle ifade edilmesi", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.3.34', 0, 0)] = {
    "contextText": "Düşünceyi geliştirme yolları.",
    "stimulus": "Cümle: 'Seyit Onbaşı'nın kaldırdığı mermi tam 215 okka, yani yaklaşık 276 kilogram ağırlığındaydı. Oysa normal bir insanın sırtında taşıyabileceği ağırlık en fazla 50-60 kilogramdır.'",
    "questionText": "Yazarın bu parçada düşüncesini kanıtlamak ve inandırıcı kılmak için başvurduğu 2 düşünceyi geliştirme yolunu yazınız.",
    "solutionExplanation": "Sayısal verilerden yararlanma ve karşılaştırma.",
    "modelAnswer": "1. Sayısal Verilerden Yararlanma: '215 okka', '276 kilogram', '50-60 kilogram' gibi net ölçü ve istatistikî rakamlar kullanılmıştır.\n2. Karşılaştırma: Seyit Onbaşı'nın kaldırdığı olağanüstü yük ile sıradan bir insanın taşıyabileceği azami yük kıyaslanmıştır.",
    "rubric": [("Sayısal verilerden yararlanmanın tespiti", 0.5), ("Karşılaştırmanın tespiti ve açıklanması", 0.5)]
}
G8_DEDICATED[('turkce', 'T.8.4.1', 0, 0)] = {
    "contextText": "Şiir yazma becerisi.",
    "stimulus": "Tema: Çanakkale Zaferi, vatan sevgisi ve Mehmetçik.",
    "questionText": "Çanakkale şehitlerimizin ve gazilerimizin kahramanlığını anlatan, kafiye ve redif uyumuna dikkat edilmiş 4 dizelik (bir kıtalık) özgün bir şiir yazınız.",
    "solutionExplanation": "Özgün 4 dizelik kafiyeli kahramanlık şiiri.",
    "modelAnswer": "Örnek Dörtlük:\nBoğazın bağrında çelikten bir set,\nGeçit vermez asla bu aziz millet!\nToprağa can katan ey şanlı yiğit,\nSonsuza dek yaşar bu kutlu mabet!",
    "rubric": [("Dört dizenin tema ile uyumu", 0.6), ("Dize sonlarındaki ses benzerliği ve ahenk", 0.4)]
}
G8_DEDICATED[('turkce', 'T.8.4.15', 0, 0)] = {
    "contextText": "Geçiş ve bağlantı ifadeleri.",
    "stimulus": "Geçiş ifadeleri: 'özellikle', 'oysaki', 'başka bir deyişle'.",
    "questionText": "Verilen geçiş ve bağlantı ifadelerinden 'özellikle' ve 'oysaki' sözcüklerini Çanakkale savunmasını anlatan iki farklı anlamlı cümlede kullanınız.",
    "solutionExplanation": "Özellikle (vurgulama) ve oysaki (karşıtlık) işlevleriyle cümle içinde kullanımı.",
    "modelAnswer": "1. Cümle (özellikle): 'Çanakkale Boğazı'nı savunan Mehmetçik, özellikle gece yapılan topçu atışlarında düşman donanmasına büyük zayiat verdi.'\n2. Cümle (oysaki): 'Düşman ordusu boğazı bir günde kolayca geçeceğini sanıyordu; oysaki Türk milletinin vatan aşkını hesaba katmamıştı.'",
    "rubric": [("Özellikle ifadesinin vurgu amacıyla doğru kullanımı", 0.5), ("Oysaki ifadesinin karşıtlık amacıyla doğru kullanımı", 0.5)]
}

# ---------------------------------------------------------------------
# SENARYO 2: Bilim ve Yapay Zekâ Çağı (9 Questions)
# ---------------------------------------------------------------------
G8_DEDICATED[('turkce', 'T.8.3.5', 1, 0)] = {
    "contextText": "Bilim metninde geçen sözcükler.",
    "stimulus": "Metin Parçası: 'Yapay zekâ algoritmaları son yıllarda tıp, astronomi ve mühendislikte çığır açan keşiflere öncülük etmektedir. Devasa veri havuzlarını saniyeler içinde tarayan bu sistemler, araştırmacıların yıllar sürecek tahlillerini anında somutlaştırmaktadır.'",
    "questionText": "Metinde geçen 'çığır açmak' söz öbeğinin anlamını bağlamdan hareketle açıklayınız.",
    "solutionExplanation": "Bir alanda yeni bir dönem, tarz veya yön başlatmak, köklü yenilik getirmek.",
    "modelAnswer": "'Çığır açmak'; bir bilim veya sanat dalında daha önce bilinmeyen yeni bir yöntem başlatmak, büyük ve köklü bir yenilik veya dönüşüm meydana getirmek anlamına gelir.",
    "rubric": [("Yeni bir dönem/yöntem başlatma anlamının açıklanması", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.3.9', 1, 0)] = {
    "contextText": "Fiilimsilerin tespiti ve gruplandırılması.",
    "stimulus": "Cümle: 'Gelişen yapay zekâ modelleri, hastalıkları önceden teşhis ederek doktorlara karar alma süreçlerinde yardımcı olmaktadır.'",
    "questionText": "Cümlede yer alan fiilimsileri bularak türlerini yazınız:\n• ................................. -> .................................\n• ................................. -> .................................\n• ................................. -> .................................",
    "solutionExplanation": "Gelişen (sıfat-fiil), teşhis ederek (zarf-fiil), alma (isim-fiil).",
    "modelAnswer": "• Gelişen -> Sıfat-fiil (-en eki)\n• teşhis ederek -> Zarf-fiil (-erek eki)\n• alma -> İsim-fiil (-ma eki)",
    "rubric": [("Üç fiilimsinin türleriyle birlikte hatasız belirlenmesi", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.3.11', 1, 0)] = {
    "contextText": "Anlatım biçimlerini belirleme.",
    "stimulus": "Parça: 'Yapay zekâ, insan zekâsını taklit ederek öğrenme, problem çözme ve karar verme yeteneklerini bilgisayar yazılımlarına kazandıran bilim dalıdır. Günümüzde otonom araçlardan tıbbi görüntülemeye kadar her alanda nesnel verilerle çalışır.'",
    "questionText": "Bu parçada kullanılan temel anlatım biçimini belirleyiniz ve bu biçimin tercih edilme nedenini yazınız.",
    "solutionExplanation": "Açıklayıcı anlatım (Açıklama). Okuyucuya bilgi vermek amaçlanmıştır.",
    "modelAnswer": "Kullanılan Anlatım Biçimi: Açıklayıcı Anlatım (Açıklama).\nTercih Edilme Nedeni: Yazar, okuyucuya yapay zekânın tanımı, yetenekleri ve kullanım alanları hakkında nesnel ve öğretici bilgiler aktarmayı amaçlamıştır.",
    "rubric": [("Açıklayıcı anlatımın doğru belirlenmesi", 0.5), ("Bilgi verme amacının gerekçelendirilmesi", 0.5)]
}
G8_DEDICATED[('turkce', 'T.8.3.14', 1, 0)] = {
    "contextText": "Metinle ilgili soru cevaplama.",
    "stimulus": "Metin: 'Tıbbi teşhislerde yapay zekânın sunduğu en büyük avantaj, insan gözünün kaçırabileceği mikroskobik doku değişikliklerini milyonlarca röntgen filmini kıyaslayarak milisaniyeler içinde yakalamasıdır.'",
    "questionText": "Yapay zekânın tıp alanındaki teşhislerde insan uzmanlara sağladığı en önemli katkı nedir? Metne göre açıklayınız.",
    "solutionExplanation": "Gözden kaçabilecek çok küçük ayrıntıları milyonlarca veriyi hızla karşılaştırarak anında yakalamasıdır.",
    "modelAnswer": "En önemli katkısı; devasa veri tabanlarındaki milyonlarca örneği mikrosaniyeler içinde karşılaştırarak, en dikkatli insan gözünün bile gözden kaçırabileceği mikroskobik ayrıntı ve doku anormalliklerini erkenden teşhis edebilmesidir.",
    "rubric": [("Hızlı veri tarama ve mikroskobik ayrıntıyı yakalama vurgusu", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.3.17', 1, 0)] = {
    "contextText": "Metnin ana fikrini belirleme.",
    "stimulus": "Yapay zekâ ve insan aklı iş birliği metni.",
    "questionText": "Yazarın okuyucuya iletmek istediği asıl mesajı (ana fikri) bir cümleyle ifade ediniz.",
    "solutionExplanation": "Yapay zekâ insan zekâsının yerini alacak bir tehdit değil, insan aklını güçlendiren güçlü bir araçtır.",
    "modelAnswer": "Ana Fikir: Yapay zekâ teknolojileri insanın yerini alacak bir güç değil; doğru ve ahlaki ilkelerle yönetildiğinde insan aklının keşif ve üretkenlik gücünü katbekat artıran vazgeçilmez bir yardımcıdır.",
    "rubric": [("Ana fikrin açık, öz ve doğru ifade edilmesi", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.3.25', 1, 0)] = {
    "contextText": "Metinden çıkarım yapma.",
    "stimulus": "Parça: 'Sadece veriyi işlemek bir yapay zekâyı başarılı kılabilir; ancak ona etik kurallar koymak ve nerede duracağını belirlemek ancak insan vicdanının işidir.'",
    "questionText": "Bu parçadan hareketle bilimsel ilerlemede 'insan vicdanı ve etik' hakkında yapılabilecek en temel çıkarımı yazınız.",
    "solutionExplanation": "Teknolojik gelişme tek başına yeterli değildir; vicdani ve ahlaki denetim olmadan teknoloji insanlığa zarar verebilir.",
    "modelAnswer": "Çıkarım: Teknolojik ve algoritmik güç ne kadar gelişirse gelişsin, onu denetleyecek, insanlığın hayrına yönlendirecek ve etik sınırları çizecek olan unsur insan vicdanıdır; ahlaki denetimden yoksun teknoloji tehlike doğurur.",
    "rubric": [("Teknolojinin etik ve vicdani yönlendirmeye muhtaç olduğu çıkarımı", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.3.26', 1, 0)] = {
    "contextText": "Metin türlerini ayırt etme.",
    "stimulus": "Parça: 'Yapay zekâ algoritmalarının eğitim verilerindeki önyargıları devralması, günümüz bilgisayar mühendisliğinin en tartışmalı konusudur. 2024 yılında yapılan bir araştırmaya göre, yüz tanıma modellerinin hata oranı farklı ten renklerinde %15'e kadar çıkabilmektedir.'",
    "questionText": "Bu metnin türünü (makale, deneme, anı, gezi yazısı) belirleyiniz ve bu türe ait olduğunu gösteren 2 kanıt gösteriniz.",
    "solutionExplanation": "Metin türü Makaledir. Kanıtlar: Nesnel anlatım, bilimsel araştırma verisi, kanıtlama amacı.",
    "modelAnswer": "• Metin Türü: Makale\n• Kanıt 1: Yazar kişisel duyguları yerine bilimsel araştırma sonuçlarına ve istatistiki sayısal verilere (%15 hata oranı) dayanmıştır.\n• Kanıt 2: Dil nesnel, ciddi ve öğreticidir; amaç okuyucuya bilgi aktarıp tezini kanıtlamaktır.",
    "rubric": [("Makale türünün doğru tespiti", 0.5), ("İki nesnel kanıtın açıklanması", 0.5)]
}
G8_DEDICATED[('turkce', 'T.8.3.34', 1, 0)] = {
    "contextText": "Düşünceyi geliştirme yolları.",
    "stimulus": "Parça: 'Klasik bilgisayarlar problemleri adım adım sırayla çözer. Oysa kuantum ve yapay zekâ işlemcileri, aynı anda milyarlarca olasılığı paralel olarak hesaplayabilmektedir.'",
    "questionText": "Bu parçada kullanılan düşünceyi geliştirme yolunu belirleyerek nasıl uygulandığını açıklayınız.",
    "solutionExplanation": "Karşılaştırma yapılmıştır. Klasik bilgisayarlar ile kuantum/yapay zekâ işlemcileri kıyaslanmıştır.",
    "modelAnswer": "Kullanılan Yol: Karşılaştırma.\nAçıklama: Yazar, klasik bilgisayarların ardışık (adım adım) problem çözme hızı ile kuantum ve yapay zekâ işlemcilerinin eş zamanlı paralel işlem kabiliyetini kıyaslayarak aralarındaki performans farkını ortaya koymuştur.",
    "rubric": [("Karşılaştırma yolunun tespiti", 0.5), ("Kıyaslanan unsurların açıklanması", 0.5)]
}
G8_DEDICATED[('turkce', 'T.8.4.9', 1, 0)] = {
    "contextText": "Açıklayıcı ve tartışmacı anlatım biçimlerini yazıda kullanma.",
    "stimulus": "Konu: 'Yapay zekâ gelecekte meslekleri yok mu edecek, yoksa yeni meslekler mi doğuracak?'",
    "questionText": "Yukarıdaki soru etrafında kendi görüşünüzü savunan, tartışmacı anlatım biçimini kullanarak 3-4 cümlelik kısa bir paragraf yazınız.",
    "solutionExplanation": "Kendi fikrini savunup karşıt görüşü çürüten tartışmacı anlatım paragrafı.",
    "modelAnswer": "Örnek Paragraf:\nBazı kimseler yapay zekânın gelecekte insanları bütünüyle işsiz bırakacağını iddia ediyor. Oysa bu görüş son derece yanıltıcıdır. Geçmişteki sanayi devriminde olduğu gibi, bazı geleneksel işler kaybolurken veri analistliği, yapay zekâ etik uzmanlığı gibi binlerce yeni uzmanlık alanı doğmaktadır. Dolayısıyla teknoloji insanı devre dışı bırakmaz, sadece yeni beceriler kazanmaya mecbur kılar.",
    "rubric": [("Tartışmacı anlatım üslubunun kullanılması", 0.6), ("Düşüncenin mantıksal tutarlılığı", 0.4)]
}

# ---------------------------------------------------------------------
# SENARYO 3: Ebru Sanatı ve Geleneksel Miras (7 Questions)
# ---------------------------------------------------------------------
G8_DEDICATED[('turkce', 'T.8.3.5', 2, 0)] = {
    "contextText": "Geleneksel sanatlar metninde kelime anlamı.",
    "stimulus": "Metin Parçası: 'Ebru, kitreli suyun yüzeyine toprak boyaların serpilmesi ve biz adı verilen ince uçlu aletlerle ahenkle şekillendirilmesiyle icra edilen kadim bir kâğıt süsleme sanatıdır.'",
    "questionText": "Metinde geçen 'icra etmek' sözcüğünün kazandığı anlamı bağlamdan yararlanarak yazınız.",
    "solutionExplanation": "Bir sanatı, mesleği veya işi uygulamak, yapmak, yerine getirmek.",
    "modelAnswer": "'İcra etmek' sözcüğü metinde ebru sanatını kurallarına uygun biçimde hayata geçirmek, uygulamak ve ortaya koymak anlamında kullanılmıştır.",
    "rubric": [("İcra etmek kelimesinin 'uygulamak/sanatı gerçekleştirmek' anlamıyla yazılması", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.3.7', 2, 0)] = {
    "contextText": "Metindeki söz sanatları: Teşbih ve Tezat.",
    "stimulus": "Cümle: 'Kitreli su teknesi bir dingin deniz gibi beklerken boyaların su üstündeki dansı hem dinginliği hem de coşkuyu aynı anda yaşatıyordu.'",
    "questionText": "Bu cümledeki tezat (karşıtlık) sanatını ve benzetme sanatını unsurlarıyla gösteriniz.",
    "solutionExplanation": "Tezat: dinginlik - coşku. Benzetme: su teknesi - dingin deniz.",
    "modelAnswer": "• Tezat (Karşıtlık): 'Dinginlik' (sakinlik, hareketsizlik) ile 'coşku' (heyecan, hareketlilik) kavramları bir arada kullanılarak tezat sanatı yapılmıştır.\n• Benzetme: 'Kitreli su teknesi' dingin bir denize benzetilmiştir.",
    "rubric": [("Tezat sanatının karşıt kelimelerle gösterilmesi", 0.5), ("Benzetme sanatının gösterilmesi", 0.5)]
}
G8_DEDICATED[('turkce', 'T.8.3.14', 2, 0)] = {
    "contextText": "Ebru sanatının malzemeleri ve sabır ilişkisi.",
    "stimulus": "Metin: 'Ebru ustası boyaların suya batmaması için sığır ödü kullanır; fırçalarını ise at kılı ve gül dalından bizzat kendisi hazırlar. Doğallık, ebrunun can damarıdır.'",
    "questionText": "Ebru sanatında boyaların su üstünde kalmasını sağlayan madde nedir ve fırçaların yapımında hangi doğal malzemeler kullanılır?",
    "solutionExplanation": "Boyaların batmaması için sığır ödü; fırçalar için at kılı ve gül dalı.",
    "modelAnswer": "Boyaların su yüzeyinde yüzmesini ve batmamasını sağlamak için 'sığır ödü' kullanılır. Fırçaların yapımında ise 'at kılı' ve 'gül dalı' kullanılır.",
    "rubric": [("Sığır ödünün belirtilmesi", 0.5), ("At kılı ve gül dalının belirtilmesi", 0.5)]
}
G8_DEDICATED[('turkce', 'T.8.3.16', 2, 0)] = {
    "contextText": "Metnin konusunu belirleme.",
    "stimulus": "Ebru sanatı ve usta-çırak geleneği anlatımı.",
    "questionText": "Geleneksel Türk ebru sanatını anlatan metnin konusunu tek bir cümleyle ifade ediniz.",
    "solutionExplanation": "Geleneksel Türk ebru sanatının incelikleri, malzemeleri ve kültürel değeri.",
    "modelAnswer": "Metnin Konusu: Geleneksel Türk ebru sanatının yapım aşamaları, doğal malzemeleri ve sabra dayalı felsefesidir.",
    "rubric": [("Ebru sanatının konusu eksiksiz ifade edildi", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.3.17', 2, 0)] = {
    "contextText": "Metnin ana fikrini belirleme.",
    "stimulus": "Ebrunun tekrarlanamaz ve benzersiz olması anlatımı.",
    "questionText": "Her yapılan ebrunun dünyada sadece tek bir nüsha olmasından hareketle metnin ana fikrini yazınız.",
    "solutionExplanation": "Ebru tıpkı insan gibi eşsiz ve tekrarlanamaz bir sanat olup ruha sabır ve tevazu aşılar.",
    "modelAnswer": "Ana Fikir: Ebru sanatı, suyun üzerindeki her damlanın benzersiz bir desen oluşturması gibi, insanın doğayla uyumunu simgeleyen ve kişiye sabır, teslimiyet ve estetik incelik kazandıran eşsiz bir kültürel mirastır.",
    "rubric": [("Eşsizlik ve sabır boyutunu içeren ana fikir", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.4.1', 2, 0)] = {
    "contextText": "Şiir yazma becerisi: Sanat ve Sabır.",
    "stimulus": "Tema: Ebru teknesi, renkler, suyun dili ve sabır.",
    "questionText": "Ebru sanatının renklerini ve suyun üzerindeki büyüsünü anlatan 4 dizelik (bir kıtalık) ahenkli bir şiir yazınız.",
    "solutionExplanation": "Özgün dörtlük.",
    "modelAnswer": "Örnek Dörtlük:\nGül dalında at kılı, teknede kitre suyu,\nBoyalar fısıldar ezelden beri huyu.\nHer fırça darbesiyle açılır lale, sümbül,\nSuyun nakşettiği renge hayran kalır bülbül.",
    "rubric": [("Dörtlüğün tema uyumu", 0.6), ("Ahenk ve kafiye örgüsü", 0.4)]
}
G8_DEDICATED[('turkce', 'T.8.4.18', 2, 0)] = {
    "contextText": "Cümlenin ögelerini bulma.",
    "stimulus": "Cümle: 'Usta sanatçı, teknedeki renkli damlaları ince bir bizle yavaşça dağıttı.'",
    "questionText": "Yukarıdaki cümlenin ögelerini (Özne, Belirtili Nesne, Zarf Tamlayıcısı, Yer Tamlayıcısı, Yüklem) eksiksiz olarak ayırıp yazınız:\n• Dağıttı: .................................\n• Usta sanatçı: .................................\n• Teknedeki renkli damlaları: .................................\n• İnce bir bizle: .................................\n• Yavaşça: .................................",
    "solutionExplanation": "Dağıttı (Yüklem), Usta sanatçı (Özne), Teknedeki renkli damlaları (Belirtili Nesne), İnce bir bizle (Zarf Tamlayıcısı/Edat Tümleci), Yavaşça (Zarf Tamlayıcısı).",
    "modelAnswer": "• Dağıttı: Yüklem\n• Usta sanatçı: Özne (Kim dağıttı?)\n• Teknedeki renkli damlaları: Belirtili Nesne (Neyi dağıttı?)\n• İnce bir bizle: Zarf Tamlayıcısı (Ne ile dağıttı?)\n• Yavaşça: Zarf Tamlayıcısı (Nasıl dağıttı?)",
    "rubric": [("Yüklem ve öznenin doğru tespiti", 0.4), ("Nesne ve zarf tamlayıcılarının doğru tespiti", 0.6)]
}

# ---------------------------------------------------------------------
# SENARYO 4: Orman Ekosistemleri ve Biyoçeşitlilik (7 Questions)
# ---------------------------------------------------------------------
G8_DEDICATED[('turkce', 'T.8.3.5', 3, 0)] = {
    "contextText": "Orman metninde kelime grubu.",
    "stimulus": "Metin Parçası: 'Ormanlar sadece ağaç toplulukları değil; mikoriza mantarlarından dev meşelere kadar sayısız canlının birbirine kenetlendiği kusursuz bir ekolojik ağdır.'",
    "questionText": "Metinde geçen 'birbirine kenetlenmek' ifadesinin doğadaki canlılar bağlamındaki mecazi anlamını açıklayınız.",
    "solutionExplanation": "Birbirine sıkı sıkıya bağlı olmak, dayanışma içinde ve birbirine muhtaç yaşamak.",
    "modelAnswer": "'Birbirine kenetlenmek' ifadesi, ormandaki farklı canlı türlerinin kopmaz bağlarla birbirine muhtaç olduğunu, birinin varlığının diğerinin yaşamına sıkı sıkıya bağlı olduğunu anlatır.",
    "rubric": [("Canlıların birbirine bağımlılığı ve ekolojik bağ anlamının açıklanması", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.3.11', 3, 0)] = {
    "contextText": "Metindeki anlatım biçimleri.",
    "stimulus": "Metin Parçası: 'Sonbaharda Karadeniz ormanları kızıla, sarıya ve turuncuya bürünür. Sisli vadi tabanlarında çağıldayan derenin sesi, çam iğnelerinin mis kokusuyla birleşir.'",
    "questionText": "Bu parçada ağır basan anlatım biçimini belirleyiniz ve parçadan bir betimleme örneği gösteriniz.",
    "solutionExplanation": "Betimleyici anlatım (Betimleme).",
    "modelAnswer": "Ağır Basan Anlatım Biçimi: Betimleyici Anlatım (Betimleme - Kelimelerle resim çizme).\nÖrnek: 'Karadeniz ormanlarının kızıla, sarıya bürünmesi' ve 'sisli vadi tabanlarında çağıldayan dere sesi' duyulara hitap eden canlı betimleme unsurlarıdır.",
    "rubric": [("Betimleme türünün doğru belirlenmesi", 0.5), ("Metinden duyusal betimleme örneğinin gösterilmesi", 0.5)]
}
G8_DEDICATED[('turkce', 'T.8.3.16', 3, 0)] = {
    "contextText": "Metnin konusunu belirleme.",
    "stimulus": "Ormanların iklim regülasyonu ve erozyon önleme fonksiyonu.",
    "questionText": "Orman ekosistemleri ve biyoçeşitliliği ele alan metnin konusunu tek bir cümleyle yazınız.",
    "solutionExplanation": "Ormanların ekosistem dengesi, iklim ve canlılar için hayati önemi.",
    "modelAnswer": "Metnin Konusu: Orman ekosistemlerinin biyolojik çeşitliliği koruma, toprak erozyonunu önleme ve iklimi dengelemedeki yaşamsal rolüdür.",
    "rubric": [("Metnin konusunun eksiksiz ifade edilmesi", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.3.17', 3, 0)] = {
    "contextText": "Metnin ana fikrini belirleme.",
    "stimulus": "İnsan faaliyetleri ve orman tahribatının küresel sonuçları.",
    "questionText": "Yazarın bu metinde okuyucuya aşılamak istediği temel düşünceyi (ana fikri) yazınız.",
    "solutionExplanation": "Ormanları korumak bir tercih değil, gezegendeki tüm yaşamın devamı için zorunluluktur.",
    "modelAnswer": "Ana Fikir: Ormanlar yeryüzünün akciğerleri ve can damarıdır; ormanları korumak ve yaşatmak sadece doğaya saygı değil, insanlığın kendi geleceğini teminat altına almasının tek yoludur.",
    "rubric": [("Gezegenin geleceği ve koruma zorunluluğunu içeren ana fikir", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.3.34', 3, 0)] = {
    "contextText": "Düşünceyi geliştirme yolları: Tanımlama ve Örnekleme.",
    "stimulus": "Parça: 'Erozyon, toprağın su ve rüzgâr etkisiyle aşınarak taşınması olayıdır. Nitekim ağaçsız yamaçlarda her yıl milyonlarca ton verimli tarım toprağı baraj göllerine akmaktadır; örneğin TEMA Vakfı verilerine göre İç Anadolu'da rüzgâr erozyonu tarım alanlarını çölleştirmektedir.'",
    "questionText": "Parçada kullanılan 'tanımlama' ve 'örnekleme' düşünceyi geliştirme yollarını metinden bularak yazınız.",
    "solutionExplanation": "Tanımlama: Erozyon nedir? sorusunun cevabı. Örnekleme: TEMA Vakfı'nın İç Anadolu örneği.",
    "modelAnswer": "• Tanımlama: 'Erozyon, toprağın su ve rüzgâr etkisiyle aşınarak taşınması olayıdır.' cümlesinde erozyonun tanımı yapılmıştır.\n• Örnekleme: TEMA Vakfı'nın İç Anadolu Bölgesi'ndeki rüzgâr erozyonuna dikkat çekmesi somut bir örnek olarak sunulmuştur.",
    "rubric": [("Tanımlama cümlesinin gösterilmesi", 0.5), ("Örneklemenin gösterilmesi", 0.5)]
}
G8_DEDICATED[('turkce', 'T.8.4.4', 3, 0)] = {
    "contextText": "Yazma stratejileri: Taslak oluşturma.",
    "stimulus": "Tema: 'Gelecek Nesillere Yeşil Bir Dünya Bırakmak'.",
    "questionText": "Bu tema çerçevesinde yazacağınız bir bilgilendirici metin için giriş, gelişme ve sonuç paragraflarında ele alacağınız ana noktaları birer cümleyle taslak halinde yazınız.",
    "solutionExplanation": "Giriş, gelişme ve sonuç bölümlerinin planlanması.",
    "modelAnswer": "• Giriş Taslağı: Ormanların dünyanın soluduğu oksijen kaynağı olduğunu belirterek günümüzdeki çevre kirliliğine dikkat çekeceğim.\n• Gelişme Taslağı: Orman tahribatının iklim krizine, kuraklığa ve canlı türlerinin yok oluşuna etkilerini somut verilerle açıklayacağım.\n• Sonuç Taslağı: Ağaçlandırma seferberliği ve geri dönüşüm bilinciyle her bireyin üzerine düşen sorumluluğu vurgulayarak çağrıda bulunacağım.",
    "rubric": [("Giriş, gelişme ve sonuç taslağının tutarlı oluşturulması", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.4.15', 3, 0)] = {
    "contextText": "Geçiş ve bağlantı ifadeleri.",
    "stimulus": "Bağlantı ifadeleri: 'başka bir deyişle', 'buna rağmen'.",
    "questionText": "'Başka bir deyişle' ifadesini ormanların korunması konusunda açıklayıcı bir cümlede; 'buna rağmen' ifadesini ise çevreye verilen zararları anlatan karşıtlık içeren bir cümlede kullanınız.",
    "solutionExplanation": "İki ifadenin işlevlerine uygun cümlelerde kullanımı.",
    "modelAnswer": "1. Cümle (başka bir deyişle): 'Ormanlar atmosferdeki karbonu hapsederek havayı temizler; başka bir deyişle yeryüzünün devasa doğal filtreleridir.'\n2. Cümle (buna rağmen): 'Uzmanlar orman yangınlarının yıkıcı sonuçlarını her fırsatta dile getiriyor; buna rağmen dikkatsiz piknikçiler ormanlara cam şişe ve izmarit atmaya devam ediyor.'",
    "rubric": [("Başka bir deyişle ifadesinin doğru kullanımı", 0.5), ("Buna rağmen ifadesinin karşıtlık bildirecek şekilde doğru kullanımı", 0.5)]
}

# ---------------------------------------------------------------------
# SENARYO 5: Kitap Okuma Kültürü ve Kütüphaneler (9 Questions)
# ---------------------------------------------------------------------
G8_DEDICATED[('turkce', 'T.8.3.7', 4, 0)] = {
    "contextText": "Söz sanatları: Kişileştirme (Teşhis).",
    "stimulus": "Cümle: 'Kütüphanenin tozlu raflarında sıralanan eski ciltli kitaplar, kendilerini açıp okuyacak vefalı bir dostun yolunu sabırla gözlüyordu.'",
    "questionText": "Bu cümledeki kişileştirme (teşhis) sanatını insana ait hangi özelliğin hangi varlığa aktarıldığını belirterek açıklayınız.",
    "solutionExplanation": "Yol gözlemek/sabırla beklemek insani özelliği kitaplara aktarılmıştır.",
    "modelAnswer": "İnsana özgü olan 'yol gözlemek' ve 'sabırla dost beklemek' davranışları, kütüphane raflarındaki cansız kitaplara aktarılarak kişileştirme (teşhis) sanatı yapılmıştır.",
    "rubric": [("İnsani özelliğin doğru tespiti", 0.5), ("Kitaplara aktarıldığının açıklanması", 0.5)]
}
G8_DEDICATED[('turkce', 'T.8.3.9', 4, 0)] = {
    "contextText": "Fiilimsilerin cümledeki görevi.",
    "stimulus": "Cümle: 'Kitap okurken farklı dünyaları keşfetmek, insanın düşünce ufkunu genişleten en soylu eylemdir.'",
    "questionText": "Cümledeki altı çizili fiilimsilerin türlerini yazınız:\n• Okurken: .................................\n• Keşfetmek: .................................\n• Genişleten: .................................",
    "solutionExplanation": "okurken (zarf-fiil), keşfetmek (isim-fiil), genişleten (sıfat-fiil).",
    "modelAnswer": "• Okurken: Zarf-fiil (-ken eki)\n• Keşfetmek: İsim-fiil (-mek eki)\n• Genişleten: Sıfat-fiil (-en eki)",
    "rubric": [("Üç fiilimsinin türlerinin doğru yazılması", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.3.11', 4, 0)] = {
    "contextText": "Anlatım biçimleri: Tartışmacı anlatım.",
    "stimulus": "Parça: 'Kimi insanlar dijital çağda basılı kitapların ve kütüphanelerin modasının geçtiğini, artık her şeye ekrandan ulaşıldığını söylüyor. Bu iddiaya katılmak mümkün değildir. Hiçbir dijital ekran, kâğıdın kokusunu, sayfaların hışırtısını ve kütüphanenin sunduğu o derin odaklanma iklimini veremez.'",
    "questionText": "Bu parçada kullanılan anlatım biçimini belirleyiniz ve yazarın bu anlatım biçimini seçme gerekçesini açıklayınız.",
    "solutionExplanation": "Tartışmacı anlatım (Tartışma). Yerleşik bir kanıyı çürütüp kendi görüşünü kabul ettirmek içindir.",
    "modelAnswer": "Kullanılan Anlatım Biçimi: Tartışmacı Anlatım (Tartışma).\nGerekçe: Yazar, 'kitapların modası geçti' şeklindeki yaygın düşünceyi eleştirip çürütmek ve basılı kitabın eşsiz değerine dair kendi görüşünü okuyucuya benimsetmek istemiştir.",
    "rubric": [("Tartışmacı anlatımın tespiti", 0.5), ("Görüş çürütme ve savunma gerekçesi", 0.5)]
}
G8_DEDICATED[('turkce', 'T.8.3.15', 4, 0)] = {
    "contextText": "Metinle ilgili soru sorma.",
    "stimulus": "Kütüphanelerin sessizlik kuralı ve sosyal hafıza rolü.",
    "questionText": "Metinde geçen 'Kütüphaneler bir milletin bin yıllık kültürel hafızasını koruyan ve nesillere aktaran mabetlerdir.' cümlesine yönelik cevabı doğrudan bu cümlede olan 2 nitelikli soru yazınız.",
    "solutionExplanation": "Metne dayalı 2 soru oluşturma.",
    "modelAnswer": "1. Soru: Kütüphanelerin bir milletin geçmişi açısından üstlendiği temel görev nedir?\n2. Soru: Milletlerin bin yıllık kültürel hafızası hangi kurumlar aracılığıyla korunup nesillere aktarılır?",
    "rubric": [("Metnin anlamına uygun 2 sorunun yazılması", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.3.25', 4, 0)] = {
    "contextText": "Okudukları ile ilgili çıkarım yapma.",
    "stimulus": "Parça: 'Düzenli kitap okuyan bireylerin problem çözme becerilerinin ve empati yeteneklerinin okumayanlara göre iki kat daha gelişmiş olduğu bilimsel deneylerle kanıtlanmıştır.'",
    "questionText": "Bu parçadan hareketle kitap okumanın insanın 'sosyal ilişkilerine' etkisi hakkında ne gibi bir çıkarımda bulunabilirsiniz?",
    "solutionExplanation": "Empati ve anlayış geliştiği için insanlarla daha sağlıklı ve uyumlu iletişim kurarlar.",
    "modelAnswer": "Çıkarım: Düzenli kitap okumak sadece zihinsel zekâyı değil duygusal zekâyı da artırır; birey başkalarının duygularını anlama (empati) ve kriz anlarında yapıcı çözümler üretme yeteneği kazandığı için sosyal ilişkilerinde çok daha başarılı ve hoşgörülü olur.",
    "rubric": [("Empati ve sosyal ilişkilere olumlu yansıma çıkarımı", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.3.26', 4, 0)] = {
    "contextText": "Metin türlerini ayırt etme: Deneme.",
    "stimulus": "Parça: 'Bana göre kitap okumak, insanın kendi içine yaptığı en uzun ve en aydınlık yolculuktur. Bir romanın sayfaları arasında gezinirken kendimle baş başa kalır, kalabalıkların gürültüsünden sıyrılırım. Siz de öyle hissetmez misiniz bazen?'",
    "questionText": "Bu metnin türünü (Deneme, Makale, Biyografi, Masal) belirleyiniz ve bu türe ait olduğunu gösteren 2 özelliği yazınız.",
    "solutionExplanation": "Metin türü Denemedir. Samimi üslup, yazarın kendi düşünceleriyle baş başa kalması, kanıtlama kaygısı olmaması.",
    "modelAnswer": "• Metin Türü: Deneme\n• Özellik 1: Yazar kanıtlama kaygısı gütmeden tamamen kendi kişisel görüş ve iç dünyasını yansıtmıştır ('Bana göre...', 'Kendimle baş başa kalırım').\n• Özellik 2: Samimi, içten ve okuyucuyla sohbet eder gibi bir dille yazılmıştır ('Siz de öyle hissetmez misiniz?').",
    "rubric": [("Deneme türünün doğru belirlenmesi", 0.5), ("İki ayırt edici özelliğin yazılması", 0.5)]
}
G8_DEDICATED[('turkce', 'T.8.3.34', 4, 0)] = {
    "contextText": "Düşünceyi geliştirme yolları: Tanık Gösterme.",
    "stimulus": "Parça: 'Kitaplar medeniyetin köprüleridir. Nitekim ünlü düşünür Cemil Meriç, 'Kitap bir limandı benim için. Kitaplarda kendimi buldum, kitaplarla kurtuldum.' diyerek kitabın insan hayatındaki kurtarıcı rolünü vurgulamıştır.'",
    "questionText": "Bu parçada kullanılan düşünceyi geliştirme yolunu ve yazarın Cemil Meriç'in sözüne yer verme amacını açıklayınız.",
    "solutionExplanation": "Tanık gösterme (Alıntı yapma). Görüşünü güvenilir bir otoritenin sözüyle desteklemek.",
    "modelAnswer": "• Kullanılan Yol: Tanık Gösterme (Alıntı yapma).\n• Amaç: Yazar, kitabın insan ruhunu kurtaran ve inşa eden değerine dair öne sürdüğü düşünceyi, edebiyat ve fikir dünyasında yetkin bir otorite olan Cemil Meriç'in sözüyle destekleyerek inandırıcı kılmayı amaçlamıştır.",
    "rubric": [("Tanık göstermenin tespiti", 0.5), ("Görüşü inandırıcı kılma amacının açıklanması", 0.5)]
}
G8_DEDICATED[('turkce', 'T.8.4.9', 4, 0)] = {
    "contextText": "Öyküleyici ve betimleyici anlatımı yazıda birleştirme.",
    "stimulus": "Olay: Eski bir sahaf dükkânına girip çocukluk kitabını bulan bir gencin heyecanı.",
    "questionText": "Bu olayı hem öyküleyici hem de betimleyici anlatım biçimlerini kullanarak 3-4 cümlelik kısa bir metin hâlinde yazınız.",
    "solutionExplanation": "Olay akışı ve duyusal tasvirlerin harmanlanması.",
    "modelAnswer": "Örnek Metin:\nAli, Beyazıt'taki tarihi sahafın ahşap kokulu dar kapısından içeri süzüldü. Tavana kadar yükselen sararmış ciltlerin arasında gezinirken gözü birden mavi kapaklı küçük bir masal kitabına takıldı. Çocukluğunda annesinin ona okuduğu o kitabı titreyen parmaklarıyla rafdan çekip bağrına bastığında mutluluktan gözleri parıldıyordu.",
    "rubric": [("Öyküleyici unsurların (olay, kişi, zaman) kullanımı", 0.5), ("Betimleyici duyusal unsurların kullanımı", 0.5)]
}
G8_DEDICATED[('turkce', 'T.8.4.18', 4, 0)] = {
    "contextText": "Cümlenin ögelerini çözümleme.",
    "stimulus": "Cümle: 'Genç yazar, kütüphanedeki eski masada yeni romanını heyecanla yazıyordu.'",
    "questionText": "Bu cümlenin ögelerini sırasıyla bularak yazınız:\n• Genç yazar: .................................\n• Kütüphanedeki eski masada: .................................\n• Yeni romanını: .................................\n• Heyecanla: .................................\n• Yazıyordu: .................................",
    "solutionExplanation": "Genç yazar (Özne), Kütüphanedeki eski masada (Yer Tamlayıcısı), Yeni romanını (Belirtili Nesne), Heyecanla (Zarf Tamlayıcısı), Yazıyordu (Yüklem).",
    "modelAnswer": "• Genç yazar: Özne\n• Kütüphanedeki eski masada: Yer Tamlayıcısı (Dolaylı Tümleç)\n• Yeni romanını: Belirtili Nesne\n• Heyecanla: Zarf Tamlayıcısı\n• Yazıyordu: Yüklem",
    "rubric": [("Tüm ögelerin hatasız tespiti", 1.0)]
}

# ---------------------------------------------------------------------
# SENARYO 6: Anadolu'da Misafirperverlik ve İmece (10 Questions)
# ---------------------------------------------------------------------
G8_DEDICATED[('turkce', 'T.8.3.7', 5, 0)] = {
    "contextText": "Söz sanatları: Teşbih ve Abartma.",
    "stimulus": "Cümle: 'Köy odasındaki misafirperverlik öyle büyüktü ki sofra adeta bir saray ziyafeti gibi donatılmış, ev sahibinin ikramı göklere ulaşmıştı.'",
    "questionText": "Verilen cümledeki benzetme (teşbih) ve abartma (mübalağa) sanatlarını açıklayınız.",
    "solutionExplanation": "Benzetme: sofra saray ziyafetine benzetilmiştir. Abartma: ikramın göklere ulaşması.",
    "modelAnswer": "• Benzetme: Köy odasındaki yer sofrası zenginlik ve özen bakımından 'saray ziyafetine' benzetilmiştir.\n• Abartma: 'İkramın göklere ulaşması' ifadesinde yapılan ikramın çokluğu ve cömertlik olağanüstü büyütülmüştür.",
    "rubric": [("Benzetmenin unsurlarıyla tespiti", 0.5), ("Abartmanın gerekçesiyle tespiti", 0.5)]
}
G8_DEDICATED[('turkce', 'T.8.3.11', 5, 0)] = {
    "contextText": "Anlatım biçimleri: Öyküleyici Anlatım.",
    "stimulus": "Parça: 'Güneş henüz Torosların ardından doğmamıştı. Hasan Ağa çarıklarını bağlayıp tarlaya yöneldi. Komşuları da ellerinde kazma ve küreklerle çoktan yola koyulmuştu. O gün el birliğiyle fındıklar toplanacak, imece ateşi yakılacaktı.'",
    "questionText": "Bu parçada kullanılan anlatım biçimini belirleyiniz ve bu biçimin 2 temel özelliğini metinden örnekle açıklayınız.",
    "solutionExplanation": "Öyküleyici anlatım (Öyküleme). Olay akışı, kişi ve zaman unsurları.",
    "modelAnswer": "• Anlatım Biçimi: Öyküleyici Anlatım (Öyküleme)\n• Özellik 1: Zaman akışı ve hareket vardır (Güneşin doğması, Hasan Ağa'nın çarık bağlayıp yola koyulması).\n• Özellik 2: Olay kahramanları ve mekân unsurları yer almaktadır (Hasan Ağa, komşular, Toroslar).",
    "rubric": [("Öyküleyici anlatımın tespiti", 0.5), ("İki unsurun metinden gösterilmesi", 0.5)]
}
G8_DEDICATED[('turkce', 'T.8.3.14', 5, 0)] = {
    "contextText": "Metinle ilgili soru yanıtlama: İmece geleneği.",
    "stimulus": "Metin: 'İmece, köylerde tek başına yapılması imkânsız olan tarla hasadı, ev yapımı gibi ağır işlerin bütün köylünün bir araya gelerek karşılıksız ve sırayla yapmasıdır. Bu gelenekte menfaat değil, derin bir sevgi ve dayanışma hâkimdir.'",
    "questionText": "İmece geleneğinin toplumsal birlik ve beraberliğe sağladığı en büyük 2 katkıyı metinden hareketle yazınız.",
    "solutionExplanation": "Ağır işlerin kolayca bitirilmesi ve komşuluk bağlarının sevgiyle güçlenmesi.",
    "modelAnswer": "1. Maddi/Fiziki Katkı: Tek bir ailenin gücünün yetmeyeceği zor ve ağır işlerin kısa sürede el birliğiyle kolayca çözülmesini sağlar.\n2. Manevi/Sosyal Katkı: Çıkar gözetmeksizin yapılan yardımlaşma sayesinde köylüler arasında kırgınlıklar biter, güven ve kardeşlik bağları pekişir.",
    "rubric": [("İki katkının eksiksiz yazılması", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.3.15', 5, 0)] = {
    "contextText": "Metne dayalı soru sorma becerisi.",
    "stimulus": "Misafire ikram ve 'Tanrı Misafiri' inancı.",
    "questionText": "Anadolu'da yolda kalan yabancıların bile evlere baş tacı edilerek ağırlanmasını anlatan metne yönelik, okuyucuyu düşünmeye sevk eden 1 açık uçlu analiz sorusu yazınız.",
    "solutionExplanation": "Açık uçlu analiz sorusu oluşturma.",
    "modelAnswer": "Örnek Soru: 'Anadolu insanının kapısına gelen tanımadığı bir yabancıya bile hiçbir karşılık beklemeden evini ve sofrasını açmasını sağlayan temel kültürel ve manevi değerler nelerdir?'",
    "rubric": [("Nitelikli, analiz gerektiren açık uçlu bir soru kurulması", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.3.17', 5, 0)] = {
    "contextText": "Metnin ana fikrini belirleme.",
    "stimulus": "İmece ve dayanışmanın modern çağda önemi.",
    "questionText": "Metnin ana fikrini bir cümleyle ifade ediniz.",
    "solutionExplanation": "Birlikten kuvvet doğar, toplumlar ancak dayanışma ve imece ruhuyla güçlü kalabilir.",
    "modelAnswer": "Ana Fikir: Bireyler zorluklar karşısında tek başlarına çaresiz kalabilirler; ancak birlik, paylaşma ve imece ruhuyla hareket eden toplumlar her türlü engeli aşarak huzur ve kardeşliği inşa ederler.",
    "rubric": [("Birlik ve dayanışma vurgulu ana fikir", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.3.19', 5, 0)] = {
    "contextText": "Metne uygun başlık belirleme.",
    "stimulus": "İmece, köy odaları ve Anadolu misafirperverliği metni.",
    "questionText": "Okuduğunuz metnin içeriğine ve ana fikrine tam uyumlu, biri çarpıcı iki farklı özgün başlık önerisi yazınız.",
    "solutionExplanation": "İki özgün başlık.",
    "modelAnswer": "1. Başlık Önerisi: Birliğin Mayası: Anadolu'da İmece Kültürü\n2. Başlık Önerisi: Açık Kapılar ve Cömert Gönüller",
    "rubric": [("İki uygun başlığın yazılması", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.3.25', 5, 0)] = {
    "contextText": "Okuduklarından çıkarım yapma.",
    "stimulus": "Parça: 'Eskiden köylerde birinin evi yandığında ya da sel bastığında köylüler birkaç gün içinde toplanıp el birliğiyle o aileye yeni bir ev kurarlardı. Hiç kimse 'Bana ne!' demezdi.'",
    "questionText": "Bu parçadan hareketle geleneksel Türk toplum yapısındaki 'bireysellik ve toplumsal sorumluluk' anlayışı hakkında nasıl bir çıkarım yapabilirsiniz?",
    "solutionExplanation": "Toplumda bencillik değil, 'biri hepimiz, hepimiz birimiz için' anlayışı hâkimdir.",
    "modelAnswer": "Çıkarım: Geleneksel kültürümüzde ferdiyetçilik ve bencillik yerine diğerkâmlık (başkalarını düşünme) esastır; bir ferdin acısı ve felaketi tüm toplumun ortak meselesi kabul edilir ve krizler ortak sorumlulukla aşılır.",
    "rubric": [("Toplumsal sorumluluk ve diğerkâmlık çıkarımı", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.3.34', 5, 0)] = {
    "contextText": "Düşünceyi geliştirme yolları: Karşılaştırma.",
    "stimulus": "Parça: 'Modern kent hayatında insanlar aynı apartmanda oturdukları komşularını bile tanımazken, geleneksel Anadolu köylerinde kilometrelerce uzaktan gelen bir yolcu bile 'Tanrı misafiri' denilerek sofranın başköşesine oturtulur.'",
    "questionText": "Bu parçada kullanılan düşünceyi geliştirme yolunu ve kıyaslanan iki farklı yaşam tarzını yazınız.",
    "solutionExplanation": "Karşılaştırma. Modern şehir yaşamı ile geleneksel köy yaşamındaki insan ilişkileri kıyaslanmıştır.",
    "modelAnswer": "• Kullanılan Yol: Karşılaştırma.\n• Açıklama: Modern şehir hayatının getirdiği yabancılaşma ve komşusunu tanımayan bireyci tutum ile Anadolu köylerindeki sıcak, karşılıksız misafirperverlik ve dayanışma kültürü karşılaştırılmıştır.",
    "rubric": [("Karşılaştırma yolunun tespiti", 0.5), ("Kıyaslanan unsurların açıklanması", 0.5)]
}
G8_DEDICATED[('turkce', 'T.8.4.1', 5, 0)] = {
    "contextText": "Şiir yazma becerisi: İmece ve Kardeşlik.",
    "stimulus": "Tema: El ele vermek, imece, dostluk ve bereket.",
    "questionText": "İmece ruhunu ve el birliğiyle zorlukların aşılmasını dile getiren 4 dizelik (bir kıtalık) ahenkli bir şiir yazınız.",
    "solutionExplanation": "Özgün dörtlük.",
    "modelAnswer": "Örnek Dörtlük:\nBir elin nesi var, iki elin sesi,\nBirlikte söylenir kardeşlik bestesi.\nKalkar bütün yükler omuz omuza,\nBereket saçılır soframıza, yurdumuza.",
    "rubric": [("Şiirin tema ve ölçü/ahenk uyumu", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.4.18', 5, 0)] = {
    "contextText": "Cümlenin ögelerini çözümleme.",
    "stimulus": "Cümle: 'Bütün köylüler, sabahın erken saatlerinde tarladaki sararmış ekinleri türkülerle biçtiler.'",
    "questionText": "Cümlenin ögelerini bularak sorularıyla eşleştiriniz:\n• Kim biçti? -> .................................\n• Neyi biçti? -> .................................\n• Ne zaman biçti? -> .................................\n• Nasıl biçti? -> .................................\n• Biçtiler: .................................",
    "solutionExplanation": "Bütün köylüler (Özne), Sararmış ekinleri (Belirtili Nesne), Sabahın erken saatlerinde (Zarf Tamlayıcısı), Türkülerle (Zarf Tamlayıcısı), Biçtiler (Yüklem).",
    "modelAnswer": "• Kim biçti? -> Bütün köylüler (Özne)\n• Neyi biçti? -> Tarladaki sararmış ekinleri (Belirtili Nesne)\n• Ne zaman biçti? -> Sabahın erken saatlerinde (Zarf Tamlayıcısı)\n• Nasıl biçti? -> Türkülerle (Zarf Tamlayıcısı)\n• Biçtiler -> Yüklem",
    "rubric": [("Tüm ögelerin sorularıyla eşleştirilmesi", 1.0)]
}

# ---------------------------------------------------------------------
# SENARYO 7: Dil Bilinci ve Türkçenin Zenginliği (7 Questions)
# ---------------------------------------------------------------------
G8_DEDICATED[('turkce', 'T.8.3.9', 6, 0)] = {
    "contextText": "Fiilimsilerin ekleri ve işlevleri.",
    "stimulus": "Cümle: 'Kelimelerin gücünü fark eden yazarlar, dili özenle kullanarak geleceğe kalıcı eserler bırakmayı başarırlar.'",
    "questionText": "Cümledeki fiilimsileri bularak aldıkları eklerle birlikte türlerini yazınız:\n• fark eden: .................................\n• kullanarak: .................................\n• bırakmayı: .................................",
    "solutionExplanation": "fark eden (sıfat-fiil, -en), kullanarak (zarf-fiil, -arak), bırakmayı (isim-fiil, -ma).",
    "modelAnswer": "• fark eden: Sıfat-fiil (-en eki)\n• kullanarak: Zarf-fiil (-arak eki)\n• bırakmayı: İsim-fiil (-ma eki)",
    "rubric": [("Üç fiilimsinin türleri ve ekleriyle doğru yazılması", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.3.14', 6, 0)] = {
    "contextText": "Metinle ilgili soru cevaplama: Dil ve Kültür.",
    "stimulus": "Metin: 'Dil, bir milletin ruhudur. Bir kelimeyi kaybettiğimizde sadece birkaç harfi değil, o kelimenin bin yılda biriktirdiği anlamı ve hissiyatı da yitiririz. Türkçemizi yabancı sözcüklerin istilasından korumak millî bir vazifedir.'",
    "questionText": "Yazara göre bir kelimenin kaybolması neden sadece dilsel bir kayıp değil, kültürel bir kayıptır? Açıklayınız.",
    "solutionExplanation": "Çünkü her kelime bin yıllık bir tarihi hafızayı, duygu ve düşünce dünyasını barındırır.",
    "modelAnswer": "Çünkü kelimeler bir milletin bin yıllık tarihi hafızasını, inançlarını, sevinçlerini ve yaşam tecrübesini taşır. Bir kelime unutulduğunda veya yerini yabancı bir kelimeye bıraktığında o milletin o kavrama yüklediği derin ruh ve milli duyuş da yok olur.",
    "rubric": [("Kelimelerin kültürel hafıza ve ruh taşıyıcılığı vurgusu", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.3.16', 6, 0)] = {
    "contextText": "Metnin konusunu belirleme.",
    "stimulus": "Türkçenin korunması ve yabancı sözcük kirliliği metni.",
    "questionText": "Türkçemizin korunması ve dil bilincini işleyen metnin konusunu tek bir cümleyle yazınız.",
    "solutionExplanation": "Türk dilinin korunması, zenginliği ve yabancı dillerin olumsuz etkilerine karşı dil bilinci.",
    "modelAnswer": "Metnin Konusu: Türkçenin zengin kelime hazinesinin ve dil bilincinin korunmasının bir milletin bekası ve kültürel bağımsızlığı açısından önemidir.",
    "rubric": [("Metnin konusunun eksiksiz ifade edilmesi", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.3.25', 6, 0)] = {
    "contextText": "Okudukları ile ilgili çıkarım yapma.",
    "stimulus": "Parça: 'Tabelalarda, günlük konuşmalarda Türkçe karşılığı varken yabancı kelimeleri seçmek çağdaşlık değil, kendi kültürüne yabancılaşmaktır. Karamanoğlu Mehmet Bey'in 1277'deki fermanı işte bu tehlikeye çekilmiş bir kalkandır.'",
    "questionText": "Parçadan hareketle Karamanoğlu Mehmet Bey'in fermanının günümüz gençliğine verdiği en temel mesaj nedir?",
    "solutionExplanation": "Kendi anadiline sahip çıkmak, her alanda Türkçeyi yaşatmak bağımsızlığın temelidir.",
    "modelAnswer": "Çıkarım: Karamanoğlu Mehmet Bey'in 'Bugünden sonra divanda, dergahta, mecliste ve meydanda Türkçeden başka dil konuşulmaya!' fermanı; milli kimliğin ve bağımsızlığın ancak anadile sahip çıkılarak korunabileceğini, yabancı kelime hayranlığına karşı kendi dil bayrağımızı dalgalandırmamız gerektiğini öğütlemektedir.",
    "rubric": [("Milli kimlik ve anadile sahip çıkma bilinci çıkarımı", 1.0)]
}
G8_DEDICATED[('turkce', 'T.8.4.4', 6, 0)] = {
    "contextText": "Yazma stratejileri: Düşünceyi organize etme.",
    "stimulus": "Tema: 'Sosyal Medyada Dil Kirliliği ve Çözüm Yolları'.",
    "questionText": "Sosyal medyada kısaltmalarla, yabancı kelimelerle bozulan Türkçemizi düzeltmek için 2 somut çözüm önerisini gerekçeleriyle yazınız.",
    "solutionExplanation": "İki somut çözüm önerisi.",
    "modelAnswer": "1. Çözüm Önerisi: Gençlerin dijital ortamlarda Türkçe yazım kurallarına uygun içerik üretmelerini teşvik edecek ödüllü yarışmalar ve farkındalık kampanyaları düzenlenmelidir.\n2. Çözüm Önerisi: Telefon ve bilgisayar klavyelerinde otomatik düzeltme ve Türkçe kelime öneri sistemleri geliştirilerek yabancılaşmış bozuk kısaltmalar yerine doğru sözcüklerin kullanımı kolaylaştırılmalıdır.",
    "rubric": [("Birinci somut çözüm ve gerekçesi", 0.5), ("İkinci somut çözüm ve gerekçesi", 0.5)]
}
G8_DEDICATED[('turkce', 'T.8.4.9', 6, 0)] = {
    "contextText": "Açıklayıcı anlatım biçimini kullanma.",
    "stimulus": "Konu: Dil ve düşünce arasındaki ilişki.",
    "questionText": "İnsanın kelime hazinesinin zenginliğinin düşünme kapasitesini nasıl etkilediğini açıklayan açıklayıcı anlatım biçiminde 3 cümlelik bir metin yazınız.",
    "solutionExplanation": "Dil ve düşünce bağlantısını anlatan nesnel açıklama paragrafı.",
    "modelAnswer": "Örnek Metin:\nİnsan zihni ancak bildiği kelimeler aracılığıyla soyut ve derin fikirler üretebilir. Kelime dağarcığı dar olan bir birey, düşüncelerini biçimlendirmekte ve karmaşık problemleri kavramakta zorlanır. Dolayısıyla zengin bir kelime hazinesi, bireyin dünyaya bakışını genişletip entelektüel üretkenliğini artıran en temel araçtır.",
    "rubric": [("Açıklayıcı anlatım kurallarına uyum", 0.6), ("Düşünce zenginliği ve akıcılık", 0.4)]
}
G8_DEDICATED[('turkce', 'T.8.4.18', 6, 0)] = {
    "contextText": "Cümlenin ögelerini bulma ve öge dizilişi.",
    "stimulus": "Cümle: 'Bilinçli her Türk genci, güzel Türkçemizi yabancı sözcüklerin baskısından daima koruyacaktır.'",
    "questionText": "Bu cümlenin ögelerini sırasıyla yazınız:\n• Özne: .................................\n• Belirtili Nesne: .................................\n• Yer Tamlayıcısı: .................................\n• Zarf Tamlayıcısı: .................................\n• Yüklem: .................................",
    "solutionExplanation": "Özne: Bilinçli her Türk genci, Belirtili Nesne: Güzel Türkçemizi, Yer Tamlayıcısı: Yabancı sözcüklerin baskısından, Zarf Tamlayıcısı: Daima, Yüklem: Koruyacaktır.",
    "modelAnswer": "• Özne: Bilinçli her Türk genci\n• Belirtili Nesne: Güzel Türkçemizi\n• Yer Tamlayıcısı: Yabancı sözcüklerin baskısından\n• Zarf Tamlayıcısı: Daima\n• Yüklem: Koruyacaktır",
    "rubric": [("Beş ögenin tamamının doğru yazılması", 1.0)]
}

print("Grade 8 Türkçe dedicated questions registered successfully!")
