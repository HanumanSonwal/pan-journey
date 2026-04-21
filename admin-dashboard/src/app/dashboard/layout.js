"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import MainLayout from "../../components/layout/MainLayout";

export default function DashboardLayout({ children }) {
  const { isAuthenticated, loading } = useAuthStore();
  const router = useRouter();

  // ✅ only redirect logic
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/");
    }
  }, [loading, isAuthenticated]);

  // ⏳ wait for auth check
  if (loading) return <div>Checking auth...</div>;

  // ❌ block if not logged in
  if (!isAuthenticated) return null;

  // ✅ allow dashboard
  return <MainLayout>{children}</MainLayout>;
}