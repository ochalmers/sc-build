/** Directional samples — 1.5px stroke, rounded caps; matches Figma icon weight */
export function IconSound({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 6v12M8 9v6M16 9v6M4 10v4M20 10v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconPlay({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9.5 7.5l8 4.5-8 4.5v-9z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconSettings({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconDiscover({ className = "h-[26px] w-[26px]" }) {
  return (
    <svg className={className} viewBox="0 0 26 26" fill="none" aria-hidden>
      <circle cx="11.5" cy="11.5" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconProfile({ className = "h-[26px] w-[26px]" }) {
  return (
    <svg className={className} viewBox="0 0 26 26" fill="none" aria-hidden>
      <circle cx="13" cy="9" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6 22c0-4.5 3.1-7 7-7s7 2.5 7 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconMenu({ className = "h-8 w-8" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M6 10h20M6 16h20M6 22h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
