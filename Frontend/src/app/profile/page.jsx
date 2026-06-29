"use client";

import AuthGuard from "@/modules/auth/components/AuthGuard";
import ProfilePage from "@/modules/profile/pages/ProfilePage";

export default function Page() {
  return (
    <AuthGuard>
      <ProfilePage />
    </AuthGuard>
  );
}
