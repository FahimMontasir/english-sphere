# Maestro E2E

The web and Android entry flows differ only by Maestro's required `url` or `appId` header. Both run
the shared `flows/materials.yaml` scenario. The web entry uses the non-production `/api/test-auth`
redirect; the Android branch signs in with the same local bootstrap learner.

```bash
bun run test:e2e:web
bun run test:e2e:android
```

Both root commands start infrastructure, apply the database schema, start the API, and start the
required Expo target. Following Maestro's Android setup, the Android command runs
`maestro start-device --platform android`, installs the Expo development build, and reverses port
3000 through ADB. Maestro's Android SDK prerequisites must be installed so it can create its
supported emulator.

Before the first Android run, install Android Studio's SDK Platform Tools, Emulator, and SDK
Command-Line Tools under `ANDROID_HOME`. Running `maestro start-device --platform android` once will
then offer to install Maestro's supported system image and create its managed Pixel emulator. Do not
substitute an arbitrary AVD with an unsupported API level.

The credentials are the development-only `BOOTSTRAP_USER_*` values in `apps/server/.env`; the runner
passes them to Maestro with `-e` for the Android sign-in steps. They are not committed or embedded
in the app bundle. Install Maestro using its official Homebrew tap. Maestro downloads managed
Chromium on the first web run.
