# OYSS REHBERİ | AKILLI GÖRSELLEŞTİRME VE İNFOGRAFİK ÜRETİM ALTYAPISI
## FAZ 1: Kapsamlı Mimari İnceleme ve Teknik Uygulama Planı

**Doküman No:** 065  
**Tarih:** 2 Kasım 2026  
**Durum:** Mimari İnceleme ve Tasarım (Kod Değişikliği Yapılmadı)  
**İlk Pilot Alanı:** 7. Sınıf Matematik (Rasyonel Sayılar, Sayı Doğrusu, Ondalık Gösterim)  
**Hedef Kapsam:** Hazır sınav soruları, yapay zekâ soru üretimi ve konu/kazanım bazlı infografik modülü için bütünleşik görsel altyapı  

---

## 1. YÖNETİCİ ÖZETİ

Bu rapor, OYSS Rehberi platformuna pedagojik olarak doğrulanmış, matematiksel hassasiyete sahip ve yüksek performanslı bir görsel öğrenme altyapısı kazandırmak amacıyla hazırlanmıştır.

Mevcut sistemde sorular, durum senaryoları (`stimulus`), formüller ve tablolar çoğunlukla metin, KaTeX veya Unicode karakterleriyle temsil edilmektedir. Ancak Millî Eğitim Bakanlığı (MEB) ÖDSGM ortak yazılı sınavlarında ve Türkiye Yüzyılı Maarif Modeli (TYMM) öğretim programlarında; **sayı doğrusu, kesir/alan modelleri, termometre ve dikey ölçekler, koordinat sistemleri, veri grafikleri ve durum illüstrasyonları** ölçme ve değerlendirmenin ayrılmaz bir parçasıdır.

Bu çalışmada belirlenen temel mimari ilkeler şunlardır:
1. **Matematiksel Doğruluk Güvencesi:** Matematiksel veya mantıksal doğruluk gerektiren çizimler (sayı doğruları, koordinat düzlemleri, kesir modelleri, geometrik açılar) doğrudan belirsiz (non-deterministic) yapay zekâ görsel modellerine yaptırılmayacak; parametrik, hafif ve her çözünürlükte net görünen **vektörel SVG ve veri tabanlı çizim motoru** ile üretilecektir.
2. **Dil ve Tipografi Güvencesi:** Türkçe metinler, harfler, semboller ve formüller görüntü pikseli olarak rasterize edilmeyecek; DOM ve KaTeX katmanında metin olarak tutulacak, böylece bulanıklaşma, harf bozulması ve erişilebilirlik kaybı engellenecektir.
3. **Görsel Üretim Modellerinin Sınırları:** Gemini veya benzeri görsel üretim modelleri yalnızca gerçek yaşam sahneleri, ortam ve durum çizimleri ile infografik dekoratif illüstrasyonları için kullanılacaktır.
4. **Kaynak Şeffaflığı ve Soru-Görsel Köken Ayrımı:** Mevcut `sourceOrigin` yapısı korunacak; sorunun kökeni (MEB ÖDSGM resmî sorusu) ile görselin kökeni (OYSS SVG Çizim Motoru) birbirinden açıkça ayrılacaktır.
5. **Kesintisiz Çalışma (Graceful Degradation):** Görselin yüklenemediği veya üretilemediği durumlarda sınav, soru çözümü, rubrik değerlendirmesi ve PDF yazdırma süreçleri asla durmayacak; mevcut metinsel akış kesintisiz sürecektir.

---

## 2. MEVCUT MİMARİNİN İNCELENMESİ

OYSS Rehberi projesinin mevcut kod tabanı taranmış ve görselleştirme ile ilişkili tüm bileşenler haritalandırılmıştır:

### 2.1 Soru Veri Modelleri ve TypeScript Tipleri (`src/types/index.ts`)
- **`ExamQuestion`:** Soruların temel veri yapısıdır. `questionNumber`, `outcomeCode`, `outcomeTitle`, `difficulty`, `cognitiveLevel`, `archetype`, `points`, `contextText`, `stimulus`, `questionText`, `solutionExplanation`, `modelAnswer`, `alternativeAnswers`, `rubric`, `sourceOrigin`, `originExamTitle` ve `originQuestionNumber` alanlarını içerir.
- **Görsel Alanı Durumu:** Mevcut `ExamQuestion` arayüzünde herhangi bir `image`, `visual` veya `svg` alanı bulunmamaktadır. Görsel gerektiren hazır sınav sorularında durum, `stimulus` veya `contextText` string alanları içinde metinsel betimlemelerle (örneğin *"Bir fen dergisindeki görselde..."* veya *"Aşağıdaki tabloda..."*) ifade edilmektedir.
- **`InfographicItem`:** `id`, `grade`, `subjectId`, `examTerm`, `title`, `subtitle`, `category`, `summaryCards` (kartlar, rozetler, maddeler, vurgular), `comparisonTable` (başlıklar ve satırlar matrisi) ve `memoryHook` (akılda kalıcı tekerleme/ipucu) alanlarını içerir. Ancak kazanım kodu (`outcomeCode`) ve görsel şema alanı mevcut modelde yer almamaktadır.

