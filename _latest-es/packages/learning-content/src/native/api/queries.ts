import { queryOptions, useQuery } from "@tanstack/react-query";

import { getMaterial, getMaterials } from "./materials";

export const learningContentKeys = {
  all: ["learning-content"] as const,
  materials: ["learning-content", "materials"] as const,
  material: (materialId: string) => ["learning-content", "materials", materialId] as const,
};

export function materialsQueryOptions() {
  return queryOptions({
    queryKey: learningContentKeys.materials,
    queryFn: getMaterials,
  });
}

export function materialQueryOptions(materialId: string) {
  return queryOptions({
    queryKey: learningContentKeys.material(materialId),
    queryFn: () => getMaterial(materialId),
    enabled: materialId.length > 0,
  });
}

export function useMaterialsQuery() {
  return useQuery(materialsQueryOptions());
}

export function useMaterialQuery(materialId: string) {
  return useQuery(materialQueryOptions(materialId));
}
