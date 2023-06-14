import { Transform } from 'class-transformer';

export class Environment {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  IS_SWAGGER_ENABLED: boolean;
  PUB_SUB_PROJECT_ID: string;
  PUB_SUB_EMULATOR_HOST?: string;
  PUB_SUB_SUBSCRIPTION?: string;
  PUB_SUB_PUSH_ENDPOINT?: string;
  PUB_SUB_TOPIC: string;
  PUB_SUB_PATTERN: string;
  PUB_SUB_CLIENT_EMAIL?: string;

  @Transform(({ value }): string =>
    typeof value === 'string'
      ? Buffer.from(value, 'base64').toString('ascii')
      : value,
  )
  PUB_SUB_PRIVATE_KEY?: string;
}
