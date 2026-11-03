# OYSS 7. Sınıf MEBİ Soru Yazım Profili ve Bütünleşik Entegrasyon Raporu

**Tarih:** 29 Ekim 2026  
**Durum:** Ön Analiz ve Profil Tanımlaması Tamamlandı (Uygulama Öncesi Kullanıcı Onayı Bekleniyor)  
**Kapsam:** 7. Sınıf MEBİ örnek sorularının proje veri yapılarındaki tespiti, soru yazım profili analizi, ölçülebilir değerlendirme matrisi, sınıf izolasyon kuralları ve MEB ders kitaplarıyla bütünleştirilmiş güncel teknik yol haritası.  
**Önemli Not:** Bu aşamada hiçbir kaynak kod, veri veya yapılandırma dosyası değiştirilmemiş; commit, push veya deploy yapılmamıştır.

---

## 1. 7. Sınıf MEBİ Örnek Sorularının Projedeki Yeri ve Veri Yapıları

Yapılan dosya ve veri taramasında, 7. sınıf MEBİ hazırlık sorularının geliştirme ortamı ve OYSS mimarisinde 4 ayrı katmanda yer aldığı tespit edilmiştir:

### A. Ham Kaynak Dosyaları (PDF & Arşiv)
- **Masaüstü Dizin:** `/Users/mesutduran/Desktop/mebi/` ve `/Users/mesutduran/Desktop/mebi.zip` (4.18 MB)
- **Resmî Belge Künyesi:** T.C. Millî Eğitim Bakanlığı Temel Eğitim Genel Müdürlüğü tarafından 2026-2027 eğitim öğretim yılı 1. dönem 1. yazılı sınavları öncesinde yayımlanan hazırlık fasikülleri.
- **Fasikül Dağılımı (Toplam 6 Ders, 66 Sayfa):**
  1. `turkce-mebi-ornek-yazili1-1.pdf` (864 KB, 9 sayfa, 10 açık uçlu soru + çözümler ve alternatif yanıtlar)
  2. `matematik- mebi-ornek-yazili1-1.pdf` (1.8 MB, 28 sayfa, rasyonel sayılar, adım analizi, öğrenci hata bulma)
  3. `fen-mebi-ornek-yazili1-1.pdf` (1.8 MB, 11 sayfa, uzay kirliliği ikilemi, deney düzenekleri, karşılaştırma)
  4. `sosyal-mebi-ornek-yazili1-1.pdf` (622 KB, 4 sayfa, iletişim çatışmaları, "Ben Dili" / "Sen Dili" dönüşümleri)
  5. `ingilizce-mebi-ornek-yazili1-1.pdf` (1.4 MB, 6 sayfa, kişilik sıfatları, spor dalları ve sıklık zarfları)
  6. `din-mebi-ornek-yazili1-1.pdf` (832 KB, 8 sayfa, melekler, ahiret aşamaları analizi)

### B. Proje İçi Veri Dosyaları (JSON Soru Bankaları)
- `meb_data/extracted_question_bank.json`:
  - MEBİ PDF'lerinden doğrudan ayıklanmış **33 adet TYMM kazanımına** ait ham soru nesneleri.
  - Türkçe özelinde: `T.O.7.4` (Ömer Seyfettin - Forsa metni: *bitap, iştiyak, teselli*), `T.O.7.5` (Arılar metni ve konusu), `T.O.7.7` (Demirci Hasan ve direniş kararı), `T.O.7.8` (Ece ve Mehmet kütüphane diyalogu / örtük anlam delillendirme), `T.O.7.21` (HÜRKUŞ yerli uçak metni) vb.
- `meb_data/complete_question_bank.json`:
  - `build_complete_bank.py` betiği ile MEBİ sorularının eksik kalan senaryo kazanımlarıyla (`T.O.7.14`, `T.O.7.15`, `T.Y.7.3` vb.) tamamlandığı 34 kazanımlık genişletilmiş soru havuzu.

