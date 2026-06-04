"use client";

import {
  CheckCircleOutlined,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import { useEffect, useMemo, useState } from "react";

import HotelDetailsSkeleton from "@/components/common/loder/HotelDetailsSkeleton";
import CMSContentRenderer from "@/modules/cms/renderer/CMSContentRenderer";
import { useHotelDetails } from "@/modules/hotel/hooks/useHotelDetails";
import { useSelectedHotelStore } from "@/modules/hotel/store/selectedHotel.store";
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
  const { searchData } = useHotelSearchStore();
  const { bookingData, setBookingData } = useHotelBookingStore();
  const [activeTab, setActiveTab] = useState("overview");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [sessionExpired] = useState(false);
  const [reloadingHotels] = useState(false);

  const payload = useMemo(() => {
    if (initialPayload) {
      return {
        ...initialPayload,
        hotelMeta: {
          cityName: searchData?.cityData?.id,
          stateName: searchData?.cityData?.state,
          countryCode: searchData?.cityData?.country,
        },
      };
    }
    return {
      hotelId: selectedHotel?.hotelMeta?.hotelId,
      hotelMeta: {
        cityName: selectedHotel?.hotelMeta?.cityName,
        stateName: selectedHotel?.hotelMeta?.stateName,
        countryCode: selectedHotel?.hotelMeta?.countryCode,
      },
      hotelKey: selectedHotel?.hotelKey,
      searchKey: selectedHotel?.searchKey,
    };
  }, [selectedHotel, initialPayload, searchData]);

  const { data, isLoading, isFetching, refetch } = useHotelDetails(payload);

  const showSkeleton = isLoading || isFetching;

  const hotelData = data || {};

  console.log("hotelData in  hotelDetail", hotelData.searchKey);
  const supplierData = hotelData?.supplierResponse || {};
  console.log("supplierData in  hotelDetail", supplierData.HotelKey);

  const pricingSummary = hotelData?.pricingSummary || {};
  const ratePlans = supplierData?.RatePlanRecommendations || [];
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
    if (!supplierData?.HotelKey || !hotelData?.searchKey) return;
    setBookingData({
      ...bookingData,
      selectedHotel: {
        ...(bookingData?.selectedHotel || {}),
        hotelKey: supplierData.HotelKey,
        searchKey: hotelData.searchKey,
      },
    });

    console.log("HOTEL KEY SAVED", supplierData.HotelKey);
    console.log("SEARCH KEY SAVED", hotelData.searchKey);
  }, [supplierData?.HotelKey, hotelData?.searchKey]);
  return (
    <div className="min-h-screen w-full bg-[#eaf3f9]">
      {/* ✅ ALWAYS VISIBLE */}
      <SearchBar />

      <div className="mx-auto w-full max-w-7xl px-2 pb-8 sm:px-4 md:px-6">
        <div className="mt-10">
          {/* ===================== SKELETON ONLY CONTENT ===================== */}
          {showSkeleton ? (
            <HotelDetailsSkeleton />
          ) : (
            <Card className="overflow-hidden rounded border-0 shadow-lg">
              {/* HEADER */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef8fd]">
                    <CheckCircleOutlined className="text-[18px] text-[#5bb7ec]!" />
                  </div>

                  <div className="min-w-0">
                    <h1 className="mb-1! text-[26px] font-semibold text-[#303030]">
                      {supplierData?.HotelName || "Hotel Name"}
                    </h1>

                    <p className="mt-1! text-sm text-gray-500">
                      {[supplierData?.City, supplierData?.Country]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex h-11 w-11 items-center justify-center rounded-full border bg-white">
                    <HeartOutlined className="text-[20px]" />
                  </button>

                  <button className="flex h-11 w-11 items-center justify-center rounded-full border bg-white">
                    <ShareAltOutlined className="text-[19px]" />
                  </button>
                </div>
              </div>

              {/* GALLERY + PRICE */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
                <div className="lg:col-span-2">
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
                    pricingSummary={pricingSummary}
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
                pricingSummary={pricingSummary}
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
              cityId={searchData?.cityData?.id}
              currentHotelId={payload?.hotelId}
              cityName={supplierData?.City}
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
