"use client";

import { HeartOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";

import HotelDetailsSkeleton from "@/components/common/loder/HotelDetailsSkeleton";
import useIsMobile from "@/hooks/useIsMobile";
import { useAuthGuard } from "@/modules/auth/hooks/useAuthGuard";
import CMSContentRenderer from "@/modules/cms/renderer/CMSContentRenderer";
import { useHotelDetails } from "@/modules/hotel/hooks/useHotelDetails";
import { useSelectedHotelStore } from "@/modules/hotel/store/selectedHotel.store";
import { useToggleWishlist } from "@/modules/wishlist/hooks/useToggleWishlist";
import { useWishlistIds } from "@/modules/wishlist/hooks/useWishlistIds";
import { HeartFilled } from "@ant-design/icons";
import { message } from "antd";
import { useSearchParams } from "next/navigation";
import SearchBar from "../components/hotels/SearchBar";
import HotelSectionsContent from "../components/hotels/viewhotles/HotelSectionsContent";
import HotelSectionsTabs from "../components/hotels/viewhotles/HotelSectionsTabs";
import SessionExpiredModal from "../components/hotels/viewhotles/SessionExpiredModal";
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
  const { requireAuth } = useAuthGuard();
  const { mutateAsync } = useToggleWishlist();
  const { data: wishlistData } = useWishlistIds();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();
  const hid = searchParams.get("hid");
  const cityIdParam = searchParams.get("cityId");
  const stateNameParam = searchParams.get("stateName");
  const countryCodeParam = searchParams.get("countryCode");
  const hotelSlugParam = searchParams.get("hotelSlug");

  const payload = useMemo(() => {
    return buildHotelDetailsPayload({
      selectedHotel,
      initialPayload,
      appliedSearchData,
      hid,
      cityIdParam,
      stateNameParam,
      countryCodeParam,
      hotelSlugParam,
    });
  }, [
    selectedHotel,
    initialPayload,
    appliedSearchData,
    hid,
    cityIdParam,
    stateNameParam,
    countryCodeParam,
    hotelSlugParam,
  ]);

  const wishlistIds = useMemo(
    () => new Set(wishlistData || []),
    [wishlistData],
  );
  const hotelId = payload?.hotelId?.toString();
  const isWishlisted = hotelId ? wishlistIds.has(hotelId) : false;

  const isValidPayload = payload?.hotelId && payload?.hotelMeta?.cityId;
  const { data, isLoading, isFetching, refetch } = useHotelDetails(
    isValidPayload ? payload : null,
  );

  const showSkeleton = isLoading || isFetching;
  const hotelData = data ?? {};
  const supplierData = hotelData?.supplierResponse ?? {};

  const {
    HotelGallery = [],
    Amenities = "",
    RatePlanRecommendations,
  } = supplierData;

  console.log("supplierData", supplierData);
  console.log("RatePlanRecommendations", supplierData?.RatePlanRecommendations);

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

  const handleReloadHotels = async () => {
    await refetch();
  };

  console.log("Rate Plans", ratePlans);
  console.log("Pricing", pricing);

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
  const [isScrolled, setIsScrolled] = useState(false);

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

    handleScroll(); // Initial check

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleWishlist = () => {
    requireAuth(async () => {
      console.log("payload", payload);
      console.log("payload.hotelId", payload?.hotelId);
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
        console.log("Wishlist Payload", wishlistPayload);
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

  return (
    <>
      <div className="min-h-screen w-full bg-[#eaf3f9]">
        <SearchBar searchData={supplierData} onSearch={handleSearch} />
        <div
          className={`relative mx-auto w-full max-w-7xl ${
            isScrolled ? "z-0" : "z-[820]"
          }`}
        >
          <div className="-mt-3">
            {showSkeleton ? (
              <HotelDetailsSkeleton />
            ) : (
              <Card className="overflow-visible rounded-md border-0 p-3 shadow-lg sm:p-6">
                {/* HEADER */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                      <h1 className="text-[18px] leading-tight font-semibold text-[#303030] sm:text-[26px]">
                        {supplierData?.HotelName || "Hotel Name"}
                      </h1>

                      {(supplierData?.City || supplierData?.Country) && (
                        <span className="lg:!mb-0m most-text-color !mb-4 w-fit rounded-full bg-[#eef8fd] px-2 py-1 text-[11px] font-medium sm:!mb-3 sm:px-3 sm:text-sm md:!mb-4 xl:!mb-0">
                          {[supplierData?.City, supplierData?.Country]
                            .filter(Boolean)
                            .join(", ")}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={handleWishlist}
                      className="group flex h-9 w-9 items-center justify-center rounded-full border bg-white transition-all duration-200 hover:shadow-md active:scale-95 sm:h-11 sm:w-11"
                    >
                      <span
                        className={`inline-flex items-center justify-center transition-all duration-300 ${
                          isWishlisted
                            ? "scale-110 text-red-500"
                            : "text-gray-700 group-hover:scale-110"
                        }`}
                      >
                        {isWishlisted ? (
                          <HeartFilled className="text-[16px] sm:text-[20px]" />
                        ) : (
                          <HeartOutlined className="text-[16px] sm:text-[20px]" />
                        )}
                      </span>
                    </button>
                    <button
                      onClick={handleShare}
                      className="flex h-9 w-9 items-center justify-center rounded-full border bg-white transition-all duration-200 hover:shadow-md active:scale-95 sm:h-11 sm:w-11"
                    >
                      <ShareAltOutlined className="text-[16px] sm:text-[19px]" />
                    </button>
                  </div>
                </div>

                {/* GALLERY + PRICE */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-start">
                  <div className="self-start lg:col-span-2">
                    <ViewHotelGallery
                      images={hotelImages}
                      onOpen={() => setIsGalleryOpen(true)}
                    />

                    <div className="mt-6">
                      <ViewHotelTabs supplierData={supplierData} />
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <ViewHotelPriceCard
                      ratePlans={ratePlans}
                      supplierData={supplierData}
                    />
                  </div>
                </div>

                {/* INFO */}
                <div className="mt-6">
                  <ViewHotelInfo supplierData={supplierData} />
                </div>
              </Card>
            )}
          </div>

          {/* TABS */}
          {!showSkeleton && (
            <>
              <div className="mt-6">
                <HotelSectionsTabs
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </div>

              {/* CONTENT */}
              <div className="mt-4">
                <HotelSectionsContent
                  activeTab={activeTab}
                  supplierData={supplierData}
                  ratePlans={ratePlans}
                  amenities={amenities}
                  hotelDetails={hotelDetails}
                />
              </div>

              {/* CMS */}
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

              {/* RELATED */}
              <RelatedHotels
                cityId={appliedSearchData?.cityData?.id}
                cityName={appliedSearchData?.city}
                searchData={appliedSearchData}
                currentHotelId={payload?.hotelId}
              />
            </>
          )}
        </div>

        {/* MODALS (always outside) */}
        <ViewHotelModal
          open={isGalleryOpen}
          images={hotelImages}
          onClose={() => setIsGalleryOpen(false)}
        />

        <SessionExpiredModal
          open={sessionExpired}
          loading={reloadingHotels}
          onReload={handleReloadHotels}
        />
      </div>
    </>
  );
}

export default HotelDetails;
