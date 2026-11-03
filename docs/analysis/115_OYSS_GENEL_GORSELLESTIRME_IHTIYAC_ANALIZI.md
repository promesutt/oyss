# OYSS Görev 115: Genel Soru Havuzu Görselleştirme İhtiyaç Analizi Raporu

**Rapor Numarası:** 115  
**Tarih:** 03 Kasım 2026  
**Çalışma Türü:** Kapsamlı Soru Havuzu Analizi, Motor Boşluk Tespiti ve Mimari Yol Haritası  
**İncelenen Kapsam:** 951 Soru (852 `sampleExams` + 99 `fallbackPools`)  
**Kısıtlar:** Salt Okunur Analiz; sıfır kod/veri değişikliği, sıfır Git işlemi

---

## 1. Yönetici Özeti

Bu çalışma, OYSS projesindeki 951 sorunun tamamını (852 hazır sınav sorusu ve 99 yedek havuz sorusu) pedagojik ölçme ilkeleri, ders kazanımları ve görselleştirme gereksinimleri açısından tek tek incelemiştir.

Amacımız sorulara yüzeysel veya dekoratif resimler eklemek değil; **öğrencinin soruyu çözmesi için zorunlu olan** veya **öğrenme değerini ve zihinsel modellemeyi belirgin biçimde artıran** vektörel (SVG) matematiksel ve bilimsel çizim ihtiyaçlarını tespit etmektir.

### Temel Analiz Bulguları

| Gösterge | Sayı | Oran | Açıklama |
| :--- | :---: | :---: | :--- |
| **Toplam İncelenen Soru** | **951** | **%100.0** | 852 Örnek Sınav + 99 Fallback Havuzu Sorusu |
| **Salt Metin (`text_only`)** | **659** | **%69.3** | Paragraf, dilbilgisi, ayet/hadis, kavramsal tanım ve sözel akıl yürütme |
| **Yeni Motor Boşluğu (`visual_engine_gap`)** | **184** | **%19.3** | Görsel soru için zorunludur ancak mevcut motorlarla üretilemez |
| **Görsel Tavsiye Edilen (`visual_recommended`)** | **96** | **%10.1** | Görsel soruyu zenginleştirir, somutlaştırır ve pedagojik kaliteyi artırır |
| **Görsel Zorunlu & Mevcut Motorlu (`visual_required`)** | **12** | **%1.3** | Sayı doğrusu veya kesir şeridi ile tam karşılanan sorular (Pilot dahil) |
| **Mevcut Motorlarla Karşılanabilen Soru Sayısı** | **23** | **%2.4** | Sayı doğrusu (`svgMathEngine`) ve kesir modelleri (`fractionMathEngine`) |
| **Yeni Motor Gerektiren Toplam Soru Sayısı** | **269** | **%28.3** | 184 motor boşluğu + 85 yeni motor tavsiyeli soru |

---

## 2. Dörtlü Görsel İhtiyaç Sınıflandırması Dağılımı

Tüm 951 soru, çift sayım olmaksızın birbirini dışlayan 4 temel kategoriye yerleştirilmiştir:

```text
                     TOPLAM SORU HAVUZU (951 Soru)
┌───────────────────────────────────────────────┬───────────────────────────────┐
│              SALT METİN SORULARI              │       GÖRSEL DESTEKLİ         │
│               659 Soru (%69.3)                │       292 Soru (%30.7)        │
└───────────────────────────────────────────────┴───────────────┬───────────────┘
                                                                │
                 ┌──────────────────────────────────────────────┴──────────────────────────────┐
                 │                                                                             │
    ┌────────────┴────────────┐                                                   ┌────────────┴────────────┐
    │     MEVCUT MOTORLAR     │                                                   │       YENİ MOTORLAR     │
    │     23 Soru (%2.4)      │                                                   │      269 Soru (%28.3)   │
    ├─────────────────────────┤                                                   ├─────────────────────────┤
    │ • visual_required:   12 │                                                   │ • visual_engine_gap: 184│
    │ • visual_recommended: 11│                                                   │ • visual_recommended: 85│
    └─────────────────────────┘                                                   └─────────────────────────┘
```

