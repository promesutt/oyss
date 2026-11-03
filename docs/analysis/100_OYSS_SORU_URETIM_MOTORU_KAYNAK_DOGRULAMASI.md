# OYSS Soru Üretim Motoru Kaynak Doğrulaması Raporu
**Rapor Numarası:** 100-3 (Ek Teknik Doğrulama Raporu)  
**Tarih:** 03.11.2026  
**İncelenen Dosyalar:**
- `src/utils/aiGeneratorEngine.ts`
- `src/generators/prompts/index.ts`
- `src/generators/prompts/grade56TextbookPrompt.ts`
- `src/data/fallbackPools.ts`
- `src/data/sampleExams.ts`
**Durum:** Kesin Teknik Doğrulama Tamamlandı (Salt Okunur Denetim)

---

## 1. Giriş ve İncelemenin Amacı

Bu teknik denetim, OYSS Rehberi soru üretim motorunun (`aiGeneratorEngine.ts`) yapay zekâ (Gemini API) ve kural tabanlı yerel motor (fallback) katmanlarında soru üretirken veya seçerken MEB telifli kaynaklarını nasıl kullandığını, `sourceOrigin` etiketleme mantığını, kopya/benzerlik önleme algoritmalarını ve kaçınma direktiflerini (`avoidDirectives`) kaynak kod düzeyinde satır satır belgelemek amacıyla gerçekleştirilmiştir.

---

## 2. Satır Satır Kaynak Doğrulama Bulguları

### 2.1. Fallback Soru Seçiminin Kaynağı ve Sıralaması

Kullanıcı canlı yapay zekâ servisine erişemediğinde, kota aşıldığında (HTTP 429) veya ağ bağlantısı olmadığında sistem **Tier 2: Prosedürel OYSS Kural Tabanlı Motor** katmanına geçer (`aiGeneratorEngine.ts` Satır 436).

Fallback soru seçimi, senaryonun kazanım dağılımındaki her bir öğrenme çıktısı (`d.outcomeCode`) için şu katı hiyerarşiyle yürütülür:

1. **İçeride Tanımlı Havuz Yüklemesi (Satır 448-452):**
   `getAllFallbackQuestions({ name1, name2, pointAllocations })` fonksiyonu çağrılarak `src/data/fallbackPools.ts` dosyasındaki 99 kurgusal soru hafızaya alınır.
2. **Birinci Öncelikli Arama (Satır 468-477):**
   `SAMPLE_EXAMS` havuzundan aynı kademe (`grade`) ve aynı derse (`subjectId`) ait, ancak **mevcut senaryo hariç tutularak** (`!isCurrentExam(e)`) aynı `outcomeCode` değerine sahip sorular filtrelenir (`matchingSampleQuestionsWithExam`).
3. **İkinci Öncelikli Arama (Satır 480):**
   `fallbackPools` içerisindeki ilgili kazanıma ait sorular filtrelenir (`internalPool`).
4. **Üçüncü Öncelikli Arama (Satır 484-494):**
   Aynı sınıf ve derste soru bulunamazsa, diğer sınıflardaki `SAMPLE_EXAMS` havuzu taranır (`crossGradeSampleQuestionsWithExam`).
5. **Mükerrerlik Filtresi (Satır 573-576):**
   Toplanan aday havuzu (`availablePool`), `isDuplicateOrTooSimilar` fonksiyonundan geçirilerek mevcut sınav sorularıyla (veya kaçınılacak metinlerle) %38 üzerinde benzeşenler ayıklanır.
6. **Dördüncü Öncelik / Son Çare: Dinamik Sentetik Sentez (Satır 603-791):**
   Eğer havuzda hiç soru kalmazsa veya mükerrerlik filtresi tüm soruları elerse (`filteredPool.length === 0`), kod hiçbir dış kaynağa başvurmadan **algoritmik şablonlarla sıfırdan sentetik soru üretir** (Türkçe için edebî kurgular satır 607-729; diğer branşlar için durum matrisi, kavram yanılgısı diyaloğu, hata analizi satır 730-791).

---

### 2.2. `sourceOrigin` Alanının Değerleri ve Atandığı Satırlar

`sourceOrigin` alanı, sorunun kökenini ve telif/özgünlük durumunu belirten kritik bir metadata alanıdır. Kodda 4 farklı değer atanmaktadır:

