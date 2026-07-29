import { Link } from "react-router-dom";
import {
  DesktopFrame,
  MobileFrame,
  WfBtn,
  WfField,
  WfNav,
  WfStat,
  WfCard,
  WfRow,
  WfLogo,
  WfStepper,
  WfOption,
  WfIconBar,
  Icons,
} from "./BoardPrimitives";
import { SONOCEA_MARK } from "../../content/endToEnd/partners.js";

function PrimarySecondary({ primary, secondary = [] }) {
  if (!primary && !secondary.length) return null;
  return (
    <div className="mt-4 space-y-2">
      {primary ? <WfBtn primary full>{primary}</WfBtn> : null}
      {secondary.map((s) => (
        <div key={s} className="text-center">
          <WfBtn ghost>{s}</WfBtn>
        </div>
      ))}
    </div>
  );
}

const ADMIN_NAV_HREF = {
  Overview: "/app/admin",
  Organisations: "/app/admin/organizations",
  Organizations: "/app/admin/organizations",
  Programmes: "/app/admin/programmes",
  Participants: "/app/admin/listeners",
  Content: "/app/admin/content",
  Insights: "/app/admin/analytics",
  Settings: "/app/admin/settings",
  Export: "/app/admin/settings",
};

function AdminChrome({ nav = [], active, title, children, cta }) {
  return (
    <div className="grid grid-cols-[160px_1fr] gap-4">
      <aside className="space-y-1 border-r border-ink-100 pr-3">
        <p className="mb-3 text-[11px] font-semibold tracking-tight text-ink-900">Sonocea Admin</p>
        {nav.map((item) => {
          const href = ADMIN_NAV_HREF[item];
          const className = `block w-full rounded px-2 py-1.5 text-left text-[11px] ${
            item === active ? "bg-ink-900 text-white" : "text-ink-500 hover:text-ink-800"
          }`;
          return href ? (
            <Link key={item} to={href} className={className}>
              {item}
            </Link>
          ) : (
            <div key={item} className={className}>
              {item}
            </div>
          );
        })}
      </aside>
      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h4 className="text-[15px] font-medium text-ink-900">{title}</h4>
          {cta ? <WfBtn primary>{cta}</WfBtn> : null}
        </div>
        {children}
      </div>
    </div>
  );
}

