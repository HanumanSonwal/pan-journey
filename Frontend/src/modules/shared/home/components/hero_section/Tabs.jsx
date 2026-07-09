"use client";

import { Tooltip } from "antd";
import Image from "next/image";

export default function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="flex justify-center gap-3 -mt-12 mb-4 pb-2 sm:gap-4 sm:-mt-14 md:gap-10 md:-mt-19 md:mb-5 md:pb-3">
      {tabs.map((tab) => {
        const isDisabled = !tab.enabled;
        const isActive = activeTab === tab.key;

      const tabButton = (
  <div key={tab.key} className="flex flex-col items-center">
    <button
      onClick={() => {
        if (isDisabled) return;
        setActiveTab(tab.key);
      }}
      className={`
        flex items-center justify-center
        rounded-xl shadow-xl transition-all duration-300

        w-14 h-14
        sm:w-16 sm:h-16
        md:w-20 md:h-20

        ${
          isActive
            ? "bg-linear-to-b from-[#6FAED0] to-[#1F6F78] text-white scale-105"
            : "bg-gray-100 text-gray-400"
        }

        ${
          isDisabled
            ? "cursor-not-allowed"
            : "cursor-pointer hover:scale-105 hover:shadow-2xl"
        }
      `}
    >
      <Image
        src={tab.icon}
        alt={tab.label}
        width={40}
        height={40}
        className={`
          w-8 h-8
          sm:w-9 sm:h-9
          md:w-12 md:h-12
          ${isActive ? "brightness-0 invert" : ""}
        `}
      />
    </button>

    {/* Mobile Only Text (Outside Box) */}
    <span
      className={`mt-2 text-[11px] font-semibold md:hidden ${
        isActive ? "text-[#1F6F78]" : "text-gray-600"
      }`}
    >
      {tab.key === "hotel"
        ? "Hotel"
        : tab.key === "flight"
        ? "Flight"
        : "Bus"}
    </span>
  </div>

          
        );

        return isDisabled ? (
          <Tooltip
            key={tab.key}
            title={<span className="text-xs">Coming Soon 🚀</span>}
          >
            <div>{tabButton}</div>
          </Tooltip>
        ) : (
          tabButton
        );
      })}
    </div>
  );
}
