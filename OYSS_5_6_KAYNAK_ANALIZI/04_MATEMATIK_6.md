# OYSS 6. SINIF MATEMATİK KAYNAK VE MİMARİ ANALİZ RAPORU

**Rapor Kodu:** `04_MATEMATIK_6.md`  
**Sınıf ve Branş:** 6. Sınıf Matematik  
**Müfredat Kapsamı:** Türkiye Yüzyılı Maarif Modeli (TYMM)  
**Tarih:** 31 Ekim 2026  
**Durum:** Tamamlandı - Geliştirme Yol Haritasına Hazır  

---

## 1. Kaynak Dosyaları ve Yayın Künyesi

### A. Ders Kitapları
1. **1. Kitap (1. Dönem Odaklı):**
   - **Dosya Adı:** `6_SINIF/DERS_KITAPLARI/DERS_KITABI_MATEMATIK_1.pdf`
   - **Sayfa Sayısı:** 224 sayfa
   - **Yayın Bilgisi:** Millî Eğitim Bakanlığı Yayınları No: 10255 / Ders Kitapları Dizisi No: 2260
   - **Yazarlar:** Komisyon
   - **ISBN:** 978-975-11-8773-4
   - **Talim ve Terbiye Kurulu Kararı:** 27.05.2024 tarih ve 23 sayılı karar
2. **2. Kitap (2. Dönem Odaklı):**
   - **Dosya Adı:** `6_SINIF/DERS_KITAPLARI/DERS_KITABI_MATEMATIK_2.pdf`
   - **Sayfa Sayısı:** 166 sayfa
   - **ISBN:** 978-975-11-8773-4 (Takım numarası)
   - **İlişki:** 2. Kitap 5. Tema (Geometrik Şekiller) ve 6. Tema (Cebirsel Düşünme) konularını içerir. 1. dönem 1. yazılı için temel kaynak 1. Kitap'tır.

### B. MEBİ Örnek Sınavı
- **Dosya Adı:** `6_SINIF/MEBI_ORNEK_SINAVLAR/MEBI_MATEMATIK.pdf`
- **Sayfa Sayısı:** 12 sayfa
- **Hazırlayan:** T.C. Millî Eğitim Bakanlığı Temel Eğitim Genel Müdürlüğü
- **Başlık:** "6. Sınıf 1. Dönem - 1. Yazılı Yazılıya Hazırlanıyorum"
- **Açıklama:** Senaryolardaki tüm öğrenme çıktılarını kapsayan 15 adet açık uçlu problem, tam çözümler ve detaylı dereceli puanlama anahtarı.

---

## 2. Ders Kitabı İçerik ve Ünite Mimarisi

6. Sınıf Matematik 1. Kitap'ta 1. Dönem 1. Yazılı konuları 1. ve 2. Temalarda yer almaktadır:

### 1. Tema: Sayılar ve Nicelikler (1) (Sayfa 12 - 85)
- **Anahtar Kavramlar:** Asal çarpanlar, asal sayılar, bölünebilme kuralları, çarpanlar, katlar, ortak bölen (EBOB temeli), ortak kat (EKOK temeli).
- **Semboller ve Matematiksel Gösterimler (KaTeX Zorunlu):** $a \cdot b$, $2^n \cdot 3^m$, $\text{EBOB}(a, b)$, $\text{EKOK}(a, b)$.
- **Alt Konular ve Sayfa Aralıkları:**
  1. *Bir Doğal Sayının Çarpanları ve Katları* (s. 16-26): Çarpan bulma, gökkuşağı yöntemi, dikdörtgen alanı modellemesi.
  2. *Kalansız Bölünebilme Kriterleri* (s. 27-37): 2, 3, 4, 5, 6, 9 ve 10 ile bölünebilme kuralları, basamak değerleri üzerinden kural ispatı.
  3. *Asal Sayılar ve Asal Çarpanlar* (s. 38-48): 1 ile 100 arasındaki asal sayılar, Eratosthenes kalburu, çarpan ağacı, bölen listesi (asal çarpan algoritması).
  4. *Ortak Kat ve Ortak Bölen* (s. 49-85): Günlük hayat problemleri, periyodik nöbet/sefer problemleri (ortak kat), eşit paylaştırma/parçalama problemleri (ortak bölen).

### 2. Tema: Veriden Olasılığa (Sayfa 86 - 151)
- Olasılık tahmini ve gözleme dayalı deneysel olasılık (`MAT.6.6.1`).

---

## 3. MEBİ Örnek Sınavı Detaylı Analizi

MEBİ 6. Sınıf Matematik sınavı 15 açık uçlu problemden oluşmaktadır (Sayfa 7):

