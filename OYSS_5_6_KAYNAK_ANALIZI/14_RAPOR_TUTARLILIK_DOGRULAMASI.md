# OYSS 5. VE 6. SINIFLAR RAPOR VE VERİ TUTARLILIK DOĞRULAMASI

**Rapor Kodu:** `14_RAPOR_TUTARLILIK_DOGRULAMASI.md`  
**Kapsam:** 5. ve 6. Sınıf Kaynak Analiz Raporlarının (01-13) Kod Tabanı ve Canlı Sistem Verileriyle Doğrulanması  
**Tarih:** 31 Ekim 2026  
**Durum:** Doğrulama Tamamlandı - Bulgular ve Düzeltmeler Belirlendi  

---

## 1. Yönetici Özeti ve Doğrulama Kapsamı

Kullanıcının talimatı doğrultusunda, `OYSS_5_6_KAYNAK_ANALIZI/` klasöründeki 13 rapor ile projenin gerçek kaynak kodları (`src/data/sampleExams.ts`, `src/data/curriculumData.ts`, `netlify/functions/generate.ts`, `OYSS_FAZ_2_3_4_CANLI_DOGRULAMA_RAPORU.md`) ve `~/Desktop/OYSS_KAYNAKLAR/` dizinindeki 36 fiziksel PDF dosyası programatik olarak karşılaştırılmıştır.

Bu çalışma **yalnızca doğrulama ve raporlama** çalışmasıdır; hiçbir kod değişikliği, commit, push veya deploy yapılmamıştır.

---

## 2. Programatik Sınav, Soru ve Puan Dağılım Tabloları (`sampleExams.ts`)

`src/data/sampleExams.ts` dosyası `npx tsx` ile belleğe yüklenmiş ve her sınıf-branş için sınav sayıları, soru sayıları ve toplam puanlar eksiksiz toplanmıştır:

### A. 5. Sınıf Resmî Dağılım Tablosu (29 Sınav / 191 Soru / 2.900 Puan)

| Branş | Sınav Sayısı | Soru Sayısı | Sınav Başına Soru Dağılımı | Sınav Başına Puan | Toplam Puan |
|:---|:---:|:---:|:---|:---:|:---:|
| **Türkçe** | 6 | **41** | Senaryo 1: 6, Senaryo 2: 6, Senaryo 3: 7, Senaryo 4: 7, Senaryo 5: 8, Senaryo 6: 7 | 100 | 600 |
| **Matematik** | 5 | **34** | Senaryo 1: 7, Senaryo 2: 7, Senaryo 3: 7, Senaryo 4: 7, Senaryo 5: 6 | 100 | 500 |
| **Fen Bilimleri** | 4 | **26** | Senaryo 1: 6, Senaryo 2: 7, Senaryo 3: 7, Senaryo 4: 6 | 100 | 400 |
| **Sosyal Bilgiler** | 5 | **32** | Senaryo 1: 6, Senaryo 2: 6, Senaryo 3: 6, Senaryo 4: 7, Senaryo 5: 7 | 100 | 500 |
| **Din Kültürü** | 4 | **27** | Senaryo 1: 8, Senaryo 2: 7, Senaryo 3: 6, Senaryo 4: 6 | 100 | 400 |
| **İngilizce** | 5 | **31** | Senaryo 1: 6, Senaryo 2: 6, Senaryo 3: 6, Senaryo 4: 6, Senaryo 5: 7 | 100 | 500 |
| **5. SINIF TOPLAMI** | **29** | **191** | **-** | **-** | **2.900** |

### B. 6. Sınıf Resmî Dağılım Tablosu (30 Sınav / 195 Soru / 3.000 Puan)

