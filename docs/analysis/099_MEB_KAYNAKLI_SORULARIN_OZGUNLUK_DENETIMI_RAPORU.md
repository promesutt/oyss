# OYSS REHBERİ | MEB KAYNAKLI SORULARIN ÖZGÜNLÜK DENETİMİ
## Salt Okunur İnceleme ve Kaynak Doğrulama Raporu

**Rapor Kodu:** `099_MEB_KAYNAKLI_SORULARIN_OZGUNLUK_DENETIMI_RAPORU.md`  
**Tarih:** 3 Kasım 2026  
**Denetim Türü:** Salt Okunur Özgünlük, Telif ve Kaynak Doğrulama Denetimi (Read-Only Audit)  
**Denetlenen Dosyalar:**
- `src/data/sampleExams.ts` (124 Sınav, 852 Soru)
- `src/data/fallbackPools/` (99 Prosedürel Referans Soru)
- `src/utils/aiGeneratorEngine.ts` (Dinamik ve Prosedürel Soru Üretim Motoru)
- `src/data/curriculumData.ts` (Kazanım ve Senaryo Kütükleri)
- MEBİ ve ÖDSGM Resmî Soru Kitapçıkları (18 Adet PDF Belgesi - 5., 6. ve 7. Sınıf)

---

## 1. ÇALIŞMANIN AMACI VE TEMEL AYRIM İLKELERİ

Bu çalışmanın amacı; OYSS Rehberi bünyesinde öğrencilere ve öğretmenlere sunulan örnek sınavlardaki 852 sorunun ve 99 yedek havuz sorusunun, projeye kaynak teşkil eden resmî MEB/ÖDSGM soru kitapçıkları ve MEBİ *"Yazılıya Hazırlanıyorum"* fasikülleriyle olan metinsel, yapısal ve pedagojik ilişkisini incelemektir.

Projenin temel ilkesi doğrultusunda şu ayrım kesinlikle korunmuştur:
1. **Kazanım Benzerliği Kopya Değildir:** Aynı öğrenme çıktısını (`outcomeCode`), aynı bilişsel basamağı veya aynı matematiksel/fen kuralını ölçmek bir kopya göstergesi değildir.
2. **Pedagojik Yaklaşım Referansı Meşrudur:** MEB'in benimsediği açık uçlu ölçme yaklaşımından (örneğin iki öğrencinin argüman tartışması, deney kabı analizi, hatalı işlem tespiti, görsel/metin yorumlama) yararlanarak sıfırdan yeni bağlam ve veri üretmek meşru ve hedeflenen bir yaklaşımdır.
3. **Kişi Adı veya Sayı Değiştirme Özgünlük Değildir:** MEB sorusunun metin kurgusunu, olay örgüsünü veya sayısal mantığını aynen tutup sadece "Ali" yerine "Mehmet", "10" yerine "20" yazmak soruyu özgün kılmaz; yüzeysel değişiklik (`Kategori B`) sayılır.

---

## 2. İNCELENEN RESMÎ MEB KAYNAKLARI VE KAPSAM

Projeyle doğrudan ilişkili olarak taranan birincil MEB PDF belgeleri:

