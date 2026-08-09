import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DEMO_CREDENTIALS } from "../data/catalog.js";
import { useAppStoreOptional } from "../context/AppStore.jsx";
import { useReviewSurface } from "../context/SurfaceContext.jsx";

const AUTH_GATE_PATHS = new Set([
  "/app/listener",
  "/app/listener/email",
  "/app/listener/app-store",
  "/app/listener/invite",
  "/app/listener/login",
]);

const PENDING_NAV_KEY = "sonocea-review-pending-nav";

/**
 * Navigate to an app path with the same demo auth priming as the flow rail.
 * Without this, protected Listener screens bounce to the invitation email.
 *
 * Works inside AppShell (full auth) and on the microsite (stores a pending
 * handoff for ProductApp to apply on mount).
 */
export function useReviewNavigate() {
  const navigate = useNavigate();
  const store = useAppStoreOptional();
  const { surface, setCombinedView } = useReviewSurface();

  const goToAppPath = useCallback(
    (path, { preferPrototype = true } = {}) => {
      if (!path) return;
      if (preferPrototype) setCombinedView("prototype");

      const bare = path.split("?")[0];
      const isListener = bare.startsWith("/app/listener");
      const isAdminLogin =
        bare === "/app/admin/login" ||
        (bare === "/app/admin/setup" && path.includes("step=login"));
      const anonymous = surface === "anonymous";
      const listenerCreds = anonymous
        ? DEMO_CREDENTIALS.anonymousListener
        : DEMO_CREDENTIALS.listener;

      if (!store) {
        try {
          sessionStorage.setItem(
            PENDING_NAV_KEY,
            JSON.stringify({ path, anonymous, at: Date.now() }),
          );
        } catch {
          /* ignore */
        }
        navigate(path);
        return;
      }

      const { logout, role, loginListener, loginAdmin } = store;

      if (isListener) {
        if (AUTH_GATE_PATHS.has(bare) && role === "listener") {
          logout();
          navigate(path);
          return;
        }
        if (!AUTH_GATE_PATHS.has(bare) && role !== "listener") {
          loginListener({
            email: listenerCreds.email,
            password: listenerCreds.password,
            inviteCode: listenerCreds.inviteCode,
            isAnonymous: Boolean(listenerCreds.isAnonymous),
          });
        }
        // Combined-flow review should open Listener in light, not night-adapted dark.
        if (
          bare.startsWith("/app/listener") &&
          !AUTH_GATE_PATHS.has(bare)
        ) {
          store.setAppearance?.("light");
        }
        navigate(path);
        return;
      }

      if (isAdminLogin || bare === "/app/admin/setup") {
        if (isAdminLogin && role && role !== "admin") logout();
        navigate(path);
        return;
      }

      if (bare.startsWith("/app/admin") && role !== "admin") {
        loginAdmin({
          email: DEMO_CREDENTIALS.admin.email,
          password: DEMO_CREDENTIALS.admin.password,
        });
      }

      navigate(path);
    },
    [store, surface, setCombinedView, navigate],
  );

  return goToAppPath;
}

/** Apply microsite → /app comment jump auth once the store mounts. */
export function consumePendingReviewNav(store) {
  if (!store) return null;
  let pending;
  try {
    const raw = sessionStorage.getItem(PENDING_NAV_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(PENDING_NAV_KEY);
    pending = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!pending?.path || Date.now() - (pending.at || 0) > 15_000) return null;

  const bare = pending.path.split("?")[0];
  const { role, loginListener, loginAdmin } = store;
  const listenerCreds = pending.anonymous
    ? DEMO_CREDENTIALS.anonymousListener
    : DEMO_CREDENTIALS.listener;

  if (bare.startsWith("/app/listener") && !AUTH_GATE_PATHS.has(bare) && role !== "listener") {
    loginListener({
      email: listenerCreds.email,
      password: listenerCreds.password,
      inviteCode: listenerCreds.inviteCode,
      isAnonymous: Boolean(listenerCreds.isAnonymous),
    });
  } else if (
    bare.startsWith("/app/admin") &&
    bare !== "/app/admin/login" &&
    !(bare === "/app/admin/setup" && pending.path.includes("step=login")) &&
    role !== "admin"
  ) {
    loginAdmin({
      email: DEMO_CREDENTIALS.admin.email,
      password: DEMO_CREDENTIALS.admin.password,
    });
  }

  return pending.path;
}
