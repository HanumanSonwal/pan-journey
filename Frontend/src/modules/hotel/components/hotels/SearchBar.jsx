"use client";

import { DatePicker, Select } from "antd";

export default function SearchBar({ filters, setFilters }) {
  return (
    <div className="bg-[#5fa8d3] py-6 px-2 md:px-6 shadow text-white relative pb-10">

      <div className="max-w-[1100px] mx-auto">

        {/* 🔷 HEADINGS */}
        <div className="hidden md:grid grid-cols-12 gap-4 text-sm mb-2 px-2">
          <div className="col-span-4">City / Location</div>
          <div className="col-span-2">Check-In</div>
          <div className="col-span-2">Check-Out</div>
          <div className="col-span-2">Guests</div>
          <div className="col-span-2"></div>
        </div>

        {/* 🔷 MAIN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4">

          {/* 📍 CITY FILTER */}
          <div className="bg-white rounded-lg shadow px-3 py-2 w-full md:col-span-4">
            <Select
              value={filters.city}
              onChange={(v) => setFilters({ ...filters, city: v })}
              bordered={false}
              className="w-full font-medium"
              placeholder="Select City"
              options={[
                { value: "Goa", label: "Goa" },
                { value: "Delhi", label: "Delhi" },
                { value: "Manali", label: "Manali" },
                { value: "Jaipur", label: "Jaipur" },
                { value: "Mumbai", label: "Mumbai" },
              ]}
            />
          </div>

          {/* 📅 CHECK-IN */}
          <div className="bg-white rounded-lg shadow px-3 py-2 w-full md:col-span-2">
            <DatePicker
              
              className="w-full font-medium"
              placeholder="Check-In"
              onChange={(date) =>
                setFilters({ ...filters, checkIn: date })
              }
            />
          </div>

          {/* 📅 CHECK-OUT */}
          <div className="bg-white rounded-lg shadow px-3 py-2 w-full md:col-span-2">
            <DatePicker
              bordered={false}
              className="w-full font-medium"
              placeholder="Check-Out"
              onChange={(date) =>
                setFilters({ ...filters, checkOut: date })
              }
            />
          </div>

          {/* 👥 GUESTS FILTER */}
          <div className="bg-white rounded-lg shadow px-3 py-2 w-full md:col-span-2">
            <Select
              value={filters.guests}
              bordered={false}
              className="w-full font-medium"
              placeholder="Guests"
              onChange={(v) => setFilters({ ...filters, guests: v })}
              options={[
                { value: "1 Room, 2 Adults", label: "1 Room, 2 Adults" },
                { value: "2 Room, 4 Adults", label: "2 Room, 4 Adults" },
                { value: "Family", label: "Family (4+ People)" },
              ]}
            />
          </div>

          {/* 🔍 SEARCH BUTTON */}
          <div className="w-full md:col-span-2 flex items-center">
            <button
              onClick={() => console.log("Filters:", filters)}
              className="w-full bg-[#0f766e] text-white py-2 rounded-lg font-semibold hover:bg-[#0d5f58] transition pt-4 pb-4 text-lg"
            >
              SEARCH
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}