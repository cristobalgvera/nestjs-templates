import { SERVICE_DOMAIN_NAME_CODE } from '@core/bank-standard/constants';
import {
  BadRequestException,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { isObject } from 'class-validator';
import { Request } from 'express';

@Injectable()
export class BankStandardRequestMiddleware implements NestMiddleware<Request> {
  constructor(
    @Inject(SERVICE_DOMAIN_NAME_CODE)
    private readonly serviceDomainNameCode: string,
  ) {}

  use(request: Request, _: any, next: () => void) {
    const body = request.body;

    if (!isObject(body) || !Object.keys(body).length) return next();

    const DATA_KEY = `Request${this.serviceDomainNameCode}`;

    if (!(DATA_KEY in body))
      throw new BadRequestException(
        `Request${this.serviceDomainNameCode} is missing`,
      );

    request.body = (body as any)[DATA_KEY];

    next();
  }
}
