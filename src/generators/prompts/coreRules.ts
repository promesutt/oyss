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
