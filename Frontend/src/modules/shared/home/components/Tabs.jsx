import Image from "next/image";

export default function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="flex justify-center gap-15 -mt-19 mb-0 pb-6">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`w-20 h-20 flex items-center justify-center rounded-xl shadow-lg transition ${
            activeTab === tab.key
              ? "bg-gradient-to-b from-[#6FAED0] to-[#1F6F78] text-white scale-105"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          <Image
            src={tab.icon}
            alt={tab.label}
            width={28}
            height={28}
            className={`mb-1 ${
              activeTab === tab.key ? "brightness-0 invert" : ""
            }`}
          />
        </button>
      ))}
    </div>
  );
}
