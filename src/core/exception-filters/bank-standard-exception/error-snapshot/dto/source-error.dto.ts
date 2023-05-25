export type SourceErrorDto = {
  code?: string;
  description: string | string[];
  ErrorSourceDetail: {
    source: 'CHK';
  };
};
