"use client";

import { Checkbox, Input } from "antd";
import { useState } from "react";

export default function SidebarFilters({ filters, setFilters }) {
  const [searchText, setSearchText] = useState("");

  const [showMore, setShowMore] = useState({
    suggested: false,
    propertyType: false,
  });

  const toggleShowMore = (key) => {
    setShowMore((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // ✅ CHECKBOX HANDLER (ALL FILTERS CONNECTED)
  const handleCheckbox = (key, value) => {
    const current = filters[key] || [];

    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    setFilters({
      ...filters,
      [key]: updated,
    });
  };

  // 💰 PRICE RANGE CONNECTED TO HOTEL LIST (IMPORTANT FIX)
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

    setFilters({
      ...filters,
      min,
      max,
    });
  };

  // 🔥 FILTER + SEARCH + SHOW MORE LOGIC
  const renderOptions = (key, items, isPrice = false) => {
    const filtered = items.filter((item) =>
      item.label.toLowerCase().includes(searchText.toLowerCase())
    );

    const visibleItems = showMore[key]
      ? filtered
      : filtered.slice(0, 4);

    return (
      <>
        {visibleItems.map((item) => (
          <div key={item.label} className="flex items-center w-full">

            <Checkbox
              onChange={() =>
                isPrice
                  ? handlePrice(item.label)
                  : handleCheckbox(key, item.label)
              }
              className="flex-1"
            >
              <span className="text-black">{item.label}</span>
            </Checkbox>

            <span className="text-gray-400 text-xs w-[40px] text-right">
              ({item.count})
            </span>
          </div>
        ))}

        {/* SHOW MORE */}
        {filtered.length > 4 && (
          <button
            onClick={() => toggleShowMore(key)}
            className="!text-blue-500 text-sm text-left mt-1 hover:underline !mb-4"
          >
            {showMore[key]
              ? "Show less"
              : `Show ${filtered.length - 4} more`}
          </button>
        )}
      </>
    );
  };

  // 📦 YOUR ORIGINAL DATA (UNCHANGED)
  const data = {
    suggested: [
      { label: "Last Minute Deals", count: 102 },
      { label: "5 Star", count: 102 },
      { label: "North Goa", count: 102 },
      { label: "Resorts", count: 102 },
      { label: "Beachfront Properties", count: 102 },
      { label: "Luxury", count: 102 },
      { label: "Budget Hotels", count: 102 },
      { label: "Couple Friendly", count: 102 },
    ],

    priceRange: [
      { label: "₹ 0 - ₹ 3000", count: 102 },
      { label: "₹ 3000 - ₹ 6000", count: 102 },
      { label: "₹ 6000 - ₹ 10000", count: 102 },
      { label: "₹ 10000+", count: 102 },
    ],

    starCategory: [
      { label: "3 Star", count: 102 },
      { label: "4 Star", count: 102 },
      { label: "5 Star", count: 102 },
    ],

    rating: [
      { label: "Excellent: 4.2+", count: 102 },
      { label: "Very Good: 4+", count: 102 },
      { label: "Good: 3.5+", count: 102 },
    ],

    propertyType: [
      { label: "Apartment", count: 102 },
      { label: "Villa", count: 102 },
      { label: "Hotel", count: 102 },
      { label: "Homestay", count: 102 },
      { label: "Resort", count: 102 },
      { label: "Hostel", count: 102 },
      { label: "Guest House", count: 102 },
      { label: "Cottage", count: 102 },
    ],

    locations: [
      { label: "North Goa", count: 102 },
      { label: "Calangute", count: 102 },
      { label: "Baga", count: 102 },
      { label: "Anjuna", count: 102 },
      { label: "Panjim", count: 102 },
    ],
  };

  return (
    <div className="w-72 bg-white p-4 shadow h-fit">

      {/* MAP */}
      <div className="mb-4 rounded-lg overflow-hidden">
        <img
          src="https://source.unsplash.com/300x150/?map"
          alt="map"
          className="w-full h-[150px] object-cover"
        />
      </div>

      {/* SEARCH */}
      <Input
        placeholder="Search filters..."
        className="!mb-6"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* ALL SECTIONS (UNCHANGED UI) */}
      <h3 className="font-semibold text-black mb-2">
        Suggested For You
      </h3>
      {renderOptions("suggested", data.suggested)}

      <h3 className="font-semibold text-black mb-2 mt-4">
        Price per night
      </h3>
      {renderOptions("priceRange", data.priceRange, true)}

      <h3 className="font-semibold text-black mb-2 mt-4">
        Your Budget
      </h3>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Min"
          onChange={(e) =>
            setFilters({ ...filters, min: Number(e.target.value) })
          }
        />
        <Input
          placeholder="Max"
          onChange={(e) =>
            setFilters({ ...filters, max: Number(e.target.value) })
          }
        />
      </div>

      <h3 className="font-semibold text-black mb-2">
        Star Category
      </h3>
      {renderOptions("starCategory", data.starCategory)}

      <h3 className="font-semibold text-black mb-2 mt-4">
        User Rating
      </h3>
      {renderOptions("rating", data.rating)}

      <h3 className="font-semibold text-black mb-2 mt-4">
        Property Type
      </h3>
      {renderOptions("propertyType", data.propertyType)}

      <h3 className="font-semibold text-black mb-2 mt-4">
        Top locations
      </h3>
      {renderOptions("location", data.locations)}

    </div>
  );
}