### C. Canlı TypeScript Veri Dosyaları
- `src/data/infographics.ts`: MEBİ soru şemaları ve Forsa kelime tahlilleri (`bitap`: yorgun, `iştiyak`: özlem, `teselli`: avuntu).
- `src/data/studySheets.ts`: MEBİ soru formatına göre kurgulanmış 19 adet "Hap Bilgili Çalışma Kâğıdı".
- `src/data/outcomeStudyBank.ts`: MEBİ soru tiplerinden türetilmiş tuzaklar, kritik notlar ve model sorular.
- `src/data/sampleExams.ts`: 123 sınav ve 847 tekil sorudan oluşan ana sınav havuzu. MEBİ soruları burada kopyalanmamış; MEBİ'nin "Şerife Bacı" ve Millî Mücadele temalı soru kurguları ÖDSGM senaryolarına uygun olarak özgünleştirilerek kullanılmıştır.

### D. Üretim ve AI Motoru
- `src/utils/aiGeneratorEngine.ts`: `generateMEBIQuestions()` fonksiyonu, prompt seviyesinde MEBİ soru arketiplerini kural olarak yapay zekâya talimat vermektedir.

---

## 2. MEBİ Sorularının Analiz Düzeyi: Mevcut Durum ve Eksikler

### Yapılmış Olanlar
1. **Veri Çıkarımı:** MEBİ PDF'lerindeki sorular öncül ve metinleriyle JSON formatına aktarılmıştır.
2. **Genel Arketip Sınıflandırması:** Sorular 7 genel şablona (*Kurgusal Senaryo & Vaka İncelemesi, Öğrenci Tartışması & Yanılgı Tespiti, Durum Matrisi, Hata Tespiti & Adım Analizi, Dilemma / İkilem, Empati & Cümle Dönüştürme, Metin İçi Delillendirme*) ayrılmıştır.
3. **Puanlama ve Rubrik Yapısının Tespiti:** MEBİ'nin fasiküllerinde sayısal puan/rubrik bulunmadığı, bunun yerine *"Verilebilecek diğer örnek yanıtlar"* şeklinde esnek bir değerlendirme kullandığı belirlenmiştir.

### Yapılmamış Olanlar (Mevcut Eksikler)
1. **Yapısal ve Dilbilimsel Soru Yazım Profili Çıkarılmamıştır:** MEBİ sorularının kök cümle yapısı, kullanılan fiil kipleri, şartlı yönergeler, soru uzunlukları ve bağlam-soru bağımlılığı kural tabanlı bir ölçütler bütünü haline getirilmemiştir.
2. **Ölçülebilir Bir Karşılaştırma Matrisi Tanımlanmamıştır:** OYSS'deki mevcut 847 sorunun veya yapay zekâ ile üretilen soruların MEB soru yazım standardına ne oranda uyduğunu gösteren sayısal bir kalite skoru/matrisi bulunmamaktadır.
3. **Alternatif Cevap Esnekliğinin Rubriğe Yansıtılması Eksiktir:** OYSS'de rubrikler katı sayısal kriterlere (ör. 8 puan, 7 puan) bölünmüş ancak MEBİ'deki *"aynı anlama gelen farklı öğrenci ifadelerini kapsayan alternatif cevaplar"* yapay zekâ promptlarına ve değerlendirme ekranına tam olarak parametrik entegre edilmemiştir.

---

## 3. 7. Sınıf MEB Soru Yazım Profili Taslağı (Empirik Analiz)

`turkce-mebi-ornek-yazili1-1.pdf` (10 soru) ve diğer ders fasiküllerinin doğrudan incelenmesiyle çıkarılan profil özellikleri:

### A. Soru Kökü ve Yönerge Yapısı
- **Net ve Yönlendirici Emir Kipi:** Sorular asla ucu açık ya da muğlak bırakılmaz; daima `...yazınız`, `...açıklayınız`, `...tahmin ediniz`, `...delillendiriniz` fiilleriyle biter.
- **Şartlı ve Sınırlandırıcı Yönergeler:**
  - *"en az iki ipucu ile delillendirerek açıklayınız."* (Soru 5)
  - *"tek bir cümleyle yazınız."* (Soru 2)
  - *"sadece anlamı değil, sizi bu tahmine götüren metin içi gerekçeleri de yazınız."* (Soru 6)
