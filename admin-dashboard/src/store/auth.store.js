import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

setUser: (user) => {
  console.log("✅ Zustand me user set hua:", user);
  set({
    user,
    isAuthenticated: true,
    loading: false,
  });
},

  clearUser: () =>
    set({
      user: null,
      isAuthenticated: false,
      loading: false,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      loading: false,
    }),
}));