1. **`text_only` (659 Soru - %69.3):**  
   Paragrafta anlam, şiir çözümleme, sözcükte anlam, deyim/atasözü, dilbilgisi kuralları (fiilimsiler, cümlenin ögeleri, yazım/noktalama), din kültürü inanç/ahlak yorumları ve sosyal bilgiler vatandaşlık metinleri. Bu sorulara görsel eklemek pedagojik olarak gereksizdir ve dikkat dağıtıcıdır.
2. **`visual_engine_gap` (184 Soru - %19.3):**  
   Metninde "Şekildeki", "Verilen modelde", "Grafiğe göre", "Devredeki", "Aşağıdaki haritada" gibi açık görsel referansları bulunan veya geometrik/şematik çizim olmadan sorunun kurgusunun eksik kaldığı sorular. Mevcut altyapı bu çizimleri henüz desteklememektedir.
3. **`visual_recommended` (96 Soru - %10.1):**  
   Görsel olmadan da çözülebilen ancak bir veri tablosu, şerit model, zaman şeridi veya akış şeması eklendiğinde öğrencinin soruyu kavramasını ve kalıcılığını katbekat artıran sorular.
4. **`visual_required` (12 Soru - %1.3):**  
   Sayı doğrusu ve kesir modellerine doğrudan ihtiyaç duyan ve mevcut `svgMathEngine` ile `fractionMathEngine` motorlarımızla hemen üretilebilen sorular (7. sınıf Mert-Ece pilot sorusu dahil).

---

## 3. Sınıf ve Ders Bazında İhtiyaç Matrisi

### 3.1. Ders Bazında Görsel İhtiyaç Dağılımı

| Ders | Toplam Soru | `text_only` | `visual_engine_gap` | `visual_recommended` | `visual_required` | Görsel İhtiyaç Oranı |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Matematik** | 157 | 76 | **58** | 11 | **12** | **%51.6** |
| **Fen Bilimleri** | 160 | 44 | **112** | 4 | 0 | **%72.5** |
| **Sosyal Bilgiler** | 160 | 129 | **14** | 17 | 0 | **%19.4** |
| **İngilizce** | 126 | 83 | 0 | **43** | 0 | **%34.1** |
| **Türkçe** | 202 | 190 | 0 | **12** | 0 | **%5.9** |
| **Din Kültürü** | 146 | 137 | 0 | **9** | 0 | **%6.2** |
| **GENEL TOPLAM** | **951** | **659** | **184** | **96** | **12** | **%30.7** |

### 3.2. Sınıf Seviyesi Bazında Görsel İhtiyaç Dağılımı

| Sınıf Seviyesi | Toplam Soru | `text_only` | `visual_engine_gap` | `visual_recommended` | `visual_required` | Toplam Görsel İhtiyacı |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **5. Sınıf** | 207 | 138 | 48 | 18 | 3 | **69 Soru (%33.3)** |
| **6. Sınıf** | 195 | 106 | 50 | 39 | 0 | **89 Soru (%45.6)** |
| **7. Sınıf** | 280 | 182 | 54 | 36 | 8 | **98 Soru (%35.0)** |
| **8. Sınıf** | 269 | 233 | 32 | 3 | 1 | **36 Soru (%13.4)** |
| **TOPLAM** | **951** | **659** | **184** | **96** | **12** | **292 Soru (%30.7)** |

---

## 4. Görsel Türleri ve Motor Haritası

951 soru içerisindeki 292 görsel ihtiyacının türlere ve motorlara göre dökümü:

