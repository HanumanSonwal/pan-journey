"use client";

import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckCircleFilled,
  DownloadOutlined,
  EnvironmentOutlined,
  ShareAltOutlined,
  StarFilled,
} from "@ant-design/icons";

import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CancelBookingModal from "./CancelBookingModal";
import ShareBookingModal from "./ShareBookingModal";
import { useBookingDetails } from "../../hooks/useBookingDetails";
import { useCancelBooking } from "../../hooks/useCancelBooking";
import { useDownloadInvoice } from "../../hooks/useDownloadInvoice";
dayjs.extend(customParseFormat);

export default function BookingDetailsTab({ bookingRefNo }) {
  const router = useRouter();
  const { mutate: downloadInvoice } = useDownloadInvoice();
  const queryClient = useQueryClient();
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const { mutate: cancelBooking, isPending: cancelling } = useCancelBooking();
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const { data, isLoading } = useBookingDetails(bookingRefNo);
  if (isLoading) {
    return (
      <div className="rounded-xl bg-white p-8">Loading booking details...</div>
    );
  }

  const bookingData = data || {};
  const hotel = bookingData?.HotelDetails || {};
  const room = bookingData?.HotelRoomDetail?.[0] || {};
  const payment = bookingData?.BookingPaymentDetails?.[0] || {};
  const ratePlan = hotel?.HotelRatePlanDetails || {};
  const cancellationPolicies =
    bookingData?.CancellationPolicy?.replaceAll("<br>", "\n")
      ?.split("\n")
      ?.filter(Boolean) || [];
  const policies = ratePlan?.Inclusion
    ? ratePlan.Inclusion.split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
    : [];
  const guest = bookingData?.PAXDetails || [];
  const nights = dayjs(bookingData?.CheckOutDate, "DD/MM/YYYY").diff(
    dayjs(bookingData?.CheckInDate, "DD/MM/YYYY"),
    "day",
  );
  const handleConfirmCancellation = () => {
    cancelBooking(bookingData?.BookingRefNo, {
      onSuccess: (response) => {
        message.success(response?.message || "Booking cancelled successfully");
        queryClient.invalidateQueries({
          queryKey: ["my-bookings"],
        });
        queryClient.invalidateQueries({
          queryKey: ["booking-details"],
        });

        setCancelModalOpen(false);
        setTimeout(() => {
          router.push("/profile?tab=BookingHistory");
        }, 1000);
      },

      onError: (error) => {
        message.error(error?.response?.data?.message || "Cancellation failed");
      },
    });
  };

  const shareText = `
🏨 *${hotel?.HotelName}*
📌 Booking Ref: ${bookingData?.BookingRefNo}
📅 Check In: ${bookingData?.CheckInDate}
📅 Check Out: ${bookingData?.CheckOutDate}
✅ Status: ${bookingData?.TicketStatusDesc}
🌐 Booked via PAN Journey
`;

  const handleDownloadInvoice = () => {
    downloadInvoice(bookingData?.BookingRefNo, {
      onSuccess: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `invoice-${bookingData?.BookingRefNo}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      },

      onError: (error) => {
        console.log(error);
        message.error("Unable to download invoice");
      },
    });
  };

  const PriceRow = ({ label, value, last = false, valueClass = "" }) => (
    <div
      className={`flex items-center justify-between py-1 ${
        !last ? "border-b border-gray-100" : ""
      }`}
    >
      <p className="font-roboto! mb-0! text-[14px] text-gray-600">{label}</p>

      <p
        className={`font-roboto! mb-0! text-[15px] font-semibold ${valueClass || "text-gray-900"}`}
      >
        {value}
      </p>
    </div>
  );

  const formattedPolicies = cancellationPolicies?.map((item) => {
    const match = item.match(/deduct the amount is-(\d+\.?\d*)/);
    if (!match) return item;
    const amount = Number(match[1]).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return item.replace(match[0], `Cancellation Charge: ₹${amount}`);
  });

  return (
    <>
      <div className="font-roboto! flex items-center justify-between border-b border-gray-200 bg-white px-4! py-4! text-gray-900">
        <h2 className="font-roboto mb-0! text-[20px] leading-[100%] font-semibold tracking-[0] text-gray-900">
          Booking Details
        </h2>
        <button
          onClick={() => router.push("/profile?tab=BookingHistory")}
          className="flex items-center gap-2 text-[15px] font-semibold text-[#72C0F0]!"
        >
          <ArrowLeftOutlined />
          Back
        </button>
      </div>
      <div className="my-2 space-y-3">
        <div className="overflow-hidden rounded border border-gray-200 bg-white shadow-[1px_4px_4px_4px_#00000014]">
          <div className="p-3">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              {/* LEFT */}
              <div className="flex gap-5">
                <img
                  src={hotel?.HotelImage}
                  alt="hotel"
                  className="h-[120px] w-[140px] shrink-0 rounded object-cover"
                />
                <div>
                  <h3 className="font-roboto! truncate text-[20px] leading-tight font-semibold! text-gray-900">
                    {hotel?.HotelName}
                  </h3>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {/* Stars */}
                    <div className="flex items-center gap-1">
                      {[
                        ...Array(
                          Number(hotel?.StarCategoryId) ||
                            (hotel?.HotelId
                              ? Number(hotel.HotelId) % 2 === 0
                                ? 4
                                : 5
                              : 4),
                        ),
                      ].map((_, i) => (
                        <StarFilled
                          key={i}
                          className="text-[14px] !text-[#ffb400]"
                        />
                      ))}
                    </div>

                    {/* Badges */}
                    <div className="rounded-full border border-[#d9ecf8] bg-[#edf7ff] px-3 py-1 text-[12px] font-medium text-[#3b82b6]">
                      {ratePlan?.PayatHotel ? "Pay At Hotel" : "Prepaid"}
                    </div>

                    <div className="rounded-full border border-[#d9ecf8] bg-[#edf7ff] px-3 py-1 text-[12px] font-medium text-[#3b82b6]">
                      Instant Confirmation
                    </div>

                    <div className="rounded-full border border-[#d9ecf8] bg-[#edf7ff] px-3 py-1 text-[12px] font-medium text-[#3b82b6]">
                      Free WiFi
                    </div>
                  </div>

                  <p className="font-roboto! my-2! flex items-center gap-2 text-[16px] font-semibold text-gray-700">
                    <EnvironmentOutlined />
                    {hotel?.Address}
                  </p>
                  <p className="font-roboto ml-5 text-[13px] text-gray-500">
                    {bookingData?.Origin}
                  </p>
                </div>
              </div>

              {/* STATUS */}
              <div className="h-fit rounded-full border border-[#72C0F0] bg-[#edf7ff] px-4 py-1 text-[13px] font-semibold text-[#72C0F0]">
                {bookingData?.TicketStatusDesc}
              </div>
            </div>
          </div>

          {/* CHECKIN SECTION */}
          <div className="grid grid-cols-1 border-t border-gray-200 md:grid-cols-3">
            {/* CHECK IN */}
            <div className="flex flex-col justify-center p-3">
              <p className="font-roboto text-[12px] font-medium tracking-wide text-gray-500 uppercase">
                Check-in
              </p>

              <h3 className="font-roboto mt-1 text-[18px] font-semibold text-gray-900">
                {bookingData?.CheckInDate}
              </h3>

              <p className="font-roboto mb-0! text-[14px] text-gray-700">
                From {hotel?.CheckInTime || "Hotel Standard Time"}
              </p>
            </div>

            {/* CENTER */}
            <div className="flex flex-col items-center justify-center border-y border-gray-200 px-6 py-6 md:border-x md:border-y-0">
              <div className="relative flex w-full max-w-[120px] items-center justify-center">
                <div className="h-[1px] w-full bg-gray-300" />

                <span className="absolute bg-white px-3 text-[#72C0F0]">
                  <ArrowRightOutlined className="text-[24px]" />
                </span>
              </div>

              <div className="mt-4 rounded-full border border-[#d9ecf8] bg-[#edf7ff] px-4 py-2">
                <span className="font-roboto text-[13px] font-medium text-[#3b82b6]">
                  🌙 {nights} Night{nights > 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* CHECK OUT */}
            <div className="flex flex-col justify-center px-6">
              <p className="font-roboto text-[12px] font-medium tracking-wide text-gray-500 uppercase">
                Check-out
              </p>

              <h3 className="font-roboto mt-1 text-[18px] font-semibold text-gray-900">
                {bookingData?.CheckOutDate}
              </h3>

              <p className="font-roboto mb-0! text-[14px] text-gray-700">
                By {hotel?.CheckOutTime || "Hotel Standard Time"}
              </p>
            </div>
          </div>
        </div>

        {/* ROOM INFO */}
        <div className="overflow-hidden rounded border border-gray-200 bg-white shadow-[1px_4px_4px_4px_#00000014]">
          {/* HEADER */}
          <div className="border-b border-gray-200 px-3 py-4 md:px-3">
            <h2 className="font-roboto mb-0! text-[20px] leading-[100%] font-semibold tracking-[0] text-gray-900">
              Room & Booking Info
            </h2>
          </div>

          {/* BODY */}
          <div className="p-3 md:p-3">
            {/* PACKAGE */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#f4d38a] bg-[#fff8e8] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#d89a00]" />

              <span className="font-roboto text-[13px] font-semibold text-[#b77900]">
                {ratePlan?.Inclusion?.includes("RoomOnly")
                  ? "Room Only"
                  : "Included Package"}
              </span>
            </div>

            <div className="mt-5 md:mt-5">
              {/* ROOM TYPE */}
              <h3 className="font-roboto mt-4 text-[18px] leading-[30px] font-semibold text-gray-900">
                {ratePlan?.HotelRoomTypeDesc}
              </h3>

              {/* POLICIES */}
              <div className="mt-2 flex flex-wrap gap-2">
                {policies?.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-full border border-[#d9ecf8] bg-[#edf7ff] px-4 py-1"
                  >
                    <span className="font-roboto text-[13px] font-medium text-[#3b82b6]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8 border-t border-gray-200 pt-2"></div>
              {/* DETAILS */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Guests */}
                <div className="rounded border border-[#d9ecf8] bg-[#fafcff] p-2 transition hover:border-[#72C0F0] hover:shadow-md">
                  <p className="font-roboto text-[12px] font-medium tracking-wide text-gray-500 uppercase">
                    Guests
                  </p>

                  <h4 className="font-roboto mt-2 text-[16px] font-semibold text-gray-900">
                    {room?.Adult_Count} Adult
                    {Number(room?.Child_Count) > 0
                      ? `, ${room?.Child_Count} Child`
                      : ""}
                  </h4>

                  <p className="mb-0! text-[13px] text-gray-500">
                    Room {guest?.RoomNo || 1}
                  </p>
                </div>

                {/* Booking ID */}
                <div className="rounded border border-[#d9ecf8] bg-[#fafcff] p-2 transition hover:border-[#72C0F0] hover:shadow-md">
                  <p className="font-roboto text-[12px] font-medium tracking-wide text-gray-500 uppercase">
                    Booking ID
                  </p>

                  <h4 className="font-roboto mt-2 text-[16px] font-semibold break-all text-gray-900">
                    {bookingData?.BookingRefNo}
                  </h4>
                </div>

                {/* Confirmation */}
                <div className="rounded border border-[#d9ecf8] bg-[#fafcff] p-2 transition hover:border-[#72C0F0] hover:shadow-md">
                  <p className="font-roboto text-[12px] font-medium tracking-wide text-gray-500 uppercase">
                    Confirmation No.
                  </p>

                  <h4 className="font-roboto mt-2 text-[16px] font-semibold break-all text-gray-900">
                    {bookingData?.VoucherNumber}
                  </h4>
                </div>

                {/* Meal Plan */}
                <div className="rounded border border-[#d9ecf8] bg-[#fafcff] p-2 transition hover:border-[#72C0F0] hover:shadow-md">
                  <p className="font-roboto text-[12px] font-medium tracking-wide text-gray-500 uppercase">
                    Meal Plan
                  </p>

                  <h4 className="font-roboto mt-2 text-[16px] font-semibold text-gray-900">
                    {ratePlan?.Inclusion?.includes("RoomOnly")
                      ? "Room Only"
                      : "Included Package"}
                  </h4>
                </div>

                {/* Booked On */}
                <div className="rounded border border-[#d9ecf8] bg-[#fafcff] p-2 transition hover:border-[#72C0F0] hover:shadow-md">
                  <p className="font-roboto text-[12px] font-medium tracking-wide text-gray-500 uppercase">
                    Booked On
                  </p>

                  <h4 className="font-roboto mt-2 text-[16px] font-semibold text-gray-900">
                    {bookingData?.BookingDate}
                  </h4>

                  <p className="mb-0! text-[13px] text-[#72C0F0]">
                    via PAN Journey
                  </p>
                </div>

                {/* Invoice */}
                <div className="rounded border border-[#d9ecf8] bg-[#fafcff] p-2 transition hover:border-[#72C0F0] hover:shadow-md">
                  <p className="font-roboto text-[12px] font-medium tracking-wide text-gray-500 uppercase">
                    Invoice Number
                  </p>

                  <h4 className="font-roboto mt-2 text-[16px] font-semibold break-all text-gray-900">
                    {bookingData?.InvoiceNumber}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GUEST DETAILS */}
        <div className="overflow-hidden rounded border border-gray-200 bg-white shadow-[1px_4px_4px_4px_#00000014]">
          <div className="border-b border-gray-200 px-3 py-4 md:px-3">
            <h2 className="font-roboto mb-0! text-[20px] leading-[100%] font-semibold tracking-[0] text-gray-900">
              Guest Details
            </h2>
          </div>

          {/* GUEST LIST */}
          <div>
            {bookingData?.PAXDetails?.map((guest, index) => (
              <div
                key={index}
                className="flex items-start gap-4 border-b border-gray-200 px-5 py-5 last:border-0 md:px-6"
              >
                {/* AVATAR */}
                <div className="h-[52px]md:w-[56px] flex w-[52px] shrink-0 items-center justify-center rounded-full border border-[#d9ecf8] bg-[#edf7ff] text-[15px] font-bold text-[#3b82b6] md:h-[56px] md:text-[16px]">
                  {`${guest?.FirstName?.[0] || ""}${guest?.LastName?.[0] || ""}`}
                </div>

                {/* CONTENT */}
                <div className="min-w-0 flex-1">
                  {/* NAME + ROLE */}
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <h3 className="text-[17px] font-bold break-words text-gray-900 md:text-[16px]">
                      {guest?.Title} {guest?.FirstName} {guest?.LastName}
                    </h3>

                    {guest.role && (
                      <span className="ml-[25px] w-fit rounded-full bg-[#edf7ff] px-2.5 py-[3px] !text-[11px] font-medium !text-[#3b82b6]">
                        {guest?.Passengertyp}
                      </span>
                    )}
                  </div>

                  {/* CONTACT */}
                  <div className="mt-2 flex flex-wrap items-center gap-4">
                    <p className="text-[13px] text-gray-600 md:text-[14px]">
                      Room No: {guest?.RoomNo}
                    </p>

                    <p className="text-[13px] text-gray-600 md:text-[14px]">
                      Guest Type: {guest?.Passengertyp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PRICE */}
        <div className="overflow-hidden rounded border border-gray-200 bg-white shadow-[1px_4px_4px_4px_#00000014]">
          {/* HEADER */}
          <div className="px- border-b border-gray-200 py-4 md:px-3">
            <h2 className="font-roboto mb-0! text-[20px] leading-[100%] font-semibold tracking-[0] text-gray-900">
              Price Breakup
            </h2>
          </div>

          {/* BODY */}
          <div className="p-6">
            {/* BREAKUP */}
            <div className="rounded-xl border border-[#d9ecf8] bg-[#fafcff] p-4">
              <PriceRow
                label="Room Charges"
                value={`₹${Number(ratePlan?.Basic_Amount || 0).toFixed(2)}`}
              />

              <PriceRow
                label="Taxes & Fees"
                value={`₹${Number(ratePlan?.Tax || 0).toFixed(2)}`}
                valueClass="text-orange-600"
              />

              <PriceRow
                label="Discount"
                value="₹0.00"
                valueClass="text-green-600"
              />

              {Number(payment?.Gateway_Charges || 0) > 0 ? (
                <PriceRow
                  label="Gateway Charges"
                  value={`₹${Number(payment?.Gateway_Charges || 0).toFixed(2)}`}
                  valueClass="text-red-500"
                />
              ) : (
                <PriceRow
                  label="Gateway Charges"
                  value="₹0.00"
                  valueClass="text-gray-500"
                />
              )}

              <PriceRow
                label="Currency"
                value={payment?.Currency_Code || "INR"}
                last
              />
            </div>

            {/* TOTAL */}
            <div className="mt-5 rounded-xl border border-[#d9ecf8] bg-[#edf7ff] p-5">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-roboto mb-1 text-[12px] font-semibold tracking-wider text-[#3b82b6] uppercase">
                    Payment Summary
                  </p>

                  <h3 className="font-roboto mb-3 text-[20px] font-bold text-gray-900">
                    Total Paid
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] text-gray-500">
                        Payment Ref:
                      </span>

                      <span className="text-[13px] font-medium text-gray-900">
                        {payment?.PaymentConfirmation_Number || "-"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[13px] text-gray-500">Status:</span>

                      <span className="rounded-full bg-green-100 px-2 py-[2px] text-[12px] font-medium text-green-700">
                        Paid
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#c7e7f8] pt-4 text-left md:border-0 md:pt-0 md:text-right">
                  <p className="font-roboto mb-1 text-[13px] text-gray-500">
                    Amount Paid
                  </p>

                  <h2 className="font-roboto text-[32px] leading-none font-bold text-[#3b82b6]">
                    ₹{Number(ratePlan?.Total_Amount || 0).toFixed(2)}
                  </h2>

                  <p className="mt-2 text-[12px] text-gray-500">
                    {payment?.Currency_Code || "INR"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* MAP */}
        <div className="overflow-hidden rounded border border-gray-200 bg-white shadow-[1px_4px_4px_4px_#00000014]">
          {/* HEADER */}

          <div className="border-b border-gray-200 px-3 py-4 md:px-3">
            <h2 className="font-roboto mb-0! text-[20px] leading-[100%] font-semibold tracking-[0] text-gray-900">
              Hotel Location
            </h2>
          </div>

          {/* MAP */}
          <div className="p-3 md:p-3">
            <div className="overflow-hidden rounded border border-gray-200">
              <iframe
                title="hotel-location"
                width="100%"
                height="320"
                loading="lazy"
                className="border-0"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  hotel?.Address || hotel?.HotelName,
                )}&z=15&output=embed`}
              />
            </div>

            <div className="mt-4">
              <p className="text-[18px] font-medium text-gray-700 md:text-[18px]">
                Address
              </p>

              <p className="mt-1 text-[14px] leading-relaxed text-gray-700 md:text-[15px]">
                {hotel?.Address}
              </p>
            </div>
          </div>
        </div>

        {/* CANCELLATION */}
        <div className="overflow-hidden rounded bg-white shadow-[1px_4px_4px_4px_#00000014]">
          {/* HEADER */}
          <div className="border-b border-gray-200 px-3 py-4 md:px-3">
            <h2 className="font-roboto mb-0! text-[20px] leading-[100%] font-semibold tracking-[0] text-gray-900">
              Cancellation Policy
            </h2>
          </div>

          {/* POLICY LIST */}
          <div className="p-4 md:p-5">
            <div className="space-y-3">
              {formattedPolicies?.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-[#d9ecf8] bg-[#fafcff] p-4 transition hover:border-[#72C0F0]"
                >
                  <div className="flex items-start gap-3">
                    {/* ICON */}
                    <div className="mt-0.5 shrink-0">
                      <CheckCircleFilled className="text-[18px] !text-[#22c55e]" />
                    </div>

                    {/* CONTENT */}
                    <div className="min-w-0 flex-1">
                      <p className="font-roboto! mb-0! text-[14px] leading-6 font-medium text-gray-800 md:text-[15px]">
                        {item.replace(
                          "deduct the amount is-",
                          "Cancellation Charge: ₹",
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Note */}
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
              <p className="font-roboto! mb-0! text-[13px] text-amber-800">
                Cancellation charges may vary depending on the cancellation date
                and hotel policy.
              </p>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* DOWNLOAD */}
          <button
            onClick={handleDownloadInvoice}
            type="button"
            className="flex h-[45px] items-center justify-center gap-2 rounded border border-[#72C0F0] bg-[#edf7ff] text-[16px]! font-semibold !text-[#3b82b6] shadow-sm transition-all duration-200 hover:bg-[#72C0F0] hover:!text-white active:scale-[0.98] md:text-[15px]"
          >
            <DownloadOutlined className="text-[16px]" />

            <span>Download Invoice</span>
          </button>

          {/* SHARE */}
          <button
            onClick={() => setShareModalOpen(true)}
            type="button"
            className="flex h-[45px] items-center justify-center gap-2 rounded border border-[#72C0F0] bg-[#edf7ff] text-[16px]! font-semibold text-[#3b82b6]! shadow-sm transition-all duration-200 hover:bg-[#72C0F0]! hover:text-white! active:scale-[0.98] md:text-[15px]"
          >
            <ShareAltOutlined className="text-[16px]" />

            <span>Share Details</span>
          </button>

          {/* CANCEL */}

          <button
            type="button"
            onClick={() => setCancelModalOpen(true)}
            disabled={cancelling}
            className="flex h-[45px] items-center justify-center gap-2 rounded border border-red-300 bg-red-50 text-[16px]! font-semibold !text-red-500 shadow-sm transition-all duration-200 hover:bg-red-500 hover:!text-white active:scale-[0.98] md:text-[15px]"
          >
            <span>{cancelling ? "Cancelling..." : "Cancel Booking"}</span>
          </button>
        </div>
        <CancelBookingModal
          open={cancelModalOpen}
          onCancel={() => setCancelModalOpen(false)}
          onConfirm={handleConfirmCancellation}
          loading={cancelling}
          bookingRefNo={bookingData?.BookingRefNo}
          hotelName={hotel?.HotelName}
          cancellationCharge={0}
        />
        <ShareBookingModal
          open={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          shareText={shareText}
        />
      </div>
    </>
  );
}
