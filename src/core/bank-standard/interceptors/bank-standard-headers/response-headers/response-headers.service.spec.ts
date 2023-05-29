import { TestBed } from '@automock/jest';
import { Logger } from '@nestjs/common';
import { ResponseHeadersService } from './response-headers.service';

describe('ResponseHeadersService', () => {
  let underTest: ResponseHeadersService;
  let logger: Logger;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(ResponseHeadersService).compile();

    underTest = unit;
    logger = unitRef.get(Logger);
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
          "Local-Transaction-Id": "TO_BE_DEFINED",
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
