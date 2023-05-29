export const ResultStatus = {
  OK: 'OK',
} as const;

export type ResultStatus = keyof typeof ResultStatus;
