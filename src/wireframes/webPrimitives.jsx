import { getWireframePalette, WF_TYPE } from "./tokens.js";
import { WireframeContext, useWf, WfPlaceholder } from "./primitives.jsx";

const PARTNER_NAV = ["Dashboard", "Listeners", "Invite", "Settings"];
const ADMIN_NAV = ["Dashboard", "Sessions", "Listeners", "Organisations", "Analytics"];

export function DesktopWireframeShell({
  product = "Console",
  nav,
  activeNav,
  children,
  tone = "light",
  layout = "app",
}) {
  const palette = getWireframePalette(tone);

  if (layout === "auth") {
    return (
      <WireframeContext.Provider value={palette}>
        <div
          className="flex h-full w-full items-center justify-center overflow-hidden px-8"
          style={{ background: palette.bg, color: palette.text }}
        >
          <div
            className="w-full max-w-[220px] rounded-xl border p-5"
            style={{ borderColor: palette.border, background: palette.surface }}
          >
            {children}
          </div>
        </div>
      </WireframeContext.Provider>
    );
  }

  return (
    <WireframeContext.Provider value={palette}>
      <div
        className="flex h-full w-full overflow-hidden"
        style={{ background: palette.bg, color: palette.text }}
      >
        <aside
          className="flex w-[34%] shrink-0 flex-col border-r"
          style={{ borderColor: palette.border, background: palette.surfaceMuted }}
        >
          <div className="border-b px-3 py-2.5" style={{ borderColor: palette.border }}>
            <p className={`${WF_TYPE.tag}`} style={{ color: palette.textMuted }}>
              {product}
            </p>
          </div>
          <nav className="space-y-0.5 p-2">
            {nav.map((item) => {
              const active = item === activeNav;
              return (
                <div
                  key={item}
                  className="rounded-md px-2.5 py-1.5"
                  style={{
                    background: active ? palette.surface : "transparent",
                    border: active ? `1px solid ${palette.border}` : "1px solid transparent",
                  }}
                >
                  <p
                    className={WF_TYPE.bodySm}
                    style={{ color: active ? palette.text : palette.textMuted }}
                  >
                    {item}
                  </p>
                </div>
              );
            })}
          </nav>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <div
            className="flex items-center justify-between border-b px-4 py-2"
            style={{ borderColor: palette.border, background: palette.surface }}
          >
            <p className={WF_TYPE.bodySm} style={{ color: palette.textSecondary }}>
              {activeNav}
            </p>
            <WfPlaceholder size="sm" className="!h-5 !w-5 !rounded-full" />
          </div>
          <div className="flex-1 overflow-auto p-4">{children}</div>
        </div>
      </div>
    </WireframeContext.Provider>
  );
}

export function WfDesktopHeadline({ title, subtitle }) {
  const WF = useWf();
  return (
    <div>
      <h2 className={WF_TYPE.titleSm} style={{ color: WF.text }}>
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-1 ${WF_TYPE.bodySm}`} style={{ color: WF.textMuted }}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function WfDesktopMetrics({ items }) {
  const WF = useWf();
  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map(([label, value]) => (
        <div
          key={label}
          className="rounded-lg border border-dashed p-2.5"
          style={{ borderColor: WF.borderStrong, background: WF.surfaceMuted }}
        >
          <p className={WF_TYPE.bodySm} style={{ color: WF.textMuted }}>
            {label}
          </p>
          <p className={`mt-1 ${WF_TYPE.label}`} style={{ color: WF.text }}>
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}

export function WfDesktopTable({ rows, showStatus = true }) {
  const WF = useWf();
  return (
    <div className="space-y-1.5">
      {rows.map((row) => (
        <div
          key={row}
          className="flex items-center justify-between rounded-lg border px-3 py-2"
          style={{ borderColor: WF.border, background: WF.surface }}
        >
          <span className={WF_TYPE.bodySm} style={{ color: WF.text }}>
            {row}
          </span>
          {showStatus ? (
            <span
              className="rounded-full border px-2 py-0.5 text-[8px] uppercase tracking-wide"
              style={{ borderColor: WF.border, color: WF.textMuted }}
            >
              Status
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function WfDesktopField({ label, placeholder }) {
  const WF = useWf();
  return (
    <div>
      {label ? (
        <p className={`mb-1 ${WF_TYPE.bodySm}`} style={{ color: WF.textMuted }}>
          {label}
        </p>
      ) : null}
      <div
        className="rounded-md border px-2.5 py-1.5"
        style={{ borderColor: WF.border, background: WF.surface }}
      >
        <p className={WF_TYPE.bodySm} style={{ color: WF.placeholder }}>
          {placeholder}
        </p>
      </div>
    </div>
  );
}

export function WfDesktopButton({ children, secondary = false }) {
  const WF = useWf();
  return (
    <div
      className="rounded-md px-3 py-1.5 text-center"
      style={{
        background: secondary ? WF.surfaceMuted : WF.fill,
        color: secondary ? WF.textSecondary : WF.surface,
        border: secondary ? `1px solid ${WF.border}` : "none",
      }}
    >
      <p className={`${WF_TYPE.bodySm} font-medium`}>{children}</p>
    </div>
  );
}

export function WfDesktopActions({ children }) {
  return <div className="mt-4 flex flex-wrap gap-2">{children}</div>;
}

export { PARTNER_NAV, ADMIN_NAV };
