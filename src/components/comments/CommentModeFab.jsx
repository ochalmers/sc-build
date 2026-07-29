import { useEffect, useMemo } from "react";
import { useComments } from "../../comments/CommentStore.jsx";
import { useReviewNavigate } from "../../app/hooks/useReviewNavigate.js";

function syncLabel(status) {
  if (status === "synced") return "Shared · live";
  if (status === "syncing") return "Sharing…";
  if (status === "loading") return "Loading shared…";
  if (status === "offline") return "Offline cache";
  if (status === "error") return "Sync issue";
  return null;
}

function aliveThreads(threads) {
  return (threads || []).filter((thread) => !thread?.deleted);
}

function formatTime(ts) {
  try {
    return new Date(ts).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

/** Human label for a comment scope. */
export function scopeLabel(scopeKey = "") {
  if (scopeKey.startsWith("app:")) {
    const raw = scopeKey.slice(4);
    const [pathPart, query = ""] = raw.split("?");
    const parts = pathPart.split("/").filter(Boolean);
    const leaf = parts[parts.length - 1] || "app";
    const area = parts.includes("admin")
      ? "Admin"
      : parts.includes("listener")
        ? "Listener"
        : parts.includes("partner")
          ? "Partner"
          : "App";
    const phase = query
      .split("&")
      .map((pair) => pair.split("="))
      .find(([k]) => k === "phase" || k === "step")?.[1];
    return phase ? `${area} · ${leaf} · ${phase}` : `${area} · ${leaf}`;
  }
  if (scopeKey.startsWith("screen:")) return `Screen · ${scopeKey.slice(7)}`;
  if (scopeKey.startsWith("section:")) return `Section · ${scopeKey.slice(8)}`;
  return scopeKey || "Unknown";
}

/** Route / scroll target from a scopeKey. */
export function targetFromScope(scopeKey = "") {
  if (scopeKey.startsWith("app:")) {
    return { type: "route", to: scopeKey.slice(4) || "/app" };
  }
  if (scopeKey.startsWith("section:")) {
    return { type: "section", id: scopeKey.slice(8) };
  }
  if (scopeKey.startsWith("screen:")) {
    return { type: "screen", key: scopeKey.slice(7) };
  }
  return { type: "none" };
}

function scrollToPin(threadId) {
  const pin = document.querySelector(`[data-comment-pin="${threadId}"]`);
  if (!pin) return false;
  pin.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
  return true;
}

/**
 * Fixed comment-mode control - Figma-style toggle to place pins,
 * with a clickable list of all shared comments.
 */
export default function CommentModeFab() {
  const goToAppPath = useReviewNavigate();
  const {
    commentMode,
    toggleCommentMode,
    setCommentMode,
    openCount,
    author,
    setAuthor,
    draft,
    clearDraft,
    closeThread,
    openThread,
    threads,
    openThreadId,
    syncStatus,
    syncError,
    refreshComments,
  } = useComments();

  const listed = useMemo(() => {
    const alive = aliveThreads(threads);
    return [...alive].sort((a, b) => {
      if (a.status !== b.status) return a.status === "open" ? -1 : 1;
      return (b.updatedAt || 0) - (a.updatedAt || 0);
    });
  }, [threads]);

  useEffect(() => {
    function onKey(e) {
      if (e.key !== "Escape") return;
      if (draft) clearDraft();
      else if (commentMode) setCommentMode(false);
      else closeThread();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [commentMode, draft, clearDraft, setCommentMode, closeThread]);

  const syncText = syncLabel(syncStatus);

  function goToComment(thread) {
    if (!thread?.id) return;
    clearDraft?.();
    openThread(thread.id);
    if (!commentMode) setCommentMode(true);

    const target = targetFromScope(thread.scopeKey);
    if (target.type === "route" && target.to) {
      // Prime listener/admin demo auth so protected screens don't bounce to /email.
      goToAppPath(target.to, { preferPrototype: true });
      // Retry pin scroll while the destination frame mounts.
      let tries = 0;
      const tick = () => {
        if (scrollToPin(thread.id) || tries++ > 20) return;
        window.setTimeout(tick, 100);
      };
      window.setTimeout(tick, 80);
      return;
    }

    if (target.type === "section" && target.id) {
      document
        .getElementById(target.id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (target.type === "screen" && target.key) {
      const el =
        document.querySelector(`[data-screen-key="${target.key}"]`) ||
        document.querySelector(`[data-comment-scope="screen:${target.key}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    window.setTimeout(() => scrollToPin(thread.id), 80);
  }

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-2">
      {commentMode ? (
        <div className="flex w-[min(22rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.16)]">
          <div className="border-b border-ink-100 px-3 py-2.5 text-[12px] leading-snug text-ink-600">
            <p className="font-medium text-ink-900">Comment mode on</p>
            <p className="mt-1">
              Click a screen to drop a pin. Drag pins to move them. Esc or toggle off to exit.
            </p>
            <label className="mt-2 flex items-center gap-2 text-[11px] text-ink-500">
              As
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="min-w-0 flex-1 rounded-md border border-ink-200 px-2 py-1 text-[12px] text-ink-800 outline-none focus:border-ink-400"
              />
            </label>
            {syncText ? (
              <p className="mt-2 text-[11px] text-ink-500">
                {syncText}
                {syncStatus === "error" && syncError ? ` — ${syncError}` : null}
                {" · "}
                <button
                  type="button"
                  onClick={() => refreshComments?.()}
                  className="underline-offset-2 hover:underline"
                >
                  Refresh
                </button>
              </p>
            ) : null}
            {draft ? (
              <button
                type="button"
                onClick={clearDraft}
                className="mt-2 text-[11px] text-ink-500 underline-offset-2 hover:underline"
              >
                Cancel draft pin
              </button>
            ) : null}
          </div>

          <div className="flex items-center justify-between px-3 pb-1 pt-2.5">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500">
              All comments
            </p>
            <p className="text-[11px] tabular-nums text-ink-400">{listed.length}</p>
          </div>

          <ul className="max-h-[min(22rem,46vh)] overflow-y-auto overscroll-contain px-1.5 pb-2">
            {listed.length === 0 ? (
              <li className="px-2 py-3 text-[12px] text-ink-400">No comments yet.</li>
            ) : (
              listed.map((thread, index) => {
                const preview = thread.messages?.[0]?.body || "Comment";
                const who = thread.messages?.[0]?.author || "Reviewer";
                const active = openThreadId === thread.id;
                const resolved = thread.status === "resolved";
                return (
                  <li key={thread.id}>
                    <button
                      type="button"
                      onClick={() => goToComment(thread)}
                      className={`flex w-full gap-2.5 rounded-xl px-2 py-2 text-left transition-colors ${
                        active ? "bg-accent-indigo/10" : "hover:bg-ink-50"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-medium ${
                          resolved
                            ? "bg-emerald-100 text-emerald-800"
                            : active
                              ? "bg-accent-indigo text-white"
                              : "bg-ink-950 text-paper-100"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[12px] font-medium text-ink-900">
                          {preview}
                        </span>
                        <span className="mt-0.5 block truncate text-[11px] text-ink-500">
                          {who}
                          {" · "}
                          {scopeLabel(thread.scopeKey)}
                          {thread.updatedAt ? ` · ${formatTime(thread.updatedAt)}` : ""}
                          {resolved ? " · Resolved" : ""}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}

      <button
        type="button"
        onClick={toggleCommentMode}
        aria-pressed={commentMode}
        className={`flex items-center gap-2 rounded-full px-4 py-3 text-[13px] font-medium shadow-[0_10px_28px_rgba(0,0,0,0.22)] transition-colors ${
          commentMode
            ? "bg-accent-indigo text-white"
            : "bg-[#121212] text-paper-100 hover:bg-ink-800"
        }`}
      >
        <span aria-hidden className="text-[15px]">
          💬
        </span>
        {commentMode ? "Done" : "Comment"}
        {!commentMode && openCount > 0 ? (
          <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px] tabular-nums">
            {openCount}
          </span>
        ) : null}
      </button>
    </div>
  );
}
