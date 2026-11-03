# OYSS 7. Sınıf Türkçe MEBİ Pilotu: Doğrulama ve İnceleme Raporu

**Tarih:** 29 Ekim 2026  
**Kapsam:** 7. Sınıf Türkçe MEBİ Soru Yaklaşımı İyileştirme Pilotu Değişikliklerinin Tarayıcı Üzerinden Uçtan Uca Doğrulanması  
**Kullanılan Yöntem:** Google Chrome (Headless CDP / DevTools Protocol) ve Yerel Entegrasyon Doğrulayıcı  
**Durum:** Kod değiştirilmedi, yeni dosya eklenmedi/silinmedi, Git/deploy işlemi yapılmadı.

---

## Yönetici Özeti

Kullanıcı gereksinimleri doğrultusunda, **birim testlerinin ötesine geçilerek** gerçek Chromium tarayıcısı üzerinde DOM etkileşimleri, stil hesaplamaları (`window.getComputedStyle`), `@media print` simülasyonu ve kullanıcı tıklama akışları yürütülmüştür.

Elde edilen sonuçlar talep edilen üç kategoride özetlenmiştir:
- **Doğrulandı:** 4 Başlık (Hazır Sınav, Etkileşimli Çözüm & Rubrik Puanlama, Yapay Zekâ Üretim Önizlemesi, Regresyon & Bütünlük)
- **Sorun Bulundu:** 1 Başlık (Öğretmen Cevap Anahtarının A4 Baskısında `print:hidden` Nedeniyle Çıkmaması)
- **Manuel Kontrol Gerekli:** 2 Madde (Canlı Gemini API Yanıtı ve Fiziksel Yazıcı Sayfa Kırılımları)

---

## 1. DOĞRULANDI

### A. Hazır Sınav (7. Sınıf Türkçe Senaryo 1)
- **Model Cevap Gösterimi:** 1, 2 ve 3. sorularda MEBİ model cevap ve çözüm adımları eksiksiz şekilde açılmaktadır.
- **Alternatif Cevaplar:**
  - **Soru 1 (`T.O.7.4`):** 3 adet kabul edilebilir alternatif ifade listelenmektedir (Örn: *"Mefkûre: Ulaşılmak istenen hedef, ideal veya milletin ortak gayesidir."*).
  - **Soru 2 (`T.O.7.5`):** 3 adet alternatif konu cümlesi listelenmektedir (Örn: *"Kurtuluş Savaşı'nda kağnı kollarıyla cepheye cephane taşıyan Şerife Bacı'nın kahramanlığı ve fedakârlığı."*).
  - **Soru 3 (`T.O.7.8`):** 3 adet değer dünyası ve metin içi delil alternatifi listelenmektedir.
- **Rubrik Ölçüt Dağılımı:**
  - **Soru 1 (`T.O.7.4`):** 4 bağımsız ölçüt (Tahmin 4p + Gerekçe 4p + Tespit 4p + Delil 3p = 15p).
  - **Soru 2 (`T.O.7.5`):** Yüzey anlamın doğasına uygun tek odaklı ölçüt (15p).
  - **Soru 3 (`T.O.7.8`):** 2 bağımsız ölçüt (Değer tespiti 7p + Metin içi delil 7p = 14p).

### B. Etkileşimli Çözüm ve Öz Değerlendirme
- **Akış ve Açılma Mantığı:**
  - Sınav başlangıcında cevap yazılmadan model cevap ve rubrik kilitli kalmaktadır.
  - Öğrenci yanıt kutusuna metin girdiğinde *"Model Cevap ve Rubriği İncele (Öz Değerlendirme)"* butonu aktifleşmektedir.
  - Tıklandığında model cevap ve hemen altında *"Kabul Edilebilir Diğer Örnek Yanıtlar"* paneli açılmaktadır.
  - Panel altında pedagojik yönlendirme notu yer almaktadır:
    > *"Kendi cevabınız yukarıdaki örneklerle aynı anlama veya kavrama ulaşıyorsa doğru kabul edebilirsiniz."*
- **Rubrikle Puanlama ve Kısmi Başarı:**
  - Soru 1'deki 4 ölçüt bağımsız butonlar olarak listelenmektedir.
  - Yalnızca 1. ölçüt (+4p) işaretlendiğinde: Puan **4 / 15 p** olarak hesaplanmıştır.
  - 1. ve 3. ölçüt (+4p + 4p) işaretlendiğinde: Puan **8 / 15 p** olarak hesaplanmıştır.
  - Ölçütler seçildikçe kısmi başarı öğrencinin puanına tam orantılı yansımaktadır.

### C. Yapay Zekâ ile Sınav Üretimi
- Modal içerisinde 7. Sınıf Türkçe Senaryo 1 kuralları başarıyla işletilmiştir.
- Soru kökleri duru, net ve eyleme yöneliktir ("...tahmin ediniz", "...açıklayınız").
- Üretilen sorularda model cevabın yanında *"Kabul Edilebilir Diğer Örnek Yanıtlar"* dizisi (`alternativeAnswers`) yapısal olarak mevcuttur.
- Çıkarım sorularında rubrik ölçütleri teşhis ve delil olarak ayrılmıştır.

### D. Regresyon Kontrolleri
- **Test Paketleri:** 5 ayrı test paketindeki 58 testin 58'i (%100) başarıyla geçmiştir:
  - `tests/mebiPilotTurkish.test.ts`: 7/7 Başarılı
  - `tests/practiceAndScoring.test.ts`: 30/30 Başarılı
  - `tests/sourceMaterialValidation.test.ts`: 7/7 Başarılı
  - `tests/quickStartGuide.test.ts`: 6/6 Başarılı
  - `tests/mathEditor.test.ts`: 8/8 Başarılı
