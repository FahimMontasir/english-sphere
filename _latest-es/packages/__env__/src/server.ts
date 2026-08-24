import { parseServerEnvironment } from "./parse";

export type { NodeEnvironment, ServerEnvironment } from "./server-schema";

export const env = parseServerEnvironment(Bun.env);
