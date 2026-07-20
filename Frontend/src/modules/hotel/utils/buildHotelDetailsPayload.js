import { formatSupplierDate } from "./supplierDate";

export const buildHotelDetailsPayload = ({
  selectedHotel,
  initialPayload,
  appliedSearchData,
  hid,
  cityIdParam,
  stateNameParam,
  countryCodeParam,
  hotelSlugParam,
}) => {
  if (selectedHotel?.fromWishlist) {
    return {
      hotelId: selectedHotel?.hotelMeta?.hotelId || hid,
      hotelMeta: {
        cityId: selectedHotel?.hotelMeta?.cityId || cityIdParam,
        stateName: selectedHotel?.hotelMeta?.stateName || stateNameParam,
        countryCode: selectedHotel?.hotelMeta?.countryCode || countryCodeParam,
      },

      searchContext: {
        fullName: selectedHotel?.hotelMeta?.hotelSlug || hotelSlugParam || "",
        CheckInDate: formatSupplierDate(appliedSearchData?.checkIn),
        CheckOutDate: formatSupplierDate(appliedSearchData?.checkOut),
        RoomCount: appliedSearchData?.rooms || 1,
      },
    };
  }

  if (initialPayload) {
    return {
      ...initialPayload,

      hotelMeta: {
        cityId: appliedSearchData?.cityData?.id,
        stateName: appliedSearchData?.cityData?.stateName,
        countryCode: appliedSearchData?.cityData?.countryCode,
      },

      searchContext: {
        fullName: initialPayload?.searchContext?.fullName || "",
        CheckInDate: formatSupplierDate(appliedSearchData?.checkIn),
        CheckOutDate: formatSupplierDate(appliedSearchData?.checkOut),
        RoomCount: appliedSearchData?.rooms || 1,
      },
    };
  }

  return {
    hotelId: selectedHotel?.hotelMeta?.hotelId,

    hotelMeta: {
      cityId: selectedHotel?.hotelMeta?.cityId,
      stateName: selectedHotel?.hotelMeta?.stateName,
      countryCode: selectedHotel?.hotelMeta?.countryCode,
    },

    hotelKey: selectedHotel?.hotelKey,
    searchKey: selectedHotel?.searchKey,
  };
};
