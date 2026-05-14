"use client";

import { useDestinationSearch } from "@/modules/hotel/hooks/useDestinationSearch";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";
import { useEffect, useMemo, useState } from "react";

export default function DestinationSearchField({
  value,
  onChange,
  compact = false,
  height = "74px",
  wrapperClassName = "",
}) {
  const [mounted, setMounted] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  // HYDRATION FIX
  useEffect(() => {
    setMounted(true);
  }, []);

  // LOAD RECENT SEARCHES
  useEffect(() => {
    if (!mounted) return;

    const stored =
      JSON.parse(localStorage.getItem("recentHotelSearches") || "[]") || [];

    setRecentSearches(stored);

    if (stored.length > 0 && !value?.city) {
      onChange({
        city: stored[0]?.name || "",
        cityData: stored[0] || null,
      });
    }
  }, [mounted]);

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
  const { data = [], isLoading } =
    useDestinationSearch(debouncedSearch);

  // SAVE RECENT SEARCH
  const saveRecentSearch = (item) => {
    if (!item) return;

    const existing =
      JSON.parse(localStorage.getItem("recentHotelSearches") || "[]") || [];

    const filtered = existing.filter((x) => x.id !== item.id);

    const updated = [item, ...filtered].slice(0, 4);

    localStorage.setItem(
      "recentHotelSearches",
      JSON.stringify(updated),
    );

    setRecentSearches(updated);
  };

  // EMPTY INPUT
  const isEmptySearch = searchText.trim() === "";

  // SORT RESULTS
  const sortedSearchResults = [...(data || [])].sort((a, b) => {
    const aStarts = a.name
      ?.toLowerCase()
      ?.startsWith(searchText.toLowerCase());

    const bStarts = b.name
      ?.toLowerCase()
      ?.startsWith(searchText.toLowerCase());

    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;

    return 0;
  });

  // OPTION BUILDER
  const buildOptions = (items = []) => {
    return items.map((item) => ({
      label: (
        <div className="flex flex-col py-[2px]">
          <span className="font-medium text-gray-800">
            {item.name}
          </span>

          <span className="text-[10px] text-gray-500">
            {item.type}
          </span>
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
              !recentSearches.some(
                (recent) => recent.name === popular.name,
              ),
          ),
        ),
      },
    ]
    : [
      {
        label: "Cities",
        options: buildOptions(
          sortedSearchResults.filter(
            (item) => item.type === "City",
          ),
        ),
      },

      {
        label: "Hotels",
        options: buildOptions(
          sortedSearchResults.filter(
            (item) => item.type === "Hotel",
          ),
        ),
      },

      {
        label: "Airports",
        options: buildOptions(
          sortedSearchResults.filter(
            (item) => item.type === "Airport",
          ),
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
      className={`relative w-full
    min-w-0
    max-w-full overflow-visible rounded-2xl border border-gray-300 bg-white px-4 pt-[12px] pb-[6px] transition-all hover:border-[#0077b6] ${wrapperClassName}`}
      style={{
        height,
        minHeight: height,
        maxHeight: height,
        boxSizing: "border-box",
      }}
    >
      {/* TOP LABEL */}
      {!compact && (
        <div className="absolute left-4 -top-[9px] z-30 bg-white px-2">
          <span
            className="
              block
              whitespace-nowrap
              text-[17px]
              font-semibold
              leading-none
              text-gray-800
            "
          >
            City, Property name or Location
          </span>
        </div>
      )}

      {/* SELECT */}
      {mounted && (
        <Select
          showSearch
          allowClear
          value={value?.city || undefined}
          placeholder="Where do you want to stay?"
          variant="borderless"
          popupMatchSelectWidth={false}
          filterOption={false}
          loading={isLoading}
          className="w-full custom-search-select !text-[23px]"
          options={groupedOptions}
          onSearch={handleSearch}
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
      )}

      {/* COUNTRY */}
      {compact ? (
        <span className="truncate text-[11px] text-gray-400">
          {value?.cityData?.country || ""}
        </span>
      ) : (
        <span className="mt-[2px] block truncate text-[12px] leading-none text-gray-500">
          {value?.cityData?.country || "Search destinations"}
        </span>
      )}

      <style jsx global>{`
        .custom-search-select {
          width: full !important;
          max-width: 100% !important;
          overflow: auto !important;
        }

        .custom-search-select .ant-select-selector {
          border: none !important;
          box-shadow: none !important;
          background: transparent !important;
          padding: 0 !important;

          width: 100% !important;
          max-width: 100% !important;
          overflow: hidden !important;
        }

        /* MAIN VALUE */
        .custom-search-select .ant-select-selection-item {
          font-size: 45px !important;
          font-weight: 700 !important;
          color: #111827 !important;
          line-height: 1.1 !important;

          width: 100% !important;
          max-width: 100% !important;

          overflow-x: auto !important;
          overflow-y: hidden !important;

          white-space: nowrap !important;
          text-overflow: unset !important;

          scrollbar-width: none !important;
          -ms-overflow-style: none !important;

          cursor: grab !important;
          user-select: text !important;
        }

        /* HIDE SCROLLBAR */
        .custom-search-select
          .ant-select-selection-item::-webkit-scrollbar {
          display: none !important;
        }

        /* PLACEHOLDER */
        .custom-search-select .ant-select-selection-placeholder {
          font-size: 45px !important;
          font-weight: 700 !important;
          color: #111827 !important;
          line-height: 1.1 !important;

          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
        }

        /* INPUT */
        .custom-search-select .ant-select-selection-search-input {
          font-size: 45px !important;
          font-weight: 700 !important;
          color: #111827 !important;

          height: 52px !important;
        }

        .custom-search-select .ant-select-arrow {
          display: none !important;
        }

        /* IMPORTANT FIX */
        .custom-search-select,
        .custom-search-select .ant-select-selector,
        .custom-search-select .ant-select-selection-item,
        .custom-search-select .ant-select-selection-search,
        .custom-search-select .ant-select-selection-overflow {
          min-width: 0 !important;
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .custom-search-select .ant-select-selection-item,
          .custom-search-select .ant-select-selection-placeholder,
          .custom-search-select .ant-select-selection-search-input {
            font-size: 28px !important;
          }

          .custom-search-select .ant-select-selection-search-input {
            height: 40px !important;
          }
        }
      `}</style>
    </div>
  );
}
