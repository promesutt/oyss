/**
 * MEB ÖDSGM ve Temel Eğitim Genel Müdürlüğü Ortak Pedagojik Çekirdek Kuralları
 * Tüm sınıf seviyeleri ve dersler için evrenseldir.
 */

export function getExamHeader(
  grade: number,
  subjectId: string,
  targetCount: number,
  distributionsText: string,
  avoidDirectives: string
): string {
  return `SEN MEB TEMEL EĞİTİM GENEL MÜDÜRLÜĞÜ VE ÖDSGM ORTAK SINAVLAR BAŞUZMANISIN.
Aşağıdaki resmi senaryo kurallarına uygun olarak eksiksiz bir ${grade}. Sınıf ${subjectId} Ortak Yazılı Sınav Kağıdı üret.
TOPLAM SORU SAYISI: KESİNLİKLE VE TAM OLARAK ${targetCount} ADET AÇIK UÇLU SORU (1'den ${targetCount}'e kadar her soru eksiksiz üretilmelidir).

SENARYO RESMİ KAZANIM DAĞILIM PLANI (${targetCount} SORU):
${distributionsText}
${avoidDirectives}`;
}

export function getOutcomeAlignmentRule(targetCount: number): string {
  return `ZORUNLU KAZANIM EŞLEŞMESİ (EN KATI VE DEĞİŞTİRİLEMEZ 1. KURAL):
- Sınavdaki Soru 1'den Soru ${targetCount}'e kadar HER BİR SORU, yukarıdaki dağılım tablosunda kendisine atanan [Kazanım Kodu] ve [Resmi Öğrenme Çıktısı] ile %100 BİRE BİR EŞLEŞMEK ZORUNDADIR!
- Sırayı ASLA bozma! Örneğin Dağılım planında Soru 4 için [Kazanım Kodu: FB.7.1.5] yazıyorsa, Soru 4 KESİNLİKLE FB.7.1.5 kazanımından sorulmalıdır. Asla FB.7.1.4, FB.7.2.2 veya başka bir kazanımdan soru üretilemez!
- Senaryoda yer almayan hiçbir kazanımdan soru üretilemez! Dağılım planındaki sıra ve kazanım kodları ASLA değiştirilemez!
- JSON çıktısında her sorunun 'outcome' alanına mutlaka dağılım planındaki ilgili sorunun resmi kazanım kodu (Örn: 'FB.7.1.5') yazılmalıdır.`;
}

export function getDifficultyPlanRule(targetCount: number, difficultyPlanText: string): string {
  return `MEB ÖDSGM PEDAGOJİK ZORLUK DAĞILIMI (ÇAN EĞRİSİ - EN KRİTİK KURAL):
- Sınavdaki ${targetCount} sorunun zorluk derecesi MEB Ölçme ve Değerlendirme standartlarına TAM UYGUN olmalıdır:
  * Zorunlu Zorluk Dağılımı: ${difficultyPlanText}
  * ASLA eşit sayıda (örneğin 2 kolay, 2 orta, 2 zor gibi) dağıtım yapma! Sınavın omurgasını daima "Orta" düzey oluşturmalıdır.
  * "Basit Bilişsel Süreçler" etiketli kazanımlar "Kolay" veya "Orta" olmalıdır.
  * "Karmaşık Bilişsel Süreçler" etiketli kazanımlar "Orta" veya "Zor" olmalıdır.
  * Sınavın 1. sorusu öğrenciyi cesaretlendirmek için "Kolay" veya "Orta" olmalı; "Zor" soru sınavın sonuna doğru yerleştirilmelidir.`;
}

