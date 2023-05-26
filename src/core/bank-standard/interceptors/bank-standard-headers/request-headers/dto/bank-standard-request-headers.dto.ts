import { Expose } from 'class-transformer';

export class BankStandardRequestHeadersDto {
  @Expose()
  'consumer-sys-code': string;

  @Expose()
  'consumer-enterprise-code': string;

  @Expose()
  'consumer-country-code': string;

  @Expose()
  'trace-client-req-timestamp'?: Date;

  @Expose()
  'trace-process-id'?: string;

  @Expose()
  'trace-event-id'?: string;

  @Expose()
  'trace-source-id'?: string;

  @Expose()
  'trace-conversation-id'?: string;

  @Expose()
  'trace-service-code'?: string;

  @Expose()
  'trace-service-name'?: string;

  @Expose()
  'trace-service-operation'?: string;

  @Expose()
  'channel-name'?: string;

  @Expose()
  'channel-mode'?: string;
}
