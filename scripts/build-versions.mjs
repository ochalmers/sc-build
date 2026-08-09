#!/usr/bin/env node
/**
 * Build dated URL folders for side-by-side review:
 *   /v/2026-07-29/  — production snapshot (keeps existing comment scopes)
 *   /v/2026-08-09/  — current working tree
 *   /               — version switcher
 *
 * Absolute /assets/* paths keep working via a root-level assets copy.
 */
import { execSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { BUILD_VERSIONS } from "../src/content/buildVersions.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");

/** Deploy-only metadata keyed by version id from `buildVersions.js`. */
const VERSION_BUILD_META = {
  "2026-07-29": {
    kind: "archive",
    commit: "2d1ade2bf5100f50e927615a30138284dc4d4a65",
  },
  "2026-08-09": {
    kind: "current",
  },
};

const VERSIONS = BUILD_VERSIONS.map((version) => {
  const meta = VERSION_BUILD_META[version.id];
  if (!meta) throw new Error(`Missing VERSION_BUILD_META for ${version.id}`);
  return { ...version, ...meta };
});

function run(cmd, opts = {}) {
  console.log(`\n$ ${cmd}`);
  execSync(cmd, { stdio: "inherit", cwd: ROOT, ...opts });
}

function patchArchiveMain(worktree) {
  const mainPath = join(worktree, "src/main.jsx");
  let src = readFileSync(mainPath, "utf8");
  if (!src.includes("basename=")) {
    if (!src.includes("<BrowserRouter>")) {
      throw new Error("archive main.jsx missing <BrowserRouter> to patch");
    }
    src = src.replace(
      `import "./index.css";\n\nReactDOM.createRoot(document.getElementById("root")).render(\n  <React.StrictMode>\n    <BrowserRouter>\n      <App />\n    </BrowserRouter>`,
      `import "./index.css";\n\nconst basename = (import.meta.env.BASE_URL || "/").replace(/\\/$/, "") || undefined;\n\nReactDOM.createRoot(document.getElementById("root")).render(\n  <React.StrictMode>\n    <BrowserRouter basename={basename}>\n      <App />\n    </BrowserRouter>`,
    );
    if (!src.includes("basename={basename}")) {
      throw new Error("failed to patch archive BrowserRouter basename");
    }
    writeFileSync(mainPath, src);
  }
}

/** Bring the nav version selector into the frozen July snapshot before building it. */
function patchArchiveVersionSwitcher(worktree) {
  mkdirSync(join(worktree, "src/content"), { recursive: true });
  mkdirSync(join(worktree, "src/app/components"), { recursive: true });
  cpSync(join(ROOT, "src/content/buildVersions.js"), join(worktree, "src/content/buildVersions.js"));
  cpSync(
    join(ROOT, "src/app/components/VersionSwitcher.jsx"),
    join(worktree, "src/app/components/VersionSwitcher.jsx"),
  );

  const shellPath = join(worktree, "src/app/components/AppShell.jsx");
  let shell = readFileSync(shellPath, "utf8");
  if (shell.includes("VersionSwitcher")) return;

  if (!shell.includes('import { CombinedViewSwitcher } from "./CombinedViewSwitcher.jsx";')) {
    throw new Error("archive AppShell missing CombinedViewSwitcher import to patch");
  }
  shell = shell.replace(
    'import { CombinedViewSwitcher } from "./CombinedViewSwitcher.jsx";\n',
    'import { CombinedViewSwitcher } from "./CombinedViewSwitcher.jsx";\nimport { VersionSwitcher } from "./VersionSwitcher.jsx";\n',
  );
  shell = shell.replace(
    "<CombinedViewSwitcher />\n          </div>",
    "<CombinedViewSwitcher />\n            <VersionSwitcher />\n          </div>",
  );
  if (!shell.includes("<VersionSwitcher />")) {
    throw new Error("failed to patch archive AppShell VersionSwitcher");
  }
  writeFileSync(shellPath, shell);
}

