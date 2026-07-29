import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { get, put } from "@vercel/blob";

const BLOB_PATH = "workspace-comments-v2.json";

function commentsApiPlugin(env) {
  const token = env.BLOB_READ_WRITE_TOKEN || "";

  function normalize(data) {
    return {
      threads: Array.isArray(data?.threads) ? data.threads : [],
      updatedAt: Number(data?.updatedAt) || 0,
    };
  }

  function mergeThreads(a, b) {
    const map = new Map();
    for (const thread of [...(a || []), ...(b || [])]) {
      const prev = map.get(thread.id);
      if (!prev || (thread.updatedAt || 0) >= (prev.updatedAt || 0)) {
        map.set(thread.id, thread);
      }
    }
    return [...map.values()].sort((x, y) => (y.updatedAt || 0) - (x.updatedAt || 0));
  }

  function sanitizeThreads(threads) {
    return (threads || []).filter((thread) => {
      if (!thread || thread.deleted) return false;
      if (/^test$/i.test(String(thread.scopeKey || ""))) return false;
      if (
        /^(cmt-smoke|cmt-verify|cmt-b-|cmt-a-|cmt-local-|cmt-prod-|cmt-alive-|cmt-final-|cmt-mA-|cmt-mB-|cmt-ok-|cmt-keep)/i.test(
          String(thread.id || ""),
        )
      ) {
        return false;
      }
      return true;
    });
  }

  async function readStore() {
    if (!token) {
      const err = new Error("missing_blob_read_write_token");
      err.statusCode = 503;
      throw err;
    }
    const result = await get(BLOB_PATH, { access: "private", token });
    if (!result) return { threads: [], updatedAt: 0 };
    const text = await new Response(result.stream).text();
    try {
      return normalize(JSON.parse(text));
    } catch {
      return { threads: [], updatedAt: 0 };
    }
  }

  async function writeStore(threads, updatedAt) {
    if (!token) {
      const err = new Error("missing_blob_read_write_token");
      err.statusCode = 503;
      throw err;
    }
    const payload = { threads, updatedAt };
    await put(BLOB_PATH, JSON.stringify(payload, null, 2), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      token,
    });
    return payload;
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
            const data = await readStore();
            return send(res, 200, {
              threads: sanitizeThreads(data.threads),
              updatedAt: data.updatedAt,
            });
          }
          if (req.method === "PUT") {
            const body = await readBody(req);
            if (!Array.isArray(body.threads)) {
              return send(res, 400, { error: "threads_array_required" });
            }
            let merged = sanitizeThreads(body.threads);
            try {
              merged = sanitizeThreads(
                mergeThreads((await readStore()).threads, body.threads),
              );
            } catch {
              // write payload as received if merge read fails
            }
            const updatedAt = Number(body.updatedAt) || Date.now();
            return send(res, 200, await writeStore(merged, updatedAt));
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
