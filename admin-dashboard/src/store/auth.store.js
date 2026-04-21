import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

setUser: (user) => {
  console.log("✅ setUser", user);
  set({
    user,
    isAuthenticated: true,
    loading: false,
  });
},

clearUser: () => {
  console.log("❌ clearUser");
  set({
    user: null,
    isAuthenticated: false,
    loading: false,
  });
},

  logout: () => {
    console.log("🚪 logout called");
    set({
      user: null,
      isAuthenticated: false,
      loading: false,
    });
  },
}));