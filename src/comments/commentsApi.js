/**
 * Shared comments transport.
 * Prefers same-origin `/api/comments` (Vercel Blob / Vite middleware).
 */

function normalizePayload(data) {
  return {
    threads: Array.isArray(data?.threads) ? data.threads : [],
    updatedAt: Number(data?.updatedAt) || 0,
  };
}

function isJsonResponse(res) {
  return (res.headers.get("content-type") || "").includes("application/json");
}

/** @deprecated kept for FAB compatibility; blob writes go through the API. */
export function setClientWriteToken(token) {
  try {
    const next = String(token || "").trim();
    if (next) localStorage.setItem("sonocea-comments-sync-token", next);
    else localStorage.removeItem("sonocea-comments-sync-token");
  } catch {
    // ignore
  }
}

/** @deprecated kept for FAB compatibility */
export function getClientWriteToken() {
  try {
    return localStorage.getItem("sonocea-comments-sync-token") || "";
  } catch {
    return "";
  }
}

/** Load shared threads from the comments API. */
export async function loadSharedComments() {
  const res = await fetch("/api/comments", { cache: "no-store" });
  if (!res.ok || !isJsonResponse(res)) {
    throw new Error(`comments_get_${res.status}`);
  }
  return normalizePayload(await res.json());
}

/** Persist shared threads via the comments API. */
export async function saveSharedComments(threads, updatedAt = Date.now()) {
  const payload = { threads, updatedAt };
  const res = await fetch("/api/comments", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok || !isJsonResponse(res)) {
    const errBody = isJsonResponse(res) ? await res.json().catch(() => ({})) : {};
    throw new Error(errBody.error || `api_put_${res.status}`);
  }
  return normalizePayload(await res.json());
}
