/**
 * OYSS Rehberi | SVG Matematik Motoru Doğrulama Testleri
 * svgMathEngine.test.ts
 * 
 * Rapor 075'te tanımlanan 22 kabul kriterini ve tüm sınır durumlarını test eder.
 */

import {
  resolveSvgColor,
  escapeXml,
  compareFractionsExact,
  validateMathematicalParams,
  validateSemanticConsistency,
  generateNumberLineSvg,
  generateFallbackSvg,
  renderQuestionVisual
} from './svgMathEngine';
import { NumberLineVisualParams, SemanticAnchor, QuestionVisual } from '../types';
import { SAMPLE_EXAMS } from '../data/sampleExams';

console.log('=== OYSS SVG MATEMATİK MOTORU DOĞRULAMA TESTLERİ BAŞLIYOR ===\n');

let passCount = 0;
let failCount = 0;

function reportTest(num: number, title: string, success: boolean, detail: string) {
  if (success) {
    passCount++;
    console.log(`[TEST ${num < 10 ? '0' + num : num}] ✓ BAŞARILI - ${title}`);
    console.log(`         Ayrıntı: ${detail}\n`);
  } else {
    failCount++;
    console.error(`[TEST ${num < 10 ? '0' + num : num}] ✗ BAŞARISIZ - ${title}`);
    console.error(`         Ayrıntı: ${detail}\n`);
  }
}

// =============================================================================
// TEST 01: anchors.expectedPoints içinde null veya geçersiz eleman kontrolü
// =============================================================================
try {
  const visualPoints = [{ id: 'mert_val', numerator: -9, denominator: 12 }];
  const malformedAnchor = { expectedPoints: [null] } as unknown as SemanticAnchor;
  const res = validateSemanticConsistency(visualPoints, malformedAnchor);
  reportTest(
    1,
    'test_runtime_null_expected_point: null çapa elemanında çökme olmaksızın kontrollü ret',
    res.isValid === false && (res.reason?.includes('geçerli bir nesne değildir') ?? false),
    `Sonuç: isValid=${res.isValid}, reason="${res.reason}"`
  );
} catch (err: unknown) {
  reportTest(1, 'test_runtime_null_expected_point', false, `İstisna fırlatıldı: ${String(err)}`);
}

// =============================================================================
// TEST 02: visualPoints içinde undefined veya geçersiz eleman kontrolü
// =============================================================================
try {
  const visualPoints = [{ id: 'mert_val', numerator: -9, denominator: 12 }, undefined];
  const anchor: SemanticAnchor = {
    expectedPoints: [{ id: 'mert_val', numerator: -3, denominator: 4 }]
  };
  const res = validateSemanticConsistency(visualPoints, anchor);
  reportTest(
    2,
    'test_runtime_undefined_visual_point: undefined görsel noktasında kontrollü ret',
    res.isValid === false && (res.reason?.includes('geçerli bir nesne değildir') ?? false),
    `Sonuç: isValid=${res.isValid}, reason="${res.reason}"`
  );
} catch (err: unknown) {
  reportTest(2, 'test_runtime_undefined_visual_point', false, `İstisna fırlatıldı: ${String(err)}`);
}

// =============================================================================
// TEST 03: visualPoints veya anchors kök nesnesinin ilkel tip olması
// =============================================================================
try {
  const res1 = validateSemanticConsistency("gecersiz_dizi", { expectedPoints: [] });
  const res2 = validateSemanticConsistency([], "gecersiz_anchor");
  reportTest(
    3,
    'test_runtime_non_object_elements: İlkel tiplerde (string, boolean vb.) kontrollü ret',
    res1.isValid === false && res2.isValid === false,
    `res1 isValid=${res1.isValid}, res2 isValid=${res2.isValid}`
  );
} catch (err: unknown) {
  reportTest(3, 'test_runtime_non_object_elements', false, `İstisna fırlatıldı: ${String(err)}`);
}

// =============================================================================
// TEST 04: Eksik alanlar (numerator veya denominator eksikliği)
// =============================================================================
try {
  const visualPoints = [{ id: 'mert_val' }]; // numerator ve denominator yok
  const anchor: SemanticAnchor = {
    expectedPoints: [{ id: 'mert_val', numerator: -3, denominator: 4 }]
  };
  const res = validateSemanticConsistency(visualPoints, anchor);
  reportTest(
    4,
    'test_runtime_missing_fields: Eksik numerator/denominator alanlarında kontrollü ret',
    res.isValid === false && (res.reason?.includes('güvenli tam sayı sınırını aşan veya tanımsız') ?? false),
    `Sonuç: isValid=${res.isValid}, reason="${res.reason}"`
  );
} catch (err: unknown) {
  reportTest(4, 'test_runtime_missing_fields', false, `İstisna fırlatıldı: ${String(err)}`);
}

