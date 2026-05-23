"use client";

import {
  BankOutlined,
  EnvironmentOutlined,
  StarFilled,
} from "@ant-design/icons";

const ViewHotelTabs = ({ supplierData = {} }) => {
  const city = supplierData?.City || "";

  return (
    <div className="mt-5 flex flex-wrap gap-3">
      {/* Rating */}
      <div className="flex items-center gap-3 rounded-2xl border border-[#8fc6e2] bg-[#f3fbff] px-4 py-3 shadow-sm transition hover:shadow-md">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4ca7d8] text-sm font-semibold text-white">
          4.5
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <StarFilled className="text-[#f59e0b]" />
            <span className="text-sm font-semibold text-gray-800">
              Very Good
            </span>
          </div>
          <span className="cursor-pointer text-xs text-[#0ea5e9] hover:underline">
            All Reviews
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-[#d8e7f0] bg-white px-4 py-3 shadow-sm transition hover:border-[#0ea5e9] hover:shadow-md">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef8fd]">
          <BankOutlined className="text-lg text-[#0ea5e9]" />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-800">
            Property Highlights
          </p>

          <p className="text-xs text-gray-500">Best features & stay benefits</p>
        </div>
      </div>

      {/* Nearby */}
      <div className="flex items-center gap-3 rounded-2xl border border-[#d8e7f0] bg-white px-4 py-3 shadow-sm transition hover:border-[#0ea5e9] hover:shadow-md">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef8fd]">
          <EnvironmentOutlined className="text-lg text-[#0ea5e9]" />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-800">
            Nearby Attractions
          </p>

          <p className="text-xs text-gray-500">Explore {city || "location"}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewHotelTabs;
