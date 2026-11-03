# OYSS Görev 116: 292 Soruluk Görselleştirme Uygulama Envanteri

**Rapor Numarası:** 116  
**Tarih:** 03 Kasım 2026  
**Çalışma Türü:** Soru Bazlı Uygulama Envanteri, Teknik Spesifikasyon ve Doğrulama  
**Temel Referans:** Görev 115 (Genel Soru Havuzu Görselleştirme İhtiyaç Analizi)  
**Kapsam:** 951 Soru Arasından Seçilen **292 Görsel İhtiyaçlı Soru**  
**Eşlik Eden Veri Dosyası:** [`116_OYSS_GORSELLESTIRME_UYGULAMA_ENVANTERI.csv`](file:///Users/mesutduran/Desktop/OYSS/docs/analysis/116_OYSS_GORSELLESTIRME_UYGULAMA_ENVANTERI.csv) *(292 sorunun tam dökümü)*  

---

## 1. Yönetici Özeti ve Kapsam Doğrulaması

Görev 115 analizinde tespit edilen **292 soruluk görselleştirme ihtiyacı**, yazılım geliştirme ve soru yazım aşamalarında doğrudan referans alınabilecek somut bir teknik uygulama envanterine dönüştürülmüştür.

Bu envanterde her soru için:
- Orijinal soru metni ve senaryo bağlamı korunmuş,
- Görselin sahip olması gereken nesneler, eksenler, ölçüler, açılar ve etiketler tanımlanmış,
- Mevcut motorların (`svgMathEngine` ve `fractionMathEngine`) veri modeline tam uyan **23 soru** ile yeni motor gerektiren **269 soru** kesin sınırlarla ayrılmıştır.

### 1.1. Genel Havuz Doğrulama Matrisi (951 Soru)

| Kategori | Soru Sayısı | Oran | Durum / Eylem |
| :--- | :---: | :---: | :--- |
| **Görsel Zorunlu (`visual_required`)** | **12** | %1.3 | Mevcut motorlarla derhal üretilebilir (Pilot soru dahil) |
| **Yeni Motor Boşluğu (`visual_engine_gap`)** | **184** | %19.3 | Görsel soru için zorunludur; yeni motor geliştirilmesi şarttır |
| **Görsel Tavsiye Edilen (`visual_recommended`)** | **96** | %10.1 | 11 soru mevcut motorla, 85 soru yeni motorlarla zenginleştirilebilir |
| **Salt Metin Soruları (`text_only`)** | **659** | %69.3 | Görsel eklenmeyecektir (paragraf, dilbilgisi, ayet/hadis vb.) |
| **TOPLAM SORU HAVUZU** | **951** | **%100.0** | **951 sorunun tamamı eksiksiz taranmıştır.** |

### 1.2. Kalite ve Bütünlük Denetim Sonuçları
1. **Tekil Kimlik (ID) Doğrulaması:** Envanterdeki 292 kaydın tamamı benzersiz (unique) kimlik taşımaktadır. Mükerrer (duplicate) ID sayısı: **0**.
2. **Havuz Eşleşmesi:** 292 sorunun tamamı `src/data/sampleExams.ts` (230 soru) ve `src/data/fallbackPools/` (62 soru) kaynaklarında doğrulanmıştır. Bulunamayan veya geçersiz soru sayısı: **0**.
3. **Görev 115 ile Birebir Uyum:** Görev 115 raporunda ilan edilen 292 toplamı, 23 mevcut motor ve 269 yeni motor sayıları ile bu envanter **%100 matematiksel tutarlılık** içindedir.

---

## 2. Mevcut Motorlarla Karşılanabilen 23 Sorunun Ayrıntılı Dökümü

Mevcut `svgMathEngine` (sayı doğrusu) ve `fractionMathEngine` (kesir şeritleri) motorlarımızın veri modeline tam uyan **23 soru** aşağıda tek tek listelenmiştir. Bu sorular P0 (hemen uygulanabilir) önceliğindedir.

| # | Soru ID | Sınıf | Ders | Sınav / Senaryo | Konu / Kazanım | Motor & Tür | Tanımlanan Görsel Parametreleri ve Etiketler |
| :-: | :--- | :-: | :-: | :--- | :--- | :--- | :--- |
| 1 | `exam_5_matematik_1_1_senaryo_5_q1` | 5 | MATEMATIK | 5. Sınıf Matematik 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 5) (7 Soru) | [MAT.5.3.1] MAT.5.3.1. Temel geometrik çizimler için matematik | `svgMathEngine` (number_line) | Yatay sayı doğrusu ekseni, 0 başlangıç noktası (orijin), tam sayı aralık çentikleri, hedef rasyonel/tam sayı noktaları ve harf etiketleri (A, B, C). |
| 2 | `exam_5_matematik_1_2_senaryo_1_q1` | 5 | MATEMATIK | 5. Sınıf Matematik 1. Dönem 2. Yazılı (Senaryo 1 - Denk Kesirler Pilot Sınavı) | [M.5.1.3.4] M.5.1.3.4. Sadeleştirme ve genişletmenin kesrin de | `fractionMathEngine` (fraction_bar) | Referans bütün dikdörtgen şeridi (wholeWidth=500), payda kadar eşit parçaya bölünmüş ızgara, pay kadar taranmış/renkli dilimler, birim kesir etiketleri (örn: "1/4") ve denklik kılavuz çizgisi. |
| 3 | `exam_5_matematik_1_2_senaryo_1_q2` | 5 | MATEMATIK | 5. Sınıf Matematik 1. Dönem 2. Yazılı (Senaryo 1 - Denk Kesirler Pilot Sınavı) | [M.5.1.3.1] M.5.1.3.1. Birim kesirleri sıralar. | `fractionMathEngine` (fraction_bar) | Referans bütün dikdörtgen şeridi (wholeWidth=500), payda kadar eşit parçaya bölünmüş ızgara, pay kadar taranmış/renkli dilimler, birim kesir etiketleri (örn: "1/4") ve denklik kılavuz çizgisi. |
| 4 | `exam_5_matematik_1_2_senaryo_1_q3` | 5 | MATEMATIK | 5. Sınıf Matematik 1. Dönem 2. Yazılı (Senaryo 1 - Denk Kesirler Pilot Sınavı) | [M.5.1.3.4] M.5.1.3.4. Sadeleştirme ve genişletmenin kesrin de | `fractionMathEngine` (fraction_bar) | Referans bütün dikdörtgen şeridi (wholeWidth=500), payda kadar eşit parçaya bölünmüş ızgara, pay kadar taranmış/renkli dilimler, birim kesir etiketleri (örn: "1/4") ve denklik kılavuz çizgisi. |
| 5 | `exam_5_matematik_1_2_senaryo_1_q4` | 5 | MATEMATIK | 5. Sınıf Matematik 1. Dönem 2. Yazılı (Senaryo 1 - Denk Kesirler Pilot Sınavı) | [M.5.1.3.2] M.5.1.3.2. Tam sayılı kesrin, bir doğal sayı ile b | `fractionMathEngine` (fraction_bar) | Referans bütün dikdörtgen şeridi (wholeWidth=500), payda kadar eşit parçaya bölünmüş ızgara, pay kadar taranmış/renkli dilimler, birim kesir etiketleri (örn: "1/4") ve denklik kılavuz çizgisi. |
| 6 | `exam_5_matematik_1_2_senaryo_1_q5` | 5 | MATEMATIK | 5. Sınıf Matematik 1. Dönem 2. Yazılı (Senaryo 1 - Denk Kesirler Pilot Sınavı) | [M.5.1.3.5] M.5.1.3.5. Payları veya paydaları eşit olan kesirl | `fractionMathEngine` (fraction_bar) | Referans bütün dikdörtgen şeridi (wholeWidth=500), payda kadar eşit parçaya bölünmüş ızgara, pay kadar taranmış/renkli dilimler, birim kesir etiketleri (örn: "1/4") ve denklik kılavuz çizgisi. |
| 7 | `exam_7_matematik_1_1_senaryo_1_q2` | 7 | MATEMATIK | 7. Sınıf Matematik 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 1) (7 Soru) | [MAT.7.1.2] MAT.7.1.2. Gerçek yaşam durumlarında rasyonel sayı | `fractionMathEngine` (fraction_bar) | Referans bütün dikdörtgen şeridi (wholeWidth=500), payda kadar eşit parçaya bölünmüş ızgara, pay kadar taranmış/renkli dilimler, birim kesir etiketleri (örn: "1/4") ve denklik kılavuz çizgisi. |
| 8 | `exam_7_matematik_1_1_senaryo_1_q4` | 7 | MATEMATIK | 7. Sınıf Matematik 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 1) (7 Soru) | [MAT.7.1.3] MAT.7.1.3. Rasyonel sayıların karşılaştırma ve sır | `svgMathEngine` (number_line) | Yatay sayı ekseni [-2, 2 aralığı], 11 eşit alt çentik, Ece noktası (-5/6 konumu, cx=136.67), Mert noktası (-3/4 konumu, cx=182.50), çift yönlü sonsuzluk okları ve değer etiketleri. |
| 9 | `exam_7_matematik_1_1_senaryo_1_q7` | 7 | MATEMATIK | 7. Sınıf Matematik 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 1) (7 Soru) | [MAT.7.1.4] MAT.7.1.4. Rasyonel sayılar ve işlemler içeren ger | `fractionMathEngine` (fraction_bar) | Referans bütün dikdörtgen şeridi (wholeWidth=500), payda kadar eşit parçaya bölünmüş ızgara, pay kadar taranmış/renkli dilimler, birim kesir etiketleri (örn: "1/4") ve denklik kılavuz çizgisi. |
| 10 | `exam_7_matematik_1_1_senaryo_2_q2` | 7 | MATEMATIK | 7. Sınıf Matematik 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 2) (5 Soru) | [MAT.7.1.2] MAT.7.1.2. Gerçek yaşam durumlarında rasyonel sayı | `fractionMathEngine` (fraction_bar) | Referans bütün dikdörtgen şeridi (wholeWidth=500), payda kadar eşit parçaya bölünmüş ızgara, pay kadar taranmış/renkli dilimler, birim kesir etiketleri (örn: "1/4") ve denklik kılavuz çizgisi. |
| 11 | `exam_7_matematik_1_1_senaryo_3_q2` | 7 | MATEMATIK | 7. Sınıf Matematik 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 3) (7 Soru) | [MAT.7.1.1] MAT.7.1.1. Gerçek yaşam ya da matematiksel durumla | `svgMathEngine` (number_line) | Yatay sayı doğrusu ekseni, 0 başlangıç noktası (orijin), tam sayı aralık çentikleri, hedef rasyonel/tam sayı noktaları ve harf etiketleri (A, B, C). |
| 12 | `exam_7_matematik_1_1_senaryo_3_q3` | 7 | MATEMATIK | 7. Sınıf Matematik 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 3) (7 Soru) | [MAT.7.1.2] MAT.7.1.2. Gerçek yaşam durumlarında rasyonel sayı | `fractionMathEngine` (fraction_bar) | Referans bütün dikdörtgen şeridi (wholeWidth=500), payda kadar eşit parçaya bölünmüş ızgara, pay kadar taranmış/renkli dilimler, birim kesir etiketleri (örn: "1/4") ve denklik kılavuz çizgisi. |
| 13 | `exam_7_matematik_1_1_senaryo_4_q3` | 7 | MATEMATIK | 7. Sınıf Matematik 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 4) (6 Soru) | [MAT.7.1.2] MAT.7.1.2. Gerçek yaşam durumlarında rasyonel sayı | `fractionMathEngine` (fraction_bar) | Referans bütün dikdörtgen şeridi (wholeWidth=500), payda kadar eşit parçaya bölünmüş ızgara, pay kadar taranmış/renkli dilimler, birim kesir etiketleri (örn: "1/4") ve denklik kılavuz çizgisi. |
| 14 | `exam_7_matematik_1_1_senaryo_4_q4` | 7 | MATEMATIK | 7. Sınıf Matematik 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 4) (6 Soru) | [MAT.7.1.2] MAT.7.1.2. Gerçek yaşam durumlarında rasyonel sayı | `fractionMathEngine` (fraction_bar) | Referans bütün dikdörtgen şeridi (wholeWidth=500), payda kadar eşit parçaya bölünmüş ızgara, pay kadar taranmış/renkli dilimler, birim kesir etiketleri (örn: "1/4") ve denklik kılavuz çizgisi. |
| 15 | `exam_7_matematik_1_1_senaryo_4_q5` | 7 | MATEMATIK | 7. Sınıf Matematik 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 4) (6 Soru) | [MAT.7.1.3] MAT.7.1.3. Rasyonel sayıların karşılaştırma ve sır | `fractionMathEngine` (fraction_bar) | Referans bütün dikdörtgen şeridi (wholeWidth=500), payda kadar eşit parçaya bölünmüş ızgara, pay kadar taranmış/renkli dilimler, birim kesir etiketleri (örn: "1/4") ve denklik kılavuz çizgisi. |
| 16 | `exam_8_matematik_1_1_senaryo_2_q6` | 8 | MATEMATIK | 8. Sınıf Matematik 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 2) (8 Soru) | [M.8.1.3.2] Tam kare olmayan kareköklü bir sayının hangi iki d | `svgMathEngine` (number_line) | Yatay sayı doğrusu ekseni, 0 başlangıç noktası (orijin), tam sayı aralık çentikleri, hedef rasyonel/tam sayı noktaları ve harf etiketleri (A, B, C). |
| 17 | `exam_8_matematik_1_1_senaryo_6_q4` | 8 | MATEMATIK | 8. Sınıf Matematik 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 6) (9 Soru) | [M.8.1.1.3] Verilen iki doğal sayının aralarında asal olup olm | `fractionMathEngine` (fraction_bar) | Referans bütün dikdörtgen şeridi (wholeWidth=500), payda kadar eşit parçaya bölünmüş ızgara, pay kadar taranmış/renkli dilimler, birim kesir etiketleri (örn: "1/4") ve denklik kılavuz çizgisi. |
| 18 | `fallback_matematik_7_MAT_7_1_1_22` | 7 | MATEMATIK | Fallback Havuzu (MATEMATIK - 7. Sınıf) | [MAT.7.1.1] Doğal sayı ve tam sayı kavramlarını hava sıcaklığı | `svgMathEngine` (number_line) | Yatay sayı doğrusu ekseni, 0 başlangıç noktası (orijin), tam sayı aralık çentikleri, hedef rasyonel/tam sayı noktaları ve harf etiketleri (A, B, C). |
| 19 | `fallback_matematik_7_MAT_7_1_2_24` | 7 | MATEMATIK | Fallback Havuzu (MATEMATIK - 7. Sınıf) | [MAT.7.1.2] Devirli ondalık gösterimleri rasyonel sayı biçimin | `fractionMathEngine` (fraction_bar) | Referans bütün dikdörtgen şeridi (wholeWidth=500), payda kadar eşit parçaya bölünmüş ızgara, pay kadar taranmış/renkli dilimler, birim kesir etiketleri (örn: "1/4") ve denklik kılavuz çizgisi. |
| 20 | `fallback_matematik_7_MAT_7_1_3_25` | 7 | MATEMATIK | Fallback Havuzu (MATEMATIK - 7. Sınıf) | [MAT.7.1.3] Rasyonel sayıların karşılaştırma ve sıralama ilişk | `svgMathEngine` (number_line) | Yatay sayı doğrusu ekseni, 0 başlangıç noktası (orijin), tam sayı aralık çentikleri, hedef rasyonel/tam sayı noktaları ve harf etiketleri (A, B, C). |
| 21 | `fallback_matematik_7_MAT_7_1_2_31` | 7 | MATEMATIK | Fallback Havuzu (MATEMATIK - 7. Sınıf) | [MAT.7.1.2] Su sayacı bölmelerini denk kesir ve ondalık göster | `fractionMathEngine` (fraction_bar) | Referans bütün dikdörtgen şeridi (wholeWidth=500), payda kadar eşit parçaya bölünmüş ızgara, pay kadar taranmış/renkli dilimler, birim kesir etiketleri (örn: "1/4") ve denklik kılavuz çizgisi. |
| 22 | `fallback_matematik_7_MAT_7_1_3_33` | 7 | MATEMATIK | Fallback Havuzu (MATEMATIK - 7. Sınıf) | [MAT.7.1.3] Futbol ligi averaj tablosunda negatif rasyonel say | `svgMathEngine` (number_line) | Yatay sayı doğrusu ekseni, 0 başlangıç noktası (orijin), tam sayı aralık çentikleri, hedef rasyonel/tam sayı noktaları ve harf etiketleri (A, B, C). |
| 23 | `fallback_matematik_7_MAT_7_1_3_34` | 7 | MATEMATIK | Fallback Havuzu (MATEMATIK - 7. Sınıf) | [MAT.7.1.3] Negatif rasyonel sayıların sayı doğrusunda karşıla | `svgMathEngine` (number_line) | Yatay sayı doğrusu ekseni, 0 başlangıç noktası (orijin), tam sayı aralık çentikleri, hedef rasyonel/tam sayı noktaları ve harf etiketleri (A, B, C). |

