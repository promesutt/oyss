# TYMM Ortak Yazılı Sınav Hazırlık Portalı (OYSS)
## Kapsamlı Ön İnceleme, Güvenlik, İçerik ve Mimari Raporu (Aşama A)

*Bu rapor, yüklenen çalışma briefi doğrultusunda projenin mevcut kaynak kodları, veri modelleri, Netlify sunucu işlevleri, derleme çıktıları ve canlı site (`https://ortakyazili.netlify.app`) üzerinde gerçekleştirilen testler sonucunda hazırlanmıştır. **Talimatınız gereğince bu aşamada hiçbir kod değişikliği, Git commit veya dağıtım (deploy) yapılmamıştır.***

---

### 1. En Kritik Üç Sorun (Kanıtlarıyla Birlikte)

#### 🔴 1. Kritik Sorun: Yapay Zekâ Uç Noktası Savunmasızlığı ve İstemci Tarafı API Çağrıları
- **Sorun:** 
  1. Sunucu tarafındaki `netlify/functions/generate.ts` uç noktası tamamen kimlik doğrulamasız, hız limitsiz (rate limit yok) ve sınırsız uzunlukta istek kabul edecek şekilde internete açıktır.
  2. İstemci tarafında (`src/utils/aiGeneratorEngine.ts:212-240`), sunucu başarısız olduğunda veya ortam değişkeni tanımlandığında doğrudan tarayıcıdan Google API'sine (`https://generativelanguage.googleapis.com/...`) istek atılmakta ve `sessionStorage` üzerinden API anahtarı okunmaktadır.
  3. `generate.ts` içinde kullanılan model isimleri (`gemini-3.5-flash-lite`, `gemini-3.5-flash`) Google API'sinde resmi olarak mevcut olmayan hayali model adlarıdır.
  4. Hata durumunda Google'ın iç sistem mesajları (`details: lastErrorText`) doğrudan istemciye döndürülerek bilgi ifşası yapılmaktadır.
- **Somut Kanıt:** 
  Canlı site üzerinde terminalden yapılan doğrudan test:
  ```bash
  curl -s -X POST https://ortakyazili.netlify.app/api/generate \
    -H "Content-Type: application/json" \
    -d '{"prompt":"test"}'
  ```
  **Dönen Canlı Yanıt:**
  ```json
  {"status":"success","message":"test passed","activeModel":"gemini-3.5-flash-lite"}
  ```
  *Bu test, Netlify üzerinde aktif bir API anahtarının bulunduğunu, ancak uç noktanın tamamen korumasız olduğunu ve herhangi bir bot veya üçüncü şahıs tarafından sınırsızca çağrılarak API kotasının saniyeler içinde tüketilebileceğini kanıtlamaktadır.*

---

#### 🔴 2. Kritik Sorun: Eksik Dönem ve Senaryolarda Sessizce Robotik Şablon Soruların Gerçek MEB Sınavı Gibi Sunulması
- **Sorun:** 
  Depodaki 123 hazır sınavın tamamı istisnasız **`1_donem_1_yazili`** (Kasım Ortak Sınavı) dönemine aittir. Kullanıcı arayüzden `1. Dönem 2. Yazılı`, `2. Dönem 1. Yazılı`, `2. Dönem 2. Yazılı` veya hazır sınavı bulunmayan bir senaryoyu seçtiğinde; sistem kullanıcıya *"Bu seçim için doğrulanmış sınav henüz hazır değil"* demek yerine, `src/App.tsx` içinde sessizce genel robotik şablon soruları üretip bunu öğrenciye resmî MEB sınavıymış gibi sunmaktadır.
