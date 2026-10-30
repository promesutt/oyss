import { GradeLevel, SubjectId } from '../../types';
import { PromptRegistryEntry } from './types';

/**
 * Resmi MEB Ortaokul Sınıfları (5, 6, 7, 8)
 */
export const VALID_MIDDLE_SCHOOL_GRADES: readonly GradeLevel[] = [5, 6, 7, 8] as const;

/**
 * Resmi MEB Ortaokul Branşları
 */
export const VALID_MIDDLE_SCHOOL_SUBJECTS: readonly SubjectId[] = [
  'turkce',
  'matematik',
  'fen_bilimleri',
  'sosyal_bilgiler',
  'din_kulturu',
  'ingilizce'
] as const;

/**
 * Verilen sınıf ve branşın geçerli bir MEB resmi ortaokul kombinasyonu olup olmadığını denetler.
 */
export function isValidMiddleSchoolCombination(grade: number, subjectId: string): boolean {
  return (
    VALID_MIDDLE_SCHOOL_GRADES.includes(grade as GradeLevel) &&
    VALID_MIDDLE_SCHOOL_SUBJECTS.includes(subjectId as SubjectId)
  );
}

/**
 * Özel ders kitabı yönergesi bulunmayan fakat resmi müfredatta yer alan
 * ortaokul dersleri için eski motorun (8f82edf) davranışıyla bire bir uyumlu
 * standart generic prompt kütük girdisi üretir.
 */
export function createGenericPromptEntry(grade: GradeLevel, subjectId: SubjectId): PromptRegistryEntry {
  return {
    grade,
    subjectId,
    directives: '',
    supportsAlternativeAnswers: false,
    version: '1.0-generic',
    isGeneric: true
  };
}
