import { useEffect, useRef, useState } from "react";

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

/** Shared composer form for new comments and replies. */
export function CommentComposer({
  initialValue = "",
  placeholder = "Leave a comment…",
  submitLabel = "Comment",
  onSubmit,
  onCancel,
  autoFocus = true,
}) {
  const [value, setValue] = useState(initialValue);
  const ref = useRef(null);

  useEffect(() => {
    if (autoFocus) ref.current?.focus();
  }, [autoFocus]);

  function submit(e) {
    e?.preventDefault();
    if (!value.trim()) return;
    onSubmit(value.trim());
    setValue("");
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <textarea
        ref={ref}
        rows={3}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full resize-none rounded-xl border border-ink-200/80 bg-white px-3 py-2 text-[13px] leading-relaxed text-ink-800 outline-none ring-ink-950/10 placeholder:text-ink-400 focus:border-ink-400 focus:ring-2"
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit(e);
          if (e.key === "Escape") onCancel?.();
        }}
      />
      <div className="flex items-center justify-end gap-2">
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full px-3 py-1.5 text-[12px] text-ink-500 hover:text-ink-800"
          >
            Cancel
          </button>
        ) : null}
        <button
          type="submit"
          disabled={!value.trim()}
          className="rounded-full bg-ink-950 px-3.5 py-1.5 text-[12px] font-medium text-paper-100 disabled:opacity-40"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

/** Open thread panel — view, reply, resolve, delete. */
export function CommentThreadPanel({
  thread,
  onClose,
  onReply,
  onToggleResolved,
  onDelete,
  className = "",
  style,
}) {
  if (!thread) return null;

  return (
    <div
      className={`w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-[0_16px_48px_rgba(0,0,0,0.18)] ${className}`}
      style={style}
      role="dialog"
      aria-label="Comment thread"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between gap-2 border-b border-ink-100 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium ${
              thread.status === "resolved"
                ? "bg-emerald-100 text-emerald-800"
                : "bg-ink-950 text-paper-100"
            }`}
          >
            {thread.status === "resolved" ? "✓" : "•"}
          </span>
          <p className="text-[12px] font-medium text-ink-800">
            {thread.status === "resolved" ? "Resolved" : "Open"}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md px-2 py-1 text-[12px] text-ink-400 hover:bg-ink-50 hover:text-ink-700"
          aria-label="Close comment"
        >
          ✕
        </button>
      </div>

      <div className="max-h-56 space-y-3 overflow-y-auto px-3 py-3">
        {thread.messages.map((message) => (
          <div key={message.id}>
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-[12px] font-medium text-ink-900">{message.author || "Reviewer"}</p>
              <p className="text-[10px] text-ink-400">{formatTime(message.createdAt)}</p>
            </div>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-700">{message.body}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-ink-100 px-3 py-3">
        <CommentComposer
          placeholder="Reply…"
          submitLabel="Reply"
          onSubmit={onReply}
          autoFocus={false}
        />
        <div className="mt-2 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onToggleResolved}
            className="text-[11px] text-ink-500 underline-offset-2 hover:text-ink-800 hover:underline"
          >
            {thread.status === "resolved" ? "Re-open" : "Resolve"}
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="text-[11px] text-red-500/80 underline-offset-2 hover:text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
