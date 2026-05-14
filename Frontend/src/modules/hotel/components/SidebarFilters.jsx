"use client";

import { Checkbox, Collapse, Input } from "antd";
import { useState } from "react";
export default function SidebarFilters({ filters, setFilters }) {
  const [hotelSearch, setHotelSearch] = useState("");
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

  const handlePriceRange = (min, max) => {
    setFilters((prev) => ({
      ...prev,
      priceMin: min,
      priceMax: max,
    }));
  };

  const filterSections = [
    {
      key: "suggested",
      title: "Suggested For You",
      content: (
        <div className="flex flex-col gap-2">
          {[
            "5 Star",
            "Breakfast Included",
            "Couple Friendly",
            "Free Cancellation",
          ].map((option) => (
            <Checkbox
              key={option}
              checked={filters.suggested?.includes(option) || false}
              onChange={() => handleCheckbox("suggested", option)}
            >
              {option}
            </Checkbox>
          ))}
        </div>
      ),
    },

    {
      key: "price",
      title: "Price Per Night",
      content: (
        <>
          <div className="flex flex-col gap-2">
            {[
              {
                label: "₹ 0 - ₹ 3000",
                min: 0,
                max: 3000,
              },
              {
                label: "₹ 3000 - ₹ 6000",
                min: 3000,
                max: 6000,
              },
              {
                label: "₹ 6000 - ₹ 10000",
                min: 6000,
                max: 10000,
              },
              {
                label: "₹ 10000+",
                min: 10000,
                max: 50000,
              },
            ].map((item) => (
              <Checkbox
                key={item.label}
                checked={
                  filters.priceMin === item.min && filters.priceMax === item.max
                }
                onChange={() => handlePriceRange(item.min, item.max)}
              >
                {item.label}
              </Checkbox>
            ))}
          </div>

          {/* CUSTOM */}
          <div className="mt-4">
            <p className="mb-2 text-xs font-medium text-gray-500">
              Custom Range
            </p>

            <div className="flex gap-2">
              <Input
                placeholder="Min"
                value={filters.priceMin}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,

                    priceMin: Number(e.target.value) || 0,
                  }))
                }
              />

              <Input
                placeholder="Max"
                value={filters.priceMax}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,

                    priceMax: Number(e.target.value) || 0,
                  }))
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
        <div className="flex flex-col gap-2">
          {["Hotel", "Villa", "Resort", "Apartment", "Homestay"].map(
            (option) => (
              <Checkbox
                key={option}
                checked={filters.propertyType?.includes(option) || false}
                onChange={() => handleCheckbox("propertyType", option)}
              >
                {option}
              </Checkbox>
            ),
          )}
        </div>
      ),
    },

    {
      key: "starCategory",
      title: "Star Category",
      content: (
        <div className="flex flex-col gap-2">
          {["3 Star", "4 Star", "5 Star"].map((option) => (
            <Checkbox
              key={option}
              checked={filters.starCategory?.includes(option) || false}
              onChange={() => handleCheckbox("starCategory", option)}
            >
              {option}
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
          {["Excellent: 4.2+", "Very Good: 4+", "Good: 3.5+"].map((option) => (
            <Checkbox
              key={option}
              checked={filters.rating?.includes(option) || false}
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
          {["North Goa", "Calangute", "Baga", "Candolim", "Anjuna"].map(
            (option) => (
              <Checkbox
                key={option}
                checked={filters.locations?.includes(option) || false}
                onChange={() => handleCheckbox("locations", option)}
              >
                {option}
              </Checkbox>
            ),
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-4 shadow-md">
      <div className="mb-5 overflow-hidden border border-gray-200">
        <img
          src="/images/filterMap.png"
          alt="map"
          className="h-[150px] w-full object-cover"
        />
      </div>
      {/* 🔍 SEARCH */}
      <div className="mb-2">
        <Input
          allowClear
          placeholder="Search Hotel Name"
          value={hotelSearch}
          className="[&_.ant-input]:!border-0 [&_.ant-input]:!shadow-none [&_.ant-input]:focus:!shadow-none"
          onChange={(e) => {
            const value = e.target.value;
            setHotelSearch(value);
            setFilters((prev) => ({
              ...prev,
              search: value,
            }));
          }}
        />
      </div>

      <Collapse
        defaultActiveKey={[
          "suggested",
          "price",
          "propertyType",
          "starCategory",
          "rating",
        ]}
        ghost
        expandIconPlacement="end"
        items={filterSections.map((section) => ({
          key: section.key,
          label: (
            <span className="text-sm font-semibold text-gray-800">
              {section.title}
            </span>
          ),
          children: section.content,
        }))}
      />
    </div>
  );
}
