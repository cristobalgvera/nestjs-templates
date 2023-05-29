import { ApiHeaderOptions } from '@nestjs/swagger';
import { BankStandardRequestHeadersDto } from '../dto';

export type BankStandardHeadersOptions = Readonly<
  ApiHeaderOptions & {
    name: keyof BankStandardRequestHeadersDto;
  }
>;
