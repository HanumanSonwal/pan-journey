"use client";

import { CalendarOutlined, TeamOutlined } from "@ant-design/icons";

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
      <div className="mt-4 grid w-full grid-cols-1 items-end gap-3 min-[700px]:grid-cols-2 min-[1000px]:grid-cols-[minmax(220px,2fr)_minmax(170px,1.5fr)_minmax(170px,1.5fr)_auto] min-[1000px]:gap-2 xl:gap-4 2xl:gap-4">
        {/* Destination */}
        <div
          className="min-[700px]:col-span-2 min-[1000px]:col-span-1"
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

              if (
                destinationClickedRef.current &&
                (val?.city || val?.cityData)
              ) {
                requestAnimationFrame(() => {
                  setDateOpen(true);
                });
              }
            }}
            height="65px"
          />
        </div>

        {/* Date */}
        <div className="relative z-50 w-full">
          <DateRangeField
            icon={<CalendarOutlined className="text-[18px] text-gray-400" />}
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

        {/* Guests */}
        <div className="relative z-40 w-full">
          <GuestsField
            icon={<TeamOutlined className="text-[22px] !text-gray-900" />}
            variant="default"
            value={draftSearchData}
            open={guestOpen}
            setOpen={setGuestOpen}
            onChange={(val) => {
              setDraftSearchData(val);
            }}
          />
        </div>

        {/* Search Button */}
        <div className="w-full min-[1000px]:w-auto">
          <SearchButton floating={false} onSearch={onSearch} />
        </div>
      </div>
    </div>
  );
}
