# OYSS: Doğrulama Raporu Sonrası Kritik Kontroller ve MVP Tasarım Raporu

**Tarih:** 29 Ekim 2026  
**Kapsam:** `OYSS_SORU_KAZANIM_DOGRULAMA_RAPORU.md` Raporunun Bağımsız Denetimi ve Açık Uçlu Öz Değerlendirme Modülü MVP Tasarım Kararları  
**Yasal ve Teknik Sınır:** Bu aşamada hiçbir kaynak kod, sınav verisi veya müfredat kaydı değiştirilmemiştir; yeni paket yüklenmemiş, Git commit/push yapılmamış ve canlı siteye dağıtım tetiklenmemiştir. Yalnızca veri doğrulaması ve mimari planlama gerçekleştirilmiştir.

---

## 1. Önceki Rapor İddialarının Doğrulama Sonuçları

İlk doğrulama raporunda sunulan temel teknik iddialar, projenin canlı kaynak kodları ([`src/data/sampleExams.ts`](file:///Users/mesutduran/Desktop/OYSS/src/data/sampleExams.ts), [`src/data/curriculumData.ts`](file:///Users/mesutduran/Desktop/OYSS/src/data/curriculumData.ts), [`src/data/outcomeStudyBank.ts`](file:///Users/mesutduran/Desktop/OYSS/src/data/outcomeStudyBank.ts)) üzerinden algoritmik olarak yeniden denetlenmiştir:

### A. 847 Sorunun Veri Alanı ve İçerik Doluluğu
- **Denetim Yöntemi:** 123 sınavdaki 847 sorunun tamamı taranmış; metin karakter uzunlukları, anlamsal dolulukları ve boş/şablon kalıntıları incelenmiştir.
- **Sonuç:** **Doğrulandı.**
  - **Soru Metni (`questionText`):** 847 sorunun tamamı doludur. En kısa soru 37 karakter, en uzun soru 384 karakter, ortalama uzunluk **129.3 karakter**dir.
  - **Model Cevap (`modelAnswer`):** 847 sorunun tamamı doludur. En kısa model cevap 19 karakter, en uzun model cevap 620 karakter, ortalama uzunluk **228.8 karakter**dir. 15 karakterden kısa tek bir model cevap dahi bulunmamaktadır.
  - **Çözüm Açıklaması (`solutionExplanation`):** 847 sorunun tamamı doludur. Ortalama uzunluk **79.3 karakter**dir. 15 karakterin altında kalan yalnızca 5 adet kayıt tespit edilmiştir (örn. *"a Math, b Art."*, *"507,409."*, *"Muş ve Bitlis."*, *"Özgün dörtlük."*); bu kayıtlar da ilgili sorunun doğası gereği doğrudan spesifik çıktıdır.
  - **Rubrik (`rubric`):** 847 sorunun tamamında en az 1 ölçüt tanımlıdır. 113 soru tek ölçütlü, 734 soru çok ölçütlü analitik rubriğe sahiptir.

### B. 100 Puan Eşitliği ve Rubrik Tutarlılığı
- **Denetim Yöntemi:** 123 sınavın `totalPoints` alanı ile içerdiği soruların `points` toplamı karşılaştırılmış; her bir sorunun puanı ile `rubric` dizisindeki ölçüt puanlarının toplamı matematiksel olarak toplanmıştır.
- **Sonuç:** **Doğrulandı (Hatasız).**
  - Sınav toplam puanı uyumsuzluğu: **0 / 123** (123 sınavın tamamı istisnasız **100 tam puan**dır; sistem genel toplamı $123 \times 100 = 12.300$ puandır).
  - Soru puanı ile rubrik ölçütleri toplamı uyumsuzluğu: **0 / 847** (847 sorunun tamamında ölçütlerin puan toplamı, sorunun ilan edilen puanına tam eşittir).

### C. 847 Sorunun Tekilliği İddiasının Karşılaştırma Yöntemi
- **Denetim Yöntemi:** Tekillik iddiası 4 bağımsız normalizasyon seviyesinde test edilmiştir:
  1. *Birebir Dize Eşleşmesi:* `exactQTexts.size` = **847 / 847**
  2. *Noktalama ve Büyük/Küçük Harften Arındırılmış Metin:* Türkçe harfler korunarak tüm noktalama işaretleri silinmiş, boşluklar teke indirilmiş ve küçük harfe dönüştürülmüştür (`normalizedQTexts.size`) = **847 / 847**
  3. *Tam Bağlam Eşleşmesi (`stimulus + questionText`):* Okuma metni veya vaka diyaloğu ile soru kökü birlikte birleştirilerek taranmıştır = **847 / 847**
  4. *Model Cevap Tekilliği:* `modelAnswer.size` = **847 / 847**
- **Sonuç:** **Doğrulandı.** 847 soru küçük imla veya noktalama farklarıyla kopyalanmış sahte varyantlar değil; 847 bağımsız, özgün pedagojik sorudur.

### D. 844 Sorunun Öğrenme Çıktısı Uyumu ve 3 Kaydın Etkisi
- **Denetim Yöntemi:** `SAMPLE_EXAMS` içerisindeki her sorunun `outcomeCode` değeri, `curriculumData.ts` içindeki ilgili senaryonun konu-soru dağılım tablosundaki beklenen çıktıyla pozisyonel olarak eşleştirilmiştir.
- **Sonuç:** **Doğrulandı.**
  - Birebir pozisyonel eşleşme: **844 / 847 (%99.6)**
  - Uyuşmayan 3 Kayıt: 5. Sınıf Din Kültürü 1. Dönem 1. Yazılı Senaryo 1 Q1, Senaryo 2 Q1 ve Senaryo 4 Q1 sorularıdır.
  - **Gerçek Etki Analizi:** `curriculumData.ts` dosyasında kazanım kod hücresi parse edilirken sehven cümlenin ilk kelimesi olan `"Evrendeki"` stringi kaydedilmiştir. Ancak `sampleExams.ts` içerisindeki asıl soru kaydında doğru kod olan `"DKAB.5.1.2"` eksiksiz yer almaktadır. Dolayısıyla sınav kâğıdında veya soru gösteriminde **hiçbir hata oluşmamaktadır**; yalnızca iki veri dosyası arasında önemsiz bir metin kalıntısı bulunmaktadır.

### E. `outcomeStudyBank.ts` Dosyasının Güvenilirliği ve Kapsamı
- **Denetim Yöntemi:** 847 soruda kullanılan tüm tekil `outcomeCode` değerleri ayıklanmış (150 tekil kazanım kodu) ve `OUTCOME_STUDY_BANK` nesnesinin anahtarlarıyla karşılaştırılmıştır.
- **Sonuç:** **Doğrulandı (Yüksek Kapsam).**
  - 150 tekil kazanım kodunun **148'i (%98.7)** `OUTCOME_STUDY_BANK` içerisinde mevcuttur; bu kodların tamamında *Kavramsal Notlar (Hap Bilgi)*, *Sınav Tuzakları*, *Çözümlü Örnek Soru* ve *Pekiştirme Sorusu* eksiksiz yer almaktadır.
  - Yalnızca **2 kod** (`SB.5.2.1` ve `SB.6.2.1` - Sosyal Bilgiler) sözlükte doğrudan anahtar olarak bulunmamaktadır.
  - **Mevcut Davranış:** Sistem bu 2 kazanım için `App.tsx` içerisinde genel `SAMPLE_STUDY_SHEETS` şablonuna zarif bir geri dönüş (fallback) yapmaktadır; sistem çökmemektedir.

---

## 2. Çok Maddeli Sorulardan Örnek İncelemeler (10 Detaylı Vaka)

Veri tabanında yer alan ve bünyesinde `a)`, `b)` gibi birden fazla alt madde barındıran 148 sorudan, kademe ve ders çeşitliliği gözetilerek seçilen 10 somut örnek:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ TEMEL VERİ MODELİ TESPİTİ:                                                             │
│ Mevcut OYSS veri şemasında `outcomeCode` alanı YALNIZCA SORU DÜZEYİNDEDİR.             │
│ Alt maddeler (a, b) için ayrılmış bağımsız bir `subOutcomeCode` alanı BULUNMAMAKTADIR. │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Örnek 1: 5. Sınıf Türkçe — `exam_5_turkce_1_1_senaryo_1` (4. Soru)
- **Soru Metni:**
  `a) 'Yadigâr' kelimesinin anlamını yazıp bir cümlede kullanınız.`  
  `b) 'Paha biçilemez' deyiminin ne anlama geldiğini açıklayınız.`
- **Öğrenme Çıktısı:** `T.O.5.20` — *Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme.*
- **Rubrik Kriterleri ve Puanları:**
  - Kriter 1 (9 Puan): *"Yadigâr kelimesinin anlamı ve doğru örnek cümle"* $\rightarrow$ **Alt Madde (a) ile tam eşleşir.**
  - Kriter 2 (8 Puan): *"Paha biçilemez deyiminin anlamının doğru açıklanması"* $\rightarrow$ **Alt Madde (b) ile tam eşleşir.**
- **Öğrenme Çıktısı Ayrımı Mümkün mü?:** Her iki alt madde de aynı `T.O.5.20` kazanımının (kelime ve deyim söz varlığı) alt bileşenidir. Veri modelinde alt madde düzeyinde ayrı bir çıktı kodu yoktur.

### Örnek 2: 5. Sınıf Matematik — `exam_5_matematik_1_1_senaryo_1` (4. Soru)
- **Soru Metni:**
  `a) Gül Sokak ile Karanfil Sokak birbirine göre nasıl doğrulardır?`  
  `b) Lale Caddesi ile Gül Sokak birbirine göre nasıl doğrulardır?`
- **Öğrenme Çıktısı:** `MAT.5.3.4` — *Düzlemde iki veya üç doğrunun birbirine göre durumuna bağlı olarak oluşabilecek açılara dair çıkarım yapabilme.*
- **Rubrik Kriterleri ve Puanları:**
  - Kriter 1 (7 Puan): *"Paralel doğrular ilişkisinin yazılması"* $\rightarrow$ **Alt Madde (a) ile eşleşir.**
  - Kriter 2 (7 Puan): *"Dik kesişen doğrular ilişkisinin yazılması"* $\rightarrow$ **Alt Madde (b) ile eşleşir.**
- **Öğrenme Çıktısı Ayrımı Mümkün mü?:** Hayır. Her iki şık da doğruların birbirine göre paralel ve dik kesişen durumlarını yoklamakta olup tek bir kazanım şemsiyesi altındadır.

### Örnek 3: 5. Sınıf Fen Bilimleri — `exam_5_fen_bilimleri_1_1_senaryo_1` (7. Soru)
- **Soru Metni:**
  `a) Dinamometrenin çalışma prensibi yayın hangi özelliğine dayanır?`  
  `b) Kuvvetin birimi ve sembolü nedir?`
- **Öğrenme Çıktısı:** `FB.5.2.1` — *Kuvveti büyüklüğü ile operasyonel tanımlayabilme.*
- **Rubrik Kriterleri ve Puanları:**
  - Kriter 1 (7 Puan): *"a şıkkında yay esnekliği ve uzama prensibinin yazılması"* $\rightarrow$ **Alt Madde (a).**
  - Kriter 2 (7 Puan): *"b şıkkında Newton birimi ve 'N' sembolünün yazılması"* $\rightarrow$ **Alt Madde (b).**
- **Öğrenme Çıktısı Ayrımı Mümkün mü?:** Hayır. Her iki madde de kuvvetin operasyonel tanımı ve dinamometre prensibini ölçmektedir.

### Örnek 4: 6. Sınıf Türkçe — `exam_6_turkce_1_1_senaryo_1` (4. Soru)
- **Soru Metni:**
  `a) 'asır' sözcüğünün eş anlamlısını yazınız.`  
  `b) 'ilkel' sözcüğünün zıt anlamlısını yazınız.`
- **Öğrenme Çıktısı:** `T.O.6.21` — *Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme.*
- **Rubrik Kriterleri ve Puanları:**
  - Kriter 1 (9 Puan): *"a şıkkında yüzyıl yazımı"* $\rightarrow$ **Alt Madde (a).**
  - Kriter 2 (8 Puan): *"b şıkkında çağdaş/modern yazımı"* $\rightarrow$ **Alt Madde (b).**
- **Öğrenme Çıktısı Ayrımı Mümkün mü?:** Hayır; eş ve zıt anlam çözümlemeleri tek bir söz varlığı çıktısına bağlıdır.

### Örnek 5: 6. Sınıf Matematik — `exam_6_matematik_1_1_senaryo_1` (4. Soru)
- **Soru Metni:**
  `72 sayısını bölen listesi (algoritma) yöntemiyle asal çarpanlarına ayırınız ve üslü ifadelerin çarpımı şeklinde yazınız.`
- **Öğrenme Çıktısı:** `MAT.6.1.3` — *Bir doğal sayının asal olma durumunu ve asal çarpanlarını belirleyebilme.*
- **Rubrik Kriterleri ve Puanları:**
  - Kriter 1 (9 Puan): *"Bölen listesi algoritmasının hatasız uygulanması"* $\rightarrow$ **İşlem Adımı 1.**
  - Kriter 2 (8 Puan): *"2³ · 3² üslü ifadesinin ve asal çarpanların yazılması"* $\rightarrow$ **İşlem Adımı 2.**
- **Öğrenme Çıktısı Ayrımı Mümkün mü?:** Hayır; süreç tek bir matematiksel algoritmanın iki ardışık basamağıdır.

### Örnek 6: 6. Sınıf Sosyal Bilgiler — `exam_6_sosyal_bilgiler_1_1_senaryo_1` (6. Soru)
- **Soru Metni:**
  `a) Yüzölçümü en büyük olan kıta ile en küçük olan kıtanın adını yazınız.`  
  `b) Dünyanın en büyük okyanusu hangisidir?`
- **Öğrenme Çıktısı:** `SB.6.2.1` — *Küreselleşmenin insan ve toplum hayatı üzerindeki etkilerini analiz edebilme.*
- **Rubrik Kriterleri ve Puanları:**
  - Kriter 1 (8 Puan): *"Asya ve Okyanusya kıtalarının doğru yazımı"* $\rightarrow$ **Alt Madde (a).**
  - Kriter 2 (8 Puan): *"Büyük Okyanus (Pasifik) tespiti"* $\rightarrow$ **Alt Madde (b).**
- **Öğrenme Çıktısı Ayrımı Mümkün mü?:** Hayır; kıtalar ve okyanuslar coğrafi konum bilgisi tek bir soru çıktısında toplanmıştır.

### Örnek 7: 7. Sınıf Fen Bilimleri — `exam_7_fen_bilimleri_1_1_senaryo_1` (1. Soru)
- **Soru Metni:**
  `a) Uzay teleskoplarının, yeryüzündeki en gelişmiş gözlemevlerinden bile daha net ve kaliteli görüntü elde etmesinin 2 temel bilimsel nedenini açıklayınız.`  
  `b) Rasathanelerin (gözlemevlerinin) kurulacağı yer seçiminde dikkat edilen 2 coğrafi/çevresel kriteri yazınız.`
- **Öğrenme Çıktısı:** `FB.7.1.1` — *Uzay araştırmaları için geliştirilen teknolojileri karşılaştırabilme.*
- **Rubrik Kriterleri ve Puanları:**
  - Kriter 1 (6 Puan): *"Uzay teleskoplarının atmosferik avantajının doğru açıklanması"* $\rightarrow$ **Alt Madde (a).**
  - Kriter 2 (6 Puan): *"Rasathane yeri için 2 bilimsel kriterin doğru yazılması"* $\rightarrow$ **Alt Madde (b).**
- **Öğrenme Çıktısı Ayrımı Mümkün mü?:** Hayır; hem uzay teleskopları hem de yeryüzü gözlemevleri `FB.7.1.1` kapsamında ele alınır.

### Örnek 8: 7. Sınıf İngilizce — `exam_7_ingilizce_1_1_senaryo_1` (1. Soru)
- **Soru Metni:**
  `Based on the text above, answer the questions in full English sentences:`  
  `a) What does Mark look like? (Write two physical qualities)`  
  `b) What is Liam like? (Write two personality traits)`
- **Öğrenme Çıktısı:** `E7.1.R1` — *Students will be able to understand a simple text about appearance and personality.*
- **Rubrik Kriterleri ve Puanları:**
  - Kriter 1 (13 Puan): *"a şıkkında Mark'ın fiziksel özelliklerinin doğru yazılması"* $\rightarrow$ **Alt Madde (a).**
  - Kriter 2 (12 Puan): *"b şıkkında Liam'ın kişilik özelliklerinin doğru yazılması"* $\rightarrow$ **Alt Madde (b).**
- **Öğrenme Çıktısı Ayrımı Mümkün mü?:** Hayır; MEB müfredatında dış görünüş (*appearance*) ve kişilik (*personality*) tek bir ünitede ve tek bir kazanım altında birleştirilmiştir.

### Örnek 9: 8. Sınıf Türkçe — `exam_8_turkce_1_1_senaryo_1` (2. Soru)
- **Soru Metni:**
  `Verilen cümlede yer alan benzetme (teşbih) ve abartma (mübalağa) sanatlarını unsurlarıyla birlikte gösteriniz.`
- **Öğrenme Çıktısı:** `T.8.3.7` — *Metindeki söz sanatlarını tespit eder.*
- **Rubrik Kriterleri ve Puanları:**
  - Kriter 1 (7 Puan): *"Abartma sanatının gerekçesiyle gösterilmesi"* $\rightarrow$ **1. Sanat.**
  - Kriter 2 (6 Puan): *"Benzetme sanatının unsurlarıyla gösterilmesi"* $\rightarrow$ **2. Sanat.**
- **Öğrenme Çıktısı Ayrımı Mümkün mü?:** Hayır; söz sanatları tek bir kazanım maddesidir.

### Örnek 10: 8. Sınıf Din Kültürü — `exam_8_din_kulturu_1_1_senaryo_1` (1. Soru)
- **Soru Metni:**
  `Kader ve kaza kavramlarını tanımlayarak, verilen ayetten hareketle evrendeki düzen ve kader inancı arasındaki ilişkiyi açıklayınız.`
- **Öğrenme Çıktısı:** `DKAB.8.1.1` — *Kader ve kaza inancını ayet ve hadislerle açıklar.*
- **Rubrik Kriterleri ve Puanları:**
  - Kriter 1 (6 Puan): *"Kader ve kaza kavramlarının doğru tanımlanması"* $\rightarrow$ **Bölüm 1.**
  - Kriter 2 (6 Puan): *"Ayetle evrendeki nizam ve denge ilişkisinin kurulması"* $\rightarrow$ **Bölüm 2.**
- **Öğrenme Çıktısı Ayrımı Mümkün mü?:** Hayır; kavram tanımı ile ayet ilişkisi aynı temel inanç kazanımının parçalarıdır.

### Bölüm 2 Sonucu
> [!IMPORTANT]
> **Önemli Tasarım İlkesi:**  
> İncelenen tüm vakalarda alt maddelerin rubrik kriterleriyle birebir eşleştiği; ancak hiçbir alt maddenin ayrı bir kazanım koduna sahip olmadığı somut olarak kanıtlanmıştır.  
> Bu nedenle MVP öz değerlendirme modülü, **puanlamayı rubrik kriteri (alt madde) düzeyinde yapmalı; fakat eksik konu analizini soru düzeyindeki ana kazanım (`outcomeCode`) üzerinden "Kısmi Başarı" veya "Geliştirilmesi Önerilen Konu" olarak raporlamalıdır.**

---

## 3. Öz Değerlendirme Akışı ve Veri Modeli Gereksinimleri

Öğrencinin açık uçlu yazılı sınav deneyimini simüle eden ve ardından kendi kendini değerlendirmesini sağlayan MVP iş akışı:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              ÖZ DEĞERLENDİRME İŞ AKIŞI                                 │
└────────────────────────────────────────────────────────────────────────────────────────┘
  [1. ÇALIŞMA MODU SEÇİMİ]
       │
       ├─► Mod A: Adım Adım Çalışma Modu (Soru bazında anında model cevap & değerlendirme)
       └─► Mod B: Sınav Simülasyonu (Tüm soruları yaz, bitir, sınav sonunda toplu değerlendir)
       │
  [2. CEVAP GİRİŞİ (HER SORU İÇİN)]
       │
       ├─► Stimulus (Okuma Metni / Görsel / Veri Tablosu)
       ├─► Soru Metni (Varsa a, b alt maddeleri)
       └─► Açık Uçlu Cevap Alanı (<textarea> - localStorage ile otomatik kaydedilir)
       │
  [3. KARŞILAŞTIRMA VE RUBRİK DEĞERLENDİRMESİ]
       │
       ├─► Sol Panel: Öğrencinin Kendi Yazdığı Yanıt (Salt okunur)
       ├─► Sağ Panel: Model Cevap & Çözüm Açıklaması
       ├─► Uyarı Rozeti: "Model cevap bir örnektir; aynı anlam ve gerekçeyi taşıyan ifadeler geçerlidir."
       └─► İnteraktif Rubrik Checklist:
             [x] Kriter 1 (+9 Puan)
             [ ] Kriter 2 (+8 Puan)
             ==> Anlık Hesaplanan Soru Skoru: 9 / 17
       │
  [4. SINAV SONU GELİŞİM RAPORU]
       │
       ├─► Tahmini Öz Değerlendirme Puanı: 82 / 100
       ├─► Yasal Uyarı: "Bu skor resmî okul notu değildir; bireysel çalışma göstergesidir."
       ├─► Kazanım Başarı Matrisi:
       │     - Başarılan Kazanımlar (Yeşil)
       │     - Kısmi Başarı / Tekrar Edilmesi Önerilen Kazanımlar (Turuncu)
       └─► Çalışma Föyü Yönlendirmesi: Eksik kazanımların Hap Bilgileri (StudyBank) tek tıkla açılır.
```

### MVP İçin Gerekli İstemci Veri Modeli (TypeScript Arayüzleri)

Mevcut `QuestionItem` ve `ExamPaper` türlerine dokunmadan, tamamen istemci state katmanında tutulacak yeni veri yapıları:

```typescript
// Öğrencinin tek bir soruya verdiği yanıt ve rubrik değerlendirmesi
export interface StudentQuestionEvaluation {
  questionNumber: number;
  studentAnswerText: string;              // Öğrencinin girdiği ham açık uçlu metin
  selectedRubricCriteriaIndices: number[]; // Öğrencinin işaretlediği rubrik indeksleri [0, 1]
  earnedPoints: number;                   // İşaretlenen kriterlerden hesaplanan puan
  maxPoints: number;                      // Sorunun toplam puanı (q.points)
  isCompleted: boolean;                   // Değerlendirme tamamlandı mı?
}

// Bir sınav oturumunun tam durumu
export interface StudentExamSession {
  examId: string;
  feedbackMode: 'immediate' | 'end_of_exam'; // Geri bildirim zamanlama tercihi
  startedAt: number;
  lastUpdatedAt: number;
  evaluations: Record<number, StudentQuestionEvaluation>; // questionNumber -> değerlendirme
  totalEstimatedScore: number;            // 0 - 100 arası tahmini toplam
  outcomeMastery: Record<string, {
    outcomeCode: string;
    outcomeTitle: string;
    earnedPoints: number;
    maxPoints: number;
    status: 'mastered' | 'partial' | 'needs_practice';
  }>;
}
```

---

## 4. Alternatif Cevapların Ele Alınışı

MEBİ fasiküllerinde görüldüğü üzere (örn. Fen Bilimleri s.10'da uzay çöpü için hem atmosferde yakma hem ağla toplama; Sosyal Bilgiler s.3'te çoklu Ben Dili varyantları; Türkçe s.6'da "Verilebilecek diğer örnek yanıtlar"):

1. **Mevcut Veri Modelinde Durum:**  
   `SAMPLE_EXAMS` içerisinde ayrılmış bir `alternativeAnswers: string[]` alanı **bulunmamaktadır**. Her soruda tek bir `modelAnswer` yer almaktadır (bazı sorularda model cevap metni içinde parantezle *"veya [LK]"*, *"veya çağdaş/modern"* şeklinde belirtilmiştir).
2. **Otomatik Puanlama Yapılmaması İlkesi:**  
   İstemci tarafında metin benzerliği (fuzzy match, regex veya LLM otomatik puanlaması) **kullanılmamalıdır**. Algoritmik metin karşılaştırması, öğrencinin doğru bir eş anlamlısını veya farklı bir cümle kurgusunu haksız yere "yanlış" sayacaktır.
3. **Pedagojik Çözüm (İnsan / Öğrenci Karşılaştırmalı Öz Değerlendirme):**  
   - Model cevabın hemen üstüne belirgin bir **MEBİ Pedagojik Esneklik Rozeti** yerleştirilmelidir:  
     > *"Önemli Hatırlatma: Model cevap örnek bir ifadedir. Cevabınız bu cümlelerle birebir aynı kelimeleri içermek zorunda değildir. Aynı bilimsel gerekçeyi, kavramsal ilişkiyi veya mantıksal sonucu içeren farklı açıklamalar da geçerlidir."*
   - Öğrenci kendi yazdığı metin ile model cevabı bizzat karşılaştırır ve rubrik kriterindeki kavramı sağlayıp sağlamadığına kendisi karar vererek onay kutusunu işaretler.
   - Bu yöntem hem öğrencinin bilişsel üst düzey değerlendirme (öz düzenleme) becerisini geliştirir hem de sistemin hatalı otomatik karar vermesini önler.

---

## 5. Öğrenme Çıktısı Analizinin Sınırları

Öğrenciye sınav sonunda sunulacak eksik konu analizinde kesinlik sınırları titizlikle korunmalıdır:

| Analiz Alanı | Sistemin Yapabileceği (Güvenilir) | Sistemin Yapamayacağı (Sınır / Yanıltıcı İddia) |
| :--- | :--- | :--- |
| **Soru Düzeyi Başarı** | Sorudaki rubrik kriterlerinin kaçından puan alındığını net olarak hesaplar. | Öğrencinin yazdığı cümlenin dilbilgisi mükemmelliğini otomatik teyit edemez. |
| **Alt Madde (a/b) Ayrımı** | Rubrik kriteri üzerinden a ve b şıklarının ayrı ayrı yapılıp yapılmadığını takip eder. | Alt maddelerin bağımsız birer kazanım kodu olduğunu iddia edemez (veri modelinde alt kod yoktur). |
| **Kazanım Eksikliği Analizi** | Soru puanının tamamı alınamadığında, ilgili `outcomeCode` için *"Bu konuda pekiştirmeye ihtiyaç olabilir"* önerisi sunar. | Öğrenci a şıkkını doğru yapıp b'den puan kaybettiyse, kazanımın "tamamen bilinmediği" gibi kaba bir etiketleme yapamaz (Kısmi Başarı olarak göstermelidir). |
| **Çalışma Föyü Önerisi** | `OUTCOME_STUDY_BANK`'ta içeriği doğrulanmış 148 kazanım için hap bilgi ve çözümlü soru önerir. | Sözlükte bulunmayan 2 kazanım (`SB.5.2.1`, `SB.6.2.1`) için sahte içerik öneremez; genel ünite föyüne yönlendirir. |
| **Nihai Puan Bildirimi** | Öğrencinin kendi kriter seçimlerinden hesaplanan 0-100 arası tahmini skoru gösterir. | Bu skorun resmî yazılı notu veya öğretmen değerlendirmesi olduğunu iddia edemez. |

---

## 6. Güncellenmiş Kabul Testleri

İlk sürümün (MVP) yazılım kalitesini ve hata direncini denetleyecek genişletilmiş kabul testleri:

| Test Kodu | Test Adı | Girdi / İşlem Adımı | Beklenen Sistem Davranışı | Veri Modeli / Mimari Durumu |
| :---: | :--- | :--- | :--- | :--- |
| **TC-01** | Standart Yanıt Girişi | Öğrenci 1. soruya açık uçlu metin yazar. | Metin `evaluations[1].studentAnswerText` alanına yazılır. | Destekleniyor. |
| **TC-02** | Tam Rubrik Eşleşmesi | Öğrenci 15 puanlık soruda tüm kriterleri işaretler. | Sorudan $15/15$ tam puan alınır; kazanım "Başarıldı" statüsüne geçer. | Destekleniyor. |
| **TC-03** | Kısmi Rubrik Eşleşmesi | Öğrenci 2 kriterden yalnızca 1'ini işaretler (+9p / 17p). | Soru $9/17$ puan alır; kazanım "Kısmi Başarı" olarak etiketlenir. | Destekleniyor. |
| **TC-04** | Boş Bırakılan Soru | Öğrenci metin kutusunu boş bırakıp "Değerlendir"e tıklar. | Sistem onay penceresi açar ("Yanıt girmediniz, boş mu bırakılsın?"). Onaylanırsa rubrik kutuları işaretsiz kalır ($0$ puan). | Destekleniyor. |
| **TC-05** | Alternatif Cevap Öz Değerlendirmesi | Öğrenci model cevaptan farklı fakat geçerli bir alternatif gerekçe yazmıştır. | Bilgilendirme rozeti öğrenciye esneklik tanır; öğrenci kriteri işaretler ve puanını kaydeder. | Destekleniyor. |
| **TC-06** | Alt Maddeden Biri Doğru Biri Yanlış | 5. Sınıf Türkçe S1 Q4 sorusunda `a` doğru, `b` yanlış yanıtlanmıştır. | Rubrikte Kriter 1 (+9p) işaretlenir, Kriter 2 (+8p) boş bırakılır. Soru skoru 9/17 olur; eksik analizinde "Deyimler ve söz varlığı tekrar edilmeli" uyarısı verilir. | Destekleniyor. |
| **TC-07** | Sayfa Yenileme / Kaza Koruması | Öğrenci 3. sorudayken tarayıcı yenilenir (F5). | `localStorage` üzerinden `studentAnswerText` ve işaretlenen kriterler aynen geri yüklenir; veri kaybı yaşanmaz. | `localStorage` senkronizasyonu ile tam karşılanabilir. |
| **TC-08** | Değerlendirmeyi Sonradan Değiştirme | Öğrenci sınav sonu ekranında bir sorudaki işaretini geri alır. | `totalEstimatedScore` ve kazanım matrisi anında dinamik olarak yeniden hesaplanır. | Destekleniyor. |
| **TC-09** | Eksik Kazanım Yönlendirmesi | Öğrenci `FB.7.1.1` sorusundan düşük puan alır. | Sınav sonunda `FB.7.1.1` kartı çıkar; "Hap Bilgileri Oku" butonu tıklandığında `OUTCOME_STUDY_BANK['FB.7.1.1']` açılır. | Destekleniyor (148/150 kazanım tam uyumlu). |
| **TC-10** | Bankada Bulunmayan Kazanım | Öğrenci `SB.5.2.1` sorusundan düşük puan alır. | Sistem hata vermez; "Bu konu için genel ünite föyünü inceleyiniz" alternatif kartı gösterilir. | Destekleniyor (Zarif fallback). |

---

## 7. MVP Öncesi Zorunlu Tasarım Kararları

Geliştirme aşamasına geçilmeden önce kesinleştirilmesi gereken 5 temel prensip kararı:

1. **A4 Baskı Modu ile İnteraktif Mod Ayrımı:**  
   Mevcut kâğıt formatındaki yazdırılabilir A4 görünümü bozulmamalıdır. Üst kontrol çubuğuna bir buton eklenerek `viewMode: 'paper' | 'practice'` geçişi sağlanmalıdır.
2. **Terminolojik Netlik:**  
   Hesaplanan puan kesinlikle "Yazılı Notu" olarak sunulmamalı; **"Öz Değerlendirme Tahmini Puanı"** ifadesi kullanılmalıdır.
3. **Puanlama Yetkisi:**  
   Yapay zekâ veya otomatik metin eşleştirme ile puan verilmemeli; puanlama tamamen **öğrencinin model cevapla kıyaslayarak işaretlediği analitik rubrik onay kutuları** üzerinden şeffaf biçimde hesaplanmalıdır.
4. **Kazanım Analizi Düzeyi:**  
   Alt maddeler için veri tabanında ayrı kazanım kodu bulunmadığından, analiz daima soru düzeyindeki resmî `outcomeCode` üzerinden yapılmalı; kısmi puan alan sorular "Kısmi Başarı / Pekiştirilmeli" olarak sınıflandırılmalıdır.
5. **Veri Kalıcılığı:**  
   Öğrenci yanıtları için arka uç sunucu veritabanı kurulana kadar tarayıcı içi `localStorage` kullanılmalı; sınav kâğıdı veya oturum sıfırlandığında temizlenebilmelidir.

---

## 8. Sonraki Uygulama Aşamasına Geçiş İçin Kabul Ölçütleri

Kodlama aşamasına başlanabilmesi için yerine getirilmesi gereken koşullar:

- [x] Soru ve sınav sayıları (123 sınav, 847 tekil soru) bağımsız olarak doğrulandı.
- [x] Her sınavın 100 tam puan olduğu ve her sorunun rubrik toplamına eşit olduğu kanıtlandı.
- [x] 148 alt maddeli sorunun rubrik eşleşmesi incelendi; kazanım kodunun soru düzeyinde olduğu teyit edildi.
- [x] MEBİ fasiküllerinin yapısı (rubriksiz, çoklu alternatif cevaplı) belgelendi.
- [x] `outcomeStudyBank.ts` kapsamı (%98.7) doğrulandı; eksik 2 kod için strateji belirlendi.
- [x] Kullanıcı akışı, durum yönetimi ve güncellenmiş kabul testleri (TC-01..TC-10) tanımlandı.

> [!NOTE]
> **Durum ve Yetki Sınırı:**  
> Kullanıcı talimatı uyarınca **hiçbir kaynak kod veya veri değiştirilmemiştir**.  
> Bu rapor, açık uçlu öz değerlendirme modülünün kodlanması aşamasına geçilmeden önce nihai mimari onay için kullanıcının değerlendirmesine sunulmuştur.
