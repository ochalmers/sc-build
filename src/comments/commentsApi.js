/**
 * Shared comments transport.
 * Prefers same-origin `/api/comments` (Vercel / Vite middleware).
 * Falls back to the public GitHub Gist so reads still work if the API is down.
 */

export const COMMENTS_GIST_ID = "5253e9bc9987baf2d4a4ff0007aa5098";
const GIST_FILE = "comments.json";
const GIST_URL = `https://api.github.com/gists/${COMMENTS_GIST_ID}`;

function normalizePayload(data) {
  return {
    threads: Array.isArray(data?.threads) ? data.threads : [],
    updatedAt: Number(data?.updatedAt) || 0,
  };
}

async function fetchGistDirect() {
  const res = await fetch(GIST_URL, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "sonocea-sc-build-comments",
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`gist_get_${res.status}`);
  const data = await res.json();
  const raw = data.files?.[GIST_FILE]?.content || '{"threads":[]}';
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = { threads: [] };
  }
  return normalizePayload({
    threads: parsed.threads,
    updatedAt: parsed.updatedAt || Date.parse(data.updated_at) || 0,
  });
}

async function saveGistDirect(threads, updatedAt, token) {
  if (!token) throw new Error("missing_write_token");
  const res = await fetch(GIST_URL, {
    method: "PATCH",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "sonocea-sc-build-comments",
    },
    body: JSON.stringify({
      files: {
        [GIST_FILE]: {
          content: JSON.stringify({ threads, updatedAt }, null, 2),
        },
      },
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`gist_put_${res.status}: ${text.slice(0, 160)}`);
  }
  return { threads, updatedAt };
}

function clientWriteToken() {
  try {
    const fromEnv = import.meta.env?.VITE_COMMENTS_GITHUB_TOKEN;
    if (fromEnv) return String(fromEnv);
    return localStorage.getItem("sonocea-comments-sync-token") || "";
  } catch {
    return "";
  }
}

export function setClientWriteToken(token) {
  const next = String(token || "").trim();
  if (next) localStorage.setItem("sonocea-comments-sync-token", next);
  else localStorage.removeItem("sonocea-comments-sync-token");
}

export function getClientWriteToken() {
  return clientWriteToken();
}

function isJsonResponse(res) {
  return (res.headers.get("content-type") || "").includes("application/json");
}

/** Load shared threads (API first, then public gist). */
export async function loadSharedComments() {
  try {
    const res = await fetch("/api/comments", { cache: "no-store" });
    if (res.ok && isJsonResponse(res)) return normalizePayload(await res.json());
  } catch {
    // fall through to gist
  }
  return fetchGistDirect();
}

/** Persist shared threads. */
export async function saveSharedComments(threads, updatedAt = Date.now()) {
  const payload = { threads, updatedAt };

  try {
    const res = await fetch("/api/comments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok && isJsonResponse(res)) return normalizePayload(await res.json());
    // Missing serverless token, or SPA HTML fallback — try client token next.
    if (isJsonResponse(res)) {
      if (res.status === 503 || res.status === 404) {
        // fall through to client gist write
      } else if (res.status === 429) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || "comments_rate_limited");
      } else {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || `api_put_${res.status}`);
      }
    }
  } catch (err) {
    if (String(err?.message || err).startsWith("api_put_")) throw err;
    // network / no local api — try direct gist
  }

  const token = clientWriteToken();
  return saveGistDirect(threads, updatedAt, token);
}
