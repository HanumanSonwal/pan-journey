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
        className="text-[22px]"
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
        className="text-[22px]"
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
        className="text-[22px]"
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
        className="text-[22px]"
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
        className="text-[22px]"
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
        className="text-[22px]"
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
    bottom-[-150px]
    left-1/2
    z-20
    w-full
    max-w-[1240px]
    -translate-x-1/2
    border
    border-[#e5e7eb]
    bg-[#fafafa]
  "
    >
      <div className=" mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {trustItems.map((item, index) => (
            <div
              key={item.id}
              className={`flex items-start gap-3 px-5 py-5 min-h-[100px]
                ${index !== trustItems.length - 1
                  ? "border-r border-[#e5e7eb]"
                  : ""
                }
                hover:bg-white transition-all duration-300`}
            >
              <div className="shrink-0 mt-1">{item.icon}</div>

              <div>
                <h3 className="text-[13px] font-semibold text-[#1F2937] leading-[18px]">
                  {item.title}
                </h3>

                <p className="mt-1 text-[11px] leading-[16px] text-[#6B7280]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}