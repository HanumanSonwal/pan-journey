"use client";

import {
  CustomerServiceOutlined,
  DollarOutlined,
  GiftOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import Image from "next/image";

const features = [
  {
    icon: <DollarOutlined />,
    title: "Best Price Guarantee",
    description:
      "Get the most competitive prices with complete transparency and zero hidden charges.",
  },
  {
    icon: <SafetyCertificateOutlined />,
    title: "Easy & Secure Booking",
    description:
      "Enjoy a smooth booking experience with trusted and secure payment methods.",
  },
  {
    icon: <CustomerServiceOutlined />,
    title: "24/7 Customer Support",
    description:
      "Our support team is always available to help whenever you need assistance.",
  },
  {
    icon: <GiftOutlined />,
    title: "Instant Cashback Rewards",
    description:
      "Earn exciting rewards and cashback benefits on every successful booking.",
  },
];

export default function WhySection() {
  return (
    <section className="overflow-hidden bg-[#EDF7FF] px-4 py-16 md:py-20">
      <div className="mx-auto w-[85.87%]">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <h2 className="text-3xl leading-tight font-bold tracking-[-0.02em] text-gray-900 sm:text-3xl md:text-4xl">
            Why Choose Our Platform
          </h2>

          <p className="mx-auto mt-4 max-w-[600px] text-sm leading-7 text-gray-600 sm:text-base md:text-lg">
            We’re committed to offering more than just products—we provide
            exceptional experiences.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
          {/* Left Image */}
          <div className="relative min-h-[320px] overflow-hidden rounded-[32px] shadow-xl sm:min-h-[450px] md:min-h-[560px]">
            <Image
              src="/images/whySection.png"
              alt="Luxury Resort"
              fill
              priority
              className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

            {/* Floating Card */}
            <div className="absolute right-5 bottom-5 left-5 rounded-2xl border border-white/40 bg-white/95 px-5 py-4 shadow-2xl backdrop-blur-md sm:w-fit">
              <p className="text-sm font-medium text-gray-500">
                Trusted by thousands of travelers
              </p>

              <div className="mt-1 flex items-center gap-3">
                <h4 className="text-2xl font-bold text-gray-900">4.9★</h4>

                <div className="h-10 w-[1px] bg-gray-200" />

                <p className="text-sm leading-5 text-gray-600">
                  Rated highly for service,
                  <br />
                  pricing & customer support
                </p>
              </div>
            </div>
          </div>

          {/* Right Features */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {features.map((item, index) => (
              <div
                key={index}
                className="group flex flex-col rounded-[28px] border border-white/60 bg-white p-6 shadow-[0_10px_35px_rgba(59,130,182,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(59,130,182,0.15)] md:p-7"
              >
                {/* Icon */}
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D9ECF8] bg-[#EDF7FF] text-[24px] text-[#3B82B6] transition-transform group-hover:scale-110">
                  {item.icon}
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl leading-7 font-bold tracking-[-0.01em] text-gray-900">
                  {item.title}
                </h3>

                <p className="text-sm leading-7 text-gray-600 md:text-[15px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
