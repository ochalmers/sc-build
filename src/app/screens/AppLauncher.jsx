import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEMO_CREDENTIALS } from "../data/catalog.js";
import { useAppStore } from "../context/AppStore.jsx";
import { AppChrome } from "../components/AppChrome.jsx";

const SURFACES = [
  {
    id: "listener",
    label: "Listener",
    surface: "Mobile · provisioned",
    description:
      "Invite redeem, onboarding, Home / Profile, session journey, player, reflection, and support.",
    to: "/app/listener/email",
    hint: `${DEMO_CREDENTIALS.listener.email} / ${DEMO_CREDENTIALS.listener.password} · invite ${DEMO_CREDENTIALS.listener.inviteCode}`,
  },
  {
    id: "admin",
    label: "Admin",
    surface: "CMS + ops",
    description: "Dashboard, Session CMS, Organizations, invite links, multi-org export, and analytics.",
    to: "/app/admin",
    hint: `${DEMO_CREDENTIALS.admin.email} / ${DEMO_CREDENTIALS.admin.password}`,
  },
];

export function AppLauncher() {
  const { loginAdmin, logout, resetApp } = useAppStore();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Fresh demo every time you land on the launcher.
  useEffect(() => {
    resetApp();
    // Only on mount - avoid re-running when resetApp identity changes after reset.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function enter(surfaceId) {
    setError("");

    if (surfaceId === "listener") {
      logout();
      navigate("/app/listener/email");
      return;
    }

    if (surfaceId === "admin") {
      const r = loginAdmin({
        email: DEMO_CREDENTIALS.admin.email,
        password: DEMO_CREDENTIALS.admin.password,
      });
      if (!r.ok) return setError(r.error);
      navigate("/app/admin");
    }
  }

  return (
    <AppChrome
      simple
      framed={false}
      title="app v2.0 prototypes"
      subtitle="Semi-working build of the Mobile App PRD - Listener and Admin. Demo state resets each time you return here."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {SURFACES.map((s) => (
          <article
            key={s.id}
            className="flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6"
          >
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">{s.surface}</p>
            <h2 className="mt-2 text-[1.35rem] font-medium tracking-tight text-white">{s.label}</h2>
            <p className="mt-3 flex-1 text-[13px] leading-relaxed text-white/55">{s.description}</p>
            <p className="mt-4 font-mono text-[10px] leading-relaxed text-white/35">{s.hint}</p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => enter(s.id)}
                className="rounded-full bg-white px-4 py-2 text-[12px] font-medium text-black"
              >
                Enter
              </button>
            </div>
          </article>
        ))}
      </div>

      {error ? <p className="mt-6 text-[13px] text-red-300">{error}</p> : null}
    </AppChrome>
  );
}
