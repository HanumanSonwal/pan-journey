"use client";
import { CompassOutlined, EnvironmentOutlined } from "@ant-design/icons";
const LocationSection = ({ supplierData = {} }) => {
  const location = supplierData?.location || {};
  const address = location?.address || supplierData?.Address || "";
  const city = location?.city || supplierData?.City || "";
  const state = location?.state || supplierData?.State || "";
  const country = location?.country || supplierData?.Country || "";
  const pincode =
    location?.pincode ||
    supplierData?.Pincode ||
    supplierData?.PostalCode ||
    "";
  const latitude = location?.latitude ?? supplierData?.Latitude ?? null;
  const longitude = location?.longitude ?? supplierData?.Longitude ?? null;
  const mapQuery =
    latitude !== null && longitude !== null
      ? `${latitude},${longitude}`
      : [address, city, state, country, pincode].filter(Boolean).join(", ");
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
  const hasLocation =
    Boolean(address) || Boolean(city) || Boolean(state) || Boolean(country);
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
      <div className="overflow-hidden rounded border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-[#e9f2f8] bg-[#f7fcff] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="most-boder-colour most-text-color flex h-11 w-11 items-center justify-center rounded">
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
        <div className="space-y-4 p-4">
          <div className="rounded border border-[#e7f3fb] bg-[#f9fcfe] p-4">
            <div className="mb-2 flex items-center gap-2 text-[#0ea5e9]">
              <CompassOutlined />
              <span className="text-sm font-medium">Property Address</span>
            </div>
            <p className="leading-6 text-gray-700">
              {address || "Address unavailable"}
            </p>
            {(city || state || country || pincode) && (
              <p className="mt-2 text-sm text-gray-500">
                {[city, state, country, pincode].filter(Boolean).join(", ")}
              </p>
            )}
          </div>
          <div className="space-y-2 rounded bg-[#fafafa] p-4 text-sm">
            {!!city && (
              <div className="flex justify-between gap-4">
                <span className="text-gray-500"> City </span>
                <span className="text-right font-medium text-gray-700">
                  {city}
                </span>
              </div>
            )}
            {!!state && (
              <div className="flex justify-between gap-4">
                <span className="text-gray-500"> State </span>
                <span className="text-right font-medium text-gray-700">
                  {state}
                </span>
              </div>
            )}
            {!!country && (
              <div className="flex justify-between gap-4">
                <span className="text-gray-500"> Country </span>
                <span className="text-right font-medium text-gray-700">
                  {country}
                </span>
              </div>
            )}
            {!!pincode && (
              <div className="flex justify-between gap-4">
                <span className="text-gray-500"> Postal Code </span>
                <span className="text-right font-medium text-gray-700">
                  {pincode}
                </span>
              </div>
            )}
            {latitude !== null && longitude !== null && (
              <div className="flex justify-between gap-4">
                <span className="text-gray-500"> Coordinates </span>
                <span className="text-right font-medium text-gray-700">
                  {latitude}, {longitude}
                </span>
              </div>
            )}
          </div>
          {hasLocation && (
            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="flex h-[44px] items-center justify-center gap-2 rounded border border-[#72C0F0] text-sm font-medium text-[#0F6A75] transition hover:bg-[#eef8fd]"
            >
              <CompassOutlined /> Get Directions
            </a>
          )}
        </div>
      </div>
      <div className="overflow-hidden rounded border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
          <div>
            <h3 className="mb-1! text-[18px] font-semibold text-gray-800">
              View on Map
            </h3>
            <p className="mb-0! text-xs text-gray-500">
              Explore nearby surroundings
            </p>
          </div>
          <div className="rounded-full bg-[#eef8fd] px-1! py-1! text-xs text-[#0ea5e9]">
            Live Map
          </div>
        </div>
        {mapQuery ? (
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=15&output=embed`}
            className="h-[340px] w-full border-0"
            loading="lazy"
            title="hotel-map"
          />
        ) : (
          <div className="flex h-[340px] items-center justify-center text-sm text-gray-500">
            Location information unavailable
          </div>
        )}
      </div>
    </div>
  );
};
export default LocationSection;