// =============================================================================
// TEST 05: BigInt analitik aralık sınırları [min, max], sınır eşitlikleri ve dış noktalar
// =============================================================================
try {
  // [-2, 1] aralığında:
  // -2/1 (-2): tam min sınırında (GEÇERLİ)
  // -5/4 (-1.25): aralık içinde (GEÇERLİ)
  // 1/1 (1): tam max sınırında (GEÇERLİ)
  const validParams: NumberLineVisualParams = {
    min: -2,
    max: 1,
    points: [
      { id: 'min_border', numerator: -2, denominator: 1 },
      { id: 'inside', numerator: -5, denominator: 4 },
      { id: 'max_border', numerator: 1, denominator: 1 }
    ]
  };
  const resValid = validateMathematicalParams(validParams);

  // -9/4 (-2.25): min sınırının solunda (GEÇERSİZ)
  const invalidLeft: NumberLineVisualParams = {
    min: -2,
    max: 1,
    points: [{ id: 'out_left', numerator: -9, denominator: 4 }]
  };
  const resLeft = validateMathematicalParams(invalidLeft);

  // 5/4 (1.25): max sınırının sağında (GEÇERSİZ)
  const invalidRight: NumberLineVisualParams = {
    min: -2,
    max: 1,
    points: [{ id: 'out_right', numerator: 5, denominator: 4 }]
  };
  const resRight = validateMathematicalParams(invalidRight);

  const passed = resValid.isValid === true && resLeft.isValid === false && resRight.isValid === false;
  reportTest(
    5,
    'test_exact_range_boundaries_bigint: BigInt ile [min, max] tam sınır eşitliği ve dış nokta tespiti',
    passed,
    `Sınır içi: ${resValid.isValid}, Sol dışı ret: ${!resLeft.isValid}, Sağ dışı ret: ${!resRight.isValid}`
  );
} catch (err: unknown) {
  reportTest(5, 'test_exact_range_boundaries_bigint', false, `İstisna fırlatıldı: ${String(err)}`);
}

// =============================================================================
// TEST 06: Tamamen negatif aralıklar ve negatif kesirler
// =============================================================================
try {
  // [-3, -1] aralığı:
  // -5/2 (-2.5): aralık içinde (GEÇERLİ)
  // -7/2 (-3.5): -3'ün solunda (GEÇERSİZ)
  const validNeg: NumberLineVisualParams = {
    min: -3,
    max: -1,
    points: [{ id: 'p1', numerator: -5, denominator: 2 }]
  };
  const invalidNeg: NumberLineVisualParams = {
    min: -3,
    max: -1,
    points: [{ id: 'p2', numerator: -7, denominator: 2 }]
  };

  const res1 = validateMathematicalParams(validNeg);
  const res2 = validateMathematicalParams(invalidNeg);

  reportTest(
    6,
    'test_negative_fractions_and_boundaries: Tamamen negatif aralıklarda analitik BigInt kontrolü',
    res1.isValid === true && res2.isValid === false,
    `İç nokta (-5/2): ${res1.isValid}, Dış nokta (-7/2): ${res2.isValid}`
  );
} catch (err: unknown) {
  reportTest(6, 'test_negative_fractions_and_boundaries', false, `İstisna fırlatıldı: ${String(err)}`);
}

// =============================================================================
// TEST 07: Güvenli tam sayı olmayan min/max değerlerinin reddi
// =============================================================================
try {
  const resFloat = validateMathematicalParams({ min: 1.5, max: 5, points: [] });
  const resNaN = validateMathematicalParams({ min: NaN, max: 5, points: [] });
  const resInverted = validateMathematicalParams({ min: 5, max: 2, points: [] });

  const passed = resFloat.isValid === false && resNaN.isValid === false && resInverted.isValid === false;
  reportTest(
    7,
    'test_unsafe_min_max_rejected: Ondalıklı, NaN veya min >= max sınırlarının reddi',
    passed,
    `Float ret: ${!resFloat.isValid}, NaN ret: ${!resNaN.isValid}, min>=max ret: ${!resInverted.isValid}`
  );
} catch (err: unknown) {
  reportTest(7, 'test_unsafe_min_max_rejected', false, `İstisna fırlatıldı: ${String(err)}`);
}

// =============================================================================
// TEST 08: allowExtraPoints: true iken geçerli ekstra noktalarla doğrulama
// =============================================================================
try {
  const visualPoints = [
    { id: 'mert_val', numerator: -9, denominator: 12 },
    { id: 'extra_p', numerator: 0, denominator: 1 }
  ];
  const anchor: SemanticAnchor = {
    expectedPoints: [{ id: 'mert_val', numerator: -3, denominator: 4 }],
    allowExtraPoints: true
  };
  const res = validateSemanticConsistency(visualPoints, anchor);
  reportTest(
    8,
    'test_allow_extra_points_valid: allowExtraPoints: true iken geçerli ekstra nokta kabul edilir',
    res.isValid === true,
    `Sonuç: isValid=${res.isValid}`
  );
} catch (err: unknown) {
  reportTest(8, 'test_allow_extra_points_valid', false, `İstisna fırlatıldı: ${String(err)}`);
}

