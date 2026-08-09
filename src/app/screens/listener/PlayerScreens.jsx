import { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  LISTEN_STREAK_DAYS,
  listenDaysInWindow,
  listenerGreetingName,
  NEUROTYPE_OPTIONS,
} from "../../data/catalog.js";
import { useAppStore } from "../../context/AppStore.jsx";
import { ListenerFrame } from "../../components/ListenerFrame.jsx";
import { AppBody, AppButton, AppTitle } from "../../components/ui.jsx";
import { FadeBridgeScreen } from "../../components/FadeBridge.jsx";
import { formatPlayTime, sessionAtmosphere } from "../../components/SessionAtmosphere.jsx";
import { closeSessionDrawer, openSessionDrawer } from "../../components/SessionDrawer.jsx";
import {
  FeelNoteField,
  FeelSlider,
  openCheckInModal,
} from "../../components/CheckInModal.jsx";

function modeFromNeurotype(neurotypeId) {
  return NEUROTYPE_OPTIONS.find((n) => n.id === neurotypeId)?.mode ?? "regulation";
}

const HOME_PATH = "/app/listener/home";

/** Soft dissolve before leaving after-check-in (~1.5s). */
const FEEL_EXIT_MS = 1500;

/** Vertically centred after-check-in layout with a soft fade. */
function FeelCheckInPane({ title, body, children, actions, exiting = false }) {
  return (
    <div
      className={`${
        exiting ? "feel-check-in-exit" : "feel-check-in-enter"
      } flex h-full min-h-full flex-col items-center justify-center px-5 py-6 text-center`}
    >
      <div className="flex w-full max-w-full flex-col items-center">
        <AppTitle className="mx-auto max-w-[18ch] text-center text-[1.45rem] leading-[1.12]">
          {title}
        </AppTitle>
        {body ? (
          <AppBody className="mx-auto mt-2.5 max-w-[32ch] text-center text-[13.5px] leading-snug">
            {body}
          </AppBody>
        ) : null}
        {children}
        {actions ? <div className="mt-8 w-full space-y-3">{actions}</div> : null}
      </div>
    </div>
  );
}

function useFeelExit() {
  const [exiting, setExiting] = useState(false);
  const pendingRef = useRef(null);

  function runExit(next) {
    if (exiting) return;
    pendingRef.current = next;
    setExiting(true);
  }

  useEffect(() => {
    if (!exiting) return undefined;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const t = window.setTimeout(() => {
      pendingRef.current?.();
      pendingRef.current = null;
    }, reduce ? 0 : FEEL_EXIT_MS);
    return () => window.clearTimeout(t);
  }, [exiting]);

  return { exiting, runExit };
}

/** Demo playback - full session preview completes in ~5s. */
const DEMO_TOTAL_MS = 5000;
const DEMO_TICK_MS = 100;

/**
 * Simulated secure player - progress is local only (no real audio extract).
 * Finish → brief complete state → feedback, then home.
 */
