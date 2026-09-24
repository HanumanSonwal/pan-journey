"use client";

import {
  DownOutlined,
  PhoneOutlined,
  TeamOutlined,
  UpOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import { useState } from "react";

export default function CustomerSummaryCard({
  customer = {},
  guestDetails = [],
}) {
  // =========================================================
  // GUEST DETAILS DEFAULT HIDDEN
  // =========================================================
  const [showGuests, setShowGuests] = useState(false);

  // =========================================================
  // CUSTOMER DATA
  // =========================================================
  const customerName = customer?.name || "--";
  const customerEmail = customer?.email || "";
  const customerMobile =
    customer?.mobile ||
    customer?.phone ||
    customer?.phoneNumber ||
    "--";

  // =========================================================
  // GUEST / ROOM COUNT
  // =========================================================
  const guestCount = guestDetails?.length || 0;

  const uniqueRooms = [
    ...new Set(
      guestDetails
        .map((guest) => guest?.roomNumber)
        .filter(
          (roomNumber) =>
            roomNumber !== undefined && roomNumber !== null,
        )
        .map(String),
    ),
  ];

  const roomCount = uniqueRooms.length;

  return (
    <Card
      className="
        !overflow-hidden
        !rounded-[16px]
        !border
        !border-[#e1e7ec]
        !bg-white
        !shadow-[0_2px_10px_rgba(0,0,0,0.04)]
      "
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      {/* =====================================================
          BOOKING CONTACT HEADER
      ====================================================== */}
      <div
        className="
          flex
          min-h-[110px]
          items-center
          justify-between
          gap-4
          px-[20px]
          py-[20px]
          md:px-[20px]
        "
      >
        {/* =================================================
            LEFT SIDE
        ================================================== */}
        <div className="flex min-w-0 items-center gap-[16px]">
          {/* USER ICON */}
          <div
            className="
              flex
              h-[50px]
              w-[50px]
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#edf5ff]
            "
          >
            <UserOutlined
              className="
                !text-[22px]
                !text-[#1454a4]
              "
            />
          </div>

          {/* CONTACT DETAILS */}
          <div className="min-w-0">
            {/* BOOKING CONTACT + VERIFIED */}
            <div className="flex flex-wrap items-center gap-[9px]">
              <span
                className="
                  text-[18px]
                  font-semibold
                  leading-[25px]
                  tracking-[0.3px]
                  text-[#667085]
                "
              >
                BOOKING CONTACT
              </span>

              <span
                className="
                  inline-flex
                  h-[24px]
                  items-center
                  rounded-full
                  bg-[#d1fae5]
                  px-[11px]
                  text-[12px]
                  font-semibold
                  text-[#047857]
                "
              >
                Verified
              </span>
            </div>

            {/* CUSTOMER INFORMATION */}
            <div
              className="
                mt-[4px]
                flex
                flex-wrap
                items-center
                gap-x-[5px]
                gap-y-[2px]
              "
            >
              <span
                className="
                  text-[17px]
                  font-semibold
                  leading-[24px]
                  text-[#172033]
                "
              >
                {customerName}
              </span>

              {customerEmail ? (
                <>
                  <span className="text-[15px] text-[#667085]">
                    ({customerEmail}
                  </span>

                  <span className="text-[15px] text-[#667085]">
                    •
                  </span>

                  <span className="text-[15px] text-[#667085]">
                    {customerMobile})
                  </span>
                </>
              ) : (
                <span className="text-[15px] text-[#667085]">
                  ({customerMobile})
                </span>
              )}
            </div>
          </div>
        </div>

        {/* =================================================
            ARROW BUTTON
        ================================================== */}
        <button
          type="button"
          onClick={() => setShowGuests((prev) => !prev)}
          aria-label={
            showGuests
              ? "Hide guest details"
              : "Show guest details"
          }
          className="
            flex
            h-[32px]
            w-[32px]
            shrink-0
            items-center
            justify-center
            rounded-full
            border-0
            bg-transparent
            p-0
            text-[#667085]
            transition-all
            duration-200
            hover:bg-[#f3f4f6]
          "
        >
          {showGuests ? (
            <UpOutlined className="!text-[15px]" />
          ) : (
            <DownOutlined className="!text-[15px]" />
          )}
        </button>
      </div>

      {/* =====================================================
          GUEST DETAILS
          HIDDEN BY DEFAULT
      ====================================================== */}
      {showGuests && (
        <div
          className="
            border-t
            border-[#eef1f4]
            px-[20px]
            pb-[27px]
            pt-[20px]
            md:px-[72px]
          "
        >
          {/* =================================================
              GUEST & ROOM HEADER
          ================================================== */}
          <div
            className="
              mb-[20px]
              flex
              items-center
              justify-between
              gap-4
            "
          >
            {/* TITLE */}
            <div className="flex items-center gap-[9px]">
              <TeamOutlined
                className="
                  !text-[18px]
                  !text-[#667085]
                "
              />

              <span
                className="
                  text-[18px]
                  font-semibold
                  leading-[25px]
                  tracking-[0.3px]
                  text-[#667085]
                "
              >
                GUEST & ROOM ALLOCATION
              </span>
            </div>

            {/* GUEST / ROOM COUNT */}
            <div
              className="
                flex
                h-[30px]
                shrink-0
                items-center
                rounded-full
                border
                border-[#cfe2ff]
                bg-[#eff6ff]
                px-[14px]
                text-[13px]
                font-semibold
                text-[#1454a4]
              "
            >
              {guestCount}{" "}
              {guestCount === 1 ? "Guest" : "Guests"}

              <span className="mx-[4px]">•</span>

              {roomCount}{" "}
              {roomCount === 1 ? "Room" : "Rooms"}
            </div>
          </div>

          {/* =================================================
              GUEST CARDS
          ================================================== */}
          {guestDetails?.length > 0 ? (
            <div
              className="
                grid
                grid-cols-1
                gap-[14px]
                md:grid-cols-2
              "
            >
              {guestDetails.map((guest, index) => {
                const guestName = [
                  guest?.title,
                  guest?.firstName,
                  guest?.lastName,
                ]
                  .filter(Boolean)
                  .join(" ");

                const occupantType =
                  guest?.occupantType || "Adult";

                const roomNumber =
                  guest?.roomNumber || "--";

                const roomName =
                  guest?.roomName ||
                  guest?.roomType ||
                  guest?.roomTypeName ||
                  "Deluxe Heritage Room";

                const guestMobile =
                  guest?.mobile ||
                  guest?.phone ||
                  guest?.phoneNumber ||
                  "";

                return (
                  <div
                    key={index}
                    className="
                      min-h-[111px]
                      rounded-[15px]
                      border
                      border-[#dfe4ea]
                      bg-[#fbfcfd]
                      px-[15px]
                      py-[14px]
                    "
                  >
                    {/* NAME + TYPE */}
                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-3
                      "
                    >
                      <p
                        className="
                          m-0
                          min-w-0
                          truncate
                          text-[15px]
                          font-bold
                          leading-[21px]
                          text-[#172033]
                        "
                      >
                        {guestName || `Guest ${index + 1}`}
                      </p>

                      <span
                        className="
                          flex
                          h-[27px]
                          shrink-0
                          items-center
                          rounded-[5px]
                          border
                          border-[#dfe3e8]
                          bg-white
                          px-[9px]
                          text-[12px]
                          font-medium
                          text-[#667085]
                        "
                      >
                        {occupantType}
                      </span>
                    </div>

                    {/* PHONE */}
                    {guestMobile && (
                      <div
                        className="
                          mt-[3px]
                          flex
                          items-center
                          gap-[6px]
                        "
                      >
                        <PhoneOutlined
                          className="
                            !text-[12px]
                            !text-[#98a2b3]
                          "
                        />

                        <span
                          className="
                            text-[14px]
                            font-normal
                            leading-[21px]
                            text-[#667085]
                          "
                        >
                          {guestMobile}
                        </span>
                      </div>
                    )}

                    {/* ROOM */}
                    <div
                      className="
                        mt-[8px]
                        flex
                        items-center
                        gap-[7px]
                      "
                    >
                      <span
                        className="
                          text-[14px]
                          leading-none
                          text-[#98a2b3]
                        "
                      >
                        🔑
                      </span>

                      <span
                        className="
                          truncate
                          text-[14px]
                          font-medium
                          leading-[20px]
                          text-[#475467]
                        "
                      >
                        Room {roomNumber} • {roomName}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className="
                rounded-[12px]
                border
                border-dashed
                border-[#dfe4ea]
                bg-[#fbfcfd]
                px-4
                py-5
                text-center
                text-[14px]
                text-[#98a2b3]
              "
            >
              No Guest Details
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
