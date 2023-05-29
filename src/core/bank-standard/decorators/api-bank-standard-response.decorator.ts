import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiBankStandardRequestHeaders,
  ApiBankStandardResponseHeaders,
  ApiBankStandardSuccessResponse,
} from '../interceptors';
import { ApiBankStandardResponseOptions } from './api-bank-standard-response-options.dto';

export function ApiBankStandardResponse<TType extends Type<unknown>>(
  type: TType,
  options: ApiBankStandardResponseOptions = {},
) {
  return applyDecorators(
    ApiBankStandardRequestHeaders(),
    ApiBankStandardResponseHeaders(),
    ApiBankStandardSuccessResponse(type, options),
  );
}
