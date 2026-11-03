# OYSS Görev 120: P1 Geometri Soruları Envanteri ve Ortak Görsel Motor Tasarımı Raporu

**Rapor Numarası:** 120  
**Tarih:** 3 Kasım 2026  
**Kapsam:** Görev 117 Envanterinde P1 Önceliğiyle Listelenen 53 Geometri Aday Sorusunun Pedagojik ve Matematiksel Doğrulanması, Alt Tür Sınıflandırması, Eksiksiz Soru Envanteri ve Yeniden Kullanılabilir Ortak Geometri SVG Motoru (`svgGeometryEngine`) Teknik Tasarımı  
**İncelenen Kaynaklar:**  
- `docs/analysis/117_OYSS_GORSELLESTIRME_UYGULAMA_ENVANTERI.csv`  
- `src/types/index.ts` (`QuestionVisual`, `GeometryShapeVisual`, `CoordinateVisual`)  
- `src/components/QuestionVisualView.tsx`  
- `src/utils/svgMathEngine.ts` ve `src/utils/fractionMathEngine.ts`  
- `src/data/sampleExams.ts` ve `src/data/fallbackPools/`  

---

## 1. Yönetici Özeti (Executive Summary)

Görev 120 kapsamında, OYSS soru havuzunda geometri görselleştirme ihtiyacı bulunan sorular derinlemesine incelenmiş; mevcut SVG altyapısıyla uyumlu, genişletilebilir, deterministik ve çalışma zamanı tip güvenliğine sahip **Ortak Geometri Görsel Motoru (`svgGeometryEngine`)** teknik tasarımı gerçekleştirilmiştir.

Bu görev, kullanıcının talimatı doğrultusunda **salt bir analiz ve tasarım görevidir; hiçbir kaynak kod yazılmamış ve mevcut dosyalar değiştirilmemiştir.**

### Temel Bulgular ve Kapsam Doğrulaması:
1. **Kapsam Sayımının Düzeltilmesi (53 Aday Soru):** Görev 117 envanterinde `gerekli_yeni_motor == 'svgGeometryEngine'` olarak işaretlenen **53 sorunun** tamamı tek tek incelenmiştir.
2. **Gerçek Geometri vs. Geometri Dışı Ayrımı:**
   - **39 Soru (%73,6):** Gerçekten geometrik çizim, açı, doğru, çokgen veya çevre/alan modeli gerektiren **Hakiki Geometri Soruları**dır.
   - **14 Soru (%26,4):** Görev 116 toplu atama sürecinde mekanik olarak geometri motoruna atanmış, ancak gerçekte **saf aritmetik bölünebilme kuralları (5 soru), çarpan ağacı (1 soru) veya tam sayı/rasyonel sayı problemleri (8 soru)** olan sorulardır. Bu sorular geometri motoru kapsamından ayıklanmıştır.
3. **Görsel İhtiyaç Derecelendirmesi (39 Geometri Sorusu İçinde):**
   - **Görsel Olmadan Çözülemeyen (12 Soru - %30,8):** Şeklin kendisi soru metninin ayrılmaz bir parçası olan, açıölçer okuma, saat kadranı, kareli zemin öteleme ve çokgen olma şartı soruları.
   - **Anlamayı Belirgin Kolaylaştıran (27 Soru - %69,2):** Geometrik modeller, iç açı toplamı soruları, köşegen ilişkileri ve dikdörtgen çevre/EBOB arazi planları.
   - **Gereksiz Tekrar / İpucu Oluşturan (0 Soru):** Soru metninde zaten var olan veya çözümü öğrencinin bulması gereken adımları ifşa eden hiçbir soruya görsel zorlaması yapılmamıştır.
4. **Ortak Geometri Motoru Mimarisi:** Mevcut `QuestionVisualView.tsx` bileşenini ve `QuestionVisual` tip yapısını bozmadan, `type: 'geometry_shape'` altında 5 modüler alt türü (`line_system`, `angle_model`, `polygon_2d`, `grid_coordinate`, `area_perimeter`) yönetecek deterministik bir SVG mimarisi tasarlanmıştır.

---

## 2. Kapsam ve Alt Tür Analizi

53 sorunun kademe, ders ve alt tür dağılımı aşağıdaki gibidir:

### 2.1. Kademe ve Ders Dağılımı
| Kademe | Soru Sayısı | Hakiki Geometri | Geometri Dışı / Elenen | Temel Konu ve Kazanımlar |
|---|---|---|---|---|
| **5. Sınıf** | 32 | **32** | 0 | Doğru, doğru parçası, ışın, açılar, saat modeli, çokgenler, kareli zemin |
| **6. Sınıf** | 8 | **2** | 6 | Dikdörtgen alan/çevre (2); Bölünebilme (5 elendi), Çarpan ağacı (1 elendi) |
| **7. Sınıf** | 9 | **1** | 8 | Basketbol sahası çevresi (1); Sıcaklık, rasyonel sıralama, bütçe (8 elendi) |
| **8. Sınıf** | 4 | **4** | 0 | Dikdörtgen bahçe fidan (EBOB), pano alanı, kare fayans ızgara döşeme |
| **TOPLAM** | **53** | **39** | **14** | **39 Hakiki Geometri Sorusu Yeni Motor Kapsamına Alınmıştır** |

