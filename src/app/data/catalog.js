/**
 * Mock provisioned catalogue for the working Mobile App PRD build.
 * Only entitled Sessions appear in a Listener library (FR: provisioned catalog only).
 */

export const NEUROTYPE_OPTIONS = [
  {
    id: "sensitive",
    label: "Take it gently",
    description: "Start with shorter sessions and a slower pace.",
    mode: "care",
  },
  {
    id: "regulator",
    label: "Follow the recommended path",
    description: "Work through your assigned programme step by step.",
    mode: "regulation",
  },
  {
    id: "performance",
    label: "Choose each session myself",
    description: "Browse the sessions assigned to you and decide what to listen to.",
    mode: "performance",
  },
  {
    id: "supported",
    label: "Just get me listening",
    description: "Skip the guidance and head straight to your programme.",
    mode: "regulation",
  },
];

/** About carousel — follows Welcome. Order: What is Sonocea → extras. */
export const ONBOARDING_ABOUT_SLIDES = [
  {
    id: "what-is",
    eyebrow: "About Sonocea",
    title: "What is Sonocea?",
    body: "Sonocea delivers structured listening experiences designed to support nervous system regulation, recovery, and wellbeing — using patented Sonic Augmentation Technology™.",
  },
  {
    id: "structured-sound",
    eyebrow: "About Sonocea",
    title: "Structured Sound",
    body: "Each session is carefully engineered audio — not meditation music or white noise. Sound is structured to help your system settle, focus, or recover.",
  },
  {
    id: "science",
    eyebrow: "About Sonocea",
    title: "Grounded in Science",
    body: "Sessions are developed from research into how audition interacts with autonomic regulation — built for real physiological effect, not entertainment.",
  },
  {
    id: "everyday",
    eyebrow: "About Sonocea",
    title: "Designed for Everyday Use",
    body: "Short, focused sessions you can return to whenever you need. Your organisation chooses what’s available; you choose when to listen.",
  },
];

export const ONBOARDING_PREP_CHECKLIST = [
  "Find a quiet space",
  "Use headphones — both ears clearly",
  "Sit or lie comfortably",
  "Put distractions aside for a few minutes",
];

export const ONBOARDING_IDENTITY_OPTIONS = [
  { id: "neurotypical", label: "Neurotypical", neurotypeId: "regulator" },
  { id: "neurodivergent", label: "Neurodivergent", neurotypeId: "sensitive" },
  { id: "prefer-not", label: "Prefer not to say", neurotypeId: "supported" },
];

export const ONBOARDING_SUPPORT_OPTIONS = [
  { id: "calmer", label: "Feeling calmer" },
  { id: "recovery", label: "Recovery" },
  { id: "focus", label: "Focus" },
  { id: "regulation", label: "Emotional regulation" },
  { id: "sleep", label: "Better sleep" },
  { id: "wellbeing", label: "General wellbeing" },
];

export const ONBOARDING_LISTEN_TIMES = [
  { id: "morning", label: "Morning" },
  { id: "afternoon", label: "Afternoon" },
  { id: "evening", label: "Evening" },
  { id: "anytime", label: "Anytime" },
];

/** @deprecated Prefer ONBOARDING_ABOUT_SLIDES */
export const ONBOARDING_SLIDES = ONBOARDING_ABOUT_SLIDES.map((s) => ({
  id: s.id,
  title: s.title,
  body: s.body,
}));