- **Çok Aşamalı / Parçalı Yapı (`a.`, `b.` alt maddeleri):**
  - Soru doğrudan tek bir yanıt istemez; önce teşhis/tahmin, ardından metin içi gerekçe talep eder (Örn: a. Kelime tahmini, b. Metin içi dayanak cümlesi).

### B. Metin, Bağlam, Görsel ve Tablo Kullanımı
- **%100 Bağlama Bağımlılık:** Bağlamdan bağımsız, havada kalan hiçbir kural sorusu yoktur. İkileme kuralı veya noktalama işareti sorulurken bile mutlaka bağlamsal bir cümle veya paragraf verilir.
- **Kompakt ve Yoğun Metinler:** Paragraflar ortaokul öğrencisini yormayacak biçimde **70 ile 150 kelime** arasında tutulmuştur.
- **Tematik Derinlik:** Metinler tesadüfi değildir; Millî Savunma Sanayii (HÜRKUŞ), Ekoloji ve Doğa (Arılar ve yaşam dengesi), Kurtuluş Savaşı (Demirci Hasan, Şerife Bacı), Edebiyat Klasiği (Ömer Seyfettin - Forsa) ve Akran Psikolojisi/Empati (Kütüphanedeki Mehmet ve Ece) gibi pedagojik izlekler taşır.

