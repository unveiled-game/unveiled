import { scanDirectory } from "#/utils/file-system";
import type { OpenAPIHono } from "@hono/zod-openapi";
import { z } from "#/utils/zod";
import { ALLOWED_METHODS } from "./route/const";
import { sep } from "node:path";
import { routeSchema } from "./schema";
import { pathToFileURL } from "bun";
import type { CreateRouteConfig } from "#/core/server/route/type";
import { safeExecute } from "@packages/devx";
import { logger } from "#/utils/logger";
import { zValidator } from "@hono/zod-validator";
import { InformationalStatusCodes, RedirectionStatusCodes, StatusCodes, SuccessfulStatusCode } from "#/utils/http";
import { isErrorResponse } from "#/core/server/route";


export const registerRoutes = async(server: OpenAPIHono, routesPath: string): Promise<void> => {
  const files = scanDirectory(routesPath);

  for (const file of files) {
    // Method:
    const match = (/(?<method>get|post|patch|delete).route/i).exec(file.fileName); // todo
    if (!match?.groups?.method) continue;
    type LowercaseTuple<T extends readonly string[]> = {
      [K in keyof T]: Lowercase<T[K]>;
    };

    const method = z.enum(ALLOWED_METHODS).parse(match.groups.method.toUpperCase());

    // Endpoint:
    const endpointBase = `/${file.relativePath.replaceAll(sep, "/").replace(`${file.fileName}${file.fileExtension}`, "")}`;
    const endpointSlash = endpointBase === "/" ? endpointBase : endpointBase.substring(0, endpointBase.length - 1);
    const endpoint = endpointSlash.replace(/\[([A-z]+)\]/g, ":$1");

    // Instance of the route file:
    const fileContent = routeSchema.parse(await import(pathToFileURL(`${routesPath}/${file.relativePath}`).href));
    const routeConfig = fileContent.route as ReturnType<CreateRouteConfig>;

    server.openapi(
      {
        method: method.toLowerCase() as Lowercase<typeof method>,
        path: endpoint,
        request: {
          body: routeConfig.body === undefined ? undefined : {
            content: {
              "application/json": {
                schema: routeConfig.body
              }
            }
          },
          params: routeConfig.pathVariables === undefined ? undefined : routeConfig.pathVariables,
          query: routeConfig.queries === undefined ? undefined : routeConfig.queries
        },
        middleware: routeConfig.middlewares,
        responses: {

        }
      },
      // 200: {
      //   description: "",
      //   content: {
      //     "application/json": undefined
      //   }
      // }
      async(c) => {
        const [error, execute] = await safeExecute(() => routeConfig.handler({
          body: c.req.valid("json" as never),
          header: (name) => c.req.header(name),
          queries: c.req.valid("query" as never),
          pathVariables: c.req.valid("param" as never),
          variables: c.var,
          env: c.env,
          error: (response) => response,
          success: (response) => response
        }));

        if (error !== undefined) {
          c.status(StatusCodes.INTERNAL_SERVER_ERROR);
          return c.json({});
        }

        if (execute.status === 400) {
          execute.
        }
      }
    );


    // Log:
    logger.info(`Route loaded: ${method} ${endpoint}`);
  }
};