- **Somut Kanıt (`src/App.tsx:170-265`):**
  ```typescript
  // Hazır sınav veya kardeş senaryo bulunamadığında çalışan kod:
  if (archetype === 'Öğrenci Diyaloğu & Kavram Yanılgısı') {
    stimulusText = `Öğretmen tahtaya ${subjectName} dersiyle ilgili temel bir durum yazmıştır...
    Öğrenci A: "Bu durumda uygulanması gereken temel kural X'tir..."
    Öğrenci B: "Hayır, veriler incelendiğinde Y kuralının geçerli olduğu..."`;
    questionText = `Öğrenci A ve B'nin iddialarını ${dist.outcomeCode} öğrenme çıktısı bakımından değerlendiriniz...`;
    modelAns = `Öğrenci B haklıdır. Çünkü Öğrenci A temel değişkeni göz ardı etmiştir...`;
  }
  // Ve bu sahte şablon şu başlıkla sunuluyor:
  title: `${selectedGrade}. Sınıf ${subjectName} Ortak Yazılı Sınavı (${currentScenario.name})`,
  instructions: [
    `Bu sınav Temel Eğitim / Ortaöğretim Genel Müdürlüğü MEBİ soru standartları ve ÖDSGM dağılımına göre yapılandırılmıştır.`
  ]
  ```
  *Öğrenci 2. Dönem veya başka bir senaryo seçtiğinde hiçbir bilimsel içeriği olmayan "X kuralı / Y kuralı / Durum 1 / Durum 2" şeklindeki yapay metinleri MEB'in resmî sınavı sanmaktadır.*

---

#### 🔴 3. Kritik Sorun: İstemciye Gömülü Yönetici Şifresi ve Yerel Tarayıcıya Hapsolan Geri Bildirimler
- **Sorun:** 
  1. `src/components/FeedbackModal.tsx` bileşeninde yönetici parolası istemci kaynak koduna düz metin (hardcoded) olarak yazılmıştır (`const ADMIN_PASSWORD = '4725';`). Bu parola canlı sitenin derlenmiş JavaScript dosyasında herkes tarafından doğrudan okunabilmektedir.
  2. Kullanıcının gönderdiği geri bildirimler merkezi bir sunucuya veya veri tabanına iletilmemektedir; sadece o kullanıcının kendi tarayıcısındaki `localStorage`'a (`oyss_user_feedbacks`) kaydedilmektedir.
  3. Kullanıcıya ekranda *"Geri bildiriminiz iletildi!"* denmesine rağmen site yöneticisinin başka bir cihazdan bu bildirimleri görmesi teknik olarak imkânsızdır. Yönetici kendi bilgisayarında şifreyi girip paneli açtığında liste daima boş kalmaktadır.
- **Somut Kanıt:**
  - `src/components/FeedbackModal.tsx` Satır 25-26: `const ADMIN_PASSWORD = '4725';`
  - `src/components/FeedbackModal.tsx` Satır 83: `localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));`
  - Canlı siteden alınan doğrulama:
    ```bash
    curl -s https://ortakyazili.netlify.app | grep -o "4725"
    # Çıktı: 4725
    ```

---

### 2. Dosya ve Satır Konumlarıyla Tüm Bulgular Matrisi

| No | Dosya Yolu | Satır / Alan | Kategori | Bulgu ve Kanıt |
| :--- | :--- | :--- | :--- | :--- |
| **B-01** | `netlify/functions/generate.ts` | L1-L45 | Güvenlik | POST uç noktasında IP sınırı, rate-limit, captcha veya token kontrolü yok. Public açık API. |
| **B-02** | `netlify/functions/generate.ts` | L47-L55 | API Uyumu | `gemini-3.5-flash-lite` ve `gemini-3.5-flash` modelleri Google Generative Language API'sinde mevcut değildir (Resmi modeller: `gemini-2.0-flash`, `gemini-1.5-flash`). |
| **B-03** | `netlify/functions/generate.ts` | L105, L133 | Güvenlik | `details: lastErrorText` ve `err?.message` ile Google/sunucu iç hata mesajları istemciye sızdırılıyor. |
| **B-04** | `src/utils/aiGeneratorEngine.ts` | L212-L245 | Güvenlik | İstemci tarafında `import.meta.env.VITE_GEMINI_API_KEY` ve doğrudan Google endpoint'ine `fetch` yapılıyor. |
| **B-05** | `src/components/AIGeneratorModal.tsx` | L57-L60 | Güvenlik | `sessionStorage.getItem('gemini_api_key')` okunuyor; API anahtarı istemci depolamasında saklanabiliyor. |
| **B-06** | `src/components/FeedbackModal.tsx` | L26, L92 | Güvenlik | Yönetici şifresi `4725` olarak kodda açıkta; canlı sitede F12 ile taranabiliyor. |
| **B-07** | `src/components/FeedbackModal.tsx` | L83-L90 | İşlev Hilesi | Geri bildirimler yalnızca istemcinin `localStorage`'ına yazılıyor; merkezi sunucuya gitmiyor. |
| **B-08** | `src/App.tsx` | L170-L265 | Pedagoji / İçerik | Hazır sınav olmayan dönem/senaryolarda genel robotik şablonlar "MEBİ Standart Sınavı" diye sunuluyor. |
| **B-09** | `src/App.tsx` | L340-L375 | İçerik / UX | 7. sınıf dışındaki tüm sınıflarda infografik seçildiğinde "MEBİ Soru Şifreleri" isimli uydurma şablon gösteriliyor. |
| **B-10** | `src/App.tsx` | L450-L455 | Hata / Boş Ekran | 7. Sınıf Türkçe ve İngilizce dışındaki seçimlerde Konuşma Kılavuzu açıldığında ekran tamamen boş kalıyor (Empty-state yok). |
| **B-11** | `src/data/curriculumData.ts` | L100-L105 | Pedagojik Etiket | 6 ve 7. sınıflar için `tymmRollout: 'TYMM Kapsamında'` denilmiş; oysa 2024-2026'da TYMM kademeli olarak yalnızca 5 ve 9. sınıflarda başladı (6, 7, 8 eski müfredat). |
| **B-12** | `src/components/AIGeneratorModal.tsx` & `FeedbackModal.tsx` | Genel modal yapısı | Erişilebilirlik | Modallarda `Escape` tuşu ile kapanma dinleyicisi yok. `role="dialog"`, `aria-modal="true"` gibi ARIA etiketleri eksik. |
| **B-13** | `package.json` | L7-L12 | Test / QA | Projede hiçbir test kütüphanesi (`test` betiği) ve linter (`eslint`) tanımlı değil. |
| **B-14** | `vite.config.ts` & Derleme | L6-L9 | Performans | `vite-plugin-singlefile` ile tüm fontlar, ikonlar, CSS ve 123 sınav tek bir 2.3 MB HTML dosyasına gömülüyor (Code-splitting yok). |

---

### 3. Gerçek Hata (Bug) ile İyileştirme Önerisi (Enhancement) Ayrımı

#### 🐛 Gerçek Hatalar (Düzeltilmesi Zorunlu Hatalar):
1. **API Uç Noktasının Korunmasız Olması:** Kimlik doğrulama, IP sınırlaması ve istek uzunluğu kontrolü olmaması (DDoS ve kota tüketme açığı).
2. **Var Olmayan Model Adları:** `generate.ts` içindeki `gemini-3.5-flash-lite` model adlarının Google API'sinde 404 döndürmesi.
3. **İstemciden Doğrudan API Çağrısı:** `aiGeneratorEngine.ts` içerisindeki tarayıcı tabanlı `fetch(generativelanguage.googleapis.com)` çağrısı.
4. **Geri Bildirimlerin Kaybolması:** Kullanıcıya "iletildi" denilip sadece kendi cihazındaki `localStorage`'a yazılması.
5. **İstemcide Açık Yönetici Parolası:** Canlı bundle'da `4725` değerinin yer alması.
6. **Sessiz Sahte İçerik Üretimi:** Hazır sınavı olmayan dönemlerde kullanıcı uyarılmadan yapay "Öğrenci A / Öğrenci B" şablonlarının MEB sınavı gibi gösterilmesi.
7. **Konuşma Kılavuzunda Boş Ekran:** 5, 6 ve 8. sınıfta konuşma kılavuzu tıklandığında hiçbir bileşen veya uyarının render edilmemesi (beyaz/boş alan kalması).

#### 💡 İyileştirme Önerileri (Enhancements):
1. **İçerik Kapsam Genişletmesi:** 1. Dönem 2. Yazılı ve 2. Dönem sınavlarının müfredat takvimine uygun şekilde hazırlanması; hazır olmayanlara açıkça *"Yakında Eklenecektir / Hazırlık Aşamasında"* rozeti konulması.
2. **Merkezi Geri Bildirim Servisi:** Netlify Forms veya güvenli bir sunucu uç noktası kurularak bildirimlerin geliştiricinin paneline/e-postasına düşürülmesi.
3. **Müfredat Etiketlerinin Netleştirilmesi:** 5. Sınıf için "Türkiye Yüzyılı Maarif Modeli", 6-7. Sınıflar için "MEB Güncel Müfredat / Ortak Yazılı", 8. Sınıf için "LGS ve MEB Ortak Yazılı Senaryoları" etiketlerinin dinamikleştirilmesi.
4. **Etkileşimli Çalışma Modu:** Öğrencinin açık uçlu sorulara ekrandan cevap yazıp model cevap ve rubrikle kendi kendini puanlayabileceği bir öz değerlendirme akışı.
5. **Modüler Derleme (Code Splitting):** KaTeX kütüphanesi ve büyük veri setlerinin dinamik `import()` ile parçalara bölünerek sayfa ilk açılış hızının artırılması.
6. **Otomatik Test Altyapısı:** `vitest` eklenerek sınav puanlarının (100 puan), rubriklerin ve kazanım kodlarının her Git eyleminde otomatik test edilmesi.

---

### 4. Çalıştırılan Testlerin Gerçek Sonuçları

| Test Türü | Çalıştırılan Komut | Gerçek Çıktı / Sonuç | Durum / Sınırlama |
| :--- | :--- | :--- | :--- |
| **Birim / Entegrasyon Testi** | `npm test` | `npm error Missing script: "test"` | **BAŞARISIZ (Script Yok)**: Projede henüz test runner kurulu değil. |
| **Statik Kod Analizi (Lint)** | `npx eslint .` | `Need to install the following packages: eslint@...` | **ÇALIŞTIRILAMADI**: ESLint kurulu değil, paket yükleme onayı istediği için iptal edildi. |
| **TypeScript Tip Kontrolü** | `npx tsc --noEmit` | *(Boş çıktı, çıkış kodu 0)* | **BAŞARILI**: Projede hiçbir TypeScript derleme/tip hatası yoktur. |
| **Üretim Derlemesi (Build)** | `npm run build` | `dist/index.html 2,309.20 kB │ gzip: 586.56 kB ✓ built in 2.03s` | **BAŞARILI**: Vite ve singlefile eklentisi hatasız derleniyor. |
| **Canlı Site Uç Nokta Testi** | `curl -s -X POST https://ortakyazili.netlify.app/api/generate ...` | `{"status":"success","message":"test passed","activeModel":"gemini-3.5-flash-lite"}` | **DOĞRULANDI**: Canlı API uç noktası çalışıyor ancak tamamen savunmasız. |
| **Veri Tutarlılığı Testi (Özel Betik)** | `python3 verify_exams.py` | 123 sınav, 847 soru tarandı. Tüm sınavlar 100 puan; rubrik toplamları tutarlı; bozuk kazanım kodu yok. | **BAŞARILI**: Mevcut 123 sınavın iç veri yapısı sağlam. |

