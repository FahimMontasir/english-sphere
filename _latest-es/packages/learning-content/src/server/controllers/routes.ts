import { Elysia } from "elysia";

import { ENDPOINTS_PATH } from "../helpers/path";
import { findPublishedMaterial, listPublishedMaterials } from "../services/materials";
import { LearningContentSchema } from "../validators";

export const LearningContentRoutes = new Elysia({
  name: "LearningContent",
  prefix: ENDPOINTS_PATH.prefix,
})
  .get(ENDPOINTS_PATH.materials, () => ({ data: listPublishedMaterials() }), {
    detail: { tags: ["Learning content"], summary: "List published learning materials" },
    response: LearningContentSchema.MaterialsResponse,
  })
  .get(
    ENDPOINTS_PATH.material,
    ({ params, status }) => {
      const material = findPublishedMaterial(params.materialId);

      if (!material) {
        return status(404, { code: "MATERIAL_NOT_FOUND", message: "Material was not found" });
      }

      return { data: material };
    },
    {
      detail: { tags: ["Learning content"], summary: "Get a published learning material" },
      params: LearningContentSchema.MaterialId,
      response: {
        200: LearningContentSchema.MaterialResponse,
        404: LearningContentSchema.NotFound,
      },
    },
  );

export type LearningContentApi = typeof LearningContentRoutes;
