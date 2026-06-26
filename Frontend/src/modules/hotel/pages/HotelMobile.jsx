"use client";

import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import HotelList from "../components/hotels/HotelList";
import MobileSortBar from "../components/MobileSortBar";

import { Drawer } from "antd";
import SidebarFilters from "../cards/SidebarFilters";

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
  // ✅ UI STATES
  const [showSort, setShowSort] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-[#eef6fd] p-3">
      {/* Header */}
      <div className="rounded-[2px] border-1 border-gray-300 bg-white p-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {appliedSearchData?.city || "City"}
          </h2>

          <EditOutlined className="text-lg" />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-1 mb-0 grid grid-cols-3 gap-1">
        {/* SORT */}
        <div className="relative">
          <button
            onClick={() => setShowSort(!showSort)}
            className="w-full rounded-[2px] border-gray-300 bg-white p-2 font-medium"
          >
            Sort By
          </button>

          {showSort && (
            <div className="absolute top-full z-[999] mt-2 w-[280px]">
              <MobileSortBar
                sort={sort}
                setSort={(value) => {
                  setSort(value);
                  setShowSort(false);
                }}
              />
            </div>
          )}
        </div>

        {/* FILTER */}
        {/* FILTER BUTTON */}
        <div className="relative">
          <button
            onClick={() => setShowFilters(true)}
            className="w-full rounded-[2px] border-gray-300 bg-white p-2 font-medium"
          >
            Filter
          </button>
        </div>

        {/* ANTD DRAWER */}
        <Drawer
          title="Filters"
          placement="right"
          open={showFilters}
          onClose={() => setShowFilters(false)}
          size="95%"
          destroyOnClose
          styles={{
            body: {
              padding: 0,
            },
          }}
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

        {/* MAP */}
        <button className="rounded-[2px] border-gray-300 bg-white p-2">
          Map
        </button>
      </div>

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
  );
}