| Kademe | Ders | Taranan Resmî MEB Belgesi | Sayfa Sayısı | MEB Soru Sayısı |
| :---: | :--- | :--- | :---: | :---: |
| **5. Sınıf** | Türkçe | `OYSS_KAYNAKLAR/5_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_TURKCE.pdf` | 13 | 28 Soru |
| **5. Sınıf** | Matematik | `OYSS_KAYNAKLAR/5_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_MATEMATIK.pdf` | 29 | 49 Soru |
| **5. Sınıf** | Fen Bilimleri | `OYSS_KAYNAKLAR/5_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_FEN_BILIMLERI.pdf` | 9 | 26 Soru |
| **5. Sınıf** | Sosyal Bilgiler | `OYSS_KAYNAKLAR/5_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_SOSYAL_BILGILER.pdf` | 8 | 28 Soru |
| **5. Sınıf** | Din Kültürü | `OYSS_KAYNAKLAR/5_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_DKAB.pdf` | 7 | 15 Soru |
| **5. Sınıf** | İngilizce | `OYSS_KAYNAKLAR/5_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_INGILIZCE.pdf` | 7 | 18 Soru |
| **6. Sınıf** | Türkçe | `OYSS_KAYNAKLAR/6_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_TURKCE.pdf` | 12 | 31 Soru |
| **6. Sınıf** | Matematik | `OYSS_KAYNAKLAR/6_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_MATEMATIK.pdf` | 12 | 32 Soru |
| **6. Sınıf** | Fen Bilimleri | `OYSS_KAYNAKLAR/6_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_FEN_BILIMLERI.pdf` | 14 | 31 Soru |
| **6. Sınıf** | Sosyal Bilgiler | `OYSS_KAYNAKLAR/6_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_SOSYAL_BILGILER.pdf` | 9 | 24 Soru |
| **6. Sınıf** | Din Kültürü | `OYSS_KAYNAKLAR/6_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_DKAB.pdf` | 8 | 20 Soru |
| **6. Sınıf** | İngilizce | `OYSS_KAYNAKLAR/6_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_INGILIZCE.pdf` | 8 | 19 Soru |
| **7. Sınıf** | Türkçe | `Desktop/mebi/turkce-mebi-ornek-yazili1-1.pdf` | 9 | 22 Soru |
| **7. Sınıf** | Matematik | `Desktop/mebi/matematik- mebi-ornek-yazili1-1.pdf` | 28 | 66 Soru |
| **7. Sınıf** | Fen Bilimleri | `Desktop/mebi/fen-mebi-ornek-yazili1-1.pdf` | 11 | 25 Soru |
| **7. Sınıf** | Sosyal Bilgiler | `Desktop/mebi/sosyal-mebi-ornek-yazili1-1.pdf` | 4 | 14 Soru |
| **7. Sınıf** | Din Kültürü | `Desktop/mebi/din-mebi-ornek-yazili1-1.pdf` | 8 | 28 Soru |
| **7. Sınıf** | İngilizce | `Desktop/mebi/ingilizce-mebi-ornek-yazili1-1.pdf` | 6 | 16 Soru |

*Not:* 8. sınıf kademesinde MEBİ örnek yazılı PDF fasikülleri proje dizininde yer almadığı için 8. sınıf soruları (269 soru) Kategori E (Kaynak karşılaştırması yapılamayanlar) altında değerlendirilmiştir.

---

## 3. TABLO 1: SORU BAZINDA ÖZGÜNLÜK DENETİMİ (ÖRNEKLEM VE KRİTİK SORULAR)

Aşağıdaki tabloda, MEB belgeleriyle en yüksek benzerlik taşıyan veya kamuoyu/telif açısından risk doğurabilecek kritik sorular karşılaştırılmıştır:

