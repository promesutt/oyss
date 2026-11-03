# OYSS Görev 117: Görselleştirme Envanteri Pedagojik ve Teknik Doğrulama Raporu

**Rapor Numarası:** 117  
**Tarih:** 3 Kasım 2026  
**Kapsam:** 292 Soruluk Görselleştirme Aday Envanterinin (Görev 116) Pedagojik ve Teknik Denetimi, 951 Soruluk Genel Havuzla Tutarlılık ve Hatalı Motor Eşleştirmelerinin Düzeltilmesi  
**İncelenen Kaynaklar:**  
- `docs/analysis/115_OYSS_GENEL_GORSELLESTIRME_IHTIYAC_ANALIZI.md`  
- `docs/analysis/116_OYSS_GORSELLESTIRME_UYGULAMA_ENVANTERI.md`  
- `docs/analysis/116_OYSS_GORSELLESTIRME_UYGULAMA_ENVANTERI.csv`  
- `src/data/sampleExams.ts` (852 MEB örnek sınav sorusu)  
- `src/data/fallbackPools/` (99 MEB uyumlu fallback sorusu)  
- `src/components/QuestionVisualView.tsx` ve SVG motorları (`svgMathEngine`, `fractionMathEngine`)  

---

## 1. Yönetici Özeti (Executive Summary)

Görev 116 kapsamında oluşturulan 292 soruluk görselleştirme uygulama envanteri, Görev 117 direktifleri doğrultusunda tek tek, kelime eşleştirmelerine dayanmaksızın **gerçek soru metinleri, kazanım hedefleri ve pedagojik işlevleri** açısından kapsamlı bir denetimden geçirilmiştir.

