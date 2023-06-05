import { Type } from '@nestjs/common';

export function getCollectionToken(collection: Type<unknown>): string {
  return `${collection.name}Collection`;
}
