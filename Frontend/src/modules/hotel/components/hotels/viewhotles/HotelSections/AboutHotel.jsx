"use client";

import { BankOutlined, InfoCircleOutlined } from "@ant-design/icons";

const AboutHotel = ({ about }) => {
  const hasAbout = about?.trim();

  return (
    <div className="overflow-hidden rounded border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-[#e9f2f8] bg-[#f7fcff] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center most-boder-colour rounded most-text-color">
            <BankOutlined className="text-[18px]" />
          </div>

          <div>
            <h2 className="text-[15px] font-semibold text-gray-800">
              About Hotel
            </h2>

            <p className="mt-1 leading-7 text-gray-500">
              Property overview & stay information
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="rounded border border-[#e7f3fb] bg-[#f9fcfe] p-4">
          {/* Small Label */}
          <div className="mb-3 flex items-center gap-2 most-text-color ">
            <InfoCircleOutlined />

            <span className="!text-[15px] font-medium">Hotel Information</span>
          </div>

          {/* Description */}
          <p className="leading-7 whitespace-pre-line text-gray-600">
            {hasAbout
              ? about
              : "No hotel description available for this property."}
          </p>
        </div>

        {/* Bottom Info Strip */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#eef8fd] px-3 py-1 text-xs text-[#0ea5e9]">
            Property Overview
          </span>

          <span className="rounded-full bg-[#f3f4f6] px-3 py-1 text-xs text-gray-500">
            Stay Details
          </span>

          <span className="rounded-full bg-[#f3f4f6] px-3 py-1 text-xs text-gray-500">
            Guest Information
          </span>
        </div>
      </div>
    </div>
  );
};

export default AboutHotel;
