import { Injectable, Logger } from '@nestjs/common';
import { ResponseHeadersDto } from './dto';

type GetHeadersOptions = {
  requestDateTime: Date;
  traceSourceId: string;
};

@Injectable()
export class ResponseHeadersService {
  constructor(private readonly logger: Logger) {}

  getHeaders(options: GetHeadersOptions): ResponseHeadersDto {
    const { requestDateTime, traceSourceId } = options;

    const headers: ResponseHeadersDto = {
      'Trace-Req-Timestamp': requestDateTime,
      'Trace-Rsp-Timestamp': new Date(),
      'Trace-Source-Id': traceSourceId,
      // FIX: Define header
      'Local-Transaction-Id': 'TO_BE_DEFINED',
    };

    this.logger.log(`Response headers: ${JSON.stringify(headers)}`);

    return headers;
  }
}
