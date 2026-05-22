"use client";

import ImageGallery from "@/modules/profile/components/ImageGallery";

import {
  EnvironmentOutlined,
  HeartOutlined,
  ShareAltOutlined,
  StarFilled,
} from "@ant-design/icons";

import { useRouter } from "next/navigation";
import { memo, useMemo, useState } from "react";
import HotelBookingComingSoonModal from "../../shared/home/components/HotelBookingComingSoonModal";
function HotelCard({ hotel }) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [showAllFacilities, setShowAllFacilities] = useState(false);

  const rating = useMemo(() => {
    return Number(hotel.rating) || Number(hotel.starRating) || 4.0;
  }, [hotel.rating, hotel.starRating]);

  const reviews = useMemo(() => {
    return hotel.reviews && hotel.reviews > 0
      ? hotel.reviews
      : Math.floor(Math.random() * 900 + 100);
  }, [hotel.reviews]);

  const ratingLabel = useMemo(() => {
    if (rating >= 4.5) return "Excellent";
    if (rating >= 4) return "Very Good";
    if (rating >= 3) return "Good";
    return "Average";
  }, [rating]);

  const hotelImages = useMemo(() => {
    if (hotel.images?.length > 1) {
      return hotel.images;
    }

    return [
      hotel.image ||
        hotel.images?.[0] ||
        "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    ];
  }, [hotel.images, hotel.image]);

  const price = useMemo(() => {
    return Number(hotel.price || 0);
  }, [hotel.price]);

  const tax = useMemo(() => {
    return Number(hotel.tax || 0);
  }, [hotel.tax]);

  const oldPrice = useMemo(() => {
    return Number(hotel.oldPrice || price + 1500);
  }, [hotel.oldPrice, price]);

  const stars = useMemo(() => {
    return Number(hotel.starRating || 0);
  }, [hotel.starRating]);

  const facilities = useMemo(() => {
    return hotel.facilities || [];
  }, [hotel.facilities]);

  const location = useMemo(() => {
    return hotel.location || hotel.address || "Prime Location";
  }, [hotel.location, hotel.address]);

  const handleNavigate = () => {
    // setOpenModal(true);
    router.push(`/hotel-details`);
    // router.push(`/hotel-details/${hotel.id}`);
  };

  const visibleFacilities = useMemo(() => {
    return showAllFacilities ? facilities : facilities.slice(0, 4);
  }, [showAllFacilities, facilities]);

  return (
    <>
      <div
        onClick={(e) => {
          if (e.target.closest("a") || e.target.closest("button")) {
            return;
          }
          if (!openModal) {
            handleNavigate();
          }
        }}
        className="cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[1px_4px_4px_4px_#00000014] transition-all duration-300 hover:-translate-y-[2px]"
      >
        <div className="flex flex-col lg:flex-row">
          <div className="w-full p-3 lg:w-[320px]">
            {hotelImages.length > 1 ? (
              <ImageGallery images={hotelImages} />
            ) : (
              <div className="overflow-hidden rounded-xl">
                <img
                  src={hotelImages[0]}
                  alt={hotel.name}
                  loading="lazy"
                  className="h-[240px] w-full object-cover transition-all duration-300 hover:scale-105"
                />
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col justify-between border-t border-gray-100 p-4 lg:border-t-0 lg:border-l">
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h2 className="text-[22px] leading-[28px] font-bold text-gray-900">
                    {hotel.name}
                  </h2>

                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    {stars > 0 && (
                      <div className="flex items-center gap-1 rounded-md border border-yellow-200 bg-yellow-50 px-2.5 py-1">
                        <div className="flex items-center gap-[2px]">
                          {Array.from({
                            length: stars,
                          }).map((_, i) => (
                            <StarFilled
                              key={i}
                              className="text-[12px] text-[#F4B400]!"
                            />
                          ))}
                        </div>

                        <span className="ml-1 text-[12px] font-semibold text-[#A16207]!">
                          {stars} Star Hotel
                        </span>
                      </div>
                    )}
                    {hotel.latitude && hotel.longitude && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();

                          window.open(
                            `https://www.google.com/maps?q=${hotel.latitude},${hotel.longitude}`,
                            "_blank",
                          );
                        }}
                        className="cursor-pointer text-[12px] font-medium text-[#0077b6]! underline underline-offset-2 transition-all hover:text-[#005b8c]"
                      >
                        View on Map
                      </button>
                    )}
                  </div>

                  <div className="mt-3 flex items-start gap-2">
                    <EnvironmentOutlined className="mt-[3px] text-[14px] text-[#0077b6]" />

                    <div className="flex-1">
                      <p className="text-[13px] leading-[20px] text-gray-600">
                        <span className="font-medium text-[#0077b6]">
                          {hotel.address || hotel.location}
                        </span>

                        <span className="ml-1 text-gray-400">
                          • Prime Location
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="flex items-center gap-3 pt-1 text-[18px] text-gray-400"
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
              {facilities?.length > 0 && (
                <div className="mt-5">
                  <div className="flex flex-wrap gap-2">
                    {visibleFacilities.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-[11px] font-medium text-gray-700!"
                      >
                        {tag}
                      </span>
                    ))}

                    {facilities.length > 4 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();

                          setShowAllFacilities(!showAllFacilities);
                        }}
                        className="rounded-lg bg-[#edf7ff] px-3 py-1.5 text-[11px] font-semibold text-[#0077b6]! transition-all hover:bg-[#dcefff]"
                      >
                        {showAllFacilities
                          ? "View Less"
                          : `+${facilities.length - 4} More`}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex w-full flex-col justify-between border-t border-gray-100 p-4 lg:w-[260px] lg:border-t-0 lg:border-l">
            <div className="flex justify-end">
              <div className="flex w-[170px] flex-col gap-1 rounded-md border border-blue-100 bg-blue-50 px-2 py-2">
                <div className="flex items-center justify-between">
                  <p className="m-0 text-[14px] font-semibold text-[#72C0F0]">
                    {ratingLabel}
                  </p>

                  <p className="m-0 flex h-[22px] min-w-[34px] items-center justify-center rounded bg-[#72C0F0] px-1.5 text-[12px] font-bold text-white">
                    {rating.toFixed(1)}
                  </p>
                </div>

                <div className="w-full border-t border-gray-200"></div>

                <div className="flex w-full justify-end">
                  <p className="m-0 rounded bg-white px-2 py-[2px] text-[12px] text-[#3B3B3B]">
                    ({reviews.toLocaleString("en-IN")} Ratings)
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-col items-end">
              <p className="text-[13px] text-gray-400 line-through">
                ₹{oldPrice.toLocaleString("en-IN")}
              </p>

              <h2 className="mt-1 text-[32px] leading-none font-bold text-gray-900">
                ₹{price.toLocaleString("en-IN")}
              </h2>

              {/* TAX */}
              <p className="mt-2 text-right text-[12px] text-gray-500">
                + ₹{tax.toLocaleString("en-IN")} taxes & fees
              </p>
              <p className="mt-1 text-[12px] text-gray-500">Per Night</p>
            </div>
          </div>
        </div>
      </div>
      <HotelBookingComingSoonModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}

export default memo(HotelCard);
