/**
 * OYSS Rehberi Evrensel Soru Kalite Güvence Sistemi (Universal Quality Assurance Engine)
 *
 * Amaç: 5, 6, 7 ve 8. sınıflar, 6 resmî dersin tümü için;
 * - Bilimsel / matematiksel doğruluk,
 * - Kazanım uyumu ve kapsam sınırları,
 * - Cevaplanabilirlik ve veri bütünlüğü,
 * - Soru ve model cevap tutarlılığı,
 * - Rubrik ve puanlama dengesi,
 * - Dil, anlatım ve seviye uygunluğu
 * denetimlerini deterministik olarak gerçekleştirmek; hatalı soruların öğrenciye ulaşmasını önlemektir.
 */

import {
  QualityStatus,
  QualityFinding,
  QuestionQualityResult,
  ExamQualityAuditReport,
  QuestionValidationContext
} from './types';
import { runCommonQualityChecks } from './commonValidators';
import { validateTurkishQuestion } from './validators/turkishValidator';
import { validateMathQuestion } from './validators/mathValidator';
import { validateScienceQuestion } from './validators/scienceValidator';
import { validateSocialQuestion } from './validators/socialValidator';
import { validateDinQuestion } from './validators/dinValidator';
import { validateEnglishQuestion } from './validators/englishValidator';
import { autoRemediateQuestion } from './remediationEngine';
import { SAMPLE_EXAMS } from '../../data/sampleExams';
import { reconcileRubricPoints } from '../examScoring';
import { verifyQuestionSourceBinding } from '../sourceMaterialValidator';

export * from './types';
export * from './commonValidators';
export * from './remediationEngine';
export {
  validateTurkishQuestion,
  validateMathQuestion,
  validateScienceQuestion,
  validateSocialQuestion,
  validateDinQuestion,
  validateEnglishQuestion
};

function resolveSubjectId(context: QuestionValidationContext, question: any): string {
  const raw = (context.subjectId || context.subject || question?.subjectId || question?.subject || '').toLowerCase().trim();
  if (raw.includes('turk') || raw === 'tr') return 'turkce';
  if (raw.includes('mat')) return 'matematik';
  if (raw.includes('fen')) return 'fen_bilimleri';
  if (raw.includes('sos') || raw.includes('ink') || raw.includes('tarih')) return 'sosyal_bilgiler';
  if (raw.includes('din')) return 'din_kulturu';
  if (raw.includes('ing') || raw.includes('eng')) return 'ingilizce';
  return raw;
}

/**
 * Tek Bir Sorunun Kalite Denetimini Gerçekleştirir (Ortak + Ders Uzmanı Katmanı)
 */
export function auditQuestionQuality(
  question: any,
  context: QuestionValidationContext = {}
): QuestionQualityResult {
  const qNum = question?.questionNumber || question?.number || 1;
  const subjectId = resolveSubjectId(context, question);

  // 1. Ortak Kalite Denetimi
  const findings: QualityFinding[] = runCommonQualityChecks(question, context);

  // 2. Branş Uzmanı Denetimi
  if (subjectId === 'turkce') {
    findings.push(...validateTurkishQuestion(question, context));
  } else if (subjectId === 'matematik') {
    findings.push(...validateMathQuestion(question, context));
  } else if (subjectId === 'fen_bilimleri') {
    findings.push(...validateScienceQuestion(question, context));
  } else if (subjectId === 'sosyal_bilgiler') {
    findings.push(...validateSocialQuestion(question, context));
  } else if (subjectId === 'din_kulturu') {
    findings.push(...validateDinQuestion(question, context));
  } else if (subjectId === 'ingilizce') {
    findings.push(...validateEnglishQuestion(question, context));
  }

  // 3. Durum ve Puanlama Analizi (TASK228-FIX B-01)
  const criticalCount = findings.filter(f => f.severity === 'critical').length;
  const warningCount = findings.filter(f => f.severity === 'warning').length;
  const infoCount = findings.filter(f => f.severity === 'info').length;

  let status: QualityStatus = 'passed';
  if (criticalCount > 0) {
    status = 'failed';
  } else if (warningCount > 0) {
    status = 'warning';
  }

  // Kalite Skoru Hesaplama (100 üzerinden)
  let score = 100 - (criticalCount * 35 + warningCount * 10 + infoCount * 2);
  score = Math.max(0, Math.min(100, score));

  // Sertifikasyon aşağıdaki koşulları birlikte sağlamalıdır (TASK228-FIX):
  // - Soru failed veya needs_review durumunda olmamalı
  // - Kritik QA bulgusu bulunmamalı (criticalCount === 0)
  // Güncel denetim turundaki findings esas alınır; geçmiş bayraklar düzeltilmiş soruyu kilitlemez.
  const isCertified = (status as QualityStatus) !== 'failed' && 
                      (status as QualityStatus) !== 'needs_review' && 
                      criticalCount === 0;

  // Geçmiş denetim bilgileri varsa metadata olarak saklanır, güncel kararı etkilemez
  const previousQaStatus: QualityStatus | undefined = question?._qaStatus || (question?.needsReview ? 'needs_review' : undefined);

  return {
    questionNumber: qNum,
    status,
    score,
    isCertified,
    findings,
    ...(previousQaStatus ? { previousQaStatus } : {})
  };
}

