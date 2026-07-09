import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { DesignAppScreen } from "../designs/DesignAppScreen.jsx";
import {
  getFlowById,
  getStepIndex,
  PRD_PROTOTYPE_FLOWS,
  PRD_PROTOTYPE_META,
  SCREEN_LABELS,
} from "./prdPrototypeFlows.js";
import { renderPrdPrototypeScreen } from "./renderPrdPrototypeScreen.jsx";

function FlowPicker({ onSelect }) {
  return (
    <div className="mx-auto w-full max-w-lg">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">Choose a journey</p>
      <div className="mt-6 space-y-3">
        {PRD_PROTOTYPE_FLOWS.map((flow) => (
          <button
            key={flow.id}
            type="button"
            onClick={() => onSelect(flow.id)}
            className="w-full rounded-2xl border border-ink-200/80 bg-white/70 p-5 text-left transition-colors hover:border-ink-300 hover:bg-white"
          >
            <p className="text-[15px] font-medium text-ink-950">{flow.label}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-600">{flow.description}</p>
            <p className="mt-3 text-[11px] text-ink-400">{flow.steps.length} screens</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PrdPrototypePlayer() {
  const [flowId, setFlowId] = useState(null);
  const [screenId, setScreenId] = useState(null);
  const [history, setHistory] = useState([]);

  const flow = flowId ? getFlowById(flowId) : null;
  const stepIndex = flow && screenId ? getStepIndex(flow, screenId) : -1;
  const stepTotal = flow?.steps.length ?? 0;

  const go = useCallback((nextId) => {
    setScreenId((current) => {
      if (current) setHistory((h) => [...h, current]);
      return nextId;
    });
  }, []);

  const goBack = useCallback(() => {
    setHistory((h) => {
      if (!h.length) return h;
      const prev = h[h.length - 1];
      setScreenId(prev);
      return h.slice(0, -1);
    });
  }, []);

  const startFlow = useCallback((id, startScreen) => {
    setFlowId(id);
    setScreenId(startScreen);
    setHistory([]);
  }, []);

  const restart = useCallback(() => {
    if (!flow) return;
    setScreenId(flow.start);
    setHistory([]);
  }, [flow]);

  const chooseFlow = useCallback(() => {
    setFlowId(null);
    setScreenId(null);
    setHistory([]);
  }, []);

  const nav = useMemo(
    () => ({ go, goNext: () => {}, startFlow, restart, chooseFlow }),
    [go, startFlow, restart, chooseFlow],
  );

  const screen = screenId ? renderPrdPrototypeScreen(screenId, nav) : null;
  const screenLabel = screenId ? SCREEN_LABELS[screenId] ?? screenId : null;

  return (
    <div className="min-h-[calc(100dvh-6.5rem)] bg-[radial-gradient(120%_90%_at_50%_0%,rgba(255,255,255,0.95),rgba(247,246,243,0.4)_50%,rgba(247,246,243,0)_100%)]" id="prototype-prd-intro">
      <div className="max-w-content mx-auto px-6 py-10 md:py-14">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
              Clickable prototype
            </p>
            <h1 className="mt-2 text-[clamp(1.5rem,3vw,2rem)] font-medium tracking-tight text-ink-950">
              {PRD_PROTOTYPE_META.title}
            </h1>
            <p className="mt-2 max-w-xl text-[14px] text-ink-600">{PRD_PROTOTYPE_META.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/designs/prd"
              className="rounded-full border border-ink-200/80 bg-white/70 px-4 py-2 text-[12px] text-ink-700 hover:border-ink-300"
            >
              Static designs
            </Link>
            <Link
              to="/flows/revised"
              className="rounded-full border border-ink-200/80 bg-white/70 px-4 py-2 text-[12px] text-ink-700 hover:border-ink-300"
            >
              PRD flows
            </Link>
          </div>
        </div>

        {!flowId ? (
          <div className="mt-14">
            <FlowPicker
              onSelect={(id) => {
                const start =
                  id === "public-visitor"
                    ? "pv-check-in-before"
                    : id === "listener"
                      ? "pv-invitation"
                      : "mobile-invite";
                startFlow(id, start);
              }}
            />
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-start">
            <div className="order-2 lg:order-1">
              <div className="sticky top-28 space-y-6">
                <div className="rounded-2xl border border-ink-200/80 bg-white/70 p-5">
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-500">Active flow</p>
                  <p className="mt-2 text-[16px] font-medium text-ink-950">{flow.label}</p>
                  {stepIndex >= 0 ? (
                    <p className="mt-2 text-[12px] text-ink-600">
                      Step {stepIndex + 1} of {stepTotal} · {screenLabel}
                    </p>
                  ) : null}
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-ink-100">
                    <div
                      className="h-full rounded-full bg-ink-800 transition-all duration-300"
                      style={{ width: stepIndex >= 0 ? `${((stepIndex + 1) / stepTotal) * 100}%` : "0%" }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={!history.length}
                    className="rounded-full border border-ink-200/80 bg-white/70 px-4 py-2 text-[12px] text-ink-700 disabled:opacity-40"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={restart}
                    className="rounded-full border border-ink-200/80 bg-white/70 px-4 py-2 text-[12px] text-ink-700"
                  >
                    Restart flow
                  </button>
                  <button
                    type="button"
                    onClick={chooseFlow}
                    className="rounded-full border border-ink-200/80 bg-white/70 px-4 py-2 text-[12px] text-ink-700"
                  >
                    Change flow
                  </button>
                </div>

                <p className="text-[12px] leading-relaxed text-ink-500">
                  Tap the buttons on each screen to advance — mirroring the PRD journeys. On the player screen,
                  tap the controls to finish the session.
                </p>
              </div>
            </div>

            <div className="order-1 flex justify-center lg:order-2 lg:justify-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={screenId}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <DesignAppScreen className="shadow-[0_32px_80px_rgba(8,8,8,0.18)]">
                    {screen}
                  </DesignAppScreen>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
