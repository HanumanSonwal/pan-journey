"use client";

import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  StarOutlined,
  FireOutlined,
} from "@ant-design/icons";

export default function SortBar({ sort, setSort }) {
  const tabs = [
    {
      label: "Popular",
      value: "popular",
      icon: <FireOutlined />,
    },
    {
      label: "User Rating",
      sub: "(Highest First)",
      value: "ratingHigh",
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
  ];

  return (
    <div className="bg-white  shadow p-3 sm:p-4 mb-4 !pt-4 !pb-4">

      {/* HEADER */}
      <div className="flex items-center flex-wrap gap-2">

        <span className="text-xs sm:text-sm font-medium text-gray-600">
          Sort By:
        </span>

        {/* OPTIONS */}
        <div className="flex flex-wrap items-center">

          {tabs.map((tab, index) => (
            <div key={tab.value} className="flex items-center">

              <button
                onClick={() => setSort(tab.value)}
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 text-xs sm:text-sm

                ${
                  sort === tab.value
                    ? "!text-black font-semibold"
                    : "!text-black"
                }
                `}
              >
                <span className="text-[11px]">{tab.icon}</span>

                {/* TEXT */}
                <span>
                  {tab.label}{" "}
                  {tab.sub && (
                    <span className="text-gray-400 text-[10px] sm:text-xs">
                      {tab.sub}
                    </span>
                  )}
                </span>
              </button>

              {/* 🔥 DIVIDER LINE */}
              {index !== tabs.length - 1 && (
                <div className="h-4 sm:h-5 w-[1px] bg-gray-300 mx-1 sm:mx-2"></div>
              )}
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}