import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSelectedHotelStore = create(
  persist(
    (set) => ({
      selectedHotel: null,
      setSelectedHotel: (data) =>
        set({
          selectedHotel: data,
        }),
      clearSelectedHotel: () =>
        set({
          selectedHotel: null,
        }),
    }),
    {
      name: "selected-hotel-storage",
    },
  ),
);
