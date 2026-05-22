import { create } from "zustand";

export const useSelectedHotelStore = create((set) => ({
  selectedHotel: null,

  setSelectedHotel: (data) =>
    set({
      selectedHotel: data,
    }),
}));