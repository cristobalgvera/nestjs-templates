import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import {
  BankStandardRequestHeadersDto,
  RequestHeadersService,
} from './request-headers';
import { ResponseHeadersService } from './response-headers';

@Injectable()
export class BankStandardHeadersInterceptor implements NestInterceptor {
  constructor(
    private readonly requestHeadersService: RequestHeadersService,
    private readonly responseHeadersService: ResponseHeadersService,
    private readonly logger: Logger,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Observable<unknown> {
    const requestDateTime = new Date();

    const httpArgumentsHost = context.switchToHttp();
    const request = httpArgumentsHost.getRequest<Request>();
    const response = httpArgumentsHost.getResponse<Response>();

    const validatedHeaders = this.handleRequest(request);

    return next.handle().pipe(
      tap(() => {
        this.handleResponse(response, requestDateTime, validatedHeaders);
      }),
    );
  }

  private handleRequest(request: Request) {
    const validatedHeaders = this.requestHeadersService.validateHeaders(
      request.headers,
    );

    this.logger.log(`Request headers: ${JSON.stringify(validatedHeaders)}`);

    return validatedHeaders;
  }

  private handleResponse(
    response: Response,
    requestDateTime: Date,
    validatedHeaders: BankStandardRequestHeadersDto,
  ) {
    const traceSourceId = validatedHeaders['trace-source-id'];

    const traceabilityHeaders = this.responseHeadersService.getHeaders({
      requestDateTime,
      traceSourceId,
    });

    response.set(traceabilityHeaders);
  }
}
