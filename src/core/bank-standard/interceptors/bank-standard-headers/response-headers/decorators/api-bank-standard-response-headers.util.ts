import { HeaderObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ResponseHeadersDto } from '../dto';

type BankStandardResponseHeaders = Record<
  keyof ResponseHeadersDto,
  HeaderObject
>;

// FIX: Add directly to Response Headers' API response decorator
export function getBankStandardResponseHeaders(): BankStandardResponseHeaders {
  return {
    'Trace-Req-Timestamp': {
      description: 'Request timestamp',
      schema: { type: 'date' },
    },
    'Trace-Rsp-Timestamp': {
      description: 'Response timestamp',
      schema: { type: 'date' },
    },
    'Trace-Correlation-Id': {
      description:
        'Unique identification code to correlate non-related execution instances',
      schema: { type: 'string' },
    },
    'Trace-Conversation-Id': {
      description:
        'Identification code that allows to map the response in asynchronous environments',
      schema: { type: 'string' },
    },
    'Trace-Correlation-Event-Id': {
      description:
        'Unique execution identification code, which identifies the conversation',
      schema: { type: 'string' },
    },
  };
}