// =============================================================================
// TEST 09: allowExtraPoints: true olsa dahi ekstra noktanın hatalı matematiği reddedilir
// =============================================================================
try {
  // Ekstra noktanın paydası 0 (HATA)
  const visualPointsZeroD = [
    { id: 'mert_val', numerator: -9, denominator: 12 },
    { id: 'extra_zero_d', numerator: 1, denominator: 0 }
  ];
  const anchor: SemanticAnchor = {
    expectedPoints: [{ id: 'mert_val', numerator: -3, denominator: 4 }],
    allowExtraPoints: true
  };
  const resZeroD = validateSemanticConsistency(visualPointsZeroD, anchor);

  // Ekstra noktanın payı float (HATA)
  const visualPointsFloat = [
    { id: 'mert_val', numerator: -9, denominator: 12 },
    { id: 'extra_float', numerator: 1.5, denominator: 2 }
  ];
  const resFloat = validateSemanticConsistency(visualPointsFloat, anchor);

  const passed = resZeroD.isValid === false && resFloat.isValid === false;
  reportTest(
    9,
    'test_allow_extra_points_invalid_math_rejected: allowExtraPoints: true iken de ekstra noktada d<=0 ve float reddedilir',
    passed,
    `d<=0 ret: ${!resZeroD.isValid}, float ret: ${!resFloat.isValid}`
  );
} catch (err: unknown) {
  reportTest(9, 'test_allow_extra_points_invalid_math_rejected', false, `İstisna fırlatıldı: ${String(err)}`);
}

// =============================================================================
// TEST 10: allowExtraPoints: true iken ekstra nokta ile mevcut nokta aynı ID'yi paylaşamaz
// =============================================================================
try {
  const visualPoints = [
    { id: 'mert_val', numerator: -9, denominator: 12 },
    { id: 'mert_val', numerator: 0, denominator: 1 } // Tekrarlanan ID
  ];
  const anchor: SemanticAnchor = {
    expectedPoints: [{ id: 'mert_val', numerator: -3, denominator: 4 }],
    allowExtraPoints: true
  };
  const res = validateSemanticConsistency(visualPoints, anchor);
  reportTest(
    10,
    'test_allow_extra_points_duplicate_id_rejected: allowExtraPoints: true iken de tekrarlanan görsel ID reddedilir',
    res.isValid === false && (res.reason?.includes('tekrarlanan (duplicate) ID') ?? false),
    `Sonuç: isValid=${res.isValid}, reason="${res.reason}"`
  );
} catch (err: unknown) {
  reportTest(10, 'test_allow_extra_points_duplicate_id_rejected', false, `İstisna fırlatıldı: ${String(err)}`);
}

// =============================================================================
// TEST 11: anchors.expectedPoints boş dizi olduğunda ret
// =============================================================================
try {
  const visualPoints = [{ id: 'mert_val', numerator: -9, denominator: 12 }];
  const anchor: SemanticAnchor = { expectedPoints: [] };
  const res = validateSemanticConsistency(visualPoints, anchor);
  reportTest(
    11,
    'test_empty_expected_points_rejected: expectedPoints=[] verildiğinde anlamsal doğrulama reddedilir',
    res.isValid === false && (res.reason?.includes('boş olamaz') ?? false),
    `Sonuç: isValid=${res.isValid}, reason="${res.reason}"`
  );
} catch (err: unknown) {
  reportTest(11, 'test_empty_expected_points_rejected', false, `İstisna fırlatıldı: ${String(err)}`);
}

// =============================================================================
// TEST 12: allowExtraPoints boolean olmayan tiplerde ret
// =============================================================================
try {
  const visualPoints = [{ id: 'mert_val', numerator: -9, denominator: 12 }];
  const anchorString = {
    expectedPoints: [{ id: 'mert_val', numerator: -3, denominator: 4 }],
    allowExtraPoints: "true" as unknown as boolean
  };
  const resString = validateSemanticConsistency(visualPoints, anchorString);

  const anchorNum = {
    expectedPoints: [{ id: 'mert_val', numerator: -3, denominator: 4 }],
    allowExtraPoints: 1 as unknown as boolean
  };
  const resNum = validateSemanticConsistency(visualPoints, anchorNum);

  reportTest(
    12,
    'test_invalid_allow_extra_points_type: allowExtraPoints alanında "true" veya 1 gibi tipler reddedilir',
    resString.isValid === false && resNum.isValid === false,
    `String ret: ${!resString.isValid}, Num ret: ${!resNum.isValid}`
  );
} catch (err: unknown) {
  reportTest(12, 'test_invalid_allow_extra_points_type', false, `İstisna fırlatıldı: ${String(err)}`);
}

// =============================================================================
// TEST 13: Beklenen noktalarda tekrarlanan (duplicate) ID reddi
// =============================================================================
try {
  const visualPoints = [{ id: 'p1', numerator: 1, denominator: 2 }];
  const anchor: SemanticAnchor = {
    expectedPoints: [
      { id: 'duplicate_id', numerator: 1, denominator: 2 },
      { id: 'duplicate_id', numerator: 2, denominator: 4 }
    ]
  };
  const res = validateSemanticConsistency(visualPoints, anchor);
  reportTest(
    13,
    'test_duplicate_expected_id: Beklenen çapa listesinde aynı ID iki kez verildiğinde ret',
    res.isValid === false && (res.reason?.includes('tekrarlanan (duplicate) ID') ?? false),
    `Sonuç: isValid=${res.isValid}, reason="${res.reason}"`
  );
} catch (err: unknown) {
  reportTest(13, 'test_duplicate_expected_id', false, `İstisna fırlatıldı: ${String(err)}`);
}