/**
 * Tüm Bir Sınav Setinin (Exam Paper veya Soru Dizisi) Kalite Denetimini Gerçekleştirir
 */
export function auditExamQuality(
  questionsInput: any,
  contextInput: QuestionValidationContext = {}
): ExamQualityAuditReport {
  const startTime = Date.now();
  let safeList: any[] = [];
  let context: QuestionValidationContext = { ...contextInput };

  if (Array.isArray(questionsInput)) {
    safeList = questionsInput;
  } else if (questionsInput && typeof questionsInput === 'object') {
    if (Array.isArray(questionsInput.questions)) {
      safeList = questionsInput.questions;
    }
    context = {
      grade: questionsInput.grade ?? contextInput.grade,
      subject: questionsInput.subject ?? questionsInput.course ?? contextInput.subject,
      course: questionsInput.course ?? questionsInput.subject ?? contextInput.course,
      subjectId: questionsInput.subjectId ?? contextInput.subjectId,
      ...contextInput
    };
  }

  const questionResults: Record<number, QuestionQualityResult> = {};
  const allCritical: QualityFinding[] = [];
  const examLevelFindings: QualityFinding[] = [];

  let passedCount = 0;
  let warningCount = 0;
  let needsReviewCount = 0;
  let failedCount = 0;
  let totalScore = 0;

  // Sınav içi kardeş sorular bağlamını ve paylaşımlı kaynak gruplarını hazırla (TASK229)
  const examSharedGroups = context.sharedSourceGroups || (questionsInput && (questionsInput as any).sharedSourceGroups) || [];
  const siblingSummary = safeList.map((q, idx) => ({
    questionNumber: q.questionNumber || q.number || idx + 1,
    number: q.questionNumber || q.number || idx + 1,
    questionText: q.questionText || q.question || '',
    question: q.questionText || q.question || '',
    stimulus: q.stimulus || '',
    commonStimulus: q.commonStimulus || '',
    sharedSourceId: q.sharedSourceId || '',
    visual: q.visual,
    answer: q.modelAnswer || q.answer || ''
  }));

  safeList.forEach((q, idx) => {
    const qNum = q.questionNumber || q.number || idx + 1;
    const qContext: QuestionValidationContext = {
      ...context,
      targetPoints: q.points || 10,
      siblingQuestions: siblingSummary.filter((_, sIdx) => sIdx !== idx),
      sharedSourceGroups: examSharedGroups
    };

    const res = auditQuestionQuality(q, qContext);
    questionResults[qNum] = res;
    totalScore += res.score;

    if (res.status === 'passed') passedCount++;
    else if (res.status === 'warning') warningCount++;
    else if (res.status === 'needs_review') needsReviewCount++;
    else if (res.status === 'failed') {
      failedCount++;
      allCritical.push(...res.findings.filter(f => f.severity === 'critical'));
    }
  });

  const totalQuestions = safeList.length;
  const overallScore = totalQuestions > 0 ? Math.round(totalScore / totalQuestions) : 0;

  // Öğrenciye sunum sertifikasyonu (TASK228-FIX B-03):
  // - Toplam soru sayısı 0'dan büyük olmalı
  // - Bütün sorular güncel denetimden geçmiş olmalı (auditedResultsList.length === totalQuestions)
  // - Hiçbir soruda failed veya needs_review bulunmamalı (failedCount === 0 && needsReviewCount === 0)
  // - Güncel turda üretilen her soru sonucu isCertified === true olmalı
  const auditedResultsList = Object.values(questionResults);
  const allAuditedValid = totalQuestions > 0 && 
                          auditedResultsList.length === totalQuestions &&
                          auditedResultsList.every(r => r.isCertified && r.status !== 'failed' && r.status !== 'needs_review');

  const certifiedForStudents = allAuditedValid && failedCount === 0 && needsReviewCount === 0;

  let overallStatus: QualityStatus = 'passed';
  if (failedCount > 0) overallStatus = 'failed';
  else if (needsReviewCount > 0) overallStatus = 'needs_review';
  else if (warningCount > 0) overallStatus = 'warning';

  return {
    overallStatus,
    overallScore,
    certifiedForStudents,
    totalQuestions,
    passedCount,
    warningCount,
    failedCount,
    needsReviewCount,
    criticalIssues: allCritical,
    questionResults,
    examLevelFindings,
    executionTimeMs: Date.now() - startTime
  };
}

