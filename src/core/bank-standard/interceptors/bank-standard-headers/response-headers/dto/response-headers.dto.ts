export class ResponseHeadersDto {
  'Trace-Req-Timestamp': Date;
  'Trace-Rsp-Timestamp': Date;
  'Trace-Conversation-Id'?: string;
  'Trace-Correlation-Event-Id': string;
  'Trace-Correlation-Id': string;
}