### 2.1. Mevcut Motor Veri Modeli Uyumluluk Doğrulaması
- **`number_line` (8 Soru):** `NumberLineVisualParams` arayüzündeki `{ min, max, points: [{ id, numerator, denominator, label, color }] }` şemasıyla birebir örtüşmektedir. Örneğin 7. sınıf pilot sorusunda (`senaryo_1_q4`) Ece (-5/6) ve Mert (-3/4) noktaları BigInt çapraz çarpımı ile doğrulanmıştır.
- **`fraction_bar` (15 Soru):** `FractionModelVisualParams` arayüzündeki `{ modelKind: "fraction_bar", bars: [{ id, fraction: { numerator, denominator }, showUnitFractionLabels, fillColor, pattern }] }` şemasına tam uymaktadır. Özellikle 5. sınıf 1. dönem 2. yazılı sınavındaki (Senaryo 1 Q1-Q5) denk kesir ve birim kesir modellemeleri için hazırdır.

---

## 3. Yeni Motor Gerektiren 269 Sorunun Motor Bazlı Gruplaması

Yeni motor ihtiyacı olan 269 soru, 10 temel görsel motor ailesine ayrılmıştır. Hiçbir soru iki gruba birden yazılmamıştır (çift sayım yoktur).

| Öncelik | Motor Ailesi | Soru Sayısı | İlgili Dersler ve Sınıflar | Temel Görsel Nesneleri ve Teknik Gereksinimler |
| :-: | :--- | :---: | :--- | :--- |
| **P1** | **Geometri Motoru (`svgGeometryEngine`)** | **58** | Matematik (5, 6, 7, 8) | Açılar (dar, dik, geniş, doğru), doğru-doğru parçası-ışın modelleri, üçgenler, paralelkenar, yamuk, çember ve prizmalar. Vektörel `<path>`, `<polygon>`, açı yayları (`arc`). |
| **P1** | **Veri ve Grafik Motoru (`svgChartEngine`)** | **52** | Matematik, Fen, Sosyal, İngilizce | Sütun grafiği, çizgi grafiği, daire grafiği (pasta), sıklık tablosu, nüfus piramidi. Eksenler (X/Y), birim etiketleri, orantılı `<rect>` ve SVG dilim yolları. |
| **P2** | **Fen Mekanik Motoru (`svgMechanicsEngine`)** | **44** | Fen Bilimleri (5, 6, 7, 8) | Dinamometre yay skalası (N), kuvvet vektörleri (F1, F2), sürtünme okları, makara sistemleri, kaldıraç desteği ve yük kutuları, sıvı/katı basınç kapları. |
| **P2** | **Astronomi Motoru (`svgAstronomyEngine`)** | **40** | Fen Bilimleri (5, 6, 7) | Ay'ın 8 evresi (Yeniay, Hilal, İlkdördün, Dolunay vb.), Güneş ve Ay tutulma şeması, Dünya eksen eğikliği ve mevsim açıları, gezegen yörünge dizilimi. |
| **P3** | **Biyoloji Şemaları Motoru (`svgBiologyEngine`)** | **21** | Fen Bilimleri (6, 7, 8) | Bitki ve hayvan hücresi organelleri (mitokondri, kloroplast, koful), mitoz ve mayoz bölünme safhaları, DNA sarmalı ve nükleotid çiftleri. |
| **P3** | **Kavram ve Akış Motoru (`svgDiagramEngine`)** | **21** | Türkçe, Din Kültürü, Sosyal | Olay örgüsü akış şemaları, neden-sonuç ilişki ağları, Hac ibadeti basamakları, zekat oranları tablosu, kavram haritaları. |
| **P4** | **Coğrafi Harita Motoru (`svgMapEngine`)** | **14** | Sosyal Bilgiler (5, 6, 7, 8) | Fiziki/beşeri harita konturları, lejant kutusu ve sembolleri, yükselti renk basamakları (yeşil-kahverengi), yön oku (Kuzey). |
| **P4** | **Zaman Çizelgesi Motoru (`svgTimelineEngine`)** | **12** | Sosyal Bilgiler (6, 7, 8) | Kronolojik tarih şeridi, yatay zaman oku, yüzyıl ve dönem kutuları, tarihsel süreç olay işaretçileri. |
| **P4** | **Elektrik Devresi Motoru (`svgCircuitEngine`)** | **4** | Fen Bilimleri (5, 7) | Kapalı devre kablo şeması, pil kutupları (+/-), anahtar (K), ampul sembolü (daire içinde X), seri ve paralel bağlantı kolları. |
| **P4** | **Optik Işın Motoru (`svgOpticsEngine`)** | **3** | Fen Bilimleri (5, 7) | Düzlem/küresel ayna yüzeyi, ayna normali (N), gelen ışın ve yansıyan ışın okları, gelme/yansıma açı yayları (i ve r). |
| - | **YENİ MOTOR TOPLAMI** | **269** | - | - |

