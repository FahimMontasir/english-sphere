import { t } from "elysia";

const Material = t.Object({
  id: t.String(),
  title: t.String(),
  summary: t.String(),
  level: t.Union([t.Literal("A1"), t.Literal("A2"), t.Literal("B1")]),
  topic: t.Union([t.Literal("Grammar"), t.Literal("Speaking"), t.Literal("Vocabulary")]),
  format: t.Union([t.Literal("Lesson"), t.Literal("Practice")]),
  skill: t.Union([t.Literal("grammar"), t.Literal("speaking"), t.Literal("vocabulary")]),
  isImportant: t.Boolean(),
  publishedAt: t.String({ format: "date-time" }),
  publicationState: t.Literal("published"),
  revision: t.Number({ minimum: 1 }),
  sourceTitle: t.String(),
});

export const LearningContentSchema = {
  Material,
  MaterialId: t.Object({ materialId: t.String({ minLength: 1 }) }),
  MaterialResponse: t.Object({ data: Material }),
  MaterialsResponse: t.Object({
    data: t.Object({
      important: t.Array(Material),
      recent: t.Array(Material),
    }),
  }),
  NotFound: t.Object({
    code: t.Literal("MATERIAL_NOT_FOUND"),
    message: t.String(),
  }),
};
