"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { getMe } from "@/services/auth.service";
import MainLayout from "../../components/layout/MainLayout";

export default function DashboardLayout({ children }) {
  const { isAuthenticated, loading, setUser, clearUser } = useAuthStore();
  const router = useRouter();

  // ✅ API call yahi hogi
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();

        if (res?.success && res?.data?.user) {
          setUser(res.data.user);
        } else {
          clearUser();
        }
      } catch {
        clearUser();
      }
    };

    fetchUser();
  }, []);

  // ✅ redirect control
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) return null;

  return <MainLayout>{children}</MainLayout>;
}