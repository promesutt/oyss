import { ExamPaper, QuestionRubricItem } from '../types';

/**
 * MEB Ortak Yazılı Sınav Puanı Dağıtıcısı:
 * Toplam 100 puanı hedef soru sayısına deterministik olarak böler.
 * Kalan artık puanlar ilk sorulara 1'er puan olarak dağıtılır.
 * Toplam her zaman tam olarak 100'dür.
 */
export function distributeExamPoints(count: number): number[] {
  if (count <= 0) return [];
  const base = Math.floor(100 / count);
  const remainder = 100 % count;
  return Array.from({ length: count }, (_, i) => base + (i < remainder ? 1 : 0));
}

/**
 * Rubrik Ölçüt Puanlarını Soru Puanına Tam Eşitleyen (Reconcile) Deterministik Fonksiyon:
 * 
 * Zorunlu Koşul: sum(rubrik.points) === questionPoints
 * 
 * - Bağımsız yuvarlama kaynaklı (+1 veya -1 puanlık) sapmaları artık paylaştırma ile çözer.
 * - Hiçbir ölçüte negatif puan vermez (min: 0 veya targetPoints >= length ise min: 1).
 * - Rubrik boşsa veya ölçüt puanları geçersizse kontrollü ve pedagojik 2 basamaklı varsayılan rubrik üretir.
 * - Kriter metinlerini ve sıralamasını korur.
 */
export function reconcileRubricPoints(
  rubric: { criterion: string; points?: number; pts?: number }[] | undefined | null,
  questionPoints: number
): QuestionRubricItem[] {
  const safeTargetPoints = Math.max(1, Math.round(questionPoints || 10));

  // 1. Boş, tanımsız veya geçersiz rubrik durumu
  if (!rubric || !Array.isArray(rubric) || rubric.length === 0) {
    const firstPart = Math.ceil(safeTargetPoints / 2);
    const secondPart = safeTargetPoints - firstPart;
    return [
      {
        criterion: 'Kavramsal teşhis ve bilimsel/bağlamsal tespit',
        points: firstPart
      },
      {
        criterion: 'Analitik gerekçelendirme ve çözüm adımları',
        points: secondPart
      }
    ];
  }

  // 2. Tek ölçütlü rubrik durumu
  if (rubric.length === 1) {
    return [
      {
        criterion: rubric[0].criterion || 'Soru gereğinin eksiksiz karşılanması',
        points: safeTargetPoints
      }
    ];
  }

  // 3. Çok ölçütlü rubrik durumu (Ağırlıklı orantılama ve artık dengeleme)
  const n = rubric.length;
  const rawPoints = rubric.map(r => {
    const val = r.points ?? r.pts ?? 0;
    return typeof val === 'number' && !isNaN(val) && val > 0 ? val : 0;
  });

  const rawSum = rawPoints.reduce((acc, p) => acc + p, 0);

  // Ham puanların tümü 0 veya geçersizse eşit paylaştır
  const weights = rawSum > 0 
    ? rawPoints.map(p => p / rawSum) 
    : Array.from({ length: n }, () => 1 / n);

  // Taban puanları hesapla (Math.floor ile)
  const basePoints = weights.map(w => Math.floor(w * safeTargetPoints));
  let allocated = basePoints.reduce((acc, p) => acc + p, 0);
  let remainder = safeTargetPoints - allocated;

  // Kesirli kısımlara göre kalan artık puanları büyükten küçüğe 1'er puan dağıt
  const fractionalRemainders = weights.map((w, idx) => ({
    idx,
    fraction: (w * safeTargetPoints) - basePoints[idx]
  })).sort((a, b) => b.fraction - a.fraction);

  const finalPoints = [...basePoints];
  for (let i = 0; i < remainder; i++) {
    const targetIdx = fractionalRemainders[i % n].idx;
    finalPoints[targetIdx] += 1;
  }

  // Eğer hedef puan ölçüt sayısından büyük veya eşitse ve herhangi bir ölçüt 0 puanda kalmışsa,
  // en yüksek puana sahip ölçütten 1 puan alıp 0 olan ölçüte vererek her ölçütün en az 1 puan almasını sağla
  if (safeTargetPoints >= n) {
    for (let i = 0; i < n; i++) {
      if (finalPoints[i] <= 0) {
        // En yüksek puana sahip ölçütü bul (kendisi hariç)
        let maxIdx = -1;
        let maxVal = 1;
        for (let j = 0; j < n; j++) {
          if (j !== i && finalPoints[j] > maxVal) {
            maxVal = finalPoints[j];
            maxIdx = j;
          }
        }
        if (maxIdx !== -1) {
          finalPoints[maxIdx] -= 1;
          finalPoints[i] += 1;
        }
      }
    }
  }

  return rubric.map((r, i) => ({
    criterion: r.criterion?.trim() || `Değerlendirme Ölçütü ${i + 1}`,
    points: finalPoints[i]
  }));
}

/**
 * Bir Sınav Kâğıdının Puan ve Rubrik Bütünlüğünü Doğrular.
 */
export interface ExamPointValidationResult {
  isValid: boolean;
  totalPoints: number;
  questionCount: number;
  errors: string[];
}

export function validateExamPoints(exam: ExamPaper): ExamPointValidationResult {
  const errors: string[] = [];
  const questions = exam.questions || [];
  let examTotal = 0;

  questions.forEach((q, qIdx) => {
    const qNum = q.questionNumber || (qIdx + 1);
    examTotal += q.points;

    if (q.points <= 0) {
      errors.push(`Soru ${qNum}: Soru puanı 0 veya negatif olamaz (${q.points} p).`);
    }

    const rubric = q.rubric || [];
    if (rubric.length === 0) {
      errors.push(`Soru ${qNum}: Rubrik ölçütleri boş.`);
    } else {
      let rubricSum = 0;
      rubric.forEach((r, rIdx) => {
        if (r.points < 0) {
          errors.push(`Soru ${qNum}, Ölçüt ${rIdx + 1}: Kriter puanı negatif olamaz (${r.points} p).`);
        }
        rubricSum += r.points;
      });

      if (rubricSum !== q.points) {
        errors.push(`Soru ${qNum}: Rubrik ölçütleri toplamı (${rubricSum} p) soru puanına (${q.points} p) eşit değil.`);
      }
    }
  });

  if (examTotal !== 100) {
    errors.push(`Sınav genel puanı 100 olmalıdır, mevcut toplam: ${examTotal} p.`);
  }

  return {
    isValid: errors.length === 0,
    totalPoints: examTotal,
    questionCount: questions.length,
    errors
  };
}
