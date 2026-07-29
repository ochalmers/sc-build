import { Link, useLocation } from "react-router-dom";
import { useAppStore } from "../context/AppStore.jsx";
import { AdminDesktopFrame } from "./AdminDesktopFrame.jsx";
import PinComments from "../../components/comments/PinComments.jsx";

/**
 * Content chrome for Partner / Admin - header brand/switcher lives in AppShell.
 * Admin screens render inside a fixed desktop window; overflow scrolls in-pane.
 * Pass `sidebar` for a left-hand rail (Admin); `nav` remains a top bar (Partner).
 */
export function AppChrome({
  children,
  title,
  subtitle,
  nav,
  sidebar,
  actions,
  simple,
  framed = true,
}) {
  const { pathname, search } = useLocation();
  const { role, user, logout } = useAppStore();
  const commentScope = `app:${pathname}${search}`;

  const accountBar =
    !simple && role && user ? (
      <div className="flex flex-wrap items-center gap-3 text-[12px] text-white/55">
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
        {actions}
      </div>
    ) : actions ? (
      <div className="flex flex-wrap items-center gap-3">{actions}</div>
    ) : null;

  const topBar =
    nav || accountBar ? (
      <div className="shrink-0 border-b border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3 md:px-7">
          <div className="flex items-center gap-1">{nav}</div>
          {accountBar}
        </div>
      </div>
    ) : null;

  const header =
    title || subtitle ? (
      <div className="px-5 pt-8 md:px-7">
        {title ? (
          <h1 className="text-[clamp(1.6rem,3vw,2.2rem)] font-medium tracking-tight text-white">
            {title}
          </h1>
        ) : null}
        {subtitle ? (
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-white/55">{subtitle}</p>
        ) : null}
      </div>
    ) : null;

  const main = (
    <>
      {header}
      <main className="px-5 py-8 md:px-7 md:py-10">{children}</main>
    </>
  );

  if (!framed) {
    return (
      <PinComments scopeKey={commentScope}>
        <div className="relative text-[#f4f4f4]">
          <div
            className="pointer-events-none fixed inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(80% 50% at 20% -10%, rgba(255,255,255,0.05), transparent 55%), radial-gradient(60% 40% at 90% 10%, rgba(255,255,255,0.03), transparent 50%)",
            }}
            aria-hidden
          />
          {topBar ? <div className="relative z-10">{topBar}</div> : null}
          <div className="relative z-10 mx-auto max-w-6xl">{main}</div>
        </div>
      </PinComments>
    );
  }

  if (sidebar) {
    return (
      <div className="relative text-[#f4f4f4]">
        <AdminDesktopFrame sidebar={sidebar} title="Sonocea Admin">
          <div className="flex h-full min-h-0 flex-col">
            {accountBar ? (
              <div className="flex shrink-0 justify-end border-b border-white/10 px-5 py-3 md:px-7">
                {accountBar}
              </div>
            ) : null}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{main}</div>
          </div>
        </AdminDesktopFrame>
      </div>
    );
  }

  return (
    <div className="relative text-[#f4f4f4]">
      <AdminDesktopFrame bare title="Sonocea Admin">
        <div className="flex h-full min-h-0 flex-col">
          {topBar}
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{main}</div>
        </div>
      </AdminDesktopFrame>
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
