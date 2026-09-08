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
// import { useHotelBookingStore } from "../store/booking.store";
import { useHotelSearchStore } from "../store/serchData.store";
import { buildHotelDetailsPayload } from "../utils/buildHotelDetailsPayload";
import { buildWishlistPayload } from "../utils/buildWishlistPayload";
import { shareHotel } from "../utils/shareHotel";

import HotelDetailsMobile from "./HotelDetailsMobile";

function HotelDetails({ initialPayload = null, cms = null }) {
  const { selectedHotel } = useSelectedHotelStore();
  const { appliedSearchData } = useHotelSearchStore();
  // const { setBookingData } = useHotelBookingStore();

  const [activeTab, setActiveTab] = useState("Rooms");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { requireAuth } = useAuthGuard();
  const { mutateAsync } = useToggleWishlist();
  const { data: wishlistData } = useWishlistIds();

  const isMobile = useIsMobile();

  const payload = useMemo(() => {
    return buildHotelDetailsPayload({
      selectedHotel,
      initialPayload,
    });
  }, [selectedHotel, initialPayload]);

  const wishlistIds = useMemo(() => {
    return new Set(wishlistData || []);
  }, [wishlistData]);

  const hotelId = payload?.hotelId?.toString() || "";

  const isWishlisted = hotelId ? wishlistIds.has(hotelId) : false;

  const isValidPayload =
    Boolean(payload?.hotelId) && Boolean(payload?.hotelDetailId);

  const { data, isLoading, isFetching, refetch } = useHotelDetails(
    isValidPayload ? payload : null,
  );

  const showSkeleton = isLoading || isFetching;

  const hotelData = data || {};
  const hotel = hotelData?.hotel || {};
  const details = hotelData?.details || {};

  const location = hotel?.location || {};
  const contact = hotel?.contact || {};
  const pricing = hotel?.pricing || {};
  const policy = hotel?.policy || {};
  const checkIn = hotel?.checkIn || {};
  const checkOut = hotel?.checkOut || {};

  const supplierData = useMemo(() => {
    return {
      HotelId: hotel?.hotelId || hotelId || "",
      hotelId: hotel?.hotelId || hotelId || "",

      HotelKey: hotel?.hotelKey || "",
      hotelKey: hotel?.hotelKey || "",

      HotelName: hotel?.name || "",
      hotelName: hotel?.name || "",

      Description: hotel?.description || "",
      description: hotel?.description || "",

      Address: location?.address || "",
      address: location?.address || "",

      City: location?.city || "",
      city: location?.city || "",

      State: location?.state || "",
      state: location?.state || "",

      Country: location?.country || "",
      country: location?.country || "",

      Pincode: location?.pincode || "",
      pincode: location?.pincode || "",

      Latitude: location?.latitude ?? null,
      latitude: location?.latitude ?? null,

      Longitude: location?.longitude ?? null,
      longitude: location?.longitude ?? null,

      Phone: contact?.phone || "",
      phone: contact?.phone || "",

      Email: contact?.email || "",
      email: contact?.email || "",

      HotelImage: hotel?.image || "",
      hotelImage: hotel?.image || "",

      StarCategory: hotel?.starCategory ?? 0,
      starCategory: hotel?.starCategory ?? 0,

      Facilities: Array.isArray(hotel?.facilities) ? hotel.facilities : [],

      facilities: Array.isArray(hotel?.facilities) ? hotel.facilities : [],

      Pricing: pricing,
      pricing,

      CheckIn: checkIn,
      checkIn,

      CheckOut: checkOut,
      checkOut,

      Policy: policy,
      policy,

      Supplier: hotel?.supplier || "",
      supplier: hotel?.supplier || "",

      AboutHotel: details?.aboutHotel || "",
      aboutHotel: details?.aboutHotel || "",

      Amenities: details?.amenities || [],
      amenities: details?.amenities || [],

      HotelGallery: Array.isArray(details?.gallery) ? details.gallery : [],

      gallery: Array.isArray(details?.gallery) ? details.gallery : [],

      ImportantInformation: details?.importantInformation || null,

      importantInformation: details?.importantInformation || null,

      Rooms: Array.isArray(details?.rooms) ? details.rooms : [],

      rooms: Array.isArray(details?.rooms) ? details.rooms : [],
    };
  }, [
    hotel,
    hotelId,
    location,
    contact,
    pricing,
    checkIn,
    checkOut,
    policy,
    details,
  ]);

  const hotelImages = useMemo(() => {
    const gallery = Array.isArray(details?.gallery) ? details.gallery : [];

    const images = gallery
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        return item?.url || item?.image || item?.src || "";
      })
      .filter(Boolean);

    if (images.length) {
      return images;
    }

    return hotel?.image ? [hotel.image] : [];
  }, [details?.gallery, hotel?.image]);

  const amenities = useMemo(() => {
    const rawAmenities = details?.amenities;

    if (Array.isArray(rawAmenities)) {
      return rawAmenities
        .map((item) => {
          if (typeof item === "string") {
            return item;
          }

          return item?.name || item?.title || item?.description || "";
        })
        .filter(Boolean);
    }

    if (typeof rawAmenities === "string") {
      return rawAmenities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    if (Array.isArray(hotel?.facilities)) {
      return hotel.facilities
        .map((item) => {
          if (typeof item === "string") {
            return item;
          }

          return item?.name || item?.title || "";
        })
        .filter(Boolean);
    }

    return [];
  }, [details?.amenities, hotel?.facilities]);

  const ratePlans = useMemo(() => {
    const rooms = Array.isArray(details?.rooms) ? details.rooms : [];

    if (rooms.length) {
      return rooms;
    }

    return [
      {
        HotelId: hotel?.hotelId || hotelId || "",

        HotelKey: hotel?.hotelKey || "",

        HotelName: hotel?.name || "",

        PricingBreakdown: {
          basePrice: Number(pricing?.basicAmount || 0),

          platformFeeAndTax: Number(pricing?.tax || 0),

          finalPrice: Number(pricing?.totalAmount || 0),

          currencySymbol: pricing?.currency || "₹",
        },

        pricing: {
          basicAmount: Number(pricing?.basicAmount || 0),

          tax: Number(pricing?.tax || 0),

          totalAmount: Number(pricing?.totalAmount || 0),

          serviceFee: Number(pricing?.serviceFee || 0),

          markup: Number(pricing?.markup || 0),

          gst: Number(pricing?.gst || 0),

          currency: pricing?.currency || "INR",
        },
      },
    ];
  }, [
    details?.rooms,
    hotel?.hotelId,
    hotel?.hotelKey,
    hotel?.name,
    hotelId,
    pricing,
  ]);

  const firstRatePlan = ratePlans?.[0] || null;

  const pricingBreakdown = firstRatePlan?.PricingBreakdown || {};

  const basePrice = Number(
    pricingBreakdown?.basePrice ?? pricing?.basicAmount ?? 0,
  );

  const platformFeeAndTax = Number(
    pricingBreakdown?.platformFeeAndTax ?? pricing?.tax ?? 0,
  );

  const finalPrice = Number(
    pricingBreakdown?.finalPrice ?? pricing?.totalAmount ?? 0,
  );

  const currencySymbol =
    pricingBreakdown?.currencySymbol || pricing?.currency || "₹";

  const hotelDetails = useMemo(() => {
    return {
      ...details,
      aboutHotel: details?.aboutHotel || "",
      amenities: details?.amenities || [],
      gallery: details?.gallery || [],
      importantInformation: details?.importantInformation || null,
      rooms: details?.rooms || [],
    };
  }, [details]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 5;

      setIsScrolled((previous) => {
        if (previous !== scrolled) {
          return scrolled;
        }

        return previous;
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

  // useEffect(() => {
  //   if (!hotel?.hotelKey) {
  //     return;
  //   }

  //   setBookingData({
  //     supplierData,

  //     searchData: appliedSearchData,

  //     selectedHotel: {
  //       hotelId: hotel?.hotelId || hotelId,

  //       hotelDetailId: payload?.hotelDetailId || "",

  //       hotelKey: hotel?.hotelKey || "",

  //       hotelName: hotel?.name || "",

  //       hotelImage: hotel?.image || "",

  //       address: location?.address || "",

  //       city: location?.city || "",

  //       state: location?.state || "",

  //       country: location?.country || "",
  //     },
  //   });
  // }, [
  //   hotel,
  //   hotelId,
  //   payload?.hotelDetailId,
  //   supplierData,
  //   appliedSearchData,
  //   setBookingData,
  //   location,
  // ]);

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
      hotelName: hotel?.name || "",
      cityName: location?.city || appliedSearchData?.city || "",
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
    <div className="min-h-screen w-full bg-[#eaf3f9]">
      <SearchBar searchData={supplierData} onSearch={handleSearch} />

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
              <div className="flex min-w-0 items-start justify-between gap-3 lg:gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
                    <h1 className="min-w-0 truncate text-[20px] leading-tight font-semibold text-[#303030] lg:text-[23px] xl:text-[26px]">
                      {hotel?.name || "Hotel Name"}
                    </h1>

                    {(location?.city || location?.country) && (
                      <span className="most-text-color max-w-full shrink-0 rounded-full bg-[#eef8fd] px-2 py-1 text-[11px] font-medium lg:px-3 lg:text-xs xl:text-sm">
                        {[location?.city, location?.country]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    )}
                  </div>
                </div>

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

              <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] lg:items-start lg:gap-5 xl:gap-6">
                <div className="min-w-0 self-start">
                  <ViewHotelGallery
                    images={hotelImages}
                    onOpen={() => setIsGalleryOpen(true)}
                  />

                  <div className="mt-5 lg:mt-6">
                    <ViewHotelTabs supplierData={supplierData} />
                  </div>
                </div>

                <div className="min-w-0 lg:sticky lg:top-24">
                  <ViewHotelPriceCard
                    ratePlans={ratePlans}
                    supplierData={supplierData}
                    hotelDetailId={payload?.hotelDetailId || ""}
                  />
                </div>
              </div>

              <div className="mt-5 lg:mt-6">
                <ViewHotelInfo supplierData={supplierData} />
              </div>
            </Card>
          )}
        </div>

        {!showSkeleton && (
          <>
            <div className="mt-3 lg:mt-6">
              <HotelSectionsTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>

            <div className="mt-0">
              <HotelSectionsContent
                activeTab={activeTab}
                supplierData={supplierData}
                ratePlans={ratePlans}
                amenities={amenities}
                hotelDetails={hotelDetails}
                hotelDetailId={payload?.hotelDetailId || ""}
              />
            </div>

            <HotelCmsSection>
              {cms ? (
                <CMSContentRenderer cms={cms} />
              ) : (
                <DynamicHotelSeoFallback
                  hotelName={hotel?.name}
                  cityName={location?.city}
                />
              )}
            </HotelCmsSection>

            <RelatedHotels
              cityId={appliedSearchData?.cityData?.id}
              cityName={appliedSearchData?.city}
              searchData={appliedSearchData}
              currentHotelId={payload?.hotelId}
            />
          </>
        )}
      </div>

      <ViewHotelModal
        open={isGalleryOpen}
        images={hotelImages}
        onClose={() => setIsGalleryOpen(false)}
      />
    </div>
  );
}

export default HotelDetails;
