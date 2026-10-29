# OYSS: Etkileşimli Sınav Öz Değerlendirme Modülü Geliştirme Raporu

**Tarih:** 29 Ekim 2026  
**Kapsam:** İki Kademeli Öz Değerlendirme (Genel Kanaat + Analitik Rubrik), Pedagojik Öğrenci Rehberi, Varsayılan Sınav Sonu Modu ve Boş Cevap Güvenliği  
**Yasal ve Teknik Sınır:** Bu aşamada Git commit, push veya Netlify canlı dağıtımı **yapılmamıştır**. Yalnızca yerel kod geliştirilmiş, test edilmiş ve onay beklenmektedir.

---

## 1. Yönetici Özeti

OYSS etkileşimli açık uçlu sınav modülünde öğrencinin kendi öğrenme sürecini dürüstçe, yaş düzeyine uygun ve pedagojik ilkelerle değerlendirebilmesi amacıyla **İki Kademeli Öz Değerlendirme Mimarisi** geliştirilmiştir:

1. **Kademe 1 - Genel Öz Değerlendirme Kanaati:** Öğrenci, model cevabı gördükten sonra kendi cevabına dair genel kanaatini belirten 4 seçenekten birini seçer (*“Cevabım doğru.”*, *“Cevabım kısmen doğru.”*, *“Cevabım yanlış.”*, *“Emin değilim.”*). Bu seçim tamamen bilişsel farkındalık amaçlıdır; tek başına puan üretmez ve rubrik puanını değiştirmez.
2. **Kademe 2 - Analitik Rubrik Ölçütleri:** Öğrenci genel kanaatte “Cevabım yanlış” veya “Emin değilim” seçmiş olsa bile, sorunun doğru yaptığı kısımları bağımsız olarak rubrik ölçütlerinden işaretleyebilir. İki kademe arasında kısıtlayıcı veya engelleyici bir bağımlılık kurulmamıştır.
3. **Pedagojik Öğrenci Rehberi ve Resmî Not Uyarısı:** Öz değerlendirme alanının başında öğrencinin yaşına uygun yönlendirici metin yerleştirilmiş; puan alanında ise bunun öğrencinin kendi değerlendirmesi olduğu, okul/öğretmen resmî notu olmadığı açıkça belirtilmiştir.
4. **Varsayılan Sınav Sonu Akışı (`end_of_exam`):** Sınav modu varsayılan olarak sınav sonu toplu moduna alınmış, soru çözülürken model cevaplar gizlenmiş, sınav bittiğinde özet ekranında tüm değerlendirme araçları erişime açılmıştır.
5. **Boş Cevap Güvenliği:** Boş bırakılan sorularda haksız puan kazanımı engellenmiş, öğrenciye önce cevap vermesi gerektiği bildirilmiştir.

---

## 2. Geliştirilen Mimari ve Kullanıcı Deneyimi (UX)

### 2.1. Veri Modeli Genişletmesi ([`src/types/practice.ts`](file:///Users/mesutduran/Desktop/OYSS/src/types/practice.ts))
Öğrencinin genel kanaatini saklamak üzere `GeneralSelfEvaluationOption` türü tanımlanmış ve mevcut `QuestionSessionData` arayüzüne eklenmiştir:

```typescript
export type GeneralSelfEvaluationOption = 
  | 'dogru'         // "Cevabım doğru."
  | 'kismen_dogru'  // "Cevabım kısmen doğru."
  | 'yanlis'        // "Cevabım yanlış."
  | 'emin_degilim';  // "Emin değilim."

export interface QuestionSessionData {
  questionNumber: number;
  studentAnswer: string;
  isAnswered: boolean;
  isEvaluated: boolean;
  generalSelfEvaluation?: GeneralSelfEvaluationOption; // Öğrencinin genel kanaati
  checkedCriteriaIndices: number[]; // Seçilen rubrik ölçütleri
  earnedPoints: number; // Yalnızca rubrik üzerinden hesaplanan puan
  evaluatedAt?: number;
}
```

### 2.2. Genel Öz Değerlendirme Seçenekleri (Kademe 1)
Model cevabın hemen altında öğrenciye 4 seçenekli buton grubu sunulur:
- **`[Cevabım doğru.]`** (Zümrüt Yeşili Vurgu)
- **`[Cevabım kısmen doğru.]`** (Kehribar Vurgusu)
- **`[Cevabım yanlış.]`** (Gül/Kırmızı Vurgusu)
- **`[Emin değilim.]`** (İndigo Mavisi Vurgusu)

*Teknik Güvence:* `handleSetGeneralSelfEvaluation` fonksiyonu, `earnedPoints` değerine kesinlikle dokunmaz. Öğrenci bu seçenekler arasında geçiş yaptıkça puan sabit kalır.

### 2.3. Analitik Rubrik Ölçütleri ile Bağımsızlık (Kademe 2)
Genel kanaat kutusunun hemen altında analitik rubrik ölçütleri listelenir:
- Öğrenci “Cevabım yanlış” veya “Emin değilim” seçmiş olsa dahi rubrik ölçütleri **kilitlenmez**.
- Soru çok adımlı olduğundan (örneğin giriş formülünü doğru yazmış ancak işlem hatası yapmış olabilir), doğru yaptığı basamağa ait rubrik ölçütünü seçerek hakkı olan kısmi puanı alabilir.
- “Tümünü Karşıladım” ve “Temizle” butonları hızlı kullanım için korunmuştur.
- Rubrik puanı, MEB analitik puanlama anahtarındaki gerçek puan değerlerinin toplamı üzerinden hesaplanmaya devam eder.

