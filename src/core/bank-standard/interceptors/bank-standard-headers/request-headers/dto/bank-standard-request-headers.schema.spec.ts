import { BankStandardRequestHeadersDto } from './bank-standard-request-headers.dto';
import { bankStandardRequestHeadersSchema } from './bank-standard-request-headers.schema';

describe('BankStandardRequestHeadersSchema', () => {
  let validHeaders: BankStandardRequestHeadersDto;

  beforeEach(() => {
    validHeaders = {
      'consumer-sys-code': 'consumer_sys_code',
      'consumer-enterprise-code': 'consumer_enterprise_code',
      'consumer-country-code': 'consumer_country_code',
    };
  });

  describe('when the headers are valid', () => {
    it.each<Partial<BankStandardRequestHeadersDto> | Record<string, unknown>>([
      { 'trace-client-req-timestamp': new Date(1000) },
      { 'trace-process-id': 'trace_process_id' },
      { 'trace-event-id': 'trace_event_id' },
      { 'trace-source-id': 'trace_source_id' },
      { 'trace-conversation-id': 'trace_conversation_id' },
      { 'trace-service-code': 'trace_service_code' },
      { 'trace-service-name': 'trace_service_name' },
      { 'trace-service-operation': 'trace_service_operation' },
      { 'channel-name': 'channel_name' },
      { 'channel-mode': 'channel_mode' },
      { 'trace-process-id': '' },
      { 'trace-event-id': '' },
      { 'trace-source-id': '' },
      { 'trace-conversation-id': '' },
      { 'trace-service-code': '' },
      { 'trace-service-name': '' },
      { 'trace-service-operation': '' },
      { 'channel-name': '' },
      { 'channel-mode': '' },
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
      { 'trace-client-req-timestamp': 'not_date' },
      { 'trace-process-id': 123 },
      { 'trace-event-id': 123 },
      { 'trace-source-id': 123 },
      { 'trace-conversation-id': 123 },
      { 'trace-service-code': 123 },
      { 'trace-service-name': 123 },
      { 'trace-service-operation': 123 },
      { 'channel-name': 123 },
      { 'channel-mode': 123 },
    ])('should invalidate if headers has %p', (partialHeaders) => {
      const headers = { ...validHeaders, ...partialHeaders };

      const validation = bankStandardRequestHeadersSchema.validate(headers);

      expect(validation.error).toBeDefined();
    });
  });
});
