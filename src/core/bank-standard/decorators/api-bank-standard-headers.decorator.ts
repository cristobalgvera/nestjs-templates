import { applyDecorators } from '@nestjs/common';
import {
  ApiBankStandardRequestHeaders,
  ApiBankStandardResponseHeaders,
} from '../interceptors';

export function ApiBankStandardHeaders() {
  return applyDecorators(
    ApiBankStandardRequestHeaders(),
    ApiBankStandardResponseHeaders(),
  );
}
