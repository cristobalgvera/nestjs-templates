import { Module } from '@nestjs/common';
import { BankStandardExceptionModule } from './exception-filters';
import {
  BankStandardHeadersModule,
  BankStandardSuccessModule,
} from './interceptors';
import { BankStandardRequestModule } from './middlewares';

@Module({
  imports: [
    BankStandardExceptionModule,
    BankStandardHeadersModule,
    BankStandardRequestModule,
    BankStandardSuccessModule,
  ],
})
export class BankStandardModule {}