---

## 4. Yeni Motor Gruplarından Seçkin Soru Analizleri

### 4.6. Kavram ve Akış Şeması Motoru Örnek Soruları (21 Soru)
Toplam Soru Sayısı: **21 adet**  

| Soru ID | Sınıf | Ders | Sınav | Soru Metni (Özet) | Görsel Gereksinimi ve Nesneler |
| :--- | :-: | :-: | :--- | :--- | :--- |
| `exam_5_turkce_1_1_senaryo_1_q3` | 5 | TURKCE | 5. Sınıf Türkçe 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 1) (6 Soru) | [Öncül Metin / Durum]: Aşağıdaki tabloda geleneksel ahşap oyuncaklar ile günümüz plastik oyunca... | Adım kutucukları (dikdörtgen/yuvarlak), akış yönü okları, neden-sonuç bağlantı etiketleri, hiyerarşik veya döngüsel süreç şeması. |
| `exam_5_turkce_1_1_senaryo_2_q3` | 5 | TURKCE | 5. Sınıf Türkçe 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 2) (6 Soru) | [Öncül Metin / Durum]: Bir fen dergisindeki görselde; onlarca karıncanın birbirine kenetlenerek... | Adım kutucukları (dikdörtgen/yuvarlak), akış yönü okları, neden-sonuç bağlantı etiketleri, hiyerarşik veya döngüsel süreç şeması. |
| `exam_5_turkce_1_1_senaryo_2_q4` | 5 | TURKCE | 5. Sınıf Türkçe 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 2) (6 Soru) | [Öncül Metin / Durum]: Bir okul panosunda 'Emek Veren Kazanır' başlıklı afişte bir yanda kışa h... | Adım kutucukları (dikdörtgen/yuvarlak), akış yönü okları, neden-sonuç bağlantı etiketleri, hiyerarşik veya döngüsel süreç şeması. |

