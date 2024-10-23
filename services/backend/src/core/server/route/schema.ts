import { ALLOWED_METHODS, API_ERROR } from "./const";
import { CLIENT_ERROR_STATUS_CODES, INFORMATIONAL_STATUS_CODES, REDIRECTION_STATUS_CODES, SERVER_ERROR_STATUS_CODES, SUCCESSFUL_STATUS_CODE } from "#/utils/http";
import { z } from "#/utils/zod";


export const routeConfigSchema = z.object({
  method: z.enum(ALLOWED_METHODS),
  pathVariables: z.record(
    z.string(),
    z.union([z.string(), z.number()])
  ).optional(),
  queries: z.record(z.unknown()).optional(),
  body: z.record(z.unknown()).optional(),
  middlewares: z.array(z.function()).optional(),
  response: z.record(
    z.union([
      z.nativeEnum(INFORMATIONAL_STATUS_CODES),
      z.nativeEnum(SUCCESSFUL_STATUS_CODE),
      z.nativeEnum(REDIRECTION_STATUS_CODES)
    ]),
    z.record(z.unknown())
  ),
  responses: z.record(
    z.union([
      z.nativeEnum(INFORMATIONAL_STATUS_CODES),
      z.nativeEnum(SUCCESSFUL_STATUS_CODE),
      z.nativeEnum(REDIRECTION_STATUS_CODES)
    ]),
    z.record(z.unknown())
  ),
  errors: z.record(
    z.union([
      z.nativeEnum(CLIENT_ERROR_STATUS_CODES),
      z.nativeEnum(SERVER_ERROR_STATUS_CODES)
    ]),
    z.array(z.nativeEnum(API_ERROR))
  ),
  handler: z.function()
});