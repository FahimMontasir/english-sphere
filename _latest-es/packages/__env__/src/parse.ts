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

function optionalValue(source: EnvironmentSource, name: string): string | undefined {
  return source[name]?.trim() || undefined;
}

function optionalUrl(source: EnvironmentSource, name: string): string | undefined {
  const value = optionalValue(source, name);
  if (!value) return undefined;

  try {
    new URL(value);
    return value;
  } catch {
    throw new Error(`${name} must be a valid URL`);
  }
}

function optionalPort(source: EnvironmentSource, name: string): number | undefined {
  const value = optionalValue(source, name);
  if (!value) return undefined;

  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error(`${name} must be an integer between 1 and 65535`);
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
    BOOTSTRAP_USER_EMAIL: requireValue(source, "BOOTSTRAP_USER_EMAIL"),
    BOOTSTRAP_USER_NAME: requireValue(source, "BOOTSTRAP_USER_NAME"),
    BOOTSTRAP_USER_PASSWORD: requireValue(source, "BOOTSTRAP_USER_PASSWORD"),
    CORS_ORIGIN: requireUrl(source, "CORS_ORIGIN"),
    DATABASE_URL: requireValue(source, "DATABASE_URL"),
    DRIZZLE_STUDIO_URL: optionalUrl(source, "DRIZZLE_STUDIO_URL"),
    GARAGE_WEBUI_HOST: optionalValue(source, "GARAGE_WEBUI_HOST"),
    GARAGE_WEBUI_PASSWORD: optionalValue(source, "GARAGE_WEBUI_PASSWORD"),
    GARAGE_WEBUI_PORT: optionalPort(source, "GARAGE_WEBUI_PORT"),
    GARAGE_WEBUI_USERNAME: optionalValue(source, "GARAGE_WEBUI_USERNAME"),
    NODE_ENV: parseNodeEnvironment(source.NODE_ENV),
    PORT: parsePort(source.PORT),
    REDIS_URL: requireUrl(source, "REDIS_URL"),
    S3_BUCKET: requireValue(source, "S3_BUCKET"),
    S3_ENDPOINT: requireUrl(source, "S3_ENDPOINT"),
  };
}
