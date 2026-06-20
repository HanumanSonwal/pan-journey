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
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="mt-[-10px] bg-[#EDF7FF] pt-10 pb-8 md:pt-12 md:pb-10 lg:mt-[-105px] lg:pt-16 lg:pb-12 overflow-hidden">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 items-center">
          <div>
            <p className="text-[21px] font-semibold text-[#3B9BC6]">
              Our Testimonial
            </p>

            <h2 className="mt-1 max-w-[550px] text-[24px] md:text-[30px] lg:text-[36px] font-bold leading-[1.15]">
              Real Feedback from Our Happy Travelers Worldwide
          </h2>
          </div>

          <div className="lg:pl-8">
            <p className="max-w-[500px] text-[19px] leading-6 text-gray-600">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC.
            </p>
          </div>
        </div>
        {/* Slider */}
        <div className="mt-8 lg:mt-14">
          <Slider {...settings}>
            {testimonials.map((item) => (
              <div key={item.id} className="px-2 lg:px-3 py-12">
                <div className="relative flex min-h-[300px] md:min-h-[320px] lg:min-h-[330px] flex-col rounded-[22px] bg-white shadow-[0_8px_25px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)]">

                  {/* Profile Image */}
                  <div className="absolute -top-10 left-6 z-10">
                    <div className="relative h-[74px] w-[74px] overflow-hidden rounded-full border-4 border-white shadow-md">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex-1 px-6 pt-16 pb-5">
                    <div className="flex items-center justify-between">
                      <Rate
                        disabled
                        defaultValue={5}
                        className="text-[16px]"
                      />

                      <MessageOutlined className="text-[42px] text-[#3B9BC6]" />
                    </div>

                    <p className="mt-4 text-[15px] leading-7 font-medium text-[#222] sm:text-[16px]">
                      "{item.review}"
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center gap-2 border-t border-gray-200 px-6 py-4">
                    <h3 className="text-[18px] font-bold text-[#222] sm:text-[20px]">
                      {item.name}
                    </h3>

                    <span className="text-[15px] text-gray-500">
                      {item.country}
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </Slider>
        </div>

      </div>
    </section>
  );
}