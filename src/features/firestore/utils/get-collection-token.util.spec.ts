import { getCollectionToken } from './get-collection-token.util';

describe('getCollectionToken', () => {
  let actual: ReturnType<typeof getCollectionToken>;

  class TestClass {}

  beforeEach(() => {
    actual = getCollectionToken(TestClass);
  });

  it('should return the collection token', () => {
    expect(actual).toMatchInlineSnapshot(`"TestClassCollection"`);
  });
});