- **TypeScript Tip Kontrolü (`npx tsc --noEmit`):** 0 hata.
- **Üretim Derlemesi (`npm run build`):** 0 hata, 2.02 saniyede tek dosya üretim paketi (`dist/index.html`) derlenmiştir.

---

## 2. SORUN BULUNDU

### [SORUN-01] Öğretmen Cevap Anahtarının A4 Yazdırma Çıktısında Gizlenmesi (`print:hidden`)

- **Etkilenen Dosya:** `src/components/ExamPaperView.tsx` (Satır 344)
- **Sorun Tanımı:**
  Öğretmen sınav kâğıdı görünümünde üst kontrol çubuğundaki *"Rubrik & Çözümleri Göster"* anahtarını açtığında; ekranda model cevap, alternatif cevaplar ve analitik rubrik tablosu eksiksiz görüntülenmektedir (`display: block`). Ancak kullanıcı tarayıcıdan *"Yazdır"* (Ctrl+P / Cmd+P) dediğinde veya PDF çıktısı almak istediğinde, cevap anahtarı kutusundaki **`print:hidden`** sınıfı nedeniyle tüm çözüm ve rubrik alanı baskı stilinde gizlenmektedir (`display: none`). Çıktıda yalnızca boş öğrenci çözüm satırları basılmaktadır.
- **Yeniden Üretme Adımları:**
  1. Portal ana sayfasından **7. Sınıf -> 1. Dönem 1. Yazılı -> Türkçe -> Senaryo 1** sınav kâğıdını seçin.
  2. Üstteki kontrol alanından **"Rubrik & Çözümleri Göster"** butonuna tıklayın (ekranda yeşil cevap kutuları ve alternatif cevaplar görünür).
  3. Tarayıcının yazdırma menüsünü açın (Cmd+P / Ctrl+P veya sayfadaki "Yazdır" butonu).
  4. Yazdırma önizleme ekranında soruların altını inceleyin.
- **Beklenen Davranış:**
  "Rubrik & Çözümleri Göster" butonu açıkken yazdırıldığında, A4 kâğıdında soruların altında öğretmen için hazırlanan model cevap, kabul edilebilir alternatif yanıtlar ve analitik rubrik tablosunun basılması; buton kapalıyken ise öğrenci kâğıdı olarak boş çizgilerin basılması.
- **Gerçekleşen Davranış:**
  Satır 344'teki `className="mt-5 p-4 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs text-slate-800 space-y-3 print:hidden"` ifadesinde `print:hidden` bulunduğu için `@media print` medyasında `display: none !important` uygulanmakta ve cevap anahtarı baskıya yansımamaktadır.

---

## 3. MANUEL KONTROL GEREKLİ

1. **Canlı Gemini API Entegrasyonu:**
   Yerel doğrulama ortamında Netlify Function sunucu proxy'si (`/api/generate`) bulunmadığı için sistem otomatik ve güvenli şekilde yerel TIER 2 MEBİ motoruna geçmiş ve başarıyla doğrulanmıştır. Canlı ortamda Netlify API anahtarıyla üretilen dinamik soruların yanıt çeşitliliği kullanıcı tarafından canlı sitede kontrol edilmelidir.
2. **Fiziksel Yazıcı Sayfa Kırılımları (Page Break):**
   A4 yazdırma çıktısında soru gövdelerinin ve boş çözüm satırlarının sayfa ortasında bölünmemesi (`page-break-inside: avoid`) stilleri yer almaktadır; farklı yazıcı sürücüleri ve tarayıcı kenar boşlukları (margins) ile fiziksel bir kâğıt baskısı alınarak gözle teyit edilmelidir.

---

## Doğrulama Matrisi Özeti

| No | Doğrulama Alanı | Durum | Açıklama |
| :---: | :--- | :---: | :--- |
| 1 | Hazır Sınavda Model & Alternatif Cevaplar | **Doğrulandı** | Soru 1, 2, 3'te MEBİ alternatifleri ve modeli ekranda eksiksiz. |
| 2 | Çıkarım ve Söz Varlığı Rubrik Ayrımı | **Doğrulandı** | Soru 1'de 4 ölçüt, Soru 3'te 2 ölçüt, Soru 2'de 1 ölçüt. |
| 3 | Etkileşimli Çözümde Alternatif Gösterimi | **Doğrulandı** | Pedagojik rehberlik notuyla birlikte açılmaktadır. |
| 4 | Etkileşimli Modda Kısmi Başarı Puanlama | **Doğrulandı** | Ölçüt seçimlerine göre 4p, 8p, 11p, 15p anında hesaplandı. |
| 5 | Yapay Zekâ Üretim Motoru Türkçe Pilotu | **Doğrulandı** | Soru kökleri duru, alternatif cevap alanı mevcut. |
| 6 | Öğretmen Cevap Anahtarı A4 Yazdırma Çıktısı | **Sorun Bulundu** | Satır 344'teki `print:hidden` nedeniyle baskıda `display: none`. |
| 7 | Tüm Testler, Tip Kontrolü ve Build | **Doğrulandı** | 58/58 test başarılı, tsc hatasız, build 2.02s. |
| 8 | Canlı API & Yazıcı Sayfa Kırılımı | **Manuel Kontrol Gerekli** | Canlı dağıtım sonrasında incelenmeli. |
