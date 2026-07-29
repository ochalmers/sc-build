/**
 * Shared workspace comments — one Vercel Blob object per thread so concurrent
 * reviewers cannot wipe each other via read-merge-write races.
 *
 * Env (set automatically when a Blob store is linked):
 *   BLOB_READ_WRITE_TOKEN
 */

import { get, list, put } from "@vercel/blob";

const THREAD_PREFIX = "comments/v2/threads/";
const LEGACY_SNAPSHOT = "workspace-comments-v2.json";
const LEGACY_GIST_ID = "5253e9bc9987baf2d4a4ff0007aa5098";
const GIST_FILE = "comments.json";

const TEST_SCOPE = /^test$/i;
const TEST_ID =
  /^(cmt-smoke|cmt-verify|cmt-b-|cmt-a-|cmt-local-|cmt-prod-|cmt-alive-|cmt-final-|cmt-mA-|cmt-mB-|cmt-ok-|cmt-keep)/i;

function isJunkThread(thread) {
  if (!thread) return true;
  if (TEST_SCOPE.test(String(thread.scopeKey || ""))) return true;
  if (TEST_ID.test(String(thread.id || ""))) return true;
  return false;
}

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

function requireToken() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    const err = new Error("missing_blob_read_write_token");
    err.code = "missing_token";
    throw err;
  }
  return token;
}

function threadPath(id) {
  return `${THREAD_PREFIX}${encodeURIComponent(id)}.json`;
}

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

async function readThreadBlob(pathname, token) {
  const result = await get(pathname, { access: "private", token });
  if (!result) return null;
  try {
    return JSON.parse(await new Response(result.stream).text());
  } catch {
    return null;
  }
}

async function listAllThreads(token) {
  const threads = [];
  let cursor;
  do {
    const page = await list({
      prefix: THREAD_PREFIX,
      token,
      cursor,
      limit: 1000,
    });
    const loaded = await Promise.all(
      (page.blobs || []).map(async (blob) => {
        // Prefer URL — more reliable for private blob reads in serverless.
        const thread =
          (await readThreadBlob(blob.url || blob.pathname, token)) ||
          (blob.url ? await readThreadBlob(blob.pathname, token) : null);
        return thread?.id && !isJunkThread(thread) ? thread : null;
      }),
    );
    for (const thread of loaded) {
      if (thread) threads.push(thread);
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  return mergeThreads(threads, []);
}

async function writeThreads(threads, token) {
  const writes = [];
  for (const thread of threads) {
    if (!thread?.id || isJunkThread(thread)) continue;
    writes.push(
      put(threadPath(thread.id), JSON.stringify(thread), {
        access: "private",
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: "application/json",
        cacheControlMaxAge: 0,
        token,
      }),
    );
  }
  await Promise.all(writes);
}

async function readLegacySnapshot(token) {
  const result = await get(LEGACY_SNAPSHOT, { access: "private", token }).catch(() => null);
  if (!result) return [];
  try {
    const parsed = JSON.parse(await new Response(result.stream).text());
    return Array.isArray(parsed.threads) ? parsed.threads : [];
  } catch {
    return [];
  }
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
  if (!res.ok) return [];
  const data = await res.json();
  const raw = data.files?.[GIST_FILE]?.content || '{"threads":[]}';
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.threads) ? parsed.threads : [];
  } catch {
    return [];
  }
}

function publicThreads(threads) {
  return mergeThreads(threads, []).filter((thread) => !thread.deleted && !isJunkThread(thread));
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return json(res, 204, {});
  }

  try {
    const token = requireToken();

    if (req.method === "GET") {
      let threads = await listAllThreads(token);

      // Migrate once from legacy single-file snapshot / gist if the folder is empty.
      if (threads.length === 0) {
        const legacy = [
          ...(await readLegacySnapshot(token)),
          ...(await readLegacyGist().catch(() => [])),
        ].filter((thread) => !isJunkThread(thread));
        if (legacy.length) {
          await writeThreads(legacy, token);
          threads = await listAllThreads(token);
        }
      }

      const visible = publicThreads(threads);
      const updatedAt = visible.reduce((max, t) => Math.max(max, t.updatedAt || 0), 0);
      res.setHeader("X-Comments-Listed", String(threads.length));
      res.setHeader("X-Comments-Visible", String(visible.length));
      return json(res, 200, { threads: visible, updatedAt });
    }

    if (req.method === "PUT") {
      const body = await readBody(req);
      const threads = Array.isArray(body.threads) ? body.threads : null;
      if (!threads) return json(res, 400, { error: "threads_array_required" });

      // Write each incoming thread as its own object (no full-document overwrite).
      await writeThreads(threads, token);

      // Return the full union so clients converge.
      const all = await listAllThreads(token);
      const visible = publicThreads(all);
      const updatedAt = Number(body.updatedAt) || Date.now();
      return json(res, 200, { threads: visible, updatedAt });
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