---

### 5. İçerik Kapsamı Envanteri (Mevcut Durum Matrisi)

Veri tabanı (`src/data/sampleExams.ts`, `studySheets.ts`, `infographics.ts`, `speakingGuides.ts`) taranarak elde edilen kesin durum:

| Sınıf | Ders | Hazır Sınav (1. Dön. 1. Yazılı) | Diğer Dönemler (1/2, 2/1, 2/2) | Çalışma Kağıdı | İnfografik | Konuşma Kılavuzu | Doğrulama Durumu |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **5** | Türkçe | **6 Senaryo** (41 Soru) | ❌ 0 Hazır Sınav | ⚠️ Bankadan | ❌ Yok (Şablon) | ❌ Yok (Boş Ekran) | Doğrulanmış MEBİ |
| **5** | Matematik | **5 Senaryo** (34 Soru) | ❌ 0 Hazır Sınav | ⚠️ Bankadan | ❌ Yok (Şablon) | — | Doğrulanmış MEBİ |
| **5** | Fen Bilimleri | **4 Senaryo** (26 Soru) | ❌ 0 Hazır Sınav | ⚠️ Bankadan | ❌ Yok (Şablon) | — | Doğrulanmış MEBİ |
| **5** | Sosyal Bilgiler | **5 Senaryo** (32 Soru) | ❌ 0 Hazır Sınav | ⚠️ Bankadan | ❌ Yok (Şablon) | — | Doğrulanmış MEBİ |
| **5** | Din Kültürü | **4 Senaryo** (27 Soru) | ❌ 0 Hazır Sınav | ⚠️ Bankadan | ❌ Yok (Şablon) | — | Doğrulanmış MEBİ |
| **5** | İngilizce | **5 Senaryo** (31 Soru) | ❌ 0 Hazır Sınav | ⚠️ Bankadan | ❌ Yok (Şablon) | ❌ Yok (Boş Ekran) | Doğrulanmış MEBİ |
| **6** | Türkçe | **6 Senaryo** (38 Soru) | ❌ 0 Hazır Sınav | ⚠️ Bankadan | ❌ Yok (Şablon) | ❌ Yok (Boş Ekran) | Doğrulanmış MEBİ |
| **6** | Matematik | **3 Senaryo** (18 Soru) | ❌ 0 Hazır Sınav | ⚠️ Bankadan | ❌ Yok (Şablon) | — | Doğrulanmış MEBİ |
| **6** | Fen Bilimleri | **6 Senaryo** (45 Soru) | ❌ 0 Hazır Sınav | ⚠️ Bankadan | ❌ Yok (Şablon) | — | Doğrulanmış MEBİ |
| **6** | Sosyal Bilgiler | **5 Senaryo** (33 Soru) | ❌ 0 Hazır Sınav | ⚠️ Bankadan | ❌ Yok (Şablon) | — | Doğrulanmış MEBİ |
| **6** | Din Kültürü | **5 Senaryo** (30 Soru) | ❌ 0 Hazır Sınav | ⚠️ Bankadan | ❌ Yok (Şablon) | — | Doğrulanmış MEBİ |
| **6** | İngilizce | **5 Senaryo** (31 Soru) | ❌ 0 Hazır Sınav | ⚠️ Bankadan | ❌ Yok (Şablon) | ❌ Yok (Boş Ekran) | Doğrulanmış MEBİ |
| **7** | Türkçe | **6 Senaryo** (39 Soru) | ❌ 0 Hazır Sınav | ✅ Özel Föy | ✅ Özel İnfografik | ✅ Özel Kılavuz | Doğrulanmış MEBİ |
| **7** | Matematik | **4 Senaryo** (25 Soru) | ❌ 0 Hazır Sınav | ✅ Özel Föy | ✅ Özel İnfografik | — | Doğrulanmış MEBİ |
| **7** | Fen Bilimleri | **4 Senaryo** (30 Soru) | ❌ 0 Hazır Sınav | ✅ Özel Föy | ✅ Özel İnfografik | — | Doğrulanmış MEBİ |
| **7** | Sosyal Bilgiler | **5 Senaryo** (35 Soru) | ❌ 0 Hazır Sınav | ✅ Özel Föy | ✅ Özel İnfografik | — | Doğrulanmış MEBİ |
| **7** | Din Kültürü | **5 Senaryo** (33 Soru) | ❌ 0 Hazır Sınav | ✅ Özel Föy | ✅ Özel İnfografik | — | Doğrulanmış MEBİ |
| **7** | İngilizce | **5 Senaryo** (30 Soru) | ❌ 0 Hazır Sınav | ✅ Özel Föy | ✅ Özel İnfografik | ✅ Özel Kılavuz | Doğrulanmış MEBİ |
| **8** | Türkçe | **7 Senaryo** (57 Soru) | ❌ 0 Hazır Sınav | ⚠️ Bankadan | ❌ Yok (Şablon) | ❌ Yok (Boş Ekran) | LGS/MEB Uyumlu |
| **8** | Matematik | **6 Senaryo** (57 Soru) | ❌ 0 Hazır Sınav | ⚠️ Bankadan | ❌ Yok (Şablon) | — | LGS/MEB Uyumlu |
| **8** | Fen Bilimleri | **5 Senaryo** (39 Soru) | ❌ 0 Hazır Sınav | ⚠️ Bankadan | ❌ Yok (Şablon) | — | LGS/MEB Uyumlu |
| **8** | İnkılap Tarihi | **7 Senaryo** (50 Soru) | ❌ 0 Hazır Sınav | ⚠️ Bankadan | ❌ Yok (Şablon) | — | LGS/MEB Uyumlu |
| **8** | Din Kültürü | **5 Senaryo** (38 Soru) | ❌ 0 Hazır Sınav | ⚠️ Bankadan | ❌ Yok (Şablon) | — | LGS/MEB Uyumlu |
| **8** | İngilizce | **5 Senaryo** (28 Soru) | ❌ 0 Hazır Sınav | ⚠️ Bankadan | ❌ Yok (Şablon) | ❌ Yok (Boş Ekran) | LGS/MEB Uyumlu |
| **TOPLAM** | **24 Alan** | **123 Sınav (847 Soru)** | **0 Sınav** | **6 Özel / 18 Banka** | **6 Özel / 18 Şablon** | **2 Özel / 6 Boş** | — |

