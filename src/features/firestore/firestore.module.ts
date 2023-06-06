import {
  CollectionReference,
  Firestore,
  Settings,
} from '@google-cloud/firestore';
import { DynamicModule, FactoryProvider, Module } from '@nestjs/common';
import { FirestoreModuleForRootAsyncOptions } from './firestore-module-options.dto';
import { FIRESTORE_SETTINGS } from './tokens';
import { CollectionProvider } from './types';
import { getCollectionToken } from './utils';

@Module({})
export class FirestoreModule {
  static forRootAsync(
    options: FirestoreModuleForRootAsyncOptions,
  ): DynamicModule {
    const settingsProvider: FactoryProvider<Settings | undefined> = {
      provide: FIRESTORE_SETTINGS,
      useFactory: options.useFactory,
      inject: options.inject,
    };

    const firestoreProvider: FactoryProvider<Firestore> = {
      provide: Firestore,
      useFactory: (settings: Settings) => new Firestore(settings),
      inject: [FIRESTORE_SETTINGS],
    };

    const collectionProviders = FirestoreModule.createCollections(
      options.collections ?? [],
    );

    return {
      global: true,
      module: FirestoreModule,
      imports: options.imports,
      providers: [settingsProvider, firestoreProvider, ...collectionProviders],
      exports: [firestoreProvider, ...collectionProviders],
    };
  }

  static forFeature(collections: CollectionProvider[]): DynamicModule {
    const collectionProviders = FirestoreModule.createCollections(collections);

    return {
      module: FirestoreModule,
      providers: [...collectionProviders],
      exports: [...collectionProviders],
    };
  }

  private static createCollections(
    providers: CollectionProvider[],
  ): FactoryProvider<CollectionReference>[] {
    return providers.map(({ path, collection }: CollectionProvider) => ({
      provide: getCollectionToken(collection),
      useFactory: (firestore: Firestore) => firestore.collection(path),
      inject: [Firestore],
    }));
  }
}