### 2.2. Geometri Alt Türleri ve Desteklenen Modeller
1. **Doğru Sistemleri (`line_system` - 14 Soru):**
   - İki ucu oklu doğru ($d$), doğru parçası ($[AB]$), ışın ($[KL]$).
   - Düzlemde iki veya üç doğrunun durumları: Paralel doğrular ($k \parallel l$), kesişen doğrular, çakışık doğrular ($d_1 = d_2$), dik kesişen doğrular ($k \perp l$), noktadaş doğrular (tek $O$ noktasından geçen 3 doğru).
   - Doğruya üzerindeki veya dışındaki bir noktadan dikme inme modeli ($[PH] \perp d$).
2. **Açı Modelleri (`angle_model` - 8 Soru):**
   - Açı çeşitleri paneli: Dar açı ($<90^\circ$), dik açı ($90^\circ$), geniş açı ($>90^\circ$), doğru açı ($180^\circ$).
   - Analog saat kadranı: Saat 03.00, 04.00, 06.00, 02.00 akrep-yelkovan açıları ($30^\circ$ saat dilimi çarpanı).
   - Tümler ve bütünler komşu açılar: Dik açının bölünmesi ($38^\circ$ ve $?$), doğru açının bölünmesi ($65^\circ$ ve $?$).
   - İletki (açıölçer) modeli: $0^\circ - 180^\circ$ yarım daire iletki üzerinde açı okuma.
3. **Çokgenler, Üçgen ve Dörtgenler (`polygon_2d` - 7 Soru):**
   - Çokgen olma şartları: Kapalı üçgen (çokgen), köşesi açık şekil (çokgen değil), kenarı eğri şekil (çokgen değil).
   - Üçgen iç açıları toplamı ($55^\circ$, $65^\circ$, $?$) ve dik üçgen dar açıları ($32^\circ$, $?$).
   - Dörtgen iç açıları toplamı ($85^\circ$, $95^\circ$, $105^\circ$, $?$).
   - Köşegen modelleri: Dörtgen köşegenleri ($[AC]$, $[BD]$), beşgen köşegenleri ve üçgende köşegen olmaması.
4. **Kareli Zemin ve Geometrik Konum (`grid_coordinate` - 3 Soru):**
   - Kareli ızgara zemin ($8 \times 6$ grid), noktanın noktaya göre konumu (5 birim sağ, 2 birim yukarı öteleme okları).
   - Eş uzunlukta doğru parçası çizimi ($3-4-5$ yatay-dikey öteleme adımları).
   - Pergel ile çember yayı çizimi (sabit $6\text{ cm}$ yarıçap ile eşit uzaklık modeli).
5. **Geometrik Çevre, Alan ve Izgara Modelleri (`area_perimeter` - 7 Soru):**
   - Dikdörtgen alan modelleri: Alanı $60\text{ cm}^2$ ve $36\text{ cm}^2$ olan dikdörtgenlerin kenar çiftleri.
   - Dikdörtgen tarla/bahçe etrafına fidan dikimi: $40\text{m} \times 56\text{m}$ ve $48\text{m} \times 60\text{m}$ arazilerde köşe ve kenar EBOB fidan noktaları.
   - Kare fayans döşeme (Tessellation): $120\text{ cm} \times 180\text{ cm}$ banyo zemininde $60\text{ cm} \times 60\text{ cm}$ ızgara kare fayans modeli ($2 \times 3 = 6$ fayans).
   - Cebirsel çevre modeli: Dikdörtgen basketbol sahası ($(5x+3)\text{m} \times (2x-1)\text{m}$) ve 2 tur koruyucu tel şeritleri.
6. **Geometri Dışı / Elenen Sorular (`non_geometry` - 14 Soru):**
   - 6. Sınıf Bölünebilme Kuralları (5 Soru: 542A, 71A32, 4A2, 834B, kalan aritmetiği) -> Aritmetik kural soruları.
   - 6. Sınıf Çarpan Ağacı (1 Soru: 120 asal çarpanları) -> Ağaç hiyerarşik sayı şeması.
   - 7. Sınıf Sayı/Cebir (8 Soru: Kutup canlıları sıcaklığı, rasyonel sıralama, atletizm süreleri, denizaltı derinliği, işlem önceliği, harçlık kartı, enerji faturası) -> Sayı doğrusu veya metin tabanlı sorular.

---

## 3. 53 Sorunun Eksiksiz Analitik Envanteri

Aşağıdaki tabloda, Görev 117 CSV'sinde yer alan 53 sorunun tek tek pedagojik incelemesi, gerçek görsel ihtiyacı, görsel öğeleri ve motor kararı yer almaktadır:

