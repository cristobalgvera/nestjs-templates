import { CollectionReference } from '@google-cloud/firestore';
import { ClassProperties } from './types';

/**
 * Type a `CollectionReference` with a collection defined as class.
 * ---
 * It doesn't make any change to the returned object from Firestore,
 * simply wraps it to give type-safe definitions.
 *
 * @param TCollection - The class you use to map your collection in Firestore
 */
export type FirestoreCollection<TCollection extends object> =
  CollectionReference<ClassProperties<TCollection>>;
