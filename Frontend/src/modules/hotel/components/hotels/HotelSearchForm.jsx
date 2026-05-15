"use client";

import DateRangeField from "@/modules/shared/home/components/DateRangeField";
import DestinationSearchField from "@/modules/shared/home/components/DestinationSearchField";
import GuestsField from "@/modules/shared/home/components/GuestsField";

import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function HotelSearchForm({ setFormData }) {
  const [form, setForm] = useState({
    city: "",
    cityData: null,

    dateRange: [dayjs(), dayjs().add(1, "day")],

    rooms: 1,
    adults: 2,
    children: 0,
    childAges: [],
    pets: false,
  });

  // update
  const update = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // send form data
  useEffect(() => {
    if (!setFormData) return;

    const payload = {
      city: form?.city,
      cityData: form?.cityData,

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
  }, [form, setFormData]);

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
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[2fr_1.5fr_1.5fr]">
        {/* DESTINATION */}

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
          fontSize="24px"
          height="82px"
        />

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
