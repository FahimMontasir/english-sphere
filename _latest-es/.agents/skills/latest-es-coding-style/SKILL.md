---
name: latest-es-coding-style
description: Apply the _latest-es TypeScript, Elysia, Expo, React Native, imports, errors, and formatting conventions. Use when writing or refactoring application code in this project.
---

# _latest-es coding style

Match the repository's executable configuration first. Vite+ is the formatter and linter; TypeScript is strict.

## Formatting and imports

- Use double quotes and semicolons. Let `vp fmt` and `vp check --fix` decide mechanical formatting.
- Keep imports in three groups when applicable: external dependencies, `@_latest-es/*` workspace imports, then relative imports. Separate groups with a blank line.
- Use `import type` when an import is type-only and `verbatimModuleSyntax` requires it.
- Do not manually align or preserve formatting that conflicts with Vite+.
- Use descriptive file names in kebab-case. Follow existing Expo Router naming rules for route files and parameters.

## TypeScript

- Preserve strict typing, `noUncheckedIndexedAccess`, unused-symbol checks, and exhaustive control flow.
- Model unknown input at the boundary, validate or narrow it, and keep the internal type precise. Avoid `any`, unchecked assertions, and duplicated hand-written types when a library can infer the contract.
- Prefer small named functions for reusable behavior and keep side effects near their boundary.
- Use `null` or `undefined` consistently with the existing API being implemented; do not convert between them merely for style.
- Export only the modules required by package consumers. Prefer named exports.

## Elysia server code

- Keep Elysia composition declarative and retain end-to-end inferred types.
- Put feature routes in the feature package and mount them from the server app.
- Use `secureAPI` and `authorize: true` for authenticated domain routes.
- Define request and response schemas in the feature validator layer. Include explicit schemas for non-2xx responses.
- Return stable machine-readable error codes with human-readable messages, and use Elysia's typed `status(...)` response for failures.
- Add OpenAPI `detail` metadata, including tags, summary, and cookie security for authenticated routes.
- Keep controllers thin; domain lookup and mutation logic belongs in services.

## Expo and React Native code

- Keep files in `apps/native/src/app` limited to routing and composition; import package-owned screens.
- Put reusable UI and design tokens in `@_latest-es/ui`; do not copy theme values across features.
- Put feature-specific components, helpers, API clients, and screens in their feature package.
- Keep server-state access in API/query modules. Prefer stable TanStack Query key factories and `queryOptions` factories so screens consume typed hooks rather than constructing requests.
- Add stable, semantic `testID` values to controls used by Maestro. Do not select layout positions or generated text when a stable ID is possible.
- Handle loading, empty, error, and authenticated/unauthenticated states explicitly.
- Treat iOS, Android, and web differences as platform behavior; keep the shared business and screen structure reusable.

## Configuration and secrets

- Parse server configuration through `@_latest-es/env/server` rather than reading scattered environment variables in domain code.
- Native public configuration belongs behind the native environment entrypoint. Never place credentials, private endpoints, or secrets in `EXPO_PUBLIC_*` variables.
- Use the root workspace catalog for versions intentionally shared across packages.

## Verification

Use a focused type or test command while iterating. Before committing, run `bun run check`; it applies fixes and executes the required type and test gate.
