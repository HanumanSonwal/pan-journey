"use client";

import { useEffect, useRef, useState } from "react";

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
  const [currentTab, setCurrentTab] = useState(activeTab);

  const ref = useRef(null);
  const [isFixed, setIsFixed] = useState(false);
  const [height, setHeight] = useState(0);
  const [offsetTop, setOffsetTop] = useState(0);

  const ignoreScroll = useRef(false);

  // measure position
  useEffect(() => {
    const update = () => {
      if (ref.current) {
        setHeight(ref.current.offsetHeight);
        setOffsetTop(ref.current.offsetTop);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // sticky logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= offsetTop) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offsetTop]);

  // scroll spy
  useEffect(() => {
    const handleScrollSpy = () => {
      if (ignoreScroll.current) return;

      let active = currentTab;

      for (const tab of tabs) {
        const el = document.getElementById(sectionIds[tab]);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        if (rect.top <= 150 && rect.bottom >= 150) {
          active = tab;
          break;
        }
      }

      if (active !== currentTab) {
        setCurrentTab(active);
        if (setActiveTab) setActiveTab(active);
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [currentTab, setActiveTab]);

  const handleScrollTo = (tab) => {
    setCurrentTab(tab);
    if (setActiveTab) setActiveTab(tab);

    const el = document.getElementById(sectionIds[tab]);

    if (el) {
      ignoreScroll.current = true;

      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setTimeout(() => {
        ignoreScroll.current = false;
      }, 800);
    }
  };

  return (
    <>
      {/* prevent layout jump */}
      {isFixed && <div style={{ height }} />}

      <div
        ref={ref}
        className={`z-[8] w-full border border-gray-200 bg-white text-[#0ea5e9] shadow-[0_8px_20px_rgba(14,165,233,0.25)] ${isFixed
          ? "fixed top-[50px] sm:top-[60px] md:top-[100px] lg:top-[100px] xl:top-[100px] left-0 w-full"
          : "relative"
          }`}
      >
        <div className="scrollbar-hide flex overflow-x-auto">
          {tabs.map((tab) => {
            const active = currentTab === tab;

            return (
              <button
                key={tab}
                onClick={() => handleScrollTo(tab)}
                className={`font-roboto relative min-w-max flex-1 px-6 py-5 text-[15px] font-bold whitespace-nowrap transition ${active
                  ? "text-[#0ea5e9]"
                  : "text-gray-600 hover:text-[#0ea5e9]"
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
    </>
  );
};

export default HotelSectionsTabs;
