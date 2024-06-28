import type { ALLOWED_METHODS } from "./const";
import type { UnionToIntersection } from "#/utils/typing";
import type { z, AnyZodObject, ZodNumber, ZodObject, ZodString } from "#/utils/zod";
import type { MiddlewareHandler } from "hono";


type Methods = typeof ALLOWED_METHODS[number];

type Param = ZodObject<{
  [k: string]: ZodString | ZodNumber;
}>;

type MaybeZodObject = AnyZodObject | void;
type MaybeParam = Param | void;

type GetMiddlewareVariables<
  T extends MiddlewareHandler[]
> =
  T extends (infer U)[] ?
    (
      U extends MiddlewareHandler ?
      Parameters<U>[0]["var"] :
      never
    ) :
    never;

type GetMiddlewareEnv<
  T extends MiddlewareHandler[]
> =
  T extends (infer U)[] ?
    (
      U extends MiddlewareHandler ?
      Parameters<U>[0]["env"] :
      never
    ) :
    never;

type HanderCommonParameters<
  P extends MaybeParam,
  Q extends MaybeZodObject,
  M extends MiddlewareHandler[]
> = {
  variables: UnionToIntersection<GetMiddlewareVariables<M>>;
  env: UnionToIntersection<GetMiddlewareEnv<M>>;
  param: P extends Param ? z.output<P> : null;
  query: Q extends AnyZodObject ? z.output<Q> : null;
  header(name: string): string | undefined;
}

type HandlerParameters<
  T extends Methods,
  P extends MaybeParam,
  Q extends MaybeZodObject,
  B extends MaybeZodObject,
  M extends MiddlewareHandler[]
> =
  T extends "GET" ? HanderCommonParameters<P, Q, M> :
  HanderCommonParameters<P, Q, M> & {
    body: B extends AnyZodObject ? z.output<B> : null;
  };


type RouteConfig<
  T extends Methods,
  P extends MaybeParam,
  Q extends MaybeZodObject,
  B extends MaybeZodObject,
  M extends MiddlewareHandler[]
> = {
  method: T;
  param?: P;
  query?: Q;
  body?: B;
  middlewares?: M;
  handler: (request: HandlerParameters<T, P, Q, B, M>) => void;
};

export type CreateRoute = <
  T extends Methods,
  P extends MaybeParam = void,
  Q extends MaybeZodObject = void,
  B extends MaybeZodObject = void,
  M extends MiddlewareHandler[] = []
>(route: RouteConfig<T, P, Q, B, M>) => RouteConfig<T, P, Q, B, M>;