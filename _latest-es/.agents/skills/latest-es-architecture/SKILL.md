---
name: latest-es-architecture
description: Organize files, packages, exports, and dependencies in the _latest-es Bun monorepo. Use when adding, moving, or deciding the location of application, feature, server, native, shared, database, configuration, or test code.
---

# _latest-es architecture

Keep all active development inside `_latest-es/`. Other top-level projects in the parent repository are legacy references unless the user explicitly scopes work to one of them.

## Choose the owner before creating a file

- `apps/native` is the Expo application composition root. Keep Expo Router entrypoints, global providers, and application bootstrapping here.
- `apps/server` is the Elysia process composition root. Keep process startup, global middleware, infrastructure wiring, and versioned route mounting here.
- `packages/<feature>` owns a product domain across platforms. A feature may contain both `src/server` and `src/native`, along with its tests. Keep behavior with its domain instead of splitting it into app-level folders.
- `packages/_ui` owns reusable native presentation primitives, screens, and theme infrastructure that are not specific to one feature.
- `packages/_db` owns Drizzle configuration, schemas, and database access.
- `packages/__env__` owns environment parsing and server/native environment entrypoints.
- `packages/__shared__` owns cross-domain runtime utilities. Prefer a feature package when only one domain consumes the code.
- `packages/__config__` owns shared build and TypeScript configuration.

The leading underscores communicate infrastructure scope: `__*` packages are foundational configuration/shared infrastructure, `_*` packages are shared platform services, and unprefixed packages are product domains. Preserve this convention when extending the existing workspace.

## Platform boundaries

Use `src/server` for server-only code and `src/native` for Expo/React Native code. Use `src/common` only for genuinely platform-neutral code.

Never make native code import a server entrypoint. Never expose secrets or server environment modules through native exports. `EXPO_PUBLIC_*` values are public bundle configuration and must not contain secrets.

Keep route entrypoints thin:

- Files under `apps/native/src/app` should select and compose package-owned screens; do not implement domain behavior there.
- `apps/server/src/index.ts` and `apps/server/src/v1-routes.ts` should mount package-owned routes; do not grow feature controllers or services in the app.

## Package boundaries and exports

- Import across packages through `@_latest-es/*` package exports and declare the workspace dependency in the consumer's `package.json`.
- Use relative imports within the same package.
- Add the narrowest useful `exports` entry when another package needs a module. Do not expose an entire internal source tree for convenience.
- Keep platform identity visible in export paths, such as `./native/...` and `./server/...`.
- Put shared dependency versions in the root workspace catalog when multiple packages must stay aligned.

## Feature shape

Follow the existing feature vocabulary when it fits the code:

```text
packages/<feature>/
├── src/
│   ├── native/
│   │   ├── api/
│   │   ├── components/
│   │   ├── helpers/
│   │   ├── screens/
│   │   └── types.ts
│   └── server/
│       ├── controllers/
│       ├── helpers/
│       ├── services/
│       ├── validators/
│       └── types.ts
├── __tests__/
│   ├── unit/
│   └── integration/
├── package.json
└── tsconfig.json
```

Create only directories the feature actually needs. Services hold domain behavior, controllers translate HTTP concerns, validators define transport contracts, native API modules own remote access/query options, and screens compose UI.

## Before finishing a structural change

Check package exports, workspace dependencies, TypeScript project coverage, and whether the code still belongs to the package that owns the behavior. Run `bun run check` before committing.
