import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Chevron({ open, className = "" }) {
  return (
    <svg
      viewBox="0 0 12 12"
      width="12"
      height="12"
      aria-hidden
      className={`shrink-0 transition-transform duration-150 ${open ? "rotate-90" : ""} ${className}`}
    >
      <path
        d="M4.25 2.5 7.75 6l-3.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function pathsMatch(stepPath, pathname, search) {
  const normalisedSearch = (search || "").replace(/^\?/, "");
  if (!stepPath.includes("?")) {
    return stepPath === pathname && !normalisedSearch;
  }
  const [path, query] = stepPath.split("?");
  if (path !== pathname) return false;
  // Step query is active when all of its params are present (extra params ok).
  const want = new URLSearchParams(query);
  const have = new URLSearchParams(normalisedSearch);
  for (const [key, value] of want.entries()) {
    if (have.get(key) !== value) return false;
  }
  return true;
}

export function isFlowSectionActive(section, pathname, search = "") {
  const normalisedSearch = search.replace(/^\?/, "");
  if (pathsMatch(section.appPath, pathname, normalisedSearch)) return true;
  if (section.appSteps?.some((step) => pathsMatch(step.path, pathname, normalisedSearch))) {
    return true;
  }

  // Loose fallbacks for Listener destinations (ignore extra query).
  if (section.id === "session-journey" || section.id?.endsWith("session-journey")) {
    if (pathname.includes("/session/")) return true;
  }
  if (section.id === "playback-experience" || section.id?.endsWith("playback-experience")) {
    if (pathname.includes("/player/")) return true;
  }
  if (section.id === "reflection-completion" || section.id?.endsWith("reflection-completion")) {
    if (pathname.includes("/feedback/") || pathname.includes("/check-in/")) return true;
  }
  if (section.id === "admin-send-invites" && pathname.endsWith("/email")) {
    if (pathname.startsWith("/app/admin")) return false;
    return true;
  }
  if (
    section.id === "invitation-authentication" ||
    section.id?.endsWith("invitation-authentication")
  ) {
    if (
      pathname === "/app/listener" ||
      pathname.endsWith("/email") ||
      pathname.endsWith("/app-store") ||
      pathname.endsWith("/invite") ||
      pathname.endsWith("/login")
    ) {
      // Don't steal highlight from Admin login.
      if (pathname.startsWith("/app/admin")) return false;
      return true;
    }
  }
  if (
    section.id === "first-time-experience" ||
    section.id?.endsWith("first-time-experience")
  ) {
    if (pathname.includes("/onboarding") || pathname.includes("/neurotype")) return true;
  }
  if (section.id === "system-states" || section.id?.endsWith("system-states")) {
    if (pathname.startsWith("/app/listener/system-states")) return true;
  }
  if (pathname === "/app/admin/setup" || pathname === "/app/admin") {
    const step = new URLSearchParams(normalisedSearch).get("step");
    if (section.id === "admin-home" && step === "home") return true;
    if (section.id === "admin-dashboard" && (pathname === "/app/admin" || step === "dashboard")) {
      return true;
    }
  }
  if (section.id === "admin-sign-in" && (pathname === "/app/admin/login" || (pathname === "/app/admin/setup" && normalisedSearch.includes("step=login")))) {
    return true;
  }
  if (pathname === "/app/admin/setup") {
    const step = new URLSearchParams(normalisedSearch).get("step");
    if (step === "orgs-list" && section.id === "admin-create-org") return true;
    if (section.appPath?.includes(`step=${step}`)) return true;
    if (section.appSteps?.some((s) => s.path.includes(`step=${step}`))) return true;
  }

  // Prefix match for sections without conflicting queries
  if (!section.appPath?.includes("?") && pathname === section.appPath) return true;

  return false;
}

export { pathsMatch };

const RAIL_TONES = {
  dark: {
    title: "text-white/35",
    divider: "text-white/25",
    item: "text-white/45 hover:bg-white/[0.06] hover:text-white/80",
    itemActive: "bg-white/10 text-white",
    number: "text-white/30",
    chevron: "text-white/35 hover:bg-white/[0.06] hover:text-white/70",
    step: "text-white/40 hover:bg-white/[0.05] hover:text-white/70",
    stepActive: "bg-white/10 text-white",
    stepRail: "border-white/10",
    footer: "text-white/30",
    footerLink: "text-white/50",
    select: "border-white/10 bg-white/5 text-white/80",
  },
  light: {
    title: "text-black/40",
    divider: "text-black/35",
    item: "text-black/50 hover:bg-black/[0.05] hover:text-black/80",
    itemActive: "bg-black/[0.08] text-black",
    number: "text-black/35",
    chevron: "text-black/35 hover:bg-black/[0.05] hover:text-black/65",
    step: "text-black/45 hover:bg-black/[0.04] hover:text-black/75",
    stepActive: "bg-black/[0.08] text-black",
    stepRail: "border-black/10",
    footer: "text-black/40",
    footerLink: "text-black/55",
    select: "border-black/10 bg-white text-black/80",
  },
};

/**
 * Shared left-rail flow navigator for Listener and Combined review modes.
 * `tone`: "dark" on listener stages, "light" on the white Admin continuous stage.
 */
export function FlowReviewRail({
  title = "Listener flows",
  sections,
  pathname,
  search = "",
  onNavigate,
  footer,
  tone = "dark",
}) {
  const flowItems = sections.filter((s) => s.appPath);
  const normalisedSearch = search.replace(/^\?/, "");
  const t = RAIL_TONES[tone] ?? RAIL_TONES.dark;
  /** Sections with sub-links start collapsed; user opens via chevron. */
  const [openIds, setOpenIds] = useState(() => new Set());

  // Keep the active section expanded so the current sub-step stays visible.
  useEffect(() => {
    const activeId = flowItems.find(
      (s) => s.appSteps?.length && isFlowSectionActive(s, pathname, normalisedSearch),
    )?.id;
    if (!activeId) return;
    setOpenIds((prev) => {
      if (prev.has(activeId)) return prev;
      const next = new Set(prev);
      next.add(activeId);
      return next;
    });
  }, [pathname, normalisedSearch, sections]);

  const toggleOpen = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Combined rail: first listener-* section marks Admin → Listener handoff.
  const listenerStartIndex = flowItems.findIndex((s) => s.id?.startsWith("listener-"));

  return (
    <aside className="hidden w-[16.5rem] shrink-0 lg:block">
      <div className="sticky top-6 max-h-[calc(100dvh-3rem)] overflow-y-auto pr-2">
        <p className={`font-mono text-[12px] uppercase tracking-[0.14em] ${t.title}`}>{title}</p>
        <nav className="mt-3" aria-label={`${title} destinations`}>
          <ul className="space-y-0.5">
            {flowItems.map((section, index) => {
              const active = isFlowSectionActive(section, pathname, normalisedSearch);
              const hasSteps = Boolean(section.appSteps?.length);
              const open = hasSteps && openIds.has(section.id);
              const showListenerDivider =
                listenerStartIndex >= 0 && index === listenerStartIndex;
              return (
                <li key={section.id}>
                  {showListenerDivider ? (
                    <p className={`mb-2 mt-4 px-2 font-mono text-[11px] uppercase tracking-[0.12em] ${t.divider}`}>
                      Listener journey
                    </p>
                  ) : null}
                  {index === 0 && listenerStartIndex > 0 ? (
                    <p className={`mb-2 px-2 font-mono text-[11px] uppercase tracking-[0.12em] ${t.divider}`}>
                      Admin provisioning
                    </p>
                  ) : null}
                  <div
                    className={`flex w-full items-center rounded-lg ${
                      active ? t.itemActive : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate(section.appPath);
                        if (hasSteps) {
                          setOpenIds((prev) => {
                            if (prev.has(section.id)) return prev;
                            const next = new Set(prev);
                            next.add(section.id);
                            return next;
                          });
                        }
                      }}
                      className={`flex min-w-0 flex-1 items-baseline gap-2 px-2.5 py-1.5 text-left text-[14px] leading-snug transition-colors ${
                        active ? "text-inherit" : t.item
                      } ${hasSteps ? "rounded-l-lg" : "rounded-lg"}`}
                    >
                      <span className={`shrink-0 font-mono text-[12px] tabular-nums ${t.number}`}>
                        {section.number ?? "·"}
                      </span>
                      <span className="min-w-0">{section.title}</span>
                    </button>
                    {hasSteps ? (
                      <button
                        type="button"
                        onClick={() => toggleOpen(section.id)}
                        aria-expanded={open}
                        aria-label={`${open ? "Collapse" : "Expand"} ${section.title}`}
                        className={`shrink-0 rounded-r-lg px-2 py-1.5 transition-colors ${t.chevron}`}
                      >
                        <Chevron open={open} />
                      </button>
                    ) : null}
                  </div>
                  {hasSteps && open ? (
                    <ul className={`mb-1 ml-6 mt-0.5 space-y-0.5 border-l pl-2.5 ${t.stepRail}`}>
                      {section.appSteps.map((step) => {
                        const stepActive = pathsMatch(step.path, pathname, normalisedSearch);
                        return (
                          <li key={step.path}>
                            <button
                              type="button"
                              onClick={() => onNavigate(step.path)}
                              className={`block w-full rounded-md px-2 py-1 text-left text-[13px] leading-snug transition-colors ${
                                stepActive ? t.stepActive : t.step
                              }`}
                            >
                              {step.label}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>
        {footer ?? (
          <p className={`mt-6 text-[12px] leading-relaxed ${t.footer}`}>
            Jump into a flow destination in the working app. Wireframe storyboards live on{" "}
            <Link to="/flows" className={`${t.footerLink} underline-offset-2 hover:underline`}>
              /flows
            </Link>
            .
          </p>
        )}
      </div>
    </aside>
  );
}

export function FlowReviewMobileSelect({
  sections,
  pathname,
  search = "",
  onNavigate,
  id = "flow-jump",
  tone = "dark",
}) {
  const flowItems = sections.filter((s) => s.appPath);
  const normalisedSearch = search.replace(/^\?/, "");
  const t = RAIL_TONES[tone] ?? RAIL_TONES.dark;
  const selectValue =
    flowItems
      .flatMap((s) => s.appSteps ?? [{ path: s.appPath, label: s.title }])
      .find((s) => pathsMatch(s.path, pathname, normalisedSearch))?.path ??
    flowItems.find((s) => isFlowSectionActive(s, pathname, normalisedSearch))?.appPath ??
    "";

  return (
    <div className="mb-4 lg:hidden">
      <label className="sr-only" htmlFor={id}>
        Jump to flow
      </label>
      <select
        id={id}
        className={`w-full rounded-xl border px-3 py-2.5 text-[15px] ${t.select}`}
        value={selectValue}
        onChange={(e) => {
          if (e.target.value) onNavigate(e.target.value);
        }}
      >
        <option value="">Jump to flow…</option>
        {flowItems.map((section) =>
          section.appSteps?.length ? (
            <optgroup
              key={section.id}
              label={`${section.number ? `${section.number}. ` : ""}${section.title}`}
            >
              {section.appSteps.map((step) => (
                <option key={step.path} value={step.path}>
                  {step.label}
                </option>
              ))}
            </optgroup>
          ) : (
            <option key={section.id} value={section.appPath}>
              {section.number ? `${section.number}. ` : ""}
              {section.title}
            </option>
          ),
        )}
      </select>
    </div>
  );
}
