export type Environment = {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  IS_SWAGGER_ENABLED: boolean;
  FIRESTORE_PROJECT_ID: string;
};
