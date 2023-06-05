import { GenericFunction } from './generic-function.type';

export type ClassProperties<TClass extends object> = {
  [Key in keyof TClass as TClass[Key] extends GenericFunction
    ? never
    : Key]: TClass[Key];
};
