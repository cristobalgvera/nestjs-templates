import { BankStandardSuccessMapperService } from './bank-standard-success-mapper.service';
import { BankStandardSuccessMapperProvider } from './bank-standard-success-mapper.provider';

describe('BankStandardSuccessMapperProvider', () => {
  let underTest: BankStandardSuccessMapperService<'ServiceDomainNameCode'>;

  beforeEach(() => {
    underTest = BankStandardSuccessMapperProvider.provide(
      'ServiceDomainNameCode',
    );
  });

  describe('map', () => {
    let actual: ReturnType<(typeof underTest)['map']>;

    beforeEach(() => {
      actual = underTest.map({ foo: 'bar' });
    });

    it('should return the mapped data', () => {
      expect(actual.ResponseServiceDomainNameCode).toMatchInlineSnapshot(`
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
