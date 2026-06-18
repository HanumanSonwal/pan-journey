"use client";

import { EnvironmentOutlined } from "@ant-design/icons";

export default function RelatedHotelCard({ hotel, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded border border-[#e5edf3] bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* IMAGE */}
      <div className="overflow-hidden">
        <img
          src={hotel?.image}
          alt={hotel?.hotelName}
          className="h-45 w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4">
        {/* NAME */}
        <h4 className="line-clamp-2 text-[16px] font-semibold text-[#303030]">
          {hotel?.hotelName}
        </h4>

        {/* LOCATION */}
        <div className="mt-2 flex items-start gap-2">
          <EnvironmentOutlined className="mt-[2px] text-[#72C0F0]" />

          <p className="line-clamp-1 text-[12px] text-[#667085]">
            {hotel?.location || hotel?.address}
          </p>
        </div>

        {/* RATING + PRICE */}
        <div className="mt-4 flex items-end justify-between">
          <div className="rounded border border-blue-100 bg-blue-50 px-2 py-1">
            <span className="text-[12px] font-medium text-[#72C0F0]">
              {hotel?.starRating || 4}★
            </span>
          </div>

          <div className="text-right">
            <p className="text-[11px] text-gray-400">Per Night</p>

            <p className="text-[20px] font-bold text-[#303030]">
              ₹{Number(hotel?.price || 0).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