| Branş | Sınav Sayısı | Soru Sayısı | Sınav Başına Soru Dağılımı | Sınav Başına Puan | Toplam Puan |
|:---|:---:|:---:|:---|:---:|:---:|
| **Türkçe** | 6 | **38** | Senaryo 1: 6, Senaryo 2: 6, Senaryo 3: 6, Senaryo 4: 6, Senaryo 5: 7, Senaryo 6: 7 | 100 | 600 |
| **Matematik** | 3 | **18** | Senaryo 1: 4, Senaryo 2: 6, Senaryo 3: 8 | 100 | 300 |
| **Fen Bilimleri** | 6 | **45** | Senaryo 1: 7, Senaryo 2: 7, Senaryo 3: 8, Senaryo 4: 8, Senaryo 5: 7, Senaryo 6: 8 | 100 | 600 |
| **Sosyal Bilgiler** | 5 | **33** | Senaryo 1: 6, Senaryo 2: 7, Senaryo 3: 7, Senaryo 4: 6, Senaryo 5: 7 | 100 | 500 |
| **Din Kültürü** | 5 | **30** | Senaryo 1: 6, Senaryo 2: 6, Senaryo 3: 6, Senaryo 4: 6, Senaryo 5: 6 | 100 | 500 |
| **İngilizce** | 5 | **31** | Senaryo 1: 6, Senaryo 2: 6, Senaryo 3: 6, Senaryo 4: 6, Senaryo 5: 7 | 100 | 500 |
| **6. SINIF TOPLAMI** | **30** | **195** | **-** | **-** | **3.000** |

> [!IMPORTANT]
> **5. ve 6. Sınıflar Genel Toplamı:**
> - Toplam Sınav Sayısı: **59 Sınav**
> - Toplam Soru Sayısı: **386 Soru**
> - Toplam Puan Hacmi: **5.900 Puan** (Her sınav istisnasız ve tam olarak 100 puandır).

---

## 3. 356 Soru ile 386 Soru Arasındaki 30 Soruluk Farkın Açıklaması

Yapılan denetimde iki farklı toplamın kaynağı netleştirilmiştir:

1. **Gerçek ve Programatik Sayı: 386 Soru**
   - `src/data/sampleExams.ts` içinde 5. sınıfta 191, 6. sınıfta 195 olmak üzere tam **386 adet soru objesi** bulunmaktadır.
   - Önceki oturumdaki envanter raporunda (Turn 9) ve `13_ORTAK_EKSIKLER_VE_GELISTIRME_PLANI.md` raporunun 6. bölümünde bu sayı doğru olarak **386 soru** şeklinde bildirilmiştir.
2. **Bireysel Raporlardaki Hatalı Toplam: 356 Soru**
   - 12 adet branş raporu yazılırken (`01_TURKCE_5.md` - `12_INGILIZCE_6.md`), Bölüm 4 tablolarına programatik sayım yerine önceki taslak notlar girilmiştir:
     * `01_TURKCE_5.md`: 38 soru yazıldı *(Gerçek: 41 $\rightarrow$ Fark: -3)*
     * `02_TURKCE_6.md`: 37 soru yazıldı *(Gerçek: 38 $\rightarrow$ Fark: -1)*
     * `03_MATEMATIK_5.md`: 32 soru yazıldı *(Gerçek: 34 $\rightarrow$ Fark: -2)*
     * `04_MATEMATIK_6.md`: 12 soru yazıldı *(Gerçek: 18 $\rightarrow$ Fark: -6)*
     * `05_FEN_5.md`: 24 soru yazıldı *(Gerçek: 26 $\rightarrow$ Fark: -2)*
     * `06_FEN_6.md`: 34 soru yazıldı *(Gerçek: 45 $\rightarrow$ Fark: -11)*
     * `07_SOSYAL_5.md`: 32 soru yazıldı *(Gerçek: 32 $\rightarrow$ Fark: 0)*
     * `08_SOSYAL_6.md`: 31 soru yazıldı *(Gerçek: 33 $\rightarrow$ Fark: -2)*
     * `09_DIN_5.md`: 27 soru yazıldı *(Gerçek: 27 $\rightarrow$ Fark: 0)*
     * `10_DIN_6.md`: 30 soru yazıldı *(Gerçek: 30 $\rightarrow$ Fark: 0)*
     * `11_INGILIZCE_5.md`: 28 soru yazıldı *(Gerçek: 31 $\rightarrow$ Fark: -3)*
     * `12_INGILIZCE_6.md`: 31 soru yazıldı *(Gerçek: 31 $\rightarrow$ Fark: 0)*
   - Bireysel raporlardaki bu sayılar toplandığında:  
     $$38 + 37 + 32 + 12 + 24 + 34 + 32 + 31 + 27 + 30 + 28 + 31 = \mathbf{356}$$
   - Fark: $$386 - 356 = \mathbf{30\text{ Soru}}$$
