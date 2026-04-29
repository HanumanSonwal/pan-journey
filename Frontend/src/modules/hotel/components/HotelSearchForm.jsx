"use client";

import { DatePicker, Select } from "antd";
import { useState } from "react";
import dayjs from "dayjs";

const cities = [
  { label: "Goa", value: "goa" },
  { label: "Jaipur", value: "jaipur" },
  { label: "Delhi", value: "delhi" },
];

export default function HotelSearchForm() {
  const [form, setForm] = useState({
    city: "goa",
    checkIn: dayjs(),
    checkOut: dayjs().add(1, "day"),
    rooms: 1,
    adults: 2,
  });

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Select Your Hotels
      </h3>

      <div className="grid md:grid-cols-4 gap-4">

        {/* City */}
        <Select
          size="large"
          value={form.city}
          onChange={(v) => update("city", v)}
          options={cities}
          className="w-full"
        />

        {/* Checkin */}
        <DatePicker
          size="large"
          value={form.checkIn}
          onChange={(v) => update("checkIn", v)}
          className="w-full"
        />

        {/* Checkout */}
        <DatePicker
          size="large"
          value={form.checkOut}
          onChange={(v) => update("checkOut", v)}
          className="w-full"
        />

        {/* Guests */}
        <div className="border rounded-lg p-3 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Rooms</p>
            <div className="flex gap-2 items-center">
              <button onClick={() => update("rooms", Math.max(1, form.rooms - 1))}>-</button>
              <span>{form.rooms}</span>
              <button onClick={() => update("rooms", form.rooms + 1)}>+</button>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Adults</p>
            <div className="flex gap-2 items-center">
              <button onClick={() => update("adults", Math.max(1, form.adults - 1))}>-</button>
              <span>{form.adults}</span>
              <button onClick={() => update("adults", form.adults + 1)}>+</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}