import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  PreconditionFailedException,
  UnauthorizedException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { Observable, throwError } from 'rxjs';
import { ErrorService, HandleErrorOptions } from '../error-service.abstract';

/**
 * This class is responsible for handling errors that are thrown by the
 * HttpService provided by `@nestjs/axios`.
 *
 * It will log the error and then throw a NestJS exception based on the
 * status code of the error.
 *
 * ---
 *
 * Usage example:
 *
 * this.httpService.post('http://localhost:8080').pipe(
 *   catchError((error) =>
 *     this.httpErrorService.handleError({
 *       error,
 *       caller: MyCallerClass,
 *       method: this.myCallerMethod,
 *     }),
 *   ),
 * );
 */
@Injectable()
export class HttpErrorService extends ErrorService<
  AxiosError,
  Observable<never>
> {
  constructor(private readonly logger: Logger) {
    super();
  }

  protected override logError({
    caller,
    method,
    error,
  }: HandleErrorOptions<AxiosError<unknown, any>>): void {
    this.logger.error(
      `[${caller.name}: ${method.name}] ${error.message}`,
      error.response?.data,
    );
  }

  protected validateError(
    error: AxiosError<unknown, any>,
  ): Observable<never> | undefined {
    if (!error.isAxiosError)
      return throwError(() => Error(`Invalid error type. Expected AxiosError`));
  }

  protected throwException(error: AxiosError<unknown, any>): Observable<never> {
    return throwError(() => {
      if (!error.response) throw new BadGatewayException(error.message);

      switch (error.response.status) {
        case HttpStatus.BAD_REQUEST:
          throw new BadRequestException(error.response.data);
        case HttpStatus.UNAUTHORIZED:
          throw new UnauthorizedException(error.response.data);
        case HttpStatus.NOT_FOUND:
          throw new NotFoundException(error.response.data);
        case HttpStatus.PAYMENT_REQUIRED:
          throw new HttpException(
            error.response.data as Record<string, unknown>,
            HttpStatus.PAYMENT_REQUIRED,
          );
        case HttpStatus.CONFLICT:
          throw new ConflictException(error.response.data);
        case HttpStatus.PRECONDITION_FAILED:
          throw new PreconditionFailedException(error.response.data);
        default:
          throw new BadGatewayException(error.response.data);
      }
    });
  }
}
