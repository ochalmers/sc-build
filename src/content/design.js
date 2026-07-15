/**
 * Design page content — visual language, components and screen catalogue.
 */

export const DESIGN_HERO = {
  eyebrow: "Living Design Workspace · June 2026",
  title: "Design",
  intro:
    "The complete visual language for Sonocea App v2.0 — canonical tokens and behavioural modes, a living component library, and every key screen with wireframes and hi-fi references.",
  ctas: {
    primary: { label: "View Core Flows", to: "/flows" },
    secondary: { label: "View References", to: "/references" },
  },
};

export const DESIGN_SYSTEM_LAYERS = [
  { id: "typography", title: "Typography", purpose: "Aeonik editorial hierarchy — calm, readable, sound-first.", preview: "Display · Heading · Body · Caption · Mono", docLink: "#design-system", componentCount: 5, status: "in-progress" },
  { id: "colour", title: "Colour System", purpose: "Ink and paper neutrals with restrained accent palette.", preview: "Ink · Paper · Accent clay · Indigo · Teal", docLink: "#design-system", componentCount: 12, status: "ready" },
  { id: "spacing", title: "Spacing", purpose: "4px base grid with generous editorial rhythm.", preview: "4 · 8 · 12 · 16 · 24 · 32 · 48 · 64", docLink: "#design-system", componentCount: 8, status: "ready" },
  { id: "grid", title: "Grid", purpose: "12-column responsive grid for mobile-first layouts.", preview: "Mobile 4-col · Tablet 8-col · Max content 1400px", docLink: "#design-system", componentCount: 3, status: "draft" },
  { id: "radius", title: "Border Radius", purpose: "Rounded cards and pills — soft, premium feel.", preview: "sm 8px · md 12px · lg 16px · xl 20px · full", docLink: "#design-system", componentCount: 5, status: "ready" },
  { id: "elevation", title: "Elevation", purpose: "Subtle depth through borders and soft shadows.", preview: "Flat · Card · Floating · Modal", docLink: "#design-system", componentCount: 4, status: "draft" },
  { id: "icons", title: "Icons", purpose: "Consistent stroke icons for navigation and controls.", preview: "24px grid · 1.5px stroke · Rounded caps", docLink: "#design-system", componentCount: 32, status: "in-progress" },
  { id: "illustrations", title: "Illustrations", purpose: "Abstract sound-wave and neural imagery.", preview: "Onboarding · Empty states · Science", docLink: "#design-system", componentCount: 6, status: "planned" },
  { id: "motion", title: "Motion", purpose: "Calm transitions honouring reduced motion.", preview: "220–500ms · ease-out · Spectral breathe", docLink: "#design-motion", componentCount: 7, status: "draft" },
  { id: "accessibility", title: "Accessibility", purpose: "WCAG 2.2 AA target across all surfaces.", preview: "Contrast · Touch · VoiceOver · Reduced motion", docLink: "#design-accessibility", componentCount: 10, status: "in-progress" },
];

