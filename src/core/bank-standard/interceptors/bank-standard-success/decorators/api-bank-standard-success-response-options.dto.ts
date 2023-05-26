import { Type, HttpStatus } from '@nestjs/common';

export type ApiBankStandardSuccessResponseOptions<TType extends Type<unknown>> =
  {
    type: TType;
    isArray?: boolean;
    description?: string;
    status?: HttpStatus;
  };