export const CONTEXT_DIVERSITY_RULE = `HER SORU İÇİN ZORUNLU BAĞLAM ÇEŞİTLİLİĞİ KURALI (EN KRİTİK KURAL):
- AYNI SINAV İÇİNDEKİ SORULARDA ASLA AYNI MEKÂN, AYNI ETKİNLİK VEYA AYNI BAĞLAMI TEKRARLAMA!
- Birden fazla sorunun "TÜBİTAK Bilim Fuarı / Şenliği", "Robotik Atölyesi" veya "Bilim Kulübü" gibi tek bir mekânda toplanması KESİNLİKLE YASAKTIR.
- Her sorunun kurgusu, mekânı, karakterleri ve gerçek yaşam olayı birbirinden TAMAMEN FARKLI alanlardan seçilmelidir:
  * Bir soru: Ev ekonomisi, mutfak, yemek tarifi, manav/market alışverişi veya aile bütçesi
  * Bir soru: Marangozluk atölyesi, mimari çizim, park peyzajı, ahşap zanaatı veya mobilya tasarımı
  * Bir soru: Spor sahası, atletizm koşu parkuru, bisiklet turu, dağcılık veya yüzme yarışı
  * Bir soru: Doğa ve çevre, baraj gölü su seviyesi, tarımsal damla sulama veya meteoroloji hava raporu
  * Bir soru: Okul kütüphanesi, arkeoloji müzesi, geleneksel el sanatları (ebru, çini, dokuma)
  * Bir soru: Şehir içi ulaşım ve trafik ışığı zamanlaması, güneş enerjisi santrali veya geri dönüşüm tesisi
- Karakter isimleri de her soruda değişmelidir (Örn: 1. soruda Elif ve Kerem, 2. soruda Marangoz Ahmet Usta, 3. soruda Zeynep ile Can, 4. soruda Çiftçi Hasan Bey...).`;

export function getMebiPedagogicalRules(targetCount: number): string {
  return `ÖNEMLİ MEBİ PEDAGOJİK KURALLARI:
1. DÜZ BİLGİ/TANIM KESİNLİKLE YASAKTIR. ("... nedir?", "... kim bulmuştur?" gibi ezber sorular sorulamaz).
2. Her soru mutlaka MEBİ'nin şu 7 şablonundan birine dayanmalıdır:
   - Durum & Özellik Matrisi (VAR/YOK tablosu)
   - Kurgusal Senaryo & Vaka İncelemesi
   - Öğrenci Tartışması & Yanılgı Tespiti
   - Hata Tespiti & Adım Analizi (İlk hata hangi adımda yapılmıştır?)
   - Dilemma (İkilem) ve Çözüm Değerlendirmesi
   - Empati & Cümle Dönüştürme
   - Metin İçi Delillendirme & Örtük Anlam
3. Toplam ${targetCount} sorunun puanları toplamı 100 olacak şekilde paylaştırılmalıdır.
4. ZORUNLU KAYNAK MATERYAL KURALI (EN KRİTİK KURAL - ASLA İHMAL EDİLEMEZ):
   - Eğer bir soru "metne göre", "metinden hareketle", "parçaya göre", "şiire göre", "tabloya göre", "grafiğe göre", "diyaloğa göre" veya "verilen duruma göre" kurgulanmışsa; O METNİN, TABLONUN VEYA DİYALOĞUN TAMAMI MUTLAKA "stimulus" ALANINA EKSİKSİZ VE DETAYLI YAZILMALIDIR!
   - ASLA "Metinde bir olay anlatılmaktadır", "Metinde zeytinyağı aşamaları anlatılmıştır" gibi 1 cümlelik soyut özetler YAZILAMAZ! Metin, öğrencinin soruda sorulan aşamaları, ana fikri, neden-sonuç ilişkisini bizzat metni okuyarak bulabileceği zenginlikte ve somutlukta (en az 2-4 cümlelik somut hikâye/olay örgüsü) yazılmalıdır.
   - Tablo sorularında veriler (satır ve sütunlar) mutlaka "stimulus" içinde verilmelidir.
   - Diyalog sorularında konuşan karakterlerin replikleri (Örn: Elif: "...", Kerem: "...") mutlaka "stimulus" içinde yer almalıdır.
   - Öğrenci kaynak metni/veriyi görmeden ASLA soruyu cevaplayamaz!`;
}

/**
 * FAZ 3.3.2 - OYSS Gelişmiş Pedagojik ve Kalite Kuralları
 * Kavramsal anlama, yönerge açıklığı ve analitik rubrik teşvikini dengeler.
 */
