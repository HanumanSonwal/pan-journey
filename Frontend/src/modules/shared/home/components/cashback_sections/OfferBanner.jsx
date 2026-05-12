"use client";

import Image from "next/image";

export default function OfferBanner() {
  return (
    <div className="mx-auto mt-[-10px] flex items-center justify-center bg-[#EDF7FF] px-4 py-8 md:px-6 md:py-10">
      <div className="relative h-[380px] w-full overflow-hidden rounded-[30px] md:h-[430px] lg:w-[85.87%]">
        <Image
          src="/images/cashback_banner.png"
          alt="banner"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 z-10 bg-black/10" />

        <Image
          src="/images/luggage.png"
          alt="luggage"
          width={600}
          height={600}
          className="absolute right-2 bottom-0 z-20 hidden h-auto w-[180px] drop-shadow-2xl sm:block md:right-4 md:w-[240px] lg:right-6 lg:w-[280px]"
        />

        {/* Offer Badge */}
        <div className="absolute top-4 left-4 z-20 h-[100px] w-[100px] md:top-6 md:left-6 md:h-[140px] md:w-[140px] lg:top-10 lg:left-10 lg:h-[180px] lg:w-[180px]">
          <Image
            src="/images/offer.png"
            alt="offer badge"
            fill
            className="rotate-[-15deg] object-contain"
          />
        </div>

        {/* Content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
          {/* Subtitle */}
          <p className="mb-2 text-[18px] text-gray-200 md:text-[22px] lg:text-[26px]">
            Lowest Deals Are Here
          </p>

          {/* Heading */}
          <h1 className="mb-4 text-[34px] leading-tight font-bold text-white md:text-[44px] lg:text-[56px]">
            Cashback Guaranteed
          </h1>

          {/* Description */}
          <p className="mb-6 max-w-[90%] text-sm leading-6 text-gray-200 md:max-w-xl md:text-[15px] lg:text-base">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>

          {/* Button */}
          <button className="h-[42px] w-[180px] rounded bg-white text-lg font-semibold text-[#72C0F0] shadow-lg transition-all duration-200 hover:scale-[1.02] hover:opacity-90 active:scale-[0.98] md:h-10 md:w-[200px] md:text-xl">
            Start Booking Now →
          </button>
        </div>
      </div>
    </div>
  );
}
