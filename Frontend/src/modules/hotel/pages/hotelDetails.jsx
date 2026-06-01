"use client";

import {
  CheckCircleOutlined,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Card, Spin } from "antd";
import { useMemo, useState } from "react";

import CMSContentRenderer from "@/modules/cms/renderer/CMSContentRenderer";
import { useHotelDetails } from "@/modules/hotel/hooks/useHotelDetails";
import { useSelectedHotelStore } from "@/modules/hotel/store/selectedHotel.store";
import DynamicHotelSeoFallback from "../seo/DynamicHotelSeoFallback";
import HotelCmsSection from "../sections/HotelCmsSection";
import SearchBar from "../components/hotels/SearchBar";
import HotelSectionsContent from "../components/hotels/viewhotles/HotelSectionsContent";
import HotelSectionsTabs from "../components/hotels/viewhotles/HotelSectionsTabs";
import SessionExpiredModal from "../components/hotels/viewhotles/SessionExpiredModal";
import ViewHotelGallery from "../components/hotels/viewhotles/ViewHotelGallery";
import ViewHotelInfo from "../components/hotels/viewhotles/ViewHotelInfo";
import ViewHotelModal from "../components/hotels/viewhotles/ViewHotelModal";
import ViewHotelPriceCard from "../components/hotels/viewhotles/ViewHotelPriceCard";
import ViewHotelTabs from "../components/hotels/viewhotles/ViewHotelTabs";
import { useHotelSearchStore } from "../store/serchData.store";
import RelatedHotels from "../sections/RelatedHotels";

function HotelDetails({ initialPayload = null, cms = null }) {
  const { selectedHotel } = useSelectedHotelStore();
  const { searchData } = useHotelSearchStore();

  const [activeTab, setActiveTab] = useState("overview");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [sessionExpired] = useState(false);
  const [reloadingHotels] = useState(false);

  // SEO + Legacy payload support
  const payload = useMemo(() => {
    // SEO ROUTE
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
    // LEGACY FLOW
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

  console.log("DETAIL PAYLOAD", payload);

  const { data, isLoading, isFetching, refetch } = useHotelDetails(payload);

  if (isLoading || isFetching) {
    return (
      <div className="flex h-[70vh] items-center justify-center bg-[#eaf3f9]">
        <Spin size="large" />
      </div>
    );
  }

  const hotelData = data || {};
  const supplierData = hotelData?.supplierResponse || {};
  const pricingSummary = hotelData?.pricingSummary || {};
  const ratePlans = supplierData?.RatePlanRecommendations || [];
  const hotelImages = supplierData?.HotelGallery || [];
  const amenities = supplierData?.Amenities
    ? supplierData.Amenities.split(",")
        .map((i) => i.trim())
        .filter(Boolean)
    : [];

  const hotelDetails = supplierData || {};
  const handleReloadHotels = async () => {
    await refetch();
  };

  return (
    <div className="min-h-screen w-full bg-[#eaf3f9]">
      <SearchBar />
      <div className="mx-auto w-full max-w-7xl px-2 pb-8 sm:px-4 md:px-6">
        <div className="-mt-10">
          <Card className="overflow-hidden rounded border-0 shadow-lg">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef8fd]">
                  <CheckCircleOutlined className="text-[18px] text-[#5bb7ec]!" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="mb-1! text-[26px] leading-tight font-semibold text-[#303030]">
                      {supplierData?.HotelName || "Hotel Name"}
                    </h1>
                  </div>
                  <p className="mt-1! text-sm text-gray-500">
                    {[supplierData?.City, supplierData?.Country]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => console.log("wishlist clicked")}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d7e7f3] bg-white text-[#66b8ec] shadow-sm transition hover:border-[#0ea5e9] hover:bg-[#eef8fd]"
                >
                  <HeartOutlined className="text-[20px]" />
                </button>
                <button
                  onClick={() => console.log("share clicked")}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d7e7f3] bg-white text-[#66b8ec] shadow-sm transition hover:border-[#0ea5e9] hover:bg-[#eef8fd]"
                >
                  <ShareAltOutlined className="text-[19px]" />
                </button>
              </div>
            </div>

            {/* Gallery + Price */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
              <div className="flex flex-col lg:col-span-2">
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

            {/* Hotel Info */}
            <div className="mt-6">
              <ViewHotelInfo supplierData={supplierData} />
            </div>
          </Card>
        </div>

        {/* Section Tabs */}
        <div className="mt-6">
          <HotelSectionsTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* Section Content */}
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
        <HotelCmsSection>
          <div className="text-black">
            {cms ? (
              <CMSContentRenderer cms={cms} />
            ) : (
              <DynamicHotelSeoFallback
                hotelName={supplierData?.HotelName}
                cityName={supplierData?.City}
              />
            )}
          </div>
        </HotelCmsSection>

        <RelatedHotels
          cityId={searchData?.cityData?.id}
          currentHotelId={payload?.hotelId}
          cityName={supplierData?.City}
        />
      </div>

      {/* Gallery Modal */}
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
