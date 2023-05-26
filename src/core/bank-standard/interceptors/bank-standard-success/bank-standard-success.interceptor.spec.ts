import { TestBed } from '@automock/jest';
import {
  BANK_STANDARD_SUCCESS_MAPPER_SERVICE_TOKEN,
  BankStandardSuccessMapperService,
} from './bank-standard-success-mapper';
import { BankStandardSuccessInterceptor } from './bank-standard-success.interceptor';
import { CallHandler } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { firstValueFrom, of } from 'rxjs';

describe('BankStandardSuccessInterceptor', () => {
  let underTest: BankStandardSuccessInterceptor;
  let successMapperService: BankStandardSuccessMapperService<any>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(
      BankStandardSuccessInterceptor,
    ).compile();

    underTest = unit;
    successMapperService = unitRef.get(
      BANK_STANDARD_SUCCESS_MAPPER_SERVICE_TOKEN,
    );
  });

  describe('intercept', () => {
    let callHandler: CallHandler<unknown>;

    beforeEach(() => {
      callHandler = createMock();
    });

    beforeEach(() => {
      jest.spyOn(successMapperService, 'map').mockReturnValue({} as any);
      jest.spyOn(callHandler, 'handle').mockReturnValue(of({}));
    });

    it('should map the response with correct parameters', async () => {
      const expected = { foo: 'bar' };

      const successMapperServiceSpy = jest.spyOn(successMapperService, 'map');
      jest.spyOn(callHandler, 'handle').mockReturnValueOnce(of(expected));

      await firstValueFrom(underTest.intercept({} as any, callHandler));

      expect(successMapperServiceSpy).toHaveBeenCalledWith(expected);
    });

    it('should return the result of the mapper', async () => {
      jest
        .spyOn(successMapperService, 'map')
        .mockReturnValue({ foo: 'bar' } as any);

      const actual = await firstValueFrom(
        underTest.intercept({} as any, callHandler),
      );

      expect(actual).toMatchInlineSnapshot(`
        {
          "foo": "bar",
        }
      `);
    });
  });
});
