"use client";

import Image from "next/image";

export default function OfferBanner() {
  return (
    <div className="px-4 md:px-6 py-8 md:py-10 bg-[#EDF7FF] mx-auto flex justify-center items-center  mt-[-10px]">

      {/* Banner */}
      <div className="relative rounded-[30px] overflow-hidden w-full lg:w-[85.87%] h-[380px] md:h-[430px]  ">

        {/* Background */}
        <Image
          src="/images/cashback_banner.png"
          alt="banner"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-black/10" />

        {/* Luggage Image */}
        <Image
          src="/images/luggage.png"
          alt="luggage"
          width={600}
          height={600}
          className="
            absolute 
            right-2 md:right-4 lg:right-6 
            bottom-0 
            w-[180px] md:w-[240px] lg:w-[280px] 
            h-auto 
            z-20 
            drop-shadow-2xl 
            hidden sm:block
          "
        />

        {/* Offer Badge */}
        <div className="absolute left-4 md:left-6 lg:left-10 top-4 md:top-6 lg:top-10 w-[100px] md:w-[140px] lg:w-[180px] h-[100px] md:h-[140px] lg:h-[180px] z-20">
          <Image
            src="/images/offer.png"
            alt="offer badge"
            fill
            className="object-contain rotate-[-15deg]"
          />
        </div>

        {/* Content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">

          {/* Subtitle */}
          <p className="text-gray-200 text-[18px] md:text-[22px] lg:text-[26px] mb-2">
            Lowest Deals Are Here
          </p>

          {/* Heading */}
          <h1 className="text-white text-[34px] md:text-[44px] lg:text-[56px] font-bold mb-4 leading-tight">
            Cashback Guaranteed
          </h1>

          {/* Description */}
          <p className="text-gray-200 max-w-[90%] md:max-w-xl text-sm md:text-[15px] lg:text-base mb-6 leading-6">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>

          {/* Button */}
          <button
            className="
              bg-white
              text-[#72C0F0]
              rounded
              font-semibold
              shadow-lg
              hover:opacity-90
              hover:scale-[1.02]
              active:scale-[0.98]
              transition-all
              duration-200

              w-[180px] md:w-[200px]
              h-[42px] md:h-10

              text-lg md:text-xl
            "
          >
            Start Booking Now →
          </button>
        </div>
      </div>
    </div>
  );
}