export function ListenerPlayer() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { role, user, getSession, recordListen, neurotypeId, listenHistory, listeners } =
    useAppStore();
  const session = getSession(sessionId);
  const listenerId =
    listeners.find((l) => l.email === user?.email)?.id ??
    listeners.find((l) => l.inviteCode === user?.inviteCode)?.id ??
    null;

  const [showBeginBridge, setShowBeginBridge] = useState(() =>
    Boolean(location.state?.beginBridge),
  );
  const [playing, setPlaying] = useState(() => !location.state?.beginBridge);
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const recordedRef = useRef(false);
  const isFirstCompletionRef = useRef(null);

  // Drop beginBridge from history so refresh/back doesn’t replay the beat.
  useEffect(() => {
    if (!location.state?.beginBridge) return;
    const { beginBridge: _drop, ...rest } = location.state;
    navigate(location.pathname, { replace: true, state: Object.keys(rest).length ? rest : undefined });
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    if (!playing || finished) return undefined;
    const step = 100 / (DEMO_TOTAL_MS / DEMO_TICK_MS);
    const id = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + step);
        if (next >= 100) {
          setPlaying(false);
          setFinished(true);
        }
        return next;
      });
    }, DEMO_TICK_MS);
    return () => clearInterval(id);
  }, [playing, finished]);

  useEffect(() => {
    if (finished && session && !recordedRef.current) {
      recordedRef.current = true;
      recordListen({
        sessionId: session.id,
        completedAt: Date.now(),
        progressPct: 100,
        durationMin: session.durationMin,
      });
    }
  }, [finished, session, recordListen]);

  if (role !== "listener" || !user) return <Navigate to="/app/listener" replace />;
  if (!session) {
    return (
      <ListenerFrame hideTabBar>
        <AppTitle className="mt-8">Session unavailable</AppTitle>
        <AppButton className="mt-6" onClick={() => navigate(HOME_PATH)}>
          Home
        </AppButton>
      </ListenerFrame>
    );
  }

  if (showBeginBridge) {
    return (
      <FadeBridgeScreen
        phrases={[
          [
            { text: "Your", line: 0 },
            { text: "session", line: 0 },
            { text: "is", line: 1 },
            { text: "about", line: 1 },
            { text: "to", line: 1 },
            { text: "begin.", line: 1 },
          ],
        ]}
        onDone={() => {
          setShowBeginBridge(false);
          setPlaying(true);
        }}
      />
    );
  }

  const mode = session.mode || modeFromNeurotype(neurotypeId);
  const timeLabel = formatPlayTime(progress, session.durationMin);

  function goFeedback() {
    navigate(`/app/listener/feedback/${session.id}`, { replace: true });
  }

  function goHome(recordPartial = false) {
    if (recordPartial && !finished && progress > 5) {
      recordListen({
        sessionId: session.id,
        completedAt: Date.now(),
        progressPct: Math.round(progress),
        durationMin: session.durationMin,
      });
    }
    navigate(HOME_PATH, { replace: true });
  }

  function toggleInfo() {
    if (infoOpen) {
      closeSessionDrawer();
      setInfoOpen(false);
      return;
    }
    openSessionDrawer(session, {
      variant: "dark",
      showStart: false,
      onClose: () => setInfoOpen(false),
    });
    setInfoOpen(true);
  }

  if (finished) {
    if (isFirstCompletionRef.current === null) {
      const priorCompletions = listenHistory.filter((h) => {
        if ((h.progressPct ?? 0) < 90) return false;
        if (!listenerId) return true;
        return !h.listenerId || h.listenerId === listenerId;
      }).length;
      isFirstCompletionRef.current = priorCompletions === 0;
    }
    const isFirstCompletion = isFirstCompletionRef.current;
    return (
      <FadeBridgeScreen
        phrases={
          isFirstCompletion
            ? [
                [
                  { text: "Well", line: 0 },
                  { text: "done.", line: 0 },
                ],
                [
                  { text: "You've", line: 0 },
                  { text: "completed", line: 0 },
                  { text: "your", line: 1 },
                  { text: "first", line: 1 },
                  { text: "session.", line: 1 },
                ],
              ]
            : [
                [
                  { text: "Well", line: 0 },
                  { text: "done.", line: 0 },
                ],
                [
                  { text: "Your", line: 0 },
                  { text: "session", line: 0 },
                  { text: "is", line: 1 },
                  { text: "complete.", line: 1 },
                ],
              ]
        }
        onDone={goFeedback}
      />
    );
  }

  return (
    <ListenerFrame mode={mode} hideTabBar bleed slowEnter>
      <div
        className="relative flex h-full min-h-full flex-col text-white"
        style={{ background: sessionAtmosphere(mode, "player") }}
      >
        <div className="relative z-10 flex items-center justify-between px-5 pt-5">
          <button
            type="button"
            className={`min-w-0 pr-4 text-left ${playing ? "flex h-9 items-center" : ""}`}
            onClick={toggleInfo}
            aria-expanded={infoOpen}
            aria-controls="session-info-drawer"
          >
            <p className="truncate text-[16px] font-medium leading-none tracking-tight text-white/90">
              {session.title}
            </p>
            {!playing ? (
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white/40">Paused</p>
            ) : null}
          </button>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center text-white/75"
              aria-label={infoOpen ? "Hide session info" : "Show session info"}
              aria-expanded={infoOpen}
              aria-controls="session-info-drawer"
              onClick={toggleInfo}
            >
              <MoreIcon />
            </button>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center text-white/75"
              aria-label="End session"
              onClick={() => goHome(true)}
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-auto px-6 pb-11 pt-16">
          <div className="relative mb-10">
            <div className="h-[1.5px] w-full bg-white/25">
              <div
                className="h-full bg-white transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div
              className="absolute top-0 h-7 w-[1.5px] bg-white transition-[left] duration-300"
              style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
            />
            <p
              className="absolute -top-5 text-[13px] tracking-tight text-white transition-[left] duration-300"
              style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
            >
              {timeLabel}
            </p>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="button"
              className="flex h-[52px] w-[52px] items-center justify-center"
              aria-label={playing ? "Pause" : "Play"}
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
          </div>
        </div>

      </div>
    </ListenerFrame>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="4" cy="9" r="1.15" fill="currentColor" />
      <circle cx="9" cy="9" r="1.15" fill="currentColor" />
      <circle cx="14" cy="9" r="1.15" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden>
      <circle cx="26" cy="26" r="25" stroke="white" strokeWidth="1.2" />
      <path d="M20 17v18M32 17v18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden>
      <circle cx="26" cy="26" r="25" stroke="white" strokeWidth="1.2" />
      <path d="M22 17.5v17l13-8.5-13-8.5z" fill="white" />
    </svg>
  );
}

