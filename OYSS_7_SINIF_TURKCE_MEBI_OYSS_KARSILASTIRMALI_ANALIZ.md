# OYSS | 7. Sınıf Türkçe MEBİ ve Mevcut Soru Havuzu Karşılaştırmalı Analizi

**Rapor Tarihi:** 29 Ekim 2026  
**Rapor Türü:** Karşılaştırmalı Pedagojik ve Teknik Analiz  
**Kapsam:** T.C. Millî Eğitim Bakanlığı Temel Eğitim Genel Müdürlüğü 7. Sınıf Türkçe MEBİ "Yazılıya Hazırlanıyorum" fasikülü (10 soru) ile OYSS platformundaki mevcut 7. sınıf Türkçe soru havuzunun (39 soru), öğrenme çıktıları, soru kökleri, bağlam kalitesi, delillendirme, alternatif model cevaplar ve rubrik/öz değerlendirme boyutlarında kanıta dayalı karşılaştırması.  
**Önemli Çalışma Sınırı:** Bu çalışma yalnızca analiz ve raporlama görevidir. Hiçbir kod, JSON, TypeScript, veri veya yapılandırma dosyası değiştirilmemiş; dosya silinmemiş/taşınmamış; commit, push veya deploy yapılmamıştır.

---

## 1. İncelenen Kaynaklar ve Doğrulanmış Envanter

Analiz sürecinde tahmin veya varsayıma yer verilmemiş; doğrudan dosya sistemi ve kod tabanından doğrulanmış envanter kullanılmıştır:

| Kaynak | Dosya Yolu / Konum | Format / Boyut | Doğrulanan İçerik ve Sayılar |
|---|---|---|---|
| **MEBİ 7. Sınıf Türkçe Fasikülü** | `/Users/mesutduran/Desktop/mebi/turkce-mebi-ornek-yazili1-1.pdf` | PDF (864 KB) | 9 sayfa; 10 adet açık uçlu soru; 10 soruya ait çözümler ve alternatif kabul edilebilir yanıtlar. |
| **MEBİ Çıkarılmış Soru Bankası** | `meb_data/extracted_question_bank.json` | JSON (146 KB) | 33 kazanım; Türkçe özelinde 10 TYMM kazanımı altında 17 adet ham soru kaydı. |
| **Genişletilmiş Soru Bankası** | `meb_data/complete_question_bank.json` | JSON (163 KB) | 34 kazanım; Türkçe özelinde 10 TYMM kazanımı altında 20 adet pedagojik soru kaydı. |
| **OYSS Canlı Sınav Havuzu** | `src/data/sampleExams.ts` | TypeScript (1.27 MB) | Toplam 123 sınav (847 soru); 7. Sınıf Türkçe için 6 sınav (`senaryo_1` - `senaryo_6`) ve **tamamı tekil 39 soru**. |
| **Öğretim Programı ve Senaryolar** | `src/data/curriculumData.ts` | TypeScript (78 KB) | 7. Sınıf Türkçe için 6 resmi ÖDSGM senaryosu, soru dağılımları ve `OFFICIAL_OUTCOMES` tanımları. |
| **Kazanım Çalışma Havuzu** | `src/data/outcomeStudyBank.ts` | TypeScript (132 KB) | 7. Sınıf Türkçe için 10 kazanımın tamamında tuzaklar, kritik notlar ve çözümlü model sorular. |
| **Hap Bilgili Çalışma Kâğıdı** | `src/data/studySheets.ts` | TypeScript (210 KB) | 7. Sınıf Türkçe 1. Yazılı için 1 kapsamlı çalışma fasikülü (`study_7_turkce_1_1_senaryo_1`). |
| **AI Soru Üretim Motoru** | `src/utils/aiGeneratorEngine.ts` | TypeScript (44 KB) | `generateMEBIQuestions()` fonksiyonu, prompt şablonları, 7 soru arketipi ve zorluk dağılım kuralları. |
| **Kaynak Materyal Doğrulayıcı** | `src/utils/sourceMaterialValidator.ts` | TypeScript (23 KB) | `detectSourceRequirement()`, `validateExamSourceMaterials()` fonksiyonları ve 12 metin sinyali. |
| **Öz Değerlendirme Modeli** | `src/types/practice.ts` & `src/types/index.ts` | TypeScript | `GeneralSelfEvaluationOption` (4 kanaat seçeneği), `MIN_STUDENT_ANSWER_LENGTH = 2` eşiği ve `QuestionRubricItem[]`. |

---

## 2. Örneklem Seçim Yöntemi