function renderBlocks(blocks = []) {
  return blocks.map((b, i) => {
    switch (b.type) {
      case "heading":
        return (
          <h4
            key={i}
            className={`font-medium tracking-tight text-ink-950 ${
              b.size === "xl" ? "text-[28px] leading-[1.1]" : b.size === "lg" ? "text-[22px] leading-[1.15]" : "text-[17px] leading-snug"
            }`}
          >
            {b.text}
          </h4>
        );
      case "eyebrow":
        return (
          <p key={i} className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-400">
            {b.text}
          </p>
        );
      case "sub":
        return (
          <p key={i} className="text-[13px] leading-relaxed text-ink-500">
            {b.text}
          </p>
        );
      case "logo":
        return (
          <div key={i} className="mb-3">
            <WfLogo src={b.src} label={b.label} size={b.size || "md"} />
          </div>
        );
      case "lockup":
        return (
          <div key={i} className="mb-1 flex items-center gap-2">
            <WfLogo src={b.partnerSrc} label={b.partnerLabel} size="sm" />
            <span className="text-[11px] font-medium text-ink-400">×</span>
            <WfLogo src={b.brandSrc || SONOCEA_MARK} label={b.brandLabel || "Sonocea"} size="sm" />
            {b.title ? <span className="ml-1 text-[12px] font-medium text-ink-800">{b.title}</span> : null}
          </div>
        );
      case "field":
        return <WfField key={i} label={b.label} value={b.value} placeholder={b.placeholder} />;
      case "fields":
        return (
          <div key={i} className="grid gap-2.5">
            {b.items.map((f) => (
              <WfField key={f.label} label={f.label} value={f.value} placeholder={f.placeholder} />
            ))}
          </div>
        );
      case "button":
        return (
          <WfBtn key={i} primary={b.primary} full={b.full !== false} ghost={b.ghost}>
            {b.label}
          </WfBtn>
        );
      case "link":
        return (
          <p key={i} className="text-center text-[12px] text-ink-500 underline">
            {b.label}
          </p>
        );
      case "stats":
        return (
          <div
            key={i}
            className={`grid gap-2 ${
              b.cols === 2 ? "grid-cols-2" : b.cols === 3 ? "grid-cols-3" : b.cols === 4 ? "grid-cols-2" : "grid-cols-3"
            }`}
          >
            {b.items.map((s) => (
              <WfStat key={s.label} label={s.label} value={s.value} hint={s.hint} />
            ))}
          </div>
        );
      case "nav":
        return <WfNav key={i} items={b.items} active={b.active} />;
      case "stepper":
        return <WfStepper key={i} steps={b.steps} current={b.current} />;
      case "rows":
        return (
          <div key={i} className="overflow-hidden rounded-xl border border-ink-200 bg-white px-3.5">
            {b.items.map((r, ri) => (
              <WfRow
                key={ri}
                left={r.left}
                right={r.right}
                badge={r.badge}
                logoSrc={r.logoSrc}
                logoLabel={r.logoLabel}
                sub={r.sub}
              />
            ))}
          </div>
        );
      case "cards":
        return (
          <div key={i} className="grid gap-2.5">
            {b.items.map((c) => (
              <WfCard key={c.title} title={c.title} meta={c.meta} action={c.action ? <WfBtn>{c.action}</WfBtn> : null}>
                {c.body}
              </WfCard>
            ))}
          </div>
        );
      case "options":
        return (
          <div key={i} className={`grid gap-2 ${b.cols === 3 ? "grid-cols-3" : b.cols === 2 ? "grid-cols-2" : ""}`}>
            {b.items.map((o) => (
              <WfOption key={o.title} title={o.title} body={o.body} selected={o.selected} badge={o.badge} />
            ))}
          </div>
        );
      case "checks":
        return (
          <div key={i} className="space-y-1.5">
            {b.items.map((c) => (
              <label key={c} className="flex items-center gap-2 text-[12px] text-ink-700">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded border border-ink-400 bg-white">
                  {b.checked?.includes(c) ? <Icons.Check className="h-2.5 w-2.5" /> : null}
                </span>
                {c}
              </label>
            ))}
          </div>
        );
      case "preview":
        return (
          <div key={i} className="overflow-hidden rounded-xl border border-ink-200 bg-white shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            {b.atmosphere !== false ? (
              <div
                className="h-20 w-full"
                style={{
                  background:
                    b.tone === "dark"
                      ? "linear-gradient(145deg, #2a2926 0%, #1a1917 55%, #3a3936 100%)"
                      : "linear-gradient(145deg, #d8d6d0 0%, #ebeae5 45%, #cfc9c0 100%)",
                }}
                aria-hidden
              />
            ) : null}
            <div className="p-3.5 text-left">
              {b.logoSrc || b.logo ? (
                <div className="mb-2 flex justify-start">
                  <WfLogo src={b.logoSrc} label={b.logo} size={b.logoSize || "sm"} />
                </div>
              ) : null}
              <p className="text-[15px] font-medium tracking-tight text-ink-900">{b.title}</p>
              {b.sub ? <p className="mt-0.5 text-[11px] text-ink-400">{b.sub}</p> : null}
              {b.body ? <p className="mt-2 text-[12px] leading-relaxed text-ink-600">{b.body}</p> : null}
            </div>
          </div>
        );
      case "list":
        return (
          <ul key={i} className="space-y-2 text-[12px] text-ink-700">
            {b.items.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-400" aria-hidden />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        );
      case "kv":
        return (
          <dl key={i} className="space-y-2 rounded-xl border border-ink-200 bg-white p-3.5">
            {b.items.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 text-[12px]">
                <dt className="text-ink-500">{k}</dt>
                <dd className="font-medium text-ink-900">{v}</dd>
              </div>
            ))}
          </dl>
        );
      case "chips":
        return (
          <div key={i} className="flex flex-wrap gap-1.5">
            {b.items.map((c) => (
              <span
                key={c}
                className={`rounded-full border px-3 py-1.5 text-[11px] font-medium ${
                  c === b.active ? "border-ink-900 bg-ink-950 text-white" : "border-ink-200 bg-white text-ink-600"
                }`}
              >
                {c}
              </span>
            ))}
          </div>
        );
      case "search":
        return (
          <div key={i} className="flex items-center gap-2 rounded-xl border border-ink-300 bg-white px-3 py-2.5 text-[12px] text-ink-400">
            <Icons.Search className="h-3.5 w-3.5" />
            {b.placeholder || "Search"}
          </div>
        );
      case "split":
        return (
          <div key={i} className="grid grid-cols-[1fr_180px] gap-3">
            <div className="space-y-2">{renderBlocks(b.left)}</div>
            <div className="rounded-xl border border-ink-200 bg-ink-50/40 p-2.5">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-400">{b.rightTitle}</p>
              {renderBlocks(b.right)}
            </div>
          </div>
        );
      case "week":
        return (
          <div key={i} className="rounded-xl border border-ink-200 bg-white p-3.5">
            <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-400">{b.label}</p>
            <div className="space-y-2.5">
              {b.sessions.map((s) => (
                <div key={s.title} className="flex items-center justify-between gap-2 text-[12px]">
                  <div>
                    <p className="font-medium text-ink-900">{s.title}</p>
                    <p className="text-[11px] text-ink-500">
                      {s.meta}
                      {s.rec ? ` · Rec: ${s.rec}` : ""}
                    </p>
                  </div>
                  <span className="rounded-full border border-ink-200 px-2 py-0.5 text-[10px] text-ink-500">
                    {s.mode || "Recommended"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      case "table":
        return (
          <div key={i} className="overflow-hidden rounded-xl border border-ink-200">
            <div
              className="grid gap-2 border-b border-ink-200 bg-ink-50 px-2.5 py-2 text-[10px] uppercase tracking-[0.06em] text-ink-400"
              style={{ gridTemplateColumns: `repeat(${b.columns.length}, minmax(0,1fr))` }}
            >
              {b.columns.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
            {b.rows.map((row, ri) => (
              <div
                key={ri}
                className="grid gap-2 border-b border-ink-100 px-2.5 py-2.5 text-[11px] text-ink-700 last:border-0"
                style={{ gridTemplateColumns: `repeat(${b.columns.length}, minmax(0,1fr))` }}
              >
                {row.map((cell, ci) => (
                  <span key={ci}>{cell}</span>
                ))}
              </div>
            ))}
          </div>
        );
      case "chart": {
        const bars = b.bars || [28, 62, 48, 78, 55, 88, 40];
        const labels = b.labels || ["M", "T", "W", "T", "F", "S", "S"];
        const active = b.active ?? 5;
        return (
          <div key={i} className="rounded-xl border border-ink-200 bg-white p-3.5">
            <div className="mb-3 flex items-end justify-between gap-2">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-400">
                  {b.label || "This week"}
                </p>
                {b.caption ? <p className="mt-1 text-[12px] text-ink-500">{b.caption}</p> : null}
              </div>
              {b.summary ? <p className="text-[13px] font-medium text-ink-900">{b.summary}</p> : null}
            </div>
            <div className="flex h-28 items-end gap-2 px-0.5">
              {bars.map((h, hi) => (
                <div key={hi} className="flex flex-1 flex-col items-center gap-1.5">
                  <div
                    className={`w-full rounded-t-md transition-colors ${
                      hi === active ? "bg-ink-900" : "bg-ink-200"
                    }`}
                    style={{ height: `${Math.max(8, h)}%` }}
                  />
                  <span className={`text-[9px] ${hi === active ? "font-semibold text-ink-900" : "text-ink-400"}`}>
                    {labels[hi] ?? ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      }
      case "weekStrip": {
        const days = b.days || [
          { label: "M", on: true },
          { label: "T", on: true },
          { label: "W", on: false },
          { label: "T", on: true },
          { label: "F", on: false },
          { label: "S", on: false },
          { label: "S", on: false },
        ];
        return (
          <div key={i} className="rounded-xl border border-ink-200 bg-white px-3 py-3">
            {b.label ? (
              <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-400">{b.label}</p>
            ) : null}
            <div className="flex justify-between gap-1.5">
              {days.map((d, di) => (
                <div key={di} className="flex flex-1 flex-col items-center gap-1.5">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-medium ${
                      d.on ? "bg-ink-950 text-white" : "bg-ink-100 text-ink-400"
                    }`}
                  >
                    {d.on ? "✓" : d.label}
                  </span>
                  <span className="text-[9px] text-ink-400">{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }
      case "rating":
        return (
          <div key={i} className="space-y-2">
            <div className="flex justify-between gap-2">
              {(b.scale || [1, 2, 3, 4, 5]).map((n) => (
                <span
                  key={n}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border text-[14px] font-medium ${
                    n === b.value
                      ? "border-ink-950 bg-ink-950 text-white"
                      : "border-ink-200 bg-white text-ink-700"
                  }`}
                >
                  {n}
                </span>
              ))}
            </div>
            <p className="text-center text-[10px] text-ink-400">
              {b.lowLabel || "1 unsettled"} · {b.highLabel || "5 settled"}
            </p>
          </div>
        );
      case "player":
        return (
          <div key={i} className="relative overflow-hidden rounded-2xl bg-[#161512] px-4 pb-6 pt-8 text-center text-white">
            <div
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(70% 55% at 50% 20%, #3a3936 0%, transparent 60%), radial-gradient(90% 70% at 20% 90%, #2a2926 0%, transparent 55%)",
              }}
              aria-hidden
            />
            <div className="relative">
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
                {b.eyebrow || "Listening"}
              </p>
              <p className="mt-3 text-[18px] font-medium tracking-tight">{b.title}</p>
              {b.partner ? <p className="mt-1 text-[11px] text-white/45">{b.partner}</p> : null}
              <div className="mt-8">
                <div className="h-[2px] rounded-full bg-white/20">
                  <div className="h-full rounded-full bg-white" style={{ width: b.progress || "42%" }} />
                </div>
                <div className="mt-2 flex justify-between text-[11px] text-white/45">
                  <span>{b.elapsed || "08:42"}</span>
                  <span>{b.remaining || "-11:18"}</span>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-center gap-8 text-white/90">
                <span className="text-[11px] text-white/40">−15s</span>
                {b.paused ? <Icons.Play className="h-9 w-9" /> : <Icons.Pause className="h-9 w-9" />}
                <span className="text-[11px] text-white/40">+15s</span>
              </div>
            </div>
          </div>
        );
      case "hero":
        return (
          <div
            key={i}
            className="relative -mx-4 -mt-2 mb-2 overflow-hidden px-4 pb-8 pt-10"
            style={{
              background:
                b.tone === "dark"
                  ? "linear-gradient(180deg, #1c1b19 0%, #faf9f7 100%)"
                  : "radial-gradient(90% 80% at 50% -10%, #d8d6d0 0%, transparent 55%), linear-gradient(180deg, #ebeae5 0%, #faf9f7 100%)",
            }}
          >
            {b.mark ? (
              <div className="mb-6 flex justify-center">
                <WfLogo src={b.markSrc || SONOCEA_MARK} label="Sonocea" size="md" />
              </div>
            ) : null}
            {b.eyebrow ? (
              <p className={`text-center text-[10px] font-semibold uppercase tracking-[0.14em] ${b.tone === "dark" ? "text-white/45" : "text-ink-400"}`}>
                {b.eyebrow}
              </p>
            ) : null}
            {b.title ? (
              <h4
                className={`mt-3 text-center text-[26px] font-medium leading-[1.1] tracking-tight ${
                  b.tone === "dark" ? "text-white" : "text-ink-950"
                }`}
              >
                {b.title}
              </h4>
            ) : null}
            {b.body ? (
              <p className={`mx-auto mt-3 max-w-[28ch] text-center text-[13px] leading-relaxed ${b.tone === "dark" ? "text-white/55" : "text-ink-500"}`}>
                {b.body}
              </p>
            ) : null}
          </div>
        );
      case "sectionLabel":
        return (
          <p key={i} className="pt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">
            {b.text}
          </p>
        );
      case "qr":
        return (
          <div key={i} className="mx-auto flex h-28 w-28 items-center justify-center rounded-xl border-2 border-ink-800 bg-white shadow-sm">
            <Icons.QrCode className="h-16 w-16 text-ink-800" />
          </div>
        );
      case "bottomNav":
        return <WfIconBar key={i} icons={b.items || ["home", "discover", "progress", "profile"]} active={b.active} />;
      case "badge":
        return (
          <span
            key={i}
            className="inline-flex rounded-full border border-ink-300 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-600"
          >
            {b.text}
          </span>
        );
      case "alert":
        return (
          <div key={i} className="flex gap-2.5 rounded-xl border border-ink-300 bg-ink-50 p-3.5 text-[12px] leading-relaxed text-ink-700">
            <Icons.AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              {b.title ? <p className="font-medium text-ink-900">{b.title}</p> : null}
              <p className={b.title ? "mt-1" : ""}>{b.text}</p>
            </div>
          </div>
        );
      case "stack":
        return (
          <div key={i} className="space-y-3">
            {renderBlocks(b.items)}
          </div>
        );
      case "grid2":
        return (
          <div key={i} className="grid grid-cols-2 gap-2">
            {renderBlocks(b.items)}
          </div>
        );
      case "note":
        return (
          <p key={i} className="rounded-xl border border-ink-200 bg-ink-50/80 px-3 py-2 text-[11px] leading-relaxed text-ink-500">
            {b.text}
          </p>
        );
      case "space":
        return <div key={i} className={b.size === "lg" ? "h-5" : "h-2"} />;
      default:
        return null;
    }
  });
}

function ScreenBody({ screen }) {
  const { layout, data = {} } = screen;

  if (layout === "admin") {
    return (
      <AdminChrome nav={data.nav} active={data.active} title={data.title} cta={data.cta}>
        <div className="space-y-3">{renderBlocks(data.blocks)}</div>
      </AdminChrome>
    );
  }

  if (layout === "partner") {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <WfLogo src={data.logoSrc} label={data.logo || "PNE"} size="md" />
          <div>
            <p className="text-[15px] font-medium">{data.org}</p>
            <p className="text-[11px] text-ink-500">{data.subtitle}</p>
          </div>
          {data.status ? <span className="ml-auto rounded-full border border-ink-200 px-2 py-0.5 text-[10px]">{data.status}</span> : null}
        </div>
        {data.tabs ? <WfNav items={data.tabs} active={data.activeTab} /> : null}
        <div className="space-y-3">{renderBlocks(data.blocks)}</div>
        <PrimarySecondary primary={screen.primary} secondary={screen.secondary} />
      </div>
    );
  }

  if (layout === "app-store") {
    const store = data;
    return (
      <div className="flex min-h-[560px] flex-col bg-[#f5f5f7] pb-6 text-ink-900">
        <div className="flex items-center justify-between border-b border-ink-200/80 bg-white/90 px-4 pb-2.5 pt-9 backdrop-blur">
          <span className="text-[12px] font-medium text-[#007AFF]">‹ Search</span>
          <span className="text-[11px] font-semibold text-ink-800">App Store</span>
          <span className="text-[12px] font-medium text-[#007AFF]">•••</span>
        </div>

        <div className="space-y-4 px-4 pt-4">
          <div className="flex gap-3">
            <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-[16px] border border-ink-200 bg-white shadow-sm">
              <img src={store.iconSrc || SONOCEA_MARK} alt="" className="h-12 w-12 object-contain" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[16px] font-semibold leading-tight tracking-tight">{store.appName || "Sonocea"}</p>
              <p className="mt-0.5 text-[12px] text-ink-500">{store.subtitle || "Guided listening for recovery"}</p>
              <p className="mt-0.5 text-[11px] text-[#007AFF]">{store.developer || "Sonocea Ltd"}</p>
              <div className="mt-2.5 flex items-center gap-2">
                <span className="rounded-full bg-[#007AFF] px-4 py-1 text-[12px] font-semibold text-white">
                  {store.cta || "Get"}
                </span>
                <span className="text-[10px] text-ink-400">In-App Purchases</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 border-y border-ink-200/80 py-3">
            {(store.meta || [
              { label: "Ratings", value: "4.8", sub: "★★★★★" },
              { label: "Age", value: "12+", sub: "Years Old" },
              { label: "Category", value: "Health", sub: "& Fitness" },
            ]).map((m) => (
              <div key={m.label} className="text-center">
                <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-ink-400">{m.label}</p>
                <p className="mt-0.5 text-[15px] font-semibold text-ink-800">{m.value}</p>
                <p className="text-[10px] text-ink-400">{m.sub}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="mb-2 text-[13px] font-semibold">Preview</p>
            <div className="flex gap-2 overflow-hidden">
              {(store.screenshots || ["Home", "Session", "Progress"]).map((label) => (
                <div
                  key={label}
                  className="flex h-36 w-[72px] shrink-0 flex-col justify-end rounded-xl border border-ink-200 bg-gradient-to-b from-ink-100 to-ink-200 p-2"
                >
                  <span className="text-[9px] font-medium text-ink-600">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[13px] font-semibold">Description</p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-ink-600">
              {store.description ||
                "Sonocea delivers partner-branded listening programmes for recovery, focus, and regulation. Join via invitation from your organisation."}
            </p>
          </div>

          {store.partnerNote ? (
            <div className="flex items-start gap-2.5 rounded-xl border border-ink-200 bg-white p-3">
              <WfLogo src={store.partnerLogoSrc} label={store.partnerLabel} size="sm" />
              <div>
                <p className="text-[11px] font-semibold text-ink-800">{store.partnerNoteTitle || "Your invitation"}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-ink-500">{store.partnerNote}</p>
              </div>
            </div>
          ) : null}

          <div className="space-y-1.5 rounded-xl border border-ink-200 bg-white p-3 text-[11px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-400">Information</p>
            {(store.info || [
              ["Provider", "Sonocea Ltd"],
              ["Size", "48.2 MB"],
              ["Compatibility", "iOS 16.0 or later"],
              ["Languages", "English"],
            ]).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 border-t border-ink-100 pt-1.5 first:border-0 first:pt-0">
                <span className="text-ink-500">{k}</span>
                <span className="font-medium text-ink-800">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (layout === "mobile-shell") {
    return (
      <div className="flex min-h-[520px] flex-col">
        <div className="flex flex-1 flex-col gap-3.5">{renderBlocks(data.blocks)}</div>
        {data.bottomNav ? (
          <WfIconBar icons={data.bottomNav} active={data.activeTab || data.bottomNavActive} />
        ) : null}
        {!data.bottomNav && (screen.primary || screen.secondary?.length) ? (
          <div className="mt-auto pt-4">
            <PrimarySecondary primary={screen.primary} secondary={screen.secondary} />
          </div>
        ) : null}
      </div>
    );
  }

  if (layout === "email") {
    return (
      <div className="space-y-3 rounded-lg border border-ink-200 bg-white p-4">
        {renderBlocks(data.blocks)}
        <PrimarySecondary primary={screen.primary} secondary={screen.secondary} />
      </div>
    );
  }

  if (layout === "sms") {
    return (
      <div className="rounded-2xl border border-ink-200 bg-ink-50 p-3 text-[12px] leading-relaxed text-ink-800">
        {data.message}
      </div>
    );
  }

  if (layout === "physical") {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-xl border-2 border-ink-800 bg-white p-6 text-center">
        {renderBlocks(data.blocks)}
      </div>
    );
  }

  if (layout === "map") {
    return (
      <div className="flex flex-col items-center gap-1 py-4">
        {data.nodes.map((node, i) => (
          <div key={node} className="flex flex-col items-center">
            <div className="rounded-lg border border-ink-300 bg-white px-4 py-2 text-center text-[12px] font-medium text-ink-900 shadow-sm">
              {node}
            </div>
            {i < data.nodes.length - 1 ? <div className="my-1 h-4 w-px bg-ink-300" /> : null}
          </div>
        ))}
        {data.layers ? (
          <div className="mt-6 flex gap-3">
            {data.layers.map((l) => (
              <div key={l} className="rounded-full border border-ink-400 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-600">
                {l}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  if (layout === "journey") {
    return (
      <div className="space-y-2">
        <p className="text-[13px] font-medium text-ink-900">{data.title}</p>
        <div className="flex flex-wrap items-center gap-1 text-[11px] text-ink-600">
          {data.steps.map((s, i) => (
            <span key={s} className="flex items-center gap-1">
              <span className="rounded border border-ink-200 bg-white px-2 py-1">{s}</span>
              {i < data.steps.length - 1 ? <Icons.ChevronRight className="h-3 w-3 text-ink-300" /> : null}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (layout === "matrix") {
    return (
      <div className="grid grid-cols-3 gap-2">
        {data.items.map((item) => (
          <div key={item.title} className="rounded-lg border border-ink-200 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-400">{item.title}</p>
            <p className="mt-2 text-[12px] text-ink-800">{item.body}</p>
            {item.action ? <p className="mt-2 text-[11px] font-medium text-ink-600">{item.action}</p> : null}
          </div>
        ))}
      </div>
    );
  }

  // default form / content
  return (
    <div className="space-y-3">
      {data.stepper ? <WfStepper steps={data.stepper.steps} current={data.stepper.current} /> : null}
      {data.heading ? <h4 className="text-[15px] font-medium text-ink-900">{data.heading}</h4> : null}
      {data.sub ? <p className="text-[12px] text-ink-500">{data.sub}</p> : null}
      {renderBlocks(data.blocks)}
      <PrimarySecondary primary={screen.primary} secondary={screen.secondary} />
    </div>
  );
}

export default function ScreenWireframe({ screen }) {
  const frame = screen.frame || "desktop";
  const Frame = frame === "mobile" || frame === "email" || frame === "sms" ? MobileFrame : DesktopFrame;

  if (frame === "physical") {
    return (
      <div style={{ width: 280 }}>
        <ScreenBody screen={screen} />
      </div>
    );
  }

  if (layoutIsWide(screen)) {
    return (
      <DesktopFrame>
        <ScreenBody screen={screen} />
      </DesktopFrame>
    );
  }

  if (frame === "desktop") {
    return (
      <DesktopFrame>
        <ScreenBody screen={screen} />
      </DesktopFrame>
    );
  }

  return (
    <Frame flush={screen.layout === "app-store"}>
      <ScreenBody screen={screen} />
    </Frame>
  );
}

function layoutIsWide(screen) {
  return screen.layout === "map" || screen.layout === "journey" || screen.layout === "matrix";
}

export { renderBlocks };
