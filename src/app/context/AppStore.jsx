import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import {
  DEMO_CREDENTIALS,
  DEMO_LISTENERS,
  DEMO_PARTNERS,
  SESSION_CATALOG,
  sessionsForNeurotype,
} from "../data/catalog.js";

const STORAGE_KEY = "sonocea-prd-app-v1";

const initialState = {
  role: null, // listener | partner | admin
  user: null,
  onboardingComplete: false,
  neurotypeId: null,
  onboardingPrefs: null, // { identityId, supportIds, listenTime }
  appearance: "light", // light | dark
  favoriteIds: [],
  listenHistory: [], // { sessionId, completedAt, progressPct, durationMin }
  feedback: [], // { sessionId, rating, note, at }
  partners: DEMO_PARTNERS,
  listeners: DEMO_LISTENERS,
  catalog: SESSION_CATALOG,
  invites: [
    { id: "inv-1", code: "PRESTON-ALEX", email: "alex@example.com", partnerId: "org-preston", status: "accepted" },
    { id: "inv-2", code: "HAVEN-JORDAN", email: "jordan@example.com", partnerId: "org-haven", status: "pending" },
    { id: "inv-3", code: "SUMMIT-SAM", email: "sam@summit.lab", partnerId: "org-summit", status: "accepted" },
  ],
  analyticsEvents: [],
};

function migratePartnerId(id) {
  return id === "org-meridian" ? "org-preston" : id;
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw);
    const listeners = (parsed.listeners?.length ? parsed.listeners : DEMO_LISTENERS).map((l) => ({
      ...l,
      partnerId: migratePartnerId(l.partnerId),
      inviteCode: l.inviteCode === "MERIDIAN-ALEX" ? "PRESTON-ALEX" : l.inviteCode,
    }));
    const invites = (parsed.invites ?? initialState.invites).map((inv) => ({
      ...inv,
      partnerId: migratePartnerId(inv.partnerId),
      code: inv.code === "MERIDIAN-ALEX" ? "PRESTON-ALEX" : inv.code,
    }));
    const user = parsed.user
      ? {
          ...parsed.user,
          partnerId: migratePartnerId(parsed.user.partnerId),
          inviteCode:
            parsed.user.inviteCode === "MERIDIAN-ALEX" ? "PRESTON-ALEX" : parsed.user.inviteCode,
        }
      : null;

    return {
      ...initialState,
      ...parsed,
      user,
      partners: DEMO_PARTNERS,
      listeners,
      invites,
      catalog: parsed.catalog?.length
        ? parsed.catalog.map((s) => ({
            ...s,
            partnerIds: (s.partnerIds ?? []).map(migratePartnerId),
          }))
        : SESSION_CATALOG,
    };
  } catch {
    return initialState;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "HYDRATE":
      return action.payload;
    case "LOGIN_LISTENER": {
      const { email, inviteCode, name, partnerId, isInviteRedeem } = action.payload;
      return {
        ...state,
        role: "listener",
        user: { email, name, partnerId, inviteCode },
        // Fresh invitation redemptions always enter First-Time Experience.
        ...(isInviteRedeem
          ? {
              onboardingComplete: false,
              neurotypeId: null,
              onboardingPrefs: null,
            }
          : {}),
        analyticsEvents: [
          ...state.analyticsEvents,
          {
            type: isInviteRedeem ? "invite_redeemed" : "listener_login",
            at: Date.now(),
            email,
          },
        ],
      };
    }
    case "LOGIN_PARTNER":
      return {
        ...state,
        role: "partner",
        user: action.payload,
        analyticsEvents: [
          ...state.analyticsEvents,
          { type: "partner_login", at: Date.now(), partnerId: action.payload.partnerId },
        ],
      };
    case "LOGIN_ADMIN":
      return {
        ...state,
        role: "admin",
        user: action.payload,
        analyticsEvents: [...state.analyticsEvents, { type: "admin_login", at: Date.now() }],
      };
    case "LOGOUT":
      return {
        ...state,
        role: null,
        user: null,
      };
    case "COMPLETE_ONBOARDING":
      return { ...state, onboardingComplete: true };
    case "SET_ONBOARDING_PREFS":
      return { ...state, onboardingPrefs: action.payload };
    case "SET_NEUROTYPE":
      return {
        ...state,
        neurotypeId: action.payload,
        analyticsEvents: [
          ...state.analyticsEvents,
          { type: "neurotype_set", at: Date.now(), neurotypeId: action.payload },
        ],
      };
    case "SET_APPEARANCE":
      return {
        ...state,
        appearance: action.payload === "dark" ? "dark" : "light",
      };
    case "TOGGLE_FAVORITE": {
      const id = action.payload;
      const has = state.favoriteIds.includes(id);
      return {
        ...state,
        favoriteIds: has ? state.favoriteIds.filter((x) => x !== id) : [...state.favoriteIds, id],
      };
    }
    case "RECORD_LISTEN": {
      const entry = action.payload;
      return {
        ...state,
        listenHistory: [entry, ...state.listenHistory].slice(0, 100),
        analyticsEvents: [
          ...state.analyticsEvents,
          {
            type: entry.progressPct >= 90 ? "session_completed" : "session_progress",
            at: Date.now(),
            sessionId: entry.sessionId,
            progressPct: entry.progressPct,
          },
        ],
      };
    }
    case "SUBMIT_FEEDBACK":
      return {
        ...state,
        feedback: [action.payload, ...state.feedback],
        analyticsEvents: [
          ...state.analyticsEvents,
          { type: "feedback_submitted", at: Date.now(), sessionId: action.payload.sessionId },
        ],
      };
    case "ADD_INVITE": {
      const invite = action.payload;
      const listener = {
        id: `lis-${Date.now()}`,
        name: invite.name || invite.email.split("@")[0],
        email: invite.email,
        partnerId: invite.partnerId,
        inviteCode: invite.code,
        status: "invited",
      };
      return {
        ...state,
        invites: [invite, ...state.invites],
        listeners: [listener, ...state.listeners],
      };
    }
    case "UPSERT_SESSION": {
      const session = action.payload;
      const exists = state.catalog.some((s) => s.id === session.id);
      return {
        ...state,
        catalog: exists
          ? state.catalog.map((s) => (s.id === session.id ? { ...s, ...session } : s))
          : [session, ...state.catalog],
      };
    }
    case "UPSERT_PARTNER": {
      const partner = action.payload;
      const exists = state.partners.some((p) => p.id === partner.id);
      return {
        ...state,
        partners: exists
          ? state.partners.map((p) => (p.id === partner.id ? { ...p, ...partner } : p))
          : [partner, ...state.partners],
      };
    }
    case "RESET_APP":
      return { ...initialState };
    default:
      return state;
  }
}

