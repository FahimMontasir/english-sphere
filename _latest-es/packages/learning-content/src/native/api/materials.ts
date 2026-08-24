import { treaty } from "@elysiajs/eden";

import { SERVER_URL } from "@_latest-es/env/native";

import type { LearningContentApi } from "../../server/controllers/routes";
import type { LearningMaterial, MaterialCollection } from "../types";

const learningContentApi = treaty<LearningContentApi>(`${SERVER_URL}/api/v1`);

function requireData<T>(result: { data: T | null; error: unknown }, message: string): T {
  if (result.error || result.data === null) {
    throw result.error ?? new Error(message);
  }

  return result.data;
}

export async function getMaterials(): Promise<MaterialCollection> {
  const result = await learningContentApi["learning-content"].materials.get();
  const response = requireData(result, "Learning materials are unavailable");

  return response.data;
}

export async function getMaterial(materialId: string): Promise<LearningMaterial> {
  const result = await learningContentApi["learning-content"].materials({ materialId }).get();
  const response = requireData(result, "Learning material is unavailable");

  return response.data;
}
