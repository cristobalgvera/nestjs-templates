import { CanonicalErrorType } from '../types';

export type CanonicalErrorDto = {
  code?: string;
  description: string | string[];
  type: CanonicalErrorType;
};
