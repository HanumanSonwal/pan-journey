"use client";

import { Tooltip } from "antd";
import Image from "next/image";

export default function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="flex justify-center gap-10 -mt-19 mb-5 pb-3">
      {tabs.map((tab) => {
        const isDisabled = !tab.enabled;
        const isActive = activeTab === tab.key;

        const tabButton = (
          <button
            key={tab.key}
            onClick={() => {
              if (isDisabled) return;
              setActiveTab(tab.key);
            }}
            className={`
              w-20 h-20 flex flex-col items-center justify-center 
              rounded-xl shadow-xl transition-all duration-300
              
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
              width={50}
              height={50}
              className={`mb-1 ${
                activeTab === tab.key ? "brightness-0 invert" : ""
              }`}
            />
          </button>
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