---

### 6. Önerilen Düzeltmelerin Öncelik Sırası (Aşama B Eylem Planı)

Sizin onayınızın ardından, sistemi adım adım ve en küçük güvenli değişikliklerle iyileştirmek için önerilen öncelik sırası:

#### 1. Adım: Kritik Güvenlik ve API Sertleştirmesi (Öncelik: Acil / Kritik)
- `netlify/functions/generate.ts`:
  - İstemciden gelen `prompt` uzunluğunu sınırla (maksimum 4.000 karakter).
  - Basit bir IP bazlı veya istek sıklığı sınırlaması (rate limit) ekle.
  - Model adlarını resmi Google Gemini modellerine (`gemini-2.0-flash` ve `gemini-1.5-flash`) güncelle.
  - Hata durumunda iç ayrıntıları maskeleyen temiz bir hata mesajı dön (`{ error: 'Soru üretim servisi şu anda meşgul, lütfen az sonra tekrar deneyiniz.' }`).
- `src/utils/aiGeneratorEngine.ts` & `AIGeneratorModal.tsx`:
  - İstemciden doğrudan `fetch(generativelanguage.googleapis.com)` çağrısını kaldır; tüm çağrıları yalnızca Netlify Function üzerinden güvenli proxy ile yap.
  - `sessionStorage`'daki API anahtarı okuma kodunu temizle.

