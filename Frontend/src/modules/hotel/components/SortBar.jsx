"use client";

import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  FireOutlined,
  StarOutlined,
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
    <div className="bg-white border border-gray-200 overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
      <div className="flex items-stretch">
        {/* SORT LABEL */}
        <div className="min-w-27.5 border-r border-gray-200 flex items-center justify-center px-4">
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
                className={`
                  flex-1 h-[58px]
                  flex items-center justify-center gap-2
                  transition-all duration-200
                  border-r border-gray-300

                  ${active ? "bg-[#edf7ff]" : "bg-white hover:bg-gray-50"}

                  ${index === tabs.length - 1 ? "!border-r-0" : ""}
                `}
              >
                {/* ICON */}
                <span
                  className={`
                    text-[13px]
                    ${active ? "text-[#4aa3df]" : "text-gray-400"}
                  `}
                >
                  {tab.icon}
                </span>

                {/* TEXT */}
                <div className="flex items-center gap-1 flex-wrap justify-center">
                  <span
                    className={`
                      text-[14px] font-medium
                      ${active ? "text-[#4aa3df]" : "text-gray-800"}
                    `}
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
