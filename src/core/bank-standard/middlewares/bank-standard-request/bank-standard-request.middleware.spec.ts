import { Request } from 'express';
import { BankStandardRequestMiddleware } from './bank-standard-request.middleware';

describe('BankStandardRequestMiddleware', () => {
  let underTest: BankStandardRequestMiddleware;
  let serviceDomainNameCode: string;

  beforeEach(() => {
    serviceDomainNameCode = 'service_domain_name_code';

    underTest = new BankStandardRequestMiddleware(serviceDomainNameCode);
  });

  describe('use', () => {
    let request: Request;

    beforeEach(() => {
      request = {} as any;
    });

    describe.each([null, undefined, {}])(
      'when the request body is %p',
      (body) => {
        beforeEach(() => {
          request.body = body;
        });

        it('should not modify the body', () => {
          underTest.use(request, null, () => ({}));

          expect(request.body).toBe(body);
        });
      },
    );

    describe('when the request body is an object with attributes', () => {
      describe('when the body has a Request{serviceDomainNameCode} attribute', () => {
        beforeEach(() => {
          request.body = { [`Request${serviceDomainNameCode}`]: 'data' };
        });

        it('should modify the body', () => {
          underTest.use(request, null, () => ({}));

          expect(request.body).toBe('data');
        });
      });

      describe('when the body does not have a Request{serviceDomainNameCode} attribute', () => {
        beforeEach(() => {
          request.body = { unknown: 'unknown' };
        });

        it('should throw a BadRequestException', () => {
          expect(() =>
            underTest.use(request, null, () => ({})),
          ).toThrowErrorMatchingInlineSnapshot(
            `"Requestservice_domain_name_code is missing"`,
          );
        });
      });
    });
  });
});
