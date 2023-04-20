import {
  EventPattern,
  eventPatternSchema as underTest,
} from './event-pattern.schema';

describe('EventPatternSchema', () => {
  const validEventPattern: EventPattern = {
    pattern: 'pattern',
    data: { some: 'data' },
  };

  describe('when the event pattern is valid', () => {
    it.each<Partial<EventPattern> & Record<string, unknown>>([
      { ...validEventPattern },
      { data: 'data' },
      { data: 1234 },
      { data: true },
      { data: { id: 'id' } },
      { any: 'string' },
      { any: 1234 },
      { any: { some: 'key' } },
    ])('should validate the event pattern if has %o', (partialEventPattern) => {
      const eventPattern = { ...validEventPattern, ...partialEventPattern };

      const actual = underTest.validate(eventPattern);

      expect(actual.error).toBeUndefined();
    });
  });

  describe('when the event pattern is invalid', () => {
    it.each<Partial<Record<keyof EventPattern, unknown>>>([
      { pattern: undefined },
      { pattern: 1234 },
      { pattern: '' },
      { data: undefined },
    ])('should validate the event pattern if has %o', (partialEventPattern) => {
      const eventPattern = { ...validEventPattern, ...partialEventPattern };

      const actual = underTest.validate(eventPattern);

      expect(actual.error).toBeDefined();
    });
  });
});
