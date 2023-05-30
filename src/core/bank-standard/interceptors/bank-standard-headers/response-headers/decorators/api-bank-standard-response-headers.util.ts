import { HeaderObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ResponseHeadersDto } from '../dto';

type BankStandardResponseHeaders = Record<
  keyof ResponseHeadersDto,
  HeaderObject
>;

/**
 * HACK: The decorator `@ApiResponse` can be use just once per response.
 * This function allows to add the Bank Standard Response Headers to the response
 * in any place the decorator `@ApiResponse` is used.
 * ---
 * Add directly to Response Headers' API Response decorator (modularize it).
 */
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
    'Trace-Source-Id': {
      description:
        'Unique identifier of the execution, that identifies the consumer event',
      schema: { type: 'string' },
    },
    'Local-Transaction-Id': {
      description: 'Internal platform identifier',
      schema: { type: 'string' },
    },
  };
}
