"use client";

import { useHotelSearchStore } from "@/modules/hotel/store/serchData.store";
import DateRangeField from "@/modules/shared/home/components/DateRangeField";
import DestinationSearchField from "@/modules/shared/home/components/DestinationSearchField";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import GuestsField from "@/modules/shared/home/components/GuestsField/GuestsField";
import { EditOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import HotelSearchForm from "./HotelSearchForm";
import { navigateToHotels } from "../../utils/hotelNavigation";

export default function SearchBar({ onSearch }) {
  const router = useRouter();
  const {
    draftSearchData,
    appliedSearchData,
    setDraftSearchData,
    applySearch,
  } = useHotelSearchStore();
  const [destinationError, setDestinationError] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [guestOpen, setGuestOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const handleSearch = () => {
    if (!draftSearchData?.city?.trim()) {
      setDestinationError(true);
      return;
    }
    setDestinationError(false);
    onSearch?.();
    applySearch();
    navigateToHotels(router, draftSearchData);
  };

  return (
    <>
      {/* // <div className="sticky top-0 z-5 bg-[#72C0F0] shadow"> */}
      <div className="sticky top-0 z-5 hidden bg-[#72C0F0] shadow md:block">
        <div className="px-2 py-1 pb-8 md:px-6">
          <div className="mx-auto max-w-[1250px]">
            {/* Heading */}

            <div className="mb-2 hidden grid-cols-12 gap-3 px-1 text-sm text-white md:grid">
              <div className="col-span-4">City / Location</div>
              <div className="col-span-3">Check-In / Check-Out</div>
              <div className="col-span-3">Guests</div>
              <div className="col-span-2"></div>
            </div>

            {/* Search Controls */}
            <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-12">
              <div className="min-w-0 md:col-span-3 lg:col-span-4">
                <DestinationSearchField
                  error={destinationError}
                  value={{
                    city: draftSearchData?.city,
                    cityData: draftSearchData?.cityData,
                  }}
                  onChange={(val) => {
                    setDestinationError(false);

                    setDraftSearchData({
                      city: val?.city || "",
                      cityData: {
                        ...val?.cityData,

                        stateName:
                          val?.cityData?.stateName ||
                          val?.cityData?.state ||
                          "",
                        countryCode:
                          val?.cityData?.countryCode ||
                          val?.cityData?.country ||
                          "",
                      },
                    });
                  }}
                  compact
                  fontSize="16px"
                  height="50px"
                  wrapperClassName="bg-white !py-0"
                />
              </div>

              <div className="relative z-50 min-w-0 md:col-span-3 lg:col-span-3">
                <DateRangeField
                  variant="compact"
                  open={dateOpen}
                  setOpen={setDateOpen}
                  value={[
                    draftSearchData?.checkIn
                      ? dayjs(draftSearchData.checkIn)
                      : null,
                    draftSearchData?.checkOut
                      ? dayjs(draftSearchData.checkOut)
                      : null,
                  ]}
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

              <div className="relative z-40 min-w-0 md:col-span-4 lg:col-span-3">
                <GuestsField
                  variant="compact"
                  open={guestOpen}
                  setOpen={setGuestOpen}
                  value={draftSearchData}
                  onChange={(val) => {
                    setDraftSearchData(val);
                  }}
                />
              </div>

              <div className="min-w-0 md:col-span-2 lg:col-span-2">
                <button
                  type="button"
                  onClick={handleSearch}
                  className="h-[50px] w-full rounded bg-[#0f766e] text-sm font-semibold tracking-wide !text-white transition-all duration-200 hover:bg-[#0d5f58] active:scale-[0.98]"
                >
                  SEARCH
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-30 bg-[#eef6fd] p-1 md:hidden">
        <div className="rounded border border-gray-200 bg-white p-2 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <h2 className="font-jost! mb-0! truncate text-[14px]! font-bold!">
                {appliedSearchData?.city || "Select Destination"}
              </h2>

              <div className="mt-0! flex flex-wrap items-center gap-1 text-sm text-[12px]! text-gray-500">
                <span>
                  {dayjs(appliedSearchData?.checkIn).format("DD MMM")}
                </span>

                <span>-</span>

                <span>
                  {dayjs(appliedSearchData?.checkOut).format("DD MMM")}
                </span>

                <span>•</span>

                <span>{appliedSearchData?.adults} Adults</span>

                <span>•</span>

                <span>{appliedSearchData?.rooms} Room</span>
              </div>
            </div>

            <button
              onClick={() => setSearchModalOpen(true)}
              className="rounded-full bg-blue-50 p-2 transition hover:bg-blue-100"
            >
              <EditOutlined className="text-lg text-blue-600" />
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={searchModalOpen}
        footer={null}
        destroyOnHidden
        centered
        width={700}
        styles={{
          body: {
            padding: 20,
            maxHeight: "85vh",
            overflowY: "auto",
          },
        }}
        className="md:!max-w-[700px]"
        onCancel={() => setSearchModalOpen(false)}
      >
        <HotelSearchForm
          showSearchButton
          onSearch={handleSearch}
          onClose={() => setSearchModalOpen(false)}
        />
      </Modal>
    </>
  );
}
