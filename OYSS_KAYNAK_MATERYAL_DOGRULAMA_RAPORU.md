# OYSS Yapay Zekâ Sınavlarında Kaynak Materyal Doğrulama ve Ortak Metin Yönetimi Raporu

**Tarih:** 29 Ekim 2026  
**Durum:** Çözüm Tamamlandı, 45/45 Test Başarılı, Derleme Sorunsuz (Onay Bekleniyor)  
**Kapsam:** Yapay zekâ sınav kâğıtlarında eksik kaynak metin hatasının giderilmesi, evrensel kaynak materyal doğrulama altyapısı, ortak uyarıcı (`commonStimulus` / `sharedSourceId`) bağlantısı ve tüm görünümlerde tutarlılık.

---

## 1. Kök Neden Analizi (Adli İnceleme ve Kesin Bulgular)

Canlı ortamda tespit edilen **"Zeytin hasadı ve zeytinyağı üretim aşamaları"** sorusunun kaynak metinsiz kalması sorunu, derinlemesine incelenerek kök nedenine ulaşılmıştır:

1. **Örnek Sınav Veri Modelindeki Tekillik (`SAMPLE_EXAMS`):**
   - `src/data/sampleExams.ts` içerisindeki `exam_5_turkce_1_1_senaryo_6` sınavında Ayvalık zeytin hasadını anlatan 436 karakterlik zengin okuma parçası (`"Ekim ayının son günlerinde Ayvalık'taki zeytinliklerde hummalı bir çalışma başlar..."`), **yalnızca 1. sorunun `stimulus` alanında** tanımlanmıştı.
   - Aynı metne dayanan 2., 3., 5. ve 7. sorularda ise tam metin yerine:
     - 2. soruda: `"1. sorudaki Ayvalık zeytin hasadı metnini dikkate alınız."` (çapraz soru referansı)
     - 3. soruda (hataya konu olan soru): `"Metinde zeytinin toplanıp yağa dönüştürülmesine kadar belirli bir sıra anlatılmıştır."` (soyut meta-özet) yer almaktaydı.

2. **Yapay Zekâ Motorundaki Havuz Seçim Mantığı (`aiGeneratorEngine.ts`):**
   - AI Soru Üretim Motoru, API kotası / offline yedek (Tier 2) veya şablon tamamlama amacıyla soru üretirken `SAMPLE_EXAMS` havuzundan sadece hedeflenen kazanım koduna (`T.O.5.6`) göre tekil soru seçmekteydi.
   - Soru 3, ait olduğu sınav bağlamından (ve 1. sorudaki kaynak metinden) koparılarak yeni oluşturulan sınavın 1. sorusu olarak yerleştirilmişti.
   - Böylece soru kökü *"Metinde zeytinin..."* dediği halde, metnin kendisi geride kaldığından sınav kâğıdına aktarılamamıştır.
   - Diğer yandan, sınavın 2. sorusunda ahşap oyuncak metninin doğru görünmesinin sebebi; havuzdan `T.O.5.1` kazanımı için tesadüfen `exam_5_turkce_1_1_senaryo_1`'in **1. sorusunun** seçilmiş olması ve metnin bizzat o sorunun `stimulus` alanında bulunmasıydı.

3. **Gemini Canlı Prompt Eksiği:**
   - Prompt yönergelerinde "eğer soru bir metne veya tabloya dayanıyorsa tam içerik `stimulus` alanına yazılmalıdır" şeklinde bağlayıcı bir kural bulunmadığından, LLM kimi zaman metni üretmek yerine tek cümlelik bir özet bırakabiliyordu.

---

## 2. Geliştirilen Evrensel Doğrulama Mimarisi (`sourceMaterialValidator.ts`)

Sorunu yalnızca Türkçe dersiyle veya zeytin metniyle sınırlı tutmayıp; **Türkçe, Matematik, Fen Bilimleri, Sosyal Bilgiler ve Din Kültürü** derslerindeki tüm materyal türlerini (okuma metni, şiir, veri tablosu, grafik/görsel şema, deney düzeneği, öğrenci diyaloğu) kapsayan merkezi bir doğrulama sistemi kuruldu:

