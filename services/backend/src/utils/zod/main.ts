import { extendZodWithOpenApi } from "zod-openapi";
import { z } from "zod";

// Extend Zod with OpenAPI:
extendZodWithOpenApi(z);

export * from "zod";
export { z };