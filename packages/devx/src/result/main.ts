import type { MaybePromise } from "../typing";
import type { Result } from "./type";


export const ok = <T, E>(value: T): Result<T, E> => {
  return [undefined, value];
};

export const error = <T, E>(error: E): Result<T, E> => {
  return [error, undefined];
};

/**
 * Try/Catch wrapper function to safely execute code
 */
export const safeExecute = async<Return, Deps extends unknown[] = []>(
  fn: (...deps: Deps) => MaybePromise<Return>, deps: [...Deps] = [] as unknown as Deps
): Promise<Result<Return, Error>> => {
  try {
    const result = await fn(...deps);

    return ok(result);
  } catch (err) {
    if (err instanceof Error) return error(err);
    if (err instanceof Object) return error(Error(JSON.stringify(err)));

    return error(Error(String(err)));
  }
};