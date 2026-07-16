import { useEffect } from "react";
import { useComments } from "../../comments/CommentStore.jsx";

/**
 * Fixed comment-mode control — Figma-style toggle to place pins.
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
  } = useComments();

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
