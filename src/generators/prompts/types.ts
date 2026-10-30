import { GradeLevel, SubjectId } from '../../types';

export interface PromptRegistryEntry {
  grade: GradeLevel;
  subjectId: SubjectId;
  directives: string;
  supportsAlternativeAnswers: boolean;
  version: string;
  isGeneric?: boolean;
}

export interface LiveExamPromptParams {
  grade: GradeLevel;
  subjectId: SubjectId;
  targetCount: number;
  distributionsText: string;
  avoidDirectives: string;
  difficultyPlanText: string;
  variationToken?: string;
  variationIndex?: number;
}