### C. Ölçülen Dil Becerisi ve Öğrenme Çıktısı Dağılımı
MEBİ fasikülü 1. dönem 1. yazılı için tam bir beceri yelpazesini dengeli biçimde kapsar:
1. **Söz Varlığı ve Anlam Tahmini (`T.O.7.4`, `T.O.7.21`):** Bilinmeyen kelimenin bağlamdan çıkarılması ve dayanak gösterilmesi.
2. **Yüzey Anlam (`T.O.7.5`):** Metnin konusu ve doğrudan açık bilgiler.
3. **Basit Çıkarım (`T.O.7.7`):** Olay örgüsündeki bir eylemin ardındaki niyetin/kararın anlaşılması (Demirci Hasan'ın tarım aletleri yerine kılıç dövmesi).
4. **Derin Anlam ve Örtük İleti (`T.O.7.8`):** Karakterin duygusal durumu, göz temasından kaçınması gibi örtük ipuçlarının çözümlenmesi.
5. **Metin Yapısı ve İleti Çözümleme (`T.O.7.14`, `T.O.7.15`):** Karşılaştırma/zıtlık yapısının tespiti ve anahtar kelimelerin sebep-sonuç ilişkisiyle açıklanması.
6. **Yazma Becerisi ve Biçimsel Kurallar (`T.Y.7.3`, `T.Y.7.18`, `T.Y.7.21`):** Metin tamamlama, metin taslağı planlama, ikilemeler ve noktalama işaretlerinin işlevsel gerekçelendirilmesi.

### D. Yüzey Anlam, Çıkarım ve Yorumlama Seviyelerinin Ayrımı
- **Yüzey Anlam (Soru 2):** Cevap metinde açıkça yazılıdır. Öğrencinin metnin genel çerçevesini kavraması yeterlidir.
- **Çıkarım (Soru 3 ve Soru 5):** Cevap metinde birebir kelime olarak geçmez. Öğrenci "Demirci ocağı hararetle yaktı + köylüler kılıç aldı" öncüllerini zihninde birleştirip "Halk teslim olmayıp vatanı savunma kararı almıştır" çıkarımını üretir.
- **Yorumlama ve Değerlendirme (Soru 7 ve Soru 10):** Metnin yapısını (karşılaştırma) analiz eder, yazarın amacını kendi cümleleriyle yeniden ifade eder veya verilen temada kendi yazma taslağını inşa eder.

### E. Seçenekler ve Çeldiriciler
- MEBİ yazılıya hazırlık sorularının tamamı **Açık Uçlu (Yapılandırılmış Yazılı)** formattadır; çoktan seçmeli şık içermez.
- Klasik şık çeldiricisi yerine **"Kavram Yanılgısı ve Çeldirici İfadeler"** kullanılır. Örneğin ikilemelerin arasına kısa çizgi konması yanılgısı ya da Forsa hikâyesinde kelimenin sözlükteki ilk anlamı ile metindeki bağlamsal mecaz/yan anlamı arasındaki tuzaklar çeldirici rolü oynar.

### F. Cevap Anahtarı ve Açıklama Yapısı
- **"Verilebilecek Diğer Örnek Yanıtlar":** Bakanlık tek tip cevabı reddeder. Örneğin "Keşif" kelimesi için 3 farklı alternatif cümle; "Metnin konusu" için 4 farklı doğru ifade biçimi sunulmuştur.
- **Metin İçi Delil Şartı:** Model cevaplarda mutlaka metinden doğrudan alıntılanan ipuçları (*"kolları eski kuvvetini kaybetmiş", "heybetli vücudu âdeta erimiş"*) çözüme dayanak yapılır.

---

## 4. Ölçülebilir Değerlendirme Matrisi (OYSS - MEB Soru Uyumu Skoru)

| Boyut | Ağırlık | Ölçütler (Her Biri 1–5 Puan) | MEBİ Standardı |
|---|---|---|---|
| **1. Bağlam Bağımlılığı (Stimulus Quality)** | **20 Puan** | • Soru metin/bağlam olmadan çözülemez mi?<br>• Metin 70–150 kelime aralığında mı?<br>• Bağlam yapaylıktan uzak, tematik ve zengin mi?<br>• Bağlamsız ezber kural sorusu yok mu? | Tam bağımlı, tematik ve gerçekçi bağlam |
| **2. Yönerge ve Kök Sentaksı** | **20 Puan** | • Net emir kipi ile mi bitiyor (`...yazınız`)?<br>• Şartlı kısıt içeriyor mu (`en az iki ipucu ile`)?<br>• Çok aşamalı (`a.`, `b.`) parçalı kök var mı?<br>• Sorunun ne istediği açık ve tereddütsüz mü? | Şartlı, aşamalı ve net yönergeler |
| **3. Bilişsel Seviye Ayrımı** | **20 Puan** | • Yüzey anlam (`T.O.7.5`) ile örtük anlam (`T.O.7.8`) net ayrılmış mı?<br>• Çıkarım sorusunda metin içi delil isteniyor mu?<br>• Düz ezber/tanım ("... nedir?") sorusu sıfır mı?<br>• Öğrenciyi analitik düşünmeye sevk ediyor mu? | Açık ve örtük anlam kesinlikle ayrışmış |
| **4. Cevap Anahtarı ve Esneklik** | **15 Puan** | • Alternatif kabul edilebilir yanıtlar tanımlı mı?<br>• Tek bir kalıp cümleye bağımlılık kırılmış mı?<br>• Metin içi gerekçeler model cevapta var mı? | "Verilebilecek diğer yanıtlar" esnekliği |
| **5. Rubrik ve Öz Değerlendirme Uyumu** | **15 Puan** | • Rubrik kriterleri bağımsız ve parçalı mı?<br>• Öğrencinin kendi kendine işaretlemesine uygun mu?<br>• Puan dağılımı gerekçe ve tespite eşit bölünmüş mü? | Öz değerlendirmeye tam elverişli rubrik |
| **6. Dil ve Yaş Düzeyi Uygunluğu** | **10 Puan** | • 7. sınıf (12-13 yaş) bilişsel seviyesine uygun mu?<br>• TDK ve MEB TYMM imla kurallarına tam uyumlu mu? | Yaşa uygun, duru ve pedagojik Türkçe |
| **TOPLAM** | **100 Puan** | **≥ 85 Puan: MEBİ Standartlarında Mükemmel Soru**<br>**70–84 Puan: Kabul Edilebilir Düzey**<br>**< 70 Puan: Revize Edilmesi Zorunlu Soru** | |

---

## 5. Diğer Sınıfların (5, 6 ve 8. Sınıf) MEBİ Sorularından Yararlanma ve İzolasyon Kuralları

### A. Bu Profili Geliştirmede Kullanım Alanı
1. **Dikey Bilişsel İlerleme Çizgisi (Vertical Progression):**
   - 5. sınıfta yönergeler daha somut ve yönlendiricidir (Örn: "Metinde geçen hayvanların isimlerini yazınız").
   - 7. sınıfta analitik delillendirme başlar (Örn: "Karakterin değişimini en az iki ipucu ile delillendiriniz").
   - 8. sınıfta LGS formatında çoklu çıkarım ve sentez ağırlık kazanır.
   - Bu karşılaştırma, 7. sınıf sorularının ne 5. sınıf kadar basit ne de 8. sınıf kadar ağır olmasını sağlayacak bir "zorluk ve dil kalibratörü" görevi görür.
2. **Pedagojik Arketip Havuzunun Zenginleştirilmesi:**
   - 5, 6 ve 8. sınıf MEBİ fasiküllerinde yer alan farklı diyalog ve tablo kurguları taranarak genel soru kalıpları kütüphanesi zenginleştirilebilir.

### B. 7. Sınıf Soru Havuzuna Karışmayı Önleyecek Katı İzolasyon Kuralları
1. **Dizin ve Dosya İzolasyonu (Filesystem Separation):**
   - MEBİ ve ders kitabı verileri tek bir monolitik dosyada asla birleştirilmeyecektir.
   - Dizin yapısı katı şekilde ayrılacaktır: `src/data/mebi/grade7/`, `src/data/textbooks/grade7/`. Diğer sınıflar geldiklerinde kendi bağımsız klasörlerinde (`grade5/`, `grade6/`, `grade8/`) tutulacaktır.
2. **Kazanım Kodu Prefiks Doğrulaması (Outcome Code Guard):**
   - 7. sınıf Türkçe kazanımları istisnasız `T.O.7.*` veya `T.Y.7.*` ile başlar.
   - `T.O.5.*`, `T.O.6.*` veya `T.8.*` / `T.O.8.*` kodlu herhangi bir soru veya metin nesnesi, 7. sınıf veri yükleyicisine ulaştığında derleme zamanında reddedilecektir.
3. **Statik Tip Güvencesi (TypeScript Literal Guard):**
   - `grade: 7` katı literal tipi zorunlu tutulacak, genel `number` kabul edilmeyecektir.
4. **Müfredat ve Konu Kara Listesi Filtresi (Curriculum Blacklist Filter):**
   - 8. sınıf LGS konuları (fiilimsiler, cümlenin ögeleri, mantık-muhakeme tabloları) ile 5. sınıf konuları için bir terim filtresi tanımlanacak; 7. sınıf soru üretiminde veya havuzunda bu terimler tespit edilirse uyarı üretilecektir.
5. **Otomatik Çapraz Bulaşma Testi (Cross-Contamination Test Suite):**
   - `tests/gradeIsolation.test.ts` test paketi yazılarak tüm 7. sınıf havuzunun 5, 6 ve 8. sınıf verilerinden %100 izole olduğu CI testlerinde otomatik olarak doğrulanacaktır.

---

## 6. Güncellenmiş Bütünleşik Yol Haritası: İki Sütunlu Mimari (Kitaplar + MEBİ)

```
                            OYSS BÜTÜNLEŞİK SORU MİMARİSİ
┌───────────────────────────────────────────────┐  ┌───────────────────────────────────────────────┐
│     SÜTUN 1: MEB DERS KİTAPLARI (İÇERİK)     │  │      SÜTUN 2: MEBİ ÖRNEKLERİ (METODOLOJİ)     │
│   (7_Turkce_1_Kitap.pdf & 7_Turkce_2_Kitap)   │  │        (turkce-mebi-ornek-yazili1-1.pdf)      │
├───────────────────────────────────────────────┤  ├───────────────────────────────────────────────┤
│ • MEB Onaylı Otantik Okuma Parçaları          │  │ • Soru Kökü ve Yönerge Sentaksı               │
│ • Tematik Metinler (Jonathan, Bayrağımız vb.) │  │ • Açık vs. Örtük Anlam Delillendirme Şablonu  │
│ • Kelime ve Kavram Dağarcığı (1. Etkinlikler) │  │ • İki Aşamalı Kökler (a. Tespit, b. Gerekçe)   │
│ • Kitap Künyesi, Tema ve Sayfa Numaraları     │  │ • "Alternatif Kabul Edilebilir Yanıtlar"      │
│ • Soru Başına Kitap Kaynak Rozeti             │  │ • Öz Değerlendirmeye Uygun Analitik Rubrik    │
└───────────────────────┬───────────────────────┘  └───────────────────────┬───────────────────────┘
                        │                                                  │
                        └─────────────────────────┬────────────────────────┘
                                                  ▼
                         ┌──────────────────────────────────────────────────┐
                         │       OYSS PEDAGOJİK VE DOĞRULANMIŞ SORU         │
                         │  • Sıfır Kaynak Metin Hatası (Kitap Metni Var)   │
                         │  • Sıfır Halüsinasyon (MEB Onaylı Pasaj)         │
                         │  • %100 MEBİ Standartlarında Açık Uçlu Soru Kökü │
                         │  • Esnek Model Cevap ve Analitik Rubrik          │
                         └──────────────────────────────────────────────────┘
```

---

## 7. Önerilen Güncel Uygulama Sırası

1. **Aşama 1: MEB Soru Yazım Profili ve Doğrulayıcısının Oluşturulması (`src/utils/mebiProfileValidator.ts`)**
   - 100 puanlık değerlendirme matrisini ve soru kökü şablonlarını içeren doğrulayıcı kodun yazılması.
2. **Aşama 2: 7. Sınıf Türkçe Kitap Pasajlarının Ayrıştırılması (`scripts/extractTextbookPassages.py`)**
   - `7_Turkce_1_Kitap.pdf` içindeki Tema 1 ve Tema 2 metinlerinin (ör. *Martı Jonathan Livingston*, *Bayrağımızın Altında*, *Mustafa Kemal'in Kağnısı*) temiz metin ve söz varlığı olarak JSON/TS veri modeline aktarılması.
3. **Aşama 3: Veri Modeli ve Kayıt Defteri Entegrasyonu (`src/data/textbooks/grade7Turkce.ts`)**
   - `TextbookPassage` ve `TextbookReference` veri tiplerinin tanımlanması; `ExamQuestion` modeline `textbookRef` rozet desteğinin eklenmesi.
4. **Aşama 4: AI Motorunun İki Sütunlu Mimariye Göre Güncellenmesi (`src/utils/aiGeneratorEngine.ts`)**
   - Yapay zekâ promptunun, kitap pasajlarını kaynak metin alacak ve MEBİ soru kökü şablonlarına göre (özellikle `T.O.7.5` açık anlam ve `T.O.7.8` örtük delillendirme) soru ve alternatif cevap üretecek şekilde revize edilmesi.
5. **Aşama 5: Arayüz ve Görünüm Entegrasyonu**
   - Sınav kâğıdı, etkileşimli sınav ve yazdırma ekranlarında MEB ders kitabı kaynak rozetinin ve MEBİ alternatif model cevaplarının sunulması.
6. **Aşama 6: Birim Testler, Kalite Matrisi Denetimi ve Derleme**
   - `tests/mebiProfileValidation.test.ts`, `tests/textbookGrounding.test.ts` ve sınıf izolasyon testlerinin koşulması; `tsc` ve `build` kontrollerinin tamamlanması.