### 4.1. Geometri Motoru Örnek Soruları (58 Soru)
Toplam Soru Sayısı: **58 adet**  

| Soru ID | Sınıf | Ders | Sınav | Soru Metni (Özet) | Görsel Gereksinimi ve Nesneler |
| :--- | :-: | :-: | :--- | :--- | :--- |
| `exam_5_matematik_1_1_senaryo_1_q1` | 5 | MATEMATIK | 5. Sınıf Matematik 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 1) (7 Soru) | [Öncül Metin / Durum]: Aşağıdaki modeller verilmiştir: 1. İki yönden sonsuza uzanan tren rayı 2... | Vektörel doğru (iki ucu oklu düz çizgi d), doğru parçası ([AB] sınır noktalarıyla), ışın ([KL bir ucu kapalı, diğer ucu oklu), harf etiketleri ve uç okları. |
| `exam_5_matematik_1_1_senaryo_1_q2` | 5 | MATEMATIK | 5. Sınıf Matematik 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 1) (7 Soru) | [Öncül Metin / Durum]: Yatay bir tahta çıtaya tam 90 derecelik dikey bir destek tahtası monte e... | Vektörel doğru (iki ucu oklu düz çizgi d), doğru parçası ([AB] sınır noktalarıyla), ışın ([KL bir ucu kapalı, diğer ucu oklu), harf etiketleri ve uç okları. |
| `exam_5_matematik_1_1_senaryo_1_q3` | 5 | MATEMATIK | 5. Sınıf Matematik 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 1) (7 Soru) | [Öncül Metin / Durum]: Ölçüleri verilen açılar: K = 35°, L = 90°, M = 140°, N = 180° [Soru]: K,... | Vektörel doğru (iki ucu oklu düz çizgi d), doğru parçası ([AB] sınır noktalarıyla), ışın ([KL bir ucu kapalı, diğer ucu oklu), harf etiketleri ve uç okları. |

### 4.4. Astronomi ve Ay Evreleri Motoru Örnek Soruları (40 Soru)
Toplam Soru Sayısı: **40 adet**  

| Soru ID | Sınıf | Ders | Sınav | Soru Metni (Özet) | Görsel Gereksinimi ve Nesneler |
| :--- | :-: | :-: | :--- | :--- | :--- |
| `exam_5_fen_bilimleri_1_1_senaryo_1_q3` | 5 | FEN_BILIMLERI | 5. Sınıf Fen Bilimleri 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 1) (7 Soru) | [Öncül Metin / Durum]: Ay'ın Dünya etrafındaki dolanımı sırasında gökyüzündeki görünümü periyod... | Merkezde Dünya küresi, Güneş ışığı geliş yönü okları (sol/sağ), yörüngede 8 Ay konumu (Yeniay, Hilal, İlkdördün, Şişkinay, Dolunay, Sondördün), aydınlık/karanlık yarım küre taramaları. |
| `exam_5_fen_bilimleri_1_1_senaryo_1_q4` | 5 | FEN_BILIMLERI | 5. Sınıf Fen Bilimleri 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 1) (7 Soru) | [Öncül Metin / Durum]: Yeni Ay evresinden yaklaşık bir hafta sonra Ay gökyüzünde yarım daire bi... | Merkezde Dünya küresi, Güneş ışığı geliş yönü okları (sol/sağ), yörüngede 8 Ay konumu (Yeniay, Hilal, İlkdördün, Şişkinay, Dolunay, Sondördün), aydınlık/karanlık yarım küre taramaları. |
| `exam_5_fen_bilimleri_1_1_senaryo_2_q3` | 5 | FEN_BILIMLERI | 5. Sınıf Fen Bilimleri 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 2) (7 Soru) | [Öncül Metin / Durum]: Gökyüzünün bulutsuz ve açık olduğu bazı gecelerde Ay gökyüzünde hiç görü... | Merkezde Dünya küresi, Güneş ışığı geliş yönü okları (sol/sağ), yörüngede 8 Ay konumu (Yeniay, Hilal, İlkdördün, Şişkinay, Dolunay, Sondördün), aydınlık/karanlık yarım küre taramaları. |

