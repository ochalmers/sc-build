import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const STORAGE_KEY = "sonocea-workspace-comments-v1";
const CommentContext = createContext(null);

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { threads: [] };
    const parsed = JSON.parse(raw);
    return { threads: Array.isArray(parsed.threads) ? parsed.threads : [] };
  } catch {
    return { threads: [] };
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD_THREAD":
      return { ...state, threads: [action.payload, ...state.threads] };
    case "TOGGLE_RESOLVED":
      return {
        ...state,
        threads: state.threads.map((thread) =>
          thread.id === action.payload
            ? {
                ...thread,
                status: thread.status === "resolved" ? "open" : "resolved",
                updatedAt: Date.now(),
              }
            : thread,
        ),
      };
    default:
      return state;
  }
}

function makeThread({ scopeKey, body, pin }) {
  const now = Date.now();
  return {
    id: `cmt-${now}-${Math.random().toString(36).slice(2, 8)}`,
    scopeKey,
    status: "open",
    createdAt: now,
    updatedAt: now,
    messages: [{ id: `msg-${now}`, body, createdAt: now }],
    pin: pin ?? null,
  };
}

export function CommentProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { threads: [] }, loadInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo(
    () => ({
      getThreads(scopeKey) {
        return state.threads.filter((thread) => thread.scopeKey === scopeKey);
      },
      addSectionComment(scopeKey, body) {
        if (!body?.trim()) return;
        dispatch({ type: "ADD_THREAD", payload: makeThread({ scopeKey, body: body.trim() }) });
      },
      addPinComment(scopeKey, x, y, body) {
        if (!body?.trim()) return;
        dispatch({
          type: "ADD_THREAD",
          payload: makeThread({
            scopeKey,
            body: body.trim(),
            pin: { x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) },
          }),
        });
      },
      toggleResolved(id) {
        dispatch({ type: "TOGGLE_RESOLVED", payload: id });
      },
    }),
    [state.threads],
  );

  return <CommentContext.Provider value={value}>{children}</CommentContext.Provider>;
}

export function useComments() {
  const ctx = useContext(CommentContext);
  if (!ctx) throw new Error("useComments must be used inside CommentProvider");
  return ctx;
}
