"use client";

import GlobalLoader from "@/components/common/GlobalLoader";
import { getMe } from "@/modules/auth/api/auth.service";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { useEffect, useRef } from "react";

export function AuthProvider({ children }) {
  const { setUser, clearUser, setLoading, isLoading } = useAuthStore();

  const hasFetched = useRef(false);

  useEffect(() => {
    let mounted = true;

    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchUser = async () => {
      if (mounted) {
        setLoading(true);
      }

      try {
        const res = await getMe();

        if (!mounted) return;

        if (res?.success && res?.data?.user) {
          setUser(res.data.user);
        } else {
          clearUser();
        }
      } catch {
        if (mounted) {
          clearUser();
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      mounted = false;
    };
  }, [setUser, clearUser, setLoading]);

  if (isLoading) return <GlobalLoader />;

  return children;
}
