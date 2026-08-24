import { describe, expect, test } from "bun:test";

import { findPublishedMaterial, listPublishedMaterials } from "../../src/server/services/materials";

describe("learning material service", () => {
  test("separates important materials and sorts recent materials newest first", () => {
    const materials = listPublishedMaterials();

    expect(materials.important.length).toBeGreaterThan(0);
    expect(materials.important.every((material) => material.isImportant)).toBe(true);
    expect(materials.recent[0]?.id).toBe("workplace-words");
  });

  test("finds a published material by its stable id", () => {
    expect(findPublishedMaterial("future-tense-quick-guide")?.level).toBe("A2");
    expect(findPublishedMaterial("missing-material")).toBeNull();
  });
});
