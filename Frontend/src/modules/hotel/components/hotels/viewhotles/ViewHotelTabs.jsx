"use client";

import {
  BankOutlined,
  EnvironmentOutlined,
  StarFilled,
} from "@ant-design/icons";

const ViewHotelTabs = ({ supplierData = {} }) => {
  const city = supplierData?.City || "";

  const cards = [
    {
      icon: <StarFilled className="text-[20px] text-[#f59e0b]" />,
      title: "Very Good",
      sub: "All Reviews",
      badge: "4.5",
      blue: true,
    },
    {
      icon: <BankOutlined className="text-[20px] text-[#0ea5e9]" />,
      title: "Property Highlights",
      sub: "Best features & stay benefits",
    },
    {
      icon: <EnvironmentOutlined className="text-[20px] text-[#0ea5e9]" />,
      title: "Nearby Attractions",
      sub: `Explore ${city || "location"}`,
    },
  ];

  return (
    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`flex h-[92px] items-center gap-3 rounded border px-4 py-3 shadow-sm transition duration-300 hover:shadow-md ${
            card.blue
              ? "border-[#8fc6e2] bg-[#f3fbff]"
              : "border-[#d8e7f0] bg-white hover:border-[#0ea5e9]"
          }`}
        >
          {/* Left Icon / Badge */}
          {card.badge ? (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-[#4ca7d8] text-sm font-semibold text-white">
              {card.badge}
            </div>
          ) : (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-[#eef8fd]">
              {card.icon}
            </div>
          )}

          {/* Text Only */}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-800">
              {card.title}
            </p>

            <p className="mt-1 truncate text-xs text-gray-500">{card.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewHotelTabs;
