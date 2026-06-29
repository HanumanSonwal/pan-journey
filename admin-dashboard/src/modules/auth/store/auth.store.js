// import { create } from "zustand";

// export const useAuthStore = create((set) => ({
//   user: null,
//   permissions: {},
//   isAuthenticated: false,
//   isLoading: true,

//   setUser: (user) =>
//     set({
//       user: user,
//       permissions: user?.permissions || {},
//       isAuthenticated: true,
//       isLoading: false,
//     }),

//   clearUser: () =>
//     set({
//       user: null,
//       permissions: {},
//       isAuthenticated: false,
//       isLoading: false,
//     }),

//   setLoading: (loading) =>
//     set({
//       isLoading: loading,
//     }),
// }));


import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      permissions: {},
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) =>
        set({
          user,
          permissions: user?.permissions || {},
          isAuthenticated: true,
        }),

      clearUser: () =>
        set({
          user: null,
          permissions: {},
          isAuthenticated: false,
        }),
    }),
    {
      name: "admin-auth",
    }
  )
);