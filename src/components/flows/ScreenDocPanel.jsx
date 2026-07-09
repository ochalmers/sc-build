import { useState } from "react";
import FlowScreenPreview from "./FlowScreenPreview.jsx";

function Field({ label, children }) {
  if (!children || (Array.isArray(children) && children.length === 0)) return null;
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">{label}</p>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function ListItems({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item} className="text-[13px] leading-relaxed text-ink-600">
          {item}
        </li>
      ))}
    </ul>
  );
}

function MonoList({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item} className="font-mono text-[12px] text-ink-600">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ScreenDocPanel({ screen, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-200/80 bg-white/55">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/80 md:px-6"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <div>
          <p className="text-[15px] font-medium tracking-tight text-ink-950">{screen.title}</p>
          {screen.route ? (
            <p className="mt-0.5 font-mono text-[11px] text-ink-400">{screen.route}</p>
          ) : null}
        </div>
        <span className="text-[18px] leading-none text-ink-400" aria-hidden>
          {open ? "−" : "+"}
        </span>
      </button>

      {open ? (
        <div className="border-t border-ink-200/60 px-5 pb-6 pt-5 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
            <div className="space-y-5">
              <Field label="Purpose">
                <p className="text-[13px] leading-relaxed text-ink-700">{screen.purpose}</p>
              </Field>
              {screen.copy ? (
                <Field label="Copy">
                  <p className="text-[13px] leading-relaxed text-ink-600">{screen.copy}</p>
                </Field>
              ) : null}
              {screen.primaryCta ? (
                <Field label="Primary CTA">
                  <p className="text-[13px] text-ink-700">{screen.primaryCta}</p>
                </Field>
              ) : null}
              {screen.secondaryCta ? (
                <Field label="Secondary CTA">
                  <p className="text-[13px] text-ink-700">{screen.secondaryCta}</p>
                </Field>
              ) : null}
              <Field label="Inputs">
                <ListItems items={screen.inputs} />
              </Field>
              <Field label="Outputs">
                <ListItems items={screen.outputs} />
              </Field>
              {screen.validation ? (
                <Field label="Validation">
                  <p className="text-[13px] text-ink-600">{screen.validation}</p>
                </Field>
              ) : null}
              {screen.validationRules ? (
                <Field label="Validation Rules">
                  <ListItems items={screen.validationRules} />
                </Field>
              ) : null}
              {screen.actions ? (
                <Field label="Actions">
                  <ListItems items={screen.actions} />
                </Field>
              ) : null}
              {screen.components ? (
                <Field label="Components">
                  <ListItems items={screen.components} />
                </Field>
              ) : null}
              {screen.contentHierarchy ? (
                <Field label="Content Hierarchy">
                  <ListItems items={screen.contentHierarchy} />
                </Field>
              ) : null}
              {screen.primaryComponents ? (
                <Field label="Primary Components">
                  <ListItems items={screen.primaryComponents} />
                </Field>
              ) : null}
              {screen.navigation ? (
                <Field label="Navigation">
                  <p className="text-[13px] text-ink-600">{screen.navigation}</p>
                </Field>
              ) : null}
              {screen.loadingState ? (
                <Field label="Loading State">
                  <p className="text-[13px] text-ink-600">{screen.loadingState}</p>
                </Field>
              ) : null}
              {screen.emptyState ? (
                <Field label="Empty State">
                  <p className="text-[13px] text-ink-600">{screen.emptyState}</p>
                </Field>
              ) : null}
              {screen.playbackControls ? (
                <Field label="Playback Controls">
                  <ListItems items={screen.playbackControls} />
                </Field>
              ) : null}
              {screen.playerDetails ? (
                <div className="space-y-4 rounded-xl border border-ink-200/60 bg-paper-100/60 p-4">
                  {Object.entries(screen.playerDetails).map(([key, items]) => (
                    <Field key={key} label={key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}>
                      <ListItems items={items} />
                    </Field>
                  ))}
                </div>
              ) : null}
              <Field label="Analytics Events">
                <MonoList items={screen.analytics} />
              </Field>
              <Field label="Developer Notes">
                <ListItems items={screen.developerNotes} />
              </Field>
              {screen.apiRequirements ? (
                <Field label="API Requirements">
                  <ListItems items={screen.apiRequirements} />
                </Field>
              ) : null}
              {screen.apiCalls ? (
                <Field label="API Calls">
                  <MonoList items={screen.apiCalls} />
                </Field>
              ) : null}
              {screen.apiDependencies ? (
                <Field label="API Dependencies">
                  <ListItems items={screen.apiDependencies} />
                </Field>
              ) : null}
              {screen.authenticationLogic ? (
                <Field label="Authentication Logic">
                  <ListItems items={screen.authenticationLogic} />
                </Field>
              ) : null}
              {screen.failureStates ? (
                <Field label="Failure States">
                  <ListItems items={screen.failureStates} />
                </Field>
              ) : null}
              {screen.futureConsiderations ? (
                <Field label="Future Considerations">
                  <ListItems items={screen.futureConsiderations} />
                </Field>
              ) : null}
              <Field label="Edge Cases">
                <ListItems items={screen.edgeCases} />
              </Field>
            </div>
            <FlowScreenPreview screenKey={screen.screenKey} label={screen.title} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
