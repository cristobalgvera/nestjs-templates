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
import { ErrorService, HandleErrorOptions } from '../error-service.interface';

@Injectable()
export class HttpErrorService
  implements ErrorService<AxiosError, Observable<never>>
{
  constructor(private readonly logger: Logger) {}

  /**
   * This method is responsible for handling errors that are thrown by the
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
   *       methodName: this.myCallerMethod.name,
   *     }),
   *   ),
   * );
   */
  handleError({
    error,
    caller,
    methodName,
  }: HandleErrorOptions<AxiosError>): Observable<never> {
    if (!error.isAxiosError)
      throw Error(`Invalid error type. Expected AxiosError`);

    this.logger.error(
      `[${caller.name}: ${methodName}] ${error.message}`,
      error.stack,
    );

    return this.throwException(error);
  }

  private throwException(error: AxiosError): Observable<never> {
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
            error.response.data!,
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
