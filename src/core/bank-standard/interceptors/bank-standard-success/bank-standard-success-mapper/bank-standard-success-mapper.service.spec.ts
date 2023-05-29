import { createMock } from '@golevelup/ts-jest';
import { Logger } from '@nestjs/common';
import { BankStandardSuccessMapperService } from './bank-standard-success-mapper.service';

describe('BankStandardSuccessMapperService', () => {
  let underTest: BankStandardSuccessMapperService<typeof serviceDomainNameCode>;
  let logger: Logger;
  const serviceDomainNameCode = 'service_domain_name_code';

  beforeEach(() => {
    logger = createMock();

    underTest = new BankStandardSuccessMapperService(
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