export function getQualityPedagogicalRules(targetCount: number): string {
  return `ÖNEMLİ MEBİ VE OYSS KALİTE PEDAGOJİK KURALLARI:
1. KAVRAMSAL ANLAMA VE DÜŞÜNME BECERİSİ ÖLÇÜMÜ (EZBER SÖZLÜK TANIMI YERİNE):
   - Bağlamdan kopuk, salt ezbere dayalı sözlük tanımları veya mekanik bilgi aktarımı ("... kim bulmuştur?", "... yılı nedir?" gibi) sorulamaz.
   - Ancak ilgili kazanım bir kavramın temel özelliklerini açıklamayı, bir durumu kavramsal olarak tanımlamayı veya terimin bağlam içindeki işlevini belirlemeyi gerektiriyorsa kavramsal sorular ve yönergeler meşrudur.
   - Sorunun salt ezber mi yoksa kavramsal anlama, uygulama veya analiz mi ölçtüğü daima gözetilmelidir.
2. Her soru mutlaka MEBİ'nin şu 7 şablonundan birine dayanmalıdır:
   - Durum & Özellik Matrisi (VAR/YOK tablosu)
   - Kurgusal Senaryo & Vaka İncelemesi
   - Öğrenci Tartışması & Yanılgı Tespiti
   - Hata Tespiti & Adım Analizi (İlk hata hangi adımda yapılmıştır?)
   - Dilemma (İkilem) ve Çözüm Değerlendirmesi
   - Empati & Cümle Dönüştürme
   - Metin İçi Delillendirme & Örtük Anlam
3. Toplam ${targetCount} sorunun puanları toplamı 100 olacak şekilde paylaştırılmalıdır.
4. ZORUNLU KAYNAK MATERYAL KURALI (EN KRİTİK KURAL - ASLA İHMAL EDİLEMEZ):
   - Eğer bir soru "metne göre", "metinden hareketle", "parçaya göre", "şiire göre", "tabloya göre", "grafiğe göre", "diyaloğa göre" veya "verilen duruma göre" kurgulanmışsa; O METNİN, TABLONUN VEYA DİYALOĞUN TAMAMI MUTLAKA "stimulus" ALANINA EKSİKSİZ VE DETAYLI YAZILMALIDIR!
   - ASLA "Metinde bir olay anlatılmaktadır", "Metinde zeytinyağı aşamaları anlatılmıştır" gibi 1 cümlelik soyut özetler YAZILAMAZ! Metin, öğrencinin soruda sorulan aşamaları, ana fikri, neden-sonuç ilişkisini bizzat metni okuyarak bulabileceği zenginlikte ve somutlukta (en az 2-4 cümlelik somut hikâye/olay örgüsü) yazılmalıdır.
   - Tablo sorularında veriler (satır ve sütunlar) mutlaka "stimulus" içinde verilmelidir.
   - Diyalog sorularında konuşan karakterlerin replikleri (Örn: Elif: "...", Kerem: "...") mutlaka "stimulus" içinde yer almalıdır.
   - Öğrenci kaynak metni/veriyi görmeden ASLA soruyu cevaplayamaz!`;
}

/**
 * FAZ 3.3.2 - Yönerge Açıklığı, Bilişsel Düzey ve Pedagojik Kalite Kuralı
 */
