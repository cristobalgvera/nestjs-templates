import { EnvironmentModule } from '@core/environment';
import { GCPubSubMiddleware } from '@core/middlewares';
import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

@Module({
  imports: [EnvironmentModule],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GCPubSubMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.POST,
    });
  }
}
