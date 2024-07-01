export type MaybePromise<T> = T | Promise<T>;

export type ObjectValues<T> = T[keyof T];

export type UnionToIntersection<U> = (U extends unknown ? (x: U) => void : never) extends ((x: infer I) => void) ? I : never;