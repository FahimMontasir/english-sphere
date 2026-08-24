# _latest-es

This project is a modern TypeScript stack that combines React Native, Expo, Elysia, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **React Native** - Build mobile apps using React
- **Expo** - Tools for React Native development
- **Elysia** - Type-safe, high-performance framework
- **Bun** - Runtime environment
- **Drizzle** - TypeScript-first ORM
- **PostgreSQL + pgvector** - Transactional data and the vector foundation for RAG
- **Redis** - Password-protected cache/queue infrastructure
- **Garage** - Private S3-compatible storage with a local administration panel
- **Authentication** - Better-Auth
- **Modular backend** - Thin Elysia composition with PMH-style feature packages
- **Typed native API** - Eden Treaty contracts with TanStack Query server-state management
- **Mobile E2E** - Maestro flows using stable React Native `testID` selectors
- **Vite+** - Unified Vite toolchain, workspace task runner, linting, and formatting

## Getting Started

First, install the dependencies:

```bash
bun install
```

## Local Development

Copy `apps/server/.env.example` to `apps/server/.env`, then run:

```bash
bun run dev
```

The command waits for PostgreSQL/pgvector, Redis, Garage, and Garage WebUI, applies the Drizzle
schema, then starts the API, Expo, and Drizzle Studio in parallel. Local defaults avoid common port
collisions: PostgreSQL `5433`, Redis `6380`, Garage S3/admin APIs `3900`-`3903`, and Garage WebUI
`3909`.

Use an Expo development build for native development. Expo Go is not the target runtime because the
planned on-device AI adapters require native modules.

Developer endpoints:

- API: [http://localhost:3000](http://localhost:3000)
- API reference: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- Better Auth reference: [http://localhost:3000/api/auth/reference](http://localhost:3000/api/auth/reference)
- Drizzle Studio: [https://local.drizzle.studio](https://local.drizzle.studio)
- Storage administration: [http://localhost:3909](http://localhost:3909)

All `/api/v1` domain routes require a Better Auth session. Development and tests idempotently create
the local `BOOTSTRAP_USER_*` learner; bootstrap creation and the Maestro sign-in helper are disabled
in production.

Native public configuration uses `EXPO_PUBLIC_*` values from `apps/native/.env`. Bun loads server
configuration from `apps/server/.env` automatically. Never place secrets in `EXPO_PUBLIC_*` values.

Expo Router files live in `apps/native/src/app`, which contains route entrypoints and app composition
only. Each domain package couples its `src/server` and `src/native` behavior; for example,
`packages/learning-content` owns its Elysia routes, Eden/TanStack Query client, native screens, and
tests. `packages/_ui` owns shared Expo UI and React Native presentation primitives, while
`packages/__shared__/src/native` owns cross-domain Query lifecycle infrastructure.

## Git Hooks and Formatting

- Optional native Vite+ hooks: `bun run hooks:setup`
- Docs: [Vite+ commit hooks](https://viteplus.dev/guide/commit-hooks)
- Run checks: `bun run check`

## Project Structure

```
_latest-es/
├── apps/
│   ├── native/      # Mobile application (React Native, Expo)
│   └── server/      # Backend API (Elysia)
├── packages/
│   ├── __config__/  # PMH-style shared TypeScript configuration
│   ├── __env__/     # Bun server environment configuration
│   ├── __shared__/  # Cross-feature backend utilities
│   ├── _db/         # Database schema & queries
│   ├── _ui/         # Shared Expo UI and React Native presentation primitives
│   ├── auth/        # Coupled server/native authentication domain
│   ├── home/        # Native home domain
│   └── learning-content/ # Coupled server/native learning-content domain
```

## Available Scripts

- `bun run dev`: Start all applications in development mode
- `bun run build`: Build all applications
- `bun run dev:server`: Start only the server
- `bun run check-types`: Check TypeScript types across all apps
- `bun run dev:native`: Start the React Native/Expo development server
- `bun run db:push`: Push schema changes to database
- `bun run db:generate`: Generate database client/types
- `bun run db:migrate`: Run database migrations
- `bun run db:studio`: Open database studio UI
- `bun run check`: Run Vite+ format/lint checks and workspace TypeScript checks
- `bun run test`: Run Bun unit and HTTP route tests
- `bun run test:routes`: Start infrastructure, apply the schema, and run authenticated route tests
- `bun run test:e2e`: Start dependencies and run authenticated Maestro web flows
- `bun run test:all`: Run unit, authenticated route, and Maestro web suites
- `bun run dkr:start` / `dkr:stop` / `dkr:down`: Manage the complete local service stack
- `bun run test:e2e:native`: Run the retained native Maestro flow against an installed build
- `bun run lint`: Run Vite+ lint checks
- `bun run format`: Run Vite+ formatting
- `bun run staged`: Run Vite+ checks against staged files
- `bun run hooks:setup`: Install Vite+ native Git hooks with `vp config`
