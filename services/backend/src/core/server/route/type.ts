import type { ALLOWED_METHODS, APIError, METHODS_WITHOUT_BODY } from "./const";
import type { z, AnyZodObject, ZodNumber, ZodObject, ZodString } from "#/utils/zod";
import type { MiddlewareHandler } from "hono";
import type { StatusCodes, ClientErrorStatusCodes, ServerErrorStatusCodes, InformationalStatusCodes, SuccessfulStatusCode, RedirectionStatusCodes } from "#/utils/http";
import type { Maybe, UnionToIntersection } from "@packages/devx";


type PathVariables = ZodObject<{
  [K: string]: ZodString | ZodNumber;
}>;

type SuccessResponses = Partial<Record<
  Exclude<StatusCodes, ClientErrorStatusCodes | ServerErrorStatusCodes>,
  AnyZodObject
>>;

type ErrorResponses = Partial<Record<
Exclude<StatusCodes, InformationalStatusCodes | SuccessfulStatusCode | RedirectionStatusCodes>,
  Array<APIError>
>>;

type GetMiddlewareEnvVar<
  TMiddlewares extends MiddlewareHandler[],
  V extends "var" | "env"
> =
  TMiddlewares extends (infer U)[] ?
    (
      U extends MiddlewareHandler ?
      Parameters<U>[0][V] :
      never
    ) :
    never;

type HanderCommonParameters<
  TPathVariables extends Maybe<PathVariables>,
  TQueries extends Maybe<AnyZodObject>,
  TMiddlewares extends MiddlewareHandler[],
  TSuccessResponses extends SuccessResponses,
  TErrorResponses extends ErrorResponses
> = {
  variables: UnionToIntersection<GetMiddlewareEnvVar<TMiddlewares, "var">>;
  env: UnionToIntersection<GetMiddlewareEnvVar<TMiddlewares, "env">>;
  pathVariables: TPathVariables extends PathVariables ? z.output<TPathVariables> : null;
  queries: TQueries extends AnyZodObject ? z.output<TQueries> : null;
  header: (name: string) => string | undefined;
  success: CreateSuccessResponse<TSuccessResponses>;
  error: CreateErrorResponse<TErrorResponses>;
}

type HandlerParameters<
  TMethod extends ALLOWED_METHODS,
  TPathVariables extends Maybe<PathVariables>,
  TQueries extends Maybe<AnyZodObject>,
  TBody extends Maybe<AnyZodObject>,
  TMiddlewares extends MiddlewareHandler[],
  TSuccessResponses extends SuccessResponses,
  TErrorResponses extends ErrorResponses
> =
  TMethod extends METHODS_WITHOUT_BODY ? HanderCommonParameters<TPathVariables, TQueries, TMiddlewares, TSuccessResponses, TErrorResponses> :
  HanderCommonParameters<TPathVariables, TQueries, TMiddlewares, TSuccessResponses, TErrorResponses> & {
    body: TBody extends AnyZodObject ? z.output<TBody> : null;
  };

type ZodInputFromAny<T> = T extends AnyZodObject ? z.input<T> : void

type SuccessResponseReturn<
  TSuccessResponses extends SuccessResponses,
  TStatus extends keyof TSuccessResponses = keyof TSuccessResponses,
  TBodyResponse extends ZodInputFromAny<TSuccessResponses[TStatus]> = ZodInputFromAny<TSuccessResponses[TStatus]>
> = {
  status: TStatus;
  body: TBodyResponse;
}

export type CreateSuccessResponse<
  TSuccessResponses extends SuccessResponses,
> = <
  TStatus extends keyof TSuccessResponses = keyof TSuccessResponses,
  TBodyResponse extends ZodInputFromAny<TSuccessResponses[TStatus]> = ZodInputFromAny<TSuccessResponses[TStatus]>
>(
  response: SuccessResponseReturn<TSuccessResponses, TStatus, TBodyResponse>
) => SuccessResponseReturn<TSuccessResponses, TStatus, TBodyResponse>;


type ArrayToUnion<T> = T extends (infer U)[] ? U : never;

type ErrorResponseReturn<
  TErrorResponses extends ErrorResponses,
  TStatus extends keyof TErrorResponses = keyof TErrorResponses,
  TError extends ArrayToUnion<TErrorResponses[TStatus]> = ArrayToUnion<TErrorResponses[TStatus]>
> = {
  status: TStatus;
  error?: TError;
}

export type CreateErrorResponse<
  TErrorResponses extends ErrorResponses,
> = <
  TStatus extends keyof TErrorResponses = keyof TErrorResponses,
  TError extends ArrayToUnion<TErrorResponses[TStatus]> = ArrayToUnion<TErrorResponses[TStatus]>
>(
  response: ErrorResponseReturn<TErrorResponses, TStatus, TError>
) => ErrorResponseReturn<TErrorResponses, TStatus, TError>;

type Handler<
  TMethod extends ALLOWED_METHODS,
  TPathVariables extends Maybe<PathVariables>,
  TQueries extends Maybe<AnyZodObject>,
  TBody extends Maybe<AnyZodObject>,
  TMiddlewares extends MiddlewareHandler[],
  TSuccessResponses extends SuccessResponses,
  TErrorResponses extends ErrorResponses
> = (
  request: HandlerParameters<TMethod, TPathVariables, TQueries, TBody, TMiddlewares, TSuccessResponses, TErrorResponses>
) => ReturnType<CreateSuccessResponse<TSuccessResponses>> | ReturnType<CreateErrorResponse<TErrorResponses>>;

type RouteConfig<
  TMethod extends ALLOWED_METHODS,
  TPathVariables extends Maybe<PathVariables>,
  TQueries extends Maybe<AnyZodObject>,
  TBody extends Maybe<AnyZodObject>,
  TMiddlewares extends MiddlewareHandler[],
  TSuccessResponses extends SuccessResponses,
  TErrorResponses extends ErrorResponses
> = {
  method: TMethod;
  pathVariables?: TPathVariables;
  queries?: TQueries;
  body?: TMethod extends METHODS_WITHOUT_BODY ? void : TBody;
  middlewares?: TMiddlewares;
  responses: TSuccessResponses;
  errors: TErrorResponses;
  handler: Handler<TMethod, TPathVariables, TQueries, TBody, TMiddlewares, TSuccessResponses, TErrorResponses>;
};

export type CreateRouteConfig = <
  TMethod extends ALLOWED_METHODS,
  TSuccessResponses extends SuccessResponses,
  TErrorResponses extends ErrorResponses,
  TPathVariables extends Maybe<PathVariables> = void,
  TQueries extends Maybe<AnyZodObject> = void,
  TBody extends Maybe<AnyZodObject> = void,
  TMiddlewares extends MiddlewareHandler[] = [],
>(
  route: RouteConfig<TMethod, TPathVariables, TQueries, TBody, TMiddlewares, TSuccessResponses, TErrorResponses>
) => RouteConfig<TMethod, TPathVariables, TQueries, TBody, TMiddlewares, TSuccessResponses, TErrorResponses>;