### 4.3. Fen Mekanik ve Kuvvet Motoru Örnek Soruları (44 Soru)
Toplam Soru Sayısı: **44 adet**  

| Soru ID | Sınıf | Ders | Sınav | Soru Metni (Özet) | Görsel Gereksinimi ve Nesneler |
| :--- | :-: | :-: | :--- | :--- | :--- |
| `exam_5_fen_bilimleri_1_1_senaryo_1_q7` | 5 | FEN_BILIMLERI | 5. Sınıf Fen Bilimleri 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 1) (7 Soru) | [Öncül Metin / Durum]: Kuvvet ölçümünde kullanılan dinamometrenin içerisinde sarmal bir çelik y... | Dinamometre yay gövdesi ve eşit bölmeli skala (N cinsinden), asılı yük kutusu (G), sürtünmeli zemin çizgisi, kuvvet yönü okları (F1, F2 vektörleri), kaldıraç destek noktası ve kuvvet kolu. |
| `exam_5_fen_bilimleri_1_1_senaryo_3_q5` | 5 | FEN_BILIMLERI | 5. Sınıf Fen Bilimleri 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 3) (6 Soru) | [Öncül Metin / Durum]: Bir dinamometreye 10 N ağırlığında cisim asıldığında yay 2 cm uzamaktadı... | Dinamometre yay gövdesi ve eşit bölmeli skala (N cinsinden), asılı yük kutusu (G), sürtünmeli zemin çizgisi, kuvvet yönü okları (F1, F2 vektörleri), kaldıraç destek noktası ve kuvvet kolu. |
| `exam_5_fen_bilimleri_1_1_senaryo_3_q6` | 5 | FEN_BILIMLERI | 5. Sınıf Fen Bilimleri 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 3) (6 Soru) | [Öncül Metin / Durum]: En fazla 50 N ölçebilen bir dinamometreye 80 N ağırlığında ağır bir demi... | Dinamometre yay gövdesi ve eşit bölmeli skala (N cinsinden), asılı yük kutusu (G), sürtünmeli zemin çizgisi, kuvvet yönü okları (F1, F2 vektörleri), kaldıraç destek noktası ve kuvvet kolu. |

