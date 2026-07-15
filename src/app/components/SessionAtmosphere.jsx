/**
 * Monochrome atmospheric fields for session detail / player — matches hifi reference.
 */

const MODE_FIELDS = {
  care: {
    detail:
      "radial-gradient(90% 70% at 30% 20%, #6a6864 0%, transparent 55%), radial-gradient(80% 60% at 80% 70%, #3a3936 0%, transparent 50%), linear-gradient(165deg, #1a1917 0%, #0a0a09 100%)",
    player:
      "radial-gradient(70% 55% at 45% 35%, #5c5a56 0%, transparent 60%), radial-gradient(90% 70% at 70% 80%, #2e2d2b 0%, transparent 55%), linear-gradient(180deg, #1c1b19 0%, #090908 100%)",
    complete:
      "radial-gradient(70% 50% at 55% 40%, #4a4845 0%, transparent 55%), linear-gradient(180deg, #121110 0%, #050505 100%)",
  },
  regulation: {
    detail:
      "radial-gradient(85% 65% at 40% 25%, #5e6164 0%, transparent 55%), radial-gradient(75% 55% at 75% 75%, #2c3034 0%, transparent 50%), linear-gradient(165deg, #16181a 0%, #08090a 100%)",
    player:
      "radial-gradient(65% 50% at 50% 30%, #55585c 0%, transparent 58%), radial-gradient(85% 65% at 60% 85%, #1e2226 0%, transparent 50%), linear-gradient(180deg, #141618 0%, #070809 100%)",
    complete:
      "radial-gradient(65% 48% at 50% 42%, #3e4246 0%, transparent 55%), linear-gradient(180deg, #101214 0%, #050607 100%)",
  },
  performance: {
    detail:
      "radial-gradient(90% 70% at 35% 15%, #6e6a64 0%, transparent 55%), radial-gradient(80% 55% at 85% 65%, #3a3530 0%, transparent 50%), linear-gradient(165deg, #1c1916 0%, #0a0908 100%)",
    player:
      "radial-gradient(70% 55% at 40% 30%, #615c56 0%, transparent 58%), radial-gradient(90% 70% at 75% 80%, #2a2622 0%, transparent 50%), linear-gradient(180deg, #181614 0%, #080706 100%)",
    complete:
      "radial-gradient(70% 50% at 48% 40%, #4a4540 0%, transparent 55%), linear-gradient(180deg, #12100e 0%, #050403 100%)",
  },
};

export function sessionAtmosphere(mode = "regulation", surface = "detail") {
  const field = MODE_FIELDS[mode] ?? MODE_FIELDS.regulation;
  return field[surface] ?? field.detail;
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

const DEFAULT_BEST = ["Wearing headphones", "In a quiet space", "Without interruptions"];

export function sessionAbout(session) {
  return (
    session.about ??
    `A guided listening experience designed to ${session.summary?.toLowerCase()?.replace(/\.$/, "") ?? "support regulation"}. Sound is structured to help your nervous system settle as you listen.`
  );
}

export function sessionBenefitLines(session) {
  return session.benefitLines ?? session.benefits ?? [];
}

export function sessionBestExperienced(session) {
  return session.bestExperienced ?? DEFAULT_BEST;
}
