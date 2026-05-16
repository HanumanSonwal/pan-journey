"use client";

export default function ButtonTab({ tabs = [], activeTab, setActiveTab }) {
  return (
    <div className="scrollbar-hide w-full overflow-x-auto border-0 border-b-0">
      <div className="flex min-w-max justify-start gap-4 sm:justify-center sm:gap-6 md:gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative border-0 border-b-0 bg-transparent pb-2 text-sm text-[20px]! font-medium whitespace-nowrap shadow-none transition-all duration-200 outline-none focus:ring-0 focus:outline-none sm:text-base md:text-lg ${activeTab === tab.key
                ? "!text-[#72C0F0]"
                : "!hover:text-[#72C0F0] !text-gray-500"
              } `}
          >
            {tab.label}

            {/* ONLY active underline */}
            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#72C0F0] sm:h-[2px]"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