const AppStoreContext = createContext(null);

export function AppStoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const loginListener = useCallback(({ email, password, inviteCode, isInviteRedeem = false }) => {
    const creds = DEMO_CREDENTIALS.listener;
    const byInvite = state.invites.find(
      (i) => i.code.toUpperCase() === (inviteCode || "").toUpperCase().trim(),
    );
    const byEmail = state.listeners.find(
      (l) => l.email.toLowerCase() === email?.toLowerCase().trim(),
    );
    // Invite redemption (email deep link) — not a returning password sign-in.
    const redeem = Boolean(isInviteRedeem || (inviteCode && !password));

    // Demo shortcut
    if (
      email?.toLowerCase() === creds.email &&
      (password === creds.password || inviteCode?.toUpperCase() === creds.inviteCode)
    ) {
      const listener = state.listeners.find((l) => l.email === creds.email) ?? DEMO_LISTENERS[0];
      dispatch({
        type: "LOGIN_LISTENER",
        payload: {
          email: listener.email,
          name: listener.name,
          partnerId: listener.partnerId,
          inviteCode: listener.inviteCode,
          isInviteRedeem: redeem,
        },
      });
      return { ok: true };
    }

    if (byInvite && (!email || byInvite.email.toLowerCase() === email.toLowerCase())) {
      const listener =
        state.listeners.find((l) => l.inviteCode === byInvite.code) ??
        { name: byInvite.email.split("@")[0], email: byInvite.email, partnerId: byInvite.partnerId };
      dispatch({
        type: "LOGIN_LISTENER",
        payload: {
          email: listener.email,
          name: listener.name,
          partnerId: byInvite.partnerId,
          inviteCode: byInvite.code,
          isInviteRedeem: true,
        },
      });
      return { ok: true };
    }

    if (byEmail && (password === "listen" || inviteCode)) {
      dispatch({
        type: "LOGIN_LISTENER",
        payload: {
          email: byEmail.email,
          name: byEmail.name,
          partnerId: byEmail.partnerId,
          inviteCode: byEmail.inviteCode,
          isInviteRedeem: redeem,
        },
      });
      return { ok: true };
    }

    return { ok: false, error: "Invite or credentials not recognised. Try the demo account." };
  }, [state.invites, state.listeners]);

  const loginPartner = useCallback(({ email, password }) => {
    const creds = DEMO_CREDENTIALS.partner;
    if (email?.toLowerCase() === creds.email && password === creds.password) {
      const partner = state.partners.find((p) => p.id === creds.partnerId);
      dispatch({
        type: "LOGIN_PARTNER",
        payload: { email: creds.email, name: partner?.name ?? "Partner", partnerId: creds.partnerId },
      });
      return { ok: true };
    }
    // Match partner email pattern: ops@ or any email + password partner
    const partner = state.partners[0];
    if (password === "partner" && email) {
      dispatch({
        type: "LOGIN_PARTNER",
        payload: { email, name: partner.name, partnerId: partner.id },
      });
      return { ok: true };
    }
    return { ok: false, error: "Partner credentials not recognised." };
  }, [state.partners]);

  const loginAdmin = useCallback(({ email, password }) => {
    const creds = DEMO_CREDENTIALS.admin;
    if (email?.toLowerCase() === creds.email && password === creds.password) {
      dispatch({ type: "LOGIN_ADMIN", payload: { email: creds.email, name: "Sonocea Admin" } });
      return { ok: true };
    }
    if (password === "admin" && email) {
      dispatch({ type: "LOGIN_ADMIN", payload: { email, name: "Sonocea Admin" } });
      return { ok: true };
    }
    return { ok: false, error: "Admin credentials not recognised." };
  }, []);

  const library = useMemo(() => {
    if (state.role !== "listener" || !state.user?.partnerId) return [];
    return sessionsForNeurotype(state.neurotypeId, state.user.partnerId, state.catalog);
  }, [state.role, state.user, state.neurotypeId, state.catalog]);

  const value = useMemo(
    () => ({
      ...state,
      library,
      dispatch,
      loginListener,
      loginPartner,
      loginAdmin,
      logout: () => dispatch({ type: "LOGOUT" }),
      completeOnboarding: () => dispatch({ type: "COMPLETE_ONBOARDING" }),
      setOnboardingPrefs: (prefs) => dispatch({ type: "SET_ONBOARDING_PREFS", payload: prefs }),
      setNeurotype: (id) => dispatch({ type: "SET_NEUROTYPE", payload: id }),
      setAppearance: (value) => dispatch({ type: "SET_APPEARANCE", payload: value }),
      toggleFavorite: (id) => dispatch({ type: "TOGGLE_FAVORITE", payload: id }),
      recordListen: (entry) => dispatch({ type: "RECORD_LISTEN", payload: entry }),
      submitFeedback: (entry) => dispatch({ type: "SUBMIT_FEEDBACK", payload: entry }),
      addInvite: (invite) => dispatch({ type: "ADD_INVITE", payload: invite }),
      upsertSession: (session) => dispatch({ type: "UPSERT_SESSION", payload: session }),
      upsertPartner: (partner) => dispatch({ type: "UPSERT_PARTNER", payload: partner }),
      resetApp: () => {
        localStorage.removeItem(STORAGE_KEY);
        dispatch({ type: "RESET_APP" });
      },
      getSession: (id) => state.catalog.find((s) => s.id === id),
      demoCredentials: DEMO_CREDENTIALS,
    }),
    [state, library, loginListener, loginPartner, loginAdmin],
  );

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export function useAppStore() {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error("useAppStore must be used within AppStoreProvider");
  return ctx;
}
