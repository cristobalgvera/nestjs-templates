import { DynamicModule, Module } from '@nestjs/common';
import { BankStandardModuleOptions } from './bank-standard-module-options.dto';
import { BankStandardExceptionModule } from './exception-filters';
import {
  BankStandardHeadersModule,
  BankStandardResponseModule,
} from './interceptors';
import { BankStandardRequestModule } from './middlewares';

@Module({})
export class BankStandardModule {
  static forRoot(options: BankStandardModuleOptions): DynamicModule {
    const { headers } = options;

    return {
      module: BankStandardModule,
      imports: [
        BankStandardExceptionModule,
        BankStandardHeadersModule.forRoot(headers),
        BankStandardRequestModule,
        BankStandardResponseModule,
      ],
    };
  }
}
