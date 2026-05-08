"use client";

import Image from "next/image";

export default function OfferBanner() {
  return (
    <div className="px-6 py-10 bg-[#EDF7FF] mx-auto flex justify-center items-center">
      <div className="relative rounded-[30px] overflow-hidden w-[85.87%] h-[430px]">
        <Image
          src="/images/cashback_banner.png"
          alt="banner"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0  z-10" />

        <Image
          src="/images/luggage.png"
          alt="luggage"
          width={600}
          height={600}
          className="absolute right-6 bottom-0 w-[280px] h-auto hidden md:block z-20 drop-shadow-2xl"
        />

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <p className="text-gray-200 text-[26px] line-100  mb-2">
            Lowest Deals Are Here
          </p>

          <h1 className="text-white text-[56px] md:text-5xl font-bold mb-4">
            Cashback Guaranteed
          </h1>

          <p className="text-gray-200 max-w-xl  text-sm md:text-base mb-6">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>

          <button
            className="text-[#72C0F0]!  rounded  font-semibold shadow-lg hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] w-[200px] h-10 flex items-center justify-center text-2xl transition-all duration-200"
            style={{
              background: "#fff",
            }}
          >
            Start Booking Now →
          </button>
        </div>

        <div className="absolute left-10 top-10 w-[180px] h-[180px] z-20">
          <Image
            src="/images/offer.png"
            alt="offer badge"
            fill
            className="object-contain rotate-[-15deg]"
          />
        </div>
      </div>
    </div>
  );
}