| Soru No | Öğrenme Çıktısı Kodu | Öğrenme Çıktısı Açıklaması | Soru Tipi ve Bilişsel Düzey | Ölçülen Beceri ve KaTeX İhtiyacı |
|---|---|---|---|---|
| **1, 2, 3, 4** | `MAT.6.1.1` | Problem durumlarında bir doğal sayının çarpan ve katlarına yönelik muhakeme yapabilme | Dikdörtgen alanı üzerinden kenar uzunlukları bulma, tel kesme, kat problemleri | $A = a \cdot b = 48\text{ cm}^2$, çarpan ikilileri: $(1, 48), (2, 24), (3, 16), (4, 12), (6, 8)$. |
| **5, 6, 7** | `MAT.6.1.2` | Bir doğal sayının 2, 3, 4, 5, 6, 9 ve 10 ile tam bölünebilme kriterlerine ilişkin çıkarım yapabilme | Dört basamaklı $4A7B$ sayısı gibi basamak tamamlama, kalan bulma ve ortak bölünebilme | $4A7B$ sayısının 5 ve 9'a tam bölünebilmesi için $B \in \{0, 5\}$ analizi. |
| **8, 9, 10** | `MAT.6.1.3` | Bir doğal sayının asal olma durumunu ve asal çarpanlarını çözümleyebilme | Asal sayı testi, çarpan ağacı tamamlama, üslü biçimde yazma | $72 = 2^3 \cdot 3^2$, asal çarpanlar kümesi: $\{2, 3\}$. |
| **11, 12, 13, 14** | `MAT.6.1.4` | Günlük hayat problemleri üzerinden ortak kat ve ortak böleni yorumlayabilme | Otobüs hareket saatleri (ortak kat), poşetleme/fayans döşeme (ortak bölen) | $\text{EKOK}(12, 15) = 60\text{ dk}$, $\text{EBOB}(36, 48) = 12\text{ kg}$. |
| **15** | `MAT.6.6.1` | Bir olayın olasılığını gözleme dayalı tahmin edebilme | Torbadan top çekme, çark döndürme deneyinde olası durumlar | $\frac{\text{İstenen Durum}}{\text{Tüm Durumlar}} = \frac{3}{8}$. |

### MEBİ Ölçme ve Değerlendirme Yaklaşımı:
- Her sorunun çözümünde aşamalı puanlama esastır:
  1. Problemin matematiksel modelini kurma (Kısmi Puan).
  2. Doğru çarpan/bölünebilme kuralını işletme (Kısmi Puan).
  3. Nihai doğru sonuca ulaşma ve birimini yazma (Tam Puan).
- Alternatif çözüm stratejileri (ör. çarpan ağacı veya bölen listesi) eşit derecede kabul edilmiştir.

---

## 4. Mevcut OYSS Mimarisiyle Karşılaştırma

| Dosya / Bileşen | Mevcut Durum | Tespit Edilen Eksik / Uyumsuzluk |
|---|---|---|
| `src/data/curriculumData.ts` | 6. Sınıf Matematik için 3 senaryo mevcuttur (Senaryo 1: 3 soru, Senaryo 2: 4 soru, Senaryo 3: 5 soru). | Senaryolarda MEBİ'nin 15. sorusu olan `MAT.6.6.1` olasılık kazanımı yer almamaktadır (1. dönem 1. yazılı senaryo dağılımında sadece `MAT.6.1.1`-`MAT.6.1.4` vardır). Senaryo notları zenginleştirilmelidir. |
| `src/data/outcomeStudyBank.ts` | 4 kazanım tanımlıdır (`MAT.6.1.1`, `MAT.6.1.2`, `MAT.6.1.3`, `MAT.6.1.4`). | **0/4** kazanımda ders kitabı ünitesi (`textbookUnit`), sayfa aralığı (`textbookPageRange`) ve ders kitabı örnekleri boştur. |
| `src/data/sampleExams.ts` | 3 hazır sınav, toplam 12 soru bulunmaktadır. Puanlar 100 puana tamamlanmıştır. | 12 sorunun **tamamında (0/12)** `alternativeAnswers` dizisi boştur! İşlem adımları kısmi puan basamaklarına ayrılmamıştır. KaTeX $...$ eksiktir. |
| `src/generators/prompts/promptRegistry.ts` | `6_matematik` için özel kütük kaydı yoktur. `genericPrompt.ts`ye düşmektedir. | 7. sınıf matematik direktifleri standartlarında, çarpan ağacı, bölünebilme kural analizleri ve KaTeX korumasını içeren `grade6MathPrompt.ts` hazırlanmalıdır. |
| `src/data/fallbackPools/` | 6. Sınıf Matematik için hiçbir fallback sorusu yoktur (**0 soru**). | Ağ/model arızasında çalışacak Set A ve Set B fallback havuzları bulunmamaktadır. |

---

## 5. Branşa Özgü Geliştirme İhtiyaçları ve Eylem Planı

1. **KaTeX Standardizasyonu:**
   - Çarpan, üslü ifade ($2^3 \cdot 3^2$), bölünebilme ve denklem sembolleri eksiksiz $...$ formatına alınmalıdır.
2. **`grade6MathPrompt.ts` Geliştirilmesi:**
   - Sayıların gerçekçi ve hesaplanabilir aralıklarda seçilmesi (ör. 1000'den küçük doğal sayılar).
   - Çarpan ağacı ve bölen listesi yöntemlerinin her ikisini de kapsayan alternatif cevaplar üretilmesi.
   - Analitik basamaklı rubrik zorunluluğu eklenmesi.
3. **`outcomeStudyBank.ts` Sayfa Referansları:**
   - `MAT.6.1.1`-`MAT.6.1.4` kazanımlarına Ders Kitabı 1. Tema (*Sayılar ve Nicelikler*, s. 12-85) sayfa aralıkları eklenmelidir.
4. **Fallback Havuzunun Oluşturulması:**
   - `src/data/fallbackPools/grade6/mathFallbackPool.ts` yazılarak Set A ve Set B için zengin çarpan, bölünebilme ve problem çözme soruları üretilmelidir.
