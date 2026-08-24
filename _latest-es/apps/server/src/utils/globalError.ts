import { Elysia } from "elysia";

import { logger } from "@_latest-es/shared/common/logger";

export const GlobalErrorHandler = new Elysia({ name: "GlobalErrorHandler" }).onError(
  ({ code, error, status }) => {
    logger.error(`[${code}]`, error);

    if (code === "VALIDATION") {
      return status(422, { code: "VALIDATION_ERROR", message: "The request is invalid" });
    }

    return status(500, { code: "INTERNAL_ERROR", message: "An unexpected error occurred" });
  },
);
