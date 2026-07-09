import { SystemBrandLogo } from "./SystemBrandLogo.jsx";

export function SystemAppScreen({ children, title = "Session" }) {
  return (
    <div
      className="relative mx-auto w-full max-w-[280px] overflow-hidden rounded-[1.75rem] border shadow-xl"
      style={{
        borderColor: "var(--proto-border)",
        background: "var(--proto-bg)",
        boxShadow: "0 20px 50px rgba(10,10,9,.12)",
        minHeight: "420px",
      }}
    >
      <div className="absolute left-1/2 top-2 z-10 h-4 w-12 -translate-x-1/2 rounded-full bg-black/10" />
      <div className="flex items-center justify-between border-b px-4 pb-3 pt-8" style={{ borderColor: "var(--proto-border)" }}>
        <SystemBrandLogo className="h-3.5 w-auto max-w-[100px]" />
        <span className="text-[11px]" style={{ color: "var(--proto-text-muted)" }}>
          {title}
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