### Temel Doğrulama Bulguları
1. **98 Soruda Hata ve Düzeltme Tespit Edildi:** Görev 115 ve 116'daki otomatik anahtar kelime ve regex taramalarından kaynaklanan yüzeysel eşleşmeler ayıklanmış, toplam 292 sorunun **98 tanesinde (%33,6)** kategori, motor veya öncelik düzeltmesi yapılmıştır.
2. **93 Soru `visual_not_needed` Olarak Elendi:** Soru öncülünde zaten eksiksiz tablosu bulunan Türkçe/İngilizce okuma soruları, soyut devirli ondalık sayı açılımları, cebirsel sadeleştirmeler, Din Kültürü ayet mealleri ve salt sözel sosyal/fen soruları görsel adayı olmaktan çıkarılarak temiz metin görünümünde bırakılmıştır.
3. **199 Gerçek Görsel İhtiyacı Olan Soru Kesinleşti:** 951 soruluk genel havuzda pedagojik olarak görsel gerektiren veya görselle kavranması belirgin biçimde kolaylaşan net soru sayısı **199** olarak teyit edilmiştir (951 sorunun %20,9'u). Genel havuzun kalan 752 sorusu (%79,1) salt metin olarak kalacaktır.
4. **P0 Kümesi 23'ten 13'e İndirgenerek %100 Güvenli Hâle Getirildi:** Daha önce P0 (mevcut motorla derhal çizilebilir) olarak listelenen 23 sorudan 10 tanesinin sahte pozitif (false positive: devirli ondalık çevirme, aralarında asal sadeleştirme, aritmetik genişletme, temel geometrik doğru parçası) olduğu kanıtlanmış ve P0 listesinden çıkarılmıştır. Kalan **13 soru**, mevcut `svgMathEngine` (sayı doğrusu) ve `fractionMathEngine` (kesir şeridi) ile sıfır kod değişikliğiyle derhal üretilebilir durumdadır.
5. **Görev 115 vs 116 Sınıf Dağılım Tutarsızlığı Çözüldü:** Görev 115 rapor metninde sehven yer alan 8. sınıf 36 ve 7. sınıf 98 sayılarının bir aktarım/yazım hatası olduğu; arka plandaki veri setinde ve 116 envanterinde baştan beri 5: 69, 6: 88, 7: 88, 8: 47 (Toplam 292) şeklinde tutarlı bulunduğu kesin olarak doğrulanmıştır.

---

## 2. Görev 115 vs 116 Sınıf Dağılım Tutarsızlığının Kök Neden Analizi

Kullanıcının Görev 117 tanımında dikkat çektiği "Görev 115'te 8. sınıf 36 iken Görev 116'da 47; 7. sınıf Görev 115'te 98 iken Görev 116'da 88" çelişkisi dosya bazında titizlikle incelenmiştir.

### Kök Neden Kanıtı
- Arka planda çalışan analiz betiğinin oluşturduğu ham JSON verisi (`visual_needs_stats.json`) incelendiğinde sınıf dağılımı şöyledir:
  - 5. Sınıf: 11 (Türkçe) + 37 (Matematik) + 15 (Fen) + 3 (Sosyal) + 1 (Din) + 2 (İngilizce) = **69**
  - 6. Sınıf: 1 (Türkçe) + 8 (Matematik) + 38 (Fen) + 7 (Sosyal) + 3 (Din) + 31 (İngilizce) = **88**
  - 7. Sınıf: 0 (Türkçe) + 27 (Matematik) + 40 (Fen) + 9 (Sosyal) + 4 (Din) + 8 (İngilizce) = **88**
  - 8. Sınıf: 0 (Türkçe) + 9 (Matematik) + 23 (Fen) + 12 (Sosyal) + 1 (Din) + 2 (İngilizce) = **47**
  - **Genel Toplam:** 69 + 88 + 88 + 47 = **292 Soru**

### Hatanın Kaynağı
Görev 115 Markdown raporu hazırlanırken metin yazımı aşamasında:
- 7. Sınıfın gerçek değeri olan **88**, sehven **98** (+10) yazılmıştır.
- 8. Sınıfın gerçek değeri olan **47**, sehven **36** (-11) yazılmıştır.
- 6. Sınıfın gerçek değeri olan **88**, sehven **89** (+1) yazılmıştır.
- Bu üç yazım hatası toplamı yine 292'ye denk geldiğinden Görev 115 raporundaki toplam sayı tablosu kendi içinde 292 çıkmış, ancak veri tabanı ile metin tablosu arasında tutarsızlık oluşmuştur.

**Kesin Sonuç:** Görev 116 CSV dosyasındaki soru kimlikleri ve sınıf atamaları (69, 88, 88, 47) %100 DOĞRUDUR. Hata veri setinde değil, Görev 115 Markdown raporunun elle yazılan özet tablosundadır.

---

## 3. Özellikle Denetlenen 7 Kritik Hatanın Analizi ve Düzeltilmesi

Görev 117 talimatında belirtilen ve pedagojik olarak sorun teşkil eden 7 somut hata grubu tek tek çözümlenmiştir:

| # | Hata Tanımı | Etkilenen Soru ID | Eski Atama (Görev 116) | Gerçek Durum ve Pedagojik Analiz | Yeni Doğrulanmış Atama (Görev 117) |
|---|---|---|---|---|---|
| **1** | MAT.5.3.1 Geometrik çizimler sorusuna sayı doğrusu atanması | `exam_5_matematik_1_1_senaryo_5_q1` | `number_line` / P0 | Soru [2, 9] aralığının doğru parçası kavramını sormaktadır. Soru bir geometri kazanımıdır (doğru parçası). Sayı doğrusu motoru yerine geometrik çizim motoru gerektirir. | `geometry_shape` / `svgGeometryEngine` / P1 |
| **2** | M.8.1.1.3 Aralarında asal sayılar sorusuna kesir şeridi atanması | `exam_8_matematik_1_1_senaryo_6_q4` | `fraction_bar` / P0 | Metindeki `(x-2)/(y+3) = 28/35` ifadesinde geçen bölme `/` işareti yüzünden kesir şeridi sanılmıştır. Bu salt bir cebirsel sadeleştirme ve çarpan analizi sorusudur, görsel gerekmez. | `none` / `Yok (Görsel gerekmez)` / `visual_not_needed` |
| **3** | Ay'ın doğal uydu olması sorusuna optik motoru atanması | `exam_5_fen_bilimleri_1_1_senaryo_3_q1` | `science_optics` / P4 | Soru metninde geçen "ışık" kelimesi optik motorunu tetiklemiştir. Oysa soru Ay'ın ışığı yansıtması ve doğal ışık kaynağı olmamasıyla ilgili temel astronomi konusudur. | `astronomy_phases` / `svgAstronomyEngine` / P2 |
| **4** | Eşeyli ve eşeysiz üreme sorusuna biyoloji hücre şeması atanması | `exam_6_fen_bilimleri_1_1_senaryo_1_q8` | `biology_diagram` / P3 | Soru eşeyli ve eşeysiz üreme arasındaki 2 farkı sormaktadır. Bu kavramsal bir karşılaştırmadır; hücre organeli veya mikroskop görseli pedagojik olarak anlamsızdır. | `none` / `Yok (Görsel gerekmez)` / `visual_not_needed` |
| **5** | Metinde tablosu tam olan soruya mükerrer görsel atanması | `exam_5_turkce_1_1_senaryo_1_q3` | `concept_flowchart` / P3 | Öncülde ahşap ve plastik oyuncak karşılaştırma tablosu metin olarak zaten eksiksiz verilmiştir. Yeniden akış şeması veya görsel kutucuk çizmek gereksiz ve mükerrerdir. | `none` / `Yok (Görsel gerekmez)` / `visual_not_needed` |
| **6** | Devirli ondalık sayı sorularına kesir şeridi atanması | `exam_7_matematik_1_1_senaryo_1_q2` vb. (6 soru) | `fraction_bar` / P0 | $2,\overline{36}$, $1,\overline{45}$, $0,\overline{72}$ gibi devirli sayıların rasyonel sayıya çevrilmesi cebirsel/aritmetik kural uygulamasıdır. Kesir şeridinde devirli sayı modellenemez. | `none` / `Yok (Görsel gerekmez)` / `visual_not_needed` |
| **7** | Sözel fen/sosyal/ingilizce sorularına alakasız motor atanması | Birden fazla soru (İngilizce 40 soru, Sosyal 22 soru, Din 9 soru) | `data_chart`, `social_map`, `timeline_chart` | Bayramlaşma sorusuna harita, el sanatlarına zaman şeridi, İngilizce gramer boşluk doldurmaya veri grafiği atanmıştır. Bunların tamamı sözel metin analizidir. | `none` / `Yok (Görsel gerekmez)` / `visual_not_needed` |

---

## 4. 23 P0 Adayının Ayrıntılı Denetim Raporu

Görev 116 raporunda mevcut `QuestionVisual` altyapısı ile derhal üretilebilir (P0) olarak gösterilen 23 soru titizlikle incelenmiştir.

### 4.1. Kabul Edilen ve Doğrulanan 13 Gerçek P0 Sorusu
Bu soruların tamamı, mevcut `svgMathEngine` (sayı doğrusu) ve `fractionMathEngine` (kesir şeridi/modeli) motorlarımızın girdi yapısına birebir uymaktadır:

| # | Soru ID | Sınıf | Ders | Kazanım | Görsel Türü | Soru Özeti ve Pedagojik Gerekçe |
|---|---|---|---|---|---|---|
| 1 | `exam_5_matematik_1_2_senaryo_1_q1` | 5 | Matematik | M.5.1.3.4 | `fraction_model` | 1/2 = 2/4 = 4/8 kesir şeritleri modeli. Denk kesirleri bölme ve alan şeritleriyle kavratır. |
| 2 | `exam_5_matematik_1_2_senaryo_1_q2` | 5 | Matematik | M.5.1.3.1 | `fraction_bar` | 1/2, 1/4 ve 1/8 birim kesir şeritleri. Paydası büyüdükçe birim kesir parçasının küçüldüğünü gösterir. |
| 3 | `exam_5_matematik_1_2_senaryo_1_q4` | 5 | Matematik | M.5.1.3.2 | `fraction_bar` | 2 tam 1/4 elma modeli. Tam sayılı kesirlerin bütün ve parça şeridiyle modellenmesi. |
| 4 | `exam_5_matematik_1_2_senaryo_1_q5` | 5 | Matematik | M.5.1.3.5 | `fraction_bar` | 3/10, 7/10 ve 5/10 kitap okuma şeritleri. Paydaları eşit kesirlerin büyüklük karşılaştırması. |
| 5 | `exam_7_matematik_1_1_senaryo_1_q4` | 7 | Matematik | MAT.7.1.3 | `number_line` | **Pilot soru.** -3/4 ve -5/6 rasyonel sayılarının sayı doğrusunda Mert ve Ece tarafından karşılaştırılması. |
| 6 | `exam_7_matematik_1_1_senaryo_1_q7` | 7 | Matematik | MAT.7.1.4 | `fraction_bar` | Ali Bey maaşının 1/4'ü ve kalanının 2/5'i. Adımlı kesir bölme ve kalan kutusu modeli. |
| 7 | `exam_7_matematik_1_1_senaryo_3_q2` | 7 | Matematik | MAT.7.1.1 | `number_line` | Sayı doğrusunda -3 ile -2 arası 4 eşit parçaya, +1 ile +2 arası 3 eşit parçaya bölünmüş K ve L noktaları. |
| 8 | `exam_8_matematik_1_1_senaryo_2_q6` | 8 | Matematik | M.8.1.3.2 | `number_line` | Sayı doğrusunda √115 noktasının yeri (10 ile 11 arasındaki ardışık tam sayı aralığı). |
| 9 | `fallback_matematik_7_MAT_7_1_1_22` | 7 | Matematik | MAT.7.1.1 | `number_line` | İllerin hava sıcaklıkları (-12, -4, 0, +5) sayı doğrusu sıralama modeli. |
| 10 | `fallback_matematik_7_MAT_7_1_3_25` | 7 | Matematik | MAT.7.1.3 | `number_line` | Gezegen ortalama yüzey sıcaklıklarının rasyonel sayı doğrusunda gösterimi. |
| 11 | `fallback_matematik_7_MAT_7_1_2_31` | 7 | Matematik | MAT.7.1.2 | `fraction_bar` | Su sayacı bölmeleri denk kesir şeridi (4/10 = 2/5 oranının boyalı kutularla gösterimi). |
| 12 | `fallback_matematik_7_MAT_7_1_3_33` | 7 | Matematik | MAT.7.1.3 | `number_line` | Futbol takımlarının averaj değerleri (-3, +2, -1, +4) tam sayı doğrusu dizilimi. |
| 13 | `fallback_matematik_7_MAT_7_1_3_34` | 7 | Matematik | MAT.7.1.3 | `number_line` | Tahtadaki -2/3, -5/6 ve -7/12 negatif rasyonel sayılarının sayı doğrusunda küçükten büyüğe dizilimi. |

### 4.2. P0 Listesinden Çıkarılan 10 Sahte Pozitif (False Positive) Soru
| # | Soru ID | Eski Atama | Elenme Gerekçesi | Yeni Statü |
|---|---|---|---|---|
| 1 | `exam_5_matematik_1_1_senaryo_5_q1` | `number_line` (P0) | Temel geometrik çizimler kazanımı (MAT.5.3.1); sayı doğrusu değil doğru parçası geometrisidir. | `geometry_shape` (P1) |
| 2 | `exam_5_matematik_1_2_senaryo_1_q3` | `fraction_bar` (P0) | 3/5'i 4 ile genişletme, 18/24'ü 6 ile sadeleştirme; doğrudan aritmetik işlem. | `visual_not_needed` |
| 3 | `exam_7_matematik_1_1_senaryo_1_q2` | `fraction_bar` (P0) | 2,3636... devirli ondalık rasyonel açılımı; cebirsel formül kuralı. | `visual_not_needed` |
| 4 | `exam_7_matematik_1_1_senaryo_2_q2` | `fraction_bar` (P0) | 1,4545... devirli ondalık açılımı; kural hesaplaması. | `visual_not_needed` |
| 5 | `exam_7_matematik_1_1_senaryo_3_q3` | `fraction_bar` (P0) | 0,7272... devirli ondalık açılımı; formül hesabı. | `visual_not_needed` |
| 6 | `exam_7_matematik_1_1_senaryo_4_q3` | `fraction_bar` (P0) | 0,8333... devirli ondalık açılımı; formül hesabı. | `visual_not_needed` |
| 7 | `exam_7_matematik_1_1_senaryo_4_q4` | `fraction_bar` (P0) | 4,375 litre yakıt ondalık kesir sadeleştirmesi; cebirsel işlem. | `visual_not_needed` |
| 8 | `exam_7_matematik_1_1_senaryo_4_q5` | `fraction_bar` (P0) | 12/17, 12/19, 12/13 payları eşit sıralama kuralı; kesir şeridi gereksiz karmaşıktır. | `visual_not_needed` |
| 9 | `exam_8_matematik_1_1_senaryo_6_q4` | `fraction_bar` (P0) | `(x-2)/(y+3) = 28/35` aralarında asal sayı cebirsel sadeleştirmesi. | `visual_not_needed` |
| 10 | `fallback_matematik_7_MAT_7_1_2_24` | `fraction_bar` (P0) | Hassas kuyumcu terazisi devirli sayı kütle açılımı; cebirsel formül. | `visual_not_needed` |

---

## 5. Doğrulama Öncesi ve Sonrası Karşılaştırmalı İstatistik Matrisi

### 5.1. İhtiyaç Sınıfı Karşılaştırması (292 Aday Soru)
| İhtiyaç Sınıfı | Görev 116 (Eski) | Görev 117 (Doğrulanmış) | Net Fark | Açıklama |
|---|---|---|---|---|
| **visual_required** | 12 | 10 | -2 | Şekil/grafik olmadan çözülemeyen sorular |
| **visual_recommended** | 96 | 34 | -62 | Pedagojik modelleme sağlayan sorular |
| **visual_engine_gap** | 184 | 155 | -29 | Görsel gerekli ancak yeni motor bekleyenler |
| **visual_not_needed** | 0 | 93 | +93 | Salt metin, cebirsel veya öncülde tablosu hazır olanlar |
| **Toplam** | **292** | **292** | **0** | **%100 Tutarlı ve Dengeli** |

### 5.2. Teknik Öncelik Karşılaştırması
| Öncelik Seviyesi | Görev 116 | Görev 117 | Değişim | İlgili Motorlar |
|---|---|---|---|---|
| **P0 (Mevcut Motorla Hazır)** | 23 | **13** | -10 | `svgMathEngine` (7), `fractionMathEngine` (6) |
| **P1 (Geometri & Veri Grafiği)** | 110 | **60** | -50 | `svgGeometryEngine` (53), `svgChartEngine` (7) |
| **P2 (Fen Mekanik & Uzay)** | 84 | **83** | -1 | `svgMechanicsEngine` (44), `svgAstronomyEngine` (39) |
| **P3 (Süreç & Biyoloji)** | 42 | **29** | -13 | `svgBiologyEngine` (19), `svgDiagramEngine` (10) |
| **P4 (Harita, Devre, Optik, Zaman)** | 33 | **14** | -19 | `svgMapEngine` (8), `svgCircuitEngine` (3), `svgOpticsEngine` (2), `svgTimelineEngine` (1) |
| **- (Görsel Gerekmez)** | 0 | **93** | +93 | Görsel motoru gerektirmeyen metin soruları |
| **Toplam** | **292** | **292** | **0** | **Tüm adaylar sınıflandırıldı** |

### 5.3. Ders Bazında Doğrulanmış Dağılım
| Ders | 116 Toplam | Gerçek Görsel İhtiyacı | P0 (Hazır) | Yeni Motor (P1-P4) | Görsel Gerekmez (`visual_not_needed`) |
|---|---|---|---|---|---|
| **Matematik** | 81 | **66** | 13 | 53 | 15 |
| **Fen Bilimleri** | 116 | **111** | 0 | 111 | 5 |
| **Türkçe** | 12 | **10** | 0 | 10 | 2 |
| **Sosyal Bilgiler** | 31 | **9** | 0 | 9 | 22 |
| **Din Kültürü** | 9 | **0** | 0 | 0 | 9 |
| **İngilizce** | 43 | **3** | 0 | 3 | 40 |
| **Genel Toplam** | **292** | **199** | **13** | **186** | **93** |

---

## 6. Soru Havuzunun Genel Görünümü (951 Soru)

Yapılan bu titiz doğrulama sonrasında OYSS bünyesindeki 951 sorunun nihai pedagojik mimarisi netleşmiştir:

```
                            TOPLAM HAVUZ: 951 SORU
                                      │
            ┌─────────────────────────┴─────────────────────────┐
            ▼                                                   ▼
     GÖRSEL İHTİYAÇLI                                    SALT METİN
        199 Soru (%20,9)                                  752 Soru (%79,1)
            │                                             (659 eski + 93 ayıklanan)
  ┌─────────┴─────────┐
  ▼                   ▼
MEVCUT MOTOR (P0)  YENİ MOTOR GEREKEN (P1-P4)
 13 Soru (%1,4)     186 Soru (%19,5)
                     ├── P1 Geometri & Grafik: 60
                     ├── P2 Fen Mekanik & Uzay: 83
                     ├── P3 Biyoloji & Diyagram: 29
                     └── P4 Harita, Devre, Optik: 14
```

---

## 7. CSV Dosyası ve Doğrulama Alanları

Oluşturulan `docs/analysis/117_OYSS_GORSELLESTIRME_UYGULAMA_ENVANTERI.csv` dosyasında 292 satırın tamamı şu standart alanları içermektedir:
1. `soru_id`: Benzersiz soru kimliği.
2. `sinif`: Öğrenci sınıf seviyesi (5, 6, 7, 8).
3. `ders`: İlgili ders.
4. `sinav_senaryo`: Sınav başlığı ve senaryosu.
5. `konu_kazanim`: MEB kazanım kodu ve konusu.
6. `soru_metni`: Soru metninin tam hali (kısaltılmadan).
7. `gorsel_ihtiyac_sinifi`: `visual_required`, `visual_recommended`, `visual_engine_gap` veya `visual_not_needed`.
8. `onerilen_gorsel_turu`: Geometri, sayı doğrusu, kesir şeridi, astronomi, mekanik, harita veya `none`.
9. `gorsel_ogeleri_ve_etiketler`: Çizimde yer alacak etiketler, açılar, cisimler veya gerekçesi.
10. `mevcut_motorla_uretilebilirlik`: `EVET` (yalnızca 13 gerçek P0 için) veya `HAYIR`.
11. `gerekli_yeni_motor`: İlgili SVG motor adı veya `Yok`.
12. `pedagojik_gerekce`: Görselin soruya katkısı veya neden görsel gerekmediği.
13. `teknik_oncelik`: `P0`, `P1`, `P2`, `P3`, `P4` veya `- (Görsel gerekmez)`.

---

## 8. Faz 3.3.1 Uygulama Yol Haritası ve Öneriler

1. **Adım 1: 13 P0 Sorusunun Veri Modeline Eklenmesi:**
   Doğrulanmış 13 P0 sorusunun `QuestionVisual` metadata nesneleri `src/data/sampleExams.ts` ve `fallbackPools` içine eklenmeli ve mevcut motorlarla test edilmelidir.
2. **Adım 2: P1 Geometri Motoru Geliştirmesi (`svgGeometryEngine`):**
   Matematikteki 53 geometrik soru (açılar, üçgenler, paralelkenar, alan, çevre) için parametrik SVG motoru geliştirilmelidir.
3. **Adım 3: P2 Fen Motorları Geliştirmesi (`svgMechanicsEngine`, `svgAstronomyEngine`):**
   Fen bilimlerindeki dinamometre, kuvvet vektörü, makara ve Ay evreleri şemaları için motorlar tasarlanmalıdır.
4. **Adım 4: Salt Metin Soruların Korunması:**
   `visual_not_needed` olarak işaretlenen 93 soru ile mevcut 659 soruya yapay görsel eklenmemeli, arayüzde ferah ve sade bir tipografi ile sunulmalıdır.

---

## 9. Sonuç ve Onay Özeti

Görev 117 pedagojik ve teknik doğrulaması başarıyla tamamlanmıştır. Envanter, hem MEB müfredatı pedagojik hedefleri hem de yazılım mimarisi açısından sağlam, tutarlı ve doğrudan uygulanabilir bir temele kavuşturulmuştur.
