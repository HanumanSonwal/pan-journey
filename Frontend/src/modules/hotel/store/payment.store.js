import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useHotelPaymentStore = create(
  persist(
    (set) => ({
      paymentData: null,

      setPaymentData: (data) =>
        set({
          paymentData: data,
        }),

      clearPaymentData: () =>
        set({
          paymentData: null,
        }),
    }),
    {
      name: "hotel-payment",
    },
  ),
);
