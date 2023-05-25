import { CanonicalErrorDto } from './canonical-error.dto';
import { SourceErrorDto } from './source-error.dto';

export type BankStandardErrorResponseDto = {
  Result: {
    status: 'ERROR';
    CanonicalError: CanonicalErrorDto;
    SourceError: SourceErrorDto;
  };
};
