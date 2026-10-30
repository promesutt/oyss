import { LiveExamPromptParams, AvoidDirectivesParams } from './types';
import {
  getExamHeader,
  getOutcomeAlignmentRule,
  getDifficultyPlanRule,
  CONTEXT_DIVERSITY_RULE,
  getMebiPedagogicalRules
} from './coreRules';
import { getGradeAgeDirectives } from './gradeRules';
import { getJsonOutputSchema } from './outputSchema';
import {
  getRegisteredPrompt,
  isSubjectPromptRegistered,
  isCustomSubjectPromptRegistered,
  getAllRegisteredPrompts,
  PromptRegistryError
} from './promptRegistry';
import {
  VALID_MIDDLE_SCHOOL_GRADES,
  VALID_MIDDLE_SCHOOL_SUBJECTS,
  isValidMiddleSchoolCombination,
  createGenericPromptEntry
} from './genericPrompt';

/**
 * Metinleri anlamsız hece kesilmelerini önleyecek ve ayırt edici kısımları
 * koruyacak şekilde akıllıca kısaltır.
 */
export function smartTruncate(text: string, maxLength: number): string {
  if (!text) return '';
  const cleaned = text.trim().replace(/\s+/g, ' ');
  if (cleaned.length <= maxLength) return cleaned;

  const truncated = cleaned.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > maxLength * 0.7) {
    return truncated.slice(0, lastSpace) + '...';
  }
  return truncated + '...';
}

/**
 * Mevcut sınav ve önceki set sorularına dayalı kaçınma direktifi üretir.
 * B+ Mimarisi:
 * - Set A (Önceki Varyasyon) soruları: En yüksek öncelikli yasak grubu.
 * - Örnek sınav taslak soruları: İkincil öncelikli yasak grubu.
 * - Set A uyaranları: En yüksek öncelikli uyaran grubu.
 * - Örnek sınav uyaranları: İkincil öncelikli uyaran grubu.
 * 
 * Set A soruları yoksa (Set A üretimi / variationIndex = 0), önceki motorla
 * %100 byte-for-byte eşitlik sağlamak için standart temel kalıp kullanılır.
 */
