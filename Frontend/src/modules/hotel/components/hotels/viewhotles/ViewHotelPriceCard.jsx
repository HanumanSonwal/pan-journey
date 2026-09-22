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

  /* ================= DATE ================= */

  const formatDate = (date) => {
    if (!date) return "";

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

  /* ================= TIME ================= */

  const formatTime = (time) => {
    if (!time) return "";

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

  /* ================= PRICE ================= */

  const formatPrice = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  /* ================= LIST ================= */

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

  /* ================= BOOK NOW ================= */

  const handleBookNow = () => {
    if (!selectedPlan) return;

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

  /* ================= VIEW ALL ================= */

  const handleRoomScroll = () => {
    const section = document.getElementById("rooms-section");

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div
      className="w-full rounded-xl border border-gray-200 bg-white p-2 font-sans shadow-sm"
      style={{
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
      }}
    >
      {/* ================= ROOM ================= */}

      <div>
        <h3 className="line-clamp-2 p-2 pb-auto text-[21px] leading-[1.25] font-bold tracking-[-0.02em] text-[#111827]">
          {roomName}
        </h3>

        {roomDescription && (
          <p className="line-clamp-2 text-[14px] leading-[1.45] font-medium text-gray-500">
            {roomDescription}
          </p>
        )}
      </div>

      {/* ================= CHECK IN / OUT ================= */}

      {(checkIn?.date || checkOut?.date) && (
        <div className="bg-gray-50m relative grid grid-cols-2 overflow-hidden rounded-lg border border-gray-100">
          <div className="border-r border-gray-200 px-3 py-1">
            <p className="!m-0 text-[13px] leading-tight tracking-wide text-gray-400 uppercase">
              Check-in
            </p>

            {checkIn?.date && (
              <p className="!m-0 mt-1! text-[18px] leading-tight font-semibold text-gray-800">
                {formatDate(checkIn.date)}
              </p>
            )}

            {checkIn?.time && (
              <p className="!m-0 mt-1! text-[12px] leading-tight font-medium text-gray-500">
                {formatTime(checkIn.time)}
              </p>
            )}
          </div>
          <div className="px-3 py-1">
            <p className="!m-0 text-[13px] leading-tight tracking-wide text-gray-400 uppercase">
              Check-out
            </p>

            {checkOut?.date && (
              <p className="!m-0 mt-1! text-[18px] leading-tight font-semibold text-gray-800">
                {formatDate(checkOut.date)}
              </p>
            )}

            {checkOut?.time && (
              <p className="!m-0 mt-1! text-[13px] leading-tight font-medium !text-gray-500">
                {formatTime(checkOut.time)}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ================= ADDITIONAL INFO ================= */}

      {additionalInfoList.length > 0 && (
        <div className="rounded-2 mt-2 bg-gray-50 px-3 py-1">
          <p className="!m-0 text-[13px] leading-[18px] font-bold tracking-wide text-gray-600 uppercase">
            Additional Information
          </p>

          <ul className="!m-0 !mt-2 text-[14px] leading-[18px] font-medium text-gray-500">
            {additionalInfoList.map((item, index) => (
              <li key={index} className="!m-0 flex items-start gap-1">
                <span className="text-gray-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ================= INCLUDED ================= */}

      {inclusionList.length > 0 && (
        <div className="rounded-2 mt-2 bg-gray-50 px-3 py-1">
          <p className="!m-0 text-[13px] leading-[18px] font-bold tracking-wide text-gray-600 uppercase">
            Included
          </p>

          <ul className="!m-0 !mt-2 text-[14px] leading-[18px] font-medium text-green-600">
            {inclusionList.map((item, index) => (
              <li key={index} className="flex items-start gap-1">
                <span>✓</span>

                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ================= CANCELLATION ================= */}

      {cancellationPolicy && (
        <div className="mt-2 rounded-lg bg-gray-50 px-3 py-2.5">
          <p className="text-[11px] font-bold tracking-wide text-gray-400 uppercase">
            Cancellation Policy
          </p>

          <p className="mt-1 text-[12px] font-medium text-gray-600">
            Cancellation policy available
          </p>
        </div>
      )}

      {/* ================= PAYMENT ================= */}

      {(payment?.creditCardRequired || payment?.panMandatory) && (
        <div className="mt-2 rounded-lg bg-gray-50 px-3 py-2.5">
          <p className="text-[11px] font-bold tracking-wide text-gray-400 uppercase">
            Payment Requirements
          </p>

          {payment?.creditCardRequired && (
            <p className="mt-1 text-[12px] font-medium text-gray-600">
              Credit card required
            </p>
          )}

          {payment?.panMandatory && (
            <p className="mt-1 text-[12px] font-medium text-gray-600">
              PAN required
            </p>
          )}
        </div>
      )}

      {/* ================= PRICE DETAILS ================= */}

      <div className="rounded-4 mt-2 bg-gray-50 px-3 py-1">
        <h4 className="!m-0 text-[13px] leading-[18px] font-bold tracking-wide text-gray-600 uppercase">
          Price Details
        </h4>

        <div className="mt-2 space-y-1.5 text-[15px]">
          {/* BASIC */}

          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-500">Basic Price</span>

            <span className="font-semibold text-gray-700">
              {currencySymbol} {formatPrice(basicPrice)}
            </span>
          </div>

          {/* TAX */}

          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-500">Taxes</span>

            <span className="font-semibold text-gray-700">
              {currencySymbol} {formatPrice(tax)}
            </span>
          </div>

          {/* SERVICE */}

          {serviceFee > 0 && (
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-500">Service Fee</span>

              <span className="font-semibold text-gray-700">
                {currencySymbol} {formatPrice(serviceFee)}
              </span>
            </div>
          )}

          {/* MARKUP */}

          {markup > 0 && (
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-500">Markup</span>

              <span className="font-semibold text-gray-700">
                {currencySymbol} {formatPrice(markup)}
              </span>
            </div>
          )}

          {/* GST */}

          {gst > 0 && (
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-500">GST</span>

              <span className="font-semibold text-gray-700">
                {currencySymbol} {formatPrice(gst)}
              </span>
            </div>
          )}

          {/* TOTAL */}

          <div className="mt-2 border-t border-dashed border-gray-200 pt-2.5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[15px] font-bold text-gray-900">
                  Total Price
                </p>

                <p className="text-[11px] font-medium text-gray-400">
                  Inclusive of taxes
                </p>
              </div>

              <p className="text-[22px] leading-none font-extrabold tracking-tight text-[#ef1b1b]">
                {currencySymbol} {formatPrice(totalPrice)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BUTTONS ================= */}

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Button
          type="primary"
          size="large"
          onClick={() => requireAuth(handleBookNow)}
          className="buttion-background-color !h-[42px] w-full rounded-lg! !border-0 text-[15px] !font-bold text-white!"
        >
          Book Now
        </Button>

        <Button
          size="large"
          onClick={handleRoomScroll}
          className="most-text-color !h-[42px] w-full rounded-lg! px-3 text-[15px] !font-semibold"
        >
          View All
        </Button>
      </div>
    </div>
  );
};

export default ViewHotelPriceCard;
