import type { Static } from "elysia";

import { LearningContentSchema } from "./validators";

export type LearningMaterial = Static<typeof LearningContentSchema.Material>;

export interface MaterialCollection {
  important: LearningMaterial[];
  recent: LearningMaterial[];
}
