export const SITE_ARCHITECTURE_META = {
  title: "Sonocea Marketing Website",
  subtitle: "Site architecture & information design",
  description:
    "A working map for the public-facing website that promotes the Sonocea mobile app — explaining the science, building trust, and routing the right audiences to access without open consumer signup.",
  status: "Pre-reset reference · may need refresh post–June 2026 PRDs",
};

export const SITE_ARCHITECTURE_PURPOSE = {
  role:
    "The marketing website is the primary public front door for Sonocea. It educates, builds credibility, and directs people toward the right next step — without offering Session playback or open app signup in v1.",
  goals: [
    "Explain what Sonocea is and how Sonic Augmentation Technology™ (SAT™) works",
    "Communicate the listener experience without exposing proprietary audio",
    "Route clinicians, partners, and organisations toward the right access pathway",
    "Capture interest via mailing list and partner enquiry forms",
    "Support app download and invite redemption for provisioned listeners",
    "Establish a premium, calm, scientifically credible brand presence",
  ],
  notGoals: [
    "Open direct-to-consumer signup (deferred to v2.0)",
    "In-browser Session streaming or download",
    "Full Partner Console or Admin CMS functionality",
    "Clinical claims beyond approved copy",
  ],
};

export const SITE_ARCHITECTURE_AUDIENCES = [
  {
    id: "curious-public",
    label: "Curious visitors",
    intent: "Learn what Sonocea is",
    entry: "Home, science pages, press",
    outcome: "Understand the proposition · join mailing list",
  },
  {
    id: "listeners",
    label: "Provisioned listeners",
    intent: "Get the app and redeem access",
    entry: "Home CTA · app store links · invite landing",
    outcome: "Download app · redeem invite or partner code",
  },
  {
    id: "clinicians",
    label: "Clinicians & practitioners",
    intent: "Explore clinical relevance",
    entry: "Applications · clinician CTA",
    outcome: "Partner enquiry · talk to Sonocea",
  },
  {
    id: "partners",
    label: "Organisations & partners",
    intent: "Evaluate partnership or provisioning",
    entry: "Partners page · integration CTAs",
    outcome: "Partner login · sales enquiry",
  },
  {
    id: "press",
    label: "Press & stakeholders",
    intent: "Find company facts and assets",
    entry: "About · press kit",
    outcome: "Download assets · contact",
  },
];

export const SITE_ARCHITECTURE_SITEMAP = {
  root: "sonocea.com",
  sections: [
    {
      id: "site-home",
      label: "Home",
      path: "/",
      tier: 1,
      children: [],
    },
    {
      id: "site-product",
      label: "Product",
      path: "/product",
      tier: 1,
      children: [
        { id: "site-product-app", label: "The app", path: "/product/app" },
        { id: "site-product-sessions", label: "Sessions", path: "/product/sessions" },
        { id: "site-product-sat", label: "SAT™ technology", path: "/product/sat" },
      ],
    },
    {
      id: "site-applications",
      label: "Applications",
      path: "/applications",
      tier: 1,
      children: [
        { id: "site-app-care", label: "Care", path: "/applications/care" },
        { id: "site-app-regulation", label: "Regulation", path: "/applications/regulation" },
        { id: "site-app-performance", label: "Performance", path: "/applications/performance" },
      ],
    },
    {
      id: "site-science",
      label: "Science",
      path: "/science",
      tier: 1,
      children: [
        { id: "site-science-approach", label: "Our approach", path: "/science/approach" },
        { id: "site-science-research", label: "Research", path: "/science/research" },
      ],
    },
    {
      id: "site-partners",
      label: "Partners",
      path: "/partners",
      tier: 1,
      children: [
        { id: "site-partners-overview", label: "Partner programme", path: "/partners" },
        { id: "site-partners-login", label: "Partner login", path: "/partners/login", external: true },
      ],
    },
    {
      id: "site-access",
      label: "Get access",
      path: "/access",
      tier: 1,
      children: [
        { id: "site-access-listener", label: "I have an invite", path: "/access/invite" },
        { id: "site-access-clinician", label: "Talk to a clinician", path: "/access/clinician" },
        { id: "site-access-partner", label: "Partner enquiry", path: "/access/partner" },
        { id: "site-access-mailing", label: "Join mailing list", path: "/access/updates" },
      ],
    },
    {
      id: "site-company",
      label: "Company",
      path: "/company",
      tier: 1,
      children: [
        { id: "site-company-about", label: "About", path: "/company/about" },
        { id: "site-company-press", label: "Press", path: "/company/press" },
        { id: "site-company-contact", label: "Contact", path: "/company/contact" },
      ],
    },
    {
      id: "site-legal",
      label: "Legal",
      path: "/legal",
      tier: 2,
      children: [
        { id: "site-legal-privacy", label: "Privacy", path: "/legal/privacy" },
        { id: "site-legal-terms", label: "Terms", path: "/legal/terms" },
        { id: "site-legal-cookies", label: "Cookies", path: "/legal/cookies" },
      ],
    },
  ],
};

