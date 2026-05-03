"use client";

import DateRangeField from "@/modules/shared/home/components/DateRangeField";
import GuestsField from "@/modules/shared/home/components/GuestsField";
import { Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

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

export default function HotelSearchForm({ setFormData }) {
  const [form, setForm] = useState({
    city: "goa",
    dateRange: [dayjs(), dayjs().add(1, "day")],
    rooms: 1,
    adults: 2,
    children: 0,
    childAges: [],
    pets: false,
  });

  useEffect(() => {
    if (!setFormData) return;

    const payload = {
      city: form.city,
      checkIn: form.dateRange?.[0]?.format("YYYY-MM-DD"),
      checkOut: form.dateRange?.[1]?.format("YYYY-MM-DD"),
      nights: form.dateRange?.[1]?.diff(form.dateRange?.[0], "day"),
      rooms: form.rooms,
      adults: form.adults,
      children: form.children,
      childAges: form.childAges,
      pets: form.pets,
    };

    setFormData(payload);
  }, [form]);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="flex flex-col md:flex-row md:justify-between gap-2">
        <h3 className="text-xl md:text-2xl font-extrabold text-gray-900">
          Select Your Hotels
        </h3>

        <h3 className="text-xs md:text-sm font-semibold text-gray-600">
          Book Domestic and International Property Online.
        </h3>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1.5fr_1.5fr] gap-4 mt-4">
        {/* ✅ FIXED CITY */}
        <div className="relative border border-gray-300 rounded-xl px-3 py-2 hover:border-[#0077b6] transition-all">
          <span className="absolute -top-2 left-3 bg-white px-1 text-[14px] md:text-[15px] text-gray-800 font-medium">
            City, Property name or Location
          </span>

          {/* <div className="flex flex-col justify-center min-h-[50px] px-1 md:px-3"> */}
          <div className="flex flex-col justify-center min-h-[56px] px-1 md:px-2">
            <Select
              value={form.city}
              onChange={(v) => update("city", v)}
              options={cities}
              variant="borderless"
              popupMatchSelectWidth={false}
              className="w-full"
              style={{
                fontWeight: 700,
                fontSize: "24px",
              }}
            />

            <span className="text-xs md:text-sm text-gray-500 mt-[2px]">
              India
            </span>
          </div>
        </div>

        {/* DATE */}
        <DateRangeField
          value={form.dateRange}
          onChange={(dates) => update("dateRange", dates)}
        />

        {/* GUESTS */}
        <GuestsField value={form} onChange={(val) => setForm(val)} />
      </div>
    </div>
  );
}
