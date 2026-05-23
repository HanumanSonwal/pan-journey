"use client";

import React from "react";
import {
  EnvironmentOutlined,
  CompassOutlined,
} from "@ant-design/icons";

const LocationSection = ({
  supplierData = {},
}) => {
  const {
    Address,
    City,
    Country,
    PostalCode,
    State,
  } = supplierData;

  const mapQuery = `
    ${Address || ""}
    ${City || ""}
    ${State || ""}
    ${Country || ""}
  `;

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

      {/* LEFT INFO */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-1">

        {/* Header */}
        <div className="mb-5 flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef8fd] text-[20px] text-[#0ea5e9]">
            <EnvironmentOutlined />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Location
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Hotel address & map
            </p>
          </div>
        </div>

        {/* Address Card */}
        <div className="rounded-2xl border border-[#e7f3fb] bg-[#f9fcfe] p-4">

          <div className="mb-3 flex items-center gap-2 text-[#0ea5e9]">
            <CompassOutlined />
            <span className="text-sm font-medium">
              Property Address
            </span>
          </div>

          <p className="leading-7 text-gray-700">
            {Address ||
              "Address not available"}
          </p>

          <div className="mt-4 space-y-2 text-sm text-gray-500">

            {!!City && (
              <p>
                <span className="font-medium text-gray-700">
                  City:
                </span>{" "}
                {City}
              </p>
            )}

            {!!State && (
              <p>
                <span className="font-medium text-gray-700">
                  State:
                </span>{" "}
                {State}
              </p>
            )}

            {!!Country && (
              <p>
                <span className="font-medium text-gray-700">
                  Country:
                </span>{" "}
                {Country}
              </p>
            )}

            {!!PostalCode && (
              <p>
                <span className="font-medium text-gray-700">
                  Postal Code:
                </span>{" "}
                {PostalCode}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* MAP */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm lg:col-span-2">

        {/* Map Header */}
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="text-lg font-semibold text-gray-800">
            View on Map
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Explore nearby surroundings
          </p>
        </div>

        {/* Map */}
        <iframe
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            mapQuery
          )}&output=embed`}
          className="h-[420px] w-full"
          loading="lazy"
          title="hotel-map"
        />
      </div>
    </div>
  );
};

export default LocationSection;