export const COMPONENT_CATEGORIES = [
  {
    id: "navigation",
    label: "Navigation",
    components: [
      { id: "tab-bar", name: "Tab Bar", purpose: "Primary app navigation — Home, Profile.", variants: ["Default", "With badge"], properties: ["activeTab", "items", "onChange"], states: ["Default", "Active", "Disabled"], usageNotes: ["Fixed bottom on authenticated screens", "Two tabs only — no top logo or hamburger menu"], developerNotes: ["Safe area inset bottom required"], status: "draft" },
      { id: "nav-header", name: "Nav Header", purpose: "Screen title with back action.", variants: ["Default", "Large title", "Modal"], properties: ["title", "showBack", "actions"], states: ["Default", "Scrolled"], usageNotes: ["Use large title on hub screens", "Not a brand bar — logo lives out of chrome"], developerNotes: ["Collapse on scroll optional"], status: "draft" },
    ],
  },
  {
    id: "buttons",
    label: "Buttons",
    components: [
      { id: "primary-btn", name: "Primary Button", purpose: "Main call to action per screen.", variants: ["Filled", "Full width", "Compact"], properties: ["label", "onPress", "disabled", "loading"], states: ["Default", "Pressed", "Disabled", "Loading"], usageNotes: ["One primary CTA per screen"], developerNotes: ["Min height 48px touch target"], status: "ready" },
      { id: "secondary-btn", name: "Secondary Button", purpose: "Supporting actions.", variants: ["Outline", "Ghost", "Text"], properties: ["label", "onPress", "disabled"], states: ["Default", "Pressed", "Disabled"], usageNotes: ["Pair with primary CTA"], developerNotes: [], status: "draft" },
    ],
  },
  {
    id: "inputs",
    label: "Inputs",
    components: [
      { id: "slider", name: "Slider", purpose: "Check-in and feedback rating input.", variants: ["Single", "Labeled", "Stepped"], properties: ["min", "max", "value", "label", "onChange"], states: ["Default", "Active", "Disabled"], usageNotes: ["Used in Check-In and Feedback flows"], developerNotes: ["Persist value locally until submit"], status: "draft" },
      { id: "text-field", name: "Text Field", purpose: "Form input for registration and access requests.", variants: ["Default", "Password", "Multiline"], properties: ["label", "value", "error", "placeholder"], states: ["Default", "Focused", "Error", "Disabled"], usageNotes: [], developerNotes: ["Inline validation on blur"], status: "draft" },
    ],
  },
  {
    id: "cards",
    label: "Cards",
    components: [
      { id: "session-card", name: "Session Card", purpose: "Display session in library and home.", variants: ["Default", "Completed", "Locked", "Next up"], properties: ["title", "duration", "status", "artwork"], states: ["Default", "Pressed", "Completed", "Locked"], usageNotes: ["Highlight next session on Home"], developerNotes: ["Prefetch artwork on appear"], status: "draft" },
      { id: "info-card", name: "Info Card", purpose: "Science and guidance content blocks.", variants: ["Default", "Expandable"], properties: ["title", "body", "icon"], states: ["Default", "Expanded"], usageNotes: [], developerNotes: [], status: "planned" },
    ],
  },
  {
    id: "lists",
    label: "Lists",
    components: [
      { id: "session-list", name: "Session List", purpose: "Scrollable assigned sessions.", variants: ["Default", "Grouped"], properties: ["items", "onSelect"], states: ["Default", "Empty", "Loading"], usageNotes: [], developerNotes: ["Virtualised for long lists"], status: "draft" },
    ],
  },
  {
    id: "feedback",
    label: "Feedback",
    components: [
      { id: "toast", name: "Toast", purpose: "Transient success and error messages.", variants: ["Success", "Error", "Info"], properties: ["message", "duration"], states: ["Visible", "Dismissing"], usageNotes: ["Auto-dismiss after 3s"], developerNotes: [], status: "planned" },
      { id: "banner", name: "Banner", purpose: "Persistent offline and error notices.", variants: ["Offline", "Error", "Info"], properties: ["message", "action"], states: ["Visible", "Dismissed"], usageNotes: [], developerNotes: ["Sticky below nav header"], status: "draft" },
    ],
  },
  {
    id: "player",
    label: "Player",
    components: [
      { id: "waveform", name: "Waveform Module", purpose: "Visual audio representation during playback.", variants: ["Playing", "Paused", "Buffering", "Idle"], properties: ["amplitude", "progress", "isPlaying"], states: ["Playing", "Paused", "Buffering", "Completed"], usageNotes: ["Core brand moment — highest fidelity required"], developerNotes: ["Sync with audio engine progress", "Honour reduced motion"], status: "draft" },
      { id: "player-controls", name: "Player Controls", purpose: "Play, pause, exit and progress.", variants: ["Full", "Compact", "Lock screen"], properties: ["isPlaying", "progress", "onPlay", "onPause", "onExit"], states: ["Playing", "Paused", "Buffering", "Interrupted"], usageNotes: [], developerNotes: ["Now Playing integration"], status: "draft" },
    ],
  },
  {
    id: "modals",
    label: "Modals",
    components: [
      { id: "modal-surface", name: "Modal Surface", purpose: "Focused overlays for permissions and confirmations.", variants: ["Center", "Full screen"], properties: ["title", "children", "onClose"], states: ["Open", "Closing"], usageNotes: [], developerNotes: ["Trap focus", "Escape to close"], status: "planned" },
    ],
  },
  {
    id: "bottom-sheets",
    label: "Bottom Sheets",
    components: [
      { id: "action-sheet", name: "Action Sheet", purpose: "Contextual actions from player or session.", variants: ["Default", "Destructive"], properties: ["actions", "onSelect"], states: ["Open", "Closed"], usageNotes: [], developerNotes: ["Swipe to dismiss"], status: "planned" },
    ],
  },
  {
    id: "navigation-bars",
    label: "Navigation Bars",
    components: [
      { id: "workspace-nav", name: "Workspace Nav", purpose: "Internal site navigation pill.", variants: ["Desktop", "Mobile menu"], properties: ["items", "activeItem"], states: ["Default", "Mobile open"], usageNotes: ["This workspace only"], developerNotes: [], status: "implemented" },
    ],
  },
  {
    id: "progress",
    label: "Progress Indicators",
    components: [
      { id: "progress-ring", name: "Progress Ring", purpose: "Session completion on Home.", variants: ["Default", "Small"], properties: ["value", "max", "label"], states: ["Default", "Complete"], usageNotes: [], developerNotes: [], status: "draft" },
      { id: "skeleton", name: "Skeleton", purpose: "Loading placeholders matching content layout.", variants: ["Card", "List", "Text", "Player"], properties: ["variant", "count"], states: ["Animating", "Static"], usageNotes: ["Prefer over spinners"], developerNotes: ["Respect prefers-reduced-motion"], status: "draft" },
    ],
  },
  {
    id: "tags",
    label: "Tags",
    components: [
      { id: "status-tag", name: "Status Tag", purpose: "Session and implementation status.", variants: ["Default", "Completed", "Locked"], properties: ["label", "variant"], states: ["Default"], usageNotes: [], developerNotes: [], status: "ready" },
    ],
  },
  {
    id: "badges",
    label: "Badges",
    components: [
      { id: "notification-badge", name: "Notification Badge", purpose: "Unread count on tab bar.", variants: ["Dot", "Count"], properties: ["count"], states: ["Visible", "Hidden"], usageNotes: [], developerNotes: [], status: "planned" },
    ],
  },
  {
    id: "avatars",
    label: "Avatars",
    components: [
      { id: "user-avatar", name: "User Avatar", purpose: "Profile representation in settings.", variants: ["Initials", "Image"], properties: ["name", "imageUrl", "size"], states: ["Default"], usageNotes: [], developerNotes: [], status: "planned" },
    ],
  },
  {
    id: "states",
    label: "States",
    components: [
      { id: "empty-state", name: "Empty State", purpose: "No content available.", variants: ["No sessions", "No results", "Generic"], properties: ["title", "message", "action"], states: ["Default"], usageNotes: [], developerNotes: [], status: "draft" },
      { id: "error-state", name: "Error State", purpose: "Recoverable failures.", variants: ["Network", "Server", "Audio"], properties: ["title", "message", "onRetry"], states: ["Default", "Retrying"], usageNotes: [], developerNotes: [], status: "draft" },
    ],
  },
];

