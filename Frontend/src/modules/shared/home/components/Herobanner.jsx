"use client";

import { Button } from "antd";
import HeroSearchButtons from "./SearchButton";




export default function OfferBanner() {
  return (

    <div className="px-6 py-10 bg-[#EDF7FF]  mx-auto  justify-center items-center flex">
      <div className="relative rounded-[30px] overflow-hidden w-[83%]">

        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          alt="banner"
          className="w-full h-[400px] object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Right Side Luggage Image */}
        <img
          src="https://pngimg.com/uploads/suitcase/suitcase_PNG10477.png"
          alt="luggage"
          className="absolute right-10 bottom-0 h-[300px] hidden md:block"
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">

          <p className="text-gray-200 text-lg mb-2">
            Lowest Deals Are Here
          </p>

          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
            Cashback Guaranteed
          </h1>

          <p className="text-gray-200 max-w-xl text-sm md:text-base mb-6">
            It is a long established fact that a reader will be distracted
            by the readable content of a page when looking at its layout.
          </p>

          {/* Ant Design Button */}
       <HeroSearchButtons />
        </div>

        {/* Offer Badge */}
        <div className="absolute left-10 top-10 bg-red-500 text-white px-6 py-6 rounded-full text-center w-[140px] h-[140px] flex flex-col justify-center items-center rotate-[-15deg] shadow-lg">
          <span className="text-xl">%</span>
          <span className="text-sm font-bold">GET THE BEST</span>
          <span className="text-sm font-bold">OFFER</span>
        </div>

      </div>
    </div>
  );
}

