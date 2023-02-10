import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from './environment.type';

@Injectable()
export class EnvironmentService {
  constructor(
    private readonly configService: ConfigService<Environment, true>,
  ) {}

  getEnvironmentValue<Key extends keyof Environment>(
    key: Key,
  ): Environment[Key] {
    return this.configService.getOrThrow(key);
  }

  isSwaggerEnabled(): boolean {
    return this.getEnvironmentValue('ENABLE_SWAGGER');
  }

  isProd(): boolean {
    return this.getEnvironmentValue('NODE_ENV') === 'production';
  }
}
