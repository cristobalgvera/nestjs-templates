import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiBankStandardRequestHeaders,
  ApiBankStandardResponseHeaders,
  ApiBankStandardSuccessResponse,
} from '../interceptors';
import { ApiBankStandardOptions } from './api-bank-standard-options.dto';

export function ApiBankStandard<TType extends Type<unknown>>(
  options: ApiBankStandardOptions<TType>,
) {
  return applyDecorators(
    ApiBankStandardRequestHeaders(),
    ApiBankStandardResponseHeaders(),
    ApiBankStandardSuccessResponse(options),
  );
}
