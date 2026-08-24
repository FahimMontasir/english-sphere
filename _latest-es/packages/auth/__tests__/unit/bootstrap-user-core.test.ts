import { describe, expect, test } from "bun:test";

import {
  ensureBootstrapUserWith,
  normalizeBootstrapUser,
} from "../../src/server/bootstrap-user-core";
import { isBootstrapAuthEnabled, safeBootstrapRedirect } from "../../src/server/bootstrap-policy";

describe("bootstrap test user", () => {
  test("normalizes identity fields", () => {
    expect(
      normalizeBootstrapUser({
        name: " Test Learner ",
        email: " Learner@Example.COM ",
        password: "password",
      }),
    ).toEqual({ name: "Test Learner", email: "learner@example.com", password: "password" });
  });

  test("is idempotent when the user already exists", async () => {
    let creates = 0;
    const result = await ensureBootstrapUserWith(
      {
        findByEmail: async (email) => ({ email }),
        create: async (input) => {
          creates += 1;
          return { email: input.email };
        },
      },
      { name: "Learner", email: "learner@example.com", password: "password" },
    );

    expect(result.created).toBe(false);
    expect(creates).toBe(0);
  });

  test("disables browser bootstrap auth in production and rejects open redirects", () => {
    expect(isBootstrapAuthEnabled("development")).toBe(true);
    expect(isBootstrapAuthEnabled("test")).toBe(true);
    expect(isBootstrapAuthEnabled("production")).toBe(false);
    expect(safeBootstrapRedirect("/materials")).toBe("/materials");
    expect(safeBootstrapRedirect("//attacker.example")).toBe("/");
    expect(safeBootstrapRedirect("https://attacker.example")).toBe("/");
  });
});
