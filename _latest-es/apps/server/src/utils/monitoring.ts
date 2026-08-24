import { Elysia } from "elysia";

import { logger } from "@_latest-es/shared/common/logger";

const REQUEST_STARTED_AT = Symbol("requestStartedAt");

export const serverMonitoring = new Elysia({ name: "ServerMonitoring" })
  .derive(() => ({ [REQUEST_STARTED_AT]: performance.now() }))
  .onAfterResponse(({ request, set, ...context }) => {
    if (Bun.env.NODE_ENV === "test") {
      return;
    }

    const startedAt = context[REQUEST_STARTED_AT];
    const elapsed = (performance.now() - startedAt).toFixed(2);
    const statusCode = typeof set.status === "number" ? set.status : 200;
    logger.info(
      `[HTTP] ${request.method} ${new URL(request.url).pathname} ${statusCode} ${elapsed}ms`,
    );
  });
