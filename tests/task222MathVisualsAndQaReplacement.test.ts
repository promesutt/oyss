import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { renderGeometryShape } from '../src/utils/svgGeometryEngine.js';
import { SAMPLE_EXAMS } from '../src/data/sampleExams.js';
import { ensureExamQuality, auditQuestionQuality } from '../src/utils/qualityAssurance/index.js';
import type { GeometryShapeVisual, ExamPaper, QuestionItem } from '../src/types/index.js';

describe('TASK222: Matematik Görsel Hataları ve Soru Kalite Güvencesi', () => {

  describe('1. Problem 1: Çokgen Tanımı Karşılaştırma Modeli (SVG Eğri Kenar)', () => {
    it('Şekil 3 için dışbükey yay (Q kontrol noktası) belirgin ve en az 35px dışa doğru olmalı', () => {
      const visualModel: GeometryShapeVisual = {
        type: 'geometry_shape',
        title: 'Çokgen ve Çokgen Olmayan Şekiller',
        caption: 'Şekil 1: Çokgen (Üçgen), Şekil 2: Açık Şekil, Şekil 3: Eğri Kenarlı Şekil',
        params: {
          subType: 'polygon_2d',
          viewBoxWidth: 380,
          viewBoxHeight: 180,
          polygons: [
            {
              id: 'poly-1',
              name: 'Şekil 1 (Çokgen)',
              vertices: [{ x: 30, y: 140 }, { x: 75, y: 50 }, { x: 120, y: 140 }],
              isClosed: true,
              color: '#16a34a',
              label: 'Şekil 1'
            },
            {
              id: 'poly-2',
              name: 'Şekil 2 (Açık Şekil)',
              vertices: [{ x: 150, y: 140 }, { x: 150, y: 70 }, { x: 230, y: 70 }, { x: 230, y: 140 }],
              isClosed: false,
              color: '#dc2626',
              label: 'Şekil 2'
            },
            {
              id: 'poly-3',
              name: 'Şekil 3 (Eğri Kenarlı)',
              vertices: [{ x: 270, y: 140 }, { x: 270, y: 70 }, { x: 350, y: 70 }],
              isClosed: true,
              hasCurveEdge: true,
              color: '#f59e0b',
              label: 'Şekil 3'
            }
          ]
        }
      };

      const renderResult = renderGeometryShape(visualModel);
      assert.strictEqual(renderResult.isValid, true, 'Geometri çizimi geçerli olmalı');
      const svgOutput = renderResult.svg;

      // SVG geçerli olmalı
      assert.ok(svgOutput.includes('<svg'), 'SVG kök etiketi bulunmalı');
      assert.ok(svgOutput.includes('viewBox="0 0 380 180"'), 'Doğru viewBox atanmalı');

      // Şekil 1: Kapalı üçgen
      assert.ok(svgOutput.includes('Şekil 1'), 'Şekil 1 etiketi bulunmalı');
      assert.ok(svgOutput.includes('#16a34a'), 'Şekil 1 yeşil rengi korunmalı');

      // Şekil 2: Açık şekil
      assert.ok(svgOutput.includes('Şekil 2'), 'Şekil 2 etiketi bulunmalı');
      assert.ok(svgOutput.includes('#dc2626'), 'Şekil 2 kırmızı rengi korunmalı');

      // Şekil 3: Eğri kenarlı şekil
      assert.ok(svgOutput.includes('Şekil 3'), 'Şekil 3 etiketi bulunmalı');
      assert.ok(svgOutput.includes('#f59e0b'), 'Şekil 3 sarı/amber rengi korunmalı');

      // Şekil 3 SVG path çıktısında Q (quadratic Bezier) eğrisi bulunmalı
      const qCurveMatch = svgOutput.match(/M\s+270\s+140\s+L\s+270\s+70\s+L\s+350\s+70\s+Q\s+(\d+)\s+(\d+)\s+270\s+140/);
      assert.ok(qCurveMatch, 'Şekil 3 yay çizen bir Q kontrol noktası içermeli');

      const ctrlX = parseInt(qCurveMatch[1], 10);
      const ctrlY = parseInt(qCurveMatch[2], 10);

      // Kiriş orta noktası: (350+270)/2 = 310, (70+140)/2 = 105
      // Kontrol noktası kirişten dışarıya doğru belirgin bir mesafe yapmalı (en az 35px)
      const chordMidX = (350 + 270) / 2;
      const chordMidY = (70 + 140) / 2;
      const distFromChordMid = Math.sqrt(Math.pow(ctrlX - chordMidX, 2) + Math.pow(ctrlY - chordMidY, 2));

      assert.ok(
        distFromChordMid >= 35,
        `Eğri kontrol noktasının kiriş orta noktasından uzaklığı en az 35px olmalı, bulunan: ${distFromChordMid.toFixed(1)}px`
      );
    });
  });

  describe('2. Problem 2: Noktanın Noktaya Göre Konumu (İpucu ve Cevap İfşalarının Temizlenmesi)', () => {
    it('Soru 7 (MAT.5.3.7) görselinde vektör okları, ipucu metinleri bulunmamalı, A ve B noktaları korunmalı', () => {
      const mathExam = SAMPLE_EXAMS.find(e => e.id === 'exam_5_matematik_1_1_senaryo_1');
      assert.ok(mathExam, 'exam_5_matematik_1_1_senaryo_1 bulunmalı');

      const q7 = mathExam.questions.find(q => q.outcomeCode === 'MAT.5.3.7' || q.questionNumber === 7);
      assert.ok(q7, '7. soru bulunmalı');

      // 1. Soru metni öğrenciye görevi bırakmalı
      assert.ok(
        q7.questionText.includes('B noktasının A noktasına göre konumunu'),
        'Soru kökü hedeflenen yönergeli olmalı'
      );

      // 2. Stimulus içerisinde cevap bulunmamalı
      assert.ok(
        !q7.stimulus?.includes('5 birim sağa'),
        'Stimulus "5 birim sağa" cevabını ifşa etmemeli'
      );
      assert.ok(
        !q7.stimulus?.includes('2 birim yukarı'),
        'Stimulus "2 birim yukarı" cevabını ifşa etmemeli'
      );

      // 3. Görselde vectors dizisi olmamalı veya boş olmalı
      const visual = q7.visual as any;
      assert.ok(visual, 'Görsel modeli bulunmalı');
      const vectors = visual.params?.vectors || visual.vectors;
      assert.ok(
        !vectors || vectors.length === 0,
        'Görselde vektör/yön okları olmamalı'
      );

      // 4. Görsel caption cevabı ifşa etmemeli
      assert.ok(
        !visual.caption?.includes('5 birim sağa') && !visual.caption?.includes('2 birim yukarı'),
        'Görsel başlığı/açıklaması cevabı ifşa etmemeli'
      );

      // 5. Grid noktaları (A ve B) yerinde olmalı
      const points = visual.params?.points || visual.points;
      assert.ok(points && points.length >= 2, 'A ve B noktaları bulunmalı');
      const pointA = points.find((p: any) => p.name === 'A (Okul)' || p.label === 'A (Okul)' || p.label === 'A');
      const pointB = points.find((p: any) => p.name === 'B (Kütüphane)' || p.label === 'B (Kütüphane)' || p.label === 'B');
      assert.ok(pointA, 'A noktası korunmalı');
      assert.ok(pointB, 'B noktası korunmalı');
      assert.strictEqual(pointA.col, 1, 'A noktası sütunu 1 olmalı');
      assert.strictEqual(pointA.row, 4, 'A noktası satırı 4 olmalı');
      assert.strictEqual(pointB.col, 6, 'B noktası sütunu 6 olmalı');
      assert.strictEqual(pointB.row, 2, 'B noktası satırı 2 olmalı');
    });
  });

  describe('3. Problem 3: Türkçe Sınavlarında Kalite Güvence ve Ortak Metin Doğrulaması', () => {
    it('5. sınıf Türkçe 1. dönem tüm senaryoları ensureExamQuality sonrasında %100 onaylı ve 100 puan olmalı', () => {
      const turkishExams = SAMPLE_EXAMS.filter(e => ((e as any).subjectId === 'turkce' || e.subject === 'turkce') && e.grade === 5);
      assert.ok(turkishExams.length >= 6, 'En az 6 adet 5. sınıf Türkçe senaryosu bulunmalı');

      for (const exam of turkishExams) {
        const qualityResult = ensureExamQuality(exam);

        assert.strictEqual(
          qualityResult.qualityAudit.certifiedForStudents,
          true,
          `${exam.id} (${exam.title}) sertifikalı olmalı`
        );
        assert.strictEqual(
          qualityResult.qualityAudit.summary.failedCount,
          0,
          `${exam.id} içerisinde elenen veya başarısız soru olmamalı`
        );

        // Toplam puan 100 olmalı
        const totalPoints = qualityResult.questions.reduce((sum: number, q: any) => sum + q.points, 0);
        assert.strictEqual(
          totalPoints,
          100,
          `${exam.id} sınavının toplam puanı tam 100 olmalı, hesaplanan: ${totalPoints}`
        );

        // Hiçbir sorunun _qaStatus değeri 'failed' olmamalı
        for (const q of qualityResult.questions) {
          assert.notStrictEqual(
            (q as any)._qaStatus,
            'failed',
            `${exam.id} Soru ${q.questionNumber} başarısız olmamalı`
          );
          assert.strictEqual(
            q.isCertified,
            true,
            `${exam.id} Soru ${q.questionNumber} sertifikalı olmalı`
          );
        }
      }
    });

    it('Kardeş soruda ortak okuma metni bulunduğunda bağımsız soru denetimi yanlış pozitif üretmemeli', () => {
      const siblingQuestions: QuestionItem[] = [
        {
          questionNumber: 1,
          outcomeCode: 'T.O.5.1',
          outcomeTitle: 'Okuduklarında geçen bilmediği kelimelerin anlamını tahmin eder.',
          difficulty: 'Kolay',
          points: 10,
          stimulus: 'Bal arıları doğanın en çalışkan mimarlarıdır. Kovandaki petekleri altıgen şeklinde örerler. Altıgen yapı, en az balmumu ile en fazla balın depolanmasını sağlar.',
          questionText: 'Metinde geçen "mimar" sözcüğü bal arıları için hangi anlamda kullanılmıştır?',
          modelAnswer: 'Yuva ve petekleri ören, inşa eden anlamında kullanılmıştır.',
          rubric: [{ criterion: 'Doğru anlam', points: 10 }]
        },
        {
          questionNumber: 2,
          outcomeCode: 'T.O.5.6',
          outcomeTitle: 'Okuduğu metnin ana fikrini belirler.',
          difficulty: 'Orta',
          points: 10,
          questionText: 'Yukarıdaki metnin ana fikrini yazınız.',
          modelAnswer: 'Arıların kovanlarındaki petek mimarisi doğadaki en verimli geometrik yapıdır.',
          rubric: [{ criterion: 'Ana fikir', points: 10 }]
        }
      ];

      // Soru 2 kardeşi olan Soru 1'in metnine dayanmaktadır
      const audit = auditQuestionQuality(siblingQuestions[1], {
        grade: 5,
        subject: 'turkce',
        totalQuestions: 2,
        siblingQuestions: siblingQuestions
      });

      // Kritik arıza (critical) vermemeli
      assert.strictEqual(
        audit.status !== 'failed',
        true,
        'Kardeş soruda metin varken bağımsız soru kritik hata almamalı'
      );
    });
  });

  describe('4. Sınavdan Soru Çıkarılmaması ve Otomatik Denk Soru İkamesi', () => {
    it('Kalite güvencesinden geçemeyen bir soru olduğunda otomatik olarak denk soruyla değiştirilmeli, puan ve soru numarası korunmalı', () => {
      // Kasıtlı olarak kusurlu (stimulusu olmayan, metin gerektiren) bir soru içeren sınav
      const mockExam: ExamPaper = {
        id: 'mock_exam_qa_test',
        title: '5. Sınıf Türkçe Deneme Sınavı',
        grade: 5,
        subject: 'turkce',
        term: '1. Dönem 1. Yazılı',
        scenarioNumber: 99,
        instructions: ['Tüm soruları cevaplayınız.'],
        questions: [
          {
            questionNumber: 1,
            outcomeCode: 'T.O.5.6',
            outcomeTitle: 'Okuduğu metnin ana fikrini/ana duygusunu belirler.',
            difficulty: 'Orta',
            points: 20,
            questionText: 'Metnin ana fikrini aşağıya yazınız.', // Kusurlu: Hiçbir metin veya stimulus yok
            modelAnswer: 'Ana fikir...',
            rubric: [{ criterion: 'Ana fikir tespiti', points: 20 }]
          },
          {
            questionNumber: 2,
            outcomeCode: 'T.O.5.15',
            outcomeTitle: 'Metindeki hikâye unsurlarını belirler.',
            difficulty: 'Orta',
            points: 80,
            stimulus: 'Ahmet sabah erkenden uyandı. Bahçedeki elma ağacının yaprakları sararmıştı. Sonbaharın geldiğini anladı.',
            questionText: 'Metindeki olay, kişi ve zaman unsurlarını yazınız.',
            modelAnswer: 'Olay: Uyanış, Kişi: Ahmet, Zaman: Sabah',
            rubric: [{ criterion: 'Unsurlar', points: 80 }]
          }
        ]
      };

      const result = ensureExamQuality(mockExam);

      // Sınav toplam puanı 100 olmalı
      const totalPoints = result.questions.reduce((sum: number, q: any) => sum + q.points, 0);
      assert.strictEqual(totalPoints, 100, 'Toplam puan 100 kalmalı');

      // Soru sayısı korunmalı (2 soru)
      assert.strictEqual(result.questions.length, 2, 'Soru sayısı korunmalı');

      // Soru numaraları ardışık olmalı (1 ve 2)
      assert.strictEqual(result.questions[0].questionNumber, 1, '1. soru numarası korunmalı');
      assert.strictEqual(result.questions[1].questionNumber, 2, '2. soru numarası korunmalı');

      // 1. soru otomatik olarak örnek havuzdaki denk soruyla ikame edilmiş olmalı
      const replacedQ1 = result.questions[0];
      assert.strictEqual(replacedQ1.outcomeCode, 'T.O.5.6', 'Kazanım kodu T.O.5.6 olarak eşleşmeli');
      assert.strictEqual(replacedQ1.points, 20, 'Puanı 20 olarak korunmalı');
      assert.ok(replacedQ1.stimulus && replacedQ1.stimulus.length > 30, 'İkame sorunun geçerli bir okuma metni olmalı');
    });
  });

  describe('5. A4 Baskı ve ExamPaperView Görünüm Bütünlüğü', () => {
    it('ExamPaperView.tsx dosyasında print:hidden ile soruların baskıdan gizlenmesi engellenmiş olmalı', () => {
      const examPaperViewPath = path.resolve(process.cwd(), 'src/components/ExamPaperView.tsx');
      const fileContent = fs.readFileSync(examPaperViewPath, 'utf8');

      // className içinde isBlockedByQA ? 'print:hidden' : '' OLMAMALI
      assert.ok(
        !fileContent.includes("isBlockedByQA ? 'print:hidden' : ''"),
        'ExamPaperView içinde soru kartını toptan baskıdan gizleyen print:hidden olmamalı'
      );

      // Teknik QA engelleme uyarısı soru metnini devre dışı bırakmamalı
      assert.ok(
        !fileContent.includes('Ölçme güvenirliği gereği soru metni, uyaran ve cevap alanı devre dışıdır.'),
        'Kullanıcıya gösterilen eski teknik engelleme kartı kaldırılmış olmalı'
      );
    });
  });

});
