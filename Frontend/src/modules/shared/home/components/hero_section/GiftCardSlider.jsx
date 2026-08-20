"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const giftCards = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    title: "Hurry Up",
    discount: "25 % Off",
    description: "on Disney Hotel",
    gift: "Gift Card",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80",
    title: "Hurry Up",
    discount: "25 % Off",
    description: "on Disney Hotel",
    gift: "Gift Card",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
    title: "Hurry Up",
    discount: "25 % Off",
    description: "on Disney Hotel",
    gift: "Gift Card",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80",
    title: "Hurry Up",
    discount: "25 % Off",
    description: "on Disney Hotel",
    gift: "Gift Card",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    title: "Hurry Up",
    discount: "25 % Off",
    description: "on Disney Hotel",
    gift: "Gift Card",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    title: "Hurry Up",
    discount: "25 % Off",
    description: "on Disney Hotel",
    gift: "Gift Card",
  },
];

export default function GiftCardSlider() {
  const [swiper, setSwiper] = useState(null);

  return (
    <section className="background-color-bg w-full py-4 sm:py-5">
      <div className="mx-auto w-full max-w-[1400px] px-2 sm:px-4 lg:px-17">
        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="mb-3 flex items-center justify-between sm:mb-4">
          <h2 className="text-[17px] font-bold text-[#05144B] sm:text-[19px] lg:text-[20px]">
            Gift Cards
          </h2>

          {/* ==========================================
              SLIDER BUTTONS
          ========================================== */}

          {giftCards.length > 1 && (
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* PREVIOUS */}

              <button
                type="button"
                onClick={() => swiper?.slidePrev()}
                aria-label="Previous gift cards"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-[#05144B] shadow-sm transition-all hover:bg-gray-50 active:scale-95 sm:h-8 sm:w-8"
              >
                <ChevronLeft size={15} className="sm:h-[17px] sm:w-[17px]" />
              </button>

              {/* NEXT */}

              <button
                type="button"
                onClick={() => swiper?.slideNext()}
                aria-label="Next gift cards"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-[#05144B] shadow-sm transition-all hover:bg-gray-50 active:scale-95 sm:h-8 sm:w-8"
              >
                <ChevronRight size={15} className="sm:h-[17px] sm:w-[17px]" />
              </button>
            </div>
          )}
        </div>

        {/* ==========================================
            SWIPER SLIDER
        ========================================== */}

        <div className="gift-card-swiper">
          <Swiper
            modules={[Autoplay]}
            onSwiper={setSwiper}
            spaceBetween={10}
            slidesPerView={1}
            allowTouchMove={true}
            simulateTouch={true}
            loop={giftCards.length > 4}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              /* ======================================
                 MOBILE
              ====================================== */

              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },

              /* ======================================
                 SMALL TABLET
              ====================================== */

              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },

              /* ======================================
                 TABLET
              ====================================== */

              768: {
                slidesPerView: 2,
                spaceBetween: 12,
              },

              /* ======================================
                 DESKTOP
              ====================================== */

              1024: {
                slidesPerView: 3,
                spaceBetween: 12,
              },

              /* ======================================
                 LARGE DESKTOP
              ====================================== */

              1280: {
                slidesPerView: 4,
                spaceBetween: 12,
              },
            }}
          >
            {giftCards.map((card) => (
              <SwiperSlide key={card.id}>
                <div className="group relative w-full overflow-hidden rounded-[6px] border border-[#e7e7e7] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_5px_12px_rgba(0,0,0,0.14)]">
                  {/* ==========================================
                      IMAGE
                  ========================================== */}

                  <div className="relative h-[100px] w-full overflow-hidden sm:h-[125px] md:h-[140px] lg:h-[170px]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33.33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />

                    {/* ==========================================
                        RED GIFT RIBBON
                    ========================================== */}

                    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
                      <svg
                        className="absolute -top-[10px] -left-[17px] h-[130px] w-[130px]"
                        viewBox="0 0 130 130"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* ======================================
                            DIAGONAL RIBBON
                        ====================================== */}

                        <path
                          d="M-25 125 L105 -25"
                          stroke="#e60000"
                          strokeWidth="9"
                          fill="none"
                        />

                        {/* Dark bottom edge */}

                        <path
                          d="M-25 129 L109 -25"
                          stroke="#a90000"
                          strokeWidth="2"
                          fill="none"
                        />

                        {/* Bright highlight */}

                        <path
                          d="M-22 121 L101 -22"
                          stroke="#ff4545"
                          strokeWidth="1.5"
                          fill="none"
                          opacity="0.9"
                        />

                        {/* ======================================
                            BOW
                        ====================================== */}

                        <g transform="rotate(-48 46 48)">
                          {/* LEFT LOOP */}

                          <path
                            d="
                              M45 47
                              C38 35 24 31 18 36
                              C12 41 19 51 29 55
                              C35 57 41 53 47 49
                              Z
                            "
                            fill="#e00000"
                          />

                          {/* LEFT DARK SHADOW */}

                          <path
                            d="
                              M44 48
                              C35 39 24 37 20 40
                              C25 46 34 51 44 52
                              Z
                            "
                            fill="#ad0000"
                          />

                          {/* LEFT HIGHLIGHT */}

                          <path
                            d="
                              M40 43
                              C33 37 25 36 22 39
                              C28 40 35 44 41 47
                              Z
                            "
                            fill="#ff3b3b"
                            opacity="0.75"
                          />

                          {/* RIGHT LOOP */}

                          <path
                            d="
                              M47 48
                              C56 35 70 32 77 37
                              C84 42 77 52 67 56
                              C60 58 53 53 45 49
                              Z
                            "
                            fill="#d90000"
                          />

                          {/* RIGHT DARK SHADOW */}

                          <path
                            d="
                              M49 48
                              C57 39 69 37 74 41
                              C69 47 59 52 49 53
                              Z
                            "
                            fill="#a90000"
                          />

                          {/* RIGHT HIGHLIGHT */}

                          <path
                            d="
                              M52 45
                              C59 39 69 38 73 41
                              C67 42 59 47 52 49
                              Z
                            "
                            fill="#ff3838"
                            opacity="0.7"
                          />

                          {/* LEFT TAIL */}

                          <path
                            d="
                              M44 52
                              L30 78
                              L40 72
                              L42 85
                              L52 54
                              Z
                            "
                            fill="#cf0000"
                          />

                          {/* LEFT TAIL SHADOW */}

                          <path
                            d="
                              M44 55
                              L34 76
                              L41 70
                              L43 79
                              Z
                            "
                            fill="#a90000"
                            opacity="0.65"
                          />

                          {/* RIGHT TAIL */}

                          <path
                            d="
                              M51 53
                              L66 78
                              L63 68
                              L77 73
                              L55 49
                              Z
                            "
                            fill="#df0000"
                          />

                          {/* RIGHT TAIL HIGHLIGHT */}

                          <path
                            d="
                              M54 55
                              L66 73
                              L63 65
                              Z
                            "
                            fill="#ff3636"
                            opacity="0.7"
                          />

                          {/* CENTER KNOT */}

                          <ellipse
                            cx="47"
                            cy="49"
                            rx="7"
                            ry="6"
                            fill="#a90000"
                          />

                          <ellipse
                            cx="46"
                            cy="48"
                            rx="5"
                            ry="4.5"
                            fill="#df0000"
                          />

                          <ellipse
                            cx="44.5"
                            cy="46.5"
                            rx="2"
                            ry="1.5"
                            fill="#ff5959"
                          />
                        </g>

                        {/* KNOT */}

                        <circle cx="46" cy="48" r="5" fill="#cf0000" />

                        <circle cx="45" cy="47" r="2" fill="#ff4444" />
                      </svg>
                    </div>
                  </div>

                  {/* ==========================================
                      CONTENT
                  ========================================== */}

                  <div className="bg-white px-[8px] pt-[2px] !pb-[1px] sm:px-[9px] sm:pt-[2px] sm:pb-[6px]">
                    {/* LABEL */}

                    <p className="!sm:text-[11px] !text-[15px] text-[#777]">
                      Great Offer deal
                    </p>

                    {/* OFFER */}

                    <p className="!text-[16px] leading-[1px] font-medium text-[#222] sm:text-[11px]">
                      {card.title}{" "}
                      <span className="font-semibold text-[#f01414]">
                        {card.discount}
                      </span>{" "}
                      {card.description}
                    </p>

                    {/* GIFT */}

                    <p className="!text-[14px] leading-[13px] text-[#222] sm:text-[10px] sm:leading-[14px]">
                      {card.gift}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* ==========================================
          SWIPER CSS
      ========================================== */}

      <style jsx global>{`
        .gift-card-swiper {
          width: 100%;
          overflow: hidden;
        }

        .gift-card-swiper .swiper {
          width: 100%;
          overflow: visible;
        }

        .gift-card-swiper .swiper-slide {
          height: auto;
        }

        @media (max-width: 639px) {
          .gift-card-swiper {
            padding: 0 2px;
          }
        }
      `}</style>
    </section>
  );
}