### 2.2 Hazır Sınavlar ve Soru Veritabanı (`src/data/sampleExams.ts`)
- Canlı portala entegre edilmiş 123 sınav ve 847 soru bulunmaktadır.
- 7. sınıf Matematik kapsamında 4 resmî senaryo sınavı (`senaryo_1` - `senaryo_4`) yer almaktadır.
- Matematik sorularında KaTeX gösterimleri (`$...$`, `\frac{...}{...}`) ve metin tabanlı tablolar başarıyla kullanılmaktadır; ancak geometrik şekiller veya sayı doğrusu grafikleri henüz yer almamaktadır.

### 2.3 Yapay Zekâ Soru Üretim Zinciri
- **`netlify/functions/generate.ts`:** Sunucu tarafında `GEMINI_API_KEY` ortam değişkenini okuyarak Google Generative Language API (`gemini-3.5-flash-lite`, `gemini-2.5-flash`, `gemini-1.5-flash`) üzerinden JSON yanıtı alan güvenli proxy fonksiyonudur.
- **`src/utils/aiGeneratorEngine.ts`:** `generateMEBIQuestions()` fonksiyonu üzerinden istemci/sunucu isteklerini yönetir. Canlı API yanıt vermezse devreye giren 2. kademe yerel kural tabanlı motor (`fallbackPools`) ve dinamik sentez mekanizması içerir.
- **`src/generators/prompts/`:** `types.ts`, `coreRules.ts`, `gradeRules.ts`, `outputSchema.ts`, `index.ts` ve `promptRegistry.ts` dosyalarından oluşur. Promptlar MEB ÖDSGM ve TYMM ölçme standartlarını belirler; çıktıyı katı bir JSON şemasına zorlar.

### 2.4 Arayüz ve Sunum Bileşenleri
- **`src/components/ExamPaperView.tsx`:** Sınav kâğıdı görünümü, A4 yazdırma modu ve cevap anahtarı/rubrik dökümünü yönetir. `@media print` kurallarıyla `window.print()` üzerinden PDF oluşturulmasını sağlar.
- **`src/components/InteractivePracticeView.tsx`:** Öğrencinin soruları etkileşimli olarak çözdüğü, matematik editörüyle KaTeX formülleri yazdığı, model cevap ve iki kademeli analitik rubrikle kendini değerlendirdiği ana öğrenme modülüdür.
- **`src/components/MathRenderer.tsx`:** KaTeX kütüphanesini kullanarak matematiksel sembol ve formülleri (`$`, `$$`, `\frac`, `\sqrt`, `\times` vb.) güvenli bir şekilde HTML'e dönüştürür.
- **`src/components/InfographicView.tsx`:** İnfografik kartlarını, sınav şifrelerini ve karşılaştırma tablolarını listeleyen mevcut sunum bileşenidir.
- **`src/data/infographics.ts`:** 18 adet statik infografik tanımı içerir (yalnızca 5, 6 ve 8. sınıflar için tanımlıdır; 7. sınıf Matematik için henüz infografik bulunmamaktadır).
- **`src/data/outcomeStudyBank.ts`:** Kazanım bazlı ders kitabı ünite, sayfa, çözümlü örnek ve sınav tuzaklarını barındıran zengin referans bankasıdır.

---

## 3. İLGİLİ DOSYALAR VE BİLEŞENLER HARİTASI

| Katman / Modül | İlgili Dosyalar | Mevcut Sorumluluk | Görselleştirme Altyapısındaki Rolü |
| :--- | :--- | :--- | :--- |
| **Veri Tipleri** | `src/types/index.ts` | Soru, sınav ve infografik arayüzleri | `QuestionVisual`, `VisualType`, `VisualSourceOrigin` eklenmesi; `InfographicItem`'a kazanım ve şema desteği verilmesi |
| **Soru Havuzu** | `src/data/sampleExams.ts` | Hazır sınavlar ve resmî sorular | Hazır sorulara `visual` nesnelerinin (SVG veya kırpılmış resmî görsel) eklenmesi |
| **Soru Üretim Motoru** | `src/utils/aiGeneratorEngine.ts` | Soru üretimi ve fallback yönetimi | AI üretiminden sonra görsel ihtiyacı analiz aşamasının işletilmesi |
| **Prompt Mimarisi** | `src/generators/prompts/` | Gemini prompt kuralları ve JSON şeması | Görsel ihtiyacı ve parametre şemasının prompt sistemine tanımlanması |
| **Sunucu Fonksiyonu** | `netlify/functions/generate.ts` | Netlify Serverless Function / Gemini API | Görsel parametrelerini ve gereksinimlerini aktarma |
| **Sınav Kâğıdı Arayüzü** | `src/components/ExamPaperView.tsx` | A4 sınav kâğıdı ve yazdırma görünümü | Soru kartı içinde görselin responsive ve baskıya uygun render edilmesi |
| **Etkileşimli Sınav** | `src/components/InteractivePracticeView.tsx` | Uygulama, çözme ve rubrik değerlendirme | Soru çözme ve öz değerlendirme ekranında görselin interaktif gösterimi; yanlış cevaptan infografiğe bağlantı |
| **İnfografik Modülü** | `src/components/InfographicView.tsx`<br>`src/data/infographics.ts` | İnfografik ve püf noktalar sunumu | Şablon çeşitliliği, SVG entegrasyonu, dinamik üretim desteği |
| **Kazanım & Föy Bankası**| `src/data/curriculumData.ts`<br>`src/data/outcomeStudyBank.ts` | Senaryolar, kazanımlar ve ders kitabı föyleri | Yanlış yapılan soru ile konu infografiğinin eşleştirilmesi |
| **Baskı & Dosya Adı** | `src/utils/materialFileNameGenerator.ts`<br>`src/index.css` | PDF adlandırma ve `@media print` kuralları | Yüksek çözünürlüklü vektörel baskı kalitesinin korunması |