3. **Sonuç:** 356 sayısı, bireysel branş raporlarındaki (01-12) manuel yazım eksikliklerinden kaynaklanan yapay bir toplamdır. Projedeki gerçek hazır sınav soru sayısı kesin olarak **386**'dır.

---

## 4. Soru Tekrarı (Duplikasyon) ve Benzersiz Soru Analizi

Farklı senaryolar arasında aynı sorunun kullanılıp kullanılmadığını test etmek için `sampleExams.ts` içerisindeki tüm sorular `questionText` ve `stimulus + questionText` bileşik anahtarlarıyla taranmıştır:

| Sınıf | Toplam Soru Kaydı | Benzersiz `questionText` | Benzersiz `stimulus + text` | Tekrar Eden Soru Sayısı | Duplikasyon Oranı |
|:---:|:---:|:---:|:---:|:---:|:---:|
| **5. Sınıf** | **191** | **191** | **191** | **0** | **%0,0 (Sıfır Tekrar)** |
| **6. Sınıf** | **195** | **195** | **195** | **0** | **%0,0 (Sıfır Tekrar)** |
| **7. Sınıf** | **192** | **192** | **192** | **0** | **%0,0 (Sıfır Tekrar)** |
| **8. Sınıf** | **269** | **269** | **269** | **0** | **%0,0 (Sıfır Tekrar)** |

> [!NOTE]
> **Bulgu:** 5. ve 6. sınıflardaki 386 sorunun istisnasız tamamı birbirinden farklı ve benzersizdir. 30 soruluk sayım farkı kesinlikle soru tekrarından kaynaklanmamaktadır.

---

## 5. `alternativeAnswers` Alanının Detaylı Durumu

Sistemdeki tüm sınıflar için `alternativeAnswers` özelliğinin nesne düzeyindeki gerçek varlığı programatik olarak sorgulanmıştır:

| Sınıf | Toplam Soru | `undefined` (Alan Yok) | Boş Dizi `[]` | Dolu Dizi `[...]` | Toplam Alternatif Cevap Elemanı |
|:---|:---:|:---:|:---:|:---:|:---:|
| **5. Sınıf** | 191 | **191 (%100)** | **0** | **0** | 0 |
| **6. Sınıf** | 195 | **195 (%100)** | **0** | **0** | 0 |
| **7. Sınıf** | 192 | **69 (%35,9)** | **0** | **123 (%64,1)** | **252 Alternatif Yanıt** |
| **8. Sınıf** | 269 | **269 (%100)** | **0** | **0** | 0 |

### 7. Sınıf Dolu Dizi Dağılımı (123 Soru):
- **Türkçe:** 39 / 39 soru dolu (84 alternatif cevap)
- **Sosyal Bilgiler:** 35 / 35 soru dolu (70 alternatif cevap)
- **Din Kültürü:** 33 / 33 soru dolu (66 alternatif cevap)
- **Fen Bilimleri:** 9 / 30 soru dolu (18 alternatif cevap)
- **Matematik:** 7 / 25 soru dolu (14 alternatif cevap)
- **İngilizce:** 0 / 30 soru dolu (30 soru `undefined`)

> [!IMPORTANT]
> **5. ve 6. Sınıf Durumu:** 5. ve 6. sınıflardaki 386 sorunun hiçbirinde `alternativeAnswers: []` (boş dizi) bulunmamaktadır; anahtar doğrudan soru objesinde tanımlanmamış (`undefined`) durumdadır.

---

