"use client";

import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { memo, useMemo } from "react";


function MobileSortBar({ sort, setSort }) {
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
    []
  );

  return (
    <div
      className="
        absolute
        top-full
        mt-1
        !left-[-10px]
        z-[999]
        w-[320px]
     
        border
        border-gray-200
        bg-white
        shadow-2xl
        overflow-hidden
      "
    >
      {tabs.map((tab, index) => {
        const active = sort === tab.value;

        return (
          <button
            key={tab.value}
            onClick={() => setSort(tab.value)}
            className={`flex h-[56px] w-full items-center justify-center gap-2 border-b border-gray-300
              ${active
                ? "bg-[#edf7ff]"
                : "bg-white hover:bg-gray-50"
              }
              ${index === tabs.length - 1 ? "border-b-0" : ""}
            `}
          >
            <span
              className={
                active
                  ? "text-[#4aa3df]"
                  : "text-gray-400"
              }
            >
              {tab.icon}
            </span>

            <div className="flex flex-wrap items-center gap-1">
              <span
                className={
                  active
                    ? "text-[#4aa3df] font-medium"
                    : "text-gray-800 font-medium"
                }
              >
                {tab.label}
              </span>

              <span className="text-gray-500 text-sm">
                {tab.sub}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default memo(MobileSortBar);