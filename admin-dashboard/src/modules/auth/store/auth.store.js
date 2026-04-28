import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  permissions: {},
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) =>
    set({
      user: user,
      permissions: user?.permissions || {},
      isAuthenticated: true,
      isLoading: false,
    }),

  clearUser: () =>
    set({
      user: null,
      permissions: {},
      isAuthenticated: false,
      isLoading: false,
    }),

  setLoading: (loading) =>
    set({
      isLoading: loading,
    }),
}));
