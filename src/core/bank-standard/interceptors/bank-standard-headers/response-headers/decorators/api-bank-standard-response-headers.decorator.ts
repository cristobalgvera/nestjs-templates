import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels } from '@nestjs/swagger';
import { ResponseHeadersDto } from '../dto';

export function ApiBankStandardResponseHeaders() {
  // FIX: Add API response decorator
  return applyDecorators(ApiExtraModels(ResponseHeadersDto));
}