export const SITE_ARCHITECTURE_PAGES = [
  {
    id: "arch-home",
    title: "Home",
    path: "/",
    priority: "P0",
    purpose: "Establish brand, explain the proposition at a glance, and route visitors to the right pathway.",
    sections: [
      "Hero — vision-led headline, atmospheric visual, primary CTA",
      "What Sonocea is — SAT™ in plain language",
      "How it works — short three-step explainer (discover · listen · reflect)",
      "Applications axis — Care · Regulation · Performance",
      "App preview — device mockup or video (no playback)",
      "Social proof / credibility markers",
      "Access pathways — invite · clinician · partner · updates",
      "Footer — legal, contact, app store links",
    ],
    ctas: ["Get the app", "How to get access", "Join updates"],
    notes: "GTM hero direction v06 (glitch slice) is a candidate treatment for this page.",
  },
  {
    id: "arch-product-app",
    title: "The app",
    path: "/product/app",
    priority: "P0",
    purpose: "Show what the listener experience looks and feels like before download.",
    sections: [
      "Hero — mobile-first product story",
      "Core journeys — onboarding, library, player, feedback",
      "Invite-only access model explained",
      "Neurotype-aligned recommendations overview",
      "Offline listening where permitted",
      "App store download CTAs",
      "FAQ — access, devices, privacy basics",
    ],
    ctas: ["Download on App Store", "Download on Google Play", "I have an invite"],
  },
  {
    id: "arch-product-sat",
    title: "SAT™ technology",
    path: "/product/sat",
    priority: "P1",
    purpose: "Explain Sonic Augmentation Technology without over-claiming or exposing IP.",
    sections: [
      "What SAT™ is",
      "Structured audio Sessions vs generic sound",
      "Sound blends and session architecture (conceptual)",
      "Regulation, care, and performance use cases",
      "Science credibility without clinical overreach",
    ],
    ctas: ["Explore applications", "Read our science approach"],
  },
  {
    id: "arch-applications",
    title: "Applications hub",
    path: "/applications",
    priority: "P1",
    purpose: "Organise use cases around the three behavioural modes.",
    sections: [
      "Mode overview — Care · Regulation · Performance",
      "Example session types per mode",
      "Who each mode serves",
      "Links to mode detail pages",
    ],
    ctas: ["Talk to us about your organisation"],
  },
  {
    id: "arch-partners",
    title: "Partners",
    path: "/partners",
    priority: "P1",
    purpose: "Explain the partner provisioning model and route to Partner Console or sales.",
    sections: [
      "Partner programme overview",
      "How provisioning works — Admin → Partner → Listener",
      "Partner Console capabilities (high level)",
      "Billing models overview",
      "Integration pathways (e.g. co-branded entry)",
      "Partner login CTA",
    ],
    ctas: ["Partner login", "Become a partner", "Contact partnerships"],
  },
  {
    id: "arch-access",
    title: "Get access",
    path: "/access",
    priority: "P0",
    purpose: "Central routing hub for all access pathways — no open signup.",
    sections: [
      "Pathway selector — four routes",
      "I have an invite — app download + redemption guidance",
      "Talk to a clinician — education + enquiry form",
      "Partner enquiry — organisation interest form",
      "Join mailing list — email capture + confirmation",
    ],
    ctas: ["Download app", "Submit enquiry", "Join mailing list"],
    notes: "Matches PRD public flows: marketing landing, clinician CTA, mailing list, partner integration.",
  },
  {
    id: "arch-science",
    title: "Science",
    path: "/science",
    priority: "P2",
    purpose: "Build scientific credibility for clinicians, partners, and informed visitors.",
    sections: [
      "Research philosophy",
      "Sound and autonomic regulation (approved framing)",
      "Evidence and publications (as available)",
      "Advisory and clinical governance (if applicable)",
    ],
    ctas: ["Partner with us", "Contact research"],
  },
  {
    id: "arch-company",
    title: "About & company",
    path: "/company/about",
    priority: "P2",
    purpose: "Humanise the brand and provide company context.",
    sections: [
      "Mission and vision",
      "Team or leadership (optional)",
      "Company story",
      "Press kit link",
      "Contact",
    ],
    ctas: ["Press enquiries", "Contact us"],
  },
];

