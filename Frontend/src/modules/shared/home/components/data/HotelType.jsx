"use client";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";


const dummyData = {
  Beachvacations: [
    { id: 1, name: "Beach Resort", location: "Goa", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
    { id: 2, name: "Sea View Hotel", location: "Maldives", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4" },
    { id: 3, name: "Palm Stay", location: "Bali", image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd" },
    { id: 4, name: "Ocean Bliss", location: "Thailand", image: "https://images.unsplash.com/photo-1439130490301-25e322d88054" },
    { id: 5, name: "Blue Lagoon", location: "Hawaii", image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210f9" },
  ],
  MountainVacations: [
    { id: 6, name: "Hill Retreat", location: "Manali", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4" },
    { id: 7, name: "Snow View", location: "Shimla", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b" },
  ],
  LuxuryStays: [
    { id: 8, name: "Royal Palace", location: "Dubai", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b" },
  ],
  WeekendGetaways: [
    { id: 9, name: "Lake Cabin", location: "Udaipur", image: "https://images.unsplash.com/photo-1501854140801-50d01698950b" },
  ],
};

export default function HotelType({ activeTab }) {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [perPage, setPerPage] = useState(4);

  // 📱 Responsive cards
  useEffect(() => {
    const updatePerPage = () => {
      const width = window.innerWidth;

      if (width < 640) setPerPage(1);
      else if (width < 1024) setPerPage(2);
      else setPerPage(4);
    };

    updatePerPage();
    window.addEventListener("resize", updatePerPage);

    return () => window.removeEventListener("resize", updatePerPage);
  }, []);

  // 🔄 Change data on tab
  useEffect(() => {
    const res = dummyData[activeTab] || [];
    setData(res);
    setIndex(0);
  }, [activeTab]);

  const next = () => {
    if (index + perPage < data.length) {
      setIndex(index + perPage);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - perPage);
    }
  };

  const visibleData = data.slice(index, index + perPage);

  return (
    <div className="px-2 py-2 !pl-[2%]">

      <div className="flex items-center gap-3 ">

        {/* ⬅️ Prev */}
        <button
          onClick={prev}
          disabled={index === 0}
          className="w-10 h-10 rounded-full !text-black flex items-center justify-center hover:bg-gray-200 disabled:opacity-30 transition text-xl !mr-[1%]"
        >
          {<LeftOutlined
            style={{
              fontSize: "22px",
              color: "black",
            }}
          />}
        </button>

        {/* 🧩 Cards */}
        <div className="flex gap-5 flex-1 overflow-hidden">

          {visibleData.map((item) => (
            <div
              key={item.id}
              className="
  bg-white rounded-lg overflow-hidden 
  shadow-sm hover:shadow-md transition 
  flex-shrink-0 mb-2
  
  w-full
  sm:w-[48%]
  lg:w-[23%]
"
            >
              {/* Image */}
              <div className="h-[290px] overflow-hidden ">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="bg-[#F5F5F5] text-center px-4 py-5">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.name}
                </h2>

                <p className="text-sm text-gray-600 mb-3">
                  {item.location}
                </p>

                <button className="w-full !text-[#5FA8C9] hover:text-[#3D8FB3] transition text-sm font-medium flex items-center justify-center gap-1">
                  View Details →
                </button>

                <div className="border-b border-dotted border-[#5FA8C9]  mt-2 w-20 mx-auto"></div>
              </div>
            </div>
          ))}

        </div>

        {/* ➡️ Next */}
        <button
          onClick={next}
          disabled={index + perPage >= data.length}
          className="pl-0 w-10 h-10 rounded-full  !text-black flex items-center justify-center hover:bg-gray-200 disabled:opacity-30 transition text-xl ml-[-2%] md:!ml-[-1%] lg:!ml-[-2%]"
        >
          {<RightOutlined
            style={{
              fontSize: "22px",
              color: "black",
            }}
          />}
        </button>

      </div>
    </div>
  );
}


