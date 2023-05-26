export class BankStandardRequestHeadersDto {
  'consumer-sys-code': string;
  'consumer-enterprise-code': string;
  'consumer-country-code': string;
  'trace-client-req-timestamp'?: Date;
  'trace-process-id'?: string;
  'trace-event-id'?: string;
  'trace-source-id'?: string;
  'trace-conversation-id'?: string;
  'trace-service-code'?: string;
  'trace-service-name'?: string;
  'trace-service-operation'?: string;
  'channel-name'?: string;
  'channel-mode'?: string;
}
