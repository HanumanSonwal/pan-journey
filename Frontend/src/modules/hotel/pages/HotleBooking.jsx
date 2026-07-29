"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import HotelBookingContent from "../components/hotel-booking/HotelBookingContent";
import { useHotelBookingStore } from "../store/booking.store";

export default function HotleBooking() {
  const { bookingData } = useHotelBookingStore();

  console.log("bookingData in hotelBooking", bookingData);


  const router = useRouter();

  console.log("bookingData inhotelBooking", bookingData);

  useEffect(() => {
    if (!bookingData) {
      router.push("/hotels");
    }
  }, [bookingData, router]);

  if (!bookingData) {
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-[#eaf4fb] px-0 py-0 md:px-2 md:py-0">
      <HotelBookingContent hotelBookingData={bookingData} />
    </div>
  );
}
