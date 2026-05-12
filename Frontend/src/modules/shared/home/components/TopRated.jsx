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
        setPerPage(2);
      } else if (width < 1024) {
        setPerPage(4); // 2+2
      } else if (width < 1280) {
        setPerPage(6); // 3+3
      } else {
        setPerPage(8); // 4+4
      }
    };

    updatePerPage();
    window.addEventListener("resize", updatePerPage);
    return () => window.removeEventListener("resize", updatePerPage);
  }, []);

  // ✅ Total Slides
  const totalSlides = Math.ceil(hotels.length / perPage);
  const currentSlide = Math.floor(index / perPage);

  // ✅ Slider Controls
  const next = () => {
    if (currentSlide < totalSlides - 1) {
      setIndex(index + perPage);
    }
  };

  const prev = () => {
    if (currentSlide > 0) {
      setIndex(index - perPage);
    }
  };

  const visible = hotels.slice(index, index + perPage);

  // 👇 split rows
  const firstRow = visible.slice(0, perPage / 2);
  const secondRow = visible.slice(perPage / 2);

  // ✅ Perfect Progress
  const progress =
    totalSlides > 1 ? (currentSlide / (totalSlides - 1)) * 100 : 100;

  return (
    <div className="bg-[#EDF7FF] px-4 py-8 md:py-12 mt-[-10px]">

      <div className="bg-gradient-to-br from-sky-400 to-teal-700 py-10 md:py-14 px-4 md:px-8 rounded-3xl w-full lg:w-[85.87%] mx-auto">

        {/* Heading */}
        <div className="text-center text-white mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Top Rated Hotels
          </h2>
          <p className="mt-3 text-sm sm:text-base lg:text-lg opacity-90 max-w-3xl mx-auto">
            We’re committed to offering more than just products—
            we provide exceptional experiences.
          </p>
        </div>

        {/* First Row */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {firstRow.map((hotel) => (
            <Card
              key={hotel.id}
              hoverable
              className="rounded-xl overflow-hidden shadow-md"
              cover={
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-[220px] md:h-[240px] object-cover"
                />
              }
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold">{hotel.name}</h3>
                <p className="text-gray-500 text-sm mt-2">{hotel.desc}</p>
                <Rate disabled defaultValue={hotel.rating} />
              </div>
            </Card>
          ))}
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 mt-6 md:mt-10">
          {secondRow.map((hotel) => (
            <Card
              key={hotel.id}
              hoverable
              className="rounded-xl overflow-hidden shadow-md"
              cover={
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-[220px] md:h-[240px] object-cover"
                />
              }
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold">{hotel.name}</h3>
                <p className="text-gray-500 text-sm mt-2">{hotel.desc}</p>
                <Rate disabled defaultValue={hotel.rating} />
              </div>
            </Card>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center mt-8 md:mt-10 gap-4 text-white">

          {/* Prev */}
          <button
            onClick={prev}
            disabled={currentSlide === 0}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/40 hover:bg-white/10 disabled:opacity-40"
          >
            <LeftOutlined />
          </button>

          {/* Progress Bar */}
          <div className="w-[150px] md:w-[400px] lg:w-[600px] h-[3px] bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Next */}
          <button
            onClick={next}
            disabled={currentSlide === totalSlides - 1}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/40 hover:bg-white/10 disabled:opacity-40"
          >
            <RightOutlined />
          </button>
        </div>
      </div>
    </div>
  );
}


