import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { get, list, put } from "@vercel/blob";

const THREAD_PREFIX = "comments/v2/threads/";
const LEGACY_SNAPSHOT = "workspace-comments-v2.json";

function commentsApiPlugin(env) {
  const token = env.BLOB_READ_WRITE_TOKEN || "";

  function mergeThreads(a, b) {
    const map = new Map();
    for (const thread of [...(a || []), ...(b || [])]) {
      if (!thread?.id) continue;
      const prev = map.get(thread.id);
      if (!prev || (thread.updatedAt || 0) >= (prev.updatedAt || 0)) {
        map.set(thread.id, thread);
      }
    }
    return [...map.values()].sort((x, y) => (y.updatedAt || 0) - (x.updatedAt || 0));
  }

  function isJunk(thread) {
    if (!thread) return true;
    if (/^test$/i.test(String(thread.scopeKey || ""))) return true;
    if (
      /^(cmt-smoke|cmt-verify|cmt-b-|cmt-a-|cmt-local-|cmt-prod-|cmt-alive-|cmt-final-|cmt-mA-|cmt-mB-|cmt-ok-|cmt-keep)/i.test(
        String(thread.id || ""),
      )
    ) {
      return true;
    }
    return false;
  }

  function publicThreads(threads) {
    return mergeThreads(threads, []).filter((t) => !t.deleted && !isJunk(t));
  }

  function threadPath(id) {
    return `${THREAD_PREFIX}${encodeURIComponent(id)}.json`;
  }

  async function readThread(pathname) {
    const result = await get(pathname, { access: "private", token });
    if (!result) return null;
    try {
      return JSON.parse(await new Response(result.stream).text());
    } catch {
      return null;
    }
  }

  async function listAllThreads() {
    if (!token) {
      const err = new Error("missing_blob_read_write_token");
      err.statusCode = 503;
      throw err;
    }
    const threads = [];
    let cursor;
    do {
      const page = await list({ prefix: THREAD_PREFIX, token, cursor, limit: 1000 });
      for (const blob of page.blobs || []) {
        const thread = await readThread(blob.pathname);
        if (thread?.id && !isJunk(thread)) threads.push(thread);
      }
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    return mergeThreads(threads, []);
  }

  async function writeThreads(threads) {
    if (!token) {
      const err = new Error("missing_blob_read_write_token");
      err.statusCode = 503;
      throw err;
    }
    await Promise.all(
      threads
        .filter((t) => t?.id && !isJunk(t))
        .map((thread) =>
          put(threadPath(thread.id), JSON.stringify(thread), {
            access: "private",
            addRandomSuffix: false,
            allowOverwrite: true,
            contentType: "application/json",
            cacheControlMaxAge: 0,
            token,
          }),
        ),
    );
  }

  async function migrateLegacyIfNeeded(existing) {
    if (existing.length) return existing;
    const result = await get(LEGACY_SNAPSHOT, { access: "private", token }).catch(() => null);
    if (!result) return existing;
    try {
      const parsed = JSON.parse(await new Response(result.stream).text());
      const legacy = Array.isArray(parsed.threads) ? parsed.threads.filter((t) => !isJunk(t)) : [];
      if (legacy.length) {
        await writeThreads(legacy);
        return listAllThreads();
      }
    } catch {
      // ignore
    }
    return existing;
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
            let threads = await listAllThreads();
            threads = await migrateLegacyIfNeeded(threads);
            const visible = publicThreads(threads);
            return send(res, 200, {
              threads: visible,
              updatedAt: visible.reduce((max, t) => Math.max(max, t.updatedAt || 0), 0),
            });
          }
          if (req.method === "PUT") {
            const body = await readBody(req);
            if (!Array.isArray(body.threads)) {
              return send(res, 400, { error: "threads_array_required" });
            }
            await writeThreads(body.threads);
            const all = publicThreads(await listAllThreads());
            return send(res, 200, {
              threads: all,
              updatedAt: Number(body.updatedAt) || Date.now(),
            });
          }
          return send(res, 405, { error: "method_not_allowed" });
        } catch (err) {
          const status = err?.statusCode || 500;
          return send(res, status, {
            error: String(err?.message || err),
            hint:
              status === 503
                ? "Add BLOB_READ_WRITE_TOKEN to .env.local (vercel env pull)."
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
