import { GradeLevel, SubjectId } from '../../types';
import { PromptRegistryEntry } from './types';
import { GRADE_7_TURKISH_DIRECTIVES } from './grade7TurkishPrompt';
import { GRADE_7_MATH_DIRECTIVES } from './grade7MathPrompt';
import { GRADE_7_SCIENCE_DIRECTIVES } from './grade7SciencePrompt';
import { GRADE_7_SOCIAL_DIRECTIVES } from './grade7SocialPrompt';
import { GRADE_7_DIN_DIRECTIVES } from './grade7DinPrompt';
import { isValidMiddleSchoolCombination, createGenericPromptEntry } from './genericPrompt';

export class PromptRegistryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PromptRegistryError';
  }
}

const REGISTRY: Record<string, PromptRegistryEntry> = {
  '7_turkce': {
    grade: 7,
    subjectId: 'turkce',
    directives: GRADE_7_TURKISH_DIRECTIVES,
    supportsAlternativeAnswers: true,
    version: '1.1'
  },
  '7_matematik': {
    grade: 7,
    subjectId: 'matematik',
    directives: GRADE_7_MATH_DIRECTIVES,
    supportsAlternativeAnswers: true,
    version: '1.0'
  },
  '7_fen_bilimleri': {
    grade: 7,
    subjectId: 'fen_bilimleri',
    directives: GRADE_7_SCIENCE_DIRECTIVES,
    supportsAlternativeAnswers: true,
    version: '1.0'
  },
  '7_sosyal_bilgiler': {
    grade: 7,
    subjectId: 'sosyal_bilgiler',
    directives: GRADE_7_SOCIAL_DIRECTIVES,
    supportsAlternativeAnswers: true,
    version: '1.2'
  },
  '7_din_kulturu': {
    grade: 7,
    subjectId: 'din_kulturu',
    directives: GRADE_7_DIN_DIRECTIVES,
    supportsAlternativeAnswers: true,
    version: '1.3'
  }
};

/**
 * Belirtilen sınıf ve branş için prompt kütük kaydını getirir.
 * 1. Özel branş kütük kaydı varsa onu döndürür.
 * 2. Özel kayıt yok fakat sınıf ve ders resmi müfredatta geçerliyse generic prompt döndürür.
 * 3. Sınıf veya ders gerçekten geçersizse fail-fast PromptRegistryError üretir.
 */
export function getRegisteredPrompt(grade: GradeLevel, subjectId: SubjectId): PromptRegistryEntry {
  const key = `${grade}_${subjectId}`;
  const customEntry = REGISTRY[key];

  // 1. Özel ders promptu varsa onu kullan
  if (customEntry) {
    if (!customEntry.directives || customEntry.directives.trim().length === 0) {
      throw new PromptRegistryError(
        `[PromptRegistryError] ${grade}. Sınıf '${subjectId}' için kayıtlı özel prompt direktifi boş olamaz!`
      );
    }
    return customEntry;
  }

  // 2. Özel prompt yoksa fakat sınıf ve ders resmi ortaokul müfredatında geçerliyse generic prompt kullan
  if (isValidMiddleSchoolCombination(grade, subjectId)) {
    return createGenericPromptEntry(grade, subjectId);
  }

  // 3. Sınıf veya ders gerçekten geçersizse fail-fast PromptRegistryError üret
  throw new PromptRegistryError(
    `[PromptRegistryError] ${grade}. Sınıf '${subjectId}' geçerli bir resmi ortaokul kombinasyonu değildir! ` +
    `Geçerli sınıflar: 5, 6, 7, 8. Geçerli branşlar: turkce, matematik, fen_bilimleri, sosyal_bilgiler, din_kulturu, ingilizce.`
  );
}

/**
 * Kombinasyonun sisteme kayıtlı (özel veya generic) olup olmadığını doğrular.
 */
export function isSubjectPromptRegistered(grade: GradeLevel, subjectId: SubjectId): boolean {
  const key = `${grade}_${subjectId}`;
  return key in REGISTRY || isValidMiddleSchoolCombination(grade, subjectId);
}

/**
 * Kombinasyonun özel (ders kitabı entegreli) prompta sahip olup olmadığını sorgular.
 */
export function isCustomSubjectPromptRegistered(grade: GradeLevel, subjectId: SubjectId): boolean {
  const key = `${grade}_${subjectId}`;
  return key in REGISTRY;
}

export function getAllRegisteredPrompts(): Record<string, PromptRegistryEntry> {
  return { ...REGISTRY };
}
