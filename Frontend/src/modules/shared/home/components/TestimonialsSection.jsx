"use client";

import { MessageOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import Image from "next/image";
import Slider from "react-slick";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { testimonials } from "./data/TestimonialData";



export default function TestimonialsSection() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,

    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="overflow-hidden bg-[#EDF7FF] py-12 md:py-16 lg:py-24 !mt-[-125px]  mt-[-10px] ">
      <div className="mx-auto w-[92%] max-w-[1400px] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
        {/* Top Section */}
        <div className="mb-12 grid grid-cols-1 gap-8 lg:mb-16 lg:grid-cols-2 lg:items-start">
          {/* Left */}
          <div>
            <p className="text-lg font-medium text-[#3B9BC6] sm:text-xl md:text-2xl">
              Our Testimonial
            </p>

            <h2 className="mt-3 max-w-[650px] text-2xl leading-tight font-bold text-[#222] sm:text-3xl md:text-4xl">
              Real Feedback from Our Happy Travelers Worldwide
            </h2>
          </div>

          {/* Right */}
          <div className="lg:pl-10 xl:pl-20">
            <p className="max-w-[500px] text-base text-[#222] sm:text-lg">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC.
            </p>
          </div>
        </div>

        {/* Slider */}
        <Slider {...settings}>
          {testimonials.map((item) => (
            <div key={item.id} className="px-3 pt-10">
              <div className="relative rounded-[22px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                {/* Profile Image */}
                <div className="absolute -top-10 left-5 z-20 sm:left-6 ">
                  <div className="relative h-[70px] w-[70px] overflow-hidden rounded-full border-4 border-white shadow-md sm:h-[74px] sm:w-[74px] ">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="px-5 pt-16 pb-7 sm:px-6 sm:pb-8 ">
                  <div className="flex items-start justify-between gap-3 ">
                    <Rate
                      disabled
                      defaultValue={5}
                      className="text-[14px] sm:text-[18px]"
                    />

                    <MessageOutlined className="mb-5 text-[32px]! text-[#3B9BC6]! opacity-90 sm:text-[40px]!" />
                  </div>

                  <p className="mt-4 text-[15px] leading-[28px] font-medium text-[#222] sm:mt-5 sm:text-[16px] md:text-[17px]">
                    “{item.review}”
                  </p>
                </div>

                {/* Footer */}
                <div className="flex flex-wrap items-center gap-2 border-t border-gray-200 px-5 py-4 sm:px-6 sm:py-5">
                  <h4 className="text-[16px] font-bold text-[#222] sm:text-[18px]">
                    {item.name}
                  </h4>

                  <span className="text-sm text-gray-600 sm:text-base">
                    {item.country}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