Karşılaştırmanın bilimsel geçerliliği için MEBİ fasikülünde yer alan **10 sorunun tamamı** ve bu soruların ölçtüğü 10 resmî Türkiye Yüzyılı Maarif Modeli (TYMM) öğrenme çıktısı ile birebir eşleşen OYSS soruları seçilmiştir:

### Temsil Edici Örneklem Eşleştirme Tablosu

| # | Ölçülen Öğrenme Çıktısı (Kazanım) | MEBİ Sorusu (Kaynak: `turkce-mebi-ornek-yazili1-1.pdf`) | OYSS Sorusu (Kaynak: `src/data/sampleExams.ts`) | Soru Türü / Pedagojik Odak |
|---|---|---|---|---|
| **1** | **`T.O.7.21`** (Söz Varlığı Çözümleme) | Soru 1 (s. 1) - HÜRKUŞ metninden hareketle *keşif, teçhizat, manevra* kelimelerinin anlam tahmini | `exam_7_turkce_1_1_senaryo_1` Q4 - Şerife Bacı metnindeki *bağımsızlık* eş anlamlısı ve *yankılanmak* mecaz kullanımı | Bağlamdan söz varlığı türetme ve çok anlamlılık |
| **2** | **`T.O.7.5`** (Yüzey Anlam / Konu) | Soru 2 (s. 1) - Arıların doğadaki rolünü anlatan metnin konusunun yazılması | `exam_7_turkce_1_1_senaryo_1` Q2 - Şerife Bacı kağnı yolculuğu metninin konusunun tek cümleyle yazılması | Metnin doğrudan açık anlamı ve konu tespiti |
| **3** | **`T.O.7.7`** (Basit Çıkarım) | Soru 3 (s. 1) - Demirci Hasan'ın ocağı hararetle yakması ve köylülerin kılıç almasından halkın direniş kararının çıkarılması | `exam_7_turkce_1_1_senaryo_2` Q2 - Ahilikte pabucu dama atılma uygulamasının esnaf ve tüketici güvenine etkisinin çıkarımı | Olay örgüsü ve eylemden sebep-sonuç / niyet çıkarımı |
| **4** | **`T.Y.7.18`** (Söz Varlığını Zenginleştirme) | Soru 4 (s. 2) - Şerife Bacı metnini *fedakârlık, sarsılmaz irade, hürriyet, vatan sağ olsun* ifadeleri ve benzetmeyle tamamlama | `exam_7_turkce_1_1_senaryo_1` Q6 - Kağnı kolunun kışlaya ulaşma anını *fedakârlık, sarsılmaz irade, hürriyet, vatan sağ olsun* ile yazma | Verilen anahtar kavramlarla bağlamsal metin tamamlama |
| **5** | **`T.O.7.8`** (Örtük Anlam / Üst Düzey Çıkarım) | Soru 5 (s. 2) - Kütüphanede Mehmet'in öz güven kazanmasında Ece'nin tutumunun rolü ve örtük mesajların metinden en az 2 ipucuyla delillendirilmesi | `exam_7_turkce_1_1_senaryo_1` Q3 - Şerife Bacı'nın bebeğinin yorganını mermilere örtmesinin altında yatan fedakârlığın metin içi delillerle açıklanması | Derin anlam, psikolojik tahlil ve metin içi kanıt sunma |
| **6** | **`T.O.7.4`** (Bilinmeyen Sözcük Tahmini) | Soru 6 (s. 3) - Ömer Seyfettin Forsa metnindeki *bitap, iştiyak, teselli* kelimelerinin tahmini ve metin içi gerekçeleri | `exam_7_turkce_1_1_senaryo_1` Q1 - Metindeki *mefkûre* kelimesinin ve *vatan yetim kalamaz* sözünün bağlamdan tahmini ve gerekçelendirilmesi | Klasik edebi metinden sözcük anlamı + bağlamsal dayanak |
| **7** | **`T.O.7.14`** (Metin Yapısı Çözümleme) | Soru 7 (s. 3) - Vatan sevgisi metnindeki metin yapısının (karşılaştırma/zıtlık) belirlenmesi ve yazarın vurguladığı ana bilginin açıklanması | `exam_7_turkce_1_1_senaryo_2` Q3 - Ahilik teşkilatı metninin giriş, gelişme ve sonuç bölümlerindeki yapısal bilginin ve ana iletinin tespiti | Metin mimarisi (karşılaştırma, neden-sonuç, yapı bölümleri) |
| **8** | **`T.O.7.15`** (Anahtar Kelimeler) | Soru 8 (s. 4) - Küresel ısınma metninden 3 anahtar kelime belirlenmesi ve bunların sebep-sonuç ilişkisini nasıl özetlediğinin açıklanması | `exam_7_turkce_1_1_senaryo_2` Q4 - Ahilik metninden 3 anahtar kelime belirlenmesi ve metnin iletisiyle ilişkisinin gerekçelendirilmesi | Anahtar kelime tespiti ve kavramsal ilişki kurma |
| **9** | **`T.Y.7.21`** (Yazım ve Noktalama) | Soru 9 (s. 4) - a. İkilemelerin yazım yanlışının tespiti ve düzeltilmesi, b. Noktalı virgül (;) ve üç noktanın (...) kullanım amacının belirtilmesi | `exam_7_turkce_1_1_senaryo_1` Q7 - Ilgaz Dağı cümlesindeki büyük harf, kesme işareti ve bağlaç olan *-ki* yanlışlarının tespiti ve cümlenin düzeltilmesi | Kural ezberi yerine işlevsel düzeltme ve amaç gerekçelendirme |
| **10** | **`T.Y.7.3`** (Yazı Taslağı Oluşturma) | Soru 10 (s. 5) - "Doğa sevgisi" temalı bilgilendirici metin için giriş, gelişme ve sonuç taslağının hazırlanması ve metin yazılması | `exam_7_turkce_1_1_senaryo_1` Q5 - "Bir milletin en büyük gücü: Birlik ve Beraberlik" konusunda giriş, gelişme ve sonuç taslak başlıklarının planlanması | Yazma sürecini yönetme, kurgu ve taslak oluşturma |