/** Deep-link / flow-rail entry: land on home with the check-in modal over it. */
export function ListenerCheckIn() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { role, user, getSession } = useAppStore();
  const session = getSession(sessionId);
  const openedRef = useRef(false);

  useEffect(() => {
    if (role !== "listener" || !user) return;
    if (openedRef.current) return;
    openedRef.current = true;
    if (session) openCheckInModal(session);
    navigate(HOME_PATH, { replace: true });
  }, [role, user, session, navigate]);

  if (role !== "listener" || !user) return <Navigate to="/app/listener" replace />;
  return null;
}

export function ListenerFeedback() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { role, user, getSession, submitFeedback, feedback, neurotypeId, onboardingPrefs } =
    useAppStore();
  const session = getSession(sessionId);
  const [rating, setRating] = useState(3);
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);
  const { exiting, runExit } = useFeelExit();

  const beforeEntry = feedback.find((f) => f.sessionId === sessionId && f.phase === "before");

  function finishToHome() {
    navigate(HOME_PATH, { replace: true });
  }

  if (role !== "listener" || !user) return <Navigate to="/app/listener" replace />;

  const mode = session?.mode || modeFromNeurotype(neurotypeId);
  const greetingName =
    listenerGreetingName(user) || onboardingPrefs?.preferredName?.trim() || null;

  function send() {
    if (!session || rating == null || exiting) return;
    submitFeedback({
      sessionId: session.id,
      rating,
      note,
      at: Date.now(),
      phase: "after",
      ...(beforeEntry?.pairId ? { pairId: beforeEntry.pairId } : {}),
    });
    runExit(() => setSent(true));
  }

  if (sent) {
    return (
      <FadeBridgeScreen
        phrases={[
          greetingName
            ? [
                { text: "See", line: 0 },
                { text: "you", line: 0 },
                { text: "at", line: 0 },
                { text: "your", line: 0 },
                { text: "next", line: 1 },
                { text: "session,", line: 1 },
                { text: `${greetingName}.`, line: 1 },
              ]
            : [
                { text: "See", line: 0 },
                { text: "you", line: 0 },
                { text: "at", line: 0 },
                { text: "your", line: 0 },
                { text: "next", line: 1 },
                { text: "session.", line: 1 },
              ],
        ]}
        onDone={finishToHome}
      />
    );
  }

  return (
    <ListenerFrame mode={mode} hideTabBar screenKey="after-check-in">
      <FeelCheckInPane
        title="How do you feel now?"
        body="Choose what feels closest. There’s no right answer. This simply helps you notice how you feel after listening."
        exiting={exiting}
        actions={
          <>
            <AppButton fullWidth disabled={rating == null || exiting} onClick={send}>
              Continue
            </AppButton>
            <AppButton fullWidth variant="ghost" disabled={exiting} onClick={() => runExit(finishToHome)}>
              Skip
            </AppButton>
          </>
        }
      >
        <FeelSlider value={rating} onChange={setRating} />
        <FeelNoteField value={note} onChange={setNote} resetKey={sessionId} />
      </FeelCheckInPane>
    </ListenerFrame>
  );
}

