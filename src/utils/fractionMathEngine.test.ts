/**
 * OYSS Rehberi | Modüler Kesir Görselleştirme Motoru Kabul Testleri (FAZ 3.1.1)
 * fractionMathEngine.test.ts
 * 
 * Faz 3.1.1 Teknik Düzeltmeleri ve Kabul Kriterleri:
 * - TEST 01: "r1" ve " r1 " girdilerinin farklı ID üretmesi (boşlukların _20_ olarak kaçırılması)
 * - TEST 02: Farklı özel karakterli girdilerin çakışmaması (:r1:, r:1, r_1, r-1, _3a_)
 * - TEST 03: Unicode ve emoji ID dönüşümünün çakışmasız olması (🚀 -> _1f680_)
 * - TEST 04: Eksik/boş instanceId durumunda sabit varsayılan ID üretilmeyip kontrollü hata verilmesi
 * - TEST 05: Farklı instanceId'lerle üretilen iki ayrı SVG örneğinde desen ID çakışmaması
 * - TEST 06: 4 farklı desen türünün (hatch_r, hatch_l, dots, crosshatch) SVG defs üretimi
 * - TEST 07: Sıfır pay (0/d) koordinatının BigInt algoritmasıyla tam "90.00" üretilmesi
 * - TEST 08: BigInt ile 1/3, 2/6 ve 4/12 koordinatlarının "256.67" ve tam bütün sınırının "590.00" kalması
 * - TEST 09: 5. Sınıf pilot modeli (1/2 = 2/4 = 4/8) hizalaması ("340.00") ve denk olmayanda kılavuz reddi
 * - TEST 10: Genel motorun 0/4'ü geçerli sayması ve renderFractionModel içinde strictPilotMode bulunmaması
 * - TEST 11: Pilot doğrulamasının (validateFractionPilotConstraints) 0/4'ü bağımsız olarak reddetmesi
 * - TEST 12: Payda sınır değeri davranışı (d=30 kabul, d=31 ret)
 * - TEST 13: Geçersiz wholeWidth ve padX parametrelerinin (negatif, float, NaN, Infinity) kontrollü reddi
 * - TEST 14: Geçersiz parametrelerde (d=0, n>d, negatif, boş şerit) güvenli fallback
 * - TEST 15: QuestionVisualView bileşeniyle tam SSR render ve instanceId aktarımı
 * - TEST 16: Sayı doğrusu ve kesir modeli arasında regresyonsuz dispatcher doğrulaması
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  gcdBigInt,
  reduceFractionToCanonical,
  computeCanonicalRightBoundary,
  computeCellBoundary,
  validateGeometryParameters,
  validateFractionNumbers,
  sanitizeSvgInstanceId,
  validateFractionModelParams,
  validateFractionPilotConstraints,
  generateFractionPatternDefs,
  generateFractionBarSvg,
  renderFractionModel
} from './fractionMathEngine';
import { renderQuestionVisual } from './svgMathEngine';
import { QuestionVisualView } from '../components/QuestionVisualView';
import { FractionModelVisual, FractionModelVisualParams } from '../types';

console.log('=== OYSS FAZ 3.1.1: KESİR GÖRSELLEŞTİRME MOTORU KABUL TESTLERİ BAŞLIYOR ===\n');

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
// TEST 01: "r1" ve " r1 " girdilerinin farklı ID üretmesi (boşlukların _20_ olması)
// =============================================================================
try {
  const idSimple = sanitizeSvgInstanceId('r1');
  const idSpaced = sanitizeSvgInstanceId(' r1 ');

  const areDifferent = idSimple !== idSpaced;
  const isSpacedEscaped = idSpaced === '_20_r1_20_';

  reportTest(
    1,
    'test_id_sanitization_spaces_not_trimmed: "r1" ve " r1 " girdilerinin farklı ID üretmesi',
    areDifferent && isSpacedEscaped && idSimple === 'r1',
    `"r1" -> "${idSimple}", " r1 " -> "${idSpaced}", Farklı: ${areDifferent}`
  );
} catch (err: unknown) {
  reportTest(1, 'test_id_sanitization_spaces_not_trimmed', false, String(err));
}

// =============================================================================
// TEST 02: Farklı özel karakterli girdilerin çakışmaması (:r1:, r:1, r_1, r-1, _3a_)
// =============================================================================
try {
  const in1 = ':r1:';
  const in2 = 'r:1';
  const in3 = 'r_1';
  const in4 = 'r-1';
  const in5 = '_3a_';

  const out1 = sanitizeSvgInstanceId(in1);
  const out2 = sanitizeSvgInstanceId(in2);
  const out3 = sanitizeSvgInstanceId(in3);
  const out4 = sanitizeSvgInstanceId(in4);
  const out5 = sanitizeSvgInstanceId(in5);

  const setOfOutputs = new Set([out1, out2, out3, out4, out5]);
  const allUnique = setOfOutputs.size === 5;
  const under3aEscaped = out5 === '_5f_3a_5f_'; // _3a_ ham girdisi _5f_3a_5f_ olmalı, : ile çakışamaz

  reportTest(
    2,
    'test_id_sanitization_special_characters_collision_free: Özel karakterli girdilerin çakışmasızlığı',
    allUnique && under3aEscaped,
    `":r1:" -> "${out1}", "r:1" -> "${out2}", "r_1" -> "${out3}", "r-1" -> "${out4}", "_3a_" -> "${out5}"`
  );
} catch (err: unknown) {
  reportTest(2, 'test_id_sanitization_special_characters_collision_free', false, String(err));
}

// =============================================================================
// TEST 03: Unicode ve emoji ID dönüşümünün çakışmasız olması (🚀 -> _1f680_)
// =============================================================================
try {
  const emojiId = sanitizeSvgInstanceId('roket🚀');
  const turkishId = sanitizeSvgInstanceId('şerit_çözüm_ü');

  const hasEmojiCode = emojiId === 'roket_1f680_';
  const hasTurkishCodes = turkishId === '_15f_erit_5f__e7__f6_z_fc_m_5f__fc_';

  reportTest(
    3,
    'test_id_sanitization_unicode_and_emoji: Unicode ve surrogate pair emojilerin güvenli hex kodlanması',
    hasEmojiCode && hasTurkishCodes,
    `"roket🚀" -> "${emojiId}", "şerit_çözüm_ü" -> "${turkishId}"`
  );
} catch (err: unknown) {
  reportTest(3, 'test_id_sanitization_unicode_and_emoji', false, String(err));
}

// =============================================================================
// TEST 04: Eksik/boş instanceId durumunda sabit varsayılan ID üretilmeyip kontrollü hata verilmesi
// =============================================================================
try {
  let emptyThrows = false;
  try {
    sanitizeSvgInstanceId('');
  } catch {
    emptyThrows = true;
  }

  let undefinedThrows = false;
  try {
    sanitizeSvgInstanceId(undefined);
  } catch {
    undefinedThrows = true;
  }

  // renderFractionModel çağrısında options.instanceId yoksa kontrollü fallback dönmeli
  const visual: FractionModelVisual = {
    type: 'fraction_model',
    sourceOrigin: 'oyss_svg',
    params: { modelKind: 'fraction_bar', bars: [{ id: 'b1', fraction: { numerator: 1, denominator: 2 } }] }
  };
  const renderNoInst = renderFractionModel(visual); // instanceId yok
  const renderRejects = renderNoInst.isValid === false && (renderNoInst.errorReason?.includes('instanceId zorunludur') ?? false);

  reportTest(
    4,
    'test_missing_instance_id_no_static_default: Eksik instanceId durumunda sabit varsayılan üretilmeyip ret verilmesi',
    emptyThrows && undefinedThrows && renderRejects,
    `emptyThrows: ${emptyThrows}, undefinedThrows: ${undefinedThrows}, renderRejects: ${renderRejects}`
  );
} catch (err: unknown) {
  reportTest(4, 'test_missing_instance_id_no_static_default', false, String(err));
}

// =============================================================================
// TEST 05: Farklı instanceId'lerle üretilen iki ayrı SVG örneğinde desen ID çakışmaması
// =============================================================================
try {
  const sampleParams: FractionModelVisualParams = {
    modelKind: 'fraction_bar',
    bars: [
      { id: 'b1', fraction: { numerator: 1, denominator: 2 }, pattern: 'hatch_diagonal_right' }
    ]
  };

  const id1 = 'inst-alpha';
  const id2 = 'inst-beta';
  const svg1 = generateFractionBarSvg(sampleParams, { instanceId: id1 });
  const svg2 = generateFractionBarSvg(sampleParams, { instanceId: id2 });

  const clean1 = sanitizeSvgInstanceId(id1);
  const clean2 = sanitizeSvgInstanceId(id2);
  const hasPat1 = svg1.includes(`id="oyss-pat-${clean1}-0-hatch_diagonal_right"`);
  const hasPat2 = svg2.includes(`id="oyss-pat-${clean2}-0-hatch_diagonal_right"`);
  const noCollision = !svg1.includes(clean2) && !svg2.includes(clean1);

  reportTest(
    5,
    'test_unique_svg_pattern_ids_across_instances: İki ayrı örnekte desen ID çakışması olmaksızın üretim',
    hasPat1 && hasPat2 && noCollision,
    `Örnek 1 ID: "${clean1}" (${hasPat1}), Örnek 2 ID: "${clean2}" (${hasPat2}), Çakışmasız: ${noCollision}`
  );
} catch (err: unknown) {
  reportTest(5, 'test_unique_svg_pattern_ids_across_instances', false, String(err));
}

// =============================================================================
// TEST 06: 4 farklı desen türünün (hatch_r, hatch_l, dots, crosshatch) SVG defs üretimi
// =============================================================================
try {
  const sampleParams: FractionModelVisualParams = {
    modelKind: 'fraction_bar',
    bars: [
      { id: 'b1', fraction: { numerator: 1, denominator: 2 }, pattern: 'hatch_diagonal_right' },
      { id: 'b2', fraction: { numerator: 2, denominator: 4 }, pattern: 'hatch_diagonal_left' },
      { id: 'b3', fraction: { numerator: 4, denominator: 8 }, pattern: 'dots' },
      { id: 'b4', fraction: { numerator: 3, denominator: 6 }, pattern: 'crosshatch' }
    ]
  };

  const testInst = 'test-patterns';
  const cleanInst = sanitizeSvgInstanceId(testInst);
  const defsString = generateFractionPatternDefs(cleanInst, sampleParams.bars);
  const svg = generateFractionBarSvg(sampleParams, { instanceId: testInst });

  const hasHatchR = svg.includes(`id="oyss-pat-${cleanInst}-0-hatch_diagonal_right"`) && defsString.includes('hatch_diagonal_right');
  const hasHatchL = svg.includes(`id="oyss-pat-${cleanInst}-1-hatch_diagonal_left"`) && defsString.includes('hatch_diagonal_left');
  const hasDots = svg.includes(`id="oyss-pat-${cleanInst}-2-dots"`) && defsString.includes('dots');
  const hasCross = svg.includes(`id="oyss-pat-${cleanInst}-3-crosshatch"`) && defsString.includes('crosshatch');
  const hasAllPatterns = hasHatchR && hasHatchL && hasDots && hasCross;

  reportTest(
    6,
    'test_pattern_defs_diversity: 4 farklı desen türünün benzersiz ve doğru tanımlarla üretilmesi',
    hasAllPatterns,
    `HatchR: ${hasHatchR}, HatchL: ${hasHatchL}, Dots: ${hasDots}, Crosshatch: ${hasCross}`
  );
} catch (err: unknown) {
  reportTest(6, 'test_pattern_defs_diversity', false, String(err));
}

// =============================================================================
// TEST 07: Sıfır pay (0/d) koordinatının BigInt algoritmasıyla tam "90.00" üretilmesi
// =============================================================================
try {
  const coordZero4 = computeCanonicalRightBoundary(0, 4);
  const coordZero7 = computeCanonicalRightBoundary(0, 7);

  const isExact90 = coordZero4 === '90.00' && coordZero7 === '90.00';

  reportTest(
    7,
    'test_zero_numerator_bigint_coordinate_90: Sıfır pay koordinatının toFixed olmadan BigInt ile tam "90.00" olması',
    isExact90,
    `0/4 koordinatı: "${coordZero4}", 0/7 koordinatı: "${coordZero7}" (Beklenen: "90.00")`
  );
} catch (err: unknown) {
  reportTest(7, 'test_zero_numerator_bigint_coordinate_90', false, String(err));
}

// =============================================================================
// TEST 08: BigInt ile 1/3, 2/6 ve 4/12 koordinatlarının "256.67" ve tam bütün sınırının "590.00" kalması
// =============================================================================
try {
  const gcdVal = gcdBigInt(4n, 12n);
  const redVal = reduceFractionToCanonical(4, 12);
  const gcdCorrect = gcdVal === 4n && redVal.nPrime === 1n && redVal.dPrime === 3n;

  const coord1_3 = computeCanonicalRightBoundary(1, 3);
  const coord2_6 = computeCanonicalRightBoundary(2, 6);
  const coord4_12 = computeCanonicalRightBoundary(4, 12);

  const allEqual25667 = coord1_3 === '256.67' && coord2_6 === '256.67' && coord4_12 === '256.67';

  // k = d sınır testi (padX=90, wholeWidth=500 -> 590.00)
  const end3_3 = computeCellBoundary(3, 3);
  const end6_6 = computeCellBoundary(6, 6);
  const end12_12 = computeCellBoundary(12, 12);
  const allEndExact = end3_3 === '590.00' && end6_6 === '590.00' && end12_12 === '590.00';

  reportTest(
    8,
    'test_bigint_canonical_coordinates_1_3_2_6_4_12: Denk kesirlerin özdeş "256.67" ve tam "590.00" üretmesi',
    gcdCorrect && allEqual25667 && allEndExact,
    `gcd=${gcdVal}, 1/3=${coord1_3}, 2/6=${coord2_6}, 4/12=${coord4_12} (Beklenen: "256.67") | Bitişler: 3/3=${end3_3}, 12/12=${end12_12}`
  );
} catch (err: unknown) {
  reportTest(8, 'test_bigint_canonical_coordinates_1_3_2_6_4_12', false, String(err));
}

// =============================================================================
// TEST 09: 5. Sınıf pilot modeli (1/2 = 2/4 = 4/8) hizalaması ("340.00") ve denk olmayanda kılavuz reddi
// =============================================================================
try {
  const pilotParams: FractionModelVisualParams = {
    modelKind: 'fraction_bar',
    showEquivalenceGuide: true,
    bars: [
      { id: 'bar-1', label: '1/2', fraction: { numerator: 1, denominator: 2 }, showUnitFractionLabels: true },
      { id: 'bar-2', label: '2/4', fraction: { numerator: 2, denominator: 4 }, showUnitFractionLabels: true },
      { id: 'bar-3', label: '4/8', fraction: { numerator: 4, denominator: 8 }, showUnitFractionLabels: true }
    ]
  };

  const pilotSvg = generateFractionBarSvg(pilotParams, { instanceId: 'pilot-inst' });
  const hasGuideLine = pilotSvg.includes('x1="340.00"') && pilotSvg.includes('x2="340.00"');
  const hasDashedStroke = pilotSvg.includes('stroke-dasharray="5,4"');

  // Denk olmayan kesirler verildiğinde kılavuz çizgisinin reddi
  const nonEquivalentParams: FractionModelVisualParams = {
    modelKind: 'fraction_bar',
    showEquivalenceGuide: true,
    bars: [
      { id: 'bar-1', fraction: { numerator: 1, denominator: 2 } },
      { id: 'bar-2', fraction: { numerator: 2, denominator: 3 } }
    ]
  };
  const nonEquivRes = validateFractionModelParams(nonEquivalentParams);
  const guideRejected = nonEquivRes.isValid === false && (nonEquivRes.reason?.includes('Denk olmayan kesirler') ?? false);

  reportTest(
    9,
    'test_pilot_equivalence_guide_340_and_rejection: Pilot 1/2=2/4=4/8 hizalaması ("340.00") ve denk olmayanda ret',
    hasGuideLine && hasDashedStroke && guideRejected,
    `GuideLine (x=340.00): ${hasGuideLine}, Dashed: ${hasDashedStroke}, Denk olmayan ret: ${guideRejected}`
  );
} catch (err: unknown) {
  reportTest(9, 'test_pilot_equivalence_guide_340_and_rejection', false, String(err));
}

// =============================================================================
// TEST 10: Genel motorun 0/4'ü geçerli sayması ve renderFractionModel içinde strictPilotMode bulunmaması
// =============================================================================
try {
  const zeroParams: FractionModelVisualParams = {
    modelKind: 'fraction_bar',
    bars: [
      { id: 'zero-bar', fraction: { numerator: 0, denominator: 4 } },
      { id: 'second-bar', fraction: { numerator: 0, denominator: 6 } }
    ]
  };

  // 1. Genel matematik motoru doğrulaması 0/d'yi kabul eder
  const generalMathRes = validateFractionModelParams(zeroParams);
  const generalValid = generalMathRes.isValid === true;

  // 2. Genel render motoru (strictPilotMode seçeneği olmadan) 0/d'yi render eder
  const zeroVisual: FractionModelVisual = {
    type: 'fraction_model',
    sourceOrigin: 'oyss_svg',
    params: zeroParams
  };
  const renderRes = renderFractionModel(zeroVisual, { instanceId: 'inst-zero-test' });
  const renderSuccess = renderRes.isValid === true && renderRes.svg.includes('<svg');

  reportTest(
    10,
    'test_zero_numerator_general_engine_accepted: Genel render motorunda 0/4 geçerli ve strictPilotMode bayrağı kaldırılmış',
    generalValid && renderSuccess,
    `validateFractionModelParams: ${generalValid}, renderFractionModel: ${renderSuccess}`
  );
} catch (err: unknown) {
  reportTest(10, 'test_zero_numerator_general_engine_accepted', false, String(err));
}

// =============================================================================
// TEST 11: Pilot doğrulamasının (validateFractionPilotConstraints) 0/4'ü bağımsız olarak reddetmesi
// =============================================================================
try {
  const zeroParams: FractionModelVisualParams = {
    modelKind: 'fraction_bar',
    bars: [
      { id: 'zero-bar', fraction: { numerator: 0, denominator: 4 } },
      { id: 'second-bar', fraction: { numerator: 0, denominator: 6 } }
    ]
  };

  // Pilot katmanı render motorundan bağımsız ayrı fonksiyondur
  const pilotRes = validateFractionPilotConstraints(zeroParams);
  const pilotRejected = pilotRes.isValid === false && (pilotRes.reason?.includes('payı en az 1 olmalıdır') ?? false);

  reportTest(
    11,
    'test_pilot_validation_independent_rejection: validateFractionPilotConstraints bağımsız katmanında 0/4 reddi',
    pilotRejected,
    `pilotRes.isValid: ${pilotRes.isValid}, reason: "${pilotRes.reason}"`
  );
} catch (err: unknown) {
  reportTest(11, 'test_pilot_validation_independent_rejection', false, String(err));
}

// =============================================================================
// TEST 12: Payda sınır değeri davranışı (d=30 kabul, d=31 ret)
// =============================================================================
try {
  const params30: FractionModelVisualParams = {
    modelKind: 'fraction_bar',
    bars: [{ id: 'bar-30', fraction: { numerator: 15, denominator: 30 } }]
  };
  const res30 = validateFractionModelParams(params30);

  const params31: FractionModelVisualParams = {
    modelKind: 'fraction_bar',
    bars: [{ id: 'bar-31', fraction: { numerator: 15, denominator: 31 } }]
  };
  const res31 = validateFractionModelParams(params31);
  const rejected31 = res31.isValid === false && (res31.reason?.includes('görsel okunabilirlik sınırını aştı') ?? false);

  reportTest(
    12,
    'test_denominator_threshold_d30_valid_d31_rejected: d=30 kabul, d=31 tipografi tavanı reddi',
    res30.isValid === true && rejected31,
    `d=30 isValid=${res30.isValid}, d=31 isValid=${res31.isValid} (reason="${res31.reason}")`
  );
} catch (err: unknown) {
  reportTest(12, 'test_denominator_threshold_d30_valid_d31_rejected', false, String(err));
}

// =============================================================================
// TEST 13: Geçersiz wholeWidth ve padX parametrelerinin (negatif, float, NaN, Infinity) kontrollü reddi
// =============================================================================
try {
  let floatWidthThrows = false;
  try {
    validateGeometryParameters(500.5, 90);
  } catch {
    floatWidthThrows = true;
  }

  let negPadThrows = false;
  try {
    validateGeometryParameters(500, -10);
  } catch {
    negPadThrows = true;
  }

  let nanThrows = false;
  try {
    validateGeometryParameters(NaN, 90);
  } catch {
    nanThrows = true;
  }

  let infThrows = false;
  try {
    validateGeometryParameters(Infinity, 90);
  } catch {
    infThrows = true;
  }

  // Model params içinde float wholeWidth
  const badParamObj: FractionModelVisualParams = {
    modelKind: 'fraction_bar',
    wholeWidth: 500.25,
    bars: [{ id: 'b1', fraction: { numerator: 1, denominator: 2 } }]
  };
  const badParamRes = validateFractionModelParams(badParamObj);
  const paramRejected = badParamRes.isValid === false && (badParamRes.reason?.includes('wholeWidth') ?? false);

  const allGeometrySafe = floatWidthThrows && negPadThrows && nanThrows && infThrows && paramRejected;

  reportTest(
    13,
    'test_geometry_parameters_strict_validation: wholeWidth ve padX için float, NaN, Infinity ve negatif ret kontrolü',
    allGeometrySafe,
    `floatWidth: ${floatWidthThrows}, negPad: ${negPadThrows}, NaN: ${nanThrows}, Infinity: ${infThrows}, paramRejected: ${paramRejected}`
  );
} catch (err: unknown) {
  reportTest(13, 'test_geometry_parameters_strict_validation', false, String(err));
}

// =============================================================================
// TEST 14: Geçersiz parametrelerde (d=0, n>d, negatif, boş şerit) güvenli fallback
// =============================================================================
try {
  const badParamsList: unknown[] = [
    { modelKind: 'fraction_bar', bars: [{ id: 'b1', fraction: { numerator: 1, denominator: 0 } }] }, // d=0
    { modelKind: 'fraction_bar', bars: [{ id: 'b1', fraction: { numerator: 5, denominator: 4 } }] }, // n > d
    { modelKind: 'fraction_bar', bars: [{ id: 'b1', fraction: { numerator: -1, denominator: 4 } }] }, // n < 0
    { modelKind: 'fraction_bar', bars: [] }, // boş bars
    { modelKind: 'fraction_circle', bars: [{ id: 'b1', fraction: { numerator: 1, denominator: 2 } }] } // desteklenmeyen kind
  ];

  let allFailedSafely = true;
  badParamsList.forEach((badP) => {
    const visual = { type: 'fraction_model', sourceOrigin: 'oyss_svg', params: badP } as FractionModelVisual;
    const res = renderQuestionVisual(visual, { instanceId: 'fallback-inst' });
    if (res.isValid || !res.svg.includes('<svg') || !res.errorReason) {
      allFailedSafely = false;
    }
  });

  reportTest(
    14,
    'test_invalid_params_safe_fallbacks: d=0, n>d, negatif, boş şerit gibi hatalarda çökmeden fallback SVG',
    allFailedSafely,
    `5 ayrı hatalı senaryonun tamamı çökmeden güvenli fallback ve hata nedeni döndürdü: ${allFailedSafely}`
  );
} catch (err: unknown) {
  reportTest(14, 'test_invalid_params_safe_fallbacks', false, String(err));
}

// =============================================================================
// TEST 15: QuestionVisualView bileşeniyle tam SSR render ve instanceId aktarımı
// =============================================================================
try {
  const fractionVisual: FractionModelVisual = {
    type: 'fraction_model',
    sourceOrigin: 'oyss_svg',
    caption: '5. Sınıf Denk Kesirler Şerit Modeli',
    params: {
      modelKind: 'fraction_bar',
      showEquivalenceGuide: true,
      bars: [
        { id: 'b1', label: '1/2', fraction: { numerator: 1, denominator: 2 }, pattern: 'hatch_diagonal_right' },
        { id: 'b2', label: '2/4', fraction: { numerator: 2, denominator: 4 }, pattern: 'hatch_diagonal_left' }
      ]
    }
  };

  const testNodeId = 'ssr-test-node';
  const cleanNodeId = sanitizeSvgInstanceId(testNodeId);
  const html = renderToString(
    React.createElement(QuestionVisualView, {
      visual: fractionVisual,
      instanceId: testNodeId
    })
  );

  const hasFigure = html.includes('<figure');
  const hasCaption = html.includes('5. Sınıf Denk Kesirler Şerit Modeli');
  const hasSvg = html.includes('<svg');
  const hasGuide = html.includes('x1="340.00"');
  const hasCustomInst = html.includes(`oyss-pat-${cleanNodeId}`);

  const allRenderPassed = hasFigure && hasCaption && hasSvg && hasGuide && hasCustomInst;

  reportTest(
    15,
    'test_react_question_visual_view_ssr_fraction: QuestionVisualView bileşeniyle tam SSR render bütünlüğü',
    allRenderPassed,
    `figure: ${hasFigure}, caption: ${hasCaption}, svg: ${hasSvg}, guide(340.00): ${hasGuide}, customId: ${hasCustomInst}`
  );
} catch (err: unknown) {
  reportTest(15, 'test_react_question_visual_view_ssr_fraction', false, String(err));
}

// =============================================================================
// TEST 16: Sayı Doğrusu ve Kesir Modeli Arasında Regresyonsuz Dispatcher Doğrulaması
// =============================================================================
try {
  // 1. Sayı doğrusu nesnesi
  const nlVisual = {
    type: 'number_line' as const,
    sourceOrigin: 'oyss_svg' as const,
    params: {
      min: -1,
      max: 0,
      step: 1,
      subdivisions: 12,
      points: [{ id: 'p1', numerator: -1, denominator: 2 }]
    }
  };
  const nlRes = renderQuestionVisual(nlVisual, { instanceId: 'nl-inst' });

  // 2. Kesir modeli nesnesi
  const fracVisual: FractionModelVisual = {
    type: 'fraction_model',
    sourceOrigin: 'oyss_svg',
    params: {
      modelKind: 'fraction_bar',
      bars: [{ id: 'b1', fraction: { numerator: 1, denominator: 3 } }]
    }
  };
  const fracRes = renderQuestionVisual(fracVisual, { instanceId: 'frac-inst' });

  const bothSucceeded = nlRes.isValid && nlRes.svg.includes('Sayı doğrusu') &&
                        fracRes.isValid && fracRes.svg.includes('Kesir Modeli');

  reportTest(
    16,
    'test_dispatcher_polymorphism_no_regression: renderQuestionVisual dispatcher hem sayı doğrusu hem kesir modelini başarıyla yönetir',
    bothSucceeded,
    `NumberLine isValid: ${nlRes.isValid}, FractionModel isValid: ${fracRes.isValid}`
  );
} catch (err: unknown) {
  reportTest(16, 'test_dispatcher_polymorphism_no_regression', false, String(err));
}

// =============================================================================
// TEST 17: Doğrudan reduceFractionToCanonical() Geçersiz Giriş Reddi (Faz 3.1.3)
// =============================================================================
try {
  let throwsNaNNum = false;
  let throwsInvalDen = false;
  let throwsFloatNum = false;
  let throwsFloatDen = false;
  let throwsUnsafeNum = false;
  let throwsUnsafeDen = false;
  let throwsNegNum = false;
  let throwsZeroDen = false;
  let throwsNegDen = false;

  try { reduceFractionToCanonical(NaN as unknown as number, 4); } catch (e) { throwsNaNNum = e instanceof TypeError; }
  try { reduceFractionToCanonical(1, Infinity as unknown as number); } catch (e) { throwsInvalDen = e instanceof TypeError; }
  try { reduceFractionToCanonical(1.5, 4); } catch (e) { throwsFloatNum = e instanceof TypeError; }
  try { reduceFractionToCanonical(1, 2.5); } catch (e) { throwsFloatDen = e instanceof TypeError; }
  try { reduceFractionToCanonical(Number.MAX_SAFE_INTEGER + 10, 4); } catch (e) { throwsUnsafeNum = e instanceof TypeError; }
  try { reduceFractionToCanonical(1, Number.MAX_SAFE_INTEGER + 10); } catch (e) { throwsUnsafeDen = e instanceof TypeError; }
  try { reduceFractionToCanonical(-1, 4); } catch (e) { throwsNegNum = e instanceof RangeError; }
  try { reduceFractionToCanonical(1, 0); } catch (e) { throwsZeroDen = e instanceof RangeError; }
  try { reduceFractionToCanonical(1, -4); } catch (e) { throwsNegDen = e instanceof RangeError; }

  const allRejectedControlled = throwsNaNNum && throwsInvalDen && throwsFloatNum && throwsFloatDen &&
                                throwsUnsafeNum && throwsUnsafeDen && throwsNegNum && throwsZeroDen && throwsNegDen;

  reportTest(
    17,
    'test_direct_call_reduce_fraction_invalid_inputs_rejection: reduceFractionToCanonical() geçersiz girdileri kontrollü reddeder',
    allRejectedControlled,
    `NaN: ${throwsNaNNum}, Inf: ${throwsInvalDen}, Float: ${throwsFloatNum && throwsFloatDen}, Unsafe: ${throwsUnsafeNum && throwsUnsafeDen}, NegN: ${throwsNegNum}, ZeroD: ${throwsZeroDen}, NegD: ${throwsNegDen}`
  );
} catch (err: unknown) {
  reportTest(17, 'test_direct_call_reduce_fraction_invalid_inputs_rejection', false, String(err));
}

// =============================================================================
// TEST 18: Doğrudan computeCanonicalRightBoundary() Geçersiz Giriş Reddi (Faz 3.1.3)
// =============================================================================
try {
  let throwsNaNNum = false;
  let throwsInvalDen = false;
  let throwsFloatNum = false;
  let throwsFloatDen = false;
  let throwsUnsafeNum = false;
  let throwsUnsafeDen = false;
  let throwsNegNum = false;
  let throwsZeroDen = false;
  let throwsNegDen = false;

  try { computeCanonicalRightBoundary(NaN as unknown as number, 4); } catch (e) { throwsNaNNum = e instanceof TypeError; }
  try { computeCanonicalRightBoundary(1, Infinity as unknown as number); } catch (e) { throwsInvalDen = e instanceof TypeError; }
  try { computeCanonicalRightBoundary(1.5, 4); } catch (e) { throwsFloatNum = e instanceof TypeError; }
  try { computeCanonicalRightBoundary(1, 2.5); } catch (e) { throwsFloatDen = e instanceof TypeError; }
  try { computeCanonicalRightBoundary(Number.MAX_SAFE_INTEGER + 10, 4); } catch (e) { throwsUnsafeNum = e instanceof TypeError; }
  try { computeCanonicalRightBoundary(1, Number.MAX_SAFE_INTEGER + 10); } catch (e) { throwsUnsafeDen = e instanceof TypeError; }
  try { computeCanonicalRightBoundary(-1, 4); } catch (e) { throwsNegNum = e instanceof RangeError; }
  try { computeCanonicalRightBoundary(1, 0); } catch (e) { throwsZeroDen = e instanceof RangeError; }
  try { computeCanonicalRightBoundary(1, -4); } catch (e) { throwsNegDen = e instanceof RangeError; }

  const allBoundaryRejected = throwsNaNNum && throwsInvalDen && throwsFloatNum && throwsFloatDen &&
                              throwsUnsafeNum && throwsUnsafeDen && throwsNegNum && throwsZeroDen && throwsNegDen;

  reportTest(
    18,
    'test_direct_call_compute_canonical_boundary_invalid_inputs_rejection: computeCanonicalRightBoundary() geçersiz girdileri bağımsız olarak reddeder',
    allBoundaryRejected,
    `NaN: ${throwsNaNNum}, Inf: ${throwsInvalDen}, Float: ${throwsFloatNum && throwsFloatDen}, Unsafe: ${throwsUnsafeNum && throwsUnsafeDen}, NegN: ${throwsNegNum}, ZeroD: ${throwsZeroDen}, NegD: ${throwsNegDen}`
  );
} catch (err: unknown) {
  reportTest(18, 'test_direct_call_compute_canonical_boundary_invalid_inputs_rejection', false, String(err));
}

// =============================================================================
// TEST 19: Sıfır Pay ve Bileşik Kesirlerin Alt Seviyede Kabul Edilmesi (Faz 3.1.3)
// =============================================================================
try {
  // 1. Sıfır pay (0/d) her iki fonksiyonda da tamamen geçerli olmalı
  const zeroReduced = reduceFractionToCanonical(0, 4);
  const zeroBoundary = computeCanonicalRightBoundary(0, 4);
  const zeroValid = zeroReduced.nPrime === 0n && zeroReduced.dPrime === 1n && zeroBoundary === '90.00';

  // 2. Bileşik kesirler (numerator > denominator) alt seviyede asla reddedilmemeli
  const improperReduced = reduceFractionToCanonical(5, 3);
  const improperBoundary = computeCanonicalRightBoundary(5, 3, 500, 90);
  // 90 + (5 * 500 * 100) / 3 = 9000 + 83333 + 1 = 92334 -> 923.34
  const improperReduced2 = reduceFractionToCanonical(4, 2);
  const improperBoundary2 = computeCanonicalRightBoundary(4, 2, 500, 90);
  // 90 + (2 * 500) = 1090.00

  const improperValid = improperReduced.nPrime === 5n && improperReduced.dPrime === 3n &&
                        improperBoundary === '923.33' &&
                        improperReduced2.nPrime === 2n && improperReduced2.dPrime === 1n &&
                        improperBoundary2 === '1090.00';

  reportTest(
    19,
    'test_direct_call_zero_numerator_and_improper_fractions_valid: Sıfır pay (0/d) ve bileşik kesirler (n > d) alt seviyede geçerlidir',
    zeroValid && improperValid,
    `0/4 -> nPrime: ${zeroReduced.nPrime}, dPrime: ${zeroReduced.dPrime}, boundary: "${zeroBoundary}" | 5/3 boundary: "${improperBoundary}" | 4/2 boundary: "${improperBoundary2}"`
  );
} catch (err: unknown) {
  reportTest(19, 'test_direct_call_zero_numerator_and_improper_fractions_valid', false, String(err));
}

// =============================================================================
// TEST 20: validateFractionNumbers Bağımsız Doğrulama Fonksiyonu Kapsamı (Faz 3.1.3)
// =============================================================================
try {
  let validAccepted = false;
  let stringRejected = false;
  let booleanRejected = false;
  let nullRejected = false;

  try {
    validateFractionNumbers(3, 4);
    validAccepted = true;
  } catch {
    validAccepted = false;
  }

  try { validateFractionNumbers('3' as unknown as number, 4); } catch (e) { stringRejected = e instanceof TypeError; }
  try { validateFractionNumbers(3, true as unknown as number); } catch (e) { booleanRejected = e instanceof TypeError; }
  try { validateFractionNumbers(null as unknown as number, 4); } catch (e) { nullRejected = e instanceof TypeError; }

  const standaloneOk = validAccepted && stringRejected && booleanRejected && nullRejected;

  reportTest(
    20,
    'test_validate_fraction_numbers_standalone_coverage: validateFractionNumbers bağımsız olarak tüm tip sınırlarını kapsar',
    standaloneOk,
    `validAccepted: ${validAccepted}, stringRejected: ${stringRejected}, booleanRejected: ${booleanRejected}, nullRejected: ${nullRejected}`
  );
} catch (err: unknown) {
  reportTest(20, 'test_validate_fraction_numbers_standalone_coverage', false, String(err));
}

console.log('=== TEST ÖZETİ ===');
console.log(`Toplam Test: ${passCount + failCount}`);
console.log(`Başarılı: ${passCount}`);
console.log(`Başarısız: ${failCount}`);

if (failCount === 0) {
  console.log('\n>>> TÜM KESİR MOTORU KABUL TESTLERİ BAŞARIYLA GEÇTİ! <<<');
} else {
  console.error(`\n>>> ${failCount} TEST BAŞARISIZ OLDU! <<<`);
  throw new Error(`${failCount} adet test başarısız oldu!`);
}
