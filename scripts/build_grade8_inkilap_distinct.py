# -*- coding: utf-8 -*-
import json
from build_grade8_fen_distinct import G8_DEDICATED

# =====================================================================
# GRADE 8 T.C. İNKILAP TARİHİ VE ATATÜRKÇÜLÜK DEDICATED (7 Scenarios - 50 Questions)
# (Mapped under 'sosyal_bilgiler' in clean_middle_school_matrix.json)
# =====================================================================

# ---------------------------------------------------------------------
# SENARYO 1 (6 Questions)
# ---------------------------------------------------------------------
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.1', 0, 0)] = {
    "contextText": "Sanayi İnkılabı ve Osmanlı Devleti'ne etkileri.",
    "stimulus": "18. yüzyılda İngiltere'de başlayan Sanayi İnkılabı ile el tezgâhlarının yerini buhar gücüyle çalışan fabrikalar aldı. Avrupalı devletler hammadde ve ürettikleri malları satacak pazar arayışına girdiler.",
    "questionText": "Sanayi İnkılabı'nın Osmanlı Devleti'nin yerli üretimine ve ekonomik bağımsızlığına etkilerini kapitülasyonlar bağlamında açıklayınız.",
    "solutionExplanation": "Avrupa malları kapitülasyonlar sayesinde ülkeye ucuz ve gümrüksüz girdi; yerli el tezgâhları kapandı, Osmanlı açık pazar haline geldi.",
    "modelAnswer": "Avrupa'da fabrikalarda seri ve ucuz üretilen mallar, Osmanlı Devleti'nin geçmişte Avrupalılara tanıdığı kapitülasyonlar (düşük gümrük vergileri) sayesinde Osmanlı pazarlarına çok ucuza girdi. Osmanlı'daki geleneksel el tezgâhları ve küçük esnaf bu ucuz fabrika ürünleriyle rekabet edemeyerek birer birer iflas etti ve kapandı. Böylece Osmanlı Devleti dışa bağımlı açık bir pazar hâline geldi.",
    "rubric": [("Kapitülasyonlar ve ucuz Avrupa mallarının ülkeye girişi vurgusu", 0.5), ("Yerli esnafın iflası ve açık pazar olma sonucunun açıklanması", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.2', 0, 0)] = {
    "contextText": "Selanik şehrinin Mustafa Kemal'in gelişimine etkisi.",
    "stimulus": "Mustafa Kemal'in doğup büyüdüğü Selanik; gelişmiş bir limana, Avrupa ile doğrudan bağlantılı demir yolu ağına ve Türk, Rum, Musevi, Ermeni gibi farklı milletlerin bir arada yaşadığı kozmopolit bir yapıya sahipti.",
    "questionText": "Selanik şehrinin bu coğrafi, ekonomik ve kültürel özelliklerinin Mustafa Kemal'in fikir dünyasına sağladığı 2 önemli katkıyı yazınız.",
    "solutionExplanation": "Farklı kültürleri tanıdı, hoşgörülü oldu; Avrupa'daki yeni fikirleri (özgürlük, eşitlik) yakından takip etti.",
    "modelAnswer": "1. Hoşgörü ve Kültürel Zenginlik: Farklı inanç ve milletlerin bir arada barış içinde yaşamasını görerek geniş bir hoşgörü, saygı ve dünya görüşü kazanmasını sağladı.\n2. Yeniliklere Açıklık: Liman ve demir yolu sayesinde Avrupa'da basılan gazete, dergi ve kitaplar şehre hızla ulaşıyordu; Mustafa Kemal Batı'daki bilimsel, siyasi ve fikri gelişmeleri yakından takip ederek aydın bir vizyon geliştirdi.",
    "rubric": [("Farklı kültürleri tanıma ve hoşgörü katkısı", 0.5), ("Batı'daki yenilikleri ve fikirleri takip etme katkısı", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.3', 0, 0)] = {
    "contextText": "Mustafa Kemal'i etkileyen Türk düşünürler: Namık Kemal.",
    "stimulus": "Mustafa Kemal Manastır Askeri İdadisi yıllarında 'Vatan Şairi' Namık Kemal'in şiirlerini gizlice okumuş ve 'Türk milletinin yüzyıllardır beklediği ses' olarak nitelendirmiştir.",
    "questionText": "Namık Kemal'in eserlerinin Mustafa Kemal'de geliştirdiği en temel iki millî duyguyu ve fikri yazınız.",
    "solutionExplanation": "Vatan sevgisi ve hürriyet (özgürlük) aşkı.",
    "modelAnswer": "1. Vatan Sevgisi ve Fedakârlık: Vatan toprağının kutsallığını ve gerektiğinde vatan uğruna canını feda etme bilincini aşılamıştır.\n2. Hürriyet ve İstiklal Tutkusu: Milletin baskı ve esaret altında yaşayamayacağı, hürriyet ve bağımsızlığın bir milletin can damarı olduğu inancını pekiştirmiştir.",
    "rubric": [("Vatan sevgisi ve fedakarlık boyutu", 0.5), ("Hürriyet ve bağımsızlık bilinci boyutu", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.4', 0, 0)] = {
    "contextText": "Mustafa Kemal'in Trablusgarp Savaşı'ndaki rolü.",
    "stimulus": "1911 yılında İtalya Trablusgarp'a saldırdığında Osmanlı Devleti karadan ve denizden bölgeye ordu gönderememiştir. Mustafa Kemal, Enver Bey ve bir grup genç subay gizlice kılık değiştirerek Trablusgarp'a gitmiştir.",
    "questionText": "Mustafa Kemal'in Şerif takma adıyla gazeteci kılığında Trablusgarp'a giderek yerli halkı İtalyanlara karşı örgütlemesi onun hangi kişilik özelliklerini yansıtır? (2 özellik belirtiniz).",
    "solutionExplanation": "Teşkilatçılık (örgütleyicilik), vatanseverlik, liderlik, cesaret.",
    "modelAnswer": "1. Teşkilatçılık (Örgütleyicilik): Bölgedeki dağınık ve eğitimsiz yerli Bedevi halkı Derne ve Tobruk'ta bir araya getirip düzenli bir direniş cephesi oluşturması onun üstün örgütleme yeteneğini gösterir.\n2. Vatanseverlik ve Fedakârlık: Resmî bir emir veya devlet desteği olmadan, canını tehlikeye atarak binlerce kilometre ötedeki vatan toprağını savunmaya koşması yüksek vatan sevgisinin kanıtıdır.",
    "rubric": [("Teşkilatçılık özelliğinin gerekçesiyle açıklanması", 0.5), ("Vatanseverlik özelliğinin gerekçesiyle açıklanması", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.2.1', 0, 0)] = {
    "contextText": "Birinci Dünya Savaşı'nın genel sebepleri: Bloklaşma ve silahlanma.",
    "stimulus": "19. yüzyılın sonlarında Sanayi İnkılabı'nın getirdiği sömürgecilik yarışı ve Fransız İhtilali'nin yaydığı milliyetçilik akımı dünyayı büyük bir savaşa sürüklemiştir.",
    "questionText": "Birinci Dünya Savaşı öncesinde kurulan İtilaf ve İttifak devletleri bloklarının kurucu üçer temel üyesini yazınız.",
    "solutionExplanation": "İtilaf Devletleri: İngiltere, Fransa, Rusya. İttifak Devletleri: Almanya, Avusturya-Macaristan, İtalya.",
    "modelAnswer": "• İtilaf (Anlaşma) Devletleri: İngiltere, Fransa, Çarlık Rusyası\n• İttifak (Bağlaşma) Devletleri: Almanya, Avusturya-Macaristan İmparatorluğu, İtalya (İtalya savaş başladıktan sonra İtilaf tarafına geçmiştir)",
    "rubric": [("İtilaf devletlerinin 3 kurucu üyesinin yazılması", 0.5), ("İttifak devletlerinin 3 kurucu üyesinin yazılması", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.2.2', 0, 0)] = {
    "contextText": "Osmanlı Devleti'nin Birinci Dünya Savaşı'nda savaştığı cepheler.",
    "stimulus": "Osmanlı Devleti Birinci Dünya Savaşı'nda taarruz, savunma ve müttefiklerine yardım amacıyla sınırları dışında olmak üzere 3 farklı grupta cephelerde savaşmıştır.",
    "questionText": "Osmanlı Devleti'nin savaştığı cephelerden 'Taarruz Cepheleri' (2 cephe) ve 'Savunma Cepheleri' (en az 2 cephe) olanları adlarıyla yazınız.",
    "solutionExplanation": "Taarruz: Kafkas ve Kanal. Savunma: Çanakkale, Irak, Hicaz-Yemen, Suriye-Filistin.",
    "modelAnswer": "• Taarruz (Saldırı) Cepheleri: 1. Kafkas Cephesi, 2. Kanal Cephesi\n• Savunma Cepheleri: 1. Çanakkale Cephesi, 2. Irak Cephesi (ayrıca Hicaz-Yemen ve Suriye-Filistin)",
    "rubric": [("İki taarruz cephesinin eksiksiz yazılması", 0.5), ("İki savunma cephesinin doğru yazılması", 0.5)]
}

# ---------------------------------------------------------------------
# SENARYO 2 (7 Questions)
# ---------------------------------------------------------------------
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.1', 1, 0)] = {
    "contextText": "Fransız İhtilali ve Milliyetçilik akımının Osmanlı'ya etkisi.",
    "stimulus": "1789 Fransız İhtilali ile dünyaya yayılan 'Her millete bir devlet' ilkesini savunan milliyetçilik akımı, çok uluslu imparatorlukları derinden sarstı.",
    "questionText": "Milliyetçilik akımının Osmanlı Devleti'nin özellikle Balkan topraklarında yol açtığı siyasi gelişmeleri açıklayınız.",
    "solutionExplanation": "Balkanlardaki gayrimüslim azınlıklar (Sırplar, Yunanlar, Bulgarlar) Avrupalıların kışkırtmasıyla isyan ederek bağımsızlıklarını ilan ettiler.",
    "modelAnswer": "Osmanlı Devleti çok uluslu bir yapıya sahip olduğu için Fransız İhtilali'nin yaydığı milliyetçilik akımından en çok zarar gören devletlerden biri olmuştur. Rusya ve Avrupalı devletlerin kışkırtmasıyla Balkanlarda yaşayan Sırplar, Yunanlar ve Bulgarlar gibi gayrimüslim azınlıklar Osmanlı'ya karşı isyan etmiş, peş peşe bağımsızlık kazanarak Osmanlı Devleti'nin Balkan topraklarının hızla parçalanmasına neden olmuşlardır.",
    "rubric": [("Çok uluslu yapının milliyetçilikten olumsuz etkilenmesi", 0.5), ("Azınlık isyanları ve toprak kayıplarının belirtilmesi", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.2', 1, 0)] = {
    "contextText": "Mustafa Kemal'in öğrenim gördüğü okullar.",
    "stimulus": "Mustafa Kemal, Selanik ve Manastır'da farklı nitelikte okullara devam etmiştir.",
    "questionText": "Mustafa Kemal'in askerlik mesleğine ilk adımı attığı 'Selanik Askeri Rüştiyesi'ne giriş sürecini ve ailesinin tutumunu açıklayınız.",
    "solutionExplanation": "Annesi sivil memur olmasını istiyordu; Mustafa Kemal kendi kararlılığıyla sınavlara gizlice girip kazandı.",
    "modelAnswer": "Annesi Zübeyde Hanım oğlunun asker olmasını tehlikeli bulduğu için istemiyor, onun mülkiye mektebinde okuyup memur olmasını arzuluyordu. Ancak Mustafa Kemal çocukluğundan beri üniformalı askerlere hayrandı. Büyük bir kararlılık ve bağımsızlık göstererek annesinden gizlice Askerî Rüştiye sınavlarına girdi, sınavı üstün başarıyla kazanarak annesini ikna etti ve askerlik mesleğine ilk adımını attı.",
    "rubric": [("Annesinin çekincelerinin açıklanması", 0.5), ("Gizlice sınava girip kazanma kararlılığı vurgusu", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.3', 1, 0)] = {
    "contextText": "Mustafa Kemal'i etkileyen yabancı düşünürler.",
    "stimulus": "Mustafa Kemal, Manastır Askeri İdadisi ve Harp Okulu yıllarında Fransız düşünürler Jean-Jacques Rousseau, Montesquieu ve Voltaire'in eserlerini Fransızcalarından okumuştur.",
    "questionText": "Bu Fransız aydınlarının Mustafa Kemal'in zihninde şekillendirdiği modern devlet ve yönetim ilkelerinden 2 tanesini yazınız.",
    "solutionExplanation": "Milli egemenlik, cumhuriyet, kuvvetler ayrılığı, laiklik ve hukukun üstünlüğü.",
    "modelAnswer": "1. Millî Egemenlik ve Cumhuriyetçilik (J.J. Rousseau): Yönetme yetkisinin kral veya sultanda değil, milletin iradesinde olması gerektiği düşüncesini benimsedi.\n2. Güçler Ayrılığı ve Hukukun Üstünlüğü (Montesquieu): Yasama, yürütme ve yargının birbirinden bağımsız olması ve tüm vatandaşların yasalar önünde eşit sayılması fikrini kazandı.",
    "rubric": [("Milli egemenlik ve cumhuriyet ilkesi", 0.5), ("Güçler ayrılığı ve eşitlik/hukuk ilkesi", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.4', 1, 0)] = {
    "contextText": "Mustafa Kemal ve 31 Mart Vakası (1909).",
    "stimulus": "Meşrutiyet rejimine karşı İstanbul'da gerici bir ayaklanma çıkınca Selanik'te Mahmut Şevket Paşa komutasında Hareket Ordusu kurulmuştur.",
    "questionText": "Mustafa Kemal'in bu ordudaki görevi neydi ve 31 Mart İsyanı'nı bastırması onun hangi yönetim anlayışını savunduğunu gösterir?",
    "solutionExplanation": "Görevi: Kurmay Başkanlığı. Savunduğu anlayış: Yenilikleri, anayasal düzeni ve meşrutiyeti (demokrasiyi) korumak.",
    "modelAnswer": "• Görevi: Mustafa Kemal bu ordunun 'Kurmay Başkanı' olarak görev yapmış, ordunun planlarını ve bildirilerini bizzat kaleme almıştır.\n• Savunduğu Anlayış: Meşrutiyet rejimini ve anayasal düzeni koruyarak gerici ayaklanmayı bastırması, onun yenilikleri, halkın mecliste temsilini ve demokrasiyi savunan ilerici bir komutan olduğunu gösterir.",
    "rubric": [("Kurmay Başkanı görevinin belirtilmesi", 0.5), ("Yenilikleri ve anayasal düzeni savunma anlayışı", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.2.1', 1, 0)] = {
    "contextText": "Savaşın başlamasına yol açan kıvılcım.",
    "stimulus": "Avusturya-Macaristan Veliahdı Franz Ferdinand, 28 Haziran 1914'te Saraybosna'yı ziyaret ederken bir Sırp milliyetçisi tarafından öldürülmüştür.",
    "questionText": "Bu suikastın sadece iki devlet arasında kalmayıp birkaç hafta içinde dünya savaşına dönüşmesinin temel sebebi nedir?",
    "solutionExplanation": "Büyük devletlerin daha önceden kurdukları gizli askeri ittifaklar ve bloklaşma sistemidir.",
    "modelAnswer": "Çünkü Avrupalı büyük devletler savaştan çok önce sömürgecilik ve silahlanma nedeniyle iki büyük düşman kampa (İtilaf ve İttifak blokları) ayrılmış ve birbirlerine karşılıklı askeri yardım taahhüt etmişlerdi. Avusturya Sırbistan'a savaş açınca Rusya Sırbistan'ı korumak için seferberlik ilan etti; Almanya Rusya'ya, Fransa ve İngiltere de Almanya'ya savaş açtı ve bloklaşma zincirleme bir dünya çatışması doğurdu.",
    "rubric": [("Önceden kurulmuş askeri bloklaşmanın açıklanması", 0.5), ("Zincirleme ittifak antlaşmalarının devreye girişi gerekçesi", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.2.2', 1, 0)] = {
    "contextText": "Osmanlı'nın savaşa girmesi: Yavuz ve Midilli olayı.",
    "stimulus": "Akdeniz'de İngiliz donanmasından kaçan Goben ve Breslau adlı iki Alman savaş gemisi Osmanlı Devleti'ne sığınmıştır.",
    "questionText": "Osmanlı Devleti'nin bu gemileri satın aldığını açıklayıp Karadeniz'e göndermesi ve Rus limanlarını bombalaması sürecinin sonucunu açıklayınız.",
    "solutionExplanation": "Gemilere Türk bayrağı çekilip Yavuz ve Midilli adları verildi. Sivastopol ve Odesa'yı bombalayınca Osmanlı fiilen savaşa girdi.",
    "modelAnswer": "Osmanlı Devleti tarafsızlık kuralını korumak için gemileri satın aldığını ilan ederek gemilere Türk bayrağı çekmiş, adlarını 'Yavuz' ve 'Midilli' olarak değiştirmiştir. Ancak bu gemiler Enver Paşa'nın talimatıyla Alman amiral Souchon komutasında Karadeniz'e açılarak Rusya'nın Sivastopol ve Odesa limanlarını bombalamıştır. Bunun üzerine Rusya, İngiltere ve Fransa Osmanlı'ya resmen savaş ilan etmiş ve Osmanlı Devleti I. Dünya Savaşı'na fiilen girmiştir.",
    "rubric": [("Gemilerin satın alındığı bahanesi ve yeni isimleri", 0.5), ("Rus limanlarının bombalanması ve fiilen savaşa giriş", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.2.3', 1, 0)] = {
    "contextText": "Mondros Ateşkes Antlaşması'nın 7. Maddesi.",
    "stimulus": "Mondros'un 7. Maddesi: 'İtilaf Devletleri, güvenliklerini tehdit edecek bir durum ortaya çıkarsa herhangi bir stratejik noktayı işgal etme hakkına sahip olacaktır.'",
    "questionText": "7. maddenin İtilaf Devletleri açısından taşımış olduğu stratejik ve hukuki amacı açıklayınız.",
    "solutionExplanation": "Anadolu'nun tamamını işgale açık hale getirmek ve yapacakları işgallere hukuki gerekçe (kılıf) hazırlamaktır.",
    "modelAnswer": "7. madde, Mondros Ateşkes Antlaşması'nın en tehlikeli maddesidir. İtilaf Devletleri bu madde sayesinde Anadolu'da istedikleri her yeri hiçbir sınır olmaksızın işgal edebilmek için hukuki bir dayanak (kılıf) oluşturmuşlardır. Uydurma bahanelerle asayişin bozulduğunu iddia edip tüm vatan topraklarını işgale açık hâle getirmişlerdir.",
    "rubric": [("En tehlikeli madde olduğunun belirtilmesi", 0.4), ("İşgallere hukuki kılıf ve dayanak hazırlama amacının açıklanması", 0.6)]
}

# ---------------------------------------------------------------------
# SENARYO 3 (8 Questions)
# ---------------------------------------------------------------------
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.1', 2, 0)] = {
    "contextText": "Osmanlı'yı kurtarma fikir akımları: Osmanlıcılık.",
    "stimulus": "Tanzimat ve Meşrutiyet dönemlerinde aydınlar devleti dağılmaktan kurtarmak için 'Osmanlıcılık' fikrini savundular.",
    "questionText": "Osmanlıcılık fikrinin temel amacını ve bu fikrin neden Balkan Savaşları sonrasında geçerliliğini yitirdiğini açıklayınız.",
    "solutionExplanation": "Amaç: Din ve ırk farkı gözetmeksizin herkesi eşit Osmanlı vatandaşı saymak. Başarısızlık: Balkan milletlerinin isyan edip ayrılması.",
    "modelAnswer": "• Temel Amacı: Din, dil, ırk ve mezhep ayrımı gözetmeksizin Osmanlı sınırları içinde yaşayan herkesi kanun önünde eşit haklara sahip tek bir 'Osmanlı Milleti' sayarak ayrılıkçı isyanları önlemekti.\n• Neden Geçerliliğini Yitirdi: Osmanlı'nın tanıdığı haklara rağmen Balkanlardaki Hristiyan milletler (Yunan, Sırp, Bulgar) ayaklanıp Osmanlı'dan ayrılarak kendi devletlerini kurunca bu fikrin imparatorluğu bir arada tutamayacağı anlaşıldı.",
    "rubric": [("Eşit vatandaşlık ve birlik amacının yazılması", 0.5), ("Balkan isyanları nedeniyle geçerliliğini yitirmesinin açıklanması", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.2', 2, 0)] = {
    "contextText": "Manastır Askeri İdadisi ve Mustafa Kemal.",
    "stimulus": "Mustafa Kemal, 1896 yılında Manastır Askeri İdadisi'ne girdiğinde burada edebiyat, tarih ve yabancı dil alanında kendini geliştirmiştir.",
    "questionText": "Manastır Askeri İdadisi'nde Mustafa Kemal'e tarih bilincini aşılayan tarih öğretmeninin adını ve bu okulda Fransızcasını geliştirmek için neler yaptığını yazınız.",
    "solutionExplanation": "Tarih öğretmeni: Kolağası Mehmet Tevfik Bey. Fransızca için tatillerde Selanik'te Frerler okuluna gitmiş, özel dersler almıştır.",
    "modelAnswer": "• Tarih Öğretmeni: Kolağası Mehmet Tevfik (Bilge) Bey'dir. Mustafa Kemal'e Türk tarihi sevgisi ve milli tarih bilinci aşılamıştır.\n• Fransızca Çalışmaları: Askeri rüştiyede Fransızcasının yetersiz olduğunu fark edince tatillerde Selanik'e giderek Fransız Frerler Okulu'nda özel kurslar almış ve yabancı dilini geliştirmiştir.",
    "rubric": [("Mehmet Tevfik Bey'in doğru yazılması", 0.5), ("Fransızca öğrenme gayreti ve kurslarının belirtilmesi", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.3', 2, 0)] = {
    "contextText": "Mustafa Kemal'i etkileyen milliyetçi yazarlar: Ziya Gökalp.",
    "stimulus": "Mustafa Kemal bir sözünde 'Bedenimin babası Ali Rıza Efendi, hislerimin Namık Kemal, fikirlerimin babası ise Ziya Gökalp'tir.' demiştir.",
    "questionText": "Ziya Gökalp'in Mustafa Kemal'in düşünce sistemine kazandırdığı en önemli ilkeyi ve bunun Kurtuluş Savaşı'ndaki rolünü açıklayınız.",
    "solutionExplanation": "Türkçülük ve milliyetçilik ilkesi. Türk milletinin bağımsızlık azmini ve milli birliğini sağlamıştır.",
    "modelAnswer": "Ziya Gökalp'in kazandırdığı en önemli ilke 'Türk Milliyetçiliği' (Türkçülük) fikridir. Bu fikir, Mustafa Kemal'in milletine sonsuz güven duymasını, ümmetçi ve imparatorlukçu hayaller yerine Türk milletinin bağımsızlığına ve egemenliğine dayalı millî bir devlet kurma ülküsünü benimsemesini sağlamıştır.",
    "rubric": [("Türk milliyetçiliği ilkesinin vurgulanması", 0.5), ("Milli devlet ve millet egemenliği bağıntısının kurulması", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.4', 2, 0)] = {
    "contextText": "Mustafa Kemal'in Çanakkale Savaşları'ndaki zaferleri.",
    "stimulus": "1915 Çanakkale Kara Savaşları'nda 19. Tümen Komutanı Yarbay Mustafa Kemal, Arıburnu ve Conkbayırı'nda düşman çıkarmasını durdurmuştur.",
    "questionText": "Mustafa Kemal'in Conkbayırı'nda cephanesi biten askerlerine verdiği tarihi emri yazınız ve bu emrin savaşın kaderine etkisini açıklayınız.",
    "solutionExplanation": "'Ben size taarruzu emretmiyorum, ölmeyi emrediyorum! Biz ölünceye kadar geçecek zaman zarfında yerimize başka kuvvetler ve komutanlar gelecektir.'",
    "modelAnswer": "• Tarihi Emir: 'Ben size taarruz emretmiyorum; ölmeyi emrediyorum! Biz ölünceye kadar geçecek zaman zarfında yerimize başka kuvvetler ve başka komutanlar gelebilir.'\n• Savaşa Etkisi: Mehmetçik bu emirle süngü takıp siperlere yatmış, düşmanı durdurarak takviye birlikler yetişene kadar Conkbayırı sırtlarının düşman eline geçmesini engellemiş ve Çanakkale zaferinin dönüm noktası olmuştur.",
    "rubric": [("Tarihi emrin eksiksiz yazılması", 0.5), ("Zaman kazandırma ve savaşın seyrini değiştirme etkisinin açıklanması", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.2.1', 2, 0)] = {
    "contextText": "Almanya ve Fransa arasındaki Alsas-Loren sorunu.",
    "stimulus": "1871 Sedan Savaşı'nda Almanya, Fransa'ya ait zengin kömür ve demir yataklarına sahip Alsas-Loren bölgesini ele geçirmiştir.",
    "questionText": "Alsas-Loren bölgesinin Birinci Dünya Savaşı'nın çıkışındaki ekonomik ve stratejik önemini açıklayınız.",
    "solutionExplanation": "Bölge zengin kömür ve demir yataklarına sahipti, sanayi ve silahlanma için hayati önemdeydi; Fransa burayı geri almak istiyordu.",
    "modelAnswer": "Alsas-Loren, Avrupa'nın en zengin taş kömürü ve demir cevheri yataklarına sahip stratejik sanayi havzasıydı. Sanayi İnkılabı ile birlikte ağır sanayi ve silah üretimi için bu madenler hayati önem taşıyordu. Fransa kaptırdığı bu bölgeyi Almanya'dan geri almak, Almanya ise madenleri elinde tutmak istediği için aralarındaki bu intikam ve çıkar çatışması I. Dünya Savaşı'nın en büyük özel sebeplerinden biri olmuştur.",
    "rubric": [("Kömür ve demir madenlerinin sanayi için önemi", 0.5), ("Almanya-Fransa arasındaki intikam ve savaş sebebi ilişkisi", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.2.1', 2, 1)] = {
    "contextText": "Rusya'nın Panslavizm politikası ve sıcak denizlere inme emeli.",
    "stimulus": "Çarlık Rusyası, Balkanlardaki tüm Slav kökenli toplulukları kendi liderliği altında birleştirmeyi (Panslavizm) hedefliyordu.",
    "questionText": "Panslavizm politikasının Osmanlı Devleti ve Avusturya-Macaristan İmparatorluğu üzerindeki yıkıcı etkilerini açıklayınız.",
    "solutionExplanation": "Balkanlardaki Slavları isyana kışkırtarak Osmanlı ve Avusturya'nın toprak bütünlüğünü tehdit etti.",
    "modelAnswer": "Rusya, Panslavizm politikasıyla Osmanlı Devleti'nin ve Avusturya-Macaristan'ın bünyesinde yaşayan Slav halklarını (Sırplar, Karadağlılar, Bulgarlar, Boşnaklar) bağımsızlık vaadiyle kışkırtmıştır. Bu politika; Osmanlı'nın Balkanlardaki egemenliğini tamamen bitirmeyi ve Avusturya-Macaristan'ın güneye inmesini engelleyerek her iki imparatorluğun da parçalanmasına zemin hazırlamıştır.",
    "rubric": [("Slav halklarının kışkırtılması boyutu", 0.5), ("Osmanlı ve Avusturya'nın toprak bütünlüğüne darbe vurması boyutu", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.2.2', 2, 0)] = {
    "contextText": "Kafkas Cephesi ve Sarıkamış Harekatı.",
    "stimulus": "1914 kışında Enver Paşa komutasındaki Osmanlı ordusu Rus işgalindeki Kars, Ardahan ve Batum'u geri almak için Sarıkamış Harekâtı'nı başlatmıştır.",
    "questionText": "Sarıkamış Harekâtı'nın ağır kış şartları ve lojistik yetersizlikler nedeniyle başarısız olmasının Kafkas Cephesi'ndeki sonuçlarını açıklayınız.",
    "solutionExplanation": "On binlerce asker donarak şehit oldu, Ruslar Erzurum, Trabzon, Muş ve Bitlis'i işgal etti.",
    "modelAnswer": "Yetersiz kışlık donanım ve şiddetli dondurucu tipi nedeniyle on binlerce Osmanlı askeri tek kurşun atamadan donarak ve hastalıktan şehit düşmüştür. Ordunun zayıflaması üzerine karşı taarruza geçen Çarlık Rusyası orduları Erzurum, Erzincan, Muş, Bitlis ve Trabzon gibi Doğu Anadolu'nun stratejik şehirlerini işgal etmiştir.",
    "rubric": [("Ağır kış şartları ve lojistik kayıpların belirtilmesi", 0.5), ("Rusların Doğu Anadolu şehirlerini işgali sonucu", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.2.3', 2, 0)] = {
    "contextText": "Mondros Ateşkes Antlaşması'nın 24. Maddesi (Vilâyât-ı Sitte).",
    "stimulus": "Mondros'un 24. Maddesi: 'Doğu'daki altı vilayette (Erzurum, Van, Bitlis, Diyarbakır, Elazığ, Sivas) bir karışıklık çıkarsa İtilaf Devletleri buraları işgal edebilecektir.'",
    "questionText": "İtilaf Devletleri'nin 24. madde ile Doğu Anadolu'da kurmayı amaçladığı devleti yazınız ve bu maddenin gizli hedefini açıklayınız.",
    "solutionExplanation": "Amaç: Bağımsız bir Ermeni devleti kurmak.",
    "modelAnswer": "• Kurulması Amaçlanan Devlet: Bağımsız bir Ermenistan Devleti'dir.\n• Gizli Hedef: İngiltere ve Fransa, antlaşma metninde açıkça 'Ermenistan' adını yazmayıp 'Altı Vilayet' (Vilâyât-ı Sitte) ifadesini kullanarak kamuoyunun tepkisini önlemeye çalışmış; ancak bölgede Ermeni çetelerini kışkırtarak çıkarılacak sahte karışıklıklarla Doğu Anadolu'yu işgal edip bir Ermeni devleti kurmayı hedeflemişlerdir.",
    "rubric": [("Ermeni devleti kurma amacının doğru yazılması", 0.5), ("Karışıklık bahanesiyle işgal zemini hazırlama gerekçesi", 0.5)]
}

# ---------------------------------------------------------------------
# SENARYO 4 (6 Questions)
# ---------------------------------------------------------------------
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.2', 3, 0)] = {
    "contextText": "Mustafa Kemal'in İstanbul'daki öğrenim hayatı.",
    "stimulus": "Mustafa Kemal, 1899'da İstanbul Harp Okulu'na girmiş, ardından 1905'te Harp Akademisi'nden Kurmay Yüzbaşı olarak mezun olmuştur.",
    "questionText": "Mustafa Kemal'in başkent İstanbul'daki öğrenim hayatının onun siyasi bilincine ve ülke meselelerine bakışına katkısını yazınız.",
    "solutionExplanation": "Padişah istibdadını, saray siyasetini ve devletin kötü gidişatını yakından gördü; el yazısıyla gazete çıkararak arkadaşlarını aydınlattı.",
    "modelAnswer": "Başkent İstanbul'da devletin yönetildiği merkezi ve padişah idaresini yakından gözlemleme imkânı buldu. Devletin kötü gidişatını, yabancı elçilerin baskılarını görerek ülke meseleleriyle çok daha yakından ilgilendi. Harp Okulu ve Akademisi'nde arkadaşlarıyla el yazısıyla gizli bir gazete çıkarıp toplantılar düzenleyerek vatanın kurtuluşuna dair siyasi fikirlerini olgunlaştırdı.",
    "rubric": [("Devlet yönetimini ve aksaklıkları yakından görme katkısı", 0.5), ("El yazısıyla gazete çıkarma ve teşkilatlanma faaliyeti", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.3', 3, 0)] = {
    "contextText": "Mustafa Kemal'in fikir hayatını etkileyen şehirler: Sofya.",
    "stimulus": "Mustafa Kemal 1913 yılında Bulgaristan'ın başkenti Sofya'ya Askeri Ataşe (Ataşemiliter) olarak atanmıştır.",
    "questionText": "Sofya'daki görevinin Mustafa Kemal'e kazandırdığı diplomatik tecrübeyi ve Bulgar Parlamentosu'nu izlemesinin Cumhuriyet fikirlerine katkısını açıklayınız.",
    "solutionExplanation": "Diplomasiyi, yabancı elçilerle ilişkileri öğrendi; parlamenter sistemin işleyişini inceledi.",
    "modelAnswer": "• Diplomatik Tecrübe: Avrupa devletlerinin diplomatlarıyla balolarda, toplantılarda bir araya gelerek uluslararası diplomasi kurallarını, dış politika dengelerini ve müzakere sanatını bizzat uygulayarak öğrendi.\n• Parlamenter Sistem Katkısı: Bulgar Parlamentosu'nun (Meclis) oturumlarını yakından izleyerek çok partili sistemin ve halkın seçtiği milletvekillerinin devleti yönetme usullerini inceledi; bu durum gelecekte TBMM'yi kurmasında önemli bir ilham kaynağı oldu.",
    "rubric": [("Uluslararası diplomasi tecrübesinin açıklanması", 0.5), ("Parlamento ve meclis sistemini inceleme katkısı", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.4', 3, 0)] = {
    "contextText": "Mustafa Kemal'in Kafkas Cephesi'ndeki başarıları.",
    "stimulus": "Mustafa Kemal 1916 yılında 16. Kolordu Komutanı olarak Kafkas Cephesi'ne atanmıştır.",
    "questionText": "Mustafa Kemal'in Kafkas Cephesi'nde Rus işgalinden kurtardığı 2 önemli Doğu Anadolu şehrimizi yazınız.",
    "solutionExplanation": "Muş ve Bitlis.",
    "modelAnswer": "Mustafa Kemal Kafkas Cephesi'nde dağınık birlikleri toparlayıp disipline ederek düzenlediği başarılı taarruzlarla:\n1. Muş'u (Ağustos 1916)\n2. Bitlis'i (Ağustos 1916)\nRus işgalinden geri alarak kurtarmıştır.",
    "rubric": [("Muş şehrinin doğru yazılması", 0.5), ("Bitlis şehrinin doğru yazılması", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.2.1', 3, 0)] = {
    "contextText": "İtalya'nın savaş sırasındaki taraf değiştirmesi.",
    "stimulus": "İtalya başlangıçta Almanya ve Avusturya ile İttifak grubundayken savaş patlak verdiğinde tarafsızlığını ilan etmiş, 1915 Londra Gizli Antlaşması ile İtilaf Devletleri safına geçmiştir.",
    "questionText": "İtalya'nın taraf değiştirmesindeki temel menfaati ve İtilaf Devletleri'nin İtalya'ya vadettiği toprakları yazınız.",
    "solutionExplanation": "Menfaati: Akdeniz'de yayılmak. Vaat edilen yerler: On İki Ada, Trablusgarp ve Batı Anadolu (İzmir ve çevresi).",
    "modelAnswer": "İtalya'nın taraf değiştirmesinin temel sebebi çıkarcı ve yayılmacı politikasıdır. İtilaf Devletleri, 1915 Londra Antlaşması ile İtalya'ya Avusturya'nın bazı topraklarının yanı sıra Osmanlı Devleti'nin On İki Ada'sını ve Antalya-İzmir çevresini (Batı Anadolu) vadetmiştir. Kendi müttefiklerinin vermediği bu geniş sömürge ve toprak vaatlerini gören İtalya taraf değiştirmiştir.",
    "rubric": [("Çıkarcı yayılma politikasının belirtilmesi", 0.5), ("Batı Anadolu ve On İki Ada vaadinin açıklanması", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.2.2', 3, 0)] = {
    "contextText": "Çanakkale Cephesi'nin dünya savaşına etkileri.",
    "stimulus": "Çanakkale Boğazı'nda Türk ordusunun kazandığı muazzam zafer, İtilaf donanmasının boğazları geçmesini engellemiştir.",
    "questionText": "Çanakkale Zaferi'nin:\na) Birinci Dünya Savaşı'nın süresine etkisini,\nb) Çarlık Rusyası'nın iç siyasetine etkisini açıklayınız.",
    "solutionExplanation": "a) Savaşın süresi en az 2 yıl uzadı. b) Rusya'ya yardım gidemedi, ekonomik kriz derinleşti ve Bolşevik İhtilali çıkarak Çarlık rejimi yıkıldı.",
    "modelAnswer": "a) Savaşın Süresine Etkisi: İtilaf Devletleri'nin İstanbul'u ele geçirip savaşı erkenden bitirme planları çökmüş; Birinci Dünya Savaşı en az 2 yıl daha uzamıştır.\nb) Çarlık Rusyası'na Etkisi: İtilaf müttefikleri denizden yardım ulaştıramadığı için ekonomik ve askeri çöküş yaşayan Çarlık Rusyası'nda 1917 Bolşevik İhtilali patlak vermiş; Çarlık rejimi yıkılmış ve Sovyet Rusya savaştan çekilmiştir.",
    "rubric": [("Savaşın süresini 2 yıl uzatma etkisinin yazılması", 0.5), ("Rusya'ya yardım gidememesi ve Bolşevik İhtilali ilişkisi", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.2.2', 3, 1)] = {
    "contextText": "Kanal Cephesi ve İngiltere'nin sömürge yolları.",
    "stimulus": "Cemal Paşa komutasındaki Osmanlı ordusu Mısır'daki Süveyş Kanalı'na iki kez taarruz düzenlemiştir.",
    "questionText": "Osmanlı Devleti'nin Kanal Harekâtı'ndaki temel stratejik hedefini ve harekâtın neden başarısız olduğunu açıklayınız.",
    "solutionExplanation": "Hedef: Mısır'ı geri alıp İngiltere'nin Hindistan sömürge yolunu kesmek. Başarısızlık: Çöl şartları, susuzluk ve yetersiz lojistik.",
    "modelAnswer": "• Temel Hedef: Süveyş Kanalı'nı ve Mısır'ı ele geçirerek İngiltere'nin en büyük sömürgesi olan Hindistan'a giden deniz ticaret ve ikmal yolunu kesmekti.\n• Başarısızlık Nedeni: Sina Çölü'nün kavurucu sıcaklığı, kum fırtınaları, aşırı susuzluk ve yetersiz lojistik destek nedeniyle Türk ordusu ağır kayıplar vermiş, güçlü İngiliz savunmasını aşamayarak geri çekilmek zorunda kalmıştır.",
    "rubric": [("İngiltere'nin Hindistan sömürge yolunu kesme hedefi", 0.5), ("Çöl şartları ve lojistik yetersizlik gerekçesi", 0.5)]
}

# ---------------------------------------------------------------------
# SENARYO 5 (7 Questions)
# ---------------------------------------------------------------------
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.1', 4, 0)] = {
    "contextText": "Osmanlı'da Düyun-ı Umumiye İdaresi (1881).",
    "stimulus": "Kırım Savaşı'yla ilk kez dış borç alan Osmanlı Devleti, borçlarını ödeyemez hâle gelince 1881'de alacaklı devletler Düyun-ı Umumiye (Genel Borçlar) İdaresi'ni kurdular.",
    "questionText": "Düyun-ı Umumiye İdaresi'nin Osmanlı Devleti'nin mali ve ekonomik bağımsızlığına vurduğu darbeyi açıklayınız.",
    "solutionExplanation": "Tuz, tütün, ipek gibi en önemli devlet gelirlerine doğrudan Avrupalılar el koydu; devlet içinde devlet haline geldi.",
    "modelAnswer": "Düyun-ı Umumiye İdaresi ile Avrupalı alacaklı devletler, Osmanlı Devleti'nin tuz, tütün, ipek, pul ve içki vergileri gibi en kârlı ve temel gelir kaynaklarına doğrudan el koymuşlardır. Bu gelirleri tahsil etmek için kendi memurlarını atamışlardır. Bu durum Osmanlı'nın bütçe ve maliye yönetimini elinden alarak ekonomik bağımsızlığını fiilen sona erdirmiş ve devleti yarı sömürge durumuna düşürmüştür.",
    "rubric": [("Temel devlet gelirlerine doğrudan el koyma tespiti", 0.5), ("Mali bağımsızlığın sona ermesi ve yarı sömürge olma sonucu", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.2', 4, 0)] = {
    "contextText": "Şemsi Efendi Mektebi'nin Mustafa Kemal'e katkısı.",
    "stimulus": "Mustafa Kemal önce annesinin isteğiyle geleneksel eğitim veren Mahalle Mektebi'ne gitmiş, daha sonra babasının isteğiyle modern yöntemlerle eğitim yapan Şemsi Efendi Mektebi'ne geçmiştir.",
    "questionText": "Şemsi Efendi Mektebi'nin geleneksel okullardan farkını ve bu okulun Mustafa Kemal'in zihinsel gelişimine sağladığı faydayı açıklayınız.",
    "solutionExplanation": "Modern sıralar, haritalar ve çağdaş metotlarla eğitim veriyordu; dogmatik ezber yerine sorgulayıcı ve modern bir zihniyet kazandırdı.",
    "modelAnswer": "• Geleneksel Okuldan Farkı: Mahalle mektebinde yere oturularak ezbere dayalı geleneksel dinî eğitim verilirken, Şemsi Efendi Mektebi'nde sıralar, kara tahta, haritalar ve beden eğitimi gibi çağdaş araçlarla modern pedagojik yöntemler uygulanıyordu.\n• Zihinsel Katkısı: Mustafa Kemal'e körü körüne ezbercilik yerine akılcı, sorgulayıcı, modern ve yeniliklere açık bir dünya görüşü kazandırmıştır.",
    "rubric": [("Modern araç ve yöntemlerle farkın açıklanması", 0.5), ("Akılcı ve sorgulayıcı zihniyet katkısı", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.3', 4, 0)] = {
    "contextText": "Mustafa Kemal'i etkileyen millî şair: Mehmet Emin Yurdakul.",
    "stimulus": "Mehmet Emin Yurdakul 1897 Türk-Yunan Savaşı sırasında 'Ben bir Türk'üm; dinim, cinsim uludur...' mısralarıyla başlayan ünlü şiirini yazmıştır.",
    "questionText": "Mustafa Kemal'in 'Şiirlerinde bana milli benliğimin gururunu tattıran ilk anlatımı buldum' dediği Mehmet Emin Yurdakul'un onda güçlendirdiği bilinci yazınız.",
    "solutionExplanation": "Milli benlik, Türklük gururu ve ulusal özgüven.",
    "modelAnswer": "Mehmet Emin Yurdakul'un sade Türkçe ile yazdığı millî şiirler, Mustafa Kemal'de derin bir Türklük şuuru, milletine duyduğu sonsuz sevgi ve milli benlik gururu oluşturmuştur. Milletin kendi öz değerlerine dayanarak emperyalist güçlere karşı başı dik durabileceği inancını aşılamıştır.",
    "rubric": [("Türklük şuuru ve milli benlik gururu vurgusu", 0.5), ("Ulusal özgüven ve bağımsızlık inancı boyutu", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.4', 4, 0)] = {
    "contextText": "Mustafa Kemal'in ilk görev yeri: Şam (1905).",
    "stimulus": "Mustafa Kemal Harp Akademisi'nden mezun olduktan sonra kurmay yüzbaşı rütbesiyle ilk görev yeri olan Şam'daki 5. Ordu'ya atanmıştır.",
    "questionText": "Mustafa Kemal'in Şam'da kurduğu gizli cemiyetin adını yazınız ve bu cemiyeti kurma amacını açıklayınız.",
    "solutionExplanation": "Vatan ve Hürriyet Cemiyeti. Amaç: İstibdat rejimine son vermek, vatanı dağılmaktan kurtarmak ve hürriyeti getirmek.",
    "modelAnswer": "• Cemiyetin Adı: Vatan ve Hürriyet Cemiyeti.\n• Kurma Amacı: Padişahın baskıcı istibdat yönetimine karşı hürriyeti, meşrutiyeti ve anayasal düzeni savunmak; ordu ve aydınlar arasında teşkilatlanarak vatanın parçalanmasını önleyecek kurtuluş çareleri üretmekti.",
    "rubric": [("Vatan ve Hürriyet Cemiyeti adının doğru yazılması", 0.5), ("İstibdata karşı hürriyet ve vatanı kurtarma amacının açıklanması", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.4', 4, 1)] = {
    "contextText": "Mustafa Kemal'in Suriye Cephesi ve Yıldırım Orduları Komutanlığı.",
    "stimulus": "1918 yılında Mustafa Kemal, Suriye Cephesi'nde 7. Ordu ve ardından Yıldırım Orduları Grup Komutanlığı görevini üstlenmiştir.",
    "questionText": "Mustafa Kemal'in İngiliz ve asi Arap ordularının taarruzu karşısında ordusunu Halep'in kuzeyine çekerek kurduğu savunma hattının Millî Mücadele sınırları açısından önemini açıklayınız.",
    "solutionExplanation": "Düşmanı bugünkü Türkiye sınırlarında (Hatay/Kilis/Antep hattı) durdurdu; Misak-ı Milli'nin güney sınırını fiilen çizdi.",
    "modelAnswer": "Mustafa Kemal ordusunu stratejik bir manevrayla Halep'in kuzeyine çekerek Katma bölgesinde sağlam bir savunma hattı kurmuş ve İngiliz taarruzunu durdurmuştur. Bu hat, Türklerin çoğunlukta olduğu Anadolu topraklarının düşman tarafından işgal edilmesini engellemiş ve gelecekte Millî Mücadele'nin ve Misak-ı Millî'nin güney sınırını (bugünkü Türkiye sınırı) fiilen belirlemiştir.",
    "rubric": [("Düşmanı Halep'in kuzeyinde durdurma başarısı", 0.5), ("Misak-ı Milli güney sınırını çizme stratejik önemi", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.2.1', 4, 0)] = {
    "contextText": "Sömürgecilik yarışı ve hammadde ihtiyacı.",
    "stimulus": "Siyasi birliklerini geç tamamlayan İtalya (1870) ve Almanya (1871), İngiltere ve Fransa'nın daha önce paylaştığı sömürge alanlarına göz dikmişlerdir.",
    "questionText": "Almanya ve İtalya'nın bu geç sömürgecilik yarışına katılmasının Avrupa dengelerini nasıl bozduğunu açıklayınız.",
    "solutionExplanation": "İngiltere ve Fransa'nın küresel pazarlarına meydan okudular, silahlanma yarışını tırmandırıp dünyayı bloklaşmaya itti.",
    "modelAnswer": "Sanayileşmesini hızla tamamlayan güçlü Almanya'nın zengin hammadde ve pazar elde etmek amacıyla İngiltere'nin denizlerdeki ve sömürgelerindeki üstünlüğüne meydan okuması, İngiltere ve Fransa'yı büyük bir tehdit altına sokmuştur. Bu durum mevcut dünya dengelerini altüst etmiş; devletlerin devasa ordular kurarak silahlanmasına ve kaçınılmaz bir küresel savaşa yol açan blokların oluşmasına sebep olmuştur.",
    "rubric": [("İngiltere ve Fransa'nın pazarlarına meydan okuma tespiti", 0.5), ("Silahlanma ve bloklaşmayı tetikleme sonucu", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.2.1', 4, 1)] = {
    "contextText": "Balkan Savaşları'nın I. Dünya Savaşı'na etkisi.",
    "stimulus": "1912-1913 Balkan Savaşları sonrasında Osmanlı Devleti Edirne ve Kırklareli hariç tüm Rumeli topraklarını kaybetmiştir.",
    "questionText": "Balkan Savaşları'nın Osmanlı ordusunda doğurduğu reform ihtiyacı ile I. Dünya Savaşı öncesinde Almanya'ya yakınlaşma arasındaki ilişkiyi açıklayınız.",
    "solutionExplanation": "Ordudaki alaylı-mektepli kavgası ve zafiyet görüldü; ordunun modernizasyonu için Alman askeri heyetleri (Liman von Sanders) davet edildi.",
    "modelAnswer": "Balkan Savaşları'nda küçük Balkan devletlerine karşı yaşanan hezimet, Osmanlı ordusunun siyasete karıştığını, teknik ve taktik olarak çok geri kaldığını göstermiştir. Bu ağır yenilginin ardından orduyu gençleştirmek ve modernleştirmek amacıyla Almanya'dan Liman von Sanders başkanlığında askeri ıslahat heyeti getirilmiştir. Bu durum Osmanlı askeri yönetiminin Alman subayların etkisine girmesine ve I. Dünya Savaşı'nda Almanya safında yer almasına zemin hazırlamıştır.",
    "rubric": [("Balkan hezimetinin ordu zafiyetini ortaya çıkarması", 0.5), ("Alman askeri heyeti ve Almanya ile ittifak ilişkisi", 0.5)]
}

# ---------------------------------------------------------------------
# SENARYO 6 (8 Questions)
# ---------------------------------------------------------------------
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.1', 5, 0)] = {
    "contextText": "Osmanlı'da fikir akımları: Türkçülük (Pantürkizm).",
    "stimulus": "Balkan Savaşları'nda Hristiyan milletlerin, ardından I. Dünya Savaşı'nda bazı Müslüman Arap kabilelerinin Osmanlı'ya isyan etmesi fikir dünyasında sarsıntı yarattı.",
    "questionText": "Osmanlıcılık ve İslamcılık akımlarının iflas etmesi üzerine İttihat ve Terakki yönetimi ve cumhuriyet kadroları tarafından benimsenen 'Türkçülük' akımının temel ilkelerini yazınız.",
    "solutionExplanation": "Devletin ancak Türk milletinin milli bilincine, kültürüne ve dayanışmasına dayanarak yaşayabileceği inancıdır.",
    "modelAnswer": "Türkçülük akımı; Osmanlıcılık ve ümmetçilik fikirlerinin devleti kurtaramayacağının görülmesi üzerine, imparatorluğun kurucu ve asıl unsuru olan Türklerin millî şuurunu uyandırmayı hedeflemiştir. Dilde sadeleşmeyi, millî ekonomiyi, Türk kültürünü ve tarihini canlandırmayı, kurtuluşun ancak Türk milletinin birlik ve bağımsızlık azmine dayanılarak kazanılabileceğini savunmuştur.",
    "rubric": [("Osmanlıcılık ve İslamcılığın yetersizliği tespiti", 0.5), ("Türk milli kültürü ve bağımsızlık ilkesinin açıklanması", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.2', 5, 0)] = {
    "contextText": "Mustafa Kemal'in liderlik vasıflarının çocukluk ve gençlik temelleri.",
    "stimulus": "Mustafa Kemal okul yıllarında arkadaşları arasında hitabeti, mantıklı muhakemesi ve grup çalışmalarındaki yönlendiriciliği ile öne çıkıyordu.",
    "questionText": "Mustafa Kemal'in Manastır ve İstanbul'daki öğrencilik yıllarında gösterdiği hangi faaliyetler onun ileride büyük bir lider ve teşkilatçı olacağının ilk işaretleridir? (2 örnek veriniz).",
    "solutionExplanation": "Arkadaşlarıyla gizli gazete çıkarması, hitabet kulüplerinde etkili konuşmalar yapması, Vatan ve Hürriyet Cemiyeti'ni kurması.",
    "modelAnswer": "1. El Yazısıyla Gazete Çıkarma ve Dağıtma: İstanbul Harp Okulu ve Harp Akademisi'nde ülke sorunlarını tartışmak için arkadaş grubu oluşturup el yazısıyla gizli bir gazete çıkarması ve bunu organize etmesi.\n2. Hitabet ve Fikir Kulüpleri: Manastır'da Ömer Naci'nin etkisiyle şiir ve hitabete yönelmesi; arkadaşlarına vatan sevgisi ve hürriyet aşılayan ateşli konuşmalar yaparak onları ortak hedefler etrafında toplaması.",
    "rubric": [("Gizli gazete çıkarma örneği ve liderlik analizi", 0.5), ("Hitabet ve arkadaş grubunu yönlendirme örneği", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.3', 5, 0)] = {
    "contextText": "Mustafa Kemal'i etkileyen batılılaşma şairi: Tevfik Fikret.",
    "stimulus": "Mustafa Kemal bir konuşmasında 'Ben inkılap ruhunu ondan aldım' diyerek şair Tevfik Fikret'e olan hayranlığını ifade etmiştir.",
    "questionText": "Tevfik Fikret'in şiirlerinde savunduğu hangi fikirler Atatürk inkılaplarının (özellikle laiklik ve bilim) temel kaynağı olmuştur?",
    "solutionExplanation": "Dogmatizme ve hurafelere karşı akılcılık, bilim ve fen; Batı'nın çağdaş uygarlık düzeyini yakalama ideali.",
    "modelAnswer": "Tevfik Fikret'in şiirlerindeki çağdaşlaşma, hurafelere ve bağnazlığa karşı aklı ve bilimi rehber edinme, Batı medeniyetinin müsbet ilimlerini benimseme ilkeleri; Mustafa Kemal'in Cumhuriyet döneminde gerçekleştireceği laiklik ilkesinin ve eğitim, hukuk alanındaki köklü inkılapların zihinsel temelini oluşturmuştur.",
    "rubric": [("Akılcılık, bilim ve bağnazlığa karşı duruş vurgusu", 0.5), ("Laiklik ve çağdaşlaşma inkılaplarına ilham olma bağıntısı", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.4', 5, 0)] = {
    "contextText": "Mustafa Kemal'in askerî dehası: Çanakkale ve Anafartalar Grup Komutanlığı.",
    "stimulus": "Mustafa Kemal Çanakkale'de düşmanın nereden çıkarma yapacağını önceden tahmin etmiş ve Anafartalar Grup Komutanı olarak büyük bir zafer kazanmıştır.",
    "questionText": "Mustafa Kemal'in düşmanın çıkarma yapacağı yerleri önceden isabetle kestirmesi onun hangi askeri ve kişisel yeteneğini kanıtlar?",
    "solutionExplanation": "İleri görüşlülük, coğrafi araziyi mükemmel analiz etme kabiliyeti ve yüksek askeri sevk/idare dehası.",
    "modelAnswer": "• İleri Görüşlülük (Öngörü Yeteneği): Düşman donanmasının zayıf noktalardan değil, stratejik tepeleri tutmak amacıyla Arıburnu ve Anafartalar bölgesinden çıkarma yapacağını aylar öncesinden sezmiş ve tedbir almıştır.\n• Askerî Deha ve Arazi Hâkimiyeti: Balkan Savaşları sırasında Gelibolu Yarımadası'nda görev yaptığı için bölgenin coğrafi yapısını çok iyi bilmesi ve bunu askeri stratejiyle birleştirmesi onun üstün kurmaylık dehasını kanıtlar.",
    "rubric": [("İleri görüşlülük yeteneğinin açıklanması", 0.5), ("Arazi hâkimiyeti ve kurmaylık dehası vurgusu", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.2.1', 5, 0)] = {
    "contextText": "Savaş öncesi İngiltere ve Almanya rekabeti.",
    "stimulus": "19. yüzyılın sonlarında dünyanın en büyük deniz gücü ve imparatorluğu 'üzerinde güneş batmayan' İngiltere idi. Sanayileşen Almanya ise İngiltere'nin dünya ticaretindeki üstünlüğünü kırmak istiyordu.",
    "questionText": "Almanya'nın Osmanlı toprakları üzerinden geçen Bağdat Demiryolu (Berlin-Bağdat) projesinin İngiltere'yi neden son derece rahatsız ettiğini açıklayınız.",
    "solutionExplanation": "Demiryolu Ortadoğu petrollerine ve İngiltere'nin sömürgesi Hindistan yoluna uzanıyordu; İngiltere'nin Basra Körfezi'ndeki egemenliğini tehdit etti.",
    "modelAnswer": "Berlin-Bağdat (3B) Demiryolu projesi ile Almanya; Osmanlı toprakları üzerinden Basra Körfezi'ne ve Ortadoğu'nun zengin petrol alanlarına doğrudan ulaşma imkânı elde edecekti. Bu durum, İngiltere'nin en büyük sömürgesi olan Hindistan'a giden kara ve deniz yollarını doğrudan Alman tehdidine açık hâle getiriyordu; İngiltere küresel sömürge imparatorluğunun can damarı tehlikeye girdiği için projeye şiddetle karşı çıkmıştır.",
    "rubric": [("Berlin-Bağdat projesinin petrol ve Basra Körfezi bağlantısı", 0.5), ("İngiltere'nin Hindistan sömürge yoluna tehdit oluşturması", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.2.2', 5, 0)] = {
    "contextText": "Irak Cephesi ve Kût'ül-Amâre Zaferi (1916).",
    "stimulus": "Irak Cephesi'nde Halil (Kut) Paşa komutasındaki Osmanlı ordusu, 29 Nisan 1916'da Kût'ül-Amâre'de İngiliz tümenini kuşatarak teslim almıştır.",
    "questionText": "Kût'ül-Amâre Zaferi'nin Osmanlı askerî tarihi ve İngiliz prestiji açısından önemini açıklayınız.",
    "solutionExplanation": "General Townshend dahil 13 bin İngiliz askeri esir alındı; Çanakkale'den sonra İngilizlerin aldığı en ağır darbe ve Osmanlı'nın büyük zaferidir.",
    "modelAnswer": "Kût'ül-Amâre Zaferi; Çanakkale'den sonra Türk ordusunun I. Dünya Savaşı'nda kazandığı en görkemli ikinci zaferdir. İngiliz ordusu komutanı General Townshend, 5 general, yaklaşık 500 subay ve 13 binden fazla askeriyle birlikte Türk ordusuna kayıtsız şartsız teslim olmuştur. Bu zafer, dünyanın en büyük emperyalist gücü olan İngiltere'nin askerî prestijini yerle bir etmiş ve sömürgelerindeki itibarını derinden sarsmıştır.",
    "rubric": [("General Townshend ve 13 bin askerin esir alınması", 0.5), ("İngiliz askeri prestijinin sarsılması ve tarihi önemi", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.2.2', 5, 1)] = {
    "contextText": "1915 Sevk ve İskân (Tehcir) Kanunu.",
    "stimulus": "I. Dünya Savaşı sırasında Doğu Anadolu'da Kafkas Cephesi gerisinde Ruslarla iş birliği yapan bazı Ermeni çetelerinin orduyu arkadan vurması ve sivil katliamlar yapması üzerine 27 Mayıs 1915'te Sevk ve İskân Kanunu çıkarılmıştır.",
    "questionText": "Osmanlı Devleti'nin bu kanunu çıkarma zorunluluğunu ve ordu güvenliği ile asayişi sağlama amacını açıklayınız.",
    "solutionExplanation": "Cephe gerisinde ikmal hatlarını korumak, sivil halkın güvenliğini sağlamak ve isyan edenleri güvenli güney vilayetlerine (Suriye/Lübnan) geçici yerleştirmek.",
    "modelAnswer": "Kafkas Cephesi'nde Türk ordusu Ruslarla savaşırken Ruslar tarafından silahlandırılan Ermeni Taşnak ve Hınçak çeteleri köyleri basmış, telgraf hatlarını kesmiş ve cepheye giden ikmal kollarını arkadan vurmuştur. Osmanlı Devleti cephe gerisinin güvenliğini sağlamak, ordu ikmalini güvenceye almak ve iç savaşı engellemek amacıyla isyana karışan bölgedeki Ermeni nüfusu geçici olarak savaş alanı dışındaki güvenli Osmanlı toprağı olan Suriye vilayetine zorunlu göçe (iskâna) tabi tutmuştur.",
    "rubric": [("Cephe gerisinde ordu ikmalini ve asayişi koruma gerekçesi", 0.5), ("Savaş bölgesi dışındaki güvenli bölgelere geçici sevk edilme boyutu", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.2.3', 5, 0)] = {
    "contextText": "Mondros Ateşkes Antlaşması'nın askerî hükümleri.",
    "stimulus": "Mondros Ateşkes Antlaşması'na göre; Osmanlı ordusu derhal terhis edilecek, orduya ait silah, cephane ve telsiz-telgraf hatları İtilaf Devletleri'ne teslim edilecektir.",
    "questionText": "İtilaf Devletleri'nin Osmanlı ordusunu terhis ettirip silahlarına el koymasının temel hedefini açıklayınız.",
    "solutionExplanation": "Anadolu'yu savunmasız bırakarak planladıkları işgalleri hiçbir direnişle karşılaşmadan kolayca gerçekleştirmektir.",
    "modelAnswer": "İtilaf Devletleri'nin asıl amacı; Türk milletini ve Osmanlı Devleti'ni her türlü askeri savunma gücünden tamamen mahrum bırakmaktır. Ordusu terhis edilmiş, silahları elinden alınmış ve haberleşme hatları kesilmiş bir devleti savunmasız bırakarak Anadolu'da başlatacakları haksız işgallere karşı halkın ve devletin silahlı bir direniş göstermesini engellemeyi hedeflemişlerdir.",
    "rubric": [("Vatanı savunmasız bırakma amacının açıklanması", 0.5), ("Halkın silahlı direniş göstermesini engelleme gerekçesi", 0.5)]
}

# ---------------------------------------------------------------------
# SENARYO 7 (8 Questions)
# ---------------------------------------------------------------------
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.2', 6, 0)] = {
    "contextText": "Mustafa Kemal'in adındaki 'Kemal' ismi.",
    "stimulus": "Mustafa, Selanik Askeri Rüştiyesi'nde öğrenciyken matematik dersindeki üstün başarısıyla dikkat çekiyordu.",
    "questionText": "Matematik öğretmeni Yüzbaşı Mustafa Bey'in öğrencisine 'Kemal' adını vermesinin gerekçesini ve bu ismin Mustafa Kemal'in karakterine yansımasını açıklayınız.",
    "solutionExplanation": "'Kemal' olgunluk ve mükemmellik demektir. Öğretmen onun zekasını ve olgunluğunu takdir ederek bu adı vermiştir.",
    "modelAnswer": "• İsmin Veriliş Gerekçesi: Matematik öğretmeni Yüzbaşı Mustafa Bey, öğrencisinin matematikteki üstün problem çözme yeteneğini, çalışkanlığını ve yaşından beklenmeyen olgunluğunu görerek; 'Benim adım da Mustafa senin adın da Mustafa. Arada bir fark olmalı; bundan sonra senin adın Mustafa Kemal olsun' demiştir.\n• Karaktere Yansıması: 'Kemal' kelimesi Arapçada olgunluk, eksiksizlik ve mükemmellik anlamına gelir. Mustafa Kemal hayatı boyunca her alanda mükemmeli arayan, akılcı ve disiplinli bir karakter sergilemiştir.",
    "rubric": [("Matematik öğretmeninin gerekçesinin yazılması", 0.5), ("Kemal isminin olgunluk/mükemmellik anlamı ve yansıması", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.2', 6, 1)] = {
    "contextText": "Mustafa Kemal'in öğrenim hayatında öğretmenlerinin rolü.",
    "stimulus": "Mustafa Kemal'in yetişmesinde Şemsi Efendi, Mehmet Tevfik Bey ve Kolağası Ömer Naci gibi öğretmenleri büyük izler bırakmıştır.",
    "questionText": "Öğretmenlerinin Mustafa Kemal'de geliştirdiği 2 temel düşünce ve liderlik becerisini örneklerle açıklayınız.",
    "solutionExplanation": "Mehmet Tevfik Bey tarih bilincini, Ömer Naci hitabet ve edebiyat yeteneğini kazandırmıştır.",
    "modelAnswer": "1. Millî Tarih ve Vatan Bilinci: Manastır Askeri İdadisi'ndeki tarih öğretmeni Kolağası Mehmet Tevfik Bey, ona Türk milletinin geçmişteki kahramanlıklarını anlatarak köklü bir millet sevgisi aşılamıştır.\n2. Hitabet ve Edebi Güç: Sınıf arkadaşı Ömer Naci sayesinde edebiyat ve hitabet sanatına yönelmiş; kitleleri peşinden sürükleyecek etkili ve ikna edici konuşma gücü kazanmıştır.",
    "rubric": [("Mehmet Tevfik Bey ve tarih bilinci örneği", 0.5), ("Ömer Naci ve hitabet becerisi örneği", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.3', 6, 0)] = {
    "contextText": "Mustafa Kemal'i etkileyen olay: 1897 Türk-Yunan Savaşı (Dömeke).",
    "stimulus": "1897'de Osmanlı ordusu Yunan ordusunu Dömeke Meydan Muharebesi'nde mağlup etmesine rağmen masa başında (İstanbul Antlaşması) istediğini alamamıştır.",
    "questionText": "Mustafa Kemal'in henüz Manastır Askeri İdadisi öğrencisiyken cepheye katılmak için okuldan kaçmaya kalkıştığı bu savaşın onda uyandırdığı askerî ve diplomatik dersi açıklayınız.",
    "solutionExplanation": "Meydanda kazanılan zaferin masa başında kaybedilmemesi gerektiğini; güçlü bir diplomasinin önemini anladı.",
    "modelAnswer": "Bu savaş Mustafa Kemal'de iki büyük ders bırakmıştır:\n1. Vatan Savunması Aşkı: Henüz genç bir öğrenciyken vatan savunması için cepheye koşacak kadar yüksek bir vatanperverliğe sahip olduğunu göstermiştir.\n2. Diplomasi Dersi: Osmanlı ordusunun meydanda kazandığı kesin zaferin masa başında Avrupalıların baskısıyla heba edilmesi, Mustafa Kemal'e 'askeri zaferlerin mutlaka güçlü bir diplomasi ve siyasi zaferle taçlandırılması gerektiği' gerçeğini öğretmiştir.",
    "rubric": [("Genç yaştaki vatanperverlik vurgusu", 0.5), ("Meydan zaferinin masa başında kaybedilmemesi dersi", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.3', 6, 1)] = {
    "contextText": "Mustafa Kemal'in çok yönlülüğü ve kitap sevgisi.",
    "stimulus": "Mustafa Kemal hayatı boyunca savaş cephelerinde dahi çadırında binlerce kitap (yaklaşık 4000 eser) okumuş, sayfaların kenarlarına notlar almıştır.",
    "questionText": "Mustafa Kemal'in askerlik dışında tarih, dilbilim, sosyoloji ve hukuk alanında derin okumalar yapması onun hangi kişilik özelliğini yansıtır ve inkılaplarına nasıl yansımıştır?",
    "solutionExplanation": "Çok yönlülüğü (çok cepheliliği). Cumhuriyet'in sadece askeri değil hukuki, kültürel ve bilimsel temellerini atmasını sağladı.",
    "modelAnswer": "• Kişilik Özelliği: Çok yönlülüğü (Çok cepheliliği) ve entelektüel derinliğidir.\n• İnkılaplara Yansıması: Mustafa Kemal sadece askeri bir komutan olarak kalmamış; okuduğu tarih, dil, sosyoloji ve hukuk eserlerinden edindiği zengin birikimle harf inkılabı, Türk Dil ve Tarih Kurumlarının kurulması, Medeni Kanun gibi Türkiye Cumhuriyeti'ni çağdaşlaştıran çok boyutlu inkılapları bizzat tasarlayıp hayata geçirmiştir.",
    "rubric": [("Çok yönlülük özelliğinin belirtilmesi", 0.5), ("Farklı alanlardaki inkılaplara olan derin yansıması", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.4', 6, 0)] = {
    "contextText": "Balkan Savaşları'nda Mustafa Kemal: Gelibolu ve Bolayır Kolordusu.",
    "stimulus": "II. Balkan Savaşı'nda Mustafa Kemal, Bolayır Kolordusu Kurmay Başkanı olarak Edirne'nin Bulgar işgalinden kurtarılmasında önemli rol oynamıştır.",
    "questionText": "Mustafa Kemal'in Balkan Savaşları sırasında Gelibolu Yarımadası'nda görev yapmasının, iki yıl sonra başlayacak Çanakkale Savaşları'ndaki zaferine katkısını açıklayınız.",
    "solutionExplanation": "Gelibolu'nun kıyılarını, koylarını ve tepelerini adım adım tanıdı; düşmanın nereden çıkacağını arazi bilgisiyle bildi.",
    "modelAnswer": "Mustafa Kemal, Bolayır Kolordusu'ndaki görevi sırasında Gelibolu Yarımadası'nın her koyunu, tepesini, vadisini ve geçitlerini adım adım gezerek bölgenin topoğrafyasını ve savunma imkânlarını kusursuz şekilde öğrenmiştir. Bu derin arazi tecrübesi sayesinde 1915 Çanakkale Savaşları başladığında İtilaf Devletleri'nin hangi koylardan çıkarma yapacağını ve hangi tepelerin elde tutulması gerektiğini herkesten önce görerek tarihi bir savunma hattı kurmuştur.",
    "rubric": [("Bölgenin arazi ve topoğrafyasını tanıması boyutu", 0.5), ("Çanakkale çıkarmasında doğru konuşlanma sağlaması katkısı", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.1.4', 6, 1)] = {
    "contextText": "Mustafa Kemal'in askeri rütbeleri ve terfileri.",
    "stimulus": "Mustafa Kemal 1905'te Kurmay Yüzbaşı olarak mezun olmuş, Çanakkale Savaşları sırasındaki üstün başarıları nedeniyle Albay rütbesine, ardından generallik (Mirliva / Paşa) unvanına terfi etmiştir.",
    "questionText": "Mustafa Kemal'in Çanakkale'de kazandığı zaferlerin ardından 'Anafartalar Kahramanı' olarak tanınmasının Millî Mücadele liderliğine etkisini açıklayınız.",
    "solutionExplanation": "Halkın gönlünde büyük bir güven ve sevgi kazandı; Samsun'a çıktığında milletin onun etrafında toplanmasını sağladı.",
    "modelAnswer": "Çanakkale Zaferi'nden önce Mustafa Kemal sadece ordu çevrelerinde bilinen başarılı bir kurmay subaydı. Çanakkale'de kazandığı destansı zaferlerle basında 'Anafartalar Kahramanı' ve 'Payitahtı Kurtaran Komutan' olarak tüm Türk milletinin kalbine girmiş ve milletin güvenini kazanmıştır. Bu haklı şöhret ve saygınlık, 1919'da Samsun'a çıktığında Türk milletinin tereddütsüz onun çağrısına uyarak Millî Mücadele etrafında kenetlenmesini sağlamıştır.",
    "rubric": [("Tüm milletin güven ve sevgisini kazanması", 0.5), ("1919'da Milli Mücadele'nin tartışmasız lideri olmasını sağlaması", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.2.1', 6, 0)] = {
    "contextText": "Osmanlı Devleti'nin I. Dünya Savaşı'nda Almanya'yı tercih etme nedenleri.",
    "stimulus": "Osmanlı Devleti başlangıçta İngiltere ve Fransa ile ittifak yapmak istemiş ancak bu devletler Osmanlı'yı kendi aralarında gizli antlaşmalarla paylaştıkları için teklifi reddetmişlerdir.",
    "questionText": "İttihat ve Terakki liderlerinin Almanya'nın savaşı kazanacağına inanmalarının ve Almanya ile ittifak kurmalarının 2 temel gerekçesini yazınız.",
    "solutionExplanation": "1. Kaybedilen toprakları (Balkanlar, Mısır) geri alma arzusu, 2. Alman sanayi ve ordu teknolojisine duyulan aşırı güven.",
    "modelAnswer": "1. Kaybedilen Toprakları Geri Alma Arzusu: Son yıllarda Balkan Savaşları ve Trablusgarp'ta kaybedilen vatan topraklarını Almanya'nın yanında savaşı kazanarak geri alma ümidi.\n2. Alman Sanayi ve Askeri Üstünlüğüne Güven: Enver Paşa ve İttihatçı liderlerin Almanya'nın güçlü sanayisi ve modern ordusu sayesinde savaşı kısa sürede kesin bir zaferle tamamlayacağına olan sarsılmaz inançları.",
    "rubric": [("Kaybedilen toprakları geri alma ümidi", 0.5), ("Alman ordusu ve teknolojisine duyulan güven", 0.5)]
}
G8_DEDICATED[('sosyal_bilgiler', 'İTA.8.2.1', 6, 1)] = {
    "contextText": "Almanya'nın Osmanlı Devleti'ni kendi yanında savaşa sokmak isteme nedenleri.",
    "stimulus": "Almanya, askeri ve ekonomik olarak zayıflamış olan Osmanlı Devleti'ni ısrarla kendi yanında savaşa çekmek istemiştir.",
    "questionText": "Almanya'nın Osmanlı'nın 'jeopolitik konumu'ndan ve padişahın 'halifelik gücü'nden yararlanma hedeflerini açıklayınız.",
    "solutionExplanation": "Jeopolitik konum: Yeni cepheler açıp Almanya'nın yükünü hafifletmek ve Rusya'ya boğazları kapatmak. Halifelik: İngiliz ve Fransız sömürgelerindeki Müslümanları cihatla ayaklandırmak.",
    "modelAnswer": "• Jeopolitik Konum Hedefi: Osmanlı savaşa girdiğinde Kafkasya, Çanakkale, Süveyş ve Ortadoğu'da yeni cepheler açılacak; böylece Avrupa'daki İtilaf baskısı bölünecek ve Almanya'nın savaş yükü hafifleyecektir. Ayrıca Rusya'ya boğazlar yolu kapatılacaktır.\n• Halifelik (Dini Güç) Hedefi: Osmanlı Padişahı aynı zamanda İslam halifesiydi. Halifenin ilan edeceği 'Cihad-ı Ekber' (Kutsal Savaş) çağrısıyla İngiltere ve Fransa'nın sömürgelerinde (Hindistan, Mısır, Kuzey Afrika) yaşayan milyonlarca Müslümanın sömürgeci devletlere karşı ayaklanması amaçlanmıştır.",
    "rubric": [("Yeni cepheler açarak yükü hafifletme ve boğazları kapatma hedefi", 0.5), ("Halifeliğin cihat gücüyle sömürgeleri ayaklandırma hedefi", 0.5)]
}

print("Grade 8 T.C. İnkılap Tarihi dedicated questions registered successfully!")
