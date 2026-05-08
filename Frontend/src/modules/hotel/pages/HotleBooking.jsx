"use client";

import BlueHeader from "../components/hotlebooking/BlueHeader";
import BookingConfriom from "../components/hotlebooking/BookingConfriom";


export default function HotleBooking() {
  return (
    <div className="w-[100%] bg-[#eaf4fb] min-h-screen p-4 md:p-8 !pl-0 !pr-0">
       <BlueHeader/>
      <div className="!max-w-[1300px] mx-auto  gap-6 mt-[-95]">
        
        {/* LEFT SIDE */}
        <div className=" rounded-[22px] overflow-hidden">
         
          {/* HOTEL INFO */}
          <BookingConfriom />

        </div>
      </div>
    </div>
  );
}