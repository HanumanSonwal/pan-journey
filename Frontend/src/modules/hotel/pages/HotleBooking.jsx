"use client";

import { Spin } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import HotelBookingContent from "../components/hotel-booking/HotelBookingContent";
import { useRoomPricing } from "../hooks/useRoomPricing";

export default function HotleBooking() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const hotelDetailId = searchParams.get("hotelDetailId") || "";
  const roomId = searchParams.get("roomId") || "";

  const {
    data: roomPricingData,
    isLoading,
    isFetching,
    isError,
    error,
  } = useRoomPricing({
    hotelDetailId,
    roomId,
  });

  useEffect(() => {
    if (!hotelDetailId || !roomId) {
      router.replace("/hotels");
    }
  }, [hotelDetailId, roomId, router]);

  useEffect(() => {
    if (isError) {
      console.error("ROOM PRICING FETCH ERROR:", error);
    }
  }, [isError, error]);

  // Missing required params
  if (!hotelDetailId || !roomId) {
    return null;
  }

  // Loading state
  if (isLoading || isFetching) {
    return (
      <div className="background-color-bg flex min-h-screen w-full items-center justify-center overflow-x-hidden px-4">
        <Spin size="large" />
      </div>
    );
  }

  // Error state
  if (isError || !roomPricingData) {
    return (
      <div className="background-color-bg flex min-h-screen w-full flex-col items-center justify-center gap-4 overflow-x-hidden px-4 py-8 text-center">
        <h2 className="text-lg font-semibold sm:text-xl">
          Unable to load room details
        </h2>

        <p className="max-w-md text-sm text-gray-500 sm:text-base">
          Please go back and select the room again.
        </p>

        <button
          type="button"
          onClick={() => router.replace("/hotels")}
          className="buttion-background-color rounded-lg px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 sm:text-base"
        >
          Back To Hotels
        </button>
      </div>
    );
  }

  console.log("ROOM PRICING DATA:", roomPricingData);

  return (
    <main className="background-color-bg min-h-screen w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-full py-0">
        <HotelBookingContent
          hotelBookingData={roomPricingData}
          hotelDetailId={hotelDetailId}
          roomId={roomId}
        />
      </div>
    </main>
  );
}