/**
 * Sınav Sorularını Denetler, Deterministik Düzeltir ve Gerekirse Güvenli İkame Eder
 * (Uçtan Uca Kalite Güvence ve Sertifikasyon)
 */
/**
 * Aday ikame sorunun pedagojik ve teknik uygunluğunu bağımsız olarak doğrular (TASK232)
 */
export function evaluateCandidateEligibility(
  targetQ: any,
  cand: any,
  qContext: QuestionValidationContext,
  existingStems: Set<string> = new Set(),
  existingIds: Set<string> = new Set(),
  baseSharedGroups: any[] = []
): { status: 'eligible' | 'ineligible' | 'requires_review'; score: number; reason?: string } {
  const reqOutcome = (targetQ as any).outcomeCode || (targetQ as any).outcome || (targetQ as any).learningOutcome;
  const candOutcome = cand.outcomeCode || (cand as any).outcome || (cand as any).learningOutcome;

  // 1. Kazanım kontrolü
  if (!candOutcome || !reqOutcome || candOutcome.trim() !== reqOutcome.trim()) {
    return { status: 'ineligible', score: 0, reason: 'Kazanım kodu eşleşmiyor' };
  }

  // 2. Mükerrer kök ve ID kontrolü (aynı sınav içi)
  const candStem = (cand.questionText || cand.question || '').trim().toLowerCase();
  if (!candStem || existingStems.has(candStem)) {
    return { status: 'ineligible', score: 0, reason: 'Sınav içi mükerrer soru kökü' };
  }
  if (cand.id && existingIds.has(String(cand.id))) {
    return { status: 'ineligible', score: 0, reason: 'Sınav içi mükerrer soru kimliği' };
  }

  // 3. Adayın kaynak bağlamını doğrula
  const candBinding = verifyQuestionSourceBinding(cand, [], baseSharedGroups);
  if (!candBinding.isValid || candBinding.bindingType === 'orphan_reference' || candBinding.bindingType === 'missing_source') {
    return { status: 'ineligible', score: 0, reason: 'Kaynak metin eksik veya çözümlenemedi' };
  }

  // 4. EKOK vs EBOB Kavramsal Odak Kontrolü (TASK232 Öncelik 2.A)
  const targetFull = `${targetQ.questionText || targetQ.question || ''} ${targetQ.modelAnswer || targetQ.answer || ''} ${targetQ.stimulus || ''}`.toLowerCase();
  const candFull = `${cand.questionText || cand.question || ''} ${cand.modelAnswer || cand.answer || ''} ${cand.stimulus || ''}`.toLowerCase();

  const isTargetEkok = /\b(?:ekok|en\s+küçük\s+ortak\s+kat|ortak\s+kat|birlikte\s+nöbet|birlikte\s+sefer|birlikte\s+çal|aynı\s+anda)\b/i.test(targetFull);
  const isCandEkok = /\b(?:ekok|en\s+küçük\s+ortak\s+kat|ortak\s+kat|birlikte\s+nöbet|birlikte\s+sefer|birlikte\s+çal|aynı\s+anda)\b/i.test(candFull);

  const isTargetEbob = /\b(?:ebob|en\s+büyük\s+ortak\s+bölen|ortak\s+bölen|şişelere\s+doldur|şişe\s+sayısı|fayans\s+döşe|çuval|parçaya\s+ayrıl)\b/i.test(targetFull);
  const isCandEbob = /\b(?:ebob|en\s+büyük\s+ortak\s+bölen|ortak\s+bölen|şişelere\s+doldur|şişe\s+sayısı|fayans\s+döşe|çuval|parçaya\s+ayrıl)\b/i.test(candFull);

  if (isTargetEkok && !isCandEkok && isCandEbob) {
    return { status: 'ineligible', score: 0, reason: 'EKOK sorusu EBOB sorusuyla ikame edilemez (kavramsal odak uyuşmazlığı)' };
  }
  if (isTargetEbob && !isCandEbob && isCandEkok) {
    return { status: 'ineligible', score: 0, reason: 'EBOB sorusu EKOK sorusuyla ikame edilemez (kavramsal odak uyuşmazlığı)' };
  }

  // 5. Tablo vs Afiş / Salt Metin Kontrolü (TASK232 Öncelik 2.B)
  const isTargetTableReq = /(?:tablodaki\s+veriler|tabloya\s+göre|çizelgeye\s+göre)/i.test(targetQ.questionText || targetQ.question || '');
  const candHasTable = Boolean((cand as any).table || (cand as any).dataTable || (cand.stimulus && cand.stimulus.includes('|')));
  if (isTargetTableReq && !candHasTable) {
    return { status: 'requires_review', score: 10, reason: 'Tablo yorumlama görevi tablosuz soruyla tam denklik sağlamaz' };
  }

  // 6. Tam Sayı Çözülebilirlik Kontrolü (TASK232 Öncelik 1 & 3)
  const candStemRaw = cand.questionText || cand.question || '';
  const candAnsRaw = cand.modelAnswer || cand.answer || '';
  if (/tam\s+sayı\s+kaçtır|tam\s+sayı\s+olarak|tam\s+sayı\s+değeri/i.test(candStemRaw) && /\b-?\d+[,.]\d+\b/.test(candAnsRaw)) {
    return { status: 'ineligible', score: 0, reason: 'Soru kökü tam sayı sormasına rağmen model cevap ondalıklı/rasyonel sayı içeriyor' };
  }

  // 7. Adayın Bağımsız QA Denetimi
  const candAudit = auditQuestionQuality(cand, qContext);
  if (candAudit.status === 'failed' || !candAudit.isCertified) {
    return { status: 'ineligible', score: 0, reason: 'Aday soru kalite denetiminden geçemedi' };
  }

  // Skor hesaplama
  let score = 50;
  if (cand.difficulty && targetQ.difficulty && cand.difficulty === targetQ.difficulty) score += 40;
  const qHasVisual = Boolean(targetQ.visual || targetQ.visualData);
  const candHasVisual = Boolean(cand.visual || cand.visualData);
  if (qHasVisual === candHasVisual) score += 30;
  if (cand.cognitiveLevel && targetQ.cognitiveLevel && cand.cognitiveLevel === targetQ.cognitiveLevel) score += 15;
  if (cand.archetype && targetQ.archetype && cand.archetype === targetQ.archetype) score += 15;

  // Çapraz senaryo tekrar cezası (TASK232 Öncelik 4)
  if (qContext.assignedSubstitutionIds && cand.id && qContext.assignedSubstitutionIds.has(String(cand.id))) {
    score -= 40; // Tekrar kullanımını engellemek için skoru düşür
  }

  return { status: 'eligible', score };
}

