import { create } from "zustand";

export const useAuthModalStore = create((set) => ({
  isOpen: false,

  openLoginModal: () => set({ isOpen: true }),

  closeLoginModal: () => set({ isOpen: false }),
}));
