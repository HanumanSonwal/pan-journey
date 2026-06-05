"use client";

import dayjs from "dayjs";
import Image from "next/image";

import {
  CalendarOutlined,
  CheckCircleFilled,
  CreditCardOutlined,
  DownloadOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Button, Card, Divider } from "antd";
import { useRouter } from "next/navigation";

import { useHotelBookingStore } from "../store/booking.store";

export default function HotelBookingSuccess() {
  const router = useRouter();
  const { bookingData, ticketingData, clearBookingData } =
    useHotelBookingStore();
  const hotel = bookingData?.supplierData || {};
  const searchData = bookingData?.searchData || {};
  const guest = bookingData?.guestData?.primaryGuest || {};
  const amount =
    bookingData?.pricingSummary?.totalPrice ||
    bookingData?.pricingSummary?.FinalAmount ||
    bookingData?.pricingSummary?.GrandTotal ||
    bookingData?.pricingSummary?.NetAmount ||
    0;

  return (
    <div className="min-h-screen bg-[#eaf4fb] px-4 py-8 md:px-6">
      <div className="mx-auto max-w-[1100px]">
        {/* SUCCESS HEADER */}
        <Card className="rounded-[24px] border-0 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <CheckCircleFilled className="text-[90px] text-green-500" />

            <h1 className="mt-5 text-[34px] font-bold text-[#1f2937]">
              Booking Confirmed
            </h1>

            <p className="mt-3 max-w-[650px] text-[15px] text-[#6b7280]">
              Your hotel booking has been successfully confirmed. Booking
              details and voucher have been sent to your registered email
              address.
            </p>
          </div>

          <Divider />

          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex min-h-[120px] flex-col items-center justify-center rounded-2xl border border-[#eef2f7] bg-[#fafcff] p-5 text-center">
              <p className="text-sm text-[#6b7280]">Booking Status</p>

              <h3 className="mt-2 text-[18px] font-semibold text-green-600">
                Confirmed
              </h3>
            </div>

            <div className="flex min-h-[120px] flex-col items-center justify-center rounded-2xl border border-[#eef2f7] bg-[#fafcff] p-5 text-center">
              <p className="text-sm text-[#6b7280]">Payment Status</p>

              <h3 className="mt-2 text-[18px] font-semibold text-green-600">
                Successful
              </h3>
            </div>

            <div className="flex min-h-[120px] flex-col items-center justify-center rounded-2xl border border-[#eef2f7] bg-[#fafcff] p-5 text-center">
              <p className="text-sm text-[#6b7280]">Booking Ref No</p>

              <h3 className="mt-2 text-[18px] font-semibold text-[#0f766e]">
                {ticketingData?.BookingRefNo || "-"}
              </h3>
            </div>

            <div className="flex min-h-[120px] flex-col items-center justify-center rounded-2xl border border-[#eef2f7] bg-[#fafcff] p-5 text-center">
              <p className="text-sm text-[#6b7280]">Voucher Number</p>

              <h3 className="mt-2 text-[18px] font-semibold text-[#0f766e]">
                {ticketingData?.HotelvoucherNumber || "-"}
              </h3>
            </div>
          </div>
        </Card>

        {/* HOTEL DETAILS */}
        <Card className="mt-5 rounded-[24px] border-0 shadow-sm">
          <h2 className="mb-5 text-[24px] font-semibold">Hotel Details</h2>

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <Image
              src={
                hotel?.HotelImage ||
                bookingData?.selectedHotel?.hotelImage ||
                "/images/no-hotel-image.jpg"
              }
              alt={hotel?.HotelName || "Hotel"}
              width={280}
              height={220}
              className="h-[220px] w-full rounded-2xl object-cover"
            />

            <div>
              <h3 className="text-[26px] font-semibold text-[#1f2937]">
                {hotel?.HotelName ||
                  bookingData?.selectedHotel?.hotelName ||
                  "-"}
              </h3>

              <p className="mt-2 text-[#6b7280]">
                {hotel?.Address || bookingData?.selectedHotel?.address || "-"}
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-[#eef2f7] bg-[#fafcff] p-5">
                  <div className="flex items-center gap-2">
                    <CalendarOutlined />

                    <span className="font-medium">Check In</span>
                  </div>

                  <p className="mt-2 text-[16px] font-semibold">
                    {searchData?.checkIn
                      ? dayjs(searchData.checkIn).format("DD MMM YYYY")
                      : "-"}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#eef2f7] bg-[#fafcff] p-5">
                  <div className="flex items-center gap-2">
                    <CalendarOutlined />

                    <span className="font-medium">Check Out</span>
                  </div>

                  <p className="mt-2 text-[16px] font-semibold">
                    {searchData?.checkOut
                      ? dayjs(searchData.checkOut).format("DD MMM YYYY")
                      : "-"}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#eef2f7] bg-[#fafcff] p-5">
                  <span className="font-medium">Guests</span>

                  <p className="mt-2 text-[16px] font-semibold">
                    {searchData?.adults || 0} Adults
                  </p>
                </div>

                <div className="rounded-2xl border border-[#eef2f7] bg-[#fafcff] p-5">
                  <span className="font-medium">Rooms</span>

                  <p className="mt-2 text-[16px] font-semibold">
                    {searchData?.rooms || 0} Room
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* LEAD GUEST */}
        <Card className="mt-5 rounded-[24px] border-0 shadow-sm">
          <h2 className="mb-5 text-[24px] font-semibold">Lead Guest</h2>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#eef2f7] bg-[#fafcff] p-5">
              <UserOutlined />

              <p className="mt-2 font-medium">
                {guest?.firstName} {guest?.lastName}
              </p>
            </div>

            <div className="rounded-2xl border border-[#eef2f7] bg-[#fafcff] p-5">
              <p className="text-[#6b7280]">Email</p>

              <p className="mt-2 font-medium">{guest?.email}</p>
            </div>

            <div className="rounded-2xl border border-[#eef2f7] bg-[#fafcff] p-5">
              <p className="text-[#6b7280]">Mobile</p>

              <p className="mt-2 font-medium">{guest?.mobile}</p>
            </div>
          </div>
        </Card>

        {/* PAYMENT SUMMARY */}
        <Card className="mt-5 rounded-[24px] border-0 shadow-sm">
          <h2 className="mb-5 flex items-center gap-2 text-[24px] font-semibold">
            <CreditCardOutlined />
            Payment Summary
          </h2>

          <div className="flex items-center justify-between border-b py-3">
            <span>Total Amount Paid</span>

            <span className="text-[22px] font-bold text-[#0f766e]">
              ₹{Number(amount).toLocaleString("en-IN")}
            </span>
          </div>

          <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700">
            Payment completed successfully.
          </div>
        </Card>

        <Card className="mt-5 rounded-[24px] border-0 shadow-sm">
          <h2 className="mb-5 text-[24px] font-semibold">Hotel Voucher</h2>

          <div className="rounded-2xl bg-[#ecfeff] p-6">
            <p className="text-[#6b7280]">
              Present this voucher number during hotel check-in.
            </p>

            <div className="mt-3 text-[32px] font-bold text-[#0f766e]">
              {ticketingData?.HotelvoucherNumber || "-"}
            </div>
          </div>
        </Card>

        {/* IMPORTANT INFO */}
        <Card className="mt-5 rounded-[24px] border-0 shadow-sm">
          <h2 className="mb-4 text-[20px] font-semibold">
            Important Information
          </h2>

          <ul className="space-y-2 text-[#6b7280]">
            <li>• Carry a valid Government ID proof during check-in.</li>

            <li>• Booking voucher has been sent to your registered email.</li>

            <li>
              • Hotel reserves the right to deny check-in if valid documents are
              not provided.
            </li>
          </ul>
        </Card>

        {/* ACTIONS */}
        <div className="mt-8 flex flex-col justify-center gap-4 md:flex-row">
          <Button
            disabled
            icon={<DownloadOutlined />}
            size="large"
            className="!h-[50px] !rounded-xl"
          >
            Voucher PDF Coming Soon
          </Button>

          <Button
            type="primary"
            icon={<HomeOutlined />}
            size="large"
            className="!h-[50px] !rounded-xl !bg-[#0f766e]"
            onClick={() => {
              clearBookingData();
              router.push("/");
            }}
          >
            Back To Home
          </Button>
        </div>
      </div>
    </div>
  );
}
