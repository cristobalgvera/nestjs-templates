export class Environment {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  ENABLE_SWAGGER: boolean;
  DB_HOST?: string;
  DB_NAME: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_SOCKET_PATH?: string;
}
