import { Link } from "react-router-dom";
import { useAppStore } from "../context/AppStore.jsx";

/**
 * Content chrome for Partner / Admin — header brand/switcher lives in AppShell.
 */
export function AppChrome({ children, title, subtitle, nav, actions, simple }) {
  const { role, user, logout } = useAppStore();

  return (
    <div className="relative text-[#f4f3ef]">
      <div
        className="pointer-events-none fixed inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(80% 50% at 20% -10%, rgba(180,160,120,0.18), transparent 55%), radial-gradient(60% 40% at 90% 10%, rgba(90,110,130,0.2), transparent 50%)",
        }}
        aria-hidden
      />

      {(nav || (!simple && role && user) || actions) && (
        <div className="relative z-10 border-b border-white/10">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-3 md:px-8">
            <div className="flex items-center gap-1">{nav}</div>
            <div className="flex flex-wrap items-center gap-3 text-[12px] text-white/55">
              {!simple && role && user ? (
                <>
                  <span className="rounded-full border border-white/15 px-3 py-1 capitalize text-white/80">
                    {role}
                    {user.name ? ` · ${user.name}` : ""}
                  </span>
                  <button
                    type="button"
                    onClick={logout}
                    className="text-white/60 underline-offset-4 hover:text-white hover:underline"
                  >
                    Sign out
                  </button>
                </>
              ) : null}
              {actions}
            </div>
          </div>
        </div>
      )}

      {(title || subtitle) && (
        <div className="relative z-10 mx-auto max-w-6xl px-5 pt-8 md:px-8">
          {title ? (
            <h1 className="text-[clamp(1.6rem,3vw,2.2rem)] font-medium tracking-tight text-white">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-white/55">{subtitle}</p>
          ) : null}
        </div>
      )}

      <main className="relative z-10 mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">{children}</main>
    </div>
  );
}

export function ConsoleNavLink({ to, children, active }) {
  return (
    <Link
      to={to}
      className={`rounded-full px-3 py-1.5 text-[12px] transition-colors ${
        active ? "bg-white/15 text-white" : "text-white/50 hover:text-white/80"
      }`}
    >
      {children}
    </Link>
  );
}
