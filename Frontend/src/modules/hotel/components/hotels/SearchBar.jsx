"use client";

import { useHotelSearchStore } from "@/modules/hotel/store/serchData.store";
import DateRangeField from "@/modules/shared/home/components/DateRangeField";
import DestinationSearchField from "@/modules/shared/home/components/DestinationSearchField";
import GuestsField from "@/modules/shared/home/components/GuestsField";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function SearchBar({ onSearch }) {
  const router = useRouter();
  const { searchData, updateSearchData } = useHotelSearchStore();
  const [dateOpen, setDateOpen] = useState(false);
  const [guestOpen, setGuestOpen] = useState(false);
  const destinationClickedRef = useRef(false);

  const handleSearch = () => {
    onSearch?.();
    const query = new URLSearchParams({
      city: searchData?.city || "",
      cityId: searchData?.cityData?.id || "",
      checkIn: searchData?.checkIn || "",
      checkOut: searchData?.checkOut || "",
      rooms: String(searchData?.rooms || 1),
      adults: String(searchData?.adults || 2),
      children: String(searchData?.children || 0),
      pets: searchData?.pets ? "true" : "false",
    });
    router.push(`/hotels?${query.toString()}`);
  };

  return (
    <div className="relative mb-3 bg-[#72C0F0] px-2 py-10 pb-10 shadow md:px-6">
      <div className="mx-auto max-w-[1200px]">
        {/* HEADINGS */}
        <div className="mb-2 hidden grid-cols-12 gap-3 px-1 text-sm text-white md:grid">
          <div className="col-span-4">City / Location</div>
          <div className="col-span-3">Check-In / Check-Out</div>
          <div className="col-span-3">Guests</div>
          <div className="col-span-2"></div>
        </div>
        <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-12">
          <div
            className="md:col-span-4"
            onClick={() => {
              destinationClickedRef.current = true;
            }}
          >
            <DestinationSearchField
              value={{
                city: searchData?.city,
                cityData: searchData?.cityData,
              }}
              onChange={(val) => {
                updateSearchData(val);
                if (
                  destinationClickedRef.current &&
                  (val?.city || val?.cityData)
                ) {
                  requestAnimationFrame(() => {
                    setDateOpen(true);
                  });
                }
              }}
              compact
              fontSize="16px"
              height="50px"
              wrapperClassName="bg-white !py-0"
            />
          </div>

          <div className="relative z-50 md:col-span-3">
            <DateRangeField
              variant="compact"
              open={dateOpen}
              setOpen={setDateOpen}
              value={[dayjs(searchData.checkIn), dayjs(searchData.checkOut)]}
              onChange={(dates) => {
                updateSearchData({
                  checkIn: dates?.[0]?.format("YYYY-MM-DD"),
                  checkOut: dates?.[1]?.format("YYYY-MM-DD"),
                });
                if (dates?.[0] && dates?.[1]) {
                  setDateOpen(false);
                  requestAnimationFrame(() => {
                    setGuestOpen(true);
                  });
                }
              }}
            />
          </div>
          <div className="relative z-40 md:col-span-3">
            <GuestsField
              variant="compact"
              open={guestOpen}
              setOpen={setGuestOpen}
              value={searchData}
              onChange={(val) => {
                updateSearchData(val);
              }}
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="button"
              onClick={handleSearch}
              className="h-[50px] w-full rounded bg-[#0f766e] text-sm font-semibold tracking-wide text-white! transition-all duration-200 hover:bg-[#0d5f58] active:scale-[0.98]"
            >
              SEARCH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
