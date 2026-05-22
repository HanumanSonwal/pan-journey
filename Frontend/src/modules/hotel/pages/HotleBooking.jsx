"use client";

import BookingConfriom from "../components/hotlebooking/BookingConfriom";
export default function HotleBooking() {
  return (
    <div className="min-h-screen w-full bg-[#eaf4fb] p-4 md:p-8">
      <div className="mx-auto !max-w-[1300px] gap-6">
        {/* LEFT SIDE */}
        <div className="overflow-hidden rounded-[22px] border border-[#e5e7eb] bg-white">
          {/* HOTEL INFO */}
          <BookingConfriom />

          <div className="border-t border-[#ececec]" />

          {/* BOOKING DETAILS */}
          {/* <BookingDetails /> */}

          <div className="border-t border-[#ececec]" />

          {/* PACKAGE DETAILS */}
          {/* <PackageDetails /> */}
        </div>
      </div>
    </div>
  );
}
