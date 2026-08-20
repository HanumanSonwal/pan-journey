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
    icon: <SafetyOutlined className="most-text-color text-[32px]" />,
    title: "Safe & Trusted",
  },
];

export default function MobileTrustSection() {
  return (
    <section className="rounded-2xl border border-[#ECECEC] bg-white px-3 !py-3 shadow-lg">
      <div className="most-text-color grid grid-cols-3 gap-y-4">
        {trustItems.map((item) => (
          <div key={item.id} className="flex flex-col items-center text-center">
            {item.icon}

            <p className="most-text-color mt-2 text-[14px] leading-5 font-semibold">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
