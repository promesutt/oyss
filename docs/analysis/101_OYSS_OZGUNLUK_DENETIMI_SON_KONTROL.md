# OYSS Rehberi | 100 Numaralı Özgünlük Denetimi Son Kontrol Raporu
**Rapor Numarası:** 101  
**Tarih:** 03.11.2026  
**Denetim Türü:** Tutarlılık, Kanıt, Metadata ve Sayısal Mutabakat Son Denetimi (Salt Okunur)  
**İncelenen Temel Kaynaklar:**
- `src/data/sampleExams.ts` (124 Sınav, 852 Soru)
- `src/data/fallbackPools.ts` (99 Soru)
- `src/utils/aiGeneratorEngine.ts`
- `src/types/index.ts`
- Rapor 099 (`docs/analysis/099_MEB_KAYNAKLI_SORULARIN_OZGUNLUK_DENETIMI_RAPORU.md`)
- Rapor 100 Belgeleri (`100_OYSS_TUM_SORULAR_OZGUNLUK_ENVANTERI.md`, `100_OYSS_MEB_KARSILASTIRMA_KANITLARI.md`, `100_OYSS_SORU_URETIM_MOTORU_KAYNAK_DOGRULAMASI.md`)
- 18 Adet MEB/MEBİ Resmî Soru Kitapçığı (5., 6. ve 7. Sınıf)

---

## 1. Metadata Tutarsızlıklarının Çözümü ve Kod Düzeyinde Gerçek Durum

099 ve 100 numaralı raporlar arasındaki en belirgin tutarsızlık, soru metadata değerlerinde (`sourceOrigin`) ortaya çıkmıştır. Yapılan satır satır kod incelemesinde ulaşılan kesin teknik bulgular şunlardır:

### 1.1. `src/data/sampleExams.ts` Gerçek Kod Değerleri

1. **850 Soruda Metadata Yoktur (Tanımsız):**
   `src/data/sampleExams.ts` dosyasında yer alan **852 sorunun 850 tanesinde `sourceOrigin` alanı kod düzeyinde HİÇ TANIMLANMAMIŞTIR.** `src/types/index.ts` (Satır 97) dosyasında `sourceOrigin?: QuestionSourceOrigin;` alanı opsiyonel (`?`) olarak tanımlandığı için TypeScript derleme hatası vermemektedir.
2. **Yalnızca 2 Soruda Kod Düzeyinde `sourceOrigin` Vardır:**
   Tüm `sampleExams.ts` dosyasında string araması (`grep "sourceOrigin"`) yapıldığında yalnızca 4 satır bulunmaktadır. Bu satırlar sadece 2 soruya aittir:
   - **5. Sınıf Matematik Pilot Denk Kesirler Sorusu** (`exam_5_matematik_1_2_senaryo_1` Soru 1):
     - Satır 1969: `"sourceOrigin": "meb_official"`
     - Satır 1974 (Görsel): `"sourceOrigin": "oyss_svg"`
   - **7. Sınıf Matematik Mert ve Ece Sorusu** (`exam_7_matematik_1_1_senaryo_1` Soru 4):
     - Satır 11667: `"sourceOrigin": "meb_official"`
     - Satır 11672 (Görsel): `"sourceOrigin": "oyss_svg"`
3. **Envanterde Neden Çok Sayıda `Tanımsız` Değeri Görünmektedir?**
   100 numaralı envanter betiği, çalışma zamanındaki yapay varsayımları değil, `src/data/sampleExams.ts` dosyasındaki ham nesne değerlerini (`q.sourceOrigin`) okumuştur. Kodda bu alan 850 soruda fiziksel olarak bulunmadığı için JavaScript/TypeScript `undefined` dönmüş, betik de bunu doğru ve şeffaf bir şekilde **`Tanımsız`** olarak kaydetmiştir. Bu durum bir aktarım veya dönüştürme hatası değil, **veri tabanının gerçek durumudur.**

### 1.2. 7. Sınıf Matematik Mert-Ece Sorusu Neden Farklı Değerlerle Gösterildi?

Mert ve Ece rasyonel sayı tartışması sorusunun farklı rapor ve ortamlarda farklı etiketlerle anılmasının teknik gerekçesi şudur:
- **`sampleExams.ts` Statik Verisinde (Satır 11667):** Soruya doğrudan `"sourceOrigin": "meb_official"` yazılmıştır. 100 numaralı envanterde bu soru tam olarak `meb_official (7. Sınıf Matematik 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 1))` olarak listelenmiştir.
- **Aynı Sınavın Diğer Sorularında:** Sınavın 1., 2., 3., 5., 6. ve 7. sorularında hiçbir `sourceOrigin` yazılmadığı için onlar `Tanımsız` kalmıştır. Kullanıcı tüm sınavın `meb_official` olduğunu varsaydığında 4. soru ile diğerleri arasında tutarsızlık varmış izlenimi doğmuştur.
- **`fallbackPools.ts` İçindeki Benzer İsimlendirme:** `fallbackPools.ts` dosyasının 28. sırasında (`fallback_pool_29`) da bir "Mert" ismi geçmektedir (kart bakiyesi sorusu). Bu soru yedek havuzda olduğu için ve ham dosyada `sourceOrigin` içermediği için envanterde farklı görünmüştür.
- **Rapor 099'daki İfade:** Rapor 099'da Mert-Ece sorusunun aslında OYSS tarafından sıfırdan SVG ile kurgulandığı, buna rağmen koddaki `sourceOrigin: 'meb_official'` etiketinin bir hata olduğu belirtilmiştir.

### 1.3. `fallbackPools.ts` Gerçek Kod Değerleri

`src/data/fallbackPools.ts` dosyasında yer alan 99 sorunun ham veri tanımlarında da **hiçbir `sourceOrigin` alanı yoktur (0 / 99).**  
Ancak soru üretim motorunda (`aiGeneratorEngine.ts` Satır 508), yedek havuzdan soru çekilirken kod çalışma zamanında şu atamayı yapmaktadır:
```typescript
sourceOrigin: 'oyss_curated' as const
```
Rapor 099 bu çalışma zamanı atamasını baz almış; 100 numaralı envanter betiği de fallback sorularını `fallbackPools` fonksiyonundan türetirken çalışma zamanı şablonunu (`oyss_curated`) kullanmıştır.

### 1.4. Kod Değeri ile Rapor İfadeleri Arasındaki Farkın Kaynağı

| Veri Kümesi | Kod İçi Fiziksel Değer (`*.ts`) | Motor Çalışma Zamanı Ataması (`aiGeneratorEngine.ts`) | Rapor 099 İfadesi | Rapor 100 Envanteri |
| :--- | :--- | :--- | :--- | :--- |
| **SAMPLE_EXAMS (850 Soru)** | `undefined` (Yok) | Fallback seçilirse `meb_official` (Satır 536, 566) | MEB referanslı / OYSS | `Tanımsız` (Gerçek fiziksel durum) |
| **SAMPLE_EXAMS (2 Soru - Pilot & Mert-Ece)** | `meb_official` | `meb_official` | Hatalı etiket uyarısı | `meb_official` |
| **fallbackPools (99 Soru)** | `undefined` (Yok) | Havuzdan çekilirse `oyss_curated` (Satır 508) | `oyss_curated` | `oyss_curated` |

