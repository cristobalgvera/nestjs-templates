import {
  CollectionReference,
  DocumentReference,
  Firestore,
  Settings,
} from '@google-cloud/firestore';
import { DynamicModule, FactoryProvider, Module } from '@nestjs/common';
import { FirestoreModuleForRootOptions } from './firestore-module-options.dto';
import { FIRESTORE_SETTINGS } from './tokens';
import { CollectionProvider } from './types';

@Module({})
export class FirestoreModule {
  static forRoot(options: FirestoreModuleForRootOptions): DynamicModule {
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
    collections: CollectionProvider[],
  ): FactoryProvider<CollectionReference>[] {
    return collections.map(
      ({ collectionPath, injectionToken }: CollectionProvider) => ({
        provide: injectionToken,
        useFactory: (db: DocumentReference) => db.collection(collectionPath),
        inject: [Firestore],
      }),
    );
  }
}
