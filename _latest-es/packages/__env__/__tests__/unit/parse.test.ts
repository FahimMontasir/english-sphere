import { describe, expect, test } from "bun:test";

import { parseServerEnvironment } from "../../src/parse";

const VALID_ENVIRONMENT = {
  BETTER_AUTH_SECRET: "12345678901234567890123456789012",
  BETTER_AUTH_URL: "http://localhost:3000",
  CORS_ORIGIN: "http://localhost:8081",
  DATABASE_URL: "postgresql://postgres:password@localhost:5432/english_sphere",
};

describe("server environment parser", () => {
  test("applies Bun server defaults", () => {
    const environment = parseServerEnvironment(VALID_ENVIRONMENT);

    expect(environment.NODE_ENV).toBe("development");
    expect(environment.PORT).toBe(3000);
  });

  test("rejects missing, unsafe, and malformed values without Zod", () => {
    expect(() => parseServerEnvironment({ ...VALID_ENVIRONMENT, CORS_ORIGIN: "invalid" })).toThrow(
      "CORS_ORIGIN must be a valid URL",
    );
    expect(() =>
      parseServerEnvironment({ ...VALID_ENVIRONMENT, BETTER_AUTH_SECRET: "short" }),
    ).toThrow("BETTER_AUTH_SECRET must contain at least 32 characters");
    expect(() => parseServerEnvironment({ ...VALID_ENVIRONMENT, PORT: "70000" })).toThrow(
      "PORT must be an integer between 1 and 65535",
    );
  });
});
