import { Inject } from '@nestjs/common';
import { Collection } from '../types';
import { getCollectionToken } from '../utils';

export function InjectCollection(collection: Collection) {
  return Inject(getCollectionToken(collection));
}
