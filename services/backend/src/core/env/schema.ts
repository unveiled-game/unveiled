import { Environment } from "./const";
import { z } from "#/utils/zod";


export const envSchema = z.object({
  // Base:
  PORT: z.coerce.number().default(3005),
  ENVIRONMENT: z.nativeEnum(Environment)
});