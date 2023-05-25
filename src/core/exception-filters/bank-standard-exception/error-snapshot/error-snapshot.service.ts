import { HttpStatus, Injectable } from '@nestjs/common';
import { BankStandardErrorResponseDto } from './dto';
import { ErrorSnapshotHelperService } from './error-snapshot-helper.service';

@Injectable()
export class ErrorSnapshotService {
  constructor(private readonly helperService: ErrorSnapshotHelperService) {}

  getSnapshot(
    httpStatus: HttpStatus,
    exception: Error,
  ): BankStandardErrorResponseDto {
    const code = this.helperService.getCode(httpStatus)?.toString();
    const description = this.helperService.getDescription(exception);
    const type = this.helperService.getType(httpStatus, exception);

    return {
      Result: {
        status: 'ERROR',
        CanonicalError: { code, description, type },
        SourceError: {
          code,
          description,
          ErrorSourceDetail: { source: 'CHK' },
        },
      },
    };
  }
}
