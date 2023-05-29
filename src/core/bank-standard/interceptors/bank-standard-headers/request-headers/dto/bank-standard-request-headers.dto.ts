import { Expose } from 'class-transformer';

export class BankStandardRequestHeadersDto {
  @Expose()
  'consumer-sys-code': string;

  @Expose()
  'consumer-enterprise-code': string;

  @Expose()
  'consumer-country-code': string;

  @Expose()
  'trace-client-req-timestamp': Date;

  @Expose()
  'trace-source-id': string;

  @Expose()
  'trace-event-id'?: string;

  @Expose()
  'channel-name': string;

  @Expose()
  'channel-mode': string;
}
