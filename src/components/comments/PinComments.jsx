import { useComments } from "../../comments/CommentStore.jsx";

export default function PinComments({ scopeKey, children }) {
  const { getThreads, addPinComment, toggleResolved } = useComments();
  const threads = getThreads(scopeKey).filter((thread) => thread.pin);

  function handleAddPin(event) {
    if (!scopeKey) return;
    const body = window.prompt("Add comment");
    if (!body) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    addPinComment(scopeKey, x, y, body);
  }

  if (!scopeKey) return children;

  return (
    <div className="relative" onDoubleClick={handleAddPin}>
      {children}
      <div className="pointer-events-none absolute inset-0">
        {threads.map((thread, index) => (
          <button
            key={thread.id}
            type="button"
            title={thread.messages[0]?.body}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              toggleResolved(thread.id);
            }}
            className={`pointer-events-auto absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border text-[10px] font-medium shadow ${
              thread.status === "resolved"
                ? "border-emerald-400 bg-emerald-100 text-emerald-900"
                : "border-ink-700 bg-ink-900 text-paper-100"
            }`}
            style={{ left: `${thread.pin.x * 100}%`, top: `${thread.pin.y * 100}%` }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