---

## 4. SORU GÖRSELLEŞTİRME ALTYAPISI

### 4.1 Hazır Sınavlar (Resmî MEB Örnek Soruları)
Hazır sınavlardaki soruların görselleri üç temel teknik kategoride ele alınmalıdır:

1. **Ayrıştırılabilir Vektörel / Matematiksel Çizimler:**
   - Sayı doğrusu, basit geometrik şekiller veya veri tabloları hazır sorudan okunarak parametrik SVG formatına aktarılır.
   - *Avantaj:* Sonsuz çözünürlük, 0 KB harici resim indirme maliyeti, A4 baskıda sıfır bulanıklık.
2. **Karmaşık Sahne ve Özgün Çizimler (PDF Kırpma / Çıkarma):**
   - Ayrıştırılması imkânsız olan otantik illüstrasyonlar (örneğin karınca köprüsü, deney düzeneği, tarihi minyatür), orijinal Bakanlık PDF dokümanından 300 DPI eşdeğeri kayıpsız WebP formatında kesilerek `public/assets/questions/` dizininde arşivlenir.
3. **Metin ile Görselin Birleşik Olduğu Durumlar:**
   - Metin ve grafik iç içe ise soru metni bozulmaz; görsel alanına `official_extracted` türünde blok eklenir, soru metninde gereksiz tekrarlar yapılmaz.
4. **Telif ve Mevzuat Güvencesi:**
   - 5846 sayılı FSEK Madde 34 (Eğitim ve Öğretim İçin Alıntılar) uyarınca kamuya açık sınav örnekleri kaynak belirtilerek (`sourceOrigin: 'meb_official'`, `originExamTitle: '...'`) ve ticari olmayan eğitim portalı kapsamında atıfla sunulur.

### 4.2 Yapay Zekâ Tarafından Oluşturulan Sorular
Mevcut Gemini soru üretim akışını bozmadan çalışan **İki Aşamalı Görsel Üretim Hattı (Two-Stage Visual Pipeline)** tasarlanmıştır:

```
[Kullanıcı: Soru Üret] 
       │
       ▼
[Aşama 1: Gemini Metin & Rubrik Üretimi] ──> (Soru Metni, Kazanım, Çözüm, Rubrik)
       │
       ▼
[Aşama 2: Görsel İhtiyacı Analizörü (Visual Classifier)]
       │
       ├─► [Görsel Gerekmiyor] ──────────────────────────► (Doğrudan Soru Listesine Ekle)
       │
       └─► [Görsel Gerekiyor]
                 │
                 ├─► [Matematiksel / Verisel]: Sayı Doğrusu, Kesir, Grafik, Açı
                 │         │
                 │         ▼
                 │   [Parametre Çıkarımı & Yerel SVG Motoru] ──> (Kusursuz SVG Üretimi)
                 │
                 └─► [Bağlamsal / Gerçek Yaşam Sahnesi]: Ortam, Doğa, Vaka
                           │
                           ▼
                     [Görsel Model İsteği veya Küratörlü Vektör Kütüphanesi]
```

#### İşlem Adımları:
1. **Analiz ve Sınıflandırma:** Üretilen sorunun öğrenme çıktısı (`outcomeCode`), pedagojik şablonu (`archetype`) ve metin içeriği analiz edilir. Örneğin `MAT.7.1.3` kazanımı "sıralama ve sayı doğrusu" içeriyorsa sistem otomatik olarak `visualType: 'number_line'` etiketini koyar.
2. **Parametre Çıkarımı:** Soru metnindeki sayılar (örneğin $-\frac{5}{6}$ ve $-\frac{3}{4}$) tespit edilerek çizim parametrelerine dönüştürülür:
   ```json
   {
     "min": -1,
     "max": 0,
     "divisions": 12,
     "highlights": [
       { "value": -0.833, "label": "-5/6 (-10/12)", "color": "rose" },
       { "value": -0.75, "label": "-3/4 (-9/12)", "color": "indigo" }
     ]
   }
   ```
3. **Doğruluk Denetimi (Validation):** Çizim parametrelerindeki değerlerin soru metnindeki ve çözümdeki sayılarla birebir örtüştüğü doğrulanır.
4. **Bağlama:** Üretilen `QuestionVisual` nesnesi soruya eklenir.

---

## 5. GÖRSEL TÜRLERİ VE ÜRETİM YÖNTEMLERİ MATRİSİ

