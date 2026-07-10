import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCurrencyStore = create(
  persist(
    (set) => ({
      selectedCurrency: {
        code: "INR",
        symbol: "₹",
        name: "Indian Rupee",
      },

      hydrated: false,

      setHydrated: () => set({ hydrated: true }),

      setCurrency: (currency) =>
        set({
          selectedCurrency: currency,
        }),
    }),
    {
      name: "currency-storage",

      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
