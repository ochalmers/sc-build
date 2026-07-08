import { AppTabBar } from "../../../shared/AppTabBar.jsx";
import { GrainOverlay } from "../../../shared/GrainOverlay.jsx";
import { PlayerControls, ProgressBar } from "../../../shared/PlayerControls.jsx";
import {
  DARK_BG,
  DARK_MUTED,
  DARK_TEXT,
  EmptyState,
  LIGHT_BG,
  LIGHT_TEXT,
  LoadingShimmer,
  PrimaryButton,
  ScreenHeader,
  SessionCard,
  StatusBadge,
} from "../../shared/Phase1UI.jsx";
import { EXAMPLE_SESSIONS, getSessionGradient } from "../../shared/sessionArtwork.js";

function LibraryContent({ variant = "default", theme = "dark", onSelectSession }) {
  const isDark = theme === "dark";
  const sessions = EXAMPLE_SESSIONS.slice(0, 4);

  if (variant === "empty") {
    return (
      <EmptyState
        dark={isDark}
        icon="◎"
        title="No sessions yet"
        message="Sessions assigned by your Partner will appear here."
      />
    );
  }

  if (variant === "search") {
    return (
      <div className="flex flex-1 flex-col overflow-hidden p-3.5 pb-[74px]">
        <div
          className="mb-3 flex h-9 items-center rounded-xl px-3 text-[12px]"
          style={{
            background: isDark ? "rgba(255,255,255,0.08)" : "rgba(8,8,8,0.05)",
            color: isDark ? DARK_TEXT : LIGHT_TEXT,
          }}
        >
          calm
        </div>
        <p className="mb-2 text-[10px] uppercase tracking-wider" style={{ color: isDark ? DARK_MUTED : "#8D8D8D" }}>
          2 results
        </p>
        {sessions.slice(0, 2).map((s) => (
          <div key={s.id} className="mb-2">
            <SessionCard gradient={getSessionGradient(s)} title={s.title} duration={s.duration} />
          </div>
        ))}
      </div>
    );
  }

  const filtered = variant === "filtered" ? sessions.filter((s) => s.category === "regulation") : sessions;

  return (
    <div className="flex flex-1 flex-col gap-2 overflow-hidden p-3.5 pb-[74px]">
      {variant === "filtered" ? (
        <div className="mb-1 flex gap-2">
          <span
            className="rounded-full px-3 py-1 text-[10px]"
            style={{ background: isDark ? "rgba(255,255,255,0.12)" : "rgba(8,8,8,0.08)", color: isDark ? DARK_TEXT : LIGHT_TEXT }}
          >
            Regulation ×
          </span>
        </div>
      ) : null}
      {filtered.map((s) => (
        <button
          key={s.id}
          type="button"
          className="w-full text-left"
          onClick={onSelectSession}
        >
          <SessionCard gradient={getSessionGradient(s)} title={s.title} duration={s.duration} />
        </button>
      ))}
    </div>
  );
}

export function LibraryScreen({ variant = "default", theme = "dark", prototypeActions = {} }) {
  const isDark = theme === "dark";
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: isDark ? DARK_BG : LIGHT_BG }}>
      <div className="px-3.5 pb-2 pt-10">
        <h1 className="text-[22px] tracking-[-0.25px]" style={{ color: isDark ? DARK_TEXT : LIGHT_TEXT }}>
          Library
        </h1>
      </div>
      <LibraryContent variant={variant} theme={theme} onSelectSession={prototypeActions.onSelectSession} />
      <AppTabBar active="today" variant={isDark ? "dark" : "light"} />
    </div>
  );
}

const DETAIL_COPY =
  "A sound-based session designed to regulate your nervous system and ground your state. Blending sonic augmentation with breath pacing and calming textures.";

