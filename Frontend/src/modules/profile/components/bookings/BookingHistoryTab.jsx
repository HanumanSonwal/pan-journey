"use client";

import {
  CalendarOutlined,
  CheckCircleFilled,
  DownloadOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Input } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useMyBookings } from "../../hooks/useMyBookings";
export default function BookingHistoryTab({ setSelectedBooking }) {
  const [activeFilter, setActiveFilter] = useState("Confirmed");
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { data: bookings = [], isLoading, isError } = useMyBookings();
  const mappedBookings = useMemo(() => {
    return bookings.map((item, index) => {
      const nights = dayjs(item.checkOutDate, "DD/MM/YYYY").diff(
        dayjs(item.checkInDate, "DD/MM/YYYY"),
        "day",
      );

      return {
        id: index + 1,
        hotelName: item.hotelName,
        status: item.TicketStatusDesc,
        bookingId: item.bookingRefNo,
        voucherNumber: item.voucherNumber,
        checkIn: item.checkInDate,
        checkOut: item.checkOutDate,
        city: item.Address || "",
        confirmation: item.voucherNumber,
        nights: `${nights} Night${nights > 1 ? "s" : ""}`,
        rating: 5,
      };
    });
  }, [bookings]);
  const filteredBookings = useMemo(() => {
    return mappedBookings.filter((item) => {
      const matchesFilter =
        activeFilter === "All" ? true : item.status === activeFilter;

      const matchesSearch =
        // item.hotelName.toLowerCase().includes(search.toLowerCase()) ||
        // item.bookingId.toLowerCase().includes(search.toLowerCase());
         item?.hotelName || item?.bookingId

      return matchesFilter && matchesSearch;
    });
  }, [mappedBookings, activeFilter, search]);

  const tabs = [
    {
      label: "All",
      icon: <CalendarOutlined />,
    },
    {
      label: "Confirmed",
      icon: <CheckCircleFilled />,
    },
  ];
  if (isLoading) {
    return (
      <div className="rounded-xl bg-white p-8 text-center">
        Loading bookings...
      </div>
    );
  }
  return (
    <>
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 text-gray-900">
        <h2 className="font-roboto mb-0! text-[20px] leading-[100%] font-semibold tracking-[0] text-gray-900">
          Booking History
        </h2>
      </div>

      <div className="px-6 py-3 text-gray-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {tabs.map((tab) => {
              const active = activeFilter === tab.label;

              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveFilter(tab.label)}
                  className={`flex items-center gap-2 text-[16px] font-medium transition-all ${
                    active
                      ? "text-[#4A9BB5]"
                      : "text-gray-700 hover:text-[#4A9BB5]"
                  }`}
                >
                  <span className="text-[15px]">{tab.icon}</span>

                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* SEARCH */}

          <div className="w-full lg:w-[320px]">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search For Bookings"
              variant="outlined"
              className="h-8 rounded"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-[#edf7ff]">
        {filteredBookings.length === 0 ? (
          <div className="rounded border border-gray-200 bg-white py-14 text-center">
            <p className="text-[18px] font-semibold text-gray-700">
              No Bookings Found
            </p>

            <p className="mt-2 text-[14px] text-gray-500">
              Try changing filters or search
            </p>
          </div>
        ) : (
          filteredBookings.map((item) => (
            <div
              key={item?.id}
              className="overflow-hidden rounded border border-gray-200 bg-white shadow-[1px_4px_4px_4px_#00000010]"
            >
              <div className="flex flex-col gap-5 p-5 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex min-w-0 flex-1 items-start gap-4">
                  <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded bg-[#edf7ff]">
                    <CalendarOutlined className="text-[28px] text-[#72C0F0]!" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-roboto! truncate text-[20px] leading-tight font-semibold! text-gray-900">
                      {item?.hotelName}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <div className="rounded-full border border-[#72C0F0] bg-[#edf7ff] px-3 py-[3px] text-[12px] font-medium text-[#72C0F0]">
                        {item?.status}
                      </div>

                      <div className="flex items-center gap-1">
                        {[...Array(item?.rating)].map((_, i) => (
                          <StarFilled
                            key={i}
                            className="text-[14px] !text-[#ffb400]"
                          />
                        ))}
                      </div>

                      <span className="text-[15px] font-medium text-gray-700">
                        {item?.room}
                      </span>

                      <span className="text-[14px] font-semibold text-gray-500">
                        <span> bookingRefNo: </span>
                        <span className="font-roboto! text-[14px] font-bold font-medium text-gray-800">
                          {item?.bookingId}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    router.push(
                      `/profile?tab=booking-details&bookingRefNo=${item.bookingId}`,
                    );
                  }}
                  className="h-10 cursor-pointer rounded bg-[#72C0F0] text-[14px]! font-semibold text-white! transition-all hover:bg-[#4A9BB5] md:w-[120px] md:text-[14px] lg:w-[150px]"
                >
                  View Booking
                </button>
              </div>

              <div className="grid grid-cols-1 border-t border-gray-200 md:grid-cols-4">
                <div className="border-b border-gray-200 p-5 md:border-r md:border-b-0">
                  <p className="font-roboto mb-2 text-[14px] text-gray-500">
                    Check-in
                  </p>

                  <h4 className="text-[14px] font-semibold! text-gray-900">
                    {item?.checkIn}
                  </h4>
                  <p className="font-roboto mt-1 text-[14px] font-semibold text-gray-700">
                    {item?.city}
                  </p>
                </div>

                {/* CHECK OUT */}

                <div className="border-b border-gray-200 p-5 md:border-r md:border-b-0">
                  <p className="font-roboto mb-2 text-[14px] text-gray-500">
                    Check-out
                  </p>

                  <h4 className="text-[14px] font-semibold! text-gray-900">
                    {item?.checkOut}
                  </h4>

                  <div className="font-roboto mt-3 inline-flex items-center gap-1 rounded-full border border-gray-300 px-3 py-[3px] text-[13px] font-semibold text-gray-700">
                    🌙 {item?.nights}
                  </div>
                </div>

                {/* CONFIRMATION */}

                <div className="border-b border-gray-200 p-5 md:border-r md:border-b-0">
                  <p className="font-roboto mb-2 text-[14px] text-gray-500">
                    Confirmation No.
                  </p>

                  <h4 className="text-[14px] font-semibold! text-gray-900">
                    CNF {item?.confirmation}
                  </h4>
                </div>

                {/* DOWNLOAD */}

                <div className="flex items-center justify-center p-5">
                  <button className="flex h-10 min-w-[190px] items-center justify-center gap-2 rounded border border-[#244734] px-4 text-[14px]! font-medium text-[#244734]! transition-all hover:bg-[#244734] hover:text-white!">
                    <DownloadOutlined />
                    Download Invoice
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
