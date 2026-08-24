# _latest-es Agent Instructions

These instructions are authoritative for all work in `_latest-es/`.

## Scope

- Work from the `_latest-es/` directory and keep all new code, tests, agent skills, and OpenSpec artifacts inside it.
- Treat sibling top-level projects as legacy read-only references unless the user explicitly places one in scope.
- Preserve unrelated user changes in the working tree.

## Skill-first workflow

- Start each task by checking the applicable project skills under `.agents/skills/` and use the smallest set that covers the request.
- Read each selected `SKILL.md` completely before acting. Follow its linked references only when they are relevant to the current work.
- Give the project skills `latest-es-architecture`, `latest-es-coding-style`, and `latest-es-testing` priority for repository structure, implementation conventions, and verification.
- Combine project skills with the relevant Bun, Elysia, Better Auth, Expo, TanStack Query, and React Native skills when the task touches those technologies.
- Skills guide implementation but do not expand the user's requested scope or authorization.

## OpenSpec is required

Use the OpenSpec system for every code, configuration, schema, architecture, or test change. Read `openspec/config.yaml`, inspect active changes, and select the matching OpenSpec skill before editing:

- Use `openspec-explore` to investigate or clarify an uncertain change.
- Use `openspec-propose` when a requested change does not yet have planning artifacts.
- Use `openspec-apply-change` to implement tasks from an existing change.
- Use `openspec-update-change` when decisions or scope require an existing change to be revised before implementation.
- Use `openspec-sync-specs` when delta specifications should update the main specifications without archiving.
- Use `openspec-archive-change` only after implementation and verification are complete.

Keep all new OpenSpec artifacts under `_latest-es/openspec/`. Read-only questions, explanations, and repository inspection do not require creating a proposal, but any resulting project modification must return to the appropriate OpenSpec workflow before editing.

## Current documentation with Context7

Use Context7 whenever current package, framework, SDK, API, or CLI documentation could affect the answer or implementation. This includes setup, configuration, API syntax, migrations, version-specific behavior, and library-specific debugging.

1. Resolve the library ID unless the user supplied an exact `/org/project` Context7 ID.
2. Prefer the exact library and version used by this workspace.
3. Query one focused documentation concept at a time.
4. Base package-specific decisions on the retrieved documentation rather than memory.

Context7 is not required for repository-local business logic, straightforward refactoring, code review, or facts already defined by this workspace.

## Technology priorities

### Native application

- Prefer official Expo packages and Expo-supported APIs for native capabilities. They have higher priority than generic React Native or third-party packages when they satisfy the requirement.
- Use Expo Router for navigation and route composition, `@expo/ui` or existing shared UI primitives for native controls, and Expo modules for device functionality.
- Use `npx expo install` when adding Expo or React Native packages so versions remain compatible with the installed Expo SDK.
- Prefer existing dependencies and shared components before introducing another UI, navigation, storage, networking, or native-module library.
- Keep `apps/native/src/app` thin and put domain screens and behavior in their owning packages.

### Server and tooling

- Use Bun as the runtime, package manager, script runner, and test runner. Do not introduce npm, Yarn, pnpm, Jest, or Node-only tooling when Bun already provides the required capability.
- Prefer Bun built-in APIs over Node compatibility APIs or new third-party packages when the built-in is stable, compatible, and materially equivalent.
- Use Elysia as the HTTP framework and preserve its end-to-end types, schemas, lifecycle, and plugin composition.
- Do not replace established domain tools such as Better Auth, Drizzle, Eden, or PostgreSQL merely because Bun has a lower-level primitive.
- Prefer `Bun.spawn`, `Bun.file`, Bun environment loading, and `bun:test` for new server scripts and tests when they fit the requirement.

## Architecture and code quality

- Follow `.agents/skills/latest-es-architecture/SKILL.md` for package ownership, server/native boundaries, imports, and exports.
- Follow `.agents/skills/latest-es-coding-style/SKILL.md` for strict TypeScript, Vite+ formatting, Elysia contracts, Expo code, and secrets.
- Use workspace imports through declared `@_latest-es/*` exports; use relative imports only within a package.
- Keep feature behavior in feature packages. Apps are composition roots.
- Never place secrets in `EXPO_PUBLIC_*` values.

## Tests and completion

- Follow `.agents/skills/latest-es-testing/SKILL.md` whenever behavior or test infrastructure changes.
- Use Bun for unit and integration tests and Maestro for the shared web/Android E2E journey.
- Keep web and Android Maestro entry flows limited to their `url` or `appId`; reuse shared flows for behavior.
- Run focused checks while iterating. Before every commit, run `bun run check`, which fixes formatting/lint and runs types, unit, integration, and Maestro web E2E through the shared runtime.
- Run `bun run test:all` when Android E2E is required as well.
