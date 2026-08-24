import { Elysia, type ElysiaConfig } from "elysia";

import { AuthMiddleware } from "./auth-middleware";

/** Base Elysia instance for routes that require a valid Better Auth session. */
export function secureAPI<const BasePath extends string = "">(config?: ElysiaConfig<BasePath>) {
  return new Elysia(config).use(AuthMiddleware);
}
