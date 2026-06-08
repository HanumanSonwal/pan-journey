"use client";

import { useHotelSearchStore } from "@/modules/hotel/store/serchData.store";
import DateRangeField from "@/modules/shared/home/components/DateRangeField";
import DestinationSearchField from "@/modules/shared/home/components/DestinationSearchField";
import GuestsField from "@/modules/shared/home/components/GuestsField";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const router = useRouter();

  const { draftSearchData, setDraftSearchData, applySearch } =
    useHotelSearchStore();
  const [destinationError, setDestinationError] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [guestOpen, setGuestOpen] = useState(false);

  const citySlug =
    draftSearchData?.city
      ?.split(",")[0]
      ?.trim()
      ?.toLowerCase()
      ?.replace(/[^a-z0-9\s-]/g, "")
      ?.replace(/\s+/g, "-") || "";

  const handleSearch = () => {
    if (!draftSearchData?.city?.trim()) {
      setDestinationError(true);
      return;
    }
    setDestinationError(false);
    onSearch?.();

    const query = new URLSearchParams({
      city: citySlug,
      cityName: draftSearchData?.city || "",

      cityId: draftSearchData?.cityData?.id || "",
      stateName: draftSearchData?.cityData?.stateName || "",
      countryCode: draftSearchData?.cityData?.countryCode || "",

      checkIn: draftSearchData?.checkIn || "",
      checkOut: draftSearchData?.checkOut || "",

      rooms: String(draftSearchData?.rooms || 1),
      adults: String(draftSearchData?.adults || 2),
      children: String(draftSearchData?.children || 0),

      pets: draftSearchData?.pets ? "true" : "false",
    });
    applySearch();
    console.log("SEARCHBAR CITY =>", draftSearchData?.city);
    console.log("citySlug:", citySlug);
    console.log("queryccc:", query.toString());
    router.push(`/hotels?${query.toString()}`);
  };

  return (
    <div className="sticky top-0 z-5 bg-[#72C0F0] shadow">
      <div className="px-2 py-1 pb-8 md:px-6">
        <div className="mx-auto max-w-[1250px]">
          {/* Heading */}

          <div className="mb-2 hidden grid-cols-12 gap-3 px-1 text-sm text-white md:grid">
            <div className="col-span-4">City / Location</div>
            <div className="col-span-3">Check-In / Check-Out</div>
            <div className="col-span-3">Guests</div>
            <div className="col-span-2"></div>
          </div>

          {/* Search Controls */}
          <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-12">
            <div className="md:col-span-4">
              <DestinationSearchField
                error={destinationError}
                value={{
                  city: draftSearchData?.city,
                  cityData: draftSearchData?.cityData,
                }}
                onChange={(val) => {
                  setDestinationError(false);

                  setDraftSearchData({
                    city: val?.city || "",
                    cityData: {
                      ...val?.cityData,
                      stateName:
                        val?.cityData?.stateName || val?.cityData?.state || "",
                      countryCode:
                        val?.cityData?.countryCode ||
                        val?.cityData?.country ||
                        "",
                    },
                  });
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
                value={[
                  draftSearchData?.checkIn
                    ? dayjs(draftSearchData.checkIn)
                    : null,
                  draftSearchData?.checkOut
                    ? dayjs(draftSearchData.checkOut)
                    : null,
                ]}
                onChange={(dates) => {
                  setDraftSearchData({
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
                value={draftSearchData}
                onChange={(val) => {
                  setDraftSearchData(val);
                }}
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="button"
                onClick={handleSearch}
                className="h-[50px] w-full rounded bg-[#0f766e] text-sm font-semibold tracking-wide !text-white transition-all duration-200 hover:bg-[#0d5f58] active:scale-[0.98]"
              >
                SEARCH
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
