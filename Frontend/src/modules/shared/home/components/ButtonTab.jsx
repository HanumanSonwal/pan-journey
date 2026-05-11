"use client";

export default function ButtonTab({ tabs = [], activeTab, setActiveTab }) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide border-0 border-b-0">

      <div className="
        flex 
        justify-start sm:justify-center 
        gap-4 sm:gap-6 md:gap-8 
        min-w-max
      ">

        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              relative pb-2
              
              border-0 border-b-0 outline-none focus:outline-none focus:ring-0
              bg-transparent shadow-none
              
              text-sm sm:text-base md:text-lg 
              font-medium whitespace-nowrap
              transition-all duration-200
              
              ${activeTab === tab.key
                ? "!text-[#72C0F0]"
                : "!text-gray-500 !hover:text-[#72C0F0]"
              }
            `}
          >
            {tab.label}

            {/* ONLY active underline */}
            {activeTab === tab.key && (
              <span className="
                absolute left-0 bottom-0 
                w-full 
                h-[3px] sm:h-[4px] 
                bg-[#72C0F0] 
                rounded-full
              "></span>
            )}
          </button>
        ))}

      </div>
    </div>
  );
}