export function SessionDetailConcept({ variant = "available", theme = "dark", prototypeActions = {} }) {
  const isDark = theme === "dark";
  const session = EXAMPLE_SESSIONS.find((s) => s.id === "calm");
  const gradient = getSessionGradient(session);

  const badges = {
    available: null,
    downloaded: { label: "Downloaded", tone: "success" },
    assigned: { label: "Assigned", tone: "assigned" },
    removed: { label: "Removed", tone: "error" },
  };
  const badge = badges[variant];

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: isDark ? DARK_BG : LIGHT_BG }}>
      <div className="relative h-[52%] w-full overflow-hidden">
        <div className="absolute inset-0" style={{ background: gradient }} aria-hidden />
        {variant === "removed" ? (
          <div className="absolute inset-0 bg-black/50" aria-hidden />
        ) : null}
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? "linear-gradient(180deg, transparent 40%, rgba(32,30,42,0.95) 100%)"
              : "linear-gradient(180deg, transparent 40%, rgba(253,253,253,0.95) 100%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {variant !== "removed" ? (
            <button
              type="button"
              onClick={prototypeActions.onPlay}
              className="flex h-[68px] w-[68px] items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
              aria-label="Play"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M9 6.5v11l9-5.5-9-5.5z" fill="white" />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
      <div className="relative -mt-4 flex flex-col gap-2 overflow-hidden px-3.5 pb-[74px]">
        <div className="flex items-center gap-2">
          <h1 className="text-[24px] leading-none tracking-[-0.25px]" style={{ color: isDark ? DARK_TEXT : LIGHT_TEXT }}>
            Calm
          </h1>
          {badge ? <StatusBadge label={badge.label} tone={badge.tone} /> : null}
        </div>
        <p className="text-[10px] uppercase tracking-[0.5px]" style={{ color: isDark ? DARK_MUTED : "#8D8D8D" }}>
          10 min · Regulation
        </p>
        <p className="text-[11px] leading-relaxed" style={{ color: isDark ? DARK_MUTED : "#6E6D68" }}>
          {DETAIL_COPY}
        </p>
        {variant === "removed" ? (
          <p className="text-[11px] text-[#E07070]">This session is no longer available in your library.</p>
        ) : null}
      </div>
      <AppTabBar active="today" variant={isDark ? "dark" : "light"} />
    </div>
  );
}

export function PlayerConcept({ variant = "playing", theme = "dark", prototypeActions = {} }) {
  const isDark = theme === "dark";
  const session = EXAMPLE_SESSIONS.find((s) => s.id === "calm");
  const gradient = getSessionGradient(session);

  const isPlaying = variant === "playing";
  const isPaused = variant === "paused";
  const isComplete = variant === "completed";
  const isIdle = variant === "idle";
  const isBackground = variant === "background";

  if (isBackground) {
    return (
      <div className="relative h-full w-full overflow-hidden" style={{ background: DARK_BG }}>
        <div className="px-5 pt-14">
          <p className="text-[10px] uppercase tracking-wider text-white/50">Now playing</p>
          <p className="mt-1 text-[16px] font-medium text-white/90">Calm</p>
        </div>
        <div className="absolute inset-x-4 bottom-4 rounded-2xl p-4 backdrop-blur-md" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg" style={{ background: gradient }} />
            <div className="flex-1">
              <p className="text-[12px] text-white/90">Calm · 3:42 remaining</p>
              <div className="mt-1.5 h-0.5 rounded-full bg-white/20">
                <div className="h-full w-[45%] rounded-full bg-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0" style={{ background: gradient }} aria-hidden />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.45) 100%)" }}
        aria-hidden
      />
      <GrainOverlay opacity={0.35} />
      {!isDark ? (
        <div className="absolute inset-0 bg-white/10" aria-hidden />
      ) : null}
      <div className="absolute inset-x-0 top-12 px-6 text-center">
        <p className="text-[11px] uppercase tracking-wider text-white/60">Calm</p>
        {isComplete ? (
          <p className="mt-2 text-[18px] font-medium text-white">Session complete</p>
        ) : isIdle ? (
          <p className="mt-2 text-[14px] text-white/80">Ready to listen</p>
        ) : null}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 px-8 pb-10 pt-16 backdrop-blur-md" style={{ background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.35))" }}>
        {!isIdle ? <ProgressBar progress={isComplete ? 1 : 0.45} time={isComplete ? "10:00" : "4:32"} /> : null}
        {isIdle ? (
          <button
            type="button"
            onClick={prototypeActions.onPlay}
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/20"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M9 6.5v11l9-5.5-9-5.5z" fill="white" />
            </svg>
          </button>
        ) : (
          <button type="button" onClick={prototypeActions.onComplete} className="w-full">
            <PlayerControls />
          </button>
        )}
        {isPaused ? <p className="text-center text-[11px] text-white/60">Paused</p> : null}
      </div>
    </div>
  );
}

export function FavoritesScreen({ variant = "populated" }) {
  const sessions = EXAMPLE_SESSIONS.filter((s) => ["calm", "focus", "rest"].includes(s.id));

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: DARK_BG }}>
      <ScreenHeader title="Favorites" subtitle={variant === "empty" ? undefined : "Saved sessions"} />
      {variant === "empty" ? (
        <EmptyState dark icon="♡" title="No favorites yet" message="Tap the heart on any session to save it here." />
      ) : (
        <div className="space-y-2 px-3.5 pb-[74px] pt-2">
          {sessions.map((s) => (
            <SessionCard key={s.id} gradient={getSessionGradient(s)} title={s.title} duration={s.duration} compact />
          ))}
        </div>
      )}
      <AppTabBar active="profile" variant="dark" />
    </div>
  );
}

const STAR_ROW = [1, 2, 3, 4, 5];

