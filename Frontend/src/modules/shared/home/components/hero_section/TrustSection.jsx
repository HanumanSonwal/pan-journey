"use client";

import {
  CustomerServiceOutlined,
  GlobalOutlined,
  SafetyCertificateOutlined,
  SafetyOutlined,
  TagsOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

const trustItems = [
  {
    id: 1,
    icon: (
      <SafetyCertificateOutlined
        className="text-[20px]"
        style={{ color: "#23437A" }}
      />
    ),
    title: "Secure Payments",
    description: "Your payment information is safe with us.",
  },
  {
    id: 2,
    icon: (
      <TrophyOutlined
        className="text-[20px]"
        style={{ color: "#F4A825" }}
      />
    ),
    title: "Best Price Guarantee",
    description: "Find a lower price? We'll match it for you.",
  },
  {
    id: 3,
    icon: (
      <CustomerServiceOutlined
        className="text-[20px]"
        style={{ color: "#23437A" }}
      />
    ),
    title: "24/7 Support",
    description: "We're here to help you anytime, anywhere.",
  },
  {
    id: 4,
    icon: (
      <TagsOutlined
        className="text-[20px]"
        style={{ color: "#F4A825" }}
      />
    ),
    title: "Easy Booking",
    description: "Book in just a few clicks with a hassle-free experience.",
  },
  {
    id: 5,
    icon: (
      <GlobalOutlined
        className="text-[20px]"
        style={{ color: "#23437A" }}
      />
    ),
    title: "Worldwide Coverage",
    description: "Thousands of destinations across the globe.",
  },
  {
    id: 6,
    icon: (
      <SafetyOutlined
        className="text-[20px]"
        style={{ color: "#F4A825" }}
      />
    ),
    title: "Safe & Trusted",
    description: "Trusted by millions of travelers worldwide.",
  },
];

export default function TrustSection() {
  return (
    <section
      className="
        absolute
        left-1/2
        -translate-x-1/2
        bottom-[-125px]
        z-20
        w-full
        max-w-[1240px]
        bg-[#fafafa]
        border
        border-[#e5e7eb]
        rounded-lg
        overflow-hidden
      "
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {trustItems.map((item, index) => (
          <div
            key={item.id}
            className={`
              flex
              items-start
              gap-2
              px-4
              py-3
              min-h-[78px]
              transition-all
              duration-300
              hover:bg-white
              ${index !== trustItems.length - 1
                ? "border-r border-[#e5e7eb]"
                : ""
              }
            `}
          >
            <div className="shrink-0 pt-[2px]">
              {item.icon}
            </div>

            <div>
              <h3 className="text-[13px] font-semibold leading-[18px] text-[#1F2937]">
                {item.title}
              </h3>

              <p className="mt-0.5 text-[11px] leading-[15px] text-[#6B7280]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}