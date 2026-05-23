"use client";

import { EnvironmentOutlined, InfoCircleOutlined } from "@ant-design/icons";

const ViewHotelInfo = ({ supplierData = {} }) => {
  const { AboutHotel, Address, City, Country, State } = supplierData;

  const mapQuery = `
    ${Address || ""}
    ${City || ""}
    ${State || ""}
    ${Country || ""}
  `;

  return (
    <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
      {/* LEFT INFO */}
      <div className="space-y-5 lg:col-span-2">
        {/* About */}
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef8fd] text-[#0ea5e9]">
              <InfoCircleOutlined />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                About Hotel
              </h2>

              <p className="text-sm text-gray-500">Property overview</p>
            </div>
          </div>

          <p className="leading-8 text-gray-600">
            {AboutHotel?.trim()
              ? AboutHotel
              : "No hotel description available."}
          </p>
        </div>

        {/* Address */}
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef8fd] text-[#0ea5e9]">
              <EnvironmentOutlined />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Hotel Address
              </h2>

              <p className="text-sm text-gray-500">Property location details</p>
            </div>
          </div>

          <div className="rounded-2xl bg-[#f8fbfd] p-4">
            <p className="leading-7 text-gray-700">
              {Address || "Address unavailable"}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              {[City, State, Country].filter(Boolean).join(", ")}
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT MAP */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <EnvironmentOutlined className="text-[#0ea5e9]" />
            View Map
          </h3>

          <p className="mt-1 text-sm text-gray-500">Explore hotel location</p>
        </div>

        <iframe
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            mapQuery,
          )}&output=embed`}
          title="hotel-map"
          loading="lazy"
          className="h-[380px] w-full"
        />
      </div>
    </div>
  );
};

export default ViewHotelInfo;
