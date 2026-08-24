import { describe, expect, test } from "bun:test";
import { treaty } from "@elysiajs/eden";
import { Elysia } from "elysia";

import { LearningContentRoutes } from "../../src/server/controllers/routes";

const api = treaty(new Elysia({ prefix: "/api/v1" }).use(LearningContentRoutes));

describe("learning content controller routes", () => {
  test("returns important and recent materials through the public route", async () => {
    const { data, error, status } = await api.api.v1["learning-content"].materials.get();

    expect(status).toBe(200);
    expect(error).toBeNull();
    expect(
      data?.data.important.some((material) => material.title === "Basic English for Speaking"),
    ).toBe(true);
    expect(data?.data.recent.length).toBe(5);
  });

  test("returns one material and a typed not-found response", async () => {
    const found = await api.api.v1["learning-content"]
      .materials({
        materialId: "basic-speaking-starters",
      })
      .get();
    const missing = await api.api.v1["learning-content"]
      .materials({
        materialId: "missing-material",
      })
      .get();

    expect(found.status).toBe(200);
    expect(found.data?.data.title).toBe("Basic English for Speaking");
    expect(missing.status).toBe(404);
    expect(missing.error?.value).toEqual({
      code: "MATERIAL_NOT_FOUND",
      message: "Material was not found",
    });
  });
});
