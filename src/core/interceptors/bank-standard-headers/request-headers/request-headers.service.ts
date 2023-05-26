import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  BankStandardRequestHeadersDto,
  bankStandardRequestHeadersSchema,
} from './dto';

@Injectable()
export class RequestHeadersService {
  validateHeaders(requestHeaders: Record<string, unknown>) {
    const bankStandardRequestHeadersDto = plainToInstance(
      BankStandardRequestHeadersDto,
      requestHeaders,
      { enableImplicitConversion: true },
    );

    const validation = bankStandardRequestHeadersSchema.validate(
      bankStandardRequestHeadersDto,
      { allowUnknown: true, abortEarly: false },
    );

    if (validation.error)
      throw new BadRequestException(validation.error.message);

    return bankStandardRequestHeadersDto;
  }
}
