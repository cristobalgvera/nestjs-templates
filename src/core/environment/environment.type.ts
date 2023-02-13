import { Transform } from 'class-transformer';

export class Environment {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  ENABLE_SWAGGER: boolean;

  /**
   * In .env file:
   * IP_WHITELIST_EXAMPLE=["126.0.0.1","10.0.0.24"]
   */
  @Transform(({ value }) => JSON.parse(value))
  IP_WHITELIST_EXAMPLE: string[];
}
