import { BankStandardSuccessMapperService } from './bank-standard-success-mapper.service';

describe('BankStandardSuccessMapperService', () => {
  let underTest: BankStandardSuccessMapperService<typeof serviceDomainNameCode>;
  const serviceDomainNameCode = 'service_domain_name_code';

  beforeEach(() => {
    underTest = new BankStandardSuccessMapperService(serviceDomainNameCode);
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
  });
});
