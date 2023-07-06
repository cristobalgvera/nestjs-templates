export type Environment = Readonly<{
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  IS_SWAGGER_ENABLED: boolean;
}>;
