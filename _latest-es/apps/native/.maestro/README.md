# Native E2E

The web catalog and detail flows expect the API at `http://localhost:3000` and Expo web at
`http://localhost:8081`.

```bash
bun run dev:server
bun run dev:native -- --web
bun run test:e2e
```

Install Maestro using its official Homebrew tap. Maestro downloads its managed Chromium browser on
the first web run.

The retained native flow requires a development build with app ID `com.englishsphere.mobile` on a
booted simulator or connected device. Run it later with `bun run test:e2e:native`.
