"use client";

const tabs = [
  "Rooms",
  "Amenities",
  "Policies",
  "Fees & Rules",
  "Location",
  "About Hotel",
];

const sectionIds = {
  Rooms: "rooms-section",
  Amenities: "amenities-section",
  Policies: "policies-section",
  "Fees & Rules": "fees-section",
  Location: "location-section",
  "About Hotel": "about-section",
};

const HotelSectionsTabs = ({ activeTab = "Rooms", setActiveTab }) => {
  const currentTab = activeTab || "Rooms";

  const handleScroll = (tab) => {
    setActiveTab(tab);

    const id = sectionIds[tab];

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="sticky top-[72px] z-30 overflow-hidden rounded border border-gray-200 bg-white text-[#0ea5e9] shadow-sm">
      <div className="scrollbar-hide flex overflow-x-auto">
        {tabs.map((tab) => {
          const active = currentTab === tab;

          return (
            <button
              key={tab}
              onClick={() => handleScroll(tab)}
              className={`relative min-w-max flex-1 px-5 py-4 text-sm font-medium whitespace-nowrap transition duration-300 md:min-w-[160px] ${
                active ? "text-[#0ea5e9]" : "text-gray-600 hover:text-[#0ea5e9]"
              }`}
            >
              {tab}

              {active && (
                <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#0ea5e9]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HotelSectionsTabs;