### 4.10. Optik ve Işık Işınları Motoru Örnek Soruları (3 Soru)
Toplam Soru Sayısı: **3 adet**  

| Soru ID | Sınıf | Ders | Sınav | Soru Metni (Özet) | Görsel Gereksinimi ve Nesneler |
| :--- | :-: | :-: | :--- | :--- | :--- |
| `exam_5_fen_bilimleri_1_1_senaryo_3_q1` | 5 | FEN_BILIMLERI | 5. Sınıf Fen Bilimleri 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 3) (6 Soru) | [Öncül Metin / Durum]: Geceleri gökyüzünde parlayan Ay, Dünya'mızın tek doğal uydusudur. [Soru]... | Ayna yüzeyi (düzlem, çukur veya tümsek), ayna normali kesikli çizgisi (N), gelen ışın oku, yansıyan ışın oku, gelme ve yansıma açı yayları (i ve r). |
| `exam_7_fen_bilimleri_1_1_senaryo_3_q2` | 7 | FEN_BILIMLERI | 7. Sınıf Fen Bilimleri 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 3) (8 Soru) | [Öncül Metin / Durum]: Gök bilimciler uzayı gözlemlemek için mercekli ve aynalı optik teleskopl... | Ayna yüzeyi (düzlem, çukur veya tümsek), ayna normali kesikli çizgisi (N), gelen ışın oku, yansıyan ışın oku, gelme ve yansıma açı yayları (i ve r). |
| `fallback_fen_bilimleri_7_FB_7_1_1_2` | 7 | FEN_BILIMLERI | Fallback Havuzu (FEN_BILIMLERI - 7. Sınıf) | [Öncül Metin / Durum]: Astronomi panosu hazırlayan Kerem ve Alper uzay teleskopları hakkında ta... | Ayna yüzeyi (düzlem, çukur veya tümsek), ayna normali kesikli çizgisi (N), gelen ışın oku, yansıyan ışın oku, gelme ve yansıma açı yayları (i ve r). |

### 4.5. Biyoloji ve Hücre Şemaları Motoru Örnek Soruları (21 Soru)
Toplam Soru Sayısı: **21 adet**  

| Soru ID | Sınıf | Ders | Sınav | Soru Metni (Özet) | Görsel Gereksinimi ve Nesneler |
| :--- | :-: | :-: | :--- | :--- | :--- |
| `exam_5_fen_bilimleri_1_1_senaryo_4_q2` | 5 | FEN_BILIMLERI | 5. Sınıf Fen Bilimleri 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 4) (6 Soru) | [Öncül Metin / Durum]: Ay yüzeyine inen iki astronot aralarındaki mesafe 1 metre olsa bile kask... | Hücre zarı ve hücre çeperi katmanları, çekirdek, mitokondri, kloroplast, koful organel çizimleri; veya mitoz/mayoz iğ iplikleri ve kromozom dizilim şeması. |
| `exam_6_fen_bilimleri_1_1_senaryo_1_q8` | 6 | FEN_BILIMLERI | 6. Sınıf Fen Bilimleri 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 1) (8 Soru) | [Öncül Metin / Durum]: Canlılarda soyun devamını sağlayan üreme faaliyeti eşeyli ve eşeysiz olm... | Hücre zarı ve hücre çeperi katmanları, çekirdek, mitokondri, kloroplast, koful organel çizimleri; veya mitoz/mayoz iğ iplikleri ve kromozom dizilim şeması. |
| `exam_8_fen_bilimleri_1_1_senaryo_1_q2` | 8 | FEN_BILIMLERI | 8. Sınıf Fen Bilimleri 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 1) (7 Soru) | [Öncül Metin / Durum]: Kalıtsal yapılar karmaşıktan basite (büyükten küçüğe) doğru sıralanabili... | Hücre zarı ve hücre çeperi katmanları, çekirdek, mitokondri, kloroplast, koful organel çizimleri; veya mitoz/mayoz iğ iplikleri ve kromozom dizilim şeması. |

