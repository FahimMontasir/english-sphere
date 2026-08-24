# Learning content

PMH-style backend feature package for the first migrated legacy English Sphere journey.

- `src/native`: Eden/TanStack Query API, helpers, components, and screens for the same domain
- `src/server/validators`: Elysia schemas that define the transport contract
- `src/server/types.ts`: TypeScript types inferred from the transport schemas
- `src/server/controllers`: thin HTTP transport and response declarations
- `src/server/services`: learning-material behavior and data access boundary
- `src/server/helpers`: route paths and small reusable helpers
- `__tests__/native`: native-domain helper tests
- `__tests__/unit`: server behavior tests
- `__tests__/integration`: public HTTP route tests

The initial in-memory catalog is setup data copied from the legacy Learning Materials experience.
It is intentionally isolated behind the service so persistence can replace it without changing
the controller or native client contract.
