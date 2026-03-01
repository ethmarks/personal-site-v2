// The following script was vibe-coded with Claude Sonnet 4.6.
// I have no idea how it works, only that it does.

import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.join(ROOT, "dist");
const PORT = 7331;

const WATCH_DIRS = ["wc", "scss", "scripts", "fonts", "misc"];
const WATCH_FILES = [
  "build.js",
  "map.js",
  "rollup.js",
  "script.js",
  "scss.js",
  "wc.js",
  "wc-fallback.js",
];

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".json": "application/json",
};

// ----------------------------------------------------------------------------
// SSE clients
// ----------------------------------------------------------------------------

/** @type {Set<http.ServerResponse>} */
const clients = new Set();

function broadcast(event, data = "") {
  const payload = `event: ${event}\ndata: ${data}\n\n`;
  for (const res of clients) {
    res.write(payload);
  }
}

// ----------------------------------------------------------------------------
// Build
// ----------------------------------------------------------------------------

let building = false;
let pendingRebuild = false;

function build() {
  if (building) {
    pendingRebuild = true;
    return;
  }

  building = true;
  pendingRebuild = false;
  console.log("\n🔨 Building…");
  broadcast("building");

  const proc = spawn("node", ["build.js"], { cwd: ROOT, stdio: "inherit" });

  proc.on("close", (code) => {
    building = false;
    if (code === 0) {
      console.log("✅ Build complete — reloading");
      broadcast("reload");
    } else {
      console.error(`❌ Build failed (exit ${code})`);
      broadcast("error", `Build failed with exit code ${code}`);
    }
    if (pendingRebuild) build();
  });
}

// ----------------------------------------------------------------------------
// File watcher
// ----------------------------------------------------------------------------

// Debounce: many editors write files in multiple rapid events
let debounceTimer = null;
function scheduleBuild() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(build, 150);
}

for (const dir of WATCH_DIRS) {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) continue;
  fs.watch(full, { recursive: true }, (event, filename) => {
    console.log(`  changed: ${dir}/${filename}`);
    scheduleBuild();
  });
}

for (const file of WATCH_FILES) {
  const full = path.join(ROOT, file);
  if (!fs.existsSync(full)) continue;
  fs.watch(full, (event, filename) => {
    console.log(`  changed: ${filename}`);
    scheduleBuild();
  });
}

// ----------------------------------------------------------------------------
// HTTP server
// ----------------------------------------------------------------------------

function serveFile(res, filePath) {
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
    return;
  }
  const mime = MIME_TYPES[path.extname(filePath)] ?? "application/octet-stream";
  res.writeHead(200, { "Content-Type": mime });
  fs.createReadStream(filePath).pipe(res);
}

// Injects the SSE reload snippet just before </body>
function injectReloadSnippet(html) {
  const snippet = `
<script>
(function () {
    const es = new EventSource("/__dev/sse");
    es.addEventListener("reload", () => location.reload());
    es.addEventListener("building", () => console.log("[dev] building…"));
    es.addEventListener("error", (e) => console.error("[dev] build error:", e.data));
    es.onerror = () => setTimeout(() => location.reload(), 1000);
})();
</script>`;
  return html.includes("</body>")
    ? html.replace("</body>", snippet + "\n</body>")
    : html + snippet;
}

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const reqUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = reqUrl.pathname;

  // SSE endpoint
  if (pathname === "/__dev/sse") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    res.write(":\n\n"); // initial heartbeat
    clients.add(res);
    req.on("close", () => clients.delete(res));
    return;
  }

  // Map / to /test
  const filePath = path.join(
    DIST_DIR,
    pathname === "/" ? "test.html" : pathname,
  );

  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
    return;
  }

  // Inject reload snippet into HTML files
  if (path.extname(filePath) === ".html") {
    try {
      const html = fs.readFileSync(filePath, "utf-8");
      const injected = injectReloadSnippet(html);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(injected);
    } catch {
      serveFile(res, filePath);
    }
    return;
  }

  serveFile(res, filePath);
});

server.listen(PORT, () => {
  console.log(`Dev server running at http://localhost:${PORT}`);
  console.log(`  Watching: ${[...WATCH_DIRS, ...WATCH_FILES].join(", ")}`);
  console.log("\nRunning initial build…");
  build();
});
