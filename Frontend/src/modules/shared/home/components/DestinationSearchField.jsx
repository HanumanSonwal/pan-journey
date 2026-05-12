"use client";

import { useDestinationSearch } from "@/modules/hotel/hooks/useDestinationSearch";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";
import { useEffect, useMemo, useState } from "react";

export default function DestinationSearchField({
  value,
  onChange,
  compact = false,
  height = "82px",
  fontSize = "24px",
  wrapperClassName = "",
}) {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  // LOAD RECENT SEARCHES
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored =
      JSON.parse(localStorage.getItem("recentHotelSearches") || "[]") || [];
    setRecentSearches(stored);
    // AUTO SELECT LAST SEARCH
    if (stored.length > 0 && !value?.city) {
      onChange({
        city: stored[0]?.name || "",
        cityData: stored[0] || null,
      });
    }
  }, []);

  // DEBOUNCE
  const debounceSearch = useMemo(
    () =>
      debounce((value) => {
        setDebouncedSearch(value);
      }, 400),
    [],
  );

  // HANDLE SEARCH
  const handleSearch = (value) => {
    setSearchText(value);
    debounceSearch(value);
  };

  // API
  const { data = [], isLoading } = useDestinationSearch(debouncedSearch);

  // SAVE RECENT SEARCH
  const saveRecentSearch = (item) => {
    if (!item) return;
    const existing =
      JSON.parse(localStorage.getItem("recentHotelSearches") || "[]") || [];
    const filtered = existing.filter((x) => x.id !== item.id);
    const updated = [item, ...filtered].slice(0, 4);
    localStorage.setItem("recentHotelSearches", JSON.stringify(updated));
    setRecentSearches(updated);
  };

  // EMPTY INPUT
  const isEmptySearch = searchText.trim() === "";
  // SORT RESULTS
  const sortedSearchResults = [...(data || [])].sort((a, b) => {
    const aStarts = a.name?.toLowerCase()?.startsWith(searchText.toLowerCase());
    const bStarts = b.name?.toLowerCase()?.startsWith(searchText.toLowerCase());
    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;
    return 0;
  });

  // OPTION BUILDER
  const buildOptions = (items = []) => {
    return items.map((item) => ({
      label: (
        <div className="flex flex-col py-1">
          <span className="font-semibold text-gray-800">{item.name}</span>
          <span className="text-xs text-gray-500">{item.type}</span>
        </div>
      ),

      value: `${item.type}-${item.id}`,
      searchLabel: item.name,
      itemData: item,
    }));
  };

  // GROUPED OPTIONS
  const groupedOptions = isEmptySearch
    ? [
        ...(recentSearches.length > 0
          ? [
              {
                label: "Recent Searches",

                options: buildOptions(recentSearches),
              },
            ]
          : []),

        {
          label: "Popular Destinations",

          options: buildOptions(
            data.filter(
              (popular) =>
                !recentSearches.some((recent) => recent.name === popular.name),
            ),
          ),
        },
      ]
    : [
        {
          label: "Cities",

          options: buildOptions(
            sortedSearchResults.filter((item) => item.type === "City"),
          ),
        },

        {
          label: "Hotels",

          options: buildOptions(
            sortedSearchResults.filter((item) => item.type === "Hotel"),
          ),
        },

        {
          label: "Airports",

          options: buildOptions(
            sortedSearchResults.filter((item) => item.type === "Airport"),
          ),
        },

        {
          label: "Locations",

          options: buildOptions(
            sortedSearchResults.filter(
              (item) =>
                item.type !== "City" &&
                item.type !== "Hotel" &&
                item.type !== "Airport",
            ),
          ),
        },
      ];

  return (
    <div
      className={`relative rounded-xl border border-gray-300 px-3 py-3 transition-all hover:border-[#0077b6] ${wrapperClassName}`}
      style={{ height }}
    >
      {/* LABEL */}
      {!compact && (
        <span className="absolute -top-2 left-3 bg-white px-1 text-[14px] font-medium text-gray-800 md:text-[15px]">
          City, Property name or Location
        </span>
      )}

      <div
        className={`flex ${
          compact
            ? "h-full items-center px-0"
            : "min-h-[56px] flex-col justify-center px-1 md:px-2"
        }`}
      >
        <Select
          showSearch
          allowClear
          value={value?.city || undefined}
          placeholder="Where do you want to stay?"
          variant="borderless"
          popupMatchSelectWidth={false}
          filterOption={false}
          loading={isLoading}
          className="w-full"
          style={{
            fontWeight: 700,
            fontSize,
            lineHeight: 1,
          }}
          options={groupedOptions}
          onSearch={handleSearch}
          onFocus={() => {
            setDebouncedSearch("");
          }}
          notFoundContent={
            isLoading ? (
              <div className="flex justify-center py-4">
                <Spin size="small" />
              </div>
            ) : (
              <div className="py-3 text-center text-sm text-gray-500">
                No destinations found
              </div>
            )
          }
          onChange={(selectedValue, option) => {
            saveRecentSearch(option?.itemData);

            onChange({
              city: option?.searchLabel || "",

              cityData: option?.itemData || null,
            });
          }}
        />

        {/* COUNTRY */}
        {/* COUNTRY */}
        {/* COUNTRY */}
        {compact ? (
          <span className="ml-1 text-[11px] text-gray-400">
            {value?.cityData?.country || ""}
          </span>
        ) : (
          <span className="text-xs text-gray-500 md:text-sm">
            {value?.cityData?.country || "Search destinations"}
          </span>
        )}
      </div>
    </div>
  );
}
