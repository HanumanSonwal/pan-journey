"use client";

import useIsMobile from "@/hooks/useIsMobile";
import CMSContentRenderer from "@/modules/cms/renderer/CMSContentRenderer";
import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

const CMS_TRIGGER_OFFSET = 520;
const STICKY_OFFSET = 108;

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

  const searchParams = useSearchParams();

  /* ----------------------------------
     Refs
  ---------------------------------- */

  const hotelListRef = useRef(null);
  const cmsTriggerRef = useRef(null);

  const scrollFrameRef = useRef(null);
  const sidebarZ0Ref = useRef(false);

  /* ----------------------------------
     States
  ---------------------------------- */

  const [mounted, setMounted] = useState(false);

  const [filters, setFilters] = useState(defaultFilters);

  const [hotelsLoading, setHotelsLoading] = useState(true);

  const [hasHotels, setHasHotels] = useState(false);

  const [sort, setSort] = useState("recommended");

  const [mapOpen, setMapOpen] = useState(false);

  const [hotelsForMap, setHotelsForMap] = useState([]);

  const [sidebarZ0, setSidebarZ0] = useState(false);

  /* ----------------------------------
     Mounted
  ---------------------------------- */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ----------------------------------
     Sidebar Z-Index
  ---------------------------------- */

  const updateSidebarZIndex = useCallback((value) => {
    if (sidebarZ0Ref.current === value) {
      return;
    }

    sidebarZ0Ref.current = value;
    setSidebarZ0(value);
  }, []);

  const handleSearch = useCallback(
    (searchData) => {
      if (!searchData) return;

      setDraftSearchData(searchData);
      setAppliedSearchData(searchData);

      /*
       * New search ke time sidebar ko
       * normal hotel-list state par reset karo.
       */
      updateSidebarZIndex(false);

      /*
       * Hotel list ki beginning par smoothly le jao.
       */
      requestAnimationFrame(() => {
        scrollToHotelList();
      });
    },
    [setDraftSearchData, setAppliedSearchData, updateSidebarZIndex],
  );

  /* ----------------------------------
     FILTER
  ---------------------------------- */

  const handleFilterChange = useCallback((updater) => {
    setFilters(updater);
    scrollToHotelList();
  }, []);

  /* ----------------------------------
     SORT
  ---------------------------------- */

  const handleSortChange = useCallback((value) => {
    setSort(value);
    scrollToHotelList();
  }, []);

  /* ----------------------------------
     FAST SCROLL Z-INDEX
  ---------------------------------- */

  useEffect(() => {
    if (!mounted || isMobile) return;

    const checkSidebarPosition = () => {
      scrollFrameRef.current = null;

      const scrollY = window.scrollY || window.pageYOffset;

      const hotelElement = hotelListRef.current;
      const cmsTrigger = cmsTriggerRef.current;

      /* ----------------------------------
         1. HOTEL LOADING

         Search ke baad hotels load ho rahe
         hain to fast scroll par sidebar
         z-0 ho jayega.
      ---------------------------------- */

      if (hotelsLoading) {
        updateSidebarZIndex(scrollY > 50);
        return;
      }

      /* ----------------------------------
         2. NO HOTEL RESULT
      ---------------------------------- */

      if (!hasHotels) {
        updateSidebarZIndex(scrollY > 50);
        return;
      }

      /* ----------------------------------
         3. CMS TRIGGER

         CMS actual content ki height
         important nahi hai.

         Invisible trigger CMS ke top par
         fixed hai.
      ---------------------------------- */

      if (cmsTrigger) {
        const triggerRect = cmsTrigger.getBoundingClientRect();

        const cmsReached = triggerRect.top <= CMS_TRIGGER_OFFSET;

        if (cmsReached) {
          updateSidebarZIndex(true);
          return;
        }
      }

      /* ----------------------------------
         4. HOTEL LIST END
      ---------------------------------- */

      if (hotelElement) {
        const hotelRect = hotelElement.getBoundingClientRect();

        const hotelListFinished = hotelRect.bottom <= STICKY_OFFSET;

        if (hotelListFinished) {
          updateSidebarZIndex(true);
          return;
        }
      }

      /* ----------------------------------
         5. NORMAL HOTEL AREA
      ---------------------------------- */

      updateSidebarZIndex(false);
    };

    const handleScroll = () => {
      if (scrollFrameRef.current !== null) {
        return;
      }

      scrollFrameRef.current =
        window.requestAnimationFrame(checkSidebarPosition);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    /*
     * Initial calculation
     */
    checkSidebarPosition();

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);

        scrollFrameRef.current = null;
      }
    };
  }, [mounted, isMobile, hotelsLoading, hasHotels, updateSidebarZIndex]);

  /* ----------------------------------
     CMS POSITION OBSERVER

     CMS ki height dynamically change
     hone par trigger ki position recalculate
     hogi.
  ---------------------------------- */

  useEffect(() => {
    if (!mounted || isMobile) return;

    const cmsTrigger = cmsTriggerRef.current;

    if (!cmsTrigger) return;

    const checkCmsPosition = () => {
      if (hotelsLoading || !hasHotels) {
        return;
      }

      const rect = cmsTrigger.getBoundingClientRect();

      const cmsReached = rect.top <= CMS_TRIGGER_OFFSET;

      updateSidebarZIndex(cmsReached);
    };

    const resizeObserver = new ResizeObserver(() => {
      if (scrollFrameRef.current !== null) {
        return;
      }

      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = null;

        checkCmsPosition();
      });
    });

    resizeObserver.observe(cmsTrigger);

    window.addEventListener("resize", checkCmsPosition);

    checkCmsPosition();

    return () => {
      resizeObserver.disconnect();

      window.removeEventListener("resize", checkCmsPosition);
    };
  }, [mounted, isMobile, cms, hotelsLoading, hasHotels, updateSidebarZIndex]);

  /* ----------------------------------
     SEARCH DATA FROM URL / INITIAL DATA
  ---------------------------------- */

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

  /* ----------------------------------
     FILTER HELPERS
  ---------------------------------- */

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

  /* ----------------------------------
     ACTIVE FILTERS
  ---------------------------------- */

  const activeFilters = useMemo(() => {
    return Object.entries(filters);
  }, [filters]);

  const hasActiveFilters = useMemo(() => {
    return activeFilters.some(([_, value]) => isFilterActive(value));
  }, [activeFilters, isFilterActive]);

  /* ----------------------------------
     HYDRATION
  ---------------------------------- */

  if (!mounted) return null;

  return (
    <>
      {/* ==================================
          MOBILE
      ================================== */}

      {isMobile ? (
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
        /* ==================================
           DESKTOP
        ================================== */

        <div className="bg-[#edf7ff]">
          {/* SEARCH BAR */}

          <SearchBar searchData={draftSearchData} onSearch={handleSearch} />

          <div className="relative mx-auto mt-[-28px] flex max-w-7xl gap-4 p-3 md:flex-nowrap">
            {/* ==================================
                SIDEBAR
            ================================== */}

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

            {/* ==================================
                RIGHT CONTENT
            ================================== */}

            <div className="min-w-0 flex-1">
              {/* SORT BAR */}

              <div
                className={`sticky top-[98px] ${
                  sidebarZ0 ? "!-z-10" : "z-20"
                } bg-[#edf7ff]`}
              >
                <SortBar sort={sort} setSort={handleSortChange} />
              </div>

              {/* ==================================
                  ACTIVE FILTERS
              ================================== */}

              {hasActiveFilters && (
                <div
                  className={`sticky top-[138px] min-[700px]:max-[850px]:top-[155px] ${
                    sidebarZ0 ? "!-z-10" : "z-12"
                  } bg-[#edf7ff] !pt-[5px]`}
                >
                  <div className="!mb-4 flex flex-wrap gap-2">
                    {activeFilters.map(([key, value]) => {
                      if (!isFilterActive(value)) {
                        return null;
                      }

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

                    {/* PRICE FILTER */}

                    {(filters?.minPrice || filters?.maxPrice) && (
                      <div className="flex items-center gap-1 rounded bg-blue-100 px-3 py-1 text-xs text-blue-600">
                        ₹{filters?.minPrice || 0}
                        {" - "}₹{filters?.maxPrice || 50000}
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

                    {/* CLEAR ALL */}

                    <button
                      onClick={clearAll}
                      className="rounded bg-red-200 px-3 py-1 text-xs text-red-600"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              )}

              {/* ==================================
                  HOTEL LIST
              ================================== */}

              <div id="hotel-list-section" ref={hotelListRef}>
                <HotelList
                  searchData={appliedSearchData}
                  filters={filters}
                  sort={sort}
                  onHotelsChange={setHotelsForMap}
                  onLoadingChange={setHotelsLoading}
                  onResultChange={setHasHotels}
                />
              </div>

              {/* ==================================
                  CMS CONTENT

                  IMPORTANT:
                  CMS content ki actual height
                  z-index calculation me use nahi
                  ho rahi.

                  Invisible fixed trigger CMS ke
                  top par hai.
              ================================== */}

              <div className="relative">
                {/* CMS TRIGGER */}

                <div
                  ref={cmsTriggerRef}
                  className="pointer-events-none absolute top-0 left-0 h-[120px] w-full"
                  aria-hidden="true"
                />

                {/* CMS */}

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
        </div>
      )}

      {/* ==================================
          MAP MODAL
      ================================== */}

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
        {/* HEADER */}

        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-lg font-semibold md:text-xl">Hotels on Map</h2>

          <button
            onClick={() => setMapOpen(false)}
            className="rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
          >
            Close
          </button>
        </div>

        {/* CONTENT */}

        <div className="flex h-[70vh] md:h-[80vh] lg:h-[85vh]">
          {/* MAP */}

          <div className="flex-1">
            <HotelMap hotels={hotelsForMap} />
          </div>

          {/* SIDEBAR */}

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
