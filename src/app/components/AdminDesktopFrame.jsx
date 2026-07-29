import { SystemBrandLogo } from "../../system/components/SystemBrandLogo.jsx";
import { SystemLogoMark } from "../../system/components/SystemLogoMark.jsx";

/**
 * Fixed desktop window for Admin review - chrome stays put; content scrolls inside.
 * Same height/width across every Admin screen so the Combined flow feels like one OS window.
 */
export const ADMIN_DESKTOP = {
  /** Matches available stage below AppShell header + padding. */
  height: "min(760px, calc(100dvh - 7.5rem))",
  surface: "#141414",
};

export function AdminDesktopFrame({
  children,
  sidebar,
  bare = false,
  title = "Sonocea Admin",
  partnerLogoSrc,
  partnerName,
}) {
  return (
    <div className="w-full">
      <div
        className="flex flex-col overflow-hidden rounded-2xl border border-black/10 shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
        style={{
          height: ADMIN_DESKTOP.height,
          backgroundColor: ADMIN_DESKTOP.surface,
        }}
      >
        <div className="flex shrink-0 items-center gap-2 border-b border-white/10 px-5 py-3.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <div className="ml-3 flex min-w-0 items-center gap-2.5">
            <SystemLogoMark className="h-4 w-auto text-white" title="Sonocea" />
            <span className="truncate text-[13px] text-white/45">{title}</span>
            {partnerLogoSrc ? (
              <>
                <span className="text-[11px] text-white/25" aria-hidden>
                  ×
                </span>
                <img
                  src={partnerLogoSrc}
                  alt={partnerName || "Organisation"}
                  className="h-5 w-auto max-w-[56px] object-contain"
                  decoding="async"
                />
              </>
            ) : null}
          </div>
          <div className="ml-auto hidden items-center sm:flex">
            <SystemBrandLogo className="h-3.5 w-auto brightness-0 invert opacity-50" />
          </div>
        </div>

        {bare ? (
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
        ) : (
          <div className="flex min-h-0 flex-1">
            {sidebar}
            <div className="min-h-0 min-w-0 flex-1 overflow-hidden border-l border-white/10">
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
