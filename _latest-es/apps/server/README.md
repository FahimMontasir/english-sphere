# Server

The Elysia application follows the PMH backend layout:

- `src/index.ts` composes cross-cutting middleware, auth, API versions, and starts Bun without domain
  behavior.
- `src/v1-routes.ts` mounts backend feature packages under `/api/v1`.
- `src/utils/` contains server-only transport concerns.
- `packages/<feature>/src/server/controllers/` owns thin routes and schemas.
- `packages/<feature>/src/server/services/` owns feature behavior and persistence boundaries.
- `packages/<feature>/src/server/helpers/` owns paths and small reusable helpers.

Use named functions, strict TypeScript, double quotes, semicolons, two-space indentation, and grouped
external/workspace/relative imports. Keep feature behavior out of `apps/server`.

```bash
bun run dev:server
bun run test:unit
bun run test:routes
```
