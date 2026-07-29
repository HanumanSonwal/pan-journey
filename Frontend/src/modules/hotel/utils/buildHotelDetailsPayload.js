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
  console.log("BUILD HOTEL DETAILS PAYLOAD:", {
    selectedHotel,
    initialPayload,
    appliedSearchData,
    hid,
    cityIdParam,
    stateNameParam,
    countryCodeParam,
    hotelSlugParam,
  });

  // Common Values
  const cityData = appliedSearchData?.cityData;
  const hotelMeta = selectedHotel?.hotelMeta || {};

  const cityId = cityData?.id || hotelMeta?.cityId || cityIdParam || "";

  const stateName =
    cityData?.stateName ||
    hotelMeta?.stateName ||
    stateNameParam ||
    cityData?.name?.split(",")[1]?.trim() ||
    "";

  const countryCode =
    cityData?.countryCode || hotelMeta?.countryCode || countryCodeParam || "";

  // Hotel Name > City Name > Slug
  const fullName =
    appliedSearchData?.cityData?.name ||
    selectedHotel?.hotelMeta?.cityName ||
    hotelSlugParam ||
    "";

  const searchContext = {
    fullName,
    CheckInDate: formatSupplierDate(appliedSearchData?.checkIn),
    CheckOutDate: formatSupplierDate(appliedSearchData?.checkOut),
    RoomCount: appliedSearchData?.rooms || 1,
  };

  // Wishlist
  if (selectedHotel?.fromWishlist) {
    return {
      hotelId: hotelMeta?.hotelId || hid,
      hotelMeta: {
        cityId,
        stateName,
        countryCode,
      },
      searchContext,
    };
  }

  // Initial Payload
  if (initialPayload) {
    return {
      ...initialPayload,
      hotelMeta: {
        cityId,
        stateName,
        countryCode,
      },
      searchContext,
    };
  }

  // Default
  return {
    hotelId: hotelMeta?.hotelId || hid,
    hotelMeta: {
      cityId,
      stateName,
      countryCode,
    },
    hotelKey: selectedHotel?.hotelKey,
    searchKey: selectedHotel?.searchKey,
    searchContext,
  };
};
