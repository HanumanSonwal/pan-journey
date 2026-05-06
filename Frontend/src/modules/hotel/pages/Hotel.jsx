"use client";

import { CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import HotelList from "../components/hotels/HotelList";
import SearchBar from "../components/hotels/SearchBar";
import SidebarFilters from "../components/SidebarFilters";
import SortBar from "../components/SortBar";

export default function Hotel() {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("");

  const removeFilter = (key, value) => {
    const updated = { ...filters };

    if (Array.isArray(updated[key])) {
      updated[key] = updated[key].filter((v) => v !== value);
      if (updated[key].length === 0) delete updated[key];
    } else {
      delete updated[key];
    }

    setFilters(updated);
  };

  const clearAll = () => {
    setFilters({});
  };

  return (
    <div className="bg-[#edf7ff] ">
      <SearchBar filters={filters} setFilters={setFilters} />

      <div className="flex gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 md:p-4 max-w-7xl mx-auto flex-wrap md:flex-nowrap mt-[-48px] relative">
        {/* 📌 SIDEBAR */}
        <div className="w-full sm:w-64 md:w-72 self-start sticky top-4 max-h-[calc(100vh-20px)] overflow-y-auto overflow-x-hidden custom-scrollbar">
          <SidebarFilters filters={filters} setFilters={setFilters} />
        </div>
        <div className="flex-1 min-w-0">
          {/* 🔃 SORT BAR (TOP) */}
          <SortBar sort={sort} setSort={setSort} />

          {/* 🏷️ ACTIVE FILTERS (NOW BELOW SORTBAR) */}
          <div className="flex flex-wrap gap-2 mb-4 mt-3">
            {Object.entries(filters).map(([key, value]) => {
              if (Array.isArray(value)) {
                return value.map((v, i) => (
                  <div
                    key={`${key}-${i}`}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs flex items-center gap-1"
                  >
                    {v}
                    <CloseOutlined
                      className="cursor-pointer text-xs"
                      onClick={() => removeFilter(key, v)}
                    />
                  </div>
                ));
              }

              return (
                <div
                  key={key}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs flex items-center gap-1"
                >
                  {value}
                  <CloseOutlined
                    className="cursor-pointer text-xs"
                    onClick={() => removeFilter(key)}
                  />
                </div>
              );
            })}
          </div>

          {/* 🏨 HOTEL LIST */}
          <HotelList filters={filters} sort={sort} />
        </div>
      </div>
    </div>
  );
}
