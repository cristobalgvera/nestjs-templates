import { Injectable } from '@nestjs/common';
import { ResponseHeadersDto } from './dto';

type GetHeadersOptions = {
  requestDateTime: Date;
  traceConversationId?: string;
};

@Injectable()
export class ResponseHeadersService {
  getHeaders(options: GetHeadersOptions): ResponseHeadersDto {
    const { requestDateTime, traceConversationId } = options;

    return {
      'Trace-Req-Timestamp': requestDateTime,
      'Trace-Conversation-Id': traceConversationId,
      'Trace-Rsp-Timestamp': new Date(),
      // FIX: Define header
      'Trace-Correlation-Id': 'TO_BE_DEFINED',
      // FIX: Define header
      'Trace-Correlation-Event-Id': 'TO_BE_DEFINED',
    };
  }
}
