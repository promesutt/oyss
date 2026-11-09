import { SubjectId } from '../../types';

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
  * Soru zorluğu; senaryodaki soru sayısı, dersin niteliği, sınıf seviyesi, öğrenme çıktısı ve istenen ölçme derinliğine göre dengeli belirlenmelidir.
  * Kolay, orta ve zor sorular pedagojik dengede üretilmeli; üst düzey düşünme gerektiren sorular yapay bir kazanım etiketi kısıtlaması olmaksızın senaryo zorluk planına göre oluşturulmalıdır.
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

export interface DynamicContextDiversityParams {
  grade?: number;
  subjectId?: string;
  targetCount?: number;
  variationIndex?: number;
  avoidDirectives?: string;
}

/**
 * FAZ 3.3.3 / TASK 141 - Dinamik Bağlam Çeşitliliği ve Soru Tekrar Önleme Kuralı
 * Sabit soru numarası-bağlam eşleşmelerini kaldırır, önceki setlerde kullanılan
 * bağlamları dışlar ve modele derse/kazanıma uygun taze alternatifler önerir.
 */
export function getDynamicContextDiversityRule(params?: DynamicContextDiversityParams): string {
  const grade = params?.grade || 5;
  const subjectId = params?.subjectId || 'turkce';
  const vIdx = params?.variationIndex || 0;
  const avoid = (params?.avoidDirectives || '').toLowerCase();

  // Tespit edilen önceki bağlamlar (yasaklar listesi)
  const avoidAlerts: string[] = [];
  if (avoid.includes('çilek') || avoid.includes('manav') || avoid.includes('pazar') || avoid.includes('meyve')) {
    avoidAlerts.push('Manav/pazar alışverişi, meyve-sebze tartımı ve market kurguları');
  }
  if (avoid.includes('ahşap') || avoid.includes('topaç') || avoid.includes('sandık') || avoid.includes('fırıldak')) {
    avoidAlerts.push('Tavan arasındaki ahşap sandık ve dede yadigârı oyuncak kurguları');
  }
  if (avoid.includes('kuş yuva') || avoid.includes('çınar') || avoid.includes('dal')) {
    avoidAlerts.push('Ağaç dallarına kuş yuvası yerleştirme kurguları');
  }
  if (avoid.includes('denizaltı') || avoid.includes('mikroplastik')) {
    avoidAlerts.push('Denizaltı mikroplastik araştırma kurguları');
  }
  if (avoid.includes('bal') && avoid.includes('kavanoz')) {
    avoidAlerts.push('Bal hasadı ve kavanozlara paylaştırma kurguları');
  }

  // Branş ve sınıf düzeyine uygun zengin ve alternatif bağlam havuzları
  // 6 farklı yaşam alanından seçilir, rotasyonel olarak her varyasyonda kaydırılır.
  const contextPoolsBySubject: Record<string, string[][]> = {
    turkce: [
      [
        'Doğa gözlem kulesinde kuş göç rotalarını izleyen gözlemciler',
        'Geleneksel seramik ve çömlek atölyesinde çamurun kuruma aşamaları',
        'Mahalle kütüphanesinde yıpranmış kitapları ciltleyen okuma kulübü',
        'Okul bahçesindeki serada aromatik bitki bakımını üstlenen öğrenciler',
        'Geleneksel taş fırında ekşi mayalı köy ekmeği pişiren usta',
        'Tarihî tren garında buharlı lokomotiften hızlı trene seyahat anısı'
      ],
      [
        'Arkeoloji müzesinde antik mozaik restorasyonunu belgeleyen araştırmacı',
        'Köy meydanında imece usulü zeytin toplayıp sıkan mahalle sakinleri',
        'Gökyüzü gözlem şenliğinde teleskopla ay kraterlerini inceleyen kulüp',
        'Ahşap oymacılığı zanaatında geometrik desenler çizen usta ve çırak',
        'Mahalle çocuk parkındaki koşu parkurunda centilmenlik (fair-play)',
        'Bozulan eski bir mekanik saati tamir ustası dedesiyle onaran çocuk'
      ],
      [
        'Deniz feneri bekçisinin sisli havalarda gemilere kılavuzluk hikâyesi',
        'Okul radyosunda çevre koruma ve sıfır atık üzerine canlı röportaj',
        'Geleneksel ebru sanatında kitreli su üzerindeki boyaların ahengi',
        'Orman gözetleme kulesinde nöbet tutan yangın gözetleme ekibi',
        'Köy okuluna bağışlanan enstrümanlarla ilk orkestrayı kuran çocuklar',
        'Balkon bahçeciliğinde organik nane ve domates yetiştirme serüveni'
      ]
    ],
    matematik: [
      [
        'Mimari maket tasarımında ölçekli ahşap bloklar ve kenar hesabı',
        'Güneş paneli tarlasında üretilen elektriğin saatlik dağılımı',
        'Baraj gölündeki su seviyesinin mevsimsel doluluk oranları',
        'Kargo dağıtım merkezinde paket ağırlığı ve rota optimizasyonu',
        'Spor kulübünün atletizm pistinde tur süreleri ve hız analizi',
        'Okul kantininde geri dönüştürülebilir ambalaj maliyet hesabı'
      ],
      [
        'Tarımsal damla sulama sisteminde debi ve su tasarrufu verileri',
        'Halk kütüphanesinde kitap türlerine göre raf yerleşim oranları',
        'Meteoroloji istasyonunda haftalık sıcaklık değişim tahminleri',
        'Organik fidanlıkta yetiştirilen çam fidanlarının uzama hızları',
        'Bisiklet turu parkurunda eğim açıları ve mola mesafeleri',
        'Geleneksel dokuma tezgâhında ilmek sayısı ve desen simetrisi'
      ]
    ],
    fen_bilimleri: [
      [
        'TÜBİTAK model uydu yarışmasında irtifa ve sensör ölçümleri',
        'Rüzgâr türbininde kanat açısı ile elektrik verimi ilişkisi deneyi',
        'Göl ekosisteminde su kirliliği ve oksijen seviyesi etkisi',
        'Isı yalıtım malzemelerinin sıcaklık koruma süreleri testi',
        'Tohum çimlenmesinde ışık rengi ve nemin büyüme hızına etkisi',
        'Sürtünme kuvvetinin farklı zeminlerde dinamometreyle ölçümü'
      ],
      [
        'Güneş enerjili su ısıtma sisteminde yansıtıcı yüzey verimi',
        'Doğal gübre çeşitlerinin bitki kök gelişimine etkisi deneyi',
        'Ses yalıtımında sünger ve köpük katmanların desibele etkisi',
        'Mıknatısların çekim kuvvetinin mesafeye göre değişimi deneyi',
        'Işığın prizmada renklerine ayrılması deney düzeneği',
        'Geri dönüşüm tesisinde atıkların ayrıştırılma mekanizması'
      ]
    ]
  };

  const subjectPools = contextPoolsBySubject[subjectId] || contextPoolsBySubject.turkce;
  const poolIndex = Math.abs(vIdx) % subjectPools.length;
  const selectedPool = subjectPools[poolIndex];

  // Alternatif isim rotasyonu (klişe Kerem/Elif/Deniz yerine özgün Türk isimleri)
  const nameSets = [
    ['Umut', 'Bilge', 'Tarık', 'Yasemin', 'Ozan', 'Beril'],
    ['Ilgaz', 'Defne', 'Serra', 'Selim', 'Görkem', 'Meltem'],
    ['Barış', 'Eren', 'Duru', 'Ceyda', 'Kaan', 'Asude']
  ];
  const selectedNames = nameSets[Math.abs(vIdx) % nameSets.length];

  const avoidSection = avoidAlerts.length > 0
    ? `\n- [YASAK BAĞLAMLAR]: Önceki setlerdeki şu temaları KESİNLİKLE TEKRARLAMA: ${avoidAlerts.join(', ')}.`
    : '';

  return `HER SORU İÇİN DİNAMİK BAĞLAM ÇEŞİTLİLİĞİ VE ÖZGÜNLÜK KURALI (EN KRİTİK KURAL):
- AYNI SINAV İÇİNDEKİ SORULARDA ASLA AYNI MEKÂN, AYNI ETKİNLİK VEYA AYNI BAĞLAMI TEKRARLAMA!
- Soru numaralarına sabit kalıplar (örneğin 1. soruya pazar/manav) KESİNLİKLE BAĞLANAMAZ.${avoidSection}
- Bu sınav ${grade}. Sınıf ${vIdx + 1}. varyasyon setidir. Her soruda birbirinden TAMAMEN FARKLI alanlardan taze kurgu kurunuz:
${selectedPool.map((c, i) => `  * Soru ${i + 1}: ${c}`).join('\n')}
- Karakter isimleri her soruda özgün ve çeşitli olmalıdır (${selectedNames.join(', ')} vb.).
- ZORUNLU PEDAGOJİK SINIR: Kurgu ve olay örgüsü, sorunun kazanımını ve bilişsel düzeyini asla gölgelememeli; süs değil, analitik düşünme zemini olmalıdır. Soru kökü açık ve amaca dönük kalmalıdır.`;
}

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
 * FAZ 3.3.2 / TASK174 - Yönerge Açıklığı ve Pedagojik Kalite Kuralı (Genel Çekirdek)
 * Tüm dersler için ortak: açık yönergeler, net tekil/çoğul beklentisi, soru kökünü tekrarlamama,
 * ve yüzeysellik karşıtı analitik derinlik.
 */
