"use client";

import { useSession } from "next-auth/react";

import { useAuthModalStore } from "../store/authModal.store";

export const useAuthGuard = () => {
  const { data: session } = useSession();

  const openLoginModal = useAuthModalStore((state) => state.openLoginModal);

  const requireAuth = (callback) => {
    if (!session?.user?.id) {
      openLoginModal();
      return;
    }

    callback?.();
  };

  return {
    session,
    isAuthenticated: !!session?.user?.id,
    requireAuth,
  };
};
