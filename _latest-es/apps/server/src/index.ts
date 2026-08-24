import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";

import { auth } from "@_latest-es/auth/server";
import { env } from "@_latest-es/env/server";
import { logger } from "@_latest-es/shared/common/logger";

import { CORS_CONFIG } from "./utils/cors";
import { GlobalErrorHandler } from "./utils/globalError";
import { serverMonitoring } from "./utils/monitoring";
import { APIV1 } from "./v1-routes";

export const app = new Elysia()
  .use(serverMonitoring)
  .use(GlobalErrorHandler)
  .use(cors(CORS_CONFIG))
  .all("/api/auth/*", ({ request, status }) => {
    if (request.method === "GET" || request.method === "POST") {
      return auth.handler(request);
    }

    return status(405, { message: "Method not allowed" });
  })
  .use(APIV1)
  .get("/", () => ({ status: "ok" }))
  .listen(env.PORT, () => {
    logger.info(`Server: http://localhost:${env.PORT}`);
    logger.info(
      `Learning materials: http://localhost:${env.PORT}/api/v1/learning-content/materials`,
    );
  });

export type App = typeof app;