| Atanan Değer | İlgili Dosya ve Satır | Atanma Koşulu ve Açıklama | Kritik Durum / Tespit |
| :--- | :--- | :--- | :--- |
| `'gemini_ai'` | `src/utils/aiGeneratorEngine.ts` **Satır 376** | Canlı Gemini API (`/api/generate`) üzerinden üretilen ve geçerli JSON şemasına uyan sorulara atanır (`gq.sourceOrigin \|\| 'gemini_ai'`). | **Doğru:** Canlı yapay zekâ çıktısı doğru etiketlenmektedir. |
| `'oyss_curated'` | `src/utils/aiGeneratorEngine.ts` **Satır 508** ve **Satır 597** | `fallbackPools.ts` içerisindeki OYSS editörleri tarafından yazılmış kurgusal sorulardan seçildiğinde atanır. | **Doğru:** OYSS telifsiz kürasyonunu doğru yansıtır. |
| `'meb_official'` | `src/utils/aiGeneratorEngine.ts` **Satır 536** ve **Satır 566** | `SAMPLE_EXAMS` havuzundan ödünç alınan sorulara doğrudan hardcoded olarak atanmaktadır. | ⚠️ **KRİTİK METADATA HATASI:** `SAMPLE_EXAMS` soruları MEB'den bire bir alınmamış, OYSS tarafından MEB senaryolarına paralel olarak hazırlanmış özgün sorulardır. Buna rağmen motorda `'meb_official'` olarak damgalanması yanıltıcıdır ve düzeltilmelidir. |
| `'oyss_synthetic'` | `src/utils/aiGeneratorEngine.ts` **Satır 300**, **Satır 660, 682, 704, 726, 789** | Eksik soruların tamamlanmasında (Satır 300) ve havuzda soru kalmadığında prosedürel şablonlarla üretilen dinamik sorularda atanır. | **Doğru:** Algoritmik üretim açıkça belirtilmektedir. |

---

### 2.3. Canlı Soru Üretiminde MEB PDF Metinlerinin Kullanımı

- **Gemini API Canlı Üretiminde MEB PDF Metinleri KESİNLİKLE KULLANILMAMAKTADIR.**
- `aiGeneratorEngine.ts` ve prompt oluşturucu modüller (`src/generators/prompts/*`) incelendiğinde, diskteki hiçbir PDF dosyası okunmamakta, ham PDF metni çıkartılmamakta veya API istek yüküne (`payload`) eklenmemektedir.
- Sistem yalnızca MEB'in yayımladığı kamuya açık **öğrenme çıktısı kodunu (`outcomeCode`)**, **resmî kazanım başlığını (`officialTitle`)**, **bilişsel düzeyi (`cognitiveLevel`)** ve **senaryo soru adedini (`targetCount`)** parametre olarak alır.

---

### 2.4. AI Üretim Promptunda MEB PDF İçeriği Enjeksiyonu Denetimi

Prompt inşa mekanizması (`buildLiveExamPrompt`, `src/generators/prompts/index.ts` Satır 157-219) incelenmiştir:
1. Prompta enjekte edilen tek MEB referansı, **Ders Kitabı Direktifleridir** (`buildGrade56TextbookDirectives`, `grade56TextbookPrompt.ts` Satır 14-119).
2. Bu direktiflerde MEB PDF'lerindeki soru metinleri **kesinlikle yer almaz**. Yalnızca `OUTCOME_STUDY_BANK` veritabanından alınan şu pedagojik meta-veriler prompta aktarılır:
   - İlgili ünite adı ve sayfa aralığı referansı,
   - Kaynak kanıt seviyesi (`evidenceLevel: A, B, C, D`),
   - Ders kitabında geçen kavramlar ve gerçek yaşam örnekleri (örn: *"Güneş saati, su saati, kum saati"*),
   - Kavram yanılgıları ve sınav tuzakları (`examTraps`).
3. Ayrıca promptun 113. satırında yapay zekâya şu katı yasak verilmektedir:  
   `"Ders kitabında veya yukarıdaki kaynak bağlamında bulunmayan bilgi, kavram, kural, deney sonucu veya uydurma sayfa referansı KESİNLİKLE YAZILAMAZ."`

---

### 2.5. `isDuplicateOrTooSimilar` Fonksiyonunun Çalışma Mantığı ve Benzerlik Eşiği

`isDuplicateOrTooSimilar` fonksiyonu (`aiGeneratorEngine.ts` Satır 96-165), üretilen veya seçilen soruların mevcut soru kütüphanesiyle çakışmasını engellemek için çok katmanlı bir benzerlik algoritması yürütür:

1. **Doğrudan Eşitlik:**
   Tam soru metni veya kök metin bire bir eşitse derhal `true` (mükerrer) döner (Satır 124).
