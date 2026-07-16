import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useComments } from "../../comments/CommentStore.jsx";
import { CommentComposer, CommentThreadPanel } from "./CommentComposer.jsx";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

/**
 * Overlay for pin comments on preview frames.
 * Draft/thread panels render in a portal so overflow:hidden parents cannot clip them.
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
  const [anchor, setAnchor] = useState(null); // { left, top } viewport coords for portal UI
  const labelId = useId();

  const threads = scopeKey ? getThreads(scopeKey).filter((t) => t.pin) : [];
  const openThreadData = openThreadId ? getThread(openThreadId) : null;
  const openIsHere = openThreadData?.scopeKey === scopeKey && openThreadData?.pin;
  const draftHere = draft?.scopeKey === scopeKey ? draft : null;

  useEffect(() => {
    if (!openIsHere || !containerRef.current) {
      if (!draftHere) setAnchor(null);
      return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const pin = openThreadData.pin;
    setAnchor({
      left: clamp(rect.left + pin.x * rect.width + 12, 12, window.innerWidth - 340),
      top: clamp(rect.top + pin.y * rect.height + 12, 12, window.innerHeight - 280),
    });
  }, [openIsHere, openThreadData, draftHere]);

  if (!scopeKey) return children;

  function placeAt(clientX, clientY) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0 || rect.height <= 0) return;
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;
    startDraft(scopeKey, x, y);
    setAnchor({
      left: clamp(clientX + 12, 12, window.innerWidth - 340),
      top: clamp(clientY + 12, 12, window.innerHeight - 280),
    });
    closeThread();
  }

  function submitDraft(body) {
    if (!draftHere) return;
    addPinComment(scopeKey, draftHere.pin.x, draftHere.pin.y, body);
    setAnchor(null);
  }

  const portal =
    typeof document !== "undefined" &&
    (draftHere || openIsHere) &&
    anchor &&
    createPortal(
      <div
        className="fixed z-[80]"
        style={{ left: anchor.left, top: anchor.top }}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        {draftHere ? (
          <div className="w-[min(20rem,calc(100vw-1.5rem))] rounded-2xl border border-ink-200/80 bg-white p-3 shadow-[0_16px_40px_rgba(0,0,0,0.2)]">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500">
              New comment
            </p>
            <CommentComposer
              onSubmit={submitDraft}
              onCancel={() => {
                clearDraft();
                setAnchor(null);
              }}
              submitLabel="Post"
            />
          </div>
        ) : null}
        {openIsHere && !draftHere ? (
          <CommentThreadPanel
            thread={openThreadData}
            onClose={() => {
              closeThread();
              setAnchor(null);
            }}
            onReply={(body) => addReply(openThreadData.id, body)}
            onToggleResolved={() => toggleResolved(openThreadData.id)}
            onDelete={() => {
              deleteThread(openThreadData.id);
              setAnchor(null);
            }}
          />
        ) : null}
      </div>,
      document.body,
    );

  return (
    <div
      ref={containerRef}
      className={`relative isolate ${commentMode ? "cursor-crosshair" : ""}`}
      aria-describedby={commentMode ? labelId : undefined}
    >
      {children}

      {commentMode ? (
        <p id={labelId} className="sr-only">
          Comment mode active. Click to place a pin.
        </p>
      ) : null}

      {/* Solid near-invisible hit target — transparent buttons can miss clicks in some browsers */}
      {commentMode && !draftHere ? (
        <div
          role="button"
          tabIndex={0}
          aria-label="Place comment pin"
          className="absolute inset-0 z-20 cursor-crosshair"
          style={{ background: "rgba(58, 57, 255, 0.04)" }}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            placeAt(event.clientX, event.clientY);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              const rect = containerRef.current?.getBoundingClientRect();
              if (!rect) return;
              placeAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }
          }}
        />
      ) : null}

      <div className="pointer-events-none absolute inset-0 z-30">
        {threads.map((thread, index) => {
          const isOpen = openThreadId === thread.id;
          return (
            <button
              key={thread.id}
              type="button"
              aria-label={`Open comment ${index + 1}`}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (isOpen) {
                  closeThread();
                  setAnchor(null);
                } else {
                  openThread(thread.id);
                }
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
          <span
            className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-accent-indigo shadow"
            style={{ left: `${draftHere.pin.x * 100}%`, top: `${draftHere.pin.y * 100}%` }}
          />
        ) : null}
      </div>

      {portal}
    </div>
  );
}