## 6. Canlı Gemini Model Adı ve Konfigürasyon Doğrulaması

- **Konfigürasyon Dosyası:** [`netlify/functions/generate.ts`](file:///Users/mesutduran/Desktop/OYSS/netlify/functions/generate.ts)
- **Model Seçim Mantığı (Satır 100):**
  ```typescript
  const configuredModel = (process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite').trim();
  ```
- **Fallback Zinciri (Satır 159-165):**
  ```typescript
  const fallbackChain = [
    'gemini-3.5-flash-lite',
    'gemini-3.5-flash',
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash'
  ];
  ```
- **Canlı Test Doğrulaması:** FAZ 2.3.4 canlı sınav üretimlerinde Netlify'ın çağırdığı ve yanıt aldığı birincil model **`gemini-3.5-flash-lite`**'tır.
- **Düzeltilmesi Gereken Rapor İfadesi:**
  - `13_ORTAK_EKSIKLER_VE_GELISTIRME_PLANI.md` içindeki Mermaid akış şemasında yer alan `GeminiAPI["Canlı Gemini 2.5 Flash API"]` ibaresi hatalıdır. Doğrusu **`gemini-3.5-flash-lite`** olmalıdır.

---

## 7. 7. Sınıf Canlı Test Başarı Oranı ve Fallback Ayrımı

FAZ 2.3.4 kapsamında gerçekleştirilen 10 canlı üretim testinin (`OYSS_FAZ_2_3_4_CANLI_DOGRULAMA_RAPORU.md`) gerçek dökümü şöyledir:

| Üretim | Sınıf & Branş | Set | Model | Sonuç Durumu | Soru Sayısı | Puan |
|:---:|:---|:---:|:---|:---:|:---:|:---:|
| 1 | 7. Sınıf Türkçe | Set A | `gemini-3.5-flash-lite` | **Canlı Gemini Başarılı** | 7 | 100 |
| 2 | 7. Sınıf Türkçe | Set B | `gemini-3.5-flash-lite` | **Canlı Gemini Başarılı** | 7 | 100 |
| 3 | 7. Sınıf Matematik | Set A | `gemini-3.5-flash-lite` | **Canlı Gemini Başarılı** | 7 | 100 |
| 4 | 7. Sınıf Matematik | Set B | `gemini-3.5-flash-lite` | **Canlı Gemini Başarılı** | 7 | 100 |
| 5 | 7. Sınıf Fen Bilimleri | Set A | `gemini-3.5-flash-lite` | **Canlı Gemini Başarılı** | 9 | 100 |
| 6 | 7. Sınıf Fen Bilimleri | Set B | `gemini-3.5-flash-lite` | **Canlı Gemini Başarılı** | 9 | 100 |
| 7 | 7. Sınıf Sosyal Bilgiler | Set A | `MEBİ Kural Motoru (Fallback)` | **Fallback Devreye Girdi** (JSON Parse Hatası) | 7 | 100 |
| 8 | 7. Sınıf Sosyal Bilgiler | Set B | `MEBİ Kural Motoru (Fallback)` | **Fallback Devreye Girdi** (Netlify 22s Timeout) | 7 | 100 |
| 9 | 7. Sınıf Din Kültürü | Set A | `gemini-3.5-flash-lite` | **Canlı Gemini Başarılı** | 8 | 100 |
| 10 | 7. Sınıf Din Kültürü | Set B | `gemini-3.5-flash-lite` | **Canlı Gemini Başarılı** | 8 | 100 |

### Başarı Oranlarının Ayrımı:
- **Doğrudan Canlı Gemini API Başarısı:** **8 / 10 (%80,0)**
- **Yerel Fallback Motoru Başarısı:** **2 / 10 (%20,0)**
- **Kullanıcıya Geçerli 100 Puanlık Sınav Teslim Başarısı:** **10 / 10 (%100,0)**

> [!WARNING]
> **Düzeltilmesi Gereken Rapor İfadesi:**
> `13_ORTAK_EKSIKLER_VE_GELISTIRME_PLANI.md` raporundaki *"canlı Gemini API üzerinde %100 başarıyla doğruladığımız mimari"* ifadesi gerçeği tam yansıtmamaktadır. Doğru ifade: **"Canlı Gemini API üzerinde %80 doğrudan model başarısı, yedek yerel fallback motoru ile birlikte %100 uçtan uca sınav üretim başarısı"** şeklinde olmalıdır.

---

## 8. Kaynak Dosyaları (PDF) Dosya Adı ve Yol Eşleşme Denetimi

`~/Desktop/OYSS_KAYNAKLAR/` klasöründeki 36 resmî PDF dosyası taranmış ve raporlardaki referanslarla karşılaştırılmıştır:

- **Ders Kitapları (24 Dosya):**
  - `5_SINIF/DERS_KITAPLARI/DERS_KITABI_DKAB.pdf` $\rightarrow$ **Eşleşti** (198 s.)
  - `5_SINIF/DERS_KITAPLARI/DERS_KITABI_FEN_BILIMLERI_1.pdf` $\rightarrow$ **Eşleşti** (152 s.)
  - `5_SINIF/DERS_KITAPLARI/DERS_KITABI_FEN_BILIMLERI_2.pdf` $\rightarrow$ **Eşleşti** (170 s.)
  - `5_SINIF/DERS_KITAPLARI/DERS_KITABI_INGILIZCE_CALISMA_KITABI.pdf` $\rightarrow$ **Eşleşti** (66 s.)
  - `5_SINIF/DERS_KITAPLARI/DERS_KITABI_INGILIZCE_DERS_KITABI.pdf` $\rightarrow$ **Eşleşti** (175 s.)
  - `5_SINIF/DERS_KITAPLARI/DERS_KITABI_INGILIZCE_OGRETMEN_KILAVUZ_KITABI.pdf` $\rightarrow$ **Eşleşti** (192 s.)
  - `5_SINIF/DERS_KITAPLARI/DERS_KITABI_MATEMATIK_1.pdf` $\rightarrow$ **Eşleşti** (171 s.)
  - `5_SINIF/DERS_KITAPLARI/DERS_KITABI_MATEMATIK_2.pdf` $\rightarrow$ **Eşleşti** (189 s.)
  - `5_SINIF/DERS_KITAPLARI/DERS_KITABI_SOSYAL_BILGILER_1.pdf` $\rightarrow$ **Eşleşti** (154 s.)
  - `5_SINIF/DERS_KITAPLARI/DERS_KITABI_SOSYAL_BILGILER_2.pdf` $\rightarrow$ **Eşleşti** (150 s.)
  - `5_SINIF/DERS_KITAPLARI/DERS_KITABI_TURKCE_1.pdf` $\rightarrow$ **Eşleşti** (178 s.)
  - `5_SINIF/DERS_KITAPLARI/DERS_KITABI_TURKCE_2.pdf` $\rightarrow$ **Eşleşti** (160 s.)
  - `6_SINIF/DERS_KITAPLARI/DERS_KITABI_DKAB.pdf` $\rightarrow$ **Eşleşti** (189 s.)
  - `6_SINIF/DERS_KITAPLARI/DERS_KITABI_FEN_BILIMLERI_1.pdf` $\rightarrow$ **Eşleşti** (190 s.)
  - `6_SINIF/DERS_KITAPLARI/DERS_KITABI_FEN_BILIMLERI_2.pdf` $\rightarrow$ **Eşleşti** (130 s.)
  - `6_SINIF/DERS_KITAPLARI/DERS_KITABI_INGILIZCE_CALISMA_KITABI.pdf` $\rightarrow$ **Eşleşti** (75 s.)
  - `6_SINIF/DERS_KITAPLARI/DERS_KITABI_INGILIZCE_DERS_KITABI.pdf` $\rightarrow$ **Eşleşti** (167 s.)
  - `6_SINIF/DERS_KITAPLARI/DERS_KITABI_INGILIZCE_OGRETMEN_KILAVUZ_KITABI.pdf` $\rightarrow$ **Eşleşti** (182 s.)
  - `6_SINIF/DERS_KITAPLARI/DERS_KITABI_MATEMATIK_1.pdf` $\rightarrow$ **Eşleşti** (224 s.)
  - `6_SINIF/DERS_KITAPLARI/DERS_KITABI_MATEMATIK_2.pdf` $\rightarrow$ **Eşleşti** (166 s.)
  - `6_SINIF/DERS_KITAPLARI/DERS_KITABI_SOSYAL_BILGILER_1.pdf` $\rightarrow$ **Eşleşti** (187 s.)
  - `6_SINIF/DERS_KITAPLARI/DERS_KITABI_SOSYAL_BILGILER_2.pdf` $\rightarrow$ **Eşleşti** (116 s.)
  - `6_SINIF/DERS_KITAPLARI/DERS_KITABI_TURKCE_1.pdf` $\rightarrow$ **Eşleşti** (177 s.)
  - `6_SINIF/DERS_KITAPLARI/DERS_KITABI_TURKCE_2.pdf` $\rightarrow$ **Eşleşti** (160 s.)
- **MEBİ Örnek Sınavları (12 Dosya):**
  - `5_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_DKAB.pdf` $\rightarrow$ **Eşleşti** (7 s.)
  - `5_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_FEN_BILIMLERI.pdf` $\rightarrow$ **Eşleşti** (9 s.)
  - `5_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_INGILIZCE.pdf` $\rightarrow$ **Eşleşti** (7 s.)
  - `5_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_MATEMATIK.pdf` $\rightarrow$ **Eşleşti** (29 s.)
  - `5_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_SOSYAL_BILGILER.pdf` $\rightarrow$ **Eşleşti** (8 s.)
  - `5_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_TURKCE.pdf` $\rightarrow$ **Eşleşti** (13 s.)
  - `6_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_DKAB.pdf` $\rightarrow$ **Eşleşti** (7 s.)
  - `6_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_FEN_BILIMLERI.pdf` $\rightarrow$ **Eşleşti** (14 s.)
  - `6_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_INGILIZCE.pdf` $\rightarrow$ **Eşleşti** (10 s.)
  - `6_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_MATEMATIK.pdf` $\rightarrow$ **Eşleşti** (12 s.)
  - `6_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_SOSYAL_BILGILER.pdf` $\rightarrow$ **Eşleşti** (8 s.)
  - `6_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_TURKCE.pdf` $\rightarrow$ **Eşleşti** (12 s.)

> [!NOTE]
> Raporlarda verilen 36 PDF dosya adı ve göreli yolu, ana kaynak klasöründeki fiziksel dosyalarla **%100 birebir örtüşmektedir**.

---

## 9. Raporlarda Düzeltilmesi Gereken İfadeler Listesi

Bu doğrulama çalışması sonucunda önceki raporlarda düzeltilmesi gereken 3 husus netleşmiştir:

1. **Bireysel Branş Raporlarındaki Soru Sayıları (`01` - `12`):**
   - Raporların 4. Bölüm tablolarındaki hazır sınav soru sayıları, gerçek `sampleExams.ts` sayıları olan **G5: 191 Soru** ve **G6: 195 Soru** (toplam 386) ile güncellenmelidir (356 toplamı düzeltilmelidir).
2. **Gemini Model Adı (`13_ORTAK_EKSIKLER_VE_GELISTIRME_PLANI.md`):**
   - Şema diyagramındaki `Gemini 2.5 Flash` ibaresi, gerçek konfigürasyon olan **`gemini-3.5-flash-lite`** olarak düzeltilmelidir.
3. **Canlı Test Başarı İfadesi (`13_ORTAK_EKSIKLER_VE_GELISTIRME_PLANI.md`):**
   - Bölüm 3'teki *"Gemini API üzerinde %100 başarıyla doğruladığımız"* ifadesi, **"Canlı Gemini API üzerinde %80 doğrudan başarı, yedek motor ile %100 sınav teslim başarısı"** şeklinde revize edilmelidir.