export function FeedbackScreen({ variant = "rating", prototypeActions = {} }) {
  if (variant === "submitted") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center px-8 text-center" style={{ background: DARK_BG }}>
        <div className="text-3xl">✓</div>
        <p className="mt-4 text-[18px] font-medium" style={{ color: DARK_TEXT }}>
          Thank you
        </p>
        <p className="mt-2 text-[12px] leading-relaxed" style={{ color: DARK_MUTED }}>
          Your feedback helps us improve Sessions and the listening experience.
        </p>
        <div className="mt-8 w-full">
          <PrimaryButton variant="dark" onClick={prototypeActions.onDone}>
            Done
          </PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col" style={{ background: DARK_BG }}>
      <ScreenHeader
        title="How was your session?"
        subtitle={variant === "comment" ? "Add an optional comment." : "Rate your experience with Calm."}
      />
      <div className="mt-8 flex justify-center gap-2">
        {STAR_ROW.map((n) => (
          <span key={n} className="text-2xl" style={{ opacity: n <= 4 ? 1 : 0.35 }}>
            ★
          </span>
        ))}
      </div>
      {variant === "comment" ? (
        <div className="mx-5 mt-6 rounded-xl p-3 text-[12px]" style={{ background: "rgba(255,255,255,0.06)", color: DARK_MUTED, minHeight: 80 }}>
          Felt more grounded after listening…
        </div>
      ) : null}
      <div className="mt-auto space-y-3 px-5 pb-10">
        <PrimaryButton variant="dark" onClick={prototypeActions.onContinue}>
          {variant === "comment" ? "Submit" : "Continue"}
        </PrimaryButton>
        <button
          type="button"
          onClick={prototypeActions.onSkip}
          className="w-full text-center text-[12px]"
          style={{ color: DARK_MUTED }}
        >
          Skip
        </button>
      </div>
    </div>
  );
}

export function LibraryLoadingScreen() {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: DARK_BG }}>
      <div className="px-3.5 pt-10">
        <div className="h-6 w-24 animate-pulse rounded-md bg-white/10" />
      </div>
      <LoadingShimmer dark />
      <AppTabBar active="today" variant="dark" />
    </div>
  );
}

export function SessionDetailLoadingScreen() {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: DARK_BG }}>
      <div className="h-[52%] animate-pulse bg-white/10" />
      <div className="space-y-3 p-3.5">
        <div className="h-7 w-32 animate-pulse rounded-md bg-white/10" />
        <div className="h-3 w-full animate-pulse rounded bg-white/8" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-white/8" />
      </div>
    </div>
  );
}

export function PlayerLoadingScreen() {
  return (
    <div className="flex h-full w-full items-center justify-center" style={{ background: DARK_BG }}>
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white/70" />
    </div>
  );
}

export function ErrorStateScreen({ variant = "invite-invalid" }) {
  const configs = {
    "invite-invalid": {
      title: "Invalid invite",
      message: "This code isn't recognised. Check with your provider and try again.",
      action: "Try again",
    },
    network: {
      title: "Connection issue",
      message: "We couldn't reach Sonocea. Check your network and try again.",
      action: "Retry",
    },
    "session-unavailable": {
      title: "Session unavailable",
      message: "This session may have been removed or your access has changed.",
      action: "Back to library",
    },
  };
  const cfg = configs[variant] ?? configs["invite-invalid"];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 text-center" style={{ background: DARK_BG }}>
      <div className="text-2xl opacity-60">!</div>
      <p className="mt-4 text-[17px] font-medium" style={{ color: DARK_TEXT }}>
        {cfg.title}
      </p>
      <p className="mt-2 text-[12px] leading-relaxed" style={{ color: DARK_MUTED }}>
        {cfg.message}
      </p>
      <div className="mt-8 w-full">
        <PrimaryButton variant="dark">{cfg.action}</PrimaryButton>
      </div>
    </div>
  );
}

export function SuccessStateScreen({ variant = "invite-redeemed" }) {
  const configs = {
    "invite-redeemed": { title: "Access granted", message: "Welcome to Sonocea. Let's set up your profile." },
    "profile-completed": { title: "Profile saved", message: "Your recommendations are ready." },
    "session-completed": { title: "Session complete", message: "Nice work. How did it feel?" },
    "feedback-submitted": { title: "Feedback sent", message: "Thank you for helping us improve." },
  };
  const cfg = configs[variant] ?? configs["invite-redeemed"];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 text-center" style={{ background: DARK_BG }}>
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-xl text-[#6BBF8A]">✓</div>
      <p className="mt-5 text-[18px] font-medium" style={{ color: DARK_TEXT }}>
        {cfg.title}
      </p>
      <p className="mt-2 text-[12px] leading-relaxed" style={{ color: DARK_MUTED }}>
        {cfg.message}
      </p>
      <div className="mt-8 w-full">
        <PrimaryButton variant="dark">Continue</PrimaryButton>
      </div>
    </div>
  );
}
