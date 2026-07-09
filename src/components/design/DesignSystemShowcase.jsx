import { useState } from "react";
import { ModeChrome } from "../../system/components/ModeChrome.jsx";
import { HomeScreenReference } from "../../system/screens/HomeScreenReference.jsx";
import { basePalette } from "../../system/tokens/colors.js";
import { appTypeClasses, fontStack, typeClasses } from "../../system/tokens/typography.js";
import { spacingPx, densityByMode } from "../../system/tokens/spacing.js";
import { motionDuration, motionEase } from "../../system/tokens/motion.js";
import { BEHAVIOUR_MODES, behaviourModeMeta, modeReference } from "../../system/modes.js";
import { FIGMA_REFERENCE } from "../../system/tokens/appLayout.js";
import {
  IconDiscover,
  IconPlay,
  IconProfile,
  IconSettings,
  IconSound,
  SystemAppSectionHeader,
  SystemPlayControl,
  SystemSessionCard,
  SystemTag,
} from "../../system/components/index.js";
import { DESIGN_SYSTEM_LAYERS } from "../../content/design.js";

const SPACING_STEPS = [1, 2, 3, 4, 6, 8, 10];

const RADIUS_STEPS = [
  { label: "sm", px: 8 },
  { label: "md", px: 12 },
  { label: "lg", px: 16 },
  { label: "xl", px: 20 },
  { label: "full", px: 9999 },
];

const ELEVATION_STEPS = [
  { label: "Flat", shadow: "none", border: true },
  { label: "Card", shadow: "0 4px 16px rgba(8,8,8,0.06)", border: true },
  { label: "Floating", shadow: "0 12px 40px rgba(8,8,8,0.10)", border: false },
  { label: "Modal", shadow: "0 24px 64px rgba(8,8,8,0.14)", border: false },
];

const SAMPLE_ICONS = [
  { Icon: IconSound, label: "Sound" },
  { Icon: IconPlay, label: "Play" },
  { Icon: IconDiscover, label: "Discover" },
  { Icon: IconProfile, label: "Profile" },
  { Icon: IconSettings, label: "Settings" },
];

