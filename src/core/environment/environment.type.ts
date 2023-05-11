export type Environment = {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  IS_SWAGGER_ENABLED: boolean;
  REDISHOST: string;
  REDISPORT: number;
  REDISAUTH: string;
};
