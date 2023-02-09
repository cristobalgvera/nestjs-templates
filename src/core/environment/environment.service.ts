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

  get isSwaggerEnabled(): boolean {
    return this.configService.getOrThrow('ENABLE_SWAGGER');
  }

  get isProd(): boolean {
    return this.configService.getOrThrow('NODE_ENV') === 'production';
  }
}
