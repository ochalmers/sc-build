import { useEffect, useRef, useState } from "react";
import { useComments } from "../../comments/CommentStore.jsx";
import { CommentComposer, CommentThreadPanel } from "./CommentComposer.jsx";

/**
 * Overlay for pin comments on preview frames.
 * - Comment mode on: click to place a pin + open composer
 * - Comment mode off: click an existing pin to open its thread
 */
export default function PinComments({ scopeKey, children }) {
  const {
    commentMode,
    draft,
    openThreadId,
    getThreads,
    getThread,
    startDraft,
    clearDraft,
    addPinComment,
    openThread,
    closeThread,
    addReply,
    toggleResolved,
    deleteThread,
  } = useComments();

  const containerRef = useRef(null);
  const [panelPos, setPanelPos] = useState({ left: 0, top: 0 });

  const threads = scopeKey ? getThreads(scopeKey).filter((t) => t.pin) : [];
  const openThreadData = openThreadId ? getThread(openThreadId) : null;
  const openIsHere = openThreadData?.scopeKey === scopeKey && openThreadData?.pin;
  const draftHere = draft?.scopeKey === scopeKey ? draft : null;

  useEffect(() => {
    if (!openIsHere || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pin = openThreadData.pin;
    setPanelPos({
      left: Math.min(pin.x * rect.width + 14, rect.width - 20),
      top: Math.min(pin.y * rect.height + 14, rect.height - 20),
    });
  }, [openIsHere, openThreadData]);

  if (!scopeKey) return children;

  function placeDraft(event) {
    if (!commentMode) return;
    // Don't place when clicking existing UI chrome inside
    if (event.target.closest("[data-comment-ui]")) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    startDraft(scopeKey, x, y);
  }

  function submitDraft(body) {
    if (!draftHere) return;
    addPinComment(scopeKey, draftHere.pin.x, draftHere.pin.y, body);
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${commentMode ? "cursor-crosshair" : ""}`}
      onClick={placeDraft}
    >
      {children}

      {/* Hit layer when commenting so clicks land even over interactive content */}
      {commentMode ? (
        <div className="absolute inset-0 z-20 cursor-crosshair" aria-hidden data-comment-ui />
      ) : null}

      <div className="pointer-events-none absolute inset-0 z-30">
        {threads.map((thread, index) => {
          const isOpen = openThreadId === thread.id;
          return (
            <button
              key={thread.id}
              type="button"
              data-comment-ui
              aria-label={`Open comment ${index + 1}`}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (isOpen) closeThread();
                else openThread(thread.id);
              }}
              className={`pointer-events-auto absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[11px] font-medium shadow-md transition-transform hover:scale-110 ${
                thread.status === "resolved"
                  ? "border-emerald-500 bg-emerald-100 text-emerald-900"
                  : isOpen
                    ? "border-accent-indigo bg-accent-indigo text-white"
                    : "border-white bg-ink-950 text-paper-100"
              }`}
              style={{ left: `${thread.pin.x * 100}%`, top: `${thread.pin.y * 100}%` }}
            >
              {index + 1}
            </button>
          );
        })}

        {draftHere ? (
          <div
            data-comment-ui
            className="pointer-events-auto absolute z-40 w-[min(18rem,calc(100%-1rem))]"
            style={{
              left: `min(${draftHere.pin.x * 100}%, calc(100% - 18rem))`,
              top: `min(${draftHere.pin.y * 100}%, calc(100% - 10rem))`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-accent-indigo shadow"
              style={{ left: 0, top: 0 }}
            />
            <div className="ml-3 mt-3 rounded-2xl border border-ink-200/80 bg-white p-3 shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500">
                New comment
              </p>
              <CommentComposer
                onSubmit={submitDraft}
                onCancel={clearDraft}
                submitLabel="Post"
              />
            </div>
          </div>
        ) : null}

        {openIsHere ? (
          <div
            data-comment-ui
            className="pointer-events-auto absolute z-40"
            style={{ left: panelPos.left, top: panelPos.top }}
          >
            <CommentThreadPanel
              thread={openThreadData}
              onClose={closeThread}
              onReply={(body) => addReply(openThreadData.id, body)}
              onToggleResolved={() => toggleResolved(openThreadData.id)}
              onDelete={() => deleteThread(openThreadData.id)}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
