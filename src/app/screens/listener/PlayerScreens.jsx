import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { formatDuration, NEUROTYPE_OPTIONS } from "../../data/catalog.js";
import { useAppStore } from "../../context/AppStore.jsx";
import { ListenerFrame } from "../../components/ListenerFrame.jsx";
import { AppBody, AppButton, AppTitle } from "../../components/ui.jsx";
import {
  formatPlayTime,
  GrainOverlay,
  sessionAbout,
  sessionAtmosphere,
  sessionBenefitLines,
  sessionBestExperienced,
} from "../../components/SessionAtmosphere.jsx";

function modeFromNeurotype(neurotypeId) {
  return NEUROTYPE_OPTIONS.find((n) => n.id === neurotypeId)?.mode ?? "regulation";
}

const HOME_PATH = "/app/listener/home";

/** Demo playback pacing — ~5s real time per catalog minute (12min → ~60s). */
const DEMO_MS_PER_CATALOG_MIN = 5000;
const DEMO_TICK_MS = 500;
const DEMO_MIN_MS = 60000;

/**
 * Simulated secure player — progress is local only (no real audio extract).
 * Finish → brief complete state → feedback, then home.
 */
export function ListenerPlayer() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { role, user, getSession, recordListen, neurotypeId } = useAppStore();
  const session = getSession(sessionId);

  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const recordedRef = useRef(false);
  const feedbackTimerRef = useRef(null);

  useEffect(() => {
    if (!playing || finished) return undefined;
    const totalMs = Math.max(DEMO_MIN_MS, (session?.durationMin ?? 15) * DEMO_MS_PER_CATALOG_MIN);
    const step = 100 / (totalMs / DEMO_TICK_MS);
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
  }, [playing, finished, session?.durationMin]);

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

  // After completion, gently continue into feedback unless the listener exits first.
  useEffect(() => {
    if (!finished || !session) return undefined;
    feedbackTimerRef.current = window.setTimeout(() => {
      navigate(`/app/listener/feedback/${session.id}`, { replace: true });
    }, 2800);
    return () => {
      if (feedbackTimerRef.current) window.clearTimeout(feedbackTimerRef.current);
    };
  }, [finished, session, navigate]);

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

  function clearFeedbackTimer() {
    if (feedbackTimerRef.current) {
      window.clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = null;
    }
  }

  function goHome(recordPartial = false) {
    clearFeedbackTimer();
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

  function goFeedback() {
    clearFeedbackTimer();
    navigate(`/app/listener/feedback/${session.id}`, { replace: true });
  }

  function completeNow() {
    setInfoOpen(false);
    setProgress(100);
    setPlaying(false);
    setFinished(true);
  }

  function scrub(deltaPct) {
    setProgress((p) => Math.min(100, Math.max(0, p + deltaPct)));
  }

  function toggleInfo() {
    setInfoOpen((o) => !o);
  }

  if (finished) {
    return (
      <ListenerFrame mode={mode} hideTabBar bleed>
        <div className="relative flex h-full min-h-full flex-col text-white">
          <div
            className="absolute inset-0"
            style={{ background: sessionAtmosphere(mode, "complete") }}
            aria-hidden
          />
          <GrainOverlay opacity={0.4} />
          <button
            type="button"
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center text-white/70"
            aria-label="Close"
            onClick={() => goHome()}
          >
            <CloseIcon />
          </button>

          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8 text-center">
            <h1 className="text-[2rem] font-medium leading-tight tracking-[-0.03em]">Session complete</h1>
            <p className="mt-4 max-w-[28ch] text-[14px] leading-relaxed text-white/60">
              Take a moment to notice how you&apos;re feeling before continuing.
            </p>
            <button
              type="button"
              className="mt-10 rounded-full border border-white/20 px-6 py-2.5 text-[13px] text-white/85"
              onClick={goFeedback}
            >
              Continue
            </button>
          </div>

          <div className="relative z-10 px-8 pb-10">
            <div className="h-px w-full bg-white/15">
              <div className="h-full w-[32%] bg-white/70" />
            </div>
          </div>
        </div>
      </ListenerFrame>
    );
  }

  return (
    <ListenerFrame mode={mode} hideTabBar bleed>
      <div className="relative flex h-full min-h-full flex-col text-white">
        <div
          className="absolute inset-0"
          style={{ background: sessionAtmosphere(mode, "player") }}
          aria-hidden
        />
        <GrainOverlay opacity={0.38} />
        {/* Soft vertical wash — like the reference texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 18px,
              rgba(255,255,255,0.03) 18px,
              rgba(255,255,255,0.03) 19px
            )`,
          }}
          aria-hidden
        />

        <div className="relative z-10 flex items-start justify-between px-5 pt-5">
          <button
            type="button"
            className="min-w-0 pr-4 text-left"
            onClick={toggleInfo}
            aria-expanded={infoOpen}
            aria-controls="session-info-drawer"
          >
            <p className="truncate text-[14px] font-medium tracking-tight text-white/90">{session.title}</p>
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

          <div className="flex items-center justify-center gap-12">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center text-white/85"
              aria-label="Skip back"
              onClick={() => scrub(-8)}
            >
              <SkipIcon flip />
            </button>
            <button
              type="button"
              className="flex h-[52px] w-[52px] items-center justify-center"
              aria-label={playing ? "Pause" : "Play"}
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center text-white/85"
              aria-label="Skip forward"
              onClick={() => scrub(8)}
            >
              <SkipIcon />
            </button>
          </div>
        </div>

        <SessionInfoDrawer
          open={infoOpen}
          session={session}
          onClose={() => setInfoOpen(false)}
          onSkipToEnd={completeNow}
        />
      </div>
    </ListenerFrame>
  );
}

function SessionInfoDrawer({ open, session, onClose, onSkipToEnd }) {
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
        className={`relative flex max-h-[72%] flex-col rounded-t-[1.5rem] border-t border-white/10 bg-[#161512]/96 text-white shadow-[0_-20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
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
              <p className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                {session.useCase} · {formatDuration(session.durationMin)}
              </p>
              <h2 className="mt-1 text-[1.35rem] font-medium tracking-[-0.02em] text-white">
                {session.title}
              </h2>
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
          <DrawerSection label="About this session">
            <p className="text-[13px] leading-relaxed text-white/65">{sessionAbout(session)}</p>
          </DrawerSection>

          <DrawerSection label="Benefits">
            <ul className="space-y-2">
              {sessionBenefitLines(session).map((line) => (
                <li key={line} className="flex gap-2.5 text-[13px] leading-snug text-white/65">
                  <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-white/40" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </DrawerSection>

          <DrawerSection label="Best experienced">
            <ul className="space-y-2">
              {sessionBestExperienced(session).map((item) => (
                <li key={item} className="flex gap-2.5 text-[13px] leading-snug text-white/65">
                  <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-white/40" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </DrawerSection>

          <button
            type="button"
            className="mt-6 w-full rounded-full border border-white/15 px-4 py-2.5 text-[12px] text-white/55"
            onClick={onSkipToEnd}
          >
            Skip to end (demo)
          </button>
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

function SkipIcon({ flip }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M7 5v12M16 5l-7 6 7 6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

export function ListenerFeedback() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { role, user, getSession, submitFeedback, neurotypeId } = useAppStore();
  const session = getSession(sessionId);
  const [rating, setRating] = useState(null);
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!sent) return undefined;
    const id = window.setTimeout(() => {
      navigate(HOME_PATH, { replace: true });
    }, 1400);
    return () => window.clearTimeout(id);
  }, [sent, navigate]);

  if (role !== "listener" || !user) return <Navigate to="/app/listener" replace />;

  const mode = session?.mode || modeFromNeurotype(neurotypeId);

  function goHome() {
    navigate(HOME_PATH, { replace: true });
  }

  function send() {
    if (!session || rating == null) return;
    submitFeedback({
      sessionId: session.id,
      rating,
      note,
      at: Date.now(),
    });
    setSent(true);
  }

  return (
    <ListenerFrame mode={mode} hideTabBar>
      <div className="flex flex-1 flex-col pb-6 pt-4">
        <AppTitle className="mt-2">How do you feel now?</AppTitle>
        <AppBody className="mt-3">
          {session
            ? `A quick check-in after ${session.title}. You can skip this anytime.`
            : "A quick check-in. You can skip this anytime."}
        </AppBody>

        {sent ? (
          <div className="mt-12">
            <AppTitle className="text-[1.35rem]">Thank you</AppTitle>
            <AppBody className="mt-3">Taking you home…</AppBody>
            <AppButton className="mt-10" fullWidth onClick={goHome}>
              Back to Home
            </AppButton>
          </div>
        ) : (
          <>
            <div className="mt-10 flex justify-between gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border text-[15px] font-medium"
                  style={{
                    borderColor: rating === n ? "var(--proto-text)" : "var(--proto-border)",
                    background: rating === n ? "var(--proto-text)" : "transparent",
                    color: rating === n ? "var(--proto-bg)" : "var(--proto-text)",
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
            <p className="mt-2 text-center text-[11px]" style={{ color: "var(--proto-text-muted)" }}>
              1 unsettled · 5 settled
            </p>

            <label className="mt-8 block">
              <span className="text-[13px]" style={{ color: "var(--proto-text-muted)" }}>
                Note (optional)
              </span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="mt-2 w-full resize-none rounded-xl border px-3.5 py-3 text-[14px] outline-none"
                style={{
                  borderColor: "var(--proto-border)",
                  background: "var(--proto-surface)",
                  color: "var(--proto-text)",
                }}
                placeholder="Anything worth noting…"
              />
            </label>

            <div className="mt-auto space-y-3 pt-10">
              <AppButton fullWidth disabled={rating == null} onClick={send}>
                Submit
              </AppButton>
              <AppButton fullWidth variant="ghost" onClick={goHome}>
                Skip
              </AppButton>
            </div>
          </>
        )}
      </div>
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
    favoriteIds,
    feedback,
    logout,
    partners,
    setNeurotype,
    appearance,
    setAppearance,
  } = useAppStore();

  if (role !== "listener" || !user) return <Navigate to="/app/listener" replace />;

  const mode = modeFromNeurotype(neurotypeId);
  const partner = partners.find((p) => p.id === user.partnerId);
  const completed = listenHistory.filter((h) => h.progressPct >= 90).length;

  return (
    <ListenerFrame
      mode={mode}
      activeTab="profile"
    >
      <div className="pb-6 pt-2">
        <AppTitle className="text-[1.5rem]">{user.name}</AppTitle>
        <AppBody className="mt-2">
          {user.email}
          <br />
          {partner?.name}
        </AppBody>

        <dl className="mt-8 grid grid-cols-3 gap-2">
          {[
            { label: "Completed", value: completed },
            { label: "Saved", value: favoriteIds.length },
            { label: "Check-ins", value: feedback.length },
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
          <div
            className="flex rounded-xl border p-1"
            style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface)" }}
          >
            {[
              { id: "light", label: "Light" },
              { id: "dark", label: "Dark" },
            ].map((opt) => {
              const on = appearance === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setAppearance(opt.id)}
                  className="flex-1 rounded-lg py-2.5 text-[13px] font-medium transition-colors"
                  style={{
                    background: on ? "var(--proto-text)" : "transparent",
                    color: on ? "var(--proto-bg)" : "var(--proto-text-muted)",
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 space-y-2">
          <p className="text-[14px] font-medium" style={{ color: "var(--proto-text)" }}>
            Listening preference
          </p>
          {NEUROTYPE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setNeurotype(opt.id)}
              className="w-full rounded-xl border px-3 py-2.5 text-left text-[13px]"
              style={{
                borderColor: neurotypeId === opt.id ? "var(--proto-text)" : "var(--proto-border)",
                color: "var(--proto-text)",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-2">
          <AppButton fullWidth variant="secondary" onClick={() => navigate("/app/listener/organisation")}>
            Organisation
          </AppButton>
          <AppButton fullWidth variant="secondary" onClick={() => navigate("/app/listener/favorites")}>
            Favorites
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
            Demo note: this is a working product shell — support messages aren’t sent.
          </p>
        </div>
        <AppButton className="mt-8" fullWidth variant="secondary" onClick={() => navigate("/app/listener/profile")}>
          Back to profile
        </AppButton>
      </div>
    </ListenerFrame>
  );
}
