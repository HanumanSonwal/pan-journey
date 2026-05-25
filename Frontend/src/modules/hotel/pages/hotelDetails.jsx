"use client";

import {
  CheckCircleOutlined,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Card, Spin } from "antd";
import { useMemo, useState } from "react";
import SearchBar from "../components/hotels/SearchBar";
import HotelSectionsContent from "../components/hotels/viewhotles/HotelSectionsContent";
import HotelSectionsTabs from "../components/hotels/viewhotles/HotelSectionsTabs";
import SessionExpiredModal from "../components/hotels/viewhotles/SessionExpiredModal";
import ViewHotelGallery from "../components/hotels/viewhotles/ViewHotelGallery";
import ViewHotelInfo from "../components/hotels/viewhotles/ViewHotelInfo";
import ViewHotelModal from "../components/hotels/viewhotles/ViewHotelModal";
import ViewHotelPriceCard from "../components/hotels/viewhotles/ViewHotelPriceCard";
import ViewHotelTabs from "../components/hotels/viewhotles/ViewHotelTabs";
import { useHotelDetails } from "../hooks/useHotelDetails";
import { useHotelSessionRecovery } from "../hooks/useHotelSessionRecovery";
import { useSelectedHotelStore } from "../store/selectedHotel.store";

const HotelDetails = () => {
  const [activeTab, setActiveTab] = useState("Rooms");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { selectedHotel } = useSelectedHotelStore();

  const payload = useMemo(() => {
    if (!selectedHotel) return null;
    return {
      // hotelKey: selectedHotel?.hotelKey,
      // searchKey: selectedHotel?.searchKey,
        hotelId: selectedHotel?.hotelMeta?.hotelId,

      hotelMeta: {
        cityName: selectedHotel?.hotelMeta?.cityName,
        stateName: selectedHotel?.hotelMeta?.stateName,
        countryCode: selectedHotel?.hotelMeta?.countryCode,
      },
    };
  }, [selectedHotel]);

  const { data: hotelDetails, isLoading, error } = useHotelDetails(payload);
  const supplierData = hotelDetails?.supplierData || {};
  const pricingSummary = hotelDetails?.pricingSummary || {};
  const hotelImages = supplierData?.HotelGallery || [];
  const rawRatePlans = supplierData?.RatePlanRecommendations;

  const ratePlans = rawRatePlans || [];
  const amenities = supplierData?.Amenities?.split(",")?.filter(Boolean) || [];

  const { sessionExpired, reloadingHotels, handleReloadHotels } =
    useHotelSessionRecovery({
      hotelDetails,
      rawRatePlans,
    });

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center bg-[#eaf3f9]">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[70vh] items-center justify-center bg-[#eaf3f9]">
        <p className="text-base font-medium text-red-500">
          Failed to load hotel details
        </p>
      </div>
    );
  }

  if (!selectedHotel) {
    return (
      <div className="flex h-[70vh] items-center justify-center bg-[#eaf3f9]">
        <p className="text-base font-medium text-gray-500">No hotel selected</p>
      </div>
    );
  }

  console.log("hotelDetails", hotelDetails);
  console.log("supplierData", supplierData);
  console.log("pricingSummary", pricingSummary);
  console.log("ratePlans", ratePlans);
  console.log("amenities", amenities);

  return (
    <div className="min-h-screen w-full bg-[#eaf3f9]">
      {/* Search Bar */}
      <SearchBar />

      {/* Main Wrapper */}
      <div className="mx-auto w-full max-w-7xl px-2 pb-8 sm:px-4 md:px-6">
        {/* Top Card */}
        <div className="-mt-10">
          <Card className="overflow-hidden rounded border-0 shadow-lg">
            {/* Hotel Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              {/* LEFT */}
              <div className="flex min-w-0 items-start gap-3">
                {/* Verified */}
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef8fd]">
                  <CheckCircleOutlined className="text-[18px] text-[#5bb7ec]!" />
                </div>

                <div className="min-w-0">
                  {/* Hotel Name */}
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="mb-1! text-[26px] leading-tight font-semibold text-[#303030]">
                      {supplierData?.HotelName || "Hotel Name"}
                    </h1>
                  </div>

                  {/* City */}
                  <p className="mt-1! text-sm text-gray-500">
                    {[supplierData?.City, supplierData?.Country]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>
              </div>

              {/* RIGHT ACTIONS */}
              <div className="flex items-center gap-3">
                {/* Wishlist */}
                <button
                  onClick={() => console.log("wishlist clicked")}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d7e7f3] bg-white text-[#66b8ec] shadow-sm transition hover:border-[#0ea5e9] hover:bg-[#eef8fd]"
                >
                  <HeartOutlined className="text-[20px]" />
                </button>

                {/* Share */}
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
              {/* Gallery */}
              <div className="flex flex-col lg:col-span-2">
                <ViewHotelGallery
                  images={hotelImages}
                  onOpen={() => setIsGalleryOpen(true)}
                />
                <div className="mt-6">
                  <ViewHotelTabs supplierData={supplierData} />
                </div>
              </div>

              {/* Price Card */}
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
};

export default HotelDetails;