#### 2. Adım: Pedagojik Dürüstlük ve Boş Ekranların Giderilmesi (Öncelik: Kritik)
- `src/App.tsx`:
  - Hazır sınavı bulunmayan dönemler (`1_donem_2_yazili`, `2_donem_1_yazili`, `2_donem_2_yazili`) seçildiğinde sessizce uydurma şablon üretmek yerine kullanıcıya şık ve açıklayıcı bir **Empty State** bileşeni göster:
    > *"Bu dönem için doğrulanmış MEB ortak sınav arşivi henüz eklenmemiştir. Sınav takvimine göre güncellenecektir."*
  - Konuşma kılavuzu olmayan ders ve sınıflar seçildiğinde boş ekran yerine bilgilendirici bir kart göster.
  - İnfografik bulunmayan sınıflarda sahte "Soru Şifreleri" şablonu yerine o dersin kazanım özetini göster.

#### 3. Adım: Geri Bildirim ve Yönetici Güvenliği (Öncelik: Yüksek)
- `src/components/FeedbackModal.tsx`:
  - İstemciye gömülü `ADMIN_PASSWORD = '4725'` kodunu kaldır.
  - Geri bildirim formunu Netlify Forms veya basit bir sunucu işlevine bağla; sunucuya kaydedilemiyorsa arayüzde *"Bu geri bildirim yalnızca tarayıcınızda saklanan yerel bir nottur"* ifadesini netleştirerek kullanıcıyı yanıltma.

#### 4. Adım: Erişilebilirlik ve Mobil/Yazdırma Deneyimi (Öncelik: Orta)
- Modallara `Escape` tuşu ile kapanma ve temel ARIA etiketleri (`role="dialog"`, `aria-modal="true"`) ekle.
- Yazdırma (print) görünümünde soru bloklarının sayfa ortasında bölünmesini engelleyen CSS `break-inside-avoid` kurallarını doğrula.

#### 5. Adım: Otomatik Kalite ve Test Altyapısı (Öncelik: Orta)
- Projeye `vitest` ekle ve 123 sınavın 847 sorusunu, puan toplamlarını ve rubriklerini doğrulayan `npm test` komutunu yapılandır.