| Görsel Türü | Temsil Edilen Alan | Önerilen Üretim Teknolojisi | Neden Bu Yöntem? (Teknik Gerekçe) |
| :--- | :--- | :--- | :--- |
| **Sayı Doğrusu** | Negatif/pozitif sayılar, rasyonel sıralama | **Parametrik SVG Motoru** | Sayı aralıkları, oklar ve noktalar piksel hassasiyetinde matematiksel formülle çizilmelidir. |
| **Kesir Modelleri** | Parça-bütün, alan modelleri, pasta/bar | **SVG / CSS Grid Çizimi** | Eşit parçalara bölme ve taralı alanların oranı kesin olmalıdır; yapay zekâ pikselleri hata yapar. |
| **Geometrik Şekiller** | Açılar, üçgenler, paralelkenar | **Vektörel SVG Motoru** | Açı ölçüleri, diklik işaretleri (∟) ve kenar uzunlukları kesin geometri koordinatlarıyla çizilmelidir. |
| **Koordinat Düzlemi** | Nokta koordinatları, x/y eksenleri | **SVG / Canvas Tabanlı** | Eksen ölçeği ve 1. - 4. bölge yerleşimleri sayısal doğruluk şartı taşır. |
| **Veri Grafikleri** | Sütun, çizgi, daire grafiği | **Bileşen Tabanlı SVG Çizimi** | Yüzde dilimleri ve sütun yükseklikleri verilerle %100 tutarlı olmalıdır. |
| **Ölçüm Araçları** | Termometre, tartı, kronometre | **Şablon Tabanlı SVG** | Sıcaklık (°C) ve kütle göstergeleri metindeki değerle tam eşleşmelidir. |
| **Tablolar ve Matrisler**| Karşılaştırma, sınıflandırma | **HTML / Tailwind CSS** | Metin kalitesi, kopyalanabilirlik ve ekran okuyucu erişilebilirliği için görselleştirilmiş HTML tablosu şarttır. |
| **Gerçek Yaşam Sahneleri**| Kutup ortamı, laboratuvar, atölye | **Görsel Üretim Modeli / İllüstrasyon** | Dekoratif ve bağlamsal sahnelerde matematiksel kesinlik gerekmez; estetik atmosfer sunulur. |
| **Hazır Sınav Çizimleri**| MEB ÖDSGM orijinal soru görselleri | **Kaynaktan Çıkarılmış Kayıpsız WebP** | Resmî sınavdaki özgün tasarım ve soru bütünlüğü birebir korunmalıdır. |

---

## 6. İNFOGRAFİK ÜRETİM MODÜLÜ MİMARİSİ

### 6.1 Mevcut Durumun Tespiti
- `src/components/InfographicView.tsx` bileşeni şu anda yalnızca önceden elle yazılmış statik kartları (`SAMPLE_INFOGRAPHICS`) filtreleyip listelemektedir.
- Arayüzde sadece 1 adet sabit tasarım düzeni (sol-sağ özet kartları + alt karşılaştırma tablosu) bulunmaktadır.
- 7. sınıf Matematik veya Din Kültürü gibi kademelerde hiçbir infografik verisi bulunmadığından ekran boş kalmaktadır.

### 6.2 Yeni İnfografik Üretim Mimarisi
İnfografik modülü, hem statik zengin içeriği sunabilen hem de seçilen **sınıf, ders ve kazanıma göre dinamik olarak üretilebilen** modern bir görsel öğrenme motoruna dönüştürülecektir:

```
[Kullanıcı: Kazanım Seçimi veya Hatalı Soru Yönlendirmesi]
                         │
                         ▼
             [İnfografik Üretim Motoru]
                         │
    ┌────────────────────┴────────────────────┐
    ▼                                         ▼
[Yerel Müfredat Bankası]              [Yapay Zekâ Sentezi]
(OUTCOME_STUDY_BANK Ders Kitabı     (Gemini Yapılandırılmış JSON)
Ünite, Sayfa, Tuzak & Çözüm)                  │
    │                                         │
    └────────────────────┬────────────────────┘
                         ▼
        [Yapılandırılmış İnfografik Şeması]
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
[Kavram Haritası]  [Süreç / Adım]  [Özet & Matris]
(Şablon A)          (Şablon B)       (Şablon C)
        │                │                │
        └────────────────┼────────────────┘
                         ▼
   [SVG Matematiksel Çizim + HTML/KaTeX Tipografi]
                         │
        ┌────────────────┴────────────────┐
        ▼                                 ▼
[Web Görünümü (Responsive)]       [A4 Vektörel PDF Çıktısı]
```

### 6.3 Çeşitlendirilmiş İnfografik Tasarım Şablonları
Tek tip şablon yerine konunun pedagojik doğasına göre **3 farklı tasarım şablonu** desteklenecektir:

1. **Şablon A: "Karşılaştırma ve Ayrım Matrisi" (Örn: Pozitif vs. Negatif Rasyoneller)**
   - İki sütunlu simetrik kartlar, kural rozetleri, ortak tuzak uyarısı ve alt karşılaştırma tablosu.
2. **Şablon B: "Adım Adım Problem Çözme ve Süreç Akışı" (Örn: Devirli Ondalık ➔ Rasyonel Çevrim)**
   - Numaralandırılmış yatay/dikey akış adımları, formül kutusu, kural balonu ve çözümlü uygulama kartı.
