import { HttpStatus, Injectable } from '@nestjs/common';
import { ErrorSnapshotHelperService } from './error-snapshot-helper.service';
import { ErrorResponseDto } from './dto';

@Injectable()
export class ErrorSnapshotService {
  constructor(private readonly helperService: ErrorSnapshotHelperService) {}

  getSnapshot(httpStatus: HttpStatus, exception: Error): ErrorResponseDto {
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
