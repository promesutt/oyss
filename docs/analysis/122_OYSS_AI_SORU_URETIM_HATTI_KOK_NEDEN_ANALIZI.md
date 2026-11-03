# GÖREV 122: OYSS YAPAY ZEKÂ SORU ÜRETİM HATTI KRİTİK HATA VE KÖK NEDEN ANALİZİ RAPORU

**Rapor Numarası:** 122  
**Tarih:** 3 Kasım 2026  
**Hazırlayan:** Antigravity AI Baş Mühendislik ve Ölçme Değerlendirme Grubu  
**Çalışma Modu:** YALNIZCA ANALİZ (Kod Değişikliği Yapılmamıştır)  
**Hedef Sistem:** OYSS (Okul Tabanlı Yerel Ölçme ve Sınav Sistemi) - Canlı ve Yerel Üretim Motorları  

---

## 1. YÖNETİCİ ÖZETİ

OYSS platformunda son dönemde yapay zekâ destekli soru üretim hattında gözlemlenen ve kullanıcı deneyimi ile sınav güvenilirliğini zedeleyen üç kritik problem; kaynak kod düzeyinde, veri akış zincirinde ve API sınırlarında uçtan uca incelenmiştir.

### İncelenen 3 Temel Problem ve Özet Bulgular:
1. **Yapay Zekâ Yerine Yerel Motorun Devreye Girmesi (Fallback Sıklığı):**
   - **Kök Neden:** `netlify/functions/generate.ts:134` satırındaki katı `prompt.length > 20000` karakter kontrolüdür. 5. ve 6. sınıflarda devreye giren ders kitabı içerik direktifleri (`grade56TextbookPrompt.ts`) tek başına 6.500–8.500 karakter eklemekte; önceki varyasyonlara ait kaçınma direktifleri (`buildAvoidDirectives`) ile birleştiğinde toplam prompt boyutu **20.600 ila 23.400 karaktere** ulaşmaktadır. Netlify sunucu fonksiyonu isteği derhal **HTTP 400 Bad Request** ile reddetmekte, istemci tarafındaki `aiGeneratorEngine.ts` ise bu hatayı yakalayarak kullanıcıya bir hata mesajı yerine sessizce yerel prosedürel motoru (`dynamicQuestions`) sunmaktadır.
2. **Soru Kökü Bulunmayan Üretimlerin Başarılı Kabul Edilmesi:**
   - **Kök Neden:** Üretim hattının hiçbir aşamasında `q.question` alanının varlığı, uzunluğu veya geçerliliği denetlenmemektedir. LLM bazen soru cümlesini `stimulus` içine gömmekte veya `question` alanını boş bırakmaktadır. Ne Netlify sunucu fonksiyonunda (`generate.ts`), ne istemci normalizasyonunda (`aiGeneratorEngine.ts:normalizeAndCalibrateQuestions`), ne de kaynak doğrulayıcıda (`sourceMaterialValidator.ts`) soru kökü yokluğu bir hata olarak tanımlanmamıştır. Sistem eksik soruları yeşil onay rozetiyle ("Başarıyla Hazırlandı") kullanıcı arayüzüne basmaktadır.
3. **Soru Niteliğinin Yetersiz Olması (Uzun Senaryodan Nesne Adı Sorma):**
   - **Kök Neden:** Aşırı uzun promptlar (20.000 karaktere dayanan) LLM dikkat mekanizmasında kayba ("Lost in the Middle") yol açmaktadır. Ayrıca `curriculumData.ts` içerisindeki "Basit Bilişsel Süreçler" etiketleri ve `coreRules.ts:QUESTION_DIRECTIVE_CLARITY_RULE` içerisindeki `"adını yazınız"` gibi talimatlar model tarafından yanlış yorumlanmakta; model 200 kelimelik bir metinden yalnızca tek kelimelik nesne/kişi adını soran yüzeysel sorular üretmektedir.

---

## 2. UÇTAN UCA ÜRETİM AKIŞ ŞEMASI VE HATA NOKTALARI

Aşağıdaki akış şeması, kullanıcının modal üzerinden "Soru Seti Üret" butonuna basmasından soru kartının ekranda belirmesine kadar geçen tüm zinciri ve tespit edilen kritik hata noktalarını göstermektedir:

