import { Injectable } from '@nestjs/common';
import { ResponseHeadersDto } from './dto';

type GetHeadersOptions = {
  requestDateTime: Date;
  traceSourceId: string;
};

@Injectable()
export class ResponseHeadersService {
  getHeaders(options: GetHeadersOptions): ResponseHeadersDto {
    const { requestDateTime, traceSourceId } = options;

    return {
      'Trace-Req-Timestamp': requestDateTime,
      'Trace-Rsp-Timestamp': new Date(),
      'Trace-Source-Id': traceSourceId,
      // FIX: Define header
      'Local-Transaction-Id': 'TO_BE_DEFINED',
    };
  }
}
