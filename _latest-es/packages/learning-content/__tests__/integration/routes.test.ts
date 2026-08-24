import { beforeAll, describe, expect, test } from "bun:test";
import { treaty } from "@elysiajs/eden";
import { Elysia } from "elysia";

import { getBootstrapUserSession } from "@_latest-es/auth/server/bootstrap-user";
import { LearningContentRoutes } from "../../src/server/controllers/routes";

const routes = new Elysia({ prefix: "/api/v1" }).use(LearningContentRoutes);
const publicApi = treaty(routes);
let api: ReturnType<typeof treaty<typeof routes>>;

beforeAll(async () => {
  const { headers } = await getBootstrapUserSession();
  api = treaty(routes, { headers });
});

describe("learning content controller routes", () => {
  test("rejects an unauthenticated request", async () => {
    const result = await publicApi.api.v1["learning-content"].materials.get();

    expect(result.status).toBe(401);
    expect(result.error?.value).toEqual({
      code: "UNAUTHORIZED",
      message: "Authentication is required",
    });
  });

  test("returns important and recent materials through an authenticated route", async () => {
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
