import { HttpStatus } from '@nestjs/common';

export type ApiBankStandardSuccessResponseOptions = {
  isArray?: boolean;
  description?: string;
  status?: HttpStatus;
};
