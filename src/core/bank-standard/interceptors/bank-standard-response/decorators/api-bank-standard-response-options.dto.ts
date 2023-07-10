import { HttpStatus } from '@nestjs/common';

export interface ApiBankStandardResponseOptions {
  isArray?: boolean;
  description?: string;
  status?: HttpStatus;
}
