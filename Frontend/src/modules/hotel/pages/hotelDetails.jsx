"use client";

import { Card, Spin } from "antd";
import { useMemo, useState } from "react";

import SearchBar from "../components/hotels/SearchBar";

import ViewHotelGallery from "../components/hotels/viewhotles/ViewHotelGallery";
import ViewHotelInfo from "../components/hotels/viewhotles/ViewHotelInfo";
import ViewHotelModal from "../components/hotels/viewhotles/ViewHotelModal";
import ViewHotelPriceCard from "../components/hotels/viewhotles/ViewHotelPriceCard";
import ViewHotelTabs from "../components/hotels/viewhotles/ViewHotelTabs";

import HotelSectionsContent from "../components/hotels/viewhotles/HotelSectionsContent";
import HotelSectionsTabs from "../components/hotels/viewhotles/HotelSectionsTabs";

import { useHotelDetails } from "../hooks/useHotelDetails";
import { useSelectedHotelStore } from "../store/selectedHotel.store";

const HotelDetails = () => {
  const [activeTab, setActiveTab] = useState("Room Options");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const { selectedHotel } = useSelectedHotelStore();

  const payload = useMemo(() => {
    if (!selectedHotel) return null;

    return {
      hotelKey: selectedHotel?.hotelKey,
      searchKey: selectedHotel?.searchKey,

      hotelMeta: {
        hotelId: selectedHotel?.hotelMeta?.hotelId,
        cityName: selectedHotel?.hotelMeta?.cityName,
        stateName: selectedHotel?.hotelMeta?.stateName,
        countryCode: selectedHotel?.hotelMeta?.countryCode,
      },
    };
  }, [selectedHotel]);

  const { data: hotelDetails, isLoading, error } = useHotelDetails(payload);

  // Optional safe data extraction
  const supplierData = hotelDetails?.supplierData ?? {};
  const pricingSummary = hotelDetails?.pricingSummary ?? {};
  const hotelImages = supplierData?.HotelGallery ?? [];
  const ratePlans = supplierData?.RatePlanRecommendations ?? [];

  // Loading State
  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center bg-[#eaf3f9]">
        <Spin size="large" />
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex h-[70vh] items-center justify-center bg-[#eaf3f9]">
        <p className="text-base font-medium text-red-500">
          Failed to load hotel details
        </p>
      </div>
    );
  }

  // No Hotel Selected
  if (!selectedHotel) {
    return (
      <div className="flex h-[70vh] items-center justify-center bg-[#eaf3f9]">
        <p className="text-base font-medium text-gray-500">No hotel selected</p>
      </div>
    );
  }

  console.log("selectedHotel", selectedHotel);

  console.log("payload", payload);

  return (
    <div className="min-h-screen w-full bg-[#eaf3f9]">
      {/* Search Bar */}
      <SearchBar />

      {/* Main Container */}
      <div className="mx-auto w-full max-w-7xl px-2 pb-8 sm:px-4 md:px-6">
        {/* Top Section */}
        <div className="-mt-10">
          <Card className="overflow-hidden rounded-2xl border-0 shadow-lg">
            {/* Gallery + Price */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ViewHotelGallery
                  images={hotelImages}
                  onOpen={() => setIsGalleryOpen(true)}
                />
              </div>

              <div className="lg:col-span-1">
                <ViewHotelPriceCard
                  pricingSummary={pricingSummary}
                  ratePlans={ratePlans}
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-6">
              <ViewHotelTabs />
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
    </div>
  );
};

export default HotelDetails;