function screen(id, title, purpose, components = [], status = "draft", screenKey = null, extras = {}) {
  return {
    id,
    title,
    purpose,
    screenKey: screenKey ?? id,
    components,
    primaryActions: extras.primaryActions ?? ["Continue"],
    secondaryActions: extras.secondaryActions ?? [],
    statesRequired: extras.statesRequired ?? ["Default", "Loading"],
    responsiveNotes: extras.responsiveNotes ?? "Mobile-first — single column layout.",
    accessibilityNotes: extras.accessibilityNotes ?? "VoiceOver labels on all interactive elements.",
    developerNotes: extras.developerNotes ?? ["See Flows page for behavioural spec"],
    implementationStatus: status,
    figmaLink: null,
    prototypeLink: null,
  };
}

export const SCREEN_CATALOGUE = [
  {
    id: "app-entry",
    label: "App Entry",
    screens: [
      screen("splash", "Splash", "Brand moment on cold start.", ["Brand logo"], "ready", "splash"),
      screen("get-started", "Get Started", "Entry decision — discover or sign in.", ["Primary Button", "Secondary Button"], "ready", "pv-get-started"),
      screen("path-selection", "Path Selection", "Route to public visitor or authentication.", ["Info Card", "Primary Button"], "draft", "pv-discover"),
    ],
  },
  {
    id: "authentication",
    label: "Authentication",
    screens: [
      screen("accept-invite", "Accept Invitation", "Deep link entry from partner invite.", ["Primary Button"], "ready", "pv-invitation"),
      screen("login", "Login", "Returning listener sign in.", ["Text Field", "Primary Button"], "draft", "login"),
      screen("create-account", "Create Account", "New listener registration.", ["Text Field", "Primary Button"], "ready", "login-empty"),
      screen("validation", "Validation", "Invite token validation loading.", ["Skeleton"], "ready", "auth-success", {
        primaryActions: ["Wait"],
        statesRequired: ["Loading", "Success"],
      }),
    ],
  },
  {
    id: "onboarding",
    label: "Listener Onboarding",
    screens: [
      screen("onb-welcome", "Welcome", "Personalised greeting.", ["Nav Header", "Primary Button"], "ready", "onboarding"),
      screen("listening-guidance", "Listening Guidance", "When and how to listen.", ["Info Card", "Primary Button"], "ready", "guidance"),
      screen("personalisation", "Personalisation", "Neurotype and preferences.", ["Slider", "Primary Button"], "ready", "neurotype"),
      screen("permissions", "Permissions", "Notification and audio permissions.", ["Permission Card", "Primary Button"], "draft", "profile"),
      screen("completion", "Completion", "Onboarding complete transition.", ["Primary Button"], "ready", "onboarding-complete"),
    ],
  },
  {
    id: "listener",
    label: "Listener Experience",
    screens: [
      screen("home", "Home", "Primary hub — next session and progress.", ["Session Card", "Progress Ring", "Tab Bar"], "ready", "library", {
        developerNotes: ["Uses library wireframe with home variant", "Highlight next session prominently"],
      }),
      screen("library", "Library", "All assigned sessions.", ["Session List", "Session Card", "Tab Bar"], "ready", "library-dark"),
      screen("session-detail", "Session Detail", "Pre-session context and begin CTA.", ["Session Card", "Primary Button"], "ready", "detail"),
      screen("player", "Player", "Core listening experience.", ["Waveform Module", "Player Controls"], "ready", "player", {
        statesRequired: ["Playing", "Paused", "Buffering", "Completed"],
        developerNotes: ["Sync waveform with audio engine", "Honour reduced motion"],
      }),
      screen("session-complete", "Session Complete", "Completion celebration.", ["Primary Button"], "ready", "completion"),
      screen("feedback", "Feedback", "Post-session rating and notes.", ["Slider", "Text Field", "Primary Button"], "ready", "feedback"),
    ],
  },
  {
    id: "public-visitor",
    label: "Public Visitor",
    screens: [
      screen("pv-welcome", "Welcome", "Introduce curated sample experience.", ["Primary Button", "Secondary Button"], "ready", "pv-get-started"),
      screen("check-in", "Check-In", "Baseline state capture.", ["Slider", "Primary Button"], "ready", "pv-check-in"),
      screen("headphones", "Headphones", "Audio setup guidance.", ["Info Card", "Primary Button"], "ready", "pv-headphones"),
      screen("public-session", "Public Session", "5-minute sample playback.", ["Waveform Module", "Player Controls"], "ready", "pv-listening"),
      screen("reflection", "Reflection", "Post-sample mood capture.", ["Slider", "Primary Button"], "ready", "pv-reflection"),
      screen("science", "Science", "Evidence-based explanation.", ["Info Card", "Primary Button"], "ready", "pv-science-home"),
      screen("request-access", "Request Access", "Organisational interest form.", ["Text Field", "Primary Button"], "ready", "pv-request-access"),
    ],
  },
  {
    id: "support",
    label: "Support",
    screens: [
      screen("settings", "Settings", "Account and app preferences.", ["List", "Tab Bar"], "ready", "settings"),
      screen("about", "About", "Company and product info.", ["Info Card"], "ready", "about"),
      screen("support-screen", "Support", "Help and contact.", ["Text Field", "Primary Button"], "ready", "support"),
      screen("policies", "Policies", "Privacy and terms.", ["Info Card"], "draft", "about"),
      screen("research", "Research", "Clinical publications.", ["Info Card"], "ready", "research"),
    ],
  },
];

