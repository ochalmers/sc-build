import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { resolveBrandLogoSrc } from "../../assets/brand/brandAssets.js";
import {
  DEMO_CREDENTIALS,
  DEMO_LISTENERS,
  DEMO_PARTNERS,
  DIRECT_ACCESS_PARTNER_ID,
  PNE_ORGANIZATION,
  SESSION_CATALOG,
  SESSION_GROUPS,
  SONOCEA_DIRECT_ORGANIZATION,
  buildDemoListenHistory,
  emptyListenerProfile,
  resolvePartner,
  sessionsForNeurotype,
} from "../data/catalog.js";

const STORAGE_KEY = "sonocea-prd-app-v9";

function resolveLogoSrc(src, { isPreston = false, fallback = "" } = {}) {
  return resolveBrandLogoSrc(src, { isPreston, fallback });
}

function findListenerIndex(listeners, user) {
  if (!user) return -1;
  const byEmail = user.email
    ? listeners.findIndex((l) => l.email?.toLowerCase() === user.email.toLowerCase())
    : -1;
  if (byEmail >= 0) return byEmail;
  if (!user.inviteCode) return -1;
  return listeners.findIndex(
    (l) => l.inviteCode?.toUpperCase() === user.inviteCode.toUpperCase(),
  );
}

function syncListenerFromSession(state, patch = {}) {
  const idx = findListenerIndex(state.listeners, state.user);
  if (idx < 0) return state.listeners;
  const current = state.listeners[idx];
  const prefs = state.onboardingPrefs ?? {};
  const next = {
    ...current,
    displayName: state.user?.displayName ?? current.displayName,
    isAnonymous: state.user?.isAnonymous ?? current.isAnonymous,
    neurotypeId: state.neurotypeId ?? current.neurotypeId,
    appearance: state.appearance ?? current.appearance,
    notificationsEnabled:
      state.notificationsEnabled === null
        ? (current.notificationsEnabled ?? null)
        : state.notificationsEnabled,
    identityId: prefs.neurodivergence ?? prefs.identityId ?? current.identityId,
    sensoryId: prefs.sensorySensitivity ?? prefs.sensoryId ?? current.sensoryId,
    moodIds: prefs.listeningMoments ?? prefs.moodIds ?? current.moodIds ?? [],
    supportIds: prefs.supportGoals ?? prefs.supportIds ?? current.supportIds ?? [],
    listenTime: prefs.listenTime ?? current.listenTime,
    listenTimes: prefs.listeningTimes ?? prefs.listenTimes ?? current.listenTimes ?? [],
    firstSessionStarted:
      prefs.firstSessionStarted ?? current.firstSessionStarted ?? false,
    ...patch,
  };
  return state.listeners.map((l, i) => (i === idx ? next : l));
}

