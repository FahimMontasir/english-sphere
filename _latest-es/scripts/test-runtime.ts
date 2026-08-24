import { dirname } from "node:path";

type TestMode = "android" | "integration" | "web";

const workspace = dirname(import.meta.dir);
const mode = Bun.argv[2] as TestMode | undefined;
const children = new Set<Bun.Subprocess>();

if (mode !== "android" && mode !== "integration" && mode !== "web") {
  throw new Error("Expected a test mode: integration, web, or android");
}

function start(command: string[], cwd = workspace, environment: Record<string, string> = {}) {
  const child = Bun.spawn(command, {
    cwd,
    env: { ...Bun.env, ...environment, CI: "1" },
    stdout: "inherit",
    stderr: "inherit",
  });
  children.add(child);
  return child;
}

async function run(command: string[], cwd = workspace) {
  const child = start(command, cwd);
  const exitCode = await child.exited;
  children.delete(child);
  if (exitCode !== 0) {
    throw new Error(`${command[0]} exited with code ${exitCode}`);
  }
}

async function canFetch(url: string) {
  try {
    const response = await fetch(url);
    return response.ok;
  } catch {
    return false;
  }
}

async function waitFor(
  check: () => Promise<boolean>,
  label: string,
  timeoutMs: number,
  child?: Bun.Subprocess,
) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await check()) return;
    if (child && child.exitCode !== null) {
      throw new Error(`${label} exited before it became ready (code ${child.exitCode})`);
    }
    await Bun.sleep(500);
  }
  throw new Error(`Timed out waiting for ${label}`);
}

async function ensureService(url: string, label: string, command: string[], timeoutMs = 120_000) {
  if (await canFetch(url)) return;
  const child = start(command);
  await waitFor(() => canFetch(url), label, timeoutMs, child);
}

async function isAndroidAppInstalled() {
  const child = Bun.spawn(["adb", "shell", "pm", "path", "com.englishsphere.mobile"], {
    cwd: workspace,
    stdout: "pipe",
    stderr: "pipe",
  });
  const output = await new Response(child.stdout).text();
  return (await child.exited) === 0 && output.includes("package:");
}

function maestroE2EArguments() {
  const email = Bun.env.BOOTSTRAP_USER_EMAIL;
  const password = Bun.env.BOOTSTRAP_USER_PASSWORD;
  if (!email || !password) {
    throw new Error("BOOTSTRAP_USER_EMAIL and BOOTSTRAP_USER_PASSWORD are required");
  }
  return ["-e", `E2E_EMAIL=${email}`, "-e", `E2E_PASSWORD=${password}`];
}

function cleanup() {
  for (const child of children) {
    if (child.exitCode === null) child.kill();
  }
}

process.on("SIGINT", () => {
  cleanup();
  process.exit(130);
});
process.on("SIGTERM", () => {
  cleanup();
  process.exit(143);
});

try {
  await ensureService("http://localhost:3000/health", "API server", ["bun", "run", "dev:server"]);

  if (mode === "integration") {
    await ensureService("http://localhost:8081/status", "Expo native server", [
      "bun",
      "run",
      "dev:native",
    ]);
    await run(["bun", "run", "test:integration:run"]);
  }

  if (mode === "web") {
    await ensureService("http://localhost:8081/materials", "Expo web app", [
      "bun",
      "run",
      "dev:native",
      "--",
      "--web",
    ]);
    await run(["maestro", "test", "--headless", "apps/native/.maestro/web.yaml"]);
  }

  if (mode === "android") {
    await run(["maestro", "start-device", "--platform", "android"]);
    await run(["adb", "reverse", "tcp:3000", "tcp:3000"]);
    const native = start(["bun", "run", "--cwd", "apps/native", "android"]);
    await Promise.all([
      waitFor(
        () => canFetch("http://localhost:8081/status"),
        "Expo native server",
        1_200_000,
        native,
      ),
      waitFor(isAndroidAppInstalled, "Android development build", 1_200_000, native),
    ]);
    await run(["maestro", "test", ...maestroE2EArguments(), "apps/native/.maestro/android.yaml"]);
  }
} finally {
  cleanup();
}
