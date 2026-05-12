"use client";

import dayjs from "dayjs";
import { useState } from "react";

import DestinationSearchField from "@/modules/shared/home/components/DestinationSearchField";
import DateRangeField from "../DateRangeField";
import GuestsField from "../GuestsField";

export default function SearchBar({ filters, setFilters }) {
  const [form, setForm] = useState({
    city: filters?.city || "goa",

    dateRange: [dayjs(), dayjs().add(1, "day")],

    rooms: filters?.rooms || 1,
    adults: filters?.adults || 2,
    children: filters?.children || 0,
    childAges: filters?.childAges || [],
    pets: filters?.pets || false,
  });

  const handleSearch = () => {
    const payload = {
      city: form.city,
      checkIn: form.dateRange?.[0]?.format("YYYY-MM-DD"),
      checkOut: form.dateRange?.[1]?.format("YYYY-MM-DD"),
      nights: form.dateRange?.[1]?.diff(form.dateRange?.[0], "day") || 0,
      rooms: form.rooms,
      adults: form.adults,
      children: form.children,
      childAges: form.childAges,
      pets: form.pets,
    };
    setFilters(payload);
    console.log("🚀 SEARCH PAYLOAD:", payload);
  };

  const update = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
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
          <div className="md:col-span-4">
            <DestinationSearchField
              value={{
                city: form.city,
                cityData: form.cityData,
              }}
              onChange={(val) =>
                setForm((prev) => ({
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
          <div className="md:col-span-3">
            <DateRangeField
              value={form.dateRange}
              onChange={(dates) => update("dateRange", dates)}
            />
          </div>

          <div className="md:col-span-3">
            <GuestsField
              compact
              value={form}
              onChange={(val) =>
                setForm((prev) => ({
                  ...prev,
                  ...val,
                }))
              }
            />
          </div>

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