export const INTERACTION_STATES = [
  { id: "loading", title: "Loading", purpose: "Content fetching.", visual: "Spinner or skeleton matching layout.", recovery: "Auto-resolve on load.", componentUsage: ["Skeleton"], developerNotes: ["Prefer skeleton over spinner"] },
  { id: "skeleton", title: "Skeleton", purpose: "Layout-aware loading placeholder.", visual: "Pulsing grey shapes.", recovery: "Replace with content.", componentUsage: ["Skeleton"], developerNotes: ["Match final layout dimensions"] },
  { id: "empty", title: "Empty", purpose: "No content for context.", visual: "Illustration with copy and CTA.", recovery: "User action or wait.", componentUsage: ["Empty State"], developerNotes: [] },
  { id: "offline", title: "Offline", purpose: "No network.", visual: "Banner or full-screen with retry.", recovery: "Retry on reconnect.", componentUsage: ["Banner"], developerNotes: ["Queue actions offline"] },
  { id: "error", title: "Error", purpose: "Recoverable failure.", visual: "Message with retry CTA.", recovery: "Tap retry.", componentUsage: ["Error State"], developerNotes: [] },
  { id: "success", title: "Success", purpose: "Action completed.", visual: "Toast or inline confirmation.", recovery: "Auto-dismiss.", componentUsage: ["Toast"], developerNotes: [] },
  { id: "disabled", title: "Disabled", purpose: "Action unavailable.", visual: "Reduced opacity, no interaction.", recovery: "Enable when conditions met.", componentUsage: ["Primary Button", "Secondary Button"], developerNotes: [] },
  { id: "active", title: "Active", purpose: "Selected or current item.", visual: "Filled background or accent border.", recovery: "N/A", componentUsage: ["Tab Bar", "Status Tag"], developerNotes: [] },
  { id: "focused", title: "Focused", purpose: "Keyboard or accessibility focus.", visual: "Focus ring — 2px accent.", recovery: "N/A", componentUsage: ["All interactive"], developerNotes: ["WCAG focus visible"] },
  { id: "playing", title: "Playing", purpose: "Audio actively playing.", visual: "Animated waveform, pause icon.", recovery: "N/A", componentUsage: ["Waveform Module", "Player Controls"], developerNotes: [] },
  { id: "paused", title: "Paused", purpose: "Playback paused.", visual: "Static waveform, play icon.", recovery: "Tap play to resume.", componentUsage: ["Player Controls"], developerNotes: [] },
  { id: "buffering", title: "Buffering", purpose: "Stream loading.", visual: "Subtle pulse on waveform.", recovery: "Auto-resolve when buffered.", componentUsage: ["Waveform Module"], developerNotes: [] },
  { id: "completed", title: "Completed", purpose: "Session finished.", visual: "Completion animation.", recovery: "Navigate to feedback.", componentUsage: ["Player Controls"], developerNotes: [] },
  { id: "interrupted", title: "Interrupted", purpose: "Playback paused by system.", visual: "Resume overlay on player.", recovery: "Tap to resume.", componentUsage: ["Player Controls", "Modal Surface"], developerNotes: [] },
  { id: "no-sessions", title: "No Sessions", purpose: "Listener has no assignments.", visual: "Library empty state.", recovery: "Contact provider.", componentUsage: ["Empty State"], developerNotes: [] },
  { id: "access-revoked", title: "Access Revoked", purpose: "Access removed by partner.", visual: "Full-screen with sign out.", recovery: "Sign out.", componentUsage: ["Error State"], developerNotes: [] },
  { id: "maintenance", title: "Maintenance", purpose: "Platform downtime.", visual: "Full-screen message.", recovery: "Auto-retry.", componentUsage: ["Error State"], developerNotes: [] },
];

