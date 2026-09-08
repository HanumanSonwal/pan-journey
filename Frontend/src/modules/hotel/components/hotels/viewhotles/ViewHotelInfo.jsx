"use client";
import {
  CompassOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
const ViewHotelInfo = ({ supplierData = {} }) => {
  const { AboutHotel, Address, City, State, Country, Latitude, Longitude } =
    supplierData;
  const mapQuery =
    Latitude && Longitude
      ? `${Latitude},${Longitude}`
      : [Address, City, State, Country].filter(Boolean).join(", ");
  const googleMapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

  const AboutHotelContent = ({ content }) => {
    const [showFull, setShowFull] = useState(false);
    const [isLongContent, setIsLongContent] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
      const checkContentHeight = () => {
        const element = contentRef.current;

        if (!element) return;

        const lineHeight = parseFloat(
          window.getComputedStyle(element).lineHeight,
        );

        const maxHeight = lineHeight * 4;

        setIsLongContent(element.scrollHeight > maxHeight + 2);
      };

      checkContentHeight();

      window.addEventListener("resize", checkContentHeight);

      return () => {
        window.removeEventListener("resize", checkContentHeight);
      };
    }, [content]);

    return (
      <div>
        <div
          ref={contentRef}
          className={`prose prose-sm max-w-none overflow-hidden leading-7 text-gray-600 ${
            showFull ? "" : "line-clamp-4"
          }`}
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />

        {isLongContent && (
          <button
            type="button"
            onClick={() => setShowFull((prev) => !prev)}
            className="mt-1! cursor-pointer text-sm font-semibold text-[#0ea5e9]! underline transition hover:text-[#0284c7]!"
          >
            {showFull ? "View Less" : "View More"}
          </button>
        )}
      </div>
    );
  };
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <div className="rounded border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-3">
            <div className="most-boder-colour most-text-colour flex h-10 w-10 items-center justify-center rounded border">
              <InfoCircleOutlined />
            </div>
            <div>
              <h2 className="mb-0 text-[17px] font-bold text-gray-800">
                About Hotel
              </h2>
              <p className="text-sm font-semibold text-gray-500">
                Property overview
              </p>
            </div>
          </div>
          {AboutHotel ? (
            <AboutHotelContent content={AboutHotel} />
          ) : (
            <p className="leading-7 text-gray-600">
              No hotel description available.
            </p>
          )}
        </div>
        <div className="rounded border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-3">
            <div className="most-boder-colour most-text-color flex h-10 w-10 items-center justify-center rounded border">
              <EnvironmentOutlined />
            </div>
            <div>
              <h2 className="mb-0 text-[17px] font-bold text-gray-800">
                Hotel Address
              </h2>
              <p className="text-sm font-semibold text-gray-500">
                Location details
              </p>
            </div>
          </div>
          <div className="rounded bg-[#f8fbfd] p-3">
            <p className="font-semibold text-gray-700">
              {Address || "Address unavailable"}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {[City, State, Country].filter(Boolean).join(", ")}
            </p>
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <div>
            <h3 className="flex items-center gap-2 text-[17px] font-semibold text-gray-800">
              <EnvironmentOutlined className="text-[#0ea5e9]" /> Location
            </h3>
            <p className="mt-1 text-xs text-gray-500">Explore hotel map</p>
          </div>
          <a
            href={googleMapLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded border border-[#72C0F0] px-3 py-2 text-xs font-medium text-[#0F6A75] transition hover:bg-[#eef8fd]"
          >
            <CompassOutlined /> Directions
          </a>
        </div>
        <iframe
          src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=16&output=embed`}
          title="hotel-map"
          loading="lazy"
          className="h-[320px] w-full border-0"
        />
      </div>
    </div>
  );
};
export default ViewHotelInfo;
