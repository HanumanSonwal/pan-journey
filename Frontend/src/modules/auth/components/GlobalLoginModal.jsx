"use client";

import { useAuthModalStore } from "../store/authModal.store";
import LoginModal from "./LoginFormModal";

export default function GlobalLoginModal() {
  const { isOpen, closeLoginModal } = useAuthModalStore();

  return (
    <LoginModal
      isOpen={isOpen}
      onClose={closeLoginModal}
      onSuccess={closeLoginModal}
    />
  );
}
