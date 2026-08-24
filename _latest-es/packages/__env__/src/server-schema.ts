export type NodeEnvironment = "development" | "production" | "test";

export interface ServerEnvironment {
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  CORS_ORIGIN: string;
  DATABASE_URL: string;
  NODE_ENV: NodeEnvironment;
  PORT: number;
}
