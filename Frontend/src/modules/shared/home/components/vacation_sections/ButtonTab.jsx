"use client";

export default function ButtonTab({ tabs = [], activeTab, setActiveTab }) {
  return (
    <div className="scrollbar-hide w-full overflow-x-auto border-0 border-b-0">
      <div className="flex min-w-max justify-start gap-4 sm:justify-center sm:gap-6 md:gap-8 ">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative border-0 border-b-0 bg-transparent pb-4 
            !text-[15px] sm:!text-[21px] md:!text-[18px] lg:!text-[21px]
            font-medium whitespace-nowrap shadow-none transition-all duration-200 outline-none focus:ring-0 focus:outline-none
            ${activeTab === tab.key
                ? "teb-text-color"
                : "!hover:text-teb-text-color font-medium !text-gray-900"
              }`}
          >
            {tab.label}

            {/* ONLY active underline */}
            {activeTab === tab.key && (
              <span className="absolute bottom-1 left-0 !h-[4px] w-full rounded-full teb-bg-color sm:h-[2px]  shadow-[0_4px_6px_var(--teb-shadow)]"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