// =============================================================================
// TEST 14: Boş veya yalnızca boşluk içeren ID reddi
// =============================================================================
try {
  const anchorEmpty: SemanticAnchor = {
    expectedPoints: [{ id: "   ", numerator: 1, denominator: 2 }]
  };
  const res = validateSemanticConsistency([{ id: "   ", numerator: 1, denominator: 2 }], anchorEmpty);
  reportTest(
    14,
    'test_empty_or_whitespace_id: Boş veya boşluklu ID değerlerinde kontrollü ret',
    res.isValid === false && (res.reason?.includes('boş veya geçersiz ID') ?? false),
    `Sonuç: isValid=${res.isValid}, reason="${res.reason}"`
  );
} catch (err: unknown) {
  reportTest(14, 'test_empty_or_whitespace_id', false, `İstisna fırlatıldı: ${String(err)}`);
}

// =============================================================================
// TEST 15: Güvenli tam sayı sınırını aşan veya tanımsız pay/payda reddi
// =============================================================================
try {
  const unsafeN = Number.MAX_SAFE_INTEGER + 100;
  const visualPoints = [{ id: 'p1', numerator: unsafeN, denominator: 2 }];
  const anchor: SemanticAnchor = {
    expectedPoints: [{ id: 'p1', numerator: 1, denominator: 2 }]
  };
  const res = validateSemanticConsistency(visualPoints, anchor);
  reportTest(
    15,
    'test_unsafe_integer_rejected: Number.MAX_SAFE_INTEGER sınırını aşan sayılarda kontrollü ret',
    res.isValid === false && (res.reason?.includes('güvenli tam sayı') ?? false),
    `Sonuç: isValid=${res.isValid}, reason="${res.reason}"`
  );
} catch (err: unknown) {
  reportTest(15, 'test_unsafe_integer_rejected', false, `İstisna fırlatıldı: ${String(err)}`);
}

// =============================================================================
// TEST 16: Sıfır ve negatif paydaların reddi
// =============================================================================
try {
  const resZero = validateMathematicalParams({
    min: 0,
    max: 2,
    points: [{ id: 'p0', numerator: 1, denominator: 0 }]
  });
  const resNeg = validateMathematicalParams({
    min: 0,
    max: 2,
    points: [{ id: 'pNeg', numerator: 1, denominator: -2 }]
  });
  reportTest(
    16,
    'test_zero_and_negative_denominator: d=0 veya d<0 durumlarında matematiksel doğrulamada ret',
    resZero.isValid === false && resNeg.isValid === false,
    `d=0 ret: ${!resZero.isValid}, d<0 ret: ${!resNeg.isValid}`
  );
} catch (err: unknown) {
  reportTest(16, 'test_zero_and_negative_denominator', false, `İstisna fırlatıldı: ${String(err)}`);
}

// =============================================================================
// TEST 17: BigInt analitik denk kesir eşitliği (3/4 ile 6/8 veya -3/4 ile -9/12)
// =============================================================================
try {
  // Soru kökünde Mert'in -3/4 kesri beklenirken görsel parametresinde -9/12 sunulmuştur
  const visualPoints = [
    { id: 'mert_val', numerator: -9, denominator: 12 },
    { id: 'ece_val', numerator: -10, denominator: 12 }
  ];
  const anchor: SemanticAnchor = {
    expectedPoints: [
      { id: 'mert_val', numerator: -3, denominator: 4 },
      { id: 'ece_val', numerator: -5, denominator: 6 }
    ]
  };
  const res = validateSemanticConsistency(visualPoints, anchor);
  reportTest(
    17,
    'test_equivalent_fractions_accepted: BigInt çapraz çarpımı ile denk kesirler (-3/4 === -9/12) kabul edilir',
    res.isValid === true,
    `Sonuç: isValid=${res.isValid}`
  );
} catch (err: unknown) {
  reportTest(17, 'test_equivalent_fractions_accepted', false, `İstisna fırlatıldı: ${String(err)}`);
}

// =============================================================================
// TEST 18: Yanlış ID ile doğru kesir eşleşmesinde ret
// =============================================================================
try {
  const visualPoints = [
    { id: 'wrong_id', numerator: -9, denominator: 12 }
  ];
  const anchor: SemanticAnchor = {
    expectedPoints: [
      { id: 'mert_val', numerator: -3, denominator: 4 }
    ]
  };
  const res = validateSemanticConsistency(visualPoints, anchor);
  reportTest(
    18,
    'test_wrong_id_with_correct_fraction: Kesir değeri denk olsa dahi ID yanlış ise ret',
    res.isValid === false && (res.reason?.includes('bulunamadı (eksik nokta)') ?? false),
    `Sonuç: isValid=${res.isValid}, reason="${res.reason}"`
  );
} catch (err: unknown) {
  reportTest(18, 'test_wrong_id_with_correct_fraction', false, `İstisna fırlatıldı: ${String(err)}`);
}

