import { Inject, Injectable, Logger } from '@nestjs/common';
import { ResponseHeadersDto } from './dto';
import {
  RESPONSE_HEADERS_SERVICE_OPTIONS,
  ResponseHeadersServiceOptions,
} from './response-headers-service-options.dto';

interface GetHeadersOptions {
  requestDateTime: Date;
  traceSourceId: string;
}

@Injectable()
export class ResponseHeadersService {
  constructor(
    @Inject(RESPONSE_HEADERS_SERVICE_OPTIONS)
    private readonly responseHeadersServiceOptions: ResponseHeadersServiceOptions,
    private readonly logger: Logger,
  ) {}

  getHeaders(options: GetHeadersOptions): ResponseHeadersDto {
    const { requestDateTime, traceSourceId } = options;

    const headers: ResponseHeadersDto = {
      'Trace-Req-Timestamp': requestDateTime,
      'Trace-Rsp-Timestamp': new Date(),
      'Trace-Source-Id': traceSourceId,
      ...this.responseHeadersServiceOptions,
    };

    this.logger.log(`Response headers: ${JSON.stringify(headers)}`);

    return headers;
  }
}