export const SITE_ARCHITECTURE_JOURNEYS = [
  {
    id: "journey-discover",
    title: "Discover → learn → stay informed",
    steps: ["Land on home", "Explore SAT™ or applications", "Join mailing list", "Receive updates"],
    audience: "Curious public",
  },
  {
    id: "journey-listener",
    title: "Invited listener → app",
    steps: [
      "Receive invite or partner code",
      "Visit site for context (optional)",
      "Download app from store link",
      "Redeem code in app",
      "Complete onboarding",
    ],
    audience: "Provisioned listeners",
  },
  {
    id: "journey-clinician",
    title: "Clinician interest → partner pathway",
    steps: [
      "Land on applications or clinician CTA",
      "Understand clinical relevance",
      "Submit enquiry or contact Sonocea",
      "Routed to partner provisioning (not self-serve)",
    ],
    audience: "Clinicians",
  },
  {
    id: "journey-partner",
    title: "Organisation → partner console",
    steps: [
      "Land on partners page",
      "Review provisioning model",
      "Submit partner enquiry or use existing credentials",
      "Partner login → provision listeners",
    ],
    audience: "Organisations",
  },
];

export const SITE_ARCHITECTURE_PRINCIPLES = [
  {
    title: "Educate, don't demo audio",
    body: "The site explains Sessions and SAT™ visually and in copy — visitors cannot stream or download proprietary audio on the web.",
  },
  {
    title: "Route, don't gatekeep confusingly",
    body: "Every CTA should make the next step obvious: download, enquire, join updates, or partner login. No dead-end forms.",
  },
  {
    title: "Premium and calm",
    body: "Visual language should match the app — atmospheric, scientific, human. Not generic wellness or corporate SaaS.",
  },
  {
    title: "Invite-first access model",
    body: "Copy and IA must consistently reflect that v1 is provisioned access, not open consumer signup.",
  },
  {
    title: "One brand system",
    body: "Marketing site, app, and partner surfaces share typography, colour logic, and behavioural mode language.",
  },
];

export const SITE_ARCHITECTURE_GLOBAL = {
  header: ["Logo", "Product", "Applications", "Science", "Partners", "Get access"],
  footer: [
    "Product links",
    "Applications",
    "Partners",
    "Company",
    "Legal",
    "App store badges",
    "Social (if applicable)",
    "© Sonocea",
  ],
  utilities: [
    { label: "Partner login", path: "/partners/login", note: "Routes to Partner Console" },
    { label: "App download", path: "App store links", note: "Persistent in footer" },
    { label: "Cookie consent", path: "Global", note: "Required for analytics" },
  ],
};

export const SITE_ARCHITECTURE_PHASES = [
  {
    phase: "Phase A · Foundation",
    focus: "Launch-critical pages",
    pages: ["Home", "The app", "Get access", "Legal (privacy, terms)"],
    goal: "Credible public presence with clear access routing",
  },
  {
    phase: "Phase B · Depth",
    focus: "Product and partner story",
    pages: ["SAT™ technology", "Applications hub", "Partners", "About"],
    goal: "Support clinician and partner conversations",
  },
  {
    phase: "Phase C · Credibility",
    focus: "Science and company",
    pages: ["Science", "Research", "Press", "Contact"],
    goal: "Long-term trust and media readiness",
  },
];

export const SITE_ARCHITECTURE_OPEN_QUESTIONS = [
  "Should the marketing site be a separate domain or subdomain from Partner Console?",
  "Which partner integration CTAs ship in v1 (e.g. Unyte) — PRD marks these WIP",
  "App store links only, or also a lightweight invite redemption web flow?",
  "How much session artwork and sound-blend visual language appears on marketing pages?",
  "Press kit — what assets and approvals are needed before publish?",
  "Analytics stack and consent model for the public site",
];

export const SITE_ARCHITECTURE_RELATED = [
  { label: "Public Visitor PRD flows", to: "/flows/revised#revised-pv-flows-golden", note: "Discover journey and golden route" },
  { label: "PRD designs", to: "/designs/prd", note: "Hi-fi Public Visitor and Mobile App screens" },
  { label: "Design system", to: "/design-system", note: "Shared tokens and components" },
  { label: "Delivery plan", to: "/plan", note: "Programme timeline and milestones" },
];

export const SITE_ARCHITECTURE_CHAPTERS = [
  { id: "arch-intro", label: "Overview", shortLabel: "Overview", href: "#arch-intro" },
  { id: "arch-purpose", label: "Purpose", shortLabel: "Purpose", href: "#arch-purpose" },
  { id: "arch-audiences", label: "Audiences", shortLabel: "Audiences", href: "#arch-audiences" },
  { id: "arch-sitemap", label: "Sitemap", shortLabel: "Sitemap", href: "#arch-sitemap" },
  { id: "arch-pages", label: "Pages", shortLabel: "Pages", href: "#arch-pages" },
  { id: "arch-journeys", label: "Journeys", shortLabel: "Journeys", href: "#arch-journeys" },
  { id: "arch-principles", label: "Principles", shortLabel: "Principles", href: "#arch-principles" },
  { id: "arch-phases", label: "Rollout", shortLabel: "Rollout", href: "#arch-phases" },
  { id: "arch-questions", label: "Open questions", shortLabel: "Questions", href: "#arch-questions" },
];
