"use client";

import { Select } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

import DateRangeField from "../DateRangeField";
import GuestsField from "../GuestsField";

const cities = [
  { label: "Goa", value: "goa" },
  { label: "Jaipur", value: "jaipur" },
  { label: "Delhi", value: "delhi" },
  { label: "Mumbai", value: "mumbai" },
  { label: "Bangalore", value: "bangalore" },
  { label: "Hyderabad", value: "hyderabad" },
  { label: "Udaipur", value: "udaipur" },
  { label: "Pune", value: "pune" },
];

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
    <div className="bg-[#72C0F0] py-10 px-2 md:px-6 shadow relative pb-10 mb-3">
      <div className="max-w-[1200px] mx-auto">
        {/* HEADINGS */}
        <div className="hidden md:grid grid-cols-12 gap-3 text-sm mb-2 px-1 text-white">
          <div className="col-span-4">City / Location</div>

          <div className="col-span-3">Check-In / Check-Out</div>

          <div className="col-span-3">Guests</div>

          <div className="col-span-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="bg-white rounded-lg border border-gray-300 h-[50px] md:col-span-4 flex items-center px-2">
            <Select
              value={form.city}
              onChange={(v) => update("city", v)}
              options={cities}
              variant="borderless"
              popupMatchSelectWidth={false}
              className="w-full"
              style={{
                fontWeight: 700,
                fontSize: "16px",
              }}
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
              className="w-full h-[50px] rounded-lg bg-[#0f766e] hover:bg-[#0d5f58] transition-all duration-200 text-white font-semibold text-sm tracking-wide active:scale-[0.98]"
            >
              SEARCH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
