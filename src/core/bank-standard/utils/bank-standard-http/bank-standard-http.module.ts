import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Logger, Module } from '@nestjs/common';
import {
  HTTP_CONFIG_OPTIONS,
  HttpConfigOptions,
  HttpConfigService,
} from './http-config';

@Module({})
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

  /**
   * @description
   *
   * Make available the custom `HttpModule` inside a feature module
   * that can not obtain it through the global scope.
   *
   * Commonly, you simply need to import the `BankStandardHttpModule` using
   * the `BankStandardHttpModule#forRoot` method in the main module,
   * but in some cases, like when you are using extensive usage of `DI`,
   * you will need to import the `BankStandardHttpModule` in the feature module.
   *
   * ---
   *
   * ```typescript
   * @Module({
   *   imports: [BankStandardHttpModule.forFeature()],
   *   providers: [{ provide: ABSTRACT_SERVICE_TOKEN, useClass: ConcreteService }],
   *   exports: [ABSTRACT_SERVICE_TOKEN],
   * })
   * export class CustomModule {}
   * ```
   */
  static forFeature(): DynamicModule {
    return {
      module: BankStandardHttpModule,
      imports: [BankStandardHttpModule],
      exports: [BankStandardHttpModule],
    };
  }
}
