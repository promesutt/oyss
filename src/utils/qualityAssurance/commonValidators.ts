import { QualityFinding, QuestionValidationContext } from './types';
import { 
  isSemanticallySelfContainedQuestion, 
  detectSourceRequirement, 
  checkStimulusQuality,
  verifyQuestionSourceBinding
} from '../sourceMaterialValidator';
import { resolveOutcomeMetadata } from '../../data/curriculumData';

/**
 * Bir sorunun "Hata Tespiti", "Adım Analizi" veya "Kavram Yanılgısı" türünde
 * kasıtlı olarak kurgulanmış bir yanlış bilgi arayışı içerip içermediğini denetler.
 * (TASK198)
 */
export function isIntentionalErrorDetectionQuestion(q: any): boolean {
  if (!q) return false;
  const archetype = String(q.archetype || q.templateType || '').toLowerCase();
  const stem = String(q.questionText || q.question || '').toLowerCase();

  // 1. Archetype / Template türü kontrolü
  const isErrorArchetype = /(?:hata\s*tespiti|adım\s*analizi|yanılgı|öğrenci\s*diyaloğu|öğrenci\s*tartışması|kavram\s*yanılgısı|hata\s*ve\s*düzeltme)/i.test(archetype);

  // 2. Soru kökünde kasıtlı yanlış bilgi / hata arayışı yönergesi kontrolü
  const hasErrorKeywords = /(?:hata|yanlış|yanılgı|çelişki|hatalı|doğru\s+olmadığı|eksiklik|kusur)/i.test(stem);
  const hasDetectionDirectives = /(?:tespit|bulunuz|bulun|belirleyiniz|belirleyin|belirtiniz|belirtin|düzeltiniz|düzeltin|açıklayınız|açıklayın|hangi\s+adım|neden\s+yanlış|hangisi\s+yanlış|doğrusunu\s+yaz|düzeltilmiş)/i.test(stem);
  const stemAsksForErrorDetection = hasErrorKeywords && hasDetectionDirectives;

  if (isErrorArchetype && stemAsksForErrorDetection) return true;
  if (stemAsksForErrorDetection) return true;
  if (isErrorArchetype && /(?:hangi\s+adım|ilk\s+hata|kaçıncı\s+adım)/i.test(stem)) return true;

  return false;
}

/**
 * Bir soru içerisindeki belirli bir kural / kavram alanının, soruda hedeflenen
 * kasıtlı yanlış bilgi olup olmadığını denetler. (TASK205)
 *
 * Bir senaryo hatasının tolere edilebilmesi için:
 * 1. Soru genel olarak bir "Hata Tespiti & Adım Analizi" veya "Kavram Yanılgısı" sorusu olmalıdır.
 * 2. İlgili kuralın hedef kavramı, model cevap veya rubrikte MUTLAKA ele alınmış ve çözülmüş olmalıdır.
 * 3. Soru kökü açıkça BAŞKA bir konudaki hatayı hedefleyerek bu kuralın konusunu dışlamış olmamalıdır.
 */