export function buildAvoidDirectives(
  paramsOrTexts: AvoidDirectivesParams | string[],
  legacyStimuli?: string[],
  legacyVariationIndex?: number,
  legacyVariationToken?: string
): string {
  let baseAvoidTexts: string[] = [];
  let baseAvoidStimuli: string[] = [];
  let setAAvoidTexts: string[] = [];
  let setAAvoidStimuli: string[] = [];
  let variationIndex = 0;
  let variationToken = '';

  if (Array.isArray(paramsOrTexts)) {
    // Legacy çağrı uyumluluğu
    baseAvoidTexts = paramsOrTexts;
    baseAvoidStimuli = legacyStimuli || [];
    variationIndex = legacyVariationIndex ?? 0;
    variationToken = legacyVariationToken ?? '';
  } else {
    // B+ yapılandırılmış parametre objesi
    baseAvoidTexts = paramsOrTexts.baseAvoidTexts || [];
    baseAvoidStimuli = paramsOrTexts.baseAvoidStimuli || [];
    setAAvoidTexts = paramsOrTexts.setAAvoidTexts || [];
    setAAvoidStimuli = paramsOrTexts.setAAvoidStimuli || [];
    variationIndex = paramsOrTexts.variationIndex ?? 0;
    variationToken = paramsOrTexts.variationToken ?? '';
  }

  const hasSetA = setAAvoidTexts.length > 0;
  const hasBase = baseAvoidTexts.length > 0;

  // Hiçbir kaçınma verisi yoksa
  if (!hasSetA && !hasBase) {
    return `
VARYASYON PLANI: Bu ${variationIndex + 1}. sınav varyasyonudur (Varyasyon Belirteci: ${variationToken}). Standart ve klişe kurguların dışında özgün senaryo oluşturunuz.
`;
  }

  // Set A üretimi (Set A soruları boş, sadece hazır sınav soruları var)
  // %100 GERİYE DÖNÜK BYTE-FOR-BYTE PARITY KORUMASI:
  if (!hasSetA && hasBase) {
    return `
ÖZGÜNLÜK VE MEVCUT SORULARI TEKRARLAMAMA KURALI (EN KATI VE ZORUNLU KURAL):
- Bu sınav ${variationIndex + 1}. FARKLI varyasyon setidir (Varyasyon Belirteci: ${variationToken}).
- Mevcut sınav kâğıdında bulunan aşağıdaki soru konularını, olay örgülerini, metinleri, karakterleri ve durumları KESİNLİKLE TEKRARLAMA:
${baseAvoidTexts.slice(0, 7).map((t, i) => `  * Yasaklı/Mevcut Soru ${i + 1}: "${t.slice(0, 95)}..."`).join('\n')}
${baseAvoidStimuli.length > 0 ? `- Mevcut kurgu ve uyarım metinlerini (${baseAvoidStimuli.slice(0, 3).map(s => `"${s.slice(0, 50)}..."`).join(', ')}) kesinlikle tekrarlama.\n` : ''}- Yukarıdaki metin ve olaylardan TAMAMEN FARKLI, YEPYENİ bir kurgu, yeni karakterler ve taze bir hayat durumu inşa et!
`;
  }

  // Set B / Set C vb. (Set A soruları mevcut): B+ MİMARİSİ
  // Düzeltme 1: Set A sorularının tamamını dahil et (güvenli tavan: 25 soru)
  const maxSetAQuestions = 25;
  const effectiveSetAQuestions = setAAvoidTexts.slice(0, maxSetAQuestions);
  if (setAAvoidTexts.length > maxSetAQuestions) {
    console.warn(`[AvoidanceB+] Set A soru sayısı bütçe tavanını (${maxSetAQuestions}) aştı. İlk ${maxSetAQuestions} soru dahil edildi.`);
  }

  // Düzeltme 2: Örnek sınav soruları ikincil kota (en fazla 6 soru, Set A'yı asla dışarı itmez)
  const effectiveBaseQuestions = baseAvoidTexts.slice(0, 6);

  // Düzeltme 2: Uyaranları kaynak bazında ayır
  // Set A uyaranları öncelikli (en fazla 6 uyaran)
  const effectiveSetAStimuli = setAAvoidStimuli.slice(0, 6);
  // Örnek sınav uyaranları ikincil (en fazla 3 uyaran)
  const effectiveBaseStimuli = baseAvoidStimuli.slice(0, 3);

  // Düzeltme 3: Metin kısaltmalarında ayırt edici içeriği koru (Soru: 180 kr, Uyaran: 120 kr)
  const setAQuestionsBlock = effectiveSetAQuestions.map((t, i) =>
    `  * Set A Soru ${i + 1}: "${smartTruncate(t, 180)}"`
  ).join('\n');

  const baseQuestionsBlock = effectiveBaseQuestions.length > 0 ? `
- [KATEGORİ 2 - İKİNCİL YASAK: HAZIR SINAV TASLAK SORULARI]:
  Aşağıdaki hazır sınav taslak sorularını da kurgusal olarak tekrarlama:
${effectiveBaseQuestions.map((t, i) => `  * Taslak Soru ${i + 1}: "${smartTruncate(t, 180)}"`).join('\n')}` : '';

  const setAStimuliBlock = effectiveSetAStimuli.length > 0 ? `
- [UYARAN YASAĞI - SET A KURGU VE METİNLERİ (ÖNCELİKLİ)]:
  Set A sınavında kullanılan şu kurgu, metin ve uyaranları (${effectiveSetAStimuli.map(s => `"${smartTruncate(s, 120)}"`).join(', ')}) kesinlikle tekrarlama.` : '';

  const baseStimuliBlock = effectiveBaseStimuli.length > 0 ? `
- [UYARAN YASAĞI - HAZIR SINAV TASLAK METİNLERİ (İKİNCİL)]:
  Hazır sınavda yer alan şu taslak bağlam ve metinleri (${effectiveBaseStimuli.map(s => `"${smartTruncate(s, 120)}"`).join(', ')}) tekrarlama.` : '';

  return `
ÖZGÜNLÜK VE MEVCUT SORULARI TEKRARLAMAMA KURALI (EN KATI VE ZORUNLU KURAL):
- Bu sınav ${variationIndex + 1}. FARKLI varyasyon setidir (Varyasyon Belirteci: ${variationToken}).
- [KATEGORİ 1 - ÖNCELİKLİ YASAK: ÖNCEKİ VARYASYON (SET A) SORULARI]:
  Aşağıdaki sorular bu sınavın A Kitapçığında yer almaktadır. B Kitapçığı için bu soruların olay örgüsünü, kurgusunu, karakterlerini, durumlarını ve sayısal/metinsel verilerini KESİNLİKLE TEKRARLAMA:
${setAQuestionsBlock}${baseQuestionsBlock}${setAStimuliBlock}${baseStimuliBlock}
- Yukarıdaki metin, soru ve olaylardan TAMAMEN FARKLI, YEPYENİ bir kurgu, yeni karakterler ve taze bir hayat durumu inşa et!
`;
}

