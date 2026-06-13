"use client";

import { CompassOutlined, EnvironmentOutlined } from "@ant-design/icons";

const LocationSection = ({ supplierData = {} }) => {
  const { Address, City, Country, PostalCode, State } = supplierData;

  const mapQuery = [Address, City, State, Country].filter(Boolean).join(", ");

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    mapQuery,
  )}`;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
      {/* LEFT */}
      <div className="overflow-hidden rounded border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-[#e9f2f8] bg-[#f7fcff] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded bg-[#eaf6fd] text-[#0ea5e9]">
              <EnvironmentOutlined className="text-[18px]" />
            </div>

            <div>
              <h2 className="text-[18px] font-semibold text-gray-800">
                Hotel Location
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Address & nearby area
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-4 p-4">
          {/* Address */}
          <div className="rounded border border-[#e7f3fb] bg-[#f9fcfe] p-4">
            <div className="mb-2 flex items-center gap-2 text-[#0ea5e9]">
              <CompassOutlined />

              <span className="text-sm font-medium">Property Address</span>
            </div>

            <p className="leading-6 text-gray-700">
              {Address || "Address unavailable"}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              {[City, State, Country].filter(Boolean).join(", ")}
            </p>
          </div>

          {/* Quick Info */}
          <div className="space-y-2 rounded bg-[#fafafa] p-4 text-sm">
            {!!City && (
              <div className="flex justify-between">
                <span className="text-gray-500">City</span>

                <span className="font-medium text-gray-700">{City}</span>
              </div>
            )}

            {!!State && (
              <div className="flex justify-between">
                <span className="text-gray-500">State</span>

                <span className="font-medium text-gray-700">{State}</span>
              </div>
            )}

            {!!Country && (
              <div className="flex justify-between">
                <span className="text-gray-500">Country</span>

                <span className="font-medium text-gray-700">{Country}</span>
              </div>
            )}

            {!!PostalCode && (
              <div className="flex justify-between">
                <span className="text-gray-500">Postal Code</span>

                <span className="font-medium text-gray-700">{PostalCode}</span>
              </div>
            )}
          </div>

          {/* Directions */}
          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="flex h-[44px] items-center justify-center gap-2 rounded border border-[#72C0F0] text-sm font-medium text-[#0F6A75] transition hover:bg-[#eef8fd]"
          >
            <CompassOutlined />
            Get Directions
          </a>
        </div>
      </div>

      {/* MAP */}
      <div className="overflow-hidden rounded border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <h3 className="text-[18px] font-semibold text-gray-800">
              View on Map
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Explore nearby surroundings
            </p>
          </div>

          <div className="rounded-full bg-[#eef8fd] px-3 py-1 text-xs text-[#0ea5e9]">
            Live Map
          </div>
        </div>

        {/* Map */}
        <iframe
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            mapQuery,
          )}&z=15&output=embed`}
          className=" w-full"
          loading="lazy"
          title="hotel-map"
        />
      </div>
    </div>
  );
};

export default LocationSection;