export const UNIVERSAL_DIRECTIVE_CLARITY_RULE = `YÖNERGE AÇIKLIĞI VE BİLİŞSEL DÜZEY KORUNUMU KURALI (EN KRİTİK KURAL):
- Soru kökünde öğrenciden tam olarak ne yapması istendiği açık, net ve şüphesiz ifade edilmelidir.
- Tekil / Çoğul beklentisi açıkça belirtilmelidir:
  * Tek bir cevap bekleniyorsa bu durum belirtilmeli ("tek bir gerekçeyle açıklayınız", "temel nedeni belirleyiniz" vb.).
  * Birden fazla cevap veya örnek isteniyorsa sayı açıkça verilmelidir ("2 farklı örnek veriniz", "3 temel nedenini yazınız" vb.).
- MODEL CEVAPTA SORU KÖKÜNÜ TEKRAR ETME YASAĞI: 'answer' alanı KESİNLİKLE soru kökünü tekrar edemez; doğrudan doğru çözümü ve yanıtı yazınız. 'alternativeAnswers' da model cevapla aynı temel gerçeği desteklemelidir.
- Görev Bütünlüğü: Birbirinden bağımsız iki farklı görev tek bir soru cümlesinde iç içe geçirilmemeli, alt maddeler halinde ayrılmalıdır. Ancak birbiriyle doğrudan ilişkili aşamalı görevler ("hatayı tespit edip doğrusunu yazınız") korunabilir; sırf "ve" bağlacı var diye yapay olarak bölünmemelidir.
- Sınıf Düzeyi ve Pedagojik Derinlik (Yüzeysellik Yasağı):
  * Metinden/bağlamdan tek bir kelime/nesne avcılığı ("Hangi nesne alınmıştır?") KESİNLİKLE ÜRETİLEMEZ.
  * Sorular olayın gelişimini, bilimsel prensipleri veya neden-sonuç ilişkisini bütüncül açıklamayı gerektirir. Tek kelimelik yanıtlara asla 12 puandan fazla verilemez; 15-20 puanlık sorular çok boyutlu analitik açıklama gerektirir.
  * Temsil Uyumu: Gerçek görsel yoksa afiş/resim sorulamaz.
  * Öğrenciden kavramsal mekanizmayı açıklayabilmesi, neden-sonuç ilişkisi kurması veya bilimsel çıkarım yapması istenmelidir; yapay olarak zorlaştırılmamalı veya aşırı basitleştirilmemelidir.
- Dili sadeleştirirken sorunun kazanımı, bilişsel düzeyi ve düşünme derinliği KESİNLİKLE düşürülmemelidir.`;