| Görsel Türü | Soru Sayısı | İlgili Dersler | Mevcut Motor Durumu | Hedef Motor |
| :--- | :---: | :--- | :---: | :--- |
| **Geometri Şekilleri (`geometry_shape`)** | **58** | Matematik (5, 6, 7, 8) | ❌ Yok (Boşluk) | `svgGeometryEngine` |
| **Veri ve İstatistik Grafikleri (`data_chart`)** | **52** | Matematik, Fen, Sosyal, İngilizce | ❌ Yok (Boşluk) | `svgChartEngine` |
| **Fen Mekanik ve Kuvvet (`science_mechanics`)** | **44** | Fen Bilimleri (5, 6, 7, 8) | ❌ Yok (Boşluk) | `svgMechanicsEngine` |
| **Astronomi ve Ay Evreleri (`astronomy_phases`)** | **40** | Fen Bilimleri (5, 6, 7) | ❌ Yok (Boşluk) | `svgAstronomyEngine` |
| **Kavram ve Akış Şeması (`concept_flowchart`)** | **21** | Türkçe, Sosyal, Din Kültürü | ❌ Yok (Tavsiye) | `svgDiagramEngine` |
| **Biyoloji ve Hücre Şemaları (`biology_diagram`)** | **21** | Fen Bilimleri (6, 7, 8) | ❌ Yok (Boşluk) | `svgBiologyEngine` |
| **Kesir Modelleri (`fraction_bar`)** | **15** | Matematik (5, 6, 7) |  **VAR (Hazır)** | `fractionMathEngine` |
| **Harita ve Coğrafi Kroki (`social_map`)** | **14** | Sosyal Bilgiler (5, 6, 7, 8) | ❌ Yok (Boşluk) | `svgMapEngine` |
| **Zaman Çizelgesi (`timeline_chart`)** | **12** | Sosyal Bilgiler (6, 7, 8) | ❌ Yok (Tavsiye) | `svgTimelineEngine` |
| **Sayı Doğrusu (`number_line`)** | **8** | Matematik (6, 7, 8) |  **VAR (Hazır)** | `svgMathEngine` |
| **Elektrik Devreleri (`electric_circuit`)** | **4** | Fen Bilimleri (5, 7) | ❌ Yok (Boşluk) | `svgCircuitEngine` |
| **Optik ve Işık Işınları (`science_optics`)** | **3** | Fen Bilimleri (5, 7) | ❌ Yok (Boşluk) | `svgOpticsEngine` |
| **Salt Metin (`none`)** | **659** | Tüm Dersler | - | - |
| **GENEL TOPLAM** | **951** | - | - | - |

---

## 5. Mevcut Altyapı Değerlendirmesi

### 5.1. Güçlü Yönler (Hazır Bileşenler)
1. **Deterministik SVG Mimarisi:**  
   `svgMathEngine.ts` ve `fractionMathEngine.ts`, tarayıcı bağımsız, üçüncü parti kütüphanesiz, salt matematiksel BigInt ve SVG dize şablonlarıyla güvenli vektörel çizim üretmektedir.
2. **Erişilebilirlik ve Responsive Sunum:**  
   `QuestionVisualView.tsx`, mobil taşma koruması (`overflow-x-auto`, `min-w-[440px]`), ekran okuyucu uyumluluğu (`<figure>`, `<figcaption>`, `aria-label`) ve SSR desteğiyle canlı ortamda doğrulanmıştır.
3. **Anlamsal Doğrulama ve Fallback Koruması:**  
   Hatalı veya eksik veri geldiğinde ekran çökmemekte; açıklayıcı SVG uyarı paneli render edilmektedir.

### 5.2. Altyapı Sınırları ve Boşluklar
1. **Desteklenmeyen Tipler:**  
   `QuestionVisual` tipinde tanımlı olan `geometry_shape`, `coordinate` ve `data_chart` tipleri `renderQuestionVisual` dispatcher'ında henüz ele alınmamakta, doğrudan `"Desteklenmeyen görsel türü"` hatası vermektedir.
