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
    <div className="w-full">

      <div className="flex justify-between">
        <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight pb-4">
          Select Your Hotels
        </h3>
        <h3 className="text-sm font-black text-gray-900 tracking-tight pb-4">
          Book Domestic and International Property Online.
        </h3>
      </div>

      {/* 👇 CUSTOM GRID */}
      <div className="grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-4">

        {/* City (BIG) */}
        <div className="relative border border-gray-300 rounded-xl px-2 py-3">
          <span className="absolute -top-2 left-3 bg-white px-1 text-[17px] text-gray-800 font-medium">
            City, Property name or Location
          </span>

          <Select
            variant="borderless"
            value={form.city}
            onChange={(v) => update("city", v)}
            options={cities}
            className="w-full custom-select"
            style={{
              color: "black",
              fontWeight: 600,
              fontSize: "28px",
              marginLeft: "-4px",
            }}
          />

          <p className="text-[11px] text-[#1E1E1E] font-normal  ml-3">India</p>
        </div>

        {/* Check In */}
        <div className="relative border border-gray-300 rounded-xl px-4 py-4">
          <span className="absolute -top-2 left-3 bg-white px-1 text-[15px] text-[#1E1E1E] font-medium ">
            Check In
          </span>

          <DatePicker
            variant="borderless"
            value={form.checkIn}
            onChange={(v) => update("checkIn", v || dayjs())}
            format="DD MMM, YY"
            className="w-full custom-date"
           
          />

          <p className="text-[11px] text-[#1E1E1E] font-normal pt-1 ml-3">
            {form.checkIn ? form.checkIn.format("dddd") : ""}
          </p>
        </div>

        {/* Check Out */}
        <div className="relative border border-gray-300 rounded-xl px-4 py-4">
          <span className="absolute -top-2 left-3 bg-white px-1 text-[15px] text-[#1E1E1E] font-medium">
            Check Out
          </span>

          <DatePicker
            variant="borderless"
            value={form.checkOut}
            onChange={(v) =>
              update("checkOut", v || dayjs().add(1, "day"))
            }
            format="DD MMM, YY"
            className="w-full custom-date"
          />

          <p className="text-[11px] text-[#1E1E1E] font-normal pt-1 ml-3 ">
            {form.checkOut ? form.checkOut.format("dddd") : ""}
          </p>
        </div>

        {/* Guests */}
        <div className="relative border border-gray-300 rounded-xl px-4 py-4 flex justify-between">
          <span className="absolute -top-2 left-3 bg-white px-1  text-[15px] text-[#1E1E1E] font-medium">
            Room & Guests
          </span>

          <div>
            <p className=" text-[13px] text-[#1E1E1E]">Rooms</p>
            <div className="flex items-center gap-2 mt-1">
              <button
                className="w-6 h-6 border rounded !font-semibold !text-[#1E1E1E]"
                onClick={() =>
                  update("rooms", Math.max(1, form.rooms - 1))
                }
              >
                -
              </button>
              <span className="text-lg font-semibold  text-[#1E1E1E]">{form.rooms}</span>
              <button
                className="w-6 h-6 border rounded !font-semibold !text-[#1E1E1E]"
                onClick={() => update("rooms", form.rooms + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div>
            <p className="text-[13px] text-[#1E1E1E]">Adults</p>
            <div className="flex items-center gap-2 mt-1">
              <button
                className="w-6 h-6 border rounded !font-semibold !text-[#1E1E1E]"
                onClick={() =>
                  update("adults", Math.max(1, form.adults - 1))
                }
              >
                -
              </button>
              <span className="text-lg font-semibold !font-semibold !text-[#1E1E1E]">{form.adults}</span>
              <button
                className="w-6 h-6 border rounded !font-semibold !text-[#1E1E1E]"
                onClick={() => update("adults", form.adults + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}