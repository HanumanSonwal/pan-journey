import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useHotelBookingStore = create(
  persist(
    (set) => ({
      bookingData: {
        supplierData: null,
        selectedHotel: null,
        selectedRoom: null,
        selectedRatePlan: null,
        pricingSummary: null,
        searchData: null,

        guestData: {
          primaryGuest: null,
          additionalGuests: [],
        },

        requestData: {},
        bookingRefNo: null,
      },

      ticketingData: null,

      setBookingData: (data) =>
        set((state) => ({
          bookingData: {
            ...(state.bookingData || {}),
            ...data,

            selectedHotel: {
              ...(state.bookingData?.selectedHotel || {}),
              ...(data?.selectedHotel || {}),
            },

            guestData: {
              ...(state.bookingData?.guestData || {}),
              ...(data?.guestData || {}),
            },

            requestData: {
              ...(state.bookingData?.requestData || {}),
              ...(data?.requestData || {}),
            },
          },
        })),

      setTicketingData: (data) =>
        set({
          ticketingData: data,
        }),

      clearBookingData: () =>
        set({
          bookingData: {
            supplierData: null,
            selectedHotel: null,
            selectedRoom: null,
            selectedRatePlan: null,
            pricingSummary: null,
            searchData: null,

            guestData: {
              primaryGuest: null,
              additionalGuests: [],
            },

            requestData: {},
            bookingRefNo: null,
          },

          ticketingData: null,
        }),
    }),
    {
      name: "hotel-booking-storage",
    },
  ),
);
