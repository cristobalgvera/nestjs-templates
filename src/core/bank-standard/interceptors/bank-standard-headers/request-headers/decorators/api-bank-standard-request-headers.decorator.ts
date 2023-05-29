import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiHeaders } from '@nestjs/swagger';
import { BankStandardRequestHeadersDto } from '../dto';
import { BankStandardHeadersOptions } from './api-bank-standard-headers-options.dto';

export function ApiBankStandardRequestHeaders() {
  const headers: BankStandardHeadersOptions[] = [
    { name: 'consumer-sys-code', required: true },
    { name: 'consumer-enterprise-code', required: true },
    { name: 'consumer-country-code', required: true },
    { name: 'trace-client-req-timestamp', schema: { format: 'date' } },
    { name: 'trace-process-id' },
    { name: 'trace-event-id' },
    { name: 'trace-source-id' },
    { name: 'trace-conversation-id' },
    { name: 'trace-service-code' },
    { name: 'trace-service-name' },
    { name: 'trace-service-operation' },
    { name: 'channel-name' },
    { name: 'channel-mode' },
  ];

  return applyDecorators(
    ApiExtraModels(BankStandardRequestHeadersDto),
    ApiHeaders(headers),
  );
}