function writeRootSwitcher(versions) {
  const cards = versions
    .map(
      (v) => `
      <a class="card" href="/v/${v.id}/">
        <div class="meta">
          <span class="badge">${v.badge}</span>
          <span class="id">/v/${v.id}/</span>
        </div>
        <h2>${v.label}</h2>
        <p>${v.blurb}</p>
        <span class="cta">Open →</span>
      </a>`,
    )
    .join("\n");

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sonocea — dated builds</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <style>
    :root { color-scheme: dark; --bg:#0c0c0c; --panel:#161616; --ink:#f5f2ea; --muted:#a7a29a; --line:rgba(245,242,234,.12); --accent:#d8c3a5; }
    * { box-sizing: border-box; }
    body { margin:0; min-height:100vh; font-family:Inter,system-ui,sans-serif; background:
      radial-gradient(1000px 500px at 10% -10%, rgba(216,195,165,.18), transparent 55%),
      radial-gradient(800px 420px at 90% 0%, rgba(120,140,160,.12), transparent 50%),
      var(--bg); color:var(--ink); }
    main { width:min(920px, calc(100% - 48px)); margin:0 auto; padding:72px 0 96px; }
    .eyebrow { letter-spacing:.14em; text-transform:uppercase; font-size:11px; color:var(--muted); margin:0 0 14px; }
    h1 { font-size:clamp(32px, 5vw, 48px); line-height:1.05; font-weight:560; margin:0 0 14px; letter-spacing:-.02em; }
    .lede { max-width:46ch; color:var(--muted); font-size:16px; line-height:1.5; margin:0 0 40px; }
    .grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:16px; }
    .card { display:flex; flex-direction:column; gap:10px; padding:22px; border:1px solid var(--line); border-radius:18px; background:rgba(22,22,22,.88); color:inherit; text-decoration:none; transition:border-color .15s ease, transform .15s ease; }
    .card:hover { border-color:rgba(216,195,165,.45); transform:translateY(-2px); }
    .meta { display:flex; justify-content:space-between; gap:12px; align-items:center; }
    .badge { font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:#1a1510; background:var(--accent); padding:4px 8px; border-radius:999px; font-weight:650; }
    .id { font-size:12px; color:var(--muted); font-variant-numeric:tabular-nums; }
    h2 { margin:0; font-size:24px; letter-spacing:-.02em; }
    p { margin:0; color:var(--muted); line-height:1.45; flex:1; }
    .cta { margin-top:8px; color:var(--accent); font-size:14px; font-weight:600; }
  </style>
</head>
<body>
  <main>
    <p class="eyebrow">Sonocea build archive</p>
    <h1>Pick a dated version</h1>
    <p class="lede">The July build keeps every shared comment in place. The August build is the newer prototype. Same site — different folders on the URL.</p>
    <div class="grid">
      ${cards}
    </div>
  </main>
</body>
</html>`;

  writeFileSync(join(DIST, "index.html"), html);
  writeFileSync(join(DIST, "versions.json"), JSON.stringify({ versions }, null, 2));
}

function buildArchive(version) {
  const base = `/v/${version.id}/`;
  const outDir = join(DIST, "v", version.id);
  const worktree = mkdtempSync(join(tmpdir(), `sc-build-${version.id}-`));

  try {
    run(`git worktree add --detach "${worktree}" ${version.commit}`);
    patchArchiveMain(worktree);
    patchArchiveVersionSwitcher(worktree);
    run("npm ci --ignore-scripts", { cwd: worktree });
    run(`npx vite build --base=${base} --outDir="${outDir}"`, {
      cwd: worktree,
      env: { ...process.env, VITE_BASE: base },
    });
  } finally {
    try {
      run(`git worktree remove --force "${worktree}"`);
    } catch {
      rmSync(worktree, { recursive: true, force: true });
      try {
        run(`git worktree prune`);
      } catch {
        // ignore
      }
    }
  }
}

function buildCurrent(version) {
  const base = `/v/${version.id}/`;
  const outDir = join(DIST, "v", version.id);
  run(`npx vite build --base=${base} --outDir="${outDir}"`, {
    env: { ...process.env, VITE_BASE: base },
  });
}

function copyRootPublicAssets() {
  const publicDir = join(ROOT, "public");
  if (!existsSync(publicDir)) return;
  for (const name of ["assets", "Images", "concepts", "favicon.svg", "sonocea-spectral-style-guide.html"]) {
    const from = join(publicDir, name);
    if (!existsSync(from)) continue;
    const to = join(DIST, name);
    cpSync(from, to, { recursive: true });
  }
}

function main() {
  rmSync(DIST, { recursive: true, force: true });
  mkdirSync(DIST, { recursive: true });

  for (const version of VERSIONS) {
    if (version.kind === "archive") buildArchive(version);
    else buildCurrent(version);
  }

  copyRootPublicAssets();
  writeRootSwitcher(VERSIONS);
  console.log("\nVersioned build ready in dist/");
  for (const v of VERSIONS) console.log(`  /v/${v.id}/  ← ${v.label}`);
}

main();
