import { ResultStatus } from '../constants';

export class ResultDto {
  // FIX: Remove `description` property if it's not used
  readonly description: '';
  readonly status: ResultStatus;
}