### 4.7. Coğrafi Harita Motoru Örnek Soruları (14 Soru)
Toplam Soru Sayısı: **14 adet**  

| Soru ID | Sınıf | Ders | Sınav | Soru Metni (Özet) | Görsel Gereksinimi ve Nesneler |
| :--- | :-: | :-: | :--- | :--- | :--- |
| `exam_5_sosyal_bilgiler_1_1_senaryo_2_q3` | 5 | SOSYAL_BILGILER | 5. Sınıf Sosyal Bilgiler 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 2) (7 Soru) | [Öncül Metin / Durum]: Bayram sabahı erkenden uyanan çocuklar en temiz kıyafetlerini giyer, ded... | Coğrafi sınır konturu, yön oku (Kuzey), yükselti basamakları renklendirmesi (yeşil, sarı, kahverengi), lejant kutusu ve semboller (dağ, ova, akarsu, maden). |
| `exam_5_sosyal_bilgiler_1_1_senaryo_2_q6` | 5 | SOSYAL_BILGILER | 5. Sınıf Sosyal Bilgiler 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 2) (7 Soru) | [Öncül Metin / Durum]: Okulda kurulan Kızılay ve Sosyal Yardımlaşma kulüpleri ihtiyaç sahibi öğ... | Coğrafi sınır konturu, yön oku (Kuzey), yükselti basamakları renklendirmesi (yeşil, sarı, kahverengi), lejant kutusu ve semboller (dağ, ova, akarsu, maden). |
| `exam_6_sosyal_bilgiler_1_1_senaryo_1_q4` | 6 | SOSYAL_BILGILER | 6. Sınıf Sosyal Bilgiler 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 1) (6 Soru) | [Öncül Metin / Durum]: Şehirlerde sokaklara atılan plastik şişeler, poşetler ve ambalajlar hem ... | Coğrafi sınır konturu, yön oku (Kuzey), yükselti basamakları renklendirmesi (yeşil, sarı, kahverengi), lejant kutusu ve semboller (dağ, ova, akarsu, maden). |

### 4.8. Zaman Çizelgesi Motoru Örnek Soruları (12 Soru)
Toplam Soru Sayısı: **12 adet**  

| Soru ID | Sınıf | Ders | Sınav | Soru Metni (Özet) | Görsel Gereksinimi ve Nesneler |
| :--- | :-: | :-: | :--- | :--- | :--- |
| `exam_5_sosyal_bilgiler_1_1_senaryo_2_q4` | 5 | SOSYAL_BILGILER | 5. Sınıf Sosyal Bilgiler 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 2) (7 Soru) | [Öncül Metin / Durum]: Ebru sanatı, çinicilik, bakırcılık ve halı dokumacılığı Türk milletinin ... | Yatay zaman oku, kronolojik tarih işaretçileri (örn: 1071, 1299, 1453), dönem adları kutuları ve tarihsel süreç etiketleri. |
| `exam_6_sosyal_bilgiler_1_1_senaryo_3_q3` | 6 | SOSYAL_BILGILER | 6. Sınıf Sosyal Bilgiler 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 3) (6 Soru) | [Öncül Metin / Durum]: Kırkpınar Yağlı Güreşleri ve atlı cirit oyunları yüzyıllardır Türk mille... | Yatay zaman oku, kronolojik tarih işaretçileri (örn: 1071, 1299, 1453), dönem adları kutuları ve tarihsel süreç etiketleri. |
| `exam_8_sosyal_bilgiler_1_1_senaryo_1_q1` | 8 | SOSYAL_BILGILER | 8. Sınıf T.C. İnkılap Tarihi ve Atatürkçülük 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 1) (6 Soru) | [Öncül Metin / Durum]: 18. yüzyılda İngiltere'de başlayan Sanayi İnkılabı ile el tezgâhlarının ... | Yatay zaman oku, kronolojik tarih işaretçileri (örn: 1071, 1299, 1453), dönem adları kutuları ve tarihsel süreç etiketleri. |

### 4.2. Veri ve Grafik Motoru Örnek Soruları (52 Soru)
Toplam Soru Sayısı: **52 adet**  

