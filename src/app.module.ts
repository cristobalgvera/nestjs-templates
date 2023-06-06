import { EnvironmentModule, EnvironmentService } from '@core/environment';
import { Logger, Module } from '@nestjs/common';
import { FirestoreModule } from '@features/firestore';

@Module({
  imports: [
    EnvironmentModule,
    FirestoreModule.forRootAsync({
      imports: [EnvironmentModule],
      useFactory: (environmentService: EnvironmentService) => ({
        projectId: environmentService.get('FIRESTORE_PROJECT_ID'),
      }),
      inject: [EnvironmentService],
    }),
  ],
  providers: [{ provide: Logger, useValue: new Logger(AppModule.name) }],
})
export class AppModule {}
