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

export interface SourceBindingResult {
  isValid: boolean;
  bindingType: 'self_contained' | 'explicit_shared_group' | 'valid_cross_reference' | 'orphan_reference' | 'missing_source';
  resolvedStimulus?: string;
  sourceOwnerQuestionNumber?: number;
  sharedGroupId?: string;
  reason?: string;
}

/**
 * Bir sorunun soru kökü ve uyarıcısında geçen alıntılanmış kelimeleri veya konu anahtarlarını
 * sınav içindeki aday kaynak metinlerle eşleştirir.
 */
export function findMatchingCandidateSource(
  questionText: string,
  stimulus: string,
  candidateSourcesByQNum: Record<number, string>
): { qNum: number; text: string } | null {
  const entries = Object.entries(candidateSourcesByQNum).map(([numStr, text]) => ({
    qNum: parseInt(numStr, 10),
    text
  }));
  if (entries.length === 0) return null;

  const combined = `${stimulus || ''} ${questionText || ''}`.toLowerCase();

  // 1. Tırnak içindeki anahtar sözcük/deyim kontrolü: örn. 'yadigâr', 'fedakârlık', 'bağımsızlık', 'gönül', 'zeytin'
  const quotedMatches = combined.match(/['"“]([^'"”]{3,})['"”]/g);
  if (quotedMatches && quotedMatches.length > 0) {
    for (const rawQuote of quotedMatches) {
      const cleanTerm = rawQuote.replace(/['"“”]/g, '').trim().toLowerCase();
      if (cleanTerm.length >= 3) {
        for (const entry of entries) {
          if (entry.text.toLowerCase().includes(cleanTerm)) {
            return entry;
          }
        }
      }
    }
  }

  // 2. Anlamsal alan anahtar kelime eşleşmesi: örn. zeytin, ahşap, sandık, kütüphane, kitap, türkü, kağnı
  const keywordMatches = combined.match(/(?:zeytin|hasat|ahşap|sandık|karınca|kuş|çınar|şerife|ahilik|tebessüm|kitap|kütüphane|elif|kutup|göbeklitepe|balina|türkü|kağnı|inebolu|boğaç)/i);
  if (keywordMatches) {
    const kw = keywordMatches[0].toLowerCase();
    for (const entry of entries) {
      if (entry.text.toLowerCase().includes(kw)) {
        return entry;
      }
    }
  }

  // 3. Gönderimsel (deictic) ifadeler: "bu metne", "okuduğunuz metin", "metnin ana fikri", "metne göre"
  const hasDeicticTextRef = /(?:bu\s+metn|okuduğunuz\s+metin|metnin\s+(?:ana\s+fik|konu|başlık|özet)|metne\s+göre)/i.test(combined);
  if (hasDeicticTextRef) {
    if (entries.length === 1) {
      return entries[0];
    }
    const q1Entry = entries.find(e => e.qNum === 1);
    if (q1Entry) {
      return q1Entry;
    }
  }

  return null;
}

/**
 * Bir kazanım kodunun okuma-anlama (stimulus/metin gerektiren) öğrenme alanına ait olup olmadığını tespit eder (TASK229).
 * MEB Standartları:
 * - T.O.* (Türkçe Okuma Öğrenme Alanı, örn: T.O.5.1, T.O.7.2)
 * - *.O.* (Genel Okuma modülleri)
 * - T.8.3.* veya T.{grade}.3.* (8. Sınıf Türkçe MEB programında 3 = Okuma öğrenme alanı)
 */
export function isReadingOutcomeCode(outcomeCode?: string): boolean {
  if (!outcomeCode || typeof outcomeCode !== 'string') return false;
  const upper = outcomeCode.toUpperCase().trim();
  if (upper.startsWith('T.O.') || upper.includes('.O.')) return true;
  if (/^T\.\d+\.3\./i.test(upper) || upper.startsWith('T.8.3.')) return true;
  return false;
}

/**
 * Soru kökü ile aday kaynak metin arasındaki anlamsal/tematik bağı doğrular (TASK229).
 * Bu sayede kardeş soruların birbirinden alakasız metinleri ödünç alması veya
 * farklı senaryolar arası yanlış metin eşleşmesi engellenir.
 */
export function checkSemanticConnectionToSource(stem: string, sourceText: string): boolean {
  if (!stem || !sourceText) return false;
  const stemNorm = stem.toLowerCase();
  const sourceNorm = sourceText.toLowerCase();

  // Genel okuma anlama yönergeleri (metnin ana fikri, konusu, başlığı, yazarı, kahramanı vb.)
  // doğrudan metne atıfta bulunur ve belirli bir kelime aramaksızın kaynak metinle anlamsal olarak bağlıdır.
  const generalComprehensionQueries = [
    'ana fikir', 'ana fikrini', 'ana düşünce', 'ana düşüncesini', 'konusu', 'konusunu',
    'başlık', 'başlığı', 'yazarın amacı', 'vurgulanan düşünce', 'metne göre',
    'metinden hareketle', 'çıkarılamaz', 'çıkarılabilir', 'paragrafta', 'bu metin',
    'metinde geçen', 'hangisi söylenemez', 'hangisine değinilmemiştir', 'metnin türü',
    'metnin', 'metne', 'metinde', 'metinden', 'parça', 'parçada', 'parçadan'
  ];
  if (generalComprehensionQueries.some(q => stemNorm.includes(q))) {
    return true;
  }

  // Soru kökündeki anlamlı kelimeleri (stop-words hariç, >=3 harf) çıkar ve kaynak metinde ara
  const stopWords = new Set([
    'hangi', 'hangisi', 'hangisidir', 'nedir', 'nelerdir', 'nasıl', 'neden', 'niçin',
    'göre', 'kadar', 'için', 'olan', 'olarak', 'buna', 'bunu', 'bunun', 'şöyle',
    'yazınız', 'belirtiniz', 'açıklayınız', 'bulunuz', 'ifade', 'ediniz', 'eder',
    'aşağıdaki', 'yukarıdaki', 'verilen', 'doğru', 'yanlış', 'soru', 'cevap', 'cevaplayınız',
    'cümle', 'cümleyle'
  ]);

  const words = stemNorm
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'«»“”]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 3 && !stopWords.has(w));

  if (words.length === 0) return true; // Eğer sadece genel kelimeler varsa izin ver

  // Doğrudan veya Türkçe kök/önek (en az 4 harf) eşleşmesi kontrolü (eklemeli dil morfolojisi)
  return words.some(w => {
    if (sourceNorm.includes(w)) return true;
    if (w.length >= 5) {
      const prefix = w.slice(0, 4);
      if (sourceNorm.includes(prefix)) return true;
    }
    return false;
  });
}

/**
 * Bir sorunun kaynak bağlamını ve çapraz referanslarını doğrular.
 * Çapraz referansların gerçekten mevcut bir kaynak soruya bağlanıp bağlanmadığını,
 * bağımsız (self-contained) soruları, ortak kaynak gruplarını ve yetim referansları belirler.
 */
export function verifyQuestionSourceBinding(
  question: {
    questionText?: string;
    question?: string;
    stimulus?: string;
    commonStimulus?: string;
    sharedSourceId?: string;
    referencedQuestionNumber?: number;
    questionNumber?: number;
    number?: number;
    outcomeCode?: string;
    templateType?: string;
    archetype?: string;
    contextText?: string;
    visual?: any;
  },
  siblingQuestions?: Array<{
    questionNumber?: number;
    number?: number;
    stimulus?: string;
    commonStimulus?: string;
    sharedSourceId?: string;
    questionText?: string;
    visual?: any;
  }>,
  sharedSourceGroups?: Array<{
    id: string;
    examId?: string;
    scenarioId?: string;
    title?: string;
    sourceText?: string;
    text?: string;
    questionNumbers?: number[];
    sourceType?: string;
  }>
): SourceBindingResult {
  const stem = (question.questionText || question.question || '').trim();
  const rawStim = (question.stimulus || '').trim();
  const commonStim = (question.commonStimulus || '').trim();
  const outcomeCode = question.outcomeCode;
  const isReadingOutcome = isReadingOutcomeCode(outcomeCode);
  const minRequiredLength = isReadingOutcome ? 80 : 40;
  const qNum = question.questionNumber || question.number;

  // 1. Doğrudan commonStimulus tanımlıysa ve geçerliyse
  if (commonStim && commonStim.length >= minRequiredLength) {
    const req = detectSourceRequirement(stem, question.templateType || question.archetype, question.contextText, commonStim);
    const quality = checkStimulusQuality(commonStim, req);
    if (quality.isValid && !quality.isCrossReference) {
      return {
        isValid: true,
        bindingType: question.sharedSourceId ? 'explicit_shared_group' : 'self_contained',
        resolvedStimulus: commonStim,
        sharedGroupId: question.sharedSourceId,
        sourceOwnerQuestionNumber: qNum
      };
    }
  }

  // 2. Açık Ortak Kaynak Grubu (SharedSourceGroup) Tanımı Kontrolü (TASK229)
  if (sharedSourceGroups && sharedSourceGroups.length > 0) {
    // 2.a: sharedSourceId eşleşmesi
    if (question.sharedSourceId) {
      const matchedGroup = sharedSourceGroups.find(g => g.id === question.sharedSourceId);
      const groupSource = (matchedGroup?.sourceText || matchedGroup?.text || '').trim();
      if (matchedGroup && groupSource.length >= minRequiredLength) {
        if (checkSemanticConnectionToSource(stem, groupSource)) {
          return {
            isValid: true,
            bindingType: 'explicit_shared_group',
            resolvedStimulus: groupSource,
            sharedGroupId: matchedGroup.id,
            sourceOwnerQuestionNumber: matchedGroup.questionNumbers?.[0] || qNum
          };
        }
      }
    }

    // 2.b: Soru numarasının grubun questionNumbers listesinde yer alması
    if (qNum !== undefined) {
      const containingGroup = sharedSourceGroups.find(g => Array.isArray(g.questionNumbers) && g.questionNumbers.includes(qNum));
      const groupSource = (containingGroup?.sourceText || containingGroup?.text || '').trim();
      if (containingGroup && groupSource.length >= minRequiredLength) {
        if (checkSemanticConnectionToSource(stem, groupSource)) {
          return {
            isValid: true,
            bindingType: 'explicit_shared_group',
            resolvedStimulus: groupSource,
            sharedGroupId: containingGroup.id,
            sourceOwnerQuestionNumber: containingGroup.questionNumbers?.[0] || qNum
          };
        }
      }
    }
  }

  // 3. Doğrudan veya metin içi çapraz referans kontrolü (Örn: "1. soruya göre", "1. sorudaki metne göre", "Soru 1'deki...")
  let refTargetNum: number | undefined = question.referencedQuestionNumber;
  if (!refTargetNum) {
    const crossRefMatch = (rawStim + ' ' + stem).match(/(?:(\d+)\.\s*soru(?:yu|ya|daki|da|nun)?|soru\s*(\d+)|önceki\s*soru)/i);
    if (crossRefMatch) {
      if (crossRefMatch[1]) {
        refTargetNum = parseInt(crossRefMatch[1], 10);
      } else if (crossRefMatch[2]) {
        refTargetNum = parseInt(crossRefMatch[2], 10);
      }
    }
  }

  // Eğer açık bir soru numarası referansı varsa kardeş sorularda ara
  if (refTargetNum !== undefined && siblingQuestions && siblingQuestions.length > 0) {
    const targetSibling = siblingQuestions.find(
      sq => (sq.questionNumber === refTargetNum || sq.number === refTargetNum)
    );
    if (targetSibling) {
      const targetStim = (targetSibling.stimulus || targetSibling.commonStimulus || '').trim();
      if (targetStim.length >= 40) {
        return {
          isValid: true,
          bindingType: 'valid_cross_reference',
          resolvedStimulus: targetStim,
          sourceOwnerQuestionNumber: refTargetNum,
          sharedGroupId: targetSibling.sharedSourceId || `shared_src_q${refTargetNum}`
        };
      }
    }
    // Hedef soru bulunamadı veya kaynak metni yok -> yetim referans
    return {
      isValid: false,
      bindingType: 'orphan_reference',
      sourceOwnerQuestionNumber: refTargetNum,
      reason: `Referans verilen ${refTargetNum}. soru bulunamadı veya geçerli bir kaynak metni yok.`
    };
  }

  // 4. Açık paylaşımlı grup (sharedSourceId) kontrolü (kardeş sorular üzerinden)
  if (question.sharedSourceId) {
    // Kardeş sorularda aynı gruba ait zengin bir metin var mı?
    if (siblingQuestions && siblingQuestions.length > 0) {
      const groupPeer = siblingQuestions.find(
        sq => sq.sharedSourceId === question.sharedSourceId && ((sq.stimulus || sq.commonStimulus || '') as string).trim().length >= 40
      );
      if (groupPeer) {
        const peerStim = (groupPeer.stimulus || groupPeer.commonStimulus || '').trim();
        return {
          isValid: true,
          bindingType: 'explicit_shared_group',
          resolvedStimulus: peerStim,
          sharedGroupId: question.sharedSourceId,
          sourceOwnerQuestionNumber: groupPeer.questionNumber || groupPeer.number
        };
      }
    }
    // Soru kendisi bu grubun kaynak sağlayıcısı ise
    if (rawStim.length >= minRequiredLength) {
      const req = detectSourceRequirement(stem, question.templateType || question.archetype, question.contextText, rawStim);
      const quality = checkStimulusQuality(rawStim, req);
      if (quality.isValid && !quality.isCrossReference) {
        return {
          isValid: true,
          bindingType: 'explicit_shared_group',
          resolvedStimulus: rawStim,
          sharedGroupId: question.sharedSourceId,
          sourceOwnerQuestionNumber: question.questionNumber || question.number
        };
      }
    }
  }

  // 5. Sorunun kendi bünyesinde geçerli, bağımsız bir kaynak metni var mı?
  if (rawStim.length >= minRequiredLength) {
    const req = detectSourceRequirement(stem, question.templateType || question.archetype, question.contextText, rawStim);
    const quality = checkStimulusQuality(rawStim, req);
    if (quality.isValid && !quality.isCrossReference) {
      return {
        isValid: true,
        bindingType: 'self_contained',
        resolvedStimulus: rawStim
      };
    }
  }

  // 6. Kardeş sorularda doğrulanabilir tematik veya metinsel eşleşme kontrolü
  if (siblingQuestions && siblingQuestions.length > 0) {
    const candidateSourcesByQNum: Record<number, string> = {};
    siblingQuestions.forEach((sq, sIdx) => {
      const sqNum = sq.questionNumber || sq.number || sIdx + 1;
      // Bir soru açık bir referansı (cross-ref) veya ortak kaynak grubu (sharedSourceGroup) olmaksızın
      // kendisinden sonraki bir sorudan (sqNum > qNum) örtük olarak kaynak ödünç alamaz.
      // Yalnızca önceki sorulardan (örn. Soru 1'deki metin) metin çözümlenebilir.
      if (qNum !== undefined && sqNum > qNum) {
        return;
      }
      const stim = (sq.stimulus || sq.commonStimulus || '').trim();
      if (stim.length >= 80 && !stim.startsWith('Metinde') && !stim.startsWith('Yukarıda')) {
        candidateSourcesByQNum[sqNum] = stim;
      }
    });

    const match = findMatchingCandidateSource(stem, rawStim, candidateSourcesByQNum);
    if (match && checkSemanticConnectionToSource(stem, match.text)) {
      return {
        isValid: true,
        bindingType: 'valid_cross_reference',
        resolvedStimulus: match.text,
        sourceOwnerQuestionNumber: match.qNum,
        sharedGroupId: `shared_src_q${match.qNum}`
      };
    }
  }

  // 7. Kaynak ihtiyacı ve yetim/eksik kaynak tespiti
  const sourceReq = detectSourceRequirement(stem, question.templateType || question.archetype, question.contextText, rawStim);
  const isSelfContained = isSemanticallySelfContainedQuestion(stem, rawStim, outcomeCode, question.commonStimulus, false);

  if (sourceReq.requiresSource || !isSelfContained) {
    // Metin atfı veya deictic gönderim olup hedefi olmayan sorular -> orphan_reference
    const hasOrphanReference = /(?:(?:bu|o|verilen|yukarıdaki)\s+met(?:in|ne|den|ni|inde|inle)|metn(?:e|in|den|de)|metin(?:de|den|i|e)?|parça(?:ya|dan|da|nın)?|paragraf(?:tan|ta|ın)?|şiir(?:e|den|de|in)?|dizeler(?:den|e|in)?|bu\s+parça)/i.test(stem + ' ' + rawStim);
    if (hasOrphanReference) {
      return {
        isValid: false,
        bindingType: 'orphan_reference',
        reason: 'Soru metne/şiire atıfta bulunmaktadır ancak geçerli bir kaynak metin veya referans soru bulunamamıştır.'
      };
    }
    return {
      isValid: false,
      bindingType: 'missing_source',
      reason: `Bu soru ${sourceReq.signalKeyword ? `"${sourceReq.signalKeyword}"` : sourceReq.type} gerektirmektedir ancak geçerli bir kaynak materyal bulunamamıştır.`
    };
  }

  // 8. Kaynak gerektirmeyen bağımsız soru
  return {
    isValid: true,
    bindingType: 'self_contained',
    resolvedStimulus: rawStim || undefined
  };
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
    { pattern: /(?:bu|o|okuduğunuz|verilen|yukarıdaki)\s+met(?:in|ne|den|ni|inde)/i, label: 'bu / verilen metin' },
    { pattern: /(?:metnin|paragrafın|parçanın|şiirin)\s+(?:konusunu|ana\s+fikrini|ana\s+düşüncesini|başlığını|türünü|özetini|mesajını|temel\s+mesajını|anahtar\s+kelimelerini)/i, label: 'metnin konusu / ana fikri / mesajı' },
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

  // 2. Yetersiz Soyut Meta-Özet veya Doğrudan Soru Cümlesi Kontrolü
  // Örnek: "Metne göre: Dede Korkut bu gence neden 'Boğaç Han' adını vermiştir?" (Soru kökünün stimulus alanına yazılması)
  // Örnek: "Metinde zeytinin toplanıp yağa dönüştürülmesine kadar belirli bir sıra anlatılmıştır." (Meta-özet)
  // Örnek: "Metne göre mimarlar kuş evlerini yapıların rastgele bir yerine değil..." (Tek cümlelik direktif)
  if (requirement.type === 'reading_text') {
    // 2.a: Soru kökünün stimulus alanına yazılması veya soru cümlesi olması durumu
    if (trimmed.endsWith('?') || /^(?:soru\s*:?|metne\s+göre\s*:?)\s*.*(?:\?|neden|niçin|nasıl)/i.test(trimmed)) {
      return {
        isValid: false,
        isMetaSummary: true,
        isCrossReference: false
      };
    }

    // 2.b: Soyut Meta-Özet veya Direktif Cümlesi Kontrolü
    const metaSummaryPatterns = [
      /^(?:metinde|parçada|şiirde|bu\s+metinde)\s+/i,
      /^(?:metne|parçaya|şiire|yukarıdaki\s+metne|metinden|parçadan)\s+(?:göre|hareketle|dayanarak|dayalı)/i,
      /^metin\s+.*etrafında\s+şekillenmiştir/i,
      /^okuduğunuz\s+metin\s+/i
    ];

    const isMeta = metaSummaryPatterns.some(p => p.test(trimmed)) && trimmed.length < 180;
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
 * Metin gerektiren fakat stimulus alanında gerçek bir okuma metni bulunmayan
 * (veya metni kurtarılamayan) soruların soru kökünü temizler; metne atıf yapmayan,
 * kendi başına cevaplanabilir bağımsız bir forma dönüştürür.
 */
export function sanitizeTextReferencesIfNoStimulus(stem: string, stimulus: string | undefined | null): string {
  const stemTrimmed = (stem || '').trim();
  const stimTrimmed = (stimulus || '').trim();
  const req = detectSourceRequirement(stemTrimmed, undefined, undefined, stimTrimmed);
  if (!req.requiresSource || req.type !== 'reading_text') {
    return stemTrimmed;
  }
  const quality = checkStimulusQuality(stimTrimmed, req);
  if (quality.isValid && stimTrimmed.length >= 80) {
    return stemTrimmed;
  }

  // Metin yok veya yetersiz: Soru kökünü metne atıf yapmayan, kendi başına cevaplanabilir forma dönüştür
  let cleaned = stemTrimmed
    .replace(/^(?:yukarıdaki\s+metne|metne|parçaya|şiire|metinden|parçadan)\s+(?:göre|hareketle|dayanarak|dayalı)\s*:\s*/i, '')
    .replace(/(?:yukarıdaki\s+metne|metne|parçaya|şiire|metinden|parçadan)\s+(?:göre|hareketle|dayanarak|dayalı)\s*,?\s*/gi, '')
    .replace(/metindeki\s+olay\s+örgüsünden\s+hareketle\s*/gi, '')
    .replace(/metindeki\s+/gi, 'durumdaki ')
    .replace(/parçadaki\s+/gi, 'durumdaki ')
    .replace(/yukarıdaki\s+metnin\s+/gi, 'bu konunun ')
    .replace(/bu\s+metne\s+/gi, 'bu konuya ')
    .trim();

  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }
  return cleaned;
}

/**
 * Bir sorunun (özellikle okuma metni veya kaynak gerektiren bir kurguda)
 * metin olmaksızın kendi başına öğrenciler tarafından anlamsal olarak
 * cevaplanabilir olup olmadığını denetler.
 *
 * - Eğer geçerli ve yeterli uzunlukta bir stimulus varsa soru kendi metniyle bağımsızdır (true).
 * - Eğer stimulus eksik/geçersizse:
 *   - Metne, olay örgüsüne, yazar/şair niyetine doğrudan atıf yapan sorular,
 *   - "bu gence", "bu karara", "bu duruma" gibi metin dışı gönderimsel (deictic) ifadeler içeren sorular,
 *   - Olay örgüsüne dayalı kurgusal eylemler (örn. "neden Boğaç Han adını vermiştir"),
 *   - Okuma anlama kazanımlarına (T.O.*) ait olup bünyesinde yeterli bağlam barındırmayan sorular
 *   ASLA kendi başına bağımsız kabul edilmez (false).
 */
export function isSemanticallySelfContainedQuestion(
  questionText: string,
  stimulus?: string | null,
  outcomeCode?: string,
  commonStimulus?: string | null,
  _hasExamContextText?: boolean
): boolean {
  const stimTrimmed = ((stimulus || '') + (commonStimulus ? ` ${commonStimulus}` : '')).trim();
  const stemTrimmed = (questionText || '').trim();

  if (!stemTrimmed || stemTrimmed.length < 5) {
    return false;
  }

  // 1. Eğer geçerli bir uyarıcı metin (stimulus) varsa ve meta-özet değilse
  if (stimTrimmed.length >= 40) {
    const req = detectSourceRequirement(stemTrimmed, undefined, undefined, stimTrimmed);
    const quality = checkStimulusQuality(stimTrimmed, req);
    if (quality.isValid && !quality.isCrossReference) {
      // Okuma anlama kazanımlarında (T.O.*, T.8.3.* vb.) zengin okuma metni en az 80 karakter olmalıdır.
      // Dil bilgisi, yazma veya örnek cümle içeren sorularda (T.Y.*, T.D.* vb.) 40+ karakterlik örnek cümle tam geçerlidir.
      const isReadingOutcome = isReadingOutcomeCode(outcomeCode);
      if (isReadingOutcome && stimTrimmed.length < 80) {
        // Okuma anlama metni için 80 karakter altı yetersiz sayılır
      } else {
        return true;
      }
    }
  }

  // 2. Uyarıcı metin yok veya yetersiz: Soru kökünün tek başına cevaplanabilirliğini incele

  // 2.a: Doğrudan metin/şiir/parça atıfları (temizlenmemiş veya kalan)
  const explicitTextRefPattern = /(?:metn[ie]|metinden|metne|metindeki|paragraftan|paragrafta|paragrafa|parçadan|parçada|parçaya|şiirden|şiirde|şiire|dizelerden)\s+(?:[a-zA-ZçÇğĞıİöÖşŞüÜ\s]{0,20}\s+)?(?:hareketle|göre|dayanarak|dayalı|çıkarı|anlatılan|bahsedilen)/i;
  if (explicitTextRefPattern.test(stemTrimmed)) {
    return false;
  }

  // Metin olmaksızın cevaplanamayacak ana fikir / ana düşünce / mesaj sorguları
  const metaElementPattern = /(?:(?:metnin|paragrafın|parçanın|şiirin)\s+)?(?:konusunu|ana\s+fikrini|ana\s+fikr[ie]|ana\s+düşüncesini|ana\s+düşünce(?:yi|si|sini)?|başlığını|türünü|özetini|mesajını|temel\s+mesaj(?:ını|ı)?|anahtar\s+kelimelerini)/i;
  if (metaElementPattern.test(stemTrimmed)) {
    return false;
  }

  // 2.b: Metin dışı gönderimsel (deictic / anaphoric) ifadeler:
  // "bu gence", "gence", "bu ismin", "bu karara", "bu davranışa", "bu duruma", "kahramanın", "yazarın savunduğu", "bu sözlerle", "bu metinde"
  const deicticNarrativePattern = /\b(?:(?:bu|o)\s+(?:ismin|ismin[ie]|adın|gence|adam[a|ın]|kadın[a|ın]|çocuğ[a|un]|kişi[ye|nin]|kahraman[a|ın]|karakter[e|in]|yazar[a|ın]|olay[a|ın]|durum[a|un]|karar[a|ın]|davranış[a|ın]|tutum[a|un]|söz(?:ü|leri|lerin)|metinde|parçada)|gence|kahramanın|anlatıcının)\b/i;
  if (deicticNarrativePattern.test(stemTrimmed)) {
    return false;
  }

  // 2.c: Olay örgüsü ve kurgusal yazar / karakter motivasyonu sorguları (metin olmaksızın bilinemez)
  const narrativeQueryPattern = /(?:olay\s+örgüsü|anlatıcının\s+bakış|yazarın\s+(?:amacı|savunduğu|vurguladığı|anlatmak\s+istediği|vermek\s+istediği))/i;
  if (narrativeQueryPattern.test(stemTrimmed)) {
    return false;
  }

  const literaryEventPattern = /(?:neden|niçin|nasıl|hangi\s+sebeple)\s+.*(?:adını\s+ver|adını\s+al|karar\s+ver|yola\s+çık|tepki\s+göster|kurtul|yardım\s+et)/i;
  if (literaryEventPattern.test(stemTrimmed)) {
    // Soru kökünde olayın tam bir bağlamı yoksa (stem < 100 karakter)
    if (stemTrimmed.length < 100) {
      return false;
    }
  }

  // Belirli edebî/tarihî kurgusal isimlerin metinsiz sorgusu (Boğaç Han, Dede Korkut vb.)
  if (/(?:Boğaç\s+Han|Dede\s+Korkut|Kuş\s+Köşkleri)/i.test(stemTrimmed)) {
    return false;
  }

  return true;
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
  hasMissingStemError?: boolean;
  stemValidationError?: string;
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
    if (stim.length >= 80 && !stim.startsWith('Metinde') && !stim.startsWith('Yukarıda')) {
      candidateSourcesByQNum[qNum] = stim;
    }
  });

  // 2. ADIM: Her soruyu doğrula ve gerekirse onar / zenginleştir
  const enrichedQuestions = safeList.map((q, idx) => {
    const qNum = (q as any).questionNumber || (q as any).number || (idx + 1);
    const rawStem = (q as any).questionText || (q as any).question || '';
    const stemTrimmed = typeof rawStem === 'string' ? rawStem.trim() : '';
    const hasMissingStem = stemTrimmed.length === 0;
    const qText = stemTrimmed;
    const stim = q.stimulus || '';
    const ctx = q.contextText || '';
    const arch = (q as any).archetype || (q as any).templateType || '';

    const stemErrorProps = hasMissingStem ? {
      hasMissingStemError: true,
      stemValidationError: 'Bu sorunun öğrenci tarafından cevaplanması gereken soru kökü eksik veya boş.'
    } : {
      hasMissingStemError: false,
      stemValidationError: undefined
    };

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
        ...stemErrorProps,
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
        ...stemErrorProps,
        hasMissingSourceError: false,
        sourceValidationError: undefined
      };
    }

    // Durum B: Kaynak eksik, meta-özet veya önceki soruya referans -> GÜVENİLİR BİÇİMDE GERİ YÜKLE
    let recoveredText = '';
    let recoverySourceLabel = '';
    let assignedGroupId = '';

    // B.1: Çapraz referans varsa belirtilen sorudan geri yükle (Örn: Soru 1'deki ahşap sandık metni)
    let targetRefNum = quality.isCrossReference ? quality.referencedQuestionNumber : undefined;
    if (!targetRefNum) {
      // Soru metni içinde açık soru numarası referansı tespiti
      const match = (stim + ' ' + qText).match(/(?:(\d+)\.\s*soru(?:yu|ya|daki|da|nun)?|soru\s*(\d+))/i);
      if (match) {
        targetRefNum = parseInt(match[1] || match[2], 10);
      }
    }

    if (targetRefNum && candidateSourcesByQNum[targetRefNum]) {
      recoveredText = candidateSourcesByQNum[targetRefNum];
      recoverySourceLabel = `Soru ${targetRefNum}'deki kaynak metinden geri yüklendi`;
      assignedGroupId = `shared_src_q${targetRefNum}`;
    }

    // B.2: Açık paylaşımlı grup ID'si varsa ve grupta metin kayıtlıysa
    if (!recoveredText && (q as any).sharedSourceId) {
      const gId = (q as any).sharedSourceId;
      if (sharedGroupsMap[gId]?.text) {
        recoveredText = sharedGroupsMap[gId].text;
        recoverySourceLabel = `Ortak kaynak grubundan (${gId}) geri yüklendi`;
        assignedGroupId = gId;
      }
    }

    // B.3: Kardeş kaynaklarda doğrulanabilir alıntı veya konu eşleşmesi tespiti
    if (!recoveredText) {
      const matchedSource = findMatchingCandidateSource(qText, stim, candidateSourcesByQNum);
      if (matchedSource) {
        recoveredText = matchedSource.text;
        recoverySourceLabel = `Sınavın ${matchedSource.qNum}. sorusundaki doğrulanmış kaynak metinden bağlandı`;
        assignedGroupId = `shared_src_q${matchedSource.qNum}`;
        targetRefNum = matchedSource.qNum;
      }
    }

    // B.4: Dış havuzdan kazanım bazlı güvenilir geri getirme
    if (!recoveredText && sourceKnowledgePool) {
      const outcomeCode = (q as any).outcomeCode || (q as any).outcome;
      if (outcomeCode && sourceKnowledgePool[outcomeCode]) {
        recoveredText = sourceKnowledgePool[outcomeCode];
        recoverySourceLabel = `Kazanım (${outcomeCode}) resmi arşiv metninden geri yüklendi`;
        assignedGroupId = `shared_src_pool_${outcomeCode}`;
      }
    }

    // Geri getirme başarılı olduysa:
    if (recoveredText) {
      recoveredCount++;
      const groupId = assignedGroupId || (targetRefNum ? `shared_src_q${targetRefNum}` : `shared_src_q${qNum}`);
      if (!sharedGroupsMap[groupId]) {
        sharedGroupsMap[groupId] = {
          id: groupId,
          title: 'Ortak Okuma Metni',
          questionNumbers: [],
          text: recoveredText
        };
      }
      if (!sharedGroupsMap[groupId].questionNumbers.includes(qNum)) {
        sharedGroupsMap[groupId].questionNumbers.push(qNum);
      }
      if (targetRefNum && !sharedGroupsMap[groupId].questionNumbers.includes(targetRefNum)) {
        sharedGroupsMap[groupId].questionNumbers.push(targetRefNum);
        sharedGroupsMap[groupId].questionNumbers.sort((a, b) => a - b);
      }

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
        ...stemErrorProps,
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
      ...stemErrorProps,
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
