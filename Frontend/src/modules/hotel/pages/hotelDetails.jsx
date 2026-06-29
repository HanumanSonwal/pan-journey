"use client";

import { HeartOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";

import HotelDetailsSkeleton from "@/components/common/loder/HotelDetailsSkeleton";
import { useAuthGuard } from "@/modules/auth/hooks/useAuthGuard";
import CMSContentRenderer from "@/modules/cms/renderer/CMSContentRenderer";
import { useHotelDetails } from "@/modules/hotel/hooks/useHotelDetails";
import { useSelectedHotelStore } from "@/modules/hotel/store/selectedHotel.store";
import { useToggleWishlist } from "@/modules/wishlist/hooks/useToggleWishlist";
import { useWishlistIds } from "@/modules/wishlist/hooks/useWishlistIds";
import { slugify } from "@/utils/slug/slugify";
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

function HotelDetails({ initialPayload = null, cms = null }) {
  const { selectedHotel } = useSelectedHotelStore();
  const { appliedSearchData } = useHotelSearchStore();
  const { setBookingData } = useHotelBookingStore();
  const [activeTab, setActiveTab] = useState("overview");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [sessionExpired] = useState(false);
  const [reloadingHotels] = useState(false);
  const { requireAuth } = useAuthGuard();
  const { mutateAsync } = useToggleWishlist();
  const { data: wishlistData } = useWishlistIds();
  const searchParams = useSearchParams();

  const hid = searchParams.get("hid");
  const cityIdParam = searchParams.get("cityId");
  const stateNameParam = searchParams.get("stateName");
  const countryCodeParam = searchParams.get("countryCode");
  const hotelSlugParam = searchParams.get("hotelSlug");
  console.log("appliedSearchData in hotel-detail", appliedSearchData);

  const payload = useMemo(() => {
    if (selectedHotel?.fromWishlist) {
      return {
        hotelId: selectedHotel?.hotelMeta?.hotelId || hid,
        hotelMeta: {
          cityId: selectedHotel?.hotelMeta?.cityId || cityIdParam,
          stateName: selectedHotel?.hotelMeta?.stateName || stateNameParam,
          countryCode:
            selectedHotel?.hotelMeta?.countryCode || countryCodeParam,
        },
        searchContext: {
          fullName: selectedHotel?.hotelMeta?.hotelSlug || hotelSlugParam || "",
          CheckInDate: appliedSearchData?.checkIn,
          CheckOutDate: appliedSearchData?.checkOut,
          RoomCount: appliedSearchData?.rooms || 1,
        },
      };
    }
    if (initialPayload) {
      return {
        ...initialPayload,
        hotelMeta: {
          cityId: appliedSearchData?.cityData?.id,
          stateName: appliedSearchData?.cityData?.stateName,
          countryCode: appliedSearchData?.cityData?.countryCode,
        },
        searchContext: {
          fullName: initialPayload?.searchContext?.fullName || "",
          CheckInDate: appliedSearchData?.checkIn,
          CheckOutDate: appliedSearchData?.checkOut,
          RoomCount: appliedSearchData?.rooms,
        },
      };
    }
    return {
      hotelId: selectedHotel?.hotelMeta?.hotelId,
      hotelMeta: {
        cityId: selectedHotel?.hotelMeta?.cityId,
        stateName: selectedHotel?.hotelMeta?.stateName,
        countryCode: selectedHotel?.hotelMeta?.countryCode,
      },
      hotelKey: selectedHotel?.hotelKey,
      searchKey: selectedHotel?.searchKey,
    };
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
  const isWishlisted = wishlistIds.has(payload?.hotelId?.toString());

  console.log("selectedHotel", selectedHotel);
  console.log("payload in hotel-detail", payload);

  const isValidPayload = payload?.hotelId && payload?.hotelMeta?.cityId;

  const { data, isLoading, isFetching, refetch } = useHotelDetails(
    isValidPayload ? payload : null,
  );
  const showSkeleton = isLoading || isFetching;
  const hotelData = data || {};
  const supplierData = hotelData?.supplierResponse || {};
  const ratePlans = supplierData?.RatePlanRecommendations || [];
  const FirstRoomPrice = ratePlans?.[0];
  const hotelImages = supplierData?.HotelGallery || [];
  const amenities = supplierData?.Amenities
    ? supplierData.Amenities.split(",")
      .map((i) => i.trim())
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
              .map((item) => item.trim())
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

  const handleSearch = useCallback(() => { }, []);

  return (
    <div className="min-h-screen w-full bg-[#eaf3f9]">
      <SearchBar
  searchData={supplierData}
  onSearch={handleSearch}
/>

      <div
        className={`relative mx-auto w-full max-w-7xl px-2 !pt-5 transition-all duration-300 sm:px-4 sm:!pt-0 md:px-6 md:!pt-0 lg:!pt-0 xl:!pt-0 2xl:!pb-0 ${isScrolled ? "z-0" : "!z-[820]"
          }`}
      >
        <div className="-mt-3">
          {showSkeleton ? (
            <HotelDetailsSkeleton />
          ) : (
            <Card className="overflow-hidden rounded-md border-0 p-3 shadow-lg sm:p-6">
              {/* HEADER */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                    <h1 className="text-[18px] leading-tight font-semibold text-[#303030] sm:text-[26px]">
                      {supplierData?.HotelName || "Hotel Name"}
                    </h1>

                    {(supplierData?.City || supplierData?.Country) && (
                      <span className="w-fit rounded-full bg-[#eef8fd] px-2 py-1 !mb-4 sm:!mb-3 md:!mb-4 lg:!mb-0m xl:!mb-0  text-[11px] font-medium text-[#5bb7ec] sm:px-3 sm:text-sm">
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
                      className={`inline-flex items-center justify-center transition-all duration-300 ${isWishlisted
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

                  <button className="flex h-9 w-9 items-center justify-center rounded-full border bg-white sm:h-11 sm:w-11">
                    <ShareAltOutlined className="text-[16px] sm:text-[19px]" />
                  </button>
                </div>
              </div>

              {/* GALLERY + PRICE */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-start">
               <div className="lg:col-span-2 self-start">
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
  );
}

export default HotelDetails;