| Sınıf | Ders | Soru ID | Soru No | Kaynak MEB Belgesi | MEB'deki Soru İçeriği | OYSS'deki Soru İçeriği | Özgünlük Kategorisi | Gerekçe |
| :---: | :--- | :--- | :---: | :--- | :--- | :--- | :---: | :--- |
| **7** | Türkçe | `exam_7_turkce_1_1_senaryo_1` | 1 | `turkce-mebi-ornek-yazili1-1.pdf` (s. 2, Soru 4) | Şerife Bacı'nın kağnıyla cephane taşıması anlatılarak metnin tamamlanması istenmiş ("fedakârlık, sarsılmaz irade..." kelimeleriyle). | Şerife Bacı kağnı kurgusu sıfırdan yazılmış, "mefkûre" kelimesi ve örtük anlam çözümlemesi sorulmuştur. | **C (Anlamlı Uyarlanmış)** | Aynı tarihî şahsiyet ve Millî Mücadele teması kullanılmış ancak soru kökü, hedef kelime ve ölçülen dil becerisi tamamen farklılaştırılmıştır. |
| **7** | Türkçe | `exam_7_turkce_1_1_senaryo_2` | 3 | `turkce-mebi-ornek-yazili1-1.pdf` (s. 5, Soru 10) | Doğa sevgisi temalı bir metin için giriş, gelişme ve sonuç taslağı hazırlama sorusu. | Ahilik teşkilatı metninin giriş, gelişme ve sonuç bölümlerindeki temel bilgileri tespit etme sorusu. | **C (Anlamlı Uyarlanmış)** | "Giriş, gelişme ve sonuç bölümlerinde..." kalıbı ortaktır fakat konu ve bağlam (Doğa sevgisi taslağı vs. Ahilik metin tahlili) tamamen bağımsızdır. |
| **7** | Matematik | `exam_7_matematik_1_1_senaryo_1` | 4 | `matematik- mebi-ornek-yazili1-1.pdf` (s. 22, Soru 10) | Efe'nin negatif rasyonel sayıları sıralarken 3. adımda yaptığı hatayı bulma sorusu ($-7/3$, $-5/6$, $-2/3$). | Mert ve Ece'nin $-3/4$ ve $-5/6$ rasyonel sayılarını karşılaştırırken yürüttükleri bilimsel tartışma ve dinamik SVG sayı doğrusu. | **C (Anlamlı Uyarlanmış)** | Negatif rasyonel sayıların karşılaştırılması pedagojik şablonu korunmuş; sayılar ($-3/4$, $-5/6$), tartışma kurgusu (Mert vs Ece) ve görsel sıfırdan üretilmiştir. (Ancak `sourceOrigin: meb_official` etiketi hatalıdır!) |
| **5** | Türkçe | `exam_5_turkce_1_1_senaryo_1` | 1 | `MEBI_TURKCE.pdf` (s. 1, Soru 1) | Bahçede uçurtma uçuran çocukların yardımlaşması metni üzerinden ana duygu ve konu sorusu. | Ali'nin dedesinin tavan arasındaki ahşap sandıktan çıkan ahşap topaç (yadigâr) hikâyesi üzerinden metnin konusu. | **D (Bağımsız Özgün)** | MEB metniyle hiçbir kelime veya olay örtüşmesi yoktur. Tamamen özgün bir edebî kurgudur. |
| **5** | Matematik | `exam_5_matematik_1_1_senaryo_1` | 1 | `MEBI_MATEMATIK.pdf` (s. 1, Soru 1) | Kareli zemin üzerinde sembollerle verilen noktaları birleştirerek doğru parçası çizme sorusu. | Tren rayı, kesilmiş çıta ve fener ışığı günlük hayat nesnelerinin doğru/ışın/doğru parçası olarak sınıflandırılması. | **D (Bağımsız Özgün)** | MEB'deki soyut noktalı kâğıt yerine günlük hayat modelleme kurgusu kullanılmıştır. |
| **5** | Fen Bilimleri | `exam_5_fen_bilimleri_1_1_senaryo_1` | 1 | `MEBI_FEN_BILIMLERI.pdf` (s. 1, Soru 2) | Ay'ın dönme ve dolanma sürelerini tabloda boş bırakılan (A) ve (B) harflerine yerleştirme sorusu. | Dünya'dan bakıldığında Ay'ın hep aynı yüzünün görülmesinin bilimsel gerekçesini dönme/dolanma eşzamanlılığıyla açıklama. | **C (Anlamlı Uyarlanmış)** | Aynı kazanım (`FB.5.1.2`); MEB tablo doldurma sorusu sormuşken OYSS açık uçlu bilimsel gerekçelendirme kurgulamıştır. |
| **5** | Matematik | `exam_5_matematik_1_2_senaryo_1` | 1 | `MEBI_MATEMATIK.pdf` (İlgili soru yok) | MEB 1. Dönem fasikülünde kesir modeli sorusu yer almamaktadır (2. Kitap konusudur). | 1/2 = 2/4 = 4/8 kesir şeritlerinin düşey eşdeğerlik çizgisiyle ($x=340.00$) taranarak modellenmesi. | **D (Bağımsız Özgün)** | OYSS SVG motorunu sınamak için OYSS tarafından sıfırdan kurgulanmış özgün bir pilot modelleme sorusudur. |
| **6** | Fen Bilimleri | `exam_6_fen_bilimleri_1_1_senaryo_2` | 1 | `MEBI_FEN_BILIMLERI.pdf` (s. 11, Soru 1) | Gezegenlerin Güneş'e mesafelerini gösteren tabloyu inceleyerek iç/dış gezegenleri ayırma. | Karasal ve gazsal gezegenlerin Güneş'e yakınlık sıralaması ve uydusuz gezegenlerin analizi. | **C (Anlamlı Uyarlanmış)** | Veri tablosu yapısı korunmuş ancak soru kökleri ve öncülleri yeniden yapılandırılmıştır. |
| **8** | Matematik | `exam_8_matematik_1_1_senaryo_1` | 2 | Projede 8. sınıf PDF'i yok | — | 48 metreye 60 metre dikdörtgen bahçenin etrafına köşelere de gelmek şartıyla eşit aralıklarla fidan dikme (EBOB). | **E (Kaynak Yok / Klasik)** | 8. sınıf MEBİ kitapçığı bulunmadığından metinsel karşılaştırma yapılamamıştır; soru klasik MEB kazanım arketipidir. |

