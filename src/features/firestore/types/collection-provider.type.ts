import { InjectionToken } from '@nestjs/common';

export type CollectionProvider = {
  injectionToken: InjectionToken;
  collectionPath: string;
};
