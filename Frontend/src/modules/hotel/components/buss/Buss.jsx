"use client";

import Tabs from "@/modules/shared/home/components/hero_section/Tabs";
import {
  ArrowRightOutlined,
  BankOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  SearchOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { useState } from "react";

/* =========================================================
   SVG ICON HELPER
   ========================================================= */
const svgToDataUri = (svg) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

/* =========================================================
   TAB ICONS
   Inline SVG use kiye gaye hain, isliye external
   /icons/*.svg files ki zarurat nahi hai.
   ========================================================= */

const hotelIcon = svgToDataUri(`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    fill="none"
  >
    <path
      d="M12 56V13C12 10.8 13.8 9 16 9H48C50.2 9 52 10.8 52 13V56"
      stroke="black"
      stroke-width="5"
      stroke-linecap="round"
    />

    <path
      d="M8 56H56"
      stroke="black"
      stroke-width="5"
      stroke-linecap="round"
    />

    <path
      d="M21 18H27V25H21V18Z"
      fill="black"
    />

    <path
      d="M37 18H43V25H37V18Z"
      fill="black"
    />

    <path
      d="M21 31H27V38H21V31Z"
      fill="black"
    />

    <path
      d="M37 31H43V38H37V31Z"
      fill="black"
    />

    <path
      d="M26 56V45H38V56"
      stroke="black"
      stroke-width="5"
    />
  </svg>
`);

const flightIcon = svgToDataUri(`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    fill="black"
  >
    <path
      d="M59 7C57 5 53 5 50 8L36 22L14 13C12 12 10 12 8 14L6 16L26 29L17 38L9 35L6 38L18 46L26 58L29 55L26 47L35 38L48 58L50 56C52 54 52 52 51 50L42 28L56 14C59 11 61 9 59 7Z"
    />
  </svg>
`);

const busIcon = svgToDataUri(`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    fill="black"
  >
    <rect
      x="10"
      y="8"
      width="44"
      height="46"
      rx="7"
    />

    <rect
      x="16"
      y="14"
      width="32"
      height="16"
      rx="2"
      fill="white"
    />

    <rect
      x="17"
      y="34"
      width="9"
      height="7"
      rx="2"
      fill="white"
    />

    <rect
      x="38"
      y="34"
      width="9"
      height="7"
      rx="2"
      fill="white"
    />

    <circle
      cx="19"
      cy="52"
      r="4"
      fill="black"
    />

    <circle
      cx="45"
      cy="52"
      r="4"
      fill="black"
    />

    <path
      d="M10 29H54"
      stroke="white"
      stroke-width="3"
    />
  </svg>
`);

/* =========================================================
   COMPONENT
   ========================================================= */

export default function BusSearchHero() {
  const [activeTab, setActiveTab] = useState("bus");
  const [tripType, setTripType] = useState("oneway");

  /* =======================================================
     HOTEL / FLIGHT / BUS TABS

     IMPORTANT:
     icon ab actual data URI hai.
     Isliye existing Tabs component ka maskImage
     properly kaam karega.
     ======================================================= */

  const tabs = [
    {
      key: "hotel",
      enabled: true,
      icon: hotelIcon,
    },
    {
      key: "flight",
      enabled: true,
      icon: flightIcon,
    },
    {
      key: "bus",
      enabled: true,
      icon: busIcon,
    },
  ];

  const routes = [
    "Jaipur ⇄ Delhi",
    "Delhi ⇄ Manali",
    "Mumbai ⇄ Goa",
    "Bangalore ⇄ Hyderabad",
  ];

  return (
    <section className="relative w-full overflow-hidden">
      {/* =====================================================
          HERO IMAGE
      ====================================================== */}

      <div className="relative h-[430px] w-full">
        <img
          src="/images/Rectangle1996.jpg"
          alt="Bus travel"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Light overlay */}
        <div className="absolute inset-0 bg-black/[0.02]" />

        {/* =================================================
            EXISTING TABS COMPONENT
        ================================================== */}

        <div
          className="
            absolute
            left-1/2
            top-[326px]
            z-30
            w-full
            -translate-x-1/2
          "
        >
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* =================================================
            SEARCH CARD
        ================================================== */}

        <div
          className="
            absolute
            bottom-[-155px]
            left-1/2
            z-20
            w-[calc(100%-304px)]
            max-w-[1500px]
            -translate-x-1/2
            rounded-[14px]
            bg-white
            px-[30px]
            pb-[24px]
            pt-[66px]
            shadow-[0_7px_30px_rgba(0,0,0,0.10)]
          "
        >
          {/* ===============================================
              TRIP TYPE
          ================================================ */}

          <div className="mb-[16px] flex items-center gap-[20px]">
            {/* ONE WAY */}

            <button
              type="button"
              onClick={() => setTripType("oneway")}
              className={`
                flex
                items-center
                gap-[7px]
                border-b-[2px]
                pb-[6px]
                text-[15px]
                font-semibold
                transition
                ${
                  tripType === "oneway"
                    ? "border-[#c76516] text-[#c76516]"
                    : "border-transparent text-[#586783]"
                }
              `}
            >
              <span className="text-[15px]">▣</span>
              ONE-WAY / DAILY
            </button>

            {/* ROUND TRIP */}

            <button
              type="button"
              onClick={() => setTripType("roundtrip")}
              className={`
                flex
                items-center
                gap-[7px]
                border-b-[2px]
                pb-[6px]
                text-[15px]
                font-semibold
                transition
                ${
                  tripType === "roundtrip"
                    ? "border-[#c76516] text-[#c76516]"
                    : "border-transparent text-[#586783]"
                }
              `}
            >
              <SwapOutlined />
              ROUND TRIP
            </button>

            {/* BUS PASS */}

            <button
              type="button"
              onClick={() => setTripType("buspass")}
              className={`
                flex
                items-center
                gap-[7px]
                border-b-[2px]
                pb-[6px]
                text-[15px]
                font-semibold
                transition
                ${
                  tripType === "buspass"
                    ? "border-[#c76516] text-[#c76516]"
                    : "border-transparent text-[#586783]"
                }
              `}
            >
              <BankOutlined />
              BUS PASS
            </button>

            {/* DISCOUNT */}

            <span
              className="
                rounded-[5px]
                bg-[#fff0c9]
                px-[9px]
                py-[4px]
                text-[10px]
                font-bold
                text-[#c76516]
              "
            >
              SAVE 35%
            </span>
          </div>

          {/* ===============================================
              SEARCH ROW
          ================================================ */}

          <div className="flex w-full items-center gap-[20px]">
            {/* FROM CITY */}

            <div
              className="
                flex
                h-[82px]
                min-w-0
                flex-1
                items-center
                rounded-[13px]
                border
                border-[#dbe1eb]
                px-[18px]
                transition
                hover:border-[#c76516]
              "
            >
              <SearchOutlined className="mr-[18px] shrink-0 text-[27px] text-[#526487]" />

              <div className="min-w-0">
                <p className="mb-[3px] text-[12px] font-bold tracking-wide text-[#61708c]">
                  FROM CITY
                </p>

                <p className="truncate text-[23px] font-bold leading-[28px] text-[#172137]">
                  Jaipur, Sindhi Camp
                </p>
              </div>
            </div>

            {/* SWAP BUTTON */}

            <button
              type="button"
              className="
                flex
                h-[45px]
                w-[45px]
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[#dce2ec]
                bg-white
                text-[20px]
                text-[#1e3155]
                shadow-[0_2px_6px_rgba(0,0,0,0.06)]
                transition-all
                hover:border-[#c76516]
                hover:bg-[#fff8f1]
                hover:text-[#c76516]
              "
            >
              <SwapOutlined />
            </button>

            {/* TO DESTINATION */}

            <div
              className="
                flex
                h-[82px]
                min-w-0
                flex-[1.05]
                items-center
                rounded-[13px]
                border
                border-[#dbe1eb]
                px-[18px]
                transition
                hover:border-[#c76516]
              "
            >
              <EnvironmentOutlined className="mr-[18px] shrink-0 text-[27px] text-[#526487]" />

              <div className="min-w-0">
                <p className="mb-[3px] text-[12px] font-bold tracking-wide text-[#61708c]">
                  TO DESTINATION
                </p>

                <p className="truncate text-[23px] font-bold leading-[28px] text-[#172137]">
                  Delhi, Kashmiri Gate
                </p>
              </div>
            </div>

            {/* JOURNEY DATE */}

            <div
              className="
                flex
                h-[82px]
                w-[245px]
                shrink-0
                items-center
                rounded-[13px]
                border
                border-[#dbe1eb]
                px-[18px]
                transition
                hover:border-[#c76516]
              "
            >
              <CalendarOutlined className="mr-[17px] shrink-0 text-[27px] text-[#526487]" />

              <div>
                <p className="mb-[4px] text-[12px] font-bold tracking-wide text-[#61708c]">
                  JOURNEY DATE
                </p>

                <div className="flex items-center gap-[4px] whitespace-nowrap">
                  <span className="text-[17px] font-bold text-[#172137]">
                    28
                  </span>

                  <span className="text-[15px] font-semibold text-[#172137]">
                    Sep
                  </span>

                  <span className="text-[15px] font-semibold text-[#172137]">
                    2026
                  </span>

                  <span className="ml-[2px] text-[13px] font-bold text-[#c76516]">
                    Monday
                  </span>
                </div>
              </div>
            </div>

            {/* SEARCH BUTTON */}

            <button
              type="button"
              className="
                flex
                h-[76px]
                w-[238px]
                shrink-0
                items-center
                justify-center
                gap-[12px]
                rounded-[13px]
                bg-[#c76516]
                text-[20px]
                font-semibold
                text-white
                shadow-[0_7px_18px_rgba(199,101,22,0.24)]
                transition-all
                duration-300
                hover:bg-[#b25912]
                hover:shadow-[0_9px_24px_rgba(199,101,22,0.30)]
              "
            >
              Search
              <ArrowRightOutlined />
            </button>
          </div>

          {/* ===============================================
              DIVIDER
          ================================================ */}

          <div className="mt-[12px] border-t border-[#edf0f5]" />

          {/* ===============================================
              POPULAR ROUTES
          ================================================ */}

          <div className="mt-[16px] flex items-center gap-[14px]">
            <span
              className="
                shrink-0
                text-[13px]
                font-bold
                uppercase
                tracking-wide
                text-[#142651]
              "
            >
              POPULAR ROUTES:
            </span>

            <div className="flex min-w-0 items-center gap-[10px] overflow-x-auto scrollbar-hide">
              {routes.map((route, index) => (
                <div
                  key={route}
                  className="flex shrink-0 items-center gap-[10px]"
                >
                  <button
                    type="button"
                    className="
                      rounded-[9px]
                      bg-[#f1f4f8]
                      px-[14px]
                      py-[7px]
                      text-[13px]
                      font-medium
                      text-[#27354d]
                      transition-all
                      hover:bg-[#fff1e5]
                      hover:text-[#c76516]
                    "
                  >
                    {route}
                  </button>

                  {index !== routes.length - 1 && (
                    <span className="text-[15px] font-bold text-[#ccd3df]">
                      •
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SPACE BELOW HERO
      ====================================================== */}

      <div className="h-[165px] bg-white" />
    </section>
  );
}