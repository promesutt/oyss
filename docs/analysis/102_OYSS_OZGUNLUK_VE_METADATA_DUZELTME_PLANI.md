# OYSS Rehberi | 102. Özgünlük ve Kaynak Metadata Düzeltme Planı
**Rapor Numarası:** 102  
**Tarih:** 03.11.2026  
**Denetim Türü:** Kategori C Karşılaştırmalı Son Değerlendirmesi ve Kaynak Metadata Düzeltme Mimarisi (Salt Okunur İnceleme)  
**İncelenen Dosyalar:**
- `src/data/sampleExams.ts`
- `src/data/fallbackPools.ts`
- `src/utils/aiGeneratorEngine.ts`
- `src/types/index.ts`
- `src/components/ExamPaperView.tsx`
- `src/components/InteractivePracticeView.tsx`
- Resmî MEB/MEBİ Örnek Yazılı Kitapçıkları (5., 6. ve 7. Sınıf - 18 PDF Belgesi)

---

## 1. Kategori C'deki 23 Sorunun Son Karşılaştırmalı Özgünlük Değerlendirmesi

101 numaralı raporda Kategori C (Anlamlı Uyarlanmış) olarak listelenen 23 soru, MEB kaynak kitapçıklarındaki orijinal metin ve görsellerle yan yana konarak; **Bağlam**, **Metin**, **Veri**, **Görsel**, **Soru Görevi** ve **Çözüm Yaklaşımı** boyutlarında satır satır incelenmiştir.

### 1.1. SAMPLE_EXAMS Kapsamındaki 13 Soru

#### 1. `exam_5_matematik_1_1_senaryo_2_q1`
- **Kazanım:** `MAT.5.3.1` (Temel geometrik çizimler: doğru parçası, ışın)
- **MEB Kaynağı:** `5_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_MATEMATIK.pdf` (s. 13, Soru 1)
- **MEB Soru Metni & Görseli:** Kareli kâğıt üzerinde çizilmiş [AB] doğru parçası ve C noktasından geçen bir ışın çizimi verilmiş; sembolik gösterimleri istenmiştir.
- **OYSS Soru Metni & Görseli:** Düzlemde K ve L noktaları tanımlanmış; "a) K noktasından başlayıp L noktasından sonsuza uzanan ışını sembolle gösteriniz. b) K ve L noktalarıyla sınırlı doğru parçasını sembolle gösteriniz." (Görsel: Yok).
- **Boyut Bazlı Değişiklikler:**
  - *Bağlam:* Kareli zemin koordinat çiziminden soyut düzlem sembolizmine geçilmiştir.
  - *Metin:* MEB yönergesi yerine iki şıklı bağımsız soru kökü yazılmıştır.
  - *Veri:* Harfler K ve L olarak değiştirilmiştir.
  - *Görsel:* MEB'in raster kareli zemin çizimi tamamen kaldırılmıştır.
  - *Soru Görevi:* Çizilmiş şekli okumaktan zihinsel sembolik yapılandırmaya geçilmiştir.
- **Nihai Karar:** **Kategori C (Anlamlı Uyarlanmış)** olarak tescil edilir. MEB'in doğru parçası ve ışın sembolik gösterim ikilisi şablon olarak alınmış, görsel bağımlılık kaldırılarak sembolik notasyona dönüştürülmüştür. Yüzeysel bir isim/harf değişikliği (Kategori B) değildir; çizim ortadan kaldırılarak açık uçlu sembolik yazım formatına adapte edilmiştir.

