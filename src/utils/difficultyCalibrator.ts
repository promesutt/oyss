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
 * Soruların Sınavdaki Sırasına ve Pedagojik Konumuna Göre
 * Zorluk Seviyelerini MEB Çan Eğrisi Standardında Kalibre Eder.
 * - Kolay sorular: Sınavın başlangıcına öncelik verilir (öğrenciyi cesaretlendirme).
 * - Zor sorular: Sınavın sonuna öncelik verilir (ayırt edici aşama).
 * - Orta sorular: Sınavın omurgasını oluşturur (%50-60 ağırlık).
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
    assigned: null as ('Kolay' | 'Orta' | 'Zor' | null)
  }));

  const isPunctuationRule = (it: (typeof items)[0]) => {
    const orig = it.original as any;
    const oc = (orig.outcomeCode || orig.outcome || '');
    const ot = (orig.outcomeTitle || '').toLowerCase();
    return oc.includes('16') || ot.includes('yazım') || ot.includes('noktalama');
  };

  // 1. Zor soruların atanması (Öncelik: Sınavın sonu & doğrudan kural uygulamalarını geriye alma)
  let zorNeeded = target.Zor;
  const zorCandidates = items.slice().sort((a, b) => {
    const aIsRule = isPunctuationRule(a);
    const bIsRule = isPunctuationRule(b);
    if (aIsRule !== bIsRule) {
      return aIsRule ? 1 : -1; // Doğrudan kural uygulamalarını "Zor" sıralamasında geriye al
    }
    // Önceden "Zor" olarak belirlenmiş sorular varsa önceliklendir
    const aIsZor = a.original.difficulty === 'Zor';
    const bIsZor = b.original.difficulty === 'Zor';
    if (aIsZor !== bIsZor) {
      return bIsZor ? 1 : -1;
    }
    // Sınavın sonundaki sorulara öncelik
    return b.idx - a.idx;
  });

  for (const c of zorCandidates) {
    if (zorNeeded > 0 && c.assigned === null) {
      c.assigned = 'Zor';
      zorNeeded--;
    }
  }

  // 2. Kolay soruların atanması (Öncelik: Sınavın başlangıcı)
  let kolayNeeded = target.Kolay;
  const kolayCandidates = items.filter(it => it.assigned === null).sort((a, b) => {
    const aIsKolay = a.original.difficulty === 'Kolay';
    const bIsKolay = b.original.difficulty === 'Kolay';
    if (aIsKolay !== bIsKolay) {
      return bIsKolay ? 1 : -1;
    }
    // Sınavın başındaki sorulara öncelik
    return a.idx - b.idx;
  });

  for (const c of kolayCandidates) {
    if (kolayNeeded > 0 && c.assigned === null) {
      c.assigned = 'Kolay';
      kolayNeeded--;
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