```mermaid
sequenceDiagram
    autonumber
    actor User as Kullanıcı (Öğretmen)
    participant Modal as AIGeneratorModal.tsx
    participant Engine as aiGeneratorEngine.ts
    participant Prompt as Prompt Builders (index.ts)
    participant Netlify as Netlify Function (generate.ts)
    participant Gemini as Google Gemini API
    participant Validator as sourceMaterialValidator.ts

    User->>Modal: "Soru Seti Üret" Tıklar
    Modal->>Engine: generateMEBIQuestions(grade, subject, sc, variationIdx, options)
    Engine->>Prompt: buildLiveExamPrompt(...)
    Note over Prompt: 1. KRİTİK NOKTA: Prompt boyutu 20k'yı aşabilir!<br/>(Ders Kitabı + Kaçınma + Kurallar = 20.6k - 23.4k kr)
    Prompt-->>Engine: livePrompt (Metin)
    
    Engine->>Netlify: POST /api/generate { prompt: livePrompt, variationIndex }
    
    alt Prompt > 20.000 Karakter
        Note over Netlify: 2. KRİTİK HATA (HTTP 400):<br/>"Prompt metni izin verilen karakter sınırını (20.000) aşıyor."
        Netlify-->>Engine: HTTP 400 Bad Request
        Note over Engine: 3. SESSİZ FALLBACK GEÇİŞİ:<br/>fallbackReason atanır, Tier 2 Yerel Prosedürel Motora düşer!
        Engine-->>Modal: Yerel Motor Çıktısı (isFallback: true)
        Modal-->>User: "Yerel Motor Devreye Girdi: Karakter Sınırı Aşıldı"
    else Prompt <= 20.000 Karakter
        Netlify->>Gemini: POST generateContent (gemini-2.5-flash / gemini-1.5-pro)
        Gemini-->>Netlify: JSON Metin Yanıtı
        Note over Netlify: 4. ŞEMA DOĞRULAMA AÇIĞI:<br/>parseExamJsonSafely() çalışır.<br/>parsedData.questions dizisi var mı bakar;<br/>ANCAK q.question boş mu KONTROL ETMEZ!
        Netlify-->>Engine: HTTP 200 OK { questions: [...] }
        
        Engine->>Engine: normalizeAndCalibrateQuestions(questions)
        Note over Engine: 5. KONTROL AÇIĞI: q.question boş string olsa dahi<br/>doğrudan spread edilir (...q)!
        
        Engine->>Validator: validateAndEnrichExamQuestions(calibrated)
        Note over Validator: 6. KONTROL AÇIĞI: Sadece stimulus denetlenir.<br/>q.question kontrol edilmez!
        Validator-->>Engine: enrichedQuestions
        
        Engine-->>Modal: { isFallback: false, generatedQuestions: [...] }
        Note over Modal: 7. ARAYÜZ YANILSAMASI:<br/>Yeşil rozet: "Başarıyla Hazırlandı"<br/>Soru kökü: <MathRenderer content={""} /> (BOŞ!)
        Modal-->>User: Eksik Soru Kökü Ekranda Görüntülenir
    end
```

---

## 3. PROMPT KARAKTER SINIRI VE BİLEŞEN DAĞILIMI ANALİZİ

### 3.1. Sınıflara Göre Prompt Karakter Ölçümleri (Tüm Dersler ve Senaryolar)

OYSS müfredatındaki 4 sınıf düzeyinde, 6 ana branşta ve MEB senaryo setlerinde yapılan kümülatif prompt ölçüm sonuçları şöyledir:

