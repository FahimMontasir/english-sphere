import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";

import { createDb } from "@_latest-es/db";
import * as schema from "@_latest-es/db/schema/auth";
import { env } from "@_latest-es/env/server";

export function createAuth() {
  const db = createDb();

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",

      schema: schema,
    }),
    trustedOrigins: [env.CORS_ORIGIN, "english-sphere://", "exp://", "http://localhost:8081"],
    emailAndPassword: {
      enabled: true,
    },
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    advanced:
      env.NODE_ENV === "production"
        ? {
            defaultCookieAttributes: {
              sameSite: "none",
              secure: true,
              httpOnly: true,
            },
          }
        : undefined,
    plugins: [expo(), openAPI()],
  });
}

export const auth = createAuth();

export const authHandler = (request: Request) => auth.handler(request);
