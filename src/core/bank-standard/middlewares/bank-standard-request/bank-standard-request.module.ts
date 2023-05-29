import { SERVICE_DOMAIN_NAME_CODE } from '@core/bank-standard/constants';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { BankStandardRequestMiddleware } from './bank-standard-request.middleware';

@Module({
  providers: [
    { provide: SERVICE_DOMAIN_NAME_CODE, useValue: SERVICE_DOMAIN_NAME_CODE },
  ],
})
export class BankStandardRequestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BankStandardRequestMiddleware)
      .exclude({ path: '*', method: RequestMethod.GET })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
