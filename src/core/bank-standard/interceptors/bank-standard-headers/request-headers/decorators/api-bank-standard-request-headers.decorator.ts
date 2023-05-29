import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiHeaders } from '@nestjs/swagger';
import { BankStandardRequestHeadersDto } from '../dto';
import { bankStandardHeaders } from './api-bank-standard-headers.object';

export function ApiBankStandardRequestHeaders() {
  return applyDecorators(
    ApiExtraModels(BankStandardRequestHeadersDto),
    ApiHeaders(bankStandardHeaders),
  );
}