3. **Şablon C: "Kavram Ağacı ve Görsel Cetvel" (Örn: Rasyonel Sayı Doğrusu ve Yoğunluk Özelliği)**
   - Üstte interaktif SVG sayı doğrusu cetveli, altta temel kavram kartları ve "Sınav Şifresi" (Memory Hook).

### 6.4 İnfografik ve Soru Entegrasyonu (Geriye Dönük Öğrenme Döngüsü)
Öğrencinin etkileşimli sınavda (`InteractivePracticeView`) bir soruyu yanlış yapması veya rubrikte eksik puan alması durumunda:
1. Sistem ilgili sorunun `outcomeCode` değerini (örn: `MAT.7.1.3`) alır.
2. Sonuç değerlendirme ekranında `TextbookSourceCard` yanında **"Görsel Püf Noktalar & İnfografik Kartını İncele"** eylem butonu gösterilir.
3. Öğrenci butona bastığında, modal pencerede veya ilgili sekmede `MAT.7.1.3` kazanımına ait infografik açılır.
4. İnfografiğin altında **"Soruya Geri Dön ve Tekrar Çöz"** bağlantısı sunularak öğrenme döngüsü tamamlanır.

---

## 7. ORTAK GÖRSEL YÖNETİM KATMANI VE VERİ MODELİ ÖNERİSİ

Soru görselleri ile infografiklerin ortak bir tip güvenliğiyle yönetilmesi için önerilen TypeScript veri modelleri:

```typescript
// src/types/visual.ts (Yeni Önerilen Katman)

export type VisualType = 
  | 'number_line'          // Sayı doğrusu (Parametrik SVG)
  | 'fraction_model'       // Kesir / Alan modeli (SVG)
  | 'coordinate_system'    // Koordinat düzlemi (SVG)
  | 'geometric_shape'      // Geometrik şekil / açı (SVG)
  | 'data_chart'           // Grafik (SVG)
  | 'measurement_tool'     // Termometre / terazi (SVG)
  | 'table_matrix'         // Yapılandırılmış matris (HTML)
  | 'official_extracted'   // MEB orijinal kırpılmış görseli (WebP)
  | 'ai_illustration';     // Dekoratif / bağlamsal sahne

export type VisualSourceOrigin =
  | 'meb_extracted'        // Bakanlık resmî sınav dokümanından alıntı
  | 'oyss_svg_engine'      // OYSS yerel matematik çizim motoru
  | 'oyss_curated_asset'   // OYSS doğrulanmış vektör varlığı
  | 'gemini_svg_synth'     // Gemini tarafından parametrelendirilmiş SVG
  | 'ai_generated_image';  // Yapay zekâ görüntü modeli

export interface QuestionVisual {
  id: string;
  visualType: VisualType;
  sourceOrigin: VisualSourceOrigin;
  title?: string;
  altText: string;
  caption?: string;
  
  // İçerik Temsili
  svgContent?: string;                   // Vektörel doğrudan SVG metni (Öncelikli)
  imageUrl?: string;                     // Statik görsel dosya yolu (WebP/PNG)
  structuredData?: Record<string, any>;  // Sayı doğrusu / grafik parametreleri
  
  // Görünüm ve Baskı
  placement: 'above_question' | 'inside_stimulus' | 'below_question';
  aspectRatio?: string;                  // '16/9', '4/3', '3/1'
  maxWidthPx?: number;                   // Maksimum piksel genişliği
  
  // Kaynak, Atıf ve Güvenlik
  attribution?: string;                  // Telif ve kaynak atıfı
  licenseNote?: string;                  // "MEB Kamu Açık Kaynak Alıntısı"
  verified: boolean;                     // Matematiksel kontrol yapıldı mı?
}

// ExamQuestion içine eklenecek opsiyonel alan:
// export interface ExamQuestion {
//   ...
//   visual?: QuestionVisual;
// }

// İnfografik Modeline eklenecek genişletmeler:
// export interface InfographicItem {
//   ...
//   outcomeCode?: string;
//   templateType?: 'cards_and_table' | 'process_flow' | 'diagram_focus';
//   diagramVisual?: QuestionVisual;
//   textbookReference?: {
//     unit: string;
//     pageRange: string;
//     bookName: string;
//   };
// }
```

---

## 8. 7. SINIF MATEMATİK İLK PİLOT SENARYOSU

İlk uygulama alanı olarak 7. sınıf Matematik 1. Dönem 1. Yazılı 1. Senaryosu belirlenmiştir:

### 8.1 Pilot Çıktı A: Görsel Destekli Matematik Sorusu (`MAT.7.1.3`)
- **Soru Metni:** Mert ile Ece'nin rasyonel sayılarda sıralama tartışması ($-3/4$ ile $-5/6$).
- **Görsel Türü:** `number_line` (Parametrik SVG).
- **Görsel İçeriği:** 
  - $-1$ ile $0$ arası 12 eşit birime ayrılmış yatay cetvel.
  - $-10/12$ noktasında kırmızı işaret ve bayrak: `Ece'nin Sayısı (-5/6)`.
  - $-9/12$ noktasında mavi işaret ve bayrak: `Mert'in Sayısı (-3/4)`.
  - Sıfır noktası ve negatif yön oku.
