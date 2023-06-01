import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GenericErrorFilter } from './exception-filters';
import { GCPubSubMiddleware } from './middlewares';

@Module({
  providers: [
    { provide: Logger, useValue: new Logger(PubSubModule.name) },
    { provide: APP_FILTER, useClass: GenericErrorFilter },
  ],
})
export class PubSubModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GCPubSubMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.POST,
    });
  }
}
