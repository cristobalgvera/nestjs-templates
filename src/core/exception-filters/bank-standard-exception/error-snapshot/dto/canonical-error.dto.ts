import { CanonicalErrorType } from '../constants';

export type CanonicalErrorDto = {
  code?: string;
  description: string | string[];
  type: CanonicalErrorType;
};