/**
 * Sınıf, ders, senaryo kazanım dağılımı ve zorluk planına göre
 * Gemini modeline gönderilecek nihai livePrompt metnini üretir.
 */
export function buildLiveExamPrompt(params: LiveExamPromptParams): string {
  const { grade, subjectId, targetCount, distributionsText, avoidDirectives, difficultyPlanText } = params;

  // Registry üzerinden ilgili branş kaydını al (Kayıtsız branşta fail-fast PromptRegistryError fırlatır)
  const registered = getRegisteredPrompt(grade, subjectId);

  const header = getExamHeader(grade, subjectId, targetCount, distributionsText, avoidDirectives);
  const outcomeRule = getOutcomeAlignmentRule(targetCount);
  const gradeRule = getGradeAgeDirectives(grade);
  const diffRule = getDifficultyPlanRule(targetCount, difficultyPlanText);
  const pedaRule = getMebiPedagogicalRules(targetCount);
  const schema = getJsonOutputSchema(registered.supportsAlternativeAnswers);

  const turkishMebiDirectives = (grade === 7 && subjectId === 'turkce') ? registered.directives : '';
  const math7thDirectives = (grade === 7 && subjectId === 'matematik') ? registered.directives : '';
  const science7thDirectives = (grade === 7 && subjectId === 'fen_bilimleri') ? registered.directives : '';
  const socialMebiDirectives = (grade === 7 && subjectId === 'sosyal_bilgiler') ? registered.directives : '';
  const dinMebiDirectives = (grade === 7 && subjectId === 'din_kulturu') ? registered.directives : '';

  return `${header}

${outcomeRule}

${gradeRule}

${diffRule}

${CONTEXT_DIVERSITY_RULE}

${pedaRule}
${turkishMebiDirectives}
${math7thDirectives}
${science7thDirectives}
${socialMebiDirectives}
${dinMebiDirectives}
${schema}`;
}

export {
  PromptRegistryError,
  getRegisteredPrompt,
  isSubjectPromptRegistered,
  isCustomSubjectPromptRegistered,
  getAllRegisteredPrompts,
  VALID_MIDDLE_SCHOOL_GRADES,
  VALID_MIDDLE_SCHOOL_SUBJECTS,
  isValidMiddleSchoolCombination,
  createGenericPromptEntry
};

export type { LiveExamPromptParams, PromptRegistryEntry, AvoidDirectivesParams } from './types';
