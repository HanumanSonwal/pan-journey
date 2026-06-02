import dayjs from "dayjs";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const defaultSearchData = {
  city: "",
  cityData: {
    id: "",
    stateName: "",
    countryCode: "",
  },
  checkIn: dayjs().format("YYYY-MM-DD"),
  checkOut: dayjs().add(1, "day").format("YYYY-MM-DD"),
  rooms: 1,
  adults: 2,
  children: 0,
  childAges: [],
  pets: false,
};

export const useHotelSearchStore = create(
  persist(
    (set) => ({
      draftSearchData: defaultSearchData,

      appliedSearchData: defaultSearchData,

      setDraftSearchData: (data) =>
        set((state) => ({
          draftSearchData: {
            ...state.draftSearchData,
            ...data,
          },
        })),

      applySearch: () =>
        set((state) => ({
          appliedSearchData: state.draftSearchData,
        })),

      setAppliedSearchData: (data) =>
        set({
          appliedSearchData: data,
        }),
    }),
    {
      name: "hotel-search-storage",
    },
  ),
);
