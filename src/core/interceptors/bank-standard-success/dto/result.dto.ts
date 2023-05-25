import { ResultStatus } from '../constants';

export type ResultDto = Readonly<{
  // FIX: Remove `description` property if it's not used
  description: '';
  status: ResultStatus;
}>;
