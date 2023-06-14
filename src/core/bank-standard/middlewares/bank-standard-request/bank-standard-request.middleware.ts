import { SERVICE_DOMAIN_NAME_CODE } from '@core/bank-standard/constants';
import {
  BadRequestException,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { isObject } from 'class-validator';
import { Request, Response } from 'express';

@Injectable()
export class BankStandardRequestMiddleware implements NestMiddleware<Request> {
  constructor(
    @Inject(SERVICE_DOMAIN_NAME_CODE)
    private readonly serviceDomainNameCode: string,
  ) {}

  use(request: Request, _: Response, next: () => void) {
    const body: unknown = request.body;

    if (!isObject(body) || !Object.keys(body).length) return next();

    const DATA_KEY = `Request${this.serviceDomainNameCode}` as const;

    if (!this.bodyHasKey(body, DATA_KEY))
      throw new BadRequestException(
        `Request${this.serviceDomainNameCode} is missing`,
      );

    request.body = body[DATA_KEY];

    next();
  }

  private bodyHasKey<TKey extends string>(
    body: object,
    key: TKey,
  ): body is object & Record<TKey, unknown> {
    return key in body;
  }
}