export function ListenerProfile() {
  const navigate = useNavigate();
  const {
    role,
    user,
    neurotypeId,
    listenHistory,
    feedback,
    logout,
    partners,
    appearance,
    setAppearance,
  } = useAppStore();

  if (role !== "listener" || !user) return <Navigate to="/app/listener" replace />;

  const mode = modeFromNeurotype(neurotypeId);
  const partner = partners.find((p) => p.id === user.partnerId);
  const completed = listenHistory.filter((h) => h.progressPct >= 90).length;
  const { listenedDays } = listenDaysInWindow(listenHistory, LISTEN_STREAK_DAYS);
  const greeting =
    user.isAnonymous && !user.displayName ? "You" : listenerGreetingName(user) || user.displayName || user.name || "You";

  return (
    <ListenerFrame
      mode={mode}
      activeTab="profile"
    >
      <div className="pb-6 pt-2">
        <AppTitle className="text-[1.5rem]">{greeting}</AppTitle>
        <AppBody className="mt-2">
          {user.isAnonymous ? "Private account" : user.email}
          <br />
          {partner?.name}
        </AppBody>

        <dl className="mt-8 grid grid-cols-3 gap-2">
          {[
            { label: "Completed", value: completed },
            { label: "Days", value: listenedDays },
            { label: "Ratings", value: feedback.length },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border px-3 py-3 text-center"
              style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface)" }}
            >
              <dt className="text-[11px]" style={{ color: "var(--proto-text-muted)" }}>
                {stat.label}
              </dt>
              <dd className="mt-1 text-[18px] font-medium" style={{ color: "var(--proto-text)" }}>
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 space-y-2">
          <p className="text-[14px] font-medium" style={{ color: "var(--proto-text)" }}>
            Appearance
          </p>
          <div className="space-y-2">
            {[
              { id: "light", label: "Light" },
              { id: "dark", label: "Dark" },
              { id: "adapt", label: "Adapt to time of day" },
            ].map((opt) => {
              const on = appearance === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setAppearance(opt.id)}
                  className="flex w-full items-center justify-between rounded-xl border px-3.5 py-3 text-left transition-colors"
                  style={{
                    borderColor: on ? "var(--proto-text)" : "var(--proto-border)",
                    background: on
                      ? "color-mix(in srgb, var(--proto-text) 6%, var(--proto-surface))"
                      : "var(--proto-surface)",
                    color: "var(--proto-text)",
                  }}
                  aria-pressed={on}
                >
                  <span className="text-[13px] font-medium">{opt.label}</span>
                  {on ? (
                    <span
                      className="flex h-5 w-5 items-center justify-center rounded-full"
                      style={{ background: "var(--proto-text)", color: "var(--proto-bg)" }}
                      aria-hidden
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M2 5.2L4.1 7.3L8.2 2.8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  ) : (
                    <span
                      className="h-5 w-5 rounded-full"
                      style={{ border: "1px solid var(--proto-border)" }}
                      aria-hidden
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 space-y-2">
          <AppButton fullWidth variant="secondary" onClick={() => navigate("/app/listener/organisation")}>
            Organisation
          </AppButton>
          <AppButton fullWidth variant="secondary" onClick={() => navigate("/app/listener/about")}>
            About Sonocea
          </AppButton>
          <AppButton fullWidth variant="secondary" onClick={() => navigate("/app/listener/support")}>
            Support
          </AppButton>
          <AppButton
            fullWidth
            variant="ghost"
            onClick={() => {
              logout();
              navigate("/app");
            }}
          >
            Sign out
          </AppButton>
        </div>
      </div>
    </ListenerFrame>
  );
}

export function ListenerAbout() {
  const navigate = useNavigate();
  const { neurotypeId } = useAppStore();
  const mode = modeFromNeurotype(neurotypeId);

  return (
    <ListenerFrame mode={mode} hideTabBar>
      <div className="pb-6 pt-4">
        <button type="button" className="text-[12px]" style={{ color: "var(--proto-text-muted)" }} onClick={() => navigate(-1)}>
          ← Back
        </button>
        <AppTitle className="mt-6">Sonocea</AppTitle>
        <AppBody className="mt-4 max-w-[34ch]">
          Sonocea offers listening sessions designed to help you settle, focus, and recover. Access is by invitation from your organisation.
        </AppBody>
        <AppBody className="mt-4 max-w-[34ch]">
          Sessions stream securely in the app and can’t be downloaded or shared.
        </AppBody>
      </div>
    </ListenerFrame>
  );
}

export function ListenerSupport() {
  const navigate = useNavigate();
  const { neurotypeId } = useAppStore();
  const mode = modeFromNeurotype(neurotypeId);

  return (
    <ListenerFrame mode={mode} hideTabBar>
      <div className="pb-6 pt-4">
        <button type="button" className="text-[12px]" style={{ color: "var(--proto-text-muted)" }} onClick={() => navigate(-1)}>
          ← Back
        </button>
        <AppTitle className="mt-6">Need help?</AppTitle>
        <AppBody className="mt-4">
          For access or programme questions, contact your organisation. For playback or account issues, reach Sonocea using the email on your invitation.
        </AppBody>
        <div
          className="mt-8 rounded-2xl border p-4"
          style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface)" }}
        >
          <p className="text-[13px]" style={{ color: "var(--proto-text)" }}>
            Demo note: this is a working product shell - support messages aren’t sent.
          </p>
        </div>
        <AppButton className="mt-8" fullWidth variant="secondary" onClick={() => navigate("/app/listener/profile")}>
          Back to profile
        </AppButton>
      </div>
    </ListenerFrame>
  );
}
