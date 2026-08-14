"use client";

import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { memo, useMemo, useState } from "react";

function SortBar({ sort, setSort }) {
  const [mobileSortOpen, setMobileSortOpen] = useState(false);

  const tabs = useMemo(
    () => [
      {
        label: "User Rating",
        sub: "(Highest First)",
        value: "ratingHigh",
        icon: <StarOutlined />,
      },
      {
        label: "User Rating",
        sub: "(Lowest First)",
        value: "ratingLow",
        icon: <StarOutlined />,
      },
      {
        label: "Price",
        sub: "(Highest First)",
        value: "priceHigh",
        icon: <ArrowDownOutlined />,
      },
      {
        label: "Price",
        sub: "(Lowest First)",
        value: "priceLow",
        icon: <ArrowUpOutlined />,
      },
    ],
    [],
  );

  const handleSortChange = (value) => {
    // same filter click => remove filter
    if (sort === value) {
      setSort(null);
      return;
    }

    // different filter => apply new filter
    setSort(value);
  };

  return (
    <div className="sticky top-[98px] z-[99] overflow-visible border border-gray-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
      {/* 650px - 850px */}
      <div className="relative hidden min-[650px]:max-[850px]:block">
        <button
          type="button"
          onClick={() => setMobileSortOpen((prev) => !prev)}
          className="flex h-[58px] w-full items-center justify-center gap-2 bg-white px-4 text-[15px] font-medium !text-gray-700"
        >
          Sort By
          {mobileSortOpen ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        </button>

        {mobileSortOpen && (
          <div className="absolute top-full left-0 !z-[999] w-full border border-gray-200 bg-white shadow-lg">
            {tabs.map((tab, index) => {
              const active = sort === tab.value;

              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => {
                    handleSortChange(tab.value);
                    setMobileSortOpen(false);
                  }}
                  className={`flex h-[58px] w-full items-center justify-center gap-2 border-b border-gray-300 transition-all ${
                    active ? "" : "bg-white hover:bg-gray-50"
                  } ${index === tabs.length - 1 ? "border-b-0" : ""}`}
                >
                  <span
                    className={`text-[13px] ${
                      active ? "text-[#4aa3df]" : "text-gray-400"
                    }`}
                  >
                    {tab.icon}
                  </span>

                  <div className="flex items-center gap-1">
                    <span
                      className={`text-[14px] font-medium ${
                        active ? "text-[#4aa3df]" : "text-gray-800"
                      }`}
                    >
                      {tab.label}
                    </span>

                    <span className="text-[13px] text-gray-500">{tab.sub}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Desktop */}
      <div className="flex items-stretch min-[650px]:max-[850px]:hidden">
        <div className="flex min-w-28 items-center justify-center border-r border-gray-200 px-4">
          <span className="text-[15px] font-medium !text-gray-800">
            Sort By:
          </span>
        </div>

        <div className="flex flex-1">
          {tabs.map((tab, index) => {
            const active = sort === tab.value;

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => handleSortChange(tab.value)}
                className={`flex h-[43px] flex-1 items-center justify-center gap-2 border-r border-gray-300 transition-all ${
                  active ? "!background-color-bg" : "bg-white hover:bg-gray-50"
                } ${index === tabs.length - 1 ? "!border-r-0" : ""}`}
              >
                <span
                  className={`text-[13px] ${
                    active ? "most-text-color" : "text-gray-400"
                  }`}
                >
                  {tab.icon}
                </span>

                <div className="flex items-center gap-1">
                  <span
                    className={`text-[14px] font-medium ${
                      active ? "most-text-color" : "text-gray-800"
                    }`}
                  >
                    {tab.label}
                  </span>

                  <span className="text-[13px] text-gray-500">{tab.sub}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default memo(SortBar);
