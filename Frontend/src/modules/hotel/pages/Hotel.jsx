"use client";

import useIsMobile from "@/hooks/useIsMobile";
import CMSContentRenderer from "@/modules/cms/renderer/CMSContentRenderer";
import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import SidebarFilters from "../cards/SidebarFilters";
import HotelList from "../components/hotels/HotelList";
import SearchBar from "../components/hotels/SearchBar";
import SortBar from "../components/SortBar";
import DynamicSeoFallback from "../seo/DynamicSeoFallback";
import HotelsSeoSection from "../seo/HotelsSeoSection";
import { useHotelSearchStore } from "../store/serchData.store";
import { scrollToHotelList } from "../utils/scrollToHotelList";
import HotelMobile from "./HotelMobile";

const defaultFilters = {
  freeCancellation: false,
  search: "",
  starRating: "",
  minPrice: "",
  maxPrice: "",
  suggested: [],
  propertyType: [],
  rating: [],
  locations: [],
};

const HotelMap = dynamic(() => import("../components/map/HotelMap"), {
  ssr: false,
});

export default function HotelContent({ initialSearchData = null, cms = null }) {
  const isMobile = useIsMobile();

  const {
    draftSearchData,
    appliedSearchData,
    setDraftSearchData,
    setAppliedSearchData,
  } = useHotelSearchStore();

  console.log("appliedSearchData in hotels", appliedSearchData);

  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const [hotelsLoading, setHotelsLoading] = useState(true);
  const [hasHotels, setHasHotels] = useState(false);
  const [sort, setSort] = useState("recommended");
  const [mapOpen, setMapOpen] = useState(false);
  const [hotelsForMap, setHotelsForMap] = useState([]);
  const [sidebarZ0, setSidebarZ0] = useState(false);

  const handleFilterChange = useCallback((updater) => {
    setFilters(updater);

    scrollToHotelList();
  }, []);

  const handleSortChange = useCallback((value) => {
    setSort(value);

    scrollToHotelList();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const hotelList = document.getElementById("hotel-list-section");
      if (!hotelList) return;
      const rect = hotelList.getBoundingClientRect();
      const shouldBeZ0 = rect.bottom <= 150;
      setSidebarZ0((prev) => (prev === shouldBeZ0 ? prev : shouldBeZ0));
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (initialSearchData) {
      setDraftSearchData(initialSearchData);
      setAppliedSearchData(initialSearchData);
      return;
    }
    const today = dayjs().startOf("day");
    const savedCheckIn = dayjs(draftSearchData?.checkIn);
    const savedCheckOut = dayjs(draftSearchData?.checkOut);

    if (
      !savedCheckIn.isValid() ||
      savedCheckIn.isBefore(today) ||
      !savedCheckOut.isValid() ||
      savedCheckOut.isBefore(today)
    ) {
      setDraftSearchData({
        checkIn: today.format("YYYY-MM-DD"),
        checkOut: today.add(1, "day").format("YYYY-MM-DD"),
      });
    }

    const urlData = {
      city: searchParams.get("cityName") || draftSearchData?.city || "",
      cityData: {
        id: searchParams.get("cityId") || "",
        stateName: searchParams.get("stateName") || "",
        countryCode: searchParams.get("countryCode") || "",
      },

      checkIn: searchParams.get("checkIn") || "",
      checkOut: searchParams.get("checkOut") || "",

      rooms: Number(searchParams.get("rooms")) || 1,
      adults: Number(searchParams.get("adults")) || 2,
      children: Number(searchParams.get("children")) || 0,

      childAges: [],
      pets: searchParams.get("pets") === "true",
    };
    if (
      urlData.cityData.id &&
      urlData.cityData.id !== draftSearchData?.cityData?.id
    ) {
      setDraftSearchData(urlData);
      setAppliedSearchData(urlData);
    }
  }, [
    mounted,
    searchParams,
    initialSearchData,
    setDraftSearchData,
    setAppliedSearchData,
  ]);

  // and useeffct
  const handleSearch = useCallback(() => {}, []);
  const isFilterActive = useCallback((value) => {
    if (
      value === "" ||
      value === null ||
      value === undefined ||
      value === false
    ) {
      return false;
    }
    if (Array.isArray(value) && value.length === 0) {
      return false;
    }
    return true;
  }, []);
  const removeFilter = useCallback((key, value) => {
    setFilters((prev) => {
      const updated = {
        ...prev,
      };
      if (Array.isArray(updated[key])) {
        updated[key] = updated[key].filter((v) => v !== value);
      } else if (typeof updated[key] === "boolean") {
        updated[key] = false;
      } else {
        updated[key] = "";
      }
      return updated;
    });
  }, []);

  const clearAll = useCallback(() => {
    setFilters(defaultFilters);
    scrollToHotelList();
  }, []);

  const activeFilters = useMemo(() => {
    return Object.entries(filters);
  }, [filters]);
  const hasActiveFilters = useMemo(() => {
    return activeFilters.some(([_, value]) => isFilterActive(value));
  }, [activeFilters, isFilterActive]);
  if (!mounted) return null;
  return (
    <>
      {isMobile ? (
        // <HotelMobile cms={cms} />
        <HotelMobile
          appliedSearchData={appliedSearchData}
          filters={filters}
          setFilters={handleFilterChange}
          sort={sort}
          setSort={handleSortChange}
          mapOpen={mapOpen}
          setMapOpen={setMapOpen}
          hotelsLoading={hotelsLoading}
          hasHotels={hasHotels}
          hotelsForMap={hotelsForMap}
          setHotelsForMap={setHotelsForMap}
        />
      ) : (
        <>
          <div className="bg-[#edf7ff]">
            <SearchBar searchData={draftSearchData} onSearch={handleSearch} />

            <div className="relative mx-auto mt-[-28px] flex max-w-7xl gap-4 p-3 md:flex-nowrap">
              {/* SIDEBAR */}
              <div
                className={`sticky top-[98px] max-h-[calc(100vh-40px)] w-full overflow-y-auto sm:w-64 md:w-72 ${
                  sidebarZ0 ? "z-0" : "z-20"
                }`}
              >
                <SidebarFilters
                  filters={filters}
                  setFilters={handleFilterChange}
                  onMapClick={() => {
                    setMapOpen(true);
                  }}
                />
              </div>

              {/* RIGHT CONTENT */}
              <div className="min-w-0 flex-1">
                {/* SORT BAR */}
                <div
                  className={`sticky top-[98px] ${
                    sidebarZ0 ? "!-z-10" : "z-20"
                  } bg-[#edf7ff]`}
                >
                  <SortBar sort={sort} setSort={handleSortChange} />
                </div>

                {/* ACTIVE FILTERS */}
                {hasActiveFilters && (
                  <div
                    className={`sticky top-[138px] min-[700px]:max-[850px]:top-[155px] ${
                      sidebarZ0 ? "!-z-10" : "z-12"
                    } bg-[#edf7ff] !pt-[5px]`}
                  >
                    <div className="!mb-4 flex flex-wrap gap-2">
                      {activeFilters.map(([key, value]) => {
                        if (!isFilterActive(value)) return null;

                        if (key === "minPrice" || key === "maxPrice") {
                          return null;
                        }

                        if (Array.isArray(value)) {
                          return value.map((v, i) => (
                            <div
                              key={`${key}-${i}`}
                              className="flex items-center gap-1 rounded bg-blue-100 px-3 py-1 text-xs text-blue-600"
                            >
                              {v}
                              <CloseOutlined
                                className="cursor-pointer text-xs"
                                onClick={() => removeFilter(key, v)}
                              />
                            </div>
                          ));
                        }

                        let label = value;

                        if (key === "freeCancellation") {
                          label = "Free Cancellation";
                        }

                        if (key === "starRating") {
                          label = `${value} Star`;
                        }

                        return (
                          <div
                            key={key}
                            className="flex items-center gap-1 rounded bg-blue-100 px-3 py-1 text-xs text-blue-600"
                          >
                            {label}
                            <CloseOutlined
                              className="cursor-pointer text-xs"
                              onClick={() => removeFilter(key)}
                            />
                          </div>
                        );
                      })}

                      {(filters?.minPrice || filters?.maxPrice) && (
                        <div className="flex items-center gap-1 rounded bg-blue-100 px-3 py-1 text-xs text-blue-600">
                          ₹{filters?.minPrice || 0} - ₹
                          {filters?.maxPrice || 50000}
                          <CloseOutlined
                            className="cursor-pointer text-xs"
                            onClick={() =>
                              setFilters((prev) => ({
                                ...prev,
                                minPrice: "",
                                maxPrice: "",
                              }))
                            }
                          />
                        </div>
                      )}

                      <button
                        onClick={clearAll}
                        className="rounded bg-red-200 px-3 py-1 text-xs text-red-600"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                )}

                {/* HOTEL LIST */}
                <div id="hotel-list-section">
                  <HotelList
                    searchData={appliedSearchData}
                    filters={filters}
                    sort={sort}
                    onHotelsChange={setHotelsForMap}
                    onLoadingChange={setHotelsLoading}
                    onResultChange={setHasHotels}
                  />
                </div>

                {/* SEO CONTENT */}
                {cms ? (
                  <HotelsSeoSection>
                    <CMSContentRenderer cms={cms} />
                  </HotelsSeoSection>
                ) : (
                  !hotelsLoading &&
                  hasHotels && (
                    <HotelsSeoSection>
                      <DynamicSeoFallback cityName={appliedSearchData?.city} />
                    </HotelsSeoSection>
                  )
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <Modal
        open={mapOpen}
        footer={null}
        closable={false}
        width="95vw"
        centered
        onCancel={() => setMapOpen(false)}
        styles={{
          body: {
            padding: 0,
            overflow: "hidden",
          },
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-lg font-semibold md:text-xl">Hotels on Map</h2>

          <button
            onClick={() => setMapOpen(false)}
            className="rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
          >
            Close
          </button>
        </div>

        {/* Content */}
        <div className="flex h-[70vh] md:h-[80vh] lg:h-[85vh]">
          {/* Map */}
          <div className="flex-1">
            <HotelMap hotels={hotelsForMap} />
          </div>

          {/* Sidebar */}
          <div className="hidden overflow-y-auto border-l bg-white md:block md:w-[280px] lg:w-[340px]">
            <SidebarFilters
              filters={filters}
              setFilters={handleFilterChange}
              hideMapSection
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
