"use client";

import { useEffect } from "react";
import { getMe } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export function AuthProvider({ children }) {
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);

  useEffect(() => {
    // ✅ GLOBAL GUARD (persist across remounts)
    if (window.__authFetched) {
      console.log("⛔ Skipping getMe (already called)");
      return;
    }

    window.__authFetched = true;

    console.log("🚀 AuthProvider RUN (only once globally)");

    const fetchUser = async () => {
      try {
        const res = await getMe();

        console.log("📦 getMe:", res);

        if (res?.success && res?.data?.user) {
          setUser(res.data.user);
        } else {
          clearUser();
        }
      } catch (err) {
        console.log("💥 error:", err);
        clearUser();
      }
    };

    fetchUser();
  }, []);

  return children;
}