export type GenericErrorResponseDto = {
  status: number;
  error: string;
  detail: string | object;
};
