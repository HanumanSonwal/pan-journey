"use client";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { searchHotels } from "../api/hotel.service";
import { useHotelSearchStore } from "../store/serchData.store";
import { useSelectedHotelStore } from "../store/selectedHotel.store";

export const useHotelSessionRecovery = ({
  hotelDetails,
  rawRatePlans,
}) => {
  const [sessionExpired, setSessionExpired] =
    useState(false);

  const [reloadingHotels, setReloadingHotels] =
    useState(false);

  const { searchData } =
    useHotelSearchStore();

  const {
    selectedHotel,
    setSelectedHotel,
  } = useSelectedHotelStore();

  const isSessionExpired =
    hotelDetails &&
    rawRatePlans === null;

  useEffect(() => {
    if (isSessionExpired) {
      setSessionExpired(true);
    }
  }, [isSessionExpired]);

  const handleReloadHotels =
    async () => {
      try {
        setReloadingHotels(true);

        const payload = {
          HotelSeedValue: "",

          CheckInDate:
            dayjs(
              searchData?.checkIn,
            ).format(
              "MM/DD/YYYY",
            ),

          CheckOutDate:
            dayjs(
              searchData?.checkOut,
            ).format(
              "MM/DD/YYYY",
            ),

          HotelRoomDetail: [
            {
              AdultCount:
                searchData?.adults ||
                1,

              ChildCount:
                searchData?.children ||
                0,

              Child1Age:
                searchData
                  ?.childAges?.[0] ||
                0,

              Child2Age:
                searchData
                  ?.childAges?.[1] ||
                0,
            },
          ],

          fullName:
            searchData?.city ||
            "",

          id:
            searchData
              ?.cityData?.id ||
            "",

          RoomCount:
            searchData?.rooms ||
            1,

          filters: {},
          sort: "",
        };

        const response =
          await searchHotels(
            payload,
          );

        const hotels =
          response?.data
            ?.hotels || [];

        const sameHotel =
          hotels.find(
            (hotel) =>
              hotel?.hotelId ===
              selectedHotel
                ?.hotelMeta
                ?.hotelId,
          );

        if (sameHotel) {
          setSelectedHotel({
            ...selectedHotel,

            hotelKey:
              sameHotel?.hotelkey,

            searchKey:
              response?.data
                ?.searchKey,
          });

          setSessionExpired(
            false,
          );
        } else {
          window.location.href =
            "/hotels";
        }
      } catch (error) {
        console.log(
          "hotel reload failed",
          error,
        );
      } finally {
        setReloadingHotels(
          false,
        );
      }
    };

  return {
    sessionExpired,
    reloadingHotels,
    handleReloadHotels,
  };
};