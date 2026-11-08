import React from 'react';
import { renderToString } from 'react-dom/server';
import { QuestionVisualView } from '../src/components/QuestionVisualView';
import { ExamPaperView } from '../src/components/ExamPaperView';
import { InteractivePracticeView } from '../src/components/InteractivePracticeView';
import { QuestionVisual, ExamPaper, Question } from '../src/types';
import { getJsonOutputSchema } from '../src/generators/prompts/outputSchema';
import { buildLiveExamPrompt, AI_MATHEMATICS_VISUAL_DIRECTIVES } from '../src/generators/prompts';
import { validateAndSanitizeAiVisual } from '../src/utils/aiVisualValidator';

console.log('=== TASK 158: AI SORU ÜRETİMİNDE OTOMATİK GÖRSEL DESTEĞİ ENTEGRASYON TESTLERİ ===\n');

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
  // TEST 01: Çıktı Şemasında İsteğe Bağlı "visual" Alanı Varlığı
  // =========================================================================
  const schemaQuality = getJsonOutputSchema(true, true);
  const schemaLegacy = getJsonOutputSchema(true, false);

  const hasVisualInQuality = schemaQuality.includes('"visual"') &&
                             schemaQuality.includes('geometry_shape | number_line | fraction_model') &&
                             schemaQuality.includes('İSTEĞE BAĞLIDIR');
  const noVisualInLegacy = !schemaLegacy.includes('"visual"');

  assert(
    hasVisualInQuality && noVisualInLegacy,
    'AI Çıktı Şeması: Aktif kalite modunda opsiyonel visual alanı tanımlıdır; legacy parity korunur',
    `hasVisualInQuality: ${hasVisualInQuality}, noVisualInLegacy: ${noVisualInLegacy}`
  );

  // =========================================================================
  // TEST 02: Matematik Canlı Promptunda Görsel Direktifi ve Bütçe Kontrolü
  // =========================================================================
  const mathPrompt = buildLiveExamPrompt({
    grade: 5,
    subjectId: 'matematik',
    targetCount: 6,
    distributionsText: '[1. Soru] Kazanım: MAT.5.3.1 (Açılar ve çokgenler)',
    avoidDirectives: 'Tekrar yok.',
    difficultyPlanText: '2 Kolay, 3 Orta, 1 Zor',
    outcomeCodes: ['MAT.5.3.1']
  });

  const hasMathVisualDirectives = mathPrompt.includes('MATEMATİK GÖRSEL KURALLARI') &&
                                  mathPrompt.includes('ANTI-LEAK') &&
                                  mathPrompt.includes('polygon_2d, angle_model, line_system, grid_coordinate, area_perimeter');
  const isUnderBudget = mathPrompt.length <= 16500;

  assert(
    hasMathVisualDirectives && isUnderBudget,
    'Canlı Matematik Promptu: 5 geometri modeli + kesir + sayı doğrusu direktifleri bütçe tavanı içinde yer alır',
    `hasMathVisualDirectives: ${hasMathVisualDirectives}, promptLength: ${mathPrompt.length} (Bütçe: <=16500)`
  );

  // =========================================================================
  // TEST 03: validateAndSanitizeAiVisual - 5 Geometri Alt Modelinin Doğrulanması
  // =========================================================================
  const sampleGeoModels: QuestionVisual[] = [
    {
      type: 'geometry_shape',
      sourceOrigin: 'oyss_svg',
      caption: 'Doğru sistemi',
      params: {
        subType: 'line_system',
        lines: [{ kind: 'line', start: { x: 50, y: 50 }, end: { x: 250, y: 150 }, label: 'k' }]
      } as any
    },
    {
      type: 'geometry_shape',
      sourceOrigin: 'oyss_svg',
      caption: 'Saat modeli',
      params: {
        subType: 'angle_model',
        clocks: [{ hour: 3, minute: 0, angleLabel: '90°' }]
      } as any
    },
    {
      type: 'geometry_shape',
      sourceOrigin: 'oyss_svg',
      caption: 'Çokgen modeli',
      params: {
        subType: 'polygon_2d',
        polygons: [{ points: [{ x: 50, y: 100 }, { x: 100, y: 50 }, { x: 150, y: 100 }], closed: true }]
      } as any
    },
    {
      type: 'geometry_shape',
      sourceOrigin: 'oyss_svg',
      caption: 'Izgara modeli',
      params: {
        subType: 'grid_coordinate',
        grid: { cols: 8, rows: 6, cellSize: 30 },
        points: [{ col: 2, row: 3, label: 'A' }]
      } as any
    },
    {
      type: 'geometry_shape',
      sourceOrigin: 'oyss_svg',
      caption: 'Fayans modeli',
      params: {
        subType: 'area_perimeter',
        tessellation: { totalWidth: 180, totalHeight: 120, tileWidth: 60, tileHeight: 60, widthLabel: '180 cm', heightLabel: '120 cm' }
      } as any
    }
  ];

  const allGeoValid = sampleGeoModels.every(gm => validateAndSanitizeAiVisual(gm).isValid);

  assert(
    allGeoValid,
    'validateAndSanitizeAiVisual: 5 geometri modelinin (line, angle, poly, grid, area) tamamı başarıyla doğrulanır',
    `Doğrulanan model sayısı: ${sampleGeoModels.length}/5, allValid: ${allGeoValid}`
  );

  // =========================================================================
  // TEST 04: validateAndSanitizeAiVisual - Sayı Doğrusu ve Kesir Modeli
  // =========================================================================
  const numberLineVisual: QuestionVisual = {
    type: 'number_line',
    sourceOrigin: 'oyss_svg',
    params: { min: -2, max: 2, step: 1, points: [{ id: 'pt1', numerator: 1, denominator: 2, label: '1/2' }] }
  };
  const fractionVisual: QuestionVisual = {
    type: 'fraction_model',
    sourceOrigin: 'oyss_svg',
    params: { modelKind: 'fraction_bar', bars: [{ id: 'b1', fraction: { numerator: 3, denominator: 4 }, label: '3/4' }] }
  };

  const nlRes = validateAndSanitizeAiVisual(numberLineVisual);
  const fracRes = validateAndSanitizeAiVisual(fractionVisual);

  assert(
    nlRes.isValid && fracRes.isValid,
    'validateAndSanitizeAiVisual: number_line ve fraction_model türleri başarıyla doğrulanır',
    `numberLineValid: ${nlRes.isValid}, fractionValid: ${fracRes.isValid}`
  );

  // =========================================================================
  // TEST 05: Anti-Leak (Cevap Ele Vermeme) Koruma Filtresi
  // =========================================================================
  const leakVisual: QuestionVisual = {
    type: 'geometry_shape',
    sourceOrigin: 'oyss_svg',
    params: {
      subType: 'angle_model',
      angles: [
        {
          vertex: { x: 100, y: 100 },
          startAngleDeg: 0,
          endAngleDeg: 75,
          degreeLabel: '75°' // Cevapta "75°" geçiyor, doğrudan sızdırmış!
        }
      ]
    }
  };

  const antiLeakRes = validateAndSanitizeAiVisual(leakVisual, 'm(M) açısının ölçüsü 75° olarak bulunur.');
  const sanitizedAngle = (antiLeakRes.visual?.params as any)?.angles?.[0];
  const isNeutralized = sanitizedAngle?.degreeLabel === '?';

  assert(
    antiLeakRes.isValid && isNeutralized,
    'Anti-Leak Güvenlik Filtresi: Model cevaptaki sonucu taşıyan açı etiketi "75°" yerine "?" ile nötralize edilir',
    `isValid: ${antiLeakRes.isValid}, sanitizedLabel: "${sanitizedAngle?.degreeLabel}" (Beklenen: "?")`
  );

  // =========================================================================
  // TEST 06: Kusurlu / Bozuk Görsel Verisinde Güvenli Fallback (Soru Çökmez)
  // =========================================================================
  const corruptedVisuals = [
    { type: 'unknown_type', params: {} },
    { type: 'geometry_shape', params: { subType: 'polygon_2d', polygons: [{ vertices: [] }] } }, // Yetersiz köşe
    { type: 'number_line', params: { min: 5, max: 2 } }, // min > max
    { type: 'fraction_model', params: { modelKind: 'invalid_kind' } }
  ];

  const allCorruptedRejected = corruptedVisuals.every(cv => !validateAndSanitizeAiVisual(cv).isValid);

  assert(
    allCorruptedRejected,
    'Hata Toleransı: Geçersiz veya bozuk parametreler kontrollü biçimde reddedilir (isValid=false)',
    `allCorruptedRejected: ${allCorruptedRejected}`
  );

  // =========================================================================
  // TEST 07: Soru Üretiminde AI Görselinin Soru Nesnesine Bağlanması
  // =========================================================================
  const mockAiQuestionWithVisual = {
    number: 1,
    outcome: 'MAT.5.3.3',
    outcomeTitle: 'Açı çeşitleri',
    difficulty: 'Orta',
    level: 'Karmaşık Bilişsel Süreçler',
    templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
    points: 14,
    stimulus: 'Analog saat kadranında oluşan açı incelenmektedir.',
    question: 'Saat 03.00 olduğunda akrep ve yelkovan arasındaki açının çeşidini yazınız.',
    answer: 'Saat 03.00 iken açı 90° olup Dik Açıdır.',
    rubric: [{ item: 'Dik açı tespiti', pts: 14 }],
    visual: {
      type: 'geometry_shape',
      caption: 'Saat 03.00 açı modeli',
      params: {
        subType: 'angle_model',
        clocks: [{ hour: 3, minute: 0, angleLabel: '90°' }]
      }
    }
  };

  const validation = validateAndSanitizeAiVisual(mockAiQuestionWithVisual.visual, mockAiQuestionWithVisual.answer);
  const enrichedQuestion: Question = {
    questionNumber: mockAiQuestionWithVisual.number,
    outcomeCode: mockAiQuestionWithVisual.outcome,
    outcomeTitle: mockAiQuestionWithVisual.outcomeTitle,
    difficulty: mockAiQuestionWithVisual.difficulty as any,
    cognitiveLevel: mockAiQuestionWithVisual.level as any,
    archetype: mockAiQuestionWithVisual.templateType as any,
    points: mockAiQuestionWithVisual.points,
    contextText: '',
    stimulus: mockAiQuestionWithVisual.stimulus,
    questionText: mockAiQuestionWithVisual.question,
    solutionExplanation: mockAiQuestionWithVisual.answer,
    modelAnswer: mockAiQuestionWithVisual.answer,
    rubric: [{ criterion: 'Dik açı tespiti', points: 14 }],
    sourceOrigin: 'gemini_ai',
    visual: validation.isValid ? validation.visual : undefined
  };

  assert(
    Boolean(enrichedQuestion.visual) && enrichedQuestion.visual?.type === 'geometry_shape',
    'AI Soru Üretim Hattı: Doğrulanan AI görseli Question nesnesine visual olarak başarıyla iliştirilir',
    `hasVisual: ${Boolean(enrichedQuestion.visual)}, type: ${enrichedQuestion.visual?.type}`
  );

  // =========================================================================
  // TEST 08: Sınav Kâğıdı (ExamPaperView) Üzerinde Ortak Render Bütünlüğü
  // =========================================================================
  const mockExamPaper: ExamPaper = {
    id: 'ai_generated_math_exam_1',
    grade: 5,
    subjectId: 'matematik',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_1',
    title: '5. Sınıf Matematik AI Üretimli Ortak Yazılı Sınavı',
    durationMinutes: 40,
    totalPoints: 100,
    instructions: ['Sınav süresi 40 dakikadır.'],
    questions: [enrichedQuestion]
  };

  const examPaperHtml = renderToString(
    React.createElement(ExamPaperView, {
      examPaper: mockExamPaper,
      onOpenAIGenerator: () => {}
    })
  );

  const paperHasFigure = examPaperHtml.includes('question-visual-container');
  const paperHasClock = examPaperHtml.includes('Saat 03.00 açı modeli');
  const paperHasSvg = examPaperHtml.includes('<svg') && examPaperHtml.includes('viewBox="0 0 600 340"');

  assert(
    paperHasFigure && paperHasClock && paperHasSvg,
    'ExamPaperView Entegrasyonu: AI görseli sınav kâğıdında figure, figcaption ve SVG ile eksiksiz render edilir',
    `hasFigure: ${paperHasFigure}, hasCaption: ${paperHasClock}, hasSvg: ${paperHasSvg}`
  );

  // =========================================================================
  // TEST 09: İnteraktif Pratik Ekranı (InteractivePracticeView) Render Bütünlüğü
  // =========================================================================
  const interactiveHtml = renderToString(
    React.createElement(InteractivePracticeView, {
      examPaper: mockExamPaper,
      onBack: () => {},
      onComplete: () => {}
    })
  );

  const interactiveHasFigure = interactiveHtml.includes('question-visual-container');
  const interactiveHasClock = interactiveHtml.includes('Saat 03.00 açı modeli');
  const interactiveHasSvg = interactiveHtml.includes('<svg');

  assert(
    interactiveHasFigure && interactiveHasClock && interactiveHasSvg,
    'InteractivePracticeView Entegrasyonu: Aynı AI görsel verisi interaktif ekranda da birebir aynı formatta görüntülenir',
    `hasFigure: ${interactiveHasFigure}, hasCaption: ${interactiveHasClock}, hasSvg: ${interactiveHasSvg}`
  );

  // =========================================================================
  // TEST 10: Görseli Olmayan Sorunun Temiz Render Edilmesi (DOM Artığı Yok)
  // =========================================================================
  const textOnlyQuestion: Question = {
    questionNumber: 2,
    outcomeCode: 'MAT.5.1.1',
    outcomeTitle: 'Doğal sayılar',
    difficulty: 'Kolay',
    cognitiveLevel: 'Basit Bilişsel Süreçler',
    archetype: 'Kurgusal Senaryo & Vaka İncelemesi',
    points: 14,
    contextText: '',
    stimulus: 'Ali 45 sayısını çözümlemektedir.',
    questionText: '45 sayısının basamak değerlerini yazınız.',
    solutionExplanation: '4 onluk + 5 birlik',
    modelAnswer: '40 + 5',
    rubric: [{ criterion: 'Basamak analizi', points: 14 }],
    sourceOrigin: 'gemini_ai',
    visual: undefined
  };

  const textOnlyHtml = renderToString(
    React.createElement(QuestionVisualView, { visual: textOnlyQuestion.visual })
  );

  assert(
    textOnlyHtml === '',
    'Görselsiz Soru: visual: undefined durumunda hiçbir boş figure veya DOM artığı oluşmaz',
    `textOnlyHtml: "${textOnlyHtml}"`
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

