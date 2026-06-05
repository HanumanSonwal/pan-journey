"use client";

import { useHotelSearchStore } from "@/modules/hotel/store/serchData.store";
import DateRangeField from "@/modules/shared/home/components/DateRangeField";
import DestinationSearchField from "@/modules/shared/home/components/DestinationSearchField";
import GuestsField from "@/modules/shared/home/components/GuestsField";
import dayjs from "dayjs";
import { useRef, useState } from "react";

export default function HotelSearchForm({
  destinationError,
  setDestinationError,
}) {
  const { draftSearchData, setDraftSearchData } = useHotelSearchStore();
  const [dateOpen, setDateOpen] = useState(false);
  const [guestOpen, setGuestOpen] = useState(false);
  const destinationClickedRef = useRef(false);

  return (
    <div className="w-full">
      {/* HEADING */}
      <div className="flex flex-col gap-2 md:flex-row md:justify-between">
        <h3 className="text-xl font-extrabold text-gray-900 md:text-2xl">
          Select Your Hotels
        </h3>
        <h3 className="text-xs font-semibold text-gray-600 md:text-sm">
          Book Domestic and International Property Online.
        </h3>
      </div>
      {/* GRID */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[2fr_1.5fr_1.5fr]">
        {/* DESTINATION */}
        <div
          onClick={() => {
            destinationClickedRef.current = true;
          }}
        >
          <DestinationSearchField
            value={{
              city: draftSearchData?.city,
              cityData: draftSearchData?.cityData,
            }}
            error={destinationError}
            onChange={(val) => {
              setDestinationError?.(false);

              setDraftSearchData({
                city: val?.city || "",

                cityData: {
                  ...val?.cityData,

                  stateName:
                    val?.cityData?.stateName || val?.cityData?.state || "",

                  countryCode:
                    val?.cityData?.countryCode || val?.cityData?.country || "",
                },
              });

              // AUTO OPEN DATE
              if (
                destinationClickedRef.current &&
                (val?.city || val?.cityData)
              ) {
                requestAnimationFrame(() => {
                  setDateOpen(true);
                });
              }
            }}
            fontSize="24px"
            height="82px"
          />
        </div>

        {/* DATE */}
        <div className="relative z-50 w-full">
          <DateRangeField
            variant="default"
            value={[
              draftSearchData?.checkIn ? dayjs(draftSearchData.checkIn) : null,

              draftSearchData?.checkOut
                ? dayjs(draftSearchData.checkOut)
                : null,
            ]}
            open={dateOpen}
            setOpen={setDateOpen}
            onChange={(dates) => {
              setDraftSearchData({
                checkIn: dates?.[0]?.format("YYYY-MM-DD"),

                checkOut: dates?.[1]?.format("YYYY-MM-DD"),
              });

              // FULL RANGE SELECTED
              if (dates?.[0] && dates?.[1]) {
                setDateOpen(false);

                requestAnimationFrame(() => {
                  setGuestOpen(true);
                });
              }
            }}
          />
        </div>

        {/* GUESTS */}
        <div className="relative z-40 w-full md:col-span-2 xl:col-span-1">
          <GuestsField
            variant="default"
            value={draftSearchData}
            open={guestOpen}
            setOpen={setGuestOpen}
            onChange={(val) => {
              setDraftSearchData(val);
            }}
          />
        </div>
      </div>
    </div>
  );
}
