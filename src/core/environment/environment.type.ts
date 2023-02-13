export type Environment = {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  ENABLE_SWAGGER: boolean;
  REDISHOST: string;
  REDISPORT: number;
  REDISAUTH: string;
};
