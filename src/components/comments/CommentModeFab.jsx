import { useEffect, useState } from "react";
import { useComments } from "../../comments/CommentStore.jsx";
import { getClientWriteToken, setClientWriteToken } from "../../comments/commentsApi.js";

function syncLabel(status) {
  if (status === "synced") return "Shared · live";
  if (status === "syncing") return "Sharing…";
  if (status === "loading") return "Loading shared…";
  if (status === "offline") return "Offline cache";
  if (status === "error") return "Sync issue";
  return null;
}

/**
 * Fixed comment-mode control - Figma-style toggle to place pins.
 */
export default function CommentModeFab() {
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
    syncStatus,
    syncError,
    refreshComments,
    republishComments,
  } = useComments();
  const [writeToken, setWriteToken] = useState(() => getClientWriteToken());

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
  const needsWriteToken =
    syncStatus === "error" && /missing_write_token|missing_comments_github_token/i.test(syncError || "");

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-2">
      {commentMode ? (
        <div className="max-w-[16rem] rounded-2xl border border-ink-200/80 bg-white px-3 py-2 text-[12px] leading-snug text-ink-600 shadow-[0_12px_32px_rgba(0,0,0,0.16)]">
          <p className="font-medium text-ink-900">Comment mode on</p>
          <p className="mt-1">Click a screen to drop a pin. Drag pins to move them. Esc or toggle off to exit.</p>
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
          {needsWriteToken ? (
            <label className="mt-2 block text-[11px] text-ink-500">
              Paste a GitHub token with <span className="font-medium">gist</span> scope to publish shared comments:
              <input
                type="password"
                value={writeToken}
                onChange={(e) => setWriteToken(e.target.value)}
                onBlur={() => {
                  setClientWriteToken(writeToken);
                  // Pull latest then push local so a pasted token actually publishes.
                  Promise.resolve(refreshComments?.())
                    .catch(() => {})
                    .then(() => republishComments?.())
                    .catch(() => {});
                }}
                placeholder="ghp_… or gho_…"
                className="mt-1 w-full rounded-md border border-ink-200 px-2 py-1 text-[12px] text-ink-800 outline-none focus:border-ink-400"
              />
            </label>
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