export const SESSION_CATALOG = [
  {
    id: "ses-arrive",
    title: "Arrive",
    durationMin: 12,
    neurotype: ["sensitive", "regulator", "supported"],
    useCase: "Settle",
    benefits: ["Downshift", "Presence"],
    benefitLines: ["Encourages a calmer physiological state", "Supports gentle arrival into the body"],
    mode: "care",
    summary: "A soft start — leave the day behind and arrive in your body.",
    about:
      "A guided listening experience designed to help you leave the day behind and arrive in your body. Soft sonic textures support a gentle downshift before whatever comes next.",
    bestExperienced: ["Wearing headphones", "Seated or lying comfortably", "Without interruptions"],
    partnerIds: ["org-preston", "org-haven"],
  },
  {
    id: "ses-settle",
    title: "Settle",
    durationMin: 15,
    neurotype: ["sensitive", "regulator", "supported"],
    useCase: "Regulation",
    benefits: ["Calm", "Breath"],
    benefitLines: ["Eases overload and sensory intensity", "Supports steadier breathing and attention"],
    mode: "care",
    summary: "Gentle listening for when you’ve been overloaded.",
    about:
      "A sound-based session for when the system has been overloaded. Layered textures and pacing help settle arousal without demanding focus or effort.",
    bestExperienced: ["Wearing headphones", "In a quiet space", "With eyes soft or closed"],
    partnerIds: ["org-preston", "org-haven"],
  },
  {
    id: "ses-balance",
    title: "Inner Balance",
    durationMin: 18,
    neurotype: ["regulator", "supported", "performance"],
    useCase: "Daily",
    benefits: ["Steady state", "Clarity"],
    benefitLines: ["Supports a steadier daily baseline", "Encourages clearer, softer focus"],
    mode: "regulation",
    summary: "A repeatable daily session to help you stay steady.",
    about:
      "A repeatable listening practice for everyday regulation. Structured sound helps maintain a steadier baseline between demands.",
    bestExperienced: ["Wearing headphones", "At a consistent time of day", "Without interruptions"],
    partnerIds: ["org-preston", "org-summit"],
  },
  {
    id: "ses-access",
    title: "Access",
    durationMin: 20,
    neurotype: ["regulator", "performance"],
    useCase: "Therapy adjunct",
    benefits: ["Openness", "Soft focus"],
    benefitLines: ["Supports openness alongside clinical work", "Encourages soft, sustained attention"],
    mode: "regulation",
    summary: "Made to sit alongside therapeutic work — open and softly focused.",
    about:
      "Designed as a clinical adjunct — open, softly focused listening that can sit alongside therapeutic work without competing with it.",
    bestExperienced: ["Wearing headphones", "Before or after a session", "Without interruptions"],
    partnerIds: ["org-preston"],
  },
  {
    id: "ses-reset",
    title: "Performance Reset",
    durationMin: 10,
    neurotype: ["performance", "regulator"],
    useCase: "Recovery",
    benefits: ["Re-entry", "Focus"],
    benefitLines: ["Supports clear re-entry after demand", "Helps restore usable focus"],
    mode: "performance",
    summary: "A short, clear reset between demanding blocks of the day.",
    about:
      "A short reset between high-demand blocks. Clear sonic structure helps you recover usable focus without lingering in a drained state.",
    bestExperienced: ["Wearing headphones", "Between intense blocks", "Without phone notifications"],
    partnerIds: ["org-summit"],
  },
  {
    id: "ses-deep",
    title: "Deep Rest",
    durationMin: 30,
    neurotype: ["sensitive", "supported"],
    useCase: "Rest",
    benefits: ["Restoration", "Sleep prep"],
    benefitLines: ["Supports deeper restoration", "Prepares the system for sleep or rest"],
    mode: "care",
    summary: "Longer form for when you need deeper rest and settling.",
    about:
      "A longer-form session for deeper restoration. Slow-moving textures help the system settle when shorter sessions aren’t enough.",
    bestExperienced: ["Wearing headphones", "Lying down if possible", "Near the end of the day"],
    partnerIds: ["org-haven"],
  },
  {
    id: "ses-transition",
    title: "Transition",
    durationMin: 15,
    neurotype: ["supported", "regulator", "performance"],
    useCase: "Between states",
    benefits: ["Handoff", "Grounding"],
    benefitLines: ["Supports clean handoffs between states", "Encourages grounded re-entry"],
    mode: "regulation",
    summary: "A bridge between activity and rest, or between parts of your day.",
    about:
      "A bridge between activity and rest — or between parts of the day. Listening helps you hand off one state cleanly before entering the next.",
    bestExperienced: ["Wearing headphones", "At a natural change of context", "Without interruptions"],
    partnerIds: ["org-preston", "org-haven", "org-summit"],
  },
];