export function ensureExamQuality<T extends any>(
  questionsInput: T[] | any,
  contextInput: QuestionValidationContext = {},
  substitutionPool?: T[]
): any {
  const isExamObject = questionsInput && !Array.isArray(questionsInput) && Array.isArray(questionsInput.questions);
  const safeList: any[] = isExamObject ? [...questionsInput.questions] : (Array.isArray(questionsInput) ? [...questionsInput] : []);
  const context: QuestionValidationContext = isExamObject
    ? {
        grade: questionsInput.grade ?? contextInput.grade,
        subject: questionsInput.subject ?? questionsInput.course ?? contextInput.subject,
        course: questionsInput.course ?? questionsInput.subject ?? contextInput.course,
        subjectId: questionsInput.subjectId ?? contextInput.subjectId,
        ...contextInput
      }
    : contextInput;

  let remediationCount = 0;

  // Sınav içi kardeş sorular bağlamını ve paylaşımlı kaynak gruplarını hazırla (TASK229)
  const examSharedGroups = isExamObject ? (questionsInput.sharedSourceGroups || []) : [];
  const baseSharedGroups = contextInput.sharedSourceGroups || examSharedGroups;

  const siblingSummary = safeList.map((q, idx) => ({
    questionNumber: q.questionNumber || q.number || idx + 1,
    number: q.questionNumber || q.number || idx + 1,
    questionText: q.questionText || q.question || '',
    question: q.questionText || q.question || '',
    stimulus: q.stimulus || '',
    commonStimulus: q.commonStimulus || '',
    sharedSourceId: q.sharedSourceId || '',
    visual: q.visual,
    answer: q.modelAnswer || q.answer || ''
  }));

  const getQuestionContext = (targetQ: any, qIdx: number): QuestionValidationContext => ({
    ...context,
    targetPoints: targetQ.points || 10,
    siblingQuestions: siblingSummary.filter((_, sIdx) => sIdx !== qIdx),
    sharedSourceGroups: baseSharedGroups
  });

  // 1. ADIM: İlk Denetim ve Deterministik Düzeltme
  const remediatedList = safeList.map((q, idx) => {
    const qContext = getQuestionContext(q, idx);
    const initialAudit = auditQuestionQuality(q, qContext);

    if (initialAudit.status === 'failed' || initialAudit.status === 'warning') {
      const { remediatedQuestion, wasModified, notes } = autoRemediateQuestion(q, initialAudit);
      if (wasModified) {
        remediationCount++;
        // Düzeltme sonrası tekrar denetle
        const reAudit = auditQuestionQuality(remediatedQuestion, qContext);
        return {
          ...remediatedQuestion,
          _qaNotes: notes,
          _qaStatus: reAudit.status
        };
      }
    }
    return q;
  });

  // 2. ADIM: Deterministik Olarak Düzeltilemeyen Kritik Hatalı Soruları İkame Et
  // Mükerrer soru eklenmesini önlemek için mevcut sınavdaki soru kökleri ve kimlikleri
  const existingStems = new Set<string>();
  const existingIds = new Set<string>();

  safeList.forEach(item => {
    const s = ((item as any).questionText || (item as any).question || '').trim().toLowerCase();
    if (s) existingStems.add(s);
    const id = (item as any).id;
    if (id) existingIds.add(String(id));
  });

  const finalList = remediatedList.map((q, idx) => {
    const qContext = getQuestionContext(q, idx);
    const postAudit = auditQuestionQuality(q, qContext);

    if (postAudit.status === 'failed') {
      const reqOutcome = (q as any).outcomeCode || (q as any).outcome;
      let candidate: any = null;

      // Adayları derecelendirmek ve filtrelemek için bağımsız uygunluk denetimi (TASK232 Öncelik 2 & 3)
      const candidateEvaluations = new Map<any, { status: string; score: number; reason?: string }>();

      const getEvaluation = (cand: any) => {
        if (!candidateEvaluations.has(cand)) {
          const res = evaluateCandidateEligibility(q, cand, qContext, existingStems, existingIds, baseSharedGroups);
          candidateEvaluations.set(cand, res);
        }
        return candidateEvaluations.get(cand)!;
      };

      const isValidCandidate = (cand: any): boolean => {
        const evalRes = getEvaluation(cand);
        return evalRes.status === 'eligible';
      };

      const scoreCandidate = (cand: any): number => {
        return getEvaluation(cand).score;
      };

      // 1. Sağlanan ikame havuzundan aynı kazanıma sahip temiz soru ara
      if (substitutionPool && substitutionPool.length > 0) {
        const poolMatches = substitutionPool
          .filter(isValidCandidate)
          .sort((a, b) => scoreCandidate(b) - scoreCandidate(a));
        if (poolMatches.length > 0) {
          candidate = poolMatches[0];
        }
      }

      // 2. Sağlanan havuz yoksa veya aday bulunamadıysa, SAMPLE_EXAMS deposundaki diğer senaryolardan temiz aday ara
      if (!candidate && typeof SAMPLE_EXAMS !== 'undefined' && Array.isArray(SAMPLE_EXAMS)) {
        try {
          const sampleMatches = SAMPLE_EXAMS
            .filter(e => (context.grade ? e.grade === context.grade : true) && (context.subjectId ? e.subjectId === context.subjectId : true))
            .flatMap(e => e.questions)
            .filter(isValidCandidate)
            .sort((a, b) => scoreCandidate(b) - scoreCandidate(a));
          if (sampleMatches.length > 0) {
            candidate = sampleMatches[0];
          }
        } catch {
          // İkame arama hatası sessizce atlanır
        }
      }

      if (candidate) {
        remediationCount++;
        const candidateStem = (candidate.questionText || candidate.question || '').trim().toLowerCase();
        if (candidateStem) existingStems.add(candidateStem);
        if (candidate.id) {
          existingIds.add(String(candidate.id));
          if (context.assignedSubstitutionIds) {
            context.assignedSubstitutionIds.add(String(candidate.id));
          }
        }

        const preservedOrigin = (candidate as any).sourceOrigin || 'oyss_curated';
        const targetPts = (q as any).points || (candidate as any).points || 10;

        // Çok kriterli analitik rubrik koruma ve dengeleme (TASK232 Öncelik 2.C)
        let candidateRubric = Array.isArray(candidate.rubric) ? [...candidate.rubric] : [];
        if (candidateRubric.length === 1 && targetPts > 10 && Array.isArray(q.rubric) && q.rubric.length >= 2) {
          const pt1 = Math.round(targetPts * 0.6);
          const pt2 = targetPts - pt1;
          const critText = candidateRubric[0].criterion || 'Kural ve işlem basamaklarının doğru uygulanması';
          candidateRubric = [
            { criterion: `${critText} (Temel işlem ve kural adımı)`, points: pt1, pts: pt1 },
            { criterion: 'Gerekçelendirme, nihai sonuç ve açıklamanın eksiksiz sunulması', points: pt2, pts: pt2 }
          ];
        }

        const adjustedRubric = candidateRubric.length > 0
          ? reconcileRubricPoints(candidateRubric, targetPts, true)
          : [{ criterion: 'Doğru ve eksiksiz cevap', points: targetPts, pts: targetPts }];

        console.warn(`[QualityAssurance] ${idx + 1}. soruda kritik kalite kusuru tespit edildi; kazanım (${reqOutcome}) doğrulanmış eşdeğer soru (${preservedOrigin}) ile otomatik olarak yenilendi.`);
        return {
          ...candidate,
          questionNumber: idx + 1,
          number: idx + 1,
          sourceOrigin: preservedOrigin,
          points: targetPts,
          rubric: adjustedRubric,
          isCertified: true,
          _qaStatus: 'passed',
          _qaSubstitution: {
            originalQuestionId: (q as any).id || (q as any).questionNumber,
            originalOutcome: reqOutcome,
            substitutedWithOutcome: reqOutcome,
            sourceOrigin: preservedOrigin
          }
        };
      }

      // Uygun ikame bulunamadığında soruyu silmek yerine sınav bütünlüğünü (soru sayısı ve puan) koru
      console.warn(`[QualityAssurance] ${idx + 1}. soruda kritik kalite kusuru tespit edildi ancak uygun ikame soru bulunamadı.`);
      return {
        ...q,
        points: (q as any).points || 10,
        isCertified: false,
        _qaWarning: 'Bu soru içerik incelemesi beklemektedir.',
        _qaStatus: 'needs_review'
      };
    }
    return q;
  });

  // 3. ADIM: Her Soru İçin Sertifikasyon ve Durum Alanlarını Kesinleştir (TASK185, TASK228 & TASK228-FIX)
  const certifiedList = finalList.map((q, idx) => {
    const qContext = getQuestionContext(q, idx);
    const audit = auditQuestionQuality(q, qContext);
    // Eğer soru 2. adımda ikame bulunamadığı için needs_review işaretlendiyse bu durumu koru
    const isUnresolvedSubstitution = (q as any)._qaStatus === 'needs_review';
    const isFailed = audit.status === 'failed';
    const isNeedsReview = isUnresolvedSubstitution || audit.status === 'needs_review';
    const isCert = audit.isCertified && !isFailed && !isNeedsReview;

    let qStatus: QualityStatus = 'passed';
    if (isFailed) qStatus = 'failed';
    else if (isNeedsReview) qStatus = 'needs_review';
    else if (audit.status === 'warning') qStatus = 'warning';

    return {
      ...q,
      isCertified: isCert,
      _qaStatus: qStatus,
      _qaFindings: audit.findings
    };
  });

  // 4. ADIM: Nihai Sınav Kalite Raporu
  const finalReport = auditExamQuality(certifiedList, { ...context, sharedSourceGroups: baseSharedGroups });

  if (isExamObject) {
    return {
      ...questionsInput,
      questions: certifiedList,
      qualityAudit: {
        summary: finalReport,
        certifiedForStudents: finalReport.certifiedForStudents,
        remediationCount
      }
    };
  }

  return {
    certifiedQuestions: certifiedList,
    report: finalReport,
    remediationCount
  };
}

