"use client";

import { Checkbox, Collapse, Input } from "antd";
import Image from "next/image";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

// options (OUTSIDE COMPONENT)
const suggestedOptions = [
  "5 Star",
  "Breakfast Included",
  "Couple Friendly",
  "Free Cancellation",
];

const propertyOptions = ["Hotel", "Villa", "Resort", "Apartment", "Homestay"];

const userRatingOptions = ["Excellent: 4.2+", "Very Good: 4+", "Good: 3.5+"];

const locationOptions = [
  "North Goa",
  "Calangute",
  "Baga",
  "Candolim",
  "Anjuna",
];

const starOptions = [3, 4, 5];

const priceRanges = [
  { label: "₹ 0 - ₹ 3000", min: 0, max: 3000 },
  { label: "₹ 3000 - ₹ 6000", min: 3000, max: 6000 },
  { label: "₹ 6000 - ₹ 10000", min: 6000, max: 10000 },
  { label: "₹ 10000+", min: 10000, max: 50000 },
];

function SidebarFilters({
  filters,
  setFilters,
  onMapClick,
  onClose,
  hideMapSection = false,
}) {
  const [tempFilters, setTempFilters] = useState(filters);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const updateFilters = (callback) => {
    if (isMobile) {
      setTempFilters(callback);
    } else {
      setFilters(callback);
    }
  };

  const handleSearch = useCallback(
    (e) => {
      const value = e.target.value;

      updateFilters((prev) => ({
        ...prev,
        search: value,
      }));
    },
    [updateFilters],
  );

  const currentFilters = isMobile ? tempFilters : filters;
  const handleCheckbox = useCallback(
    (key, value) => {
      updateFilters((prev) => {
        const current = prev[key] || [];

        const updated = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];

        return { ...prev, [key]: updated };
      });
    },
    [updateFilters],
  );

  const handleStarRating = useCallback(
    (rating) => {
      updateFilters((prev) => ({
        ...prev,
        starCategory:
          prev.starCategory === String(rating) ? "" : String(rating),
      }));
    },
    [updateFilters],
  );

  const handleFreeCancellation = useCallback(() => {
    updateFilters((prev) => ({
      ...prev,
      freeCancellation: !prev.freeCancellation,
    }));
  }, [updateFilters]);

  const handlePriceRange = useCallback(
    (min, max) => {
      updateFilters((prev) => ({
        ...prev,
        minPrice: String(min),
        maxPrice: String(max),
      }));
    },
    [updateFilters],
  );

  const handleCustomPrice = useCallback(
    (key, value) => {
      updateFilters((prev) => ({
        ...prev,
        [key]: value || "",
      }));
    },
    [updateFilters],
  );

  const filterSections = useMemo(() => {
    return [
      {
        key: "suggested",
        title: "Suggested For You",
        content: (
          <div className="flex flex-col gap-2 text-[13px] md:text-sm">
            {suggestedOptions.map((option) => (
              <Checkbox
                key={option}
                checked={currentFilters?.suggested?.includes(option) || false}
                onChange={() => handleCheckbox("suggested", option)}
              >
                {option}
              </Checkbox>
            ))}
          </div>
        ),
      },

      {
        key: "freeCancellation",
        title: "Free Cancellation",
        content: (
          <div className="flex flex-col gap-2">
            <Checkbox
              checked={currentFilters?.freeCancellation || false}
              onChange={handleFreeCancellation}
            >
              Free Cancellation
            </Checkbox>
          </div>
        ),
      },

      {
        key: "price",
        title: "Price Per Night",
        content: (
          <>
            <div className="flex flex-col gap-2">
              {priceRanges.map((item) => (
                <Checkbox
                  key={item.label}
                  checked={
                    Number(currentFilters?.minPrice) === item.min &&
                    Number(currentFilters?.maxPrice) === item.max
                  }
                  onChange={() => handlePriceRange(item.min, item.max)}
                >
                  {item.label}
                </Checkbox>
              ))}
            </div>

            <div className="mt-4">
              <p className="mb-2 text-xs font-medium text-gray-500">
                Custom Range
              </p>

              <div className="flex gap-2">
                <Input
                  placeholder="Min"
                  value={currentFilters?.minPrice}
                  onChange={(e) =>
                    handleCustomPrice("minPrice", e.target.value)
                  }
                />

                <Input
                  placeholder="Max"
                  value={currentFilters?.maxPrice}
                  onChange={(e) =>
                    handleCustomPrice("maxPrice", e.target.value)
                  }
                />
              </div>
            </div>
          </>
        ),
      },

      {
        key: "propertyType",
        title: "Property Type",
        content: (
          <div className="font-roboto! flex flex-col gap-2">
            {propertyOptions.map((option) => (
              <Checkbox
                key={option}
                checked={
                  currentFilters?.propertyType?.includes(option) || false
                }
                onChange={() => handleCheckbox("propertyType", option)}
              >
                {option}
              </Checkbox>
            ))}
          </div>
        ),
      },

      {
        key: "starCategory",
        title: "Star Category",
        content: (
          <div className="flex flex-col gap-2">
            {starOptions.map((rating) => (
              <Checkbox
                key={rating}
                checked={currentFilters?.starCategory === String(rating)}
                onChange={() => handleStarRating(rating)}
              >
                {rating} Star
              </Checkbox>
            ))}
          </div>
        ),
      },

      {
        key: "rating",
        title: "User Rating",
        content: (
          <div className="flex flex-col gap-2">
            {userRatingOptions.map((option) => (
              <Checkbox
                key={option}
                checked={currentFilters?.rating?.includes(option) || false}
                onChange={() => handleCheckbox("rating", option)}
              >
                {option}
              </Checkbox>
            ))}
          </div>
        ),
      },

      {
        key: "locations",
        title: "Top Locations",
        content: (
          <div className="flex flex-col gap-2">
            {locationOptions.map((option) => (
              <Checkbox
                key={option}
                checked={currentFilters?.locations?.includes(option) || false}
                onChange={() => handleCheckbox("locations", option)}
              >
                {option}
              </Checkbox>
            ))}
          </div>
        ),
      },
    ];
  }, [
    currentFilters,
    handleCheckbox,
    handleStarRating,
    handlePriceRange,
    handleCustomPrice,
    handleFreeCancellation,
  ]);

  return (
    <div className={`flex h-full flex-col bg-white p-3 shadow-md md:p-4`}>
      {!hideMapSection && (
        <div
          onClick={() => onMapClick?.()}
          className="relative mb-4 h-[80px] cursor-pointer overflow-hidden rounded sm:h-[70px] md:h-[105px]"
        >
          <Image
            src="/images/filterMap.png"
            alt="Explore on Map"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              className="buttion-background-color most-boder-colour most-text-color background-color cursor-pointer rounded border bg-white px-2 py-1 text-[10px] font-semibold shadow-md transition-all duration-200 sm:px-3 sm:py-1.5 sm:text-[11px] md:px-4 md:py-2 md:text-xs lg:px-5 lg:py-2.5 lg:text-sm"
            >
              Explore on Map
            </button>
          </div>
        </div>
      )}
      <div className="mb-3 md:mb-4">
        <Input
          allowClear
          placeholder="Search Hotel Name"
          value={currentFilters?.search || ""}
          onChange={handleSearch}
          className="h-8 rounded-lg border border-gray-200 md:h-11 [&_.ant-input]:!border-0 [&_.ant-input]:!text-[13px] [&_.ant-input]:!shadow-none [&_.ant-input]:focus:!shadow-none md:[&_.ant-input]:!text-[14px] [&_.ant-input::placeholder]:!text-gray-400"
        />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto pr-1">
          <Collapse
            defaultActiveKey={[
              "suggested",
              "freeCancellation",
              "price",
              "propertyType",
              "starCategory",
              "rating",
              "locations",
            ]}
            ghost
            expandIconPlacement="end"
            items={filterSections.map((section) => ({
              key: section.key,
              label: (
                <span className="text-[13px] font-semibold text-gray-800 md:text-sm">
                  {section.title}
                </span>
              ),
              children: section.content,
            }))}
          />
        </div>

        {isMobile && (
          <div className="sticky right-0 bottom-0 left-0 mt-3 border-t bg-white p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
            <div className="flex gap-3">
              <button
                onClick={() => {
                  const resetFilters = {
                    freeCancellation: false,
                    search: "",
                    starCategory: "",
                    minPrice: "",
                    maxPrice: "",
                    suggested: [],
                    propertyType: [],
                    rating: [],
                    locations: [],
                  };

                  setTempFilters(resetFilters);

                  onClose?.();
                }}
                className="h-8 flex-1 rounded-lg border border-gray-300 bg-white text-sm font-semibold text-gray-700 transition hover:border-[#0B5ED7] hover:text-[#0B5ED7]"
              >
                Reset
              </button>

              <button
                onClick={() => {
                  setFilters(tempFilters);
                  onClose?.();
                }}
                className="h-8 flex-1 rounded bg-[#0B6CFF] text-sm font-semibold text-white! transition hover:bg-[#0953be]"
              >
                View Properties
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(SidebarFilters);
