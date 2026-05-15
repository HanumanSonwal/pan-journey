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

  const [mounted, setMounted] = useState(false);

  const [searchData, setSearchData] = useState({
    city: "",
    cityData: { id: "" },
    checkIn: "",
    checkOut: "",
    rooms: 1,
    adults: 2,
    children: 0,
    childAges: [],
    pets: false,
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

  // ✅ Hydration safe mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Load URL params
  useEffect(() => {
    if (!mounted) return;

    setSearchData({
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
  }, [mounted, searchParams]);

  // ✅ Search handler
  const handleSearch = (data) => {
    setSearchData(data);
    setPage(1);
    console.log("🚀 FINAL SEARCH:", data);
  };

  // ✅ Remove filter
  const removeFilter = (key, value) => {
    setFilters((prev) => {
      const updated = { ...prev };

      if (Array.isArray(updated[key])) {
        updated[key] = updated[key].filter((v) => v !== value);
      } else {
        delete updated[key];
      }

      return updated;
    });
  };

  // ✅ Clear all filters
  const clearAll = () => {
    setFilters({
      priceMin: 0,
      priceMax: 50000,
      starRating: [],
      propertyType: [],
      amenities: [],
    });
  };

  if (!mounted) return null;

  return (
    <div className="bg-[#edf7ff]">
      {/* SEARCH BAR */}
      <SearchBar
        draftSearchData={searchData}
        setDraftSearchData={setSearchData}
        onSearch={handleSearch}
      />

      <div className="relative mx-auto mt-[-48px] flex max-w-7xl gap-4 p-3 md:flex-nowrap">

        {/* SIDEBAR */}
        <div className="sticky top-4 max-h-[calc(100vh-20px)] w-full overflow-y-auto sm:w-64 md:w-72">
          <SidebarFilters filters={filters} setFilters={setFilters} />
        </div>

        {/* MAIN CONTENT */}
        <div className="min-w-0 flex-1">

          {/* SORT */}
          <SortBar sort={sort} setSort={setSort} />

          {/* ACTIVE FILTERS */}
          <div className="mb-4 mt-3 flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              if (key === "priceMin" || key === "priceMax") return null;

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

            {/* CLEAR ALL */}
            <button
              onClick={clearAll}
              className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-600"
            >
              Clear All
            </button>
          </div>

          {/* HOTEL LIST */}
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
