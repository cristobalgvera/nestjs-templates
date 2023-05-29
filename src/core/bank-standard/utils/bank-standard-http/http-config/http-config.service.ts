import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
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
    const headers = this.getHeaders();

    return {
      headers,
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

  private getHeaders(): Partial<HttpConfigOptionsHeaders> {
    const { headers } = this.httpConfigOptions;

    const traceSourceId = this.request.get('Trace-Source-Id');
    const traceClientReqTimestamp = this.request.get(
      'Trace-Client-Req-Timestamp',
    );

    return {
      ...headers,
      'trace-source-id': traceSourceId,
      'trace-client-req-timestamp': traceClientReqTimestamp,
    };
  }
}
