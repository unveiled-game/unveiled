export type Result<T, E> = ResultOk<T> | ResultFail<E>;

type ResultOk<T> = [undefined, T];

type ResultFail<E> = [E, undefined]