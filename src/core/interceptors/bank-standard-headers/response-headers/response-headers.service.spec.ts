import { TestBed } from '@automock/jest';
import { ResponseHeadersService } from './response-headers.service';

describe('ResponseHeadersService', () => {
  let underTest: ResponseHeadersService;

  beforeEach(() => {
    const { unit } = TestBed.create(ResponseHeadersService).compile();

    underTest = unit;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('getHeaders', () => {
    beforeEach(() => {
      jest.useFakeTimers({ doNotFake: ['performance'] }).setSystemTime(1000);
    });

    it('should return the response headers', () => {
      const actual = underTest.getHeaders({
        traceConversationId: 'trace_conversation_id',
        requestDateTime: new Date(2000),
      });

      expect(actual).toMatchInlineSnapshot(`
        {
          "Trace-Conversation-Id": "trace_conversation_id",
          "Trace-Correlation-Event-Id": "TO_BE_DEFINED",
          "Trace-Correlation-Id": "TO_BE_DEFINED",
          "Trace-Req-Timestamp": 1970-01-01T00:00:02.000Z,
          "Trace-Rsp-Timestamp": 1970-01-01T00:00:01.000Z,
        }
      `);
    });
  });
});
