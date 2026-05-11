"use client";

import hotels from "@/modules/shared/home/components/data/TopRatedData";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Card, Rate } from "antd";
import { useEffect, useState } from "react";

export default function TopRatedHotels() {
  const [index, setIndex] = useState(0);
  const [perPage, setPerPage] = useState(4);

  // ✅ Responsive Cards
  useEffect(() => {
    const updatePerPage = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setPerPage(1);
      } else if (width < 1024) {
        setPerPage(2);
      } else {
        setPerPage(4);
      }
    };

    updatePerPage();

    window.addEventListener("resize", updatePerPage);

    return () => window.removeEventListener("resize", updatePerPage);
  }, []);

  const next = () => {
    if (index + perPage < hotels.length) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const visible = hotels.slice(index, index + perPage);

  return (
    <div className="bg-[#EDF7FF] px-4 md:px-4 py-8 md:py-12  !mt-[-10px]">

      {/* Main Section */}
      <div className="bg-gradient-to-br from-sky-400 to-teal-700 py-10 md:py-14 px-4 md:px-8 rounded-3xl w-full lg:w-[85.87%] mx-auto">

        {/* Heading */}
        <div className="text-center text-white mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Top Rated Hotels
          </h2>

          <p className="mt-3 text-sm sm:text-base lg:text-lg opacity-90 max-w-3xl mx-auto leading-6">
            We’re committed to offering more than just products—
            we provide exceptional experiences.
          </p>
        </div>

        {/* First Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {visible.map((hotel) => (
            <Card
              key={hotel.id}
              hoverable
              className="rounded-xl overflow-hidden shadow-md"
              cover={
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-[220px] md:h-[240px] object-cover block"
                />
              }
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold">
                  {hotel.name}
                </h3>

                <p className="text-gray-500 text-sm mt-2 leading-6">
                  {hotel.desc}
                </p>

                <div className="mt-3">
                  <Rate disabled defaultValue={hotel.rating} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mt-6 md:mt-10">
          {visible.map((hotel) => (
            <Card
              key={hotel.id}
              hoverable
              className="rounded-xl overflow-hidden shadow-md"
              cover={
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-[220px] md:h-[240px] object-cover block"
                />
              }
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold">
                  {hotel.name}
                </h3>

                <p className="text-gray-500 text-sm mt-2 leading-6">
                  {hotel.desc}
                </p>

                <div className="mt-3">
                  <Rate disabled defaultValue={hotel.rating} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center mt-8 md:mt-10 gap-4 md:gap-6 text-white">

          {/* Prev */}
          <button
            onClick={prev}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/40 hover:bg-white/10 transition"
          >
            <LeftOutlined className="text-lg md:text-2xl" />
          </button>

          {/* Progress */}
          <div className="w-[140px] sm:w-[220px] md:w-[920px] h-[2px] bg-white/40 relative rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-[2px] bg-white"
              style={{
                width: `${((index + perPage) / hotels.length) * 100}%`,
              }}
            />
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/40 hover:bg-white/10 transition"
          >
            <RightOutlined className="text-lg md:text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
}


