"use client";

import { useDestinationSearch } from "@/modules/hotel/hooks/useDestinationSearch";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import styles from "../components/styles/DestinationSearch.module.css";

function DestinationSearchField({
  value,
  onChange,
  compact = false,
  height = "82px",
  fontSize = "24px",
  wrapperClassName = "",
  autoSelectRecent = false,
}) {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  // LOAD RECENT SEARCHES
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      const stored =
        JSON.parse(localStorage.getItem("recentHotelSearches") || "[]") || [];
      setRecentSearches(stored);
      // AUTO SELECT LAST SEARCH
      if (autoSelectRecent && stored.length > 0 && !value?.city) {
        onChange({
          city: stored[0]?.name || "",
          cityData: stored[0] || null,
        });
      }
    } catch (error) {
      console.error("RECENT SEARCH ERROR:", error);
    }
  }, []);

  // DEBOUNCE
  const debounceSearch = useMemo(() => {
    return debounce((value) => {
      setDebouncedSearch(value);
    }, 400);
  }, []);

  // CLEANUP
  useEffect(() => {
    return () => {
      debounceSearch.cancel();
    };
  }, [debounceSearch]);

  // HANDLE SEARCH
  const handleSearch = useCallback(
    (value) => {
      setSearchText(value);
      debounceSearch(value);
    },
    [debounceSearch],
  );

  // API
  const { data = [], isLoading } = useDestinationSearch(debouncedSearch);
  // SAVE RECENT SEARCH
  const saveRecentSearch = useCallback((item) => {
    if (!item || typeof window === "undefined") {
      return;
    }
    try {
      const existing =
        JSON.parse(localStorage.getItem("recentHotelSearches") || "[]") || [];
      const filtered = existing.filter((x) => x.id !== item.id);
      const updated = [item, ...filtered].slice(0, 4);
      localStorage.setItem("recentHotelSearches", JSON.stringify(updated));
      setRecentSearches(updated);
    } catch (error) {
      console.error("SAVE SEARCH ERROR:", error);
    }
  }, []);
  const isEmptySearch = searchText.trim() === "";
  // SORT RESULTS
  const sortedSearchResults = useMemo(() => {
    return [...(data || [])].sort((a, b) => {
      const aStarts = a?.name
        ?.toLowerCase()
        ?.startsWith(searchText.toLowerCase());
      const bStarts = b.name
        ?.toLowerCase()
        ?.startsWith(searchText.toLowerCase());
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    });
  }, [data, searchText]);

  // OPTION BUILDER
  const buildOptions = useCallback((items = []) => {
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
  }, []);

  // GROUPED OPTIONS
  const groupedOptions = useMemo(() => {
    // EMPTY SEARCH
    if (isEmptySearch) {
      return [
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
      ];
    }
    // SEARCH RESULTS
    return [
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
  }, [isEmptySearch, recentSearches, data, buildOptions, sortedSearchResults]);

  // SELECT CHANGE
  const handleChange = useCallback(
    (selectedValue, option) => {
      saveRecentSearch(option?.itemData);

      onChange({
        city: option?.searchLabel || "",

        cityData: option?.itemData || null,
      });
    },
    [onChange, saveRecentSearch],
  );

  return (
    <div
      className={`relative min-w-0 rounded-xl border border-gray-300 px-3 py-3 transition-all hover:border-[#0077b6] ${wrapperClassName}`}
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
          onClear={() => {
            onChange({
              city: "",
              cityData: null,
            });
          }}
          value={value?.city || undefined}
          title={value?.city || ""}
          placeholder="Where do you want to stay?"
          variant="borderless"
          popupMatchSelectWidth={compact ? false : true}
          filterOption={false}
          loading={isLoading}
          className={`w-full ${styles.destinationSelect}`}
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
          onChange={handleChange}
        />

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

export default memo(DestinationSearchField);