| Sınıf Düzeyi | İncelenen Varyasyon Sayısı | Minimum Karakter | Maksimum Karakter | Ortalama Karakter | 20.000 Sınırını Aşan Durum Sayısı | Risk Durumu |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **5. Sınıf** | 87 | 15.134 | 22.514 | 18.899 | **21 (%24.1)** | **KRİTİK RİSK (Her 4 üretimden 1'i)** |
| **6. Sınıf** | 90 | 14.450 | 23.413 | 19.223 | **35 (%38.9)** | **YÜKSEK KRİTİK (Her 3 üretimden 1'i)** |
| **7. Sınıf** | 87 | 10.125 | 17.965 | 15.278 | **0 (%0.0)** | GÜVENLİ (Tepe Nokta: 17.965) |
| **8. Sınıf** | 105 | 10.089 | 14.015 | 12.338 | **0 (%0.0)** | GÜVENLİ (Tepe Nokta: 14.015) |

### 3.2. Branş Bazında 20.000 Karakter Aşımı Dağılımı

Toplam **369 test kombinasyonunda** 20.000 sınırını aşan **56 kritik varyasyon** branşlara göre şöyle dağılmaktadır:

| Ders Adı | Toplam Test | Min Karakter | Max Karakter | 20k Aşan Adet | Taşma Oranı | Temel Taşma Nedeni |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **İngilizce** | 60 | 10.089 | 23.413 | **25** | **%41.7** | Geniş diyalog kalıpları + Ders kitabı bağlamları |
| **Türkçe** | 75 | 10.744 | 22.514 | **19** | **%25.3** | Uzun ders kitabı metin alıntıları + Kaçınma uyaranları |
| **Fen Bilimleri** | 57 | 10.470 | 21.977 | **8** | **%14.0** | Deney düzenekleri + Kavram yanılgısı uyarıları |
| **Matematik** | 54 | 10.665 | 22.075 | **4** | **%7.4** | Çok adımlı problem kurguları |
| **Sosyal Bilgiler**| 66 | 10.765 | 19.243 | **0** | **%0.0** | Sınır altında (Max 19.243) |
| **Din Kültürü** | 57 | 10.463 | 19.905 | **0** | **%0.0** | Sınır altında (Max 19.905) |

### 3.3. Türkçe Dersi Prompt Bileşenlerinin Detaylı Karakter Dağılımı (Soru Seti #10 / Senaryo 1)

Aşağıdaki tablo, Türkçe dersinde 5, 6, 7 ve 8. sınıf düzeylerinde üretilen livePrompt bileşenlerinin karakter boyutlarını tam olarak göstermektedir:

| Prompt Bileşeni | 5. Sınıf (kr) | 6. Sınıf (kr) | 7. Sınıf (kr) | 8. Sınıf (kr) | Açıklama ve Tespit Edilen Şişme |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **1. Sınav Başlığı & Dağılım Tablosu** | 864 | 899 | 1.132 | 1.103 | Senaryo dağılımı ve resmi kazanım adları |
| **2. Kaçınma Direktifleri (B+ Mimarisi)** | **3.775** | **3.500** | **4.036** | **3.993** | **Set A soruları (6 adet) + Taslak sorular (3 adet) + Uyaran metinleri** |
| **3. Kazanım Uyum Kuralı** | 722 | 722 | 722 | 722 | Sabit MEB kazanım eşleme kuralı |
| **4. Yaş ve Sınıf Seviyesi Kuralı** | 866 | 776 | 803 | 828 | Bilişsel gelişim ve dil düzeyi direktifi |
| **5. Zorluk Seviyesi Dağılım Planı** | 642 | 642 | 642 | 642 | MEB dengeli zorluk dağılım kuralı |
| **6. Bağlam ve Durum Çeşitliliği Kuralı**| 1.184 | 1.184 | 1.184 | 1.184 | Gerçek yaşam durumları direktifi |
| **7. Yönerge Açıklığı Kuralı** | 1.282 | 1.282 | 1.282 | 1.282 | `QUESTION_DIRECTIVE_CLARITY_RULE` |
| **8. Pedagojik Kalite Kuralları** | 2.028 | 2.028 | 2.028 | 2.028 | `getQualityPedagogicalRules` |
| **9. Rubrik Tasarım Kuralı** | 634 | 634 | 634 | 634 | `RUBRIC_DESIGN_RULE` |
| **10. Ders Kitabı / Branş Direktifleri**| **6.706** | **7.984** | **3.517** | **0** | **KRİTİK TAŞMA KAYNAĞI: 5 ve 6. sınıfta `OUTCOME_STUDY_BANK` tüm verileri!** |
| **11. JSON Çıktı Şeması Direktifi** | 944 | 944 | 944 | 944 | Modelden beklenen JSON formatı |
| **GENEL TOPLAM** | **19.669** | **20.617** | **16.944** | **13.380** | **6. Sınıfta 20.000 sınırı aşılmaktadır (+617 kr)!** |

> [!CAUTION]
> **Kritik Bulgular:**
> 1. **5. Sınıfta Bıçak Sırtı:** 5. Sınıf Türkçe Senaryo 1 baz alındığında 19.669 karakter ölçülmüştür (%98.3 doluluk). Eğer önceki set sorularının metinleri biraz daha uzun olursa veya başka bir senaryoda kazanım sayısı artarsa (örn. 8 soru) prompt derhal **20.000 sınırını aşarak 22.514 karaktere fırlamakta** ve Netlify tarafından reddedilmektedir.
> 2. **6. Sınıfta Kaçınılmaz Hata:** 6. Sınıf Türkçe'de prompt temel haliyle bile **20.617 karakter** çıkmaktadır. 6. sınıfta Soru Seti #10 üretilmeye çalışıldığında %100 oranında HTTP 400 hatası alınmaktadır.
> 3. **Tek API Çağrısı Mimarisi:** Sistem soruları tek tek değil, sınavın tümünü (6 veya 8 soru) tek bir prompt içinde istemektedir. Bu nedenle soru sayısı arttıkça veya kaçınma verileri biriktikçe tek bir dev metin oluşmaktadır.

---

## 4. API VE FALLBACK MEKANİZMASI DERİN ANALİZİ

### 4.1. Yapay Zekâ API Çağrısı Gerçekten Yapılıyor mu?
- **Durum:** Prompt boyutu <= 20.000 karakter olduğunda istemci (`aiGeneratorEngine.ts`), `/api/generate` uç noktasına başarıyla HTTP POST isteği atmakta ve Netlify fonksiyonu Google Gemini API'ye (`generative-language.googleapis.com`) bağlanmaktadır.
- **Hata Durumu:** Ancak prompt > 20.000 karakter olduğunda, istek Netlify fonksiyonunun ilk koruma duvarına takılmaktadır (`netlify/functions/generate.ts:134`). Google Gemini API'ye **hiçbir istek gönderilmemektedir.**

```typescript
// netlify/functions/generate.ts: Satır 134-139
if (prompt.length > 20000) {
  return new Response(JSON.stringify({ error: 'Prompt metni izin verilen karakter sınırını (20.000) aşıyor.' }), {
    status: 400,
    headers: corsHeaders
  });
}
```

### 4.2. İstemcinin Hatayı Yakalama ve Fallback'e Düşme Mekanizması

İstemci tarafında `aiGeneratorEngine.ts:415-430` bloğu incelendiğinde:
- Netlify'dan dönen HTTP 400 yanıtı bir istisna fırlatmaz (`fetch` başarılıdır, ancak `proxyRes.ok === false`).
- Kod `errJson = await proxyRes.json()` ile `{ error: 'Prompt metni izin verilen karakter sınırını (20.000) aşıyor.' }` mesajını alır.
- Bu hata mesajını `fallbackReason` değişkenine kaydeder.
- Ardından fonksiyondan çıkmak yerine **Tier 2 (Prosedürel OYSS Kural Tabanlı Motor)** koduna devam eder!
- Kullanıcıya hiçbir hata diyaloğu gösterilmez; sanki yapay zekâ bir yedekleme kararı almış gibi yerel havuzdan seçilen sorular ekrana basılır.

### 4.3. 5. Sınıfta 5 Denemenin 4'ünde Fallback Oluşma Sebebi
Kullanıcının gözlemlediği "5 denemenin 4'ünde yerel motor devreye girdi" durumunun kök nedenleri şunlardır:
1. **Kaçınma Verilerinin Büyümesi:** İlk denemede (Set #1 / variationIndex 0) prompt 16.500 karakter civarındadır ve geçer. Ancak kullanıcı her yeni set ürettiğinde, önceki setlerin soruları ve uyaran metinleri `avoidQuestionTexts` ve `avoidStimuli` olarak prompta eklenir. 2. ve sonraki setlerde prompt 20.000 sınırını aşarak HTTP 400 ile yerel motora düşer.
2. **Kazanım Kartı Zenginliği:** 5. sınıf Türkçe senaryolarında `T.O.5.6` gibi zengin kazanımlar denk geldiğinde ders kitabı alıntıları (`OUTCOME_STUDY_BANK`) tek başına promptu 20k üzerine fırlatmaktadır.
3. **API Hız Limiti (Rate Limiting - 429):** Kullanıcı üst üste hızlıca deneme yaptığında, Gemini API ücretsiz veya standart katmanında dakikalık istek limitine (RPM) takılabilmekte, `generate.ts` HTTP 429 dönmekte ve sistem yine sessizce yerel motora düşmektedir.

### 4.4. Kullanıcı Arayüzü Şeffaflığı ve Etiket Tutarsızlığı
`AIGeneratorModal.tsx:273-288` aralığında yerel motor devreye girdiğinde sarı bir uyarı kutusu gösterilmektedir:
- `Yerel OYSS Standart Soru Üretim Motoru Devreye Girdi (Soru Seti #10)`
- Altında ise `Prompt metni izin verilen karakter sınırını (20.000) aşıyor.` mesajı yer almaktadır.
- Ancak öğretmenler teknik bir karakter sınırının ne anlama geldiğini veya sistemin neden yapay zekâyı çalıştırmadığını anlamakta zorlanmaktadır. Ayrıca üst sekmelerde veya dışa aktarımda soru kaynağının ayrımı yeterince belirgin değildir.

---

## 5. BOŞ SORU KÖKÜ HATA ANALİZİ (MISSING QUESTION STEM)

### 5.1. Soru Kökünün Kaybolma Mekanizması

Yapılan kod analizinde soru kökünün (`q.question`) kaybolması veya boş kalması şu zincirleme kontrol eksikliklerinden kaynaklanmaktadır:

```
[Gemini LLM Çıktısı]
  │ (LLM bazen soru cümlesini 'stimulus' içine yazar, 'question' alanını "" veya undefined bırakır)
  ▼
[netlify/functions/generate.ts]
  │ Satır 253: Yalnızca Array.isArray(parsedData.questions) kontrol edilir.
  │ HATA: q.question kontrolü YOKTUR! Boş soru kökü HTTP 200 ile istemciye geçer.
  ▼
[src/utils/aiGeneratorEngine.ts]
  │ Satır 324: normalizeAndCalibrateQuestions() fonksiyonu çalışır.
  │ return { ...q, number: idx + 1, ... }
  │ HATA: q.question string kontrolü YOKTUR! Boşluk aynen korunur.
  ▼
[src/utils/sourceMaterialValidator.ts]
  │ Satır 291: validateAndEnrichExamQuestions() fonksiyonu çalışır.
  │ const req = detectSourceRequirement(qText, arch, ctx, stim);
  │ HATA: Sadece 'stimulus' eksikliği denetlenir. Soru kökü boşsa sessizce geçer!
  ▼
[src/components/AIGeneratorModal.tsx]
  │ Satır 403: <MathRenderer content={gq.question} />
  │ Ekranda "Soru:" başlığı altında bomboş bir alan render edilir!
  │ Yeşil rozet: "Başarıyla hazırlandı: OYSS Özgün Sınavı (6 açık uçlu soru)"
```

### 5.2. Kod Düzeyinde Kanıtlar

#### Kanıt 1: `netlify/functions/generate.ts` (Satır 252–266)
```typescript
const parsedData: any = parseResult.data;
if (!parsedData.questions || !Array.isArray(parsedData.questions) || parsedData.questions.length === 0) {
  // Sadece questions dizisinin varlığı kontrol ediliyor!
  return new Response(JSON.stringify({ error: 'Üretilen yanıt geçerli bir soru şeması içermiyor.' }), { status: 422 });
}
// questions dizisindeki hiçbir elemanın q.question alanı kontrol edilmiyor!
return new Response(JSON.stringify({ ...parsedData, activeModel: usedModel }), { status: 200 });
```

#### Kanıt 2: `src/utils/aiGeneratorEngine.ts` (Satır 304–335)
`normalizeAndCalibrateQuestions` fonksiyonu eksik soru geldiğinde (`safeQuestions.length < targetCount`) yeni soru uydurmakta, ancak mevcut bir sorunun `q.question` alanı boş veya 3 harften kısa olduğunda hiçbir müdahalede bulunmamaktadır:
```typescript
const withTitles = safeQuestions.slice(0, targetCount).map((q, idx) => {
  // ...
  return {
    ...q, // q.question boş string ("") ise aynen nesneye kopyalanır!
    number: idx + 1,
    outcome: requiredOutcome,
    // ...
  };
});
```

#### Kanıt 3: `src/utils/sourceMaterialValidator.ts` (Satır 298–315)
Bu doğrulayıcı yalnızca "Metne göre..." denilip metin verilmediğinde (`hasMissingSourceError: true`) bayrağı kaldırmaktadır. Soru kökünün hiç olmaması durumu için hiçbir kural içermemektedir:
```typescript
const req = detectSourceRequirement(qText, arch, ctx, stim);
if (!req.requiresSource) {
  // Soru kökü olmasa bile geçerli sayılıyor!
  return { ...q, hasMissingSourceError: false };
}
```

---

## 6. SORU KALİTESİ VE PEDAGOJİK BİLİŞSEL DÜZEY ANALİZİ

### 6.1. Uzun Senaryodan Yüzeysel Nesne Adı Sorma Sorunu

Kullanıcının belirttiği: *"5. sınıf Türkçe örneklerinden birinde uzun bir senaryodan yalnızca açıkça belirtilen nesnenin adını bulmaya yönelik çok basit bir soru üretilmiştir"* bulgusu pedagojik ve teknik açıdan incelenmiştir:

1. **Öğrenme Çıktısı Yanılsaması:** `curriculumData.ts` dosyasında `T.O.5.6` kazanımı:
   - Başlık: *"Metnin yüzey anlamını belirleyebilme"*
   - Bilişsel Düzey: *"Basit Bilişsel Süreçler"*
   olarak tanımlıdır.
2. **Yönerge Açıklığı Kuralındaki Hatalı Örnek:** `src/generators/prompts/coreRules.ts` içindeki `QUESTION_DIRECTIVE_CLARITY_RULE` incelendiğinde şu satır dikkat çekmektedir:
   > *"Tek bir cevap bekleniyorsa bu durum belirtilmeli ('adını yazınız', 'tek bir cümleyle açıklayınız' vb.)."*
3. **Modelin Kolaya Kaçması (Bilişsel Tembellik):** Model, 20.000 karaktere yaklaşan devasa bir prompt aldığında dikkatini dağıtmakta ("Lost in the Middle"); `T.O.5.6` kazanımını ve `adını yazınız` örneğini görünce 200 kelimelik zengin bir metin kurup altına:
   - *"Metinde Hasan Dede'nin yaktığı nesnenin adını yazınız."* (Cevap: Lamba)
   şeklinde ölçme değeri sıfıra yakın, açık uçlu sınav mantığına aykırı bir soru koymaktadır.
4. **Model Cevap ve Rubrik Uyumsuzluğu:** Bu tarz sorularda model cevap *"Fener lambası"* olurken, rubrikte bazen *"Kavramsal ilkelerin analitik açıklanması (10 puan)"* gibi uyuşmayan kriterler yer alabilmektedir.

---

## 7. KÖK NEDENLER VE BULGU KANIT SINIFLANDIRMASI

Aşağıdaki sınıflandırma, incelenen her problemin teknik dayanağını şüpheye yer bırakmayacak biçimde netleştirmektedir:

| # | İncelenen Problem / Bulgu | Sınıflandırma Düzeyi | Kod Düzeyinde Kesin Kanıt |
| :-: | :--- | :--- | :--- |
| **1** | **Promptun 20.000 karakteri aşması ve Netlify HTTP 400 ile reddedilmesi** | **KESİN OLARAK DOĞRULANDI** | `netlify/functions/generate.ts:134` kontrolü; 6. Sınıf Türkçe'de promptun 20.617 kr çıkması; `AIGeneratorModal.tsx:281`'de birebir bu hatanın görünmesi. |
| **2** | **Karakter aşımında sessizce yerel motora geçilmesi** | **KESİN OLARAK DOĞRULANDI** | `aiGeneratorEngine.ts:427-429` bloğunda HTTP 400'ün yakalanıp `fallbackReason` atanarak Tier 2'ye devam etmesi. |
| **3** | **Soru kökü boş/eksik soruların başarılı kabul edilmesi** | **KESİN OLARAK DOĞRULANDI** | `generate.ts:253`, `aiGeneratorEngine.ts:324` ve `sourceMaterialValidator.ts:291`'de `q.question` kontrolünün bulunmaması. |
| **4** | **5 ve 6. sınıfta ders kitabı direktiflerinin aşırı şişmesi** | **KESİN OLARAK DOĞRULANDI** | `grade56TextbookPrompt.ts` çıktısının 6.706–7.984 karakter tuttuğunun ölçülmesi; 7 ve 8. sınıfta 0 kr olması. |
| **5** | **Uzun senaryodan tek kelimelik nesne adı sorma** | **GÜÇLÜ TEKNİK KANIT VAR** | `curriculumData.ts:1135` ("Basit Bilişsel Süreçler") ve `coreRules.ts` ("adını yazınız") yönlendiricilerinin modeli bu yöne sevk etmesi. |
| **6** | **Tüm soruların tek API çağrısında üretilmesinin getirdiği kırılganlık**| **KESİN OLARAK DOĞRULANDI** | `buildLiveExamPrompt` fonksiyonunun tüm sınavı tek blokta toplaması; soru bazlı doğrulama ve telafi imkânı sunmaması. |

---

## 8. ÖNCELİKLENDİRİLMİŞ DÜZELTME PLANI VE ÇÖZÜM MİMARİSİ

> [!IMPORTANT]
> Bu görev yalnızca analiz görevidir. Aşağıdaki adımlar onay alındıktan sonra uygulanmak üzere tasarlanmıştır.

### FAZ 1: Acil Güvenlik Kalkanı ve Soru Kökü Doğrulaması (P0 - Kritik)

1. **Sunucu Tarafı Soru Kökü Denetimi (`netlify/functions/generate.ts`):**
   - `parsedData.questions` dizisi döndüğünde her soru için:
     ```typescript
     const isValidStem = typeof q.question === 'string' && q.question.trim().length >= 10;
     ```
     kontrolü yapılmalıdır. Tek bir sorunun bile kökü eksikse veya 10 karakterden kısaysa HTTP 422 Unprocessable Entity dönülmeli, arızalı veri istemciye sızdırılmamalıdır.
2. **İstemci Tarafı Soru Kökü Doğrulayıcısı (`sourceMaterialValidator.ts` & `aiGeneratorEngine.ts`):**
   - `validateAndEnrichExamQuestions` fonksiyonuna `hasMissingQuestionStem` kontrolü eklenmeli; soru kökü boş olan sorular için otomatik onarım (stimulus içindeki soru cümlesini ayıklama) veya yerel güvenli soru ile ikame etme mekanizması kurulmalıdır.
3. **Kullanıcı Arayüzü Hata Şeffaflığı (`AIGeneratorModal.tsx`):**
   - Karakter sınırı veya API hatası nedeniyle yerel motora geçildiğinde, kullanıcıya teknik hata kodu yerine açık, anlaşılır bir bildirim ve "Tekrar Dene" butonu sunulmalıdır.

### FAZ 2: Prompt Uzunluk Optimizasyonu ve Akıllı Sıkıştırma (P0 - Kritik)

20.000 karakter sınırını körlemesine yükseltmek Netlify Function zaman aşımı (10 saniye) ve Gemini API gecikme risklerini artıracaktır. Çözüm, **eğitimsel bağlamı kaybetmeden akıllı sıkıştırma** yapmaktır:

1. **Ders Kitabı Direktiflerinin Sıkıştırılması (`grade56TextbookPrompt.ts`):**
   - Şu an eklenen PDF dosya adları, ünite başlıkları, baskı sayfa aralıkları ve uzun uyarılar yerine yalnızca **Kavram Çekirdeği** ve **Püf Noktalar** eklenmelidir.
   - 7.984 karakter tutan metin, anlam kaybı olmaksızın **2.200–2.800 karaktere** düşürülebilir (Tasarruf: ~5.000 karakter).
2. **Kaçınma Direktiflerinin Optimize Edilmesi (`buildAvoidDirectives`):**
   - Hazır sınav sorularının ve önceki setlerin tam metinleri yerine anahtar kavramlar ve kurgu özetleri (Smart Digest) verilmelidir.
   - 4.000 karakter tutan kaçınma bloğu **1.500 karaktere** çekilebilir (Tasarruf: ~2.500 karakter).
3. **Beklenen Sonuç:**
   - 6. Sınıf Türkçe promptu: **20.617 karakterden ~13.200 karaktere** inecektir.
   - Sistem 20.000 karakter sınırından %35 uzakta, son derece güvenli bir çalışma aralığına kavuşacaktır.

### FAZ 3: Pedagojik ve Bilişsel Düzey Kalite Koruması (P1 - Yüksek)

1. **Açık Uçlu Soru Kökü Yönergesi İyileştirmesi:**
   - `coreRules.ts:QUESTION_DIRECTIVE_CLARITY_RULE` içerisindeki `"adını yazınız"` ifadesi kaldırılmalı; yerine:
     > *"Metnin yüzey anlamını ölçen sorularda bile öğrenciden durumu gerekçelendirmesi, olay-sonuç ilişkisini kendi cümleleriyle kurması istenmelidir. Yalnızca nesne, varlık veya kişi adı soran tek kelimelik yüzeysel sorular üretilemez."*
     kuralı getirilmelidir.
2. **Rubrik ve Model Cevap Çapraz Denetimi:**
   - Model cevap ile soru kökünün semantik tutarlılığı istemci tarafında basit bir örtüşme skoruyla denetlenmeli; cevabı 3 kelimeden kısa olan açık uçlu sorular reddedilmelidir.

---

## 9. REGRESYON VE DOĞRULAMA TEST MATRİSİ

Düzeltmeler uygulandığında çalıştırılacak test senaryoları:

| Test ID | Test Senaryosu | Beklenen Sonuç | Doğrulama Yöntemi |
| :--- | :--- | :--- | :--- |
| **TEST-01** | 6. Sınıf Türkçe Senaryo 1 (Soru Seti #10) Üretimi | Prompt <= 15.000 kr olmalı; Netlify HTTP 200 dönmeli; Gemini AI ile üretilmeli. | Otomatik boyutsal test ve canlı API denemesi |
| **TEST-02** | 5. Sınıf Türkçe Senaryo 1 (Soru Seti #1–#5 ardışık) | 5 denemenin 5'inde de yapay zekâ aktif olmalı; hiçbirinde HTTP 400 fallback olmamalı. | Döngüsel varyasyon testi |
| **TEST-03** | Modelin `question: ""` döndürdüğü simülasyon (Mock API) | Sistem bunu HTTP 422 ile yakalamalı veya otomatik güvenli telafi uygulamalı; UI'da boş soru görünmemeli. | Unit test (`aiGeneratorEngine.test.ts`) |
| **TEST-04** | İngilizce ve Fen Bilimleri En Uzun Senaryo Testi | 20.000 karakteri aşan sıfır (0) prompt kalmalı. | Kapsamlı müfredat tarama betiği |
| **TEST-05** | Bilişsel Düzey Yüzeysellik Kontrolü | 5. Sınıf Türkçe sorularında tek kelimelik nesne adı soruları üretilmemeli. | Pedagojik çıktı kontrolü |
| **TEST-06** | Mevcut 398 Jest/Vitest Testinin Tamamının Geçmesi | 398/398 PASS korunmalı. | `npm test` |

---

## 10. SONUÇ VE TAVSİYELER

1. **Karakter sınırı hatası:** Rastgele sınır artırımıyla değil, gereksiz tekrarların temizlenmesi ve ders kitabı yönergelerinin rafine edilmesiyle çözülmelidir.
2. **Boş soru kökü hatası:** Çok katmanlı savunma (Sunucu doğrulaması + İstemci doğrulaması + Arayüz guard'ı) ile %100 engellenmelidir.
3. **Soru kalitesi:** MEB ÖDSGM açık uçlu soru standartları doğrultusunda prompt kuralları sıkılaştırılarak yüzeysel üretimlerin önüne geçilmelidir.

Bu rapor, OYSS sisteminde planlanan düzeltme geliştirme fazı için teknik ve pedagojik temel teşkil etmektedir.
