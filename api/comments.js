/**
 * Shared workspace comments — backed by a public GitHub Gist so every
 * reviewer sees the same threads (not localStorage).
 *
 * Env (Vercel project → Settings → Environment Variables):
 *   COMMENTS_GITHUB_TOKEN  — GitHub PAT with `gist` scope
 *   COMMENTS_GIST_ID       — optional override (defaults below)
 */

const DEFAULT_GIST_ID = "5253e9bc9987baf2d4a4ff0007aa5098";
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

function gistId() {
  return process.env.COMMENTS_GIST_ID || DEFAULT_GIST_ID;
}

function token() {
  return (
    process.env.COMMENTS_GITHUB_TOKEN ||
    process.env.GITHUB_TOKEN ||
    process.env.GH_TOKEN ||
    ""
  );
}

async function fetchGist() {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "sonocea-sc-build-comments",
  };
  const t = token();
  if (t) headers.Authorization = `Bearer ${t}`;

  const res = await fetch(`https://api.github.com/gists/${gistId()}`, { headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`gist_get_${res.status}: ${text.slice(0, 200)}`);
  }
  const data = await res.json();
  const file = data.files?.[GIST_FILE];
  const raw = file?.content || '{"threads":[]}';
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

async function saveGist(threads, updatedAt) {
  const t = token();
  if (!t) {
    const err = new Error("missing_comments_github_token");
    err.code = "missing_token";
    throw err;
  }
  const payload = {
    files: {
      [GIST_FILE]: {
        content: JSON.stringify({ threads, updatedAt }, null, 2),
      },
    },
  };

  let lastErr = null;
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(`https://api.github.com/gists/${gistId()}`, {
      method: "PATCH",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${t}`,
        "Content-Type": "application/json",
        "User-Agent": "sonocea-sc-build-comments",
      },
      body: JSON.stringify(payload),
    });
    if (res.ok) return { threads, updatedAt };
    const text = await res.text();
    lastErr = new Error(`gist_put_${res.status}: ${text.slice(0, 200)}`);
    // 409 conflict — brief backoff and retry.
    if (res.status !== 409 || attempt === 3) break;
    await new Promise((r) => setTimeout(r, 200 * (attempt + 1)));
  }
  throw lastErr;
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return json(res, 204, {});
  }

  try {
    if (req.method === "GET") {
      const data = await fetchGist();
      return json(res, 200, data);
    }

    if (req.method === "PUT") {
      const body = await readBody(req);
      const threads = Array.isArray(body.threads) ? body.threads : null;
      if (!threads) return json(res, 400, { error: "threads_array_required" });
      // Merge with current gist so concurrent reviewers don't wipe each other.
      let merged = threads;
      try {
        const current = await fetchGist();
        const map = new Map();
        for (const thread of [...(current.threads || []), ...threads]) {
          const prev = map.get(thread.id);
          if (!prev || (thread.updatedAt || 0) >= (prev.updatedAt || 0)) {
            map.set(thread.id, thread);
          }
        }
        merged = [...map.values()].sort(
          (a, b) => (b.updatedAt || 0) - (a.updatedAt || 0),
        );
      } catch {
        // If read fails, still attempt to write the payload we received.
      }
      const updatedAt = Number(body.updatedAt) || Date.now();
      const saved = await saveGist(merged, updatedAt);
      return json(res, 200, saved);
    }

    return json(res, 405, { error: "method_not_allowed" });
  } catch (err) {
    if (err?.code === "missing_token") {
      return json(res, 503, {
        error: "missing_comments_github_token",
        hint: "Set COMMENTS_GITHUB_TOKEN on the Vercel project (gist scope).",
      });
    }
    const message = String(err?.message || err);
    if (/gist_put_403|rate limit/i.test(message)) {
      return json(res, 429, {
        error: "comments_rate_limited",
        hint: "GitHub gist write rate limit hit — retry in a minute.",
      });
    }
    console.error("[api/comments]", err);
    return json(res, 500, { error: message });
  }
}
