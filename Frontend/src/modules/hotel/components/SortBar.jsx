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
    if (sort === value) {
      setSort(null);
      return;
    }

    setSort(value);
  };

  return (
    <div className="sticky top-[98px] z-[999] w-full overflow-hidden rounded-[6px] bg-white px-[5px] py-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.18)]">
      <div className="relative hidden min-[650px]:max-[850px]:block">
        <button
          type="button"
          onClick={() => setMobileSortOpen((prev) => !prev)}
          className="flex h-[38px] w-full items-center justify-center gap-2 rounded-[5px] bg-white px-4 text-[14px] font-medium !text-gray-700"
        >
          Sort By
          {mobileSortOpen ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        </button>

        {mobileSortOpen && (
          <div className="absolute top-full left-0 z-[9999] mt-[4px] w-full overflow-hidden rounded-[6px] border border-gray-200 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.15)]">
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
                  className={`flex h-[48px] w-full items-center justify-center gap-2 border-b border-gray-200 transition-all ${
                    active ? "bg-[#fff8ed]" : "bg-white hover:bg-gray-50"
                  } ${index === tabs.length - 1 ? "border-b-0" : ""}`}
                >
                  <span
                    className={`flex items-center text-[13px] ${
                      tab.value.includes("rating")
                        ? "text-[#f5b400]"
                        : "text-[#344054]"
                    }`}
                  >
                    {tab.icon}
                  </span>

                  <div className="flex items-center gap-1">
                    <span
                      className={`text-[14px] font-medium ${
                        active ? "text-[#e98b00]" : "text-gray-800"
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

      <div className="hidden min-h-[37px] w-full min-w-0 items-center gap-[8px] px-[10px] min-[650px]:flex min-[650px]:max-[850px]:hidden">
        <div className="flex shrink-0 items-center">
          <span className="text-[14px] font-semibold whitespace-nowrap !text-[#344054]">
            Sort By:
          </span>
        </div>

        <div className="ml-auto flex min-w-0 items-center justify-end gap-[8px]">
          {tabs.map((tab) => {
            const active = sort === tab.value;
            const isRating = tab.value.includes("rating");

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => handleSortChange(tab.value)}
                className={`flex h-[34px] shrink-0 items-center justify-center gap-[4px] rounded-full border px-[12px] whitespace-nowrap transition-all duration-200 focus:outline-none max-[1100px]:h-[32px] max-[1100px]:gap-[3px] max-[1100px]:px-[8px] ${
                  active
                    ? "border-[#e98b00] bg-[#fffaf2]"
                    : "border-[#dce3eb] bg-[E2E8F0] hover:border-[#c7d0da] hover:bg-[#f9fafb]"
                }`}
              >
                <span
                  className={`flex items-center justify-center text-[13px] max-[1100px]:text-[12px] ${
                    isRating ? "text-[#f5b400]" : "text-[#344054]"
                  }`}
                >
                  {tab.icon}
                </span>

                <span
                  className={`text-[13px] font-medium max-[1100px]:text-[12px] ${
                    active ? "text-[#e98b00]" : "text-[#344054]"
                  }`}
                >
                  {tab.label}
                </span>

                <span
                  className={`text-[13px] max-[1100px]:text-[12px] ${
                    active ? "text-[#e98b00]" : "text-[#8a98aa]"
                  }`}
                >
                  {tab.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default memo(SortBar);
