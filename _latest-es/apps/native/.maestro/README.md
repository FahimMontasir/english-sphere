# Maestro E2E

The web and Android entry flows differ only by Maestro's required `url` or `appId` header. Both run
the shared `flows/materials.yaml` scenario. The web entry uses the non-production `/api/test-auth`
redirect; the Android branch signs in with the same local bootstrap learner.

```bash
bun run test:e2e:web
bun run test:e2e:android
```

Both root commands start infrastructure, apply the database schema, start the API, and start the
required Expo target. The Android command starts a Maestro Android emulator when no Android device
is connected, installs the Expo development build, and reverses port 3000 through ADB.

The credentials are the development-only `BOOTSTRAP_USER_*` values in `apps/server/.env`; the runner
passes them only to the temporary Android Expo process so the flow does not depend on emulator text
injection. They are not committed or used by normal builds. Install Maestro using its official
Homebrew tap. Maestro downloads managed Chromium on the first web run.
