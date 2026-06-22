"use client";

import Image from "next/image";

export default function OfferBanner() {
  return (
    <div className="mx-auto  flex items-center justify-center bg-[#EDF7FF] px-3 py-0 sm:px-4 sm:py-1 md:px-9 md:py-0 -mt-[40px] !sm:-mt-[92px] md:-mt-[48px] lg:-mt-[10px]">

      <div className="relative h-[260px] sm:h-[320px] md:h-[380px] lg:h-[430px] w-full overflow-hidden rounded-[20px] sm:rounded-[25px] md:rounded-[20px] lg:w-[85.87%]">

        {/* Background Image */}
        <Image
          src="/images/cashback_banner.png"
          alt="banner"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-black/10" />

        {/* Luggage Image (NOW VISIBLE ON MOBILE TOO) */}
        <Image
          src="/images/luggage.png"
          alt="luggage"
          width={600}
          height={600}
          className="absolute right-1 bottom-0 z-20
          w-[70px] sm:w-[100px] md:w-[180px] lg:w-[280px]
          h-auto drop-shadow-2xl"
        />

        {/* Offer Badge */}
        <div className="absolute top-2 left-2 z-20 h-[50px] w-[50px] 
          sm:top-4 sm:left-4 sm:h-[90px] sm:w-[90px]
          md:top-6 md:left-6 md:h-[140px] md:w-[140px]
          lg:top-10 lg:left-10 lg:h-[180px] lg:w-[180px]"
        >
          <Image
            src="/images/offer.png"
            alt="offer badge"
            fill
            className="rotate-[-15deg] object-contain"
          />
        </div>

        {/* Content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-3 text-center">

          {/* Subtitle */}
          <p className="mb-1 text-[13px] sm:text-[16px] md:text-[20px] lg:text-[26px] text-gray-200">
            Lowest Deals Are Here
          </p>

          {/* Heading */}
          <h1 className="mb-3 text-[20px] leading-tight font-bold text-white sm:text-[28px] md:text-[40px] lg:text-[56px]">
            Cashback Guaranteed
          </h1>

          {/* Description */}
          <p className="mb-4 max-w-[95%] sm:max-w-[85%] md:max-w-xl text-[11px] sm:text-sm md:text-[14px] lg:text-base leading-5 sm:leading-6 text-gray-200">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>

          {/* Button */}
          <button
            onClick={() =>
              document.getElementById("hero-search")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
            className="h-[34px] w-[140px] sm:h-[40px] sm:w-[170px] md:h-[42px] md:w-[200px]
            rounded bg-white text-[13px] sm:text-[16px] md:text-[18px]
            font-semibold !text-[#72C0F0] shadow-lg transition-all duration-200
            hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Booking →
          </button>

        </div>
      </div>
    </div>
  );
}
