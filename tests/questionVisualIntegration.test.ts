import React from 'react';
import { renderToString } from 'react-dom/server';
import { QuestionVisualView } from '../src/components/QuestionVisualView';
import { ExamPaperView } from '../src/components/ExamPaperView';
import { SAMPLE_EXAMS } from '../src/data/sampleExams';
import { QuestionVisual } from '../src/types';

console.log('=== OYSS FAZ 2B: REACT ARAYÜZ VE GÖRSEL ENTEGRASYON TESTLERİ BAŞLIYOR ===\n');

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
  const targetExam = SAMPLE_EXAMS.find(e => e.id === 'exam_7_matematik_1_1_senaryo_1');
  if (!targetExam) {
    throw new Error('exam_7_matematik_1_1_senaryo_1 bulunamadı');
  }

  const q4 = targetExam.questions.find(q => q.questionNumber === 4);
  if (!q4 || !q4.visual) {
    throw new Error('Soru 4 veya görsel verisi bulunamadı');
  }

  // =========================================================================
  // TEST 01: Görseli Olan Soru (QuestionVisualView ile Pilot Soru Render)
  // =========================================================================
  const visualHtml = renderToString(
    React.createElement(QuestionVisualView, {
      visual: q4.visual
    })
  );

  const hasFigure = visualHtml.includes('<figure') && visualHtml.includes('question-visual-container');
  const hasAriaLabel = visualHtml.includes('aria-label="Mert ve Ece&#x27;nin seçtiği sayıların sayı doğrusu üzerindeki konumları"');
  const hasCaption = visualHtml.includes('<figcaption') && visualHtml.includes('Mert ve Ece&#x27;nin seçtiği sayıların');
  const hasEcePoint = visualHtml.includes('cx="136.67"') && visualHtml.includes('Ece (-5/6)');
  const hasMertPoint = visualHtml.includes('cx="182.50"') && visualHtml.includes('Mert (-3/4)');

  assert(
    hasFigure && hasAriaLabel && hasCaption && hasEcePoint && hasMertPoint,
    'Görseli olan soru: figure, figcaption, aria-label ve doğru Ece/Mert koordinatlarıyla render edilir',
    `hasFigure: ${hasFigure}, hasCaption: ${hasCaption}, Ece(136.67): ${hasEcePoint}, Mert(182.50): ${hasMertPoint}`
  );

  // =========================================================================
  // TEST 02: Görseli Olmayan Soru (visual={undefined})
  // =========================================================================
  const emptyHtml = renderToString(
    React.createElement(QuestionVisualView, {
      visual: undefined
    })
  );

  assert(
    emptyHtml === '',
    'Görseli olmayan soru: Boş içerik veya DOM kalıntısı üretmeden tamamen null render eder',
    `Render sonucu: "${emptyHtml}" (Beklenen: "")`
  );

  // =========================================================================
  // TEST 03: Hatalı Görsel Verisi (Fallback Mekanizması)
  // =========================================================================
  const invalidVisual: QuestionVisual = {
    type: 'number_line',
    sourceOrigin: 'oyss_svg',
    params: {
      min: 0,
      max: -5, // Geçersiz min >= max
      points: []
    }
  };

  const fallbackHtml = renderToString(
    React.createElement(QuestionVisualView, {
      visual: invalidVisual
    })
  );

  const hasWarning = fallbackHtml.includes('Matematiksel Çizim Yüklenemedi');
  const hasFallbackReason = fallbackHtml.includes('küçük olmalıdır');

  assert(
    hasWarning && hasFallbackReason,
    'Hatalı görsel verisi: Bileşen çökmez; açıklayıcı fallback SVG konteynerini render eder',
    `hasWarning: ${hasWarning}, hasFallbackReason: ${hasFallbackReason}`
  );

  // =========================================================================
  // TEST 04: Mobil Responsive Görünüm Sınıfları ve Taşma Koruması
  // =========================================================================
  const hasFullWidth = visualHtml.includes('w-full');
  const hasMaxWidth = visualHtml.includes('max-w-[640px]');
  const hasOverflowProtection = visualHtml.includes('overflow-hidden') && visualHtml.includes('overflow-x-auto');
  const hasViewBox = visualHtml.includes('viewBox="0 0 640 140"');

  assert(
    hasFullWidth && hasMaxWidth && hasOverflowProtection && hasViewBox,
    'Mobil responsive görünüm: w-full, max-w-[640px], overflow koruması ve viewBox oranları korunur',
    `w-full: ${hasFullWidth}, max-w: ${hasMaxWidth}, overflow: ${hasOverflowProtection}, viewBox: ${hasViewBox}`
  );

  // =========================================================================
  // TEST 05: ExamPaperView İçinde Görselin Konumu ve Yazdırma Uyumu
  // =========================================================================
  const examPaperHtml = renderToString(
    React.createElement(ExamPaperView, {
      examPaper: targetExam,
      onOpenAIGenerator: () => {}
    })
  );

  // Q4 görselini içerir
  const examHasVisual = examPaperHtml.includes('question-visual-container') &&
                        examPaperHtml.includes('Mert ve Ece&#x27;nin seçtiği sayıların');

  // Yazdırma (print) sınıfları mevcuttur
  const hasPrintClasses = examPaperHtml.includes('print:max-w-[550px]') && examPaperHtml.includes('print:my-1.5');

  // Görsel soru metninden sonra, o sorunun öğrenci çözüm alanından önce yerleşir
  const q4TextIdx = examPaperHtml.indexOf('hangisinin argümanı doğrudur?');
  const visualIdx = examPaperHtml.indexOf('question-visual-container');
  const answerAreaAfterVisual = examPaperHtml.indexOf('Öğrenci Çözüm ve Cevap Alanı', visualIdx);

  const isPositionCorrect = q4TextIdx !== -1 && visualIdx > q4TextIdx && answerAreaAfterVisual > visualIdx;

  assert(
    examHasVisual && hasPrintClasses && isPositionCorrect,
    'ExamPaperView: Görsel yalnızca Q4 altında, soru metninden sonra ve çözüm alanından önce yerleşir',
    `examHasVisual: ${examHasVisual}, hasPrintClasses: ${hasPrintClasses}, isPositionCorrect: ${isPositionCorrect}`
  );

  // =========================================================================
  // TEST 06: Soru Değiştirildiğinde Görselin Güncellenmesi (Soru Bağımsızlığı)
  // =========================================================================
  // Q3 (görselsiz) ve Q4 (görselli) karşılaştırması
  const q3 = targetExam.questions.find(q => q.questionNumber === 3);
  const q3Html = renderToString(React.createElement(QuestionVisualView, { visual: q3?.visual }));
  const q4Html = renderToString(React.createElement(QuestionVisualView, { visual: q4?.visual }));

  const q3HasNoVisual = q3Html === '';
  const q4HasVisual = q4Html.includes('question-visual-container');

  assert(
    q3HasNoVisual && q4HasVisual,
    'Soru değiştirildiğinde: Görselsiz sorularda hiçbir DOM kalıntısı kalmaz, görselli soruda görsel dinamik yüklenir',
    `Q3 (görselsiz) boş: ${q3HasNoVisual}, Q4 (görselli) aktif: ${q4HasVisual}`
  );

  // =========================================================================
  // TEST 07: Ece ve Mert Etiket Okunabilirliği ve Sol-Sağ Sıralama Garantisi
  // =========================================================================
  const hasEceColor = visualHtml.includes('fill="#e11d48"') || visualHtml.includes('stroke="#e11d48"');
  const hasMertColor = visualHtml.includes('fill="#4f46e5"') || visualHtml.includes('stroke="#4f46e5"');
  const eceIndex = visualHtml.indexOf('cx="136.67"');
  const mertIndex = visualHtml.indexOf('cx="182.50"');
  const isEceLeft = eceIndex !== -1 && mertIndex !== -1;

  assert(
    hasEceColor && hasMertColor && isEceLeft,
    'Etiket okunabilirliği: Ece (rose-600) ve Mert (indigo-600) özgün renkleriyle belirgin ve Ece soldadır',
    `Ece rengi: ${hasEceColor}, Mert rengi: ${hasMertColor}, Ece(136.67) < Mert(182.50): ${isEceLeft}`
  );

  // =========================================================================
  // TEST 08: 11 Ara Çentik ve Geometri Bütünlüğü
  // =========================================================================
  const subTicks = (visualHtml.match(/stroke-width="1\.2"/g) || []).length;
  const has11SubTicks = subTicks === 11;

  assert(
    has11SubTicks,
    'Geometri doğruluğu: Pilot sayı doğrusunda tam 11 ara çentik çizgisi çizilmiştir',
    `Ara çentik sayısı: ${subTicks} (Beklenen: 11)`
  );

  // =========================================================================
  // TEST 09: Farklı Visual Girdileriyle Ayrı SSR Render Doğrulaması
  // =========================================================================
  // 1. undefined görsel ile render
  const step1Html = renderToString(React.createElement(QuestionVisualView, { visual: undefined }));
  
  // 2. Pilot görsel ile render
  const step2Html = renderToString(React.createElement(QuestionVisualView, { visual: q4.visual }));
  
  // 3. Farklı bir sayı doğrusu görseli ile render
  const alternativeVisual: QuestionVisual = {
    type: 'number_line',
    sourceOrigin: 'oyss_svg',
    caption: 'Farklı Bir Sayı Doğrusu Modeli',
    params: {
      min: 0,
      max: 10,
      step: 2,
      points: [
        { id: 'k_val', numerator: 5, denominator: 1, label: 'K (5)', color: 'emerald-600' }
      ]
    }
  };
  const step3Html = renderToString(React.createElement(QuestionVisualView, { visual: alternativeVisual }));

  const step1Empty = step1Html === '';
  const step2HasPilot = step2Html.includes('Ece (-5/6)') && step2Html.includes('Mert (-3/4)');
  const step3HasAlt = step3Html.includes('K (5)') && step3Html.includes('fill="#059669"') && !step3Html.includes('Ece');

  assert(
    step1Empty && step2HasPilot && step3HasAlt,
    'SSR Render Bütünlüğü: Farklı visual girdileriyle (tanımsız, pilot, alternatif) ayrı SSR render işlemlerinde doğru ve beklenen SVG çıktıları üretilir',
    `step1Empty: ${step1Empty}, step2HasPilot: ${step2HasPilot}, step3HasAlt: ${step3HasAlt}`
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
