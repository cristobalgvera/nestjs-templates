import * as underTest from './api-bank-standard-response-headers.util';

describe('GetBankStandardResponseHeaders', () => {
  it('should return the expected headers', () => {
    const actual = underTest.getBankStandardResponseHeaders();

    expect(actual).toMatchInlineSnapshot(`
      {
        "Trace-Conversation-Id": {
          "description": "Identification code that allows to map the response in asynchronous environments",
          "schema": {
            "type": "string",
          },
        },
        "Trace-Correlation-Event-Id": {
          "description": "Unique execution identification code, which identifies the conversation",
          "schema": {
            "type": "string",
          },
        },
        "Trace-Correlation-Id": {
          "description": "Unique identification code to correlate non-related execution instances",
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
      }
    `);
  });
});
