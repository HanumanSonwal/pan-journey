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

  if (!hotelDetailId || !roomId) {
    return null;
  }

  if (isLoading || isFetching) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center background-color-bg">
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !roomPricingData) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 background-color-bg px-4 text-center">
        <h2 className="text-xl font-semibold">Unable to load room details</h2>

        <p className="text-sm text-gray-500">
          Please go back and select the room again.
        </p>

        <button
          type="button"
          onClick={() => router.replace("/hotels")}
          className="buttion-background-color rounded-lg px-5 py-2 text-white"
        >
          Back To Hotels
        </button>
      </div>
    );
  }

  console.log("ROOM PRICING DATA:", roomPricingData);

  return (
    <div className="min-h-screen w-full background-color-bg px-0 py-0 md:px-2 md:py-0">
      <HotelBookingContent
        hotelBookingData={roomPricingData}
        hotelDetailId={hotelDetailId}
        roomId={roomId}
      />
    </div>
  );
}
