import { Transform } from 'class-transformer';

export class Environment {
  readonly NODE_ENV: 'development' | 'production' | 'test';
  readonly PORT: number;
  readonly IS_SWAGGER_ENABLED: boolean;
  readonly PUB_SUB_PROJECT_ID: string;
  readonly PUB_SUB_EMULATOR_HOST?: string;
  readonly PUB_SUB_SUBSCRIPTION?: string;
  readonly PUB_SUB_PUSH_ENDPOINT?: string;
  readonly PUB_SUB_TOPIC: string;
  readonly PUB_SUB_PATTERN: string;
  readonly PUB_SUB_CLIENT_EMAIL?: string;

  @Transform(({ value }): string =>
    typeof value === 'string'
      ? Buffer.from(value, 'base64').toString('ascii')
      : value,
  )
  readonly PUB_SUB_PRIVATE_KEY?: string;
}
