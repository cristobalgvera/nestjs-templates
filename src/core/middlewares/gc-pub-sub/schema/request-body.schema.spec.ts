import {
  RequestBody,
  requestBodySchema as underTest,
} from './request-body.schema';

describe('RequestBodySchema', () => {
  const validRequestBody: RequestBody = {
    subscription: 'subscription',
    message: {
      data: Buffer.from('data').toString('base64'),
    },
  };

  describe('when the request body is valid', () => {
    it.each<Partial<RequestBody> & Record<string, unknown>>([
      { ...validRequestBody },
      { any: 'string' },
      { any: 1234 },
      { any: { some: 'key' } },
    ])('should validate the request body if has %o', (partialRequestBody) => {
      const requestBody = { ...validRequestBody, ...partialRequestBody };

      const actual = underTest.validate(requestBody);

      expect(actual.error).toBeUndefined();
    });

    describe('when validating message field', () => {
      it.each<Partial<RequestBody['message']> & Record<string, unknown>>([
        { attributes: { some: 'attributes' } },
        { attributes: { some: 1234 } },
        { attributes: { some: true } },
        { attributes: { str: 'string', num: 999, bool: false } },
        { messageId: 'messageId' },
        { messageId: undefined },
        { publishTime: new Date('2022-01-01').toISOString() },
        { publishTime: undefined },
        { any: 'string' },
        { any: 1234 },
        { any: { some: 'key' } },
      ])('should validate the message field if has %o', (partialMessage) => {
        const message = {
          ...validRequestBody.message,
          ...partialMessage,
        };

        const actual = underTest.validate({ ...validRequestBody, message });

        expect(actual.error).toBeUndefined();
      });
    });
  });

  describe('when the request body is invalid', () => {
    it.each<Partial<Record<keyof RequestBody, unknown>>>([
      { subscription: undefined },
      { subscription: 1234 },
      { subscription: '' },
      { message: undefined },
      { message: 'not-an-object' as any },
    ])('should invalidate the request body if has %o', (partialRequestBody) => {
      const requestBody = {
        ...validRequestBody,
        ...partialRequestBody,
      };

      const actual = underTest.validate(requestBody);

      expect(actual.error).toBeDefined();
    });

    describe('when validating message field', () => {
      it.each<Partial<Record<keyof RequestBody['message'], unknown>>>([
        { attributes: 'not-an-object' },
        { data: undefined },
        { data: 1234 },
        { data: '' },
        { data: 'not-base64' },
        { messageId: 1234 },
        { messageId: '' },
        { publishTime: 1234 },
        { publishTime: '' },
      ])('should invalidate the message field if has %o', (partialMessage) => {
        const message = {
          ...validRequestBody.message,
          ...partialMessage,
        };

        const actual = underTest.validate({ ...validRequestBody, message });

        expect(actual.error).toBeDefined();
      });
    });
  });
});