const initialState = {
  role: null, // listener | partner | admin
  user: null,
  onboardingComplete: false,
  neurotypeId: null,
  /**
   * Personalisation: preferredName, supportGoals, listeningMoments, listeningTimes,
   * appearancePreference, notificationPreference, firstSessionStarted
   * Research (separate): sensorySensitivity, neurodivergence
   * Legacy aliases kept: displayName, supportIds, moodIds, listenTime, sensoryId, identityId
   */
  onboardingPrefs: null,
  appearance: "light", // light | dark | adapt
  notificationsEnabled: null, // null | true | false - set during onboarding
  favoriteIds: [], // deferred for v1 UI - kept for future Saved surface
  listenHistory: buildDemoListenHistory(), // { sessionId, listenerId, partnerId, completedAt, progressPct, durationMin }
  feedback: [], // { sessionId, rating, note, at, phase?: 'before'|'after', pairId? }
  partners: DEMO_PARTNERS,
  listeners: DEMO_LISTENERS,
  catalog: SESSION_CATALOG,
  sessionGroups: SESSION_GROUPS,
  invites: [
    {
      id: "inv-1",
      code: "PRESTON-ALEX",
      email: "alex@example.com",
      partnerId: "org-preston",
      status: "accepted",
      kind: "named",
    },
    {
      id: "inv-2",
      code: "HAVEN-JORDAN",
      email: "jordan@example.com",
      partnerId: "org-haven",
      status: "pending",
      kind: "named",
    },
    {
      id: "inv-3",
      code: "SUMMIT-SAM",
      email: "sam@summit.lab",
      partnerId: "org-summit",
      status: "accepted",
      kind: "named",
    },
    {
      id: "inv-anon-1",
      code: "SONOCEA-RIVER",
      email: "",
      partnerId: DIRECT_ACCESS_PARTNER_ID,
      status: "accepted",
      kind: "anonymous",
    },
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
    const listeners = (parsed.listeners?.length ? parsed.listeners : DEMO_LISTENERS).map((l) => {
      const demo = DEMO_LISTENERS.find(
        (d) => d.id === l.id || (d.email && l.email && d.email === l.email) || d.inviteCode === l.inviteCode,
      );
      return {
        ...emptyListenerProfile(),
        ...demo,
        ...l,
        partnerId: migratePartnerId(l.partnerId),
        inviteCode: l.inviteCode === "MERIDIAN-ALEX" ? "PRESTON-ALEX" : l.inviteCode,
        neurotypeId: l.neurotypeId ?? demo?.neurotypeId ?? null,
        moodIds: l.moodIds ?? demo?.moodIds ?? [],
        supportIds: l.supportIds ?? demo?.supportIds ?? [],
      };
    });
    for (const demo of DEMO_LISTENERS) {
      if (!listeners.some((l) => l.id === demo.id || l.inviteCode === demo.inviteCode)) {
        listeners.push({ ...emptyListenerProfile(), ...demo });
      }
    }
    const invites = (parsed.invites ?? initialState.invites).map((inv) => ({
      ...inv,
      partnerId: migratePartnerId(inv.partnerId),
      code: inv.code === "MERIDIAN-ALEX" ? "PRESTON-ALEX" : inv.code,
    }));
    for (const inv of initialState.invites) {
      if (!invites.some((i) => i.code === inv.code)) {
        invites.push(inv);
      }
    }
    const user = parsed.user
      ? {
          ...parsed.user,
          partnerId: migratePartnerId(parsed.user.partnerId),
          inviteCode:
            parsed.user.inviteCode === "MERIDIAN-ALEX" ? "PRESTON-ALEX" : parsed.user.inviteCode,
        }
      : null;

    // Refresh sparse persisted demos so Admin home charts stay platform-scale.
    const listenHistory = (
      parsed.listenHistory?.length >= 40 ? parsed.listenHistory : buildDemoListenHistory()
    ).map((entry) => ({
      ...entry,
      partnerId: migratePartnerId(entry.partnerId),
    }));

    const partnerCatalog = [...DEMO_PARTNERS, PNE_ORGANIZATION, SONOCEA_DIRECT_ORGANIZATION];
    const partners = (parsed.partners?.length ? parsed.partners : DEMO_PARTNERS).map((p) => {
      const id = migratePartnerId(p.id);
      const demo = partnerCatalog.find((d) => d.id === id);
      const isPreston =
        id === "org-preston" ||
        /preston\s*north\s*end/i.test(p.name ?? demo?.name ?? "");
      return {
        ...demo,
        ...p,
        id,
        logoSrc: resolveLogoSrc(p.logoSrc || demo?.logoSrc, {
          isPreston,
          fallback: "",
        }),
        monogram: p.monogram || demo?.monogram || (isPreston ? "PNE" : ""),
        status: p.status ?? demo?.status ?? "active",
        orgType: p.orgType ?? demo?.orgType ?? "other",
        sessionIds: (p.sessionIds ?? demo?.sessionIds ?? []).slice(),
        bundleIds: (p.bundleIds ?? demo?.bundleIds ?? []).slice(),
        contactName: p.contactName ?? demo?.contactName ?? "",
        contactEmail: p.contactEmail ?? demo?.contactEmail ?? "",
        contactRole: p.contactRole ?? demo?.contactRole ?? "",
        region: p.region ?? demo?.region ?? "",
        website: p.website ?? demo?.website ?? "",
        notes: p.notes ?? demo?.notes ?? "",
        inviteAccent: p.inviteAccent ?? demo?.inviteAccent ?? "#1a1a1a",
        inviteHighlight: p.inviteHighlight ?? demo?.inviteHighlight ?? "#c9a86a",
        programmeTitle: p.programmeTitle || demo?.programmeTitle || "",
        programme: p.programme || demo?.programme || "",
        inviteLine: p.inviteLine || demo?.inviteLine || "",
        homeModes: Array.isArray(p.homeModes)
          ? p.homeModes
          : Array.isArray(demo?.homeModes)
            ? demo.homeModes
            : undefined,
        isDirectAccess: Boolean(p.isDirectAccess ?? demo?.isDirectAccess),
      };
    });

    // Ensure direct-access org is available for Anonymous Combined demos.
    if (!partners.some((p) => p.id === DIRECT_ACCESS_PARTNER_ID)) {
      partners.push({ ...SONOCEA_DIRECT_ORGANIZATION });
    }
    const mergedCatalog = (() => {
      if (!parsed.catalog?.length) return SESSION_CATALOG;
      const byId = new Map(
        parsed.catalog.map((s) => {
          const demo = SESSION_CATALOG.find((d) => d.id === s.id);
          return [
            s.id,
            {
              ...demo,
              ...s,
              title: demo?.title ?? s.title,
              partnerIds: (s.partnerIds ?? demo?.partnerIds ?? []).map(migratePartnerId),
              neurotype: s.neurotype?.length ? s.neurotype : demo?.neurotype ?? [],
              tags: s.tags ?? demo?.tags ?? [],
              category: s.category ?? s.useCase ?? demo?.category ?? "Custom",
              status: s.status ?? "published",
              groupIds: s.groupIds ?? demo?.groupIds ?? [],
              timeOfDay: s.timeOfDay ?? demo?.timeOfDay,
            },
          ];
        }),
      );
      SESSION_CATALOG.forEach((demo) => {
        if (!byId.has(demo.id)) byId.set(demo.id, demo);
        else {
          const cur = byId.get(demo.id);
          byId.set(demo.id, {
            ...demo,
            ...cur,
            title: demo.title,
            timeOfDay: demo.timeOfDay ?? cur.timeOfDay,
            neurotype: demo.neurotype,
            partnerIds: Array.from(
              new Set([...(cur.partnerIds ?? []), ...(demo.partnerIds ?? [])].map(migratePartnerId)),
            ),
          });
        }
      });
      return Array.from(byId.values());
    })();

    // Listener prototype defaults to light. Persist explicit dark only — older
    // "adapt" sessions resolved to dark after 6pm and looked like a dark default.
    const appearance =
      parsed.appearance === "dark" ? "dark" : initialState.appearance;

    return {
      ...initialState,
      ...parsed,
      user,
      partners,
      listeners,
      invites,
      listenHistory,
      sessionGroups: SESSION_GROUPS,
      catalog: mergedCatalog,
      appearance,
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
      const { email, inviteCode, name, partnerId, isInviteRedeem, displayName, isAnonymous } =
        action.payload;
      const profile =
        state.listeners.find(
          (l) =>
            (email && l.email?.toLowerCase() === email.toLowerCase()) ||
            (inviteCode && l.inviteCode?.toUpperCase() === inviteCode.toUpperCase()),
        ) ?? null;
      const restoreProfile = !isInviteRedeem && profile?.onboardingComplete;
      const resolvedAnonymous = Boolean(isAnonymous ?? profile?.isAnonymous);
      return {
        ...state,
        role: "listener",
        user: {
          email,
          name,
          partnerId,
          inviteCode,
          // Anonymous invite redemption has no known name yet — don't seed
          // a demo displayName into the name step.
          displayName:
            resolvedAnonymous && isInviteRedeem
              ? displayName ?? null
              : displayName ?? profile?.displayName ?? null,
          isAnonymous: resolvedAnonymous,
        },
        // Fresh invitation redemptions always enter First-Time Experience
        // with a clean listening slate (no seeded resume / history).
        ...(isInviteRedeem
          ? {
              onboardingComplete: false,
              neurotypeId: null,
              onboardingPrefs: null,
              favoriteIds: [],
              feedback: [],
              listenHistory: state.listenHistory.filter((h) => {
                const listener = state.listeners.find(
                  (l) =>
                    l.email === email ||
                    (inviteCode && l.inviteCode?.toUpperCase() === inviteCode.toUpperCase()),
                );
                if (!listener) return true;
                return h.listenerId !== listener.id;
              }),
            }
          : restoreProfile
            ? {
                onboardingComplete: true,
                neurotypeId: profile.neurotypeId ?? state.neurotypeId,
                onboardingPrefs: {
                  preferredName: profile.displayName ?? null,
                  supportGoals: profile.supportIds ?? [],
                  listeningMoments: profile.moodIds ?? [],
                  listeningTimes: profile.listenTimes?.length
                    ? profile.listenTimes
                    : profile.listenTime
                      ? [profile.listenTime]
                      : [],
                  sensorySensitivity: profile.sensoryId ?? null,
                  neurodivergence: profile.identityId ?? null,
                  supportIds: profile.supportIds ?? [],
                  moodIds: profile.moodIds ?? [],
                  listenTime: profile.listenTime ?? null,
                },
                appearance:
                  (profile.appearance ?? state.appearance) === "dark" ? "dark" : "light",
                notificationsEnabled: profile.notificationsEnabled ?? state.notificationsEnabled,
              }
            : {}),
        analyticsEvents: [
          ...state.analyticsEvents,
          {
            type: isInviteRedeem ? "invite_redeemed" : "listener_login",
            at: Date.now(),
            email: isAnonymous ? undefined : email,
            anonymous: Boolean(isAnonymous),
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
          { type: "organization_login", at: Date.now(), partnerId: action.payload.partnerId },
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
    case "COMPLETE_ONBOARDING": {
      const listener =
        state.listeners.find((l) => l.email === state.user?.email) ??
        state.listeners.find((l) => l.inviteCode === state.user?.inviteCode);
      const listeners = syncListenerFromSession(state, {
        onboardingComplete: true,
        status: "active",
      });
      return {
        ...state,
        onboardingComplete: true,
        listeners,
        // Fresh first-time path: Home starts empty - no resume or seeded history.
        favoriteIds: [],
        feedback: [],
        listenHistory: listener
          ? state.listenHistory.filter((h) => h.listenerId !== listener.id)
          : state.listenHistory,
      };
    }
    case "SET_ONBOARDING_PREFS":
      return {
        ...state,
        onboardingPrefs: action.payload,
        listeners: syncListenerFromSession(
          { ...state, onboardingPrefs: action.payload },
          {
            identityId:
              action.payload?.neurodivergence ?? action.payload?.identityId ?? null,
            sensoryId:
              action.payload?.sensorySensitivity ?? action.payload?.sensoryId ?? null,
            moodIds:
              action.payload?.listeningMoments ?? action.payload?.moodIds ?? [],
            supportIds:
              action.payload?.supportGoals ?? action.payload?.supportIds ?? [],
            listenTime: action.payload?.listenTime ?? null,
            listenTimes:
              action.payload?.listeningTimes ?? action.payload?.listenTimes ?? [],
            displayName:
              action.payload?.preferredName ??
              action.payload?.displayName ??
              state.user?.displayName,
            appearance:
              action.payload?.appearancePreference ??
              action.payload?.appearance ??
              state.appearance,
            firstSessionStarted: Boolean(action.payload?.firstSessionStarted),
          },
        ),
      };
    case "UPDATE_LISTENER_PROFILE": {
      if (!state.user) return state;
      const next = { ...state.user, ...action.payload };
      return {
        ...state,
        user: next,
        listeners: syncListenerFromSession({ ...state, user: next }, action.payload),
      };
    }
    case "SET_NEUROTYPE":
      return {
        ...state,
        neurotypeId: action.payload,
        listeners: syncListenerFromSession(
          { ...state, neurotypeId: action.payload },
          { neurotypeId: action.payload },
        ),
        analyticsEvents: [
          ...state.analyticsEvents,
          { type: "neurotype_set", at: Date.now(), neurotypeId: action.payload },
        ],
      };
    case "SET_APPEARANCE": {
      const raw = action.payload;
      const appearance =
        raw === "dark" || raw === "adapt" ? raw : "light";
      if (state.appearance === appearance) return state;
      return {
        ...state,
        appearance,
        listeners: syncListenerFromSession({ ...state, appearance }, { appearance }),
      };
    }
    case "SET_NOTIFICATIONS_ENABLED": {
      const notificationsEnabled = Boolean(action.payload);
      return {
        ...state,
        notificationsEnabled,
        listeners: syncListenerFromSession(
          { ...state, notificationsEnabled },
          { notificationsEnabled },
        ),
      };
    }
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
      // Replace prior in-progress rows for this session so Home never resumes
      // a track that was later finished (or progressed further).
      const withoutStaleProgress = state.listenHistory.filter((h) => {
        if (h.sessionId !== entry.sessionId) return true;
        if (entry.listenerId && h.listenerId && h.listenerId !== entry.listenerId) return true;
        return (h.progressPct ?? 0) >= 90;
      });
      return {
        ...state,
        listenHistory: [entry, ...withoutStaleProgress].slice(0, 100),
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
    case "ADD_INVITES": {
      const invites = action.payload;
      const list = Array.isArray(invites) ? invites : [invites];
      const newListeners = list
        .filter((invite) => invite.email || invite.name)
        .map((invite, index) =>
          emptyListenerProfile({
            id: `lis-${Date.now()}-${index}`,
            name: invite.name || invite.email?.split("@")[0] || `Listener ${invite.code}`,
            email: invite.email || `${invite.code.toLowerCase()}@invite.sonocea.local`,
            partnerId: invite.partnerId,
            inviteCode: invite.code,
            status: "invited",
          }),
        );
      const partnerId = list[0]?.partnerId;
      const partners = partnerId
        ? state.partners.map((p) =>
            p.id === partnerId
              ? { ...p, seatsUsed: Math.min(p.seats, (p.seatsUsed ?? 0) + newListeners.length) }
              : p,
          )
        : state.partners;
      return {
        ...state,
        invites: [...list, ...state.invites],
        listeners: [...newListeners, ...state.listeners],
        partners,
        analyticsEvents: [
          ...state.analyticsEvents,
          {
            type: "invite_links_generated",
            at: Date.now(),
            count: list.length,
            partnerId: list[0]?.partnerId,
          },
        ],
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
      const raw = action.payload;
      const isPreston =
        raw.id === "org-preston" ||
        /preston\s*north\s*end/i.test(raw.name ?? "");
      const partner = {
        ...raw,
        logoSrc: resolveLogoSrc(raw.logoSrc, {
          isPreston,
          fallback: raw.logoSrc || "",
        }),
      };
      const exists = state.partners.some((p) => p.id === partner.id);
      return {
        ...state,
        partners: exists
          ? state.partners.map((p) => (p.id === partner.id ? { ...p, ...partner } : p))
          : [partner, ...state.partners],
      };
    }
    case "UPSERT_SESSION_GROUP": {
      const group = action.payload;
      const exists = state.sessionGroups.some((g) => g.id === group.id);
      return {
        ...state,
        sessionGroups: exists
          ? state.sessionGroups.map((g) => (g.id === group.id ? { ...g, ...group } : g))
          : [group, ...state.sessionGroups],
      };
    }
    case "UPSERT_LISTENER": {
      const listener = action.payload;
      const exists = state.listeners.some((l) => l.id === listener.id);
      return {
        ...state,
        listeners: exists
          ? state.listeners.map((l) => (l.id === listener.id ? { ...l, ...listener } : l))
          : [listener, ...state.listeners],
        analyticsEvents: [
          ...state.analyticsEvents,
          {
            type: exists ? "listener_updated" : "listener_created",
            at: Date.now(),
            listenerId: listener.id,
            partnerId: listener.partnerId,
          },
        ],
      };
    }
    case "RESET_APP":
      return { ...initialState };
    default:
      return state;
  }
}

const AppStoreContext = createContext(null);

export function AppStoreProvider({ children, persist = true, seedState = null }) {
  const [state, dispatch] = useReducer(
    reducer,
    null,
    () => (seedState ? { ...initialState, ...seedState } : loadState()),
  );

  useEffect(() => {
    if (!persist) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, persist]);

  const loginListener = useCallback(
    ({ email, password, inviteCode, isInviteRedeem = false, isAnonymous = false }) => {
      const creds = DEMO_CREDENTIALS.listener;
      const anonCreds = DEMO_CREDENTIALS.anonymousListener;
      const byInvite = state.invites.find(
        (i) => i.code.toUpperCase() === (inviteCode || "").toUpperCase().trim(),
      );
      const byEmail = state.listeners.find(
        (l) => l.email && email && l.email.toLowerCase() === email?.toLowerCase().trim(),
      );
      // Invite redemption (email deep link) - not a returning password sign-in.
      const redeem = Boolean(isInviteRedeem || (inviteCode && !password));

      // Anonymous demo shortcut
      if (
        inviteCode?.toUpperCase() === anonCreds.inviteCode &&
        (password === anonCreds.password || redeem || isAnonymous)
      ) {
        const listener =
          state.listeners.find((l) => l.inviteCode === anonCreds.inviteCode) ??
          DEMO_LISTENERS.find((l) => l.inviteCode === anonCreds.inviteCode);
        dispatch({
          type: "LOGIN_LISTENER",
          payload: {
            email: listener?.email,
            name: listener?.name ?? "Listener",
            displayName: listener?.displayName ?? null,
            partnerId: listener?.partnerId ?? DIRECT_ACCESS_PARTNER_ID,
            inviteCode: anonCreds.inviteCode,
            isInviteRedeem: redeem,
            isAnonymous: true,
          },
        });
        return { ok: true };
      }

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
            displayName: listener.displayName ?? listener.name?.split(" ")[0],
            partnerId: listener.partnerId,
            inviteCode: listener.inviteCode,
            isInviteRedeem: redeem,
            isAnonymous,
          },
        });
        return { ok: true };
      }

      // Anonymous access: invite code + access password - verified, identity not shown in-app.
      if (isAnonymous && byInvite && password === "listen") {
        const listener =
          state.listeners.find((l) => l.inviteCode === byInvite.code) ??
          {
            name: "Listener",
            email: byInvite.email || `${byInvite.code.toLowerCase()}@invite.sonocea.local`,
            partnerId: byInvite.partnerId,
          };
        dispatch({
          type: "LOGIN_LISTENER",
          payload: {
            email: listener.email,
            name: "Listener",
            displayName: null,
            partnerId: byInvite.partnerId,
            inviteCode: byInvite.code,
            isInviteRedeem: redeem,
            isAnonymous: true,
          },
        });
        return { ok: true };
      }

      if (
        byInvite &&
        (!email ||
          !byInvite.email ||
          byInvite.email.toLowerCase() === email.toLowerCase() ||
          byInvite.kind === "link")
      ) {
        const listener =
          state.listeners.find((l) => l.inviteCode === byInvite.code) ??
          {
            name: byInvite.name || byInvite.email?.split("@")[0] || "New Listener",
            email: byInvite.email || email || `${byInvite.code.toLowerCase()}@invite.sonocea.local`,
            partnerId: byInvite.partnerId,
          };
        dispatch({
          type: "LOGIN_LISTENER",
          payload: {
            email: listener.email,
            name: listener.name,
            displayName: listener.displayName ?? listener.name?.split(" ")[0],
            partnerId: byInvite.partnerId,
            inviteCode: byInvite.code,
            isInviteRedeem: true,
            isAnonymous,
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
            displayName: byEmail.displayName ?? byEmail.name?.split(" ")[0],
            partnerId: byEmail.partnerId,
            inviteCode: byEmail.inviteCode,
            isInviteRedeem: redeem,
            isAnonymous,
          },
        });
        return { ok: true };
      }

      return { ok: false, error: "Invite or credentials not recognised. Try the demo account." };
    },
    [state.invites, state.listeners],
  );

  const loginPartner = useCallback(({ email, password }) => {
    const creds = DEMO_CREDENTIALS.partner;
    if (email?.toLowerCase() === creds.email && password === creds.password) {
      const partner = state.partners.find((p) => p.id === creds.partnerId);
      dispatch({
        type: "LOGIN_PARTNER",
        payload: {
          email: creds.email,
          name: partner?.name ?? "Organization",
          partnerId: creds.partnerId,
        },
      });
      return { ok: true };
    }
    // Match org email pattern: ops@ or any email + password partner
    const partner = state.partners[0];
    if (password === "partner" && email) {
      dispatch({
        type: "LOGIN_PARTNER",
        payload: { email, name: partner.name, partnerId: partner.id },
      });
      return { ok: true };
    }
    return { ok: false, error: "Organization credentials not recognised." };
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
    const partner = resolvePartner(state.partners, state.user.partnerId);
    return sessionsForNeurotype(
      state.neurotypeId,
      state.user.partnerId,
      state.catalog,
      partner?.sessionIds,
    );
  }, [state.role, state.user, state.neurotypeId, state.catalog, state.partners]);

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
      updateListenerProfile: (patch) => dispatch({ type: "UPDATE_LISTENER_PROFILE", payload: patch }),
      setNeurotype: (id) => dispatch({ type: "SET_NEUROTYPE", payload: id }),
      setAppearance: (value) => dispatch({ type: "SET_APPEARANCE", payload: value }),
      setNotificationsEnabled: (value) =>
        dispatch({ type: "SET_NOTIFICATIONS_ENABLED", payload: value }),
      toggleFavorite: (id) => dispatch({ type: "TOGGLE_FAVORITE", payload: id }),
      recordListen: (entry) => {
        const listener =
          state.listeners.find((l) => l.email === state.user?.email) ??
          state.listeners.find((l) => l.inviteCode === state.user?.inviteCode);
        dispatch({
          type: "RECORD_LISTEN",
          payload: {
            ...entry,
            listenerId: entry.listenerId ?? listener?.id,
            partnerId: entry.partnerId ?? state.user?.partnerId ?? listener?.partnerId,
          },
        });
      },
      submitFeedback: (entry) => dispatch({ type: "SUBMIT_FEEDBACK", payload: entry }),
      addInvite: (invite) => dispatch({ type: "ADD_INVITES", payload: [invite] }),
      addInvites: (invites) => dispatch({ type: "ADD_INVITES", payload: invites }),
      upsertSession: (session) => dispatch({ type: "UPSERT_SESSION", payload: session }),
      upsertPartner: (partner) => dispatch({ type: "UPSERT_PARTNER", payload: partner }),
      upsertSessionGroup: (group) => dispatch({ type: "UPSERT_SESSION_GROUP", payload: group }),
      upsertListener: (listener) => dispatch({ type: "UPSERT_LISTENER", payload: listener }),
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

/** Safe outside ProductApp (e.g. microsite comment FAB). */
export function useAppStoreOptional() {
  return useContext(AppStoreContext);
}