- **Pedagojik Katkı:** Öğrenci, negatif sayılarda sıfırdan sola doğru gidildikçe sayının küçüldüğünü görsel üzerinde somut olarak görür.
- **Kayıt ve Kaynak:** `sourceOrigin: 'meb_official'`, `visual.sourceOrigin: 'oyss_svg_engine'`.

### 8.2 Pilot Çıktı B: İlgili Konu İnfografiği (`info_7_mat_rasyonel_siralama`)
- **Kazanım:** `MAT.7.1.3`
- **Başlık:** "Rasyonel Sayılarda Sıralama ve Sayı Doğrusu Püf Noktaları"
- **Alt Başlık:** "7. Sınıf Matematik 1. Yazılı Görsel Hafıza Kartı"
- **Hafıza Şifresi (Memory Hook):** *"Negatifte sıfırdan uzaklaşan küçülür; borcun büyüğü daha azdır!"*
- **Kart 1:** "Paydaları Eşitleme Yöntemi (En Küçük Ortak Kat)"
- **Kart 2:** "Negatif Sayılarda Ters Düşünme Kuralı"
- **Görsel Şema:** İki rasyonel sayının sayı doğrusundaki yerleşim şeması.
- **Ders Kitabı Kanıtı:** 7. Sınıf Matematik Ders Kitabı 1. Ünite, s. 28-34.
- **Çözümlü Örnek & Sınav Tuzağı:** "Pozitif sıralamanın yönünü negatifte ters çevirmeyi unutmayınız!"

---

## 9. TEKNİK SORULARIN AYRINTILI YANITLARI

Kullanıcı talimatının 8. bölümünde yer alan 16 kritik soru sırasıyla yanıtlanmıştır:

#### 1. Mevcut soru veri modeline geriye dönük uyumlu bir görsel alanı nasıl eklenebilir?
`src/types/index.ts` içindeki `ExamQuestion` arayüzüne opsiyonel `visual?: QuestionVisual;` alanı eklenir. Alan zorunlu olmadığı (`?`) için eski 847 soru, `sampleExams.ts`, yerel `fallbackPools` ve mevcut 25 test süitinin hiçbiri bozulmaz; %100 geriye dönük uyumluluk sağlanır.

#### 2. Hazır sınavlardaki görseller hangi bileşende ve hangi aşamada sorularla eşleştirilebilir?
Eşleştirme, veri yükleme aşamasında (`src/data/sampleExams.ts`) veya çalışma zamanında soru zenginleştirme motorunda (`src/utils/sourceMaterialValidator.ts`) yapılabilir. Önerilen yöntem; hazır soruların `visual` nesnelerinin doğrudan `sampleExams.ts` içinde soru nesnesine kalıcı olarak tanımlanmasıdır.

#### 3. PDF sayfalarından görsel çıkarma veya soru bloğunu koruma için mevcut sistemde hangi altyapı kullanılabilir?
Mevcut tarayıcı ortamında istemci tarafında PDF ayrıştırmak performansı düşürür. Bu nedenle geliştirme aşamasında yerel Python betiği (`pdf2image` ve `pdfplumber` araçlarıyla) kullanılarak resmî MEB PDF'lerindeki çizimler kayıpsız WebP/PNG olarak kırpılır ve `/public/assets/questions/` dizinine yerleştirilir.

#### 4. Gemini soru üretim akışına görsel ihtiyacı analizi hangi aşamada eklenmelidir?
`src/utils/aiGeneratorEngine.ts` içinde birinci aşama (soru metni, rubrik ve model cevap üretimi) tamamlandıktan hemen sonra, sorular arayüze teslim edilmeden önce eklenmelidir. Bu sayede soru üretim başarısı görsel üretiminden bağımsızlaşır.

#### 5. Mevcut API ve altyapı görsel üretimi için yeterli mi?
**Evet, fazlasıyla yeterlidir.** Çünkü matematiksel, tablosal ve kavramsal görsellerin %90'ı yerel parametrik SVG motoru ve KaTeX ile üretilecektir. Gemini API yalnızca sayısal parametreleri (örneğin kesir pay ve paydası, sayı doğrusu sınırları) JSON olarak sağlayacaktır.

#### 6. Yeni bir görsel üretim API'si veya ücretli servis gerekiyor mu?
**Hayır, kesinlikle gerekmemektedir.** Harici ücretli bir görüntü üretim servisi (DALL-E, Midjourney vb.) eklenmeyecektir. Mevcut `GEMINI_API_KEY` ve Netlify serverless altyapısı tüm ihtiyacı karşılamaktadır.

#### 7. Matematiksel çizimler SVG tabanlı nasıl üretilebilir?
`src/utils/svgMathEngine.ts` adında hafif, saf TypeScript fonksiyonlarından oluşan bir kütüphane tasarlanacaktır:
- `generateNumberLineSvg({ min, max, points, step })`
- `generateFractionBarSvg({ total, shaded })`
- `generateAngleSvg({ degrees, label })`
Bu fonksiyonlar standart, temiz SVG dizgeleri (`<svg ...><line /><circle /><text /></svg>`) üretir.

