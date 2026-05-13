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
  const rating = Number(hotel.rating) || 4.1;
  const reviews =
    hotel.reviews && hotel.reviews > 0
      ? hotel.reviews
      : Math.floor(Math.random() * 900 + 100);

  const getRatingLabel = (value) => {
    if (value >= 4.5) return "Excellent";
    if (value >= 4) return "Very Good";
    if (value >= 3) return "Good";
    return "Average";
  };

  const ratingLabel = getRatingLabel(rating);
  const hotelImages =
    hotel.images?.length > 0
      ? hotel.images
      : [
          hotel.image ||
            "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        ];
  const price = Number(hotel.price || 0);
  const oldPrice = Number(hotel.oldPrice || price + 1500);
  const handleNavigate = () => {
    // router.push(`/hotel-details/${hotel.id}`);
  };

  console.log("🚀 HOTEL in card:", hotel);
  return (
    <div
      onClick={handleNavigate}
      className="cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[1px_4px_4px_4px_#00000014] transition-all duration-300 hover:-translate-y-[2px]"
    >
      <div className="flex flex-col lg:flex-row">
        {/* 🖼️ IMAGE */}
        <div className="w-full p-3 lg:w-[320px]">
          <ImageGallery images={hotelImages} />
        </div>

        {/* 📋 CONTENT */}
        <div className="flex flex-1 flex-col justify-between border-t border-gray-100 p-4 lg:border-t-0 lg:border-l">
          {/* 🔝 TOP */}
          <div>
            {/* 🏨 TITLE */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-[20px] leading-tight font-bold text-gray-900">
                  {hotel.name}
                </h2>

                <p className="mt-1 text-[13px] text-gray-500">
                  <span className="font-medium text-[#0077b6]">
                    {hotel.location}
                  </span>{" "}
                  • Prime Location
                </p>
              </div>

              {/* ❤️ ACTIONS */}
              <div
                className="flex items-center gap-3 text-[18px] text-gray-400"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="transition-all hover:text-red-500">
                  <HeartOutlined />
                </button>

                <button className="transition-all hover:text-[#0077b6]">
                  <ShareAltOutlined />
                </button>
              </div>
            </div>

            {/* 🏷️ TAGS */}
            <div className="mt-3 flex flex-wrap gap-2">
              {hotel.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="rounded-md bg-gray-100 px-3 py-1 text-[11px] font-medium text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* ✅ FACILITIES */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-[13px] font-medium text-green-600">
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

        {/* 💰 RIGHT */}
        <div className="flex w-full flex-col justify-between border-t border-gray-100 p-4 lg:w-[250px] lg:border-t-0 lg:border-l">
          {/* ⭐ RATING */}
          <div className="flex justify-end">
            <div className="flex w-[162px] flex-col gap-1 rounded-md border border-blue-100 bg-blue-50 px-2 py-2">
              <div className="flex items-center justify-between">
                <p className="m-0 text-[14px] font-semibold text-[#72C0F0]">
                  {ratingLabel}
                </p>

                <p className="m-0 flex h-[20px] min-w-[30px] items-center justify-center rounded bg-[#72C0F0] px-1.5 text-[12px] font-bold text-white">
                  {rating.toFixed(1)}
                </p>
              </div>

              <div className="w-full border-t border-gray-200"></div>

              <div className="flex w-full justify-end">
                <p className="m-0 rounded bg-white px-2 py-[2px] text-[12px] text-[#3B3B3B]">
                  ({reviews} Ratings)
                </p>
              </div>
            </div>
          </div>

          {/* 💸 PRICE */}
          <div className="mt-6 flex flex-col items-end">
            <p className="text-[13px] text-gray-400 line-through">
              ₹{oldPrice.toLocaleString("en-IN")}
            </p>

            <h2 className="mt-1 text-[32px] leading-none font-bold text-gray-900">
              ₹{price.toLocaleString("en-IN")}
            </h2>

            <p className="mt-1 text-[12px] text-gray-500">+ taxes & fees</p>

            <p className="text-[12px] text-gray-500">Per Night</p>
          </div>
        </div>
      </div>
    </div>
  );
}