---

## 3. MEBİ Soru Yazım Özellikleri

Fasiküldeki 10 soru ayrıntılı olarak incelendiğinde MEB'in soru yazım yaklaşımına dair şu karakteristik ilkeler belirlenmiştir:

1. **Bağlam Zorunluluğu ve Doğallığı:**  
   Hiçbir soru soyut dil kuralı sormaz. Örneğin ikileme kuralı sorulurken *"İkilemeler nasıl yazılır?"* denmez; *"Sınav kâğıtlarını apar-topar toplayıp hızlıhızlı sınıftan çıktı..."* bağlamı verilir.
2. **Kademeli Bilişsel Derinlik:**  
   Metin soruları basitten karmaşığa doğru net olarak katmanlandırılmıştır:
   - Soru 2: Yüzey Anlam (Doğrudan konu tespiti).
   - Soru 3: Basit Çıkarım (Eylemden amaç çıkarma: Demirci Hasan'ın kılıç dövmesi).
   - Soru 5: Derin / Örtük Anlam (Psikolojik ve örtük mesajları en az iki ipucu ile delillendirme).
3. **Şartlı ve Yönlendirici Yönergeler:**  
   Sorular öğrenciye tam olarak ne yapması gerektiğini açık sınırlar koyarak söyler:
   - *"en az iki ipucu ile delillendirerek açıklayınız."*
   - *"tek bir cümleyle yazınız."*
   - *"sadece anlamı değil, sizi bu tahmine götüren metin içi gerekçeleri de yazınız."*
4. **Çok Aşamalı / Parçalı Biçim:**  
   Söz varlığı ve dil bilgisi soruları iki basamaklıdır: Önce tahmin veya tespit, ardından metin içi kanıt veya kural gerekçesi istenir.
5. **Alternatif Cevap Zenginliği:**  
   Bakanlık çözümlerinde tek kalıp cümleye bağlılığı kırmış; *"Verilebilecek diğer örnek yanıtlar"* başlığı altında öğrencinin farklı sözcüklerle aynı anlama ulaşmasını geçerli saymıştır.
6. **Sayısal Puan ve Rubrik Bulunmaması:**  
   MEBİ hazırlık fasikülü kapağında *"Örnek soru niteliği taşımaz, yazılı öncesi çalışma amaçlıdır"* yazdığı için fasikülde **puanlama veya rubrik bulunmamaktadır**.

---

## 4. OYSS Sorularının Karşılaştırmalı Değerlendirmesi

OYSS'nin mevcut 7. sınıf Türkçe soruları (39 soru) MEBİ yaklaşımıyla karşılaştırıldığında güçlü ve geliştirilmeye açık yönler:

### Güçlü Yönler (Best Practices)
- **Kazanım ve Senaryo Uyumunun Kusursuzluğu:** OYSS'deki 6 sınav, ÖDSGM konu soru dağılım tablolarındaki soru sayıları ve kazanım kodlarıyla %100 örtüşmektedir.
- **Kaynak Metin Bütünlüğü:** OYSS'de yer alan Şerife Bacı, Ahilik Teşkilatı, Asırlık Çınar ve Neşet Ertaş metinleri zengin, pedagojik ve kültürel değerlerle yüklüdür.
- **Analitik Rubrik Varlığı:** MEBİ'de bulunmayan dereceli puanlama anahtarı OYSS'de her soruda mevcuttur (ör. 8 puan tespit + 7 puan gerekçe). Bu yapı öz değerlendirmenin omurgasını oluşturmaktadır.
- **Çapraz Referans Doğrulaması:** `sourceMaterialValidator.ts` sayesinde *"1. sorudaki metne göre"* ifadesi taşıyan ardışık soruların metinleri kaybolmamakta, sistemsel olarak güvenceye alınmaktadır.

### Eksik ve Geliştirilmeye Açık Yönler (Gaps)
- **Tekil Model Cevap Katılığı:** OYSS'de her sorunun tek bir `modelAnswer` metni vardır. Öğrenci doğru anlama gelse bile model cevaptaki birebir sözcükleri göremeyince kendi cevabından şüpheye düşebilmektedir. MEBİ'nin *"Verilebilecek diğer örnek yanıtlar"* esnekliği OYSS model cevap alanına henüz taşınmamıştır.
- **Rubrik Ölçütlerinde "Tespit" ile "Kanıt"ın Bazen Bitişmesi:** Bazı OYSS rubriklerinde *"Kelimenin doğru tahmin edilmesi ve gerekçelendirilmesi: 8 puan"* şeklinde iki farklı basamak tek kritere bağlanmıştır. Öğrenci kelimeyi doğru tahmin edip gerekçesini eksik bıraktığında kendine kaç puan vereceğini bilememektedir.
- **Yönergelerdeki Şartlı Kısıt Eksikliği:** MEBİ'deki *"en az iki ipucu ile delillendirerek"* gibi yönlendirici ifadeler OYSS'nin bazı çıkarım sorularında daha genel ifadelerle yer almaktadır.

---

## 5. Ortak Puanlama Matrisi ve Gerekçeleri

MEBİ ve OYSS soruları, kullanıcı tarafından talep edilen 10 değerlendirme boyutu üzerinden 1–5 analitik puan skalasında nesnel olarak puanlanmıştır:

| # | Değerlendirme Boyutu | MEBİ Puanı | OYSS Puanı | Puanlama Gerekçesi ve Karşılaştırma |
|---|---|:---:|:---:|---|
| **1** | **Soru kökünün açıklığı ve yönergenin kesinliği** | **5 / 5** | **4.5 / 5** | MEBİ'de emir kipi ve şart sınırları kusursuzdur (*"en az iki ipucu ile"*). OYSS çok başarılı olmakla birlikte bazı sorularda ipucu sayısı belirtilmemiştir. |
| **2** | **Bağlamın soruyla ilişkisi ve yeterliliği** | **4.8 / 5** | **4.4 / 5** | MEBİ metinleri özlü ve doğrudan soru odaklıdır. OYSS metinleri çok zengin olmakla birlikte bazı sorularda metin uzunluğu 150 kelimeyi aşarak okuma yükü getirmektedir. |
| **3** | **Ölçülen beceri ile öğrenme çıktısının uyumu** | **5 / 5** | **5 / 5** | Her iki kaynak da TYMM kazanımlarına (`T.O.7.4` - `T.Y.7.21`) tam sadakat göstermektedir. |
| **4** | **Açık anlam, çıkarım ve yorumlama düzeyi** | **5 / 5** | **4.3 / 5** | MEBİ'de yüzey anlam (`T.O.7.5`) ile derin çıkarım (`T.O.7.8`) arasındaki bilişsel sınır çok keskindir. OYSS'de bazı yüzey anlam soruları hafif çıkarım talep etmektedir. |
| **5** | **Metin içi kanıt isteme ve gerekçelendirme** | **4.8 / 5** | **4.0 / 5** | MEBİ Soru 5 ve 6'da açıkça *"sizi bu tahmine götüren metin içi gerekçeler"* talep edilir. OYSS'de gerekçe istenir ancak metin alıntısı şartı her soruda vurgulanmaz. |
| **6** | **Soru zorluğunun 7. sınıf düzeyine uygunluğu** | **4.9 / 5** | **4.7 / 5** | Her iki kaynak da 12-13 yaş ortaokul düzeyine tam uygundur. Ağır lise terimlerinden uzak durulmuştur. |
| **7** | **Cevap anahtarının doğruluğu ve alternatif cevaplar** | **5 / 5** | **3.2 / 5** | **En belirgin fark:** MEBİ her soruda 3-4 alternatif doğru yanıt sunarken, OYSS yalnızca tek bir resmi model cevap metni sunmaktadır. |
| **8** | **Puanlama ölçütleri ve öz değerlendirmeye elverişlilik** | **2.5 / 5** | **4.6 / 5** | **OYSS'nin açık üstünlüğü:** MEBİ'de hiçbir puan/rubrik yoktur. OYSS'de analitik rubrik basamakları ve bağımsız işaretleme imkânı vardır. |
| **9** | **Dil, ifade ve imla kalitesi** | **5 / 5** | **4.8 / 5** | Her iki kaynak da TDK ve MEB imla kurallarına tam uygundur. OYSS'de yalnızca birkaç soru metninde uzun cümle yapıları görülmektedir. |
| **10** | **Kaynak materyal veya stimulus bütünlüğü** | **5 / 5** | **4.7 / 5** | MEBİ'de her soru sayfasında materyal tamdır. OYSS'de `sourceMaterialValidator.ts` ile kaynak bütünlüğü güvenceye alınmıştır. |
| **ORTALAMA** | **GENEL KALİTE ORTALAMASI** | **4.70 / 5** | **4.42 / 5** | **Sonuç:** OYSS pedagojik açıdan MEBİ standartlarına çok yakındır; temel gelişim alanı alternatif cevap esnekliği ve rubrik ayrıştırmasıdır. |

---

## 6. Önceki Soru Yazım Profili Taslağının Eleştirel Değerlendirmesi

Önceki taslak raporda genel eğilim olarak sunulan bazı varsayımlar, 10 MEBİ sorusu üzerinde yapılan doğrudan metin analizleriyle sınanmış ve şu eleştirel düzeltmeler yapılmıştır:

### 1. "Bütün soruların 70–150 kelimelik metin kullanması" Kuralı Geçersizdir
- **Gerçek Durum:**
  - MEBİ Soru 3 (Demirci Hasan): Yalnızca **41 kelime**.
  - MEBİ Soru 8 (Sera gazı): Yalnızca **48 kelime**.
  - MEBİ Soru 9 (Yazım-noktalama): Paragraf değil, **13 kelimelik** tek bir hatalı cümle ve 3 bağımsız noktalama cümlesi.
  - MEBİ Soru 10 (Yazma taslağı): Okuma metni **0 kelime** (Yalnızca yönerge).
- **Sonuç:** 70–150 kelime bir genel ortalamadır; her soru için zorunlu kural yapılamaz. Yazma ve dil bilgisi soruları metin gerektirmez.

### 2. "Her sorunun mutlaka bağlama bağımlı olması" Kuralının Sınırları
- **Gerçek Durum:** MEBİ'de soyut ezber soru yoktur; ancak bağlam her zaman bir hikâye metni değildir. Cümle bağlamı veya tema kurgusu da bağlam sayılmaktadır.
- **Sonuç:** "Bağlam" şartı aranmalı ancak bunun türü (metin, cümle, yönerge teması) soru türüne göre esnek bırakılmalıdır.

### 3. "Her sorunun çok aşamalı veya alt maddeli olması" İddiası Yanlıştır
- **Gerçek Durum:**
  - MEBİ Soru 2 (Konu): Tek soru, alt madde yok.
  - MEBİ Soru 3 (Çıkarım): Tek soru, alt madde yok.
  - MEBİ Soru 4 (Tamamlama): Tek metin, alt madde yok.
  - MEBİ Soru 5 (Örtük anlam): Tek soru, alt madde yok.
  - Yalnızca Soru 1, Soru 6 (söz varlığı) ve Soru 9'da (yazım-noktalama) alt madde (`a.`, `b.`) kullanılmıştır.
- **Sonuç:** Alt madde yalnızca söz varlığı ve çoklu dil bilgisi tahlillerinde uygulanmalı; okuma anlama sorularında soru odağını dağıtmamak için tekil soru kökü korunmalıdır.

### 4. "Her soruda metin içi kanıt istenmesi" Şartı Aşırıdır
- **Gerçek Durum:** Metin konusunu bulurken (`T.O.7.5`) veya metin tamamlarken (`T.Y.7.18`) kanıt istenmez. Metin içi delil (`evidence-based reasoning`) yalnızca derin çıkarım (`T.O.7.8`) ve kelime anlamı tahmini (`T.O.7.4`) için gereklidir.
- **Sonuç:** Metin içi delil talebi yalnızca çıkarım ve tahlil kazanımlarına (`T.O.7.4`, `T.O.7.7`, `T.O.7.8`) özgülenmelidir.

---

## 7. Alternatif Cevaplar ve Öz Değerlendirme Analizi

MEBİ fasikülünün "Çözümler" bölümü, OYSS'nin öğrenci öz değerlendirme modülü için devrim niteliğinde pedagojik dersler barındırmaktadır:

```
                            MEBİ ALTERNATİF CEVAP MODELİ
┌─────────────────────────────────────────────────────────────────────────────────┐
│ SORU 2 ÇÖZÜMÜ:                                                                  │
│ "Metnin konusu, arıların doğadaki önemi ve bitkilerin çoğalmasındaki rolüdür." │
│                                                                                 │
│ VERİLEBİLECEK DİĞER ÖRNEK YANITLAR:                                             │
│ • Arıların doğadaki görevleri ve önemi.                                         │
│ • Arıların, bitkilerin çoğalmasına katkısı.                                     │
│ • Arıların doğadaki yaşam dengesi için önemi.                                   │
│ • Arıların azalmasının doğaya etkileri.                                         │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Temel Çıkarımlar ve OYSS İçin Model Önerisi
1. **Semantik Eşdeğerlik:** MEB, öğrencinin kalıp ezber cümle kurmasını değil, metnin ana fikrini kendi kelimeleriyle ifade etmesini tam doğru kabul eder.
2. **Sonuç ile Gerekçenin Ayrılması (Kısmi Doğruluk):**  
   MEBİ Soru 6'da (Forsa):
   - 1. Basamak: *Kelimenin anlamına dair tahminim* (Örn: Bitap = yorgun, halsiz).
   - 2. Basamak: *Beni bu tahmine götüren metin içi gerekçeler* (Örn: "kolları eski kuvvetini kaybetmiş" ifadesi).  
   Öğrenci anlamı doğru tahmin edip metinden gerekçe gösterememişse bu **kısmen doğru** bir cevaptır.
3. **OYSS Rubriklerine Uyarlama:**  
   Rubriklerde şu yapı zorunlu olmalıdır:
   - Ölçüt 1 (Teşhis / Tahmin): 7 Puan (Öğrenci doğru kavramı bulduysa).
   - Ölçüt 2 (Metin İçi Kanıt / Gerekçe): 8 Puan (Öğrenci metinden dayanak gösterdiyse).  
   Bu ayrım, öğrencinin öz değerlendirme ekranında *"Cevabım kısmen doğru"* seçeneğini bilinçli şekilde puanlamasını sağlar.

---

## 8. AI Soru Üretimi Açısından Boşluk Analizi (`aiGeneratorEngine.ts`)

Mevcut `src/utils/aiGeneratorEngine.ts` motoru ile MEBİ soru yazım profili arasındaki boşluklar ve somut çözüm tablosu:

| Boyut | Mevcut Kod / Yönerge Durumu | Önerilen İyileştirme | Beklenen Fayda | Risk / Dikkat Edilecek Nokta | Otomatik Test Edilebilir mi? | İnsan İncelemesi Gerekir mi? |
|---|---|---|---|---|:---:|:---:|
| **Alternatif Cevaplar** | AI yalnızca tek bir `answer` dizesi üretmektedir. | JSON şemasına `alternativeAnswers: string[]` alanı eklenmeli; prompta *"en az 2-3 alternatif doğru ifade üret"* talimatı verilmelidir. | Öğrenci öz değerlendirme yaparken kendi farklı ifadesinin de doğru olduğunu görür; öz güveni artar. | AI'ın birbiriyle çelişen veya hatalı alternatifler türetmesi riski. | **Evet** (Dizi uzunluğu ≥ 2 ve boş olmama kontrolü). | **Evet** (Pedagojik doğruluk kontrolü). |
| **Metin İçi Kanıt Şartı** | `T.O.7.8` çıktısı için promptta genel analitik soru istenir. | Çıkarım sorularında soru köküne *"en az iki ipucu ile delillendirerek"* veya *"metinden hareketle gerekçelendiriniz"* kalıbı zorunlu kılınmalıdır. | Sorular MEBİ derinliğine kavuşur; öğrenci metne dönüp kanıt aramaya zorlanır. | Her kazanımda (örn. konu sorusunda) gereksiz yere kanıt istenmesi soruyu bozar. | **Evet** (Regex ile yönergede "ipucu / gerekçe / delil" taraması). | Hayır |
| **Bilişsel Düzey Ayrımı** | `T.O.7.5` ile `T.O.7.8` promptta benzer vaka şablonlarıyla üretilmektedir. | `T.O.7.5` için doğrudan metinde geçen açık bilgi/konu; `T.O.7.8` için metinde açık yazılmayan örtük duygu/amaç talimatı ayrıştırılmalıdır. | Basit bilişsel süreç ile karmaşık bilişsel süreç tam ayrışır. | `T.O.7.5` sorularının aşırı basitleşip çoktan seçmeli seviyesine inmesi. | Kısmen (Kazanım kodu ile şablon eşleşmesi testi). | **Evet** |
| **Parçalı Rubrik Yapısı** | Rubrik kriterleri bazen teşhis ve gerekçeyi tek maddede birleştirmektedir. | Çıkarım ve söz varlığı sorularında rubriğin en az 2 bağımsız kritere (Kriter 1: Doğru tespit, Kriter 2: Metin içi gerekçe) bölünmesi kuralı getirilmelidir. | Öğrenci kısmen doğru yaptığında tereddüt etmeden parçalı puan verebilir. | Kriterlerin aşırı bölünerek 1-2 puanlık önemsiz parçalara ayrılması. | **Evet** (Rubrik eleman sayısı ≥ 2 ve puan toplamı kontrolü). | Hayır |
| **Metin Kaynağı (Grounding)** | AI metinleri sıfırdan hayal ederek kurgulamaktadır. | Metin gerektiren sorularda AI'ya MEB ders kitabı veri tabanından onaylı pasaj aktarılmalıdır. | Sıfır halüsinasyon, sıfır kaynak hatası, %100 MEB müfredat dili. | Pasajın soru formatına uzun gelmesi veya alıntının bağlamı koparması. | **Evet** (`textbookRef` varlığı ve metin uzunluk testi). | **Evet** |

---

## 9. Ders Kitabı Entegrasyonuyla İlişkisi

Ders kitapları ile MEBİ soru örnekleri OYSS mimarisinde iki farklı işlevi üstlenir:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ SÜTUN 1: MEB DERS KİTAPLARI                     SÜTUN 2: MEBİ ÖRNEKLERİ         │
│ (7_Turkce_1_Kitap.pdf & 2. Kitap)               (turkce-mebi-ornek-yazili1-1)   │
├─────────────────────────────────────────────────┼───────────────────────────────┤
│ • İçerik Omurgası (Content Grounding)           │ • Ölçme Metodolojisi (Design) │
│ • Otantik Okuma Parçaları (Jonathan, Bayrağımız)│ • Soru Kökü Sentaksı (Emir)   │
│ • Kelime Dağarcığı (1. Etkinlik sözlükleri)     │ • Şartlı Yönergeler (En az 2) │
│ • Yazar, Şair, Tema ve Sayfa Referansı          │ • Alternatif Kabul Edilebilir │
│ • Kültürel ve Edebi Güvenilirlik                │ • Analitik Rubrik Yapısı      │
└────────────────────────┬────────────────────────┴───────────────┬───────────────┘
                         │                                        │
                         └───────────────────┬────────────────────┘
                                             ▼
                        ┌──────────────────────────────────────────┐
                        │        OYSS NİTELİKLİ SINAV SORUSU       │
                        │ • Metin Kitaptan, Soru MEBİ Standardında │
                        └──────────────────────────────────────────┘
```

### Her Soru Ders Kitabı Metnine Dayanmalı mıdır? (İstisnalar)
Her sorunun kitap metnine dayanması pedagojik olarak doğru değildir:
1. **Yazım ve Noktalama (`T.Y.7.21`):** Ders kitabındaki metinler hatasız edebi metinlerdir. Yazım yanlışı bulma sorusu için bu metinler kullanılamaz; yapay veya amaca yönelik hatalı cümleler kurgulanmalıdır.
2. **Yazma Becerisi ve Taslak Planlama (`T.Y.7.3`):** Öğrencinin bağımsız kurgu yapması istendiğinden okuma parçası gerektirmez; tematik yönerge yeterlidir.
3. **Kısa Paragraf Tahlilleri (`T.O.7.15`):** Güncel bilimsel veya ekolojik metinler (küresel ısınma, yapay zekâ, kutup araştırmaları) ders kitabı dışındaki kısa güvenilir kaynaklardan da alınabilir.
4. **Zorunlu Olanlar:** `T.O.7.4` (Söz varlığı), `T.O.7.5` (Yüzey anlam), `T.O.7.8` (Örtük anlam) ve `T.O.7.14` (Metin yapısı) sorularında ders kitabı metinlerinin kullanılması en yüksek kalite güvencesidir.

---

## 10. Belirsizlikler, Sınırlılıklar ve İnsan Kontrolü Gerektiren Noktalar

1. **Öğrenci İfadelerinin Semantik Esnekliği:**  
   Yapay zekâ ne kadar alternatif cevap üretirse üretsin, bir öğrencinin doğru bir anlamı çok farklı bir mecazla veya yerel bir ifadeyle yazması durumunda bunu %100 kapsamak imkânsızdır. Bu nedenle OYSS arayüzünde öğrenciye *"Model cevaptaki ana fikirle senin cevabın uyuşuyorsa cevabını doğru kabul edebilirsin"* rehberliği gösterilmeye devam edilmelidir.
2. **Telif ve Yazar Hakları:**  
   MEB ders kitaplarındaki metinlerin eğitim amaçlı alıntılanması adil kullanım kapsamındadır; ancak sınav çıktısında yazar ve eser adının (`📚 MEB 7. Sınıf Türkçe 1. Kitap, s. 76 - Halide Edib Adıvar`) açıkça belirtilmesi hem etik hem de pedagojik bir zorunluluktur.
3. **İnsan Kontrolü (Öğretmen İncelemesi) Gerektiren Alanlar:**  
   AI tarafından üretilen açık uçlu soruların `T.O.7.8` örtük anlam derinliği ve rubrik puanlarının mantıksal dengesi canlıya alınmadan önce mutlaka insan gözüyle doğrulanmalıdır.

---

## 11. Önceliklendirilmiş Geliştirme Önerileri ve Sonraki Adımlar

### Öncelik 1: Pilot Başlamadan Önce Gerekli İyileştirmeler (P0)
1. **`ExamQuestion` Veri Modeline Alternatif Cevap Alanı Eklenmesi:**  
   `src/types/index.ts` içindeki `ExamQuestion` arayüzüne `alternativeAnswers?: string[];` alanının eklenmesi.
2. **MEB Soru Yazım Profili Doğrulayıcısı (`src/utils/mebiProfileValidator.ts`):**  
   4. bölümde tanımlanan 10 boyutlu matrisi kod seviyesinde denetleyen, soru kökünde emir kipi ve şart arayan yardımcı doğrulayıcının yazılması.
3. **Rubrik Kriterlerinde Teşhis ve Gerekçenin Ayrılması:**  
   Çıkarım ve tahmin sorularında rubriklerin en az iki parçalı (Tespit Puanı + Gerekçe Puanı) olarak yapılandırılması.

### Öncelik 2: Pilot Test Sonuçlarına Göre Yapılabilecek İyileştirmeler (P1)
1. **AI Motorunda (`aiGeneratorEngine.ts`) Alternatif Cevap Üretimi:**  
   Yapay zekâ promptunun her açık uçlu soru için en az 2-3 alternatif kabul edilebilir yanıt üretmeye zorlanması.
2. **Ders Kitabı Pasajlarının AI İle Entegrasyonu:**  
   Ayrıştırılan ders kitabı metinlerinin (`grade7Turkce.ts`) `T.O.7.4`, `T.O.7.5` ve `T.O.7.8` sorularına otomatik kaynak materyal olarak bağlanması.
3. **Etkileşimli Sınav Öz Değerlendirme Arayüzünde Alternatif Cevapların Gösterilmesi:**  
   Öğrenci soru çözümü sonrasında model cevabın altında *"Kabul Edilebilecek Diğer Yanıtlar"* akordeonunu açabilmeli.

### Öncelik 3: Diğer Sınıflar ve Derslere Yaygınlaştırma (P2)
1. **5, 6 ve 8. Sınıf MEBİ Fasiküllerinin İncelenmesi:**  
   Aynı metodolojinin Matematik, Fen Bilimleri ve diğer kademelere uygulanması.
2. **Dikey Bilişsel Zorluk Kalibrasyonu:**  
   5. sınıftan 8. sınıfa doğru soru köklerinin ve çıkarım beklentilerinin kademeli artışının doğrulanması.

---

**Sonuç ve Onay Çağrısı:**  
Bu rapor, MEB'in soru hazırlama felsefesi ile OYSS'nin mevcut yapısını kanıtlara dayalı olarak karşılaştırmış; güçlü yönleri tescilleyip gelişim alanlarını somutlaştırmıştır. Onayınız halinde, kod değişikliği yapılmaksızın belirlenen **Öncelik 1** adımları için uygulama planı devreye alınacaktır.
