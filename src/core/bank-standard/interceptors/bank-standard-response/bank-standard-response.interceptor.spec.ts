import { TestBed } from '@automock/jest';
import { CallHandler } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { firstValueFrom, of } from 'rxjs';
import { BankStandardResponseMapperService } from './bank-standard-response-mapper';
import { BankStandardResponseInterceptor } from './bank-standard-response.interceptor';

describe('BankStandardResponseInterceptor', () => {
  let underTest: BankStandardResponseInterceptor;
  let responseMapperService: BankStandardResponseMapperService<string>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(
      BankStandardResponseInterceptor,
    ).compile();

    underTest = unit;
    responseMapperService = unitRef.get(BankStandardResponseMapperService);
  });

  describe('intercept', () => {
    let callHandler: CallHandler<unknown>;

    beforeEach(() => {
      callHandler = createMock();
    });

    beforeEach(() => {
      jest.spyOn(responseMapperService, 'map').mockReturnValue({} as any);
      jest.spyOn(callHandler, 'handle').mockReturnValue(of({}));
    });

    it('should map the response with correct parameters', async () => {
      const expected = { foo: 'bar' };

      const successMapperServiceSpy = jest.spyOn(responseMapperService, 'map');
      jest.spyOn(callHandler, 'handle').mockReturnValueOnce(of(expected));

      await firstValueFrom(underTest.intercept({} as any, callHandler));

      expect(successMapperServiceSpy).toHaveBeenCalledWith(expected);
    });

    it('should return the result of the mapper', async () => {
      jest
        .spyOn(responseMapperService, 'map')
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
