export type NodeEnvironment = "development" | "production" | "test";

export interface ServerEnvironment {
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  BOOTSTRAP_USER_EMAIL: string;
  BOOTSTRAP_USER_NAME: string;
  BOOTSTRAP_USER_PASSWORD: string;
  CORS_ORIGIN: string;
  DATABASE_URL: string;
  DRIZZLE_STUDIO_URL?: string;
  GARAGE_WEBUI_HOST?: string;
  GARAGE_WEBUI_PASSWORD?: string;
  GARAGE_WEBUI_PORT?: number;
  GARAGE_WEBUI_USERNAME?: string;
  NODE_ENV: NodeEnvironment;
  PORT: number;
  REDIS_URL: string;
  S3_BUCKET: string;
  S3_ENDPOINT: string;
}
