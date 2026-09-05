"use client";

import {
  HeartFilled,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Card, message } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";

import HotelDetailsSkeleton from "@/components/common/loder/HotelDetailsSkeleton";
import useIsMobile from "@/hooks/useIsMobile";
import { useAuthGuard } from "@/modules/auth/hooks/useAuthGuard";
import CMSContentRenderer from "@/modules/cms/renderer/CMSContentRenderer";
import { useHotelDetails } from "@/modules/hotel/hooks/useHotelDetails";
import { useSelectedHotelStore } from "@/modules/hotel/store/selectedHotel.store";
import { useToggleWishlist } from "@/modules/wishlist/hooks/useToggleWishlist";
import { useWishlistIds } from "@/modules/wishlist/hooks/useWishlistIds";

import SearchBar from "../components/hotels/SearchBar";
import HotelSectionsContent from "../components/hotels/viewhotles/HotelSectionsContent";
import HotelSectionsTabs from "../components/hotels/viewhotles/HotelSectionsTabs";
import ViewHotelGallery from "../components/hotels/viewhotles/ViewHotelGallery";
import ViewHotelInfo from "../components/hotels/viewhotles/ViewHotelInfo";
import ViewHotelModal from "../components/hotels/viewhotles/ViewHotelModal";
import ViewHotelPriceCard from "../components/hotels/viewhotles/ViewHotelPriceCard";
import ViewHotelTabs from "../components/hotels/viewhotles/ViewHotelTabs";

import HotelCmsSection from "../sections/HotelCmsSection";
import RelatedHotels from "../sections/RelatedHotels";
import DynamicHotelSeoFallback from "../seo/DynamicHotelSeoFallback";
import { useHotelBookingStore } from "../store/booking.store";
import { useHotelSearchStore } from "../store/serchData.store";
import { buildHotelDetailsPayload } from "../utils/buildHotelDetailsPayload";
import { buildWishlistPayload } from "../utils/buildWishlistPayload";
import { shareHotel } from "../utils/shareHotel";
import HotelDetailsMobile from "./HotelDetailsMobile";

