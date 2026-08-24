import { Elysia, t } from "elysia";

import { env } from "@_latest-es/env/server";

import { auth } from ".";
import { isBootstrapAuthEnabled, safeBootstrapRedirect } from "./bootstrap-policy";
import { ensureBootstrapUser } from "./bootstrap-user";

/** Development/test-only browser sign-in used by Maestro web flows. */
export const BootstrapAuthRoutes = new Elysia({ name: "BootstrapAuthRoutes" }).get(
  "/api/test-auth",
  async ({ query, status }) => {
    if (!isBootstrapAuthEnabled(env.NODE_ENV)) {
      return status(404, { code: "NOT_FOUND", message: "Route not found" });
    }

    await ensureBootstrapUser();
    const signInResponse = await auth.api.signInEmail({
      body: {
        email: env.BOOTSTRAP_USER_EMAIL,
        password: env.BOOTSTRAP_USER_PASSWORD,
      },
      asResponse: true,
    });

    if (!signInResponse.ok) {
      return status(500, { code: "TEST_AUTH_FAILED", message: "Test sign-in failed" });
    }

    const headers = new Headers(signInResponse.headers);
    headers.set("location", `${env.CORS_ORIGIN}${safeBootstrapRedirect(query.redirect)}`);
    return new Response(null, { status: 302, headers });
  },
  {
    query: t.Object({ redirect: t.String({ default: "/" }) }),
    detail: { hide: true },
  },
);
