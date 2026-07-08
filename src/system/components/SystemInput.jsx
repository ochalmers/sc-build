import { useResolvedMode } from "./ModeChrome.jsx";

export function SystemInput({ placeholder = "Placeholder", mode = "regulation" }) {
  const resolved = useResolvedMode(mode);
  return (
    <div style={resolved.cssVars}>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full rounded-xl border px-3 py-2.5 text-[13px] outline-none ring-0 focus:border-[var(--proto-accent)]"
      style={{
        borderColor: "var(--proto-border)",
        background: "var(--proto-surface-elevated)",
        color: "var(--proto-text)",
      }}
    />
    </div>
  );
}
