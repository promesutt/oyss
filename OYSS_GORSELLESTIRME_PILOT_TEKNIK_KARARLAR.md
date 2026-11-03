# OYSS REHBERİ | GÖRSELLEŞTİRME VE İNFOGRAFİK PROJESİ
## FAZ 0.1 (Revizyon 9): TypeScript Tip Güvenliği Düzeltmesi ve Nihai Kararlar

**Doküman No:** 075 (074 No'lu Raporun 9. Revizyonu)  
**Tarih:** 2 Kasım 2026  
**Proje:** OYSS Rehberi (Ortak Yazılı Sınavlara Öğrenci Hazırlık Portalı)  
**Kapsam:** `validateSemanticConsistency` İçinde `allowExtraPoints` Alanına Doğrudan `anchorObj` Üzerinden Güvenli Erişim ve Tip Kontrolü  
**Durum:** Kesinleşmiş Teknik Kararlar Raporu (Geliştirme Öncesi - Kod Değişikliği Yapılmaz)

---

## 1. REVİZYON 9 İLE GERÇEKLEŞTİRİLEN DÜZELTME

Rapor 074'te `validateSemanticConsistency` fonksiyonunun `allowExtraPoints` tip denetiminde tespit edilen TypeScript derleme hatası düzeltilmiştir:

| No | İnceleme Alanı | Revizyon 8 Durumu | Revizyon 9 Kesin Standardı |
| :--- | :--- | :--- | :--- |
| **1** | **`allowExtraPoints` Tip Kontrolü** | `typeof anchors.allowExtraPoints !== 'boolean'` ifadesi `unknown` tipindeki `anchors` nesnesine doğrudan eriştiği için TypeScript hatasına yol açıyordu. | **`anchorObj` Üzerinden Güvenli Erişim:** `anchors` üzerindeki doğrudan erişim kaldırıldı. Kontrol yalnızca daha önce güvenli tür dönüşümü yapılan `anchorObj.allowExtraPoints` üzerinden yürütülür: Alan `undefined` ise kabul edilir; `boolean` (`true`/`false`) ise kabul edilir; diğer tüm tipler reddedilir. |
| **2** | **Çekirdek Kurallar ve Testler** | 7 aşamalı doğrulama sırası, BigInt denk kesir denetimi ve test kabul kriterleri | **Aynen Korundu.** Fonksiyonun mantıksal mimarisi ve sınırları değiştirilmeden korunmuştur. |

---

## 2. REVİZE EDİLMİŞ ANLAMSAL DOĞRULAMA KODU

```typescript
export interface SemanticAnchorPoint {
  id: string;          // Beklenen tekil kimlik (boş olamaz, ör. 'mert_val', 'ece_val')
  numerator: number;   // Beklenen pay (Number.isSafeInteger)
  denominator: number; // Beklenen payda (Number.isSafeInteger ve d > 0)
}

export interface SemanticAnchor {
  expectedPoints: SemanticAnchorPoint[];
  allowExtraPoints?: boolean; // Yalnızca true, false veya undefined kabul edilir (varsayılan: false)
}

export interface SemanticValidationResult {
  isValid: boolean;
  reason?: string;
}

/**
 * Çizimdeki noktaların soru gereksinimleriyle birebir ID ve BigInt değer eşleşmesini
 * çalışma zamanı nesne/alan kontrollerini içeren 7 aşamalı katı doğrulama sırasına göre denetler.
 *
 * Güvenlik Kapsamı: JSON benzeri veri yapıları, null/undefined, beklenmeyen ilkel tipler,
 * eksik alanlar ve geçersiz dizi elemanları karşısında istisna fırlatmaz.
 */
export function validateSemanticConsistency(
  visualPoints: unknown,
  anchors: unknown
): SemanticValidationResult {
  // AŞAMA 1: Kök nesne, dizi varlığı, allowExtraPoints tip denetimi ve eleman nesne kontrolleri
  if (!Array.isArray(visualPoints) || !anchors || typeof anchors !== 'object' || anchors === null) {
    return { isValid: false, reason: 'Geçersiz parametre veya çapa veri yapısı.' };
  }

  const anchorObj = anchors as Record<string, unknown>;
  if (!Array.isArray(anchorObj.expectedPoints)) {
    return { isValid: false, reason: 'anchors.expectedPoints geçerli bir dizi olmalıdır.' };
  }

  // 1a. Boş beklenen nokta listesi reddi
  if (anchorObj.expectedPoints.length === 0) {
    return { isValid: false, reason: 'Beklenen nokta listesi (anchors.expectedPoints) boş olamaz.' };
  }

  // 1b. allowExtraPoints kesin boolean doğrulaması (yalnızca anchorObj üzerinden)
  if (
    anchorObj.allowExtraPoints !== undefined &&
    typeof anchorObj.allowExtraPoints !== 'boolean'
  ) {
    return {
      isValid: false,
      reason: 'allowExtraPoints alanı yalnızca boolean (true/false) veya tanımsız olabilir.'
    };
  }

  const allowExtra = anchorObj.allowExtraPoints === true;

  // 1c. anchors.expectedPoints elemanlarının null/undefined/nesne kontrolü ve boş ID denetimi
  for (let i = 0; i < anchorObj.expectedPoints.length; i++) {
    const exp = anchorObj.expectedPoints[i];
    if (!exp || typeof exp !== 'object' || exp === null) {
      return { isValid: false, reason: `anchors.expectedPoints[${i}] geçerli bir nesne değildir.` };
    }
    const expObj = exp as Record<string, unknown>;
    if (!expObj.id || typeof expObj.id !== 'string' || expObj.id.trim() === '') {
      return { isValid: false, reason: `anchors.expectedPoints[${i}] elemanında boş veya geçersiz ID bulundu.` };
    }
  }

  // 1d. visualPoints elemanlarının null/undefined/nesne kontrolü ve boş ID denetimi
  for (let i = 0; i < visualPoints.length; i++) {
    const pt = visualPoints[i];
    if (!pt || typeof pt !== 'object' || pt === null) {
      return { isValid: false, reason: `visualPoints[${i}] geçerli bir nesne değildir.` };
    }
    const ptObj = pt as Record<string, unknown>;
    if (!ptObj.id || typeof ptObj.id !== 'string' || ptObj.id.trim() === '') {
      return { isValid: false, reason: `visualPoints[${i}] elemanında boş veya geçersiz ID bulundu.` };
    }
  }

  // AŞAMA 2: Beklenen ID tekrar kontrolü
  const expectedIds = new Set<string>();
  for (const exp of anchorObj.expectedPoints as Record<string, unknown>[]) {
    const cleanId = (exp.id as string).trim();
    if (expectedIds.has(cleanId)) {
      return { isValid: false, reason: `Beklenen noktalar arasında tekrarlanan (duplicate) ID bulundu: "${cleanId}".` };
    }
    expectedIds.add(cleanId);
  }

  // AŞAMA 3: Görsel ID tekrar kontrolü (Ekstra noktalar dahil TÜM görsel noktalarında ID benzersiz olmalıdır)
  const visualIds = new Set<string>();
  for (const pt of visualPoints as Record<string, unknown>[]) {
    const cleanId = (pt.id as string).trim();
    if (visualIds.has(cleanId)) {
      return { isValid: false, reason: `Görsel noktalar arasında tekrarlanan (duplicate) ID bulundu: "${cleanId}".` };
    }
    visualIds.add(cleanId);
  }

  // AŞAMA 4: Pay ve payda güvenliği (Number.isSafeInteger - TÜM noktalar için)
  for (const exp of anchorObj.expectedPoints as Record<string, unknown>[]) {
    if (!Number.isSafeInteger(exp.numerator) || !Number.isSafeInteger(exp.denominator)) {
      return { isValid: false, reason: `Beklenen "${exp.id}" noktasında güvenli tam sayı sınırını aşan veya tanımsız pay/payda tespit edildi.` };
    }
  }

  for (const pt of visualPoints as Record<string, unknown>[]) {
    if (!Number.isSafeInteger(pt.numerator) || !Number.isSafeInteger(pt.denominator)) {
      return { isValid: false, reason: `Görseldeki "${pt.id}" noktasında güvenli tam sayı sınırını aşan veya tanımsız pay/payda tespit edildi.` };
    }
  }

  // AŞAMA 5: Pozitif payda kontrolü (d > 0 - TÜM noktalar için)
  for (const exp of anchorObj.expectedPoints as Record<string, unknown>[]) {
    if ((exp.denominator as number) <= 0) {
      return { isValid: false, reason: `Beklenen "${exp.id}" noktasında sıfır veya negatif payda tespit edildi (d <= 0).` };
    }
  }

  for (const pt of visualPoints as Record<string, unknown>[]) {
    if ((pt.denominator as number) <= 0) {
      return { isValid: false, reason: `Görseldeki "${pt.id}" noktasında sıfır veya negatif payda tespit edildi (d <= 0).` };
    }
  }

  // AŞAMA 6: ID bazlı birebir kesir eşleştirmesi (BigInt denk kesir denetimi)
  const typedVisualPoints = visualPoints as { id: string; numerator: number; denominator: number }[];
  for (const exp of anchorObj.expectedPoints as SemanticAnchorPoint[]) {
    const cleanExpId = exp.id.trim();
    const matchedPoint = typedVisualPoints.find(pt => pt.id.trim() === cleanExpId);

    if (!matchedPoint) {
      return { isValid: false, reason: `Soru için zorunlu olan "${cleanExpId}" kimlikli nokta görselde bulunamadı (eksik nokta).` };
    }

    // BigInt çapraz çarpımı ile denk kesir denetimi (ör. 3/4 ile 6/8 denktir)
    const left = BigInt(matchedPoint.numerator) * BigInt(exp.denominator);
    const right = BigInt(exp.numerator) * BigInt(matchedPoint.denominator);

    if (left !== right) {
      return {
        isValid: false,
        reason: `"${cleanExpId}" kimlikli noktanın kesir değeri uyuşmuyor: Beklenen ${exp.numerator}/${exp.denominator}, gelen ${matchedPoint.numerator}/${matchedPoint.denominator}.`
      };
    }
  }

  // AŞAMA 7: Beklenmeyen ekstra nokta kontrolü
  if (!allowExtra && typedVisualPoints.length !== (anchorObj.expectedPoints as unknown[]).length) {
    const extraPoints = typedVisualPoints.filter(pt => !expectedIds.has(pt.id.trim()));
    if (extraPoints.length > 0) {
      return {
        isValid: false,
        reason: `Görselde soru kapsamında tanımlanmamış fazladan noktalar bulundu: ${extraPoints.map(p => p.id).join(', ')}.`
      };
    }
  }

  return { isValid: true };
}
```

---

## 3. GÜNCELLENMİŞ BİRİM TESTLERİ VE KABUL KRİTERLERİ

`src/utils/svgMathEngine.test.ts` dosyasına eklenecek test senaryoları:

1. `test_runtime_null_expected_point`: `anchors.expectedPoints = [null]` verildiğinde fonksiyonun `TypeError` fırlatmayıp `{ isValid: false }` döndürdüğü doğrulanmalıdır.
2. `test_runtime_undefined_visual_point`: `visualPoints = [{ id: 'mert_val', numerator: -9, denominator: 12 }, undefined]` verildiğinde çökme olmaksızın `{ isValid: false }` döndürdüğü kanıtlanmalıdır.
3. `test_runtime_non_object_elements`: `visualPoints = ["bozuk_veri"]` veya `anchors = "gecersiz"` gibi ilkel tiplerde kontrollü hata üretildiği test edilmelidir.
4. `test_runtime_missing_fields`: `{ id: 'mert_val' }` gibi pay veya paydası eksik nesnelerde `Number.isSafeInteger` aşamasında yakalanarak `false` döndürüldüğü doğrulanmalıdır.
5. `test_exact_range_boundaries_bigint`: $[-2, 1]$ aralığında $-2$ (sınırda), $-5/4$ (içte), $1$ (sınırda) noktalarının geçerli; $-9/4$ (sol dış) ve $5/4$ (sağ dış) noktalarının geçersiz olduğunu BigInt analitiğiyle doğrulamalıdır.
6. `test_negative_fractions_and_boundaries`: $[-3, -1]$ gibi tamamen negatif aralıklarda $-5/2$ noktasının geçerli; $-7/2$ noktasının geçersiz olduğunu doğrulamalıdır.
7. `test_unsafe_min_max_rejected`: `min` veya `max` değeri `NaN`, `2.5` veya `Infinity` olduğunda matematiksel doğrulamanın `false` döndürdüğünü kanıtlamalıdır.
8. `test_allow_extra_points_valid`: `allowExtraPoints: true` iken geçerli ekstra noktalarla doğrulamanın `true` döndürdüğünü kanıtlamalıdır.
9. `test_allow_extra_points_invalid_math_rejected`: `allowExtraPoints: true` iken ekstra noktanın paydası $0$, kendisi float veya aralık dışı olduğunda doğrulamanın `false` döndürdüğünü kanıtlamalıdır.
10. `test_allow_extra_points_duplicate_id_rejected`: `allowExtraPoints: true` iken ekstra nokta ile mevcut nokta aynı ID'yi paylaştığında doğrulamanın `false` döndürdüğünü kanıtlamalıdır.
11. `test_empty_expected_points_rejected`: `anchors.expectedPoints = []` verildiğinde doğrulamanın `false` döndürdüğü doğrulanmalıdır.
12. `test_invalid_allow_extra_points_type`: `allowExtraPoints: "true"` veya `1` gibi boolean olmayan değerlerde doğrulamanın `false` döndürdüğü kanıtlanmalıdır.
13. `test_duplicate_expected_id`: Beklenen noktalarda aynı ID iki kez verildiğinde doğrulamanın `false` döndürdüğü doğrulanmalıdır.
14. `test_empty_or_whitespace_id`: `id: ""` veya `id: "   "` verildiğinde doğrulamanın `false` döndürdüğü doğrulanmalıdır.
15. `test_unsafe_integer_rejected`: Pay veya payda `Number.MAX_SAFE_INTEGER + 1`, `NaN` veya `2.5` olduğunda motorun çökmeden `false` döndürdüğü kanıtlanmalıdır.
16. `test_zero_and_negative_denominator`: Payda $0$ veya $-4$ verildiğinde doğrulamanın kontrollü hata ile `false` döndürdüğü test edilmelidir.
17. `test_equivalent_fractions_accepted`: Soru $\frac{3}{4}$ beklerken çizimde $\frac{6}{8}$ (veya soru $-\frac{3}{4}$ beklerken çizimde $-\frac{9}{12}$) sunulduğunda BigInt çapraz çarpımının bunu doğru kabul ettiği (`isValid: true`) kanıtlanmalıdır.
18. `test_wrong_id_with_correct_fraction`: Değer doğru olsa dahi ID yanlış eşleştiğinde doğrulamanın `false` döndürdüğü doğrulanmalıdır.
19. `test_missing_and_extra_points`: Zorunlu nokta eksik olduğunda veya izinsiz fazladan nokta eklendiğinde (`allowExtraPoints: false`) doğrulamanın `false` döndürdüğü doğrulanmalıdır.
20. `test_pipeline_execution_order`: Hatalı matematiksel parametrede anlamsal doğrulama veya SVG üretiminin tetiklenmediği, doğrudan fallback üretildiği doğrulanmalıdır.
21. `test_extension_arrows_geometry`: Sayı doğrusu eksen çizgisinin $min$ ve $max$ çentiklerinin $25\text{px}$ sağına ve soluna taştığı test edilmelidir.
22. `test_build_clean`: `npm run build` komutunun sıfır hata ile tamamlandığı doğrulanmalıdır.

---

## 4. NİHAİ KARARLAR

1. **Teknik Olarak Sınırlandırılmış Hata Güvencesi:** Fonksiyon; API, yerel durum veya JSON ayrıştırmasından gelebilecek tüm standart veri biçimlerinde (JSON benzeri yapılar, null, undefined, ilkel tipler, eksik alanlar, geçersiz dizi elemanları) istisna fırlatmaz; kontrollü `{ isValid: false, reason: ... }` döndürür. Proxy veya özel throwing getter gibi yapay JavaScript mekanizmaları bu güvencenin kapsamı dışındadır.
2. **Değişmeyen Çekirdek Kurallar:** Mevcut BigInt çapraz çarpım eşitliği, pozitif payda ($d > 0$), 7 aşamalı doğrulama sırası ve `allowExtraPoints` kapsamındaki tam güvenlik kuralları korunmuştur.
3. **Kapsam İzolasyonu:** Bu aşamada hiçbir kod dosyası değiştirilmemiş, paket kurulmamış, Git işlemi veya deploy yapılmamıştır.

---

## 5. ONAY BEKLEYEN KONULAR

- `src/types/index.ts` dosyasına arayüzlerin eklenmesi,
- `src/utils/svgMathEngine.ts` ve `src/utils/svgMathEngine.test.ts` dosyalarının oluşturulması ile **1. Kodlama Adımının başlatılması.**
```
