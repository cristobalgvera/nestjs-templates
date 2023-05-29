import { Type } from '@nestjs/common';
import { ApiBankStandardSuccessResponseOptions } from '../interceptors';

export type ApiBankStandardOptions<TType extends Type<unknown>> = Readonly<
  ApiBankStandardSuccessResponseOptions<TType>
>;
