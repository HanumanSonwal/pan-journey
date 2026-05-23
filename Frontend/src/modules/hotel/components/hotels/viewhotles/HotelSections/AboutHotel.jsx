"use client";

import { BankOutlined, InfoCircleOutlined } from "@ant-design/icons";

const AboutHotel = ({ about }) => {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef8fd] text-[20px] text-[#0ea5e9]">
          <BankOutlined />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">About Hotel</h2>

          <p className="mt-1 text-sm text-gray-500">
            Property overview & stay information
          </p>
        </div>
      </div>

      {/* Content Card */}
      <div className="rounded-2xl border border-[#e8f2f8] bg-[#f9fcfe] p-5">
        <div className="mb-3 flex items-center gap-2 text-[#0ea5e9]">
          <InfoCircleOutlined />

          <span className="text-sm font-medium">Hotel Information</span>
        </div>

        <p className="leading-8 whitespace-pre-line text-gray-600">
          {about?.trim()
            ? about
            : "No hotel description available for this property."}
        </p>
      </div>
    </div>
  );
};

export default AboutHotel;
