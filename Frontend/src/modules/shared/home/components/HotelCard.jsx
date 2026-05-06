"use client";

import ImageGallery from "@/modules/profile/components/ImageGallery";
import {
  CheckOutlined,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

import { useRouter } from "next/navigation";

export default function HotelCard({ hotel }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/hotel-details`)}
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:-translate-y-[2px] transition-all duration-300 cursor-pointer shadow-[1px_4px_4px_4px_#00000014]"
    >
      <div className="flex flex-col lg:flex-row">
        {/* IMAGE SECTION */}
        <div className="w-full lg:w-[320px] p-3">
          <ImageGallery images={hotel.images} />
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-4 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-gray-100">
          {/* TOP */}
          <div>
            {/* TITLE + LOCATION */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-[20px] font-bold text-gray-900 leading-tight">
                  {hotel.name}
                </h2>

                <p className="text-[13px] text-gray-500 mt-1">
                  <span className="text-[#0077b6] font-medium">
                    {hotel.location}
                  </span>{" "}
                  • Near Beach
                </p>
              </div>

              {/* ICONS */}
              <div
                className="flex items-center gap-3 text-[18px] text-gray-400"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="hover:text-red-500 transition-all">
                  <HeartOutlined />
                </button>

                <button className="hover:text-[#0077b6] transition-all">
                  <ShareAltOutlined />
                </button>
              </div>
            </div>

            {/* TAGS */}
            <div className="flex flex-wrap gap-2 mt-3">
              {hotel.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-[11px] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* FACILITIES */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-[13px] text-green-600 font-medium">
                <CheckOutlined />
                Free Cancellation
              </div>

              <div className="flex items-center gap-2 text-[13px] text-gray-700">
                <CheckOutlined />
                Book @ ₹0 available
              </div>

              <div className="flex items-center gap-2 text-[13px] text-gray-700">
                <CheckOutlined />
                Breakfast included
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full lg:w-[250px] border-t lg:border-t-0 lg:border-l border-gray-100 p-4 flex flex-col justify-between">
          {/* RATING */}
          <div className="flex justify-end">
            <div className="w-[162px] border border-blue-100 bg-blue-50 rounded-md px-2 py-2 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <p className="text-[14px] font-semibold text-[#72C0F0] m-0">
                  Very Good
                </p>

                <p className="min-w-[30px] h-[20px] flex items-center justify-center text-[12px] font-bold text-white bg-[#72C0F0] rounded px-1.5 m-0">
                  {hotel.rating}
                </p>
              </div>

              <div className="w-full border-t border-gray-200"></div>

              <div className="w-full flex justify-end">
                <p className="text-[12px] text-[#3B3B3B] bg-white px-2 py-[2px] rounded m-0">
                  ({hotel.reviews} Ratings)
                </p>
              </div>
            </div>
          </div>

          {/* PRICE */}
          <div className="mt-6 flex flex-col items-end">
            <p className="text-[13px] text-gray-400 line-through">
              ₹{hotel.oldPrice}
            </p>

            <h2 className="text-[32px] leading-none font-bold text-gray-900 mt-1">
              ₹{hotel.price}
            </h2>

            <p className="text-[12px] text-gray-500 mt-1">+ taxes & fees</p>

            <p className="text-[12px] text-gray-500">Per Night</p>
          </div>
        </div>
      </div>
    </div>
  );
}
