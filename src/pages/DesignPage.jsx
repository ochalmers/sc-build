import { useState } from "react";
import { Link } from "react-router-dom";
import SiteChrome from "../components/SiteChrome.jsx";
import PageHero from "../components/workspace/PageHero.jsx";
import PageSection from "../components/workspace/PageSection.jsx";
import { PAGE_MAIN } from "../components/workspace/pageLayout.js";
import PreviewPlaceholder from "../components/design/PreviewPlaceholder.jsx";
import DesignSystemShowcase from "../components/design/DesignSystemShowcase.jsx";
import ComponentPreview from "../components/design/ComponentPreview.jsx";
import ScreenPreview from "../components/design/ScreenPreview.jsx";
import KeyScreensGrid from "../components/design/KeyScreensGrid.jsx";
import {
  ACCESSIBILITY_TOPICS,
  COMPONENT_CATEGORIES,
  DESIGN_HERO,
  INTERACTION_STATES,
  MOTION_PRINCIPLES,
  SCREEN_CATALOGUE,
} from "../content/design.js";

function BtnPrimary({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex rounded-full border border-ink-950 bg-ink-950 px-4 py-2 text-[12px] font-medium tracking-tight text-paper-100 transition-colors hover:bg-ink-800"
    >
      {children}
    </Link>
  );
}

function BtnSecondary({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex rounded-full border border-ink-200/80 bg-paper-100 px-4 py-2 text-[12px] font-medium tracking-tight text-ink-800 transition-colors hover:border-ink-300"
    >
      {children}
    </Link>
  );
}

function DesignSystemGrid() {
  return <DesignSystemShowcase />;
}

