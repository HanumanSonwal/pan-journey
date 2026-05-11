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
      <div className="flex flex-col gap-2 md:flex-row md:justify-between">
        <h3 className="text-xl font-extrabold text-gray-900 md:text-2xl">
          Select Your Hotels
        </h3>

        <h3 className="text-xs font-semibold text-gray-600 md:text-sm">
          Book Domestic and International Property Online.
        </h3>
      </div>

      {/* GRID */}
      <div
        className="
          mt-4
          grid
          grid-cols-1
          gap-4

          md:grid-cols-2
          xl:grid-cols-[2fr_1.5fr_1.5fr]
        "
      >
        {/* CITY */}
        <div className="relative rounded-xl border border-gray-300 px-3 py-3 transition-all hover:border-[#0077b6] min-h-[96px]">
          <span className="absolute -top-2 left-3 bg-white px-1 text-[14px] font-medium text-gray-800 md:text-[15px]">
            City, Property name or Location
          </span>

          <div className="flex min-h-[56px] flex-col justify-center px-1 md:px-2">
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

            <span className="text-xs text-gray-500 md:text-sm">
              India
            </span>
          </div>
        </div>

        {/* DATE */}
        <div className="w-full">
          <DateRangeField
            value={form.dateRange}
            onChange={(dates) => update("dateRange", dates)}
          />
        </div>

        {/* GUESTS */}
        <div className="w-full md:col-span-2 xl:col-span-1">
          <GuestsField value={form} onChange={(val) => setForm(val)} />
        </div>
      </div>
    </div>
  );
}
