import { TestBed } from '@automock/jest';
import { Logger } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import {
  HTTP_CONFIG_OPTIONS,
  HttpConfigOptions,
  HttpConfigOptionsHeaders,
} from './http-config-options.dto';
import { HttpConfigService } from './http-config.service';

describe('HttpConfigService', () => {
  let underTest: HttpConfigService;
  let logger: Logger;
  let httpConfigOptions: HttpConfigOptions;
  let request: Request;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(HttpConfigService).compile();

    underTest = unit;
    logger = unitRef.get(Logger);
    httpConfigOptions = unitRef.get(HTTP_CONFIG_OPTIONS);
    request = unitRef.get(REQUEST);
  });

  describe('createHttpOptions', () => {
    beforeEach(() => {
      httpConfigOptions.headers = {} as any;

      jest.spyOn(request, 'get').mockReturnValue('header');
    });

    describe('headers', () => {
      it('should return the headers provided by the HttpConfigOptions', () => {
        const expected = { foo: 'bar' };

        httpConfigOptions.headers = expected as any;

        const actual = underTest.createHttpOptions();

        expect(actual.headers).toEqual(expect.objectContaining(expected));
      });

      it('should return the headers provided by the request', () => {
        const expectedHeaderOne = 'header-one';
        const expectedHeaderTwo = 'header-two';

        jest
          .spyOn(request, 'get')
          .mockReturnValueOnce(expectedHeaderOne)
          .mockReturnValueOnce(expectedHeaderTwo);

        const actual = underTest.createHttpOptions();

        expect(actual.headers).toEqual(
          expect.objectContaining<Partial<HttpConfigOptionsHeaders>>({
            'trace-source-id': expectedHeaderOne,
            'trace-client-req-timestamp': expectedHeaderTwo,
          }),
        );
      });

      describe.each<number>([1, 2])(
        'when the header number %p is missing',
        (headerMissingNumber) => {
          it('should throw an error', () => {
            const requestSpy = jest.spyOn(request, 'get');

            for (let i = headerMissingNumber - 1; i > 0; i--)
              requestSpy.mockReturnValueOnce('header');

            requestSpy.mockReturnValueOnce(undefined);

            expect(() => underTest.createHttpOptions()).toThrow();
          });
        },
      );
    });

    describe('transformResponse', () => {
      it('should include a transformResponse', () => {
        const actual = underTest.createHttpOptions();

        expect(actual.transformResponse).toEqual(expect.any(Function));
      });

      it('should return a transformResponse that log the response headers', () => {
        const expected = { toJSON: () => ({ foo: 'bar' }) };

        const { transformResponse } = underTest.createHttpOptions();

        const loggerSpy = jest.spyOn(logger, 'log');

        (transformResponse as any)('data', expected as any);

        expect(loggerSpy).toHaveBeenCalledWith(
          expect.stringContaining(JSON.stringify(expected.toJSON())),
        );
      });
    });

    describe('transformRequest', () => {
      it('should include a transformRequest', () => {
        const actual = underTest.createHttpOptions();

        expect(actual.transformRequest).toEqual(expect.any(Function));
      });

      it('should return a transformRequest that log the request headers', () => {
        const expected = { toJSON: () => ({ foo: 'bar' }) };
        const { transformRequest } = underTest.createHttpOptions();

        const loggerSpy = jest.spyOn(logger, 'log');

        (transformRequest as any)('data', expected as any);

        expect(loggerSpy).toHaveBeenCalledWith(
          expect.stringContaining(JSON.stringify(expected.toJSON())),
        );
      });

      it('should return a transformRequest that stringify the data', () => {
        const expected = JSON.stringify({ foo: 'bar' });

        const { transformRequest } = underTest.createHttpOptions();

        const actual = (transformRequest as any)(JSON.parse(expected) as any, {
          toJSON: () => '',
        });

        expect(actual).toEqual(expected);
      });
    });
  });
});
