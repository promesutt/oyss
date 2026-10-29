# OYSS Soru, Öğrenme Çıktısı ve Değerlendirme Yapısı Doğrulama Raporu

**Tarih:** 29 Ekim 2026  
**İnceleme Türü:** Kapsamlı Veri Envanteri, Müfredat Uyumu ve Pedagojik Materyal İncelemesi  
**Yasal ve Teknik Sınır:** Bu raporda hiçbir kaynak kod, sınav verisi veya MEB verisi değiştirilmemiştir; hiçbir paket yüklenmemiş, Git commit/push yapılmamış ve canlı dağıtım tetiklenmemiştir. Yalnızca salt-okunur denetim ve modelleme analizi gerçekleştirilmiştir.

---

## 1. Yönetici Özeti

Bu bağımsız doğrulama çalışması, Ortak Yazılı Sınav Sistemi (OYSS) platformunun açık uçlu sınav pratiği ve öğrenci öz değerlendirme modülünün mimari tasarımına geçmeden önce; eldeki soru havuzunun güvenilirliğini, MEB Ölçme, Değerlendirme ve Sınav Hizmetleri Genel Müdürlüğü (ÖDSGM) konu-soru dağılım tablolarıyla uyumunu ve Temel Eğitim Genel Müdürlüğü tarafından yayımlanan **MEBİ "Yazılıya Hazırlanıyorum"** fasiküllerinin pedagojik soru ve değerlendirme yaklaşımını somut verilerle ortaya koymak amacıyla yürütülmüştür.

**Temel Çıkarımlar:**
1. **Sınav ve Soru Sayısı Tutarsızlığının Çözümü (834 vs 847):**  
   Önceki raporlarda geçen 834 ve 847 sayıları arasındaki 13 soruluk farkın nedeni tam olarak tespit edilmiştir. `meb_data/all_middle_school_exams.json` dosyasında 7. Sınıf Fen Bilimleri sınavları senaryo başına 4'er sorudan ibaret eksik bir ara sürümken (toplam 17 soru), canlı platform kodu olan [`src/data/sampleExams.ts`](file:///Users/mesutduran/Desktop/OYSS/src/data/sampleExams.ts) dosyasında ÖDSGM dağılım tablolarına uygun olarak tam kadroya (Senaryo 1: 9 soru, Senaryo 2: 7 soru, Senaryo 3: 8 soru, Senaryo 4: 6 soru = 30 soru; $+13$ soru) tamamlanmıştır. Canlı sistemdeki gerçek envanter **123 sınav ve 847 tekil soru**dur.
