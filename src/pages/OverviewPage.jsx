import { Link } from "react-router-dom";
import SiteChrome from "../components/SiteChrome.jsx";
import PageHero from "../components/workspace/PageHero.jsx";
import PageSection from "../components/workspace/PageSection.jsx";
import { PAGE_MAIN } from "../components/workspace/pageLayout.js";
import {
  BUILD_FOCUS,
  OVERVIEW_HERO,
  PRODUCT_ECOSYSTEM,
  SOURCE_DOCUMENTS,
  USER_TYPES,
  WHATS_NEXT,
  WORKSPACE_SECTIONS,
} from "../content/overview.js";

function BtnPrimary({ to, children, href }) {
  const className =
    "inline-flex rounded-full border border-ink-950 bg-ink-950 px-4 py-2 text-[12px] font-medium tracking-tight text-paper-100 transition-colors hover:bg-ink-800";

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

function BtnSecondary({ to, children, href }) {
  const className =
    "inline-flex rounded-full border border-ink-200/80 bg-paper-100 px-4 py-2 text-[12px] font-medium tracking-tight text-ink-800 transition-colors hover:border-ink-300";

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

function DocumentCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {SOURCE_DOCUMENTS.map((doc) => (
        <article
          key={doc.id}
          className="rounded-2xl border border-ink-200/80 bg-white/70 p-6 md:p-8"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-accent-clay">PRD</p>
          <h3 className="mt-2 text-[20px] font-medium tracking-tight text-ink-950">{doc.label}</h3>
          <p className="mt-3 text-[14px] leading-relaxed text-ink-600">{doc.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={doc.download}
              download={doc.downloadLabel}
              className="inline-flex rounded-full border border-ink-200/80 bg-paper-100 px-4 py-2 text-[12px] font-medium tracking-tight text-ink-800 transition-colors hover:border-ink-300"
            >
              Download PRD
            </a>
            <BtnSecondary to={doc.flows}>View Flows</BtnSecondary>
            <BtnSecondary to={doc.wireframes}>View Wireframes</BtnSecondary>
            {doc.app ? <BtnPrimary to={doc.app}>Open working app</BtnPrimary> : null}
          </div>
        </article>
      ))}
    </div>
  );
}

function EcosystemDiagram() {
  return (
    <div className="rounded-2xl border border-ink-200/80 bg-white/55 p-6 md:p-10">
      <div className="mx-auto max-w-md">
        {PRODUCT_ECOSYSTEM.map((step, index) => (
          <div key={step.stage}>
            <div className="rounded-xl border border-ink-200/70 bg-paper-100 px-5 py-4">
              <p className="text-[15px] font-medium tracking-tight text-ink-950">{step.stage}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-600">{step.explanation}</p>
            </div>
            {index < PRODUCT_ECOSYSTEM.length - 1 ? (
              <div className="flex justify-center py-2" aria-hidden>
                <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
                  <path d="M6 0V16M6 16L1 11M6 16L11 11" stroke="#a8a8a2" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function UserTypeCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {USER_TYPES.map((user) => (
        <article key={user.role} className="rounded-2xl border border-ink-200/80 bg-white/55 p-6">
          <h3 className="text-[18px] font-medium tracking-tight text-ink-950">{user.role}</h3>
          <div className="mt-5 space-y-5">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Purpose</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-ink-700">{user.purpose}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Main Goals</p>
              <ul className="mt-2 space-y-1.5">
                {user.goals.map((goal) => (
                  <li key={goal} className="text-[13px] text-ink-600">
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Permissions</p>
              <ul className="mt-2 space-y-1.5">
                {user.permissions.map((perm) => (
                  <li key={perm} className="text-[13px] text-ink-600">
                    {perm}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function BuildFocusTimeline() {
  const currentIndex = BUILD_FOCUS.stages.findIndex((s) => s.id === BUILD_FOCUS.currentStage);

  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max gap-3 pb-2 md:min-w-0 md:grid md:grid-cols-4 lg:grid-cols-8">
        {BUILD_FOCUS.stages.map((stage, index) => {
          const isCurrent = stage.id === BUILD_FOCUS.currentStage;
          const isComplete = index < currentIndex;

          return (
            <div
              key={stage.id}
              className={`flex min-w-[9.5rem] flex-col rounded-2xl border p-4 md:min-w-0 ${
                isCurrent
                  ? "border-ink-950 bg-ink-950 text-paper-100"
                  : isComplete
                    ? "border-ink-300/80 bg-white/70"
                    : "border-ink-200/80 bg-white/40"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-medium ${
                    isCurrent
                      ? "bg-white/20 text-white"
                      : isComplete
                        ? "bg-ink-950 text-paper-100"
                        : "border border-ink-300 text-ink-400"
                  }`}
                >
                  {isComplete ? "✓" : index + 1}
                </span>
                {isCurrent ? (
                  <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-white/70">Current</span>
                ) : null}
              </div>
              <p
                className={`mt-3 text-[13px] font-medium tracking-tight ${
                  isCurrent ? "text-white" : "text-ink-950"
                }`}
              >
                {stage.label}
              </p>
              <p
                className={`mt-2 text-[11px] leading-relaxed ${
                  isCurrent ? "text-white/75" : "text-ink-500"
                }`}
              >
                {stage.explanation}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WorkspaceCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {WORKSPACE_SECTIONS.map((section) => (
        <Link
          key={section.label}
          to={section.to}
          className="group rounded-2xl border border-ink-200/80 bg-white/55 p-6 transition-colors hover:border-ink-300 hover:bg-white/80"
        >
          <h3 className="text-[16px] font-medium tracking-tight text-ink-950 group-hover:text-ink-800">
            {section.label}
          </h3>
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Why</p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-600">{section.why}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Content</p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-600">{section.content}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">For developers</p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-600">{section.forDevs}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function WhatsNextCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {WHATS_NEXT.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          className="group rounded-2xl border border-ink-200/80 bg-white/55 p-6 transition-colors hover:border-ink-950 hover:bg-white/80"
        >
          <p className="text-[16px] font-medium tracking-tight text-ink-950">{item.label}</p>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-600">{item.description}</p>
          <p className="mt-4 text-[12px] font-medium text-ink-500 group-hover:text-ink-800">Continue →</p>
        </Link>
      ))}
    </div>
  );
}

export default function OverviewPage() {
  return (
    <SiteChrome>
      <main className={PAGE_MAIN}>
        <PageHero
          id="overview-intro"
          title={OVERVIEW_HERO.title}
          description={OVERVIEW_HERO.intro}
          withGradient
        >
          <div className="mt-8 max-w-xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
              This workspace contains
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {OVERVIEW_HERO.contains.map((item) => (
                <li key={item} className="flex gap-2.5 text-[14px] text-ink-700">
                  <span className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-ink-400" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <BtnPrimary to={OVERVIEW_HERO.ctas.primary.to}>{OVERVIEW_HERO.ctas.primary.label}</BtnPrimary>
            <BtnSecondary to={OVERVIEW_HERO.ctas.secondary.to}>{OVERVIEW_HERO.ctas.secondary.label}</BtnSecondary>
          </div>
        </PageHero>

        {/* Section 02 — Source Documents */}
        <PageSection
          id="overview-documents"
          label="Source Documents"
          title="Source Documents"
          description="The two PRDs that define all product behaviour for v2.0."
        >
          <DocumentCards />
        </PageSection>

        {/* Section 03 — Product Overview */}
        <PageSection
          id="overview-product"
          label="Product Overview"
          title="Product Overview"
          description="How a visitor becomes a listener — and what happens after."
        >
          <EcosystemDiagram />
        </PageSection>

        {/* Section 04 — User Types */}
        <PageSection
          id="overview-roles"
          label="User Types"
          title="User Types"
          description="Four roles across the product ecosystem."
        >
          <UserTypeCards />
        </PageSection>

        {/* Section 05 — Current Build Focus */}
        <PageSection
          id="overview-focus"
          label="Build Focus"
          title="Current Build Focus"
          description="Programme progress from architecture through to launch."
        >
          <BuildFocusTimeline />
        </PageSection>

        {/* Section 06 — Workspace Structure */}
        <PageSection
          id="overview-workspace"
          label="Workspace"
          title="Workspace Structure"
          description="Five sections — each with a clear purpose."
        >
          <WorkspaceCards />
        </PageSection>

        {/* Section 07 — What's Next */}
        <PageSection
          id="overview-next"
          label="Next Steps"
          title="What's Next"
          description="Continue into the workspace."
          className="border-b-0"
        >
          <WhatsNextCards />
        </PageSection>
      </main>
    </SiteChrome>
  );
}
