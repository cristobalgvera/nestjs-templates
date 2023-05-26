import { ErrorSourceDetailSource } from '../constants';

export type SourceErrorDto = Readonly<{
  code?: string;
  description: string | string[];
  ErrorSourceDetail: Readonly<{
    source: ErrorSourceDetailSource;
  }>;
}>;
