import { EXAMPLE_SESSIONS, SESSION_CATEGORIES, getSessionGradient } from "../../shared/sessionArtwork.js";

function ArtworkTile({ session }) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="relative aspect-square overflow-hidden rounded-xl"
        style={{ background: getSessionGradient(session) }}
      >
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 30% 30%, white 0%, transparent 50%)" }} aria-hidden />
        <div className="absolute bottom-0 left-0 right-0 p-2">
          <p className="text-[8px] font-medium leading-tight text-white/95">{session.title}</p>
        </div>
      </div>
      <p className="text-[7px] uppercase tracking-wider text-white/50">{SESSION_CATEGORIES[session.category].label}</p>
    </div>
  );
}

export default function SessionArtworkGrid() {
  const byCategory = Object.keys(SESSION_CATEGORIES).map((catId) => ({
    ...SESSION_CATEGORIES[catId],
    sessions: EXAMPLE_SESSIONS.filter((s) => s.category === catId),
  }));

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#141218] p-3">
      <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.12em] text-white/50">
        Session artwork system
      </p>
      {byCategory.map((cat) => (
        <div key={cat.id} className="mb-3">
          <p className="mb-1.5 text-[8px] font-semibold uppercase tracking-wider text-white/70">{cat.label}</p>
          <p className="mb-2 text-[7px] text-white/40">{cat.description}</p>
          <div className="grid grid-cols-4 gap-1.5">
            {cat.sessions.map((s) => (
              <ArtworkTile key={s.id} session={s} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