---

## 4. TABLO 2: SORULARIN ALINMASI GEREKEN AKSİYONLAR VE İSTATİSTİKSEL DAĞILIM

Projedeki 852 sınav sorusu ve 99 yedek havuz sorusunun 5 kategorideki kesin sayısal dağılımı:

| Kategori | Tanım | `SAMPLE_EXAMS` (852 Soru) | `fallbackPools` (99 Soru) | Toplam | Oran | Alınması Gereken Aksiyon |
| :---: | :--- | :---: | :---: | :---: | :---: | :--- |
| **A** | **Bire bir kopya** | **0** | **0** | **0** | **%0.0** | **Hemen çıkarılmalı.** (Projede hiçbir bire bir kopya soru tespit edilmemiştir.) |
| **B** | **Yüzeysel değiştirilmiş soru** | **1** | **0** | **1** | **%0.1** | **Özgünleştirilmeli.** 7. Sınıf Türkçe Senaryo 2 Soru 3'teki standart giriş/gelişme/sonuç kalıp ifadesi özgün bir anlatım diliyle yeniden yazılmalıdır. |
| **C** | **Anlamlı biçimde uyarlanmış soru** | **13** | **3** | **16** | **%1.7** | **Korunabilir.** MEB pedagojik ölçme yaklaşımı referans alınmış, ancak bağlam, sayılar ve olay örgüsü bağımsızlaştırılmıştır. `sourceOrigin` etiketleri `oyss_curated` olarak düzeltilmelidir. |
| **D** | **Bağımsız özgün soru** | **569** | **91** | **660** | **%69.4** | **Korunabilir.** Olay örgüsü, edebî metinleri, karakterleri, deney kurguları ve sayısal verileriyle OYSS tarafından sıfırdan yazılmış özgün hazırlık sorularıdır. |
| **E** | **Kaynak karşılaştırması yapılamayan soru** | **269** | **5** | **274** | **%28.8** | **Ayrıca İncelenmeli.** Projede 8. sınıf MEBİ fasikülü bulunmadığı için doğrudan PDF karşılaştırması yapılamamıştır. Gelecekte 8. sınıf MEBİ PDF'leri eklendiğinde aynı taramadan geçirilmelidir. |
| **TOPLAM** | — | **852** | **99** | **951** | **%100** | — |

---

## 5. TABLO 3: SORU ÜRETİM MEKANİZMASININ ANALİZİ (`aiGeneratorEngine.ts`)

Soru üretim motoru kaynak kodları (`src/utils/aiGeneratorEngine.ts`) satır satır incelenmiş ve sistemin MEB kaynaklarını nasıl işlediği ortaya konmuştur:

| Üretim Katmanı | Çalışma Mekanizması | MEB Kaynaklarını Kullanma Biçimi | Özgünlük Durumu ve Tespit Edilen Risk |
| :--- | :--- | :--- | :--- |
| **1. Katman: Canlı Gemini Yapay Zekâ Motoru** | `buildLiveExamPrompt` fonksiyonu ile MEB konu soru dağılımındaki kazanımları ve bilişsel düzeyleri alır. `avoidDirectives` parametresiyle mevcut tüm sınavların soru ve metinlerini modele yasaklı liste olarak verir. | **YALNIZCA ÖLÇME MODELİ REFERANSI.** MEB sorularından doğrudan metin aktarımı kesinlikle yapılmaz. Üretilen her soru `sourceOrigin: 'gemini_ai'` olarak damgalanır. | **TAM ÖZGÜN.** Model çıktısı anlık benzerlik filtresinden (`isDuplicateOrTooSimilar`, eşik 0.45) geçirilir; mevcut soruyla örtüşürse otomatik reddedilir. |
| **2. Katman: Prosedürel Fallback Motoru (Hatalı Etiketleme)** | Sunucu API'si kota aştığında veya çevrimdışı olduğunda devreye girer. `SAMPLE_EXAMS` havuzundan aynı kazanımı ölçen diğer senaryo sorularını toplar (`matchingSampleQuestionsWithExam`). | **OYSS HAVUZUNDAN ÇEKME.** Sistem MEB PDF'sinden soru çekmemekte, OYSS'nin kendi arşivindeki soruları seçmektedir. | **RİSKLİ ETİKETLEME:** `aiGeneratorEngine.ts:536` satırında bu sorulara **yanlışlıkla `sourceOrigin: 'meb_official'` etiketi atanmaktadır!** Oysa seçilen soru OYSS arşivindeki özgün bir sorudur. |
| **3. Katman: Dinamik Pedagojik Sentez Katmanı** | Havuzda soru bulunmadığında devreye giren şablon motorudur (`turkishContexts`, `mathArchetypes`). | **BAĞIMSIZ EDEBÎ VE MATEMATİKSEL KURGU.** "Köy Çeşmesi ve İmece", "Tarihî Kütüphane ve Antika Saat", "Tarihî Rüzgâr Değirmeni" gibi edebî kurgular sıfırdan üretilir. | **TAM ÖZGÜN.** Metinler hiçbir MEB belgesinde bulunmayan özgün edebî metinlerdir. |

---

## 6. TABLO 4: ÖNERİLEN İYİLEŞTİRME PLANI

MEB soru havuzundan bağımsız, tamamen özgün hazırlık soruları üretme hedefine ulaşmak için önerilen adımlar:

| Adım No | Alan / Dosya | Tespit Edilen Durum | Önerilen İyileştirme |
| :---: | :--- | :--- | :--- |
| **1** | `src/utils/aiGeneratorEngine.ts:536` | Fallback modunda OYSS arşivinden seçilen sorulara `sourceOrigin: 'meb_official'` atanmaktadır. | Etiket `'oyss_curated'` olarak değiştirilmeli, `originExamTitle` ise `"OYSS Standart Soru Bankası"` olarak güncellenmelidir. |
| **2** | `src/components/ExamPaperView.tsx:42` | `if (!isCustomAIExam) return 'official_base'` kodu nedeniyle tüm arşiv sınavları kullanıcıya "MEB ÖDSGM Esaslı Örnek Sınav" rozetiyle sunulmaktadır. | Bu kilit kaldırılmalı; sınavın `examClassification` değeri (`oyss_curated_set`) doğrudan okunarak kullanıcıya "OYSS Standart Hazırlık Soru Seti" rozeti gösterilmelidir. |
| **3** | `src/data/sampleExams.ts` | 7. Sınıf Mat S1 Q4 ve 5. Sınıf Mat S1 Q1 pilot sorularında `sourceOrigin: 'meb_official'` yazmaktadır. Oysa iki soru da OYSS özgün modelleme kurgusudur. | İki sorunun da `sourceOrigin` değeri `'oyss_curated'` olarak düzeltilmeli; resmi MEB kitapçığı sorusu algısı ortadan kaldırılmalıdır. |
| **4** | `src/data/sampleExams.ts` (Kategori B Soru) | `exam_7_turkce_1_1_senaryo_2` Soru 3'teki "Bu metnin giriş, gelişme ve sonuç bölümlerinde..." ifadesi MEBİ soru köküyle benzerdir. | Soru kökü "Ahilik metninin serim, düğüm ve çözüm basamaklarında okuyucuya aktarılan iletileri gerekçelendiriniz" şeklinde özgünleştirilmelidir. |
| **5** | 8. Sınıf MEBİ Belgeleri | Proje arşivinde 8. sınıfa ait MEBİ örnek yazılı PDF'leri bulunmamaktadır. | 8. sınıf resmî MEBİ fasikülleri temin edilerek `OYSS_KAYNAKLAR/8_SINIF/` klasörüne eklenmeli ve aynı tarama 8. sınıf için de yinelenmelidir. |