### 2.4. Yaşa Uygun Öğrenci Açıklaması ve Resmî Not Uyarısı
Öz değerlendirme alanının en başında şu pedagojik metin gösterilmektedir:

> **Öğrenci Öz Değerlendirme Rehberi:**  
> *“Önce cevabını model cevapla karşılaştır. Sonra cevabının ne kadar doğru olduğunu düşündüğünü seç. Ardından aşağıdaki ölçütleri tek tek inceleyerek karşıladıklarını işaretle. Bir sorunun bazı bölümlerini doğru yapmış olabilirsin. Kendini dürüstçe değerlendirmen öğrenmene yardımcı olur.”*  
> ℹ️ *Bu puan senin kendi öğrenme sürecin için yaptığın öz değerlendirmedir; okul idaresi veya öğretmen tarafından verilmiş resmî bir sınav notu değildir.*

Ayrıca büyük puan kutusunda ve özet göstergelerinde `Tahmini Puan` ifadesi yerine `Öz Değerlendirme Puanı (Öğretmen resmî notu değildir)` ibaresi kullanılmıştır.

### 2.5. Varsayılan Akış ve Boş Cevap Yönetimi
- **Varsayılan Mod:** `session.feedbackMode = 'end_of_exam'`. Öğrenci sınava girdiğinde soruları sınav ciddiyetiyle çözer; sorular esnasında model cevap veya rubrik açılmaz.
- **Sınav Bitimi:** Öğrenci "Sınavı Bitir & Sonuçları Gör" dediğinde özet ekranında tüm sorular model cevapları, genel kanaat butonları ve rubrikleriyle açılır.
- **Boş Cevap Koruması:** `hasAnswerText` kontrolü ile boş bırakılan sorularda hem genel kanaat butonları hem de rubrik butonları tıklamaya kapatılır; *"Bu soruya henüz yanıt yazılmadığı için rubrik öz değerlendirmesi yapılamaz (0 puan)"* uyarısı gösterilir. `handleToggleRubricCriterion` ve `handleSetGeneralSelfEvaluation` fonksiyonları boş cevapta puan üretimini kod seviyesinde de engeller.

---

## 3. Çalıştırılan Otomasyon Testleri ve Derleme Sonuçları

Yapılan geliştirmeler projedeki 35 testin tamamı çalıştırılarak doğrulanmıştır:

### 3.1. Entegrasyon ve Puanlama Testleri ([`tests/practiceAndScoring.test.ts`](file:///Users/mesutduran/Desktop/OYSS/tests/practiceAndScoring.test.ts))
Eklenen 4 yeni testle birlikte 27 testin tamamı başarıyla geçmiştir:
- `[TEST 24] ✓ BAŞARILI`: Varsayılan geri bildirim modunun `end_of_exam` olması doğrulandı.
- `[TEST 25] ✓ BAŞARILI`: Genel öz değerlendirmenin (`dogru`, `kismen_dogru`, `emin_degilim`) rubrik puanını değiştirmediği ve tek başına puan üretmediği doğrulandı.
- `[TEST 26] ✓ BAŞARILI`: “Cevabım yanlış” seçilse bile rubrik ölçütlerinin bağımsız işaretlenebildiği, kısmi puan alınabildiği ve kısıtlayıcı bağımlılık kurulmadığı doğrulandı.
- `[TEST 27] ✓ BAŞARILI`: Boş cevaplarda rubrik üzerinden puan kazanılmasının ve genel değerlendirmenin engellendiği, puanın 0 olarak korunduğu doğrulandı.
- **Sonuç:** **27/27 Test Başarılı**

### 3.2. Matematik Düzenleyici Testleri ([`tests/mathEditor.test.ts`](file:///Users/mesutduran/Desktop/OYSS/tests/mathEditor.test.ts))
- **Sonuç:** **8/8 Test Başarılı** (Kesir, kök, üs, denklem ve Türkçe metin harmanı korundu).

### 3.3. Tür Kontrolü ve Üretim Derlemesi
- **TypeScript (`npx tsc --noEmit`):** 0 Hata (Exit code: 0).
- **Vite Build (`npm run build`):** 2.09 saniyede tek parça `dist/index.html` (2,366 kB) başarıyla derlendi.

---

## 4. Değiştirilen Dosyalar

1. [`src/types/practice.ts`](file:///Users/mesutduran/Desktop/OYSS/src/types/practice.ts): `GeneralSelfEvaluationOption` eklendi, `QuestionSessionData` genişletildi.
2. [`src/components/InteractivePracticeView.tsx`](file:///Users/mesutduran/Desktop/OYSS/src/components/InteractivePracticeView.tsx): 
   - Varsayılan mod `end_of_exam` yapıldı.
   - `GENERAL_SELF_EVAL_OPTIONS` sabitleri ve `handleSetGeneralSelfEvaluation` eklendi.
   - `handleToggleRubricCriterion` ve `handleSetAllCriteria` içine boş cevap kontrolü eklendi.
   - Öğrenci yaşına uygun rehberlik kartı ve resmî not uyarıları eklendi.
   - Özet ekranında ve aktif soru ekranında genel kanaat ile rubrik alanı iki kademeli olarak entegre edildi.
3. [`tests/practiceAndScoring.test.ts`](file:///Users/mesutduran/Desktop/OYSS/tests/practiceAndScoring.test.ts): 4 yeni öz değerlendirme testi eklendi (Test 24, 25, 26, 27).

---

## 5. Mevcut Durum

Çalışma alanındaki kod değişiklikleri hazırdır, derlenmiş ve 35/35 testle doğrulanmıştır. Talimatınız doğrultusunda **Git commit, push veya Netlify dağıtımı yapılmamıştır**. Onayınız beklenmektedir.
