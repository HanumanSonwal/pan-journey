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
    icon: <SafetyCertificateOutlined className="text-[32px] text-[#0A1F5C]" />,
    title: "Secure Payments",
  },
  {
    id: 2,
    icon: <TrophyOutlined className="text-[32px] text-[#0A1F5C]" />,
    title: "Best Price",
  },
  {
    id: 3,
    icon: <CustomerServiceOutlined className="text-[32px] text-[#0A1F5C]" />,
    title: "24/7 Support",
  },
  {
    id: 4,
    icon: <TagsOutlined className="text-[32px] text-[#0A1F5C]" />,
    title: "Easy Booking",
  },
  {
    id: 5,
    icon: <GlobalOutlined className="text-[32px] text-[#0A1F5C]" />,
    title: "Worldwide",
  },
  {
    id: 6,
    icon: <SafetyOutlined className="text-[32px] text-[#0A1F5C]" />,
    title: "Safe & Trusted",
  },
];

export default function MobileTrustSection() {
  return (
    <section
      className="
        absolute
        left-1/2
        top-155
        -translate-x-1/2
        -translate-y-2
        z-20
        w-[92%]
        rounded-2xl
        bg-white
        shadow-lg
        border
        border-[#ECECEC]
        px-3
        py-3
      "
    >
      <div className="grid grid-cols-3 gap-y-4 most-text-color">
        {trustItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center text-center"
          >
            {item.icon}

            <p className="mt-2 text-[14px] font-semibold most-text-color leading-5">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}