2. **Jaccard ve Alt Dize Benzerliği (`calculateQuestionSimilarity`, Satır 62-83):**
   Noktalama işaretleri temizlenir, küçük harfe dönüştürülür. 2 karakterden uzun kelimeler küme (`Set`) haline getirilir ve Kesişim / Birleşim (Jaccard) oranı hesaplanır. Eğer bir metin diğerinin alt dizesi ise ve uzunluk oranı %60'ın üzerindeyse 0.85 benzerlik katsayısı uygulanır.
3. **Zengin Uyarıcılı / Senaryolu Sorular (Satır 130-142):**
   Eğer her iki sorunun da uyarıcı metni (`stimulus`) 25 karakterden uzunsa:
   - Uyarıcı benzerliği $\ge 0.50$ ise ve soru benzerliği $\ge 0.40$ (veya toplam benzerlik $\ge 0.55$) ise soru **mükerrer kabul edilir**.
   - Uyarıcı benzerliği $< 0.35$ ise (bağlam ve kurgu tamamen farklı ise), salt soru kökü kalıbı benziyor diye soru elenmez; ancak tam metin benzerliği $\ge 0.65$ olursa mükerrer sayılır.
4. **Sayısal / Parametrik Kontrol (Matematik ve Fen) (Satır 145-156):**
   Metinlerden sayılar ayıklanır (`extractNumbersFromText`).
   - Eğer sorularda **ortak hiçbir sayı yoksa**, metinler %85 üzerinde benzeşmediği sürece soru reddedilmez (farklı parametreli özgün problem kabul edilir).
   - Sayısal kesişim varsa benzerlik eşiği 0.60 olarak uygulanır.
5. **Eşik Değerleri:**
   - Fallback havuzu filtrelemesinde varsayılan eşik: **0.38** (Satır 101, Satır 575).
   - Canlı Gemini çıktısının denetiminde katı güvenlik eşiği: **0.45** (Satır 382).

---

### 2.6. `avoidDirectives` Mekanizmasının Engellediği Unsurlar

`buildAvoidDirectives` fonksiyonu (`src/generators/prompts/index.ts` Satır 57-151), promptun en başına **"EN KATI VE ZORUNLU KURAL"** başlığıyla bir kaçınma direktifi ekler.

Bu mekanizma iki seviyeli (B+ Mimarisi) bir koruma sağlar:
1. **Kategori 1: Önceki Varyasyon (Set A) Sorularını Engelleme (Satır 146-148):**
   Öğrenciye bir sınavın 2. varyasyonu (B Kitapçığı) sunulurken, A Kitapçığında çıkan 25'e kadar sorunun soru metinleri ve uyaranları prompta verilir. Yapay zekâya:  
   `"Bu soruların olay örgüsünü, kurgusunu, karakterlerini, durumlarını ve sayısal/metinsel verilerini KESİNLİKLE TEKRARLAMA"` talimatı verilir.
2. **Kategori 2: Hazır Sınav Taslak Sorularını Engelleme (Satır 130-134):**
   OYSS'nin mevcut `SAMPLE_EXAMS` şablonundaki sorular prompta enjekte edilerek bu soruların olay örgülerinin, kurgularının ve durumlarının canlı üretimde tekrarlanması yasaklanır.
3. **Uyaran Yasağı (Satır 135-141):**
   Hazır sınavlardaki okuma parçaları, kurgusal hikâyeler ve deney metinleri tırnak içinde listelenerek aynısının üretilmesi engellenir.

---

## 3. Sonuç ve Mimari Değerlendirme

1. **Tam Telif Güvenliği:** OYSS soru üretim motoru ne canlı API çağrılarında ne de yerel şablon üretiminde MEB PDF'lerinden soru metni çekmemektedir.
2. **Özgünlük Güvencesi:** Çift katmanlı koruma (`avoidDirectives` ile prompt düzeyinde önleme + `isDuplicateOrTooSimilar` ile post-processing düzeyinde eleme) sayesinde mükerrer veya kopya soru üretimi teknik olarak engellenmiştir.
3. **Düzeltilmesi Gereken Teknik Bulgular:**
   - `aiGeneratorEngine.ts` Satır 536 ve 566'daki `sourceOrigin: 'meb_official'` ataması, sorular MEB'den bire bir alınmadığı halde yanıltıcı bir kaynak etiketi üretmektedir. Bu alanın `'oyss_curated'` veya `'oyss_adapted'` olarak güncellenmesi önerilir.
