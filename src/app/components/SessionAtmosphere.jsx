/**
 * Flat dark surfaces for session detail / player - no gradient blobs.
 */

const DARK_BG = "#141414";

export function sessionAtmosphere(_mode = "regulation", _surface = "detail") {
  return DARK_BG;
}

export function GrainOverlay({ opacity = 0.35, className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "128px 128px",
        mixBlendMode: "overlay",
      }}
      aria-hidden
    />
  );
}

export function formatPlayTime(progressPct, durationMin) {
  const totalSec = Math.max(1, Math.round(durationMin * 60));
  const elapsed = Math.min(totalSec, Math.round((progressPct / 100) * totalSec));
  const m = Math.floor(elapsed / 60);
  const s = elapsed % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

const DEFAULT_BEFORE = ["Use headphones", "Get comfortable", "Give yourself a few uninterrupted minutes"];

/** Category label for metadata - e.g. REST · 22 MIN */
export function sessionCategoryLabel(session) {
  return (session.category || session.useCase || "Session").toUpperCase();
}

export function sessionHeadline(session) {
  return session.headline ?? session.summary ?? session.title;
}

export function sessionDescription(session) {
  return session.description ?? session.about ?? "";
}

/** Max three intention chips - “This session may support” */
export function sessionSupportTags(session) {
  const tags = session.supportTags ?? session.benefits ?? [];
  return tags.slice(0, 3);
}

export function sessionBeforeYouBegin(session) {
  return session.beforeYouBegin ?? session.bestExperienced ?? DEFAULT_BEFORE;
}

/** @deprecated Prefer sessionDescription */
export function sessionAbout(session) {
  return sessionDescription(session);
}

/** @deprecated Benefits section removed from listener UI */
export function sessionBenefitLines(session) {
  return session.benefitLines ?? session.benefits ?? [];
}

/** @deprecated Prefer sessionBeforeYouBegin */
export function sessionBestExperienced(session) {
  return sessionBeforeYouBegin(session);
}
