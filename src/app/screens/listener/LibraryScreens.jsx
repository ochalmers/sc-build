import { Navigate, useNavigate, useParams } from "react-router-dom";
import { formatDuration, NEUROTYPE_OPTIONS } from "../../data/catalog.js";
import { useAppStore } from "../../context/AppStore.jsx";
import { ListenerFrame } from "../../components/ListenerFrame.jsx";
import { AppBody, AppButton, AppTitle } from "../../components/ui.jsx";
import {
  GrainOverlay,
  sessionAbout,
  sessionAtmosphere,
  sessionBenefitLines,
  sessionBestExperienced,
} from "../../components/SessionAtmosphere.jsx";
import { IconPlay } from "../../../system/components/SampleIcons.jsx";
import { LISTENER_MVP_NAV } from "../../../content/flows.js";

function useListenerGate() {
  const store = useAppStore();
  const { role, user, onboardingComplete, neurotypeId } = store;
  if (role !== "listener" || !user) return { redirect: "/app/listener", store };
  if (!onboardingComplete) return { redirect: "/app/listener/onboarding", store };
  if (!neurotypeId) return { redirect: "/app/listener/neurotype", store };
  return { redirect: null, store };
}

function modeFromNeurotype(neurotypeId) {
  return NEUROTYPE_OPTIONS.find((n) => n.id === neurotypeId)?.mode ?? "regulation";
}

function useTabNavigate() {
  const navigate = useNavigate();
  return (id) => {
    const tab = LISTENER_MVP_NAV.find((t) => t.id === id);
    if (tab) navigate(tab.path);
  };
}

function SessionRow({ session, onOpen, meta, right }) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left"
      style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface)" }}
      onClick={onOpen}
    >
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-medium tracking-tight" style={{ color: "var(--proto-text)" }}>
          {session.title}
        </p>
        <p className="mt-1 text-[12px]" style={{ color: "var(--proto-text-muted)" }}>
          {meta ?? `${formatDuration(session.durationMin)} · ${session.useCase}`}
        </p>
      </div>
      {right ?? (
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
          style={{ borderColor: "var(--proto-border)", color: "var(--proto-text)" }}
        >
          <IconPlay className="h-3.5 w-3.5" />
        </span>
      )}
    </button>
  );
}

