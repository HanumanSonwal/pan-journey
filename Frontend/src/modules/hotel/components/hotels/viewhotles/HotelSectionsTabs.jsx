"use client";

const tabs = [
  "Room Options",
  "Amenities",
  "Food & Dining",
  "Location",
  "Guest Reviews",
  "Property Policies",
  "Similar Properties",
];

const HotelSectionsTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b bg-[#f7f7f7] px-4">
      <div className="flex gap-6 overflow-x-auto justify-evenly">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-4 whitespace-nowrap text-sm font-medium border-b-2
              ${
                activeTab === tab
                  ? "!text-[#2a85c8] border-[#2a85c8]"
                  : "!text-gray-700 border-transparent"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HotelSectionsTabs;