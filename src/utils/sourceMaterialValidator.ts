import { ExamQuestion, QuestionArchetype } from '../types';

export type SourceMaterialType = 
  | 'reading_text' 
  | 'data_table' 
  | 'chart_or_visual' 
  | 'dialogue' 
  | 'experiment_setup' 
  | 'none';

export interface SourceRequirement {
  requiresSource: boolean;
  type: SourceMaterialType;
  signalKeyword?: string;
  reason: string;
}

export interface SourceValidationStatus {
  isValid: boolean;
  requirement: SourceRequirement;
  hasSource: boolean;
  isAbstractOrMetaSummary: boolean;
  isCrossReference: boolean;
  referencedQuestionNumber?: number;
  recovered: boolean;
  recoveredFrom?: string;
  errorMessage?: string;
}

export interface SharedSourceGroup {
  id: string;
  title: string;
  questionNumbers: number[];
  text: string;
}

export interface ExamSourceValidationReport {
  examId?: string;
  totalQuestions: number;
  validQuestionsCount: number;
  missingSourceCount: number;
  recoveredCount: number;
  isExamFullyValid: boolean;
  questionStatuses: Record<number, SourceValidationStatus>;
  sharedSourceGroups: SharedSourceGroup[];
}

/**
 * Bir sorunun soru kökü, kazanım ve şablon özelliklerinden hareketle
 * bir kaynak materyale (metin, tablo, görsel, diyalog) ihtiyaç duyup duymadığını
 * otomatik ve hassas olarak belirler.
 */
