"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuthModalStore } from "../store/authModal.store";

export default function AuthGuard({ children }) {
  const router = useRouter();

  const { data: session, status } = useSession();

  const openLoginModal = useAuthModalStore((state) => state.openLoginModal);

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user?.id) {
      openLoginModal();
      router.replace("/");
    }
  }, [status, session, openLoginModal, router]);

  if (status === "loading") {
    return null;
  }

  if (!session?.user?.id) {
    return null;
  }

  return children;
}
