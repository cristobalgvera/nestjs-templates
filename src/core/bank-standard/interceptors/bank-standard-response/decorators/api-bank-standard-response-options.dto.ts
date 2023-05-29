import { HttpStatus } from '@nestjs/common';

export type ApiBankStandardResponseOptions = {
  isArray?: boolean;
  description?: string;
  status?: HttpStatus;
};
