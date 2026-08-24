import { LearningContentRoutes } from "@_latest-es/learning-content/server/controllers/routes";
import { Elysia } from "elysia";

/**
 * API v1 composition root. Feature packages own behavior; the server only mounts them.
 */
export const APIV1 = new Elysia({ prefix: "/api/v1" }).use(LearningContentRoutes);
