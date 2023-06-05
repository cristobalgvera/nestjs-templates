type Method = (...args: unknown[]) => unknown;

export type ClassProperties<TClass extends object> = {
  [Key in keyof TClass as TClass[Key] extends Method
    ? never
    : Key]: TClass[Key];
};
