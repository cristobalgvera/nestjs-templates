import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import { CallHandler, ExecutionContext, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { BankStandardHeadersInterceptor } from './bank-standard-headers.interceptor';
import { RequestHeadersService } from './request-headers';
import { ResponseHeadersService } from './response-headers';
import { firstValueFrom, of } from 'rxjs';

describe('BankStandardHeadersInterceptor', () => {
  let underTest: BankStandardHeadersInterceptor;
  let requestHeadersService: RequestHeadersService;
  let responseHeadersService: ResponseHeadersService;
  let logger: Logger;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(
      BankStandardHeadersInterceptor,
    ).compile();

    underTest = unit;
    requestHeadersService = unitRef.get(RequestHeadersService);
    responseHeadersService = unitRef.get(ResponseHeadersService);
    logger = unitRef.get(Logger);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('intercept', () => {
    let context: ExecutionContext;
    let next: CallHandler;
    let request: Request;
    let response: Response;

    beforeEach(() => {
      request = createMock();
      response = createMock();

      context = createMock<ExecutionContext>({
        switchToHttp: () => ({
          getRequest: () => request,
          getResponse: () => response,
        }),
      });
      next = createMock<CallHandler>({
        handle: jest.fn().mockReturnValue(of({})),
      });
    });

    describe('when validating the request headers', () => {
      it('should call the RequestHeadersService with correct pameters', async () => {
        const expected = { foo: 'bar' };

        request.headers = expected;
        const requestHeadersServiceSpy = jest.spyOn(
          requestHeadersService,
          'validateHeaders',
        );

        await firstValueFrom(underTest.intercept(context, next));

        expect(requestHeadersServiceSpy).toHaveBeenCalledWith(expected);
      });

      it('should log the validated headers', async () => {
        const expected = { foo: 'bar' };

        jest
          .spyOn(requestHeadersService, 'validateHeaders')
          .mockReturnValue(expected as any);

        const loggerSpy = jest.spyOn(logger, 'log');

        await firstValueFrom(underTest.intercept(context, next));

        expect(loggerSpy).toHaveBeenCalledWith(
          expect.stringContaining(JSON.stringify(expected)),
          BankStandardHeadersInterceptor.name,
        );
      });
    });

    describe('when setting the response headers', () => {
      it('should call the ResponseHeadersService with correct parameters', async () => {
        const expectedDate = new Date(1000);
        const expectedTraceConversationId = 'header_1';

        jest
          .spyOn(request, 'get')
          .mockReturnValueOnce(expectedTraceConversationId);

        jest
          .useFakeTimers({ doNotFake: ['performance'] })
          .setSystemTime(expectedDate);

        const responseHeadersServiceSpy = jest.spyOn(
          responseHeadersService,
          'getHeaders',
        );

        await firstValueFrom(underTest.intercept(context, next));

        expect(responseHeadersServiceSpy).toHaveBeenCalledWith<
          Parameters<ResponseHeadersService['getHeaders']>
        >({
          requestDateTime: expectedDate,
          traceConversationId: expectedTraceConversationId,
        });
      });

      it('should set the response headers', async () => {
        const expected = { foo: 'bar' };

        jest
          .spyOn(responseHeadersService, 'getHeaders')
          .mockReturnValueOnce(expected as any);

        const requestSpy = jest.spyOn(response, 'set');

        await firstValueFrom(underTest.intercept(context, next));

        expect(requestSpy).toHaveBeenCalledWith(expected);
      });
    });
  });
});
