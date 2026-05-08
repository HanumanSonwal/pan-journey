"use client";

import BookingConfriom from "../components/hotlebooking/BookingConfriom";


export default function HotleBooking() {
  return (
    <div className="w-full bg-[#eaf4fb] min-h-screen p-4 md:p-8">
      <div className="!max-w-[1300px] mx-auto  gap-6">
        
        {/* LEFT SIDE */}
        <div className="bg-white rounded-[22px] overflow-hidden border border-[#e5e7eb]">
          
          {/* HOTEL INFO */}
          <BookingConfriom />

          <div className="border-t border-[#ececec]" />

          {/* BOOKING DETAILS */}
          {/* <BookingDetails /> */}

          <div className="border-t border-[#ececec]" />

          {/* PACKAGE DETAILS */}
          {/* <PackageDetails /> */}
        </div>

        {/* RIGHT SIDE */}
        {/* <PriceBreakup /> */}
      </div>
    </div>
  );
}