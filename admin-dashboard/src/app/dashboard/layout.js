"use client";

import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MainLayout from "../../components/layout/MainLayout";

export default function DashboardLayout({ children }) {
  const { isAuthenticated, loading, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/");
    }
  }, [loading, isAuthenticated]);

  if (loading) return <div>Checking auth...</div>;

  if (!isAuthenticated) return null;
  return <MainLayout>{children}</MainLayout>;
}
