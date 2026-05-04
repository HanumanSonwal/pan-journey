"use client";

import { Card, Rate } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";
import hotels from "@/modules/shared/home/components/data/TopRatedData";

 // 🔥 IMPORT DATA

export default function TopRatedHotels() {
  const [index, setIndex] = useState(0);
  const perPage = 4;

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
    <div className=" bg-[#EDF7FF]">
    <div className="bg-gradient-to-br from-sky-400 to-teal-700 py-16 px-4 md:px-10 rounded-3xl ml-30 mr-30">

      {/* Heading */}
      <div className="text-center text-white mb-10">
        <h2 className="text-4xl font-bold">Top Rated Hotels</h2>
        <p className="mt-3 text-lg opacity-90">
          We’re committed to offering more than just products—
          we provide exceptional experiences.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visible.map((hotel) => (
          <Card
            key={hotel.id}
            hoverable
           
            className="rounded-xl overflow-hidden shadow-md"
            cover={
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-[220px] object-cover block"
              />
            }
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold">{hotel.name}</h3>
              <p className="text-gray-500 text-sm mt-2">{hotel.desc}</p>
              <div className="mt-3">
                <Rate disabled defaultValue={hotel.rating} />
              </div>
            </div>
          </Card>
        ))}
      </div>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {visible.map((hotel) => (
          <Card
            key={hotel.id}
            hoverable
           
            className="rounded-xl overflow-hidden shadow-md"
            cover={
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-[220px] object-cover block"
              />
            }
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold">{hotel.name}</h3>
              <p className="text-gray-500 text-sm mt-2">{hotel.desc}</p>
              <div className="mt-3">
                <Rate disabled defaultValue={hotel.rating} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center mt-10 gap-6 text-white">
        <button onClick={prev}>
          <LeftOutlined className="text-2xl" />
        </button>

        <div className="w-2/3 h-[2px] bg-white/40 relative">
          <div
            className="absolute top-0 left-0 h-[2px] bg-white"
            style={{
              width: `${((index + perPage) / hotels.length) * 100}%`,
            }}
          />
        </div>

        <button onClick={next}>
          <RightOutlined className="text-2xl" />
        </button>
      </div>
    </div>
    </div>
  );
}


