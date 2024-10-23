import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { version, name } from "../package.json";
import { env } from "#/core/env";
import { Environment } from "#/core/env";
import { logger } from "#/utils/logger";
import { serve } from "bun";
import { st } from "@packages/devx";


const app = new OpenAPIHono();

// The OpenAPI documentation will be available at /doc
app.doc("/documentation/json", {
  openapi: "3.0.0",
  info: {
    version: version,
    title: name
  }
});

app.get("/documentation", swaggerUI({ url: "/documentation/json" }));

const server = serve({
  development: env.ENVIRONMENT === Environment.DEV,
  port: env.PORT,
  fetch: app.fetch
});

logger.info(`Base URL: ${st(["blue"], server.url.toString())} - OpenAPI: ${st("blue", `${server.url.toString()}documentation`)}`);
logger.success("Server has been seccessfully started");