export default function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="flex justify-center gap-6 -mt-16 mb-6 pb-6">
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
          {tab.icon}
        </button>
      ))}
    </div>
  );
}
