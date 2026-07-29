import {
  ArrowRight,
  ChevronRight,
  Search,
  Plus,
  Play,
  Pause,
  Check,
  Upload,
  Download,
  QrCode,
  Mail,
  Smartphone,
  Building2,
  Users,
  BarChart3,
  Settings,
  Home,
  Compass,
  User,
  Headphones,
  AlertCircle,
  Info,
} from "lucide-react";

export const DESKTOP_W = 860;
export const MOBILE_W = 300;

export function FlowArrow({ label, vertical = false }) {
  if (vertical) {
    return (
      <div className="flex flex-col items-center gap-1 py-2 text-ink-400" aria-hidden>
        <div className="h-6 w-px bg-ink-300" />
        {label ? <span className="max-w-[8rem] text-center text-[10px] font-medium uppercase tracking-[0.08em]">{label}</span> : null}
        <ChevronRight className="h-3.5 w-3.5 rotate-90" />
      </div>
    );
  }
  return (
    <div className="flex shrink-0 items-center gap-1 self-center px-2 text-ink-400" aria-hidden>
      {label ? <span className="max-w-[5.5rem] text-center text-[10px] font-medium uppercase tracking-[0.08em] leading-tight">{label}</span> : null}
      <ArrowRight className="h-4 w-4 shrink-0" />
    </div>
  );
}

export function AnnotationCard({ children, className = "" }) {
  return (
    <aside
      className={`max-w-[16rem] rounded-lg border border-amber-300/70 bg-amber-50 px-3 py-2.5 text-[11px] leading-relaxed text-amber-950 shadow-sm ${className}`}
    >
      <p className="mb-1 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-amber-700/80">
        <Info className="h-3 w-3" /> Product question
      </p>
      {children}
    </aside>
  );
}

export function BranchLabel({ children }) {
  return (
    <div className="my-2 inline-flex rounded-full border border-ink-300 bg-ink-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-600">
      {children}
    </div>
  );
}

export function DesktopFrame({ children, className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-ink-300 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] ${className}`}
      style={{ width: DESKTOP_W, minHeight: 420 }}
    >
      <div className="flex h-7 items-center gap-1.5 border-b border-ink-200 bg-ink-50 px-3">
        <span className="h-2 w-2 rounded-full bg-ink-300" />
        <span className="h-2 w-2 rounded-full bg-ink-300" />
        <span className="h-2 w-2 rounded-full bg-ink-300" />
        <span className="ml-3 h-3 flex-1 rounded bg-ink-100" />
      </div>
      <div className="min-h-[380px] p-5 text-ink-900">{children}</div>
    </div>
  );
}

export function MobileFrame({ children, className = "", flush = false }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.85rem] border-[1.5px] border-ink-800/80 bg-[#faf9f7] shadow-[0_16px_40px_rgba(0,0,0,0.12)] ${className}`}
      style={{ width: MOBILE_W, height: 580 }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-10 bg-gradient-to-b from-[#faf9f7] to-transparent" />
      <div className="absolute left-1/2 top-2.5 z-30 h-3.5 w-[72px] -translate-x-1/2 rounded-full bg-ink-900/90" />
      <div className={`h-full overflow-y-auto text-ink-900 ${flush ? "" : "px-4 pb-5 pt-9"}`}>
        {children}
      </div>
    </div>
  );
}

export function ScreenMeta({ id, title, purpose, frame, beat }) {
  const frameLabel =
    frame === "desktop"
      ? "Desktop"
      : frame === "mobile"
        ? "Mobile"
        : frame === "email"
          ? "Email"
          : frame === "sms"
            ? "SMS"
            : "Physical";
  return (
    <div className="mb-3.5 max-w-[720px]">
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="font-mono text-[11px] tabular-nums text-ink-400">{id}</span>
        <span className="rounded border border-ink-200 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.1em] text-ink-500">
          {frameLabel}
        </span>
        {beat ? (
          <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-ink-600">
            {beat}
          </span>
        ) : null}
      </div>
      <h3 className="mt-1.5 text-[16px] font-medium tracking-tight text-ink-950">{title}</h3>
      {purpose ? <p className="mt-1.5 max-w-[34ch] text-[12px] leading-relaxed text-ink-500">{purpose}</p> : null}
    </div>
  );
}

/** Tiny greyscale UI atoms for wireframe interiors */
export function WfBtn({ children, primary = false, full = false, ghost = false }) {
  if (ghost) {
    return (
      <button type="button" className={`text-[12px] text-ink-600 underline-offset-2 ${full ? "w-full text-center" : ""}`}>
        {children}
      </button>
    );
  }
  return (
    <button
      type="button"
      className={`rounded-full px-4 py-3 text-[13px] font-medium tracking-tight ${full ? "w-full" : ""} ${
        primary
          ? "bg-ink-950 text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
          : "border border-ink-300 bg-white text-ink-800"
      }`}
    >
      {children}
    </button>
  );
}

