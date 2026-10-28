export interface DifficultyDistribution {
  Kolay: number;
  Orta: number;
  Zor: number;
}

/**
 * MEB ÖDSGM Ölçme ve Değerlendirme Standartlarına Uygun Normal Dağılım (Çan Eğrisi)
 * Kolay: ~%20-%30, Orta (Omurga): ~%50-%60, Zor (Ayırt Edici Uç): ~%15-%25
 */
export function getTargetDifficultyDistribution(totalQuestions: number): DifficultyDistribution {
  if (totalQuestions <= 4) return { Kolay: 1, Orta: Math.max(1, totalQuestions - 2), Zor: 1 };
  if (totalQuestions === 5) return { Kolay: 1, Orta: 3, Zor: 1 };
  if (totalQuestions === 6) return { Kolay: 2, Orta: 3, Zor: 1 };
  if (totalQuestions === 7) return { Kolay: 2, Orta: 4, Zor: 1 };
  if (totalQuestions === 8) return { Kolay: 2, Orta: 4, Zor: 2 };
  if (totalQuestions === 9) return { Kolay: 2, Orta: 5, Zor: 2 };
  if (totalQuestions === 10) return { Kolay: 2, Orta: 6, Zor: 2 };
  if (totalQuestions === 11) return { Kolay: 3, Orta: 6, Zor: 2 };

  const zor = Math.max(1, Math.round(totalQuestions * 0.2));
  const kolay = Math.max(1, Math.round(totalQuestions * 0.25));
  const orta = totalQuestions - zor - kolay;
  return { Kolay: kolay, Orta: orta, Zor: zor };
}

export function formatDifficultyPlanText(totalQuestions: number): string {
  const d = getTargetDifficultyDistribution(totalQuestions);
  const kPct = Math.round((d.Kolay / totalQuestions) * 100);
  const oPct = Math.round((d.Orta / totalQuestions) * 100);
  const zPct = Math.round((d.Zor / totalQuestions) * 100);
  return `${d.Kolay} adet Kolay (%${kPct}), ${d.Orta} adet Orta (%${oPct}), ${d.Zor} adet Zor (%${zPct})`;
}

/**
 * Soruların Bilişsel Düzeylerine (Basit / Karmaşık) ve Sınavdaki Sırasına Göre
 * Zorluk Seviyelerini MEB Standardında Kalibre Eder.
 * - Zor sorular: Karmaşık Bilişsel Süreçler'e ve sınavın sonuna öncelik verilir.
 * - Kolay sorular: Basit Bilişsel Süreçler'e ve sınavın başlangıcına öncelik verilir.
 * - Orta sorular: Sınavın gövdesini oluşturur.
 */
export function calibrateQuestionDifficulties<T extends { difficulty?: 'Kolay' | 'Orta' | 'Zor'; cognitiveLevel?: string }>(
  questions: T[]
): T[] {
  const n = questions.length;
  if (n === 0) return questions;
  const target = getTargetDifficultyDistribution(n);

  const items = questions.map((q, idx) => ({
    original: q,
    idx,
    isSimple: q.cognitiveLevel === 'Basit Bilişsel Süreçler',
    assigned: null as ('Kolay' | 'Orta' | 'Zor' | null)
  }));

  // 1. Zor soruların atanması (Öncelik: Karmaşık Bilişsel & Sınavın sonu)
  let zorNeeded = target.Zor;
  const karmasikCandidates = items.filter(it => !it.isSimple).sort((a, b) => b.idx - a.idx);
  for (const c of karmasikCandidates) {
    if (zorNeeded > 0) {
      c.assigned = 'Zor';
      zorNeeded--;
    }
  }
  if (zorNeeded > 0) {
    const remaining = items.filter(it => it.assigned === null).sort((a, b) => b.idx - a.idx);
    for (const c of remaining) {
      if (zorNeeded > 0) {
        c.assigned = 'Zor';
        zorNeeded--;
      }
    }
  }

  // 2. Kolay soruların atanması (Öncelik: Basit Bilişsel & Sınavın başlangıcı)
  let kolayNeeded = target.Kolay;
  const basitCandidates = items.filter(it => it.isSimple && it.assigned === null).sort((a, b) => a.idx - b.idx);
  for (const c of basitCandidates) {
    if (kolayNeeded > 0) {
      c.assigned = 'Kolay';
      kolayNeeded--;
    }
  }
  if (kolayNeeded > 0) {
    const remaining = items.filter(it => it.assigned === null).sort((a, b) => a.idx - b.idx);
    for (const c of remaining) {
      if (kolayNeeded > 0) {
        c.assigned = 'Kolay';
        kolayNeeded--;
      }
    }
  }

  // 3. Orta soruların atanması (Kalan tüm sorular sınavın omurgasını oluşturur)
  for (const it of items) {
    if (!it.assigned) {
      it.assigned = 'Orta';
    }
  }

  return items.map(it => ({
    ...it.original,
    difficulty: it.assigned!
  }));
}
