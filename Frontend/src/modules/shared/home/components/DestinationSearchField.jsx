"use client";

import { useDestinationSearch } from "@/modules/hotel/hooks/useDestinationSearch";
import { SearchOutlined } from "@ant-design/icons";
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
  icon,
}) {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored =
        JSON.parse(localStorage.getItem("recentHotelSearches") || "[]") || [];

      setRecentSearches(stored);

      if (autoSelectRecent && stored.length > 0 && !value?.city) {
        const recent = stored[0];

        onChange({
          city: recent?.displayName || recent?.name || "",

          cityData: {
            ...recent,
            stateName: recent?.stateName || recent?.state || "",
            countryCode: recent?.countryCode || recent?.country || "",
            normalizedCity: recent?.city || recent?.name || "",
          },
        });
      }
    } catch (err) {
      console.error("RECENT SEARCH LOAD ERROR:", err);
    }
  }, [autoSelectRecent, onChange, value?.city]);

  const debounceSearch = useMemo(
    () =>
      debounce((searchValue) => {
        const trimmedValue = searchValue.trim();
        console.log("DEBOUNCED DESTINATION SEARCH:", trimmedValue);
        setDebouncedSearch(trimmedValue);
      }, 300),
    [],
  );

  useEffect(() => {
    return () => {
      debounceSearch.cancel();
    };
  }, [debounceSearch]);

  const handleSearch = (searchValue) => {
    console.log("DESTINATION INPUT:", searchValue);
    setSearchText(searchValue);
    debounceSearch(searchValue);
  };

  const {
    data = [],
    isLoading,
    isFetching,
    isError,
  } = useDestinationSearch(debouncedSearch);
  const isDebouncing = searchText.trim() !== debouncedSearch;

  console.log("DESTINATION STATE:", {
    searchText,
    debouncedSearch,
    isDebouncing,
    resultCount: data?.length || 0,
    isLoading,
    isFetching,
    isError,
  });

  const saveRecentSearch = (item) => {
    if (!item || typeof window === "undefined") {
      return;
    }

    try {
      const existing =
        JSON.parse(localStorage.getItem("recentHotelSearches") || "[]") || [];

      const filtered = existing.filter(
        (existingItem) => existingItem?.id !== item?.id,
      );
      const updated = [item, ...filtered].slice(0, 4);
      localStorage.setItem("recentHotelSearches", JSON.stringify(updated));
      setRecentSearches(updated);
    } catch (err) {
      console.error("SAVE RECENT SEARCH ERROR:", err);
    }
  };

  const isEmptySearch = searchText.trim() === "";

  const sortedSearchResults = useMemo(() => {
    if (!Array.isArray(data)) {
      return [];
    }

    const search = debouncedSearch.toLowerCase();

    return [...data].sort((a, b) => {
      const aName = a?.name?.toLowerCase() || "";
      const bName = b?.name?.toLowerCase() || "";

      const aStarts = aName.startsWith(search);
      const bStarts = bName.startsWith(search);

      if (aStarts && !bStarts) return -1;

      if (!aStarts && bStarts) return 1;

      return 0;
    });
  }, [data, debouncedSearch]);

  const buildOptions = (items = []) => {
    if (!Array.isArray(items)) {
      return [];
    }

    return items.map((item) => {
      const fullName =
        item?.displayName ||
        [item?.name, item?.state, item?.country].filter(Boolean).join(", ");

      const optionValue = `${
        item?.type || "destination"
      }-${item?.id || fullName}`;

      return {
        label: (
          <div className="flex flex-col py-1">
            <span className="font-semibold text-gray-800">{fullName}</span>

            <span className="text-xs text-gray-500 capitalize">
              {item?.type || ""}
            </span>
          </div>
        ),
        value: optionValue,
        searchLabel: fullName,
        itemData: item,
      };
    });
  };

  const groupedOptions = useMemo(() => {
    if (isDebouncing) {
      return [];
    }

    if (isEmptySearch) {
      if (recentSearches.length === 0) {
        return [];
      }

      return [
        {
          label: "Recent Searches",
          options: buildOptions(recentSearches),
        },
      ];
    }
    if (debouncedSearch.length < 2) {
      return [];
    }

    const cities = sortedSearchResults.filter((item) => {
      const type = item?.type?.toLowerCase();
      return type === "city" || type === "multicity";
    });

    const hotels = sortedSearchResults.filter((item) => {
      const type = item?.type?.toLowerCase();
      return type === "hotel";
    });

    const locations = sortedSearchResults.filter((item) => {
      const type = item?.type?.toLowerCase();

      return [
        "location",
        "state",
        "neighborhood",
        "trainstation",
        "pointofinterest",
      ].includes(type);
    });

    return [
      ...(cities.length > 0
        ? [
            {
              label: "Cities",
              options: buildOptions(cities),
            },
          ]
        : []),

      ...(hotels.length > 0
        ? [
            {
              label: "Hotels",
              options: buildOptions(hotels),
            },
          ]
        : []),

      ...(locations.length > 0
        ? [
            {
              label: "Locations",
              options: buildOptions(locations),
            },
          ]
        : []),
    ];
  }, [
    isDebouncing,
    isEmptySearch,
    recentSearches,
    sortedSearchResults,
    debouncedSearch,
  ]);

  const handleChange = (selectedValue, option) => {
    const item = option?.itemData;

    if (!item) {
      return;
    }
    debounceSearch.cancel();
    console.log("DESTINATION SELECTED:", item);
    saveRecentSearch(item);
    const normalizedCity = item?.city || item?.name || "";
    onChange({
      city: item?.displayName || option?.searchLabel || item?.name || "",

      cityData: {
        ...item,
        id: item?.id || "",
        name: item?.name || "",
        type: item?.type || "",
        city: item?.city || normalizedCity,
        state: item?.state || "",
        stateName: item?.stateName || item?.state || "",
        country: item?.country || "",
        countryCode: item?.countryCode || "",
        displayName: item?.displayName || "",
        normalizedCity,
      },
    });

    setSearchText("");
    setDebouncedSearch("");
  };


  const handleClear = () => {
    debounceSearch.cancel();

    setSearchText("");
    setDebouncedSearch("");

    onChange({
      city: "",
      cityData: null,
    });
  };


  const loading = isLoading || isFetching || isDebouncing;


  return (
    <>
      {!compact && (
        <span className="mb-2 block text-[14px] font-semibold text-[#222]">
          City, Property name or Location
        </span>
      )}

      <div
        title={value?.city || ""}
        className={`relative w-full min-w-0 overflow-visible rounded border !bg-white px-3 py-1 transition-all hover:border-[#0077b6] ${
          error ? "border-red-500" : "border-gray-300"
        } ${wrapperClassName}`}
        style={{ height }}
      >
        <div
          className={`flex w-full min-w-0 overflow-hidden ${
            compact
              ? "h-full items-center gap-2 px-0"
              : "min-h-[6px] flex-col justify-center px-1 md:px-2"
          }`}
        >
          {icon && <div className="flex shrink-0 items-center">{icon}</div>}

          <div className="flex w-full min-w-0 items-center gap-2 overflow-hidden">
            {icon || <SearchOutlined className="!text-[20px] text-gray-400" />}

            <div className="min-w-0 flex-1">
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
                  onClear={handleClear}
                  onSearch={handleSearch}
                  onChange={handleChange}
                  title={value?.city || ""}
                  placeholder="Where do you want to stay?"
                  variant="borderless"
                  popupMatchSelectWidth={compact ? false : true}
                  filterOption={false}
                  loading={loading}
                  className={`font-jost! w-full min-w-0 overflow-hidden font-medium text-gray-600 min-[700px]:font-semibold! min-[700px]:text-gray-800! ${styles.destinationSelect}`}
                  style={{
                    width: "100%",
                    fontSize,
                    fontWeight: 400,
                  }}
                  options={groupedOptions}
                  notFoundContent={
                    loading ? (
                      <div className="flex justify-center py-4">
                        <Spin size="small" />
                      </div>
                    ) : isError ? (
                      <div className="py-3 text-center text-sm text-red-500">
                        Failed to load destinations
                      </div>
                    ) : searchText.trim().length >= 2 ? (
                      <div className="py-3 text-center text-sm text-gray-500">
                        No destinations found
                      </div>
                    ) : null
                  }
                />
              </Popover>
            </div>
          </div>

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
            <span className="!z-34 text-xs !font-bold text-gray-700 md:text-sm">
              {value?.cityData?.country ||
                value?.cityData?.countryCode ||
                "Search destinations"}
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default memo(DestinationSearchField);
