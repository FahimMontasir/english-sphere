# Server

The Elysia application follows the PMH backend layout:

- `src/index.ts` composes cross-cutting middleware, auth, API versions, and starts Bun without domain
  behavior.
- `src/v1-routes.ts` mounts backend feature packages under `/api/v1`.
- `src/utils/` contains server-only transport concerns.
- `docker-compose.yml` owns PostgreSQL/pgvector, password-protected Redis, private Garage storage,
  and Garage WebUI. Infrastructure no longer lives in the database package.
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

The server boot log lists the API, OpenAPI, Better Auth reference, Drizzle Studio, storage dashboard,
private bucket, bootstrap learner, and supported test commands. It intentionally never prints
passwords or tokens; local credentials remain in the ignored `.env` file.

Public routes are limited to auth, docs, bootstrap auth in non-production, health, and the root
status. Domain routes under `/api/v1` use the shared Better Auth authorization macro and must opt in
with `authorize: true` at route definition time.