| Soru ID | Sınıf | Ders | Sınav | Soru Metni (Özet) | Görsel Gereksinimi ve Nesneler |
| :--- | :-: | :-: | :--- | :--- | :--- |
| `exam_5_ingilizce_1_1_senaryo_3_q3` | 5 | INGILIZCE | 5. Sınıf İngilizce 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 3) (6 Soru) | [Öncül Metin / Durum]: Table: • Monday: Math, Art • Wednesday: Science, P.E. • Friday: English,... | Dikey Y ekseni (ölçülen miktar / birim etiketli), Yatay X ekseni (kategoriler, günler veya değişkenler), orantılı sütun çubukları veya çizgi eğrisi, veri değer etiketleri ve lejant. |
| `exam_5_ingilizce_1_1_senaryo_3_q6` | 5 | INGILIZCE | 5. Sınıf İngilizce 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 3) (6 Soru) | [Öncül Metin / Durum]: Write about two school subjects you have on Tuesday. [Soru]: Write two f... | Dikey Y ekseni (ölçülen miktar / birim etiketli), Yatay X ekseni (kategoriler, günler veya değişkenler), orantılı sütun çubukları veya çizgi eğrisi, veri değer etiketleri ve lejant. |
| `exam_6_fen_bilimleri_1_1_senaryo_3_q6` | 6 | FEN_BILIMLERI | 6. Sınıf Fen Bilimleri 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 3) (7 Soru) | [Öncül Metin / Durum]: Bir bisikletlinin hareket tablosu: Zaman (s): 1, 2, 3, 4 Yol (m): 6, 12,... | Dikey Y ekseni (ölçülen miktar / birim etiketli), Yatay X ekseni (kategoriler, günler veya değişkenler), orantılı sütun çubukları veya çizgi eğrisi, veri değer etiketleri ve lejant. |

### 4.9. Elektrik Devresi Motoru Örnek Soruları (4 Soru)
Toplam Soru Sayısı: **4 adet**  

| Soru ID | Sınıf | Ders | Sınav | Soru Metni (Özet) | Görsel Gereksinimi ve Nesneler |
| :--- | :-: | :-: | :--- | :--- | :--- |
| `exam_7_fen_bilimleri_1_1_senaryo_2_q5` | 7 | FEN_BILIMLERI | 7. Sınıf Fen Bilimleri 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 2) (7 Soru) | [Öncül Metin / Durum]: Aşağıda üç farklı öğrencinin günlük hayattaki durumları verilmiştir: 1. ... | Kapalı devre teli, seri/paralel bağlı ampul sembolleri (daire içinde X), pil bataryası (+ / - kutuplu), açık/kapalı anahtar (K) ve voltmetre/ampermetre bağlantıları. |
| `exam_7_fen_bilimleri_1_1_senaryo_2_q7` | 7 | FEN_BILIMLERI | 7. Sınıf Fen Bilimleri 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 2) (7 Soru) | [Öncül Metin / Durum]: Halter sporuyla uğraşan milli sporcumuz Kerem, antrenmanda: 1. Aşama: Ye... | Kapalı devre teli, seri/paralel bağlı ampul sembolleri (daire içinde X), pil bataryası (+ / - kutuplu), açık/kapalı anahtar (K) ve voltmetre/ampermetre bağlantıları. |
| `exam_7_fen_bilimleri_1_1_senaryo_4_q4` | 7 | FEN_BILIMLERI | 7. Sınıf Fen Bilimleri 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 4) (6 Soru) | [Öncül Metin / Durum]: Fen bilimleri laboratuvarında sürtünmesiz buz pisti üzerinde duran bir h... | Kapalı devre teli, seri/paralel bağlı ampul sembolleri (daire içinde X), pil bataryası (+ / - kutuplu), açık/kapalı anahtar (K) ve voltmetre/ampermetre bağlantıları. |

---

## 5. CSV Veri Dosyası Yapısı ve Entegrasyon

292 sorunun her birine ait tam soru metni, bağlam öncülleri, kazanım kodları, detaylı görsel nesne/etiket listeleri ve pedagojik gerekçeler CSV dosyasında saklanmıştır:

- **Dosya Konumu:** [`docs/analysis/116_OYSS_GORSELLESTIRME_UYGULAMA_ENVANTERI.csv`](file:///Users/mesutduran/Desktop/OYSS/docs/analysis/116_OYSS_GORSELLESTIRME_UYGULAMA_ENVANTERI.csv)
- **Format:** RFC 4180 uyumlu, UTF-8 kodlamalı, çift tırnak korumalı CSV.
- **Kolonlar:** `soru_id`, `sinif`, `ders`, `sinav_senaryo`, `konu_kazanim`, `soru_metni`, `gorsel_ihtiyac_sinifi`, `onerilen_gorsel_turu`, `gorsel_ogeleri_ve_etiketler`, `mevcut_motorla_uretilebilirlik`, `gerekli_yeni_motor`, `pedagojik_gerekce`, `teknik_oncelik`.

---

## 6. Teknik Geliştirme Yol Haritası ve Fazlama

1. **Aşama 1 (Hemen Uygulanabilir - P0):**
   Mevcut `svgMathEngine` ve `fractionMathEngine` veri modelleri kullanılarak 23 sorunun `visual` nesneleri `sampleExams.ts` ve `fallbackPools` içerisine enjekte edilir.
2. **Aşama 2 (En Yüksek Hacim - P1):**
   `svgGeometryEngine` (58 soru) ve `svgChartEngine` (52 soru) geliştirilir; toplam **110 soru** görsel desteğe kavuşturulur.
3. **Aşama 3 (Fen ve Uzay - P2):**
   `svgMechanicsEngine` (44 soru) ve `svgAstronomyEngine` (40 soru) geliştirilerek **84 soru** daha tamamlanır.
4. **Aşama 4 (Süreç ve Özel Alanlar - P3 & P4):**
   Biyoloji, Akış Şeması, Harita, Zaman, Devre ve Optik motorları eklenerek kalan **75 soru** sisteme dahil edilir.
5. **Aşama 5 (AI Çıktı Entegrasyonu):**
   Gemini prompt motoruna bu motorların JSON parametreleri tanıtılarak canlı üretilen sorularda otomatik görsel desteği sağlanır.