export function WfField({ label, value = "", placeholder }) {
  return (
    <label className="block">
      <span className="text-[11px] font-medium text-ink-600">{label}</span>
      <div className="mt-1 rounded-md border border-ink-300 bg-ink-50/50 px-2.5 py-2 text-[12px] text-ink-500">
        {value || placeholder || " "}
      </div>
    </label>
  );
}

export function WfNav({ items = [], active }) {
  return (
    <nav className="flex flex-wrap gap-1 border-b border-ink-200 pb-2 text-[11px]">
      {items.map((item) => (
        <span
          key={item}
          className={`rounded px-2 py-1 ${item === active ? "bg-ink-900 text-white" : "text-ink-500"}`}
        >
          {item}
        </span>
      ))}
    </nav>
  );
}

export function WfStat({ label, value, hint }) {
  return (
    <div className="rounded-xl border border-ink-200/90 bg-gradient-to-b from-white to-ink-50/60 px-3 py-3 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
      <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink-400">{label}</p>
      <p className="mt-1.5 text-[20px] font-medium leading-none tracking-tight text-ink-950">{value}</p>
      {hint ? <p className="mt-1.5 text-[10px] leading-snug text-ink-400">{hint}</p> : null}
    </div>
  );
}

export function WfCard({ title, meta, children, action }) {
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-3.5 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
      {title ? <p className="text-[14px] font-medium tracking-tight text-ink-900">{title}</p> : null}
      {meta ? <p className="mt-0.5 text-[11px] text-ink-500">{meta}</p> : null}
      {children ? <div className="mt-2 text-[12px] leading-relaxed text-ink-600">{children}</div> : null}
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  );
}

export function WfLogo({ src, label, size = "md", className = "" }) {
  const dims = size === "lg" ? "h-14 w-14" : size === "sm" ? "h-7 w-7" : "h-10 w-10";
  if (src) {
    return (
      <img
        src={src}
        alt={label || ""}
        className={`${dims} shrink-0 rounded-lg object-contain ${className}`}
      />
    );
  }
  return (
    <div
      className={`flex ${dims} shrink-0 items-center justify-center rounded-lg border border-ink-300 bg-ink-50 text-[9px] font-semibold text-ink-600 ${className}`}
    >
      {label || "LOGO"}
    </div>
  );
}

export function WfRow({ left, right, badge, logoSrc, logoLabel, sub }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-ink-100 py-3 last:border-0">
      <div className="flex min-w-0 items-center gap-2.5">
        {logoSrc || logoLabel ? <WfLogo src={logoSrc} label={logoLabel} size="sm" /> : null}
        <div className="min-w-0">
          <div className="text-[13px] font-medium text-ink-900">{left}</div>
          {sub ? <p className="mt-0.5 text-[11px] text-ink-400">{sub}</p> : null}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 text-[11px] text-ink-500">
        {right}
        {badge ? (
          <span className="rounded-full border border-ink-200 bg-ink-50 px-2 py-0.5 text-[10px] font-medium text-ink-600">
            {badge}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function WfStepper({ steps, current }) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {steps.map((step, i) => (
        <span
          key={step}
          className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
            i + 1 === current ? "bg-ink-900 text-white" : "bg-ink-100 text-ink-500"
          }`}
        >
          {i + 1} {step}
        </span>
      ))}
    </div>
  );
}

export function WfOption({ title, body, selected = false, badge }) {
  return (
    <div
      className={`rounded-xl border p-3.5 transition-colors ${
        selected ? "border-ink-800 bg-ink-50 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]" : "border-ink-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[13px] font-medium text-ink-900">{title}</p>
        {badge ? <span className="text-[10px] text-ink-400">{badge}</span> : null}
      </div>
      {body ? <p className="mt-1.5 text-[11px] leading-relaxed text-ink-600">{body}</p> : null}
    </div>
  );
}

export function WfIconBar({ icons, active }) {
  const map = { home: Home, discover: Compass, progress: BarChart3, profile: User };
  return (
    <div className="mt-auto flex justify-around border-t border-ink-200/90 bg-white/90 pt-2.5 backdrop-blur-sm">
      {icons.map((key) => {
        const Icon = map[key] || Home;
        const on = active ? key === active : false;
        return (
          <div
            key={key}
            className={`flex flex-col items-center gap-0.5 ${on ? "text-ink-950" : "text-ink-400"}`}
          >
            <Icon className={`h-4 w-4 ${on ? "stroke-[2.25]" : ""}`} />
            <span className={`text-[9px] capitalize ${on ? "font-semibold" : ""}`}>{key}</span>
          </div>
        );
      })}
    </div>
  );
}

export const Icons = {
  Search,
  Plus,
  Play,
  Pause,
  Check,
  Upload,
  Download,
  QrCode,
  Mail,
  Smartphone,
  Building2,
  Users,
  BarChart3,
  Settings,
  Headphones,
  AlertCircle,
  ChevronRight,
};