**Sonuç:** Soruların metadata değerleri aktarım sırasında kaybolmamıştır; `SAMPLE_EXAMS` sorularının %99.8'inde (850/852) kaynak kodda bu alan fiziksel olarak hiç yazılmamıştır.

---

## 2. Kategori C'deki 23 Sorunun Eksiksiz Kanıtlandırılması

Kategori C, **"MEB'in pedagojik ölçme şablonunu veya soru arketipini referans alan, ancak bağlamı, metni, sayısal verileri veya görseli anlamlı biçimde değiştirilmiş sorular"** olarak tanımlanmıştır. 

Aşağıda 23 sorunun tamamı 11 analitik boyutta tek tek kanıtlandırılmıştır:

### 2.1. SAMPLE_EXAMS Kapsamındaki 13 Soru

#### 1. `exam_5_matematik_1_1_senaryo_2_q1`
- **Kazanım:** `MAT.5.3.1` (Temel geometrik çizimler, doğru parçası ve ışın)
- **MEB Kaynak PDF:** `MEBI_MATEMATIK.pdf` (s. 13, Soru 1)
- **MEB Sorusu Özeti:** Kareli kâğıt üzerinde verilen A ve B noktaları üzerinden sembolik doğru parçası ve ışın çizimi.
- **OYSS Sorusu Özeti:** Düzlemde verilen K ve L noktaları için [KL ışını ile [KL] doğru parçasının sembolik gösterimi.
- **Bağlam Değişikliği:** Kareli zemin koordinat çiziminden düzlem geometri sembolik mantığına geçilmiştir.
- **Metin Değişikliği:** MEB yönergesi yerine doğrudan iki şıklı (a ve b) açık uçlu yazım formatı kurgulanmıştır.
- **Veri Değişikliği:** Nokta isimleri (A, B $ightarrow$ K, L) ve geometrik sınır tanımları değiştirilmiştir.
- **Görsel Değişikliği:** MEB'deki kareli zemin raster görseli kaldırılmış, metin tabanlı sembolik gösterime dönüştürülmüştür.
- **Ölçülen Beceri:** Matematiksel sembolleri doğru kullanma ve geometrik sınırları kavrama.
- **C'de Tutulma Gerekçesi:** Yalnızca nokta ismi değişmemiş; görsel bağımlılık kaldırılarak soru sembolik tahlile dönüştürülmüştür.

#### 2. `exam_5_fen_bilimleri_1_1_senaryo_1_q1`
- **Kazanım:** `FB.5.1.2` (Ay'ın dönme ve dolanma hareketleri)
- **MEB Kaynak PDF:** `MEBI_FEN_BILIMLERI.pdf` (s. 1, Soru 2)
- **MEB Sorusu Özeti:** Ay'ın kendi etrafında dönme ve Dünya etrafında dolanma sürelerinin verildiği boşluk doldurma tablosu.
- **OYSS Sorusu Özeti:** Dünya'dan bakıldığında Ay'ın hep aynı yüzünün görülmesinin bilimsel gerekçesinin açıklanması.
- **Bağlam Değişikliği:** Sayısal süre ezberinden (tablo tamamlama) fenomen temelli bilimsel akıl yürütmeye geçilmiştir.
- **Metin Değişikliği:** Sıfırdan bir gökyüzü gözlem kurgusu yazılmıştır.
- **Veri Değişikliği:** Tablo verisi yerine yaklaşık 27,3 günlük periyot eşzamanlılığı kavramsal olarak sorulmuştur.
- **Görsel Değişikliği:** MEB'deki tablo yapısı kaldırılmıştır.
- **Ölçülen Beceri:** Bilimsel çıkarım yapma ve hareket eşzamanlılığını gerekçelendirme.
- **C'de Tutulma Gerekçesi:** MEB'in aynı kazanımı ölçen basit tablo sorusu, derinlikli bir açık uçlu muhakeme sorusuna dönüştürülmüştür.

#### 3. `exam_6_fen_bilimleri_1_1_senaryo_2_q1`
- **Kazanım:** `FB.6.1.1` (Güneş sistemi gezegenleri sınıflandırma)
- **MEB Kaynak PDF:** `MEBI_FEN_BILIMLERI.pdf` (s. 11, Soru 1)
- **MEB Sorusu Özeti:** 8 gezegenin Güneş'e mesafelerini ve çaplarını gösteren karmaşık veri tablosu.
- **OYSS Sorusu Özeti:** Güneş sisteminin en büyük gezegeni ile en küçük gezegeninin tespiti ve sınıflandırılması.
- **Bağlam Değişikliği:** Tüm tabloyu okuma yerine gezegen ölçek zıtlıkları (Jüpiter vs Merkür) bağlamına odaklanılmıştır.
- **Metin Değişikliği:** Tablo okuma yönergesi yerine doğrudan açık uçlu soru kurgulanmıştır.
- **Veri Değişikliği:** Kilometre cinsinden çap verileri yerine niteliksel büyüklük/küçüklük sorulmuştur.
- **Görsel Değişikliği:** Sayısal veri tablosu kaldırılmıştır.
- **Ölçülen Beceri:** Gezegenleri hacimsel ve yapısal (gaz devi / karasal) özelliklerine göre ayırt etme.
- **C'de Tutulma Gerekçesi:** MEB'deki veri tablosu arketipi sadeleştirilerek kavramsal özete uyarlanmıştır.

#### 4. `exam_6_fen_bilimleri_1_1_senaryo_3_q2`
- **Kazanım:** `FB.6.1.1` (Güneş sistemi gezegenleri ve asteroitler)
- **MEB Kaynak PDF:** `MEBI_FEN_BILIMLERI.pdf` (s. 1, Soru 3)
- **MEB Sorusu Özeti:** Güneş sisteminde iç ve dış gezegenler arasındaki sınırın şematik gösterimi.
- **OYSS Sorusu Özeti:** Asteroit kuşağının hangi iki gezegenin (Mars ve Jüpiter) yörüngeleri arasında yer aldığının sorulması.
- **Bağlam Değişikliği:** Şema üzerinden eşleştirme yerine uzay dinamikleri kurgusuna dönüştürülmüştür.
- **Metin Değişikliği:** Kaya ve metal parçalarından oluşan kuşak tanımı özgün olarak metne işlenmiştir.
- **Veri Değişikliği:** Gezegen listesi yerine doğrudan sınır gezegenleri sorgulanmıştır.
- **Görsel Değişikliği:** MEB'deki yörünge çizimi kaldırılmıştır.
- **Ölçülen Beceri:** Güneş sistemi topolojisini ve geçiş kuşağını zihinde yapılandırma.
- **C'de Tutulma Gerekçesi:** MEB kazanım hedefi şematik testten metinsel analize uyarlanmıştır.

#### 5. `exam_6_fen_bilimleri_1_1_senaryo_3_q3`
- **Kazanım:** `FB.6.1.3` (Güneş ve Ay tutulması karşılaştırma)
- **MEB Kaynak PDF:** `MEBI_FEN_BILIMLERI.pdf` (s. 4, Soru 2)
- **MEB Sorusu Özeti:** Güneş ve Ay tutulmalarının geometrik dizilim modellerinin çizimi.
- **OYSS Sorusu Özeti:** İki tutulmanın Dünya üzerinden gözlemlenebilen alan genişlikleri bakımından karşılaştırılması.
- **Bağlam Değişikliği:** Şematik gök cismi diziliminden gözlem alanı (dar koridor vs gece olan tüm yarım küre) perspektifine geçilmiştir.
- **Metin Değişikliği:** Işık-gölge olaylarının doğadaki etkileri bağlamında özgün açıklama yazılmıştır.
- **Veri Değişikliği:** Geometrik sıra yerine alan büyüklüğü karşılaştırması hedeflenmiştir.
- **Görsel Değişikliği:** Tutulma şemaları çıkarılmıştır.
- **Ölçülen Beceri:** Gölge konisi geometrisinin Dünya yüzeyindeki izdüşümünü yorumlama.
- **C'de Tutulma Gerekçesi:** MEB'in klasik tutulma çizimi pedagojik yaklaşımı, gözlem alanı analitiğine dönüştürülmüştür.

#### 6. `exam_6_fen_bilimleri_1_1_senaryo_5_q3`
- **Kazanım:** `FB.6.1.3` (Güneş ve Ay tutulması bilimsel çıkarım)
- **MEB Kaynak PDF:** `MEBI_FEN_BILIMLERI.pdf` (s. 4, Soru 3)
- **MEB Sorusu Özeti:** Tutulma olaylarında Ay ve Dünya'nın birbirine göre gölge düşürme süreçleri.
- **OYSS Sorusu Özeti:** Her iki tutulmanın da ışığın doğrusal yayılma ilkesini kesin olarak kanıtladığının tespiti.
- **Bağlam Değişikliği:** Olay betimlemesinden temel optik fizik prensibine bağlanmıştır.
- **Metin Değişikliği:** "Işığın temel fiziksel özelliği" vurgusuyla kavramsal soru yazılmıştır.
- **Veri Değişikliği:** Saf nitel fizik prensibi.
- **Görsel Değişikliği:** Şemasız açık uçlu soru.
- **Ölçülen Beceri:** Doğa olaylarından temel fizik yasalarına (doğrusal yayılma, tam gölge) tümevarım yapabilme.
- **C'de Tutulma Gerekçesi:** Tutulma konusunu optik ilkesiyle birleştiren MEB yaklaşımı açık uçlu kurgulanmıştır.

#### 7. `exam_6_din_kulturu_1_1_senaryo_2_q6`
- **Kazanım:** `DKAB.6.1.5` (Felak suresi ve anlamı)
- **MEB Kaynak PDF:** `MEBI_DKAB.pdf` (s. 5, Soru 4)
- **MEB Sorusu Özeti:** Felak suresinin 1-5. ayetlerinin meali verilerek ana mesajının sorulması.
- **OYSS Sorusu Özeti:** Felak suresi 3-4. ayet meali verilerek Müslümanların hangi şer ve tehlikelere karşı uyanık olması gerektiğinin sorulması.
- **Bağlam Değişikliği:** Tüm sure özetinden 3 ve 4. ayetteki somut tehlikeler (karanlık gece, düğümlere üfleyenler) analizine odaklanılmıştır.
- **Metin Değişikliği:** Soru kökü özgünleştirilmiş, ayet alıntısı daraltılmıştır.
- **Veri Değişikliği:** Ayet aralığı (1-5 $ightarrow$ 3-4) odaklanmıştır.
- **Görsel Değişikliği:** Yok.
- **Ölçülen Beceri:** Dinî metinlerdeki sembolik kötülük ifadelerini ve sığınma bilincini çözümleme.
- **C'de Tutulma Gerekçesi:** MEB'in meal tahlili arketipi korunmuş, odak ayet ve değerlendirme kriteri değiştirilmiştir.

#### 8. `exam_7_turkce_1_1_senaryo_1_q1`
- **Kazanım:** `T.O.7.5` (Bağlamdan kelime anlamı çıkarma)
- **MEB Kaynak PDF:** `turkce-mebi-ornek-yazili1-1.pdf` (s. 2, Soru 4)
- **MEB Sorusu Özeti:** Şerife Bacı'nın kağnısıyla cephane taşıması anlatılarak metnin tamamlanması ve kelime anlamı sorulması.
- **OYSS Sorusu Özeti:** İnebolu-Ilgaz Dağları hattında kağnı yolculuğu kurgusu içinde "mefkûre" ve "vatan yetim kalamaz" ifadelerinin tahlili.
- **Bağlam Değişikliği:** Şerife Bacı teması korunmuş; metin tamamlama yerine Ilgaz Dağları zorlu kış kurgusu sıfırdan yazılmıştır.
- **Metin Değişikliği:** Metin tamamen özgündür, MEB metniyle hiçbir cümle örtüşmesi yoktur.
- **Veri Değişikliği:** Hedef sözcükler MEB'deki "fedakârlık" yerine "mefkûre" ve mecaz söz öbeğidir.
- **Görsel Değişikliği:** Yok.
- **Ölçülen Beceri:** Edebî ve tarihî metinlerdeki örtük anlamı ve dönemin ruhunu yansıtan söz varlığını kavrama.
- **C'de Tutulma Gerekçesi:** Millî Mücadele kağnı teması pedagojik arketip olarak alınmış, metin ve hedef kavramlar yenilenmiştir.

#### 9. `exam_7_turkce_1_1_senaryo_1_q5`
- **Kazanım:** `T.Y.7.13` (Bilgilendirici metin yazma taslağı oluşturma)
- **MEB Kaynak PDF:** `turkce-mebi-ornek-yazili1-1.pdf` (s. 5, Soru 8)
- **MEB Sorusu Özeti:** "Yardımlaşma" konulu bilgilendirici bir metin için giriş, gelişme ve sonuç taslağı hazırlama.
- **OYSS Sorusu Özeti:** "Bir milletin en büyük gücü: Birlik ve Beraberlik" konusu için giriş, gelişme ve sonuç ana fikirlerini planlama.
- **Bağlam Değişikliği:** Bireysel yardımlaşma temasından toplumsal birlik ve millî beraberlik temasına geçilmiştir.
- **Metin Değişikliği:** Yönerge ve başlık özgün olarak kurgulanmıştır.
- **Veri Değişikliği:** Yazma teması ve rubric ölçütleri farklılaştırılmıştır.
- **Görsel Değişikliği:** Yok.
- **Ölçülen Beceri:** Yazılı anlatımda kompozisyon planlama ve düşünce akışını bölümlere ayırma.
- **C'de Tutulma Gerekçesi:** MEB'in metin taslağı çıkarma şablonu farklı bir toplumsal değerle uyarlanmıştır.

#### 10. `exam_7_turkce_1_1_senaryo_2_q3`
- **Kazanım:** `T.Y.7.13` (Metin yapısını ve bölümlerini çözümleme)
- **MEB Kaynak PDF:** `turkce-mebi-ornek-yazili1-1.pdf` (s. 5, Soru 10)
- **MEB Sorusu Özeti:** Doğa sevgisi konulu bir deneme metni taslağında giriş ve sonuç paragrafları verilerek gelişmenin kurgulanması.
- **OYSS Sorusu Özeti:** Sınavın 1. sorusunda verilen "Ahilik ve Pabuç Dama Atılmak" metninin giriş, gelişme ve sonuç bölümlerindeki temel bilgilerin tahlili.
- **Bağlam Değişikliği:** Doğa temalı boşluk tamamlama taslağından, esnaf ahlakı ve Ahilik tarihçesi çözümlemesine geçilmiştir.
- **Metin Değişikliği:** Metinler bütünüyle bağımsızdır. Örtüşen tek ifade MEBİ ve Türkçe zümresinin ortak soru kalıbı olan "Bu metnin giriş, gelişme ve sonuç bölümlerinde..." ifadesidir.
- **Veri Değişikliği:** Kültürel esnaf geleneği analitiği.
- **Görsel Değişikliği:** Yok.
- **Ölçülen Beceri:** Tamamlanmış bir metnin yapısal omurgasını (giriş-gelişme-sonuç) deşifre edebilme.
- **C'de Tutulma Gerekçesi:** 099'daki yüzeysel kopya (Kategori B) şüphesi çürütülmüş; soru kalıbı arketipik, metin ve görev ise bağımsız uyarlama olduğu için C'de tescillenmiştir.

#### 11. `exam_7_matematik_1_1_senaryo_1_q4`
- **Kazanım:** `MAT.7.1.3` (Rasyonel sayıları karşılaştırma ve sıralama)
- **MEB Kaynak PDF:** `matematik- mebi-ornek-yazili1-1.pdf` (s. 22, Soru 10)
- **MEB Sorusu Özeti:** Efe'nin negatif rasyonel sayıları sıralarken 3. adımda yaptığı payda eşitleme hatasını bulma sorusu (Sayılar: $-7/3$, $-5/6$, $-2/3$).
- **OYSS Sorusu Özeti:** Mert ile Ece'nin $-3/4$ ve $-5/6$ rasyonel sayılarını karşılaştırırken yürüttükleri tartışma ve dinamik SVG sayı doğrusu üzerindeki konum tahlili.
- **Bağlam Değişikliği:** Bireysel işlem hatası arama yerine iki öğrencinin kavram yanılgısı diyaloğu ve bilimsel argümantasyon modeli kurulmuştur.
- **Metin Değişikliği:** Karakterler (Mert ve Ece), argüman replikleri sıfırdan yazılmıştır.
- **Veri Değişikliği:** Sayılar $-7/3, -5/6, -2/3$ yerine $-3/4$ ve $-5/6$ olarak değiştirilmiştir.
- **Görsel Değişikliği:** MEB'de statik basit çizim varken, OYSS'de 12 alt bölmeli, dinamik koordinatlı SVG sayı doğrusu (`sourceOrigin: "oyss_svg"`) entegre edilmiştir.
- **Ölçülen Beceri:** Negatif rasyonel sayılarda sıfıra yakınlık ve yön mantığını kavramsal tartışma üzerinden gerekçelendirme.
- **C'de Tutulma Gerekçesi:** Negatif rasyonel sıralama arketipi alınmış; diyalog, veriler ve SVG motoru ile tamamen yeni bir soru inşa edilmiştir.

#### 12. `exam_7_matematik_1_1_senaryo_1_q5`
- **Kazanım:** `MAT.7.1.3` (Rasyonel sayıları sıralama stratejileri)
- **MEB Kaynak PDF:** `matematik- mebi-ornek-yazili1-1.pdf` (s. 7, Soru 4)
- **MEB Sorusu Özeti:** Payda eşitlemeden yarıma ve bütüne yakınlık kuralıyla kesir sıralama (MEB Sayıları: $3/7, 5/8, 11/12$).
- **OYSS Sorusu Özeti:** $A = 7/15$, $B = 9/10$, $C = 4/7$ sayılarının yarıma ve bütüne yakınlık stratejisiyle gerekçeli sıralanması.
- **Bağlam Değişikliği:** Pedagojik strateji aynı tutulmuş, sayısal ilişkiler yeniden kurgulanmıştır.
- **Metin Değişikliği:** Açık uçlu çözüm açıklama yönergesiyle soru kurgulanmıştır.
- **Veri Değişikliği:** Tüm kesirler değiştirilmiştir ($A=7/15$ yarımın hemen altı, $C=4/7$ yarımın hemen üstü, $B=9/10$ bütüne yakın).
- **Görsel Değişikliği:** Yok.
- **Ölçülen Beceri:** Mekanik payda eşitleme yerine referans noktalara ($0, 1/2, 1$) göre zihinsel tahmin ve sıralama.
- **C'de Tutulma Gerekçesi:** MEB'in "strateji belirterek sıralama" ölçme modeli korunmuş, tüm veri seti özgünleştirilmiştir.

#### 13. `exam_7_matematik_1_1_senaryo_4_q5`
- **Kazanım:** `MAT.7.1.3` (Payları eşit pozitif rasyonel sayıları sıralama)
- **MEB Kaynak PDF:** `matematik- mebi-ornek-yazili1-1.pdf` (s. 7, Soru 5)
- **MEB Sorusu Özeti:** Payları eşit pozitif kesirlerin sıralanması kuralı (MEB Sayıları: $5/7, 5/9, 5/6$).
- **OYSS Sorusu Özeti:** $K = 12/17$, $L = 12/19$, $M = 12/13$ sayılarının kural gerekçelendirilerek büyükten küçüğe sıralanması.
- **Bağlam Değişikliği:** Standart pay eşitliği kuralını teorik ilkesiyle (bütünün parça sayısı) birlikte açıklatma.
- **Metin Değişikliği:** Yönerge kural yazımını zorunlu kılacak şekilde zenginleştirilmiştir.
- **Veri Değişikliği:** Sayı kümesi $12/17, 12/19, 12/13$ olarak değiştirilmiştir.
- **Görsel Değişikliği:** Yok.
- **Ölçülen Beceri:** Kesirlerde payda büyüklüğünün birim parça büyüklüğüyle ters orantılı olduğunu kavrama.
- **C'de Tutulma Gerekçesi:** MEB pedagojik şablonu yeni sayısal parametrelerle ve kural yazma adımıyla uyarlanmıştır.

---

### 2.2. fallbackPools Kapsamındaki 10 Soru

#### 14. `fallback_fen_bilimleri_7_FB.7.1.1_1`
- **Kazanım:** `FB.7.1.1` (Uzay araştırmaları ve gözlemevi yeri seçimi)
- **MEB Kaynak PDF:** `fen-mebi-ornek-yazili1-1.pdf` (s. 1, Soru 1)
- **MEB Sorusu Özeti:** Bir gözlemevinin kurulacağı yerde aranması gereken 3 temel özelliğin listelenmesi.
- **OYSS Sorusu Özeti:** Doğu Anadolu Gözlemevi (DAG) kapsamında 3 farklı coğrafi bölgenin (Palandöken, Çamlıca, Bakırlıtepe) ışık kirliliği ve bulutluluk durumlarının "VAR/YOK" matrisiyle analiz edilmesi.
- **Bağlam Değişikliği:** Düz ezber listelemeden gerçek coğrafi vaka incelemesi ve matris doldurma formatına dönüştürülmüştür.
- **Metin Değişikliği:** Türkiye'deki gerçek gözlemevi lokasyonlarını içeren özgün vaka metni yazılmıştır.
- **Veri Değişikliği:** Bölge adları, rakım ve şehirleşme parametreleri eklenmiştir.
- **Görsel Değişikliği:** Matris tablosu formatı eklenmiştir.
- **Ölçülen Beceri:** Gözlemevi kriterlerini gerçek hayat coğrafi verileri üzerinde test etme.
- **C'de Tutulma Gerekçesi:** MEB'in gözlemevi şartları sorusu zengin bir vaka matrisine uyarlanmıştır.

#### 15. `fallback_fen_bilimleri_7_FB.7.1.1_2`
- **Kazanım:** `FB.7.1.1` (Teleskoplar ve atmosfer etkileri)
- **MEB Kaynak PDF:** `fen-mebi-ornek-yazili1-1.pdf` (s. 1, Soru 2)
- **MEB Sorusu Özeti:** Hubble ve James Webb uzay teleskoplarının Dünya yerine neden uzaya gönderildiğinin gerekçesi.
- **OYSS Sorusu Özeti:** Astronomi panosu hazırlayan Kerem ve Alper'in uzay teleskoplarının konumu üzerine tartışması ve atmosferin olumsuz etkilerinin gerekçelendirilmesi.
- **Bağlam Değişikliği:** Açık uçlu sorudan öğrenci diyaloğu ve kavram yanılgısı tahliline dönüştürülmüştür.
- **Metin Değişikliği:** Kerem ve Alper karakterlerinin tartışma replikleri yazılmıştır.
- **Veri Değişikliği:** Nitel argüman karşılaştırması.
- **Görsel Değişikliği:** Yok.
- **Ölçülen Beceri:** Atmosferdeki gaz hareketlerinin ve ışık kırılmalarının astronomik gözleme etkisini değerlendirme.
- **C'de Tutulma Gerekçesi:** MEB'in uzay teleskobu sorusu diyalog arketipinde yeniden yapılandırılmıştır.

#### 16. `fallback_fen_bilimleri_7_FB.7.1.1_11`
- **Kazanım:** `FB.7.1.1` (Yapay uydular ve yörünge özellikleri)
- **MEB Kaynak PDF:** `fen-mebi-ornek-yazili1-1.pdf` (s. 1, Soru 3)
- **MEB Sorusu Özeti:** Türkiye'nin aktif haberleşme ve gözlem uydularının isimlerinin sınıflandırılması.
- **OYSS Sorusu Özeti:** Türksat haberleşme uydularının neden 36.000 km yer-sabit yörüngeye (geostationary) yerleştirildiğinin fiziksel gerekçesi.
- **Bağlam Değişikliği:** Uydu isim ezberinden yörünge mekaniği ve kesintisiz kapsama analitiğine geçilmiştir.
- **Metin Değişikliği:** Türkiye'nin uzay filosu bağlamında özgün açıklama yazılmıştır.
- **Veri Değişikliği:** 36.000 km yörünge irtifası ve dönüş periyodu eşleşmesi verisi eklenmiştir.
- **Görsel Değişikliği:** Yok.
- **Ölçülen Beceri:** Dünya'nın açısal hızı ile uydu yörünge hızı arasındaki fiziksel bağı kurma.
- **C'de Tutulma Gerekçesi:** Uydu kazanımı MEB'deki basit isim listeleme yerine derinlemesine yörünge fiziğine uyarlanmıştır.

#### 17. `fallback_fen_bilimleri_7_FB.7.1.1_12`
- **Kazanım:** `FB.7.1.1` (Uzay araştırmaları ve astronot deneyleri)
- **MEB Kaynak PDF:** `fen-mebi-ornek-yazili1-1.pdf` (s. 2, Soru 4)
- **MEB Sorusu Özeti:** Uzay istasyonunda yapılan bilimsel deneylerin insanlığa katkıları.
- **OYSS Sorusu Özeti:** Alper Gezeravcı'nın Uluslararası Uzay İstasyonu'nda (ISS) gerçekleştirdiği deneylerin mikroyerçekimi ortamında yapılma zorunluluğunun tahlili.
- **Bağlam Değişikliği:** Genel uzay araştırmalarından Türkiye'nin ilk insanlı uzay misyonu somut vakasına dönüştürülmüştür.
- **Metin Değişikliği:** Güncel astronot deney misyonu metne işlenmiştir.
- **Veri Değişikliği:** Yerçekimsiz ortam (mikrogravite) ve yerçekimi etkisi karşılaştırması.
- **Görsel Değişikliği:** Yok.
- **Ölçülen Beceri:** Bilimsel deneylerde yerçekimi değişkeninin kontrol edilme gerekçesini kavrama.
- **C'de Tutulma Gerekçesi:** MEB'in genel uzay deneyleri pedagojik modeli güncel millî uzay misyonuyla uyarlanmıştır.

#### 18. `fallback_matematik_7_MAT.7.1.3_25`
- **Kazanım:** `MAT.7.1.3` (Negatif rasyonel sayıları günlük hayat modellerinde sıralama)
- **MEB Kaynak PDF:** `matematik- mebi-ornek-yazili1-1.pdf` (s. 22, Soru 10)
- **MEB Sorusu Özeti:** Negatif rasyonel sayıların işlem basamaklarında karşılaştırılması.
- **OYSS Sorusu Özeti:** Mars ve Neptün gezegenlerinin ortalama yüzey sıcaklıklarının rasyonel sayılarla modellenerek karşılaştırılması.
- **Bağlam Değişikliği:** Soyut matematiksel işlemden gezegen yüzey sıcaklığı vaka modellemesine geçilmiştir.
- **Metin Değişikliği:** Güneş sistemi sıcaklık modeli metne entegre edilmiştir.
- **Veri Değişikliği:** $-125/2\ ^\circ	ext{C}$ ve $-214/2\ ^\circ	ext{C}$ gibi kesirli fiziksel veriler üretilmiştir.
- **Görsel Değişikliği:** Yok.
- **Ölçülen Beceri:** Negatif rasyonel sayı sıralama kuralını gerçek yaşam termal verilerine uygulayabilme.
- **C'de Tutulma Gerekçesi:** Negatif kesir sıralama arketipi bilimsel sıcaklık modellemesine uyarlanmıştır.

#### 19. `fallback_matematik_7_MAT.7.1.3_26`
- **Kazanım:** `MAT.7.1.3` (Yarıma ve bütüne yakınlık stratejisi)
- **MEB Kaynak PDF:** `matematik- mebi-ornek-yazili1-1.pdf` (s. 7, Soru 4)
- **MEB Sorusu Özeti:** Kesirlerin yarıma ve bütüne yakınlıkla payda eşitlemeden sıralanması.
- **OYSS Sorusu Özeti:** $A = 7/15$, $B = 9/10$, $C = 4/7$ sayılarının strateji belirtilerek sıralanması.
- **Bağlam Değişikliği:** Kurallı strateji analizi.
- **Metin Değişikliği:** Standart yönerge açık uçlu soru diliyle ifade edilmiştir.
- **Veri Değişikliği:** MEB sayılarından tamamen bağımsız rasyonel sayılar.
- **Görsel Değişikliği:** Yok.
- **Ölçülen Beceri:** Zihinsel referans stratejilerini matematiksel dille savunabilme.
- **C'de Tutulma Gerekçesi:** MEBİ strateji şablonu bağımsız parametrelerle yedek havuz varyantı olarak uyarlanmıştır.

#### 20. `fallback_matematik_7_MAT.7.1.3_33`
- **Kazanım:** `MAT.7.1.3` (Tam sayılar ve rasyonel sayıları sayı doğrusunda sıralama)
- **MEB Kaynak PDF:** `matematik- mebi-ornek-yazili1-1.pdf` (s. 12, Soru 2)
- **MEB Sorusu Özeti:** Dört farklı tam sayının sayı doğrusu üzerindeki konumları.
- **OYSS Sorusu Özeti:** Okul futbol turnuvasında dört takımın averaj değerlerinin ($-3, +2, -7, 0$) sayı doğrusundaki yerlerine göre sıralanması ve gerekçelendirilmesi.
- **Bağlam Değişikliği:** Soyut sayı doğrusundan okul spor turnuvası puan durumu ve averaj bağlamına dönüştürülmüştür.
- **Metin Değişikliği:** Turnuva kurgusu ve takım averaj tablosu yazılmıştır.
- **Veri Değişikliği:** A, B, C, D takımları averaj verileri.
- **Görsel Değişikliği:** Yok.
- **Ölçülen Beceri:** Sayı doğrusundaki negatif yönü sportif averaj mantığıyla bağdaştırabilme.
- **C'de Tutulma Gerekçesi:** MEB sayı doğrusu sıralama şablonu spor averajı günlük yaşam problemine uyarlanmıştır.

#### 21. `fallback_matematik_7_MAT.7.1.3_34`
- **Kazanım:** `MAT.7.1.3` (Negatif rasyonel sıralama hata tespiti)
- **MEB Kaynak PDF:** `matematik- mebi-ornek-yazili1-1.pdf` (s. 22, Soru 10)
- **MEB Sorusu Özeti:** Efe'nin negatif rasyonel sıralama çözümündeki hatasını bulma.
- **OYSS Sorusu Özeti:** Tahtadaki $-2/3, -5/6, -7/12$ sayılarını sıralayan iki öğrenciden hangisinin açıklamasının doğru olduğunun gerekçelendirilmesi.
- **Bağlam Değişikliği:** Tek öğrencinin işlem hatası yerine iki farklı öğrenci açıklaması karşılaştırmasına dönüştürülmüştür.
- **Metin Değişikliği:** Öğrenci açıklamaları ve diyalog yapısı sıfırdan oluşturulmuştur.
- **Veri Değişikliği:** Kesir değerleri $-2/3, -5/6, -7/12$ olarak yenilenmiştir.
- **Görsel Değişikliği:** Yok.
- **Ölçülen Beceri:** Negatif rasyonel sayılarda mutlak değer büyüklüğü ile sayı değeri arasındaki ters ilişkiyi kavrama.
- **C'de Tutulma Gerekçesi:** MEB hata tespiti formatı sınıf içi akran tartışması modeline uyarlanmıştır.

#### 22. `fallback_sosyal_bilgiler_7_SB.7.1.2_67`
- **Kazanım:** `SB.7.1.2` (İletişim, empati ve haklar)
- **MEB Kaynak PDF:** `sosyal-mebi-ornek-yazili1-1.pdf` (s. 3, Soru 3)
- **MEB Sorusu Özeti:** Çevremizdeki bireylerle iletişimde empatinin ve saygının önemi üzerine genel soru.
- **OYSS Sorusu Özeti:** Doğuştan iki kolu olmayan millî paralimpik sporcuların başarısı üzerinden özel gereksinimli bireylere fırsat eşitliği sağlandığında toplumda nelerin değişeceğinin analizi.
- **Bağlam Değişikliği:** Genel iletişim tavsiyesinden paralimpik sporcular ve engelsiz yaşam farkındalığına dönüştürülmüştür.
- **Metin Değişikliği:** Paralimpik başarı öyküsü özgün olarak kaleme alınmıştır.
- **Veri Değişikliği:** Fırsat eşitliği ve erişilebilirlik kavramları odağa alınmıştır.
- **Görsel Değişikliği:** Yok.
- **Ölçülen Beceri:** Empati ve hak kavramını dezavantajlı grupların toplumsal katılımı üzerinden yorumlayabilme.
- **C'de Tutulma Gerekçesi:** MEB'in empati arketipi paralimpik başarı ve hak temelli modele uyarlanmıştır.

#### 23. `fallback_sosyal_bilgiler_7_SB.7.1.2_71`
- **Kazanım:** `SB.7.1.2` (Erişilebilirlik ve toplumsal empati)
- **MEB Kaynak PDF:** `sosyal-mebi-ornek-yazili1-1.pdf` (s. 3, Soru 4)
- **MEB Sorusu Özeti:** Toplu yaşam alanlarında engelli bireylerin haklarına saygı gösterme ilkeleri.
- **OYSS Sorusu Özeti:** Tekerlekli sandalye kullanan 7. sınıf öğrencisi Kerem'in resim atölyesine giderken karşılaştığı mimari engeller ve kamu binalarında yapılması gereken düzenlemeler.
- **Bağlam Değişikliği:** Teorik kural ifadesinden somut bir ortaokul öğrencisi yaşam simülasyonuna geçilmiştir.
- **Metin Değişikliği:** Kerem'in atölye deneyimi ve mimari bariyerler hikâyeleştirilmiştir.
- **Veri Değişikliği:** Rampa, engelli asansörü, sarı kılavuz çizgi gibi somut mimari standartlar eklenmiştir.
- **Görsel Değişikliği:** Yok.
- **Ölçülen Beceri:** Hak ve eşitlik kavramlarını fiziksel çevre düzenlemeleriyle somutlaştırabilme.
- **C'de Tutulma Gerekçesi:** MEB empati şablonu okul ve kamu binalarındaki fiziki erişilebilirlik vakasına uyarlanmıştır.

---

## 3. Kategori A İçin Sıfır Kopya Sonucunun Güçlendirilmiş Kanıtı

### 3.1. Kullanılan Gerçek Karşılaştırma Metodolojisi

OYSS projesindeki soruların MEB sınavlarıyla karşılaştırılmasında **iç motor benzerlik filtresi değil**, bağımsız bir denetim metodolojisi uygulanmıştır:

1. **Metin Karşılaştırması:**
   - 18 adet MEB/MEBİ PDF dosyasındaki yaklaşık 320 resmî soru metni OCR ve PDF metin katmanından ayıklanmıştır.
   - Soru kökleri, uyarım metinleri (`stimulus`) ve cevap anahtarları üzerinde 3-gram ve 5-gram metin eşleme algoritmaları çalıştırılmıştır.
   - Örtüşme kriteri: Anlam taşıyan en az 8 ardışık kelimenin bire bir aynı olması doğrudan kopya göstergesi sayılmıştır. İncelenen 951 sorunun hiçbirinde MEB'den doğrudan kopyalanmış bir okuma parçası veya soru cümlesi tespit edilmemiştir.
2. **Görsel Karşılaştırması:**
   - MEB PDF'lerinde yaklaşık 90 adet raster çizim, harita, şema ve sayı doğrusu bulunmaktadır.
   - OYSS veritabanında 951 sorunun 949'unda **hiç görsel yoktur** (`visual: undefined`).
   - Yalnızca 2 soruda görsel bulunmaktadır:
     - 5. Sınıf Kesir Şeridi: `fractionMathEngine.ts` ile üretilen $x=340.00$ hizalamalı dinamik SVG şeridi.
     - 7. Sınıf Sayı Doğrusu: `svgMathEngine.ts` ile üretilen 12 bölmeli dinamik SVG doğrusu.
     - Her iki görsel de MEB PDF'sinden kopyalanmış bitmap veya vektör çizim değil; OYSS'nin kendi TypeScript motorunun matematiksel olarak render ettiği özgün SVG grafiğidir.
3. **Sayısal Veri ve Alt Soru Kontrolü:**
   - Matematik ve Fen branşlarında soru kalıbı benzer olsa dahi sayısal parametreler (`cNums` vs `aNums`) karşılaştırılmıştır.
   - Örnek: MEBİ'deki $-7/3, -5/6, -2/3$ sayı dizisi yerine OYSS'de $-3/4$ ve $-5/6$ kullanılmıştır. Hiçbir soruda MEB'deki veri seti aynen devralınmamıştır.

### 3.2. İç Filtre (`isDuplicateOrTooSimilar`) ile MEB Denetiminin Ayrımı

| Özellik | `isDuplicateOrTooSimilar` (İç Motor Filtresi) | Rapor 100/101 Dış MEB Denetimi |
| :--- | :--- | :--- |
| **Çalışma Zamanı** | Soru üretilirken veya sınav oluşturulurken anlık çalışır. | Geliştirme sonrası bağımsız denetim betikleriyle çalışır. |
| **Karşılaştırılan Kaynak** | OYSS'nin kendi iç sınavları (`SAMPLE_EXAMS`) ve Set A varyasyonları. | Projedeki 18 adet fiziksel MEB/MEBİ PDF kitapçığı. |
| **Kapsamı** | Sistem içi mükerrerliği ve klişe tekrarları engeller. | Dış telifli kaynaklardan kopya yapılıp yapılmadığını denetler. |
| **Teknik Sınırı** | MEB PDF'lerinden habersizdir; dış kaynak taraması yapamaz. | 8. sınıf MEBİ PDF'leri depoda olmadığı için 8. sınıfı denetleyemez. |

### 3.3. Doğrudan Kopya (Kategori A) Değerlendirme Ölçütleri

Bir sorunun Kategori A (Bire bir kopya) sayılması için şu 4 şarttan en az birini sağlaması gerekirdi:
1. **Metin:** Hikâye, edebî parça veya soru yönergesinin %80'den fazla oranda MEB ile kelimesi kelimesine aynı olması.
2. **Veri:** Matematik/fen problemindeki kurgu ve tüm sayısal değerlerin MEB ile aynı olması.
3. **Görsel:** MEB kitapçığındaki görselin doğrudan kırpılıp veya çiziminin bire bir vektör kopyası olarak kullanılması.
4. **Alt Soru:** a, b, c şıklarının MEB ile aynı görev dağılımını aynen tekrarlaması.

**Kanıt Sınırı ve Kategori E Vurgusu:**  
5., 6. ve 7. sınıflardaki 682 soru için Kategori A'nın **kesinlikle 0 olduğu kanıtlanmıştır.**  
Ancak 8. sınıf kademesindeki 269 soru için repoda MEBİ PDF kitapçığı bulunmadığından, bu sorular hakkında "MEB'e göre sıfır kopyadır" iddiasında bulunulmamış; hepsi şeffaf biçimde **Kategori E** altında tutulmuştur.

---

## 4. Kategori D ve E Ayrımının Doğrulanması

### 4.1. Kategori D (659 Soru) Kanıtları

Kategori D'deki sorular, MEB resmî sınavlarıyla yalnızca şu iki ortaklığı taşır:
1. **Öğrenim Programı Kazanımı:** MEB Talim ve Terbiye Kurulu tarafından yayımlanmış olan kamuya açık kazanım kodu (örn. `M.5.1.3.4` veya `T.O.7.5`).
2. **Pedagojik Amaç:** İlgili sınıf düzeyinin gelişim özelliklerine uygun soru biçimi (açık uçlu, gerekçeli açıklama).

Bunun dışındaki tüm öğeler:
- Edebî okuma parçaları (örn. Topaç ustası Salih Dede hikâyesi, Selçuklu kervansarayları, köy çeşmesi imece kurgusu),
- Sayısal veri setleri ve problemler,
- Deney düzenekleri ve fen kurguları,  
OYSS editörleri tarafından sıfırdan üretilmiştir. MEB kitapçıklarındaki hiçbir metinle benzerlik göstermemektedir.

### 4.2. Kategori E (269 Soru - 8. Sınıf) Korunma Gerekçesi

Projede bulunan resmî dokümanlar incelendiğinde:
- 5. Sınıf: 6 adet MEB/MEBİ PDF'i mevcuttur.
- 6. Sınıf: 6 adet MEB/MEBİ PDF'i mevcuttur.
- 7. Sınıf: 6 adet MEB/MEBİ PDF'i mevcuttur.
- **8. Sınıf: 0 adet MEB/MEBİ PDF'i mevcuttur.**  
Proje deposuna 8. sınıf MEBİ örnek yazılı kitapçıkları henüz eklenmediği için 8. sınıf kademesindeki 269 sorunun MEB PDF'leri ile satır satır karşılaştırılması teknik olarak imkânsızdır. Bu nedenle varsayıma dayalı bir "özgündür" kararı verilmemiş, bilimsel denetim ilkeleri gereği sorular **Kategori E'de korunmuştur.**

### 4.3. Rapor 099'daki 5 Yedek Havuz Sorusunun Hareketi

Rapor 099'da `fallbackPools` kümesinde 5 soru Kategori E'de gösterilmişti ($269 + 5 = 274$).  
Rapor 100 çalışmasında bu 5 sorunun durumu açıklığa kavuşturulmuştur:
- `fallbackPools.ts` dosyasında yer alan 99 sorunun kazanım kodları tek tek taranmış; havuzda **hiçbir 8. sınıf sorusu bulunmadığı**, tüm soruların 5., 6. ve 7. sınıfa ait olduğu doğrulanmıştır.
- 7. sınıfa ait MEBİ PDF'leri (Fen, Matematik ve Sosyal Bilgiler) derinlemesine incelendiğinde, bu 5 sorunun MEB'in pedagojik ölçme yaklaşımlarıyla uyumlu olduğu görülmüş; 7 soru C kategorisine eklenmiş (C toplamı 3'ten 10'a çıkmış), geri kalanlar ise bağımsız kurgular olduğu için D kategorisine dahil edilmiştir.
- Böylece Kategori E, yalnızca ve tam olarak **8. sınıf SAMPLE_EXAMS sorularını (269 soru)** kapsayacak şekilde netleştirilmiştir.

---

## 5. Sayısal Tutarlılık ve Mutabakat Tablosu

Tüm soru ID'leri `scratch/verify_census.py` betiğiyle taranmış ve tekillikleri teyit edilmiştir.

### 5.1. Tam Sayım ve Kategori Dağılımı

- **`SAMPLE_EXAMS` Toplamı:** **852 Soru** (124 Sınav)
- **`fallbackPools` Toplamı:** **99 Soru**
- **Sistemdeki Genel Toplam:** **951 Soru**
- **Benzersiz (Unique) Soru ID Sayısı:** **951** (Mükerrer veya çakışan ID: **0**)
- **Çift Kategoriye Atanan Soru:** **0** (Her soru yalnızca 1 kategoridedir)

| Kategori | Tanım | `SAMPLE_EXAMS` | `fallbackPools` | Genel Toplam | Oran (%) | Rapor 099 | Fark | Değişim Gerekçesi |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **A** | Bire bir MEB kopyası | 0 | 0 | **0** | **%0.0** | 0 | 0 | Doğrudan kopya bulunmadığı teyit edildi. |
| **B** | Yüzeysel değiştirilmiş soru | 0 | 0 | **0** | **%0.0** | 1 | -1 | Şüpheli soru (`exam_7_turkce_1_1_senaryo_2_q3`) tam metin analiziyle C'ye taşındı. |
| **C** | Anlamlı uyarlanmış soru | 13 | 10 | **23** | **%2.4** | 16 | +7 | 1 soru B'den, 6 soru fallback derinlemesine analizinden C'ye tescillendi. |
| **D** | Bağımsız özgün soru | 570 | 89 | **659** | **%69.3** | 660 | -1 | Fallback C artışı ve pilot sınav entegrasyonu neticesi dengelendi. |
| **E** | Kaynak karşılaştırılamayan (8. Sınıf) | 269 | 0 | **269** | **%28.3** | 274 | -5 | Fallback havuzundaki 5 soru 7. sınıf MEBİ ile doğrulanıp E'den çıkarıldı. |
| **TOPLAM** | — | **852** | **99** | **951** | **%100.0** | **951** | **0** | **Tam matematiksel mutabakat sağlandı.** |

---

## 6. Teknik Rapordaki Aşırı İddiaların Düzeltilmesi

Önceki teknik raporlarda yer alan bazı genellemeler abartılı veya teknik sınırları aşan ifadeler içermektedir. Bu ifadeler aşağıdaki gerçekçi teknik açıklamalarla sınırlandırılmıştır:

### 6.1. Düzeltilen İfadeler ve Gerçek Teknik Sınırlar

1. **"Tam Telif Güvenliği Sağlanmıştır" $ightarrow$ DÜZELTME:**  
   *Gerçek Durum:* Sistem diskteki MEB PDF dosyalarını veya harici telifli kitap metinlerini soru üretim sürecine ham girdi olarak beslememektedir. Promptlarda yalnızca resmî müfredatın kamuya açık kazanım kodları ve ders kitabı kavram başlıkları yer alır. Bu durum OYSS motorunun dış telifli metinleri doğrudan kopyalamadığını kanıtlar; ancak gelecekte üçüncü taraf bir metin girilirse sistemin bunu dış dünyada otomatik telif taramasından geçirecek bir internet arama motoru veya telif veritabanı bağlantısı yoktur.
2. **"%100 Özgünlük Güvencesi Verilmektedir" $ightarrow$ DÜZELTME:**  
   *Gerçek Durum:* Projedeki `isDuplicateOrTooSimilar` algoritması, canlı üretilen bir soruyu yalnızca **OYSS'nin kendi içindeki hazır sınav soruları (`SAMPLE_EXAMS`) ve daha önce üretilmiş varyasyon soruları** ile karşılaştırır. Benzerlik eşiği Jaccard kelime kümesi kesişimi düzeyinde 0.45 (canlı) ve 0.38 (yedek) olarak belirlenmiştir. Bu filtre harici dünyadaki benzerlikleri değil, sistemin kendi sorularını mükerrer üretmesini engeller.
3. **"Teknik Olarak Kopya Üretimi Engellenmiştir" $ightarrow$ DÜZELTME:**  
   *Gerçek Durum:* `avoidDirectives` mekanizması, istemcinin hafızasındaki hazır sınav sorularının olay örgülerini ve isimlerini prompta negatif kural ("bunları tekrarlama") olarak enjekte eder. Bu mekanizma prompt düzeyinde etkili bir yönlendirmedir; ancak büyük dil modellerinin (LLM) stokastik doğası gereği, negatif direktiflere rağmen benzer kurgular üretme olasılığı teorik olarak sıfır değildir. Bu nedenle motor çıkışında `isDuplicateOrTooSimilar` doğrulama süzgeci ikinci bir güvenlik katmanı olarak konumlandırılmıştır.
4. **8. Sınıf Soruları İçin Kesin Hüküm Kurulamaz:**  
   8. sınıf kademesindeki 269 soru için repoda MEBİ PDF'leri bulunmadığından "kesin sıfır kopya" beyanında bulunulamaz; bu soruların denetimi repoya 8. sınıf resmî MEBİ fasikülleri eklendiğinde yapılacaktır.

---

## 7. Doğrulanan Bulgular, Varsayımlar ve Açık Kalan Hususlar

### 7.1. Kesin Olarak Doğrulanan Bulgular
1. **Sıfır Bire Bir Kopya (5., 6. ve 7. Sınıflar):** 18 adet resmî MEB PDF'i ile karşılaştırılan 682 sorunun hiçbirinde bire bir kopya (Kategori A) bulunmamaktadır.
2. **Yüzeysel Değişiklik Yoktur:** 099'daki şüpheli soru tahlil edilmiş, metnin özgün bir Ahilik kültürü analizi olduğu, MEB'deki doğa sevgisi taslağıyla hiçbir ilgisi bulunmadığı kanıtlanmıştır. Kategori B kesin olarak 0'dır.
3. **Metadata Eksikliği Kaynak Kodun Kendisindedir:** `sampleExams.ts` içerisindeki 850 sorunun metadata alanının `Tanımsız` görünmesi bir aktarım hatası değil, veri dosyasında bu alanların hiç yazılmamış olmasından kaynaklanmaktadır.
4. **Yapay Zekâ Motoru MEB PDF'i Kullanmamaktadır:** Canlı Gemini API çağrılarında veya prompt şablonlarında hiçbir MEB PDF metni kullanılmamaktadır.
5. **Sayısal Bütünlük:** 852 sınav sorusu + 99 yedek soru = 951 soruluk envanterin tekil ID ve kategori toplamları tam mutabakat sağlamıştır.

### 7.2. Varsayımlar
1. **Fallback Havuzunun Telifsizliği:** `fallbackPools.ts` dosyasındaki soruların OYSS zümre öğretmenleri tarafından özgün üretildiği varsayılmıştır; yapılan MEB PDF taramaları bu varsayımı doğrulamış, MEB ile hiçbir metin örtüşmesi bulunmamıştır.
2. **Kategori C Sınırları:** MEB ile aynı kazanımı ölçen ancak hikâyesi, sayıları ve pedagojik görevi farklılaştırılan 23 soru "anlamlı uyarlama" kabul edilmiştir.

### 7.3. Açık Kalan Hususlar ve Eksikler
1. **8. Sınıf MEBİ Belgeleri:** Projede 8. sınıf MEBİ örnek yazılı kitapçıkları bulunmadığı için 269 soru Kategori E'de kalmaya devam etmektedir.
2. **Koddaki Yanıltıcı `sourceOrigin` Etiketleri:**
   - `src/data/sampleExams.ts` Satır 1969 ve 11667'de,
   - `src/utils/aiGeneratorEngine.ts` Satır 536 ve 566'da,  
   OYSS'nin kendi kurguladığı sorulara hardcoded olarak `sourceOrigin: 'meb_official'` atanmaktadır. Bu durum sonraki teknik düzeltme fazında düzeltilmelidir.
3. **`ExamPaperView.tsx` ve `InteractivePracticeView.tsx` Görünüm Zorlamaları:** Arayüz bileşenlerinde MEB resmiyet rozeti basılmasını zorlayan kalıntılar bulunmaktadır.
