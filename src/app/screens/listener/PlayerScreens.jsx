import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  FEEL_LABELS,
  LISTEN_STREAK_DAYS,
  listenDaysInWindow,
  listenerGreetingName,
  NEUROTYPE_OPTIONS,
} from "../../data/catalog.js";
import { useAppStore } from "../../context/AppStore.jsx";
import { ListenerFrame } from "../../components/ListenerFrame.jsx";
import { AppBody, AppButton, AppTitle } from "../../components/ui.jsx";
import { FadeBridgeScreen } from "../../components/FadeBridge.jsx";
import {
  formatPlayTime,
  sessionAtmosphere,
  sessionBeforeYouBegin,
  sessionDescription,
  sessionHeadline,
} from "../../components/SessionAtmosphere.jsx";

function modeFromNeurotype(neurotypeId) {
  return NEUROTYPE_OPTIONS.find((n) => n.id === neurotypeId)?.mode ?? "regulation";
}

const HOME_PATH = "/app/listener/home";

/** Engaging 1–5 feel slider shared by before/after check-ins. */
function FeelSlider({ value, onChange }) {
  const label = value != null ? FEEL_LABELS[value] : "Slide to check in";
  const pct = value != null ? ((value - 1) / 4) * 100 : 50;

  return (
    <div className="mt-8 w-full text-center">
      <p
        className="text-[2.5rem] font-medium leading-none tracking-[-0.04em] tabular-nums"
        style={{ color: "var(--proto-text)" }}
      >
        {value ?? "—"}
      </p>
      <p className="mt-3 text-[15px] font-medium tracking-tight" style={{ color: "var(--proto-text)" }}>
        {label}
      </p>

      <div className="relative mt-8 px-1">
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={value ?? 3}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label="How do you feel, from 1 unsettled to 5 settled"
          className="feel-slider w-full"
          style={{ "--feel-pct": `${pct}%` }}
        />
        <div
          className="mt-3 flex justify-between text-[11px]"
          style={{ color: "var(--proto-text-muted)" }}
        >
          <span>Unsettled</span>
          <span>Settled</span>
        </div>
      </div>

      <style>{`
        .feel-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 999px;
          outline: none;
          cursor: pointer;
          background: linear-gradient(
            to right,
            var(--proto-text) 0%,
            var(--proto-text) var(--feel-pct),
            color-mix(in srgb, var(--proto-border) 80%, transparent) var(--feel-pct),
            color-mix(in srgb, var(--proto-border) 80%, transparent) 100%
          );
        }
        .feel-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 999px;
          background: var(--proto-bg, #fff);
          border: 2px solid var(--proto-text);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
          margin-top: -11px;
        }
        .feel-slider::-moz-range-thumb {
          width: 28px;
          height: 28px;
          border-radius: 999px;
          background: var(--proto-bg, #fff);
          border: 2px solid var(--proto-text);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
        }
        .feel-slider::-webkit-slider-runnable-track {
          height: 6px;
          border-radius: 999px;
        }
        .feel-slider::-moz-range-track {
          height: 6px;
          border-radius: 999px;
          background: transparent;
        }
      `}</style>
    </div>
  );
}

/** Vertically centred check-in / feedback layout with a soft fade-up. */
function FeelCheckInPane({ title, body, children, actions }) {
  return (
    <div className="feel-check-in-enter flex h-full min-h-full flex-col items-center justify-center px-1 py-6 text-center">
      <div className="flex w-full max-w-full flex-col items-center">
        <AppTitle className="mx-auto max-w-[18ch] text-center text-[1.75rem] leading-[1.1]">
          {title}
        </AppTitle>
        {body ? (
          <AppBody className="mx-auto mt-3 max-w-[32ch] text-center text-[15px] leading-snug">
            {body}
          </AppBody>
        ) : null}
        {children}
        {actions ? <div className="mt-10 w-full space-y-3">{actions}</div> : null}
      </div>
    </div>
  );
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
  const { role, user, getSession, recordListen, neurotypeId, listenHistory, listeners } =
    useAppStore();
  const session = getSession(sessionId);
  const listenerId =
    listeners.find((l) => l.email === user?.email)?.id ??
    listeners.find((l) => l.inviteCode === user?.inviteCode)?.id ??
    null;

  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const recordedRef = useRef(false);
  const isFirstCompletionRef = useRef(null);

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
    setInfoOpen((o) => !o);
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
    <ListenerFrame mode={mode} hideTabBar bleed>
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

        <SessionInfoDrawer
          open={infoOpen}
          session={session}
          onClose={() => setInfoOpen(false)}
        />
      </div>
    </ListenerFrame>
  );
}

