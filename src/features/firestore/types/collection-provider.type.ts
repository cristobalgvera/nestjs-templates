import { Collection } from './collection.type';

export interface CollectionProvider {
  collection: Collection;
  path: string;
}