2. **Fen ve Sosyal Tiplerinin Eksikliği:**  
   Elektrik devresi, mekanik düzenekler, Ay evreleri ve haritalar için tip sisteminde henüz `QuestionVisual` türevi tanımlanmamıştır.
3. **AI Üretim Hattı İzolasyonu:**  
   `aiGeneratorEngine.ts` ve prompt şeması (`src/generators/prompts/outputSchema.ts`) şu anda soru üretirken görsel parametresi istememekte ve görsel nesnesi taşımamaktadır.

---

## 6. En Yüksek Öncelikli 5 Yeni Görsel Motoru

Projedeki soru sayısı, birden fazla derse hizmet edebilirlik ve pedagojik etki kriterlerine göre önceliklendirilen motorlar:

### 🥇 1. Öncelik: Vektörel Geometri Motoru (`svgGeometryEngine`)
- **Hitap Ettiği Soru Sayısı:** **58 Soru**
- **Kapsam:** 5-8. sınıf Matematik (Açılar, doğru parçaları, dikmeler, üçgenler, paralelkenar, yamuk, çember ve prizmalar).
- **Gerekçe:** Havuzdaki en büyük tekil görsel açığıdır. "Numaralandırılmış modeller", "açı çeşitleri", "üçgenin alanı" soruları görsel olmadan öğrenci için çözülemez durumdadır.
- **Tasarım İlkesi:** SVG `<polygon>`, `<circle>`, `<path>` ve açı yayları (`<path d="M... A...">`).

### 🥈 2. Öncelik: Evrensel Veri ve Grafik Motoru (`svgChartEngine`)
- **Hitap Ettiği Soru Sayısı:** **52 Soru**
- **Kapsam:** Matematik (Sütun ve daire grafiği), Fen (Sıcaklık/zaman deney eğrisi), Sosyal (Nüfus piramidi), İngilizce (Program çizelgesi).
- **Gerekçe:** **4 branşta birden** ortak kullanılabilen en yüksek sinerjiye sahip motordur.
- **Tasarım İlkesi:** Çubuklar (`<rect>`), daire dilimleri (`<path d="M center L... A... Z">`) ve eksen etiketleri.

### 🥉 3. Öncelik: Fen Mekanik ve Kuvvet Motoru (`svgMechanicsEngine`)
- **Hitap Ettiği Soru Sayısı:** **44 Soru**
- **Kapsam:** Fen Bilimleri (5. sınıf dinamometre, 6. sınıf bileşke kuvvet vektörleri, 7. sınıf kütle/ağırlık, 8. sınıf makara, kaldıraç, eğik düzlem ve basınç).
- **Gerekçe:** Fen müfredatının omurgasını oluşturan kuvvet ve hareket konularının somutlaştırılması için zorunludur.

