export const ResultStatus = {
  ERROR: 'ERROR',
} as const;

export type ResultStatus = keyof typeof ResultStatus;
