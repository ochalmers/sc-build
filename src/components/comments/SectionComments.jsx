import { useComments } from "../../comments/CommentStore.jsx";

export default function SectionComments({ scopeKey, className = "" }) {
  const { getThreads, addSectionComment, toggleResolved } = useComments();
  const threads = getThreads(scopeKey).filter((thread) => !thread.pin);

  function handleAddComment() {
    const body = window.prompt("Add section comment");
    if (!body) return;
    addSectionComment(scopeKey, body);
  }

  return (
    <div className={`mt-6 rounded-2xl border border-ink-200/70 bg-white/55 p-4 ${className}`.trim()}>
      <div className="flex items-center justify-between gap-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500">
          Comments ({threads.length})
        </p>
        <button
          type="button"
          onClick={handleAddComment}
          className="rounded-full border border-ink-200/80 bg-paper-100 px-3 py-1.5 text-[12px] text-ink-700 hover:border-ink-300"
        >
          Add comment
        </button>
      </div>
      {threads.length ? (
        <ul className="mt-3 space-y-2">
          {threads.map((thread) => (
            <li key={thread.id} className="rounded-xl border border-ink-200/80 bg-white/80 px-3 py-2">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[13px] leading-relaxed text-ink-700">{thread.messages[0]?.body}</p>
                <button
                  type="button"
                  onClick={() => toggleResolved(thread.id)}
                  className="shrink-0 text-[11px] text-ink-500 underline-offset-2 hover:text-ink-800 hover:underline"
                >
                  {thread.status === "resolved" ? "Re-open" : "Resolve"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-[12px] text-ink-500">No comments yet.</p>
      )}
    </div>
  );
}