#### 2. `exam_5_fen_bilimleri_1_1_senaryo_1_q1`
- **Kazanım:** `FB.5.1.2` (Ay'ın dönme ve dolanma hareketleri)
- **MEB Kaynağı:** `5_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_FEN_BILIMLERI.pdf` (s. 1, Soru 2)
- **MEB Soru Metni:** "Ay’ın kendi ekseni etrafında dönme süresi ile Dünya etrafında dolanma süresini gösteren tabloyu doldurunuz." (A ve B boşlukları).
- **OYSS Soru Metni:** "Dünya'dan gökyüzüne bakan bir insan hangi tarihte bakarsa baksın Ay'ın hep aynı yüzey şekillerini (aynı yüzünü) görür. Dünya'dan bakıldığında Ay'ın hep aynı yüzünün görülmesinin bilimsel gerekçesini Ay'ın dönme ve dolanma süreleri bakımından açıklayınız."
- **Boyut Bazlı Değişiklikler:**
  - *Bağlam:* Tablo doldurma ezberinden "hep aynı yüzün görülmesi" gözlemsel doğa olayına geçilmiştir.
  - *Metin:* Sıfırdan özgün bir gökyüzü gözlem paragrafı yazılmıştır.
  - *Veri:* Tablo hücreleri yerine kavramsal süre eşitliği (~27.3 gün) sorulmuştur.
  - *Görsel:* MEB tablosu kaldırılmıştır.
  - *Soru Görevi:* Sayısal periyot doldurmaktan bilimsel neden-sonuç gerekçelendirmesine yükseltilmiştir.
- **Nihai Karar:** **Kategori D (Bağımsız Özgün Soru)** olarak yeniden sınıflandırılmalıdır. MEB'in sorusu basit bir tablo tamamlama sorusudur; OYSS'nin sorusu ise aynı kazanımı ölçen bağımsız bir açık uçlu muhakeme sorusudur. MEB sorusundan uyarlanan bir şablon bulunmamaktadır.

#### 3. `exam_6_fen_bilimleri_1_1_senaryo_2_q1`
- **Kazanım:** `FB.6.1.1` (Gezegenleri sınıflandırma)
- **MEB Kaynağı:** `6_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_FEN_BILIMLERI.pdf` (s. 11, Soru 1)
- **MEB Soru Metni:** 8 gezegenin Güneş'e mesafeleri ve kilometre cinsinden çaplarını gösteren büyük sayısal veri tablosu verilerek iç/dış gezegenler sorulmuştur.
- **OYSS Soru Metni:** "Güneş sistemindeki gezegenler hacimsel olarak çok farklı büyüklüktedir. Güneş sisteminin en büyük gezegeni ile en küçük gezegeninin adını yazınız."
- **Boyut Bazlı Değişiklikler:**
  - *Bağlam:* Veri tablosu inceleme görevinden uç ölçek zıtlıkları (Jüpiter vs Merkür) kavramına geçilmiştir.
  - *Metin:* MEB metninden tamamen bağımsızdır.
  - *Veri:* Sayısal kilometreler yerine niteliksel karşılaştırma yapılmıştır.
  - *Görsel:* Tablo kaldırılmıştır.
- **Nihai Karar:** **Kategori D (Bağımsız Özgün Soru)**. MEB tablosuyla bir şablon bağı kalmamış, müfredatın temel kazanımı bağımsız açık uçlu soruya dönüştürülmüştür.

#### 4. `exam_6_fen_bilimleri_1_1_senaryo_3_q2`
- **Kazanım:** `FB.6.1.1` (Asteroit kuşağı)
- **MEB Kaynağı:** `6_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_FEN_BILIMLERI.pdf` (s. 1, Soru 3)
- **MEB Soru Metni:** Güneş sistemi yörüngeleri şematize edilmiş ve iç/dış gezegen sınırı sorulmuştur.
- **OYSS Soru Metni:** "Güneş sisteminde kaya ve metal parçalarından oluşan milyonlarca asteroitin dolandığı devasa bir kuşak vardır. Asteroit Kuşağı hangi iki gezegenin yörüngeleri arasında yer almaktadır? Yazınız."
- **Nihai Karar:** **Kategori D (Bağımsız Özgün Soru)**. Şematik çizimden bağımsız olgusal bir astronomi sorusudur.

#### 5. `exam_6_fen_bilimleri_1_1_senaryo_3_q3`
- **Kazanım:** `FB.6.1.3` (Güneş ve Ay tutulması karşılaştırma)
- **MEB Kaynağı:** `6_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_FEN_BILIMLERI.pdf` (s. 4, Soru 2)
- **MEB Soru Metni:** Güneş ve Ay tutulmalarında Dünya, Güneş ve Ay'ın geometrik dizilimlerinin çizilmesi.
- **OYSS Soru Metni:** "Güneş ve Ay tutulmaları doğanın iki etkileyici ışık-gölge olayıdır. Güneş tutulması ile Ay tutulmasını gözlemlenebilen alanın genişliği (dar bir bölge mi, gece olan tüm yarım küre mi) bakımından karşılaştırınız."
- **Boyut Bazlı Değişiklikler:** Çizim şablonundan alan büyüklüğü karşılaştırmasına geçilmiştir.
- **Nihai Karar:** **Kategori C (Anlamlı Uyarlanmış)**. MEB'in tutulma karşılaştırma pedagojik yaklaşımı korunmuş, çizim görevi gözlem alanı analitiğine dönüştürülmüştür.

#### 6. `exam_6_fen_bilimleri_1_1_senaryo_5_q3`
- **Kazanım:** `FB.6.1.3` (Tutulmalar ve ışığın doğrusal yayılması)
- **MEB Kaynağı:** `6_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_FEN_BILIMLERI.pdf` (s. 4, Soru 3)
- **MEB Soru Metni:** Ay ve Güneş tutulmalarında gölge oluşumu şeması.
- **OYSS Soru Metni:** "Güneş ve Ay tutulmaları ışığın temel bir fiziksel özelliği sayesinde gerçekleşir. Her iki tutulma olayının da gerçekleşmesi, ışığın hangi temel yayılma özelliğini kesin bir şekilde kanıtlar?"
- **Nihai Karar:** **Kategori C (Anlamlı Uyarlanmış)**. Doğa olayından optik yasasına tümevarım pedagojik modeli uyarlanmıştır.

#### 7. `exam_6_din_kulturu_1_1_senaryo_2_q6`
- **Kazanım:** `DKAB.6.1.5` (Felak suresi)
- **MEB Kaynağı:** `6_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_DKAB.pdf` (s. 5, Soru 4)
- **MEB Soru Metni:** Felak suresinin 1-5. ayet mealleri verilerek surenin ana mesajı sorulmuştur.
- **OYSS Soru Metni:** "Ayet Meali: 'Karanlığı çöktüğü zaman gecenin şerrinden, düğümlere üfleyen büyücülerin şerrinden...' (Felak suresi, 3-4. ayetler). Felak suresindeki bu ayetlerde Müslümanlara hangi tehlikeler karşısında dikkatli ve uyanık olmaları tavsiye edilmektedir?"
- **Nihai Karar:** **Kategori C (Anlamlı Uyarlanmış)**. MEB meal tahlili arketipi korunmuş; tüm sure yerine 3-4. ayetteki somut kötülük türleri analitiğine odaklanılmıştır.

#### 8. `exam_7_turkce_1_1_senaryo_1_q1`
- **Kazanım:** `T.O.7.5` (Bağlamdan kelime anlamı çıkarma)
- **MEB Kaynağı:** `mebi/turkce-mebi-ornek-yazili1-1.pdf` (s. 2, Soru 4)
- **MEB Soru Metni:** Şerife Bacı'nın kağnı yolculuğu anlatılmış; "fedakârlık, sarsılmaz irade" kelimeleriyle metin tamamlama sorulmuştur.
- **OYSS Soru Metni:** Kastamonu İnebolu sahilinden Ilgaz Dağları'na uzanan kağnı yolculuğu özgün olarak kurgulanmış; altı çizili "mefkûre" kelimesi ve "vatan yetim kalamaz" söz öbeğinin bağlamsal anlamı sorulmuştur.
- **Nihai Karar:** **Kategori C (Anlamlı Uyarlanmış)**. MEB'in Millî Mücadele Şerife Bacı teması korunmuş; ancak metin baştan yazılmış, ölçülen kelimeler ve anlamsal tahlil düzeyi tamamen değiştirilmiştir.

#### 9. `exam_7_turkce_1_1_senaryo_1_q5`
- **Kazanım:** `T.Y.7.13` (Metin taslağı oluşturma)
- **MEB Kaynağı:** `mebi/turkce-mebi-ornek-yazili1-1.pdf` (s. 5, Soru 8)
- **MEB Soru Metni:** "Yardımlaşma" konulu bilgilendirici metin için giriş, gelişme ve sonuç taslağı hazırlama.
- **OYSS Soru Metni:** "Bir milletin en büyük gücü: Birlik ve Beraberlik" konulu bilgilendirici metin için giriş, gelişme ve sonuç paragraflarında hangi ana fikirlerin yer alacağını planlama.
- **Nihai Karar:** **Kategori C (Anlamlı Uyarlanmış)**. MEB'in kompozisyon taslak şablonu farklı bir toplumsal değerle uyarlanmıştır.

#### 10. `exam_7_turkce_1_1_senaryo_2_q3`
- **Kazanım:** `T.Y.7.13` (Metin yapısını çözümleme)
- **MEB Kaynağı:** `mebi/turkce-mebi-ornek-yazili1-1.pdf` (s. 5, Soru 10)
- **MEB Soru Metni:** Doğa sevgisi deneme taslağında gelişme bölümünü tamamlama.
- **OYSS Soru Metni:** 1. sorudaki Ahilik ve "Pabuç Dama Atılmak" metninin giriş, gelişme ve sonuç bölümlerindeki temel bilgileri tespit ederek metnin yapısını çözümleme.
- **Nihai Karar:** **Kategori C (Anlamlı Uyarlanmış)**. MEB'deki "giriş, gelişme ve sonuç bölümlerinde..." kalıbı standart bir Türkçe yönergesidir; metin ve tahlil görevi (Ahilik tarihi) tamamen OYSS'ye aittir.

#### 11. `exam_7_matematik_1_1_senaryo_1_q4`
- **Kazanım:** `MAT.7.1.3` (Negatif rasyonel sayı sıralama)
- **MEB Kaynağı:** `mebi/matematik- mebi-ornek-yazili1-1.pdf` (s. 7, Soru 10 ve s. 22 Çözüm)
- **MEB Soru Metni:** Efe'nin negatif rasyonel sayıları ($-2/3, -5/6, 1/2, -7/3$) sıralarken 3. adımda yaptığı payda eşitleme hatasını bulma.
- **OYSS Soru Metni:** Mert ile Ece'nin $-3/4$ ve $-5/6$ rasyonel sayılarını karşılaştırırken yürüttükleri bilimsel argümantasyon tartışması. "Kimin argümanı doğrudur? Sayı doğrusu üzerindeki konumlarını ve sıfıra olan mesafelerini gerekçe göstererek açıklayınız."
- **OYSS Görseli:** 12 alt bölmeli, dinamik koordinatlı SVG Sayı Doğrusu (`sourceOrigin: "oyss_svg"`).
- **Boyut Bazlı Değişiklikler:**
  - *Bağlam:* Bireysel işlem adımı hatası arama yerine iki öğrencinin akran tartışması ve argümantasyonu kurgulanmıştır.
  - *Metin:* Diyalog formatında baştan yazılmıştır.
  - *Veri:* Sayılar $-3/4$ ve $-5/6$ olarak değiştirilmiştir.
  - *Görsel:* MEB'de görsel yokken OYSS'de interaktif dinamik SVG sayı doğrusu üretilmiştir.
  - *Soru Görevi:* Hata adımı tespitinden argüman savunması ve sayı doğrusu modellemesine dönüştürülmüştür.
- **Nihai Karar:** **Kategori C (Anlamlı Uyarlanmış)**. Kategori C'nin en güçlü örneğidir.

#### 12. `exam_7_matematik_1_1_senaryo_1_q5`
- **Kazanım:** `MAT.7.1.3` (Yarıma ve bütüne yakınlık stratejisi)
- **MEB Kaynağı:** `mebi/matematik- mebi-ornek-yazili1-1.pdf` (s. 7, Soru 4)
- **MEB Soru Metni:** $3/7, 5/8, 11/12$ kesirlerini yarıma ve bütüne yakınlıkla payda eşitlemeden sıralama.
- **OYSS Soru Metni:** $A = 7/15, B = 9/10, C = 4/7$ rasyonel sayılarını payda eşitlemeden yarıma ve bütüne yakınlık stratejisiyle sıralama ve mantığını açıklama.
- **Nihai Karar:** **Kategori C (Anlamlı Uyarlanmış)**. MEB'in "payda eşitlemeden referans stratejiyle sıralama" pedagojik ölçme modeli korunmuş; tüm kesirler ($7/15$ yarım altı, $4/7$ yarım üstü, $9/10$ bütüne yakın) özgün sayısal ilişkilerle yeniden kurulmuştur.

#### 13. `exam_7_matematik_1_1_senaryo_4_q5`
- **Kazanım:** `MAT.7.1.3` (Payları eşit pozitif rasyonel sayıları sıralama)
- **MEB Kaynağı:** `mebi/matematik- mebi-ornek-yazili1-1.pdf` (s. 7, Soru 5)
- **MEB Soru Metni:** $5/7, 5/9, 5/6$ kesirlerini sıralama.
- **OYSS Soru Metni:** $K = 12/17, L = 12/19, M = 12/13$ kesirlerini kuralı yazarak büyükten küçüğe sıralama.
- **Nihai Karar:** **Kategori C (Anlamlı Uyarlanmış)**. Kural gerekçelendirme adımı eklenmiş ve sayılar değiştirilmiştir.

---

### 1.2. fallbackPools Kapsamındaki 10 Soru

#### 14. `fallback_fen_bilimleri_7_FB.7.1.1_1`
- **Kazanım:** `FB.7.1.1` (Gözlemevi yeri seçimi)
- **MEB Kaynağı:** `mebi/fen-mebi-ornek-yazili1-1.pdf` (s. 1-2)
- **MEB Soru Metni:** TUA Mars projesi ve uzay kirliliği. (Kitapçıkta gözlemevi yeri sorusu doğrudan yoktur).
- **OYSS Soru Metni:** Doğu Anadolu Gözlemevi (Palandöken, Çamlıca, Bakırlıtepe) ışık kirliliği ve bulutluluk durumunun VAR/YOK matrisiyle analizi.
- **Nihai Karar:** **Kategori D (Bağımsız Özgün Soru)** olarak revize edilmelidir. MEB kitapçığında eşleşen bir soru dahi yoktur; soru tamamen OYSS'nin özgün vaka matrisidir.

#### 15. `fallback_fen_bilimleri_7_FB.7.1.1_2`
- **Kazanım:** `FB.7.1.1` (Teleskoplar ve atmosfer)
- **MEB Kaynağı:** `mebi/fen-mebi-ornek-yazili1-1.pdf` (s. 1-2)
- **OYSS Soru Metni:** Kerem ve Alper'in teleskopların neden atmosfer dışına gönderildiği tartışması.
- **Nihai Karar:** **Kategori D (Bağımsız Özgün Soru)** olarak revize edilmelidir. MEB'deki Mars projesinden bağımsız özgün bir akran diyaloğudur.

#### 16. `fallback_fen_bilimleri_7_FB.7.1.1_11`
- **Kazanım:** `FB.7.1.1` (Türksat ve 36.000 km yörünge)
- **OYSS Soru Metni:** Türksat uydularının 36.000 km yer-sabit yörünge mekaniği ve kapsama gerekçesi.
- **Nihai Karar:** **Kategori D (Bağımsız Özgün Soru)**. MEB kitapçığında böyle bir soru bulunmamaktadır.

#### 17. `fallback_fen_bilimleri_7_FB.7.1.1_12`
- **Kazanım:** `FB.7.1.1` (Alper Gezeravcı ISS deneyleri)
- **OYSS Soru Metni:** Alper Gezeravcı'nın mikroyerçekimi deneyleri.
- **Nihai Karar:** **Kategori D (Bağımsız Özgün Soru)**. Güncel millî uzay misyonu üzerine yazılmış tamamen özgün bir hazırlık sorusudur.

#### 18. `fallback_matematik_7_MAT.7.1.3_25`
- **Kazanım:** `MAT.7.1.3` (Negatif rasyonel sıralama sıcaklık modeli)
- **MEB Kaynağı:** `mebi/matematik- mebi-ornek-yazili1-1.pdf` (s. 7, S10)
- **OYSS Soru Metni:** Mars ve Neptün gezegenlerinin ortalama yüzey sıcaklıklarının negatif kesirlerle ($-rac{125}{2}\ ^\circ	ext{C}$ vs $-rac{214}{2}\ ^\circ	ext{C}$) modellenerek karşılaştırılması.
- **Nihai Karar:** **Kategori C (Anlamlı Uyarlanmış)**. Negatif rasyonel sayı sıralama arketipi bilimsel sıcaklık modellemesine başarıyla uyarlanmıştır.

#### 19. `fallback_matematik_7_MAT.7.1.3_26`
- **Kazanım:** `MAT.7.1.3` (Yarıma/bütüne yakınlık)
- **MEB Kaynağı:** `mebi/matematik- mebi-ornek-yazili1-1.pdf` (s. 7, S4)
- **OYSS Soru Metni:** $A = 7/15, B = 9/10, C = 4/7$ sıralaması.
- **Nihai Karar:** **Kategori C (Anlamlı Uyarlanmış)**. Strateji şablonu uyarlamasıdır.

#### 20. `fallback_matematik_7_MAT.7.1.3_33`
- **Kazanım:** `MAT.7.1.3` (Sayı doğrusu sıralama)
- **MEB Kaynağı:** `mebi/matematik- mebi-ornek-yazili1-1.pdf` (s. 12, S2)
- **OYSS Soru Metni:** Okul turnuvasında takımların averaj değerlerinin ($-3, +2, -7, 0$) sayı doğrusu mantığıyla sıralanması.
- **Nihai Karar:** **Kategori C (Anlamlı Uyarlanmış)**. Sayı doğrusu modeli spor turnuvası averaj problemine uyarlanmıştır.

#### 21. `fallback_matematik_7_MAT.7.1.3_34`
- **Kazanım:** `MAT.7.1.3` (Negatif kesir sıralama akran tartışması)
- **MEB Kaynağı:** `mebi/matematik- mebi-ornek-yazili1-1.pdf` (s. 7, S10)
- **OYSS Soru Metni:** $-2/3, -5/6, -7/12$ kesirlerini sıralayan iki öğrenciden hangisinin haklı olduğunun tartışılması.
- **Nihai Karar:** **Kategori C (Anlamlı Uyarlanmış)**. Efe'nin tekil hatası yerine sınıf içi akran tartışması modeli uyarlanmıştır.

#### 22. `fallback_sosyal_bilgiler_7_SB.7.1.2_67`
- **Kazanım:** `SB.7.1.2` (Özel gereksinimli bireyler ve fırsat eşitliği)
- **MEB Kaynağı:** `mebi/sosyal-mebi-ornek-yazili1-1.pdf` (s. 1, Soru 3)
- **MEB Soru Metni:** "Mahallenizdeki oyun parklarının özel gereksinimli çocukların ihtiyaçlarına uygun şekilde düzenlenmesi konusunda kamuoyu oluşturmak için bir slogan yazınız."
- **OYSS Soru Metni:** Doğuştan engelli millî paralimpik sporcuların dünya ve olimpiyat şampiyonlukları üzerinden fırsat eşitliği sağlandığında nelerin değişeceğinin iki gerekçeyle açıklanması.
- **Nihai Karar:** **Kategori D (Bağımsız Özgün Soru)** olarak revize edilmelidir. MEB'in slogan yazma göreviyle hiçbir şablon veya metin bağı yoktur; tamamen bağımsız bir insan hakları ve spor analizi sorusudur.

#### 23. `fallback_sosyal_bilgiler_7_SB.7.1.2_71`
- **Kazanım:** `SB.7.1.2` (Engelsiz erişilebilirlik)
- **MEB Kaynağı:** `mebi/sosyal-mebi-ornek-yazili1-1.pdf` (s. 1, Soru 3)
- **OYSS Soru Metni:** Tekerlekli sandalye kullanan Kerem'in halk eğitim merkezi girişindeki merdiven ve asansörsüzlük sorunu üzerinden kamu binalarında yapılması gereken rampa ve platform gibi mimari düzenlemelerin sorulması.
- **Nihai Karar:** **Kategori D (Bağımsız Özgün Soru)** olarak revize edilmelidir. MEB'in çocuk parkı sloganı sorusundan bağımsız, kamu binaları erişilebilirliği üzerine özgün bir kurgudur.

---

## 2. Kategori Değişiklikleri ve Gerekçeleri

Yapılan detaylı yan yana metin analizi sonucunda:
- **Kategori B (Yüzeysel Değiştirilmiş): 0 Soru.** Hiçbir soru MEB sorusunun yalnızca isim veya sayısı değiştirilerek aynen kopyalanmamıştır.
- **Kategori C $ightarrow$ Kategori D Geçişleri (7 Soru):**
  Aşağıdaki 7 sorunun MEB sorusundan uyarlanmadığı, yalnızca MEB ile **aynı kazanımı ölçtüğü** ve tamamen bağımsız kurgulandığı kanıtlanmıştır:
  1. `exam_5_fen_bilimleri_1_1_senaryo_1_q1` (Tablo ezberinden Ay'ın aynı yüzünün görülmesi açık uçlu muhakemesine)
  2. `exam_6_fen_bilimleri_1_1_senaryo_2_q1` (Tablodan bağımsız gezegen uç ölçek tespiti)
  3. `exam_6_fen_bilimleri_1_1_senaryo_3_q2` (Asteroit kuşağı olgusal yerleşimi)
  4. `fallback_fen_bilimleri_7_FB.7.1.1_1` (DAG Gözlemevi Palandöken özgün vaka matrisi)
  5. `fallback_fen_bilimleri_7_FB.7.1.1_11` (Türksat 36.000 km yörünge mekaniği)
  6. `fallback_sosyal_bilgiler_7_SB.7.1.2_67` (Paralimpik sporcular fırsat eşitliği)
  7. `fallback_sosyal_bilgiler_7_SB.7.1.2_71` (Kerem tekerlekli sandalye kamu binası rampası)
- **Kategori C'de Sabit Kalanlar (16 Soru):** MEB'in pedagojik ölçme modelini veya arketipini referans alıp yeni kurgu, diyalog, SVG veya veri setiyle inşa eden 16 soru C kategorisinde kalmıştır (10 SAMPLE_EXAMS + 6 fallbackPools).

### Güncellenmiş Kategori Dağılımı:
- **Kategori A (Bire bir kopya):** 0 soru (%0.0)
- **Kategori B (Yüzeysel değiştirilmiş):** 0 soru (%0.0)
- **Kategori C (Anlamlı uyarlanmış):** **16 soru (%1.7)**
- **Kategori D (Bağımsız özgün):** **666 soru (%70.0)** (+7 soru D'ye aktarıldı)
- **Kategori E (Kaynak bulunamayan - 8. Sınıf):** **269 soru (%28.3)**
- **TOPLAM:** **951 soru (%100.0)**

---

## 3. Metadata Hatalarının Dosya ve Satır Bazında Listesi

Kaynak kodda OYSS sorularının yanlışlıkla MEB resmî sorusu gibi etiketlenmesine yol açan 6 temel hata tespit edilmiştir:

| Dosya | Satır Aralığı | Mevcut Hatalı Kod | Hatanın Niteliği ve Etkisi |
| :--- | :---: | :--- | :--- |
| `src/data/sampleExams.ts` | **Satır 1969** | `"sourceOrigin": "meb_official"` | **Pilot Kesir Sorusu:** MEB 1. Dönem fasikülünde kesir sorusu olmadığı halde OYSS'nin pilot SVG sorusu `meb_official` olarak damgalanmıştır. |
| `src/data/sampleExams.ts` | **Satır 11667** | `"sourceOrigin": "meb_official"` | **Mert-Ece Sorusu:** İki öğrencinin diyalog tartışması ve OYSS SVG sayı doğrusu OYSS tarafından üretildiği halde soruya `meb_official` yazılmıştır. |
| `src/data/sampleExams.ts` | **850 Soruda (Genel)** | `sourceOrigin` anahtarı hiç tanımlanmamıştır (`undefined`). | Soruların kökeni statik veride belirsiz bırakılmış, bu durum arayüzün fallback olarak hepsini MEB resmi sorusu varsaymasına yol açmıştır. |
| `src/utils/aiGeneratorEngine.ts` | **Satır 536** | `sourceOrigin: 'meb_official' as const` | **Fallback Soru Seçimi:** `SAMPLE_EXAMS` havuzundan soru seçildiğinde soru OYSS hazırlık sorusu olduğu halde `meb_official` olarak damgalanmaktadır. |
| `src/utils/aiGeneratorEngine.ts` | **Satır 566** | `sourceOrigin: 'meb_official' as const` | **Sınıflar Arası Fallback:** Farklı kademedeki `SAMPLE_EXAMS` havuzundan soru çekildiğinde yine `meb_official` etiketi basılmaktadır. |
| `src/components/ExamPaperView.tsx` | **Satır 42** | `if (!isCustomAIExam) return 'official_base' as const;` | **Sınav Kâğıdı Başlığı:** Örnek sınavların tamamı soru kökenine bakılmaksızın "MEB ÖDSGM Örnek Sınavı" başlığı ve yasal sorumluluk reddiyle mühürlenmektedir. |
| `src/components/InteractivePracticeView.tsx` | **Satır 94** | `if (!isCustomAIExam) return 'official_base' as const;` | **Etkileşimli Sınav Başlığı:** Örnek sınavlar arayüzde MEB resmiyet rozetiyle gösterilmektedir. |
| `src/components/InteractivePracticeView.tsx` | **Satır 108** | `return !isCustomAIExam;` | **Model Çözüm Rozeti:** Soru üzerinde `sourceOrigin` yoksa sınav hazır sınav olduğu için `true` dönmekte; tüm OYSS çözümlerinde *"MEB ÖDSGM Model Cevap & Gerekçe:"* yazmaktadır. |
| `src/components/ExamPaperView.tsx` | **Satır 461** | `<span>{isCustomAIExam ? classDetails.titleSuffix : 'T.C. MEB Türkiye Yüzyılı Maarif Modeli'}</span>` | **Baskı Dipnotu:** Hazır sınav baskı çıktısında alt bilgiye resmî Bakanlık mührü gibi metin basılmaktadır. |

---

## 4. Önerilen Kaynak Sınıflandırma Modeli

Soru kökeni (`QuestionSourceOrigin`) ile görsel kökeni (`VisualOrigin`) kesinlikle ayrılmalı; statik veri ve çalışma zamanı şu yeni mimariyle refactor edilmelidir:

### 4.1. `src/types/index.ts` Tip Tanımları

```typescript
/**
 * Soru Kökeni: Bir sorunun metinsel ve pedagojik kaynağını belirtir.
 */
export type QuestionSourceOrigin =
  | 'meb_official'    // Yalnızca MEB PDF'lerinden bire bir aktarılan gerçek resmî sorular (varsa)
  | 'oyss_curated'    // OYSS zümresi tarafından MEB müfredatı referans alınarak yazılmış/uyarlanmış örnek sorular
  | 'gemini_ai'        // Gemini API tarafından canlı üretilmiş özgün sorular
  | 'oyss_synthetic'; // Kural tabanlı algoritmik şablonlarla dinamik üretilen sorular

/**
 * Görsel Kökeni: Sorudaki görselin (SVG / Grafik) üretim yöntemini belirtir.
 */
export type VisualOrigin = 
  | 'oyss_svg'        // fractionMathEngine veya svgMathEngine tarafından dinamik çizilen SVG
  | 'meb_diagram'     // Resmî MEB kitapçığından aktarılan orijinal şema
  | 'user_upload';    // Kullanıcı tarafından yüklenen görsel

/**
 * Sınav Kâğıdı Genel Kaynak Sınıflandırması
 */
export type ExamSourceClassification =
  | 'oyss_curated_set' // OYSS Hazırlık Sınavı (MEB Müfredatı Esaslı Hazır Sınavlar - SAMPLE_EXAMS)
  | 'oyss_pure_custom' // Canlı Yapay Zekâ veya Sentetik Üretim Sınavları
  | 'oyss_mixed_meb'   // İçinde hem meb_official hem oyss_curated bulunan karma sınavlar
  | 'meb_selection';   // Bütün soruları gerçek MEB PDF sorusu olan sınavlar
```

### 4.2. `src/types/index.ts` Rozet ve Bilgilendirme Metinleri

- **`official_base` sınıfı kaldırılmalı**, yerine hazır sınavlar için **`oyss_curated_set`** varsayılan olmalıdır:
  - **Başlık Eki:** `OYSS Hazırlık Sınavı (MEB Müfredat Esaslı)`
  - **Rozet:** `OYSS Örnek Sınavı` (Renk: İndigo)
  - **Açıklama / Sorumluluk Reddi:** *"Bu sınav kâğıdı, Millî Eğitim Bakanlığı konu-soru dağılım tabloları ve öğrenme çıktıları esas alınarak OYSS tarafından hazırlanmış özgün çalışma sınavıdır. Sorular doğrudan Bakanlık tarafından yayımlanan sınav soruları değildir."*
- **Soru Kartı Rozeti (`getQuestionSourceBadge`):**
  - `oyss_curated` için: `[OYSS Hazırlık Sorusu]` (Tooltip: *"MEB müfredatı esas alınarak OYSS tarafından hazırlanmıştır."*)
  - `meb_official` için: `[MEB Resmî Sorusu]` (Yalnızca gerçekten MEB PDF'inden alınmış sorular için).

---

## 5. Arayüzdeki Yanlış Resmiyet Gösterimlerinin Düzeltme Kuralları

1. **Hazır Sınavları Otomatik `'official_base'` Yapma Mantığı Kaldırılmalıdır:**
   `ExamPaperView.tsx` (Satır 42) ve `InteractivePracticeView.tsx` (Satır 94)'teki `if (!isCustomAIExam) return 'official_base'` ifadesi silinmelidir. Yerine doğrudan:
   ```typescript
   const classification = useMemo(() => {
     return examPaper.examClassification || classifyExamQuestions(examPaper.questions);
   }, [examPaper.examClassification, examPaper.questions]);
   ```
   kullanılmalıdır. Böylece içinde `meb_official` soru bulunmayan tüm `SAMPLE_EXAMS` sınavları dürüstçe **`oyss_curated_set`** olarak sınıflandırılacaktır.
2. **`isQuestionFromMeb` Fonksiyonu Sadece Gerçek `meb_official` İçin Çalışmalıdır:**
   `InteractivePracticeView.tsx` Satır 103-109 şu şekilde sadeleştirilmelidir:
   ```typescript
   const isQuestionFromMeb = (qItem?: any): boolean => {
     return qItem?.sourceOrigin === 'meb_official';
   };
   ```
   Böylece `sourceOrigin` alanı tanımsız veya `oyss_curated` olan sorular için kesinlikle `false` dönecek; model cevap başlığı dürüstçe **"OYSS Model Cevap & Gerekçe:"** olarak basılacaktır.
3. **Baskı Dipnotu Düzeltilmelidir:**
   `ExamPaperView.tsx` Satır 461:
   ```tsx
   <span>{classDetails.titleSuffix} • MEB Müfredat Referanslı</span>
   ```
   şeklinde güncellenmeli, resmî kurum mührü havası veren "T.C. MEB..." ifadesi yerine OYSS hazırlık ibaresi yer almalıdır.

---

## 6. Uygulama İçin Önerilen Dosya ve Test Kapsamı

Gelecek düzeltme fazında yalnızca aşağıdaki 6 dosya üzerinde çalışılmalı; kapsam dışı dosyalara dokunulmamalıdır:

### İzin Verilen Dosya Kapsamı:
1. `src/types/index.ts` (Sınıflandırma, rozet metinleri ve tip güncellemeleri)
2. `src/data/sampleExams.ts` (Satır 1969 ve 11667'deki `meb_official` $ightarrow$ `oyss_curated` düzeltmesi; 850 soru için `sourceOrigin: 'oyss_curated'` tanımlanması)
3. `src/utils/aiGeneratorEngine.ts` (Satır 536 ve 566'daki `meb_official` $ightarrow$ `oyss_curated` düzeltmesi)
4. `src/components/ExamPaperView.tsx` (Başlık ve rozet resmiyet zorlamalarının kaldırılması)
5. `src/components/InteractivePracticeView.tsx` (Soru bazlı MEB çözüm başlığı yanılsamasının giderilmesi)
6. `tests/metadataConsistency.test.ts` (Yeni yazılacak doğrulama testi)

### Kesinlikle Değiştirilmeyecekler:
- `src/utils/fractionMathEngine.ts` ve testleri
- `src/utils/svgMathEngine.ts` ve testleri
- `src/components/QuestionVisualView.tsx`
- Soru metinleri, kurguları, kazanım kodları ve cevap anahtarları (içerik değişikliği yapılmayacaktır)

---

## 7. Düzeltilmesi Gerekenler ve Değişiklik Gerektirmeyenler Özeti

### Düzeltilmesi Gerekenler:
1. **Statik Soru Metadata:** `sampleExams.ts` içindeki tüm sorulara `sourceOrigin: 'oyss_curated'` atanmalıdır.
2. **Pilot ve Mert-Ece Soruları:** `sampleExams.ts` Satır 1969 ve 11667'deki `meb_official` etiketleri `oyss_curated` yapılmalıdır. (Görseldeki `oyss_svg` korunacaktır).
3. **Fallback Motoru:** `aiGeneratorEngine.ts` Satır 536 ve 566'daki `meb_official` atamaları `oyss_curated` olarak değiştirilmelidir.
4. **Sınav Arayüz Başlıkları:** `ExamPaperView.tsx` ve `InteractivePracticeView.tsx` bileşenlerindeki zorlama `official_base` mantığı kaldırılmalı, `oyss_curated_set` ile şeffaf OYSS rozetine geçilmelidir.
5. **Model Cevap Başlığı:** `InteractivePracticeView.tsx` bileşeninde OYSS sorularının model cevaplarının "MEB ÖDSGM Model Cevap" olarak gösterilmesi engellenmelidir.

### Değişiklik Gerektirmeyenler (Korunacaklar):
1. **Soru Metinleri ve Cevapları:** 951 sorunun pedagojik metinleri, senaryoları ve rubrikleri %100 korunacaktır (hiçbir metin düzenlemesi veya soru silme yapılmayacaktır).
2. **Kazanım Kütükleri:** MEB öğrenme çıktıları ve konu dağılım tabloları aynen korunacaktır.
3. **SVG Matematik Motorları:** Kesir şeritleri ve sayı doğrusu altyapısı eksiksiz korunacaktır.
4. **Canlı Yapay Zekâ Promptları:** Gemini entegrasyonu ve kaçınma kuralları (`avoidDirectives`) aynen muhafaza edilecektir.
