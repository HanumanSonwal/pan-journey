"use client";

import { Drawer } from "antd";
import { useState } from "react";

import SidebarFilters from "../cards/SidebarFilters";
import HotelList from "../components/hotels/HotelList";
import SearchBar from "../components/hotels/SearchBar";
import MobileSortBar from "../components/MobileSortBar";

const defaultFilters = {
  price: null,
  rating: null,
  amenities: [],
};

export default function HotelMobile({
  filters,
  setFilters,
  appliedSearchData,
  sort,
  setSort,
  setMapOpen,
  setHotelsForMap,
  setHotelsLoading,
  setHasHotels,
}) {
  const [showSort, setShowSort] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  console.log("appliedSearchData in mobile", appliedSearchData);

  const handleReset = () => {
    setSort("default");
    setFilters(defaultFilters);
    setShowSort(false);
    setShowFilters(false);
  };

  return (
    <div className="min-h-screen bg-[#eef6fd]">
      {/* Header */}
      <SearchBar />
      {/* Controls */}
      <div className="min-h-screen bg-[#eef6fd] pl-2 pr-4 mt-2">
        <div className=" grid grid-cols-3 gap-2 ml-2">
          {/* SORT */}
          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="w-full rounded border border-gray-300 bg-white p-2 font-medium"
            >
              Sort By
            </button>

            {showSort && (
              <div className="absolute top-full z-50 mt-2 w-[260px]">
                <MobileSortBar
                  sort={sort}
                  setSort={(val) => {
                    setSort(val);
                    setShowSort(false);
                  }}
                />
              </div>
            )}
          </div>

          {/* FILTER */}
          <button
            onClick={() => setShowFilters(true)}
            className="rounded border border-gray-300 bg-white p-2 font-medium"
          >
            Filter
          </button>

          {/* RESET */}
          <button
            onClick={handleReset}
            className="rounded border border-gray-300 bg-white p-2 font-medium text-red-600"
          >
            Reset
          </button>
        </div>

        {/* DRAWER */}
        <Drawer
          title="Filters"
          placement="right"
          open={showFilters}
          onClose={() => setShowFilters(false)}
          size="85%"
          destroyOnClose={false}
          styles={{ body: { padding: 0 } }}
        >
          <SidebarFilters
            filters={filters}
            setFilters={setFilters}
            onClose={() => setShowFilters(false)}
            onMapClick={() => {
              setShowFilters(false);
              setMapOpen(true);
            }}
          />
        </Drawer>

        {/* HOTEL LIST */}
        <div className="mt-3">
          <HotelList
            searchData={appliedSearchData}
            filters={filters}
            sort={sort}
            onHotelsChange={setHotelsForMap}
            onLoadingChange={setHotelsLoading}
            onResultChange={setHasHotels}
          />
        </div>
      </div>
    </div>
  );
}
