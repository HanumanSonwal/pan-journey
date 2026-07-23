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
              type="button"
              onClick={() => {
                if (isDisabled) return;
                setActiveTab(tab.key);
              }}
              className={`
                flex items-center justify-center
                rounded-xl
                transition-all duration-300

                w-14 h-14
                sm:w-16 sm:h-16
                md:w-17 md:h-17

                ${isActive
                  ? "!bg-[#051449] shadow-lg shadow-[#051449]/30 scale-105"
                  : "!bg-white shadow-md shadow-gray-300"
                }

                ${isDisabled
                  ? "cursor-not-allowed "
                  : "cursor-pointer hover:scale-105 hover:shadow-lg"
                }
              `}
            >
              <Image
                src={tab.icon}
                alt={tab.label}
                width={40}
                height={40}
                className="
                  w-8 h-8
                  sm:w-9 sm:h-9
                  md:w-10 md:h-10
                "
                style={{
                  filter: isActive
                    ? "brightness(0) invert(1)"
                    : "brightness(0) saturate(100%) invert(10%) sepia(80%) saturate(3000%) hue-rotate(210deg) brightness(80%)",
                }}
              />
            </button>

            {/* Mobile Text */}
            <span
              className={`
                mt-2 text-[11px] font-semibold md:hidden
                ${isActive
                  ? "text-[#051449]"
                  : "text-gray-600"
                }
              `}
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