export function detectSourceRequirement(
  questionText: string,
  archetype?: QuestionArchetype | string,
  contextText?: string,
  stimulus?: string
): SourceRequirement {
  const combined = `${questionText || ''} ${contextText || ''} ${stimulus || ''}`.toLowerCase();

  // 1. OKUMA METNİ / PARAGRAF / ŞİİR GEREKSİNİMİ
  const textSignals = [
    { pattern: /(?:metn[ie]|metinden|metne|metindeki)\s+(?:[a-zA-ZçÇğĞıİöÖşŞüÜ\s]{0,20}\s+)?(?:hareketle|göre|dayanarak|dayalı|çıkarı|anlatılan|bahsedilen)/i, label: 'metne göre / metinden hareketle' },
    { pattern: /(?:paragraftan|paragrafta|paragrafa|parçadan|parçada|parçaya)\s+(?:[a-zA-ZçÇğĞıİöÖşŞüÜ\s]{0,20}\s+)?(?:hareketle|göre|dayanarak|dayalı|çıkarı)/i, label: 'paragrafa göre / parçadan hareketle' },
    { pattern: /(?:şiirden|şiirde|şiire|dizelerden|dizelere)\s+(?:hareketle|göre|çıkarı)/i, label: 'şiire / dizelere göre' },
    { pattern: /(?:okuduğunuz|verilen|yukarıdaki)\s+met(?:in|ne|den|ni)/i, label: 'okuduğunuz / verilen metin' },
    { pattern: /(?:metnin|paragrafın|parçanın|şiirin)\s+(?:konusunu|ana\s+fikrini|ana\s+düşüncesini|başlığını|türünü|özetini|anahtar\s+kelimelerini)/i, label: 'metnin konusu / ana fikri' },
    { pattern: /metinde\s+geçen\s+['"“]/i, label: 'metinde geçen sözcük' },
    { pattern: /metinden\s+hareketle\s+.*aşamasını/i, label: 'metinden hareketle aşama' },
    { pattern: /metindeki\s+(?:olay|kahraman|karakter|tutum|davranış|düşünce)/i, label: 'metindeki olay/kahraman/düşünce' },
    { pattern: /(?:1\.|2\.|3\.|4\.|5\.)\s+sorudaki\s+.*metn/i, label: 'önceki sorudaki metin referansı' },
    { pattern: /yukarıda\s+verilen\s+.*metn/i, label: 'yukarıda verilen metin' }
  ];

  for (const sig of textSignals) {
    if (sig.pattern.test(combined)) {
      return {
        requiresSource: true,
        type: 'reading_text',
        signalKeyword: sig.label,
        reason: `Soru kökünde "${sig.label}" ifadesi yer aldığından öğrencinin okuyup çıkarım yapabileceği bir kaynak metin zorunludur.`
      };
    }
  }

  // 2. TABLO / VERİ MATRİSİ GEREKSİNİMİ
  const tableSignals = [
    { pattern: /tablo(?:ya|daki|dan|da)\s+(?:göre|verilen|hareketle|dayanarak|bakarak|inceleyerek)/i, label: 'tabloya göre' },
    { pattern: /çizelge(?:ye|deki|den|de)\s+(?:göre|verilen|hareketle)/i, label: 'çizelgeye göre' },
    { pattern: /tablodaki\s+veriler/i, label: 'tablodaki veriler' },
    { pattern: /tablo(?:da|yu)?\s+(?:doldurunuz|tamamlayınız|boş\s+bırakılan)/i, label: 'tablo doldurma' }
  ];

  for (const sig of tableSignals) {
    if (sig.pattern.test(combined) || archetype?.includes('Matris') || archetype?.includes('Tablo')) {
      return {
        requiresSource: true,
        type: 'data_table',
        signalKeyword: sig.label,
        reason: `Soru kökünde "${sig.label}" veya matris şablonu yer aldığından veri tablosu zorunludur.`
      };
    }
  }

  // 3. GRAFİK / GÖRSEL / HARİTA GEREKSİNİMİ
  const visualSignals = [
    { pattern: /grafi(?:ğe|kte|kteki|kten)\s+(?:[a-zA-ZçÇğĞıİöÖşŞüÜ\s]{0,20}\s+)?(?:göre|verilen|hareketle|dayanarak|inceleyerek)/i, label: 'grafiğe göre' },
    { pattern: /grafikteki\s+veriler/i, label: 'grafikteki veriler' },
    { pattern: /(?:verilen|aşağıdaki)\s+görsele\s+göre/i, label: 'verilen görsele göre' },
    { pattern: /görsel(?:le|deki|de)\s+(?:iletilen|anlatılan|verilen|gösterilen)/i, label: 'görseldeki anlama göre' },
    { pattern: /şema(?:ya|daki|dan)\s+(?:göre|verilen|hareketle)/i, label: 'şemaya göre' },
    { pattern: /harita(?:ya|daki|dan)\s+(?:göre|verilen|hareketle)/i, label: 'haritaya göre' }
  ];

  for (const sig of visualSignals) {
    if (sig.pattern.test(combined) || archetype?.toLowerCase().includes('grafik') || archetype?.toLowerCase().includes('gorsel')) {
      return {
        requiresSource: true,
        type: 'chart_or_visual',
        signalKeyword: sig.label,
        reason: `Soru kökünde "${sig.label}" ifadesi veya grafik şablonu yer aldığından ilgili grafik veya görsel açıklama zorunludur.`
      };
    }
  }

  // 4. KARŞILIKLI DİYALOG / ÖĞRENCİ TARTIŞMASI GEREKSİNİMİ
  const dialogueSignals = [
    { pattern: /diyalo(?:ğa|gda|gdaki|gdan)\s+(?:göre|hareketle|inceleyerek)/i, label: 'diyaloğa göre' },
    { pattern: /(?:öğrencilerin|öğrenci)\s+tartışma(?:sına|sında|sından)\s+hareketle/i, label: 'öğrenci tartışmasına göre' },
    { pattern: /hangi\s+öğrenci(?:nin)?\s+(?:görüşü|ifadesi|açıklaması|haklıdır)/i, label: 'hangi öğrenci haklıdır' }
  ];

  for (const sig of dialogueSignals) {
    if (sig.pattern.test(combined) || archetype?.includes('Diyalog')) {
      return {
        requiresSource: true,
        type: 'dialogue',
        signalKeyword: sig.label,
        reason: `Soru kökü veya şablonu karşılıklı diyalog gerektirdiğinden karakter konuşmaları zorunludur.`
      };
    }
  }

  // 5. DENEY DÜZENEĞİ
  if (/deney\s+düzeneği(?:ne|nde|ndeki)\s+göre/i.test(combined) || archetype?.includes('Deney')) {
    return {
      requiresSource: true,
      type: 'experiment_setup',
      signalKeyword: 'deney düzeneğine göre',
      reason: 'Soru deneysel kurgu gerektirdiğinden deney düzeneği ve değişken bilgileri zorunludur.'
    };
  }

  return {
    requiresSource: false,
    type: 'none',
    reason: 'Soru bağımsız olarak çözülebilen doğrudan kavramsal veya işlem sorusudur.'
  };
}

/**
 * Bir sorunun mevcut `stimulus` (uyarıcı) metnini inceler; metnin yeterli bir
 * kaynak mı, salt bir soru referansı mı yoksa yetersiz bir meta-özet mi olduğunu saptar.
 */
export function checkStimulusQuality(
  stimulus: string | undefined | null,
  requirement: SourceRequirement = { requiresSource: true, type: 'reading_text', reason: 'Varsayılan kaynak kontrolü' }
): {
  isValid: boolean;
  isMetaSummary: boolean;
  isCrossReference: boolean;
  referencedQuestionNumber?: number;
} {
  if (!requirement.requiresSource) {
    return { isValid: true, isMetaSummary: false, isCrossReference: false };
  }

  if (!stimulus || stimulus.trim().length === 0) {
    return { isValid: false, isMetaSummary: false, isCrossReference: false };
  }

  const trimmed = stimulus.trim();

  // 1. Önceki Soru Referansı Kontrolü
  // Örnek: "Yukarıda verilen 1. sorudaki ahşap sandık metnini dikkate alınız."
  const crossRefMatch = /(?:yukarıda(?:ki)?|önceki|(\d+)\.)\s+(?:sorudaki|verilen)?\s*(?:[a-zA-ZçÇğĞıİöÖşŞüÜ\s'"`]+)?\s*metn[ie]\s*(?:dikkate|esas|göre)?/i.exec(trimmed);
  if (crossRefMatch || /1\.\s+sorudaki/i.test(trimmed)) {
    const qNum = crossRefMatch && crossRefMatch[1] ? parseInt(crossRefMatch[1], 10) : 1;
    return {
      isValid: false,
      isMetaSummary: false,
      isCrossReference: true,
      referencedQuestionNumber: qNum
    };
  }

  // 2. Yetersiz Soyut Meta-Özet Kontrolü (Zeytinyağı hatasının kök nedeni!)
  // Örnek: "Metinde zeytinin toplanıp yağa dönüştürülmesine kadar belirli bir sıra anlatılmıştır."
  // Metnin kendisi (yaygı serilmesi, sırıkla silkeleme, taş değirmen) YOK, sadece metin hakkında 1 cümlelik özet var.
  if (requirement.type === 'reading_text') {
    const metaSummaryPatterns = [
      /^metinde\s+.*anlatıl(?:maktadır|mıştır)\.?$/i,
      /^metin\s+.*etrafında\s+şekillenmiştir\.?$/i,
      /^okuduğunuz\s+metin\s+.*işlemektedir\.?$/i,
      /^bu\s+metinde\s+.*bahsedilmektedir\.?$/i,
      /^metinde\s+belirli\s+bir\s+sıra\s+anlatılmıştır\.?$/i
    ];

    const isMeta = metaSummaryPatterns.some(p => p.test(trimmed)) && trimmed.length < 130;
    if (isMeta) {
      return {
        isValid: false,
        isMetaSummary: true,
        isCrossReference: false
      };
    }
  }

  // 3. Tablo gereksiniminde en azından tablo yapısı/satırları olmalı
  if (requirement.type === 'data_table') {
    const hasTableMarkup = trimmed.includes('|') || 
                           trimmed.includes('---') || 
                           /Bölge\s+\d+|Durum\s+[A-Z]|Özellik|VAR|YOK/i.test(trimmed);
    if (!hasTableMarkup && trimmed.length < 50) {
      return { isValid: false, isMetaSummary: true, isCrossReference: false };
    }
  }

  // 4. Diyalog gereksiniminde en azından karşılıklı konuşma veya tırnak olmalı
  if (requirement.type === 'dialogue') {
    const hasDialogue = /:\s*["“]|:\s*[A-ZÇĞİÖŞÜ]|\n-\s+/i.test(trimmed) || 
                        /[a-zA-ZçÇğĞıİöÖşŞüÜ]+:\s*["“]/.test(trimmed);
    if (!hasDialogue && trimmed.length < 60) {
      return { isValid: false, isMetaSummary: true, isCrossReference: false };
    }
  }

  // Yeterli uzunlukta gerçek içerik
  return {
    isValid: trimmed.length >= 40,
    isMetaSummary: false,
    isCrossReference: false
  };
}

/**
 * Bir soru setindeki veya sınavdaki tüm soruları inceler,
 * ortak metinleri tespit eder, eksik veya çapraz referanslı soruları
 * güvenilir biçimde tamamlar ve sınav kaynak doğrulama raporu üretir.
 */
export function validateAndEnrichExamQuestions<T extends ExamQuestion | {
  questionNumber?: number;
  number?: number;
  outcomeCode?: string;
  outcome?: string;
  questionText?: string;
  question?: string;
  stimulus?: string;
  contextText?: string;
  sharedSourceId?: string;
  commonStimulus?: string;
  hasMissingSourceError?: boolean;
  sourceValidationError?: string;
}>(
  questions: T[],
  sourceKnowledgePool?: Record<string, string> // Bilinen kazanım veya soru metinleri havuzu
): {
  enrichedQuestions: T[];
  report: ExamSourceValidationReport;
} {
  const safeList = Array.isArray(questions) ? [...questions] : [];
  const questionStatuses: Record<number, SourceValidationStatus> = {};
  const sharedGroupsMap: Record<string, SharedSourceGroup> = {};
  let missingCount = 0;
  let recoveredCount = 0;

  // 1. ADIM: Sınav içindeki zengin kaynak metinleri haritalandır (Örn: Soru 1'deki metin)
  const candidateSourcesByQNum: Record<number, string> = {};
  safeList.forEach((q, idx) => {
    const qNum = (q as any).questionNumber || (q as any).number || (idx + 1);
    const stim = q.stimulus?.trim() || '';
    if (stim.length >= 100 && !stim.startsWith('Metinde') && !stim.startsWith('Yukarıda')) {
      candidateSourcesByQNum[qNum] = stim;
    }
  });

  // Eğer 1. soruda zengin metin varsa birincil adaydır
  const primaryCommonText = candidateSourcesByQNum[1] || Object.values(candidateSourcesByQNum)[0] || '';

  // 2. ADIM: Her soruyu doğrula ve gerekirse onar / zenginleştir
  const enrichedQuestions = safeList.map((q, idx) => {
    const qNum = (q as any).questionNumber || (q as any).number || (idx + 1);
    const qText = (q as any).questionText || (q as any).question || '';
    const stim = q.stimulus || '';
    const ctx = q.contextText || '';
    const arch = (q as any).archetype || (q as any).templateType || '';

    const req = detectSourceRequirement(qText, arch, ctx, stim);

    if (!req.requiresSource) {
      questionStatuses[qNum] = {
        isValid: true,
        requirement: req,
        hasSource: Boolean(stim && stim.trim().length > 0),
        isAbstractOrMetaSummary: false,
        isCrossReference: false,
        recovered: false
      };
      return {
        ...q,
        hasMissingSourceError: false,
        sourceValidationError: undefined
      };
    }

    const quality = checkStimulusQuality(stim, req);

    // Durum A: Kaynak zaten geçerli ve eksiksiz
    if (quality.isValid) {
      questionStatuses[qNum] = {
        isValid: true,
        requirement: req,
        hasSource: true,
        isAbstractOrMetaSummary: false,
        isCrossReference: false,
        recovered: false
      };
      return {
        ...q,
        hasMissingSourceError: false,
        sourceValidationError: undefined
      };
    }

    // Durum B: Kaynak eksik, meta-özet veya önceki soruya referans -> GÜVENİLİR BİÇİMDE GERİ YÜKLE
    let recoveredText = '';
    let recoverySourceLabel = '';

    // B.1: Çapraz referans varsa belirtilen sorudan geri yükle (Örn: Soru 1'deki ahşap sandık metni)
    if (quality.isCrossReference && quality.referencedQuestionNumber) {
      const refNum = quality.referencedQuestionNumber;
      if (candidateSourcesByQNum[refNum]) {
        recoveredText = candidateSourcesByQNum[refNum];
        recoverySourceLabel = `Soru ${refNum}'deki kaynak metinden geri yüklendi`;
      }
    }

    // B.2: Birincil ortak metin uyumluysa oradan geri yükle
    if (!recoveredText && primaryCommonText) {
      // Metin içeriği ile soru kökü anahtar kelime uyumu kontrolü (Örn: "zeytin", "hasat", "ahşap", "karınca")
      const firstWord = qText.match(/(?:zeytin|hasat|ahşap|sandık|karınca|kuş|çınar|şerife|ahilik|tebessüm|kitap|boğaç|hoca)/i)?.[0];
      if (!firstWord || primaryCommonText.toLowerCase().includes(firstWord.toLowerCase())) {
        recoveredText = primaryCommonText;
        recoverySourceLabel = `Sınavın 1. sorusundaki ortak okuma metninden geri yüklendi`;
      }
    }

    // B.3: Dış havuzdan kazanım/anahtar kelime bazlı güvenilir geri getirme
    if (!recoveredText && sourceKnowledgePool) {
      const outcomeCode = (q as any).outcomeCode || (q as any).outcome;
      if (outcomeCode && sourceKnowledgePool[outcomeCode]) {
        recoveredText = sourceKnowledgePool[outcomeCode];
        recoverySourceLabel = `Kazanım (${outcomeCode}) resmi arşiv metninden geri yüklendi`;
      }
    }

    // Geri getirme başarılı olduysa:
    if (recoveredText) {
      recoveredCount++;
      const groupId = 'ortak_metin_1';
      if (!sharedGroupsMap[groupId]) {
        sharedGroupsMap[groupId] = {
          id: groupId,
          title: 'Ortak Okuma Metni',
          questionNumbers: [],
          text: recoveredText
        };
      }
      sharedGroupsMap[groupId].questionNumbers.push(qNum);

      questionStatuses[qNum] = {
        isValid: true,
        requirement: req,
        hasSource: true,
        isAbstractOrMetaSummary: false,
        isCrossReference: false,
        recovered: true,
        recoveredFrom: recoverySourceLabel
      };

      return {
        ...q,
        stimulus: recoveredText,
        commonStimulus: 'Bu soru ortak kaynak metnine dayanmaktadır.',
        sharedSourceId: groupId,
        hasMissingSourceError: false,
        sourceValidationError: undefined
      };
    }

    // Durum C: Kaynak materyal bulunamadı ve güvenilir biçimde kurtarılamadı!
    // KESİN KURAL: Sessizce metin uydurma, açık doğrulama hatası olarak işaretle!
    missingCount++;
    const errMsg = `Bu soru ${req.signalKeyword ? `"${req.signalKeyword}"` : req.type} gerektirmektedir ancak geçerli bir kaynak materyal bulunamamıştır.`;

    questionStatuses[qNum] = {
      isValid: false,
      requirement: req,
      hasSource: false,
      isAbstractOrMetaSummary: quality.isMetaSummary,
      isCrossReference: quality.isCrossReference,
      referencedQuestionNumber: quality.referencedQuestionNumber,
      recovered: false,
      errorMessage: errMsg
    };

    return {
      ...q,
      hasMissingSourceError: true,
      sourceValidationError: errMsg
    };
  });

  // 3. ADIM: Ortak metin grubundaki birincil kaynak soruları da grup kimliğiyle etiketle
  const finalEnrichedQuestions = enrichedQuestions.map((q, idx) => {
    const qNum = (q as any).questionNumber || (q as any).number || (idx + 1);
    for (const group of Object.values(sharedGroupsMap)) {
      if (
        group.questionNumbers.includes(qNum) || 
        (q.stimulus && q.stimulus.trim() === group.text.trim())
      ) {
        if (!group.questionNumbers.includes(qNum)) {
          group.questionNumbers.push(qNum);
          group.questionNumbers.sort((a, b) => a - b);
        }
        return {
          ...q,
          sharedSourceId: group.id,
          commonStimulus: (q as any).commonStimulus || 'Bu soru ortak kaynak metnine dayanmaktadır.'
        };
      }
    }
    return q;
  });

  const totalQuestions = safeList.length;
  const validQuestionsCount = totalQuestions - missingCount;

  return {
    enrichedQuestions: finalEnrichedQuestions,
    report: {
      totalQuestions,
      validQuestionsCount,
      missingSourceCount: missingCount,
      recoveredCount,
      isExamFullyValid: missingCount === 0,
      questionStatuses,
      sharedSourceGroups: Object.values(sharedGroupsMap)
    }
  };
}
