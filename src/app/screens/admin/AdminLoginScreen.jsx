import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DEMO_CREDENTIALS } from "../../data/catalog.js";
import { useAppStore } from "../../context/AppStore.jsx";
import { AppChrome } from "../../components/AppChrome.jsx";
import { fieldClass, labelClass } from "./adminShared.jsx";

/**
 * Explicit Admin sign-in for the Combined review journey.
 * Standalone Admin tab still auto-enters via RequireAdmin.
 */
export function AdminLoginScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loginAdmin, logout, role } = useAppStore();
  const [email, setEmail] = useState(DEMO_CREDENTIALS.admin.email);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const verified = searchParams.get("step") === "verified" && role === "admin";

  function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (role && role !== "admin") logout();
    const result = loginAdmin({ email, password });
    if (!result.ok) {
      setError(result.error || "Sign-in failed.");
      return;
    }
    navigate("/app/admin/login?step=verified");
  }

  function continueToDashboard() {
    navigate("/app/admin");
  }

  return (
    <AppChrome
      title="Admin sign-in"
      subtitle="Authenticate into the Sonocea Admin console to provision organisations, Listeners, and invites."
      nav={null}
    >
      <div className="mx-auto max-w-md">
        {verified ? (
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-6">
            <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-200/70">Signed in</p>
            <h2 className="mt-2 text-[1.25rem] font-medium text-white">Credentials verified</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-white/55">
              You’re in as Sonocea Admin. Next: review the dashboard, then create or configure an
              organisation before inviting Listeners.
            </p>
            <button
              type="button"
              onClick={continueToDashboard}
              className="mt-6 rounded-full bg-white px-5 py-2.5 text-[12px] font-medium text-black"
            >
              Continue to dashboard
            </button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6"
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">Sonocea Admin</p>
              <h2 className="mt-2 text-[1.25rem] font-medium text-white">Sign in</h2>
              <p className="mt-2 text-[13px] text-white/50">
                Demo: {DEMO_CREDENTIALS.admin.email} / {DEMO_CREDENTIALS.admin.password}
              </p>
            </div>
            <label className="block">
              <span className={labelClass}>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={fieldClass}
                autoComplete="username"
                required
              />
            </label>
            <label className="block">
              <span className={labelClass}>Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={fieldClass}
                autoComplete="current-password"
                placeholder="admin"
                required
              />
            </label>
            {error ? <p className="text-[13px] text-red-300/90">{error}</p> : null}
            <button
              type="submit"
              className="w-full rounded-full bg-white px-5 py-2.5 text-[12px] font-medium text-black"
            >
              Sign in
            </button>
          </form>
        )}
      </div>
    </AppChrome>
  );
}