export const TURKISH_DIRECTIVE_CLARITY_ADDITIONS = `
- Türkçe Yazım ve Noktalama Yönergeleri:
  * Yazım-noktalama sorularında: Çoğul hata isteniyorsa metinde en az 2 somut hata yer almalıdır. Metinde tek hata varsa soru kökü KESİNLİKLE tekil olmalıdır ("yazım yanlışını bularak doğrusunu yazınız").
  * Noktalama görevi sorulan sorularda model cevap her işaretin metindeki somut görevini açıkça eşleştirmelidir (Örn: "İki nokta: Kendisinden sonra konuşma geleceğini belirtmek; Tırnak: Aktarma sözünü göstermek").
  * ÖZEL AD VE EK YAZIMI (TDK): 3. teklik kişi iyelik eki olan özel adlarda kesme işareti addan sonra konur (Örn: 'Ankara Garı\\'ndan', 'İstanbul Boğazı\\'na'; 'Ankara Garın\\'dan' gibi hatalı ayrımlar yapılamaz).
  * METİNDEN AKTARIM VE İMLA DOĞRULUĞU: Model cevapta metinden aktarılan sözcükler eksiksiz yazılmalıdır (Örn: metinde 'pideleri' geçiyorsa model cevapta 'pider' gibi kırpılmış değil, 'pideleri' yazılmalıdır).
  * T.O.5.6 gibi anlama soruları tek kelime değil, olayın gelişimini veya neden-sonuç ilişkisini bütüncül açıklamayı gerektirir.`;

