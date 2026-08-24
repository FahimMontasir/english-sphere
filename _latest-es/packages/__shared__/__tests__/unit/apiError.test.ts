import { describe, expect, test } from "bun:test";

import { ApiError } from "../../src/server/apiError";

describe("ApiError", () => {
  test("preserves the transport-safe status and code", () => {
    const error = new ApiError(404, "NOT_FOUND", "Resource was not found");

    expect(error.statusCode).toBe(404);
    expect(error.code).toBe("NOT_FOUND");
    expect(error.message).toBe("Resource was not found");
  });
});