// =============================================================================
// TEST 19: allowExtraPoints: false iken eksik veya fazladan nokta reddi
// =============================================================================
try {
  // 1. Eksik nokta
  const resMissing = validateSemanticConsistency(
    [{ id: 'mert_val', numerator: -3, denominator: 4 }],
    {
      expectedPoints: [
        { id: 'mert_val', numerator: -3, denominator: 4 },
        { id: 'ece_val', numerator: -5, denominator: 6 }
      ],
      allowExtraPoints: false
    }
  );

  // 2. Fazladan nokta
  const resExtra = validateSemanticConsistency(
    [
      { id: 'mert_val', numerator: -3, denominator: 4 },
      { id: 'extra_p', numerator: 0, denominator: 1 }
    ],
    {
      expectedPoints: [
        { id: 'mert_val', numerator: -3, denominator: 4 }
      ],
      allowExtraPoints: false
    }
  );

  reportTest(
    19,
    'test_missing_and_extra_points: allowExtraPoints: false iken hem eksik hem fazladan nokta reddedilir',
    resMissing.isValid === false && resExtra.isValid === false,
    `Eksik nokta ret: ${!resMissing.isValid}, Fazladan nokta ret: ${!resExtra.isValid}`
  );
} catch (err: unknown) {
  reportTest(19, 'test_missing_and_extra_points', false, `İstisna fırlatıldı: ${String(err)}`);
}

// =============================================================================
// TEST 20: Boru hattı yürütme sırası ve güvenli fallback üretimi
// =============================================================================
try {
  const badVisual: QuestionVisual = {
    type: 'number_line',
    sourceOrigin: 'oyss_svg',
    params: {
      min: 2,
      max: 1, // HATA: min > max
      points: []
    }
  };
  const renderRes = renderQuestionVisual(badVisual);
  const directFallback = generateFallbackSvg('Doğrudan çağrı testi');
  const isFallbackSvg = renderRes.svg.includes('⚠️ Matematiksel Çizim Yüklenemedi');
  const isDirectFallbackValid = directFallback.includes('Doğrudan çağrı testi');

  reportTest(
    20,
    'test_pipeline_execution_order: Hatalı parametrede anlamsal doğrulama çalıştırılmadan fallback üretilir',
    renderRes.isValid === false && isFallbackSvg && isDirectFallbackValid,
    `isValid=${renderRes.isValid}, fallbackSvg=${isFallbackSvg}, directFallback=${isDirectFallbackValid}`
  );
} catch (err: unknown) {
  reportTest(20, 'test_pipeline_execution_order', false, `İstisna fırlatıldı: ${String(err)}`);
}

// =============================================================================
// TEST 21: Sayı doğrusu eksen uzantıları (E_ext=25px) ve sonsuzluk okları geometrisi
// =============================================================================
try {
  const validNl: NumberLineVisualParams = {
    min: -1,
    max: 0,
    points: [
      { id: 'mert_val', numerator: -9, denominator: 12, label: 'Mert: -3/4' },
      { id: 'ece_val', numerator: -10, denominator: 12, label: 'Ece: -5/6' }
    ],
    showArrows: true
  };
  const svg = generateNumberLineSvg(validNl);

  // Eksen başlangıcı paddingX (45) - extensionMargin (25) = 20px
  const hasAxisStart = svg.includes('x1="20"');
  // Eksen bitişi paddingX (45) + usableWidth (550) + extensionMargin (25) = 620px
  const hasAxisEnd = svg.includes('x2="620"');
  // Sol ok poligonu
  const hasLeftArrow = svg.includes('points="20,70');
  // Sağ ok poligonu
  const hasRightArrow = svg.includes('points="620,70');

  const passed = hasAxisStart && hasAxisEnd && hasLeftArrow && hasRightArrow;
  reportTest(
    21,
    'test_extension_arrows_geometry: E_ext=25px uzantısı ve sonsuzluk okları koordinat doğrulaması',
    passed,
    `axisStart (x1=20): ${hasAxisStart}, axisEnd (x2=620): ${hasAxisEnd}, leftArrow: ${hasLeftArrow}, rightArrow: ${hasRightArrow}`
  );
} catch (err: unknown) {
  reportTest(21, 'test_extension_arrows_geometry', false, `İstisna fırlatıldı: ${String(err)}`);
}

// =============================================================================
// TEST 22: XML karakter kaçışı ve SVG geçerli W3C HEX renk çözümü
// =============================================================================
try {
  // XML karakter kaçışı denetimi
  const escaped = escapeXml('Test & "deneme" <script> \'etiket\'');
  const xmlSafe = escaped === 'Test &amp; &quot;deneme&quot; &lt;script&gt; &apos;etiket&apos;';

  // SVG renk çözümleme denetimi
  const colorTailwind = resolveSvgColor('indigo-600'); // #4f46e5 olmalı
  const colorHex = resolveSvgColor('#059669'); // doğrudan korunmalı
  const colorCurrent = resolveSvgColor('currentColor'); // korunmalı
  const colorFallback = resolveSvgColor('javascript:alert(1)'); // #334155 olmalı

  const colorSafe = colorTailwind === '#4f46e5' &&
                    colorHex === '#059669' &&
                    colorCurrent === 'currentColor' &&
                    colorFallback === '#334155';

  const passed = xmlSafe && colorSafe;
  reportTest(
    22,
    'test_xml_escaping_and_valid_hex_colors: XML kaçışı ve Tailwind->W3C HEX renk çözümlemesi',
    passed,
    `xmlSafe: ${xmlSafe}, colorTailwind: "${colorTailwind}", colorFallback: "${colorFallback}"`
  );
} catch (err: unknown) {
  reportTest(22, 'test_xml_escaping_and_valid_hex_colors', false, `İstisna fırlatıldı: ${String(err)}`);
}

