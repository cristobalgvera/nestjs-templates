import { Logger } from '@nestjs/common';
import { ResponseHeadersService } from './response-headers.service';
import {
  RESPONSE_HEADERS_SERVICE_OPTIONS,
  ResponseHeadersServiceOptions,
} from './response-headers-service-options.dto';
import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

describe('ResponseHeadersService', () => {
  let underTest: ResponseHeadersService;
  let logger: Logger;
  let responseHeadersServiceOptions: ResponseHeadersServiceOptions;

  beforeEach(async () => {
    responseHeadersServiceOptions = {
      'Local-Transaction-Id': 'local_transaction_id',
    };

    const module = await Test.createTestingModule({
      providers: [
        ResponseHeadersService,
        {
          provide: RESPONSE_HEADERS_SERVICE_OPTIONS,
          useValue: responseHeadersServiceOptions,
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    underTest = module.get(ResponseHeadersService);
    logger = module.get(Logger);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('getHeaders', () => {
    beforeEach(() => {
      jest.useFakeTimers({ doNotFake: ['performance'] }).setSystemTime(1000);
    });

    it('should return the response headers', () => {
      const actual = underTest.getHeaders({
        traceSourceId: 'trace_source_id',
        requestDateTime: new Date(2000),
      });

      expect(actual).toMatchInlineSnapshot(`
        {
          "Local-Transaction-Id": "local_transaction_id",
          "Trace-Req-Timestamp": 1970-01-01T00:00:02.000Z,
          "Trace-Rsp-Timestamp": 1970-01-01T00:00:01.000Z,
          "Trace-Source-Id": "trace_source_id",
        }
      `);
    });

    it('should log the response headers', () => {
      const loggerSpy = jest.spyOn(logger, 'log');

      underTest.getHeaders({} as any);

      expect(loggerSpy).toHaveBeenCalledTimes(1);
    });
  });
});