### A. İhtiyaç Tespiti (`detectSourceRequirement`)
Soru kökü, kazanım kodu, şablon (`archetype`) ve bağlam metnini tarayarak sorunun bir dış materyale muhtaç olup olmadığını belirler:
- Okuma metni: *"metne göre"*, *"metinden hareketle"*, *"paragrafta bahsedilen"*, *"şiirin ana duygusu"*, *"1. sorudaki metin"* vb.
- Veri tablosu: *"tablodaki verileri"*, *"çizelgeye göre"*, *"matris doldurma"* vb.
- Grafik / Görsel: *"grafikteki verilere göre"*, *"görseldeki deneye göre"*, *"şemaya göre"* vb.
- Karşılıklı diyalog: *"öğrencilerin tartışmasına göre"*, *"hangi öğrencinin ifadesi haklıdır"* vb.
- Bağımsız işlem veya kavram soruları (`type: 'none'`) hiçbir şekilde gereksiz yere işaretlenmez.

### B. Uyarıcı Kalite Analizi (`checkStimulusQuality`)
Bir sorunun `stimulus` alanının gerçek ve yeterli bir kaynak mı yoksa yetersiz bir meta-özet veya çapraz soru referansı mı olduğunu ayırt eder:
- **Geçerli Materyal:** En az 40 karakter uzunluğunda, gerçek anlatı/veri içeren metinler.
- **Soyut Meta-Özet:** Soru kökünü veya konusunu özetleyen ama metnin kendisini vermeyen 1 cümlelik ifadeler (`isMetaSummary: true`).
- **Çapraz Referans:** *"1. sorudaki metne göre..."* gibi başka bir soruya atıf yapan ifadeler (`isCrossReference: true`).

### C. Otomatik Kurtarma ve Ortak Metin Bağlantısı (`validateAndEnrichExamQuestions`)
1. **İç Sınav Taraması:** Sınavın 1. sorusundaki veya diğer sorulardaki zengin kaynak metinleri tespit eder.
2. **Güvenilir Tamamlama:** Çapraz referanslı veya meta-özetli bir soru tespit edildiğinde, ait olduğu ortak metni otomatik olarak miras alır.
3. **Ortak Uyarıcı Grubu (`sharedSourceId` / `commonStimulus`):** Aynı metni veya tabloyu kullanan soruları tek bir grup kimliği (`ortak_metin_1`) altında birleştirir.
4. **Kurtarılamayan Eksik Materyal:** Eğer kaynak materyal hiçbir yerde bulunamıyorsa:
   - **Kesinlikle yapay zekâ veya sistem kafasından sahte metin uydurmaz (halüsinasyon engeli).**
   - Soruyu öğrenciye çözülebilir gibi sunmaz (`hasMissingSourceError: true`).
   - Soruya özel açıklayıcı hata mesajı (`sourceValidationError`) iliştirilir.

---

## 3. Görünüm Alanlarında Yapılan Entegrasyonlar

Tüm sınav deneyimi boyunca veri tutarlılığı sağlandı:

1. **Yapay Zekâ Sınav Önizleme Modalı (`AIGeneratorModal.tsx`):**
   - Üretilen sorularda eksik materyal varsa turuncu uyarı kartı (`AlertTriangle`) gösterilir.
   - Ortak metne dayanan soruların üzerinde *"Ortak Kaynak Metni"* rozeti gösterilir.
   - Sınav kâğıdına aktarılırken `sharedSourceId`, `commonStimulus` ve hata bayrakları eksiksiz taşınır.

2. **A4 Yazdırma ve Önizleme Görünümü (`ExamPaperView.tsx`):**
   - Ortak metinler için özel rozet gösterilir.
   - Kurtarılamayan eksik materyalli sorularda yazdırma düzeninde belirgin bir uyarı paneli çıkar; öğrenci boşluğa düşürülmez.

3. **Etkileşimli Sınav Çözüm Modülü (`InteractivePracticeView.tsx`):**
   - Çözüm ekranında eksik kaynaklı sorunun cevap yazma alanı ve matematik araç çubuğu kilitlenir; açıklayıcı bilgilendirme yapılır.
   - Genel öz değerlendirme ve rubrik seçim butonları gizlenir (haksız puan kazanımı engellenir).
   - Soru gezinme şeridinde `[Kaynak Eksik]` turuncu rozeti gösterilir.
   - Sınav sonu özet ve rubrik döküm tablosunda soru "Değerlendirme Dışı" olarak raporlanır.

4. **Yapay Zekâ Motoru ve Örnek Veri İyileştirmeleri:**
   - `src/utils/aiGeneratorEngine.ts`: Canlı Gemini promptuna zorunlu 4. kural eklendi. Tier 2 soru havuzundan seçim yapılırken ait olduğu sınavın 1. sorusundaki ana metni otomatik devralma mekanizması kuruldu.
   - `src/data/sampleExams.ts`: `exam_5_turkce_1_1_senaryo_6` (Zeytin hasadı) ve `exam_5_turkce_1_1_senaryo_1` (Ahşap sandık) sorularının `stimulus` alanları zengin tam metinlerle güncellendi.

