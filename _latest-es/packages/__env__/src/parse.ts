import type { NodeEnvironment, ServerEnvironment } from "./server-schema";

type EnvironmentSource = Record<string, string | undefined>;

function requireValue(source: EnvironmentSource, name: string): string {
  const value = source[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function requireUrl(source: EnvironmentSource, name: string): string {
  const value = requireValue(source, name);

  try {
    new URL(value);
    return value;
  } catch {
    throw new Error(`${name} must be a valid URL`);
  }
}

function parseNodeEnvironment(value: string | undefined): NodeEnvironment {
  const environment = value ?? "development";

  if (environment === "development" || environment === "production" || environment === "test") {
    return environment;
  }

  throw new Error("NODE_ENV must be development, production, or test");
}

function parsePort(value: string | undefined): number {
  const port = Number(value ?? "3000");

  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error("PORT must be an integer between 1 and 65535");
  }

  return port;
}

export function parseServerEnvironment(source: EnvironmentSource): ServerEnvironment {
  const secret = requireValue(source, "BETTER_AUTH_SECRET");

  if (secret.length < 32) {
    throw new Error("BETTER_AUTH_SECRET must contain at least 32 characters");
  }

  return {
    BETTER_AUTH_SECRET: secret,
    BETTER_AUTH_URL: requireUrl(source, "BETTER_AUTH_URL"),
    CORS_ORIGIN: requireUrl(source, "CORS_ORIGIN"),
    DATABASE_URL: requireValue(source, "DATABASE_URL"),
    NODE_ENV: parseNodeEnvironment(source.NODE_ENV),
    PORT: parsePort(source.PORT),
  };
}
