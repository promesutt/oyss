import { QuestionQualityResult } from './types';
import { repairJsonKaTeX } from '../jsonParser';

/**
 * Deterministik Otomatik Düzeltme Motoru
 * - Rubrik puan toplamını soru puanına eşitler.
 * - KaTeX matematiksel kaçışlarını onarır.
 * - Yazım ve noktalama bozukluklarını düzeltir.
 */
export function autoRemediateQuestion(
  q: any,
  auditResult: QuestionQualityResult
): { remediatedQuestion: any; wasModified: boolean; notes: string[] } {
  const notes: string[] = [];
  let wasModified = false;
  const clone = { ...q };

  const targetPoints = clone.points || 10;
  const rubric = Array.isArray(clone.rubric) ? clone.rubric.map((r: any) => ({ ...r })) : [];

  // 1. Rubrik Puan Toplamı Uyuşmazlığı Denetimi
  // ÖLÇME GÜVENİRLİĞİ İLKESİ (TASK184):
  // Rubrik puanları pedagojik ve ölçme-değerlendirme kararıdır.
  // 1 veya 2 puan dahi olsa yapay zeka veya sistem tarafından ASLA otomatik olarak değiştirilmez/dağıtılmaz.
  // Uyuşmazlık durumunda soru öğretmen incelemesine (needs_review / failed) bırakılır.
  const rubricSumFinding = auditResult.findings.find(
    f => f.validationMethod === 'rubric_sum_verification' && f.severity === 'critical'
  );

  if (rubricSumFinding && rubric.length > 0) {
    const rawSum = rubric.reduce((sum: number, r: any) => sum + (Number(r.pts ?? r.points) || 0), 0);
    if (rawSum !== targetPoints) {
      const diff = Math.abs(rawSum - targetPoints);
      notes.push(
        `Rubrik puan toplamı (${rawSum} puan) ile soru puanı (${targetPoints} puan) uyuşmuyor (Fark: ${diff} puan). Ölçme güvenirliği gereği puanlar otomatik değiştirilmemiştir; öğretmen düzeltmesi gerekmektedir.`
      );
    }
  }

  // 2. KaTeX ve JSON Matematik Kaçış Onarımı
  if (clone.question) {
    const repairedQ = repairJsonKaTeX(clone.question);
    if (repairedQ !== clone.question) {
      clone.question = repairedQ;
      wasModified = true;
      notes.push('Soru kökündeki KaTeX formül kaçışları RFC 8259 formatına onarıldı.');
    }
  }
  if (clone.answer) {
    const repairedA = repairJsonKaTeX(clone.answer);
    if (repairedA !== clone.answer) {
      clone.answer = repairedA;
      wasModified = true;
      notes.push('Model cevaptaki KaTeX formül kaçışları RFC 8259 formatına onarıldı.');
    }
  }

  // 3. Soru Sonu Noktalama ve Bozuk İşaretlerin Düzeltilmesi
  if (clone.question && typeof clone.question === 'string') {
    let cleanStem = clone.question.replace(/\s*[?.,!;]{2,}\s*$/g, '?').trim();
    if (!/[?.!:]$/.test(cleanStem)) {
      cleanStem += '?';
      clone.question = cleanStem;
      wasModified = true;
      notes.push('Soru kökü sonuna eksik noktalama işareti (?) eklendi.');
    }
  }

  return {
    remediatedQuestion: clone,
    wasModified,
    notes
  };
}

