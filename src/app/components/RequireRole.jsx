import { useEffect } from "react";
import { DEMO_CREDENTIALS } from "../data/catalog.js";
import { useAppStore } from "../context/AppStore.jsx";

/**
 * Ensures the demo role is active for Partner/Admin routes.
 * Avoids Navigate-to-/app races that bounce users to Listener while switching surfaces.
 */
export function RequirePartner({ children }) {
  const { role, user, loginPartner } = useAppStore();

  useEffect(() => {
    if (role === "partner" && user) return;
    loginPartner({
      email: DEMO_CREDENTIALS.partner.email,
      password: DEMO_CREDENTIALS.partner.password,
    });
  }, [role, user, loginPartner]);

  if (role !== "partner" || !user) {
    return (
      <div className="px-5 py-12 text-[13px] text-white/50 md:px-8">Opening partner console…</div>
    );
  }

  return children;
}

export function RequireAdmin({ children }) {
  const { role, user, loginAdmin } = useAppStore();

  useEffect(() => {
    if (role === "admin" && user) return;
    loginAdmin({
      email: DEMO_CREDENTIALS.admin.email,
      password: DEMO_CREDENTIALS.admin.password,
    });
  }, [role, user, loginAdmin]);

  if (role !== "admin" || !user) {
    return (
      <div className="px-5 py-12 text-[13px] text-white/50 md:px-8">Opening admin console…</div>
    );
  }

  return children;
}
