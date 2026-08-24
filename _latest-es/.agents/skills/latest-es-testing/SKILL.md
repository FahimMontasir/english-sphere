---
name: latest-es-testing
description: Add, update, run, or debug unit, integration, Maestro web/Android, and pre-commit tests in _latest-es. Use whenever behavior changes require tests or a repository test command, fixture, selector, or runtime lifecycle is being changed.
---

# _latest-es testing

Use the root commands as the public test interface. `scripts/test-runtime.ts` owns shared infrastructure and application lifecycle; individual test suites should not independently start duplicate Docker, API, or Expo processes.

## Test placement

- Put fast isolated tests in `packages/<owner>/__tests__/unit/**/*.test.ts`.
- Put tests that exercise authenticated Elysia routes, the database, or multiple package boundaries in `packages/<owner>/__tests__/integration/**/*.test.ts`.
- Keep native helpers and pure presentation logic that can run without a device under `__tests__/unit`; do not create a separate `__tests__/native` bucket because the root unit glob intentionally discovers `packages/**/__tests__/unit`.
- Put cross-platform user journeys in `apps/native/.maestro/flows/`.

Tests live with the package that owns the behavior. A route mounted by `apps/server` but implemented by a feature package is tested in that feature package.

## Commands

Use the narrowest command that proves the current change while iterating:

```bash
bun run test:unit
bun run test:integration
bun run test:e2e:web
bun run test:e2e:android
```

The required pre-commit command is:

```bash
bun run check
```

It fixes formatting/lint, then runs type checks, all unit tests, integration tests, and Maestro web E2E through one shared runtime. Do not replace it with a hand-written sequence of overlapping commands.

Use `bun run test:all` when Android E2E is also required. Android is not part of the default pre-commit gate because emulator/build startup is materially slower.

## Unit tests

- Use `bun:test` and behavior-focused `describe`/`test` names.
- Keep unit tests deterministic and independent of Docker, network services, Expo, wall-clock timing, and test order.
- Exercise success, boundary, and meaningful failure behavior. Avoid assertions on private implementation details.
- When adding a new package with unit tests, add its local `test:unit` script for developer ergonomics, while relying on the root glob for complete discovery.

## Integration tests

- Use the real typed Elysia/Eden contract where practical.
- Verify authorization separately from authenticated behavior.
- Obtain the development-only learner session through the existing bootstrap helpers; do not embed credentials in source or bypass the auth middleware being tested.
- Let the root runtime prepare Docker, apply the schema, start the API, and start Expo when needed.
- Keep fixtures idempotent so repeated local and pre-commit runs do not accumulate state or depend on prior runs.

## Maestro E2E

Web and Android must reuse the same scenario. Keep only the required launch header different:

- `web.yaml` supplies the web `url`.
- `android.yaml` supplies the Android `appId`.
- Both entry files run the shared flow under `apps/native/.maestro/flows/`.

Use `when.platform` only for genuinely platform-specific navigation or authentication steps. Keep shared assertions outside platform branches.

Prefer stable React Native `testID` selectors for interactions. User-visible text is appropriate for outcome assertions. Never duplicate the complete journey into separate web and Android flow files.

The runner passes development credentials with Maestro `-e` values and handles Android device startup, ADB port reversal, native build installation, API readiness, and Expo readiness. Do not commit credentials into YAML or add fixed sleeps to compensate for missing readiness checks.

## Changing the test runtime

- Reuse already healthy services before spawning new ones.
- Track every spawned child and terminate owned children on normal completion and signals.
- Use readiness probes with bounded timeouts; fail immediately when a child exits before readiness.
- Parallelize independent work, but share expensive infrastructure and server lifecycles.
- Keep root script names stable unless the user explicitly requests an interface change; documentation and hooks depend on them.

After changing test orchestration, run at least the affected root commands. Before a commit, the final verification remains `bun run check`.