// =============================================================================
// EK TEST 23: compareFractionsExact analitik sıralama testleri
// =============================================================================
try {
  const c1 = compareFractionsExact({ numerator: -5, denominator: 6 }, { numerator: -3, denominator: 4 }); // -5/6 < -3/4 => -1
  const c2 = compareFractionsExact({ numerator: -3, denominator: 8 }, { numerator: -3, denominator: 4 }); // -3/8 > -3/4 => +1
  const c3 = compareFractionsExact({ numerator: 3, denominator: 4 }, { numerator: 6, denominator: 8 });   // 3/4 === 6/8 => 0

  const passed = c1 === -1 && c2 === 1 && c3 === 0;
  reportTest(
    23,
    'test_compare_fractions_exact: BigInt çapraz çarpımının rasyonel sıralama kurallarını kanıtlaması',
    passed,
    `-5/6 < -3/4: ${c1 === -1}, -3/8 > -3/4: ${c2 === 1}, 3/4 === 6/8: ${c3 === 0}`
  );
} catch (err: unknown) {
  reportTest(23, 'test_compare_fractions_exact', false, `İstisna fırlatıldı: ${String(err)}`);
}

// =============================================================================
// EK TEST 24: Aşırı büyük güvenli tam sayı sınırlarında (MAX_SAFE_INTEGER) BigInt hassasiyeti
// =============================================================================
try {
  // max - min farkı Number.MAX_SAFE_INTEGER sınırını aşan ve Number ile yapıldığında
  // tek sayı hassasiyetini kaybeden (18014398509481981) uç sınır senaryosu:
  const minVal = -(Number.MAX_SAFE_INTEGER - 1);
  const maxVal = Number.MAX_SAFE_INTEGER;

  // 1. Matematiksel doğrulama testi (Sınır noktaları ve 0 noktası)
  const mathParams: NumberLineVisualParams = {
    min: minVal,
    max: maxVal,
    points: [
      { id: 'p_min', numerator: minVal, denominator: 1, label: 'Min Sınır' },
      { id: 'p_zero', numerator: 0, denominator: 1, label: 'Sıfır Noktası' },
      { id: 'p_max', numerator: maxVal, denominator: 1, label: 'Max Sınır' }
    ]
  };

  const mathRes = validateMathematicalParams(mathParams);

  // 2. SVG üretimi ve analitik koordinat doğrulaması
  const svg = generateNumberLineSvg(mathParams);

  // Sol sınır tam 45.00 px (eksen başlangıç çentiği), sağ sınır tam 595.00 px (eksen bitiş çentiği),
  // sıfır noktası ise tam ortaya (320.00 px) yerleşmelidir
  const hasMinCx = svg.includes('cx="45.00"');
  const hasMaxCx = svg.includes('cx="595.00"');
  const hasZeroCx = svg.includes('cx="320.00"');

  // SVG içinde üç noktanın da etiketleri eksiksiz bulunmalıdır
  const hasMinLabel = svg.includes('Min Sınır');
  const hasZeroLabel = svg.includes('Sıfır Noktası');
  const hasMaxLabel = svg.includes('Max Sınır');

  // Eksen başlangıç (20px) ve bitiş (620px) uzantı çizgileriyle koordinat uyumu
  const hasAxisLine = svg.includes('x1="20"') && svg.includes('x2="620"');

  // Çentik patlaması engellenmiş olmalı (tickCountBig > 100n korumasıyla yalnızca uçlar ve 0 çizilmeli)
  const isSvgCompact = svg.length < 5000;

  const passed = mathRes.isValid &&
                 hasMinCx && hasMaxCx && hasZeroCx &&
                 hasMinLabel && hasZeroLabel && hasMaxLabel &&
                 hasAxisLine && isSvgCompact;

  reportTest(
    24,
    'test_extreme_safe_integer_boundaries_bigint: MAX_SAFE_INTEGER sınırlarında görsel ve etiket doğruluğu',
    passed,
    `mathValid: ${mathRes.isValid}, minCx (45.00): ${hasMinCx}, maxCx (595.00): ${hasMaxCx}, zeroCx (320.00): ${hasZeroCx}, labels: ${hasMinLabel && hasZeroLabel && hasMaxLabel}, axisLine: ${hasAxisLine}`
  );
} catch (err: unknown) {
  reportTest(24, 'test_extreme_safe_integer_boundaries_bigint', false, `İstisna fırlatıldı: ${String(err)}`);
}