export const MOTION_PRINCIPLES = [
  { id: "page-transitions", title: "Page Transitions", purpose: "Navigate between screens.", timing: "Enter 300ms · Exit 220ms", duration: "220–300ms", easing: "cubic-bezier(0.22, 1, 0.36, 1)", accessibility: "Respect prefers-reduced-motion — instant cut" },
  { id: "navigation", title: "Navigation", purpose: "Tab and stack transitions.", timing: "250ms", duration: "250ms", easing: "ease-out", accessibility: "No motion on tab switch when reduced" },
  { id: "button-feedback", title: "Button Feedback", purpose: "Press confirmation.", timing: "120ms scale", duration: "120ms", easing: "ease-out", accessibility: "Opacity change only when reduced" },
  { id: "player-animation", title: "Player Animation", purpose: "Waveform and playback visualisation.", timing: "Continuous · 60fps", duration: "Session duration", easing: "Linear loop", accessibility: "Static waveform when reduced motion" },
  { id: "loading", title: "Loading", purpose: "Skeleton and progress indication.", timing: "1.2s pulse loop", duration: "Until loaded", easing: "ease-in-out", accessibility: "Static skeleton when reduced" },
  { id: "micro-interactions", title: "Micro Interactions", purpose: "Slider thumb, toggle, checkbox.", timing: "150–200ms", duration: "150–200ms", easing: "ease-out", accessibility: "Instant state change when reduced" },
  { id: "completion", title: "Completion Animation", purpose: "Session complete celebration.", timing: "600ms entrance", duration: "600ms", easing: "spring(1, 80, 10)", accessibility: "Static checkmark when reduced" },
];

export const ACCESSIBILITY_TOPICS = [
  { id: "typography", title: "Typography", notes: "Minimum 14px body. Support Dynamic Type scaling to 200%." },
  { id: "contrast", title: "Contrast", notes: "4.5:1 body text. 3:1 large text and UI components." },
  { id: "touch-targets", title: "Touch Targets", notes: "Minimum 44×44pt for all interactive elements." },
  { id: "screen-readers", title: "Screen Readers", notes: "Meaningful labels on all controls. Group related content." },
  { id: "voiceover", title: "VoiceOver", notes: "iOS accessibility labels, hints and traits on player controls." },
  { id: "talkback", title: "TalkBack", notes: "Android content descriptions matching iOS labels." },
  { id: "dynamic-type", title: "Dynamic Type", notes: "Layout reflow at large sizes. No clipped text." },
  { id: "reduced-motion", title: "Reduced Motion", notes: "Disable waveform animation, page transitions and parallax." },
  { id: "keyboard", title: "Keyboard Navigation", notes: "Web workspace supports tab order and focus rings." },
  { id: "audio", title: "Audio Considerations", notes: "Visual alternatives for audio-only content. Caption support future." },
];