function SectionPanel({ title, description, children, className = "" }) {
  return (
    <section className={`rounded-2xl border border-ink-200/80 bg-white/55 p-6 md:p-8 ${className}`}>
      <div className="mb-6 max-w-2xl">
        <h3 className="text-[17px] font-medium tracking-tight text-ink-950">{title}</h3>
        {description ? <p className="mt-2 text-[13px] leading-relaxed text-ink-600">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

function ColourSwatch({ name, hex }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-14 w-full rounded-xl border border-ink-200/60"
        style={{ background: hex }}
      />
      <div>
        <p className="text-[12px] font-medium text-ink-800">{name}</p>
        <p className="font-mono text-[11px] text-ink-500">{hex}</p>
      </div>
    </div>
  );
}

function ModePreview({ mode }) {
  const meta = behaviourModeMeta[mode];
  const ref = modeReference[mode];

  return (
    <ModeChrome mode={mode} className="rounded-2xl border border-ink-200/70 p-5">
      <div className="mb-4 flex items-center justify-between gap-2">
        <p className="text-[13px] font-medium" style={{ color: "var(--proto-text)" }}>
          {meta.label}
        </p>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.1em]"
          style={{ background: "var(--proto-surface)", color: "var(--proto-text-muted)" }}
        >
          {meta.definition}
        </span>
      </div>
      <div
        className="rounded-xl border p-4"
        style={{ borderColor: "var(--proto-border)", background: "var(--proto-surface)" }}
      >
        <p className="text-[11px] uppercase tracking-[0.12em]" style={{ color: "var(--proto-text-muted)" }}>
          Session
        </p>
        <p className="mt-2 text-[15px] leading-snug" style={{ color: "var(--proto-text)" }}>
          {ref.tonalIntent}
        </p>
        <div className="mt-4 flex gap-2">
          <SystemTag>{mode === "care" ? "gentle" : mode === "performance" ? "focus" : "steady"}</SystemTag>
        </div>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed" style={{ color: "var(--proto-text-muted)" }}>
        {ref.purpose}
      </p>
    </ModeChrome>
  );
}

function TypographyPanel() {
  return (
    <SectionPanel
      title="Typography"
      description="Aeonik across editorial workspace and app surfaces. One family stack — modes adjust density and contrast, not typeface."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Workspace scale</p>
          <p className={typeClasses.display}>Display — calm hierarchy</p>
          <p className={typeClasses.heading}>Heading — section titles</p>
          <p className={typeClasses.body}>Body — readable at 15px with relaxed leading for long-form specs.</p>
          <p className={typeClasses.label}>Label — section markers</p>
          <p className={typeClasses.caption}>Caption — metadata and footnotes</p>
        </div>
        <ModeChrome mode="regulation" className="space-y-5 rounded-xl border border-ink-200/60 p-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">App scale (GTM Home)</p>
          <p className={appTypeClasses.eyebrow} style={{ color: "var(--proto-text-muted)" }}>
            Eyebrow label
          </p>
          <p className={appTypeClasses.sessionTitle} style={{ color: "var(--proto-text)" }}>
            Session title
          </p>
          <p className={appTypeClasses.cardTitle} style={{ color: "var(--proto-text)" }}>
            Card title
          </p>
          <p className={appTypeClasses.tabLabel} style={{ color: "var(--proto-text-muted)" }}>
            Tab label
          </p>
        </ModeChrome>
      </div>
      <div className="mt-6 rounded-xl border border-ink-200/60 bg-paper-100/80 px-4 py-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink-500">Font stack</p>
        <p className="mt-1 font-mono text-[11px] text-ink-600">{fontStack.sans}</p>
      </div>
    </SectionPanel>
  );
}

function ColourPanel() {
  return (
    <SectionPanel
      title="Colour System"
      description="Ink and paper neutrals with restrained accent. One base palette — behavioural modes apply transforms, not separate brands."
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Object.entries(basePalette).map(([name, hex]) => (
          <ColourSwatch key={name} name={name} hex={hex} />
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {BEHAVIOUR_MODES.map((mode) => (
          <ModePreview key={mode} mode={mode} />
        ))}
      </div>
    </SectionPanel>
  );
}

function SpacingPanel() {
  return (
    <SectionPanel
      title="Spacing & Density"
      description="4px base grid with generous editorial rhythm. Density multipliers shift per behavioural mode."
    >
      <div className="space-y-3">
        {SPACING_STEPS.map((step) => (
          <div key={step} className="flex items-center gap-4">
            <span className="w-8 font-mono text-[11px] text-ink-500">{spacingPx[step]}px</span>
            <div
              className="h-3 rounded-sm bg-ink-950/80"
              style={{ width: spacingPx[step] }}
            />
            <span className="text-[11px] text-ink-400">token {step}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {BEHAVIOUR_MODES.map((mode) => (
          <div key={mode} className="rounded-xl border border-ink-200/60 bg-paper-100/60 p-4">
            <p className="text-[12px] font-medium capitalize text-ink-800">{mode}</p>
            <p className="mt-1 font-mono text-[11px] text-ink-500">
              gap ×{densityByMode[mode].gap} · section ×{densityByMode[mode].section}
            </p>
          </div>
        ))}
      </div>
    </SectionPanel>
  );
}

function RadiusElevationPanel() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SectionPanel title="Border Radius" description="Rounded cards and pills — soft, premium feel.">
        <div className="flex flex-wrap gap-4">
          {RADIUS_STEPS.map(({ label, px }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div
                className="h-16 w-16 border border-ink-200 bg-ink-950/5"
                style={{ borderRadius: px === 9999 ? "9999px" : px }}
              />
              <span className="text-[11px] text-ink-500">{label}</span>
            </div>
          ))}
        </div>
      </SectionPanel>
      <SectionPanel title="Elevation" description="Subtle depth through borders and soft shadows.">
        <div className="grid grid-cols-2 gap-4">
          {ELEVATION_STEPS.map(({ label, shadow, border }) => (
            <div
              key={label}
              className="flex h-20 items-center justify-center rounded-xl bg-white"
              style={{
                boxShadow: shadow,
                border: border ? "1px solid rgba(23,23,22,0.12)" : "none",
              }}
            >
              <span className="text-[11px] text-ink-500">{label}</span>
            </div>
          ))}
        </div>
      </SectionPanel>
    </div>
  );
}

function IconsMotionPanel() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SectionPanel title="Icons" description="24px grid · 1.5px stroke · rounded caps. Consistent weight across navigation and controls.">
        <div className="flex flex-wrap gap-6">
          {SAMPLE_ICONS.map(({ Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-ink-200/80 bg-paper-100 text-ink-700">
                <Icon />
              </div>
              <span className="text-[10px] text-ink-500">{label}</span>
            </div>
          ))}
        </div>
      </SectionPanel>
      <SectionPanel title="Motion Tokens" description="Calm transitions honouring reduced motion. Secondary to sound.">
        <div className="space-y-3">
          {Object.entries(motionDuration).map(([name, ms]) => (
            <div key={name} className="flex items-center justify-between rounded-lg border border-ink-200/60 px-3 py-2">
              <span className="text-[12px] capitalize text-ink-700">{name.replace(/([A-Z])/g, " $1")}</span>
              <span className="font-mono text-[11px] text-ink-500">{ms}ms</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-ink-500">
          Default easing: cubic-bezier({motionEase.out.join(", ")})
        </p>
      </SectionPanel>
    </div>
  );
}

function ReferenceScreenPanel() {
  return (
    <SectionPanel
      title="Reference Screen — GTM Home"
      description="Structural styles sourced from Figma. Colour and imagery bind via behavioural mode CSS variables."
    >
      <a
        href={`https://www.figma.com/design/${FIGMA_REFERENCE.fileKey}/Sonocea-App--GTM-?node-id=${FIGMA_REFERENCE.nodeId.replace(":", "-")}`}
        className="mb-6 inline-flex text-[13px] text-ink-700 underline decoration-ink-300 underline-offset-4"
        target="_blank"
        rel="noreferrer"
      >
        Figma — {FIGMA_REFERENCE.screenName}
      </a>
      <div className="flex flex-col items-start gap-10 xl:flex-row xl:items-start">
        <ModeChrome mode="regulation" className="mx-auto w-fit shrink-0 rounded-[2rem] border border-ink-200/80 p-3 xl:mx-0">
          <HomeScreenReference />
        </ModeChrome>
        <ModeChrome mode="regulation" className="w-full max-w-md space-y-6 rounded-2xl border border-ink-200/70 p-6">
          <h4 className="text-[13px] font-medium uppercase tracking-[0.12em] text-ink-500">Component assembly</h4>
          <div className="flex flex-wrap gap-2">
            <SystemTag>regulate</SystemTag>
            <SystemTag>Ambient</SystemTag>
          </div>
          <SystemAppSectionHeader label="More for You" />
          <div className="flex justify-center py-2">
            <SystemPlayControl />
          </div>
          <SystemSessionCard title="Track title" />
        </ModeChrome>
      </div>
    </SectionPanel>
  );
}

function TokenInventory() {
  const [openLayer, setOpenLayer] = useState(null);

  return (
    <SectionPanel
      title="Token Inventory"
      description="Complete layer index across the design programme."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {DESIGN_SYSTEM_LAYERS.map((layer) => {
          const isOpen = openLayer === layer.id;
          return (
            <button
              key={layer.id}
              type="button"
              className="rounded-xl border border-ink-200/70 bg-paper-100/50 p-4 text-left transition-colors hover:border-ink-300 hover:bg-white/80"
              onClick={() => setOpenLayer(isOpen ? null : layer.id)}
              aria-expanded={isOpen}
            >
              <h4 className="text-[14px] font-medium text-ink-950">{layer.title}</h4>
              <p className="mt-2 text-[12px] leading-relaxed text-ink-600">{layer.purpose}</p>
              {isOpen ? (
                <div className="mt-3 border-t border-ink-200/60 pt-3">
                  <p className="text-[11px] text-ink-500">{layer.preview}</p>
                  <p className="mt-2 text-[11px] text-ink-400">{layer.componentCount} tokens</p>
                </div>
              ) : (
                <p className="mt-2 text-[11px] text-ink-400">Click to expand</p>
              )}
            </button>
          );
        })}
      </div>
    </SectionPanel>
  );
}

export default function DesignSystemShowcase() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-ink-950/10 bg-ink-950/[0.03] px-5 py-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-600">Layer 01 — Design System</p>
        <p className="mt-1 max-w-3xl text-[13px] leading-relaxed text-ink-700">
          One canonical token set expressed through three behavioural modes. Structural geometry from Figma GTM Home;
          colour and imagery adapt per context without breaking the system.
        </p>
      </div>
      <TypographyPanel />
      <ColourPanel />
      <SpacingPanel />
      <RadiusElevationPanel />
      <IconsMotionPanel />
      <ReferenceScreenPanel />
      <TokenInventory />
    </div>
  );
}
