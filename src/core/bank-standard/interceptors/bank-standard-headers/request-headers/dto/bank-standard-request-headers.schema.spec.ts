import { BankStandardRequestHeadersDto } from './bank-standard-request-headers.dto';
import { bankStandardRequestHeadersSchema } from './bank-standard-request-headers.schema';

describe('BankStandardRequestHeadersSchema', () => {
  let validHeaders: BankStandardRequestHeadersDto;

  beforeEach(() => {
    validHeaders = {
      'consumer-sys-code': 'consumer_sys_code',
      'consumer-enterprise-code': 'consumer_enterprise_code',
      'consumer-country-code': 'consumer_country_code',
      'trace-client-req-timestamp': new Date(1000),
      'trace-source-id': 'trace_source_id',
      'channel-mode': 'channel_mode',
      'channel-name': 'channel_name',
    };
  });

  describe('when the headers are valid', () => {
    it.each<Partial<BankStandardRequestHeadersDto> | Record<string, unknown>>([
      { 'trace-event-id': 'trace_event_id' },
      { 'trace-event-id': '' },
      { 'unknown-header': 'unknown_header' },
    ])('should properly validate %p', (partialHeaders) => {
      const headers = { ...validHeaders, ...partialHeaders };

      const validation = bankStandardRequestHeadersSchema.validate(headers);

      expect(validation.error).toBeUndefined();
    });
  });

  describe('when the headers are invalid', () => {
    it.each<Partial<Record<keyof BankStandardRequestHeadersDto, unknown>>>([
      { 'consumer-sys-code': undefined },
      { 'consumer-sys-code': '' },
      { 'consumer-sys-code': 123 },
      { 'consumer-enterprise-code': undefined },
      { 'consumer-enterprise-code': '' },
      { 'consumer-enterprise-code': 123 },
      { 'consumer-country-code': undefined },
      { 'consumer-country-code': '' },
      { 'consumer-country-code': 123 },
      { 'trace-client-req-timestamp': undefined },
      { 'trace-client-req-timestamp': 'not_date' },
      { 'trace-event-id': 123 },
      { 'trace-source-id': undefined },
      { 'trace-source-id': '' },
      { 'trace-source-id': 123 },
      { 'channel-name': undefined },
      { 'channel-name': '' },
      { 'channel-name': 123 },
      { 'channel-mode': undefined },
      { 'channel-mode': '' },
      { 'channel-mode': 123 },
    ])('should invalidate if headers has %p', (partialHeaders) => {
      const headers = { ...validHeaders, ...partialHeaders };

      const validation = bankStandardRequestHeadersSchema.validate(headers);

      expect(validation.error).toBeDefined();
    });
  });
});
