export class Environment {
  readonly NODE_ENV: 'development' | 'production' | 'test';
  readonly PORT: number;
  readonly IS_SWAGGER_ENABLED: boolean;
  readonly DB_HOST?: string;
  readonly DB_NAME: string;
  readonly DB_PASSWORD: string;
  readonly DB_PORT: number;
  readonly DB_USERNAME: string;
  readonly DB_SOCKET_PATH?: string;
}
