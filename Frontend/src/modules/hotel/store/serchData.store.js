import dayjs from "dayjs";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const getDefaultSearchData = () => ({
  city: "",
  cityData: {
    id: "",
    stateName: "",
    countryCode: "",

    normalizedCity: "",
  },
  checkIn: dayjs().format("YYYY-MM-DD"),
  checkOut: dayjs().add(1, "day").format("YYYY-MM-DD"),
  rooms: 1,
  adults: 2,
  children: 0,
  childAges: [],
  pets: false,
});

export const useHotelSearchStore = create(
  persist(
    (set) => ({
      draftSearchData: getDefaultSearchData(),

      appliedSearchData: getDefaultSearchData(),

      setDraftSearchData: (data) =>
        set((state) => ({
          draftSearchData: {
            ...state.draftSearchData,
            ...data,
          },
        })),

      applySearch: () =>
        set((state) => ({
          appliedSearchData: {
            ...state.draftSearchData,
          },
        })),

      setAppliedSearchData: (data) =>
        set({
          appliedSearchData: data,
        }),
    }),
    {
      name: "hotel-search-storage",

      version: 2,

      migrate: (persistedState, version) => {
        if (version < 2) {
          const oldData = persistedState?.searchData;

          if (oldData) {
            return {
              draftSearchData: oldData,
              appliedSearchData: oldData,
            };
          }

          return {
            draftSearchData: getDefaultSearchData(),
            appliedSearchData: getDefaultSearchData(),
          };
        }

        return persistedState;
      },

      onRehydrateStorage: () => (state) => {
        if (!state) return;

        const today = dayjs().startOf("day");

        const checkIn = dayjs(state.draftSearchData?.checkIn);
        const checkOut = dayjs(state.draftSearchData?.checkOut);

        const invalidDates =
          !checkIn.isValid() ||
          checkIn.isBefore(today) ||
          !checkOut.isValid() ||
          checkOut.isBefore(today);

        if (!invalidDates) return;

        const updatedDates = {
          checkIn: today.format("YYYY-MM-DD"),
          checkOut: today.add(1, "day").format("YYYY-MM-DD"),
        };

        state.setDraftSearchData(updatedDates);

        state.setAppliedSearchData({
          ...state.appliedSearchData,
          ...updatedDates,
        });
      },
    },
  ),
);
