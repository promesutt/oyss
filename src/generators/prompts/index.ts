import { LiveExamPromptParams } from './types';
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
 * Mevcut sınav ve önceki set sorularına dayalı kaçınma direktifi üretir.
 * NOT: allAvoidTexts.slice(0, 7) ve allAvoidStimuli.slice(0, 3) limitleri
 * mevcut motor davranışını %100 korumak adına aynen muhafaza edilmiştir.
 */
export function buildAvoidDirectives(
  allAvoidTexts: string[],
  allAvoidStimuli: string[],
  variationIndex: number,
  variationToken: string
): string {
  if (allAvoidTexts.length > 0) {
    return `
ÖZGÜNLÜK VE MEVCUT SORULARI TEKRARLAMAMA KURALI (EN KATI VE ZORUNLU KURAL):
- Bu sınav ${variationIndex + 1}. FARKLI varyasyon setidir (Varyasyon Belirteci: ${variationToken}).
- Mevcut sınav kâğıdında bulunan aşağıdaki soru konularını, olay örgülerini, metinleri, karakterleri ve durumları KESİNLİKLE TEKRARLAMA:
${allAvoidTexts.slice(0, 7).map((t, i) => `  * Yasaklı/Mevcut Soru ${i + 1}: "${t.slice(0, 95)}..."`).join('\n')}
${allAvoidStimuli.length > 0 ? `- Mevcut kurgu ve uyarım metinlerini (${allAvoidStimuli.slice(0, 3).map(s => `"${s.slice(0, 50)}..."`).join(', ')}) kesinlikle tekrarlama.\n` : ''}- Yukarıdaki metin ve olaylardan TAMAMEN FARKLI, YEPYENİ bir kurgu, yeni karakterler ve taze bir hayat durumu inşa et!
`;
  }

  return `
VARYASYON PLANI: Bu ${variationIndex + 1}. sınav varyasyonudur (Varyasyon Belirteci: ${variationToken}). Standart ve klişe kurguların dışında özgün senaryo oluşturunuz.
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

export type { LiveExamPromptParams, PromptRegistryEntry } from './types';