function ComponentCard({ component }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-200/80 bg-white/55">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/80"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-[14px] font-medium text-ink-950">{component.name}</span>
        <span className="text-[18px] leading-none text-ink-400" aria-hidden>
          {open ? "−" : "+"}
        </span>
      </button>
      {open ? (
        <div className="border-t border-ink-200/60 px-5 pb-6 pt-4">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Purpose</p>
                <p className="mt-1 text-[13px] text-ink-700">{component.purpose}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Variants</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {component.variants.map((v) => (
                    <span key={v} className="rounded-full border border-ink-200/80 bg-paper-100 px-2.5 py-1 text-[11px] text-ink-600">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Properties</p>
                <p className="mt-1 font-mono text-[12px] text-ink-600">{component.properties.join(" · ")}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">States</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {component.states.map((s) => (
                    <span key={s} className="rounded-full border border-ink-200/80 px-2.5 py-1 text-[11px] text-ink-600">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              {component.usageNotes?.length ? (
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Usage Notes</p>
                  <ul className="mt-1 space-y-1">
                    {component.usageNotes.map((n) => (
                      <li key={n} className="text-[13px] text-ink-600">{n}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {component.developerNotes?.length ? (
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Developer Notes</p>
                  <ul className="mt-1 space-y-1">
                    {component.developerNotes.map((n) => (
                      <li key={n} className="text-[13px] text-ink-600">{n}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div className="flex flex-wrap gap-3 pt-2 text-[11px] text-ink-400">
                <span>Code — src/system/components/</span>
              </div>
            </div>
            <ComponentPreview componentId={component.id} label={component.name} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ComponentLibrary() {
  return (
    <div className="space-y-10">
      {COMPONENT_CATEGORIES.map((category) => (
        <div key={category.id}>
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500">{category.label}</p>
          <div className="space-y-2">
            {category.components.map((component) => (
              <ComponentCard key={component.id} component={component} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ScreenDesignCard({ screen: scr }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-200/80 bg-white/55">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/80"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-[14px] font-medium text-ink-950">{scr.title}</span>
        <span className="text-[18px] leading-none text-ink-400" aria-hidden>
          {open ? "−" : "+"}
        </span>
      </button>
      {open ? (
        <div id={`screen-${scr.id}`} className="scroll-mt-28 border-t border-ink-200/60 px-5 pb-6 pt-4">
          <p className="text-[13px] text-ink-600">{scr.purpose}</p>
          <div className="mt-6">
            <ScreenPreview screenKey={scr.screenKey} label={scr.title} />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Components Used</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {scr.components.map((c) => (
                  <span key={c} className="rounded-full border border-ink-200/80 bg-paper-100 px-2.5 py-1 text-[11px] text-ink-600">{c}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">States Required</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {scr.statesRequired.map((s) => (
                  <span key={s} className="rounded-full border border-ink-200/80 px-2.5 py-1 text-[11px] text-ink-600">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Primary Actions</p>
              <p className="mt-1 text-[13px] text-ink-600">{scr.primaryActions.join(", ")}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Secondary Actions</p>
              <p className="mt-1 text-[13px] text-ink-600">{scr.secondaryActions.length ? scr.secondaryActions.join(", ") : "—"}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Responsive Notes</p>
              <p className="mt-1 text-[13px] text-ink-600">{scr.responsiveNotes}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Accessibility Notes</p>
              <p className="mt-1 text-[13px] text-ink-600">{scr.accessibilityNotes}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Developer Notes</p>
            <ul className="mt-1 space-y-1">
              {scr.developerNotes.map((n) => (
                <li key={n} className="text-[13px] text-ink-600">{n}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-ink-400">
            <span>Wireframe key — {scr.screenKey}</span>
            <Link to="/flows" className="font-medium text-ink-600 underline-offset-4 hover:underline">
              View in flows →
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ScreenCatalogue() {
  const [openGroup, setOpenGroup] = useState(SCREEN_CATALOGUE[0]?.id ?? null);

  return (
    <div className="space-y-10">
      <KeyScreensGrid />
      <div className="space-y-4">
      <div className="rounded-2xl border border-ink-950/10 bg-ink-950/[0.03] px-5 py-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-600">Layer 02 — Screen Catalogue</p>
        <p className="mt-1 text-[13px] text-ink-700">
          {SCREEN_CATALOGUE.reduce((n, g) => n + g.screens.length, 0)} screens grouped by flow — expand for wireframe, hi-fi preview, and implementation specs.
        </p>
      </div>
      {SCREEN_CATALOGUE.map((group) => {
        const isOpen = openGroup === group.id;
        return (
          <div key={group.id} className="overflow-hidden rounded-2xl border border-ink-200/80 bg-white/40">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/60"
              aria-expanded={isOpen}
              onClick={() => setOpenGroup(isOpen ? null : group.id)}
            >
              <div>
                <p className="text-[16px] font-medium tracking-tight text-ink-950">{group.label}</p>
                <p className="mt-0.5 text-[12px] text-ink-500">{group.screens.length} screens</p>
              </div>
              <span className="text-[18px] leading-none text-ink-400" aria-hidden>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen ? (
              <div className="space-y-2 border-t border-ink-200/60 p-4">
                {group.screens.map((scr) => (
                  <ScreenDesignCard key={scr.id} screen={scr} />
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
      </div>
    </div>
  );
}

function InteractionStateLibrary() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {INTERACTION_STATES.map((state) => (
        <article key={state.id} className="rounded-2xl border border-ink-200/80 bg-white/55 p-5">
          <h3 className="text-[14px] font-medium tracking-tight text-ink-950">{state.title}</h3>
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Purpose</p>
              <p className="mt-1 text-[12px] text-ink-600">{state.purpose}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Visual Behaviour</p>
              <p className="mt-1 text-[12px] text-ink-600">{state.visual}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Recovery Behaviour</p>
              <p className="mt-1 text-[12px] text-ink-600">{state.recovery}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Component Usage</p>
              <p className="mt-1 text-[12px] text-ink-600">{state.componentUsage.join(", ")}</p>
            </div>
            {state.developerNotes?.length ? (
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Developer Notes</p>
                <p className="mt-1 text-[12px] text-ink-600">{state.developerNotes[0]}</p>
              </div>
            ) : null}
          </div>
          <div className="mt-4 flex justify-center">
            <PreviewPlaceholder label={state.title} type="state" />
          </div>
        </article>
      ))}
    </div>
  );
}

function MotionDocs() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {MOTION_PRINCIPLES.map((item) => (
        <article key={item.id} className="rounded-2xl border border-ink-200/80 bg-white/55 p-6">
          <h3 className="text-[15px] font-medium tracking-tight text-ink-950">{item.title}</h3>
          <p className="mt-2 text-[13px] text-ink-600">{item.purpose}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink-500">Timing</p>
              <p className="mt-1 text-[12px] text-ink-600">{item.timing}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink-500">Duration</p>
              <p className="mt-1 text-[12px] text-ink-600">{item.duration}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink-500">Easing</p>
              <p className="mt-1 font-mono text-[11px] text-ink-600">{item.easing}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink-500">Accessibility</p>
              <p className="mt-1 text-[12px] text-ink-600">{item.accessibility}</p>
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <PreviewPlaceholder label={item.title} type="motion" />
          </div>
        </article>
      ))}
    </div>
  );
}

function AccessibilityDocs() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {ACCESSIBILITY_TOPICS.map((topic) => (
        <div key={topic.id} className="rounded-2xl border border-ink-200/80 bg-white/55 p-5">
          <h3 className="text-[14px] font-medium tracking-tight text-ink-950">{topic.title}</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-600">{topic.notes}</p>
        </div>
      ))}
    </div>
  );
}

export default function DesignPage() {
  return (
    <SiteChrome>
      <main className={PAGE_MAIN}>
        <PageHero
          id="design-intro"
          title={DESIGN_HERO.title}
          description={DESIGN_HERO.intro}
          withGradient
        >
          <div className="mt-10 flex flex-wrap gap-3">
            <BtnPrimary to={DESIGN_HERO.ctas.primary.to}>{DESIGN_HERO.ctas.primary.label}</BtnPrimary>
            <BtnSecondary to={DESIGN_HERO.ctas.secondary.to}>{DESIGN_HERO.ctas.secondary.label}</BtnSecondary>
          </div>
        </PageHero>

        <PageSection
          id="design-system"
          label="Layer 01"
          title="Design System"
          description="Canonical tokens, behavioural modes, typography, colour, spacing, motion — with live previews."
        >
          <DesignSystemGrid />
        </PageSection>

        <PageSection
          id="design-components"
          label="Components"
          title="Component Library"
          description="Living component inventory — grouped by category with live previews and specs."
        >
          <ComponentLibrary />
        </PageSection>

        <PageSection
          id="design-catalogue"
          label="Screens"
          title="Screen Catalogue"
          description="Every key screen with wireframes and hi-fi references — grouped by flow with full implementation specs."
        >
          <ScreenCatalogue />
        </PageSection>

        <PageSection
          id="design-states"
          label="States"
          title="Interaction States"
          description="Dedicated interaction library — loading, empty, error, playback and recovery."
        >
          <InteractionStateLibrary />
        </PageSection>

        <PageSection
          id="design-motion"
          label="Motion"
          title="Motion"
          description="Motion principles — timing, easing and accessibility considerations."
        >
          <MotionDocs />
        </PageSection>

        <PageSection
          id="design-accessibility"
          label="Accessibility"
          title="Accessibility"
          description="Implementation notes for inclusive design across all surfaces."
          className="border-b-0"
        >
          <AccessibilityDocs />
        </PageSection>
      </main>
    </SiteChrome>
  );
}
