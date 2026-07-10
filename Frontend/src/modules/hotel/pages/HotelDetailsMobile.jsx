"use client";
import { ArrowLeftOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Drawer, message } from "antd";
import { useEffect, useMemo, useState } from "react";

import HotelDetailsSkeleton from "@/components/common/loder/HotelDetailsSkeleton";
import { useAuthGuard } from "@/modules/auth/hooks/useAuthGuard";
import CMSContentRenderer from "@/modules/cms/renderer/CMSContentRenderer";
import { useToggleWishlist } from "@/modules/wishlist/hooks/useToggleWishlist";
import { useWishlistIds } from "@/modules/wishlist/hooks/useWishlistIds";
import { slugify } from "@/utils/slug/slugify";

import SessionExpiredModal from "../components/hotels/viewhotles/SessionExpiredModal";
import ViewHotelInfo from "../components/hotels/viewhotles/ViewHotelInfo";
import ViewHotelModal from "../components/hotels/viewhotles/ViewHotelModal";
import ViewHotelPriceCard from "../components/hotels/viewhotles/ViewHotelPriceCard";

import HotelCmsSection from "../sections/HotelCmsSection";
import RelatedHotels from "../sections/RelatedHotels";
import DynamicHotelSeoFallback from "../seo/DynamicHotelSeoFallback";

import ViewHotelGalleryMobile from "../components/hotels/viewhotles/ViewHotelGalleryMobile";
import HotelSectionsContents from "../mobile-componant/HotelSectionsContents";
import HotelSectionsTabss from "../mobile-componant/HotelSectionsTabss";
import SlectRoom from "../mobile-componant/SlectRoom";
import { useHotelBookingStore } from "../store/booking.store";
import { useHotelSearchStore } from "../store/serchData.store";

