import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const STORAGE_KEY = "sonocea-workspace-comments-v1";
const AUTHOR_KEY = "sonocea-workspace-comment-author";
const CommentContext = createContext(null);

function loadAuthor() {
  try {
    return localStorage.getItem(AUTHOR_KEY) || "Reviewer";
  } catch {
    return "Reviewer";
  }
}

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { threads: [], author: loadAuthor(), commentMode: false, openThreadId: null, draft: null };
    const parsed = JSON.parse(raw);
    return {
      threads: Array.isArray(parsed.threads) ? parsed.threads : [],
      author: loadAuthor(),
      commentMode: false,
      openThreadId: null,
      draft: null,
    };
  } catch {
    return { threads: [], author: loadAuthor(), commentMode: false, openThreadId: null, draft: null };
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_AUTHOR":
      return { ...state, author: action.payload };
    case "SET_COMMENT_MODE":
      return {
        ...state,
        commentMode: action.payload,
        draft: action.payload ? state.draft : null,
      };
    case "SET_DRAFT":
      return { ...state, draft: action.payload };
    case "CLEAR_DRAFT":
      return { ...state, draft: null };
    case "OPEN_THREAD":
      return { ...state, openThreadId: action.payload, draft: null };
    case "CLOSE_THREAD":
      return { ...state, openThreadId: null };
    case "ADD_THREAD":
      return {
        ...state,
        threads: [action.payload, ...state.threads],
        openThreadId: action.payload.id,
        draft: null,
        commentMode: false,
      };
    case "ADD_REPLY": {
      const { threadId, message } = action.payload;
      return {
        ...state,
        threads: state.threads.map((thread) =>
          thread.id === threadId
            ? {
                ...thread,
                messages: [...thread.messages, message],
                updatedAt: Date.now(),
                status: "open",
              }
            : thread,
        ),
      };
    }
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
    case "DELETE_THREAD":
      return {
        ...state,
        threads: state.threads.filter((thread) => thread.id !== action.payload),
        openThreadId: state.openThreadId === action.payload ? null : state.openThreadId,
      };
    default:
      return state;
  }
}

function makeMessage(body, author) {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    body: body.trim(),
    author,
    createdAt: Date.now(),
  };
}

function makeThread({ scopeKey, body, pin, author }) {
  const now = Date.now();
  return {
    id: `cmt-${now}-${Math.random().toString(36).slice(2, 8)}`,
    scopeKey,
    status: "open",
    createdAt: now,
    updatedAt: now,
    messages: [makeMessage(body, author)],
    pin: pin ?? null,
  };
}

export function CommentProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, loadInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ threads: state.threads }));
  }, [state.threads]);

  useEffect(() => {
    localStorage.setItem(AUTHOR_KEY, state.author);
  }, [state.author]);

  const value = useMemo(
    () => ({
      threads: state.threads,
      author: state.author,
      commentMode: state.commentMode,
      openThreadId: state.openThreadId,
      draft: state.draft,
      openCount: state.threads.filter((t) => t.status === "open").length,

      setAuthor(name) {
        const next = name?.trim() || "Reviewer";
        dispatch({ type: "SET_AUTHOR", payload: next });
      },
      setCommentMode(on) {
        dispatch({ type: "SET_COMMENT_MODE", payload: Boolean(on) });
      },
      toggleCommentMode() {
        dispatch({ type: "SET_COMMENT_MODE", payload: !state.commentMode });
      },
      startDraft(scopeKey, x, y) {
        dispatch({
          type: "SET_DRAFT",
          payload: {
            scopeKey,
            pin: {
              x: Math.max(0, Math.min(1, x)),
              y: Math.max(0, Math.min(1, y)),
            },
          },
        });
        dispatch({ type: "CLOSE_THREAD" });
      },
      clearDraft() {
        dispatch({ type: "CLEAR_DRAFT" });
      },
      openThread(id) {
        dispatch({ type: "OPEN_THREAD", payload: id });
      },
      closeThread() {
        dispatch({ type: "CLOSE_THREAD" });
      },

      getThreads(scopeKey) {
        return state.threads.filter((thread) => thread.scopeKey === scopeKey);
      },
      getThread(id) {
        return state.threads.find((thread) => thread.id === id) ?? null;
      },

      addSectionComment(scopeKey, body) {
        if (!body?.trim()) return null;
        const thread = makeThread({ scopeKey, body, author: state.author });
        dispatch({ type: "ADD_THREAD", payload: thread });
        return thread.id;
      },
      addPinComment(scopeKey, x, y, body) {
        if (!body?.trim()) return null;
        const thread = makeThread({
          scopeKey,
          body,
          author: state.author,
          pin: { x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) },
        });
        dispatch({ type: "ADD_THREAD", payload: thread });
        return thread.id;
      },
      addReply(threadId, body) {
        if (!body?.trim()) return;
        dispatch({
          type: "ADD_REPLY",
          payload: { threadId, message: makeMessage(body, state.author) },
        });
      },
      toggleResolved(id) {
        dispatch({ type: "TOGGLE_RESOLVED", payload: id });
      },
      deleteThread(id) {
        dispatch({ type: "DELETE_THREAD", payload: id });
      },
    }),
    [state],
  );

  return <CommentContext.Provider value={value}>{children}</CommentContext.Provider>;
}

export function useComments() {
  const ctx = useContext(CommentContext);
  if (!ctx) throw new Error("useComments must be used inside CommentProvider");
  return ctx;
}
