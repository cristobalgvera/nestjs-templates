import { Inject } from '@nestjs/common';
import { getCollectionToken } from '../utils';
import { InjectCollection } from './inject-collection.decorator';

jest.mock('../utils');
jest.mock('@nestjs/common', () => ({
  ...jest.requireActual('@nestjs/common'),
  Inject: jest.fn(),
}));

const mockInject = jest.mocked(Inject);
const mockGetCollectionToken = jest.mocked(getCollectionToken);

describe('InjectCollection', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call Inject with the collection token provided by getCollectionToken', () => {
    const expected = 'collection-token';

    mockGetCollectionToken.mockReturnValueOnce(expected as any);

    InjectCollection('collection' as any);

    expect(mockInject).toHaveBeenCalledWith(expected);
  });

  it('should return the result of Inject', () => {
    const expected = 'result';

    mockInject.mockReturnValueOnce(expected as any);

    const actual = InjectCollection('collection' as any);

    expect(actual).toBe(expected);
  });

  it('should call getCollectionToken with the collection', () => {
    const expected = 'collection';

    InjectCollection(expected as any);

    expect(mockGetCollectionToken).toHaveBeenCalledWith(expected);
  });
});