---

## 4. Test ve Doğrulama Sonuçları

Projedeki 3 test paketi, TypeScript derleyicisi ve Vite tek dosya üretim derlemesi eksiksiz çalıştırılmıştır:

### A. Yeni Kaynak Materyal Doğrulama Testleri (`tests/sourceMaterialValidation.test.ts`)
| No | Test Senaryosu | Sonuç | Ayrıntı |
|---|---|---|---|
| **01** | Kaynak metni olan sorunun doğrulamayı geçmesi | **BAŞARILI** | Gerekli tür: `reading_text`, Kalite: `isValid=true`, Hata: `false` |
| **02** | Meta-özet / eksik kaynaklı sorunun doğrulama hatası vermesi | **BAŞARILI** | `isMetaSummary=true`, `hasMissingSourceError=true`, Hata mesajı üretildi |
| **03** | Boş tablo veya grafik gerektiren sorunun hata vermesi | **BAŞARILI** | Tablo: `data_table` (Hata: `true`), Grafik: `chart_or_visual` (Hata: `true`) |
| **04** | Ortak metnin birden fazla soruya doğru bağlanması | **BAŞARILI** | Soru 1, Soru 2 ve Soru 3 `ortak_metin_1` kimliği altında eşitlendi |
| **05** | Kaynak gerektirmeyen bağımsız soruların reddedilmemesi | **BAŞARILI** | Bağımsız matematik ve dilbilgisi soruları sorunsuz onaylandı |
| **06** | AI üretiminde havuzdan gelen soruların kaynak metni koruması | **BAŞARILI** | Ayvalık zeytin sorusu 436 karakterlik tam metniyle birlikte üretildi |
| **07** | Hazır sınavların, puanlama ve cevap kurallarının korunması | **BAŞARILI** | 847 hazır soruda 0 hata; 100 puan kuralı ve rubrik dengesi korundu |

### B. Önceki Aşama Test Paketleri
- `tests/practiceAndScoring.test.ts`: **30/30 Test BAŞARILI** (Öz değerlendirme, modlar, puanlama, veri izolasyonu).
- `tests/mathEditor.test.ts`: **8/8 Test BAŞARILI** (KaTeX formülleri, kesirler, kökler, denklemler, yerel depolama).
- **Toplam Test:** 45 test çalıştırıldı, 45'i de BAŞARILI (%100).

### C. TypeScript & Üretim Derlemesi
- `npx tsc --noEmit`: **0 Hata** (Temiz tamamlandı).
- `npm run build`: **0 Hata** (Vite SingleFile 2,384 kB `dist/index.html` başarıyla üretildi).

---

## 5. Değiştirilen Dosyalar

```
src/
├── types/index.ts                           # sharedSourceId, commonStimulus, hasMissingSourceError tipleri
├── utils/sourceMaterialValidator.ts         # (YENİ) Evrensel kaynak materyal doğrulayıcı & ortak bağlayıcı
├── utils/aiGeneratorEngine.ts               # Gemini prompt kuralı & Tier 2 havuz metin miras alma akışı
├── data/sampleExams.ts                      # Senaryo 1 ve Senaryo 6 sorularına tam okuma metinleri
├── App.tsx                                  # activeExamPaper için kaynak doğrulama & zenginleştirme çağrısı
├── components/AIGeneratorModal.tsx          # Önizleme ekranında ortak metin & kaynak hatası uyarısı
├── components/ExamPaperView.tsx             # A4 yazdırma ekranında kaynak hatası ve ortak metin kartları
└── components/InteractivePracticeView.tsx   # Etkileşimli çözüm ve özet ekranında eksik kaynak korumaları
tests/
└── sourceMaterialValidation.test.ts         # (YENİ) 7 kritik senaryoyu doğrulayan otomatik test paketi
```

---

## 6. Canlıya Dağıtım İçin Kullanıcı Onayı

> [!IMPORTANT]
> Kullanıcı talimatı uyarınca **hiçbir dosya commit edilmemiş, GitHub'a push edilmemiş veya Netlify'a dağıtılmamıştır.**
> Yapılan değişiklikleri onaylamanız halinde, yalnızca ilgili dosyalar commit edilecek, depoya gönderilecek ve Netlify canlı dağıtımı takip edilerek test edilecektir.
