import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorSnapshotService } from './error-snapshot';
import { isHttpException } from './utils';

@Catch()
export class BankStandardExceptionFilter<TException extends Error = Error>
  implements ExceptionFilter<TException>
{
  constructor(
    private readonly logger: Logger,
    private readonly errorSnapshotService: ErrorSnapshotService,
  ) {}

  catch(exception: TException, host: ArgumentsHost) {
    this.logger.error(
      exception.message,
      exception.stack,
      BankStandardExceptionFilter.name,
    );

    const status = this.getStatus(exception);

    const errorSnapshot = this.errorSnapshotService.getSnapshot(
      status,
      exception,
    );

    const response = host.switchToHttp().getResponse<Response<unknown>>();
    response.status(status).json(errorSnapshot);
  }

  private getStatus(exception: TException): HttpStatus {
    return isHttpException(exception)
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
