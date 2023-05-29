import { createMock } from '@golevelup/ts-jest';
import { Logger } from '@nestjs/common';
import { BankStandardResponseMapperService } from './bank-standard-response-mapper.service';

describe('BankStandardResponseMapperService', () => {
  let underTest: BankStandardResponseMapperService<
    typeof serviceDomainNameCode
  >;
  let logger: Logger;
  const serviceDomainNameCode = 'service_domain_name_code';

  beforeEach(() => {
    logger = createMock();

    underTest = new BankStandardResponseMapperService(
      serviceDomainNameCode,
      logger,
    );
  });

  describe('map', () => {
    let actual: ReturnType<(typeof underTest)['map']>;

    beforeEach(() => {
      actual = underTest.map({ foo: 'bar' });
    });

    it('should return the mapped data', () => {
      expect(actual.Responseservice_domain_name_code).toMatchInlineSnapshot(`
        {
          "foo": "bar",
        }
      `);
    });

    it('should return the correct Result object', () => {
      expect(actual.Result).toMatchInlineSnapshot(`
        {
          "description": "",
          "status": "OK",
        }
      `);
    });

    it('should log the mapped data', () => {
      const loggerSpy = jest.spyOn(logger, 'log');

      expect(loggerSpy).toHaveBeenCalledTimes(1);
    });
  });
});
