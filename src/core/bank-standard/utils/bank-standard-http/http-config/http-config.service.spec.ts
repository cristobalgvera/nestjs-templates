import { TestBed } from '@automock/jest';
import { Logger } from '@nestjs/common';
import {
  HTTP_CONFIG_OPTIONS,
  HttpConfigOptions,
} from './http-config-options.dto';
import { HttpConfigService } from './http-config.service';

describe('HttpConfigService', () => {
  let underTest: HttpConfigService;
  let logger: Logger;
  let httpConfigOptions: HttpConfigOptions;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(HttpConfigService).compile();

    underTest = unit;
    logger = unitRef.get(Logger);
    httpConfigOptions = unitRef.get(HTTP_CONFIG_OPTIONS);
  });

  describe('createHttpOptions', () => {
    beforeEach(() => {
      httpConfigOptions.headers = {} as any;
    });

    describe('headers', () => {
      it('should return the headers provided by the HttpConfigOptions', () => {
        const expected = { foo: 'bar' };

        httpConfigOptions.headers = expected as any;

        const actual = underTest.createHttpOptions();

        expect(actual.headers).toEqual(expected);
      });
    });

    describe('transformResponse', () => {
      it('should include a transformResponse', () => {
        const actual = underTest.createHttpOptions();

        expect(actual.transformResponse).toEqual(expect.any(Function));
      });

      it('should return a transformResponse that log the response headers', () => {
        const expected = { toJSON: () => ({ foo: 'bar' }) };

        const config = underTest.createHttpOptions();

        (config.transformResponse as any)('data', expected as any);

        expect(logger.log).toHaveBeenCalledWith(
          expect.stringContaining(JSON.stringify(expected.toJSON())),
        );
      });
    });
  });
});