/** 03 · Home — personalised programme overview */
export function ListenerHome() {
  const navigate = useNavigate();
  const onTabChange = useTabNavigate();
  const { redirect, store } = useListenerGate();
  if (redirect) return <Navigate to={redirect} replace />;

  const { library, listenHistory, neurotypeId, user, partners, feedback } = store;
  const mode = modeFromNeurotype(neurotypeId);
  const partner = partners.find((p) => p.id === user.partnerId);
  const completedIds = new Set(
    listenHistory.filter((h) => h.progressPct >= 90).map((h) => h.sessionId),
  );
  const incomplete = library.filter((s) => !completedIds.has(s.id));
  const continueSession =
    listenHistory.find((h) => h.progressPct > 0 && h.progressPct < 90) ?? null;
  const continueFromCatalog = continueSession
    ? library.find((s) => s.id === continueSession.sessionId)
    : null;
  const recommended = incomplete[0] ?? library[0];
  const pct = library.length
    ? Math.round((completedIds.size / library.length) * 100)
    : 0;
  const recent = listenHistory.slice(0, 3);

  return (
    <ListenerFrame mode={mode} activeTab="home" onTabChange={onTabChange}>
      <div className="pb-4 pt-2">
        <AppTitle className="text-[1.5rem]">
          {user?.name ? `Hi, ${user.name.split(" ")[0]}` : "Home"}
        </AppTitle>
        <AppBody className="mt-2">
          {partner?.name
            ? `Sessions from ${partner.name}`
            : "Your sessions, ready when you are."}
        </AppBody>

        {continueFromCatalog ? (
          <div
            className="mt-8 rounded-2xl border p-4"
            style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface)" }}
          >
            <p className="text-[13px] font-medium" style={{ color: "var(--proto-text-muted)" }}>
              Pick up where you left off
            </p>
            <p className="mt-2 text-[17px] font-medium" style={{ color: "var(--proto-text)" }}>
              {continueFromCatalog.title}
            </p>
            <p className="mt-1 text-[12px]" style={{ color: "var(--proto-text-muted)" }}>
              {Math.round(continueSession.progressPct)}% · {formatDuration(continueFromCatalog.durationMin)}
            </p>
            <AppButton
              className="mt-4"
              fullWidth
              onClick={() => navigate(`/app/listener/player/${continueFromCatalog.id}`)}
            >
              Resume
            </AppButton>
          </div>
        ) : null}

        {recommended ? (
          <div
            className="mt-4 rounded-2xl border p-4"
            style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface)" }}
          >
            <p className="text-[13px] font-medium" style={{ color: "var(--proto-text-muted)" }}>
              Suggested next
            </p>
            <p className="mt-2 text-[17px] font-medium" style={{ color: "var(--proto-text)" }}>
              {recommended.title}
            </p>
            <p className="mt-1 text-[12px]" style={{ color: "var(--proto-text-muted)" }}>
              {formatDuration(recommended.durationMin)} · {recommended.useCase}
            </p>
            <AppButton
              className="mt-4"
              fullWidth
              variant="secondary"
              onClick={() => navigate(`/app/listener/session/${recommended.id}`)}
            >
              Open session
            </AppButton>
          </div>
        ) : null}

        <button
          type="button"
          className="mt-4 w-full rounded-2xl border p-4 text-left"
          style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface)" }}
          onClick={() => navigate("/app/listener/progress")}
        >
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-medium" style={{ color: "var(--proto-text-muted)" }}>
              Progress
            </p>
            <p className="text-[12px]" style={{ color: "var(--proto-text)" }}>
              {completedIds.size} / {library.length}
            </p>
          </div>
          <div
            className="mt-3 h-1.5 overflow-hidden rounded-full"
            style={{ background: "var(--proto-bg)" }}
          >
            <div
              className="h-full rounded-full"
              style={{ width: `${pct}%`, background: "var(--proto-text)" }}
            />
          </div>
        </button>

        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[14px] font-medium" style={{ color: "var(--proto-text)" }}>
              Your sessions
            </p>
            <button
              type="button"
              className="text-[12px]"
              style={{ color: "var(--proto-text-muted)" }}
              onClick={() => navigate("/app/listener/assigned")}
            >
              View all
            </button>
          </div>
          <div className="space-y-2">
            {library.slice(0, 3).map((session) => (
              <SessionRow
                key={session.id}
                session={session}
                onOpen={() => navigate(`/app/listener/session/${session.id}`)}
                meta={
                  completedIds.has(session.id)
                    ? `${formatDuration(session.durationMin)} · Completed`
                    : `${formatDuration(session.durationMin)} · ${session.useCase}`
                }
              />
            ))}
          </div>
        </div>

        {recent.length > 0 ? (
          <div className="mt-8">
            <p className="mb-3 text-[14px] font-medium" style={{ color: "var(--proto-text)" }}>
              Recently listened
            </p>
            <div className="space-y-2">
              {recent.map((entry) => {
                const session = library.find((s) => s.id === entry.sessionId);
                if (!session) return null;
                const note = feedback.find((f) => f.sessionId === session.id);
                return (
                  <SessionRow
                    key={`${entry.sessionId}-${entry.completedAt}`}
                    session={session}
                    onOpen={() => navigate(`/app/listener/session/${session.id}`)}
                    meta={
                      entry.progressPct >= 90
                        ? `Completed${note ? ` · Rated ${note.rating}` : ""}`
                        : `${Math.round(entry.progressPct)}% listened`
                    }
                    right={<span />}
                  />
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </ListenerFrame>
  );
}

/** 04 · Assigned Programme */
export function ListenerAssigned() {
  const navigate = useNavigate();
  const onTabChange = useTabNavigate();
  const { redirect, store } = useListenerGate();
  if (redirect) return <Navigate to={redirect} replace />;

  const { library, listenHistory, favoriteIds, toggleFavorite, neurotypeId, user, partners } = store;
  const mode = modeFromNeurotype(neurotypeId);
  const partner = partners.find((p) => p.id === user.partnerId);
  const completedIds = new Set(
    listenHistory.filter((h) => h.progressPct >= 90).map((h) => h.sessionId),
  );
  const inProgressIds = new Set(
    listenHistory.filter((h) => h.progressPct > 0 && h.progressPct < 90).map((h) => h.sessionId),
  );
  const completed = library.filter((s) => completedIds.has(s.id));
  const current = library
    .filter((s) => inProgressIds.has(s.id) || (!completedIds.has(s.id) && !inProgressIds.has(s.id)))
    .slice(0, Math.ceil(library.length / 2));
  const usedCurrent = new Set(
    (current.length ? current : library.filter((s) => !completedIds.has(s.id)).slice(0, 2)).map(
      (s) => s.id,
    ),
  );
  const sections = [
    {
      title: "Current",
      items: current.length ? current : library.filter((s) => !completedIds.has(s.id)).slice(0, 2),
    },
    {
      title: "Upcoming",
      items: library.filter((s) => !completedIds.has(s.id) && !usedCurrent.has(s.id)),
    },
    { title: "Completed", items: completed },
  ];

  return (
    <ListenerFrame mode={mode} activeTab="home" onTabChange={onTabChange}>
      <div className="pb-4 pt-2">
        <AppTitle className="text-[1.5rem]">Your sessions</AppTitle>
        <AppBody className="mt-2">
          {partner?.name
            ? `From ${partner.name} · ${library.length} total`
            : `${library.length} sessions assigned to you`}
        </AppBody>

        <div className="mt-8 space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <p className="mb-3 text-[14px] font-medium" style={{ color: "var(--proto-text)" }}>
                {section.title}
              </p>
              {section.items.length === 0 ? (
                <p className="text-[13px]" style={{ color: "var(--proto-text-muted)" }}>
                  Nothing here yet
                </p>
              ) : (
                <div className="space-y-2">
                  {section.items.map((session) => {
                    const fav = favoriteIds.includes(session.id);
                    return (
                      <article
                        key={session.id}
                        className="overflow-hidden rounded-2xl border"
                        style={{
                          borderColor: "var(--proto-border)",
                          background: "var(--proto-surface)",
                        }}
                      >
                        <button
                          type="button"
                          className="w-full p-4 text-left"
                          onClick={() => navigate(`/app/listener/session/${session.id}`)}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p
                                className="text-[12px]"
                                style={{ color: "var(--proto-text-muted)" }}
                              >
                                {session.useCase} · {formatDuration(session.durationMin)}
                              </p>
                              <p
                                className="mt-1.5 text-[17px] font-medium tracking-tight"
                                style={{ color: "var(--proto-text)" }}
                              >
                                {session.title}
                              </p>
                              <p
                                className="mt-2 text-[13px] leading-snug"
                                style={{ color: "var(--proto-text-muted)" }}
                              >
                                {session.summary}
                              </p>
                            </div>
                            <span
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border"
                              style={{
                                borderColor: "var(--proto-border)",
                                color: "var(--proto-text)",
                              }}
                            >
                              <IconPlay className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </button>
                        <div
                          className="flex gap-2 border-t px-4 py-2.5"
                          style={{ borderColor: "var(--proto-border)" }}
                        >
                          {(session.benefits ?? []).slice(0, 2).map((b) => (
                            <span
                              key={b}
                              className="rounded-full px-2.5 py-1 text-[11px]"
                              style={{
                                background: "var(--proto-bg)",
                                color: "var(--proto-text-muted)",
                              }}
                            >
                              {b}
                            </span>
                          ))}
                          <button
                            type="button"
                            className="ml-auto text-[12px]"
                            style={{
                              color: fav ? "var(--proto-accent)" : "var(--proto-text-muted)",
                            }}
                            onClick={() => toggleFavorite(session.id)}
                          >
                            {fav ? "Saved" : "Save"}
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </ListenerFrame>
  );
}

/** Backwards-compatible alias */
export function ListenerLibrary() {
  return <Navigate to="/app/listener/assigned" replace />;
}

/** 08 · Progress */
export function ListenerProgress() {
  const navigate = useNavigate();
  const onTabChange = useTabNavigate();
  const { redirect, store } = useListenerGate();
  if (redirect) return <Navigate to={redirect} replace />;

  const { library, listenHistory, feedback, neurotypeId, user, partners } = store;
  const mode = modeFromNeurotype(neurotypeId);
  const partner = partners.find((p) => p.id === user.partnerId);
  const completed = listenHistory.filter((h) => h.progressPct >= 90);
  const completedIds = new Set(completed.map((h) => h.sessionId));
  const pct = library.length
    ? Math.round((completedIds.size / library.length) * 100)
    : 0;
  const isComplete = library.length > 0 && completedIds.size >= library.length;

  return (
    <ListenerFrame mode={mode} activeTab="home" onTabChange={onTabChange}>
      <div className="pb-4 pt-2">
        <AppTitle className="text-[1.5rem]">Your progress</AppTitle>
        <AppBody className="mt-2">
          {partner?.name
            ? `Through your programme with ${partner.name}`
            : "How you’re getting on with your sessions"}
        </AppBody>

        <div
          className="mt-8 rounded-2xl border p-4"
          style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface)" }}
        >
          {isComplete ? (
            <>
              <p className="text-[17px] font-medium" style={{ color: "var(--proto-text)" }}>
                You’re all done
              </p>
              <p className="mt-2 text-[13px]" style={{ color: "var(--proto-text-muted)" }}>
                You’ve finished every session. Your organisation may add more over time.
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-[17px] font-medium" style={{ color: "var(--proto-text)" }}>
                  {completedIds.size} of {library.length} sessions
                </p>
                <p className="text-[13px]" style={{ color: "var(--proto-text-muted)" }}>
                  {pct}%
                </p>
              </div>
              <div
                className="mt-3 h-1.5 overflow-hidden rounded-full"
                style={{ background: "var(--proto-bg)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, background: "var(--proto-text)" }}
                />
              </div>
            </>
          )}
        </div>

        <div className="mt-8">
          <p className="mb-3 text-[14px] font-medium" style={{ color: "var(--proto-text)" }}>
            Listening history
          </p>
          {listenHistory.length === 0 ? (
            <p className="text-[13px]" style={{ color: "var(--proto-text-muted)" }}>
              Finish a session and it’ll show up here.
            </p>
          ) : (
            <div className="space-y-2">
              {listenHistory.slice(0, 8).map((entry) => {
                const session = library.find((s) => s.id === entry.sessionId);
                if (!session) return null;
                return (
                  <SessionRow
                    key={`${entry.sessionId}-${entry.completedAt}`}
                    session={session}
                    onOpen={() => navigate(`/app/listener/session/${session.id}`)}
                    meta={
                      entry.progressPct >= 90
                        ? `Completed · ${formatDuration(session.durationMin)}`
                        : `${Math.round(entry.progressPct)}% · ${formatDuration(session.durationMin)}`
                    }
                  />
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-8">
          <p className="mb-3 text-[14px] font-medium" style={{ color: "var(--proto-text)" }}>
            Check-ins
          </p>
          {feedback.length === 0 ? (
            <p className="text-[13px]" style={{ color: "var(--proto-text-muted)" }}>
              After a session, you can leave a short note on how you feel.
            </p>
          ) : (
            <div className="space-y-2">
              {feedback.slice(0, 6).map((f) => {
                const session = library.find((s) => s.id === f.sessionId);
                return (
                  <div
                    key={`${f.sessionId}-${f.at}`}
                    className="rounded-2xl border p-3.5"
                    style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface)" }}
                  >
                    <p className="text-[15px] font-medium" style={{ color: "var(--proto-text)" }}>
                      {session?.title ?? "Session"}
                    </p>
                    <p className="mt-1 text-[12px]" style={{ color: "var(--proto-text-muted)" }}>
                      Rated {f.rating}
                      {f.note ? ` · ${f.note}` : ""}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </ListenerFrame>
  );
}

/** 09 · Organisation */
export function ListenerOrganisation() {
  const navigate = useNavigate();
  const { redirect, store } = useListenerGate();
  if (redirect) return <Navigate to={redirect} replace />;

  const { neurotypeId, user, partners, library } = store;
  const mode = modeFromNeurotype(neurotypeId);
  const partner = partners.find((p) => p.id === user.partnerId);

  return (
    <ListenerFrame mode={mode} hideTabBar>
      <div className="pb-6 pt-2">
        <button
          type="button"
          className="text-[12px]"
          style={{ color: "var(--proto-text-muted)" }}
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
        <AppTitle className="mt-6">{partner?.name ?? "Your organisation"}</AppTitle>
        <AppBody className="mt-4">
          {partner?.programme ??
            "Your organisation has shared a set of listening sessions to support you."}
        </AppBody>

        <div className="mt-8 space-y-3">
          {[
            {
              title: "About this programme",
              body: `${library.length} sessions chosen for you as part of your organisation’s plan.`,
            },
            {
              title: "What it’s for",
              body: "Help you settle, recover, and build a steadier listening habit.",
            },
            {
              title: "Need help?",
              body: "For programme questions, ask your organisation. For app issues, use Support.",
            },
          ].map((row) => (
            <div
              key={row.title}
              className="rounded-2xl border p-4"
              style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface)" }}
            >
              <p className="text-[15px] font-medium" style={{ color: "var(--proto-text)" }}>
                {row.title}
              </p>
              <p className="mt-2 text-[13px] leading-snug" style={{ color: "var(--proto-text-muted)" }}>
                {row.body}
              </p>
            </div>
          ))}
        </div>

        <AppButton
          className="mt-8"
          fullWidth
          variant="secondary"
          onClick={() => navigate("/app/listener/support")}
        >
          Contact support
        </AppButton>
      </div>
    </ListenerFrame>
  );
}

export function ListenerSessionDetail() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { redirect, store } = useListenerGate();
  if (redirect) return <Navigate to={redirect} replace />;

  const { getSession, favoriteIds, toggleFavorite, neurotypeId } = store;
  const session = getSession(sessionId);
  const mode = modeFromNeurotype(neurotypeId);

  if (!session) {
    return (
      <ListenerFrame mode={mode} hideTabBar>
        <AppTitle className="mt-8">Session unavailable</AppTitle>
        <AppBody className="mt-3">This session isn’t in your assigned programme.</AppBody>
        <AppButton className="mt-8" onClick={() => navigate("/app/listener/assigned")}>
          Back to assigned
        </AppButton>
      </ListenerFrame>
    );
  }

  const fav = favoriteIds.includes(session.id);
  const sessionMode = session.mode || mode;

  return (
    <ListenerFrame mode={sessionMode} hideTabBar bleed>
      <div className="flex h-full min-h-full flex-col bg-[#f5f4f0]">
        <div className="relative h-[42%] min-h-[280px] shrink-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{ background: sessionAtmosphere(sessionMode, "detail") }}
            aria-hidden
          />
          <GrainOverlay opacity={0.32} />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 35%, rgba(245,244,240,0.15) 75%, #f5f4f0 100%)",
            }}
            aria-hidden
          />

          <button
            type="button"
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center text-white/80"
            aria-label="Close"
            onClick={() => navigate("/app/listener/assigned")}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>

          <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-6 pt-16">
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/50">
              {session.useCase} · {formatDuration(session.durationMin)}
            </p>
            <h1 className="mt-2 text-[2rem] font-medium leading-[1.05] tracking-[-0.03em] text-white">
              {session.title}
            </h1>
          </div>
        </div>

        <div className="relative z-10 flex flex-1 flex-col px-5 pb-6 pt-1">
          <DetailSection label="About this session">
            <p className="text-[14px] leading-relaxed text-[#2a2a28]">{sessionAbout(session)}</p>
          </DetailSection>

          <DetailSection label="Benefits">
            <ul className="space-y-2">
              {sessionBenefitLines(session).map((b) => (
                <li key={b} className="flex gap-2.5 text-[14px] leading-snug text-[#2a2a28]">
                  <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[#2a2a28]/40" aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </DetailSection>

          <DetailSection label="Best experienced">
            <ul className="space-y-2">
              {sessionBestExperienced(session).map((item) => (
                <li key={item} className="flex gap-2.5 text-[14px] leading-snug text-[#2a2a28]">
                  <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[#2a2a28]/40" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </DetailSection>

          <div className="mt-auto space-y-3 pt-8">
            <button
              type="button"
              className="w-full rounded-full bg-[#111110] px-5 py-3.5 text-[14px] font-medium tracking-tight text-white"
              onClick={() => navigate(`/app/listener/player/${session.id}`)}
            >
              Start Session
            </button>
            <button
              type="button"
              className="w-full rounded-full px-5 py-3 text-[13px] tracking-tight text-[#6a6864]"
              onClick={() => toggleFavorite(session.id)}
            >
              {fav ? "Remove from favorites" : "Save to favorites"}
            </button>
          </div>
        </div>
      </div>
    </ListenerFrame>
  );
}

function DetailSection({ label, children }) {
  return (
    <section className="mt-5 first:mt-2">
      <div className="border-b border-[#ddd9d0] pb-1.5">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#9a9690]">{label}</p>
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function ListenerFavorites() {
  const navigate = useNavigate();
  const onTabChange = useTabNavigate();
  const { redirect, store } = useListenerGate();
  if (redirect) return <Navigate to={redirect} replace />;

  const { catalog, favoriteIds, neurotypeId } = store;
  const mode = modeFromNeurotype(neurotypeId);
  const favorites = catalog.filter((s) => favoriteIds.includes(s.id));

  return (
    <ListenerFrame mode={mode} activeTab="profile" onTabChange={onTabChange}>
      <div className="pb-4 pt-2">
        <AppTitle className="text-[1.5rem]">Saved</AppTitle>
        <AppBody className="mt-2">
          {favorites.length
            ? `${favorites.length} session${favorites.length === 1 ? "" : "s"} saved for later`
            : "Save sessions from your list to find them quickly."}
        </AppBody>

        <div className="mt-8 space-y-3">
          {favorites.map((session) => (
            <button
              key={session.id}
              type="button"
              className="w-full rounded-2xl border p-4 text-left"
              style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface)" }}
              onClick={() => navigate(`/app/listener/session/${session.id}`)}
            >
              <p className="text-[16px] font-medium" style={{ color: "var(--proto-text)" }}>
                {session.title}
              </p>
              <p className="mt-1 text-[12px]" style={{ color: "var(--proto-text-muted)" }}>
                {formatDuration(session.durationMin)} · {session.useCase}
              </p>
            </button>
          ))}
        </div>
      </div>
    </ListenerFrame>
  );
}
