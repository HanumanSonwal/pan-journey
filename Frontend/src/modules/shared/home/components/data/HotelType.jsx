"use client";

import { useEffect, useState } from "react";

const dummyData = {
  Beachvacations: [
    {
      id: 1,
      name: "Beach Resort",
      location: "Goa",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
      id: 2,
      name: "Sea View Hotel",
      location: "Maldives",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    },
    {
      id: 3,
      name: "Palm Stay",
      location: "Bali",
      image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd",
    },
    {
      id: 4,
      name: "Ocean Bliss",
      location: "Thailand",
      image: "https://images.unsplash.com/photo-1439130490301-25e322d88054",
    },
    {
      id: 5,
      name: "Blue Lagoon",
      location: "Hawaii",
      image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210f9",
    },
  ],

  MountainVacations: [
    {
      id: 6,
      name: "Hill Retreat",
      location: "Manali",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    },
    {
      id: 7,
      name: "Snow View",
      location: "Shimla",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    },
  ],

  LuxuryStays: [
    {
      id: 8,
      name: "Royal Palace",
      location: "Dubai",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    },
  ],

  WeekendGetaways: [
    {
      id: 9,
      name: "Lake Cabin",
      location: "Udaipur",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    },
  ],
};

export default function HotelType({ activeTab }) {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  const perPage = 4;

  useEffect(() => {
    const res = dummyData[activeTab] || [];
    setData(res);
    setIndex(0);
  }, [activeTab]);

  const next = () => {
    if (index + perPage < data.length) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const visibleData = data.slice(index, index + perPage);

  return (
    <div className="px-2 sm:px-4 lg:px-6 py-6 ">

      <div className="flex items-center gap-2">

        {/* ⬅️ Prev */}
        <button
          onClick={prev}
          disabled={index === 0}
          className="w-10 h-10 rounded-full border flex items-center justify-center disabled:opacity-40"
        >
          ←
        </button>

        {/* 🧩 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 flex-1  justify-items-center !w-[100%] ">

          {visibleData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[12px] overflow-hidden shadow-md hover:shadow-xl transition group w-[305px] mt-[-50px]"
            >
              {/* 📸 Image (bigger height) */}
              <div className="h-[260px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
              </div>

              {/* 📄 Content */}
              <div className="p-4 text-center">
                {/* ✅ Black Heading */}
                <h2 className="font-semibold text-black text-lg">
                  {item.name}
                </h2>

                <p className="text-gray-500 text-sm">
                  {item.location}
                </p>

                {/* 🔗 View More */}
                <button className="mt-2 text-blue-600 text-sm border-b border-dotted border-blue-600">
                  View More
                </button>
              </div>
            </div>
          ))}

        </div>

        {/* ➡️ Next */}
        <button
          onClick={next}
          disabled={index + perPage >= data.length}
          className="w-10 h-10 rounded-full border flex items-center justify-center disabled:opacity-40"
        >
          →
        </button>

      </div>
    
    </div>
  );
}