export const QUESTION_DIRECTIVE_CLARITY_RULE = `YÖNERGE AÇIKLIĞI VE BİLİŞSEL DÜZEY KORUNUMU KURALI (EN KRİTİK KURAL):
- Soru kökünde öğrenciden tam olarak ne yapması istendiği açık, net ve şüphesiz ifade edilmelidir.
- Tekil / Çoğul beklentisi açıkça belirtilmelidir:
  * Tek bir cevap bekleniyorsa bu durum belirtilmeli ("tek bir cümleyle açıklayınız", "ana düşünceyi belirleyiniz" vb.).
  * Birden fazla cevap veya örnek isteniyorsa sayı açıkça verilmelidir ("2 farklı örnek veriniz", "3 temel nedenini yazınız" vb.).
- Karşılaştırma, gerekçelendirme veya açıklama işlemlerinin kapsamı net olmalıdır ("...nedenini gerekçesiyle açıklayınız", "...farklarını belirterek karşılaştırınız").
- Görev Bütünlüğü: Birbirinden bağımsız iki farklı görev tek bir soru cümlesinde iç içe geçirilmemeli, alt maddeler (a, b) halinde ayrılmalıdır. Ancak birbiriyle doğrudan ilişkili ve bütünleşik bir beceriyi ölçen aşamalı görevler (örneğin: "hatayı tespit ediniz ve doğrusunu yazınız", "işlemi yapınız ve sonucunu en sade haliyle yazınız") korunabilir; sırf "ve" bağlacı var diye yapay olarak bölünmemelidir.
- Sınıf Düzeyine Uygunluk ve Pedagojik Derinlik (Yüzeysellik Yasağı):
  * Uzun bir metinden açıkça geçen tek bir meyve, nesne veya kişi adını buldurmaya dayalı ("Hangi meyve alınmıştır? -> Çilek" gibi) mekanik kelime avcılığı KESİNLİKLE ÜRETİLEMEZ.
  * "Metnin yüzey anlamı" (T.O.5.6) soruları tek kelime avcılığı değil; olayın gelişimini, karakterin amacını veya iki açık bilginin ilişkisini bütüncül açıklamayı gerektirir. Tek kelimelik yanıtlara asla 12 puandan fazla verilemez; 15-20 puanlık sorular iki boyutlu açıklama gerektirir.
  * Temsil Uyumu: Gerçek görsel yoksa afiş/resim metinle anlatılamaz. Yazım-noktalama soruları "Zor" değil "Kolay/Orta" etiketlenmelidir.
  * Soru; hedef sınıf düzeyindeki (5-8. sınıf) öğrencinin kazanımda hedeflenen bilgi veya beceriyi gerçekten ölçmelidir: Öğrenciden metindeki bir davranışı açıklaması, olaylar arasında neden-sonuç ilişkisi kurması, karakterin tutumunu yorumlaması, işlem basamaklarını yürütmesi veya çıkarım yapması istenmelidir.
  * Ancak her soruda zorlama üst düzey çıkarım veya felsefi gerekçe aranmaz; kazanım doğrudan bilgi veya anlama ölçüyorsa soru bu sınırda kalmalı, yapay olarak zorlaştırılmamalı veya aşırı basitleştirilmemelidir.
- Dili sadeleştirirken sorunun kazanımı, bilişsel düzeyi ve düşünme derinliği KESİNLİKLE düşürülmemeli veya yapay olarak kolaylaştırılmamalıdır. Düşünme düzeyi yüksek, dil yükü gereksiz karmaşıklıktan arındırılmış sorular esastır.`;

/**
 * FAZ 3.3.2 - Rubrik ve Dereceli Puanlama Anahtarı Tasarım Kuralı
 */
export const RUBRIC_DESIGN_RULE = `ANALİTİK DERECELİ PUANLAMA ANAHTARI (RUBRİK) TEŞVİK KURALI:
- Sorunun çözüm süreci birden fazla basamak, kavram teşhisi ve analitik gerekçelendirme gerektiriyorsa rubrik KESİNLİKLE analitik kriter basamaklarına ayrılmalıdır:
  * Örnek Kriter 1: Doğru kavramsal / olgusal teşhis ve tespit (Örn: 8 puan)
  * Örnek Kriter 2: Bilimsel gerekçelendirme, metin kanıtı veya işlem basamakları (Örn: 7 puan)
- Soru doğrudan tek bir olguyu, tek bir kavramı veya tekil bir sonucu ölçüyorsa tek kriterli rubrik kullanılabilir (zorla bölünmez).
- Her sorunun rubrik kriter puanlarının toplamı, o sorunun 'points' değerine TAM EŞİT olmak zorundadır.`;
