"use client";

import {
  CompassOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const ViewHotelInfo = ({ supplierData = {} }) => {
  const { AboutHotel, Address, City, Country, State } = supplierData;

  const mapQuery = [Address, City, State, Country].filter(Boolean).join(", ");

  const googleMapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    mapQuery,
  )}`;

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* LEFT */}
      <div className="space-y-4 lg:col-span-2">
        {/* About */}
        <div className="rounded border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-[#eef8fd] text-[#0ea5e9]">
              <InfoCircleOutlined />
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-gray-800">
                About Hotel
              </h2>

              <p className="text-xs text-gray-500">Property overview</p>
            </div>
          </div>

          <p className="line-clamp-6 leading-7 text-gray-600">
            {AboutHotel?.trim()
              ? AboutHotel
              : "No hotel description available."}
          </p>
        </div>

        {/* Address */}
        <div className="rounded border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-[#eef8fd] text-[#0ea5e9]">
              <EnvironmentOutlined />
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-gray-800">
                Hotel Address
              </h2>

              <p className="text-xs text-gray-500">Location details</p>
            </div>
          </div>

          <div className="rounded bg-[#f8fbfd] p-3">
            <p className="leading-6 text-gray-700">
              {Address || "Address unavailable"}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {[City, State, Country].filter(Boolean).join(", ")}
            </p>
          </div>
        </div>
      </div>

      {/* MAP */}
      <div className="overflow-hidden rounded border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <div>
            <h3 className="flex items-center gap-2 text-[17px] font-semibold text-gray-800">
              <EnvironmentOutlined className="text-[#0ea5e9]" />
              Location
            </h3>

            <p className="mt-1 text-xs text-gray-500">Explore hotel map</p>
          </div>

          {/* Direction Button */}
          <a
            href={googleMapLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded border border-[#72C0F0] px-3 py-2 text-xs font-medium text-[#0F6A75] transition hover:bg-[#eef8fd]"
          >
            <CompassOutlined />
            Directions
          </a>
        </div>

        {/* Interactive Map */}
        <iframe
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            mapQuery,
          )}&z=16&output=embed`}
          title="hotel-map"
          loading="lazy"
          className="h-[320px] w-full"
        />
      </div>
    </div>
  );
};

export default ViewHotelInfo;
