"use client";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { searchHotels } from "../api/hotel.service";
import { useSelectedHotelStore } from "../store/selectedHotel.store";
import { useHotelSearchStore } from "../store/serchData.store";

export const useHotelSessionRecovery = ({ hotelDetails, rawRatePlans }) => {
  const [sessionExpired, setSessionExpired] = useState(false);
  const [reloadingHotels, setReloadingHotels] = useState(false);
  const { searchData } = useHotelSearchStore();
  const { selectedHotel, setSelectedHotel } = useSelectedHotelStore();
  const isSessionExpired = hotelDetails && rawRatePlans === null;

  useEffect(() => {
    if (isSessionExpired) {
      setSessionExpired(true);
    }
  }, [isSessionExpired]);

  const handleReloadHotels = async () => {
    try {
      setReloadingHotels(true);
      const payload = {
        HotelSeedValue: "",
        CheckInDate: dayjs(searchData?.checkIn).format("MM/DD/YYYY"),
        CheckOutDate: dayjs(searchData?.checkOut).format("MM/DD/YYYY"),
        HotelRoomDetail: [
          {
            AdultCount: searchData?.adults || 1,
            ChildCount: searchData?.children || 0,
            Child1Age: searchData?.childAges?.[0] || 0,
            Child2Age: searchData?.childAges?.[1] || 0,
          },
        ],
        fullName: searchData?.city || "",
        id: searchData?.cityData?.id || "",
        RoomCount: searchData?.rooms || 1,
        filters: {},
        sort: "",
      };
      console.log("reload payload", payload);
      const response = await searchHotels(payload);
      const hotels = response?.data?.hotels || [];
      console.log("reload hotels", hotels);
      const sameHotel = hotels.find(
        (hotel) => hotel?.hotelId === selectedHotel?.hotelMeta?.hotelId,
      );
      console.log("sameHotel", sameHotel);
      if (sameHotel) {
        setSelectedHotel(sameHotel);
        setSessionExpired(false);
      } else {
        setSessionExpired(false);
        window.location.href = "/hotels";
      }
    } catch (error) {
      console.log("hotel reload failed", error);
    } finally {
      setReloadingHotels(false);
    }
  };

  return {
    sessionExpired,
    reloadingHotels,
    handleReloadHotels,
  };
};
