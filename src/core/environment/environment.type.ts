import { Transform } from 'class-transformer';

export class Environment {
  readonly NODE_ENV: 'development' | 'production' | 'test';
  readonly PORT: number;
  readonly IS_SWAGGER_ENABLED: boolean;

  /**
   * In .env file:
   * IP_WHITELIST_EXAMPLE=["126.0.0.1","10.0.0.24"]
   */
  @Transform(({ value }: { value: string }): unknown => JSON.parse(value))
  readonly IP_WHITELIST_EXAMPLE: string[];
}
