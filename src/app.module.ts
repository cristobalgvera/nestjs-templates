import { EnvironmentModule } from '@core/environment';
import { GenericErrorFilter } from '@core/exception-filters';
import { GCPubSubMiddleware } from '@core/middlewares';
import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [EnvironmentModule],
  providers: [
    { provide: Logger, useValue: new Logger(AppModule.name) },
    { provide: APP_FILTER, useClass: GenericErrorFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GCPubSubMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.POST,
    });
  }
}
