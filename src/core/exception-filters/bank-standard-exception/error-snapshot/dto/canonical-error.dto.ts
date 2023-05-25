import { CanonicalErrorType } from '../constants';

export type CanonicalErrorDto = Readonly<{
  code?: string;
  description: string | string[];
  type: CanonicalErrorType;
}>;