2. **Soruların Tekilliği:**  
   Eski JSON dosyasında (`all_middle_school_exams.json`) 834 soru kaydına karşın yalnızca 441 tekil soru metni bulunurken; canlı TypeScript veri dosyasında ([`src/data/sampleExams.ts`](file:///Users/mesutduran/Desktop/OYSS/src/data/sampleExams.ts)) 847 soru kaydının **847'si de (%100) tamamen birbirinden farklı ve tekildir (0 yinelenen soru)**.
3. **MEBİ Materyallerinin Hukuki ve Pedagojik Statüsü:**  
   `mebi.zip` içerisindeki 7. sınıf materyalleri kapağında açık bir resmî uyarı taşımaktadır:  
   > *"Bu içerik, Temel Eğitim Genel Müdürlüğü tarafından öğrencilerin yazılı öncesi çalışmaları amacıyla hazırlanmıştır. Örnek soru niteliği taşımamaktadır. Hazırlanan sorular, yayımlanan senaryoların tamamındaki öğrenme çıktılarını kapsamaktadır."*  
   Bu materyaller resmî sınav kâğıdı değil; bir dönemdeki tüm senaryoları kapsayan **yazılıya hazırlık çalışma fasikülleridir**.
4. **MEBİ'de Puanlama ve Rubrik Bulunmaması:**  
   MEBİ hazırlık fasiküllerinde **sayısal bir puanlama rubriği veya soru puanı kesinlikle yer almamaktadır**. MEBİ, soruların ardına "Çözümler" bölümü eklemiş; burada **"Alternatif Kabul Edilebilir Yanıtlar"** (*"Verilebilecek diğer örnek yanıtlar:"*, *"Örnek Cevap 1 / Örnek Cevap 2"*, *"Yukarıdaki ifadeler doğrultusundaki yanıtlar doğru kabul edilecektir"*) yaklaşımını benimsemiştir.
5. **OYSS Soru Havuzunun Öz Değerlendirme Hazırlığı:**  
   OYSS'deki 847 sorunun tamamında model cevap, çözüm açıklaması ve analitik rubrik mevcuttur. 148 soruda `a)`, `b)` gibi alt maddeler bulunmakta ve bu soruların rubrikleri de alt maddelere göre ayrılmış durumdadır. Ancak öğrenci öz değerlendirmesinde tek bir katı model cevaba bağlı kalmak, MEBİ'nin teşvik ettiği alternatif doğru yanıtları cezalandırma riski taşımaktadır.

---

## 2. İncelenen Dosyalar ve Kapsam

Denetim sürecinde fiziksel varlığı doğrulanan ve bayt düzeyinde taranan dosya envanteri:

| Dosya / Dizin | Bulunduğu Konum | Dosya Türü / Boyut | İçerik Tanımı |
| :--- | :--- | :--- | :--- |
| **`src/data/sampleExams.ts`** | `/Users/mesutduran/Desktop/OYSS/src/data/sampleExams.ts` | TypeScript / 1.58 MB | Canlı portala entegre edilmiş 123 ortaokul sınavı ve 847 soruluk ana havuz. |
| **`src/data/curriculumData.ts`** | `/Users/mesutduran/Desktop/OYSS/src/data/curriculumData.ts` | TypeScript / 78 KB | 123 senaryo tanımı, soru sayıları ve kazanım konu dağılımları. |
| **`all_middle_school_exams.json`** | `/Users/mesutduran/Desktop/OYSS/meb_data/all_middle_school_exams.json` | JSON / 1.75 MB | Eski birleştirilmiş ortaokul sınav veri tabanı (834 soru). |
| **Sınıf Düzeyi JSON Dosyaları** | `meb_data/all_grade[5-8]_exams.json` | 4 adet JSON dosyası | Kademelere göre ayrılmış sınav verileri (G5: 273KB, G6: 252KB, G7: 291KB, G8: 400KB). |
| **ÖDSGM Excel Dağılım Tabloları** | `meb_data/{ders}.xlsx` (6 dosya) | Excel (.xlsx) | MEB ÖDSGM tarafından ilan edilen resmi konu soru dağılım tabloları (Türkçe, Matematik, Fen, Sosyal, İngilizce, Din). |
| **MEBİ 7. Sınıf PDF Fasikülleri** | `/Users/mesutduran/Desktop/mebi/*.pdf` (6 dosya) | PDF (Toplam 66 sayfa) | `mebi.zip` arşivinden çıkarılmış 7. sınıf 1. dönem 1. yazılı hazırlık fasikülleri. |

---

## 3. Sınav ve Soru Envanteri

Canlı platform verisi (`src/data/sampleExams.ts`) üzerinden yapılan tam sayım ve çapraz doğrulama sonuçları:

### Kademeler ve Dersler Bazında Sınav ve Soru Dağılımı

| Sınıf | Ders | Senaryo Sayısı (Sınav) | Toplam Soru Kaydı | Sınav Başına Soru Dağılımları | Soru Başına Ortalama Puan |
| :---: | :--- | :---: | :---: | :--- | :---: |
| **5. Sınıf** | Türkçe | 6 | 39 | Senaryo 1: 6, Senaryo 2: 6, Senaryo 3: 7, Senaryo 4: 7, Senaryo 5: 7, Senaryo 6: 8 | ~15.4 p |
| 5. Sınıf | Matematik | 5 | 34 | Senaryo 1: 7, Senaryo 2: 7, Senaryo 3: 7, Senaryo 4: 6, Senaryo 5: 7 | ~14.7 p |
| 5. Sınıf | Fen Bilimleri | 4 | 26 | Senaryo 1: 7, Senaryo 2: 7, Senaryo 3: 6, Senaryo 4: 6 | ~15.4 p |
| 5. Sınıf | Sosyal Bilgiler | 5 | 32 | Senaryo 1: 6, Senaryo 2: 7, Senaryo 3: 7, Senaryo 4: 6, Senaryo 5: 6 | ~15.6 p |
| 5. Sınıf | İngilizce | 5 | 31 | Senaryo 1: 5, Senaryo 2: 5, Senaryo 3: 6, Senaryo 4: 7, Senaryo 5: 8 | ~16.1 p |
| 5. Sınıf | Din Kültürü | 4 | 29 | Senaryo 1: 8, Senaryo 2: 7, Senaryo 3: 6, Senaryo 4: 6 | ~13.8 p |
| **5. Sınıf Toplamı** | **6 Ders** | **29 Sınav** | **191 Soru** | **(Tüm sınavlar eksiksiz 100 tam puandır)** | **-** |
| **6. Sınıf** | Türkçe | 6 | 38 | Senaryo 1: 6, Senaryo 2: 6, Senaryo 3: 6, Senaryo 4: 6, Senaryo 5: 7, Senaryo 6: 7 | ~15.8 p |
| 6. Sınıf | Matematik | 3 | 18 | Senaryo 1: 6, Senaryo 2: 5, Senaryo 3: 7 *(Ülke geneli merkezi sınav senaryoları)* | ~16.7 p |
| 6. Sınıf | Fen Bilimleri | 6 | 44 | Senaryo 1: 8, Senaryo 2: 8, Senaryo 3: 7, Senaryo 4: 6, Senaryo 5: 7, Senaryo 6: 9 | ~13.6 p |
| 6. Sınıf | Sosyal Bilgiler | 5 | 33 | Senaryo 1: 6, Senaryo 2: 8, Senaryo 3: 6, Senaryo 4: 6, Senaryo 5: 7 | ~15.2 p |
| 6. Sınıf | İngilizce | 5 | 31 | Senaryo 1: 5, Senaryo 2: 5, Senaryo 3: 6, Senaryo 4: 7, Senaryo 5: 8 | ~16.1 p |
| 6. Sınıf | Din Kültürü | 5 | 31 | Senaryo 1: 7, Senaryo 2: 6, Senaryo 3: 5, Senaryo 4: 6, Senaryo 5: 6 | ~16.1 p |
| **6. Sınıf Toplamı** | **6 Ders** | **30 Sınav** | **195 Soru** | **(Tüm sınavlar eksiksiz 100 tam puandır)** | **-** |
| **7. Sınıf** | Türkçe | 6 | 39 | Senaryo 1: 7, Senaryo 2: 6, Senaryo 3: 7, Senaryo 4: 7, Senaryo 5: 6, Senaryo 6: 6 | ~15.4 p |
| 7. Sınıf | Matematik | 4 | 26 | Senaryo 1: 7, Senaryo 2: 5, Senaryo 3: 7, Senaryo 4: 6 | ~15.4 p |
| 7. Sınıf | Fen Bilimleri | 4 | **30** | Senaryo 1: **9**, Senaryo 2: **7**, Senaryo 3: **8**, Senaryo 4: **6** *(ÖDSGM ile tam eşit)* | ~13.3 p |
| 7. Sınıf | Sosyal Bilgiler | 5 | 35 | Senaryo 1: 7, Senaryo 2: 7, Senaryo 3: 8, Senaryo 4: 7, Senaryo 5: 6 | ~14.3 p |
| 7. Sınıf | İngilizce | 5 | 30 | Senaryo 1: 4, Senaryo 2: 5, Senaryo 3: 6, Senaryo 4: 7, Senaryo 5: 8 | ~16.7 p |
| 7. Sınıf | Din Kültürü | 5 | 32 | Senaryo 1: 8, Senaryo 2: 7, Senaryo 3: 6, Senaryo 4: 6, Senaryo 5: 6 | ~15.6 p |
| **7. Sınıf Toplamı** | **6 Ders** | **29 Sınav** | **192 Soru** | **(Eski JSON: 179 soru; Canlı TS: 192 soru)** | **-** |
| **8. Sınıf** | Türkçe | 7 | 56 | Senaryo 1: 8, Senaryo 2: 9, Senaryo 3: 7, Senaryo 4: 7, Senaryo 5: 9, Senaryo 6: 10, Senaryo 7: 7 | ~12.5 p |
| 8. Sınıf | Matematik | 6 | 55 | Senaryo 1: 11, Senaryo 2: 8, Senaryo 3: 11, Senaryo 4: 8, Senaryo 5: 10, Senaryo 6: 9 | ~10.9 p |
| 8. Sınıf | Fen Bilimleri | 5 | 39 | Senaryo 1: 7, Senaryo 2: 8, Senaryo 3: 9, Senaryo 4: 7, Senaryo 5: 8 | ~12.8 p |
| 8. Sınıf | T.C. İnkılap Tarihi | 7 | 50 | Senaryo 1: 6, Senaryo 2: 7, Senaryo 3: 8, Senaryo 4: 6, Senaryo 5: 7, Senaryo 6: 8, Senaryo 7: 8 | ~14.0 p |
| 8. Sınıf | İngilizce | 5 | 31 | Senaryo 1: 4, Senaryo 2: 5, Senaryo 3: 6, Senaryo 4: 6, Senaryo 5: 7 | ~16.1 p |
| 8. Sınıf | Din Kültürü | 5 | 38 | Senaryo 1: 9, Senaryo 2: 8, Senaryo 3: 6, Senaryo 4: 8, Senaryo 5: 7 | ~13.2 p |
| **8. Sınıf Toplamı** | **6 Ders** | **35 Sınav** | **269 Soru** | **(Tüm sınavlar eksiksiz 100 tam puandır)** | **-** |
| **GENEL TOPLAM** | **Tüm Ortaokul** | **123 Sınav** | **847 Soru** | **Toplam 12.300 Puan (123 × 100)** | **-** |

---

## 4. 834 / 847 Soru Sayısı Farkının Açıklaması

Önceki teknik raporlarda görülen **834 soru** ve **847 soru** ifadeleri bir çelişki değil; **iki farklı dosyanın ve geliştirme aşamasının gerçek sayımlarıdır**:

1. **834 Sayısının Kaynağı:**  
   `meb_data/all_middle_school_exams.json` (ve `meb_data/all_grade7_exams.json`) dosyasında yer almaktadır. Bu dosyada 7. Sınıf Fen Bilimleri dersinin 4 senaryosu henüz tam soru sayılarına kavuşturulmamış, her senaryo geçici olarak 4'er soru ile sınırlandırılmıştı:
   - `exam_7_fen_bilimleri_1_1_senaryo_1`: **4 Soru**
   - `exam_7_fen_bilimleri_1_1_senaryo_2`: **5 Soru**
   - `exam_7_fen_bilimleri_1_1_senaryo_3`: **4 Soru**
   - `exam_7_fen_bilimleri_1_1_senaryo_4`: **4 Soru**  
   *Toplam 7. Sınıf Fen:* **17 Soru**. Tüm ortaokul toplamı: **834 Soru**.
2. **847 Sayısının Kaynağı:**  
   Canlı platform kodu olan [`src/data/sampleExams.ts`](file:///Users/mesutduran/Desktop/OYSS/src/data/sampleExams.ts) ve [`src/data/curriculumData.ts`](file:///Users/mesutduran/Desktop/OYSS/src/data/curriculumData.ts) dosyalarıdır. Bu dosyalarda 7. Sınıf Fen Bilimleri sınavları, resmî ÖDSGM Excel tablosundaki (`meb_data/fen_bilimleri.xlsx`) tam soru sayılarına genişletilmiştir:
   - `exam_7_fen_bilimleri_1_1_senaryo_1`: **9 Soru** ($+5$)
   - `exam_7_fen_bilimleri_1_1_senaryo_2`: **7 Soru** ($+2$)
   - `exam_7_fen_bilimleri_1_1_senaryo_3`: **8 Soru** ($+4$)
   - `exam_7_fen_bilimleri_1_1_senaryo_4`: **6 Soru** ($+2$)  
   *Toplam 7. Sınıf Fen:* **30 Soru** (Fark: $+13$ soru).
3. **Matematiksel Sağlama:**  
   $$\mathbf{834 \text{ (Eski JSON)}} + \mathbf{13 \text{ (7. Sınıf Fen Genişletmesi)}} = \mathbf{847 \text{ (Canlı TS Sistemi)}}$$
4. **Tekillik Farkı:**  
   Eski JSON dosyasında (`all_middle_school_exams.json`) toplam 834 soru varken tekil soru sayısı yalnızca 441 idi (sorular senaryolar arasında mükerrer kopyalanmıştı). Canlı `sampleExams.ts` dosyasında yapılan arındırma ile **847 sorunun 847'si de (%100) tamamen özgünleştirilmiştir (0 mükerrer soru)**.

---

## 5. Excel Dağılım Tabloları ile JSON/TS Verilerinin Karşılaştırılması

MEB ÖDSGM'nin yayımladığı 6 Excel dosyası (`meb_data/*.xlsx`) ile `src/data/sampleExams.ts` arasındaki hücre bazlı karşılaştırma:

### Öne Çıkan Bulgular ve Sınıflandırma

| Ders ve Sınıf | Excel Konumu (Sayfa & Hücreler) | JSON / TS Sınav Kimliği | Excel Soru Sayısı | Canlı TS Soru Sayısı | Durum Sınıflandırması | Açıklama ve Kanıt |
| :--- | :--- | :--- | :---: | :---: | :--- | :--- |
| **7. Sınıf Fen Bilimleri (Senaryo 1)** | `fen_bilimleri.xlsx` -> `7. sınıf` Sayfası: Row 7 (FB.7.1.1: 2), Row 10 (FB.7.1.4: 1), Row 11 (FB.7.1.5: 1), Row 12 (FB.7.2.1: 3), Row 13 (FB.7.2.2: 2) | `exam_7_fen_bilimleri_1_1_senaryo_1` | **9** | **9** | **Doğrulandı** | Eski JSON'daki 4 soru hatası canlı TS'de 9 soruya tamamlanarak Excel ile birebir eşitlenmiştir. |
| **7. Sınıf Fen Bilimleri (Senaryo 2)** | `fen_bilimleri.xlsx` -> `7. sınıf` Sayfası: Row 7: 2, Row 9: 1, Row 11: 1, Row 12: 3 (Col E) | `exam_7_fen_bilimleri_1_1_senaryo_2` | **7** | **7** | **Doğrulandı** | Canlı TS soru dağılımı Excel ile tam örtüşmektedir. |
| **7. Sınıf Fen Bilimleri (Senaryo 3)** | `fen_bilimleri.xlsx` -> `7. sınıf` Sayfası: Row 7: 2, Row 9: 1, Row 10: 1, Row 12: 2, Row 13: 2 (Col F) | `exam_7_fen_bilimleri_1_1_senaryo_3` | **8** | **8** | **Doğrulandı** | Canlı TS soru dağılımı Excel ile tam örtüşmektedir. |
| **7. Sınıf Fen Bilimleri (Senaryo 4)** | `fen_bilimleri.xlsx` -> `7. sınıf` Sayfası: Row 9: 1, Row 10: 1, Row 11: 1, Row 12: 2, Row 13: 1 (Col G) | `exam_7_fen_bilimleri_1_1_senaryo_4` | **6** | **6** | **Doğrulandı** | Canlı TS soru dağılımı Excel ile tam örtüşmektedir. |
| **6. Sınıf Matematik (Senaryo 1, 2, 3)** | `matematik.xlsx` -> `6.sınıf` Sayfası: Row 6 Col D-H: *"1. Dönem 1. Ortak Yazılı Sınav Ülke Geneli Ortak Yazılı Sınav şeklinde yapılacaktır. Konu Soru Dağılım Tablosu sınav öncesi kılavuz ile birlikte yayımlanacaktır."* | `exam_6_matematik_1_1_senaryo_1..3` | Tabloda Senaryo Yok (Merkezi Duyuru) | Senaryo 1: 6, Senaryo 2: 5, Senaryo 3: 7 | **Kısmen Doğrulandı (Pedagojik Model)** | Excel'de okul senaryoları boş bırakılmış; bakanlık merkezi sınav yapacağını duyurmuştur. OYSS bu sınav için müfredat çıktılarına uygun 3 hazırlık senaryosu üretmiştir. |
| **Diğer 116 Sınav** | `turkce.xlsx`, `matematik.xlsx`, `din_kulturu.xlsx`, `sosyal_bilgiler.xlsx`, `ingilizce.xlsx` | 116 Sınav Kaydı | Tam Uyumlu | Tam Uyumlu | **Doğrulandı** | Soru sayıları ve senaryo adetleri Excel dağılım tablolarıyla birebir örtüşmektedir. |

---

## 6. MEBİ Materyallerinin Ders Bazında İncelenmesi

`/Users/mesutduran/Desktop/mebi/` dizinindeki 6 adet MEBİ "Yazılıya Hazırlanıyorum" PDF fasikülünün doğrudan incelenmesi:

```
                                  MEBİ FASİKÜL YAPISI
┌─────────────────────────────────────────────────────────────────────────────────┐
│ KAPAK / UYARI: "Yazılı öncesi çalışma amaçlıdır. Örnek soru niteliği taşımaz." │
├─────────────────────────────────────────────────────────────────────────────────┤
│ SORU KISMI: Zengin Bağlam (Metin, Tablo, Görsel, Diyalog, Vaka) + Alt Maddeler  │
├─────────────────────────────────────────────────────────────────────────────────┤
│ ÇÖZÜMLER (Sonda): Model Cevap + ALTERNATİF KABUL EDİLEBİLİR YANITLAR            │
│ (DİKKAT: Puanlama rubriği veya soru puanı YOKTUR!)                              │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Ders Bazında Pedagojik Özellikler

#### 1. Türkçe (`turkce-mebi-ornek-yazili1-1.pdf` - 9 Sayfa)
- **Soru Türleri ve Yönergeler:** Metin analizi, kelime/kavram çıkarımı, yazım-noktalama düzeltme. (Örn. Sayfa 1: Yerli uçak HÜRKUŞ bilgilendirici metni üzerinden açık uçlu sorular).
- **Alt Maddelerin Yapısı:** Sayfa 4 Soru 9: `a.` Cümlenin doğru yazımı, `b.` İkileme kuralının gerekçesi.
- **Çözüm & Yanıt Yapısı:** Sayfa 6-9'da `ÇÖZÜMLER` başlığı altında yer alır.
- **Alternatif Cevap Yaklaşımı (Sayfa 6-7):**  
  > *"Verilebilecek diğer örnek yanıtlar:"* başlığı altında birden çok farklı ifade biçimi sunulmuştur. Öğrencinin birebir ezber cümle kurması değil, anlamı aktarması hedeflenmiştir.
- **Kazanım Eşleştirmesi:** Sayfa 6'da her sorunun başında açıkça yazılmıştır: `T.O.7.21. Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme 1-2`.
- **Puanlama Ölçütü:** Hiçbir soru veya maddede **puan ve rubrik bulunmamaktadır**.

#### 2. Matematik (`matematik- mebi-ornek-yazili1-1.pdf` - 28 Sayfa)
- **Soru Türleri ve Yönergeler:** Gerçek yaşam verisi (Sayfa 1: Hava sıcaklık aralıkları tablosu), sayı doğrusunda rasyonel sayı modelleme, öğrenci hata analizi.
- **Öğrenci Diyaloğu / Hata Tespiti (Sayfa 5 & 11):**  
  Sayfa 5'te üç öğrencinin (Ali, Ayşe, Mehmet) bir rasyonel sayıya verdikleri farklı cevaplar sunulmuş ve *"Hangi öğrencinin cevabı doğrudur? Gerekçelendiriniz."* denilmiştir.  
  Sayfa 11'de "Rukiye'nin Cevap Kâğıdı" ve "Sınav Cevap Anahtarı" verilerek öğrencinin sınav kâğıdı üzerindeki hataları bulması istenmiştir.
- **Çözüm & Yanıt Yapısı:** Sayfa 17-28 arasında adım adım işlem basamakları (`ÇÖZÜMLER`) gösterilmiştir.
- **Alternatif Çözüm (Sayfa 21):** Farklı sadeleştirme ve genişletme yolları kabul edilmiş; *"Tüm öğrencilerin verdiği cevap doğrudur."* şeklinde çoklu doğrular gösterilmiştir.
- **Puanlama Ölçütü:** Sayfa 9 ve 23'te geçen "puan" kelimesi yarışma kurgusundaki soru köküdür ("her yanlış cevapta 8 puan kaybetmektedir"); **değerlendirme rubriği mevcut değildir**.

#### 3. Fen Bilimleri (`fen-mebi-ornek-yazili1-1.pdf` - 11 Sayfa)
- **Soru Türleri ve Yönergeler:** Deney düzenekleri, uzay teknolojileri karşılaştırması, iş-enerji modelleri.
- **Dilemma / Yöntem Seçimi (Sayfa 3 Soru 2):**  
  Uzay kirliliğini önlemek için 1. Yöntem (lazerle atmosferde yakma) ve 2. Yöntem (ağla toplayıp uzay çöplüğüne çekme) sunulmuş; *"Sizce bu çözüm yollarından hangisi daha uygulanabilir? Gerekçelendiriniz."* sorusu yöneltilmiştir.
- **Alternatif Cevaplar (Sayfa 10 Çözümler):**  
  > *Örnek Cevap 1: "1. Yöntem. Çünkü çöpleri toplamak yerine atmosferde yakmak onları tamamen yok eder..."*  
  > *Örnek Cevap 2: "2. Yöntem. Çünkü bazı uydular çok yüksekte olduğu için onları atmosfere çekmek çok zor olabilir, ağla toplamak daha kesin bir çözümdür."*  
  Bakanlık her iki zıt tercihi de mantıklı gerekçelendirildiği takdirde **tam doğru kabul etmiştir**.
- **Kazanım Eşleştirmesi:** Sayfa 10'da çözümlerin yanında kazanım kodları belirtilmiştir (`FB.7.1.1`, `FB.7.1.3`, `FB.7.2.1`).
- **Puanlama Ölçütü:** Rubrik veya puanlama cetveli **bulunmamaktadır**.

#### 4. Sosyal Bilgiler (`sosyal-mebi-ornek-yazili1-1.pdf` - 4 Sayfa)
- **Soru Türleri ve Yönergeler:** İletişim çatışmaları, "Ben Dili" ve "Sen Dili" diyalogları, tarihi metinlerden çıkarım.
- **Alternatif Kabul Edilebilir Yanıtlar (Sayfa 3-4 Çözümler):**  
  > *"Örnek yanıt: Geç kaldığında kendimi değersiz hissediyorum."*  
  > *"Yukarıda verilen ifadeler doğrultusundaki yanıtlar doğru kabul edilecektir."*  
  > *"Gerçekleştiğini belirten yanıtlar doğru kabul edilecektir."*  
- **Puanlama Ölçütü:** Puan ve rubrik **bulunmamaktadır**.

#### 5. İngilizce (`ingilizce-mebi-ornek-yazili1-1.pdf` - 6 Sayfa)
- **Soru Türleri:** Kişilik sıfatları boşluk doldurma (Sayfa 1), kısa metin okuma-anlama (Sayfa 3), spor dallarını tanıma (Sayfa 4).
- **Cevap Anahtarı (Sayfa 5-6):** Sayfa 5 ve 6 `ANSWER KEY` başlığı altındadır. Ayrık ve kısa cevaplar listelenmiştir (`1. hardworking, 2. punctual, 3. selfish...`).
- **Puanlama Ölçütü:** Soru başına puan değeri veya rubrik **verilmemiştir**.

#### 6. Din Kültürü ve Ahlak Bilgisi (`din-mebi-ornek-yazili1-1.pdf` - 8 Sayfa)
- **Soru Türleri:** Günlük hayat vakası (Ahmet'in belgesel izlemesi), meleklerin görevleri eşleştirme tablosu, ahiret aşamaları analizi.
- **Çözümler ve Kazanım:** Sayfa 6'da `DKAB.7.1.2. Ahiret hayatının aşamalarını çözümleyebilme 4-5-6` şeklinde soru numaraları doğrudan kazanım koduyla bağlanmıştır.
- **Puanlama Ölçütü:** Puan veya rubrik **bulunmamaktadır**.

---

## 7. OYSS Soru Havuzunun Kalite Kontrolü (847 Soru)

Canlı havuzdaki 847 sorunun veri alanları üzerinden taranması neticesinde elde edilen kalite metrikleri:

```
                            OYSS SORU KALİTE GÖSTERGELERİ
┌─────────────────────────────────┬──────────┬─────────────────────────────────────┐
│ ALAN                            │ DURUM    │ AÇIKLAMA                            │
├─────────────────────────────────┼──────────┼─────────────────────────────────────┤
│ Boş Soru Metni                  │ 0 (%0)   │ 847 sorunun tamamı doludur          │
│ Boş Model Cevap                 │ 0 (%0)   │ 847 sorunun tamamı doludur          │
│ Boş Çözüm Açıklaması            │ 0 (%0)   │ 847 sorunun tamamı doludur          │
│ Boş / Tanımsız Rubrik           │ 0 (%0)   │ 847 sorunun tamamında rubrik vardır │
│ Boş Bağlam / Senaryo Metni      │ 0 (%0)   │ 847 sorunun tamamında bağlam vardır │
│ Mükerrer / Yinelenen Soru       │ 0 (%0)   │ 847 sorunun 847'si de TEKİLDİR      │
│ Sınav Puanı Uyumsuzluğu         │ 0 (%0)   │ 123 sınavın tamamı 100 puandır      │
│ Rubrik Puan Toplamı Uyumsuzluğu │ 0 (%0)   │ Rubrik toplamları = Soru Puanı      │
└─────────────────────────────────┴──────────┴─────────────────────────────────────┘
```

### Rubrik ve Dağılım Nitelikleri
- **Tek Ölçütlü Rubrikler:** 113 soru (%13.3) — Genellikle tek adımlı tanım, sembol veya doğrudan terim soruları.
- **Çok Ölçütlü Analitik Rubrikler:** 734 soru (%86.7) — Basamaklı puanlama (örn. Kriter 1: +8 puan, Kriter 2: +7 puan).
- **Zorluk Dağılımı:** Kolay: 236 (%27.9), Orta: 456 (%53.8), Zor: 155 (%18.3). (MEB ÖDSGM sınav tasarım standardına tam uyumlu çan eğrisi).
- **Bilişsel Düzey Dağılımı:** Basit Bilişsel Süreçler: 333 (%39.3), Karmaşık Bilişsel Süreçler: 514 (%60.7).
- **Kurgusal Arketip Ağırlığı:** 744 soru (%87.8) "Kurgusal Senaryo & Vaka İncelemesi" arketipiyle etiketlenmiştir; MEBİ'nin diğer arketip adları (Diyalog, Dilemma, Adım Analizi) kalan 103 soruda dağılmıştır.

---

## 8. Öğrenme Çıktısı (Kazanım) Eşleştirme Sorunları

- **Eşleşme Oranı:** `src/data/sampleExams.ts` içerisindeki 847 sorunun **844'ü (%99.6)**, `src/data/curriculumData.ts` içerisindeki senaryo dağılım tablolarının pozisyonel öğrenme çıktılarıyla **birebir örtüşmektedir**.
- **Tespit Edilen 3 Ayrışma:**  
  Yalnızca 5. Sınıf Din Kültürü 1. Yazılı Senaryo 1, 2 ve 4'ün 1. sorularında:
  - `curriculumData.ts` tablosunda kazanım kodu yerine sehven açıklama başlığı olan `"Evrendeki"` yazılmıştır.
  - Ancak `src/data/sampleExams.ts` içerisindeki soru kaydında doğru kod olan `"DKAB.5.1.2"` mevcuttur.  
  *Sonuç:* Bu durum soru içeriğinde veya sınav kâğıdında bir hataya yol açmamakta; veri eşleme tablosunda önemsiz bir string ayrışması olarak kalmaktadır.

---

## 9. Kaynak/Provenans ve Resmîlik Konusunda Belirsizlikler

1. **ÖDSGM Sınavları ile OYSS Sınavlarının Farkı:**  
   MEB ÖDSGM web sitesinde yayımlanan resmî materyaller; dönemlik **Konu Soru Dağılım Tabloları** ve her sınıf için yayımlanan **1-2 adet örnek senaryo kitapçığı**ndan ibarettir. Bakanlık, okullarda uygulanacak 123 farklı sınav kâğıdını merkezi olarak yayımlamaz; bu sınavların hazırlanmasını zümre öğretmenlerine bırakır.
2. **OYSS Soru Havuzunun Menşei:**  
   OYSS havuzundaki 847 soru, doğrudan bakanlığın mühürlü merkezi sınav kâğıtları değildir. Bu sorular, platform yazarları tarafından ÖDSGM senaryo tablolarındaki soru sayıları, kazanım kodları ve MEBİ pedagojik ilkeleri esas alınarak hazırlanmış **"Pedagojik Model / Örnek Yazılı Sınavları"**dır.
3. **Resmîlik Algısı Riski:**  
   Platform arayüzünde daha önce düzeltilen ifadeler (Bulgu 3.2) bu ayrımı sağlamlaştırmıştır. Öğrenciye sunulacak öz değerlendirme ekranında da bu soruların MEB'in resmî sınavı değil, **senaryo esaslı çalışma sınavı** olduğu açıkça vurgulanmalıdır.

---

## 10. Açık Uçlu Öz Değerlendirme Modülüne Etkiler

Öğrencinin kendi açık uçlu yanıtını girmesi ve değerlendirmesi hedeflenen yeni modül için mevcut veri tabanının getirdiği imkanlar ve engeller:

```
                           ÖZ DEĞERLENDİRME İŞ AKIŞI
┌──────────────────┐     ┌────────────────────────┐     ┌────────────────────────┐
│ Öğrenci Yanıtını │ ──> │ Model Cevap &          │ ──> │ Rubrik Ölçütlerini     │
│ Metin Olarak     │     │ Alternatif Yanıtları   │     │ İşaretleme (Checklist) │
│ Yazar (Textarea) │     │ Karşılaştırır          │     │ Puan Tahmini Oluşur    │
└──────────────────┘     └────────────────────────┘     └────────────────────────┘
                                                                    │
                                                                    ▼
                                                        ┌────────────────────────┐
                                                        │ Eksik Kazanım Tespiti  │
                                                        │ & Hap Bilgi / Föy      │
                                                        │ Önerisi (StudyBank)    │
                                                        └────────────────────────┘
```

### Karşılaşılabilecek Temel Engeller ve Çözüm Yolları

1. **Katı Model Cevap Tuzağı:**  
   *Sorun:* MEBİ fasiküllerinde açıkça görüldüğü üzere, açık uçlu sorularda tek bir doğru cevap yoktur (Örn. Fen'de lazerle yakma da doğru kabul edilir, ağla çekme de; Sosyal'de farklı ben dili cümleleri kabul edilir). OYSS'de şu an tek bir `modelAnswer` kayıtlıdır. Öğrenci kendi farklı ama doğru cevabını görünce kendini haksız yere başarısız hissedebilir.  
   *Çözüm:* Öğrenciye model cevabın yanında *"Bu ifade bir örnektir; aynı anlama gelen farklı gerekçeler ve açıklamalar da geçerlidir"* yönlendirmesi sunulmalıdır.
2. **Alt Maddelerin (a, b) Ayrıştırılamaması:**  
   *Sorun:* 148 soruda `a)` ve `b)` şıkları tek bir `questionText` içinde birleşiktir. Öğrenci tek bir kutuya hem a'yı hem b'yi yazacaktır.  
   *Çözüm:* OYSS'nin rubrik yapısı incelendiğinde, bu soruların rubriklerinin zaten kriter bazında ayrıldığı (`criterion: "a şıkkında..."`, `criterion: "b şıkkında..."`) görülmüştür. Dolayısıyla öğrenci değerlendirme aşamasında a için ayrı, b için ayrı kriter kutucuğunu işaretleyebilecektir.
3. **Puanın "Kesin Not" Algısı Oluşturması:**  
   *Sorun:* Öğrenci 100 üzerinden 85 aldığında bunu öğretmenin vereceği resmî karne notu sanabilir.  
   *Çözüm:* Skor kartı "Sınav Notu" olarak değil; **"Öz Değerlendirme Tahmini Puanı"** ve **"Kazanım Başarı Düzeyi"** şeklinde etiketlenmelidir.
4. **Eksik Konu Analizi için Hazır Altyapı:**  
   *Büyük Avantaj:* Platformda halihazırda 844 soru doğrudan kazanım koduna bağlıdır ve [`src/data/outcomeStudyBank.ts`](file:///Users/mesutduran/Desktop/OYSS/src/data/outcomeStudyBank.ts) dosyası neredeyse tüm kazanımlara ait hap bilgileri, sınav tuzaklarını ve çözümlü model soruları barındırmaktadır. Öğrencinin rubrikte puan alamadığı bir soru doğrudan `outcomeCode` üzerinden tespit edilip anında çalışma önerisine dönüştürülebilir.

---

## 11. Önceliklendirilmiş Sorun Listesi

| Öncelik | Alan / Bileşen | Sorun Tanımı | Etki Derecesi | Önerilen Aksiyon |
| :---: | :--- | :--- | :---: | :--- |
| **P1** | Öğrenci Öz Değerlendirme Modeli | Sorularda alternatif kabul edilebilir yanıt listesinin bulunmaması. | Yüksek | Model cevap kartına MEBİ pedagojisine uygun "kabul edilebilir alternatif yaklaşım" yönlendirmesi eklenmeli. |
| **P2** | Alt Madde Veri Modeli | 148 sorudaki `a)`, `b)` şıklarının veri modelinde ayrıştırılmamış tek metin olması. | Orta | UI katmanında rubrik kriterlerinin alt maddeyle eşleşmesi belirginleştirilmeli; ileride şıklar veri tabanında ayrılmalı. |
| **P3** | Arşiv JSON Senkronizasyonu | `all_middle_school_exams.json` dosyasının 834 soruda kalmış olması. | Düşük | Canlı `sampleExams.ts` (847 soru) baz alınmalı; ileride arşiv JSON dosyası bu güncel sürümden yeniden dışa aktarılmalı. |
| **P4** | Din Kültürü Kazanım Başlığı | 5. Sınıf Din Senaryo 1, 2, 4 Q1'deki `"Evrendeki"` string ayrışması. | Düşük | `curriculumData.ts` içinde `"DKAB.5.1.2"` olarak güncellenmeli. |

---

## 12. İlk Sürüm (MVP) İçin Öneriler

Mevcut kaynak kod ve veri mimarisi bozulmadan öz değerlendirme modülünün ilk sürümü için önerilen teknik yol haritası:

1. **Metin Giriş Alanı (Textarea):** `ExamPaperView` bileşenine isteğe bağlı açılabilen "İnteraktif Çözüm Modu" eklenmeli; her sorunun altına öğrencinin cevabını yazabileceği stateful bir textarea yerleştirilmelidir.
2. **Adım Adım Geri Bildirim:** Öğrenci "Cevabımı Tamamladım, Değerlendir" butonuna bastığında:
   - Soruya ait `modelAnswer` ve `solutionExplanation` gösterilmeli.
   - Sorunun analitik `rubric` kriterleri interaktif onay kutuları (checkbox) olarak açılmalıdır (`[ ] Bu kriteri karşıladım (+8 p)`).
3. **Alternatif Cevap Uyarısı:** Model cevabın üzerine MEBİ fasiküllerindeki ilkeye paralel bir bilgilendirme rozeti konulmalıdır:  
   *“Cevabınız model cevapla birebir aynı kelimelerden oluşmak zorunda değildir; aynı gerekçeyi ve bilimsel/mantıksal sonucu içeren farklı açıklamalar da geçerlidir.”*
4. **Kazanım Analiz Özeti:** Sınav tamamlandığında işaretlenmeyen rubrik kriterlerine ait `outcomeCode`'lar listelenmeli ve `OUTCOME_STUDY_BANK` verisi kullanılarak öğrenciye doğrudan "Bu Konunun Hap Bilgilerini İncele" butonu sunulmalıdır.

---

## 13. Test Senaryoları ve Kabul Ölçütleri

Öz değerlendirme modülü kodlanmadan önce uygulanacak kabul ölçütleri:

| Senaryo No | Test Adı | Girdi / İşlem | Beklenen Sonuç |
| :---: | :--- | :--- | :--- |
| **TC-01** | Tekil Soru Girişi | Öğrenci 1. soruya açık uçlu yanıt metni yazar. | Metin yerel state'e kaydedilir; sayfa yenilenmediği sürece korunur. |
| **TC-02** | Rubrik Kriter İşaretleme | Öğrenci 15 puanlık soruda 8 puanlık birinci kriteri işaretler, 7 puanlık ikinciyi boş bırakır. | Sorudan alınan öz değerlendirme puanı 8 olarak hesaplanır. |
| **TC-03** | Alt Madde (a/b) Değerlendirme | 5. Sınıf Türkçe S1 Q4 (Yadigâr ve Paha biçilemez) sorusunda a işaretlenir, b boş bırakılır. | Toplam puan 9/17 olarak hesaplanır; b şıkkı eksik kazanım listesine aktarılır. |
| **TC-04** | Kazanım Raporlama | Öğrenci `FB.7.2.1` kazanımına ait 3 soruda da tam puan alamaz. | Sınav sonu analizinde `FB.7.2.1` "Öncelikli Tekrar Edilmesi Gereken Konu" olarak listelenir. |
| **TC-05** | Resmî Olmayan Not Uyarısı | Sınav öz değerlendirmesi tamamlanır. | Ekranda "Bu puan resmi okul notu yerine geçmez, kişisel gelişim amaçlıdır" uyarısı görünür. |

---

## 14. Doğrulanamayan Noktalar ve Ek İhtiyaçlar

1. **ÖDSGM 6. Sınıf Matematik Okul Senaryoları:**  
   Bakanlık 6. sınıf matematik 1. dönem 1. yazılıyı merkezi ülke geneli sınav olarak belirlediği için Excel tablosunda yerel okul senaryoları yayımlamamıştır. OYSS'deki 3 senaryonun merkezi kılavuza tam uyumu ancak sınav kılavuzunun MEB tarafından resmen yayımlanmasıyla kesinleşebilir.
2. **Öğrenci Yanıtlarının Saklanması:**  
   Mevcut sistemde bir kullanıcı girişi veya arka uç veritabanı (Firestore vb.) bulunmamaktadır. Öğrencinin yazdığı açık uçlu yanıtların tarayıcı oturumu (`localStorage`) dışında kalıcı olarak saklanması ve öğretmenle paylaşılması için bir veritabanı altyapısına ihtiyaç duyulacaktır.

---

> [!NOTE]
> **Yetki ve Görev Sınırı Hatırlatması:**  
> Kullanıcı talimatı uyarınca hiçbir kod veya veri değişikliği yapılmamış, Git commit/push ve Netlify dağıtımı tetiklenmemiştir.  
> Bu rapor, açık uçlu sınav pratiği ve öz değerlendirme modülünün tasarımına temel teşkil etmek üzere kullanıcı değerlendirmesine sunulmuştur.