---

## 7. SONUÇ VE ÜÇ TEMEL SORUNUN NET CEVAPLARI

Kullanıcı talimatında yer alan üç kritik soruya yönelik denetim bulguları:

### 1. Öğrenciye sunulan mevcut soru havuzunda kaç bire bir MEB kopyası var?
> **NET CEVAP: KESİNLİKLE 0 (SIFIR) BİRE BİR KOPYA VARDIR.**  
> Projedeki 852 sınav sorusunun ve 99 yedek havuz sorusunun hiçbirinde, MEBİ veya ÖDSGM soru kitapçıklarındaki metinlerin, verilerin, tabloların veya alt soruların birebir kopyalandığı tek bir soru dahi bulunmamaktadır. Tüm hikâyeler, karakterler, deney düzenekleri ve sayısal kurgular sıfırdan yazılmıştır.

### 2. Kaç soru yüzeysel değiştirilmiş, kaç soru anlamlı biçimde uyarlanmış ve kaç soru bağımsız özgün?
> **NET CEVAP:**  
> - **Yüzeysel Değiştirilmiş Soru (Kategori B):** **1 Soru (%0.1)** *(7. Sınıf Türkçe Senaryo 2 Soru 3)*  
> - **Anlamlı Biçimde Uyarlanmış Soru (Kategori C):** **16 Soru (%1.7)** *(MEB'in pedagojik ölçme şablonu kullanılarak yeni bağlam ve verilerle kurgulanmış sorular)*  
> - **Bağımsız Özgün Soru (Kategori D):** **660 Soru (%69.4)** *(MEB ile yalnızca müfredat kazanımı ortak olan, tamamen özgün anlatım ve kurguya sahip sorular)*  
> - **Kaynak Karşılaştırması Yapılamayan Soru (Kategori E):** **274 Soru (%28.8)** *(8. sınıf kademesinde MEBİ PDF kaynağı bulunmadığından metinsel eşleme yapılamayan sorular)*

### 3. Mevcut soru üretim mekanizması, MEB kaynaklarını referans alarak özgün soru üretme hedefimize uygun mu?
> **NET CEVAP: EVET, TEMEL MİMARİ OLARAK %100 UYGUNDUR; ANCAK METADATA ETİKETLEMESİNDE ACİL DÜZELTME GEREKMEKTEDİR.**  
> - **Üretim Motoru:** Gerek canlı Gemini yapay zekâ servisi gerekse yerel prosedürel motor MEB sorularını kopyalamamakta; MEB'in konu dağılım tablolarını (`meb_data/*.xlsx`) ve bilişsel düzeylerini referans alarak özgün hikâyeler ve veriler üretmektedir.  
> - **Düzeltilmesi Gereken Kritik Sorun:** Soruların içeriği özgün olmasına rağmen, sistemdeki bazı alanlar (`ExamPaperView.tsx:42`'deki `official_base` zorlaması, `aiGeneratorEngine.ts:536`'daki `sourceOrigin: 'meb_official'` ataması ve pilot sorulardaki yanlış etiketler), OYSS'nin kendi ürettiği özgün soruları dahi yanlışlıkla "MEB Resmî Sorusu" gibi göstermektedir. Bu teknik etiketleme kusuru düzeltildiğinde, sistemin özgünlük beyanı ile veri yapısı tam mutabakat sağlayacaktır.

---

## 8. TAAHHÜT

Bu çalışma tamamen salt okunur bir denetim olarak yürütülmüştür. Hiçbir kaynak kod, test, veri veya PDF dosyası değiştirilmemiş, silinmemiş veya taşınmamıştır. Git işlemi yapılmamış, deploy tetiklenmemiştir.

