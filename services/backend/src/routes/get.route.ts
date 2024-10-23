import { METHODS } from "#/utils/http";
import { createRoute } from "@hono/zod-openapi";

export const route = createRoute({
  method: METHODS.GET
});