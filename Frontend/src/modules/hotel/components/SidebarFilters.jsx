"use client";

import { Checkbox, Input } from "antd";
import { useState } from "react";

export default function SidebarFilters({ filters, setFilters }) {
  const [searchText, setSearchText] = useState("");

  const [showMore, setShowMore] = useState({
    suggested: false,
    propertyType: false,
  });

  // ✅ SHOW MORE
  const toggleShowMore = (key) => {
    setShowMore((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // ✅ CHECKBOX FILTERS
  const handleCheckbox = (key, value) => {
    const current = filters[key] || [];

    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    setFilters((prev) => ({
      ...prev,
      [key]: updated,
    }));
  };

  // ✅ PRICE FILTER
  const handlePrice = (value) => {
    let min = 0;
    let max = Infinity;

    if (value === "₹ 0 - ₹ 3000") {
      min = 0;
      max = 3000;
    } else if (value === "₹ 3000 - ₹ 6000") {
      min = 3000;
      max = 6000;
    } else if (value === "₹ 6000 - ₹ 10000") {
      min = 6000;
      max = 10000;
    } else if (value === "₹ 10000+") {
      min = 10000;
    }

    setFilters((prev) => ({
      ...prev,
      min,
      max,
    }));
  };

  // ✅ FILTER RENDER
  const renderOptions = (key, items, isPrice = false) => {
    const filtered = items.filter((item) =>
      item.label.toLowerCase().includes(searchText.toLowerCase()),
    );

    const visibleItems = showMore[key] ? filtered : filtered.slice(0, 4);

    return (
      <>
        {visibleItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-2 py-1.5"
          >
            <Checkbox
              checked={filters[key]?.includes(item.label) || false}
              onChange={() =>
                isPrice
                  ? handlePrice(item.label)
                  : handleCheckbox(key, item.label)
              }
              className="flex-1"
            >
              <span className="text-gray-800 text-sm">{item.label}</span>
            </Checkbox>

            <span className="text-gray-400 text-[11px] min-w-[40px] text-right">
              ({item.count})
            </span>
          </div>
        ))}

        {/* SHOW MORE */}
        {filtered.length > 4 && (
          <button
            type="button"
            onClick={() => toggleShowMore(key)}
            className="text-[#0077b6] text-sm font-medium mt-1 hover:underline mb-3"
          >
            {showMore[key] ? "Show less" : `Show ${filtered.length - 4} more`}
          </button>
        )}
      </>
    );
  };

  // ✅ FILTER DATA
  const data = {
    suggested: [
      {
        label: "Last Minute Deals",
        count: 102,
      },
      {
        label: "5 Star",
        count: 102,
      },
      {
        label: "North Goa",
        count: 102,
      },
      {
        label: "Resorts",
        count: 102,
      },
      {
        label: "Beachfront Properties",
        count: 102,
      },
      {
        label: "Luxury",
        count: 102,
      },
      {
        label: "Budget Hotels",
        count: 102,
      },
      {
        label: "Couple Friendly",
        count: 102,
      },
    ],

    priceRange: [
      {
        label: "₹ 0 - ₹ 3000",
        count: 102,
      },
      {
        label: "₹ 3000 - ₹ 6000",
        count: 102,
      },
      {
        label: "₹ 6000 - ₹ 10000",
        count: 102,
      },
      {
        label: "₹ 10000+",
        count: 102,
      },
    ],

    starCategory: [
      {
        label: "3 Star",
        count: 102,
      },
      {
        label: "4 Star",
        count: 102,
      },
      {
        label: "5 Star",
        count: 102,
      },
    ],

    rating: [
      {
        label: "Excellent: 4.2+",
        count: 102,
      },
      {
        label: "Very Good: 4+",
        count: 102,
      },
      {
        label: "Good: 3.5+",
        count: 102,
      },
    ],

    propertyType: [
      {
        label: "Apartment",
        count: 102,
      },
      {
        label: "Villa",
        count: 102,
      },
      {
        label: "Hotel",
        count: 102,
      },
      {
        label: "Homestay",
        count: 102,
      },
      {
        label: "Resort",
        count: 102,
      },
      {
        label: "Hostel",
        count: 102,
      },
      {
        label: "Guest House",
        count: 102,
      },
      {
        label: "Cottage",
        count: 102,
      },
    ],

    locations: [
      {
        label: "North Goa",
        count: 102,
      },
      {
        label: "Calangute",
        count: 102,
      },
      {
        label: "Baga",
        count: 102,
      },
      {
        label: "Anjuna",
        count: 102,
      },
      {
        label: "Panjim",
        count: 102,
      },
    ],
  };

  return (
    <div className="w-full bg-white  border border-gray-200 p-4 shadow-sm h-fit">
      {/* MAP */}
      <div className="mb-5  overflow-hidden border border-gray-200">
        <img
          src="/images/filterMap.png"
          alt="map"
          className="w-full h-[150px] object-cover"
        />
      </div>

      {/* SEARCH */}
      <Input
        placeholder="Search hotels..."
        className="!mb-6 !rounded-lg"
        value={filters.search || ""}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            search: e.target.value,
          }))
        }
      />

      {/* SUGGESTED */}
      <h3 className="font-semibold text-[15px] text-gray-900 mb-3">
        Suggested For You
      </h3>

      {renderOptions("suggested", data.suggested)}

      {/* PRICE */}
      <h3 className="font-semibold text-[15px] text-gray-900 mb-3 mt-5">
        Price per night
      </h3>

      {renderOptions("priceRange", data.priceRange, true)}

      {/* BUDGET */}
      <h3 className="font-semibold text-[15px] text-gray-900 mb-3 mt-5">
        Your Budget
      </h3>

      <div className="flex gap-2 mb-5">
        <Input
          placeholder="Min"
          className="!rounded-lg"
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              min: Number(e.target.value),
            }))
          }
        />

        <Input
          placeholder="Max"
          className="!rounded-lg"
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              max: Number(e.target.value),
            }))
          }
        />
      </div>

      {/* STAR */}
      <h3 className="font-semibold text-[15px] text-gray-900 mb-3">
        Star Category
      </h3>

      {renderOptions("starCategory", data.starCategory)}

      {/* RATING */}
      <h3 className="font-semibold text-[15px] text-gray-900 mb-3 mt-5">
        User Rating
      </h3>

      {renderOptions("rating", data.rating)}

      {/* PROPERTY */}
      <h3 className="font-semibold text-[15px] text-gray-900 mb-3 mt-5">
        Property Type
      </h3>

      {renderOptions("propertyType", data.propertyType)}

      {/* LOCATION */}
      <h3 className="font-semibold text-[15px] text-gray-900 mb-3 mt-5">
        Top Locations
      </h3>

      {renderOptions("locations", data.locations)}
    </div>
  );
}
