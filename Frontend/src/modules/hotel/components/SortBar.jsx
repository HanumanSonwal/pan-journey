"use client";

import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  StarOutlined,
} from "@ant-design/icons";

import { memo, useMemo } from "react";

function SortBar({ sort, setSort }) {
  // SORT TABS
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

  return (
    <div className="overflow-hidden border border-gray-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
      <div className="flex items-stretch">
        {/* LABEL */}
        <div className="flex min-w-27.5 items-center justify-center border-r border-gray-200 px-4">
          <span className="text-[15px] font-medium text-gray-700">
            Sort By:
          </span>
        </div>

        {/* TABS */}
        <div className="flex flex-1">
          {tabs.map((tab, index) => {
            const active = sort === tab.value;

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setSort(tab.value)}
                className={`flex h-[58px] flex-1 items-center justify-center gap-2 border-r border-gray-300 transition-all duration-200 ${
                  active ? "bg-[#edf7ff]" : "bg-white hover:bg-gray-50"
                } ${index === tabs.length - 1 ? "!border-r-0" : ""} `}
              >
                {/* ICON */}
                <span
                  className={`text-[13px] ${
                    active ? "text-[#4aa3df]" : "text-gray-400"
                  } `}
                >
                  {tab.icon}
                </span>

                {/* TEXT */}
                <div className="flex flex-wrap items-center justify-center gap-1">
                  <span
                    className={`text-[14px] font-medium ${
                      active ? "text-[#4aa3df]" : "text-gray-800"
                    } `}
                  >
                    {tab.label}
                  </span>

                  {tab.sub && (
                    <span className="text-[13px] text-gray-500">{tab.sub}</span>
                  )}
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
