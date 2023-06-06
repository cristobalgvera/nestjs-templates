import { Settings } from '@google-cloud/firestore';
import { FactoryProvider, ModuleMetadata } from '@nestjs/common';
import { CollectionProvider } from './types';

export type FirestoreModuleForRootAsyncOptions = Readonly<
  Pick<FactoryProvider<Settings | undefined>, 'useFactory' | 'inject'> &
    Pick<ModuleMetadata, 'imports'> & { collections?: CollectionProvider[] }
>;
