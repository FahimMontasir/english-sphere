import { fileURLToPath } from "node:url";

const workspace = fileURLToPath(new URL("..", import.meta.url));
const processes: Bun.Subprocess[] = [];

function start(command: string[]) {
  const process = Bun.spawn(command, {
    cwd: workspace,
    env: { ...Bun.env, CI: "1" },
    stdout: "inherit",
    stderr: "inherit",
  });
  processes.push(process);
  return process;
}

async function waitFor(url: string, timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The development server is still starting.
    }
    await Bun.sleep(500);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

try {
  start(["bun", "run", "dev:server"]);
  start(["bun", "run", "dev:native", "--", "--web"]);

  await Promise.all([
    waitFor("http://localhost:3000/health"),
    waitFor("http://localhost:8081/materials"),
  ]);

  const maestro = start(["maestro", "test", "apps/native/.maestro/web"]);
  const exitCode = await maestro.exited;
  if (exitCode !== 0) process.exitCode = exitCode;
} finally {
  for (const process of processes) {
    if (process.exitCode === null) process.kill();
  }
}