function HotelDetails({ initialPayload = null, cms = null }) {
  const { selectedHotel } = useSelectedHotelStore();

  const { appliedSearchData } = useHotelSearchStore();

  const { setBookingData } = useHotelBookingStore();

  const [activeTab, setActiveTab] = useState("Rooms");

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const [sessionExpired] = useState(false);

  const [reloadingHotels] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const { requireAuth } = useAuthGuard();

  const { mutateAsync } = useToggleWishlist();

  const { data: wishlistData } = useWishlistIds();

  const isMobile = useIsMobile();

  /* -------------------------------------------------------------------------- */
  /*                            HOTEL DETAILS PAYLOAD                            */
  /* -------------------------------------------------------------------------- */

  const payload = useMemo(() => {
    return buildHotelDetailsPayload({
      selectedHotel,
      initialPayload,
    });
  }, [selectedHotel, initialPayload]);

  /* -------------------------------------------------------------------------- */
  /*                                  WISHLIST                                  */
  /* -------------------------------------------------------------------------- */

  const wishlistIds = useMemo(
    () => new Set(wishlistData || []),
    [wishlistData],
  );

  const hotelId = payload?.hotelId?.toString() || "";

  const isWishlisted = hotelId ? wishlistIds.has(hotelId) : false;

  /* -------------------------------------------------------------------------- */
  /*                               HOTEL DETAILS                                */
  /* -------------------------------------------------------------------------- */

  const isValidPayload = !!payload?.hotelId && !!payload?.hotelDetailId;

  const { data, isLoading, isFetching, refetch } = useHotelDetails(
    isValidPayload ? payload : null,
  );

  const showSkeleton = isLoading || isFetching;

  const hotelData = data ?? {};

  const supplierData = hotelData?.supplierResponse || {};

  const {
    HotelGallery = [],
    Amenities = "",
    RatePlanRecommendations,
  } = supplierData;

  const ratePlans = Array.isArray(RatePlanRecommendations)
    ? RatePlanRecommendations
    : [];

  const firstRatePlan = ratePlans[0] || null;

  const pricing = firstRatePlan?.PricingBreakdown ?? {};

  const {
    basePrice = 0,
    platformFeeAndTax = 0,
    finalPrice = 0,
    currencySymbol = "₹",
  } = pricing;

  const amenities = Amenities
    ? Amenities.split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  const hotelImages = HotelGallery;

  const hotelDetails = supplierData;

  /* -------------------------------------------------------------------------- */
  /*                                  SCROLL                                    */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 5;

      setIsScrolled((prev) => {
        if (prev !== scrolled) {
          return scrolled;
        }

        return prev;
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                              BOOKING STORE                                 */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (!supplierData?.HotelKey) {
      return;
    }

    if (!hotelData?.searchKey) {
      return;
    }

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

  /* -------------------------------------------------------------------------- */
  /*                                  ACTIONS                                   */
  /* -------------------------------------------------------------------------- */

  const handleReloadHotels = async () => {
    await refetch();
  };

  const handleWishlist = () => {
    requireAuth(async () => {
      try {
        const wishlistPayload = buildWishlistPayload({
          hotelId: payload?.hotelId,

          supplierData,

          searchData: appliedSearchData,

          hotelMeta: payload?.hotelMeta,

          pricing: {
            basePrice,
            platformFeeAndTax,
          },
        });

        await mutateAsync(wishlistPayload);

        message.success(
          isWishlisted ? "Removed from wishlist" : "Added to wishlist",
        );
      } catch {
        message.error("Wishlist update failed");
      }
    });
  };

  const handleShare = async () => {
    await shareHotel({
      hotelName: supplierData?.HotelName,

      cityName: appliedSearchData?.city,

      hotelId: payload?.hotelId,
    });
  };

  const handleSearch = useCallback(() => {}, []);

  /* -------------------------------------------------------------------------- */
  /*                                MOBILE                                      */
  /* -------------------------------------------------------------------------- */

  if (isMobile === null) {
    return <HotelDetailsSkeleton />;
  }

  if (isMobile) {
    return (
      <HotelDetailsMobile
        cms={cms}
        hotelData={hotelData}
        supplierData={supplierData}
        isLoading={isLoading}
        isFetching={isFetching}
        refetch={refetch}
        payload={payload}
        onWishlist={handleWishlist}
        onShare={handleShare}
        isWishlisted={isWishlisted}
      />
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                                DESKTOP                                     */
  /*                         1024PX AND ABOVE                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="min-h-screen w-full bg-[#eaf3f9]">
      {/* SEARCH BAR */}

      <SearchBar searchData={supplierData} onSearch={handleSearch} />

      {/* MAIN CONTAINER */}

      <div
        className={`relative mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-5 lg:px-6 xl:px-0 ${
          isScrolled ? "z-0" : "z-[820]"
        }`}
      >
        <div className="-mt-3">
          {showSkeleton ? (
            <HotelDetailsSkeleton />
          ) : (
            <Card className="overflow-visible rounded-md border-0 p-3 shadow-lg sm:p-4 md:p-5 lg:p-5 xl:p-6">
              {/* ---------------------------------------------------------------- */}
              {/* HEADER                                                          */}
              {/* ---------------------------------------------------------------- */}

              <div className="flex min-w-0 items-start justify-between gap-3 lg:gap-4">
                {/* HOTEL NAME + LOCATION */}

                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
                    <h1 className="min-w-0 truncate text-[20px] leading-tight font-semibold text-[#303030] lg:text-[23px] xl:text-[26px]">
                      {supplierData?.HotelName || "Hotel Name"}
                    </h1>

                    {(supplierData?.City || supplierData?.Country) && (
                      <span className="most-text-color max-w-full shrink-0 rounded-full bg-[#eef8fd] px-2 py-1 text-[11px] font-medium lg:px-3 lg:text-xs xl:text-sm">
                        {[supplierData?.City, supplierData?.Country]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    )}
                  </div>
                </div>

                {/* ACTION BUTTONS */}

                <div className="flex shrink-0 items-center gap-2 lg:gap-2.5">
                  <button
                    type="button"
                    onClick={handleWishlist}
                    aria-label="Wishlist"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white transition-all duration-200 hover:shadow-md active:scale-95 lg:h-10 lg:w-10 xl:h-11 xl:w-11"
                  >
                    <span
                      className={`inline-flex items-center justify-center transition-all duration-300 ${
                        isWishlisted
                          ? "scale-110 text-red-500"
                          : "text-gray-700 group-hover:scale-110"
                      }`}
                    >
                      {isWishlisted ? (
                        <HeartFilled className="text-[16px] lg:text-[18px] xl:text-[20px]" />
                      ) : (
                        <HeartOutlined className="text-[16px] lg:text-[18px] xl:text-[20px]" />
                      )}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    aria-label="Share hotel"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white transition-all duration-200 hover:shadow-md active:scale-95 lg:h-10 lg:w-10 xl:h-11 xl:w-11"
                  >
                    <ShareAltOutlined className="text-[16px] lg:text-[18px] xl:text-[19px]" />
                  </button>
                </div>
              </div>

              {/* ---------------------------------------------------------------- */}
              {/* GALLERY + PRICE CARD                                            */}
              {/* ---------------------------------------------------------------- */}

              <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] lg:items-start lg:gap-5 xl:gap-6">
                {/* LEFT SIDE */}

                <div className="min-w-0 self-start">
                  <ViewHotelGallery
                    images={hotelImages}
                    onOpen={() => setIsGalleryOpen(true)}
                  />

                  <div className="mt-5 lg:mt-6">
                    <ViewHotelTabs supplierData={supplierData} />
                  </div>
                </div>

                {/* RIGHT SIDE */}

                <div className="min-w-0 lg:sticky lg:top-24">
                  <ViewHotelPriceCard
                    ratePlans={ratePlans}
                    supplierData={supplierData}
                  />
                </div>
              </div>

              {/* ---------------------------------------------------------------- */}
              {/* HOTEL INFO                                                       */}
              {/* ---------------------------------------------------------------- */}

              <div className="mt-5 lg:mt-6">
                <ViewHotelInfo supplierData={supplierData} />
              </div>
            </Card>
          )}
        </div>

        {/* -------------------------------------------------------------------- */}
        {/* HOTEL SECTION TABS                                                   */}
        {/* -------------------------------------------------------------------- */}

        {!showSkeleton && (
          <>
            <div className="mt-3 lg:mt-6">
              <HotelSectionsTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* CONTENT                                                          */}
            {/* ---------------------------------------------------------------- */}

            <div className="mt-0">
              <HotelSectionsContent
                activeTab={activeTab}
                supplierData={supplierData}
                ratePlans={ratePlans}
                amenities={amenities}
                hotelDetails={hotelDetails}
              />
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* CMS                                                              */}
            {/* ---------------------------------------------------------------- */}

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

            {/* ---------------------------------------------------------------- */}
            {/* RELATED HOTELS                                                   */}
            {/* ---------------------------------------------------------------- */}

            <RelatedHotels
              cityId={appliedSearchData?.cityData?.id}
              cityName={appliedSearchData?.city}
              searchData={appliedSearchData}
              currentHotelId={payload?.hotelId}
            />
          </>
        )}
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* GALLERY MODAL                                                         */}
      {/* ---------------------------------------------------------------------- */}

      <ViewHotelModal
        open={isGalleryOpen}
        images={hotelImages}
        onClose={() => setIsGalleryOpen(false)}
      />

      {/* ---------------------------------------------------------------------- */}
      {/* SESSION EXPIRED MODAL                                                 */}
      {/* ---------------------------------------------------------------------- */}
{/* 
      <SessionExpiredModal
        open={sessionExpired}
        loading={reloadingHotels}
        onReload={handleReloadHotels}
      /> */}
    </div>
  );
}

export default HotelDetails;