/**
 * Çalışma Kâğıtlarının Kalite Güvence ve Sertifikasyon Denetimi (TASK184)
 * Çözümlü örnekler ve sıra sende alıştırmalarını denetler, kusurlu içeriklerin öğrenciye sunulmasını engeller.
 */
export function ensureStudySheetQuality(
  studySheet: any,
  contextInput: QuestionValidationContext = {}
): any {
  if (!studySheet || !Array.isArray(studySheet.sections)) {
    return studySheet;
  }

  const context: QuestionValidationContext = {
    grade: studySheet.grade,
    subjectId: studySheet.subjectId,
    materialKind: 'study_sheet',
    skipRubricCheck: true,
    ...contextInput
  };

  let failedSectionsCount = 0;
  let needsReviewSectionsCount = 0;
  let warningSectionsCount = 0;
  let passedSectionsCount = 0;
  let totalScore = 0;
  const sectionResults: Record<number, QuestionQualityResult> = {};
  const allCritical: QualityFinding[] = [];

  const certifiedSections = studySheet.sections.map((sec: any, idx: number) => {
    // 1. Çözümlü Model Soru Denetimi
    const solvedQ = {
      questionNumber: idx + 1,
      outcomeCode: sec.outcomeCode,
      questionText: sec.solvedExample?.question || '',
      question: sec.solvedExample?.question || '',
      modelAnswer: sec.solvedExample?.solution || '',
      answer: sec.solvedExample?.solution || '',
      solutionExplanation: sec.solvedExample?.analysis || '',
      subjectId: studySheet.subjectId,
      grade: studySheet.grade,
      points: 10
    };
    const solvedAudit = auditQuestionQuality(solvedQ, context);

    // 2. Sıra Sende Soru Denetimi (TASK185 Uyaran ve Bağlam Doğrulaması)
    // Practice question yalnızca açıkça kendisine ait uyaranı (sec.practiceQuestion.stimulus)
    // veya açıkça tanımlanmış bağıntıyı (usesSolvedExampleStimulus === true) kullanır.
    // Otomatik olarak solvedExample metni ortak uyaran kabul EDİLMEZ.
    let practiceStimulus: string | undefined = sec.practiceQuestion?.stimulus;
    if (!practiceStimulus && sec.practiceQuestion?.usesSolvedExampleStimulus === true) {
      practiceStimulus = (sec.solvedExample as any)?.stimulus || sec.solvedExample?.question;
    }

    const practiceQ = {
      questionNumber: idx + 1,
      outcomeCode: sec.outcomeCode,
      questionText: sec.practiceQuestion?.question || '',
      question: sec.practiceQuestion?.question || '',
      stimulus: practiceStimulus,
      contextText: practiceStimulus,
      modelAnswer: sec.practiceQuestion?.hint || '',
      answer: sec.practiceQuestion?.hint || '',
      subjectId: studySheet.subjectId,
      grade: studySheet.grade,
      points: 10
    };
    const practiceAudit = auditQuestionQuality(practiceQ, context);

    const findings: QualityFinding[] = [...solvedAudit.findings, ...practiceAudit.findings];
    const isSolvedFailed = solvedAudit.status === 'failed';
    const isPracticeFailed = practiceAudit.status === 'failed';
    const isNeedsReview = solvedAudit.status === 'needs_review' || practiceAudit.status === 'needs_review';

    const isCertified = !isSolvedFailed && !isPracticeFailed && !isNeedsReview;
    let qaStatus: QualityStatus = 'passed';
    if (isSolvedFailed || isPracticeFailed) {
      qaStatus = 'failed';
      failedSectionsCount++;
      allCritical.push(...findings.filter(f => f.severity === 'critical'));
    } else if (isNeedsReview) {
      qaStatus = 'needs_review';
      needsReviewSectionsCount++;
    } else if (solvedAudit.status === 'warning' || practiceAudit.status === 'warning') {
      qaStatus = 'warning';
      warningSectionsCount++;
    } else {
      passedSectionsCount++;
    }

    const avgScore = Math.round((solvedAudit.score + practiceAudit.score) / 2);
    totalScore += avgScore;

    sectionResults[idx + 1] = {
      questionNumber: idx + 1,
      status: qaStatus,
      score: avgScore,
      isCertified,
      findings
    };

    return {
      ...sec,
      isCertified,
      qaStatus,
      qaFindings: findings
    };
  });

  const totalSections = certifiedSections.length;
  const overallScore = totalSections > 0 ? Math.round(totalScore / totalSections) : 0;
  const certifiedForStudents = failedSectionsCount === 0 && needsReviewSectionsCount === 0;

  let overallStatus: QualityStatus = 'passed';
  if (failedSectionsCount > 0) overallStatus = 'failed';
  else if (needsReviewSectionsCount > 0) overallStatus = 'needs_review';
  else if (warningSectionsCount > 0) overallStatus = 'warning';

  const summaryReport: ExamQualityAuditReport = {
    overallStatus,
    overallScore,
    certifiedForStudents,
    totalQuestions: totalSections,
    passedCount: passedSectionsCount,
    warningCount: warningSectionsCount,
    failedCount: failedSectionsCount,
    needsReviewCount: needsReviewSectionsCount,
    criticalIssues: allCritical,
    questionResults: sectionResults,
    examLevelFindings: [],
    executionTimeMs: 0
  };

  return {
    ...studySheet,
    sections: certifiedSections,
    qualityAudit: {
      summary: summaryReport,
      certifiedForStudents
    }
  };
}

// TASK188 Onaylı İçerik ve Sunum Filtreleme Dışa Aktarımları
export * from './presentationContentFilter';

