"use client";

export default function ButtonTab({ tabs = [], activeTab, setActiveTab }) {
  return (
    <div className="flex justify-center gap-8 mt-[-19px]">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`relative pb-2 text-lg font-medium transition-all duration-200 ${
            activeTab === tab.key
              ? "!text-[#72C0F0]"
              : "text-gray-500 hover:text-[#72C0F0]"
          }`}
        >
          {tab.label}

          {activeTab === tab.key && (
            <span className="absolute left-0 bottom-0 w-full h-[5px] bg-[#72C0F0] rounded"></span>
          )}
        </button>
      ))}
    </div>
  );
}


