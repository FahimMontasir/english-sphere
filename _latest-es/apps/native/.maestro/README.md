# Native E2E

The web catalog and detail flows use the non-production `/api/test-auth` redirect to sign in the
local bootstrap learner before asserting protected content. The root command starts
PostgreSQL/pgvector, Redis, Garage, the API, and Expo web for you.

```bash
bun run test:e2e
```

The credentials are the development-only `BOOTSTRAP_USER_*` values in `apps/server/.env`; they are
never embedded in the app or supplied to Maestro. Install Maestro using its official Homebrew tap;
Maestro downloads its managed Chromium browser on the first web run.

The retained native flow requires a development build with app ID `com.englishsphere.mobile` on a
booted simulator or connected device. Run it later with `bun run test:e2e:native`.
