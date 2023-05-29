import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels } from '@nestjs/swagger';
import { ResponseHeadersDto } from '../dto';

export function ApiBankStandardResponseHeaders() {
  return applyDecorators(ApiExtraModels(ResponseHeadersDto));
}
