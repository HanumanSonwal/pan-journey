"use client";

import { useAuthGuard } from "@/modules/auth/hooks/useAuthGuard";
import { Button } from "antd";
import { useRouter } from "next/navigation";

const ViewHotelPriceCard = ({
  ratePlans = [],
  supplierData = {},
  hotelDetailId = "",
}) => {
  const router = useRouter();
  const { requireAuth } = useAuthGuard();
  const selectedPlan = ratePlans?.[0] || null;
  const roomName = selectedPlan?.roomType || "Best Available Room";
  const roomDescription =
    selectedPlan?.roomDescription || selectedPlan?.description || "";

  const inclusion = selectedPlan?.inclusion || "";

  const additionalInfo = selectedPlan?.additionalInfo || "";

  const cancellationPolicy = selectedPlan?.cancellationPolicy || null;

  const payment = selectedPlan?.payment || {};

  const pricing = selectedPlan?.pricing || {};

  const basicPrice = Number(pricing?.basicAmount || 0);

  const tax = Number(pricing?.tax || 0);

  const serviceFee = Number(pricing?.serviceFee || 0);

  const markup = Number(pricing?.markup || 0);

  const gst = Number(pricing?.gst || 0);

  const totalPrice = Number(pricing?.totalAmount || 0);

  const currency = pricing?.currency || "INR";

  const currencySymbol =
    currency === "INR" || currency === "₹" ? "₹" : currency;

  const checkIn = supplierData?.CheckIn || {};

  const checkOut = supplierData?.CheckOut || {};

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) {
      return "";
    }

    const [hours, minutes] = String(time).split(":").map(Number);

    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return time;
    }

    const date = new Date();

    date.setHours(hours, minutes, 0, 0);

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatPrice = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const getList = (value) => {
    if (Array.isArray(value)) {
      return value.map((item) => String(item).trim()).filter(Boolean);
    }

    if (typeof value === "string") {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  };

  const inclusionList = getList(inclusion);

  const additionalInfoList = getList(additionalInfo);

  const handleBookNow = () => {
    if (!selectedPlan) {
      return;
    }

    const roomId = selectedPlan?.roomId || "";

    if (!hotelDetailId || !roomId) {
      console.error("Hotel detail id or room id not found", {
        hotelDetailId,
        roomId,
        selectedPlan,
      });
      return;
    }

    router.push(
      `/hotel-booking?hotelDetailId=${encodeURIComponent(
        hotelDetailId,
      )}&roomId=${encodeURIComponent(roomId)}`,
    );
  };

  const handleRoomScroll = () => {
    const section = document.getElementById("rooms-section");

    if (!section) {
      return;
    }

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="flex h-full min-h-[330px] flex-col rounded border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mt-auto">
        <div>
          <h3 className="font-roboto! line-clamp-2 text-[20px] leading-7 font-bold! text-[#0f172a]">
            {roomName}
          </h3>

          {!!roomDescription && (
            <p className="mb-1! line-clamp-2 text-[14px] leading-6 font-semibold text-gray-500">
              {roomDescription}
            </p>
          )}
        </div>

        {(checkIn?.date || checkOut?.date) && (
          <div className="my-3 grid grid-cols-2 gap-2 rounded bg-[#f8fafc] p-3">
            <div className="border-r border-gray-200 pr-2">
              <p className="font-roboto text-[11px] font-semibold tracking-wide text-gray-400 uppercase">
                Check-in
              </p>

              {!!checkIn?.date && (
                <p className="mt-1 text-sm font-bold text-[#0f172a]">
                  {formatDate(checkIn.date)}
                </p>
              )}

              {!!checkIn?.time && (
                <p className="text-xs font-medium text-gray-500">
                  {formatTime(checkIn.time)}
                </p>
              )}
            </div>

            <div className="pl-2">
              <p className="font-roboto text-[11px] font-semibold tracking-wide text-gray-400 uppercase">
                Check-out
              </p>

              {!!checkOut?.date && (
                <p className="mt-1 text-sm font-bold text-[#0f172a]">
                  {formatDate(checkOut.date)}
                </p>
              )}

              {!!checkOut?.time && (
                <p className="text-xs font-medium text-gray-500">
                  {formatTime(checkOut.time)}
                </p>
              )}
            </div>
          </div>
        )}

        {!!additionalInfoList.length && (
          <div className="mb-2 rounded bg-[#f8fafc] px-3 py-2">
            <p className="font-roboto! most-text-color mb-2 text-[11px] font-bold tracking-wide uppercase">
              Additional Information
            </p>

            <ul className="font-roboto! text-[13px] font-semibold text-gray-600">
              {additionalInfoList.map((item, index) => (
                <li key={index} className="flex items-start gap-1!">
                  <span>•</span>

                  <span className="">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!!inclusionList.length && (
          <div className="rounded bg-[#f8fafc] px-3 py-2">
            <p className="font-roboto! most-text-color mb-2 text-[11px] font-bold tracking-wide uppercase">
              Included
            </p>

            <ul className="font-roboto! text-[13px] font-semibold text-green-600">
              {inclusionList.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span>✓</span>

                  <span className="leading-5">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!!cancellationPolicy && (
          <div className="mt-2 rounded bg-[#f8fafc] px-3 py-2">
            <p className="font-roboto text-[11px] font-bold tracking-wide text-gray-400 uppercase">
              Cancellation Policy
            </p>

            <p className="mt-1 text-xs font-medium text-gray-600">
              Cancellation policy available
            </p>
          </div>
        )}

        {(payment?.creditCardRequired || payment?.panMandatory) && (
          <div className="mt-2 rounded bg-[#f8fafc] px-3 py-2">
            <p className="font-roboto text-[11px] font-bold tracking-wide text-gray-400 uppercase">
              Payment Requirements
            </p>

            {payment?.creditCardRequired && (
              <p className="mt-1 text-xs font-medium text-gray-600">
                Credit card required
              </p>
            )}

            {payment?.panMandatory && (
              <p className="mt-1 text-xs font-medium text-gray-600">
                PAN required
              </p>
            )}
          </div>
        )}

        <div className="mt-3 rounded border border-gray-100 bg-[#fafafa] px-4 py-3">
          <h4 className="font-roboto text-[12px] font-semibold tracking-wide text-gray-500 uppercase">
            Price Details
          </h4>

          <div className="font-roboto mt-2 space-y-1.5 text-sm font-semibold">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Basic Price</span>

              <span className="font-medium text-gray-700">
                {currencySymbol} {formatPrice(basicPrice)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">Taxes</span>

              <span className="font-medium text-gray-700">
                {currencySymbol} {formatPrice(tax)}
              </span>
            </div>

            {serviceFee > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Service Fee</span>

                <span className="font-medium text-gray-700">
                  {currencySymbol} {formatPrice(serviceFee)}
                </span>
              </div>
            )}

            {markup > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Markup</span>

                <span className="font-medium text-gray-700">
                  {currencySymbol} {formatPrice(markup)}
                </span>
              </div>
            )}

            {gst > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-gray-500">GST</span>

                <span className="font-medium text-gray-700">
                  {currencySymbol} {formatPrice(gst)}
                </span>
              </div>
            )}

            <div className="border-t border-dashed pt-3!">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <span className="font-semibold text-[#0f172a]">
                    Total Price
                  </span>

                  <p className="mt-1 text-xs text-gray-400">
                    Inclusive of taxes
                  </p>
                </div>

                <h2 className="text-[26px] leading-none font-bold text-[#FF0000]">
                  {currencySymbol} {formatPrice(totalPrice)}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <Button
          type="primary"
          size="large"
          onClick={() => requireAuth(handleBookNow)}
          className="buttion-background-color !h-[42px] w-full rounded! text-xl !font-bold text-white!"
        >
          Book Now
        </Button>

        <Button
          size="large"
          onClick={handleRoomScroll}
          className="most-text-color !h-[40px] flex-1 rounded! px-2 text-[12px] leading-tight whitespace-normal sm:!h-[42px] sm:px-4 sm:text-[16px] md:text-[16px]"
        >
          <span className="hidden sm:inline">View All</span>

          <span className="sm:hidden">View All</span>
        </Button>
      </div>
    </div>
  );
};

export default ViewHotelPriceCard;