#### 8. Mevcut infografik modülü hangi teknolojilerle çalışıyor?
React 18, Tailwind CSS, Lucide-React ikonları ve KaTeX (`MathRenderer`) ile çalışmaktadır. Statik veri `SAMPLE_INFOGRAPHICS` dizisinden okunmakta, `InfographicView.tsx` ile grid ve tablo olarak basılmaktadır.

#### 9. İnfografik modülü yeni görsel altyapısıyla ortaklaştırılabilir mi?
**Evet.** Soru kartlarında kullanılan `QuestionVisual` veri tipi, `InfographicItem` içindeki `diagramVisual` alanında da doğrudan kullanılarak aynı SVG çizim motorundan faydalanacaktır.

#### 10. İçerik üretimi ile tasarım üretimi nasıl ayrıştırılabilir?
İçerik (kavramlar, açıklamalar, formüller ve sayısal değerler) yapay zekâ tarafından JSON şeması olarak üretilir. Tasarım (renkler, tipografi, grid yerleşimi, kenar yuvarlatmaları ve SVG çizimleri) ise React bileşenleri ve Tailwind CSS şablonları tarafından deterministik olarak çizilir.

#### 11. İnfografikler soru ve kazanımlarla nasıl ilişkilendirilebilir?
`outcomeCode` (örn: `MAT.7.1.3`) ortak anahtar olarak kullanılır. Her infografiğe birincil `outcomeCode` atanır; öğrenci sınavda bu kazanımdan puan kaybettiğinde sistem doğrudan bu koda bağlı infografiği önerir.

#### 12. Web ve PDF çıktılarında görsel kalitesi nasıl korunabilir?
SVG formatı vektörel olduğu için ekranda (Retina ekranlar dahil) ve A4 baskıda (`window.print()`) sonsuz çözünürlükte, pikselleşmeden basılır. Çıkarılan raster görseller için ise 300 DPI eşdeğeri WebP formatı ve `@media print { img { max-width: 100%; image-rendering: -webkit-optimize-contrast; } }` kuralları kullanılır.

#### 13. Görsel dosyaları nerede saklanmalı?
- Üretilen matematiksel SVG'ler: Veritabanında/JSON içinde metin olarak (dosya boyutu sadece 2-4 KB).
- Resmî MEB kırpılmış görselleri: `/public/assets/questions/` dizininde statik varlık olarak.
- Kullanıcıya özel üretilen infografikler: `localStorage` (`oyss_custom_infographics`) içinde.

#### 14. Depolama, API maliyeti ve erişim güvenliği nasıl yönetilmeli?
Vektörel SVG yaklaşımı harici görsel depolama (AWS S3, Cloudinary vb.) gerektirmez. API maliyeti, sadece birkaç token'lık parametre JSON'u istendiği için minimum düzeyde kalır. Hassas API anahtarı Netlify Serverless Function katmanında korunur.

#### 15. Görsel üretilemediğinde mevcut sistem nasıl çalışmaya devam etmeli?
`visual` alanı opsiyonel olduğundan, çizim motoru hata verirse veya görsel alanı boş gelirse bileşen sessizce görseli atlar; soru metni, durum senaryosu ve cevap anahtarı eksiksiz şekilde görüntülenmeye devam eder.

#### 16. Mevcut kaynak bilgileri ve sourceOrigin yapısı nasıl korunmalı?
Soru kökeni (`sourceOrigin`) ile görsel kökeni (`visual.sourceOrigin`) birbirinden bağımsız iki alan olarak tutulur. MEB'in resmî sorusu OYSS tarafından görselleştirilse dahi `sourceOrigin: 'meb_official'` korunur; arayüzde *"Soru: MEB ÖDSGM • Görselleştirme: OYSS"* etiketi gösterilir.

---

## 10. AŞAMALI UYGULAMA PLANI (ROADMAP)

Geliştirmenin güvenle ve sistemi kesintiye uğratmadan yapılabilmesi için 5 aşamalı plan hazırlanmıştır:

### FAZ 1: Veri Modelleri ve SVG Çizim Motorunun Kurulması
- **Etkilenecek Dosyalar:** `src/types/index.ts`, `src/utils/svgMathEngine.ts` (Yeni).
- **İşlemler:** `QuestionVisual` tip tanımları. Sayı doğrusu, kesir çubuğu ve açı modelleri için saf TypeScript SVG üreteçlerinin yazılması.
- **Risk:** Sıfır (Mevcut koda dokunulmaz, sadece tip ve yardımcı fonksiyon eklenir).
- **Test:** SVG çıktılarının matematiksel oranlarının birim testlerle doğrulanması (`tests/svgMathEngine.test.ts`).

