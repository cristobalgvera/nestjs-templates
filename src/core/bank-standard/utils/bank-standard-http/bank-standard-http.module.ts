import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Logger } from '@nestjs/common';
import {
  HTTP_CONFIG_OPTIONS,
  HttpConfigOptions,
  HttpConfigService,
} from './http-config';

export class BankStandardHttpModule {
  static forRoot(httpConfigOptions: HttpConfigOptions): DynamicModule {
    return {
      module: BankStandardHttpModule,
      global: true,
      imports: [
        HttpModule.registerAsync({
          useClass: HttpConfigService,
          extraProviders: [
            { provide: HTTP_CONFIG_OPTIONS, useValue: httpConfigOptions },
            {
              provide: Logger,
              useValue: new Logger(BankStandardHttpModule.name),
            },
          ],
        }),
      ],
      exports: [HttpModule],
    };
  }
}