export const DEMO_PARTNERS = [
  {
    id: "org-preston",
    name: "Preston North End",
    monogram: "PNE",
    inviteAccent: "#0b1c2c",
    inviteHighlight: "#c9a86a",
    inviteLine: "You've been invited by Preston North End to access Sonocea.",
    programme: "Listening sessions shared by Preston North End to support recovery and wellbeing.",
    seats: 40,
    seatsUsed: 28,
    billingModel: "seat-pool",
    sessionIds: ["ses-arrive", "ses-settle", "ses-balance", "ses-access", "ses-transition"],
  },
  {
    id: "org-haven",
    name: "Haven Care Network",
    monogram: "H",
    inviteAccent: "#1a2420",
    inviteHighlight: "#8faf9a",
    inviteLine: "You've been invited by Haven Care Network to access Sonocea.",
    programme: "Gentle recovery sessions for when things feel a lot — paced and supportive.",
    seats: 120,
    seatsUsed: 91,
    billingModel: "usage",
    sessionIds: ["ses-arrive", "ses-settle", "ses-deep", "ses-transition"],
  },
  {
    id: "org-summit",
    name: "Summit Performance Lab",
    monogram: "S",
    inviteAccent: "#1c1712",
    inviteHighlight: "#d4b896",
    inviteLine: "You've been invited by Summit Performance Lab to access Sonocea.",
    programme: "Short reset sessions for recovery between busy or demanding days.",
    seats: 25,
    seatsUsed: 18,
    billingModel: "per-seat",
    sessionIds: ["ses-balance", "ses-reset", "ses-transition"],
  },
];

export const DEMO_LISTENERS = [
  {
    id: "lis-alex",
    name: "Alex Rivera",
    email: "alex@example.com",
    partnerId: "org-preston",
    inviteCode: "PRESTON-ALEX",
    status: "active",
  },
  {
    id: "lis-jordan",
    name: "Jordan Lee",
    email: "jordan@example.com",
    partnerId: "org-haven",
    inviteCode: "HAVEN-JORDAN",
    status: "invited",
  },
  {
    id: "lis-sam",
    name: "Sam Okonkwo",
    email: "sam@summit.lab",
    partnerId: "org-summit",
    inviteCode: "SUMMIT-SAM",
    status: "active",
  },
];

/** Resolve partner branding from an invite code (e.g. PRESTON-ALEX → Preston North End). */
export function partnerFromInviteCode(code, partners = DEMO_PARTNERS, listeners = DEMO_LISTENERS) {
  const normalised = (code || "").toUpperCase().trim();
  if (!normalised) return null;

  const listener = listeners.find((l) => l.inviteCode.toUpperCase() === normalised);
  if (listener) {
    return partners.find((p) => p.id === listener.partnerId) ?? null;
  }

  return (
    partners.find((p) => {
      const key = p.name.split(" ")[0].toUpperCase();
      return normalised.startsWith(key) || normalised.includes(key);
    }) ?? null
  );
}

export function listenerFromInviteCode(code, listeners = DEMO_LISTENERS) {
  const normalised = (code || "").toUpperCase().trim();
  return listeners.find((l) => l.inviteCode.toUpperCase() === normalised) ?? null;
}

/** Valid demo credentials for the working app */
export const DEMO_CREDENTIALS = {
  listener: { email: "alex@example.com", password: "listen", inviteCode: "PRESTON-ALEX" },
  partner: { email: "ops@pne.club", password: "partner", partnerId: "org-preston" },
  admin: { email: "admin@sonocea.com", password: "admin" },
};

export function sessionsForPartner(partnerId, catalog = SESSION_CATALOG) {
  return catalog.filter((s) => s.partnerIds.includes(partnerId));
}

export function sessionsForNeurotype(neurotypeId, partnerId, catalog = SESSION_CATALOG) {
  return catalog.filter(
    (s) =>
      s.partnerIds.includes(partnerId) &&
      (!neurotypeId || s.neurotype.includes(neurotypeId)),
  );
}

export function formatDuration(min) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}
