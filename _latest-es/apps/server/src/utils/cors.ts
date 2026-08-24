import { env } from "@_latest-es/env/server";

export const CORS_CONFIG = {
  origin: env.CORS_ORIGIN,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
