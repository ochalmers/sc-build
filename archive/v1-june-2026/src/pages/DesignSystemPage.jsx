import { motion } from "framer-motion";
import SiteChrome from "../components/SiteChrome.jsx";
import { DSSection } from "../design-system/DSSection.jsx";
import { basePalette } from "../system/tokens/colors.js";
import { spacingPx, safeArea } from "../system/tokens/spacing.js";
import { typeClasses, fontStack, typeRoles } from "../system/tokens/typography.js";
import { motionPrinciples, motionDuration, motionEase } from "../system/tokens/motion.js";
import { behaviourModeMeta, modeReference, BEHAVIOUR_MODES } from "../system/modes.js";
import {
  ModeChrome,
  SystemButton,
  SystemTextButton,
  SystemCard,
  SystemStoryCard,
  SystemSectionHeader,
  SystemPill,
  SystemSegmentedControl,
  SystemToggle,
  SystemInput,
  SystemAppScreen,
  SystemBottomActionBar,
  SystemWaveformModule,
  SystemPersonaChip,
} from "../system/components/index.js";

function Swatch({ name, hex }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-14 w-full rounded-xl border border-ink-200/80"
        style={{ background: hex }}
      />
      <p className="text-[11px] font-medium text-ink-800">{name}</p>
      <p className="font-mono text-[10px] text-ink-500">{hex}</p>
    </div>
  );
}

function typeRolesReference(role) {
  const r = typeRoles[role];
  if (!r) return "";
  const ls = typeof r.letterSpacing === "string" ? r.letterSpacing : String(r.letterSpacing ?? "");
  const tr = r.textTransform ? ` · ${r.textTransform}` : "";
  return `${r.size} · ${r.weight} · lh ${r.lineHeight} · ${ls}${tr}`;
}

