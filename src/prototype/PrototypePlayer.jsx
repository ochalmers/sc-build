import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { DesignAppScreen } from "../designs/DesignAppScreen.jsx";
import {
  getFlowById,
  getFlowStartScreen,
  getStepIndex,
  PROTOTYPE_FLOWS,
  PROTOTYPE_META,
  SCREEN_LABELS,
} from "./prototypeFlows.js";
import { renderPrototypeScreen } from "./renderPrototypeScreen.jsx";

function PrototypePhonePreview({ screenId, screen }) {
  return (
    <div className="flex shrink-0 justify-center lg:justify-start">
      <DesignAppScreen variant="wireframe" className="shadow-[0_32px_80px_rgba(8,8,8,0.12)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={screenId}
            className="absolute inset-0 h-full w-full"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {screen}
          </motion.div>
        </AnimatePresence>
      </DesignAppScreen>
    </div>
  );
}

function FlowPicker({ onSelect }) {
  return (
    <div className="mx-auto w-full max-w-lg">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">Choose a journey</p>
      <div className="mt-6 space-y-3">
        {PROTOTYPE_FLOWS.map((flow) => (
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

export default function PrototypePlayer() {
  const [flowId, setFlowId] = useState(null);
  const [screenId, setScreenId] = useState("pv-get-started");
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
    setScreenId(getFlowStartScreen(flow.id));
    setHistory([]);
  }, [flow]);

  const chooseFlow = useCallback(() => {
    setFlowId(null);
    setScreenId("pv-get-started");
    setHistory([]);
  }, []);

  const nav = useMemo(
    () => ({ go, startFlow, restart, chooseFlow }),
    [go, startFlow, restart, chooseFlow],
  );

  const screen = screenId ? renderPrototypeScreen(screenId, nav) : null;
  const screenLabel = screenId ? (SCREEN_LABELS[screenId] ?? screenId) : null;
  const inFlow = Boolean(flowId);

  return (
    <div className="border-t border-ink-200/60 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(255,255,255,0.95),rgba(247,246,243,0.4)_50%,rgba(247,246,243,0)_100%)]">
      <div className="max-w-content mx-auto px-6 py-10 md:py-14">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
              {PROTOTYPE_META.title}
            </p>
            <p className="mt-2 max-w-xl text-[14px] text-ink-600">{PROTOTYPE_META.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/flows"
              className="rounded-full border border-ink-200/80 bg-white/70 px-4 py-2 text-[12px] text-ink-700 hover:border-ink-300"
            >
              View flows
            </Link>
            <Link
              to="/key-screens"
              className="rounded-full border border-ink-200/80 bg-white/70 px-4 py-2 text-[12px] text-ink-700 hover:border-ink-300"
            >
              Key screens
            </Link>
          </div>
        </div>

        {!inFlow ? (
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-start">
            <div className="order-2 lg:order-1">
              <FlowPicker
                onSelect={(id) => {
                  startFlow(id, getFlowStartScreen(id));
                }}
              />
              <p className="mt-6 text-[12px] leading-relaxed text-ink-500">
                Or use the phone preview to start from Get Started — tap Discover, Accept invitation, or Login.
              </p>
            </div>

            <div className="order-1 lg:order-2">
              <PrototypePhonePreview screenId={screenId} screen={screen} />
            </div>
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
                  Tap buttons and list rows on each screen to advance. On player screens, tap the centre control to
                  finish the session.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <PrototypePhonePreview screenId={screenId} screen={screen} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
