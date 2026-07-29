import { createContext, useContext, useEffect, useMemo, useReducer, useRef } from "react";
import { loadSharedComments, saveSharedComments } from "./commentsApi.js";

const STORAGE_KEY = "sonocea-workspace-comments-v2";
const AUTHOR_KEY = "sonocea-workspace-comment-author";
const POLL_MS = 8000;
const CommentContext = createContext(null);

function loadAuthor() {
  try {
    return localStorage.getItem(AUTHOR_KEY) || "Reviewer";
  } catch {
    return "Reviewer";
  }
}

function loadCachedThreads() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.threads) ? parsed.threads : [];
  } catch {
    return [];
  }
}

function loadInitialState() {
  return {
    threads: loadCachedThreads(),
    author: loadAuthor(),
    commentMode: false,
    openThreadId: null,
    draft: null,
    syncStatus: "loading", // loading | synced | syncing | offline | error
    remoteUpdatedAt: 0,
    syncError: null,
  };
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
        threads: state.threads.map((thread) =>
          thread.id === action.payload
            ? { ...thread, deleted: true, updatedAt: Date.now() }
            : thread,
        ),
        openThreadId: state.openThreadId === action.payload ? null : state.openThreadId,
      };
    case "MOVE_PIN": {
      const { id, x, y } = action.payload;
      return {
        ...state,
        threads: state.threads.map((thread) =>
          thread.id === id && thread.pin
            ? {
                ...thread,
                pin: {
                  x: Math.max(0, Math.min(1, x)),
                  y: Math.max(0, Math.min(1, y)),
                },
                updatedAt: Date.now(),
              }
            : thread,
        ),
      };
    }
    case "MOVE_DRAFT_PIN": {
      if (!state.draft?.pin) return state;
      return {
        ...state,
        draft: {
          ...state.draft,
          pin: {
            x: Math.max(0, Math.min(1, action.payload.x)),
            y: Math.max(0, Math.min(1, action.payload.y)),
          },
        },
      };
    }
    case "REPLACE_THREADS":
      return {
        ...state,
        threads: action.payload.threads,
        remoteUpdatedAt: action.payload.updatedAt || state.remoteUpdatedAt,
        syncStatus: action.payload.syncStatus || state.syncStatus,
        syncError: action.payload.syncError ?? null,
      };
    case "SET_SYNC":
      return {
        ...state,
        syncStatus: action.payload.status,
        syncError: action.payload.error ?? null,
        remoteUpdatedAt:
          action.payload.updatedAt != null ? action.payload.updatedAt : state.remoteUpdatedAt,
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

/** Merge by thread id — keep the newest updatedAt. */
function mergeThreads(a, b) {
  const map = new Map();
  for (const thread of [...a, ...b]) {
    const prev = map.get(thread.id);
    if (!prev || (thread.updatedAt || 0) >= (prev.updatedAt || 0)) {
      map.set(thread.id, thread);
    }
  }
  return [...map.values()].sort((x, y) => (y.updatedAt || 0) - (x.updatedAt || 0));
}

function aliveThreads(threads) {
  return (threads || []).filter((thread) => !thread?.deleted);
}

function threadSignature(threads) {
  return (threads || [])
    .map(
      (t) =>
        `${t.id}:${t.updatedAt}:${t.status}:${t.deleted ? 1 : 0}:${t.messages?.length || 0}:${t.pin?.x},${t.pin?.y}`,
    )
    .join("|");
}

export function CommentProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, loadInitialState);
  const stateRef = useRef(state);
  const saveTimer = useRef(null);
  const bootstrapped = useRef(false);
  const pushing = useRef(false);
  const pendingPush = useRef(false);
  const pullGeneration = useRef(0);
  const lastSyncedSignature = useRef("");

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Cache locally for fast reload / offline fallback.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ threads: state.threads }));
    } catch {
      // ignore quota
    }
  }, [state.threads]);

  useEffect(() => {
    try {
      localStorage.setItem(AUTHOR_KEY, state.author);
    } catch {
      // ignore
    }
  }, [state.author]);

  const pushRemote = () => {
    if (pushing.current) {
      pendingPush.current = true;
      return;
    }
    const payload = stateRef.current.threads;
    const signature = threadSignature(payload);
    if (signature === lastSyncedSignature.current && !pendingPush.current) {
      return;
    }

    pendingPush.current = false;
    pushing.current = true;
    dispatch({ type: "SET_SYNC", payload: { status: "syncing" } });
    const updatedAt = Date.now();
    saveSharedComments(payload, updatedAt)
      .then((saved) => {
        const merged = mergeThreads(saved.threads || [], stateRef.current.threads);
        lastSyncedSignature.current = threadSignature(merged);
        dispatch({
          type: "REPLACE_THREADS",
          payload: {
            threads: merged,
            updatedAt: saved.updatedAt || updatedAt,
            syncStatus: "synced",
            syncError: null,
          },
        });
      })
      .catch((err) => {
        pendingPush.current = true;
        dispatch({
          type: "SET_SYNC",
          payload: {
            status: "error",
            error: String(err?.message || err),
          },
        });
      })
      .finally(() => {
        pushing.current = false;
        if (pendingPush.current) {
          schedulePush(150);
        }
      });
  };

  const schedulePush = (delay = 350) => {
    pendingPush.current = true;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      pushRemote();
    }, delay);
  };

  const pullRemote = async ({ allowBootstrap = false } = {}) => {
    const generation = ++pullGeneration.current;
    try {
      const remote = await loadSharedComments();
      if (generation !== pullGeneration.current) return;

      // Re-read local AFTER the network round-trip so in-flight posts aren't dropped.
      const local = stateRef.current.threads;
      let nextThreads = remote.threads;
      let nextUpdatedAt = remote.updatedAt || 0;
      let shouldPush = false;

      if (
        allowBootstrap &&
        !bootstrapped.current &&
        remote.threads.length === 0 &&
        local.length > 0
      ) {
        bootstrapped.current = true;
        nextThreads = local;
        nextUpdatedAt = Date.now();
        shouldPush = true;
      } else {
        nextThreads = mergeThreads(remote.threads, local);
        if (
          threadSignature(aliveThreads(nextThreads)) !==
          threadSignature(aliveThreads(remote.threads))
        ) {
          shouldPush = true;
        }
      }

      bootstrapped.current = true;
      if (!shouldPush) {
        lastSyncedSignature.current = threadSignature(nextThreads);
      }
      dispatch({
        type: "REPLACE_THREADS",
        payload: {
          threads: nextThreads,
          updatedAt: nextUpdatedAt,
          syncStatus: "synced",
          syncError: null,
        },
      });

      if (shouldPush || pendingPush.current) {
        schedulePush(200);
      }
    } catch (err) {
      if (generation !== pullGeneration.current) return;
      dispatch({
        type: "SET_SYNC",
        payload: {
          status: stateRef.current.threads.length ? "offline" : "error",
          error: String(err?.message || err),
        },
      });
    }
  };

  // Initial pull + poll for other reviewers' comments.
  useEffect(() => {
    pullRemote({ allowBootstrap: true });
    const id = setInterval(() => {
      if (stateRef.current.draft) return;
      pullRemote();
    }, POLL_MS);

    function onFocus() {
      pullRemote();
    }
    function onVisibility() {
      if (document.visibilityState === "visible") pullRemote();
    }
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearInterval(id);
      if (saveTimer.current) clearTimeout(saveTimer.current);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Push after local mutations.
  const threadsSignature = useMemo(() => threadSignature(state.threads), [state.threads]);

  useEffect(() => {
    if (!bootstrapped.current) return;
    if (state.syncStatus === "loading") return;
    if (threadsSignature === lastSyncedSignature.current) return;
    schedulePush();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadsSignature]);

  const value = useMemo(
    () => ({
      threads: state.threads,
      author: state.author,
      commentMode: state.commentMode,
      openThreadId: state.openThreadId,
      draft: state.draft,
      openCount: aliveThreads(state.threads).filter((t) => t.status === "open").length,
      syncStatus: state.syncStatus,
      syncError: state.syncError,

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
        return aliveThreads(state.threads).filter((thread) => thread.scopeKey === scopeKey);
      },
      getThread(id) {
        const thread = state.threads.find((thread) => thread.id === id) ?? null;
        return thread && !thread.deleted ? thread : null;
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
        // Guarantee a publish attempt even if signature effect is delayed.
        pendingPush.current = true;
        schedulePush(100);
        return thread.id;
      },
      addReply(threadId, body) {
        if (!body?.trim()) return;
        dispatch({
          type: "ADD_REPLY",
          payload: { threadId, message: makeMessage(body, state.author) },
        });
        pendingPush.current = true;
        schedulePush(100);
      },
      toggleResolved(id) {
        dispatch({ type: "TOGGLE_RESOLVED", payload: id });
        pendingPush.current = true;
        schedulePush(100);
      },
      deleteThread(id) {
        dispatch({ type: "DELETE_THREAD", payload: id });
        pendingPush.current = true;
        schedulePush(100);
      },
      movePin(id, x, y) {
        dispatch({ type: "MOVE_PIN", payload: { id, x, y } });
        pendingPush.current = true;
        schedulePush(250);
      },
      moveDraftPin(x, y) {
        dispatch({ type: "MOVE_DRAFT_PIN", payload: { x, y } });
      },
      refreshComments() {
        return pullRemote();
      },
      republishComments() {
        pendingPush.current = true;
        return new Promise((resolve, reject) => {
          const updatedAt = Date.now();
          dispatch({ type: "SET_SYNC", payload: { status: "syncing" } });
          saveSharedComments(stateRef.current.threads, updatedAt)
            .then((saved) => {
              pendingPush.current = false;
              dispatch({
                type: "REPLACE_THREADS",
                payload: {
                  threads: mergeThreads(saved.threads || [], stateRef.current.threads),
                  updatedAt: saved.updatedAt || updatedAt,
                  syncStatus: "synced",
                  syncError: null,
                },
              });
              resolve(saved);
            })
            .catch((err) => {
              dispatch({
                type: "SET_SYNC",
                payload: {
                  status: "error",
                  error: String(err?.message || err),
                },
              });
              reject(err);
            });
        });
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
