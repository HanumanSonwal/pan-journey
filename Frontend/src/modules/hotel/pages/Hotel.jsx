"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import HotelList from "../components/hotels/HotelList";
import SearchBar from "../components/hotels/SearchBar";
import SidebarFilters from "../components/SidebarFilters";
import SortBar from "../components/SortBar";
import CMSContentRenderer from "@/modules/cms/components/renderer/CMSContentRenderer";

const defaultSearchData = {
  city: "",
  cityData: { id: "" },
  checkIn: "",
  checkOut: "",
  rooms: 1,
  adults: 2,
  children: 0,
  childAges: [],
  pets: false,
};

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

export default function HotelContent({ initialSearchData = null, cms = null }) {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [draftSearchData, setDraftSearchData] = useState(
    initialSearchData || defaultSearchData,
  );
  const [searchData, setSearchData] = useState(
    initialSearchData || defaultSearchData,
  );
  const [filters, setFilters] = useState(defaultFilters);
  const [sort, setSort] = useState("recommended");
  useEffect(() => {
    setMounted(true);
  }, []);

  // SEO ROUTE SUPPORT
  useEffect(() => {
    if (initialSearchData) {
      setDraftSearchData(initialSearchData);
      setSearchData(initialSearchData);
      return;
    }

    if (!mounted) return;

    const initialData = {
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
    };
    setDraftSearchData(initialData);
    setSearchData(initialData);
  }, [mounted, searchParams, initialSearchData]);

  const handleSearch = useCallback(() => {
    setSearchData(draftSearchData);
  }, [draftSearchData]);

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
  }, []);

  const activeFilters = useMemo(() => {
    return Object.entries(filters);
  }, [filters]);

  const hasActiveFilters = useMemo(() => {
    return activeFilters.some(([_, value]) => isFilterActive(value));
  }, [activeFilters, isFilterActive]);

  if (!mounted) return null;

  return (
    <div className="bg-[#edf7ff]">
      <SearchBar
        draftSearchData={draftSearchData}
        setDraftSearchData={setDraftSearchData}
        onSearch={handleSearch}
      />

      <div className="relative mx-auto mt-[-48px] flex max-w-7xl gap-4 p-3 md:flex-nowrap">
        <div className="sticky top-4 max-h-[calc(100vh-20px)] w-full overflow-y-auto sm:w-64 md:w-72">
          <SidebarFilters filters={filters} setFilters={setFilters} />
        </div>

        <div className="min-w-0 flex-1">
          <SortBar sort={sort} setSort={setSort} />

          <HotelList searchData={searchData} filters={filters} sort={sort} />

          {/* CMS SEO CONTENT */}
          {cms && (
            <div className="mt-8">
              <CMSContentRenderer cms={cms} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
