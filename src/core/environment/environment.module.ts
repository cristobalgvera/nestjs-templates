import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentService } from './environment.service';
import { validateEnvironment } from './validation';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnvironment,
      cache: true,
    }),
  ],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
