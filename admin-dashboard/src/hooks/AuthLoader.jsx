"use client";

import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth.store";

export default function AuthLoader({ children }) {
  useAuth();

  const user = useAuthStore((s) => s.user);

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  return children;
}