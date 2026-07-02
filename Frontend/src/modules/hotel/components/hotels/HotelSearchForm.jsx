"use client";

import { useHotelSearchStore } from "@/modules/hotel/store/serchData.store";
import DateRangeField from "@/modules/shared/home/components/DateRangeField";
import DestinationSearchField from "@/modules/shared/home/components/DestinationSearchField";
import GuestsField from "@/modules/shared/home/components/GuestsField/GuestsField";
import SearchButton from "@/modules/shared/home/components/hero_section/SearchButton";
import dayjs from "dayjs";
import { useRef, useState } from "react";

export default function HotelSearchForm({
  destinationError,
  setDestinationError,
  onClose,
  showSearchButton = false,
  onSearch,
}) {
  const { draftSearchData, setDraftSearchData } = useHotelSearchStore();
  const [dateOpen, setDateOpen] = useState(false);
  const [guestOpen, setGuestOpen] = useState(false);
  const destinationClickedRef = useRef(false);

  return (
    <div className="w-full">
      <div className="hidden md:flex md:items-center md:justify-between">
        <h3 className="text-[20px] font-extrabold text-gray-900 lg:text-[22px] xl:text-[24px]">
          Select Your Hotels
        </h3>

        <h3 className="text-sm font-semibold text-gray-600">
          Book Domestic and International Property Online.
        </h3>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 min-[700px]:grid-cols-2 min-[1205px]:grid-cols-[2fr_1.5fr_1.5fr]">
        {/* DESTINATION */}
        <div
          className="min-[700px]:col-span-2 min-[1205px]:col-span-1"
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
              console.log("HOME DESTINATION VALUE =>", val);
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
            fontSize="clamp(18px, 2vw, 21px)"
            height="clamp(73px, 8vw, 82px)"
            marginBottom="clamp(20px, 1vw, 20px)"
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
        <div className="relative z-40 w-full">
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
      {showSearchButton && (
        <SearchButton
          floating={false}
          onSearch={() => {
            onSearch?.();
            onClose?.();
          }}
        />
      )}
    </div>
  );
}
