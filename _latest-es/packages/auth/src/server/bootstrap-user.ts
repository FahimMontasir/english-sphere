import { eq } from "drizzle-orm";

import { db } from "@_latest-es/db";
import { user } from "@_latest-es/db/schema/auth";
import { env } from "@_latest-es/env/server";
import { logger } from "@_latest-es/shared/common/logger";

import { auth } from ".";
import { ensureBootstrapUserWith } from "./bootstrap-user-core";

export async function ensureBootstrapUser() {
  if (env.NODE_ENV === "production") {
    return undefined;
  }

  const result = await ensureBootstrapUserWith(
    {
      async findByEmail(email) {
        return (await db.select().from(user).where(eq(user.email, email)).limit(1))[0];
      },
      async create(input) {
        const result = await auth.api.signUpEmail({
          body: input,
        });
        return result.user;
      },
    },
    {
      name: env.BOOTSTRAP_USER_NAME,
      email: env.BOOTSTRAP_USER_EMAIL,
      password: env.BOOTSTRAP_USER_PASSWORD,
    },
  );

  logger.info(
    result.created
      ? "[Auth] Local test learner created"
      : "[Auth] Local test learner already exists",
  );
  return result.candidate;
}

let cachedBootstrapSession: Promise<{ headers: { cookie: string; origin: string } }> | null = null;

export async function getBootstrapUserSession() {
  if (env.NODE_ENV === "production") {
    throw new Error("The bootstrap test user is disabled in production");
  }

  cachedBootstrapSession ??= (async () => {
    await ensureBootstrapUser();
    const response = await auth.api.signInEmail({
      body: {
        email: env.BOOTSTRAP_USER_EMAIL,
        password: env.BOOTSTRAP_USER_PASSWORD,
      },
      asResponse: true,
    });

    if (!response.ok) {
      throw new Error(`Bootstrap learner login failed (${response.status})`);
    }

    const cookies = response.headers.getSetCookie().map((value) => value.split(";", 1)[0]);
    if (cookies.length === 0) {
      throw new Error("Better Auth did not return a session cookie");
    }

    return {
      headers: {
        cookie: cookies.join("; "),
        origin: env.CORS_ORIGIN,
      },
    };
  })();

  return cachedBootstrapSession;
}
