"use client";

import {
  HeartOutlined,
  ShareAltOutlined,
  CheckOutlined,
} from "@ant-design/icons";

import { useState } from "react";

export default function HotelCard({ hotel }) {
  // 🖼️ MAIN IMAGE STATE
  const [mainImage, setMainImage] = useState(hotel.image);

  return (
    <div className="bg-white rounded-xl shadow-sm border flex flex-col md:flex-row overflow-hidden">

      {/* 🖼️ LEFT IMAGE SECTION */}
      <div className="p-3 md:w-[300px]">

        {/* MAIN IMAGE */}
        <img
          src={mainImage}
          alt="hotel"
          className="w-full h-[180px] object-cover rounded-lg transition-all duration-300"
        />

        {/* THUMBNAILS */}
        <div className="flex gap-2 mt-2">

          {hotel.images?.slice(0, 4).map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setMainImage(img)}   // 🔥 CLICK FUNCTION
              className={`w-16 h-12 object-cover rounded cursor-pointer border-2 
              ${mainImage === img ? "border-blue-500" : "border-transparent"}`}
            />
          ))}

          {/* VIEW ALL */}
          <div className="w-16 h-12 bg-black/60 text-white flex items-center justify-center text-xs rounded cursor-pointer">
            View All
          </div>

        </div>
      </div>

      {/* 📄 CENTER CONTENT */}
      <div className="flex-1 p-4">

        <h2 className="text-lg font-semibold text-gray-800">
          {hotel.name}
        </h2>

        <p className="text-sm text-gray-600 mt-1">
          <span className="text-blue-600 font-medium">
            {hotel.location}
          </span>{" "}
          | Near Beach
        </p>

        <div className="flex flex-wrap gap-2 mt-2">
          {hotel.tags?.map((tag, i) => (
            <span
              key={i}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-3 space-y-1 text-sm text-gray-700">
          <p className="text-green-600 flex items-center gap-2">
            <CheckOutlined /> Free Cancellation
          </p>
          <p className="flex items-center gap-2">
            <CheckOutlined /> Book @ ₹0 available
          </p>
          <p className="flex items-center gap-2">
            <CheckOutlined /> Breakfast available
          </p>
        </div>
      </div>

      {/* 💰 RIGHT SIDE */}
      <div className="border-t md:border-t-0 md:border-l w-full md:w-[220px] p-4 flex flex-col justify-between">

        {/* ICONS */}
        <div className="flex justify-end gap-4 text-lg text-gray-600">
          <HeartOutlined />
          <ShareAltOutlined />
        </div>

        {/* RATING */}
        <div className="border border-blue-300 rounded-lg p-3 text-center mt-2">
          <p className="text-blue-600 font-semibold text-sm">
            Very Good{" "}
            <span className="bg-blue-100 px-1 rounded">
              {hotel.rating}
            </span>
          </p>
          <p className="text-xs text-gray-500">
            ({hotel.reviews} Reviews)
          </p>
        </div>

        {/* PRICE */}
        <div className="text-right mt-3">
          <p className="text-gray-400 line-through text-sm">
            ₹{hotel.oldPrice}
          </p>

          <h2 className="text-2xl font-bold text-gray-800">
            ₹{hotel.price}
          </h2>

          <p className="text-xs text-gray-500">
            + taxes & fees
          </p>

          <p className="text-xs text-gray-500">Per Night</p>
        </div>
      </div>
    </div>
  );
}
