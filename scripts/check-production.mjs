import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { once } from "node:events";
import { verifyPreview } from "./verify-preview.mjs";

// A dedicated test server avoids touching the user's running preview.
const port = process.env.TEST_PORT ?? "3100";
const origin = `http://127.0.0.1:${port}`;
const controller = new AbortController();
const server = spawn(
  process.execPath,
  [
    fileURLToPath(
      new URL("../node_modules/next/dist/bin/next", import.meta.url),
    ),
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    port,
  ],
  { stdio: ["ignore", "pipe", "pipe"], env: process.env },
);
const closed = once(server, "close").catch(() => undefined);
let output = "";
server.stdout.on("data", (chunk) => {
  output += chunk;
});
server.stderr.on("data", (chunk) => {
  output += chunk;
});
server.on("error", (error) => controller.abort(error));
try {
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null || controller.signal.aborted)
      throw new Error(`Test server failed:\n${output}`);
    // Wait for this process's own readiness, rather than accepting another server on the port.
    if (output.includes("Ready in")) {
      ready = true;
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  if (!ready) throw new Error(`Test server did not become ready:\n${output}`);
  await verifyPreview(origin);
  if (/\u2a2f|Error \[|Unhandled/i.test(output))
    throw new Error(`Server reported an error:\n${output}`);
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  if (server.exitCode === null) server.kill();
  // Waiting for close (not just exit) also drains child stdio handles on Windows.
  await closed;
}
