import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import {
  HTTP_CONFIG_OPTIONS,
  HttpConfigOptions,
  HttpConfigOptionsHeaders,
} from './http-config-options.dto';

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  constructor(
    @Inject(HTTP_CONFIG_OPTIONS)
    private readonly httpConfigOptions: HttpConfigOptions,
    @Inject(REQUEST)
    private readonly request: Request,
    private readonly logger: Logger,
  ) {}

  createHttpOptions(): HttpModuleOptions {
    return {
      headers: this.getHeaders(),
      transformResponse: (data, headers) => {
        this.logger.log(
          `HTTP data: ${JSON.stringify(data)}, with headers: ${JSON.stringify(
            headers.toJSON(),
          )}`,
        );

        return data;
      },
    };
  }

  private getHeaders(): HttpConfigOptionsHeaders {
    const { headers } = this.httpConfigOptions;

    return {
      ...headers,
      'trace-source-id': this.getHeaderOrThrow('Trace-Source-Id'),
      'trace-client-req-timestamp': this.getHeaderOrThrow(
        'Trace-Client-Req-Timestamp',
      ),
    };
  }

  private getHeaderOrThrow(headerName: string): string {
    const header = this.request.get(headerName);

    if (!header)
      throw new BadRequestException(`Header ${headerName} is missing`);

    return header;
  }
}