export function isTargetedIntentionalError(
  q: any,
  ruleTopicKeywords: string[],
  options?: {
    customAnswerCheck?: (answerOnlyText: string) => boolean;
    customStemCheck?: (stemOnlyText: string) => boolean;
  }
): boolean {
  if (!isIntentionalErrorDetectionQuestion(q)) return false;

  const stem = String(q.questionText || q.question || '').toLowerCase();
  const answer = String(q.modelAnswer || q.answer || '').toLowerCase();
  const solution = String(q.solutionExplanation || q.solution || '').toLowerCase();
  const rubricText = Array.isArray(q.rubric)
    ? q.rubric.map((r: any) => `${r.criterion || ''} ${r.item || ''} ${r.description || ''}`).join(' ').toLowerCase()
    : '';
  const altText = Array.isArray(q.alternativeAnswers) ? q.alternativeAnswers.join(' ').toLowerCase() : '';
  const answerOnlyText = `${answer} ${solution} ${rubricText} ${altText}`;

  // 1. Model cevap ve rubrik kontrolü:
  // Model cevap ve rubrikte bu kuralın anahtar kavramı ele alınmıyorsa,
  // bu hata soruda öğrencinin çözmesi hedeflenen hata DEĞİLDİR (bağımsız / kontrolsüz bir hatadır).
  let isAddressedInAnswer = false;
  if (options?.customAnswerCheck) {
    isAddressedInAnswer = options.customAnswerCheck(answerOnlyText);
  } else {
    isAddressedInAnswer = ruleTopicKeywords.some(kw => answerOnlyText.includes(kw.toLowerCase()));
  }

  if (!isAddressedInAnswer) return false;

  // 2. Soru kökü sınırlama kontrolü:
  // Eğer soru kökü başka bir konudaki hatayı açıkça spesifik olarak hedeflemişse
  // (Örn: "...kütle ölçümü ile ilgili hatayı tespit ediniz..."),
  // soru kökünde tesadüfen arka plan olarak adı geçen diğer kavramlar (örn. safra) muaf tutulamaz.
  if (options?.customStemCheck) {
    if (!options.customStemCheck(stem)) return false;
  } else {
    // Soru kökünde spesifik hata yönergesi kalıbı: "[alan/kavram] ile ilgili/hakkındaki/konusundaki yapılan hata"
    const specificErrorTargetMatch = stem.match(/([a-zçğıöşü\s]{3,30})\s+(?:ile\s+ilgili|hakkındaki|konusundaki)\s+(?:yapılan|yaptığı|verilen)?\s*(?:bilimsel\s+)?(?:hata|yanlış|yanılgı)/i);
    if (specificErrorTargetMatch) {
      const targetedDomain = specificErrorTargetMatch[1].trim().toLowerCase();
      // Eğer bu spesifik hedeflenen alan bizim kuralımızın anahtar kelimelerinden hiçbirini içermiyorsa:
      const matchesRule = ruleTopicKeywords.some(kw => targetedDomain.includes(kw.toLowerCase()) || kw.toLowerCase().includes(targetedDomain));
      if (!matchesRule) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Görsel nesnesinin (q.visual) yapısal ve parametrik geçerliliğini doğrular (TASK228).
 */
export function isValidVisualPayload(visual: any): boolean {
  if (!visual || typeof visual !== 'object' || Array.isArray(visual)) {
    return false;
  }
  const keys = Object.keys(visual);
  if (keys.length === 0) return false;

  // Bilinen matematik/geometri türlerinde parametre kontrolü
  if (visual.type) {
    const mathTypes = ['geometry_shape', 'number_line', 'fraction_model'];
    if (mathTypes.includes(visual.type)) {
      if (!visual.params || typeof visual.params !== 'object' || Array.isArray(visual.params) || Object.keys(visual.params).length === 0) {
        return false;
      }
    }
    return true;
  }

  // Genel SVG, diagram, tablo veya görsel verileri
  if (visual.svg || visual.data || visual.params || visual.url || visual.src || visual.content || visual.diagram || visual.elements) {
    return true;
  }

  return false;
}

/**
 * Metin içerisinde açıkça yapılandırılmış veri tablosu veya sayısal veri listesi olup olmadığını tespit eder (TASK228 & TASK228-FIX).
 */
export function hasStructuredTableOrDataSet(text: string): boolean {
  if (!text || typeof text !== 'string') return false;
  const trimmed = text.trim();
  if (!trimmed) return false;

  // 1. Markdown tablo formatı (| ... | ve |---|---| veya en az 4 pipe karakteri)
  if (trimmed.includes('|') && /\|[^\n]+\|\n\s*\|[-:\s|]+\|/m.test(trimmed)) {
    return true;
  }
  const pipeCount = (trimmed.match(/\|/g) || []).length;
  if (pipeCount >= 4) {
    return true;
  }

  const lines = trimmed.split('\n').map(l => l.trim()).filter(Boolean);

  // 2. Etiket + iki nokta üst üste / eşittir + sayısal veri dizisi içeren satırlar (TASK228-FIX B-02)
  // Örn: "Zaman (s): 1, 2, 3, 4", "Yol (m): 6, 12, 18, 24", "Sürat (m/s): 5, 10, 15", "Kuvvet (N): 2, 4, 6"
  // Etiket açıklama cümlesi değil veri başlığı olmalı (<= 35 karakter) ve en az 2 virgül/noktalı virgül/tab ile ayrılmış sayı içermelidir
  const numericSeriesLinePattern = /^[a-zA-ZçÇğĞıİöÖşŞüÜ0-9\s°\/%()^³²_\-]{1,35}\s*[:=]\s*[-+]?\d+(?:[.,]\d+)?(?:\s*[,;\t]\s*[-+]?\d+(?:[.,]\d+)?)+/;
  if (lines.some(l => numericSeriesLinePattern.test(l))) {
    return true;
  }

  // 3. Çok satırlı yapılandırılmış veri listeleri (en az 2 satır eşleşmesi)
  // Gün / Yıl / Bölge / Grup / Fiziksel nicelik değer eşleşmeleri: "Pazartesi: 15", "Kütle: 50"
  const dataRowPattern = /(?:pazartesi|salı|çarşamba|perşembe|cuma|cumartesi|pazar|\b\d{4}\b|bölge\s+[a-z0-9]|grup\s+[a-z0-9]|durum\s+[a-z0-9]|örnek\s+[a-z0-9]|aşama\s+[a-z0-9]|zaman|yol|sürat|hız|kuvvet|kütle|ağırlık|hacim|yoğunluk|sıcaklık|basınç)\s*[:|-]\s*[-+]?\d+/i;
  const matchCount = lines.filter(l => dataRowPattern.test(l)).length;
  if (matchCount >= 2) {
    return true;
  }

  return false;
}

/**
 * Model cevabın gerçek bir çözüm/yanıt yerine değerlendirme yönergesi,
 * öğretmen talimatı veya öğrenci beklenti ifadesi (meta-cevap) olup olmadığını denetler (TASK228).
 */
export function isMetaInstructionAnswer(ans: string): boolean {
  if (!ans || typeof ans !== 'string') return false;
  const clean = ans.trim();
  if (clean.length < 5) return false;

  // 1. Öğrenci veya adayın yapması beklenen/istenen davranışları tarif eden doğrudan kalıplar
  // Örn: 'Öğrencinin doğru cevabı açıklaması beklenir.', 'Öğrenciden nedenini belirtmesi istenir.'
  const studentDirectivePattern = /(?:öğrencinin|öğrenciden|öğrencilerin|adayın|öğrenci)\s+[^\.\n]*?(?:açıklaması|belirtmesi|yazması|bulması|hesaplaması|göstermesi|kurması|sunması|yapması|aktarması|ifade\s+etmesi|çizmesi|kullanması|yorumlaması|ilişkilendirmesi|teşhis\s+etmesi|çözümlemesi|değerlendirmesi|cevaplaması|yanıtlaması|delillendirmesi|gerekçelendirmesi|somutlaştırması|ortaya\s+koyması)\s+(?:beklenir|beklenmektedir|gerekir|gerekmektedir|istenir|istenmektedir|hedeflenir)/i;
  if (studentDirectivePattern.test(clean)) return true;

  // 2. Doğrudan fiilimsi + beklenir/gerekir kalıbı (Cevap sadece değerlendirme talimatı olarak kurgulanmışsa)
  // Örn: 'Doğru uygulaması beklenmektedir.', 'İlişki kurması beklenir.', 'Kavramları kullanması gerekir.'
  const actionExpectationPattern = /^(?:doğru|eksiksiz|uygun|kurallı|başarılı)?\s*[a-zA-ZçÇğĞıİöÖşŞüÜ0-9\s,\/\(\)-]*?(?:uygulaması|yapması|çözmesi|açıklaması|belirtmesi|yazması|göstermesi|kurması|sunması|kullanması|ifade\s+etmesi|delillendirmesi|gerekçelendirmesi)\s+(?:beklenir|beklenmektedir|gerekir|gerekmektedir|istenir|istenmektedir)\.?$/i;
  if (actionExpectationPattern.test(clean)) return true;

  // 3. Konuya ilişkin bilgilerini kullanarak açıklaması gerekir / beklenir kalıpları
  const topicInstructionPattern = /(?:konuya|kavrama|kazanıma|içeriğe)\s+ilişkin\s+bilgilerini\s+kullanarak\s+[^\.\n]*?(?:açıklaması|belirtmesi|yanıtlaması|cevaplaması|gerekçelendirmesi)\s+(?:gerekir|gerekmektedir|beklenir|beklenmektedir)/i;
  if (topicInstructionPattern.test(clean)) return true;

  // 4. Öğrencinin ... gerekir kalıbı
  const studentMustPattern = /(?:öğrencinin|öğrencilerin)\s+[^\.\n]*?(?:kullanması|kurması|bilmesi|fark\s+etmesi|gözetmesi)\s+(?:gerekir|gerekmektedir)/i;
  if (studentMustPattern.test(clean)) return true;

  return false;
}

/**
 * Ortak Kalite Denetim Katmanı (Tüm Branşlar ve Tüm Sınıf Seviyeleri İçin)
 */
export function runCommonQualityChecks(
  q: any,
  context: QuestionValidationContext
): QualityFinding[] {
  const findings: QualityFinding[] = [];
  const stem = (q.questionText || q.question || '').trim();
  const stimulus = (q.stimulus || q.contextText || '').trim();
  const answer = (q.modelAnswer || q.answer || '').trim();
  const outcomeCode = (q.outcomeCode || q.outcome || '').trim();
  const points = q.points || context.targetPoints || 10;
  const rubric = Array.isArray(q.rubric) ? q.rubric : [];
  const altAnswers = Array.isArray(q.alternativeAnswers) ? q.alternativeAnswers : [];

  // ==========================================
  // A. KAZANIM UYUMU
  // ==========================================
  if (!outcomeCode) {
    findings.push({
      category: 'outcome_alignment',
      severity: 'critical',
      field: 'outcome',
      message: 'Soruya atanmış resmî bir kazanım kodu bulunmamaktadır.',
      suggestedFix: 'Sorunun ilgili senaryo dağılımındaki kazanım kodunu ekleyiniz.',
      validationMethod: 'outcome_code_presence'
    });
  } else {
    // 1. Resmî MEB Müfredat Doğrulaması
    const outcomeMeta = resolveOutcomeMetadata(outcomeCode);
    if (!outcomeMeta.hasOfficialTitle && !outcomeMeta.topicNote) {
      findings.push({
        category: 'outcome_alignment',
        severity: 'warning',
        field: 'outcome',
        message: `Kazanım kodu ("${outcomeCode}") MEB resmî öğretim programı veritabanında doğrulanamadı.`,
        suggestedFix: 'Kazanım kodunun resmî MEB biçiminde (örn: FB.7.3.1, MAT.6.2.2) olduğunu kontrol ediniz.',
        validationMethod: 'outcome_code_registry_check'
      });
    }

    // 2. Branş Öneki Uyumu (Dersler arası kazanım kayması tespiti)
    const normSub = (context.subjectId || context.subject || '').toLowerCase();
    const codeUpper = outcomeCode.toUpperCase();
    if (normSub.includes('mat') && (codeUpper.startsWith('FB.') || codeUpper.startsWith('T.') || codeUpper.startsWith('SB.') || codeUpper.startsWith('DK.'))) {
      findings.push({
        category: 'outcome_alignment',
        severity: 'critical',
        field: 'outcome',
        message: `Matematik sınavında başka bir derse ait (${outcomeCode}) kazanım kodu tespit edildi.`,
        suggestedFix: 'Kazanım kodunu Matematik dersi kazanımlarıyla (MAT.) güncelleyiniz.',
        validationMethod: 'outcome_subject_prefix_alignment'
      });
    } else if (normSub.includes('fen') && (codeUpper.startsWith('MAT.') || codeUpper.startsWith('T.') || codeUpper.startsWith('SB.') || codeUpper.startsWith('DK.'))) {
      findings.push({
        category: 'outcome_alignment',
        severity: 'critical',
        field: 'outcome',
        message: `Fen Bilimleri sınavında başka bir derse ait (${outcomeCode}) kazanım kodu tespit edildi.`,
        suggestedFix: 'Kazanım kodunu Fen Bilimleri dersi kazanımlarıyla (FB.) güncelleyiniz.',
        validationMethod: 'outcome_subject_prefix_alignment'
      });
    } else if (normSub.includes('turk') && (codeUpper.startsWith('MAT.') || codeUpper.startsWith('FB.') || codeUpper.startsWith('DK.'))) {
      findings.push({
        category: 'outcome_alignment',
        severity: 'critical',
        field: 'outcome',
        message: `Türkçe sınavında başka bir derse ait (${outcomeCode}) kazanım kodu tespit edildi.`,
        suggestedFix: 'Kazanım kodunu Türkçe dersi kazanımlarıyla (T.) güncelleyiniz.',
        validationMethod: 'outcome_subject_prefix_alignment'
      });
    }

    // 3. Kazanım Konu Başlığı ile Soru İçeriği Arasında Anlamsal İpuçları
    if (outcomeMeta.hasOfficialTitle || outcomeMeta.topicNote) {
      const topicText = `${outcomeMeta.officialTitle} ${outcomeMeta.topicNote}`.toLowerCase();
      // Anlamlı anahtar kelimeleri seç (5 harften uzun, genel yüklemler hariç)
      const topicKeywords = topicText
        .split(/[\s,.;:!?()-]+/)
        .filter(w => w.length >= 5 && !['açıklar', 'kullanır', 'belirler', 'ilişkilendirir', 'öğrenme', 'çıktısı', 'kapsamında', 'yapar', 'eder'].includes(w));

      if (topicKeywords.length > 0) {
        const fullContent = `${stem} ${stimulus} ${answer}`.toLowerCase();
        const hasAnyTopicKeyword = topicKeywords.some(kw => fullContent.includes(kw));
        if (!hasAnyTopicKeyword && stem.length > 30) {
          findings.push({
            category: 'outcome_alignment',
            severity: 'warning',
            field: 'outcome',
            message: `Soru içeriğinde kazanım başlığında yer alan temel konu kavramları (${topicKeywords.slice(0, 3).join(', ')}) tespit edilemedi.`,
            suggestedFix: 'Sorunun ilgili kazanımın hedeflenen kavram alanını doğrudan ölçtüğünden emin olunuz.',
            validationMethod: 'outcome_topic_semantic_relevance'
          });
        }
      }
    }

    // 4. Ham şablon metin veya kod sızıntısı denetimi
    const leaksRawCode = stem.includes(outcomeCode);
    const hasBoilerplate = /(?:öğrenme\s+çıktısı\s+kapsamında|kavramsal\s+ilkeleri\s+ve\s+neden-sonuç\s+ilişkilerini\s+gerekçelendirerek\s+açıklayınız|verilen\s+durumu\s+analitik\s+olarak\s+açıklayınız)/i.test(stem);
    if (leaksRawCode) {
      findings.push({
        category: 'outcome_alignment',
        severity: 'critical',
        field: 'stem',
        message: `Soru kökünde ham kazanım kodu (${outcomeCode}) sızıntısı tespit edildi.`,
        suggestedFix: 'Soru kökünü kazanım kodundan arındırarak öğrencinin doğrudan okuyacağı soru cümlesini yazınız.',
        validationMethod: 'raw_code_leak_check'
      });
    }
    if (hasBoilerplate) {
      findings.push({
        category: 'outcome_alignment',
        severity: 'warning',
        field: 'stem',
        message: 'Soru kökünde genel şablon/kalıp metin tespit edildi.',
        suggestedFix: 'Soruyu somut bir olay, deney veya problem bağlamına oturtunuz.',
        validationMethod: 'hollow_boilerplate_check'
      });
    }
  }

  // ==========================================
  // B. CEVAPLANABİLİRLİK VE VERİ BÜTÜNLÜĞÜ
  // ==========================================
  if (!stem || stem.length < 10) {
    findings.push({
      category: 'answerability',
      severity: 'critical',
      field: 'stem',
      message: 'Soru kökü boş veya anlaşılamayacak kadar kısa (<10 karakter).',
      suggestedFix: 'Açık uçlu soru kökünü eksiksiz yazınız.',
      validationMethod: 'stem_presence_check'
    });
  }

  // ==========================================
  // TASK228: GÖRSEL VE YAPILANDIRILMIŞ VERİ ATFI DENETİMİ
  // ==========================================
  // 1. Tablo ve Çizelge Atfı Denetimi
  const referencesTable = /(?:tabloda(?:ki)?|tabloya\s+göre|tablodaki\s+veriler|çizelgede(?:ki)?|çizelgeye\s+göre|(?:verilen|aşağıdaki|yandaki)\s+tablo)/i.test(stem);
  if (referencesTable) {
    const hasVisual = isValidVisualPayload(q.visual);
    const hasTableData = hasStructuredTableOrDataSet(stimulus) || hasStructuredTableOrDataSet(q.commonStimulus) || Boolean(q.dataTable || q.table);
    if (!hasVisual && !hasTableData) {
      findings.push({
        category: 'answerability',
        severity: 'critical',
        field: 'stimulus',
        message: 'Soru kökünde tablo veya çizelgedeki verilere atıf yapılmasına rağmen ne görsel ne de yapılandırılmış veri tablosu bulunmaktadır.',
        suggestedFix: 'Sorunun ihtiyaç duyduğu veri tablosunu metin veya görsel nesnesi olarak ekleyiniz.',
        validationMethod: 'visual_stimulus_reference_check'
      });
    }
  }

  // 2. Şekil, Şema, Grafik, Harita veya Deney Düzeneği Atfı Denetimi
  // Not: "yukarıdaki metne göre" / "metinden hareketle" gibi saf metin referansları KESİNLİKLE dahil edilmez.
  const referencesVisualOrDiagram = /(?:şekildeki|şekle\s+göre|(?:verilen|yandaki|aşağıdaki|bu)\s+şek(?:il|le|ilde)|şekilde\s+(?:verilen|gösterilen|yer\s+alan)|görseldeki|görsele\s+göre|(?:verilen|yandaki|aşağıdaki|bu)\s+görsel(?:de|e|i)?|görselde\s+(?:verilen|gösterilen|yer\s+alan)|grafikte(?:ki)?|grafiğe\s+göre|(?:verilen|yandaki|aşağıdaki|bu)\s+grafi(?:k|ğe|kte)|koordinat\s+sisteminde|koordinat\s+düzleminde|(?:verilen|aşağıdaki|şekildeki|yandaki)\s+sayı\s+doğrusu|sayı\s+doğrusundaki|sayı\s+doğrusu\s+üzerinde\s+(?:verilen|gösterilen|işaretlenen)|haritada(?:ki)?|haritaya\s+göre|haritayı\s+inceleyerek|(?:verilen|yandaki|aşağıdaki)\s+harita|devre\s+şemasında|devre\s+şemasına\s+göre|(?:verilen|aşağıdaki|şekildeki)\s+şemada|şemadaki|deney\s+düzeneğinde(?:ki)?|deney\s+düzeneğine\s+göre|(?:verilen|aşağıdaki|bu)\s+düzenekte|düzenekteki)/i.test(stem);

  if (referencesVisualOrDiagram) {
    if (!q.visual) {
      findings.push({
        category: 'answerability',
        severity: 'critical',
        field: 'visual',
        message: 'Soru kökünde şekil, şema, grafik, harita veya deney düzeneğine açık atıf yapılmasına rağmen gerekli görsel veya model nesnesi (q.visual) bulunmamaktadır.',
        suggestedFix: 'Sorunun atıfta bulunduğu görseli veya deney düzeneği modelini q.visual alanına ekleyiniz.',
        validationMethod: 'visual_stimulus_reference_check'
      });
    } else if (!isValidVisualPayload(q.visual)) {
      findings.push({
        category: 'answerability',
        severity: 'critical',
        field: 'visual',
        message: 'Sorunun atıfta bulunduğu görsel nesnesi (q.visual) boş, bozuk veya geçersiz parametreler içermektedir.',
        suggestedFix: 'Görsel parametrelerini (type, params) eksiksiz ve geçerli biçimde yapılandırınız.',
        validationMethod: 'visual_stimulus_reference_check'
      });
    }
  }

  // TASK224-B: Doğrulanabilir kaynak eşleştirme ve bağlam denetimi
  const commonStim = (q.commonStimulus || '').trim();
  const sourceBinding = verifyQuestionSourceBinding(
    {
      questionText: stem,
      stimulus: stimulus,
      commonStimulus: q.commonStimulus,
      sharedSourceId: q.sharedSourceId,
      questionNumber: q.questionNumber || q.number,
      number: q.questionNumber || q.number,
      outcomeCode: outcomeCode,
      templateType: q.templateType,
      archetype: q.archetype,
      contextText: q.contextText,
      visual: q.visual
    },
    context?.siblingQuestions || [],
    context?.sharedSourceGroups
  );

  const effectiveStimulus = (sourceBinding.isValid && sourceBinding.resolvedStimulus) 
    ? sourceBinding.resolvedStimulus 
    : (stimulus || commonStim);

  // Metin veya uyarıcı gereksinimi kontrolü
  const sourceReq = detectSourceRequirement(stem, q.templateType || q.archetype, undefined, effectiveStimulus);
  if (sourceReq.requiresSource) {
    if (sourceBinding.isValid && sourceBinding.bindingType !== 'self_contained') {
      findings.push({
        category: 'answerability',
        severity: 'info',
        field: 'stimulus',
        message: sourceBinding.bindingType === 'valid_cross_reference'
          ? `Soru ${sourceBinding.sourceOwnerQuestionNumber}. sorudaki kaynak metne çapraz referansla başarıyla bağlanmıştır.`
          : 'Soru sınav içi doğrulanmış ortak kaynak metnine dayanmaktadır.',
        suggestedFix: 'Bağımsız kullanım için tam metni soru bünyesine de ekleyebilirsiniz.',
        validationMethod: 'source_requirement_check'
      });
    } else if (!stimulus || stimulus.length < 30) {
      if (!q.visual && (!sourceBinding.isValid || sourceBinding.bindingType === 'orphan_reference' || sourceBinding.bindingType === 'missing_source')) {
        findings.push({
          category: 'answerability',
          severity: 'critical',
          field: 'stimulus',
          message: sourceBinding.reason || 'Soru kökü metne/grafiğe atıf yapmasına rağmen kaynak veri veya okuma metni eksik.',
          suggestedFix: 'Sorunun ihtiyaç duyduğu okuma metnini, veri tablosunu veya grafiği ekleyiniz.',
          validationMethod: 'source_requirement_check'
        });
      }
    } else {
      const stimQual = checkStimulusQuality(stimulus, sourceReq);
      if (!stimQual.isValid) {
        findings.push({
          category: 'answerability',
          severity: 'warning',
          field: 'stimulus',
          message: 'Kaynak metin/veri kalitesi yetersiz veya çözümlenmemiş çapraz soru referansı içeriyor.',
          suggestedFix: 'Kaynak metni öğrenci düzeyine uygun, zengin ve tutarlı hale getiriniz.',
          validationMethod: 'stimulus_quality_check'
        });
      }
    }
  }

  // Anlamsal olarak tek başına cevaplanabilirlik
  const isSelfContained = isSemanticallySelfContainedQuestion(
    stem,
    effectiveStimulus,
    outcomeCode,
    commonStim,
    sourceBinding.isValid && sourceBinding.bindingType !== 'missing_source' && sourceBinding.bindingType !== 'orphan_reference'
  );
  if (!isSelfContained) {
    findings.push({
      category: 'answerability',
      severity: 'critical',
      field: 'answerability' as any,
      message: 'Soru, verilen verilerle tek başına cevaplanamaz; eksik bağlam veya kayıp metin referansı var.',
      suggestedFix: 'Sorunun çözümü için gerekli tüm öncülleri ve verileri soru metnine dahil ediniz.',
      validationMethod: 'semantic_self_contained_check'
    });
  }

  // ==========================================
  // B.2: HATA TESPİTİ VE SENARYO TUTARLILIĞI (TASK198)
  // ==========================================
  const isErrorQuestion = isIntentionalErrorDetectionQuestion(q);
  if (isErrorQuestion) {
    // 1. Senaryo / uyarıcı metin varlığı kontrolü
    if (!stimulus || stimulus.length < 20) {
      findings.push({
        category: 'stem_answer_consistency',
        severity: 'critical',
        field: 'stimulus',
        message: 'Hata tespiti / adım analizi sorusu olmasına rağmen senaryoda öğrencinin inceleyeceği bir öğrenci ifadesi, deney verisi veya işlem adımları (stimulus) bulunmamaktadır.',
        suggestedFix: 'Senaryo (stimulus) alanına incelenecek öğrenci ifadesini, poster içeriğini veya işlem basamaklarını ekleyiniz.',
        validationMethod: 'intentional_error_scenario_presence_check'
      });
    }

    // 2. Adım hatası soruluyorsa senaryoda numaralı adımların varlığı
    const asksWhichStep = /(?:hangi\s+adım|kaçıncı\s+adım|ilk\s+hata.*adım)/i.test(stem);
    if (asksWhichStep && stimulus) {
      const hasNumberedSteps = /(?:1\.\s*adım|adım\s*1|I\.\s*adım|I\.|1\.\s*aşama|aşama\s*1)/i.test(stimulus);
      if (!hasNumberedSteps) {
        findings.push({
          category: 'stem_answer_consistency',
          severity: 'critical',
          field: 'stimulus',
          message: 'Soru kökünde hangi adımda hata yapıldığı sorulmasına rağmen senaryoda numaralandırılmış işlem adımları (1. Adım, 2. Adım vb.) bulunmamaktadır.',
          suggestedFix: 'Senaryodaki işlem basamaklarını "1. Adım:", "2. Adım:" şeklinde açıkça numaralandırınız.',
          validationMethod: 'intentional_error_step_consistency_check'
        });
      }
    }
  }

  // ==========================================
  // C. SORU VE MODEL CEVAP TUTARLILIĞI
  // ==========================================
  if (!answer || answer.length < 2) {
    findings.push({
      category: 'stem_answer_consistency',
      severity: 'critical',
      field: 'answer',
      message: 'Model cevap boş veya eksik.',
      suggestedFix: 'Ölçme kriterlerine uygun resmî model cevabı ekleyiniz.',
      validationMethod: 'answer_presence_check'
    });
  } else {
    // TASK228: Meta-talimat / Öğretmen yönergesi cevap kontrolü
    if (isMetaInstructionAnswer(answer)) {
      findings.push({
        category: 'stem_answer_consistency',
        severity: 'critical',
        field: 'answer',
        message: 'Model cevap alanı gerçek bir çözüm veya yanıt yerine öğretmen yönergesi / değerlendirme talimatı (meta-cevap) içermektedir.',
        suggestedFix: 'Öğrencinin yapması gerekeni tarif etmek yerine, sorunun doğrudan çözümlenmiş nihai cevabını ve bilimsel açıklamasını yazınız.',
        validationMethod: 'meta_instruction_answer_check'
      });
    }

    // Model cevap soru kökünü papağan gibi tekrar ediyor mu?
    const cleanStem = stem.replace(/[^\p{L}\p{N}\s]/gu, '').trim().toLowerCase();
    const cleanAns = answer.replace(/[^\p{L}\p{N}\s]/gu, '').trim().toLowerCase();
    if (cleanAns.length > 20 && cleanStem.length > 20 && cleanAns === cleanStem) {
      findings.push({
        category: 'stem_answer_consistency',
        severity: 'critical',
        field: 'answer',
        message: 'Model cevap soru kökünün birebir tekrarından ibarettir; gerçek bir yanıt içermemektedir.',
        suggestedFix: 'Soru kökünü tekrarlamadan beklenen doğru çözümü ve nihai yanıtı yazınız.',
        validationMethod: 'answer_verbatim_repeat_check'
      });
    }

    // Alternatif cevapların tutarlılığı
    for (let i = 0; i < altAnswers.length; i++) {
      const alt = String(altAnswers[i]).trim();
      if (!alt) {
        findings.push({
          category: 'stem_answer_consistency',
          severity: 'info',
          field: 'alternativeAnswers',
          message: `${i + 1}. alternatif cevap boş dize içermektedir.`,
          suggestedFix: 'Boş alternatif cevap maddelerini temizleyiniz.',
          validationMethod: 'empty_alternative_answer_check'
        });
      } else if (cleanStem.length > 15 && alt.toLowerCase() === cleanStem) {
        findings.push({
          category: 'stem_answer_consistency',
          severity: 'warning',
          field: 'alternativeAnswers',
          message: `${i + 1}. alternatif cevap soru kökünün tekrarıdır.`,
          suggestedFix: 'Soru kökünü tekrar etmeyen geçerli bir alternatif yanıt giriniz.',
          validationMethod: 'alternative_answer_stem_repeat_check'
        });
      } else if (isMetaInstructionAnswer(alt)) {
        findings.push({
          category: 'stem_answer_consistency',
          severity: 'critical',
          field: 'alternativeAnswers',
          message: `${i + 1}. alternatif cevap gerçek bir yanıt yerine öğretmen yönergesi (meta-cevap) içermektedir.`,
          suggestedFix: 'Alternatif cevap maddesini gerçek bir öğrenci yanıtı olacak şekilde yazınız.',
          validationMethod: 'meta_instruction_answer_check'
        });
      }
    }
  }

  // ==========================================
  // D. RUBRİK VE PUANLAMA KALİTESİ
  // ==========================================
  const shouldSkipRubric = context.skipRubricCheck || context.materialKind === 'study_sheet';

  if (!shouldSkipRubric) {
    if (!rubric || rubric.length === 0) {
      findings.push({
        category: 'rubric_consistency',
        severity: 'critical',
        field: 'rubric',
        message: 'Sorunun değerlendirme rubriği bulunmamaktadır.',
        suggestedFix: 'Sorunun puan dağılımını belirten analitik rubrik ölçütleri ekleyiniz.',
        validationMethod: 'rubric_presence_check'
      });
    } else {
      let rubricSum = 0;

      for (let rIdx = 0; rIdx < rubric.length; rIdx++) {
        const r = rubric[rIdx];
        const pts = Number(r.pts ?? r.points ?? 0);
        const crit = (r.item || r.criterion || '').trim();

        if (isNaN(pts) || pts <= 0) {
          findings.push({
            category: 'rubric_consistency',
            severity: 'critical',
            field: 'rubric',
            message: `Rubrik ${rIdx + 1}. ölçütünde geçersiz veya sıfır puan (${pts}) tespit edildi.`,
            suggestedFix: 'Her rubrik kriterine sıfırdan büyük tamsayı puan atayınız.',
            validationMethod: 'rubric_criterion_pts_check'
          });
        }
        if (!crit || crit.length < 3) {
          findings.push({
            category: 'rubric_consistency',
            severity: 'warning',
            field: 'rubric',
            message: `Rubrik ${rIdx + 1}. ölçüt açıklaması çok kısa veya anlamsız.`,
            suggestedFix: 'Ölçütün neyi değerlendirdiğini (kavram, işlem, gerekçe) açıkça belirtiniz.',
            validationMethod: 'rubric_criterion_text_check'
          });
        }
        rubricSum += pts;
      }

      // Puan toplamı eşleşmesi
      if (rubricSum !== points) {
        findings.push({
          category: 'rubric_consistency',
          severity: 'critical',
          field: 'rubric',
          message: `Rubrik ölçüt puanları toplamı (${rubricSum} puan), soru toplam puanı (${points} puan) ile uyuşmuyor.`,
          suggestedFix: `Rubrik puanlarını toplamı ${points} olacak şekilde dengeleyiniz.`,
          validationMethod: 'rubric_sum_verification'
        });
      }

      // Yüksek puanlı sorularda tek ölçütlü rubrik denetimi (TASK232 Öncelik 5)
      if (points >= 12 && rubric.length === 1) {
        // Pedagojik istisna (Kategori A): Tek kavram, geometrik terim veya doğrudan kısa cevap gerektiren meşru tek adımlı sorular
        const isSingleConceptQuestion = (
          (answer && answer.length <= 30 && !/[\n•\d\)]/.test(answer)) ||
          /(?:geometride\s+nasıl\s+adlandırılır|hangi\s+geometrik\s+şekil|tek\s+bir\s+(?:kelime|cümle|terim)|complete\s+the\s+sentence|which\s+word|tanımı\s+nedir)/i.test(stem)
        );

        if (!isSingleConceptQuestion) {
          findings.push({
            category: 'rubric_consistency',
            severity: 'warning',
            field: 'rubric',
            message: `Yüksek puanlı (${points} puan) çok bileşenli soru tek ölçüte bağlanmış; kısmi puanlama imkânı kısıtlı.`,
            suggestedFix: 'Rubriği en az 2 analitik ölçüte (kavramsal teşhis ve analitik gerekçelendirme) bölünüz.',
            validationMethod: 'rubric_granularity_check'
          });
        }
      }
    }
  }

  // ==========================================
  // E. DİL, ANLATIM VE SEVİYE UYGUNLUĞU
  // ==========================================
  // Soru sonu noktalama kontrolü
  if (stem && !/[?.!:]$/.test(stem)) {
    findings.push({
      category: 'language_clarity',
      severity: 'info',
      field: 'stem',
      message: 'Soru kökü uygun bir noktalama işaretiyle (? veya .) bitmemektedir.',
      suggestedFix: 'Soru kökünün sonuna soru işareti (?) veya yönerge noktası (.) ekleyiniz.',
      validationMethod: 'stem_punctuation_termination_check'
    });
  }

  // Çift noktalama veya bozuk yazım kalıntısı
  if (/[?.,!;]{2,}/.test(stem)) {
    findings.push({
      category: 'language_clarity',
      severity: 'info',
      field: 'stem',
      message: 'Soru kökünde mükerrer veya bozuk noktalama işareti tespit edildi.',
      suggestedFix: 'Gereksiz çift noktalama işaretlerini temizleyiniz.',
      validationMethod: 'redundant_punctuation_check'
    });
  }

  // -------------------------------------------------------------
  // E.3: SENARYOLARDA ANLATIMSAL VE ZAMANSAL TUTARLILIK KONTROLÜ (TASK199)
  // Olayların mantıksal, kronolojik veya durumsal (state) çelişkilerini denetler.
  // Örn: Bir nesnenin ilk cümlede zaten taşındığı/sırtta/elde olduğu belirtilmişken
  // sonraki cümlede aynı nesneyi sıfırdan yerden alıp sırtına taktığının anlatılması.
  // -------------------------------------------------------------
  const fullScenario = `${stimulus} ${stem}`.trim();
  if (fullScenario.length >= 25) {
    // 1. Durumlar bağımsız alternatifler mi? ("1. Durum: ... 2. Durum: ..." veya "1. Aşama: ... 2. Aşama: ...")
    // Karşılaştırmalı bağımsız deneylerde (A durumu vs B durumu) durumlar arası farklılıklar çelişki DEĞİLDİR.
    const hasDistinctSituations =
      /(?:1\.\s*durum|durum\s*1|1\.\s*eylem|eylem\s*1|1\.\s*aşama|aşama\s*1|yöntem\s*1)/i.test(fullScenario) &&
      /(?:2\.\s*durum|durum\s*2|2\.\s*eylem|eylem\s*2|2\.\s*aşama|aşama\s*2|yöntem\s*2)/i.test(fullScenario);

    // Eğer bağımsız durumlar varsa, her durumu kendi içinde tekil olarak inceleriz
    const segmentsToCheck: string[] = hasDistinctSituations
      ? fullScenario.split(/(?=[1234]\.\s*(?:durum|eylem|aşama|yöntem))/i)
      : [fullScenario];

    for (const seg of segmentsToCheck) {
      const segLower = seg.toLowerCase();

      // Olumsuzluk koruması (Negation Guard): "yerden almadı", "sırtında değildi", "kaldırmadan" vb.
      const hasNegation = /(?:almadan|kaldırmadan|takmadan|bırakmadan|değil|değildi|yoktu)/i.test(segLower);

      // Çelişki Kalıbı 1: Zaten sırtta / elde olan nesnenin ara eylem olmaksızın yerden alınıp sırtına/eline takılması
      // Örnek: "Selim, okul çıkışında sırtındaki ağır çantayla ... çantasını yerden alarak sırtına takmış..."
      // Örnek: "Selim'in çantası sırtındadır ... çantasını yerden alıp sırtına takmıştır..."
      const preExistingBackState = /(?:sırtındaki|sırtında\s+bulunan|sırtında\s+olan|çantası\s+sırtında|sırtında\s+taşırken|sırtında\s+taşıdığı)\s+(?:ağır\s+)?(?:okul\s+)?(çanta|koli|yük|bavul|kutu|paket)/i;
      const preExistingHandState = /(?:elindeki|elinde\s+bulunan|elinde\s+tuttuğu|elinde\s+olan|kucağındaki)\s+(?:ağır\s+)?(çanta|koli|yük|bavul|kutu|paket|bardak)/i;

      const subsequentBackPickup = /(?:çanta|koli|yük|bavul|kutu|paket)(?:sını|yı|sini|yi|ünü|ü|unu|u|ini|i)?\s+yerden\s+(?:alarak|alıp|kaldırarak|kaldırıp)\s+sırtına\s+(?:tak|al)/i;
      const subsequentHandPickup = /(?:çanta|koli|yük|bavul|kutu|paket|bardak)(?:sını|yı|sini|yi|ünü|ü|unu|u|ini|i)?\s+yerden\s+(?:alarak|alıp|kaldırarak|kaldırıp)\s+(?:eline|kucağına)\s+al/i;

      const intermediatePutDown = /(?:yere\s+(?:koy|bırak|indir|attı)|sırtından\s+(?:çıkar|indir|al)|masaya\s+(?:bırak|koy)|yere\s+bıraktıktan)/i;
      const isAskingNarrativeError = isErrorQuestion && /(?:anlatım|zamansal|kronoloji|çelişki|olay\s+akışı|mantık\s+hatası)/i.test(stem);

      if (!hasNegation && !isAskingNarrativeError) {
        const hasBackConflict = preExistingBackState.test(segLower) && subsequentBackPickup.test(segLower);
        const hasHandConflict = preExistingHandState.test(segLower) && subsequentHandPickup.test(segLower);

        if ((hasBackConflict || hasHandConflict) && !intermediatePutDown.test(segLower)) {
          findings.push({
            category: 'language_clarity',
            severity: 'critical',
            field: 'stimulus',
            message: 'Senaryoda anlatımsal ve zamansal çelişki tespit edildi: İlk cümlede zaten sırtta/elde olduğu belirtilen nesnenin sonraki cümlede ara eylem olmaksızın yerden alınıp sırtına/eline takıldığı ifade edilmektedir.',
            suggestedFix: 'Olay akışını kronolojik sıraya koyunuz: Nesnenin önce yerden alınmasını, ardından taşınmasını ve son olarak bırakılmasını sırasıyla ifade ediniz.',
            validationMethod: 'narrative_temporal_consistency_check'
          });
          break;
        }

        // Çelişki Kalıbı 2: Zamansal terslik (Taşıma/yürüme eyleminin ardından sırtına takma)
        // Örnek: "düz yolda yürüdükten sonra çantasını sırtına takmıştır" (arada yere bırakma olmadan)
        const walkThenPickup = /(?:düz\s+yolda|koridorda|yolda)\s+(?:yürüdükten|ilerledikten)\s+sonra\s+.*?(?:yerden\s+al(?:arak|ıp)\s+sırtına\s+tak|yerden\s+kaldırıp\s+sırtına\s+tak)/i;
        if (walkThenPickup.test(segLower) && !intermediatePutDown.test(segLower)) {
          findings.push({
            category: 'language_clarity',
            severity: 'critical',
            field: 'stimulus',
            message: 'Senaryoda zamansal terslik (kronolojik çelişki) tespit edildi: Yürüme eyleminden sonra çantayı yerden alıp sırtına takma adımı yer almaktadır.',
            suggestedFix: 'Olayları kronolojik sırayla veriniz (önce çantayı yerden alma, sonra yolda yürüme).',
            validationMethod: 'narrative_temporal_consistency_check'
          });
          break;
        }
      }
    }
  }

  // ==========================================
  // F. ÖLÇME NİTELİĞİ VE SINAV İÇİ ÇEŞİTLİLİK
  // ==========================================
  // Yüksek puanlı sorularda tek kelimelik ezber avcılığı kontrolü
  if (points >= 14 && answer) {
    const cleanWords = answer.split(/\s+/).filter(Boolean);
    const isTrivialQuery = /(hangi\s+(meyve|sebze|renk|şehir|araç|hayvan|nesne|eşya)|kimdir|kaç\s+(liradır|kestane|elma))/i.test(stem);
    if (cleanWords.length <= 2 && isTrivialQuery) {
      findings.push({
        category: 'pedagogical_depth',
        severity: 'warning',
        field: 'answer',
        message: `Yüksek puanlı (${points} puan) soruda yüzeysel tek kelimelik bilgi sorulmaktadır ("${answer}").`,
        suggestedFix: 'Soruyu öğrencinin neden-sonuç kurarak gerekçesini de açıkladığı üst düzey düşünme formatına dönüştürünüz.',
        validationMethod: 'trivial_single_word_check'
      });
    }
  }

  // Kardeş sorularla (sibling questions) mükerrerlik kontrolü
  if (context.siblingQuestions && context.siblingQuestions.length > 0) {
    const cleanStemLower = stem.toLowerCase();
    for (const sib of context.siblingQuestions) {
      const sibStem = (sib.questionText || sib.question || '').trim().toLowerCase();
      if (sibStem && sibStem !== cleanStemLower) {
        // Tam aynı soru kökü kontrolü
        if (cleanStemLower.length > 25 && sibStem.includes(cleanStemLower)) {
          findings.push({
            category: 'pedagogical_depth',
            severity: 'critical',
            field: 'stem',
            message: `Aynı sınavdaki başka bir soruyla (${sib.questionNumber || 'diğer soru'}) birebir veya aşırı benzer soru kökü tespit edildi.`,
            suggestedFix: 'Soru bağlamını ve ölçme yaklaşımını farklılaştırınız.',
            validationMethod: 'intra_exam_duplicate_check'
          });
          break;
        }
      }
    }
  }

  return findings;
}