// =============================================================================
// EK TEST 25: Ana ve Alt Çentik Davranış Senaryoları (Senaryo A, B, C, D)
// =============================================================================
try {
  // Senaryo A: Pilot Sayı Doğrusu ([-1, 0] aralığı, 12 alt bölme, Ece ve Mert)
  const pilotSvg = generateNumberLineSvg({
    min: -1,
    max: 0,
    step: 1,
    subdivisions: 12,
    points: [
      { id: 'ece_val', numerator: -5, denominator: 6, label: 'Ece (-5/6)' },
      { id: 'mert_val', numerator: -3, denominator: 4, label: 'Mert (-3/4)' }
    ]
  });

  // 12 eş aralık için tam 11 ara bölme çizgisi (stroke-width="1.2") olmalıdır
  const subTickMatches = pilotSvg.match(/stroke-width="1\.2"/g);
  const subTickCount = subTickMatches ? subTickMatches.length : 0;
  const hasScenarioA_SubTicks = subTickCount === 11;

  // Ece (-5/6 = -10/12) sol çentikten 2/12 uzakta: 45 + (2/12)*550 = 136.67 px
  const hasScenarioA_Ece = pilotSvg.includes('cx="136.67"') && pilotSvg.includes('Ece (-5/6)');

  // Mert (-3/4 = -9/12) sol çentikten 3/12 uzakta: 45 + (3/12)*550 = 182.50 px
  const hasScenarioA_Mert = pilotSvg.includes('cx="182.50"') && pilotSvg.includes('Mert (-3/4)');

  const scenarioAPassed = hasScenarioA_SubTicks && hasScenarioA_Ece && hasScenarioA_Mert;

  // Senaryo B: Ana çentik sayısı 100 sınırının altında ([0, 10], step=1 -> 11 çentik)
  const normalSvg = generateNumberLineSvg({
    min: 0,
    max: 10,
    step: 1,
    points: []
  });
  const hasScenarioB_0 = normalSvg.includes('>0</text>');
  const hasScenarioB_5 = normalSvg.includes('>5</text>');
  const hasScenarioB_10 = normalSvg.includes('>10</text>');
  const scenarioBPassed = hasScenarioB_0 && hasScenarioB_5 && hasScenarioB_10;

  // Senaryo C: Ana çentik sayısı 100 sınırının üzerinde ([0, 500], step=1 -> koruma devreye girmeli)
  const largeTickSvg = generateNumberLineSvg({
    min: 0,
    max: 500,
    step: 1,
    points: []
  });
  // Kilitlenmeden yalnızca uç çentikler (0 ve 500) çizilmeli, ara 499 çentik çizilmemelidir
  const hasScenarioC_Uçlar = largeTickSvg.includes('>0</text>') && largeTickSvg.includes('>500</text>');
  const hasScenarioC_AraYok = !largeTickSvg.includes('>250</text>');
  const scenarioCPassed = hasScenarioC_Uçlar && hasScenarioC_AraYok && largeTickSvg.length < 4000;

  // Senaryo D: Alt çentik sayısı 200 sınırının üzerinde ([0, 20], subdivisions=15 -> 300 alt çentik)
  const largeSubSvg = generateNumberLineSvg({
    min: 0,
    max: 20,
    step: 1,
    subdivisions: 15,
    points: []
  });
  // Alt çentikler 200 sınırını aştığı için çizilmemeli (DOM şişmesi önlenmeli),
  // ancak ana çentikler (20 <= 100) eksiksiz çizilmelidir (bağımsız kontrol doğrulaması)
  const subTickMatchesD = largeSubSvg.match(/stroke-width="1\.2"/g);
  const hasScenarioD_SubGizlendi = subTickMatchesD === null || subTickMatchesD.length === 0;
  const hasScenarioD_AnaKorundu = largeSubSvg.includes('>0</text>') && largeSubSvg.includes('>20</text>');
  const scenarioDPassed = hasScenarioD_SubGizlendi && hasScenarioD_AnaKorundu;

  const passed = scenarioAPassed && scenarioBPassed && scenarioCPassed && scenarioDPassed;
  reportTest(
    25,
    'test_tick_and_subdivision_scenarios_a_b_c_d: Pilot ve sınır çentik senaryolarının bağımsız doğrulaması',
    passed,
    `Senaryo A (Pilot 11 alt çentik, Ece 136.67, Mert 182.50): ${scenarioAPassed}, Senaryo B (<100 çentik): ${scenarioBPassed}, Senaryo C (>100 çentik koruması): ${scenarioCPassed}, Senaryo D (>200 alt çentik koruması): ${scenarioDPassed}`
  );
} catch (err: unknown) {
  reportTest(25, 'test_tick_and_subdivision_scenarios_a_b_c_d', false, `İstisna fırlatıldı: ${String(err)}`);
}

