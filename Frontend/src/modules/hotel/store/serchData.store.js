import dayjs from "dayjs";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const defaultSearchData = {
  city: "",
  cityData: null,
  checkIn: dayjs().format("YYYY-MM-DD"),
  checkOut: dayjs()
    .add(1, "day")
    .format("YYYY-MM-DD"),
  rooms: 1,
  adults: 2,
  children: 0,
  childAges: [],
  pets: false,
};

export const useHotelSearchStore = create(
  persist(
    (set) => ({
      searchData: defaultSearchData,
      setSearchData: (data) =>
        set({
          searchData: data,
        }),
      updateSearchData: (data) =>
        set((state) => ({
          searchData: {
            ...state.searchData,
            ...data,
          },
        })),
      resetSearchData: () =>
        set({
          searchData: defaultSearchData,
        }),
    }),
    {
      name: "hotel-search-storage",
    }
  )
);