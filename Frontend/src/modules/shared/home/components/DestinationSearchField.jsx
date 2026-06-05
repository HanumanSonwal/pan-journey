"use client";

import { useDestinationSearch } from "@/modules/hotel/hooks/useDestinationSearch";
import { Popover, Select, Spin } from "antd";
import debounce from "lodash/debounce";
import { memo, useEffect, useMemo, useState } from "react";
import styles from "../components/styles/DestinationSearch.module.css";

function DestinationSearchField({
  value,
  onChange,
  error = false,
  compact = false,
  height = "82px",
  fontSize = "24px",
  wrapperClassName = "",
  autoSelectRecent = false,
}) {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  // RECENT SEARCHES
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored =
        JSON.parse(localStorage.getItem("recentHotelSearches") || "[]") || [];

      setRecentSearches(stored);

      // AUTO SELECT
      if (autoSelectRecent && stored.length > 0 && !value?.city) {
        onChange({
          city: stored[0]?.name || "",

          cityData: {
            ...stored[0],

            stateName: stored[0]?.stateName || stored[0]?.state || "",

            countryCode: stored[0]?.countryCode || stored[0]?.country || "",
          },
        });
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
    }
  }, []);

  // DEBOUNCE
  const debounceSearch = useMemo(
    () =>
      debounce((value) => {
        setDebouncedSearch(value);
      }, 200),
    [],
  );

  useEffect(() => {
    return () => {
      debounceSearch.cancel();
    };
  }, [debounceSearch]);

  // SEARCH
  const handleSearch = (value) => {
    setSearchText(value);
    debounceSearch(value);
  };

  // API
  const { data = [], isLoading } = useDestinationSearch(debouncedSearch);

  // SAVE RECENT
  const saveRecentSearch = (item) => {
    if (!item || typeof window === "undefined") {
      return;
    }

    try {
      const existing =
        JSON.parse(localStorage.getItem("recentHotelSearches") || "[]") || [];

      const filtered = existing.filter((x) => x.name !== item.name);

      const updated = [item, ...filtered].slice(0, 4);

      localStorage.setItem("recentHotelSearches", JSON.stringify(updated));

      setRecentSearches(updated);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
    }
  };

  const isEmptySearch = searchText.trim() === "";

  // SORT RESULTS
  const sortedSearchResults = useMemo(() => {
    return [...data].sort((a, b) => {
      const aStarts = a?.name
        ?.toLowerCase()
        ?.startsWith(searchText.toLowerCase());

      const bStarts = b?.name
        ?.toLowerCase()
        ?.startsWith(searchText.toLowerCase());

      if (aStarts && !bStarts) return -1;

      if (!aStarts && bStarts) return 1;

      return 0;
    });
  }, [data, searchText]);

  // OPTIONS
  const buildOptions = (items = []) => {
    return items.map((item) => {
      const fullName = [
        item.name,
        item.stateName || item.state,
        item.country || item.countryCode,
      ]
        .filter(Boolean)
        .join(", ");

      return {
        label: (
          <div className="flex flex-col py-1">
            <span className="font-semibold text-gray-800">
              {[
                item.name,
                item.stateName || item.state,
                item.country || item.countryCode,
              ]
                .filter(Boolean)
                .join(", ")}
            </span>

            <span className="text-xs text-gray-500">{item.type}</span>
          </div>
        ),

        value: `${item.type}-${item.id}`,

        searchLabel: fullName,

        itemData: item,
      };
    });
  };

  // GROUPED OPTIONS
  const groupedOptions = useMemo(() => {
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
  }, [isEmptySearch, recentSearches, data, sortedSearchResults]);

  // SELECT
  const handleChange = (selectedValue, option) => {
    saveRecentSearch(option?.itemData);

    const item = option?.itemData;

    onChange({
      city: option?.searchLabel || "",

      cityData: {
        ...item,

        stateName: item?.stateName || item?.state || "",

        countryCode: item?.countryCode || item?.country || "",
      },
    });
  };

  return (
    <div
      title={value?.city || ""}
      className={`relative w-full min-w-0 overflow-visible rounded border px-3 py-3 transition-all hover:border-[#0077b6] ${
        error ? "border-red-500" : "border-gray-300"
      } ${wrapperClassName}`}
      style={{ height }}
    >
      {/* LABEL */}
      {!compact && (
        <span className="absolute -top-2.5 left-4 rounded bg-white px-2 text-[14px] font-semibold tracking-wide text-[#0F6A75]">
          City, Property name or Location
        </span>
      )}

      {/* CONTENT */}
      <div
        className={`flex w-full min-w-0 overflow-hidden ${
          compact
            ? "h-full items-center px-0"
            : "min-h-[56px] flex-col justify-center px-1 md:px-2"
        }`}
      >
        {/* SELECT */}
        <div className="w-full min-w-0 overflow-hidden">
          <Popover
            open={error}
            placement="bottomLeft"
            content={
              <span className="text-white">
                Enter a destination to start searching.
              </span>
            }
            color="#ef4444"
            trigger={[]}
          >
            <Select
              showSearch
              allowClear
              value={
                value?.city
                  ? value.city.length > 35
                    ? `${value.city.slice(0, 35)}...`
                    : value.city
                  : undefined
              }
              onClear={() => {
                setDestinationError?.(false);

                onChange({
                  city: "",
                  cityData: null,
                });
              }}
              title={value?.city || ""}
              placeholder="Where do you want to stay?"
              variant="borderless"
              popupMatchSelectWidth={compact ? false : true}
              filterOption={false}
              loading={isLoading}
              className={`w-full min-w-0 overflow-hidden ${styles.destinationSelect}`}
              style={{
                fontWeight: 700,
                fontSize,
                lineHeight: 1,
                width: "100%",
                minWidth: 0,
              }}
              options={groupedOptions}
              onSearch={handleSearch}
              onFocus={() => {
                setDebouncedSearch("");
              }}
              onChange={handleChange}
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
            />
          </Popover>
        </div>

        {/* COUNTRY */}
        {compact ? (
          <span
            className="ml-1 max-w-[70px] flex-shrink-0 overflow-hidden text-[11px] text-ellipsis whitespace-nowrap text-gray-400"
            title={
              value?.cityData?.country || value?.cityData?.countryCode || ""
            }
          >
            {value?.cityData?.country || value?.cityData?.countryCode || ""}
          </span>
        ) : (
          <span className="text-xs text-gray-500 md:text-sm">
            {value?.cityData?.country ||
              value?.cityData?.countryCode ||
              "Search destinations"}
          </span>
        )}
      </div>
      {/* {error && (
        <div className="pointer-events-none absolute top-[calc(100%+8px)] left-0 z-[9999] whitespace-nowrap">
          <div className="relative rounded bg-red-500 px-3 py-2 text-sm text-white shadow-lg">
            Enter a destination to start searching.
            <div className="absolute -top-1 left-4 h-2 w-2 rotate-45 bg-red-500" />
          </div>
        </div>
      )} */}
    </div>
  );
}

export default memo(DestinationSearchField);
