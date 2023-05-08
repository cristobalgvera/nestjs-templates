import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import {
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { GenericErrorFilter } from './generic-error.filter';
import { Response } from 'express';
import { GenericErrorResponseDto } from './dto';

describe('GenericErrorFilter', () => {
  let underTest: GenericErrorFilter;
  let logger: Logger;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(GenericErrorFilter).compile();

    underTest = unit;
    logger = unitRef.get(Logger);
  });

  describe('catch', () => {
    let argumentHostMock: ArgumentsHost;
    let responseMock: Response;

    beforeEach(() => {
      responseMock = createMock<Response>({
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      });

      argumentHostMock = createMock<ArgumentsHost>({
        switchToHttp: () => ({
          getResponse: () => responseMock,
        }),
      });
    });

    describe('when executing the common flow', () => {
      beforeEach(() => {
        underTest.catch(new Error(), argumentHostMock);
      });

      it('should set the response status to 202: Accepted', () => {
        const responseSpy = jest.spyOn(responseMock, 'status');

        expect(responseSpy).toHaveBeenCalledTimes(1);
        expect(responseSpy).toHaveBeenCalledWith(HttpStatus.ACCEPTED);
      });

      it('should alter the response json once', () => {
        const responseSpy = jest.spyOn(responseMock, 'json');

        expect(responseSpy).toHaveBeenCalledTimes(1);
      });

      it('should log the exception once', () => {
        const loggerSpy = jest.spyOn(logger, 'error');

        expect(loggerSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('when the exception is an HttpException', () => {
      let exception: HttpException;

      beforeEach(() => {
        exception = new HttpException('http_error_message', 1);
        underTest.catch(exception, argumentHostMock);
      });

      it('should set the proper response json', () => {
        const responseSpy = jest.spyOn(responseMock, 'json');

        expect(responseSpy).toHaveBeenCalledWith(
          expect.objectContaining<GenericErrorResponseDto>({
            status: exception.getStatus(),
            error: exception.name,
            detail: exception.getResponse(),
          }),
        );
      });
    });

    describe('when the exception is a generic Error', () => {
      let exception: Error;

      beforeEach(() => {
        exception = new Error('generic_error_message');
        underTest.catch(exception, argumentHostMock);
      });

      it('should set the proper response json', () => {
        const responseSpy = jest.spyOn(responseMock, 'json');

        expect(responseSpy).toHaveBeenCalledWith(
          expect.objectContaining<GenericErrorResponseDto>({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: exception.name,
            detail: exception.message,
          }),
        );
      });
    });
  });
});
