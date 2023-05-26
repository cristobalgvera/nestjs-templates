import { ResultStatus } from '../constants';
import { CanonicalErrorDto } from './canonical-error.dto';
import { SourceErrorDto } from './source-error.dto';

export type BankStandardErrorResponseDto = Readonly<{
  Result: Readonly<{
    status: ResultStatus;
    CanonicalError: CanonicalErrorDto;
    SourceError: SourceErrorDto;
  }>;
}>;
