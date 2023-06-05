export type Environment = {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  IS_SWAGGER_ENABLED: boolean;
  FIREBASE_PROJECT_ID: string;
};
