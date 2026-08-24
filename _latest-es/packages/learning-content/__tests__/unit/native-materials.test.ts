import { describe, expect, test } from "bun:test";

import { formatMaterialMeta, uniqueMaterialIds } from "../../src/native/helpers/materials";
import type { LearningMaterial } from "../../src/native/types";

const material: LearningMaterial = {
  id: "speaking-basics",
  title: "Speaking Basics",
  summary: "A short practice material.",
  level: "A1",
  topic: "Speaking",
  format: "Practice",
  skill: "speaking",
  isImportant: true,
  publishedAt: "2026-08-24T08:00:00.000Z",
  publicationState: "published",
  revision: 1,
  sourceTitle: "Test fixture",
};

describe("native learning material helpers", () => {
  test("formats level and topic for cards and details", () => {
    expect(formatMaterialMeta(material)).toBe("A1 · Speaking · Practice");
  });

  test("detects duplicate ids before rendering lists", () => {
    expect(uniqueMaterialIds([material])).toBe(true);
    expect(uniqueMaterialIds([material, material])).toBe(false);
  });
});