| # | Soru ID | Snf | Konu ve Kazanım | Gerçek İhtiyaç | Alt Tür | Görsel Öğeleri ve Etiketler | Pedagojik Gerekçe | Öncelik | Motor Kararı |
|---|---|---|---|---|---|---|---|---|---|
| **1** | `exam_5_matematik_1_1_senaryo_1_q1` | 5 | [MAT.5.3.1] | **Önerilen** | `line_system` | İki ucu oklu doğru (d), iki ucu sınır noktalı... | Soyut doğru, doğru parçası ve ışın tanımlarını gün... | **P1A** | `svgGeometryEngine` |
| **2** | `exam_5_matematik_1_1_senaryo_1_q2` | 5 | [MAT.5.3.2] | **Önerilen** | `line_system` | Yatay doğru (çıta), üzerinde P noktası, P nok... | Bir doğruya üzerindeki noktadan dikme çizme kavram... | **P1B** | `svgGeometryEngine` |
| **3** | `exam_5_matematik_1_1_senaryo_1_q3` | 5 | [MAT.5.3.3] | **Önerilen** | `angle_model` | 4 bölmeli açı paneli: K(35° dar açı yayı), L(... | Açı çeşitlerini (dar, dik, geniş, doğru) açı kolla... | **P1A** | `svgGeometryEngine` |
| **4** | `exam_5_matematik_1_1_senaryo_1_q4` | 5 | [MAT.5.3.4] | **Önerilen** | `line_system` | Kroki üzerinde 2 yatay paralel doğru (g // k)... | Paralel ve dik kesişen doğruların sokak krokisi ba... | **P1A** | `svgGeometryEngine` |
| **5** | `exam_5_matematik_1_1_senaryo_1_q5` | 5 | [MAT.5.3.5] | **Zorunlu** | `polygon_2d` | Şekil 1 kapalı üçgen, Şekil 2 köşesi açık 4 d... | Çokgen olma kurallarını (doğru parçalarından oluşm... | **P1A** | `svgGeometryEngine` |
| **6** | `exam_5_matematik_1_1_senaryo_1_q6` | 5 | [MAT.5.3.6] | **Önerilen** | `polygon_2d` | ABCD dikdörtgeni üzerinde [AC] ve [BD] kesikl... | Köşegen tanımını (komşu olmayan iki köşe) üçgen ve... | **P1B** | `svgGeometryEngine` |
| **7** | `exam_5_matematik_1_1_senaryo_1_q7` | 5 | [MAT.5.3.7] | **Zorunlu** | `grid_coordinate` | 8x6 kareli grid zemin, A(1,1) Okul noktası, B... | Noktanın noktaya göre göreli konumunu (sağ/sol, yu... | **P1A** | `svgGeometryEngine` |
| **8** | `exam_5_matematik_1_1_senaryo_2_q1` | 5 | [MAT.5.3.1] | **Önerilen** | `line_system` | K ve L noktaları, uçları sınırlı [KL] doğru p... | Işın ile doğru parçasının sembolik ve geometrik gö... | **P1B** | `svgGeometryEngine` |
| **9** | `exam_5_matematik_1_1_senaryo_2_q2` | 5 | [MAT.5.3.2] | **Zorunlu** | `grid_coordinate` | Kareli grid zemin, yatay 4 dikey 3 birim ötel... | Eş uzunlukta doğru parçası çiziminde pisagor/ötele... | **P1A** | `svgGeometryEngine` |
| **10** | `exam_5_matematik_1_1_senaryo_2_q3` | 5 | [MAT.5.3.3] | **Zorunlu** | `angle_model` | İki analog saat kadranı: Saat 03.00 (90° dik ... | Saat kadranı üzerinde ardışık iki sayı arasının 30... | **P1A** | `svgGeometryEngine` |
| **11** | `exam_5_matematik_1_1_senaryo_2_q4` | 5 | [MAT.5.3.4] | **Önerilen** | `line_system` | Aynı düzlemde tek bir P noktasında kesişen eğ... | Kesişen iki doğrunun tek bir ortak noktası olduğun... | **P1B** | `svgGeometryEngine` |
| **12** | `exam_5_matematik_1_1_senaryo_2_q5` | 5 | [MAT.5.3.5] | **Önerilen** | `polygon_2d` | Ters eşkenar üçgen (Yol Ver) ve düzgün sekizg... | Çokgenlerin kenar sayılarına göre (üçgen, sekizgen... | **P1B** | `svgGeometryEngine` |
| **13** | `exam_5_matematik_1_1_senaryo_2_q6` | 5 | [MAT.5.3.6] | **Önerilen** | `polygon_2d` | KLM üçgeni, K köşesinde 55°, L köşesinde 65° ... | Üçgenin iç açıları toplamının 180° olduğunu, cevab... | **P1A** | `svgGeometryEngine` |
| **14** | `exam_5_matematik_1_1_senaryo_2_q7` | 5 | [MAT.5.3.6] | **Önerilen** | `polygon_2d` | ABCD dörtgeni, köşelerde 85°, 95°, 105° açı y... | Dörtgenlerin iç açıları toplamının 360° olduğunu g... | **P1A** | `svgGeometryEngine` |
| **15** | `exam_5_matematik_1_1_senaryo_3_q1` | 5 | [MAT.5.3.1] | **Önerilen** | `line_system` | 15 cm uzunluğunda sınır noktaları olan doğru ... | Ölçülebilir doğru parçası ile sonsuza uzanan doğru... | **P1B** | `svgGeometryEngine` |
| **16** | `exam_5_matematik_1_1_senaryo_3_q2` | 5 | [MAT.5.3.3] | **Önerilen** | `angle_model` | Makas modeli: 1. Konum 40° dar açı yaylı koll... | Açı açıklığı arttıkça dar açıdan geniş açıya geçiş... | **P1A** | `svgGeometryEngine` |
| **17** | `exam_5_matematik_1_1_senaryo_3_q3` | 5 | [MAT.5.3.3] | **Zorunlu** | `angle_model` | 90° dik açı kolları [BA ve [BC, köşeden çıkan... | Tümler komşu açıların dik açı içindeki geometrik k... | **P1A** | `svgGeometryEngine` |
| **18** | `exam_5_matematik_1_1_senaryo_3_q4` | 5 | [MAT.5.3.4] | **Önerilen** | `line_system` | Tek bir çizgi üzerinde çakışık d1 ve d2 doğru... | Çakışık doğruların tüm noktalarının ortak olduğunu... | **P1B** | `svgGeometryEngine` |
| **19** | `exam_5_matematik_1_1_senaryo_3_q5` | 5 | [MAT.5.3.4] | **Zorunlu** | `line_system` | a, b ve c doğrularının düzlemde ikişer ikişer... | Üç doğrunun düzlemde oluşturabileceği kesişim duru... | **P1A** | `svgGeometryEngine` |
| **20** | `exam_5_matematik_1_1_senaryo_3_q7` | 5 | [MAT.5.3.6] | **Önerilen** | `polygon_2d` | ABC dik üçgeni, C köşesinde diklik karesi, A ... | Dik üçgende dar açıların tümler olduğunu (32° + ? ... | **P1A** | `svgGeometryEngine` |
| **21** | `exam_5_matematik_1_1_senaryo_4_q1` | 5 | [MAT.5.3.1] | **Önerilen** | `line_system` | Duvarda iki çivi arası gergin ip [AB] (doğru ... | Gerçek yaşam nesneleriyle geometrik soyut kavramla... | **P1B** | `svgGeometryEngine` |
| **22** | `exam_5_matematik_1_1_senaryo_4_q2` | 5 | [MAT.5.3.2] | **Zorunlu** | `grid_coordinate` | O merkezli pergel çizimi, 6 cm yarıçaplı dair... | Pergelin sabit açıklığının çember üzerindeki tüm n... | **P1A** | `svgGeometryEngine` |
| **23** | `exam_5_matematik_1_1_senaryo_4_q3` | 5 | [MAT.5.3.3] | **Önerilen** | `angle_model` | Sabit taban kolu [OA, 60° açılmış kol [OB1, 1... | Açının bir kolun dönme miktarı ile oluştuğu dinami... | **P1A** | `svgGeometryEngine` |
| **24** | `exam_5_matematik_1_1_senaryo_4_q4` | 5 | [MAT.5.3.3] | **Zorunlu** | `angle_model` | Doğrusal taban çizgisi, üzerindeki O noktasın... | Bütünler komşu açıların toplamının 180° olduğunu (... | **P1A** | `svgGeometryEngine` |
| **25** | `exam_5_matematik_1_1_senaryo_4_q5` | 5 | [MAT.5.3.4] | **Önerilen** | `line_system` | İki yatay paralel ray çizgisi d1 // d2, onlar... | Hemzemin geçit modeli üzerinden paralel ve dik doğ... | **P1B** | `svgGeometryEngine` |
| **26** | `exam_5_matematik_1_1_senaryo_4_q6` | 5 | [MAT.5.3.5] | **Önerilen** | `polygon_2d` | ABCDE düzgün beşgeni, A köşesinden C ve D köş... | Bir köşeden çizilebilecek köşegen sayısını (n-3 ku... | **P1A** | `svgGeometryEngine` |
| **27** | `exam_5_matematik_1_1_senaryo_5_q1` | 5 | [MAT.5.3.1] | **Önerilen** | `line_system` | A ve B sınır noktaları, |AB|=20 cm ölçü oku v... | Doğru parçasının iki uçtan sınırlı olduğunu ve uzu... | **P1B** | `svgGeometryEngine` |
| **28** | `exam_5_matematik_1_1_senaryo_5_q2` | 5 | [MAT.5.3.2] | **Zorunlu** | `line_system` | d doğrusu, dışındaki P noktası, P noktasından... | Bir doğruya dışındaki bir noktadan dikme çizme geo... | **P1A** | `svgGeometryEngine` |
| **29** | `exam_5_matematik_1_1_senaryo_5_q3` | 5 | [MAT.5.3.3] | **Zorunlu** | `angle_model` | Yarım daire iletki (açıölçer) şablonu, merkez... | Açıölçer aracını okuma ve açı kolunun derece karşı... | **P1A** | `svgGeometryEngine` |
| **30** | `exam_5_matematik_1_1_senaryo_5_q4` | 5 | [MAT.5.3.3] | **Önerilen** | `angle_model` | İki analog saat: Saat 06.00 (180° doğru açı) ... | Saat kolları ile doğru açı (180°) ve dar açı (60°)... | **P1B** | `svgGeometryEngine` |
| **31** | `exam_5_matematik_1_1_senaryo_5_q5` | 5 | [MAT.5.3.4] | **Önerilen** | `line_system` | k ve l paralel doğruları, aralarındaki dik uz... | Paralel doğruların düzlemde hiçbir zaman kesişmedi... | **P1B** | `svgGeometryEngine` |
| **32** | `exam_5_matematik_1_1_senaryo_5_q6` | 5 | [MAT.5.3.4] | **Zorunlu** | `line_system` | Tek bir O noktasından geçen d1, d2 ve d3 doğr... | Üç doğrunun tek bir noktada kesişme (noktadaş olma... | **P1A** | `svgGeometryEngine` |
| **33** | `exam_6_matematik_1_1_senaryo_1_q2` | 6 | [MAT.6.1.2] | **Gereksiz** | `non_geometry` | Görsel gerekmez (Aritmetik bölünebilme kuralı... | Soru saf basamak analizi ve 3 ile 5 bölünebilme ku... | **-** | `Yok (Elendi)` |
| **34** | `exam_6_matematik_1_1_senaryo_1_q3` | 6 | [MAT.6.1.2] | **Gereksiz** | `non_geometry` | Görsel gerekmez (9 ile bölünebilme kuralı).... | Rakamlar toplamı kuralına dayalı cebirsel/aritmeti... | **-** | `Yok (Elendi)` |
| **35** | `exam_6_matematik_1_1_senaryo_2_q1` | 6 | [MAT.6.1.1] | **Önerilen** | `area_perimeter` | Temsili dikdörtgen ABCD, kısa kenar a, uzun k... | Alanı 60 cm² olan dikdörtgenin kenar çarpan çiftle... | **P1B** | `svgGeometryEngine` |
| **36** | `exam_6_matematik_1_1_senaryo_2_q2` | 6 | [MAT.6.1.2] | **Gereksiz** | `non_geometry` | Görsel gerekmez (6 ile bölünebilme).... | Aritmetik basamak analizi sorusu; geometrik bağlam... | **-** | `Yok (Elendi)` |
| **37** | `exam_6_matematik_1_1_senaryo_3_q3` | 6 | [MAT.6.1.2] | **Gereksiz** | `non_geometry` | Görsel gerekmez (10 ve 3 ile bölünebilme).... | Sayının son basamağı ve rakamlar toplamı kuralıdır... | **-** | `Yok (Elendi)` |
| **38** | `exam_6_matematik_1_1_senaryo_3_q4` | 6 | [MAT.6.1.2] | **Gereksiz** | `non_geometry` | Görsel gerekmez (Kalan aritmetiği).... | Kalanlar toplamı aritmetiğidir; şekil veya grafik ... | **-** | `Yok (Elendi)` |
| **39** | `exam_6_matematik_1_1_senaryo_3_q5` | 6 | [MAT.6.1.3] | **Gereksiz** | `non_geometry` | Görsel gerekmez (Çarpan ağacı çizimini öğrenc... | Soru öğrencinin çarpan ağacını kendisinin kurmasın... | **-** | `Yok (Elendi)` |
| **40** | `exam_6_matematik_1_1_senaryo_3_q6` | 6 | [MAT.6.1.4] | **Önerilen** | `area_perimeter` | 40m x 56m dikdörtgen bahçe planı, köşelerdeki... | Dikdörtgen çevre ve EBOB ilişkisini fidan aralıkla... | **P1A** | `svgGeometryEngine` |
| **41** | `exam_7_matematik_1_1_senaryo_1_q1` | 7 | [MAT.7.1.1] | **Gereksiz** | `non_geometry` | Geometri değil (Kutup canlıları sıcaklıkları ... | Tam sayıların karşılaştırılması sorusudur; geometr... | **-** | `Yok (Elendi)` |
| **42** | `exam_7_matematik_1_1_senaryo_1_q5` | 7 | [MAT.7.1.3] | **Gereksiz** | `non_geometry` | Geometri değil (7/15, 9/10, 4/7 rasyonel sıra... | Rasyonel sayı karşılaştırmasıdır; kesir modeli vey... | **-** | `Yok (Elendi)` |
| **43** | `exam_7_matematik_1_1_senaryo_2_q3` | 7 | [MAT.7.1.3] | **Gereksiz** | `non_geometry` | Geometri değil (1000m yarış süreleri 7/4, 11/... | Rasyonel sayılarda payda eşitleme ve süre sıralama... | **-** | `Yok (Elendi)` |
| **44** | `exam_8_matematik_1_1_senaryo_1_q2` | 8 | [M.8.1.1.2] | **Önerilen** | `area_perimeter` | 48m x 60m dikdörtgen bahçe şeması, köşe fidan... | EBOB problemini (fidan aralığı 12m) dikdörtgen ara... | **P1A** | `svgGeometryEngine` |
| **45** | `exam_8_matematik_1_1_senaryo_3_q6` | 8 | [M.8.1.2.2] | **Önerilen** | `area_perimeter` | Dikdörtgen pano modeli, kısa kenar 4⁴ cm, uzu... | Üslü ifadelerle alan hesabını (2⁸ x 2⁹ = 2¹⁷) dikd... | **P1B** | `svgGeometryEngine` |
| **46** | `exam_8_matematik_1_1_senaryo_5_q1` | 8 | [M.8.1.1.1] | **Önerilen** | `area_perimeter` | Alanı 36 cm² olan temsili dikdörtgenler: ince... | Alanı sabit olan dikdörtgenlerde kenarlar birbirin... | **P1B** | `svgGeometryEngine` |
| **47** | `exam_8_matematik_1_1_senaryo_5_q2` | 8 | [M.8.1.1.2] | **Zorunlu** | `area_perimeter` | 120 cm x 180 cm dikdörtgen banyo zemini, 60x6... | EBOB ile zemin kaplama (tessellation) problemini t... | **P1A** | `svgGeometryEngine` |
| **48** | `fallback_matematik_7_MAT_7_1_3_26` | 7 | [MAT.7.1.3] | **Gereksiz** | `non_geometry` | Geometri değil (7/15, 9/10, 4/7 yarıma ve büt... | Rasyonel sayı zihinden karşılaştırma stratejisidir... | **-** | `Yok (Elendi)` |
| **49** | `fallback_matematik_7_MAT_7_1_4_27` | 7 | [MAT.7.1.4] | **Gereksiz** | `non_geometry` | Geometri değil (Denizaltı derinlik 3/4 km ini... | Dikey sayı doğrusu / yönlü rasyonel sayı hareketid... | **-** | `Yok (Elendi)` |
| **50** | `fallback_matematik_7_MAT_7_1_4_28` | 7 | [MAT.7.1.4] | **Gereksiz** | `non_geometry` | Geometri değil (İşlem önceliği adım analizi).... | İşlem adımları soru metninde zaten açıkça verilmiş... | **-** | `Yok (Elendi)` |
| **51** | `fallback_matematik_7_MAT_7_1_1_29` | 7 | [MAT.7.1.1] | **Gereksiz** | `non_geometry` | Geometri değil (Mert harçlık kartı borç/alaca... | Yönlü tam sayılarla bütçe modellemesidir; geometri... | **-** | `Yok (Elendi)` |
| **52** | `fallback_matematik_7_MAT_7_1_4_35` | 7 | [MAT.7.1.4] | **Gereksiz** | `non_geometry` | Geometri değil (Gençtürk ailesi enerji gideri... | Tam sayılarla toplama/çıkarma işlemidir; geometri ... | **-** | `Yok (Elendi)` |
| **53** | `fallback_matematik_7_MAT_7_2_1_37` | 7 | [MAT.7.2.1] | **Önerilen** | `area_perimeter` | Dikdörtgen basketbol sahası, uzun kenar (5x+3... | Cebirsel ifadelerle çevre modellemesini somut saha... | **P1A** | `svgGeometryEngine` |

---

## 4. Ortak Geometri Görsel Motoru (`svgGeometryEngine`) Teknik Mimarisi

Tasarlanan `svgGeometryEngine`, mevcut `QuestionVisualView.tsx` bileşeniyle tam uyumlu, deterministik, güvenli ve responsive bir vektör üretim motorudur.

### 4.1. Veri Modeli ve TypeScript Spesifikasyonu (`src/types/index.ts`)
Mevcut `QuestionVisual` discriminated union yapısına `type: 'geometry_shape'` ile entegre edilecek tip hiyerarşisi aşağıda tanımlanmıştır:

```typescript
// =============================================================================
// GEOMETRİ GÖRSEL MOTORU TİP TANIMLARI (geometryShapeEngine)
// =============================================================================

export type GeometrySubType =
  | 'line_system'       // Doğru, doğru parçası, ışın, paralel/dik/kesişen doğrular
  | 'angle_model'       // Açı çeşitleri, saat kadranı, tümler/bütünler açılar, iletki
  | 'polygon_2d'        // Üçgenler, dörtgenler, çokgenler, köşegenler, iç açılar
  | 'grid_coordinate'   // Kareli zemin (grid), öteleme, noktanın konumu, pergel
  | 'area_perimeter';   // Dikdörtgen çevre/alan, fidan dikimi (EBOB), fayans ızgara

export interface Point2D {
  id?: string;
  x: number;
  y: number;
  label?: string;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right' | 'top_left' | 'top_right' | 'bottom_left' | 'bottom_right';
  isClosed?: boolean;   // Dolu nokta (doğru parçası sınırı için)
  color?: string;
}

export interface LineItem {
  id?: string;
  type: 'line' | 'segment' | 'ray';
  from: Point2D;
  to: Point2D;
  label?: string;
  isDashed?: boolean;
  hasArrowStart?: boolean;
  hasArrowEnd?: boolean;
  strokeWidth?: number;
  color?: string;
  lengthLabel?: string; // Örn: '20 cm'
}

export interface AngleItem {
  id?: string;
  vertex: Point2D;      // Köşe noktası
  startAngleDeg: number;// Başlangıç açısı (derece)
  endAngleDeg: number;  // Bitiş açısı (derece)
  radius?: number;      // Açı yayının yarıçapı
  isRightAngle?: boolean; // 90° diklik karesi ve nokta sembolü
  degreeLabel?: string; // Örn: '35°', '90°' veya soru işareti '?' (cevabı ele vermemek için)
  color?: string;
}

export interface PolygonItem {
  id?: string;
  vertices: Point2D[];
  isClosed?: boolean;   // Çokgen olma şartı (kapalı/açık kontrolü)
  hasCurveEdge?: boolean; // Çokgen olmama testi (eğri kenar kontrolü)
  fill?: string;
  strokeColor?: string;
  edgeLabels?: string[];// Kenar uzunlukları (a, b veya 40m, 56m)
  interiorAngles?: AngleItem[]; // İç açı yayları
  diagonals?: { fromIdx: number; toIdx: number; isDashed?: boolean }[]; // Köşegenler
}

export interface ClockItem {
  hour: number;         // 1 - 12
  minute: number;       // 0 - 59
  angleLabel?: string;  // Örn: '90° (Dik Açı)'
  showDialNumbers?: boolean;
}

export interface GridParams {
  cols: number;
  rows: number;
  cellSize: number;
  showAxes?: boolean;
  origin?: { x: number; y: number };
}

export interface TessellationParams {
  totalWidth: number;
  totalHeight: number;
  tileWidth: number;
  tileHeight: number;
  widthLabel: string;
  heightLabel: string;
  tileLabel?: string;
}

export interface GeometryShapeVisualParams {
  subType: GeometrySubType;
  title?: string;
  viewBoxWidth?: number;  // Varsayılan: 600
  viewBoxHeight?: number; // Varsayılan: 360
  isProportional?: boolean; // true: Matematiksel ölçekli, false: Temsili çizim ("Şekil temsilidir")
  
  // Alt türlere özel parametre blokları (yalnızca ilgili alt tür kullanılır)
  lines?: LineItem[];
  angles?: AngleItem[];
  polygons?: PolygonItem[];
  clocks?: ClockItem[];
  grid?: GridParams;
  points?: Point2D[];
  tessellation?: TessellationParams;
  
  note?: string; // Dipnot, örn: 'Şekil temsilidir ve ölçeksizdir.'
}

export interface GeometryShapeVisual extends BaseVisual {
  type: 'geometry_shape';
  params: GeometryShapeVisualParams;
}
```

### 4.2. İki Aşamalı Doğrulama ve Render Dağıtıcı Entegrasyonu

Motor, `src/utils/svgMathEngine.ts` içerisindeki ana dağıtıcıya (`renderQuestionVisual`) şu şekilde bağlanacaktır:

```typescript
// svgMathEngine.ts içine entegrasyon akışı:
case 'geometry_shape': {
  // 1. AŞAMA: Matematiksel ve Geometrik Parametre Doğrulaması
  const geomValidation = validateGeometryParams(visual.params);
  if (!geomValidation.isValid) {
    return {
      svg: generateFallbackSvg(geomValidation.reason),
      isValid: false,
      errorReason: geomValidation.reason
    };
  }

  // 2. AŞAMA: Güvenli Vektörel SVG Üretimi
  const svg = generateGeometrySvg(visual.params, options);
  return { svg, isValid: true };
}
```

### 4.3. Ölçek, Oran ve Cevap Güvenliği İlkeleri

1. **Cevabı Ele Vermeme Kuralı (Anti-Leak Principle):**
   - Soru öğrencinin bulmasını istediği bir açıyı (örn: KLM üçgeninde üçüncü açı $m(\widehat{M})$) soruyorsa, açı yayına kesinlikle $60^\circ$ yazılmaz; `degreeLabel: '?'` veya `degreeLabel: 'x'` kullanılır.
   - Öğrencinin kendisinin inşa etmesi gereken çarpan ağacı gibi modeller önceden çizilmez.
2. **Temsili Çizim vs. Hassas Ölçek:**
   - Temel açı ve saat kadranı modellerinde açı yayları ve akrep-yelkovan rotasyonu **tam matematiksel trigonometrik oranla** (sin, cos) çizilir.
   - Büyük araziler ($40\text{m} \times 56\text{m}$) veya üslü ifadeler ($4^4 \times 8^3$) ekran en-boy oranına sığdırılmak için temsili çizilir ve SVG altına otomatik olarak *'Not: Şekil temsilidir, ölçeksizdir.'* pedagojik uyarısı basılır.
3. **XSS ve Güvenlik:**
   - Tüm metin etiketleri (`label`, `degreeLabel`, `lengthLabel`) `escapeXml()` fonksiyonundan geçirilir.
   - Renkler W3C uyumlu `resolveSvgColor()` sözlüğüyle sınırlandırılır; keyfi CSS/JS enjeksiyonu engellenir.
4. **Mobil ve Baskı Uyumluluğu:**
   - Konteyner `w-full max-w-[640px] mx-auto`, `overflow-x-auto` koruması ve minimum 440px mobil ölçekleme tabanı ile taşmayı önler.
   - `@media print` ortamında renkli dolgular siyah-beyaz yüksek kontrastlı konturlara (#0f172a) ve açık gri dolgulara dönüştürülür.

---

## 5. Doğrulanan Bulgular, Varsayımlar, Eksikler ve Başarısız Kontroller

### 5.1. Doğrulanan Bulgular
- Görev 117 envanterindeki 53 sorunun 39 adedi (%73,6) matematiksel olarak tutarlı, pedagojik açıdan yüksek katma değerli hakiki geometri sorularıdır.
- 5. Sınıf Geometri müfredatının (`[MAT.5.3.1]` - `[MAT.5.3.7]`) tamamı (32 soru) bu yeni geometri motoru tarafından kapsanabilecektir.
- Tasarlanan mimari, mevcut `QuestionVisualView.tsx` bileşenini kırmadan, sıfır TypeScript hatasıyla sisteme entegre olabilecek düzeydedir.

### 5.2. Varsayımlar
- Geometri motorunun çalışma zamanı ortamında modern tarayıcı SVG DOM ayrıştırıcısının (`dangerouslySetInnerHTML`) standart SVG 1.1 / 2.0 standartlarını desteklediği varsayılmıştır.
- Temsili çizimlerde öğrencinin şekil üzerindeki etiketleri metinle birlikte okuyacağı varsayılmıştır.

### 5.3. Eksikler (Gelecek Fazlar İçin Ayrılanlar)
- 3 boyutlu katı cisimler (küp, silindir, prizma açınımları) bu fazda P1 motoruna dahil edilmemiş, P4 özel motor kapsamına bırakılmıştır.
- Koordinat düzleminde 4 bölgeli analitik geometri (8. sınıf koordinat sistemi), bu fazdaki 5. sınıf tek bölgeli kareli zemin grid motorundan ayrı tutulmuştur.

### 5.4. Başarısız / Elenen Kontroller (14 Geometri Dışı Soru)
- **Bölünebilme Soruları (5 Soru):** `exam_6_matematik_1_1_senaryo_1_q2`, `q3`, `exam_6_matematik_1_1_senaryo_2_q2`, `exam_6_matematik_1_1_senaryo_3_q3`, `q4`. Bu sorular aritmetik basamak kurallarıdır; geometri motoruyla çizilmesi pedagojik kavram karmaşası yaratacağından elenmiştir.
- **Çarpan Ağacı (1 Soru):** `exam_6_matematik_1_1_senaryo_3_q5`. Çarpan ağacı geometri değil, hiyerarşik sayı şemasıdır; ayrıca cevabı ifşa etmeme kuralı gereğince hazır çizilmemelidir.
- **Sayı ve Cebir Problemleri (8 Soru):** Kutup canlıları, rasyonel sıralama, atletizm süresi, denizaltı derinliği, harçlık ve enerji bütçesi. Bu sorular geometri motoruna değil, sayı doğrusu veya metin soru yapısına aittir.

---

## 6. Sonuç ve Teslimat Bilgisi

Görev 120 başarıyla tamamlanmıştır. Rapor ve CSV envanteri hem proje dizininde hem de Downloads klasöründe eksiksiz oluşturulmuştur:

* **Fiziksel Rapor (Downloads):** `/Users/mesutduran/Downloads/120_OYSS_P1_GEOMETRI_ENVANTERI_VE_MOTOR_TASARIMI.md`  
* **Fiziksel Envanter CSV (Downloads):** `/Users/mesutduran/Downloads/120_OYSS_P1_GEOMETRI_SORULARI_ENVANTERI.csv`  
* **Proje İçi Rapor:** `docs/analysis/120_OYSS_P1_GEOMETRI_ENVANTERI_VE_MOTOR_TASARIMI.md`  
* **Proje İçi CSV:** `docs/analysis/120_OYSS_P1_GEOMETRI_SORULARI_ENVANTERI.csv`  
* **Durum:** Salt analiz ve tasarım tamamlandı; hiçbir kaynak kod dosyası değiştirilmedi.  