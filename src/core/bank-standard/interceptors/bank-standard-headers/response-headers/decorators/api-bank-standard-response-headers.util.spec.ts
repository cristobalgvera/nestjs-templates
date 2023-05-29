import * as underTest from './api-bank-standard-response-headers.util';

describe('GetBankStandardResponseHeaders', () => {
  it('should return the expected headers', () => {
    const actual = underTest.getBankStandardResponseHeaders();

    expect(actual).toMatchInlineSnapshot(`
      {
        "Local-Transaction-Id": {
          "description": "Internal platform identifier",
          "schema": {
            "type": "string",
          },
        },
        "Trace-Req-Timestamp": {
          "description": "Request timestamp",
          "schema": {
            "type": "date",
          },
        },
        "Trace-Rsp-Timestamp": {
          "description": "Response timestamp",
          "schema": {
            "type": "date",
          },
        },
        "Trace-Source-Id": {
          "description": "Unique identifier of the execution, that identifies the consumer event",
          "schema": {
            "type": "string",
          },
        },
      }
    `);
  });
});