export default function DesignSystemPage() {
  const fontName = fontStack.sans.split(",")[0].trim();

  return (
    <SiteChrome>
      <main className="pt-[6.5rem]">
        <section
          id="ds-intro"
          className="scroll-mt-[7rem] border-b border-ink-200/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.62)_0%,rgba(251,251,249,0.5)_45%,rgba(247,246,243,0.15)_100%)] px-6 py-20 md:py-28"
        >
          <div className="max-w-content mx-auto max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
              Mobile app reference
            </p>
            <motion.h1
              className="mt-4 text-[clamp(2rem,4.5vw,2.5rem)] font-medium leading-[1.08] tracking-tight text-ink-950"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: motionEase.out }}
            >
              Sonocea Design System
            </motion.h1>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
              A practical reference for building the Sonocea mobile app — tokens, behavioural modes, and
              reusable components. Import from{" "}
              <code className="font-mono text-[13px]">src/system/</code>; full token definitions live in{" "}
              <code className="font-mono text-[13px]">src/system/README.md</code>.
            </p>

            <dl className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-ink-200/80 bg-white/75 p-4">
                <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500">Fixed</dt>
                <dd className="mt-2 text-[13px] leading-relaxed text-ink-700">
                  Structure, type roles, base palette, component semantics.
                </dd>
              </div>
              <div className="rounded-xl border border-ink-200/80 bg-white/75 p-4">
                <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500">Adaptive</dt>
                <dd className="mt-2 text-[13px] leading-relaxed text-ink-700">
                  Contrast, density, and intensity via Care / Regulation / Performance.
                </dd>
              </div>
              <div className="rounded-xl border border-ink-200/80 bg-white/75 p-4">
                <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500">Rule</dt>
                <dd className="mt-2 text-[13px] leading-relaxed text-ink-700">
                  Sound leads; visuals support clarity. Motion stays secondary.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <DSSection
          id="ds-tokens"
          label="01"
          title="Tokens"
          description={`${fontName} type, warm neutrals, and a single spacing scale. Modes reshape contrast and density — they do not fork the palette.`}
        >
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="text-[12px] font-medium uppercase tracking-[0.12em] text-ink-500">Colour</h3>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {Object.entries(basePalette).map(([k, v]) => (
                  <Swatch key={k} name={k} hex={v} />
                ))}
              </div>
              <p className="mt-4 text-[12px] text-ink-500">
                <code className="font-mono">src/system/tokens/colors.js</code> · resolved at runtime via{" "}
                <code className="font-mono">resolvePalette</code>
              </p>
            </div>

            <div>
              <h3 className="text-[12px] font-medium uppercase tracking-[0.12em] text-ink-500">Spacing</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {Object.entries(spacingPx).map(([k, v]) => (
                  <div
                    key={k}
                    className="flex flex-col items-center rounded-lg border border-ink-200/70 bg-white/60 px-2 py-2"
                  >
                    <div className="bg-ink-800" style={{ width: Math.min(v, 48), height: 4 }} />
                    <span className="mt-1 font-mono text-[10px] text-ink-500">
                      {k}:{v}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-ink-600">
                Safe-area minimums: {safeArea.minHorizontal}px horizontal, {safeArea.minBottom}px bottom.
                Use mode density multipliers for padding and gaps — see{" "}
                <code className="font-mono text-[12px]">tokens/spacing.js</code>.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-[12px] font-medium uppercase tracking-[0.12em] text-ink-500">Typography</h3>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-ink-200/70 bg-white/80">
              <table className="min-w-[480px] w-full text-left">
                <thead>
                  <tr className="border-b border-ink-200/70 text-[11px] uppercase tracking-[0.1em] text-ink-500">
                    <th className="px-5 py-3 font-medium">Role</th>
                    <th className="px-5 py-3 font-medium">Spec</th>
                    <th className="px-5 py-3 font-medium">Sample</th>
                  </tr>
                </thead>
                <tbody className="text-ink-800">
                  {(["display", "heading", "body", "label", "caption"]).map((role) => (
                    <tr key={role} className="border-b border-ink-200/40 last:border-0">
                      <td className="px-5 py-3.5 text-[13px] font-medium capitalize">{role}</td>
                      <td className="px-5 py-3.5 font-mono text-[11px] text-ink-500">
                        {typeRolesReference(role)}
                      </td>
                      <td className={`px-5 py-3.5 ${typeClasses[role]} text-ink-800`}>
                        {role === "display" && "Session title"}
                        {role === "heading" && "Section heading"}
                        {role === "body" && "Explanatory copy and UI labels."}
                        {role === "label" && "Label · uppercase"}
                        {role === "caption" && "Metadata · 8 min"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-10 rounded-xl border border-ink-200/70 bg-paper-100/80 p-5">
            <h3 className="text-[12px] font-medium uppercase tracking-[0.12em] text-ink-500">Motion</h3>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-700">
              {motionPrinciples.slice(0, 3).join(" · ")}. Durations: fast {motionDuration.fast}ms · standard{" "}
              {motionDuration.standard}ms · slow {motionDuration.slow}ms.
            </p>
          </div>
        </DSSection>

        <DSSection
          id="ds-modes"
          label="02"
          title="Behavioural modes"
          description="Care, Regulation, and Performance share one identity. Wrap screens in ModeChrome and pass mode to components — adjust behaviour before inventing new themes."
        >
          <div className="grid gap-5 lg:grid-cols-3">
            {BEHAVIOUR_MODES.map((id) => {
              const m = behaviourModeMeta[id];
              const ref = modeReference[id];
              return (
                <div key={id} className="rounded-2xl border border-ink-200/70 bg-white/85 p-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500">{m.label}</p>
                  <p className="mt-1 text-[15px] font-medium text-ink-950">{m.definition}</p>
                  <ModeChrome mode={id} className="mt-4 rounded-xl border border-ink-200/40 p-3">
                    <div
                      className="rounded-lg border px-3 py-2"
                      style={{
                        borderColor: "var(--proto-border)",
                        background: "var(--proto-surface-elevated)",
                      }}
                    >
                      <p className="text-[11px]" style={{ color: "var(--proto-text-muted)" }}>
                        Preview
                      </p>
                      <p className="mt-1 text-[12px] font-medium" style={{ color: "var(--proto-text)" }}>
                        Same layout, adapted tone
                      </p>
                    </div>
                  </ModeChrome>
                  <p className="mt-4 text-[13px] leading-relaxed text-ink-600">{ref.productImplications}</p>
                </div>
              );
            })}
          </div>
        </DSSection>

        <DSSection
          id="ds-components"
          label="03"
          title="Components"
          description="Import from src/system/components. Examples below use Regulation — the default balanced mode for most app screens."
        >
          <ModeChrome mode="regulation" className="rounded-2xl border border-ink-200/40 p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500">Actions</p>
                <div className="flex flex-wrap gap-3">
                  <SystemButton mode="regulation">Primary</SystemButton>
                  <SystemTextButton mode="regulation">Text action</SystemTextButton>
                </div>
                <SystemInput mode="regulation" placeholder="Email or invite code" />
                <div className="flex flex-wrap items-center gap-3">
                  <SystemSegmentedControl mode="regulation" value={1} />
                  <SystemToggle label="Downloads" checked />
                </div>
                <div className="flex flex-wrap gap-2">
                  <SystemPill active>Focus</SystemPill>
                  <SystemPill active={false}>Sleep</SystemPill>
                  <SystemPersonaChip>Listener</SystemPersonaChip>
                </div>
              </div>

              <div className="space-y-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500">Content</p>
                <SystemCard mode="regulation">
                  <SystemSectionHeader
                    label="Session"
                    title="Coastal regulation"
                    description="12 min · streamed"
                  />
                  <div className="mt-4">
                    <SystemWaveformModule mode="regulation" />
                  </div>
                </SystemCard>
                <SystemStoryCard title="Library item">Short scenario description for browsing.</SystemStoryCard>
              </div>
            </div>
          </ModeChrome>

          <p className="mt-6 text-[13px] text-ink-600">
            Also available: <code className="font-mono text-[12px]">SystemAppScreen</code>,{" "}
            <code className="font-mono text-[12px]">SystemBottomActionBar</code>,{" "}
            <code className="font-mono text-[12px]">SystemModalSurface</code>,{" "}
            <code className="font-mono text-[12px]">SystemScenarioCard</code>,{" "}
            <code className="font-mono text-[12px]">SystemBrandLogo</code>.
          </p>
        </DSSection>

        <DSSection
          id="ds-app"
          label="04"
          title="Example screen"
          description="A typical session view — phone chrome, card, waveform, and bottom actions. Swap mode prop to see behavioural differences."
          className="border-b-0"
        >
          <div className="mx-auto max-w-sm">
            <ModeChrome mode="regulation">
              <SystemAppScreen title="Session">
                <SystemCard mode="regulation">
                  <SystemSectionHeader label="Now playing" title="Quiet entry" description="Regulation · 8 min" />
                  <div className="mt-5">
                    <SystemWaveformModule mode="regulation" />
                  </div>
                </SystemCard>
                <div className="mt-4">
                  <SystemStoryCard title="About this session">
                    Structured audio for steady autonomic support.
                  </SystemStoryCard>
                </div>
                <div className="mt-6">
                  <SystemBottomActionBar />
                </div>
              </SystemAppScreen>
            </ModeChrome>
          </div>
        </DSSection>
      </main>
    </SiteChrome>
  );
}
