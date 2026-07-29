/**
 * Shared workspace comments — backed by Vercel Blob so every reviewer
 * sees the same threads (not localStorage / GitHub Gist rate limits).
 *
 * Env (set automatically when a Blob store is linked):
 *   BLOB_READ_WRITE_TOKEN
 *
 * Optional legacy fallback for reads:
 *   COMMENTS_GITHUB_TOKEN / COMMENTS_GIST_ID
 */

import { get, put } from "@vercel/blob";

const BLOB_PATH = "workspace-comments.json";
const LEGACY_GIST_ID = "5253e9bc9987baf2d4a4ff0007aa5098";
const GIST_FILE = "comments.json";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store",
  };
}

function json(res, status, body) {
  res.statusCode = status;
  for (const [k, v] of Object.entries(corsHeaders())) {
    res.setHeader(k, v);
  }
  res.setHeader("Content-Type", "application/json; charset=utf-8");
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

async function readBlob() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    const err = new Error("missing_blob_read_write_token");
    err.code = "missing_token";
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

async function writeBlob(threads, updatedAt) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    const err = new Error("missing_blob_read_write_token");
    err.code = "missing_token";
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

async function readLegacyGist() {
  const gistId = process.env.COMMENTS_GIST_ID || LEGACY_GIST_ID;
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "sonocea-sc-build-comments",
  };
  const t =
    process.env.COMMENTS_GITHUB_TOKEN ||
    process.env.GITHUB_TOKEN ||
    process.env.GH_TOKEN ||
    "";
  if (t) headers.Authorization = `Bearer ${t}`;
  const res = await fetch(`https://api.github.com/gists/${gistId}`, { headers });
  if (!res.ok) return null;
  const data = await res.json();
  const raw = data.files?.[GIST_FILE]?.content || '{"threads":[]}';
  try {
    return normalize(JSON.parse(raw));
  } catch {
    return { threads: [], updatedAt: 0 };
  }
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return json(res, 204, {});
  }

  try {
    if (req.method === "GET") {
      let data = await readBlob();
      // One-time hydrate from legacy gist if blob is empty.
      if (data.threads.length === 0) {
        const legacy = await readLegacyGist().catch(() => null);
        if (legacy?.threads?.length) {
          data = await writeBlob(legacy.threads, legacy.updatedAt || Date.now());
        }
      }
      return json(res, 200, data);
    }

    if (req.method === "PUT") {
      const body = await readBody(req);
      const threads = Array.isArray(body.threads) ? body.threads : null;
      if (!threads) return json(res, 400, { error: "threads_array_required" });

      let merged = threads;
      try {
        const current = await readBlob();
        merged = mergeThreads(current.threads, threads);
      } catch {
        // write payload as received if merge read fails
      }
      const updatedAt = Number(body.updatedAt) || Date.now();
      const saved = await writeBlob(merged, updatedAt);
      return json(res, 200, saved);
    }

    return json(res, 405, { error: "method_not_allowed" });
  } catch (err) {
    if (err?.code === "missing_token") {
      return json(res, 503, {
        error: "missing_blob_read_write_token",
        hint: "Link a Vercel Blob store so BLOB_READ_WRITE_TOKEN is available.",
      });
    }
    console.error("[api/comments]", err);
    return json(res, 500, { error: String(err?.message || err) });
  }
}
