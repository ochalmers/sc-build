import { useState } from "react";
import { useComments } from "../../comments/CommentStore.jsx";
import { CommentComposer } from "./CommentComposer.jsx";

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

export default function SectionComments({ scopeKey, className = "" }) {
  const {
    getThreads,
    addSectionComment,
    addReply,
    toggleResolved,
    deleteThread,
    openThreadId,
    openThread,
    closeThread,
  } = useComments();
  const [composing, setComposing] = useState(false);
  const threads = getThreads(scopeKey).filter((thread) => !thread.pin);

  return (
    <div className={`mt-6 rounded-2xl border border-ink-200/70 bg-white/55 p-4 ${className}`.trim()}>
      <div className="flex items-center justify-between gap-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500">
          Comments ({threads.length})
        </p>
        <button
          type="button"
          onClick={() => setComposing((v) => !v)}
          className="rounded-full border border-ink-200/80 bg-paper-100 px-3 py-1.5 text-[12px] text-ink-700 hover:border-ink-300"
        >
          {composing ? "Cancel" : "Add comment"}
        </button>
      </div>

      {composing ? (
        <div className="mt-3 rounded-xl border border-ink-200/70 bg-white p-3">
          <CommentComposer
            onSubmit={(body) => {
              addSectionComment(scopeKey, body);
              setComposing(false);
            }}
            onCancel={() => setComposing(false)}
            submitLabel="Post"
          />
        </div>
      ) : null}

      {threads.length ? (
        <ul className="mt-3 space-y-2">
          {threads.map((thread) => {
            const isOpen = openThreadId === thread.id;
            return (
              <li
                key={thread.id}
                className={`rounded-xl border px-3 py-2 ${
                  isOpen ? "border-ink-400 bg-white" : "border-ink-200/80 bg-white/80"
                }`}
              >
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => (isOpen ? closeThread() : openThread(thread.id))}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-[12px] font-medium text-ink-900">
                      {thread.messages[0]?.author || "Reviewer"}
                    </p>
                    <p className="text-[10px] text-ink-400">{formatTime(thread.createdAt)}</p>
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink-700">
                    {thread.messages[0]?.body}
                  </p>
                  {thread.messages.length > 1 ? (
                    <p className="mt-1 text-[11px] text-ink-400">
                      {thread.messages.length - 1}{" "}
                      {thread.messages.length - 1 === 1 ? "reply" : "replies"}
                    </p>
                  ) : null}
                </button>

                {isOpen ? (
                  <div className="mt-3 border-t border-ink-100 pt-3">
                    {thread.messages.slice(1).map((message) => (
                      <div key={message.id} className="mb-2">
                        <p className="text-[12px] font-medium text-ink-800">{message.author}</p>
                        <p className="text-[13px] text-ink-700">{message.body}</p>
                      </div>
                    ))}
                    <CommentComposer
                      placeholder="Reply…"
                      submitLabel="Reply"
                      onSubmit={(body) => addReply(thread.id, body)}
                      autoFocus={false}
                    />
                    <div className="mt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => toggleResolved(thread.id)}
                        className="text-[11px] text-ink-500 underline-offset-2 hover:underline"
                      >
                        {thread.status === "resolved" ? "Re-open" : "Resolve"}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteThread(thread.id)}
                        className="text-[11px] text-red-500/80 underline-offset-2 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : !composing ? (
        <p className="mt-3 text-[12px] text-ink-500">No comments yet.</p>
      ) : null}
    </div>
  );
}
