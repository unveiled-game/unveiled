import { routeConfigSchema } from "./route/schema";
import { z } from "#/utils/zod";

export const routeSchema = z.object({
  route: routeConfigSchema
});