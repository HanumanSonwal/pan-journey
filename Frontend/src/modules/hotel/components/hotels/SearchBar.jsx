"use client";

import DestinationSearchField from "@/modules/shared/home/components/DestinationSearchField";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import DateRangeField from "../DateRangeField";
import GuestsField from "../GuestsField";
export default function SearchBar({
  draftSearchData,
  setDraftSearchData,
  onSearch,
}) {
  const router = useRouter();
  const update = (key, value) => {
    setDraftSearchData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleSearch = () => {
    onSearch();
    const query = new URLSearchParams({
      city: draftSearchData.city || "",
      cityId: draftSearchData.cityData?.id || "",
      checkIn: draftSearchData.checkIn || "",
      checkOut: draftSearchData.checkOut || "",
      rooms: String(draftSearchData.rooms || 1),
      adults: String(draftSearchData.adults || 2),
      children: String(draftSearchData.children || 0),
      pets: draftSearchData.pets ? "true" : "false",
    });
    router.push(`/hotels?${query.toString()}`);
  };

  return (
    <div className="relative mb-3 bg-[#72C0F0] px-2 py-10 pb-10 shadow md:px-6">
      <div className="mx-auto max-w-[1200px]">
        {/* 🔹 HEADINGS */}
        <div className="mb-2 hidden grid-cols-12 gap-3 px-1 text-sm text-white md:grid">
          <div className="col-span-4">City / Location</div>
          <div className="col-span-3">Check-In / Check-Out</div>
          <div className="col-span-3">Guests</div>
          <div className="col-span-2"></div>
        </div>

        {/* 🔹 GRID */}
        <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-12">
          {/* 🌍 DESTINATION */}
          <div className="md:col-span-4">
            <DestinationSearchField
              value={{
                city: draftSearchData.city,
                cityData: draftSearchData.cityData,
              }}
              onChange={(val) =>
                setDraftSearchData((prev) => ({
                  ...prev,
                  ...val,
                }))
              }
              compact
              fontSize="16px"
              height="50px"
              wrapperClassName="bg-white !py-0"
            />
          </div>

          {/* 📅 DATES */}
          <div className="md:col-span-3">
            <DateRangeField
              value={[
                draftSearchData.checkIn
                  ? dayjs(draftSearchData.checkIn)
                  : dayjs(),

                draftSearchData.checkOut
                  ? dayjs(draftSearchData.checkOut)
                  : dayjs().add(1, "day"),
              ]}
              onChange={(dates) => {
                update("checkIn", dates?.[0]?.format("YYYY-MM-DD"));

                update("checkOut", dates?.[1]?.format("YYYY-MM-DD"));
              }}
            />
          </div>

          {/* 👨‍👩‍👧 GUESTS */}
          <div className="md:col-span-3">
            <GuestsField
              compact
              value={draftSearchData}
              onChange={(val) =>
                setDraftSearchData((prev) => ({
                  ...prev,
                  ...val,
                }))
              }
            />
          </div>

          {/* 🔍 BUTTON */}
          <div className="md:col-span-2">
            <button
              type="button"
              onClick={handleSearch}
              className="h-[50px] w-full rounded-lg bg-[#0f766e] text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:bg-[#0d5f58] active:scale-[0.98]"
            >
              SEARCH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