function SessionInfoDrawer({ open, session, onClose }) {
  const beforeItems = sessionBeforeYouBegin(session);

  return (
    <div
      className={`absolute inset-0 z-30 flex flex-col justify-end ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-black/45 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Hide session info"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />

      <div
        id="session-info-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={`${session.title} session info`}
        className={`relative flex max-h-[72%] flex-col rounded-t-[1.5rem] border-t border-white/10 bg-[#161616]/96 text-white shadow-[0_-20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex shrink-0 flex-col items-center pt-3">
          <button
            type="button"
            className="flex w-full flex-col items-center pb-2 pt-0.5"
            onClick={onClose}
            aria-label="Hide session info"
          >
            <span className="h-1 w-10 rounded-full bg-white/25" aria-hidden />
          </button>
          <div className="flex w-full items-start justify-between gap-3 px-5 pb-3 pt-1">
            <div className="min-w-0">
              <h2 className="text-[1.35rem] font-medium tracking-[-0.02em] text-white">
                {session.title}
              </h2>
              <p className="mt-2 text-[15px] font-medium leading-snug tracking-[-0.01em] text-white/90">
                {sessionHeadline(session)}
              </p>
              {sessionDescription(session) ? (
                <p className="mt-2 max-w-[34ch] text-[13px] leading-relaxed text-white/55">
                  {sessionDescription(session)}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/55 hover:bg-white/10 hover:text-white/85"
              aria-label="Hide"
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-8">
          {beforeItems.length > 0 ? (
            <DrawerSection label="Before you begin">
              <ul className="space-y-2">
                {beforeItems.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-2.5 text-[13px] leading-snug text-white/65">
                    <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-white/40" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </DrawerSection>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function DrawerSection({ label, children }) {
  return (
    <section className="mt-5 first:mt-1">
      <div className="border-b border-white/10 pb-1.5">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/35">{label}</p>
      </div>
      <div className="mt-3">{children}</div>
    </section>
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

function FeelNoteField({ value, onChange }) {
  return (
    <label className="mt-8 block w-full text-left">
      <span className="flex items-baseline justify-between gap-2 text-[13px]">
        <span style={{ color: "var(--proto-text)" }}>Anything you’d like to note?</span>
        <span style={{ color: "var(--proto-text-muted)" }}>Optional</span>
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        className="mt-2 w-full resize-none rounded-xl border px-3.5 py-3 text-left text-[14px] outline-none"
        style={{
          borderColor: "var(--proto-border)",
          background: "var(--proto-surface)",
          color: "var(--proto-text)",
        }}
        placeholder="A few words is enough…"
      />
    </label>
  );
}

export function ListenerCheckIn() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { role, user, getSession, submitFeedback, neurotypeId } = useAppStore();
  const session = getSession(sessionId);
  const [rating, setRating] = useState(3);
  const [note, setNote] = useState("");

  if (role !== "listener" || !user) return <Navigate to="/app/listener" replace />;

  const mode = session?.mode || modeFromNeurotype(neurotypeId);
  const playerPath = `/app/listener/player/${sessionId}`;

  function goPlayer(checkInPairId) {
    navigate(playerPath, {
      replace: true,
      state: checkInPairId ? { checkInPairId } : undefined,
    });
  }

  function send() {
    if (!session || rating == null) return;
    const pairId = `${session.id}-${Date.now()}`;
    submitFeedback({
      sessionId: session.id,
      rating,
      note,
      at: Date.now(),
      phase: "before",
      pairId,
    });
    goPlayer(pairId);
  }

  return (
    <ListenerFrame mode={mode} hideTabBar screenKey="before-check-in">
      <FeelCheckInPane
        title="Before you begin, tell us how you’re feeling"
        body="Choose what feels closest. We’ll ask you again after the session so you can notice if anything has changed."
        actions={
          <>
            <AppButton fullWidth disabled={rating == null} onClick={send}>
              Continue
            </AppButton>
            <AppButton fullWidth variant="ghost" onClick={() => goPlayer()}>
              Skip
            </AppButton>
          </>
        }
      >
        <FeelSlider value={rating} onChange={setRating} />
        <FeelNoteField value={note} onChange={setNote} />
      </FeelCheckInPane>
    </ListenerFrame>
  );
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

  const beforeEntry = feedback.find((f) => f.sessionId === sessionId && f.phase === "before");

  function finishToHome() {
    navigate(HOME_PATH, { replace: true });
  }

  if (role !== "listener" || !user) return <Navigate to="/app/listener" replace />;

  const mode = session?.mode || modeFromNeurotype(neurotypeId);
  const greetingName =
    listenerGreetingName(user) || onboardingPrefs?.preferredName?.trim() || null;

  function send() {
    if (!session || rating == null) return;
    submitFeedback({
      sessionId: session.id,
      rating,
      note,
      at: Date.now(),
      phase: "after",
      ...(beforeEntry?.pairId ? { pairId: beforeEntry.pairId } : {}),
    });
    setSent(true);
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
        actions={
          <>
            <AppButton fullWidth disabled={rating == null} onClick={send}>
              Continue
            </AppButton>
            <AppButton fullWidth variant="ghost" onClick={finishToHome}>
              Skip
            </AppButton>
          </>
        }
      >
        <FeelSlider value={rating} onChange={setRating} />
        <FeelNoteField value={note} onChange={setNote} />
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
