import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  sessionBeforeYouBegin,
  sessionDescription,
  sessionHeadline,
} from "./SessionAtmosphere.jsx";
import {
  formatDuration,
  homeModeForSession,
  homeModeSessionTitle,
  resolvePartner,
} from "../data/catalog.js";
import { useAppStore } from "../context/AppStore.jsx";
import { openCheckInModal } from "./CheckInModal.jsx";

const LIGHT = {
  sheet: "bg-[#f7f6f2]",
  shadow: "shadow-[0_-24px_80px_rgba(0,0,0,0.28)]",
  handle: "bg-black/15",
  meta: "text-[#8a8680]",
  title: "text-[#141414]",
  headline: "text-[#1a1a1a]",
  body: "text-[#6a6864]",
  rule: "border-[#ddd9d0]",
  section: "text-[#9a9690]",
  item: "text-[#2a2a28]",
  dot: "bg-[#2a2a28]/40",
  cta: "bg-[#111110] text-white",
  scrim: "bg-black/40",
};

const DARK = {
  sheet: "border-t border-white/10 bg-[#161616]/96 text-white backdrop-blur-xl",
  shadow: "shadow-[0_-20px_60px_rgba(0,0,0,0.45)]",
  handle: "bg-white/25",
  meta: "text-white/45",
  title: "text-white",
  headline: "text-white/90",
  body: "text-white/55",
  rule: "border-white/10",
  section: "text-white/35",
  item: "text-white/65",
  dot: "bg-white/40",
  cta: "bg-white text-[#111110]",
  scrim: "bg-black/45",
};

/** Imperative open API — backed by the host mounted inside ListenerFrame. */
let hostApi = null;
const pendingOpens = [];

function flushPending() {
  if (!hostApi || pendingOpens.length === 0) return;
  const next = pendingOpens.shift();
  hostApi.open(next.session, next.opts);
}

/**
 * Open the shared session details drawer from any listener screen.
 * opts: { resume?, variant?: "light"|"dark", showStart?: boolean }
 */
export function openSessionDrawer(session, opts = {}) {
  if (!session) return;
  if (hostApi) {
    hostApi.open(session, opts);
    return;
  }
  pendingOpens.push({ session, opts });
}

export function closeSessionDrawer() {
  hostApi?.close?.();
}

/**
 * Shared bottom-sheet session details — same springy slide used on Home.
 * variant "light" for browsing; "dark" for the in-player info sheet.
 */
