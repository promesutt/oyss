# OYSS Canlı Dağıtım ve Kaynak Materyal Doğrulama Raporu

**Tarih:** 29 Ekim 2026  
**Commit Kimliği:** [`284d618`](https://github.com/promesutt/oyss/commit/284d618)  
**Canlı Site URL:** https://ortakyazili.netlify.app  
**Dağıtım Durumu:** **BAŞARILI & CANLIDA AKTİF (HTTP 200 OK)**  
**Toplam Test:** 45/45 Test Başarılı (%100)  

---

## 1. Dağıtım Öncesi Yerel Doğrulama Özeti

Tüm değişiklikler Git commit işleminden önce yerel ortamda titizlikle test edilmiştir:

1. **Ayvalık Zeytin Hasadı Ortak Metin Doğrulaması:**
   - `exam_5_turkce_1_1_senaryo_6` sınavındaki 8 soru incelenmiştir.
   - 1. Soru (Sözcükte Anlam), 2. Soru (Ana Fikir/Detay), 3. Soru (Zeytinyağı Aşamaları - canlıda hata veren soru) ve 7. Soru (Başlık Belirleme) başarıyla `ortak_metin_1` kimliği altında birleştirilmiştir.
   - Her dört soruya da 436 karakterlik tam okuma metni (`"Ekim ayının son günlerinde Ayvalık'taki zeytinliklerde..."`) ve `commonStimulus = true` özelliği eksiksiz işlenmiştir.
   - Soru 4, 5, 6 ve 8 (sözcük bilgisi, atasözleri, dilbilgisi) bağımsız sorular olarak korunmuş ve hiçbir hata almamıştır (`hasMissingSourceError = false`).

2. **3 Görünüm Alanında Doğrulama:**
   - **AI Sınav Önizleme Modalı (`AIGeneratorModal.tsx`):** Ortak metin rozeti ve eksik materyal turuncu uyarı kartı doğrulanmıştır.
   - **A4 Yazdırma Görünümü (`ExamPaperView.tsx`):** Ortak metin rozeti ve basılabilir uyarı blokları doğrulanmıştır.
   - **Etkileşimli Sınav Çözüm Modülü (`InteractivePracticeView.tsx`):** Eksik kaynaklı soruların cevap girişi ve rubrik butonlarının kilitlenmesi, sonuç tablosunda "Değerlendirme Dışı" olarak gösterilmesi doğrulanmıştır.

3. **Kaynak Gerektirmeyen Bağımsız Sorular:**
   - Dört işlem, denklem, geometri, dilbilgisi kuralları gibi kaynak gerektirmeyen bağımsız soruların hatalı olarak reddedilmediği (`type: 'none'`, `requiresSource: false`) doğrulanmıştır.

4. **Test ve Derleme Komutları:**
   - `npx tsx tests/sourceMaterialValidation.test.ts`: **7/7 BAŞARILI**
   - `npx tsx tests/practiceAndScoring.test.ts`: **30/30 BAŞARILI**
   - `npx tsx tests/mathEditor.test.ts`: **8/8 BAŞARILI**
   - `npx tsc --noEmit`: **0 Hata (Temiz)**
   - `npm run build`: **2.06s - Başarılı (`dist/index.html` 2,384 kB)**

---

## 2. GitHub Commit ve Push Detayı

- **Dal (Branch):** `main`
- **Commit Hash:** `284d618`
- **Uzak Depo:** `git@github.com:promesutt/oyss.git`
- **Commit Mesajı:**
  > fix: AI sinavlarinda eksik kaynak metin hatasini gider ve evrensel dogrulama altyapisi ekle
  > 
  > - sourceMaterialValidator: metin, tablo, grafik, diyalog gereksinimlerini otomatik tespit et
  > - ortak kaynak metin (commonStimulus / sharedSourceId) baglantisi kur
  > - ungrounded / kaynagi bulunamayan sorulari belirgin hata ile isaretle ve cozulebilir gibi sunma
  > - aiGeneratorEngine: Tier 2 soru havuzundan secimde orijinal sinavin ana metnini miras al
  > - sampleExams: Senaryo 1 ve Senaryo 6 sorularina tam metinleri ekle
  > - AIGeneratorModal, ExamPaperView ve InteractivePracticeView gorumlerinde kaynak durumunu tutarli yansit
  > - 7 senaryolu otomatik test paketi ekle (45/45 test basarili)

---

## 3. Canlı Netlify Dağıtım Doğrulaması

GitHub `main` dalına push edilmesinin ardından Netlify otomatik CI/CD boru hattı tetiklenmiş ve dağıtım başarıyla tamamlanmıştır:

1. **HTTP Durumu:**
   - `https://ortakyazili.netlify.app` uç noktası HTTP/2 200 OK yanıtı vermektedir.
2. **Canlı Paket İçeriği Doğrulaması:**
   - Canlı siteden çekilen HTML/JS bundle üzerinde:
     * `Ayvalık'taki zeytinliklerde` tam metin öbeği **DOĞRULANDI**
     * `Bu soru ortak kaynak metnine dayanmaktadır` rozet metni **DOĞRULANDI**
     * `Kaynak Materyal Bulunamadı` güvenlik bariyeri **DOĞRULANDI**
3. **Canlı Sunucusuz API Uç Noktası (`/api/generate`):**
   - Canlı uç noktaya test isteği gönderilmiş ve Google Generative Language API (`gemini-3.5-flash-lite`) üzerinden başarıyla yanıt alınmıştır:
     ```json
     {"status":"ok","ping":true,"activeModel":"gemini-3.5-flash-lite"}
     ```

---

## 4. Sonuç ve Kullanıcı Kontrol Noktaları

Canlı sitede (`https://ortakyazili.netlify.app`) şu akışlar güvenle deneyimlenebilir:
- **Türkçe 5. Sınıf 1. Dönem 1. Yazılı Senaryo 6 Sınavı:**
  * Soru 1, Soru 2, Soru 3 (Zeytinyağı aşamaları) ve Soru 7'de Ayvalık zeytin hasadı metni eksiksiz görüntülenmektedir.
  * Soruların üzerinde *"Ortak Kaynak Metni"* rozeti yer almaktadır.
- **Yapay Zekâ ile Sınav Üretimi:**
  * Üretilen sorularda eksik metin kalması engellenmiş, havuzdan seçilen sorular ana metinlerini beraberinde taşımaktadır.
- **Etkileşimli Çözüm ve İki Kademeli Öz Değerlendirme:**
  * Model cevap ve rubrikler başlangıçta kapalıdır; öğrenci anlamlı bir cevap yazdıktan sonra kontrollü şekilde açılmaktadır.
  * Matematiksel cevap düzenleyicisi (KaTeX) kesir, kök ve denklemleri düzgün biçimlendirmektedir.
