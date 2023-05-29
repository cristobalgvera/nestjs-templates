import { Module } from '@nestjs/common';
import { BankStandardExceptionModule } from './exception-filters';
import {
  BankStandardHeadersModule,
  BankStandardResponseModule,
} from './interceptors';
import { BankStandardRequestModule } from './middlewares';

@Module({
  imports: [
    BankStandardExceptionModule,
    BankStandardHeadersModule,
    BankStandardRequestModule,
    BankStandardResponseModule,
  ],
})
export class BankStandardModule {}
