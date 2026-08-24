import { cors } from "@elysiajs/cors";
import { openapi } from "@elysia/openapi";
import { Elysia } from "elysia";

import { authHandler } from "@_latest-es/auth/server";
import { BootstrapAuthRoutes } from "@_latest-es/auth/server/bootstrap-routes";
import { ensureBootstrapUser } from "@_latest-es/auth/server/bootstrap-user";
import { env } from "@_latest-es/env/server";
import { logger } from "@_latest-es/shared/common/logger";

import { CORS_CONFIG } from "./utils/cors";
import { GlobalErrorHandler } from "./utils/globalError";
import { serverMonitoring } from "./utils/monitoring";
import { APIV1 } from "./v1-routes";

await ensureBootstrapUser();

export const app = new Elysia()
  .use(serverMonitoring)
  .use(GlobalErrorHandler)
  .use(cors(CORS_CONFIG))
  .use(
    openapi({
      path: "/api-docs",
      documentation: {
        info: {
          title: "English Sphere API",
          version: "1.0.0",
        },
        components: {
          securitySchemes: {
            cookieAuth: {
              type: "apiKey",
              in: "cookie",
              name: "better-auth.session_token",
            },
          },
        },
      },
    }),
  )
  .all("/api/auth/*", ({ request }) => authHandler(request), { parse: "none" })
  .use(BootstrapAuthRoutes)
  .use(APIV1)
  .get("/health", () => ({ status: "ok" }), {
    detail: { tags: ["System"], summary: "Service health" },
  })
  .get("/", () => ({ status: "ok" }))
  .listen(env.PORT, () => {
    const storageDashboard =
      env.GARAGE_WEBUI_HOST && env.GARAGE_WEBUI_PORT
        ? `http://${env.GARAGE_WEBUI_HOST}:${env.GARAGE_WEBUI_PORT}`
        : "not configured";

    logger.info(
      `\n\x1b[36m🚀 Server:\x1b[0m http://localhost:${env.PORT}` +
        `\n\x1b[36m📚 API docs:\x1b[0m http://localhost:${env.PORT}/api-docs` +
        `\n\x1b[36m🔐 Better Auth docs:\x1b[0m http://localhost:${env.PORT}/api/auth/reference` +
        `\n\x1b[36m🗄️ Drizzle Studio:\x1b[0m ${env.DRIZZLE_STUDIO_URL ?? "not configured"}` +
        `\n\x1b[36m📦 Storage dashboard:\x1b[0m ${storageDashboard}` +
        `\n\x1b[36m👤 Storage user:\x1b[0m ${env.GARAGE_WEBUI_USERNAME ?? "not configured"} (password is read from .env)` +
        `\n\x1b[36m⚡ Redis:\x1b[0m configured at ${new URL(env.REDIS_URL).hostname}` +
        `\n\x1b[36m🪣 Private bucket:\x1b[0m ${env.S3_BUCKET} at ${env.S3_ENDPOINT}` +
        `\n\x1b[36m🧪 Test learner:\x1b[0m ${env.NODE_ENV === "production" ? "disabled" : env.BOOTSTRAP_USER_EMAIL}` +
        `\n\x1b[36m🧪 Unit tests:\x1b[0m bun run test:unit` +
        `\n\x1b[36m🧪 Integration tests:\x1b[0m bun run test:integration` +
        `\n\x1b[36m🧭 Maestro web:\x1b[0m bun run test:e2e:web` +
        `\n\x1b[36m🤖 Maestro Android:\x1b[0m bun run test:e2e:android` +
        `\n\x1b[36m🧪 Complete suite:\x1b[0m bun run test:all`,
    );
  });

export type App = typeof app;