### FAZ 2: Hazır Sınavlara Görsel Desteği Eklenmesi (Pilot: 7. Sınıf Matematik)
- **Etkilenecek Dosyalar:** `src/data/sampleExams.ts`, `src/components/ExamPaperView.tsx`, `src/components/InteractivePracticeView.tsx`.
- **İşlemler:** 7. sınıf Matematik Senaryo 1-4 sorularına uygun sayı doğrusu ve termometre SVG'lerinin tanımlanması; `ExamPaperView` ve `InteractivePracticeView` bileşenlerinde görsel render kutusunun eklenmesi.
- **Risk:** Düşük (Görsel alanı koşullu render edildiği için diğer derslerin soruları etkilenmez).
- **Test:** 7. sınıf matematik sınavlarının hem ekranda hem de yazdırma modunda görselle birlikte hatasız render edilmesi.

### FAZ 3: Yapay Zekâ Soru Üretiminde Görsel İhtiyacı Analizi
- **Etkilenecek Dosyalar:** `src/utils/aiGeneratorEngine.ts`, `src/generators/prompts/outputSchema.ts`.
- **İşlemler:** Gemini JSON çıktısına opsiyonel `visualRequirement` parametre bloğunun eklenmesi; gelen parametrelerin yerel SVG motoruna beslenerek `QuestionVisual` nesnesine dönüştürülmesi.
- **Risk:** Orta (Gemini bazen geçersiz parametre dönebilir; bu durumda yerel doğrulayıcı görseli iptal edip metinle devam etmelidir).
- **Test:** Canlı ve yerel fallback motorlarında üretilen soruların görsel doğrulama testleri.

### FAZ 4: İnfografik Modülü Genişletmesi ve Öğrenme Yönlendirmesi
- **Etkilenecek Dosyalar:** `src/components/InfographicView.tsx`, `src/data/infographics.ts`, `src/components/InteractivePracticeView.tsx`, `src/App.tsx`.
- **İşlemler:** 7. sınıf Matematik için rasyonel sayılar infografiklerinin eklenmesi; 3 farklı tasarım şablonunun kodlanması; etkileşimli sınav değerlendirme ekranından ilgili infografiğe geçiş butonunun bağlanması.
- **Risk:** Düşük (Mevcut infografik sekmesi korunur, yeni özellikler kademeli eklenir).
- **Test:** Yanlış yapılan sorudan infografiğe yönlendirme akışı testi.

### FAZ 5: Mobil & PDF İnce Ayarları ve Diğer Derslere Yaygınlaştırma
- **Etkilenecek Dosyalar:** `src/index.css`, `src/utils/materialFileNameGenerator.ts`.
- **İşlemler:** Mobilde SVG duyarlılığı (viewBox, max-width), sayfa sonu taşmalarının `@media print` ile önlenmesi; Fen Bilimleri ve Sosyal Bilgiler için şablonların genişletilmesi.
- **Risk:** Düşük.
- **Test:** 320 px, 375 px, 390 px ve masaüstü cihaz testleri; A4 yazdırma denetimleri.

---

## 11. BAŞARI VE KABUL KRİTERLERİ KONTROL LİSTESİ

- [ ] **Geriye Dönük Uyumluluk:** Görseli olmayan 847 soru ve tüm sınav modülleri hiçbir görsel kırılması olmadan çalışmaya devam etmelidir.
- [ ] **Matematiksel Tutarlılık:** Sayı doğrusu ve grafiklerdeki ölçekler metindeki sayılarla tam eşleşmelidir (örn: $-5/6$, $-3/4$'ün solunda yer almalıdır).
- [ ] **Sıfır Bulanıklık (Vektörel Kalite):** SVG çizimleri yüksek çözünürlüklü mobil ekranlarda ve A4 PDF baskısında pikselleşmemelidir.
- [ ] **Hata Toleransı (Graceful Degradation):** Görsel motoru arızalansa dahi sınav ve soru üretimi çökmeyecek, metinle devam edecektir.
- [ ] **Kazanım Bağlantısı:** Öğrenci bir soruyu yanlış yaptığında ilgili kazanımın infografik püf noktalarına tek tıkla ulaşabilmelidir.
- [ ] **Kaynak Ayrımı Şeffaflığı:** MEB resmî sorularındaki OYSS çizimleri "MEB sorusu, OYSS destekleyici çizimi" olarak açıkça etiketlenmelidir.
- [ ] **Mevcut 25 Test Süiti ve Build:** Tüm birim testler (`tests/*.test.ts`) ve `npm run build` sıfır hata ile geçmelidir.

---

## 12. İLK UYGULANMASI ÖNERİLEN KOD DEĞİŞİKLİĞİ

Onayınız sonrasında uygulamaya başlanacak ilk ve en güvenli somut adım:
1. `src/types/index.ts` dosyasına geriye dönük uyumlu `QuestionVisual` ve ilgili görsel tiplerinin tanımlanması.
2. `src/utils/svgMathEngine.ts` adında hiçbir dış bağımlılığı olmayan, saf matematiksel SVG üreteci modülünün oluşturulması ve 7. sınıf rasyonel sayı doğrusu fonksiyonunun yazılması.
3. Bu motora ait `tests/svgMathEngine.test.ts` birim testinin yazılarak matematiksel doğruluğun tescil edilmesi.

---

*Bu rapor bir mimari analiz ve tasarım dokümanıdır. Talimatınız uyarınca projede hiçbir kod değişikliği, paket kurulumu, git commit, push veya Netlify deploy işlemi yapılmamıştır.*

