"use client";

import { MessageOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "William Smith",
    country: "From India",
    image: "/images/testimonials.png",
    review:
      "Lorem ipsum dolor sit amet, consectetur lorem adipiscing elit. sed do eiusmod tem por ipsum incididunt ut labore et dolore magna aliqua lorem ipsum dolor.",
  },
  {
    id: 2,
    name: "William Smith",
    country: "From India",
    image: "/images/testimonials.png",
    review:
      "Lorem ipsum dolor sit amet, consectetur lorem adipiscing elit. sed do eiusmod tem por ipsum incididunt ut labore et dolore magna aliqua lorem ipsum dolor.",
  },
  {
    id: 3,
    name: "William Smith",
    country: "From India",
    image: "/images/testimonials.png",
    review:
      "Lorem ipsum dolor sit amet, consectetur lorem adipiscing elit. sed do eiusmod tem por ipsum incididunt ut labore et dolore magna aliqua lorem ipsum dolor.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="overflow-hidden bg-[#F5F7F9]  pb-16  md:pb-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Top Section */}
        <div className="mb-16 grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
          {/* Left */}
          <div>
            <p className="text-2xl font-medium text-[#3B9BC6]">
              Our Testimonial
            </p>

            <h2 className="mt-3 max-w-[650px] text-3xl leading-tight font-bold text-[#222] md:text-3xl">
              Real Feedback from Our Happy Travelers Worldwide
            </h2>
          </div>

          {/* Right */}
          <div className="lg:pl-20">
            <p className="max-w-[430px] text-lg  text-[#222]">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC.
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="relative rounded-[22px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            >
              <div className="absolute -top-10 left-6 z-20">
                <div className="relative h-[74px] w-[74px] overflow-hidden rounded-full border-4 border-white shadow-md">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pt-16 pb-8">
                {/* Quote Icon */}
                <div className="flex items-start justify-between">
                  <Rate disabled defaultValue={5} className="text-[18px]" />

                  <MessageOutlined className="text-[40px] mb-5 text-[#3B9BC6]! opacity-90" />
                </div>

                {/* Review */}
                <p className="mt-5 text-[17px]  font-medium text-[#222]">
                  “{item.review}”
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-4 border-t border-gray-200 px-6 py-5">
                <h4 className="text-[18px] font-bold text-[#222]">
                  {item.name}
                </h4>

                <span className=" text-gray-600">{item.country}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
