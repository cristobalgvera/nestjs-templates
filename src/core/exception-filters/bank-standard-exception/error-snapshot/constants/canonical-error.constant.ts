export const CanonicalErrorType = {
  NEG: 'NEG',
  TEC: 'TEC',
  SEG: 'SEG',
} as const;

export type CanonicalErrorType = keyof typeof CanonicalErrorType;
