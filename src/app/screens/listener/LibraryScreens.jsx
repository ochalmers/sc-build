import {
  categoryAccent,
  currentListenStreak,
  dayStripLabels,
  formatDuration,
  goalProgressRows,
  groupSessionsForLibrary,
  isDirectAccessPartner,
  listenDaysInWindow,
  listenerGreetingName,
  listenerTimeGreeting,
  LISTEN_STREAK_DAYS,
  NEUROTYPE_OPTIONS,
  FEEL_LABELS,
  orderedSessionSectionsForPreferences,
  pairFeelingCheckIns,
  personalisedProgrammeSubtitle,
  programmeCompletionPct,
  rankSessionsForPreferences,
  resolvePartner,
  sessionsByTimeOfDay,
  totalListenMinutes,
  WEEKLY_SESSION_GOAL,
  weekCompletedCount,
} from "../../data/catalog.js";
import { useAppStore } from "../../context/AppStore.jsx";
import { LISTENER_FRAME, ListenerFrame } from "../../components/ListenerFrame.jsx";
import { PartnerBrandMark } from "../../components/PartnerBrandMark.jsx";
import { AppBody, AppButton, AppTitle } from "../../components/ui.jsx";
import {
  sessionAtmosphere,
  sessionBeforeYouBegin,
  sessionDescription,
  sessionHeadline,
} from "../../components/SessionAtmosphere.jsx";
import { IconPlay } from "../../../system/components/SampleIcons.jsx";
import { SystemLogoMark } from "../../../system/components/SystemLogoMark.jsx";
import { LISTENER_MVP_NAV } from "../../../content/flows.js";
import { resolveAppearance } from "../../utils/appearance.js";
import { useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";

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

function openSessionDetail(navigate, sessionId, from = "/app/listener/home") {
  navigate(`/app/listener/session/${sessionId}`, { state: { from } });
}

function PartnerMark({ partner, className = "h-10 w-10", rounded = "rounded-full" }) {
  return (
    <PartnerBrandMark
      partner={partner}
      className={`shrink-0 object-contain ${rounded} ${className}`}
      monogramClassName={`flex shrink-0 items-center justify-center text-[11px] font-semibold tracking-wide ${rounded} ${className}`}
    />
  );
}

function TimeOfDaySessionList({ sessions, completedIds, navigate, from, prefs }) {
  const sections = prefs
    ? orderedSessionSectionsForPreferences(sessions, prefs)
    : [
        { id: "morning", title: "Morning", items: sessionsByTimeOfDay(sessions).morning },
        { id: "evening", title: "Evening", items: sessionsByTimeOfDay(sessions).evening },
        { id: "other", title: "Anytime", items: sessionsByTimeOfDay(sessions).other },
      ].filter((s) => s.items.length > 0);

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section.id}>
          <p
            className="mb-2 text-[12px] font-medium tracking-[0.04em]"
            style={{
              color: section.preferred ? "var(--proto-text)" : "var(--proto-text-muted)",
            }}
          >
            {section.title}
          </p>
          <div className="space-y-2">
            {section.items.map((session) => (
              <SessionRow
                key={session.id}
                session={session}
                onOpen={() => openSessionDetail(navigate, session.id, from)}
                meta={
                  completedIds?.has(session.id)
                    ? `${formatDuration(session.durationMin)} · Completed`
                    : `${formatDuration(session.durationMin)} · ${session.useCase}`
                }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function dayKeyFromDate(d) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

/**
 * Direct-access / anonymous home filters - three states only.
 * Restore covers Reset, Rest, Recovery, and Wellbeing so every session lands in a filter.
 */
const DIRECT_ACCESS_HOME_FILTERS = [
  { id: "Calm", label: "Calm", categories: ["Calm"] },
  { id: "Focus", label: "Focus", categories: ["Focus"] },
  { id: "Restore", label: "Restore", categories: ["Reset", "Rest", "Recovery", "Wellbeing"] },
];

function sessionMatchesHomeFilter(session, filterId) {
  if (!filterId) return true;
  const filter = DIRECT_ACCESS_HOME_FILTERS.find((f) => f.id === filterId);
  if (!filter?.categories?.length) return true;
  const cat = session.category ?? session.useCase;
  return filter.categories.includes(cat);
}

function preferredHomeFilter(prefs = {}) {
  const goals = prefs.supportGoals ?? prefs.supportIds ?? [];
  const moments = prefs.listeningMoments ?? prefs.moodIds ?? [];
  if (goals.includes("focus") || moments.includes("focus")) return "Focus";
  if (
    goals.includes("recovery") ||
    goals.includes("sleep") ||
    moments.includes("recover") ||
    moments.includes("reset") ||
    moments.includes("winding-down")
  ) {
    return "Restore";
  }
  return "Calm";
}

function homeFiltersForLibrary(_sessions) {
  return DIRECT_ACCESS_HOME_FILTERS;
}

/** 03 · Home - personalised programme overview */
export function ListenerHome() {
  const navigate = useNavigate();
  const onTabChange = useTabNavigate();
  const { redirect, store } = useListenerGate();
  const [categoryFilter, setCategoryFilter] = useState(null);
  if (redirect) return <Navigate to={redirect} replace />;

  const {
    appearance,
    library,
    listenHistory,
    neurotypeId,
    user,
    partners,
    feedback,
    listeners,
    onboardingPrefs,
  } = store;
  const mode = modeFromNeurotype(neurotypeId);
  const isDark = resolveAppearance(appearance) === "dark";
  const partner = resolvePartner(partners, user.partnerId);
  const greetingName = listenerGreetingName(user) || onboardingPrefs?.preferredName || null;
  const homeGreeting = listenerTimeGreeting(greetingName);
  const listenerId =
    listeners.find((l) => l.email === user.email)?.id ??
    listeners.find((l) => l.inviteCode === user.inviteCode)?.id;
  const myHistory = listenerId
    ? listenHistory.filter((h) => !h.listenerId || h.listenerId === listenerId)
    : listenHistory;
  const completedIds = new Set(
    myHistory.filter((h) => h.progressPct >= 90).map((h) => h.sessionId),
  );
  const incomplete = library.filter((s) => !completedIds.has(s.id));
  // Only resume sessions that are still incomplete - ignore stale partials
  // left behind after a later completion of the same session.
  const continueSession =
    myHistory.find(
      (h) =>
        h.progressPct > 0 &&
        h.progressPct < 90 &&
        !completedIds.has(h.sessionId),
    ) ?? null;
  const continueFromCatalog = continueSession
    ? library.find((s) => s.id === continueSession.sessionId)
    : null;
  const rankedIncomplete = rankSessionsForPreferences(incomplete, onboardingPrefs ?? {});
  const directAccess = isDirectAccessPartner(partner) || Boolean(user.isAnonymous);
  // Org programmes keep Session 1 first until something is completed.
  // Direct-access / anonymous: ranking from onboarding drives the first suggestion.
  const sessionOne =
    incomplete.find((s) => s.id === "ses-arrive") ??
    library.find((s) => s.id === "ses-arrive");
  // Exclude in-progress from "next" - resume OR next, never both.
  const nextCandidates = rankedIncomplete.filter((s) => s.id !== continueFromCatalog?.id);
  const recommended =
    completedIds.size === 0 && !continueFromCatalog
      ? directAccess
        ? nextCandidates[0] ?? sessionOne ?? incomplete[0] ?? library[0]
        : sessionOne ?? nextCandidates[0] ?? incomplete[0] ?? library[0]
      : nextCandidates[0] ?? incomplete.find((s) => s.id !== continueFromCatalog?.id) ?? null;
  const { listenedDays, windowDays } = listenDaysInWindow(myHistory, LISTEN_STREAK_DAYS);
  const dayPct = windowDays ? Math.round((listenedDays / windowDays) * 100) : 0;
  const recent = myHistory.slice(0, 3);

  const heroMinHeight = Math.round(LISTENER_FRAME.height * 0.5);
  const prefs = onboardingPrefs ?? {};
  const homeSubtitle = directAccess
    ? null
    : partner?.programmeTitle
      ? `${partner.programmeTitle}${partner?.name ? ` · ${partner.name}` : ""}`
      : partner?.name
        ? `Sessions from ${partner.name}`
        : "Your sessions, ready when you are.";

  const rankedLibrary = directAccess
    ? rankSessionsForPreferences(library, prefs)
    : library;
  const categoryFilters = directAccess ? homeFiltersForLibrary(library) : [];
  const preferredFilter = preferredHomeFilter(prefs);
  const activeCategoryFilter = directAccess
    ? categoryFilters.some((f) => f.id === categoryFilter)
      ? categoryFilter
      : categoryFilters.find((f) => f.id === preferredFilter)?.id ??
        categoryFilters[0]?.id ??
        "Calm"
    : null;

  const filteredLibrary = directAccess
    ? rankedLibrary.filter((s) => sessionMatchesHomeFilter(s, activeCategoryFilter))
    : rankedLibrary;
  // Always keep a startable session under the filters for anonymous / direct-access.
  const filteredIncomplete = filteredLibrary.filter((s) => !completedIds.has(s.id));
  const filteredContinue =
    continueFromCatalog && sessionMatchesHomeFilter(continueFromCatalog, activeCategoryFilter)
      ? continueFromCatalog
      : null;
  const filteredRecommended =
    filteredIncomplete.find((s) => s.id !== filteredContinue?.id) ??
    filteredIncomplete[0] ??
    filteredLibrary[0] ??
    rankedLibrary[0] ??
    library[0] ??
    null;

  const primaryHero = directAccess
    ? filteredContinue
      ? {
          kind: "resume",
          session: filteredContinue,
          eyebrow: "Pick up where you left off",
          meta: `${Math.round(continueSession.progressPct)}% · ${formatDuration(filteredContinue.durationMin)}`,
          cta: "Resume",
          playerPath: `/app/listener/player/${filteredContinue.id}`,
        }
      : filteredRecommended
        ? {
            kind: "next",
            session: filteredRecommended,
            eyebrow: filteredRecommended.category || filteredRecommended.useCase || "Session",
            meta: `${formatDuration(filteredRecommended.durationMin)} · ${filteredRecommended.useCase}`,
            cta: "Start session",
            playerPath: `/app/listener/player/${filteredRecommended.id}`,
          }
        : null
    : continueFromCatalog
      ? {
          kind: "resume",
          session: continueFromCatalog,
          eyebrow: "Pick up where you left off",
          meta: `${Math.round(continueSession.progressPct)}% · ${formatDuration(continueFromCatalog.durationMin)}`,
          cta: "Resume",
          playerPath: `/app/listener/player/${continueFromCatalog.id}`,
        }
      : recommended
        ? {
            kind: "next",
            session: recommended,
            eyebrow: "Next session",
            meta: `${formatDuration(recommended.durationMin)} · ${recommended.useCase}`,
            cta: "Start session",
            playerPath: `/app/listener/player/${recommended.id}`,
          }
        : null;

  const suggestedTitle = directAccess
    ? categoryFilters.find((f) => f.id === activeCategoryFilter)?.label ?? "Suggested for you"
    : "Upcoming sessions";

  const progressCard = (
    <button
      type="button"
      className="w-full rounded-2xl border p-4 text-left"
      style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface)" }}
      onClick={() => navigate("/app/listener/progress")}
    >
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-medium" style={{ color: "var(--proto-text-muted)" }}>
          Progress
        </p>
        <p className="text-[12px]" style={{ color: "var(--proto-text)" }}>
          {listenedDays} of {windowDays} days
        </p>
      </div>
      <div
        className="mt-3 h-1.5 overflow-hidden rounded-full"
        style={{ background: "var(--proto-bg)" }}
      >
        <div
          className="h-full rounded-full"
          style={{ width: `${dayPct}%`, background: "var(--proto-text)" }}
        />
      </div>
    </button>
  );

  const filterRow =
    directAccess && categoryFilters.length > 0 ? (
      <div
        className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Session filters"
      >
        {categoryFilters.map((filter) => {
          const active = filter.id === activeCategoryFilter;
          return (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={active}
              className="shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-medium tracking-tight transition"
              style={
                active
                  ? {
                      background: "var(--proto-text)",
                      color: "var(--proto-bg)",
                    }
                  : {
                      background: "var(--proto-surface)",
                      color: "var(--proto-text-muted)",
                      border: "1px solid var(--proto-border)",
                    }
              }
              onClick={() => setCategoryFilter(filter.id)}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    ) : null;

  const heroCard = primaryHero ? (
    <div
      role="link"
      tabIndex={0}
      className={`relative cursor-pointer overflow-hidden rounded-[1.35rem] text-left outline-none focus-visible:ring-2 ${
        isDark ? "focus-visible:ring-black/20" : "focus-visible:ring-white/40"
      }`}
      style={{
        background: isDark ? "#f3f2ee" : sessionAtmosphere(mode, "detail"),
        minHeight: heroMinHeight,
      }}
      onClick={() => openSessionDetail(navigate, primaryHero.session.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openSessionDetail(navigate, primaryHero.session.id);
        }
      }}
    >
      <div
        className="relative flex h-full flex-col justify-end p-5"
        style={{ minHeight: heroMinHeight }}
      >
        <div>
          <p
            className="text-[12px] font-medium tracking-[0.04em]"
            style={{ color: isDark ? "rgba(23,23,22,0.5)" : "rgba(255,255,255,0.55)" }}
          >
            {primaryHero.eyebrow}
          </p>
          <p
            className="mt-2 text-[1.65rem] font-medium leading-tight tracking-tight"
            style={{ color: isDark ? "#171716" : "#fff" }}
          >
            {primaryHero.session.title}
          </p>
          <p
            className="mt-1.5 text-[13px]"
            style={{ color: isDark ? "rgba(23,23,22,0.5)" : "rgba(255,255,255,0.55)" }}
          >
            {primaryHero.meta}
          </p>
          <button
            type="button"
            className={`mt-5 w-full rounded-xl px-5 py-3.5 text-[13px] font-medium tracking-tight transition active:scale-[0.99] ${
              isDark
                ? "bg-[#171716] text-[#f3f2ee] hover:bg-black"
                : "bg-white text-black hover:bg-white/95"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              navigate(primaryHero.playerPath);
            }}
          >
            {primaryHero.cta}
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <ListenerFrame mode={mode} activeTab="home" onTabChange={onTabChange}>
      <div className="pb-4 pt-2">
        <div className="min-w-0">
          <AppTitle className="text-[1.25rem] leading-tight tracking-[-0.02em]">
            {homeGreeting}
          </AppTitle>
          {homeSubtitle ? <AppBody className="mt-1.5 text-[13px]">{homeSubtitle}</AppBody> : null}
        </div>

        {directAccess ? (
          <div className="mt-5 space-y-4">
            {progressCard}
            {filterRow}
            {heroCard}
          </div>
        ) : (
          <>
            {heroCard ? <div className="mt-5">{heroCard}</div> : null}
            <div className="mt-4">{progressCard}</div>
          </>
        )}

        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-[14px] font-medium" style={{ color: "var(--proto-text)" }}>
              {suggestedTitle}
            </p>
            <button
              type="button"
              className="text-[12px] font-medium"
              style={{ color: "var(--proto-text)" }}
              onClick={() => navigate("/app/listener/programme")}
            >
              View programme
            </button>
          </div>
          {filteredLibrary.length === 0 ? (
            <p className="text-[13px]" style={{ color: "var(--proto-text-muted)" }}>
              No sessions in this category yet.
            </p>
          ) : (
            <TimeOfDaySessionList
              sessions={filteredLibrary}
              completedIds={completedIds}
              navigate={navigate}
              from="/app/listener/home"
              prefs={directAccess ? prefs : null}
            />
          )}
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
                    onOpen={() => openSessionDetail(navigate, session.id)}
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

/** Programme - calendar or list view + about */
export function ListenerProgramme() {
  const navigate = useNavigate();
  const onTabChange = useTabNavigate();
  const { redirect, store } = useListenerGate();
  const [view, setView] = useState("list");
  const weekDays = useMemo(() => {
    const start = new Date();
    start.setHours(12, 0, 0, 0);
    const day = start.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;
    start.setDate(start.getDate() + mondayOffset);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, []);

  if (redirect) return <Navigate to={redirect} replace />;

  const { library, listenHistory, neurotypeId, user, partners, listeners, onboardingPrefs } = store;
  const mode = modeFromNeurotype(neurotypeId);
  const partner = resolvePartner(partners, user.partnerId);
  const directAccess = isDirectAccessPartner(partner) || Boolean(user.isAnonymous);
  const listenerId =
    listeners.find((l) => l.email === user.email)?.id ??
    listeners.find((l) => l.inviteCode === user.inviteCode)?.id;
  const myHistory = listenerId
    ? listenHistory.filter((h) => !h.listenerId || h.listenerId === listenerId)
    : listenHistory;
  const completedIds = new Set(
    myHistory.filter((h) => h.progressPct >= 90).map((h) => h.sessionId),
  );
  const programmeSessions = directAccess
    ? rankSessionsForPreferences(library, onboardingPrefs ?? {})
    : library;
  const { morning, evening } = sessionsByTimeOfDay(programmeSessions);

  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <ListenerFrame mode={mode} activeTab="home" onTabChange={onTabChange}>
      <div className="pb-6 pt-2">
        <button
          type="button"
          className="text-[12px]"
          style={{ color: "var(--proto-text-muted)" }}
          onClick={() => navigate("/app/listener/home")}
        >
          ← Home
        </button>

        <div className="mt-5 min-w-0">
          <AppTitle className="text-[1.5rem]">
            {directAccess ? "Your sessions" : "Your programme"}
          </AppTitle>
          <AppBody className="mt-2">
            {directAccess
              ? personalisedProgrammeSubtitle(onboardingPrefs ?? {})
              : partner?.name
                ? `${library.length} sessions from ${partner.name}`
                : `${library.length} sessions in your programme`}
          </AppBody>
        </div>

        <div
          className="mt-6 grid grid-cols-2 gap-1 rounded-2xl p-1"
          style={{ background: "var(--proto-surface)", border: "1px solid var(--proto-border)" }}
          role="tablist"
          aria-label="Programme view"
        >
          {[
            { id: "list", label: "List" },
            { id: "calendar", label: "Calendar" },
          ].map((tab) => {
            const active = view === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                className="rounded-xl px-3 py-2.5 text-[13px] font-medium transition"
                style={{
                  background: active ? "var(--proto-text)" : "transparent",
                  color: active ? "var(--proto-bg)" : "var(--proto-text-muted)",
                }}
                onClick={() => setView(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {view === "list" ? (
          <div className="mt-6">
            <TimeOfDaySessionList
              sessions={programmeSessions}
              completedIds={completedIds}
              navigate={navigate}
              from="/app/listener/programme"
              prefs={directAccess ? onboardingPrefs ?? {} : null}
            />
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-7 gap-1.5">
              {weekDays.map((d, i) => {
                const isToday = dayKeyFromDate(d) === dayKeyFromDate(new Date());
                return (
                  <div key={dayLabels[i]} className="text-center">
                    <p
                      className="text-[10px] uppercase tracking-wide"
                      style={{ color: "var(--proto-text-muted)" }}
                    >
                      {dayLabels[i]}
                    </p>
                    <p
                      className="mt-1 text-[13px] font-medium"
                      style={{
                        color: isToday ? "var(--proto-text)" : "var(--proto-text-muted)",
                      }}
                    >
                      {d.getDate()}
                    </p>
                  </div>
                );
              })}
            </div>

            {[
              { id: "morning", label: "Morning", items: morning, tone: "AM" },
              { id: "evening", label: "Evening", items: evening, tone: "PM" },
            ].map((band) => (
              <div key={band.id}>
                <p
                  className="mb-2 text-[12px] font-medium tracking-[0.04em]"
                  style={{ color: "var(--proto-text-muted)" }}
                >
                  {band.label}
                </p>
                <div className="grid grid-cols-7 gap-1.5">
                  {weekDays.map((d, i) => {
                    const session = band.items[i % Math.max(band.items.length, 1)];
                    const hasSession = band.items.length > 0;
                    return (
                      <button
                        key={`${band.id}-${dayLabels[i]}`}
                        type="button"
                        disabled={!hasSession}
                        className="flex min-h-[64px] flex-col items-start rounded-xl border p-1.5 text-left disabled:opacity-40"
                        style={{
                          borderColor: "var(--proto-border)",
                          background: "var(--proto-surface)",
                        }}
                        onClick={() =>
                          hasSession &&
                          openSessionDetail(navigate, session.id, "/app/listener/programme")
                        }
                      >
                        {hasSession ? (
                          <>
                            <span
                              className="text-[9px] font-medium"
                              style={{ color: "var(--proto-text-muted)" }}
                            >
                              {band.tone}
                            </span>
                            <span
                              className="mt-0.5 line-clamp-2 text-[10px] font-medium leading-tight"
                              style={{ color: "var(--proto-text)" }}
                            >
                              {session.title.replace("Session ", "S")}
                            </span>
                          </>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 space-y-3">
          <div
            className="rounded-2xl border p-4"
            style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface)" }}
          >
            <div className="flex items-center gap-3">
              <SystemLogoMark className="h-8 w-auto opacity-80" style={{ color: "var(--proto-text)" }} />
              <p className="text-[14px] font-medium" style={{ color: "var(--proto-text)" }}>
                About Sonocea
              </p>
            </div>
            <AppBody className="mt-3">
              Sonocea uses patented Sonic Augmentation Technology™ to deliver structured listening
              experiences designed to support nervous system regulation, recovery and wellbeing.
            </AppBody>
          </div>

          <div
            className="rounded-2xl border p-4"
            style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface)" }}
          >
            <div className="flex items-center gap-3">
              {directAccess ? (
                <SystemLogoMark className="h-8 w-auto opacity-80" style={{ color: "var(--proto-text)" }} />
              ) : (
                <PartnerMark partner={partner} className="h-8 w-8" rounded="rounded-lg" />
              )}
              <p className="text-[14px] font-medium" style={{ color: "var(--proto-text)" }}>
                {directAccess
                  ? "Built around your answers"
                  : (partner?.programmeTitle ?? "Your programme")}
              </p>
            </div>
            <AppBody className="mt-3">
              {directAccess
                ? "Session order and suggestions follow the goals, moments, and times you shared in onboarding. You can listen in any order that fits."
                : (partner?.programme ??
                  "Your organisation has shared a set of listening sessions to support recovery and wellbeing.")}
            </AppBody>
            <AppBody className="mt-2">
              {morning.length} morning · {evening.length} evening · {library.length} total
            </AppBody>
          </div>
        </div>
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

  const { library, neurotypeId, user, partners, sessionGroups } = store;
  const mode = modeFromNeurotype(neurotypeId);
  const partner = resolvePartner(partners, user.partnerId);
  const groups = groupSessionsForLibrary(library, sessionGroups, user.partnerId);

  return (
    <ListenerFrame mode={mode} activeTab="home" onTabChange={onTabChange}>
      <div className="pb-4 pt-2">
        <AppTitle className="text-[1.5rem]">
          {partner?.programmeTitle ?? "Your sessions"}
        </AppTitle>
        <AppBody className="mt-2">
          {partner?.name
            ? `From ${partner.name} · ${library.length} total`
            : `${library.length} sessions assigned to you`}
        </AppBody>

        <div className="mt-8 space-y-8">
          {groups.map((group) => (
            <div key={group.id}>
              <p className="text-[14px] font-medium" style={{ color: "var(--proto-text)" }}>
                {group.title}
              </p>
              {group.description ? (
                <p className="mt-1 text-[13px]" style={{ color: "var(--proto-text-muted)" }}>
                  {group.description}
                </p>
              ) : null}
              <div className="mt-3 space-y-2">
                {group.items.map((session) => (
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
                      className="flex w-full text-left"
                      onClick={() => openSessionDetail(navigate, session.id, "/app/listener/assigned")}
                    >
                      <span
                        className="w-1 shrink-0 self-stretch"
                        style={{
                          width: 4,
                          background: categoryAccent(session.category),
                        }}
                        aria-hidden
                      />
                      <div className="min-w-0 flex-1 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
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
                      </div>
                    </button>
                  </article>
                ))}
              </div>
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

/** 08 · Progress - streak, weekly goal, programme, feelings, history */
export function ListenerProgress() {
  const navigate = useNavigate();
  const onTabChange = useTabNavigate();
  const { redirect, store } = useListenerGate();
  if (redirect) return <Navigate to={redirect} replace />;

  const { library, listenHistory, feedback, neurotypeId, user, listeners, onboardingPrefs } = store;
  const mode = modeFromNeurotype(neurotypeId);
  const listenerRecord =
    listeners.find((l) => l.email === user.email) ??
    listeners.find((l) => l.inviteCode === user.inviteCode);
  const listenerId = listenerRecord?.id;
  const myHistory = listenerId
    ? listenHistory.filter((h) => !h.listenerId || h.listenerId === listenerId)
    : listenHistory;
  const myFeedback = feedback;

  const { listenedDays, windowDays, dayKeys, stripKeys } = listenDaysInWindow(
    myHistory,
    LISTEN_STREAK_DAYS,
  );
  const stripLabels = dayStripLabels(stripKeys);
  const todayKey = dayKeyFromDate(new Date());
  const streak = currentListenStreak(myHistory);
  const weekDone = weekCompletedCount(myHistory);
  const weekGoal = WEEKLY_SESSION_GOAL;
  const weekPct = Math.min(100, Math.round((weekDone / weekGoal) * 100));
  const programmePct = programmeCompletionPct(myHistory, library);
  const minutes = totalListenMinutes(myHistory);
  const completedCount = new Set(
    myHistory.filter((h) => (h.progressPct ?? 0) >= 90).map((h) => h.sessionId),
  ).size;

  const supportGoals =
    onboardingPrefs?.supportGoals ??
    onboardingPrefs?.supportIds ??
    listenerRecord?.supportIds ??
    [];
  const goalRows = goalProgressRows(supportGoals, library, myHistory);

  const feelingPairs = pairFeelingCheckIns(myFeedback).slice(0, 6);

  const dayPct = windowDays ? Math.round((listenedDays / windowDays) * 100) : 0;

  const streakCopy =
    streak === 0
      ? "Start a streak by finishing a session today"
      : streak === 1
        ? "1 day in a row - keep going when it feels right"
        : `${streak} days in a row`;

  return (
    <ListenerFrame mode={mode} activeTab="home" onTabChange={onTabChange}>
      <div className="pb-4 pt-2">
        <AppTitle className="text-[1.5rem]">Your progress</AppTitle>
        <AppBody className="mt-2">How listening is settling into your week</AppBody>

        {/* Snapshot */}
        <div className="mt-8 grid grid-cols-3 gap-2">
          {[
            {
              label: "Streak",
              value: streak > 0 ? `${streak}d` : "-",
              hint: streak > 0 ? "in a row" : "not started",
            },
            {
              label: "This week",
              value: `${weekDone}/${weekGoal}`,
              hint: "sessions",
            },
            {
              label: "Programme",
              value: `${programmePct}%`,
              hint: `${completedCount} of ${library.length}`,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border px-3 py-3.5 text-center"
              style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface)" }}
            >
              <p className="text-[11px]" style={{ color: "var(--proto-text-muted)" }}>
                {stat.label}
              </p>
              <p
                className="mt-1.5 text-[1.35rem] font-medium tracking-tight"
                style={{ color: "var(--proto-text)" }}
              >
                {stat.value}
              </p>
              <p className="mt-1 text-[10px]" style={{ color: "var(--proto-text-muted)" }}>
                {stat.hint}
              </p>
            </div>
          ))}
        </div>

        {/* Week rhythm */}
        <div
          className="mt-4 rounded-2xl border p-4"
          style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface)" }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[15px] font-medium" style={{ color: "var(--proto-text)" }}>
                {listenedDays} of {windowDays} days
              </p>
              <p className="mt-1 text-[12px]" style={{ color: "var(--proto-text-muted)" }}>
                Days you listened in the last {windowDays} days
              </p>
            </div>
            <p className="shrink-0 text-[12px]" style={{ color: "var(--proto-text-muted)" }}>
              {formatDuration(minutes || 0)} total
            </p>
          </div>

          <div
            className="mt-3 h-1.5 overflow-hidden rounded-full"
            style={{ background: "var(--proto-bg)" }}
          >
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{
                width: `${dayPct}%`,
                background: "var(--proto-text)",
              }}
            />
          </div>
          <p className="mt-2 text-[11px]" style={{ color: "var(--proto-text-muted)" }}>
            Weekly aim · {weekDone} of {weekGoal} sessions
            {weekDone >= weekGoal ? " · met" : ""} · {weekPct}% of goal
          </p>

          <div className="mt-5 flex items-end justify-between gap-1.5">
            {stripKeys.map((key, i) => {
              const filled = dayKeys.has(key);
              const isToday = key === todayKey;
              return (
                <div key={key} className="flex flex-1 flex-col items-center gap-1.5">
                  <span
                    className="h-8 w-full max-w-[28px] rounded-full transition-colors"
                    style={{
                      background: filled
                        ? "var(--proto-text)"
                        : isToday
                          ? "color-mix(in srgb, var(--proto-text) 18%, var(--proto-bg))"
                          : "var(--proto-bg)",
                    }}
                    aria-label={`${stripLabels[i]}${filled ? ", listened" : ", not yet"}`}
                  />
                  <span
                    className="text-[10px]"
                    style={{
                      color: isToday ? "var(--proto-text)" : "var(--proto-text-muted)",
                      fontWeight: isToday ? 600 : 400,
                    }}
                  >
                    {stripLabels[i]}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="mt-4 text-[12px] leading-relaxed" style={{ color: "var(--proto-text-muted)" }}>
            {streakCopy}
          </p>
        </div>

        {/* Goals from personalisation */}
        {goalRows.length > 0 ? (
          <div className="mt-8">
            <p className="mb-1 text-[14px] font-medium" style={{ color: "var(--proto-text)" }}>
              Your goals
            </p>
            <p className="mb-3 text-[12px]" style={{ color: "var(--proto-text-muted)" }}>
              From what you said listening should support.
            </p>
            <div className="space-y-2">
              {goalRows.map((goal) => {
                const pct = Math.round((goal.done / goal.total) * 100);
                return (
                  <div
                    key={goal.id}
                    className="rounded-2xl border p-3.5"
                    style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface)" }}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-[14px] font-medium" style={{ color: "var(--proto-text)" }}>
                        {goal.label}
                      </p>
                      <p className="text-[11px]" style={{ color: "var(--proto-text-muted)" }}>
                        {goal.done}/{goal.total} sessions
                      </p>
                    </div>
                    <div
                      className="mt-2.5 h-1 overflow-hidden rounded-full"
                      style={{ background: "var(--proto-bg)" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: "var(--proto-text)" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* How you felt - paired */}
        <div className="mt-8">
          <p className="mb-1 text-[14px] font-medium" style={{ color: "var(--proto-text)" }}>
            How you felt
          </p>
          <p className="mb-3 text-[12px]" style={{ color: "var(--proto-text-muted)" }}>
            Before and after ratings from your sessions.
          </p>
          {feelingPairs.length === 0 ? (
            <p className="text-[13px]" style={{ color: "var(--proto-text-muted)" }}>
              After you check in before and after a session, the shift will show here.
            </p>
          ) : (
            <div className="space-y-2">
              {feelingPairs.map((row) => {
                const session = library.find((s) => s.id === row.sessionId);
                const before = row.before?.rating;
                const after = row.after?.rating;
                const delta =
                  before != null && after != null ? after - before : null;
                const deltaLabel =
                  delta == null
                    ? null
                    : delta > 0
                      ? `+${delta} toward settled`
                      : delta < 0
                        ? `${delta} toward unsettled`
                        : "No change";
                return (
                  <div
                    key={`${row.sessionId}-${row.at}`}
                    className="rounded-2xl border p-3.5"
                    style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface)" }}
                  >
                    <p className="text-[15px] font-medium" style={{ color: "var(--proto-text)" }}>
                      {session?.title ?? "Session"}
                    </p>
                    <div className="mt-2 flex flex-col gap-1 text-[12px]" style={{ color: "var(--proto-text-muted)" }}>
                      <span>
                        Before · {before != null ? FEEL_LABELS[before] ?? before : "—"}
                      </span>
                      <span>
                        After · {after != null ? FEEL_LABELS[after] ?? after : "—"}
                      </span>
                    </div>
                    {deltaLabel ? (
                      <p className="mt-1.5 text-[12px]" style={{ color: "var(--proto-text)" }}>
                        {deltaLabel}
                      </p>
                    ) : null}
                    {row.after?.note || row.before?.note ? (
                      <p className="mt-1.5 text-[12px]" style={{ color: "var(--proto-text-muted)" }}>
                        {row.after?.note || row.before?.note}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* History */}
        <div className="mt-8">
          <p className="mb-3 text-[14px] font-medium" style={{ color: "var(--proto-text)" }}>
            Listening history
          </p>
          {myHistory.length === 0 ? (
            <p className="text-[13px]" style={{ color: "var(--proto-text-muted)" }}>
              Finish a session and it’ll show up here.
            </p>
          ) : (
            <div className="space-y-2">
              {myHistory.slice(0, 8).map((entry) => {
                const session = library.find((s) => s.id === entry.sessionId);
                if (!session) return null;
                const when = new Date(entry.completedAt);
                const whenLabel = when.toLocaleDateString("en-GB", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                });
                return (
                  <SessionRow
                    key={`${entry.sessionId}-${entry.completedAt}`}
                    session={session}
                    onOpen={() => openSessionDetail(navigate, session.id, "/app/listener/progress")}
                    meta={
                      entry.progressPct >= 90
                        ? `Completed · ${whenLabel} · ${formatDuration(session.durationMin)}`
                        : `${Math.round(entry.progressPct)}% · ${whenLabel}`
                    }
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </ListenerFrame>
  );
}

/** 09 · Organisation / Your plan */
export function ListenerOrganisation() {
  const navigate = useNavigate();
  const { redirect, store } = useListenerGate();
  if (redirect) return <Navigate to={redirect} replace />;

  const { neurotypeId, user, partners, library, onboardingPrefs } = store;
  const mode = modeFromNeurotype(neurotypeId);
  const partner = resolvePartner(partners, user.partnerId);
  const programmeTitle = partner?.programmeTitle;
  const isPne = partner?.id === "org-preston";
  const directAccess = isDirectAccessPartner(partner) || Boolean(user.isAnonymous);
  const prefs = onboardingPrefs ?? {};
  const goalLabels = (prefs.supportGoals ?? prefs.supportIds ?? [])
    .map((id) =>
      ({
        calmer: "Feeling calmer",
        recovery: "Recovering and resetting",
        focus: "Staying focused",
        regulation: "Feeling more balanced",
        sleep: "Sleeping better",
        wellbeing: "General wellbeing",
      })[id],
    )
    .filter(Boolean);

  if (directAccess) {
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

          <div className="mt-8 flex justify-center">
            <SystemLogoMark
              className="h-14 w-auto opacity-90"
              style={{ color: "var(--proto-text)" }}
              title="Sonocea"
            />
          </div>

          <AppTitle className="mt-5 text-center">Your listening plan</AppTitle>
          <p
            className="mt-2 text-center text-[14px] font-medium tracking-tight"
            style={{ color: "var(--proto-text-muted)" }}
          >
            {personalisedProgrammeSubtitle(prefs)}
          </p>

          <AppBody className="mt-4 text-center">
            Sonocea shaped this set from what you shared — not from an organisation programme.
          </AppBody>

          <div className="mt-8 space-y-3">
            {[
              {
                title: "What you asked for",
                body: goalLabels.length
                  ? goalLabels.join(" · ")
                  : "Your onboarding answers guide what appears next on Home.",
              },
              {
                title: "How sessions are ordered",
                body: `${library.length} sessions, ranked for your goals, moments, and preferred listening times. You can still open any session from Your sessions.`,
              },
              {
                title: "Need help?",
                body: "For app or playback issues, use Support. There’s no organisation contact on this plan.",
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

        <div className="mt-8 flex justify-center">
          <PartnerMark partner={partner} className="h-16 w-16" rounded="rounded-2xl" />
        </div>

        <AppTitle className="mt-5 text-center">
          {partner?.name ?? "Your organisation"}
        </AppTitle>
        {programmeTitle ? (
          <p
            className="mt-2 text-center text-[14px] font-medium tracking-tight"
            style={{ color: "var(--proto-text-muted)" }}
          >
            {programmeTitle}
          </p>
        ) : null}

        <AppBody className="mt-4 text-center">
          {partner?.programme ??
            "Your organisation has shared a set of listening sessions to support you."}
        </AppBody>

        <div className="mt-8 space-y-3">
          {[
            {
              title: "About this programme",
              body: isPne
                ? `${library.length} sessions curated for academy and first-team recovery — after training, between fixtures, and on rest days. Your club chose this set; you can listen in any order that fits your week.`
                : `${library.length} sessions chosen for you as part of your organisation’s plan.`,
            },
            {
              title: "What it’s for",
              body: isPne
                ? "Settle after training, recover between matches, and build a steadier listening habit around the match week — without a consumer subscription."
                : "Help you settle, recover, and build a steadier listening habit.",
            },
            {
              title: "Need help?",
              body: isPne
                ? "For programme questions, speak to Player Care at the club. For app or playback issues, use Support."
                : "For programme questions, ask your organisation. For app issues, use Support.",
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
  const location = useLocation();
  const { redirect, store } = useListenerGate();
  if (redirect) return <Navigate to={redirect} replace />;

  const { getSession, neurotypeId } = store;
  const session = getSession(sessionId);
  const mode = modeFromNeurotype(neurotypeId);

  function closeDetail() {
    const from = location.state?.from;
    if (typeof from === "string" && from.startsWith("/app/listener")) {
      navigate(from);
      return;
    }
    navigate("/app/listener/home");
  }

  if (!session) {
    return (
      <ListenerFrame mode={mode} hideTabBar>
        <AppTitle className="mt-8">Session unavailable</AppTitle>
        <AppBody className="mt-3">This session isn’t in your assigned programme.</AppBody>
        <AppButton className="mt-8" onClick={closeDetail}>
          Go back
        </AppButton>
      </ListenerFrame>
    );
  }

  const sessionMode = session.mode || mode;
  const beforeItems = sessionBeforeYouBegin(session);

  return (
    <ListenerFrame mode={sessionMode} hideTabBar bleed>
      <div className="flex h-full min-h-full flex-col bg-[#f5f4f0]">
        <div className="relative h-[42%] min-h-[280px] shrink-0 overflow-hidden bg-[#141414]">
          <button
            type="button"
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center text-white/80"
            aria-label="Close"
            onClick={closeDetail}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>

          <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-6 pt-16">
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/50">
              {formatDuration(session.durationMin)}
            </p>
            <h1 className="mt-2 text-[2rem] font-medium leading-[1.05] tracking-[-0.03em] text-white">
              {session.title}
            </h1>
          </div>
        </div>

        <div className="relative z-10 flex flex-1 flex-col px-5 pb-6 pt-5">
          <p className="text-[1.2rem] font-medium leading-snug tracking-[-0.02em] text-[#141414]">
            {sessionHeadline(session)}
          </p>
          {sessionDescription(session) ? (
            <p className="mt-2 max-w-[34ch] text-[14px] leading-relaxed text-[#6a6864]">
              {sessionDescription(session)}
            </p>
          ) : null}

          {beforeItems.length > 0 ? (
            <DetailSection label="Before you begin">
              <ul className="space-y-2">
                {beforeItems.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-2.5 text-[14px] leading-snug text-[#2a2a28]">
                    <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[#2a2a28]/40" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </DetailSection>
          ) : null}

          <div className="mt-auto space-y-3 pt-8">
            <button
              type="button"
              className="w-full rounded-full bg-[#111110] px-5 py-3.5 text-[14px] font-medium tracking-tight text-white"
              onClick={() => navigate(`/app/listener/check-in/${session.id}`)}
            >
              Start session
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

  const { neurotypeId } = store;
  const mode = modeFromNeurotype(neurotypeId);

  return (
    <ListenerFrame mode={mode} activeTab="profile" onTabChange={onTabChange}>
      <div className="pb-4 pt-2">
        <AppTitle className="text-[1.5rem]">Saved</AppTitle>
        <AppBody className="mt-2">
          Favorites aren’t in this build yet - they’ll land in a later version.
        </AppBody>

        <div
          className="mt-8 rounded-2xl border p-4"
          style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface)" }}
        >
          <p className="text-[15px] font-medium" style={{ color: "var(--proto-text)" }}>
            Coming later
          </p>
          <p className="mt-2 text-[13px] leading-snug" style={{ color: "var(--proto-text-muted)" }}>
            You’ll be able to save sessions from your list and find them here quickly.
          </p>
        </div>

        <AppButton
          className="mt-6"
          fullWidth
          variant="secondary"
          onClick={() => navigate("/app/listener/assigned")}
        >
          Browse your sessions
        </AppButton>
      </div>
    </ListenerFrame>
  );
}