export function SessionDrawer({
  open,
  session,
  onClose,
  onStart,
  resume = false,
  variant = "light",
  showStart = true,
  startLabel,
  /** Optional partner for org-specific Rest/Focus/Restore labels. */
  partner = null,
}) {
  if (!session) return null;
  const beforeItems = sessionBeforeYouBegin(session);
  const tone = variant === "dark" ? DARK : LIGHT;
  const cta = startLabel || (resume ? "Resume session" : "Start session");
  const displayTitle = homeModeSessionTitle(session, partner);
  const modeLabel = homeModeForSession(session, partner)?.label;

  return (
    <div
      className={`absolute inset-0 z-40 flex flex-col justify-end ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={`absolute inset-0 ${tone.scrim} transition-opacity ease-out ${
          open ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDuration: "380ms" }}
        aria-label="Close session details"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />

      <div
        id="session-info-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={`${displayTitle} details`}
        className={`relative flex max-h-[78%] flex-col overflow-hidden rounded-t-[1.75rem] will-change-transform ${tone.sheet} ${tone.shadow}`}
        style={{
          transform: open ? "translateY(0)" : "translateY(108%)",
          transition: open
            ? "transform 480ms cubic-bezier(0.22, 1, 0.36, 1)"
            : "transform 340ms cubic-bezier(0.4, 0, 0.7, 0.2)",
        }}
      >
        <div className="flex shrink-0 flex-col items-center pt-3">
          <button
            type="button"
            className="flex w-full flex-col items-center pb-1 pt-0.5"
            onClick={onClose}
            aria-label="Close"
          >
            <span className={`h-1 w-10 rounded-full ${tone.handle}`} aria-hidden />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6 pt-2">
          <div
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(12px)",
              transition: open
                ? "opacity 420ms ease-out 80ms, transform 420ms cubic-bezier(0.22, 1, 0.36, 1) 80ms"
                : "opacity 160ms ease, transform 160ms ease",
            }}
          >
            <p className={`text-[12px] font-medium tracking-tight ${tone.meta}`}>
              {formatDuration(session.durationMin)}
              {modeLabel || session.useCase || session.category
                ? ` · ${modeLabel || session.useCase || session.category}`
                : ""}
            </p>
            <h2
              className={`mt-2 text-[1.75rem] font-medium leading-tight tracking-[-0.03em] ${tone.title}`}
            >
              {displayTitle}
            </h2>
            <p
              className={`mt-3 text-[1.05rem] font-medium leading-snug tracking-[-0.02em] ${tone.headline}`}
            >
              {sessionHeadline(session)}
            </p>
            {sessionDescription(session) ? (
              <p className={`mt-2 max-w-[36ch] text-[14px] leading-relaxed ${tone.body}`}>
                {sessionDescription(session)}
              </p>
            ) : null}
          </div>

          {beforeItems.length > 0 ? (
            <div
              className="mt-6"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(14px)",
                transition: open
                  ? "opacity 420ms ease-out 150ms, transform 420ms cubic-bezier(0.22, 1, 0.36, 1) 150ms"
                  : "opacity 160ms ease, transform 160ms ease",
              }}
            >
              <p
                className={`border-b pb-1.5 text-[10px] font-medium uppercase tracking-[0.14em] ${tone.rule} ${tone.section}`}
              >
                Before you begin
              </p>
              <ul className="mt-3 space-y-2">
                {beforeItems.slice(0, 3).map((item) => (
                  <li key={item} className={`flex gap-2.5 text-[14px] leading-snug ${tone.item}`}>
                    <span
                      className={`mt-[0.55em] h-1 w-1 shrink-0 rounded-full ${tone.dot}`}
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {showStart && onStart ? (
            <div
              className="mt-8 pb-2"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(16px)",
                transition: open
                  ? "opacity 420ms ease-out 220ms, transform 420ms cubic-bezier(0.22, 1, 0.36, 1) 220ms"
                  : "opacity 160ms ease, transform 160ms ease",
              }}
            >
              <button
                type="button"
                className={`w-full rounded-full px-5 py-3.5 text-[14px] font-medium tracking-tight transition active:scale-[0.98] ${tone.cta}`}
                onClick={onStart}
              >
                {cta}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/** Mount once inside the phone frame so the drawer covers chrome + content. */
export function SessionDrawerHost() {
  const navigate = useNavigate();
  const { user, partners } = useAppStore();
  const partner = resolvePartner(partners, user?.partnerId);
  const onCloseRef = useRef(null);
  const [session, setSession] = useState(null);
  const [open, setOpen] = useState(false);
  const [resume, setResume] = useState(false);
  const [variant, setVariant] = useState("light");
  const [showStart, setShowStart] = useState(true);

  useEffect(() => {
    const api = {
      open(nextSession, opts = {}) {
        if (!nextSession) return;
        onCloseRef.current = typeof opts.onClose === "function" ? opts.onClose : null;
        setSession(nextSession);
        setResume(Boolean(opts.resume));
        setVariant(opts.variant === "dark" ? "dark" : "light");
        setShowStart(opts.showStart !== false);
        setOpen(false);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setOpen(true));
        });
      },
      close() {
        setOpen(false);
        window.setTimeout(() => {
          const cb = onCloseRef.current;
          onCloseRef.current = null;
          setSession(null);
          setResume(false);
          setVariant("light");
          setShowStart(true);
          cb?.();
        }, 360);
      },
    };
    hostApi = api;
    flushPending();
    return () => {
      if (hostApi === api) hostApi = null;
    };
  }, []);

  function reset() {
    onCloseRef.current = null;
    setSession(null);
    setResume(false);
    setVariant("light");
    setShowStart(true);
  }

  function handleClose() {
    const cb = onCloseRef.current;
    setOpen(false);
    window.setTimeout(() => {
      reset();
      cb?.();
    }, 360);
  }

  function handleStart() {
    if (!session) return;
    const next = session;
    const wasResume = resume;
    onCloseRef.current = null;
    setOpen(false);
    window.setTimeout(() => {
      reset();
      if (wasResume) {
        navigate(`/app/listener/player/${next.id}`);
      } else {
        openCheckInModal(next);
      }
    }, 280);
  }

  return (
    <SessionDrawer
      open={open}
      session={session}
      onClose={handleClose}
      onStart={showStart ? handleStart : undefined}
      resume={resume}
      variant={variant}
      showStart={showStart}
      partner={partner}
    />
  );
}