// =============================================================================
// EK TEST 26: Pilot Soru (7. Sınıf Mat S1 Q4) Veri Modeli ve Anlamsal Doğrulama Başarısı
// =============================================================================
try {
  const targetExam = SAMPLE_EXAMS.find(e => e.id === 'exam_7_matematik_1_1_senaryo_1');
  if (!targetExam) {
    throw new Error('exam_7_matematik_1_1_senaryo_1 bulunamadı');
  }

  const q4 = targetExam.questions.find(q => q.questionNumber === 4);
  if (!q4 || !q4.visual) {
    throw new Error('Soru 4 veya görsel verisi bulunamadı');
  }

  // 1. Kaynak Provenance Ayrımı Kontrolleri
  const isQuestionSourceCurated = q4.sourceOrigin === 'oyss_curated';
  const isVisualSourceSvg = q4.visual.sourceOrigin === 'oyss_svg';
  const hasOriginTitle = q4.originExamTitle === '7. Sınıf Matematik 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo 1)';
  const hasOriginNumber = q4.originQuestionNumber === 4;

  // 2. renderQuestionVisual ile Otomatik Anlamsal Doğrulama ve SVG Üretimi
  const renderRes = renderQuestionVisual(q4.visual);

  // 3. SVG Geometri ve Koordinat Doğrulaması
  const svg = renderRes.svg;
  const has11SubTicks = (svg.match(/stroke-width="1\.2"/g) || []).length === 11;
  const hasEcePoint = svg.includes('cx="136.67"') && svg.includes('Ece (-5/6)');
  const hasMertPoint = svg.includes('cx="182.50"') && svg.includes('Mert (-3/4)');
  const isEceLeftOfMert = 136.67 < 182.50;

  const passed = isQuestionSourceCurated &&
                 isVisualSourceSvg &&
                 hasOriginTitle &&
                 hasOriginNumber &&
                 renderRes.isValid &&
                 has11SubTicks &&
                 hasEcePoint &&
                 hasMertPoint &&
                 isEceLeftOfMert;

  reportTest(
    26,
    'test_pilot_question_data_model_and_semantic_success: 7. Sınıf Mat S1 Q4 veri modeli, kaynak ayrımı ve anlamsal doğrulama',
    passed,
    `q.sourceOrigin (${q4.sourceOrigin}): ${isQuestionSourceCurated}, visual.sourceOrigin (${q4.visual.sourceOrigin}): ${isVisualSourceSvg}, isValid: ${renderRes.isValid}, 11 sub-ticks: ${has11SubTicks}, Ece(136.67): ${hasEcePoint}, Mert(182.50): ${hasMertPoint}, EceLeftOfMert: ${isEceLeftOfMert}`
  );
} catch (err: unknown) {
  reportTest(26, 'test_pilot_question_data_model_and_semantic_success', false, `İstisna fırlatıldı: ${String(err)}`);
}

// =============================================================================
// EK TEST 27: Pilot Soruda Bozuk Çapa veya Yanlış Noktada Fallback Mekanizması
// =============================================================================
try {
  const targetExam = SAMPLE_EXAMS.find(e => e.id === 'exam_7_matematik_1_1_senaryo_1');
  const q4 = targetExam?.questions.find(q => q.questionNumber === 4);
  if (!q4 || !q4.visual) {
    throw new Error('Soru 4 veya görsel verisi bulunamadı');
  }

  // Senaryo 1: Yanlış ID (ece_val yerine unknown_id verildiğinde)
  const corruptedIdVisual: QuestionVisual = JSON.parse(JSON.stringify(q4.visual));
  (corruptedIdVisual.params as NumberLineVisualParams).points[0].id = 'unknown_id';
  const resCorruptedId = renderQuestionVisual(corruptedIdVisual);

  const idFailedGracefully = resCorruptedId.isValid === false &&
                             (resCorruptedId.errorReason?.includes('ece_val') ?? false) &&
                             resCorruptedId.svg.includes('Matematiksel Çizim Yüklenemedi');

  // Senaryo 2: Yanlış Kesir (Mert -3/4 yerine -1/2 verildiğinde)
  const corruptedFractionVisual: QuestionVisual = JSON.parse(JSON.stringify(q4.visual));
  (corruptedFractionVisual.params as NumberLineVisualParams).points[1].numerator = -1;
  (corruptedFractionVisual.params as NumberLineVisualParams).points[1].denominator = 2;
  const resCorruptedFraction = renderQuestionVisual(corruptedFractionVisual);

  const fractionFailedGracefully = resCorruptedFraction.isValid === false &&
                                   (resCorruptedFraction.errorReason?.includes('kesir değeri uyuşmuyor') ?? false) &&
                                   resCorruptedFraction.svg.includes('Matematiksel Çizim Yüklenemedi');

  const passed = idFailedGracefully && fractionFailedGracefully;
  reportTest(
    27,
    'test_pilot_question_semantic_failure_fallback: Yanlış ID veya yanlış kesirde kontrollü fallback üretimi',
    passed,
    `Yanlış ID Fallback: ${idFailedGracefully} (reason: "${resCorruptedId.errorReason}"), Yanlış Kesir Fallback: ${fractionFailedGracefully} (reason: "${resCorruptedFraction.errorReason}")`
  );
} catch (err: unknown) {
  reportTest(27, 'test_pilot_question_semantic_failure_fallback', false, `İstisna fırlatıldı: ${String(err)}`);
}

console.log('=== TEST ÖZETİ ===');
console.log(`Toplam Test: ${passCount + failCount}`);
console.log(`Başarılı: ${passCount}`);
console.log(`Başarısız: ${failCount}`);

if (failCount === 0) {
  console.log('\n>>> TÜM SVG MATEMATİK MOTORU KABUL TESTLERİ BAŞARIYLA GEÇTİ! <<<');
} else {
  console.error('\n>>> BAZI TESTLER BAŞARISIZ OLDU! <<<');
  throw new Error(`${failCount} adet test başarısız oldu!`);
}
