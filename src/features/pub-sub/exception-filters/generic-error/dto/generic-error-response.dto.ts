export interface GenericErrorResponseDto {
  status: number;
  error: string;
  detail: string | object;
}
