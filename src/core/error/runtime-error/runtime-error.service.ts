import { Injectable } from '@nestjs/common';
import { ErrorService } from '../error-service.abstract';

@Injectable()
export class RuntimeErrorService extends ErrorService {
  protected throwException(error: Error): never {
    throw error;
  }
}
