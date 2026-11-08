import React from 'react';
import { renderToString } from 'react-dom/server';
import { QuestionVisualView } from '../src/components/QuestionVisualView';
import { ExamPaperView } from '../src/components/ExamPaperView';
import { SAMPLE_EXAMS } from '../src/data/sampleExams';
import { QuestionVisual, GeometryShapeVisual } from '../src/types';
import { renderQuestionVisual } from '../src/utils/svgMathEngine';
import { validateGeometryParams, generateGeometrySvg, renderGeometryShape } from '../src/utils/svgGeometryEngine';

console.log('=== TASK 157: GEOMETRİ GÖRSEL MODELİ ENTEGRASYON VE DOĞRULAMA TESTLERİ ===\n');

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string, detail: string) {
  if (condition) {
    console.log(`[TEST ${String(passCount + failCount + 1).padStart(2, '0')}] ✓ BAŞARILI - ${testName}`);
    console.log(`         Ayrıntı: ${detail}\n`);
    passCount++;
  } else {
    console.error(`[TEST ${String(passCount + failCount + 1).padStart(2, '0')}] ✗ BAŞARISIZ - ${testName}`);
    console.error(`         Ayrıntı: ${detail}\n`);
    failCount++;
  }
}

async function runTests() {
  // =========================================================================
  // TEST 01: Sub-Model 1 - line_system (Kesişen Doğrular ve Işın/Doğru Parçası)
  // =========================================================================
  const lineVisual: QuestionVisual = {
    type: 'geometry_shape',
    sourceOrigin: 'oyss_svg',
    caption: 'Düzlemde tek bir noktada kesişen iki doğru modeli',
    params: {
      subType: 'line_system',
      title: 'Kesişen Doğrular',
      lines: [
        { kind: 'line', start: { x: 40, y: 50 }, end: { x: 360, y: 150 }, label: 'd1', labelPos: { x: 370, y: 155 } },
        { kind: 'line', start: { x: 80, y: 180 }, end: { x: 320, y: 30 }, label: 'd2', labelPos: { x: 330, y: 25 } }
      ],
      points: [
        { x: 200, y: 105, label: 'K', color: '#dc2626' }
      ]
    }
  };

  const lineRes = renderQuestionVisual(lineVisual);
  const lineSvg = lineRes.svg;
  const lineHasMarkers = lineSvg.includes('id="arrow-') && lineSvg.includes('marker-end="url(#arrow-');
  const lineHasLabels = lineSvg.includes('d1') && lineSvg.includes('d2') && lineSvg.includes('K');
  const lineHasPoints = lineSvg.includes('cx="200"') && lineSvg.includes('cy="105"');

  assert(
    lineRes.isValid && lineHasMarkers && lineHasLabels && lineHasPoints,
    'Sub-Model line_system: Ok uçları, doğru etiketleri ve kesişim noktaları eksiksiz çizilir',
    `isValid: ${lineRes.isValid}, hasMarkers: ${lineHasMarkers}, hasLabels: ${lineHasLabels}, hasPoints: ${lineHasPoints}`
  );

  // =========================================================================
  // TEST 02: Sub-Model 2 - angle_model (Açılar ve Analog Saat Kadranı)
  // =========================================================================
  const clockVisual: QuestionVisual = {
    type: 'geometry_shape',
    sourceOrigin: 'oyss_svg',
    caption: '03.00 ve 04.00 saatlerinde akrep-yelkovan açıları',
    params: {
      subType: 'angle_model',
      title: 'Saat Kadranında Dik ve Geniş Açı',
      clocks: [
        { hour: 3, minute: 0, angleLabel: '90° (Dik Açı)' },
        { hour: 4, minute: 0, angleLabel: '120° (Geniş Açı)' }
      ]
    }
  };

  const clockRes = renderQuestionVisual(clockVisual);
  const clockSvg = clockRes.svg;
  const clockHasHour12 = clockSvg.includes('12') && clockSvg.includes('3') && clockSvg.includes('6') && clockSvg.includes('9');
  const clockHasLabels = clockSvg.includes('90° (Dik Açı)') && clockSvg.includes('120° (Geniş Açı)');
  const clockHasHands = clockSvg.includes('stroke-linecap="round"') && (clockSvg.match(/<line/g) || []).length >= 4;

  assert(
    clockRes.isValid && clockHasHour12 && clockHasLabels && clockHasHands,
    'Sub-Model angle_model (Saat Modu): 12-3-6-9 kadran numaraları, akrep/yelkovan kolları ve açı etiketleri çizilir',
    `isValid: ${clockRes.isValid}, hasHour12: ${clockHasHour12}, hasLabels: ${clockHasLabels}, hasHands: ${clockHasHands}`
  );

  // Açı yayları ve dik açı kutusu testi
  const directAngleVisual: QuestionVisual = {
    type: 'geometry_shape',
    sourceOrigin: 'oyss_svg',
    params: {
      subType: 'angle_model',
      title: 'Açı Çeşitleri',
      angles: [
        {
          vertex: { x: 100, y: 120 },
          arm1: { x: 180, y: 120 },
          arm2: { x: 100, y: 40 },
          isRightAngle: true,
          label: '90°'
        },
        {
          vertex: { x: 260, y: 120 },
          arm1: { x: 340, y: 120 },
          arm2: { x: 300, y: 50 },
          degrees: 60,
          label: '?'
        }
      ]
    }
  };
  const directAngleRes = renderQuestionVisual(directAngleVisual);
  const directAngleSvg = directAngleRes.svg;
  const hasRightAngleMarker = directAngleSvg.includes('fill="#dc2626"') || directAngleSvg.includes('path d="M');
  const hasUnknownAngleLabel = directAngleSvg.includes('?');

  assert(
    directAngleRes.isValid && hasRightAngleMarker && hasUnknownAngleLabel,
    'Sub-Model angle_model (Yay ve Dik Açı): Dik açı kutucuğu ve bilinmeyen açı (?) etiketi çizilir',
    `isValid: ${directAngleRes.isValid}, hasRightAngleMarker: ${hasRightAngleMarker}, hasUnknownAngleLabel: ${hasUnknownAngleLabel}`
  );

  // =========================================================================
  // TEST 03: Sub-Model 3 - polygon_2d (Çokgen, Açık Şekil ve Eğri Kenar Testi)
  // =========================================================================
  const polyVisual: QuestionVisual = {
    type: 'geometry_shape',
    sourceOrigin: 'oyss_svg',
    caption: 'Çokgen tanımı karşılaştırması',
    params: {
      subType: 'polygon_2d',
      title: 'Çokgen Karşılaştırma Modeli',
      polygons: [
        {
          points: [{ x: 40, y: 140 }, { x: 90, y: 60 }, { x: 140, y: 140 }],
          closed: true,
          label: 'Kapalı Üçgen'
        },
        {
          points: [{ x: 170, y: 140 }, { x: 170, y: 70 }, { x: 240, y: 70 }, { x: 240, y: 115 }],
          closed: false,
          label: 'Ucu Açık'
        },
        {
          points: [{ x: 270, y: 140 }, { x: 270, y: 70 }, { x: 350, y: 70 }],
          closed: true,
          hasCurve: true,
          label: 'Eğri Kenarlı'
        }
      ]
    }
  };

  const polyRes = renderQuestionVisual(polyVisual);
  const polySvg = polyRes.svg;
  const polyHasPolygon = polySvg.includes('<polygon');
  const polyHasPolyline = polySvg.includes('<polyline');
  const polyHasCurvePath = polySvg.includes('<path') && polySvg.includes(' Q ');
  const polyHasLabels = polySvg.includes('Kapalı Üçgen') && polySvg.includes('Ucu Açık') && polySvg.includes('Eğri Kenarlı');

  assert(
    polyRes.isValid && polyHasPolygon && polyHasPolyline && polyHasCurvePath && polyHasLabels,
    'Sub-Model polygon_2d: Kapalı çokgen (polygon), açık çoklu doğru (polyline) ve eğri kenarlı şekil (path Q) doğru ayrıştırılır',
    `isValid: ${polyRes.isValid}, hasPolygon: ${polyHasPolygon}, hasPolyline: ${polyHasPolyline}, hasCurvePath: ${polyHasCurvePath}, hasLabels: ${polyHasLabels}`
  );

  // =========================================================================
  // TEST 04: Sub-Model 4 - grid_coordinate (Kareli Zemin ve Bağıl Konum Vektörleri)
  // =========================================================================
  const gridVisual: QuestionVisual = {
    type: 'geometry_shape',
    sourceOrigin: 'oyss_svg',
    caption: 'Kareli zeminde A ve B konumları',
    params: {
      subType: 'grid_coordinate',
      title: 'Noktanın Konumu',
      grid: { cols: 8, rows: 6, cellSize: 30 },
      points: [
        { col: 1, row: 4, label: 'A', color: '#2563eb' },
        { col: 6, row: 2, label: 'B', color: '#dc2626' }
      ],
      vectors: [
        { fromCol: 1, fromRow: 4, toCol: 6, toRow: 4, label: '5 birim sağa', dashed: true },
        { fromCol: 6, fromRow: 4, toCol: 6, toRow: 2, label: '2 birim yukarı', dashed: true }
      ]
    }
  };

  const gridRes = renderQuestionVisual(gridVisual);
  const gridSvg = gridRes.svg;
  const gridHasGridLines = (gridSvg.match(/stroke="#e2e8f0"/g) || []).length >= 10;
  const gridHasVectors = gridSvg.includes('5 birim sağa') && gridSvg.includes('2 birim yukarı');
  const gridHasPoints = gridSvg.includes('A') && gridSvg.includes('B');

  assert(
    gridRes.isValid && gridHasGridLines && gridHasVectors && gridHasPoints,
    'Sub-Model grid_coordinate: Kareli zemin ızgarası, konum noktaları ve kesikli yön vektörleri çizilir',
    `isValid: ${gridRes.isValid}, hasGridLines: ${gridHasGridLines}, hasVectors: ${gridHasVectors}, hasPoints: ${gridHasPoints}`
  );

  // =========================================================================
  // TEST 05: Sub-Model 5 - area_perimeter (Tessellation ve Alan-Çevre Modeli)
  // =========================================================================
  const areaVisual: QuestionVisual = {
    type: 'geometry_shape',
    sourceOrigin: 'oyss_svg',
    caption: '120x180 zemin fayans kaplama',
    params: {
      subType: 'area_perimeter',
      title: 'EBOB Zemin Kaplama Modeli',
      tessellation: {
        totalWidth: 180,
        totalHeight: 120,
        tileWidth: 60,
        tileHeight: 60,
        widthLabel: '180 cm',
        heightLabel: '120 cm',
        tileLabel: '60x60 cm'
      }
    }
  };

  const areaRes = renderQuestionVisual(areaVisual);
  const areaSvg = areaRes.svg;
  const areaHasTiles = (areaSvg.match(/<rect/g) || []).length >= 6; // 3 x 2 = 6 tiles + background
  const areaHasDimensionLabels = areaSvg.includes('180 cm') && areaSvg.includes('120 cm');
  const areaHasTileLabels = areaSvg.includes('60x60 cm');

  assert(
    areaRes.isValid && areaHasTiles && areaHasDimensionLabels && areaHasTileLabels,
    'Sub-Model area_perimeter (Tessellation): 6 adet döşeme karosu, boyut okları ve karo ölçü etiketleri çizilir',
    `isValid: ${areaRes.isValid}, hasTiles: ${areaHasTiles}, hasDimensionLabels: ${areaHasDimensionLabels}, hasTileLabels: ${areaHasTileLabels}`
  );

  // =========================================================================
  // TEST 06: React QuestionVisualView SSR Render Doğrulaması
  // =========================================================================
  const reactHtml = renderToString(
    React.createElement(QuestionVisualView, { visual: areaVisual })
  );
  const hasFigure = reactHtml.includes('<figure') && reactHtml.includes('question-visual-container');
  const hasAria = reactHtml.includes('aria-label="120x180 zemin fayans kaplama"');
  const hasCaption = reactHtml.includes('<figcaption') && reactHtml.includes('120x180 zemin fayans kaplama');

  assert(
    hasFigure && hasAria && hasCaption,
    'QuestionVisualView SSR: geometry_shape görseli figure, figcaption ve aria-label ile hatasız render edilir',
    `hasFigure: ${hasFigure}, hasAria: ${hasAria}, hasCaption: ${hasCaption}`
  );

  // =========================================================================
  // TEST 07: Gerçek Örnek Sınavlardaki Geometri Görsellerinin Varlığı
  // =========================================================================
  const exam5s1 = SAMPLE_EXAMS.find(e => e.id === 'exam_5_matematik_1_1_senaryo_1');
  const exam5s2 = SAMPLE_EXAMS.find(e => e.id === 'exam_5_matematik_1_1_senaryo_2');
  const exam8s5 = SAMPLE_EXAMS.find(e => e.id === 'exam_8_matematik_1_1_senaryo_5');

  const q5_5s1 = exam5s1?.questions.find(q => q.questionNumber === 5);
  const q7_5s1 = exam5s1?.questions.find(q => q.questionNumber === 7);
  const q3_5s2 = exam5s2?.questions.find(q => q.questionNumber === 3);
  const q4_5s2 = exam5s2?.questions.find(q => q.questionNumber === 4);
  const q2_8s5 = exam8s5?.questions.find(q => q.questionNumber === 2);

  const sampleVisualsOk = 
    q5_5s1?.visual?.type === 'geometry_shape' &&
    q7_5s1?.visual?.type === 'geometry_shape' &&
    q3_5s2?.visual?.type === 'geometry_shape' &&
    q4_5s2?.visual?.type === 'geometry_shape' &&
    q2_8s5?.visual?.type === 'geometry_shape';

  assert(
    Boolean(sampleVisualsOk),
    'Sample Exams Geometri Bağlantıları: 5. ve 8. sınıf senaryolarındaki 5 adet hedef soruya geometri görselleri bağlanmıştır',
    `5.1.1 Q5: ${q5_5s1?.visual?.type}, 5.1.1 Q7: ${q7_5s1?.visual?.type}, 5.1.2 Q3: ${q3_5s2?.visual?.type}, 5.1.2 Q4: ${q4_5s2?.visual?.type}, 8.1.5 Q2: ${q2_8s5?.visual?.type}`
  );

  // =========================================================================
  // TEST 08: ExamPaperView İçinde Görselin Yerleşimi ve Görsel Bütünlük
  // =========================================================================
  if (!exam5s2) throw new Error('exam_5_matematik_1_1_senaryo_2 bulunamadı');
  const paperHtml = renderToString(
    React.createElement(ExamPaperView, {
      examPaper: exam5s2,
      onOpenAIGenerator: () => {}
    })
  );

  const paperHasClockVisual = paperHtml.includes('Saat 03.00 ve 04.00 akrep ile yelkovan');
  const paperHasLineVisual = paperHtml.includes('Tek bir P noktasında kesişen m ve n doğruları');

  assert(
    paperHasClockVisual && paperHasLineVisual,
    'ExamPaperView: Birden fazla geometri görseli sınav kâğıdı içinde kendi soruları altında yer alır',
    `hasClockVisual: ${paperHasClockVisual}, hasLineVisual: ${paperHasLineVisual}`
  );

  // =========================================================================
  // TEST 10: Hata ve Fallback Dayanıklılığı (Geçersiz Parametreler Çökertmez)
  // =========================================================================
  const invalidGeo: GeometryShapeVisual = {
    type: 'geometry_shape',
    sourceOrigin: 'oyss_svg',
    params: {
      subType: 'unknown_type' as any
    }
  };

  const validation = validateGeometryParams(invalidGeo.params);
  const fallbackRes = renderGeometryShape(invalidGeo);
  const fallbackSvg = fallbackRes.svg;

  const fallbackHasWarning = fallbackSvg.includes('Matematiksel Çizim Yüklenemedi');
  const fallbackHasReason = fallbackSvg.includes('Geçersiz geometri alt türü');

  assert(
    !validation.isValid && fallbackHasWarning && fallbackHasReason,
    'Hata/Fallback Dayanıklılığı: Geçersiz alt tipte sistem çökmez, açıklayıcı fallback SVG üretir',
    `isValid: ${validation.isValid}, hasWarning: ${fallbackHasWarning}, hasReason: ${fallbackHasReason}`
  );

  // =========================================================================
  // TEST 11: Sayı Doğrusu ve Kesir Modeli Regresyon Olmaması
  // =========================================================================
  const numberLineVisual: QuestionVisual = {
    type: 'number_line',
    sourceOrigin: 'oyss_svg',
    params: { min: -2, max: 2, points: [{ id: 'p1', numerator: 1, denominator: 2, label: 'A(1/2)' }] }
  };
  const fractionVisual: QuestionVisual = {
    type: 'fraction_model',
    sourceOrigin: 'oyss_svg',
    params: {
      modelKind: 'fraction_bar',
      bars: [
        {
          id: 'bar1',
          fraction: { numerator: 3, denominator: 4 },
          label: '3/4',
          color: 'indigo-600'
        }
      ]
    }
  };

  const numberLineRes = renderQuestionVisual(numberLineVisual);
  const fractionRes = renderQuestionVisual(fractionVisual, { instanceId: 'test-frac' });

  const nlOk = numberLineRes.isValid && numberLineRes.svg.includes('A(1/2)') && numberLineRes.svg.includes('viewBox="0 0 640 140"');
  const fracOk = fractionRes.isValid && fractionRes.svg.includes('3/4') && fractionRes.svg.includes('viewBox="0 0 640');

  assert(
    nlOk && fracOk,
    'Regresyon Testi: Mevcut number_line ve fraction_model motorları bozulmadan çalışmaya devam eder',
    `numberLineOk: ${nlOk}, fractionOk: ${fracOk}`
  );

  console.log('=== TEST ÖZETİ ===');
  console.log(`Toplam Test: ${passCount + failCount}`);
  console.log(`Başarılı: ${passCount}`);
  console.log(`Başarısız: ${failCount}`);

  if (failCount > 0) {
    throw new Error(`${failCount} adet test başarısız oldu!`);
  }
}

runTests().catch(err => {
  console.error('Test hatası:', err);
  process.exit(1);
});
