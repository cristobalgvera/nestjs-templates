import { EnvironmentService } from '@core/environment';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private readonly environmentService: EnvironmentService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const sharedTypeOrmModuleOptions: TypeOrmModuleOptions = {
      type: 'mysql',
      port: this.environmentService.getEnvironmentValue('DB_PORT'),
      username: this.environmentService.getEnvironmentValue('DB_USERNAME'),
      password: this.environmentService.getEnvironmentValue('DB_PASSWORD'),
      database: this.environmentService.getEnvironmentValue('DB_NAME'),
      autoLoadEntities: true,
    };

    if (this.environmentService.isProd())
      return {
        ...sharedTypeOrmModuleOptions,
        socketPath:
          this.environmentService.getEnvironmentValue('DB_SOCKET_PATH'),
      };

    return {
      ...sharedTypeOrmModuleOptions,
      host: this.environmentService.getEnvironmentValue('DB_HOST'),
    };
  }
}