### 4. Öncelik: Astronomi ve Uzamsal Modeller Motoru (`svgAstronomyEngine`)
- **Hitap Ettiği Soru Sayısı:** **40 Soru**
- **Kapsam:** 5, 6 ve 7. sınıf Fen Bilimleri (Ay'ın 8 evresi, Güneş/Ay tutulmaları, gök cismi dizilimleri, mevsim şeması).
- **Gerekçe:** 5. ve 6. sınıf fen sorularının üçte birini oluşturan astronomi ünitesinin görsel standardını tamamlar.

### 5. Öncelik: Süreç, Akış ve Biyoloji Şemaları Motoru (`svgDiagramEngine`)
- **Hitap Ettiği Soru Sayısı:** **42 Soru** (21 Akış şeması + 21 Biyoloji/Hücre)
- **Kapsam:** Türkçe (Metin akışı, neden-sonuç), Fen (Hücre organelleri, mitoz/mayoz, besin zinciri), Sosyal (Zaman şeridi), Din (İbadet basamakları).
- **Gerekçe:** Hiyerarşik kutular, bağlantı okları ve döngüsel süreçleri tüm sözel ve fen dersleri için tek çatı altında çözer.

---

## 7. AI Soru Üretim Süreci İçin Görsel Entegrasyon Mimarisi

Yapay zekâ (Gemini) tarafından üretilecek yeni sorularda görsel modellerin nasıl üretileceğine dair önerilen üç katmanlı mimari:

```text
[ Gemini API Prompt Motoru ]
           │
           │  1. Soru metniyle birlikte deterministik JSON parametreleri üretilir:
           │     { type: "number_line", params: { min: -3, max: 3, points: [...] } }
           ▼
[ Yerel Doğrulama Katmanı (TypeScript Engine) ]
           │
           │  2. Gelen parametreler yerel matematiksel kural motorundan geçirilir:
           │     - Sayı güvenliği (Number.isSafeInteger)
           │     - Sıralama ve çakışma kontrolü
           │     - min < max ve payda > 0 denetimi
           ▼
[ Deterministik SVG Render & UI ]
           │
           ├── Doğrulandıysa ──> %100 Güvenli Vektörel SVG Çıktısı (<QuestionVisualView />)
           └── Hatalıysa      ──> Güvenli Fallback Uyarı Kutusu (Uygulama çökmez)
```

> [!IMPORTANT]
> Gemini modeline kesinlikle serbest SVG dizesi (`<svg>...</svg>`) **yazdırılmamalıdır**. LLM'lerin serbest SVG üretiminde koordinat kayması, CSS taşması, XSS riski ve baskı uyumsuzluğu kaçınılmazdır. Modelden yalnızca **katı JSON veri parametreleri** alınmalı; SVG çizimi OYSS'nin yerel matematik motorları tarafından üretilmelidir.

---

## 8. Soru Havuzundan Temsili Analiz Kayıtları (Örnek Döküm)

| Soru ID | Sınıf | Ders | Konu / Kazanım | Görsel İhtiyaç Sınıfı | Önerilen Görsel Türü | Mevcut Motor? | Gerekçe |
| :--- | :---: | :---: | :--- | :---: | :---: | :---: | :--- |
| `exam_7_matematik_1_1_senaryo_1_q4` | 7 | Mat | Rasyonel Sayıları Sayı Doğrusunda Gösterme | `visual_required` | `number_line` |  **Evet** | Mert ve Ece'nin rasyonel sayı konumları doğrudan SVG sayı doğrusu üzerinden ölçülmektedir (Pilot aktif). |
| `exam_5_matematik_1_1_senaryo_1_q1` | 5 | Mat | Doğru, Doğru Parçası ve Işın Modelleri | `visual_engine_gap` | `geometry_shape` | ❌ Hayır | Soru "Numaralandırılmış modellerin hangi temel kavramı temsil ettiğini" sormaktadır; şekil olmadan soru eksiktir. |
| `exam_5_matematik_1_1_senaryo_1_q3` | 5 | Mat | Açı Çeşitleri ve Gösterimi | `visual_engine_gap` | `geometry_shape` | ❌ Hayır | K, L, M, N açılarının dar, dik, geniş veya doğru açı olduğunu belirlemek için açı yay çizimi zorunludur. |
| `exam_5_fen_bilimleri_1_1_senaryo_1_q3` | 5 | Fen | Ay'ın Evreleri ve Periyotları | `visual_engine_gap` | `astronomy_phases` | ❌ Hayır | Ay'ın 4 ana evresinin gökyüzündeki aydınlanma şekillerini göstermek öğrencinin kavramasını doğrudan güçlendirir. |
| `exam_6_fen_bilimleri_1_1_senaryo_1_q1` | 6 | Fen | Güneş ve Ay Tutulmaları | `visual_engine_gap` | `astronomy_phases` | ❌ Hayır | Güneş, Dünya ve Ay'ın uzaydaki sıralanışı ve tam gölge konisi şematik çizim gerektirir. |
| `exam_7_fen_bilimleri_1_1_senaryo_1_q6` | 7 | Fen | Elektrik Devresi Seri/Paralel Bağlama | `visual_engine_gap` | `electric_circuit` | ❌ Hayır | Ampul parlaklığını karşılaştırmak için anahtar ve pil bağlantı şeması zorunludur. |
| `exam_8_matematik_1_1_senaryo_1_q6` | 8 | Mat | Doğrusal Denklemler ve Eğim | `visual_engine_gap` | `coordinate_system` | ❌ Hayır | Doğrunun eğimini ve eksenleri kestiği noktaları göstermek için kartezyen koordinat sistemi gereklidir. |
| `exam_5_sosyal_bilgiler_1_1_senaryo_1_q4` | 5 | Sos | Harita Lejantı ve Yeryüzü Şekilleri | `visual_engine_gap` | `social_map` | ❌ Hayır | Fiziki harita üzerindeki yükselti renk basamaklarını ve sembolleri okumak için harita çizimi zorunludur. |
| `fallback_matematik_7_MAT_7_1_1_21` | 7 | Mat | Tam Sayılarla Toplama ve Çıkarma | `visual_recommended` | `number_line` |  **Evet** | Sayı doğrusu üzerinde sağa/sola yönlü adımların modellenmesi negatif tam sayı işlemlerini somutlaştırır. |
| `fallback_turkce_5_T_O_5_20_41` | 5 | Tr | Metinden Hareketle Söz Varlığını Geliştirme | `text_only` | `none` | - | Metin bağlamından kelime anlamı çıkarma sorusudur; görsel gereksizdir. |
| `exam_7_turkce_1_1_senaryo_1_q1` | 7 | Tr | Deyimler ve Atasözleri Yorumu | `text_only` | `none` | - | Saf dilsel anlama ve yorum sorusudur; dekoratif resim eklenmemelidir. |
| `exam_8_din_kulturu_1_1_senaryo_1_q1` | 8 | Din | Kader ve Kaza İnancı | `text_only` | `none` | - | Ayet meali üzerinden evrensel yasaların irdelenmesidir; görsel katkı sağlamaz. |

---

## 9. Önerilen Geliştirme Sıralaması ve Test Stratejisi

### Geliştirme Yol Haritası (Fazlar)
1. **Faz 1 (Mevcut Motor Yaygınlaştırması):**  
   Mevcut `svgMathEngine` ve `fractionMathEngine` kullanılarak sayı doğrusu ve kesir gerektiren **23 sorunun** tamamına `QuestionVisual` tanımları işlenir.
2. **Faz 2 (Geometri Motoru):**  
   `svgGeometryEngine` geliştirilir; açı, üçgen, dikme ve çokgen modelleri eklenerek **58 matematik sorusu** görselleştirilir.
3. **Faz 3 (Veri ve İstatistik Grafikleri Motoru):**  
   `svgChartEngine` geliştirilir; sütun, daire ve çizgi grafikleri ile **52 soru** (4 farklı branş) görselleştirilir.
4. **Faz 4 (Fen Mekanik ve Astronomi Motorları):**  
   `svgMechanicsEngine` ve `svgAstronomyEngine` geliştirilir; **84 fen sorusu** çözüme kavuşturulur.
5. **Faz 5 (AI Entegrasyonu):**  
   Gemini prompt şemasına `QuestionVisual` parametreleri entegre edilir; anlık üretilen sorularda deterministik görsel desteği devreye alınır.

### Test Stratejisi
- **Katı Matematiksel Birim Testleri:** Her yeni motor için en az 20 birim testi (BigInt koordinat doğruluğu, çakışma önleme, XML escape ve sınır değer testleri).
- **SSR ve React Entegrasyon Testleri:** `QuestionVisualView` bileşeni üzerinden SSR render, responsive taşma ve figcaption doğrulamaları.
- **Regresyon Koruması:** Projedeki mevcut 398 testin tamamının her motor eklemesinde %100 yeşil kalması şartı.

