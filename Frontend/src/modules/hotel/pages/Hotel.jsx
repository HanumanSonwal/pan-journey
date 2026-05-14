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
    <div className="bg-[#edf7ff]">
      <SearchBar filters={filters} setFilters={setFilters} />

      <div className="relative mx-auto mt-[-48px] flex max-w-7xl flex-wrap gap-2 p-2 sm:gap-3 sm:p-3 md:flex-nowrap md:gap-4 md:p-4">
        {/* 📌 SIDEBAR */}
        <div className="custom-scrollbar sticky top-4 max-h-[calc(100vh-20px)] w-full self-start overflow-x-hidden overflow-y-auto sm:w-64 md:w-72">
          <SidebarFilters filters={filters} setFilters={setFilters} />
        </div>
        <div className="min-w-0 flex-1">
          {/* 🔃 SORT BAR (TOP) */}
          <SortBar sort={sort} setSort={setSort} />

          {/* 🏷️ ACTIVE FILTERS (NOW BELOW SORTBAR) */}
          <div className="mt-3 mb-4 flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              if (Array.isArray(value)) {
                return value.map((v, i) => (
                  <div
                    key={`${key}-${i}`}
                    className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-600"
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
                  className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-600"
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
