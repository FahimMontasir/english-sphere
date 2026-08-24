import type { LearningMaterial } from "../types";

export function formatMaterialMeta(material: LearningMaterial): string {
  return `${material.level} · ${material.topic} · ${material.format}`;
}

export function uniqueMaterialIds(materials: readonly LearningMaterial[]): boolean {
  return new Set(materials.map((material) => material.id)).size === materials.length;
}