/**
 * Geriye dönük uyumluluk için statik Türkçe içeren tam kural
 */
export const QUESTION_DIRECTIVE_CLARITY_RULE = `${UNIVERSAL_DIRECTIVE_CLARITY_RULE}${TURKISH_DIRECTIVE_CLARITY_ADDITIONS}`;

/**
 * TASK174 - Branşa Duyarlı Yönerge Açıklığı Kuralı
 * Türkçe branşına özel dil bilgisi/noktalama kurallarını yalnızca Türkçe dersine enjekte eder;
 * Fen Bilimleri, Matematik ve diğer derslere yalnızca genel yönerge açıklığını aktarır.
 */
export function getDirectiveClarityRule(subjectId?: SubjectId | string): string {
  if (subjectId === 'turkce') {
    return QUESTION_DIRECTIVE_CLARITY_RULE;
  }
  return UNIVERSAL_DIRECTIVE_CLARITY_RULE;
}

/**
 * FAZ 3.3.2 / TASK174 - Rubrik ve Dereceli Puanlama Anahtarı Tasarım Kuralı
 * Analitik basamaklama, kısmi puanlama ve puan eşitliğini tek elden yönetir.
 */
export const RUBRIC_DESIGN_RULE = `ANALİTİK DERECELİ PUANLAMA ANAHTARI (RUBRİK) TEŞVİK KURALI:
- Sorunun çözüm süreci birden fazla basamak, kavram teşhisi ve analitik gerekçelendirme gerektiriyorsa rubrik analitik kriter basamaklarına ayrılmalıdır:
  * Kriter 1: Doğru kavramsal / olgusal teşhis ve tespit (Örn: 8 puan)
  * Kriter 2: Bilimsel gerekçelendirme, metin kanıtı veya işlem basamakları (Örn: 7 puan)
- Yüksek puanlı (>= 12 p) sorularda tek ölçüt yasaktır; kısmi puanlama için en az 2 analitik ölçüte bölünmelidir.
- Doğrudan tek olgulu ve < 12 p sorularda tek ölçüt kullanılabilir (zorla bölünmez).
- Her sorunun rubrik kriter puanlarının toplamı, o sorunun 'points' değerine TAM EŞİT olmak zorundadır.`;

/**
 * TASK 158 / TASK 161 - Matematik Dersi İçin Otomatik Görsel Desteği Kuralı
 */
export const AI_MATHEMATICS_VISUAL_DIRECTIVES = `MATEMATİK GÖRSEL KURALLARI VE PEDAGOJİK MODELLEME ("visual" alanı):
- PEDAGOJİK GÖRSEL: EBOB parselleme/fayans ('area_perimeter'), kare/dikdörtgen alan-çevre ('polygon_2d'), sayı doğrusunda köklü sayı ('number_line') gibi görselin düşünmeyi desteklediği sorularda "visual" üretiniz.
- GÖRSEL GEREKMEYEN: Salt işlem, denklem veya asal çarpan algoritması gibi sözel/aritmetik sorularda bu alanı EKLEMEYİNİZ.
- DESTEKLENEN: "geometry_shape" (subType: polygon_2d, angle_model, line_system, grid_coordinate, area_perimeter), "number_line", "fraction_model".
  * number_line: params: { min: 0, max: 10, step: 1, points: [{ label: "?", value: 4.5 }] }
  * area_perimeter: params: { subType: "area_perimeter", totalWidth: 120, totalHeight: 80, tileWidth: 40, tileHeight: 40, widthLabel: "120 m", heightLabel: "80 m" }
  * polygon_2d: params: { subType: "polygon_2d", shape: "rectangle", width: 12, height: 8, edgeLabels: ["12 cm", "8 cm", "12 cm", "8 cm"] }
- ANTI-LEAK: Bilinmeyen değerler için görsel etiketinde daima "?" kullanınız; cevabı asla doğrudan yazmayınız.`;
