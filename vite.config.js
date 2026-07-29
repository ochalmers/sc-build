import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const DEFAULT_GIST_ID = "5253e9bc9987baf2d4a4ff0007aa5098";
const GIST_FILE = "comments.json";

function commentsApiPlugin(env) {
  const gistId = env.COMMENTS_GIST_ID || DEFAULT_GIST_ID;
  const token =
    env.COMMENTS_GITHUB_TOKEN || env.GITHUB_TOKEN || env.GH_TOKEN || env.VITE_COMMENTS_GITHUB_TOKEN || "";

  async function readGist() {
    const headers = {
      Accept: "application/vnd.github+json",
      "User-Agent": "sonocea-sc-build-comments-dev",
    };
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await fetch(`https://api.github.com/gists/${gistId}`, { headers });
    if (!res.ok) throw new Error(`gist_get_${res.status}`);
    const data = await res.json();
    const raw = data.files?.[GIST_FILE]?.content || '{"threads":[]}';
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = { threads: [] };
    }
    return {
      threads: Array.isArray(parsed.threads) ? parsed.threads : [],
      updatedAt: Number(parsed.updatedAt) || Date.parse(data.updated_at) || 0,
    };
  }

  async function writeGist(threads, updatedAt) {
    if (!token) {
      const err = new Error("missing_comments_github_token");
      err.statusCode = 503;
      throw err;
    }
    let lastErr = null;
    for (let attempt = 0; attempt < 4; attempt++) {
      const res = await fetch(`https://api.github.com/gists/${gistId}`, {
        method: "PATCH",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "sonocea-sc-build-comments-dev",
        },
        body: JSON.stringify({
          files: {
            [GIST_FILE]: {
              content: JSON.stringify({ threads, updatedAt }, null, 2),
            },
          },
        }),
      });
      if (res.ok) return { threads, updatedAt };
      lastErr = new Error(`gist_put_${res.status}`);
      if (res.status !== 409 || attempt === 3) break;
      await new Promise((r) => setTimeout(r, 200 * (attempt + 1)));
    }
    throw lastErr;
  }

  function send(res, status, body) {
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(JSON.stringify(body));
  }

  function readBody(req) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      req.on("data", (c) => chunks.push(c));
      req.on("end", () => {
        try {
          const raw = Buffer.concat(chunks).toString("utf8");
          resolve(raw ? JSON.parse(raw) : {});
        } catch (err) {
          reject(err);
        }
      });
      req.on("error", reject);
    });
  }

  return {
    name: "sonocea-comments-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split("?")[0];
        if (url !== "/api/comments") return next();

        try {
          if (req.method === "OPTIONS") {
            res.statusCode = 204;
            return res.end();
          }
          if (req.method === "GET") {
            return send(res, 200, await readGist());
          }
          if (req.method === "PUT") {
            const body = await readBody(req);
            if (!Array.isArray(body.threads)) {
              return send(res, 400, { error: "threads_array_required" });
            }
            let merged = body.threads;
            try {
              const current = await readGist();
              const map = new Map();
              for (const thread of [...(current.threads || []), ...body.threads]) {
                const prev = map.get(thread.id);
                if (!prev || (thread.updatedAt || 0) >= (prev.updatedAt || 0)) {
                  map.set(thread.id, thread);
                }
              }
              merged = [...map.values()].sort(
                (a, b) => (b.updatedAt || 0) - (a.updatedAt || 0),
              );
            } catch {
              // write payload as received if merge read fails
            }
            const updatedAt = Number(body.updatedAt) || Date.now();
            return send(res, 200, await writeGist(merged, updatedAt));
          }
          return send(res, 405, { error: "method_not_allowed" });
        } catch (err) {
          const status = err?.statusCode || 500;
          return send(res, status, {
            error: String(err?.message || err),
            hint:
              status === 503
                ? "Add COMMENTS_GITHUB_TOKEN to .env.local (gist scope)."
                : undefined,
          });
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), commentsApiPlugin(env)],
    server: {
      port: 5173,
      strictPort: true,
      host: true,
      allowedHosts: true,
    },
  };
});
