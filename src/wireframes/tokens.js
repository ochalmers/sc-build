/** Muted wireframe palette — aligned with site ink/paper tokens */
export const WF = {
  bg: "#F9F8F6",
  surface: "#FFFFFF",
  surfaceMuted: "#F4F4F2",
  border: "#E6E6E2",
  borderStrong: "#CFCFCA",
  text: "#3A3A38",
  textSecondary: "#565653",
  textMuted: "#7D7D78",
  placeholder: "#A8A8A2",
  fill: "#232322",
  fillMuted: "#565653",
  playerBg: "#3A3A38",
  playerSurface: "#565653",
  success: "#6C857A",
  error: "#B9856E",
  warning: "#8A8278",
};

/** Dark wireframe palette — same structure, no colour gradients */
export const WF_DARK = {
  bg: "#2E2E2C",
  surface: "#3A3A38",
  surfaceMuted: "#454543",
  border: "#52524F",
  borderStrong: "#6A6A66",
  text: "#F4F4F2",
  textSecondary: "#C8C8C4",
  textMuted: "#9A9A94",
  placeholder: "#7D7D78",
  fill: "#E6E6E2",
  fillMuted: "#9A9A94",
  playerBg: "#2E2E2C",
  playerSurface: "#454543",
  success: "#8FA898",
  error: "#C9A08C",
  warning: "#A8A094",
};

export function getWireframePalette(tone = "light") {
  if (tone === "dark" || tone === "player") return WF_DARK;
  return WF;
}

export const WF_TYPE = {
  tag: "text-[9px] font-medium uppercase tracking-[0.12em]",
  title: "text-[17px] font-medium leading-[1.15] tracking-tight",
  titleSm: "text-[15px] font-medium leading-[1.2] tracking-tight",
  body: "text-[11px] leading-relaxed",
  bodySm: "text-[10px] leading-relaxed",
  label: "text-[12px] font-medium",
  button: "text-[13px] font-medium tracking-tight",
  link: "text-[12px] font-medium",
  caption: "text-[9px] font-medium uppercase tracking-[0.08em]",
  mono: "font-mono text-[11px] font-medium",
  chip: "text-[9px] font-medium uppercase tracking-[0.06em]",
};
