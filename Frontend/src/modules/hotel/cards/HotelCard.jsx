"use client";

import useIsMobile from "@/hooks/useIsMobile";
import { useAuthGuard } from "@/modules/auth/hooks/useAuthGuard";
import { useSelectedHotelStore } from "@/modules/hotel/store/selectedHotel.store";
import { useHotelSearchStore } from "@/modules/hotel/store/serchData.store";
import ImageGallery from "@/modules/profile/components/bookings/ImageGallery";
import HotelBookingComingSoonModal from "@/modules/shared/home/components/HotelBookingComingSoonModal";
import { useToggleWishlist } from "@/modules/wishlist/hooks/useToggleWishlist";
import {
  EnvironmentOutlined,
  HeartFilled,
  HeartOutlined,
  ShareAltOutlined,
  StarFilled,
} from "@ant-design/icons";
import { message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo, useMemo, useState } from "react";
import { buildWishlistPayload } from "../utils/buildWishlistPayload";
import { navigateToHotelDetails } from "../utils/navigateToHotelDetails";
import { shareHotel } from "../utils/shareHotel";
import MobileHotelCard from "./MobileHotelCard";

function HotelCard({ hotel, wishlistIds }) {
  const router = useRouter();
  const isMobile = useIsMobile();

  const [openModal, setOpenModal] = useState(false);
  const [showAllFacilities, setShowAllFacilities] = useState(false);

  const { setSelectedHotel } = useSelectedHotelStore();
  const { appliedSearchData } = useHotelSearchStore();
  const { mutateAsync, isPending } = useToggleWishlist();
  const { requireAuth } = useAuthGuard();

  const isWishlisted = wishlistIds?.has(hotel.id?.toString()) || false;

  const rating = useMemo(() => {
    return Number(hotel.rating) || Number(hotel.starRating) || 4.0;
  }, [hotel.rating, hotel.starRating]);

  const reviews = useMemo(() => {
    return Number(hotel.reviews || 0);
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
    return Number(price + price * 0.1);
  }, [price]);

  const stars = useMemo(() => {
    return Math.min(Number(hotel.starRating || 0), 5);
  }, [hotel.starRating]);

  const facilities = useMemo(() => {
    if (hotel.facilities?.length > 0) {
      return hotel.facilities;
    }
    return [
      "Free WiFi",
      "Air Conditioning",
      "24x7 Front Desk",
      "Housekeeping",
      "Parking",
    ];
  }, [hotel.facilities]);

  const handleNavigate = () => {
    navigateToHotelDetails({
      router,
      hotel,
      searchData: appliedSearchData,
      setSelectedHotel,
    });
  };

  const visibleFacilities = useMemo(() => {
    return showAllFacilities ? facilities : facilities.slice(0, 4);
  }, [showAllFacilities, facilities]);

  const handleWishlist = (e) => {
    e.stopPropagation();

    requireAuth(async () => {
      try {
        const payload = buildWishlistPayload({
          hotel,
          searchData: appliedSearchData,
        });

        await mutateAsync(payload);

        message.success(
          isWishlisted ? "Removed from wishlist" : "Added to wishlist",
        );
      } catch {
        message.error("Wishlist update failed");
      }
    });
  };

  const handleShare = async (e) => {
    e.stopPropagation();

    await shareHotel({
      hotelName: hotel.name,
      cityName: appliedSearchData?.city,
      hotelId: hotel.id,
    });
  };

  if (isMobile) {
    return <MobileHotelCard hotel={hotel} wishlistIds={wishlistIds} />;
  }
  return (
    <>
      <div
        onClick={(e) => {
          if (e.target.closest("a") || e.target.closest("button")) {
            return;
          }
          handleNavigate();
        }}
        className="cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
      >
        <div className="flex flex-col lg:flex-row">
          <div className="w-full shrink-0 p-3 lg:w-[220px] xl:w-[220px] 2xl:w-[260px]">
            {hotelImages.length > 1 ? (
              <ImageGallery images={hotelImages} />
            ) : (
              <div className="overflow-hidden rounded">
                <Image
                  src={hotelImages[0]}
                  alt={hotel.name || "Hotel Image"}
                  width={320}
                  height={240}
                  loading="lazy"
                  className="h-[170px] w-full rounded-lg object-cover transition-transform duration-500 ease-out hover:scale-[1.03] xl:h-[180px] 2xl:h-[200px]"
                />
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col justify-between border-t border-gray-100 p-4 lg:border-t-0 lg:border-l">
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h2 className="font-roboto! text-[18px] leading-none font-bold! text-gray-900">
                    {hotel.name}
                  </h2>

                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    {stars > 0 && (
                      <div className="flex items-center gap-1 rounded border border-yellow-200 bg-yellow-50 px-2.5 py-1">
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
                        className="cursor-pointer text-[12px] font-medium most-text-color  underline underline-offset-2 transition-all hover:text-[#005b8c]"
                      >
                        View on Map
                      </button>
                    )}
                  </div>

                  <div className="mt-3 flex items-start gap-2">
                    <EnvironmentOutlined className="mt-[2px] text-[14px] text-[#0077b6]" />

                    <div className="flex-1">
                      <p className="text-[14px] leading-[18px] font-semibold">
                        <span className="most-text-color ">
                          {hotel.address || hotel.location}
                        </span>

                        <span className="ml-1 text-gray-400">
                          • Prime Location
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {facilities?.length > 0 && (
                <div className="mt-5">
                  <div className="flex flex-wrap gap-2">
                    {visibleFacilities.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-[12px] leading-none font-medium text-gray-700"
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
                        className="rounded-md bg-[#edf7ff] px-3 py-1.5 text-[12px] leading-none font-semibold most-text-color transition-colors hover:bg-[#dcefff]!"
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

          <div className="flex w-full flex-col justify-between border-t border-gray-100 p-4 min-[700px]:flex-row min-[700px]:items-center min-[700px]:gap-2 min-[900px]:flex-col lg:w-[230px] lg:border-t-0 lg:border-l xl:w-[260px]">
            <div
              className="mt-0! mb-1! flex justify-end gap-2 text-[22px] text-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                disabled={isPending}
                onClick={handleWishlist}
                className={`flex cursor-pointer items-center justify-center transition-all duration-300 hover:scale-110 active:scale-90 ${isWishlisted ? "text-red-500" : ""
                  }`}
              >

                <span
                  className={`inline-block transition-all duration-300 ${isWishlisted ? "scale-125" : "scale-100"} `}
                >
                  {isWishlisted ? (
                    <HeartFilled className="text-red-500!" />
                  ) : (
                    <HeartOutlined />
                  )}
                </span>
              </button>

              <button
                onClick={handleShare}
                className="cursor-pointer transition-all hover:text-[#0077b6]!"
              >
                <ShareAltOutlined />
              </button>
            </div>
            <div className="flex justify-end">
              <div className="flex w-[170px] flex-col gap-1 rounded border most-boder-colour  px-2 py-1">
                <div className="flex items-center justify-between">
                  <p className="m-1! text-[12px] font-semibold most-text-color">
                    {ratingLabel}
                  </p>

                  <p className="m-1! flex h-[18px] min-w-[34px] items-center justify-center rounded buttion-background-color px-1.5 text-[12px] font-bold text-white">
                    {rating.toFixed(1)}
                  </p>
                </div>

                <div className="w-full border-t border-gray-200"></div>

                <div className="flex w-full justify-end">
                  <p className="m-1! rounded bg-white px-2 text-[12px] text-[#3B3B3B]">
                    ({reviews.toLocaleString("en-IN")} Ratings)
                  </p>
                </div>
              </div>
            </div>
            <div className="font-roboto! mt-2 flex flex-col items-end font-bold">
              <p className="mb-1! text-[13px] text-gray-400">
                <span className="mr-1">{hotel.currencySymbol}</span>
                <span className="line-through decoration-gray-400 decoration-[1.5px]">
                  {oldPrice.toLocaleString("en-IN")}
                </span>
              </p>

              <h2 className="mb-1! text-[24px] leading-none font-bold! text-gray-900">
                <span className="mr-1 text-[20px]">{hotel.currencySymbol}</span>
                {price.toLocaleString("en-IN")}
              </h2>

              <p className="mb-0! text-right text-[12px] text-gray-500">
                + <span className="mr-1">{hotel.currencySymbol}</span>
                {tax.toLocaleString("en-IN")} taxes & fees
              </p>

              <p className="mt-0 text-[12px] text-gray-500">Per Night</p>
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
