import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useHotelBookingStore = create(
  persist(
    (set) => ({
      bookingData: null,

      setBookingData: (data) =>
        set({
          bookingData: data,
        }),

      clearBookingData: () =>
        set({
          bookingData: null,
        }),
    }),
    {
      name: "hotel-booking-storage",
    },
  ),
);