function HotelDetailsMobile({
  cms,
  hotelData,
  supplierData,
  isLoading,
  isFetching,
  refetch,
  payload,
}) {
  const { appliedSearchData } = useHotelSearchStore();
  const { setBookingData } = useHotelBookingStore();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [sessionExpired] = useState(false);
  const [reloadingHotels] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { requireAuth } = useAuthGuard();
  const { mutateAsync } = useToggleWishlist();
  const { data: wishlistData } = useWishlistIds();

  const wishlistIds = useMemo(
    () => new Set(wishlistData || []),
    [wishlistData],
  );

  const isWishlisted = wishlistIds.has(payload?.hotelId?.toString());

  const showSkeleton = isLoading || isFetching;

  const ratePlans = supplierData?.RatePlanRecommendations || [];

  const FirstRoomPrice = ratePlans?.[0];

  const hotelImages = supplierData?.HotelGallery || [];

  const amenities = supplierData?.Amenities
    ? supplierData.Amenities.split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  const hotelDetails = supplierData || [];

  const handleReloadHotels = async () => {
    await refetch();
  };

  useEffect(() => {
    if (!supplierData?.HotelKey) return;
    if (!hotelData?.searchKey) return;

    setBookingData({
      supplierData,
      searchData: appliedSearchData,
      selectedHotel: {
        hotelKey: supplierData.HotelKey,
        searchKey: hotelData.searchKey,
        hotelName: supplierData?.HotelName,
        hotelImage:
          supplierData?.HotelImage || supplierData?.HotelGallery?.[0] || "",
        address: supplierData?.Address,
        city: supplierData?.City,
        country: supplierData?.Country,
      },
    });
  }, [
    supplierData?.HotelKey,
    supplierData?.HotelName,
    hotelData?.searchKey,
    appliedSearchData,
    setBookingData,
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWishlist = () => {
    requireAuth(async () => {
      try {
        await mutateAsync({
          hotelId: payload?.hotelId?.toString(),
          hotelName: supplierData?.HotelName || "",
          hotelSlug: slugify(supplierData?.HotelName || ""),
          hotelImage:
            supplierData?.HotelImage || supplierData?.HotelGallery?.[0] || "",
          cityId: payload?.hotelMeta?.cityId || appliedSearchData?.cityData?.id,
          cityName: appliedSearchData?.city || supplierData?.City || "",
          stateName:
            payload?.hotelMeta?.stateName ||
            appliedSearchData?.cityData?.stateName ||
            "",
          countryCode:
            payload?.hotelMeta?.countryCode ||
            appliedSearchData?.cityData?.countryCode ||
            "",
          countryName: supplierData?.Country || "",
          address: supplierData?.Address || "",
          starRating: Number(supplierData?.StarRating || 0),
          facilities: supplierData?.Amenities
            ? supplierData.Amenities.split(",")
                .map((i) => i.trim())
                .filter(Boolean)
            : [],
          freeCancellation: false,
          savedPrice: Number(FirstRoomPrice?.TotalAmount || 0),
          savedTax: Number(FirstRoomPrice?.Tax || 0),
        });

        message.success(
          isWishlisted ? "Removed from wishlist" : "Added to wishlist",
        );
      } catch {
        message.error("Wishlist update failed");
      }
    });
  };

  return (
    <div className="min-h-screen !bg-[#eef3f8]">
      <div
        className={`sticky top-0 z-50 flex items-center !justify-between p-2 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <button
          onClick={() => window.history.back()}
          className="flex h-10 w-10 items-center justify-center"
        >
          <ArrowLeftOutlined className="text-lg" />
        </button>

        <div className="flex items-center gap-2">
          <button className="flex h-10 w-10 items-center justify-center">
            <ShareAltOutlined className="text-lg" />
          </button>
        </div>
      </div>

      {showSkeleton ? (
        <HotelDetailsSkeleton />
      ) : (
        <>
          <div className="mx-auto w-full max-w-md rounded-b-[24px] bg-white shadow-sm">
            {/* Top Overlay Icons */}

            {/* Gallery */}
            <div className="relative">
              <ViewHotelGalleryMobile
                images={hotelImages}
                onOpen={() => setIsGalleryOpen(true)}
                onBack={() => window.history.back()}
                onWishlist={handleWishlist}
                isWishlisted={isWishlisted}
              />
            </div>

            {/* Hotel Card */}
            <div className="!bg- -mt-5 rounded-t-[28px] px-2 pt-5">
              <div className="rounded-2xl bg-white p-2 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                <h1 className="basicDetailHeadingText text-[22px] font-bold text-[#222]">
                  {supplierData?.HotelName}
                </h1>

                {/* Star */}
                <div className="!-mt-4 flex items-center gap-1">
                  {Array.from({
                    length: Number(supplierData?.StarRating || 5),
                  }).map((_, i) => (
                    <span key={i} className="!text-[17px] text-yellow-500">
                      ★
                    </span>
                  ))}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="!bg-offer-gradient rounded px-3 py-1 text-xs font-bold text-white">
                    {supplierData?.ReviewScore || "4.2"}
                  </div>

                  <span className="text-[14px] font-bold text-[#4AA3DF]">
                    Very Good
                  </span>

                  <span className="text-gray-500">
                    ({supplierData?.ReviewCount || "1200"} Ratings)
                  </span>
                </div>

                {/* Address */}
                <div className="mt-2">
                  <p className="font-bold !text-gray-500">
                    📍 {supplierData?.Address}
                  </p>

                  <p className="!-mt-3 text-sm text-[#4AA3DF]">
                    {supplierData?.City}, {supplierData?.Country}
                  </p>
                </div>

                {/* Travel Dates & Guests */}
                <div className="mt-4">
                  <h3 className="mb-3 !font-bold">Travel Dates & Guests</h3>

                  <div className="flex gap-2">
                    {/* Travel Dates */}
                    <div className="flex gap-3">
                      {/* Check In / Check Out */}
                      <div className="flex-1">
                        <p className="mb-0 text-sm font-medium text-[#4AA3DF]">
                          Check In / Check Out
                        </p>

                        <div className="!rounded-[3px] border font-normal !border-gray-400 p-1 gap-2 h-8 !-mt-2 sm:h-7 md:h-7 lg:h-7 ">
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="font-normal !text-gray-500">
                                {appliedSearchData?.checkIn || "--"}
                              </p>
                            </div>

                            <div>
                              <p className="font-normal !text-gray-500 ">
                                {appliedSearchData?.checkOut || "--"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Guests */}
                      <div className="w-[110px]">
                        <p className=" text-sm font-medium !text-[#4AA3DF] ">
                          Guests
                        </p>

                        <div className="rounded-[4px] border !border-gray-400 p-1 !h-8 !-mt-2 !sm:h-8 !md:h-7 lg:h-7 ">
                          <p className="font-normal !text-gray-500 ">
                            {appliedSearchData?.rooms || 1} Room
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Price Card */}
              <div className="mt-6">
                <ViewHotelPriceCard
                  supplierData={supplierData}
                  ratePlans={ratePlans}
                />
              </div>

              {/* Info */}
              <div className="mt-6">
                <ViewHotelInfo supplierData={supplierData} />
              </div>
            </div>
          </div>

          {/* Hotel Sections */}
          <div className="mx-auto mt-6 w-full max-w-md px-3">
            <HotelSectionsTabss
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            <div className="mt-4">
              <HotelSectionsContents
                activeTab={activeTab}
                supplierData={supplierData}
                ratePlans={ratePlans}
                amenities={amenities}
                hotelDetails={hotelDetails}
              />
            </div>
          </div>

          {/* CMS Section */}

          <div className="mx-auto mt-8 w-full max-w-md px-3">
            <HotelCmsSection>
              {cms ? (
                <CMSContentRenderer cms={cms} />
              ) : (
                <DynamicHotelSeoFallback
                  hotelName={supplierData?.HotelName}
                  cityName={supplierData?.City}
                />
              )}
            </HotelCmsSection>
          </div>

          {/* Related Hotels */}

          <div className="mx-auto mt-8 w-full max-w-md px-3 pb-28">
            <RelatedHotels
              cityId={appliedSearchData?.cityData?.id}
              cityName={appliedSearchData?.city}
              searchData={appliedSearchData}
              currentHotelId={payload?.hotelId}
            />
          </div>

          {/* Gallery Modal */}

          <ViewHotelModal
            open={isGalleryOpen}
            images={hotelImages}
            onClose={() => setIsGalleryOpen(false)}
          />

          {/* Session Expired */}
          <SessionExpiredModal
            open={sessionExpired}
            loading={reloadingHotels}
            onReload={handleReloadHotels}
          />
          {/* Sticky Bottom */}

          <div className="!bg-offer-gradient sticky bottom-0 z-50 p-1 shadow-xl lg:hidden">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  ₹{Number(FirstRoomPrice?.TotalAmount || 0).toLocaleString()}
                </h2>

                <p className="text-xs text-gray-500 text-white">
                  + Taxes & Fees
                </p>
              </div>
              <Drawer
                title="Select Room"
                placement="right"
                size="100%"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
              >
                <SlectRoom ratePlans={ratePlans} supplierData={supplierData} />
              </Drawer>

              <button
                onClick={() => setOpenDrawer(true)}
                className="rounded-lg bg-white px-6 py-2 text-sm font-bold text-[#0a6cff]"
              >
                SELECT ROOM
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HotelDetailsMobile;
