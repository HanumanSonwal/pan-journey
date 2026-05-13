"use client";

import { CloseOutlined } from "@ant-design/icons";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import HotelList from "../components/hotels/HotelList";
import SearchBar from "../components/hotels/SearchBar";
import SidebarFilters from "../components/SidebarFilters";
import SortBar from "../components/SortBar";

export default function Hotel() {
  const searchParams = useSearchParams();

  const [draftSearchData, setDraftSearchData] = useState({
    city: searchParams.get("city") || "",
    cityData: {
      id: searchParams.get("cityId") || "",
    },
    checkIn: searchParams.get("checkIn") || "",
    checkOut: searchParams.get("checkOut") || "",
    rooms: Number(searchParams.get("rooms")) || 1,
    adults: Number(searchParams.get("adults")) || 2,
    children: Number(searchParams.get("children")) || 0,
    childAges: [],
    pets: searchParams.get("pets") === "true",
  });

  // 🔍 APPLIED SEARCH
  const [searchData, setSearchData] = useState({
    city: searchParams.get("city") || "",
    cityData: {
      id: searchParams.get("cityId") || "",
    },
    checkIn: searchParams.get("checkIn") || "",
    checkOut: searchParams.get("checkOut") || "",
    rooms: Number(searchParams.get("rooms")) || 1,
    adults: Number(searchParams.get("adults")) || 2,
    children: Number(searchParams.get("children")) || 0,
    childAges: [],
    pets: searchParams.get("pets") === "true",
  });
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 50000,
    starRating: [],
    propertyType: [],
    amenities: [],
  });
  const [sort, setSort] = useState("recommended");
  const [page, setPage] = useState(1);
  const handleSearch = () => {
    setSearchData(draftSearchData);
    setPage(1);
    console.log("🚀 FINAL SEARCH:", draftSearchData);
  };

  useEffect(() => {
    if (searchParams.get("city")) {
      setSearchData(draftSearchData);
    }
  }, []);

  const removeFilter = (key, value) => {
    const updated = {
      ...filters,
    };
    if (Array.isArray(updated[key])) {
      updated[key] = updated[key].filter((v) => v !== value);
      if (updated[key].length === 0) {
        delete updated[key];
      }
    } else {
      delete updated[key];
    }
    setFilters(updated);
  };
  const clearAll = () => {
    setFilters({
      priceMin: 0,
      priceMax: 50000,
      starRating: [],
      propertyType: [],
      amenities: [],
    });
  };

  return (
    <div className="bg-[#edf7ff]">
      <SearchBar
        draftSearchData={draftSearchData}
        setDraftSearchData={setDraftSearchData}
        onSearch={handleSearch}
      />
      <div className="relative mx-auto mt-[-48px] flex max-w-7xl flex-wrap gap-2 p-2 sm:gap-3 sm:p-3 md:flex-nowrap md:gap-4 md:p-4">
        <div className="custom-scrollbar sticky top-4 max-h-[calc(100vh-20px)] w-full self-start overflow-x-hidden overflow-y-auto sm:w-64 md:w-72">
          <SidebarFilters filters={filters} setFilters={setFilters} />
        </div>

        {/* 📋 CONTENT */}
        <div className="min-w-0 flex-1">
          {/* 🔃 SORT */}
          <SortBar sort={sort} setSort={setSort} />

          {/* 🏷️ FILTERS */}
          <div className="mt-3 mb-4 flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              if (Array.isArray(value) && value.length === 0) {
                return null;
              }

              if (key === "priceMin" || key === "priceMax") {
                return null;
              }

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

            {/* 🧹 CLEAR */}
            <button
              onClick={clearAll}
              className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-600"
            >
              Clear All
            </button>
          </div>

          {/* 🏨 HOTEL LIST */}
          <HotelList
            searchData={searchData}
            filters={filters}
            sort={sort}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
}
